← [README](README.md) · koşu-arşivi

## v0.2 / Faz 4 — Erişilebilirlik a11y 89 → 100 (2026-06-30, TASK-4.08)

Faz 4 fixleri (K1–K5 + C2/C3/C9: yalnız CSS renk/token + markup/aria; kaynak JS/layout/asset değişmedi) sonrası **otoriter final ölçüm**. Fresh-prod-serve (`rm -rf .next && next build` → `next start -p 4173`, listening-PID 1751728 teyit), düşük host-yükü (load 0.7–2.3), çoklu koşu median.

### A11y = 100 milestone — TR `/` kanonik (Lighthouse, dark) + çift-tema axe

| Preset (TR `/`, median) | a11y | color-contrast | definition-list | dlitem | label-content-name-mismatch |
|---|---|---|---|---|---|
| Mobil | **100** | pass (0 öğe) | N/A | N/A | pass |
| Masaüstü | **100** | pass (0 öğe) | N/A | N/A | pass |

> `definition-list` + `dlitem` artık **N/A** (notApplicable): K3 ile Hero `<dl>` tamamen kaldırıldı → denetlenecek öğe yok (fail → N/A, hedeflenen sonuç).

**axe** (TR `/`, `emulateMedia colorScheme` + `reducedMotion:'reduce'` + uçtan-uca scroll → tam reveal envanteri; 4 denetim + tam tarama):

| Tema | 4-denetim gate | Tam axe taraması |
|---|---|---|
| Light (krem `rgb(247,246,241)`) | **0 ihlal** | **0 toplam ihlal** (39 pass) |
| Dark (ink `rgb(19,21,16)`) | **0 ihlal** | **0 toplam ihlal** (39 pass) |

### Perf/CLS regresyon — apples-to-apples (`/en`, baseline ile **aynı** sayfa)

