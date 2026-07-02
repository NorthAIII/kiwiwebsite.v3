# TASK-5.02: Vitest jsdom Katmanı + Component Smoke Tohum Testi

**Durum:** ✅ Tamamlandı
**Modül:** M6 (infra, çapraz) — `modules/M6-SEO-Deploy.md`
**Feature:** D1.1 (test harness — Vitest jsdom/component katmanı)
**Faz:** Phase 5 (phases/PHASE-5.md)
**Bağımlılıklar:** TASK-5.01 ✅ (`vitest.config.ts`'i genişletir)

---

## Hedef

Vitest'e **jsdom (component) ortamını** ekle: `@vitejs/plugin-react` + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom` kur, config'e plugin + `setupFiles` wire et ve jsdom render yolunu kanıtlayan **minik bir component smoke testi** yaz. Tamamlanma: smoke testi jsdom'da yeşil render eder (seed'in 2. kanıtlı katmanı) ve `npm run test` hem i18n parite (node) hem smoke (jsdom) testini birlikte geçer.

---

## Bağlam

Research kararı (2026-06-30): "DOM/component katmanı = **şimdi kur + minik render-smoke testi**" — geniş component kapsamı değil, yalnız jsdom toolchain'inin **öz-kanıtı**. Amaç, ileride her feature'ın kendi component testini ekleyebileceği jsdom yolunu kurmak ve çalıştığını bir smoke testiyle kilitlemek. Bu, seed'in 3 kanıtlı katmanından 2.'sidir (Vitest-node · **Vitest-jsdom** · Playwright/axe).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-5.md` — "Araştırma Bulguları" (Vitest çift-ortam ayrımı, Teknik Kararlar: DOM katmanı kur+smoke)
- `vitest.config.ts` + `tests/i18n-parity.test.ts` (TASK-5.01 çıktısı)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-5.md` — Task Listesi tablosunda 5.02 durumu

---

## Alt Görevler

- [x] **1. Component-katmanı devDependency'lerini ekle** *(install anında teyit — Dokunulmazlar)*
  - `@vitejs/plugin-react@6.0.3`, `@testing-library/react@16.3.2`, `@testing-library/jest-dom@6.9.1`, `jsdom@29.1.1`
  - Ampirik teyit: install temiz (62 paket, ERESOLVE yok); `@vitejs/plugin-react@6.0.3` → `vite@8.1.1`, Vitest 4 de aynı vite'ı dedupe etti → peer çakışması yok ✓

- [x] **2. `vitest.config.ts` düzenle (zaten var — 5.01)**
  - `plugins: [react()]` ekle (`@vitejs/plugin-react`) — yalnız JSX transform için
  - `test.setupFiles: ['./vitest.setup.ts']`
  - Default ortam **node** kalır; component testleri dosya-başı `// @vitest-environment jsdom` pragma ile jsdom'a geçer (i18n parite hızlı/node'da kalır)

