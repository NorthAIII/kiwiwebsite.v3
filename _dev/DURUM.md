# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **verify-plan 13 ✅: 4 task dokümanı fresh-context review edildi, sorun bulunamadı.** Referans gerçeklik-kontrolü 10/10 tutarlı (layout `alternates` var · page.tsx `generateMetadata` yok · 5 alt sayfa title/desc-only + `locale` scope'ta · sitemap `/en/` drift teyitli · `/bulten` index yok · `/forum` klasörü yok · next.config redirect'ler · CI build→test sırası). Milestone/kalite/tutarlılık kontrolleri temiz; mekanik/yapısal düzeltme gerekmedi. Sıradaki adım **`run-task` → TASK-13.01** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 13 — **v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni)** 🔄 (discuss-phase 13 damgaladı). **Faz 12 ✅** (B1 Living Flow nabız kapsamı). Faz 11 ✅ (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (verify-plan 13 ✅ — plan review sorunsuz; sıradaki `run-task` → TASK-13.01; Versiyon Sonu Durumu = `teknik_borç`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** plan-phase 13 (2026-07-03) ✅ — 4 task dokümanı oluşturuldu (`tasks/TASK-13.0{1..4}.md`), PHASE-13 Task Listesi + tablo güncellendi. **TB-1** → 13.01 (helper `localizedAlternates` + locale-path util + sitemap refactor + Vitest node unit testi) → 13.02 (5 alt sayfa self-canonical/5-dil hreflang/x-default wiring) → 13.03 (alternates layout→ana sayfa taşıma, fail-safe: layout artık canonical miras ettirmez). Sıra 13.02→13.03 regresyon penceresi bırakmaz. **TB-2** → 13.04 (`/forum`→`/` + `/forum/:slug*`→`/bulten/:slug*` locale-twin'ler + tüm config redirect denetimi + `routes-manifest.json` redirect regresyon tohumu). Yeni bağımlılık yok; içerik/DOM/route path değişmez; `next.config.ts` yalnız `redirects()` bloğu (faz-onaylı). **Kapsam-dışı/kayıtlı sahipli açıklar:** **TB-3 full-motion tohumu (WebGL flaky, gelecek faz)**, **TB-4 site-geneli logical-ok (RTL)**, **TB-5 npm audit (next downgrade breaking)**, B grubu → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-13.md` (🔄 Devam ediyor — Kapsam Tartışması + Araştırma Bulguları + Task Listesi (4 task) yazıldı; verify-plan bekliyor). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** teknik_borç

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-13.01 (sıradaki icra; ⬜ Bekliyor). verify-plan 13 ✅ — 4 task fresh-context review'dan sorunsuz geçti. Task icrası `run-task` ile (yeni oturum).
**Durum:** Faz 13 🔄 → Adım **task**. Versiyon Sonu Durumu = `teknik_borç`; Aktif Versiyon v0.3.
**İlerleme:** verify-plan 13 (2026-07-03) ✅ — referans gerçeklik-kontrolü 10/10 tutarlı, milestone/kalite/task-tutarlılığı temiz; mekanik/yapısal düzeltme gerekmedi. Sıradaki = `run-task` → TASK-13.01.

---

## Task Durumu (Aktif Faz)

> **Faz 13 🔄** — plan yazıldı (`phases/PHASE-13.md` → Task Listesi). Task'lar `verify-plan 13` sonrası `run-task` ile sırayla çalışılır. Faz 4–12 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 13.01 | TASK-13.01 | ⬜ Bekliyor | Ortak `localizedAlternates` helper + locale-path util + sitemap refactor + helper unit testi (TB-1) |
| 13.02 | TASK-13.02 | ⬜ Bekliyor | 5 alt sayfaya self-canonical + 5-locale hreflang alternates (TB-1) |
| 13.03 | TASK-13.03 | ⬜ Bekliyor | alternates layout→ana sayfa taşıma (fail-safe default) (TB-1) |
| 13.04 | TASK-13.04 | ⬜ Bekliyor | `/forum` locale-gap + config redirect denetimi + redirect regresyon tohumu (TB-2) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 12 kapandı → Faz 12 task özetleri sıfırlandı** (detaylar `phases/PHASE-12.md` + `tasks/archive/`). Faz 13'ün ilk task'ı bitince buraya eklenir.

_(Henüz yok — Faz 13 task'ları çalışılmadı.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-13.01 sıradaki icra (⬜ Bekliyor). verify-plan 13 ✅ (plan review sorunsuz). Sıradaki adım **`run-task`** → TASK-13.01 (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **13 🔄** — v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni): TB-1 alt-sayfa self-canonical + 5-locale hreflang alternates (+x-default) + TB-2 `/forum` locale gap + tüm config redirect denetimi (`/forum`→`/`) + hafif regresyon tohumu. Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **teknik_borç** → sıradaki komut `verify-plan 13`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **verify-plan 13 ✅: 4 task dokümanı temiz-context ile review edildi, sorun bulunamadı** (mekanik düzeltme: 0 · yapısal değişiklik: 0). **Referans gerçeklik-kontrolü 10/10 tutarlı:** `layout.tsx` `alternates` bloğu var (canonical `tr?"/":"/${locale}"` + languages 5 dil, 13.03 tarifiyle birebir) · `[locale]/page.tsx` `generateMetadata` **yok** (13.03 varsayımı doğru) · 5 alt sayfa `generateMetadata` yalnız title/desc + `const { locale } = await params` scope'ta (13.02 çağrısı geçerli) · `sitemap.ts` `${prefix}${path||"/"}` → non-TR home `/en/` drift teyitli (13.01 normalizasyon gerekçesi doğru) · `src/i18n/metadata.ts` yok (`YENİ`) · `/bulten` index yok+2 makale (`/forum`→`/` kararının kökü) · `/forum` klasörü yok · `next.config.ts` redirect denetim tablosu doğru · `tests/`+`npm run test`=`vitest run` node · **CI fast job `npm ci→build→test`** → 13.04 `routes-manifest.json` build-bağımlılığı karşılanıyor. Milestone kapsamı tam (13.02 alt-sayfa canonical · 13.03 home self-canonical + fail-safe · 13.04 forum+config redirect · tohum 13.01 helper unit + 13.04 manifest assertion) · task boyutları/bağımlılık zinciri (13.01→13.02→13.03, 13.04 bağımsız) sağlam · template/kalite temiz. Not (non-blocking): 13.03/13.04'te DECISIONS kaydı "opsiyonel" — fail-safe canonical mimarisi + `/forum`→`/` kararı DECISIONS'a değer (icra oturumunda değerlendirilir). **Sıradaki DevFlow komutu: `run-task` → TASK-13.01.**
