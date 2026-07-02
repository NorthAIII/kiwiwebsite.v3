# TASK-9.05: S3 — Mod Kombinasyonları & Living Flow Degradasyon

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Standalone Playwright sürücü kur (scratchpad)**
  - Fresh prod build serve (PID teyit); scratchpad'de `chromium.launch()` (veya `channel:'chrome'`) script; `gotoLocalized`/`scrollThrough` desenleri `a11y-helpers.ts`'ten kopyalanır. **Repo'ya yazılmaz** (doğrulama fazı — TK3)

- [ ] **2. Light/dark + FOUC**
  - 6 sayfada tema toggle/localStorage ile light + dark; **FOUC yok** (LivingFlow uniform temaya uyar). Tema = `html.dark` + değişken flip; `emulateMedia({colorScheme})` temayı çevirmez — localStorage set + reload veya toggle

- [ ] **3. reduced-motion + no-WebGL + mobil "low"**
  - reduced-motion (`emulateMedia({reducedMotion:'reduce'})`) → **StaticFlow** fallback (6 sayfada)
  - no-WebGL: `getContext` shim / WebGL kapatma → statik fallback
  - mobil "low": viewport ≤768 → degradasyon; **"low" DOM-attribute yok** → gating-değişmezi ile doğrula (Faz 3 öğrenimi, TK6)

- [ ] **4. Birleşik mod + viewport/CLS**
  - **AR-RTL × dark × reduced birlikte** (en zor kombinasyon) — 6 sayfada bozulma yok
  - 320 / 768 / 1440 viewport'ta yatay taşma yok; near-zero CLS (LCP/CLS ölçümü öncesi `/proc/loadavg`)

- [ ] **5. Triyaj & kayıt**
  - Bulgular TK7 triyaj; sonuç task Oturum Kaydı + PHASE-9 notu

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

- [ ] 6 sayfada light + dark koşuldu, FOUC yok, LivingFlow temaya uyumlu
- [ ] reduced-motion → StaticFlow; no-WebGL → statik fallback; mobil "low" gating-değişmezi ile teyit
- [ ] AR-RTL × dark × reduced birleşik mod 6 sayfada bozulmadı
- [ ] 320/768/1440'ta yatay taşma yok; near-zero CLS
- [ ] Standalone Playwright script scratchpad'de kaldı (repo temiz); bulgular triyajlı PHASE-9 + task doc'a yazıldı
