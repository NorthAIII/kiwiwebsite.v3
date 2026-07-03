# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **run-task TASK-13.04 ✅: `/forum` locale-gap kapatıldı + tüm config redirect denetimi + regresyon tohumu — TB-2 tamamlandı, Faz 13 tüm task'lar ✅.** `next.config.ts` `redirects()`: `/forum`→`/` (+ locale twin), `/forum/:slug*`→`/bulten/:slug*` (+ locale twin), `/bunker-os` çifti korundu; hepsi 308. **İcra bulgusu:** `:slug*` opsiyonel gruba derlenir → çıplak `/forum`'u da eşler; hedefler ıraksadığı için çıplak giriş slug'dan ÖNCE sıralandı (plan sırası çürütüldü → DECISIONS+memory). `tests/seo-redirects.test.ts` (YENİ) locale-kapsam+sıra mührü. Test 39✅ (5 dosya, +16) · build temiz (0 MISSING_MESSAGE). Sıradaki adım **`verify-phase 13`** (UAT).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 13 — **v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni)** 🔄 (tüm task'lar ✅ → verify bekliyor). **Faz 12 ✅** (B1 Living Flow nabız kapsamı). Faz 11 ✅ (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** verify (TASK-13.01 ✅, 13.02 ✅, 13.03 ✅, 13.04 ✅ → fazın tüm task'ları bitti; sıradaki `verify-phase 13`; Versiyon Sonu Durumu = `teknik_borç`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** TASK-13.04 (2026-07-03) ✅ — `next.config.ts` `redirects()` locale-gap kapandı + hedef düzeltildi: `/forum`→`/`, `/forum/:slug*`→`/bulten/:slug*`, `/bunker-os`→`/crew-os`; her biri çıplak+twin, 6 redirect 308. **İcra bulgusu (plan sırası çürütüldü):** `:slug*` opsiyonel gruba derlenir → çıplak `/forum`'u da eşler; ıraksak hedefte çıplak giriş slug'dan ÖNCE gelmeli (yoksa `/forum`→`/bulten` 404) → DECISIONS+memory'ye taşındı. `tests/seo-redirects.test.ts` (YENİ) locale-kapsam+sıra assertion. 39✅ (5 dosya) · build temiz (0 MISSING_MESSAGE). **TB-1 + TB-2 tamamlandı → Faz 13 icra bitti.** **Kapsam-dışı/kayıtlı sahipli açıklar:** **TB-3 full-motion tohumu (WebGL flaky, gelecek faz)**, **TB-4 site-geneli logical-ok (RTL)**, **TB-5 npm audit (next downgrade breaking)**, B grubu → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-13.md` (🔄 Devam ediyor — Task Listesi: 13.01–13.04 ✅; UAT bekliyor). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** teknik_borç

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Faz 13'ün tüm task'ları ✅ (13.01–13.04). TASK-13.04 ✅ tamamlandı, arşivlendi. Sıradaki adım task değil **`verify-phase 13`** (UAT).
**Durum:** Faz 13 🔄 → Adım **verify**. Versiyon Sonu Durumu = `teknik_borç`; Aktif Versiyon v0.3.
**İlerleme:** TASK-13.04 (2026-07-03) ✅ — `/forum` locale-gap + tüm config redirect denetimi (`/forum`→`/`, çıplak+twin, 6 redirect 308); `:slug*` sıra tuzağı ampirik bulundu → çıplak-önce sıralama (DECISIONS+memory). `tests/seo-redirects.test.ts` (YENİ); 39 test yeşil, build temiz. **TB-2 tamamlandı → Faz 13 icra bitti.** Sıradaki = `verify-phase 13`.

---

## Task Durumu (Aktif Faz)

> **Faz 13 🔄** — plan yazıldı (`phases/PHASE-13.md` → Task Listesi). Task'lar `verify-plan 13` sonrası `run-task` ile sırayla çalışılır. Faz 4–12 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 13.01 | TASK-13.01 | ✅ Tamamlandı | Ortak `localizedAlternates` helper + locale-path util + sitemap refactor + helper unit testi (TB-1) |
| 13.02 | TASK-13.02 | ✅ Tamamlandı | 5 alt sayfaya self-canonical + 5-locale hreflang alternates (TB-1) |
| 13.03 | TASK-13.03 | ✅ Tamamlandı | alternates layout→ana sayfa taşıma (fail-safe default) (TB-1) |
| 13.04 | TASK-13.04 | ✅ Tamamlandı | `/forum` locale-gap + config redirect denetimi + redirect regresyon tohumu (TB-2) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 12 kapandı → Faz 12 task özetleri sıfırlandı** (detaylar `phases/PHASE-12.md` + `tasks/archive/`). Faz 13'ün ilk task'ı bitince buraya eklenir.

