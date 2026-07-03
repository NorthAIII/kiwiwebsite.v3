# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **research-phase 13 ✅: Faz 13 teknik araştırma tamam.** TB-1 kök teyitli: alt sayfalar `alternates` set etmiyor → layout `canonical="/"`'ını sığ-merge ile miras alıyor; çözüm ortak `localizedAlternates` helper + alternates layout→sayfalara (fail-safe). TB-2 denetim: `/forum`+`/forum/:slug*` locale-twin'siz; **beklenmedik bulgu** `/bulten` index 404 → **kullanıcı kararı `/forum`→`/`**; x-default eklenir. Regresyon tohumu = Vitest node (helper unit + routes-manifest assertion). Sıradaki adım **`plan-phase 13`**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 13 — **v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni)** 🔄 (discuss-phase 13 damgaladı). **Faz 12 ✅** (B1 Living Flow nabız kapsamı). Faz 11 ✅ (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** plan (research-phase 13 teknik araştırma tamam → sıradaki `plan-phase 13`; Versiyon Sonu Durumu = `teknik_borç`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** research-phase 13 (2026-07-03) ✅ — Araştırma Bulguları yazıldı (`phases/PHASE-13.md`). **TB-1** çözümü: ortak `localizedAlternates(locale, path)` helper (canonical + 5-dil languages + x-default), `alternates` layout'tan sayfalara taşınır (fail-safe: unutulursa canonical yok = zararsız). **TB-2** çözümü: iki-giriş deseni `/forum`+`/forum/:slug*`'a; denetimde **beklenmedik bulgu** `/bulten` index 404 → **kullanıcı kararı `/forum`→`/`** (`/forum/:slug*`→`/bulten/:slug*` geçerli). **x-default eklenir** (kullanıcı kararı). Regresyon tohumu = Vitest node (helper unit + `routes-manifest.json` locale-kapsam assertion, WebGL-flaky değil). Yeni bağımlılık yok. **Kapsam-dışı/kayıtlı sahipli açıklar:** **TB-3 full-motion tohumu (WebGL flaky, gelecek faz)**, **TB-4 site-geneli logical-ok (RTL)**, **TB-5 npm audit (next downgrade breaking)**, B grubu → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-13.md` (🔄 Devam ediyor — Kapsam Tartışması + Araştırma Bulguları yazıldı; plan bekliyor). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** teknik_borç

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — (Faz 13 kapsamı + araştırması tamam; task'lar `plan-phase 13`'te oluşturulacak). Sıradaki adım **`plan-phase 13`** (task yazımı — yeni oturum).
**Durum:** Faz 13 🔄 → Adım **plan**. Versiyon Sonu Durumu = `teknik_borç`; Aktif Versiyon v0.3.
**İlerleme:** research-phase 13 (2026-07-03) ✅ — Araştırma Bulguları yazıldı (TB-1 ortak helper + alternates layout→sayfalara fail-safe; TB-2 iki-giriş deseni + `/forum`→`/` kararı [`/bulten` 404 bulgusu]; x-default; Vitest node tohum). Sıradaki = `plan-phase 13`.

---

## Task Durumu (Aktif Faz)

> **Faz 13 🔄 girildi** — kapsam tartışması tamam (`phases/PHASE-13.md` → Kapsam Tartışması). Task'lar `plan-phase 13`'te oluşturulur (research-phase 13 sonrası). Faz 4–12 ✅.

_(Aktif task yok — faz planlaması research-phase 13 → plan-phase 13'te.)_

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

**Aktif Task:** Aktif task yok (Faz 13 🔄 kapsam + araştırma tamam; task'lar plan-phase 13'te). Sıradaki adım **plan-phase 13** (task yazımı, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **13 🔄** — v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni): TB-1 alt-sayfa self-canonical + 5-locale hreflang alternates (+x-default) + TB-2 `/forum` locale gap + tüm config redirect denetimi (`/forum`→`/`) + hafif regresyon tohumu. Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **teknik_borç** → sıradaki komut `plan-phase 13`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **research-phase 13 ✅: Faz 13 teknik araştırma tamam** (`phases/PHASE-13.md` → Araştırma Bulguları). Kod tabanı incelendi (layout + 5 alt-sayfa `generateMetadata`, next.config redirects, sitemap/robots/routing). **TB-1 kök teyitli:** alt sayfalar `alternates` set etmiyor → Next.js sığ-merge ile layout'un `canonical="/"`'ını miras alıyor (her alt sayfa ana sayfaya canonicalize). **Çözüm:** ortak `localizedAlternates(locale, path)` helper (canonical + 5-dil languages + x-default) + `alternates` layout'tan sayfalara taşınır (**fail-safe:** unutulan sayfada canonical yok = zararsız, layout'ta kalsa yanlış `/` = zararlı); locale→prefix eşlemesi sitemap.ts ile ortak util. **TB-2 denetim:** `/forum`+`/forum/:slug*` locale-twin'siz (gap); iki-giriş deseni (`/bunker-os` emsali) uygulanır. **Beklenmedik bulgu:** `/bulten` index sayfası yok → `/forum`→`/bulten` 404'e iniyor → **kullanıcı kararı `/forum`→`/`** (`/forum/:slug*`→`/bulten/:slug*` geçerli, korunur). **x-default eklenir** (→ TR prefixsiz, kullanıcı kararı). **Regresyon tohumu:** Vitest node — helper unit testi + `routes-manifest.json` redirect locale-kapsam assertion (WebGL/flaky değil). Yeni bağımlılık yok; içerik/DOM/route değişmez. **Sıradaki DevFlow komutu: `plan-phase 13`.**
