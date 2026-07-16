# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **run-task 15.07 ✅ — FAZ 15'İN TÜM TASK'LARI BİTTİ (7/7).** SEO/metadata + orphan temizliği + guardrail sweep: `spor-salonu-yazilimi/page.tsx` `generateMetadata` ternary yerine `alpfit` namespace'ten (`getTranslations`) — `title = \`${t("meta.title")} — Kiwi AI Lab\`` (crew-os deseni) + `description = t("meta.description")`; `alternates` bütün-obje **aynen korundu**. `alpfit.meta.{title,description}` 5 dile eklendi (TR: "Alpfit Plus — Kulüp İşletme Yazılımı" + SEO "spor salonu yazılımı" desc; non-TR TR-kopyası, versiyon-sınırı). Orphan `components/gym/GymSoftwareShowcase.tsx` **silindi** (`AlpfitShowcase` 15.01'den beri render; grep 0 tüketici) → `components/gym/` dizini kalktı. **Test:** Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn) · SEO prerender 5-dil `<title>`/`description` + `canonical`+5-dil `hreflang`+`x-default` korundu · **Playwright a11y tam süit 52/52** (spor-salonu 10/10 çift-tema WCAG-AA 0 ihlal, çapraz-regresyonsuz) + yapısal audit prerender temiz (1 main/1 h1/sıralı başlık/lang+dir/title) · AR `dir=rtl` + telefon 4× `dir=ltr` · dürüstlük 4/4 aynen · marka sesi yasak metafor 0. Lighthouse binary yok → task-sanctioned build+inspect fallback; numerik çift-tema koşusu verify-phase'e. Branch `revize/alpfit-plus`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 — regresyon değil). **Sıradaki: `/devflow:verify-phase 15`** (UAT).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **15 — v0.4 Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım)** (🔄 devam — tek faz; **7/7 task ✅, verify bekliyor**). Fazlar 1–14 ✅ (v0.1+v0.2+v0.3 tamam, canlı).
**Adım:** **verify** — 15.07 ✅ ile fazdaki 7 task'ın tümü tamamlandı. **Sıradaki: `/devflow:verify-phase 15`** (kullanıcı kabul testi — yeni oturum). **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** run-task 15.07 (2026-07-16) ✅ — SEO/metadata (`generateMetadata` `alpfit.meta.*` namespace'ten, crew-os deseni `${t("meta.title")} — Kiwi AI Lab` + description; `alternates` bütün-obje aynen; `alpfit.meta.{title,description}` 5-dil, TR "Alpfit Plus — Kulüp İşletme Yazılımı") + orphan `GymSoftwareShowcase.tsx` silindi (`components/gym/` dizini kalktı) + guardrail sweep. Vitest 39/39 · build 37/37 SSG · SEO prerender 5-dil title/desc + canonical/hreflang korundu · a11y tam süit 52/52 (çift-tema, çapraz-regresyonsuz) + yapısal audit temiz · AR dir=rtl + telefon dir=ltr · dürüstlük 4/4 · marka sesi temiz. run-task 15.06 (2026-07-16) ✅ — Fiyat bandı + Yol haritası (+Store) + Kapanış (`AlpfitPricing` ink-panel bant, price-card [₺1.500 + 3 satır + 2 CTA] + incl-card [7 madde]) + `alpfit.{pricing,roadmap,close}` 5-dil; axe off-viewport önlemi immediate-backdrop opak renk; dürüstlük 4/4; Vitest 39/39 · build 37/37 · a11y 52/52. Öncesi (detay → `phases/PHASE-15.md` Task Listesi + git log): 15.05 Neden Alpfit Plus · 15.04 9-özellik grid · 15.03 telefon mockup'ları (CSS Module) · 15.02 Sorun+4 Rol · 15.01 foundation ✅; plan döngüsü verify-plan/plan/research/discuss 15 ✅.
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

