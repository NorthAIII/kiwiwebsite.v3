# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-05 — **verify-phase 14 ✅: UAT 11/11 GEÇTİ, kapsam-içi bug YOK → faz review'a hazır.** Otomatik kontroller: CI HEAD run 28727534357 `fast`+`a11y` **success** · security-review **bulgu YOK** (kaynak Faz 13'ten değişmedi) · Dependabot/Renovate yok. Bu oturum deterministik re-teyit: taze `next build` 37/37 SSG temiz + **0 MISSING_MESSAGE** + Vitest **39/39** + routes-manifest 7 redirect 308 + "Crew OS" 5-dil var/görünür "Bunker OS" 0 + AR rtl. Runtime WebGL (S2/S3/S4/S9-race) task 14.05–14.09 kanıtı + CI yeşili roll-up (kaynak değişmedi). Düzeltme task'ı gerekmedi; sahipli kalemler prd-review B'ye. **Adım = review.** Sıradaki komut: **`review-phase 14`**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** **review** (TASK-14.01→14.09 ✅ + **verify-phase 14 ✅ UAT 11/11 GEÇTİ** → sıradaki = `review-phase 14`, faz review & retrospektif). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** verify-phase 14 (2026-07-05) ✅ — **UAT 11/11 GEÇTİ (S1–S9 + 2 milestone-çapraz), kapsam-içi bug YOK, düzeltme task'ı gerekmedi.** Otomatik kontroller: CI HEAD run 28727534357 `fast`+`a11y` **success** · security-review bulgu YOK (kaynak Faz 13'ten değişmedi; tek `dangerouslySetInnerHTML` statik FOUC tema-script) · Dependabot/Renovate yok. Bu oturum deterministik re-teyit taze: `next build` 37/37 SSG temiz + **0 MISSING_MESSAGE** (build log + 31 prerender) + Vitest **39/39** + routes-manifest 7 redirect 308 doğru + "Crew OS" 5-dil (home 15×/crew-os 14×) / görünür "Bunker OS" **31 dosyada 0** + AR `dir=rtl`. Runtime WebGL (S2 15/15 · S3 9/9 · S4 10/10 · S9 12/12+6/6) task 14.05–14.09 system Chrome kanıtı + CI yeşili roll-up. **Kayıtlı sahipli açıklar (prd-review B, senaryo testte yeniden litige edilmedi):** brief mobil perf (CPU-bound WebGL gerçek-cihaz duvarı), chatbot per-mesaj max-byte cap yok, non-TR ar/de/es stale (bilinçli, görünür kopukluk yok), TB-3/4/5.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam + Araştırma + Task Listesi + **UAT 11/11 ✅** yazıldı; **TASK-14.01→14.09 ✅ + verify-phase ✅**, sıradaki review-phase). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **Fazdaki tüm task'lar tamamlandı (TASK-14.01→14.09 ✅) + verify-phase 14 ✅ (UAT 11/11 GEÇTİ).** Aktif task YOK, düzeltme task'ı gerekmedi (kapsam-içi bug 0). Sıradaki adım **`review-phase 14`** (faz review & retrospektif, yeni oturum).
**Durum:** Faz 14 🔄 (Kapsam + Araştırma + Task Listesi + plan review + **UAT 11/11 ✅** yazıldı; 14.01→14.09 ✅ + verify-phase ✅); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. **Adım = review.**
**İlerleme:** verify-phase 14 (2026-07-05) ✅ — **UAT 11/11 GEÇTİ, kapsam-içi bug YOK.** Otomatik: CI HEAD `fast`+`a11y` success · security-review bulgu YOK · Dependabot yok. Deterministik re-teyit taze: build 37/37 SSG + 0 MISSING + Vitest 39/39 + redirect matrisi + taksonomi (Crew OS var/Bunker 0). Runtime WebGL task 14.05–14.09 kanıtı + CI yeşili roll-up. Sıradaki = `review-phase 14`.

---

## Task Durumu (Aktif Faz)

