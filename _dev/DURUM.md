# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-05 — **run-task TASK-14.04 ✅: S8-Lighthouse çift-tema a11y=100 + Living Flow perf tabanı doğrulandı.** LH dark 6/6 a11y=100 (0 düşen structural) + standalone axe light+dark 12/12 koşu 0 LH-ilgili ihlal → çift-tema mühürlü. Masaüstü perf 100/LCP 624ms/CLS 0 = Faz 12 birebir; mobil LCP ~3010ms ≤ taban 3164ms/CLS 0 (Lantern-det. regresyonsuz), perf/TBT software-GL env-anomali. Kapsam-içi bug YOK, kaynak değişmedi. İki-gate kapandı. Sahipli: brief mobil perf → prd-review B. Sıradaki adım **`run-task`** → TASK-14.05.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (TASK-14.01+14.02+14.03+14.04 ✅ tamamlandı; fazda 14.05–14.09 bekliyor → sıradaki = `run-task` TASK-14.05). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** run-task TASK-14.04 (2026-07-05) ✅ — S8-Lighthouse çift-tema a11y=100 + Living Flow perf tabanı re-teyit (LH 13.3.0, Chrome 150, TR `/`). **LH dark 6/6 a11y=100** (0 düşen structural audit; `landmark-one-main`/`heading-order`/`color-contrast` pass, bülten `<main>` korunuyor) + **standalone axe light+dark 12/12 koşu 0 LH-ilgili ihlal** (0 tema-uyumsuzluk) → a11y=100 çift-tema mühürlü. **Masaüstü full-motion perf 100/LCP 624ms/CLS 0** = Faz 12 kanonik birebir (nabız imzası regresyonsuz); **mobil LCP ~3010ms ≤ korunan taban 3164-3171ms, CLS 0** (Lantern-deterministik regresyonsuz), perf 66/TBT ~2000ms software-GL env-anomali (kıyaslanmadı). **Kapsam-içi bug YOK**, kaynak değişmedi (9.04 emsali — yeni artefakt yok, kayıt `docs/perf/README.md` v0.3/Faz 14). İki-gate kapandı (14.03 axe suite + 14.04 LH structural skor). **Kayıtlı sahipli açıklar (gelecek/prd-review):** TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam + Araştırma + Task Listesi yazıldı; TASK-14.01+14.02+14.03+14.04 ✅, 14.05–14.09 bekliyor). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-14.05** (S3 mod kombinasyonları / sayfa-boyu nabız — EN BÜYÜK v0.3 delta; system Chrome WebGL) — aktif, ⬜ bekliyor. Sıradaki adım **`run-task`** (yeni oturum). TASK-14.01+14.02+14.03+14.04 ✅ tamamlandı+arşivlendi.
**Durum:** Faz 14 🔄 (Kapsam + Araştırma + Task Listesi + plan review yazıldı; 14.01+14.02+14.03+14.04 ✅); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Adım = task.
**İlerleme:** run-task TASK-14.04 (2026-07-05) ✅ — S8-Lighthouse: LH dark 6/6 a11y=100 + axe light+dark 12/12 koşu 0 LH-ilgili ihlal → çift-tema mühürlü; masaüstü perf 100/LCP 624ms/CLS 0 = Faz 12 birebir; mobil LCP ~3010ms ≤ taban/CLS 0 regresyonsuz; kapsam-içi bug yok, kaynak değişmedi. İki-gate kapandı. Sıradaki = `run-task` → TASK-14.05.

---

## Task Durumu (Aktif Faz)

