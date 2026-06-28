# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-28 — verify-phase 2: UAT **14/14 geçti**, 0 kaldı (otonom mod); CI/otomatik araç yok (atlandı), security temiz (faz yalnız i18n JSON + doküman) → düzeltme task'ı yok. Adım: review → `/devflow:review-phase 2`.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 2 — v0.1 Versiyon-Sonu Teknik Borç Kapatma
**Milestone:** 4 dilde (EN/AR/DE/ES) v0.1 değer senkronu (TD1: R1 step + R2 gym + F6 CTA) + ölü anahtarlar (`forum.articles.*`, `proof.*`) 5 dilden silinmiş & build temiz (TD2) + ana sayfa Lighthouse (mobil+masaüstü) tabanı kaydedildi (TD3 — masaüstü bütçeyi geçer; mobil perf/LCP + a11y açığı bulundu, regresyon değil, ertelendi)
**Adım:** review → `/devflow:review-phase 2` (UAT 14/14 ✅; otomatik kontrol bulgusu yok)
**İlerleme:** TASK-2.01 ✅ (TD1 çeviri senkronu) · TASK-2.02 ✅ (TD2 ölü anahtar hijyeni) · TASK-2.03 ✅ (TD3 perf tabanı + bütçe açığı ertelendi) — tüm task'lar tamam; **UAT 14/14 geçti**
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

**Task:** — (fazın tüm task'ları tamamlandı; UAT geçti; aktif task yok)
**Durum:** ✅ UAT 14/14 geçti → faz review bekliyor
**İlerleme:** Adım review → `/devflow:review-phase 2`

---

## Task Durumu (Aktif Faz)

> Faz 2 planlandı (3 task). Faz 1 task'ları arşivde (`tasks/archive/`), detay `phases/PHASE-1.md`.

| # | Task | Durum |
|---|------|-------|
| 2.01 | TASK-2.01 — TD1 non-TR çeviri senkronu | ✅ Tamamlandı |
| 2.02 | TASK-2.02 — TD2 ölü anahtar hijyeni | ✅ Tamamlandı |
| 2.03 | TASK-2.03 — TD3 perf/Lighthouse taban | ✅ Tamamlandı |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-2.03 — TD3 perf/Lighthouse taban** ✅ (2026-06-28)
- Yerel prod build, npx-cache lighthouse@13.3.0 + Chrome 149, mobil+masaüstü çoklu koşu → `docs/perf/`. Masaüstü perf **100**/LCP 0.69s/CLS 0 ✓; mobil perf **87**/LCP 3.1s ✗; a11y **89** her iki preset ✗.
- **Bütçe karşılanmadı** (perf≥95/a11y≥100/LCP<2.5s; CLS ✓) — regresyon değil (keşfedilen mevcut durum). Bulgu kullanıcıya getirildi → **ertelendi** (DECISIONS 2026-06-28).
- Metodoloji tuzağı: ilk mobil koşular host load avg 88 nedeniyle gürültülüydü (TBT 206↔5065ms); taban düşük-yük (~5) koşularından alındı.

**TASK-2.02 — TD2 ölü anahtar hijyeni** ✅ (2026-06-28)
- `proof.*` + `forum.articles.*` (14 yaprak) 5 dilden silindi; her dil 197→**183** parite; path+brace-sayımı (satır no'ya güvenmedi), cerrahi diff 5×`0/26` (saf silme).
- 5-dil parse temiz (`json.loads`); `next build` ✓ 37/37 static, exit 0 — MISSING_MESSAGE yok.
- `Forum.tsx` yalnız `label/title/sub/featured.*/featured2.*/cta/note` tüketiyor → etkilenmedi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** — (fazın tüm task'ları ✅ + UAT 14/14 geçti; Adım: review → `/devflow:review-phase 2`)
**Aktif Faz:** 2 — v0.1 Versiyon-Sonu Teknik Borç Kapatma (Adım: review)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-28 — verify-phase 2: UAT **14/14 geçti**, 0 kaldı (otonom mod); CI/otomatik araç yok (atlandı), security temiz (faz yalnız i18n JSON + doküman) → düzeltme task'ı yok. Adım: review → `/devflow:review-phase 2`.
