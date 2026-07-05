# TASK-13.01: Ortak `localizedAlternates` helper + locale-path util + sitemap refactor

**Durum:** ✅ Tamamlandı
**Modül:** M6 SEO & Deploy (modules/M6-SEO-Deploy.md) + M4 i18n (routing kaynağı)
**Feature:** TB-1 — Alt-sayfa self-canonical + 5-locale hreflang alternates (temel/altyapı parçası)
**Faz:** Phase 13 (phases/PHASE-13.md)
**Bağımlılıklar:** Yok (fazın ilk task'i — sonraki page-wiring task'larının temeli)

---

## Hedef

TB-1'in **tek-kaynak** temelini kur: locale→URL eşlemesini ve canonical/hreflang üretimini tek yere topla. Yeni `src/i18n/metadata.ts` iki saf fonksiyon export eder — `localePath(locale, path)` (locale→prefix eşlemesi) ve `localizedAlternates(locale, path)` (Next Metadata `alternates` objesi: canonical + 5-dil `languages` + `x-default`). `sitemap.ts` bu ortak `localePath`'i tüketecek şekilde refactor edilir (kopya-kod/drift önleme). Helper saf-fonksiyon unit testiyle mühürlenir. **Bu task hiçbir sayfanın metadata'sını değiştirmez** — yalnız altyapı + sitemap tüketimi; page-wiring TASK-13.02/13.03'te.

---

## Bağlam

Araştırma (PHASE-13 → Araştırma Bulguları) kökü teyit etti: alt sayfalar `alternates` set etmediğinden Next.js sığ-merge ile layout'un `canonical="/"`'ını miras alıyor. Seçilen mimari **B**: ortak helper (kopya-kod yok — Faz 10 `<Logo>` dersi) + fail-safe default. Bu task helper'ı ve locale-path util'i yaratır; sitemap zaten aynı locale→prefix mantığını (`locale === defaultLocale ? "" : /${locale}`) elle içeriyor → tek kaynağa bağlanır.

