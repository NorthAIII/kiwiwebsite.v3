# TASK-5.05: Kümülatif Test Convention Notu (docs/TESTING.md)

**Durum:** ✅ Tamamlandı
**Modül:** M6 / docs — `modules/M6-SEO-Deploy.md`
**Feature:** D1.5 (kümülatif test convention notu)
**Faz:** Phase 5 (phases/PHASE-5.md)
**Bağımlılıklar:** TASK-5.01 ✅, TASK-5.02 ✅, TASK-5.03 ✅, TASK-5.04 ✅ (kurulmuş harness'i belgeler)

---

## Hedef

Kısa bir test convention dokümanı (`_dev/docs/TESTING.md`) yaz: testlerin **nerede yaşadığı**, **nasıl koşulduğu** (`npm run test` / `npm run test:e2e`), **3 katman** (Vitest-node / Vitest-jsdom / Playwright-axe), **a11y ölçüm disiplini** ve **"her yeni feature kendi testini ekler"** kümülatif beklentisi. INDEX'e içerik dokümanı olarak ekle. Tamamlanma: doküman repoda + INDEX güncel + içindeki komutlar gerçekten çalışır.

---

## Bağlam

Kümülatif ilke (ILKELER "test atlanmaz; altyapı her geliştirmeyle üstüne koyarak büyür") ancak **"nasıl/nerede test eklenir" yazılı** olursa gerçekleşir — aksi halde harness kurulur ama sahipsiz kalır, kimse yeni test eklemez (discuss kararı: "benimseme = kısa convention notu"). Bu doküman, harness'i kullanılabilir/sürdürülebilir kılan sahipsiz-alan-kapatmadır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-5.md` — fazın kurduğu harness'in tam resmi (3 katman, a11y disiplini, CI)
- `_dev/ILKELER.md` — "Kümülatif test altyapısı" ilkesi (doküman bunu somutlaştırır)
- Kurulan artefaktlar: `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `tests/`, `.github/workflows/ci.yml`, `package.json` scriptleri
- `_dev/memory/a11y-olcum-tema-tuzagi.md` + MEMORY (a11y tuzakları — **özetlenip pointer verilecek, kopyalanmayacak**)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/INDEX.md` — Bilgi Havuzu tablosuna `docs/TESTING.md` satırı
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-5.md` — Task Listesi tablosunda 5.05 durumu

---

## Alt Görevler

- [ ] **1. `_dev/docs/TESTING.md` oluştur (YENİ)** — kısa, şu başlıklar:
  - **Komutlar:** `npm run test` (Vitest: birim + i18n parite, node+jsdom) · `npm run test:e2e` (Playwright: a11y)
  - **Test yerleri:** `tests/**/*.test.{ts,tsx}` (Vitest) · `tests/e2e/**/*.spec.ts` (Playwright). Config'ler: `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`
  - **3 katman ve ne için:** (a) Vitest **node** = saf mantık / i18n parite; (b) Vitest **jsdom** = component render (`// @vitest-environment jsdom` pragma); (c) **Playwright/axe** = gerçek tarayıcı a11y/E2E
  - **a11y ölçüm disiplini (kritik tuzaklar — özet + pointer):** light+dark iki koşu · `NEXT_LOCALE=tr` cookie · `reducedMotion:'reduce'` + uçtan-uca scroll · axe `withTags` WCAG etiketleri (Lighthouse-altküme ≠ ham axe). Detay → `phases/PHASE-4.md`, `phases/PHASE-5.md`, `memory/a11y-olcum-tema-tuzagi.md`
  - **Kümülatif beklenti:** "her yeni feature/fix **kendi testini ekler**; geriye dönük güven artmalı, azalmamalı." Yeni test nasıl eklenir (hangi katman seçilir, dosya nereye/hangi suffix)
  - **CI:** push/PR'da otomatik koşar (fast + a11y job) — `.github/workflows/ci.yml`

- [ ] **2. `_dev/INDEX.md` güncelle** — Bilgi Havuzu tablosuna `docs/TESTING.md` ekle (içerik dokümanı; "Son Güncelleme" satırı üzerine yazılır)

- [ ] **3. Doğrula** — doc'taki komutlar (`npm run test`, `npm run test:e2e`) mevcut `package.json` scriptleriyle birebir eşleşir; yollar gerçek artefaktlarla eşleşir

---

## Etkilenen Dosyalar

```
_dev/docs/TESTING.md   # YENİ
_dev/INDEX.md          # Bilgi Havuzu satırı — zaten var
```

---

## Dikkat Noktaları

- **Tekrarlayan bilgi yazma** — a11y tuzakları zaten MEMORY/PHASE-4/PHASE-5'te. TESTING.md **özet + pointer** verir, kopyalamaz (Dokümantasyon İlkeleri: bir bilgi tek yerde).
- **`_dev/` izolasyonu** — doküman `_dev/docs/` içinde; projenin kendi README/docs'uyla karışmaz.
- **İçerik dokümanı → INDEX'e eklenir** (Bilgi Havuzu), task/faz gibi enumere-edilmeyen değil.
- **Kısa tut** — convention notu, kapsamlı kılavuz değil; tek-okunabilir kalmalı (Boyut ve Bölünme).
- **Kapsam dışı:** QUALITY §8 "Test Kapsamı (aspirasyonel — altyapı henüz yok)" notu bu fazdan sonra bayatlar; güncellenmesi **review-phase** (faz kapanışı) işidir — bu task'ta açma, yalnız gerekirse işaret et.

---

## Test Kriterleri

- [ ] `docs/TESTING.md` mevcut; komutlar + test yerleri + 3 katman + a11y disiplini (özet/pointer) + kümülatif beklenti + CI içerir
- [ ] `INDEX.md` Bilgi Havuzu'nda `docs/TESTING.md` listelenir
- [ ] Doc'taki komutlar gerçek `package.json` scriptleriyle eşleşir (`npm run test`, `npm run test:e2e`)
- [ ] Doc tek-okunabilir (kısa); a11y tuzakları kopyalanmamış, pointer'lanmış

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅

**Yapılanlar:**
- `_dev/docs/TESTING.md` oluşturuldu (YENİ): komutlar tablosu (`npm run test` / `test:watch` / `test:e2e`) + test yerleri/config'ler + 3 katman (Vitest node/jsdom + Playwright/axe) ve ne için + a11y ölçüm disiplini (5 madde, özet+pointer — kopyalanmadı) + "yeni test nasıl eklenir" (katman seçimi, suffix, kümülatif beklenti) + CI bölümü. Kısa, tek-okunabilir.
- `_dev/INDEX.md` Bilgi Havuzu tablosuna `docs/TESTING.md` satırı eklendi; "Son Güncelleme" üzerine yazıldı.

**Sorunlar:**
- Ortamda `node`/`npm` yok (taze cloud devcontainer — MEMORY notuyla birebir); `npm run test` yerelde koşulamadı. Doğrulama statik yapıldı (komut↔script + yol↔artefakt birebir eşleşme) + komutların yeşilliği zaten TASK-5.04 CI run `28470864743` ile ampirik kanıtlı. Belgelenen hiçbir komut/yol uydurma değil.

**Kararlar:**
- a11y tuzakları kopyalanmadı, özet+pointer verildi (Dokümantasyon İlkeleri: bir bilgi tek yerde) · docs/DECISIONS.md'ye eklendi: Hayır (mimari karar değil)
- QUALITY §8 "test altyapısı henüz yok" bayatlaması bu task'ta açılmadı — review-phase işi (Dikkat Noktaları gereği, yalnız işaret edildi).

**Dosya Değişiklikleri:**
- `_dev/docs/TESTING.md` (YENİ)
- `_dev/INDEX.md` (Bilgi Havuzu satırı + Son Güncelleme)

**Test Sonuçları:**
- Statik çapraz-kontrol: `npm run test` / `test:watch` / `test:e2e` → package.json satır 11-13 ✓ · `tests/**/*.test.{ts,tsx}` → i18n-parity.test.ts + smoke.test.tsx ✓ · `tests/e2e/**/*.spec.ts` → home-a11y.spec.ts ✓ · vitest/playwright config + ci.yml mevcut ✓ · memory pointer geçerli ✓
- Runner yeşilliği: TASK-5.04 CI (fast + a11y job, run `28470864743`) — değişmedi (bu task yalnız doküman).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- Faz 5 harness'ini kullanılabilir/sürdürülebilir kılan test convention notu (`docs/TESTING.md`) yazıldı: nerede/nasıl test, 3 katman, a11y ölçüm disiplini (özet+pointer), kümülatif "her feature kendi testini ekler" beklentisi, CI. INDEX'e içerik dokümanı olarak işlendi.
- Sahipsiz-alan kapatıldı: kümülatif test ilkesi artık yazılı bir convention'a dayanıyor.

**Öğrenilenler:**
- Doküman task'ında "test" = belgelenen komut/yolların gerçek artefaktlarla birebir eşleşmesi + çalıştığının (CI'dan) bilinmesi; node-yoksunluğu bu doğrulamayı engellemez.

---

**Oluşturulma:** 2026-06-30
