# Perf Taban Kayıtları — Ana Sayfa Lighthouse

Ana sayfa Lighthouse perf/a11y tabanları. Ölçüm **yerel production build** üzerinde (`next build && next start`); revize branch canlıya deploy olmuyor (kiwiailab.com eski kodu yansıtır) → bu "yerel taban". İlk taban: **v0.1, 2026-06-28** (TASK-2.03 / Phase 2). En güncel ölçüm: **v0.2 / Faz 6, 2026-06-30** (TASK-6.01; element-denetimli TR `/` mobil çalışma tabanı — LCP elementi = hero metni).

> ⚠️ **İki kanonik-koşu tuzağı (Faz 4 TASK-4.01/4.08 düzeltmeleri — okumadan ölçme):**
> 1. **Ölçülen-locale:** Cookie'siz kanonik koşu Chrome `Accept-Language` ile `/` → **`/en`**'e redirect olur (next-intl `localeDetection`). v0.1 tabanı bu yüzden "TR `/`" değil, aslında **`/en`**'i ölçtü (artifact `finalUrl=/en` ile kanıtlı). **TR varsayılan** sayfasını ölçmek için `NEXT_LOCALE=tr` cookie şart (Lighthouse `--extra-headers='{"Cookie":"NEXT_LOCALE=tr"}'`). TR `/` sayfası `/en`'den **ağırdır** (hero metni daha uzun) — perf/LCP/FCP farkı buradan gelir, regresyon değil.
> 2. **Render-teması:** Kanonik `--headless=new` koşusu **DARK** render eder (tema init `prefers-color-scheme: dark`'a düşer) → Lighthouse a11y skoru **dark** temayı ölçer. Belirli temayı zorlamak için Playwright `emulateMedia({colorScheme})`. Detay → `_dev/memory/a11y-olcum-tema-tuzagi.md`.

Kanonik artefaktlar:
- **v0.1 (2026-06-28)** — `home-{mobile,desktop}-20260628.{html,json}` · *ölçülen sayfa: `/en`* (yukarıdaki #1)
- **v0.2/Faz 4 (2026-06-30)** — `home-{mobile,desktop}-20260630.{html,json}` (TR `/`, a11y=100); regresyon-repro `home-{mobile,desktop}-en-baseline-repro-20260630.json` (`/en`, baseline ile aynı sayfa)
- **v0.2/Faz 6 TASK-6.01 (2026-06-30)** — `home-mobile-20260630-lcp.json` (TR `/`, **element-denetimli**: LCP elementi `lcp-breakdown-insight`'tan okunabilir; kanonik `home-*` güncelleme 6.07'de). Ölçüm ortamı Chrome 150 + SwiftShader → perf/TBT şişkin, LCP/FCP/CLS önceki ortamla birebir (aşağıda Faz 6 bölümü).

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

## Karar — Bütçe Karşılanmadı (contingency)

Bulgu kullanıcıya getirildi (TASK-2.03 Karar Noktası). Optimizasyon/a11y düzeltmesi bu fazın (Phase 2 teknik borç) kapsamı dışı (discuss-phase). Disposition → DURUM "Sıradaki Adım" + `docs/DECISIONS.md` (2026-06-28).

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
