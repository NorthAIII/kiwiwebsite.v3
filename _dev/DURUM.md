# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-05 — **🚀 v0.3 CANLIYA ALINDI + prd-review (v0.3) ✅.** `revize/devflow-kurulum`→`main` merge (`2ea09b7`) + Vercel deploy `success`; canlı duman testi ✅ (`/crew-os` 200, `/bunker-os`+`/en/bunker-os`→`/crew-os` 308, `/forum`→`/` 308, home/en/ar/alpfit/vaka/sitemap 200, "Crew OS" 14× / "Bunker OS" görünür 0×, fresh age=24). prd-review: vizyon değişikliği yok, yalnız PRD drift hizalaması (VIZYON §3 kapatıldı, crew-os feature `bunker`→`crew`, VERSIONS v0.3 "Tamamlanan ✅", SESSION-NOTES güncellendi). **Versiyon Sonu Durumu `içerik_fazları`** (re-kickoff'ta yeni versiyon). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env AYARLI DEĞİL** (`/api/chat` 503; chatbot canlıda "offline" — zarif düşüş, regresyon değil; Vercel env'e eklenince açılır). Sahipli B-grubu → SESSION-NOTES sonraki-versiyon adayı. Sıradaki: `/devflow:kickoff` (re-kickoff → yeni versiyon) — istenirse.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** — **YOK (faz döngüsü dışı).** v0.3 versiyon-sonu fazları (13+14) + **prd-review ✅** tamam. **Faz 14 ✅** (S1–S9 uçtan-uca, UAT 11/11). **Faz 13 ✅** (SEO-metadata hijyeni). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** — **YOK (faz döngüsü dışı).** prd-review (v0.3) ✅ + **🚀 v0.3 production release ✅ (2026-07-05)** — `main` merge `2ea09b7`, Vercel deploy `success`, canlı duman testi ✅. v0.2 release ✅ (2026-07-02, `a71adbc`). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır). Sıradaki: `/devflow:kickoff` (re-kickoff → yeni versiyon), istenirse.
**İlerleme:** review-phase 14 (2026-07-05) ✅ — **Faz 14 TAMAMLANDI.** Retrospektif + kalite kontrol (8 eksen ✅) + sonuç PHASE-14.md'ye yazıldı; UAT 11/11 GEÇTİ (S1–S9 + 2 milestone-çapraz), kapsam-içi bug 0, **0 kaynak değişimi**, 0 düzeltme task'ı. v0.3 iki çapraz delta (route rename + sayfa-boyu nabız) bütünsel doğrulandı; guardrail'ler (a11y=100 çift-tema, SEO metadata, nabız imzası, perf taban, i18n parite, CI) regresyonsuz. **Kayıtlı sahipli açıklar → prd-review B:** brief mobil perf (CPU-bound WebGL), chatbot per-mesaj max-byte cap yok, non-TR ar/de/es stale (bilinçli), AR-dil stratejisi, TB-3/4/5.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (✅ Tamamlandı — Kapsam + Araştırma + Task Listesi + UAT 11/11 + **Retrospektif + Kalite Kontrol + Sonuç** yazıldı). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları (prd-review 2026-07-05 ✅ sıfırladı; yeni Aktif Versiyon re-kickoff'ta belirlenir)

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **YOK — v0.3 fazları + prd-review ✅ tamamlandı, faz döngüsü dışı.** Sıradaki: kullanıcı kararı — v0.3 **production release** (canlıya alma; ayrı operasyonel oturum) ve/veya **`/devflow:kickoff`** (re-kickoff → yeni versiyon tanımı).
**Durum:** Faz 14 ✅ + **prd-review (v0.3) ✅** (PRD drift hizalaması, vizyon değişikliği yok); Versiyon Sonu Durumu = `içerik_fazları` (sıfırlandı); Aktif Versiyon v0.3 (re-kickoff'ta yenilenir). **Aktif Faz/Adım boşaltıldı.**
**İlerleme:** prd-review (2026-07-05) ✅ — VIZYON §3 açık konu kapatıldı + crew-os feature `bunker`→`crew` + VERSIONS v0.3 "Tamamlanan ✅" + SESSION-NOTES güncellendi. **⏳ v0.3 canlıya alınmadı** (kod `revize/devflow-kurulum`'da). Sahipli B-grubu → SESSION-NOTES sonraki-versiyon adayı.

---

## Task Durumu (Aktif Faz)

> **Faz 14 ✅** — senaryo testi fazı; 9 task (S1–S9 → 14.01–14.09). Detay tablo + araç eşlemesi `phases/PHASE-14.md`. **TASK-14.01→14.09 ✅ + verify-phase ✅ + review-phase ✅** (faz döngüsü dışı, sıradaki `/devflow:prd-review`). Faz 4–13 ✅.

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

**Aktif Task:** **YOK — v0.3 fazları + prd-review ✅ + 🚀 production release ✅ (2026-07-05, `main` `2ea09b7`, canlı doğrulandı).** Sıradaki: `/devflow:kickoff` (re-kickoff → yeni versiyon), istenirse. **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır).
**Aktif Faz:** **YOK (faz döngüsü dışı)** — Faz 14 ✅ (v0.3 versiyon-sonu senaryo testi; ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). **TASK-14.01→14.09 ✅ + verify-phase ✅ + review-phase ✅** — S1 giriş/redirect matrisi · S5 taksonomi+S6-render · S8-suite+S6-parite · S8-Lighthouse çift-tema a11y=100+perf tabanı · S3 sayfa-boyu nabız (9/9) · S4 kontroller&kalıcılık (10/10) · S2 tam TR yolculuğu (15/15) · S7 chatbot 0-token (13/13, API çağrısı=0) · S9 adversarial/holistik (12/12+6/6). **Bütünsel S1–S9 kapsam-içi bug sıfır + UAT 11/11 + 8 kalite ekseni ✅.** **Faz 13 ✅** — SEO-metadata hijyeni. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** (prd-review ✅ sıfırladı) → sıradaki: v0.3 release ve/veya re-kickoff (kullanıcı kararı).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-05 — **🚀 v0.3 CANLIYA ALINDI + prd-review (v0.3) ✅.** Release: `revize/devflow-kurulum`→`main` merge (`2ea09b7`, `--no-ff`) + Vercel deploy `success` (Git bağlantısı sağlam, `pending`→`success`); clean build 37/37 SSG öncesinde; canlı duman testi ✅ (`/crew-os` 200, `/bunker-os`+`/en/bunker-os`→`/crew-os` 308, `/forum`→`/` 308, home/en/ar/alpfit/vaka/sitemap 200, "Crew OS" 14× / "Bunker OS" görünür 0×, fresh age=24). prd-review (yalnız `_dev/` doküman, kaynak değişmedi): vizyon değişikliği yok, PRD drift hizalaması (VIZYON §3 kapatıldı `/crew-os`, crew-os feature `bunker`→`crew`, VERSIONS v0.3 "Tamamlanan ✅", SESSION-NOTES güncellendi, çözülmüş açık sorular mezun). **Versiyon Sonu Durumu `içerik_fazları`** (re-kickoff'ta yeni versiyon). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env AYARLI DEĞİL** (`/api/chat` 503 → chatbot "offline"; zarif düşüş, regresyon değil; Vercel env'e eklenince açılır). Sahipli B-grubu → SESSION-NOTES sonraki-versiyon adayı. **Sıradaki: `/devflow:kickoff` (re-kickoff → yeni versiyon), istenirse.**
