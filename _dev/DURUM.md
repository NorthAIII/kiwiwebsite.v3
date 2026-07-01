# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-01 — verify-phase 7 (re-run): "canlı +1 gördüm" iddiası kanıtla çürütüldü — `main` HEAD'in **89 commit gerisinde** (tüm v0.1+v0.2 revizesi unmerged), canlı kiwiailab.com HTML'inde Umami **yok** → Senaryo 9-10 gerçekten açık (sahte-geçmiş kaydedilmedi). Otomatik kontroller + otonom UAT 1-8 ✅ (başarısız/fix yok). Kullanıcı kararı (B): merge = tüm revizeyi ilk kez production'a almak → sırf bir UAT senaryosu için tetiklenmedi; 9-10 bilinçli **v0.2 production release**'e ertelendi, fazı kapat → **Adım=review**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 7 — Umami analytics (E1) (v0.2 son içerik fazı; discuss-phase 7 ✅ ile kapsam damgalandı). Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** review → verify-phase 7 tamam: otomatik kontroller + otonom UAT 1-8 ✅ (başarısız senaryo / fix task yok). **Senaryo 9-10 (canlı +1, milestone çekirdeği) açık** — bu oturumda kanıtlandı: `main` HEAD'in 89 commit gerisinde, canlıda Umami script'i yok; `data-domains=kiwiailab.com` preview saymaz. Kullanıcı kararı (B): merge = tüm revizeyi ilk kez production'a almak olduğundan ertelendi → 9-10 bilinçli **v0.2 production release** adımına ertelendi (release ayrı, bilinçli karar; MEMORY Süreç Disiplinleri "kod ekledim tamamdır deme" ile hizalı). Spec: `docs/UMAMI-ANALYTICS.md`; kararlar PHASE-7 + DECISIONS.
**İlerleme:** **verify-phase 7** (2026-07-01) — Otomatik: CI `fast`+`a11y` success (491e4ae/6d0d54a job-seviyesi teyit), dependabot/bot PR yok, security-review temiz (≥8 bulgu yok), lokal `npm test` 7/7 + build temiz. Otonom UAT 1-8 ✅ (5 locale head render + preload/RSC, dört spec değeri birebir, guardrail'ler yeşil, TS-strict build temiz, tema-FOUC çakışmasız, perf regresyon yok [7.02 artefaktları], degradasyon, data-domains kod-tarafı doğru). **Başarısız senaryo / CI failure / güvenlik bulgusu yok → düzeltme task'ı gerekmedi.** Kalan: canlı +1 (9-10) — bu oturumda `main` unmerged (89 commit geride) + canlıda Umami yok teyit edildi; bilinçli v0.2 production release'e ertelendi (B kararı). Versiyon Sonu Durumu içerik_fazları (değişmez). Devralınan sahipli borç (sonraki a11y/alt-sayfa fazına): alt-sayfa derin a11y + `text-pulse` süpürmesi; brief mobil açığın nihai doğrulaması gerçek-cihaz/Vercel field gerektirir (metodolojik duvar).
**Son Faz Dokümanı:** `phases/PHASE-7.md` (🔄 — 7.01 ✅, 7.02 ✅; UAT 1-8 ✅, 9-10 canlı +1 v0.2 release'e ertelendi; adım=review)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Fazda aktif/bekleyen task yok — TASK-7.01 ✅ + TASK-7.02 ✅ tamamlandı; verify-phase UAT'de başarısız senaryo yok → düzeltme task'ı açılmadı.
**Durum:** Faz 7 aktif, adım=review. Otomatik + otonom UAT (1-8) geçti; milestone çekirdeği 9-10 (canlı +1) bilinçli v0.2 production release'e ertelendi.
**İlerleme:** 7.01 + 7.02 ✅; verify-phase otomatik kontroller + otonom UAT 1-8 ✅. Kalan = canlı +1 doğrulaması (9-10) — release sonrası kiwiailab.com panelinde (merge henüz yapılmadı; `main` 89 commit geride, canlıda Umami yok).

---

## Task Durumu (Aktif Faz)

> Faz 7 (Umami E1): 7.01 ✅ + 7.02 ✅ tamamlandı → verify bekliyor. Faz 6 (mobil perf/LCP) ✅; 7 task'ı (6.01-6.07; 6.06 ❌ iptal) `tasks/archive/`'da, detay `phases/PHASE-6.md`. Faz 5 (test altyapısı D1) ✅; 5.01-5.05 archive'da. Faz 4 (v0.2 a11y) ✅; 4.01-4.08 archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 7.01 | TASK-7.01 | ✅ Tamamlandı | Umami bileşeni + `[locale]/layout.tsx` head entegrasyonu + izole render testi |
| 7.02 | TASK-7.02 | ✅ Tamamlandı | Before/after Lighthouse perf regresyon doğrulaması — regresyon YOK, preconnect eklenmedi |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-7.02** ✅ (2026-07-01) — Umami sonrası before/after Lighthouse regresyon doğrulaması:
- Same-env before/after (TR `/` cookie, mobil ×5 + masaüstü ×3 median): mobil before 90/LCP 3009ms → after 88/2714ms (bantlar örtüşük); masaüstü 100/611→660ms; CLS 0. **Regresyon YOK** (LCP/FCP/CLS Faz 6 tabanının altında).
- `afterInteractive` script LCP penceresinden sonra yükleniyor → yeni origin LCP'ye zarar vermiyor (network-requests audit'i isteğin fiilen alındığını doğruladı). preconnect eklenmedi (YAGNI); DECISIONS'a girdi gerekmedi.
- Artefaktlar `docs/perf/*-faz7.{html,json}` + `-before.json`; README Faz 7 bölümü. Kod değişmedi (yalnız ölçüm+doküman); npm test yeşil (7).

**TASK-7.01** ✅ (2026-07-01) — Umami analytics entegrasyonu:
- `components/analytics/umami-script.tsx` (YENİ) — `next/script` `<Script afterInteractive>` spec değerleriyle; `[locale]/layout.tsx` head'ine `<UmamiScript />`.
- İzole render testi (`tests/umami-script.test.tsx`, `vi.mock("next/script")`); vitest.config'e `@/→src` alias (ilk `@/` component testi).
- npm test yeşil (7), build temiz, script `data-website-id` ile 5 locale head'inde; tema-FOUC ile çakışmasız. Canlı +1 → verify-phase.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Fazda bekleyen task yok — 7.01 ✅ + 7.02 ✅; verify-phase UAT 1-8 ✅ (düzeltme task'ı yok). Kalan: canlı +1 (9-10) v0.2 release'e ertelendi.
**Aktif Faz:** 7 — Umami analytics (E1) · adım=review; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-01 — verify-phase 7 (re-run): otomatik kontroller + otonom UAT 1-8 ✅; başarısız/fix yok. "Canlı +1" iddiası kanıtla çürütüldü (`main` 89 commit geride, canlıda Umami yok) → 9-10 açık, bilinçli v0.2 production release'e ertelendi (B). Adım=review.
