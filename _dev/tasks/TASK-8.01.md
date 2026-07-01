# TASK-8.01: Parametrik alt-sayfa a11y harness'i + baseline ölçüm envanteri

**Durum:** ⬜ Bekliyor
**Modül:** M6 (test altyapısı, çapraz) + M1–M3 (a11y ölçüm yüzeyi)
**Feature:** TD6 temeli (kümülatif harness genişletme) + TD5 audit (ölçüm-önce)
**Faz:** Phase 8 (phases/PHASE-8.md)
**Bağımlılıklar:** Yok (fazın ilk task'i; Faz 5 harness'i üzerine kurulur)

---

## Hedef

5 alt sayfayı ana sayfa çıtasında denetlemek için **parametrik axe harness'ini kur** (mevcut `home-a11y.spec.ts` desenini alt sayfalara taşı) ve **5 alt sayfanın gerçek a11y baseline'ını axe ile ölç** (grep hipotezi değil, ham axe teyidi). Bu task kod fix'i **yapmaz** ve hiçbir sayfayı henüz mühürlemez (SEAL) — yalnız *aracı* (harness) ve *bilgiyi* (baseline ihlal envanteri) üretir; fix task'ları (8.02–8.05) bu envanteri tüketir. Tamamlanmış sayılır: harness kurulu + `home-a11y` yeşil kalıyor + 5 sayfanın light+dark axe ihlal envanteri (+ AR RTL notu) task oturum kaydına yazılı.

---

## Bağlam

