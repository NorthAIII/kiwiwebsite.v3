# Phase 14: v0.3 Versiyon-Sonu Senaryo Testi (ana sayfa + 5 alt sayfa uçtan-uca)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-14-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.3'ün (görsel & etkileşim cilası + URL taksonomisi/SEO + Living Flow nabız + SEO-metadata hijyeni) versiyon-sonu **Senaryo Testi** fazı — zorunlu `prd-review` öncesi son kapı. v0.3 içerik fazları (10 görsel cila, 11 URL taksonomisi/SEO, 12 Living Flow nabız, 13 SEO-metadata hijyeni) ve teknik borç fazının **task/faz-seviyesi** UAT'larının göremediği **dikişleri, tam kullanıcı yolculuklarını, mod kombinasyonlarını ve adversarial durumları** uçtan-uca doğrular. İş **doğrulama**: yeni içerik/feature üretilmez. Kapsam-içi (ana sayfa veya 5 alt sayfa) gerçek bug çıkarsa düzeltme task'ı olur; kapsam-dışı / zaten-ertelenmiş kalemler kaydedilip yönlendirilir.

**v0.3'ün Faz 9'dan (v0.2 senaryo testi) deltası — asıl yeni doğrulanacak yüzeyler:**
- **Faz 11 — `/bunker-os` → `/crew-os` route rename:** public URL değişti; eski URL 308 redirect (çıplak+5-locale), iç linkler temizlendi, i18n namespace `bunker`→`crew` 5-dil rename. Tüm giriş matrisini + taksonomi tutarlılığını etkiler.
- **Faz 12 — Living Flow sayfa-boyu nabız (imza-riskli):** ana sayfa artık desktop'ta sayfa-boyu nabız (sürekli soluk iplik + bölüme-uyarlanan `--flow-veil` opaklık + tek WebGL context); mobil korunur (aşağı-taşıma desktop-only). En büyük yeni craft/degradasyon yüzeyi.
- **Faz 13 — SEO-metadata katmanı:** alt-sayfa self-canonical + 5-locale hreflang/x-default; `/forum` → `/` 308 (hedef artık `/bulten` değil); `seo-metadata`+`seo-redirects` tohumları (suite 39 test).
- **Faz 10 — görsel cila:** ortak `<Logo>` her yüzeyde; Hero CTA kartı ok-affordance; scroll göstergesi ölçek.

