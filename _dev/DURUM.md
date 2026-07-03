# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **run-task 12.01 ✅: fixed viewport Living Flow katmanı + Hero koordinasyon uygulandı.** Paylaşılan `useFlowMode` hook (YENİ) + `FlowBackdrop` (YENİ) → `high` modda alan sayfa-seviyesi `fixed z-0` katmanda, Hero `high`'da canvas mount etmez → **tek WebGL context** (Chrome+SwiftShader script: desktop tek fixed canvas/scroll'da kalıcı · mobil hero-contained+backdrop yok · reduced-motion 0 canvas+StaticFlow → ALL PASS). `page.tsx` main/Footer `relative z-10`. Build temiz (7.6s, 0 hata); a11y tohumu 2 passed (regresyonsuz). **Sıradaki adım: `run-task 12.02`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 12 🔄 (**B1 Living Flow nabız kapsamı** — karar-gate'li, imza-riskli) — discuss-phase 12 ile girildi; kapsam damgalandı. **Faz 11 ✅** (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (12.01 ✅ → sıradaki `run-task 12.02`; v0.3 içerik fazı, Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** run-task 12.01 (2026-07-03) ✅ — `useFlowMode` hook + `FlowBackdrop` (fixed z-0 katman, yalnız `high`); Hero `high`'da canvas suppress → tek WebGL context (runtime script ALL PASS); build temiz, a11y regresyonsuz. plan-phase 12 (2026-07-03) ✅ — 3 task: 12.01 fixed katman / 12.02 adaptif scrim / 12.03 karar-gate. research-phase 12 (2026-07-03) ✅ — tek fixed viewport canvas + parallax (C); yeni paket/i18n yok; perf gate 12.03'te. discuss-phase 12 (2026-07-02) ✅ — kontrollü aşağı-taşıma / desktop-öncelik / karar-gate. **Sahipli açıklar (record, faz-dışı):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), **alt-sayfa canonical=`/` (layout miras, latent SEO, gelecek faz)**, **`/forum` locale-prefix gap (`/en/forum`→404, gelecek faz)**, brief mobil perf (gerçek-cihaz duvarı), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-12.md` (🔄 Devam ediyor — 12.01 ✅, 12.02/12.03 bekliyor). Faz 11 ✅ `phases/PHASE-11.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-12.02 (⬜ Bekliyor — aktif) — Bölüme-uyarlanan adaptif scrim (TK3, kontrast korunur). 12.01 ✅ (fixed katman kuruldu); `run-task 12.02` ile başlanır.
**Durum:** Faz 12 🔄 → Adım **task** (12.01 ✅). Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** run-task 12.01 (2026-07-03) ✅ — fixed viewport backdrop + tek WebGL context (runtime ALL PASS), build temiz, a11y regresyonsuz. Sıradaki = `run-task 12.02`.

---

## Task Durumu (Aktif Faz)

> **Faz 12 🔄** (B1 Living Flow nabız kapsamı) — plan yazıldı (3 task); `verify-plan 12` sonrası `run-task` başlar. Faz 11 ✅ detayı → `phases/PHASE-11.md` + `tasks/archive/`. Faz 4–11 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 12.01 | TASK-12.01 | ✅ Tamamlandı | Fixed viewport katman + Hero koordinasyon (TK1/TK2) |
| 12.02 | TASK-12.02 | ⬜ Bekliyor | Bölüme-uyarlanan adaptif scrim (TK3, kontrast korunur) |
| 12.03 | TASK-12.03 | ⬜ Bekliyor | Karar-gate: kontrast=100 + desktop perf 100/CLS 0 + craft → uygula/iptal-kaydet |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 11 task özetleri sıfırlandı** (Faz 11 detayları `phases/PHASE-11.md` + `tasks/archive/`).

**TASK-12.01** — Fixed viewport Living Flow katmanı + Hero koordinasyon ✅
- `useFlowMode` hook (YENİ, paylaşılan mod-tespit+LCP-defer) + `FlowBackdrop` (YENİ, `fixed z-0`, yalnız `high`); Hero `high`'da canvas suppress → **tek WebGL context**.
- `page.tsx`: backdrop mount + main/Footer `relative z-10` (opak body bg üstünde/içerik altında).
- Test: build temiz (7.6s) · a11y tohumu 2 passed · runtime script (Chrome+SwiftShader) desktop/mobil/reduced ALL PASS.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Faz 12 🔄 — 12.01 ✅ (fixed katman kuruldu). Aktif task **TASK-12.02** (⬜ Bekliyor — adaptif scrim). Sıradaki adım **run-task 12.02** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 12 🔄 — v0.3 Living Flow nabız kapsamı (B1, karar-gate'li): kontrollü aşağı-taşıma / sürekli soluk iplik / desktop-öncelik / bölüme-uyarlanan opaklık. **Teknik biçim:** tek fixed viewport canvas + parallax (C); plan = 3 task (12.01 fixed katman ✅ → 12.02 adaptif scrim → 12.03 karar-gate). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `run-task 12.02`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **run-task 12.01 ✅: fixed viewport Living Flow katmanı + Hero koordinasyon.** Uygulama: `useFlowMode.ts` (YENİ, paylaşılan degradasyon+LCP-defer hook — `LivingFlow`/`FlowBackdrop` tek gerçek kaynak), `FlowBackdrop.tsx` (YENİ, `fixed inset-0 z-0` yalnız `high` modda `FlowCanvas`), `LivingFlow.tsx` (`high` modda canvas suppress; `low`/`static` aynen), `page.tsx` (backdrop mount + main/Footer `relative z-10`). Karar: mod-tespit paylaşılan hook'a çıkarıldı (QUALITY §5); katmanlama pozitif-z (body opak → negatif-z kırılgan). Test: `next build` temiz (7.6s, TS strict) · `home-a11y.spec.ts` light+dark 2 passed 0 ihlal · standalone Chrome+SwiftShader runtime script (desktop tek fixed canvas/scroll'da kalıcı · mobil ≤768 hero-contained+backdrop yok · reduced-motion 0 canvas+StaticFlow) → **ALL PASS** (çift-context riski elendi). **Sıradaki DevFlow komutu: `run-task 12.02`.**
