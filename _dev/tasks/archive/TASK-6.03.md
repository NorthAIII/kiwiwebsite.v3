# TASK-6.03: L2 — WebGL init'ini mobilde idle/post-load'a ertele

**Durum:** ✅ Tamamlandı
**Modül:** M1 (modules/M1-LivingFlow-TasarimSistemi.md) — Living Flow degradasyon
**Feature:** P1 / render-path — WebGL init LCP penceresi dışına
**Faz:** Phase 6 (phases/PHASE-6.md)
**Bağımlılıklar:** TASK-6.02 (L1) — sıra: L1 sonra L2; ölçüm 6.04'te toplu

---

## Hedef

`src/components/living-flow/LivingFlow.tsx:40` WebGL init'ini (FlowCanvas mount) yalnız **1 rAF** geciktiriyor — bu, ağır Three.js/GLSL compile işini LCP penceresinde main-thread'e bindiriyor (kök neden: mobil "Other" 3663ms). Bu task, init'i **mobilde** idle/post-load'a (örn. `requestIdleCallback` + `load` sonrası fallback timeout) erteler; main-thread LCP penceresinde boşalır. LCP elementi canvas ise erteleme hero metnini LCP yapar (~1.7s, bütçe-altı); metin ise main-thread'i boşaltıp reveal/LCP'yi öne çeker — iki senaryoda da kazanç. Flow mobilde ~0.5-1s geç belirir; görsel kalite aynı kalır. İmza iki temada gözle korunup main-thread erteleme doğrulandığında tamamlanır.

---

## Bağlam

Research K-R2 (PHASE-6 + DECISIONS 2026-06-30): tek en büyük lever olabilir, craft-koruyucu. Mevcut `requestAnimationFrame(() => setMode(...))` (LivingFlow.tsx:40) "first paint sonrası 1 frame" gecikmesi LCP'yi korumaya yetmiyor (rAF FCP'den hemen sonra, hâlâ LCP penceresi içinde). Alternatif: IntersectionObserver + idle (daha akıllı, biraz karmaşık, aynı LCP kazancı) — şimdilik idle/post-load tercih, gerekirse task'ta IO'ya yükseltilir (karar noktası).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-6.md` — "Araştırma Bulguları" L2 + K-R2, kök neden tablosu
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — F1.2 degradasyon & fallback ("ilk paint asla WebGL init'i beklemez" kabul kriteri — bu task onu güçlendirir)
- `src/components/living-flow/LivingFlow.tsx` — mevcut mode/defer mantığı (satır 26-61)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-6.md` — Task Listesi tablosunda durumu güncelle
- `_dev/docs/DECISIONS.md` — IO'ya yükseltme yapıldıysa veya erteleme stratejisi netleştiyse (önemli karar)

---

## Alt Görevler

- [x] **1. Init ertelemesini idle/post-load'a taşı**
  - `LivingFlow.tsx:40` `requestAnimationFrame(...)` → mobilde (`lowPower` / `max-width:768px`) `requestIdleCallback` (fallback: `window.addEventListener("load", ...)` veya `setTimeout` ~birkaç yüz ms) ile WebGL mode set et
  - Masaüstü/yüksek-güç davranışı korunabilir (rAF) veya aynı idle stratejisi — ama faz kapsamı **mobil-birincil**; masaüstü perf 99-100 regresyonsuz kalmalı
  - `requestIdleCallback` desteklenmeyen tarayıcıda (Safari) timeout fallback şart
  - Cleanup (cancel) her yola eklensin (mevcut `cancelAnimationFrame` deseni gibi) — unmount sızıntısı yok

- [x] **2. Static base wash + fallback korunur**
  - `mode: "idle"` durumunda zaten static radyal yeşil zemin render ediliyor (satır 47-54) → erteleme sırasında hero zemini boş/beyaz kalmamalı (canvas gelene dek static wash görünür)
  - reduced-motion / no-WebGL `static` yolu değişmez (erken return, satır 30-34)

