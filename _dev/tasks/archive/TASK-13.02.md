# TASK-13.02: 5 alt sayfaya self-canonical + 5-locale hreflang alternates

**Durum:** ✅ Tamamlandı
**Modül:** M2 Sayfalar & Bölümler (modules/M2-Sayfalar-Bolumler.md) + M6 (metadata)
**Feature:** TB-1 — Alt-sayfa self-canonical + 5-locale hreflang alternates (page-wiring, alt sayfalar)
**Faz:** Phase 13 (phases/PHASE-13.md)
**Bağımlılıklar:** TASK-13.01 ✅ (helper `localizedAlternates` hazır olmalı)

---

## Hedef

5 alt sayfanın her birinin mevcut `generateMetadata`'sına `alternates: localizedAlternates(locale, "<path>")` ekle. Böylece her alt sayfa layout'un miras `canonical="/"`'ını **kendi bütün-obje `alternates`'iyle geçersiz kılar** → self-canonical + 5-dil hreflang + x-default deklare eder. İçerik/title/description/DOM değişmez; yalnız `alternates` alanı eklenir. Tamamlandığında 5 alt sayfa artık `/`'a canonicalize olmaz, kendi path'ine canonical + doğru hreflang taşır.

---

## Bağlam

Araştırma kökü: alt sayfalar `alternates` vermediği için sığ-merge ile layout'un yanlış `canonical="/"`'ını miras alıyor (her alt sayfa "kanonik'im ana sayfa" diyor). Bu task, TASK-13.01'de üretilen tek-kaynak helper'ı 5 sayfaya bağlar. **Sıralama gerekçesi:** alt sayfalar layout'tan **önce** düzeltilir → hiçbir commit sınırında regresyon penceresi yok (alt sayfalar bu task'ta doğru olur; ana sayfa hâlâ layout üzerinden doğru; layout→home taşıma 13.03'te).

Alt sayfaların hepsinin `generateMetadata`'sı şu an yalnız `title`/`description` set ediyor (teyitli). Aynı tek-satır ekleme 5 kardeş sayfaya uygulanır — mekanik olarak tek-tip; bu yüzden 5 dosya olsa da tek odaklı task.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-13.md` — Araştırma Bulguları (sığ-merge bütün-obje kuralı, path listesi)
- `src/i18n/metadata.ts` — TASK-13.01'de üretilen `localizedAlternates` imzası
- İlgili 5 sayfa (mevcut `generateMetadata` deseni)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-13.md` — Task Listesi tablosunda 13.02 durumu

---

## Alt Görevler

- [ ] **1. Her sayfanın `generateMetadata`'sına `alternates` ekle**
  - Import: `import { localizedAlternates } from "@/i18n/metadata";`
  - Dönüş objesine ekle: `alternates: localizedAlternates(locale, "<path>")` — `title`/`description` **korunur** (yanına eklenir).
  - Path eşlemesi (sitemap `PATHS` ile birebir):
    - `crew-os/page.tsx` → `"/crew-os"`
    - `spor-salonu-yazilimi/page.tsx` → `"/spor-salonu-yazilimi"`
    - `vaka-calismalari/page.tsx` → `"/vaka-calismalari"`
    - `bulten/ai-sdr-araclari/page.tsx` → `"/bulten/ai-sdr-araclari"`
    - `bulten/claude-opus-4-8-fable-5/page.tsx` → `"/bulten/claude-opus-4-8-fable-5"`

- [ ] **2. Build sonrası prerender `<head>` doğrula**
  - Her alt sayfa (en az TR + 1 non-TR, örn. `/en/crew-os`) `<link rel="canonical">` kendi path'ine, `<link rel="alternate" hreflang="...">` 5 dil + `x-default` içeriyor; artık `/`'a işaret etmiyor.

---

## Etkilenen Dosyalar

```
src/app/[locale]/
├── crew-os/page.tsx                        # alternates ekle (zaten var)
├── spor-salonu-yazilimi/page.tsx           # alternates ekle (zaten var)
├── vaka-calismalari/page.tsx               # alternates ekle (zaten var)
└── bulten/
    ├── ai-sdr-araclari/page.tsx            # alternates ekle (zaten var)
    └── claude-opus-4-8-fable-5/page.tsx    # alternates ekle (zaten var)
