# SESSION-NOTES — PRD Çalışma Kanvası

> Bu dosya PRD'nin **anlık çalışma durumu** kanvasıdır — açık sorular, keşfedilmemiş alanlar, hipotezler. Olgunlaşan bilgi PRD dokümanlarına taşınır ve buradan izsiz silinir. Şişmiş bir SESSION-NOTES mezuniyet borcunun işaretidir.

---

## Mevcut Durum Analizi (sonraki oturum için bağlam)

- **v0.2 tamamlandı** (içerik fazları 4–7: a11y / test altyapısı / mobil perf / Umami + versiyon-sonu fazları 8–9: teknik borç / senaryo testi). prd-review (2026-07-02): PRD değişikliği yok — vizyon/taksonomi/feature'lar doğrulandı → PRD sağlam. Tek yön/öncelik çıktısı: ILKELER #2(b) gerçekliğe hizalandı (a11y ≥100 ulaşıldı = yeni taban; perf/LCP brief bütçesi lab'da açık → gerçek-cihaz/Vercel field'a bağlandı, hedef düşmedi).
- **v0.2'nin en önemli keşfi:** brief mobil perf hedefi (≥95/<2.5s) lab'da adanmış perf işi sonrası bile **ulaşılamıyor** — Lighthouse mobil skoru Lantern-simüle, CPU/render-zamanlama kazanımları lab skorunda görünmez → nihai doğrulama gerçek-cihaz gerektirir (a11y ise ≥100 tam kapandı).
- **re-kickoff (2026-07-02) → sıradaki versiyon v0.3 = Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO)** sabitlendi (kullanıcı onayı). Kapsam: A1 logo hizalama · A3 CTA kartı affordance & scroll göstergesi · B1 Living Flow nabız kapsamı (karar-gate'li, imza riski) · SEO `/bunker-os`→`/crew-os` redirect + `/forum`→404. Kesin faz ayrımı/sırası discuss-phase'de.
- Site **canlı ve mimari olarak sağlam**; revize v3'te yerinde + `revize/...` branch'le yürür (`main` canlı kalır).
- **v0.3 içerik fazlarından ÖNCE bekleyen operasyonel aksiyon:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 doğrulaması + genel canlı duman testi orada kapanır (ayrı operasyonel oturum).

---

## Açık Sorular (v0.3 discuss/research'te karara bağlanacak)

> Bu iki kalem artık v0.3 kapsamında (REVIZE-BACKLOG'da v0.3'e bağlandı) — "açık versiyon sorusu" değil, v0.3 discuss/research kararı.

- **Crew OS URL'i (SEO):** Sayfa `/bunker-os` (i18n namespace `bunker`) iç adı URL'de sızdırıyor → public `/crew-os` + kalıcı redirect + i18n namespace `bunker`→`crew` **5-dil eşzamanlı rename** (yapısal anahtar; eksik anahtar yasak) + sitemap/canonical/alternates + iç linkler (M6+M2+M4). Çıplak `/forum`→404 aynı SEO kovada. VIZYON §3 açık konusu v0.3'te kapanır. → **discuss/research kararı.**
- **Living Flow yeşil nabız kapsamı (B1):** Nabızlar sayfanın daha aşağısına taşınsın mı? Göz yorgunluğu/okunabilirlik riski (yoğunluk/opaklık, scrim, reduced-motion, mobil perf). → **karar-gate'li** (imza riski kanıtlanırsa iptal edilebilir); discuss/research'te değerlendirilir.

## Keşfedilmemiş Alanlar

- **Sektörlerin gerçek otomasyon içerikleri:** 5 sektör mevcut kopyada makul/özgün; ama her sektörün **gerçek müşteri otomasyon örneği** kullanıcıdan alınmalı (içerik girdisi — execution-zamanı, F5 dürüstlük konvansiyonuna tabi; REVIZE-BACKLOG C4).
- **Chatbot'un rolü revizede:** Mesaj/CTA stratejisinde chatbot nereye oturuyor? "Book a call" akışına bağlama (C7). → **sonraki versiyon adayı** (chat kopyası zaten güçlü).

---

**Son Güncelleme:** 2026-07-02 — re-kickoff (v0.2→v0.3): mevcut durum v0.3 bağlamına güncellendi (v0.2 tamam + prd-review PRD değişikliği yok → v0.3 = Görsel & Etkileşim Cilası + URL/SEO sabitlendi); açık sorular (Crew OS URL, Living Flow nabız) v0.3 kapsamına alındı (artık versiyon sorusu değil, v0.3 discuss/research kararı). v0.2 mezun bağlamı v0.3 ile değiştirildi.
