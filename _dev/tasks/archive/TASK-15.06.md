# TASK-15.06: Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış

**Durum:** ✅ Tamamlandı
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

- [x] **1. `AlpfitPricing` bileşeni — ink-panel bant**
  - `src/components/alpfit/AlpfitPricing.tsx` (YENİ, `"use client"`): `<section id="fiyat">` koyu ink-panel bant (`bg-ink text-canvas`). Section-head (eyebrow pulse-aksanlı, h2, sub). İki-sütun price-grid (`1.32fr / 1fr`, mobilde tek):
    - **price-card:** price-figure (`₺` cur pulse + `1.500` amt + `+ KDV / salon / ay` per) + not (₺1.200 %20 indirim) + 3 price-row (kurulum ₺3.000 / yıllık peşin ücretsiz / 15 gün deneme; "free" satırlar `--color-pulse-ink`) + 2 mailto CTA (Demo iste primary · Teklif al ghost) + kurucu notu (pulse sol-border).
    - **incl-card:** "Her salonda dahil" başlık + 7-madde checklist (checkmark SVG `--color-pulse-ink`).
  - i18n: `alpfit.pricing.{eyebrow,title,sub,currency,amount,per,note,rows.{setup,setupFree,trial}.{label,value},ctaPrimary,ctaSecondary,founderNote,inclTitle,incl.{one..seven}}` (5 dil; TR yetkili artifact L691-720).

- [x] **2. Yol haritası (inline kabuğa)**
  - Kesikli-border kutu (`border-dashed border-line`, `bg-surface`): "Yol haritası — yakında" etiketi + kalemler (bold isimler) + "Bugün üründe değil; geliştirme yol haritamızda." Kalemler: Online ödeme · QR/turnike giriş · **Mağaza (üye e-ticaret)** · Apple Health & Google Fit · AI gelişim & beslenme analizi.
  - i18n: `alpfit.roadmap.{tag, items.{payment,qr,store,health,ai}, suffix}` (5 dil; TR yetkili artifact L730-731 + Store kalemi eklenir).

- [x] **3. Kapanış (inline kabuğa)**
  - Ortalanmış: h2 + p + 2 mailto CTA (Demo iste `?subject=Alpfit%20Plus%20demo%20talebi` · Soru sor `?subject=Alpfit%20Plus%20hakk%C4%B1nda`).
  - i18n: `alpfit.close.{title,body,ctaPrimary,ctaSecondary}` (5 dil; TR yetkili artifact L739-743).

- [x] **4. Kabuğa bağla**
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

