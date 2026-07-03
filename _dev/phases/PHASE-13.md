# Phase 13: v0.3 Versiyon-Sonu Teknik Borç — SEO-Metadata Hijyeni

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-13-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.3'ün versiyon-sonu **teknik borç kapatma fazı**. v0.3 içerik fazlarının (10/11/12) retrospektiflerinde biriken teknik borçlardan, birbirini tamamlayan iki **SEO/redirect hijyeni** kalemini kapatır: (TB-1) tüm alt sayfaların `layout.tsx`'ten miras aldığı yanlış `canonical="/"` — her alt sayfayı kendine canonicalize et + 5-locale hreflang alternates ekle; (TB-2) `/forum` locale-prefix gap'i (`/en/forum`→404) düzelt + next.config'teki **tüm** redirect'leri aynı sessiz locale-gap için denetle. Saf metadata/redirect katmanı — içerik/tasarım/davranış/DOM değişmez.

**Milestone:** Her alt sayfa (Crew OS showcase, Alpfit, vaka çalışmaları, bülten + makaleler) kendi path'ine canonical + 5-locale hreflang alternates deklare ediyor (artık `/`'a canonicalize olmuyor) **ve** ana sayfa `/` self-canonical kalıyor **ve** `/forum` + tüm config redirect'leri 5 locale'de (çıplak + prefixli) kalıcı 308 çalışıyor (sessiz 404 gap yok) **ve** hafif regresyon tohumu (canonical/alternates + redirect locale-kapsamı assertion; WebGL-flaky değil) yeşil; guardrail'ler regresyonsuz: a11y=100 çift-tema, perf korunan taban, CLS≈0, i18n 5-dil parite, 0 `MISSING_MESSAGE`.

### Feature Listesi

(MODULE-MAP ve modules/ referansı; kaynak: Faz 11 + Faz 12 retrospektif kayıtlı açıkları)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| TB-1: Alt-sayfa self-canonical + 5-locale hreflang alternates | M6 (metadata) + M2 (route sayfaları) | Her alt sayfa layout-miras `canonical="/"` yerine kendi path'ine canonical + 5-dil hreflang alternates; ana sayfa self-canonical korunur |
| TB-2: `/forum` locale-prefix gap + config redirect denetimi | M6 (next.config redirects) | `/en/forum` vb. 404 → çıplak+prefixli iki-giriş deseni; **tüm** config redirect'leri aynı gap için taranır (kök çözüm) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 13` oturumunda dolduruldu (2026-07-03). Versiyon-sonu tespiti: v0.3 içerik fazları (10/11/12) ✅ + Aktif Faz/Adım dolu → Versiyon Sonu Durumu `içerik_fazları`→`teknik_borç` damgalandı; bu, v0.3'ün teknik borç kapatma fazıdır.

### Alınan Kararlar

- **Faz 13 = versiyon-sonu teknik borç kapatma fazı** (Adım 0 tespiti). v0.3'ün üç içerik fazının retrospektifleri + DURUM/MODULE-MAP kayıtlı sahipli açıkları sistematik tarandı; kullanıcı "liste tam" onayı verdi.
- **Faz kapsamı = SEO-metadata hijyeni: TB-1 (canonical) + TB-2 (`/forum` locale gap)** (kullanıcı kararı). İkisi de Faz 11 kaynaklı, ucuz, iyi-anlaşılmış redirect/metadata işi; doğal bir tek paket ("SEO-hijyen çifti"). Dar-faz disiplini korunur (2-3 küçük task beklenir).
- **TB-1 kapsamı = self-canonical + 5-locale hreflang alternates** (kullanıcı kararı, kalıcılık ilkesi). Yalnız canonical'ı düzeltip alternates'i `/`'da bırakmak SEO'yu yarım bırakırdı; tam/doğru çözüm seçildi. Her alt sayfa kendi path'ine canonical + 5-dil hreflang; ana sayfa `/` self-canonical korunur.
- **TB-2 kapsamı = `/forum` gap düzelt + tüm config redirect'lerini denetle** (kullanıcı kararı, kök çözüm). Yalnız bilinen `/forum` gap'ini kapatmak yerine next.config'teki her redirect locale-prefix gap için taranır — aynı sessiz 404 başka redirect'te de olabilir. İki-giriş deseni (çıplak + `/:locale(en|ar|de|es)/…`) memory'de hazır (`next-config-redirect-locale-prefix`).
- **Hafif regresyon tohumu eklenir** (kullanıcı kararı, kümülatif test ilkesi). canonical/alternates + redirect locale-kapsamı için küçük assertion testi. **WebGL içermez** → Faz 12'de ertelenen full-motion tohumunun flakiness riski yok; gelecekte sessiz SEO regresyonunu yakalar.

