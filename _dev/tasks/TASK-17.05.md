# TASK-17.05: S4 — Kontroller & Kalıcılık (tema/dil/klavye, Alpfit dahil)

**Durum:** ⬜ Bekliyor
**Modül:** M3 Etkileşim (+M1 Living Flow / M4 i18n) (modules/M3-Etkilesim-Primitives.md)
**Feature:** S4 senaryo grubu — kontroller & kalıcılık (doğrulama)
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.04 ✅ (lineer sıra; aynı runtime katmanı)

---

## Hedef

**Gerçek tarayıcı runtime** (`page.route` + system Chrome) ile kontrol katmanının doğru ve kalıcı çalıştığını doğrula: **tema toggle** (`html.dark` + `localStorage` + reload kalıcılık + FOUC yok + Living Flow uniform sayfa-boyu remount yok), **dil-switcher path korur** (home + **`/spor-salonu-yazilimi` (Alpfit) dahil**, klavye/Escape/dış-tık kapanış), **klavye-only yolculuk** + **focus-visible yeşil outline**. v0.4 bu katmana dokunmadı → re-teyit; yeni yüzey Alpfit dil-switcher path-koruması. Tamamlanma = kontrol matrisi runtime'da koşuldu, triyajlı PHASE-17'ye kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S4 araç satırı (C: `page.route`+Chrome) + Dikkat Edilecekler (tema `html.dark`+localStorage; dil-switcher `router.replace` **butonu**; focus-visible `reducedMotion:'reduce'` şart)
- `_dev/memory/runtime-harness-selector-teyidi.md` — LanguageSwitcher `<a href>` değil `router.replace` **butonu**; tema `html.dark`+localStorage (prefers-color-scheme değil)
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — focus-visible outline ölçümü `reducedMotion:'reduce'` şart (`transition-colors` outline-color anime → yanlış-negatif); WebGL için `channel:'chrome'`
- `_dev/memory/tema-fix-html-dark-token-flip.md` — tema `html.dark` class + CSS değişken flip
- `src/components/` → tema toggle + LanguageSwitcher bileşenleri

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.05 durumu + S4 bulgu notu

---

## Alt Görevler

- [ ] **1. Tema toggle & kalıcılık**
  - Toggle → `html.dark` class + `localStorage` + `bg` flip (light `rgb(247,246,241)` ↔ dark `rgb(19,21,16)`) + `aria-pressed`; reload sonrası **kalıcı** + **FOUC yok** (pre-paint blocking `<head>` script; early===final)
  - **Living Flow uniform sayfa-boyu remount YOK** (tema çevirince canvas damga korunur, 1→1; renk MutationObserver ile çevrilir)

- [ ] **2. Dil-switcher path korur (Alpfit dahil)**
  - home → DE = `/de`; **`/spor-salonu-yazilimi` → EN = `/en/spor-salonu-yazilimi`** (path korunur); `/crew-os` → `/en/crew-os`
  - Menü kapanış: Escape / dış-tık / klavye; `router.replace` butonu (a href değil — selector teyidi)

- [ ] **3. Klavye-only yolculuk + focus-visible**
  - Tab ile nav/CTA/dil-switcher/tema erişilebilir; **focus-visible yeşil outline** (light `#1f7a3d` + dark `#4fb06a`, 2px), odak kaybı yok
  - Ölçüm `reducedMotion:'reduce'` (transition-colors yanlış-negatif tuzağı)

- [ ] **4. Triyaj & kayıt**
  - Kapsam-içi bug → düzeltme task'ı; harness artefaktı ≠ gerçek bug ayrımı; PHASE-17 kaydı

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Runtime harness geçici (koşulur, silinir). Referans tanımlayıcılar ZATEN-VAR (tema toggle + LanguageSwitcher repoda). YENİ kalıcı dosya yok. -->

```
_dev/
├── tasks/TASK-17.05.md          # Oturum kaydı + kontrol matrisi
├── phases/PHASE-17.md           # Task Listesi 17.05 + notu
└── DURUM.md                     # Aktif task + özet
(geçici runtime harness proje-içine yazılıp koşulduktan sonra silinir — commit'lenmez)
```

---

## Dikkat Noktaları

- **Selector teyidi (memory):** LanguageSwitcher `<a href>` değil `router.replace` **butonu** → href beklersen yanlış-FAIL. Kaynaktan teyit et. Harness "FAIL" → önce **artefakt mı** diye sor.
- **Tema tuzağı (memory):** `html.dark` + CSS değişken flip → `emulateMedia` çevirmez; toggle butonu/localStorage üzerinden çevir. Light+dark iki koşu.
- **Focus-visible tuzağı (memory):** `reducedMotion:'reduce'` şart — full-motion'da `transition-colors` outline-color'ı anime eder → Tab-sonrası okuma ara-değer (yanlış-negatif).
- **`next start` DENENMEZ (memory):** doğrudan `page.route` interception; WebGL gerekiyorsa system Chrome.
- **v0.4 kontrol katmanına dokunmadı:** S4 re-teyit; yeni yüzey Alpfit dil-switcher path-koruması (`/spor-salonu-yazilimi` dahil).

---

## Test Kriterleri

- [ ] Tema toggle → `html.dark`+localStorage+bg flip+aria-pressed; reload kalıcı + FOUC yok (early===final)
- [ ] Living Flow uniform sayfa-boyu remount YOK (1→1)
- [ ] Dil-switcher path korur: home→`/de`, **`/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`**, `/crew-os`→`/en/crew-os`; menü Escape/dış-tık/klavye kapanış
- [ ] Klavye-only nav/CTA/dil/tema erişilebilir; focus-visible **yeşil outline** light+dark 2px, odak kaybı yok
- [ ] Harness artefaktı ≠ gerçek bug ayrımı; bulgular triyaj + PHASE-17'ye; kaynak kod değişmedi; geçici harness silindi

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
