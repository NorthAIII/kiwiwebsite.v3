# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **run-task 15.04 ✅.** 9-özellik "Ne yapar" grid porlandı: `AlpfitFeatures.tsx` (YENİ — artifact `.features`/`.feat` L217-224/L639-658 React+Tailwind port; `FEATURES=["f1".."f9"]` map crew/roles deseni; `gap-px` hairline + opak `bg-surface` hücreler + `color-mix` yeşil hover tint; `repeat(3)`→sm2→lg3 responsive; section-head sub-yok) + `AlpfitShowcase`'e `#ozellikler` bağlandı + `alpfit.features` 5-dil i18n (+40 net satır/dil, kanonik round-trip). Tailwind arbitrary `bg-[color-mix(...)]` repoda ilk → Next 15 sıfır-config derledi. **Test:** Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn) · prerender: `#ozellikler`=1, features `<h3>`=9, 9/9 başlık (tr `dir=ltr` / ar `dir=rtl`) · **Playwright a11y bu oturumda koştu:** spor-salonu 10/10 (5 dil × light+dark, WCAG AA 0 ihlal, AR RTL) · görsel light+dark+AR-RTL craft doğrulandı (3×3 hairline grid, dark okunabilir, AR aynalanır). Branch `revize/alpfit-plus`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 — regresyon değil). **Sıradaki: `/devflow:run-task 15.05`** (3 task kaldı).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **15 — v0.4 Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım)** (🔄 devam — tek faz). Fazlar 1–14 ✅ (v0.1+v0.2+v0.3 tamam, canlı).
**Adım:** task — 15.04 ✅ tamamlandı (7 task'tan 4'ü bitti, 3 kaldı). **Sıradaki: `/devflow:run-task 15.05`** (Neden Alpfit Plus — why + koyu aside ink-panel — yeni oturum). **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** run-task 15.04 (2026-07-16) ✅ — 9-özellik grid (`AlpfitFeatures` — artifact `.features` React+Tailwind port, `FEATURES` map, `gap-px` hairline + `color-mix` hover, `repeat(3)`→2→1) + `#ozellikler` bağlandı + `alpfit.features` 5-dil. Tailwind arbitrary `color-mix` class repoda ilk (Next 15 sıfır-config). Vitest 39/39 · build 37/37 SSG · a11y spor-salonu 10/10 (çift-tema + AR RTL). run-task 15.03 (2026-07-16) ✅ — Telefon mockup'ları (`PhoneMockups` + `.module.css` — 4 iPhone birebir CSS Module port, `dir=ltr` sabit-TR, paylaşılan StatusBar/TabBar) + `alpfit.app` 5-dil. CSS Module repoda ilk kullanım (Next 15 sıfır-config). Vitest 39/39 · build 37/37 SSG · a11y 52/52 (çift-tema + AR RTL, çapraz regresyonsuz). run-task 15.02 (2026-07-16) ✅ — Sorun (inline section-head + `<hr>`) + `AlpfitRoles` (4 kart) + `alpfit.problem`/`alpfit.roles` 5-dil. run-task 15.01 (2026-07-16) ✅ — Foundation: `--color-surface` token + `alpfit` ns kökü + `AlpfitShowcase`/`AlpfitHero` + sayfa rewire. verify-plan 15 (2026-07-16) ✅ — 7 task doğrulandı. plan-phase 15 (2026-07-16) ✅. research-phase 15 (2026-07-16) ✅. discuss-phase 15 (2026-07-16) ✅.
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

**Task:** **TASK-15.05 (aktif — henüz başlamadı).** Neden Alpfit Plus (why + koyu aside ink-panel). Sıradaki: `/devflow:run-task 15.05`.
**Durum:** Faz 15 🔄 (15.01–15.04 ✅; 3 task kaldı); Adım = task; Aktif Versiyon v0.4, Versiyon Sonu Durumu `içerik_fazları`. Fazlar 1–14 ✅ (canlı v0.3).
**İlerleme:** run-task 15.04 (2026-07-16) ✅ — 9-özellik grid (`AlpfitFeatures` — artifact `.features` port, `FEATURES` map, `gap-px` hairline + `color-mix` hover) + `#ozellikler` + `alpfit.features` 5-dil; Vitest 39/39, build 37/37 SSG, a11y spor-salonu 10/10 çift-tema. 1 yeni dosya (`AlpfitFeatures.tsx`) + `AlpfitShowcase` bağlandı + 5 messages.

---

## Task Durumu (Aktif Faz)

> **Faz 15 🔄** (15.01–15.04 ✅ tamamlandı; 3 task kaldı, sıradaki 15.05 aktif). Tam tablo + açıklamalar `phases/PHASE-15.md` Task Listesi. Fazlar 1–14 ✅; son faz (14, v0.3 versiyon-sonu senaryo testi — UAT 11/11, 0 kapsam-içi bug) detayı `phases/PHASE-14.md` + `tasks/archive/`.

| # | Task | Durum |
|---|------|-------|
| 15.01 | Foundation: token + `alpfit` ns kökü + kabuk + Hero + sayfa rewire | ✅ Tamamlandı |
| 15.02 | Sorun + 4 Rol | ✅ Tamamlandı |
| 15.03 | Telefon mockup'ları (CSS Module, en yüksek craft) | ✅ Tamamlandı |
| 15.04 | 9 Özellik grid | ✅ Tamamlandı |
| 15.05 | Neden Alpfit Plus (why + koyu aside ink-panel) | ⬜ Bekliyor |
| 15.06 | Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış | ⬜ Bekliyor |
| 15.07 | SEO/metadata + Gym temizliği + guardrail doğrulama | ⬜ Bekliyor |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 14 kapandı (v0.3 canlı) → Faz 14 task özetleri PHASE-14'e mezun edildi** (detaylar `phases/PHASE-14.md` + `tasks/archive/`); Faz 15 aktif.

