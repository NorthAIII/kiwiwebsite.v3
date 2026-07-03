# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **run-task TASK-13.01 ✅: TB-1 SEO helper altyapısı kuruldu.** `src/i18n/metadata.ts` (YENİ) — `localePath` + `localizedAlternates` (self-canonical + 5-dil hreflang + x-default, `routing.locales` tek kaynak); `sitemap.ts` ortak `localePath` tüketir (non-TR home `/en/`→`/en` normalize); `tests/seo-metadata.test.ts` (YENİ node) yeşil. Test 23✅ · build temiz · sitemap 30 URL teyitli. Sayfa metadata'sı değişmedi (page-wiring 13.02/13.03). Sıradaki adım **`run-task` → TASK-13.02** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 13 — **v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni)** 🔄 (discuss-phase 13 damgaladı). **Faz 12 ✅** (B1 Living Flow nabız kapsamı). Faz 11 ✅ (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (TASK-13.01 ✅; sıradaki `run-task` → TASK-13.02; Versiyon Sonu Durumu = `teknik_borç`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** TASK-13.01 (2026-07-03) ✅ — TB-1 helper altyapısı: `src/i18n/metadata.ts` (`localePath` + `localizedAlternates`) + `sitemap.ts` ortak-util refactor + `tests/seo-metadata.test.ts` node tohum (23✅, build temiz, sitemap 30 URL). Sayfa metadata'sı değişmedi. **TB-1 kalan** → 13.02 (5 alt sayfa helper çağrısı wiring) → 13.03 (alternates layout→ana sayfa taşıma, fail-safe). Sıra 13.02→13.03 regresyon penceresi bırakmaz. **TB-2** → 13.04 (`/forum`→`/` + `/forum/:slug*`→`/bulten/:slug*` locale-twin'ler + tüm config redirect denetimi + `routes-manifest.json` redirect regresyon tohumu). Yeni bağımlılık yok; içerik/DOM/route path değişmez; `next.config.ts` yalnız `redirects()` bloğu (faz-onaylı). **Kapsam-dışı/kayıtlı sahipli açıklar:** **TB-3 full-motion tohumu (WebGL flaky, gelecek faz)**, **TB-4 site-geneli logical-ok (RTL)**, **TB-5 npm audit (next downgrade breaking)**, B grubu → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-13.md` (🔄 Devam ediyor — Task Listesi: 13.01 ✅, 13.02–13.04 ⬜). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** teknik_borç

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-13.02 (sıradaki icra; ⬜ Bekliyor). TASK-13.01 ✅ tamamlandı, arşivlendi. Task icrası `run-task` ile (yeni oturum).
**Durum:** Faz 13 🔄 → Adım **task**. Versiyon Sonu Durumu = `teknik_borç`; Aktif Versiyon v0.3.
**İlerleme:** TASK-13.01 (2026-07-03) ✅ — TB-1 helper altyapısı (`metadata.ts` + sitemap refactor + node tohum) kuruldu; 23 test yeşil, build temiz, sitemap 30 URL teyitli. Sıradaki = `run-task` → TASK-13.02 (5 alt sayfa helper wiring).

---

## Task Durumu (Aktif Faz)

> **Faz 13 🔄** — plan yazıldı (`phases/PHASE-13.md` → Task Listesi). Task'lar `verify-plan 13` sonrası `run-task` ile sırayla çalışılır. Faz 4–12 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 13.01 | TASK-13.01 | ✅ Tamamlandı | Ortak `localizedAlternates` helper + locale-path util + sitemap refactor + helper unit testi (TB-1) |
| 13.02 | TASK-13.02 | ⬜ Bekliyor | 5 alt sayfaya self-canonical + 5-locale hreflang alternates (TB-1) |
| 13.03 | TASK-13.03 | ⬜ Bekliyor | alternates layout→ana sayfa taşıma (fail-safe default) (TB-1) |
| 13.04 | TASK-13.04 | ⬜ Bekliyor | `/forum` locale-gap + config redirect denetimi + redirect regresyon tohumu (TB-2) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 12 kapandı → Faz 12 task özetleri sıfırlandı** (detaylar `phases/PHASE-12.md` + `tasks/archive/`). Faz 13'ün ilk task'ı bitince buraya eklenir.

**TASK-13.01** — Ortak `localizedAlternates` helper + locale-path util + sitemap refactor + helper unit testi (TB-1) ✅
- **Özet:** `src/i18n/metadata.ts` (YENİ) — `localePath` (locale→prefix) + `localizedAlternates` (self-canonical + 5-dil hreflang + x-default, `routing.locales` tek kaynak); `sitemap.ts` ortak util tüketir (non-TR home `/en/`→`/en` normalize); `tests/seo-metadata.test.ts` (YENİ node) — deterministik canonical/hreflang tohumu.
- **Test:** `npm run test` 23✅ (regresyonsuz); `next build` temiz; sitemap 30 URL, home slashsiz (kanıt `.next/.../sitemap.xml.body`).
- **Sınır:** sayfa metadata'sı değişmedi — page-wiring 13.02/13.03.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-13.02 sıradaki icra (⬜ Bekliyor). TASK-13.01 ✅ (TB-1 helper altyapısı). Sıradaki adım **`run-task`** → TASK-13.02 (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **13 🔄** — v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni): TB-1 alt-sayfa self-canonical + 5-locale hreflang alternates (+x-default) + TB-2 `/forum` locale gap + tüm config redirect denetimi (`/forum`→`/`) + hafif regresyon tohumu. Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **teknik_borç** → sıradaki komut `verify-plan 13`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **run-task TASK-13.01 ✅: TB-1 SEO helper altyapısı kuruldu** (kod: 3 dosya · yeni: 2). `src/i18n/metadata.ts` (YENİ) iki saf fonksiyon: `localePath(locale, path)` (locale→prefix, `routing.defaultLocale` tek kaynak — `tr→"/"`, non-TR→`/<locale>`) + `localizedAlternates(locale, path)` (Next `alternates`: self-canonical + `languages` `routing.locales` üzerinden 5-dil + `x-default`=varsayılan-locale-prefixsiz). `src/app/sitemap.ts` refactor → ortak `localePath` tüketir (elle `${prefix}${path||"/"}` kalktı; non-TR home `/en/`→`/en` **kasıtlı normalizasyon**, layout canonical ile hizalı; 30 URL + priority/changeFreq korundu). `tests/seo-metadata.test.ts` (YENİ, Vitest node) deterministik canonical/hreflang tohumu (locale döngüleri `routing.locales` üzerinden → yeni dil oto-kapsar). **Kanıt:** `npm run test` 4 dosya/23 test ✅ (i18n-parity regresyonsuz); `next build` temiz (0 hata/0 `MISSING_MESSAGE`); `.next/server/app/sitemap.xml.body` 30 `<loc>`, home URL'leri `/` `/en` `/ar` `/de` `/es` (non-TR slashsiz teyitli). **Sınır korundu:** hiçbir sayfa metadata'sı değişmedi (page-wiring 13.02/13.03; layout→home taşıma 13.03). **Sıradaki DevFlow komutu: `run-task` → TASK-13.02.**
