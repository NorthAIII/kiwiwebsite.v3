# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-05 — **run-task TASK-14.06 ✅: S4 kontroller & kalıcılık (tema/dil/klavye) doğrulandı.** system Chrome WebGL2=true (ayırt-edici), 10/10 PASS, kapsam-içi bug YOK. Tema toggle → `html.dark`+localStorage(`dark`)+bg flip; reload kalıcı + FOUC yok (early===final); Living Flow uniform sayfa-boyu **remount YOK** (canvas damga sağ, 1→1, fixed viewport); dil-switcher path korur: home→`/de`, **`/crew-os`→`/en/crew-os` (eski `/bunker-os` DEĞİL — v0.3 kritik ✓)**, gym→`/en/spor-salonu-yazilimi`; menü kapanış Escape/dış-tık/klavye; focus-visible **yeşil outline** light `#1f7a3d`+dark `#4fb06a` 12/12, odak kaybı yok. İlk-koşu S4.1c FAIL=harness artefaktı (`waitUntil:'commit'`e çevrildi). Kaynak değişmedi. Sıradaki adım **`run-task`** → TASK-14.07.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (TASK-14.01→14.06 ✅ tamamlandı; fazda 14.07–14.09 bekliyor → sıradaki = `run-task` TASK-14.07). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** run-task TASK-14.06 (2026-07-05) ✅ — S4 kontroller & kalıcılık (tema/dil/klavye) system Chrome WebGL2=true ile doğrulandı. **10/10 senaryo PASS, kapsam-içi bug YOK.** Tema toggle → `html.dark`+localStorage(`dark`)+bg flip (light `rgb(247,246,241)`→dark `rgb(19,21,16)`)+aria-pressed; reload kalıcı + **FOUC yok (early===final===true**, pre-paint blocking `<head>`); **Living Flow uniform sayfa-boyu remount YOK** (canvas'a damga → toggle sonrası damga sağ, canvas 1→1, FlowBackdrop fixed 1280×800 viewport, `FlowCanvas` MutationObserver renk uniform'unu tek context'te çevirir); dil-switcher path korur: home→DE=`/de`, **`/crew-os`→EN=`/en/crew-os` (eski `/bunker-os` DEĞİL — v0.3 kritik ✓)**, `/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`; menü kapanış Escape/dış-tık/klavye; **klavye focus-visible yeşil outline** light `#1f7a3d(31,122,61)`+dark `#4fb06a(79,176,106)`, 12/12 odak yeşil/2px, odak kaybı yok. İlk-koşu S4.1c FAIL = harness artefaktı (`addInitScript` document_start `documentElement` null → `waitUntil:'commit'`e çevrildi), gerçek-bug değil. Kaynak değişmedi (harness scratchpad, commit'lenmez). **Kayıtlı sahipli açıklar (gelecek/prd-review):** TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam + Araştırma + Task Listesi yazıldı; TASK-14.01→14.06 ✅, 14.07–14.09 bekliyor). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-14.07** (S2 tam TR yolculuğu — Crew OS `/crew-os` çıkış, `<Logo>`, dönüş; system Chrome + prerender) — aktif, ⬜ bekliyor. Sıradaki adım **`run-task`** (yeni oturum). TASK-14.01→14.06 ✅ tamamlandı+arşivlendi.
**Durum:** Faz 14 🔄 (Kapsam + Araştırma + Task Listesi + plan review yazıldı; 14.01→14.06 ✅); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Adım = task.
**İlerleme:** run-task TASK-14.06 (2026-07-05) ✅ — S4 kontroller & kalıcılık (tema/dil/klavye) system Chrome WebGL2=true: 10/10 PASS, kapsam-içi bug yok. Tema toggle → html.dark+localStorage+bg flip; reload kalıcı+FOUC yok (early===final); Living Flow uniform sayfa-boyu remount YOK (damga sağ, canvas 1→1); dil-switcher path korur: home→`/de`, `/crew-os`→`/en/crew-os` (eski `/bunker-os` DEĞİL — v0.3 kritik ✓), gym→`/en/spor-salonu-yazilimi`; menü kapanış Escape/dış-tık/klavye; focus-visible yeşil outline light+dark 12/12, odak kaybı yok. Kaynak değişmedi. Sıradaki = `run-task` → TASK-14.07.

---

## Task Durumu (Aktif Faz)

