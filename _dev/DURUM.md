# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **run-task TASK-13.03 ✅: alternates layout→ana sayfa taşındı (fail-safe) — TB-1 tamamlandı.** `layout.tsx` `generateMetadata`'dan `alternates` bloğu kaldırıldı (title/desc/og/metadataBase korundu); `page.tsx`'e `generateMetadata` eklendi (yalnız `alternates: localizedAlternates(locale, "")`). Layout artık canonical miras ETTİRMEZ → unutan sayfa "canonical yok" (zararsız). Prerender kanıt: home tr→root, en/ar→prefixli + 5-dil hreflang+x-default; `/`'a canonicalize olan tek route home TR; 5 alt sayfa (13.02) regresyonsuz. Test 23✅ · build temiz (0 MISSING_MESSAGE). Sıradaki adım **`run-task` → TASK-13.04** (TB-2: `/forum` redirect denetimi).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 13 — **v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni)** 🔄 (discuss-phase 13 damgaladı). **Faz 12 ✅** (B1 Living Flow nabız kapsamı). Faz 11 ✅ (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (TASK-13.01 ✅, TASK-13.02 ✅, TASK-13.03 ✅; sıradaki `run-task` → TASK-13.04; Versiyon Sonu Durumu = `teknik_borç`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** TASK-13.03 (2026-07-03) ✅ — `alternates` layout'tan kaldırıldı, ana sayfaya taşındı (fail-safe). `page.tsx`'e `generateMetadata` (`alternates: localizedAlternates(locale, "")`); layout title/desc/og/metadataBase korundu. Prerender kanıt: home tr→root, en/ar→prefixli + 5-dil hreflang+x-default; `/`'a canonicalize olan tek route home TR; 5 alt sayfa regresyonsuz. 23✅ · build temiz. **TB-1 tamamlandı.** **TB-2 kalan** → 13.04 (`/forum`→`/` + `/forum/:slug*`→`/bulten/:slug*` locale-twin'ler + tüm config redirect denetimi + `routes-manifest.json` redirect regresyon tohumu). Yeni bağımlılık yok; içerik/DOM/route path değişmez; `next.config.ts` yalnız `redirects()` bloğu (faz-onaylı). **Kapsam-dışı/kayıtlı sahipli açıklar:** **TB-3 full-motion tohumu (WebGL flaky, gelecek faz)**, **TB-4 site-geneli logical-ok (RTL)**, **TB-5 npm audit (next downgrade breaking)**, B grubu → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-13.md` (🔄 Devam ediyor — Task Listesi: 13.01–13.03 ✅, 13.04 ⬜). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** teknik_borç

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-13.04 (sıradaki icra; ⬜ Bekliyor). TASK-13.03 ✅ tamamlandı, arşivlendi. Task icrası `run-task` ile (yeni oturum).
**Durum:** Faz 13 🔄 → Adım **task**. Versiyon Sonu Durumu = `teknik_borç`; Aktif Versiyon v0.3.
**İlerleme:** TASK-13.03 (2026-07-03) ✅ — alternates layout→ana sayfa taşındı (fail-safe); layout artık canonical miras ettirmez, home self-canonical korundu; 5 alt sayfa regresyonsuz; 23 test yeşil, build temiz. **TB-1 tamamlandı.** Sıradaki = `run-task` → TASK-13.04 (TB-2: `/forum` redirect denetimi + regresyon tohumu).

---

## Task Durumu (Aktif Faz)

> **Faz 13 🔄** — plan yazıldı (`phases/PHASE-13.md` → Task Listesi). Task'lar `verify-plan 13` sonrası `run-task` ile sırayla çalışılır. Faz 4–12 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 13.01 | TASK-13.01 | ✅ Tamamlandı | Ortak `localizedAlternates` helper + locale-path util + sitemap refactor + helper unit testi (TB-1) |
| 13.02 | TASK-13.02 | ✅ Tamamlandı | 5 alt sayfaya self-canonical + 5-locale hreflang alternates (TB-1) |
| 13.03 | TASK-13.03 | ✅ Tamamlandı | alternates layout→ana sayfa taşıma (fail-safe default) (TB-1) |
| 13.04 | TASK-13.04 | ⬜ Bekliyor | `/forum` locale-gap + config redirect denetimi + redirect regresyon tohumu (TB-2) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 12 kapandı → Faz 12 task özetleri sıfırlandı** (detaylar `phases/PHASE-12.md` + `tasks/archive/`). Faz 13'ün ilk task'ı bitince buraya eklenir.

