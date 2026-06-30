# TASK-5.01: Vitest Kurulumu (node) + i18n 5-Dil Parite Tohum Testi

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Vitest devDependency ekle** *(install anında teyit — Dokunulmazlar)*
  - `vitest@4.1.9` → `package.json` devDependencies
  - `package.json` scripts: `"test": "vitest run"` (+ opsiyonel `"test:watch": "vitest"`)
  - Install sonrası ampirik teyit: `npx vitest --version` çalışır, lockfile güncel

- [ ] **2. `vitest.config.ts` oluştur (YENİ)**
  - Default `node` ortamı (i18n parite DOM gerektirmez, hızlı)
  - `test.include: ['tests/**/*.test.{ts,tsx}']` — Playwright `.spec.ts` dosyalarını kapsamaz
  - `test.exclude`: default + `'tests/e2e/**'` (Playwright dizinini açıkça dışla — belt-and-suspenders)
  - ESM yazımı (`package.json` `"type": "module"` zaten var)

- [ ] **3. `tests/i18n-parity.test.ts` oluştur (YENİ)**
  - Locale listesi tek kaynaktan: `routing.locales` (`src/i18n/routing.ts`) → `['tr','en','ar','de','es']`
  - Her `messages/{locale}.json` oku, **recursive flatten** (iç içe namespace → düz `a.b.c` anahtar kümesi)
  - TR'yi taban al; her dilin anahtar kümesini TR'ye karşı eşitle — **eksik** (TR'de var, dilde yok) ve **fazla** (dilde var, TR'de yok) iki yönü de raporla
  - Test her dil için ayrı `it()` (hangi dilin nerede saptığı net görünsün)

- [ ] **4. Kanıtla (kur+kanıtla milestone)**
  - `npm run test` yeşil → 5 dil için parite geçer (mevcut 5×183 anahtar)
  - **Fail-on-regression:** bir dilden 1 anahtar sil → `npm run test` kırmızı (eksik anahtar yakalanır) → anahtarı geri al, tekrar yeşil
  - `next build` hâlâ temiz (devDep + config + `tests/` build çıktısına girmez)

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

- [ ] `npm run test` yeşil; i18n parite testi 5 dil için geçer (5×183 = eşit anahtar kümeleri)
- [ ] Bir anahtar kasıtlı silinince test **kırmızı** (fail-on-regression kanıtlandı) → geri alınınca yeşil
- [ ] `vitest.config.ts` repoda, `node` ortamı + `tests/**/*.test.{ts,tsx}` include
- [ ] `npm run build` (next build) temiz geçer — runtime/build çıktısı değişmez

---

## Karar Noktaları

- **Bağımlılık ekleme (`package.json` Dokunulmaz):** `vitest` devDep'i install anında kullanıcı onayıyla eklenir — araç seçimi onaylı, install anı bilinçli tek-sefer teyit (Dokunulmazlar).

---

## Risk ve Geri Dönüş Planı

- **Risk:** `package.json` değişikliği (yalnız devDep + script ekleme; runtime bağımlılığa dokunmaz) → düşük.
- **Rollback:** devDep + `vitest.config.ts` + `tests/i18n-parity.test.ts` geri al; `package-lock.json` restore.

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
