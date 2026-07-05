# TASK-10.03: Hero stat CTA affordance — ok idiomu + durağan ipucu

**Durum:** ✅ Tamamlandı
**Modül:** M2 — Sayfalar & Bölümler (Hero) + M3 (etkileşim idiomu)
**Feature:** A3a — Hero CTA kartı affordance
**Faz:** Phase 10 (phases/PHASE-10.md)
**Bağımlılıklar:** Yok (A1'den bağımsız)

---

## Hedef

Hero istatistik şeridindeki iki `<Link>` (Alpfit → `/spor-salonu-yazilimi`, Crew OS → `/bunker-os`; `Hero.tsx:90-135`) tıklanabilir görünsün diye site-standart `→` ok idiomunu ekle. Kartlar zaten `<Link>` (davranış doğru); eksik olan yalnız **görsel affordance**. Ok dinlenme halinde de hafif görünür (durağan ipucu — hover-only/dokunmatik tuzağına düşmemek için), hover'da belirginleşir + kayar. Tamamlanma: iki stat Link'i dinlenmede tıklanabilir okunuyor, hover'da ok belirginleşiyor, çift-tema a11y=100 korunuyor, CLS yok, build temiz.

---

## Bağlam

Research-phase 10: `→ group-hover:translate-x-1` ok deseni sitede **standart** (`Hero.tsx:82` ikincil CTA, `Bunker.tsx:46`, `SectorSolutions` ×4, `Forum` ×2, `Footer.tsx:65` vb.) — "tıklanabilir" dilinin kurulu imzası. Seçilen: bu idiomu iki stat Link'ine ekle + **durağan ipucu** (dinlenmede soluk ok, hover'da belirginleşir). Elenen: ince kart sınırı (generic SaaS özellik-kartı template-smell + padding CLS riski), hover-altı underline (iki-satırlı etikette belirsiz, dinlenmede okunmaz). Craft en üst eksen (ILKELER) → zero template smell korunur.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-10.md` — Araştırma Bulguları (A3a idiomu, elenen yaklaşımlar, RTL kararı)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.2 Hero (istatistik şeridi edge case: affordance)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + son task özeti
- `_dev/phases/PHASE-10.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [x] **1. İki stat Link'ine ok idiomu ekle**
  - Dosya: `src/components/Hero.tsx`
  - Her iki stat `<Link>` (satır 90-107 Alpfit, 111-135 Crew OS) sonuna site-standart trailing ok ekle: `<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>` deseni. Ok, `leading-tight` metin bloğunun **sonrasına** (trailing) gelir; Link `flex items-center` olduğundan dikey ortalı.
  - **Durağan ipucu:** Ok dinlenmede soluk-görünür (örn. `text-ink-faint`), hover'da belirginleşir (`group-hover:text-green` — mevcut başlık `group-hover:text-green` ile uyumlu). Hover-only görünürlük (opacity 0→1) YAPMA — dokunmatikte de okunmalı.