> **Faz 14 🔄** — senaryo testi fazı; 9 task (S1–S9 → 14.01–14.09). Detay tablo + araç eşlemesi `phases/PHASE-14.md`. **TASK-14.01→14.09 ✅ + verify-phase 14 ✅ (UAT 11/11)** (sıradaki `review-phase 14`). Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 14.01 | TASK-14.01 | ✅ Tamamlandı | S1 giriş/redirect matrisi (curl; `/crew-os` public, `/bunker-os`→308, `/forum`→`/`) + kanonik prod-serve — **30/30 route 200, redirect'ler 308 doğru, bug yok** |
| 14.02 | TASK-14.02 | ✅ Tamamlandı | S5+S6-render prerender grep — **"Crew OS" 5 dil var, "Bunker" görünür 0 (yalnız `#bunker` kod-adı), 0 MISSING_MESSAGE, namespace crew senkron, AR-RTL, bug yok; ar/de/es 4 alt sayfa İngilizce-stale (record-not-fix)** |
| 14.03 | TASK-14.03 | ✅ Tamamlandı | S8-suite+S6-parite — **Vitest 39/39 + `test:e2e` 52 passed (WCAG-AA 0 ihlal) + CI fast+a11y success; kapsam-içi bug yok** |
| 14.04 | TASK-14.04 | ✅ Tamamlandı | S8-Lighthouse a11y=100 çift-tema + Living Flow perf tabanı — **LH dark 6/6 a11y=100 + axe light+dark 12/12 koşu 0 ihlal; masaüstü perf 100/LCP 624ms/CLS 0 Faz-12 birebir; mobil LCP ~3010ms ≤ taban regresyonsuz; bug yok** |
| 14.05 | TASK-14.05 | ✅ Tamamlandı | S3 mod komb./sayfa-boyu nabız (system Chrome WebGL2 — EN BÜYÜK v0.3 delta) — **9/9 PASS, bug YOK; high→pageLevel canvas=1+FOUC yok; reduced→canvas=0 tüm sayfa; no-WebGL→static; mobil-low→pageLevel=0 (nabız desktop-only); AR-RTL×dark×reduced ok; overflowX=0+CLS=0; craft veil ok** |
| 14.06 | TASK-14.06 | ✅ Tamamlandı | S4 kontroller & kalıcılık (system Chrome WebGL2) — **10/10 PASS, bug YOK; tema toggle html.dark+localStorage+bg flip, reload kalıcı+FOUC yok (early===final); Living Flow uniform sayfa-boyu remount YOK; dil-switcher path korur `/crew-os`→`/en/crew-os` (eski `/bunker-os` değil ✓); menü kapanış Escape/dış-tık/klavye; focus-visible yeşil outline light+dark 12/12, odak kaybı yok** |
| 14.07 | TASK-14.07 | ✅ Tamamlandı | S2 tam TR yolculuğu (system Chrome, cookie tr) — **15/15 PASS, bug YOK; bölüm sırası birebir + boş bölüm yok; anchor Lenis ilk-denemede settle; 5 çıkış href + `/bunker-os` sızıntı YOK (v0.3 kritik ✓) + `/tr/`/dead-# YOK + `/crew-os` doğrudan 200; 4 alt sayfa client-nav SPA-marker survive → tek `<main>`/0 MISSING → history-back ana sayfa sağlam; `<Logo>` tutarlı** |
| 14.08 | TASK-14.08 | ✅ Tamamlandı | S7 chatbot 0-token (kod-inceleme + Vitest node+jsdom; `next start` exit 144 → build-ground-truth fallback) — **13/13 PASS, bug YOK, toplam gerçek API çağrısı=0**; sanitizasyon route.ts:21-46 hepsi `new Anthropic()` (:48) öncesi ✓; malformed 6× 400; offline UI dürüst çevrimdışı + sahte-dot YOK + takılmaz. Sahipli: per-mesaj max-byte cap yok → prd-review |
| 14.09 | TASK-14.09 | ✅ Tamamlandı | S9 adversarial/holistik — **12/12 runtime + 6/6 JS-off + build temiz, kapsam-içi bug YOK**; build 37/37 SSG 0 warn + 30 page-locale 0 MISSING + Vitest 39/39; JS-off 6 sayfa okunur (canvas=0 beklenen); tema 11-tık race final-tutarlı + reload kalıcı; dil zinciri en→de→ar→es→tr tutarlı; scroll storm → 6 bölüm sağlam + nabız canvas 1→1 tek WebGL context + 0 ScrollTrigger hatası. Ortam: exit 144 → tek-process `page.route` interception system Chrome WebGL2 |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`).

**TASK-14.09 — S9 Adversarial / Holistik Kırma (fazın son task'ı)** ✅ (2026-07-05)
- **12/12 runtime + 6/6 JS-off + build temiz, kapsam-içi bug YOK.** `next build` 37/37 SSG 0 warn + 30 page-locale 0 MISSING_MESSAGE + Vitest 39/39 (canonical/redirect tohumu yeşil); JS-off 6 TR sayfa okunur (h1=1+nav+main+metin 1278–4016, canvas=0 beklenen client-only); tema **11-tık race** final-tutarlı (html.dark=true==localStorage(`theme`=dark)==aria-pressed=true) + reload kalıcı; dil zinciri en→de→ar→es→tr 5/5 tutarlı (lang==url, AR dir=rtl); scroll/anchor storm → 6 bölüm sağlam + **nabız canvas 1→1 tek shared WebGL context** + anchor #contact settle + scroll-lock yok + **0 ScrollTrigger/GSAP/Lenis hatası**.
- **Ortam engeli & çözümü:** `next start`/`next dev` 3 başlatma yöntemiyle de exit 144 + backgrounded-server+Chrome kombinasyonu da signal-16 (144) → **tek-process Playwright `page.route` interception** (diskten `.next` prerender+static byte-for-byte servis) → system Chrome (`channel:'chrome'`+swiftshader) WebGL2 kararlı (FlowBackdrop canvas=1, false-static değil). Build-ground-truth'a mecburi düşüş YOK. Harness artefaktı (bug değil): `/script.js` (Umami dış) + `/icon.svg` (app-router route) 404.
- **Kaynak değişmedi** (harness `tests/_verify-s9-*` silindi → git temiz). **Bütünsel S1–S9 kapsam-içi bug sıfır → verify-phase 14'e hazır.** S9'da yeni sahipli kalem çıkmadı (mevcutlar prd-review B grubunda).

**TASK-14.08 — S7 Chatbot 0-token (offline + sanitizasyon + malformed)** ✅ (2026-07-05)
- **13/13 PASS (11 route node + 2 UI jsdom), kapsam-içi bug YOK, toplam gerçek Anthropic API çağrısı = 0** (gerçek key hiç kullanılmadı + `@anthropic-ai/sdk` mock). **`next start`/`test:e2e` bu oturumda exit 144** (cloud-devcontainer sandbox worker-fork) → PHASE-14 **build-ground-truth fallback**: Vitest (ortam-bağımsız).
- **Sanitizasyon sırası (kod-inceleme):** route.ts:21-24 apiKey-gate→503 · :26-32 parse→400 · :35-42 rol whitelist+trim+`slice(-12)` · :44-46 sonda-user→400 · :48 `new Anthropic()` — **hepsi Anthropic kurulumu ÖNCESİNDE ✓**. Route (SDK mock): key-yok→503 (mock hiç kurulmadı); malformed 6× 400 (Anthropic öncesi red); geçerli→200 mock çağrıldı (gerçek asla), 15→slice(-12). Offline UI (`#chat` inline, 503): dürüst çevrimdışı metni + **sahte online-dot/presence YOK** + UI takılmaz + 200-stream hiç.
- **Kaynak değişmedi** (harness `tests/_verify-s7-*` silindi). Sahipli: per-mesaj max-byte uzunluk cap'i yok (min-length + geçmiş-sayısı var) → güvenlik-hardening → prd-review.


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **YOK — TASK-14.01→14.09 ✅ + verify-phase 14 ✅ (UAT 11/11 GEÇTİ, kapsam-içi bug 0).** Sıradaki adım **`review-phase 14`** (faz review & retrospektif, yeni oturum). TASK-14.09 ✅ (S9 adversarial/holistik — 12/12 runtime + 6/6 JS-off + build temiz, bug YOK: build 37/37 SSG 0 warn + 30 page-locale 0 MISSING + Vitest 39/39; JS-off 6 sayfa okunur canvas=0 beklenen; tema 11-tık race final-tutarlı + reload kalıcı; dil zinciri en→de→ar→es→tr tutarlı; scroll storm → 6 bölüm sağlam + nabız canvas 1→1 tek WebGL context + 0 ScrollTrigger hatası; ortam `next start`/`dev`+bg-server+Chrome exit 144 → tek-process `page.route` interception system Chrome WebGL2 kararlı). TASK-14.08 ✅ (S7 chatbot 0-token — build-ground-truth fallback Vitest+SDK mock; 13/13 PASS, **gerçek API çağrısı=0**; sanitizasyon hepsi `new Anthropic()` öncesi ✓; offline UI dürüst + sahte-dot YOK; sahipli per-mesaj max-byte cap yok → prd-review). Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). Planlama ✅ + plan review ✅: 9 task; doğrulama fazı, kaynak değişmez. **TASK-14.01→14.09 ✅ HEPSİ TAMAMLANDI** — S1 giriş/redirect matrisi · S5 taksonomi+S6-render · S8-suite+S6-parite · S8-Lighthouse çift-tema a11y=100+perf tabanı · S3 sayfa-boyu nabız degradasyonu (9/9) · S4 kontroller&kalıcılık (10/10) · S2 tam TR yolculuğu (15/15) · S7 chatbot 0-token (13/13, API çağrısı=0) · S9 adversarial/holistik (12/12 runtime+6/6 JS-off). **Bütünsel S1–S9 kapsam-içi bug sıfır + verify-phase 14 ✅ UAT 11/11 GEÇTİ.** **Faz 13 ✅** — SEO-metadata hijyeni. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut **`review-phase 14`** (faz review & retrospektif).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-05 — **verify-phase 14 ✅: UAT 11/11 GEÇTİ, kapsam-içi bug YOK, düzeltme task'ı gerekmedi → faz review'a hazır** (kaynak DEĞİŞMEDİ, doğrulama fazı; yalnız `_dev/` — PHASE-14 UAT Sonuçları 11/11 + otomatik-kontrol bulguları + footer, DURUM). **Otomatik kontroller:** CI HEAD run 28727534357 `fast`+`a11y` **success** · security-review v0.3 branch-diff tarandı **HIGH/MEDIUM bulgu YOK** (kaynak Faz 13'ten değişmedi; tek `dangerouslySetInnerHTML` layout.tsx:77 statik FOUC tema-script, kullanıcı girdisi yok; redirect kaynakları statik literal; `/api/chat` bu fazda değişmedi) · Dependabot/Renovate yok. **Bu oturum deterministik re-teyit (taze):** `next build` 37/37 SSG temiz + **0 MISSING_MESSAGE** (build log + 31 prerender) + Vitest **39/39** (parite + seo-metadata 16 + seo-redirects 16 + smoke + umami) + `routes-manifest.json` 7 redirect 308 doğru hedef+5-locale twin + "Crew OS" 5-dil (home 15×/crew-os 14×) / görünür "Bunker OS" **31 dosyada 0** + AR `dir=rtl`+`lang=ar`. **Runtime WebGL senaryoları roll-up** (kaynak değişmedi → task-kanıtı + CI yeşili): S2 TR yolculuğu 15/15 · S3 sayfa-boyu nabız 9/9 · S4 kontroller 10/10 · S7 chatbot 13/13 (API çağrısı=0) · S9 12/12 runtime+6/6 JS-off (task 14.05–14.09, system Chrome). **Sahipli kalemler (prd-review B, yeniden litige edilmedi):** brief mobil perf (CPU-bound WebGL gerçek-cihaz duvarı), chatbot per-mesaj max-byte cap yok, non-TR ar/de/es stale (bilinçli), TB-3/4/5. **Bütünsel: S1–S9 + 2 milestone-çapraz tümü ✅ kapsam-içi bug sıfır → review-phase 14'e hazır. Sıradaki DevFlow komutu: `review-phase 14`.**
