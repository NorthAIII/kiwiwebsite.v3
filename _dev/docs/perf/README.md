# Perf Taban Kayıtları — Ana Sayfa Lighthouse

Ana sayfa Lighthouse perf/a11y tabanları. Ölçüm **yerel production build** üzerinde (`next build && next start`); revize branch canlıya deploy olmuyor (kiwiailab.com eski kodu yansıtır) → bu "yerel taban". İlk taban: **v0.1, 2026-06-28** (TASK-2.03 / Phase 2). En güncel ölçüm: **v0.3 / Faz 12, 2026-07-03** (TASK-12.03; B1 Living Flow aşağı-taşıma karar-gate — desktop perf 100 / CLS 0 regresyonsuz + full-motion a11y 0 ihlal çift-tema; aşağıda **Faz 12 / TASK-12.03** bölümü). Bir önceki: v0.2 / Faz 9, 2026-07-02 (TASK-9.04; versiyon-sonu senaryo testi S8-Lighthouse re-teyit — 6/6 dark kanonik a11y=100 + 12/12 light/dark axe 0 ihlal + perf korunan taban regresyonsuz).

> ⚠️ **İki kanonik-koşu tuzağı (Faz 4 TASK-4.01/4.08 düzeltmeleri — okumadan ölçme):**
> 1. **Ölçülen-locale:** Cookie'siz kanonik koşu Chrome `Accept-Language` ile `/` → **`/en`**'e redirect olur (next-intl `localeDetection`). v0.1 tabanı bu yüzden "TR `/`" değil, aslında **`/en`**'i ölçtü (artifact `finalUrl=/en` ile kanıtlı). **TR varsayılan** sayfasını ölçmek için `NEXT_LOCALE=tr` cookie şart (Lighthouse `--extra-headers='{"Cookie":"NEXT_LOCALE=tr"}'`). TR `/` sayfası `/en`'den **ağırdır** (hero metni daha uzun) — perf/LCP/FCP farkı buradan gelir, regresyon değil.
> 2. **Render-teması:** Kanonik `--headless=new` koşusu **DARK** render eder (tema init `prefers-color-scheme: dark`'a düşer) → Lighthouse a11y skoru **dark** temayı ölçer. Belirli temayı zorlamak için Playwright `emulateMedia({colorScheme})`. Detay → `_dev/memory/a11y-olcum-tema-tuzagi.md`.

Kanonik artefaktlar:
- **v0.1 (2026-06-28)** — `home-{mobile,desktop}-20260628.{html,json}` · *ölçülen sayfa: `/en`* (yukarıdaki #1)
- **v0.2/Faz 4 (2026-06-30)** — `home-{mobile,desktop}-20260630.{html,json}` (TR `/`, a11y=100); regresyon-repro `home-{mobile,desktop}-en-baseline-repro-20260630.json` (`/en`, baseline ile aynı sayfa)
- **v0.2/Faz 6 TASK-6.01 (2026-06-30)** — `home-mobile-20260630-lcp.json` (TR `/`, **element-denetimli**: LCP elementi `lcp-breakdown-insight`'tan okunabilir). Ölçüm ortamı Chrome 150 + **ağır** SwiftShader → perf/TBT şişkin (perf 62 / TBT 1842ms), LCP/FCP/CLS yine deterministik. **Bu ortam anomaliydi** (TASK-6.07 temsilî ortamı baseline'ı perf 84 / TBT 261ms ile ölçtü, Faz-4 ile birebir — 6.01/6.04 SwiftShader yükü 6.07'de tekrarlanmadı).
- **v0.2/Faz 6 final TASK-6.07 (2026-06-30)** — **kanonik:** `home-{mobile,desktop}-20260630-faz6.{html,json}` (TR `/`, L1+L2+L3, element-denetimli, median-LCP koşu). Attribution kanıtı (json): `home-mobile-20260630-faz6-baseline.json` (aynı-ortam lever-öncesi baseline = Faz-4 birebir) + `home-mobile-20260630-faz6-l1l2only.json` (L1+L2 tek başına = delta yok). Bu artefaktlar Faz-4 kanonik `home-*-20260630.{html,json}` dosyalarını **korur** (üzerine yazmaz).
- **v0.2/Faz 7 TASK-7.02 (2026-07-01)** — **kanonik (after=Umami'li):** `home-{mobile,desktop}-20260701-faz7.{html,json}` (TR `/`, Umami entegrasyonu HEAD, temsilî-median koşu; network-requests audit'inde `umami.kiwiailab.com` isteği **var** = script fiilen yüklendi). Attribution kanıtı (json, aynı-ortam before=Umami'siz): `home-{mobile,desktop}-20260701-faz7-before.json` (`layout.tsx` f065700'e döndürülüp yeniden build; umami isteği **yok**). Faz-6 kanonik dosyalarını korur.
- **v0.3/Faz 12 TASK-12.03 (2026-07-03)** — **kanonik:** `home-desktop-20260703-faz12.{html,json}` (TR `/`, B1 aşağı-taşıma shipped kod = fixed viewport canvas + adaptif veil + light-veil ince-ayarı, full-motion, çok-koşu). Karar-gate: desktop perf 100 / CLS ≈0 / LCP ~625ms — v0.1 desktop tabanı (`home-desktop-20260628`) ile regresyonsuz. Faz-7 kanonik dosyalarını korur.

---

## v0.1 Tabanı (2026-06-28) — ölçülen sayfa: `/en`

### Özet Skorlar (temsilî / median)

| Metrik | Brief Bütçesi | Masaüstü | Mobil | Verdi |
|--------|---------------|----------|-------|-------|
| Performance | ≥ 95 | **100** | **87** | Masaüstü ✅ · Mobil ❌ (−8) |
| Accessibility | ≥ 100 | **89** | **89** | ❌ her iki preset (−11) |
| LCP | < 2.5 s | **0.69 s** | **3.1 s** | Masaüstü ✅ · Mobil ❌ (+0.6 s) |
| CLS | ~ 0 (near-zero) | **0.000** | **0.000** | ✅ her iki preset |
| Best Practices | (briefte yok) | 100 | 100 | — kayıt |
| SEO | (briefte yok) | 92 | 92 | — kayıt |

**Bütçe verdiği: KARŞILANMADI.** Masaüstü 3/3 bütçe metriğini geçer; mobil yalnız CLS'yi geçer (perf 87 < 95, LCP 3.1 s > 2.5 s). Accessibility **her iki preset'te 89 < 100** — ortamdan bağımsız, en güvenilir sinyal. → Bulgu kullanıcıya getirildi (aşağıda Karar). Optimizasyon bu fazın kapsamı **dışı** (discuss kararı); sessizce düzeltilmedi.

### Ham Koşu Verisi

**Masaüstü** (`--preset=desktop`, throttle ~yok; load 22–33):

| Koşu | perf | a11y | LCP | CLS | TBT | FCP |
|------|------|------|-----|-----|-----|-----|
| 1 | 100 | 89 | 697 ms | 0 | 41 ms | 297 ms |
| 2 ★ | 100 | 89 | 689 ms | 0 | 0 ms | 289 ms |
| 3 | 100 | 89 | 647 ms | 0 | 0 ms | 291 ms |

Masaüstü stabil — yük altında bile perf 100. ★ = kanonik artefakt (`home-desktop-20260628`).

**Mobil** (varsayılan preset, 4× CPU-throttle + Moto-G sınıfı; **düşük yük**, load ~5):

| Koşu | perf | a11y | LCP | CLS | TBT | FCP |
|------|------|------|-----|-----|-----|-----|
| 6 | 87 | 89 | 3158 ms | 0 | 299 ms | 1058 ms |
| 7 | 89 | 89 | 3007 ms | 0 | 284 ms | 1057 ms |
| 8 ★ | 87 | 89 | 3156 ms | 0 | 309 ms | 1056 ms |

Düşük yükte mobil **stabil**: perf ~87, LCP ~3.1 s, TBT ~300 ms. ★ = kanonik artefakt (`home-mobile-20260628`).

**Mobil — elenen yüksek-yük koşuları** (load avg **88** / 20 çekirdek = ~4.4× aşırı yüklenme — bu makinedeki **harici** iş yükü, orphan process değil):

| Koşu | perf | LCP | TBT | Not |
|------|------|-----|-----|-----|
| 1 | 65 | 2878 ms | 3676 ms | host-starved |
| 2 | 49 | 5110 ms | 4876 ms | host-starved |
| 3 | 90 | 3156 ms | 206 ms | host fırsat verdi |
| 4 | 62 | 3221 ms | 5065 ms | host-starved |
| 5 | 86 | 3173 ms | 311 ms | host fırsat verdi |

TBT'nin 206 ↔ 5065 ms savrulması = saf host-zamanlama gürültüsü (sayfa değil). a11y sabit 89, CLS sabit 0 (ortamdan bağımsız → host gürültüsünden etkilenmedi). Bu koşular tabandan **elendi**; taban düşük-yük (load ~5) koşularından alındı.

### Accessibility 89 — başarısız denetimler (4, ortamdan bağımsız, her iki preset aynı)

1. **color-contrast** (8 öğe):
   - Marka yeşili `#8af28a` krem `#f2f1e8` üzerinde **kontrast 1.22** — "Nasıl çalışır" adım numaraları (`ol.space-y-5 li span.font-display`), "İşleyen örnekleri gör" CTA (`a.group`).
   - Soluk `#7d8073` koyu `#171913` üzerinde **4.39** (4.5 eşiğinin hemen altı) — sektör notu (`section#sectors p.text-xs`), dark-mode küçük metin.
   - `#999992` krem üzerinde **2.52** — `text-canvas/40` span'ları.
2. **definition-list** (1): hero istatistik `<dl data-hero="stats">` doğrudan `<a>` sarıyor — `<dl>` yalnız `<dt>`/`<dd>` (veya script/template/div) içermeli.
3. **dlitem** (4): hero `<dt>`/`<dd>` öğeleri `<a> > span` içinde, doğrudan `<dl>` çocuğu değil.
4. **label-content-name-mismatch** (2): dil değiştirici butonları — görünür metin ile `aria-label` eşleşmiyor.

> Hepsi dar kapsamlı, düzeltilebilir; ayrı bir a11y task'ında toplanabilir. color-contrast craft-duyarlı (marka yeşili dekoratif) — düzeltme marka sesini koruyarak yapılmalı.

---

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

> **Ölçüm ortamı (bu taban bu ortamda alındı — kayıt için kritik):** taze devcontainer; node 20.20.2 + Google Chrome 150 + Lighthouse 13.3.0, npm install ile (`node_modules` only, lock dokunulmadı). Chrome-flags: `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`. Sonuncu **şart**: Chrome 150 headless'ta yazılım-WebGL (SwiftShader) için bu flag olmadan Living Flow context alamayıp `TARGET_CRASHED` ile çöküyor; `--disable-dev-shm-usage` da 64M `/dev/shm` çökmesini eler. (Bu ortam tuzakları → MEMORY Ortam Notları.)

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

---

## v0.3 / Faz 12 — TASK-12.03: B1 Living Flow aşağı-taşıma karar-gate (2026-07-03)

Living Flow'un fixed viewport canvas'a taşınması (12.01) + adaptif veil (12.02) + light-veil craft ince-ayarı (12.03) **shipped kod** üzerinde karar-gate ölçümü. Ortam: node 20.20.2 + Chrome 150 + LH 13.3.0 + axe-core 4.12.1, flags `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`. Taze prod build (`rm -rf .next && next build` → `next start -p 4173`, listening-PID teyit), düşük yük (load 1.3–2.5), TR `/` (`NEXT_LOCALE=tr`, finalUrl `/` teyit), **full-motion** (alan gerçekten render ederken — reduced-motion tohumu alanı gizler → onun kontrast etkisini ölçmez, karar-gate full-motion şart).

### Gate-2 — desktop perf 100 / CLS 0 (tuned build, çok-koşu)

| Preset (TR `/`) | perf (koşular → temsilî) | a11y | LCP | FCP | CLS | TBT | Verdi |
|---|---|---|---|---|---|---|---|
| Masaüstü | 100/100/100/100 → **100** | 100 (dark) | ~625 ms (620–631) | ~334 ms | **≈3.75e-6 (≈0)** | ~0–12 ms | taban ✓ regresyonsuz |

- **Baseline kıyası:** `home-desktop-20260628` (v0.1) = perf 100 / LCP 689ms / CLS 0. Tuned build = perf 100 / LCP ~625ms / CLS ≈0 → **regresyon yok** (LCP hafif daha iyi, gürültü bandında). LCP/CLS Lantern-deterministik → ortamlar arası kıyaslanabilir; desktop perf tarihsel olarak her ortamda stabil 100.
- **Perf hipotezi doğrulandı:** araştırma "canvas zaten `frameloop=always` render ettiğinden fixed'e almak artımlı GPU maliyetini ~sıfıra yaklaştırır" dedi → tek WebGL context korundu (Hero `high`'da canvas suppress, FlowBackdrop tek fixed canvas), deterministik metrikler baseline'a eşit → **aynı-ortam before/after gerekmedi**. Light-veil ince-ayarı CSS-only (`--flow-veil` token) → ince-ayar öncesi/sonrası desktop perf 100 birebir (sıfır perf maliyeti).
- **Mobil kapsam-dışı (tasarım gereği):** aşağı-taşınan alan yalnız `high` modda mount eder; mobil/low-power (`low`) Hero-contained kalır → fixed alan mobilde hiç render etmez, mobil taban değişmez (discuss: perf tabanına sıfır risk). Ölçülmedi (alan yok + SwiftShader mobil env-anomali).

### Gate-1 — a11y kontrast çift-tema (full-motion, alan render ederken)

`channel:'chrome'`+swiftshader Playwright/axe (bundled chromium WebGL vermez → memory `playwright-bundled-chromium-webgl-yok`); desktop viewport (1350px → `high` mod), `localStorage.theme` seed (FOUC), full-motion.

| Koşu | Alan live | WCAG-AA ihlal | color-contrast ihlal | Not |
|---|---|---|---|---|
| Light full-motion | ✓ (fixed z-0 canvas) | **0** | 0 | ~82 öğe `color-contrast` *incomplete* |
| Dark full-motion | ✓ | **0** | 0 | ~81 öğe *incomplete* |
| Light reduced (fallback) | — (static) | **0** | 0 | 67 *incomplete* (alan yok) |
| Dark reduced (fallback) | — (static) | **0** | 0 | 67 *incomplete* |

- **Lighthouse a11y 100** (dark kanonik, full-motion) — alan mount ederken bile.
- **`incomplete` nüansı (dürüst kayıt):** full-motion'da alan-üstü ~15 fazla öğe axe `color-contrast` *incomplete* verir (WebGL piksellerini axe algoritması **okuyamaz** → ne pass ne violation, "manuel incele"). Bu, otomatik aracın WebGL-arkası-metin için **yapısal sınırı**; ihlal değil (Lighthouse `incomplete`'i skora saymaz → a11y=100). Gerçek okunabilirlik teyidi bu yüzden **craft görsel** (Gate-3) işidir; FlowVeil washi tam bunu güvenceye alır. reduced-motion tabanında (67) da mevcut → gradient/translucent tasarımın önceki sınırı, Faz 12'ye özgü değil.

### Gate-3 — craft (karar: uygula + light-veil ince-ayarı)

Full-motion kareler (light/dark × 5 bölüm, SwiftShader) incelendi. Dark: parlayan yeşil = koyu zeminde ambient derinlik, premium (bleed yok). Light: Hero-altı başlık bantlarında en parlak nabız karelerinde metinle yarışma (restraint sınırı). **Craft ince-ayar:** `FlowVeil` tema-flip `--flow-veil` token'ı — light %70 (başlık okunabilirliği netleşir), dark %56 korunur. İnce-ayar sonrası görsel doğrulandı: light bleed azaldı (nabızlar soluklaştı, süreklilik korundu), dark birebir aynı. **Karar: uygula-onayla** (DECISIONS 2026-07-03).

---

## Metodoloji (tekrar için)

```
rm -rf .next && npm run build && npm run start -- -p 4173   # fresh yerel production sunum (dev build ile ÖLÇÜLMEZ)
CHROME_PATH=/usr/bin/google-chrome
LH="node ~/.npm/_npx/<hash>/node_modules/lighthouse/cli/index.js"   # npx cache (13.3.0); package.json'a EKLENMEZ
# TR `/`  : $LH http://localhost:4173/ --output=json,html --extra-headers='{"Cookie":"NEXT_LOCALE=tr"}' --chrome-flags="--headless=new --no-sandbox" --quiet
# Masaüstü: aynı + --preset=desktop
# /en (baseline-birebir, regresyon repro): cookie'yi at — Accept-Language `/` → `/en` redirect'i tetiklenir
```

- **Locale şart (yukarıdaki tuzak #1):** TR `/` için `NEXT_LOCALE=tr` cookie; cookie'siz `/en` ölçülür. Karşılaştırmada **aynı sayfayı** kullan.
- **Render dark (tuzak #2):** kanonik koşu dark; light teyidi için Playwright `emulateMedia({colorScheme:'light'})`.
- **axe (tam a11y envanteri):** Playwright + `emulateMedia({colorScheme, reducedMotion:'reduce'})` + uçtan-uca scroll + offline axe enjeksiyonu (`page.addScriptTag({path: ~/.npm/_npx/<hash>/node_modules/axe-core/axe.min.js})`); Lighthouse full-motion alt-fold reveal'ları (`opacity:0`) kaçırır → axe reduced-motion tam envanteri verir.
- **Fresh-prod-serve disiplini:** `rm -rf .next` + net port + listening-PID = senin process'in teyidi (stray `next-server` yanlış-negatifi; MEMORY Süreç Disiplinleri).
- **Yük gözlemi zorunlu:** her koşuda `cat /proc/loadavg` — host çekişmesi (yüksek load) TBT/LCP/perf'i bozar (a11y/CLS'yi değil). Düşük yükte (≤ ~6) ölç.
- Her preset 3+ koşu → median; localhost ağ-iyimser → perf "yerel taban", a11y/CLS ortamdan bağımsız (en güvenilir).
- Lighthouse `prefers-reduced-motion` set etmez → Living Flow WebGL tam-yük (gerçekçi en-kötü) ölçülür.
