# TASK-9.06: S4 — Kontroller & Kalıcılık

**Durum:** ✅ Tamamlandı
**Modül:** M3 Etkileşim (+M1 Living Flow / M4 i18n) (modules/M3-Etkilesim-Primitives.md)
**Feature:** S4 senaryo grubu — kontroller & kalıcılık (doğrulama)
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.05 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

Tema/dil kontrollerini + klavye erişimini standalone Playwright ile (home + bir alt sayfa) doğrula: tema toggle (localStorage + reload sonrası kalıcılık + Living Flow uniform yansıması), dil-switcher (path korur, klavye/Escape/dış-tık ile kapanır), **klavye-only yolculuk** + görünür yeşil focus-visible. Tamamlanma = kontrol + kalıcılık + klavye senaryoları koşuldu, davranış kaydedildi, triyaj yapıldı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S4 araç satırı + Dikkat Edilecekler (tema=localStorage; dil-switcher path koru) 
- `_dev/memory/tema-fix-html-dark-token-flip.md` — tema kalıcılık mekanizması
- `src/components/` → Nav/ThemeToggle/dil-switcher bileşenleri, `tests/e2e/a11y-helpers.ts` (desenler)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.06 durumu + S4 bulgu notu

---

## Alt Görevler

- [x] **1. Standalone Playwright sürücü (scratchpad)**
  - Fresh prod build @ :3000 (PID 98182 teyitli); `chromium.launch({channel:'chrome', --enable-unsafe-swiftshader})`; repo'ya yazılmadı (`scratchpad/s4-kontroller.mjs`)

- [x] **2. Tema toggle & kalıcılık**
  - Toggle → `html.dark` + localStorage['theme'] + `themechange` event + bg flip; **reload sonrası tema korundu** (early==final, FOUC yok); Living Flow uniform yeni temaya uyar (canvas sameNode, remount yok → MutationObserver ile uniform çevirir). home + spor-salonu-yazilimi, iki yön (light↔dark) ✓

- [x] **3. Dil-switcher davranışı**
  - Dil seçimi **path'i korur**: sub TR→EN = `/en/spor-salonu-yazilimi`, home TR→DE = `/de` (`router.replace(pathname,{locale})`); menü **Escape / dış-tık / klavye(Enter aç, Escape kapat)** ile kapanır ✓
  - **Not:** Faz 3 "anchor path-düşme" record-not-fix bulgusu **burada ÇIKMADI** — switcher anchor değil `router.replace(pathname)` kullanıyor, path korunuyor. Yeni sahipli bulgu yok.

- [x] **4. Klavye-only yolculuk**
  - Yalnız Tab/Enter/Escape ile nav + kontroller gezildi; **focus-visible yeşil outline** 14 interaktif öğenin hepsinde (green rgb(31,122,61)); 14 Tab boyunca body'ye odak kaybı yok; klavye ile tema toggle çalıştı ✓

- [x] **5. Triyaj & kayıt**
  - Bulgu yok (17/17 ✓). Ölçüm nüansı kaydedildi (transition-colors outline-color → PHASE-9 notu). Sonuç task Oturum Kaydı + PHASE-9'a yazıldı.

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Playwright script scratchpad'de. -->

