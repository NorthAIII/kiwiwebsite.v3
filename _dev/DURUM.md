# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-17 — **verify-plan 16 ✅ (1 task review edildi).** Referans gerçeklik-kontrolü temiz (4 gym PNG + boyutlar · 0 tüketici · `next/image` düştü · M2:123 stale teşhisi doğru). Mekanik düzeltme yok; 1 yapısal düzeltme (onaylı): TASK-16.01 alt görev 3'teki Alpfit bileşen envanteri gerçekle hizalandı (`AlpfitShowcase` = orchestrator, 5 bölüm bileşeni; "6 bölüm + ayrı orchestrator" double-count'u giderildi). Adım = **task**. **TB-D2 (npm audit) task DEĞİL** (research'te kapandı — `docs/DECISIONS.md` 2026-07-16). **v0.4 TR CANLI** (`main` = `f173234`). **⚠️ Açık takip: chatbot `ANTHROPIC_API_KEY` Vercel prod env'de YOK → `/api/chat` 503 offline** (kullanıcı aksiyonu). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:run-task 16.01`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **16 — v0.4 versiyon-sonu teknik borç (+ TR production release)** 🔄 (discuss ✅, research ✅, plan ✅, verify-plan ✅). Kapsam: gym PNG disk hijyeni (TB-D1) + npm audit (TB-D2, kabul+kayıt); non-TR çeviri ertelendi. **v0.4 TR CANLIYA ALINDI** (operasyonel — `f173234`, `docs/RELEASE-v0.4.md`). Fazlar 1–15 ✅; **v0.4 TR canlı** (`main`).
**Adım:** **task** — verify-plan 16 ✅ (1 task review edildi; referans kontrolü temiz, mekanik düzeltme yok, 1 yapısal düzeltme uygulandı: TASK-16.01 alt görev 3 Alpfit envanteri gerçekle hizalandı). TB-D2 task değil (research'te tamamlandı — audit raporu + `docs/DECISIONS.md` kabul+kayıt; review-phase'de ✅). **Sıradaki: `/devflow:run-task 16.01`** (ilk task — yeni oturum). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env YOK** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** verify-plan 16 (2026-07-17) — plan review tamam: TASK-16.01 temiz context ile doğrulandı (referans gerçeklik-kontrolü: 4 gym PNG + boyutlar · 0 kod tüketicisi · `next/image` düştü · M2:123 stale teşhisi doğru); alt görev 3 Alpfit bileşen envanterindeki double-count düzeltildi. Önceki oturum: plan-phase 16 (task yazımı). Bulgular/kararlar `phases/PHASE-16.md`, `docs/DECISIONS.md`.
**Son Faz Dokümanı:** `phases/PHASE-16.md` (🔄). Önceki: `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** teknik_borç (discuss-phase 16 damgaladı — v0.4 içerik fazları ✅). TR canlıya alındı (`f173234`); non-TR çeviri + senaryo testi + prd-review arkada.

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-16.01 ⬜ Bekliyor** (TB-D1 gym PNG disk hijyeni + M2:123 v0.4 senkronu — plan-phase 16'da oluşturuldu, verify-plan 16'da review edildi ✅). Aktif çalışılan task yok; sıradaki adım task çalıştırma: `/devflow:run-task 16.01` (yeni oturum).
**Durum:** Faz 16 🔄 (discuss ✅, research ✅, plan ✅, verify-plan ✅, Adım = **task**); Versiyon Sonu Durumu `teknik_borç`; kapsam TB-D1 gym PNG silme (+M2:123 senkron) + TB-D2 npm audit (kabul+kayıt, kod task'ı değil); non-TR çeviri ertelendi. **v0.4 TR canlı** (`f173234`). Fazlar 1–15 ✅.
**İlerleme:** verify-plan 16 (2026-07-17) — TASK-16.01 review edildi (referans kontrolü temiz; 1 yapısal düzeltme uygulandı: alt görev 3 Alpfit envanteri gerçekle hizalandı). Task dokümanı `tasks/TASK-16.01.md` çalıştırmaya hazır.

---

## Task Durumu (Aktif Faz)

> **Faz 16 🔄** (v0.4 versiyon-sonu teknik borç): discuss ✅, research ✅, plan ✅. Kapsam gym PNG hijyeni (TB-D1) + npm audit (TB-D2). plan-phase 16 tek task oluşturdu (TB-D1); TB-D2 = kabul+kayıt (kod task'ı değil, research'te kapandı — `docs/DECISIONS.md` 2026-07-16). **v0.4 TR production release** operasyonel (task değil — `docs/RELEASE-v0.4.md`, canlı `f173234`). Faz 15 task özetleri `phases/PHASE-15.md`'ye mezun.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 16.01 | TASK-16.01 | ⬜ Bekliyor | TB-D1 — gym PNG disk hijyeni (`public/gym/*.png` 4 orphan sil) + M2:123 stale açıklama v0.4 senkronu |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 15 kapandı (v0.4 içerik fazı) → Faz 15 task özetleri PHASE-15'e mezun edildi.** Faz 16 girildi ama henüz task oluşmadı (plan-phase 16 doldurur) — ilk task tamamlanınca özet burada görünür.

_(Faz 16 task'ı henüz yok. Bu oturumda operasyonel v0.4 TR release yapıldı → `docs/RELEASE-v0.4.md`.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-16.01 ⬜ Bekliyor** (TB-D1 gym PNG + M2:123 senkron; verify-plan 16'da review edildi ✅). Sıradaki adım task çalıştırma: `/devflow:run-task 16.01`. **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env YOK** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — kullanıcı aksiyonu).
**Aktif Faz:** **16 🔄 — v0.4 versiyon-sonu teknik borç (+ TR release)** (discuss ✅, research ✅, plan ✅, verify-plan ✅, Adım = **task**). Kapsam TB-D1 gym PNG silme + TB-D2 npm audit (kabul+kayıt); non-TR çeviri ertelendi. **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **teknik_borç**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–15 ✅. Faz dokümanı: `phases/PHASE-16.md`; TB-D2 kararı `docs/DECISIONS.md`; release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-17 — **verify-plan 16 ✅** (1 task review edildi). Referans gerçeklik-kontrolü temiz (4 gym PNG + boyutlar · 0 kod tüketicisi · `next/image` düştü · M2:123 stale teşhisi doğru); mekanik düzeltme yok; 1 yapısal düzeltme (onaylı): TASK-16.01 alt görev 3 Alpfit bileşen envanteri gerçekle hizalandı (`AlpfitShowcase`=orchestrator + 5 bölüm bileşeni; double-count giderildi). Adım = task. **TB-D2 (npm audit) task DEĞİL** — research'te kapandı (`docs/DECISIONS.md` 2026-07-16); review-phase 16'da ✅. **v0.4 TR CANLI** (`f173234`). **⚠️ Açık: chatbot `ANTHROPIC_API_KEY` env YOK → /api/chat 503** (kullanıcı aksiyonu). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:run-task 16.01`.**
