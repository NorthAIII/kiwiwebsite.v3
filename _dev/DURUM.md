# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-17 — **run-task TASK-17.02 ✅ — S5 taksonomi/dürüstlük + S6-render + Alpfit render bütünlüğü GEÇTİ, 0 kapsam-içi bug.** 30-dosya prerender ground-truth grep (17.01 build'i): "Crew OS" home 15×/crew-os 14× (5 dil), görünür "Bunker OS" 0/30 (tüm kalıntı kod-adı); Alpfit dürüstlük 4/4 (pilot/fiyat/yol-haritası/"canlı pilotta" dürüst, sahte-online 0), yasak metafor 0/30; MISSING_MESSAGE 0/30, AR 6/6 RTL, non-TR `alpfit` 5-dil birebir (133-leaf parite); Alpfit 5-locale 9 bölüm + `PhoneMockup` 150× + 0 raster, 30/30 tam `<main>`. Kaynak kod değişmedi. Fazlar 1–16 ✅, Faz 17 🔄 (Adım: **task**, 6 task kaldı). **v0.4 TR CANLI** (`main`=`f173234`). **Sıradaki: `/devflow:run-task` → TASK-17.03** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (discuss-phase 17 girdi, kapsam damgalandı). Doğrulama fazı — yeni feature üretilmez; ana sayfa + 5 alt sayfa uçtan-uca (S1–S9), delta odağı **Alpfit Plus ürün vitrini** (Faz 15) + test-what's-live (v0.4 canlıda `f173234`). Önceki faz **16 ✅** (v0.4 versiyon-sonu teknik borç + TR release). Fazlar 1–16 ✅.
**Adım:** **task** — TASK-17.02 ✅ (S5 taksonomi/dürüstlük + S6-render + Alpfit render bütünlüğü geçti, 0 kapsam-içi bug; 17.01 build ground-truth'unda 30-dosya prerender grep). Fazda 6 task kaldı (17.03–17.08). Katman sırası A build-ground-truth (01-03) → C runtime `page.route`+system Chrome (04-07) → adversarial+canlı duman (08). **Sıradaki: `/devflow:run-task` → TASK-17.03** (yeni oturum). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 gym PNG silme; versiyon-sonu finalizasyona, kapsam dışı; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu); (3) non-TR alpfit stale-TR (versiyon-sınırı → prd-review; 17.02'de yapısal parite teyit — görünür kopukluk yok).
**İlerleme:** run-task TASK-17.02 (2026-07-17) — S5+S6-render+Alpfit render geçti (Crew OS var/görünür Bunker 0 · Alpfit 4/4 dürüst · MISSING_MESSAGE 0/30 · AR 6/6 RTL · non-TR alpfit 133-leaf birebir parite · Alpfit 9 bölüm+PhoneMockup 150×+0 raster · 30/30 tam `<main>`); kaynak kod değişmedi. Sıradaki: run-task TASK-17.03.
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

**Task:** **TASK-17.03** ⬜ Bekliyor — sıradaki çalıştırılacak (S8-suite + S6-parite: Vitest `alpfit` 133-leaf + seo tohumları + `test:e2e` axe çift-tema 50-test = a11y=100 mührü + CI `fast`+`a11y`). TASK-17.02 ✅ (S5+S6-render+Alpfit render geçti). 6 task ⬜ (TASK-17.03–17.08).
**Durum:** Fazlar 1–16 ✅, Faz 17 🔄 (senaryo testi, Adım: task — 17.01+17.02 ✅); Versiyon Sonu Durumu `senaryo_testi`. **v0.4 TR canlı** (`f173234`).
**İlerleme:** run-task TASK-17.02 (2026-07-17) — S5+S6-render+Alpfit render geçti, 0 kapsam-içi bug. Sıradaki adım: run-task TASK-17.03.

---

## Task Durumu (Aktif Faz)

