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

> Bu bölüm `/devflow:research-phase 17` oturumunda doldurulur.

### Değerlendirilen Yaklaşımlar
- [Yaklaşım 1]: [Açıklama, artılar, eksiler]
- **Seçilen:** [Hangisi ve neden]

### Kullanılacak Araçlar/Kütüphaneler
- [Araç 1]: [Versiyon, ne için]

### Dikkat Edilecekler
- [Tuzak/Risk 1]: [Nasıl kaçınılacak]

### Teknik Kararlar
- [Karar 1]: [Gerekçe]

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 17` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 17.01 | TASK-17.01 | ⬜ Bekliyor | [plan-phase 17'de doldurulacak] |

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
**Son Güncelleme:** 2026-07-17 — discuss-phase 17: Kapsam tartışması tamamlandı. v0.4 versiyon-sonu senaryo testi fazı; kapsam ana sayfa + 5 alt sayfa uçtan-uca (Faz 14 çıtası, Alpfit Plus delta odağı); branch/build + hafif canlı duman (test-what's-live, v0.4 canlıda `f173234`); TR birincil + non-TR tutarlılık (alpfit stale-TR); chatbot 0-token; keşfet+kaydet+triyaj; otonom; S1–S9 kataloğu onaylandı. Sıradaki adım research-phase 17.
