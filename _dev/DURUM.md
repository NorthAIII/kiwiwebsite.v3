# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-05 — **run-task TASK-14.08 ✅: S7 chatbot 0-token doğrulandı.** `next start`/`test:e2e` bu oturumda exit 144 (cloud-devcontainer sandbox) → build-ground-truth fallback: Vitest node+jsdom + `@anthropic-ai/sdk` mock (0-token mock seviyesinde garantili). **13/13 PASS, kapsam-içi bug YOK, toplam gerçek API çağrısı=0.** Sanitizasyon sırası route.ts:21-46 hepsi `new Anthropic()` (:48) ÖNCESİNDE ✓; malformed 6× 400 (mock hiç çağrılmadı); geçerli→200 mock çağrıldı (gerçek asla); offline UI dürüst çevrimdışı + sahte-dot YOK + takılmaz. Sahipli: per-mesaj max-byte cap yok → prd-review. Kaynak değişmedi. Sıradaki adım **`run-task`** → TASK-14.09 (son task).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (TASK-14.01→14.08 ✅ tamamlandı; fazda **yalnız 14.09 bekliyor** → sıradaki = `run-task` TASK-14.09, son task). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** run-task TASK-14.08 (2026-07-05) ✅ — S7 chatbot 0-token. **`next start`/`test:e2e` bu oturumda exit 144 ile anında öldü** (cloud-devcontainer sandbox worker-fork; Faz 13 riski aktif) → tarayıcı-server katmanı koşulamadı → PHASE-14 **build-ground-truth fallback**: Vitest (projenin gerçek test aracı, ortam-bağımsız) + `@anthropic-ai/sdk` mock (0-token mock seviyesinde garantili). **13/13 PASS (11 route node + 2 UI jsdom), kapsam-içi bug YOK, toplam gerçek Anthropic API çağrısı = 0** (gerçek key hiç kullanılmadı + SDK mock). Kod-inceleme: sanitizasyon sırası route.ts:21-24 apiKey-gate→503 · :26-32 parse→400 · :35-42 rol whitelist+trim+`slice(-12)` · :44-46 sonda-user→400 · :48 `new Anthropic()` — **hepsi Anthropic kurulumu ÖNCESİNDE ✓**. Route (SDK mock): key-yok→503 (mock hiç kurulmadı); geçersiz-JSON/boş-`[]`/`messages`-yok/rol-enjeksiyonu-system/sonda-user-yok/whitespace → 6× 400 (Anthropic öncesi red); geçerli→200 mock çağrıldı (gerçek asla), gömülü system+tool sıyrıldı, 15→slice(-12); aşırı-uzun→200 (max-byte cap YOK). Offline UI (gerçek `<Chatbot>` `#chat` inline, 503): dürüst çevrimdışı metni + **sahte online-dot/presence YOK** (`/online/i`+`●` yok) + UI takılmaz (streaming reset, input etkin) + 200-stream hiç. Harness (`tests/_verify-s7-*`) silindi → git temiz. Kaynak değişmedi. **Kayıtlı sahipli açıklar (gelecek/prd-review):** chatbot per-mesaj max-byte cap yok (güvenlik-hardening), TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam + Araştırma + Task Listesi yazıldı; TASK-14.01→14.08 ✅, yalnız 14.09 bekliyor). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-14.09** (S9 adversarial/holistik — JS-off SSG, toggle race, scroll storm + nabız/ScrollTrigger, build temiz + 0 MISSING; `next build` A + system Chrome race C) — aktif, ⬜ bekliyor. **Son task.** Sıradaki adım **`run-task`** (yeni oturum). TASK-14.01→14.08 ✅ tamamlandı+arşivlendi.
**Durum:** Faz 14 🔄 (Kapsam + Araştırma + Task Listesi + plan review yazıldı; 14.01→14.08 ✅); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Adım = task.
**İlerleme:** run-task TASK-14.08 (2026-07-05) ✅ — S7 chatbot 0-token: `next start` exit 144 → build-ground-truth fallback (Vitest node+jsdom + SDK mock). 13/13 PASS, kapsam-içi bug yok, **toplam gerçek API çağrısı=0**. Sanitizasyon route.ts:21-46 hepsi `new Anthropic()` (:48) öncesi ✓; malformed 6× 400 (mock hiç çağrılmadı); geçerli→200 mock (gerçek asla); offline UI dürüst çevrimdışı + sahte-dot YOK + takılmaz. Sahipli: per-mesaj max-byte cap yok → prd-review. Kaynak değişmedi. Sıradaki = `run-task` → TASK-14.09 (son task).

---

## Task Durumu (Aktif Faz)

