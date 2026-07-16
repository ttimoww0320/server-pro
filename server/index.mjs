// Production server для ServerPro: отдаёт Astro-статику (dist/) + принимает
// /api/lead и пересылает заявку в Telegram-группу через Bot API.
//
// Токен бота НИКОГДА не попадает в код страницы — он живёт только здесь, в env.
// Запуск: `node server/index.mjs` (или `npm start`). Перед этим — `npm run build`.
//
// ENV:
//   PORT                — порт (по умолчанию 3000)
//   TELEGRAM_BOT_TOKEN  — токен бота (@BotFather). ОБЯЗАТЕЛЕН (кроме DRY_RUN).
//   LEAD_CHAT_ID        — chat_id группы, куда слать заявки (напр. -1001234567890). ОБЯЗАТЕЛЕН.
//   LEAD_THREAD_ID      — (опц.) message_thread_id темы форума, если группа с темами.
//   DRY_RUN=true        — не слать в Telegram, только логировать (для локальной проверки).
//   LEAD_FALLBACK_EMAIL — (опц.) e-mail для отображения в тексте ошибки на странице.

import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import querystring from 'node:querystring';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PORT = parseInt(process.env.PORT || '3000', 10);

const ENV = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  LEAD_CHAT_ID: process.env.LEAD_CHAT_ID || '',
  LEAD_THREAD_ID: process.env.LEAD_THREAD_ID || '',
  DRY_RUN: process.env.DRY_RUN === 'true',
  LEAD_FALLBACK_EMAIL: process.env.LEAD_FALLBACK_EMAIL || 'info@server-pro.uz',
  // ── Odoo CRM: дублируем заявку в воронку «ServerPro» (crm.team id 10) ──
  ODOO_URL: (process.env.ODOO_URL || '').replace(/\/+$/, ''),
  ODOO_DB: process.env.ODOO_DB || '',
  ODOO_LOGIN: process.env.ODOO_LOGIN || '',
  ODOO_PASSWORD: process.env.ODOO_PASSWORD || '',
  ODOO_COMPANY_ID: parseInt(process.env.ODOO_COMPANY_ID || '0', 10) || 0, // ID компании в вашей Odoo
  ODOO_SALESPERSON_ID: parseInt(process.env.ODOO_SALESPERSON_ID || '0', 10) || 0, // ответственный; 0 = не назначать
  CRM_TEAM_ID: parseInt(process.env.CRM_TEAM_ID || '0', 10) || 0, // id команды продаж (воронки)
};

// ─────────────────────────────────────────────────────────────────
// Утилиты

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// IP клиента (за ingress/прокси — из X-Forwarded-For). Для rate-limit.
function clientIp(req) {
  const xff = (req.headers['x-forwarded-for'] || '').toString();
  if (xff) return xff.split(',')[0].trim();
  return req.socket?.remoteAddress || '';
}

// Примитивный in-memory rate-limit по IP: max заявок за окно. Сбрасывается при рестарте.
const RATE = { windowMs: 10 * 60 * 1000, max: 6, hits: new Map() };
function rateLimited(req) {
  const ip = clientIp(req) || 'unknown';
  const now = Date.now();
  if (RATE.hits.size > 10000) RATE.hits.clear();
  const arr = (RATE.hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  arr.push(now);
  RATE.hits.set(ip, arr);
  return arr.length > RATE.max;
}

const ATTRIB_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'yclid', 'gclid'];

// Интенты воронки (см. src/lib/intents.ts) → человекочитаемая метка для менеджера (RU).
const INTENT_LABELS = {
  'demo-monitoring': 'Демо · мониторинг',
  'diagnostic-day': 'День диагностики',
  'gateway-pilot': 'Пилотный шлюз',
  'full-deployment': 'Полное внедрение',
  'demo-apc': 'Демо · APC',
  'apc-pilot': 'Пилот APC',
  'apc-deployment': 'Развёртывание APC',
  'apc-maas': 'Сервисный контракт APC',
  'datasheet': 'Запрос даташита',
  'general': 'Общий запрос',
};

// ─────────────────────────────────────────────────────────────────
// Telegram

