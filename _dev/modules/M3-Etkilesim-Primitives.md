# M3: Etkileşim & UX Primitives

**Sorumluluk:** Sitenin yeniden kullanılabilir etkileşim, hareket ve kontrol primitive'lerini sağlamak — smooth scroll, scroll-reveal, manyetik hover, özel cursor, navigasyon ve tema/dil kontrolleri.
**Bağımlılık:** M1 (tema token'ları), M4 (dil değiştirici i18n'e bağlı). M2 bölümleri bu primitive'leri tüketir.
**Sınır:** Genel, içerik-bağımsız etkileşim mekanikleri. Bölüm-özel yerleşim/içerik M2'de; WebGL imza M1'dedir.

---

## Feature'lar

### F3.1: Scroll & hareket altyapısı → Faz —

**Açıklama:** `SmoothScroll.tsx` (Lenis, GSAP ticker ile tek saat), `ScrollProgress.tsx` (üst ilerleme barı), `Reveal.tsx` (`[data-reveal]` çocuklarını ScrollTrigger ile fade+up ile açar).

**Kabul Kriterleri:**
- Lenis ve GSAP ScrollTrigger tek ticker'dan beslenir (senkron).
- `prefers-reduced-motion` → smooth scroll ve reveal devre dışı (anında görünür).
- Reveal: "top 80%" tetik, varsayılan stagger 0.09, ease power3.out.

**Bağımlılık:** Yok (M1 token'ları görsel için)

**Edge Case'ler:**
- Reduced-motion'da hiçbir içerik gizli kalmamalı (görünürlük garanti).
- Anchor scroll (`anchors:true`) ID hedeflerine düzgün gitmeli.

---

### F3.2: Cursor & manyetik etkileşim → Faz —

**Açıklama:** `CustomCursor.tsx` (yalnızca fine-pointer + reduced-motion değilse; dot + lag'li ring, hover'da büyür) ve `Magnetic.tsx` (çocuğu mouse'a doğru yaklaştırır, dokunmatik/reduced-motion'da kapalı).

**Kabul Kriterleri:**
- Dokunmatik cihazda custom cursor ve manyetik etki devre dışı.
- `has-custom-cursor` sınıfı eklenince native cursor CSS ile gizlenir.
- Interaktif öğeler (a, button, input, `[data-cursor='hover']`) ring'i büyütür.

**Bağımlılık:** Yok

**Edge Case'ler:**
- Reduced-motion → native cursor korunur.
- Mouse dışı pointer tipinde manyetik etki tetiklenmemeli.

---

### F3.3: Navigasyon & header → Faz —

**Açıklama:** `Nav.tsx` (ana sayfa sticky nav; scroll'da blur/border; logo, linkler, ThemeToggle, LanguageSwitcher, CTA), `PageHeader.tsx` (alt sayfa header'ı), `KiwiMark.tsx` (SVG marka işareti — `currentColor`).

**Kabul Kriterleri:**
- Nav scroll durumunda blur/border kazanır.
- KiwiMark çevreleyen metin rengini miras alır; `size` prop ile ölçeklenir.

**Bağımlılık:** M1 (token), M4 (dil)

**Edge Case'ler:**
- **Logo sol-üstte oturmuyor** (hizalama sorunu) — bkz. REVIZE-BACKLOG.
- Mobilde nav linkleri gizli (CTA + kontroller kalır).

---

### F3.4: Tema & dil kontrolleri → Faz —

**Açıklama:** `ThemeToggle.tsx` (`html.dark` toggle, `localStorage`, `themechange` event) ve `LanguageSwitcher.tsx` (dünya ikonu + 5 dilli açılır liste, `router.replace` ile locale değişimi, Escape/dışı tıklama ile kapanır).

**Kabul Kriterleri:**
- Tema seçimi `localStorage`'da kalıcı; sayfa yenilemede korunur (FOUC yok — M1 script).
- Dil değişimi mevcut path'i koruyarak locale'i değiştirir.
- Dil listesi klavye ile erişilebilir (aria-haspopup/expanded).

**Bağımlılık:** M1 (tema), M4 (routing/navigation)

**Edge Case'ler:**
- Tema değişimi Living Flow uniform'larını da güncellemeli (M1 MutationObserver dinler).
- `drop` prop ("up"/"down") footer/nav konumuna göre menüyü doğru açmalı.

---

## Teknik Notlar

- Tüm primitive'ler `prefers-reduced-motion`'a saygı gösterir — brief'in erişilebilirlik gereği.
- Lenis + GSAP tek ticker deseni performans için kritik (çift rAF döngüsü yok).
- Data-attribute sözleşmeleri: `[data-reveal]`, `[data-cursor='hover']`, `[data-hero]` — bölümler bunlara dayanır.
- Bilinen UI sorunları (logo hizalama, CTA affordance/ölçekleme): `docs/REVIZE-BACKLOG.md`.

---

**Son Güncelleme:** 2026-06-27