> **Faz 14 🔄** — senaryo testi fazı; 9 task (S1–S9 → 14.01–14.09). Detay tablo + araç eşlemesi `phases/PHASE-14.md`. TASK-14.01→14.08 ✅; TASK-14.09 aktif (son task, sıradaki `run-task`). Faz 4–13 ✅.

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
| 14.09 | TASK-14.09 | 🔄 Aktif (bekliyor) | S9 adversarial/holistik (JS-off SSG, toggle race, scroll storm + nabız/ScrollTrigger, build temiz) — **son task** |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`).

**TASK-14.08 — S7 Chatbot 0-token (offline + sanitizasyon + malformed)** ✅ (2026-07-05)
- **13/13 PASS (11 route node + 2 UI jsdom), kapsam-içi bug YOK, toplam gerçek Anthropic API çağrısı = 0** (gerçek key hiç kullanılmadı + `@anthropic-ai/sdk` mock). **`next start`/`test:e2e` bu oturumda exit 144** (cloud-devcontainer sandbox worker-fork; Faz 13 riski aktif) → PHASE-14 **build-ground-truth fallback**: Vitest (projenin gerçek test aracı, ortam-bağımsız).
- **Sanitizasyon sırası (kod-inceleme):** route.ts:21-24 apiKey-gate→503 · :26-32 parse→400 · :35-42 rol whitelist+trim+`slice(-12)` · :44-46 sonda-user→400 · :48 `new Anthropic()` — **hepsi Anthropic kurulumu ÖNCESİNDE ✓**. Route (SDK mock): key-yok→503 (mock hiç kurulmadı); malformed 6× 400 (geçersiz-JSON/boş/`messages`-yok/rol-enjeksiyonu/sonda-user-yok/whitespace, Anthropic öncesi red); geçerli→200 mock çağrıldı (gerçek asla), gömülü system+tool sıyrıldı, 15→slice(-12). Offline UI (gerçek `<Chatbot>` `#chat` inline, 503): dürüst çevrimdışı metni + **sahte online-dot/presence YOK** + UI takılmaz + 200-stream hiç.
- **Kaynak değişmedi** (doğrulama fazı, harness `tests/_verify-s7-*` silindi). Sahipli (record-not-fix): per-mesaj max-byte uzunluk cap'i yok (min-length + geçmiş-sayısı var) → güvenlik-hardening adayı → prd-review.

