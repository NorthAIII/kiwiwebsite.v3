# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-28 — verify-plan: Faz 1 plan review tamam (3 task doğrulandı, referanslar gerçek; 1 yapısal düzeltme: TASK-1.01 non-TR automate/report ölçüm tekrarı önlendi); Adım task'a geçti.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 1 — Ana sayfa TR içerik & ses revizesi
**Milestone:** v0.1 ana sayfa içerik & ses: R1 Nasıl Çalışır 4 adım (Analiz·Çözüm·Otomasyon·Raporlama) + R2 gym paneli tek-otomasyona + F5 dürüstlük taraması + F6 hero ikincil CTA; TR tek kaynak
**Adım:** task → `/devflow:run-task`
**İlerleme:** 0/3 task (plan + review tamam; TASK-1.01'den başlanır)
**Faz Dokümanı:** `phases/PHASE-1.md`

---

## Aktif Versiyon

**Versiyon:** v0.1 — Ana sayfa TR içerik & ses revizesi (güçlü revizenin ilk versiyonu; baz: v3 canlı)
**Hedef:** Nasıl Çalışır 4 adım (R1) + Sektörler gym paneli tek-otomasyona (R2) + dürüstlük taraması (R4/F5) + hero ikincil CTA (R4/F6) ana sayfada tamam; marka sesi tutarlı; TR tek kaynak (çeviri versiyon-sınırına ertelendi)
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-1.01 — R1 Nasıl Çalışır 3→4 adım (component + 5-dil i18n) — `tasks/TASK-1.01.md`
**Durum:** ⬜ Bekliyor (run-task ile başlanır)
**İlerleme:** Plan review tamam; sıradaki adım TASK-1.01 çalıştırma

---

## Task Durumu (Aktif Faz)

| # | Task | Durum |
|---|------|-------|
| 1.01 | R1 — Nasıl Çalışır 3→4 adım (component + 5-dil i18n) | ⬜ Bekliyor |
| 1.02 | R2 — Sektörler gym paneli tek-otomasyona (TR i18n) | ⬜ Bekliyor |
| 1.03 | R4 — Ana sayfa ses & dürüstlük (F6 + F5/R3 checkpoint) | ⬜ Bekliyor |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

_(Henüz tamamlanmış task yok.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-1.01 (`tasks/TASK-1.01.md`)
**Aktif Faz:** 1 (Adım: task → `/devflow:run-task`)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-28 — verify-plan: Faz 1 plan review tamam (3 task doğrulandı, referanslar gerçek; 1 yapısal düzeltme: TASK-1.01 non-TR automate/report ölçüm tekrarı önlendi); Adım task'a geçti.
