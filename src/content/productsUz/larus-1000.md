---
name: "Larus-1000"
family: "Ларус"
summary: "Kalit topshirish tayyor edge-pristavka: oldindan o'rnatilgan «Strix» platformasiga ega «Larus» apparati. Bitta quti bilan yetkazib beriladi, unda kompyuter ko'rish, vibrodiagnostika, raqamli egizak va edge-tahlil allaqachon ishlaydi."
order: 40
pulse_role: "Qutidagi to'liq stek"
pulse_label: "L1 + L2 · Edge + Platforma"
specs:
  Hisoblagich: "Rockchip RK3568 + NPU (6 TOPS)"
  Xotira: "8 GB LPDDR4 / 128 GB NVMe"
  Dasturiy stek: "«Strix» oldindan o'rnatilgan (shlyuz + tahlil + ilovalar)"
  Edge-runtime: "Eclipse 4diac + «Strix» ilovalari ishga tushirish muhiti"
  Kameralar: "USB 3.0 × 2, GigE Vision (opsional PoE)"
  Tarmoq: "Ethernet ×2 / Wi-Fi / 4G / LoRaWAN"
  Ta'minot: "12–24 V DC, DIN-rail"
  Himoya darajasi: "IP30 (opsional IP65 shkaf)"
---

## Bitta qutidagi tayyor edge

«Larus-1000» — liniyaning flagmani: oldindan o'rnatilgan «Strix» platformasiga ega sanoat apparati — shlyuz, tahlil, raqamli egizak, CV-inferens muhiti va ilovalar. Bitta qutini yetkazib qo'ydingiz, datchik va kameralarni uladingiz — va obyektingizda alohida serversiz, bulut majburiyatlarisiz va integratsiya loyihasisiz edge-tugun ishlaydi.

## «Qutidan chiqib» nima ishlaydi

- **Flotatsiya uchun kompyuter ko'rish.** Kamera + «Strix» CV-ilovasi — ko'pik qoplami, pufakchalar o'lchamlari taqsimoti, mineralogik indikatorlar — to'liq edge'da, natijalar ASU TP yoki dispetcherlik punktiga.
- **Vibrodiagnostika.** «Passer» + «Strix» vibro-ilovasi — podshipnik nuqsonlarini aniqlash, ISO 10816 zonalari, tartiblangan nariyadlar.
- **AAS shaklidagi raqamli egizak.** IEC 63278 / IDTA bo'yicha uskuna tavsifi, MES, CMMS va raqamli egizak platformalaridan so'rov uchun tayyor.
- **O'z ilovalaringiz.** O'z Python yoki konteyneringizni olib keling — «Strix» runtime'i ma'lumot oqimlari, modellar va chiqishlarga izolyatsiyalangan kirish beradi.

## Qachon software-only «Strix» o'rniga «Larus-1000» tanlanadi

- IT-jamoasi va bo'sh serveri bo'lmagan obyektlar — qutini sotib oldingiz, uladingiz.
- Bulut imkonsiz bo'lgan va hardened on-prem kerak bo'lgan izolyatsiyalangan kontur yoki sanksion cheklovlar.
- Dasturiy stekni joylashtirilgandan ko'ra bitta pristavkani o'rnatish osonroq bo'lgan dala obyektlari.
- Lokal NPU talab qiladigan CV va ML yuklamasi.

## Qolgan liniya bilan qanday bog'lanadi

| | «Larus-10» | «Larus-100» | **«Larus-1000»** |
|---|---|---|---|
| Ma'lumot shlyuzi | ✓ | ✓ | ✓ |
| Edge IEC 61499 (4diac) | — | ✓ | ✓ |
| «Strix» oldindan o'rnatilgan | — | — | **✓** |
| Kompyuter ko'rish | — | — | **✓** |
| ML-inferens uchun NPU | — | — | **✓** |
| Saqlagich | 32 GB | 32 GB | **128 GB NVMe** |

Dasturiy ta'minot self-hosted «Strix» o'rnatmasi bilan bir xil — konfiguratsiyalar, dashbordlar va ilovalar «Larus-1000» bilan buyurtmachi serveri orasida erkin ko'chiriladi.
