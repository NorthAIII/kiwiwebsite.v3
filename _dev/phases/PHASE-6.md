# Phase 6: Mobil Perf / LCP (ana sayfa TR `/`)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluştu; durum 🔄 ile başlar. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-6-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır. Tamamlandıktan (✅) sonra bölme yasaktır. -->

---

## Genel Bilgiler

**Amaç:** Ana sayfa **TR `/` mobil** Lighthouse perf/LCP skorunu brief bütçesine (perf ≥95 / LCP <2.5s) yaklaştırmak. Perf'in ana kaynağı Living Flow WebGL (M1) — craft-duyarlı, tek üst eksen. Bu faz craft'ı bozmadan ölçülebilir mobil perf iyileşmesi hedefler; gerçek çatışmada craft kazanır ve kalan açık bilinçle belgelenir.

**Milestone:** Ana sayfa TR `/` mobil perf/LCP **ölçülebilir biçimde iyileşir** (yerleşik metodoloji ile median, `NEXT_LOCALE=tr` cookie). Hedef brief bütçesi (perf ≥95 / LCP <2.5s); Living Flow imzası gözle korunduğu sürece mümkün olduğunca yaklaşılır. Korunan tabanlar regresyonsuz: a11y=100 çift-tema, CLS=0, masaüstü perf 99-100. Brief hedefine ulaşılamazsa kalan açık `docs/DECISIONS.md` + `docs/perf/README.md`'de bilinçle kaydedilir (v0.1 dürüst-kayıt deseni).

### Feature Listesi

(MODULE-MAP `— v0.2 mobil perf iş birimleri —` + `modules/M1`, `modules/M6` referansı)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| P1: WebGL-dışı mobil perf kazanımları | M6 (+M1) | Font yükleme, JS bundle, asset, render-path optimizasyonu — imzaya dokunmadan (yaklaşımın ilk adımı) |
| P2: Living Flow mobil degradasyon ayarı | M1 | Mobil degradasyon eşiklerinin (DPR cap, particle sayısı, erken static) craft korunarak ayarlanması (ikinci adım, ihtiyaç + gözle doğrulamaya bağlı) |