Regresyon ancak aynı sayfa karşılaştırılırsa anlamlı. Baseline `/en` ölçtü → post-fix build de `/en` (cookie'siz, baseline-birebir komut) ölçüldü:

| Sayfa | Metrik | v0.1 baseline (`/en`) | Post-fix (`/en`) | Verdi |
|---|---|---|---|---|
| Mobil | perf | 87 | **87** | = (regresyon yok) |
| Mobil | LCP | 3156 ms | **3156 ms** | = (birebir) |
| Mobil | FCP | 1056 ms | **1056 ms** | = (birebir) |
| Mobil | CLS | 0 | **0** | = |
| Masaüstü | perf | 100 | **100** | = |
| Masaüstü | LCP | 689 ms | **645 ms** | = (gürültü) |
| Masaüstü | CLS | 0 | **0** | = |
| (her ikisi) | **a11y** | 89 | **100** | **+11 (fazın hedefi)** ✅ |

> Lighthouse mobil metrikleri Lantern simülasyonuyla **deterministik**; aynı build + aynı sayfa mobil perf/LCP/FCP'yi **birebir** üretiyor → Faz 4'ün CSS-renk/markup/aria değişiklikleri **sıfır perf maliyeti**. CLS=0 her yerde (ortam-bağımsız). **Korunan taban (ILKELER §2) regresyonsuz.**

### TR `/` profili (yeni — ilk kez otoriter ölçüldü)

TR varsayılan sayfası `/en`'den ağır (hero metni daha uzun) → daha düşük perf/LCP. Baseline bu sayfayı **hiç ölçmemişti** (cookie'siz `/en`'e gidiyordu); dolayısıyla aşağı sayılar **regresyon değil**, ilk TR `/` kaydı:

| Preset (TR `/`) | perf (koşular → median) | a11y | LCP | FCP | CLS | TBT |
|---|---|---|---|---|---|---|
| Mobil | 84/84/87/87/84 → **84** | 100 | ~3604 ms | ~1656 ms | 0 | 173–278 ms |
| Masaüstü | 99/99/100 → **99** | 100 | ~765 ms | ~368 ms | 0 | 0 ms |

> **v0.2 ileri-takip:** TR `/` artık varsayılan-locale takip noktası (en temsilî sayfa). Mobil TR profili (perf 84, LCP 3.6s) brief perf bütçesinin (≥95, LCP<2.5s) altında — bu, **adanmış perf fazının** (v0.2 sonraki iş kolu) konusudur; Faz 4 a11y fazı olarak perf'i yalnız **regresyonsuz** tuttu (kapsam dışı, discuss kararı).

### Craft (gözle, her iki tema) — imza korundu

- **Marka yeşili + pulse imza:** light gym-panel parlak pulse (`#6fe36f`); dark krem-panelde `text-pulse-ink` koyu-yeşil (`#1f7a3d`) okunur + `bg-pulse` canlı-nokta parlak (C2/C3 dürüst+okunur).
- **text-ink-faint hiyerarşisi:** muted-okunur (her iki tema); Hero stats görünüm **birebir** (dl→div görünmez); "Nasıl çalışır" 01-04 + gym-panel 01-03 faint numaralar yerinde.

### i18n parite

- **Yeni anahtar YOK** (K4 kod-only `LABELS`, pulse-ink token-only) → 5 dil (tr/en/ar/de/es) eşzamanlılığı bozulmadı. Build 37 sayfa (5 locale × route) üretti, 0 `MISSING_MESSAGE`.

---

## v0.2 / Faz 6 — TASK-6.01: Element-denetimli TR `/` mobil çalışma tabanı (2026-06-30)

Faz 6'nın lever önceliğini sabitlemek için **element-denetimli** ölçüm (LCP elementi = hero metni mi canvas mı). Kod değişmedi — bu saf teşhis/taban task'ı. Fresh-prod-serve (`rm -rf .next && next build` → `next start -p 4173`, listening-PID 26764 teyit), düşük host-yük (load 0.6–2.1), TR `/` (`NEXT_LOCALE=tr` cookie, finalUrl `/` teyitli).

> **Ölçüm ortamı (bu taban bu ortamda alındı — kayıt için kritik):** taze devcontainer; node 20.20.2 + Google Chrome 150 + Lighthouse 13.3.0, npm install ile (`node_modules` only, lock dokunulmadı). Chrome-flags: `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`. Sonuncu **şart**: Chrome 150 headless'ta yazılım-WebGL (SwiftShader) için bu flag olmadan Living Flow context alamayıp `TARGET_CRASHED` ile çöküyor; `--disable-dev-shm-usage` da 64M `/dev/shm` çökmesini eler. (Bu ortam tuzakları → MEMORY Ortam & Araç Notları.)

### LCP elementi — AMPİRİK TEYİT (5 mobil + 3 masaüstü koşuda stabil)

| Preset | LCP elementi | Tür |
|---|---|---|
| Mobil (TR `/`) | `<p data-hero="sub">` — "Ekibinizin zamanını çalan tekrarlayan işi buluruz…" (`section#top > div.relative > div.max-w-4xl > p.mt-7`) | **hero metni** |
| Masaüstü (TR `/`) | `<span data-hero="l2">` — "Sonra otomatikleştiririz." (hero `<h1>` yeşil satırı) | **hero metni** |

> **LCP elementi her iki preset'te HERO METNİ — canvas/static-flow zemini DEĞİL.** Her iki element `Hero.tsx:18` `gsap.set("[data-hero]", { opacity: 0, y: 36 })` reveal'inin **opacity:0**'ı altında (sub 0.55s'de açılır). Lighthouse reduced-motion set etmediği için ölçümde de opacity:0 başlar → reveal LCP'yi geciktirir. **Çıkarım: L1 (hero reveal transform-only, TASK-6.02) doğrudan LCP elementini hedefler → yüksek etki.** LH 13.3.0'da eski `largest-contentful-paint-element` audit'i yok; element `lcp-breakdown-insight` audit'inden okundu (kanıt: `home-mobile-20260630-lcp.json`).

### Median skorlar (element-denetimli)

| Preset (TR `/`) | perf (koşular → median) | LCP | FCP | CLS | TBT |
|---|---|---|---|---|---|
| Mobil | 61/63/63/62/62 → **62** | **3608 ms** (3459–3762) | 1666 ms | **0.000** | 1842 ms (1791–2304) |
| Masaüstü | 100/99/99 → **99** | 734 ms | 414 ms | **0.000** | 17 ms |