- [x] **3. `vitest.setup.ts` oluştur (YENİ)**
  - `import '@testing-library/jest-dom/vitest'` (matcher'ları Vitest `expect`'ine genişletir) — **kök entry değil `/vitest` subpath** (kök entry global `expect` bekler → Vitest'te "expect is not defined"; ↓ Sorunlar)

- [x] **4. `tests/smoke.test.tsx` oluştur (YENİ)**
  - Dosya-başı `// @vitest-environment jsdom`
  - **Inline trivial component** tanımla (`function Hello() { return <div>merhaba</div> }`) — src'ye component ekleme
  - `render(<Hello />)` + jest-dom matcher (`expect(screen.getByText('merhaba')).toBeInTheDocument()`); `afterEach(cleanup)`

- [x] **5. Kanıtla (kur+kanıtla milestone)**
  - `npm run test` yeşil: i18n parite (node, 5) + smoke (jsdom, 1) **birlikte** geçer → 6/6 ✓
  - jsdom render gerçekten çalışıyor (jest-dom matcher aktif; setup yanlışken "expect is not defined" → düzeltince geçti, vacuous-pass değil)
  - `next build` temiz (`✓ Compiled successfully`)

---

## Etkilenen Dosyalar

```
package.json         # 4 component devDep — zaten var
vitest.config.ts     # plugin-react + setupFiles — zaten var (5.01'de oluştu)
vitest.setup.ts      # YENİ
tests/
└── smoke.test.tsx   # YENİ
```

---

## Dikkat Noktaları

- **Component trivial olmalı** — `next-intl` / GSAP / `three` import **etmez**. jsdom'da WebGL yoktur; gerçek bir uygulama component'i (Hero, KiwiMark vb.) bu bağımlılıkları sürükler. Amaç toolchain öz-kanıtı → inline tanımla. (research Dikkat #5/#10)
- **Çift-ortam ayrımı.** Default node (i18n parite), jsdom yalnız pragma'lı dosyalarda. Kümülatif büyüyünce `test.projects` (node/jsdom ayrı proje) ile bölünür — **şimdi değil** (research Dikkat #6).
- **`@vitejs/plugin-react` yalnız JSX transform için** — SSR/Next pipeline'ı değil.
- **4 devDep `package.json` Dokunulmaz** — install anında teyit (bilinçli tek-sefer).
- `setupFiles` jest-dom'u tüm test dosyalarına yükler; node testleri (i18n parite) matcher kullanmaz ama setup zararsız.

---

## Test Kriterleri

- [x] `npm run test` yeşil: i18n parite (node) **ve** smoke (jsdom) testi birlikte geçer → 6/6
- [x] jsdom render yolu kanıtlandı (jest-dom matcher `toBeInTheDocument` çalışır)
- [x] `vitest.setup.ts` jest-dom'u yükler; config `plugins: [react()]` + `setupFiles` içerir
- [x] `npm run build` (next build) temiz geçer

---

## Karar Noktaları

- **Bağımlılık ekleme (`package.json` Dokunulmaz):** 4 component devDep install anında kullanıcı onayıyla eklenir (araç seti research'te onaylı; install anı bilinçli teyit).

---

## Risk ve Geri Dönüş Planı

- **Risk:** devDep ekleme + config düzenleme (5.01'in node testini kırmamalı) → düşük.
- **Rollback:** 4 devDep + `vitest.setup.ts` + `tests/smoke.test.tsx` geri al; `vitest.config.ts`'i 5.01 haline döndür (plugin/setupFiles satırlarını çıkar).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅

**Son Yaklaşım:** Tamamlandı — pause/devam beklemiyor.

**Sonraki Adım Detayı:** Faz 5'te sıradaki: TASK-5.03 (Playwright + axe harness + a11y regresyon tohum, `/` light+dark). Bu task'ın bıraktığı zemin: Vitest çift-ortam (node default + jsdom pragma) kurulu; 5.03 ayrı runner (`@playwright/test` + `@axe-core/playwright`), vitest.config'e dokunmaz.

**Yapılanlar:**
- 4 component devDep kuruldu (kullanıcı install-anı onayı alındı — Dokunulmaz): `@vitejs/plugin-react@6.0.3`, `@testing-library/react@16.3.2`, `@testing-library/jest-dom@6.9.1`, `jsdom@29.1.1`. Install temiz; peer `vite ^8` Vitest 4 ile aynı `vite@8.1.1`'e dedupe oldu (research riski materyalize olmadı).
- `vitest.config.ts`: `plugins: [react()]` (JSX transform) + `test.setupFiles: ['./vitest.setup.ts']`; default ortam **node** korundu (i18n parite hızlı kalır).
- `vitest.setup.ts` (YENİ): `import '@testing-library/jest-dom/vitest'`.
- `tests/smoke.test.tsx` (YENİ): `// @vitest-environment jsdom` pragma + inline trivial `Hello` component + `render` + `toBeInTheDocument` + `afterEach(cleanup)`.

**Sorunlar:**
- **jest-dom kök entry Vitest'te çalışmaz.** İlk denemede `import '@testing-library/jest-dom'` (kök) → her iki test suite `ReferenceError: expect is not defined` ile düştü. Neden: kök entry Jest-tarzı **global `expect`** bekler; Vitest `globals:false`'ta `expect`'i global yapmaz. Çözüm: jest-dom v6'nın resmi Vitest subpath'i `@testing-library/jest-dom/vitest` (Vitest'in `expect`'ini doğrudan extend eder). → Faz retrosuna aday (icra nüansı; review-phase PHASE-5'e yazar).

**Kararlar:**
- Yeni mimari/iş-kuralı kararı yok (araç/sürüm/yığın research'te onaylanmıştı). · docs/DECISIONS.md'ye eklendi: Hayır

**Dosya Değişiklikleri:**
- `package.json` / `package-lock.json` — 4 devDep (onaylı)
- `vitest.config.ts` — plugins + setupFiles (düzenlendi)
- `vitest.setup.ts` — YENİ
- `tests/smoke.test.tsx` — YENİ

**Test Sonuçları:**
- `npm run test`: 2 dosya / **6 test geçti** (5 i18n parite node + 1 smoke jsdom). Verbose ile ortam ayrımı teyit edildi.
- jsdom render kanıtı: setup hatasında suite'ler düştü, `/vitest` düzeltmesiyle geçti → matcher gerçekten aktif (vacuous pass değil).
- `npm run build`: `✓ Compiled successfully` — temiz.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- Vitest'e jsdom (component) katmanı eklendi: `@vitejs/plugin-react` (JSX transform) + RTL + jest-dom + jsdom kuruldu, config'e `plugins`+`setupFiles` wire edildi, default node ortamı korundu.
- jsdom render yolunu öz-kanıtlayan minik smoke testi yazıldı (inline trivial component) — seed'in 3 kanıtlı katmanından 2.'si (Vitest-node · **Vitest-jsdom** · Playwright/axe). `npm run test` 6/6 yeşil, `next build` temiz.

**Öğrenilenler:**
- **jest-dom + Vitest = `/vitest` subpath şart.** Kök `@testing-library/jest-dom` importu global `expect` bekler ve Vitest'te (`globals:false`) "expect is not defined" verir; resmi entegrasyon `@testing-library/jest-dom/vitest`'tir. (Faz retro adayı — PHASE-5.)
- `@vitejs/plugin-react@6` peer `vite ^8` ile Vitest 4 zincirinde çakışmadı (ikisi de `vite@8.1.1` dedupe) — research'in install-anı doğrulama notu yeşil.

---

**Oluşturulma:** 2026-06-30
