# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — run-task TASK-6.03 ✅ (L2): `LivingFlow.tsx` WebGL init mobilde 1-rAF → `requestIdleCallback`+2s-timeout (Safari: post-load fallback) ile LCP penceresi dışına ertelendi; masaüstü rAF korundu. Static base wash erteleme boyunca render (SSR'da mevcut, canvas yok → hero boş kalmaz). Build temiz; CLS=0; unmount cleanup tam. Gözle craft + main-thread median teyidi 6.04 + gerçek tarayıcıya bırakıldı. Sıradaki TASK-6.04 (ara-ölç).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 6 — Mobil perf / LCP (v0.2). Kapsam discuss-phase 6'da damgalandı: ana sayfa TR `/` mobil-birincil, brief hedef (≥95 / <2.5s) / craft tavan. Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** task → `/devflow:run-task` (yeni oturum): TASK-6.04 (ara-ölç: L1+L2 median + L3/P2 karar kapısı). TASK-6.01 ✅ (ölç-önce), TASK-6.02 ✅ (L1), TASK-6.03 ✅ (L2).
**İlerleme:** Ölç-önce tamam. **LCP elementi AMPİRİK TEYİTLİ = hero metni** (mobil `<p data-hero="sub">`, masaüstü `<span data-hero="l2">`; 5+3 koşuda stabil), canvas değil — her ikisi `Hero.tsx:18` opacity:0 reveal'i altında. **L1 (TASK-6.02) ✅:** hero reveal transform-only (`opacity:0` kaldırıldı, kayma imzası korundu → LCP-uygun). **L2 (TASK-6.03) ✅:** `LivingFlow.tsx` WebGL init mobilde `requestIdleCallback`+2s-timeout (Safari: post-load fallback) ile LCP penceresi dışına ertelendi; masaüstü rAF korundu; static base wash erteleme boyunca render; build temiz, CLS=0, cleanup tam. L1+L2 deltası TASK-6.04 ara-ölçte (bu ortamda software-GL TBT'si 1842ms baskın → L2 burada da güçlü). Kök neden (research) doğrulandı: CPU-bound WebGL main-thread. Guardrail: a11y=100 çift-tema (CI) / CLS=0 / masaüstü 99-100 / i18n parite. **Element-denetimli çalışma tabanı (bu ortam: node20+Chrome150+SwiftShader):** mobil perf 62 / LCP 3608ms / FCP 1666ms / CLS 0 / TBT 1842ms; masaüstü 99 / 734ms. **Ortam uyarısı:** LCP/FCP/CLS önceki Faz-4 ortamıyla birebir (Lantern-deterministik, kıyaslanabilir); perf/TBT software-GL yüzünden şişkin (önceki 84/~200ms) → mutlak perf/TBT ortamlar arası kıyaslanamaz, faz-içi delta self-tutarlı. **Devralınan sahipli borç (kapsam dışı):** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi.
**Son Faz Dokümanı:** `phases/PHASE-6.md` (🔄 — L1+L2 uygulandı; sıradaki ara-ölç 6.04)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-6.04 — Ara-ölç: L1+L2 sonrası median + L3/P2 karar kapısı. ⬜ Bekliyor (sıradaki).
**Durum:** Faz döngüsü `task` adımında. TASK-6.03 ✅ tamamlandı (2026-06-30); sıradaki: `/devflow:run-task` → TASK-6.04.
**İlerleme:** TASK-6.03 L2'yi uyguladı: `LivingFlow.tsx` mobil (low-power) WebGL init 1-rAF → `requestIdleCallback`+2s-timeout (Safari fallback: `load` sonrası / readyState complete ise setTimeout 200ms) ile LCP penceresi dışına ertelendi; masaüstü rAF regresyonsuz korundu. Static base wash erteleme boyunca render (SSR `tr.html`'de mevcut, canvas=0 → hero boş kalmaz). Build temiz (37/37); CLS=0 yapı gereği; tüm yollarda unmount cleanup. TS strict `in`-narrowing tuzağı `typeof window.prop` guard'ıyla çözüldü (retro adayı). Gözle craft + main-thread "Other" LCP-dışı median teyidi: 6.04 ara-ölç + gerçek tarayıcı kullanıcı onayı. TASK-6.04 hedefi: aynı node20+Chrome150 ortamında L1+L2 median LCP delta'sı + L3/P2 karar kapısı.

