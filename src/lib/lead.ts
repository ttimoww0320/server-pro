// Куда уходят заявки формы ServerPro.
//
// Решение (2026-07-15): у сайта есть собственный бэкенд (server/index.mjs) — заявки
// принимает `/api/lead` и пересылает в Telegram-группу через Bot API. Токен бота живёт
// ТОЛЬКО на сервере (env TELEGRAM_BOT_TOKEN), в коде страницы его нет.
//
// Оба пути ведут на один эндпоинт:
//   • LEAD_ENDPOINT      — no-JS фолбэк: нативный POST формы (сервер отвечает 303 → ?lead=ok)
//   • LEAD_ENDPOINT_AJAX — основной путь: fetch с `Accept: application/json` (сервер → JSON)
//
// Настройка сервера — см. .env.example (TELEGRAM_BOT_TOKEN, LEAD_CHAT_ID, LEAD_THREAD_ID).
// История: до 2026-07-15 использовался form-to-email сервис FormSubmit (без бэкенда).

// Fallback-контакт, показываемый пользователю в тексте ошибки отправки.
export const LEAD_EMAIL = 'info@server-pro.uz';

// Единый эндпоинт бэкенда (относительный путь — тот же хост, что и сайт).
export const LEAD_ENDPOINT = '/api/lead';
export const LEAD_ENDPOINT_AJAX = '/api/lead';
