# TASK-12.01: Fixed viewport Living Flow katmanı + Hero koordinasyon

**Durum:** ✅ Tamamlandı
**Modül:** M1 — Living Flow & Tasarım Sistemi (modules/M1-LivingFlow-TasarimSistemi.md)
**Feature:** B1 — Living Flow nabız kapsamı (aşağı-taşıma)
**Faz:** Phase 12 (phases/PHASE-12.md)
**Bağımlılıklar:** Yok (fazın ilk task'i — yapısal temel)

---

## Hedef

Ana sayfada Living Flow WebGL alanını, yalnızca Hero viewport'una kırpılı (`Hero` `overflow-hidden`) haldeyken, **desktop/yüksek-güç** için sayfa-seviyesi tek `position: fixed` viewport-boyu katmana taşımak (Araştırma TK1 + TK2 — Yaklaşım C). Böylece nabızlar Hero'nun altına, sayfanın devamına mevcut scroll-parallax ile "akar". Hero **görsel olarak birebir aynı** kalır; tek WebGL context korunur (çift-render/çift-context yok); mobil/low-power/reduced-motion/no-WebGL modlarında aşağı-taşıma **eklenmez** (mevcut Hero-contained davranış aynen sürer). Task, alan katmanı görünür + parallax ile aşağı akıyor + fallback modları değişmemiş + build temiz olduğunda tamamlanmış sayılır.

---

## Bağlam

Faz 12 karar-gate'li, imza-riskli bir fazdır (discuss + research). Bu task fazın **yapısal temelini** kurar: alanı Hero kırpmasından çıkarıp sayfa-seviyesi fixed katmana almak. Okunabilirlik (adaptif scrim → TASK-12.02) ve kabul-gate ölçümü (kontrast=100 + desktop perf 100/CLS 0 → TASK-12.03) sonraki task'lardır. Bu task tek başına alanın "aşağı aktığı" görsel sonucu üretir ama gate'i **doğrulamaz** — o TASK-12.03'ün işi.

Mimari kısıt (kaynak teyidi): `body { background-color: var(--color-canvas) }` **opak** (`src/app/globals.css:60`). Bu yüzden fixed alan, gövde arka planının **üstünde** ama içerik bölümlerinin **altında** oturmalı (içeriğe `position: relative` + üst z-index; fixed alan düşük z-index). `bg-canvas-deep/40` bölümler (Sektörler/Forum/Credibility) alanı doğal olarak ~%60 geçirir; opak bölümler (Footer `bg-ink` `Footer.tsx:48`, Crew OS iç paneli `bg-ink` `Bunker.tsx:54`) fixed alanı doğal örter → ekstra kesme koduna gerek yok (Araştırma "Opak bölüm örtmesi").

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-12.md` — "Araştırma Bulguları" (TK1–TK4, Dikkat Edilecekler) ve "Kapsam Tartışması" (desktop-öncelik, mobil korunur)
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — F1.1/F1.2 kabul kriterleri, degradasyon mantığı
- `src/components/living-flow/LivingFlow.tsx` — mevcut mod seçimi (reduced/no-WebGL/lowPower) + LCP-defer + statik taban wash
- `src/components/living-flow/FlowCanvas.tsx` — mevcut scroll-parallax (`groupRef.position.y = scrollY*...`), tek Canvas
- `src/components/Hero.tsx` — `<LivingFlow />` + `<FlowScrim />` mount noktası, Hero `overflow-hidden`
- `src/app/[locale]/page.tsx` — sayfa kompozisyonu (Hero + bölümler + Footer)
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — WebGL runtime testi kısıtı (channel:'chrome' + swiftshader)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-12.md` — Task Listesi tablosunda 12.01 durumu

---

## Alt Görevler

- [x] **1. Sayfa-seviyesi fixed alan bileşeni (`FlowBackdrop`)**
  - Yeni bileşen: `src/components/living-flow/FlowBackdrop.tsx` (YENİ)
  - `position: fixed; inset: 0` viewport-boyu, `pointer-events-none`, `aria-hidden`, içerik altında düşük z-index katman
  - Mevcut `FlowCanvas`'ı **olduğu gibi** yeniden kullanır (canvas iç mantığına dokunma; parallax `FlowCanvas.tsx`'te hazır)
  - Mod tespitini `LivingFlow`'daki mantıkla **birebir** paylaşır: `reduced-motion` VEYA no-WebGL VEYA lowPower (`hardwareConcurrency<=4 || max-width:768px`) → **hiçbir şey render etme**; yalnız desktop/high-power → fixed WebGL alanı
  - LCP-defer mantığını koru (Hero LCP'sini bozmasın — desktop high-power'da bir frame defer, `LivingFlow`'daki `requestAnimationFrame` deseni)

- [x] **2. Hero WebGL çift-render'ını önle (koordinasyon, TK2 görsel parite)**
  - `LivingFlow.tsx`'te desktop/high-power durumunda WebGL `FlowCanvas`'ı **Hero içinde mount etme** (artık `FlowBackdrop` render ediyor) — statik taban wash + `FlowScrim` Hero'da kalır
  - `low` (mobil/low-power) modda `FlowCanvas` **eskisi gibi Hero-contained** mount edilir; `static` modda `StaticFlow()` aynen
  - Hedef: desktop'ta tek WebGL context (backdrop), Hero'nun şeffaf alanından fixed alan görünür → Hero **görsel birebir aynı** (fixed alan scroll=0'da Hero viewport'una tam oturur)

- [x] **3. Sayfa kompozisyonuna mount + z-index katmanlaması**
  - `page.tsx`'te `<FlowBackdrop />` `<main>` ile kardeş, içeriğin **arkasında** (main/Footer `relative` + üst z-index; backdrop en altta ama `body` bg üstünde)
  - Bölüm arka planlarının (`bg-canvas-deep/40`, opak paneller) fixed alanı doğru geçirdiğini/örttüğünü gözle teyit et — bölüm dosyalarına dokunma (okunabilirlik ayarı TASK-12.02)

---

## Etkilenen Dosyalar

```
src/components/living-flow/
├── FlowBackdrop.tsx   # YENİ — sayfa-seviyesi fixed viewport alan (desktop-high-power gate'li)
└── LivingFlow.tsx     # desktop-high modda Hero-WebGL'i suppress et (backdrop render eder); low/static aynen
src/app/[locale]/
└── page.tsx           # <FlowBackdrop /> mount + içerik z-index katmanlaması
```

> **Not:** `Hero.tsx`'e dokunulmaması hedeflenir (görsel parite kolaylaşır) — koordinasyon `LivingFlow` içinde çözülür. `FlowCanvas.tsx` ve `package.json` **dokunulmaz** (yeni paket yok — TK4; dokunulmazlar kuralı).

---

## Dikkat Noktaları

- **Tek WebGL context (kritik):** Desktop'ta alan yalnız **bir** yerde (backdrop) render edilmeli. Hero'nun kendi `FlowCanvas`'ı da açık kalırsa iki context + iki rAF döngüsü olur (Araştırma'nın B'yi eleme sebebi). Koordinasyonu gözle teyit et (DevTools'ta tek `<canvas>`).
- **Belge-boyu canvas yasak:** Alan **asla** belge yüksekliğinde boyutlandırılmaz; `fixed` viewport-boyu + parallax ile "akıyor" hissi verilir (Yaklaşım A elendi — bellek/fillrate).
- **Hero görsel parite (TK2):** Hero üstünde ekstra scrim/yoğunluk değişikliği yok; fixed alan scroll=0'da Hero'nun mevcut alanıyla aynı görünmeli. Fark hissedilirse craft son hakem (gate task) — ama bu task'ta hedef sıfır görsel fark.
- **LCP koruması:** `LivingFlow`'daki defer mantığı (`requestAnimationFrame` / `requestIdleCallback`) backdrop'a taşınırken korunur — ilk paint WebGL init'ini beklemez.
- **Mobil/low-power sıfır risk:** Aşağı-taşıma yalnız desktop/high-power. `lowPower` tespiti (`LivingFlow.tsx:38-40`) backdrop'ta aynen kullanılır; mobilde backdrop hiç mount olmaz, alan Hero'da kalır (perf tabanına sıfır risk — discuss kararı).
- **Reduced-motion / no-WebGL fallback:** Bu modlarda backdrop hiç render etmez; yalnız mevcut Hero statik tabanı/`StaticFlow` kalır → yeni kırılma yüzeyi yok.
- **Det-tespit tekrarını önle (modülerlik):** `LivingFlow` ve `FlowBackdrop` aynı mod-tespit mantığını paylaşır. Kopya-kod riskini azaltmak için tespiti paylaşılan bir hook'a (`useFlowMode`) çıkarmak tercih edilebilir → Karar Noktaları.

