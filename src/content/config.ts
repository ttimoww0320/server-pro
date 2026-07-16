import { defineCollection, z } from 'astro:content';

// Layer Б — «технологический партнёр Лиман-Тех»: продукты, кейсы, отраслевая методология.
// База переносима почти без изменений — источник Sona (RU был основным языком контента и там).
//
// Двуязычие: каждая коллекция существует в двух версиях — RU (базовая) и UZ (суффикс `Uz`,
// узбекская латиница). Slug'и файлов в парах ДОЛЖНЫ совпадать (напр. products/passer-v.md ↔
// productsUz/passer-v.md), чтобы переключатель языка вёл со страницы на её перевод.

const newsSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string(),
  cover: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const productsSchema = z.object({
  name: z.string(),
  family: z.enum(['Пассер', 'Ларус', 'Стрикс', 'Прочее']),
  summary: z.string(),
  image: z.string().optional(),
  specs: z.record(z.string()).optional(),
  order: z.number().default(100),
  pulse_role: z.string().optional(),
  pulse_label: z.string().optional(),
});

const casesSchema = z.object({
  client: z.string(),
  client_internal: z.string().optional(),
  industry: z.enum([
    'Машиностроение',
    'Транспортная инфраструктура',
    'Энергетика',
    'Нефтегаз',
    'Горная добыча и металлы',
    'Прочее',
  ]),
  region: z.string().default('Россия и СНГ'),
  year: z.string(),
  scale: z.string().optional(),
  summary: z.string(),
  products: z.array(z.string()).default([]),
  application: z.string().optional(),
  metrics: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(['completed', 'deployed', 'rolling_out']).default('completed'),
  cover: z.string().optional(),
});

const industriesSchema = z.object({
  name: z.string(),
  summary: z.string(),
  accent: z.string().optional(),
  order: z.number().default(100),
  icon: z.string().optional(),
  equipment_keywords: z.array(z.string()).default([]),
  strongest_combo: z.string().optional(),
  stages: z.array(z.object({
    n: z.string(),
    name: z.string(),
    equipment: z.string().optional(),
    vibro: z.string().optional(),
    current: z.string().optional(),
    apc: z.string().optional(),
    cv: z.string().optional(),
    effect: z.string().optional(),
  })).optional(),
  combos: z.array(z.object({
    stage: z.string(),
    methods: z.string(),
    note: z.string().optional(),
  })).optional(),
  packages: z.array(z.object({
    level: z.number(),
    title: z.string(),
    target: z.string(),
    tools: z.string(),
  })).optional(),
});

// Layer А — «опыт ServerPro»: собственные услуги и проекты регионального представителя.
// Источник — server-pro.uz; детали проектов не подтверждены (verified: false), не придумывать сверх исходника.

const serverproServicesSchema = z.object({
  name: z.string(),
  code: z.string().optional(),
  summary: z.string(),
  order: z.number().default(100),
});

const serverproProjectsSchema = z.object({
  client: z.string(),
  summary: z.string(),
  year: z.string().optional(),
  sector: z.enum(['Уголь', 'Энергетика', 'Транспорт', 'Недвижимость']).optional(),
  verified: z.boolean().default(false),
});

const news = defineCollection({ type: 'content', schema: newsSchema });
const products = defineCollection({ type: 'content', schema: productsSchema });
const cases = defineCollection({ type: 'content', schema: casesSchema });
const industries = defineCollection({ type: 'content', schema: industriesSchema });
const serverproServices = defineCollection({ type: 'content', schema: serverproServicesSchema });
const serverproProjects = defineCollection({ type: 'content', schema: serverproProjectsSchema });

// UZ-зеркала (узбекская латиница) — те же схемы, отдельные каталоги src/content/<name>Uz/.
const newsUz = defineCollection({ type: 'content', schema: newsSchema });
const productsUz = defineCollection({ type: 'content', schema: productsSchema });
const casesUz = defineCollection({ type: 'content', schema: casesSchema });
const industriesUz = defineCollection({ type: 'content', schema: industriesSchema });
const serverproServicesUz = defineCollection({ type: 'content', schema: serverproServicesSchema });
const serverproProjectsUz = defineCollection({ type: 'content', schema: serverproProjectsSchema });

export const collections = {
  news, products, cases, industries, serverproServices, serverproProjects,
  newsUz, productsUz, casesUz, industriesUz, serverproServicesUz, serverproProjectsUz,
};
