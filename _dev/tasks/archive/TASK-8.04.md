# TASK-8.04: /vaka-calismalari a11y teyit + regresyon tohumu

**Durum:** ✅ Tamamlandı
**Modül:** M2 (CaseStudies) + M6 (tohum)
**Feature:** TD5 (alt-sayfa derin a11y) + TD6 (kümülatif tohum)
**Faz:** Phase 8 (phases/PHASE-8.md)
**Bağımlılıklar:** TASK-8.01 (harness + baseline envanteri)

---

## Hedef

`/vaka-calismalari` (6 vaka çalışması) sayfasını ana sayfa çıtasında denetle: 8.01 baseline'ında teyit edilen axe WCAG-AA ihlali varsa craft-koruyarak düzelt, ardından sayfayı parametrik harness'e (5 dil × light+dark axe 0) **mühürle**. Düşük risk beklenir — sayfa `text-ink-faint` (uppercase etiket, Faz 4 global fix mirası) + `text-canvas` yalnız `bg-ink` CTA butonunda kullanıyor. Baseline 0 ihlal verirse task = yalnız mühürle + AR RTL teyit. Tamamlanmış sayılır: sayfa × 5 dil × 2 tema axe 0 ihlal (enforce) + görsel/RTL teyit.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/tasks/TASK-8.01.md` (veya archive) — bu sayfanın baseline axe envanteri
- `_dev/phases/PHASE-8.md` — Bulgu 2, Dikkat Edilecekler
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.9 (Vaka çalışmaları)
- `src/components/CaseStudies.tsx` — denetlenen bileşen

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` · `_dev/phases/PHASE-8.md` (Task Listesi)

---

## Alt Görevler

- [x] **1. Sayfayı `PAGES`'e ekle, ölç** — `subpages-a11y.spec.ts` `PAGES`'e `/vaka-calismalari` eklendi; 5 dil × light+dark koştu → **0 ihlal** (8.01 baseline birebir doğrulandı).
- [x] **2. Teyitli ihlal varsa craft-özel düzelt** — **geçildi** (0 ihlal, kod fix yok). `CaseStudies.tsx` dokunulmadı.
- [x] **3. Görsel + AR RTL teyit** — TR light + AR dark screenshot craft-korumalı (aynalama doğru); `/ar/vaka-calismalari` prerender+runtime `dir="rtl"` + MISSING_MESSAGE 0 + physical directional prop grep temiz.
- [x] **4. Mühürle** — sayfa `PAGES`'te kalıcı; `npm run test:e2e` yeşil (32 test), ana sayfa + bunker-os + gym regresyonsuz.

---

## Etkilenen Dosyalar

```
src/components/CaseStudies.tsx           # ihlal teyit edilirse craft-özel fix (aksi halde dokunulmaz)
tests/e2e/subpages-a11y.spec.ts          # /vaka-calismalari PAGES'e mühürlenir
```

---

## Dikkat Noktaları

- **Düşük risk:** `text-ink-faint` global fix miras (Bulgu 2); `text-canvas` yalnız `bg-ink` CTA (yüksek kontrast). Envanter 0 ihlal verebilir → yalnız mühürle.
- **6 vaka metrikleri "öngörü/örnek" işaretli** (M2 F2.9) — a11y'yle ilgisiz ama metin dokunulursa dürüstlük konvansiyonu korunur.
- **Tema/reveal/locale tuzağı** harness'te çözüldü (8.01); AR RTL derin.
- **Lighthouse a11y=100 skor gate'i verify-phase'de** (manuel); bu task'ın gate'i axe 0.

---

## Test Kriterleri

- [x] `/vaka-calismalari` × 5 dil × light+dark axe WCAG-AA **0 ihlal** (10 test).
- [x] Ana sayfa `home-a11y` regresyonsuz (aynı koşu; ayrıca bunker-os + gym mühürleri de yeşil — toplam 32 test).
- [x] AR `/ar/vaka-calismalari`: `dir=rtl` (prerender+runtime) + 0 `MISSING_MESSAGE` + logical prop bütünlüğü (grep temiz).
- [x] Fix yapılmadı (0 ihlal); görsel craft korunmuş (TR light + AR dark screenshot). `next build` temiz.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler + test kriterleri karşılandı
- [x] Git commit & push · bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-01

**Durum:** ✅ Tamamlandı

**Ne yapıldı:**
- **Mühür:** `tests/e2e/subpages-a11y.spec.ts` `PAGES`'e `{ label: "vaka-calismalari", path: "/vaka-calismalari" }` eklendi (8.04 placeholder yorumu kaldırıldı).
- **Ölçüm:** 5 dil × light+dark = 10 test → **0 ihlal**; 8.01 baseline'ı (0 ihlal) birebir doğrulandı → **kod fix yok**, `CaseStudies.tsx` dokunulmadı. Bileşen temiz: gövde `text-ink-soft`, uppercase etiket `text-ink-faint` = Faz 4 global fix mirası (Bulgu 2); `text-green` etiketler kontrast geçer; `text-canvas` yalnız `bg-ink` CTA butonunda (yüksek kontrast).
- **AR RTL teyit:** `/ar/vaka-calismalari` prerender (`.next/server/app/ar/vaka-calismalari.html`) + runtime `dir="rtl"` ✅; MISSING_MESSAGE 0 (prerender + runtime curl); physical directional prop grep temiz (yalnız `border-line` renk token'ı false-positive; `border-t`/`gap`/`space-y`/grid RTL-güvenli).
- **Görsel:** Playwright screenshot TR light + AR dark → craft korunmuş, AR layout tam aynalanmış (logo/nav/başlık/kart-etiketi/CTA pill mirror). İçerik notu (kapsam dışı): bileşen gövde metni TR/EN hardcoded (ar/de/es→EN fallback), next-intl anahtarı değil → MISSING_MESSAGE yok.

**Test sonuçları:**
- `npm run build` temiz (vaka-calismalari 5 dil prerender).
- `npm run test:e2e` yeşil — **32 test**: home 2 + bunker-os 10 + gym 10 + vaka 10, 0 ihlal.
- `npm run test` (Vitest) yeşil — 7 test (i18n parite + smoke).

---

**Oluşturulma:** 2026-07-01
