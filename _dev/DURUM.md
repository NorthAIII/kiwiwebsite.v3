# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — review-phase 5 ✅: Faz 5 (test altyapısı D1) tamamlandı — retrospektif + 8 kalite ekseni PHASE-5'e yazıldı (Erişilebilirlik/Güvenlik/Bakım/Test Kapsamı ✅; Marka/Perf/Hata Yönetimi N/A — altyapı, src/+messages/ 0 değişiklik). Milestone 6/6, UAT 13/13, düzeltme yok. QUALITY §8 güncellendi. Versiyon Sonu Durumu içerik_fazları (değişmez) → sıradaki içerik fazı = mobil perf/LCP (`/devflow:discuss-phase 6`).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 6 — Mobil perf / LCP (v0.2, geçici ad — discuss-phase 6 numara/kapsamı damgalar). Faz 5 (test altyapısı D1) ✅ tamamlandı; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** discuss → `/devflow:discuss-phase 6` (yeni oturum): sonraki içerik fazının (mobil perf/LCP) kapsam tartışması.
**İlerleme:** Faz 5 kapandı: ilk test altyapısı (3 kanıtlı katman: Vitest node/jsdom + Playwright/axe) + ilk GitHub Actions CI (fast + a11y) + 2 tohum (i18n parite + a11y regresyon) + `docs/TESTING.md`. UAT 13/13, 8 kalite ekseni ✅, src/+messages/ 0 değişiklik. Sıradaki faz **henüz planlanmadı** (discuss-phase açacak). **Devralınan sahipli borç:** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi (harness artık hazır, sonraki a11y/alt-sayfa fazı genişletir). Perf fazı için: TR `/` `NEXT_LOCALE=tr` cookie şart (DEV-6 dersi).
**Son Faz Dokümanı:** `phases/PHASE-5.md` (✅ tamamlandı — retrospektif + kalite kontrol yazıldı)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Yok — Faz 5 ✅ tamamlandı (review dahil). Faz 6 (mobil perf/LCP) henüz planlanmadı; task'lar discuss→plan akışında oluşacak.
**Durum:** Faz döngüsü `discuss` adımında. Sıradaki: `/devflow:discuss-phase 6` (mobil perf/LCP kapsam tartışması, yeni oturum).
**İlerleme:** Faz 5 review tamam. Yeni faz task'ı yok — kapsam tartışmasıyla başlanır.

---

## Task Durumu (Aktif Faz)

> Faz 6 (mobil perf/LCP) henüz **planlanmadı** — discuss/research/plan akışı task üretecek. Faz 5 (test altyapısı D1) ✅ tamamlandı; 5 task'ı (5.01-5.05) `tasks/archive/`'da, detay `phases/PHASE-5.md`. Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | (henüz yok) | — | Faz 6 discuss-phase'de planlanacak |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

> Yeni faza (6) geçildi — Faz 5 task özetleri sıfırlandı (detay: `phases/PHASE-5.md` + `tasks/archive/TASK-5.0*.md`). İlk Faz 6 task'ı tamamlanınca buraya özet eklenir.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — Faz 5 ✅ (review dahil). Sıradaki adım: `/devflow:discuss-phase 6` (mobil perf/LCP kapsam tartışması)
**Aktif Faz:** 6 — Mobil perf / LCP (geçici ad) · adım=discuss; Faz 5 (test altyapısı D1) ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — review-phase 5 ✅: Faz 5 (test altyapısı D1) tamamlandı (retrospektif + 8 kalite ekseni PHASE-5'e; QUALITY §8 + PHASES + MODULE-MAP güncellendi). UAT 13/13, milestone 6/6, düzeltme yok. Versiyon Sonu Durumu içerik_fazları (değişmez) → sıradaki = mobil perf/LCP → `/devflow:discuss-phase 6`.
