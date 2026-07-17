# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-17 — **verify-plan 17 ✅ — 8 task fresh-context review, plan TEMİZ (0 mekanik düzeltme, 0 yapısal değişiklik).** Referans gerçeklik-kontrolü tam: tüm kod yolları/satır no/tanımlayıcılar gerçekle birebir teyitli (alpfit 133-leaf×5 parite · route.ts sanitizasyon L38/40/42/44 → new Anthropic L48 · Chatbot L14/71/103 · next.config redirect 3 ailesi L27-49 · subpages-a11y 50 test · 5 Vitest + 2 e2e · Alpfit 7 bileşen+PhoneMockups). Milestone/gereksinim/tutarlılık ✓. Task çalıştırılmadı. Açık takipler (regresyon değil): branch→`main` merge bekliyor (gym PNG) · canlı `ANTHROPIC_API_KEY` env yok · non-TR alpfit stale-TR (prd-review). Fazlar 1–16 ✅, Faz 17 🔄 (Adım: **task**). **v0.4 TR CANLI** (`main`=`f173234`). **Sıradaki: `/devflow:run-task` → TASK-17.01** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (discuss-phase 17 girdi, kapsam damgalandı). Doğrulama fazı — yeni feature üretilmez; ana sayfa + 5 alt sayfa uçtan-uca (S1–S9), delta odağı **Alpfit Plus ürün vitrini** (Faz 15) + test-what's-live (v0.4 canlıda `f173234`). Önceki faz **16 ✅** (v0.4 versiyon-sonu teknik borç + TR release). Fazlar 1–16 ✅.
**Adım:** **task** — verify-plan 17 ✅ (8 task fresh-context review; referans gerçeklik-kontrolü tam — tüm kod yolları/satır no/tanımlayıcılar teyitli; milestone/gereksinim/task-arası tutarlılık ✓; **0 mekanik düzeltme, 0 yapısal değişiklik** — plan temiz). Katman sırası A build-ground-truth (01-03) → C runtime `page.route`+system Chrome (04-07) → adversarial+canlı duman (08). **Sıradaki: `/devflow:run-task` → TASK-17.01** (ilk task — yeni oturum). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 gym PNG silme; versiyon-sonu finalizasyona, kapsam dışı; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu); (3) non-TR alpfit stale-TR (versiyon-sınırı → prd-review).
**İlerleme:** verify-plan 17 (2026-07-17) — 8 task fresh-context review'dan geçti; referans gerçeklik-kontrolü + milestone/gereksinim/tutarlılık ✓; plan temiz (düzeltme/değişiklik yok). Sıradaki: run-task TASK-17.01.
**Son Faz Dokümanı:** `phases/PHASE-17.md` (🔄). Önceki: `phases/PHASE-16.md` (✅ v0.4 teknik borç), `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** senaryo_testi (review-phase 16 damgaladı — v0.4 teknik borç fazı ✅). **Faz 17 (senaryo testi) 🔄 girildi** (discuss-phase 17); TR canlı (`f173234`) → Faz 17 test-what's-live literal → sonra zorunlu prd-review. non-TR çeviri prd-review'a.

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-17.01** ⬜ Bekliyor — sıradaki çalıştırılacak (S1 giriş/yönlendirme matrisi + taze `next build` ground-truth; 17.02/17.03 prerender-grep buna dayanır). verify-plan 17 ✅ → plan temiz. 8 task ⬜ (TASK-17.01–17.08).
**Durum:** Fazlar 1–16 ✅, Faz 17 🔄 (senaryo testi, Adım: task — verify-plan ✅); Versiyon Sonu Durumu `senaryo_testi`. **v0.4 TR canlı** (`f173234`).
**İlerleme:** verify-plan 17 (2026-07-17) — 8 task review temiz (0 düzeltme). Sıradaki adım: run-task TASK-17.01.

---

## Task Durumu (Aktif Faz)

> **Faz 17 🔄** (plan-phase 17 ✅, 2026-07-17). S1–S9 → **8 task** (katman sırası A build-ground-truth → C runtime → adversarial+canlı). Detay + açıklamalar → `phases/PHASE-17.md` Task Listesi. Doğrulama fazı: kaynak kod değişmez (kapsam-içi bug → reaktif düzeltme task'ı istisnası).

| # | Task | Durum | Kısa |
|---|------|-------|------|
| 17.01 | TASK-17.01 | ⬜ Bekliyor | S1 giriş/yönlendirme matrisi + taze `next build` ground-truth (A) |
| 17.02 | TASK-17.02 | ⬜ Bekliyor | S5+S6-render + Alpfit render bütünlüğü (prerender grep, A) |
| 17.03 | TASK-17.03 | ⬜ Bekliyor | S8-suite + S6-parite (Vitest+axe/CI, `alpfit` 133-leaf; a11y mührü CI) |
| 17.04 | TASK-17.04 | ⬜ Bekliyor | S3 Living Flow degradasyon + Alpfit before/after + CLS (C) |
| 17.05 | TASK-17.05 | ⬜ Bekliyor | S4 kontroller & kalıcılık (tema/dil/klavye, Alpfit dahil) (C) |
| 17.06 | TASK-17.06 | ⬜ Bekliyor | S2 tam TR yolculuğu (Alpfit Plus çıkış/dönüş odak) (C+A) |
| 17.07 | TASK-17.07 | ⬜ Bekliyor | S7 chatbot 0-token (offline+sanitizasyon; 0 API çağrısı) |
| 17.08 | TASK-17.08 | ⬜ Bekliyor | S9 adversarial/holistik + canlı duman (test-what's-live) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 16 kapandı (v0.4 versiyon-sonu teknik borç) → Faz 16 task özeti (TASK-16.01) PHASE-16'ya mezun edildi.**

_(Yeni faz henüz girilmedi — güncel task özeti yok. Faz 16 task özeti `phases/PHASE-16.md`'de.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-17.01** ⬜ Bekliyor (sıradaki `/devflow:run-task`). 8 task ⬜ (TASK-17.01–17.08); verify-plan 17 ✅ plan temiz. **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu) · non-TR alpfit stale-TR (prd-review).
**Aktif Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (Adım: task). Doğrulama fazı: ana sayfa + 5 alt sayfa uçtan-uca (S1–S9 → 8 task), delta odağı **Alpfit Plus** + test-what's-live. Plan ✅ (plan-phase 17). Önceki **Faz 16 ✅** (v0.4 teknik borç + TR release). **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **senaryo_testi**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–16 ✅. Faz dokümanı: `phases/PHASE-17.md` (🔄); release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-17 — **verify-plan 17 ✅ — 8 task fresh-context plan review, plan TEMİZ.** Referans gerçeklik-kontrolü tam (tüm kod yolları/satır no/tanımlayıcılar gerçekle birebir: alpfit 133-leaf×5 parite · route.ts sanitizasyon L38/40/42/44→new Anthropic L48 · Chatbot L14/71/103 · next.config 3 redirect ailesi · subpages-a11y 50 test · 5 Vitest+2 e2e · Alpfit 7 bileşen+PhoneMockups · Bunker `id="bunker"`/`"bunker":"Crew OS"` kod-adı kalıntısı); milestone (5 kalem) tüm task'larla eşleşiyor, gereksinim/kalite/task-arası tutarlılık ✓; **0 mekanik düzeltme, 0 yapısal değişiklik**. Yalnız DURUM.md güncellendi (Adım verify-plan→task, TASK-17.01 aktif). Fazlar 1–16 ✅, Faz 17 🔄. **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:run-task` → TASK-17.01** (yeni oturum).