> **Faz 17 🔄** (plan-phase 17 ✅, 2026-07-17). S1–S9 → **8 task** (katman sırası A build-ground-truth → C runtime → adversarial+canlı). Detay + açıklamalar → `phases/PHASE-17.md` Task Listesi. Doğrulama fazı: kaynak kod değişmez (kapsam-içi bug → reaktif düzeltme task'ı istisnası).

| # | Task | Durum | Kısa |
|---|------|-------|------|
| 17.01 | TASK-17.01 | ✅ Tamamlandı | S1 giriş/yönlendirme matrisi + taze `next build` ground-truth (A) — geçti, 0 bug |
| 17.02 | TASK-17.02 | ✅ Tamamlandı | S5+S6-render + Alpfit render bütünlüğü (prerender grep, A) — geçti, 0 bug |
| 17.03 | TASK-17.03 | ⬜ Bekliyor | S8-suite + S6-parite (Vitest+axe/CI, `alpfit` 133-leaf; a11y mührü CI) |
| 17.04 | TASK-17.04 | ⬜ Bekliyor | S3 Living Flow degradasyon + Alpfit before/after + CLS (C) |
| 17.05 | TASK-17.05 | ⬜ Bekliyor | S4 kontroller & kalıcılık (tema/dil/klavye, Alpfit dahil) (C) |
| 17.06 | TASK-17.06 | ⬜ Bekliyor | S2 tam TR yolculuğu (Alpfit Plus çıkış/dönüş odak) (C+A) |
| 17.07 | TASK-17.07 | ⬜ Bekliyor | S7 chatbot 0-token (offline+sanitizasyon; 0 API çağrısı) |
| 17.08 | TASK-17.08 | ⬜ Bekliyor | S9 adversarial/holistik + canlı duman (test-what's-live) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 16 kapandı (v0.4 versiyon-sonu teknik borç) → Faz 16 task özeti (TASK-16.01) PHASE-16'ya mezun edildi.**

**TASK-17.02** ✅ (S5 taksonomi/dürüstlük + S6-render + Alpfit render bütünlüğü — doğrulama, kaynak kod değişmedi)
- S5: "Crew OS" görünür (home 15×/crew-os 14×, 5 dil); görünür "Bunker OS" **0/30** (tüm kalıntı kod-adı: nav key `"bunker":"Crew OS"`/`#bunker`/`bunkerback`), `bunker-os` slug 0; Alpfit dürüstlük 4/4 (pilot/fiyat/yol-haritası/"canlı pilotta" dürüst, sahte-online 0); yasak metafor 0/30.
- S6-render: MISSING_MESSAGE **0/30**; AR 6/6 `lang=ar`+`dir=rtl`; non-TR `alpfit` 5-dil **birebir** (133-leaf tam parite) → stale-TR yapısal tam, kopukluk yok.
- Alpfit render: 5-locale 8 `<section>`+roadmap `<div>`=9 bölüm + `PhoneMockup` 150× + 0 `<img>`/49 `<svg>`; **30/30 tam bir `<main>`** (Faz 8 dersi). **0 kapsam-içi bug.**

**TASK-17.01** ✅ (S1 giriş/yönlendirme matrisi — doğrulama, kaynak kod değişmedi)
- Taze `next build` temiz (37/37 static); 30/30 prerender HTML mevcut (6×5) = 200 ground-truth + `html lang`/AR-RTL doğru; canlı spot 200 (7).
- Redirect: `seo-redirects` 16/16 + routes-manifest regex 13/13 (3 aile çıplak+twin 308, sıra tuzağı mührü çıplak `/forum`→`/`); canlı zincir 308→200.
- Edge beklenen: `/tr`→307, `/bulten`+bilinmeyen-locale (`/xx`,`/en-US`,`/zz/crew-os`)→404. **0 kapsam-içi bug** → v0.4 dokunmadı, regresyon re-teyidi geçti.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-17.03** ⬜ Bekliyor (sıradaki `/devflow:run-task`). TASK-17.01 ✅ (S1) · TASK-17.02 ✅ (S5+S6-render+Alpfit render). 6 task ⬜ (TASK-17.03–17.08). **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu) · non-TR alpfit stale-TR (prd-review; 17.02'de yapısal parite teyitli, kopukluk yok).
**Aktif Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (Adım: task, 2/8 task ✅). Doğrulama fazı: ana sayfa + 5 alt sayfa uçtan-uca (S1–S9 → 8 task), delta odağı **Alpfit Plus** + test-what's-live. Plan ✅ (plan-phase 17). Önceki **Faz 16 ✅** (v0.4 teknik borç + TR release). **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **senaryo_testi**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–16 ✅. Faz dokümanı: `phases/PHASE-17.md` (🔄); release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-17 — **run-task TASK-17.02 ✅ — S5 taksonomi/dürüstlük + S6-render + Alpfit render bütünlüğü GEÇTİ, 0 kapsam-içi bug.** 30-dosya prerender ground-truth grep (TASK-17.01 build'i, taze doğrulandı). S5: "Crew OS" görünür (home 15×/crew-os 14×, 5 dil), görünür "Bunker OS" 0/30 (tüm kalıntı kod-adı: nav key `"bunker":"Crew OS"`/`#bunker`/`bunkerback` keyframe), `bunker-os` slug 0; Alpfit dürüstlük 4/4 (pilot "Weekend Training Club"/₺1.500-1.200-3.000-15gün/"Bugün üründe değil"/"canlı pilotta" dürüst; sahte-online 0); yasak metafor 0/30 (home 4-adım gerçek, vaka örnek/ölçüm çerçevesi). S6-render: MISSING_MESSAGE 0/30 (tek `alpfit.vercel.app`=gerçek URL), AR 6/6 `lang=ar`+`dir=rtl`, non-TR `alpfit` 5-dil birebir (133-leaf tam parite → stale-TR yapısal tam). Alpfit render: 5-locale 8 `<section>`+roadmap `<div>`=9 bölüm + `PhoneMockup` 150× (canlı ile birebir) + 0 `<img>`/49 `<svg>`; 30/30 tam bir `<main>` (Faz 8 dersi, bülten dahil). **Kaynak kod değişmedi** (doğrulama fazı). Fazlar 1–16 ✅, Faz 17 🔄 (Adım: task, 2/8 ✅). **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:run-task` → TASK-17.03** (yeni oturum).
