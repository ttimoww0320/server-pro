---
name: "Passer-V"
family: "Пассер"
summary: "Vibro-ma'lumotlarni yig'ish uchun 8 kanalli IEPE/ICP kontroller. Kanaliga 92 kGts gacha. Xom signalni Ethernet orqali «Larus»ga uzatadi, u yerda FFT, envelope-tahlil, ML-inferens va SCADA bilan integratsiya bajariladi."
image: "/images/products/passer-v-device.jpg"
order: 10
pulse_role: "Aktivning stetoskopi"
pulse_label: "L0 · Signal"
specs:
  Kanallar: "8 IEPE / ICP, sinxron"
  Diskretlash chastotasi: "kanaliga 92 kGts gacha"
  Razryadlilik: "24 bitli ADC"
  Antialiasing: "analog + raqamli detsimatsiya"
  Datchiklar ta'minoti: "barqaror IEPE toki (4 mA, ±15 V compliance)"
  Chiqish: "Ethernet orqali «Larus»ga xom oqim"
  Sinxronizatsiya: "bir nechta «Passer-V» orasida PTP (IEEE 1588)"
  Montaj: "DIN-rail, IP30 (opsional IP65 shkaf)"
  Ta'minot: "12–24 V DC"
  Ishchi harorat: "−40…+70 °C"
---

## Datchik emas, yig'ish kontrolleri

«Passer-V» — ishlab chiqaruvchi Liman-Tech vibrodiagnostika stekining front-end qismi. U sanoat akselerometrlarini — sozlash toki bilan ishlaydigan standart IEPE/ICP datchiklarini — qabul qiladi va bir vaqtning o'zida sakkiz kanalni kanaliga 92 kGts gacha chastota va 24 bit razryadlilik bilan raqamlashtiradi. Xom signal Ethernet orqali «Larus» shlyuziga uzatiladi, u yerda FFT, envelope-tahlil, RMS / Peak / Crest va ML-inferens bajariladi.

Bunday taqsimlash — yig'ish «Passer»da, diagnostika «Larus»da — ataylab shunday qilingan. Bu bitta qurilmani ortiqcha yuklamasdan kanallar sonini masshtablash va diagnostika algoritmlarini devordagi simlarni o'zgartirmasdan, dasturiy yo'l bilan yangilash imkonini beradi.

## Nega jamoalar «Passer-V»ni tanlaydi

- **8 sinxron kanal.** Nasosning ikkala uchini, reduktorni va motorni bitta qurilmada qamrab olishga yetarli. Uchta «Passer-V» = 24 kanal = tipik o'rtacha kritik agregat to'liq jihozlangan.
- **Diskretlash chastotasi 92 kGts gacha.** Naykvist bo'yicha foydali polosa ~45 kGts gacha — bu podshipnik va tishli g'ildiraklarning envelope-tahlili uchun katta zaxira bilan yetarli, ultratovush rejimlari ham mavjud.
- **Bloklar orasida PTP-sinxronizatsiya.** 24+ fazaviy sinxronlangan kanal kerak bo'lganda — ODS, modal yoki ko'p valli fazaviy tahlil uchun — bir nechta «Passer-V» mikrosoniya aniqligida sinxronlanadi.
- **Datchiklarda hech qanday vendor lock-in yo'q.** Har qanday IEPE/ICP akselerometr: GTLab, TIK, Ronds, Wilcoxon, PCB, IMI, Brüel & Kjær — ishonchlilik xizmatingiz nimani standartlashtirgan bo'lsa.
- **Sanoat form-faktori.** DIN-rail montaji, −40…+70 °C, opsional IP65 shkaf. Agregat yonidagi shkafga o'rnatish uchun mo'ljallangan.

## «Passer-V» nima QILMAYDI

Konfiguratsiyani to'g'ri tanlash uchun aniqlashtiramiz:

- Bortda FFT, envelope yoki RMS-agregatsiya yo'q — bu «Larus»da ishlaydi.
- Bortda xotira yo'q — «Passer-V» oqim qurilmasi. Buferlash va ma'lumotni to'ldirib yuborish — «Larus»ning vazifasi.
- Simsiz kanal yo'q. «Passer-V» — «Larus»gacha simli Ethernet. Simsiz qamrovni kerak bo'lganda alohida ISM/LoRa qurilmalari ta'minlaydi.

## Tipik konfiguratsiyalar

| Ssenariy | Konfiguratsiya |
|---|---|
| Nasos yoki ventilyator | 1× «Passer-V» (8 kanaldan 4 tasi ishlatilgan), 1× «Larus-100» |
| O'rtacha kritik agregat (masalan, reduktorli uzatma) | 1× «Passer-V», 1× «Larus-100» |
| Katta mashina (tegirmon, kompressor) | 3× «Passer-V» (24 kanal), 1× «Larus-100» |
| Ko'p agregatli shkaf | 4–8× «Passer-V», 1× «Larus-1000» |

Ko'pchilik agregatlar uchun bazaviy «qutili» komplekt: 3× «Passer-V» + 1× «Larus-100». Aniq konfiguratsiyani 30 daqiqalik qo'ng'iroqda tanlab beramiz.
