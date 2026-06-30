# Phase 4: v0.2 Erişilebilirlik (a11y 89 → 100)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.2'nin (a11y & Performans + teknik temel) **ilk içerik fazı**: ana sayfanın Lighthouse erişilebilirlik skorunu 89'dan brief hedefi olan **100**'e çıkarmak. Faz 2 TD3'te ölçülen, ortam-bağımsız en net açık kalem (a11y 89, her iki preset). 4 başarısız denetim (3 alan) cerrahi düzeltilir: renk kontrastı (craft-duyarlı — marka yeşili imza korunarak) + hero `<dl>` geçersiz markup + dil-switcher aria-mismatch. v0.2'nin kalan iş kolları (test altyapısı → perf → Umami) sonraki fazlardır; burada kapsam dışı.

**Milestone:** *(Faz 2/3 dersi: versiyon-sonu olmayan içerik fazı bile "ölç + doğrula" çerçevesinde yazılır — geçiş peşinen varsayılmaz.)*
1. Ana sayfada Lighthouse **a11y = 100** (mobil + masaüstü), TD3'teki kanonik yöntemle (`next build && next start` + npx lighthouse, düşük host-yükü, çoklu koşu) ölçülüp `docs/perf/` tabanına kaydedildi;
2. 4 denetim (color-contrast / definition-list / dlitem / label-content-name-mismatch) **0 başarısız**;
3. **Marka yeşili imza korundu** — bağlam-özel düzeltme; görünür imza renk değişmedi (craft regresyonu yok, gözle teyit);
4. **Perf/CLS korunan taban regresyon yok** (masaüstü perf 100 / CLS 0; mobil perf ~87 / CLS 0 — düşmedi);
5. i18n parite korundu (aria düzeltmesi anahtar eklerse/yeniden adlandırırsa 5 dil eşzamanlı, eksik anahtar yok).

### Feature Listesi

