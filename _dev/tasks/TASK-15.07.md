# TASK-15.07: SEO/metadata (Alpfit Plus konumu) + eski Gym temizliği + guardrail doğrulama

**Durum:** ⬜ Bekliyor
**Modül:** M6 (SEO/Deploy) + M2 (temizlik) + M4 (meta i18n)
**Feature:** AP3 (SEO/metadata) + faz kapanış doğrulaması
**Faz:** Phase 15 (phases/PHASE-15.md)
**Bağımlılıklar:** TASK-15.01–15.06 (tüm bölümler tamamlandı → sayfa tam render)

---

## Hedef

Fazı kapat: (1) **SEO/metadata** — `generateMetadata` başlık/description'ı "Alpfit Plus" ürün konumuna göre güncelle (5-dil `alpfit.meta.*` anahtarlarından; route `/spor-salonu-yazilimi` + `localizedAlternates` korunur); (2) **eski Gym temizliği** — orphan `components/gym/GymSoftwareShowcase.tsx` silinir (kod hijyeni); (3) **guardrail doğrulama** — tam sayfa a11y çift-tema (axe + Lighthouse milestone gate) · i18n 5-dil parite · `next build` temiz · RTL (AR) tutarlı · dürüstlük 4/4 · marka sesi yasakları · reduced-motion. Tamamlanma: sayfa milestone'u karşılar (artifact düzeni 5 dilde çalışır, guardrail regresyonsuz), faz verify-phase'e hazır.

---

## Bağlam