> **Faz 14 🔄** — senaryo testi fazı; 9 task (S1–S9 → 14.01–14.09). Detay tablo + araç eşlemesi `phases/PHASE-14.md`. TASK-14.01→14.06 ✅; TASK-14.07 aktif (sıradaki `run-task`). Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 14.01 | TASK-14.01 | ✅ Tamamlandı | S1 giriş/redirect matrisi (curl; `/crew-os` public, `/bunker-os`→308, `/forum`→`/`) + kanonik prod-serve — **30/30 route 200, redirect'ler 308 doğru, bug yok** |
| 14.02 | TASK-14.02 | ✅ Tamamlandı | S5+S6-render prerender grep — **"Crew OS" 5 dil var, "Bunker" görünür 0 (yalnız `#bunker` kod-adı), 0 MISSING_MESSAGE, namespace crew senkron, AR-RTL, bug yok; ar/de/es 4 alt sayfa İngilizce-stale (record-not-fix)** |
| 14.03 | TASK-14.03 | ✅ Tamamlandı | S8-suite+S6-parite — **Vitest 39/39 + `test:e2e` 52 passed (WCAG-AA 0 ihlal) + CI fast+a11y success; kapsam-içi bug yok** |
| 14.04 | TASK-14.04 | ✅ Tamamlandı | S8-Lighthouse a11y=100 çift-tema + Living Flow perf tabanı — **LH dark 6/6 a11y=100 + axe light+dark 12/12 koşu 0 ihlal; masaüstü perf 100/LCP 624ms/CLS 0 Faz-12 birebir; mobil LCP ~3010ms ≤ taban regresyonsuz; bug yok** |
| 14.05 | TASK-14.05 | ✅ Tamamlandı | S3 mod komb./sayfa-boyu nabız (system Chrome WebGL2 — EN BÜYÜK v0.3 delta) — **9/9 PASS, bug YOK; high→pageLevel canvas=1+FOUC yok; reduced→canvas=0 tüm sayfa; no-WebGL→static; mobil-low→pageLevel=0 (nabız desktop-only); AR-RTL×dark×reduced ok; overflowX=0+CLS=0; craft veil ok** |
| 14.06 | TASK-14.06 | ✅ Tamamlandı | S4 kontroller & kalıcılık (system Chrome WebGL2) — **10/10 PASS, bug YOK; tema toggle html.dark+localStorage+bg flip, reload kalıcı+FOUC yok (early===final); Living Flow uniform sayfa-boyu remount YOK; dil-switcher path korur `/crew-os`→`/en/crew-os` (eski `/bunker-os` değil ✓); menü kapanış Escape/dış-tık/klavye; focus-visible yeşil outline light+dark 12/12, odak kaybı yok** |
| 14.07 | TASK-14.07 | 🔄 Aktif (bekliyor) | S2 tam TR yolculuğu (Crew OS `/crew-os` çıkış, `<Logo>`, dönüş) |
| 14.08 | TASK-14.08 | ⬜ Bekliyor | S7 chatbot 0-token (offline + sanitizasyon + malformed; API çağrısı=0) |
| 14.09 | TASK-14.09 | ⬜ Bekliyor | S9 adversarial/holistik (JS-off SSG, toggle race, scroll storm + nabız/ScrollTrigger, build temiz) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`).

**TASK-14.06 — S4 Kontroller & Kalıcılık (tema/dil/klavye)** ✅ (2026-07-05)
- **10/10 senaryo PASS, kapsam-içi bug YOK** (system Chrome `channel:'chrome'`+swiftshader, WebGL2=true → ayırt-edici SANITY): tema toggle → `html.dark`+localStorage(`dark`)+bg flip (light `rgb(247,246,241)`→dark `rgb(19,21,16)`)+aria-pressed; reload kalıcı + **FOUC yok (early===final===true**, pre-paint blocking `<head>` script); **Living Flow uniform sayfa-boyu remount YOK** (canvas'a damga → toggle sonrası damga sağ, canvas 1→1, FlowBackdrop fixed 1280×800 viewport, `FlowCanvas` MutationObserver renk uniform'unu tek context'te çevirir).
- **Dil-switcher path korur:** home→DE=`/de`; **`/crew-os`→EN=`/en/crew-os` (eski `/bunker-os` DEĞİL — v0.3 kritik ✓)**; `/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`; menü kapanış Escape/dış-tık/klavye (Enter-aç→Esc-kapa) `aria-expanded` true→false. **Klavye focus-visible yeşil outline** (`reducedMotion:'reduce'`): light `#1f7a3d(31,122,61)`+dark `#4fb06a(79,176,106)`, 12/12 odak yeşil/2px, odak kaybı yok.
- **Kaynak değişmedi** (doğrulama fazı, harness scratchpad commit'lenmez). İlk-koşu S4.1c FAIL = harness artefaktı (`addInitScript` document_start `documentElement` null → `MutationObserver.observe` fırlıyor; `waitUntil:'commit'` hydration-öncesi okumaya çevrildi → early===final PASS), gerçek-bug değil.

**TASK-14.05 — S3 Living Flow sayfa-boyu nabız degradasyonu (EN BÜYÜK v0.3 delta)** ✅ (2026-07-05)
- **9/9 senaryo PASS, kapsam-içi bug YOK** (system Chrome `channel:'chrome'`+swiftshader, WebGL2=true → ayırt-edici, bundled değil): high/desktop → **pageLevel canvas=1** (FlowBackdrop `position:fixed`, Hero high'da canvas render etmez → tek WebGL context) + FOUC yok light&dark (pre-paint script → early===final); **reduced-motion → canvas=0 scroll öncesi+sonrası** (nabız **tüm sayfa** düşer, sızıntı yok — v0.3-kritik); no-WebGL → static; **mobil-low (390) → pageLevel=0, heroCanvas=1** (nabız desktop-only korundu, Faz 12); AR-RTL×dark×reduced → rtl+dark+static+lang=ar çakışmadı; 320/768/1440 → **overflowX=0px + CLS=0.0000**.
- **Craft (görsel son hakem):** light+dark scroll-screenshot → hero-ötesi HowItWorks+SectorSolutions metni net/okunabilir; `--flow-veil` (light 70%/dark 56%) washi metni her zaman kazandırıyor (light-bleed yok), yeşil nabız breathing-zone'da görünür → sayfa-boyu nabız imzası + veil okunabilirlik çözümü çalışıyor.
- **Kaynak değişmedi** (doğrulama fazı, harness scratchpad commit'lenmez). N/A sahipli: alt sayfa nabzı desktop-home-only (kapsam-dışı, regresyonsuz); perf/TBT software-GL env-anomali (kıyaslanmadı, 14.04 emsali).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-14.07** 🔄 aktif (S2 tam TR yolculuğu — Crew OS `/crew-os` çıkış, `<Logo>`, dönüş; system Chrome + prerender). TASK-14.06 ✅ (S4 kontroller & kalıcılık — system Chrome WebGL2, 10/10 PASS, bug yok: tema toggle html.dark+localStorage+bg flip, reload kalıcı+FOUC yok early===final; Living Flow uniform sayfa-boyu remount YOK; dil-switcher `/crew-os`→`/en/crew-os` eski `/bunker-os` değil ✓; menü kapanış Escape/dış-tık/klavye; focus-visible yeşil outline light+dark 12/12 odak kaybı yok). TASK-14.05 ✅ (S3 sayfa-boyu nabız — 9/9 PASS: reduced→canvas=0 tüm sayfa; mobil-low→pageLevel=0 nabız desktop-only; CLS=0; craft veil ok). Sıradaki adım **`run-task`** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). Planlama ✅ + plan review ✅: 9 task (build-ground-truth önce → runtime → adversarial); doğrulama fazı, kaynak değişmez. **TASK-14.01 ✅** (S1 giriş/redirect matrisi) · **TASK-14.02 ✅** (S5 taksonomi + S6-render) · **TASK-14.03 ✅** (S8-suite + S6-parite) · **TASK-14.04 ✅** (S8-Lighthouse çift-tema a11y=100 + perf tabanı) · **TASK-14.05 ✅** (S3 sayfa-boyu nabız degradasyonu — EN BÜYÜK v0.3 delta, 9/9 PASS) · **TASK-14.06 ✅** (S4 kontroller & kalıcılık — tema/dil/klavye, 10/10 PASS). **Faz 13 ✅** — SEO-metadata hijyeni. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `run-task` (TASK-14.07).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-05 — **run-task TASK-14.06 ✅: S4 kontroller & kalıcılık (tema/dil/klavye) doğrulandı** (kaynak DEĞİŞMEDİ, doğrulama fazı; yalnız `_dev/` — TASK-14.06 arşive, PHASE-14 Task Listesi 14.06 ✅ + bulgu notu, DURUM). Taze prod (`rm -rf .next && next build` temiz → `next start -p 3000`, Ready 383ms, listening-PID 18786 teyit — stray yok; loadavg ~1.0-1.4 düşük) + standalone Playwright `chromium.launch({channel:'chrome', args:['--no-sandbox','--enable-unsafe-swiftshader','--disable-dev-shm-usage']})`; focus için ayrı `reducedMotion:'reduce'` context. **SANITY webgl2=true/canvas=1 (ayırt-edici). 10/10 senaryo PASS, kapsam-içi bug YOK.** Tema toggle → `html.dark`+localStorage(`dark`)+bg flip (light `rgb(247,246,241)`→dark `rgb(19,21,16)`)+aria-pressed=true; reload kalıcı + **FOUC yok (early===final===true**, pre-paint blocking `<head>` script hydration'dan önce class ekler); **Living Flow uniform sayfa-boyu remount YOK** (canvas'a damga → toggle sonrası damga sağ, canvas 1→1, FlowBackdrop `position:fixed inset-0` 1280×800 viewport'u kaplar, `FlowCanvas` MutationObserver renk uniform'unu tek context'te çevirir); dil-switcher path korur: home→DE=`/de`, **`/crew-os`→EN=`/en/crew-os` (eski `/bunker-os` DEĞİL — v0.3 kritik ✓)**, `/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`; menü kapanış Escape/dış-tık/klavye (Enter-aç→Esc-kapa) `aria-expanded` true→false; **klavye focus-visible yeşil outline** light `#1f7a3d(31,122,61)` + dark `#4fb06a(79,176,106)`, 12/12 odak yeşil/2px, odak kaybı yok (BODY'ye düşmedi). İlk koşuda S4.1c FAIL = **harness artefaktı** (memory disiplini: `addInitScript` document_start'ta `documentElement` null → `MutationObserver.observe` fırlıyor; `waitUntil:'commit'` hydration-öncesi okumaya çevrildi → early===final PASS), gerçek-bug değil. Harness scratchpad (commit'lenmez). **Sıradaki DevFlow komutu: `run-task` (TASK-14.07, S2 tam TR yolculuğu).**