Faz 8 discuss+research kararı **ölçüm-önce**: TD4 premisi (alt sayfalarda ham `text-pulse` süpürmesi) kod taramasıyla çürüdü (Bulgu 0) — tek ham `text-pulse` `BunkerShowcase.tsx:85`'te `aria-hidden` dekoratif SVG (text-node değil). Gerçek risk yüzeyi **dark-panel inversiyonu** (`text-canvas/NN` + `text-green/30`), Bulgu 1. Bu yüzden fix'ler ham axe koşusundan **türetilir**, önceden yapılmaz (memory: "gerçek axe koşusu olmadan pre-fix yapma" + CLAUDE.md #5 varsayım sorgulama). Bu task o axe koşusunu ve onu tekrarlanabilir kılan harness'i getirir.

Araştırma "Yaklaşım A" seçti: mevcut `home-a11y.spec.ts` disiplinini (light+dark döngü, `reducedMotion:'reduce'` + `scrollThrough`, `WCAG_TAGS` alt-küme, `NEXT_LOCALE=tr` cookie) parametrik olarak alt sayfalara taşı. Yeni paket yok (Dokunulmazlar).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-8.md` — Araştırma Bulguları (Bulgu 0/1/2, Değerlendirilen Yaklaşımlar, Dikkat Edilecekler)
- `_dev/docs/TESTING.md` — a11y ölçüm disiplini (özet) + "Yeni Test Nasıl Eklenir" (alt-sayfa kapsamı buradan büyür)
- `tests/e2e/home-a11y.spec.ts` — genişletilecek referans desen (scrollThrough, WCAG_TAGS, cookie, tema döngüsü)
- `playwright.config.ts` — webServer (build+start :3000), chromium-only, retries:0
- `_dev/memory/a11y-olcum-tema-tuzagi.md` — tema tuzağı (dark-panel inversiyonu)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-8.md` — Task Listesi tablosunda 8.01 durumu

---

## Alt Görevler

- [ ] **1. Paylaşımlı a11y helper modülünü çıkar**
  - `tests/e2e/a11y-helpers.ts` (YENİ): `WCAG_TAGS`, `scrollThrough(page)`, ve `gotoLocalized(page, context, locale, path)` — locale=`tr` ise prefixsiz path + `NEXT_LOCALE=tr` cookie (localhost); diğer locale'lerde `/${locale}${path}` (cookie yok, açık prefix).
  - `tests/e2e/home-a11y.spec.ts`'i bu helper'ları import edecek şekilde refactor et (davranış birebir korunur, yeşil kalır) — kopya kod önlenir (Modülerlik ekseni).

- [ ] **2. Parametrik alt-sayfa spec iskeletini oluştur**
  - `tests/e2e/subpages-a11y.spec.ts` (YENİ): `PAGES` (başlangıçta **boş**) × `LOCALES=["tr","en","ar","de","es"]` × `["light","dark"]` matrisi. Her kombinasyon: `gotoLocalized` → `emulateMedia({colorScheme, reducedMotion:"reduce"})` → `scrollThrough` → `AxeBuilder().withTags(WCAG_TAGS).analyze()` → `expect(violations).toEqual([])`.
  - `PAGES` boş olduğu için bu spec **hiçbir alt-sayfa iddiası enforce etmez** (CI yeşil kalır); fix task'ları (8.02–8.05) sayfayı `PAGES`'e ekleyerek mühürler. Sayfa tanımı: `{ label, path }` (path = TR prefixsiz yol).

- [ ] **3. 5 alt sayfanın baseline'ını ölç (ham axe)**
  - Harness'i ölçüm modunda koş (geçici olarak 5 sayfayı denetle; TR light+dark kontrast envanteri + AR RTL/`MISSING_MESSAGE` teyidi yeterli — kontrast dil-bağımsız, research). 5 sayfa: `/bunker-os`, `/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`.
  - Her sayfa için axe ihlal listesini (kural id + selector + tema) kaydet. Ölçüm bittikten sonra `PAGES` boş bırakılır (mühürleme fix task'larında).

- [ ] **4. Envanteri task oturum kaydına yaz**
  - Hangi sayfada hangi selector'ün light/dark'ta ihlal verdiği (özellikle `BunkerShowcase` `text-canvas/45,50,60,85` + `text-green/30`); hangi sayfaların baseline'da **0 ihlal** verdiği (muhtemelen gym/case/bülten — `text-ink-faint` global fix mirası). AR'de `dir=rtl` + 0 `MISSING_MESSAGE` (build/console) notu. Bu envanter 8.02–8.05'in girdisidir.

---

## Etkilenen Dosyalar

```
tests/e2e/
├── a11y-helpers.ts        # YENİ — WCAG_TAGS + scrollThrough + gotoLocalized
├── subpages-a11y.spec.ts  # YENİ — parametrik matris (PAGES boş başlar)
└── home-a11y.spec.ts      # helper import edecek şekilde refactor (davranış aynı)
_dev/tasks/TASK-8.01.md    # oturum kaydına baseline envanteri
```

---

## Dikkat Noktaları

- **Locale tuzağı alt sayfalarda ana sayfadan FARKLI:** TR alt sayfa = prefixsiz (`/spor-salonu-yazilimi`) → next-intl `localeDetection` `/en/...`'e yönlendirir, `NEXT_LOCALE=tr` cookie **şart**. EN/AR/DE/ES = açık prefix (`/ar/...`), cookie'siz doğrudan. (memory: locale tuzağı.)
- **Tema tuzağı:** her sayfa light+dark; asıl risk dark-panel inversiyonu (`bg-ink`→krem). `emulateMedia({colorScheme})`. (memory.)
- **Reveal tuzağı:** alt sayfalar da `data-reveal`/GSAP `opacity:0` → `reducedMotion:'reduce'` + `scrollThrough` şart, yoksa alt-fold içerik taranmaz (yanlış yeşil).
- **Ölçüm ≠ fix:** Bu task hiçbir sayfayı mühürlemez, hiçbir renk/markup değiştirmez. Baseline'da 0 ihlal veren sayfa da olabilir (ilgili fix task'ı "yalnız mühürle" olur) — bu beklenen, sorun değil.
- **CI süresi:** Mühürlenecek tam matris 5 sayfa × 5 dil × 2 tema = 50 alt-sayfa testi (kullanıcı kararı: maksimum kapsam). Bu task'ta `PAGES` boş → CI etkisi yok; büyüme fix task'larında kademeli. Spec yapısı 50 koşuyu makul sürede taşıyacak biçimde (paralel Playwright worker, retries:0) kurulur.
- **Yeni bağımlılık yok** — `@playwright/test` + `@axe-core/playwright` repoda kurulu.

---

## Test Kriterleri

- [ ] `npm run test:e2e` yeşil — `home-a11y` refactor sonrası davranış aynı (light+dark 0 ihlal), `subpages-a11y` (PAGES boş) hata vermeden geçer.
- [ ] `a11y-helpers.ts` export'ları (`WCAG_TAGS`, `scrollThrough`, `gotoLocalized`) hem home hem subpages spec'inde kullanılıyor (kopya kod yok).
- [ ] 5 alt sayfanın baseline axe envanteri (selector + tema başına ihlal / 0-ihlal) task oturum kaydına yazıldı.
- [ ] AR alt sayfalarda `dir="rtl"` + 0 `MISSING_MESSAGE` teyidi kaydedildi.
- [ ] `next build` temiz geçer.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits)
- [ ] Bu doküman güncellendi (oturum kaydı + baseline envanteri)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [durum]

**Baseline Envanteri (8.02–8.05 girdisi):**
- [Sayfa → tema → ihlal/0-ihlal listesi buraya]

---

**Oluşturulma:** 2026-07-01
