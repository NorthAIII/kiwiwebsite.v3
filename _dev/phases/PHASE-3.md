# Phase 3: v0.1 Versiyon-Sonu Senaryo Testi

**Durum:** ✅ Tamamlandı

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
| 3.09 | TASK-3.09 | ✅ Tamamlandı | S8 adversarial/holistik: JS-off SSG (TR+AR curl) tüm bölüm/başlık/gövde/CTA okunur + canvas=0 (client-only) + AR dir=rtl/0-MISSING + kritik içerik gömülü değil; tema race state-tutarlı (class=ls=pressed=icon) + dil race son-kazanır/tutarlı (burst+ardışık); scroll/anchor son hedef tam iner (ardışık/rAF/80ms) + 30/30 reveal 0-takılı + scroll fonksiyonel + 0 konsol hatası — kapsam-içi bug yok (aynı-tick anchor burst=synthetic-only record-not-fix) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Faz 3 bir **senaryo-testi fazıdır**: 9 task (3.01–3.09) S1–S8'i zaten otonom koştu. Bu UAT, faz-seviyesi **bütünsel re-konfirmasyon** — milestone kriterlerini + QUALITY eksenlerini + triyaj çıktısını **taze bir prod build'e** karşı bağımsız doğrular (task kayıtlarını yalnız alıntılamaz). Senaryolar S1–S8 validation unit'lerine + milestone'a eşlenir; otomatik kontrol bulguları (Adım 1) da kayda alınır.

**Tarih:** 2026-06-29
**Toplam Senaryo:** 10 | **Geçen:** 10 | **Kalan:** 0