(MODULE-MAP ve modules/ referansı: M1 tasarım token, M2 hero/bölümler, M3 dil kontrolü, M4 i18n. Kaynak kırılım: `docs/perf/README.md` "Accessibility 89" + DECISIONS 2026-06-28.)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| A11Y1: Renk kontrastı (WCAG AA) | M1 (+M2) | Marka yeşili `#8af28a` krem üzerinde 1.22 (adım numaraları, "İşleyen örnekleri gör" CTA) → **bağlam-özel** erişilebilir varyant (imza korunur); soluk gri metinler `#7d8073`/4.39 + `#999992`/2.52 → AA eşiğine |
| A11Y2: Hero `<dl>`/`dlitem` markup | M2 | Hero `<dl data-hero="stats">` doğrudan `<a>` sarıyor (geçersiz) → `<dt>`/`<dd>` doğru sarma; görünüm değişmez |
| A11Y3: Dil-switcher aria-mismatch | M3 (+M4) | Dil butonlarında görünür metin ↔ `aria-label` uyuşmuyor (label-content-name-mismatch, 2 öğe) → hizalama (anahtar değişirse 5 dil) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 4` oturumunda dolduruldu (2026-06-29).

### Alınan Kararlar

- **Faz tipi = v0.2 ilk içerik fazı (a11y).** Versiyon Sonu Durumu: `içerik_fazları`. v0.2 = "a11y & Performans + teknik temel" (VERSIONS.md, prd-review 2026-06-29). v0.2 yeni versiyon, MODULE-MAP'te henüz v0.2 satırı yoktu; prd-review PRD'yi değiştirmedi → re-kickoff gerekmedi. v0.2 öncelikleri zaten VERSIONS "Sıradaki Versiyon" + REVIZE-BACKLOG D1/D2/E1 + DECISIONS perf-tabanında tanımlı.
- **v0.2 faz sırası = a11y → test altyapısı → perf → Umami** (kullanıcı kararı). Faz 4 yalnız **a11y**. Gerekçe: a11y en net/ölçülebilir sinyal (brief hedefi ≥100, ortam-bağımsız), 3 denetim kesin tanımlı (düşük belirsizlik), craft-duyarlı Living Flow WebGL'e dokunmaz, cerrahi → "az context = yüksek kalite". Diğer 3 iş kolu (mobil perf, test altyapısı D1, Umami E1) sonraki v0.2 fazları.
- **İlke gerilimi açıkça getirildi (kümülatif test):** ILKELER "kümülatif test altyapısı" test-altyapısını-önce destekleyebilir (sonraki a11y/perf otomatik regresyon güvencesi alır; "korunan taban" şu an *elle* Lighthouse ile korunuyor). Karşı argüman kabul edildi: a11y fixleri Lighthouse ile elle ölçülerek mevcut "test = build + UAT" konvansiyonunca zaten kapsanıyor → a11y-önce ilkeyi ihlal etmez; test altyapısı ayrı teknik-temel kalemi (Faz 5 adayı, a11y/perf kazanımını otomatik teste bağlayabilir). Kullanıcı a11y-önce'yi seçti.
- **Marka yeşili kontrast = imzayı koru, bağlam-özel düzelt** (kullanıcı kararı — craft üst eksen). Parlak `#8af28a` imza olarak kalır; kontrast düzeltmesi yalnız başarısız **metin** öğelerinde (adım numaraları, CTA) bağlam-özel erişilebilir varyantla yapılır (koyu yeşil `#1f7a3d` zaten logo/CTA'da kullanılıyor — precedent) ya da arka-plan treatment. Token'ı küresele düzleştirme YOK. Kesin mekanizma (koyu varyant / treatment / öğe-bazlı) research/plan'de netleşir. Gerekçe: Marka & Craft tek üst eksen (ILKELER) — imza renk feda edilmeden a11y=100 hedeflenir; perf/README zaten "düzeltme marka sesini koruyarak yapılmalı" diyor.
- **Tamamlanma kriteri = ana sayfada a11y 100 (mobil+masaüstü), perf/CLS regresyonsuz.** TD3 kanonik Lighthouse yöntemi (yerel prod build, npx cache lighthouse, düşük host-yükü gözlemi `/proc/loadavg`, çoklu koşu median). Sonuç `docs/perf/` tabanına yeni koşu olarak yazılır.
- **Doğrulama = manuel Lighthouse + axe** (proje-geneli test altyapısı yok — Faz 5 adayı). Bu fazda otomatik a11y test suite kurulmaz; o teknik temel ayrı faz. Tutarlı: Faz 2/3 da otonom/manuel ölçtü.

### Kullanıcı Tercihleri

- **a11y'den başla** (2026-06-29): "önerdiğin şekilde devam edelim" — a11y-önce sıralaması onaylandı.
- **İmzayı koru** (2026-06-29): marka yeşili kontrast düzeltmesi bağlam-özel; imza renk değişmez.
- Kullanıcı v0.2 başında thread'i kaybetmişti → DevFlow durumu + v0.2 4 iş kolu sadeleştirilerek özetlendi, sonra karar alındı (oturum bağlamı; doküman değil).

### Kapsam Dışı