### Ortam-karşılaştırılabilirlik uyarısı (pazarlık dışı dürüstlük kaydı)

- **LCP / FCP / CLS — ortamlar arası karşılaştırılabilir (Lantern-deterministik):** bu ortamın mobil LCP'si (3608 ms) önceki Faz-4 ortamıyla (3604 ms) ve FCP (1666 vs 1656 ms) **neredeyse birebir**. Masaüstü LCP 734 ms ≈ Faz-4 765 ms. CLS=0 her yerde.
- **perf / TBT — bu ortama özgü, ŞİŞKİN, ortamlar arası KARŞILAŞTIRILAMAZ:** bu ortamda mobil TBT **1842 ms** / perf **62**; Faz-4 ortamında TBT ~200 ms / perf 84. Fark host gürültüsü değil (düşük yükte 5 koşu tutarlı) — **yazılım-WebGL (SwiftShader) main-thread'i Faz-4 ortamının GL yolundan kat kat ağır işliyor**. perf skoru bu yüksek TBT tarafından aşağı çekiliyor.
- **Sonuç:** Faz 6 içi lever karşılaştırmaları (6.04, 6.07) **bu ortamda** ölçüldükçe self-tutarlı (relative delta geçerli). Brief bütçesine (perf ≥95 / LCP <2.5s) mutlak yakınlık değerlendirmesinde **LCP/FCP/CLS güvenilir sinyal**; perf/TBT'nin mutlak değeri bu ortamın software-GL artefaktıyla şişkin, Faz-4'ün 84'üyle bire bir kıyaslanamaz. Başlangıç çalışma tabanı: mobil LCP ~3.6s (brief <2.5s'in üstünde, hedef), perf bu ortamda 62.

---

## v0.2 / Faz 6 — TASK-6.04: L1+L2 sonrası ara-ölç (2026-06-30)

L1 (hero reveal transform-only, 6.02) + L2 (WebGL idle deferral, 6.03) uygulandıktan sonra **aynı ortam/method** ile ara-ölç (karar kapısı). Fresh-prod-serve (`rm -rf .next && next build` temiz → `next start -p 4173`, listening-PID 37141 teyit), düşük yük (load 0.9–1.4), TR `/` (`NEXT_LOCALE=tr`, finalUrl `/` teyit), element-denetimli. Ortam: aynı node 20.20.2 + Chrome 150 + LH 13.3.0 + SwiftShader (flags birebir 6.01). Artefakt: `home-mobile-20260630-6.04-ara.json` (median mobil koşu).

### Median (6.01 tabanıyla yan-yana — aynı ortam, apples-to-apples)

| Preset (TR `/`) | perf (koşular → median) | LCP | FCP | CLS | TBT | LCP elementi |
|---|---|---|---|---|---|---|
| Mobil (6.01 taban) | 61/63/63/62/62 → **62** | 3608 ms | 1666 ms | ~0 | 1842 ms | `<p data-hero="sub">` |
| Mobil (6.04 L1+L2) | 61/62/61/63/62 → **62** | **3615 ms** | **1665 ms** | **~7.3e-6 (≈0)** | **1898 ms** | `<p data-hero="sub">` (değişmedi) |
| Masaüstü (6.01) | 100/99/99 → **99** | 734 ms | 414 ms | ~0 | 17 ms | `<span data-hero="l2">` |
| Masaüstü (6.04) | 100/100/100 → **100** | **696 ms** | **416 ms** | **≈0** | 7 ms | `<span data-hero="l2">` (değişmedi) |

**Delta:** mobil LCP +7ms / FCP −1ms / perf 0 / TBT +56ms — hepsi koşu-içi gürültü bandında (LCP 3459–3760). Masaüstü perf 100 (guardrail 99-100 ✓), LCP −38ms, CLS≈0. **L1+L2 ölçülebilir Lantern delta üretmedi.**

### Neden delta yok — Lantern simülasyon artefaktı (kanıtlı)

