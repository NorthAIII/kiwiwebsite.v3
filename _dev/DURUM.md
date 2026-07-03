# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **verify-phase 12 ✅: UAT 16/16 senaryo geçti, 0 düzeltme task'ı.** Otomatik: CI (fast+a11y) yeşil · security-review 0 bulgu · npm audit değişmedi (`package.json` dokunulmadı). 11 senaryo otonom (runtime harness tek-context/fallback · full-motion axe 0 WCAG-AA ihlali çift-tema · perf artefakt 100/CLS≈0/LCP 620ms regresyonsuz · vitest 7/7 · RTL/chatbot yapısal), 5 görsel/craft kullanıcı onayıyla. Faz 12 UAT geçti → **Adım review. Sıradaki `review-phase 12`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 12 🔄 (**B1 Living Flow nabız kapsamı** — karar-gate'li, imza-riskli) — tüm task'lar ✅ (12.01/12.02/12.03); karar **uygula-onayla**; **UAT ✅ (16/16, 0 düzeltme)**. review-phase bekliyor. **Faz 11 ✅** (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** review (12.01/12.02/12.03 ✅ + UAT ✅ → sıradaki `review-phase 12`; v0.3 içerik fazı, Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** verify-phase 12 (2026-07-03) ✅ — UAT 16/16 senaryo geçti, 0 düzeltme task'ı; CI yeşil + security-review 0 bulgu. 11 otonom (tek-context/fallback runtime harness · full-motion axe 0 ihlal çift-tema · perf 100/CLS≈0/LCP 620ms regresyonsuz · vitest 7/7 · RTL/chatbot) + 5 görsel/craft kullanıcı onayı. run-task 12.03 (2026-07-03) ✅ — karar-gate **uygula-onayla** (+ light-veil `--flow-veil` token, light %70/dark %56). run-task 12.02 ✅ — `FlowVeil` (adaptasyon emergent). run-task 12.01 ✅ — `useFlowMode` + `FlowBackdrop` (tek WebGL context). **Sahipli açıklar (record, faz-dışı):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), **alt-sayfa canonical=`/` (layout miras, latent SEO, gelecek faz)**, **`/forum` locale-prefix gap (`/en/forum`→404, gelecek faz)**, brief mobil perf (gerçek-cihaz duvarı), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-12.md` (🔄 Devam ediyor — 12.01/12.02/12.03 ✅, UAT ✅ 16/16; review bekliyor). Faz 11 ✅ `phases/PHASE-11.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — (Faz 12'nin tüm task'ları ✅ + UAT ✅; aktif task yok). Sıradaki adım **`review-phase 12`** (retrospektif + kalite kontrol).
**Durum:** Faz 12 🔄 → Adım **review** (12.01/12.02/12.03 ✅ + UAT 16/16 ✅, 0 düzeltme). Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** verify-phase 12 (2026-07-03) ✅ — UAT 16/16 geçti, 0 düzeltme task'ı; CI yeşil + security-review 0 bulgu. 11 otonom + 5 görsel/craft kullanıcı onayı. Sıradaki = `review-phase 12`.

---

## Task Durumu (Aktif Faz)

> **Faz 12 🔄** (B1 Living Flow nabız kapsamı) — plan yazıldı (3 task); `verify-plan 12` sonrası `run-task` başlar. Faz 11 ✅ detayı → `phases/PHASE-11.md` + `tasks/archive/`. Faz 4–11 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 12.01 | TASK-12.01 | ✅ Tamamlandı | Fixed viewport katman + Hero koordinasyon (TK1/TK2) |
| 12.02 | TASK-12.02 | ✅ Tamamlandı | Bölüme-uyarlanan adaptif scrim (TK3) — `FlowVeil` main-içi wrapper |
| 12.03 | TASK-12.03 | ✅ Tamamlandı | Karar-gate → **uygula-onayla** (+ light-veil ince-ayarı): a11y 0 ihlal full-motion çift-tema · desktop perf 100/CLS 0 regresyonsuz · craft |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 11 task özetleri sıfırlandı** (Faz 11 detayları `phases/PHASE-11.md` + `tasks/archive/`).

