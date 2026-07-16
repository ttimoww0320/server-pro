import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Доменная заглушка — реальный домен/деплой не решены на этом этапе.
  site: 'https://serverpro.example',
  integrations: [tailwind()],
  // Двуязычие: RU — основной язык в корне (/), UZ — узбекская латиница под /uz/.
  // prefixDefaultLocale:false → русские маршруты остаются без префикса (/about/),
  // узбекские зеркалятся с префиксом (/uz/about/). Хелперы — src/i18n/strings.ts.
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'uz'],
    routing: { prefixDefaultLocale: false },
  },
});
