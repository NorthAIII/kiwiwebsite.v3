# TASK-14.05: S3 — Mod Kombinasyonları / Living Flow Sayfa-Boyu Nabız Degradasyonu

**Durum:** ✅ Tamamlandı
**Modül:** M1 Living Flow (+M3 primitives) (modules/M1-LivingFlow-TasarimSistemi.md, M3-Etkilesim-Primitives.md)
**Feature:** S3 senaryo grubu — mod kombinasyonları / degradasyon (**EN BÜYÜK v0.3 delta**) — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.04 ✅ (lineer sıra; runtime WebGL katmanına ilk giriş)

---

## Hedef

v0.3'ün **en büyük yeni yüzeyi** — ana sayfa **sayfa-boyu nabzı** (Faz 12: sürekli soluk iplik + bölüme-uyarlanan `--flow-veil` opaklık + tek WebGL context) — mod kombinasyonlarında **standalone Playwright + system Chrome (WebGL ŞART)** ile degradasyonunu doğrula: light/dark (FOUC yok), **reduced-motion → StaticFlow tüm sayfa** (yalnız hero değil), no-WebGL → StaticFlow, **mobil "low" → nabız yok (desktop-only korunur)**, AR-RTL × dark × reduced birlikte, 320/768/1440 taşma yok + near-zero CLS; craft: `--flow-veil` washi okunabilirliği bölüm-metinlerinde. Tamamlanma = mod matrisi koşuldu, ayırt-edicilik sanity ile (WebGL var → canvas var) sonuç triyajlı kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S3 satırı (**system Chrome, WebGL ŞART**) + Ortam Ampirik Teyidi (bundled chromium 0 canvas → yanlış-static; system Chrome gerçek canvas) + Dikkat Edilecekler (WebGL ayırt-edicilik sanity, `/dev/shm`=64M, tema/reveal tuzağı); Sahipsiz Alan → Living Flow sayfa-boyu nabız notu
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — `channel:'chrome'`+swiftshader şart; WebGL-bağımlı degradasyona ayırt-edicilik sanity
- `_dev/memory/a11y-olcum-tema-tuzagi.md` — `html.dark` tema zorlama (emulateMedia çevirmez); reduced-motion+scroll
- `_dev/memory/runtime-harness-selector-teyidi.md` — harness selector kaynaktan teyit (FAIL → önce artefakt mı)
- `src/components/living-flow/` (LivingFlow, FlowCanvas, FlowScrim), `useFlowMode`, `--flow-veil` kullanımı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.05 durumu + S3 bulgu notu

---

## Alt Görevler

- [x] **1. WebGL harness kur + ayırt-edicilik sanity**
  - `chromium.launch({channel:'chrome', args:['--enable-unsafe-swiftshader','--disable-dev-shm-usage', ...]})`; prod-serve :3000
  - **Sanity:** full-motion + WebGL → ana sayfada `<canvas>` **var** (mode high/canvas render). Sanity geçmezse tüm S3 ayırt-edici değil (yanlış-static) → dur, harness'i düzelt. Bundled chromium **kullanma** (0 canvas)

- [x] **2. Sayfa-boyu nabız — light/dark + FOUC**
  - Ana sayfa light + dark; early==final tema (FOUC yok); sayfa-boyu nabız desktop'ta aktif (hero-ötesi bölümlerde de iplik/veil)
  - `--flow-veil` bölüme-uyarlanan opaklık: bölüm-metinleri okunabilir (washi light-bleed çözümü) — craft görsel son hakem (memory: WebGL-arkası kontrast otomatik sertifikalanamaz)

- [x] **3. Degradasyon matrisi**
  - **reduced-motion → StaticFlow, TÜM SAYFA** (yalnız hero değil — v0.3 kritik: nabız tüm sayfaya taşındı, reduced fallback de tüm sayfa olmalı)
  - **no-WebGL** (context shim/reddet) → StaticFlow
  - **mobil "low"** (viewport + DPR/UA) → nabız **yok** (aşağı-taşıma desktop-only korunur); mobilde hero degradasyonu Faz 9 davranışında
  - **AR-RTL × dark × reduced** birlikte → dir=rtl + dark + StaticFlow (üçü çakışmıyor)