Mobil LCP skoru (3.6s) **Lantern-simüle**: throttle'sız gözlenen trace'te LCP breakdown = TTFB 12ms + elementRenderDelay **172.9ms** (≈185ms toplam) — yani gözlenen trace'te hero metni hemen render oluyor. 6.01 tabanında da elementRenderDelay **173.3ms** (birebir). 3.6s, Lantern'in 4× CPU throttle altında WebGL main-thread işinin LCP penceresini bloke etmesini **simüle** etmesidir.

- **L1 (opacity→transform):** gözlenen trace'te hero metni zaten ~185ms'de render oluyordu (un-throttled reveal hızlı tamamlanır) → opacity-gate observed darboğaz değildi → Lantern skoru oynamaz. L1 yine de **gerçek-cihaz-doğru** (gerçek throttle altında opacity:0 reveal'i LCP'yi geciktirirdi); lab bu kazancı göremiyor.
- **L2 (rIC deferral):** `requestIdleCallback({timeout:2000})` throttle'sız gözlenen trace'te thread hemen boşaldığı için **neredeyse anında ateşler** → WebGL init erken yakalanır → Lantern bunu LCP penceresinde bloke eden iş olarak simüle eder (TBT 1898≈1842 birebir). Gerçek meşgul main-thread'de rIC LCP sonrasına ertelerdi; Lantern bunu modelleyemez.

**Dürüst kayıt:** lab (LH Lantern + software-GL), L1/L2'nin gerçek-cihaz kazancını **ölçemiyor**; ikisi de doğru/craft-koruyucu, commit'li tutuluyor. Lab'ın gösterebileceği tek lever = WebGL **gerçek iş yükünü** azaltan P2 (degradasyon ayarı). Brief perf bütçesi bu lab'da temiz doğrulanamaz; gerçek doğrulama gerçek-cihaz/Vercel field verisi gerektirir (v0.1 dürüst-kayıt deseni).

---

## v0.2 / Faz 6 — TASK-6.07: Faz-sonu final ölçüm + aynı-ortam before/after (2026-06-30)

Fazın tüm lever'ları (L1+L2+L3; P2 6.06'da craft-gate'te iptal) uygulandıktan sonra **otoriter final ölçüm**. Bu sefer 6.01/6.04'ün ağır-SwiftShader devcontainer'ı değil, **temsilî ortam**: node 20.20.2 + Chrome 150, flags birebir (`--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`). Fresh-prod-serve (`rm -rf .next && next build` → `next start -p 4173`, listening-PID teyit), düşük yük (load 0.5–1.5), TR `/` (`NEXT_LOCALE=tr`, finalUrl `/` teyit), element-denetimli.

> **Ortam tespiti (kritik):** Bu ortamın lever-öncesi baseline'ı (aşağıda, `git checkout e5a4ef1 -- src` ile aynı ortamda yeniden build edilip ölçüldü) **perf 84 / LCP 3604ms / FCP 1656ms / TBT 261ms** verdi — Faz-4 ortamıyla (perf 84 / LCP 3604 / FCP 1656 / TBT 173–278) **birebir**. Yani 6.01/6.04'ün perf 62 / TBT 1842ms şişkinliği o devcontainer'a özgü bir anomaliydi; burada **perf/TBT de Faz-4 ile karşılaştırılabilir** (software-GL yükü normal). Bu, faz-içi before/after'ı tek tutarlı ortamda apples-to-apples yapılabilir kıldı.

### Aynı-ortam before/after (TR `/` mobil median, 5 koşu)

| Metrik | Baseline (lever öncesi, e5a4ef1) | **Final (L1+L2+L3, HEAD)** | Delta |
|---|---|---|---|
| perf | 84 (83–86) | **90** (87–93) | **+6** |
| LCP | 3604 ms (3603–3757) | **3164 ms** (2857–3231) | **−440 ms (−12%)** |
| FCP | 1656 ms | **1506 ms** | −150 ms |
| CLS | ~7.3e-6 (≈0) | ~7.3e-6 (≈0) | = |
| TBT | 261 ms | 178 ms | −83 ms |
| LCP elementi | `<p data-hero="sub">` | `<p data-hero="sub">` (değişmedi) | = |

Dağılımlar örtüşmüyor (baseline min LCP 3603 > final max LCP 3231) → delta gürültü değil, **gerçek iyileşme**. Milestone "**ölçülebilir mobil perf/LCP iyileşmesi**" ✓ KARŞILANDI.

