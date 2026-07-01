# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-01 — run-task 8.04 ✅: `/vaka-calismalari` a11y teyit + mühür. Baseline (0 ihlal) doğrulandı, **kod fix yok** — sayfa `PAGES`'e mühürlendi → 10 test (5 dil×2 tema) 0 ihlal + home+bunker-os+gym regresyonsuz (32 test). AR `dir=rtl` + MISSING_MESSAGE 0 + physical prop grep temiz + screenshot craft onayı. Adım=task. Sıradaki: run-task 8.05 (son alt-sayfa).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 8 — v0.2 versiyon-sonu **teknik borç kapatma** fazı (kapsam discuss-phase 8'de damgalandı). Faz 7 (Umami E1) ✅; Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅ — v0.2 içerik fazları (4-7) tamamlandı.
**Adım:** task → 8.04 ✅ tamamlandı (`/vaka-calismalari` teyit + mühür); sıradaki run-task 8.05 (son alt-sayfa). Faz 8 kapsamı: alt-sayfa derin a11y (5 alt sayfa, 5 dil/AR RTL, ana sayfa çıtası a11y=100 çift-tema + axe WCAG-AA 0 light+dark) + kümülatif a11y tohumu/CI. Task yapısı: 8.01 harness+audit ✅ → 8.02 /bunker-os fix ✅ (TD4 fold kapandı) → 8.03 /spor-salonu-yazilimi ✅ (0 ihlal, yalnız mühür) → 8.04 /vaka-calismalari ✅ (0 ihlal, yalnız mühür) → 8.05 /bulten 2 makale teyit+mühür (düşük risk, 8.01'de 0 ihlal).
**İlerleme:** **run-task 8.04** (2026-07-01) — `/vaka-calismalari` baseline (0 ihlal) doğrulandı → **kod fix yok**, sayfa `PAGES`'e mühürlendi. Bileşen (`CaseStudies.tsx`) temiz: gövde `text-ink-soft`, uppercase etiket `text-ink-faint` = Faz 4 global fix mirası (Bulgu 2); `text-green` etiketler kontrast geçer; `text-canvas` yalnız `bg-ink` yüksek-kontrast CTA butonunda. **10 test (5 dil×2 tema) 0 ihlal** + home+bunker-os+gym regresyonsuz (32 e2e test). AR `/ar/vaka-calismalari` `dir="rtl"` (prerender+runtime) + MISSING_MESSAGE 0 + physical directional prop yok (grep temiz → logical/gap/grid RTL-güvenli) + screenshot (TR light + AR dark) craft/aynalama onayı. İçerik notu (kapsam dışı): bileşen gövde metni TR/EN hardcoded (ar/de/es→EN fallback), next-intl anahtarı değil → `MISSING_MESSAGE` yok. **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 (S9-10) o adımda kapanır. **Kapsam dışı:** brief mobil perf (gerçek-cihaz), TB-C npm audit.
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

**Task:** TASK-8.05 (⬜ Bekliyor, aktif) — `/bulten` 2 makale a11y teyit + tohum. 8.01 baseline'da **0 ihlal** → beklenen "yalnız mühürle + AR RTL teyit" (kod fix yok). 2 sayfayı (`/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`) `PAGES`'e ekle, 5 dil×2 tema koş, home regresyonsuz doğrula. 5 alt-sayfa mühürü tamamlanır. 8.04 ✅ archive'da.
**Durum:** Faz 8 aktif, adım=task. 8.04 tamamlandı (`/vaka-calismalari` teyit + mühür, 0 ihlal, kod fix yok); sıradaki adım run-task 8.05 (ayrı oturum, fazın son task'i).
**İlerleme:** 8.04 ile `/vaka-calismalari` mühürlendi (0 ihlal, yalnız mühür + AR RTL teyit — Bulgu 2 doğrulandı). Kalan 1 task (8.05, 2 bülten makalesi) düşük risk: 8.01 baseline'da 0 ihlal verdi → beklenen "yalnız `PAGES`'e ekle + AR RTL teyit" (`--color-ink-faint` global miras). Enforce edilen gate = axe 0 (CI-tohum, sayfa `PAGES`'e eklenince aktif); Lighthouse a11y=100 = verify-phase manuel sweep. 8.05 sonrası fazdaki tüm tasklar biter → adım=verify. Bekleyen versiyon-sonu aksiyonu: v0.2 production release (Umami canlı +1 orada kapanır).

---

## Task Durumu (Aktif Faz)

> Faz 8 (versiyon-sonu teknik borç) planı tamam (plan-phase 8). **TD4 ayrı task değil** → 8.02'ye (BunkerShowcase) katlandı (ham `text-pulse` text alt sayfalarda ~yok, research bulgusu). Faz 7 (Umami E1) ✅; 7.01-7.02 `tasks/archive/`'da, detay `phases/PHASE-7.md`. Faz 6 ✅ (6.01-6.07; 6.06 ❌ iptal); Faz 5 ✅ (5.01-5.05); Faz 4 ✅ (4.01-4.08) — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 8.01 | TASK-8.01 | ✅ Tamamlandı | Parametrik alt-sayfa a11y harness + 5 sayfa baseline axe envanteri (ölçüm-önce; fix/mühür yok) |
| 8.02 | TASK-8.02 | ✅ Tamamlandı | `/bunker-os` derin a11y fix + mühür — 3 desen (text-green/30 → ::before, text-canvas/45+50 → /65); 10 test 0 ihlal; TD4 kapandı |
| 8.03 | TASK-8.03 | ✅ Tamamlandı | `/spor-salonu-yazilimi` (Alpfit) a11y teyit + mühür — 0 ihlal, kod fix yok; 10 test 0 ihlal + AR RTL teyit |
| 8.04 | TASK-8.04 | ✅ Tamamlandı | `/vaka-calismalari` a11y teyit + mühür — 0 ihlal, kod fix yok; 10 test 0 ihlal + AR RTL teyit (32 test regresyonsuz) |
| 8.05 | TASK-8.05 | ⬜ Bekliyor (aktif) | `/bulten` 2 makale a11y teyit + tohum — 5 alt sayfa mühürü tamamlanır |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-8.04** ✅ (2026-07-01) — `/vaka-calismalari` a11y teyit + mühür (0 ihlal, yalnız mühür)
- Baseline (0 ihlal) doğrulandı → **kod fix yok**. `CaseStudies.tsx` temiz: gövde `text-ink-soft`, uppercase etiket `text-ink-faint` = Faz 4 global fix mirası (Bulgu 2); `text-green` etiketler kontrast geçer; `text-canvas` yalnız `bg-ink` yüksek-kontrast CTA butonunda.
- `/vaka-calismalari` `PAGES`'e mühürlendi → 10 test (5 dil×2 tema) 0 ihlal. AR `dir="rtl"` (prerender+runtime) + MISSING_MESSAGE 0 + physical prop grep temiz (logical/gap/grid RTL-güvenli) + screenshot (TR light + AR dark) craft/aynalama onayı. İçerik notu: gövde metni TR/EN hardcoded (ar/de/es→EN fallback), next-intl anahtarı değil → `MISSING_MESSAGE` yok (kapsam dışı).
- Test: build temiz · test:e2e yeşil (32 test: home 2 + bunker-os 10 + gym 10 + vaka 10) · vitest yeşil (7 test).

**TASK-8.03** ✅ (2026-07-01) — `/spor-salonu-yazilimi` (Alpfit) a11y teyit + mühür (0 ihlal, yalnız mühür)
- Baseline (0 ihlal) doğrulandı → **kod fix yok**. Bileşen temiz: `text-ink-soft`/`text-ink-faint` = Faz 4 global fix mirası (Bulgu 2); `text-canvas` yalnız `bg-ink` yüksek-kontrast butonlarında; `next/image` görsellerin `alt`'ı var.
- `/spor-salonu-yazilimi` `PAGES`'e mühürlendi → 10 test (5 dil×2 tema) 0 ihlal. AR `dir="rtl"` (prerender+runtime) + physical prop grep temiz (logical/gap/grid RTL-güvenli) + screenshot (TR light + AR dark) craft/hiza onayı. İçerik notu: bileşen gövde metni TR/EN hardcoded (ar/de/es→EN fallback), next-intl anahtarı değil → `MISSING_MESSAGE` yok (kapsam dışı).
- Test: build temiz · test:e2e yeşil (22 test: home 2 + bunker-os 10 + gym 10) · vitest yeşil (7 test).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-8.05 (⬜ Bekliyor, aktif) — run-task ile başlanır (fazın son task'i). Bekleyen: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** 8 — v0.2 versiyon-sonu teknik borç · adım=task (8.01 ✅, 8.02 ✅, 8.03 ✅, 8.04 ✅; 8.05 kaldı); Faz 7 ✅; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: teknik_borç
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-01 — run-task 8.04 ✅: `/vaka-calismalari` a11y teyit + mühür (0 ihlal, kod fix yok). 10 test (5 dil×2 tema) 0 ihlal + home+bunker-os+gym regresyonsuz (32 test) + AR dir=rtl + MISSING_MESSAGE 0 + screenshot craft onayı. Adım=task. Sıradaki: run-task 8.05 (son alt-sayfa).
