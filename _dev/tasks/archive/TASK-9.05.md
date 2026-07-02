# TASK-9.05: S3 — Mod Kombinasyonları & Living Flow Degradasyon

**Durum:** ✅ Tamamlandı
**Modül:** M1 Living Flow (+M3 Etkileşim) (modules/M1-LivingFlow-TasarimSistemi.md, M3-Etkilesim-Primitives.md)
**Feature:** S3 senaryo grubu — mod kombinasyonları / degradasyon (doğrulama)
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.04 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

Living Flow'un degradasyon matrisini **6 sayfa hero'sunda** (home + 5 alt sayfa) standalone Playwright ile client-runtime'da doğrula: light/dark (FOUC yok), reduced-motion (StaticFlow), no-WebGL (shim), mobil "low", **AR-RTL × dark × reduced birlikte**, 320/768/1440 viewport'ta taşma yok + near-zero CLS. Living Flow client-only (`dynamic ssr:false`) olduğundan curl markup'ta görünmez → **zorunlu tarayıcı**. Tamamlanma = mod matrisi 6 sayfada koşuldu, degradasyon davranışı + taşma/CLS kaydedildi, triyaj yapıldı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S3 araç satırı + Dikkat Edilecekler (Living Flow client-only; tema=localStorage; "low" DOM-attribute yok — gating-değişmezi) + TK6
- `_dev/memory/tema-fix-html-dark-token-flip.md` — tema `html.dark` + değişken flip (prefers-color-scheme değil)
- `_dev/memory/a11y-olcum-tema-tuzagi.md` — `emulateMedia({reducedMotion})`; dark testi localStorage/toggle ile
- `src/components/living-flow/LivingFlow.tsx` (degradasyon seçimi), `tests/e2e/a11y-helpers.ts` (`gotoLocalized`/`scrollThrough` desenleri kopyalanır)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.05 durumu + S3 bulgu notu

---

## Alt Görevler

- [x] **1. Standalone Playwright sürücü kur (scratchpad)**
  - Fresh prod build (`next build`) → `next start -p 3000` (PID 90701 teyit); scratchpad `s3-degradasyon.mjs` (`chromium.launch({channel:'chrome'})`); `gotoLocalized`/`scrollThrough` desenleri kopyalandı. Repo'ya yazılmadı (git temiz teyit).

- [x] **2. Light/dark + FOUC**
  - 6 sayfa × 2 tema (12/12 ✓): `localStorage 'theme'` set + reload; `early.dark == final.dark` (render-blocking init script → FOUC yok), bg tokeni tema-doğru (light `rgb(247,246,241)` / dark `rgb(19,21,16)`), taşma yok.

- [x] **3. reduced-motion + no-WebGL + mobil "low"**
  - reduced-motion (`newContext({reducedMotion:'reduce'})`) → **StaticFlow** (3/3 LivingFlow sayfası: `staticSvg=true canvas=0`)
  - no-WebGL: `getContext` webgl/webgl2 → null shim + `delete WebGLRenderingContext` → **StaticFlow** (3/3)
  - mobil "low": viewport 390 + WebGL açık → **FlowCanvas** (3/3 `canvas=1`), gating-değişmezi (DOM-attribute yok, canvas varlığıyla doğrulandı)

- [x] **4. Birleşik mod + viewport/CLS**
  - **AR-RTL × dark × reduced** (6/6 ✓): `dir=rtl` + `html.dark` + LivingFlow sayfalarında StaticFlow + taşma yok
  - 320/768/1440 (18/18 ✓): yatay taşma yok (scrollW==clientW), CLS < 0.1 (maks gözlem 0.025, çoğu 0.000); `/proc/loadavg` ölçüm öncesi düşük (0.6–1.3)

