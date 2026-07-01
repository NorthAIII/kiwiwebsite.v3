# TASK-8.05: /bulten makale sayfaları (2) a11y teyit + regresyon tohumu

**Durum:** ⬜ Bekliyor
**Modül:** M2 (forum/ArticleAiSdr + ArticleClaude) + M6 (tohum)
**Feature:** TD5 (alt-sayfa derin a11y) + TD6 (kümülatif tohum)
**Faz:** Phase 8 (phases/PHASE-8.md)
**Bağımlılıklar:** TASK-8.01 (harness + baseline envanteri)

---

## Hedef

İki bülten makale sayfasını — `/bulten/ai-sdr-araclari` (ArticleAiSdr) + `/bulten/claude-opus-4-8-fable-5` (ArticleClaude) — ana sayfa çıtasında denetle: 8.01 baseline'ında teyit edilen axe WCAG-AA ihlali varsa craft-koruyarak düzelt, ardından **her iki sayfayı** parametrik harness'e (her biri 5 dil × light+dark axe 0) **mühürle**. İki makale yapısal ikizdir (aynı `forum/` deseni, ikisi de `/bulten/*`) → tek task'te ele alınır. Düşük risk beklenir — ikisi de esasen `text-ink-faint` (Faz 4 global fix mirası) + `text-canvas` yalnız `bg-ink` CTA butonunda. Baseline 0 ihlal verirse task = yalnız iki sayfayı mühürle + AR RTL teyit. Tamamlanmış sayılır: iki sayfa × 5 dil × 2 tema axe 0 ihlal (enforce) + görsel/RTL teyit.

---

## Bağlam

Bu iki sayfa fazın son iş birimidir; mühürlenmesiyle 5 alt sayfanın tamamı harness'te (TD5/TD6 milestone'unun otomatik-korunan çekirdeği). İkisi yapısal ikiz olduğu için ölçüm+mühürleme birlikte yapılır; ancak axe her biri için ayrı koşar (ayrı route, ayrı içerik) — fix gerekirse sayfaya özel yapılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/tasks/TASK-8.01.md` (veya archive) — bu iki sayfanın baseline axe envanteri
- `_dev/phases/PHASE-8.md` — Bulgu 2, Dikkat Edilecekler
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.6 (Bülten/makale sayfaları)
- `src/components/forum/ArticleAiSdr.tsx` · `src/components/forum/ArticleClaude.tsx`

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` · `_dev/phases/PHASE-8.md` (Task Listesi)

---

## Alt Görevler

- [ ] **1. İki sayfayı `PAGES`'e ekle, ölç** — `subpages-a11y.spec.ts` `PAGES`'e `/bulten/ai-sdr-araclari` + `/bulten/claude-opus-4-8-fable-5` ekle; her biri 5 dil × light+dark koş, 8.01 envanteriyle karşılaştır.
- [ ] **2. Teyitli ihlal varsa sayfaya-özel düzelt** — bağlam-özel, global düzleştirme yok. İkiz olsalar da fix ilgili bileşene yazılır. Yoksa geç.
- [ ] **3. Görsel + AR RTL teyit** — her iki sayfa light+dark gözle sıfır regresyon; `/ar/bulten/*` `dir=rtl` + logical prop (makale tipografisi + metrik/tablo hizası, `grid-cols-[1fr_auto_auto]` gibi fiziksel-yön riskleri).
- [ ] **4. Mühürle** — iki sayfa `PAGES`'te kalıcı; `npm run test:e2e` yeşil (tüm 5 alt sayfa artık mühürlü), ana sayfa regresyonsuz.

---

## Etkilenen Dosyalar

```
src/components/forum/ArticleAiSdr.tsx    # ihlal teyit edilirse craft-özel fix (aksi halde dokunulmaz)
src/components/forum/ArticleClaude.tsx   # ihlal teyit edilirse craft-özel fix (aksi halde dokunulmaz)
tests/e2e/subpages-a11y.spec.ts          # iki bülten yolu PAGES'e mühürlenir
```

---

## Dikkat Noktaları

- **Düşük risk:** ikisi de `text-ink-faint` global fix miras (Bulgu 2); `text-canvas` yalnız `bg-ink` CTA. Envanter 0 ihlal verebilir → yalnız mühürle.
- **Tablo/grid yön riski:** ArticleClaude `grid-cols-[1fr_auto_auto]`, ArticleAiSdr fiyat sütunu → AR'de logical prop / hizalama gözle teyit (RTL asıl maliyet, kontrast dil-bağımsız).
- **Tema/reveal/locale tuzağı** harness'te çözüldü (8.01); AR RTL derin.
- **Lighthouse a11y=100 skor gate'i verify-phase'de** (manuel, 5 sayfa çift-tema); bu task'ın gate'i axe 0.

---

## Test Kriterleri

- [ ] `/bulten/ai-sdr-araclari` ve `/bulten/claude-opus-4-8-fable-5` — her biri × 5 dil × light+dark axe WCAG-AA **0 ihlal**.
- [ ] Ana sayfa `home-a11y` + önceki mühürlü alt sayfalar regresyonsuz (aynı koşu).
- [ ] AR `/ar/bulten/*`: `dir=rtl` + 0 `MISSING_MESSAGE` + logical prop bütünlüğü.
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