**Masaüstü (TR `/` median, 3 koşu):** baseline perf 100 / LCP 764ms → final perf **100** / LCP **694ms** / FCP 327ms / CLS≈0 / TBT 0. Guardrail (99-100) ✓ korundu. LCP elementi `<span data-hero="l2">` (değişmedi).

### Attribution — iyileşmenin sürücüsü L3 (font budama), L1+L2 değil

Üç durum aynı ortamda ölçüldü (mobil median):

| Durum | perf | LCP | FCP | TBT |
|---|---|---|---|---|
| Baseline (lever yok) | 84 | 3604 ms | 1656 ms | 261 ms |
| **L1+L2 only** (L3 reverted) | 83 | **3755 ms** | 1657 ms | 274 ms |
| **L1+L2+L3** (HEAD final) | 90 | **3164 ms** | 1506 ms | 178 ms |

- **L1+L2 tek başına ölçülebilir delta üretmiyor** (LCP 3604→3755, gürültü/hafif kötü) — TASK-6.04'ün bulgusunu **temsilî ortamda da doğruluyor** (anomalik SwiftShader'a özgü değilmiş). L1+L2 yine **gerçek-cihaz-doğru + craft-koruyucu**, commit'li tutulur (regresyon yok).
- **L3 (Fraunces SOFT/WONK budama) iyileşmenin tamamını sürüyor** (L1+L2 üstüne LCP 3755→3164, −590ms). Mantık: LCP elementi hero metni (Fraunces, `display:swap`); Lighthouse mobil preset'i **simüle network throttle** uygular (Lantern), bu yüzden ~113KB küçülen woff2 simülasyonda görünür ve font-swap'i öne çeker. (Research'ün "L3 kazancı localhost'ta gizli" notu **gerçek** network içindi; Lantern simüle throttled download'u modellediği için lab'da L3 görünür.)

> **6.04 rafinajı (dürüst kayıt):** TASK-6.04 "lab'da simüle-LCP'yi azaltabilecek tek lever WebGL iş yükünü düşürmek (P2)" demişti — bu **eksikti**: yalnız CPU/main-thread lever'larını düşünmüş, **network lever'ını (L3) atlamıştı**. L3 bir Lantern-görünür kazanç sağladı. 6.04'ün L1+L2 "delta yok" çekirdek bulgusu doğru kaldı; eksik olan, network ekseninin de lab-görünür olabileceğiydi.

### Brief bütçe değerlendirmesi (dürüst — hedef düşürülmedi, craft feda edilmedi)

- **Mobil:** perf 90 (< brief 95, −5) · LCP 3164ms (> brief 2.5s, +664ms) → **brief mobil bütçe hâlâ AÇIK**, ama baseline'a (84 / 3604ms) göre ölçülebilir kapandı. Kalan açık = 4× CPU throttle altında WebGL main-thread init işi (CPU-bound) — bunu kapatacak tek kalan lever WebGL gerçek iş yükünü azaltmak (P2), 6.06'da **craft-gate'te iptal** edildi (imza Living Flow'a bir lab sayısı için dokunulmaz; DECISIONS 2026-06-30). Gerçek-cihaz/Vercel field bu açığı lab'dan daha lehte gösterebilir (throttle gerçekçiliği + gerçek GPU).
- **Masaüstü:** perf 100 / LCP 694ms → brief bütçe içinde ✓.
- **Guardrail'ler (hepsi yeşil):** a11y=100 çift-tema (Playwright/axe light+dark, 0 WCAG AA ihlal — Faz 4 kazanımı regresyonsuz) · CLS≈0 (mobil+masaüstü) · masaüstü perf 100 · i18n parite (vitest 6/6 + build 0 `MISSING_MESSAGE`, lever'lar içerik anahtarına dokunmadı).

<!-- KURAL: v0.1 karar paragrafı (TASK-2.03) Faz 6 bölümünün sonunda bırakıldı (bilinçli) — audit-docs 2026-09-12, kullanıcı kararı; v0.1 bölümündeki "aşağıda Karar" atfı buna işaret eder. -->
Bulgu kullanıcıya getirildi (TASK-2.03 Karar Noktası). Optimizasyon/a11y düzeltmesi bu fazın (Phase 2 teknik borç) kapsamı dışı (discuss-phase). Disposition → DURUM "Sıradaki Adım" + `docs/DECISIONS.md` (2026-06-28).

