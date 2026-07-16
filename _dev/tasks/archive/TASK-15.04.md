# TASK-15.04: 9 Özellik grid bölümü

**Durum:** ✅ Tamamlandı
**Modül:** M2 (Sayfalar & Bölümler) + M4 (i18n)
**Feature:** AP1 (port+bölümler) · AP2 (i18n namespace)
**Faz:** Phase 15 (phases/PHASE-15.md)
**Bağımlılıklar:** TASK-15.01 (kabuk + namespace kökü)

---

## Hedef

Artifact'ın "Ne yapar" 9-özellik grid'ini (Takvim & Rezervasyon · Grup Dersleri · Üyelik & Paket · Üye 360 · Finans & Ciro · Çok-Şube Cockpit · Antrenör Performansı · Raporlar · Bildirim & Retention) React + Tailwind token + `alpfit` namespace ile porla. `repeat(3,1fr)` grid (→ mobilde 2 → 1), her hücre başlık + açıklama. `AlpfitShowcase`'e `#ozellikler` id'siyle bağlanır. Tamamlanma: 9 özellik 5 dilde render, `next build` temiz.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/alpfit-plus-artifact.html` — Özellik HTML **L639-658** (section-head + 9 `.feat`); Features CSS **L217-224**
- `src/components/gym/GymSoftwareShowcase.tsx` — mevcut özellik grid deseni (gap-px + border-line, referans)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md`, `_dev/phases/PHASE-15.md` (Task Listesi)

---

## Alt Görevler

- [x] **1. `AlpfitFeatures` bileşeni**
  - `src/components/alpfit/AlpfitFeatures.tsx` (YENİ, `"use client"`): section-head (`alpfit.features.{eyebrow,title}`) + 9-hücre grid.
  - Sabit anahtar-dizisi `["f1".."f9"]` ile map: `t(\`features.${k}.t\`)` (başlık) + `t(\`features.${k}.d\`)` (açıklama). Grid `gap-px` + `bg-line` (hücreler `bg-surface`) — artifact deseni.
  - i18n: `alpfit.features.{eyebrow,title}` + `features.{f1..f9}.{t,d}` (5 dil; TR yetkili artifact L643, L647-655).

- [x] **2. Kabuğa bağla**
  - `AlpfitShowcase`: mockup'lardan sonra `<AlpfitFeatures/>` (`id="ozellikler"`).

---

## Etkilenen Dosyalar

```
src/components/alpfit/AlpfitShowcase.tsx    # AlpfitFeatures bağlanır — zaten var
src/components/alpfit/AlpfitFeatures.tsx    # YENİ — 9-özellik grid
messages/tr.json                            # alpfit.features.* — TR yetkili
messages/en.json                            # alpfit.features.* — TR kopyası (stale)
messages/ar.json                            # alpfit.features.* — TR kopyası (stale)
messages/de.json                            # alpfit.features.* — TR kopyası (stale)
messages/es.json                            # alpfit.features.* — TR kopyası (stale)
```

---

## Dikkat Noktaları

- **RTL (AR):** grid tema-invariant; hücre içi metin akışı logical (start-hizalı). Physical left/right yok.
- **reduced-motion:** grid `<Reveal>` stagger; reduced-motion'da görünür (no-op).
- **a11y kontrast:** hücre başlık/açıklama `text-ink`/`text-ink-soft` + hover `bg-surface` üstü AA (light+dark). `subpages-a11y` mührü.
- **i18n:** yapısal anahtar 5 dilde eşzamanlı; isimli-anahtar + `map` (`crew` deseni), array değil.
- **Modülerlik:** basit map — mevcut gym grid'iyle aynı desen (kopya-kod değil, token/primitive yeniden kullanım).

---

## Test Kriterleri

