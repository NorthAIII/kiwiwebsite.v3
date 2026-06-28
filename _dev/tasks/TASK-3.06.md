# TASK-3.06: S3 — Mod Kombinasyonları (Living Flow Degradasyon)

**Durum:** ⬜ Bekliyor
**Modül:** M1 — Living Flow & Tasarım Sistemi (modules/M1-LivingFlow-TasarimSistemi.md) (+ M3)
**Feature:** S3 — Mod kombinasyonları / Living Flow degradasyon (validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (prod serve; client-only olduğu için zorunlu tarayıcı)

---

## Hedef

Living Flow degradasyonunu ve layout bütünlüğünü tarayıcıda doğrula: light/dark (FOUC yok), reduced-motion → StaticFlow (canvas yok, içerik gizli kalmaz), no-WebGL → StaticFlow, mobil → "low", **AR-RTL × dark × reduced birlikte**, 320/768/1440 yatay taşma yok + near-zero CLS. Araç: Playwright MCP (emulateMedia + viewport resize + no-WebGL shim). Living Flow client-only (`ssr:false`) olduğundan **zorunlu tarayıcı**. Tüm mod matrisi koşulup gözlemler kaydedildiğinde tamamlanmış sayılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — F1.1/F1.2 degradasyon (high/low/static, StaticFlow), F1.4 FOUC script + reduced-motion
- `_dev/modules/M3-Etkilesim-Primitives.md` — F3.1 reduced-motion'da içerik gizlenmez
- `_dev/phases/PHASE-3.md` — Araştırma → TK5 + Dikkat (client-only, tema=localStorage, perf record-not-fix) + S3 araç satırı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.06 durumu

---

## Alt Görevler

- [ ] **1. Tema modları (light/dark, FOUC yok)**
  - light + dark home render; FOUC yok (FOUC script doğru sınıfı `<body>` boyanmadan uygular).
  - **dark = localStorage set + reload VEYA toggle'a tıkla** — `emulateMedia({colorScheme})` temayı **çevirmez** (research).

- [ ] **2. reduced-motion → StaticFlow**
  - `emulateMedia({reducedMotion:'reduce'})` → StaticFlow SVG (canvas yok); içerik **görünür kalır** (Reveal reduced-motion'da gizlemez — M3 F3.1).

- [ ] **3. no-WebGL → StaticFlow**
  - WebGL context kapatma / `getContext` shim → StaticFlow; canvas mount olmaz (M1 F1.2).

- [ ] **4. mobil → "low"**
  - Mobil viewport / düşük güç → "low" kalite (az eğri/nabız — M1 F1.1).

- [ ] **5. Kombinasyon: AR-RTL × dark × reduced birlikte**
  - Üçü aynı anda — aynalama + statik fallback + dark token birlikte bozulmuyor (bağımsız test edilen modlar **birlikte** de doğru).

- [ ] **6. Responsive bütünlük**
  - 320 / 768 / 1440 viewport → yatay taşma yok, near-zero CLS gözlemle.

- [ ] **7. Triyaj (TK6)** — CLS/taşma/a11y açığı record-not-fix; perf-bitişik ölçümden önce `cat /proc/loadavg` (memory).

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Bulgular bu task dokümanına. İstisna: kapsam-içi degradasyon bug'ı (ör. reduced-motion'da içerik gizli kalıyor) → fix-task.

---

## Karar Noktaları

- **Degradasyon emülasyon yolu:** Playwright MCP `emulateMedia` (reducedMotion/colorScheme) + viewport resize + no-WebGL shim = **ana yol**. MCP emülasyonu kırılgan/güvenilmez çıkarsa → **fallback (TK5):** gating kod-incelemesi (`matchMedia` + globals.css media query gating) + DevTools rendering. Yargı: emülasyon güvenilir değilse kod-inceleme ile teyit et, **yanlış-negatif üretme**.

---

## Dikkat Noktaları

- **Living Flow client-only** (`dynamic ssr:false` **(repo:** LivingFlow.tsx:6,29-42**)**) → curl markup'ta canvas/StaticFlow YOK (yalnız `mode:"idle"` base-wash SSR'da). S3 zorunlu tarayıcı (research).
- **Tema = localStorage + `html.dark`, prefers-color-scheme DEĞİL** **(repo:** [locale]/layout.tsx:73-78 FOUC + ThemeToggle**).** `colorScheme` emülasyonu temayı çevirmez — dark = localStorage set + reload veya toggle.
- **Perf/a11y bulguları record-not-fix** (CLS/taşma sahipli/ertelenmiş — DECISIONS 2026-06-28); loadavg önce (memory).
- **Ortam:** TASK-3.01 prod serve; PID fresh teyit. `package.json`'a dokunma (Playwright MCP kurulmaz).

---

## Test Kriterleri

- [ ] light + dark → FOUC yok.
- [ ] reduced-motion → StaticFlow (canvas yok), içerik görünür.
- [ ] no-WebGL → StaticFlow.
- [ ] mobil → "low" kalite.
- [ ] AR-RTL × dark × reduced birlikte bozulmuyor.
- [ ] 320/768/1440 → yatay taşma yok + near-zero CLS (gözlem kaydı).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** ⬜ Bekliyor

---

**Oluşturulma:** 2026-06-29
