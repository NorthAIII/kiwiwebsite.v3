# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **discuss-phase 14 ✅: Faz 14 (v0.3 versiyon-sonu senaryo testi) girildi; Kapsam Tartışması PHASE-14'e yazıldı.** Kapsam ana sayfa + 5 alt sayfa uçtan-uca (S1–S9, Faz 9'dan v0.3 deltasına uyarlandı — `/crew-os` route rename + Living Flow sayfa-boyu nabız + SEO metadata katmanı + logo); TR birincil + non-TR tutarlılık; chatbot 0-token (dokunulmadı, bütünsellik için korundu); keşfet+kaydet+triyaj; otonom. Versiyon Sonu Durumu `senaryo_testi` (değişmez). Sıradaki adım **`research-phase 14`**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** research (discuss-phase 14 tamamlandı — Kapsam Tartışması PHASE-14'e yazıldı; sıradaki = teknik araştırma). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** discuss-phase 14 (2026-07-03) ✅ — Faz 14 girildi (senaryo testi): kapsam ana sayfa + 5 alt sayfa uçtan-uca (S1–S9, v0.3 deltasına uyarlandı — `/crew-os` route + sayfa-boyu nabız + SEO metadata + logo), TR birincil + non-TR tutarlılık, chatbot 0-token, keşfet+kaydet+triyaj, otonom. Ortam riski kaydı: bu devcontainer'da `next start` öldürülebilir (Faz 13) → S3 runtime-tarayıcı katmanı metodoloji riski, research-phase araç eşlemesinde çözülür. **Kayıtlı sahipli açıklar (gelecek/prd-review):** TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam Tartışması yazıldı; research/plan bekliyor). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Faz 14 (senaryo testi) girildi (discuss-phase 14 ✅). Task listesi henüz boş → plan-phase 14'te dolar. Sıradaki adım task değil **`research-phase 14`** (senaryo testi metodolojisi araştırması).
**Durum:** Faz 14 🔄 (Kapsam Tartışması yazıldı); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Adım = research.
**İlerleme:** discuss-phase 14 (2026-07-03) ✅ — kapsam ana sayfa + 5 alt sayfa uçtan-uca (S1–S9, v0.3 deltasına uyarlandı), TR birincil + non-TR tutarlılık, chatbot 0-token, otonom. Sıradaki = `research-phase 14`.

---

## Task Durumu (Aktif Faz)

> **Faz 14 girildi (discuss ✅)** — senaryo testi fazı; S1–S9 kataloğu Kapsam Tartışması'nda (`phases/PHASE-14.md`). Task listesi `plan-phase 14`'te dolar. Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Faz 14 task listesi plan-phase 14'te doldurulacak (S1–S9 senaryo grupları → araç eşlemesi) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`). Faz 14'ün ilk task'ı bitince buraya eklenir.

_(Faz 14 henüz task üretmedi — senaryo testi fazı kaynak değiştirmeyebilir; ilk task/senaryo sonucu buraya eklenir.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Faz 14 🔄 (discuss-phase 14 ✅ — Kapsam Tartışması yazıldı). Task listesi plan-phase'de dolar. Sıradaki adım **`research-phase 14`**. Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). **Faz 13 ✅** — SEO-metadata hijyeni: TB-1 self-canonical + 5-locale hreflang (+x-default) + TB-2 `/forum`→`/` config redirect denetimi; UAT 16/16 + 8 kalite ekseni ✅. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `research-phase 14`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **discuss-phase 14: Faz 14 (v0.3 versiyon-sonu senaryo testi) girildi** (yalnız doküman: PHASE-14 Genel Bilgiler + Kapsam Tartışması; PHASES tabloya 🔄 + geçiş notu; DURUM). **Adım 0b** (Versiyon Sonu Durumu zaten `senaryo_testi`, review-phase 13 damgaladı). **Kapsam kararları:** ana sayfa + 5 alt sayfa uçtan-uca (Faz 9 çıtası korunur — v0.3'ün iki çapraz yüzeyi: `/crew-os` route rename + Living Flow sayfa-boyu nabız → dar-kapsam yakalayamaz); S1–S9 kataloğu Faz 9'dan v0.3 deltasına uyarlandı (crew-os giriş matrisi + sayfa-boyu nabız degradasyonu + SEO metadata katmanı + logo); TR birincil + non-TR tutarlılık; chatbot 0-token (v0.3 dokunmadı, bütünsellik için korundu); keşfet+kaydet+triyaj; otonom. **Ortam riski kaydı:** bu devcontainer'da `next start` öldürülebilir (Faz 13) → S3 runtime-tarayıcı katmanı metodoloji riski, research-phase araç eşlemesinde çözülür. Kayıtlı açıklar (TB-3/4/5) + B grubu → prd-review. **Sıradaki DevFlow komutu: `research-phase 14`.**