- **Mobil perf / LCP (87 / 3.1s → brief bütçesi)** — sonraki v0.2 fazı; ana kaynak Living Flow WebGL (craft-duyarlı, aceleyle dokunulmaz). a11y fazında perf yalnız **regresyonsuz** tutulur, optimize edilmez.
- **Test altyapısı kurulumu (D1)** — sonraki v0.2 fazı (teknik temel); bu faz manuel Lighthouse/axe ile doğrular.
- **Umami analytics (E1)** — sonraki v0.2 fazı; spec `docs/UMAMI-ANALYTICS.md` hazır.
- **Alt sayfa derin a11y denetimi** (Alpfit, Crew OS showcase `/bunker-os`, vaka, bülten) — sonraki versiyon (Faz 3 retrosu da böyle bıraktı). Hedef ana sayfa-birincil; token (yeşil) + global Nav (dil-switcher) düzeltmeleri zaten tüm sayfalara yayılır ama alt sayfalar derin denetlenmez.
- **Token'ı küresel düzleştirme / marka yeşilini değiştirme** — bilinçle reddedildi (imza korunur).
- **Alakasız ertelenmiş kalemler** (`/bunker-os`→`/crew-os` redirect M6, çıplak `/forum`→404, anchor-drop) — yeniden açılmaz.

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 4` oturumunda dolduruldu (2026-06-29). Kaynak kod gerçek-okumasına + WCAG kontrast hesabına (current token'lar) dayanır; baseline `docs/perf/README.md` "Accessibility 89" ile çapraz okundu.

### Baseline ile Kod Arasındaki Drift (önemli — Task 1'i tetikler)

`docs/perf/README.md` a11y tabanı (2026-06-28, 89) başarısız öğeleri **kaba/hesaplanmış renk** olarak kaydetmiş (örn. `text-canvas/40` → `#999992`, light+dark öğeler karışık). Kod gerçek-okumasında:
- `globals.css` token'ları taban ölçümünden beri **değişmedi** (son commit `8d0c49a`); yani current token'lar = ölçülen token'lar. Baseline'daki `#8af28a`/`#f2f1e8` gibi hex'ler ham token değil, **opaklık-harmanlanmış/dark-mode hesap** değerleridir.
- Bazı baseline kalemleri **artık çözülmüş olabilir**: baseline "CTA `a.group` `#8af28a`" diyordu; current `Hero.tsx` ikincil CTA `text-ink` (tam kontrast, geçer). Re-ölçüm netleştirecek.
- **Lighthouse light-mode ölçer.** Tema init script (`[locale]/layout.tsx:76`) localStorage yoksa `prefers-color-scheme`'e düşer; Lighthouse varsayılanı light → a11y=100 **kapısı LIGHT mode**. Dark mode kontrastı da düzeltilir (ILKELER/QUALITY "light & dark") ama Lighthouse gate'i light; dark için axe ile elle teyit.

→ **Sonuç:** Task 1 = current build'de **otoriter re-ölçüm** (Lighthouse light + axe her iki tema, mobil+masaüstü) ile kesin başarısız-denetim listesini sabitle. Milestone #1 (ölç+doğrula) zaten bunu istiyor. Fix task'ları teyitli envanteri hedefler.

### Kontrast Envanteri (current token'lardan hesaplanan WCAG oranları)

A11Y1 acceptance = `color-contrast` denetimi **0 başarısız**; bu, faz tablosundaki 2 örnekten (adım no, CTA) **daha geniş** ama tamamı **ana sayfa** (kapsam-içi). Tam liste:

| Öğe | Dosya | fg/bg (current) | Oran | Eşik | Durum |
|-----|-------|-----------------|------|------|-------|
| Adım no `text-green/30` (text-5xl) | `HowItWorks.tsx:84` | green#1f7a3d@30% / canvas | 1.51 | 3.0 (large) | ❌ |
| Hero istatistik etiketi `<dt> text-ink-faint` | `Hero.tsx:103,131` | ink-faint#8b8d83 / canvas | 3.11 | 4.5 | ❌ |
| Sektör notu `p.text-xs text-ink-faint` | `SectorSolutions.tsx:153` | ink-faint / canvas-deep | 2.87 | 4.5 | ❌ |
| Footer dil etiketi/değeri `text-canvas/40` | `Footer.tsx:97,99` | canvas@40% / ink | 3.62 | 4.5 | ❌ |
| Footer ayraç "·" `text-canvas/30` | `Footer.tsx:75,79` | canvas@30% / ink | 2.58 | 4.5 | ❌ (dekoratif) |
| Crew OS panel metrik `text-canvas/45` | `Bunker.tsx:85` | canvas@45% / ink | 4.29 | 4.5 | ❌ |
| `text-canvas/50` (Bunker durum) | `Bunker.tsx:58` | canvas@50% / ink | 4.99 | 4.5 | ✅ sınırda |
| `text-canvas/60`, `/85` (footer/panel gövde) | çeşitli | — | 6.7–12.5 | 4.5 | ✅ |
| `text-green` (eyebrow/label, solid) | çeşitli | green / canvas | 4.96 | 4.5 | ✅ |
| Dark `text-ink-faint` #7d8073 | dark tema | / dark canvas-deep | 4.17 | 4.5 | ❌ (dark) |

