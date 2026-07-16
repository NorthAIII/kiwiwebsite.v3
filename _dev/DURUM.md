# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **run-task 15.06 ✅.** Fiyat bandı + Yol haritası + Kapanış porlandı: `AlpfitPricing.tsx` (YENİ — full-bleed `bg-ink text-canvas` ink-panel bant; price-card [₺1.500 figürü + 3 satır + 2 CTA] + incl-card [7-madde checklist]; opak `INK_LIFT` iç kart; parlak aksanlar `--color-pulse-ink`) + `AlpfitShowcase`'e bağlandı + inline Yol haritası (dashed kutu, **Store dahil 5 kalem**, "yakında") + inline Kapanış (h2 + 2 CTA) + `alpfit.{pricing,roadmap,close}` 5-dil (+53 satır/dil). **axe off-viewport önlemi (15.05 deseni):** küçük opak `text-pulse-ink` aksanlara immediate backdrop ile aynı opak renk (eyebrow `bg-ink`, free-satır/₺ `INK_LIFT`) → bant viewport-dışıyken bile axe gerçek kontrastı ölçer. **Dürüstlük 4/4 aynen** (₺1.500/₺1.200/₺3.000/15 gün). **Test:** Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn) · prerender 5-dil (band/figür/free-satır/7-madde/roadmap Store/kapanış CTA; AR `dir=rtl`) · **Playwright a11y tam süit 52/52** (spor-salonu 10/10 çift-tema, WCAG AA 0 ihlal, çapraz-regresyonsuz) · görsel light (koyu bant/krem metin) + dark (krem bant/koyu metin inversiyon) + AR-RTL tam aynalanma. Branch `revize/alpfit-plus`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 — regresyon değil). **Sıradaki: `/devflow:run-task 15.07`** (1 task kaldı).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **15 — v0.4 Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım)** (🔄 devam — tek faz). Fazlar 1–14 ✅ (v0.1+v0.2+v0.3 tamam, canlı).
**Adım:** task — 15.06 ✅ tamamlandı (7 task'tan 6'sı bitti, 1 kaldı). **Sıradaki: `/devflow:run-task 15.07`** (SEO/metadata + Gym temizliği + guardrail doğrulama — yeni oturum). **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** run-task 15.06 (2026-07-16) ✅ — Fiyat bandı + Yol haritası + Kapanış (`AlpfitPricing` — full-bleed `bg-ink` ink-panel bant, price-card [₺1.500 + 3 satır + 2 CTA] + incl-card [7 madde], opak `INK_LIFT` kart, aksanlar `--color-pulse-ink`) + `AlpfitShowcase`'e bağlandı + inline Yol haritası (dashed, Store dahil 5 kalem) + inline Kapanış + `alpfit.{pricing,roadmap,close}` 5-dil. axe off-viewport önlemi: aksanlara immediate-backdrop opak renk (eyebrow `bg-ink`, free-satır `INK_LIFT`). Dürüstlük 4/4 aynen. Vitest 39/39 · build 37/37 SSG · a11y tam süit 52/52 (çift-tema + AR RTL, çapraz-regresyonsuz). run-task 15.05 (2026-07-16) ✅ — "Neden Alpfit Plus" (`AlpfitWhy` — opak-tint lead kartı + "18 rakip" badge + 4 madde; koyu aside site ink-panel inversion `bg-ink`+`t.rich` yeşil vurgu) + `alpfit.why` 5-dil; axe off-viewport yanlış-pozitifi vurgu `<b>`'ye `bg-ink` vererek çözüldü. Öncesi (detay → `phases/PHASE-15.md` Task Listesi + git log): 15.04 9-özellik grid · 15.03 telefon mockup'ları (CSS Module) · 15.02 Sorun+4 Rol · 15.01 foundation ✅; plan döngüsü verify-plan/plan/research/discuss 15 ✅.
**Son Faz Dokümanı:** `phases/PHASE-15.md` (🔄 aktif). Önceki: `phases/PHASE-14.md` (✅ v0.3 son fazı).

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** içerik_fazları (re-kickoff 2026-07-16 sıfırladı)

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-15.07 (aktif — henüz başlamadı).** SEO/metadata + Gym temizliği + guardrail doğrulama. Sıradaki: `/devflow:run-task 15.07`.
**Durum:** Faz 15 🔄 (15.01–15.06 ✅; 1 task kaldı); Adım = task; Aktif Versiyon v0.4, Versiyon Sonu Durumu `içerik_fazları`. Fazlar 1–14 ✅ (canlı v0.3).
**İlerleme:** run-task 15.06 (2026-07-16) ✅ — Fiyat bandı (`AlpfitPricing` ink-panel bant) + inline Yol haritası (Store dahil) + inline Kapanış + `alpfit.{pricing,roadmap,close}` 5-dil; Vitest 39/39, build 37/37 SSG, a11y 52/52 çift-tema. 1 yeni dosya (`AlpfitPricing.tsx`) + `AlpfitShowcase` + 5 messages. axe off-viewport önlemi immediate-backdrop opak renkle (eyebrow `bg-ink` / free-satır `INK_LIFT`).

