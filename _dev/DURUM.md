# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **run-task 15.02 ✅.** Sorun + Dört rol porlandı: `AlpfitShowcase`'e hero sonrası `<hr>` ayraç + inline Sorun section-head (yeşil eyebrow + serif h2 + ink-soft gövde) + `AlpfitRoles.tsx` (YENİ — 4 kart: Üye/Antrenör=Telefon, Diyetisyen/Yönetim=Web; telefon/monitor SVG ikon, dev rozeti, 4 madde `ps-/before:start-0` RTL mantıksal-prop, hover-lift `transition-[translate,…]`; isimli-anahtar+`map` crew deseni). i18n `alpfit.problem`+`alpfit.roles` 5-dil eşzamanlı (TR yetkili, non-TR TR-kopya; +50 satır/dil). **Test:** Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn) · prerender 5-dil grep 1/1 · **Playwright a11y bu oturumda koştu:** spor-salonu 10/10 + tam alt-sayfa süiti 50/50 (WCAG AA 0 ihlal, çapraz regresyon yok) · görsel light+dark+AR-RTL craft doğrulandı. Branch `revize/alpfit-plus`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 — regresyon değil). **Sıradaki: `/devflow:run-task 15.03`** (5 task kaldı).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **15 — v0.4 Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım)** (🔄 devam — tek faz). Fazlar 1–14 ✅ (v0.1+v0.2+v0.3 tamam, canlı).
**Adım:** task — 15.02 ✅ tamamlandı (7 task'tan 2'si bitti, 5 kaldı). **Sıradaki: `/devflow:run-task 15.03`** (Telefon mockup'ları — CSS Module, en yüksek craft — yeni oturum). **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** run-task 15.02 (2026-07-16) ✅ — Sorun (inline section-head + `<hr>`) + `AlpfitRoles` (4 kart, telefon/monitor ikon + Telefon/Web rozeti + RTL mantıksal-prop) + `alpfit.problem`/`alpfit.roles` 5-dil. Vitest 39/39 · build 37/37 SSG · a11y 50/50 (çift-tema, çapraz regresyonsuz). run-task 15.01 (2026-07-16) ✅ — Foundation: `--color-surface` token + `alpfit` ns kökü + `AlpfitShowcase`/`AlpfitHero` + sayfa rewire. verify-plan 15 (2026-07-16) ✅ — 7 task doğrulandı. plan-phase 15 (2026-07-16) ✅ — 7 task dokümanı. research-phase 15 (2026-07-16) ✅. discuss-phase 15 (2026-07-16) ✅.
**Son Faz Dokümanı:** `phases/PHASE-15.md` (🔄 aktif). Önceki: `phases/PHASE-14.md` (✅ v0.3 son fazı).

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** içerik_fazları (re-kickoff 2026-07-16 sıfırladı)

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-15.03 (aktif — henüz başlamadı).** Telefon mockup'ları (`PhoneMockups` — CSS Module, `dir=ltr` sabit-TR; en yüksek craft). Sıradaki: `/devflow:run-task 15.03`.
**Durum:** Faz 15 🔄 (15.01 ✅, 15.02 ✅; 5 task kaldı); Adım = task; Aktif Versiyon v0.4, Versiyon Sonu Durumu `içerik_fazları`. Fazlar 1–14 ✅ (canlı v0.3).
**İlerleme:** run-task 15.02 (2026-07-16) ✅ — Sorun + `AlpfitRoles` (4 kart) + `alpfit.problem`/`alpfit.roles` 5-dil; Vitest 39/39, build 37/37 SSG, a11y 50/50 çift-tema. 1 yeni dosya (`AlpfitRoles.tsx`) + `AlpfitShowcase` genişletildi + 5 messages.

---

## Task Durumu (Aktif Faz)

> **Faz 15 🔄** (15.01–15.02 ✅ tamamlandı; 5 task kaldı, sıradaki 15.03 aktif). Tam tablo + açıklamalar `phases/PHASE-15.md` Task Listesi. Fazlar 1–14 ✅; son faz (14, v0.3 versiyon-sonu senaryo testi — UAT 11/11, 0 kapsam-içi bug) detayı `phases/PHASE-14.md` + `tasks/archive/`.

| # | Task | Durum |
|---|------|-------|
| 15.01 | Foundation: token + `alpfit` ns kökü + kabuk + Hero + sayfa rewire | ✅ Tamamlandı |
| 15.02 | Sorun + 4 Rol | ✅ Tamamlandı |
| 15.03 | Telefon mockup'ları (CSS Module, en yüksek craft) | ⬜ Bekliyor |
| 15.04 | 9 Özellik grid | ⬜ Bekliyor |
| 15.05 | Neden Alpfit Plus (why + koyu aside ink-panel) | ⬜ Bekliyor |
| 15.06 | Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış | ⬜ Bekliyor |
| 15.07 | SEO/metadata + Gym temizliği + guardrail doğrulama | ⬜ Bekliyor |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 14 kapandı (v0.3 canlı) → Faz 14 task özetleri PHASE-14'e mezun edildi** (detaylar `phases/PHASE-14.md` + `tasks/archive/`); Faz 15 aktif.

**TASK-15.02 — Sorun bölümü + 4 Rol (`AlpfitRoles`) + `alpfit.problem`/`alpfit.roles` i18n** ✅ (2026-07-16)
- **Kuruldu:** `AlpfitShowcase`'e hero sonrası `<hr>` ayraç + inline Sorun section-head (yeşil eyebrow `before:` bar + serif h2 + `text-ink-soft` gövde) + `AlpfitRoles.tsx` (YENİ) — 4 rol kartı grid (`sm:grid-cols-2 lg:grid-cols-4`): Üye/Antrenör=Telefon (telefon SVG), Diyetisyen/Yönetim=Web (monitor SVG); yeşil ikon tile + başlık + dev rozeti + 4 madde. İsimli-anahtar `ROLES=[{key,device}]` + `map` (crew deseni); `device` hem ikonu hem rozeti sürer.
- **Test:** Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn) · prerender 5-dil grep (Sorun/roles-head/#roller/4 kart/Telefon×2/Web×2) 1/1 · **Playwright a11y bu oturumda koştu:** spor-salonu 10/10 + tam alt-sayfa süiti 50/50 (WCAG AA 0 ihlal, çapraz regresyon yok) · görsel light+dark+AR-RTL craft doğrulandı.
- **Not:** RTL madde işareti `ps-[18px]`+`before:start-0` (mantıksal-prop → AR'de sağda); hover-lift `transition-[translate,box-shadow,border-color]` (v4 translate tuzağı: `translate` listelendi, `transform` değil). i18n non-TR TR-kopya (versiyon-sınırına ertelenen stale).

**TASK-15.01 — Foundation: `--color-surface` token + `alpfit` ns kökü + `AlpfitShowcase`/`AlpfitHero` + sayfa rewire** ✅ (2026-07-16)
- **Kuruldu:** `--color-surface` (@theme `#fffefb` / html.dark `#191b12`) + `alpfit` i18n ns 5 dilde (back/cta + `hero.*`; TR yetkili, non-TR TR-kopya, yapısal anahtar eşzamanlı) + `components/alpfit/{AlpfitShowcase,AlpfitHero}.tsx` (iki-sütun `LivingFlow`+`FlowScrim` hero, opak `bg-surface` before/after kart, pilot `animate-ping` nabzı, 3-parça yeşil mark, subject'li mailto + `#fiyat` CTA, RTL `rtl:-scale-x-100` tick) + `spor-salonu-yazilimi/page.tsx` rewire (Gym→Alpfit, PageHeader ns crewOs→alpfit; `generateMetadata` 15.07'ye).
- **Test:** Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn, type-check geçti) · prerender 5-dil grep pilot/mark/mailto/#fiyat/compare 1/1 MISSING 0 · **Playwright a11y bu oturumda koştu 50/50** (spor-salonu 10 varyant = 5 dil × light+dark, RTL dahil, WCAG AA 0 ihlal); crew-os görünür hero sağlam.
- **Not:** `GymSoftwareShowcase.tsx` orphan oldu ama silinmedi (referans; 15.07 temizlik). next-intl tüm ns'i her sayfaya gömer → `alpfit` crew-os.html'de escaped-JSON (görünür içerik değil, mevcut davranış).


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-15.03** (aktif — henüz başlamadı). Telefon mockup'ları (`PhoneMockups` — CSS Module, en yüksek craft). Sıradaki: `/devflow:run-task 15.03`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır).
**Aktif Faz:** **15 — v0.4 Alpfit Plus ürün vitrini** (🔄; 15.01–15.02 ✅, 5 task kaldı). Adım = task; sıradaki `/devflow:run-task 15.03`. **Aktif Versiyon v0.4 — Alpfit Plus ürün vitrini**, Versiyon Sonu Durumu: **içerik_fazları**. Fazlar 1–14 ✅ (v0.1+v0.2+v0.3, canlı). Faz dokümanı: `phases/PHASE-15.md`. Feature: `PRD/features/alpfit-plus.md`; tasarım referansı `docs/alpfit-plus-artifact.html`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — **run-task 15.02 ✅.** Sorun (inline section-head + `<hr>` ayraç) + `AlpfitRoles` (4 kart: Telefon×2/Web×2, telefon/monitor ikon, RTL mantıksal-prop, hover-lift) + `alpfit.problem`/`alpfit.roles` 5-dil (TR yetkili). Vitest 39/39 · build 37/37 SSG exit 0 · Playwright a11y 50/50 (çift-tema 0 ihlal, çapraz regresyonsuz) · görsel light+dark+AR-RTL craft. 1 yeni dosya + `AlpfitShowcase` + 5 messages. Branch `revize/alpfit-plus`. **Sıradaki: `/devflow:run-task 15.03`** (5 task kaldı).