**TASK-12.03** — Karar-gate: kontrast + desktop perf + craft → **uygula-onayla** (+ light-veil ince-ayarı) ✅
- Gate-1 (a11y full-motion çift-tema): chrome-channel/swiftshader axe — alan iki temada live, **0 WCAG-AA ihlali**; LH a11y 100 dark. Caveat: ~15 alan-üstü öğe axe *incomplete* (WebGL okunamaz → craft teyidi). Fallback reduced-motion 0 ihlal.
- Gate-2 (desktop perf/CLS): perf **100** · CLS ≈0 · LCP ~625ms — baseline `home-desktop-20260628` regresyonsuz; perf hipotezi (tek context, ~sıfır artımlı) doğrulandı.
- Gate-3 (craft): dark kusursuz; light başlık bleed'i tema-flip `--flow-veil` token'ıyla çözüldü (light %70/dark %56, `dark:` değil `html.dark`). DECISIONS 2026-07-03 + `perf/home-desktop-20260703-faz12`.

**TASK-12.02** — Bölüme-uyarlanan okunabilirlik / adaptif scrim (TK3) ✅
- `FlowVeil` (YENİ, token-bazlı `color-mix(--color-canvas)` washi — tema-adaptif, `dark:` YOK); `<main>` içi `relative isolate` wrapper'a kondu (fixed backdrop hero/bölüm ayrımı yapamaz → veil içerikle scroll etmeli). Hero wrapper dışında = tam yoğunluk.
- Adaptasyon emergent: transparent bölümler görünür / `bg-canvas-deep/40` soluk / `bg-ink` opak örter → **bölüm dosyalarına dokunulmadı**.
- Test: build temiz · a11y tohumu light+dark 0 ihlal · i18n parite 5/5 · iki-tema görsel OK. (12.03'te veil gücü tema-flip token'a çevrildi.)

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Faz 12 🔄 — 12.01 ✅ (fixed katman), 12.02 ✅ (adaptif veil), 12.03 ✅ (karar-gate → uygula-onayla) + UAT ✅ (16/16). Aktif task yok. Sıradaki adım **review-phase 12** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 12 🔄 — v0.3 Living Flow nabız kapsamı (B1): kontrollü aşağı-taşıma / sürekli soluk iplik / desktop-öncelik / bölüme-uyarlanan opaklık. **Teknik biçim:** tek fixed viewport canvas + parallax (C); plan = 3 task (12.01 ✅ → 12.02 ✅ → 12.03 ✅ karar-gate uygula-onayla) + UAT ✅ 16/16. Tüm task'lar + UAT ✅ → review bekliyor. Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `review-phase 12`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **verify-phase 12 ✅: UAT 16/16 senaryo geçti, 0 düzeltme task'ı; Faz 12 review'a hazır.** Otomatik kontroller: CI (fast+a11y) her 3 kod commit'inde yeşil (REST API job-conclusion=success); security-review **0 bulgu** (saf görsel/WebGL/CSS katmanı, yeni girdi/auth/secret yüzeyi yok); npm audit değişmedi (`package.json` dokunulmadı — TK4; 3 moderate = faz-dışı sahipli TB-C). **11 senaryo otonom** (channel:'chrome'+swiftshader runtime harness: desktop tek fixed canvas/mobil hero-contained/reduced+no-WebGL StaticFlow · full-motion axe **0 WCAG-AA ihlali** light+dark, alan live · perf artefakt `home-desktop-20260703-faz12` perf 100/CLS≈3.75e-6/LCP 620ms baseline regresyonsuz · vitest 7/7 · RTL `dir=rtl`/chatbot `#chat` yapısal) + **5 görsel/craft senaryo kullanıcı onayı** (shipped build ekran görüntüleri, 12.03 craft onayıyla tutarlı). Düzeltme task'ı doğuran bulgu yok → Adım **review**. **Sıradaki DevFlow komutu: `review-phase 12`.**