---

## v0.2 / Faz 7 — TASK-7.02: Umami sonrası before/after regresyon doğrulaması (2026-07-01)

Umami analytics entegrasyonu (TASK-7.01: `next/script` `<Script afterInteractive>` ile `umami.kiwiailab.com/script.js` `[locale]/layout.tsx` `<head>`'inde) yeni bir 3rd-party script + yeni origin ekliyor. Araştırma (PHASE-7 · D) "Lantern network lever'ları lab'da görünür" gerekçesiyle **before/after ölçüm** şart koştu; preconnect **ölç-önce (YAGNI)** kararına bağlandı. Bu task o ölçümdür.

Ortam: node 20.20.2 + Chrome 150 + LH 13.3.0 (npx-cache), flags `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`. Fresh-prod-serve (`rm -rf .next && next build` → `next start -p 4173`, listening-PID teyit), düşük yük (load ~1–2.8), TR `/` (`NEXT_LOCALE=tr` cookie, finalUrl `/` teyit). **before = aynı ortamda `layout.tsx` f065700'e (Umami öncesi) döndürülüp yeniden build** (perf/TBT ortamlar arası kıyaslanamaz → same-env before şart).

### Aynı-ortam before/after — TR `/` mobil (5 koşu median)

| Metrik | Before (Umami'siz) | **After (Umami'li)** | Delta | Faz 6 tabanı | Verdi |
|---|---|---|---|---|---|
| perf | 90 (87–93) | **88** (81–90) | −2 (gürültü, bantlar örtüşük) | (ortam-bağımlı) | ✓ regresyon yok |
| LCP | 3009 ms (2704–3228) | **2714 ms** (2707–3160) | −295 ms (↓ daha iyi) | ≤ 3164 ms | ✓ tabanın altında |
| FCP | 1508 ms | **1364 ms** | −144 ms (↓) | — | ✓ |
| CLS | 0.000 | **0.000** | = | ≈ 0 | ✓ |
| TBT | 277 ms | **319 ms** | +42 ms (gürültü) | (ortam-bağımlı) | ✓ |

### TR `/` masaüstü (3 koşu median)

| Metrik | Before | **After** | Faz 6 tabanı | Verdi |
|---|---|---|---|---|
| perf | 100 | **100** | 100 | ✓ |
| LCP | 611 ms | **660 ms** | ≤ 0.69 s | ✓ (+49 ms, gürültü) |
| CLS | 0.000 | **0.000** | ≈ 0 | ✓ |
| TBT | 0 ms | **0 ms** | — | ✓ |

> Kanonik AFTER artefakt (mobil `home-mobile-20260701-faz7`, LCP 2856 ms) 8-koşu birleşik median (~2855 ms) civarında temsilî. Masaüstü kanonik LCP 610 ms.

### Sonuç — regresyon YOK, preconnect eklenmedi

- **LCP/FCP/CLS (Lantern-deterministik) Faz 6 tabanının altında/eşit** — mobil LCP after 2714 ms ≤ 3164 ms; masaüstü 660 ms ≤ 0.69 s; CLS≈0 her yerde. Same-env before→after tüm delta'lar koşu-içi gürültü bandında (dağılımlar örtüşüyor); mobil perf 88 vs 90 farkı 2 puan (before 87–93 / after 81–90 bantları örtüşük) → anlamlı regresyon değil.
- **Neden regresyon yok — `afterInteractive` LCP sonrası yükler:** `network-requests` audit'i `umami.kiwiailab.com` isteğinin ölçümde **fiilen alındığını** gösteriyor (after artefaktlarında var, before'da yok), ama script hydration sonrası (LCP penceresinden sonra) enjekte edildiği için LCP elementiyle (hero metni) yarışmıyor. L3 font budamasının (Faz 6) aksine — o LCP kritik yolundaydı, bu değil. Araştırmanın "Lantern network lever'ı görünür olabilir" tezi doğruydu ama **yalnız LCP kritik yolundaki** asset'ler için; `afterInteractive` script o yolda değil.
- **Karar: preconnect/dns-prefetch eklenmedi** (araştırma D · YAGNI). Veri regresyon göstermedi → yeni origin için erken bağlantı gerekmedi; 7.01 dosyalarına dokunulmadı, DECISIONS'a yeni girdi gerekmedi (regresyon-tetikli strateji değişikliği olmadı).

