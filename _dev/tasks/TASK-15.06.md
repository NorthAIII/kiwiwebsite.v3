# TASK-15.06: Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış

**Durum:** ⬜ Bekliyor
**Modül:** M2 (Sayfalar & Bölümler) + M1 (ink-panel token deseni) + M4 (i18n)
**Feature:** AP1 (port+bölümler) · AP2 (i18n namespace)
**Faz:** Phase 15 (phases/PHASE-15.md)
**Bağımlılıklar:** TASK-15.01 (kabuk + namespace kökü); TASK-15.05 (ink-panel deseni ilk uygulandı — referans)

---

## Hedef

Sayfanın alt kümesini porla: (1) **Fiyat bandı** (`#fiyat`) — koyu **ink-panel inversion** bant (`bg-ink`); price-card (₺1.500 figürü + not + 3 satır + 2 mailto CTA + kurucu notu) + "Her salonda dahil" 7-madde checklist; (2) **Yol haritası** — kesikli-border kutu, "yakında" etiketi + kalemler (**Store/Mağaza kalemi eklenir** — kullanıcı isteği); (3) **Kapanış** — ortalanmış h2 + p + 2 mailto CTA (Demo iste · Soru sor). `AlpfitShowcase`'e bağlanır. Tamamlanma: üç bölüm 5 dilde render, fiyat bandı çift-temada okunur, dürüstlük 4/4 aynen, `next build` temiz.

---

## Bağlam

Fiyat bandı research §3 kararı gereği **site ink-panel inversion** (`bg-ink text-canvas`, iç price-card lifted-surface `bg-white/[.04]`+`border-white/10`, muted `text-canvas/55`, pulse aksanı `--color-pulse-ink`) — yeni `--band-*` YOK, TD4 a11y-mühürüyle tutarlı. Dürüstlük 4/4 gerçek **aynen yayınlanır** (₺1.500+KDV public/kesin fiyat; 15 gün deneme; yol haritası "yakında" öngörü çerçevesi). Store kalemi discuss kararı: e-ticaret modülü = "yakında" yol haritası kalemi (bugün üründe değil).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/alpfit-plus-artifact.html` — Pricing HTML **L687-724**; Roadmap HTML **L726-734**; Close HTML **L736-746**; Pricing/Roadmap/Close CSS **L253-292**
- `_dev/phases/PHASE-15.md` — Araştırma Bulguları §3 (ink-panel) + Kapsam Tartışması (dürüstlük 4/4, Store kalemi)
- `_dev/MEMORY.md` — `tema-fix-html-dark-token-flip` + `a11y-olcum-tema-tuzagi` (koyu bant çift-tema)
- `src/components/alpfit/AlpfitWhy.tsx` — ink-panel inversion deseni (15.05'te uygulandı, referans)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md`, `_dev/phases/PHASE-15.md` (Task Listesi)

---

## Alt Görevler

- [ ] **1. `AlpfitPricing` bileşeni — ink-panel bant**
  - `src/components/alpfit/AlpfitPricing.tsx` (YENİ, `"use client"`): `<section id="fiyat">` koyu ink-panel bant (`bg-ink text-canvas`). Section-head (eyebrow pulse-aksanlı, h2, sub). İki-sütun price-grid (`1.32fr / 1fr`, mobilde tek):
    - **price-card:** price-figure (`₺` cur pulse + `1.500` amt + `+ KDV / salon / ay` per) + not (₺1.200 %20 indirim) + 3 price-row (kurulum ₺3.000 / yıllık peşin ücretsiz / 15 gün deneme; "free" satırlar `--color-pulse-ink`) + 2 mailto CTA (Demo iste primary · Teklif al ghost) + kurucu notu (pulse sol-border).
    - **incl-card:** "Her salonda dahil" başlık + 7-madde checklist (checkmark SVG `--color-pulse-ink`).
  - i18n: `alpfit.pricing.{eyebrow,title,sub,currency,amount,per,note,rows.{setup,setupFree,trial}.{label,value},ctaPrimary,ctaSecondary,founderNote,inclTitle,incl.{one..seven}}` (5 dil; TR yetkili artifact L691-720).

- [ ] **2. Yol haritası (inline kabuğa)**
  - Kesikli-border kutu (`border-dashed border-line`, `bg-surface`): "Yol haritası — yakında" etiketi + kalemler (bold isimler) + "Bugün üründe değil; geliştirme yol haritamızda." Kalemler: Online ödeme · QR/turnike giriş · **Mağaza (üye e-ticaret)** · Apple Health & Google Fit · AI gelişim & beslenme analizi.
  - i18n: `alpfit.roadmap.{tag, items.{payment,qr,store,health,ai}, suffix}` (5 dil; TR yetkili artifact L730-731 + Store kalemi eklenir).

