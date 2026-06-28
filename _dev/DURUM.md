# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-29 — plan-phase 3: 9 task dokümanı oluşturuldu (TASK-3.01 kanonik ortam+build-tabanı + S1–S8 senaryo task'ları 3.02–3.09); PHASE-3 Task Listesi dolduruldu. Adım: verify-plan.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi
**Milestone:** S1–S8 senaryo kataloğu otonom koşuldu + bulgular kaydedildi + triyaj edildi; TR yolculuğu bütünsel-tutarlı + non-TR yüzeyleri tutarlı (parite/render/RTL) teyit edildi ("ölç+kaydet+karar ver" — geçiş peşinen varsayılmaz)
**Adım:** verify-plan → `/devflow:verify-plan 3` (yeni oturum)
**İlerleme:** Kapsam tartışması ✅ + Araştırma ✅ + Plan ✅ (9 task: 3.01 ortam+build-tabanı + S1–S8 → 3.02–3.09); plan review (verify-plan) bekliyor
**Faz Dokümanı:** `phases/PHASE-3.md`

---

## Aktif Versiyon

**Versiyon:** v0.1 — Ana sayfa TR içerik & ses revizesi (güçlü revizenin ilk versiyonu; baz: v3 canlı)
**Hedef:** Nasıl Çalışır 4 adım (R1) + Sektörler gym paneli tek-otomasyona (R2) + dürüstlük taraması (R4/F5) + hero ikincil CTA (R4/F6) ana sayfada tamam; marka sesi tutarlı; TR tek kaynak (çeviri versiyon-sınırına ertelendi)
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — (Faz 3 plan tamam; 9 task yazıldı ama henüz çalıştırılmadı; run-task verify-plan'dan sonra başlar — aktif task yok)
**Durum:** Faz 3 discuss ✅ + research ✅ + plan ✅ → verify-plan bekliyor
**İlerleme:** Adım verify-plan → `/devflow:verify-plan 3`

---

## Task Durumu (Aktif Faz)

> Faz 3 (Senaryo Testi) plan tamam; 9 task yazıldı (henüz çalıştırılmadı — run-task verify-plan'dan sonra). Açıklamalar `phases/PHASE-3.md` Task Listesi'nde. Faz 2 task'ları (2.01/2.02/2.03 ✅) arşivde (`tasks/archive/`), detay `phases/PHASE-2.md`.

| # | Task | Durum |
|---|------|-------|
| 3.01 | Kanonik ortam + build-temizliği tabanı (S8-build) | ⬜ Bekliyor |
| 3.02 | S1 giriş/yönlendirme matrisi (curl) | ⬜ Bekliyor |
| 3.03 | S5 taksonomi & dürüstlük (curl+grep 5 dil) | ⬜ Bekliyor |
| 3.04 | S6 5-dil bütünlük & non-TR tutarlılık (node+curl) | ⬜ Bekliyor |
| 3.05 | S2 tam TR yolculuğu (curl+Playwright) | ⬜ Bekliyor |
| 3.06 | S3 mod kombinasyonları / degradasyon (Playwright) | ⬜ Bekliyor |
| 3.07 | S4 kontroller & kalıcılık (Playwright) | ⬜ Bekliyor |
| 3.08 | S7 chatbot 0-token (kod+curl+Playwright) | ⬜ Bekliyor |
| 3.09 | S8 adversarial/holistik: JS-off SSG + race | ⬜ Bekliyor |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

> Faz 3 (Senaryo Testi) henüz task üretmedi (sıfırlandı — yeni faz). Faz 2 task özetleri için → `phases/PHASE-2.md` + git log.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** — (Faz 3 plan ✅; Adım: verify-plan → `/devflow:verify-plan 3`)
**Aktif Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi (verify-plan bekliyor)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-29 — plan-phase 3: 9 task dokümanı oluşturuldu (TASK-3.01 kanonik ortam+build-tabanı + S1–S8 senaryo task'ları 3.02–3.09); PHASE-3 Task Listesi dolduruldu. Adım: verify-plan.
