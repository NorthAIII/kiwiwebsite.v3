# Phase 5: Test Altyapısı (D1)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.2'nin ikinci içerik fazı (teknik temel): projeye **kümülatif test altyapısını** (D1) sıfırdan kurmak. ILKELER'in "test atlanmaz, altyapı her geliştirmeyle üstüne koyarak büyür" ilkesini somutlaştırır ve mevcut "test = `next build` + elle/otonom doğrulama" geçici konvansiyonunu kapatan **harness'i** getirir. Felsefe gereği faz dar tutulur: **runner'lar + CI iskeleti + her katmanı uçtan-uca kanıtlayan birkaç yüksek-değerli tohum test** — mevcut tüm bileşenleri tek seferde teste alma değil. Geniş kapsam sonradan her feature kendi testini ekleyerek kümülatif büyür.

**Milestone:** *(Faz 2/3/4 dersi: içerik fazı bile "kur + kanıtla" çerçevesinde yazılır — yeşil sayılmadan önce fail-on-regression gösterilir.)*
1. **Runner'lar çalışıyor:** Vitest (`npm run test`) ve Playwright (`npm run test:e2e`) komutları yeşil; config dosyaları repoda (`package.json` scriptleri + onaylı devDependency'ler).
2. **Vitest tohum (i18n parite) geçiyor:** tr/en/ar/de/es anahtar kümeleri eşit (eksik anahtar = fail). **Fail-on-regression kanıtı:** kasıtlı eksik anahtarla test **kırmızı** olur.
3. **Playwright/axe tohum (a11y regresyon) geçiyor:** ana sayfa `/` **light + dark** axe 0 ihlal (Faz 4 yöntemi: `emulateMedia` + `reducedMotion:'reduce'` + uçtan-uca scroll + `NEXT_LOCALE=tr` cookie). **Fail-on-regression kanıtı:** kontrast regresyonu enjekte edilince test kırmızı olur.
4. **CI iskeleti yeşil:** GitHub Actions workflow push/PR'da `next build` + Vitest(birim+i18n) hızlı job + Playwright/a11y ayrı job koşar; revize branch'inde de tetiklenir, yeşil rapor.
5. **Kümülatif benimseme notu:** kısa test convention dokümanı — testlerin nerede yaşadığı, nasıl koşulduğu, "her yeni feature kendi testini ekler" beklentisi.
6. **Regresyon yok:** değişiklik yalnız devDependency + config + CI + `tests/`; runtime/build çıktısı, perf/a11y korunan taban (ILKELER §2) değişmez.

### Feature Listesi

