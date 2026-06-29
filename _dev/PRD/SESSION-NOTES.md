# SESSION-NOTES — PRD Çalışma Kanvası

> Bu dosya PRD'nin **anlık çalışma durumu** kanvasıdır — açık sorular, keşfedilmemiş alanlar, hipotezler. Olgunlaşan bilgi PRD dokümanlarına taşınır ve buradan izsiz silinir. Şişmiş bir SESSION-NOTES mezuniyet borcunun işaretidir.

---

## Mevcut Durum Analizi (sonraki oturum için bağlam)

- **v0.1 tamamlandı** (3 faz: içerik + teknik borç + senaryo testi). prd-review (2026-06-29) yapıldı: **PRD'de değişiklik yok** — bilinçli karar. Premise zaten v0.1 başında (prd-refine 2026-06-28) deneyimle düzeltilmişti (kopya zayıf değil → cerrahi); üç faz bu reframe'i doğruladı, bozmadı → PRD sağlam.
- **prd-review çıktıları (PRD değil ama yön/öncelik):** (1) ILKELER #2'ye perf/a11y "korunan taban ≠ brief hedefi" nüansı eklendi; (2) sıradaki versiyon **v0.2 = a11y & Performans + teknik temel** olarak sabitlendi (VERSIONS.md).
- Site **canlı ve mimari olarak sağlam**; revize v3'te yerinde + `revize/...` branch'le yürür (`main` canlı kalır).
- **v0.1'in en önemli keşfi:** brief perf/a11y hedefleri mevcut sitede *zaten* karşılanmıyor (mobil perf 87 / LCP 3.1s; a11y 89 — regresyon değil, keşfedilen mevcut durum). → v0.2'nin gerekçesi.

---

## Açık Sorular (görsel/SEO versiyonu — v0.2 değil)

- **Crew OS URL'i:** Sayfa `/bunker-os` (i18n namespace `bunker`) iç adı URL'de sızdırıyor. Public URL `/crew-os` olmalı mı? SEO + kalıcı redirect maliyeti var (M6). → **görsel/SEO versiyonunda karara bağlanır.** (Çıplak `/forum`→`/bulten`→404 de aynı SEO-bitişik kova.)
- **Living Flow yeşil nabız kapsamı (REVIZE-BACKLOG B1):** Nabızlar sayfanın daha aşağısına taşınsın mı? Göz yorgunluğu/okunabilirlik riski (yoğunluk/opaklık, scrim, reduced-motion). → **görsel versiyon konusu.**

## Keşfedilmemiş Alanlar

- **Sektörlerin gerçek otomasyon içerikleri:** 5 sektör mevcut kopyada makul/özgün; ama her sektörün **gerçek müşteri otomasyon örneği** kullanıcıdan alınmalı (içerik girdisi — execution-zamanı, F5 dürüstlük konvansiyonuna tabi; REVIZE-BACKLOG C4).
- **Chatbot'un rolü revizede:** Mesaj/CTA stratejisinde chatbot nereye oturuyor? "Book a call" akışına bağlama (C7). → **sonraki versiyon adayı** (chat kopyası zaten güçlü).

---

**Son Güncelleme:** 2026-06-29 — prd-review (v0.1): PRD değişiklik yok kararı kaydedildi; ILKELER perf/a11y nüansı + v0.2 önceliği (a11y/perf+teknik) sabitlendi; mezun olan bölümler (v0.1 prd-refine "Çözülenler" + hizalanmış "Doküman Uyumsuzlukları") silindi.