- [x] `next build` temiz: 5 locale SSG (37/37), 0 `MISSING_MESSAGE`, 0 warn, exit 0.
- [x] `npm run test` yeşil: 39/39 — `i18n-parity` `features.*` (9 özellik × 2 alan × 5 dil) eşzamanlı.
- [x] Route render: 9 özellik hücresi (`h3`×9) doğru başlık/açıklama ile 5 dilde; özellik sayısı = 9; tr `dir=ltr` / ar `dir=rtl`.
- [x] axe light+dark yeşil: spor-salonu 10/10 (5 dil × light+dark, WCAG AA 0 ihlal) — sandbox koştu.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler + test kriterleri
- [x] Git commit & push (`feat(TASK-15.04): ...`)
- [x] Bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-16 (run-task 15.04)

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **`AlpfitFeatures.tsx` (YENİ, `"use client"`):** artifact `.features`/`.feat` (L217-224, L639-658) React+Tailwind port. Section-head `AlpfitRoles` deseniyle birebir (yeşil eyebrow `before:` bar + Fraunces `clamp` h2; artifact'a uygun **sub yok**). Sabit anahtar-dizisi `FEATURES=["f1".."f9"]` + `map` (crew/roles deseni, JSON array yok): her hücre `t(\`features.${k}.t\`)` başlık + `t(\`features.${k}.d\`)` açıklama.
- **Grid porti:** `grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3` — artifact `repeat(3)`→880px `repeat(2)`→560px `1fr` mantığı Tailwind kırılımlarına map (mobil 1 → sm 2 → lg 3); `--radius:18px` → `rounded-[18px]`. Hücreler opak `bg-surface` + `px-[25px] py-[27px]` (artifact 27/25); hairline `bg-line` gap'ten sızar (`gap-px`).
- **Hover tint (craft):** `hover:bg-[color-mix(in_srgb,var(--color-green)_5%,var(--color-surface))]` — artifact `.feat:hover` color-mix'i birebir; opaklık korunur (yarı-saydam `bg-green/5` gap arka planını sızdırırdı → color-mix ile opak yeşil-tint). `transition-colors duration-200`.
- **Reveal:** grid `<Reveal stagger={0.05}>`, her hücre `data-reveal` (roles deseni; reduced-motion'da görünür no-op).
- **Kabuğa bağlama:** `AlpfitShowcase`'e `<AlpfitFeatures/>` `<PhoneMockups/>`'tan sonra; bölüm `id="ozellikler"` + `scroll-mt-24`.
- **i18n:** `alpfit.features.{eyebrow,title}` + `features.{f1..f9}.{t,d}` — 5 dile eşzamanlı (TR yetkili artifact L643/L647-655; non-TR TR-kopyası = versiyon-sınırına ertelenen stale). JSON kanonik round-trip (yalnız +40 net satır/dil, reformat yok).

**Sorunlar:**
- Tailwind v4 arbitrary `bg-[color-mix(...)]` (virgül + `var()` + `%` içeren) sınıfı derlenir mi endişesi → `next build` sıfır-config **derledi** (0 warn); repo genelinde `color-mix` yalnız CSS/inline-style'da vardı, arbitrary class'ta ilk. Doğrulandı.
- `next start`/Playwright bu oturumda **yaşadı** (sandbox exit 144 tetiklenmedi) → a11y süiti + görsel screenshot'lar gerçek prod build'e karşı koştu.

**Kararlar:**
- Hover tint için `color-mix` arbitrary Tailwind class (opak) — `bg-green/5` (yarı-saydam) alternatifi hairline `bg-line`'ı sızdırırdı, artifact craft'ı bozulurdu. Yeni mimari karar değil (artifact-sadakati); DECISIONS'a eklenmedi.
- Grid kırılımı Tailwind sm/lg (640/1024) → artifact 560/880 ile birebir piksel değil ama aynı 1→2→3 kolon niyeti; kardeş bileşenlerin (roles `sm:grid-cols-2 lg:grid-cols-4`) kırılım-standardıyla tutarlı.

**Dosya Değişiklikleri:**
- `src/components/alpfit/AlpfitFeatures.tsx` → YENİ (9-özellik grid, `FEATURES` map, color-mix hover).
- `src/components/alpfit/AlpfitShowcase.tsx` → `<AlpfitFeatures/>` import + mockup'lardan sonra bağlandı (`id="ozellikler"`).
- `messages/{tr,en,ar,de,es}.json` → `alpfit.features.*` (her dile +40 net satır, kanonik round-trip).

**Test Sonuçları:**
- Vitest 39/39 (i18n-parity `features.*` 9×2×5 eşzamanlı) · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn, color-mix arbitrary class derlendi) · prerender: `#ozellikler`=1, features section `<h3>`=9, 9/9 başlık mevcut (tr `dir=ltr` / ar `dir=rtl`) · Playwright a11y spor-salonu 10/10 (5 dil × light+dark, WCAG AA 0 ihlal, AR RTL) · görsel light+dark+AR-RTL craft doğrulandı (3×3 hairline grid, dark okunabilir, AR aynalanır + start-hizalı metin).

---

## Sonuç Özeti

Alpfit Plus vitrinine artifact'ın **9-özellik "Ne yapar" grid**'i (Takvim & Rezervasyon · Grup Dersleri · Üyelik & Paket · Üye 360 · Finans & Ciro · Çok-Şube Cockpit · Antrenör Performansı · Raporlar · Bildirim & Retention) `AlpfitFeatures` bileşeni ile React+Tailwind token+`alpfit.features` namespace olarak porlandı. Grid artifact `.features` desenini birebir taşır: `gap-px` hairline (bg-line sızması) + opak `bg-surface` hücreler + `color-mix` yeşil hover tint; `repeat(3)`→2→1 responsive. `FEATURES` map (crew/roles deseni, array yok). Kabuğa `id="ozellikler"` ile mockup'lardan sonra bağlandı; başlık+9 hücre `alpfit.features` 5-dil i18n (TR yetkili). Guardrail regresyonsuz: Vitest 39/39, build 37/37 SSG temiz, a11y spor-salonu 10/10 çift-tema, CLS-sıfır (görselsiz metin grid).

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
**Tamamlanma:** 2026-07-16 (run-task 15.04)
