# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **verify-phase 13 ✅: UAT 16/16 senaryo geçti + otomatik kontroller temiz → düzeltme task'ı YOK, Faz 13 Adım=review.** Otonom test (build ground-truth: `routes-manifest.json` redirect regex + prerender `<head>` canonical/hreflang + Vitest). TB-1: her sayfa self-canonical + 5-dil hreflang+x-default doğrulandı, yalnız home TR çıplak-köke canonicalize (adversarial), layout fail-safe (canonical miras ettirmez). TB-2: 6 redirect 308, `/forum`→`/` locale-gap kapalı, sıra mührü. Otomatik: CI yeşil (fast+a11y job); npm audit 3 moderate=kayıtlı TB-5 (kapsam dışı); security temiz (saf metadata/redirect, runtime girdi/secret/auth yok). Test 39✅ · build temiz (0 MISSING_MESSAGE) · sitemap 30 URL canonical-tutarlı. Sıradaki adım **`review-phase 13`**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 13 — **v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni)** 🔄 (tüm task'lar ✅ + UAT ✅ → review bekliyor). **Faz 12 ✅** (B1 Living Flow nabız kapsamı). Faz 11 ✅ (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** review (TASK-13.01–13.04 ✅ + verify-phase 13 ✅ UAT 16/16 geçti, düzeltme task'ı yok; sıradaki `review-phase 13`; Versiyon Sonu Durumu = `teknik_borç`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** verify-phase 13 (2026-07-03) ✅ — UAT 16/16 senaryo geçti (otonom, build ground-truth); otomatik kontroller temiz (CI yeşil; npm audit 3 moderate=TB-5 kapsam dışı; security temiz) → **düzeltme task'ı YOK**. TB-1 canonical/hreflang (her sayfa self-canonical + 5-dil+x-default; yalnız home TR çıplak-kök; layout fail-safe) + TB-2 redirect (6×308, `/forum`→`/` gap kapalı, sıra mührü) doğrulandı. 39✅ · build temiz · sitemap 30 URL canonical-tutarlı. **Kapsam-dışı/kayıtlı sahipli açıklar:** **TB-3 full-motion tohumu (WebGL flaky, gelecek faz)**, **TB-4 site-geneli logical-ok (RTL)**, **TB-5 npm audit (next downgrade breaking)**, B grubu → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-13.md` (🔄 Devam ediyor — Task Listesi: 13.01–13.04 ✅; UAT ✅ 16/16; review bekliyor). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** teknik_borç

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Faz 13'ün tüm task'ları ✅ (13.01–13.04) + verify-phase 13 ✅ (UAT 16/16 geçti, düzeltme task'ı yok). Sıradaki adım task değil **`review-phase 13`** (faz review + retrospektif).
**Durum:** Faz 13 🔄 → Adım **review**. Versiyon Sonu Durumu = `teknik_borç`; Aktif Versiyon v0.3.
**İlerleme:** verify-phase 13 (2026-07-03) ✅ — 16 UAT senaryosu otonom (build ground-truth) geçti; CI yeşil, npm audit=TB-5 (kapsam dışı), security temiz → düzeltme task'ı yok. TB-1 (self-canonical + 5-dil hreflang/x-default, layout fail-safe) + TB-2 (redirect locale-gap kapalı, 6×308) doğrulandı. Sıradaki = `review-phase 13`.

---

## Task Durumu (Aktif Faz)

> **Faz 13 🔄** — plan yazıldı (`phases/PHASE-13.md` → Task Listesi). Task'lar `verify-plan 13` sonrası `run-task` ile sırayla çalışılır. Faz 4–12 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 13.01 | TASK-13.01 | ✅ Tamamlandı | Ortak `localizedAlternates` helper + locale-path util + sitemap refactor + helper unit testi (TB-1) |
| 13.02 | TASK-13.02 | ✅ Tamamlandı | 5 alt sayfaya self-canonical + 5-locale hreflang alternates (TB-1) |
| 13.03 | TASK-13.03 | ✅ Tamamlandı | alternates layout→ana sayfa taşıma (fail-safe default) (TB-1) |
| 13.04 | TASK-13.04 | ✅ Tamamlandı | `/forum` locale-gap + config redirect denetimi + redirect regresyon tohumu (TB-2) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 12 kapandı → Faz 12 task özetleri sıfırlandı** (detaylar `phases/PHASE-12.md` + `tasks/archive/`). Faz 13'ün ilk task'ı bitince buraya eklenir.

**TASK-13.04** — `/forum` locale-gap + tüm config redirect denetimi + regresyon tohumu (TB-2) ✅
- **Özet:** `next.config.ts` `redirects()`: `/forum`→`/`, `/forum/:slug*`→`/bulten/:slug*`, `/bunker-os`→`/crew-os`; her biri çıplak+`/:locale(en|ar|de|es)/…` twin, 6 redirect 308. `/forum` hedefi `/bulten` değil `/` (`/bulten` index yok, içerik ana sayfada). **İcra bulgusu:** `:slug*` opsiyonel gruba derlenir → çıplak `/forum`'u da eşler; ıraksak hedefte çıplak-önce sıralandı (plan sırası çürütüldü).
- **Test:** `npm run test` 39✅ (5 dosya, +16 seo-redirects); `next build` temiz (0 MISSING_MESSAGE); `routes-manifest.json` regex ground-truth — `/forum`→`/`, `/en/forum`→`/en`, `/forum/x`→`/bulten/x`, `/en/forum/x`→`/en/bulten/x`, `/bunker-os` çifti korundu, hepsi 308.
- **Sınır:** içerik/DOM/route path değişmedi; `/bulten` index oluşturulmadı (kapsam dışı). DECISIONS+memory'ye sıra tuzağı taşındı.

**TASK-13.03** — alternates'i layout'tan ana sayfaya taşı (fail-safe default) (TB-1) ✅
- **Özet:** `layout.tsx` `generateMetadata`'dan `alternates` bloğu kaldırıldı (title/desc/og/metadataBase korundu); `page.tsx`'e `generateMetadata` eklendi (`alternates: localizedAlternates(locale, "")` → title/desc layout'tan sığ-merge). Layout artık canonical miras ETTİRMEZ → unutan sayfa "canonical yok" (zararsız), yanlış `/` değil. **TB-1 tamamlandı.**
- **Test:** `npm run test` 23✅; `next build` temiz (0 MISSING_MESSAGE); prerender `<head>` — home tr→root, en/ar→prefixli + 5-dil hreflang+x-default, title/desc dolu (layout mirası); 5 alt sayfa (13.02) kendi path'inde (regresyonsuz); `/`'a canonicalize olan tek route = home TR.
- **Sınır:** DOM/içerik/route path değişmedi; DECISIONS'a fail-safe canonical mimarisi kararı eklendi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Faz 13 tüm task'lar ✅ (13.01–13.04) + verify-phase 13 ✅ (UAT 16/16, düzeltme task'ı yok). Sıradaki adım task değil **`review-phase 13`** (faz review + retrospektif). Açık takip: chatbot canlı env key.
**Aktif Faz:** **13 🔄** — v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni): TB-1 alt-sayfa self-canonical + 5-locale hreflang alternates (+x-default) ✅ + TB-2 `/forum` locale gap + tüm config redirect denetimi (`/forum`→`/`) + regresyon tohumu ✅. İcra + UAT bitti → review bekliyor. Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **teknik_borç** → sıradaki komut `review-phase 13`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **verify-phase 13 ✅: UAT 16/16 senaryo geçti + otomatik kontroller temiz → düzeltme task'ı YOK, Faz 13 Adım=review** (yalnız doküman: PHASE-13 UAT tablosu + DURUM). Otonom test (build ground-truth: `routes-manifest.json` redirect regex + prerender `<head>` canonical/hreflang + Vitest). **TB-1 doğrulandı:** 6 sayfanın (home+5 alt) her biri self-canonical + 5-dil hreflang + x-default (prerender `<head>`); çıplak-köke canonicalize olan **yalnız 1** sayfa (home TR) = adversarial negatif geçti; layout `generateMetadata` alternates miras ETTİRMEZ (fail-safe). **TB-2 doğrulandı:** 6 redirect 308 (`/forum`→`/`, `/en|ar|de|es/forum`→`/:locale`, `/forum/:slug*`→`/bulten/:slug*`+twin, `/bunker-os`+twin→`/crew-os`); locale-gap kapalı (twin regex 4 non-default prefix eşler); sıra mührü (çıplak `/forum` slug'a düşmez). **Guardrail:** i18n 5-dil parite yeşil, `next build` 0 `MISSING_MESSAGE`, sitemap 30 URL canonical-tutarlı, DOM/asset değişmedi → a11y/perf/CLS yapısal regresyonsuz. **Otomatik kontroller (Adım 1):** CI (`80570d8`) fast+a11y job ✅; npm audit 3 moderate = kayıtlı **TB-5** (kapsam dışı: fix=next downgrade breaking, statik-site istismar-edilemez); security temiz (saf metadata/redirect, runtime girdi/secret/auth yok). `npm run test` 5 dosya/**39 test** ✅. **Sıradaki DevFlow komutu: `review-phase 13` (faz review + retrospektif).**
