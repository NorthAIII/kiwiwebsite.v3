# TASK-4.02: Adım numaraları color-contrast'tan çıkar (A11Y1-a)

**Durum:** ✅ Tamamlandı
**Modül:** M2 (Sayfalar & Bölümler) — F2.3 "Nasıl çalışır"
**Feature:** A11Y1 (renk kontrastı WCAG AA) — adım numaraları
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** TASK-4.01 ✅ (teyitli envanter)

---

## Hedef

"Nasıl çalışır" bölümündeki büyük faint adım numaralarını (`text-green/30`) `color-contrast` denetiminden, **görsel olarak hiçbir şey değiştirmeden** çıkarmak. Numaralar saf görsel pekiştirmedir (adım sırası zaten `<h3>` başlık + DOM sırasıyla SR'a iletilir); `aria-hidden="true"` ile dekoratif işaretlenir, faint "hayalet" estetiği birebir korunur, hem light hem dark'ta denetimden düşer (renk/opaklık değişmez). Tamamlanma: numara span'ları `aria-hidden`, build temiz, axe `color-contrast` bu öğeleri artık flag'lemiyor, görünüm değişmedi.

---

## Bağlam

Araştırma kararı **K1**. Reddedilen alternatifler: opaklık artırma 3:1'e **çıkamaz** (matematik: solid green cream'de 4.96, eğri %100'e yakında dik → %70'te bile 2.24–2.89); solid/koyu yeşil geçer ama faint estetiği prominent'e çevirir (craft regresyonu, ILKELER §1 Marka & Craft üst eksen). aria-hidden = sıfır görsel değişimle a11y. Mevcut: `HowItWorks.tsx:84` `<span className="font-display text-5xl text-green/30 ... group-hover:text-green">{s.n}</span>` — hover'da solid green'e geçiyor (hover hali ayrıca kontrast denetimine girmez; aria-hidden öğeyi tümden çıkarır).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — "Değerlendirilen Yaklaşımlar" A11Y1-a + K1
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.3
- `_dev/QUALITY.md` — §1 Marka & Craft, §2 Erişilebilirlik

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.02 durumu

---

## Alt Görevler

> **Not (icra):** Alt görev 1 planda `aria-hidden` idi; icrada bu mekanizmanın color-contrast'ı çözmediği kanıtlandı → CSS `::before` mekanizmasına revize edildi (kullanıcı kararı). Detay: Oturum Kayıtları.

