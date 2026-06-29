# TASK-4.06: Dil-switcher `aria-label`'a locale kodu (label-content-name-mismatch — A11Y3)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. `aria-label`'ı dinamik kur**
  - `src/components/LanguageSwitcher.tsx:63` — `aria-label="Language / Dil"` → `aria-label={`${LABELS[locale]} (${locale.toUpperCase()})`}`
  - `LABELS` ve `locale` zaten scope'ta (`:8`, `:27`) — yeni import/anahtar yok

- [ ] **2. Doğrula (build + axe + i18n + RTL)**
  - `next build` temiz
  - axe ana sayfa (light + dark): `label-content-name-mismatch` **0 başarısız** (Nav + Footer 2 mount)
  - 5 dilde aria-label anlamlı + locale kodu içeriyor (örn. AR "العربية (AR)") — gözle/MCP ile kontrol
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

- [ ] `next build` temiz geçer
- [ ] axe ana sayfa (light + dark): `label-content-name-mismatch` **0 başarısız** (Nav + Footer mount)
- [ ] aria-label 5 dilde anlamlı + görünür locale kodunu içeriyor (tr/en/ar/de/es)
- [ ] Mesaj dosyaları (`messages/*.json`) **değişmedi** (yeni anahtar yok)
- [ ] Dil menüsü açma/seçme/Escape davranışı bozulmadı

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-06-29
