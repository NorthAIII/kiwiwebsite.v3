# TASK-19.01: Dal aç + TB-G1 force'suz `npm audit fix` + yerel regresyon kapıları

**Durum:** ✅ Tamamlandı
**Modül:** M6-SEO-Deploy (modules/M6-SEO-Deploy.md)
**Feature:** TB-G1 — Bağımlılık güvenlik yaması
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** Yok (Faz 19'un ilk task'ı)

---

## Hedef

Faz 19'un kod dalını `main` HEAD'den aç (`revize/v0.5-teknik-borc`). Ardından `npm audit fix`'i **force'suz** koştur: `next` 15.5.19 → 15.5.27 ve öteki aralık-içi yan yükseltmeler yalnız `package-lock.json`'ı değiştirir. Task şu koşullarda biter: `npm audit` **kritik 0** gösteriyor, kalan yalnız gerekçeli 2 high var (`next`'in gömülü `postcss@8.4.31`'i + via `next`), `package.json` aynı kalmış, yerel regresyon kapıları (build, First Load JS farkı, Vitest, Playwright/axe, yerel duman testi) temiz.

---

## Bağlam

Kapsam kararı: TB-G1 en ucuz, bağımsız ve kritik açığı kapatan iştir, o yüzden önce gelir. Kullanıcı `package-lock.json` değişikliğini Dokunulmazlar kapsamında onayladı, ama lock diff'i bu task'ta yine gösterilir.

Research beklentiyi registry metadata'sı ve npm bulk advisory API'siyle hesapladı; gerçek koşuya o oturumda izin verilmedi. Beklenen son durum **kritik 0 · high 2 · moderate 0**. Bu task beklentiyi gerçek koşuyla teyit eder.