```
scratchpad/  (commit'lenmez)
└── s4-kontroller.mjs           # YENİ — standalone Playwright sürücü (repo dışı)
_dev/
├── tasks/TASK-9.06.md          # Oturum kaydı + bulgular
├── phases/PHASE-9.md           # Task Listesi 9.06 + S4 notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **Tema kalıcılık = localStorage + `html.dark`**, prefers-color-scheme değil → reload testinde localStorage'ın korunduğunu (aynı context) teyit et.
- **Dil-switcher path-koru** anchor kütüphane-varsayılanıyla düşebilir (Faz 3 record-not-fix) — bug'sa TK7 sahipli kayıt, bu fazda düzeltilmez (kapsam-içi olsa da Faz 3'te sahiplenildi; çıkarsa doğrula/karşılaştır).
- **focus-visible** yeşil outline QUALITY §2 gereği — klavye-only'de görünürlük zorunlu.
- Kanonik ortam = fresh prod build; TR cookie (`gotoLocalized`).

---

## Test Kriterleri

- [x] Tema toggle → localStorage + `html.dark`; reload sonrası kalıcı; Living Flow uniform uyumlu ✓ (home + sub, iki yön)
- [x] Dil-switcher path'i korur (home + alt sayfa); Escape/dış-tık/klavye ile kapanır ✓ (path-düşme çıkmadı — router.replace path korur)
- [x] Klavye-only yolculuk tam çalışır; yeşil focus-visible her interaktif öğede görünür ✓ (14 öğe, green rgb(31,122,61), odak kaybı yok)
- [x] Standalone script scratchpad'de kaldı; bulgular triyajlı PHASE-9 + task doc'a yazıldı ✓

---

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
- Kanonik ortam: fresh `next build` + `next start -p 3000`, listening-PID 98182 teyitli (stray/stale server yok — memory disiplini).
- Standalone Playwright sürücü (`scratchpad/s4-kontroller.mjs`, `channel:'chrome'` + `--enable-unsafe-swiftshader`; bundled chromium WebGL vermez → memory). **17 kontrol: 17 ✓ · 0 N/A · 0 ✗.**
- **0-sanity:** WebGL açık + full-motion → home canvas=1 (mode high) → LivingFlow uniform gözlemi ayırt edici/geçerli.
- **S4-tema (1):** home + spor-salonu-yazilimi × (toggle/uniform/persist/toggleback) 8/8 — light→dark `html.dark` + `localStorage['theme']` + `themechange` event + bg flip; canvas **sameNode** (remount yok) → uniform MutationObserver ile çevrilir, FOUC yok; reload sonrası early.dark==final.dark==ls (kalıcı, FOUC yok); dark→light geri + light kalıcı.
- **S4-dil (2):** path-koru sub TR→EN=`/en/spor-salonu-yazilimi`, home TR→DE=`/de` (`router.replace(pathname,{locale})`); Escape/dış-tık/klavye(Enter aç·Escape kapat) kapanış 5/5.
- **S4-klavye (3):** 14 interaktif öğede focus-visible **yeşil** outline (green rgb(31,122,61), 2px solid); 14 Tab boyunca odak kaybı (body'ye düşüş) yok; klavye Enter ile tema toggle çalışır.

**Sorunlar:**
- İlk koşuda `3-focusvisible` FAIL: outline-color öğe metin-rengi↔yeşil **ara-değer** (`rgb(54,98,65)` vb.) okundu. Kök neden: **Tailwind v4 `transition-colors` `outline-color`'ı da anime ediyor** → Tab-sonrası 60ms okuma geçişin ortasına denk geldi (bug değil, ölçüm artefaktı). Çözüm: klavye bölümünü `reducedMotion:'reduce'` context'inde koş — globals.css `@media(prefers-reduced-motion)` transition-duration'ı ≈0'a düşürür → outline anında yeşil (a11y ölçüm disiplini ile de uyumlu). Yeniden koşuda 17/17 ✓.

**Kararlar:**
- Faz 3 "anchor path-düşme" record-not-fix bulgusu bu yüzeyde **yok** — LanguageSwitcher anchor değil `router.replace(pathname)` kullanıyor → path korunuyor. Yeni sahipli bulgu açılmadı.
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari karar yok — doğrulama fazı).

**Kalan İşler:** Yok (task tamam).

**Dosya Değişiklikleri:**
- Kaynak kod **değişmedi** (doğrulama fazı). Yalnızca `_dev/` dokümanları + scratchpad script (commit'lenmez).

**Test Sonuçları:**
- `scratchpad/s4-kontroller.mjs`: **17 ✓ · 0 N/A · 0 ✗ / 17.** Kapsam-içi bug yok.

---

**Oluşturulma:** 2026-07-02
