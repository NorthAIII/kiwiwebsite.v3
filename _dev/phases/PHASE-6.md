# Phase 6: Mobil Perf / LCP (ana sayfa TR `/`)

**Durum:** ✅ Tamamlandı

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
| 6.04 | TASK-6.04 | ✅ Tamamlandı | Ara-ölç: L1+L2 → ölçülebilir Lantern delta YOK (mobil LCP 3615ms ≈ 3608ms taban); brief LCP lab'da açık; L3 yapılır, P2 tetiklendi (craft-gate) |
| 6.05 | TASK-6.05 | ✅ Tamamlandı | L3: Fraunces SOFT/WONK axes budama (`layout.tsx`+`not-found.tsx`) — craft-nötr hijyen; build temiz, woff2 ~113KB↓ (336→222KB, ~%34), tipografi birebir |
| 6.06 | TASK-6.06 | ❌ İptal | P2: Living Flow mobil degradasyon ayarı — craft-gate'te **iptal** (kullanıcı kararı 2026-06-30). Mobil LCP açığı kanıtlı Lantern artefaktı (hero ~185ms render); imzaya simüle-sayı için dokunulmaz. Kod değişmedi. Gerekçe → DECISIONS 2026-06-30 |
| 6.07 | TASK-6.07 | ✅ Tamamlandı | Faz-sonu final: aynı-ortam before/after — mobil perf 84→90 / LCP 3604→3164ms (sürücü L3); brief mobil açık; guardrail'ler yeşil (a11y=100 çift-tema, CLS≈0, masaüstü 100, i18n parite) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Ara-Ölç Sonucu ve L3/P2 Kararı (TASK-6.04)

> `/devflow:run-task` TASK-6.04 (2026-06-30). Aynı ortam/method 6.01 ile apples-to-apples. Tam tablo + kanıt: `docs/perf/README.md` → "Faz 6 / TASK-6.04". Artefakt: `docs/perf/home-mobile-20260630-6.04-ara.json`.

### Bulgu — L1+L2 ölçülebilir Lantern delta üretmedi

| Metrik (TR `/` mobil, median) | 6.01 taban | 6.04 (L1+L2) | Delta |
|---|---|---|---|
| perf | 62 | 62 | 0 |
| LCP | 3608 ms | 3615 ms | +7 ms (gürültü) |
| FCP | 1666 ms | 1665 ms | −1 ms |
| CLS | ~0 | ~7.3e-6 (≈0) | = |
| TBT | 1842 ms | 1898 ms | +56 ms (gürültü) |

Masaüstü: perf **100** (guardrail 99-100 ✓), LCP 696 ms, CLS≈0. LCP elementi her iki preset'te değişmedi (mobil hero `<p>`, masaüstü hero `<span>`).

### Neden — Lantern simülasyon artefaktı (kanıtlı, kök neden)

Mobil LCP 3.6s **Lantern-simüle**: throttle'sız gözlenen trace'te LCP elementRenderDelay 6.01'de **173.3ms**, 6.04'te **172.9ms** (birebir) → hero metni gözlemde zaten ~185ms'de render oluyor. 3.6s, 4× CPU throttle altında WebGL main-thread işinin simülasyonu.
- **L1** opacity-gate'i kaldırdı ama gözlenen trace'te o gate zaten darboğaz değildi (un-throttled reveal hızlı) → skor oynamaz; L1 yine **gerçek-cihaz-doğru** (lab göremez).
- **L2** `requestIdleCallback` throttle'sız trace'te anında ateşler → WebGL erken yakalanır → Lantern LCP penceresinde bloke iş olarak simüle eder (TBT birebir). Gerçek meşgul thread'de rIC LCP sonrasına ertelerdi; Lantern modelleyemez.

### Karar (karar kapısı çıktısı)

