# TASK-17.03: S8-suite + S6-parite — Guardrail Suite & i18n Parite (alpfit 133-leaf dahil)

**Durum:** ⬜ Bekliyor
**Modül:** Tümü (M1–M6; a11y/i18n/SEO guardrail) — birincil M4 parite + M6 SEO tohumları
**Feature:** S8 (v0.4 guardrail — suite tarafı: axe/CI/a11y=100 çift-tema) + S6-parite (yapısal i18n parite) senaryo grupları — doğrulama
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.02 ✅ (lineer sıra; build zaten var, çıktı bağımlılığı yok)

---

## Hedef

v0.4'ün **commit'li test suite'ini** koşarak guardrail'lerin regresyonsuz olduğunu re-teyit et: `npm run test` (**Vitest** — `i18n-parity` 5-dil parite eksik-anahtar=fail, **`alpfit` 133-leaf namespace 5-dil tam parite dahil** + `seo-metadata` + `seo-redirects` + `smoke` + `umami-script`) + `npm run test:e2e` (Playwright+axe, `home-a11y` + `subpages-a11y` = **5 sayfa × 5 dil × 2 tema = 50 test**, WCAG-AA 0 ihlal) + CI (`.github/workflows/ci.yml` `fast`+`a11y` job `success`). **Faz 17 kararı (araştırma):** a11y=100 çift-tema mührü **otoritatif olarak CI'ın axe `a11y` job'u** (`subpages-a11y` dual-theme 50 test) — a11y-DERİNLİK Faz 8/15'te yapıldı, ayrı Lighthouse koşusu **tekrarlanmaz**; **perf korunan taban** argument-from-unchanged + S3 CLS ile (aşağıda). Tamamlanma = suite yeşil koştu, CI durumu doğrulandı, perf korunan taban re-teyit mantığı kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S8-suite + S6-parite araç satırları (Vitest + `test:e2e`/CI + prerender grep) + Teknik Kararlar (**a11y mührü CI axe otoritatif; Lighthouse araç listesinde YOK**; perf korunan taban argument-from-unchanged)
- `_dev/docs/TESTING.md` — test komutları + 3 katman + a11y ölçüm disiplini
- `_dev/MEMORY.md` — iki-gate Süreç Disiplini (axe WCAG-AA ≠ Lighthouse a11y=100 — Faz 17'de çift-tema axe 50-test bunu regresyon için kapatır; yapısal-audit ön-kontrolü 17.02 `<main>` grep'i) + CI'yı `gh` olmadan REST ile okuma (public repo)
- `tests/{i18n-parity,seo-metadata,seo-redirects}.test.ts`, `tests/e2e/{home-a11y,subpages-a11y}.spec.ts`, `.github/workflows/ci.yml`

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.03 durumu + S8-suite/S6-parite bulgu notu

---

## Alt Görevler

- [ ] **1. Vitest suite (S6-parite + SEO tohum + smoke/umami)**
  - `npm run build` (seo-redirects `.next/routes-manifest.json` okur → build önce; 17.01'in build'i taze ise yeterli), sonra `npm run test` → tüm dosyalar yeşil
  - Kırılım teyidi (verbose): `i18n-parity` (5-dil eksik/fazla anahtar=fail = S6 yapısal; **`alpfit` 133-leaf × 5 dil tam parite dahil**), `seo-metadata`, `seo-redirects` (routes-manifest'e bağlı gerçekten koştu), `smoke`, `umami-script`
  - Sayı düşükse (build yok → seo-redirects atlandı) yanlış-yeşil olabilir → dosya bazında koştuğunu teyit et

- [ ] **2. E2E axe suite — a11y=100 çift-tema mührü (S8 axe gate)**
  - `npm run test:e2e` → `home-a11y` (`/` light+dark) + `subpages-a11y` (**5 sayfa × 5 dil × 2 tema = 50 test, Alpfit Plus dahil**) WCAG-AA (`wcag2a/2aa/21a/21aa`) 0 ihlal, `retries:0` (fail-on-regression, maskeleme yok)
  - Bu, Faz 17'nin **a11y=100 çift-tema re-teyidinin otoritatif mührü** (araştırma kararı: ayrı Lighthouse koşusu yok)
  - `reuseExistingServer`/stray `next-server` tuzağı: webServer :3000'de doğru (yeni) build oturmuş mu (listening-PID). **Not:** `test:e2e` webServer'ı `next start` koşar → sandbox'ta flaky olabilir; otoritatif mühür **CI `a11y` job** (adım 3), yerel koşu ek nokta-kontrolü

- [ ] **3. CI durumu — otoritatif a11y mührü (S8)**
  - HEAD commit'te `fast` + `a11y` job `conclusion=success` doğrula (sandbox'tan bağımsız GitHub runner — otoritatif)
  - `gh` yoksa: public repo → auth'suz REST (`api.github.com/repos/NorthAIII/kiwiwebsite.v3/actions/runs?head_sha=<sha>` → run id → `/jobs` `jq`)

