# TASK-5.01: Vitest Kurulumu (node) + i18n 5-Dil Parite Tohum Testi

**Durum:** ✅ Tamamlandı
**Modül:** M6 (infra, çapraz) + M4 (i18n) — `modules/M6-SEO-Deploy.md`, `modules/M4-i18n.md`
**Feature:** D1.1 (test harness — Vitest node katmanı) + D1.2 (i18n 5-dil parite tohum)
**Faz:** Phase 5 (phases/PHASE-5.md)
**Bağımlılıklar:** Yok (fazın temel task'ı)

---

## Hedef

Projenin ilk test runner'ı Vitest'i **node ortamında** kur (`npm run test`), config'i repoya koy ve ilk tohum testi olan **i18n 5-dil parite testini** yaz: `messages/{tr,en,ar,de,es}.json` aynı yaprak-anahtar kümesini taşımalı — eksik **veya** fazla anahtar = fail. Tamamlanma: `npm run test` mevcut durumda yeşil (5×183 anahtar) **ve** kasıtlı bir anahtar silinince kırmızı (fail-on-regression kanıtı).

---

## Bağlam

Bu, projenin **ilk test altyapısı** (şu ana dek "test" = `next build` + elle doğrulama geçici konvansiyonu). Milestone gereği her runner "kur + kanıtla" çerçevesinde yazılır — yeşil sayılmadan önce fail-on-regression gösterilir (Faz 2/3/4 dersi). Vitest **node** katmanı, seed'in 3 kanıtlı katmanından 1.'sidir ve i18n parite tohumuyla kanıtlanır.

i18n parite testi **değeri değil ANAHTARI** karşılaştırır: TR tek kaynaktır, TR-dışı dillerde *stale kopya* (aynı anahtar, eski metin) versiyon-sınırına dek serbesttir; yalnız *eksik/fazla anahtar* fail'dir (dil stratejisi → `docs/DECISIONS.md` 2026-06-27/06-28; MEMORY "i18n değişiminde anahtar varlığı ≠ değer tazeliği").

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-5.md` — "Araştırma Bulguları" (Vitest seçimi, sürümler, çift-ortam ayrımı) + "Kapsam Tartışması"
- `_dev/modules/M4-i18n.md` — F4.2 kabul kriterleri (5 dil aynı namespace anahtar seti)
- `_dev/MEMORY.md` — Süreç Disiplinleri (i18n anahtar/değer ayrımı)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-5.md` — Task Listesi tablosunda 5.01 durumu

---

## Alt Görevler

- [x] **1. Vitest devDependency ekle** *(install anında teyit — Dokunulmazlar)*
  - `vitest@^4.1.9` → `package.json` devDependencies (mevcut devDep konvansiyonuyla tutarlı caret)
  - `package.json` scripts: `"test": "vitest run"` + `"test:watch": "vitest"`
  - Install sonrası ampirik teyit: `npx vitest --version` → `vitest/4.1.9`; lockfile güncellendi (+925 satır)

- [x] **2. `vitest.config.ts` oluştur (YENİ)**
  - Default `node` ortamı (i18n parite DOM gerektirmez, hızlı)
  - `test.include: ['tests/**/*.test.{ts,tsx}']` — Playwright `.spec.ts` dosyalarını kapsamaz
  - `test.exclude`: `[...configDefaults.exclude, 'tests/e2e/**']` (Playwright dizinini açıkça dışla)
  - ESM yazımı (`package.json` `"type": "module"` zaten var)

- [x] **3. `tests/i18n-parity.test.ts` oluştur (YENİ)**
  - Locale listesi tek kaynaktan: `routing.locales` (`src/i18n/routing.ts` → `../src/i18n/routing` relative import; `@/` alias vitest'te resolve edilmediğinden relative). next-intl import'u node ortamında **sürtünmesiz** çalıştı → fallback gerekmedi.
  - Her `messages/{locale}.json` oku, **recursive flatten** (iç içe namespace → düz `a.b.c` anahtar kümesi)
  - `routing.defaultLocale` (tr) taban; her dilin anahtar kümesini TR'ye karşı eşitle — **eksik** ve **fazla** iki yönü de raporla
  - Test her dil için ayrı `it()` (hangi dilin nerede saptığı net görünür)

- [x] **4. Kanıtla (kur+kanıtla milestone)**
  - `npm run test` yeşil → 5 test geçti (1 taban + 4 dil), parite 5×183 anahtar
  - **Fail-on-regression:** `de.json`'dan `meta.title` silindi → test kırmızı (`EKSİK anahtarlar: ['meta.title']`) → `git checkout` ile geri alındı → tekrar yeşil
  - `next build` temiz (Compiled successfully, 37 sayfa, tip kontrolü geçti — `tests/` build çıktısına girmedi)

---

## Etkilenen Dosyalar

```
package.json              # vitest devDep + test scripti — zaten var
vitest.config.ts          # YENİ
tests/
└── i18n-parity.test.ts   # YENİ
```

---

## Dikkat Noktaları

- **Anahtar ≠ değer.** Yalnız anahtar kümesini karşılaştır; **değerleri karşılaştırma** (stale çeviri serbest, eksik anahtar yasak). (MEMORY · DECISIONS dil stratejisi · M4 F4.2)
- **Locale listesi tek kaynak.** `routing.locales`'ten türet — yeni dil eklenince test otomatik kapsar. `next-intl/routing` import'u node/Vitest ESM'de sürtünme yaratırsa: fallback `messages/` dizinini oku **veya** sabit liste (yorumla `routing.ts` kaynağını işaretle). Bu küçük icra kararı; ana yaklaşım routing.ts.
- **Config repoda olmalı** — Vitest sıfır-config'de de node default kullanır, ama milestone "config dosyaları repoda" diyor → `vitest.config.ts` yazılır.
- **`package.json` Dokunulmaz** — devDep ekleme install anında teyit edilir (discuss/research'te araç onaylandı; bu, install anının bilinçli tek-sefer teyidi).
- Recursive flatten: yalnız yaprak anahtarları say (obje düğümleri değil); değer tipi (string) kontrolü kapsam dışı.

---

## Test Kriterleri

- [x] `npm run test` yeşil; i18n parite testi 5 dil için geçer (5×183 = eşit anahtar kümeleri)
- [x] Bir anahtar kasıtlı silinince test **kırmızı** (fail-on-regression kanıtlandı) → geri alınınca yeşil
- [x] `vitest.config.ts` repoda, `node` ortamı + `tests/**/*.test.{ts,tsx}` include
- [x] `npm run build` (next build) temiz geçer — runtime/build çıktısı değişmez

---

## Karar Noktaları

- **Bağımlılık ekleme (`package.json` Dokunulmaz):** `vitest` devDep'i install anında kullanıcı onayıyla eklenir — araç seçimi onaylı, install anı bilinçli tek-sefer teyit (Dokunulmazlar).

---

## Risk ve Geri Dönüş Planı

- **Risk:** `package.json` değişikliği (yalnız devDep + script ekleme; runtime bağımlılığa dokunmaz) → düşük.
- **Rollback:** devDep + `vitest.config.ts` + `tests/i18n-parity.test.ts` geri al; `package-lock.json` restore.

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

**Son Yaklaşım:** Tamamlandı — pause/devam gerekmedi. Tek oturumda kur+kanıtla milestone'una göre bitirildi.

**Sonraki Adım Detayı:** Faz 5'in sıradaki task'ı → TASK-5.02 (Vitest jsdom katmanı + component smoke tohum). `vitest.config.ts` bu task'ta jsdom pragma/setupFiles ile genişler; `@vitejs/plugin-react`+RTL+jest-dom+jsdom devDep'leri install anında teyit edilir.

**Yapılanlar:**
- `vitest@^4.1.9` devDependency kuruldu (install-anı teyidi, Dokunulmazlar); `test` + `test:watch` scriptleri eklendi.
- `vitest.config.ts` (YENİ): node ortamı, `tests/**/*.test.{ts,tsx}` include, `configDefaults.exclude` + `tests/e2e/**` dışlama.
- `tests/i18n-parity.test.ts` (YENİ): `routing.locales`/`routing.defaultLocale` tek kaynak, recursive leaf-key flatten, dil başına ayrı `it()`, eksik+fazla iki yön.
- Mevcut parite ampirik teyit (kod yazımı öncesi): 5×183 anahtar, 0 eksik/0 fazla.
- Kanıt: yeşil (5/5) → `de.json`/`meta.title` sil → kırmızı → geri al → yeşil; `next build` temiz.

**Sorunlar:**
- Kayda değer sorun yok. **Risk olarak işaretlenen `next-intl/routing` node-ESM import sürtünmesi gerçekleşmedi** → fallback (dizin okuma / sabit liste) gerekmedi, ana yaklaşım (routing.ts) çalıştı.
- `npm install` 2 moderate audit uyarısı bıraktı — kaynak `vite`'ın transitive `postcss` sürümü, **yalnız dev-tooling zinciri** (production runtime'a gitmez). `--force` breaking + task kapsamı dışı → dokunulmadı, kayda geçirildi.

**Kararlar:**
- Sürüm pinleme: caret `^4.1.9` (mevcut tüm devDep'ler caret — proje konvansiyonuyla tutarlı; task `vitest@4.1.9` istedi, kurulan tam 4.1.9). · docs/DECISIONS.md'ye eklendi: Hayır (mimari karar değil, konvansiyon-uyumu)
- Import yolu: `@/` alias vitest'te resolve edilmiyor (vite-tsconfig-paths kurulu değil) → relative import (`../src/i18n/routing`). · docs/DECISIONS.md'ye eklendi: Hayır (icra detayı)

**Dosya Değişiklikleri:**
- `package.json` — vitest devDep + test scriptleri (npm alfabetik sıraladı)
- `package-lock.json` — +925 satır (vitest + transitive)
- `vitest.config.ts` — YENİ
- `tests/i18n-parity.test.ts` — YENİ

**Test Sonuçları:**
- `npm run test`: 1 dosya / 5 test geçti (~100-350ms).
- Fail-on-regression: `de.json` eksik anahtarla 1 test kırmızı (`EKSİK anahtarlar: ['meta.title']`), net dil+anahtar raporu; geri alınca 5/5 yeşil.
- `npm run build`: Compiled successfully, tip kontrolü geçti, 37 sayfa, exit 0.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- Projenin **ilk test runner'ı** (Vitest node katmanı) kuruldu ve config repoya kondu.
- İlk tohum testi: i18n 5-dil **anahtar-kümesi paritesi** (değer değil — TR tek kaynak, stale kopya serbest, eksik/fazla anahtar fail). Seed'in 3 kanıtlı katmanından 1.'si.
- Kur+kanıtla milestone'u uçtan-uca gösterildi (yeşil → kırmızı → yeşil + temiz build).

**Öğrenilenler:**
- `next-intl/routing` (`defineRouting`) Vitest **node** ortamında ek config olmadan import edilebiliyor — locale listesini tek kaynaktan türetmek sürtünmesiz; araştırmada işaretlenen ESM-import riski materyalize olmadı.
- `@/` path alias Vitest'te otomatik resolve edilmiyor (Next/tsconfig dışı runner) → `tests/`'ten src'ye relative import gerekli; ileride RTL/component katmanı `@/` kullanırsa `vite-tsconfig-paths` veya `resolve.alias` gerekebilir (TASK-5.02 dikkat noktası).

---

**Oluşturulma:** 2026-06-30
