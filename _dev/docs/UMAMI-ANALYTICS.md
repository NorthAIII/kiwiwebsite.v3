# UMAMI ANALYTICS — Entegrasyon Spec'i

**Durum:** ✅ Uygulandı & canlıda doğrulandı — kod Faz 7'de eklendi (`src/components/analytics/umami-script.tsx`, `[locale]/layout.tsx` head'inde); canlı +1 **v0.2 production release**'te (2026-07-02) panel ekran görüntüsüyle doğrulandı: `umami.kiwiailab.com` "1 Online" (realtime) + son-24s Visitors/Visits/Views = 1, canlı HTML'de `c7031c49` mevcut. Detay → `docs/RELEASE-v0.2.md` §4. Bu doküman uygulanan değerleri ve dikkat noktalarını korur.
**Modül:** M6 (SEO & Deploy Altyapısı) — site geneli analytics.
**Amaç:** Site web trafiğini kontrol etmek için kendi Umami sunucumuzla (self-hosted) sayfa görüntüleme/ziyaret ölçümü.

---

## Eklenecek Kod

Site Next.js (App Router) olduğu için en temiz yol `next/script` ile **html/head'in bulunduğu layout'a** koymak — böylece her sayfada otomatik çalışır.

> **Uygulama notu (önemli):** Kullanıcının verdiği örnek `src/app/layout.tsx`'i (root layout) gösteriyor. Ama bu projede root layout boş bir pass-through; gerçek `<html>`/`<head>`/`<body>` kabuğu **`src/app/[locale]/layout.tsx`**'te. Bu yüzden `<Script>`'i `[locale]/layout.tsx`'teki `<head>`'e koymak doğru yer. (Global `src/app/not-found.tsx` dışında her sayfa buradan geçer; analytics için 404'ü kaçırmak ihmal edilebilir.)

```tsx
// src/app/[locale]/layout.tsx — <html>/<head>/<body>'nin olduğu layout
import Script from "next/script";

// ... mevcut layout içinde <head> bloğuna:
<Script
  src="https://umami.kiwiailab.com/script.js"
  data-website-id="c7031c49-5ccd-4b93-a82d-bba895ee4f2e"
  data-domains="kiwiailab.com"
  strategy="afterInteractive"
/>
```

Çatıdan bağımsız düz HTML alternatifi (birebir aynısı):

```html
<script defer
  src="https://umami.kiwiailab.com/script.js"
  data-website-id="c7031c49-5ccd-4b93-a82d-bba895ee4f2e"
  data-domains="kiwiailab.com"></script>
```

---

## Değerlerin Anlamı

| Alan | Değer | Neden |
|------|-------|-------|
| `src` | `https://umami.kiwiailab.com/script.js` | Bizim kendi Umami sunucumuz (kurulu, çalışıyor) |
| `data-website-id` | `c7031c49-5ccd-4b93-a82d-bba895ee4f2e` | Umami'de kiwiailab.com için zaten kayıtlı site; bu ID'ye yazar |
| `data-domains` | `kiwiailab.com` | Sadece gerçek domain'den gelen ziyaretleri say; localhost/preview gürültüsünü dışarıda bırakır (opsiyonel ama önerilir) |

> Not: `data-website-id` ve Umami URL'i **secret değildir** — yayınlanan sayfa HTML'inde zaten herkese görünür. Bu yüzden public repo'da tutulması sorun değil.

---

## Dikkat Edilecek 3 Şey

1. **Root/html layout'a koy, tek sayfaya değil.** Her sayfada yüklenmeli. App Router'da Umami sayfa geçişlerini (SPA navigasyonu) otomatik yakalar — ekstra kod gerekmez.
2. **Canlıda (production) gözle doğrula.** Deploy'dan sonra siteyi gerçekten ziyaret et, sonra Umami panelinde sayının +1 arttığını **gör**. "Kod ekledim, tamamdır" deme — gerçekten saydığını gözle doğrula. (Bu projede tam da bu atlanmıştı — bkz. MEMORY → Süreç Disiplinleri.)
3. **Reklam engelleyiciler** (uBlock/Brave) `script.js`'i bazen engeller → o ziyaretçiler sayılmaz. Çoğu normal ziyaretçi sayılır; %100 hassasiyet bekleme. (İleride istenirse script'i farklı isimle proxy'lemek bu kaçağı azaltır — şimdilik gerek yok.)

---

## Kabul Kriterleri (uygulanınca)

- Tüm sayfalarda (tüm locale'lerde) Umami script'i yükleniyor.
- Canlı domain'de gerçek bir ziyaret Umami panelinde görünüyor (gözle doğrulandı).
- `data-domains` sayesinde localhost/preview trafiği sayılmıyor.
- Performans regresyonu yok (`afterInteractive`/`defer` — LCP'yi bozmaz).

---

**Son Güncelleme:** 2026-07-02 — v0.2 production release: canlı +1 panel ekran görüntüsüyle doğrulandı (⬜→✅). Kabul kriterleri karşılandı (script tüm locale'lerde yükleniyor, canlı ziyaret panelde göründü, `data-domains` preview'ı dışladı, `afterInteractive` perf regresyonsuz).
