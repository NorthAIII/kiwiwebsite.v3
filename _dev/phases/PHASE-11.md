# Phase 11: URL taksonomisi / SEO redirect (`/bunker-os` → `/crew-os`)

**Durum:** ✅ Tamamlandı

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.3'ün ikinci içerik fazı — URL taksonomisi hijyeni. İç kod adı "Bunker OS"un kullanıcıya sızdığı **tek** yüzeyi (`/bunker-os` route'u) public ada (`/crew-os`) taşımak: kalıcı redirect + i18n namespace rename + SEO metadata (sitemap/canonical/alternates) + iç linkler. Taksonomi kararının (DECISIONS 2026-06-27: public Crew OS / iç ad Bunker OS) son açık ucunu kapatır. İçerik/davranış/tasarım değişmez — yalnız URL ve namespace tanımlayıcıları.

**Milestone:** Public `/crew-os` yayında (5 locale SSG) **ve** `/bunker-os` → `/crew-os` kalıcı redirect çalışıyor (5 locale) **ve** i18n namespace `bunkerOs`/`bunker` → crew-tabanlı adlara 5-dil senkron rename (eksik anahtar yok, build 0 `MISSING_MESSAGE`) **ve** sitemap/canonical/alternates + iç linkler `/crew-os`'a güncel **ve** iç linkler temiz (kırık link yok); guardrail'ler regresyonsuz: a11y=100 çift-tema, perf korunan taban, CLS≈0, i18n 5-dil parite. `/forum` redirect'i **korunur** (bilinçli — kapsam dışı).

### Feature Listesi

(MODULE-MAP ve modules/ referansı; kaynak: `docs/REVIZE-BACKLOG.md` SEO satırı + taksonomi kararı DECISIONS 2026-06-27)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| SEO1: `/bunker-os` → `/crew-os` route rename + kalıcı redirect | M6 (redirect/sitemap/metadata) + M2 (route klasörü) | Route klasörü `crew-os`; `/bunker-os` (5 locale) kalıcı redirect; sitemap + canonical/alternates güncel |
| SEO2: i18n namespace `bunkerOs`/`bunker` → crew rename (5-dil) | M4 (+M2) | Yapısal namespace rename, 5 dilde eşzamanlı (eksik anahtar yasak); değerler stale kalabilir (TR tek kaynak) |
| SEO3: İç link temizliği (`/bunker-os` → `/crew-os`) | M2 (Hero/Bunker + diğer tüketiciler) | Tüm iç `/bunker-os` linkleri `/crew-os`'a; kırık link/çift-redirect yok |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 11` oturumunda dolduruldu (2026-07-02).

### Alınan Kararlar