AP3 (SEO) bilinçle sona bırakıldı — ürün konum kopyası içerik tamamlandıktan sonra netleşir. Bu task aynı zamanda fazın **entegrasyon/temizlik** kapısıdır: page.tsx zaten AlpfitShowcase'i render ediyor (15.01), tüm bölümler bağlı (15.02–15.06); burada SEO metadata + orphan silme + tam guardrail sweep yapılır. `subpages-a11y.spec.ts:24` `/spor-salonu-yazilimi`'yi zaten kapsar → redesign bu mührü kırmamalı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `src/app/[locale]/spor-salonu-yazilimi/page.tsx` — mevcut `generateMetadata` (title ternary + `localizedAlternates`)
- `src/i18n/metadata.ts` — `localizedAlternates`/`localePath` (dokunulmaz, korunur)
- `tests/e2e/subpages-a11y.spec.ts` — `/spor-salonu-yazilimi` mühür (L24)
- `_dev/MEMORY.md` — `a11y-olcum-tema-tuzagi` (Lighthouse çift-tema + `NEXT_LOCALE=tr` cookie disiplini) + `sandbox-runtime-browser-page-route` (Playwright exit 144 fallback)
- `_dev/docs/TESTING.md` — test komutları + a11y ölçüm disiplini
- `_dev/phases/PHASE-15.md` — Milestone + "Dikkat Edilecekler" (guardrail listesi)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md`, `_dev/phases/PHASE-15.md` (Task Listesi)
- `_dev/docs/DECISIONS.md` — **gerekirse** (SEO konum kararı önemliyse)

---

## Alt Görevler

- [ ] **1. SEO/metadata güncelle (AP3)**
  - `src/app/[locale]/spor-salonu-yazilimi/page.tsx` `generateMetadata`: başlık "Alpfit Plus" ürün konumuna göre (örn. "Alpfit Plus — Kulüp İşletme Yazılımı — Kiwi AI Lab") + `description` eklenir. Değerler 5-dil `alpfit.meta.{title,description}` anahtarlarından (`getTranslations`), ternary yerine namespace.
  - `alternates: localizedAlternates(locale, "/spor-salonu-yazilimi")` **aynen korunur** (route rename yok; sığ-merge tuzağı: `alternates` bütün-obje).
  - i18n: `alpfit.meta.{title,description}` 5 dile eklenir (TR yetkili; ürün konumu — "Crew OS ile karışmaz", Alpfit ayrı ürün).

- [ ] **2. Eski Gym temizliği**
  - `src/components/gym/GymSoftwareShowcase.tsx` **silinir** (orphan — page.tsx 15.01'den beri AlpfitShowcase render ediyor). `next/image` import'u bu sayfadan tamamen düşer.
  - **`public/gym/*.png` KALIR** (asset silme Kapsam Dışı — disk temizliği ayrı iş). `components/gym/` dizini boşalırsa silinir.
  - Grep: `GymSoftwareShowcase` başka yerde import edilmiyor mu doğrula (yalnız eski page.tsx idi).

- [ ] **3. Guardrail doğrulama (milestone gate)**
  - `next build` temiz: 37+ SSG, `/spor-salonu-yazilimi` 5 locale, 0 `MISSING_MESSAGE`, 0 warn.
  - `npm run test` yeşil: i18n-parite (tam `alpfit` namespace 5 dil eşzamanlı) + mevcut Vitest.
  - **a11y çift-tema:** `subpages-a11y` axe `/spor-salonu-yazilimi` light+dark 0 ihlal (koyu aside + fiyat bandı + telefon `--a-*` dahil) + Lighthouse a11y=100 çift-tema (milestone gate; `NEXT_LOCALE=tr` cookie + reducedMotion disiplini — MEMORY). Sandbox `next start`/Playwright exit 144 verirse → `page.route` interception fallback (MEMORY `sandbox-runtime-browser-page-route`) veya build+gözle.
  - **RTL (AR):** `/ar/spor-salonu-yazilimi` bölümleri aynalı (before/after tick, roller, aside, fiyat satırları); telefon içi `dir="ltr"` korunur, bozulmaz.
  - **Marka sesi:** doktor/teşhis metaforu yok; sahte "online" yok (pilot nabzı gerçek canlı → meşru); lorem/dolgu yok; dürüstlük 4/4 aynen.
  - **perf/CLS:** görsel yok → LCP metin (h1); sabit-boyut kartlar/mockup → CLS≈0. Korunan taban regresyonsuz.

---

## Etkilenen Dosyalar

```
src/app/[locale]/spor-salonu-yazilimi/page.tsx   # generateMetadata → alpfit.meta.* (title+description)
src/components/gym/GymSoftwareShowcase.tsx        # SİLİNİR (orphan)
messages/tr.json                                  # alpfit.meta.* — TR yetkili
messages/en.json                                  # alpfit.meta.* — TR kopyası (stale)
messages/ar.json                                  # alpfit.meta.* — TR kopyası (stale)
messages/de.json                                  # alpfit.meta.* — TR kopyası (stale)
messages/es.json                                  # alpfit.meta.* — TR kopyası (stale)
```

> `public/gym/*.png` KALIR (Kapsam Dışı). `localizedAlternates`/`metadata.ts` dokunulmaz.

---

## Dikkat Noktaları

- **`alternates` bütün-obje yaz** — yalnız `canonical` yazmak `languages`'ı düşürür (metadata.ts uyarısı, TB-1). `localizedAlternates(locale,"/spor-salonu-yazilimi")` aynen kullan.
- **Route korunur:** `/spor-salonu-yazilimi` (public sektör-tanımlı; iç-ad sızıntısı yok; rename gerekçesi yok). SEO yalnız başlık/description konumu.
- **a11y çift-tema gerçek gate:** axe WCAG-AA 0 ihlal ≠ Lighthouse a11y=100 (MEMORY süreç disiplini). İki gate de koş: axe tohumu (`subpages-a11y`) + Lighthouse çift-tema. Koyu paneller (aside/bant) tema-flip kontrast tuzağı — light+dark ayrı.
- **Sandbox runtime:** `next start`/Playwright exit 144 olası → `page.route` fallback veya build-ground-truth + gözle (MEMORY). "Test atlandı" DEĞİL — ortam-bağımsız yönteme düş.
- **Telefon i18n-dışı sabit TR** doğrula: AR sayfada telefon içi TR + `dir=ltr`, sayfanın geri kalanı AR/RTL.
- **Orphan silmeden önce grep** — `GymSoftwareShowcase` başka tüketici yok (yalnız eski page.tsx idi).

---

## Test Kriterleri

- [ ] `next build` temiz: `/spor-salonu-yazilimi` 5 locale SSG, 0 `MISSING_MESSAGE`, 0 warn; `GymSoftwareShowcase` silindikten sonra build kırılmaz.
- [ ] `npm run test` yeşil: i18n-parite tam `alpfit` namespace (meta dahil) 5 dil eşzamanlı.
- [ ] SEO: 5 locale metadata başlık "Alpfit Plus" konumu + description; `alternates` self-canonical + 5-dil hreflang korunur (curl/build çıktısı doğrula).
- [ ] a11y: axe `/spor-salonu-yazilimi` light+dark 0 ihlal + Lighthouse a11y=100 çift-tema (veya sandbox fallback + gözle).
- [ ] RTL: `/ar/spor-salonu-yazilimi` aynalı; telefon `dir=ltr` bozulmaz.
- [ ] Dürüstlük 4/4 + marka sesi yasakları + reduced-motion tam fallback korunur.
- [ ] Orphan `GymSoftwareShowcase.tsx` silindi; başka import yok.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler + test kriterleri
- [ ] Git commit & push (`feat(TASK-15.07): ...`)
- [ ] Bu doküman + DURUM.md güncellendi
- [ ] Faz milestone karşılandı → verify-phase 15'e hazır

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
