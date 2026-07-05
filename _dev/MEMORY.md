# MEMORY — Proje Hafızası (Index)

> Bu dosya proje hafızasının **index'idir** — her oturum başında okunur. Birikmiş
> öğrenimler tek tek `_dev/memory/<slug>.md` dosyalarında tutulur; buradaki her
> satır o dosyalara bir **pointer**dır (başlık + tek satırlık kanca). Bir öğrenimin
> detayı gerekince o an `memory/<slug>.md` okunur (lazy-load).
>
> Bu yapı şişmeyi önler: index ince kalır (hep yüklü), detay yalnızca gerekince okunur.

**Son Güncelleme:** 2026-07-05 — run-task 14.09: yeni [sandbox-runtime-browser-page-route](memory/sandbox-runtime-browser-page-route.md) eklendi (Ortam & Araç Notları) — cloud devcontainer sandbox `next start`/`dev` + bg-server+Chrome'u exit 144 ile öldürür → tek-process Playwright `page.route` interception (diskten `.next` servis) runtime-tarayıcı doğrulamasını server'sız koşturur.

<!-- KURAL: Bu satır her güncellemede ÜZERİNE YAZILIR. "Önceki:" prefix ile kümülatif yığma YASAK (CLAUDE.md → Doküman Disiplini). -->

---

## Teknik Tuzaklar & Workaround'lar

<!-- Proje genelinde geçerli beklenmedik davranışlar/bug'lar ve çözümleri (pasif gözlem: "şu böyle davranır, dikkat"). Tekrar eden, eyleme/kontrole bağlı bir "şu adımda şu kontrolü yap" kuralıysa → Süreç Disiplinleri. -->