**Ortam:** Kanonik fresh-prod (`rm -rf .next && next build` → `next start -p 3100`, key-yok); fresh listening-PID 83186 teyit (disk prerender ground-truth eşleşti), iş sonu kill; stray PID 12267 dokunulmadı (memory disiplini). Araçlar: curl/grep + node v24 (parite) + Playwright MCP `browser_run_code_unsafe` (runtime/race). **Toplam Anthropic API çağrısı = 0.**

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | Regresyon tabanı / temiz build (S8-build): `rm -rf .next && next build` exit 0, 0 uyarı, 37 statik sayfa (QUALITY §1/§5) | ✅ Geçti | `✓ Compiled successfully` + `✓ Generating static pages (37/37)`, 0 warning, exit 0 — S8 regresyon tabanı taze build'de re-teyit |
| 2 | Giriş/yönlendirme matrisi (S1): 5 locale (/, /en, /ar, /de, /es) → 200; `/forum`→`/bulten` 308 (+slug); `/en#sectors` SSG; bilinmeyen-locale davranışı gözlemlenir (QUALITY §4) | ✅ Geçti | 5 locale 200; `/tr`→307→`/`; `/forum`→308→`/bulten`, `/forum/<slug>`→308→`/bulten/<slug>`→200; `/en#sectors` id=sectors SSG'de; `/xx`→404 (TR-fallback değil). **Record-not-fix re-teyit:** çıplak `/forum`→`/bulten` (index yok)→**404** = TASK-3.02 sahipli bulgusu (görsel/SEO M6) |
| 3 | i18n parite & runtime boşluk yok (S6): node key-diff 183×5 = 0 eksik/fazla; 5 dil render HTML'de 0 MISSING_MESSAGE; AR `dir=rtl` (QUALITY §4) | ✅ Geçti | 183 leaf-key × 5 dil, 0 eksik/0 fazla; 5/5 render 0 MISSING_MESSAGE/IntlError; AR `lang=ar dir=rtl`, diğerleri `dir=ltr` |
| 4 | Taksonomi & dürüstlük (S5): render görünür metinde "Crew OS" var / "Bunker" yok (5 dil); sahte "● online" / yasak metafor / uydurma müşteri-sonucu yok (QUALITY §1 marka sesi) | ✅ Geçti | Crew OS görünür 7× × 5 dil; "Bunker" görünür metin 0 (ham `bunker`/`bunker-os` = id/href iç kalıntı, ayrıştırıldı); sahte "● online" 0; yasak metafor (doktor/teşhis/diagnose/prescription) 0; 5 dilde |
| 5 | TR yolculuğu bütünlüğü (S2): 8 bölüm sırayla bütün/boş yok; hero ikincil CTA "İşleyen örnekleri gör"→#sectors; gym tek-otomasyon + Alpfit rozet/CTA; iç linkler çözülür, kopuk yok (QUALITY §1) | ✅ Geçti | #how/#sectors/#bunker/#forum/#chat hepsi SSG'de; hero ikincil CTA `href="#sectors"`; **R1 4-adım (Analiz·Çözüm·Otomasyon·Raporlama) hepsi render** (fresh-build ground-truth); Alpfit + spor-salonu var; 11/11 iç link 200 |
| 6 | Living Flow degradasyonu (S3): reduced-motion & no-WebGL → StaticFlow (canvas yok, içerik/Reveal takılmaz); mobil→low; AR-RTL×dark×reduced birlikte; 320/768/1440 yatay taşma yok + near-zero CLS; FOUC yok (QUALITY §2/§3/§6) | ✅ Geçti | reduced-motion→canvas=0 + 30/30 reveal + 7 h2 görünür; no-WebGL shim→canvas=0 + içerik var; 320/768/1440 yatay taşma=0 + canvas render; AR×dark×reduced birlikte (dir=rtl + dark ink + canvas=0 + 30/30 reveal); dark FOUC: tema paint-öncesi uygulandı; **CLS=0** |
| 7 | Kontroller & kalıcılık (S4): tema toggle + reload kalıcılık (localStorage) + Living Flow uniform; dil-switcher path/anchor korur + klavye/Escape/dış-tık; klavye-only yolculuk + yeşil focus-visible outline (QUALITY §2) | ✅ Geçti | tema toggle→`dark`/`ls=dark`/`aria-pressed=true`, reload sonrası **kalıcı**; dil-switcher (buton tabanlı) `/en/spor-salonu-yazilimi`→Deutsch→`/de/spor-salonu-yazilimi` **path korunur**; focus-visible 14/14 odakta 2px solid offset 3px — renk=currentColor (logo/CTA marka-yeşili `#1f7a3d`, nav muted-ink, ikisi de yüksek-kontrast görünür). *Not: nav focus-rengi + dil-switcher aria = bilinen ertelenmiş a11y(89), record-not-fix* |
| 8 | Chatbot 0-token (S7): key-yok → 503 offline UI (sahte-online yok, UI takılmaz); malformed → 400 (Anthropic'e ulaşmadan: rol whitelist/boş-filtre/son-12/sonda-user); toplam API çağrısı = 0 (QUALITY §6/§7) | ✅ Geçti | key-yok server: valid+malformed **tümü 503** (apiKey-gate-önce); dummy-key server: 6 malformed (invalid JSON/boş[]/eksik-alan/sonda-assistant/rol-enj-system/boş-trim) **tümü 400** `new Anthropic()`'ten önce; offline UI dürüst mesaj render ("The assistant is offline right now…"), **sahte-online yok**, takılmaz; **toplam API çağrısı = 0** |
| 9 | Adversarial/holistik (S8): JS-kapalı SSG okunur (TR+AR, kritik içerik client-only'ye gömülü değil); hızlı tema/dil toggle race tutarlı (son-kazanır, yarım-durum yok); hızlı scroll/anchor zıplama kararlı + 0 konsol hatası (QUALITY §1/§6) | ✅ Geçti | JS-off SSG (curl raw, TR+AR) tüm bölüm/başlık/gövde/CTA okunur + canvas=0; tema race (9 hızlı tık)→class=ls=aria-pressed tutarlı (yarım-durum yok); dil switch→`/es`+lang=es+dir=ltr tutarlı; scroll/anchor race (4 hızlı hash, 70ms)→son hedef `#forum` tam iner (top=0) + 30/30 reveal görünür + back-to-top scrollY=0; **0 konsol + 0 page error** |
| 10 | Bulgu triyajı tutarlılığı (milestone #3): kapsam-içi bug yok; record-not-fix (çıplak `/forum`→404; aynı-tick anchor burst) + ertelenmiş a11y(89)/perf(mobil 87, LCP 3.1s) sahipli, yeniden litige edilmez; security-review (Adım 1c) sonucu işlenir | ✅ Geçti | **Kapsam-içi yeni bug YOK**, kaynak kod faz boyunca değişmedi (yalnız `_dev/` docs). Record-not-fix sahipli: çıplak `/forum`→404, aynı-tick(0ms) anchor burst (≥16ms temiz), nav focus-rengi/dil-aria + a11y89/mobil-perf87/LCP3.1s = ertelenmiş (DECISIONS 2026-06-28). **security-review (Adım 1c): bulgu yok** (içerik/i18n React-escape, route.ts main ile byte-identik) |

### Otomatik Kontrol Bulguları (Adım 1)

- **CI/CD:** Projede yok (`.github/workflows`, `vercel.json`, dependabot yok). Vercel yalnız `main` push'ta deploy eder; revize branch'te CI artefaktı yok → atlandı.
- **Otomatik analiz araçları:** Yapılandırılmış scanner/bot yok → atlandı.
- **security-review (Adım 1c):** **Bulgu yok (≥8/10 eşik).** Faz 3 hiç kaynak kod değiştirmedi (yalnız `_dev/` docs). Tüm branch'te tek kod yüzeyi: `messages/*.json` (içerik, React text node → auto-escape) + `HowItWorks.tsx` (6 satır markup) + `.gitignore`. `route.ts` (tek güvenlik yüzeyi) `main` ile byte-identik, S7'de zaten incelendi. Güvensiz sink (dangerouslySetInnerHTML/eval) içeriğe bağlı değil. → Düzeltme task'ı gerekmez.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 3` oturumunda dolduruldu (2026-06-29).

### Ne İyi Gitti?
- **Önceki faz dersi doğrudan aktı.** PHASE-2 retrosunun "versiyon-sonu *doğrulama* milestone'u 'ölç + kaydet + karar ver' olarak yazılmalı, geçiş peşinen varsayılmadan" dersi PHASE-3 milestone'una birebir uygulandı; UAT geçişi peşinen varsaymadan ölçtü, triyaj kapısını ayrı bir milestone maddesi (#3) yaptı. Retro→sonraki-faz pipeline'ı amaçlandığı gibi işledi.
- **Hibrit araç eşlemesi (TK1) deterministik çalıştı.** Her senaryo en ucuz yeterli araca eşlendi: HTTP/SSG-seviyesi (S1/S5/S6, S2/S8'in statik tarafı) → curl/grep/node; client-runtime (S3/S4, S2/S7/S8'in runtime tarafı) → Playwright MCP `browser_run_code_unsafe`. Minimum araç yükü + tekrarlanabilir koşu; Playwright happy-path'ten kaçınıldığı yerde curl yeterli oldu.
- **Kanonik fresh-prod-serve + PID teyit disiplini her task'ta tuttu.** Memory'nin uyardığı stray/stale `next-server` landmine'ları (kendi Jun28 stale'i 2880857, yabancı 12708, orphan 12267) her oturumda listening-PID + ground-truth (served `<title>` == disk prerender) ile doğru ayrıştırıldı; kimisi öldürüldü, başkasına ait olanlara dokunulmadı. Yanlış-negatif üretilmedi.
- **Chatbot 0-token tasarımı titizdi.** apiKey-gate-sanitizasyondan-önce değişmezi *çalıştırılarak* kanıtlandı (dummy-key→6×400 vs key-yok→503 kontrastı); naif "key-yok+malformed→400" yanlış-negatifi gösterildi; tüm 400'ler `new Anthropic()`'ten önce döndü → **toplam API çağrısı = 0** korundu (kapsam + lisans gerçeğiyle uyumlu).
- **"Anahtar ≠ render yüzeyi" ayrımı mekanik izole edildi (S5).** RSC flight payload (`self.__next_f`) ham HTML'de script-tag'de göründüğünden, görünür metin ayıklamada script blokları çıkarılarak `bunker` namespace kalıntısı (değer "Crew OS") render yüzeyinden ayrıldı — taksonomi denetimi gözle değil mekanik güvenceyle yapıldı.
- **Bulgu triyajı dürüst + sahipliydi.** Her bulgu (çıplak `/forum`→`/bulten`→404; dil değişiminde anchor-drop; aynı-JS-tick anchor burst) kapsam-içi gerçek bug ile kapsam-dışı/ertelenmiş net ayrıldı, sahipli kaydedildi; kullanıcı onayıyla record-not-fix seçildi (diğer ertelenen UX kalemleriyle tutarlı). Bilinen a11y89/mobil-perf açığı yeniden litige edilmedi.

### Ne Kötü Gitti?
- **Büyük aksaklık yok** — doğrulama fazı, kaynak kod hiç değişmedi. Sürtünmeler küçük ve hepsi çözüldü:
  - Playwright MCP'de ayrı `emulateMedia` tool'u yok → degradasyon emülasyonu (S3) için `browser_run_code_unsafe` raw `page` escape-hatch + `newContext({reducedMotion,colorScheme})` gerekti (TK5 kod-inceleme fallback'ine düşmeden çözüldü).
  - Lenis smooth-scroll mid-animation click'i düşürdü (S4/S8) → settle (1.8s) + retry ile aşıldı; sentetik `WheelEvent` burst tab'ı düşürdü ("Target closed") → wheel çıkarılıp test küçük parçalara bölündü.
  - **Tekrar eden nüans:** tarayıcı locale-detection (`/` → Accept-Language `en-US` → `/en`) TR-birincil testleri 3 task'ta (S5/S6/S8) karıştırdı → `NEXT_LOCALE=tr` cookie precedence ile çözüldü. curl bunu tetiklemez (header göndermez) → curl-yeşil ile tarayıcı-kırmızı arası tutarsızlık ilk bakışta yanıltıcıydı. (Çapraz-faz tuzak → memory'ye alındı.)
- **Senaryo beklentisi resmi kabul kriterinin üstündeydi (anchor-drop).** S4 task/senaryo dokümanı dil-switcher için "anchor koru" beklentisi taşıyordu; M3 F3.4 resmi kabul kriteri yalnız **path** korumasını ister (✓ geçiyor) — anchor next-intl `pathname`'in hash içermemesinden (kütüphane-varsayılanı) düşüyor. Beklenti resmi kriterden fazla olunca "bulgu" gibi göründü, oysa düşük-şiddet kriter-üstü beklentiydi. **Ders:** senaryo beklentilerini ilgili modülün resmi kabul kriterine demirle (verify-plan'ın referans-gerçeklik kontrolü zaten bu yönde — uygulandı, record-not-fix doğru sonuç verdi).

### Sonraki Faz İçin Öneriler
- **Bu faz v0.1 versiyon-sonu Senaryo Testi'ydi** → versiyon-sonu sabit fazları (1 içerik + 2 teknik borç + 3 senaryo testi) tamamlandı. Sıradaki **zorunlu** adım `/devflow:prd-review` (Versiyon Sonu Durumu: senaryo_testi → prd_review_bekliyor). v0.1 kapanış değerlendirmesi.
- **İleri taşınan sahipli/ertelenmiş kalemler — prd-review girdisi, kaybolmamalı:**
  - **a11y 89** (marka-yeşili `#8af28a` kontrastı + geçersiz hero `<dl>`/`dlitem` + dil-switcher aria-mismatch) **+ mobil perf 87 / LCP 3.1s** (← Living Flow WebGL) — DECISIONS 2026-06-28 + `docs/perf/README.md`. **En yüksek sinyal:** a11y ortam-bağımsız + brief hedefi ≥100 → adanmış a11y/perf fazı/versiyonu, sonraki versiyon öncelik adayı (PHASE-2'den taşındı, hâlâ açık). S4 keyboard-only yolculuk + focus-visible ✓ doğruladı, ama aria-pattern eksiği duruyor.
  - **`/bunker-os` → public `/crew-os` + redirect** (M6 açık konu) — görsel/SEO versiyonu. Faz 3'te S1'de çıplak `/forum`→`/bulten`→404 de aynı SEO-bitişik kovaya girdi (index'siz statik bülten; kullanıcı yolculuğundan erişilemez ama eski inbound link için ölü redirect).
  - **Test altyapısı (D1)** — adanmış teknik faz adayı; "test = build + otonom UAT" hâlâ geçici.
  - **Alt sayfa derin denetimi** (Alpfit, Crew OS showcase `/bunker-os`, vaka, bülten çeviri/perf/içerik) — bu faz bilinçle yalnız ana sayfa + çıkış-linkleri; alt sayfalar sonraki versiyon.
  - **Anchor-drop** (dil değişiminde hash düşer) — record-not-fix, düşük şiddet; istenirse a11y/UX fazında ele alınır.

### Task-Spesifik Teknik Öğrenimler
<!-- Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar (araç davranışı, framework bug'ı, vb.). MEMORY.md'nin değil, faz retrosunun evidir. -->
- **Playwright MCP'de ayrı `emulateMedia` tool'u yok.** Degradasyon emülasyonu için `browser_run_code_unsafe` ile raw `page.emulateMedia({reducedMotion,colorScheme})` + `browser.newContext(...)` (her test izole context) + `addInitScript` kurmak gerekir. Headless'ta WebGL gerçekten çalışıyor (baseline canvas=1) → high/low degradasyon yolu gerçekten koşuldu, fallback simülasyon değil.
- **next-intl tema = localStorage + `html.dark`, `prefers-color-scheme` DEĞİL.** Playwright `emulateMedia({colorScheme})` temayı çevirmez → dark testi = `addInitScript(localStorage.theme='dark')` + reload veya toggle'a tıkla.
- **"low" degradasyon modu DOM'da attribute olarak açık değil** → gating-değişmezi ile doğrulanır: ≤768px'te `lowPower=true` zorunlu + canvas var + StaticFlow yok ⟹ tek olası mod "low" (kaynak-mantığı airtight; emülasyona değil değişmeze dayan).
- **Lenis `anchors:true` aynı-JS-tick çoklu scrollTo'yu ara konuma çözer**; ≥1 frame (≥16ms) arayla son hedef temiz kazanır. Sentetik-only (insan 4 linki 16ms'de tıklayamaz), kullanıcı etkisi yok — app/ScrollTrigger bug'ı değil, Lenis iç davranışı. Sentetik `WheelEvent` burst'ü Lenis anlamlı işlemez (gerçek değer anchor + adımlı `scrollTo`'da).
- **"Birebir-TR değer" sayısı stale değil, leak metriğidir.** Kaynak-seviyesi 18/183 birebir-aynı değerin tamamı marka/sayı/ortak-kelime çıktı; gerçek stale-leak ayırmak için marka-filtreli sayım + render-seviyesi distinkt-cümle leak kontrolü birlikte gerekir (tek başına "identical count" yanıltır).

---

## Kalite Kontrol Sonuçları

> QUALITY.md'nin 8 ekseni sistematik kontrol edildi. **Faz yüzeyi: kaynak kod hiç değişmedi** (yalnız `_dev/` doküman) — bu bir doğrulama fazı. Eksen durumları "fazın doğruladığı mevcut durum"u + sahipli/ertelenmiş kalemleri yansıtır, faz değişiminin etkisini değil (değişim yok → regresyon yok).

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ | S5: Crew OS her yüzeyde (5 dil × 7×) / "Bunker" görünür metinde 0 (iç kalıntı ayrıştırıldı); yasak metafor / sahte "● online" / uydurma müşteri-sonucu 0; dürüstlük konvansiyonu 5 dilde. S2/S3: TR yolculuğu bütün + craft/layout görsel teyit (şablon kokusu yok). S8: JS-off SSG'de içerik okunur. Kaynak değişmedi → craft regresyonu yok. |
| Erişilebilirlik | ⚠️ | S4: klavye-only yolculuk 16/16 distinct durak (focus-trap yok) + focus-visible 2px yeşil outline (`rgb(31,122,61)`) ✓; S3: reduced-motion içerik gizlemez (Reveal 12/12). **Ancak bilinen a11y 89 açığı** (marka-yeşili kontrast + geçersiz `<dl>` + dil-switcher aria-mismatch) duruyor — DECISIONS 2026-06-28, adanmış faza ertelenmiş, record-not-fix. Faz açığı *kötüleştirmedi* (kaynak değişmedi). |
| Performans | ⚠️ | S3: **CLS=0** (320/768/1440, near-zero teyidi) + yatay taşma 0 + build temiz (37/37, exit 0). **Bilinen mobil perf 87 / LCP 3.1s** (← Living Flow WebGL) ertelenmiş (DECISIONS 2026-06-28). Faz perf-nötr (kaynak değişmedi). Race testleri öncesi loadavg gözlendi (memory disiplini). |
| Yerelleştirme & RTL | ✅ | **Fazın çekirdek ekseni (S6).** Parite 5 dil × 183 leaf-key, 0 eksik/0 fazla (review'da node ile re-teyit); runtime `MISSING_MESSAGE` 5 dil × 0; non-TR esasen tam çevrili (gerçek TR-leak 0); TD1-senkron 3 kalem (report/gym/CTA) 5 dilde hizalı+çevrili; AR `dir=rtl` aynalama bütün (S3'te dark×reduced ile birlikte de). v0.1 çeviri borcu kapalı. |
| Modülerlik & Bakım Maliyeti | ✅ | Doğrulama fazı — kaynak dokunulmadı. Yapı doğrulandı: `route.ts` sanitizasyonu modüler (rol whitelist + boş-filtre + son-12 + sonda-user, apiKey-gate-önce); "low" mod gating-değişmezi airtight; i18n generic render yolu parite-temiz. Drift yüzeyi büyümedi. |
| Hata Yönetimi & Degradasyon | ✅ | S3: reduced-motion / no-WebGL → StaticFlow (canvas=0, içerik gizlenmez, Reveal 12/12); S7: chatbot key-yok → 503 zarif offline UI (sahte-online yok), stream-kopması try/catch fallback enqueue + finally close → UI takılmaz; S8: JS-off SSG kritik içerik gömülü değil. Degradasyon yolları sağlam. |
| Güvenlik | ✅ | S7: sanitizasyon *çalıştırılarak* doğrulandı (6 malformed → 400, Anthropic'e ulaşmadan; rol-enjeksiyon/boş/sonda-user-yok kısa-devre); apiKey-gate-önce → key-yok her istek 503. security-review (UAT Adım 1c): **bulgu yok** (kaynak değişmedi, `route.ts` main ile byte-identik). Secret env'de, koda gömülü değil. Toplam API çağrısı = 0. |
| Test Kapsamı | ⚠️ N/A | Test altyapısı yok (proje-geneli, aspirasyonel eksen — QUALITY §8). Bu fazın kendisi kapsamlı bir **otonom cross-validation** (S1–S8 + UAT 10/10) ama otomatik test suite eklemedi. Altyapı kurulumu ayrı teknik faz adayı (D1) — fazın eksikliği değil, proje-geneli durum. |

**Kullanıcı yolculuğu & boşluk:** TR ziyaretçi için ana sayfa uçtan-uca tutarlı (S2 + S8: 8 bölüm bütün/sıralı, hero ikincil CTA→#sectors, gym tek-otomasyon + Alpfit çıkışı, anchor/nav scroll, JS-off okunur). non-TR (EN/AR/DE/ES) yüzeyleri tutarlı (S6: parite + render bütün + AR-RTL). **Boşluk:** Sahipsiz/sürpriz boşluk tespit edilmedi. Bilinen, **sahipli** boşluklar: (a) çıplak `/forum`→`/bulten`→404 (index'siz statik bülten; yolculuktan erişilemez, SEO-bitişik) → görsel/SEO versiyonu; (b) `/bunker-os` route iç-ad sızıntısı → M6; (c) anchor-drop → record-not-fix; (d) a11y89/mobil-perf → adanmış faz. Hepsi kayıtlı ve yönlendirilmiş, orphan değil.

---

## Sonuç

- **Tamamlanma Tarihi:** 2026-06-29
- **Toplam Task:** 9 (TASK-3.01 kanonik ortam/build-tabanı · 3.02 S1 giriş/yönlendirme · 3.03 S5 taksonomi/dürüstlük · 3.04 S6 5-dil bütünlük · 3.05 S2 TR yolculuğu · 3.06 S3 degradasyon · 3.07 S4 kontroller/kalıcılık · 3.08 S7 chatbot 0-token · 3.09 S8 adversarial/holistik) — tümü ✅, arşivlendi.
- **Notlar:** Milestone 4 parçası da karşılandı (S1–S8 otonom koşuldu + kaydedildi + triyaj + TR bütünsel/non-TR tutarlı). UAT 10/10 + kalite 8 eksen (L10n/RTL çekirdek + Marka&Craft + Degradasyon + Güvenlik + Modülerlik ✅; a11y/Performans ⚠️ ertelenmiş-taban; Test Kapsamı N/A). **Kapsam-içi gerçek bug yok → düzeltme task'ı yok; kaynak kod faz boyunca hiç değişmedi** (yalnız `_dev/` docs; `route.ts` main ile byte-identik; security-review temiz). Sonraki faza/versiyona aktarılan sahipli borç: a11y89/mobil-perf açığı, `/bunker-os`+çıplak`/forum` SEO redirect (M6), test altyapısı (D1), alt sayfa derin denetimi, anchor-drop. Versiyon Sonu Durumu: senaryo_testi → prd_review_bekliyor. v0.1 versiyon-sonu fazları (1,2,3) tamamlandı → zorunlu prd-review.

---

**Oluşturulma:** 2026-06-28
**Son Güncelleme:** 2026-06-29 — review-phase 3 tamamlandı: retrospektif + 8 kalite ekseni yazıldı (L10n/RTL çekirdek + Marka&Craft/Degradasyon/Güvenlik/Modülerlik ✅; a11y/Performans ⚠️ ertelenmiş-taban; Test Kapsamı N/A). Kapsam-içi bug yok, düzeltme task'ı yok, kaynak kod hiç değişmedi. Faz ✅ tamamlandı. Versiyon Sonu Durumu senaryo_testi → prd_review_bekliyor; v0.1 versiyon-sonu fazları tamam → sıradaki: zorunlu prd-review.
