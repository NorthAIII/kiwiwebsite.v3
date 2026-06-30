# TASK-6.03: L2 — WebGL init'ini mobilde idle/post-load'a ertele

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Init ertelemesini idle/post-load'a taşı**
  - `LivingFlow.tsx:40` `requestAnimationFrame(...)` → mobilde (`lowPower` / `max-width:768px`) `requestIdleCallback` (fallback: `window.addEventListener("load", ...)` veya `setTimeout` ~birkaç yüz ms) ile WebGL mode set et
  - Masaüstü/yüksek-güç davranışı korunabilir (rAF) veya aynı idle stratejisi — ama faz kapsamı **mobil-birincil**; masaüstü perf 99-100 regresyonsuz kalmalı
  - `requestIdleCallback` desteklenmeyen tarayıcıda (Safari) timeout fallback şart
  - Cleanup (cancel) her yola eklensin (mevcut `cancelAnimationFrame` deseni gibi) — unmount sızıntısı yok

- [ ] **2. Static base wash + fallback korunur**
  - `mode: "idle"` durumunda zaten static radyal yeşil zemin render ediliyor (satır 47-54) → erteleme sırasında hero zemini boş/beyaz kalmamalı (canvas gelene dek static wash görünür)
  - reduced-motion / no-WebGL `static` yolu değişmez (erken return, satır 30-34)

- [ ] **3. Craft + main-thread gözle/teyit (iki tema)**
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

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Test Kriterleri

- [ ] `next build` temiz geçer
- [ ] WebGL init mobilde idle/post-load'a ertelendi; `requestIdleCallback` yok ise timeout fallback çalışır (Safari)
- [ ] Erteleme penceresinde static base wash görünür (hero arkası boş değil), iki tema
- [ ] Flow geç ama akıcı belirir (light + dark, gözle craft); cursor/scroll flow sonrası tam çalışır
- [ ] Main-thread WebGL "Other" işi LCP penceresi dışına kaydı (trace/Lighthouse teyidi)
- [ ] CLS=0; masaüstü perf 99-100 regresyonsuz; unmount cleanup sızıntısı yok

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️/🔴]

**Yapılanlar:**
-

**Sorunlar:**
-

**Kararlar:**
- docs/DECISIONS.md'ye eklendi: [Evet/Hayır]

**Dosya Değişiklikleri:**
-

**Test Sonuçları:**
-

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
-

**Öğrenilenler:**
-

---

**Oluşturulma:** 2026-06-30
