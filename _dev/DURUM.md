# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **discuss-phase 11 tamamlandı:** Faz 11 = **v0.3 URL taksonomisi/SEO** (`/bunker-os`→`/crew-os` route rename + kalıcı redirect 5 locale + i18n namespace `bunkerOs`/`bunker`→crew 5-dil rename + sitemap/canonical/alternates + iç linkler). `/forum`→404 **reddedildi** (mevcut `/forum`→`/bulten` 301 çalışıyor, bozmak için gerekçe yok — korunur); kod dosya adları iç-ad kalır (taksonomi izin veriyor). Kapsam PHASE-11'e yazıldı, MODULE-MAP'e SEO1-3 (🔄), PHASES tabloya 🔄 + mezuniyet. Sıradaki DevFlow komutu: **`research-phase 11`** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 11 — **v0.3 URL taksonomisi / SEO** (`/bunker-os`→`/crew-os`). Kapsam: route rename + kalıcı redirect (5 locale) + i18n namespace `bunkerOs`/`bunker`→crew 5-dil rename + sitemap/canonical/alternates + iç linkler temiz. `/forum`→404 reddedildi (mevcut 301 korunur); kod dosya adları iç-ad kalır. **Faz 10 ✅ Tamamlandı** (v0.3 görsel cila — A1 logo + A3a/A3b). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** research (discuss-phase 11 ✅ → sıradaki `research-phase 11`; Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** discuss-phase 11 (2026-07-02) ✅ — Faz 11 kapsamı damgalandı: SEO1 route rename+redirect · SEO2 namespace rename · SEO3 iç link (MODULE-MAP 🔄, PHASES tabloya 🔄). Üç karar: /forum→404 reddedildi (redirect korunur), rename kapsamı=route+namespace (kod adı değil), tek faz. **Sahipli açıklar (record, faz-dışı):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), brief mobil perf (gerçek-cihaz duvarı), B1 Living Flow nabız (v0.3, ayrı gate'li faz), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-11.md` (🔄 Kapsam Tartışması yazıldı; araştırma/plan/UAT bekliyor). Faz 10 ✅ `phases/PHASE-10.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Aktif task **yok** — Faz 11 kapsamı damgalandı, henüz planlanmadı (task yazımı plan-phase'de). Sıradaki adım teknik araştırma (`research-phase 11`), ayrı oturumda.
**Durum:** Faz 11 🔄 → Adım **research**. Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** discuss-phase 11 (2026-07-02) ✅ — kapsam tartışması tamam (SEO1-3, üç karar damgalandı). Sıradaki = `research-phase 11`.

---

## Task Durumu (Aktif Faz)

> Faz 11 (v0.3 URL taksonomisi/SEO) kapsamı damgalandı, **task'ları henüz yazılmadı** — plan-phase 11 bekliyor. Task tablosu plan sonrası dolar. Faz 10 ✅ (10.01–10.04, detay `phases/PHASE-10.md`); Faz 4–9 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | _(Faz 11 task'ları planlanmadı)_ | — | discuss ✅; research-phase 11 → plan-phase 11 task'ları yazar (SEO1-3) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 10 task özetleri sıfırlandı** (Faz 10 detayları `phases/PHASE-10.md` + `tasks/archive/`).

_(Faz 11 henüz başlamadı — task özeti yok. İlk task tamamlanınca buraya eklenir.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Aktif task **yok** — Faz 11 kapsamı damgalandı, task'ları henüz yazılmadı. Sıradaki adım **research-phase 11** (teknik araştırma, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 11 🔄 — v0.3 URL taksonomisi/SEO (`/bunker-os`→`/crew-os` rename + redirect + namespace 5-dil + SEO metadata + iç link). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `research-phase 11`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-02 — **discuss-phase 11 ✅:** Faz 11 = v0.3 URL taksonomisi/SEO (`/bunker-os`→`/crew-os` route rename + kalıcı redirect 5 locale + i18n namespace `bunkerOs`/`bunker`→crew 5-dil rename + sitemap/canonical/alternates + iç linkler). Üç karar: `/forum`→404 reddedildi (301 korunur), rename kapsamı=route+namespace (kod adı değil), tek faz. Kapsam PHASE-11'e, SEO1-3 MODULE-MAP'e 🔄, PHASES tabloya 🔄 + mezuniyet. Versiyon Sonu Durumu `içerik_fazları` (değişmez) → sıradaki DevFlow komutu: **`research-phase 11`**.