- [axe color-contrast WebGL canvas arkasında "incomplete" verir](memory/axe-webgl-contrast-incomplete.md) — Metin WebGL `<canvas>` (Living Flow) üstündeyse axe o öğenin arkaplanını hesaplayamaz (piksel örnekleyemez) → **`violations` değil `incomplete`** ("needs review"). axe violations 0 + Lighthouse a11y 100 kalır (incomplete skora sayılmaz) ama bu **"kontrast temiz" sertifikası DEĞİL** — araç ölçemedi. Ampirik: alan yok=67 incomplete, alan live=81–82 (~15 fazla = fixed alan-üstü metin). Sonuç: **WebGL-arkası metin kontrastı otomatik sertifikalanamaz → craft görsel son hakem** (Gate-1 axe + Gate-3 craft birlikte; FlowVeil washi okunabilirlik güvencesi). Full-motion şart (reduced-motion alanı gizler). (TASK-12.03.)
- [`aria-hidden` color-contrast'tan muaf tutmaz](memory/aria-hidden-color-contrast-muafiyeti-degil.md) — **Yaygın yanlış varsayım:** dekoratif düşük-kontrast öğeye `aria-hidden="true"` eklemek onu axe/Lighthouse `color-contrast` denetiminden çıkarmaz. axe-core 4.11.4 ile kanıtlı: kural **görsel görünürlüğü** (`isVisibleOnScreen`) baz alır, AT-ağacını değil — doğrudan aria-hidden öğe de, aria-hidden ebeveyn içindeki öğe de **hâlâ flag'lenir**. Lighthouse 13.3.0 bu axe'ı bundle ediyor → a11y skoruna katkı yok. Görsel-koruyan doğru fix: CSS pseudo-element (`::before { content: attr() }`, text-node değil) veya kontrast-geçen renk; SVG text "incomplete" verir. (TASK-4.02; TASK-4.04/K5 ayraç planını etkiler.)
- [Tailwind v4: `translate-x-*` `transform` değil `translate` property'sini set eder](memory/tailwind-v4-translate-transition-property.md) — v4'te `translate-x-1` `transform:translateX()` değil ayrı `translate` CSS property'sini yazar (hover'da `getComputedStyle`: `translate:4px`, `transform:none`). **Tuzak:** translate hareketini + başka property'yi (renk vb.) birlikte anime ederken **arbitrary** `transition-property` yazarsan translate'i açıkça listele — `transition-[transform,color]` ok'u **zıplatır** (translate kapsanmaz), `transition-[translate,color]` yumuşak kaydırır. Site-standart `transition-transform` sorunsuz çünkü v4'te o yardımcı `transform,translate,scale,rotate`'i birlikte kapsar; tuzak yalnız arbitrary `transition-[...]`'de. (TASK-10.03.)
- [Tema-özel fix'te `dark:` variant kullanma](memory/tema-fix-html-dark-token-flip.md) — Proje temayı `html.dark` class + CSS değişken flip'iyle uygular; Tailwind v4 varsayılan `dark:` variant'ı `prefers-color-scheme`'e (OS tercihi) bağlıdır, `html.dark`'a değil (kodda 0 `dark:`, grep teyitli) → `dark:` app toggle'ıyla **desync** olur. Tema-özel fix flip eden token üzerinden: tek opaklık her iki temada geçsin veya adaptif token (`--color-pulse-ink` deseni) — `dark:` DEĞİL. (TASK-8.02.)
- [a11y/perf ölçümünde tema tuzağı](memory/a11y-olcum-tema-tuzagi.md) — Kanonik Lighthouse (`--headless=new`) **DARK** render eder (init `prefers-color-scheme: dark`'a düşer; v0.1 baseline de dark'tı), "light gate" değil; a11y skoru iki temada aynı ama color-contrast **öğeleri** farklı. `bg-ink`/`text-canvas` panelleri tema ile ters çevrilir → kontrast pass/fail flip eder; **her zaman light+dark doğrula**. Tema zorlamak için Playwright `emulateMedia({colorScheme})`; tam envanter için `reducedMotion:'reduce'` + scroll (Lighthouse full-motion'da reveal `opacity:0`'ı atlar). axe-core lighthouse npx cache'inde gömülü (offline enjekte).
- [Lighthouse Lantern render-timing körlüğü](memory/lighthouse-lantern-render-timing-korligi.md) — **Mobil Lighthouse skoru Lantern-simüle:** observed trace throttle'sız toplanıp 4× CPU *simüle* edilir → **CPU/render-zamanlama lever'ları (opacity-gate kaldırma L1, `requestIdleCallback` deferral L2) lab skorunda görünmez**, gerçek-cihaz-doğru olsalar bile (TASK-6.04: L1+L2 mobil LCP/TBT birebir; observed `elementRenderDelay` 173↔173ms). **AMA network/asset-boyutu lever'ları GÖRÜNÜR** (rafinaj TASK-6.07): Lantern simüle throttled ağı modeller → **L3 (Fraunces budama, ~113KB↓ woff2) mobil LCP'yi 3755→3164ms düşürdü** (aynı ortamda L1+L2 tek başına 3604→3755 = delta yok). "Tek lab-lever = WebGL iş yükü" **eksikti**; iş-yükü (CPU) + asset-boyutu (network) görünür, gizlenen yalnız saf render-**zamanlama**. ⚠️ Ortam anomalisi: 6.01/6.04 SwiftShader perf 62/TBT 1842 vs 6.07 temsilî perf 84/TBT 261 (Faz-4 birebir) → perf/TBT mutlak kıyasında baseline'ı aynı ortamda sabitle. Nihai brief doğrulaması gerçek-cihaz/Vercel field gerektirir.
- [next.config.ts `redirects()` `source`'u locale prefix'ini otomatik kapsamaz](memory/next-config-redirect-locale-prefix.md) — Config redirect `source` **literal** eşleşir → next-intl `as-needed` prefix'lerini (`/en`,`/ar`,`/de`,`/es`) kapsamaz. Tek `source:"/foo"` yazarsan çıplak `/foo`→308 ama `/en/foo`→**404**. Doğru desen **iki açık giriş**: çıplak + `source:"/:locale(en|ar|de|es)/foo"` (`destination:"/:locale/…"`). `permanent:true`→308; config middleware'den ÖNCE (edge) → çift-redirect yok. **Sıra tuzağı (Faz 13):** `:slug*` opsiyonel gruba derlenir → `/foo/:slug*` çıplak `/foo`'yu da eşler; hedefler ıraksarsa (çıplak→`/`, slug→`/bulten`) **çıplak giriş slug'dan ÖNCE** gelmeli (Next ilk-eşleşeni uygular). Uyarı: aynı yolda fiziksel route klasörü kalırsa route 200 kazanır → eski klasörü sil. Denetim: `routes-manifest.json` regex'lerini örnek path'lere test et. (TASK-11.01/13.04, Faz 11/13.)
- **Tarayıcı-tabanlı doğrulamada `/` (prefixsiz TR) Accept-Language ile otomatik locale'e yönlenir** (next-intl `localeDetection`; örn. `Accept-Language: en-US` → `/en`). curl bunu **tetiklemez** (header göndermez) → aynı sayfa curl'de TR-200 ama Playwright/tarayıcıda `/en` görünebilir; bu tutarsızlık **bug değil**, beklenen davranış. TR-birincil testlerde `NEXT_LOCALE=tr` cookie kullan (cookie precedence > Accept-Language). **Lighthouse de Chrome → tetikler:** cookie'siz koşu `/` yerine `/en` ölçer; bu yüzden v0.1 perf baseline'ı yanlışlıkla `/en` ölçmüş (artifact `finalUrl=/en` ile TASK-4.08'de kanıtlandı, "TR `/`" diye etiketlenmişti). **Perf ölçümünde TR `/` için `--extra-headers='{"Cookie":"NEXT_LOCALE=tr"}'` şart; regresyon karşılaştırmasında hep aynı locale.** TR `/` sayfası `/en`'den ağır (uzun hero metni) → farklı perf/LCP, regresyon değil. (Faz 3 S5/S6/S8 + Faz 4 TASK-4.08; detay → `phases/PHASE-3.md`, `phases/PHASE-4.md` 4.08 İcra Notu, `docs/perf/README.md`.)

## Kullanıcı Tercihleri

<!-- Kullanıcının proje genelinde geçerli tercihleri (test yaklaşımı, kod stili, iletişim vb.) -->

- Kullanıcı Türkçe çalışır (iletişim dili Türkçe).
- Canlı siteye dokunmadan çalışılır: `main` canlı kalır, revize işleri `revize/...` branch'lerinde yürür.

## Ortam & Araç Notları

<!-- Environment, tooling, CI/CD, kalıcı operasyonel veri (VPS IP, repo path, folder yapısı) -->

- Repo: `github.com/NorthAIII/kiwiwebsite.v3` · Repo kökü: `/home/kivanc/projects/kiwiwebsite.v3`
- Deploy: Vercel `north-ai/kiwi-ai-lab-v3` (her `main` push → otomatik deploy). Canlı: kiwiailab.com
- Chatbot env: `ANTHROPIC_API_KEY` (zorunlu, canlıda Vercel env'de), `CHAT_MODEL` (opsiyonel, varsayılan `claude-opus-4-8`).
- [Repo haritası](memory/repo-haritasi.md) — frontend = `NorthAIII/kiwiwebsite.v3` (bu repo, public); backend ayrı/private = `NorthAIII/kiwi-ai-lab`; eski repo'lar terk edilmiş öncül (yeniden kullanma).
- **CI (GitHub Actions) gözlemi `gh` olmadan da yapılabilir** — repo **public** olduğundan Actions run/job durumu auth'suz REST API ile okunur: `curl -s "https://api.github.com/repos/NorthAIII/kiwiwebsite.v3/actions/runs?head_sha=<sha>"` → run id; sonra `/actions/runs/<id>/jobs` `jq '.jobs[] | "\(.name): \(.conclusion)"'` ile job-seviyesi `conclusion=success` ampirik teyit edilir (`gh run watch` eşdeğeri). CI workflow: `.github/workflows/ci.yml` (fast + a11y job; TASK-5.04). Ortam notu: bazı oturum ortamlarında `gh`/`node`/`python` kurulu olmayabilir (taze cloud devcontainer) — workflow GitHub runner'da koştuğu için node yerelde gerekmez.
- [DevFlow sistemi](memory/devflow-sistemi.md) — DevFlow özel araç (`github.com/36337/DevFlow`); bu yüzden public repo'da `.claude/` gitignore'da, `_dev/` commit'lenir.
- [Standalone Playwright'te WebGL → `channel:'chrome'` şart](memory/playwright-bundled-chromium-webgl-yok.md) — **Playwright-bundled chromium WebGL vermiyor** (`getContext('webgl2')`=null, hiçbir flag açmadı) → `LivingFlow` degradasyonu her zaman `static`e düşer: "reduced/no-WebGL → StaticFlow" testleri geçer ama **ayırt edici değil**, "mobil-low → FlowCanvas" **yanlış FAIL**. Çözüm: `chromium.launch({channel:'chrome', args:['--enable-unsafe-swiftshader',...]})`. WebGL-bağımlı degradasyon testine **ayırt-edicilik sanity** ekle (full-motion+WebGL→canvas var, mode high). Ayrıca **focus-visible outline ölçümü** `reducedMotion:'reduce'` şart (Tailwind v4 `transition-colors` outline-color'ı anime eder → Tab-sonrası okuma yeşil↔metin ara-değeri = yanlış-negatif). Runtime task'ları 9.06/9.09 da etkiler. (TASK-9.05, TASK-9.06.)
- [Vercel Git-disconnect → deploy tetiklenmez](memory/vercel-git-disconnect-deploy-tetiklenmez.md) — **`main`'e push (merge dahil) hiç deployment yaratmıyorsa** Vercel↔GitHub Git bağlantısı kopmuş olabilir (Deployments'ta sıfır satır — Error bile değil). Teşhis: Settings → Git "Connected Nm ago". Vercel geriye dönük deploy etmez → yeniden bağlan + **yeni** (boş) commit push et (`--allow-empty`). Canlı-kod teyidi: immutable chunk 200 + yeni-koda-özgü string HTML'de + `age:` düşük. Shell tuzağı: `grep | head -1 &&` her zaman "VAR" basar (head boş girdide 0 döner) → `grep -c`/`grep -q` kullan. (v0.2 release 2026-07-02.)
- [Cloud devcontainer'da runtime tarayıcı: server yerine `page.route`](memory/sandbox-runtime-browser-page-route.md) — Sandbox `next start`/`next dev` (3 başlatma yöntemi de) + arka-plan-server+Chrome kombinasyonunu **exit 144 / signal-16** ile öldürür (14.08/14.09 birebir; `next build`/curl/Vitest/trivial-Chrome yaşar). **Çözüm: tek-process Playwright `page.route` interception** — Chrome'u `.next` prerender+static'ten diskten byte-for-byte servis et (ayrı server yok → sandbox öldürmez). WebGL için yine system Chrome (`channel:'chrome'`+swiftshader) şart; harness'ı proje içine yaz (scratchpad `playwright`'i çözemez), koştur, sil. Ortam per-session flaky → bu yöntem flakiliği tümüyle atlar (S3/S4/S9 runtime doğrulamasında ilk tercih). (TASK-14.09.)
- [Perf ölçüm araç-zinciri devcontainer kurulumu](memory/perf-olcum-devcontainer-kurulumu.md) — Taze devcontainer'da node/Chrome yoksa (kullanıcı onayıyla) kur: node20 (NodeSource) + Chrome 150 (resmi repo) + LH 13.3.0 (npx-cache); `npm install` + `git checkout package-lock.json` (lock dokunulmaz; `npm ci` @swc/helpers drift'iyle reddeder). **Chrome-flags ŞART:** `--disable-dev-shm-usage` (64M /dev/shm) + `--enable-unsafe-swiftshader` (Chrome 150 software-WebGL; yoksa Living Flow `TARGET_CRASHED`). LH 13.x LCP elementini `lcp-breakdown-insight`'ta verir (eski `largest-contentful-paint-element` audit'i yok). **Software-GL ortamı perf/TBT'yi şişirir (ortamlar arası kıyaslanamaz); LCP/FCP/CLS Lantern-deterministik (kıyaslanabilir).**

## Çapraz Öğrenimler

<!-- Faz arası taşınan, tek faza/dokümana ait olmayan dersler -->

- [Henüz yok]

## Süreç Disiplinleri

<!-- Retrospektiften çıkan, proje genelinde geçerli "şunu yaparken şu kontrolü her zaman yap" tipi iş-akışı kuralları. -->

- **i18n değişiminde anahtar varlığı ≠ değer tazeliği — ayrımı koru.** Anahtar EKLEME / yeniden-adlandırma / yapısal değişim → 5 dilde (tr/en/ar/de/es) anahtar **eşzamanlı** var olmalı (eksik anahtar = runtime boşluk/hata, pazarlık-dışı). Yalnız **değer** değişimi → non-TR stale-kopya kabul, çeviri versiyon-sınırına ertelenir (TR tek kaynak). Plan/icrada önce değişimin tipini (anahtar mı değer mi) belirle. (Detay: `docs/DECISIONS.md` 2026-06-28 i18n rename + 2026-06-27 dil senkronu.)
- Entegrasyon/analytics/3rd-party script eklerken **canlıda (production) gerçekten çalıştığını gözle doğrula** — "kod ekledim, tamamdır" deme; etkiyi panelde/ağ sekmesinde gör. **"Canlıda gördüm" iddiasını her zaman kanıt-artefaktına bağla** (panel ekran görüntüsü / canlı HTML grep / `git merge-base --is-ancestor <feat-sha> origin/main`); yapısal olarak o oturumda gerçekleştirilemeyen bir doğrulamayı (ör. `main` unmerged, preview `data-domains` saymaz) **geçmiş-gibi kaydetme** — ⏳ merge-bekliyor işaretle. (Faz 7 verify re-run'da "canlı +1 gördüm" iddiası tam bu şekilde çürütüldü: `main` HEAD 89 commit geride, canlıda Umami yok. Örn. Umami → `docs/UMAMI-ANALYTICS.md`, `phases/PHASE-7.md`.)
- **Lighthouse/perf ölçerken host yükünü gözlemle** — her koşudan önce `cat /proc/loadavg`. Yüksek yük (bu makine 20 çekirdek; load avg ≫ çekirdek sayısı = aşırı yük) TBT/LCP/perf skorunu bozar (a11y/CLS'yi **değil** — onlar ortamdan bağımsız), tek atışta perf 49↔90 savrulur. Düşük yükte (≤ ~6) çok-koşu al, median kaydet; yüksek-yük koşularını ele. Bu host gürültüsü orphan chrome process'ten farklıdır (onu da `ps` ile kontrol et). (Detay/metodoloji: `docs/perf/README.md`; ilk taban TASK-2.03.)
- **Bir sayfayı a11y-mühürlerken iki gate'i de koş — axe WCAG-AA 0 ihlal ≠ Lighthouse a11y=100.** `@axe-core/playwright` `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa'])` yalnız WCAG-AA kurallarını tarar; `landmark-one-main`/`region`/`heading-order` gibi Lighthouse **structural/best-practice** audit'leri bu alt-kümede **yok** → axe tohumu 0 ihlal (yeşil) verirken Lighthouse a11y skoru <100 olabilir. Bu proje a11y'yi **iki ayrı gate**'le mühürler: (1) CI `subpages-a11y.spec.ts`/`home-a11y.spec.ts` axe-WCAG tohumu = regresyon güvencesi; (2) manuel Lighthouse çift-tema = milestone skor gate (structural audit'leri kapsar). Bir sayfayı "a11y bitti" saymadan önce **ikisini de** koş; "axe yeşil = 100" varsayma. (Faz 8: 50 axe testi yeşilken 2 bülten sayfası a11y=98 — `<main>` yoktu; TASK-8.06 yakaladı. Detay → DECISIONS 2026-07-02, `phases/PHASE-8.md`.)
- **Yerel prod doğrulamada serve eden process'in senin fresh process'in olduğunu listening-PID ile teyit et.** Önceki oturumdan kalan stray/stale `next-server` portu tutup eski (edit-öncesi) build'i sunabilir → tüm yeni metinler "bulunamadı" görünür (**yanlış negatif**, gerçekte build doğru). Görsel/curl doğrulamadan önce: portu dinleyen PID az önce başlattığın process mi (`ss -ltnp` / `lsof -i`), yoksa stray mı? Şüphede diskteki prerender (`.next/server/app/*.html`) build'in ground-truth'udur. Net portta yeniden başlat, sahiplenen PID'yi teyit et. (TASK-2.01'de tam bu yaşandı.)
- [Runtime harness yazarken selector varsayma](memory/runtime-harness-selector-teyidi.md) — **Standalone Playwright/runtime harness'i yazarken hedef komponentin etkileşim mekanizmasını kaynaktan teyit et** (DOM şeklini tahmin etme). Bu projede tekrar eden yanlış-FAIL kaynağı: LanguageSwitcher `<a href>` değil `router.replace` **butonu**; Chatbot floating değil inline `#chat` section; tema `html.dark`+localStorage (prefers-color-scheme değil, `emulateMedia` çevirmez). Harness "FAIL" verince önce **artefakt mı** diye sor (kör red yok), sonra gerçek-bug'a geç (kör onay yok). Uygulama anı = runtime harness yazımı (Faz 3, Faz 9 S3/S4/S9). [WebGL channel:'chrome'](memory/playwright-bundled-chromium-webgl-yok.md) ile aynı aile.

---

## Memory Sistemi — Nasıl Çalışır?

- **Index satırı:** `- [Başlık](memory/<slug>.md) — tek satırlık kanca`. Slug kebab-case ve açıklayıcı olsun (örn. `mawk-unicode-tuzagi`).
- **Kendi kendine yeten kanca.** Her zaman geçerli olması gereken kritik bilgide kancayı **tam** yaz — böylece dosya açılmadan da bilgi her oturum görünür. Yalnızca duruma-özgü veya uzun detayda kanca "buraya bak" olur, gövde dosyada durur.
- **Memory dosyası** (`_dev/memory/<slug>.md`): düz markdown — `# Başlık` + gövde. Frontmatter yok. İlgili başka bir memory'ye `[Başlık](diğer-slug.md)` ile link verilebilir. Klasör ilk öğrenim yazıldığında oluşur.
- **Yeni öğrenim eklerken:**
  1. `_dev/memory/<slug>.md` oluştur — ya da aynı konu varsa **mevcudu güncelle** (dedup, yeni dosya açma).
  2. `_dev/MEMORY.md` index'inde ilgili kategori altına pointer satırını ekle/güncelle.
  3. Bayatlayan öğrenimi hem dosyadan hem index'ten **sil** (soft-delete yok — git history zaten tutar).
  4. Bir memory dosyası kendisi şişerse CLAUDE.md → Boyut ve Bölünme'ye göre alt-dosyaya böl.

---

## Bu Sisteme Ne Yazılır, Ne Yazılmaz?

Memory sistemi (MEMORY.md index + `memory/` dosyaları) **kalıcı/operasyonel veri ve çapraz öğrenimler** içindir. Drift'in en büyük kaynağı yanlış-ev sorunudur: task icra detayları, oturum logları veya aktif durum bilgisi buraya yazılırsa sistem şişer ve gerçek değeri kaybolur.

### TUTULAN içerik
- Başka dokümana uymayan ama kaybedilmemesi gereken kalıcı bilgiler
- Geliştirme sırasında keşfedilen, **proje genelinde geçerli** tuzaklar ve workaround'lar
- Kullanıcının proje genelindeki **operasyonel/teknik** tercihleri — yön/öncelik düzeyindeki ilkeler buraya değil → `ILKELER.md`
- Ortam ve araçlarla ilgili pratik notlar (CI özellikleri, deployment kuralları)
- Fazlar arası geçerliliği olan çapraz öğrenimler
- Retrospektiften çıkan, **bu projeye özgü** süreç disiplinleri → "Süreç Disiplinleri" kategorisi
- Sabit konfigürasyon değerleri ve kalıcı operasyonel veri (repo path, hesap email, folder yapısı)
- Mimari karar **özetleri** — detay `docs/DECISIONS.md`'de
- Secret kategori isimleri (örn. "ANTHROPIC_API_KEY env'de tutulur") — **değer ASLA yazılmaz**

### YASAK içerik (bunlar başka dokümanlara aittir — memory yanlış evdir)
- **Task icrası sırasında öğrenilen teknik nüanslar** → `phases/PHASE-N.md` retrospektifi
- **Oturum logları, "şu oturumda şu yapıldı"** → git log + ilgili PHASE/TASK dokümanları
- **Aktif faz/task durumu, ilerleme, son task özetleri** → `DURUM.md`
- **Mimari ve tasarım kararları** (detay) → `docs/DECISIONS.md`
- **Proje yapısı ve kimliği** → `OVERVIEW.md`, `INDEX.md`
- **Proje yön-veren ilkeleri ve öncelikleri** → `ILKELER.md`
- **Kalite kuralları** → `QUALITY.md`
- **Faz retrospektifi** → `phases/PHASE-N.md`

### Çıkarma Disiplini

CLAUDE.md → Doküman Disiplini bölümü baskındır. Özet:
- Geçersizleşen bilgi tarihi yanında yazılı olsa bile **silinir** — tarih koruma gerekçesi değildir.
- "Önceki:" / "Eski:" prefix ile paragraf merdiveni YASAK; her güncelleme üzerine yazma yapar.
- HTML comment'e sarma, üstü çizili etiket gibi yumuşak silme yöntemleri YASAK; gerçek silme yapılır (git log zaten her şeyi tutar).
