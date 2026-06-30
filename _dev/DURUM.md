# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — run-task TASK-6.07 ✅ (faz-sonu final ölçüm): temsilî ortamda aynı-ortam before/after — Faz 6 lever'ları mobil perf 84→90 / LCP 3604→3164ms **ölçülebilir iyileştirdi** (sürücü L3 font budama; L1+L2 tek başına delta yok). Brief mobil bütçe hâlâ açık (90/3164ms); guardrail'ler yeşil. Fazdaki tüm tasklar tamam → sıradaki adım `/devflow:verify-phase 6`.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 6 — Mobil perf / LCP (v0.2). Kapsam discuss-phase 6'da damgalandı: ana sayfa TR `/` mobil-birincil, brief hedef (≥95 / <2.5s) / craft tavan. Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** verify → `/devflow:verify-phase 6` (yeni oturum): fazdaki tüm tasklar tamam (6.01 ✅ ölç-önce, 6.02 ✅ L1, 6.03 ✅ L2, 6.04 ✅ ara-ölç, 6.05 ✅ L3, 6.06 ❌ iptal craft-gate, **6.07 ✅ faz-sonu final**) → UAT.
**İlerleme:** **TASK-6.07 (faz-sonu final ölçüm) tamamlandı.** Temsilî ortamda (node20+Chrome150, flags birebir; 6.01/6.04'ün ağır-SwiftShader anomalisi tekrarlanmadı) aynı-ortam before/after: lever-öncesi baseline (`git checkout e5a4ef1 -- src` ile aynı ortamda build) **perf 84 / LCP 3604ms / TBT 261ms = Faz-4 birebir**; final (L1+L2+L3) **perf 90 / LCP 3164ms / FCP 1506 / TBT 178** (CLS≈0). LCP dağılımları örtüşmüyor → **milestone "ölçülebilir iyileşme" ✓** (−440ms/−12%). Masaüstü 100→100, LCP 764→694. **Attribution: sürücü L3 (font budama)** — L1+L2 tek başına delta yok (3604→3755; 6.04 çekirdek bulgusu temsilî ortamda da doğru), L3 eklenince 3755→3164 (Lantern simüle throttled font-download'u modeller → ~113KB↓ woff2 lab-görünür; **6.04 rafinajı:** network lever'ı atlanmıştı). **Brief mobil bütçe (≥95/<2.5s) hâlâ AÇIK** (90/3164ms) ama baseline'a göre kapandı; kalan açık = CPU-bound WebGL main-thread (P2 craft-gate'te iptal, 6.06). Masaüstü bütçe içinde. **Guardrail'ler yeşil:** a11y=100 çift-tema (Playwright/axe light+dark 0 WCAG AA), CLS≈0, masaüstü 100, i18n parite (vitest 6/6 + build 0 MISSING_MESSAGE). Kanonik artefakt `docs/perf/home-{mobile,desktop}-20260630-faz6.{html,json}` + attribution kanıtı `-{baseline,l1l2only}.json`; tam tablolar `docs/perf/README.md`. Hedef düşürülmedi/craft feda edilmedi (DECISIONS 2026-06-30). **Devralınan sahipli borç (kapsam dışı):** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi.
**Son Faz Dokümanı:** `phases/PHASE-6.md` (🔄 — tüm task'lar tamam (6.07 ✅ faz-sonu, 6.06 ❌ iptal); sıradaki verify-phase 6 → UAT)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Aktif task yok — Faz 6'nın tüm task'ları tamamlandı (6.07 ✅ faz-sonu final; 6.06 ❌ iptal). Sıradaki adım faz döngüsünde `/devflow:verify-phase 6` (UAT).
**Durum:** Faz döngüsü `verify` adımında. TASK-6.07 ✅ tamamlandı (2026-06-30, faz-sonu final ölçüm + kanonik artefakt + DECISIONS + guardrail regresyon).
**İlerleme:** TASK-6.07 fazın otoriter kapanış ölçümünü üretti (verify-phase'in dayanacağı sayılar). Temsilî ortamda aynı-ortam before/after lever'ların mobil perf/LCP'yi ölçülebilir iyileştirdiğini kanıtladı (84→90 / 3604→3164ms; sürücü L3). Brief mobil bütçe hâlâ açık, dürüstçe kaydedildi; guardrail'ler regresyonsuz. Detay → Aktif Faz "İlerleme" + `phases/PHASE-6.md` "Faz-Sonu Final Ölçüm" + `docs/perf/README.md`.

---

## Task Durumu (Aktif Faz)

> Faz 6 (mobil perf/LCP) task'ları plan-phase'de üretildi (7 task, bekliyor; doğrulama verify-plan'de). Faz 5 (test altyapısı D1) ✅; 5 task'ı (5.01-5.05) `tasks/archive/`'da, detay `phases/PHASE-5.md`. Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 6.01 | TASK-6.01 | ✅ Tamamlandı | Ölç-önce: LCP elementi = **hero metni** (ampirik); TR `/` mobil element-denetimli taban (perf 62 / LCP 3608ms, software-GL ortamı) |
| 6.02 | TASK-6.02 | ✅ Tamamlandı | L1: Hero reveal opacity→transform-only — hero LCP-uygun, kayma imzası korundu (build temiz, CLS=0) |
| 6.03 | TASK-6.03 | ✅ Tamamlandı | L2: WebGL init mobilde idle/post-load deferral — `requestIdleCallback`+2s-timeout (Safari fallback); masaüstü rAF korundu, build temiz, CLS=0 |
| 6.04 | TASK-6.04 | ✅ Tamamlandı | Ara-ölç: L1+L2 → Lantern delta YOK (LCP 3615≈3608ms); brief LCP lab'da açık; L3 yapılır, P2 tetiklendi (craft-gate) |
| 6.05 | TASK-6.05 | ✅ Tamamlandı | L3: Fraunces SOFT/WONK axes budama — build temiz, woff2 ~%34↓ (336→222KB), tipografi birebir |
| 6.06 | TASK-6.06 | ❌ İptal | P2: Living Flow mobil degradasyon ayarı — craft-gate'te **iptal** (kullanıcı kararı 2026-06-30); mobil LCP açığı kanıtlı Lantern artefaktı → imzaya dokunulmadı, kod değişmedi (DECISIONS 2026-06-30) |
| 6.07 | TASK-6.07 | ✅ Tamamlandı | Faz-sonu final: aynı-ortam before/after — mobil perf 84→90 / LCP 3604→3164ms (sürücü L3); brief mobil açık; guardrail'ler yeşil (a11y=100 çift-tema, CLS≈0, masaüstü 100, i18n parite) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-6.07 — Faz-sonu final ölçüm + kanonik artefakt + DECISIONS + guardrail** (✅ 2026-06-30)
- Temsilî ortamda (node20+Chrome150; 6.01/6.04 SwiftShader anomalisi yok) aynı-ortam before/after: baseline (lever öncesi, `git checkout e5a4ef1 -- src`) perf 84/LCP 3604ms = Faz-4 birebir → final (L1+L2+L3) **perf 90/LCP 3164ms/FCP 1506/TBT 178** (CLS≈0); masaüstü 100/694ms. **Milestone "ölçülebilir iyileşme" ✓** (−440ms/−12%, dağılımlar örtüşmüyor).
- **Attribution: sürücü L3** — L1+L2 tek başına delta yok (3604→3755; 6.04 doğrulandı), L3 eklenince 3755→3164 (Lantern simüle throttled font-download'u modeller; **6.04 rafinajı:** network lever'ı atlanmıştı). Brief mobil bütçe (≥95/<2.5s) hâlâ AÇIK (90/3164ms), dürüstçe kaydedildi (DECISIONS); kalan açık = CPU-bound WebGL (P2 iptal).
- Guardrail'ler yeşil: a11y=100 çift-tema (Playwright/axe light+dark 0 WCAG AA), CLS≈0, masaüstü 100, i18n parite (vitest 6/6 + build 0 MISSING_MESSAGE). Kanonik `home-{mobile,desktop}-20260630-faz6.{html,json}` + attribution `-{baseline,l1l2only}.json`. Kod değişmedi (ölçüm task'ı).

**TASK-6.06 — P2: Living Flow mobil degradasyon (craft-gate)** (❌ İptal 2026-06-30)
- Craft-gate'te kullanıcı kararıyla **iptal**; P2 koşulmadı, imza Living Flow'a (`FlowCanvas.tsx`/`LivingFlow.tsx`) dokunulmadı — **kod değişmedi**.
- Gerekçe: 6.04 kanıtladı ki mobil LCP açığı (~3.6s) **Lantern simülasyon artefaktı** (hero metni gözlemde ~185ms render; 3.6s = 4× CPU throttle WebGL main-thread simülasyonu) → imza craft'ı (üst eksen) simüle-sayı için riske atılmaz.
- DECISIONS 2026-06-30'a yazıldı (durable ilke: craft-gate'te "lab metriği açık" tek başına müdahaleyi haklı çıkarmaz; gerçek-cihaz-geçerli mi / lab artefaktı mı önce ayrıştırılır). Korunan tabanlar regresyonsuz (kod değişmedi).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — Faz 6'nın tüm task'ları tamam (6.01–6.05 ✅, 6.06 ❌ iptal, **6.07 ✅ faz-sonu final**). Sıradaki adım: `/devflow:verify-phase 6` (UAT).
**Aktif Faz:** 6 — Mobil perf / LCP · adım=verify; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — run-task TASK-6.07 ✅ (faz-sonu final ölçüm): temsilî ortamda aynı-ortam before/after — Faz 6 lever'ları mobil perf 84→90 / LCP 3604→3164ms ölçülebilir iyileştirdi (sürücü L3); brief mobil bütçe hâlâ açık (90/3164ms), dürüstçe kaydedildi; guardrail'ler yeşil. Fazdaki tüm tasklar tamam → sıradaki: `/devflow:verify-phase 6` (UAT).