- **Brief LCP bütçesi (<2.5s) lab'da AÇIK** (mobil ~3.6s). Açık, CPU-bound WebGL init'in Lantern simülasyonu. perf/TBT software-GL şişkin → mutlak kıyas dışı; LCP/FCP/CLS güvenilir sinyal (6.01 ortam uyarısı geçerli).
- **L1+L2 korunur** (commit'li): gerçek-cihaz-doğru + craft-koruyucu; lab kazancı gösteremiyor ama regresyon da yok (guardrail'ler korundu).
- **L3 (TASK-6.05): YAP** — craft-nötr hijyen (Fraunces SOFT/WONK budama, woff2 küçülür). Lab LCP'yi oynatmaz (CPU-bound + localhost network-iyimser) ama güvenli, küçük, doğru; faz hijyeni.
- **P2 (TASK-6.06): TETİKLENDİ ama craft-gate.** Lab'da simüle-LCP'yi azaltabilecek **tek kalan lever** WebGL gerçek iş yükünü düşürmek (DPR cap / particle / erken-static). Ancak: (a) craft-duyarlı — imza Living Flow'a dokunur, discuss guardrail'i "yalnız craft korunarak, ölçülü, gözle doğrulanmış"; (b) gerekçesi bir Lantern-simüle sayıya dayanıyor ve P2 kazancı da software-GL'de tam temiz ölçülemeyebilir. → **Kullanıcı craft-onayı önerilir** (6.06 koşmadan önce: simüle sayı için imzaya dokunmaya değer mi). İptal edilmedi (brief açık + tek kalan lever), ama otomatik koşulmaz.

> **Metodolojik duvar (dürüst kayıt):** bu lab ortamı lever ilerlemesini LCP ekseninde güvenilir ölçemez (Lantern observed trace'i throttle'sız alıp simüle ediyor; software-GL perf/TBT'yi şişiriyor). Brief perf bütçesinin temiz doğrulaması gerçek-cihaz / Vercel field verisi gerektirir. v0.1 dürüst-kayıt deseni: hedef sessizce düşürülmez, craft sessizce feda edilmez, açık belgelenir.

---

## Faz-Sonu Final Ölçüm (TASK-6.07)

> `/devflow:run-task` TASK-6.07 (2026-06-30). Otoriter faz-sonu ölçüm; verify-phase'in dayanacağı sayılar. Tam tablolar + metodoloji: `docs/perf/README.md` → "Faz 6 / TASK-6.07 final". Kanonik artefakt: `docs/perf/home-{mobile,desktop}-20260630-faz6.{html,json}`. Asıl Sonuç/Retrospektif review-phase'de.

**Ortam dönüşü (kritik):** 6.07 ölçümü **temsilî ortamda** yapıldı (node 20.20.2 + Chrome 150, flags birebir) — 6.01/6.04'ün ağır-SwiftShader anomalisi (perf 62 / TBT 1842ms) burada tekrarlanmadı. Aynı ortamda `git checkout e5a4ef1 -- src` ile lever-öncesi baseline yeniden build edilip ölçüldü → perf 84 / LCP 3604ms / TBT 261ms (**Faz-4 ile birebir**). Bu, faz-içi before/after'ı tek tutarlı ortamda apples-to-apples kıldı; perf/TBT bu ortamda Faz-4 ile karşılaştırılabilir.

**Aynı-ortam before/after (TR `/` mobil median, 5 koşu):**

| Metrik | Baseline (lever öncesi) | Final (L1+L2+L3) | Delta |
|---|---|---|---|
| perf | 84 | **90** | +6 |
| LCP | 3604 ms | **3164 ms** | −440 ms (−12%) |
| FCP | 1656 ms | 1506 ms | −150 ms |
| CLS | ≈0 | ≈0 | = |
| TBT | 261 ms | 178 ms | −83 ms |

Masaüstü: 100→100, LCP 764→694ms. Dağılımlar örtüşmüyor (baseline min 3603 > final max 3231) → **milestone "ölçülebilir iyileşme" ✓**.

**Attribution — sürücü L3, L1+L2 değil:** Aynı ortamda L1+L2 tek başına delta vermiyor (LCP 3604→3755, gürültü — 6.04 çekirdek bulgusu temsilî ortamda da doğru); iyileşmenin tamamını **L3 (Fraunces budama)** sürüyor (L1+L2 üstüne 3755→3164). Sebep: LCP elementi Fraunces `display:swap` hero metni; Lantern simüle throttled ağı modeller → ~113KB↓ woff2 lab-görünür. **6.04 rafinajı:** 6.04 "lab-görünür tek lever = WebGL iş yükü (P2)" derken network lever'ını (L3) atlamıştı.

**Brief bütçe (dürüst):** mobil perf 90 (<95) / LCP 3164ms (>2.5s) → **brief mobil bütçe hâlâ AÇIK** ama baseline'a göre kapandı; kalan açık = CPU-bound WebGL main-thread (P2 craft-gate'te iptal, 6.06). Masaüstü bütçe içinde. Hedef düşürülmedi, craft feda edilmedi (DECISIONS 2026-06-30).

