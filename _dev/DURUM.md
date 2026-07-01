# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-01 — review-phase 7: Faz 7 (Umami E1) ✅ — retrospektif + 8-eksen kalite kontrolü (hepsi ✅) PHASE-7'ye yazıldı; milestone kod-tarafı+perf tam, canlı çekirdek (S9-10) dürüstçe açık → **v0.2 production release**'e ertelendi (E1 MODULE-MAP'te 🟡; DECISIONS'a karar). v0.2 içerik fazları (4-7) tamam → sırada **versiyon-sonu teknik borç fazı** (discuss-phase 8 promote eder).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 8 — versiyon-sonu **teknik borç** fazı (v0.2; geçici ad — Sıradaki Fazlar'dan, discuss-phase 8 numara+kapsam damgalar). Faz 7 (Umami E1) ✅; Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅ — v0.2 içerik fazları (4-7) tamamlandı.
**Adım:** discuss → v0.2 içerik fazları bitti; sırada versiyon-sonu sabit fazları (teknik borç → senaryo testi → prd-review). discuss-phase 8 versiyon-sonu tespitini yapıp teknik borç fazını promote eder (Versiyon Sonu Durumu içerik_fazları → teknik_borç geçişi orada).
**İlerleme:** **review-phase 7** (2026-07-01) — Faz 7 ✅: retrospektif + 8 kalite ekseni (hepsi ✅) PHASE-7'ye yazıldı. Milestone kod-tarafı + Faz 6 perf tabanı tam; canlı gözle-doğrulama çekirdeği (S9-10) yapısal kısıt gereği (data-domains preview saymaz + merge=89 commit'lik tüm revize) bilinçle **v0.2 production release**'e ertelendi (kullanıcı kararı B; dürüst kayıt, sahte-geçmiş engellendi). E1 MODULE-MAP'te 🟡. **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 + genel canlı smoke o adımda kapanır. Devralınan sahipli borç (sonraki a11y/alt-sayfa fazına): alt-sayfa derin a11y + `text-pulse` süpürmesi; brief mobil açığın nihai doğrulaması gerçek-cihaz/Vercel field gerektirir (metodolojik duvar).
**Son Faz Dokümanı:** `phases/PHASE-7.md` (✅ Tamamlandı — 7.01 ✅, 7.02 ✅; UAT 1-8 ✅, S9-10 canlı +1 v0.2 production release'e ertelendi; retrospektif + kalite kontrol yazıldı)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Yeni fazın (8 — versiyon-sonu teknik borç) task'ları henüz yok — discuss-phase → plan-phase üretir. Faz 7 kapandı (7.01 ✅ + 7.02 ✅ archive'da).
**Durum:** Faz 8 aktif, adım=discuss. Faz döngüsü başlangıcı (kapsam tartışması bekliyor).
**İlerleme:** Faz 7 review-phase ile ✅ kapandı. Bekleyen versiyon-sonu aksiyonu: v0.2 production release (Umami canlı +1 orada kapanır).

---

## Task Durumu (Aktif Faz)

> Faz 8 (versiyon-sonu teknik borç) henüz planlanmadı — task tablosu discuss-phase → plan-phase 8'de doldurulur. Faz 7 (Umami E1) ✅; 7.01-7.02 `tasks/archive/`'da, detay `phases/PHASE-7.md`. Faz 6 ✅ (6.01-6.07; 6.06 ❌ iptal); Faz 5 ✅ (5.01-5.05); Faz 4 ✅ (4.01-4.08) — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | (henüz yok) | — | Faz 8 kapsamı discuss-phase 8'de damgalanır; task'lar plan-phase'de yazılır |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

_(Yeni faza [8] geçildi — Son Task Özetleri sıfırlandı. Faz 7 task'ları: `phases/PHASE-7.md` + `tasks/archive/TASK-7.0{1,2}.md`.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — Faz 8 (teknik borç) henüz planlanmadı; task'lar discuss-phase → plan-phase 8'de. Bekleyen: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** 8 — versiyon-sonu teknik borç (v0.2; geçici ad) · adım=discuss; Faz 7 ✅; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-01 — review-phase 7: Faz 7 (Umami E1) ✅ (retrospektif + 8 kalite ekseni). v0.2 içerik fazları (4-7) tamam → Aktif Faz 8 (versiyon-sonu teknik borç), adım=discuss. Canlı +1 v0.2 production release'e ertelendi (E1 🟡, DECISIONS'a karar). Sıradaki: discuss-phase 8.
