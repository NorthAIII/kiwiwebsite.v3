# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — run-task TASK-4.07 ✅: gym-panel pulse-yeşili dark-inversion fix (C2/C3). Yeni adaptif `--color-pulse-ink` token (light `#6fe36f`/dark `#1f7a3d`); SectorSolutions adım no + seeLive CTA `text-pulse`→`text-pulse-ink`. axe color-contrast light+dark sayfa geneli 0 (dark 1.22→4.74); `bg-pulse` canlı-nokta dokunulmadı. Adım=task; sıradaki TASK-4.08 (son task, final doğrulama).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark), ana sayfa. 🔄 Devam ediyor.
**Adım:** task → `/devflow:run-task`: sıradaki TASK-4.08 (final çift-tema a11y=100 doğrulaması — fazın son task'ı). 4.01-4.07 ✅.
**İlerleme:** TASK-4.07 (gym-panel pulse-yeşili dark-inversion fix, C2/C3) tamamlandı — yeni adaptif `--color-pulse-ink` token (`globals.css` `@theme` light `#6fe36f` = mevcut pulse / `html.dark` `#1f7a3d` = marka-yeşili); `SectorSolutions.tsx` adım no (L131) + seeLive CTA (L143) `text-pulse`→`text-pulse-ink`; `bg-pulse` canlı-nokta dokunulmadı. axe-core 4.11.4 (Playwright fresh-prod-serve :4173, emulateMedia+reducedMotion+scroll): light+dark sayfa geneli color-contrast 0 ihlal (dark adım no/CTA 1.22→4.74), light birebir. **Tüm bireysel a11y fix'leri (K1-K5 + C2/C3/C9) tamam** — kalan: 4.08 final ölçüm. Tam envanter: arşiv `tasks/archive/TASK-4.01.md` + PHASE-4 "Re-ölçüm Teyidi".
**Son Faz Dokümanı:** `phases/PHASE-4.md` (🔄 aktif)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-4.08 — Final doğrulama: a11y=100 **çift-tema** (light+dark) + perf/CLS regresyonsuz + `docs/perf/` taban. ⬜ Sıradaki (fazın son task'ı). `run-task` ile başla.
**Durum:** 8 task: 4.01-4.07 ✅; doğrulama 4.08 ⬜.
**İlerleme:** Adım = task; `/devflow:run-task` ile TASK-4.08'i çalıştır (tek task, oturum sonunda kapat). 4.08 sonrası faz adımı → verify.

---

## Task Durumu (Aktif Faz)

> Faz 4 (v0.2 a11y) — 8 task. 4.01 re-ölçümü kapsamı **light+dark**'a genişletti (C2/C3 panel pulse-yeşili + C9 Bunker durum); plan revizyonunda dağıtıldı: C9→4.04, C2/C3→yeni 4.07, doğrulama→4.08 çift-tema. Çalıştırma sırası = numara sırası.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 4.01 | TASK-4.01 | ✅ Tamamlandı | Otoriter re-ölçüm: a11y=89 teyit; materyal sapma → light+dark kapsam genişletme |
| 4.02 | TASK-4.02 | ✅ Tamamlandı | Adım numaraları color-contrast'tan çıkar (K1: `aria-hidden`→CSS `::before`, görsel birebir) |
| 4.03 | TASK-4.03 | ✅ Tamamlandı | `--color-ink-faint` token koyulaştırma (K2, color-contrast — globals.css; axe light+dark 0 ink-faint flag) |
| 4.04 | TASK-4.04 | ✅ Tamamlandı | Cream-on-ink opaklık (K5+C9+C10 — Footer /60, Bunker status /60, metrik /70; ayraçlar aria-hidden) |
| 4.05 | TASK-4.05 | ✅ Tamamlandı | Hero `<dl>` → semantik link markup (K3; dl/dt/dd→div/span.block; axe light+dark definition-list 0 + dlitem 0) |
| 4.06 | TASK-4.06 | ✅ Tamamlandı | Dil-switcher `aria-label` locale kodu (K4; kod-only; axe label-content-name-mismatch light+dark × 5 dil 0) |
| 4.07 | TASK-4.07 | ✅ Tamamlandı | Gym-panel pulse-yeşili dark-inversion fix (C2/C3; yeni adaptif `--color-pulse-ink` token; axe color-contrast light+dark 0, dark 1.22→4.74) |
| 4.08 | TASK-4.08 | ⬜ Bekliyor | Final doğrulama: a11y=100 **çift-tema** + perf/CLS regresyonsuz + perf taban |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-4.07 — Gym-panel pulse-yeşili dark-inversion fix (C2/C3)** (✅ 2026-06-30)
- Yeni adaptif token `--color-pulse-ink` ([globals.css](../src/app/globals.css): `@theme` light `#6fe36f` = mevcut pulse / `html.dark` `#1f7a3d` = `--color-green` marka-yeşili). [SectorSolutions.tsx:131,143](../src/components/SectorSolutions.tsx#L131) adım no + seeLive CTA `text-pulse`→`text-pulse-ink`; `bg-pulse` canlı-nokta (L120) dokunulmadı. Tüketici yalnız SectorSolutions (panel-içi 2 öğe).
- **Doğrulama:** build temiz (37 sayfa); axe 4.11.4 fresh-prod-serve (:4173, listening PID teyit, kapatıldı; stray 9077 dokunulmadı) emulateMedia+reducedMotion+scroll → light+dark sayfa geneli color-contrast **0 ihlal**; adım no/CTA light `rgb(111,227,111)`=`#6fe36f` (birebir), dark `rgb(31,122,61)`=`#1f7a3d` (1.22→4.74). DECISIONS'a token kararı eklendi.
- **Craft (gözle, light+dark):** light panel/pulse birebir; dark adım no + CTA okunur koyu-yeşil, `bg-pulse` canlı-nokta parlak pulse korundu.

**TASK-4.06 — Dil-switcher `aria-label`'a locale kodu (K4)** (✅ 2026-06-30)
- [LanguageSwitcher.tsx:63](../src/components/LanguageSwitcher.tsx#L63) — hardcoded `aria-label="Language / Dil"` → dinamik `${LABELS[locale]} (${locale.toUpperCase()})`. `LABELS` component-içi sabit (i18n messages değil) → yeni anahtar yok, 5-dil parite tetiklenmez. Görünür DOM/CSS + menü mantığı dokunulmadı. Paylaşılan component → Nav+Footer+PageHeader tek seferde.
- **Doğrulama:** build temiz (37 sayfa); axe 4.11.4 fresh-prod-serve (:4173, PID 1705107 teyit, kapatıldı) light+dark × 5 dil → `label-content-name-mismatch` **0 ihlal** (her sayfada Nav+Footer 2 mount, ikisi de doğru). Label görünür locale kodunu içeriyor: Türkçe (TR)·English (EN)·العربية (AR)·Deutsch (DE)·Español (ES). `messages/*.json` değişmedi.
- **Craft/RTL (Playwright):** AR `dir=rtl` doğru, label "العربية (AR)" anlamlı+kod. Menü aç (`aria-expanded` false→true, 5 seçenek), Escape kapatır, seç (EN→Türkçe → `/`, lang=tr, label güncellenir) — bozulma yok.


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-4.08 (fazın son task'ı, final doğrulama; `/devflow:run-task` ile başla) — 4.01-4.07 ✅
**Aktif Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark) 🔄; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — run-task TASK-4.07 ✅: gym-panel pulse-yeşili dark-inversion fix (C2/C3). Yeni adaptif `--color-pulse-ink` token (light `#6fe36f`/dark `#1f7a3d`); SectorSolutions adım no + seeLive CTA `text-pulse`→`text-pulse-ink`. build temiz + axe color-contrast light+dark sayfa geneli 0 (dark 1.22→4.74); `bg-pulse` dokunulmadı. Sıradaki: run-task (TASK-4.08, final doğrulama).