---

## Task Durumu (Aktif Faz)

> **Faz 15 🔄** (15.01–15.06 ✅ tamamlandı; 1 task kaldı, sıradaki 15.07 aktif). Tam tablo + açıklamalar `phases/PHASE-15.md` Task Listesi. Fazlar 1–14 ✅; son faz (14, v0.3 versiyon-sonu senaryo testi — UAT 11/11, 0 kapsam-içi bug) detayı `phases/PHASE-14.md` + `tasks/archive/`.

| # | Task | Durum |
|---|------|-------|
| 15.01 | Foundation: token + `alpfit` ns kökü + kabuk + Hero + sayfa rewire | ✅ Tamamlandı |
| 15.02 | Sorun + 4 Rol | ✅ Tamamlandı |
| 15.03 | Telefon mockup'ları (CSS Module, en yüksek craft) | ✅ Tamamlandı |
| 15.04 | 9 Özellik grid | ✅ Tamamlandı |
| 15.05 | Neden Alpfit Plus (why + koyu aside ink-panel) | ✅ Tamamlandı |
| 15.06 | Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış | ✅ Tamamlandı |
| 15.07 | SEO/metadata + Gym temizliği + guardrail doğrulama | ⬜ Bekliyor |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 14 kapandı (v0.3 canlı) → Faz 14 task özetleri PHASE-14'e mezun edildi** (detaylar `phases/PHASE-14.md` + `tasks/archive/`); Faz 15 aktif.

**TASK-15.06 — Fiyat bandı (`AlpfitPricing` ink-panel) + Yol haritası (+Store) + Kapanış + i18n** ✅ (2026-07-16)
- **Kuruldu:** `AlpfitPricing.tsx` (YENİ — full-bleed `<section id="fiyat" bg-ink text-canvas>` ink-panel bant; price-grid `lg:grid-cols-[1.32fr_1fr]`; **price-card** ₺1.500 figürü + not + 3 satır [kurulum ₺3.000 / yıllık peşin ücretsiz / 15 gün, "free" `text-pulse-ink`] + 2 CTA [Demo iste `bg-canvas text-ink` inversiyon / Teklif al ghost] + kurucu notu `border-s-2 border-pulse-ink`; **incl-card** 7-madde checklist `Check` SVG; iç kart opak `INK_LIFT=bg-[color-mix(#fff 4%,ink)]`, muted `text-canvas/65`) + `AlpfitShowcase`'e bağlandı + inline **Yol haritası** (dashed kutu, yeşil "yakında" pill, `ROADMAP` map bold kalemler **Store dahil 5**) + inline **Kapanış** (h2 + 2 CTA). `alpfit.{pricing,roadmap,close}` 5-dil (+53 satır/dil, 35 leaf).
- **Test:** Vitest 39/39 (i18n-parity `pricing`/`roadmap`/`close`) · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn, INK_LIFT color-mix derlendi) · prerender 5-dil (band/₺1.500/free-satır/7-madde/roadmap Store/kapanış CTA; AR `dir=rtl`) · **Playwright a11y tam süit 52/52** (spor-salonu 10/10 çift-tema WCAG AA 0 ihlal, çapraz-regresyonsuz) · görsel light (koyu bant/krem metin, parlak-yeşil aksan) + dark (krem bant/koyu metin inversiyon) + AR-RTL tam aynalanma.
- **Not:** axe off-viewport önlemi (15.05 deseni genelleştirildi) — bant viewport-dışıyken küçük opak `text-pulse-ink` aksanlar body-canvas'a düşer → her aksana **immediate backdrop ile aynı opak renk** (eyebrow bant üstünde `bg-ink`, free-satır/₺ kart üstünde `INK_LIFT`); muted `/65` translücent → "incomplete" (dokunulmadı). Muted `/55`→`/65` (dark AA, task'a rağmen 15.05 kanıtı). İç kart opak (artifact `--band-surface` de opak). Dürüstlük 4/4 aynen. → MEMORY `axe-offscreen-inline-contrast`.

