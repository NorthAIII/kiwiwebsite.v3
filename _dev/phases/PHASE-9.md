# Phase 9: v0.2 Versiyon-Sonu Senaryo Testi (ana sayfa + 5 alt sayfa uçtan-uca)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-9-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.2'nin (a11y & performans + teknik temel) versiyon-sonu **Senaryo Testi** fazı — zorunlu `prd-review` öncesi son kapı. v0.2 içerik fazları (4 a11y, 5 test altyapısı, 6 mobil perf, 7 Umami) ve teknik borç fazı (8 alt-sayfa derin a11y) **task/faz-seviyesi** UAT'larının göremediği **dikişleri, tam kullanıcı yolculuklarını, mod kombinasyonlarını ve adversarial durumları** uçtan-uca doğrular. **Faz 3'ten (v0.1 senaryo testi) kritik fark:** Faz 8 5 alt sayfayı ana sayfa a11y çıtasına çektiği için bu faz **ana sayfa + 5 alt sayfayı** uçtan-uca kapsar (Faz 3 yalnız ana sayfaydı). İş **doğrulama**: yeni içerik/feature üretilmez. Kapsam-içi (ana sayfa veya 5 alt sayfa) gerçek bug çıkarsa düzeltme task'ı olur; kapsam-dışı / zaten-ertelenmiş kalemler kaydedilip yönlendirilir.

