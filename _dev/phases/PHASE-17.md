# Phase 17: v0.4 Versiyon-Sonu Senaryo Testi (ana sayfa + 5 alt sayfa uçtan-uca)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-17-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.4'ün (Alpfit Plus ürün vitrini içerik fazı — Faz 15 + versiyon-sonu teknik borç/TR release — Faz 16) versiyon-sonu **Senaryo Testi** fazı — zorunlu `prd-review` öncesi son kapı. v0.4 içerik ve teknik borç fazlarının **task/faz-seviyesi** UAT'larının göremediği **dikişleri, tam kullanıcı yolculuklarını, mod kombinasyonlarını ve adversarial durumları** uçtan-uca doğrular. **v0.4 zaten CANLI** (`main` = `f173234`) → bu bir "test-what's-live" **literal** doğrulamasıdır (v0.4 release Faz 16'da öne çekildi). İş **doğrulama**: yeni içerik/feature üretilmez. Kapsam-içi (ana sayfa veya 5 alt sayfa) gerçek bug çıkarsa düzeltme task'ı olur; kapsam-dışı / zaten-ertelenmiş kalemler kaydedilip yönlendirilir.

**v0.4'ün Faz 14'ten (v0.3 senaryo testi) deltası — asıl yeni doğrulanacak yüzey:**
- **Faz 15 — Alpfit Plus ürün vitrini (asıl delta, TEK sayfa):** `/spor-salonu-yazilimi` eski gym showcase'ten **9-bölümlü zengin ürün landing**'e yeniden tasarlandı (Hero/before-after · Sorun · 4 Rol · Mobil mockup'lar · 9 Özellik · Neden · Fiyat · Yol haritası+Store · Kapanış). `components/alpfit/` 8 bileşen + **saf CSS/SVG PhoneMockups** (raster görsel yok, `next/image` bu sayfadan düştü) + tek `--color-surface` token + **`alpfit` 5-dil 133-leaf namespace** (TR birincil, non-TR stale-TR). İmza Living Flow korunur (before/after sağ sütun); **dürüstlük 4/4 gerçek** (pilot adı, fiyatlar, Store=yol-haritası kalemi); mailto CTA; route korunur.
- **Faz 16 — versiyon-sonu teknik borç + TR release:** gym PNG disk hijyeni (branch'te tamam, **main'e unmerged**) + npm audit (kabul+kayıt, sömürülemez) + **v0.4 TR production release** (canlı `f173234`).
- **Test-what's-live:** v0.4 TR canlıda → branch/build doğrulama + hafif canlı duman katmanı (kiwiailab.com).

**Diğer 5 sayfa (ana sayfa + `/crew-os` + 3 alt sayfa) v0.4'te HİÇ değişmedi** — delta tümüyle Alpfit sayfasında; onlar için senaryo testi = yolculuk-içi tutarlılık + guardrail regresyon re-teyidi.

**Kapsam sınırı (kullanıcı kararı 2026-07-17):** ana sayfa + 5 alt sayfa uçtan-uca — Faz 14 çıtası korunur. 5 alt sayfa: `/crew-os`, `/spor-salonu-yazilimi` (yeni Alpfit Plus), `/vaka-calismalari`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`.

**Milestone:** *(Faz 2/3/8/9/14 dersi uygulandı: versiyon-sonu doğrulama milestone'u "ölç + kaydet + karar ver" olarak yazılır — geçiş peşinen varsayılmaz.)*
1. Ana sayfa + 5 alt sayfa uçtan-uca senaryo kataloğu (S1–S9) otonom koşuldu;
2. her senaryonun sonucu (geçti / bulgu) kayıt altına alındı;
3. bulgular **triyaj** edildi — kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug'lar düzeltme task'ına, kapsam-dışı / ertelenmiş kalemler sahipli kayda;
4. **TR yolculuğu birincil** olarak bütünsel-tutarlı doğrulandı (ana sayfa + alt sayfalara çıkış/dönüş, **özellikle yeni Alpfit Plus sayfasına çıkış/dönüş**) + **non-TR yüzeyleri tutarlı** (parite / render bütünlüğü / AR-RTL aynalama; `alpfit` stale-TR ve diğer bilinçli-stale değerler görünür kopukluk yaratmıyor);
5. **v0.4 kazanım guardrail'leri regresyonsuz teyit edildi** — a11y=100 çift-tema (home + 5 alt sayfa, **Alpfit Plus dahil**) + axe suite yeşil · **Alpfit CSS/SVG PhoneMockups + 9 bölüm SSG'de tam render** (kırık görsel/eksik bölüm yok) · **`alpfit` 133-leaf 5-dil parite** (0 `MISSING_MESSAGE`) · Living Flow imzası (before/after + ana sayfa nabız) degradasyonlu · perf korunan taban (masaüstü 100, mobil LCP taban içinde, CLS≈0) · i18n 5-dil parite · CI (`fast`+`a11y`) yeşil · **canlı v0.4 duman ✓** (kiwiailab.com anahtar sayfalar 200 + Alpfit Plus marker'ları).

### Feature Listesi

(Senaryo testi çapraz/doğrulama fazıdır — "feature" değil **senaryo grupları (validation units)**; her grup tetiklediği birincil modüle eşlenir. MODULE-MAP `— v0.4 …` iş birimleri (Faz 15/16) + M1–M6 referansı.)

| Senaryo Grubu | Modül | Açıklama |
|---------------|-------|----------|
| S1: Giriş noktaları & yönlendirme matrisi | M4 (+M6) | 6 sayfa × 5 dil route'ları (TR prefixsiz + /en /ar /de /es); redirect matrisi (`/bunker-os`→`/crew-os` 308 çıplak+5-locale, `/forum`→`/` 308, `/forum/:slug*`→`/bulten/:slug*` 308) — **v0.4 dokunmadı → regresyon re-teyidi**; bilinmeyen-locale, derin-link |
| S2: Tam TR yolculuğu — ana sayfa → alt sayfalar | M2 (+M3) | Hero → ikincil CTA → sektörler (**Alpfit çıkışı → yeni Alpfit Plus sayfası**) → 4-adım → Crew OS (`/crew-os`) → Forum → Footer; ana sayfadan alt sayfalara çıkış/dönüş → içerik bütünlüğü; `<Logo>` her yüzeyde tutarlı; CTA/nav doğru, kopuk link/`/tr/`-sızıntı/boş bölüm yok |
| S3: Mod kombinasyonları (Living Flow degradasyon) | M1 (+M3) | Ana sayfa **sayfa-boyu nabız** (light/dark FOUC yok, reduced-motion tüm sayfa StaticFlow, no-WebGL, mobil-low desktop-only, AR-RTL×dark×reduced) + **Alpfit sayfası before/after Living Flow** degradasyonlu; 320/768/1440 taşma yok + near-zero CLS — **v0.4 nabza dokunmadı → re-teyit; yeni yüzey = Alpfit before/after** |
| S4: Kontroller & kalıcılık | M3 (+M1/M4) | tema toggle (localStorage + reload kalıcılık + Living Flow uniform), dil-switcher path koru (**Alpfit `/spor-salonu-yazilimi` dahil**, klavye/Escape/dış-tık), klavye-only yolculuk + focus-visible |
| S5: Taksonomi & dürüstlük tutarlılığı (çapraz/sahipsiz) | M2 (+M4) | "Crew OS" her yüzeyde / "Bunker" hiçbir görünür yüzeyde+URL'de yok (kod-adı kalıntısı hariç); **Alpfit dürüstlük 4/4 gerçek** (pilot adı, fiyatlar, yol-haritası/Store dürüst çerçeve, **sahte "● online" yok** — gerçek-canlı ürün dürüst göstergesi meşru); render'da uydurma sonuç / yasak metafor yok |
| S6: 5-dil bütünlük & non-TR tutarlılığı (versiyon-sonu çekirdek) | M4 (+M2) | parite (Vitest yeşil, eksik anahtar=fail), render `MISSING_MESSAGE` yok (6 sayfa × 5 dil), **`alpfit` 133-leaf namespace 5-dil senkron** (yapısal tam), **non-TR alpfit stale-TR görünür kopukluk yok** (v0.4 yeni delta), AR-RTL aynalama |
| S7: Chatbot (0-token: offline + sanitizasyon) | M5 | key-yok offline UI (sahte-online yok) + sanitizasyon kod-inceleme (`new Anthropic()` öncesi) + malformed-input kısa-devre + stream-kopması UI takılmaz; **toplam API çağrısı = 0**. *(v0.4 chat'e dokunmadı → regresyon riski yok; canlı env yok → zaten offline; versiyon-sonu bütünsellik + 0 maliyet için Faz 14 paritesinde korunur)* |
| S8: v0.4 kazanım guardrail'leri (çapraz — suite koşu) | tümü | a11y=100 çift-tema (home + 5 alt sayfa Lighthouse, **Alpfit dahil**) + axe `test:e2e` yeşil · **Alpfit CSS/SVG PhoneMockups + 9 bölüm render bütünlüğü** (prerender grep) · **`alpfit` parite** + `seo-*` tohumları · Living Flow desktop perf 100/CLS 0 + kontrast=100 çift-tema · perf korunan taban (mobil LCP taban içinde, CLS≈0) · CI (`fast`+`a11y`) yeşil |
| S9: Adversarial / holistik + canlı duman | tümü | JS-kapalı SSG okunabilirlik (**Alpfit dahil** — saf CSS/SVG bölümler no-JS okunur mu), hızlı dil/tema toggle race, hızlı scroll/anchor zıplama (nabız + ScrollTrigger kararlılığı), `next build` temiz + 0 MISSING_MESSAGE (regresyon tabanı); **canlı duman** (kiwiailab.com anahtar sayfalar 200 + Alpfit Plus v0.4 marker'ları — test-what's-live) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 17` oturumunda dolduruldu (2026-07-17). Versiyon-sonu tespiti (Adım 0b): Versiyon Sonu Durumu `senaryo_testi` (review-phase 16 `teknik_borç`→`senaryo_testi` damgaladı); Faz 17 (senaryo testi) PHASES.md tablosunda yoktu → senaryo testi fazına girildi. Bu, v0.4'ün zorunlu `prd-review` öncesi uçtan-uca doğrulamasıdır.

### Alınan Kararlar

- **Faz tipi = v0.4 versiyon-sonu Senaryo Testi (sabit faz).** Doğrulama fazı — yeni feature üretilmez; çekirdek soru: task/faz-UAT'larının göremediği dikiş/yolculuk/çapraz/adversarial katmanda v0.4 tutarlı mı. Faz 3 (v0.1) / Faz 9 (v0.2) / Faz 14 (v0.3) modeli; S1–S9 iskeleti v0.4'ün deltasına (Alpfit Plus tek-sayfa yeniden tasarım + test-what's-live) uyarlandı.
- **Kapsam sınırı = ana sayfa + 5 alt sayfa uçtan-uca** (kullanıcı kararı 2026-07-17). Faz 14 çıtası korunur. Gerekçe: v0.4 deltası tek sayfada (Alpfit Plus) yoğunlaşsa da versiyon-sonu kapısı bütünsel olmalı; araç yeniden-kullanılır (çoğu deterministik build-ground-truth), maliyet düşük; v0.4 **canlı** → canlı yüzey re-teyidi "test-what's-live" ile hizalı; uzun-ömürlü amiral vitrin ufku (ILKELER) thoroughness'ı destekler. **a11y-DERİNLİK Faz 8/15'te yapıldı, tekrar edilmez** — senaryo testi yalnız yolculuk-içi tutarlılığı + v0.4 guardrail re-teyidini doğrular (a11y=100 çift-tema re-teyidi S8 guardrail'inde, yeni denetim değil).
- **Canlı katman = branch/build + hafif canlı duman** (kullanıcı kararı 2026-07-17). Ana doğrulama branch/build'de (build-ground-truth, deterministik); ayrıca kiwiailab.com'da hafif canlı duman (anahtar sayfalar 200 + Alpfit Plus v0.4 marker'ları). Gerekçe: v0.4 canlıda (`main`=`f173234`) → "test-what's-live" fırsatı kullanılır. (Faz 16 UAT senaryo 7'de bir kez yapıldı; versiyon-sonu re-teyit hafif katman, tam yeniden ölçüm değil.)
- **TR birincil öncelik** (pre-fill onaylandı, yerleşik desen). TR yolculuğu derin/bütünsel doğrulanır (ana sayfa + alt sayfalara çıkış/dönüş, **özellikle yeni Alpfit Plus sayfasına**); non-TR (EN/AR/DE/ES) yalnız **tutarlılık** katmanında (parite + render bütünlüğü + AR-RTL aynalama) — içerik-kalite derin denetimi DEĞİL. "Bilinçli-stale non-TR (özellikle `alpfit` namespace) görünür kopukluk yaratıyor mu?" in-scope; stale içeriğin *kalitesi* out-of-scope (versiyon-sınırına ertelendi — ILKELER "TR tek kaynak", DECISIONS 2026-06-27 dil stratejisi).
- **Chatbot = 0-token (offline + sanitizasyon), S7 korunur** (pre-fill onaylandı). v0.4 chat koduna **hiç dokunmadı** → regresyon riski yok; canlı `ANTHROPIC_API_KEY` env yok → zaten offline. Versiyon-sonu bütünsellik + 0 API maliyeti için Faz 14 paritesinde S7 korunur: key-yok zarif offline yolu + girdi sanitizasyonu kod-incelemesi + malformed-input kısa-devre. **Sıfır API çağrısı** (Faz 3/9/14 deseni birebir).
- **Bulgu politikası = keşfet + kaydet + triyaj** (pre-fill onaylandı). Kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug → bu fazda düzeltme task'ı. Kapsam-dışı veya zaten-ertelenmiş → sahipli kayıt + yönlendirme, burada yeniden açılmaz.
- **Test modu = otonom** (pre-fill onaylandı). Gerçek test altyapısı var (Faz 5/8/13/15): `test:e2e` (Playwright+axe), Vitest (parite + `alpfit` + `seo-*` tohumları), CI, Lighthouse çift-tema + curl/grep/`page.route`-interception runtime. Milestone "ölç + kaydet + karar ver" (geçiş peşinen varsayılmaz).
- **Senaryo kataloğu (S1–S9) yeterli** (kullanıcı kararı 2026-07-17: "katalog yeterli, devam"). v0.4 delta odağı (Alpfit Plus 9 bölüm + namespace parite + before/after Living Flow + dürüstlük 4/4) doğru; ek persona/kırılma-noktası eklenmedi. S1–S9 iskeleti onaylandı.

### Kullanıcı Tercihleri

- **Ana sayfa + 5 alt sayfa uçtan-uca (tam)** (2026-07-17): Faz 14 çıtası; v0.4 deltası tek sayfada (Alpfit Plus) ama versiyon-sonu kapısı bütünsel + canlı yüzey re-teyidi.
- **Branch/build + canlı duman** (2026-07-17): build-ground-truth ana katman + kiwiailab.com hafif canlı duman (test-what's-live, v0.4 canlıda).
- **Senaryo kataloğu S1–S9 yeterli** (2026-07-17): "devam"; ek senaryo yok, katalog faz dokümanına yazıldı.

### Sahipsiz Alan & Çapraz Konular

- **Alpfit Plus sayfası asıl yeni doğrulanacak yüzey.** Faz 14'te bu route hâlâ eski gym showcase'ti; Faz 15 zengin ürün landing'ine yeniden tasarladı. Asıl bilinmeyen: 9 bölüm SSG'de tam render mi (eksik bölüm yok), **saf CSS/SVG PhoneMockups** kırık görsel/eksik olmadan render mi (raster yok → `next/image` bu sayfadan düştü), before/after Living Flow degradasyonlu mu, **dürüstlük 4/4** (pilot/fiyat/yol-haritası/Store dürüst çerçeve, sahte-online yok), mailto CTA doğru mu (form yok), route `/spor-salonu-yazilimi` korunuyor mu, `alpfit` 133-leaf namespace 5-dil parite (0 MISSING) + non-TR stale-TR görünür kopukluk yok.
- **Test-what's-live: v0.4 canlıda → canlı duman fırsatı.** v0.4 TR production'da (`f173234`) → senaryo testi Alpfit Plus deltasını hem branch/build'de hem canlıda doğrular. Canlı katman hafif tutulur (anahtar sayfalar 200 + v0.4 marker); tam ölçüm branch/build'de.
- **branch→main merge (gym PNG silme) versiyon-sonu finalizasyonun parçası.** TASK-16.01 silme `revize/v0.4-versiyon-sonu`'da, main'e unmerged. Canlıdaki orphan PNG'ler 0 tüketici (SEO/işlev etkisi yok). Merge bu fazın **doğrulama** kapsamı dışı — versiyon-sonu finalizasyonda (prd-review ile/sonra) yapılır (sahipli kayıt, Kapsam Dışı).
- **v0.4 guardrail'lerinin yolculuk-içi tutarlılığı (S8).** a11y=100 statik mühürlü (Faz 4/8/15), Living Flow desktop perf/CLS tabanı mühürlü (Faz 12/14), Alpfit a11y/CLS mühürlü (Faz 15) — ama tema/dil/motion kombinasyonlu tam yolculukta korunuyor mu; suite (`test:e2e` + Vitest + CI) bunun re-teyit aracı.
- **Ölçüm disiplini (memory):** locale tuzağı (alt sayfa TR = prefixsiz → `NEXT_LOCALE=tr` cookie şart, EN/AR/DE/ES açık-prefixli), tema tuzağı (`html.dark` + light+dark iki koşu, dark-panel inversiyonu), reveal tuzağı (`reducedMotion:'reduce'` + scroll), stray/stale `next-server` (listening-PID teyit), host yükü (`/proc/loadavg` perf-bitişik ölçümden önce), WebGL standalone Playwright'te `channel:'chrome'`+swiftshader şart, runtime harness selector-teyidi (LanguageSwitcher `router.replace` butonu / Chatbot inline `#chat` / tema `html.dark`) — research/plan'de teyit.
- **Ortam riski (Faz 14 dersi) — research-phase araç eşlemesinde çözülecek:** Bu cloud devcontainer'da `next start` per-session flaky (spontane `exit 144`); runtime-tarayıcı doğrulaması için **`page.route` interception artık ilk tercih** (`memory/sandbox-runtime-browser-page-route.md`) — `next start` denemeden doğrudan bununla başla. **Alpfit sayfası saf CSS/SVG** → çoğu doğrulama build-ground-truth grep + prerender ile deterministik (WebGL gerektirmez); WebGL yalnız before/after Living Flow + ana sayfa nabız için system Chrome (`channel:'chrome'`+swiftshader).
- **Guardrail:** senaryo testi kaynak koda dokunmaz (doğrulama fazı) → guardrail'ler zaten yeşil olmalı; S8 bunu re-teyit eder. Kapsam-içi bug çıkarsa (düzeltme task'ı) CI a11y job otomatik korur.

### Kapsam Dışı

- **Alpfit Plus TR içerik/fiyat düzenlemesi** — yayınlanan hali korunur (kullanıcı "fena durtmuyor, gerekirse sonra düzeltiriz", Faz 16); senaryo testi içerik editlemez.
- **non-TR (en/ar/de/es) alpfit içerik-kalite derin denetimi** — bilinçli-stale (versiyon-sınırı); yalnız tutarlılık (parite / render / RTL) test edilir. `alpfit` non-TR stale-TR (değer Türkçe) + diğer alt-sayfa non-TR stale → prd-review.
- **branch→main merge (gym PNG silme)** — versiyon-sonu finalizasyon adımı (prd-review ile/sonra); bu faz doğrulama. Canlıda orphan PNG 0 tüketici (etkisiz).
- **Brief mobil perf açığı** (perf ≈90/LCP >2.5s vs ≥95/<2.5s) — kök neden CPU-bound WebGL; nihai doğrulama gerçek-cihaz/Vercel field gerektirir (metodolojik duvar). Senaryo testte çıkarsa kaydedilir, düzeltilmez. DECISIONS 2026-06-30; prd-review'a bağlı.
- **Alt-sayfa PERF optimizasyonu** — bu faz yalnız yolculuk/a11y-guardrail; alt-sayfa perf yalnız **regresyonsuz** tutulur, optimize edilmez.
- **Chatbot canlı `ANTHROPIC_API_KEY` env** — kullanıcı aksiyonu (Vercel dashboard); kod işi değil, kapsam dışı. Env eklenince açılır.
- **App Store/Google Play indirme linki/rozeti + pilot chip güncelleme + yol haritası tazeliği** — sonraki içerik işi (Faz 16 kaydı, "gerekirse sonra düzeltiriz").
- **Kayıtlı sahipli açıklar (record-not-fix, prd-review/gelecek faz):** chatbot per-mesaj max-byte cap yok (min-length + geçmiş-sayısı var) · TB-3 (full-motion test tohumu, WebGL-flaky) · TB-4 (site-geneli logical-ok RTL) · npm audit 2 moderate (Next'e gömülü postcss, sömürülemez build-zamanı — DECISIONS 2026-07-16) · `/bulten` çıplak 404 (kod tabanında link yok + `/forum`→`/` kapıyı kapatır, bilinçli kapsam dışı). Senaryo testte çıkarsa sahipli kayıt, yeniden litige edilmez.
- **Dil setini değiştirme / AR'yi üründen çıkarma** — vizyon/PRD kararı; prd-review'a bırakıldı (vizyon korunur).
- **Kod-adı tanımlayıcıları** (`Bunker.tsx`, `components/bunker-os/`, `nav.bunker`, `#bunker`) — iç kod adı, taksonomi izin veriyor (dokunulmaz); S5 yalnız **render edilen görünür metni/URL'i** denetler, kod kalıntısını değil.
- **Yeni içerik/feature** — senaryo testi doğrulama fazıdır, üretim yapmaz (kapsam-içi bulgu → düzeltme task'ı istisnası hariç).

---

## Araştırma Bulguları

> `/devflow:research-phase 17` (2026-07-17). Bu bir doğrulama fazı → araştırma "kütüphane seçimi" değil **araç eşlemesi + ortam ampirik teyidi**: S1–S9'u hangi somut doğrulama yöntemine bağlıyoruz ve bu oturum onları koşturabiliyor mu. Tüm bulgular bu oturumda ampirik teyit edildi (aşağıda).

### Ortam Ampirik Teyidi (bu oturum)

Faz 14'ün "taze devcontainer, araç yok" riski **bu oturumda geçerli değil** — araç zinciri hazır ve doğrulandı:

- **node v24.16.0 · npm 11.13.0 · Playwright 1.61.1 · Chrome 149 (system) · Chromium 150 · loadavg 3.31 (< ~6 perf eşiği) · 20 çekirdek.** WebGL için system Chrome mevcut.
- **Deterministik katman koşuyor:** `npm run test` → **Vitest 5 dosya / 39 test / exit 0 / 526ms** (yeşil). S1/S6/parite/seo tohumları yerelde çalışır.
- **Build ground-truth mevcut:** `.next/server/app/**/*.html` prerender (5 dil × 6 sayfa) diskte. Redirect matrisi `.next/routes-manifest.json` regex'lerinde.
- **Canlı erişilebilir (test-what's-live):** kiwiailab.com `/` · `/spor-salonu-yazilimi` · `/crew-os` → **200**; canlı Alpfit Plus marker `PhoneMockup` **150×** (branch build prerender'ıyla **birebir aynı** → gym-PNG-silme branch delta'sı Alpfit sayfasını etkilemiyor, test-what's-live tutarlı); `/api/chat` → **503** (env yok, beklenen offline).

### Değerlendirilen Yaklaşımlar (doğrulama substratı)

- **A. Build ground-truth (deterministik) — prerender HTML grep + `routes-manifest.json` + Vitest.** Artı: deterministik, ayrı server yok, sandbox `exit 144` riski yok, hızlı, tekrarlanabilir. Eksi: yalnız statik SSG render'ı görür (runtime davranışı — WebGL degradasyon / toggle kalıcılık / klavye yolu — göremez).
- **B. Runtime tarayıcı — `next start` + Playwright `webServer` (standart `test:e2e`).** Artı: mühürlü CI aracı, gerçek layout/CSS/a11y. Eksi: bu sandbox `next start`/`next dev`'i per-session **`exit 144`** ile öldürebilir (`memory/sandbox-runtime-browser-page-route.md`) → yerelde flaky, güvenilmez.
- **C. Runtime tarayıcı — `page.route` interception + system Chrome.** Artı: ayrı server yok (sandbox öldürmez), `.next` prerender+static'i diskten byte-for-byte servis eder; WebGL için `channel:'chrome'`+`--enable-unsafe-swiftshader`. Eksi: harness proje-içine yazılmalı (scratchpad `playwright`'i çözemez), selector kaynaktan teyit edilmeli.
- **D. Canlı duman (curl).** Artı: test-what's-live (v0.4 canlı `f173234`), gerçek production. Eksi: yalnız HTTP kodu + ham HTML string (runtime davranış değil).
- **Seçilen — katmanlı öncelik:** **A birincil** (senaryoların çoğu build-ground-truth'ta deterministik çözülür); **runtime davranış statik okunamıyorsa C** (`page.route` **ilk tercih**, `next start`/B **denenmez** — memory kuralı); **a11y mührü otoritatif olarak CI'ın `a11y` job'u** (GitHub runner'da `test:e2e`, sandbox'tan bağımsız) — yerelde gerekirse `page.route`+axe ek nokta-kontrolü; **D hafif canlı duman** (anahtar sayfalar 200 + Alpfit marker + chat 503). Gerekçe: ILKELER kalıcılık/thoroughness + sandbox flaklığını tümüyle atlar (memory).

### Senaryo → Araç Eşlemesi (S1–S9)

| Senaryo | Birincil araç | Nasıl |
|---------|---------------|-------|
| **S1** giriş/route/redirect | A: `routes-manifest.json` + `seo-redirects.test.ts` (Vitest) + curl | Redirect 3 ailesi (`/bunker-os`→`/crew-os`, `/forum`→`/`, `/forum/:slug*`→`/bulten/:slug*`) çıplak+locale-twin 308 — tohum mühürlü; 6 sayfa × 5 dil prerender varlığı grep |
| **S2** tam TR yolculuğu | A: prerender grep + C: `page.route` (nav/CTA tık) | TR (`NEXT_LOCALE=tr` cookie) ana→alt çıkış/dönüş; `/tr/` sızıntı yok, kopuk link yok, boş bölüm yok; `<Logo>` tutarlı |
| **S3** Living Flow degradasyon | C: `page.route`+system Chrome (WebGL) | Ana sayfa nabız (light/dark/reduced/no-WebGL/mobil-low/AR-RTL×dark×reduced) + Alpfit before/after; 320/768/1440 taşma + CLS |
| **S4** kontroller & kalıcılık | C: `page.route`+Chrome | Tema toggle (localStorage+reload), dil-switcher path-koru (**Alpfit dahil**), klavye-only + focus-visible (`reducedMotion:'reduce'` şart) |
| **S5** taksonomi & dürüstlük | A: prerender grep | "Crew OS" var / görünür "Bunker" + URL'de yok (kod-adı kalıntısı hariç); Alpfit dürüstlük 4/4; uydurma sonuç/yasak metafor yok |
| **S6** 5-dil bütünlük | A: `i18n-parity.test.ts` (Vitest) + prerender `MISSING_MESSAGE` grep | `alpfit` **133 leaf × 5 dil = tam parite** (teyitli); 6×5 render'da `MISSING_MESSAGE` yok; AR-RTL `dir`/logical |
| **S7** chatbot 0-token | A: kod-inceleme (`route.ts`) + C: offline UI render | 503 kapısı + sanitizasyon `new Anthropic()` **öncesi** (teyitli: role-whitelist + `trim().length>0` + `slice(-12)` + malformed kısa-devre); **0 API çağrısı** |
| **S8** guardrail suite | B→CI: `test:e2e` (a11y job) + A: Vitest + prerender grep | a11y=100 çift-tema (home + 5 alt sayfa, subpages-a11y 50 test mühürlü) + axe yeşil; Alpfit 9-bölüm/PhoneMockups render; parite; CI (`fast`+`a11y`) yeşil |
| **S9** adversarial + canlı duman | A: `next build` temiz + C: JS-off/scroll-race + D: curl canlı | JS-kapalı SSG okunabilirlik (Alpfit saf CSS/SVG); hızlı toggle/scroll race; canlı kiwiailab.com 200 + Alpfit marker |

### Kullanılacak Araçlar/Kütüphaneler

- **Vitest 4.1.9** (`npm run test`) — deterministik tohumlar: `i18n-parity` (S6 parite, `alpfit` dahil), `seo-redirects` (S1), `seo-metadata`, `smoke`, `umami-script`. Yerelde koşuyor (39 test yeşil).
- **Playwright 1.61.1 + @axe-core/playwright 4.12.1** — a11y/E2E. Otoritatif mühür **CI `a11y` job** (`test:e2e`, `home-a11y` + `subpages-a11y` = 50+ test); yerel runtime davranışı için `page.route` harness'i.
- **system Chrome 149** — WebGL runtime (`channel:'chrome'` + `--enable-unsafe-swiftshader` + `--disable-dev-shm-usage`); Playwright-bundled chromium WebGL vermez.
- **`next build`** (CI-proven; verify-phase **taze** koşar) — prerender ground-truth üretimi.
- **curl** — canlı duman (kiwiailab.com 200 + marker), redirect HTTP kodu, chat 503.

### Dikkat Edilecekler

- **Prerender marker'ı = CSS-modül sınıf adı + render edilen metin, React bileşen adı DEĞİL.** `AlpfitHero`/`AlpfitShowcase` gibi bileşen adları HTML'e yazılmaz → S8/S5 render bütünlüğü grep'i `PhoneMockup` (CSS-modül sınıfı, `PhoneMockups.module.css`) + içerik string'leri (`roadmap`/before-after) üzerinden yapılır. (Bu oturumda kanıtlandı: bileşen adı grep'i 0, CSS sınıfı 150×.)
- **`.next` tazeliği:** mevcut `.next` önceki koşudan olabilir → **verify-phase taze `next build` koşar** (HEAD hizası garanti); araştırmadaki `.next` yalnız fizibilite teyidi.
- **`next start` denenmez (memory kuralı):** sandbox `exit 144` → runtime tarayıcı doğrudan `page.route` interception ile başlar; a11y mührü CI'da.
- **Ölçüm disiplini tuzakları (a11y/runtime — `a11y-helpers.ts` + memory):** locale tuzağı (TR alt sayfa prefixsiz → `NEXT_LOCALE=tr` cookie; EN/AR/DE/ES açık-prefix) · tema tuzağı (`html.dark` + light+dark iki koşu, `emulateMedia`) · reveal tuzağı (`reducedMotion:'reduce'` + uçtan-uca scroll) · stray/stale `next-server` (listening-PID teyit) · host yükü (`/proc/loadavg` perf-bitişik ölçüm öncesi) · runtime harness selector-teyidi (LanguageSwitcher `router.replace` **butonu** / Chatbot inline `#chat` / tema `html.dark`+localStorage).
- **Canlı ≠ branch delta:** canlı `main`=`f173234` Alpfit Plus'ı **içerir** ama gym-PNG-silme (TASK-16.01) + phase-16/17 docs branch'te **unmerged** (8 commit ileride). Alpfit sayfası raster kullanmaz → gym PNG orphan (0 tüketici), Alpfit render'ını etkilemez → canlı ile branch build birebir. Canlı duman `f173234` Alpfit'ini doğrular; merge kapsam-dışı (finalizasyon).

**Tanımlayıcı kaynakları** (research kaydeder, verify-plan doğrular):
- `alpfit` namespace (133 leaf × 5) → **repo:** `messages/{tr,en,ar,de,es}.json` (site-tanımlı, teyitli).
- `PhoneMockup` CSS sınıfı → **repo:** `src/components/alpfit/PhoneMockups.module.css`.
- Redirect 3 ailesi → **repo:** `next.config.ts`; runtime regex → build artefaktı `.next/routes-manifest.json`.
- Prerender HTML → build artefaktı `.next/server/app/**/*.html` (taze build ile yenilenir).
- Test tohumları → **repo:** `tests/` (`i18n-parity`, `seo-redirects`, `seo-metadata`, `smoke`, `umami-script`, `e2e/{home,subpages}-a11y`).
- `ANTHROPIC_API_KEY` → **dış:** Vercel env (canlıda YOK → `/api/chat` 503); yalnız slot adı, değer asla.
- `CHAT_MODEL` → **dış:** Vercel env (opsiyonel, varsayılan `claude-opus-4-8`).
- Canlı sürüm `f173234` → **dış:** `main`/Vercel.
- gym PNG `public/gym/{calendar,dashboard,member,messaging}.png` → **repo:** `main`'de var, branch'te silinmiş (unmerged).

### Teknik Kararlar

- **Deterministik build-ground-truth birincil substrat.** Senaryoların çoğu (S1/S5/S6/S8-parite/S9-build) SSG prerender + Vitest + routes-manifest ile server'sız/deterministik çözülür → sandbox flaklığı atlanır, tekrarlanabilir. Runtime tarayıcı yalnız statik okunamayan davranışa (S3 WebGL, S4 toggle/klavye, S7 offline UI, S9 JS-off/race) saklanır. (ILKELER kalıcılık + memory `page.route` ilk tercih.)
- **a11y mührü otoritatif olarak CI.** S8 a11y=100 çift-tema re-teyidi mühürlü `subpages-a11y.spec.ts` (5 sayfa × 5 dil × 2 tema = 50 test) + `home-a11y` → GitHub `a11y` job'unda koşar (sandbox'tan bağımsız, otoritatif). Yerel `page.route`+axe yalnız ek nokta-kontrolü; a11y-DERİNLİK Faz 8/15'te yapıldı, tekrar edilmez (yalnız regresyon re-teyit).
- **Runtime tarayıcı = `page.route` interception, `next start` denenmez.** Memory kuralı gereği doğrudan `page.route`; WebGL için system Chrome. Harness proje-içine yazılır, koşulur, silinir; selector kaynaktan teyit edilir.
- **Canlı duman hafif tutulur.** kiwiailab.com anahtar sayfalar 200 + Alpfit marker + chat 503 (test-what's-live, tam yeniden ölçüm değil); tam doğrulama branch/build'de.
- **Chatbot 0-token, kod-inceleme yolu.** `route.ts` 503-kapısı + sanitizasyon `new Anthropic()` öncesinde (teyitli); env yok → zaten offline; hiçbir senaryo API çağrısı üretmez. (Per-mesaj max-byte cap yok = kayıtlı sahipli açık, prd-review — bu fazda litige edilmez.)

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 17` oturumunda dolduruldu (2026-07-17). **8 task.**

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

> **Yapı (Faz 9/14 emsali, araştırma araç-eşlemesine uyarlandı):** S1–S9 senaryo grupları → **8 task** (Faz 14'ün 9 task'ından fark: ayrı Lighthouse task'ı YOK — araştırma kararı: a11y mührü CI axe çift-tema 50-test, perf korunan taban argument-from-unchanged + S3 CLS). Katman sırası: **A build-ground-truth (deterministik, 17.01–17.03)** → **C runtime `page.route`+system Chrome (17.04–17.07)** → **adversarial+canlı duman (17.08)**. 17.01 taze `next build` ground-truth'ı kurar (17.02/17.03 prerender-grep + seo-redirects buna dayanır). Doğrulama fazı: kaynak kod DEĞİŞMEZ (kapsam-içi bug → reaktif düzeltme task'ı istisnası).

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 17.01 | TASK-17.01 | ✅ Tamamlandı | **S1** giriş/yönlendirme matrisi (A: curl + routes-manifest + seo-redirects): 6 sayfa × 5 locale 200; 3 redirect ailesi (`/bunker-os`→`/crew-os`, `/forum`→`/`, `/forum/:slug*`→`/bulten/:slug*`) çıplak+5-twin 308 — **v0.4 dokunmadı → regresyon re-teyit**; taze `next build` ground-truth'ı kurar. **Bulgu: ✅ GEÇTİ, 0 kapsam-içi bug** — build temiz (37/37); 30/30 prerender 200 + `html lang`/AR-RTL doğru; seo-redirects 16/16 + manifest regex 13/13 (sıra tuzağı mührü çıplak `/forum`→`/`); canlı redirect zinciri 308→200; edge beklenen (`/tr`→307, `/bulten`+bilinmeyen-locale→404). |
| 17.02 | TASK-17.02 | ✅ Tamamlandı | **S5 + S6-render + Alpfit render bütünlüğü** (A: prerender grep): "Crew OS" var / görünür "Bunker"+URL yok; Alpfit dürüstlük 4/4 (sahte-online yok); 30 sayfa-locale 0 MISSING_MESSAGE; non-TR `alpfit` stale-TR görünür kopukluk yok; AR-RTL; **Alpfit 9 bölüm + `PhoneMockup` marker render** (kırık görsel yok); her sayfa `<main>` (Faz 8 dersi). **Bulgu: ✅ GEÇTİ, 0 kapsam-içi bug** — "Crew OS" home 15×/crew-os 14× (5 dil), görünür "Bunker OS" 0/30 (tüm kalıntı kod-adı: nav key `"bunker":"Crew OS"`/`#bunker`/`bunkerback` keyframe), `bunker-os` slug 0; Alpfit 4/4 (pilot "Weekend Training Club"/₺1.500-1.200-3.000-15gün/"Bugün üründe değil"/"canlı pilotta" dürüst); yasak metafor 0/30; MISSING_MESSAGE 0/30, AR 6/6 lang+dir=rtl, non-TR `alpfit` 5-dil birebir (133 leaf parite); Alpfit 5-locale 8 `<section>`+roadmap `<div>`=9 bölüm + `PhoneMockup` 150× + 0 `<img>`/49 `<svg>`; 30/30 tam bir `<main>`. Kaynak kod değişmedi. |
| 17.03 | TASK-17.03 | ✅ Tamamlandı | **S8-suite + S6-parite** (A/B): Vitest (i18n-parite **`alpfit` 133-leaf dahil** + seo-metadata/seo-redirects + smoke/umami) + `test:e2e` axe (home+subpages **çift-tema 50 test = a11y=100 mührü**) + CI `fast`+`a11y` success; perf korunan taban re-teyit (argument-from-unchanged + CLS→17.04). **Lighthouse tekrarlanmaz** (araştırma). **Bulgu: ✅ GEÇTİ, 0 kapsam-içi bug** — taze `next build` 37/37 SSG temiz; `npm run test` **39/39 yeşil** (seo-metadata 16 + seo-redirects 16 [routes-manifest'e bağlı gerçekten koştu] + i18n-parity 5 + umami 1 + smoke 1); `alpfit` **133 leaf × 5 dil birebir parite** (ayrık teyit). CI run `29591588087` HEAD `5248a76`: `fast`+`a11y` **iki job da success** → axe `subpages-a11y` **50 test çift-tema WCAG-AA 0 ihlal** = a11y=100 otoritatif mühür (yerel `next start` denenmedi, memory kuralı). Perf korunan taban: git ile ampirik argument-from-unchanged (home 13.03/living-flow 12.03 v0.4'te dokunulmadı; `globals.css` salt-ekleme `--color-surface`; alpfit-dışı tek diff orphan `GymSoftwareShowcase.tsx` silme) → masaüstü 100/mobil LCP taban değişmedi; Alpfit CLS→17.04. |
| 17.04 | TASK-17.04 | ✅ Tamamlandı | **S3** Living Flow degradasyon (C: `page.route`+system Chrome WebGL): ana sayfa nabız + Alpfit before/after; 320/768/1440 taşma + CLS. **Bulgu: ✅ GEÇTİ (degradasyon regresyonsuz) + 1 kapsam-içi craft bulgusu (BULGU-S3, regresyon değil, kullanıcıya sunuldu).** Sanity geçti (WebGL2 probe has:true; home high FlowBackdrop fixed canvas=1). Ana sayfa matrisi hepsi ✓: light/dark FOUC yok (early===final), reduced/no-WebGL → StaticFlow SVG canvas=0, **mobil-low nabız desktop-only** (canvasFixed=0/hero=1), AR-RTL×dark×reduced `lang=ar`+`dir=rtl`+dark+static çakışmasız. Taşma **6/6 overflowX=0** (home+alpfit 320/768/1440) + **CLS=0** iki sayfa. **BULGU-S3:** alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde canvas=0/StaticFlow=0 → yalnız base-wash (animasyonlu alan yok); kök neden `FlowBackdrop` yalnız ana sayfada mount (alt sayfa `LivingFlow` high'da canvas mount etmez); **crew-os ile birebir → v0.4 regresyonu değil, Faz 12'den yerleşik desen**; degradasyon/a11y doğru → craft nüansı, kullanıcı kararı (fix task vs prd-review). Kaynak kod değişmedi. |
| 17.05 | TASK-17.05 | ⬜ Bekliyor | **S4** kontroller & kalıcılık (C: `page.route`+Chrome): tema toggle (`html.dark`+localStorage+reload+FOUC yok+Living Flow uniform), dil-switcher path-koru (**`/spor-salonu-yazilimi` dahil**, Escape/dış-tık), klavye-only + focus-visible yeşil (`reducedMotion:'reduce'`) |
| 17.06 | TASK-17.06 | ⬜ Bekliyor | **S2** tam TR yolculuğu (C: `page.route` + A: prerender): Hero→CTA→sektörler (**Alpfit çıkışı→yeni Alpfit Plus**)→4-adım→Crew OS→Forum→Footer; alt sayfa çıkış/dönüş (Alpfit odak) SPA-nav; `<Logo>` tutarlı; `/tr/`-sızıntı/kopuk-link/boş-bölüm yok (milestone TR-birincil çekirdek) |
| 17.07 | TASK-17.07 | ⬜ Bekliyor | **S7** chatbot 0-token (A: kod-inceleme `route.ts` + C: offline UI): sanitizasyon (role-whitelist+trim+slice(-12)+kısa-devre) **hepsi `new Anthropic()` öncesi**; malformed kısa-devre; offline `#chat` inline (sahte-online yok); **0 API çağrısı**; v0.4 dokunmadı → regresyon yok |
| 17.08 | TASK-17.08 | ⬜ Bekliyor | **S9** adversarial/holistik + **canlı duman** (A: `next build` temiz + C: JS-off/scroll-race + D: curl canlı): 0 MISSING_MESSAGE; JS-off SSG okunabilirlik (**Alpfit saf CSS/SVG**); tema/dil race + scroll storm (0 ScrollTrigger hatası); **canlı kiwiailab.com 200 + Alpfit `PhoneMockup` marker + chat 503** (test-what's-live, `f173234`) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 17` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 17` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 17` oturumunda doldurulur.

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

**Oluşturulma:** 2026-07-17 (discuss-phase 17)
**Son Güncelleme:** 2026-07-17 — run-task TASK-17.04: **S3 Living Flow degradasyon ✅ GEÇTİ (regresyonsuz) + 1 kapsam-içi craft bulgusu (BULGU-S3), regresyon değil, kullanıcıya sunuldu** (C: `page.route`+system Chrome WebGL). Ayırt-edicilik sanity geçti (WebGL2 probe has:true; home high FlowBackdrop fixed canvas=1). Ana sayfa mod matrisi hepsi ✓ (light/dark FOUC yok · reduced/no-WebGL→StaticFlow · **mobil-low nabız desktop-only** · AR-RTL×dark×reduced çakışmasız). Alpfit degradasyon doğru (reduced/no-WebGL→StaticFlow, mobil→animasyonlu canvas). Taşma **6/6 overflowX=0** (home+alpfit 320/768/1440) + **CLS=0** iki sayfa (perf korunan taban CLS bileşeni teyit). **BULGU-S3:** alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde animasyonlu alan render etmiyor (canvas=0/StaticFlow=0 → yalnız base-wash); kök neden `FlowBackdrop` yalnız ana sayfada mount; **crew-os ile birebir → v0.4 regresyonu değil, Faz 12'den yerleşik desen, Faz 14 S3 geçti**; degradasyon/a11y/taşma/CLS doğru → craft nüansı, kullanıcı kararına sunuldu (fix task vs prd-review craft kaydı). Kaynak kod değişmedi (doğrulama fazı); geçici harness silindi. Fazda 4 task kaldı (17.05–17.08). Sıradaki: run-task TASK-17.05.
