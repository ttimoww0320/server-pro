// Реестр lead-интентов — используется на /pilot/, в контактной форме и (в перспективе)
// бэкендом /api/lead для тегирования заявок по стадии воронки и треку.
// Цены — в USD (единая витринная валюта, без региональной дискриминации на сайте).

export type Track = 'monitoring' | 'apc' | 'other';

export interface IntentDef {
  id: string;
  track: Track;
  level: number;
  label: string;
  formTitle: string;
  cardTitle: string;
  price: string;
  duration: string;
  artifact: string;
  composition?: string;
}

export const INTENTS: Record<string, IntentDef> = {
  // ── Трек 1: Мониторинг и диагностика (железо + ПО + тендеры) ──
  'demo-monitoring': {
    id: 'demo-monitoring',
    track: 'monitoring',
    level: 1,
    label: 'Демо',
    formTitle: 'Записаться на демо',
    cardTitle: 'Демо',
    price: 'Бесплатно',
    duration: '30–60 мин · онлайн',
    artifact: 'Показ «Стрикс.Платформа» на референсных данных. Понимаем вашу боль, квалифицируем сценарий.',
  },
  'diagnostic-day': {
    id: 'diagnostic-day',
    track: 'monitoring',
    level: 2,
    label: 'День диагностики',
    formTitle: 'День диагностики — выезд инженера',
    cardTitle: 'День диагностики',
    price: '$800–1 200',
    duration: '1 день · выезд инженера',
    artifact: 'Письменный отчёт с находками и рекомендациями за 5 рабочих дней.',
    composition: 'Экспресс-вибродиагностика «Пассер»+«Ларус» на 3–5 точках, ваш выбор агрегатов.',
  },
  'gateway-pilot': {
    id: 'gateway-pilot',
    track: 'monitoring',
    level: 3,
    label: 'Пилотный шлюз',
    formTitle: 'Пилотный шлюз — продуктовый пилот',
    cardTitle: 'Пилотный шлюз',
    price: '$1 500–3 000',
    duration: '4–8 нед.',
    artifact: 'Сырые данные в облаке «Стрикс» + диагностический отчёт за 6 недель.',
    composition: '1 шлюз «Ларус-100» + до 8 каналов «Пассер-В» / «Пассер-Т». Фиксированная цена и состав.',
  },
  'full-deployment': {
    id: 'full-deployment',
    track: 'monitoring',
    level: 4,
    label: 'Полное внедрение',
    formTitle: 'Заявка на полное внедрение',
    cardTitle: 'Полное внедрение / тендер',
    price: 'по ТКП',
    duration: 'от 3 мес.',
    artifact: 'Промышленная эксплуатация, поставка железа + ПО, обучение, поддержка.',
    composition: 'Тиражируемая архитектура: «Пассер» × N + «Ларус» + «Стрикс». Проектная или тендерная поставка.',
  },

  // ── Трек 2: APC и оптимизация процессов ──
  'demo-apc': {
    id: 'demo-apc',
    track: 'apc',
    level: 1,
    label: 'Демо APC',
    formTitle: 'Записаться на демо APC',
    cardTitle: 'Демо APC',
    price: 'Бесплатно',
    duration: '30–60 мин · онлайн',
    artifact: 'Реальные кейсы APC: флотация, мельницы, печи. Что у вас оптимизируется и какой эффект ожидать.',
  },
  'apc-pilot': {
    id: 'apc-pilot',
    track: 'apc',
    level: 2,
    label: 'Пилот APC',
    formTitle: 'Пилот APC — оценка возможности',
    cardTitle: 'Пилот APC',
    price: 'Бесплатно',
    duration: '6–12 нед.',
    artifact: 'Согласованная цель оптимизации, исходный уровень, выбранный метод. Идём дальше — только если эффект достоверен.',
    composition: 'Стадии 1–3 по нашей методике: сбор данных → определение метода → согласование цели.',
  },
  'apc-deployment': {
    id: 'apc-deployment',
    track: 'apc',
    level: 3,
    label: 'Развёртывание APC',
    formTitle: 'Развёртывание APC',
    cardTitle: 'Развёртывание',
    price: 'по ТКП (компенсация затрат)',
    duration: '4–12 нед.',
    artifact: 'Алгоритм APC + советчик в контуре. Готовность к промышленной эксплуатации.',
    composition: 'Развёртывание модели в «Стрикс.APC», интеграция со SCADA, подключение оператора.',
  },
  'apc-maas': {
    id: 'apc-maas',
    track: 'apc',
    level: 4,
    label: 'Сервисный контракт',
    formTitle: 'Сервисный контракт APC — обсудить условия',
    cardTitle: 'Сервисный контракт',
    price: 'база $1 500–3 000/мес + 20% от экономии · потолок 3–4× базы',
    duration: '36 мес.',
    artifact: 'Долгосрочная промышленная эксплуатация. Платите за результат — нет экономии, нет переменной части.',
    composition: 'Промышленная поддержка, регулярная перенастройка алгоритма, измерение эффекта по согласованной методике.',
  },

  // ── Прочее (точечные CTA) ──
  'datasheet': {
    id: 'datasheet',
    track: 'other',
    level: 0,
    label: 'Даташит',
    formTitle: 'Запрос даташита',
    cardTitle: 'Даташит',
    price: 'Бесплатно',
    duration: '—',
    artifact: 'Полные ТТХ продукта, опциональные конфигурации, цена.',
  },
  'general': {
    id: 'general',
    track: 'other',
    level: 0,
    label: 'Общий запрос',
    formTitle: 'Записаться на демо',
    cardTitle: 'Общий запрос',
    price: '—',
    duration: '—',
    artifact: '—',
  },
};

export function intentTitle(id: string | null | undefined): string {
  const fallback = INTENTS.general.formTitle;
  if (!id) return fallback;
  return INTENTS[id]?.formTitle ?? fallback;
}

export const TRACK_1: IntentDef[] = ['demo-monitoring', 'diagnostic-day', 'gateway-pilot', 'full-deployment'].map(id => INTENTS[id]);
export const TRACK_2: IntentDef[] = ['demo-apc', 'apc-pilot', 'apc-deployment', 'apc-maas'].map(id => INTENTS[id]);
