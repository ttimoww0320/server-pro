---
name: "Larus-10"
family: "Ларус"
summary: "Sanoat edge-shlyuzi. «Passer» kontrollerlaridan xom oqimni qabul qiladi, FFT, envelope, RMS / Peak / Crest ni hisoblaydi va ML-klassifikatorlarni ishga tushiradi — so'ngra natijalarni SCADA, MES, CMMS yoki «Strix» platformasiga uzatadi."
image: "/images/products/larus-10-device.jpg"
order: 30
pulse_role: "Edge'dagi kardiogramma"
pulse_label: "L1 · Edge"
specs:
  Hisoblagich: "Rockchip RK3568, 4 yadroli ARM Cortex-A55"
  Xotira: "4 GB LPDDR4 / 32 GB eMMC"
  Bortdagi diagnostika: "FFT, envelope, RMS / Peak / Crest, podshipnik nuqsonlari chastotalari, ML-inferens"
  Manbalar: "«Passer» xom oqimi (Ethernet), OPC UA, Modbus TCP/RTU, MQTT"
  Chiqishlar: "OPC UA, MQTT (Sparkplug B), Kafka, REST"
  Tarmoq: "Ethernet ×2 / Wi-Fi / 4G / LoRaWAN"
  Ta'minot: "12–24 V DC, DIN-rail"
  Himoya darajasi: "IP30 (opsional IP65 shkaf)"
  Ishchi harorat: "−20…+65 °C"
---

## Datchiklar ortidagi miya

«Larus-10» — signallar tashxisga aylanadigan shlyuz. «Passer-V» (vibratsiya) va «Passer-T» (motor toki)dan xom signalni qabul qiladi, FFT, envelope-tahlil, RMS / Peak / Crest, podshipnik nuqsonlari chastotalarini aniqlash va ML-klassifikatorlarni ishga tushiradi — barchasi edge'da — va natijalarni yuqoriga OPC UA teglari, MQTT xabarlari yoki Sparkplug B payload sifatida uzatadi.

Vibratsiyaga aloqasi bo'lmagan ssenariylar uchun (PLK ma'lumotlari, hisoblagichlar agregatsiyasi, oddiy SCADA-ko'prik) «Larus-10» standart sanoat protokol shlyuzi sifatida — Kepware yoki HighByte kabi — ammo litsenziya yukisiz ishlaydi.

## «Larus-10»da nima ishlaydi

- **Vibrodiagnostika:** spektr (FFT), envelope (podshipnik nuqsonlari), vaqt sohasidagi ko'rsatkichlar (RMS, Peak, Crest), ISO 10816 zonalari.
- **Motor signaturasi tahlili** («Passer-T» bilan birga): rotor sterjeni uzilishi, ekssentrisitet, yuklama profili.
- **Anomaliyalarni aniqlash:** tipik nuqson sinflari uchun oldindan o'qitilgan ML-modellar; o'z ONNX-modelingizni qo'yish mumkin.
- **Protokollarni o'zgartirish:** OPC UA / Modbus / MQTT / REST — ham manbaga, ham chiqishga.

## Qachon «Larus-100» emas, «Larus-10» tanlanadi

- Lokal bloklashlarsiz, diagnostikaga yo'naltirilgan joylashtirish: bitta «Larus-10» «Passer» oqimlari + protokol ko'prigini qayta ishlaydi.
- Lokal boshqaruv mantig'i talab qilinmaydigan kichikroq skid-tugunlar va podstansiyalar.
- Vibromonitoring stekiga minimal kapital kirish.

## Tabiiy ravishda quyidagilar bilan juftlikda ishlaydi

- 1–3× «Passer-V» (vibrosignal yig'ish)
- 1× «Passer-T» (motor tokini yig'ish)
- Yuqorida «Strix» platformasi (tahlil, raqamli egizak, bir nechta obyektlar bo'yicha agregatsiya)
