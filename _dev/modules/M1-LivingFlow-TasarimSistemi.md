# M1: Living Flow & Tasarım Sistemi

**Sorumluluk:** Sitenin imza WebGL alanını (The Living Flow) ve üzerine oturduğu tasarım token sistemini (renk/tipografi/tema, dark mode) sağlamak.
**Bağımlılık:** Yok (taban katman). Diğer tüm modüller bu modülün token'larına ve Living Flow'una dayanır.
**Sınır:** Görsel altyapı ve imza efekt. Bölüm içerikleri/yerleşimi (M2), genel etkileşim primitive'leri (M3) bu modülde değildir; ama tema token'ları ve Living Flow motifi her ikisinde de tüketilir.

---

## Feature'lar

### F1.1: Living Flow WebGL alanı → Faz —

**Açıklama:** `src/components/living-flow/FlowCanvas.tsx` — React Three Fiber + custom GLSL ile, deterministik PRNG (Mulberry32) üzerinden üretilen Catmull-Rom eğrileri, eğriler boyunca ilerleyen yeşil nabızlar ve düğümlerden oluşan alan. Cursor yakınında çizgiler büker/nabızlar hızlanır; scroll'da parallax kayar; temaya göre mürekkep rengi değişir.

**Kabul Kriterleri:**
- Hero arkasında full-bleed render edilir; 16 eğri / 560 nabız (high), 9 eğri / 200 nabız (low).
- Cursor hareketi nabız hızını ve çizgi bükülmesini etkiler (uMouse uniform, lag 0.12).
- Dark/light tema değişiminde mürekkep rengi canlı güncellenir (MutationObserver `html.dark`).
- DPR 1–1.6 ile sınırlı; antialias + high-performance GPU tercihi.

**Bağımlılık:** F1.4 (tema token'ları/renkler)

**Edge Case'ler:**
- WebGL yok / context kaybı → F1.2 fallback devreye girer (canvas hiç mount edilmez).
- Düşük güçlü cihaz → "low" kalite (az eğri/nabız).

---

### F1.2: Degradasyon & fallback → Faz —

**Açıklama:** `LivingFlow.tsx` wrapper — `dynamic(ssr:false)` ile FlowCanvas'ı lazy yükler; ilk paint'ten sonra bir frame geç başlatır (LCP'yi bozmaz). Cihaz/CPU ve `prefers-reduced-motion` / WebGL desteğine göre `high | low | static` modu seçer; her durumda statik radyal yeşil zemin tabanı render edilir.

**Kabul Kriterleri:**
- `prefers-reduced-motion` veya no-WebGL → `StaticFlow()` SVG fallback (canvas yok).
- ≤4 çekirdek veya mobil → "low" kalite.
- İlk paint asla WebGL init'i beklemez (LCP koruması).

**Bağımlılık:** F1.1

**Edge Case'ler:**
- SSR'da canvas çalışmaz → `ssr:false` zorunlu.
- Tema fallback statikte de doğru renkte olmalı (light/dark).

---

### F1.3: FlowScrim overlay → Faz —

**Açıklama:** `FlowScrim.tsx` — Living Flow ile hero metni arasında radyal gradient maske; metni parçacıklardan kaldırır (solda ~%90 opaklık), sağda şeffaflaşır (akışı canlı bırakır). `--color-canvas` token'ı ile temaya uyar.

**Kabul Kriterleri:**
- Hero metni Living Flow üstünde okunabilir kalır (kontrast).
- Tema değişiminde scrim rengi uyumlu.

**Bağımlılık:** F1.1, F1.4

**Edge Case'ler:**
- RTL'de gradient yönü metin tarafına göre kontrol edilmeli (okunabilirlik AR'de de korunmalı).

---

### F1.4: Tasarım token sistemi & dark mode → Faz —

**Açıklama:** `src/app/globals.css` — Tailwind v4 `@theme` bloğu; renk token'ları (`--color-canvas`, `--color-ink`, `--color-green`, `--color-pulse`, `--color-line` vb.), tipografi (`--font-display` Fraunces, `--font-sans` Geist), özel easing (`--ease-flow`), grain dokusu, focus state'leri, reduced-motion kuralları. `html.dark` altında token'lar ters çevrilir.

**Kabul Kriterleri:**
- Tema `localStorage`'da saklanır; ilk açılışta FOUC önleyici inline script (`[locale]/layout.tsx`) doğru sınıfı uygular.
- `:focus-visible` → 2px yeşil outline (a11y).
- `prefers-reduced-motion` → tüm animasyon/geçiş ~0ms.

**Bağımlılık:** Yok

**Edge Case'ler:**
- Tema flash (FOUC) — script `<body>` boyanmadan çalışmalı.
- Yeni renk eklerken hem light hem dark değeri tanımlanmalı.

---

## Teknik Notlar

- Marka renkleri: INK `#12140f` (light) / `#f2f1e8` (dark); PULSE core `~#6FE36F`/`#9bf29b`, halo `#1f7a3d`. Parıltı yeşili **yalnızca** Living Flow nabızlarında kullanılır (brief kuralı: neon taşması yok).
- `three` paketi `next.config.ts` içinde `transpilePackages` ile işlenir (untranspiled ESM).
- Tailwind v4'te ayrı `tailwind.config.ts` **yok** — config `globals.css` `@theme` bloğunda.
- Brief çıtası: Awwwards SOTD kalibresi, kusursuz motion timing, "zero template smell" — bu modül o çıtanın taşıyıcısıdır.

---

**Son Güncelleme:** 2026-06-27