**Milestone:** *(Faz 2/3/8 dersi uygulandı: versiyon-sonu doğrulama milestone'u "ölç + kaydet + karar ver" olarak yazılır — geçiş peşinen varsayılmaz.)*
1. Ana sayfa + 5 alt sayfa uçtan-uca senaryo kataloğu (S1–S9) otonom koşuldu;
2. her senaryonun sonucu (geçti / bulgu) kayıt altına alındı;
3. bulgular **triyaj** edildi — kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug'lar düzeltme task'ına, kapsam-dışı / ertelenmiş kalemler sahipli kayda;
4. **TR yolculuğu birincil** olarak bütünsel-tutarlı doğrulandı (ana sayfa + alt sayfalara çıkış/dönüş) + **non-TR yüzeyleri tutarlı** (parite / render bütünlüğü / AR-RTL aynalama; bilinçli-stale değerler görünür kopukluk yaratmıyor);
5. **v0.2 kazanım guardrail'leri regresyonsuz teyit edildi** — a11y=100 çift-tema (home + 5 alt sayfa) + axe `test:e2e` 52 yeşil · Umami script kod-tarafı tüm sayfa/locale · perf korunan taban (mobil 90/LCP 3164ms, masaüstü 100, CLS≈0) · CI (`fast`+`a11y`) yeşil.

### Feature Listesi

(Senaryo testi çapraz/doğrulama fazıdır — "feature" değil **senaryo grupları (validation units)**; her grup tetiklediği birincil modüle eşlenir. MODULE-MAP `— v0.2 versiyon-sonu senaryo testi (Faz 9) —` + M1–M6 referansı.)

| Senaryo Grubu | Modül | Açıklama |
|---------------|-------|----------|
| S1: Giriş noktaları & yönlendirme matrisi | M4 (+M6) | 5 dil ana sayfa **+ 5 alt sayfa route'ları** (TR prefixsiz + /en /ar /de /es), `/forum`→`/bulten` 308 redirect (+slug), bilinmeyen-locale davranışı, derin-link |
| S2: Tam TR yolculuğu — ana sayfa → alt sayfalar | M2 (+M3) | Hero → ikincil CTA → sektörler (gym + Alpfit çıkış) → 4-adım → Crew OS → Forum → Footer; + ana sayfadan alt sayfalara çıkış (Alpfit/Crew OS/vaka/bülten) → alt sayfa içerik bütünlüğü → dönüş; CTA/nav doğru, kopuk link/boş bölüm yok |
| S3: Mod kombinasyonları (Living Flow degradasyon) | M1 (+M3) | Ana sayfa **+ alt sayfa hero'ları**: light/dark (FOUC yok), reduced-motion (StaticFlow), no-WebGL, mobil "low", **AR-RTL × dark × reduced birlikte**, 320/768/1440 taşma yok + near-zero CLS |
| S4: Kontroller & kalıcılık | M3 (+M1/M4) | tema toggle (localStorage + reload kalıcılık + Living Flow uniform), dil-switcher (path koru, klavye/Escape/dış-tık), **klavye-only yolculuk** + focus-visible; alt sayfada da dil-switcher path korur |
| S5: Taksonomi & dürüstlük tutarlılığı (çapraz/sahipsiz) | M2 (+M4) | "Crew OS" her yüzeyde / "Bunker OS" hiçbir görünür yüzeyde yok (5 dil, ana sayfa **+ alt sayfalar — özellikle /bunker-os showcase**); render'da uydurma sonuç / sahte "● online" / yasak metafor yok |
| S6: 5-dil bütünlük & non-TR tutarlılığı (versiyon-sonu çekirdek) | M4 (+M2) | parite (Vitest yeşil, eksik anahtar=fail), render `MISSING_MESSAGE` yok (ana sayfa **+ 5 alt sayfa × 5 dil**), bilinçli-stale non-TR görünür kopukluk yok, **AR-RTL aynalama (alt sayfa RTL craft — Faz 8 fix dahil)** |
| S7: Chatbot (0-token: offline + sanitizasyon) | M5 | key-yok offline UI (sahte-online-yok) + sanitizasyon kod-inceleme + malformed-input kısa-devre (rol enjeksiyonu / boş / sonda-user-yok → API'ye ulaşmadan red) + stream-kopması UI takılmaz; **toplam API çağrısı = 0** |
| S8: v0.2 kazanım guardrail'leri (YENİ — çapraz) | tümü | **v0.2'nin çekirdeği:** a11y=100 çift-tema (home + 5 alt sayfa Lighthouse) + axe `test:e2e` 52 test yeşil (fail-on-regression) · Umami script kod-tarafı tüm sayfa/locale (afterInteractive, `data-domains`) · perf korunan taban regresyonsuz · CI (`fast`+`a11y`) yeşil |
| S9: Adversarial / holistik kırma | tümü | JS-kapalı SSG okunabilirlik (ana sayfa **+ alt sayfalar**), hızlı dil/tema toggle race, hızlı scroll/anchor zıplama (ScrollTrigger kararlılığı), `next build` temiz + 0 MISSING_MESSAGE (regresyon tabanı) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 9` oturumunda dolduruldu (2026-07-02).

### Alınan Kararlar

- **Faz tipi = v0.2 versiyon-sonu Senaryo Testi (sabit faz).** Versiyon Sonu Durumu: `senaryo_testi` (review-phase 8 zaten `teknik_borç` → `senaryo_testi` yaptı; discuss-phase 9 Adım 0b'ye girdi). v0.2'nin zorunlu `prd-review` öncesi uçtan-uca doğrulaması. Doğrulama fazı — yeni feature üretilmez; çekirdek soru: task/faz-UAT'larının göremediği dikiş/yolculuk/çapraz/adversarial katmanda v0.2 tutarlı mı.
- **Kapsam sınırı = ana sayfa + 5 alt sayfa uçtan-uca** (kullanıcı kararı 2026-07-02). Faz 3'ten (v0.1 = yalnız ana sayfa) genişletildi: Faz 8 5 alt sayfayı (`/bunker-os`, `/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`) ana sayfa a11y çıtasına çekti → v0.2'yi bütünsel kapatmak için alt sayfalar uçtan-uca yolculuğa dahil: nav → sayfa → içerik bütünlüğü → degradasyon modları → AR RTL layout → çıkış → chatbot varlığı. **a11y-DERİNLİK Faz 8'de yapıldı, tekrar edilmez** — senaryo testi yalnız yolculuk-içi tutarlılığı doğrular (a11y=100 çift-tema re-teyidi S8 guardrail'inde, yeni denetim değil).
- **TR birincil öncelik** (kullanıcı kararı). TR yolculuğu derin/bütünsel doğrulanır (ana sayfa + alt sayfalara çıkış/dönüş); non-TR (EN/AR/DE/ES) yalnız **tutarlılık** katmanında (parite + render bütünlüğü + AR-RTL aynalama) — içerik-kalite derin denetimi DEĞİL. "Bilinçli-stale non-TR değerleri görünür kopukluk yaratıyor mu?" in-scope; stale içeriğin *kalitesi* out-of-scope (versiyon-sınırına ertelendi — ILKELER "TR tek kaynak", DECISIONS 2026-06-27 dil stratejisi).
- **Chatbot = 0-token (offline + sanitizasyon)** (kullanıcı kararı). API maliyeti gereksiz: (a) v0.2 chatbot'a hiç dokunmadı → bu versiyonun getirdiği regresyon riski yok; (b) canlı streaming yolu prod'da (kiwiailab.com) zaten kanıtlı; (c) 0-token test değeri degradasyon + güvenlik tarafında. Lisans gerçeği (Anthropic API token-başına ücretli; Claude.ai/Code aboneliği sunucu-taraflı SDK çağrısını kimlikleyemez) → mevcut lisans chatbot'u besleyemez. Test yüzeyi: key-yok zarif offline yolu + girdi sanitizasyonu kod-incelemesi + malformed-input kısa-devre. **Sıfır API çağrısı** (Faz 3 deseni birebir).
- **Bulgu politikası = keşfet + kaydet + triyaj** (kullanıcı kararı). Kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug → bu fazda düzeltme task'ı. Kapsam-dışı veya zaten-ertelenmiş → sahipli kayıt + yönlendirme, burada yeniden açılmaz.
- **Test modu = otonom** (kullanıcı kararı). **Faz 3'ten fark:** artık gerçek test altyapısı var (Faz 5/8) → `test:e2e` (Playwright+axe, 52 test), Vitest parite, Lighthouse çift-tema + curl/grep/Playwright MCP runtime. Milestone "ölç + kaydet + karar ver" (geçiş peşinen varsayılmaz — Faz 2/3/8 dersi).

### Kullanıcı Tercihleri

- **Ana sayfa + 5 alt sayfa uçtan-uca** (2026-07-02): alt sayfalar yolculuğa dahil; a11y-derinlik Faz 8'de yapıldı, senaryo testte yalnız yolculuk-içi tutarlılık.
- **TR birincil + non-TR tutarlılık** (2026-07-02): TR yolculuğu derin; non-TR yalnız parite/render/AR-RTL tutarlılık katmanı.
- **Chatbot 0-token** (2026-07-02): offline + sanitizasyon + malformed kısa-devre; sıfır API çağrısı.
- **Senaryo kataloğu (S1–S9) yeterli** (2026-07-02): kullanıcı ek persona/kırılma-noktası eklemedi ("devam"). S1–S9 iskeleti onaylandı.

### Sahipsiz Alan & Çapraz Konular

- **Alt sayfa dikişleri asıl yeni yüzey.** Faz 3'te alt sayfalar bilinçle kapsam dışıydı; bu faz onları uçtan-uca kapsar. Asıl bilinmeyen: ana sayfa ↔ alt sayfa **geçişleri** (client-nav vs SSG), alt sayfa **hero'larının** LivingFlow degradasyonu (her alt sayfada var), alt sayfa **AR RTL layout craft** (Faz 8 a11y'yi yaptı, ama RTL aynalama bütünlüğü yolculuk katmanında teyit edilmeli).
- **v0.2 kazanımlarının yolculuk-içi tutarlılığı (S8, yeni çapraz grup).** a11y=100 statik olarak mühürlendi (Faz 4/8) ama tema/dil/motion kombinasyonlu tam yolculukta korunuyor mu; Umami script tüm sayfa/locale'de kod-tarafı yükleniyor mu (canlı değil — DECISIONS 2026-07-01); perf tabanı regresyonsuz mu. Bunlar v0.2'nin çekirdek getirisi → ayrı senaryo grubu.
- **Ölçüm disiplini (memory):** locale tuzağı (alt sayfa TR = prefixsiz → `NEXT_LOCALE=tr` cookie şart, EN/AR/DE/ES açık-prefixli), tema tuzağı (light+dark iki koşu, dark-panel inversiyonu), reveal tuzağı (`reducedMotion:'reduce'` + scroll), stray/stale `next-server` (listening-PID teyit), host yükü (`/proc/loadavg` perf-bitişik ölçümden önce) — research/plan'de teyit.
- **Guardrail:** senaryo testi kaynak koda dokunmaz (doğrulama fazı) → guardrail'ler zaten yeşil olmalı; S8 bunu re-teyit eder. Kapsam-içi bug çıkarsa (düzeltme task'ı) CI a11y job otomatik korur.

### Kapsam Dışı

- **Umami canlı +1 (S9-10 Faz 7)** — v0.2 production release aksiyonu (tüm revizeyi ilk kez `main`'e almak), senaryo testi tetiklemez; kod-tarafı varlık S8'de doğrulanır (canlı panel değil). DECISIONS 2026-07-01.
- **Brief mobil perf açığı** (perf 90/LCP 3164ms vs ≥95/<2.5s) — kök neden CPU-bound WebGL, P2 craft-gate'te iptal; nihai doğrulama gerçek-cihaz/Vercel field gerektirir (metodolojik duvar). Senaryo testte çıkarsa kaydedilir, düzeltilmez. DECISIONS 2026-06-30.
- **Alt-sayfa PERF optimizasyonu** — bu faz yalnız yolculuk/a11y-guardrail; alt-sayfa perf yalnız **regresyonsuz** tutulur, optimize edilmez.
- **non-TR içerik-kalite derin denetimi** — bilinçli-stale (versiyon-sınırı); yalnız tutarlılık (parite / render / RTL) test edilir.
- **TB-C: npm audit uyarıları** (2 moderate dev-only) — bilinçli açık, ayrı ele alınır.
- **`/bunker-os` → public `/crew-os` + redirect** (M6 açık konu) + **çıplak `/forum`→404** — görsel/SEO versiyonuna ertelendi; senaryo testte çıkarsa sahipli kayıt, yeniden litige edilmez.
- **Dil setini değiştirme / AR'yi üründen çıkarma** — vizyon/PRD kararı; prd-review'a bırakıldı (vizyon korunur).
- **Yeni içerik/feature** — senaryo testi doğrulama fazıdır, üretim yapmaz (kapsam-içi bulgu → düzeltme task'ı istisnası hariç).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 9` oturumunda dolduruldu (2026-07-02). Araştırma konusu: S1–S9'u **nasıl otonom koşarız** (yeni feature değil — doğrulama metodolojisi). Kapsam kararları baz alındı (ana sayfa + 5 alt sayfa, TR birincil + non-TR tutarlılık, chatbot 0-token, keşfet+kaydet+triyaj, otonom). Faz 3 (v0.1 senaryo testi) modelidir; iki yapısal fark metodolojiyi değiştirir → aşağıda.

### Faz 3'ten iki yapısal fark (metodolojiyi belirler)

1. **Artık gerçek test altyapısı var (Faz 5/8).** Faz 3 tamamen ad-hoc'tu (curl/grep + Playwright MCP). Şimdi commit'li suite: `npm run test:e2e` (Playwright+axe **52 test** = 6 sayfa × 5 dil × 2 tema a11y, `subpages-a11y.spec.ts` + `home-a11y.spec.ts`), `npm run test` (Vitest i18n parite + smoke, 7 test), CI (`.github/workflows/ci.yml` `fast`+`a11y`), Lighthouse çift-tema (manuel). **Bu suite = S8 guardrail'lerinin + S6-paritesinin re-teyit aracı**; "senaryoyu koşmak" burada "suite'i koşmak"tır (ad-hoc replay değil). ILKELER kümülatif test altyapısıyla birebir.
2. **Alt sayfalar kapsamda + `a11y-helpers.ts` sürücüleri yeniden kullanılabilir.** `gotoLocalized` (NEXT_LOCALE cookie → locale tuzağı çözülü) + `scrollThrough` (reducedMotion+scroll → reveal tuzağı çözülü) alt sayfalara Playwright ile gitmenin kanıtlı desenleri; S2/S3/S4 alt-sayfa yolculuklarında standalone script'e kopyalanır.

### Değerlendirilen Yaklaşımlar

Çekirdek soru: senaryoları hangi araçla mekanik yürütürüz (QUALITY eksenleri: §1 craft-regresyon, §2 a11y, §3 perf-gözlem, §4 i18n/RTL, §6 degradasyon).

- **A — Saf ad-hoc replay (Faz 3'ü birebir tekrarla):** Her şeyi curl/grep + browser-script ile sıfırdan koş, commit'li suite'i yok say. **Eksi:** S8/S6 için zaten kanıtlı + CI-korunan suite'i görmezden gelmek; kümülatif altyapı ilkesine aykırı; guardrail re-teyidini elle yeniden keşfetmek.
- **B — Suite-first hibrit (SEÇİLEN):** Guardrail/parite katmanı (S6, S8) commit'li suite ile koşulur (`test:e2e` 52 + `test` 7 + CI job durumu + Lighthouse çift-tema); yolculuk/degradasyon/taksonomi/chatbot/adversarial katmanı (S1–S5, S7, S9) **en ucuz yeterli ad-hoc araca** eşlenir (markup/HTTP → curl/grep/node; client-runtime → standalone Playwright script). Gerekçe: suite tam olarak S8 için kuruldu (Faz 8); ad-hoc yalnız suite'in görmediği dikiş/yolculuk/race'e harcanır → minimum yük + deterministik tekrar (ILKELER kalıcılık + "az araç = yüksek kalite").

**Runtime sürücü kararı (kullanıcı, 2026-07-02): standalone Playwright script.** Discuss-phase 9 runtime senaryolar için "Playwright MCP" demişti; **bu oturumda MCP mevcut değil** (session MCP'leri yalnız Google Drive). Kurulu `@playwright/test` var → S3/S4/S9 için scratchpad'de tek-seferlik `chromium.launch()` script'leri (fresh prod :3000'e karşı), `gotoLocalized`/`scrollThrough` desenleri kopyalanır. Repo temiz kalır (commit'lenmez — doğrulama fazı kaynak koda dokunmaz), Faz 3 MCP-run'ın temiz eşdeğeri.

### Senaryo → araç eşlemesi

| Senaryo | Birincil araç | Ne kontrol edilir |
|---------|---------------|-------------------|
| S1 Giriş/yönlendirme (ana sayfa **+ 5 alt sayfa**) | curl (`-I`/`-sS`) + grep | 5 locale × 6 sayfa 200; `/forum`→`/bulten` **308** (+slug); TR prefixsiz (`/spor-salonu-yazilimi`) vs prefixli (`/en/...`); derin-link `/en#sectors`; bilinmeyen-locale **gözlemlenir** (peşinen iddia yok) |
| S2 TR yolculuğu + alt-sayfa çıkış/dönüş | curl+grep (link/href) + standalone Playwright (CTA/anchor scroll, client-nav) | Hero→ikincil CTA→sektörler(gym+Alpfit çıkış)→4-adım→Crew OS→Forum→Footer; ana sayfa→alt sayfa (Alpfit/Crew OS/vaka/bülten) client-nav→içerik bütün→dönüş; kopuk link/boş bölüm yok |
| S3 Degradasyon (ana sayfa **+ alt sayfa hero'ları**) | **standalone Playwright** (emulateMedia + resize) | light/dark FOUC yok, reduced→StaticFlow, no-WebGL shim, mobil "low", **AR-RTL×dark×reduced birlikte**, 320/768/1440 taşma yok + near-zero CLS; her alt sayfa hero'sunda LivingFlow var |
| S4 Kontroller/kalıcılık (home + alt sayfa) | **standalone Playwright** | tema toggle+reload kalıcılık+LivingFlow uniform, dil-switcher (path koru — anchor kütüphane-varsayılanı düşer, Faz 3 record-not-fix), Escape/dış-tık/klavye, klavye-only yolculuk + yeşil focus-visible |
| S5 Taksonomi/dürüstlük (5 dil, home **+ alt sayfa, özellikle /bunker-os**) | curl+grep (render görünür metin) | "Crew OS" var / "Bunker" görünür metinde yok (namespace/route iç kalıntısı ayrıştırılır); uydurma sonuç / sahte "● online" / yasak metafor yok |
| S6 5-dil bütünlük & non-TR tutarlılık | **Vitest parite** + curl+grep (`MISSING_MESSAGE`, 6 sayfa × 5 dil) | parite (eksik anahtar=fail, suite), runtime render `MISSING_MESSAGE` yok, bilinçli-stale görünür kopukluk yok, **AR-RTL aynalama (alt-sayfa Faz 8 fix dahil)** |
| S7 Chatbot 0-token | kod-inceleme + curl POST (dummy-key malformed) + standalone Playwright (offline UI) | sanitizasyon doğruluğu; dummy-key→400 kısa-devre (Anthropic'e ulaşmadan); key-yok→503 offline UI (sahte-online yok); stream-kopması UI takılmaz; **toplam API çağrısı = 0** |
| S8 v0.2 guardrail'leri (YENİ — suite koşu) | **`test:e2e` 52 + `test` 7 + CI job durumu + Lighthouse çift-tema** | axe WCAG-AA 0 ihlal (fail-on-regression); Vitest parite; a11y=100 çift-tema (home + 5 alt sayfa); Umami script kod-tarafı tüm sayfa/locale; perf korunan taban; CI `fast`+`a11y` yeşil |
| S9 Adversarial/holistik | Bash (`next build`) + curl (JS-off SSG, home+alt sayfa) + standalone Playwright (race) | build temiz + 0 MISSING_MESSAGE, JS-kapalı SSG okunur, hızlı dil/tema toggle race, hızlı scroll/anchor zıplama (ScrollTrigger kararlılığı) |

### Ortam Kararı (kanonik)

**Fresh prod build (`next build` → `next start -p <port>`) = kanonik doğrulama ortamı** (Faz 3 TK2 birebir). Gerekçe: (a) canlıya giden çıktı budur — SSG prerender ground-truth (`.next/server/app/*.html`), redirect/middleware prod davranışı; (b) `next build` zaten S9'un "temiz build = regresyon tabanı" kalemi; (c) dev server'ın HMR/overlay/minify-yok gürültüsü versiyon-sonu doğrulamayı kirletir. `playwright.config.ts` webServer'ı zaten `build && start` :3000 yapar (`reuseExistingServer` yerelde) → `test:e2e` kendi prod-serve'ini kurar; ad-hoc curl/standalone-script için aynı prod-serve paylaşılır veya ayrı portta koşulur. **Memory disiplini:** serve eden **listening-PID az önce başlatılan process mi** teyit (stray/stale `next-server` yanlış-negatifi → MEMORY Süreç Disiplinleri); şüphede disk prerender ground-truth.

### Kullanılacak Araçlar/Kütüphaneler

Yeni bağımlılık **yok** (paket ekleme onay ister — Dokunulmazlar). Ortam bu oturumda teyitli: node **v20.20.2**, npm 10.8.2, npx, curl, jq, ss, lsof, grep, **google-chrome mevcut** (chromium binary yok), loadavg 1.85 (düşük ✓).
- **`@playwright/test` + `@axe-core/playwright`** (repoda kurulu): S8 guardrail suite (`test:e2e` 52 test). İlk koşuda tarayıcı binary gerekirse `npx playwright install --with-deps chromium` (onayla) veya system Chrome (`channel:'chrome'`).
- **Vitest** (repoda kurulu): `npm run test` → i18n parite (S6) + smoke.
- **playwright lib (`chromium.launch()`) standalone script** (scratchpad): S3/S4/S9 runtime; MCP eşdeğeri, repo'ya yazılmaz.
- **curl / grep / node v20 / jq**: HTTP status/redirect/SSG markup + i18n key-diff + `MISSING_MESSAGE` avı.
- **`next build`/`next start`**: kanonik ortam + S9 build-temizliği. **ss/lsof**: listening-PID teyidi.
- **Lighthouse 13.3.0** (npx-cache, `package.json`'a EKLENMEZ): S8 a11y=100 çift-tema skor gate (manuel; alt-sayfa hero'ları da LivingFlow → Chrome flag'leri `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader` şart, memory `perf-olcum-devcontainer-kurulumu`). **CI job durumu**: repo public → auth'suz REST API (`gh` yoksa; memory Ortam Notları).
- **`doc-scan.sh` + `cat /proc/loadavg`**: perf-bitişik gözlemden (CLS/LCP) önce host yükü (memory).

### Dikkat Edilecekler

> Precondition tanımlayıcı kaynakları işaretli: **(repo)** = repoda tanımlı, tanım sitesi verili · **(dış)** = dış sistem · **(lib)** = kütüphane konvansiyonu. Bu **kayıttır, doğrulama değil** — referans-gerçeklik tutarlılığını verify-plan denetler.

- **Locale tuzağı alt sayfalarda ana sayfadan FARKLI** (as-needed prefix). TR alt sayfa = **prefixsiz** yol (`/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bunker-os`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`) → next-intl `localeDetection` `/en/...`'e yönlendirir, **`NEXT_LOCALE=tr` cookie şart**; EN/AR/DE/ES açık-prefixli, cookie'siz. curl bunu tetiklemez (header yok) → curl-yeşil ile tarayıcı-kırmızı tutarsızlığı beklenen. **(repo:** `src/app/[locale]/*/page.tsx`; cookie mekanizması **(lib)** next-intl, `a11y-helpers.ts:41-56` `gotoLocalized`.) (memory: locale tuzağı.)
- **Chatbot `apiKey` kontrolü sanitizasyondan ÖNCE** **(repo:** `src/app/api/chat/route.ts:21-24` → `:35-46`**).** Key yokken HER istek **503**; malformed 400 kısa-devresine (geçersiz JSON / boş / sonda-user-yok) ulaşılamaz. 0-token tasarımı: (a) 400 yollarını *çalıştırmak* için **dummy/geçersiz key** (400'ler `new Anthropic()`'ten `:48` önce döner → sıfır API çağrısı); (b) key-yok offline yolu **ayrı** (503 + UI). Naif "key-yok + malformed → 400" **yanlış-negatif** (503 alır). (Faz 3 TK3 birebir.)
- **Redirect 308 (301 değil)** **(repo:** `next.config.ts:14-17` `permanent:true` → Next.js 308 method-koruyan**).** curl beklentisi 308. Çıplak `/forum`→`/bulten` (index yok)→**404** = Faz 3 sahipli bulgusu (görsel/SEO M6), record-not-fix.
- **Tema = localStorage + `html.dark`, prefers-color-scheme DEĞİL** **(repo:** `[locale]/layout.tsx` FOUC script + ThemeToggle**).** Playwright `emulateMedia({colorScheme})` temayı **çevirmez** (yalnız FOUC fallback'i etkiler); dark testi = localStorage set + reload veya toggle'a tıkla. (memory: tema-fix + a11y-ölçüm tema tuzağı.)
- **Living Flow client-only (`dynamic ssr:false`)** **(repo:** `LivingFlow.tsx`**).** Degradasyon modu (high/low/static) **client'ta** seçilir → curl markup'ta canvas/StaticFlow yok. **S3 zorunlu tarayıcı** (standalone Playwright): reduced-motion `emulateMedia({reducedMotion:'reduce'})`, no-WebGL `getContext` shim / context WebGL kapatma, mobil "low" viewport≤768 + gating-değişmezi (DOM'da attribute yok — Faz 3 öğrenimi). **Alt sayfa hero'ları da LivingFlow kullanır** → S3 6 sayfaya genişler.
- **"Bunker" anahtar-adı/komponent/route ≠ render yüzeyi.** messages JSON'da `bunker` namespace anahtarı, değer her dilde **"Crew OS"** **(repo:** `messages/*.json`**);** `/bunker-os` route href + `components/bunker-os/` iç kalıntı (public-`/crew-os` ertelendi — M6). S5 yalnız **render edilen görünür metni** denetler (RSC flight payload `self.__next_f` script-tag'i ayıklanır — Faz 3 deseni); kaynak/URL değil. Alt-sayfa yüzeyi özellikle `/bunker-os` showcase. **(repo:** `BunkerShowcase.tsx`.)
- **i18n parite Vitest suite'te** **(repo:** `tests/i18n-parity.test.ts`; `messages/{tr,en,ar,de,es}.json`**).** S6 yapısal parite = `npm run test` (eksik/fazla anahtar=fail); iş runtime `MISSING_MESSAGE` avı (6 sayfa × 5 dil render) + bilinçli-stale görünür-kopukluk. `MISSING_MESSAGE` = **(lib)** next-intl runtime hata string'i. **"Birebir-TR değer" sayısı stale değil, leak metriğidir** (Faz 3 öğrenimi: marka/sayı/ortak-kelime filtresi + render distinkt-cümle leak birlikte gerekir).
- **İki-gate a11y: axe WCAG-AA ≠ Lighthouse a11y=100** **(repo:** `a11y-helpers.ts:16` `WCAG_TAGS`; `subpages-a11y.spec.ts`**).** `landmark-one-main`/`region`/`heading-order` WCAG-AA alt-kümesinde yok → `test:e2e` 52 yeşilken Lighthouse <100 mümkün (Faz 8 dersi: 2 bülten sayfası a11y=98, TASK-8.06 düzeltti). S8 **iki gate'i de** koşar (axe suite CI-korunan + Lighthouse çift-tema manuel). (memory: iki-gate.)
- **Umami script = kod-tarafı, canlı DEĞİL** **(repo:** `tests/umami-script.test.tsx` + layout Script**).** S8 yalnız script'in tüm sayfa/locale'de `afterInteractive` + `data-domains` ile yüklendiğini kod-tarafı doğrular; **canlı panel +1 kapsam dışı** (v0.2 production release, DECISIONS 2026-07-01). "Canlıda gördüm" iddiası kanıt-artefaktına bağlanır (memory Süreç Disiplinleri).
- **Perf/a11y bulguları = sahipli/ertelenmiş, record-not-fix.** Brief mobil perf açığı (perf 90/LCP 3164ms vs ≥95/<2.5s; kök neden CPU-bound WebGL, gerçek-cihaz duvarı — DECISIONS 2026-06-30) senaryo testte çıkarsa kaydet, düzeltme. Perf-bitişik ölçümden önce `/proc/loadavg` + çok-koşu median; software-GL ortamı perf/TBT'yi şişirir, a11y/CLS/LCP ortam-bağımsız güvenilir (memory).
- **Stray/stale `next-server` yanlış-negatifi** (memory): önceki oturum portu tutan eski build edit-öncesi metni sunabilir → "metin bulunamadı" yanılır. Test başında listening-PID **fresh build** mi teyit; şüphede disk prerender ground-truth. Ayrıca `reuseExistingServer` (playwright.config) yerelde eldeki server'ı kullanır → S8 suite koşusundan önce :3000'de doğru build oturduğunu teyit et.

### Teknik Kararlar

- **TK1 — Suite-first hibrit (Yaklaşım B).** Guardrail/parite (S6/S8) commit'li suite (`test:e2e` 52 + `test` 7 + CI + Lighthouse); yolculuk/degradasyon/taksonomi/chatbot/adversarial (S1–S5/S7/S9) ad-hoc en-ucuz-araç. plan-phase task sınırlarını bundan alır: HTTP/SSG grubu (S1/S5/S6-curl), suite-guardrail grubu (S8+S6-Vitest), runtime-tarayıcı grubu (S3/S4), çapraz (S2/S7/S9). Gerekçe: kümülatif altyapı (ILKELER) + minimum yük + deterministik.
- **TK2 — Kanonik ortam = fresh prod build, PID-teyitli** (Faz 3 birebir). dev tali. `test:e2e` kendi prod-serve'ini kurar; ad-hoc script/curl aynı prod-serve'i paylaşır veya ayrı portta. `reuseExistingServer` tuzağına dikkat (doğru build oturmuş mu).
- **TK3 — Runtime sürücü = standalone Playwright script (scratchpad), MCP DEĞİL** (kullanıcı kararı; MCP bu oturumda yok). `chromium.launch()` + `gotoLocalized`/`scrollThrough` desenleri kopyalanır; repo'ya yazılmaz (doğrulama fazı). Tarayıcı binary: `npx playwright install chromium` (onay) veya `channel:'chrome'` (system Chrome mevcut).
- **TK4 — Chatbot 0-token üç-katman** (Faz 3 TK3 birebir): (1) sanitizasyon **kod-incelemesi** (omurga); (2) **dummy-key** ile 400/503 kısa-devre *çalıştırma* (Anthropic'e ulaşmadan — happy-path koşulmaz, sıfır çağrı); (3) **key-yok** offline UI (standalone Playwright). "API'ye ulaşmadan red" + "sıfır API çağrısı".
- **TK5 — S8 = suite re-teyit, iki gate ayrık.** axe WCAG-AA (`test:e2e`, CI-korunan, fail-on-regression) + Lighthouse a11y=100 çift-tema (manuel skor gate) — ikisi ayrı sinyal, ikisi de gate (Faz 8 dersi). Umami kod-tarafı + perf korunan taban + CI job durumu S8'e dahil; canlı +1 hariç.
- **TK6 — Degradasyon = standalone Playwright emulateMedia (reducedMotion/colorScheme) + viewport resize + no-WebGL shim;** S3 6 sayfaya (home + 5 alt sayfa hero) genişler. "low" DOM-attribute yok → gating-değişmezi ile doğrula (Faz 3 öğrenimi).
- **TK7 — Triyaj kapısı** (kapsam bulgu politikası): kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug → bu fazda düzeltme task'ı (CI a11y job otomatik korur); kapsam-dışı/ertelenmiş (brief-perf, `/bunker-os`→`/crew-os`, çıplak `/forum`→404, TB-C, dil-seti) → sahipli kayıt, yeniden litige edilmez.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 9` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 9.01 | TASK-9.01 | ✅ Tamamlandı | S1 — giriş/yönlendirme matrisi (curl): **30/30 200** (TR cookie+prefixsiz, EN/AR/DE/ES prefixli; lang doğru, AR rtl) · `/forum`→308→`/bulten`, `/forum/<slug>`→308→`/bulten/<slug>`→200 · çıplak `/bulten`→404 (M6 record-not-fix) · `/tr`→307→`/` (as-needed, beklenen) · bilinmeyen-locale→404 · `/en#sectors`→200. **Kapsam-içi bug yok** |
| 9.02 | TASK-9.02 | ✅ Tamamlandı | S5 + S6-render (curl/script-strip, 30 sayfa): **"Crew OS"** home 7×·showcase 5×·bülten 1× (5 dil) · **"Bunker" 30/30 görünür metinde yok** · yasak metafor/uydurma-sayı/sahte-online temiz ("canlı/live" meşru, niyet-bazlı) · **0 MISSING_MESSAGE** · leak metriği **=TR%0** (TR-leak yok) · AR `dir=rtl`+Arapça glif teyit. **Kapsam-içi bug yok.** Sahipli (record-not-fix): 4 alt sayfa (alpfit/vaka/bulten1/bulten2) non-TR ar/de/es **İngilizce-stale** (=EN%87–93) → versiyon-sınırı çevirisi (12 sayfa-locale; home+Crew OS 5 dilde tam) |
| 9.03 | TASK-9.03 | ✅ Tamamlandı | S8-suite + S6-parite: **`test:e2e` 52/52 yeşil** (axe WCAG-AA 0 ihlal, home 2 + subpages 50, retries:0 fail-on-regression) · **`test` 7/7 yeşil** (Vitest: 5-dil parite eksik-anahtar=fail + smoke + umami) · **CI run 28585690647** `fast`+`a11y` iki job `success` (HEAD 994ded9, auth'suz REST). **Kapsam-içi bug yok**, suite regresyonsuz. Lighthouse a11y=100 skor gate'i ayrı → TASK-9.04 (iki-gate TK5) |
| 9.04 | TASK-9.04 | ✅ Tamamlandı | S8-Lighthouse: **6/6 dark kanonik a11y=100** (0 düşen audit; structural tema-bağımsız) + **12/12 gerçek light/dark axe 0 ihlal** (LH motoru 4.12.1, `localStorage` tema zorlama + themeOk teyit) → **a11y=100 çift-tema mühürlü**. Perf korunan taban: masaüstü perf **100**/LCP 629ms/CLS 0 · mobil LCP **3171ms**(≈3164 comparable)/FCP 1516ms/CLS 0 — Lantern-deterministik metrikler regresyonsuz (perf 65/TBT 2000 = ağır-SwiftShader env anomalisi, kıyaslanamaz/regresyon değil). LCP elementleri değişmedi (hero metni). **Kapsam-içi bug yok**; brief mobil perf açığı record-not-fix (TK7). İki-gate TK5: 9.03 axe WCAG-AA + bu 9.04 Lighthouse structural |
| 9.05 | TASK-9.05 | ✅ Tamamlandı | S3 — degradasyon (standalone Playwright, `channel:'chrome'`+swiftshader): **57 kontrol 48✓·9 N/A·0✗**. FOUC yok (12/12, early==final tema); reduced→StaticFlow, no-WebGL shim→StaticFlow, mobil-low→FlowCanvas (3 LivingFlow sayfası, ayırt-edicilik sanity canvas=1 ile geçerli); AR-RTL×dark×reduced 6/6 (dir=rtl+dark+StaticFlow); 320/768/1440 taşma yok + CLS<0.1 (18/18, maks 0.025). **Kapsam-içi bug yok.** Nüans (record): 3 alt sayfa (vaka+2 bülten) LivingFlow yerine PageHeader → WebGL degradasyon N/A (bug değil, yalın hero tasarımı) |
| 9.06 | TASK-9.06 | ✅ Tamamlandı | S4 — kontroller/kalıcılık (standalone Playwright, `channel:'chrome'`+swiftshader): **17 kontrol 17✓·0✗**. Tema toggle→`html.dark`+localStorage+`themechange`+bg flip; reload kalıcı (early==final, FOUC yok); LivingFlow uniform canvas **sameNode** (remount yok→MutationObserver çevirir); dil-switcher path-koru (sub→EN=`/en/spor-salonu-yazilimi`, home→DE=`/de`) + Escape/dış-tık/klavye kapanış; klavye-only 14 öğe yeşil focus-visible (rgb(31,122,61)) + odak kaybı yok. **Kapsam-içi bug yok**; Faz 3 anchor path-düşme burada YOK (router.replace path korur). Ölçüm nüansı: Tailwind v4 `transition-colors` outline-color'ı anime eder→reduced-motion ile ölçüldü |
| 9.07 | TASK-9.07 | ✅ Tamamlandı | S2 — tam TR yolculuğu (curl+Playwright, TR cookie): **14 kontrol 14✓·0✗**. Bölüm sırası tam (top→how→sectors→bunker→forum→contact); çıkış href'leri mevcut (alpfit×3/bunker-os×2/vaka×1/2 bülten), dead-`#`/`/tr/`-sızıntı yok, home+5 hedef 0 MISSING + 5 alt-sayfa 200/tek-`<main>`. Anchor scroll top≈0 (Hero CTA #sectors/#contact + Nav #how/#bunker/#forum, ScrollTrigger stabil); **4 alt-sayfa client-nav çıkış** (SPA-marker korundu=full-reload yok) içerik bütün + **history-back dönüş** ana sayfayı bozmadan (6/6 bölüm). **Kapsam-içi bug yok**; #forum ilk-FAIL ölçüm artefaktıydı (Lenis lerp:0.1 settle → reload+poll ile top=0) |
| 9.08 | TASK-9.08 | ✅ Tamamlandı | S7 — chatbot 0-token: sanitizasyon kod-inceleme (apiKey-gate ilk `:21-24` → parse/whitelist/`slice(-12)`/sonda-user `:35-46` → `new Anthropic()` `:48`, tüm red öncesinde) + **dummy-key malformed 10/10 → 400** (Anthropic öncesi) + **key-yok 503 offline UI 8/8** (Playwright: dürüst offline metni, sahte-dot yok, UI takılmadı, tüm `/api/chat`=503, 200-stream hiç). **Toplam API çağrısı=0.** Kapsam-içi bug yok; TK4 kanıtı (key-yok→HER istek 503, naif malformed→400 yanlış-negatif) |
| 9.09 | TASK-9.09 | ✅ Tamamlandı | S9 — adversarial/holistik: `next build` **temiz** (37/37 SSG, 0 error/warn) + **0 MISSING_MESSAGE** (build + render 30 page-locale) · JS-off SSG 6/6 okunur (curl: h1+nav+metin 1272–4000 char, LivingFlow client-only markup'ta yok=beklenen) · race **14/14** (standalone Playwright `channel:'chrome'`+swiftshader): tema 11-tık→`html.dark`==localStorage==aria-pressed+reload kalıcı · dil zinciri en→de→ar→es→tr→final tutarlı (lang==url, AR dir=rtl) · scroll/anchor storm→6 bölüm sağlam+#how settle+pin/scrub kilidi yok+0 ScrollTrigger hatası. **Kapsam-içi bug yok**, kaynak kod değişmedi; ground-truth served==disk prerender (stale-server yok) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 9` oturumunda dolduruldu (2026-07-02). Test modu = **otonom** (discuss-phase kararı). Faz doğrulama fazı olduğundan (0 kaynak değişimi), UAT milestone (5 kriter) + S1–S9 + QUALITY eksenlerini **bağımsız yeniden-doğrular** — task kayıtlarını kör onaylamaz. Guardrail/parite (S6/S8) commit'li suite + CI ile; yolculuk/render/taksonomi curl ile; runtime (S3/S4/S9-race) standalone Playwright ile bağımsız koşuldu.

**Tarih:** 2026-07-02
**Toplam Senaryo:** 14 | **Geçen:** 14 | **Kalan:** 0

> **Bağımsız yeniden-doğrulama koşusu (fresh prod build `next start -p 3100/3101`, listening-PID teyitli, loadavg ~1):** guardrail/parite = commit'li suite + CI; yolculuk/render/taksonomi = curl (JS-off SSG); runtime (degradasyon/kontrol/race/chatbot) = standalone Playwright `channel:'chrome'`+swiftshader. **Adversarial not:** runtime ilk koşuda 3 "FAIL" çıktı → hepsi harness-selector/assertion artefaktı olarak teşhis edildi (LanguageSwitcher `<a href>` değil `router.replace` butonu; Chatbot floating buton değil inline `#chat` section; next-intl cookie-hop) → doğru selector'la 8/8 PASS. Kör onay yok — gerçek davranış doğrulandı.

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | S1 — Giriş/yönlendirme matrisi (30/30 200, `/forum`→308→`/bulten`, çıplak `/bulten`→404, bilinmeyen-locale→404, `/en#sectors`) | ✅ Geçti | curl bağımsız: **30/30 200** (TR cookie+prefixsiz, EN/AR/DE/ES prefixli) · `/forum`→**308**→`/bulten`, `/forum/<slug>`→308→`/bulten/<slug>` · çıplak `/bulten`→404 · `/xx`→404 · `/tr`→307→`/` · `/en`→200 |
| 2 | S2 — Tam TR yolculuğu (bölüm sırası + çıkış href'leri + alt-sayfa client-nav çıkış/dönüş, dead-link/boş bölüm yok) | ✅ Geçti | curl: bölüm sırası `how→sectors→bunker→forum→chat→contact` · çıkış href'leri mevcut (alpfit×3/bunker-os×2/vaka×1/2 bülten) · dead-`#`=0, `/tr/`-sızıntı=0 · Playwright: alt-sayfa dil-switch = client-nav (path-koru) + anchor scroll settle |
| 3 | S3 — Degradasyon mod kombinasyonları (light/dark FOUC yok · reduced→StaticFlow · no-WebGL · mobil-low · AR-RTL×dark×reduced · 320/768/1440 taşma yok + CLS<0.1) | ✅ Geçti | Playwright: WebGL sanity (webgl2+canvas=1, mode ayırt-edici) · **reduced-motion→StaticFlow** (canvas=0, svg=9) · home 0 JS hatası · AR dir=rtl. Tam 57-kontrol matrisi (mobil-low/no-WebGL/AR×dark×reduced/CLS) TASK-9.05 bugün (kod değişmedi) |
| 4 | S4 — Kontroller/kalıcılık (tema toggle+reload + LivingFlow uniform · dil-switcher path-koru/Escape/dış-tık/klavye · klavye-only focus-visible yeşil) | ✅ Geçti | Playwright: tema toggle→`html.dark`+`localStorage`+reload kalıcı · dil-switcher path-koru (sub→EN=`/en/spor-salonu-yazilimi`, home→DE=`/de`) · Escape/dış-tık kod-teyitli (`:35-46`). Klavye-only focus-visible TASK-9.06 (17/17) |
| 5 | S5 — Taksonomi/dürüstlük ("Crew OS" var / "Bunker" görünür metinde yok, 5 dil home+alt sayfa; uydurma-sonuç/sahte-online/yasak-metafor yok) | ✅ Geçti | curl+node visible-strip: **Crew OS 10/10** (home+showcase×5 dil) · **Bunker leak=0** · sahte-online=0 · yasak-metafor=0. 30-sayfa tam tarama TASK-9.02 |
| 6 | S6 — 5-dil bütünlük & non-TR tutarlılık (Vitest parite eksik-anahtar=fail · 0 MISSING_MESSAGE 30 sayfa-locale · AR-RTL · stale görünür-kopukluk yok) | ✅ Geçti | **Vitest 7/7 yeşil** (parite eksik-anahtar=fail) · curl render **0 MISSING_MESSAGE** (30 sayfa-locale) · AR `dir=rtl` (home+showcase). Bilinçli-stale non-TR = record (12 sayfa-locale, TASK-9.02, versiyon-sınırı) |
| 7 | S7 — Chatbot 0-token (sanitizasyon kod-inceleme · dummy-key malformed→400 · key-yok→503 offline UI sahte-online yok · toplam API çağrısı=0) | ✅ Geçti | kod-inceleme: apiKey gate `:21-23` ilk → parse 400 `:28-31` → whitelist+trim+`slice(-12)` `:36-42` → sonda-user 400 `:44-45` → `new Anthropic()` `:48` (tüm red öncesinde) · **dummy-key malformed 10/10→400** (system-only enjeksiyon dahil) · key-yok **503** offline UI (dürüst metin, Thinking kalmadı, sahte-dot yok, tüm `/api/chat`=503, 200-stream HİÇ) · **0 gerçek-token** |
| 8 | S8a — a11y=100 çift-tema (home + 5 alt sayfa Lighthouse, structural + axe 0 ihlal) | ✅ Geçti | CI `a11y` job **success** (axe canlı gate, HEAD) + TASK-9.04 bugün: 6/6 dark kanonik a11y=100 + 12/12 light/dark axe 0 ihlal (kod değişmedi → Lighthouse skoru sabit) |
| 9 | S8b — axe suite `test:e2e` 52 yeşil + Vitest `test` 7 yeşil (fail-on-regression) | ✅ Geçti | Vitest **7/7** yerelde yeniden-koşuldu yeşil · `test:e2e` 52 CI `a11y` job'unda **success** (HEAD `1863f29`, retries:0 fail-on-regression) |
| 10 | S8c — Umami script kod-tarafı tüm sayfa/locale (afterInteractive + `data-domains`; canlı +1 kapsam dışı) | ✅ Geçti | curl served HTML: **30/30 sayfa-locale** `umami.kiwiailab.com/script.js` + `data-website-id` mevcut (afterInteractive flight, `data-domains=kiwiailab.com`). Canlı panel +1 kapsam dışı (v0.2 release, DECISIONS 2026-07-01) |
| 11 | S8d — Perf korunan taban regresyonsuz (mobil LCP≈3164ms / masaüstü 100 / CLS≈0) | ✅ Geçti | TASK-9.04 bugün (kod değişmedi): masaüstü perf 100/LCP 629ms/CLS 0 · mobil LCP 3171ms(≈3164)/CLS 0 — Lantern-deterministik metrikler regresyonsuz. Brief mobil perf açığı record-not-fix (TK7, gerçek-cihaz duvarı) |
| 12 | S8e — CI (`fast` + `a11y`) yeşil (HEAD `1863f29`) | ✅ Geçti | REST API: run **28591574725** `fast (build+vitest)` **success** + `a11y (playwright+axe)` **success**; önceki 5 koşu da success |
| 13 | S9 — Adversarial/holistik (JS-off SSG okunur · hızlı tema/dil race · scroll/anchor storm ScrollTrigger kararlı · `next build` temiz + 0 MISSING) | ✅ Geçti | `rm -rf .next && build` **temiz** (exit 0, 0 error/warn/MISSING) · JS-off SSG okunur (curl render metin+Crew OS) · **tema 11-tık race** `html.dark`==localStorage (desync yok) · dil zinciri her hop tutarlı (AR dir=rtl) · **anchor/scroll storm** → 5/5 bölüm sağlam + `#how` settle + **0 JS/ScrollTrigger hatası** |
| 14 | QG — Güvenlik ekseni (security-review + faz 0 kaynak değişimi + chat sanitizasyon; npm audit 3 moderate = TB-C out-of-scope) | ✅ Geçti | `/security-review` **0 yüksek-güven bulgu** (umami next/script statik, FOUC `dangerouslySetInnerHTML` %100 statik-literal, messages JSON enjeksiyon yok, secret yok) · faz **0 kaynak değişimi** (docs-only) · chat sanitizasyon S7'de doğrulandı. **npm audit 3 moderate** (postcss build-time XSS transitif; statik-site istismar edilemez; "fix"=anlamsız major downgrade) = **TB-C bilinçli-ertelenmiş**, record-not-fix |

### Otomatik Kontrol Bulguları (Adım 1)

- **CI/CD (GitHub Actions):** run `28591574725` (HEAD `1863f29`) — `fast (build+vitest)` **success** + `a11y (playwright+axe)` **success**; önceki 5 koşu da success. Düzeltme gerektiren başarısızlık **yok**.
- **Bağımlılık taraması (npm audit):** 3 moderate — `next`/`next-intl` transitif, kök `postcss <8.5.10` (build-time CSS-stringify XSS). Statik-site tehdit modelinde istismar edilemez (build-zamanı, geliştirici-yazımı CSS); önerilen "fix" `next@9.3.3` semver-major downgrade (anlamsız). **TB-C** olarak bilinçli-ertelenmiş (2→3'e çıktı); record-not-fix, düzeltme task'ı açılmadı (kapsam dışı, TK7).
- **Security-review (`/security-review`):** faz kaynak değişimi 0 olsa da tüm branch (v0.2 birikimi, 14 kod dosyası) `main`'e ilk merge öncesi tarandı → **0 yüksek-güven bulgu**. Chat API route değişmedi; umami/FOUC/i18n/kozmetik değişimler güvenli.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 9` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 9` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi & Degradasyon | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |
| Yerelleştirme & RTL | ✅ / ⚠️ / ❌ | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-02
**Son Güncelleme:** 2026-07-02 — verify-phase 9 (UAT) tamamlandı: **14/14 senaryo ✅ · kapsam-içi bug yok · 0 düzeltme task'ı**. Otomatik kontroller: CI `fast`+`a11y` yeşil (HEAD `1863f29`), security-review 0 yüksek-güven bulgu, npm audit 3 moderate = TB-C (out-of-scope, record). Bağımsız yeniden-doğrulama (fresh prod build :3100/:3101, PID-teyitli): S1 route 30/30 · S5 taksonomi Crew OS 10/10 & Bunker leak 0 · S6 Vitest 7/7 + 0 MISSING (30 sayfa-locale) · S7 malformed 10/10→400 + no-key 503 offline + 0 token · S8 Umami 30/30 kod-tarafı + a11y çift-tema (9.04) + CI · S3/S4/S9 runtime Playwright (tema race coherent, dil path-koru, reduced→StaticFlow, anchor storm 0 hata). Adversarial not: runtime ilk-koşu 3 "FAIL" harness-selector artefaktı → doğru selector'la 8/8. Adım=review → sıradaki: **review-phase 9**. (Task-icra detayları: Task Listesi 9.01–9.09 + arşiv.)
