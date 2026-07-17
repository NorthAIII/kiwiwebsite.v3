# Phase 16: v0.4 versiyon-sonu teknik borç kapatma (+ TR production release)

**Durum:** ✅ Tamamlandı

<!-- Bu doküman faza girince (discuss-phase) oluştu; durum 🔄 ile başlar. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-16-<slug>.md`'ye bölünür. Tamamlandıktan (✅) sonra bölme yasaktır. -->

---

## Genel Bilgiler

**Amaç:** v0.4 (Alpfit Plus) içerik fazı (Faz 15) tamamlandıktan sonraki versiyon-sonu teknik borç kalemlerini kapatmak. Bu faz oturumunda ayrıca **kullanıcı önceliğiyle v0.4 TR production release** yapıldı (App Store lansman aciliyeti) — release operasyonel aksiyon olarak `docs/RELEASE-v0.4.md`'de kayıtlı.

**Milestone:** v0.4 versiyon-sonu teknik borç kalemleri kapalı (gym PNG disk hijyeni + npm audit / bağımlılık denetimi); TR sürüm canlıda (✅ yapıldı — `f173234`); guardrail'ler (a11y=100 çift-tema · perf tabanı · CLS≈0 · i18n 5-dil parite) regresyonsuz. non-TR çeviri bu fazın **dışı** (sonraki faz / prd-review).

### Feature Listesi

(MODULE-MAP referansı — v0.4 versiyon-sonu teknik borç iş birimleri)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| REL: v0.4 TR production release | M6 | `revize/alpfit-plus` → `main` (canlı); TR tam, non-TR stale-TR (ertelendi); canlı duman testi. **✅ yapıldı** (bu oturum) — `docs/RELEASE-v0.4.md`. |
| TB-D1: gym PNG disk hijyeni | M2 (asset) | `public/gym/*.png` (4 orphan dosya, ~1.7MB, 0 tüketici) sil. Faz 15'te bilinçle Kapsam Dışı bırakıldı → bu faza devredildi. |
| TB-D2: npm audit / bağımlılık denetimi | M6 | `npm audit` raporu + (varsa) onaylı güncelleme. `package-lock.json` dokunulmaz kalır (onay-gerektiren); v0.1'den beri ertelenen hafif güvenlik/güncellik hijyeni. |

---

## Kapsam Tartışması

> `/devflow:discuss-phase 16` oturumunda dolduruldu (2026-07-16).

### Versiyon Sonu Tespiti (Adım 0)

- Aktif Versiyon v0.4 · Versiyon Sonu Durumu `içerik_fazları` · v0.4 feature'ları (AP1/AP2/AP3) ✅ · Aktif Faz/Adım dolu (15/discuss) → koşul karşılandı: **`içerik_fazları` → `teknik_borç`** damgalandı (Faz 7→8 emsali). Faz 16 = v0.4 versiyon-sonu teknik borç fazı.

### Alınan Kararlar

- **v0.4 TR production release öne çekildi (kullanıcı önceliği).** Normal sıra (teknik borç → senaryo testi → prd-review → release) yerine release **şimdi** yapıldı; App Store lansman aciliyeti. *Gerekçe:* Faz 15 tam doğrulandı (UAT 16/16, a11y=100, CI yeşil) → kalite riski düşük; senaryo testi + prd-review canlı v0.4 üstünde arkadan gelir (test-what's-live, v0.2 emsali). Sonuç: `main` = `f173234`, canlı ✓ (`docs/RELEASE-v0.4.md`).
- **TR içerik olduğu gibi yayınlandı.** Fiyatlar (₺1.500/salon/ay, 2. salon ₺1.200, kurulum ₺3.000, 15 gün deneme) + tüm TR metin Faz 15 halinde. *Gerekçe:* kullanıcı bölüm-bölüm gözden geçirdi, "fena durtmuyor, gerekirse sonra düzeltiriz" (2026-07-16). Ek TR içerik task'ı açılmadı.
- **non-TR (en/ar/de/es) çeviri → bu fazın DIŞI, sonraki faz / prd-review.** Canlıda non-TR = stale-TR (yapısal anahtar tam, değer Türkçe). *Gerekçe:* TR tek kaynak, versiyon-sınırı (DECISIONS 2026-06-27); v0.2/v0.3'te de dil stratejisi prd-review'a bırakıldı; tam 4-dil çeviri (133 leaf) SOTD craft bar'ıyla ayrı bir iş. "Kalan kısma devam ederiz" (kullanıcı).
- **gym PNG disk hijyeni → kapsama alındı (TB-D1).** `public/gym/*.png` (4 orphan dosya) silinir. *Gerekçe:* temiz mekanik hijyen; Faz 15'ten açıkça bu faza ertelenmişti; kalıcılık ilkesi.
- **npm audit / bağımlılık denetimi → kapsama alındı (TB-D2).** *Gerekçe:* kullanıcı seçimi (discuss-phase 16); v0.1'den beri ertelenen hafif güvenlik hijyeni. `package-lock` dokunulmaz — sadece rapor + onaylı güncelleme (Dokunulmazlar kuralı).

### Kullanıcı Tercihleri

- **Hız > tam çeviri:** siteyi bekletmeden TR'de canlıya al; diğer diller sonra.
- **App Store lansmanı yakın:** web sitesi hazır olmalı (uygulama neredeyse App Store'da).
- **Ek borç:** npm audit alındı; full-motion test tohumu alınmadı (sade tut).

### Çapraz Konular (research/plan farkındalığı)

- **Release regresyon güvencesi:** canlıya giden kod CI-yeşil `7e577d1`; guardrail'ler Faz 15'te mühürlü. gym PNG silme runtime'ı etkilemez (0 tüketici, `next/image` zaten düştü); npm güncelleme yaparsa build + Vitest + a11y tohumları yeniden koşulmalı (regresyon kapısı).
- **`public/gym/*.png` silme güvenliği:** grep 0 tüketici (Faz 15 teyitli) — ama silmeden önce yeniden grep (kaynak + `_dev/` referans) şart; sitemap/OG imaj referansı olmadığını doğrula.
- **npm audit:** düzeltme yalnız `package-lock` dokunulmazlığını bozmadan (onaylı `npm audit fix` veya sürüm-pin) — build/CI kırılmamalı; kırılırsa geri al, borcu kaydet.

### Kapsam Dışı

- **non-TR (en/ar/de/es) çeviri** — sonraki faz / prd-review (TR tek kaynak; canlıda stale-TR geçici kabul).
- **App Store / Google Play indirme linki/rozeti + pilot chip güncelleme + yol haritası tazeliği** — sonraki içerik işi ("gerekirse sonra düzeltiriz").
- **Chatbot `ANTHROPIC_API_KEY` env** — kullanıcı aksiyonu (Vercel dashboard); kod işi değil.
- **`/bulten` çıplak 404** — pre-existing latent gap (v0.4 dokunmadı); gelecek SEO/içerik işi.
- **Senaryo testi** — versiyon-sonu sıradaki fazı (Faz 17); bu faz teknik borç.
- **TR içerik/fiyat düzenlemesi** — yayınlanan hali korunur (kullanıcı "sonra düzeltiriz").

---

## Araştırma Bulguları

> `/devflow:research-phase 16` oturumunda dolduruldu (2026-07-16). Bu faz iki mekanik teknik-borç kalemi olduğundan araştırma = **mevcut durumu kodda/registry'de doğrulamak** (mimari yaklaşım karşılaştırması değil). Karar noktası yalnız TB-D2'de doğdu → kullanıcıya soruldu, `docs/DECISIONS.md` 2026-07-16'ya kaydedildi.

### TB-D1 — gym PNG disk hijyeni (karar gerektirmez)

**Doğrulama (grep, teyitli):**
- `public/gym/`: 4 dosya — `calendar.png` (437KB) · `dashboard.png` (339KB) · `member.png` (371KB) · `messaging.png` (576KB) = **~1.7MB**. *(kaynak: repoda-tanımlı disk asset — `public/gym/*.png`.)*
- **0 kod tüketicisi:** repo-geneli grep (`src/`, `messages/`, `sitemap.ts`, `robots.ts`, `next.config.ts`, `.css`) `calendar/dashboard/member/messaging.png` + `/gym/` için **hiç eşleşme yok**. Tek referanslar `_dev/` dokümanlarında (tarihsel/planlama) + M2 modül dokümanı (aşağıda, stale).
- Eski `components/gym/GymSoftwareShowcase.tsx` zaten TASK-15.07'de `git rm`'lendi; sayfa artık `components/alpfit/*` (6 bileşen: Hero/Showcase/Roles/Features/Why/Pricing, saf CSS/SVG — raster görsel yok, `next/image` bu sayfadan düştü). *(kaynak: repoda-tanımlı — `src/components/alpfit/`, `src/app/[locale]/spor-salonu-yazilimi/page.tsx`.)*
- Sitemap/OG-imaj/robots referansı **yok** (sitemap 5 locale × 6 path, imaj listesi tutmaz).

**Sonuç:** 4 PNG tam orphan → güvenle silinir. Plan-phase'de mekanik task: `git rm public/gym/*.png` + boşalan `public/gym/` dizini kaldır.

### TB-D2 — npm audit / bağımlılık denetimi (karar: kabul + kayıt)

**Doğrulama (npm audit + registry sorgusu):**
- **365 bağımlılık · 2 moderate · 0 low/high/critical/info.** İki bulgu da **tek kök nedenden:** `next`'in içine gömülü (nested) `postcss@8.4.31` — `node_modules/next/node_modules/postcss`. *(kaynak: dış — Next'in bundle bağımlılığı; projenin declared bağımlılığı değil.)*
- Advisory: [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) — postcss `<8.5.10`, CSS stringify çıktısında `</style>` kaçırma XSS, **CVSS 6.1**. *(kaynak: dış.)*
- **Projenin kendi postcss'i temiz:** root `8.5.15` · tailwind/vite `8.5.16` — hepsi `≥8.5.10`. Yalnız Next'in bundle'ı eski.
- **Belirleyici:** `next@15.3.0` → `15.5.20` **her** patch, hatta `next@16.2.10` (son major) bile `dependencies.postcss: 8.4.31`'i **sabit pinliyor** → aralık-içi `npm update` de, major upgrade de audit'i çözmez. npm'in tek `fixAvailable`'ı `next@9.3.3` (`isSemVerMajor` — Next 15→9 katastrofik downgrade).

**Sömürülebilirlik (bu proje):** yok. Next'in gömülü postcss'i **build-zamanı** CSS pipeline'ında çalışır; tüm CSS geliştirici-yazımı (globals.css + Tailwind), site statik üretilir, sunulan `<style>`'a giden güvenilmez girdi yolu yok → tedarik-zinciri hijyen bayrağı, canlı risk değil.

### Değerlendirilen Yaklaşımlar (TB-D2)
- **Kabul + DECISIONS kaydı** — dokunulmaz dosyalara dokunmadan borcu upstream-bekleyen/sömürülemez olarak kaydet. *Artı:* Dokunulmazlar + ILKELER kalıcılık ile hizalı, regresyon riski yok, sömürülemez açık için orantılı. *Eksi:* audit sayacı 2 moderate'te kalır (kozmetik).
- **package.json `overrides`** — postcss'i `≥8.5.10`'a zorla, audit susar. *Artı:* sayaç sıfırlanır. *Eksi:* `package.json`+`package-lock.json` (Dokunulmaz, onay-gerektiren) değişir; Next'in bilinçli pin'ini ezer (regresyon riski); tam build+Vitest+a11y regresyon koşusu gerekir; sömürülemez açık için orantısız.
- **Seçilen:** **Kabul + kayıt** (kullanıcı onayı, 2026-07-16). Gerekçe → `docs/DECISIONS.md` 2026-07-16 (Faz 16, TB-D2).

### Kullanılacak Araçlar/Kütüphaneler
- **Yeni bağımlılık yok.** TB-D1 saf dosya silme; TB-D2 rapor+kayıt (kod/paket değişmez).
- `next@15.5.19` (kurulu; `^15.3.0`) korunur — güncelleme audit'i çözmediğinden değişiklik gerekçesi yok (Dokunulmazlar: `package.json`/`package-lock.json`).

### Dikkat Edilecekler
- **gym PNG silmeden önce son bir grep** (kaynak + `_dev/` + config) — silme anında yeni tüketici doğmadığını doğrula (araştırma anı teyitli ama plan/icra arası değişebilir). *(kaynak: `public/gym/*.png`.)*
- **M2 modül dokümanı drift (stale):** `_dev/modules/M2-Sayfalar-Bolumler.md:123` F2.8 "Açıklama"sı hâlâ eski yapıyı anlatıyor (`components/gym/GymSoftwareShowcase.tsx` + 8-özellik grid + `next/image` + `public/gym/*.png`) — v0.4 Alpfit Plus port sonrası gerçekle çelişiyor (satır 133 v0.4 notu var ama base açıklama eski). TB-D1 PNG silinince bu satır güncellenmeli (yoksa doküman "silinen asset'i kullanılıyor" gösterir). *(kaynak: repoda-tanımlı — `_dev/modules/M2-Sayfalar-Bolumler.md:123`.)*
- **TB-D2'de `npm audit fix --force` ASLA** — Next'i 9.3.3'e downgrade eder (build yıkılır). Düz `npm audit fix` de bir şey yapmaz (fix yalnız semver-major).
- **Regresyon güvencesi:** TB-D1 PNG silme runtime'ı etkilemez (0 tüketici); TB-D2 kod/paket değiştirmez. Yine de faz-sonu `next build` temiz + Vitest + a11y tohumları koşulur (guardrail: a11y=100 çift-tema · CLS≈0 · i18n 5-dil parite — Faz 15'te mühürlü).

### Teknik Kararlar
- **TB-D1:** 4 orphan PNG silinir (grep 0 tüketici); M2:123 stale açıklama TB-D1 ile birlikte güncellenir. *Gerekçe:* mekanik disk hijyeni + doküman gerçeklik-senkronu; kalıcılık ilkesi.
- **TB-D2:** kabul + DECISIONS kaydı; `overrides`/downgrade yok. *Gerekçe:* sömürülemez (build-zamanı, geliştirici-CSS, statik), güvenli fix yok, Dokunulmazlar + ILKELER kalıcılık. Yeniden-değerlendirme: Next bundle postcss bump edince versiyon-sınırında. Detay → `docs/DECISIONS.md` 2026-07-16.

---

## Task Listesi

> `/devflow:plan-phase 16` oturumunda dolduruldu (2026-07-16). Bu faz **tek mekanik task** gerektiriyor (TB-D1); TB-D2 ve REL task değil (aşağıdaki notlar).

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 16.01 | TASK-16.01 | ✅ Tamamlandı | TB-D1 — gym PNG disk hijyeni (`public/gym/*.png` 4 orphan silindi, ~1.7MB, 0 tüketici) + M2:123 stale açıklama v0.4 senkronu |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

**Not (TB-D2 — task değil, kayıtla kapanır):** npm audit / bağımlılık denetimi research-phase 16'da tamamlandı — deliverable = audit raporu + karar kaydı (`docs/DECISIONS.md` 2026-07-16, kabul + kayıt; `overrides`/downgrade yok, kod/paket değişmez). Kalan icra işi yok → review-phase 16'da doğrulanıp ✅ kapanır (kod task'ı açılmadı).

**Not (REL — faz-dışı operasyonel aksiyon, kayıt):** v0.4 TR production release bu oturumda yapıldı (task değil — operasyonel) → `docs/RELEASE-v0.4.md`. Canlı = `f173234`.

---

## UAT Sonuçları

**Tarih:** 2026-07-17
**Toplam Senaryo:** 11 | **Geçen:** 11 | **Kalan:** 0
**Test Modu:** Otonom (kullanıcı seçimi)

> **Otomatik kontroller (Adım 1):** CI `d876054` ✅ success (fast[build+vitest] + a11y[playwright+axe] iki job yeşil) · `npm audit` 2 moderate = `docs/DECISIONS.md` 2026-07-16 birebir (Dependabot config/açık PR yok) · security-review 0 bulgu (faz diff = 4 silinen binary PNG + `_dev/` markdown; kod yüzeyi yok). Düzeltme gerektiren bulgu yok.

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | TB-D1 silme teyidi — `public/gym/` + 4 PNG diskte yok, git 4× deleted, silme sonrası kaynak/config 0 tüketici | ✅ Geçti | `git show d876054` 4× `Bin→0 bytes`; `public/gym` disk'te yok; silme-sonrası grep kaynak/config 0 eşleşme |
| 2 | TB-D1 sayfa sağlığı — `/spor-salonu-yazilimi` PNG silme sonrası sorunsuz prerender (`components/alpfit/*`, kırık görsel yok) | ✅ Geçti | alpfit/ 6 bileşen + PhoneMockups.module.css; 0 gym/png/next-image atfı; build 5 locale prerender (9.02 kB) |
| 3 | TB-D1 SEO çıktısı — sitemap/robots silinen PNG'ye başvurmuyor (5 locale × 6 path intact) | ✅ Geçti | `sitemap.ts`/`robots.ts` PNG/gym/image referansı yok (path-tabanlı) |
| 4 | TB-D1 adversarial — silinen PNG'ye doğrudan URL → 404 (asset gerçekten gitti) | ✅ Geçti | Repo/branch/build'de absent (git rm + `public/gym` yok + build temiz). **Canlıda hâlâ 200** çünkü `d876054` `revize/v0.4-versiyon-sonu`'da, `main`'e unmerged — branch stratejisi gereği beklenen; merge sonrası 404. Regresyon değil |
| 5 | TB-D2 audit ↔ kayıt — `npm audit` = 2 moderate, GHSA-qx2v-qp2m-jg93, DECISIONS 2026-07-16 ile birebir | ✅ Geçti | 2 moderate, postcss nested-in-next; kararla birebir; `overrides`/downgrade yapılmadı |
| 6 | TB-D2 Dokunulmazlık — `overrides`/downgrade yok; `package.json`/`package-lock.json` faz boyunca değişmedi | ✅ Geçti | `package.json`'da `overrides` yok; `git diff 739531c~1..HEAD -- package.json package-lock.json` = 0 değişiklik |
| 7 | REL canlı duman — `main`=`f173234`; kiwiailab.com TR ana sayfa + `/spor-salonu-yazilimi` v0.4 içeriği 200 | ✅ Geçti | `main`=`f173234`; canlı TR home 200 + `/spor-salonu-yazilimi` 200 + "Alpfit Plus — Kulüp İşletme Yazılımı" v0.4 marker var |
| 8 | Guardrail build — `next build` temiz, 0 MISSING_MESSAGE | ✅ Geçti | Compiled successfully; 37/37 static page; 0 MISSING_MESSAGE; 0 error |
| 9 | Guardrail test/i18n/a11y — Vitest 39/39 (5-dil parite, eksik anahtar yok) + CI a11y `/` light+dark 0 ihlal | ✅ Geçti | Vitest 5 dosya / 39 test yeşil; CI a11y job success (axe `/` light+dark) — non-TR stale kabul, eksik anahtar yok |
| 10 | Doküman gerçeklik-senkron — M2:123 F2.8 gerçek v0.4 yapısını anlatıyor; silinen asset atfı kalmadı | ✅ Geçti | Hedef satır 123 (base Açıklama) `components/alpfit/*` + saf CSS/SVG; silinen-asset atfı yok. **Not:** aynı bloğun satır 126/127 eski Kabul Kriterleri hâlâ `next/image`/AVIF-WebP + `useLocale() TR/EN` diyor (v0.4'te geçersiz) — TASK-16.01 bilinçle scope-dışı bıraktı (satır 133 redirect overlay); minor artık-drift → review-phase/audit-docs |
| 11 | Chatbot açık takip (degradasyon) — `/api/chat` key yokken zarif offline (kod regresyonu değil, env — beklenen) | ✅ Geçti | Route: key yok → `503 "ANTHROPIC_API_KEY is not configured."`; canlı POST → 503 teyit. Env eksikliği (kullanıcı aksiyonu), kod regresyonu değil |

### UAT Notları — Faz Sonrası Açık Takipler (regresyon/bug değil)

- **`revize/v0.4-versiyon-sonu` → `main` merge bekliyor:** TB-D1 gym PNG silme repo/branch'te tamam ama canlıya (main) unmerged. Silme canlıya versiyon-sonu akışının merge adımında yansıyacak (senaryo testi + prd-review sonrası). Canlıdaki orphan PNG'ler 0 tüketici → SEO/işlev etkisi yok (yalnız disk/repo hijyeni, merge'de düşer).
- **Chatbot `ANTHROPIC_API_KEY` canlı env'de yok:** `/api/chat` 503 → chatbot "offline". Kullanıcı aksiyonu (Vercel dashboard env); kod işi değil, kapsam dışı (discuss-phase 16). Env eklenince açılır.
- **M2:123 bloğu satır 126/127 artık-drift:** minor; TASK-16.01 scope'u (satır 123) dışıydı, satır 133 v0.4 redirect'i overlay ediyor. Fix zorunlu değil — `review-phase 16` veya `audit-docs`'a taşındı.

---

## Retrospektif

> `/devflow:review-phase 16` oturumunda dolduruldu (2026-07-17).

### Ne İyi Gitti?
- **Versiyon-sonu teknik borç disiplini temiz işledi.** Faz 15'ten bilinçle devredilen gym PNG hijyeni (TB-D1) tek mekanik task'la kapandı; npm audit (TB-D2) `overrides`/downgrade zorlaması yerine **orantılı kabul+kayıt** ile ele alındı (sömürülemez build-zamanı açık için Dokunulmazlar + kalıcılık ilkesiyle hizalı).
- **Task/non-task ayrımı doğru kuruldu.** Yalnız TB-D1 kod task'ı oldu; TB-D2 (research'te kayıtla kapandı) ve REL (operasyonel release) bilinçle task açılmadı → gereksiz task şişmesi olmadı, her kalemin evi doğru (TB-D2→DECISIONS, REL→RELEASE-v0.4).
- **TR production release güvenle öne çekildi.** Normal sıra (teknik borç → senaryo testi → prd-review → release) yerine App Store aciliyetiyle release **şimdi** yapıldı; kalite riski düşük çünkü Faz 15 tam doğrulandı (UAT 16/16, a11y=100, CI yeşil) — "test-what's-live" modeli (v0.2 emsali).
- **Otomatik güvence katmanı insan-UAT'ından önce tarandı.** CI `d876054` success (fast+a11y iki job) + security-review 0 bulgu + npm audit=kayıt birebir + Vitest 39/39 + build 37/37 → UAT bu zemine oturdu (11/11).
- **Silme + doküman-senkron aynı task'te bağlandı (16.01).** Asset silinip doküman güncellenmeseydi "silinen asset kullanılıyor" driftı doğardı; bağlama bunu önledi.

### Ne Kötü Gitti?
- **M2 F2.8 modül-doküman bloğu Faz 15'te tam senkronlanmamıştı.** Gym→Alpfit değişimi Faz 15'te yapıldı ama modül dokümanının F2.8 bloğu yalnız v0.4 overlay-notuyla (satır 133) güncellendi; base "Açıklama" (123) + Kabul Kriterleri/Bağımlılık/Edge (126–132) stale kaldı. research-phase 16 base açıklamayı yakaladı (16.01 kapattı) ama kardeş satırlar 16.01 scope'u dışında bırakıldı → bu review'a doküman-borcu olarak taşındı (burada kapatıldı). **Ders:** bir bileşen/sayfa yeniden tasarlanınca modül dokümanının **tüm** F-bloğu (açıklama + kabul kriterleri + bağımlılık + edge) birlikte gerçeklik-senkronlanmalı, yalnız değişim-notu eklenmemeli — audit-docs bunu sistematik tarar.
- **Release sırası standart versiyon-sonu akışından saptı.** Release normalde senaryo testi + prd-review'dan **sonra** yapılır; bu fazda aciliyetle önce yapıldı. Bilinçli ve kabul edilebilir (v0.2 emsali, kayıtlı) ama sonuç: senaryo testi + prd-review artık **canlıdaki** kodu doğrulayacak (sıra ters çevrildi).

### Sonraki Faz İçin Öneriler
- **Versiyon Sonu Durumu `teknik_borç` → `senaryo_testi`** damgalandı (bu review). Sıradaki adım **`/devflow:discuss-phase 17`** (v0.4 versiyon-sonu senaryo testi fazı).
- **Senaryo testi artık canlı v0.4'ü doğrular (test-what's-live literal).** TR production'da (`f173234`) → senaryo testi Alpfit Plus deltasını canlıda/branch'te uçtan-uca doğrulayabilir; branch→main merge o akışın parçası (gym PNG silme merge'de canlıya yansır).
- **Sahipli kalemler (senaryo testi + prd-review adayları):**
  - **non-TR (en/ar/de/es) `alpfit` namespace = TR stale-kopya** (133 leaf × 5 dil yapısal tam, değer Türkçe) → v0.4 çeviri geçişi / dil stratejisi prd-review'da öne çıkmalı.
  - **`revize/v0.4-versiyon-sonu` → `main` merge bekliyor** → TB-D1 gym PNG silme canlıya merge'de yansır; canlıda hâlâ 200 ama 0 tüketici (etkisiz).
  - **Devralınan: canlı `ANTHROPIC_API_KEY` env yok** (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu, Vercel dashboard — regresyon değil).

### Task-Spesifik Teknik Öğrenimler
<!-- Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar. -->
- **npm audit bulgusu (Next'e gömülü `postcss@8.4.31`) sürüm-güncellemesiyle çözülemez:** `next@15.3.0`→`15.5.20` her patch, hatta `next@16.2.10` bile `dependencies.postcss: 8.4.31`'i sabit pinliyor → aralık-içi `npm update` de major upgrade de audit'i temizlemez; npm'in tek `fixAvailable`'ı `next@9.3.3` (katastrofik downgrade). Kalıcı çözüm upstream (Next bundle postcss'i `≥8.5.10`'a bumpladığında). Detay → `docs/DECISIONS.md` 2026-07-16.
- **`git rm <dosya>` dizini otomatik boşaltıp kaldırır** — 4 PNG `git rm`'lenince `public/gym/` dizini ayrı `rmdir` gerektirmeden kalktı.

## Kalite Kontrol Sonuçları

> `/devflow:review-phase 16` oturumunda dolduruldu (2026-07-17). Bu faz **yeni UI/craft yüzeyi üretmedi** (asset silme + doküman senkron + audit kaydı + operasyonel release) — eksenler "regresyonsuz / yeni-yüzey yok" perspektifinden kontrol edildi; Faz 15'te mühürlü guardrail'ler korundu.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ | Görsel/craft yüzeyine dokunulmadı — Faz 15 craft (SOTD-kalibre) mühürlü kaldı; orphan asset silme yüzeyi küçültür, imza/görsel değişmez. |
| Erişilebilirlik | ✅ | DOM/markup değişmedi; CI a11y `/` light+dark 0 ihlal (job success); Faz 15 a11y=100 çift-tema (structural dahil) korundu. Yeni a11y yüzeyi yok. |
| Performans | ✅ | 0 tüketici → runtime etkilenmedi; ~1.7MB disk yükü kalktı; `next build` 37/37 temiz; CLS/perf tabanı (Faz 15) regresyonsuz. |
| Yerelleştirme & RTL | ✅ | Vitest 39/39 (5-dil parite, eksik anahtar=fail) + 0 MISSING_MESSAGE; non-TR stale-TR **bilinçli versiyon-sınırı** (TR tek kaynak, DECISIONS 2026-06-27) — eksik anahtar değil. |
| Modülerlik & Bakım | ✅ | Orphan asset temizliği = bakım yükü azalması; M2:123 base açıklama gerçeklik-senkron (16.01) + 126/127 Kabul Kriterleri/Bağımlılık/Edge review'da senkronlandı (drift kapandı). |
| Hata Yönetimi & Degradasyon | ✅ | Chatbot `/api/chat` key yokken zarif 503 "offline" teyit (canlı POST); env eksikliği kullanıcı aksiyonu, kod regresyonu değil. Statik sayfa → yeni failure yüzeyi yok. |
| Güvenlik | ✅ | security-review **0 bulgu** (faz diff = 4 silinen binary PNG + `_dev/` markdown; kod yüzeyi yok); npm audit 2 moderate = sömürülemez build-zamanı postcss (statik site, güvenilmez girdi yolu yok), DECISIONS 2026-07-16 kayıtlı. |
| Test Kapsamı | ✅ | Yeni davranış yok → yeni test gerekmedi (kümülatif ilke korunur); mevcut tohumlar (i18n parite Vitest 39/39 + `/` a11y regresyon CI) yeşil, silme+audit'i regresyonsuz kapsadı. |

**Kullanıcı yolculuğu / boşluk:** Bu faz kullanıcı-görünür yüzey üretmedi; canlı v0.4 akışı Faz 15'te doğrulanmıştı (Alpfit Plus sayfası tutarlı). Sahipsiz boşluk yok — açık takiplerin hepsi kayıtlı ve sahipli (branch→main merge · chatbot env · non-TR çeviri). Silinen PNG'ler 0 tüketici → kullanıcıya görünmez; merge sonrası doğrudan-URL 404 olur (beklenen, SEO/işlev etkisi yok).

## Sonuç

- **Tamamlanma Tarihi:** 2026-07-17
- **Toplam Task:** 1 (TASK-16.01) ✅ — düzeltme task'ı gerekmedi
- **Notlar:** v0.4 versiyon-sonu teknik borç kapatıldı — **UAT 11/11 GEÇTİ, kapsam-içi bug 0, düzeltme task'ı 0.** TB-D1 (gym PNG hijyeni): 4 orphan `public/gym/*.png` (~1.7MB, 0 tüketici) `git rm` + dizin kalktı + M2:123 gerçeklik-senkron. TB-D2 (npm audit): 2 moderate = Next'e gömülü `postcss@8.4.31`, sömürülemez (build-zamanı, geliştirici-CSS, statik) → kabul+kayıt (`overrides`/downgrade yok, `package.json`/`package-lock.json` faz boyunca 0 değişiklik). REL: **v0.4 TR production release** operasyonel — canlı `f173234` (`docs/RELEASE-v0.4.md`). Guardrail'ler (a11y=100 çift-tema · perf tabanı · CLS≈0 · i18n 5-dil parite) regresyonsuz; kalite 8 eksen ✅. Review'da M2:126/127 minor gerçeklik-drift'i doküman-hijyeni olarak kapatıldı. **Sahipli kalemler senaryo testi + prd-review'a:** non-TR stale çeviri · branch→main merge · canlı `ANTHROPIC_API_KEY` env. Versiyon Sonu Durumu `teknik_borç` → `senaryo_testi`; sıradaki adım **`/devflow:discuss-phase 17`** (versiyon-sonu senaryo testi fazı).

---

**Oluşturulma:** 2026-07-16 (discuss-phase 16)
**Son Güncelleme:** 2026-07-17 — **review-phase 16 ✅: FAZ TAMAMLANDI.** Retrospektif + kalite kontrol (8 eksen ✅) + sonuç yazıldı. UAT 11/11 GEÇTİ, kapsam-içi bug 0, düzeltme task'ı 0. TB-D1 (gym PNG hijyeni) ✅ + TB-D2 (npm audit kabul+kayıt) ✅ + REL (v0.4 TR canlı `f173234`) ✅. Review'da M2:126/127 minor gerçeklik-drift'i doküman-hijyeni olarak kapatıldı (Kabul Kriterleri/Bağımlılık/Edge → v0.4 saf CSS/SVG gerçeğine senkron). Boyut kontrolü (Adım 5b): ~4.9k token `token-rahat` → bölme gerekmedi. Guardrail'ler (a11y=100 çift-tema · perf tabanı · CLS≈0 · i18n parite) regresyonsuz. Versiyon Sonu Durumu `teknik_borç` → `senaryo_testi`; sahipli kalemler (non-TR stale · branch→main merge · canlı env) senaryo testi + prd-review'a. Sıradaki adım **`/devflow:discuss-phase 17`** (versiyon-sonu senaryo testi fazı).
