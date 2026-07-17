# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-18 — **run-task TASK-17.05 ✅ — S4 kontroller & kalıcılık GEÇTİ, 22/22 PASS, 0 kapsam-içi bug.** Runtime C (`page.route`+system Chrome); sanity ✓ (WebGL2 has:true; home high FlowBackdrop canvas=1). **Tema:** light→toggle→dark (`html.dark`+`aria-pressed`+`localStorage.theme=dark`+bg `rgb(247,246,241)`↔`rgb(19,21,16)`); **Living Flow uniform** canvas 1→1 (remount YOK, aynı element); reload **kalıcı**; **FOUC YOK** (early===final=dark, pre-paint). **Dil path-koru:** home→`/de`, **`/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`** (Alpfit), `/crew-os`→`/en/crew-os`; menü Escape/dış-tık/klavye kapanış. **Klavye:** focus-visible **yeşil 2px** light `rgb(31,122,61)`+dark `rgb(79,176,106)`, odak kaybı yok (16/16). 3 harness artefaktı düzeltildi = gerçek bug değil. Kaynak kod değişmedi; harness silindi. Fazlar 1–16 ✅, Faz 17 🔄 (Adım: **task**, 3 task kaldı). **v0.4 TR CANLI** (`main`=`f173234`). **Sıradaki: `/devflow:run-task` → TASK-17.06** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (discuss-phase 17 girdi, kapsam damgalandı). Doğrulama fazı — yeni feature üretilmez; ana sayfa + 5 alt sayfa uçtan-uca (S1–S9), delta odağı **Alpfit Plus ürün vitrini** (Faz 15) + test-what's-live (v0.4 canlıda `f173234`). Önceki faz **16 ✅** (v0.4 versiyon-sonu teknik borç + TR release). Fazlar 1–16 ✅.
**Adım:** **task** — TASK-17.05 ✅ (S4 kontroller & kalıcılık runtime C: `page.route`+system Chrome; **22/22 PASS, 0 kapsam-içi bug**; tema toggle+kalıcılık+FOUC-yok+Living Flow uniform, dil-switcher path-koru **Alpfit dahil**+menü kapanış, klavye focus-visible yeşil light+dark+odak-kaybı-yok). Fazda 3 task kaldı (17.06–17.08). Katman sırası A build-ground-truth (01-03 ✅) → C runtime `page.route`+system Chrome (04+05 ✅, 06-07) → adversarial+canlı duman (08). **Sıradaki: `/devflow:run-task` → TASK-17.06** (yeni oturum). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 gym PNG silme; versiyon-sonu finalizasyona, kapsam dışı; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu); (3) non-TR alpfit stale-TR (versiyon-sınırı → prd-review; 17.02/17.03'te yapısal parite teyit — görünür kopukluk yok); (4) **BULGU-S3** (17.04) — alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde animasyonlu Living Flow yok (yalnız base-wash; `FlowBackdrop` alt sayfalarda mount değil); crew-os ile birebir → v0.4 regresyonu değil, Faz 12 deseni; degradasyon/a11y doğru → craft nüansı, **prd-review'a ertelendi** (kullanıcı: devam; bu fazda fix task açılmadı — olası fix = alt sayfalara FlowBackdrop mount).
**İlerleme:** run-task TASK-17.05 (2026-07-18) — S4 kontroller & kalıcılık geçti (runtime C; 22/22 PASS, 0 kapsam-içi bug; tema/dil/klavye + Alpfit dil path-koru); kaynak kod değişmedi. Sıradaki: run-task TASK-17.06.
**Son Faz Dokümanı:** `phases/PHASE-17.md` (🔄). Önceki: `phases/PHASE-16.md` (✅ v0.4 teknik borç), `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** senaryo_testi (review-phase 16 damgaladı — v0.4 teknik borç fazı ✅). **Faz 17 (senaryo testi) 🔄 girildi** (discuss-phase 17); TR canlı (`f173234`) → Faz 17 test-what's-live literal → sonra zorunlu prd-review. non-TR çeviri prd-review'a.

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-17.06** ⬜ Bekliyor — sıradaki çalıştırılacak (S2 tam TR yolculuğu — C+A: `page.route`+prerender; Hero→CTA→sektörler **Alpfit çıkışı→yeni Alpfit Plus**→4-adım→Crew OS→Forum→Footer; alt sayfa çıkış/dönüş SPA-nav, `<Logo>` tutarlı, `/tr/`-sızıntı/kopuk-link/boş-bölüm yok). TASK-17.05 ✅ (S4 kontroller & kalıcılık geçti, 22/22 PASS). 3 task ⬜ (TASK-17.06–17.08).
**Durum:** Fazlar 1–16 ✅, Faz 17 🔄 (senaryo testi, Adım: task — 17.01+17.02+17.03+17.04+17.05 ✅); Versiyon Sonu Durumu `senaryo_testi`. **v0.4 TR canlı** (`f173234`).
**İlerleme:** run-task TASK-17.05 (2026-07-18) — S4 kontroller & kalıcılık geçti (runtime C; 22/22 PASS, 0 kapsam-içi bug; tema/dil/klavye + Alpfit dil path-koru). Sıradaki adım: run-task TASK-17.06.

---

## Task Durumu (Aktif Faz)

> **Faz 17 🔄** (plan-phase 17 ✅, 2026-07-17). S1–S9 → **8 task** (katman sırası A build-ground-truth → C runtime → adversarial+canlı). Detay + açıklamalar → `phases/PHASE-17.md` Task Listesi. Doğrulama fazı: kaynak kod değişmez (kapsam-içi bug → reaktif düzeltme task'ı istisnası).

| # | Task | Durum | Kısa |
|---|------|-------|------|
| 17.01 | TASK-17.01 | ✅ Tamamlandı | S1 giriş/yönlendirme matrisi + taze `next build` ground-truth (A) — geçti, 0 bug |
| 17.02 | TASK-17.02 | ✅ Tamamlandı | S5+S6-render + Alpfit render bütünlüğü (prerender grep, A) — geçti, 0 bug |
| 17.03 | TASK-17.03 | ✅ Tamamlandı | S8-suite + S6-parite (Vitest 39/39 + CI `fast`+`a11y` success = axe 50-test mührü; `alpfit` 133-leaf parite) — geçti, 0 bug |
| 17.04 | TASK-17.04 | ✅ Tamamlandı | S3 Living Flow degradasyon + Alpfit before/after + CLS (C) — geçti (regresyonsuz); BULGU-S3 (alt-sayfa masaüstü animasyonlu alan yok, regresyon değil/craft, kullanıcıya) |
| 17.05 | TASK-17.05 | ✅ Tamamlandı | S4 kontroller & kalıcılık (tema/dil/klavye, Alpfit dahil) (C) — geçti, 22/22 PASS, 0 bug |
| 17.06 | TASK-17.06 | ⬜ Bekliyor | S2 tam TR yolculuğu (Alpfit Plus çıkış/dönüş odak) (C+A) |
| 17.07 | TASK-17.07 | ⬜ Bekliyor | S7 chatbot 0-token (offline+sanitizasyon; 0 API çağrısı) |
| 17.08 | TASK-17.08 | ⬜ Bekliyor | S9 adversarial/holistik + canlı duman (test-what's-live) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 16 kapandı (v0.4 versiyon-sonu teknik borç) → Faz 16 task özeti (TASK-16.01) PHASE-16'ya mezun edildi.**

**TASK-17.05** ✅ (S4 kontroller & kalıcılık runtime — doğrulama, kaynak kod değişmedi)
- Runtime C (`page.route`+system Chrome); sanity ✓ (WebGL2 has:true; home high FlowBackdrop canvas=1). **22/22 PASS, 0 kapsam-içi bug.** Selector kaynaktan teyit (ThemeToggle `aria-pressed`+`localStorage("theme")`+useEffect yalnız-okur; LanguageSwitcher `router.replace` butonu; FlowCanvas MutationObserver yerinde renk).
- **Tema:** light→toggle→dark (`html.dark`+`aria-pressed`false→true+`localStorage.theme=dark`+bg `rgb(247,246,241)`↔`rgb(19,21,16)`); **Living Flow uniform** canvas 1→1 `data-s4probe` korundu (remount YOK); reload **kalıcı**; **FOUC YOK** (early===final=dark, `.dark` body girmeden = pre-paint). **Dil path-koru:** home→`/de`, **`/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`** (Alpfit), `/crew-os`→`/en/crew-os`; menü Escape/dış-tık/klavye kapanış.
- **Klavye:** focus-visible **yeşil 2px solid** light `rgb(31,122,61)`+dark `rgb(79,176,106)` (`--color-green` flip; tema+dil+nav/CTA), odak kaybı yok (16/16 Tab, `<body>`'ye düşmedi). 3 harness artefaktı (chunk URL-encode→decode / FOUC observer-timing→`document` gözlemi / hex-parse) düzeltildi = gerçek bug değil.

**TASK-17.04** ✅ (S3 Living Flow degradasyon runtime — doğrulama, kaynak kod değişmedi)
- Runtime C (`page.route`+system Chrome WebGL); ayırt-edicilik sanity ✓ (WebGL2 probe has:true; home high FlowBackdrop fixed canvas=1). Ana sayfa mod matrisi hepsi ✓: light/dark **FOUC yok** (early===final), reduced/no-WebGL → StaticFlow canvas=0, **mobil-low nabız desktop-only** (canvasFixed=0/hero=1), AR-RTL×dark×reduced `lang=ar`+`dir=rtl`+dark+static çakışmasız.
- Taşma **6/6 overflowX=0** (home+alpfit 320/768/1440) + **CLS=0** iki sayfa (perf korunan taban CLS bileşeni teyit). Konsol: tek benign 404 `/script.js` (Umami offline, render'a etkisiz).
- **BULGU-S3** (kapsam-içi, regresyon DEĞİL): alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde canvas=0/StaticFlow=0 → yalnız base-wash (animasyonlu alan yok); kök neden `FlowBackdrop` yalnız ana sayfada mount; crew-os ile birebir → v0.4 regresyonu değil, Faz 12 deseni; degradasyon/a11y doğru → **craft nüansı, prd-review'a ertelendi** (kullanıcı: devam). **0 bloklayıcı bug.**

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-17.06** ⬜ Bekliyor (sıradaki `/devflow:run-task`; runtime C+A — S2 tam TR yolculuğu). TASK-17.01 ✅ (S1) · TASK-17.02 ✅ (S5+S6-render+Alpfit render) · TASK-17.03 ✅ (S8-suite+S6-parite) · TASK-17.04 ✅ (S3 degradasyon + BULGU-S3) · TASK-17.05 ✅ (S4 kontroller & kalıcılık, 22/22 PASS). 3 task ⬜ (TASK-17.06–17.08). **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu) · non-TR alpfit stale-TR (prd-review; 17.02/17.03'te yapısal parite teyitli, kopukluk yok) · **BULGU-S3** (17.04): alt-sayfa hero'ları `high` masaüstünde animasyonlu Living Flow yok (yalnız base-wash; crew-os ile birebir → regresyon değil, craft nüansı; **prd-review'a ertelendi**, kullanıcı: devam).
**Aktif Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (Adım: task, 5/8 task ✅). Doğrulama fazı: ana sayfa + 5 alt sayfa uçtan-uca (S1–S9 → 8 task), delta odağı **Alpfit Plus** + test-what's-live. Plan ✅ (plan-phase 17). Önceki **Faz 16 ✅** (v0.4 teknik borç + TR release). **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **senaryo_testi**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–16 ✅. Faz dokümanı: `phases/PHASE-17.md` (🔄); release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-18 — **run-task TASK-17.05 ✅ — S4 kontroller & kalıcılık GEÇTİ, 22/22 PASS, 0 kapsam-içi bug.** Runtime C: `tests/_verify-s4.mjs` (`page.route`+system Chrome 149 `channel:'chrome'`+swiftshader; taze `next build` 31 prerender HTML / 0 MISSING_MESSAGE HEAD hizası; koşuldu+silindi). Selector kaynaktan teyit (memory `runtime-harness-selector-teyidi`): ThemeToggle `<button aria-pressed>` → `html.dark`+`localStorage("theme")`+`themechange` (useEffect yalnız-**okur**, load'da class eklemez); LanguageSwitcher globe `<button aria-haspopup=listbox>` → `<button role=option>` → `router.replace(pathname,{locale})`; FOUC pre-paint `layout.tsx:75` blocking `<head>` script; FlowCanvas MutationObserver `html` class → renk **yerinde** (remount yok); FlowBackdrop page-level canvas yalnız `high` (home). Ayırt-edicilik sanity **GEÇTİ** (WebGL2 has:true; home high FlowBackdrop canvas=1 → hidratasyon çalışıyor). **Tema:** light varsayılan (`html.dark` yok/`aria-pressed=false`/bg `rgb(247,246,241)`) → toggle → dark (`html.dark`/`aria-pressed=true`/`localStorage.theme=dark`/bg `rgb(19,21,16)`); **Living Flow uniform** canvas 1→1 `data-s4probe` korundu = aynı element (remount YOK); reload **kalıcı**; **FOUC YOK** (`earlyDark===finalDark===dark`, `.dark` body DOM'a girmeden var = pre-paint). **Dil path-koru:** home→`/de`, **`/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`** (Alpfit path korunur, lang=en), `/crew-os`→`/en/crew-os`; menü Escape/dış-tık(mousedown)/klavye(Enter aç→Escape kapat) kapanış. **Klavye:** focus-visible **yeşil 2px solid** LIGHT `rgb(31,122,61)`+DARK `rgb(79,176,106)` (`--color-green` token flip; tema+dil+nav/CTA link), odak kaybı YOK (16/16 Tab öğesi, `activeElement` hiç `<body>`'ye düşmedi). `reducedMotion:'reduce'` (transition-colors yanlış-negatif tuzağı atlandı). Triyaj — 3 harness ölçüm artefaktı **gerçek bug değil**: (1) `app/[locale]/*` chunk URL-encode (`%5Blocale%5D`) → 404 → hidrasyon yok, fix `decodeURIComponent`; (2) FOUC MutationObserver `document.documentElement`-null document_start'ta → `document` childList gözlemine çevrildi; (3) `--color-green` hex `#1f7a3d` parse → hex→rgb. **Kaynak kod değişmedi** (doğrulama fazı); harness silindi (git temiz, `.next` gitignore). Fazlar 1–16 ✅, Faz 17 🔄 (Adım: task, 5/8 ✅). **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:run-task` → TASK-17.06** (yeni oturum).