> **Faz 14 🔄** — senaryo testi fazı; 9 task (S1–S9 → 14.01–14.09). Detay tablo + araç eşlemesi `phases/PHASE-14.md`. TASK-14.01+14.02+14.03+14.04 ✅; TASK-14.05 aktif (sıradaki `run-task`). Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 14.01 | TASK-14.01 | ✅ Tamamlandı | S1 giriş/redirect matrisi (curl; `/crew-os` public, `/bunker-os`→308, `/forum`→`/`) + kanonik prod-serve — **30/30 route 200, redirect'ler 308 doğru, bug yok** |
| 14.02 | TASK-14.02 | ✅ Tamamlandı | S5+S6-render prerender grep — **"Crew OS" 5 dil var, "Bunker" görünür 0 (yalnız `#bunker` kod-adı), 0 MISSING_MESSAGE, namespace crew senkron, AR-RTL, bug yok; ar/de/es 4 alt sayfa İngilizce-stale (record-not-fix)** |
| 14.03 | TASK-14.03 | ✅ Tamamlandı | S8-suite+S6-parite — **Vitest 39/39 + `test:e2e` 52 passed (WCAG-AA 0 ihlal) + CI fast+a11y success; kapsam-içi bug yok** |
| 14.04 | TASK-14.04 | ✅ Tamamlandı | S8-Lighthouse a11y=100 çift-tema + Living Flow perf tabanı — **LH dark 6/6 a11y=100 + axe light+dark 12/12 koşu 0 ihlal; masaüstü perf 100/LCP 624ms/CLS 0 Faz-12 birebir; mobil LCP ~3010ms ≤ taban regresyonsuz; bug yok** |
| 14.05 | TASK-14.05 | 🔄 Aktif (bekliyor) | S3 mod komb./sayfa-boyu nabız (system Chrome WebGL — EN BÜYÜK v0.3 delta) |
| 14.06 | TASK-14.06 | ⬜ Bekliyor | S4 kontroller & kalıcılık (tema/dil `/crew-os` path-koru/klavye) |
| 14.07 | TASK-14.07 | ⬜ Bekliyor | S2 tam TR yolculuğu (Crew OS `/crew-os` çıkış, `<Logo>`, dönüş) |
| 14.08 | TASK-14.08 | ⬜ Bekliyor | S7 chatbot 0-token (offline + sanitizasyon + malformed; API çağrısı=0) |
| 14.09 | TASK-14.09 | ⬜ Bekliyor | S9 adversarial/holistik (JS-off SSG, toggle race, scroll storm + nabız/ScrollTrigger, build temiz) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`).

**TASK-14.04 — S8-Lighthouse a11y=100 çift-tema + Living Flow perf tabanı** ✅ (2026-07-05)
- **a11y=100 çift-tema mühürlü:** LH dark kanonik 6 sayfa → **6/6 a11y=100** (0 düşen structural audit; `landmark-one-main`/`heading-order`/`color-contrast`/`list`/`document-title`/`html-has-lang` pass, bülten `<main>` korunuyor) + standalone axe light+dark 6 sayfa × 2 tema = **12/12 koşu 0 LH-ilgili ihlal** (0 tema-uyumsuzluk; color-contrast çift-temada temiz).
- **Living Flow perf tabanı korundu:** masaüstü full-motion **perf 100/100/100, LCP 624ms (median), CLS 0** = Faz 12 kanonik birebir (nabız imzası regresyonsuz); mobil **LCP ~3010ms ≤ korunan taban 3164-3171ms, CLS 0** (Lantern-deterministik regresyonsuz). perf 66/TBT ~2000ms software-GL env-anomali (kıyaslanmadı).
- **Kapsam-içi bug YOK**, kaynak değişmedi (9.04 emsali — yeni artefakt yok, kayıt `docs/perf/README.md` v0.3/Faz 14). İki-gate kapandı (14.03 axe + 14.04 LH structural). Sahipli: brief mobil perf açığı → prd-review B.

**TASK-14.03 — S8-suite + S6-parite (guardrail suite re-teyit)** ✅ (2026-07-05)
- Taze build temiz → `npm run test` **39/39 yeşil**: i18n-parity 5 (5-dil parite, eksik anahtar=fail) + seo-metadata 16 (self-canonical + hreflang/x-default) + seo-redirects 16 (bunker-os→crew-os + forum→/ + sıra mührü, routes-manifest'e bağlı gerçekten koştu) + smoke 1 + umami 1.
- `npm run test:e2e` **52 passed**: home-a11y 2 (`/` light+dark) + subpages 50 (5 sayfa × 5 dil × light/dark), WCAG-AA **0 ihlal**, `retries:0` (fail-on-regression). CI run `28675346650` (HEAD 1c0491c) `fast`+`a11y` **success** (auth'suz REST).
- **Kapsam-içi bug YOK**, regresyonsuz, kaynak değişmedi. İki-gate: axe+parite+SEO-tohum suite gate'i kapandı; **Lighthouse a11y=100 skor gate'i AYRI → TASK-14.04**.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-14.05** 🔄 aktif (S3 mod kombinasyonları / sayfa-boyu nabız — EN BÜYÜK v0.3 delta; system Chrome WebGL ŞART). TASK-14.04 ✅ (S8-Lighthouse — LH dark 6/6 a11y=100 + axe light+dark 12/12 koşu 0 ihlal, masaüstü perf 100/LCP 624ms/CLS 0 Faz-12 birebir, mobil LCP ~3010ms ≤ taban regresyonsuz, bug yok). TASK-14.03 ✅ (S8-suite — Vitest 39/39 + `test:e2e` 52 passed + CI success). Sıradaki adım **`run-task`** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). Planlama ✅ + plan review ✅: 9 task (build-ground-truth önce → runtime → adversarial); doğrulama fazı, kaynak değişmez. **TASK-14.01 ✅** (S1 giriş/redirect matrisi) · **TASK-14.02 ✅** (S5 taksonomi + S6-render) · **TASK-14.03 ✅** (S8-suite + S6-parite) · **TASK-14.04 ✅** (S8-Lighthouse çift-tema a11y=100 + perf tabanı). **Faz 13 ✅** — SEO-metadata hijyeni. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `run-task` (TASK-14.05).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-05 — **run-task TASK-14.04 ✅: S8-Lighthouse çift-tema a11y=100 + Living Flow perf tabanı re-teyit edildi** (kaynak DEĞİŞMEDİ, doğrulama fazı; yalnız `_dev/` — TASK-14.04 arşive, PHASE-14 Task Listesi 14.04 ✅ + bulgu notu, `docs/perf/README.md` v0.3/Faz 14 bölümü, DURUM). Taze prod (`rm -rf .next && next build` temiz → `next start -p 4173`, listening-PID teyit; LH **13.3.0** — npx-cache'te 12.8.2 de vardı ama Faz 12 desktop tabanı 13.3.0, apples-to-apples; Chrome 150 + swiftshader flag'leri; TR `/` `NEXT_LOCALE=tr`; loadavg düşük). **LH dark kanonik 6 sayfa → 6/6 a11y=100** (0 düşen structural audit; `landmark-one-main`/`heading-order`/`color-contrast`/`list`/`document-title`/`html-has-lang`/`meta-viewport` pass, bülten `<main>` korunuyor) + **standalone Playwright+system Chrome axe light+dark 6 sayfa × 2 tema = 12/12 koşu 0 LH-ilgili ihlal** (0 tema-uyumsuzluk; color-contrast çift-temada temiz) → **a11y=100 çift-tema mühürlü**. **Masaüstü full-motion perf 100/100/100, LCP 624ms median, CLS 0** = Faz 12 kanonik (`home-desktop-20260703-faz12`) birebir → Living Flow sayfa-boyu nabız imzası regresyonsuz; **mobil LCP ~3010ms ≤ korunan taban 3164-3171ms, FCP ~1514ms, CLS 0** (Lantern-deterministik regresyonsuz), LCPel hero-sub değişmedi. perf 66/TBT ~2000ms = ağır-SwiftShader ortam-anomalisi (Faz 9 birebir; memory gereği kıyaslanmadı). **Kapsam-içi bug YOK**, regresyonsuz. **İki-gate KAPANDI:** 14.03 axe+parite+SEO-tohum suite + 14.04 LH structural skor gate. Sahipli record-not-fix: brief mobil perf açığı (rep-env ~90/LCP >2.5s, CPU-bound WebGL gerçek-cihaz duvarı) → prd-review B. TASK-9.04 emsali (kaynak değişmedi → yeni kanonik artefakt yok). **Sıradaki DevFlow komutu: `run-task` (TASK-14.05, S3 sayfa-boyu nabız — EN BÜYÜK v0.3 delta, system Chrome WebGL).**
