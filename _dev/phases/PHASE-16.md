# Phase 16: v0.4 versiyon-sonu teknik borç kapatma (+ TR production release)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluştu; durum 🔄 ile başlar. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-16-<slug>.md`'ye bölünür. Tamamlandıktan (✅) sonra bölme yasaktır. -->

---

## Genel Bilgiler

**Amaç:** v0.4 (Alpfit Plus) içerik fazı (Faz 15) tamamlandıktan sonraki versiyon-sonu teknik borç kalemlerini kapatmak. Bu faz oturumunda ayrıca **kullanıcı önceliğiyle v0.4 TR production release** yapıldı (App Store lansman aciliyeti) — release operasyonel aksiyon olarak `docs/RELEASE-v0.4.md`'de kayıtlı.

**Milestone:** v0.4 versiyon-sonu teknik borç kalemleri kapalı (gym PNG disk hijyeni + npm audit / bağımlılık denetimi); TR sürüm canlıda (✅ yapıldı — `f173234`); guardrail'ler (a11y=100 çift-tema · perf tabanı · CLS≈0 · i18n 5-dil parite) regresyonsuz. non-TR çeviri bu fazın **dışı** (sonraki faz / prd-review).

### Feature Listesi

(MODULE-MAP referansı — v0.4 versiyon-sonu teknik borç iş birimleri)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| REL: v0.4 TR production release | M6 | `revize/alpfit-plus` → `main` (canlı); TR tam, non-TR stale-TR (ertelendi); canlı duman testi. **✅ yapıldı** (bu oturum) — `docs/RELEASE-v0.4.md`. |
| TB-D1: gym PNG disk hijyeni | M2 (asset) | `public/gym/*.png` (4 orphan dosya, ~1.7MB, 0 tüketici) sil. Faz 15'te bilinçle Kapsam Dışı bırakıldı → bu faza devredildi. |
| TB-D2: npm audit / bağımlılık denetimi | M6 | `npm audit` raporu + (varsa) onaylı güncelleme. `package-lock.json` dokunulmaz kalır (onay-gerektiren); v0.1'den beri ertelenen hafif güvenlik/güncellik hijyeni. |

---

## Kapsam Tartışması

> `/devflow:discuss-phase 16` oturumunda dolduruldu (2026-07-16).

### Versiyon Sonu Tespiti (Adım 0)

- Aktif Versiyon v0.4 · Versiyon Sonu Durumu `içerik_fazları` · v0.4 feature'ları (AP1/AP2/AP3) ✅ · Aktif Faz/Adım dolu (15/discuss) → koşul karşılandı: **`içerik_fazları` → `teknik_borç`** damgalandı (Faz 7→8 emsali). Faz 16 = v0.4 versiyon-sonu teknik borç fazı.

### Alınan Kararlar