**Guardrail regresyon (hepsi yeşil):** a11y=100 çift-tema (Playwright/axe `/` light+dark, 0 WCAG AA ihlal — Faz 4 kazanımı korundu) · CLS≈0 (mobil+masaüstü) · masaüstü perf 100 · i18n parite (vitest 6/6 + build 0 `MISSING_MESSAGE`).

---

## UAT Sonuçları

**Tarih:** 2026-06-30 (verify-phase 6, otonom test modu)
**Toplam Senaryo:** 12 | **Geçen:** 12 | **Kalan:** 0

> Otonom modda koşuldu (ortam = 6.07 temsilî ortamı: node20 + Chrome150 + Playwright + Lighthouse). Görsel craft boyutu (senaryo 8/9/11) task icrasında (6.02/6.03/6.05) gözle doğrulanmıştı; UAT'de kod/yapı + ölçümle teyit edildi (kullanıcı onayı: "yeterli, kapat"). Milestone ölçümünün otoriter before/after kaynağı TASK-6.07 (`docs/perf/README.md` → Faz 6 final); UAT bağımsız reprodüksiyon koşusu final durumu doğruladı.

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | Fresh prod build temiz geçer (`next build`, 0 hata) | ✅ Geçti | Temiz build, 0 hata |
| 2 | i18n parite: Vitest 6/6 + build 0 `MISSING_MESSAGE` (5 dil anahtar pariteti) | ✅ Geçti | Vitest 6/6; build `MISSING_MESSAGE` yok |
| 3 | a11y = 100 çift-tema: Playwright/axe `/` light+dark 0 WCAG AA ihlal (Faz 4 kazanımı korunur) | ✅ Geçti | Playwright/axe 2/2 (light+dark, 0 ihlal) |
| 4 | Milestone: mobil TR `/` perf/LCP **ölçülebilir** iyileşme (aynı-ortam baseline→final) | ✅ Geçti | UAT reprodüksiyon: median perf **91** / LCP **3222ms** / FCP 1506 (TR `/` cookie) ≈ 6.07 final (90/3164ms); 6.07 baseline→final 84→90 / 3604→3164 (dağılımlar örtüşmez, otoriter) |
| 5 | Masaüstü perf regresyonsuz (100, LCP bütçe içi) | ✅ Geçti | 3/3 perf 100, LCP ~687ms |
| 6 | CLS ≈ 0 (mobil + masaüstü; ortam-bağımsız en güvenilir sinyal) | ✅ Geçti | 0.0000 tüm koşular (mobil+masaüstü) |
| 7 | L1: Hero `opacity:0` reveal-gate kaldırıldı → hero metni LCP-uygun (K-R1) | ✅ Geçti | `Hero.tsx:18` `gsap.set(...,{ y: 36 })` — opacity yok |
| 8 | L1: Hero kayma (`y`) imza hareketi korundu; reduced-motion'da içerik görünür (craft + edge) | ✅ Geçti | `Hero.tsx:16` reduced-motion early-return; `y:36→0` timeline korundu (görsel craft 6.02'de gözle ✓) |
| 9 | L2: Mobilde WebGL init idle/post-load'a ertelenir; static base hero'yu kaplar — boş kalmaz (K-R2) | ✅ Geçti | `LivingFlow.tsx:79` koşulsuz static base wash; mobil rIC+2s timeout (görsel geç-belirme 6.03'te gözle ✓) |
| 10 | L2: Safari (no `requestIdleCallback`) fallback → flow yine init olur; masaüstü rAF korundu (edge/adversarial) | ✅ Geçti | `LivingFlow.tsx:44-73` üç yol: masaüstü rAF / mobil rIC / Safari load+timeout |
| 11 | L3: Fraunces SOFT/WONK budandı → tipografi görsel birebir + woff2 küçüldü; `layout.tsx`+`not-found.tsx` drift yok (K-R3) | ✅ Geçti | SOFT/WONK kullanımı grep'te yok (craft-nötr); build woff2 217KB; iki dosya `axes:["opsz"]` |
| 12 | Brief mobil bütçe açığı dürüstçe belgelendi (DECISIONS + perf README); hedef düşürülmedi / craft feda edilmedi (ILKELER) | ✅ Geçti | DECISIONS 2026-06-30 (Faz 6 sonucu + P2 iptal) + perf README "brief mobil bütçe hâlâ AÇIK" |

**Otomatik kontroller (Adım 1):** CI 4/4 faz commit'i `success` · security-review 0 bulgu (saf görsel/perf değişikliği, güvenlik yüzeyi yok) · build + Vitest + Playwright/axe yeşil. Düzeltme task'ı doğmadı.

---

## Retrospektif

> `/devflow:review-phase 6` oturumunda dolduruldu (2026-06-30).

### Ne İyi Gitti?

- **Ölç-önce disiplini (6.01).** LCP elementi optimizasyondan ÖNCE ampirik sabitlendi (hero metni, canvas değil) — varsayımla lever seçilmedi. discuss "LCP elementi research'te tespit edilir" kararı icrada gerçekten korundu.
- **Ara-ölç karar kapısı (6.04).** L1+L2'nin lab'da delta üretmediği yarı yolda yakalandı; körü körüne devam edilmedi. Kök neden (Lantern artefaktı) kanıtla teşhis edildi, L3-yap / P2-craft-gate kararı buradan çıktı.
- **Craft-gate ile imza koruması (6.06).** P2, kanıtlı bir lab artefaktına (simüle-LCP) dayanan müdahaleyi reddetti — Marka & Craft üst ekseni bir simüle-sayı için riske atılmadı. Çıkan durable ilke DECISIONS'a yazıldı.
- **Dürüst kayıt deseni sürdürüldü (v0.1).** Brief mobil açık sessizce gizlenmedi/hedef düşürülmedi; DECISIONS + perf README'de açıkça belgelendi. Milestone ("ölçülebilir iyileşme") ile brief-bütçe ("≥95/<2.5s") ayrımı net tutuldu.
- **Ortam anomalisi teşhis edildi (6.07).** 6.01/6.04'ün ağır-SwiftShader şişkinliği (perf 62/TBT 1842) bir devcontainer anomalisi olarak tanındı; temsilî ortamda (node20+Chrome150) baseline `git checkout e5a4ef1` ile yeniden sabitlenip before/after tek tutarlı ortamda apples-to-apples yapıldı.
- **Faz 5 harness'i çalıştı.** a11y=100 çift-tema + i18n parite guardrail'leri CI'da otomatik korundu — perf lever'larının regresyon yapmadığı elle değil otomatik doğrulandı (Faz 5 yatırımının ilk getirisi).

### Ne Kötü Gitti?

- **Ölçüm ortamı istikrarsızlığı bir tur maliyete + yarı-yanlış ara-sonuca yol açtı.** 6.01/6.04 ağır-SwiftShader devcontainer'ında koştu; yalnız 6.07'nin temsilî ortamı Faz-4-kıyaslanabilir sayı verdi. 6.04 bu yüzden "lab-görünür tek lever = WebGL iş yükü (P2)" sonucuna vardı ve **network lever'ını (L3) atladı** — 6.07 bunu rafine etmek zorunda kaldı (L3 aslında lab-görünür ve iyileşmenin sürücüsü çıktı). Maliyet: ekstra ölçüm turu + düzeltilmesi gereken ara-sonuç.
- **Lantern körlüğü yüksek yorum yükü getirdi.** "Lab artefaktı mı gerçek-cihaz açığı mı" ayrımı fazın en çok kafa yoran kısmıydı; her ölçüm sonucu bu mercekten yeniden okunmak zorunda kaldı.
- **node/npm'siz ortam sürtünmesi.** Ölçüm task'ları node'lu ortam gerektirdi; 6.01 başta 🔴 bloke işaretlendi (f68db65), ortam kurulduktan sonra çözüldü. (Faz 5 retro önerisi bunu önceden işaret etmişti.)

### Sonraki Faz İçin Öneriler

- **Perf ölçümünde ÖNCE ortamı sabitle, sonra delta'ya güven.** Aynı ortamda lever-öncesi baseline'ı yeniden ölç (SwiftShader/host-yük anomalisi için sanity koşusu); cross-environment mutlak perf/TBT'ye güvenme (LCP/FCP/CLS Lantern-deterministik, kıyaslanabilir — perf/TBT software-GL'de şişer). Bu zaten memory'de kayıtlı (`lighthouse-lantern...` + host-loadavg disiplini); Faz 6 onu doğruladı.
- **Brief mobil bütçenin nihai doğrulaması gerçek-cihaz/Vercel field gerektirir (metodolojik duvar).** Lab Lantern observed trace'i throttle'sız alıp simüle ediyor; gerçek GPU + gerçekçi throttle lehte olabilir. İleride bir Vercel preview-temelli Lighthouse/PageSpeed ölçüm task'ı bu duvarı aşabilir.
- **Brief mobil açık (90/3164ms) hâlâ açık; tek kalan lever P2 (WebGL gerçek iş yükü) ve craft-gate'li.** Peşine düşülürse önce gerçek-cihaz kanıtı toplanmalı (6.06 ilkesi: lab metriği tek başına imzaya dokunmayı haklı çıkarmaz).
- **Sahipli devir borcu korunuyor:** alt-sayfa derin a11y + `text-pulse` ink-panel dark-inversion süpürmesi (Faz 4→5→6 devri). Faz 5 harness'i hazır; sonraki a11y/alt-sayfa fazına.