- [x] **4. Taşma & CLS**
  - 320 / 768 / 1440 viewport: yatay taşma yok, near-zero CLS (nabız/veil layout-shift yaratmıyor)

- [x] **5. Triyaj & kayıt**
  - Kapsam-içi bug (reduced yalnız hero'yu düşürüyor, mobilde nabız sızıyor, veil okunabilirliği bozuyor, CLS artışı) → düzeltme task'ı önerisi
  - N/A durumları kaydet (Faz 9 emsali: 3 alt sayfa PageHeader → WebGL degradasyon N/A; bu task **ana sayfa** nabzına odaklı, alt sayfa nabız kapsam-dışı — Faz 12 desktop-home-only)

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Harness geçici (scratchpad); commit'lenmez. YENİ dosya yok (kalıcı). -->

```
_dev/
├── tasks/TASK-14.05.md          # Oturum kaydı + S3 degradasyon matrisi
├── phases/PHASE-14.md           # Task Listesi 14.05 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **Bundled chromium WebGL vermez → yalnız system Chrome (memory).** Bundled ile koşarsan LivingFlow her zaman static → "sayfa-boyu nabız" **doğrulanamaz** (yanlış-yeşil değil, ayırt-edici değil). Ayırt-edicilik sanity (full-motion+WebGL→canvas var) **şart**.
- **reduced-motion fallback kapsamı v0.3'te değişti:** Faz 9'da nabız yalnız hero'daydı; Faz 12 tüm sayfaya taşıdı → reduced-motion fallback'i de **tüm sayfa** StaticFlow olmalı. "Hero static ama alt bölümde nabız oynuyor" = kapsam-içi bug.
- **`/dev/shm`=64M → `--disable-dev-shm-usage` zorunlu** (yoksa renderer çöker).
- **Tema tuzağı:** `html.dark`+localStorage üzerinden çevir (emulateMedia çevirmez). **Reveal tuzağı:** `reducedMotion:'reduce'`+scroll (full-motion reveal opacity:0 atlar).
- **Selector teyidi (memory):** harness "FAIL" verince önce **artefakt mı** diye sor (kör red yok), sonra gerçek-bug (kör onay yok). LivingFlow mount/canvas mekanizmasını kaynaktan teyit et.
- **Fallback yasağı (araştırma):** S3'e build-ground-truth fallback **yazma** — prerender canvas-yokluğunu ayırt edemez (WebGL client-only). S3 WebGL zorunlu; system Chrome çökerse dur + kullanıcıya bildir.

---

## Test Kriterleri

- [x] Ayırt-edicilik sanity: full-motion+WebGL → ana sayfa `<canvas>` var (mode high)
- [x] Sayfa-boyu nabız light/dark FOUC yok; `--flow-veil` bölüm-metinleri okunabilir (craft)
- [x] reduced-motion → StaticFlow **tüm sayfa**; no-WebGL → StaticFlow; mobil-low → nabız **yok** (desktop-only)
- [x] AR-RTL × dark × reduced birlikte tutarlı (dir=rtl + dark + StaticFlow)
- [x] 320/768/1440 taşma yok + near-zero CLS; bulgular triyajlı PHASE-14 + task doc'a

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-05

**Durum:** ✅ Tamamlandı

**Son Yaklaşım:** S3 tek oturumda bitti — pause/devam gerekmedi.

**Yapılanlar:**
- **Kaynak ground-truth teyidi (selector varsayma disiplini):** `useFlowMode` gate okundu — `reduce || !WebGL → static`; `hardwareConcurrency≤4 || max-width:768px → low`; else `high`. DOM haritası: `high` → **FlowBackdrop** (`position:fixed inset-0 z-0`) tek page-level canvas (Hero `LivingFlow` high'da canvas render **etmez**, yalnız base wash); `low` → Hero `LivingFlow` içi `<FlowCanvas quality="low">` (fixed-değil, hero-contained), FlowBackdrop null; `static` → StaticFlow SVG (`viewBox="0 0 1200 800"`), 0 canvas. Ana sayfada high modda **tam 1 canvas** (page-level) → temiz ayırt-edici sinyal. Tema: `localStorage['theme']` + `<head>` pre-paint inline script (`html.dark`). `--flow-veil` token globals.css: light 70% / dark 56% color-mix.
- **Kanonik prod-serve:** `rm -rf .next && next build` temiz → `next start -p 3000` (Ready 506ms, listening-PID 15275 teyit — stray yok). loadavg ~1.1 (düşük).
- **Harness (scratchpad, system Chrome):** `chromium.launch({channel:'chrome', args:['--enable-unsafe-swiftshader','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader',...]})`. Canvas analizi: her canvas için ancestor zincirinde `position:fixed` var mı (page-level) → nabız ayırt-edici; StaticFlow SVG sayımı; `--flow-veil` computed; CLS PerformanceObserver(layout-shift); overflowX = scrollWidth − innerWidth. Tema addInitScript localStorage; reduced context `reducedMotion:'reduce'`; no-WebGL getContext shim; mobil viewport 390 (isMobile+DPR3); TR için `NEXT_LOCALE=tr` cookie.
- **Ampirik ön koşul:** WebGL2=true (bundled değil, ayırt-edici). 7 senaryo + 3 viewport koşuldu; craft için light+dark scroll-screenshot incelendi.

**Bulgular / Triyaj:**
- **Mod matrisi — 9/9 PASS, kapsam-içi bug YOK:**
  - **1a Sanity high/desktop LIGHT:** pageLevel canvas=1 (FlowBackdrop fixed), hero=0, staticSVG=0 → sayfa-boyu nabız aktif; veil `#f7f6f1 70%`; FOUC yok (early=false=final). **Ayırt-edicilik sanity GEÇTİ.**
  - **1b high/desktop DARK + FOUC:** pageLevel=1; dark early=true=final (pre-paint script) → FOUC yok; veil `#131510 56%`.
  - **2 reduced-motion → static TÜM SAYFA:** canvas=0 (scroll öncesi **ve** %60 scroll sonrası), staticSVG=1 → nabız hiçbir yerde sızmıyor; v0.3-kritik "tüm sayfa fallback" doğrulandı.
  - **3 no-WebGL → static:** getContext shim → canvas=0, staticSVG=1.
  - **4 mobil-low → nabız desktop-only:** pageLevel canvas=0 (FlowBackdrop null), heroCanvas=1 (low hero-contained) → sayfa-boyu nabız mobile taşmıyor, Faz 12 desktop-home-only korundu.
  - **5 AR-RTL × dark × reduced:** dir=rtl + dark + canvas=0(static) + lang=ar → üçü çakışmadı.
  - **6 taşma & CLS 320/768/1440:** overflowX=0px + **CLS=0.0000** üç viewport'ta (scroll-storm sonrası); 320/768 pageLevel=0 (low), 1440 pageLevel=1 (high) — gate ile tutarlı.
- **Craft (görsel son hakem — WebGL-arkası kontrast otomatik sertifikalanamaz):** light+dark scroll-screenshot → hero-ötesi HowItWorks (4-adım) + SectorSolutions başlık/gövde metinleri **net ve okunabilir**; yeşil nabızlar breathing-zone'da görünür kalırken `--flow-veil` washi metni her zaman kazandırıyor (light-bleed yok, metin nabızla yarışmıyor). Sayfa-boyu nabız imzası + veil okunabilirlik çözümü çalışıyor. **Craft PASS.**
- **N/A (kapsam-dışı, sahipli):** alt sayfa (`/crew-os`, Alpfit, vaka, bülten) sayfa-boyu nabzı — Faz 12 bilinçle **desktop-home-only**; bu task ana sayfa nabzına odaklı, alt sayfa nabız kapsam-dışı (bu faz yalnız o kararın regresyonsuzluğunu doğrular, DURUM/PHASE-14 Kapsam Dışı). Perf/TBT mutlak kıyas software-GL env-anomalisi (14.04 emsali — kıyaslanmadı; CLS/overflow Lantern-deterministik kıyaslandı).

**Kaynak kod değişmedi** (doğrulama fazı). Harness geçici (scratchpad, commit'lenmez).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
