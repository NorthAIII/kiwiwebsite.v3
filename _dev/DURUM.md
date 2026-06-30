# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — review-phase 4 ✅: Faz 4 (v0.2 a11y 89→100) tamamlandı. Retrospektif + 8 kalite ekseni PHASE-4'e yazıldı (Marka&Craft/Erişilebilirlik/Güvenlik/Bakım/Perf ✅; Hata Yönetimi & Test Kapsamı N/A); milestone 5/5, UAT 14/14. Düzeltme task'ı yok. Versiyon Sonu Durumu içerik_fazları (değişmez) → sıradaki içerik fazı: test altyapısı (D1). **Adım=discuss** (sıradaki: discuss-phase 5).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 5 — Test altyapısı (D1) (geçici ad; Sıradaki Fazlar ilk maddesi). Faz 4 (v0.2 a11y 89→100) ✅ **review tamamlandı**; sıradaki faz henüz girilmedi (discuss-phase promote eder).
**Adım:** discuss → `/devflow:discuss-phase 5`: v0.2 sıradaki içerik fazının (test altyapısı D1) kapsam tartışması (yeni oturum).
**İlerleme:** Faz 4 ✅ kapandı — a11y 89→**100 çift-tema** (UAT 14/14, milestone 5/5, 8 kalite ekseni). A11Y1 (K1 `::before` + K2 ink-faint token + K5/C9/C10 cream-on-ink + C2/C3 yeni `--color-pulse-ink`) + A11Y2 (hero `<dl>`→semantik link) + A11Y3 (dil-switcher aria WCAG 2.5.3). İmza/perf/parite korundu; düzeltme task'ı yok. Retrospektif + kalite kontrol PHASE-4'e yazıldı; **sahipli sonraki-faz borcu:** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi (`--color-pulse-ink` swap yalnız ana sayfada).
**Son Faz Dokümanı:** `phases/PHASE-4.md` (✅ tamamlandı)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — Aktif task yok. Faz 4 ✅ (review tamam). Sıradaki adım faz döngüsünde discuss-phase 5 (task değil).
**Durum:** Faz 4 kapandı; Faz 5 task'ları discuss→research→plan sonrası oluşur.
**İlerleme:** `/devflow:discuss-phase 5` ile v0.2 sıradaki içerik fazını (test altyapısı D1) başlat (yeni oturum).

---

## Task Durumu (Aktif Faz)

> Faz 5 (test altyapısı D1) henüz **girilmedi** — discuss→research→plan sonrası task'lar oluşur. Faz 4 (v0.2 a11y) ✅ tamamlandı; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Faz 5 henüz planlanmadı (discuss-phase 5 bekliyor) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

> Faz geçişinde sıfırlandı (Faz 4 ✅ → Faz 5 discuss). Faz 4 task özetleri `phases/PHASE-4.md` + `tasks/archive/TASK-4.0*.md`'de. Faz 5 task'ları çalışıldıkça buraya eklenir.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** — yok; Faz 4 ✅ (review tamam). Sıradaki adım: `/devflow:discuss-phase 5` (test altyapısı D1)
**Aktif Faz:** 5 — Test altyapısı (D1) (geçici ad, henüz girilmedi) · adım=discuss; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — review-phase 4 ✅: Faz 4 (v0.2 a11y 89→100) tamamlandı. Retrospektif + 8 kalite ekseni PHASE-4'e yazıldı; milestone 5/5, UAT 14/14, düzeltme task'ı yok. PHASES/MODULE-MAP ✅ işaretlendi. Versiyon Sonu Durumu içerik_fazları → sıradaki: discuss-phase 5 (test altyapısı D1).