**Kapsam sınırı (kullanıcı kararı):** ana sayfa + 5 alt sayfa uçtan-uca — Faz 9 çıtası korunur (v0.3 rota değiştirdi + Living Flow'u sayfa boyuna taşıdı; ikisi de çapraz yüzey → bütünsel doğrulama). 5 alt sayfa Faz 11 sonrası: `/crew-os`, `/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`.

**Milestone:** *(Faz 2/3/8/9 dersi uygulandı: versiyon-sonu doğrulama milestone'u "ölç + kaydet + karar ver" olarak yazılır — geçiş peşinen varsayılmaz.)*
1. Ana sayfa + 5 alt sayfa uçtan-uca senaryo kataloğu (S1–S9) otonom koşuldu;
2. her senaryonun sonucu (geçti / bulgu) kayıt altına alındı;
3. bulgular **triyaj** edildi — kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug'lar düzeltme task'ına, kapsam-dışı / ertelenmiş kalemler sahipli kayda;
4. **TR yolculuğu birincil** olarak bütünsel-tutarlı doğrulandı (ana sayfa + alt sayfalara çıkış/dönüş, **Crew OS çıkışı artık `/crew-os`**) + **non-TR yüzeyleri tutarlı** (parite / render bütünlüğü / AR-RTL aynalama; bilinçli-stale değerler görünür kopukluk yaratmıyor);
5. **v0.3 kazanım guardrail'leri regresyonsuz teyit edildi** — a11y=100 çift-tema (home + 5 alt sayfa) + axe suite yeşil · **SEO metadata katmanı** (canonical self + 5-locale hreflang/x-default per sayfa + redirect locale-kapsamı + sitemap↔canonical tutarlılık, `seo-*` tohumları) · **Living Flow sayfa-boyu nabız imza korundu** (desktop perf 100/CLS 0, kontrast=100 çift-tema, fallback/reduced-motion sağlam) · perf korunan taban (mobil LCP≈3164ms, masaüstü 100, CLS≈0) · i18n 5-dil parite (0 `MISSING_MESSAGE`) · CI (`fast`+`a11y`) yeşil.

### Feature Listesi

(Senaryo testi çapraz/doğrulama fazıdır — "feature" değil **senaryo grupları (validation units)**; her grup tetiklediği birincil modüle eşlenir. MODULE-MAP `— v0.3 …` iş birimleri (Faz 10–13) + M1–M6 referansı.)

| Senaryo Grubu | Modül | Açıklama |
|---------------|-------|----------|
| S1: Giriş noktaları & yönlendirme matrisi | M4 (+M6) | 5 dil ana sayfa + 5 alt sayfa route'ları (TR prefixsiz + /en /ar /de /es); **`/crew-os` yeni public** (5 dil 200); **`/bunker-os`→`/crew-os` 308** (çıplak+5-locale twin); **`/forum`→`/` 308** (Faz 13: hedef artık `/bulten` değil), `/forum/:slug*`→`/bulten/:slug*` 308; bilinmeyen-locale, derin-link |
| S2: Tam TR yolculuğu — ana sayfa → alt sayfalar | M2 (+M3) | Hero → ikincil CTA → sektörler (gym + Alpfit çıkış) → 4-adım → **Crew OS (çıkış artık `/crew-os`)** → Forum → Footer; + ana sayfadan alt sayfalara çıkış (Alpfit/Crew OS/vaka/bülten) → içerik bütünlüğü → dönüş; **`<Logo>` her yüzeyde tutarlı** (Faz 10); CTA/nav doğru, kopuk link/`/tr/`-sızıntı/boş bölüm yok |
| S3: Mod kombinasyonları (Living Flow degradasyon) | M1 (+M3) | **EN BÜYÜK v0.3 delta:** ana sayfa **sayfa-boyu nabız** (Faz 12: sürekli soluk iplik + bölüme-uyarlanan `--flow-veil` + tek WebGL context) — light/dark (FOUC yok), reduced-motion (StaticFlow, **tüm sayfa** sadece hero değil), no-WebGL, **mobil "low" (nabız desktop-only → mobil korunur)**, **AR-RTL × dark × reduced birlikte**, 320/768/1440 taşma yok + near-zero CLS; craft: `--flow-veil` washi okunabilirlik (light-bleed çözümü) |
| S4: Kontroller & kalıcılık | M3 (+M1/M4) | tema toggle (localStorage + reload kalıcılık + Living Flow uniform **sayfa-boyu**), dil-switcher (path koru — **`/crew-os` dahil**, klavye/Escape/dış-tık), **klavye-only yolculuk** + focus-visible; alt sayfada da dil-switcher path korur |
| S5: Taksonomi & dürüstlük tutarlılığı (çapraz/sahipsiz) | M2 (+M4) | **"Crew OS" her yüzeyde / "Bunker" hiçbir görünür yüzeyde yok — artık URL'de de yok** (Faz 11: public `/crew-os`); kod-adı kalıntısı (`components/bunker-os/`, `#bunker` anchor, namespace) render'dan ayrıştırılır; render'da uydurma sonuç / sahte "● online" / yasak metafor yok (gerçek-canlı ürün dürüst göstergesi meşru) |
| S6: 5-dil bütünlük & non-TR tutarlılığı (versiyon-sonu çekirdek) | M4 (+M2) | parite (Vitest yeşil, eksik anahtar=fail), render `MISSING_MESSAGE` yok (ana sayfa + 5 alt sayfa × 5 dil), **namespace `bunker`→`crew` 5-dil senkron** (Faz 11 SEO2), bilinçli-stale non-TR görünür kopukluk yok, **AR-RTL aynalama** |
| S7: Chatbot (0-token: offline + sanitizasyon) | M5 | key-yok offline UI (sahte-online-yok) + sanitizasyon kod-inceleme + malformed-input kısa-devre (rol enjeksiyonu / boş / sonda-user-yok → API'ye ulaşmadan red) + stream-kopması UI takılmaz; **toplam API çağrısı = 0**. *(v0.3 chat'e dokunmadı → regresyon riski yok; versiyon-sonu bütünsellik + 0 maliyet için Faz 9 paritesinde korundu — kullanıcı kararı)* |
| S8: v0.3 kazanım guardrail'leri (çapraz — suite koşu) | tümü | **v0.3'ün çekirdeği:** a11y=100 çift-tema (home + 5 alt sayfa Lighthouse) + axe `test:e2e` yeşil (fail-on-regression) · **SEO metadata katmanı (YENİ, Faz 13):** self-canonical + 5-locale hreflang/x-default per sayfa + redirect locale-kapsamı + sitemap↔canonical tutarlılık (`seo-metadata`+`seo-redirects` tohumları, suite **39 test**) · **Living Flow sayfa-boyu nabız tabanı (Faz 12):** desktop perf 100/CLS 0, kontrast=100 çift-tema full-motion · perf korunan taban (mobil LCP≈3164ms, masaüstü 100, CLS≈0) · CI (`fast`+`a11y`) yeşil |
| S9: Adversarial / holistik kırma | tümü | JS-kapalı SSG okunabilirlik (ana sayfa + alt sayfalar), hızlı dil/tema toggle race, hızlı scroll/anchor zıplama (**sayfa-boyu nabız + ScrollTrigger kararlılığı**), `next build` temiz + 0 MISSING_MESSAGE (regresyon tabanı), canonical/redirect tohumu yeşil |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 14` oturumunda dolduruldu (2026-07-03). Versiyon-sonu tespiti (Adım 0b): Versiyon Sonu Durumu `senaryo_testi` (review-phase 13 `teknik_borç`→`senaryo_testi` damgaladı); Faz 14 (senaryo testi) PHASES.md tablosunda yoktu → senaryo testi fazına girildi. Bu, v0.3'ün zorunlu `prd-review` öncesi uçtan-uca doğrulamasıdır.

### Alınan Kararlar

- **Faz tipi = v0.3 versiyon-sonu Senaryo Testi (sabit faz).** Doğrulama fazı — yeni feature üretilmez; çekirdek soru: task/faz-UAT'larının göremediği dikiş/yolculuk/çapraz/adversarial katmanda v0.3 tutarlı mı. Faz 3 (v0.1) ve Faz 9 (v0.2) modeli; S1–S9 iskeleti v0.3'ün deltasına (route rename + sayfa-boyu nabız + SEO metadata + logo) uyarlandı.
- **Kapsam sınırı = ana sayfa + 5 alt sayfa uçtan-uca** (kullanıcı kararı 2026-07-03). Faz 9 çıtası korunur. Gerekçe: v0.3 iki çapraz yüzey getirdi — (a) `/crew-os` route rename tüm giriş matrisini + iç linkleri + taksonomiyi etkiler; (b) Living Flow artık ana sayfa boyu (desktop) → hero-ötesi tüm bölümlerin degradasyon/craft yüzeyi. İkisi de dar-kapsamla yakalanamaz → bütünsel 6-sayfa uçtan-uca. **a11y-DERİNLİK Faz 8'de yapıldı, tekrar edilmez** — senaryo testi yalnız yolculuk-içi tutarlılığı + v0.3 guardrail re-teyidini doğrular (a11y=100 çift-tema re-teyidi S8 guardrail'inde, yeni denetim değil).
- **TR birincil öncelik** (kullanıcı teyidi, yerleşik desen). TR yolculuğu derin/bütünsel doğrulanır (ana sayfa + alt sayfalara çıkış/dönüş); non-TR (EN/AR/DE/ES) yalnız **tutarlılık** katmanında (parite + render bütünlüğü + AR-RTL aynalama) — içerik-kalite derin denetimi DEĞİL. "Bilinçli-stale non-TR görünür kopukluk yaratıyor mu?" in-scope; stale içeriğin *kalitesi* out-of-scope (versiyon-sınırına ertelendi — ILKELER "TR tek kaynak", DECISIONS 2026-06-27 dil stratejisi).
- **Chatbot = 0-token (offline + sanitizasyon), S7 korunur** (kullanıcı kararı 2026-07-03). v0.3 chat koduna **hiç dokunmadı** → regresyon riski yok; ama versiyon-sonu bütünsellik + 0 API maliyeti için Faz 9 paritesinde S7 korunur. Test yüzeyi: key-yok zarif offline yolu + girdi sanitizasyonu kod-incelemesi + malformed-input kısa-devre. **Sıfır API çağrısı** (Faz 3/9 deseni birebir). Lisans gerçeği değişmedi (Anthropic API token-başına ücretli; canlı streaming yolu prod'da zaten kanıtlı).
- **Bulgu politikası = keşfet + kaydet + triyaj** (kullanıcı teyidi, yerleşik desen). Kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug → bu fazda düzeltme task'ı. Kapsam-dışı veya zaten-ertelenmiş → sahipli kayıt + yönlendirme, burada yeniden açılmaz.
- **Test modu = otonom** (kullanıcı teyidi, yerleşik desen). Gerçek test altyapısı var (Faz 5/8/13): `test:e2e` (Playwright+axe), Vitest (parite + `seo-metadata`/`seo-redirects` tohumları, 39 test), CI, Lighthouse çift-tema + curl/grep/standalone-Playwright runtime. Milestone "ölç + kaydet + karar ver" (geçiş peşinen varsayılmaz — Faz 2/3/8/9 dersi).
- **Senaryo kataloğu (S1–S9) yeterli** (kullanıcı kararı 2026-07-03: "katalog yeterli, devam"). v0.3 delta odağı (crew-os route + sayfa-boyu nabız + SEO metadata + logo) doğru; ek persona/kırılma-noktası eklenmedi. S1–S9 iskeleti onaylandı.

### Kullanıcı Tercihleri

- **Ana sayfa + 5 alt sayfa uçtan-uca (tam)** (2026-07-03): Faz 9 çıtası; v0.3'ün iki çapraz yüzeyi (route rename + sayfa-boyu nabız) bütünsel doğrulama gerektirir.
- **Chatbot 0-token dahil (Faz 9 paritesi)** (2026-07-03): offline + sanitizasyon + malformed kısa-devre; sıfır API çağrısı. Dokunulmadı ama versiyon-sonu bütünsellik için korunur.
- **Senaryo kataloğu S1–S9 yeterli** (2026-07-03): "devam"; ek senaryo yok, katalog faz dokümanına yazıldı.

### Sahipsiz Alan & Çapraz Konular

- **`/crew-os` route rename asıl yeni giriş yüzeyi.** Faz 9'da bu route hâlâ `/bunker-os`'tu; Faz 11 rename etti. Asıl bilinmeyen: yeni public URL (5 dil 200 + SSG), eski `/bunker-os` çıplak+5-locale twin 308 (locale-gap yok), iç linklerin tümü `/crew-os`'a işaret ediyor mu (kırık link/çift-redirect yok), taksonomi tutarlılığı (URL'de artık "Crew OS", "bunker" yalnız kod-adı kalıntısı).
- **Living Flow sayfa-boyu nabız (Faz 12) yeni degradasyon + craft yüzeyi.** Faz 9'da nabız yalnız hero'daydı; Faz 12 onu ana sayfa boyu (desktop) taşıdı: tek WebGL context (shared `useFlowMode`), bölüme-uyarlanan `--flow-veil` opaklık (emergent adaptif veil, 0 bölüm-dosyası dokunuşu). S3'te asıl doğrulanacak: reduced-motion **tüm sayfayı** StaticFlow'a düşürüyor mu (yalnız hero değil), mobil-low nabzı aşağı-taşımıyor mu (desktop-only korunur), `--flow-veil` washi okunabilirliği bölüm-metinlerinde koruyor mu (light-bleed çözümü), CLS≈0 kalıyor mu. S8'de: desktop perf 100/CLS 0 + kontrast=100 çift-tema full-motion tabanı regresyonsuz.
- **SEO metadata katmanı (Faz 13) AT-görünmez ama versiyon-sonu çekirdek.** Faz 9'da bu katman yoktu; Faz 13 ekledi. S8'de: her sayfa self-canonical (hiçbiri `/`'a canonicalize olmuyor — home hariç), 5-locale hreflang/x-default, `/forum`→`/` + tüm redirect locale-kapsamı, sitemap↔canonical tutarlılık. Bunlar `seo-metadata`+`seo-redirects` tohumlarıyla suite-korunan → S8 re-teyit (yeni denetim değil, regresyon güvencesi).
- **v0.3 guardrail'lerinin yolculuk-içi tutarlılığı (S8).** a11y=100 statik mühürlü (Faz 4/8), Living Flow desktop perf/CLS tabanı mühürlü (Faz 12), SEO metadata tohum-korunan (Faz 13) — ama tema/dil/motion kombinasyonlu tam yolculukta korunuyor mu; suite (`test:e2e` + Vitest 39 + CI) bunun re-teyit aracı.
- **Ölçüm disiplini (memory):** locale tuzağı (alt sayfa TR = prefixsiz → `NEXT_LOCALE=tr` cookie şart, EN/AR/DE/ES açık-prefixli), tema tuzağı (light+dark iki koşu, dark-panel inversiyonu), reveal tuzağı (`reducedMotion:'reduce'` + scroll), stray/stale `next-server` (listening-PID teyit), host yükü (`/proc/loadavg` perf-bitişik ölçümden önce), WebGL standalone Playwright'te `channel:'chrome'`+swiftshader şart, runtime harness selector-teyidi (LanguageSwitcher `router.replace` butonu / Chatbot inline `#chat` / tema `html.dark`) — research/plan'de teyit.
- **Ortam riski (Faz 13 dersi) — research-phase araç eşlemesinde çözülecek:** Bu cloud devcontainer'da `next start` sandbox tarafından öldürülebilir (worker-fork, exit 144). Faz 9 runtime senaryolarını (S3/S4/S9-race) standalone Playwright + system Chrome ile koştu; Faz 13 build-ground-truth'a (`routes-manifest.json` + prerender `<head>`) düştü. **S3 (sayfa-boyu nabız degradasyonu) gerçek tarayıcı+WebGL runtime gerektirir** → bu ortamda çalışabilirliği metodoloji riski; research-phase araç eşlemesinde netleşir (HTTP/SSG/metadata katmanı build-ground-truth ile her koşulda çalışır; runtime-tarayıcı katmanı ortam-bağımlı).
- **Guardrail:** senaryo testi kaynak koda dokunmaz (doğrulama fazı) → guardrail'ler zaten yeşil olmalı; S8 bunu re-teyit eder. Kapsam-içi bug çıkarsa (düzeltme task'ı) CI a11y job otomatik korur.

### Kapsam Dışı

- **Living Flow nabzın mobil aşağı-taşınması / `/crew-os`/Alpfit/404 sayfalarına taşınması** — Faz 12 bilinçle desktop-home-only yaptı; bu faz yalnız o kararın **regresyonsuzluğunu** doğrular, kapsamı genişletmez.
- **Brief mobil perf açığı** (perf ≈90/LCP ≈3164ms vs ≥95/<2.5s) — kök neden CPU-bound WebGL, P2 craft-gate'te iptal; nihai doğrulama gerçek-cihaz/Vercel field gerektirir (metodolojik duvar). Senaryo testte çıkarsa kaydedilir, düzeltilmez. DECISIONS 2026-06-30; prd-review'a bağlı (B grubu).
- **Alt-sayfa PERF optimizasyonu** — bu faz yalnız yolculuk/a11y-guardrail; alt-sayfa perf yalnız **regresyonsuz** tutulur, optimize edilmez.
- **non-TR içerik-kalite derin denetimi** — bilinçli-stale (versiyon-sınırı); yalnız tutarlılık (parite / render / RTL) test edilir. non-TR alt-sayfa içerik tazeliği (ar/de/es stale) → prd-review (B grubu).
- **Umami canlı +1 / canlı env doğrulaması** — v0.2 production release'te kapandı (canlı `a71adbc`); senaryo testi tetiklemez. Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil, kayıtlı).
- **Kayıtlı sahipli açıklar (record-not-fix, prd-review/gelecek faz):** TB-3 (full-motion test tohumu, WebGL-flaky) · TB-4 (site-geneli logical-ok RTL) · TB-5 (npm audit 3 moderate, next downgrade breaking) · `/bulten` index 404 (kod tabanında link yok + `/forum`→`/` kapıyı kapatır, bilinçli kapsam dışı). Senaryo testte çıkarsa sahipli kayıt, yeniden litige edilmez.
- **Dil setini değiştirme / AR'yi üründen çıkarma** — vizyon/PRD kararı; prd-review'a bırakıldı (vizyon korunur).
- **Kod-adı tanımlayıcıları** (`Bunker.tsx`, `components/bunker-os/`, `nav.bunker`, `#bunker`) — iç kod adı, taksonomi izin veriyor (dokunulmaz); S5 yalnız **render edilen görünür metni/URL'i** denetler, kod kalıntısını değil.
- **Yeni içerik/feature** — senaryo testi doğrulama fazıdır, üretim yapmaz (kapsam-içi bulgu → düzeltme task'ı istisnası hariç).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 14` oturumunda dolduruldu (2026-07-03). Senaryo testi fazı olduğu için araştırma = **yeni kütüphane/mimari değil**, S1–S9 senaryo gruplarının bu ortamda hangi araçla doğrulanacağı (**araç eşlemesi**) + discuss-phase'in erteledği **S3 ortam riskinin ampirik çözümü**. Yeni kod üretilmez.

### Ortam Ampirik Teyidi (S3 riski çözüldü — en kritik bulgu)

Discuss-phase'in araştırmaya bıraktığı soru: bu cloud devcontainer'da runtime-tarayıcı+WebGL katmanı (S3 sayfa-boyu nabız) çalışabilir mi, yoksa Faz 13 gibi build-ground-truth'a mı düşülür? **Bu oturumda uçtan uca ölçülerek çözüldü:**

| Yetenek | Sonuç | Kanıt |
|---------|-------|-------|
| `next build` + `next start` | ✅ **Kararlı çalışıyor** (Faz 13'ten farklı) | Ready in 593ms, port 3000 dinledi, 12s+ hayatta; curl 200. Faz 13'teki spontane `exit 144` **bu oturumda görülmedi** (144 yalnız benim `pkill`'imden geldi). |
| System Chrome + WebGL2 | ✅ **Çalışıyor** | `channel:'chrome'` + `--enable-unsafe-swiftshader` → WebGL2 (SwiftShader/ANGLE Vulkan); LivingFlow **gerçek canvas** render etti (1×, 1280×720). |
| Bundled chromium + WebGL | ❌ **Yok** (beklenen) | `getContext('webgl2')=null`, LivingFlow **0 canvas** (static'e düştü). Memory `playwright-bundled-chromium-webgl-yok.md` birebir doğrulandı. |
| Vitest seed suite | ✅ 39/39 yeşil | 5 dosya (seo-redirects, seo-metadata, i18n-parity, smoke, umami-script), 1.03s. |
| HTTP/redirect katmanı | ✅ Canlı doğru | `/`→200, `/crew-os`→200, `/bunker-os`→308→`/crew-os`, `/en/bunker-os`→308→`/en/crew-os`, `/forum`→308→`/`. |
| Lighthouse | ✅ Mevcut (npx-cache **12.8.2**) | Memory 13.3.0 kaydeder → **sürüm deltası var**; LCP-element audit anahtarı 12.x'te farklı olabilir (`largest-contentful-paint-element` vs 13.x `lcp-breakdown-insight`) — plan-phase perf task'ında anahtar teyit edilir. Perf **skoru** / CLS / a11y skoru guardrail re-teyidi sürümden bağımsız. |

**Sonuç:** S3'ün runtime-tarayıcı+WebGL katmanı **bu ortamda koşulabilir** (Faz 13'ün kötümser notu bu oturumda geçerli değil) — build-ground-truth'a mecburi düşüş **yok**. Yine de imza-WebGL doğrulaması **yalnız system Chrome** ile yapılır (bundled chromium WebGL vermez → S3'te yanlış-static).

### Değerlendirilen Yaklaşımlar (senaryo doğrulama katmanları)

- **A) Build-ground-truth katmanı** (curl + `routes-manifest.json` + prerender `.next/server/app/*.html` + Vitest 39-tohum): Deterministik, ortam-bağımsız, her koşuda çalışır. Runtime JS/WebGL/etkileşim **egzersiz etmez**. → S1 (route/redirect matrisi), S5/S6 (taksonomi/parite — görünür metin & `MISSING_MESSAGE`), S8 (`seo-*` tohumları), S9 (`next build` temiz + 0 MISSING_MESSAGE).
- **B) Runtime — bundled chromium (`test:e2e` config zemini)**: `playwright.config.ts` webServer'ı `build && start` koşar (Desktop Chrome device). CI-parite, axe a11y için yeterli. **WebGL YOK** → S3 sayfa-boyu nabzı doğrulayamaz, LivingFlow static görünür. → S8 a11y=100 axe re-teyidi (home + subpages spec'leri), klavye/DOM etkileşimi (S4 WebGL-bağımsız kısmı).
- **C) Runtime — standalone Playwright + system Chrome** (`channel:'chrome'`, `--enable-unsafe-swiftshader`, `--disable-dev-shm-usage`): Gerçek WebGL (bu oturumda kanıtlı). Manuel harness gerekir; software-GL perf'i şişirir (ortamlar-arası kıyaslanamaz; LCP/FCP/CLS Lantern-deterministik kıyaslanabilir). → S3 (sayfa-boyu nabız degradasyonu: light/dark FOUC, reduced-motion **tüm sayfa** StaticFlow, mobil-low nabız yok, AR-RTL×dark×reduced, taşma/CLS), S4 (tema/dil kalıcılık + Living Flow uniform), S9-race (hızlı toggle/scroll).
- **Seçilen: Katmanlı/hibrit — her senaryo grubunu onu en sağlam kanıtlayan araca eşle.** Build-ground-truth nerede yeterse orada (deterministik, ILKELER kalıcılık); runtime yalnız gerçekten JS/WebGL/etkileşim gerektiren yerde; WebGL gereken S3'te **system Chrome (C)**, WebGL-gerektirmeyen a11y'de **bundled/config (B)**. Perf/a11y guardrail (S8) Lighthouse çift-tema. Gerekçe: senaryo testi kaynak koda dokunmaz → çoğu senaryo build-ground-truth'ta deterministik kanıtlanır; ortam-bağımlı runtime katmanı yalnız kaçınılmaz yerde.