### Kullanıcı Tercihleri

- Minimal/cerrahi: içerik/tasarım/davranış/DOM aynı kalır; yalnız metadata + redirect config katmanı (Faz 11 çizgisi).
- Kalıcılık > pansuman: canonical yarım değil tam (alternates dahil); redirect denetimi noktasal değil kök (tüm config).
- Kümülatif test: bu fazın ürettiği güvence bir sonraki regresyonu yakalasın (hafif, flaky-olmayan tohum).

### Çapraz Konular (plan/icrada uyulacak)

- **SEO doğruluğu (kritik):** canonical **mutlak/doğru path**; hreflang alternates **5 locale** (tr/en/ar/de/es) + doğru dil kodları (AR = `ar`); next-intl `as-needed` prefix ile locale URL'leri tutarlı (TR prefixsiz). Redirect **kalıcı 308** (`permanent: true`); **çift-redirect yok**. `sitemap.ts`/`robots.ts` ile canonical tutarlılığı gözden geçirilir.
- **Config redirect locale-prefix tuzağı (AMPİRİK, memory):** `source` literal eşleşir → locale prefix otomatik kapsanmaz; her redirect **iki giriş** ister (çıplak + `/:locale(en|ar|de|es)/…`). `/bunker-os` Faz 11'de düzeltildi; `/forum` hâlâ açık — ama denetim **tüm** redirect'leri kapsar (kök çözüm). Referans: `_dev/memory/next-config-redirect-locale-prefix.md`.
- **Kopya-kod refleksine dikkat (modülerlik, Faz 10 `<Logo>` dersi):** canonical/alternates metadata'sı her sayfaya elle kopyalanırsa drift doğar → ortak yardımcı (path→metadata helper) veya layout-seviyesi dinamik canonical değerlendirilir (mekanizma research/plan işi; ilke: tek kaynak, kopya-kod değil).
- **i18n:** Yeni i18n **anahtarı yok** (metadata/redirect işi) → 5-dil parite riski yok; ama hreflang alternates locale kodları doğru olmalı. Değer çevirisi bu fazın konusu değil.
- **Guardrail regresyonsuzluğu:** Saf metadata/redirect → render edilen DOM/asset/görsel değişmez → a11y=100 çift-tema / perf tabanı / CLS≈0 **yapısal** regresyonsuz (Faz 11 emsali); yine de doğrulanır. `next build` temiz + 0 `MISSING_MESSAGE`.
- **Ortam kısıtı (Faz 11 dersi):** Bu cloud devcontainer'da canlı `next start` sandbox tarafından öldürülebilir (worker-fork, exit 144). Redirect/metadata doğrulaması **build ground-truth** ile yapılabilir: `routes-manifest.json` (redirect regex + statusCode) + prerender HTML `<head>` (canonical/alternates). Kanıt-artefaktına bağlanır (sahte-geçmiş yok).
- **RTL (AR):** URL/metadata işi görsel yön içermez; `/ar` canonical/alternates + redirect `dir` etkilenmez. Site-geneli logical-ok (TB-4) bu fazın konusu değil (kayıtlı ayrı borç).

### Kapsam Dışı