---

## v0.2 / Faz 9 — TASK-9.04: S8-Lighthouse re-teyit (a11y=100 çift-tema + perf korunan taban) (2026-07-02)

v0.2 versiyon-sonu **senaryo testi** guardrail'i (S8): kaynak kod **değişmedi** (doğrulama fazı) → yeni artefakt kaydedilmedi; skorlar korunan tabanla kıyaslandı, kayıt buraya. Ortam: node 20.20.2 + Chrome 150 + LH 13.3.0 (npx-cache), flags birebir (`--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`). Fresh-prod-serve (`rm -rf .next && next build` → `next start -p 4173`, listening-PID 84813 teyit), düşük yük (load 0.79–1.43), TR `/` (`NEXT_LOCALE=tr`, finalUrl `/` teyit), element-denetimli.

### a11y=100 çift-tema (iki-gate TK5, S8 skor gate tarafı)

- **Lighthouse kanonik (dark), 6 sayfa:** `/`·`/spor-salonu-yazilimi`·`/vaka-calismalari`·`/bunker-os`·`/bulten/ai-sdr-araclari`·`/bulten/claude-opus-4-8-fable-5` → **6/6 a11y=100**, 0 düşen audit, `runtimeError=none`. Structural audit'ler (`landmark-one-main`/`heading-order`/`list`/`bypass`) tema-bağımsız → light'a da geçerli.
- **Gerçek light+dark axe, 6 sayfa × 2 tema = 12 koşu:** standalone Playwright (`localStorage.theme` seed FOUC öncesi + `html.dark` themeOk teyit + `reducedMotion:'reduce'`+scroll) + LH npx-cache axe-core **4.12.1** (LH'nin bundle motoru), violation'lar LH a11y audit-id kümesine filtreli → **12/12 koşuda 0 Lighthouse-ilgili ihlal** (best-practice gürültüsü bile 0). → a11y=100 çift-tema gerçekten doğrulandı. Bu, TASK-9.03 axe WCAG-AA suite'inin (52) göremediği **structural** katmanı kapatır (iki-gate TK5).

### Perf korunan taban (home, çok-koşu median)

| Preset (TR `/`) | perf | LCP | FCP | CLS | TBT | LCP elementi | Verdi |
|---|---|---|---|---|---|---|---|
| Masaüstü | **100** | 629 ms | 336 ms | 0.000 | ~27 ms | `<span data-hero="l2">` | taban ✓ |
| Mobil | 65 (env) | **3171 ms** | 1516 ms | 0.000 | ~2000 ms (env) | `<p data-hero="sub">` | comparable metrikler ✓ |

- **LCP/FCP/CLS (Lantern-deterministik, ortamlar arası kıyaslanabilir) korunan tabanla eşit:** mobil LCP 3171 ≈ Faz-6/7 taban 3164 ms; FCP 1516 ≈ 1506 ms; masaüstü LCP 629 ≤ 0.69 s; CLS=0 her yerde. LCP elementleri değişmedi (hero metni her iki preset). **Regresyon yok.**
- **perf 65 / TBT ~2000ms = ağır-SwiftShader ortam anomalisi** (TASK-6.01 perf 62/TBT 1842 ile birebir; software-GL main-thread şişkinliği) — memory gereği **ortamlar arası kıyaslanamaz, regresyon sinyali değil**. Bu devcontainer 6.01'in ağır-SwiftShader varyantı (6.07 temsilî ortamın perf 90'ı değil).
- **Brief mobil perf açığı record-not-fix (TK7):** mobil LCP 3171ms > brief <2.5s; kök neden CPU-bound WebGL (gerçek-cihaz duvarı, DECISIONS 2026-06-30). Senaryo testte kaydedildi, düzeltilmedi.
