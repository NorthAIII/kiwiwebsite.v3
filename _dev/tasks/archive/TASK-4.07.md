# TASK-4.07: SectorSolutions gym paneli pulse-yeşili dark-inversion fix (color-contrast — C2/C3)

**Durum:** ✅ Tamamlandı
**Modül:** M1 (Tasarım Sistemi — F1.4 token) + M2 (Sayfalar — F2.4 sektör çözümleri)
**Feature:** A11Y1 (renk kontrastı WCAG AA) — dark-mode panel-inversion pulse-yeşili
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** TASK-4.01 ✅ (teyitli envanter — DEV-2 dark-only fail)

---

## Hedef

Gym (sektör) panelindeki imza pulse-yeşili öğeleri — adım numaraları (01/02/03) ve "Canlı ürünü gör" CTA — dark modda `color-contrast` denetiminden, **light görünümü birebir koruyarak** çıkarmak. Panel `bg-ink` + `text-canvas`'tır; dark modda `--color-ink` krem'e (`#f2f1e8`) döner → `text-pulse` (parlak yeşil) krem üzerinde **1.22** (fail). Mevcut hiçbir yeşil token panelin **her iki halinde** (light=koyu zemin / dark=krem zemin) 4.5'i geçmez. Çözüm: yeni **adaptif `--color-pulse-ink` token'ı** — light `#6fe36f` (= mevcut pulse; koyu panelde 11.4 ✅, görünüm değişmez), dark `#1f7a3d` (krem panelde **4.74** ✅, okunur koyu yeşil). Hem adım no hem CTA bu token'a (`text-pulse-ink`) geçer. Tamamlanma: token eklendi (light+dark), iki öğe `text-pulse-ink` kullanıyor, build temiz, axe her iki temada bu öğeleri `color-contrast` flag'lemiyor, light görünüm birebir, dark'ta öğeler okunur koyu-yeşil.

---

## Bağlam

**Kullanıcı kararı (2026-06-29, craft = tek üst eksen, ILKELER §1):** adaptif pulse-ink token. Üç seçenek sunuldu (aria-hidden+nötr CTA / hibrit / adaptif token) — kullanıcı **adaptif token**'ı seçti: panel her iki temada dürüstçe okunur, yeşil kimlik korunur, token-sistemiyle uyumlu (hardcode yok), light görünüm değişmez.

Bu task TASK-4.01 re-ölçümünün **DEV-2** bulgusundan doğdu (kapsam dışıydı, eklendi): kanonik Lighthouse koşusu **DARK** render eder (DEV-1); `bg-ink` panelleri dark'ta krem'e döndüğünde parlak pulse-yeşili fail eder. Light'ta panel koyu → pulse parlak yeşil yüksek kontrast (geçer); dark'ta panel krem → pulse okunmaz (1.22). C2 (adım no ×3, `SectorSolutions.tsx:131`) + C3 (seeLive CTA, `:143`) — ikisi de `text-pulse`, ikisi de panel içinde. `bg-pulse` canlı-nokta (`:120`, 1.5px dekoratif grafik) text-contrast'a tabi değil → **dokunulmaz** (imza canlı göstergesi parlak pulse kalır).

**Neden token, aria-hidden değil:** Adım no'lar için `aria-hidden` (K1 paraleli) düşünülebilirdi ama (a) kullanıcı dürüst/okunur fix istedi, (b) aria-hidden dark'ta öğeyi **görsel olarak** soluk-pulse bırakır (yalnız denetimden çıkar); adaptif token dark'ta da gerçekten legible yapar. CTA zaten interaktif → gizlenemez, gerçek kontrast düzeltmesi şart. İkisini tek token altında toplamak panel-içi tutarlılık verir.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — "Task 4.01 Re-ölçüm Teyidi" (DEV-1/DEV-2), Kontrast Envanteri
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — F1.4 (token sistemi, "yeni renk eklerken hem light hem dark")
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.4 sektör çözümleri (gym paneli)
- `_dev/QUALITY.md` — §1 Marka & Craft (imza pulse), §2 Erişilebilirlik

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.07 durumu
- `_dev/docs/DECISIONS.md` — yeni `--color-pulse-ink` semantik token'ı (ink-zemin imza-yeşili aksanı) kalıcı tasarım-sistemi eklemesidir; kısa karar satırı eklenir (a11y-driven, dark-inversion gerekçesi)

