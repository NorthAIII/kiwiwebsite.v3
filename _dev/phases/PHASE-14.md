# Phase 14: v0.3 Versiyon-Sonu Senaryo Testi (ana sayfa + 5 alt sayfa uçtan-uca)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-14-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.3'ün (görsel & etkileşim cilası + URL taksonomisi/SEO + Living Flow nabız + SEO-metadata hijyeni) versiyon-sonu **Senaryo Testi** fazı — zorunlu `prd-review` öncesi son kapı. v0.3 içerik fazları (10 görsel cila, 11 URL taksonomisi/SEO, 12 Living Flow nabız, 13 SEO-metadata hijyeni) ve teknik borç fazının **task/faz-seviyesi** UAT'larının göremediği **dikişleri, tam kullanıcı yolculuklarını, mod kombinasyonlarını ve adversarial durumları** uçtan-uca doğrular. İş **doğrulama**: yeni içerik/feature üretilmez. Kapsam-içi (ana sayfa veya 5 alt sayfa) gerçek bug çıkarsa düzeltme task'ı olur; kapsam-dışı / zaten-ertelenmiş kalemler kaydedilip yönlendirilir.

**v0.3'ün Faz 9'dan (v0.2 senaryo testi) deltası — asıl yeni doğrulanacak yüzeyler:**
- **Faz 11 — `/bunker-os` → `/crew-os` route rename:** public URL değişti; eski URL 308 redirect (çıplak+5-locale), iç linkler temizlendi, i18n namespace `bunker`→`crew` 5-dil rename. Tüm giriş matrisini + taksonomi tutarlılığını etkiler.
- **Faz 12 — Living Flow sayfa-boyu nabız (imza-riskli):** ana sayfa artık desktop'ta sayfa-boyu nabız (sürekli soluk iplik + bölüme-uyarlanan `--flow-veil` opaklık + tek WebGL context); mobil korunur (aşağı-taşıma desktop-only). En büyük yeni craft/degradasyon yüzeyi.
- **Faz 13 — SEO-metadata katmanı:** alt-sayfa self-canonical + 5-locale hreflang/x-default; `/forum` → `/` 308 (hedef artık `/bulten` değil); `seo-metadata`+`seo-redirects` tohumları (suite 39 test).
- **Faz 10 — görsel cila:** ortak `<Logo>` her yüzeyde; Hero CTA kartı ok-affordance; scroll göstergesi ölçek.

