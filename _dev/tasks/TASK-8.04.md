# TASK-8.04: /vaka-calismalari a11y teyit + regresyon tohumu

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Sayfayı `PAGES`'e ekle, ölç** — `subpages-a11y.spec.ts` `PAGES`'e `/vaka-calismalari` ekle; 5 dil × light+dark koş, 8.01 envanteriyle karşılaştır.
- [ ] **2. Teyitli ihlal varsa craft-özel düzelt** — bağlam-özel, global düzleştirme yok. Yoksa geç.
- [ ] **3. Görsel + AR RTL teyit** — light+dark gözle sıfır regresyon; `/ar/vaka-calismalari` `dir=rtl` + logical prop (6 vaka Reveal stagger + metrik hizası).
- [ ] **4. Mühürle** — sayfa `PAGES`'te kalıcı; `npm run test:e2e` yeşil, ana sayfa regresyonsuz.

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

- [ ] `/vaka-calismalari` × 5 dil × light+dark axe WCAG-AA **0 ihlal**.
- [ ] Ana sayfa `home-a11y` regresyonsuz (aynı koşu).
- [ ] AR `/ar/vaka-calismalari`: `dir=rtl` + 0 `MISSING_MESSAGE` + logical prop bütünlüğü.
- [ ] Fix yapıldıysa: görsel craft korunmuş (gözle). `next build` temiz.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler + test kriterleri karşılandı
- [ ] Git commit & push · bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [durum]

---

**Oluşturulma:** 2026-07-01
