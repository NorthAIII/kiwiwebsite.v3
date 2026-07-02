# Phase 11: URL taksonomisi / SEO redirect (`/bunker-os` → `/crew-os`)

**Durum:** 🔄 Devam ediyor

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
| 11.03 | TASK-11.03 | ⬜ Bekliyor | SEO3: iç link `/bunker-os`→`/crew-os` (Hero + Bunker; çift-redirect kaldır) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 11` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 11` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 11` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / N/A | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Yerelleştirme & RTL | ✅ / ⚠️ / ❌ | ... |
| Modülerlik & Bakım | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi & Degradasyon | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / N/A | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-02 (discuss-phase 11)
**Son Güncelleme:** 2026-07-02 — run-task TASK-11.02 ✅: i18n namespace `bunkerOs`→`crewOs` (7 tüketici) + `bunker`→`crew` (2 tüketici) 5-dil atomik rename; Task Listesi'nde 11.02 ✅. Doğrulama ampirik (grep 0 kalan · i18n-parite 5/5 · build 0 MISSING_MESSAGE · a11y 10/10). Kalan: TASK-11.03 (iç link). Sıradaki adım: run-task 11.03.