**Kapsam sınırı (kullanıcı kararı):** ana sayfa + 5 alt sayfa uçtan-uca — Faz 9 çıtası korunur (v0.3 rota değiştirdi + Living Flow'u sayfa boyuna taşıdı; ikisi de çapraz yüzey → bütünsel doğrulama). 5 alt sayfa Faz 11 sonrası: `/crew-os`, `/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`.

**Milestone:** *(Faz 2/3/8/9 dersi uygulandı: versiyon-sonu doğrulama milestone'u "ölç + kaydet + karar ver" olarak yazılır — geçiş peşinen varsayılmaz.)*
1. Ana sayfa + 5 alt sayfa uçtan-uca senaryo kataloğu (S1–S9) otonom koşuldu;
2. her senaryonun sonucu (geçti / bulgu) kayıt altına alındı;
3. bulgular **triyaj** edildi — kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug'lar düzeltme task'ına, kapsam-dışı / ertelenmiş kalemler sahipli kayda;
4. **TR yolculuğu birincil** olarak bütünsel-tutarlı doğrulandı (ana sayfa + alt sayfalara çıkış/dönüş, **Crew OS çıkışı artık `/crew-os`**) + **non-TR yüzeyleri tutarlı** (parite / render bütünlüğü / AR-RTL aynalama; bilinçli-stale değerler görünür kopukluk yaratmıyor);
5. **v0.3 kazanım guardrail'leri regresyonsuz teyit edildi** — a11y=100 çift-tema (home + 5 alt sayfa) + axe suite yeşil · **SEO metadata katmanı** (canonical self + 5-locale hreflang/x-default per sayfa + redirect locale-kapsamı + sitemap↔canonical tutarlılık, `seo-*` tohumları) · **Living Flow sayfa-boyu nabız imza korundu** (desktop perf 100/CLS 0, kontrast=100 çift-tema, fallback/reduced-motion sağlam) · perf korunan taban (mobil LCP≈3164ms, masaüstü 100, CLS≈0) · i18n 5-dil parite (0 `MISSING_MESSAGE`) · CI (`fast`+`a11y`) yeşil.

### Feature Listesi

(Senaryo testi çapraz/doğrulama fazıdır — "feature" değil **senaryo grupları (validation units)**; her grup tetiklediği birincil modüle eşlenir. MODULE-MAP `— v0.3 …` iş birimleri (Faz 10–13) + M1–M6 referansı.)

| Senaryo Grubu | Modül | Açıklama |
|---------------|-------|----------|
| S1: Giriş noktaları & yönlendirme matrisi | M4 (+M6) | 5 dil ana sayfa + 5 alt sayfa route'ları (TR prefixsiz + /en /ar /de /es); **`/crew-os` yeni public** (5 dil 200); **`/bunker-os`→`/crew-os` 308** (çıplak+5-locale twin); **`/forum`→`/` 308** (Faz 13: hedef artık `/bulten` değil), `/forum/:slug*`→`/bulten/:slug*` 308; bilinmeyen-locale, derin-link |
| S2: Tam TR yolculuğu — ana sayfa → alt sayfalar | M2 (+M3) | Hero → ikincil CTA → sektörler (gym + Alpfit çıkış) → 4-adım → **Crew OS (çıkış artık `/crew-os`)** → Forum → Footer; + ana sayfadan alt sayfalara çıkış (Alpfit/Crew OS/vaka/bülten) → içerik bütünlüğü → dönüş; **`<Logo>` her yüzeyde tutarlı** (Faz 10); CTA/nav doğru, kopuk link/`/tr/`-sızıntı/boş bölüm yok |
| S3: Mod kombinasyonları (Living Flow degradasyon) | M1 (+M3) | **EN BÜYÜK v0.3 delta:** ana sayfa **sayfa-boyu nabız** (Faz 12: sürekli soluk iplik + bölüme-uyarlanan `--flow-veil` + tek WebGL context) — light/dark (FOUC yok), reduced-motion (StaticFlow, **tüm sayfa** sadece hero değil), no-WebGL, **mobil "low" (nabız desktop-only → mobil korunur)**, **AR-RTL × dark × reduced birlikte**, 320/768/1440 taşma yok + near-zero CLS; craft: `--flow-veil` washi okunabilirlik (light-bleed çözümü) |
| S4: Kontroller & kalıcılık | M3 (+M1/M4) | tema toggle (localStorage + reload kalıcılık + Living Flow uniform **sayfa-boyu**), dil-switcher (path koru — **`/crew-os` dahil**, klavye/Escape/dış-tık), **klavye-only yolculuk** + focus-visible; alt sayfada da dil-switcher path korur |
| S5: Taksonomi & dürüstlük tutarlılığı (çapraz/sahipsiz) | M2 (+M4) | **"Crew OS" her yüzeyde / "Bunker" hiçbir görünür yüzeyde yok — artık URL'de de yok** (Faz 11: public `/crew-os`); kod-adı kalıntısı (`components/bunker-os/`, `#bunker` anchor, namespace) render'dan ayrıştırılır; render'da uydurma sonuç / sahte "● online" / yasak metafor yok (gerçek-canlı ürün dürüst göstergesi meşru) |
| S6: 5-dil bütünlük & non-TR tutarlılığı (versiyon-sonu çekirdek) | M4 (+M2) | parite (Vitest yeşil, eksik anahtar=fail), render `MISSING_MESSAGE` yok (ana sayfa + 5 alt sayfa × 5 dil), **namespace `bunker`→`crew` 5-dil senkron** (Faz 11 SEO2), bilinçli-stale non-TR görünür kopukluk yok, **AR-RTL aynalama** |
| S7: Chatbot (0-token: offline + sanitizasyon) | M5 | key-yok offline UI (sahte-online-yok) + sanitizasyon kod-inceleme + malformed-input kısa-devre (rol enjeksiyonu / boş / sonda-user-yok → API'ye ulaşmadan red) + stream-kopması UI takılmaz; **toplam API çağrısı = 0**. *(v0.3 chat'e dokunmadı → regresyon riski yok; versiyon-sonu bütünsellik + 0 maliyet için Faz 9 paritesinde korundu — kullanıcı kararı)* |
| S8: v0.3 kazanım guardrail'leri (çapraz — suite koşu) | tümü | **v0.3'ün çekirdeği:** a11y=100 çift-tema (home + 5 alt sayfa Lighthouse) + axe `test:e2e` yeşil (fail-on-regression) · **SEO metadata katmanı (YENİ, Faz 13):** self-canonical + 5-locale hreflang/x-default per sayfa + redirect locale-kapsamı + sitemap↔canonical tutarlılık (`seo-metadata`+`seo-redirects` tohumları, suite **39 test**) · **Living Flow sayfa-boyu nabız tabanı (Faz 12):** desktop perf 100/CLS 0, kontrast=100 çift-tema full-motion · perf korunan taban (mobil LCP≈3164ms, masaüstü 100, CLS≈0) · CI (`fast`+`a11y`) yeşil |
| S9: Adversarial / holistik kırma | tümü | JS-kapalı SSG okunabilirlik (ana sayfa + alt sayfalar), hızlı dil/tema toggle race, hızlı scroll/anchor zıplama (**sayfa-boyu nabız + ScrollTrigger kararlılığı**), `next build` temiz + 0 MISSING_MESSAGE (regresyon tabanı), canonical/redirect tohumu yeşil |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 14` oturumunda dolduruldu (2026-07-03). Versiyon-sonu tespiti (Adım 0b): Versiyon Sonu Durumu `senaryo_testi` (review-phase 13 `teknik_borç`→`senaryo_testi` damgaladı); Faz 14 (senaryo testi) PHASES.md tablosunda yoktu → senaryo testi fazına girildi. Bu, v0.3'ün zorunlu `prd-review` öncesi uçtan-uca doğrulamasıdır.

### Alınan Kararlar

- **Faz tipi = v0.3 versiyon-sonu Senaryo Testi (sabit faz).** Doğrulama fazı — yeni feature üretilmez; çekirdek soru: task/faz-UAT'larının göremediği dikiş/yolculuk/çapraz/adversarial katmanda v0.3 tutarlı mı. Faz 3 (v0.1) ve Faz 9 (v0.2) modeli; S1–S9 iskeleti v0.3'ün deltasına (route rename + sayfa-boyu nabız + SEO metadata + logo) uyarlandı.
- **Kapsam sınırı = ana sayfa + 5 alt sayfa uçtan-uca** (kullanıcı kararı 2026-07-03). Faz 9 çıtası korunur. Gerekçe: v0.3 iki çapraz yüzey getirdi — (a) `/crew-os` route rename tüm giriş matrisini + iç linkleri + taksonomiyi etkiler; (b) Living Flow artık ana sayfa boyu (desktop) → hero-ötesi tüm bölümlerin degradasyon/craft yüzeyi. İkisi de dar-kapsamla yakalanamaz → bütünsel 6-sayfa uçtan-uca. **a11y-DERİNLİK Faz 8'de yapıldı, tekrar edilmez** — senaryo testi yalnız yolculuk-içi tutarlılığı + v0.3 guardrail re-teyidini doğrular (a11y=100 çift-tema re-teyidi S8 guardrail'inde, yeni denetim değil).
- **TR birincil öncelik** (kullanıcı teyidi, yerleşik desen). TR yolculuğu derin/bütünsel doğrulanır (ana sayfa + alt sayfalara çıkış/dönüş); non-TR (EN/AR/DE/ES) yalnız **tutarlılık** katmanında (parite + render bütünlüğü + AR-RTL aynalama) — içerik-kalite derin denetimi DEĞİL. "Bilinçli-stale non-TR görünür kopukluk yaratıyor mu?" in-scope; stale içeriğin *kalitesi* out-of-scope (versiyon-sınırına ertelendi — ILKELER "TR tek kaynak", DECISIONS 2026-06-27 dil stratejisi).
- **Chatbot = 0-token (offline + sanitizasyon), S7 korunur** (kullanıcı kararı 2026-07-03). v0.3 chat koduna **hiç dokunmadı** → regresyon riski yok; ama versiyon-sonu bütünsellik + 0 API maliyeti için Faz 9 paritesinde S7 korunur. Test yüzeyi: key-yok zarif offline yolu + girdi sanitizasyonu kod-incelemesi + malformed-input kısa-devre. **Sıfır API çağrısı** (Faz 3/9 deseni birebir). Lisans gerçeği değişmedi (Anthropic API token-başına ücretli; canlı streaming yolu prod'da zaten kanıtlı).
- **Bulgu politikası = keşfet + kaydet + triyaj** (kullanıcı teyidi, yerleşik desen). Kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug → bu fazda düzeltme task'ı. Kapsam-dışı veya zaten-ertelenmiş → sahipli kayıt + yönlendirme, burada yeniden açılmaz.
- **Test modu = otonom** (kullanıcı teyidi, yerleşik desen). Gerçek test altyapısı var (Faz 5/8/13): `test:e2e` (Playwright+axe), Vitest (parite + `seo-metadata`/`seo-redirects` tohumları, 39 test), CI, Lighthouse çift-tema + curl/grep/standalone-Playwright runtime. Milestone "ölç + kaydet + karar ver" (geçiş peşinen varsayılmaz — Faz 2/3/8/9 dersi).
- **Senaryo kataloğu (S1–S9) yeterli** (kullanıcı kararı 2026-07-03: "katalog yeterli, devam"). v0.3 delta odağı (crew-os route + sayfa-boyu nabız + SEO metadata + logo) doğru; ek persona/kırılma-noktası eklenmedi. S1–S9 iskeleti onaylandı.

### Kullanıcı Tercihleri

- **Ana sayfa + 5 alt sayfa uçtan-uca (tam)** (2026-07-03): Faz 9 çıtası; v0.3'ün iki çapraz yüzeyi (route rename + sayfa-boyu nabız) bütünsel doğrulama gerektirir.
- **Chatbot 0-token dahil (Faz 9 paritesi)** (2026-07-03): offline + sanitizasyon + malformed kısa-devre; sıfır API çağrısı. Dokunulmadı ama versiyon-sonu bütünsellik için korunur.
- **Senaryo kataloğu S1–S9 yeterli** (2026-07-03): "devam"; ek senaryo yok, katalog faz dokümanına yazıldı.

### Sahipsiz Alan & Çapraz Konular

- **`/crew-os` route rename asıl yeni giriş yüzeyi.** Faz 9'da bu route hâlâ `/bunker-os`'tu; Faz 11 rename etti. Asıl bilinmeyen: yeni public URL (5 dil 200 + SSG), eski `/bunker-os` çıplak+5-locale twin 308 (locale-gap yok), iç linklerin tümü `/crew-os`'a işaret ediyor mu (kırık link/çift-redirect yok), taksonomi tutarlılığı (URL'de artık "Crew OS", "bunker" yalnız kod-adı kalıntısı).
- **Living Flow sayfa-boyu nabız (Faz 12) yeni degradasyon + craft yüzeyi.** Faz 9'da nabız yalnız hero'daydı; Faz 12 onu ana sayfa boyu (desktop) taşıdı: tek WebGL context (shared `useFlowMode`), bölüme-uyarlanan `--flow-veil` opaklık (emergent adaptif veil, 0 bölüm-dosyası dokunuşu). S3'te asıl doğrulanacak: reduced-motion **tüm sayfayı** StaticFlow'a düşürüyor mu (yalnız hero değil), mobil-low nabzı aşağı-taşımıyor mu (desktop-only korunur), `--flow-veil` washi okunabilirliği bölüm-metinlerinde koruyor mu (light-bleed çözümü), CLS≈0 kalıyor mu. S8'de: desktop perf 100/CLS 0 + kontrast=100 çift-tema full-motion tabanı regresyonsuz.
- **SEO metadata katmanı (Faz 13) AT-görünmez ama versiyon-sonu çekirdek.** Faz 9'da bu katman yoktu; Faz 13 ekledi. S8'de: her sayfa self-canonical (hiçbiri `/`'a canonicalize olmuyor — home hariç), 5-locale hreflang/x-default, `/forum`→`/` + tüm redirect locale-kapsamı, sitemap↔canonical tutarlılık. Bunlar `seo-metadata`+`seo-redirects` tohumlarıyla suite-korunan → S8 re-teyit (yeni denetim değil, regresyon güvencesi).
- **v0.3 guardrail'lerinin yolculuk-içi tutarlılığı (S8).** a11y=100 statik mühürlü (Faz 4/8), Living Flow desktop perf/CLS tabanı mühürlü (Faz 12), SEO metadata tohum-korunan (Faz 13) — ama tema/dil/motion kombinasyonlu tam yolculukta korunuyor mu; suite (`test:e2e` + Vitest 39 + CI) bunun re-teyit aracı.
- **Ölçüm disiplini (memory):** locale tuzağı (alt sayfa TR = prefixsiz → `NEXT_LOCALE=tr` cookie şart, EN/AR/DE/ES açık-prefixli), tema tuzağı (light+dark iki koşu, dark-panel inversiyonu), reveal tuzağı (`reducedMotion:'reduce'` + scroll), stray/stale `next-server` (listening-PID teyit), host yükü (`/proc/loadavg` perf-bitişik ölçümden önce), WebGL standalone Playwright'te `channel:'chrome'`+swiftshader şart, runtime harness selector-teyidi (LanguageSwitcher `router.replace` butonu / Chatbot inline `#chat` / tema `html.dark`) — research/plan'de teyit.
- **Ortam riski (Faz 13 dersi) — research-phase araç eşlemesinde çözülecek:** Bu cloud devcontainer'da `next start` sandbox tarafından öldürülebilir (worker-fork, exit 144). Faz 9 runtime senaryolarını (S3/S4/S9-race) standalone Playwright + system Chrome ile koştu; Faz 13 build-ground-truth'a (`routes-manifest.json` + prerender `<head>`) düştü. **S3 (sayfa-boyu nabız degradasyonu) gerçek tarayıcı+WebGL runtime gerektirir** → bu ortamda çalışabilirliği metodoloji riski; research-phase araç eşlemesinde netleşir (HTTP/SSG/metadata katmanı build-ground-truth ile her koşulda çalışır; runtime-tarayıcı katmanı ortam-bağımlı).
- **Guardrail:** senaryo testi kaynak koda dokunmaz (doğrulama fazı) → guardrail'ler zaten yeşil olmalı; S8 bunu re-teyit eder. Kapsam-içi bug çıkarsa (düzeltme task'ı) CI a11y job otomatik korur.

### Kapsam Dışı

- **Living Flow nabzın mobil aşağı-taşınması / `/crew-os`/Alpfit/404 sayfalarına taşınması** — Faz 12 bilinçle desktop-home-only yaptı; bu faz yalnız o kararın **regresyonsuzluğunu** doğrular, kapsamı genişletmez.
- **Brief mobil perf açığı** (perf ≈90/LCP ≈3164ms vs ≥95/<2.5s) — kök neden CPU-bound WebGL, P2 craft-gate'te iptal; nihai doğrulama gerçek-cihaz/Vercel field gerektirir (metodolojik duvar). Senaryo testte çıkarsa kaydedilir, düzeltilmez. DECISIONS 2026-06-30; prd-review'a bağlı (B grubu).
- **Alt-sayfa PERF optimizasyonu** — bu faz yalnız yolculuk/a11y-guardrail; alt-sayfa perf yalnız **regresyonsuz** tutulur, optimize edilmez.
- **non-TR içerik-kalite derin denetimi** — bilinçli-stale (versiyon-sınırı); yalnız tutarlılık (parite / render / RTL) test edilir. non-TR alt-sayfa içerik tazeliği (ar/de/es stale) → prd-review (B grubu).
- **Umami canlı +1 / canlı env doğrulaması** — v0.2 production release'te kapandı (canlı `a71adbc`); senaryo testi tetiklemez. Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil, kayıtlı).
- **Kayıtlı sahipli açıklar (record-not-fix, prd-review/gelecek faz):** TB-3 (full-motion test tohumu, WebGL-flaky) · TB-4 (site-geneli logical-ok RTL) · TB-5 (npm audit 3 moderate, next downgrade breaking) · `/bulten` index 404 (kod tabanında link yok + `/forum`→`/` kapıyı kapatır, bilinçli kapsam dışı). Senaryo testte çıkarsa sahipli kayıt, yeniden litige edilmez.
- **Dil setini değiştirme / AR'yi üründen çıkarma** — vizyon/PRD kararı; prd-review'a bırakıldı (vizyon korunur).
- **Kod-adı tanımlayıcıları** (`Bunker.tsx`, `components/bunker-os/`, `nav.bunker`, `#bunker`) — iç kod adı, taksonomi izin veriyor (dokunulmaz); S5 yalnız **render edilen görünür metni/URL'i** denetler, kod kalıntısını değil.
- **Yeni içerik/feature** — senaryo testi doğrulama fazıdır, üretim yapmaz (kapsam-içi bulgu → düzeltme task'ı istisnası hariç).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 14` oturumunda doldurulur.

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

> Bu bölüm `/devflow:plan-phase 14` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 14.01 | TASK-14.01 | ⬜ Bekliyor | [plan-phase'de doldurulur] |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 14` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 14` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 14` oturumunda doldurulur.

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

**Oluşturulma:** 2026-07-03 (discuss-phase 14)
**Son Güncelleme:** 2026-07-03 — discuss-phase 14: Kapsam Tartışması yazıldı (ana sayfa + 5 alt sayfa uçtan-uca, TR birincil + non-TR tutarlılık, chatbot 0-token, keşfet+kaydet+triyaj, otonom; S1–S9 kataloğu v0.3 deltasına uyarlandı — crew-os route + sayfa-boyu nabız + SEO metadata + logo). Sıradaki adım: research-phase 14.