- [ ] **4. Perf korunan taban re-teyit (argument-from-unchanged) + kayıt**
  - **v0.4 home/WebGL koduna dokunmadı** → masaüstü perf 100 / mobil LCP korunan taban Faz 14'ten **değişmeden mühürlü** (yeni ölçüm gerekmez; sandbox software-GL perf'i zaten env-anomali kıyaslanamaz). Alpfit saf CSS/SVG yeni yüzey → CLS≈0 **S3/17.04'te** 320/768/1440'ta ölçülür (perf korunan taban CLS bileşeni)
  - Suite + CI + perf mantığını task Oturum Kaydı + PHASE-17'ye yaz; suite kırmızıysa = regresyon → triyaj (kapsam-içi bug → düzeltme task'ı; CI a11y job otomatik korur)

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Referans tanımlayıcılar ZATEN-VAR (test scriptleri package.json'da, tohum dosyaları repoda-tanımlı, routes-manifest build çıktısı, ci.yml repoda). YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-17.03.md          # Oturum kaydı + suite/CI sonuçları
├── phases/PHASE-17.md           # Task Listesi 17.03 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **Faz 17 a11y mührü = CI axe, Lighthouse tekrarlanmaz (araştırma kararı).** İki-gate disiplini (axe WCAG-AA ≠ Lighthouse structural a11y) burada şöyle karşılanır: (a) `subpages-a11y` **çift-tema 50 test** regresyon güvencesi; (b) yapısal-audit ön-kontrolü (`<main>` varlığı) 17.02 prerender grep'inde deterministik. a11y=100 **derinlik** Faz 8/15'te mühürlü — bu faz yalnız regresyon re-teyit. "Suite yeşil = a11y bitti" varsayma; ama Faz 17'de ayrı Lighthouse koşusu **kapsam dışı** (perf software-GL env-anomali + a11y derinlik mühürlü).
- **`seo-redirects` build-bağımlı:** `.next/routes-manifest.json` okur → `npm test` öncesi `next build` şart (17.01 taze ürettiyse yeterli), yoksa tohum fail (kaynak yok, gerçek regresyon değil).
- **`alpfit` 133-leaf parite = S6 çekirdeği (v0.4 delta):** `i18n-parity` eksik anahtar=fail → `alpfit` namespace 5 dilde yapısal tam olmalı (non-TR değer stale kabul, **anahtar eksikliği asla**). Bu tohum v0.4'ün namespace paritesini mühürler.
- **`test:e2e` sandbox'ta flaky (`next start`):** otoritatif mühür CI `a11y` job; yerel koşu düşerse CI durumu yeterli (araştırma: a11y mührü CI otoritatif).

---

## Test Kriterleri

- [ ] `next build` temiz + `npm run test` → tüm Vitest dosyaları yeşil (i18n parite **`alpfit` 133-leaf dahil** + seo-metadata + seo-redirects + smoke + umami; eksik-anahtar=fail teyit)
- [ ] `npm run test:e2e` → `home-a11y` + `subpages-a11y` (5 sayfa × 5 dil × 2 tema = 50, **Alpfit dahil**) WCAG-AA 0 ihlal, `retries:0` — VEYA yerel flaky ise CI `a11y` job success yeterli
- [ ] CI `fast` + `a11y` job HEAD commit'te `conclusion=success` (REST veya `gh`)
- [ ] Perf korunan taban re-teyit mantığı (argument-from-unchanged + CLS→17.04) kaydedildi
- [ ] Kırmızı çıkarsa triyaj yapıldı; yeşilse regresyonsuz kaydedildi; PHASE-17 + task doc'a yazıldı

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [durum]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