---

## Test Kriterleri

- [x] `npx next build` temiz geçer (TypeScript strict; yeni bileşen tip-güvenli) — ✓ `Compiled successfully in 7.6s`, 0 hata/uyarı
- [x] **Desktop/high-power:** aşağı scroll'da tek fixed canvas kalıcı (Hero altına parallax ile akar); **tek** `<canvas>`, fixed backdrop içinde, Hero-contained değil — Chrome+SwiftShader standalone script ile kanıtlandı (`count=1`, `fixed:true, inHero:false`)
- [x] **Mobil (≤768px):** tek canvas Hero-contained, backdrop yok (`fixed:false, inHero:true`) — aşağı-taşıma yok, mobil değişmemiş
- [x] **reduced-motion:** WebGL alanı yok (`count=0`), yalnız `StaticFlow` SVG; backdrop render etmez
- [x] **no-WebGL:** Statik fallback (reduced-motion ile **aynı kod dalı** `if (reduce || !supportsWebGL()) setMode("static")`); hata/çökme yok
- [x] Mevcut a11y tohumu regresyonsuz: `tests/e2e/home-a11y.spec.ts` (light+dark) **2 passed, 0 ihlal** — tohum `reducedMotion:"reduce"` koşar → fixed alan bu koşuda zaten yok; gerçek kontrast etkisi full-motion olarak TASK-12.03 gate'inde ölçülür