---

## Alt Görevler

- [x] **1. `--color-pulse-ink` token'ını ekle (light + dark)**
  - `src/app/globals.css` `@theme` bloğu (`--color-pulse` altına) — `--color-pulse-ink: #6fe36f;` (light; = mevcut pulse, koyu panelde değişmez görünüm) + açıklayıcı yorum
  - `src/app/globals.css` `html.dark` bloğu (`--color-pulse` altına) — `--color-pulse-ink: #1f7a3d;` (dark; krem panelde 4.74 ✅ — `--color-green` light değeriyle aynı marka-yeşili, keyfi değil)
  - Tailwind v4 `@theme` `--color-*` → `text-pulse-ink` utility'sini otomatik üretti (build doğruladı)

- [x] **2. Adım numaralarını `text-pulse-ink`'e geçir**
  - `src/components/SectorSolutions.tsx:131` — `text-pulse` → `text-pulse-ink` (adım no span, `0${i+1}`)

- [x] **3. seeLive CTA'yı `text-pulse-ink`'e geçir**
  - `src/components/SectorSolutions.tsx:143` — CTA `className`'inde `text-pulse` → `text-pulse-ink` ("Canlı ürünü gör" linki; ok span'ı rengi inherit eder, dokunulmadı)

- [x] **4. Doğrula (build + axe + görsel, her iki tema)**
  - `next build` temiz (37 sayfa, 0 hata/uyarı)
  - axe ana sayfa **light**: adım no (×3) + CTA `color-contrast` flag'lemiyor — sayfa geneli color-contrast ihlali **0** (regresyon yok)
  - axe ana sayfa **dark**: adım no + CTA artık flag'lenmiyor (1.22 → 4.74); sayfa geneli color-contrast ihlali **0** (son text-pulse fail'i de kapandı)
  - Gözle **light**: panel + pulse öğeleri birebir aynı (rengi `rgb(111,227,111)` = `#6fe36f` teyit)
  - Gözle **dark**: adım no + CTA okunur koyu-yeşil (`rgb(31,122,61)` = `#1f7a3d`); `bg-pulse` canlı-nokta hâlâ parlak pulse (dokunulmadı); panel hiyerarşisi makul

---

## Etkilenen Dosyalar

```
src/app/
└── globals.css          # --color-pulse-ink: light #6fe36f (@theme), dark #1f7a3d (html.dark) — YENİ token
src/components/
└── SectorSolutions.tsx   # adım no (L131) + seeLive CTA (L143): text-pulse → text-pulse-ink
```

> `globals.css` aynı zamanda TASK-4.03'te (`--color-ink-faint`) düzenlenir — **bağımsız token'lar, çakışma yok** (farklı satır/değişken); hangisi önce çalışırsa diğeri ayrı bir ekleme/değişiklik. Tüketen bileşenler yalnız SectorSolutions (panel-içi 2 öğe).

---

## Dikkat Noktaları

