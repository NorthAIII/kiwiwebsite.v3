# DECISIONS — Karar Günlüğü

**Amaç:** Önemli mimari ve tasarım kararlarının kaydı. "Neden X yerine Y tercih edildi?" sorusunun cevabı burada.
**Ne zaman güncellenir:** Önemli bir teknik, mimari veya tasarım kararı alındığında.

---

## Kararlar

<!-- Her yeni karar aşağıdaki formatta en üste eklenir (en yeni en üstte) -->

### 2026-06-27 — Güçlü revize, yeni repo yerine v3'te yerinde + branch ile yürütülecek

**Bağlam:** kiwiailab.com'un güçlü revizesine başlanırken, "eski siteye hiç dokunmadan `websitev4` adıyla yeni bir repo açıp orada çalışma" seçeneği değerlendirildi. Canlı siteyi bozmama isteği vardı.

**Seçenekler:**
1. v3'te yerinde, `revize/...` branch'inde çalış — basit, hiçbir şey kaybolmaz, `main` canlı kalır.
2. `websitev4` reposu (v3 kodundan tohumlanmış) — ayrı repo/Vercel projesi, ama bakım/eşitleme yükü.
3. `websitev4` sıfırdan — Living Flow, i18n, tema sistemi yeniden inşa (yüksek maliyet/risk).

**Karar:** Seçenek 1 seçildi (v3'te yerinde, branch ile).

**Gerekçe:** Tespit edilen sorunların tamamı içerik + cila kalemi (mimari arıza değil); v3 sofistike ve sağlam (custom GLSL, 5 dilli i18n, tema sistemi). Sıfırdan yazmak bu değeri çöpe atıp aylarca yeniden inşa demek. `main`'i canlı tutup `revize/...` branch'inde çalışmak "canlıya dokunma" isteğini risksiz karşılıyor.

**İlgili Task/Faz:** map-codebase (DevFlow kurulumu)

---
