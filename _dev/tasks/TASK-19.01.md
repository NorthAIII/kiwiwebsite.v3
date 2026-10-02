# TASK-19.01: Dal aç + TB-G1 force'suz `npm audit fix` + yerel regresyon kapıları

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Dalı aç**
  - `git status` temiz olmalı. İlgisiz yerel değişiklikler (ör. `.devcontainer/`) varsa dokunma, commit'e alma, kullanıcıya not düş.
  - `main` HEAD'den `git checkout -b revize/v0.5-teknik-borc` → `git push -u origin revize/v0.5-teknik-borc`.
  - Faz 19'un sonraki tüm task'ları bu dalda koşar. Birleştirme TASK-19.07'dedir.

- [ ] **2. Taban ölçümü (yamadan ÖNCE)**
  - `npm audit --json` → özet sayılar (beklenen: 9 açık — 1 kritik / 4 high / 4 moderate). Ham çıktıyı scratchpad'e kaydet.
  - `npm run build` → route tablosundaki **First Load JS** sütununu scratchpad'e kaydet (önce/sonra karşılaştırmasının tabanı).

- [ ] **3. Yama**
  - `npm audit fix` (**`--force` YOK**).
  - `git diff --exit-code package.json` → değişiklik yok olmalı. Değiştiyse dur.
  - `git diff --stat` → yalnız `package-lock.json` değişmiş olmalı.
  - Lock diff'inden sürüm tablosu çıkar ve kullanıcıya göster. Beklenen: `next` 15.5.27 · `sharp` 0.35.5 · `postcss` (kök + vite) 8.5.28 · `vitest`/`@vitest/mocker` 4.1.11 · `undici` 7.30.0 · `nanoid` 3.3.19 · `@tailwindcss/postcss` 4.3.3 · `fflate` 0.6.11 (`three-stdlib` altında).
  - Lock'un kendi başına kurulabildiğini teyit et: `npm ci` (CI'ın kurulum yolu).

- [ ] **4. Audit sonucunu teyit et**
  - `npm audit` → **kritik 0**. Kalan yalnız `postcss@8.4.31` (`node_modules/next/node_modules/postcss`) + via `next`, ikisi de high (GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849).
  - Başka bir paket ya da beklenmeyen bir severity görünürse **dur**, kullanıcıya getir (research'ün tahmini sapmış demektir).

- [ ] **5. Regresyon kapıları**
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

- [ ] `npm audit` → kritik 0; kalan yalnız `postcss@8.4.31` + via `next` (2 high), başka paket yok.
- [ ] `git diff --exit-code package.json` → çıkış 0; `git diff --stat` yalnız `package-lock.json`.
- [ ] `npm ci` temiz kuruyor; `npm run build` temiz.
- [ ] First Load JS önce/sonra tablosu kayıtlı. Fark varsa Lighthouse ana sayfa (mobil + masaüstü) taban altında değil.
- [ ] `npm run test` → tüm Vitest testleri geçiyor.
- [ ] `npm run test:e2e` → `/` + alt sayfalar light + dark axe WCAG AA 0 ihlal.
- [ ] Yerel `next start`: 30 sayfa/locale URL'si 200, 6 redirect 308 + doğru hedef, AR `dir="rtl"`.

---

## Risk ve Geri Dönüş Planı

- **Risk:** Yama build'i ya da bir sayfayı kırar → kapılar yakalar. Commit'leme; nedeni kullanıcıya getir.
- **Risk:** Audit sonucu beklentiden sapar (fazladan bir high ya da kritik kalır) → dur. Yeni bir karar gerekir (DECISIONS'a kullanıcı kararıyla).
- **Rollback:** `git checkout -- package-lock.json && npm ci` → yamadan önceki duruma döner. Dal açık kalır.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`revize/v0.5-teknik-borc` dalına; conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(task çalıştırıldığında doldurulur)_

---

**Oluşturulma:** 2026-10-02
