# TASK-8.03: /spor-salonu-yazilimi (Alpfit) a11y teyit + regresyon tohumu

**Durum:** ⬜ Bekliyor
**Modül:** M2 (GymSoftwareShowcase) + M6 (tohum)
**Feature:** TD5 (alt-sayfa derin a11y) + TD6 (kümülatif tohum)
**Faz:** Phase 8 (phases/PHASE-8.md)
**Bağımlılıklar:** TASK-8.01 (harness + baseline envanteri)

---

## Hedef

`/spor-salonu-yazilimi` (Alpfit yazılımı) sayfasını ana sayfa çıtasında denetle: 8.01 baseline'ında teyit edilen axe WCAG-AA ihlali varsa craft-koruyarak düzelt, ardından sayfayı parametrik harness'e (5 dil × light+dark axe 0) **mühürle**. Düşük risk beklenir — sayfa esasen `text-ink-faint` kullanıyor (Faz 4 global fix mirası) + `text-canvas` yalnız `bg-ink` CTA butonlarında (yüksek kontrast). Baseline 0 ihlal verirse task = yalnız mühürle + AR RTL teyit (kod fix yok). Tamamlanmış sayılır: sayfa × 5 dil × 2 tema axe 0 ihlal (spec'te enforce) + görsel/RTL teyit.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/tasks/TASK-8.01.md` (veya archive) — bu sayfanın baseline axe envanteri
- `_dev/phases/PHASE-8.md` — Bulgu 2 (global kazanımlar yayıldı → yüzey dar), Dikkat Edilecekler
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.8 (Alpfit sayfası)
- `src/components/gym/GymSoftwareShowcase.tsx` — denetlenen bileşen

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` · `_dev/phases/PHASE-8.md` (Task Listesi)

---

## Alt Görevler

- [ ] **1. Sayfayı `PAGES`'e ekle, ölç** — `subpages-a11y.spec.ts` `PAGES`'e `/spor-salonu-yazilimi` ekle; 5 dil × light+dark koş, 8.01 envanteriyle karşılaştır.
- [ ] **2. Teyitli ihlal varsa craft-özel düzelt** — bağlam-özel, global düzleştirme yok (imza korunur). Yoksa geç.
- [ ] **3. Görsel + AR RTL teyit** — light+dark gözle sıfır regresyon; `/ar/spor-salonu-yazilimi` `dir=rtl` + logical prop bütünlüğü (özellikle 8 özellik grid'i + ekran görüntüsü hizası).
- [ ] **4. Mühürle** — sayfa `PAGES`'te kalıcı; `npm run test:e2e` yeşil, ana sayfa regresyonsuz.

---

## Etkilenen Dosyalar

```
src/components/gym/GymSoftwareShowcase.tsx  # ihlal teyit edilirse craft-özel fix (aksi halde dokunulmaz)
tests/e2e/subpages-a11y.spec.ts             # /spor-salonu-yazilimi PAGES'e mühürlenir
```

---

## Dikkat Noktaları

- **Düşük risk:** `text-ink-faint` global fix miras (Bulgu 2); `text-canvas` yalnız `bg-ink` buton (yüksek kontrast iki temada). Envanter 0 ihlal verebilir → yalnız mühürle.
- **Görseller (`public/gym/*.png`, `next/image`)** a11y'de `alt` teyidi — axe eksik-alt'ı yakalar; envanterde çıkarsa düzelt.
- **Tema/reveal/locale tuzağı** harness'te zaten çözüldü (8.01); TR prefixsiz → cookie, AR RTL derin.
- **Lighthouse a11y=100 skor gate'i verify-phase'de** (manuel); bu task'ın gate'i axe 0.

---

## Test Kriterleri

- [ ] `/spor-salonu-yazilimi` × 5 dil × light+dark axe WCAG-AA **0 ihlal**.
- [ ] Ana sayfa `home-a11y` regresyonsuz (aynı koşu).
- [ ] AR `/ar/spor-salonu-yazilimi`: `dir=rtl` + 0 `MISSING_MESSAGE` + logical prop bütünlüğü.
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
