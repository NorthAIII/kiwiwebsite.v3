# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-01 — run-task 8.01 ✅: parametrik alt-sayfa a11y harness'i kuruldu (`a11y-helpers.ts` + boş-PAGES `subpages-a11y.spec.ts`; home-a11y refactor yeşil) + 5 sayfa ham axe baseline ölçüldü. **Tek ihlalli sayfa `/bunker-os`** (text-green/30 + text-canvas/45 her tema, text-canvas/50 yalnız dark); diğer 4 sayfa 0 ihlal (Bulgu 2 teyit). Adım=task. Sıradaki: run-task 8.02.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 8 — v0.2 versiyon-sonu **teknik borç kapatma** fazı (kapsam discuss-phase 8'de damgalandı). Faz 7 (Umami E1) ✅; Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅ — v0.2 içerik fazları (4-7) tamamlandı.
**Adım:** task → 8.01 ✅ tamamlandı (harness kuruldu + baseline ölçüldü); sıradaki run-task 8.02. Faz 8 kapsamı: alt-sayfa derin a11y (5 alt sayfa, 5 dil/AR RTL, ana sayfa çıtası a11y=100 çift-tema + axe WCAG-AA 0 light+dark) + kümülatif a11y tohumu/CI. Task yapısı: 8.01 harness+audit ✅ → 8.02 /bunker-os hotspot fix (TD4 fold) → 8.03/8.04/8.05 teyit+mühür.
**İlerleme:** **run-task 8.01** (2026-07-01) — parametrik harness kuruldu (`a11y-helpers.ts`: WCAG_TAGS/scrollThrough/gotoLocalized; `subpages-a11y.spec.ts` boş-PAGES matris 5 dil×2 tema; home-a11y helper'a refactor, yeşil) + 5 sayfa ham axe baseline. **Envanter:** `/bunker-os` TEK ihlalli — `text-green/30` adım no (light 1.51/dark 1.67), `text-canvas/45` tabular-nums (light 4.1/dark 2.83) her iki tema; `text-canvas/50` badge+text-xs yalnız dark (3.36). `text-canvas/60,85` + ham `text-pulse` SVG (aria-hidden) **geçer** → Bulgu 0 teyit. Diğer 4 sayfa (gym/vaka/2 bülten) **0 ihlal** → Bulgu 2 teyit (`--color-ink-faint` global miras). AR: tüm sayfalarda `dir=rtl` ✅ + 0 `MISSING_MESSAGE` ✅. Kontrast dil-bağımsız (TR≡AR). **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 (S9-10) o adımda kapanır. **Kapsam dışı:** brief mobil perf (gerçek-cihaz), TB-C npm audit.
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

**Task:** TASK-8.02 (⬜ Bekliyor, aktif) — `/bunker-os` derin a11y fix + tohum: BunkerShowcase'de 3 desen (text-green/30 adım no her tema, text-canvas/45 tabular-nums her tema, text-canvas/50 badge+text-xs yalnız dark) craft-koruyan fix; sonra sayfayı `PAGES`'e ekleyerek mühürle. TD4 milestone burada kapanır. 8.01 ✅ archive'da.
**Durum:** Faz 8 aktif, adım=task. 8.01 tamamlandı (harness + baseline); sıradaki adım run-task 8.02 (ayrı oturum).
**İlerleme:** 8.01 ile parametrik harness kuruldu (`a11y-helpers.ts` tek-kaynak + `subpages-a11y.spec.ts` boş-PAGES) ve 5 sayfa ham axe baseline ölçüldü. Fix girdisi netleşti: yalnız `/bunker-os` ihlalli (3 desen), diğer 4 sayfa 0 ihlal → 8.03/8.04/8.05 "yalnız mühürle + AR RTL teyit". Enforce edilen gate = axe 0 (CI-tohum, sayfa `PAGES`'e eklenince aktif); Lighthouse a11y=100 = verify-phase manuel sweep. Bekleyen versiyon-sonu aksiyonu: v0.2 production release (Umami canlı +1 orada kapanır).

---

## Task Durumu (Aktif Faz)

> Faz 8 (versiyon-sonu teknik borç) planı tamam (plan-phase 8). **TD4 ayrı task değil** → 8.02'ye (BunkerShowcase) katlandı (ham `text-pulse` text alt sayfalarda ~yok, research bulgusu). Faz 7 (Umami E1) ✅; 7.01-7.02 `tasks/archive/`'da, detay `phases/PHASE-7.md`. Faz 6 ✅ (6.01-6.07; 6.06 ❌ iptal); Faz 5 ✅ (5.01-5.05); Faz 4 ✅ (4.01-4.08) — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 8.01 | TASK-8.01 | ✅ Tamamlandı | Parametrik alt-sayfa a11y harness + 5 sayfa baseline axe envanteri (ölçüm-önce; fix/mühür yok) |
| 8.02 | TASK-8.02 | ⬜ Bekliyor (aktif) | `/bunker-os` derin a11y fix + tohum — hotspot (text-canvas/NN + text-green/30); TD4 milestone kapanır |
| 8.03 | TASK-8.03 | ⬜ Bekliyor | `/spor-salonu-yazilimi` (Alpfit) a11y teyit + tohum — düşük risk |
| 8.04 | TASK-8.04 | ⬜ Bekliyor | `/vaka-calismalari` a11y teyit + tohum — düşük risk |
| 8.05 | TASK-8.05 | ⬜ Bekliyor | `/bulten` 2 makale a11y teyit + tohum — 5 alt sayfa mühürü tamamlanır |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-8.01** ✅ (2026-07-01) — Parametrik alt-sayfa a11y harness + baseline ölçüm (ölçüm-önce)
- `a11y-helpers.ts` (YENİ, tek-kaynak: WCAG_TAGS/scrollThrough/gotoLocalized) + `subpages-a11y.spec.ts` (YENİ, boş-PAGES 5 dil×2 tema matris); `home-a11y.spec.ts` helper'a refactor (davranış birebir, yeşil).
- Baseline: `/bunker-os` TEK ihlalli (text-green/30 + text-canvas/45 her tema, text-canvas/50 yalnız dark); diğer 4 sayfa 0 ihlal (Bulgu 2 teyit); ham text-pulse SVG geçer (Bulgu 0 teyit); AR dir=rtl + 0 MISSING_MESSAGE.
- Test: build temiz · test:e2e yeşil (home 2 test) · vitest yeşil (7 test).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-8.02 (⬜ Bekliyor, aktif) — run-task ile başlanır. Bekleyen: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** 8 — v0.2 versiyon-sonu teknik borç · adım=task (8.01 ✅; 8.02–8.05 kaldı); Faz 7 ✅; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: teknik_borç
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-01 — run-task 8.01 ✅: harness kuruldu (helper tek-kaynak + boş-PAGES subpages spec + home refactor yeşil) + 5 sayfa ham axe baseline (`/bunker-os` tek ihlalli; diğer 4 sıfır; AR dir=rtl/0 MISSING_MESSAGE). Adım=task. Sıradaki: run-task 8.02.
