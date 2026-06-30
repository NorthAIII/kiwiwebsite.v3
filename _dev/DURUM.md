# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — run-task TASK-6.05 ✅ (L3): Fraunces `axes` `["opsz","SOFT","WONK"]`→`["opsz"]` iki dosyada birlikte (`layout.tsx`+`not-found.tsx`); SOFT/WONK ölü eksendi (grep-doğrulandı). Build temiz (37/37); woff2 toplamı 336.532→222.624 bytes (~113KB / ~%34 düşüş, stash+rebuild ampirik); tipografi birebir. Craft-nötr hijyen + drift kapatma. Sıradaki TASK-6.06 (P2 — craft-gate, kullanıcı onayı önerilir).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 6 — Mobil perf / LCP (v0.2). Kapsam discuss-phase 6'da damgalandı: ana sayfa TR `/` mobil-birincil, brief hedef (≥95 / <2.5s) / craft tavan. Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** task → `/devflow:run-task` (yeni oturum): TASK-6.06 (P2: Living Flow mobil degradasyon). TASK-6.01 ✅ (ölç-önce), 6.02 ✅ (L1), 6.03 ✅ (L2), 6.04 ✅ (ara-ölç/karar kapısı), 6.05 ✅ (L3). **6.06 (P2) craft-gate: kullanıcı craft-onayı önerilir (otomatik koşulmaz).**
**İlerleme:** Ölç-önce + L1 + L2 + ara-ölç + L3 tamam. **L3 (6.05):** Fraunces SOFT/WONK ölü eksenleri budandı (iki dosya birlikte); woff2 336→222KB (~%34↓, ampirik), tipografi birebir, build temiz — craft-nötr hijyen. **LCP elementi = hero metni** (mobil `<p data-hero="sub">`, masaüstü `<span data-hero="l2">`; değişmedi). **Ara-ölç (TASK-6.04) bulgusu — KARAR KAPISI:** L1+L2 sonrası mobil median **ölçülebilir Lantern delta üretmedi** (perf 62=62; LCP 3615ms ≈ 3608ms taban +7ms gürültü; FCP 1665; CLS≈7.3e-6; TBT 1898). Masaüstü perf **100** (guardrail 99-100 ✓), CLS≈0. **Kök neden kanıtlı (Lantern simülasyon artefaktı):** observed elementRenderDelay 6.01=173.3ms / 6.04=172.9ms birebir → hero metni gözlemde zaten ~185ms'de render; 3.6s, 4× CPU throttle altında WebGL main-thread'in *simülasyonu*. L1 (opacity-gate observed darboğaz değildi) + L2 (rIC throttle'sız trace'te anında ateşler → Lantern erken-bloke simüle eder) **gerçek-cihaz-doğru ama lab göremez**; ikisi commit'li korunur (regresyon yok). **Brief LCP (<2.5s) lab'da AÇIK** (mobil ~3.6s). **Karar:** L3 (6.05) YAP (craft-nötr hijyen, lab LCP'yi oynatmaz); P2 (6.06) tetiklendi (lab'da tek kalan lever = WebGL iş yükü) ama craft-duyarlı + gerekçe simüle-sayı → **kullanıcı craft-onayı önerilir**, iptal değil. **Metodolojik duvar:** bu lab LCP ekseninde lever ilerlemesini güvenilir ölçemez → gerçek doğrulama gerçek-cihaz/Vercel field (dürüst kayıt `docs/perf/README.md`). Guardrail: a11y=100 çift-tema (CI) / CLS≈0 / masaüstü 100 / i18n parite. **Ortam:** node20+Chrome150+SwiftShader; LCP/FCP/CLS Lantern-deterministik (kıyaslanabilir), perf/TBT software-GL şişkin (mutlak kıyas dışı). **Devralınan sahipli borç (kapsam dışı):** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi.
**Son Faz Dokümanı:** `phases/PHASE-6.md` (🔄 — L1+L2+ara-ölç+L3 tamam; sıradaki P2 6.06 craft-gate, sonra faz-sonu 6.07)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-6.06 — P2: Living Flow mobil degradasyon ayarı (DPR/particle/erken-static). ⬜ Bekliyor (sıradaki) — **craft-gate: kullanıcı craft-onayı önerilir (otomatik koşulmaz).**
**Durum:** Faz döngüsü `task` adımında. TASK-6.05 ✅ tamamlandı (2026-06-30); sıradaki: `/devflow:run-task` → TASK-6.06. **Not: 6.06 craft-duyarlı + gerekçe simüle-sayı → run-task öncesi kullanıcı craft-onayı önerilir.**
**İlerleme:** TASK-6.05 (L3) tamamlandı: Fraunces `axes` `["opsz","SOFT","WONK"]`→`["opsz"]` iki dosyada birlikte (`layout.tsx`+`not-found.tsx`). SOFT/WONK hiçbir yerde `font-variation-settings` ile kullanılmıyordu (grep-doğrulandı, ölü eksen); `opsz` korundu (optical-sizing otomatik). Build temiz (37/37); woff2 toplamı **336.532→222.624 bytes (~113KB / ~%34 düşüş)** stash+baseline-rebuild ile ampirik teyit; tipografi birebir (kullanılmayan eksen → render değişmez), fontlar prerender'da yüklü. Craft-nötr hijyen + tekrar-tanım drift kapatma.

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
| 6.06 | TASK-6.06 | ⬜ Bekliyor | P2: Living Flow mobil degradasyon ayarı — **tetiklendi ama craft-gate** (kullanıcı craft-onayı önerilir) — sıradaki |
| 6.07 | TASK-6.07 | ⬜ Bekliyor | Faz sonu ölçüm + kanonik artefakt + DECISIONS + guardrail |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-6.05 — L3: Fraunces SOFT/WONK axes budama** (✅ 2026-06-30)
- Fraunces `axes: ["opsz","SOFT","WONK"]` → `["opsz"]` iki dosyada birlikte (`layout.tsx`+`not-found.tsx`, drift kapatma). SOFT/WONK hiçbir yerde `font-variation-settings` ile kullanılmıyordu (grep-doğrulandı, ölü eksen); `opsz` korundu (optical-sizing otomatik).
- Build temiz (37/37); woff2 toplamı **336.532→222.624 bytes (~113KB / ~%34 düşüş)** stash+baseline-rebuild ile ampirik teyit. Tipografi birebir (kullanılmayan eksen → render değişmez), fontlar prerender'da yüklü.
- Craft-nötr hijyen; localhost'ta bile ölçülebilir kazanç, Vercel'de network etkisi daha görünür (faz-sonu 6.07'de teyit edilir).

**TASK-6.04 — Ara-ölç: L1+L2 median + L3/P2 karar kapısı** (✅ 2026-06-30)
- Hazır ortamda (node20+Chrome150, kurulum gerekmedi; lock dokunulmadı) fresh build + 5 mobil/3 masaüstü element-denetimli LH median. Kod değişmedi.
- **L1+L2 ölçülebilir Lantern delta YOK:** mobil perf 62=62, LCP 3615≈3608ms (+7 gürültü), FCP 1665, CLS≈0, TBT 1898; masaüstü perf 100 (guardrail ✓). Kök neden kanıtlı = Lantern simülasyon artefaktı (observed renderDelay 173↔173ms birebir; rIC throttle'sız anında ateşler; L1/L2 gerçek-cihaz-doğru ama lab göremez).
- **Karar:** brief LCP lab'da açık → L3 (6.05) YAP (craft-nötr); P2 (6.06) tetiklendi ama craft-gate (kullanıcı onayı). Metodolojik duvar dürüst kaydedildi (gerçek doğrulama = gerçek-cihaz/Vercel field).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-6.06 (P2: Living Flow mobil degradasyon) — ⬜ sıradaki, **craft-gate**. 6.01 ✅, 6.02 ✅, 6.03 ✅, 6.04 ✅, 6.05 ✅. Sıradaki adım: `/devflow:run-task` (kullanıcı craft-onayı önerilir).
**Aktif Faz:** 6 — Mobil perf / LCP · adım=task; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — run-task TASK-6.05 ✅ (L3): Fraunces `axes` `["opsz","SOFT","WONK"]`→`["opsz"]` iki dosyada birlikte; SOFT/WONK ölü eksendi (grep-doğrulandı). Build temiz (37/37); woff2 336.532→222.624 bytes (~113KB / ~%34 düşüş, stash+rebuild ampirik); tipografi birebir. Craft-nötr hijyen + drift kapatma. Sıradaki: `/devflow:run-task` → TASK-6.06 (P2 — craft-gate, kullanıcı onayı önerilir).
