# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **review-phase 8 tamamlandı:** Faz 8 ✅ (retrospektif + 8-eksen kalite ✅ + kullanıcı yolculuğu/boşluk `phases/PHASE-8.md`'ye yazıldı); milestone 6/6, UAT 12/12, düzeltme task'ı yok. Ders: axe WCAG-AA `landmark-one-main`'i taramaz → iki-gate mühür (memory). **Versiyon Sonu Durumu teknik_borç → senaryo_testi** → sıradaki = senaryo testi fazı (discuss-phase 9 promote eder).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 9 (geçici ad: v0.2 versiyon-sonu **senaryo testi**) — Faz 8 (teknik borç) ✅ review tamamlandı, Versiyon Sonu Durumu `teknik_borç` → `senaryo_testi`. **Faz numarası/tablo girişi discuss-phase 9'da damgalanır** (henüz PHASES.md tablosunda yok). Faz 8 ✅; Faz 7 (Umami E1) ✅; Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y) ✅.
**Adım:** discuss — sıradaki adım **discuss-phase 9** (senaryo testi fazı kapsam tartışması, yeni oturum). v0.2 versiyon-sonu senaryo testi: uçtan-uca çapraz doğrulama (yeni feature üretmez), Faz 3 (v0.1 senaryo testi) deseninde; alt-sayfa harness'i (`subpages-a11y.spec.ts` + `a11y-helpers.ts`) yeniden kullanılır.
**İlerleme:** review-phase 8 (2026-07-02) tamamlandı — Faz 8 ✅: milestone 6/6, UAT 12/12, 8 kalite ekseni ✅, düzeltme task'ı yok. 5 alt sayfa a11y=100 çift-tema + axe WCAG-AA 0 (50 CI testi); TD4 premisi grep'le çürütüldü → TD5'e katlandı; iki-gate mühür `landmark-one-main`'i yakaladı (8.06). Guardrail (home a11y=100 / perf tabanı mobil 90/LCP 3164ms / masaüstü 100 / i18n parite / CLS≈0) regresyonsuz. **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 (S9-10) o adımda kapanır. **Kapsam dışı (bilinçli açık):** brief mobil perf (gerçek-cihaz), TB-C npm audit.
**Son Faz Dokümanı:** `phases/PHASE-8.md` (✅ Tamamlandı — retrospektif + kalite kontrol yazıldı). Sıradaki faz dokümanı discuss-phase 9'da oluşur.

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Aktif task yok — Faz 8 ✅ review tamamlandı. Sıradaki adım **discuss-phase 9** (senaryo testi fazı kapsam tartışması, yeni oturum). Senaryo testi fazı planlama gerektirir; task discuss/plan sonrası açılır.
**Durum:** Faz 9 (senaryo testi) girilmedi — adım=discuss. Faz 8 tüm task'ları ✅ (8.01→8.06) archive'da.
**İlerleme:** review-phase 8 tamamlandı (2026-07-02): Faz 8 ✅, milestone 6/6, UAT 12/12, 8 kalite ekseni ✅, düzeltme task'ı yok. Versiyon Sonu Durumu teknik_borç → senaryo_testi.

---

## Task Durumu (Aktif Faz)

> Faz 9 (senaryo testi) henüz girilmedi (discuss-phase 9 bekliyor) — task tablosu boş. Faz 8 ✅ (8.01-8.06 archive'da, detay `phases/PHASE-8.md`); Faz 7 (Umami E1) ✅; Faz 6 ✅ (6.06 ❌ iptal); Faz 5 ✅; Faz 4 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | _(Faz 9 discuss-phase bekliyor)_ | — | Senaryo testi fazı kapsamı discuss-phase 9'da damgalanır |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 8 task özetleri sıfırlandı** (Faz 8 detayları `phases/PHASE-8.md` + `tasks/archive/`).

_(Faz 9 henüz task üretmedi — ilk task tamamlanınca özet buraya gelir.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — Faz 8 ✅ review tamamlandı. Sıradaki: discuss-phase 9 (senaryo testi fazı). Bekleyen: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** 9 (geçici: senaryo testi) · adım=discuss — Faz 8 ✅ (8.01→8.06; review tamam); Faz 7 ✅; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: senaryo_testi
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-02 — review-phase 8: Faz 8 ✅ (retrospektif + 8-eksen kalite ✅); milestone 6/6, UAT 12/12, düzeltme yok. Versiyon Sonu Durumu teknik_borç → senaryo_testi. Aktif Faz 9 (geçici: senaryo testi), adım=discuss. Sıradaki: discuss-phase 9.