**Tespit edilen drift (bu task'ta giderilir):** sitemap non-TR **ana sayfa** girişlerini `/en/` (sonda slash) üretiyor (`${prefix}${path || "/"}`), ama layout canonical `/en` (slashsiz, gerçek route) veriyor. Ortak util slashsiz forma (`/en`) normalize eder — Next `trailingSlash:false` ile kanonik olan bu; `/en/` zaten `/en`'e redirect'lenirdi. Yani sitemap'in 4 non-TR home URL'i `/en/`→`/en` (vb.) olarak **düzelir** (kasıtlı iyileştirme, regresyon değil).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-13.md` — Araştırma Bulguları (TB-1 mimari B, helper imzası, x-default kararı) + Dikkat Edilecekler
- `_dev/modules/M6-SEO-Deploy.md` — F6.1 (metadata/canonical/alternates), F6.2 (sitemap)
- `_dev/docs/TESTING.md` — Vitest node katmanı + test yeri deseni
- `src/app/[locale]/layout.tsx` — mevcut `alternates` bloğu (kopyalanacak değil, referans; TR `/`, diğer prefixli, languages 5 dil)
- `src/app/sitemap.ts` — refactor edilecek locale→prefix mantığı
- `src/i18n/routing.ts` — `routing.locales` / `routing.defaultLocale` (util girdisi)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-13.md` — Task Listesi tablosunda 13.01 durumu
- `_dev/docs/TESTING.md` — (opsiyonel) yeni node testi tohum listesine eklenebilir

---

## Alt Görevler

- [ ] **1. `src/i18n/metadata.ts` oluştur (YENİ) — locale-path util**
  - `localePath(locale: string, path = ""): string` — `const prefix = locale === routing.defaultLocale ? "" : \`/${locale}\`; return \`${prefix}${path}\` || "/";`
  - Beklenen çıktı: `("tr","")→"/"`, `("en","")→"/en"`, `("tr","/crew-os")→"/crew-os"`, `("en","/crew-os")→"/en/crew-os"`, `("ar","/bulten/ai-sdr-araclari")→"/ar/bulten/ai-sdr-araclari"`.
  - `routing`'i `@/i18n/routing`'ten import et (tek kaynak).

- [ ] **2. `localizedAlternates(locale, path)` fonksiyonunu ekle (aynı dosya)**
  - Dönüş: `{ canonical: localePath(locale, path), languages: { ...5 locale: localePath(l, path), "x-default": localePath(defaultLocale, path) } }`.
  - `languages` objesini `routing.locales` üzerinden türet (elle 5 anahtar yazma — yeni dil eklenince otomatik kapsasın; i18n-parity testinin locale-tek-kaynak deseniyle hizalı).
  - `x-default` → `localePath(routing.defaultLocale, path)` (= TR prefixsiz; kullanıcı kararı, PHASE-13).
  - Tip: `Metadata["alternates"]` (next `Metadata`). Değerler relative — `metadataBase` (layout'ta `https://kiwiailab.com`) absolute'e çözer.

- [ ] **3. `src/app/sitemap.ts` refactor — ortak `localePath` tüket**
  - `${prefix}${path || "/"}` elle mantığını `localePath(locale, path)` çağrısıyla değiştir; `BASE` + `localePath(...)` ile absolute URL kur.
  - `PATHS` dizisi + `priority`/`changeFrequency` mantığı **korunur** (yalnız URL üretimi ortak util'e bağlanır).
  - Sonuç: non-TR home URL'leri `/en/`→`/en` (vb.) normalize olur — kasıtlı (bkz. Bağlam).

- [ ] **4. `tests/seo-metadata.test.ts` oluştur (YENİ) — helper unit testi (Vitest node)**
  - `localePath` deterministik çıktı tablosu (yukarıdaki beklenen değerler; 5 locale × birkaç path).
  - `localizedAlternates`: canonical doğru path; `languages` 5 locale + `x-default` içeriyor; TR→prefixsiz, non-TR→prefixli; `x-default === languages[defaultLocale value]`.
  - `routing.locales` üzerinden döngü (yeni dil eklenince test otomatik kapsar).

---

## Etkilenen Dosyalar

```
src/
├── i18n/
│   └── metadata.ts          # YENİ — localePath + localizedAlternates
└── app/
    └── sitemap.ts           # refactor — ortak localePath tüket (zaten var)
tests/
└── seo-metadata.test.ts     # YENİ — helper unit testi (node)
```

---

## Dikkat Noktaları

- **Kopya-kod refleksi (Faz 10 `<Logo>` dersi):** locale→prefix mantığı **tek** util'de; sitemap + helper + (sonraki task'larda) sayfalar hep buradan. Elle kopyalama = drift.
- **`alternates` sığ-merge bütün-obje:** helper `canonical` + `languages`'ı **birlikte** döndürür — sayfa tarafı asla yalnız `canonical` yazmamalı (13.02/13.03 kuralı; bu task'ta yalnız helper üretilir).
- **x-default:** Google dil-müzakere best-practice → varsayılan locale prefixsiz URL. Helper'a tek satır, tüm sayfalara uniform gelir.
- **Sitemap normalizasyonu kasıtlı:** `/en/`→`/en` düzeltme; robots dokunulmaz. Sitemap URL sayısı (5×6=30) ve priority/changeFreq değişmez.
- **AR dil kodu = `ar`** (doğru hreflang); RTL/görsel yön bu katmanı etkilemez.
- **Yeni bağımlılık yok** — mevcut next-intl v4.1 + Next 15.3 Metadata API.
- **Sayfa metadata'sı bu task'ta DEĞİŞMEZ** — page-wiring (canonical davranış değişimi) 13.02/13.03'te; burada yalnız helper + sitemap tüketimi.

---

## Test Kriterleri

- [ ] `npm run test` → `tests/seo-metadata.test.ts` yeşil (localePath + localizedAlternates tüm çıktı tablosu).
- [ ] `next build` temiz geçer (0 hata, 0 `MISSING_MESSAGE`); sitemap route derlenir.
- [ ] Build sonrası sitemap doğrulaması: `.next/server/app/sitemap.xml.body` (veya prerender çıktısı) 30 giriş; non-TR home URL'leri `/en` `/ar` `/de` `/es` (slashsiz), TR home `/` — kanıt-artefaktı.
- [ ] i18n-parity testi hâlâ yeşil (regresyon yok).

---

## Karar Noktaları

- **Helper dosya konumu:** `src/i18n/metadata.ts` (öneri — routing.ts komşusu, `routing`'e bağımlı, i18n-özü) vs `src/lib/seo.ts` (yeni dizin). → **`src/i18n/metadata.ts` önerilir**; verify-plan onaylar.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`feat(TASK-13.01): ...`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-13 task tablosu güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `src/i18n/metadata.ts` oluşturuldu (YENİ): iki saf fonksiyon — `localePath(locale, path)` (locale→prefix eşlemesi, `routing.defaultLocale` tek kaynak) + `localizedAlternates(locale, path)` (Next Metadata `alternates`: self-canonical + 5-dil `languages` `routing.locales` üzerinden türetilir + `x-default` = varsayılan locale prefixsiz).
- `src/app/sitemap.ts` refactor: elle `${prefix}${path || "/"}` mantığı `localePath(locale, path)` çağrısıyla değiştirildi. `PATHS` + priority/changeFreq korundu. Non-TR home `/en/`→`/en` (slashsiz) normalize oldu (kasıtlı — layout canonical ile hizalı).
- `tests/seo-metadata.test.ts` oluşturuldu (YENİ, Vitest node): `localePath` deterministik çıktı tablosu (10 case + döngü assertion'ları) + `localizedAlternates` self-canonical / 5-dil+x-default / x-default=defaultLocale / canonical-değişken-languages-sabit testleri; döngüler `routing.locales` üzerinden (yeni dil oto-kapsar).

**Test Sonucu:**
- `npm run test` → 4 dosya, 23 test yeşil (yeni `seo-metadata` dahil; i18n-parity regresyonsuz).
- `next build` temiz (0 hata, 0 `MISSING_MESSAGE`); sitemap route derlendi.
- Kanıt-artefaktı `.next/server/app/sitemap.xml.body`: 30 `<loc>` (5 locale × 6 path); home URL'leri `/`, `/en`, `/ar`, `/de`, `/es` (non-TR slashsiz — normalizasyon teyitli).

**Son Yaklaşım:** TB-1 mimari B'nin altyapı katmanı tamam — helper + util + sitemap tüketimi + unit tohum. Hiçbir sayfa metadata'sı değişmedi (bu task'ın sınırı); page-wiring 13.02/13.03'e devrediyor.

**Sonraki Adım Detayı:** TASK-13.02 — 5 alt sayfanın (`crew-os`, `spor-salonu-yazilimi`, `vaka-calismalari`, `bulten/ai-sdr-araclari`, `bulten/claude-opus-4-8-fable-5`) `generateMetadata`'sında `alternates: localizedAlternates(locale, path)` çağrısı (tam obje — yalnız canonical yazma yasağı). Helper `@/i18n/metadata`'dan import edilir.

---

**Oluşturulma:** 2026-07-03 (plan-phase 13)
