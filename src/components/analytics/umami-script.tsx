import Script from "next/script";

// Umami self-hosted analytics (E1). Site-geneli pageview/ziyaret ölçümü.
//
// [locale]/layout.tsx'in <head>'inde <UmamiScript /> olarak render edilir →
// tüm locale'ler otomatik kapsanır. App Router'da Umami SPA sayfa geçişlerini
// kendisi yakalar (ekstra kod yok). Değerler sır DEĞİL — yayınlanan HTML'de
// zaten görünür (config sabiti; spec: _dev/docs/UMAMI-ANALYTICS.md).
//
// strategy="afterInteractive": hydration sonrası erken yüklenir, kısa
// ziyaretleri de sayar (ölçüm doğruluğu; perf regresyonsuz doğrulanır — Faz 7).
// Hook yok → server component olarak kalır ("use client" gerekmez).
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
