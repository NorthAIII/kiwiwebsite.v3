# TASK-4.06: Dil-switcher `aria-label`'a locale kodu (label-content-name-mismatch — A11Y3)

**Durum:** ✅ Tamamlandı
**Modül:** M3 (Etkileşim & UX Primitives) — F3.4 dil kontrolü (+M4 i18n)
**Feature:** A11Y3 (dil-switcher aria-mismatch)
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** TASK-4.01 ✅ (teyitli envanter)

---

## Hedef

Dil-switcher trigger butonunun `aria-label`'ını görünür metni (locale kodu) **içerecek** biçimde düzeltmek (WCAG 2.5.3 Label in Name). Mevcut: görünür metin `{locale}` → CSS `uppercase` ile "TR"; `aria-label="Language / Dil"` (hardcoded) "TR"yi içermiyor → `label-content-name-mismatch`. Fix kod-only: `aria-label={`${LABELS[locale]} (${locale.toUpperCase()})`}` → örn. "Türkçe (TR)" → görünür "TR"yi içerir ✅, anlamlı kalır. `LABELS` zaten component-içi sabit (i18n messages değil) → **yeni i18n anahtarı YOK → 5-dil parite kuralı tetiklenmez.** Paylaşılan component → Nav + Footer + (alt sayfa) PageHeader tek seferde düzelir. Tamamlanma: aria-label locale kodunu içeriyor, build temiz, axe `label-content-name-mismatch` **0 başarısız** (ana sayfada 2 mount), 5 dilde anlamlı.

---

## Bağlam

Araştırma kararı **K4**. Sorun (`LanguageSwitcher.tsx:63`): `aria-label="Language / Dil"` hardcoded; görünür metin (`:75` `<span className="...uppercase">{locale}</span>`) locale kodu. WCAG 2.5.3: erişilebilir ad görünür metin string'ini içermeli. Reddedilen alternatif: label'ı i18n'leştir → anahtar×5 + parite yüzeyi açar, gereksiz. `LABELS` (`:8-14`) zaten 5 locale için component-içi sabit (tr/en/ar/de/es) → kullanılabilir, mesaj dosyalarına dokunmaz.

**aria-label kompozisyonu:** `LABELS[locale]` = dil adı kendi dilinde (örn. "Türkçe", "العربية"); `(${locale.toUpperCase()})` = görünür kodu garanti içerir. Sonuç "Türkçe (TR)", "English (EN)", "العربية (AR)" vb.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — "Değerlendirilen Yaklaşımlar" A11Y3 + K4
- `_dev/modules/M3-Etkilesim-Primitives.md` — F3.4 (dil kontrolü, aria-haspopup/expanded)
- `_dev/QUALITY.md` — §2 Erişilebilirlik (ARIA), §4 Yerelleştirme

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.06 durumu

---

## Alt Görevler

- [x] **1. `aria-label`'ı dinamik kur**
  - `src/components/LanguageSwitcher.tsx:63` — `aria-label="Language / Dil"` → `aria-label={`${LABELS[locale]} (${locale.toUpperCase()})`}`
  - `LABELS` ve `locale` zaten scope'ta (`:8`, `:27`) — yeni import/anahtar yok

- [x] **2. Doğrula (build + axe + i18n + RTL)**
  - `next build` temiz
  - axe ana sayfa (light + dark): `label-content-name-mismatch` **0 başarısız** (Nav + Footer 2 mount)
  - 5 dilde aria-label anlamlı + locale kodu içeriyor (örn. AR "العربية (AR)") — Playwright ile teyit
  - Yeni i18n anahtarı eklenmedi (mesaj dosyaları değişmedi)

---

## Etkilenen Dosyalar

```
src/components/
└── LanguageSwitcher.tsx   # aria-label hardcoded → `${LABELS[locale]} (${locale.toUpperCase()})` (L63)
```

> Paylaşılan component: Nav + Footer (ana sayfa 2 mount) + PageHeader (alt sayfalar) tek değişiklikle düzelir.

---

## Dikkat Noktaları