> Not: Kesin iş birimleri (özellikle LCP elementi ve hangi lever'ların gerçekten etkili olduğu) **research-phase**'de ampirik tespitle netleşir; yukarıdaki P1/P2 yaklaşımın iki adımını temsil eden kovalardır.

---

## Kapsam Tartışması

> `/devflow:discuss-phase 6` oturumunda dolduruldu (2026-06-30).

### Alınan Kararlar

- **Perf hedefi çerçevesi = "brief hedef, craft tavan".** perf ≥95 / LCP <2.5s hedeflenir ama Living Flow imzasını bozmadan; gerçek çatışmada craft kazanır (ILKELER #1 tek üst eksen + §2 perf "korunan taban ≠ brief hedefi" nüansı). Kalan açık bilinçle belgelenir — sessizce ne hedef düşürülür ne de craft feda edilir.
- **Living Flow'a müdahale = "önce çevre, sonra ayarlı degradasyon".** Önce WebGL-dışı kazanımlar (font/JS bundle/asset/render-path); sonra mobil degradasyon eşikleri (DPR cap, particle, erken static) craft korunarak ayarlanır. Living Flow craft-duyarlı, aceleyle dokunulmaz; her craft-etkili değişim iki tema + cursor/scroll etkileşimi **gözle** doğrulanır.
- **Sayfa kapsamı = yalnız ana sayfa, TR `/` mobil-birincil.** Taban/track noktası ve en ağır sayfa burası (`/en`'den uzun hero metni → daha ağır); masaüstü zaten bütçede. Alt-sayfa perf profili sonraki faza bırakıldı.
- **LCP elementi research'te tespit edilir.** Hero metni mi static flow zemini mi olduğu ampirik bilinmiyor; discuss'ta varsayım yapılmadı, optimizasyon research bulgusuna göre hedeflenir.
- **Ölçüm/kabul metodolojisi yerleşik (`docs/perf/README.md`).** TR `/` mobil median · `NEXT_LOCALE=tr` cookie (yoksa `/en` ölçülür — DEV-6 dersi) · fresh prod build (`rm -rf .next && next build && next start`) · düşük host-yük (`cat /proc/loadavg`) · 3+ koşu median · regresyon karşılaştırmasında hep aynı locale. Faz sonunda kanonik perf artefaktları (`home-{mobile,desktop}-<tarih>.{html,json}`) güncellenir.

### Kullanıcı Tercihleri

- Hedef sertliği: **Brief hedef, craft tavan** (üç seçenek arasından — kesin-≥95 ve yalnız-regresyonsuz reddedildi).
- Living Flow müdahalesi: **Önce çevre, sonra ayarlı degradasyon** (agresif sadeleştirme ve "yalnız WebGL-dışı" reddedildi — degradasyon ayarı kapsamda ama craft korunarak).
- Sayfa kapsamı: **Yalnız ana sayfa (TR `/` mobil-birincil)** (alt sayfalar dahil değil).
- Türetilen kapsam (milestone craft-tavan çerçevesi, guardrail'ler, kapsam dışı — hero kopyası dokunulmaz, font/render-path serbest) açıkça onaylandı.

### Guardrail (regresyon yasağı — pazarlık dışı)

- **a11y = 100 çift-tema** (Faz 4 kazanımı) — CI a11y job (`.github/workflows/ci.yml`) her push/PR'da otomatik yakalar.
- **CLS = 0** (ortam-bağımsız, en güvenilir sinyal).
- **Masaüstü perf 99-100** — düşmez.
- **i18n parite** — perf işi içerik anahtarına dokunmamalı; dokunursa 5 dil (tr/en/ar/de/es) eşzamanlı (i18n parite tohumu otomatik yakalar). Yalnız değer değil **anahtar** karşılaştırılır.

### Kapsam Dışı

- **Umami analytics (E1)** — ayrı iş kolu/faz (`docs/UMAMI-ANALYTICS.md`).
- **Alt-sayfa perf profili** — bu faz ana sayfa-birincil; alt sayfalar sonraki faza.
- **Alt-sayfa derin a11y + `text-pulse` ink-panel dark-inversion süpürmesi** (Faz 4 devri, sahipli borç) — perf fazı değil; harness hazır, sonraki a11y/alt-sayfa fazına yönlendirildi.
- **Hero kopyası / içerik değişikliği** — içerik Faz 1'de donduruldu; TR hero ağırlığı kopya kısaltarak değil font yükleme/render-path ile ele alınır (craft/marka sesi korunur).
- **Masaüstü perf** — zaten brief bütçesinde (99-100 / LCP <0.8s).
- **Living Flow'un agresif/cömert sadeleştirilmesi veya mobilde tümüyle static'e zorlanması** — craft tavan kararıyla reddedildi (degradasyon ayarı yalnız craft korunarak, ölçülü).

---

## Araştırma Bulguları

> `/devflow:research-phase 6` oturumunda dolduruldu (2026-06-30). Yöntem: node/build yok (taze devcontainer) → **mevcut Lighthouse JSON artefaktları** (`docs/perf/home-{mobile,desktop}-20260630.json`, TR `/`) diagnostic-okuma + kaynak kodu analizi. Ölçüm-temelli, projeye özgü.

### Kök Neden — CPU-bound main-thread WebGL işi (throttle altında)

TR `/` mobil diagnostic (Lighthouse 13.3.0, 4× CPU throttle, Moto-G sınıfı) vs masaüstü (throttle yok), aynı build:

| Metrik | Mobil (TR `/`) | Masaüstü (TR `/`) | Yorum |
|---|---|---|---|
| LCP | **3604 ms** (skor 0.61) | 765 ms | Fark = saf CPU throttle |
| FCP | 1657 ms | 368 ms | FCP→LCP boşluğu mobilde **1.9s** |
| mainthread **"Other"** | **3663 ms** | 1202 ms | WebGL init (Three.js + GLSL compile) |
| mainthread Script Eval | 722 ms | 188 ms | — |
| mainthread toplam | 5012 ms (skor **0**) | — | — |
| TBT | 270 ms | — | bütçe-içi |
| server-response | 4 ms (localhost) | — | yerel iyimser; Vercel'de farklı |

**Teşhis:** Masaüstüyle birebir aynı build/sayfa, tek fark CPU throttle. WebGL init'in "Other" işi (shader compile + sahne kurulumu) throttle altında 1.2s→3.7s'e şişip main-thread'i **LCP penceresinde** bloke ediyor. FCP (server-render'lı hero metni) ~1.7s'te boyanıyor ama LCP 3.6s'e kayıyor — boşluk bu bloke penceresi. (Kaynak: `docs/perf/home-{mobile,desktop}-20260630.json`.)

### Değerlendirilen Yaklaşımlar (lever'lar)

- **L1 — Hero reveal'i opacity yerine transform-only yap. [SEÇİLDİ · P1 · craft-koruyucu]**
  Bulgu: `src/components/Hero.tsx:18` (repoda-tanımlı/site) `gsap.set("[data-hero]", { opacity: 0, y: 36 })` hero `<h1>`'i server-render sonrası **opacity:0'a** çekip ~1.1s timeline ile reveal ediyor; Lighthouse reduced-motion set etmediği için (`docs/perf/README.md` metodoloji) ölçümde de çalışır. `opacity:0` elementi LCP adaylığından çıkarır → LCP geç paint'e kayar; reveal hydration'a, hydration ağır WebGL bundle'ına bağlı.
  - **Artı:** İmza reveal hareketi görsel olarak korunur (transform/y aynen); headline LCP-uygun kalır. WebGL'den bağımsız (P1).
  - **Eksi:** Reveal'in opacity-fade'i kaybolur (yalnız kayma kalır) — kullanıcı kararıyla kabul edildi.
  - **Alternatifler (reddedildi):** headline'ı reveal'den çıkarmak (koreografi headline'da kaybolur); reveal'e dokunmadan yalnız WebGL deferral (metin LCP ise ceza kalır).

- **L2 — WebGL init'ini mobilde LCP penceresi dışına ertele (idle/post-load). [SEÇİLDİ · P1/render-path · craft-koruyucu]**
  Bulgu: `src/components/living-flow/LivingFlow.tsx:40` (repoda-tanımlı/site) init'i yalnız **1 rAF** geciktiriyor → main-thread'i LCP penceresinde bloke ediyor. LCP elementi canvas ise erteleme hero metnini LCP yapar (→ ~1.7s, bütçe-altı); metin ise main-thread'i boşaltıp reveal/LCP'yi öne çeker. İki senaryoda da kazanç.
  - **Artı:** Tek en büyük lever olabilir; craft-koruyucu (flow mobilde ~0.5-1s geç belirir, görsel kalite aynı).
  - **Eksi:** Flow'un mobilde geç belirmesi gözle doğrulanmalı (craft tavan).
  - **Alternatif:** IntersectionObserver + idle (daha akıllı, biraz karmaşık, aynı LCP kazancı) — şimdilik idle/post-load tercih, gerekirse task'ta IO'ya yükseltilir.

- **L3 — Fraunces font eksenlerini buda (SOFT/WONK kaldır). [ADAY · P1 · craft-nötr]**
  Bulgu: `src/app/[locale]/layout.tsx:13` (repoda-tanımlı/site) `axes: ["opsz","SOFT","WONK"]` — ama SOFT/WONK hiçbir yerde `font-variation-settings` ile **kullanılmıyor** (grep ile doğrulandı: yalnız `font-display`/`--font-fraunces` kullanımı var). Variable font bu ölü eksen verisini taşıyor. Font yükü ~273KB (4 woff2: 121KB+105KB+29KB+16KB). `display:"swap"` → headline fallback'te boyanıp Fraunces gelince swap eder (LCP'yi oynatabilir).
  - **Artı:** Eksenleri budamak craft-nötr (kullanılmadıkları için görsel çıktı birebir aynı), woff2 küçülür. `not-found.tsx:9` aynı tanımı tekrarlıyor — birlikte güncellenir.
  - **Eksi:** Kazanç görece küçük (LCP'nin ana kapısı CPU, network değil — localhost'ta gizli; Vercel'de daha görünür).

- **L4 — Three.js chunk küçültme. [REDDEDİLDİ/düşük öncelik]**
  Bulgu: `bd904a5c.*.js` chunk 100KB'ın **84KB'ı kullanılmıyor** (unused-javascript; three'nin büyük kısmı). Tree-shake three için zor; download/parse maliyeti (TBT'ye katkı) ama LCP'nin ana kapısı **main-thread "Other"**, bu değil. Kapsam-dışı bırakıldı.

- **Seçilen:** L1 + L2 (P1, craft-koruyucu, en yüksek etki) → L3 (craft-nötr yardımcı) → L2'nin yetmediği yerde P2 degradasyon ayarı (DPR cap/particle, discuss'ta onaylı). Sıra: önce ölç (LCP elementini kesinleştir), sonra L1/L2, ara-ölç, gerekirse L3/P2.

### Kullanılacak Araçlar/Kütüphaneler

- **Yeni paket yok.** Tüm lever'lar mevcut stack içinde (GSAP timeline ayarı, `requestIdleCallback`/timeout, `next/font/google` axes parametresi, R3F/three deferral). Paket ekleme/çıkarma yok → `package.json` dokunulmaz korunur.
- **Ölçüm:** mevcut yerleşik metodoloji (`docs/perf/README.md`) — fresh prod build + Lighthouse npx-cache (13.3.0) + `NEXT_LOCALE=tr` cookie + median + `cat /proc/loadavg`. **Ek:** ölçüm task'ı Lighthouse'u `largest-contentful-paint-element` denetimini **içerecek** şekilde koşmalı (mevcut artefaktlar kürlenmiş diagnostic setiyle koşmuş, bu denetim yok → LCP elementi henüz teyitli değil).
- **Not (ortam):** Bu oturumun devcontainer'ında node/npm **yok** — ölçüm/build gerektiren task'lar node'lu ortamda koşulmalı (MEMORY ortam notu).

### Dikkat Edilecekler

- **LCP elementi AMPİRİK TEYİTLİ (TASK-6.01, 2026-06-30): HERO METNİ — canvas/static-flow zemini DEĞİL.** Mobil LCP = `<p data-hero="sub">` (hero alt-başlık metni); masaüstü LCP = `<span data-hero="l2">` (hero `<h1>` yeşil satırı); 5 mobil + 3 masaüstü koşuda stabil. Her iki element `Hero.tsx:18` reveal'inin `opacity:0`'ı altında → reveal LCP'yi geciktirir. **Lever önceliği çıkarımı: L1 (hero reveal transform-only, TASK-6.02) doğrudan LCP elementini hedefler → yüksek etki, sıradaki adım. L2 (WebGL deferral) main-thread/TBT'yi boşaltır — bu ölçüm ortamında software-WebGL TBT'si baskın (1842ms), L2 burada da güçlü.** Not: LH 13.3.0'da eski `largest-contentful-paint-element` audit'i yok; element `lcp-breakdown-insight`'tan okundu (`docs/perf/README.md` Faz 6 bölümü + `home-mobile-20260630-lcp.json`).
- **Craft tavan (pazarlık dışı):** L1/L2 craft-etkili → her değişim **iki tema + cursor/scroll etkileşimi gözle** doğrulanmalı (discuss guardrail). Flow'un mobilde geç belirmesi kabul ama "kayıp/bozuk" görünmemeli.
- **Lighthouse reduced-motion set etmez** → hero reveal + full-yük WebGL ölçülür (gerçekçi en-kötü). L1 fix'i bu yüzden ölçülebilir; doğrulamada reduced-motion'lı axe taraması ayrı (a11y envanteri).
- **i18n parite:** Lever'lar içerik anahtarına dokunmuyor (font axes/JS/GSAP/deferral kod-only) → 5 dil eşzamanlılığı bozulmaz. `layout.tsx` + `not-found.tsx` font tanımı **birlikte** güncellenir (drift önleme).
- **Korunan tabanlar regresyonsuz:** a11y=100 çift-tema (CI yakalar), CLS=0, masaüstü perf 99-100. L2 deferral CLS yaratmamalı (canvas absolute/pointer-events-none, layout dışı — risk düşük ama ölçülür).
- **Locale ölçüm tuzağı:** TR `/` için `NEXT_LOCALE=tr` cookie şart; cookie'siz `/en` ölçülür (DEV-6 dersi). Regresyon karşılaştırmasında hep aynı locale.

### Teknik Kararlar

- **K-R1: Hero reveal opacity yerine transform-only.** Gerekçe: `opacity:0` LCP adaylığını kırar; transform LCP-nötr. İmza hareketi (kayma) korunur, fade feda edilir (kullanıcı onayı). Craft-koruyucu, WebGL-bağımsız en yüksek etki.
- **K-R2: WebGL init'i mobilde idle/post-load'a ertele.** Gerekçe: main-thread'i LCP penceresinde boşaltır; LCP elementi ne olursa olsun kazandırır. Flow ~0.5-1s geç belirir (yalnız mobil, gözle doğrulanır). IntersectionObserver'a yükseltme task'a açık.
- **K-R3: Fraunces SOFT/WONK eksenlerini buda (craft-nötr yardımcı).** Gerekçe: kullanılmıyorlar → görsel birebir aynı, woff2 küçülür. `layout.tsx` + `not-found.tsx` birlikte.
- **K-R4: Ölç-önce sıralaması.** İlk task LCP elementini ampirik sabitler (element denetimli Lighthouse); lever uygulama ve P2 degradasyon ayarı ölçüm bulgusuna göre. Three.js chunk küçültme kapsam-dışı (LCP kapısı değil).

---

## Task Listesi

> `/devflow:plan-phase 6` oturumunda dolduruldu (2026-06-30). Sıra: ölç-önce → L1 → L2 → ara-ölç → L3 → P2(koşullu) → faz-sonu ölçüm. Ölçüm task'ları (6.01/6.04/6.07) node'lu ortam gerektirir (bu oturum devcontainer'ında node yok → o task'larda 🔴 olabilir).

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 6.01 | TASK-6.01 | ✅ Tamamlandı | Ölç-önce: LCP elementi = **hero metni** (ampirik); TR `/` mobil element-denetimli taban (perf 62 · LCP 3608ms, software-GL ortamı) — L1 yüksek-etki doğrulandı |
| 6.02 | TASK-6.02 | ✅ Tamamlandı | L1: Hero reveal opacity→transform-only (`Hero.tsx`) — `opacity:0` kaldırıldı, kayma imzası+timing korundu; hero LCP-uygun, build temiz, CLS=0 |
| 6.03 | TASK-6.03 | ✅ Tamamlandı | L2: WebGL init mobilde idle/post-load deferral (`LivingFlow.tsx`) — `requestIdleCallback`+2s-timeout (Safari: post-load fallback); masaüstü rAF korundu, build temiz, CLS=0 |
| 6.04 | TASK-6.04 | ⬜ Bekliyor | Ara-ölç: L1+L2 sonrası median + L3/P2 karar kapısı |
| 6.05 | TASK-6.05 | ⬜ Bekliyor | L3: Fraunces SOFT/WONK axes budama (`layout.tsx`+`not-found.tsx`) — craft-nötr, woff2 küçülür |
| 6.06 | TASK-6.06 | ⬜ Bekliyor | P2: Living Flow mobil degradasyon ayarı (DPR/particle/erken-static) — **koşullu** (6.04 brief'i karşılamadıysa) |
| 6.07 | TASK-6.07 | ⬜ Bekliyor | Faz sonu ölçüm + kanonik artefakt + DECISIONS + guardrail regresyon |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 6` oturumunda doldurulacak.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 6` oturumunda doldurulacak.

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 6` oturumunda doldurulacak.

---

## Sonuç

> Bu bölüm `/devflow:review-phase 6` oturumunda doldurulacak.

---

**Oluşturulma:** 2026-06-30
**Son Güncelleme:** 2026-06-30 — run-task TASK-6.03 ✅ (L2): `LivingFlow.tsx` WebGL init mobilde (low-power) 1-rAF → `requestIdleCallback`+2s-timeout (Safari: post-load+200ms fallback) ile LCP penceresi dışına ertelendi; masaüstü rAF regresyonsuz korundu. Static base wash erteleme boyunca render (SSR `tr.html`'de mevcut, `<canvas>`=0 → hero boş kalmaz). Build temiz (37/37); tüm yollarda unmount cleanup; CLS=0 yapı gereği. İcra notu: TS strict `"prop" in window` negatif dalda `window`'u `never`'a daraltır → guard `typeof window.requestIdleCallback === "function"`'a alındı (retro adayı). Gözle craft (flow geç-ama-akıcı, light+dark, cursor/scroll) + main-thread "Other" LCP-dışı median teyidi: 6.04 ara-ölç + gerçek tarayıcı kullanıcı onayı. Sıradaki: TASK-6.04 (ara-ölç: L1+L2 median + L3/P2 karar kapısı).
