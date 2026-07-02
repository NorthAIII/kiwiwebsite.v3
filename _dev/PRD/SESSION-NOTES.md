# SESSION-NOTES — PRD Çalışma Kanvası

> Bu dosya PRD'nin **anlık çalışma durumu** kanvasıdır — açık sorular, keşfedilmemiş alanlar, hipotezler. Olgunlaşan bilgi PRD dokümanlarına taşınır ve buradan izsiz silinir. Şişmiş bir SESSION-NOTES mezuniyet borcunun işaretidir.

---

## Mevcut Durum Analizi (sonraki oturum için bağlam)

- **v0.2 tamamlandı** (içerik fazları 4–7: a11y / test altyapısı / mobil perf / Umami + versiyon-sonu fazları 8–9: teknik borç / senaryo testi). prd-review (2026-07-02): **perf satırı hizalandı, başka PRD değişikliği yok** — vizyon/taksonomi/feature'lar v0.2 boyunca doğrulandı, gerilim doğmadı → PRD sağlam (v0.1 gibi).
- **prd-review çıktısı (PRD değil ama yön/öncelik):** ILKELER #2(b) gerçekliğe hizalandı — a11y ≥100 v0.2'de ulaşıldı (yeni taban); perf/LCP brief bütçesi lab'da açık kaldı, nihai doğrulama gerçek-cihaz/Vercel field'a bağlandı (hedef düşmedi).
- **v0.2'nin en önemli keşfi:** brief mobil perf hedefi (≥95/<2.5s) lab'da adanmış perf işi sonrası bile **ulaşılamıyor** — Lighthouse mobil skoru Lantern-simüle, CPU/render-zamanlama kazanımları lab skorunda görünmez → nihai doğrulama gerçek-cihaz gerektirir (a11y ise ≥100 tam kapandı).
- Site **canlı ve mimari olarak sağlam**; revize v3'te yerinde + `revize/...` branch'le yürür (`main` canlı kalır).
- **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 doğrulaması + genel canlı duman testi orada kapanır.
- **Sıradaki versiyon:** re-kickoff'ta belirlenir; adaylar VERSIONS.md'de (görsel & etkileşim cilası + SEO redirect'ler `/crew-os`·`/forum`, çeviri senkronu, bekleyen veri/entegrasyon).

---

## Açık Sorular (görsel/SEO versiyonu — v0.2 değil)

- **Crew OS URL'i:** Sayfa `/bunker-os` (i18n namespace `bunker`) iç adı URL'de sızdırıyor. Public URL `/crew-os` olmalı mı? SEO + kalıcı redirect maliyeti var (M6). → **görsel/SEO versiyonunda karara bağlanır.** (Çıplak `/forum`→`/bulten`→404 de aynı SEO-bitişik kova.)
- **Living Flow yeşil nabız kapsamı (REVIZE-BACKLOG B1):** Nabızlar sayfanın daha aşağısına taşınsın mı? Göz yorgunluğu/okunabilirlik riski (yoğunluk/opaklık, scrim, reduced-motion). → **görsel versiyon konusu.**

## Keşfedilmemiş Alanlar

- **Sektörlerin gerçek otomasyon içerikleri:** 5 sektör mevcut kopyada makul/özgün; ama her sektörün **gerçek müşteri otomasyon örneği** kullanıcıdan alınmalı (içerik girdisi — execution-zamanı, F5 dürüstlük konvansiyonuna tabi; REVIZE-BACKLOG C4).
- **Chatbot'un rolü revizede:** Mesaj/CTA stratejisinde chatbot nereye oturuyor? "Book a call" akışına bağlama (C7). → **sonraki versiyon adayı** (chat kopyası zaten güçlü).

---

**Son Güncelleme:** 2026-07-02 — prd-review (v0.2): perf satırı hizalama kararı kaydedildi (ILKELER #2(b) gerçekliğe hizalandı; a11y ≥100 ulaşıldı, perf/LCP lab'da açık → gerçek-cihaz'a bağlandı); vizyon/feature değişmez; mezun olan v0.1 bağlamı v0.2 ile değiştirildi.
