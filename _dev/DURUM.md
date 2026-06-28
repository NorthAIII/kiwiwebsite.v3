# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-28 — run-task TASK-2.01 ✅: TD1 non-TR çeviri senkronu (3 kalem × 4 dil = 24 değer; saf değer, 5×197 parite korundu; build temiz; /en /de /es /ar render + /ar RTL teyit). Sıradaki: `/devflow:run-task` (TASK-2.02).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 2 — v0.1 Versiyon-Sonu Teknik Borç Kapatma
**Milestone:** 4 dilde (EN/AR/DE/ES) v0.1 değer senkronu (TD1: R1 step + R2 gym + F6 CTA) + ölü anahtarlar (`forum.articles.*`, `proof.*`) 5 dilden silinmiş & build temiz (TD2) + ana sayfa Lighthouse (mobil+masaüstü) brief bütçesini (≥95 perf/≥100 a11y/LCP<2.5s) karşılıyor & taban kaydedildi (TD3)
**Adım:** task → `/devflow:run-task` (TASK-2.02)
**İlerleme:** TASK-2.01 ✅ (TD1 çeviri senkronu); TASK-2.02 (TD2 ölü anahtar) + TASK-2.03 (TD3 perf) sırada
**Faz Dokümanı:** `phases/PHASE-2.md`

---

## Aktif Versiyon

**Versiyon:** v0.1 — Ana sayfa TR içerik & ses revizesi (güçlü revizenin ilk versiyonu; baz: v3 canlı)
**Hedef:** Nasıl Çalışır 4 adım (R1) + Sektörler gym paneli tek-otomasyona (R2) + dürüstlük taraması (R4/F5) + hero ikincil CTA (R4/F6) ana sayfada tamam; marka sesi tutarlı; TR tek kaynak (çeviri versiyon-sınırına ertelendi)
**Versiyon Sonu Durumu:** teknik_borç

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-2.02 — TD2 ölü anahtar hijyeni (sıradaki; `/devflow:run-task` ile başlar)
**Durum:** ⬜ Bekliyor (plan review tamam, çalıştırılmaya hazır)
**İlerleme:** Adım task → `/devflow:run-task`

---

## Task Durumu (Aktif Faz)

> Faz 2 planlandı (3 task). Faz 1 task'ları arşivde (`tasks/archive/`), detay `phases/PHASE-1.md`.

| # | Task | Durum |
|---|------|-------|
| 2.01 | TASK-2.01 — TD1 non-TR çeviri senkronu | ✅ Tamamlandı |
| 2.02 | TASK-2.02 — TD2 ölü anahtar hijyeni | ⬜ Bekliyor |
| 2.03 | TASK-2.03 — TD3 perf/Lighthouse taban | ⬜ Bekliyor |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-2.01 — TD1 non-TR çeviri senkronu** ✅ (2026-06-28)
- 3 stale kalem (`hero.ctaSecondary` · `how.steps.{analyze,automate,report}.body` · `sectors.items.gyms.{automation,body}`) EN/AR/DE/ES'de TR ile senkronlandı — saf değer, 24 değer.
- 5×197 parite korundu (TR ile birebir set); `design.body`/title/`gyms.flow` dokunulmadı.
- `next build` temiz; /en /de /es /ar render + /ar `dir="rtl"` görsel teyit; F5 dürüstlük korundu.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-2.02 — TD2 ölü anahtar hijyeni (Adım: task → `/devflow:run-task`)
**Aktif Faz:** 2 — v0.1 Versiyon-Sonu Teknik Borç Kapatma (Adım: task)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-28 — run-task TASK-2.01 ✅: TD1 non-TR çeviri senkronu (3 kalem × 4 dil = 24 değer; saf değer, 5×197 parite korundu; build temiz; /en /de /es /ar render + /ar RTL teyit). Sıradaki: `/devflow:run-task` (TASK-2.02).
