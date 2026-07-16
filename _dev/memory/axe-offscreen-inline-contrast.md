# axe color-contrast: viewport-dışı küçük inline node zemini `<body>` canvas'ına düşer (yanlış-pozitif)

**Tuzak:** İnk-panel (`bg-ink text-canvas`) üzerinde **parlak renkli, küçük bir inline vurgu** (örn. `<b class="text-pulse-ink">` bir kelime) — gerçek kontrastı mükemmelken (koyu panel üstünde bright-green ≈ 11.5:1) — axe/Playwright a11y taramasında **`color-contrast` violation** verebilir: `bgColor=#f7f6f1` (light canvas / `<body>`), `contrastRatio≈1.5`, `expectedContrastRatio 3:1`. Sadece **light** temada; dark'ta panel krem'e döner, aksan koyu-yeşil olur ve ölçüm doğru çıkar.

**Kök neden (ampirik, `elementsFromPoint` ile teyitli):** Paylaşılan a11y helper `scrollThrough` sona **`window.scrollTo(0, 0)`** yapar → axe tarama anında alt-fold panel **viewport-dışıdır**. axe `getBackgroundColor` küçük inline node'un merkezinde `document.elementsFromPoint(x, y)` çağırır; koordinat viewport dışında (örn. y≈4178, viewport ~720) olduğu için **boş liste** döner → axe opak paneli (`bg-ink #12140f`) çözemez ve sayfa varsayılan zeminine (`<body>` canvas `#f7f6f1`) düşer → bright-green on cream = 1.5:1 uydurma değeri. Aynı panelin **büyük** `<p>` metni (krem) ise "incomplete" kalıp geçer — küçük inline node kesin-fail verirken. (Element viewport'a alınınca `elementsFromPoint` paneli doğru döndürür → gerçek 11.5:1 doğrulandı.)

Bu, [WebGL-arkası "incomplete"](axe-webgl-contrast-incomplete.md), [aria-hidden muafiyet değil](aria-hidden-color-contrast-muafiyeti-degil.md) ve [a11y ölçüm tema tuzağı](a11y-olcum-tema-tuzagi.md) ile aynı ölçüm-artefaktı ailesindendir — araç ölçemedi/yanlış ölçtü, öğe gerçekte erişilebilir.

**Çözüm (görsel değişimsiz, en temiz):** Vurgu inline node'una **panelle aynı renk** opak zemin ver — `<b class="bg-ink font-semibold text-pulse-ink">`. `bg-ink` panelle aynı renk olduğu için **görsel fark yok**, ama axe artık node'un kendi opak zeminini doğrudan ölçer (viewport-dışı `elementsFromPoint`'e ihtiyaç kalmaz) → light 11.5:1 / dark 4.74:1 geçer. (TASK-15.05 aside pull-quote.)

**Neden başka çözümler tutmadı:**
- **Aksan rengini değiştir:** Koyu panelde okunur parlak yeşil (light `--color-pulse-ink` #6fe36f) canvas-fallback'te ~1.5 kalır; canvas-fallback'i geçen koyu yeşil ise gerçek koyu panelde muddy olur. **İki temada hem gerçek-panel hem body-fallback'i geçen tek aksan rengi yoktur.**
- **Dekoratif glow'u kaldır:** Glow (radyal gradient) ilk şüpheliydi ama kaldırıldıktan sonra fail sürdü — glow neden değil.
- Helper'ı (`scrollThrough` scroll-0 reset) değiştirmek paylaşılan mühürlü harness'i etkiler + uzun sayfada her şey aynı anda viewport'a sığmaz → çözüm ölçüm-tarafında değil, **öğeye opak zemin** vermekte.

**Uygulama anı:** İnk-panel üstünde renkli inline metin aksanı (pull-quote highlight, fiyat/rakam vurgusu) her kullanıldığında — özellikle alt-fold bölümlerde. TASK-15.06 fiyat bandı (`bg-ink` + `--color-pulse-ink` aksanları) aynı deseni kullanacak → aksana `bg-ink` ver.
