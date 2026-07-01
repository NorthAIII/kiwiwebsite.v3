# Phase 8: v0.2 Versiyon-Sonu Teknik Borç Kapatma (alt-sayfa a11y + text-pulse süpürmesi)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-8-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.2'nin **versiyon-sonu teknik borç kapatma fazı** (içerik fazları 4-7 tamamlandı → `içerik_fazları` → `teknik_borç` geçişi). Birikmiş sahipli borcun çekirdeği: **alt-sayfa erişilebilirliği** hiç derin denetlenmedi (Faz 4→5→6→7 boyunca ana sayfa a11y=100 kilitlenirken alt sayfalar "sonraki faza" bırakıldı). Bu faz o borcu kapatır: 5 alt sayfayı ana sayfayla **aynı a11y çıtasına** çeker (5 dil, AR RTL dahil derin), ana sayfada yapılan `--color-pulse-ink` token swap'ini alt sayfalardaki `text-pulse` ink-panel kullanımlarına yayar (dark-inversion süpürmesi), ve düzeltilen her alt sayfayı Faz 5 harness'ine **kümülatif a11y regresyon tohumu + CI** ile bağlar. Marka & Craft üst ekseni (Faz 4 disiplini) korunur; perf/i18n/ana-sayfa-a11y guardrail'leri regresyonsuz.

**Milestone:** *(Faz 4-7 dersi: teknik borç fazı da "ölç + doğrula + kümülatif kilitle" çerçevesinde yazılır — yeşil sayılmadan önce fail-on-regression gösterilir.)*
1. **5 alt sayfada a11y çıtası karşılandı** (`/bunker-os`, `/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`): her sayfa Lighthouse a11y=**100 çift-tema** + `@axe-core/playwright` **WCAG-AA 0 ihlal** (light+dark), yerleşik ölçüm metodolojisiyle (`docs/perf/README.md`) kaydedildi.
2. **5 dil derin doğrulandı** — TR (kaynak) + AR (RTL, asıl fark) her sayfada zorunlu derin; EN/DE/ES kapsandı (yapısal olarak TR ile aynı, kontrast/markup dil-bağımsız). AR'de `dir=rtl` + 0 `MISSING_MESSAGE` + logical prop bütünlüğü teyit.
3. **`text-pulse` ink-panel dark-inversion süpürüldü** — alt sayfalardaki `text-pulse` ink-panel kullanımları `--color-pulse-ink` adaptif token'a geçti (light birebir / dark okunur); a11y çıtasının parçası, craft korunur.
4. **Kümülatif harness genişledi** — düzeltilen her alt sayfa için Playwright/axe a11y regresyon tohumu eklendi + CI'da otomatik korunuyor (fail-on-regression kanıtlı). Faz 4 a11y=100 gibi elle-korunur değil, artık otomatik.
5. **Guardrail'ler regresyonsuz** — ana sayfa a11y=100 çift-tema · perf korunan taban (mobil 90/LCP 3164ms, masaüstü 100, CLS≈0) · i18n 5-dil parite (yeni anahtar eklenirse 5 dil eşzamanlı) · CLS=0.
6. **Marka & Craft korundu** — alt-sayfa fix'leri de imza/craft'ı bozmadan (bağlam-özel, token tek-kaynak, gözle onay); sıfır görsel regresyon.

### Feature Listesi