- [ ] **3. Kapanış (inline kabuğa)**
  - Ortalanmış: h2 + p + 2 mailto CTA (Demo iste `?subject=Alpfit%20Plus%20demo%20talebi` · Soru sor `?subject=Alpfit%20Plus%20hakk%C4%B1nda`).
  - i18n: `alpfit.close.{title,body,ctaPrimary,ctaSecondary}` (5 dil; TR yetkili artifact L739-743).

- [ ] **4. Kabuğa bağla**
  - `AlpfitShowcase`: why'dan sonra `<AlpfitPricing/>` + Yol haritası (inline) + Kapanış (inline). Sayfa tamamlanır (Footer page.tsx'te).

---

## Etkilenen Dosyalar

```
src/components/alpfit/AlpfitShowcase.tsx    # AlpfitPricing + Roadmap + Close bağlanır — zaten var
src/components/alpfit/AlpfitPricing.tsx     # YENİ — ink-panel fiyat bandı (price-card + incl)
messages/tr.json                            # alpfit.{pricing,roadmap,close}.* — TR yetkili
messages/en.json                            # alpfit.{pricing,roadmap,close}.* — TR kopyası (stale)
messages/ar.json                            # alpfit.{pricing,roadmap,close}.* — TR kopyası (stale)
messages/de.json                            # alpfit.{pricing,roadmap,close}.* — TR kopyası (stale)
messages/es.json                            # alpfit.{pricing,roadmap,close}.* — TR kopyası (stale)
```

> `--color-pulse-ink` zaten repo (globals.css:17,49). Yeni token yok.

---

## Dikkat Noktaları

- **Fiyat bandı = ink-panel inversion (KRİTİK):** `bg-ink text-canvas`, iç kart `bg-white/[.04]`+`border-white/10`, muted `text-canvas/55`, pulse/free-satır/checkmark aksanı `--color-pulse-ink`. Yeni `--band-*` YOK. Dark temada bant **krem'e döner** (beklenen). **axe çift-tema ŞART** (MEMORY `a11y-olcum-tema-tuzagi`) — özellikle price-figure kontrastı + free-satır pulse okunabilirliği light+dark.
- **Dürüstlük 4/4 aynen:** ₺1.500+KDV/salon/ay · ₺1.200 (2. salon %20) · ₺3.000+KDV kurulum (yıllık peşinde ücretsiz) · 15 gün deneme — public/kesin, açık gösterilir. Yol haritası kalemleri "yakında" öngörü çerçevesinde (Store dahil). Uydurma sonuç/sayı yok.
- **Store kalemi:** yalnız yol haritası "yakında" (bugün üründe değil — Kapsam Dışı: backend yapılmaz). Kısa etiket "Mağaza (üye e-ticaret)".
- **CTA mailto:** görünür etiket i18n; mailto href (email + subject) sabit (artifact subject'leri: demo talebi / fiyat teklifi / hakkında).
- **RTL (AR):** price-row `justify-between` + kurucu notu sol-border → logical (`border-s`); checkmark grid logical. Physical yok. `text-align:right` (row value) → `text-end`.
- **reduced-motion:** `<Reveal>` no-op görünür.

---

## Test Kriterleri

- [ ] `next build` temiz: 5 locale SSG, 0 `MISSING_MESSAGE`, 0 warn.
- [ ] `npm run test` yeşil: `i18n-parity` `pricing`/`roadmap`/`close` eşzamanlı (5 dil).
- [ ] Route render: fiyat bandı (₺1.500 figürü + 3 satır + 2 CTA + 7-madde dahil) + yol haritası (Store dahil 5 kalem) + kapanış (2 CTA) 5 dilde.
- [ ] **Fiyat bandı çift-tema:** light koyu-bant/krem-metin, dark krem-bant/koyu-metin — price-figure + free-satır pulse ikisinde de okunur (görsel + axe).
- [ ] Dürüstlük 4/4 rakamlar aynen (₺1.500 / ₺1.200 / ₺3.000 / 15 gün); yol haritası "yakında" çerçevesi korunur.
- [ ] (Sandbox koşarsa) axe light+dark yeşil — bant kontrastı dahil.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler + test kriterleri
- [ ] Git commit & push (`feat(TASK-15.06): ...`)
- [ ] Bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