**S1–S9 → araç eşlemesi (plan-phase task gruplarının iskeleti):**

| Senaryo | Birincil araç (katman) | Not |
|---------|------------------------|-----|
| S1 giriş/redirect matrisi | curl + `routes-manifest` + Vitest `seo-redirects` (A) | çıplak+5-locale twin; `NEXT_LOCALE=tr` cookie TR için |
| S2 TR yolculuğu | system Chrome (C) + prerender HTML (A) | `<Logo>` tutarlılık, `/tr/` sızıntı yok, kopuk link yok |
| S3 mod kombinasyonları (nabız) | **system Chrome (C) — WebGL ŞART** | bundled chromium yanlış-static; reduced-motion tüm sayfa; mobil-low; AR-RTL×dark×reduced |
| S4 kontroller & kalıcılık | system Chrome (C) | tema `html.dark`+localStorage; dil-switcher `router.replace` butonu |
| S5 taksonomi & dürüstlük | prerender HTML grep (A) | "Crew OS" görünür / "Bunker" görünür yüzeyde yok (kod kalıntısı hariç) |
| S6 5-dil bütünlük/non-TR | Vitest `i18n-parity` + prerender ×5 dil (A) | 0 `MISSING_MESSAGE`, namespace `bunker`→`crew` senkron, AR-RTL |
| S7 chatbot 0-token | kod-inceleme + bundled chromium offline UI (A/B) | **0 API çağrısı**; inline `#chat` section; malformed kısa-devre |
| S8 guardrail suite | `test:e2e` axe (B) + Lighthouse çift-tema (C) + Vitest `seo-*` (A) | a11y=100, desktop perf 100/CLS 0, canonical/hreflang |
| S9 adversarial/holistik | `next build` (A) + system Chrome race (C) | JS-kapalı SSG okunabilirlik, hızlı toggle/scroll |

