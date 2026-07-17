# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-18 — **run-task TASK-17.06 ✅ — S2 tam TR yolculuğu GEÇTİ, 21/22 çekirdek assertion PASS, 0 kapsam-içi bug** (1 harness artefaktı triyaj). Katmanlı A (prerender grep) + C (`page.route`+system Chrome, TR `NEXT_LOCALE=tr` cookie). Taze `next build` HEAD `32207b0`. **Ana sayfa:** bölüm sırası birebir `top>how>sectors>bunker>forum>chat>contact`, boş bölüm yok, Hero ikincil CTA `#sectors`, anchor settle rect.top=0. **Alpfit çıkışı:** `/spor-salonu-yazilimi` **SPA-nav** (marker korundu, full-reload yok) → tek `<main>`/9 bölüm/PhoneMockup 150×/0 `<img>`/0 MISSING/Logo/0 sızıntı; **dönüş** header back-link + tam-doküman back home restore. **Crew OS:** taze home'dan SPA-nav (`/bunker-os` sızıntı yok). Link hijyeni: çıkış href'leri mevcut, dead-`#`/`/tr/`/`/bunker-os`=0, Logo 12× üç sayfada. **BULGU-S2:** `history.back()`-after-SPA harness artefaktı (statik full-`.rsc` `page.route` uzlaşması, ürün bug'ı DEĞİL — probe+grep+gerçek-UI teyitli; memory'ye eklendi). Kaynak kod değişmedi; harness silindi. Fazlar 1–16 ✅, Faz 17 🔄 (Adım: **task**, 2 task kaldı). **v0.4 TR CANLI** (`main`=`f173234`). **Sıradaki: `/devflow:run-task` → TASK-17.07** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (discuss-phase 17 girdi, kapsam damgalandı). Doğrulama fazı — yeni feature üretilmez; ana sayfa + 5 alt sayfa uçtan-uca (S1–S9), delta odağı **Alpfit Plus ürün vitrini** (Faz 15) + test-what's-live (v0.4 canlıda `f173234`). Önceki faz **16 ✅** (v0.4 versiyon-sonu teknik borç + TR release). Fazlar 1–16 ✅.
**Adım:** **task** — TASK-17.06 ✅ (S2 tam TR yolculuğu runtime A+C: prerender grep + `page.route`+system Chrome, TR cookie; **21/22 çekirdek assertion PASS, 0 kapsam-içi bug**; ana sayfa bölüm bütünlüğü+anchor settle, Alpfit çıkış/dönüş SPA-nav+9 bölüm, Crew OS SPA-nav, link hijyeni+Logo tutarlılık; BULGU-S2 harness artefaktı). Fazda 2 task kaldı (17.07–17.08). Katman sırası A build-ground-truth (01-03 ✅) → C runtime `page.route`+system Chrome (04+05+06 ✅, 07) → adversarial+canlı duman (08). **Sıradaki: `/devflow:run-task` → TASK-17.07** (yeni oturum). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 gym PNG silme; versiyon-sonu finalizasyona, kapsam dışı; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu); (3) non-TR alpfit stale-TR (versiyon-sınırı → prd-review; 17.02/17.03'te yapısal parite teyit — görünür kopukluk yok); (4) **BULGU-S3** (17.04) — alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde animasyonlu Living Flow yok (yalnız base-wash; `FlowBackdrop` alt sayfalarda mount değil); crew-os ile birebir → v0.4 regresyonu değil, Faz 12 deseni; degradasyon/a11y doğru → craft nüansı, **prd-review'a ertelendi** (kullanıcı: devam; bu fazda fix task açılmadı — olası fix = alt sayfalara FlowBackdrop mount); (5) **BULGU-S2** (17.06) — runtime harness ölçüm artefaktı (`history.back()`-after-SPA statik full-`.rsc` `page.route` uzlaşması); ürün bug'ı DEĞİL, memory'ye eklendi, takip gerektirmez.
**İlerleme:** run-task TASK-17.06 (2026-07-18) — S2 tam TR yolculuğu geçti (runtime A+C; 21/22 PASS, 0 kapsam-içi bug; ana sayfa+Alpfit SPA çıkış/dönüş+Crew OS+link hijyeni+Logo); kaynak kod değişmedi. Sıradaki: run-task TASK-17.07.
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

**Task:** **TASK-17.07** ⬜ Bekliyor — sıradaki çalıştırılacak (S7 chatbot 0-token — A: kod-inceleme `route.ts` + C: offline UI; sanitizasyon role-whitelist+trim+slice(-12)+kısa-devre **hepsi `new Anthropic()` öncesi**; malformed kısa-devre; offline `#chat` inline sahte-online yok; **0 API çağrısı**). TASK-17.06 ✅ (S2 tam TR yolculuğu geçti, 21/22 PASS). 2 task ⬜ (TASK-17.07–17.08).
**Durum:** Fazlar 1–16 ✅, Faz 17 🔄 (senaryo testi, Adım: task — 17.01+17.02+17.03+17.04+17.05+17.06 ✅); Versiyon Sonu Durumu `senaryo_testi`. **v0.4 TR canlı** (`f173234`).
**İlerleme:** run-task TASK-17.06 (2026-07-18) — S2 tam TR yolculuğu geçti (runtime A+C; 21/22 PASS, 0 kapsam-içi bug; ana sayfa+Alpfit SPA çıkış/dönüş+Crew OS+link hijyeni+Logo). Sıradaki adım: run-task TASK-17.07.

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
| 17.06 | TASK-17.06 | ✅ Tamamlandı | S2 tam TR yolculuğu (Alpfit Plus çıkış/dönüş odak) (A+C) — geçti, 21/22 PASS, 0 bug; BULGU-S2 harness artefaktı |
| 17.07 | TASK-17.07 | ⬜ Bekliyor | S7 chatbot 0-token (offline+sanitizasyon; 0 API çağrısı) |
| 17.08 | TASK-17.08 | ⬜ Bekliyor | S9 adversarial/holistik + canlı duman (test-what's-live) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 16 kapandı (v0.4 versiyon-sonu teknik borç) → Faz 16 task özeti (TASK-16.01) PHASE-16'ya mezun edildi.**

**TASK-17.06** ✅ (S2 tam TR yolculuğu runtime A+C — doğrulama, kaynak kod değişmedi)
- Katmanlı A (prerender grep) + C (`page.route`+system Chrome 149, TR `NEXT_LOCALE=tr` cookie). Taze `next build` HEAD `32207b0` (31 HTML+31 `.rsc` flight → SPA-nav servis edilebildi). **21/22 çekirdek assertion PASS, 0 kapsam-içi bug.**
- **Ana sayfa:** bölüm sırası birebir `top>how>sectors>bunker>forum>chat>contact`, boş bölüm yok, Hero ikincil CTA `#sectors`, **anchor settle rect.top=0** (Lenis full-motion). **Alpfit çıkışı:** sektörlerden `/spor-salonu-yazilimi` **SPA-nav** (marker korundu, full-reload yok) → tek `<main>`/9 bölüm/PhoneMockup 150×/0 `<img>`/0 MISSING/Logo/0 sızıntı; **dönüş** header back-link + tam-doküman back home restore. **Crew OS:** taze home'dan SPA-nav (`/bunker-os` sızıntı yok). Link hijyeni: çıkış href'leri mevcut (spor 3×·crew 2×·vaka 1×·2 bülten 1×'er), dead-`#`/`/tr/`/`/bunker-os`=0, Logo 12× üç sayfada.
- **BULGU-S2 (harness artefaktı, ürün bug'ı DEĞİL):** `history.back()`-after-SPA URL'i çevirir ama `<main>` re-render etmez → statik full-`.rsc` `page.route` SPA-cache uzlaşması (prod partial-flight ıraksar); belirleyici probe (tam-doküman back home restore) + grep (özel history yok) + gerçek-UI R3 ile teyitli; memory'ye eklendi.

**TASK-17.05** ✅ (S4 kontroller & kalıcılık runtime — doğrulama, kaynak kod değişmedi)
- Runtime C (`page.route`+system Chrome); sanity ✓ (WebGL2 has:true; home high FlowBackdrop canvas=1). **22/22 PASS, 0 kapsam-içi bug.** Selector kaynaktan teyit (ThemeToggle `aria-pressed`+`localStorage("theme")`+useEffect yalnız-okur; LanguageSwitcher `router.replace` butonu; FlowCanvas MutationObserver yerinde renk).
- **Tema:** light→toggle→dark (`html.dark`+`aria-pressed`false→true+`localStorage.theme=dark`+bg `rgb(247,246,241)`↔`rgb(19,21,16)`); **Living Flow uniform** canvas 1→1 `data-s4probe` korundu (remount YOK); reload **kalıcı**; **FOUC YOK** (early===final=dark, `.dark` body girmeden = pre-paint). **Dil path-koru:** home→`/de`, **`/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`** (Alpfit), `/crew-os`→`/en/crew-os`; menü Escape/dış-tık/klavye kapanış.
- **Klavye:** focus-visible **yeşil 2px solid** light `rgb(31,122,61)`+dark `rgb(79,176,106)` (`--color-green` flip; tema+dil+nav/CTA), odak kaybı yok (16/16 Tab, `<body>`'ye düşmedi). 3 harness artefaktı (chunk URL-encode→decode / FOUC observer-timing→`document` gözlemi / hex-parse) düzeltildi = gerçek bug değil.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-17.07** ⬜ Bekliyor (sıradaki `/devflow:run-task`; A kod-inceleme + C offline UI — S7 chatbot 0-token). TASK-17.01 ✅ (S1) · TASK-17.02 ✅ (S5+S6-render+Alpfit render) · TASK-17.03 ✅ (S8-suite+S6-parite) · TASK-17.04 ✅ (S3 degradasyon + BULGU-S3) · TASK-17.05 ✅ (S4 kontroller & kalıcılık, 22/22 PASS) · TASK-17.06 ✅ (S2 tam TR yolculuğu, 21/22 PASS + BULGU-S2 harness artefaktı). 2 task ⬜ (TASK-17.07–17.08). **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu) · non-TR alpfit stale-TR (prd-review; 17.02/17.03'te yapısal parite teyitli, kopukluk yok) · **BULGU-S3** (17.04): alt-sayfa hero'ları `high` masaüstünde animasyonlu Living Flow yok (yalnız base-wash; crew-os ile birebir → regresyon değil, craft nüansı; **prd-review'a ertelendi**, kullanıcı: devam) · **BULGU-S2** (17.06): `history.back()`-after-SPA runtime harness ölçüm artefaktı (statik full-`.rsc` `page.route` uzlaşması); ürün bug'ı DEĞİL, memory'de, takip gerektirmez.
**Aktif Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (Adım: task, 6/8 task ✅). Doğrulama fazı: ana sayfa + 5 alt sayfa uçtan-uca (S1–S9 → 8 task), delta odağı **Alpfit Plus** + test-what's-live. Plan ✅ (plan-phase 17). Önceki **Faz 16 ✅** (v0.4 teknik borç + TR release). **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **senaryo_testi**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–16 ✅. Faz dokümanı: `phases/PHASE-17.md` (🔄); release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-18 — **run-task TASK-17.06 ✅ — S2 tam TR yolculuğu GEÇTİ, 21/22 çekirdek assertion PASS, 0 kapsam-içi bug** (1 harness ölçüm artefaktı triyaj). Katmanlı A (prerender grep) + C (`tests/_verify-s2.mjs` `page.route`+system Chrome 149 `channel:'chrome'`+swiftshader; TR `NEXT_LOCALE=tr` cookie; koşuldu+silindi). Taze `next build` HEAD `32207b0` BUILD_ID `htemC3E580EF…` (31 prerender HTML + 31 `.rsc` full-flight → RSC servis edilince ileri SPA-nav çalışır). Selector kaynaktan teyit (Hero/Sector/Bunker `<Link href>` next-intl SPA-nav; Logo ortak bileşen; PageHeader back `<Link href="/">`). Sanity **GEÇTİ** (canvas=1 mode=high → hidratasyon). **Ana sayfa (H0–H4):** bölüm sırası birebir `top>how>sectors>bunker>forum>chat>contact`, boş bölüm yok (≥20 char), Hero ikincil CTA `#sectors` (2 link), **anchor `#sectors` settle rect.top=0** (Lenis full-motion `anchors:true`, ilk denemede). **Alpfit çıkışı (A0–A8):** sektörlerden `/spor-salonu-yazilimi` 3 link, **SPA-nav marker `home-alive` korundu** (full-reload YOK), tek `<main>`, **9 bölüm** (8 `<section>`+roadmap), **PhoneMockup 150× / 0 `<img>`**, 0 MISSING, Logo "Kiwi AI Lab", `/tr/`+`/bunker-os` sızıntı 0. **Dönüş (R0/R3):** Alpfit header dönüş affordance'ı (Logo/geri → `/`, 3 link), **R3 header back-link → home tam restore** (SPA), tam-doküman browser-back → home tam restore (probe). **Crew OS (C0–C3):** taze home'dan `/crew-os` SPA-nav (marker korundu), `/bunker-os` URL sızıntı yok, tek `<main>`+Logo+"Crew OS". Link hijyeni (grep): çıkış href'leri mevcut (`/spor-salonu-yazilimi` 3× · `/crew-os` 2× · `/vaka-calismalari` 1× · 2 bülten 1×'er), `/bunker-os` 0 · dead-`#` 0 · `/tr/` 0; Logo 12× home/alpfit/crew birebir; MISSING 0/6 TR. **BULGU-S2 (harness artefaktı, ürün bug'ı DEĞİL):** ilk koşuda R1 (`history.back()`-after-SPA) URL'i `/`'a çevirdi ama `<main>` Alpfit içeriğini gösterdi (re-render yok). Triyaj (kör-onay/red yok): (1) kodda özel `popstate`/`history.back`/`beforePopState` override YOK (grep=0, app-router standardı); (2) gerçek UI dönüş R3 home'u restore etti; (3) belirleyici probe — Alpfit tam-doküman yükleyip `goBack()` → home tam restore → browser-back mekaniği SAĞLAM. Kök neden: `page.route` statik **full** `.rsc` servis ediyor; prod'da server `Next-Router-State-Tree` ile **partial** flight → router home ağacını cache'te tutar. Runtime harness ölçüm artefaktı; [sandbox-runtime-browser-page-route](memory/sandbox-runtime-browser-page-route.md)'e eklendi. **Kaynak kod değişmedi** (doğrulama fazı); harness silindi (git temiz, `.next` gitignore). Fazlar 1–16 ✅, Faz 17 🔄 (Adım: task, 6/8 ✅). **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:run-task` → TASK-17.07** (yeni oturum).
