# Phase 17: v0.4 Versiyon-Sonu Senaryo Testi (ana sayfa + 5 alt sayfa uçtan-uca)

**Durum:** ✅ Tamamlandı

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

> `/devflow:research-phase 17` (2026-07-17). Doğrulama fazı olduğu için araştırma "kütüphane seçimi" değil **araç eşlemesi + ortam ampirik teyidi**ydi. **Detay → [PHASE-17-ARASTIRMA.md](PHASE-17-ARASTIRMA.md)** (ortam teyidi · değerlendirilen substratlar · S1–S9 araç eşleme tablosu · tanımlayıcı kaynakları · dikkat edilecekler).

**Özet (kendi kendine yeten):** Doğrulama **katmanlı** kuruldu — **A** build-ground-truth birincil (prerender HTML grep + `routes-manifest.json` + Vitest; deterministik, server'sız), **C** runtime tarayıcı yalnız statik okunamayan davranışa (`page.route` interception + system Chrome `channel:'chrome'`+swiftshader; **`next start` denenmez** — sandbox `exit 144`, memory kuralı), **D** hafif canlı duman (curl kiwiailab.com, test-what's-live). **a11y mührü otoritatif olarak CI'ın `a11y` job'u** (`subpages-a11y` 5 sayfa × 5 dil × 2 tema = 50 test, GitHub runner'da — sandbox'tan bağımsız); a11y **derinliği** Faz 8/15'te mühürlendiği için ayrı Lighthouse koşusu bilinçle **tekrarlanmaz** (→ `docs/DECISIONS.md` 2026-07-18). Chatbot **0 API çağrısı** (kod-inceleme + SDK-mock + key-yok offline). Kritik uyarı: **prerender marker'ı CSS-modül sınıf adıdır** (`PhoneMockup`), React bileşen adı değil — bileşen-adı grep'i 0 döner, bu yanlış-FAIL değildir.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 17` oturumunda dolduruldu (2026-07-17). **8 task.**

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