- **Light görünüm birebir korunur (craft üst eksen):** `--color-pulse-ink` light = `#6fe36f` = mevcut `--color-pulse` → light modda renk hiç değişmez. Yalnız dark modda (krem panel) `#1f7a3d` koyu-yeşile döner — bu kasıtlı legibility fix, craft iyileştirmesi (soluk-pulse → okunur yeşil).
- **`bg-pulse` canlı-nokta dokunulmaz** (`SectorSolutions.tsx:120`): 1.5px dekoratif grafik, text-contrast'a tabi değil; imza canlı göstergesi parlak pulse kalır.
- **Token hardcode değil:** hex'ler token tanımında (globals.css — token'ların evi); bileşenler `text-pulse-ink` utility'sini kullanır (CLAUDE.md "renk token'la, hardcode değil").
- **Dark değer marka-tutarlı:** `#1f7a3d` = `--color-green` light token değeri (zaten logo/CTA'da kullanılan marka yeşili) — keyfi seçim değil, krem panelde 4.74 ✅ (küçük metin eşiği geçer).
- **Perf/CLS regresyon yok:** yalnız renk token'ı + class swap; layout/asset/JS dokunulmaz → CLS=0.
- **RTL (AR):** panel layout aynalanır; renk/token değişimi RTL'i etkilemez.
- **Her iki tema axe ile:** Lighthouse kanonik koşusu dark render eder (DEV-1) → dark zaten gate'te; light'ı axe `emulateMedia({colorScheme:'light'})` ile ayrı teyit (regresyon yok).
- **Kapsam = ana sayfa panel.** `text-pulse` başka yüzeylerde varsa (alt sayfa showcase) bu task **ana sayfa** kapsamlı; token global tanımlı ama swap yalnız SectorSolutions'ta. Alt-sayfa derin a11y kapsam dışı (PHASE-4 Kapsam Dışı).

---

## Test Kriterleri

- [x] `next build` temiz geçer (37 sayfa, 0 hata/uyarı)
- [x] axe ana sayfa **dark**: gym-panel adım no (×3) + seeLive CTA `color-contrast` **flag'lemiyor** (1.22 → 4.74); sayfa geneli color-contrast = 0
- [x] axe ana sayfa **light**: aynı öğeler flag'lenmiyor (regresyon yok); sayfa geneli color-contrast = 0
- [x] Gözle **light**: panel + pulse öğeleri görünüm birebir aynı (`#6fe36f` teyit)
- [x] Gözle **dark**: adım no + CTA okunur koyu-yeşil (`#1f7a3d`); `bg-pulse` canlı-nokta parlak pulse korundu
- [x] i18n etkisi yok (anahtar/metin değişmedi); `next build` 37 sayfa

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `--color-pulse-ink` adaptif token eklendi: `globals.css` `@theme` → `#6fe36f` (light, = mevcut `--color-pulse`), `html.dark` → `#1f7a3d` (dark). Tailwind v4 `@theme` → `text-pulse-ink` utility'sini otomatik üretti.
- `SectorSolutions.tsx`: adım no span (L131) + seeLive CTA (L143) `text-pulse` → `text-pulse-ink`. `bg-pulse` canlı-nokta (L120) **dokunulmadı** (imza canlı göstergesi).
- Doğrulama: build temiz (37 sayfa); fresh prod-serve (:4173, listening PID teyit) + axe-core 4.11.4 (Playwright, sistem Chrome, emulateMedia colorScheme + reducedMotion + scroll) light+dark; gym paneli screenshot light+dark.

**Sorunlar:**
- ESM script `playwright`'i NODE_PATH'ten çözemedi → mutlak yol + CommonJS default-import (`import pkg; const {chromium}=pkg`). Playwright chromium-1229 eksikti → `executablePath: /usr/bin/google-chrome` (Lighthouse'un kanonik Chrome'u).

**Kararlar:**
- `--color-pulse-ink` semantik token'ı (ink-zemin imza-yeşili aksanı; light=pulse, dark=koyu marka-yeşili) kalıcı tasarım-sistemi eklemesi.
- docs/DECISIONS.md'ye eklendi: Evet (2026-06-30 — adaptif pulse-ink token)

**Kalan İşler:**
- Yok (task tamamlandı). Faz 4 son adımı: TASK-4.08 final çift-tema a11y=100 doğrulaması.

**Dosya Değişiklikleri:**
- `src/app/globals.css` → `--color-pulse-ink` token (light `@theme` + dark `html.dark`) + açıklayıcı yorum
- `src/components/SectorSolutions.tsx` → adım no (L131) + seeLive CTA (L143): `text-pulse` → `text-pulse-ink`

**Test Sonuçları:**
- `next build`: temiz, 37 sayfa, 0 hata/uyarı.
- axe color-contrast (fresh-prod-serve :4173, axe-core 4.11.4): **light** sayfa geneli 0 ihlal (adım no + CTA `rgb(111,227,111)`=`#6fe36f`, birebir eski); **dark** sayfa geneli 0 ihlal (adım no + CTA `rgb(31,122,61)`=`#1f7a3d`, 1.22→4.74). pulse-ilişkili ihlal her iki temada 0.
- Gözle (1400px, light+dark): light panel/pulse birebir; dark adım no + CTA okunur koyu-yeşil, `bg-pulse` canlı-nokta parlak pulse korundu.

---

**Oluşturulma:** 2026-06-29
**Tamamlanma:** 2026-06-30
