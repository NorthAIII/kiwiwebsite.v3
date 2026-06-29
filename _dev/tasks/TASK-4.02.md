# TASK-4.02: Adım numaraları `aria-hidden` (color-contrast — A11Y1-a)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Adım numarası span'ına `aria-hidden` ekle**
  - `src/components/HowItWorks.tsx:83-86` — numara `<span>`'ına `aria-hidden="true"`
  - Renk/opaklık/class **değişmez** (`text-green/30 ... group-hover:text-green` aynen kalır)
  - DOM sırası ve `<h3>` başlık (`s.title`, satır 89) korunur — adım anlamı SR'a başlıkla iletilir

- [ ] **2. Doğrula (build + axe + görsel)**
  - `next build` temiz
  - axe: `HowItWorks` bölümünde adım numaraları artık `color-contrast` flag'lemiyor (light + dark)
  - Gözle: numaraların faint görünümü ve hover→solid geçişi birebir aynı; SR'da adım sırası başlıktan okunuyor

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

- [ ] `next build` temiz geçer (0 hata/uyarı)
- [ ] axe (light + dark): adım numaraları `color-contrast` denetiminde **flag'lenmiyor**
- [ ] Gözle: numaraların faint görünümü + hover→solid geçişi değişmedi
- [ ] DOM sırası korundu; adım başlıkları (`<h3>`) yerinde

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
