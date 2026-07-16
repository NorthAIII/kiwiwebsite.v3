# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **run-task 15.05 ✅.** "Neden Alpfit Plus" bölümü porlandı: `AlpfitWhy.tsx` (YENİ — artifact WHY L660-685/CSS L226-251 port; iki-sütun `1.12fr/1fr` mobilde tek; sol `why-list` = opak yeşil-tint `lead` kartı + "18 rakip" badge + 4 ayraçlı madde; sağ `<aside>` = **site ink-panel inversion** `bg-ink text-canvas` + `t.rich` yeşil vurgu `text-pulse-ink` + muted `text-canvas/65`, `lg:sticky`) + `AlpfitShowcase`'e bağlandı + `alpfit.why` 5-dil (+29 satır/dil, kanonik round-trip). **axe yanlış-pozitif çözüldü:** off-viewport küçük inline `<b>` axe'te body-canvas'a düşüp 1.5:1 fail veriyordu (gerçek 11.5:1) → vurgu `<b>`'ye panelle **aynı renk** `bg-ink` verilerek axe opak paneli ölçtü (görsel değişimsiz). **Test:** Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn) · prerender 5-dil (eyebrow/lead/badge/4 madde/aside `<b>`/src; AR `dir=rtl`) · **Playwright a11y:** spor-salonu 10/10 → tam süit **52/52** (çift-tema, WCAG AA 0 ihlal, çapraz-regresyonsuz) · görsel light+dark+AR-RTL craft (inversion doğru, yeşil vurgu iki temada okunur, AR aynalanır). Branch `revize/alpfit-plus`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 — regresyon değil). **Sıradaki: `/devflow:run-task 15.06`** (2 task kaldı).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **15 — v0.4 Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım)** (🔄 devam — tek faz). Fazlar 1–14 ✅ (v0.1+v0.2+v0.3 tamam, canlı).
**Adım:** task — 15.05 ✅ tamamlandı (7 task'tan 5'i bitti, 2 kaldı). **Sıradaki: `/devflow:run-task 15.06`** (Fiyat bandı ink-panel + Yol haritası +Store + Kapanış — yeni oturum). **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** run-task 15.05 (2026-07-16) ✅ — "Neden Alpfit Plus" (`AlpfitWhy` — why-list opak-tint lead kartı + "18 rakip" badge + 4 ayraçlı madde; koyu aside = site ink-panel inversion `bg-ink`+`t.rich` yeşil vurgu+`text-canvas/65`, `lg:sticky`) + `AlpfitShowcase`'e bağlandı + `alpfit.why` 5-dil. axe off-viewport yanlış-pozitifi vurgu `<b>`'ye `bg-ink` (panelle aynı renk) vererek çözüldü. Vitest 39/39 · build 37/37 SSG · a11y tam süit 52/52 (çift-tema + AR RTL, çapraz-regresyonsuz). run-task 15.04 (2026-07-16) ✅ — 9-özellik grid (`AlpfitFeatures` — artifact `.features` port, `FEATURES` map, `gap-px` hairline + `color-mix` hover) + `#ozellikler` + `alpfit.features` 5-dil. run-task 15.03 (2026-07-16) ✅ — Telefon mockup'ları (`PhoneMockups` + `.module.css` — 4 iPhone birebir CSS Module port, `dir=ltr` sabit-TR, paylaşılan StatusBar/TabBar) + `alpfit.app` 5-dil. CSS Module repoda ilk kullanım (Next 15 sıfır-config). Vitest 39/39 · build 37/37 SSG · a11y 52/52 (çift-tema + AR RTL, çapraz regresyonsuz). run-task 15.02 (2026-07-16) ✅ — Sorun (inline section-head + `<hr>`) + `AlpfitRoles` (4 kart) + `alpfit.problem`/`alpfit.roles` 5-dil. run-task 15.01 (2026-07-16) ✅ — Foundation: `--color-surface` token + `alpfit` ns kökü + `AlpfitShowcase`/`AlpfitHero` + sayfa rewire. verify-plan 15 (2026-07-16) ✅ — 7 task doğrulandı. plan-phase 15 (2026-07-16) ✅. research-phase 15 (2026-07-16) ✅. discuss-phase 15 (2026-07-16) ✅.
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