- [x] **5. Triyaj & kayıt**
  - TK7 triyaj: **kapsam-içi bug yok**. Ayırt-edicilik sanity (mode high canvas=1, 3/3) ile degradasyon sonuçları geçerli. Nüans kaydı: 3 alt sayfa (vaka + 2 bülten) LivingFlow **kullanmıyor** (PageHeader) → WebGL degradasyonu N/A. PHASE-9 + memory güncellendi.

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Playwright script'i scratchpad'de (commit'lenmez). -->

```
scratchpad/  (commit'lenmez)
└── s3-degradasyon.mjs          # YENİ — standalone Playwright sürücü (repo dışı)
_dev/
├── tasks/TASK-9.05.md          # Oturum kaydı + bulgular
├── phases/PHASE-9.md           # Task Listesi 9.05 + S3 notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **Living Flow client-only** (`dynamic ssr:false`) → curl markup'ta canvas/StaticFlow yok; S3 **zorunlu tarayıcı**. Alt sayfa hero'ları da LivingFlow kullanır → S3 6 sayfaya genişler.
- **Tema tuzağı:** `emulateMedia({colorScheme})` temayı **çevirmez** (yalnız FOUC fallback'i etkiler) — dark testi localStorage/toggle ile.
- **"low" gizli:** mobil degradasyon DOM'da attribute bırakmaz → gating-değişmezi ile doğrula, "attribute yok = bug" sanma (Faz 3 öğrenimi).
- **CLS/LCP gözlemi ortam-bağımsız güvenilir** ama host yükü TBT'yi bozar → `/proc/loadavg` önce.
- Kanonik ortam = fresh prod build; TR cookie (`gotoLocalized`).

---

## Test Kriterleri

- [x] 6 sayfada light + dark koşuldu (12/12), FOUC yok (early==final tema), LivingFlow temaya uyumlu
- [x] reduced-motion → StaticFlow; no-WebGL → statik fallback; mobil "low" → FlowCanvas gating-değişmezi ile teyit (3 LivingFlow sayfasında; diğer 3 N/A)
- [x] AR-RTL × dark × reduced birleşik mod 6 sayfada bozulmadı (dir=rtl+dark+StaticFlow, taşma yok)
- [x] 320/768/1440'ta yatay taşma yok (18/18); near-zero CLS (<0.1, maks 0.025)
- [x] Standalone Playwright script scratchpad'de kaldı (git temiz teyit); bulgular triyajlı PHASE-9 + task doc'a yazıldı

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- Fresh prod build (`next build` temiz) → `next start -p 3000` (PID 90701, fresh listening-PID teyit).
- Standalone Playwright sürücü `scratchpad/s3-degradasyon.mjs` (repo dışı, commit'lenmedi): 6 sayfa (home + spor-salonu + bunker-os = LivingFlow'lu; vaka + 2 bülten = PageHeader) × 6 senaryo grubu = **57 kontrol: 48 ✓ · 9 N/A · 0 ✗**.
- Detection markörleri: `canvas` (FlowCanvas mode high/low) vs `svg[viewBox="0 0 1200 800"]` (StaticFlow mode static).
- Senaryolar: (0) ayırt-edicilik sanity, (1) light/dark FOUC, (2) reduced→StaticFlow, (3) no-WebGL→StaticFlow, (4) mobil-low→FlowCanvas, (5) AR-RTL×dark×reduced, (6) 320/768/1440 taşma+CLS.

**Sorunlar:**
- **Playwright-bundled chromium'da WebGL yok** (`getContext('webgl2')` → null, tüm swiftshader flag kombinasyonlarında). Sonuç: ilk koşuda mobil-low 3/3 `staticSvg` verdi (`!supportsWebGL()` yüzünden) → reduced/no-WebGL testleri **ayırt edici olmayacaktı** (static'i degradasyondan değil WebGL-yokluğundan alırdı). Çözüm: `channel:'chrome'` (sistem google-chrome) + `--enable-unsafe-swiftshader` → webgl2 sağlar. Ayırt-edicilik sanity (mode high canvas=1, 3/3) eklendi — bu geçtiği için 2/3'teki static gerçek degradasyon tetiklemesidir. (memory'e eklendi.)
- Scratchpad repo dışı → ESM `@playwright/test` bare-import çözülmedi; absolute-path default-import (`import pw from ".../index.js"; const {chromium}=pw`) ile çözüldü (CommonJS).

**Kararlar:**
- **3 alt sayfa (vaka-calismalari, 2 bülten) LivingFlow kullanmıyor** (PageHeader) → WebGL degradasyon matrisi bu sayfalarda N/A. Task Hedef'i "her alt sayfada LivingFlow var" varsayıyordu; gerçek = yalnız 3 sayfa (home/spor-salonu/bunker-os). **Bu bug değil** — makale/vaka sayfaları bilinçle daha yalın PageHeader kullanır; nüans PHASE-9 notuna kaydedildi.
- docs/DECISIONS.md'ye eklendi: Hayır (mimari karar değil, mevcut tasarımın gözlemi).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- Kaynak kod **değişmedi** (doğrulama fazı). Yalnız `_dev/` dokümanları + memory.

**Test Sonuçları:**
- **0-sanity:** 3/3 ✓ (mode high, canvas=1) — degradasyon testleri ayırt edici.
- **1-fouc:** 12/12 ✓ (early==final tema, bg tokeni doğru, taşma yok).
- **2-reduced:** 3/3 ✓ LivingFlow (StaticFlow, canvas 0) · 3 N/A.
- **3-noWebGL:** 3/3 ✓ LivingFlow (StaticFlow shim ile) · 3 N/A.
- **4-mobilLow:** 3/3 ✓ LivingFlow (FlowCanvas, canvas 1, taşma yok) · 3 N/A.
- **5-combined (AR-RTL×dark×reduced):** 6/6 ✓ (dir=rtl+dark+StaticFlow+taşma yok).
- **6-viewport (320/768/1440):** 18/18 ✓ (taşma yok, CLS<0.1, maks 0.025).

---

**Oluşturulma:** 2026-07-02