### Kullanılacak Araçlar/Kütüphaneler

- **`next build && next start`** (Next 15.5.19) — prod zemin (Faz 4 a11y ölçüm zemini birebir); bu oturumda kararlı. `stray next-server` PID tuzağına dikkat (listening-PID teyidi).
- **curl** — HTTP status/redirect/`Location` (S1); `--cookie "NEXT_LOCALE=tr"` TR için (Accept-Language auto-locale tuzağı).
- **Vitest 4.1.9** (`npm test`) — 39 tohum: `tests/seo-redirects.test.ts`, `seo-metadata.test.ts`, `i18n-parity.test.ts`, `smoke.test.tsx`, `umami-script.test.tsx` (build-ground-truth; `seo-redirects` `.next/routes-manifest.json` okur → `next build` önce).
- **Playwright `test:e2e`** (bundled chromium, `playwright.config.ts` `build&&start` webServer) — axe a11y regresyon: `tests/e2e/home-a11y.spec.ts`, `subpages-a11y.spec.ts` (S8 axe re-teyit).
- **Standalone Playwright + system Chrome** — `chromium.launch({channel:'chrome', args:['--enable-unsafe-swiftshader','--disable-dev-shm-usage', ...]})` (S3/S4/S9-race; **WebGL için tek yol**).
- **Lighthouse 12.8.2** (npx-cache) + system Chrome — perf/a11y çift-tema (S8 guardrail); `--disable-dev-shm-usage` + `--enable-unsafe-swiftshader` şart (yoksa Living Flow `TARGET_CRASHED`). Software-GL perf şişer.
- **build-ground-truth grep** — `.next/routes-manifest.json` (redirect regex) + `.next/server/app/**/*.html` (prerender = SSG doğruluğu, S5/S6/S9).