**Task:** **TASK-15.06 (aktif — henüz başlamadı).** Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış. Sıradaki: `/devflow:run-task 15.06`.
**Durum:** Faz 15 🔄 (15.01–15.05 ✅; 2 task kaldı); Adım = task; Aktif Versiyon v0.4, Versiyon Sonu Durumu `içerik_fazları`. Fazlar 1–14 ✅ (canlı v0.3).
**İlerleme:** run-task 15.05 (2026-07-16) ✅ — "Neden Alpfit Plus" (`AlpfitWhy` — lead kartı + badge + 4 madde + ink-panel koyu aside `t.rich` yeşil vurgu) + `AlpfitShowcase` bağlandı + `alpfit.why` 5-dil; Vitest 39/39, build 37/37 SSG, a11y 52/52 çift-tema. 1 yeni dosya (`AlpfitWhy.tsx`) + `AlpfitShowcase` + 5 messages. axe off-viewport yanlış-pozitifi `bg-ink`-on-`<b>` ile çözüldü.

---

## Task Durumu (Aktif Faz)

> **Faz 15 🔄** (15.01–15.05 ✅ tamamlandı; 2 task kaldı, sıradaki 15.06 aktif). Tam tablo + açıklamalar `phases/PHASE-15.md` Task Listesi. Fazlar 1–14 ✅; son faz (14, v0.3 versiyon-sonu senaryo testi — UAT 11/11, 0 kapsam-içi bug) detayı `phases/PHASE-14.md` + `tasks/archive/`.

| # | Task | Durum |
|---|------|-------|
| 15.01 | Foundation: token + `alpfit` ns kökü + kabuk + Hero + sayfa rewire | ✅ Tamamlandı |
| 15.02 | Sorun + 4 Rol | ✅ Tamamlandı |
| 15.03 | Telefon mockup'ları (CSS Module, en yüksek craft) | ✅ Tamamlandı |
| 15.04 | 9 Özellik grid | ✅ Tamamlandı |
| 15.05 | Neden Alpfit Plus (why + koyu aside ink-panel) | ✅ Tamamlandı |
| 15.06 | Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış | ⬜ Bekliyor |
| 15.07 | SEO/metadata + Gym temizliği + guardrail doğrulama | ⬜ Bekliyor |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 14 kapandı (v0.3 canlı) → Faz 14 task özetleri PHASE-14'e mezun edildi** (detaylar `phases/PHASE-14.md` + `tasks/archive/`); Faz 15 aktif.

**TASK-15.05 — "Neden Alpfit Plus" (`AlpfitWhy`) + `alpfit.why` i18n** ✅ (2026-07-16)
- **Kuruldu:** `AlpfitWhy.tsx` (YENİ — artifact WHY L660-685/CSS L226-251 port; iki-sütun `lg:grid-cols-[1.12fr_1fr]` mobilde tek; sol `why-list` = opak yeşil-tint `lead` kartı `bg-[color-mix(green 8%,surface)]`+`border-green/25`+"18 rakip" badge + 4 madde `ITEMS` map `border-t border-line py-6`; sağ `<aside>` = **site ink-panel inversion** `bg-ink text-canvas rounded-[18px]`+`lg:sticky`, pull-quote `t.rich` `<b>` yeşil vurgu `text-pulse-ink` + muted `text-canvas/65` üst-border) + `AlpfitShowcase`'e bağlandı. `alpfit.why` 5-dil (+29 satır/dil, kanonik round-trip, 15 leaf).
- **Test:** Vitest 39/39 (i18n-parity `why.*`) · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn, t.rich + color-mix derlendi) · prerender 5-dil (eyebrow/lead/badge/4 madde/aside `<b>`/src; AR `dir=rtl`) · **Playwright a11y:** spor-salonu 10/10 → tam süit **52/52** (5 dil × light+dark WCAG AA 0 ihlal, çapraz-regresyonsuz) · görsel light+dark+AR-RTL craft (inversion doğru, yeşil vurgu iki temada okunur, AR aside↔list aynalanır).
- **Not:** axe off-viewport yanlış-pozitifi — küçük inline vurgu `<b>` (gerçek 11.5:1) `scrollThrough` scroll-0'da viewport-dışı kalınca `elementsFromPoint` boş dönüp axe'in body-canvas'a düşmesi (1.5:1 fail); vurgu `<b>`'ye panelle **aynı renk** `bg-ink` verilerek çözüldü (görsel değişimsiz, opak zemin ölçülür). Muted `/55`→`/65` (dark AA), glow kaldırıldı (site deseni), lead opak color-mix (a11y+artifact). Yeni token yok. i18n non-TR TR-kopya (stale). → MEMORY `axe-offscreen-inline-contrast`.

