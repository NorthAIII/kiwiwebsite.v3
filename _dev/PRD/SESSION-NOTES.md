# SESSION-NOTES — PRD Çalışma Kanvası

> Bu dosya PRD'nin **anlık çalışma durumu** kanvasıdır — açık sorular, keşfedilmemiş alanlar, hipotezler. Olgunlaşan bilgi PRD dokümanlarına taşınır ve buradan izsiz silinir. Şişmiş bir SESSION-NOTES mezuniyet borcunun işaretidir.

---

## Mevcut Durum Analizi (sonraki oturum için bağlam)

- **v0.4 tamamlandı** (Faz 15–17: Alpfit Plus ürün vitrini + versiyon-sonu teknik borç/TR release + senaryo testi). **prd-review (2026-07-21):** vizyon/taksonomi/feature'lar sağlam — **vizyon değişikliği yok**; tek girdi versiyon boyunca biriken **chatbot sağlayıcı kararı** (Anthropic Opus → Groq/`llama-3.3-70b`) → sonraki versiyonlara mezun edildi (v0.5 chatbot geçişi öncelikli, v0.6 booking; `DECISIONS` + `VERSIONS`).
- **v0.4'ün öne çıkan dersi:** Craft en üst eksen bir kez daha doğrulandı — Alpfit Plus artifact vizyonuna sadık, saf CSS/SVG mockup'larla (ekran görüntüsü değil) port edildi (şablon kokusu yok). Dürüstlük konvansiyonu hem içerikte (4/4 gerçek) hem chatbot model elemesinde (fiyat uyduran model düştü) operasyonel değer üretti.
- Site **canlı ve mimari olarak sağlam**; revize v3'te yerinde + `revize/...` branch'le yürür (`main` canlı kalır). **v0.4 TR canlıda** (`f173234`, 2026-07-16).
- ⚠️ **Canlı chatbot `/api/chat` 503 (offline)** — v0.5 Groq geçişiyle çözülecek; ayrıca `ANTHROPIC_API_KEY` ekleme kalemi bu kararla **geçersizleşti** (yerine `GROQ_API_KEY`).

---

## Sahipli Açık Kalemler (sonraki versiyon adayları)

> prd-review'da değerlendirilen, kapsam-dışı bırakılmış ama kaybedilmemesi gereken kalemler. Bir sonraki versiyon planlanırken (re-kickoff / prd-refine) değerlendirilir. Detaylı versiyon eşlemesi → `VERSIONS.md` "Sonraki Aday Versiyonlar".

- **v0.5 — chatbot Groq geçişi + canlıya alma** (kararlı, öncelikli; DECISIONS 2026-07-21). Chatbot per-mesaj max-byte cap (hardening) bu fazın adayı.
- **v0.6 — booking + takvim** (v0.5'ten ertelendi; ayrı/büyük iş — tool/function calling + takvim + PII/spam güvenliği).
- **non-TR çeviri tazeliği** — ar/de/es alt sayfalar + alpfit stale-TR; **ziyaretçi-görünür**; bilinçli (TR tek kaynak, versiyon-sınırı — VIZYON §5). **AR-dil stratejisi** açık kalem.
- **BULGU-S3 craft** — alt-sayfa masaüstü imza alanı boşluğu (Craft üst eksen → craft cila adayı).
- **Brief mobil perf** — ≥95/<2.5s lab'da açık (Lantern render-timing körlüğü); nihai doğrulama gerçek-cihaz/Vercel field. ILKELER #2b'de hizalı (hedef düşmedi).
- **TB-3** (full-motion invariant tohumu) / **npm audit** (2 moderate, Next'e gömülü postcss, sömürülemez) — sahipli teknik açıklar.

## Keşfedilmemiş Alanlar

- **Sektörlerin gerçek otomasyon içerikleri:** 5 sektör mevcut kopyada makul/özgün; ama her sektörün **gerçek müşteri otomasyon örneği** kullanıcıdan alınmalı (içerik girdisi — execution-zamanı, F5 dürüstlük konvansiyonuna tabi; REVIZE-BACKLOG C4).
- **Chatbot'un rolü:** sağlayıcı + canlıya alma **v0.5'te** kararlaştı; "book a call"/randevu akışı **v0.6 booking**'e bağlandı. (chat kopyası zaten güçlü.)

---

**Son Güncelleme:** 2026-07-21 — prd-review (v0.4): mevcut durum v0.4-tamam + prd-review bağlamına güncellendi; **vizyon değişikliği yok**. Tek not (chatbot Groq/llama sağlayıcı kararı) `DECISIONS` + `VERSIONS`'a mezun edildi (v0.5 chatbot öncelikli, v0.6 booking); NOTES.md temizlendi. Sahipli açık kalemler + keşfedilmemiş alanlar v0.4 gerçekliğine hizalandı (chatbot rolü kararlaştı, `ANTHROPIC_API_KEY` kalemi geçersizleşti).