- **v0.4 TR production release öne çekildi (kullanıcı önceliği).** Normal sıra (teknik borç → senaryo testi → prd-review → release) yerine release **şimdi** yapıldı; App Store lansman aciliyeti. *Gerekçe:* Faz 15 tam doğrulandı (UAT 16/16, a11y=100, CI yeşil) → kalite riski düşük; senaryo testi + prd-review canlı v0.4 üstünde arkadan gelir (test-what's-live, v0.2 emsali). Sonuç: `main` = `f173234`, canlı ✓ (`docs/RELEASE-v0.4.md`).
- **TR içerik olduğu gibi yayınlandı.** Fiyatlar (₺1.500/salon/ay, 2. salon ₺1.200, kurulum ₺3.000, 15 gün deneme) + tüm TR metin Faz 15 halinde. *Gerekçe:* kullanıcı bölüm-bölüm gözden geçirdi, "fena durtmuyor, gerekirse sonra düzeltiriz" (2026-07-16). Ek TR içerik task'ı açılmadı.
- **non-TR (en/ar/de/es) çeviri → bu fazın DIŞI, sonraki faz / prd-review.** Canlıda non-TR = stale-TR (yapısal anahtar tam, değer Türkçe). *Gerekçe:* TR tek kaynak, versiyon-sınırı (DECISIONS 2026-06-27); v0.2/v0.3'te de dil stratejisi prd-review'a bırakıldı; tam 4-dil çeviri (133 leaf) SOTD craft bar'ıyla ayrı bir iş. "Kalan kısma devam ederiz" (kullanıcı).
- **gym PNG disk hijyeni → kapsama alındı (TB-D1).** `public/gym/*.png` (4 orphan dosya) silinir. *Gerekçe:* temiz mekanik hijyen; Faz 15'ten açıkça bu faza ertelenmişti; kalıcılık ilkesi.
- **npm audit / bağımlılık denetimi → kapsama alındı (TB-D2).** *Gerekçe:* kullanıcı seçimi (discuss-phase 16); v0.1'den beri ertelenen hafif güvenlik hijyeni. `package-lock` dokunulmaz — sadece rapor + onaylı güncelleme (Dokunulmazlar kuralı).

### Kullanıcı Tercihleri

- **Hız > tam çeviri:** siteyi bekletmeden TR'de canlıya al; diğer diller sonra.
- **App Store lansmanı yakın:** web sitesi hazır olmalı (uygulama neredeyse App Store'da).
- **Ek borç:** npm audit alındı; full-motion test tohumu alınmadı (sade tut).

### Çapraz Konular (research/plan farkındalığı)

- **Release regresyon güvencesi:** canlıya giden kod CI-yeşil `7e577d1`; guardrail'ler Faz 15'te mühürlü. gym PNG silme runtime'ı etkilemez (0 tüketici, `next/image` zaten düştü); npm güncelleme yaparsa build + Vitest + a11y tohumları yeniden koşulmalı (regresyon kapısı).
- **`public/gym/*.png` silme güvenliği:** grep 0 tüketici (Faz 15 teyitli) — ama silmeden önce yeniden grep (kaynak + `_dev/` referans) şart; sitemap/OG imaj referansı olmadığını doğrula.
- **npm audit:** düzeltme yalnız `package-lock` dokunulmazlığını bozmadan (onaylı `npm audit fix` veya sürüm-pin) — build/CI kırılmamalı; kırılırsa geri al, borcu kaydet.

### Kapsam Dışı

- **non-TR (en/ar/de/es) çeviri** — sonraki faz / prd-review (TR tek kaynak; canlıda stale-TR geçici kabul).
- **App Store / Google Play indirme linki/rozeti + pilot chip güncelleme + yol haritası tazeliği** — sonraki içerik işi ("gerekirse sonra düzeltiriz").
- **Chatbot `ANTHROPIC_API_KEY` env** — kullanıcı aksiyonu (Vercel dashboard); kod işi değil.
- **`/bulten` çıplak 404** — pre-existing latent gap (v0.4 dokunmadı); gelecek SEO/içerik işi.
- **Senaryo testi** — versiyon-sonu sıradaki fazı (Faz 17); bu faz teknik borç.
- **TR içerik/fiyat düzenlemesi** — yayınlanan hali korunur (kullanıcı "sonra düzeltiriz").

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 16` oturumunda doldurulur.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 16` oturumunda doldurulur.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 16.01 | TASK-16.01 | ⬜ Bekliyor | (plan-phase doldurur — örn. gym PNG disk hijyeni + npm audit) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

**Not (faz-dışı operasyonel aksiyon, kayıt):** v0.4 TR production release bu oturumda yapıldı (task değil — operasyonel) → `docs/RELEASE-v0.4.md`. Canlı = `f173234`.

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 16` oturumunda doldurulur.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 16` oturumunda doldurulur.

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 16` oturumunda doldurulur.

---

## Sonuç

> Bu bölüm `/devflow:review-phase 16` oturumunda doldurulur.

---

**Oluşturulma:** 2026-07-16 (discuss-phase 16)
**Son Güncelleme:** 2026-07-16 — discuss-phase 16: versiyon-sonu tespiti `içerik_fazları`→`teknik_borç`; kapsam gym PNG hijyeni + npm audit; non-TR çeviri ertelendi. **v0.4 TR production release yapıldı** (kullanıcı önceliği, canlı `f173234` — `docs/RELEASE-v0.4.md`).
