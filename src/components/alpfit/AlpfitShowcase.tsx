"use client";

import AlpfitHero from "./AlpfitHero";

/**
 * Alpfit Plus — kulüp işletme yazılımı ürün vitrini (F2.8 zengin yeniden tasarım).
 *
 * Composition shell over the page shell (PageHeader/Footer/SmoothScroll/CustomCursor
 * are wired in the route). Sections land progressively across Phase 15 tasks
 * (Sorun+Roller · Telefon mockup'ları · 9 Özellik · Neden · Fiyat/Yol haritası/Kapanış);
 * for now it mounts only the signature hero.
 */
export default function AlpfitShowcase() {
  return (
    <main className="pt-16">
      <AlpfitHero />
    </main>
  );
}