function sendTelegram(text) {
  return new Promise((resolve, reject) => {
    const payload = {
      chat_id: ENV.LEAD_CHAT_ID,
      parse_mode: 'HTML',
      text,
      link_preview_options: { is_disabled: true },
    };
    if (ENV.LEAD_THREAD_ID) payload.message_thread_id = parseInt(ENV.LEAD_THREAD_ID, 10);
    const body = JSON.stringify(payload);

    const req = https.request(
      {
        hostname: 'api.telegram.org',
        path: `/bot${ENV.TELEGRAM_BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: { 'content-type': 'application/json', 'content-length': Buffer.byteLength(body) },
        timeout: 10000,
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.ok) resolve(parsed);
            else reject(new Error(`Telegram API: ${parsed.description || 'unknown'}`));
          } catch {
            reject(new Error(`Telegram API: bad response (${res.statusCode})`));
          }
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('Telegram API timeout')));
    req.end(body);
  });
}

// ─────────────────────────────────────────────────────────────────
// Odoo XML-RPC (минимальный клиент под authenticate + execute_kw).
// escapeHtml (&<>) достаточно для экранирования строк XML-RPC — Odoo декодирует их обратно.

function valueToXml(v) {
  if (v && typeof v === 'object' && v.kind) {
    switch (v.kind) {
      case 'string': return `<value><string>${escapeHtml(v.v)}</string></value>`;
      case 'int': return `<value><int>${v.v | 0}</int></value>`;
      case 'bool': return `<value><boolean>${v.v ? 1 : 0}</boolean></value>`;
      case 'array': return `<value><array><data>${v.v.map(valueToXml).join('')}</data></array></value>`;
      case 'struct': return `<value><struct>${Object.entries(v.v).map(([k, vv]) =>
        `<member><name>${escapeHtml(k)}</name>${valueToXml(vv)}</member>`).join('')}</struct></value>`;
    }
  }
  throw new Error('unknown XML-RPC value');
}

const xstr = (v) => ({ kind: 'string', v });
const xint = (v) => ({ kind: 'int', v });
const xarr = (v) => ({ kind: 'array', v });
const xstruct = (v) => ({ kind: 'struct', v });

function methodCall(method, params) {
  return `<?xml version="1.0"?><methodCall><methodName>${escapeHtml(method)}</methodName><params>${
    params.map((p) => `<param>${valueToXml(p)}</param>`).join('')
  }</params></methodCall>`;
}

function parseScalar(xml) {
  if (/<fault\b/.test(xml)) {
    const fs = xml.match(/<faultString>\s*<string>([\s\S]*?)<\/string>/);
    throw new Error(`XML-RPC fault: ${fs ? fs[1].trim().slice(0, 300) : 'unknown'}`);
  }
  const intM = xml.match(/<value>\s*<(?:int|i4)>(-?\d+)<\/(?:int|i4)>/);
  if (intM) return parseInt(intM[1], 10);
  const strM = xml.match(/<value>\s*<string>([^<]*)<\/string>/);
  if (strM) return strM[1];
  const boolM = xml.match(/<value>\s*<boolean>([01])<\/boolean>/);
  if (boolM) return boolM[1] === '1';
  return null;
}

async function rpc(url, body) {
  const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'text/xml' }, body });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return await r.text();
}

async function odooAuth() {
  const xml = await rpc(`${ENV.ODOO_URL}/xmlrpc/2/common`, methodCall('authenticate', [
    xstr(ENV.ODOO_DB), xstr(ENV.ODOO_LOGIN), xstr(ENV.ODOO_PASSWORD), xstruct({}),
  ]));
  const uid = parseScalar(xml);
  if (typeof uid !== 'number' || uid <= 0) throw new Error('Odoo auth failed');
  return uid;
}

async function odooCreate(uid, model, values) {
  const xml = await rpc(`${ENV.ODOO_URL}/xmlrpc/2/object`, methodCall('execute_kw', [
    xstr(ENV.ODOO_DB), xint(uid), xstr(ENV.ODOO_PASSWORD),
    xstr(model), xstr('create'), xarr([xarr([xstruct(values)])]),
  ]));
  const id = parseScalar(xml);
  if (typeof id !== 'number') throw new Error('Odoo create failed');
  return id;
}

// Найти запись по имени (=ilike) или создать; вернуть id. Для utm.source/medium, crm.tag.
async function odooFindOrCreate(uid, model, name) {
  const xml = await rpc(`${ENV.ODOO_URL}/xmlrpc/2/object`, methodCall('execute_kw', [
    xstr(ENV.ODOO_DB), xint(uid), xstr(ENV.ODOO_PASSWORD),
    xstr(model), xstr('search'),
    xarr([xarr([xarr([xstr('name'), xstr('=ilike'), xstr(name)])])]),
    xstruct({ limit: xint(1) }),
  ]));
  if (/<fault\b/.test(xml)) {
    const fs = xml.match(/<faultString>\s*<string>([\s\S]*?)<\/string>/);
    throw new Error(`XML-RPC fault: ${fs ? fs[1].trim().slice(0, 300) : 'unknown'}`);
  }
  const m = xml.match(/<(?:int|i4)>(-?\d+)<\/(?:int|i4)>/);
  if (m) return parseInt(m[1], 10);
  return await odooCreate(uid, model, { name: xstr(name) });
}

// Создать crm.lead в воронке «ServerPro». Best-effort: если Odoo не сконфигурирован —
// тихо пропускаем; ошибки логируются вызывающей стороной и не влияют на ответ пользователю.
async function createOdooLead(data, { intentLabel, sourcePath, attribPairs }) {
  if (!ENV.ODOO_URL || !ENV.ODOO_DB || !ENV.ODOO_LOGIN || !ENV.ODOO_PASSWORD || !ENV.CRM_TEAM_ID) {
    console.warn('[/api/lead] Odoo не сконфигурирован (ODOO_*/CRM_TEAM_ID) — crm.lead пропущен');
    return null;
  }
  const uid = await odooAuth();

  const company = (data.company || '').toString().slice(0, 200);
  const contact = (data.contact || '').toString().trim().slice(0, 200);
  const isEmail = contact.includes('@');

  const contactName = (data.name || '').toString().slice(0, 200);
  const descLines = [
    data.message ? `<p>${escapeHtml((data.message || '').toString().slice(0, 4000)).replace(/\n/g, '<br>')}</p>` : '',
    '<p><strong>Заявка с сайта ServerPro</strong><br>',
    // Контактное лицо дублируем в описание: поле contact_name в этой БД может
    // перезаписываться автоматизацией на создание лида — так имя не теряется.
    `Контактное лицо: ${escapeHtml(contactName)}`,
    `<br>Контакт: <code>${escapeHtml(contact)}</code>`,
    `<br>Source: <code>${escapeHtml(sourcePath)}</code>`,
    attribPairs.length ? `<br>UTM: <code>${escapeHtml(attribPairs.join(' '))}</code>` : '',
    '</p>',
  ].filter(Boolean).join('');

  const values = {
    name: xstr(`${intentLabel} — ${company}`),
    contact_name: xstr(contactName),
    partner_name: xstr(company),
    description: xstr(descLines),
    type: xstr('lead'),               // заявки сайта → инбокс «Лиды» команды
    team_id: xint(ENV.CRM_TEAM_ID),   // воронка ServerPro (id 10)
    company_id: xint(ENV.ODOO_COMPANY_ID),
  };
  if (isEmail) values.email_from = xstr(contact);
  else if (contact) values.phone = xstr(contact);
  if (ENV.ODOO_SALESPERSON_ID) values.user_id = xint(ENV.ODOO_SALESPERSON_ID);

  // Атрибуция: источник/канал и тег — каждый best-effort, чтобы сбой не терял лид.
  try {
    const src = ((data.utm_source || '').toString().trim() || 'ServerPro сайт').slice(0, 80);
    values.source_id = xint(await odooFindOrCreate(uid, 'utm.source', src));
    values.medium_id = xint(await odooFindOrCreate(uid, 'utm.medium', 'Веб-форма'));
  } catch (e) { console.warn('[/api/lead] utm map failed:', e.message); }
  try {
    const tagId = await odooFindOrCreate(uid, 'crm.tag', 'Сайт ServerPro');
    values.tag_ids = xarr([xarr([xint(6), xint(0), xarr([xint(tagId)])])]); // (6,0,[id])
  } catch (e) { console.warn('[/api/lead] tag failed:', e.message); }

  const id = await odooCreate(uid, 'crm.lead', values);
  console.log(`[/api/lead] crm.lead created id=${id} team=${ENV.CRM_TEAM_ID} company=${company.slice(0, 60)}`);
  return id;
}

// ─────────────────────────────────────────────────────────────────
// Lead handler

async function handleLead(req, res) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 100_000) { req.destroy(); return; } // защита от гигантских тел
  }
  let data = {};
  const ct = (req.headers['content-type'] || '').toString();
  if (ct.includes('application/json')) {
    try { data = JSON.parse(body); } catch { data = {}; }
  } else {
    data = querystring.parse(body);
  }

  const accept = (req.headers['accept'] || '').toString();
  const sourcePath = (data.source_path || '/').toString();
  const locale = sourcePath.startsWith('/uz/') || sourcePath === '/uz' ? 'uz' : 'ru';

  // Rate-limit по IP — раньше остальных проверок
  if (rateLimited(req)) {
    console.warn('[/api/lead] rate-limited', clientIp(req));
    return json(res, 429, { ok: false, error: 'Too many requests. Try again later.' });
  }

  // Honeypot (_honey заполняют боты → тихо принимаем и выбрасываем)
  if ((data._honey || '').toString().trim() !== '') {
    return leadOk(res, accept, locale);
  }

  // Обязательные поля
  for (const f of ['name', 'company', 'contact']) {
    if (!(data[f] || '').toString().trim()) {
      return json(res, 400, { ok: false, error: `Missing ${f}` });
    }
  }

  // Согласие на обработку ПД — обязательно
  const consent = (data.consent || '').toString();
  if (consent !== 'on' && consent !== 'true' && consent !== '1') {
    return json(res, 400, { ok: false, error: 'Consent required' });
  }

  const intent = (data.intent || 'general').toString();
  const intentLabel = INTENT_LABELS[intent] || INTENT_LABELS.general;

  const attribPairs = ATTRIB_KEYS
    .filter((k) => (data[k] || '').toString().trim())
    .map((k) => `${k}=${(data[k] || '').toString().slice(0, 200)}`);

  const langTag = locale === 'uz' ? 'UZ 🇺🇿' : 'RU 🇷🇺';
  const lines = [
    '🔔 <b>Новая заявка · ServerPro</b>',
    '',
    `<b>Интент:</b> ${escapeHtml(intentLabel)}`,
    `<b>Имя:</b> ${escapeHtml((data.name || '').toString().slice(0, 200))}`,
    `<b>Компания:</b> ${escapeHtml((data.company || '').toString().slice(0, 200))}`,
    `<b>Контакт:</b> ${escapeHtml((data.contact || '').toString().slice(0, 200))}`,
    (data.message || '').toString().trim()
      ? `<b>Задача:</b> ${escapeHtml((data.message || '').toString().slice(0, 2000))}`
      : '',
    '',
    `<b>Страница:</b> <code>${escapeHtml(sourcePath.slice(0, 300))}</code>`,
    attribPairs.length ? `<b>UTM:</b> <code>${escapeHtml(attribPairs.join(' '))}</code>` : '',
    `<i>Язык формы: ${langTag}</i>`,
  ].filter(Boolean);
  const text = lines.join('\n');

  if (ENV.DRY_RUN) {
    console.log('[/api/lead] DRY_RUN telegram:\n' + text.replace(/<[^>]+>/g, ''));
    console.log('[/api/lead] DRY_RUN crm.lead:', JSON.stringify({
      name: `${intentLabel} — ${(data.company || '').toString().slice(0, 80)}`,
      contact_name: (data.name || '').toString(),
      contact: (data.contact || '').toString(),
      type: 'lead', team_id: ENV.CRM_TEAM_ID, company_id: ENV.ODOO_COMPANY_ID,
      user_id: ENV.ODOO_SALESPERSON_ID || null,
    }));
    return leadOk(res, accept, locale);
  }

  if (!ENV.TELEGRAM_BOT_TOKEN || !ENV.LEAD_CHAT_ID) {
    console.error('[/api/lead] Missing TELEGRAM_BOT_TOKEN or LEAD_CHAT_ID');
    return json(res, 500, { ok: false, error: 'Server not configured' });
  }

  // 1) Telegram — первичный канал (мгновенное уведомление). Сбой → пользователь видит ошибку.
  try {
    await sendTelegram(text);
  } catch (e) {
    console.error('[/api/lead] Telegram error:', e.message);
    return json(res, 502, { ok: false, error: 'Delivery failed' });
  }
  console.log(`[/api/lead] sent intent=${intent} company=${(data.company || '').toString().slice(0, 80)}`);
  leadOk(res, accept, locale);

  // 2) Дублируем в Odoo-воронку «ServerPro» — best-effort, НЕ блокирует ответ и не валит заявку.
  createOdooLead(data, { intentLabel, sourcePath, attribPairs })
    .catch((e) => console.error('[/api/lead] Odoo error:', e.message));
}

// ─────────────────────────────────────────────────────────────────
// Ответы

function json(res, status, obj) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

// AJAX (Accept: json) → JSON; нативная форма без JS → 303 на страницу с ?lead=ok.
function leadOk(res, accept, locale) {
  if (accept.includes('application/json')) return json(res, 200, { ok: true });
  const target = locale === 'uz' ? '/uz/?lead=ok#cta' : '/?lead=ok#cta';
  res.writeHead(303, { location: target });
  res.end();
}

// ─────────────────────────────────────────────────────────────────
// Static file serving (Astro dist)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function safeJoin(base, target) {
  const targetPath = path.posix.normalize('/' + target).replace(/^\/+/, '');
  const full = path.join(base, targetPath);
  if (!full.startsWith(base)) return null;
  return full;
}

function serveStatic(req, res) {
  const rawPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let urlPath = rawPath;
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const filePath = safeJoin(DIST, urlPath);
  if (!filePath) { res.writeHead(403); return res.end('Forbidden'); }

  let stat = null;
  try { stat = fs.statSync(filePath); } catch { stat = null; }

  if (stat && stat.isDirectory()) {
    res.writeHead(301, { location: rawPath + '/' });
    return res.end();
  }

  if (!stat) {
    const asDir = path.join(DIST, rawPath, 'index.html');
    if (fs.existsSync(asDir)) {
      res.writeHead(301, { location: rawPath + '/' });
      return res.end();
    }
    const notFound = path.join(DIST, '404.html');
    if (fs.existsSync(notFound)) {
      const buf = fs.readFileSync(notFound);
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      return res.end(buf);
    }
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('Not found');
  }

  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';
  const cacheControl = ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=86400';
  res.writeHead(200, { 'content-type': type, 'cache-control': cacheControl });
  const stream = fs.createReadStream(filePath);
  stream.on('error', (e) => {
    console.error('static stream error', filePath, e.message);
    if (!res.headersSent) res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end();
  });
  stream.pipe(res);
}

// ─────────────────────────────────────────────────────────────────
// Server

const server = http.createServer((req, res) => {
  const url = req.url || '/';
  if (req.method === 'POST' && url.startsWith('/api/lead')) {
    return handleLead(req, res).catch((e) => {
      console.error('handler crashed', e);
      json(res, 500, { ok: false, error: 'Internal error' });
    });
  }
  if (req.method === 'GET' || req.method === 'HEAD') {
    return serveStatic(req, res);
  }
  res.writeHead(405);
  res.end('Method not allowed');
});

server.listen(PORT, () => {
  const tg = ENV.DRY_RUN ? 'DRY_RUN' : (ENV.TELEGRAM_BOT_TOKEN && ENV.LEAD_CHAT_ID ? `→ chat ${ENV.LEAD_CHAT_ID}${ENV.LEAD_THREAD_ID ? '/' + ENV.LEAD_THREAD_ID : ''}` : 'NOT CONFIGURED');
  const odoo = ENV.ODOO_URL && ENV.ODOO_DB && ENV.ODOO_LOGIN && ENV.ODOO_PASSWORD && ENV.CRM_TEAM_ID
    ? `→ team ${ENV.CRM_TEAM_ID} (company ${ENV.ODOO_COMPANY_ID})` : 'off';
  console.log(`serverpro site listening on :${PORT}, dist=${DIST}, telegram=${tg}, odoo=${odoo}`);
});