(MODULE-MAP `— v0.2 versiyon-sonu teknik borç iş birimleri (Faz 8) —` + `modules/M1-M4, M6` referansı. Sahipli borç kaynağı: Faz 4→5→6→7 retrospektifleri "Sonraki Faz İçin Öneriler".)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| TD4: `text-pulse` ink-panel dark-inversion süpürmesi | M1 (+M2/M3) | Ana sayfadaki `--color-pulse-ink` token swap'ini alt sayfalardaki `text-pulse` ink-panel kullanımlarına yay (dark 1.22 → okunur); dar/mekanik, bilinen fix |
| TD5: Alt-sayfa derin a11y denetimi | M2 (+M1/M3/M4) | 5 alt sayfa, 5 dil (AR RTL derin), ana sayfa çıtası (Lighthouse a11y=100 çift-tema + axe WCAG-AA 0 light+dark); sayfa-özel bileşenler (bunker-os/gym/forum) |
| TD6: Alt-sayfa a11y kümülatif regresyon tohumu + CI | M6 (+M1-M3) | Düzeltilen her alt sayfa için Playwright/axe tohumu (Faz 5 harness genişletme) → CI otomatik korur |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 8` oturumunda dolduruldu (2026-07-01).

### Alınan Kararlar

- **Faz tipi = v0.2 versiyon-sonu teknik borç kapatma.** Versiyon Sonu Durumu: `içerik_fazları` → **`teknik_borç`** (bu fazın birincil geçiş sorumluluğu). v0.2 içerik fazları (4 a11y, 5 test altyapısı, 6 mobil perf, 7 Umami) tamamlandı; E1 🟡 (canlı +1 v0.2 production release'e ertelendi — içerik açığı değil), P2 ❌ (craft-gate iptal). Teknik borç, dört fazın retrospektiflerinden **sistematik** toplandı.
- **Kapsam = TB-A (text-pulse süpürmesi) + TB-B (alt-sayfa derin a11y), geniş tutuldu** (kullanıcı kararı 2026-07-01). Kullanıcı "geniş tut (alt-sayfa a11y dahil)" seçti — v0.2'yi alt sayfalar da temizlenmiş halde kapatmak için. En çok tekrarlanan sahipli borç (Faz 4→5→6→7 devri: "alt-sayfa derin a11y + `text-pulse` süpürmesi") bu fazda kapatılır.
- **Denetim çıtası = ana sayfayla aynı** (kullanıcı kararı). Her alt sayfa: Lighthouse a11y=100 çift-tema + axe WCAG-AA 0 ihlal (light+dark). Gerekçe: v0.2 a11y'yi tutarlı kapatmak — ana sayfa çıtası (Faz 4) alt sayfalara aynı sertlikte taşınır; "yalnız axe sweep" (daha gevşek) reddedildi.
- **Diller = 5'i de derin denetle, AR RTL dahil** (kullanıcı kararı). Kullanıcı önce "EN+TR'ye daralt, AR zorluyor" diye sordu; masaya konan gerçekler (5 dil zaten bitmiş+canlı; mevcut dil stratejisi non-TR yükünü zaten minimize ediyor; AR'nin asıl maliyeti RTL) sonrası **5 dili korumayı ve derin denetlemeyi** seçti. Vizyon değişmedi. Pratik matris: TR (kaynak) + AR (RTL, asıl fark) her sayfada zorunlu derin; EN/DE/ES kapsanır (kontrast/markup dil-bağımsız). **Strateji notu:** "AR'yi üründen çıkaralım mı" vizyon/PRD kararıdır — AR yükü sürerse `prd-review`'da (versiyon-sonu, canlı/SEO etkisiyle) yeniden değerlendirilir; bu faz karara bağlamaz.
- **Kümülatif tohum + CI = evet** (kullanıcı kararı). Düzeltilen her alt sayfa için Playwright/axe a11y regresyon tohumu → CI otomatik korur. Gerekçe: ILKELER "kümülatif test altyapısı" + Faz 5 harness'i tam bunun için; Faz 4 a11y=100'ün elle-korunur olması bu fazda otomatike bağlanır. Kazanım kalıcılaşır (rot önlenir).
- **TB-C (npm audit) dışarıda** (kullanıcı kararı). 2 moderate uyarı yalnız dev-tooling zinciri (vite→transitive postcss), production runtime'a gitmez; `--force` breaking riski. Bilinçli açık, ayrı ele alınır.

### Kullanıcı Tercihleri

- **Geniş tut** (2026-07-01): alt-sayfa a11y dahil; v0.2 alt sayfalar da temizlenmiş kapanır.
- **5 dili de derin denetle** (2026-07-01): AR RTL dahil; dil setini üründen çıkarma reddedildi (vizyon korunur), strateji sorusu prd-review'a bırakıldı.
- **Ana sayfayla aynı çıta** (2026-07-01): her alt sayfa a11y=100 çift-tema + axe WCAG-AA 0.
- **Kümülatif tohum + CI ekle** (2026-07-01): düzeltilen alt sayfalar CI'da otomatik korunur.
- **npm audit dışarıda** (2026-07-01): TB-C ayrı/bilinçli açık.

### Sahipsiz Alan & Çapraz Konular

- **Sayfa-özel bileşenler asıl bilinmeyen.** Global bileşenler (Nav/Footer/dil-switcher) Faz 4'te düzeldi ve tüm sayfalara yayıldı → alt sayfalarda **sayfa-özel** bileşenler (`components/bunker-os/`, `gym/`, `forum/`) derin denetlenir. `text-pulse` ink-panel deseni (TB-A) muhtemelen bu bileşenlerde; TB-A denetimin bir bulgusu ama bilinen/kesin olduğu için ayrı iş birimi.
- **Craft koruması (Faz 4 disiplini, üst eksen):** alt-sayfa a11y fix'leri de imza/marka-yeşilini global düzleştirmez; bağlam-özel + token tek-kaynak (`--color-ink-faint`/`--color-pulse-ink` zaten global) + gözle onay. `aria-hidden ≠ color-contrast muafiyeti` (memory) ve `::before content:attr()` deseni geçerli.
- **Ölçüm disiplini (memory):** a11y ölçümünde tema tuzağı (light+dark iki koşu; `bg-ink` panelleri dark'ta krem'e döner) + locale tuzağı (`NEXT_LOCALE` cookie; alt sayfalar prefixli olduğu için ana sayfadan farklı — `/en/...` vs `/spor-salonu-yazilimi`) + reveal `opacity:0` (reducedMotion + scroll) + Lighthouse-altküme vs ham axe (WCAG etiketleri) — hepsi research/plan'de teyit.
- **Guardrail:** global token değişirse ana sayfa a11y=100'ü de etkiler → CI a11y job otomatik yakalar; perf tabanı korunur (alt-sayfa perf **optimize edilmez**, yalnız regresyonsuz).

### Kapsam Dışı

- **TB-C: npm audit uyarıları** (2 moderate dev-only) — bilinçli açık, ayrı ele alınır.
- **Brief mobil perf açığı** (perf 90/LCP 3164ms vs ≥95/<2.5s) — kök neden CPU-bound WebGL, P2 craft-gate'te iptal; nihai doğrulama gerçek-cihaz/Vercel field gerektirir (metodolojik duvar). Lab teknik-borç fazında kapatılamaz — bilinçli/kayıtlı açık (DECISIONS 2026-06-30).
- **Umami canlı +1 (S9-10)** — v0.2 production release aksiyonu (tüm revizeyi ilk kez `main`'e almak), teknik borç değil.
- **Alt-sayfa PERF optimizasyonu** — bu faz yalnız a11y; alt-sayfa perf yalnız **regresyonsuz** tutulur, optimize edilmez (perf tabanı ana sayfa-birincil).
- **Dil setini değiştirme / AR'yi üründen çıkarma** — vizyon/PRD kararı; prd-review'a bırakıldı (vizyon korunur).
- **Alakasız ertelenmiş kalemler** — `/bunker-os`→`/crew-os` redirect (M6, görsel/SEO versiyonu), `/forum`→404, A1 logo hizalama, A3 CTA affordance/scroll göstergesi (v0.1 backlog görsel/içerik) — bu fazda açılmaz.

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 8` oturumunda dolduruldu (2026-07-01). Araştırma **kod taramasıyla** somutlaştırıldı (grep + ölçüm harness'i incelemesi); genel-geçer bilgi değil, bu repo'nun gerçek yüzeyi.

### Bulgu 0 — TD4 premisi gerçekle örtüşmüyor (kritik, kapsamı değiştirir)

Kapsam tartışması TD4'ü "alt sayfalardaki `text-pulse` ink-panel kullanımlarını `--color-pulse-ink`'e yay" diye kurmuştu; kod taraması bu ön-kabulü **çürüttü**:

- **Ham `text-pulse`** (text) tüm `src/` içinde **tek yerde**: `components/bunker-os/BunkerShowcase.tsx:85` — ve o bir **`aria-hidden` dekoratif SVG ikonu** (text-node değil). axe `color-contrast` kuralı text-node'u hedefler → SVG grafiği büyük olasılıkla **flag'lemez** (memory: "SVG `<text>` incomplete verir"; burada `<text>` bile yok, ikon path'i).
- Diğer `text-pulse*` eşleşmeleri zaten adaptif **`text-pulse-ink`** ve **ana sayfada** (`SectorSolutions.tsx:131,143` — Faz 4 kazanımı). Alt sayfalarda **`text-pulse-ink`'e çevrilecek ham `text-pulse` text yok**.
- `--color-pulse-ink` token'ı Faz 4'te global tanımlı (`globals.css:17` light `#6fe36f` / `globals.css:42` dark `#1f7a3d`) — süpürülecek alt-sayfa hedefi esasen boş.

**Karar (kullanıcı, 2026-07-01): ölçüm-önce, TD5'e katla.** TD4 ayrı "bilinen süpürme" task'ı olarak açılmaz; TD5 derin axe denetimi hangi kontrast ihlallerini teyit ederse onlar düzeltilir. Gerekçe: memory disiplini "gerçek axe koşusu olmadan pre-fix yapma" + varsayım sorgulama (CLAUDE.md #5). Plan-phase task yapısını buna göre kurar.

### Bulgu 1 — Alt-sayfaların gerçek a11y risk yüzeyi (TD5'in asıl işi)

Kontrast riski taşıyan gerçek desenler, özellikle **dark-tema panel-inversiyonu** (`bg-ink`→krem, `text-canvas`→ink — memory `a11y-olcum-tema-tuzagi` §3):

- **`text-canvas/45`, `/50`, `/60`, `/85`** — `bg-ink` paneller içinde düşük-opaklık metin (`BunkerShowcase.tsx:78,96,177,194,203`). Dark'ta krem üstünde düşük-opaklık ink → v0.1 ana-sayfa `text-canvas/40`=2.52 fail'inin birebir analogu. **En yüksek olasılıklı ihlal kaynağı.** (`/15` line 195 = ayraç barı, text değil → muaf.)
- **`text-green/30`** (`BunkerShowcase.tsx:136`) — "nasıl çalışır" adım numaraları, group-hover'da `text-green`'e çıkar; dinlenme halinde düşük-kontrast dekoratif. v0.1 `#8af28a`=1.22 adım-no analogu.
- **`text-canvas/40`-ailesi teyit gerektirir** — memory "salt punctuation komşu run'a dahil olup ölçümde görünmeyebilir; fix gerekip gerekmediğini gerçek axe koşusunda teyit et." → grep listesi aday, axe koşusu hakem.

### Bulgu 2 — Faz 4 global kazanımları alt sayfalara zaten yayıldı (yüzeyi daraltır)

- `--color-ink-faint` Faz 4'te tune edildi (`globals.css:11` `#67695f` / `globals.css:38` `#8a8c80`); v0.1'de `#7d8073`=4.39 (fail) idi. Alt sayfalarda yaygın `text-ink-faint` (`BunkerShowcase`, `Gym`, `CaseStudies`, article'lar) bu global fix'i **miras alır** → ayrıca düzeltilmesi gerekmez (axe teyidiyle).
- **PageHeader paylaşımlı** (`components/PageHeader.tsx:26-27`): Faz 4'te düzelen `LanguageSwitcher` + `ThemeToggle`'ı kullanır → alt-sayfa header a11y'si (label-content-name-mismatch) zaten temiz.
- Alt sayfalarda **`<dl>`/`<dt>`/`<dd>` yok** (grep teyitli) → v0.1 hero `definition-list`/`dlitem` sorunları alt sayfalarda **ilgisiz**.

### Değerlendirilen Yaklaşımlar (ölçüm & harness)

- **Yaklaşım A — Mevcut harness'i genişlet (`tests/e2e/`):** `home-a11y.spec.ts` desenini (light+dark döngü, `reducedMotion:'reduce'`, `scrollThrough`, `WCAG_TAGS` alt-küme, `NEXT_LOCALE` cookie) parametrik olarak alt sayfalara taşı. Artı: kanıtlı disiplin, `playwright.config.ts` zaten build+start (:3000) yapıyor, kümülatif ilkeye (ILKELER) birebir uyar. Eksi: yok.
- **Yaklaşım B — Ayrı yeni test kurgusu:** Sıfırdan spec/harness. Artı: yok. Eksi: kanıtlı ölçüm disiplinini (tema/locale/reveal tuzakları) yeniden keşfetme riski.
- **Seçilen: A.** Faz 5 seed'i tam bunun için kuruldu (TESTING.md "yeni sayfaların a11y'sini buraya ekleyerek alt-sayfa kapsamı kümülatif büyür"). Craft/perf'e dokunmaz, yalnız güvence ekler.

### Kullanılacak Araçlar/Kütüphaneler

Yeni bağımlılık **yok** (paket ekleme onay gerektirir — Dokunulmazlar). Mevcut zincir yeterli:
- **`@playwright/test` + `@axe-core/playwright`** (repoda kurulu, `tests/e2e/`) — CI-korunan WCAG-AA 0-ihlal tohumu (TD6).
- **Lighthouse 13.3.0** (npx-cache, `package.json`'a EKLENMEZ — perf/README metodolojisi) — a11y=100 çift-tema skor gate'i (manuel verify ölçümü, CI'da değil).
- **Chrome 150 + SwiftShader flag'leri** (`--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`) — alt-sayfa hero'ları da LivingFlow kullanır → flag'ler alt sayfalarda da şart (memory `perf-olcum-devcontainer-kurulumu`).

### Dikkat Edilecekler

- **Locale tuzağı alt sayfalarda ana sayfadan FARKLI** (as-needed prefix). TR alt sayfa = **prefixsiz** yol (`/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bunker-os`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`) → next-intl `localeDetection` yine `/en/...`'e yönlendirir, **`NEXT_LOCALE=tr` cookie şart**. EN/AR/DE/ES = açık-prefixli yol (`/ar/spor-salonu-yazilimi`) → cookie'siz doğrudan ölçülür. **Kaynak: repoda-tanımlı** route yolları (`src/app/[locale]/*/page.tsx`), cookie mekanizması runtime (next-intl, memory'de kanıtlı). (memory: locale tuzağı.)
- **Tema tuzağı (pazarlık dışı):** her sayfa **light+dark iki koşu**. Asıl risk dark-panel inversiyonu (Bulgu 1). Lighthouse kanonik koşu dark render eder; axe için Playwright `emulateMedia({colorScheme})`. (memory: tema tuzağı.)
- **Reveal tuzağı:** alt sayfalar da `data-reveal`/`Reveal` (GSAP `opacity:0`) kullanır → axe'ta `reducedMotion:'reduce'` + uçtan-uca scroll şart, yoksa alt-fold içerik taranmaz (yanlış yeşil). Mevcut `scrollThrough` yeniden kullanılır.
- **AR RTL derinliği:** `/ar/...` her sayfada `dir="rtl"` + **0 `MISSING_MESSAGE`** (build log) + logical prop bütünlüğü. AR'nin asıl maliyeti kontrast değil (dil-bağımsız), **RTL layout** — gözle + axe teyidi.
- **aria-hidden ≠ color-contrast muafiyeti:** dekoratif düşük-kontrast öğeye `aria-hidden` eklemek axe'tan çıkarmaz (memory kanıtlı). Görsel-koruyan doğru fix: `::before content:attr()` pseudo-element veya kontrast-geçen token — SVG ikon (text-node değil) zaten kapsam dışı.
- **Guardrail regresyonu:** global token değişirse (örn. `text-canvas/NN` yerine token) **ana sayfa a11y=100'ü de etkiler** → CI a11y job otomatik yakalar. Alt-sayfa **perf optimize edilmez**, yalnız regresyonsuz (perf tabanı ana-sayfa birincil).
- **Ölçüm ortamı:** taze devcontainer'da node/Chrome yoksa kullanıcı onayıyla kur (memory `perf-olcum-devcontainer-kurulumu`); host-yük gözlemi (`/proc/loadavg`) + fresh-prod-serve + listening-PID disiplini (a11y/CLS ortam-bağımsız, güvenilir).

### Teknik Kararlar

- **TD4 ayrı task DEĞİL → TD5 denetiminin bulgusu** (Bulgu 0; kullanıcı kararı). Plan-phase, kontrast fix'lerini TD5 axe-teyitli bulgulardan türetir; `--color-pulse-ink`/pseudo-element/token desenleri hazır araç.
- **CI a11y tohumu = 5 dil × light+dark her alt sayfada** (kullanıcı kararı 2026-07-01). Discuss'taki "TR+AR zorunlu, EN/DE/ES kapsanır" pratik matrisinden **daha geniş**: kullanıcı maksimum kapsamı seçti → CI'da 5 sayfa × 5 dil × 2 tema. Plan-phase koşu sayısını (CI süresi) ve parametrik spec yapısını buna göre boyutlandırır; kontrast dil-bağımsız olduğu için ek sinyal düşük ama kullanıcı tam güvence istedi (kalıcılık önceliği, ILKELER). Lighthouse a11y=100 skor gate'i **manuel verify ölçümü** kalır (CI Playwright/axe ile ayrık — mevcut split korunur).
- **a11y çıtası = ana sayfayla aynı** (discuss): her alt sayfa Lighthouse a11y=100 çift-tema **+** axe WCAG-AA 0 ihlal (light+dark). İki ayrı sinyal, ikisi de gate.
- **Yeni i18n anahtarı beklenmiyor** — fix'ler CSS token/renk + markup/aria düzeyinde (Faz 4 deseni); yeni anahtar gerekirse 5 dile eşzamanlı (parite testi otomatik kapsar). Yalnız değer değişimi olursa TR tek-kaynak + versiyon-sınırı geçerli.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 8` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 8.01 | TASK-8.01 | ✅ Tamamlandı | Parametrik alt-sayfa a11y harness'i (helper çıkarımı + subpages spec) + 5 sayfa baseline axe envanteri (ölçüm-önce, fix yok, mühür yok) |
| 8.02 | TASK-8.02 | ✅ Tamamlandı | `/bunker-os` derin a11y fix + mühür — 3 desen (text-green/30 adım no → ::before, text-canvas/45+50 → /65); 5 dil×2 tema 10 test 0 ihlal; TD4 milestone kapandı |
| 8.03 | TASK-8.03 | ✅ Tamamlandı | `/spor-salonu-yazilimi` (Alpfit) a11y teyit + mühür — baseline 0 ihlal doğrulandı, kod fix yok; 10 test 0 ihlal + AR RTL teyit |
| 8.04 | TASK-8.04 | ✅ Tamamlandı | `/vaka-calismalari` a11y teyit + mühür — baseline 0 ihlal doğrulandı, kod fix yok; 10 test 0 ihlal + AR RTL teyit (32 test regresyonsuz) |
| 8.05 | TASK-8.05 | ✅ Tamamlandı | `/bulten` 2 makale (AiSdr + Claude) a11y teyit + mühür — baseline 0 ihlal, kontrast fix yok; ArticleClaude tablosunda RTL craft fix (physical→logical: `ml-2`→`ms-2`, `text-right`→`text-end`); 5 alt sayfa mühürü tamam (52 e2e test) |
| 8.06 | TASK-8.06 | ✅ Tamamlandı | **verify-phase 8 UAT #3 bulgusu düzeltildi:** 2 bülten makale bileşenine (`ArticleAiSdr`/`ArticleClaude`) stillendirmesiz `<main>` landmark → Lighthouse `landmark-one-main` geçti, a11y 98→100 çift-tema (milestone #1 tamam); sıfır görsel değişim (article box birebir, TR/AR screenshot), 52 e2e regresyonsuz |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

> **Plan notları (plan-phase 8):**
> - **İki gate, iki yer:** her task'ın enforce ettiği gate = **axe WCAG-AA 0 ihlal** (CI-korunan tohum, `subpages-a11y.spec.ts`). **Lighthouse a11y=100 çift-tema** skor gate'i (milestone #1) research kararı gereği **manuel verify ölçümü** kalır → 5 sayfa çift-tema sweep'i **verify-phase**'de yapılır (task değil). verify-plan/verify-phase bunu milestone'dan alır.
> - **TD4 ayrı task değil** (Bulgu 0): text-pulse/dark-inversion süpürmesi 8.02'ye (BunkerShowcase — tek ham `text-pulse` SVG + tüm `text-canvas/NN` inversiyonları orada) katlandı.
> - **Ölçüm-önce yapı:** 8.01 audit+harness (fix yok, mühür yok) → 8.02–8.05 sayfa-başı fix/teyit + mühür. Düşük-risk sayfalar (8.03/8.04/8.05) baseline'da 0 ihlal verirse "yalnız mühürle + AR RTL teyit" olur (kod fix yok) — beklenen, sorun değil.
> - **CI genişlemesi kod gerektirmez:** `ci.yml` a11y job zaten `npm run test:e2e` koşar → `subpages-a11y.spec.ts`'e sayfa mühürlemek TD6 CI korumasını otomatik verir (yeni workflow dosyası yok). Tam matris: 5 sayfa × 5 dil × 2 tema = 50 alt-sayfa testi.

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 8` oturumunda dolduruldu (2026-07-01).

**Tarih:** 2026-07-01
**Toplam Senaryo:** 12 | **Geçen:** 11 | **Kalan:** 1

**Otomatik kontroller (Adım 1):** CI (HEAD 39a4abc) `fast`+`a11y` job'ları **success** ✅ · security-review **temiz** (bulgu yok — değişiklikler sunum/a11y katmanı, yeni yüzey yok) ✅ · npm audit bilinçle kapsam dışı (TB-C).

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | CI otomatik doğrulama — HEAD commit CI `fast`+`a11y` job success | ✅ Geçti | HEAD 39a4abc: iki job da `success` (REST API job-seviyesi teyit) |
| 2 | axe WCAG-AA 0 ihlal tam matris — `test:e2e` 52 test (5 alt sayfa×5 dil×2 tema=50 + home 2) yeşil | ✅ Geçti | 52/52 yeşil (1.9m); tüm mühürlü sayfalar 0 ihlal |
| 3 | Lighthouse a11y=100 çift-tema — 5 alt sayfa (manuel verify skor gate, milestone #1) | ❌ Kaldı | **2 bülten makalesi a11y=98** (`landmark-one-main` — sayfa `<main>` landmark'ı yok, tema-bağımsız yapısal); bunker-os/spor-salonu/vaka=100. axe WCAG-tag suite `best-practice` kuralını görmez → seal'da kaçtı. → **TASK-8.06** |
| 4 | Ana sayfa a11y=100 guardrail regresyonsuz — home light+dark axe 0 + Lighthouse a11y=100 | ✅ Geçti | home Lighthouse a11y=100 + e2e home 2 test 0 ihlal |
| 5 | AR RTL derinliği — `/ar/<5 sayfa>` `dir="rtl"` (prerender+runtime) + 0 MISSING_MESSAGE | ✅ Geçti | 5 AR prerender HTML `dir="rtl"` ✅ + build 0 MISSING_MESSAGE |
| 6 | i18n 5-dil parite — Vitest parite yeşil (eksik anahtar=fail); yeni anahtar eklenmedi | ✅ Geçti | Vitest 7 test yeşil (parite + smoke) |
| 7 | text-pulse/dark-inversion süpürmesi (TD4) — BunkerShowcase dark panel okunur (dark axe 0) | ✅ Geçti | bunker-os dark 5 test 0 ihlal + screenshot: panel/status okunur, marka-yeşili korundu |
| 8 | Kümülatif tohum + CI fail-on-regression — kasıtlı ihlal enjekte edilince `subpages-a11y` kırılır (adversarial kanıt) | ✅ Geçti | `text-canvas/65`→`/20` enjekte → bunker-os tr-dark testi `color-contrast` (wcag143) ile kırıldı → geri alındı |
| 9 | Marka & Craft — sıfır görsel regresyon (BunkerShowcase panel/adım no + imza; screenshot) | ✅ Geçti | light+dark screenshot: imza/marka-yeşili düzleşmedi, adım no `::before` faint-yeşil |
| 10 | RTL craft fix (ArticleClaude) — physical→logical; LTR birebir aynı, AR doğru aynalanır (screenshot) | ✅ Geçti | TR-light (MODEL solda) ↔ AR-dark (aynalı) screenshot: logical prop her iki yönde doğru |
| 11 | Build temiz + guardrail — `next build` temiz; smoke test yeşil | ✅ Geçti | build temiz · smoke (Vitest) yeşil |
| 12 | Adversarial: dekoratif öğe ≠ axe muafiyeti — aria-hidden adım-no `::before` görünür ama axe taramaz; `text-pulse` SVG flag'lenmez | ✅ Geçti | e2e 0 ihlal + görsel: adım no görünür; `text-pulse` SVG (text-node değil) flag'lenmedi |

**Bulgu (Adım 6):** UAT #3 → 2 bülten makale sayfası (`/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`) `<main>` landmark içermiyor (Article bileşenleri kök `<article>` render ediyor; page.tsx `<SmoothScroll><PageHeader/><Article/><Footer/></SmoothScroll>` — diğer alt sayfalar `<main>` sarar). Lighthouse `landmark-one-main` audit'i düşüyor → a11y=98 (iki temada da; yapısal). Milestone #1 "a11y=100 çift-tema" 2 sayfada karşılanmıyor. Kök neden: 8.05 mühürü yalnız axe WCAG-tag koşusuna dayandı (Lighthouse skor gate'i plan gereği verify'e ertelenmişti); `landmark-one-main` axe'ta `best-practice` etiketli, WCAG alt-kümesinde değil → suite görmedi. → düzeltme **TASK-8.06** (her iki bülten sayfasına `<main>` landmark; sıfır görsel değişim).

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
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |
| Yerelleştirme & RTL | ✅ / ⚠️ / ❌ | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-01
**Son Güncelleme:** 2026-07-01 — verify-phase 8: UAT 12 senaryo, **11 geçti / 1 kaldı**. Otomatik: CI (HEAD) `fast`+`a11y` success · security-review temiz · npm audit kapsam dışı. Otonom: e2e 52/52 yeşil · Vitest 7 · build 0 MISSING_MESSAGE · 5 AR prerender `dir=rtl` · fail-on-regression kanıtı · craft screenshot onayı · Lighthouse home+3 alt sayfa a11y=100. **Bulgu (UAT #3):** 2 bülten makalesi a11y=98 (`landmark-one-main` — sayfa `<main>` yok) → **TASK-8.06** (bülten `<main>` landmark, a11y 98→100, sıfır görsel değişim). **Adım=task → düzeltme sonrası verify-phase 8 baştan koşulur.**