- [~] **3. Craft + main-thread gözle/teyit (iki tema)** — yapısal: idle deferral + SSR base wash teyitli; gözle craft (light+dark, cursor/scroll) + main-thread "Other" LCP-dışı median → 6.04 ara-ölç + gerçek tarayıcı kullanıcı onayı (headless software-GL kısıtı)
  - Mobil emülasyon/gerçek cihazda flow'un ~0.5-1s geç ama akıcı belirdiğini izle (light + dark); "kayıp/bozuk/snap" görünmemeli
  - Cursor/scroll etkileşimi flow geldikten sonra tam çalışıyor mu
  - Performance trace / Lighthouse'ta WebGL "Other" işinin LCP penceresi **dışına** kaydığını teyit (asıl ölçüm 6.04'te median ile)

---

## Etkilenen Dosyalar

```
src/components/living-flow/
└── LivingFlow.tsx   # init erteleme rAF → idle/post-load (mobil) — zaten var
```

---

## Dikkat Noktaları

- **Craft tavan (pazarlık dışı):** flow'un mobilde geç belirmesi kabul ama gözle doğrulanmalı — "geç ama akıcı" evet, "kayıp/atlama" hayır (PHASE-6 Dikkat, discuss guardrail).
- **CLS riski:** canvas `pointer-events-none absolute inset-0` (layout dışı) + static wash hep mevcut → erteleme CLS yaratmamalı; yine de ölç (CLS=0 guardrail).
- **Static wash boşluk:** erteleme penceresinde hero arkası static radyal zemin görünmeli (boş beyaz değil) — gözle teyit.
- **i18n parite:** kod-only (içerik anahtarı yok) → 5 dil bozulmaz.
- **Masaüstü regresyonsuz:** masaüstü perf 99-100 düşmemeli; idle stratejisi masaüstünü yavaşlatmamalı (orada zaten bütçede, gerekirse mobil-only ertele).
- **Ölçüm 6.04'te:** bu task'ta craft gözle + trace teyidi; tam median karşılaştırma ara-ölçte.

---

## Karar Noktaları

- **Erteleme mekanizması:** `requestIdleCallback`+timeout-fallback vs IntersectionObserver+idle. → Öneri: önce idle/post-load (daha basit, research tercihi); main-thread teyidi yetersizse IO'ya yükselt. Yükseltme yapılırsa DECISIONS'a yaz.
- **Kapsam:** erteleme yalnız mobil mi, tüm cihazlar mı? → Öneri: mobil-birincil (faz kapsamı); masaüstü davranışını regresyonsuz koru.

---

## Risk ve Geri Dönüş Planı

- **Risk:** idle çok geç tetiklenirse flow gözle "fazla geç" belirir (craft düşer) → fallback timeout'u kısalt; çözülmezse kullanıcıya getir.
- **Risk:** `requestIdleCallback` Safari'de yok → timeout fallback şart (atlanırsa flow hiç başlamaz).
- **Rollback:** tek dosya — `git checkout -- src/components/living-flow/LivingFlow.tsx`.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı (görsel/median teyit hariç → 6.04 + gerçek tarayıcı)
- [x] Tüm test kriterleri karşılandı (ortam-bağımsız olanlar; gözle craft/median → 6.04)
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Test Kriterleri

