# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — run-task TASK-6.01 ✅: araç zinciri devcontainer'a kuruldu (node20+Chrome150+LH13.3.0, kullanıcı onayı); element-denetimli ölçüm. LCP elementi = **hero metni** (opacity:0 reveal altında) → L1 yüksek-etki doğrulandı. Mobil taban perf 62 / LCP 3608ms (software-GL; LCP/FCP/CLS önceki ortamla birebir, perf/TBT şişkin). Sıradaki TASK-6.02 (L1). Kod değişmedi.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 6 — Mobil perf / LCP (v0.2). Kapsam discuss-phase 6'da damgalandı: ana sayfa TR `/` mobil-birincil, brief hedef (≥95 / <2.5s) / craft tavan. Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** task → `/devflow:run-task` (yeni oturum): TASK-6.02 (L1: hero reveal opacity→transform-only). verify-plan ✅; TASK-6.01 ✅ (ölç-önce tamamlandı).
**İlerleme:** Ölç-önce tamam. **LCP elementi AMPİRİK TEYİTLİ = hero metni** (mobil `<p data-hero="sub">`, masaüstü `<span data-hero="l2">`; 5+3 koşuda stabil), canvas değil — her ikisi `Hero.tsx:18` opacity:0 reveal'i altında. **Çıkarım: L1 (TASK-6.02) doğrudan LCP elementini hedefler → yüksek etki, sıradaki.** L2 (WebGL deferral) main-thread/TBT'yi boşaltır (bu ortamda software-GL TBT'si 1842ms baskın → güçlü). Kök neden (research) doğrulandı: CPU-bound WebGL main-thread. Guardrail: a11y=100 çift-tema (CI) / CLS=0 / masaüstü 99-100 / i18n parite. **Element-denetimli çalışma tabanı (bu ortam: node20+Chrome150+SwiftShader):** mobil perf 62 / LCP 3608ms / FCP 1666ms / CLS 0 / TBT 1842ms; masaüstü 99 / 734ms. **Ortam uyarısı:** LCP/FCP/CLS önceki Faz-4 ortamıyla birebir (Lantern-deterministik, kıyaslanabilir); perf/TBT software-GL yüzünden şişkin (önceki 84/~200ms) → mutlak perf/TBT ortamlar arası kıyaslanamaz, faz-içi delta self-tutarlı. **Devralınan sahipli borç (kapsam dışı):** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi.
**Son Faz Dokümanı:** `phases/PHASE-6.md` (🔄 — ölç-önce tamamlandı, LCP elementi sabitlendi)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-6.02 — L1: Hero reveal opacity→transform-only (`Hero.tsx`). ⬜ Bekliyor (sıradaki).
**Durum:** Faz döngüsü `task` adımında. TASK-6.01 ✅ tamamlandı (2026-06-30); sıradaki: `/devflow:run-task` → TASK-6.02.
**İlerleme:** TASK-6.01 LCP elementini sabitledi = **hero metni** (opacity:0 reveal altında) → L1'in doğrudan LCP elementini hedeflediği ampirik doğrulandı. TASK-6.02 hedefi: `Hero.tsx:18` `gsap.set("[data-hero]",{opacity:0})` → transform-only (kayma imzası korunur, opacity-fade feda; kullanıcı onaylı K-R1). Doğrulama: 6.04 ara-ölç aynı ortamda (node20+Chrome150 kurulu) LCP delta'sını ölçer.

---

## Task Durumu (Aktif Faz)

> Faz 6 (mobil perf/LCP) task'ları plan-phase'de üretildi (7 task, bekliyor; doğrulama verify-plan'de). Faz 5 (test altyapısı D1) ✅; 5 task'ı (5.01-5.05) `tasks/archive/`'da, detay `phases/PHASE-5.md`. Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 6.01 | TASK-6.01 | ✅ Tamamlandı | Ölç-önce: LCP elementi = **hero metni** (ampirik); TR `/` mobil element-denetimli taban (perf 62 / LCP 3608ms, software-GL ortamı) |
| 6.02 | TASK-6.02 | ⬜ Bekliyor | L1: Hero reveal opacity→transform-only |
| 6.03 | TASK-6.03 | ⬜ Bekliyor | L2: WebGL init mobilde idle/post-load deferral |
| 6.04 | TASK-6.04 | ⬜ Bekliyor | Ara-ölç: L1+L2 sonrası median + L3/P2 karar kapısı |
| 6.05 | TASK-6.05 | ⬜ Bekliyor | L3: Fraunces SOFT/WONK axes budama (craft-nötr) |
| 6.06 | TASK-6.06 | ⬜ Bekliyor | P2: Living Flow mobil degradasyon ayarı (koşullu) |
| 6.07 | TASK-6.07 | ⬜ Bekliyor | Faz sonu ölçüm + kanonik artefakt + DECISIONS + guardrail |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-6.01 — Ölç-önce: LCP elementi + TR `/` mobil taban** (✅ 2026-06-30)
- Araç zinciri taze devcontainer'a kuruldu (node20+Chrome150+LH13.3.0, kullanıcı onayı); `package-lock.json` dokunulmadı, kod değişmedi (saf ölçüm task'ı).
- **LCP elementi = hero metni** (mobil sub `<p>`, masaüstü H1 `<span>`; 5+3 koşuda stabil), opacity:0 reveal altında → L1 (TASK-6.02) yüksek-etki doğrulandı.
- Taban (software-GL ortamı): mobil perf 62 / LCP 3608ms / CLS 0; LCP/FCP/CLS önceki ortamla birebir, perf/TBT şişkin (ortamlar arası kıyaslanamaz, faz-içi self-tutarlı).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-6.02 (L1: hero reveal opacity→transform-only) — ⬜ sıradaki. TASK-6.01 ✅. Sıradaki adım: `/devflow:run-task`
**Aktif Faz:** 6 — Mobil perf / LCP · adım=task; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — run-task TASK-6.01 ✅: araç zinciri devcontainer'a kuruldu (kullanıcı onayı), element-denetimli ölçüm. LCP elementi = hero metni (opacity:0 reveal altında) → L1 yüksek-etki doğrulandı. Mobil taban perf 62 / LCP 3608ms (software-GL ortamı). Sıradaki: `/devflow:run-task` → TASK-6.02 (L1).
