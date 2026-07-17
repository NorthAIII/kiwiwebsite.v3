# TASK-17.04: S3 — Mod Kombinasyonları / Living Flow Degradasyon (+ Alpfit before/after)

**Durum:** ⬜ Bekliyor
**Modül:** M1 Living Flow (+M3 Etkileşim) (modules/M1-LivingFlow-TasarimSistemi.md, M3-Etkilesim-Primitives.md)
**Feature:** S3 senaryo grubu — Living Flow degradasyon & mod kombinasyonları (doğrulama)
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.03 ✅ (lineer sıra; runtime katmanına ilk giriş)

---

## Hedef

**Gerçek tarayıcı + WebGL runtime** (`page.route` interception + **system Chrome** `channel:'chrome'`+swiftshader) ile Living Flow degradasyonunu ve mod kombinasyonlarını uçtan-uca doğrula: **ana sayfa sayfa-boyu nabız** (light/dark FOUC yok · reduced-motion tüm sayfa StaticFlow · no-WebGL static · **mobil-low → nabız desktop-only, mobilde yok** · AR-RTL×dark×reduced çakışmasız) + **v0.4 yeni yüzey: Alpfit sayfası before/after Living Flow** degradasyonlu + 320/768/1440 **taşma yok + near-zero CLS** (perf korunan taban CLS bileşeni, 17.03'ten devir). v0.4 nabza **hiç dokunmadı** → home nabzı re-teyit; **Alpfit before/after asıl yeni doğrulanacak WebGL yüzeyi**. Tamamlanma = mod matrisi runtime'da koşuldu, ayırt-edicilik sanity ile, triyajlı PHASE-17'ye kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S3 araç satırı (C: `page.route`+system Chrome, WebGL ŞART) + Dikkat Edilecekler (ölçüm disiplini tuzakları) + Sahipsiz Alan (Alpfit before/after degradasyonlu mu)
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — bundled chromium WebGL vermez → `channel:'chrome'`+`--enable-unsafe-swiftshader` şart; ayırt-edicilik sanity (full-motion+WebGL→canvas var)
- `_dev/memory/sandbox-runtime-browser-page-route.md` — `next start` denenmez (exit 144) → tek-process `page.route` diskten servis
- `_dev/memory/a11y-olcum-tema-tuzagi.md` + `runtime-harness-selector-teyidi.md` — `html.dark` + light+dark iki koşu; reduced-motion + scroll; selector kaynaktan teyit (LivingFlow canvas)
- `src/components/living-flow/` (LivingFlow degradasyon wrapper), `src/components/alpfit/AlpfitHero.tsx` (before/after Living Flow)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.04 durumu + S3 bulgu notu

---

## Alt Görevler

- [ ] **1. Runtime harness kurulumu (`page.route` + system Chrome)**
  - Harness proje-içine yaz (scratchpad `playwright`'i çözemez); `chromium.launch({channel:'chrome', args:['--enable-unsafe-swiftshader','--disable-dev-shm-usage', ...]})`; `.next` prerender+static diskten `page.route` ile servis
  - **Ayırt-edicilik sanity:** full-motion+WebGL → LivingFlow **gerçek canvas** render ediyor mu (yoksa her mod yanlış-static görünür); WebGL2=true teyidi

- [ ] **2. Ana sayfa sayfa-boyu nabız — mod matrisi (v0.4 dokunmadı → re-teyit)**
  - light/dark: FOUC yok (early===final); reduced-motion: canvas=0 **tüm sayfa** StaticFlow (yalnız hero değil); no-WebGL: canvas=0 static
  - **mobil-low: nabız desktop-only** (pageLevel canvas mobilde yok; hero-contained korunur)
  - AR-RTL × dark × reduced: rtl+dark+static+`lang=ar` çakışmasız

- [ ] **3. Alpfit sayfası before/after Living Flow (v0.4 yeni yüzey)**
  - `/spor-salonu-yazilimi` AlpfitHero before/after sağ sütun Living Flow degradasyonlu mu (full-motion canvas var, reduced-motion/no-WebGL static'e düşer); imza korunuyor

- [ ] **4. Taşma & CLS (perf korunan taban CLS bileşeni)**
  - 320/768/1440'ta `overflowX=0` (yatay taşma yok) her iki sayfada; **near-zero CLS** ölçümü (Lantern-deterministik kıyaslanabilir; masaüstü perf 100 Faz 14 mühürlü, burada yeniden ölçülmez)

- [ ] **5. Triyaj & kayıt**
  - Kapsam-içi bug → düzeltme task'ı; harness artefaktı (selector/env) ≠ gerçek bug ayrımı (memory: önce "artefakt mı" diye sor); PHASE-17 kaydı

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Runtime harness proje-içine geçici yazılır, koşulur, SİLİNİR (kalıcı değil). Referans tanımlayıcılar ZATEN-VAR (LivingFlow + AlpfitHero repoda). YENİ kalıcı dosya yok. -->

```
_dev/
├── tasks/TASK-17.04.md          # Oturum kaydı + mod matrisi sonuçları
├── phases/PHASE-17.md           # Task Listesi 17.04 + notu
└── DURUM.md                     # Aktif task + özet
(geçici runtime harness proje-içine yazılıp koşulduktan sonra silinir — commit'lenmez)
```

---

## Dikkat Noktaları

- **WebGL yalnız system Chrome (memory):** bundled chromium `getContext('webgl2')=null` → LivingFlow her zaman static'e düşer → "sayfa-boyu nabız" **ayırt-edilemez** (yanlış-static). `channel:'chrome'`+`--enable-unsafe-swiftshader`+`--disable-dev-shm-usage` şart. Ayırt-edicilik sanity ekle.
- **`next start` DENENMEZ (memory):** doğrudan `page.route` interception (tek-process, sandbox öldürmez); `next start`/`webServer` denenmeden başla.
- **Tema tuzağı (memory):** `html.dark` class + CSS-değişken flip → `emulateMedia({colorScheme})` **çevirmez**; tema-toggle butonu/localStorage üzerinden. Light+dark **iki koşu**.
- **Reveal tuzağı:** `reducedMotion:'reduce'` + uçtan-uca scroll (full-motion'da reveal `opacity:0` atlanır → yanlış ölçüm).
- **Selector teyidi (memory):** LivingFlow canvas / degradasyon mekanizması kaynaktan teyit; harness "FAIL" → önce **artefakt mı** diye sor (kör red yok), sonra gerçek-bug.
- **v0.4 nabza dokunmadı:** home nabzı Faz 12/14 mühürlü → S3 re-teyit; **Alpfit before/after tek gerçek yeni WebGL yüzeyi.**

---

## Test Kriterleri

- [ ] Ayırt-edicilik sanity: full-motion+WebGL2 → LivingFlow gerçek canvas (yanlış-static değil)
- [ ] Ana sayfa: light/dark FOUC yok; reduced-motion tüm sayfa canvas=0; no-WebGL static; **mobil-low nabız yok (desktop-only)**; AR-RTL×dark×reduced çakışmasız
- [ ] Alpfit before/after Living Flow degradasyonlu (full-motion canvas var, reduced/no-WebGL static)
- [ ] 320/768/1440 `overflowX=0` (iki sayfa) + **near-zero CLS**
- [ ] Harness artefaktı ≠ gerçek bug ayrımı yapıldı; bulgular triyaj + PHASE-17'ye; kaynak kod değişmedi; geçici harness silindi

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

**Durum:** [durum]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
