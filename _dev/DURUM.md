# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — run-task 5.01 ✅: ilk test runner (Vitest-node) + i18n 5-dil parite tohumu kuruldu/kanıtlandı (yeşil 5/5 → `de.json` anahtar sil → kırmızı → geri al → yeşil; `next build` temiz). 3 kanıtlı katmanın 1.'si; `next-intl/routing` node-ESM'de sürtünmesiz import edildi. **Adım=task** (sıradaki: run-task TASK-5.02).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 5 — Test altyapısı (D1). 🔄 **icra başladı** — 5.01 ✅ (1/5); plan ✅ + verify-plan ✅ + discuss ✅ + research ✅. Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** task → `/devflow:run-task` (yeni oturum): TASK-5.02'den devam et.
**İlerleme:** 5.01 ✅ (Vitest-node + i18n parite tohum, 3 kanıtlı katmanın 1.'si). Kalan 4 task — **5.02** Vitest-jsdom + component smoke (D1.1) · **5.03** Playwright/axe kur + a11y regresyon `/` light+dark (D1.1+D1.3) · **5.04** ilk GitHub Actions CI, fast+a11y job (D1.4) · **5.05** test convention notu docs/TESTING.md (D1.5). Her runner kur+kanıtla (fail-on-regression). Sıra lineer (5.02→5.05). **🔴 En kritik risk (5.03):** Faz 4 a11y=100 Lighthouse alt-kümesiydi; ham axe full-ruleset ≠ 0 ihlal garantisi → axe kapsamı **WCAG etiketleri**; icrada `/` light+dark ampirik koş, baseline sabitle. **5.02 notu:** `@/` alias Vitest'te resolve edilmiyor → component katmanı `@/` kullanırsa `vite-tsconfig-paths`/`resolve.alias` gerekebilir. **Devralınan borç:** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi (harness sonra genişletir).
**Son Faz Dokümanı:** `phases/PHASE-5.md` (🔄 icra — 5.01 ✅, 4 task ⬜)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-5.02 sıradaki (⬜ Bekliyor) — `/devflow:run-task` ile başlar. 5.01 ✅ tamamlandı.
**Durum:** Faz 5 (test altyapısı D1) 🔄 — icra başladı, 5.01 ✅ (1/5). Sıradaki adım faz döngüsünde run-task TASK-5.02.
**İlerleme:** `/devflow:run-task` ile TASK-5.02'yi (Vitest jsdom katmanı + component smoke tohum) çalıştır (yeni oturum).

---

## Task Durumu (Aktif Faz)

> Faz 5 (test altyapısı D1) 🔄 — icra başladı: 5.01 ✅ (1/5), 4 task ⬜. discuss ✅ + research ✅ + plan ✅ + verify-plan ✅. Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 5.01 | TASK-5.01 | ✅ Tamamlandı | Vitest kurulumu (node) + i18n 5-dil parite tohum |
| 5.02 | TASK-5.02 | ⬜ Bekliyor | Vitest jsdom katmanı + component smoke tohum |
| 5.03 | TASK-5.03 | ⬜ Bekliyor | Playwright + axe + a11y regresyon (`/` light+dark) |
| 5.04 | TASK-5.04 | ⬜ Bekliyor | CI iskeleti — ilk GitHub Actions (fast + a11y job) |
| 5.05 | TASK-5.05 | ⬜ Bekliyor | Kümülatif test convention notu (docs/TESTING.md) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-5.01 — Vitest-node + i18n parite tohum** ✅ (2026-06-30)
- İlk test runner (Vitest `^4.1.9`, node) + `vitest.config.ts` + `test`/`test:watch` scriptleri kuruldu.
- `tests/i18n-parity.test.ts`: `routing.locales` tek kaynak, recursive leaf-key flatten, eksik+fazla iki yön; 5/5 yeşil (5×183 anahtar).
- Kanıt: `de.json`/`meta.title` sil → kırmızı → geri al → yeşil; `next build` temiz. `next-intl/routing` node-ESM'de sürtünmesiz import edildi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-5.02 sıradaki (⬜; 5.01 ✅, 4 task ⬜). Sıradaki adım: `/devflow:run-task` → TASK-5.02
**Aktif Faz:** 5 — Test altyapısı (D1) 🔄 · adım=task (run-task); Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — run-task 5.01 ✅: Vitest-node + i18n parite tohumu kuruldu/kanıtlandı (yeşil → fail-on-regression kırmızı → yeşil; build temiz). Adım=task → run-task TASK-5.02.
