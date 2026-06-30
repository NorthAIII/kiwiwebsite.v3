# TASK-5.02: Vitest jsdom Katmanı + Component Smoke Tohum Testi

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Component-katmanı devDependency'lerini ekle** *(install anında teyit — Dokunulmazlar)*
  - `@vitejs/plugin-react@6.0.3`, `@testing-library/react@16.3.2`, `@testing-library/jest-dom@6.9.1`, `jsdom@29.1.1`
  - Ampirik teyit: install temiz; `@vitejs/plugin-react` peer `vite ^8` ile Vitest 4 zincirinde çakışma yok (install anında doğrula — research not)

- [ ] **2. `vitest.config.ts` düzenle (zaten var — 5.01)**
  - `plugins: [react()]` ekle (`@vitejs/plugin-react`) — yalnız JSX transform için
  - `test.setupFiles: ['./vitest.setup.ts']`
  - Default ortam **node** kalır; component testleri dosya-başı `// @vitest-environment jsdom` pragma ile jsdom'a geçer (i18n parite hızlı/node'da kalır)

- [ ] **3. `vitest.setup.ts` oluştur (YENİ)**
  - `import '@testing-library/jest-dom'` (matcher'ları global yükler)

- [ ] **4. `tests/smoke.test.tsx` oluştur (YENİ)**
  - Dosya-başı `// @vitest-environment jsdom`
  - **Inline trivial component** tanımla (örn. `function Hello() { return <div>merhaba</div> }`) — src'ye component ekleme
  - `render(<Hello />)` + jest-dom matcher (`expect(screen.getByText('merhaba')).toBeInTheDocument()`)

- [ ] **5. Kanıtla (kur+kanıtla milestone)**
  - `npm run test` yeşil: i18n parite (node) + smoke (jsdom) **birlikte** geçer
  - jsdom render gerçekten çalışıyor (jest-dom matcher aktif, hata vermeden)
  - `next build` temiz

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

- [ ] `npm run test` yeşil: i18n parite (node) **ve** smoke (jsdom) testi birlikte geçer
- [ ] jsdom render yolu kanıtlandı (jest-dom matcher `toBeInTheDocument` çalışır)
- [ ] `vitest.setup.ts` jest-dom'u yükler; config `plugins: [react()]` + `setupFiles` içerir
- [ ] `npm run build` (next build) temiz geçer

---

## Karar Noktaları

- **Bağımlılık ekleme (`package.json` Dokunulmaz):** 4 component devDep install anında kullanıcı onayıyla eklenir (araç seti research'te onaylı; install anı bilinçli teyit).

---

## Risk ve Geri Dönüş Planı

- **Risk:** devDep ekleme + config düzenleme (5.01'in node testini kırmamalı) → düşük.
- **Rollback:** 4 devDep + `vitest.setup.ts` + `tests/smoke.test.tsx` geri al; `vitest.config.ts`'i 5.01 haline döndür (plugin/setupFiles satırlarını çıkar).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [...]

**Sorunlar:**
- [...]

**Kararlar:**
- [...] · docs/DECISIONS.md'ye eklendi: [Evet/Hayır]

**Dosya Değişiklikleri:**
- [...]

**Test Sonuçları:**
- [...]

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
- [...]

**Öğrenilenler:**
- [...]

---

**Oluşturulma:** 2026-06-30