**Task:** **TASK-15.07 ✅ tamamlandı — fazın son task'ı.** SEO/metadata + Gym temizliği + guardrail doğrulama. Sıradaki adım: `/devflow:verify-phase 15`.
**Durum:** Faz 15 🔄 (15.01–15.07 ✅; **7/7 task bitti**); Adım = **verify**; Aktif Versiyon v0.4, Versiyon Sonu Durumu `içerik_fazları`. Fazlar 1–14 ✅ (canlı v0.3).
**İlerleme:** run-task 15.07 (2026-07-16) ✅ — SEO/metadata (`alpfit.meta.*` namespace, 5-dil) + orphan `GymSoftwareShowcase.tsx` silindi + tam guardrail sweep. Değişen: `page.tsx` `generateMetadata` + 5 messages (`alpfit.meta`) − 1 orphan bileşen. Vitest 39/39, build 37/37 SSG, SEO 5-dil title/desc + alternates korundu, a11y 52/52 çift-tema (çapraz-regresyonsuz) + yapısal audit temiz, AR RTL + telefon dir=ltr, dürüstlük 4/4.

---

## Task Durumu (Aktif Faz)

> **Faz 15 🔄** (15.01–15.07 ✅ **tamamlandı — 7/7**; sıradaki adım verify-phase 15). Tam tablo + açıklamalar `phases/PHASE-15.md` Task Listesi. Fazlar 1–14 ✅; son faz (14, v0.3 versiyon-sonu senaryo testi — UAT 11/11, 0 kapsam-içi bug) detayı `phases/PHASE-14.md` + `tasks/archive/`.

| # | Task | Durum |
|---|------|-------|
| 15.01 | Foundation: token + `alpfit` ns kökü + kabuk + Hero + sayfa rewire | ✅ Tamamlandı |
| 15.02 | Sorun + 4 Rol | ✅ Tamamlandı |
| 15.03 | Telefon mockup'ları (CSS Module, en yüksek craft) | ✅ Tamamlandı |
| 15.04 | 9 Özellik grid | ✅ Tamamlandı |
| 15.05 | Neden Alpfit Plus (why + koyu aside ink-panel) | ✅ Tamamlandı |
| 15.06 | Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış | ✅ Tamamlandı |
| 15.07 | SEO/metadata + Gym temizliği + guardrail doğrulama | ✅ Tamamlandı |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 14 kapandı (v0.3 canlı) → Faz 14 task özetleri PHASE-14'e mezun edildi** (detaylar `phases/PHASE-14.md` + `tasks/archive/`); Faz 15 aktif.

**TASK-15.07 — SEO/metadata (Alpfit Plus konumu) + orphan Gym temizliği + guardrail sweep** ✅ (2026-07-16)
- **Yapıldı:** `spor-salonu-yazilimi/page.tsx` `generateMetadata` ternary → `alpfit` namespace (`getTranslations`): `title = \`${t("meta.title")} — Kiwi AI Lab\`` (crew-os deseni) + `description = t("meta.description")`; `alternates: localizedAlternates(...)` bütün-obje **aynen** korundu. `alpfit.meta.{title,description}` 5 dile eklendi (TR "Alpfit Plus — Kulüp İşletme Yazılımı" + SEO "spor salonu yazılımı" desc; non-TR TR-kopyası). Orphan `components/gym/GymSoftwareShowcase.tsx` silindi (grep 0 tüketici) → `components/gym/` dizini kalktı.
- **Test:** Vitest 39/39 (i18n-parite `alpfit.meta` 5-dil) · `next build` 37/37 SSG exit 0 (0 MISSING) · SEO prerender 5-dil `<title>`/`description` + `canonical`+`tr/en/ar/de/es/x-default` hreflang korundu · Playwright a11y tam süit **52/52** (spor-salonu 10/10 çift-tema, çapraz-regresyonsuz) + yapısal audit prerender temiz (1 main/1 h1/sıralı başlık/lang+dir/title) · AR `dir=rtl` + telefon 4× `dir=ltr` · dürüstlük 4/4 · marka sesi temiz.
- **Not:** Lighthouse binary cache'te yok (kurulum onay-gerektiren) → task-sanctioned build+inspect fallback (yapısal audit prerender'da temiz) + axe çift-tema; numerik Lighthouse a11y=100 çift-tema verify-phase 15'e devredildi. **Faz 15'in 7 task'ı da ✅ → sıradaki adım verify-phase.**