> **Yapı (Faz 9/14 emsali, araştırma araç-eşlemesine uyarlandı):** S1–S9 senaryo grupları → **8 task** (Faz 14'ün 9 task'ından fark: ayrı Lighthouse task'ı YOK — araştırma kararı: a11y mührü CI axe çift-tema 50-test, perf korunan taban argument-from-unchanged + S3 CLS). Katman sırası: **A build-ground-truth (deterministik, 17.01–17.03)** → **C runtime `page.route`+system Chrome (17.04–17.07)** → **adversarial+canlı duman (17.08)**. 17.01 taze `next build` ground-truth'ı kurar (17.02/17.03 prerender-grep + seo-redirects buna dayanır). Doğrulama fazı: kaynak kod DEĞİŞMEZ (kapsam-içi bug → reaktif düzeltme task'ı istisnası).

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 17.01 | TASK-17.01 | ✅ Tamamlandı | **S1** giriş/yönlendirme matrisi (A) — 6 sayfa × 5 locale + 3 redirect ailesi regresyon re-teyidi; faz için taze `next build` ground-truth'ı kurar. **✅ GEÇTİ, 0 bug.** |
| 17.02 | TASK-17.02 | ✅ Tamamlandı | **S5 + S6-render + Alpfit render bütünlüğü** (A: prerender grep) — taksonomi, dürüstlük 4/4, 0 `MISSING_MESSAGE`, 9 bölüm + `PhoneMockup`, her sayfa `<main>`. **✅ GEÇTİ, 0 bug.** |
| 17.03 | TASK-17.03 | ✅ Tamamlandı | **S8-suite + S6-parite** — Vitest 39/39 + CI `fast`+`a11y` success (axe çift-tema 50 test = a11y mührü) + perf korunan taban argument-from-unchanged. **✅ GEÇTİ, 0 bug.** |
| 17.04 | TASK-17.04 | ✅ Tamamlandı | **S3** Living Flow degradasyon + taşma/CLS (C: `page.route`+system Chrome). **✅ GEÇTİ (degradasyon regresyonsuz)** + **BULGU-S3** (alt-sayfa `high` masaüstünde animasyonlu alan yok; crew-os ile birebir → v0.4 regresyonu değil, craft nüansı → prd-review'a ertelendi, kullanıcı: devam). |
| 17.05 | TASK-17.05 | ✅ Tamamlandı | **S4** kontroller & kalıcılık — tema (localStorage/reload/FOUC-yok/Living Flow uniform), dil path-koru (Alpfit dahil), klavye focus-visible. **✅ GEÇTİ, 22/22 PASS, 0 bug** (3 harness artefaktı düzeltildi). |
| 17.06 | TASK-17.06 | ✅ Tamamlandı | **S2** tam TR yolculuğu (Alpfit çıkış/dönüş odak) — milestone TR-birincil çekirdeği. **✅ GEÇTİ, 21/22 PASS, 0 bug** + **BULGU-S2** (`history.back()`-after-SPA = `page.route` harness artefaktı, belirleyici probe ile teyitli → memory). |
| 17.07 | TASK-17.07 | ✅ Tamamlandı | **S7** chatbot 0-token — sanitizasyon sırası (`new Anthropic()` hepsinden sonra) + 8 malformed kısa-devre + zarif offline UI. **✅ GEÇTİ, 20/20 PASS, 0 gerçek API çağrısı, 0 bug.** |
| 17.08 | TASK-17.08 | ✅ Tamamlandı | **S9** adversarial/holistik + canlı duman (test-what's-live `f173234`). **✅ GEÇTİ, 0 bug** — JS-off 40/40, adversarial 13/14, canlı 3 sayfa 200 + `PhoneMockup` 150× + `/api/chat` 503; **BULGU-S9** (default-locale prefix = harness artefaktı → memory). |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> `/devflow:verify-phase 17` oturumu (2026-07-18). Doğrulama fazı: 8 task (S1–S9) zaten kapsamlı otonom senaryo testiydi → UAT milestone-seviyesi **yeniden teyittir** (task kanıtları + bu oturumda bağımsız re-koşu). Otomatik katman (CI + audit + security-review) Adım 1'de yeşil. Senaryolar milestone (5 kriter) + kapsam kararları + QUALITY 8 eksen + adversarial'ı sistematik kapsar.

**Tarih:** 2026-07-18
**Toplam Senaryo:** 12 | **Geçen:** 12 | **Kalan:** 0

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | **S1 — Route/redirect matrisi regresyonu:** 6 sayfa × 5 locale prerender var; 3 redirect ailesi (`/bunker-os`→`/crew-os`, `/forum`→`/`, `/forum/:slug*`→`/bulten/:slug*`) çıplak+locale-twin 308; edge (`/tr`→307, bilinmeyen-locale→404) | ✅ Geçti | Taze build 30/30 HTML prerender; TASK-17.01 seo-redirects 16/16 + manifest regex 13/13; canlı `/bunker-os`→308→`/crew-os` (bu oturum). v0.4 dokunmadı → regresyon re-teyit |
| 2 | **S5 — Taksonomi & dürüstlük:** "Crew OS" her görünür yüzeyde / görünür "Bunker OS" 0 (kod-adı kalıntısı hariç); Alpfit dürüstlük 4/4 gerçek (pilot/fiyat/yol-haritası/sahte-online yok); yasak metafor yok | ✅ Geçti | TASK-17.02 prerender: "Crew OS" home 15×/crew-os 14×, görünür "Bunker OS" 0/30, yasak metafor 0/30; canlı `/crew-os` "Crew OS" 14×/"Bunker OS" 0 (bu oturum) |
| 3 | **S6 — 5-dil bütünlük & non-TR tutarlılık:** 30 sayfa-locale render 0 `MISSING_MESSAGE`; `alpfit` 133-leaf × 5 dil parite; AR-RTL aynalama; non-TR alpfit stale-TR görünür kopukluk yok | ✅ Geçti | Taze build 30/30 **0 MISSING_MESSAGE** (bu oturum) + Vitest i18n-parity 5/5 + `alpfit` 133-leaf birebir (17.02/17.03); AR `dir=rtl` |
| 4 | **Alpfit Plus render bütünlüğü (v0.4 asıl delta):** 9 bölüm SSG'de tam render; saf CSS/SVG PhoneMockup kırık görsel yok; 0 raster (`next/image` düştü); tek `<main>` | ✅ Geçti | Taze build 5-locale: 8 `<section>`+roadmap=9 bölüm, PhoneMockup 150×, 0 `<img>`/49 `<svg>`, tek `<main>` (bu oturum); canlı 150× birebir |
| 5 | **S2 — Tam TR yolculuğu (milestone TR-birincil):** ana→alt çıkış/dönüş (Alpfit odak) SPA-nav; `<Logo>` tutarlı; `/tr/`-sızıntı/kopuk-link/boş-bölüm yok; bölüm sırası + Hero ikincil CTA | ✅ Geçti | TASK-17.06 21/22 PASS (1 harness artefaktı=BULGU-S2); bölüm sırası `top>how>sectors>bunker>forum>chat>contact`, Alpfit SPA-nav marker korundu, dönüş home restore |
| 6 | **S3 — Living Flow degradasyon (imza):** ana sayfa nabız (light/dark FOUC yok, reduced/no-WebGL→StaticFlow, mobil-low desktop-only, AR-RTL×dark×reduced) + Alpfit before/after; 320/768/1440 taşma + CLS≈0 | ✅ Geçti | TASK-17.04: mod matrisi hepsi ✓, taşma 6/6 overflowX=0, CLS=0 iki sayfa; BULGU-S3 (craft nüansı, prd-review'a ertelendi, regresyon değil) |
| 7 | **S4 — Kontroller & kalıcılık:** tema toggle (localStorage+reload+Living Flow uniform+FOUC yok); dil-switcher path-koru (Alpfit dahil, Escape/dış-tık/klavye); klavye-only focus-visible yeşil | ✅ Geçti | TASK-17.05 22/22 PASS; tema `html.dark`+localStorage+aria-pressed tutarlı, reload-kalıcı; dil path-koru (Alpfit→`/en/spor-salonu-yazilimi`); focus-visible 2px yeşil çift-tema |
| 8 | **S7 — Chatbot 0-token:** key-yok offline UI (sahte-online yok) + sanitizasyon `new Anthropic()` öncesi + malformed kısa-devre + stream-kopması UI takılmaz; toplam API çağrısı = 0 | ✅ Geçti | TASK-17.07 20/20 PASS (12 route Vitest-mock + 8 offline UI); sanitizasyon L22→L48 sıra; 8 malformed→400 ctor öncesi; **0 gerçek Anthropic çağrısı** |
| 9 | **S8 — v0.4 guardrail suite (a11y/perf/parite/CI):** a11y=100 çift-tema (axe 50-test WCAG-AA 0 ihlal) + Vitest 39/39 + perf korunan taban (masaüstü 100/mobil LCP taban/CLS≈0) + CI (`fast`+`a11y`) yeşil | ✅ Geçti | CI `36f8986`+`a103998` fast+a11y **success** (bu oturum REST teyidi) = otoritatif a11y mührü; Vitest 39/39 (17.03); perf argument-from-unchanged (home/living-flow v0.4'te dokunulmadı) |
| 10 | **S9 — Adversarial/holistik:** `next build` temiz 0 MISSING_MESSAGE; JS-off SSG okunabilirlik (Alpfit saf CSS/SVG); tema/dil race + scroll/anchor storm → nabız tek WebGL context + 0 ScrollTrigger/GSAP/Lenis hatası | ✅ Geçti | TASK-17.08 (bu oturum): JS-off **40/40 PASS** (Alpfit PhoneMockup 138 görünür); adversarial **13/14 PASS** (tema 9-tık race final-tutarlı, dil zinciri lang 5/5, scroll storm canvas 1→1, 0 motion hatası); 1 harness artefaktı=BULGU-S9 |
| 11 | **Canlı duman (test-what's-live `f173234`):** kiwiailab.com anahtar sayfalar 200 (`/`+`/spor-salonu-yazilimi`+`/crew-os`) + Alpfit `PhoneMockup` marker canlı + `/api/chat` 503 (env yok, beklenen offline) | ✅ Geçti | Bu oturum curl: 3 sayfa 200 + PhoneMockup **150×** (branch birebir) + `/api/chat` **503**; canlı=branch build birebir (gym PNG unmerged ama Alpfit raster kullanmaz → etkisiz) |
| 12 | **Bulgu triyajı & doğrulama-fazı disiplini:** tüm bulgular sahipli dispozisyon (BULGU-S2/S3/S9 + S7 açık); kaynak kod değişmedi (doğrulama fazı); geçici harness'lar silindi (git temiz); otomatik katman yeşil | ✅ Geçti | 0 kapsam-içi gerçek bug; BULGU-S2/S9 harness artefaktı (memory), BULGU-S3 craft→prd-review, S7 max-byte cap→prd-review; `git diff main..HEAD -- src/` boş; security-review 0 + npm audit=kayıt |

---

## Retrospektif

> `/devflow:review-phase 17` (2026-07-18). Faz 17 = v0.4 versiyon-sonu senaryo testi: 8 task (S1–S9) + UAT 12/12 → **0 kapsam-içi bug, 0 düzeltme task'ı, 0 kaynak kod değişimi** (14 commit doc-only; `git diff main..HEAD -- src/ messages/` boş).

### Ne İyi Gitti?

- **Katmanlı araç eşlemesi (A build-ground-truth → C `page.route` runtime → D canlı curl) karşılığını verdi.** Senaryoların çoğu prerender HTML + `routes-manifest.json` + Vitest ile **deterministik** çözüldü; runtime tarayıcı yalnız statik okunamayan davranışa saklandı → tekrarlanabilir kanıt + sandbox flaklığının tümüyle atlanması. Faz 14'ün dersi (`page.route` ilk tercih) ilk denemede uygulandı; **`next start` bu fazda hiç denenmedi**.
- **17.01'in "taze `next build` ground-truth kur" görevi doğru bağımlılık sırasıydı;** ayrıca 17.03/17.06/17.08 kendi taze build'ini koştu → her katman HEAD-hizalı kanıt üretti, bayat `.next` yanlış-yeşili riski kapandı.
- **Harness artefaktı ≠ gerçek bug triyajı 5 kez doğru işledi, hiçbirinde kör-red/kör-onay yok.** 17.05'te 3 ölçüm artefaktı harness düzeltilerek çözüldü; BULGU-S2 ve BULGU-S9 **belirleyici probe** ile kanıtlandı. Kritik nokta: karar, harness'ın kısıtını **paylaşmayan** bağımsız bir substratta koşulan probe'a bağlandı (tam-doküman navigasyon / gerçek middleware'li canlı site) — "muhtemelen artefakttır" denip geçilmedi.
- **BULGU-S3 dürüstçe yükseltildi, sessizce yutulmadı.** crew-os parite koşusuyla "v0.4 regresyonu değil, Faz 12 deseni" **kanıtlandı** (varsayılmadı), degradasyon/a11y'nin doğru olduğu ayrıştırıldı, sonra craft nüansı olarak kullanıcı kararına sunuldu.
- **Chatbot 0-token disiplini ampirik kanıtla güçlendi:** sanitizasyon sırası yalnız kod-okumayla değil **Vitest SDK-mock'la davranışsal** doğrulandı — 8 malformed varyantta `new Anthropic()` ctor + stream **hiç çağrılmadı**. Toplam gerçek Anthropic çağrısı **0**.
- **"Test-what's-live" katmanı gerçek değer kattı:** canlı `f173234`'te Alpfit `PhoneMockup` **150×** = branch build'le birebir → doğrulamanın canlıya transferi gösterildi (varsayılmadı); aynı katman BULGU-S9'un belirleyici probe'unu sağladı.
- **Geçici harness hijyeni tam:** 3+ harness yazıldı, koşuldu, **silindi** (`find _verify*` boş, `git status` temiz) → arkasında dosya/test çöpü kalmadı.
- **Faz 16'nın üç önerisi de uygulandı:** `senaryo_testi` damgası → discuss-phase 17 ✓ · canlı duman katmanı kapsama girdi ve S9'da koştu ✓ · üç sahipli kalem yeniden litige edilmeden taşındı ✓.

### Ne Kötü Gitti?

- **Runtime doğrulamanın hiçbiri kalıcı regresyon tohumuna dönüşmedi.** S3/S4/S9 gerçek tarayıcıda zengin invariant üretti, ama harness'lar silindiği için CI'da bunları koruyan hiçbir şey yok. Üç versiyon-sonu (Faz 9 → 14 → 17) benzer harness'ı sıfırdan yazıp attı; TB-3 (full-motion tohumu) Faz 12'den beri açık. Fazın ürünü "o anki güvence" oldu, "kalıcı güvence" değil.
- **`page.route` substratının prod'dan iki ıraksaması ancak koşarken keşfedildi** (BULGU-S2 partial-flight ↔ statik full-`.rsc`; BULGU-S9 default-locale prefix normalizasyonu middleware'de). Araştırmada öngörülmemişti → teşhis turu maliyeti. Memory'ye eklendiler.
- **Perf ölçülmedi, argüman edildi.** Korunan taban `argument-from-unchanged` ile (git-temelli, ampirik) savunuldu; gerekçesi sağlam (sandbox software-GL perf'i kıyaslanamaz kılıyor) ve CLS gerçekten ölçüldü (0). Ama sonuç: v0.4 kapanışında **taze bir perf sayısı yok**; brief mobil açığı da hâlâ kapalı değil (metodolojik duvar).
- **Craft üst ekseninde bir açık, faz kapanırken açık kaldı.** BULGU-S3 doğru triyaj edildi ve kullanıcı kararıyla ertelendi — ama amiral vitrin sayfası masaüstünde imza alanını göstermiyor, mobilde gösteriyor. Craft'ın **üst eksen** olduğu bir projede versiyon kapanışının bu ödünle yapılması prd-review'da yeniden tartılmalı.

### Sonraki Faz İçin Öneriler

- **Versiyon Sonu Durumu `senaryo_testi` → `prd_review_bekliyor`** damgalandı (bu review). v0.4 versiyon-sonu fazları (16, 17) tamam → sıradaki adım **zorunlu `/devflow:prd-review`**.
- **prd-review'a devredilen sahipli kalemler** (dispozisyonlarıyla, yeniden litige edilmeden):
  - **BULGU-S3 — alt-sayfa masaüstü imza alanı boşluğu.** Alpfit + crew-os hero'ları `high` modda animasyonlu Living Flow göstermiyor (yalnız base-wash); kök neden `FlowBackdrop` yalnız ana sayfada mount. v0.4 regresyonu **değil**, degradasyon/a11y doğru → **craft kararı**. Olası fix: alt sayfalara `FlowBackdrop` mount (kendi task'ında, guardrail re-teyidiyle). **Craft üst eksen → prd-review'da öncelikli.**
  - **non-TR (en/ar/de/es) `alpfit` = TR stale-kopya** — 133 leaf × 5 dil yapısal **tam** (eksik anahtar yok), değerler Türkçe. Site canlı ve 5 dil sunuyor → **non-TR ziyaretçi Alpfit'te Türkçe içerik görüyor**. Bilinçli versiyon-sınırı ama artık ziyaretçi-görünür → prd-review'ın **ana kalemi**.
  - **Canlı `ANTHROPIC_API_KEY` env YOK** → `/api/chat` 503, canlı chatbot "offline" (offline yolun zarif olduğu S7+S9'da doğrulandı). **Kullanıcı aksiyonu** (Vercel dashboard); canlı sitedeki en görünür açık.
  - **`revize/v0.4-versiyon-sonu` → `main` merge bekliyor** (gym PNG silme + Faz 16/17 dokümanları); canlıdaki orphan PNG'ler **0 tüketici** → etkisiz. Finalizasyon adımı.
  - **Chatbot per-mesaj max-byte cap yok** (min-length + geçmiş-sayısı var) → hardening adayı. · **npm audit 2 moderate** (Next'e gömülü postcss, sömürülemez; DECISIONS 2026-07-16) → upstream-bekleyen. · **Brief mobil perf açığı** (≈90 / LCP >2.5s) → metodolojik duvar, DECISIONS 2026-06-30.
- **TB-3'ü (runtime invariant tohumu) sonraki teknik borç fazında somut kapsam kalemi yap.** Silinen harness'lardan **WebGL-bağımsız ve kararlı** olanları (JS-off SSG okunabilirlik · tema kalıcılık/FOUC · dil-switcher path-koruma) kalıcı Playwright spec'ine çevir; WebGL-bağımlılar (degradasyon matrisi, scroll storm) flakilik nedeniyle geçici kalabilir. Versiyon-sonu senaryo testinin maliyetini de düşürür.
- **Sonraki senaryo testinde `page.route` ıraksamalarını research'te peşinen listele.** İkisi memory'de kayıtlı; "bu substratın prod'dan bilinen farkları" başlığı açılırsa aynı teşhis turları tekrar ödenmez.

### Task-Spesifik Teknik Öğrenimler
<!-- Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar. -->

- **`page.route` harness'ında chunk yolları URL-encoded gelir.** `app/[locale]/…` chunk'ları `%5Blocale%5D` olarak istenir, diskteki ad literal `[locale]` → 404 ve **React hiç boot etmez** (sessiz: sayfa görünür, hidratasyon yok). Fix: `decodeURIComponent(pathname)`. Ayırt-edicilik sanity'si (WebGL probe + beklenen canvas) bunu yakalar. (17.05.)
- **`document.documentElement`'e `document_start`'ta MutationObserver bağlanamaz** — element henüz yok, observer hiç ateşlemez (FOUC ölçümünde sessiz yanlış-negatif). Çözüm: `document`'i childList+subtree gözle. (17.05.)
- **CSS custom property probe'u hex döner, `rgb()` değil.** `--color-green` ham değeri `#1f7a3d`; aynı renk `outline-color` olarak **kullanıldığında** tarayıcı `rgb(...)` normalize eder → karşılaştıran harness iki formatı da ayrıştırmalı. (17.05.)
- **Prerender'da `MISSING_MESSAGE` grep'i yanlış-pozitif verebilir:** `alpfit.vercel.app` gerçek URL ama i18n key-path desenine benziyor — eşleşmeyi gözle doğrula. (17.02.)
- **JS-off okunabilirliğin kök nedeni `data-reveal` deseni.** `.reveal` + `is-in` `globals.css`'te **ölü baseline** (hiç kullanılmıyor); 17 bileşen `data-reveal` kullanıyor, CSS varsayılanı `opacity:1` — `opacity:0`'ı yalnız GSAP **JS ile** uyguluyor → JS-off'ta içerik gizlenmiyor (40/40, 0 gizli-opacity0). Reveal desenine dokunan işlerde bu invariant korunmalı. (17.08.)
- **Alpfit render marker'ı `PhoneMockup` (CSS-modül sınıfı), bileşen adı değil** — `AlpfitShowcase` grep'i 0 döner (beklenen, yanlış-FAIL değil); bölüm sayımı `8 <section> + roadmap <div> = 9 kavramsal bölüm`. (17.02/17.08.)

### DevFlow'a Öneri

- **Doğrulama (senaryo testi) fazları için "geçici harness → kalıcı tohum mezuniyeti" adımı yok.** DevFlow senaryo testi fazı keşfet+kaydet+triyaj yapıyor ama ürettiği runtime doğrulama araçlarının akıbetiyle ilgilenmiyor → araç her versiyon sonunda yeniden yazılıp atılıyor (bu projede 3 kez: Faz 9/14/17). Öneri: senaryo testi fazının kapanışına küçük bir triyaj sorusu eklensin — *"bu fazda yazılan geçici doğrulama araçlarından hangisi kalıcı regresyon tohumu olmayı hak ediyor?"* — ve hak edenler sonraki teknik borç fazının kapsam adayı olarak kaydedilsin. Proje-özel değil, yöntemsel. (Kullanıcıya bildirildi; DevFlow'a ayrı oturumda taşınacak.)

---

## Kalite Kontrol Sonuçları

> `/devflow:review-phase 17` oturumunda dolduruldu (2026-07-18). Bu bir **doğrulama fazıdır** — kaynak kod değişmedi (`git diff main..HEAD -- src/ messages/` boş). Eksenler bu yüzden "yeni yüzey" değil, **v0.4 kapanışında ölçülen mevcut durum + regresyon** perspektifinden değerlendirildi. Fazın 8 task'ı zaten eksen-eksen kanıt üretti; aşağıdaki tablo o kanıtı QUALITY.md eksenlerine eşler.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ⚠️ | Taksonomi/dürüstlük **temiz:** "Crew OS" home 15× / crew-os 14×, görünür "Bunker OS" **0/30**, `bunker-os` slug 0; Alpfit dürüstlük **4/4 gerçek** (pilot adı · gerçek fiyatlar · "Bugün üründe değil" dürüst çerçeve · sahte "● online" **0**); yasak metafor **0/30**; kod değişmedi → Faz 15 craft mühürlü. **⚠️ gerekçesi: BULGU-S3** — Alpfit + crew-os hero'ları `high` masaüstünde animasyonlu Living Flow göstermiyor (canvas=0/StaticFlow=0, yalnız base-wash); mobilde gösteriyor → masaüstü↔mobil ilişkisi ters. v0.4 **regresyonu değil** (crew-os parite kanıtlı, Faz 12 deseni) ama **Craft üst eksen** (ILKELER) ve amiral vitrin sayfasını etkiliyor → kullanıcı kararıyla prd-review'a ertelendi, açık kalem olarak işaretlenir. |
| Erişilebilirlik | ✅ | Otoritatif mühür **CI `a11y` job** (GitHub runner): `subpages-a11y` **50 test** (5 sayfa × 5 dil × 2 tema), WCAG-AA **0 ihlal**, 3 ayrı HEAD'de success. Yapısal audit boşluğu deterministik ön-kontrolle kapatıldı: **30/30 sayfada tam bir `<main>`** (Faz 8 dersinin enstrümanı — bülten sayfaları dahil). Runtime: focus-visible **yeşil 2px** çift-tema, **odak kaybı yok 16/16**, menü Escape/dış-tık/klavye; reduced-motion tam fallback; AR `lang`+`dir=rtl` **6/6**. Metodoloji notu: ayrı Lighthouse **bilinçle tekrarlanmadı** (a11y derinliği Faz 8/15'te mühürlü; bu faz regresyon re-teyidi) → gerekçe DECISIONS 2026-07-18. |
| Performans | ✅ | **CLS = 0** (PerformanceObserver buffered, home + alpfit, uçtan-uca scroll sonrası) · **overflowX = 0** 6/6 (320/768/1440 × 2 sayfa) · nabız **tek WebGL context 1→1** scroll storm sonrası (remount/leak yok) · canlı 3 sayfa 200. Korunan taban `argument-from-unchanged` ile **ampirik** temellendi (git): home son dokunuş 13.03, living-flow 12.03 → v0.4 dokunmadı; `globals.css` **salt-ekleme**; alpfit-dışı tek diff = ölü kod silme. Dürüst kayıt: bu fazda **taze perf sayısı ölçülmedi** — sandbox software-GL ortamı perf/TBT'yi kıyaslanamaz kılıyor (memory). Brief mobil açığı (perf ≈90 / LCP >2.5s) devralınan, metodolojik duvara dayalı → prd-review. |
| Yerelleştirme & RTL | ✅ | **0 `MISSING_MESSAGE`** 30 sayfa-locale'de (iki bağımsız taze build'de teyit); `alpfit` **133 leaf × 5 dil birebir parite**, `i18n-parity` tohumu eksik-anahtar=fail ile mühürlü; AR RTL 6/6. **Anahtar varlığı ≠ değer tazeliği** disiplini korundu: non-TR `alpfit` stale-TR **bilinçli versiyon-sınırı** (yapısal tam → görünür kopukluk imkânsız), eksik anahtar **yok**. Açık: non-TR çeviri geçişi → prd-review (site canlı ve 5 dil sunuyor → artık ziyaretçi-görünür). |
| Modülerlik & Bakım | ✅ | Kaynak kod değişmedi → ürün modülerliği Faz 15 durumunda. Doğrulama tarafı temiz: geçici harness'lar yazıldı, koşuldu, **silindi** (`find _verify*` boş, `git status` temiz) → dosya/test çöpü yok; katmanlı araç eşlemesi (A/C/D) yeniden kullanılabilir kaydedildi. Kayıtlı bakım maliyeti: runtime harness'lar kalıcı olmadığı için her versiyon sonunda yeniden yazılıyor (→ Ne Kötü Gitti / TB-3 önerisi). |
| Hata Yönetimi & Degradasyon | ✅ | Living Flow mod matrisi **hepsi doğru**: reduced-motion/no-WebGL → StaticFlow · mobil-low → hero canvas · light/dark **FOUC yok** (pre-paint) · AR-RTL×dark×reduced çakışmasız. **JS-off 40/40 PASS** — 6 TR sayfa okunur, **0 gizli-opacity0 içerik**, Alpfit saf CSS/SVG tam okunur. Chatbot: key-yok → 503 → **zarif offline** (`t("error")`), UI takılmıyor (sonsuz Thinking yok, input kullanılabilir), stream hiç başlamıyor, **sahte online/ping-dot yok**. Adversarial: tema 9-tık race final-tutarlı + reload-kalıcı, dil zinciri lang==target 5/5, **0 ScrollTrigger/GSAP/Lenis/WebGL hatası**. |
| Güvenlik | ✅ | **security-review 0 bulgu** (faz diff = `_dev/` markdown + Faz 16 PNG silme → kod/config/bağımlılık yüzeyi yok). Chat sanitizasyon sırası **satır-satır + davranışsal** doğrulandı: 503-kapısı L22 → JSON guard L27 → role-whitelist/trim/`slice(-12)` L38-42 → trailing-user kısa-devre L44 → **`new Anthropic()` L48 (hepsinden SONRA)**. Kanıt okuma değil koşu: **8 malformed varyant → 400, ctor + stream HİÇ çağrılmadı**; gömülü system/tool sıyrılıyor (`[system,user]` → yalnız user forward). Secret koda gömülü değil (yalnız env slot adı). Kayıtlı açıklar: per-mesaj max-byte cap yok (min-length + geçmiş-sayısı var) → prd-review hardening; npm audit 2 moderate = sömürülemez build-zamanı postcss (DECISIONS 2026-07-16). |
| Test Kapsamı | ⚠️ | Commit'li suite **yeşil ve gerçekten koştu:** Vitest **39/39** (seo-redirects `routes-manifest.json`'a bağlı → atlanmadı, yanlış-yeşil değil) + CI `fast`+`a11y` **success** (axe 50-test). **⚠️ gerekçesi:** bu fazın kendi runtime doğrulaması (S3 degradasyon matrisi · S4 tema/dil/klavye kalıcılığı · S9 JS-off + race) **kalıcı tohum üretmedi** — harness'lar koşulup silindi, CI'da bu invariant'ları koruyan hiçbir şey yok. TB-3 (full-motion tohumu, WebGL-flaky) Faz 12'den beri açık ve bu fazda da kapanmadı. Üç versiyon-sonu (9/14/17) aynı invariant'ları yeniden doğrulayıp attı → öneri: WebGL-bağımsız olanları (JS-off okunabilirlik / tema kalıcılık-FOUC / dil path-koruma) kalıcı spec'e çevir (sonraki teknik borç fazı kapsam adayı). |

---

## Sonuç

- **Tamamlanma Tarihi:** 2026-07-18
- **Toplam Task:** 8 (17.01–17.08, hepsi ✅ ve arşivde)
- **Milestone 5/5 karşılandı:** S1–S9 otonom koşuldu · her senaryonun sonucu kayıt altında · bulgular triyajlı (**0 kapsam-içi bug, 0 düzeltme task'ı**) · TR yolculuğu bütünsel-tutarlı + non-TR tutarlı · v0.4 guardrail'leri regresyonsuz.
- **Kriter 5'e dürüst şerh:** "Living Flow imzası degradasyonlu" karşılandı (degradasyon her modda doğru), ancak alt-sayfa **masaüstünde animasyonlu imza alanı yok** (BULGU-S3) — degradasyon hatası değil, craft nüansı; kapanış bu bilinçli şerhle yapıldı.
- **Kalite: 6 ✅ + 2 ⚠️** — ⚠️ Marka & Craft (BULGU-S3, üst eksen) · ⚠️ Test Kapsamı (runtime doğrulama kalıcı tohum üretmedi; TB-3 açık).
- **Doğrulama fazı disiplini tam:** kaynak kod değişmedi (14 commit doc-only), geçici harness'lar silindi, 8/8 task arşivde, `git status` temiz. Kapsam kararlarının ve araştırma "Dikkat Edilecekler"inin tamamına uyuldu (`next start` hiç denenmedi).
- **Versiyon Sonu Durumu `senaryo_testi` → `prd_review_bekliyor`** damgalandı → sıradaki adım **zorunlu `/devflow:prd-review`**.
- **prd-review'a devredilenler:** BULGU-S3 (craft, öncelikli) · non-TR `alpfit` stale-TR (canlı-görünür) · canlı `ANTHROPIC_API_KEY` yok · branch→main merge · chatbot max-byte cap · npm audit 2 moderate · brief mobil perf açığı. **BULGU-S2 / BULGU-S9 harness artefaktı olarak kapatıldı** (memory'de, takip gerektirmez).

---

## Alt Dokümanlar

- [PHASE-17-ARASTIRMA.md](PHASE-17-ARASTIRMA.md) — araştırma-detayı (ortam ampirik teyidi · değerlendirilen doğrulama substratları A/B/C/D · S1–S9 araç eşleme tablosu · tanımlayıcı kaynakları · dikkat edilecekler · teknik kararlar)

---

**Oluşturulma:** 2026-07-17 (discuss-phase 17)
**Son Güncelleme:** 2026-07-18 — **review-phase 17: Faz 17 ✅ TAMAMLANDI, faz donduruldu.** Milestone 5/5 (kriter 5'e BULGU-S3 şerhi); kalite 8 eksen → **6 ✅ + 2 ⚠️** (Marka&Craft · Test Kapsamı); **0 düzeltme task'ı**. Kapsam kararları + araştırma dikkat-noktaları + Faz 16'nın 3 önerisi: hepsi uygulandı. Versiyon Sonu Durumu **`senaryo_testi` → `prd_review_bekliyor`** → sıradaki **zorunlu `/devflow:prd-review`**. Yeni karar → `docs/DECISIONS.md` 2026-07-18 (senaryo testi a11y mühür metodolojisi); memory'ye belirleyici-probe disiplini eklendi. **Boyut (Adım 5b):** dondurmadan önce temizlik + bölme uygulandı — Task Listesi hücreleri özete indirildi (icra detayı zaten `tasks/archive/TASK-17.0X.md`'de) + Araştırma Bulguları [PHASE-17-ARASTIRMA.md](PHASE-17-ARASTIRMA.md)'ye taşındı (parent'ta özet + pointer); **44.9k → 43.3k karakter ve tek-okunabilirlik fiilen test edildi** (tek Read çağrısı, truncate yok). Faz artık **tarihsel/dokunulmaz**.