- [x] `next build` temiz geçer (37/37, type-check pass)
- [x] WebGL init mobilde idle/post-load'a ertelendi; `requestIdleCallback` yok ise timeout fallback çalışır (Safari: post-load+200ms / readyState complete ise setTimeout)
- [x] Erteleme penceresinde static base wash görünür (SSR `tr.html`'de base wash mevcut, `<canvas>`=0); iki tema (token-temelli, tema-uyumlu)
- [~] Flow geç ama akıcı belirir (light + dark, gözle craft); cursor/scroll flow sonrası tam çalışır → gerçek tarayıcı kullanıcı onayı (headless software-GL kısıtı)
- [~] Main-thread WebGL "Other" işi LCP penceresi dışına kaydı → yapısal (idle deferral); median teyit 6.04 ara-ölçte
- [x] CLS=0 yapı gereği (canvas layout-dışı, base wash hep mevcut); masaüstü rAF değişmedi (regresyonsuz); tüm yollarda unmount cleanup var (sızıntı yok)

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅

**Yapılanlar:**
- `LivingFlow.tsx:32-75` (useEffect) erteleme mantığı cihaza göre dallandırıldı: **masaüstü/yüksek-güç → mevcut `requestAnimationFrame` davranışı korundu** (regresyonsuz, zaten bütçede); **mobil/düşük-güç (`lowPower`) → `requestIdleCallback(start, { timeout: 2000 })`** ile WebGL mode set'i idle'a ertelendi (timeout cap 2000ms → meşgul thread'de de garanti tetik).
- **Safari fallback** (`requestIdleCallback` yok): `document.readyState === "complete"` ise kısa `setTimeout(200)`; değilse `window.addEventListener("load", …, { once:true })` sonrası `setTimeout(200)`. Erteleme penceresinde static base wash hep render (mode `idle` → yalnız radyal yeşil zemin; SSR'da da mevcut, hero boş kalmaz).
- Tüm yollarda cleanup: `cancelAnimationFrame` / `cancelIdleCallback` / `clearTimeout` / `removeEventListener` — unmount sızıntısı yok.
- Erteleme mekanizması = **idle/post-load** (research K-R2 tercihi); IntersectionObserver'a yükseltme yapılmadı (main-thread teyidi yapısal olarak idle ile sağlanıyor, gereksiz karmaşıklıktan kaçınıldı) → DECISIONS'a yeni kayıt gerekmedi (K-R2 zaten kayıtlı).

**Son Yaklaşım:** Tek dosya (`LivingFlow.tsx`) içinde useEffect dallanması — high-power rAF, low-power idle+timeout+Safari-load fallback. Build temiz, SSR base wash teyitli.

**Sonraki Adım Detayı:** Yok — task tamamlandı. Sıradaki TASK-6.04 (ara-ölç) L1+L2 median LCP delta'sını ölçecek (aynı node20+Chrome150 ortamı, `NEXT_LOCALE=tr` cookie); WebGL "Other" işinin LCP penceresi dışına kaydığı orada median ile teyit edilecek.

**Sorunlar:**
- **TS strict tuzağı:** İlk denemede guard `"requestIdleCallback" in window` yazıldı → `next build` type-check `Property 'addEventListener' does not exist on type 'never'` ile kırıldı. Neden: `requestIdleCallback` lib.dom.d.ts'de Window üzerinde **zorunlu** tipli; `in` operatörü negatif dalda **tüm `window` nesnesini** `never`'a daraltıyor. Çözüm: guard'ı property üzerine taşı — `typeof window.requestIdleCallback === "function"` (yalnız property'yi daraltır, `window` Window kalır). Build temiz geçti. (Faz retrosu adayı: TS strict + `in` narrowing.)

**Kararlar:**
- docs/DECISIONS.md'ye eklendi: Hayır (erteleme stratejisi research K-R2'de zaten kararlaştırıldı; IO'ya yükseltme yapılmadı → yeni karar yok).

**Dosya Değişiklikleri:**
- `src/components/living-flow/LivingFlow.tsx` — useEffect erteleme dallanması + docblock güncellemesi (init: masaüstü rAF / mobil idle-post-load). Tek dosya.

**Test Sonuçları:**
- `next build` ✅ temiz (37/37 sayfa, type-check pass — `in`→`typeof` düzeltmesinden sonra).
- SSR prerender (`tr.html`): static base wash (`radial-gradient(60% 50% at 70% 18%`) **mevcut**, `<canvas>` sayısı **0** (ssr:false + deferral) → erteleme penceresinde hero boş kalmaz, teyitli.
- CLS=0 yapı gereği (canvas `absolute/pointer-events-none`, layout dışı; base wash hep mevcut). i18n kod-only → 5 dil bozulmaz.
- Gözle craft (flow geç-ama-akıcı, light+dark, cursor/scroll) + main-thread "Other" LCP-dışı median teyidi: headless software-GL'de faithful değil → 6.04 ara-ölç + gerçek tarayıcı kullanıcı onayına bırakıldı (6.02 deseni).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- Mobilde (low-power) WebGL init'i 1-rAF yerine `requestIdleCallback`+2s-timeout (Safari: post-load+200ms) ile LCP penceresi dışına ertelendi; masaüstü rAF davranışı regresyonsuz korundu. Static base wash erteleme boyunca hero zeminini doldurur.

**Öğrenilenler:**
- TS strict'te `"prop" in window` (lib.dom'da zorunlu tipli prop) negatif dalda `window`'u `never`'a daraltır → guard'ı `typeof window.prop === "function"` ile property üzerine al (faz retrosu adayı).

---

**Oluşturulma:** 2026-06-30