**TASK-14.07 — S2 Tam TR Yolculuğu (ana sayfa → alt sayfalar)** ✅ (2026-07-05)
- **15/15 senaryo PASS, kapsam-içi bug YOK** (system Chrome `channel:'chrome'`+swiftshader, cookie `NEXT_LOCALE=tr`): bölüm sırası `top>how>sectors>bunker>forum>contact` birebir + boş bölüm yok (metin 335-819 char); anchor settle Lenis **ilk-denemede** (#how/#sectors/#bunker/#forum top≈8-11px nav-offset, #contact footer sayfa-sonu görünür top=692) — artefakt görülmedi.
- **Çıkış & taksonomi:** 5 çıkış href mevcut (`/crew-os`+`/spor-salonu-yazilimi`+`/vaka-calismalari`+2 bülten) + **`/bunker-os` href sızıntısı YOK (v0.3 kritik ✓, Faz 11 iç link temizliği tuttu)** + `/tr/`-sızıntı/dead-# YOK (19 href) + `/crew-os` doğrudan 200; 4 alt sayfa client-nav **SPA-marker survive** (next-intl `<Link>`, full-reload yok) → tek `<main>`/0 MISSING_MESSAGE/textLen 1160-2764 → **history-back → ana sayfa sağlam** her turda; `<Logo>` home+`/crew-os`+`/spor-salonu-yazilimi` header'da tutarlı (ortak bileşen).
- **Kaynak değişmedi** (doğrulama fazı, harness scratchpad commit'lenmez).


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-14.09** 🔄 aktif (S9 adversarial/holistik — JS-off SSG, toggle race, scroll storm + nabız/ScrollTrigger, `next build` temiz + 0 MISSING; **son task**). TASK-14.08 ✅ (S7 chatbot 0-token — `next start` exit 144 → build-ground-truth fallback Vitest node+jsdom + SDK mock; 13/13 PASS, bug yok, **toplam gerçek API çağrısı=0**: sanitizasyon route.ts:21-46 hepsi `new Anthropic()` (:48) öncesi ✓; malformed 6× 400 mock-hiç-çağrılmadı; geçerli→200 mock (gerçek asla); offline UI dürüst çevrimdışı + sahte-dot YOK + takılmaz; sahipli: per-mesaj max-byte cap yok → prd-review). TASK-14.07 ✅ (S2 tam TR yolculuğu — 15/15 PASS: bölüm sırası birebir; anchor Lenis ilk-denemede settle; 5 çıkış href + `/bunker-os` sızıntı YOK ✓ + `/tr/`/dead-# YOK; 4 alt sayfa SPA survive → history-back sağlam; `<Logo>` tutarlı). Sıradaki adım **`run-task`** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). Planlama ✅ + plan review ✅: 9 task (build-ground-truth önce → runtime → adversarial); doğrulama fazı, kaynak değişmez. **TASK-14.01 ✅** (S1 giriş/redirect matrisi) · **TASK-14.02 ✅** (S5 taksonomi + S6-render) · **TASK-14.03 ✅** (S8-suite + S6-parite) · **TASK-14.04 ✅** (S8-Lighthouse çift-tema a11y=100 + perf tabanı) · **TASK-14.05 ✅** (S3 sayfa-boyu nabız degradasyonu — EN BÜYÜK v0.3 delta, 9/9 PASS) · **TASK-14.06 ✅** (S4 kontroller & kalıcılık — tema/dil/klavye, 10/10 PASS) · **TASK-14.07 ✅** (S2 tam TR yolculuğu, 15/15 PASS) · **TASK-14.08 ✅** (S7 chatbot 0-token — build-ground-truth fallback, 13/13 PASS, gerçek API çağrısı=0). **Faz 13 ✅** — SEO-metadata hijyeni. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `run-task` (TASK-14.09, son task).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-05 — **run-task TASK-14.08 ✅: S7 chatbot 0-token doğrulandı** (kaynak DEĞİŞMEDİ, doğrulama fazı; yalnız `_dev/` — TASK-14.08 arşive, PHASE-14 Task Listesi 14.08 ✅ + bulgu notu + footer temizliği (eski kümülatif "Son Güncelleme" yığını buda), DURUM). **`next start`/`test:e2e` bu oturumda exit 144 ile anında öldü** (log boş, port hiç açılmıyor — cloud-devcontainer sandbox worker-fork; Faz 13 riski bu oturumda aktif) → tarayıcı-server katmanı koşulamadı → PHASE-14 araştırmasının **build-ground-truth fallback** direktifi: taze `next build` temiz + Vitest (projenin gerçek test aracı, ortam-bağımsız) + `@anthropic-ai/sdk` mock (0-token mock seviyesinde garantili; gerçek key hiç kullanılmadı). **13/13 PASS (11 route node + 2 UI jsdom), kapsam-içi bug YOK, toplam gerçek Anthropic API çağrısı = 0.** Kod-inceleme: sanitizasyon sırası route.ts:21-24 apiKey-gate→503 · :26-32 parse→400 · :35-42 rol whitelist (`user`/`assistant`)+content-string+`trim>0`+`.slice(-12)` geçmiş sınırı · :44-46 sonda-user teyidi→400 · :48 `new Anthropic()` — **tüm sanitizasyon Anthropic kurulumu ÖNCESİNDE ✓**. Route (SDK mock): key-yok→503 (mock hiç kurulmadı); geçersiz-JSON/boş-`[]`/`messages`-yok/rol-enjeksiyonu-system/sonda-user-yok/whitespace-content → 6× 400 (mock hiç çağrılmadı, Anthropic öncesi red); geçerli-user→200 + `AnthropicMock({apiKey})` çağrıldı (gerçek SDK asla); gömülü `system`+`tool` roller sıyrıldı yalnız temiz user gitti; 15 mesaj→`slice(-12)`=12; aşırı-uzun content→200 (per-mesaj max-byte cap YOK). Offline UI (gerçek `<Chatbot>` `#chat` inline section, `Reveal` passthrough-mock — GSAP jsdom'da matchMedia gerektirir, umami `next/script` mock deseni; `fetch` 503): dürüst çevrimdışı metni (`chat.error` "…çevrimdışı…") + **sahte online-dot/presence YOK** (`/online/i`+`●` render'da yok) + UI takılmaz (streaming reset, input yeniden etkin) + `/api/chat` 1× çağrıldı; 2 deneme ikisi de 503 → 200-stream hiç. Harness iki dosya (`tests/_verify-s7-*.test.{ts,tsx}`) koşu sonrası silindi → git temiz, kaynak değişmedi. **Sahipli (record-not-fix):** route'ta per-mesaj max-byte uzunluk cap'i yok ("uzunluk" = min-length reject-empty + geçmiş-sayısı `slice(-12)`, max-byte değil) → güvenlik-hardening adayı, 0-token kapsamı dışı + bloklayıcı değil → prd-review. **Sıradaki DevFlow komutu: `run-task` (TASK-14.09, S9 adversarial/holistik — son task).**