- [x] **1. Adım numarasını color-contrast'tan çıkar (CSS `::before`)**
  - `src/components/HowItWorks.tsx:83-89` — numara `data-n` attribute'una taşındı, Tailwind `before:content-[attr(data-n)]` ile render; `aria-hidden="true"` korundu
  - Renk/opaklık/font/hover **değişmedi** (`#1f7a3d` @30% + 500ms hover→solid; `before:` variant'larına taşındı)
  - DOM sırası ve `<h3>` başlık (`s.title`, satır 89) korundu — adım anlamı SR'a başlıkla iletilir

- [x] **2. Doğrula (build + axe + görsel)**
  - `next build` temiz ✅
  - axe (4.11.4): `HowItWorks` adım numaraları artık `color-contrast` flag'lemiyor (light + dark) ✅
  - Gözle: numaraların faint görünümü + hover→solid geçişi birebir aynı (ekran görüntüsü) ✅

---

## Etkilenen Dosyalar

```
src/components/
└── HowItWorks.tsx   # adım no <span>'a aria-hidden="true" (renk/class değişmez)
```

---

## Dikkat Noktaları

- **Sıfır görsel değişim** (craft üst eksen): yalnız `aria-hidden` eklenir; renk, opaklık, class, hover davranışı aynen kalır.
- **aria-hidden kapsamı:** numara salt görsel pekiştirme; tek a11y göstergesi değil — adım sırası `<h3>` başlık + DOM sırasıyla iletilir. Numarayı gizlemek anlam kaybı yaratmaz.
- **Perf/CLS regresyon yok:** layout/asset/JS dokunulmaz → CLS=0 korunur.
- i18n etkisi yok (anahtar değişmez).

---

## Test Kriterleri

- [x] `next build` temiz geçer (0 hata/uyarı)
- [x] axe (light + dark): adım numaraları `color-contrast` denetiminde **flag'lenmiyor**
- [x] Gözle: numaraların faint görünümü + hover→solid geçişi değişmedi
- [x] DOM sırası korundu; adım başlıkları (`<h3>`) yerinde

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- [HowItWorks.tsx:83-89](../../src/components/HowItWorks.tsx#L83-L89) — adım numarası span'ı, numarayı **text-node yerine CSS `::before` ile** render edecek şekilde değiştirildi: `data-n={s.n}` + Tailwind `before:content-[attr(data-n)] before:text-green/30 before:transition-colors before:duration-500 group-hover:before:text-green`; `aria-hidden="true"` semantik olarak korundu (numara dekoratif, adım sırası `<h3>` + DOM ile iletilir).
- Renk/opaklık (`#1f7a3d` @30%), font (`text-5xl` 48px) ve hover→solid 500ms geçişi **birebir** korundu — sıfır görsel değişim.

**Kritik bulgu — K1 mekanizması revize edildi (kullanıcı kararı):**
- Planlanan K1 = "adım numarasına `aria-hidden` ekle → color-contrast'tan çıkar" **gerçekte çalışmıyor.** Kontrollü testle kanıtlandı: **axe-core 4.11.4** (projenin aracı; Lighthouse 13.3.0 bunu bundle ediyor) `aria-hidden="true"` öğeleri `color-contrast` denetiminden **çıkarmaz** — kural görsel görünürlüğü (`isVisibleOnScreen`) baz alır, erişilebilirlik ağacını değil. Doğrudan aria-hidden öğe de, aria-hidden ebeveyn içindeki öğe de hâlâ flag'lendi. Canlı sayfada da 4 numara, aria-hidden'a rağmen light+dark flag'leniyordu.
- **Sonuç:** aria-hidden tek başına a11y=100'e katkı sağlamaz; task'ın kabul kriteri ("axe artık flag'lemiyor") karşılanmaz.
- **Alternatifler test edildi (axe 4.11.4):** CSS pseudo-element (`::before content: attr()`) → **temiz** (görsel birebir); solid/koyu yeşil → geçer ama faint estetik bozulur (plan craft gerekçesiyle reddetmişti); SVG `<text>` → "incomplete" (temiz değil).
- **Kullanıcı kararı (2026-06-29):** CSS pseudo-element (önerilen) — planın asıl niyetini (sıfır görsel değişim + a11y geçer) gerçekten sağlar.

**Doğrulama:**
- `next build` temiz (exit 0, 37 sayfa, 0 hata/uyarı).
- Built CSS: `content:attr(data-n)` + `before:text-green/30 → #1f7a3d4d` (30%) + `group-hover:before:text-green` + `before:duration-500 → .5s` üretildi. Prerendered HTML: `data-n="01".."04"`, text-child yok, `aria-hidden` korundu.
- **axe-core 4.11.4 (fresh-prod-serve :4173, listening-PID teyitli; stray 9077 dokunulmadı), light+dark, reducedMotion+scroll:** adım numaraları `color-contrast` ihlal listesinden **çıktı** (light 15→11, dark 17→13 toplam node; `#how`/step-number eşleşmesi = 0 her iki tema). Kalan ihlaller diğer task'ların kapsamı (4.03/4.04/4.07).
- **Gözle (ekran görüntüsü, light):** 01-04 faint yeşil hayalet estetiğiyle render ediliyor; computed `::before` content=`"01"`, color=green@30%, 48px; hover'da ilk numara solid `rgb(31,122,61)`'e geçiyor (geçiş korundu).

**Son Yaklaşım:** CSS `::before { content: attr(data-n) }` (Tailwind `before:` utility) — tek dosya, sıfır görsel değişim, axe-temiz.
**Sonraki Adım Detayı:** Task tamamlandı; sıradaki TASK-4.03 (`--color-ink-faint` token koyulaştırma, K2). Çapraz öğrenim memory'ye eklendi (aria-hidden ≠ color-contrast muafiyeti — TASK-4.04/K5 ayraç planını etkiler).

---

**Oluşturulma:** 2026-06-29
**Tamamlanma:** 2026-06-29