### Dikkat Edilecekler

- **Bundled chromium WebGL vermiyor → S3 yalnız system Chrome.** Bundled ile koşarsan LivingFlow her zaman static'e düşer → "sayfa-boyu nabız" **doğrulanamaz** (yanlış-yeşil değil, ayırt-edici değil). WebGL-bağımlı degradasyona **ayırt-edicilik sanity** ekle (full-motion+WebGL→canvas var). Kaynak: memory `playwright-bundled-chromium-webgl-yok.md`.
- **`/dev/shm` = 64M (küçük)** → tüm Chrome/Lighthouse çağrılarında `--disable-dev-shm-usage` **zorunlu** (yoksa renderer çöker). Kaynak: bu oturum probe.
- **`next start` bu oturumda kararlı ama garanti değil.** Faz 13'te `exit 144` spontane görülmüştü; burada görülmedi. Runtime katmanı yine de ortam-bağımlı — plan-phase her runtime task'ına build-ground-truth **fallback** yazsın (S3 hariç — o WebGL zorunlu, fallback prerender canvas-yokluğunu ayırt edemez).
- **Locale tuzağı:** TR (prefixsiz `/`) tarayıcıda `Accept-Language` ile `/en`'e sapabilir → `NEXT_LOCALE=tr` cookie şart; EN/AR/DE/ES açık-prefixli. curl header göndermez (sapmaz). Kaynak: memory locale tuzağı.
- **Tema tuzağı:** proje `html.dark` class + CSS-değişken flip (prefers-color-scheme DEĞİL) → `emulateMedia({colorScheme})` **çevirmez**; tema-toggle butonu/localStorage üzerinden çevir. Light+dark **iki koşu** (dark-panel kontrast inversiyonu). Kaynak: memory a11y-ölçüm-tema-tuzağı.
- **Reveal tuzağı:** `reducedMotion:'reduce'` + scroll (full-motion'da reveal `opacity:0` atlanır, a11y/kontrast yanlış ölçülür).
- **Selector teyidi:** LanguageSwitcher `<a href>` değil `router.replace` **butonu**; Chatbot floating değil inline `#chat` section. Harness "FAIL" → önce artefakt mı diye sor. Kaynak: memory `runtime-harness-selector-teyidi.md`.
- **Perf ölçümü:** her koşudan önce `cat /proc/loadavg` (bu oturum ~1.3, düşük ✓); software-GL perf ortamlar-arası kıyaslanamaz, LCP/FCP/CLS Lantern-deterministik kıyaslanabilir; regresyon karşılaştırmasında **aynı locale + aynı ortam**. Kaynak: memory Lantern körlüğü + host-yükü disiplini.
- **Precondition tanımlayıcıları (kaynak işaretli — plan/verify-plan besler):**
  - Test scriptleri `npm test` / `npm run test:e2e` — **repoda-tanımlı** (`package.json` scripts).
  - Tohum test dosyaları `tests/seo-redirects.test.ts`·`seo-metadata.test.ts`·`i18n-parity.test.ts`·`e2e/home-a11y.spec.ts`·`e2e/subpages-a11y.spec.ts` — **repoda-tanımlı**.
  - `routes-manifest.json` — **build çıktısı** (`.next/`, her `next build`'de üretilir; `seo-redirects` testi buna dayanır).
  - Redirect kaynakları `/bunker-os`→`/crew-os`, `/forum`→`/`, `/forum/:slug*`→`/bulten/:slug*` + 5-locale twin'leri — **repoda-tanımlı** ([next.config.ts:27-48](next.config.ts#L27-L48)).
  - Canonical/hreflang helper `localePath` + `localizedAlternates` — **repoda-tanımlı** ([src/i18n/metadata.ts:17](src/i18n/metadata.ts#L17), [:30](src/i18n/metadata.ts#L30)).
  - 5 alt sayfa route'ları `/crew-os`·`/spor-salonu-yazilimi`·`/vaka-calismalari`·`/bulten/ai-sdr-araclari`·`/bulten/claude-opus-4-8-fable-5` — **repoda-tanımlı** (`src/app/[locale]/…` teyitli).
  - `ANTHROPIC_API_KEY` yokluğu → chatbot offline (S7 0-token) — **dış/env** (bu ortamda tanımsız; değer asla yazılmaz).

### Teknik Kararlar

- **S3 metodoloji riski ÇÖZÜLDÜ (build-ground-truth fallback'e mecburi düşüş yok).** Runtime-tarayıcı+WebGL bu ortamda system Chrome ile koşulabilir (ampirik). Gerekçe: discuss-phase bu kararı research'e bıraktı; ölçüldü, kanıtlandı.
- **WebGL doğrulaması yalnız system Chrome (`channel:'chrome'`+swiftshader); a11y/axe bundled chromium (config).** İki motor iki amaç: WebGL egzersizi vs CI-parite a11y. Gerekçe: bundled WebGL vermez, config zemini a11y için mühürlü.
- **Katmanlı hibrit doğrulama: build-ground-truth öncelikli, runtime yalnız kaçınılmazda.** Senaryo testi kaynak-değişmez → çoğu senaryo deterministik build-ground-truth'ta; ortam-bağımlı runtime en aza indirilir. Gerekçe: ILKELER kalıcılık + Faz 13 ortam dersi.
- **Milestone "ölç + kaydet + karar ver" (geçiş peşinen varsayılmaz).** Faz 2/3/8/9 dersi; runtime katmanı ortam-bağımlı kaldığı için özellikle geçerli.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 14` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

> **Yapı (Faz 9 emsali):** S1–S9 senaryo grupları → 9 task; build-ground-truth katmanı önce (deterministik) → runtime katmanı (system Chrome/WebGL) → adversarial en son. Sıra = kanonik prod-serve kurulumu (14.01) → deterministik grep/suite → runtime → holistik. Doğrulama fazı: kaynak kod değişmez (kapsam-içi bug → reaktif düzeltme task'ı istisnası).

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 14.01 | TASK-14.01 | ✅ Tamamlandı | S1 — giriş/yönlendirme matrisi (curl + routes-manifest, katman A): 6 sayfa × 5 locale 200; `/crew-os` yeni public, `/bunker-os`→`/crew-os` 308 (çıplak+5-locale twin), `/forum`→`/` 308, `/forum/:slug*`→`/bulten/:slug*` 308; kanonik prod-serve kurar. **Bulgu: 30/30 route 200 (lang+AR-rtl doğru); tüm redirect'ler 308 doğru hedef+5-twin; kapsam-içi bug YOK. Sahipli kayıt: çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale→404 (beklenen).** |
| 14.02 | TASK-14.02 | ✅ Tamamlandı | S5 + S6-render (prerender grep, katman A): "Crew OS" görünür / "Bunker" görünür metin+URL'de yok; yasak metafor/sahte-online yok; 30 sayfa-locale 0 MISSING_MESSAGE; namespace crew senkron; AR-RTL; bilinçli-stale non-TR görünür kopukluk yok. **Bulgu: "Crew OS" home×7+crew-os×5 (5 dil); "Bunker" görünür 0 (yalnız `#bunker` kod-adı anchor); yasak metafor 0; sahte-online yok (Alpfit dürüst gösterge meşru); 30/30 0 MISSING_MESSAGE; AR dir=rtl+glif; namespace crew senkron; `/tr/` sızıntı 0. Kapsam-içi bug YOK. Sahipli kayıt: ar/de/es 4 alt sayfa İngilizce-stale (tutarlı, kopukluk yok → prd-review B).** |
| 14.03 | TASK-14.03 | ✅ Tamamlandı | S8-suite + S6-parite (katman A/B): Vitest 39 (i18n-parite + seo-metadata/seo-redirects Faz-13 + smoke/umami) + `test:e2e` axe (home+subpages WCAG-AA 0) + CI `fast`+`a11y` success. **Bulgu: taze build temiz; Vitest 39/39 (parite 5 + seo-metadata 16 + seo-redirects 16 + smoke 1 + umami 1); `test:e2e` 52 passed (home 2 + subpages 50, WCAG-AA 0 ihlal, retries:0); CI run 28675346650 fast+a11y success. Kapsam-içi bug YOK. Lighthouse a11y=100 skor gate'i AYRI → 14.04.** |
| 14.04 | TASK-14.04 | ✅ Tamamlandı | S8-Lighthouse (katman C): a11y=100 çift-tema 6 sayfa × light/dark + Living Flow sayfa-boyu nabız perf tabanı (desktop 100/CLS 0) + perf korunan taban; LH LCP-anahtar teyit; ölç+kaydet+karar. **Bulgu: LH dark 6/6 a11y=100 (0 düşen structural audit, bülten `<main>` var) + standalone axe light+dark 12/12 koşu 0 LH-ilgili ihlal (0 tema-uyumsuzluk) → a11y=100 çift-tema mühürlü. Masaüstü full-motion perf 100/LCP 624ms/CLS 0 = Faz 12 birebir (nabız imzası regresyonsuz); mobil LCP ~3010ms ≤ korunan taban 3164-3171ms/CLS 0 (Lantern-deterministik regresyonsuz), perf 66/TBT ~2000ms software-GL env-anomali kıyaslanmadı. Kapsam-içi bug YOK. Sahipli: brief mobil perf açığı (rep-env ~90/LCP >2.5s) → prd-review B (CPU-bound WebGL gerçek-cihaz duvarı). LH 13.3.0 seçildi (12.8.2 de vardı; Faz 12 tabanı 13.3.0). Kaynak değişmedi, yeni artefakt yok (9.04 emsali).** |
| 14.05 | TASK-14.05 | ✅ Tamamlandı | S3 — mod kombinasyonları / **sayfa-boyu nabız (EN BÜYÜK v0.3 delta)** (system Chrome WebGL2=true). **Bulgu: 9/9 PASS, kapsam-içi bug YOK.** high/desktop → pageLevel canvas=1 (FlowBackdrop fixed, Hero high'da canvas render etmez) + FOUC yok light&dark (early===final); reduced-motion → canvas=0 scroll öncesi+sonrası (nabız **tüm sayfa** düşer, sızıntı yok); no-WebGL → canvas=0 static; **mobil-low → pageLevel=0 (hero-contained canvas=1) → nabız desktop-only korundu**; AR-RTL×dark×reduced → rtl+dark+static+lang=ar çakışmadı; 320/768/1440 → overflowX=0 + **CLS=0.0000**. Craft (scroll-screenshot light+dark): hero-ötesi metin net, `--flow-veil` (light 70%/dark 56%) washi metni kazandırıyor, nabız breathing-zone'da görünür. N/A: alt sayfa nabzı desktop-home-only (kapsam-dışı, regresyonsuz). |
| 14.06 | TASK-14.06 | ✅ Tamamlandı | S4 — kontroller & kalıcılık (system Chrome WebGL2=true). **Bulgu: 10/10 PASS, kapsam-içi bug YOK.** Tema toggle → `html.dark`+localStorage(`dark`)+bg flip (`rgb(247,246,241)`→`rgb(19,21,16)`)+aria-pressed; reload kalıcı+FOUC yok (early===final===true, pre-paint blocking `<head>`); Living Flow uniform sayfa-boyu **remount YOK** (canvas damga sağ, 1→1, fixed 1280×800 viewport, MutationObserver renk çevirir); dil-switcher path korur: home→DE=`/de`, **`/crew-os`→EN=`/en/crew-os` (eski `/bunker-os` DEĞİL — v0.3 kritik ✓)**, `/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`; menü kapanış Escape/dış-tık/klavye; focus-visible **yeşil outline** light `#1f7a3d` + dark `#4fb06a`, 12/12 odak yeşil/2px, odak kaybı yok. İlk-koşu S4.1c FAIL = harness artefaktı (`addInitScript` documentElement null → `waitUntil:'commit'`e çevrildi), gerçek-bug değil. |
| 14.07 | TASK-14.07 | ✅ Tamamlandı | S2 — tam TR yolculuğu (system Chrome, cookie tr). **Bulgu: 15/15 PASS, kapsam-içi bug YOK.** Bölüm sırası `top>how>sectors>bunker>forum>contact` birebir + boş bölüm yok; anchor settle Lenis ilk-denemede (#how/#sectors/#bunker/#forum top≈8-11px, #contact footer görünür top=692); 5 çıkış href mevcut + **`/bunker-os` href sızıntısı YOK (v0.3 kritik ✓)** + `/tr/`-sızıntı/dead-# YOK + `/crew-os` doğrudan 200; 4 alt sayfa client-nav **SPA-marker survive** (`<Link>`, full-reload yok) → tek `<main>`/0 MISSING/textLen 1160-2764 → **history-back ana sayfa sağlam**; `<Logo>` home+crew+gym header'da tutarlı (ortak bileşen). Anchor artefaktı görülmedi. |
| 14.08 | TASK-14.08 | ⬜ Bekliyor | S7 — chatbot 0-token (kod-inceleme + bundled offline): key-yok offline UI (sahte-dot yok) + sanitizasyon + malformed kısa-devre (400/503 Anthropic öncesi); **toplam API çağrısı=0** |
| 14.09 | TASK-14.09 | ⬜ Bekliyor | S9 — adversarial/holistik (`next build` A + system Chrome race C): JS-kapalı SSG okunur, hızlı tema/dil toggle race, hızlı scroll/anchor storm (**sayfa-boyu nabız + ScrollTrigger kararlılığı**), build temiz + 0 MISSING_MESSAGE |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 14` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 14` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 14` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Yerelleştirme & RTL | ✅ / ⚠️ / ❌ | ... |
| Modülerlik & Bakım | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi & Degradasyon | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-03 (discuss-phase 14)
**Son Güncelleme:** 2026-07-05 — run-task TASK-14.07 ✅: S2 tam TR yolculuğu system Chrome (cookie `NEXT_LOCALE=tr`) ile doğrulandı. Mevcut kanonik build → `next start :3000` (listening-PID 21581 teyit) + standalone Playwright `channel:'chrome'`+swiftshader; anchor 30×100ms poll (Lenis settle, kör-FAIL yok). **15/15 PASS, kapsam-içi bug YOK.** Bölüm sırası `top>how>sectors>bunker>forum>contact` birebir + boş bölüm yok (metin 335-819 char); anchor settle Lenis **ilk-denemede** (#how/#sectors/#bunker/#forum top≈8-11px nav-offset, #contact footer sayfa-sonu görünür top=692); 5 çıkış href mevcut (`/crew-os`+`/spor-salonu-yazilimi`+`/vaka-calismalari`+2 bülten) + **`/bunker-os` href sızıntısı YOK (v0.3 kritik ✓, Faz 11 iç link temizliği tuttu)** + `/tr/`-sızıntı/dead-# YOK (19 href) + `/crew-os` doğrudan 200 (redirect-hop değil); 4 alt sayfa client-nav **SPA-marker survive** (next-intl `<Link>`, full-reload yok) → tek `<main>`/0 MISSING_MESSAGE/textLen 1160-2764 → **history-back → ana sayfa sağlam** (hero/how/forum/contact/nav) her turda; `<Logo>` home+`/crew-os`+`/spor-salonu-yazilimi` header'da wordmark+mark tutarlı (ortak bileşen Nav/PageHeader). Anchor ilk-okuma artefaktı bu koşuda görülmedi. Kaynak değişmedi (doğrulama fazı, harness scratchpad commit'lenmez). Sıradaki adım: run-task (TASK-14.08, S7 chatbot 0-token). Taze prod (`next build` temiz → `next start :3000`, listening-PID 18786 teyit) + standalone Playwright `channel:'chrome'`+swiftshader (SANITY webgl2=true/canvas=1 ayırt-edici) + focus için ayrı `reducedMotion:'reduce'` context. **10/10 PASS, kapsam-içi bug YOK.** Tema toggle → `html.dark`+localStorage(`dark`)+bg flip light`rgb(247,246,241)`→dark`rgb(19,21,16)`+aria-pressed; reload kalıcı + **FOUC yok (early===final===true**, pre-paint blocking `<head>` script hydration'dan önce class ekler); **Living Flow uniform sayfa-boyu remount YOK** (canvas'a damga → toggle sonrası damga sağ, canvas 1→1, FlowBackdrop `position:fixed inset-0` 1280×800 viewport'u kaplar, `FlowCanvas` MutationObserver renk uniform'unu tek context'te çevirir); dil-switcher path korur: home→DE=`/de`, **`/crew-os`→EN=`/en/crew-os` (eski `/bunker-os` DEĞİL — v0.3 kritik ✓)**, `/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`; menü kapanış Escape/dış-tık/klavye (Enter-aç→Esc-kapa) `aria-expanded` true→false; **klavye focus-visible yeşil outline** light `#1f7a3d(31,122,61)` + dark `#4fb06a(79,176,106)`, 12/12 odak yeşil/2px, odak kaybı yok (BODY'ye düşmedi). İlk koşuda S4.1c FAIL = **harness artefaktı** (memory disiplini: `addInitScript` document_start'ta `documentElement` null → `MutationObserver.observe` fırlıyor; `waitUntil:'commit'` hydration-öncesi okumaya çevrildi → early===final PASS), gerçek-bug değil. Kaynak değişmedi (doğrulama fazı, harness scratchpad commit'lenmez). Sıradaki adım: run-task (TASK-14.07, S2 tam TR yolculuğu). Taze prod (`next build` temiz → `next start :3000`, listening-PID teyit) + standalone Playwright `channel:'chrome'`+swiftshader. **WebGL2=true (ayırt-edici, bundled değil). 9/9 senaryo PASS, kapsam-içi bug YOK.** high/desktop → **pageLevel canvas=1** (FlowBackdrop `position:fixed`; Hero `LivingFlow` high'da canvas render etmez, tek WebGL context) + FOUC yok light&dark (pre-paint inline script → early===final); reduced-motion → **canvas=0 scroll öncesi ve %60-scroll sonrası** (nabız **tüm sayfa** StaticFlow'a düşer, hero-ötesi sızıntı yok — v0.3-kritik); no-WebGL (getContext shim) → canvas=0 static; **mobil-low (390) → pageLevel=0, heroCanvas=1** (hero-contained low) → sayfa-boyu nabız mobile taşmıyor, Faz 12 desktop-home-only korundu; AR-RTL×dark×reduced → dir=rtl+dark+static+lang=ar üçü çakışmadı; 320/768/1440 → **overflowX=0px + CLS=0.0000** (scroll-storm sonrası). Craft (görsel son hakem, light+dark scroll-screenshot): hero-ötesi HowItWorks+SectorSolutions metni net/okunabilir, `--flow-veil` (light 70%/dark 56%) washi metni her zaman kazandırıyor (light-bleed yok), yeşil nabız breathing-zone'da görünür → sayfa-boyu nabız imzası + veil okunabilirlik çözümü çalışıyor. Kaynak değişmedi (doğrulama fazı, harness scratchpad commit'lenmez). N/A sahipli: alt sayfa nabzı desktop-home-only (kapsam-dışı, regresyonsuz); perf/TBT software-GL env-anomali (kıyaslanmadı, 14.04 emsali). Sıradaki adım: run-task (TASK-14.06, S4 kontroller & kalıcılık).
