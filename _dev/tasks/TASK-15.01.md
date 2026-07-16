# TASK-15.01: Foundation — `--color-surface` token + `alpfit` namespace kökü + `AlpfitShowcase` kabuk + Hero (Living Flow + before/after) + sayfa rewire

**Durum:** ⬜ Bekliyor
**Modül:** M2 (Sayfalar & Bölümler) + M1 (token/Living Flow) + M4 (i18n)
**Feature:** AP1 (port+bölümler) · AP2 (i18n namespace)
**Faz:** Phase 15 (phases/PHASE-15.md)
**Bağımlılıklar:** Yok (fazın temel task'ı)

---

## Hedef

Alpfit Plus yeniden tasarımının temelini kur ve craft-kritik hero'yu inşa et: (1) yeni `--color-surface` tasarım token'ı (`globals.css`), (2) `alpfit` i18n namespace'inin kökü (5 dilde `back`/`cta` + `hero.*`), (3) `components/alpfit/AlpfitShowcase.tsx` kompozisyon kabuğu, (4) `AlpfitHero.tsx` — imza Living Flow + FlowScrim korunan iki-sütun hero (sol metin, sağ before/after karşılaştırma kartı), (5) `spor-salonu-yazilimi/page.tsx`'i eski `GymSoftwareShowcase`'ten `AlpfitShowcase`'e ve PageHeader namespace'ini `crewOs`→`alpfit`'e geçir. Tamamlanma: route (`/spor-salonu-yazilimi`) 5 dilde hero'yu render eder, `next build` temiz (0 MISSING_MESSAGE), Living Flow + before/after kartı okunur.

---

## Bağlam

Sayfa erken wire edilir (Gym→Alpfit swap bu task'ta) ki bundan sonraki bölüm task'ları (15.02–15.06) `AlpfitShowcase` kabuğuna eklenip **gerçek route'ta `next build` ile doğrulansın** (TESTING.md L37: jsdom'da WebGL yok → Hero/Living Flow birim-test edilmez; güvenilir test = build SSG ground-truth + Vitest parite). Bu task'tan sonra route ilerleyici olarak dolar; branch `revize/alpfit-plus` canlıya deploy edilmediği için ara "yapım aşamasında" hali sorun değil. Eski `GymSoftwareShowcase.tsx` bu swap'la orphan olur ama bölüm portlarında **referans** olarak tutulur; nihai silme TASK-15.07'de (kod hijyeni).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/alpfit-plus-artifact.html` — Hero HTML **L413-448**, hero/compare CSS **L141-190**, token'lar **L8-69**
- `_dev/phases/PHASE-15.md` — "Araştırma Bulguları" §5 (hero dengesi) + "Teknik Kararlar" (hero, `--color-surface`)
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — token sistemi + LivingFlow/FlowScrim sözleşmesi
- `src/components/bunker-os/BunkerShowcase.tsx` — namespace+`useTranslations` deseni, LivingFlow+FlowScrim hero deseni
- `src/components/Reveal.tsx` — `[data-reveal]` sözleşmesi

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-15.md` — Task Listesi tablosunda 15.01 durumu

---

## Alt Görevler

- [ ] **1. `--color-surface` token'ı ekle**
  - `src/app/globals.css` `@theme` bloğuna `--color-surface: #fffefb;` (light), `html.dark` bloğuna `--color-surface: #191b12;` (dark). Kaynak: artifact `--surface` (L11, L37/L49).
  - Tailwind v4 otomatik `bg-surface`/`border-surface`/`text-surface` yardımcılarını üretir (config yok — `@theme`).

- [ ] **2. `alpfit` namespace kökünü 5 dile ekle**
  - `messages/{tr,en,ar,de,es}.json`'a `alpfit` namespace'i: `back`, `cta` (PageHeader; `back`="Ana sayfa", `cta`="Ücretsiz keşif görüşmesi al" — `/#contact` hedefine uygun, "Demo iste" DEĞİL) + `hero.*` alt-objeleri.
  - `hero`: `pilot` (chip), `h1lead`+`h1mark`+`h1tail` (H1'de vurgulu "tek platformda"), `sub`, `ctaPrimary` ("15 dakikalık demo iste"), `ctaSecondary` ("Fiyatları gör"), `note`, `compare.{todayLabel, afterLabel, today.{one..four}, after.{one..four}}`. Kopya: artifact L416-443 (TR birebir).
  - **TR birincil (yetkili); en/ar/de/es = TR kopyası** (stale placeholder — yapısal anahtar 5 dilde eşzamanlı; değer versiyon-sınırı).
  - Yapı `crew` desenini izler (isimli-anahtar alt-objeler + `map`); JSON array değil.

- [ ] **3. `AlpfitShowcase` kabuğu + `AlpfitHero` bileşeni**
  - `src/components/alpfit/AlpfitShowcase.tsx` (YENİ, `"use client"`): `<main className="pt-16">` içinde bölümleri kompoze eder; şimdilik yalnız `<AlpfitHero/>`. Sonraki task'lar bölüm ekler.
  - `src/components/alpfit/AlpfitHero.tsx` (YENİ, `"use client"`): `useTranslations("alpfit")`; `<section>` içinde `<LivingFlow/>` + `<FlowScrim/>` arkaplan; iki-sütun grid (`~1.1fr / 0.9fr`, mobilde tek sütun). Sol: pilot-chip (nabız `.dot` — reduced-motion'da durur) + H1 (mark vurgulu, `t.rich` veya 3-parça) + sub + iki CTA (primary mailto `mailto:kivanc@kiwiailab.com?subject=Alpfit%20Plus%20demo%20talebi`, secondary `#fiyat` anchor) + note. Sağ: opak `bg-surface` before/after compare kartı (Bugün ↔ Alpfit+; artifact L426-445).
  - Marka token'ları (`bg-surface`, `text-ink-soft`, `text-green`, `border-line` vb.) — hardcode renk/px değil. Artifact dekoratif radial glow'ları (`.hero::before`, `.compare-wrap::before`) **bırakılır** (ambient yeşili Living Flow sağlar).

- [ ] **4. `page.tsx` rewire**
  - `src/app/[locale]/spor-salonu-yazilimi/page.tsx`: import `GymSoftwareShowcase` → `AlpfitShowcase`; `getTranslations({namespace:"crewOs"})` → `namespace:"alpfit"` (PageHeader `back`/`cta`). `generateMetadata` **bu task'ta değişmez** (SEO → TASK-15.07). `localizedAlternates`/route korunur.

---

## Etkilenen Dosyalar

```
src/app/globals.css                              # --color-surface (@theme + html.dark) — token eklenir
src/app/[locale]/spor-salonu-yazilimi/page.tsx   # showcase swap + namespace crewOs→alpfit
src/components/alpfit/AlpfitShowcase.tsx          # YENİ — kompozisyon kabuğu
src/components/alpfit/AlpfitHero.tsx              # YENİ — iki-sütun hero (Living Flow + before/after)
messages/tr.json                                 # alpfit.{back,cta,hero.*} — TR yetkili
messages/en.json                                 # alpfit.* — TR kopyası (stale)
messages/ar.json                                 # alpfit.* — TR kopyası (stale)
messages/de.json                                 # alpfit.* — TR kopyası (stale)
messages/es.json                                 # alpfit.* — TR kopyası (stale)
```

> `GymSoftwareShowcase.tsx` bu swap'la orphan olur ama **silinmez** (TASK-15.07 referans/temizlik). `--color-pulse-ink` zaten repo (globals.css:17,49 — TD4).

---

## Dikkat Noktaları

- **İmza korunur (Craft üst eksen):** Living Flow + FlowScrim hero'dan kaldırılmaz — amiral ürün sayfasının hero'sudur (ILKELER §1). FlowScrim ile sağ-sütun kart okunabilirliği vs. akış canlılığı dengesi prototiplenir (research §5).
- **Yeni WebGL maliyeti yok:** tek Living Flow (mevcut hero mekanizması).
- **`--color-surface` yeni token** — kart "lift"i; band token ailesi (`--band-*`) EKLENMEZ (research kararı).
- **CTA modeli:** body CTA'ları subject'li **mailto** (email + subject href'te sabit sabit; görünür etiket i18n). PageHeader CTA site-geneli `/#contact` (dokunulmaz, hardcoded).
- **reduced-motion:** pilot `.dot` nabzı durur; `Reveal` no-op (görünür kalır). H1/hero animasyonları `<Reveal>`+`data-reveal` ile.
- **RTL (AR):** iki-sütun grid + compare `→` tick logical prop'larla; physical left/right değil (M4 F4.3). `→` RTL'de yön çevirir (logical/`←`).
- **i18n:** yapısal anahtar 5 dilde eşzamanlı (eksik = runtime hata / `MISSING_MESSAGE`). `crewOs` namespace'i **kaldırılmaz** (crew-os sayfası kullanır); yalnız gym sayfası ödünç almayı bırakır.
- **H1 vurgu ("tek platformda"):** `t.rich` (`<mark>` chunk) veya 3-parça anahtar (`h1lead`+`h1mark`+`h1tail`) — pixel-mark stilini (yeşil + pulse altı-vurgu) marka token'ıyla ver.

---

## Test Kriterleri

- [ ] `next build` temiz: `/spor-salonu-yazilimi` 5 locale SSG üretir, **0 `MISSING_MESSAGE`**, 0 warn.
- [ ] `npm run test` yeşil: `i18n-parity.test.ts` yeni `alpfit` namespace'ini kapsar (5 dilde eşzamanlı anahtar) + mevcut Vitest testleri kırılmaz.
- [ ] Route render: hero 5 dilde görünür — pilot-chip + H1 (mark vurgulu) + sub + iki CTA + note + before/after kartı; Living Flow + FlowScrim arkaplan.
- [ ] CTA primary `mailto:...?subject=Alpfit%20Plus%20demo%20talebi`; secondary `#fiyat` anchor.
- [ ] PageHeader `back`/`cta` `alpfit` namespace'inden gelir (crewOs değil); crew-os sayfası etkilenmez.
- [ ] (Sandbox koşarsa) `subpages-a11y.spec.ts` `/spor-salonu-yazilimi` axe light+dark yeşil — kırılmaz.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`feat(TASK-15.01): ...`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
