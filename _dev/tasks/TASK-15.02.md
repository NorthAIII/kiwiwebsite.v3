# TASK-15.02: Sorun bölümü + 4 Rol bölümü

**Durum:** ⬜ Bekliyor
**Modül:** M2 (Sayfalar & Bölümler) + M4 (i18n)
**Feature:** AP1 (port+bölümler) · AP2 (i18n namespace)
**Faz:** Phase 15 (phases/PHASE-15.md)
**Bağımlılıklar:** TASK-15.01 (kabuk + namespace kökü + token)

---

## Hedef

Artifact'ın "Sorun" ve "Dört rol" bölümlerini React + Tailwind token + `alpfit` namespace ile porla. Sorun = tek section-head (eyebrow + h2 + paragraf); Roller = 4 kart (Üye/Antrenör telefon, Diyetisyen/Yönetim web), her kart ikon + başlık + `Telefon`/`Web` rozeti + 4 madde. `AlpfitShowcase` kabuğuna eklenir (hero'dan sonra, `#roller` id). Tamamlanma: iki bölüm 5 dilde render, `next build` temiz.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/alpfit-plus-artifact.html` — Sorun HTML **L452-459**; Roller HTML **L461-492** (4 rol kartı + SVG ikonlar); Roller CSS **L199-215**; section/eyebrow CSS **L93-102, L192-197**
- `src/components/gym/GymSoftwareShowcase.tsx` — mevcut grid/kart + `Reveal` + eyebrow deseni (referans)
- `src/components/bunker-os/BunkerShowcase.tsx` — isimli-anahtar + `map` tüketim deseni (`roles` için)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md`, `_dev/phases/PHASE-15.md` (Task Listesi)

---

## Alt Görevler

- [ ] **1. Sorun bölümü**
  - `AlpfitShowcase` kabuğuna inline section (basit — kendi bileşenine gerek yok): section-head (eyebrow "Sorun" + h2 + paragraf). Artifact L452-459 önünde `<hr>` ayraç (`border-line-soft`).
  - i18n: `alpfit.problem.{eyebrow,title,body}` (5 dil; TR yetkili artifact L455-457).

- [ ] **2. `AlpfitRoles` bileşeni**
  - `src/components/alpfit/AlpfitRoles.tsx` (YENİ, `"use client"`): section-head (`alpfit.roles.{eyebrow,title,sub}`) + 4 rol kartı grid (`repeat(4,1fr)` → mobilde 2 → 1).
  - Sabit anahtar-dizisi ile map: `["member","trainer","dietitian","management"]`; her kart `t(\`roles.${k}.title\`)`, dev rozeti `t(\`roles.${k}.dev\`)` (Telefon/Web), maddeler `t(\`roles.${k}.items.${i}\`)` (4 madde).
  - SVG ikonlar (telefon/monitor) inline (artifact L471,476,481,486 — `aria-hidden`); marka token'ıyla (`text-green`, `bg-surface`, `border-line`).
  - i18n: `alpfit.roles.{eyebrow,title,sub}` + `roles.{member,trainer,dietitian,management}.{title,dev,items.{one..four}}` (5 dil; TR yetkili artifact L465-489).

- [ ] **3. Kabuğa bağla**
  - `AlpfitShowcase`: hero'dan sonra Sorun (inline) + `<AlpfitRoles/>` (`id="roller"`, `scroll-margin-top` sabit header için).

---

## Etkilenen Dosyalar

```
src/components/alpfit/AlpfitShowcase.tsx    # Sorun inline + AlpfitRoles bağlanır — zaten var (15.01)
src/components/alpfit/AlpfitRoles.tsx       # YENİ — 4 rol kartı grid
messages/tr.json                            # alpfit.problem.* + alpfit.roles.* — TR yetkili
messages/en.json                            # alpfit.* — TR kopyası (stale)
messages/ar.json                            # alpfit.* — TR kopyası (stale)
messages/de.json                            # alpfit.* — TR kopyası (stale)
messages/es.json                            # alpfit.* — TR kopyası (stale)
```

---

## Dikkat Noktaları

- **RTL (AR):** rol kartı grid + madde `::before` işareti logical prop'larla (`ps-/pe-`, `inset-inline-start`); physical left/right değil (M4 F4.3).
- **reduced-motion:** kartlar `<Reveal>` içinde stagger; reduced-motion'da görünür kalır (no-op). Hover-lift transition'ları craft; reduced-motion'u kırmaz.
- **a11y kontrast:** rol ikon yeşili + rozet metni + madde işareti AA geçmeli (light+dark); `subpages-a11y` mührü kırılmaz. Marka token'ları WCAG-tuned.
- **i18n:** yapısal anahtar 5 dilde eşzamanlı; `dev` rozeti (Telefon/Web) i18n'e girer (görünür etiket).
- **Modülerlik:** listeler isimli-anahtar + `map` (`crew` deseni); JSON array değil, kopya-kod yok.

---

## Test Kriterleri

- [ ] `next build` temiz: 5 locale SSG, 0 `MISSING_MESSAGE`, 0 warn.
- [ ] `npm run test` yeşil: `i18n-parity` yeni `problem`/`roles` anahtarlarını kapsar (5 dil eşzamanlı).
- [ ] Route render: Sorun bölümü (eyebrow+h2+paragraf) + 4 rol kartı (doğru başlık/rozet/4 madde) 5 dilde görünür.
- [ ] Rol sayısı = 4; her kartta dev rozeti (Üye/Antrenör=Telefon, Diyetisyen/Yönetim=Web).
- [ ] (Sandbox koşarsa) axe light+dark yeşil.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler + test kriterleri
- [ ] Git commit & push (`feat(TASK-15.02): ...`)
- [ ] Bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
