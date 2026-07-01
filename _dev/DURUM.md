# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-01 — verify-plan 8: plan review tamam (5 task fresh-context doğrulandı; referans gerçeklik-kontrolü — selector/token/route/CI tümü birebir), 0 mekanik + 0 yapısal düzeltme. Adım=verify-plan→**task**. Sıradaki: run-task 8.01 (ayrı oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 8 — v0.2 versiyon-sonu **teknik borç kapatma** fazı (kapsam discuss-phase 8'de damgalandı). Faz 7 (Umami E1) ✅; Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅ — v0.2 içerik fazları (4-7) tamamlandı.
**Adım:** task → plan review tamam (verify-plan 8: 5 task fresh-context doğrulandı, 0 mekanik + 0 yapısal). Faz 8 kapsamı: alt-sayfa derin a11y (5 alt sayfa, 5 dil/AR RTL, ana sayfa çıtası a11y=100 çift-tema + axe WCAG-AA 0 light+dark) + kümülatif a11y tohumu/CI. Task yapısı: 8.01 harness+audit (ölçüm-önce) → 8.02 /bunker-os hotspot fix (TD4 fold) → 8.03/8.04/8.05 teyit+mühür. Sıradaki adım: run-task 8.01.
**İlerleme:** **research-phase 8** (2026-07-01) — teknik araştırma tamam (kod taramasıyla somutlaştırıldı). **Bulgu 0 (kritik):** TD4 premisi çürüdü — tek ham `text-pulse` aria-hidden SVG (color-contrast flag'lemez); kullanıcı **ölçüm-önce, TD5'e katla** dedi. **Gerçek risk yüzeyi:** `text-canvas/45,50,60,85` + `text-green/30` dark-panel inversiyonu (BunkerShowcase). **Faz 4 kazanımları yayıldı:** `--color-ink-faint` tuned + PageHeader'ın LanguageSwitcher/ThemeToggle'ı miras alındı; alt sayfalarda `<dl>` yok. Harness: mevcut `home-a11y.spec.ts` deseni parametrik genişletilir (yeni paket yok). CI tohumu **5 dil × light+dark** (kullanıcı — maksimum kapsam); Lighthouse a11y=100 gate manuel verify'da kalır. **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 (S9-10) o adımda kapanır. **Kapsam dışı:** TD4 ayrı task değil, brief mobil perf (gerçek-cihaz), TB-C npm audit.
**Son Faz Dokümanı:** `phases/PHASE-8.md` (🔄 Devam ediyor — Araştırma Bulguları yazıldı; sıradaki plan-phase 8)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** teknik_borç

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-8.01 (⬜ Bekliyor, aktif) — parametrik alt-sayfa a11y harness + 5 sayfa baseline axe envanteri (ölçüm-önce, fix/mühür yok). Fazın ilk task'i; run-task ile başlanır. Faz 7 kapandı (7.01 ✅ + 7.02 ✅ archive'da).
**Durum:** Faz 8 aktif, adım=task. Plan review tamamlandı (verify-plan 8: 5 task doğrulandı, 0 mekanik + 0 yapısal düzeltme); sıradaki adım run-task 8.01 (ayrı oturum).
**İlerleme:** verify-plan 8 ile 5 task fresh-context doğrulandı — referans gerçeklik-kontrolü (selector/token/route/CI birebir), milestone (6 kriter) tam eşleşme, task'lar arası çakışma/boşluk yok. 8.01 = parametrik harness + baseline audit (ölçüm-önce, fix yok); 8.02 = /bunker-os hotspot fix (TD4 fold); 8.03/8.04/8.05 = alt-sayfa teyit+mühür (düşük risk). Enforce edilen gate = axe 0 (CI-tohum); Lighthouse a11y=100 = verify-phase manuel sweep. Bekleyen versiyon-sonu aksiyonu: v0.2 production release (Umami canlı +1 orada kapanır).

---

## Task Durumu (Aktif Faz)

> Faz 8 (versiyon-sonu teknik borç) planı tamam (plan-phase 8). **TD4 ayrı task değil** → 8.02'ye (BunkerShowcase) katlandı (ham `text-pulse` text alt sayfalarda ~yok, research bulgusu). Faz 7 (Umami E1) ✅; 7.01-7.02 `tasks/archive/`'da, detay `phases/PHASE-7.md`. Faz 6 ✅ (6.01-6.07; 6.06 ❌ iptal); Faz 5 ✅ (5.01-5.05); Faz 4 ✅ (4.01-4.08) — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 8.01 | TASK-8.01 | ⬜ Bekliyor | Parametrik alt-sayfa a11y harness + 5 sayfa baseline axe envanteri (ölçüm-önce; fix/mühür yok) |
| 8.02 | TASK-8.02 | ⬜ Bekliyor | `/bunker-os` derin a11y fix + tohum — hotspot (text-canvas/NN + text-green/30); TD4 milestone kapanır |
| 8.03 | TASK-8.03 | ⬜ Bekliyor | `/spor-salonu-yazilimi` (Alpfit) a11y teyit + tohum — düşük risk |
| 8.04 | TASK-8.04 | ⬜ Bekliyor | `/vaka-calismalari` a11y teyit + tohum — düşük risk |
| 8.05 | TASK-8.05 | ⬜ Bekliyor | `/bulten` 2 makale a11y teyit + tohum — 5 alt sayfa mühürü tamamlanır |

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

**Aktif Task:** TASK-8.01 (⬜ Bekliyor) — run-task ile başlanır. Bekleyen: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** 8 — v0.2 versiyon-sonu teknik borç · adım=task (kapsam ✅ + araştırma ✅ + plan ✅ + verify-plan ✅); Faz 7 ✅; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: teknik_borç
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-01 — verify-plan 8: 5 task fresh-context doğrulandı (referans gerçeklik-kontrolü birebir; milestone tam eşleşme; çakışma/boşluk yok), 0 mekanik + 0 yapısal düzeltme, adım=verify-plan→task. Sıradaki: run-task 8.01.
