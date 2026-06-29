# Phase 3: v0.1 Versiyon-Sonu Senaryo Testi

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.1'in (ana sayfa TR içerik & ses revizesi) versiyon-sonu **Senaryo Testi** fazı — zorunlu `prd-review` öncesi son kapı. Faz 1 (içerik) ve Faz 2 (teknik borç) **task-seviyesi** UAT'larının (15 + 14 senaryo) göremediği **dikişleri, tam kullanıcı yolculuklarını, mod kombinasyonlarını ve adversarial durumları** uçtan-uca doğrular. İş **doğrulama**: yeni içerik/feature üretilmez. Bulgu çıkarsa kapsam-içi (ana sayfa) gerçek bug'lar düzeltme task'ı olur; kapsam-dışı / zaten-ertelenmiş kalemler kaydedilip yönlendirilir.

**Milestone:** *(Faz 2 dersi uygulandı: versiyon-sonu doğrulama milestone'u "ölç + kaydet + karar ver" olarak yazılır — geçiş peşinen varsayılmaz.)*
1. Ana sayfa uçtan-uca senaryo kataloğu (S1–S8) otonom koşuldu;
2. her senaryonun sonucu (geçti / bulgu) kayıt altına alındı;
3. bulgular **triyaj** edildi — kapsam-içi gerçek bug'lar düzeltme task'ına, kapsam-dışı / ertelenmiş kalemler sahipli kayda;
4. **TR yolculuğu birincil** olarak bütünsel-tutarlı doğrulandı + **non-TR yüzeyleri tutarlı** (parite / render bütünlüğü / AR-RTL aynalama; bilinçli-stale değerler görünür kopukluk yaratmıyor) teyit edildi.

### Feature Listesi

(Senaryo testi çapraz/doğrulama fazıdır — "feature" değil **senaryo grupları (validation units)**; her grup tetiklediği birincil modüle eşlenir. MODULE-MAP ve modules/ referansı: M1–M6.)

| Senaryo Grubu | Modül | Açıklama |
|---------------|-------|----------|
| S1: Giriş noktaları & yönlendirme matrisi | M4 (+M6) | 5 dil ana sayfa (TR prefixsiz + /en /ar /de /es), bilinmeyen locale fallback, `/forum`→`/bulten` redirect (+slug), derin-link `/en#sectors`, URL varyantları |
| S2: Tam TR yolculuğu (top→bottom) | M2 (+M3) | Hero → ikincil CTA "İşleyen örnekleri gör" → sektörler (gym tek-otomasyon + Alpfit rozeti/CTA) → 4-adım → Crew OS → Forum → Footer; CTA hedefleri doğru, kopuk link/boş bölüm yok |
| S3: Mod kombinasyonları (Living Flow degradasyon) | M1 (+M3) | light/dark (FOUC yok), reduced-motion (statik SVG, içerik gizli kalmaz), no-WebGL (StaticFlow), mobil "low", **AR-RTL × dark × reduced birlikte**, 320/768/1440 taşma yok + near-zero CLS |
| S4: Kontroller & kalıcılık | M3 (+M1/M4) | tema toggle (localStorage + reload kalıcılık + Living Flow uniform), dil-switcher (path+anchor koru, klavye/Escape/dış-tık), **klavye-only yolculuk** + focus-visible yeşil outline |
| S5: Taksonomi & dürüstlük tutarlılığı (çapraz/sahipsiz) | M2 (+M4) | "Crew OS" her yüzeyde / "Bunker OS" hiçbir görünür yüzeyde yok (5 dil); render'da uydurma müşteri-sonucu / sahte "● online" / yasak metafor yok |
| S6: 5-dil bütünlük & non-TR tutarlılığı (versiyon-sonu çekirdek) | M4 (+M2) | parite 183 (MISSING_MESSAGE yok), TD1-senkron 3 kalem hizalı, **bilinçli-stale non-TR tutarlı mı** (anahtar var, render bütün, yarım-çeviri kopukluğu yok), AR-RTL aynalama |
| S7: Chatbot (0-token: offline + sanitizasyon) | M5 | key-yok offline UI (sahte-online-yok) + sanitizasyon kod-inceleme + malformed-input kısa-devre (rol enjeksiyonu / boş / sonda-user-yok → API'ye ulaşmadan red) + stream-kopması UI takılmaz |
| S8: Adversarial / holistik kırma | tümü | JS-kapalı SSG okunabilirlik, hızlı dil/tema toggle race, hızlı scroll/anchor zıplama (ScrollTrigger kararlılığı), `next build` temiz (regresyon tabanı) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 3` oturumunda dolduruldu (2026-06-28).

### Alınan Kararlar

- **Faz tipi = versiyon-sonu Senaryo Testi (sabit faz).** Versiyon Sonu Durumu: `senaryo_testi`. v0.1'in zorunlu `prd-review` öncesi uçtan-uca doğrulaması. Doğrulama fazı — yeni feature üretilmez; çekirdek soru: task-UAT'larının göremediği dikiş/yolculuk/çapraz/adversarial katmanda v0.1 tutarlı mı.
- **Kapsam sınırı = ana sayfa uçtan-uca + çıkışlar** (kullanıcı kararı). v0.1 ana sayfa yolculuğu derinlemesine; CTA/nav/chatbot/dil-tema geçişlerinin doğru çalıştığı teyit edilir, ama alt sayfalar (Alpfit, Crew OS showcase `/bunker-os`, vaka, bülten) **derin denetlenmez** — yalnız çıkış linkinin doğru açıldığı kontrol edilir. Gerekçe: v0.1 = ana sayfa revizesiydi (her iki faz retrosunda alt sayfalar bilinçle v0.1-dışı); cerrahi felsefe + "az context = yüksek kalite".
- **TR birincil öncelik** (kullanıcı kararı 2026-06-28). TR yolculuğu derin/bütünsel doğrulanır; non-TR (EN/AR/DE/ES) yalnız **tutarlılık** katmanında (parite + render bütünlüğü + AR-RTL aynalama) — içerik-kalite derin denetimi DEĞİL. "Bilinçli-stale non-TR değerleri görünür kopukluk yaratıyor mu?" in-scope; stale içeriğin *kalitesi* out-of-scope (versiyon-sınırına ertelendi — ILKELER "TR tek kaynak", DECISIONS 2026-06-27 dil stratejisi).
- **Test modu = otonom** (kullanıcı kararı). Playwright/curl/grep ile mekanik yürütme; bulgular kullanıcıya raporlanır. Önceki iki fazla tutarlı (proje genelinde test altyapısı yok — QUALITY §8 aspirasyonel).
- **Bulgu politikası = keşfet + kaydet + triyaj** (kullanıcı kararı). Kapsam-içi (ana sayfa) gerçek bug → bu fazda düzeltme task'ı. Kapsam-dışı veya zaten-ertelenmiş (a11y/perf açığı, alt sayfa, `/bunker-os` route) → sahipli kayıt + yönlendirme, burada yeniden açılmaz. Bilinen a11y/perf açığı (a11y 89: marka-yeşili kontrast + geçersiz `<dl>` + dil-switcher aria-mismatch; mobil perf 87 / LCP 3.1s — DECISIONS 2026-06-28) senaryo testte yüzeye çıkarsa **"sahipli/ertelenmiş"** işaretlenir, yeniden litige edilmez.
- **Chatbot = 0-token (offline + sanitizasyon)** (kullanıcı kararı). API maliyeti gereksiz çünkü: (a) v0.1 chatbot'a hiç dokunmadı → bu versiyonun getirdiği regresyon riski yok; (b) canlı streaming yolu prod'da (kiwiailab.com) zaten kanıtlı; (c) 0-token test değeri zaten degradasyon + güvenlik tarafında. **Lisans gerçeği:** site `@anthropic-ai/sdk` + `ANTHROPIC_API_KEY` (token-başına ücretli Anthropic API) kullanır; Claude.ai / Claude Code aboneliği bu sunucu-taraflı SDK çağrısını **kimlikleyemez** (ayrı faturalama sistemi) — mevcut lisans chatbot'u besleyemez. Test yüzeyi: key-yok zarif offline yolu (QUALITY §6 kabul kriteri) + girdi sanitizasyonu kod-incelemesi + malformed-input kısa-devre (rol whitelist / boş-filtre / son-12-mesaj / sonda-user-zorunlu → API'ye ulaşmadan). **Sıfır API çağrısı.** Canlı happy-path bu fazda test edilmez.
- **Milestone "ölç + kaydet + karar ver" çerçevesinde yazıldı** (Faz 2 dersi). Geçiş peşinen varsayılmaz: milestone "tüm senaryolar geçer" değil; "senaryolar koşulur + bulgular kaydedilir + triyaj edilir + TR bütünsel / non-TR tutarlı teyit edilir".

### Kullanıcı Tercihleri

- **Öncelik TR** (2026-06-28): "şu an önceliğimiz TR". Odak TR yolculuğu; non-TR tutarlılık-kontrolü düzeyinde kalır.
- **API maliyetine karşı**: chatbot canlı test edilmez; 0-token yol seçildi.
- **Senaryo kataloğu yeterli**: kullanıcı ek persona / kırılma-noktası eklemedi ("bu işler yeterli gibi"). S1–S8 iskeleti onaylandı.

### Kapsam Dışı

- **Alt sayfa derin denetimi** (Alpfit `/spor-salonu-yazilimi`, Crew OS showcase `/bunker-os`, vaka `/vaka-calismalari`, bülten `/bulten/*`) — yalnız çıkış-linki doğruluğu kontrol edilir; içerik/etkileşim derin test edilmez (v0.1 dışı).
- **Canlı chatbot streaming testi** — 0-token kararı (canlı yol prod'da kanıtlı + v0.1'de dokunulmadı). Merge sonrası prod gözle-doğrulama normal disiplinle yapılır (memory Süreç Disiplinleri).
- **non-TR içerik-kalite derin denetimi** — bilinçli-stale (versiyon-sınırı); yalnız tutarlılık (parite / render / RTL) test edilir.
- **Bilinen a11y/perf açığının düzeltilmesi** (a11y 89, mobil perf 87 / LCP 3.1s) — sahipli/ertelenmiş (DECISIONS 2026-06-28, adanmış a11y/perf fazı/versiyonu). Senaryo testte çıkarsa kaydedilir, düzeltilmez.
- **`/bunker-os` → public `/crew-os` + redirect kararı** (M6 açık konu) — görsel/SEO versiyonuna ertelendi.
- **Test altyapısı kurulumu (D1)** — adanmış teknik faz adayı; "test = otonom UAT" geçici.
- **Yeni içerik/feature** — senaryo testi doğrulama fazıdır, üretim yapmaz (bulgu → düzeltme task'ı istisnası hariç).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 3` oturumunda dolduruldu (2026-06-28). Araştırma konusu: S1–S8 senaryolarını **nasıl otonom koşarız** (yeni feature değil — doğrulama metodolojisi). Kapsam tartışmasındaki kararlar baz alındı (otonom, TR öncelik, keşfet+kaydet+triyaj, chatbot 0-token).

### Değerlendirilen Yaklaşımlar

Çekirdek soru: senaryoları hangi araçla mekanik yürüteceğiz. Üç strateji değerlendirildi (QUALITY eksenleri: §1 craft regresyonu yakalama gücü, §3 perf-gözlem, §4 i18n/RTL, §6 degradasyon):

- **A — Saf tarayıcı (Playwright her şey):** Tek tutarlı sürücü, gerçek runtime davranışı. **Eksi:** SSG/HTTP-seviyesi kontroller (redirect status, locale fallback, parite, `next build` temizliği) için ağır, yavaş ve deterministik değil; reduced-motion/no-WebGL emülasyonu MCP katmanında kırılgan. Bu seviye için fazla maliyetli.
- **B — Saf HTTP (curl/grep her şey):** Hızlı, deterministik, 0 tarayıcı. **Eksi:** client-runtime davranışı **görülemez** — tema toggle (localStorage), dil-switcher, klavye yolculuğu, focus-visible, Living Flow degradasyon modu (client-only, `ssr:false`), ScrollTrigger, toggle race. S3/S4'ün ve S2/S7/S8'in bir kısmının çekirdeği kaçar.
- **C — Hibrit (SEÇİLEN):** Her senaryoyu **en ucuz yeterli araca** eşle — markup/SSG/HTTP-seviyesi (S1, S5, S6, S2'nin link tarafı, S7-HTTP, S8-build/SSG) → curl/grep/node; client-runtime (S3, S4, S2/S7/S8'in runtime tarafı) → Playwright MCP. Gerekçe: kapsam tartışmasının "Playwright/curl/grep ile mekanik yürütme" kararıyla birebir; "az context/araç = yüksek kalite + deterministik tekrar" (ILKELER kalıcılık).

**Senaryo → araç eşlemesi:**

| Senaryo | Birincil araç | Ne kontrol edilir |
|---------|---------------|-------------------|
| S1 Giriş/yönlendirme | curl (`-I`/`-sS`) + grep | 5 locale 200, `/forum`→`/bulten` **308** (permanent), `/en#sectors` SSG, bilinmeyen-locale davranışı **gözlemlenir** (404 mı TR-fallback mı — peşinen iddia edilmez) |
| S2 TR yolculuğu | curl+grep (link/href) + Playwright (CTA/anchor scroll) | Hero CTA `#sectors`, nav anchor'ları, gym/Alpfit CTA hedefleri, kopuk link/boş bölüm yok |
| S3 Degradasyon modları | **Playwright MCP** (emulateMedia + resize) | reduced-motion→StaticFlow (canvas yok), no-WebGL→StaticFlow, mobil→"low", **AR-RTL×dark×reduced birlikte**, 320/768/1440 yatay taşma yok, FOUC yok |
| S4 Kontroller/kalıcılık | **Playwright MCP** | tema toggle+reload kalıcılık+Living Flow uniform, dil-switcher (path+anchor koru, Escape/dış-tık/klavye), klavye-only yolculuk + yeşil focus-visible |
| S5 Taksonomi/dürüstlük | curl+grep (render HTML, 5 dil) | **görünür metinde** "Crew OS" var / "Bunker" yok, uydurma sonuç / sahte "● online" / yasak metafor yok |
| S6 5-dil bütünlük | node (key-diff) + curl+grep (`MISSING_MESSAGE`) | parite **zaten 183/temiz** (aşağıda); runtime render'da MISSING_MESSAGE yok; bilinçli-stale non-TR görünür kopukluk yaratmıyor; AR-RTL aynalama |
| S7 Chatbot 0-token | kod-inceleme + curl POST (malformed) + Playwright (offline UI) | sanitizasyon doğruluğu; 400/503 kısa-devre (API'ye ulaşmadan); key-yok offline UI (sahte-online yok); stream-kopması UI takılmaz (kod) |
| S8 Adversarial/holistik | Bash (`next build`) + curl (JS-off SSG) + Playwright (race) | build temiz (regresyon tabanı), JS-kapalı içerik okunur (SSG), hızlı toggle/scroll race kararlı |

### Ortam Kararı (kanonik)

**Fresh prod build (`next build` → `next start`) = kanonik doğrulama ortamı.** Gerekçe: (a) canlıya giden çıktı budur — SSG prerender'ı gerçek (`.next/server/app/*.html` ground-truth), redirect/middleware prod davranışı; (b) `next build` zaten S8'in "temiz build = regresyon tabanı" kalemi; (c) dev server'ın HMR/error-overlay/minify-yok gürültüsü versiyon-sonu doğrulamayı kirletir. **dev server opsiyonel** (yalnızca React dev uyarılarını avlamak için tali). Memory disiplini: serve eden **listening-PID az önce başlatılan process mi** teyit (temiz port; stray `next-server` yanlış-negatifi → [Süreç Disiplinleri](../MEMORY.md)).

### Kullanılacak Araçlar/Kütüphaneler

- **Playwright MCP** (oturuma bağlı `mcp__playwright__browser_*` — **projede kurulu değil**, package.json'a dokunulmaz): S3/S4 + runtime senaryolar. Sürücü ben'im (otonom), proje test-runner'ı değil.
- **curl** (`/usr/bin/curl`): HTTP status / redirect / SSG markup çekme.
- **grep + node v24** (`/home/kivanc/.nvm/...`): markup taraması, i18n key-diff (aşağıdaki script), `MISSING_MESSAGE` avı. **jq** (`/usr/bin/jq`) mevcut — JSON için alternatif.
- **`next build` / `next start`** (package.json script: build/start): kanonik ortam + S8 build-temizliği.
- **ss/lsof** (`/usr/bin/ss`, `/usr/bin/lsof`): listening-PID teyidi.
- **`doc-scan.sh` + `cat /proc/loadavg`**: perf-bitişik gözlemden (CLS/LCP) önce host yükü (memory Süreç Disiplinleri; şu an load 0.85 = düşük).

### Dikkat Edilecekler

> Precondition tanımlayıcı kaynakları işaretli: **(repo)** = repoda tanımlı, tanım sitesi verili · **(dış)** = dış sistem · **(lib)** = kütüphane konvansiyonu. Bu **kayıttır, doğrulama değil** — referans-gerçeklik tutarlılığını verify-plan denetler.

- **Chatbot `apiKey` kontrolü sanitizasyondan ÖNCE gelir** **(repo:** `src/app/api/chat/route.ts:21-24` ardından `:35-46`**).** Sonuç: **key yokken HER istek 503** döner — malformed-input 400 kısa-devresine (geçersiz JSON / boş / sonda-user-yok) **ulaşılamaz**. 0-token test tasarımı buna bağlı: (a) 400 yollarını *çalıştırarak* görmek için **dummy/geçersiz key** set edilir (400'ler `new Anthropic()`'ten önce döner → Anthropic'e ulaşmaz, **sıfır API çağrısı/token**); (b) key-yok offline yolu **ayrı** koşulur (503 + UI offline). Naif "key-yok + malformed → 400 bekle" **yanlış-negatif** verir (503 alır).
- **Redirect 301 değil 308.** `next.config.ts:13-18` `permanent: true` → Next.js **308** (method-koruyan). curl beklentisi 308 **(repo).**
- **Tema = localStorage + `html.dark` sınıfı, prefers-color-scheme DEĞİL** **(repo:** `[locale]/layout.tsx:73-78` FOUC script + ThemeToggle**).** Playwright `emulateMedia({colorScheme})` temayı **çevirmez**; dark testi = localStorage set + reload **veya** toggle'a tıkla. (prefers-color-scheme yalnız localStorage boşken FOUC fallback'i.)
- **Living Flow client-only (`dynamic ssr:false`)** **(repo:** `LivingFlow.tsx:6,29-42`**).** Degradasyon modu (high/low/static) **client'ta** seçilir → curl markup'ta canvas/StaticFlow **yok** (yalnız `mode:"idle"` base-wash gradient'i SSR'da var). S3 **zorunlu tarayıcı**. reduced-motion için Playwright `emulateMedia({reducedMotion:'reduce'})`; MCP emülasyonu kırılgan çıkarsa **fallback**: gating kod-incelemesi (`matchMedia` + globals.css media query) + DevTools rendering. no-WebGL: context'te WebGL kapatma / JS ile `getContext` shim.
- **"Bunker" anahtar-adı/komponent/route ≠ render yüzeyi.** messages JSON'da `bunker` bir **namespace anahtarı**, değer her dilde **"Crew OS"** **(repo:** `messages/*.json:10`**).** `Bunker.tsx` komponent adı ve `/bunker-os` route href'i **iç kalıntı** (route public-`/crew-os` kararı ertelendi — M6). S5 yalnız **render edilen görünür metni** denetler; kaynak kodu/URL'yi değil.
- **i18n parite zaten temiz: 183 leaf-key, 5 dilde 0 eksik / 0 fazla** **(repo:** `messages/{tr,en,ar,de,es}.json`, bu oturumda node ile doğrulandı**).** Yani S6 **yapısal parite GREEN**; iş runtime `MISSING_MESSAGE` avı (render'da) + bilinçli-stale non-TR'nin görünür-kopukluk yaratmaması. `MISSING_MESSAGE` = **(lib)** next-intl runtime hata string'i.
- **Anchor hedefleri mevcut:** `#how #sectors #bunker #forum #chat` **(repo:** `SectorSolutions.tsx:46`, `HowItWorks.tsx:45`, `Bunker.tsx:19`, `Forum.tsx:12`, `Chatbot.tsx:71`; Hero CTA→`#sectors` `Hero.tsx:77`; nav `Nav.tsx:21-24`**).** S1 `/en#sectors` + S2 CTA geçerli.
- **Perf/a11y bulguları = sahipli/ertelenmiş, record-not-fix.** S3'te CLS/taşma, S2/S4'te a11y açığı (a11y 89: marka-yeşili kontrast + geçersiz `<dl>` + dil-switcher aria-mismatch; mobil perf 87 / LCP 3.1s — DECISIONS 2026-06-28) yüzeye çıkarsa **kaydet, yeniden litige etme**. Perf-bitişik ölçümden önce `/proc/loadavg` (memory).
- **Stray/stale `next-server` yanlış-negatifi** (memory Süreç Disiplinleri): önceki oturumdan port tutan eski build edit-öncesi metni sunabilir → "metin bulunamadı" yanılır. Test başında portu dinleyen PID'nin **fresh build** olduğunu teyit; şüphede `.next/server/app/*.html` ground-truth.

### Teknik Kararlar

- **TK1 — Hibrit araç eşlemesi (Yaklaşım C).** Yukarıdaki senaryo→araç tablosu plan-phase'in task sınırlarını besler: HTTP-seviyesi senaryolar (S1/S5/S6) bir grup, tarayıcı-runtime (S3/S4) ayrı grup, çapraz (S2/S7/S8) hibrit. Gerekçe: deterministik tekrar + minimum araç yükü.
- **TK2 — Kanonik ortam = fresh prod build, PID-teyitli.** dev tali. Gerekçe: SSG/redirect ground-truth + S8 build-tabanı + memory disiplini.
- **TK3 — Chatbot 0-token üç-katman:** (1) sanitizasyon **kod-incelemesi** (omurga); (2) **dummy-key** ile 400/503 kısa-devre *çalıştırma* (yalnız Anthropic'e ulaşmadan dönen girdiler — happy-path **koşulmaz**, sıfır API çağrısı korunur); (3) **key-yok** offline UI (Playwright). Kapsam kararının "API'ye ulaşmadan red" + "sıfır API çağrısı"yla uyumlu.
- **TK4 — i18n iki-katman doğrulama:** node key-diff script (yapısal parite — zaten 183/temiz) + 5×render sayfada `MISSING_MESSAGE` grep (runtime boşluk) + bilinçli-stale görünür-kopukluk gözlemi. Yapısal parite GREEN olduğundan ağırlık runtime+tutarlılıkta.
- **TK5 — Degradasyon = Playwright emulateMedia (reducedMotion/colorScheme) + viewport resize + no-WebGL shim;** MCP emülasyonu yetmezse fallback gating-kod-incelemesi. S3 tarayıcı-zorunlu (client-only).
- **TK6 — Triyaj kapısı:** kapsam-içi (ana sayfa) gerçek bug → bu fazda düzeltme task'ı; kapsam-dışı/ertelenmiş (a11y/perf, alt sayfa, `/bunker-os`) → sahipli kayıt, yeniden açılmaz (kapsam tartışması bulgu politikası).

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 3` oturumunda dolduruldu (2026-06-29). 9 task: 1 kanonik-ortam tabanı + S1–S8 senaryo grupları (her grup tek odaklı task). Sıra: önce HTTP/SSG (curl/node, ucuz/deterministik), sonra tarayıcı-runtime (Playwright). Hepsi TASK-3.01'e bağlı. Triyajda kapsam-içi gerçek bug çıkarsa emergent fix-task (3.10+) açılır (TK6).

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 3.01 | TASK-3.01 | ✅ Tamamlandı | Kanonik ortam + build-temizliği tabanı (S8-build; prod serve + PID teyit) |
| 3.02 | TASK-3.02 | ✅ Tamamlandı | S1 giriş/yönlendirme matrisi (curl: 5 locale 200, 308 redirect, derin-link, bilinmeyen-locale gözlem) — bulgu: çıplak `/forum`→404 (sahipli/ertelenmiş, görsel/SEO) |
| 3.03 | TASK-3.03 | ✅ Tamamlandı | S5 taksonomi & dürüstlük (curl+grep 5 dil render görünür metin): Crew OS 5×7 var / Bunker görünür yüzeyde 0 (iç kalıntı ayrıştırıldı) / yasak metafor 0 / sahte presence 0 / uydurma sonuç 0 (dürüstlük konvansiyonu 5 dilde) — kapsam-içi bug yok |
| 3.04 | TASK-3.04 | ✅ Tamamlandı | S6 5-dil bütünlük & non-TR tutarlılık: parite 5 dil × 183 leaf-key 0 eksik/fazla; render MISSING_MESSAGE 0; TD1-senkron 3 kalem (report/gym/CTA) hizalı+çevrili; render TR-leak 0 (non-TR esasen tam çevrili); AR dir=rtl doğru — kapsam-içi bug yok |
| 3.05 | TASK-3.05 | ✅ Tamamlandı | S2 tam TR yolculuğu: 8 bölüm sırayla bütün/boş yok + 4-adım; hero ikincil CTA "İşleyen örnekleri gör"→#sectors; 8/8 anchor/CTA doğru scroll (Lenis); gym tek-otomasyon + "Canlı—Alpfit" + Alpfit client-nav→/spor-salonu-yazilimi; 6/6 iç link 200, kopuk yok, konsol 0-error — kapsam-içi bug yok |
| 3.06 | TASK-3.06 | ✅ Tamamlandı | S3 Living Flow degradasyon (Playwright MCP fresh-prod-serve): light/dark+FOUC yok; reduced & no-WebGL→StaticFlow (canvas=0, Reveal 12/12 görünür); mobil→low (gating-değişmezi); AR-RTL×dark×reduced birlikte (StaticFlow=LIGHT_INK); 320/768/1440 taşma yok+CLS=0; tüm modlar 0-error — kapsam-içi bug yok |
| 3.07 | TASK-3.07 | ✅ Tamamlandı | S4 kontroller & kalıcılık (Playwright MCP): tema toggle+localStorage+reload kalıcı (FOUC yok) + Living Flow uniform canlı (FlowCanvas-aynı MutationObserver fired); dil-switcher aria/Escape/dış-tık/klavye(Enter+Tab) + path korur (home+subpage); klavye 16/16 distinct durak + focus-visible 2px green offset3px; 0-error — bulgu: anchor düşüyor (path korunur, record-not-fix) + bilinen aria-mismatch (record-not-fix) |
| 3.08 | TASK-3.08 | ✅ Tamamlandı | S7 chatbot 0-token: sanitizasyon kod-inceleme (rol whitelist+boş-filtre+son-12+sonda-user); dummy-key + 6 malformed → 400 (Anthropic'e ulaşmadan); key-yok → 503 (apiKey-gate-önce; naif "key-yok+malformed→400" yanlış-negatifi kanıtlandı) + Playwright offline UI (sahte-online yok, yeşil halka=custom cursor; UI takılmaz); stream-kopması kod-teyidi; **toplam API çağrısı = 0** — kapsam-içi bug yok |
| 3.09 | TASK-3.09 | ⬜ Bekliyor | S8 adversarial/holistik (JS-off SSG okunabilirlik + toggle/scroll race; build-clean 3.01'de) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Yerelleştirme & RTL | ✅ / ⚠️ / ❌ | ... |
| Modülerlik & Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi & Degradasyon | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-06-28
**Son Güncelleme:** 2026-06-29 — run-task TASK-3.08 ✅ (S7 chatbot 0-token). Sanitizasyon kod-inceleme (route.ts:35-46 rol whitelist + boş-filtre + son-12 + sonda-user; apiKey kontrolü :21-24 sanitizasyondan ÖNCE) + dummy-key 6 malformed→400 (geçersiz JSON / `{}` / boş [] / rol-enjeksiyon(system) / boş-içerik / sonda-assistant; `new Anthropic()`'ten önce → Anthropic'e ulaşmaz → sıfır token) + key-yok→503 (geçerli mesaj + malformed dahil → naif "key-yok+malformed→400" yanlış-negatifi kanıtlandı) + Playwright `browser_run_code_unsafe` offline UI (mesaj→503→offline mesajı render; sahte-online yok: `#chat .bg-green=0`, yeşil halka=site-geneli custom cursor M3; UI takılmaz: Thinking=0/input temizlendi/retype'ta Gönder aktif; konsol tek "hata"=beklenen 503 network-log) + stream-kopması kod-teyidi (route.ts:69-77 fallback enqueue + finally close; Chatbot.tsx reader done→break + finally setStreaming(false)). Kanonik fresh-prod-serve iki konfig: dummy-key (fresh PID 3508777) + key-yok (fresh PID 3511140), listening-PID teyit, Jun28 stray 12708 portu tutmuyordu/dokunulmadı, iş sonu kill; build `rm -rf .next && next build` exit 0 temiz (0-uyarı, 37 statik sayfa = S8-build regresyon tabanı re-teyit). **Toplam API çağrısı = 0.** Triyaj (TK6): kapsam-içi bug YOK, kaynak kod değişmedi. Adım: run-task (TASK-3.09). Detay: archive/TASK-3.08.md + git log.