**TASK-15.04 — 9-özellik grid (`AlpfitFeatures`) + `alpfit.features` i18n** ✅ (2026-07-16)
- **Kuruldu:** `AlpfitFeatures.tsx` (YENİ — artifact `.features`/`.feat` L217-224/L639-658 React+Tailwind port; section-head roles deseniyle birebir, artifact'a uygun **sub yok**; sabit `FEATURES=["f1".."f9"]` + `map`, crew/roles deseni JSON array yok); grid `gap-px overflow-hidden rounded-[18px] border-line bg-line sm:grid-cols-2 lg:grid-cols-3` (artifact `repeat(3)`→2→1), hücreler opak `bg-surface px-[25px] py-[27px]`; hover `color-mix(green 5%, surface)` opak yeşil-tint) + `AlpfitShowcase`'e `#ozellikler` bağlandı. `alpfit.features` 5-dil (+40 net satır/dil, kanonik round-trip).
- **Test:** Vitest 39/39 (i18n-parity `features.*` 9×2×5) · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn, color-mix arbitrary class derlendi) · prerender: `#ozellikler`=1, features `<h3>`=9, 9/9 başlık (tr `dir=ltr` / ar `dir=rtl`) · **Playwright a11y bu oturumda koştu:** spor-salonu 10/10 (5 dil × light+dark, WCAG AA 0 ihlal, AR RTL) · görsel light+dark+AR-RTL craft doğrulandı (3×3 hairline grid, dark okunabilir, AR aynalanır).
- **Not:** Tailwind arbitrary `bg-[color-mix(in_srgb,var(--color-green)_5%,var(--color-surface))]` repoda ilk (önce yalnız CSS/inline-style) → Next 15 sıfır-config derledi. `bg-green/5` (yarı-saydam) alternatifi hairline `bg-line`'ı sızdırırdı → color-mix opak tercih edildi. i18n non-TR TR-kopya (versiyon-sınırına ertelenen stale).

**TASK-15.03 — Telefon mockup'ları (`PhoneMockups` + `.module.css`) + `alpfit.app` i18n** ✅ (2026-07-16)
- **Kuruldu:** `PhoneMockups.module.css` (YENİ — artifact `.phone`/`.ph-*` birebir CSS Module port; `.ph-screen` `--a-*` self-contained açık palet; font→`--font-display`/`--font-sans`, çerçeve gölgesi sabit açık-tema inline) + `PhoneMockups.tsx` (YENİ — 4 iPhone: üye ana/randevu/antrenör yoklama/gelişim; `cx()` hashed-sınıf helper, paylaşılan `StatusBar`/`TabBar` + 4 bespoke ekran; telefon içi sabit TR + her telefon `dir="ltr"`; `phone-cap` çerçeve dışı Tailwind+i18n) + `AlpfitShowcase`'e `#uygulama` bağlandı. `alpfit.app` 5-dil (+23 satır/dil).
- **Test:** Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn, CSS Module derlendi) · prerender 5-dil grep (#uygulama/başlık/telefon-TR/cap/chart-aria; AR `dir=ltr` 4/4) 1/1 · **Playwright a11y bu oturumda koştu:** spor-salonu 10/10 + tam süit 52/52 (WCAG AA 0 ihlal, çapraz regresyonsuz) · görsel light+dark+AR-RTL craft doğrulandı.
- **Not:** CSS Module repoda ilk kullanım → Next 15 sıfır-config derledi (fallback gerekmedi). Telefon ekranı tema-invariant (açık) + çerçeve koyu — kasıtlı (gerçek telefon ekranı); AR'de sayfa aynalanır ama ekran LTR kalır. i18n non-TR TR-kopya (versiyon-sınırına ertelenen stale).


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-15.05** (aktif — henüz başlamadı). Neden Alpfit Plus (why + koyu aside ink-panel). Sıradaki: `/devflow:run-task 15.05`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır).
**Aktif Faz:** **15 — v0.4 Alpfit Plus ürün vitrini** (🔄; 15.01–15.04 ✅, 3 task kaldı). Adım = task; sıradaki `/devflow:run-task 15.05`. **Aktif Versiyon v0.4 — Alpfit Plus ürün vitrini**, Versiyon Sonu Durumu: **içerik_fazları**. Fazlar 1–14 ✅ (v0.1+v0.2+v0.3, canlı). Faz dokümanı: `phases/PHASE-15.md`. Feature: `PRD/features/alpfit-plus.md`; tasarım referansı `docs/alpfit-plus-artifact.html`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — **run-task 15.04 ✅.** 9-özellik grid (`AlpfitFeatures` — artifact `.features` React+Tailwind port, `FEATURES` map, `gap-px` hairline + `color-mix` yeşil hover, `repeat(3)`→2→1) + `AlpfitShowcase`'e `#ozellikler` + `alpfit.features` 5-dil (+40 net satır/dil). Tailwind arbitrary `color-mix` class repoda ilk (Next 15 sıfır-config). Vitest 39/39 · build 37/37 SSG exit 0 · Playwright a11y spor-salonu 10/10 (çift-tema + AR RTL 0 ihlal) · görsel light+dark+AR-RTL craft. 1 yeni dosya + `AlpfitShowcase` + 5 messages. Branch `revize/alpfit-plus`. **Sıradaki: `/devflow:run-task 15.05`** (3 task kaldı).
