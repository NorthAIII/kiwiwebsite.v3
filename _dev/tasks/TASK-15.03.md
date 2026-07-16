# TASK-15.03: Mobil uygulama telefon mockup'ları (`PhoneMockups` — en yüksek craft)

**Durum:** ⬜ Bekliyor
**Modül:** M2 (Sayfalar & Bölümler) + M4 (i18n — yalnız bölüm başlığı/etiketler)
**Feature:** AP1 (port+bölümler)
**Faz:** Phase 15 (phases/PHASE-15.md)
**Bağımlılıklar:** TASK-15.01 (kabuk + namespace kökü)

---

## Hedef

Artifact'ın "Mobil uygulama" bölümündeki 4 iPhone mockup'ını (Üye ana ekran · Üye randevu al · Antrenör bugün & yoklama · Üye gelişim) **co-located CSS Module** ile birebir porla — Dynamic Island, status bar, üyelik bar, gün/slot seçici, SVG kilo grafiği, yoklama satırları, alt tab bar. Bu fazın **en yüksek craft/LOC maliyetli** işi; kendi izole bileşeninde. Telefon içi metin **sabit TR** (ekran-görüntüsü semantiği, i18n-dışı), telefon `dir="ltr"`. Bölüm başlığı/altyazısı + `phone-cap` etiketleri **5-dil i18n**. `AlpfitShowcase`'e `#uygulama` id'siyle bağlanır. Tamamlanma: 4 mockup pixel-craft'la render, `next build` temiz, CSS Module çalışır.

---

## Bağlam

Research kararı (§2): telefon mockup'ları için **CSS Module** (`PhoneMockups.module.css`) — artifact `.phone`/`.ph-*` CSS'i **birebir** taşınır (scoped, `globals.css` yalın kalır; ~90 kural/telefon Tailwind arbitrary olarak okunamaz olurdu). `--a-*` paleti **self-contained/açık** kalır (tema-adaptif DEĞİL — gerçek telefon açık ekran; dış metal çerçeve koyu). **CSS Module bu repoda YENİ desen** — Next 15 App Router yerleşik destekler; başarısızsa fallback = `globals.css`'e scoped ekleme.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/alpfit-plus-artifact.html` — App bölüm HTML **L494-637** (section-head + 4 phone-wrap); tüm `.phone`/`.ph-screen`/`.ph-*` CSS **L301-391**; `--a-*` paleti **L313-316**
- `_dev/phases/PHASE-15.md` — Araştırma Bulguları §2 (CSS Module kararı) + "Telefon mockup içi metin" kararı (§4)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md`, `_dev/phases/PHASE-15.md` (Task Listesi)
- `_dev/phases/PHASE-15.md` retro notu **gerekirse** (CSS Module ilk kullanım deneyimi — faz aktifken)

---

## Alt Görevler

- [ ] **1. `PhoneMockups.module.css` (birebir port)**
  - `src/components/alpfit/PhoneMockups.module.css` (YENİ): artifact L301-391 `.phone`/`.ph-*` sınıfları birebir. `--a-*` paleti (L313-316) self-contained açık — tema-adaptif yapılmaz.
  - CSS Module sınıf adları kebab→camel erişimi (`styles["ph-mem-bar"]` veya camelCase). `color-mix`/`aspect-ratio`/gradient korunur.

- [ ] **2. `PhoneMockups` bileşeni**
  - `src/components/alpfit/PhoneMockups.tsx` (YENİ, `"use client"`): 4 `phone-wrap` (artifact L504-633). Her telefon `<div dir="ltr">` sarmalı (RTL'de bozulmasın). İçerik **sabit TR** (Merhaba Deniz / Reformer Pilates / 72,4 kg / tab adları — i18n'e GİRMEZ). SVG'ler (status ikonları, tab ikonları, kilo grafiği) inline, `aria-hidden` uygun yerlerde; grafik SVG `role="img"` + `aria-label` (artifact L605).
  - `phone-cap` etiketleri (`Üye · Ana ekran` vb.) **i18n** (`t(\`app.caps.${k}.role\`)` + `.screen`).

