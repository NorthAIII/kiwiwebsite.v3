# TASK-15.04: 9 Özellik grid bölümü

**Durum:** ⬜ Bekliyor
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

- [ ] **1. `AlpfitFeatures` bileşeni**
  - `src/components/alpfit/AlpfitFeatures.tsx` (YENİ, `"use client"`): section-head (`alpfit.features.{eyebrow,title}`) + 9-hücre grid.
  - Sabit anahtar-dizisi `["f1".."f9"]` ile map: `t(\`features.${k}.t\`)` (başlık) + `t(\`features.${k}.d\`)` (açıklama). Grid `gap-px` + `bg-line` (hücreler `bg-surface`) — artifact deseni.
  - i18n: `alpfit.features.{eyebrow,title}` + `features.{f1..f9}.{t,d}` (5 dil; TR yetkili artifact L643, L647-655).

- [ ] **2. Kabuğa bağla**
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

- [ ] `next build` temiz: 5 locale SSG, 0 `MISSING_MESSAGE`, 0 warn.
- [ ] `npm run test` yeşil: `i18n-parity` `features.*` (9 özellik × 2 alan × 5 dil) eşzamanlı.
- [ ] Route render: 9 özellik hücresi doğru başlık/açıklama ile 5 dilde; özellik sayısı = 9.
- [ ] (Sandbox koşarsa) axe light+dark yeşil.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler + test kriterleri
- [ ] Git commit & push (`feat(TASK-15.04): ...`)
- [ ] Bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