`overrides` ve Next 16 elendi (DECISIONS 2026-10-02 — npm audit kararı).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-19.md` → Araştırma Bulguları (TB-G1: Değerlendirilen Yaklaşımlar, Kullanılacak Araçlar, Dikkat Edilecekler)
- `_dev/docs/DECISIONS.md` → 2026-10-02 "npm audit (v0.5 sonu)" kararı
- `_dev/docs/TESTING.md` — komutlar ve CI katmanları
- `_dev/memory/yerel-prod-listening-pid-teyidi.md` — yerel duman testinden önce portu dinleyen process'i teyit et

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum
- `_dev/docs/DECISIONS.md` — **yalnız gerçek sonuç beklentiden saparsa** (kullanıcı kararıyla birlikte)

---

## Alt Görevler

- [x] **1. Dalı aç**
  - `git status` temiz olmalı. İlgisiz yerel değişiklikler (ör. `.devcontainer/`) varsa dokunma, commit'e alma, kullanıcıya not düş.
  - `main` HEAD'den `git checkout -b revize/v0.5-teknik-borc` → `git push -u origin revize/v0.5-teknik-borc`.
  - Faz 19'un sonraki tüm task'ları bu dalda koşar. Birleştirme TASK-19.07'dedir.

- [x] **2. Taban ölçümü (yamadan ÖNCE)**
  - `npm audit --json` → özet sayılar (beklenen: 9 açık — 1 kritik / 4 high / 4 moderate). Ham çıktıyı scratchpad'e kaydet.
  - `npm run build` → route tablosundaki **First Load JS** sütununu scratchpad'e kaydet (önce/sonra karşılaştırmasının tabanı).

- [x] **3. Yama**
  - `npm audit fix` (**`--force` YOK**).
  - `git diff --exit-code package.json` → değişiklik yok olmalı. Değiştiyse dur.
  - `git diff --stat` → yalnız `package-lock.json` değişmiş olmalı.
  - Lock diff'inden sürüm tablosu çıkar ve kullanıcıya göster. Beklenen: `next` 15.5.27 · `sharp` 0.35.5 · `postcss` (kök + vite) 8.5.28 · `vitest`/`@vitest/mocker` 4.1.11 · `undici` 7.30.0 · `nanoid` 3.3.19 · `@tailwindcss/postcss` 4.3.3 · `fflate` 0.6.11 (`three-stdlib` altında).
  - Lock'un kendi başına kurulabildiğini teyit et: `npm ci` (CI'ın kurulum yolu).

- [x] **4. Audit sonucunu teyit et**
  - `npm audit` → **kritik 0**. Kalan yalnız `postcss@8.4.31` (`node_modules/next/node_modules/postcss`) + via `next`, ikisi de high (GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849).
  - Başka bir paket ya da beklenmeyen bir severity görünürse **dur**, kullanıcıya getir (research'ün tahmini sapmış demektir).

- [x] **5. Regresyon kapıları**
  - `npm run build` temiz. First Load JS'i taban tablosuyla route route karşılaştır; tabloyu oturum kaydına yaz.
  - First Load JS **herhangi bir route'ta** değiştiyse ana sayfa Lighthouse'u koş (mobil + masaüstü, `docs/perf/README.md` metodolojisi; host yükünü `cat /proc/loadavg` ile gözle). Taban altına düşmemeli (ILKELER perf tabanı). Değişmediyse Lighthouse koşulmaz; gerekçesi kayda geçer.
  - `npm run test` (Vitest) → hepsi geçer (Faz 18 sonu: 86).
  - `npm run test:e2e` (Playwright/axe, `/` + alt sayfalar, light + dark) → 0 ihlal.
  - **Yerel duman testi** (`next start`; portu dinleyen PID'in senin process'in olduğunu teyit et):
    - 6 sayfa × 5 locale = 30 URL → 200: `/`, `/crew-os`, `/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5` (TR prefixsiz, öteki locale'ler `/en` `/ar` `/de` `/es` prefixli).
    - Redirect'ler 308 ve doğru hedef: `/forum`, `/en/forum`, `/forum/ai-sdr-araclari`, `/de/forum/ai-sdr-araclari`, `/bunker-os`, `/es/bunker-os`.
    - AR sayfasında `dir="rtl"`.
    - TR ölçümde `NEXT_LOCALE=tr` cookie'si gerekir (MEMORY: Accept-Language yönlendirmesi; curl tetiklemez).

---

## Etkilenen Dosyalar

```
package-lock.json      # aralık-içi yükseltmeler — zaten var
package.json           # DEĞİŞMEZ (kontrol: git diff --exit-code)
```

---

## Dikkat Noktaları

- **`--force` ve `overrides` kullanılmaz.** İkisi de kullanıcı kararıyla elendi (DECISIONS 2026-10-02). `package.json` Dokunulmaz.
- **`sharp` 0.34 → 0.35'in etki yüzeyi pratikte sıfır** (research). `next@15.5.27`'nin optional aralığı `^0.34.3 || ^0.35.4`. `sharp@0.35.5` `node >=20.9.0` istiyor: Vercel 24.x, CI 24, yerel 24.21. `src/`'de `next/image` ve statik görsel import'u yok. Ek çalışma-anı kontrolü gerekmez; `next build` + duman testi yeter.
- **Preview duman testi bu task'ta değil.** Kullanıcının TB-G1 regresyon çıtasındaki "preview'da tüm sayfa/locale/redirect" adımı, dal HEAD'inin preview'unda **birleştirme öncesi kapı** olarak TASK-19.07'de koşar. Gerekçe: preview ancak push'tan sonra doğar; bu task'ın kendi oturumunda gözlenemez (TASK şablonu → Test Kriterleri KURAL). Orada TB-G1 + TB-G2 birlikte, Vercel'in build ortamında sınanır.
- **İlgisiz yerel değişiklikler** (oturum başı: `.devcontainer/devcontainer.json` değişik, `.devcontainer/devcontainer-lock.json` izlenmiyor) bu task'ın commit'ine girmez.
- Lighthouse koşulursa: kanonik ölçüm DARK temadadır, TR için `NEXT_LOCALE=tr` cookie'si şart (MEMORY: a11y/perf ölçümünde tema tuzağı).

---

## Test Kriterleri

- [x] `npm audit` → kritik 0; kalan yalnız `postcss@8.4.31` + via `next` (2 high), başka paket yok. → **Sapma:** high 1 + moderate 1 (`next` via-etiketi moderate). Kullanıcı kabul etti → DECISIONS 2026-10-02 "npm audit gerçek sonucu".
- [x] `git diff --exit-code package.json` → çıkış 0; `git diff --stat` yalnız `package-lock.json`.
- [x] `npm ci` temiz kuruyor; `npm run build` temiz.
- [x] First Load JS önce/sonra tablosu kayıtlı. Fark varsa Lighthouse ana sayfa (mobil + masaüstü) taban altında değil.
- [x] `npm run test` → tüm Vitest testleri geçiyor.
- [x] `npm run test:e2e` → `/` + alt sayfalar light + dark axe WCAG AA 0 ihlal.
- [x] Yerel `next start`: 30 sayfa/locale URL'si 200, 6 redirect 308 + doğru hedef, AR `dir="rtl"`.

---

## Risk ve Geri Dönüş Planı

- **Risk:** Yama build'i ya da bir sayfayı kırar → kapılar yakalar. Commit'leme; nedeni kullanıcıya getir.
- **Risk:** Audit sonucu beklentiden sapar (fazladan bir high ya da kritik kalır) → dur. Yeni bir karar gerekir (DECISIONS'a kullanıcı kararıyla).
- **Rollback:** `git checkout -- package-lock.json && npm ci` → yamadan önceki duruma döner. Dal açık kalır.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (`revize/v0.5-teknik-borc` dalına; conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-10-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **1. Dal:** `revize/v0.5-teknik-borc` `main` HEAD'den (`523af58`) açıldı, `push -u` yapıldı. Ağaçtaki yabancı `.devcontainer/*` değişikliklerine dokunulmadı, commit'e alınmadı.
- **2. Taban:** `npm audit` 9 açık verdi (1 kritik / 4 high / 4 moderate), beklenen değerin aynısı. First Load JS önce/sonra iki ölçüyle kaydedildi: build tablosu (kB) ve `.next/app-build-manifest.json`'dan route başına gzip byte toplamı.
- **3. Yama:** force'suz `npm audit fix` koşuldu (5 paket kaldırıldı, 28 değişti).
  - `git diff --exit-code package.json` çıkış kodu 0. Yabancı dosyalar hariç diff yalnız `package-lock.json` (+433/−339).
  - `npm ci` çıkış kodu 0 ve lock'u değiştirmedi (`cmp`).
- **4. Audit:** kritik 0 · high 1 · moderate 1 → beklentiden sapma. Task durdu, kullanıcı kabul etti → DECISIONS 2026-10-02 "npm audit gerçek sonucu".
- **5. Regresyon kapıları:** hepsi yeşil (→ Test Sonuçları).

**Lock sürüm tablosu (beklenenle karşılaştırma):**

| Paket | Önce | Sonra | Beklenen |
|---|---|---|---|
| `next` (+ `@next/env`, `@next/swc-*`) | 15.5.19 | 15.5.27 | ✓ |
| `sharp` (+ `@img/sharp-*`; libvips 1.2.4 → 1.3.4) | 0.34.5 | 0.35.5 | ✓ |
| `postcss` (kök) | 8.5.15 | 8.5.28 | ✓ |
| `vite/node_modules/postcss` | 8.5.16 | **silindi** (vite kök 8.5.28'i kullanır, `require.resolve` ile kontrol edildi) | beklenti "8.5.28" — etkisi aynı |
| `vitest` / `@vitest/mocker` (+ `@vitest/*`) | 4.1.9 | 4.1.11 | ✓ |
| `undici` | 7.28.0 | 7.30.0 | ✓ |
| `nanoid` | 3.3.12 | 3.3.19 | ✓ |
| `@tailwindcss/postcss` (+ `tailwindcss`, `@tailwindcss/node`, `oxide*`) | 4.3.1 | 4.3.3 | ✓ (`tailwindcss` listede yoktu) |
| `three-stdlib/node_modules/fflate` | 0.6.10 | 0.6.11 | ✓ |
| Listede olmayan aralık-içi yan yükseltmeler | — | `chai` 6.3.0 · `enhanced-resolve` 5.26.0 · `tinyrainbow` 3.2.0 · `semver` 7.8.5 · `@jridgewell/sourcemap-codec` 1.6.0 · yeni optional `@img/sharp-freebsd-wasm32`, `@img/sharp-webcontainers-wasm32`, `@emnapi/runtime` | — |

**First Load JS (önce → sonra):**

| Route | Tablo (kB) | gzip byte (manifest toplamı) |
|---|---|---|
| `/[locale]` | 182 → 182 | 182201 → 182474 (+273) |
| `/[locale]/crew-os` | 179 → 179 | 179076 → 179349 (+273) |
| `/[locale]/spor-salonu-yazilimi` | 183 → 183 | 183369 → 183642 (+273) |
| `/[locale]/vaka-calismalari` | 178 → 178 | 178094 → 178367 (+273) |
| `/[locale]/bulten/ai-sdr-araclari` | 178 → 178 | 178512 → 178785 (+273) |
| `/[locale]/bulten/claude-opus-4-8-fable-5` | 178 → 178 | 177991 → 178264 (+273) |
| `/_not-found`, `/api/chat`, `/robots.txt`, `/sitemap.xml` | 103 → 103 | 102913–103091 → +273 |
| Paylaşılan `chunk 255` | 46.2 → 46.5 kB | farkın tek kaynağı (Next framework runtime'ı) |

**Sorunlar:**
- **Audit sapması:** `next` (via `postcss`) high değil moderate çıktı. Durup kullanıcıya getirildi, kabul edildi (→ Kararlar).
- **Repo Playwright config'i bu host'ta olduğu gibi koşamadı:** config `:3000`'e sabit ve yerelde `reuseExistingServer` açık. `:3000`'de sahibi okunamayan yabancı bir dinleyici var, yani suite yabancı sunucuyu ölçerdi. Ayrıca bundled `chromium_headless_shell-1228` kurulu değil (ilk deneme 52/52 browser-launch hatası verdi; test hatası değil). Çözüm: scratchpad'de override config yazıldı (aynı testDir/testMatch/retries 0, `Desktop Chrome` descriptor + `channel:"chrome"` = system Chrome 153, baseURL/sunucu `:3217`, `reuseExistingServer`). Repo dosyasına dokunulmadı.

**Kararlar:**
- **Audit gerçek sonucunun kabulü** (kullanıcı kararı). docs/DECISIONS.md'ye eklendi: Evet (2026-10-02 "npm audit gerçek sonucu").
- **Lighthouse koşuldu.** Build tablosu kB düzeyinde aynıydı, ama byte düzeyi ve paylaşılan chunk değişti. "Herhangi bir route'ta değiştiyse" kuralı muhafazakâr okundu.
- **Lighthouse kıyası aynı ortamda yapıldı.** Yama öncesi ağaç `git archive 523af58` ile scratchpad'e çıkarıldı, orada `npm ci` + build yapıldı, `:3218`'de sunuldu. Ortamlar arası perf skoru kıyaslanamaz (`docs/perf/README.md`). Koşular önce/sonra sırasıyla iç içe dizildi.

**Son Yaklaşım:** Task tamamlandı; devam gerektiren yarım iş yok.

**Sonraki Adım Detayı:** Sıradaki iş TASK-19.02 (origin modülü). Aynı dalda koşar.

**Dosya Değişiklikleri:**
- `package-lock.json` → aralık-içi yükseltmeler (yukarıdaki tablo). `package.json` değişmedi.

**Test Sonuçları:**
- `npm audit --json` (`npm ci` sonrası, tüm ağaç):
  - kritik 0 · high 1 (`node_modules/next/node_modules/postcss` 8.4.31: GHSA-6g55, GHSA-r28c high + GHSA-qx2v, GHSA-fxqj moderate) · moderate 1 (`next`, via `postcss`).
  - Fix yalnız `next@16.3.8` (major).
- `npm run build` (yerel, Next 15.5.27): çıkış kodu 0.
- **Lighthouse 13.3.0**, aynı ortamda önce (15.5.19) ve sonra (15.5.27):
  - Koşul: TR `/` (`NEXT_LOCALE=tr`, `finalUrl` `/` doğrulandı), Chrome 153, `--headless=new --enable-unsafe-swiftshader`, 3 koşu medyanı, `loadavg` ≤ 4.12 (32 çekirdek).
  - **Masaüstü:** perf 100 → 100 · LCP 697 → 695 ms · CLS 0 → 0 · TBT 0 → 0.
  - **Mobil:** perf 89 → 91 · LCP 3304 → 3005 ms · CLS 0 → 0 · TBT 201 → 177.
  - a11y 12/12 koşuda 100, `runtimeError` yok.
  - Kanonik tabanla karşılaştırma (ortamlar arası, bilgi amaçlı): mobil LCP ≈ Faz 14 ~3010 ms; masaüstü 100 / LCP ≈ v0.1 689 ms. **Regresyon yok** (aynı ortam önce/sonra).
- `npm run test` (Vitest 4.1.11): 7 dosya / **86/86** geçti.
- **Playwright + axe** (repo spec'leri, scratchpad override config, system Chrome, yerel `:3217`): **52/52** geçti. Kapsam: `/` light+dark + 5 alt sayfa × 5 locale × light/dark, WCAG AA 0 ihlal. Kanal notu: CI'daki bundled chromium bu koşuda kullanılmadı; CI `a11y` job'u o kanalı ayrıca koşar.
- **Yerel duman testi** (`next start -p 3217`; dinleyen PID 1810873 = başlatılan süreç, `ss -ltnp` ile doğrulandı):
  - 30/30 URL 200 (6 sayfa × 5 locale; TR'de `NEXT_LOCALE=tr` cookie'si).
  - AR 6/6 `dir="rtl"`, diğer locale'ler `ltr` ve doğru `lang`.
  - 6/6 redirect 308 ve doğru hedef: `/forum`→`/`, `/en/forum`→`/en`, `/forum/ai-sdr-araclari`→`/bulten/…`, `/de/forum/…`→`/de/bulten/…`, `/bunker-os`→`/crew-os`, `/es/bunker-os`→`/es/crew-os`.
- **CSS çıktı farkı** (`tailwindcss` 4.3.1 → 4.3.3; diğer 2 CSS dosyası byte-identical): 4 kural değişti, görünür etkisi yok.
  - preflight'taki varsayılan sans yedek listesi değişti, ama projede `--default-font-family: var(--font-sans)` tanımlı → devreye girmiyor.
  - `translate-x` değeri `0` → `0px` (eşdeğer).
  - `:-moz-focusring:where(:not(iframe))` (yalnız Firefox).
  - sürüm başlığı.
- **Servisler:** `:3217` (PID 1810873) ve `:3218` (PID 1840907) durdurmadan önce dolu ölçüldü; SIGTERM sonrası iki port da boş, iki PID de yok.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-10-02

**Ne Yapıldı:**
- Faz 19 dalı `revize/v0.5-teknik-borc` açıldı.
- Force'suz `npm audit fix` ile `next` 15.5.27 ve aralık-içi yan yükseltmeler yalnız lock'a girdi; `package.json` aynı kaldı. Audit 9 açıktan 2'ye indi: kritik 0 · high 1 · moderate 1, kullanıcı kabul etti.
- Yerel regresyon kapıları yeşil: build, First Load JS (+273 B gzip, framework chunk), Lighthouse aynı ortam önce/sonra, Vitest 86, axe 52, duman 30 + 6 + RTL.

**Öğrenilenler:**
- npm, via ile gelen severity'yi beklenenden düşük etiketleyebilir: bu koşuda `next`, high'lı bir `postcss` üzerinden moderate göründü. Research tahmini "via = en yüksek severity" varsayımına dayanıyordu.

---

**Oluşturulma:** 2026-10-02