- [x] `next build` temiz: 5 locale SSG (37/37), 0 `MISSING_MESSAGE`, 0 warn.
- [x] `npm run test` yeşil (39/39): `i18n-parity` `pricing`/`roadmap`/`close` eşzamanlı (5 dil).
- [x] Route render: fiyat bandı (₺1.500 figürü + 3 satır + 2 CTA + 7-madde dahil) + yol haritası (Store dahil 5 kalem) + kapanış (2 CTA) 5 dilde (prerender HTML grep + görsel).
- [x] **Fiyat bandı çift-tema:** light koyu-bant/krem-metin, dark krem-bant/koyu-metin — price-figure + free-satır pulse ikisinde de okunur (görsel + axe 52/52).
- [x] Dürüstlük 4/4 rakamlar aynen (₺1.500 / ₺1.200 / ₺3.000 / 15 gün); yol haritası "yakında" çerçevesi korunur (Store dahil).
- [x] axe light+dark yeşil — tam süit **52/52** (spor-salonu 10/10 çift-tema, bant kontrastı dahil), çapraz-regresyonsuz.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler + test kriterleri
- [x] Git commit & push (`feat(TASK-15.06): ...`)
- [x] Bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-16

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **`AlpfitPricing.tsx` (YENİ, `"use client"`):** full-bleed `<section id="fiyat" className="scroll-mt-24 bg-ink text-canvas">` ink-panel bant + iç `max-w-[1400px]` konteyner. Section-head (eyebrow `text-pulse-ink`, h2, sub `text-canvas/65`). İki-sütun price-grid (`lg:grid-cols-[1.32fr_1fr]`, mobilde tek). **price-card:** price-figure (`₺` cur pulse-ink + `1.500` amt + `+ KDV / salon / ay` per) + not + 3 satır (kurulum ₺3.000 / yıllık peşin ücretsiz / 15 gün; "free" satır değerleri `text-pulse-ink`) + 2 CTA (Demo iste = `bg-canvas text-ink` inversiyon pill; Teklif al = ghost) + kurucu notu (`border-s-2 border-pulse-ink`). **incl-card:** "Her salonda dahil" + 7-madde checklist (`Check` SVG `text-pulse-ink`, `INCL` map). `alpfit.pricing.*` 5-dil (24 leaf).
- **`AlpfitShowcase.tsx`:** `<AlpfitPricing/>` + **Yol haritası** (inline dashed-border kutu `border-dashed border-line bg-surface`, yeşil "yakında" pill + `ROADMAP` map bold kalemler `· ` ayraçlı **Store dahil 5 kalem** + suffix) + **Kapanış** (inline ortalanmış h2 + p + 2 CTA: Demo iste / Soru sor). `Fragment` import; `MAILTO_DEMO`/`MAILTO_ASK` const. `roadmap.*` (7 leaf) + `close.*` (4 leaf) 5-dil.
- **Ink-panel inversiyon deseni (15.05 mirası):** yeni `--band-*` token YOK. Bant `bg-ink text-canvas`, dark temada krem'e döner (beklenen, site konvansiyonu). Parlak aksanlar `--color-pulse-ink` (adaptif — dark cream flip'te `#1f7a3d` legible). Muted metin `text-canvas/65` (artifact `--band-soft` yerine — `/55` dark cream flip'te AA fail, TASK-8.02/15.05). İç price-card opak lift `INK_LIFT = bg-[color-mix(in_srgb,#fff_4%,var(--color-ink))]` (artifact translücent `--band-surface` görsel eşdeğeri, opak → axe çözer).

**Sorunlar:**
- **axe off-viewport yanlış-pozitif (15.05 deseni, önlem alındı):** a11y harness `scrollThrough` scroll-0 reset → alt-fold fiyat bandı viewport-dışı → küçük OPAK `text-pulse-ink` aksanlar (eyebrow, ₺, free-satır değerleri) zemini sayfa canvas'ına düşüp ~1.5:1 fail verebilir. **Çözüm (görsel değişimsiz):** her aksana **immediate backdrop ile aynı opak renk** verildi → eyebrow bant üstünde `bg-ink`; free-satır değerleri + ₺ kart üstünde `INK_LIFT`. Muted metin (`/65` translücent) axe'te "incomplete" → dokunulmadı. Sonuç: tam süit **52/52** yeşil (spor-salonu 10/10 çift-tema), önlem doğrulandı.

**Kararlar:**
- Muted metin `/55` yerine `/65` (task "Dikkat Noktaları" `/55` diyordu; 15.05 ampirik olarak `/55`'in dark cream flip'te AA fail ettiğini kanıtladı → AA-güvenli `/65`, AlpfitWhy ile tutarlı). Gerekçe: a11y korunan taban.
- İç price-card opak `INK_LIFT` (task translücent `bg-white/[.04]` öneriyordu; artifact'ın kendisi opak `--band-surface: #1a1c12` kullanıyor) — opak, görsel eşdeğer, axe-robust + free-satır aksanına seamless zemin.
- Bant primary CTA `bg-canvas text-ink` inversiyon pill (hero `bg-ink text-canvas` deseninin bant-üstü tersi) — koyu bant üstünde yüksek kontrast + opak → axe-güvenli.
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari karar yok; ink-panel deseni + i18n stratejisi zaten kayıtlı).

**Kalan İşler:** Yok (task tamamlandı). Faz 15'te 1 task kaldı (15.07 — SEO/metadata + gym temizliği + guardrail).

**Son Yaklaşım:** Tamamlandı — kalınan yer yok.

**Sonraki Adım Detayı:** Faz 15 son task'i `/devflow:run-task 15.07` (yeni oturum).

**Dosya Değişiklikleri:**
- `src/components/alpfit/AlpfitPricing.tsx` → YENİ (ink-panel fiyat bandı: price-card + incl-card).
- `src/components/alpfit/AlpfitShowcase.tsx` → `AlpfitPricing` import + bağla; Roadmap (inline, Store dahil) + Close (inline) blokları; `Fragment` + mailto const.
- `messages/{tr,en,ar,de,es}.json` → `alpfit.{pricing,roadmap,close}` (+53 satır/dil; TR yetkili, non-TR stale kopya — parite korunur).

**Test Sonuçları:**
- `npm run test` (Vitest): **39/39** yeşil (i18n-parity `pricing`/`roadmap`/`close` 5-dil eşzamanlı).
- `next build`: **37/37** SSG exit 0 — 0 `MISSING_MESSAGE`, 0 warn (color-mix/INK_LIFT arbitrary class derlendi).
- Prerender 5-dil: `#fiyat`=1, ₺1.500, free-satırlar (Ücretsiz/15 gün), 7 checklist, roadmap Store dahil 5 kalem, kapanış 2 CTA; AR `dir=rtl` (diğer 4 `ltr`). Dürüstlük 4/4 (₺1.500/₺1.200/₺3.000/15 gün/%20) + 3 mailto subject (demo talebi/fiyat teklifi/hakkında).
- **Playwright a11y tam süit: 52/52** (5 sayfa × 5 dil × light+dark WCAG-AA 0 ihlal; spor-salonu 10/10, çapraz-regresyonsuz).
- Görsel craft: light (koyu bant/krem metin, parlak-yeşil aksan), dark (krem bant/koyu metin, koyu-yeşil aksan — inversiyon doğru), AR-RTL (price-card↔incl-card + price-row label↔value + founder border + checkmark tam aynalanma) + roadmap (Store 3. sırada) + kapanış doğrulandı.

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
