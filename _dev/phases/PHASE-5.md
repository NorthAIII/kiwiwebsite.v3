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

> Bu bölüm `/devflow:research-phase 5` oturumunda doldurulur.

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

> Bu bölüm `/devflow:plan-phase 5` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | ⬜ | plan-phase 5'te doldurulacak |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

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
**Son Güncelleme:** 2026-06-30 — discuss-phase 5: kapsam tartışması tamamlandı (altyapı + tohum kümülatif başlangıç; Vitest+RTL / Playwright+axe-core yığını; ilk GitHub Actions CI; tohum = i18n 5-dil parite + a11y regresyon `/` light+dark). Sıradaki: research-phase 5.