> `text-green` (solid) zaten geçer (4.96) — **hue sorun değil, opaklık/soluk-token sorunudur.** discuss-phase "bright #8af28a → koyu yeşil varyant" varsayımı stale baseline'a dayanıyordu; kod zaten `#1f7a3d` kullanıyor. (Kullanıcıya getirildi, mekanizma revize edildi → aşağıdaki kararlar.)

### Değerlendirilen Yaklaşımlar

**A11Y1-a · Adım numaraları (`text-green/30`)**
- Opaklık artırma: faint "hayalet" görünüm korunarak 3:1'e **çıkamaz** (matematik: %70'te bile 2.24–2.89; çünkü solid green cream'de 4.96 ve eğri %100'e yakında dik). Reddedildi.
- Solid/koyu yeşil: geçer (4.96) ama faint estetiği prominent'e çevirir (craft regresyonu).
- **Seçilen → aria-hidden (dekoratif işaretle):** numaralara `aria-hidden="true"` (+ `<h3>` başlıkları zaten adımı taşır, DOM sırası korunur). Faint görünüm **birebir** korunur, hem light hem dark'ta kontrast denetiminden çıkar (renk değişmez). Craft üst eksen (ILKELER) → sıfır görsel değişim ile a11y. *(Kullanıcı kararı 2026-06-29.)*

**A11Y1-b · Soluk gri etiketler (`text-ink-faint`)**
- Öğe-bazlı swap (`text-ink-soft`): cerrahi ama iki muted gri → tutarsızlık + bakım maliyeti (QUALITY §5). Reddedildi.
- **Seçilen → token koyulaştırma:** `--color-ink-faint`'i light `#8b8d83`→**`#67695f`** (canvas 5.16 / canvas-deep 4.76 — daha zor olan canvas-deep'i de geçer), dark `#7d8073`→**`#8a8c80`** (canvas 5.38 / canvas-deep 4.92). Tek kaynak, tüm sayfalara tutarlı yayılır, token-sistemiyle uyumlu (QUALITY §5, ILKELER kalıcılık). *(Kullanıcı kararı 2026-06-29.)*

**A11Y1-c · Cream-on-ink opaklıklar (Footer/Crew OS panel)**
- Gerçek metin (`canvas/40` dil etiketi, `canvas/45` metrik): opaklığı **≥%60'a** çıkar (canvas/60 = 6.71 ✅; küçük metin güvenli eşik). Görünür ama hafifçe daha okunur.
- Dekoratif ayraç "·" (`canvas/30`): saf görsel ayraç → `aria-hidden="true"` (denetimden çıkar, görünüm korunur) **veya** opaklık bump. aria-hidden tercih (anlam taşımıyor).

