# M6: SEO & Deploy Altyapısı

**Sorumluluk:** Yayın, SEO ve build katmanını sağlamak — metadata/canonical/alternates, sitemap/robots, Next config, Vercel deploy ve env yönetimi.
**Bağımlılık:** M4 (metadata route'ları locale'e bağlı), tüm modüllerin üzerine oturan yayın katmanı.
**Sınır:** Build/yayın/SEO mekaniği. İçerik metni M2/M4'te; performansın görsel kaynağı M1'dedir.

---

## Feature'lar

### F6.1: Metadata & canonical/alternates → Faz —

**Açıklama:** `[locale]/layout.tsx` `generateMetadata` — i18n'den `meta.title/description`, `metadataBase`, `openGraph`, `alternates.canonical` (TR `/`, diğerleri prefixli), `alternates.languages` (5 locale). Her alt sayfa kendi `generateMetadata`'sını taşır. `icon.svg` favicon kaynağı.

**Kabul Kriterleri:**
- Her sayfa/locale için doğru title/description ve canonical.
- `alternates.languages` 5 dili işaret eder.

**Bağımlılık:** M4

**Edge Case'ler:**
- Yeni sayfa eklenince metadata + sitemap + alternates birlikte güncellenmeli.

---

### F6.2: Sitemap & robots → Faz —

**Açıklama:** `src/app/sitemap.ts` (5 locale × 6 path = 30 giriş; base `https://kiwiailab.com`; home priority 1.0, detay 0.7, monthly), `src/app/robots.ts` (tümüne izin + sitemap URL).

**Kabul Kriterleri:**
- Sitemap tüm locale × path kombinasyonlarını üretir.
- robots sitemap'i doğru işaret eder.

**Bağımlılık:** F6.1, M4

**Edge Case'ler:**
- Yeni route eklenince sitemap path listesi güncellenmeli (elle senkron).

---

### F6.3: Next config & build → Faz —

**Açıklama:** `next.config.ts` — `createNextIntlPlugin` wrap, `images.formats` AVIF/WebP, `transpilePackages: ["three"]`, redirects (kalıcı 308, her biri **çıplak + `/:locale(en|ar|de|es)/…` twin**): `/forum`→`/` (`/bulten` index yok, bülten içeriği ana sayfada `#forum` — Faz 13), `/forum/:slug*`→`/bulten/:slug*` (makale slug'ları geçerli), `/bunker-os`→`/crew-os` (Faz 11). `tsconfig.json` strict, `@/*` path alias. `postcss.config.mjs` Tailwind v4 plugin.

**Kabul Kriterleri:**
- `next build` temiz geçer; three transpile edilir.
- Eski forum + bunker-os linkleri 5 locale'de (çıplak + prefixli) kalıcı 308 ile çalışır (sessiz `/en/forum`→404 gap yok). Çıplak `/forum` `/`'a gider (slug `:slug*` boş-segment eşlemesine düşmez — çıplak giriş sırada önce). Regresyon tohumu: `tests/seo-redirects.test.ts` (`routes-manifest.json` assertion).

**Bağımlılık:** M4 (intl plugin)

**Edge Case'ler:**
- three ESM transpile gerekliliği (kaldırılırsa build kırılır).

---

### F6.4: Vercel deploy & env yönetimi → Faz —

**Açıklama:** Vercel projesi `north-ai/kiwi-ai-lab-v3`; her `main` push → otomatik deploy. Env: `ANTHROPIC_API_KEY` (chatbot için), opsiyonel `CHAT_MODEL`. `.env.example` referans.

**Kabul Kriterleri:**
- main push'ta Vercel otomatik build/deploy yapar.
- Chatbot canlıda çalışsın diye Vercel env'inde API key tanımlı.

**Bağımlılık:** F6.3, M5 (env tüketicisi)

**Edge Case'ler:**
- Revize `revize/...` branch'lerinde çalışılır; canlı yalnızca `main`'den deploy olur (preview deploy'lar branch'lerde).
- Secret'lar koda gömülmez (env-tabanlı — ILKELER).

---

## Teknik Notlar

- Performans bütçesi (brief): Lighthouse ≥95 perf / ≥100 a11y, LCP < 2.5s, near-zero CLS. WebGL lazy + degradable (M1 ile sağlanır).
- Sitemap path listesi şu an elle tutuluyor — yeni sayfa = sitemap + metadata + sektör/nav linkleri senkron güncellenmeli.
- Deploy modeli: `main` = canlı/production; revize işleri branch'te, hazır olunca merge.

---

**Son Güncelleme:** 2026-06-27
