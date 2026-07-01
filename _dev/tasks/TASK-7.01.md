# TASK-7.01: Umami analytics bileşeni + layout entegrasyonu + izole render testi

**Durum:** ⬜ Bekliyor
**Modül:** M6 — SEO & Deploy (modules/M6-SEO-Deploy.md)
**Feature:** E1 — Umami self-hosted analytics
**Faz:** Phase 7 (phases/PHASE-7.md)
**Bağımlılıklar:** Yok

---

## Hedef

Ayrı bir bileşen (`src/components/analytics/umami-script.tsx`) oluştur; `next/script` `<Script strategy="afterInteractive">` ile Umami script tag'ini spec değerleriyle (`src` / `data-website-id` / `data-domains`) render etsin. Bileşeni `[locale]/layout.tsx`'in `<head>`'ine `<UmamiScript />` olarak ekle → tüm locale'ler otomatik pageview kapsanır. İzole render testi (`tests/umami-script.test.tsx`, `vi.mock("next/script")`) doğru prop'ların geçtiğini assert etsin.

**Tamamlanmış sayılır:** `npm test` yeşil (yeni test dahil), `next build` temiz, lokal prod/preview'da `[locale]` head'inde Umami `script.js` isteği ağ sekmesinde görülür (TR `/` + en az 1 non-TR locale).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/UMAMI-ANALYTICS.md` — spec: uygulanacak kod, değerler, yerleşim kararı, kabul kriterleri (birebir kaynak)
- `_dev/modules/M6-SEO-Deploy.md` — M6 sorumluluğu (site-geneli analytics katmanı)
- `_dev/phases/PHASE-7.md` — Kapsam + Araştırma kararları (ayrı bileşen / afterInteractive / izole render testi + next-script mock)
- `_dev/docs/TESTING.md` — test katman konvansiyonu (jsdom katmanı, `// @vitest-environment jsdom`); `tests/smoke.test.tsx` deseni

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task + task durumu + son task özeti
- `_dev/phases/PHASE-7.md` — Task Listesi tablosunda 7.01 durumu

---

## Alt Görevler

- [ ] **1. Umami bileşenini oluştur**
  - Dosya: `src/components/analytics/umami-script.tsx` (YENİ)
  - `next/script` `<Script>` döndüren küçük, tek-sorumluluklu bileşen (`UmamiScript`):
    ```tsx
    import Script from "next/script";

    export function UmamiScript() {
      return (
        <Script
          src="https://umami.kiwiailab.com/script.js"
          data-website-id="c7031c49-5ccd-4b93-a82d-bba895ee4f2e"
          data-domains="kiwiailab.com"
          strategy="afterInteractive"
        />
      );
    }
    ```
  - Hook yok → server component olarak kalabilir (`"use client"` gerekmez; mevcut tema-FOUC `<script>` gibi `<head>`'te çalışır).

- [ ] **2. Layout `<head>`'ine entegre et**
  - Dosya: `src/app/[locale]/layout.tsx` (mevcut — değişir)
  - Mevcut tema-FOUC `<script>`'in yanına `<UmamiScript />` ekle (import + `<head>` içine bir satır). Additive; mevcut markup korunur.

- [ ] **3. İzole render testi yaz**
  - Dosya: `tests/umami-script.test.tsx` (YENİ)
  - `// @vitest-environment jsdom` pragma (smoke.test.tsx deseni, Faz 5 konvansiyonu).
  - `vi.mock("next/script", ...)` → mock `<script {...props} />` passthrough döndürür (afterInteractive enjeksiyonunu değil, **bizim geçtiğimiz prop'ları** test etmek için).
  - `<UmamiScript />` render → assert: `src`, `data-website-id`, `data-domains`, `strategy` değerleri spec'e birebir eşit.

---

## Etkilenen Dosyalar

```
src/
├── app/[locale]/layout.tsx              # <head>'e <UmamiScript /> + import eklenir — zaten var
└── components/analytics/
    └── umami-script.tsx                 # YENİ
tests/
└── umami-script.test.tsx                # YENİ
```

---

## Dikkat Noktaları

- **Değerler dış-kaynaklı config sabiti, sır DEĞİL** (yayınlanan HTML'de zaten görünür → hardcode edilir, env'e konmaz): `src=https://umami.kiwiailab.com/script.js`, `data-website-id=c7031c49-5ccd-4b93-a82d-bba895ee4f2e`, `data-domains=kiwiailab.com`. Kaynak: `docs/UMAMI-ANALYTICS.md` + self-hosted Umami dashboard; `src/` altında **yok** olduğu grep ile teyit edildi (research). Slot/secret değil, config sabiti.
- **`<Script afterInteractive>` senkron DOM düğümü garantisi yok** (effect ile enjekte eder) → render testi next/script'i **MOCK'lamalı**; gerçek enjeksiyonu test etme (Next'in sorumluluğu, canlıda doğrulanır). Tam `LocaleLayout` render'ı kırılgan (async server component + next/font + next-intl request context + `notFound()`) → izole bileşen + mock şart (research C).
- **i18n dokunuşu yok:** Yeni görünür metin eklenmiyor (script tag) → 5-dil anahtar senkronu gerekmez (Süreç Disiplini: bu bir "değer/anahtar" değişimi değil, metin-dışı entegrasyon).
- **SPA geçişleri:** App Router'da Umami sayfa geçişlerini otomatik yakalar → ekstra kod yok.
- **Additive & geri-dönüşü kolay:** layout'a tek bileşen satırı; rollback = satırı çıkar.
- **Canlı +1 doğrulama bu task'ta DEĞİL:** `data-domains=kiwiailab.com` preview'ları saymaz → +1 panel doğrulaması yapısal olarak merge-sonrası (milestone / verify-phase). Bu task preview'da script'in **yüklendiğini** (ağ sekmesi) doğrulamakla sınırlı.

---

## Test Kriterleri

- [ ] `npm test` yeşil — `umami-script.test.tsx` `src` / `data-website-id` / `data-domains` / `strategy` değerlerini assert eder; mevcut tohumlar (i18n parite, smoke) kırılmaz.
- [ ] `next build` temiz geçer (three transpile + strict TS).
- [ ] Lokal prod/preview'da `[locale]` head'inde Umami `script.js` isteği ağ sekmesinde görülür — TR `/` (`NEXT_LOCALE=tr` cookie) + en az 1 non-TR locale (örn. `/en`).
- [ ] Mevcut tema-FOUC script'i + Umami script birlikte, çakışmasız yüklenir.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-7.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-01
