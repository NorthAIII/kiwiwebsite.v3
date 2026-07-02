# TASK-8.05: /bulten makale sayfaları (2) a11y teyit + regresyon tohumu

**Durum:** ✅ Tamamlandı
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

- [x] **1. İki sayfayı `PAGES`'e ekle, ölç** — `subpages-a11y.spec.ts` `PAGES`'e `/bulten/ai-sdr-araclari` + `/bulten/claude-opus-4-8-fable-5` eklendi; her biri 5 dil × light+dark = **0 ihlal**, 8.01 envanteriyle (0 ihlal) birebir örtüştü.
- [x] **2. Teyitli ihlal varsa sayfaya-özel düzelt** — axe ihlali yok (kontrast temiz). ArticleClaude'da RTL craft düzeltmesi yapıldı (physical→logical prop, aşağıda); ArticleAiSdr dokunulmadı (grep temiz).
- [x] **3. Görsel + AR RTL teyit** — her iki sayfa light+dark gözle regresyonsuz; `/ar/bulten/*` `dir=rtl` (prerender+runtime) + MISSING_MESSAGE 0 + tablo/metrik hizası aynalandı.
- [x] **4. Mühürle** — iki sayfa `PAGES`'te kalıcı; `npm run test:e2e` yeşil (**52 test**, 5 alt sayfa mühürlü), ana sayfa regresyonsuz.

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

- [x] `/bulten/ai-sdr-araclari` ve `/bulten/claude-opus-4-8-fable-5` — her biri × 5 dil × light+dark axe WCAG-AA **0 ihlal**.
- [x] Ana sayfa `home-a11y` + önceki mühürlü alt sayfalar regresyonsuz (aynı koşu, 52 test).
- [x] AR `/ar/bulten/*`: `dir=rtl` + 0 `MISSING_MESSAGE` + logical prop bütünlüğü (ArticleClaude physical→logical fix).
- [x] Fix yapıldıysa: görsel craft korunmuş (gözle, TR light + AR dark screenshot). `next build` temiz.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler + test kriterleri karşılandı
- [x] Git commit & push · bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-01

**Durum:** ✅ Tamamlandı

**Ne yapıldı:**
- **Mühür:** `tests/e2e/subpages-a11y.spec.ts` `PAGES`'e iki bülten yolu eklendi (`bulten/ai-sdr-araclari`, `bulten/claude-opus-4-8-fable-5`); 8.05 placeholder yorumları kaldırıldı. **5 alt sayfanın tamamı artık mühürlü** (TD5/TD6 milestone çekirdeği).
- **Ölçüm:** her sayfa 5 dil × light+dark = 10 test → **0 ihlal**; 8.01 baseline'ı (0 ihlal) birebir doğrulandı → kontrast fix yok. İki bileşen temiz: gövde `text-ink-soft`, `text-ink-faint` (Faz 4 global fix mirası, Bulgu 2); `text-green` uppercase etiket kontrast geçer; `text-canvas` yalnız `bg-ink` yüksek-kontrast CTA butonunda.
- **RTL craft fix (ArticleClaude):** grep, model tablosunda gerçek physical directional prop buldu — `ml-2` (not boşluğu, RTL'de yanlış tarafa düşüyordu) + `text-right` ×4 (başlık + veri sütunları). Proje konvansiyonu (CLAUDE.md: "AR'de logical CSS prop'ları, physical değil") gereği logical'a çevrildi: `ml-2`→`ms-2`, `text-right`→`text-end`. **LTR (tr/en/de/es) birebir aynı** (screenshot ile teyit), **RTL doğru aynalanır**, sıfır risk. ArticleAiSdr dokunulmadı — grep yalnız false-positive verdi (`border-b` dikey, `border-line` renk token'ı, `rounded-2xl` tam yuvarlak; layout `flex`/`justify-between`/`gap` = logical-güvenli).
- **AR RTL teyit:** `/ar/bulten/*` prerender (`.next/server/app/ar/bulten/*.html`) + runtime `dir="rtl"` ✅; `lang="ar"`; MISSING_MESSAGE 0 (prerender + runtime curl her ikisinde).
- **Görsel:** Playwright screenshot TR light + AR dark (iki sayfa) → craft korunmuş, AR layout tam aynalanmış (nav/başlık/tablo/liste/CTA). Tablo fix sonrası TR isim–not boşluğu ve sağ hizalama yerinde, AR mirror konvansiyon-doğru. İçerik notu (kapsam dışı): bileşen gövde metni TR/EN hardcoded (ar/de/es→EN fallback), next-intl anahtarı değil → MISSING_MESSAGE yok.

**Test sonuçları:**
- `npm run build` temiz (iki bülten sayfası 5 dil prerender; fix sonrası yeniden build).
- `npm run test:e2e` yeşil — **52 test**: home 2 + bunker-os 10 + gym 10 + vaka 10 + bülten 20, 0 ihlal.
- `npm run test` (Vitest) yeşil — 7 test (i18n parite + smoke).

---

**Oluşturulma:** 2026-07-01
