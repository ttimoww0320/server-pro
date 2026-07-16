# ServerPro — website

Маркетинговый сайт **ServerPro** — официального регионального представителя линейки
промышленной вибро- и токовой диагностики, мониторинга и APC (Passer / Larus / Strix / LimanISU)
для Узбекистана, Казахстана, Киргизии и соседних рынков.

Двуязычный: русский — основной (в корне `/`), узбекская латиница — под `/uz/`.

## Стек

- **Astro 5** — статический генератор, content collections с zod-валидацией
- **Tailwind 3** — брендовые токены в `tailwind.config.mjs`
- Контент — Markdown в `src/content/`
- Node-сервер (`server/index.mjs`) для приёма заявок формы (`POST /api/lead`)

## Команды

```bash
npm install
npm run dev       # http://localhost:4321 (Astro dev)
npm run build     # → ./dist  (статическая сборка)
npm run preview   # предпросмотр dist без бэкенда
```

### Продакшн (сайт + приём заявок)

```bash
npm run build
node --env-file=.env server/index.mjs   # или: npm start (env из окружения)
```

Node-сервер отдаёт собранную статику из `dist/` и обрабатывает `POST /api/lead`:
валидация (honeypot, rate-limit, обязательные `name`/`company`/`contact` + согласие) →
отправка в Telegram-группу через Bot API, опционально — дублирование в CRM (Odoo).
Все секреты и адреса — только в env, см. **`.env.example`**. Токен бота в исходники не попадает.

## Структура

```
src/
├── pages/            # RU-маршруты в корне; UZ-зеркало под pages/uz/
├── layouts/          # Base.astro (принимает locale: ru|uz)
├── components/       # Header (переключатель РУ/UZ), Footer, Logo, …
├── i18n/strings.ts   # общие строки RU/UZ + хелперы локали
├── lib/              # lead.ts (endpoint формы), intents(.uz).ts (воронка)
├── content/          # коллекции (products, cases, industries, news, …) + их *Uz-зеркала
└── styles/global.css # tailwind-слои + брендовые утилиты
public/               # статика (изображения, favicon)
server/index.mjs      # прод-сервер: dist/ + /api/lead
```

## Контент

Markdown в `src/content/<коллекция>/`. Каждая RU-коллекция имеет UZ-зеркало с суффиксом `Uz`
(`newsUz`, `productsUz`, …) — слаги файлов совпадают в паре RU/UZ, чтобы переключатель языка
попадал на переведённую страницу. Схемы коллекций — `src/content/config.ts`.

> ⚠️ Узбекский слой — машинный перевод; перед публикацией нужна вычитка носителем языка.