**TASK-15.05 — "Neden Alpfit Plus" (`AlpfitWhy`) + `alpfit.why` i18n** ✅ (2026-07-16)
- **Kuruldu:** `AlpfitWhy.tsx` (YENİ — iki-sütun `lg:grid-cols-[1.12fr_1fr]` mobilde tek; sol `why-list` = opak yeşil-tint `lead` kartı + "18 rakip" badge + 4 madde `ITEMS` map; sağ `<aside>` = **site ink-panel inversion** `bg-ink text-canvas`+`lg:sticky`, pull-quote `t.rich` `<b>` yeşil vurgu `text-pulse-ink` + muted `text-canvas/65`) + `AlpfitShowcase`'e bağlandı. `alpfit.why` 5-dil (+29 satır/dil, 15 leaf).
- **Test:** Vitest 39/39 · `next build` 37/37 SSG exit 0 · prerender 5-dil (eyebrow/lead/badge/4 madde/aside `<b>`/src; AR `dir=rtl`) · **Playwright a11y tam süit 52/52** (çapraz-regresyonsuz) · görsel light+dark+AR-RTL craft.
- **Not:** axe off-viewport yanlış-pozitifi — küçük inline `<b>` (gerçek 11.5:1) scroll-0'da viewport-dışıyken axe body-canvas'a düşer (1.5:1 fail) → vurgu `<b>`'ye panelle **aynı renk** `bg-ink` verilerek çözüldü (görsel değişimsiz). Muted `/55`→`/65` (dark AA). → MEMORY `axe-offscreen-inline-contrast`.


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-15.07** (aktif — henüz başlamadı). SEO/metadata + Gym temizliği + guardrail doğrulama. Sıradaki: `/devflow:run-task 15.07`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır).
**Aktif Faz:** **15 — v0.4 Alpfit Plus ürün vitrini** (🔄; 15.01–15.06 ✅, 1 task kaldı). Adım = task; sıradaki `/devflow:run-task 15.07`. **Aktif Versiyon v0.4 — Alpfit Plus ürün vitrini**, Versiyon Sonu Durumu: **içerik_fazları**. Fazlar 1–14 ✅ (v0.1+v0.2+v0.3, canlı). Faz dokümanı: `phases/PHASE-15.md`. Feature: `PRD/features/alpfit-plus.md`; tasarım referansı `docs/alpfit-plus-artifact.html`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — **run-task 15.06 ✅.** Fiyat bandı + Yol haritası + Kapanış (`AlpfitPricing` — full-bleed `bg-ink` ink-panel bant; price-card [₺1.500 + 3 satır + 2 CTA] + incl-card [7 madde]; opak `INK_LIFT` kart; aksanlar `--color-pulse-ink`) + `AlpfitShowcase`'e bağlandı + inline Yol haritası (dashed, Store dahil 5 kalem) + inline Kapanış + `alpfit.{pricing,roadmap,close}` 5-dil (+53 satır/dil). axe off-viewport önlemi: aksanlara immediate-backdrop opak renk (eyebrow `bg-ink` / free-satır `INK_LIFT`). Dürüstlük 4/4 aynen. Vitest 39/39 · build 37/37 SSG exit 0 · Playwright a11y tam süit 52/52 (çift-tema + AR RTL 0 ihlal, çapraz-regresyonsuz) · görsel light+dark+AR-RTL craft. 1 yeni dosya + `AlpfitShowcase` + 5 messages. Branch `revize/alpfit-plus`. **Sıradaki: `/devflow:run-task 15.07`** (1 task kaldı).