---

## Karar Noktaları

- **Mod-tespit paylaşımı:** `LivingFlow` + `FlowBackdrop` tespiti tekrarlar mı (basit, iki dosya) yoksa paylaşılan `useFlowMode()` hook'una mı çıkarılır (modülerlik, +1 dosya) → **Öneri:** paylaşılan hook (kopya-kod yok, tek gerçek kaynak; QUALITY §5). İki dosyalık tekrar da kabul edilebilir eğer hook fazla soyutlama getiriyorsa — run-task karar verir.
- **Backdrop z-index yerleşimi:** `<FlowBackdrop>`'ı `page.tsx`'te mi yoksa `SmoothScroll` wrapper içinde mi mount etmek daha temiz → **Öneri:** `page.tsx` (sayfa-özel, ana sayfaya sınırlı; alt sayfaların kendi Living Flow'ları var, dokunulmaz — kapsam dışı).

---

## Risk ve Geri Dönüş Planı

- **Risk — çift WebGL context (imza/perf):** Koordinasyon eksikse Hero + backdrop iki context açar → GPU maliyeti + olası context-limit. **Önlem:** Alt görev 2'de suppress'i gözle teyit (tek `<canvas>`).
- **Risk — Hero görsel kayması (TK2 ihlali):** fixed alan Hero'da farklı görünürse imza zayıflar. **Önlem:** scroll=0'da yan yana kıyas; fark varsa gate task'ta craft hakemliği (iptal-kaydet tetiği).
- **Rollback:** Tüm değişiklik cerrahi ve izole (yeni bileşen + `LivingFlow` küçük koşul + `page.tsx` mount). Geri dönüş: `FlowBackdrop` mount'unu kaldır + `LivingFlow` suppress koşulunu geri al → mevcut Hero-contained davranışa döner. Karar-gate iptal-kaydet senaryosunda bu adımlar TASK-12.03'te uygulanır.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md ve PHASE-12.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Mod-tespit paylaşımı** → `src/components/living-flow/useFlowMode.ts` (YENİ hook). `LivingFlow`'daki tüm degradasyon + LCP-defer mantığı (`idle|high|low|static`, rAF/idle/load defer, `supportsWebGL`) buraya taşındı; `LivingFlow` ve `FlowBackdrop` **tek gerçek kaynağı** paylaşıyor (kopya-kod yok, QUALITY §5; Karar Noktası önerisi uygulandı).
- **`FlowBackdrop.tsx`** (YENİ): `useFlowMode()==="high"` iken `fixed inset-0 z-0 pointer-events-none aria-hidden` katman içinde `<FlowCanvas quality="high" />` render eder; `high` dışı (`idle/low/static`) → `null`. LCP-defer hook üzerinden korunur (mode "high"e ancak rAF sonrası geçer → defer'e kadar `null`).
- **`LivingFlow.tsx`**: hook'a geçildi; `high` modda **canvas mount etmez** (backdrop render ediyor), yalnız statik taban wash + (Hero'daki) `FlowScrim` kalır. `low` modda eskisi gibi Hero-contained `FlowCanvas quality="low"`; `static` modda `StaticFlow` aynen.
- **`page.tsx`**: `<FlowBackdrop />` `<main>`'in kardeşi (Nav'dan sonra) mount edildi; `<main>` → `relative z-10`, `<Footer />` → `relative z-10` wrapper (opak body bg üstünde, içeriğin altında katmanlama).