- **Faz 11 konusu = URL taksonomisi / SEO redirect** (kullanıcı kararı). v0.3 near-term'deki iki konudan (B1 Living Flow nabız / SEO redirect) SEO seçildi — iyi tanımlı, düşük risk, Faz 10'un craft işini doğal tamamlar (`<Logo>` tek kaynak; showcase yeni yüzey getirmez). B1 (karar-gate'li, imza-riskli) ayrı faza bırakıldı.
- **`/forum` → 404 kalemi REDDEDİLDİ; mevcut redirect korunur** (kullanıcı kararı). Mevcut durum kod-teyitli: `next.config.ts` `/forum`→`/bulten` ve `/forum/:slug*`→`/bulten/:slug*` **kalıcı 301** yapıyor (çalışan, yardımcı redirect). Backlog "çıplak `/forum`→404" istiyordu ama 301 SEO açısından zaten doğru/zararsız; eski link varsa korunur, bozmak için net gerekçe yok. Bu faz `/forum`'a **dokunmaz** (bilinçli no-op — kayıt). REVIZE-BACKLOG'daki SEO satırının `/forum`→404 kısmı bu kararla kapanır.
- **Rename kapsamı = Route + i18n namespace (kod dosya adları hariç)** (kullanıcı kararı). Taksonomi (DECISIONS 2026-06-27) "Bunker OS **iç kod adıdır, kodda kalabilir**" der — kullanıcıya sızan tek yer URL. Bu yüzden:
  - **Route klasörü** `[locale]/bunker-os/` → `[locale]/crew-os/` (URL = kullanıcı-yüzeyi, değişmek **zorunda**).
  - **i18n namespace** `bunkerOs` (showcase) + `bunker` (ana sayfa teaser) → crew-tabanlı adlara rename (namespace tutarlılığı; gelecek geliştirici okur). İki namespace ayrık kalır (ana sayfa teaser ≠ showcase); kesin yeni adlar plan-phase'de netleşir.
  - **Kod dosya/dizin adları** (`Bunker.tsx`, `components/bunker-os/`, `BunkerShowcase.tsx`) → **dokunulmaz** (iç kod adı, taksonomi izin veriyor; "Tam tutarlılık/kod dahil" seçeneği elendi — saf refactor diff'i büyütür, dar-faz disiplini).
- **Tek faz** (kullanıcı kararı). `/forum` bilinçle korunduğu için gerçek iş yalnız `/crew-os` rename; ayrı faza bölmeye gerek yok.

### Kullanıcı Tercihleri

- Craft-first + kalıcılık: Faz 10 `<Logo>` dersini sürdür — showcase sayfası rename sırasında yeni bir logo/başlık yüzeyi doğarsa `<Logo>` yeniden kullanılır, kopya-koda dönülmez (PHASE-10 retrospektif önerisi).
- Minimal/cerrahi: içerik, tasarım, davranış, akış aynı kalır; yalnız URL + namespace tanımlayıcı katmanı.

### Çapraz Konular (plan/icrada uyulacak)

- **SEO doğruluğu (kritik):** Redirect **kalıcı** (Next `permanent: true` → 308) olmalı; **5 locale** için çalışmalı (`/bunker-os`, `/en/bunker-os`, `/ar/bunker-os`, `/de/...`, `/es/...` → ilgili `/crew-os`). Mevcut `/forum`→`/bulten` redirect'inin locale-prefix'lerle nasıl davrandığı research-phase'de teyit edilmeli (next-intl middleware ↔ next.config redirects etkileşimi). `sitemap.ts` PATHS dizisinde `/bunker-os` → `/crew-os`; showcase `generateMetadata` canonical/alternates güncel. **Çift-redirect yok** (iç linkler doğrudan `/crew-os`'u göstermeli, `/bunker-os` üzerinden değil). robots.ts değişmez (yalnız sitemap'e işaret ediyor).
- **i18n yapısal rename disiplini:** Namespace rename **anahtar-adı değişimidir** → "stale kopya" istisnasının **dışında** (DECISIONS 2026-06-28): 5 dilde (tr/en/ar/de/es) **eşzamanlı** rename, eksik anahtar = runtime boşluk/hata (pazarlık-dışı). **Değerler** stale kalabilir (TR tek kaynak, çeviri versiyon-sınırı) — bu faz metin çevirmez, yalnız anahtar taşır. Build'de 0 `MISSING_MESSAGE` doğrulanmalı.
- **Test/guardrail etkisi:** i18n 5-dil parite tohum testi (Vitest, anahtar-kümesi) namespace rename'i 5 dilde eşit gördüğü için yeşil kalır — ama **route path'e referans veren testler** güncellenmeli: alt-sayfa a11y spec'i (`subpages-a11y.spec.ts`) `/bunker-os`'u ziyaret ediyorsa `/crew-os`'a çevrilmeli (research-phase teyit eder). Namespace adına referans veren testler de. Guardrail: a11y=100 çift-tema (showcase sayfası), perf tabanı, CLS≈0 regresyonsuz.
- **Build/SSG:** Yeni `crew-os/` route klasörü 5 locale için `generateStaticParams` + `generateMetadata` üretmeli; `next build` temiz (route çözümü, redirect derlemesi, tip). Eski `bunker-os/` klasörü silinir (redirect config'e taşınır — fiziksel route kalmaz, yoksa redirect'le çakışır).
- **Craft/`<Logo>`:** Showcase PageHeader zaten `<Logo>` tüketiyor (Faz 10) → rename yeni logo yüzeyi getirmez; kopya-kod refleksine dönme (PHASE-10 önerisi).
- **RTL:** URL/namespace işi görsel yön içermez; AR redirect + metadata `dir` etkilenmez. Site-geneli logical-ok borcu bu fazın konusu değil.

### Kapsam Dışı

- **`/forum` → 404** — reddedildi; mevcut `/forum`→`/bulten` 301 korunur (yukarıda, bilinçli no-op).
- **Kod dosya/dizin adı rename** (`Bunker.tsx`→`Crew.tsx`, `components/bunker-os/`→`crew-os/`, `BunkerShowcase`→`CrewShowcase`) — iç kod adı, taksonomi izin veriyor; saf refactor ayrı iş olarak isteğe bağlı (bu fazda yapılmaz).
- **B1 Living Flow nabız kapsamı** — ayrı, karar-gate'li faz (imza riski).
- **İçerik/kopya/tasarım/davranış değişimi** — showcase sayfasının metni, diyagramı, akışı aynı kalır; yalnız URL + namespace tanımlayıcı katmanı.
- **Non-TR içerik tazeliği** (alt-sayfa ar/de/es stale) — versiyon-sınırı, dil stratejisi (bu faz değil).
- **Çeviri değeri güncellemesi** — namespace rename yalnız anahtar taşır; değer çevirisi versiyon-sınırına ertelenir (TR tek kaynak).
- **Site-geneli logical-ok (RTL)** — kayıtlı ayrı borç (Faz 10 kararı).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 11` oturumunda dolduruldu (2026-07-02). Ampirik teyit: `next build` + `next start` (localhost:3999) üzerinde mevcut redirect davranışı curl ile ölçüldü (Next 15.3, next-intl 4.1).

### Değerlendirilen Yaklaşımlar

**Redirect mekanizması** (`/bunker-os` → `/crew-os`, 5 locale):
- **A — `next.config.ts` `redirects()`, kalıcı (308), açık locale pattern'leri.** Mevcut `/forum` konvansiyonunun (kanıt: `next.config.ts:13-18`) locale-doğru genişletilmişi. Artı: SSG/route çözümünden önce edge'de çalışır, SEO-doğru kalıcı 308, eski route klasörü tamamen silinir (çakışma yok), tek yer. Eksi: locale varyantlarını **açık** yazmak gerekir (aşağıda, ampirik gerekçe); `next.config.ts` Dokunulmaz — ama bu değişiklik fazın tam amacı (onay kapsam içi).
- **B — `bunker-os/page.tsx` içinde `redirect("/crew-os")` (next/navigation).** Artı: kolokasyon. Eksi: server `redirect()` **307 (geçici)** döner — SEO-kalıcı değil; eski route klasörünü **tutmayı** gerektirir ("eski klasör silinir" kararıyla çelişir); render setup'tan sonra çalışır. Elendi.
- **C — next-intl `pathnames` (yerelleştirilmiş route adları).** Routing modelini değiştirir, tek bir path rename için aşırı; imza/craft'a değmez. Elendi.
- **Seçilen: A** — kalıcı config redirect + açık 5-locale pattern. Kalıcılık ilkesiyle (SEO-doğru 308, eski yol kalıcı yönlenir) ve mevcut konvansiyonla hizalı.

**i18n namespace rename adları:** `bunkerOs` → **`crewOs`** (showcase), `bunker` → **`crew`** (ana sayfa teaser). İki namespace ayrık kalır (discuss kararı). Değerler değişmez (TR tek kaynak; zaten "Crew OS" markalı → stale-lik minimal).

### Kullanılacak Araçlar/Kütüphaneler
- **Next.js 15.3 `redirects()`** (path-to-regexp `source`) — kalıcı redirect. Named param + regex kısıt: `source: "/:locale(en|ar|de|es)/bunker-os"`, `destination: "/:locale/crew-os"`.
- **next-intl 4.1 middleware** (`as-needed`) — mevcut; rename yeni routing config gerektirmez.
- Yeni kütüphane **yok** — faz mevcut altyapıyla mekanik rename + redirect.

### Dikkat Edilecekler

- **Config redirect `source` literal eşleşir — locale prefix'i OTOMATİK kapsanmaz (AMPİRİK KANIT).** `curl` testi: `/forum` → **308** `/bulten` (çalışır) ama `/en/forum`, `/de/forum` → **404** (redirect YOK). Yani `/crew-os` redirect'i **iki giriş** ister: (1) çıplak `source: "/bunker-os"`, (2) prefixli `source: "/:locale(en|ar|de|es)/bunker-os"`. Tek `source: "/bunker-os"` yazılırsa `/en/bunker-os` vb. rename sonrası **404** olur (kaynak: `next.config.ts:13-18`, mevcut; genişletme = yeni).
- **Config redirect middleware'den ÖNCE çalışır** → `/bunker-os` → `/crew-os` (308) Accept-Language'dan bağımsız fire eder; sonra `/crew-os` için next-intl locale müzakeresi normal çalışır. Çift-redirect (SEO-anlamlı) yok. (Edge: `/tr/bunker-os` → middleware 307 → `/bunker-os` → 308 → `/crew-os`; `/tr/` prefix kullanıcı-dışı, önemsiz çift-hop.)
- **Eski `src/app/[locale]/bunker-os/` klasörü SİLİNMELİ** — redirect config'e taşınınca fiziksel route kalırsa redirect'le çakışır (route 200 kazanır, redirect hiç fire etmez). (kaynak: `src/app/[locale]/bunker-os/page.tsx`, mevcut → silinecek.)
- **`generateStaticParams` alt sayfada YOK — layout'tan miras alınır** (`src/app/[locale]/layout.tsx:49`, tek tanım). Yeni `crew-os/page.tsx` kendi `generateStaticParams`'ını yazmaz; 5-locale SSG layout'tan gelir (build teyitli). Discuss'taki "yeni crew-os generateStaticParams üretmeli" ifadesi **düzeltilir**: yalnız `page.tsx` gerekir.
- **`generateMetadata` canonical/alternates DÜZELTMESİ GEREKMEZ — çünkü page'de YOK.** `bunker-os/page.tsx:9-17` yalnız `title`/`description` set eder; canonical/alternates layout'tan miras (`layout.tsx:42-45` → canonical `"/"`). Yani rename için page-seviyesi canonical **güncellenecek bir şey yok**; yalnız `sitemap.ts` PATHS güncellenir. Discuss'taki "showcase generateMetadata canonical/alternates güncel" ifadesi **düzeltilir** (page'de canonical yok). ⚠️ **Latent SEO gözlemi (kapsam DIŞI, kayıt):** tüm alt sayfalar layout'tan canonical=`"/"` miras alıyor (her alt sayfa ana sayfaya canonicalize oluyor) — mevcut/faz-öncesi durum; bu dar rename fazının konusu değil, gelecek SEO fazı adayı.
- **Namespace `bunkerOs` 7 tüketicili — hepsi rename edilmeli** (paylaşılan `back`/`cta` şeridi): `bunker-os/page.tsx` (×2), `bunker-os/BunkerShowcase.tsx:9`, `spor-salonu-yazilimi/page.tsx:27`, `vaka-calismalari/page.tsx:31`, `bulten/ai-sdr-araclari/page.tsx:26`, `bulten/claude-opus-4-8-fable-5/page.tsx:32`. Namespace `bunker` 2 tüketicili: `Bunker.tsx:8`, `BunkerShowcase.tsx:10` (`tb`). Bir tüketici atlanırsa runtime `MISSING_MESSAGE`. (kaynak: hepsi repoda-tanımlı, grep-teyitli.)
- **JSON namespace anahtarı 5 dosyada eşzamanlı rename** (`messages/{tr,en,ar,de,es}.json` — `bunker`@131, `bunkerOs`@152). Anahtar-rename = "stale kopya" istisnası dışı; eksik/desync anahtar yasak. i18n-parite testi (`tests/i18n-parity.test.ts`) anahtar **kümesini** karşılaştırır, namespace adına string-referans vermez → 5 dosyada eşit rename edilirse yeşil kalır (test kodu değişmez).
- **Route path'e referans veren test güncellenir:** `tests/e2e/subpages-a11y.spec.ts:23` `{ label: "bunker-os", path: "/bunker-os" }` → `/crew-os`. `tests/e2e/a11y-helpers.ts:36-40` yalnız **yorum** olarak `/bunker-os` anar (fonksiyonel değil; opsiyonel tazeleme).
- **Kapsam-dışı kod tanımlayıcıları (dokunulmaz, discuss kararı — kayıt):** `components/bunker-os/` dizin + `Bunker.tsx`/`BunkerShowcase.tsx` dosya adları; `BunkerShowcase.tsx:117,220` `@keyframes bunkerback` animasyon adı; `Bunker.tsx:19` `id="bunker"` section id + `Nav.tsx:23` `href: "#bunker"` anchor + `nav.bunker` label anahtarı (ana sayfa fragment'i, URL taksonomisi değil — iç ad kalır; label değeri zaten "Crew OS"). Plan-phase teyit eder; varsayılan = dokunma.
- **`/forum` locale-prefix gap (KAPSAM DIŞI — kullanıcı kararı 2026-07-02):** `/en/forum` vb. → 404 ampirik bulundu; discuss'ın "301 zaten doğru" varsayımı bare yol içindi. Kullanıcı "kaydet, kapsam dışı" dedi — bu faz `/forum`'a dokunmaz; gap gelecek SEO fazı adayı olarak kayıtlı.

### Teknik Kararlar

- **Redirect = `next.config.ts` kalıcı (308) + açık 5-locale pattern** (Yaklaşım A). Çıplak `/bunker-os` + `/:locale(en|ar|de|es)/bunker-os` iki giriş. Gerekçe: SEO-doğru kalıcılık, edge-öncelik, eski klasör silinir; ampirik olarak locale-prefix'in açık yazılması **zorunlu**.
- **Namespace adları `crewOs` (showcase) + `crew` (teaser)** — plan-phase kesinleştirir; iki namespace ayrık. Gerekçe: public ad hizalaması, minimal/mekanik, değer değişmez.
- **Eski `bunker-os/` route klasörü silinir**, redirect config'e taşınır. Gerekçe: fiziksel route ↔ redirect çakışmasını önler.
- **Canonical/alternates & generateStaticParams'a page-seviyesinde dokunulmaz** — ikisi de layout'tan miras; rename yalnız `sitemap.ts` + iç link + namespace + route klasörü + test yüzeyini kapsar. Gerekçe: dar-faz disiplini; discuss'ın iki ifadesi (page canonical / page generateStaticParams gereği) bu bulguyla düzeltildi.
- **`/forum` ve kod-adı tanımlayıcıları kapsam dışı** (kullanıcı + discuss kararları). Gerekçe: dar cerrahi faz; taksonomi iç kod adına izin verir.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 11` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 11.01 | TASK-11.01 | ✅ Tamamlandı | SEO1: route `bunker-os/`→`crew-os/` + kalıcı 308 redirect (çıplak + 5-locale pattern) + sitemap PATHS + route-path test |
| 11.02 | TASK-11.02 | ✅ Tamamlandı | SEO2: i18n namespace `bunkerOs`→`crewOs` (7 tüketici) + `bunker`→`crew` (2 tüketici), 5-dil atomik (0 MISSING_MESSAGE) |
| 11.03 | TASK-11.03 | ✅ Tamamlandı | SEO3: iç link `/bunker-os`→`/crew-os` (Hero + Bunker; çift-redirect kaldırıldı — doğrudan hedef) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 11` oturumunda dolduruldu (2026-07-02).

**Tarih:** 2026-07-02
**Toplam Senaryo:** 13 | **Geçen:** 13 | **Kalan:** 0

**Test modu:** Otonom. **Ortam notu:** Canlı `next start` bu cloud devcontainer'da sandbox tarafından öldürüldü (worker-fork kısıtı, exit 144). Redirect doğrulaması **build ground-truth** üzerinden: derlenmiş `.next/routes-manifest.json` (edge'in runtime'da birebir uyguladığı redirect regex + statusCode) + TASK-11.01'in farklı ortamda kaydettiği canlı curl 308. İçerik/link/SSG doğrulaması diskteki prerender HTML (`.next/server/app/*.html`) — build ground-truth.

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | Public `/crew-os` 5 locale SSG → 200 (tr/en/ar/de/es) | ✅ Geçti | prerender-manifest: `/{tr,en,ar,de,es}/crew-os` 5 route + 5 `.html`; build ● SSG |
| 2 | Çıplak `/bunker-os` → **308** `/crew-os` (kalıcı) | ✅ Geçti | routes-manifest derlenmiş kural: `[308] /bunker-os → /crew-os` |
| 3 | Prefixli `/{en,ar,de,es}/bunker-os` → **308** `/{locale}/crew-os` (locale gap yok — kritik) | ✅ Geçti | routes-manifest: `[308] /:locale(en\|ar\|de\|es)/bunker-os → /:locale/crew-os` |
| 4 | Eski `/bunker-os` fiziksel route yok (redirect fire eder, route 200 kazanmaz) | ✅ Geçti | prerender-manifest bunker-os=`[]`; app dizininde `bunker-os` route yok (yalnız `components/bunker-os/` iç dizin) |
| 5 | `/forum` + `/forum/:slug` → **308** `/bulten` regresyonsuz (kapsam-dışı korundu) | ✅ Geçti | routes-manifest: `[308] /forum → /bulten` + `[308] /forum/:slug* → /bulten/:slug*` korunmuş |
| 6 | `next build` temiz + **0 MISSING_MESSAGE** (5 locale SSG, tüm alt sayfalar) | ✅ Geçti | build.log: `✓ Compiled successfully`, 0 MISSING_MESSAGE / 0 error / 0 warn |
| 7 | i18n 5-dil parite: `crewOs`+`crew` her dilde, `bunkerOs`+`bunker` (top-level) hiçbir dilde | ✅ Geçti | Vitest `i18n-parity` 5/5; 5 dilde top-level `bunker`/`bunkerOs`=`[]`, `crew`+`crewOs` var |
| 8 | `sitemap.xml` `/crew-os` (5 locale) içerir, `/bunker-os` içermez | ✅ Geçti | derlenmiş `sitemap.xml.body`: 5× `crew-os` loc, 0× `bunker-os` |
| 9 | İç linkler temiz: Hero+Bunker doğrudan `/crew-os` (prerender, çift-redirect yok), 5 locale doğru prefix | ✅ Geçti | prerender: TR 2× `/crew-os`, EN 2× `/en/crew-os`, AR 2× `/ar/crew-os`; 0 `/bunker-os` iç link |
| 10 | Kapsam-dışı kod tanımlayıcıları korundu: `nav.bunker` label + `#bunker` anchor + `@keyframes bunkerback` + `components/bunker-os/` import path | ✅ Geçti | `nav.bunker`="Crew OS" 5 dil; `id="bunker"`+`href="#bunker"`; `@keyframes bunkerback`; import path `@/components/bunker-os/` korundu |
| 11 | Guardrail a11y=100 çift-tema (showcase `/crew-os`, 5 locale × light+dark) | ✅ Geçti | CI `a11y (playwright+axe)` HEAD'de conclusion=success (`/crew-os` 5 locale × 2 tema WCAG-AA 0); showcase DOM'u değişmedi (identifier rename) → a11y=100 tabanı yapısal korunur |
| 12 | RTL (AR) + içerik regresyonsuz: `/ar/crew-os` 200, `dir=rtl`, "Crew OS" içerik boşluksuz | ✅ Geçti | `/ar/crew-os.html` `dir="rtl"` + "Crew OS" 2× render (boşluk yok) |
| 13 | Perf/CLS korunan taban: yalnız identifier rename (DOM/asset/görsel değişmez) → yapısal regresyonsuz | ✅ Geçti | Değişiklik yalnız URL/namespace tanımlayıcısı + href değeri; render edilen bayt (asset/görsel/DOM yapısı) değişmedi → perf/CLS yapısal olarak regresyonsuz |

**Otomatik kontrol bulguları (Adım 1):**
- **CI:** `fast (build+vitest)` 3 kod commit'inde ✅; `a11y (playwright+axe)` HEAD (7b2e808) dahil hepsinde ✅ (GitHub runner, gerçek tarayıcı). Düzeltme gerektiren bulgu **yok**.
- **npm audit:** 3 moderate (PostCSS XSS, `next` transitive) — **faz-öncesi kayıtlı TB-C**, bu fazın getirdiği değil; fix = `next` downgrade (breaking), kapsam dışı. Yeni bulgu değil.
- **Security-review:** Temiz / N-A — diff tamamen URL/namespace rename + statik-literal redirect (`destination` sabit iç path, kullanıcı-kontrolsüz → open-redirect yok); yeni girdi/secret/injection yüzeyi yok.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 11` oturumunda dolduruldu (2026-07-02).

### Ne İyi Gitti?
- **Ampirik research sessiz bir 404 bug'ını önledi.** research-phase, config redirect `source`'unun locale prefix'ini **otomatik kapsamadığını** yazmadan önce `/forum` curl'üyle kanıtladı (`/forum`→308 ama `/en/forum`→404). Bu yüzden redirect **iki açık giriş** (çıplak + `/:locale(en|ar|de|es)/…`) olarak yazıldı → rename sonrası `/en/bunker-os` vb. **404 olmadan** yönlendi. Kod-tahmini yerine ölçüm.
- **Dar cerrahi disiplin — public yüzey ≠ iç kod adı ayrımı korundu.** Yalnız kullanıcıya sızan katman (URL + i18n namespace) rename edildi; iç kod tanımlayıcıları (`Bunker.tsx`, `components/bunker-os/`, `@keyframes bunkerback`, `id="bunker"`, `nav.bunker`) bilinçle korundu (taksonomi izin veriyor). Diff minimal kaldı, "tam tutarlılık/kod dahil rename" refleksi elendi.
- **Research iki discuss over-claim'ini planlama öncesi düzeltti.** discuss'ın "page-seviyesi canonical/alternates güncellenecek" + "yeni crew-os generateStaticParams üretmeli" ifadeleri kaynak-teyidiyle çürütüldü (ikisi de layout'tan miras). Task'lar var olmayan yüzeyleri kovalamadı.
- **Sandbox kısıtı altında build-ground-truth UAT.** Canlı `next start` bu cloud devcontainer'da worker-fork kısıtıyla öldü (exit 144); redirect derlenmiş `routes-manifest.json` (`[308]` regex + statusCode) + TASK-11.01'in farklı ortamda kaydettiği canlı curl 308 ile doğrulandı. Kısıt sahte-geçmişe kaçmadan, dürüst ve kanıtlı kapatıldı.

### Ne Kötü Gitti?
- **Stray `next-server` port tuzağı tekrar tetiklendi (11.01 ilk curl `/crew-os`→404).** Önceki oturumdan kalan 2 stray process portu tutup eski build'i sundu → yanlış-negatif. Zaten memory'de kayıtlı disiplinle (listening-PID teyidi) hızlı teşhis edilip temiz portta çözüldü; kaybettirdiği süre az.
- **Canlı redirect doğrulaması bu oturumda yapılamadı (ortam kısıtı, defect değil).** `next start` sandbox'ta ölünce fresh canlı curl alınamadı; build ground-truth + önceki kayıtlı curl'e dayanıldı. Redirect/routing fazlarında canlı runtime gerektiğinde bu ortam sınırı hesaba katılmalı (gerçek-canlı teyit merge/Vercel gerektirebilir).

### Sonraki Faz İçin Öneriler
- **Sıradaki = v0.3 sonraki içerik fazı** (Versiyon Sonu Durumu `içerik_fazları` değişmez). Sıradaki Fazlar'da tek numarasız konu kaldı: **B1 Living Flow nabız kapsamı** (karar-gate'li, imza-riskli). Kapsam/sıra discuss-phase 12'de damgalanır.
- **Latent canonical=`/` SEO açığı biriktiriyor.** Tüm alt sayfalar layout'tan `canonical="/"` miras alıyor (her alt sayfa ana sayfaya canonicalize oluyor) — faz-öncesi durum, bu dar rename fazının konusu değildi. Gerçek bir SEO/metadata fazı geldiğinde page-seviyesi canonical/alternates ele alınmalı (kayıtlı açık).
- **`/forum` locale-prefix gap kayıtlı** (`/en/forum`→404, aynı config-redirect locale davranışından) — aynı gelecek SEO fazı adayı. `/forum` bu fazda bilinçle korundu (301 çalışıyor).
- **Config redirect locale-prefix tuzağı artık memory'de** ([next-config-redirect-locale-prefix](../memory/next-config-redirect-locale-prefix.md)) → gelecekteki her redirect'te iki-giriş deseni (çıplak + açık locale) kullanılmalı.

### Task-Spesifik Teknik Öğrenimler
<!-- Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar (araç davranışı, framework bug'ı, vb.). MEMORY.md'nin değil, faz retrosunun evidir. -->
- **`git mv` route rename'de history korudu.** `bunker-os/`→`crew-os/` klasör taşıması `git mv` ile yapıldı; eski dosya history'si yeni yolda izlenebilir kaldı (kör kopya-sil değil).
- **Namespace rename `sed`'inde exact-string ankraj kritik.** `bunkerOs`→`crewOs` (7 tüketici) + `bunker`→`crew` (2 tüketici) tek geçişte; JSON'da satır-başı 2-boşluk ankraj (`^  "bunker"`) `nav.bunker` (4-boşluk, iç içe) ve `useTranslations("bunker")` ↔ `"bunkerOs")` ayrımını korudu. Namespace substring çakışmasında ankraj deseni önden düşünülmeli.

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 11` oturumunda dolduruldu (2026-07-02). Faz saf URL/namespace tanımlayıcı rename'i (içerik/tasarım/davranış/DOM değişmedi). Eksenler rename'in doğruluğunu + guardrail regresyonsuzluğunu ölçer.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ | İçerik/kopya/tasarım/akış dokunulmadı; yalnız URL + i18n namespace + href değeri. Living Flow/imza sıfır değişim → zero template smell yapısal korunur. |
| Erişilebilirlik | ✅ | Showcase DOM'u değişmedi (identifier rename) → a11y=100 çift-tema tabanı yapısal korunur; CI `a11y (playwright+axe)` HEAD'de success (`/crew-os` 5 locale × light+dark WCAG-AA 0). Route-path test `/crew-os`'a güncellendi. |
| Performans | ✅ | Yalnız tanımlayıcı/href değişimi — render edilen bayt (asset/görsel/DOM yapısı) değişmedi → perf/CLS yapısal regresyonsuz. Yeni bağımlılık/asset YOK. Redirect edge-seviyesi (SSG'yi etkilemez). |
| Yerelleştirme & RTL | ✅ | Namespace rename 5-dil atomik (0 `MISSING_MESSAGE`), i18n-parite 5/5. Değerler dokunulmadı (TR tek kaynak, zaten "Crew OS" markalı → yeni stale-lik yok). AR `dir=rtl` + `/ar/crew-os` içerik boşluksuz korundu. |
| Modülerlik & Bakım | ✅ | Public yüzey (URL/namespace) ↔ iç kod adı (dosya/dizin/keyframe/id/nav.bunker) ayrımı bilinçle korundu → taksonomi tutarlı, diff minimal. İki namespace (`crew`/`crewOs`) ayrık. Redirect tek yerde (config), sitemap tek kaynak. |
| Hata Yönetimi & Degradasyon | ✅ | Redirect kalıcı 308 edge-seviyesi; yeni failure surface yok. Eski `bunker-os/` klasörü silindi → route↔redirect çakışması yok (redirect kesin fire eder). Build ground-truth (`routes-manifest`) ile doğrulandı. |
| Güvenlik | N/A | `security-review` N-A: `destination` sabit iç literal (kullanıcı-kontrolsüz → open-redirect yok); yeni girdi/secret/injection yüzeyi yok. npm audit 3 moderate = faz-öncesi kayıtlı TB-C (`next` transitif, statik-site istismar-edilemez, kapsam dışı). |
| Test Kapsamı | ✅ | Route-path test `/crew-os`'a güncellendi (`subpages-a11y.spec.ts`); i18n-parite testi anahtar-kümesini karşılaştırdığı için namespace rename'i yapısal kapsar (test kodu değişmedi, 5/5 yeşil). Yeni davranış yok → yeni test gerekmez. CI `fast`+`a11y` yeşil. |

### Kullanıcı Yolculuğu & Boşluk Tespiti

- **Public URL yolculuğu artık tutarlı.** İç kod adı "Bunker OS" URL'de sızmıyor; kullanıcı her yüzeyde (Hero teaser, Bunker teaser, sitemap, showcase) `/crew-os` görür. Eski `/bunker-os` linkleri kalıcı 308 ile korunur (SEO-güvenli, kırık link yok). Taksonomi kararının (DECISIONS 2026-06-27) son açık ucu kapandı.
- **Boşluklar (sahipli, yeni değil — hepsi kayıtlı):**
  1. **Latent canonical=`/`** — tüm alt sayfalar layout'tan ana-sayfa canonical'ı miras alıyor (faz-öncesi durum). Bu dar rename fazının konusu değil; gelecek SEO/metadata fazı adayı.
  2. **`/forum` locale-prefix gap** (`/en/forum`→404) — aynı config-redirect locale davranışı; kullanıcı kararıyla kapsam dışı, kayıtlı.
  3. **Non-TR alt-sayfa içerik tazeliği** (ar/de/es stale) — versiyon-sınırı, dil stratejisi (prd-review). Bu faz metin çevirmedi.
  - Hiçbiri sahipsiz değil; üçü de bir gelecek faza/kayda bağlı.

---

## Sonuç

- **Tamamlanma Tarihi:** 2026-07-02 (review-phase 11)
- **Toplam Task:** 3 (11.01 route rename + kalıcı 308 redirect [çıplak+5-locale] + sitemap · 11.02 i18n namespace `bunkerOs`→`crewOs`/`bunker`→`crew` 5-dil atomik · 11.03 iç link `/bunker-os`→`/crew-os` çift-redirect kaldırıldı)
- **Notlar:** v0.3'ün ikinci içerik fazı. Saf URL/namespace tanımlayıcı rename — içerik/tasarım/davranış/DOM değişmedi. Milestone karşılandı: public `/crew-os` (5 locale SSG) + `/bunker-os` kalıcı 308 redirect (çıplak+5-locale, locale gap yok) + namespace 5-dil senkron (0 `MISSING_MESSAGE`) + sitemap + iç link temiz (çift-redirect yok). UAT 13/13, 8 kalite ekseni (7 ✅ + 1 N/A güvenlik). Taksonomi (DECISIONS 2026-06-27) son açık ucu kapandı. Kapsam dışı/kayıtlı: latent canonical=`/`, `/forum` locale gap, kod-adı tanımlayıcıları (iç ad, korundu). Sıradaki = v0.3 sonraki içerik fazı (Sıradaki Fazlar'da yalnız B1 Living Flow nabız kaldı).

---

**Oluşturulma:** 2026-07-02 (discuss-phase 11)
**Son Güncelleme:** 2026-07-02 — review-phase 11 ✅: retrospektif + 8 kalite ekseni (7 ✅ + 1 N/A) + kullanıcı yolculuğu/boşluk yazıldı; durum ✅ Tamamlandı. Milestone karşılandı (public `/crew-os` 5-locale SSG + kalıcı 308 redirect çıplak+5-locale + namespace 5-dil senkron 0 MISSING_MESSAGE + sitemap/iç link temiz). Kaynak kod bağımsız teyit edildi (redirect/route/sitemap/namespace/iç link tutarlı). Kayıtlı açıklar: latent canonical=`/`, `/forum` locale gap (gelecek SEO fazı). **Faz 11 kapandı — sıradaki: discuss-phase 12 (v0.3 sonraki içerik fazı — B1 Living Flow nabız).**