- [ ] **3. Bölüm başlığı + kabuğa bağla**
  - Section-head (`alpfit.app.{eyebrow,title,sub}`) + `<div className="phones">` 4 mockup. `AlpfitShowcase`'e `id="uygulama"` ile bağla (roller'dan sonra).
  - i18n: `alpfit.app.{eyebrow,title,sub}` + `app.caps.{memberHome,memberBooking,trainer,memberProgress}.{role,screen}` (5 dil; TR yetkili artifact L498-500, L533/566/594/632). **Telefon içi metin i18n'e eklenmez.**

---

## Etkilenen Dosyalar

```
src/components/alpfit/AlpfitShowcase.tsx        # PhoneMockups bağlanır — zaten var
src/components/alpfit/PhoneMockups.tsx          # YENİ — 4 iPhone mockup (dir=ltr, sabit TR)
src/components/alpfit/PhoneMockups.module.css   # YENİ — .phone/.ph-* birebir (--a-* self-contained)
messages/tr.json                                # alpfit.app.{eyebrow,title,sub,caps.*} — TR yetkili
messages/en.json                                # alpfit.app.* — TR kopyası (stale)
messages/ar.json                                # alpfit.app.* — TR kopyası (stale)
messages/de.json                                # alpfit.app.* — TR kopyası (stale)
messages/es.json                                # alpfit.app.* — TR kopyası (stale)
```

---

## Dikkat Noktaları

- **Telefon içi metin i18n-DIŞI sabit TR** (research §4 kararı): micro-anahtar patlaması yok, RTL'de LTR-telefon içinde Arapça bozulmaz, örnek proper-noun/rakam çevrilmez (dürüst = gerçek TR ürün ekranı). Yalnız bölüm başlığı/altyazı/phone-cap i18n.
- **`dir="ltr"` her telefonda zorlanır** — AR sayfada bile telefon içi LTR (ekran-görüntüsü). Bölümün geri kalanı (başlık/cap) RTL aynalanır.
- **CSS Module YENİ desen:** başarısızsa (build/config) fallback `globals.css` scoped ekleme; ama Next 15 yerleşik destekler — beklenen sorunsuz. Deneyimi faz retrosuna not et (research §2).
- **`--a-*` tema-invariant** → bir kez kontrast doğrula ama axe per-tema koşar (`subpages-a11y`). İç kontrast (a-ink/a-soft/a-green üzerinde) AA geçmeli — telefon açık ekran her iki site-temasında aynı görünür.
- **perf/CLS:** telefon `aspect-ratio: 9/19.5` sabit → layout-shift yok. Görsel yok (saf CSS/SVG) → LCP'ye yük yok.
- **reduced-motion:** mockup'lar statik (animasyon yok — pulse/reveal dışında). Bölüm `<Reveal>` ile; reduced-motion'da görünür.
- **a11y:** grafik SVG `role="img"`+`aria-label`; dekoratif SVG'ler `aria-hidden`. Status bar/tab ikonları dekoratif (`aria-hidden`).

---

## Test Kriterleri

- [ ] `next build` temiz: 5 locale SSG, 0 `MISSING_MESSAGE`, 0 warn; CSS Module derlenir (build hata vermez).
- [ ] `npm run test` yeşil: `i18n-parity` `app.*` anahtarlarını kapsar (telefon içi metin parite yükü yaratmaz — i18n'de değil).
- [ ] Route render: 4 telefon mockup görünür (ana ekran/randevu/yoklama/gelişim), `phone-cap` etiketleri 5 dilde, telefon içi metin TR sabit.
- [ ] Her telefon `dir="ltr"`; AR sayfada telefon içi düzen bozulmaz.
- [ ] (Sandbox koşarsa) axe light+dark yeşil — telefon iç `--a-*` kontrastı dahil.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler + test kriterleri
- [ ] Git commit & push (`feat(TASK-15.03): ...`)
- [ ] Bu doküman + DURUM.md güncellendi; CSS Module deneyimi (gerekirse) PHASE-15 retrosuna

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
