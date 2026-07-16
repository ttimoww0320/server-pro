// Двуязычие ServerPro: RU (основной, в корне «/») + UZ (узбекская латиница, «/uz/»).
// Здесь — общие строки «обвязки» (шапка/подвал/куки/мета) и хелперы маршрутов.
// Контент страниц и коллекций переводится в самих файлах (src/pages/uz/*, *Uz-коллекции).
//
// Тон: о продукте и R&D производителя — от третьего лица («производитель» /
// «ishlab chiqaruvchi»); «мы/наш» — только про собственную работу ServerPro.
// Бренды в латинице: Passer / Larus / Strix / Yulduz / Liman-Tech.

export type Locale = 'ru' | 'uz';

export const ui = {
  ru: {
    htmlLang: 'ru',
    // Короткая метка перехода на ДРУГОЙ язык (то, что видит пользователь в переключателе)
    switchTo: "O'zbekcha",
    switchToShort: 'UZ',
    home: 'ServerPro — главная',
    menu: 'Меню',
    nav: [
      { path: '/#dirs', label: 'Направления' },
      { path: '/#stack', label: 'Продукты' },
      { path: '/yulduz/', label: 'Юлдуз' },
      { path: '/industries/', label: 'Отрасли' },
      { path: '/#partners', label: 'Технологии' },
      { path: '/about/', label: 'О компании' },
    ],
    cta: { discuss: 'Обсудить задачу' },
    footer: {
      blurb: 'Инженерная компания в Ташкенте. Цифровизация промышленности, города и бизнеса — от проекта до сервиса.',
      solutionsTitle: 'Решения',
      companyTitle: 'Компания',
      solutions: [
        { path: '/#dirs', label: 'Цифровизация промышленности' },
        { path: '/#dirs', label: 'Цифровой город' },
        { path: '/#dirs', label: 'Управление и ИИ' },
        { path: '/#stack', label: 'Стек мониторинга L0–L3' },
        { path: '/yulduz/', label: 'Юлдуз — собственный бренд' },
      ],
      company: [
        { path: '/#office', label: 'Офис и производственная площадка' },
        { path: '/services/', label: 'Наши услуги' },
        { path: '/projects/', label: 'Наши проекты' },
        { path: '/industries/', label: 'Отрасли' },
        { path: '/#partners', label: 'Технологии и партнёры' },
        { path: '/#how', label: 'Как мы работаем' },
        { path: '/news/', label: 'Новости' },
        { path: '/about/', label: 'О компании' },
      ],
      contacts: 'Контакты',
      privacy: 'Политика обработки данных',
      docsExternal: 'Документация производителя ↗',
      rightsLine1: '© {year} ООО «SERVERPRO», Ташкент · Инженерная компания: промышленность, город, управление и ИИ',
      rightsLine2: 'ИНН 311028163 · официальный региональный дилер линейки Пассер / Ларус / Стрикс',
    },
    cookie: {
      body: 'Мы используем файлы cookie для работы сайта и обезличенной аналитики посещений (Яндекс.Метрика). Продолжая использование, вы соглашаетесь с нашей',
      link: 'Политикой обработки данных',
      accept: 'Принять',
      decline: 'Только необходимые',
    },
    meta: {
      title: 'ServerPro — цифровизация промышленности, города и бизнеса · Ташкент',
      description:
        'ServerPro — инженерная компания в Ташкенте: предиктивная вибро- и токовая диагностика и мониторинг оборудования, цифровой город и решения на основе ИИ. Проектируем, поставляем, монтируем и сопровождаем — от датчика до диспетчерской. Официальный региональный дилер линейки «Пассер»/«Ларус»/«Стрикс» в Узбекистане, Казахстане и Киргизии.',
    },
  },
  uz: {
    htmlLang: 'uz',
    switchTo: 'Русский',
    switchToShort: 'RU',
    home: 'ServerPro — bosh sahifa',
    menu: 'Menyu',
    nav: [
      { path: '/#dirs', label: "Yo'nalishlar" },
      { path: '/#stack', label: 'Mahsulotlar' },
      { path: '/yulduz/', label: 'Yulduz' },
      { path: '/industries/', label: 'Tarmoqlar' },
      { path: '/#partners', label: 'Texnologiyalar' },
      { path: '/about/', label: 'Kompaniya haqida' },
    ],
    cta: { discuss: 'Masalani muhokama qilish' },
    footer: {
      blurb: "Toshkentdagi muhandislik kompaniyasi. Sanoat, shahar va biznesni raqamlashtirish — loyihadan servisgacha.",
      solutionsTitle: 'Yechimlar',
      companyTitle: 'Kompaniya',
      solutions: [
        { path: '/#dirs', label: 'Sanoatni raqamlashtirish' },
        { path: '/#dirs', label: 'Raqamli shahar' },
        { path: '/#dirs', label: "Boshqaruv va sun'iy intellekt" },
        { path: '/#stack', label: 'L0–L3 monitoring steki' },
        { path: '/yulduz/', label: "Yulduz — o'z brendi" },
      ],
      company: [
        { path: '/#office', label: 'Ofis va ishlab chiqarish maydonchasi' },
        { path: '/services/', label: 'Bizning xizmatlar' },
        { path: '/projects/', label: 'Bizning loyihalar' },
        { path: '/industries/', label: 'Tarmoqlar' },
        { path: '/#partners', label: 'Texnologiyalar va hamkorlar' },
        { path: '/#how', label: 'Qanday ishlaymiz' },
        { path: '/news/', label: 'Yangiliklar' },
        { path: '/about/', label: 'Kompaniya haqida' },
      ],
      contacts: 'Kontaktlar',
      privacy: "Ma'lumotlarni qayta ishlash siyosati",
      docsExternal: 'Ishlab chiqaruvchi hujjatlari ↗',
      rightsLine1: '© {year} «SERVERPRO» MChJ, Toshkent · Muhandislik kompaniyasi: sanoat, shahar, boshqaruv va SI',
      rightsLine2: 'STIR 311028163 · Passer / Larus / Strix liniyasining rasmiy mintaqaviy dileri',
    },
    cookie: {
      body: "Saytning ishlashi va tashriflarning anonim tahlili (Yandex.Metrika) uchun cookie fayllaridan foydalanamiz. Foydalanishda davom etib, siz bizning",
      link: "Ma'lumotlarni qayta ishlash siyosatimizga",
      accept: 'Qabul qilish',
      decline: 'Faqat zarurlari',
    },
    meta: {
      title: 'ServerPro — sanoat, shahar va biznesni raqamlashtirish · Toshkent',
      description:
        "ServerPro — Toshkentdagi muhandislik kompaniyasi: uskunalarning prediktiv vibro- va tok diagnostikasi hamda monitoringi, raqamli shahar va sun'iy intellektga asoslangan yechimlar. Loyihalashtiramiz, yetkazib beramiz, o'rnatamiz va texnik xizmat ko'rsatamiz — datchikdan dispetcherlik punktigacha. «Passer»/«Larus»/«Strix» liniyasining O'zbekiston, Qozog'iston va Qirg'izistondagi rasmiy mintaqaviy dileri.",
    },
  },
} as const;

/** Локаль по пути: /uz или /uz/* → 'uz', остальное → 'ru' (основной). */
export function getLocale(pathname: string): Locale {
  return pathname === '/uz' || pathname.startsWith('/uz/') ? 'uz' : 'ru';
}

export function altLocale(locale: Locale): Locale {
  return locale === 'ru' ? 'uz' : 'ru';
}

/** RU-путь (канон) → путь для нужной локали. '/about/' → '/uz/about/' для uz. */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === 'ru') return path;
  if (path === '/') return '/uz/';
  return '/uz' + path;
}

/** Текущий путь → его эквивалент на другой локали (для переключателя языка). */
export function switchLocalePath(pathname: string, to: Locale): string {
  const bare = pathname.replace(/^\/uz(?=\/|$)/, '') || '/';
  if (to === 'ru') return bare;
  return bare === '/' ? '/uz/' : '/uz' + bare;
}
