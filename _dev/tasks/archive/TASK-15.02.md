# TASK-15.02: Sorun bölümü + 4 Rol bölümü

**Durum:** ✅ Tamamlandı
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

- [x] **1. Sorun bölümü**
  - `AlpfitShowcase` kabuğuna inline section (basit — kendi bileşenine gerek yok): section-head (eyebrow "Sorun" + h2 + paragraf). Artifact L452-459 önünde `<hr>` ayraç (`border-line` — artifact `.divide` `var(--line)` kullanır; `-soft` token yok, tek yeni token `--color-surface`).
  - i18n: `alpfit.problem.{eyebrow,title,body}` (5 dil; TR yetkili artifact L455-457).

- [x] **2. `AlpfitRoles` bileşeni**
  - `src/components/alpfit/AlpfitRoles.tsx` (YENİ, `"use client"`): section-head (`alpfit.roles.{eyebrow,title,sub}`) + 4 rol kartı grid (`repeat(4,1fr)` → mobilde 2 → 1).
  - Sabit anahtar-dizisi ile map: `["member","trainer","dietitian","management"]`; her kart `t(\`roles.${k}.title\`)`, dev rozeti `t(\`roles.${k}.dev\`)` (Telefon/Web), maddeler `t(\`roles.${k}.items.${i}\`)` (4 madde).
  - SVG ikonlar (telefon/monitor) inline (artifact L471,476,481,486 — `aria-hidden`); marka token'ıyla (`text-green`, `bg-surface`, `border-line`).
  - i18n: `alpfit.roles.{eyebrow,title,sub}` + `roles.{member,trainer,dietitian,management}.{title,dev,items.{one..four}}` (5 dil; TR yetkili artifact L465-489).

- [x] **3. Kabuğa bağla**
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

- [x] `next build` temiz: 5 locale SSG (37/37), 0 `MISSING_MESSAGE`, 0 warn, exit 0 (type-check + lint geçti).
- [x] `npm run test` yeşil (39/39): `i18n-parity` yeni `problem`/`roles` anahtarlarını kapsar (5 dil eşzamanlı — 250 satır eklendi, 50/dil).
- [x] Route render: Sorun bölümü (eyebrow+h2+paragraf) + 4 rol kartı 5 dilde prerender HTML'de görünür (`Sorun`/`Herkes kendi ekranından`/`#roller` grep 1/1 · 5 dil).
- [x] Rol sayısı = 4; görünür dev rozeti Telefon×2 (Üye/Antrenör) + Web×2 (Diyetisyen/Yönetim) — grep + canlı DOM teyitli.
- [x] axe light+dark yeşil: Playwright a11y **bu oturumda koştu** — spor-salonu 10/10 (5 dil × light/dark, WCAG AA 0 ihlal); tam alt-sayfa süiti 50/50 (çapraz regresyon yok). `next start` bu oturumda yaşadı (`reuseExistingServer`).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler + test kriterleri
- [x] Git commit & push (`feat(TASK-15.02): ...`)
- [x] Bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-16 (run-task 15.02)

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Sorun bölümü (inline):** `AlpfitShowcase` kabuğuna hero'dan sonra `<hr>` ayraç (`border-0 border-t border-line`, content sütununa hizalı) + tek `<Reveal>` section-head — yeşil eyebrow (bar `before:` pseudo, artifact `.eyebrow` 12px/700/0.15em/`opacity-55`) + serif h2 (`clamp(30px,4.2vw,44px)`) + `text-ink-soft` gövde.
- **`AlpfitRoles.tsx` (YENİ, `"use client"`):** section-head + 4 rol kartı grid (`sm:grid-cols-2 lg:grid-cols-4`, `gap-[18px]`). İsimli-anahtar + `map` (crew deseni): `ROLES=[{key,device}]` — `device` hem ikonu (telefon/monitor SVG, `RoleIcon`) hem (i18n) `dev` rozetini sürer. `ITEMS=["one".."four"]`. Kart: yeşil ikon tile (`bg-green/[0.13]` `border-green/20`) + `<h3>` başlık + `Telefon`/`Web` rozet + 4 madde (`ps-[18px]` + `before:start-0` yeşil nokta — RTL mantıksal-prop). Hover-lift `transition-[translate,box-shadow,border-color]` (v4 translate tuzağı: `transform` değil `translate` listelendi).
- **i18n:** `alpfit.problem.{eyebrow,title,body}` + `alpfit.roles.{eyebrow,title,sub}` + `roles.{member,trainer,dietitian,management}.{title,dev,items.{one..four}}` — 5 dile eşzamanlı eklendi (TR yetkili, non-TR TR-kopyası = versiyon-sınırına ertelenen stale). JSON kanonik round-trip (yalnız eklenen satırlar diff'te, reformat yok).

**Sorunlar:**
- Sandbox `pkill next-server` komutunu exit 144 ile kesti (bilinen davranış — MEMORY sandbox notu) → temizlik/durum ayrı çalıştırıldı, sorun yok. `next start` bu oturumda **yaşadı** → a11y süiti `reuseExistingServer` ile gerçek prod build'e karşı koştu.

**Kararlar:**
- Content sütun genişliği hero ile hizalı `max-w-[1400px]` (artifact `.wrap`=1140px değil) — hero 15.01'de 1400px kurdu, site showcase konvansiyonu; sekmesiz hizalama için. docs/DECISIONS.md'ye eklendi: Hayır (mevcut konvansiyon/plan sınırında; yeni mimari karar değil).
- Eyebrow markup iki yerde inline (Sorun + Roller) — paylaşılan primitive plan-dışı dosya olurdu (task "kendi bileşenine gerek yok" diyor); 2 kopya kabul, "kopya-kod yok" ilkesi liste-verisi içindi (o `map` ile karşılandı).

**Dosya Değişiklikleri:**
- `src/components/alpfit/AlpfitShowcase.tsx` → `<main>` + hero sonrası `<hr>` + Sorun inline section + `<AlpfitRoles/>` bağlandı; `useTranslations("alpfit")`.
- `src/components/alpfit/AlpfitRoles.tsx` → YENİ (4 rol kartı + `RoleIcon`).
- `messages/{tr,en,ar,de,es}.json` → `alpfit.problem` + `alpfit.roles` (her dile 50 satır).

**Test Sonuçları:**
- Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn) · prerender 5-dil grep (Sorun/roles-head/#roller/4 kart/2+2 rozet) 1/1 · Playwright a11y spor-salonu 10/10 + tam alt-sayfa süiti 50/50 · görsel: light+dark+AR-RTL çift-tema craft doğrulandı (madde işareti RTL'de `inset-inline-start`→sağ).

---

## Sonuç Özeti

Alpfit Plus vitrinine artifact'ın **Sorun** (tek section-head + ayraç) ve **Dört rol** (4 kart: Üye/Antrenör=Telefon, Diyetisyen/Yönetim=Web; ikon+başlık+rozet+4 madde) bölümleri React + Tailwind token + `alpfit` namespace ile porlandı. Yeni `AlpfitRoles` bileşeni isimli-anahtar+`map` (crew deseni), RTL mantıksal-prop, hover-lift craft. i18n 5-dil eşzamanlı. Guardrail regresyonsuz: Vitest 39/39, build 37/37 SSG temiz, a11y 50/50 çift-tema.

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
**Tamamlanma:** 2026-07-16 (run-task 15.02)