**TASK-13.04** — `/forum` locale-gap + tüm config redirect denetimi + regresyon tohumu (TB-2) ✅
- **Özet:** `next.config.ts` `redirects()`: `/forum`→`/`, `/forum/:slug*`→`/bulten/:slug*`, `/bunker-os`→`/crew-os`; her biri çıplak+`/:locale(en|ar|de|es)/…` twin, 6 redirect 308. `/forum` hedefi `/bulten` değil `/` (`/bulten` index yok, içerik ana sayfada). **İcra bulgusu:** `:slug*` opsiyonel gruba derlenir → çıplak `/forum`'u da eşler; ıraksak hedefte çıplak-önce sıralandı (plan sırası çürütüldü).
- **Test:** `npm run test` 39✅ (5 dosya, +16 seo-redirects); `next build` temiz (0 MISSING_MESSAGE); `routes-manifest.json` regex ground-truth — `/forum`→`/`, `/en/forum`→`/en`, `/forum/x`→`/bulten/x`, `/en/forum/x`→`/en/bulten/x`, `/bunker-os` çifti korundu, hepsi 308.
- **Sınır:** içerik/DOM/route path değişmedi; `/bulten` index oluşturulmadı (kapsam dışı). DECISIONS+memory'ye sıra tuzağı taşındı.

**TASK-13.03** — alternates'i layout'tan ana sayfaya taşı (fail-safe default) (TB-1) ✅
- **Özet:** `layout.tsx` `generateMetadata`'dan `alternates` bloğu kaldırıldı (title/desc/og/metadataBase korundu); `page.tsx`'e `generateMetadata` eklendi (`alternates: localizedAlternates(locale, "")` → title/desc layout'tan sığ-merge). Layout artık canonical miras ETTİRMEZ → unutan sayfa "canonical yok" (zararsız), yanlış `/` değil. **TB-1 tamamlandı.**
- **Test:** `npm run test` 23✅; `next build` temiz (0 MISSING_MESSAGE); prerender `<head>` — home tr→root, en/ar→prefixli + 5-dil hreflang+x-default, title/desc dolu (layout mirası); 5 alt sayfa (13.02) kendi path'inde (regresyonsuz); `/`'a canonicalize olan tek route = home TR.
- **Sınır:** DOM/içerik/route path değişmedi; DECISIONS'a fail-safe canonical mimarisi kararı eklendi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Faz 13 tüm task'lar ✅ (13.01–13.04). TASK-13.04 ✅ (`/forum` locale-gap + config redirect denetimi + regresyon tohumu; TB-2 bitti). Sıradaki adım task değil **`verify-phase 13`** (UAT). Açık takip: chatbot canlı env key.
**Aktif Faz:** **13 🔄** — v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni): TB-1 alt-sayfa self-canonical + 5-locale hreflang alternates (+x-default) ✅ + TB-2 `/forum` locale gap + tüm config redirect denetimi (`/forum`→`/`) + regresyon tohumu ✅. İcra bitti → UAT bekliyor. Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **teknik_borç** → sıradaki komut `verify-phase 13`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **run-task TASK-13.04 ✅: `/forum` locale-gap + tüm config redirect denetimi + regresyon tohumu — TB-2 tamamlandı, Faz 13 icra bitti** (kod: 2 dosya). `next.config.ts` `redirects()` bloğu yeniden düzenlendi (yalnız bu blok; transpilePackages/images/intl-plugin dokunulmadı): `/forum`→`/` + `/:locale(en|ar|de|es)/forum`→`/:locale` (YENİ twin); `/forum/:slug*`→`/bulten/:slug*` + `/:locale(en|ar|de|es)/forum/:slug*`→`/:locale/bulten/:slug*` (YENİ twin); `/bunker-os` çifti **korundu**. Hedef `/bulten` değil `/` (`/bulten` index yok, bülten içeriği ana sayfada `#forum`). **İcra bulgusu (plan sırası çürütüldü):** `:slug*` `routes-manifest.json`'da **opsiyonel gruba** derlenir → `/forum/:slug*` regex'i çıplak `/forum`'u da eşler (sıfır segment); hedefler ıraksadığı için (çıplak→`/`, slug→`/bulten`) task planındaki "slug-önce" sırası çıplak `/forum`'u yanlışlıkla `/bulten`'e (404) yönlendiriyordu → **çıplak giriş slug'dan önce** sıralandı (`$`-anchor'lı bare = gerçek spesifik). `tests/seo-redirects.test.ts` **eklendi** (Vitest node): çıplak+twin varlığı+308, twin regex tüm non-default locale'leri eşler (`routing.locales` tek kaynak), efektif ilk-eşleşen hedef, "çıplak /forum slug'a düşmez" sıra mührü; manifest yoksa açık hata. **Kanıt:** `npm run test` 5 dosya/**39 test** ✅ (+16); `next build` temiz (0 hata/0 `MISSING_MESSAGE`); `routes-manifest.json` — 6 uygulama redirect'i (internal hariç) hepsi 308, regex ground-truth doğrulandı. **Sınır korundu:** içerik/DOM/route path değişmedi; `/bulten` index oluşturulmadı (kapsam dışı). DECISIONS'a `/forum`→`/` + sıra tuzağı kararı, memory `next-config-redirect-locale-prefix`'e sıra tuzağı + gap kapanışı eklendi. **Sıradaki DevFlow komutu: `verify-phase 13` (UAT).**