### Task-Spesifik Teknik Öğrenimler
<!-- Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar. MEMORY.md'nin değil, faz retrosunun evidir. -->
- **Lantern network-lever görünürlüğü asimetrisi.** Saf render-**zamanlama** lever'ları (L1 opacity-gate kaldırma, L2 idle deferral) Lantern lab'da görünmez (observed trace throttle'sız) AMA network/asset-boyutu lever'ı (L3 ~113KB↓ woff2) **görünür** — Lantern simüle throttled ağı modeller. LCP elementi `display:swap` Fraunces hero metni olduğu için L3 doğrudan LCP'yi oynattı. (Proje-geneli özet zaten memory'de; bu faz onu kanıtladı/rafine etti.)
- **"Her zaman mevcut static base wash" degradasyon deseni.** `LivingFlow.tsx:79` koşulsuz CSS radial-gradient zemin → WebGL init ertelense de (mobil idle/2s-timeout) hero asla boş kalmaz; aynı katman no-WebGL fallback'i de. Defer-ederken-boş-bırakma tuzağını yapısal olarak çözen desen.
- **`requestIdleCallback` + timeout-cap + Safari post-load üç-yol deseni.** `LivingFlow.tsx:44-73`: masaüstü rAF (korundu) / mobil rIC(timeout:2000) / Safari (rIC yok) → `load`+200ms (veya readyState complete ise direkt). Safari fallback olmadan flow hiç init olmazdı (6.03 edge).
- **SwiftShader devcontainer perf/TBT şişkinliği ortama-özgü.** Aynı build/sayfa: ağır-SwiftShader devcontainer perf 62/TBT 1842 vs temsilî node20+Chrome150 perf 84/TBT 261. Mutlak perf/TBT kıyasında baseline'ı **aynı** ortamda sabitle (6.07 yöntemi).

