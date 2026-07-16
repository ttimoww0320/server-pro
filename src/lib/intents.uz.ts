// UZ-версия реестра lead-интентов (узбекская латиница) для /uz/pilot/ и форм.
// Структура зеркалит src/lib/intents.ts; переведены только витринные строки.
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
  // ── Yo'nalish 1: Monitoring va diagnostika (uskuna + DT + tenderlar) ──
  'demo-monitoring': {
    id: 'demo-monitoring',
    track: 'monitoring',
    level: 1,
    label: 'Demo',
    formTitle: 'Demoga yozilish',
    cardTitle: 'Demo',
    price: 'Bepul',
    duration: '30–60 daqiqa · onlayn',
    artifact: "«Strix.Platforma»ni namunaviy ma'lumotlarda ko'rsatish. Muammoingizni tushunamiz, ssenariyni baholaymiz.",
  },
  'diagnostic-day': {
    id: 'diagnostic-day',
    track: 'monitoring',
    level: 2,
    label: 'Diagnostika kuni',
    formTitle: "Diagnostika kuni — muhandisning chiqishi",
    cardTitle: 'Diagnostika kuni',
    price: '$800–1 200',
    duration: '1 kun · muhandis chiqishi',
    artifact: "5 ish kuni ichida topilmalar va tavsiyalar bilan yozma hisobot.",
    composition: "3–5 nuqtada «Passer»+«Larus» ekspress vibrodiagnostikasi, agregatlarni o'zingiz tanlaysiz.",
  },
  'gateway-pilot': {
    id: 'gateway-pilot',
    track: 'monitoring',
    level: 3,
    label: 'Pilot shlyuz',
    formTitle: 'Pilot shlyuz — mahsulot piloti',
    cardTitle: 'Pilot shlyuz',
    price: '$1 500–3 000',
    duration: '4–8 hafta',
    artifact: "6 hafta ichida «Strix» bulutida xom ma'lumotlar + diagnostik hisobot.",
    composition: "1 ta «Larus-100» shlyuzi + 8 tagacha «Passer-V» / «Passer-T» kanali. Belgilangan narx va tarkib.",
  },
  'full-deployment': {
    id: 'full-deployment',
    track: 'monitoring',
    level: 4,
    label: "To'liq joriy etish",
    formTitle: "To'liq joriy etishga ariza",
    cardTitle: "To'liq joriy etish / tender",
    price: "TKT bo'yicha",
    duration: '3 oydan',
    artifact: "Sanoat ekspluatatsiyasi, uskuna + DT yetkazib berish, o'qitish, qo'llab-quvvatlash.",
    composition: "Takrorlanadigan arxitektura: «Passer» × N + «Larus» + «Strix». Loyihaviy yoki tenderli yetkazib berish.",
  },

  // ── Yo'nalish 2: APC va jarayonlarni optimallashtirish ──
  'demo-apc': {
    id: 'demo-apc',
    track: 'apc',
    level: 1,
    label: 'APC demo',
    formTitle: 'APC demoga yozilish',
    cardTitle: 'APC demo',
    price: 'Bepul',
    duration: '30–60 daqiqa · onlayn',
    artifact: "Haqiqiy APC keyslari: flotatsiya, tegirmonlar, pechlar. Sizda nima optimallashtiriladi va qanday samara kutish mumkin.",
  },
  'apc-pilot': {
    id: 'apc-pilot',
    track: 'apc',
    level: 2,
    label: 'APC pilot',
    formTitle: "APC pilot — imkoniyatni baholash",
    cardTitle: 'APC pilot',
    price: 'Bepul',
    duration: '6–12 hafta',
    artifact: "Kelishilgan optimallashtirish maqsadi, boshlang'ich daraja, tanlangan usul. Davom etamiz — faqat samara ishonchli bo'lsa.",
    composition: "Metodikamiz bo'yicha 1–3-bosqichlar: ma'lumot yig'ish → usulni aniqlash → maqsadni kelishish.",
  },
  'apc-deployment': {
    id: 'apc-deployment',
    track: 'apc',
    level: 3,
    label: 'APC joriy etish',
    formTitle: 'APC joriy etish',
    cardTitle: 'Joriy etish',
    price: "TKT bo'yicha (xarajatlarni qoplash)",
    duration: '4–12 hafta',
    artifact: "APC algoritmi + konturdagi maslahatchi. Sanoat ekspluatatsiyasiga tayyorlik.",
    composition: "Modelni «Strix.APC»da joylashtirish, SCADA bilan integratsiya, operatorni ulash.",
  },
  'apc-maas': {
    id: 'apc-maas',
    track: 'apc',
    level: 4,
    label: 'Servis shartnomasi',
    formTitle: "APC servis shartnomasi — shartlarni muhokama qilish",
    cardTitle: 'Servis shartnomasi',
    price: "asos $1 500–3 000/oy + tejamdan 20% · shift asosning 3–4 baravari",
    duration: '36 oy',
    artifact: "Uzoq muddatli sanoat ekspluatatsiyasi. Natija uchun to'laysiz — tejam bo'lmasa, o'zgaruvchan qism ham bo'lmaydi.",
    composition: "Sanoat qo'llab-quvvatlashi, algoritmni muntazam qayta sozlash, samarani kelishilgan metodika bo'yicha o'lchash.",
  },

  // ── Boshqa (nuqtaviy CTA) ──
  'datasheet': {
    id: 'datasheet',
    track: 'other',
    level: 0,
    label: 'Datashit',
    formTitle: "Datashit so'rovi",
    cardTitle: 'Datashit',
    price: 'Bepul',
    duration: '—',
    artifact: "Mahsulotning to'liq texnik xususiyatlari, opsional konfiguratsiyalar, narx.",
  },
  'general': {
    id: 'general',
    track: 'other',
    level: 0,
    label: "Umumiy so'rov",
    formTitle: 'Demoga yozilish',
    cardTitle: "Umumiy so'rov",
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
