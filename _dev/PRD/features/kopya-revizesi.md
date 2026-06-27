# Site Geneli TR Kopya Revizesi

## Özet

v0.1'in çatı işi: sitenin görünür Türkçe metnini marka sesinde (çıktı-odaklı, sade, kendinden emin, metafor yok) tutarlı tutmak.

**prd-refine (2026-06-28) reframe — kritik:** Canlı TR kopya **baştan okundu** (`messages/tr.json` + bileşenler). REVIZE-BACKLOG A2'nin *"genel kopya jenerik/zayıf, ciddi yeniden yazım gerek"* varsayımı **tutmuyor** — kopya büyük ölçüde güçlü, somut ve marka sesinde. Bu yüzden v0.1 kopya işi **baştan-sona yeniden yazım DEĞİL, cerrahi/nokta-atışı düzeltmeler + ana sayfa ses taraması** (kullanıcı onayı: prd-refine 2026-06-28). Kapsam **ana sayfa**; alt sayfalar (Alpfit, Crew OS detay, vaka, forum derin) sonraki versiyonlara.

> Bu feature **kesişen** bir iştir (Crew OS, Nasıl Çalışır, Sektörler feature'larıyla örtüşür). Onlar yapısal/içeriksel değişimi, bu dosya ise **ses/ton tutarlılığını ve site-geneli kopya kalitesini** sahiplenir.

---

## Bölüm-Bölüm Bulgular (öncesi → istenen) — kodla doğrulandı

| # | Bölüm | Bulgu | İstenen | Sahip / öncelik |
|---|-------|-------|---------|------------------|
| **F1** | Nasıl Çalışır | 01 Analiz ↔ 02 Tespit örtüşür; ölçüm 03'e gömülü | 4 adım: **Analiz · Çözüm · Otomasyon · Raporlama** | `nasil-calisir-4-adim.md` · yüksek |
| **F2** | Sektörler — gym | `gyms` paneli özellik listesi (bölüm sözü "özellik listesi değil"); diğer 5 sektör güçlü | gym'i tek-otomasyon desenine getir; Alpfit-ürün ayrı CTA | `sektorler-derinlestirme.md` · yüksek |
| **F3** | Crew OS | Ana metin doğru (A6 çözülmüş); panel 4 akışı sektöre-özgü | Akışlar **bırakıldı** ("platformda çalışan gerçek akışlar") | `crew-os-bolumu.md` · düşük |
| **F4** | Hero stat + gym | Nabız atan "● canlı" (Alpfit) noktası — ILKELER "canlı noktası yok" ile gerilim | **Korunur** — dürüst canlı gösterge; yasak = sahte presence (DECISIONS 2026-06-28) | ILKELER · karar verildi |
| **F5** | Forum + sektör sonuçları | "2 günden 10 dakikaya", "no-show'u yarıya düşürdük" gibi iddialar gerçek-sonuç gibi okunur; veri henüz yok | **Dürüstlük konvansiyonu** (aşağı) — uydurma gibi okunmasın | bu dosya · orta |
| **F6** | Hero ikincil CTA | "Canlı gör" → aslında `#sectors`'a kayıyor; belirsiz | Net etiket ("İşleyen örnekleri gör" / "Çözümleri gör") | bu dosya · düşük |

**Kapsam dışı (v0.1 kopya değil):** A3 (CTA kartları tıklanabilir görünmüyor + scroll göstergesi ölçekleme) → kartlar zaten `<Link>`, sorun **görsel affordance** → görsel cila versiyonu. A1 (logo hizalama) → görsel. Credibility & Forum ana metinleri **güçlü** → v0.1'de sadece F5 dürüstlük taraması, derin rewrite yok.

---

## Dürüstlük Konvansiyonu (F5)

VIZYON §4 "kanıt + çıktı diliyle cevapla" der ama gerçek müşteri verisi henüz yok (REVIZE-BACKLOG C4). `proof.note` ("Gerçek müşteri verisi gelene dek dürüst öngörüler.") doğru tonu kuruyor ama **tutarlı uygulanmıyor** — Forum başlıkları ve sektör sonuçları kesin gerçek-sonuç gibi okunuyor.

**Kural:** Sayısal/sonuç iması taşıyan her metin (sektör sonuçları, forum vaka başlıkları, panel metrikleri) **ya gerçek-veriye dayanır ya da "öngörü/örnek/temsili" çerçevesinde okunur** — ikisinin arası ("kesin gibi ama kurgusal") yasaktır. Marka sesi yasağı "lorem/dolgu yok" ile akraba: somutluk korunur ama dürüstlük bozulmaz. (Detay → VIZYON §4.)

---

## Kullanıcı Senaryoları

- Ziyaretçi hangi bölüme bakarsa baksın **tek, tutarlı bir marka sesi** duyar; jenerik SaaS dili veya dolgu metin hissi almaz.
- Türkçe ziyaretçi (birincil kitle) en yüksek kalitede kopyayı görür; revize TR'de tamamlanır, sonra diğer dillere taşınır.

---

## Davranış Kuralları

- Tüm görünür TR metin marka sesine uyar: **çıktı-odaklı, sade, kendinden emin, metafor yok.**
- **Pazarlık dışı yasaklar** (ILKELER, brief §0/§9): doktor/teşhis/hekim/reçete metaforu yok; zayıf adım adı yok; lorem hissi veren dolgu yok. **"● online/canlı" noktası:** yasak *sahte presence-tiyatrosu* içindir; Alpfit gibi **gerçekten canlı** ürün için dürüst canlı gösterge bu yasağın dışındadır (F4, ILKELER, DECISIONS 2026-06-28).
- **Sabit çapalar korunur:** Hero *"İşinizi analiz ederiz. Sonra otomatikleştiririz."*; CTA *"Ücretsiz keşif görüşmesi al."*
- Her bölümün kopyası **somut bir kazanç/sonuç** ima eder; süsleme ve abartı yok — ama F5 dürüstlük konvansiyonuna tabi.
- Revize **TR'de tamamlanır**; EN/AR/DE/ES o anda güncellenmez (versiyon-sınırı senkronu, VIZYON §5).
- v0.1 kopya kapsamı = **ana sayfa**. Güçlü bölümler (5 sektör, Credibility, Forum, Hero ana metni) korunur; iş F1/F2/F5/F6'da yoğunlaşır.

---

## İlişkili Feature'lar

- `crew-os-bolumu.md`, `nasil-calisir-4-adim.md`, `sektorler-derinlestirme.md` — yapısal değişimleri olan bölümler; bu dosya onların da ses/ton tutarlılığını ve F5 dürüstlük konvansiyonunu kapsar.

---

## Açık Sorular

- _(Bölüm-bölüm "neden zayıf" analizi tamamlandı → F1–F6 tablosu. Premise reframe edildi: cerrahi, ana sayfa odaklı.)_
- Credibility & Forum: v0.1'de **derin rewrite yok** (güçlü), sadece F5 taraması. Sonraki versiyonda forum içerik genişlemesi (REVIZE-BACKLOG C5) ayrı ele alınır.
