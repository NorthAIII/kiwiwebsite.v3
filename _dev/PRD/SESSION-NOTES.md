# SESSION-NOTES — PRD Çalışma Kanvası

> Bu dosya PRD'nin **anlık çalışma durumu** kanvasıdır — açık sorular, keşfedilmemiş alanlar, hipotezler. Olgunlaşan bilgi PRD dokümanlarına taşınır ve buradan izsiz silinir. Şişmiş bir SESSION-NOTES mezuniyet borcunun işaretidir.

---

## Mevcut Durum Analizi (sonraki oturum için bağlam)

- **v0.3 tamamlandı** (Faz 10–14: görsel cila [A1 logo + A3 CTA/scroll] + URL taksonomisi/SEO [`/bunker-os`→`/crew-os`] + Living Flow nabız [B1] + versiyon-sonu teknik borç [SEO-metadata hijyeni] + senaryo testi). **prd-review (2026-07-05):** vizyon/taksonomi/feature'lar sağlam — vizyon değişikliği yok; yalnız v0.3'ün kapattığı kararlara **PRD drift hizalaması** yapıldı (VIZYON §3 açık konu kapatıldı, crew-os feature namespace `bunker`→`crew` + `/crew-os` güncellendi, VERSIONS v0.3 "Tamamlanan" oldu).
- **v0.3'ün öne çıkan dersi:** B1 Living Flow nabız karar-gate'li/imza-riskli girildi ama risk gerçekleşmedi — tek WebGL context + adaptif veil ile imza *güçlendi* (iptal değil, uygula-onayla). Craft en üst eksenin (ILKELER) doğrulandığı faz.
- Site **canlı ve mimari olarak sağlam**; revize v3'te yerinde + `revize/...` branch'le yürür (`main` canlı kalır). **v0.2 canlıda** (deploy `a71adbc`, 2026-07-02).
- 🚀 **v0.3 production release tamamlandı (2026-07-05):** `revize/devflow-kurulum`→`main` merge (`2ea09b7`) + Vercel deploy `success`; clean build 37/37 SSG; canlı duman testi ✅ (crew-os/redirect/locale/alt sayfalar). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı DEĞİL** (`/api/chat` 503 → chatbot canlıda "offline"; zarif düşüş, regresyon değil; Vercel env'e eklenince açılır).

---

## Sahipli Açık Kalemler (sonraki versiyon adayları — prd-review B grubu)

> v0.3 boyunca kaydedilen, kapsam-dışı bırakılmış ama kaybedilmemesi gereken kalemler. Bir sonraki versiyon planlanırken (prd-refine) değerlendirilir.

- **Brief mobil perf** — ≥95/<2.5s lab'da açık (Lantern render-timing körlüğü); nihai doğrulama gerçek-cihaz/Vercel field. ILKELER #2b'de zaten hizalı (hedef düşmedi).
- **Chatbot per-mesaj max-byte cap yok** — güvenlik-hardening adayı (min-length + geçmiş-sayısı var; per-mesaj uzunluk sınırı yok).
- **non-TR çeviri tazeliği** — ar/de/es 4 alt sayfa İngilizce-stale; bilinçli (TR tek kaynak, çeviri versiyon-sınırı — VIZYON §5). Çeviri senkronu ayrı versiyon adayı.
- **AR-dil stratejisi** — Arapça içerik yaklaşımı açık kalem.
- **TB-3** (full-motion invariant tohumu) / **TB-4** (logical-ok RTL denetimi) / **TB-5** (npm audit) — Faz 13'te kayıtlı sahipli teknik açıklar.

## Keşfedilmemiş Alanlar

- **Sektörlerin gerçek otomasyon içerikleri:** 5 sektör mevcut kopyada makul/özgün; ama her sektörün **gerçek müşteri otomasyon örneği** kullanıcıdan alınmalı (içerik girdisi — execution-zamanı, F5 dürüstlük konvansiyonuna tabi; REVIZE-BACKLOG C4).
- **Chatbot'un rolü revizede:** Mesaj/CTA stratejisinde chatbot nereye oturuyor? "Book a call" akışına bağlama (C7). → **sonraki versiyon adayı** (chat kopyası zaten güçlü).

---

**Son Güncelleme:** 2026-07-05 — prd-review (v0.3): mevcut durum v0.3-tamam + prd-review bağlamına güncellendi; çözülmüş açık sorular (Crew OS URL, Living Flow nabız — ikisi de v0.3'te kapandı) mezun edildi/silindi; sahipli açık kalemler (B grubu) sonraki-versiyon adayı olarak toplandı. Vizyon değişikliği yok, yalnız PRD drift hizalaması.