**A11Y2 · Hero `<dl>` markup**
- Geçerli `<dl>`: `<div>` grupla + dt-sonra-dd + link içeride → karmaşık, "istatistik=tanım" niyeti tartışmalı.
- **Seçilen → dl/dt/dd kaldır:** öğeler etiketli **linkler** (Alpfit/Canlı ürün, Crew OS/Platform), tanım listesi değil. `<dl>`→`<div>`(veya `<ul>` link listesi), `<dt>/<dd>`→`<span>`. `definition-list` + `dlitem` denetimleri **tamamen** kapanır, görünüm birebir (aynı flex/spacing class'ları). *(Kullanıcı kararı 2026-06-29.)*

**A11Y3 · Dil-switcher `label-content-name-mismatch`**
- Sorun: trigger button görünür metni = locale kodu (`{locale}` → "TR"), `aria-label="Language / Dil"` (hardcoded, i18n değil). WCAG 2.5.3 (Label in Name): erişilebilir ad görünür metni **içermeli**; "Language / Dil" "TR" içermiyor → 2 öğe (Nav + Footer; ana sayfada 2 mount; PageHeader 3.).
- **Seçilen → kod-only, locale kodunu ada kat:** `aria-label={`${LABELS[locale]} (${locale.toUpperCase()})`}` → örn. "Türkçe (TR)" görünür "TR"yi içerir ✅, anlamlı kalır. `LABELS` zaten component-içi sabit (i18n messages değil) → **yeni i18n anahtarı YOK → 5-dil parite kuralı tetiklenmez.** Paylaşılan component → Nav+Footer+PageHeader (alt sayfalar dahil) tek seferde düzelir (kapsam-içi bonus). Alternatif (label'ı i18n'leştir) anahtar×5 getirir, parite yüzeyi açar — gereksiz; reddedildi.

### Kullanılacak Araçlar/Kütüphaneler

- **Yeni runtime bağımlılığı YOK** — tüm fixler CSS renk/token + markup/aria; `package.json` değişmez (Dokunulmazlar).
- **Lighthouse** (npx cache 13.3.0, `docs/perf/README.md` kanonik yöntem) — perf/a11y skoru, yerel prod build (`next build && next start`), light mode gate.
- **axe** — denetim detayı için, her iki tema. Playwright MCP `browser_evaluate` ile axe-core (CDN) enjekte **veya** `npx @axe-core/cli` (npx, package.json'a eklenmez — lighthouse precedent'i). Kesin araç plan-phase'de seçilir.
- Tailwind v4 `sr-only` / `aria-hidden` (yerleşik) — dekoratif işaretleme için.

### Dikkat Edilecekler

- **Perf/CLS regresyon yasağı (korunan taban):** Fixler renk + markup-swap, layout/asset/JS değil → CLS=0, masaüstü perf 100/LCP 0.69s, mobil ~87 **düşmemeli**. dl→div swap birebir aynı kutu (class/spacing korunur). Re-ölçümde teyit (TD3 yöntemi).
- **i18n parite:** Seçilen A11Y3 fix kod-only (LABELS) → yeni anahtar yok, parite tetiklenmez. Plan i18n'leştirmeye kayarsa: anahtar EKLEME = 5 dil (tr/en/ar/de/es) eşzamanlı (eksik anahtar = runtime; MEMORY Süreç Disiplinleri). Bu fazda **kaçınılır**.
- **RTL (AR):** dl→markup ve aria değişimi RTL'i bozmamalı; Hero stats flex+logical gap korunur, `aria-label` AR'de de locale-özel (`LABELS["ar"]` + "(AR)"). AR `dir=rtl` + 0 MISSING_MESSAGE teyit (Faz 3 deseni).
- **Token koyulaştırma craft taraması:** `--color-ink-faint` daha koyu → "faint" hiyerarşisi tüm sayfalarda (BulletinSubscribe/CaseStudies/Forum/Chatbot da kullanıyor) gözle kontrol; muted kalmalı, prominent olmamalı.
- **Lighthouse light vs gerçek a11y:** Gate light; token koyulaştırma her iki temayı da kapsar; dark axe ile elle teyit.
- **Ölçüm host-yükü + fresh-prod-serve:** `/proc/loadavg` düşük (≤~6), çoklu koşu median; listening-PID = fresh process (stray `next-server` yanlış-negatifine dikkat) — Faz 3 kanonik fresh-prod-serve disiplini (MEMORY Süreç Disiplinleri).
- **aria-hidden kapsamı:** Adım no aria-hidden → adım sırası `<h3>` başlık + DOM sırasıyla SR'a iletiliyor (numara salt görsel pekiştirme); tek a11y göstergesi değil.

### Teknik Kararlar

- **K1 — Adım numaraları `aria-hidden`** (renk/opaklık değişmez, faint imza korunur). Gerekçe: opaklık 3:1'e çıkamaz; solid craft'ı bozar; numara dekoratif-pekiştirme.
- **K2 — `--color-ink-faint` token koyulaştırma** (light `#67695f`, dark `#8a8c80`). Gerekçe: tek-kaynak tutarlılık (QUALITY §5), canvas-deep dahil 4.5'i geçer; ILKELER kalıcılık.
- **K3 — Hero stats `<dl>` → semantik link markup** (dt/dd kaldır). Gerekçe: doğru semantik (link, tanım değil); iki denetim birden kapanır; görünüm birebir.
- **K4 — Dil-switcher `aria-label`'a locale kodu** (kod-only, LABELS). Gerekçe: WCAG 2.5.3 uyumu, yeni i18n anahtarı yok (parite yüzeyi açılmaz), paylaşılan component tüm yüzeyleri düzeltir.
- **K5 — Cream-on-ink opaklık:** gerçek metin → ≥%60; dekoratif ayraç → `aria-hidden`.
- **K6 — Task 1 = otoriter re-ölçüm:** stale baseline → current build'de Lighthouse(light)+axe(her iki tema) ile kesin başarısız-denetim listesi sabitlenir; sonra fixler; sonra a11y=100 doğrulanır (`docs/perf/` tabanına yeni koşu).

### Precondition Kaynak İşaretleri (research kaydeder, verify-plan doğrular)

- `--color-ink-faint` (light L11 / dark L35), `--color-green` (L12) → **repoda-tanımlı**, site: `src/app/globals.css`
- Step span → `src/components/HowItWorks.tsx:84` · Hero `<dl>` → `Hero.tsx:86-136` · aria → `LanguageSwitcher.tsx:63` · Footer opaklıklar → `Footer.tsx:75,79,97,99` · Bunker metrik → `Bunker.tsx:85` → tümü **repoda-tanımlı**
- Kanonik ölçüm yöntemi + a11y kırılımı → `docs/perf/README.md` (**repoda-tanımlı**)
- **Yeni tanımlayıcı yok, dış sistem yok, secret yok.**

### Task 4.01 Re-ölçüm Teyidi (2026-06-29) — materyal sapma + kapsam kararı

> Otoriter re-ölçüm (Lighthouse 13.3.0 + axe-core 4.11.4, light+dark, mobil+masaüstü) yukarıdaki araştırma envanterinden **materyal sapma** buldu. Tam envanter + skor tabloları: arşivlenmiş `tasks/archive/TASK-4.01.md` oturum kaydı. Özet:

- **a11y = 89** her preset/tema (baseline teyit). dl / dlitem / label denetimleri research K3/K4 ile **birebir** (sapma yok). Perf referansı (pre-fix): masaüstü ~100/CLS 0, mobil ~85-86/CLS 0.
- **DEV-1 (kritik):** Kanonik Lighthouse koşusu **DARK** render ediyor (tema init `prefers-color-scheme: dark`'a düşer + `--headless=new` dark raporlar; baseline de dark'tı). → "Lighthouse light ölçer → gate LIGHT" varsayımı **ters**. Sonuç: K1-K5 tek başına a11y=100'e ulaşamaz.
- **DEV-2 (kritik):** `bg-ink` panelleri dark'ta krem'e dönünce yeni fail'ler, eski kapsamda yoktu: **C2** gym-panel adım no `text-pulse` ×3 (`SectorSolutions.tsx:131`, 1.22), **C3** "Canlı ürünü gör" `text-pulse` (`:143`, 1.22), **C9** Bunker durum `text-canvas/50` (`Bunker.tsx:58`, 3.36 — research ✅ demişti). Light'ta geçer, dark'ta fail.
- **DEV-3:** Baseline'ın "ol.space-y-5 #8af28a/1.22" kalemi = SectorSolutions text-pulse (C2/C3), HowItWorks değil; K1 yine geçerli (HowItWorks `text-green/30` her iki temada da fail: light 1.51 / dark 1.67).
- **DEV-4:** ink-faint fail'leri research'ten geniş (sektör etiketi + forum kartları) — hepsi K2 token tek-kaynağıyla kapanır (teyit).

**Kullanıcı kararı (2026-06-29):** **a11y=100 gate = Light + Dark** (kapsam genişletme). ILKELER "light & dark" + kanonik dark zaten zorluyor.

**Plan revizyonu (uygulandı — plan-phase 2026-06-29):**
- **C9** (Bunker durum `text-canvas/50`, dark 3.36 ❌) → **TASK-4.04**'e teyitli fix olarak eklendi (≥%60).
- **C2/C3** (gym-panel pulse-yeşili adım no + seeLive CTA) → **yeni TASK-4.07**. Craft mekanizması netleşti (kullanıcı kararı, 3 seçenek sunuldu): **adaptif `--color-pulse-ink` token** — light `#6fe36f` (= mevcut pulse, görünüm değişmez), dark `#1f7a3d` (krem panelde 4.74 ✅). Hem adım no hem CTA bu token'a geçer; aria-hidden değil çünkü kullanıcı dürüst/okunur fix istedi + CTA interaktif (gizlenemez).
- **Final doğrulama** → **TASK-4.08** (eski 4.07'den), **çift-tema** (light+dark) a11y=100.
- Etkilenmeyen: K1/4.02, K2/4.03, K3/4.05, K4/4.06.

### Task 4.02 İcra Notu (2026-06-29) — K1 mekanizma revizyonu (aria-hidden ≠ color-contrast muafiyeti)

> Önemli, **çapraz-task** etkisi olan bir bulgu (memory'ye de eklendi): `aria-hidden="true"` öğeyi axe `color-contrast` denetiminden **çıkarmaz**. Kontrollü testle kanıtlandı (**axe-core 4.11.4** — projenin aracı; **Lighthouse 13.3.0 bunu bundle ediyor**): kural görsel görünürlüğü (`isVisibleOnScreen`) baz alır, erişilebilirlik ağacını değil; hem doğrudan aria-hidden öğe hem aria-hidden ebeveyn içindeki öğe flag'lenir.

- **K1 revize edildi (kullanıcı kararı 2026-06-29):** "adım numarasına `aria-hidden`" → **CSS `::before { content: attr(data-n) }`** (Tailwind `before:` utility). Numara text-node olmaktan çıkıp `data-n` attribute + pseudo-element içeriğine taşındı → axe color-contrast taramaz; renk (`#1f7a3d`@30%) / font / hover→solid 500ms **birebir** korundu (sıfır görsel değişim, planın asıl niyeti). `aria-hidden` semantik olarak korundu.
- **Doğrulandı:** build temiz; axe 4.11.4 light+dark → adım numaraları color-contrast listesinden çıktı (`#how` eşleşmesi=0); gözle faint görünüm + hover geçişi aynı.
- **⚠️ K5/TASK-4.04 için uyarı:** K5 dekoratif "·" ayracı için `aria-hidden` planlamıştı — bu mekanizma color-contrast'ı çözmez. (Not: 4.02 axe koşusunda Footer `canvas/30` "·" ayraçları zaten **ihlal listesinde görünmedi** — punctuation/komşu metin run'ı olabilir; 4.04 bunu kendi ölçümünde teyit etsin.) Ayraç gerçekten flag'lenirse fix = pseudo-element/non-text render **veya** opaklık bump (≥ eşik), aria-hidden değil.

### Task 4.08 İcra Notu (2026-06-30) — final doğrulama + baseline `/en`-mislabel düzeltmesi (DEV-6)

> Faz milestone'u doğrulandı; ayrıca **çapraz-task** etkili bir ölçüm bulgusu (perf/README + memory'ye işlendi).

- **a11y=100 çift-tema teyitli:** Lighthouse kanonik (dark) TR `/` mobil+masaüstü a11y 100; 4 denetim color-contrast pass / label-mismatch pass / definition-list+dlitem **N/A** (K3 ile `<dl>` kaldırıldı → notApplicable, fail değil). axe (emulateMedia + reducedMotion + scroll) **light + dark** TR `/`: 4 denetim 0 + **tam tarama 0 toplam ihlal** (39 pass, her tema). K1-K5 + C2/C3/C9 hepsi doğrulandı.
- **DEV-6 (kritik, çapraz-task): v0.1 perf baseline TR `/` değil `/en` ölçmüş.** Cookie'siz kanonik koşu Chrome `Accept-Language` ile `/`→`/en` redirect olur (next-intl `localeDetection`; MEMORY'deki redirect tuzağı **Lighthouse'da da** geçerli — Chrome tabanlı). Kanıt: v0.1 artifact `home-{mobile,desktop}-20260628.json` `finalUrl=/en`. README "Ana sayfa (`/`, TR varsayılan)" etiketi yanlıştı (sayılar doğru, locale-etiketi yanlış). → Düzeltildi (perf/README intro + v0.1 başlık + Metodoloji).
- **Perf regresyon yok (apples-to-apples):** post-fix build `/en` (baseline-birebir komut) → mobil perf 87 / LCP 3156ms / FCP 1056ms / CLS 0 = baseline **birebir**; masaüstü perf 100 / CLS 0 = baseline. Lantern simülasyonu deterministik olduğu için "birebir" = Faz 4'ün CSS-renk/markup/aria fixleri **sıfır perf maliyeti**. TR `/` (cookie ile, yeni ölçülen) mobil 84 / masaüstü 99 — `/en`'den ağır TR hero metni, **regresyon değil** (baseline bu sayfayı hiç ölçmemişti). Korunan taban (ILKELER §2) regresyonsuz.
- **Süreç dersi:** İleride perf ölçerken TR varsayılan sayfası için `NEXT_LOCALE=tr` cookie **şart** (yoksa `/en` ölçülür); karşılaştırmada hep **aynı locale**. (perf/README Metodoloji + MEMORY tuzak satırı güncellendi.)

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 4` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 4.01 | TASK-4.01 | ✅ Tamamlandı | Otoriter re-ölçüm: envanter sabitlendi; materyal sapma → light+dark kapsam genişletme (bkz. Re-ölçüm Teyidi) |
| 4.02 | TASK-4.02 | ✅ Tamamlandı | Adım numaraları color-contrast'tan çıkar — K1 mekanizması `aria-hidden`→CSS `::before` (aria-hidden axe color-contrast'ı çözmüyor; bkz. İcra Notu) |
| 4.03 | TASK-4.03 | ✅ Tamamlandı | `--color-ink-faint` token koyulaştırma (K2, color-contrast — globals.css; axe light+dark 0 ink-faint flag) |
| 4.04 | TASK-4.04 | ✅ Tamamlandı | Cream-on-ink opaklık (K5+C9+C10 — Footer /60, Bunker status /60, metrik /70; ayraçlar aria-hidden; axe light 0 / dark yalnız text-pulse) |
| 4.05 | TASK-4.05 | ✅ Tamamlandı | Hero `<dl>`/`<dt>`/`<dd>` → `<div>`+`<span class="block">` (K3; data-hero korundu, görünüm birebir; axe light+dark definition-list 0 + dlitem 0) |
| 4.06 | TASK-4.06 | ✅ Tamamlandı | Dil-switcher `aria-label`'a locale kodu (K4; `${LABELS[locale]} (${locale.toUpperCase()})`, kod-only; axe label-content-name-mismatch light+dark × 5 dil 0) |
| 4.07 | TASK-4.07 | ✅ Tamamlandı | Gym-panel pulse-yeşili dark-inversion fix (C2/C3): yeni adaptif `--color-pulse-ink` token (light `#6fe36f`/dark `#1f7a3d`); axe color-contrast light+dark 0 (dark 1.22→4.74) |
| 4.08 | TASK-4.08 | ✅ Tamamlandı | Final doğrulama: a11y=100 **çift-tema** teyit (axe light+dark 0 toplam ihlal); perf/CLS regresyonsuz (apples-to-apples `/en` birebir baseline); taban + DEV-1/locale düzeltmeleri kaydedildi |

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
| Modülerlik | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / N/A | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-06-29
**Son Güncelleme:** 2026-06-30 — run-task TASK-4.08 ✅: final çift-tema doğrulama. a11y=100 mobil+masaüstü (Lighthouse kanonik dark, TR `/`); axe light+dark TR `/` tam tarama **0 toplam ihlal** (39 pass/tema). Perf/CLS regresyonsuz — DEV-6: v0.1 baseline aslında `/en` ölçmüş (artifact finalUrl kanıtı), apples-to-apples `/en` repro birebir baseline (mobil 87/LCP3156/CLS0, masaüstü 100/CLS0); TR `/` 84/99 yeni profil, regresyon değil. perf/README'ye v0.2/Faz 4 bölümü + DEV-1/locale düzeltmeleri; kanonik artifact 20260630 + repro kaydedildi. **Fazın 8 task'ı tamam (4.01-4.08 ✅)** — sıradaki adım: verify-phase (UAT).
