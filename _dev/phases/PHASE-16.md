# Phase 16: v0.4 versiyon-sonu teknik borç kapatma (+ TR production release)

**Durum:** 🔄 Devam ediyor

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
| 16.01 | TASK-16.01 | ⬜ Bekliyor | TB-D1 — gym PNG disk hijyeni (`public/gym/*.png` 4 orphan sil, ~1.7MB, 0 tüketici) + M2:123 stale açıklama v0.4 senkronu |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

**Not (TB-D2 — task değil, kayıtla kapanır):** npm audit / bağımlılık denetimi research-phase 16'da tamamlandı — deliverable = audit raporu + karar kaydı (`docs/DECISIONS.md` 2026-07-16, kabul + kayıt; `overrides`/downgrade yok, kod/paket değişmez). Kalan icra işi yok → review-phase 16'da doğrulanıp ✅ kapanır (kod task'ı açılmadı).

**Not (REL — faz-dışı operasyonel aksiyon, kayıt):** v0.4 TR production release bu oturumda yapıldı (task değil — operasyonel) → `docs/RELEASE-v0.4.md`. Canlı = `f173234`.

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 16` oturumunda doldurulur.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 16` oturumunda doldurulur.

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 16` oturumunda doldurulur.

---

## Sonuç

> Bu bölüm `/devflow:review-phase 16` oturumunda doldurulur.

---

**Oluşturulma:** 2026-07-16 (discuss-phase 16)
**Son Güncelleme:** 2026-07-17 — verify-plan 16: TASK-16.01 temiz context ile doğrulandı (referans gerçeklik-kontrolü temiz; mekanik düzeltme yok; 1 yapısal düzeltme uygulandı — alt görev 3 Alpfit bileşen envanteri gerçekle hizalandı, `AlpfitShowcase`=orchestrator + 5 bölüm bileşeni). Task tablosu değişmedi. TB-D2 (npm audit) task değil (research'te tamamlandı; review-phase'de ✅ kapanır). Adım = task.
