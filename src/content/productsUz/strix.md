---
name: "Strix"
family: "Стрикс"
summary: "Ishlab chiqaruvchining dasturiy platformasi: data fabric, raqamli egizak, tahlil hamda prediktiv xizmat ko'rsatish, kompyuter ko'rish va edge-avtomatlashtirish uchun ilovalar. Bulut, sizning serveringiz yoki «Larus» pristavkasi. Diagnostika, dashbordlar va texnik xizmat va ta'mirlash — platforma tarkibida."
order: 50
specs:
  Joylashtirish: "Liman-Tech buluti, sizning serveringiz yoki «Larus-1000»ga oldindan o'rnatilgan"
  Aktivlar modeli: "IEC 63278 / IDTA Asset Administration Shell"
  Ilovalar: "Vibrodiagnostika, flotatsiya (CV), energiya monitoringi, edge-avtomatlashtirish"
  Integratsiyalar: "OPC UA, Modbus, MQTT (Sparkplug B), Kafka, REST, SAP, MES/CMMS, 1C"
  Inferens: "ONNX Runtime + «Larus-1000» NPU'sida tezlashtirish"
  Litsenziyalash: "Obyektga obuna yoki muddatsiz litsenziya + texnik qo'llab-quvvatlash"
---

![«Strix» dashbordi — uskuna holati ko'rinishi](/images/strix/strix-dashboard.png)

## Hamma narsani bog'laydigan platforma

«Strix» — ishlab chiqaruvchi Liman-Tech ning dasturiy yadrosi. Datchiklar, shlyuzlar, PLK va kameralardan ma'lumot yig'adi; ishlab chiqarishni ochiq AAS standartida raqamli egizak sifatida tavsiflaydi; signalni ustuvorlashtirilgan ishlarga aylantiradigan ilovalarni ishga tushiradi; va bu ishlarni jamoa ishlaydigan joyga — CMMS, SCADA, planshetga yoki boshqaruv konturiga qaytarib yetkazadi.

«Strix»dan foydalanish uchun apparat sotib olish shart emas. Apparat sotib olish uchun esa uning analitikasidan foydalanish shart emas. «Strix» har bir interfeysda ochiq.

## Uchta joylashtirish varianti — bitta «Strix»

| | **Strix Bulut** | **Strix On-Premise** | **«Larus-1000»dagi Strix** |
|---|---|---|---|
| Qayerda ishlaydi | Liman-Tech tomonidan boshqariladi | Sizning Linux/Windows serveringiz, Kubernetes | Apparat pristavkaga oldindan o'rnatilgan |
| Kimga mos | Taqsimlangan jamoalar, tez start | On-prem talablari, izolyatsiyalangan kontur | Bitta obyekt, IT-jamoasi yo'q |
| Ekspluatatsiya | Liman-Tech tomonidan boshqariladi | Sizning jamoangiz | Liman-Tech tomonidan boshqariladi, sizda joylashtirilgan |
| Ma'lumotlarni lokalizatsiya qilish | RF / MDH / YeII mintaqalari | Qayerda joylashtirsangiz | Obyektda lokal |

## «Qutidan chiqib» ishlaydigan ilovalar

- **Vibrodiagnostika** — «Passer» bilan juftlikda. ISO 10816 zonalari, podshipnik nuqsonlarini aniqlash, tishli ilashish garmonikalari, tartiblangan nariyadlar.
- **Flotatsiya (CV)** — sanoat kamerasi bilan juftlikda. Ko'pik qoplami, pufakchalar o'lchamlari taqsimoti, mineralogik indikatorlar. «Larus-1000»da edge-inferens.
- **Energiya va ESG** — hisoblagichlar ko'rsatkichlari agregatsiyasi, kWh-attribution, tayyor Scope-2 hisoboti.
- **Edge-avtomatlashtirish** — alohida PLK siz skid darajasini boshqarish uchun 4diac (IEC 61499) ustidagi vizual muharrir.
- **Aktivlarning raqamli egizagi** — AAS (IEC 63278) shaklidagi uskuna iyerarxiyasi va xususiyatlari, MES, ERP va boshqa raqamli platformalardan foydalanish mumkin.

![Strix.SCADA — mnemosxema va trevogalar](/images/strix/strix-scada.png)

![Strix.Diagnost — tugun bo'yicha spektr va trendlar](/images/strix/strix-diagnostics.png)

![Strix.APC — boshqaruv konturi va soft sensors](/images/strix/strix-apc.png)

## Dizayn bo'yicha ochiqlik

- **Standartlar, proprietar formatlar emas.** OPC UA, MQTT Sparkplug B, AAS, OPC HDA, Kafka — hech qanday «faqat bitta vendor orqali» formatlar yo'q.
- **Ma'lumotlaringizni bor holicha olib keling.** «Strix» mavjud istorianlar, SCADA, MES va CRM bilan integratsiyalashadi. Nimani xohlasangiz almashtiring, nima kerak bo'lsa qoldiring.
- **Modellaringiz ham.** ONNX-modelni «Strix»ga qo'ying — u edge'da yoki bulutda, platformaning o'z modellari bilan yonma-yon ishga tushadi.

## Odatda nimadan boshlanadi

Ko'pchilik jamoalar **«Strix.Shlyuz»** — ma'lumot yig'ish va normallashtirish dasturiy shlyuzi — orqali kiradi, bu ma'lumot oqayotganiga ishonch hosil qilish uchun. Shundan so'ng, dashbordlar, trevogalar yoki ilovalar kerak bo'lganda to'liq «Strix»ga o'tadilar. Keyin apparat («Passer», «Larus») qamrov kengaygani sari qo'shiladi.

> **Boshlash:** [demoga yozilish](/uz/?intent=demo-monitoring#contact) — 30 daqiqa, platformani namunaviy ma'lumotlarda ko'rsatamiz. Yoki darhol [«Strix.Shlyuz»ni ulash](/uz/products/strix-connect/) va bugunoq ma'lumot yig'ishni boshlash.
