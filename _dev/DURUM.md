# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **verify-plan 12 tamamlandı: plan review temiz geçti** (3 task fresh context'te doğrulandı; 0 mekanik düzeltme, 0 yapısal değişiklik). Tüm somut kod referansları gerçekle tutarlı (Hero/globals/LivingFlow/FlowCanvas/bölüm bg'leri + perf tabanı + test tohumları + memory dosyaları ✓); `FlowBackdrop.tsx` doğru YENİ. Milestone tam kapsanıyor (12.01 yapısal → 12.02 okunabilirlik → 12.03 karar-gate); çakışma/boşluk yok, sıra=bağımlılık doğru. **Sıradaki adım: `run-task 12.01`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 12 🔄 (**B1 Living Flow nabız kapsamı** — karar-gate'li, imza-riskli) — discuss-phase 12 ile girildi; kapsam damgalandı. **Faz 11 ✅** (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (verify-plan 12 ✅ → sıradaki `run-task 12.01`; v0.3 içerik fazı, Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
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

**Task:** TASK-12.01 (⬜ Bekliyor — fazın ilk task'i, aktif) — Fixed viewport Living Flow katmanı + Hero koordinasyon (TK1/TK2). Plan review ✅ geçti; `run-task 12.01` ile başlanır.
**Durum:** Faz 12 🔄 → Adım **task** (verify-plan ✅). Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** verify-plan 12 (2026-07-03) ✅ — 3 task fresh context'te doğrulandı, sorun yok. Sıradaki = `run-task 12.01`.

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

**Aktif Task:** Faz 12 🔄 plan review ✅ (verify-plan 12: 0 düzeltme). Aktif task **TASK-12.01** (⬜ Bekliyor). Sıradaki adım **run-task 12.01** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 12 🔄 — v0.3 Living Flow nabız kapsamı (B1, karar-gate'li): kontrollü aşağı-taşıma / sürekli soluk iplik / desktop-öncelik / bölüme-uyarlanan opaklık. **Teknik biçim:** tek fixed viewport canvas + parallax (C); plan = 3 task (fixed katman → adaptif scrim → karar-gate). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `verify-plan 12`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **verify-plan 12 ✅: plan review temiz geçti** (3 task fresh context'te baştan okundu; **0 mekanik düzeltme, 0 yapısal değişiklik**). Referans gerçeklik-kontrolü: tüm somut kod referansları gerçekle birebir tutarlı — `Hero.tsx:34` overflow-hidden/:36-37 LivingFlow+FlowScrim, `globals.css:60` body opak, `LivingFlow.tsx:38-40` lowPower+LCP-defer, `FlowCanvas` parallax + `frameloop=always` (in-view unmount yok → perf hipotezi temeli sağlam), `Footer.tsx:48`/`Bunker.tsx:54` `bg-ink`, Sektörler/Forum/Credibility `bg-canvas-deep/40`, `FlowScrim` token `color-mix`; perf tabanı `home-desktop-20260628.{html,json}` + test tohumları (`home-a11y.spec.ts`/`i18n-parity.test.ts`) + 6 memory dosyası mevcut; `FlowBackdrop.tsx` doğru YENİ. İçerik: milestone tam kapsanıyor (12.01 yapısal → 12.02 okunabilirlik → 12.03 karar-gate), çakışma/boşluk yok, sıra=bağımlılık doğru, yaklaşım tutarlı (tek fixed canvas + token scrim, yeni paket/i18n yok). **Sıradaki DevFlow komutu: `run-task 12.01`.**