---

## Task Durumu (Aktif Faz)

> Faz 6 (mobil perf/LCP) task'ları plan-phase'de üretildi (7 task, bekliyor; doğrulama verify-plan'de). Faz 5 (test altyapısı D1) ✅; 5 task'ı (5.01-5.05) `tasks/archive/`'da, detay `phases/PHASE-5.md`. Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 6.01 | TASK-6.01 | ✅ Tamamlandı | Ölç-önce: LCP elementi = **hero metni** (ampirik); TR `/` mobil element-denetimli taban (perf 62 / LCP 3608ms, software-GL ortamı) |
| 6.02 | TASK-6.02 | ✅ Tamamlandı | L1: Hero reveal opacity→transform-only — hero LCP-uygun, kayma imzası korundu (build temiz, CLS=0) |
| 6.03 | TASK-6.03 | ✅ Tamamlandı | L2: WebGL init mobilde idle/post-load deferral — `requestIdleCallback`+2s-timeout (Safari fallback); masaüstü rAF korundu, build temiz, CLS=0 |
| 6.04 | TASK-6.04 | ⬜ Bekliyor | Ara-ölç: L1+L2 sonrası median + L3/P2 karar kapısı |
| 6.05 | TASK-6.05 | ⬜ Bekliyor | L3: Fraunces SOFT/WONK axes budama (craft-nötr) |
| 6.06 | TASK-6.06 | ⬜ Bekliyor | P2: Living Flow mobil degradasyon ayarı (koşullu) |
| 6.07 | TASK-6.07 | ⬜ Bekliyor | Faz sonu ölçüm + kanonik artefakt + DECISIONS + guardrail |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-6.03 — L2: WebGL init mobilde idle/post-load deferral** (✅ 2026-06-30)
- `LivingFlow.tsx` useEffect cihaza göre dallandı: masaüstü/yüksek-güç → mevcut `requestAnimationFrame` korundu (regresyonsuz); mobil/low-power → `requestIdleCallback(start,{timeout:2000})`, Safari fallback `load` sonrası (veya readyState complete ise) `setTimeout(200)`; tüm yollarda cleanup. Tek dosya.
- Build temiz (37/37); SSR `tr.html`'de static base wash mevcut + `<canvas>`=0 → erteleme penceresinde hero boş kalmaz; CLS=0 yapı gereği.
- TS strict tuzağı: `"prop" in window` negatif dalda `window`'u `never`'a daraltır → guard `typeof window.requestIdleCallback === "function"`'a alındı. Gözle craft + main-thread median teyidi 6.04 + gerçek tarayıcıya bırakıldı.

**TASK-6.02 — L1: Hero reveal opacity→transform-only** (✅ 2026-06-30)
- `Hero.tsx:18` reveal `opacity:0` kaldırıldı (LCP adaylığını kıran kanal), kayma `y` imzası + stagger/ease/süre birebir korundu (fade feda — onaylı K-R1); tek dosya, 8 satır diff.
- Build temiz (37/37 sayfa); prerender `tr.html`'de inline opacity:0 yok → hero metni ilk paint'te LCP-uygun; CLS=0 yapı gereği (transform compositor-only).
- Gözle craft nihai onayı (light+dark motion + cursor/scroll) headless software-GL'de faithful yapılamadı → gerçek tarayıcıda kullanıcıya bırakıldı; LCP delta TASK-6.04 ara-ölçte.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-6.04 (ara-ölç: L1+L2 median + L3/P2 karar kapısı) — ⬜ sıradaki. TASK-6.01 ✅, TASK-6.02 ✅, TASK-6.03 ✅. Sıradaki adım: `/devflow:run-task`
**Aktif Faz:** 6 — Mobil perf / LCP · adım=task; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — run-task TASK-6.03 ✅ (L2): `LivingFlow.tsx` WebGL init mobilde `requestIdleCallback`+2s-timeout (Safari: post-load fallback) ile LCP penceresi dışına ertelendi; masaüstü rAF korundu, static base wash erteleme boyunca render, build temiz, CLS=0, cleanup tam. Gözle craft + median teyit 6.04 + gerçek tarayıcıya bırakıldı. Sıradaki: `/devflow:run-task` → TASK-6.04 (ara-ölç).
