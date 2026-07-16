---
name: "Passer-T"
family: "Пассер"
summary: "Motor signaturasi tahlili (MCSA) uchun tok va kuchlanishni yig'adigan ko'p kanalli kontroller. Stator toki va kuchlanishni yuqori aniqlikda oladi, xom signalni «Larus»ga uzatadi — u yerda rotor sterjeni uzilishi, ekssentrisitet, podshipnik nuqsonlari va yuklama anomaliyalari diagnostikasi ishlaydi."
image: "/images/products/passer-t-device.jpg"
order: 20
specs:
  Kanallar: "3 faza tok + 3 faza kuchlanish, sinxron"
  Tok kirishi: "qisqichli yoki ajraladigan tok transformatori orqali (1 A / 5 A ikkilamchi)"
  Kuchlanish kirishi: "600 V AC gacha (opsional kuchlanish transformatori orqali)"
  Diskretlash chastotasi: "kanaliga 50 kGts gacha"
  Razryadlilik: "24 bitli ADC, true-RMS yo'li + xom shakl"
  Chiqish: "Ethernet orqali «Larus»ga xom oqim"
  Sinxronizatsiya: "PTP (IEEE 1588), birgalikdagi vibro+tok diagnostikasi uchun «Passer-V» bilan sinxronlanadi"
  Montaj: "DIN-rail, IP30"
  Ta'minot: "12–24 V DC"
  MCSA algoritmi: "Elektr mashinalarning avtomatlashtirilgan tok diagnostikasi (rotor sterjeni uzilishi, ekssentrisitet, podshipnik nuqsonlari, yuklama anomaliyalari)"
---

## Motorni kabel orqali eshitamiz

«Passer-T» motor va generatorlarning elektr signaturasini — uch fazali stator toki va kuchlanishni — «Passer-V» vibratsiyani qanday sifat bilan olsa, o'sha sifat bilan oladi. Xom oqim «Larus» shlyuziga boradi, u yerda motor signaturasi tahlili (MCSA), moment va yuklama profilini baholash bajariladi.

Nega tok? Chunki motorning o'zi — datchik. Rotor sterjenlarining uzilishi, havo zazorining ekssentrisiteti, podshipnik nuqsonlari, mexanik disbalans va yuklama anomaliyalari stator toki spektrida iz qoldiradi. Ularni tokda ushlash ko'pincha har bir valni vibrodatchiklar bilan jihozlashdan ko'ra osonroq (va arzonroq) — ayniqsa mexanik kirish cheklangan agregatlarda.

## Nega jamoalar «Passer-T»ni tanlaydi

- **Noinvaziv.** Qisqichli tok transformatorlari (TT) va KIP shchitidagi kuchlanish o'lchovi. Motorda mexanik ishlarsiz.
- **Jihozlash qiyin agregatlar.** Botiriladigan nasoslar, issiq ventilyatorlar, uzoq tugunlardagi nasoslar — mexanik datchiklarni qo'llab bo'lmaydigan joylarda.
- **«Passer-V» bilan birgalikda — fusion-diagnostika.** PTP bo'yicha sinxronizatsiya vibro- va tok manzarasini birlashtirish imkonini beradi; bu tashxis ishonchliligini jiddiy oshiradi va noto'g'ri signallarni kamaytiradi.
- **O'sha ma'lumot kanali.** «Larus»ga xom oqim. Algoritmlar shkafda emas, dasturiy yo'l bilan rivojlanadi.

## «Passer-T» nima QILMAYDI

- Bortda MCSA / spektral tahlil yo'q — bu «Larus»da.
- Elektr energiyasi sifati bo'yicha hisobot yo'q (THD, kuchlanish cho'kishi/oshib ketishi) — bu boshqa sinf qurilmalar. «Passer-T» utility-grade PQ ga emas, motor diagnostikasiga qaratilgan.

## Tipik konfiguratsiyalar

| Ssenariy | Konfiguratsiya |
|---|---|
| Bitta kritik motor (masalan, tegirmonning asosiy privodi) | 1× «Passer-T», 1× «Larus-100» |
| 4 motorli nasos stansiyasi | 2× «Passer-T» (umumiy kuchlanish o'lchovi), 1× «Larus-100» |
| Bir vaqtda vibro- va tok diagnostikasi bilan agregat | 1× «Passer-V» + 1× «Passer-T» + 1× «Larus-100» |