```

---

## Dikkat Noktaları

- **Sığ-merge bütün-obje:** helper `canonical` + `languages`'ı birlikte döndürür → yalnız `canonical` yazma tuzağına düşme (helper zaten tam obje verir; elle canonical ekleme).
- **title/description KORUNUR:** `alternates` **yanına** eklenir, mevcut alanları silme.
- **Kopya-kod yok:** her sayfa helper'ı **çağırır**, alternates objesini elle yazmaz (Faz 10 dersi).
- **Path'ler sitemap `PATHS` ile birebir** — drift olursa canonical yanlış path'e gider; sitemap tek kaynak referansı.
- **DOM/içerik/görsel değişmez** → a11y/perf/CLS yapısal regresyonsuz (Faz 11 emsali); yine de build temizliği doğrulanır.
- **Ana sayfa bu task'ta DEĞİŞMEZ** — home canonical hâlâ layout üzerinden doğru gelir; layout→home taşıma 13.03.

---

## Test Kriterleri

- [ ] `next build` temiz (0 hata, 0 `MISSING_MESSAGE`).
- [ ] 5 alt sayfa prerender `<head>`: `canonical` kendi path'ine (TR prefixsiz, non-TR prefixli); `hreflang` 5 dil + `x-default`; hiçbiri `/`'a canonicalize olmuyor — kanıt-artefaktı (grep prerender HTML).
- [ ] TASK-13.01 helper unit testi + i18n-parity hâlâ yeşil.
- [ ] Ana sayfa canonical hâlâ `/` (TR) / `/en` (vb.) — bu task kırmadı.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`feat(TASK-13.02): ...`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-13 task tablosu güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- 5 alt sayfanın `generateMetadata`'sına `import { localizedAlternates } from "@/i18n/metadata";` + dönüş objesine `alternates: localizedAlternates(locale, "<path>")` eklendi. `title`/`description` korundu. Path'ler sitemap `PATHS` ile birebir:
  - `crew-os` → `/crew-os` · `spor-salonu-yazilimi` → `/spor-salonu-yazilimi` · `vaka-calismalari` → `/vaka-calismalari` · `bulten/ai-sdr-araclari` → `/bulten/ai-sdr-araclari` · `bulten/claude-opus-4-8-fable-5` → `/bulten/claude-opus-4-8-fable-5`
- Helper bütün-obje döndürdüğü için (canonical + languages + x-default) sığ-merge tuzağına düşülmedi; elle canonical yazılmadı.

**Test / Kanıt:**
- `npm run test` → 4 dosya / 23 test ✅ (helper unit + i18n-parity regresyonsuz).
- `next build` temiz — 0 hata, 0 `MISSING_MESSAGE`.
- Prerender `<head>` grep (`.next/server/app/**.html`): 5 alt sayfa (TR + non-TR örnekleri: `tr/crew-os`, `en/crew-os`, `tr/vaka-calismalari`, `en/spor-salonu-yazilimi`, `ar/bulten/ai-sdr-araclari`) `canonical` **kendi path'ine** (TR prefixsiz, non-TR prefixli); `hreflang` tr/en/ar/de/es + `x-default`; **hiçbiri `/`'a canonicalize olmuyor**.
- Regresyon: home `tr` canonical `https://kiwiailab.com`, `en` canonical `https://kiwiailab.com/en` — layout üzerinden değişmedi.

**Sınır:** Ana sayfa/layout değişmedi (layout→home taşıma 13.03); içerik/title/description/DOM/route path aynı.

**Son Yaklaşım:** Tamamlandı — mekanik tek-tip 5 sayfa wiring, helper çağrısı.
**Sonraki Adım Detayı:** Faz kalan → `run-task` TASK-13.03 (alternates layout'tan ana sayfaya taşı, fail-safe default; layout artık canonical miras ettirmez).

---

**Oluşturulma:** 2026-07-03 (plan-phase 13)