**TASK-15.06 — Fiyat bandı (`AlpfitPricing` ink-panel) + Yol haritası (+Store) + Kapanış + i18n** ✅ (2026-07-16)
- **Kuruldu:** `AlpfitPricing.tsx` (YENİ — full-bleed `<section id="fiyat" bg-ink text-canvas>` ink-panel bant; price-grid `lg:grid-cols-[1.32fr_1fr]`; **price-card** ₺1.500 figürü + not + 3 satır [kurulum ₺3.000 / yıllık peşin ücretsiz / 15 gün, "free" `text-pulse-ink`] + 2 CTA [Demo iste `bg-canvas text-ink` inversiyon / Teklif al ghost] + kurucu notu `border-s-2 border-pulse-ink`; **incl-card** 7-madde checklist `Check` SVG; iç kart opak `INK_LIFT=bg-[color-mix(#fff 4%,ink)]`, muted `text-canvas/65`) + `AlpfitShowcase`'e bağlandı + inline **Yol haritası** (dashed kutu, yeşil "yakında" pill, `ROADMAP` map bold kalemler **Store dahil 5**) + inline **Kapanış** (h2 + 2 CTA). `alpfit.{pricing,roadmap,close}` 5-dil (+53 satır/dil, 35 leaf).
- **Test:** Vitest 39/39 (i18n-parity `pricing`/`roadmap`/`close`) · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn, INK_LIFT color-mix derlendi) · prerender 5-dil (band/₺1.500/free-satır/7-madde/roadmap Store/kapanış CTA; AR `dir=rtl`) · **Playwright a11y tam süit 52/52** (spor-salonu 10/10 çift-tema WCAG AA 0 ihlal, çapraz-regresyonsuz) · görsel light (koyu bant/krem metin, parlak-yeşil aksan) + dark (krem bant/koyu metin inversiyon) + AR-RTL tam aynalanma.
- **Not:** axe off-viewport önlemi (15.05 deseni genelleştirildi) — bant viewport-dışıyken küçük opak `text-pulse-ink` aksanlar body-canvas'a düşer → her aksana **immediate backdrop ile aynı opak renk** (eyebrow bant üstünde `bg-ink`, free-satır/₺ kart üstünde `INK_LIFT`); muted `/65` translücent → "incomplete" (dokunulmadı). Muted `/55`→`/65` (dark AA, task'a rağmen 15.05 kanıtı). İç kart opak (artifact `--band-surface` de opak). Dürüstlük 4/4 aynen. → MEMORY `axe-offscreen-inline-contrast`.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-15.07 ✅ tamamlandı** (fazın son task'ı). SEO/metadata + Gym temizliği + guardrail doğrulama. Sıradaki adım: `/devflow:verify-phase 15`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır).
**Aktif Faz:** **15 — v0.4 Alpfit Plus ürün vitrini** (🔄; 15.01–15.07 ✅ **7/7 bitti**). Adım = **verify**; sıradaki `/devflow:verify-phase 15`. **Aktif Versiyon v0.4 — Alpfit Plus ürün vitrini**, Versiyon Sonu Durumu: **içerik_fazları**. Fazlar 1–14 ✅ (v0.1+v0.2+v0.3, canlı). Faz dokümanı: `phases/PHASE-15.md`. Feature: `PRD/features/alpfit-plus.md`; tasarım referansı `docs/alpfit-plus-artifact.html`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — **run-task 15.07 ✅ — FAZ 15'İN 7 TASK'I DA BİTTİ.** SEO/metadata (`generateMetadata` `alpfit.meta.*` namespace, crew-os deseni title-suffix + description; `alternates` bütün-obje aynen korundu; `alpfit.meta.{title,description}` 5-dil, TR "Alpfit Plus — Kulüp İşletme Yazılımı") + orphan `GymSoftwareShowcase.tsx` silindi (`components/gym/` dizini kalktı) + guardrail sweep. Vitest 39/39 · build 37/37 SSG exit 0 (0 MISSING) · SEO prerender 5-dil title/desc + canonical/5-dil hreflang/x-default korundu · Playwright a11y tam süit 52/52 (spor-salonu 10/10 çift-tema WCAG-AA 0 ihlal, çapraz-regresyonsuz) + yapısal audit temiz · AR dir=rtl + telefon dir=ltr · dürüstlük 4/4 · marka sesi temiz. Lighthouse binary yok → task-sanctioned build+inspect fallback; numerik çift-tema koşusu verify-phase'e. Branch `revize/alpfit-plus`. **Sıradaki: `/devflow:verify-phase 15`** (UAT).