**TASK-13.03** — alternates'i layout'tan ana sayfaya taşı (fail-safe default) (TB-1) ✅
- **Özet:** `layout.tsx` `generateMetadata`'dan `alternates` bloğu kaldırıldı (title/desc/og/metadataBase korundu); `page.tsx`'e `generateMetadata` eklendi (`alternates: localizedAlternates(locale, "")` → title/desc layout'tan sığ-merge). Layout artık canonical miras ETTİRMEZ → unutan sayfa "canonical yok" (zararsız), yanlış `/` değil. **TB-1 tamamlandı.**
- **Test:** `npm run test` 23✅; `next build` temiz (0 MISSING_MESSAGE); prerender `<head>` — home tr→root, en/ar→prefixli + 5-dil hreflang+x-default, title/desc dolu (layout mirası); 5 alt sayfa (13.02) kendi path'inde (regresyonsuz); `/`'a canonicalize olan tek route = home TR.
- **Sınır:** DOM/içerik/route path değişmedi; DECISIONS'a fail-safe canonical mimarisi kararı eklendi.

**TASK-13.02** — 5 alt sayfaya self-canonical + 5-locale hreflang alternates (TB-1) ✅
- **Özet:** 5 alt sayfanın `generateMetadata`'sına `localizedAlternates(locale, "<path>")` bağlandı (path'ler sitemap `PATHS` ile birebir; title/description korundu; helper bütün-obje döndürür → sığ-merge tuzağı yok).
- **Test:** `npm run test` 23✅; `next build` temiz (0 MISSING_MESSAGE); prerender `<head>` kanıtı — 5 alt sayfa canonical kendi path'ine + hreflang 5-dil+x-default, hiçbiri `/`'a canonicalize olmuyor; home canonical `/` (TR) / `/en` değişmedi.
- **Sınır:** ana sayfa/layout değişmedi — layout→home taşıma 13.03.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-13.04 sıradaki icra (⬜ Bekliyor). TASK-13.03 ✅ (alternates layout→home fail-safe; TB-1 bitti). Sıradaki adım **`run-task`** → TASK-13.04 (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **13 🔄** — v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni): TB-1 alt-sayfa self-canonical + 5-locale hreflang alternates (+x-default) + TB-2 `/forum` locale gap + tüm config redirect denetimi (`/forum`→`/`) + hafif regresyon tohumu. Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **teknik_borç** → sıradaki komut `verify-plan 13`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **run-task TASK-13.03 ✅: alternates layout→ana sayfa taşındı (fail-safe) — TB-1 tamamlandı** (kod: 2 dosya). `src/app/[locale]/layout.tsx` `generateMetadata`'dan `alternates: { canonical, languages }` bloğu **kaldırıldı** (fail-safe yorum eklendi); `title`/`description`/`metadataBase`/`openGraph` **korundu**. `src/app/[locale]/page.tsx`'e `generateMetadata` **eklendi**: `import type { Metadata }` + `import { localizedAlternates } from "@/i18n/metadata";` → `return { alternates: localizedAlternates(locale, "") }`; `Home` default export ve render **değişmedi** (title/desc/og layout'tan sığ-merge). Fail-safe: layout artık canonical **miras ettirmez** → alternates unutan gelecek sayfa "canonical yok" (zararsız, Google self-referans), yanlış `/` (zararlı) değil. **Kanıt:** `npm run test` 4 dosya/23 test ✅ (regresyonsuz); `next build` temiz (0 hata/0 `MISSING_MESSAGE`); prerender `<head>` grep — home `tr`→`canonical https://kiwiailab.com` (root), `en`→`/en`, `ar`→`/ar`, her biri `hrefLang` tr/en/ar/de/es + `x-default`, `<title>`+`<meta description>` **dolu** (layout mirası); 5 alt sayfa (13.02) canonical hâlâ kendi path'inde (layout kaldırma bozmadı); `grep -rl` — `/`'a canonicalize olan **tek** route `tr.html` (home TR); 30 canonical'lı HTML (5 locale × 6 route). **Sınır korundu:** içerik/DOM/route path değişmedi. DECISIONS'a fail-safe canonical mimarisi kararı eklendi (append). **Sıradaki DevFlow komutu: `run-task` → TASK-13.04.**