- **Yeni i18n anahtarı YOK** — `LABELS` component-içi sabit, mesaj dosyaları değil. Bu yüzden 5-dil parite kuralı **tetiklenmez** (MEMORY Süreç Disiplinleri: anahtar EKLEME ≠ değer). Fix i18n'leştirmeye **kaydırılmaz** (parite yüzeyi açmamak için — research K4).
- **WCAG 2.5.3 Label in Name:** erişilebilir ad görünür metni (locale kodu, CSS-uppercase "TR") içermeli. `(${locale.toUpperCase()})` bunu garanti eder.
- **Görünüm değişmez:** yalnız `aria-label` (görünür DOM/CSS dokunulmaz).
- **RTL (AR):** `LABELS["ar"]` = "العربية" + "(AR)" → AR'de de locale-özel anlamlı ad; aria-label değişimi RTL layout'u etkilemez.
- **Perf/CLS regresyon yok:** yalnız attribute değeri.
- `aria-haspopup="listbox"` / `aria-expanded` (F3.4) korunur — dokunulmaz.

---

## Test Kriterleri

- [x] `next build` temiz geçer
- [x] axe ana sayfa (light + dark): `label-content-name-mismatch` **0 başarısız** (Nav + Footer mount)
- [x] aria-label 5 dilde anlamlı + görünür locale kodunu içeriyor (tr/en/ar/de/es)
- [x] Mesaj dosyaları (`messages/*.json`) **değişmedi** (yeni anahtar yok)
- [x] Dil menüsü açma/seçme/Escape davranışı bozulmadı

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
- `src/components/LanguageSwitcher.tsx:63` — hardcoded `aria-label="Language / Dil"` → `aria-label={`${LABELS[locale]} (${locale.toUpperCase()})`}`. Tek satır, tek dosya. `LABELS` (component-içi sabit, `:8-14`) + `locale` (`:27`) zaten scope'ta → yeni import/i18n anahtarı yok.
- WCAG 2.5.3 Label in Name: görünür metin locale kodu (CSS-uppercase "TR"); yeni erişilebilir ad locale kodunu `(${locale.toUpperCase()})` ile garanti içeriyor.

**Sorunlar:**
- Doğrulama ortamı kurulumu: projede axe-core/playwright yoktu. Çözüm — axe-core 4.11.4 npx-cache'inden (`~/.npm/_npx/.../axe-core/axe.min.js`, lighthouse bundle'ı içinde) enjekte; Playwright 1.61.1 + Chromium 1228 (cache'te kurulu). İlk denemede pw modülü CommonJS default-export + browser revision 1229≠1228 uyuşmazlığı → 1.61.1 modülü + `executablePath` kurulu headless-shell-1228'e sabitlendi.
- Smoke testte seçim sonrası URL `/en` göründü → `networkidle` soft-navigation'dan önce çözülmüş (test zamanlaması, kod değil). `waitForFunction(lang==='tr')` ile yeniden test → seçim doğru çalışıyor (EN→`/`, lang=tr, label "Türkçe (TR)").

**Kararlar:**
- Fix kod-only (component-içi sabit), i18n'leştirilmedi — research K4 kararı (parite yüzeyi açmamak). Yeni karar yok.
- docs/DECISIONS.md'ye eklendi: Hayır (mevcut K4 kararının icrası).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- `src/components/LanguageSwitcher.tsx` → `:63` aria-label hardcoded string → dinamik `${LABELS[locale]} (${locale.toUpperCase()})`. Görünür DOM/CSS, `aria-haspopup`/`aria-expanded`, menü mantığı dokunulmadı.

**Test Sonuçları:**
- `next build` temiz (37 sayfa).
- axe-core 4.11.4 (Playwright, fresh prod-serve :4173, PID 1705107 teyit; stray yok): `label-content-name-mismatch` — **light+dark × 5 dil = 0 ihlal**; her sayfada Nav+Footer 2 mount, ikisi de doğru label.
- aria-label 5 dilde: "Türkçe (TR)" · "English (EN)" · "العربية (AR)" · "Deutsch (DE)" · "Español (ES)" — hepsi görünür locale kodunu içeriyor, anlamlı. AR `dir=rtl` doğru.
- `messages/*.json` değişmedi (git status: yalnız `LanguageSwitcher.tsx`).
- Menü davranışı: aç (`aria-expanded` false→true, listbox görünür, 5 seçenek), Escape kapatır (→false), seç (EN→Türkçe → `/`, lang=tr, label güncellenir). Bozulma yok.

---

**Oluşturulma:** 2026-06-29
