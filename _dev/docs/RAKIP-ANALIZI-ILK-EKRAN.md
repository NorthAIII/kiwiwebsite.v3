# Rakip Analizi — İlk Ekran (Hero) Taraması

**Tarih:** 2026-10-03
**Amaç:** Ana sayfa mesajının yeniden yazımına girdi. Soru: rakipler ilk ekranda "kim, kime, ne"yi 8 saniyede anlatabiliyor mu, "AI" kelimesine ne kadar yaslanıyor, Kiwi için boşluk nerede? Bağlam ve kararlar → `PRD/NOTES.md` (2026-10-03 "Ana sayfa mesajı — yön kararları").

**Yöntem ve sınırlar:** 5 TR + 5 global ajans, karşılaştırma için 2 dikey SaaS. Yalnız hero incelendi. Sayfalar WebFetch ile çekildi. Bu araç sayfayı bir ara modelden geçiriyor, bu yüzden alıntıların karakter düzeyinde doğruluğu canlı sitede gözle teyit edilmeli. Smart Bodrum'un metrik rozetleri çevrilmiş geldiği için alıntılanmadı. moonriseelevation.com okunamadı ve listeden çıkarıldı.

---

## Türk Rakipler

| Site | Ana başlık | Kim / Kime / Ne | Hero'da AI? | Not |
|---|---|---|---|---|
| [smartbodrum.tech](https://smartbodrum.tech/) | "İşletmenizi Yapay Zeka ile Otomatikleştirin" | net / net / belirsiz | Evet ×3 | Kaynaksız metrik rozetleri; ne otomatikleştiği belirsiz |
| [webotomasyon.com](https://webotomasyon.com/) | "İşletmeniz Asla Durmasın 7/24 Çalışsın" | net / **net** / **net** | Evet | TR'nin en iyisi: "Dişçiden otele, avukattan e-ticarete… WhatsApp botu, rezervasyon"; klinik vakası hero'da |
| [sedeus.com](https://sedeus.com/) | "Sipariş, destek ve müşteri takibini personel eklemeden büyütün" | net / net / **net** | Yalnız alt metinde | Somut olay dili ("kargom nerede?" 7/24 yanıtlanır), ama alt metin 8 saniyeye sığmayacak kadar uzun |
| [miletosstudio.com](https://miletosstudio.com/) | "Yerel işletmeler için" | belirsiz / net / belirsiz | Evet (eyebrow) | Başlık ne yapıldığını söylemiyor |
| [ajansyz.com](https://www.ajansyz.com/) | "Yapay Zeka Destekli Akıllı Asistanlar Hizmetiniz için Hazır!" | belirsiz / net / yok | Evet ×3 | Jargon ("Agent AI") |
| [yanitly.com](https://yanitly.com/) (SaaS) | "Yanıtly Yapay Zeka Müşteri Destek ve Türkçe Sesli AI Çağrı Asistanı Platformu" | net / belirsiz / belirsiz | Evet, yoğun | Başlık SEO anahtar kelime dizisine dönüşmüş |

## Global Rakipler

| Site | Ana başlık | Kim / Kime / Ne | Hero'da AI? | Not |
|---|---|---|---|---|
| [companyautomation.co.uk](https://companyautomation.co.uk/) | "Business automation for UK companies, built to pay for itself." | net / net / **net** | **Hayır** | "We map your processes, automate the work that drags, and connect the systems that don't talk to each other." Hero'da örnek denetim kartı (41 saat/hafta) |
| [dmsautomation.org](https://dmsautomation.org/) | "Stop Losing Customers to Missed Calls While You're Out on the Job" | net / **net** / **net** | **Hayır** | Tek dert, tek sahne; listenin en hızlı anlaşılanı |
| [xray.tech](https://www.xray.tech/) | "We design intelligent ways of working with AI and automation for purpose-led teams." | net / belirsiz / yok | Evet | Havada kalan dil |
| [flowmondo.com](https://www.flowmondo.com/) | 30 kelimelik H1 ("…AI and automation solutions…") | net / net / yok | Evet ×3 | Aşırı uzun başlık |
| [podium.com](https://www.podium.com/) (SaaS) | "The #1 converting AI Employee for local businesses" | net / net / net | Evet | Ürünün kendisi AI; tamamen AI'ya yaslanıyor |
| [getjobber.com](https://www.getjobber.com/) (SaaS) | "Run a stronger service business" | net / net / net | **Hayır** | "From first quote to final payment…" iş akışını uçtan uca tek satırda anlatıyor |

**Sayım:** 12 sitenin 9'unda AI kelimesi hero'da geçiyor; Türk ajansların 5'inde de geçiyor. AI demeyen üç site (Business Automation UK, DMS, Jobber) aynı zamanda en net konuşanlar arasında.

---

## Sentez

### Kaçınılacak klişeler
- "X'i yapay zeka ile otomatikleştirin." Türk sitelerinin hemen hepsinde aynı cümle var.
- "7/24 çalışan…" artık ayırt edici değil.
- Jargon: "akıllı asistan", "Agent AI", "yeni nesil deneyim".
- Kaynaksız metrik rozetleri ("3×", "%80"). Dürüstlük konvansiyonumuzla da çelişir.
- Kimliksiz CTA ikilisi: "Ücretsiz Demo Al" / "Nasıl Çalışır?".
- Aşırı uzun başlık ya da alt metin.

### İşe yarayan teknikler
1. **Tek acı, tek sahne** (DMS: "…While You're Out on the Job"). Ziyaretçi o anı kendi hayatından tanıyor.
2. **Somut olay dili** (Sedeus: "kargom nerede?" sorusu yanıtlanır). Teknoloji değil, sonuç anlatılıyor.
3. **Sektör aralığı** (webotomasyon: "Dişçiden otele, avukattan e-ticarete"). Birkaç kelimede "kime" sorusunu cevaplıyor.
4. **Uçtan uca akış cümlesi** (Jobber: "From first quote to final payment").
5. **Hero'da kanıt kartı.** İlk ekranda gerçek vaka ya da örnek akış.

### Kiwi için boşluklar
1. **AI demeden konumlanmak Türkiye'de tek başına bir fark.** Taranan Türk ajansların hepsi AI ile açıyor.
2. **Yaşanan an.** Yerel sahneyle konuşan Türk rakip yok (koltukta müşteri varken çalan WhatsApp, gece 11'de gelen randevu sorusu).
3. **"Biz kurarız" vaadini başlığa taşımak.** Rakiplerde bu vaat en fazla küçük bir rozet olarak duruyor.
4. **Kendi ürünlerimiz kanıt olarak.** Rakiplerin kendi ürünü yok. Crew OS ve Alpfit uydurma metrik yerine gerçek kanıt olur (Alpfit ayrı ürün olarak konumlanır; taksonomi → `PRD/VIZYON.md` §3).
5. **Dürüst kanıt.** Kaynaksız rozet yerine tek bir gerçek vaka ya da örnek akış.
