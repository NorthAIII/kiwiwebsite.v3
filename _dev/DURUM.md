# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **plan-phase 12 tamamlandı: 3 task dokümanı oluşturuldu** (B1 Living Flow nabız aşağı-taşıma). **12.01** fixed viewport katman + Hero koordinasyon (TK1/TK2 — tek WebGL context, Hero görsel aynı, mobil/fallback aynen; yeni `FlowBackdrop.tsx` + `LivingFlow.tsx` + `page.tsx`). **12.02** bölüme-uyarlanan adaptif scrim (TK3 — metin her zaman kazanır; global veil öneri, dosya yüzeyi minimum). **12.03** karar-gate (kontrast=100 full-motion + desktop perf 100/CLS 0 + craft → uygula VEYA iptal-kaydet, DECISIONS). Sıra = bağımlılık sırası. Detaylı doğrulama verify-plan'da. **Sıradaki adım: `verify-plan 12`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 12 🔄 (**B1 Living Flow nabız kapsamı** — karar-gate'li, imza-riskli) — discuss-phase 12 ile girildi; kapsam damgalandı. **Faz 11 ✅** (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** verify-plan (plan-phase 12 ✅ → sıradaki `verify-plan 12`; v0.3 içerik fazı, Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** plan-phase 12 (2026-07-03) ✅ — 3 task: 12.01 fixed katman + Hero koordinasyon / 12.02 adaptif scrim / 12.03 karar-gate. research-phase 12 (2026-07-03) ✅ — teknik biçim: tek fixed viewport canvas + parallax (C); Hero fixed-katman taşıma (TK2); adaptif scrim (TK3); yeni paket/i18n yok; perf gate 12.03'te ölçülür. discuss-phase 12 (2026-07-02) ✅ — kapsam: kontrollü aşağı-taşıma / desktop-öncelik (mobil Hero-only/statik) / karar-gate (kontrast=100/perf/craft korunamıyorsa iptal-kaydet). **Sahipli açıklar (record, faz-dışı):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), **alt-sayfa canonical=`/` (layout miras, latent SEO, gelecek faz)**, **`/forum` locale-prefix gap (`/en/forum`→404, gelecek faz)**, brief mobil perf (gerçek-cihaz duvarı), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
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

**Task:** — Faz 12 planı yazıldı (3 task: 12.01/12.02/12.03); henüz task çalışmadı. Sıradaki adım `verify-plan 12` (plan review), ardından `run-task 12.01`.
**Durum:** Faz 12 🔄 → Adım **verify-plan** (plan doğrulama). Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** plan-phase 12 (2026-07-03) ✅ — 3 task (yapısal aşağı-taşıma → adaptif scrim → karar-gate). Sıradaki = `verify-plan 12`.

---

## Task Durumu (Aktif Faz)

> **Faz 12 🔄** (B1 Living Flow nabız kapsamı) — plan yazıldı (3 task); `verify-plan 12` sonrası `run-task` başlar. Faz 11 ✅ detayı → `phases/PHASE-11.md` + `tasks/archive/`. Faz 4–11 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 12.01 | TASK-12.01 | ⬜ Bekliyor | Fixed viewport katman + Hero koordinasyon (TK1/TK2) |
| 12.02 | TASK-12.02 | ⬜ Bekliyor | Bölüme-uyarlanan adaptif scrim (TK3, kontrast korunur) |
| 12.03 | TASK-12.03 | ⬜ Bekliyor | Karar-gate: kontrast=100 + desktop perf 100/CLS 0 + craft → uygula/iptal-kaydet |

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

**Aktif Task:** Faz 12 🔄 plan yazıldı (12.01/12.02/12.03); task çalışmadı. Sıradaki adım **verify-plan 12** (plan review; yeni oturum), ardından run-task 12.01. Açık takip: chatbot canlı env key.
**Aktif Faz:** 12 🔄 — v0.3 Living Flow nabız kapsamı (B1, karar-gate'li): kontrollü aşağı-taşıma / sürekli soluk iplik / desktop-öncelik / bölüme-uyarlanan opaklık. **Teknik biçim:** tek fixed viewport canvas + parallax (C); plan = 3 task (fixed katman → adaptif scrim → karar-gate). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `verify-plan 12`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **plan-phase 12 ✅: 3 task dokümanı oluşturuldu** (B1 Living Flow nabız aşağı-taşıma). **12.01** Fixed viewport Living Flow katmanı + Hero koordinasyon (TK1/TK2): desktop-high-power'da alan sayfa-seviyesi `fixed` katmana taşınır (yeni `FlowBackdrop.tsx`), Hero WebGL çift-render'ı önlenir (tek context; `LivingFlow.tsx` suppress + `page.tsx` mount), Hero görsel birebir aynı, mobil/reduced/no-WebGL fallback aynen. **12.02** Bölüme-uyarlanan adaptif scrim (TK3): metin-yoğun bölümde alan soluk / nefes alan bölümde görünür / opak bölümler (Footer+Bunker paneli `bg-ink`) doğal örter; metin her zaman kazanır; öneri global veil (dosya yüzeyi minimum). **12.03** Karar-gate: kontrast=100 çift-tema (**full-motion** — reduced-motion tohumu alanı gizler, ölçmez) + desktop perf 100/CLS 0 (taban `home-desktop-20260628` regresyonsuz) + craft son hakem → **uygula-onayla VEYA iptal-kaydet** (DECISIONS + perf artefaktı). Mimari temel: `body` opak canvas → fixed alan gövde bg üstünde/içerik altında; `bg-canvas-deep/40` bölümler geçirir, opak örter. Yeni paket/i18n yok (TK4). Sıra = bağımlılık sırası; detaylı doğrulama verify-plan'da. **Sıradaki DevFlow komutu: `verify-plan 12`.**