- [x] **2. RTL & tutarlılık kontrolü**
  - Ok **fiziksel** `→` glyph + `translate-x` kalır (site-geneli idiomla tutarlı; AR'de de böyle sevk edilmiş — research kararı: lone-flip yapma). Bu iki oku tek başına logical yapma.

---

## Etkilenen Dosyalar

```
src/components/
└── Hero.tsx   # iki stat Link'ine (satır 90-135) trailing ok idiomu + durağan ipucu
```

---

## Dikkat Noktaları

- **CLS≈0:** Ok akışa **kalıcı** eklenir (dinlenmede zaten görünür, yalnız transform/renk hover'da değişir) → genişlik hover'da değişmez, layout shift yok. Opacity/transform ile göster; akışa hover'da genişlik ekleme.
- **Çift-tema a11y=100:** Ok rengi adaptif token (`--color-ink-faint` → `--color-green`), her iki temada color-contrast geçmeli. `aria-hidden` kontrasttan muaf tutmaz (memory: `aria-hidden-color-contrast-muafiyeti-degil`); ok metin/glyph olduğundan kontrastı önemli — dinlenme rengi (`text-ink-faint`) her iki temada eşiği geçer (mevcut label ile aynı token, taban a11y=100). Ölçüm light+dark iki koşu (memory: `a11y-olcum-tema-tuzagi`).
- **Reduced-motion:** Global catch-all (`globals.css:107-119`) ok `transition`'ını ~0ms'e indirir → ok dinlenmede zaten görünür/okunur olmalı (hover'a bağlı kalmamalı; bu aynı zamanda dokunmatik gereği). Durağan-ipucu kararı tam bunu karşılar.
- **RTL (AR):** Fiziksel ok idiomuyla tutarlı kal — lone-flip yok (research kararı, kayıt: site-geneli logical-ok ayrı iş).
- **Focus-visible:** Stat Link'lerine ok eklemek focus davranışını değiştirmez (Link hâlâ tek focusable); 2px yeşil outline korunur.
- **GSAP dokunulmaz:** Değişiklik Link **içeriğine** dokunur, `[data-hero='stats']` timeline hedefine değil (`Hero.tsx:25`) — GSAP giriş animasyonu etkilenmez.
- **İki Link simetrik:** Alpfit ok deseni Crew OS ile aynı olmalı (tutarlılık); Alpfit'in canlı-dot'u (`animate-ping`) ve Crew OS'un SVG ikonu **leading** öğeler, ok **trailing** — çakışma yok.

---

## Test Kriterleri

- [x] `npm run build` temiz geçer. (EXIT=0)
- [x] İki stat Link'i dinlenme halinde (hover'sız) tıklanabilir görünür — ok soluk-görünür (light + dark, `text-ink-faint` token, gerçek tarayıcı doğrulaması).
- [x] Hover'da ok belirginleşir + kayar (`translate: 4px`, animasyonlu), `text-green` olur — mevcut imzayla tutarlı.
- [x] Link'ler doğru hedeflere gider (Alpfit → `/spor-salonu-yazilimi`, Crew OS → `/bunker-os`) — davranış değişmedi.
- [x] Ok eklenmesi hover'da genişlik/konum kaydırmıyor (link genişliği rest=hover, CLS Δ=0.00).
- [x] `/` a11y regresyon tohumu (`home-a11y.spec.ts`, axe WCAG-AA) light+dark **2/2** 0 ihlal (taze build).
- [x] Reduced-motion senaryoda ok dinlenmede görünür (durağan ipucu doğrulandı).

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
- `Hero.tsx`: iki stat `<Link>`'in (Alpfit satır 90-107, Crew OS 111-135) sonuna trailing ok span'i eklendi — text bloğunun **sonrasına**, `flex items-center` sayesinde dikey ortalı. Sınıf: `text-ink-faint transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-green`. Dinlenmede soluk-görünür (durağan ipucu), hover'da yeşilleşir + 4px kayar. İki Link birebir simetrik.
- **RTL kararı korundu:** fiziksel `→` glyph + `translate-x` (site-geneli idiomla tutarlı; lone-flip yok — research kararı).
- **v4 tuzağı yakalandı ve düzeltildi:** İlk yazımda `transition-[transform,color]` kullandım; ampirik doğrulamada ok'un kayması **animasyonsuz zıpladı** (yalnız renk yumuşak geçti). Neden: Tailwind v4'te `translate-x-1` `transform` değil **`translate`** CSS property'sini set eder (`getComputedStyle`: hover'da `translate: 4px`, `transform: none`); arbitrary `transition-[transform,color]` `translate`'i kapsamaz. Site-standart `transition-transform` v4'te `translate`'i içerir ama arbitrary değer içermez → `transition-[translate,color]`'a çevrildi. Teyit: `transitionProperty="translate, color"`, mid@130ms translate ≈ 2.8-3.1px (yumuşak animasyon kanıtı). Proje-geneli tuzak olarak memory'ye eklendi.

**Doğrulama (gerçek tarayıcı, prod build, çift-tema, `NEXT_LOCALE=tr` cookie):**
- `npm run build` temiz (EXIT=0).
- Ok dinlenmede görünür: light `rgb(103,105,95)` / dark `rgb(138,140,128)` (= `text-ink-faint`, label token, kontrast-geçer). Hover: light `rgb(31,122,61)` / dark `rgb(79,176,106)` (`text-green`).
- Hover slide **animasyonlu** (rest→mid@130ms≈2.8px→4px), CLS Δ=0.00 (link genişliği rest=hover).
- hedefler değişmedi (`/spor-salonu-yazilimi`, `/bunker-os`); reduced-motion'da ok dinlenmede görünür (durağan ipucu doğrulandı).
- home a11y regresyon tohumu (`home-a11y.spec.ts`, axe WCAG-AA) **2/2** light+dark, 0 ihlal (taze build).
- **Süreç notu:** doğrulama sırasında port 3000'de stale-server yanlış-negatifi yaşandı (eski HTML ölü CSS hash'i referans veriyordu → sayfa stilsiz okundu); listening-PID + CSS 200/400 teyidiyle teşhis edilip taze server (port 3100) ile çözüldü (memory: stale-server disiplini).

---

**Oluşturulma:** 2026-07-02 (plan-phase 10)