**TASK-15.04 — 9-özellik grid (`AlpfitFeatures`) + `alpfit.features` i18n** ✅ (2026-07-16)
- **Kuruldu:** `AlpfitFeatures.tsx` (YENİ — artifact `.features`/`.feat` L217-224/L639-658 React+Tailwind port; section-head roles deseniyle birebir, artifact'a uygun **sub yok**; sabit `FEATURES=["f1".."f9"]` + `map`, crew/roles deseni JSON array yok); grid `gap-px overflow-hidden rounded-[18px] border-line bg-line sm:grid-cols-2 lg:grid-cols-3` (artifact `repeat(3)`→2→1), hücreler opak `bg-surface px-[25px] py-[27px]`; hover `color-mix(green 5%, surface)` opak yeşil-tint) + `AlpfitShowcase`'e `#ozellikler` bağlandı. `alpfit.features` 5-dil (+40 net satır/dil, kanonik round-trip).
- **Test:** Vitest 39/39 (i18n-parity `features.*` 9×2×5) · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn, color-mix arbitrary class derlendi) · prerender: `#ozellikler`=1, features `<h3>`=9, 9/9 başlık (tr `dir=ltr` / ar `dir=rtl`) · **Playwright a11y:** spor-salonu 10/10 (5 dil × light+dark, WCAG AA 0 ihlal, AR RTL) · görsel light+dark+AR-RTL craft doğrulandı (3×3 hairline grid, dark okunabilir, AR aynalanır).
- **Not:** Tailwind arbitrary `bg-[color-mix(in_srgb,var(--color-green)_5%,var(--color-surface))]` repoda ilk (önce yalnız CSS/inline-style) → Next 15 sıfır-config derledi. `bg-green/5` (yarı-saydam) alternatifi hairline `bg-line`'ı sızdırırdı → color-mix opak tercih edildi. i18n non-TR TR-kopya (versiyon-sınırına ertelenen stale).


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-15.06** (aktif — henüz başlamadı). Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış. Sıradaki: `/devflow:run-task 15.06`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır).
**Aktif Faz:** **15 — v0.4 Alpfit Plus ürün vitrini** (🔄; 15.01–15.05 ✅, 2 task kaldı). Adım = task; sıradaki `/devflow:run-task 15.06`. **Aktif Versiyon v0.4 — Alpfit Plus ürün vitrini**, Versiyon Sonu Durumu: **içerik_fazları**. Fazlar 1–14 ✅ (v0.1+v0.2+v0.3, canlı). Faz dokümanı: `phases/PHASE-15.md`. Feature: `PRD/features/alpfit-plus.md`; tasarım referansı `docs/alpfit-plus-artifact.html`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — **run-task 15.05 ✅.** "Neden Alpfit Plus" (`AlpfitWhy` — iki-sütun; opak-tint `lead` kartı + "18 rakip" badge + 4 ayraçlı madde; koyu aside = site ink-panel inversion `bg-ink`+`t.rich` yeşil vurgu `text-pulse-ink`+`text-canvas/65`, `lg:sticky`) + `AlpfitShowcase`'e bağlandı + `alpfit.why` 5-dil (+29 satır/dil). axe off-viewport yanlış-pozitifi vurgu `<b>`'ye panelle aynı renk `bg-ink` verilerek çözüldü (görsel değişimsiz). Vitest 39/39 · build 37/37 SSG exit 0 · Playwright a11y tam süit 52/52 (çift-tema + AR RTL 0 ihlal, çapraz-regresyonsuz) · görsel light+dark+AR-RTL craft. 1 yeni dosya + `AlpfitShowcase` + 5 messages. Branch `revize/alpfit-plus`. **Sıradaki: `/devflow:run-task 15.06`** (2 task kaldı).