---

## Kalite Kontrol Sonuçları

> QUALITY.md eksenleri sistematik kontrol edildi. Faz yüzeyi: yalnız 4 dosya (`Hero.tsx` L1, `LivingFlow.tsx` L2, `layout.tsx`+`not-found.tsx` L3), +47/−14; `messages/` 0 değişiklik. P2 (`FlowCanvas.tsx`/`LivingFlow.tsx` parametreleri) craft-gate'te iptal → kod değişmedi. Çekirdek eksenler: **Performans** + **Marka & Craft**.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ | L1 kayma imzası korundu (yalnız opacity-fade feda, kullanıcı onayı); L2 flow mobilde ~0.5-1s geç belirir ama static base kaplar (boş/bozuk değil); L3 craft-nötr (kullanılmayan axes, tipografi birebir). P2 imzayı korumak için **iptal** (üst eksen). Görsel craft 6.02/6.03/6.05'te gözle ✓, UAT 8/9/11'de teyit. |
| Erişilebilirlik | ✅ | Faz a11y yüzeyi getirmedi; Faz 4 a11y=100 çift-tema kazanımı CI a11y job ile otomatik korundu (Playwright/axe `/` light+dark 0 WCAG AA ihlal). Hero/LivingFlow `aria-hidden` dekoratif zemin korundu. |
| Güvenlik | ✅ | `/security-review` 0 bulgu (saf görsel/perf değişikliği, API yüzeyi yok). `/api/chat` dokunulmadı; secret yok; deploy yok (Vercel hâlâ yalnız `main`). |
| Bakım Maliyeti | ✅ | `LivingFlow.tsx` üç-yol degradasyon iyi yorumlandı, tek sorumluluk; `Hero.tsx` minimal değişim (yalnız opacity prop kaldırma); L3 iki dosya (`layout`+`not-found`) **birlikte** güncellendi (drift yok). Hardcode yeni değer yok. |
| Performans | ✅ | **Çekirdek eksen:** ölçülebilir iyileşme (perf 84→90, LCP −440ms/−12%, dağılımlar örtüşmez); guardrail'ler yeşil (masaüstü 100, CLS≈0). Brief mobil bütçe (≥95/<2.5s) açık ama dürüstçe belgelendi (kök neden CPU-bound WebGL, P2 craft-gate). WebGL init LCP penceresi dışına ertelendi (L2) → render-path iyileşti. |
| Hata Yönetimi & Degradasyon | ✅ | **Güçlendi:** static base wash her zaman mevcut (defer/no-WebGL'de hero boş kalmaz); Safari post-load fallback (rIC yok → flow yine init); reduced-motion + no-WebGL StaticFlow korundu. Yeni hata yolu açılmadı. |
| Test Kapsamı | ✅ | Yeni test eklenmedi (faz src davranışı a11y/i18n değil perf değiştirdi) ama Faz 5 tohumları (i18n parite + a11y regresyon) lever'ların regresyon yapmadığını CI'da otomatik yakaladı. **Not:** perf'in kendisi otomatik CI testinde değil — elle Lighthouse metodolojisi (`docs/perf/README.md`); perf-CI gelecekte değerlendirilebilir (bilinçli açık, Lantern/ortam istikrarsızlığı nedeniyle bugün güvenilir CI-perf zor). |
| Yerelleştirme & RTL | ✅ | Tüm lever'lar kod-only (font axes/GSAP/deferral) → içerik anahtarına dokunulmadı; i18n parite tohumu 6/6 + build 0 `MISSING_MESSAGE`. RTL yüzeyine dokunulmadı. |

**Kullanıcı yolculuğu & boşluk:** Ana sayfa deneyimi tutarlı korundu — craft bozulmadı, flow mobilde biraz geç belirir ama static base kaplar (boş/kopuk durum yok). **Bilinen, sahipli boşluklar (orphan değil):** (1) brief mobil bütçe açık — kök neden CPU-bound WebGL main-thread, P2 craft-gate'te iptal, DECISIONS+perf README'de kayıtlı; (2) brief'in nihai doğrulaması gerçek-cihaz/Vercel field gerektirir (metodolojik duvar); (3) alt-sayfa derin a11y + `text-pulse` süpürmesi (Faz 4 devri) sonraki faza. Üçü de Kapsam Dışı + retro önerilerinde kayıtlı.

---

## Sonuç

- **Tamamlanma Tarihi:** 2026-06-30
- **Toplam Task:** 7 (6.01-6.05 + 6.07 ✅; 6.06 ❌ iptal; UAT 12/12; düzeltme task'ı yok)
- **Notlar:** Ana sayfa TR `/` mobil perf/LCP **ölçülebilir biçimde iyileşti** (perf 84→90, LCP 3604→3164ms, −440ms/−12%, dağılımlar örtüşmez) — milestone karşılandı. Sürücü **L3** (Fraunces SOFT/WONK budama, ~113KB↓ woff2, Lantern network-görünür); L1 (hero reveal transform-only) + L2 (WebGL idle deferral) gerçek-cihaz-doğru + craft-koruyucu ama lab'da delta vermedi (regresyonsuz korundu). P2 (Living Flow degradasyon) craft-gate'te iptal — imza üst eksen, müdahale gerekçesi kanıtlı Lantern artefaktıydı. Brief mobil bütçe (≥95/<2.5s) **açık** kaldı ve dürüstçe belgelendi (hedef düşürülmedi, craft feda edilmedi — v0.1 deseni). Guardrail'ler regresyonsuz: a11y=100 çift-tema, CLS≈0, masaüstü 100, i18n parite. 8 kalite ekseni ✅. Önceki faz (5) önerileri uygulandı (cookie disiplini, temsilî-ortam/CI-merkezli doğrulama, sahipli a11y borcu korundu). **Sonraki faza aktarılan (sahipli):** brief mobil açık (gerçek-cihaz/Vercel field doğrulaması) + alt-sayfa derin a11y + `text-pulse` süpürmesi. Versiyon Sonu Durumu = `içerik_fazları` → sıradaki içerik fazı: Umami analytics (E1).

---

**Oluşturulma:** 2026-06-30
**Son Güncelleme:** 2026-06-30 — review-phase 6 ✅: retrospektif + kalite kontrol (8 eksen ✅) + sonuç yazıldı; faz dondurma ✅. Milestone karşılandı (ölçülebilir iyileşme, sürücü L3); brief mobil açık dürüstçe kaydedildi; P2 craft-gate iptal; guardrail'ler regresyonsuz. Önceki faz önerileri uygulandı. Versiyon Sonu Durumu içerik_fazları → sıradaki içerik fazı Umami (E1).
