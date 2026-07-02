# TASK-3.06: S3 — Mod Kombinasyonları (Living Flow Degradasyon)

**Durum:** ✅ Tamamlandı
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

- [x] **1. Tema modları (light/dark, FOUC yok)** ✅ light: `isDark=false`, bodyBg `rgb(247,246,241)`, canvas=1; dark (localStorage pre-set): isDark **domcontentloaded'da true** (FOUC kanıtı), inline-script `<head>`'de & `<body>`'den önce, bodyBg `rgb(19,21,16)`, canvas=1. İki tema da Living Flow'u bozmuyor.
  - **dark = localStorage set + reload VEYA toggle'a tıkla** — `emulateMedia({colorScheme})` temayı **çevirmez** (research). → `addInitScript(localStorage.theme='dark')` ile pre-set kullanıldı.

- [x] **2. reduced-motion → StaticFlow** ✅ `newContext({reducedMotion:'reduce'})` → canvas=0, StaticFlow SVG (4 path) + base-wash var; **Reveal 12/12 görünür / 0 gizli** (M3 F3.1 — reduced-motion içerik gizlemez); konsol 0-error.

- [x] **3. no-WebGL → StaticFlow** ✅ `addInitScript` ile `getContext('webgl'/'webgl2')→null` shim → `supportsWebGL()=false` → canvas=0, StaticFlow SVG (4 path); hero görünür; konsol 0-error. (Motion açık olduğundan fold-altı `[data-reveal]` scroll'da açılır — before 0/30 → after 30/30, takılmıyor.)

- [x] **4. mobil → "low"** ✅ viewport 390×844 → `matchMedia(max-width:768px)=true` → `lowPower` zorunlu → canvas=1 + StaticFlow yok ⟹ **mode "low"** (gating-değişmezi: ≤768px'te kod "high" üretemez). Görsel: low FlowCanvas (az nabız) render ediyor.

- [x] **5. Kombinasyon: AR-RTL × dark × reduced birlikte** ✅ `/ar` + dark + reduce: `dir=rtl`, `lang=ar`, `isDark=true`, bodyBg `rgb(19,21,16)`, canvas=0 + StaticFlow var, **StaticFlow color `rgb(242,241,232)`=LIGHT_INK** (tema-duyarlı: dark→açık mürekkep), hero görünür, yatay taşma yok (1425<1440), konsol 0-error. Görsel: nav/hero doğru aynalanmış (logo sağ, CTA sol).

- [x] **6. Responsive bütünlük** ✅ 320/768/1440 → hepsinde `scrollWidth<innerWidth` (yatay taşma yok, offender=0), **CLS=0** (1440'ta 1 entry, değer≈0), canvas=1, hero görünür, konsol 0-error. loadavg 0.49 (düşük) ölçüm öncesi teyit edildi.

- [x] **7. Triyaj (TK6)** ✅ Kapsam-içi **yeni** layout/yatay-taşma bug'ı YOK (3 viewport temiz). CLS bilinen-green (0). **Bilinen** a11y/perf açığı (a11y 89; mobil perf 87 / LCP 3.1s — DECISIONS 2026-06-28) bu testte yüzeye çıkmadı (S3 degradasyon eksenidir, Lighthouse koşulmadı) → sahipli/ertelenmiş kalır, yeniden litige edilmedi. Perf-bitişik (CLS) ölçümden önce `cat /proc/loadavg` yapıldı (memory).

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
- **Bilinen a11y/perf açıkları record-not-fix** (a11y 89: marka-yeşili kontrast + `<dl>` + dil-switcher aria; mobil perf 87 / LCP 3.1s — DECISIONS 2026-06-28; CLS bilinen-green 0). **Yeni** layout/yatay-taşma bug'ı ana sayfada = kapsam-içi → normal triyaj (TK6, fix-task adayı), auto-defer DEĞİL — yalnız *bilinen* açıklar ertelenir (discuss-phase bulgu politikası). Perf ölçümünden önce loadavg (memory).
- **Ortam:** TASK-3.01 prod serve; PID fresh teyit. `package.json`'a dokunma (Playwright MCP kurulmaz).

---

## Test Kriterleri

- [x] light + dark → FOUC yok. (inline tema script `<head>`'de body'den önce; dark localStorage'da domcontentloaded'da uygulanmış)
- [x] reduced-motion → StaticFlow (canvas=0), içerik görünür (Reveal 12/12).
- [x] no-WebGL → StaticFlow (`supportsWebGL()=false`, canvas=0).
- [x] mobil → "low" kalite (gating-değişmezi: ≤768px → canvas var + high imkânsız ⟹ low).
- [x] AR-RTL × dark × reduced birlikte bozulmuyor (rtl+dark token+static birlikte, taşma yok, 0-error).
- [x] 320/768/1440 → yatay taşma yok + near-zero CLS (CLS=0, offender=0; gözlem kaydı yapıldı).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Kanonik ortam:** `rm -rf .next && next build` (exit 0, **temiz** — 0 hata/uyarı, 37 statik sayfa → S8-build regresyon tabanı re-teyit) + `PORT=3100 next start`. Listening-PID **3303870** fresh teyit (ELAPSED 10s; Jun28 stray `next-server` PID 12708 hiçbir portu dinlemiyordu, dokunulmadı) — memory disiplini. İş sonu kendi process kill (port 3100 boş bırakıldı).
- **Araç:** Playwright MCP `browser_run_code_unsafe` (raw `page` erişimi) ana sürücü — MCP'de ayrı `emulateMedia` tool'u yok; bu escape-hatch ile `page.emulateMedia` + `context.addInitScript` + `browser.newContext` (her test izole context: temiz init-script/colorScheme/reducedMotion/viewport). `hasBrowserObj=true` → newContext izolasyonu mümkün. TK5 fallback (kod-inceleme) gerekmedi; emülasyon güvenilir çalıştı. **Headless'ta WebGL gerçekten çalışıyor** (baseline canvas=1, StaticFlow yok) → high/low yolu gerçekten koşuldu, fallback değil.
- **6 alt görev + 7. triyaj** (detay üstte, her madde [x]): tema light/dark + FOUC, reduced→StaticFlow, no-WebGL→StaticFlow, mobil→low, AR-RTL×dark×reduced, responsive 320/768/1440. Hepsi yeşil.
- **Kanıt görselleri** (scratchpad, commit edilmedi): reduced-light StaticFlow, AR-dark-reduced (aynalama+dark+static), mobil-low, dark-high (tema-duyarlı açık mürekkep) — craft/layout §1 gözle teyit, şablon kokusu yok.

**Sorunlar:**
- MCP'de dedik. `emulateMedia` tool'u yok: `browser_run_code_unsafe` ile raw Playwright `page.emulateMedia()` çağrıldı → çözüldü, TK5 kod-inceleme fallback'ine gerek kalmadı.
- no-WebGL/motion-on'da `[data-reveal]` fold-altı opacity:0 göründü → **bug değil**: motion açıkken Reveal scroll-tetiklemeli (before 0/30 → scroll → after 30/30). reduced-motion'da hepsi anında görünür (M3 F3.1, ayrıca kanıtlandı). İki gözlem birlikte degradasyonun içeriği gizlemediğini doğruladı.

**Kararlar:**
- "low" modu DOM'da doğrudan attribute olarak açık değil → **gating-değişmezi** ile doğrulandı (≤768px → `lowPower=true` zorunlu → tek non-static mod "low"; canvas var + matchMedia(max-width:768px)=true ⟹ low). Kaynak-mantığı airtight.
- FOUC kanıtı = inline tema script `<head>`'de & `<body>`'den önce (markup) + localStorage='dark' pre-set ile domcontentloaded'da `html.dark` zaten uygulanmış (senkron head-exec → flash yok).
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari/tasarım kararı yok; doğrulama task'ı).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- Kaynak kod değişikliği **yok** (doğrulama task'ı). Yalnız doküman: bu dosya + DURUM.md + phases/PHASE-3.md.

**Test Sonuçları:**
- light: isDark=false, bodyBg rgb(247,246,241), canvas=1, StaticFlow yok, hero görünür.
- dark(localStorage): isDarkAtDCL=true (FOUC yok), bodyBg rgb(19,21,16), canvas=1.
- reduced-motion: canvas=0, StaticFlow 4-path, Reveal 12/12 görünür, 0-error.
- no-WebGL: supportsWebGL=false, canvas=0, StaticFlow 4-path, 0-error.
- mobil(390): mqMobile=true, canvas=1 ⟹ low, hero görünür, 0-error.
- AR×dark×reduced: dir=rtl/lang=ar/isDark=true, canvas=0+StaticFlow, StaticFlow color rgb(242,241,232)=LIGHT_INK, taşma yok, 0-error.
- responsive: 320/768/1440 → taşma yok (scrollWidth<innerWidth, offender=0), CLS=0, canvas=1, 0-error. (loadavg 0.49 ölçüm öncesi.)
- **Triyaj:** kapsam-içi gerçek bug YOK. Gözlem: `/`→`/en` locale-detection (Accept-Language en-US) = next-intl beklenen davranışı, S1 routing kapsamı (TASK-3.02), S3 bulgusu değil; `/tr` explicit → TR doğru servis edildi.

---

**Oluşturulma:** 2026-06-29