- **TB-3: fixed-backdrop full-motion test tohumu** — WebGL runtime flaky (memory `playwright-bundled-chromium-webgl-yok`) diye Faz 12'de bilinçle ertelendi; kayıtlı sahipli açık, gelecek faz (maliyet/flakiness tartılarak).
- **TB-4: site-geneli logical-ok (RTL)** — 10+ ok, geniş yüzey; site-geneli tutarlı-birlikte iş (lone-flip yaratmamak için tek tek yapılmaz). Kayıtlı ayrı borç (Faz 10 kararı).
- **TB-5: npm audit 3 moderate** (PostCSS/`next` transitif) — fix = `next` downgrade (breaking, Dokunulmazlar). Statik-site istismar-edilemez; kayıtlı sahipli açık, `next` major upgrade'de doğal kapanır.
- **B grubu → prd-review:** non-TR alt-sayfa içerik tazeliği (ar/de/es stale, dil stratejisi/versiyon-sınırı) · AR/dil-seti stratejisi (vizyon-seviyesi) · brief mobil perf açığı (Lantern körlüğü → gerçek-cihaz/Vercel field ölçümü gerekir, lab'da kodla kapanmaz). Üçü de strateji/ölçüm konusu, kod borç değil → versiyon-sonu akışının doğal evi prd-review.
- **Kod-adı tanımlayıcıları** (`Bunker.tsx`, `components/bunker-os/`, `nav.bunker`, `#bunker`) — iç kod adı, taksonomi izin veriyor (dokunulmaz).
- **İçerik/kopya/tasarım/davranış/route değişimi** — metin, akış, URL path'leri (redirect kaynağı hariç) aynı kalır; yalnız metadata + redirect config.
- **Yeni i18n anahtarı / yeni bağımlılık** — faz saf metadata/redirect; `package.json` ve `messages/*` anahtar-kümesi dokunulmaz.

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 13` oturumunda dolduruldu (2026-07-03). Kaynak: kod tabanı incelemesi (layout + 5 alt-sayfa `generateMetadata`, next.config redirects, sitemap/robots/routing) + `next-config-redirect-locale-prefix` memory (Faz 11 ampirik). Doğrulama build ground-truth ile verify-plan/task'ta yapılır (bu cloud devcontainer'da `next start` sandbox tarafından öldürülebilir → `routes-manifest.json` + prerender `<head>`).

### Mevcut Durum Tespiti (kök neden)

**TB-1 — canonical/hreflang miras hatası:**
- `alternates: { canonical, languages }` **layout `generateMetadata`'sında** tanımlı (`src/app/[locale]/layout.tsx` — kaynak: repoda-tanımlı) → yalnız ana sayfa için doğru.
- 5 alt sayfanın hepsinin kendi `generateMetadata`'sı **yalnız `title`/`description`** set eder, `alternates` set **etmez** (`crew-os`, `spor-salonu-yazilimi`, `vaka-calismalari`, `bulten/ai-sdr-araclari`, `bulten/claude-opus-4-8-fable-5`).
- **Next.js App Router metadata sığ-merge (shallow):** alt sayfa `alternates`'i vermediği için layout'unkini **aynen miras alır** → her alt sayfa `canonical="/"` + tüm hreflang'ler ana sayfaya işaret eder ("kanonik'im ana sayfa"). TB-1'in tam kökü.
- **Kritik mekanik:** sığ-merge'de `alternates` **bütün-obje** olarak değişir → düzeltirken her sayfaya `canonical` + `languages`'ı **birlikte** (tam obje) yazmak şart; yalnız `canonical` yazmak `languages`'ı düşürür.

**TB-2 — redirect locale-gap denetimi (4 redirect'in tümü tarandı):**

| Redirect (`next.config.ts`) | Locale twin | Durum |
|---|---|---|
| `/bunker-os` → `/crew-os` (+ `/:locale(en\|ar\|de\|es)/bunker-os` twin) | ✅ var | Faz 11'de kapatıldı, sağlam |
| `/forum` → `/bulten` | ❌ yok | `/en/forum`→404 gap **+ hedef `/bulten` 404** (aşağıda) |
| `/forum/:slug*` → `/bulten/:slug*` | ❌ yok | `/en/forum/x`→404 gap; hedef geçerli (200) |

- **Beklenmedik bulgu (denetimden çıktı):** `src/app/[locale]/bulten/` altında **index `page.tsx` YOK** (yalnız 2 makale klasörü). Yani `/forum` → 308 → `/bulten` = **404'e iniyor**. Kod tabanında `/bulten` index'e link yok; bülten içeriği ana sayfada `id="forum"` bölümünde (`src/components/Forum.tsx:12`), makale linkleri doğrudan `/bulten/<slug>`. Locale-twin eklemek düzeltmeden **1 yerine 5 locale'i 404'e** yönlendirirdi.

### Değerlendirilen Yaklaşımlar

**TB-1 canonical mimarisi:**
- **A — Sayfa-içi elle alternates:** Her sayfa `generateMetadata`'sında `alternates`'i elle kurar. Artı: açık, basit. Eksi: 6 sayfaya kopya-kod → drift (Faz 10 `<Logo>` dersiyle aynı tuzak); her yeni sayfa hatırlamak zorunda.
- **B — Ortak helper (`localizedAlternates(locale, path)` → `{canonical, languages}`):** Tek yardımcı, her sayfa kendi path'iyle çağırır. Artı: tek kaynak, DRY, modülerlik+kalıcılık ilkesi; yeni sayfa tek satırla katılır. Eksi: her sayfa yine helper'ı çağırmalı (unit test/lint ile güvenceye alınır). **`alternates`'i layout'tan kaldırıp her sayfaya taşı** → **fail-safe:** bir sayfa unutursa `canonical` *yok* olur (Google URL'in kendisini self-referans alır = zararsız); layout'ta kalsaydı unutan sayfa yine *yanlış* `/`'a canonicalize olurdu = zararlı.
- **C — Layout-seviyesi pathname'den dinamik canonical:** Reddedildi — App Router `generateMetadata`'ya tam pathname geçmez (yalnız `params`=locale); middleware header enjeksiyonu gerektirir, kırılgan.
- **Seçilen: B (ortak helper + alternates layout'tan sayfalara taşınır).** Kalıcılık (fail-safe default) + modülerlik (kopya-kod yok) ilkeleriyle hizalı. sitemap.ts zaten aynı locale→prefix mantığını kullanıyor (`locale === defaultLocale ? "" : /${locale}`) → bu eşlemeyi ortak util'e çıkarıp sitemap + helper'ı tek kaynağa bağla.

**TB-2 redirect:**
- **Seçilen:** Kanıtlı iki-giriş desenini (`/bunker-os` emsali, memory) `/forum` + `/forum/:slug*`'a uygula. Düşük risk; desen Faz 11'de ampirik doğrulandı.

### Alınan Kararlar (bu oturumda kullanıcı onayı)

- **`/forum` (index) hedefi → `/`** (kullanıcı kararı). Denetim `/bulten` index'in 404 olduğunu ortaya çıkardı; bülten içeriği zaten ana sayfada → `/forum` → `/` (5 locale twin ile) en dürüst/kalıcı çözüm. `/forum/:slug*` → `/bulten/:slug*` hedefi geçerli, yalnız locale-twin eklenir. **Not:** `/bulten` index'in kendisini oluşturmak kapsam dışı (içerik/route üretimi); bu düzeltme yalnız redirect hedefini geçerli kılar.
- **`x-default` hreflang eklenir → varsayılan locale'in prefixsiz URL'i** (kullanıcı kararı). Google dil-müzakere best-practice; helper'a tek satır, tüm sayfalara uniform gelir.

### Kullanılacak Araçlar/Kütüphaneler

- **Yeni bağımlılık yok.** Mevcut stack: next-intl v4.1 (`routing.locales`/`defaultLocale` helper girdisi), Next.js 15.3 App Router metadata API (`metadataBase` zaten `https://kiwiailab.com` → relative canonical/languages absolute'e çözülür).
- **Test:** Vitest **node** (helper saf-fonksiyon unit testi + `routes-manifest.json` redirect locale-kapsam assertion'ı) — mevcut 3-katman altyapısı (`docs/TESTING.md`), WebGL/Playwright gerektirmez.

### Dikkat Edilecekler

- **`alternates` sığ-merge bütün-obje:** her sayfada `canonical` + `languages` (+`x-default`) birlikte; eksik alan diğerini düşürür. (Kaynak: Next.js metadata resolution, repoda-tanımlı davranış.)
- **Config redirect `source` locale-prefix'i otomatik kapsamaz** (AMPİRİK, `_dev/memory/next-config-redirect-locale-prefix.md`): her redirect iki giriş (çıplak + `/:locale(en|ar|de|es)/…`); `permanent:true`→308; çift-redirect yok (config middleware'den önce edge'de).
- **Çakışan fiziksel route uyarısı:** Redirect kaynağıyla aynı yolda route klasörü kalırsa route 200 kazanır — `/forum` klasörü yok (teyitli), sorun yok.
- **Kopya-kod refleksi (Faz 10 dersi):** canonical/alternates + locale→prefix mantığı tek helper/util'de; sayfalara elle kopyalama yok.
- **i18n:** yeni anahtar yok → 5-dil parite riski yok; hreflang locale kodları doğru (AR=`ar`). Değer çevirisi faz konusu değil.
- **Sitemap/robots tutarlılığı:** helper locale→URL eşlemesi sitemap.ts ile aynı kaynaktan gelmeli (drift önleme); robots dokunulmaz.
- **Ortam kısıtı:** Doğrulama build ground-truth (`routes-manifest.json` redirect regex+statusCode; prerender `<head>` canonical/alternates) — kanıt-artefaktına bağlanır, sahte-geçmiş yok.

### Teknik Kararlar

- **TB-1:** ortak `localizedAlternates(locale, path)` helper (canonical + 5-dil languages + x-default); `alternates` layout'tan kaldırılıp ana sayfa dahil her sayfa kendi path'iyle çağırır (fail-safe). locale→prefix eşlemesi sitemap.ts ile ortak util. *(Gerekçe: kalıcılık fail-safe default + modülerlik kopya-kod yok; ILKELER.)*
- **TB-2:** `/forum` → `/` (+ locale twin), `/forum/:slug*` → `/bulten/:slug*` (+ locale twin); `/bunker-os` çifti korunur. İki-giriş deseni memory'den. *(Gerekçe: kök çözüm — tüm redirect'ler locale-kapsamlı; `/forum` 404-hedefi düzeltilir.)*
- **Regresyon tohumu:** Vitest node — (1) helper unit testi (deterministik canonical/alternates çıktısı), (2) `routes-manifest.json` her redirect için çıplak+prefixli giriş assertion'ı. WebGL/flaky değil. *(Gerekçe: kümülatif test ilkesi; Faz 12 ertelenen full-motion flakiness riski yok.)*
- **Sınır:** içerik/kopya/tasarım/davranış/DOM/route path değişmez; `/bulten` index oluşturma kapsam dışı (yalnız redirect hedefi geçerli kılınır). *(Gerekçe: cerrahi minimal, kapsam disiplini.)*

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 13` oturumunda dolduruldu (2026-07-03). 4 task; bağımlılık zinciri 13.01→13.02→13.03 (TB-1), 13.04 bağımsız (TB-2). Sıra 13.02→13.03 (alt sayfalar önce, layout→home sonra) regresyon penceresi bırakmaz.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 13.01 | TASK-13.01 | ✅ Tamamlandı | TB-1: ortak `localizedAlternates` helper + locale-path util + sitemap refactor + helper unit testi |
| 13.02 | TASK-13.02 | ✅ Tamamlandı | TB-1: 5 alt sayfaya self-canonical + 5-locale hreflang alternates (helper çağrısı) |
| 13.03 | TASK-13.03 | ✅ Tamamlandı | TB-1: alternates'i layout'tan ana sayfaya taşı (fail-safe default; layout artık canonical miras ettirmez) |
| 13.04 | TASK-13.04 | ✅ Tamamlandı | TB-2: `/forum` locale-gap + config redirect denetimi (`/forum`→`/`) + redirect regresyon tohumu |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 13` oturumunda dolduruldu (2026-07-03). Otonom test (build ground-truth: `routes-manifest.json` + prerender `<head>` + Vitest). Otomatik kontroller: CI yeşil (fast+a11y job); npm audit 3 moderate = kayıtlı TB-5 (kapsam dışı); security temiz (saf metadata/redirect, runtime girdi/secret/auth yok).

**Tarih:** 2026-07-03
**Toplam Senaryo:** 16 | **Geçen:** 16 | **Kalan:** 0

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | **TB-1** Ana sayfa TR self-canonical `/` + 5-dil hreflang + x-default (`<head>`) | ✅ Geçti | `tr.html`: canonical=`kiwiailab.com`; 5 hreflang + x-default |
| 2 | **TB-1** Ana sayfa non-TR (EN/AR) self-canonical prefixli (`/en`,`/ar`) + hreflang seti | ✅ Geçti | EN canonical=`/en`, AR=`/ar`; hreflang seti tam |
| 3 | **TB-1** 5 alt sayfa TR her biri kendi path'ine canonical (crew-os/spor-salonu/vaka/2 bülten), 6 hreflang link | ✅ Geçti | Her sayfa self-canonical; 6 hreflang link/sayfa |
| 4 | **TB-1** Alt sayfa non-TR (EN `/en/crew-os`, AR bülten) self-canonical prefixli + hreflang | ✅ Geçti | EN crew-os tam 6 hreflang doğru prefix'li |
| 5 | **TB-1 adversarial** Hiçbir alt sayfa `/`'a canonicalize olmuyor — yalnız home TR çıplak-kök (sayı=1) | ✅ Geçti | Çıplak-kök canonical taşıyan sayfa sayısı=1 (`tr.html`) |
| 6 | **TB-1 fail-safe** layout `generateMetadata` alternates miras ETTİRMEZ → unutan sayfa canonical-yok (zararsız), yanlış-`/` değil | ✅ Geçti | layout `generateMetadata`'da alternates yok (yalnız yorum) |
| 7 | **TB-1** hreflang doğruluğu: AR=`ar` kodu; x-default = varsayılan locale prefixsiz URL | ✅ Geçti | AR=`ar`; x-default = TR prefixsiz URL (helper+prerender) |
| 8 | **TB-2** `/forum` → `/` 308 (çıplak index; hedef `/bulten` değil — `/bulten` index yok) | ✅ Geçti | manifest: `/forum`→`/` 308 |
| 9 | **TB-2** Locale gap kapandı: `/en/forum`,`/ar/forum`,`/de/forum`,`/es/forum` → `/:locale` 308 | ✅ Geçti | twin regex 4 non-default prefix eşler; `/tr/forum` eşleşmez |
| 10 | **TB-2** `/forum/:slug*` → `/bulten/:slug*` 308 + tüm non-default locale twin | ✅ Geçti | çıplak+twin manifest'te 308 |
| 11 | **TB-2 sıra mührü** çıplak `/forum` slug redirect'ine DÜŞMEZ (→ `/`, `/bulten` değil) | ✅ Geçti | firstMatch(`/forum`).dest=`/` (test mührü) |
| 12 | **TB-2 regresyon** `/bunker-os` çifti korundu (Faz 11): çıplak+twin → `/crew-os` 308 | ✅ Geçti | manifest: çıplak+twin `/crew-os` 308 |
| 13 | **Tohum** Test suite yeşil: 39 test (seo-metadata + seo-redirects tohumları dahil), manifest ground-truth | ✅ Geçti | 5 dosya/39 test; i18n-parity 5·seo-redirects 16·seo-metadata 16·umami 1·smoke 1 |
| 14 | **Guardrail** i18n 5-dil parite regresyonsuz + `next build` 0 `MISSING_MESSAGE` | ✅ Geçti | parite testi yeşil; build temiz, 0 MISSING_MESSAGE |
| 15 | **Guardrail** Sitemap ↔ canonical tutarlılığı: 30 URL, her biri sayfa self-canonical'ıyla birebir (non-TR home `/en` slashsiz) | ✅ Geçti | sitemap 30 URL (5×6); canonical'larla birebir |
| 16 | **Guardrail** Yapısal regresyonsuz: yalnız `<head>`+config değişti, DOM/asset/görsel değişmedi → a11y (CI axe home light+dark yeşil) / perf taban / CLS≈0 korunur | ✅ Geçti | CI a11y job yeşil; render surface değişmedi (yapısal emsal Faz 11) |

**Otomatik kontroller (Adım 1):**
- **CI (GitHub Actions):** HEAD `80570d8` — `fast (build+vitest)` ✅ + `a11y (playwright+axe)` ✅ (her iki job, tüm adımlar `success`).
- **npm audit:** 3 moderate (postcss→next→next-intl transitif) = kayıtlı **TB-5** (kapsam dışı: fix=next downgrade breaking, Dokunulmazlar; statik-site istismar-edilemez). Yeni bulgu değil, düzeltme task'ı üretmez.
- **Security (odaklı faz-13 diff incelemesi):** Temiz. Saf metadata/redirect config; runtime kullanıcı girdisi yok (redirect kaynak/hedef statik iç path; helper girdileri locale=whitelist-doğrulanmış + path=hardcoded literal, çıktı `<link href>`'e Next-escape). Secret/auth yüzeyi yok. (Tam-branch `/security-review` skill'i koşulmadı — tüm revize branch'ini tarar, faz-dışı/off-target.)

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 13` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 13` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / ⚠️ / ❌ | ... |
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

**Oluşturulma:** 2026-07-03 (discuss-phase 13)
**Son Güncelleme:** 2026-07-03 — verify-phase 13 ✅: UAT 16/16 senaryo geçti (otonom, build ground-truth: `routes-manifest.json` + prerender `<head>` + Vitest) + otomatik kontroller temiz (CI fast+a11y yeşil; npm audit 3 moderate=kayıtlı TB-5 kapsam dışı; security temiz) → **düzeltme task'ı YOK**. TB-1 (her sayfa self-canonical + 5-dil hreflang/x-default; yalnız home TR çıplak-kök; layout fail-safe) + TB-2 (6 redirect 308, `/forum`→`/` locale-gap kapalı, sıra mührü) + guardrail'ler (i18n parite, 0 MISSING_MESSAGE, sitemap 30 URL canonical-tutarlı, yapısal regresyonsuz) doğrulandı. Faz dokümanı boyut kontrolü ✅ (~6.4k token, tek-okunabilir). **Faz 13 icra+UAT bitti → Adım review.** Sıradaki adım: review-phase 13.
