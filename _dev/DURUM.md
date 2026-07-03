# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **research-phase 12 tamamlandı: teknik araştırma yazıldı** (B1 Living Flow nabız aşağı-taşıma). Seçilen teknik biçim: **tek fixed viewport canvas + parallax** (Yaklaşım C — belge-boyu canvas A ve bölüm-başı instance B elendi: perf/context/dikiş); Hero alanı sayfa-seviyesi `fixed` katmana taşınır (görsel birebir aynı, TK2); bölüme-uyarlanan opaklık = adaptif scrim (canvas değil, TK3); yeni paket/i18n anahtarı yok. Perf artımlı-sıfır **hipotez** → desktop perf 100/CLS 0 gate plan/task'ta Lighthouse ile doğrulanır. Bulgular PHASE-12 "Araştırma Bulguları"na (3636 token, bölme gerekmedi). **Sıradaki adım: `plan-phase 12`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 12 🔄 (**B1 Living Flow nabız kapsamı** — karar-gate'li, imza-riskli) — discuss-phase 12 ile girildi; kapsam damgalandı. **Faz 11 ✅** (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** plan (research-phase 12 ✅ → sıradaki `plan-phase 12`; v0.3 içerik fazı, Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** research-phase 12 (2026-07-03) ✅ — teknik biçim seçildi: **tek fixed viewport canvas + parallax (C)**; Hero alanı sayfa-seviyesi fixed katmana taşınır (görsel aynı, TK2); bölüme-uyarlanan opaklık = adaptif scrim (TK3); yeni paket/i18n yok. Perf artımlı-sıfır hipotez, desktop perf 100/CLS 0 gate plan/task'ta ölçülür. discuss-phase 12 (2026-07-02) ✅ — kapsam: kontrollü aşağı-taşıma / desktop-öncelik (mobil Hero-only/statik) / karar-gate (kontrast=100/perf/craft korunamıyorsa iptal-kaydet). **Sahipli açıklar (record, faz-dışı):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), **alt-sayfa canonical=`/` (layout miras, latent SEO, gelecek faz)**, **`/forum` locale-prefix gap (`/en/forum`→404, gelecek faz)**, brief mobil perf (gerçek-cihaz duvarı), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-12.md` (🔄 Devam ediyor — Kapsam Tartışması yazıldı). Faz 11 ✅ `phases/PHASE-11.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — Faz 12 araştırması tamamlandı; henüz task yok (plan-phase 12'de oluşur). Sıradaki adım `plan-phase 12`.
**Durum:** Faz 12 🔄 → Adım **plan** (task yazımı). Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** research-phase 12 (2026-07-03) ✅ — teknik biçim: tek fixed viewport canvas + parallax (C); Hero fixed-katman taşıma (TK2); adaptif scrim opaklık (TK3); perf gate plan/task'ta ölçülür. Sıradaki = `plan-phase 12`.

---

## Task Durumu (Aktif Faz)

> **Faz 12 🔄 girildi** (B1 Living Flow nabız kapsamı) — kapsam tartışması tamam; task'lar `plan-phase 12` sonrası oluşur. Faz 11 ✅ detayı → `phases/PHASE-11.md` + `tasks/archive/`. Faz 4–11 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Faz 12 task'ları henüz yok (research-phase → plan-phase 12 üretir) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 11 task özetleri sıfırlandı** (Faz 11 detayları `phases/PHASE-11.md` + `tasks/archive/`).

_(Faz 12 task'ı henüz çalışmadı — task özeti yok. İlk task tamamlanınca burası dolar.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Faz 12 🔄 araştırma tamam; task yok. Sıradaki adım **plan-phase 12** (B1 Living Flow nabız — task yazımı; yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 12 🔄 — v0.3 Living Flow nabız kapsamı (B1, karar-gate'li): kontrollü aşağı-taşıma / sürekli soluk iplik / desktop-öncelik / bölüme-uyarlanan opaklık. **Teknik biçim seçildi:** tek fixed viewport canvas + parallax (C). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `plan-phase 12`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **research-phase 12 ✅: teknik araştırma tamamlandı** (B1 Living Flow nabız aşağı-taşıma). Değerlendirilen 3 yaklaşım (A belge-boyu canvas / B bölüm-başı instance / C fixed viewport canvas + parallax) → **Seçilen C**: tek WebGL context, viewport-boyu sınırlı backing store, en güçlü "tek bütün alan" sürekliliği, mevcut FlowCanvas yeniden kullanımı (yeni paket yok). Teknik kararlar: TK2 Hero alanı sayfa-seviyesi fixed katmana taşınır (görsel birebir aynı); TK3 bölüme-uyarlanan opaklık = adaptif scrim (FlowScrim deseni), canvas değil; TK4 yeni bağımlılık/i18n anahtarı yok. Perf artımlı-sıfır **hipotez** (canvas zaten frameloop=always render ediyor) → desktop perf 100/CLS 0 gate plan/task'ta Lighthouse ile ölçülür. a11y kontrast=100 adaptif scrim ile korunur (aria-hidden muafiyet değil — memory). Bulgular PHASE-12'ye (3636 token, bölme gerekmedi). DECISIONS'a şimdi eklenmedi (gate'e bağlı, outcome review-phase'de). **Sıradaki DevFlow komutu: `plan-phase 12`.**