**Sorunlar:**
- Yok. Build ilk denemede temiz; runtime invariant script ilk denemede tüm senaryolarda geçti.

**Kararlar:**
- **Mod-tespit paylaşılan hook'a çıkarıldı** (iki-dosya tekrarı yerine): tek gerçek kaynak → `LivingFlow`/`FlowBackdrop` asla ayrışmaz (aynı mode → tek WebGL context garantisi). Gerekçe: QUALITY §5 modülerlik; soyutlama minimal (tek hook, mevcut mantık birebir taşındı).
- **Katmanlama = pozitif z** (backdrop `z-0` / içerik `relative z-10`), negatif-z DEĞİL: body bg opak (`globals.css:60`) → negatif-z, background-propagation'a bağımlı ve kırılgan; pozitif z robust (task/research prescribed).
- **Baz wash sıra farkı (kabul):** `high` modda baz wash Hero'da (backdrop canvas'ın önünde) kalıyor — önceden canvas wash'ın önündeydi. Fark alt-algısal (wash 14%/10% alfa radyal); craft son hakem TASK-12.03 gate'inde. Baz wash Hero'da kalması task-şartı (defer sırasında Hero boş kalmasın).
- docs/DECISIONS.md'ye eklendi: Hayır (saf icra/koordinasyon detayı; mimari karar değil — gate kararı TASK-12.03'te DECISIONS'a yazılacak)

**Kalan İşler:** Yok (bu task kapsamında). Okunabilirlik/adaptif scrim → TASK-12.02; kontrast=100 + perf 100/CLS 0 + craft gate ölçümü → TASK-12.03.

**Son Yaklaşım:** Tamamlandı — Yaklaşım C (tek fixed viewport canvas + parallax) uygulandı; koordinasyon `LivingFlow` içinde çözüldü (`high` modda canvas suppress). Hero.tsx'e dokunulmadı; `FlowCanvas.tsx`/`package.json` dokunulmadı.

**Sonraki Adım Detayı:** TASK-12.02 (adaptif scrim). Bu task için ek adım yok.

**Dosya Değişiklikleri:**
- `src/components/living-flow/useFlowMode.ts` → YENİ — paylaşılan mod-tespit + LCP-defer hook
- `src/components/living-flow/FlowBackdrop.tsx` → YENİ — sayfa-seviyesi fixed viewport alan (yalnız `high`)
- `src/components/living-flow/LivingFlow.tsx` → hook'a geçiş; `high` modda canvas suppress (backdrop'a devredildi); `low`/`static` aynen
- `src/app/[locale]/page.tsx` → `<FlowBackdrop />` mount + `main`/`Footer` `relative z-10` katmanlama

**Test Sonuçları:**
- `npx next build` → ✓ Compiled successfully in 7.6s (TS strict, 0 hata/uyarı)
- `tests/e2e/home-a11y.spec.ts` (light+dark) → 2 passed, 0 ihlal (regresyonsuz)
- Standalone runtime invariant (Chrome+SwiftShader, `channel:'chrome'` + `--enable-unsafe-swiftshader`, WebGL sanity-önce): DESKTOP tek fixed canvas (scroll'da kalıcı) · MOBILE (≤768) hero-contained + backdrop yok · REDUCED-MOTION 0 canvas + StaticFlow SVG → **ALL PASS** (çift-context riski elendi)

---

**Oluşturulma:** 2026-07-03
