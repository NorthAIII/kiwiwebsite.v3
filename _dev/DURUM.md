# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **review-phase 15 ✅ — FAZ 15 (v0.4 Alpfit Plus ürün vitrini) TAMAMLANDI.** UAT 16/16, 0 kapsam-içi bug, 0 düzeltme task'ı; retrospektif + kalite kontrol (8 eksen ✅) + sonuç faz dokümanına yazıldı. Bağımsız re-teyit: orphan gym kalıntısı 0 · "Bunker" alpfit-ns'de 0 (5 dil) · `crewOs` ödünç bırakıldı · dürüstlük 4/4 TR değerleri VAR · parite 133 leaf × 5 dil · `--color-surface` çift-tema. AP1/AP2/AP3 ✅ (MODULE-MAP). İmza Living Flow + dürüstlük 4/4 korundu; guardrail (a11y=100 çift-tema/CLS=0/i18n parite/marka sesi/reduced-motion) regresyonsuz; Craft SOTD-kalibre kullanıcı onayı. Boyut kontrolü (Adım 5b): PHASE-15 ~8.7k token → bölme gerekmedi. Versiyon Sonu Durumu `içerik_fazları` (değişmez) → v0.4 içerik işi bitti. Sahipli: non-TR stale · `public/gym/*.png` disk hijyeni · **canlı `ANTHROPIC_API_KEY` env ayarlı değil** (chatbot offline; v0.4 henüz canlı değil — regresyon değil). Branch `revize/alpfit-plus`. **Sıradaki: `/devflow:discuss-phase 16`** (versiyon-sonu teknik borç fazı).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **15 — v0.4 Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım)** ✅ **TAMAMLANDI** (7/7 task ✅, UAT 16/16 ✅, review ✅). Fazlar 1–15 ✅ (v0.1+v0.2+v0.3 canlı; v0.4 branch'te). **Sıradaki faz: 16 — v0.4 versiyon-sonu teknik borç** (geçici ad; discuss-phase 16 tabloya ekler).
**Adım:** **discuss** — review-phase 15 ✅. **Sıradaki: `/devflow:discuss-phase 16`** (versiyon-sonu teknik borç fazı — Adım 0 versiyon-sonu tespitiyle `içerik_fazları`→`teknik_borç` promote eder; Faz 7→8 emsali). **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** review-phase 15 (2026-07-16) ✅ — retrospektif + kalite kontrol (8 eksen ✅) + sonuç faz dokümanına yazıldı; UAT 16/16, 0 kapsam-içi bug, 0 düzeltme task'ı. Bağımsız re-teyit: orphan gym 0 · Bunker alpfit-ns 0 · dürüstlük 4/4 VAR · parite 133 leaf × 5 dil. Kod değişmedi (yalnız `_dev/` doküman). Faz 15 task'ları (15.01–15.07): 15.01 foundation · 15.02 Sorun+4 Rol · 15.03 telefon mockup (CSS Module) · 15.04 9-özellik · 15.05 Neden · 15.06 Fiyat+Yol haritası+Kapanış · 15.07 SEO+temizlik — detay `phases/PHASE-15.md` + `tasks/archive/`.
**Son Faz Dokümanı:** `phases/PHASE-15.md` (✅ tamamlandı). Önceki: `phases/PHASE-14.md` (✅ v0.3 son fazı).

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** içerik_fazları (re-kickoff 2026-07-16 sıfırladı)

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **Faz 15 review ✅ — v0.4 içerik fazı tamam.** Aktif task yok (yeni faz henüz girilmedi). Sıradaki adım: `/devflow:discuss-phase 16` (versiyon-sonu teknik borç fazı).
**Durum:** Faz 15 ✅ (15.01–15.07 ✅ **7/7**; UAT **16/16 ✅**; review ✅); Adım = **discuss** (sıradaki faz 16); Aktif Versiyon v0.4, Versiyon Sonu Durumu `içerik_fazları` (değişmez — v0.4 içerik işi bitti). Fazlar 1–15 ✅ (v0.1+v0.2+v0.3 canlı; v0.4 branch'te).
**İlerleme:** review-phase 15 (2026-07-16) ✅ — retrospektif + kalite 8 eksen faz dokümanına yazıldı; UAT 16/16, 0 kapsam-içi bug, 0 düzeltme task'ı. Kod değişmedi (yalnız `_dev/` doküman).

---

## Task Durumu (Aktif Faz)

> **Faz 15 ✅ tamamlandı** (15.01–15.07 ✅ 7/7, UAT 16/16, review ✅) → task özetleri `phases/PHASE-15.md`'ye mezun edildi (Task Listesi + retrospektif + `tasks/archive/TASK-15.*`). **Faz 16 (v0.4 versiyon-sonu teknik borç) henüz girilmedi** — discuss-phase 16 fazı açar, plan-phase 16 task'ları oluşturur. Fazlar 1–15 ✅.

_(Aktif faz task tablosu boş — Faz 16 henüz girilmedi; discuss-phase 16 → plan-phase 16 doldurur.)_

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 15 kapandı (v0.4 içerik fazı) → Faz 15 task özetleri PHASE-15'e mezun edildi** (detaylar `phases/PHASE-15.md` Task Listesi + retrospektif + `tasks/archive/TASK-15.*`). Faz 16 (versiyon-sonu teknik borç) henüz girilmedi — ilk task'ı tamamlanınca özet burada görünür.

_(Faz 16 henüz girilmedi — task özeti yok.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **Faz 15 review ✅ tamamlandı** (UAT 16/16, 0 kapsam-içi bug, 0 düzeltme task'ı). Aktif task yok — sıradaki adım: `/devflow:discuss-phase 16` (versiyon-sonu teknik borç fazı). **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır).
**Aktif Faz:** **15 ✅ tamamlandı — v0.4 Alpfit Plus ürün vitrini** (15.01–15.07 ✅ **7/7**, UAT **16/16 ✅**, review ✅). Adım = **discuss**; sıradaki `/devflow:discuss-phase 16`. **Aktif Versiyon v0.4 — Alpfit Plus ürün vitrini**, Versiyon Sonu Durumu: **içerik_fazları** (değişmez — v0.4 içerik işi bitti; discuss-phase 16 `teknik_borç`'a promote eder). Fazlar 1–15 ✅ (v0.1+v0.2+v0.3 canlı; v0.4 branch'te). Faz dokümanı: `phases/PHASE-15.md`. Feature: `PRD/features/alpfit-plus.md`; tasarım referansı `docs/alpfit-plus-artifact.html`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — **review-phase 15 ✅ — FAZ 15 (v0.4 Alpfit Plus ürün vitrini) TAMAMLANDI.** Retrospektif + kalite kontrol (8 eksen ✅) + sonuç faz dokümanına yazıldı; UAT 16/16, 0 kapsam-içi bug, 0 düzeltme task'ı. Bağımsız re-teyit: orphan gym 0 · Bunker alpfit-ns 0 (5 dil) · `crewOs` ödünç bırakıldı · dürüstlük 4/4 VAR · parite 133 leaf × 5 dil · `--color-surface` çift-tema. AP1/AP2/AP3 ✅. İmza Living Flow + dürüstlük 4/4 korundu; guardrail (a11y=100 çift-tema/CLS=0/i18n parite/marka sesi/reduced-motion) regresyonsuz; Craft SOTD kullanıcı onayı. Boyut kontrolü (Adım 5b): PHASE-15 ~8.7k token → bölme gerekmedi. Versiyon Sonu Durumu `içerik_fazları` (değişmez). Sahipli: non-TR stale · `public/gym/*.png` disk hijyeni · canlı env. Branch `revize/alpfit-plus`. **Sıradaki: `/devflow:discuss-phase 16`** (versiyon-sonu teknik borç fazı).