(MODULE-MAP ve modules/ referansı. Test altyapısı çapraz-kesen bir teknik temeldir: runner/CI/config M6 build-katmanına, i18n parite tohumu M4'e, a11y regresyon tohumu M1–M3 a11y yüzeyine dokunur.)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| D1.1: Test harness kurulumu | M6 (infra, çapraz) | Vitest (+@testing-library/react +jest-dom) / @playwright/test / @axe-core/playwright kurulumu + config + `npm` scriptleri |
| D1.2: i18n 5-dil parite tohum testi | M4 | Vitest: `messages/{tr,en,ar,de,es}.json` anahtar kümeleri eşit (eksik anahtar = fail) |
| D1.3: a11y regresyon tohum testi | M1–M3 (a11y) | Playwright + @axe-core/playwright: ana sayfa `/` light+dark 0 ihlal (Faz 4 ölçüm disiplini) |
| D1.4: CI iskeleti | M6 | İlk GitHub Actions workflow: build + Vitest(birim+i18n) hızlı job + Playwright/a11y ayrı job |
| D1.5: Kümülatif test convention notu | M6 / docs | Kısa doküman: test yeri/koşma komutları + "her feature kendi testini ekler" beklentisi |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 5` oturumunda dolduruldu (2026-06-30).

### Alınan Kararlar

- **Faz tipi = v0.2 teknik temel fazı (test altyapısı D1).** Versiyon Sonu Durumu: `içerik_fazları` (değişmez — v0.2'nin kalan içerik fazları sürüyor: D1 test altyapısı → perf → Umami). Kaynak: ILKELER "kümülatif test altyapısı" + REVIZE-BACKLOG D1 + VERSIONS v0.2 çekirdeği + Faz 4 retro önerisi ("a11y/perf kazanımını otomatik regresyon testine bağla").
- **Kapsam = altyapı + yüksek-değerli tohum** (kümülatif başlangıç), geniş kapsam değil (kullanıcı kararı). Gerekçe: "az context = yüksek kalite" + küçük iş paketi felsefesi; mevcut bileşen kapsamı tek seferde alınmaz, sonradan her feature kendi testiyle büyür (ILKELER kümülatif test).
- **Araç yığını = Vitest (+@testing-library/react +jest-dom) + Playwright (@playwright/test) + @axe-core/playwright** (kullanıcı kararı). Gerekçe: Vitest ESM-native → three.js transpile + Next 15 ile Jest'in ESM sürtünmesi yok; Playwright + axe-core **zaten projede** (Faz 4 manuel a11y: playwright-core 1.61.1 + axe-core 4.11.4) → en düşük sürtünme, presentational + 5-dilli site için en yüksek değer katmanı E2E/a11y.
- **CI = GitHub Actions** — build + Vitest(birim+i18n) hızlı job + Playwright/a11y ayrı (tarayıcı kurulumlu) job (kullanıcı kararı). Gerekçe: kalıcılık + kümülatif teste gerçek güç — otomatik koşmayan test çürür (rot). Bu projenin **ilk CI'ı** (şu an `.github/workflows` yok; Vercel git-entegrasyonu yalnız `main`→deploy yapıyor, doğrulama yapmıyor).
- **Tohum testler = i18n 5-dil parite (Vitest) + a11y regresyon `/` light+dark (Playwright/axe)** (kullanıcı kararı + follow-up). i18n parite Vitest katmanını, a11y regresyon Playwright/axe katmanını tohumlar → **her katman uçtan-uca kanıtlanır** (Q1 çerçevesi). a11y tohumu Faz 4'ün a11y=100 kazanımını otomatik kilitler ve sahipli alt-sayfa a11y borcunu süpürecek harness'i verir. (Tutarlılık follow-up'ı: i18n parite tek başına Vitest katmanındaydı → Playwright/axe katmanı tohumsuz kalacaktı; kullanıcı Playwright tohumu olarak a11y regresyonu seçti.)
- **Benimseme = kısa test convention notu** — kümülatif ilke ancak "nasıl/nerede test eklenir" yazılı olursa gerçekleşir (sahipsiz alan kapatma).
- **Bağımlılık ekleme onayı:** Araç seçimleri bu oturumda onaylandı; ama gerçek `npm install` (package.json/package-lock + gerekirse `tsconfig.json`'a test tipleri) **Dokunulmazlar** gereği install anında (plan/run) ayrıca teyit edilir — bilinçli, tek sefer.
- **Erken çapraz-konu işaretleri (research'e taşınacak — Dikkat Edilecekler'de detaylanır):** (a) **Araç davranışını ampirik yokla** — Faz 4 retro dersi: a11y ölçümünde DEV-1 (kanonik dark render) + aria-hidden≠contrast varsayımları icrada düzeltildi; `@axe-core/playwright`'in tema/locale/scroll davranışını fix-task'tan önce doğrula. (b) **Locale tuzağı** — TR `/` için `NEXT_LOCALE=tr` cookie şart (Accept-Language redirect tuzağı test ortamında da geçerli; MEMORY). (c) **three.js/WebGL** test ortamında çalışmaz (jsdom WebGL yok) → Living Flow birim-test edilmez. (d) **Chat API testi** ileride eklenirse gerçek Anthropic'e gitmemeli (mock); bu tohum turunda kapsam dışı, ama secret/maliyet farkındalığı şimdiden. (e) **a11y test güvenilirliği** — full-motion'da reveal `opacity:0` atlanır (Faz 4 DEV-5) → `reducedMotion` + scroll şart.

### Kullanıcı Tercihleri

- **Kapsam = altyapı + tohum** (2026-06-30): kümülatif başlangıç; geniş kapsam reddedildi.
- **Yığın = Vitest (+RTL) + Playwright (+axe-core)** (2026-06-30): tam yığın.
- **CI = GitHub Actions, Playwright ayrı job** (2026-06-30): build+birim+i18n hızlı job + Playwright/a11y ayrı job.
- **Tohum = i18n parite + a11y regresyon** (2026-06-30): i18n parite ilk seçimde; tutarlılık follow-up'ında Playwright katmanı için a11y regresyon eklendi. Route smoke + Chat API kontratı bu turda dışarıda (kümülatif sonraki ekleme).

### Kapsam Dışı

- **Mevcut bileşenlerin geniş test kapsamı** — kümülatif ilke gereği sonradan her feature kendi testini ekler; bu faz yalnız harness + 2 tohum.
- **Alt-sayfa a11y testleri** (Alpfit, Crew OS showcase `/bunker-os`, vaka, bülten) — harness genişletilebilir ama bu faz yalnız `/` light+dark tohumlar; alt-sayfa süpürmesi sonraki a11y/alt-sayfa fazı (Faz 4 retro: sahipli borç).
- **Mobil perf otomasyonu (Lighthouse CI / perf bütçe gate)** — ayrı v0.2 perf fazı. Bu fazın a11y tohumu yalnız axe (kontrast/markup) regresyonudur; perf/Lighthouse skoru hariç.
- **Visual regression (screenshot diff)** — ağır altyapı, bilinçle dışarıda.
- **three.js/WebGL birim testi** — jsdom WebGL desteklemez; Living Flow yalnız (gelecekte) E2E mount/fallback smoke ile, birim test edilmez.
- **Pre-commit hook (husky/lint-staged)** — CI kapsıyor; ek friction, bilinçle basit tutuldu, sonraki adım.
- **Coverage threshold / coverage gate** — 2 tohum testle anlamsız; kümülatif büyüdükçe eklenir.
- **Chat API kontrat testi** — bu tohum turunda seçilmedi (sonraki kümülatif ekleme); Vitest mock harness'i hazır olacak ama test yazılmaz.
- **Alakasız ertelenmiş kalemler** (`/bunker-os`→`/crew-os` redirect, çıplak `/forum`→404, Umami E1) — bu fazda açılmaz.

---

## Araştırma Bulguları

> `/devflow:research-phase 5` (2026-06-30). Discuss'taki yığın kararı doğrulandı + sürümler ampirik saptandı (npm registry, tahmin değil) + 2 karar noktası kullanıcıya sunuldu/çözüldü.

### Mevcut Durum (ampirik doğrulandı)

- **i18n paritesi şu an tam:** 5 dilde de **183 yaprak anahtar**, 0 eksik / 0 fazla (recursive flatten karşılaştırması) → i18n parite tohumu mevcut durumda **yeşil** geçer; fail-on-regression kanıtı için tek anahtar silmek yeterli.
- **Playwright/axe proje bağımlılığı DEĞİL.** Discuss'taki "zaten projede" notu Faz 4'ün **npx cache** kullanımına aitti. `package.json`/`node_modules`'ta yok; `package-lock.json`'daki `@playwright/test` yalnızca Next'in **opsiyonel peer** referansıdır (yanıltıcı). → Taze install gerekir.
- Temiz başlangıç: `vitest.config`/`playwright.config`/`tests/` yok, `.github/` yok, eslint kurulu değil. Node v24.16 / npm 11.13.

### Değerlendirilen Yaklaşımlar

- **Test runner: Vitest vs Jest** — **Vitest** (discuss kararı doğrulandı). ESM-native, Vite transform ile three.js `transpilePackages` + Next 15 ESM zincirine sürtünmesiz; Jest'in `next/jest` + ESM + three transpile setup'ı kırılgan. Ampirik: vitest 4.1.9 engines `node>=24` ✓.
- **E2E/a11y: @axe-core/playwright vs jest-axe vs Lighthouse-CI/pa11y** — **@axe-core/playwright**. Gerçek tarayıcıda render+CSS+kontrast (Faz 4 ile aynı zemin), playwright 1.61.1 Faz 4'te zaten kullanıldı. jest-axe jsdom'da koşar ama jsdom gerçek layout/CSS/kontrastı yansıtmaz → a11y için yanıltıcı yeşil. Lighthouse-CI perf fazına ait (ayrı v0.2 fazı, kapsam dışı).
- **DOM env: jsdom vs happy-dom** — **jsdom** (29.1.1). Spec-tamlığı RTL + a11y-bilinçli proje + kalıcılık önceliğiyle (ILKELER) hizalı; happy-dom hızlı ama eksik.
- **i18n parite: anahtar-kümesi vs değer karşılaştırması** — **anahtar kümesi** (recursive flatten, hem eksik hem fazla yönü). Değer **karşılaştırılmaz**: TR tek kaynak, stale çeviri versiyon-sınırına dek serbest; yalnız eksik/fazla anahtar fail (dil stratejisi → DECISIONS 2026-06-27/06-28, M4).
- **Seçilen yığın:** Vitest (node + jsdom) ikili katman + Playwright/axe. Her katman uçtan-uca bir tohumla kanıtlanır (milestone Q1).

### Kullanılacak Araçlar/Kütüphaneler

Hepsi **yeni devDependency** (hiçbiri kurulu değil); gerçek `npm install` **install anında ayrıca teyit** edilir (Dokunulmazlar — package.json/lock + gerekirse tsconfig test tipleri).

| Paket | Sürüm | Ne için |
|-------|-------|---------|
| `vitest` | 4.1.9 | Test runner (node + jsdom) |
| `@vitejs/plugin-react` | 6.0.3 | JSX transform (yalnız component katmanı) — peer **vite ^8** |
| `@testing-library/react` | 16.3.2 | Component render (React 19 destekli ✓) |
| `@testing-library/jest-dom` | 6.9.1 | DOM matcher'ları (setupFiles ile yüklenir) |
| `jsdom` | 29.1.1 | Component testleri için DOM ortamı |
| `@playwright/test` | 1.61.1 | E2E/a11y koşucu (Faz 4 npx playwright-core 1.61.1 ile **birebir**) |
| `@axe-core/playwright` | 4.12.1 | axe denetimi (**axe-core ~4.12.1** bundle eder) |

### Dikkat Edilecekler

1. **🔴 Lighthouse-altküme ≠ ham axe full-ruleset + sürüm drift (en kritik).** Faz 4'ün **a11y=100**'ü **Lighthouse** skorudur (Lighthouse axe'ın WCAG'a maplenmiş **alt kümesini** koşar, axe-core 4.11.4). Ham `@axe-core/playwright` varsayılan olarak **best-practice dahil tüm ruleset'i** koşar ve **axe-core 4.12.1** kullanır. İki fark birikince "Lighthouse a11y=100" → "@axe-core/playwright 0 ihlal" **garanti etmez**; tohum, Lighthouse'un saymadığı best-practice ihlalleri (region/landmark/heading-order) yüzünden regresyon olmadan kırmızı çıkabilir. **Kaçınma:** axe kapsamı `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa'])` (kullanıcı kararı) → WCAG AA standardını kilitler, best-practice gürültüsü dışarıda. Yine de plan/icrada `/` light+dark'a **ampirik koş**, gerçek 0-ihlal baseline'ı sabitle (Faz 4 DEV-1 dersinin tekrarı). *Kaynak: Faz 4 a11y=100 → `phases/PHASE-4.md`; axe-core 4.11.4 (Lighthouse bundle) vs 4.12.1 (@axe-core/playwright bundle).*
2. **Locale tuzağı.** `/` (prefixsiz TR) Accept-Language ile otomatik `/en` vb.'ye yönlenir (next-intl `localeDetection`); test ortamında da geçerli. TR ölçümünde **`NEXT_LOCALE=tr` cookie şart** (cookie precedence > Accept-Language). *Tanımlayıcı: `NEXT_LOCALE` = next-intl runtime cookie (dış/runtime — repoda env/sabit değil). Kaynak: MEMORY "Accept-Language redirect tuzağı".*
3. **Tema tuzağı.** a11y daima **light + dark iki koşu**; `bg-ink`/`text-canvas` panelleri (SectorSolutions, Bunker, Footer) dark'ta krem'e döner → kontrast pass/fail flip eder. Playwright `emulateMedia({ colorScheme })`. *Kaynak: MEMORY "a11y ölçümünde tema tuzağı".*
4. **Reveal `opacity:0` tuzağı.** Full-motion'da scroll-reveal içerik `opacity:0` kalır → axe gizli içeriği atlar (yanlış yeşil). `emulateMedia({ reducedMotion: 'reduce' })` + **uçtan-uca scroll** şart. *Kaynak: Faz 4 DEV-5 → `phases/PHASE-4.md`.*
5. **three.js/WebGL jsdom'da yok.** Living Flow birim-test edilmez (kapsam dışı, teyit). Component **smoke** testi WebGL'siz, app-bağımsız trivial bir component olmalı (next-intl/GSAP/three sürüklememeli) — amaç toolchain öz-kanıtı.
6. **Vitest çift-ortam ayrımı.** i18n parite = **node** ortamı (default, hızlı, DOM gerekmez); component smoke = **jsdom** (`// @vitest-environment jsdom` pragma). `setupFiles` jest-dom matcher'larını yükler; `@vitejs/plugin-react` yalnız JSX transform için. Kümülatif büyüyünce `test.projects` (node/jsdom ayrı proje) ile bölünür.
7. **Playwright = taze install.** `npx playwright install --with-deps chromium` (yerel + CI). package-lock referansına güvenme (madde: mevcut durum).
8. **CI build maliyeti.** İlk CI'da iki job da `next build` koşar (basit/robust). `.next` artifact paylaşımı bilinçli **ileri optimizasyon** (şimdi değil).

### Teknik Kararlar

- **axe kapsamı = WCAG etiketleri** (`wcag2a/2aa/21a/21aa`) — *kullanıcı kararı 2026-06-30.* Faz 4'ün kilitlediği standardı regresyona bağlar; best-practice ayrı/bilinçli ele alınır.
- **Vitest DOM/component katmanı = şimdi kur + minik render-smoke testi** — *kullanıcı kararı 2026-06-30.* RTL+jsdom+jest-dom+plugin-react kurulur VE jsdom yolunu kanıtlayan tek minik smoke testi eklenir (harness öz-kanıtı; geniş component kapsamı değil). Seed böylece **3 kanıtlı katman**: Vitest-node (i18n parite) · Vitest-jsdom (smoke) · Playwright/axe (a11y regresyon).
- **Vitest ortamı:** default `node` + component testlerde `jsdom` pragma (ileride `test.projects`'e geçiş).
- **Playwright hedefi:** prod build (`next build && next start` üzerinden `webServer`), Faz 4 ölçüm zemini; **chromium-only** (a11y tek motor yeter, CI hızlı).
- **CI = ilk GitHub Actions:** 2 job — *hızlı* (`npm ci` → `next build` → `vitest` [birim+i18n]) + *a11y* (`npm ci` → `playwright install chromium` → `next build` → `playwright` [a11y]); push + PR, **revize branch dahil**. npm + playwright-browser cache.
- **Tüm devDependency ekleme install anında teyit** (Dokunulmazlar) — bilinçli tek sefer.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 5` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 5.01 | TASK-5.01 | ✅ Tamamlandı | Vitest kurulumu (node) + i18n 5-dil parite tohum testi (D1.1+D1.2) |
| 5.02 | TASK-5.02 | ✅ Tamamlandı | Vitest jsdom katmanı + component smoke tohum testi (D1.1) |
| 5.03 | TASK-5.03 | ✅ Tamamlandı | Playwright + axe harness + a11y regresyon tohum, `/` light+dark (D1.1+D1.3) |
| 5.04 | TASK-5.04 | ✅ Tamamlandı | CI iskeleti — ilk GitHub Actions (fast + a11y job) (D1.4) |
| 5.05 | TASK-5.05 | ✅ Tamamlandı | Kümülatif test convention notu (docs/TESTING.md) (D1.5) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

**Seed = 3 kanıtlı katman → 1:1 task:** Vitest-node (5.01) · Vitest-jsdom (5.02) · Playwright/axe (5.03). Her runner kendi devDependency'sini kurup kendi tohumuyla "kur+kanıtla" milestone'una göre kanıtlanır. Sıra lineer (5.01→5.05); 5.02 vitest.config'i genişletir, 5.04 üç runner komutunu gerektirir, 5.05 hepsini belgeler.

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 5` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 5` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 5` oturumunda doldurulur.

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

**Oluşturulma:** 2026-06-30
**Son Güncelleme:** 2026-06-30 — run-task 5.05 ✅: `docs/TESTING.md` test convention notu yazıldı (komutlar + test yerleri + 3 katman [Vitest node/jsdom + Playwright/axe] + a11y ölçüm disiplini özet/pointer + "yeni test nasıl eklenir" kümülatif beklenti + CI); INDEX Bilgi Havuzu'na işlendi. Komut/yol↔artefakt birebir statik doğrulandı (ortamda node yok → yerel koşu yok; runner yeşilliği TASK-5.04 CI run `28470864743`'te kanıtlı, bu task yalnız doküman). **Faz icrası tamam (5/5)** — 5.01–5.05 hepsi ✅; sıradaki adım verify-phase 5 (UAT). İcra nüansları faz boyunca (retro adayları): taze devcontainer'da `gh`/`node`/`python` yokluğu (CI gözlemi public REST API+curl ile, yerel test koşusu yok); WCAG-`withTags` Lighthouse-altküme vs ham axe farkını nötralize etti. CI yalnız doğrular, deploy etmez.
