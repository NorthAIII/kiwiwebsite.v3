# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **discuss-phase 13 ✅: Faz 13 (v0.3 versiyon-sonu teknik borç — SEO-metadata hijyeni) girildi.** Versiyon Sonu Durumu `içerik_fazları`→`teknik_borç` damgalandı; kapsam TB-1 (alt-sayfa self-canonical + 5-locale hreflang alternates) + TB-2 (`/forum` locale gap + **tüm** config redirect denetimi) + hafif regresyon tohumu (WebGL-flaky değil). TB-3/TB-4/TB-5 kayıtlı sahipli açık; B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review. Sıradaki adım **`research-phase 13`**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 13 — **v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni)** 🔄 (discuss-phase 13 damgaladı). **Faz 12 ✅** (B1 Living Flow nabız kapsamı). Faz 11 ✅ (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** research (discuss-phase 13 kapsam tartışması tamam → sıradaki `research-phase 13`; Versiyon Sonu Durumu = `teknik_borç`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** discuss-phase 13 (2026-07-03) ✅ — Faz 13 kapsamı damgalandı: **TB-1** (alt-sayfa self-canonical + 5-locale hreflang alternates, kalıcılık) + **TB-2** (`/forum` locale gap + tüm config redirect denetimi, kök çözüm) + hafif regresyon tohumu (metadata/routes-manifest assertion, WebGL-flaky değil). **Kapsam-dışı/kayıtlı sahipli açıklar:** **TB-3 fixed-backdrop full-motion invariant tohumu (WebGL flaky, gelecek faz)**, **TB-4 site-geneli logical-ok (RTL, geniş yüzey)**, **TB-5 npm audit (3 moderate, next downgrade breaking)**, non-TR alt-sayfa stale + AR/dil-seti stratejisi + brief mobil perf (**B grubu → prd-review**).
**Son Faz Dokümanı:** `phases/PHASE-13.md` (🔄 Devam ediyor — Kapsam Tartışması yazıldı; research/plan bekliyor). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** teknik_borç

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — (Faz 13 girildi, kapsam tartışıldı; task'lar `plan-phase 13`'te oluşturulacak). Sıradaki adım **`research-phase 13`** (teknik araştırma — yeni oturum).
**Durum:** Faz 13 🔄 → Adım **research**. Versiyon Sonu Durumu = `teknik_borç`; Aktif Versiyon v0.3.
**İlerleme:** discuss-phase 13 (2026-07-03) ✅ — kapsam damgalandı (TB-1 canonical+alternates + TB-2 `/forum` gap + tüm redirect denetimi + hafif tohum). Sıradaki = `research-phase 13`.

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

**Aktif Task:** Aktif task yok (Faz 13 🔄 girildi, kapsam tartışıldı; task'lar plan-phase 13'te). Sıradaki adım **research-phase 13** (teknik araştırma, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **13 🔄** — v0.3 versiyon-sonu teknik borç (SEO-metadata hijyeni): TB-1 alt-sayfa self-canonical + 5-locale hreflang alternates + TB-2 `/forum` locale gap + tüm config redirect denetimi + hafif regresyon tohumu. Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **teknik_borç** → sıradaki komut `research-phase 13`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **discuss-phase 13 ✅: Faz 13 (v0.3 versiyon-sonu teknik borç — SEO-metadata hijyeni) girildi.** Adım 0 versiyon-sonu tespiti: v0.3 içerik fazları (10/11/12) ✅ + Aktif Faz/Adım dolu → Versiyon Sonu Durumu `içerik_fazları`→`teknik_borç` damgalandı. v0.3 fazlarının retrospektifleri + kayıtlı sahipli açıklar sistematik tarandı; kullanıcı "borç listesi tam" onayı verdi. **Kapsam (kullanıcı kararı):** TB-1 alt-sayfa self-canonical + 5-locale hreflang alternates (kalıcılık — tam SEO, yarım değil) + TB-2 `/forum` locale gap düzelt + **tüm** config redirect'leri locale-gap için denetle (kök çözüm) + hafif regresyon tohumu (metadata/routes-manifest assertion, WebGL-flaky değil, kümülatif test). **Kapsam-dışı/kayıtlı:** TB-3 (full-motion tohumu, WebGL flaky) · TB-4 (logical-ok RTL, geniş yüzey) · TB-5 (npm audit, next downgrade breaking); **B grubu → prd-review** (non-TR tazelik / AR-dil stratejisi / brief mobil perf — strateji/ölçüm, kod borç değil). Faz dokümanı `phases/PHASE-13.md` (Kapsam Tartışması yazıldı). **Sıradaki DevFlow komutu: `research-phase 13`.**
