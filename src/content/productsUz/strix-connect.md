---
name: "Strix.Shlyuz"
family: "Стрикс"
summary: "Strix.Shlyuz (Strix Gateway) — OT↔IT ma'lumotlarini yig'ish va normallashtirish dasturiy shlyuzi: kirishga OPC UA, Modbus, MQTT; chiqishga MQTT (Sparkplug B), Kafka, REST yoki «Strix» platformasi. Har qanday Linux serveri, VM yoki ARM'da joylashtiriladi."
order: 5
specs:
  Form-faktor: "Bitta binar yoki Docker-konteyner"
  Platformalar: "Linux x86_64, ARM64, Windows Server"
  Ma'lumot manbalari: "OPC UA, Modbus TCP/RTU, MQTT"
  Chiqishlar: "MQTT (Sparkplug B), Kafka, HTTP webhook, OPC UA-server, «Strix»"
  Edge-bufer: "Lokal SQLite, aloqa tiklangach avtomatik qayta yuborish"
  Resurslar: "≤ 80 MB RAM, bitta CPU yadrosi"
  Litsenziyalash: "Shlyuzga obuna yoki muddatsiz + texnik qo'llab-quvvatlash"
---

## Ma'lumot yig'ish va normallashtirish shlyuzi

«Strix.Shlyuz» (Strix Gateway) — sanoat konturi (OT) va IT-infratuzilma orasidagi dasturiy qatlam. U PLK, DKS, istorianlar va hisoblagichlardan OPC UA, Modbus TCP/RTU va MQTT orqali ma'lumot oladi, ularni normallashtiradi va kerakli joyga yuboradi — MQTT (Sparkplug B), Kafka, REST yoki «Strix» platformasiga. Sizda allaqachon o'rnatilgan apparatda bitta binar yoki Docker-konteyner bilan ishga tushadi — alohida uskuna yetkazib berishsiz.

Muhandis shlyuzni bo'sh Linux serverida, virtual mashinada, sanoat kompyuterida yoki Kubernetes'da joylashtiradi. `docker run` dan OPC UA'dan birinchi tegcha — 30 daqiqadan kam.

## U loyihada nima uchun kerak

- **ASU TP ning yagona tili.** OPC UA, Modbus va MQTT kirishga, MQTT / Sparkplug B, Kafka, REST chiqishga — har qanday zamonaviy sanoat stekiga mos tushadi.
- **Vendor lock-in siz.** Ma'lumot sizning brokeringizga, istorianingizga, bulutingizga boradi — yoki tahlil ham kerak bo'lsa, «Strix» platformasiga.
- **Birinchi kundan sanoat sifati.** Edge-bufer, himoyalangan uzatish, tuzilgan loglash, Prometheus metrikalar.
- **Keyingi yo'l tushunarli.** Ko'proq manbalar, zaxiralash yoki edge-inferens kerak bo'lganda — o'sha konfiguratsiya «Larus» apparat pristavkasiga ko'chiriladi.

## Yarim kunda nimani yig'ish mumkin

- **Nasos va motorlar monitoringi:** mavjud PLK lardan vibratsiya va tokni MQTT ga olish, Grafana'da trendlarni chizish.
- **Energiya hisobi:** hisobot va ESG uchun hisoblagichlardan Modbus ni Kafka ga o'tkazish.
- **Ko'prik historian ↔ bulut:** legacy DCS ni zamonaviy bulut yoki xususiy MQTT-broker bilan bog'lash.

## Tariflar

Litsenziyalash — shlyuzdagi teglar va manbalar soni bo'yicha: obuna yoki texnik qo'llab-quvvatlashli muddatsiz litsenziya. Aniq konfiguratsiya va narx sizning konturingizga moslab tanlanadi.

| | **Pro** | **Business** | **Enterprise** |
|---|---|---|---|
| Shlyuzdagi teglar | 5 000 | 50 000 | limitsiz |
| Manbalar | OPC UA, Modbus, MQTT | + maxsus | + maxsus |
| Chiqishlar | MQTT, Sparkplug B, Kafka | + OPC UA-server, OSIsoft PI | + maxsus |
| So'rov davri | ≥ 1 soniya | ≥ 100 ms | ≥ 10 ms |
| Edge-bufer | 7 kun | 30 kun | talab bo'yicha |
| Qo'llab-quvvatlash | ish soatlari | ish soatlari, shaxsiy CSM | 24×7, SLA |
| Narx | $249 / shlyuz / oy | $899 / shlyuz / oy | so'rov bo'yicha |

> **Boshlash:** [demoga yozilish](/uz/?intent=demo-monitoring#contact) — «Strix.Shlyuz» sizning konturingizdan ma'lumotni qanday yig'ishini ko'rsatamiz va konfiguratsiyani stekingizga moslab tanlaymiz.
