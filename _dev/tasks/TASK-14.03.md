# TASK-14.03: S8-suite + S6-parite — Guardrail Suite & i18n Parite Re-teyit

**Durum:** ⬜ Bekliyor
**Modül:** Tümü (M1–M6; a11y/i18n/SEO guardrail) — birincil M4 parite + M6 SEO tohumları
**Feature:** S8 (v0.3 guardrail — suite tarafı) + S6-parite (yapısal i18n parite) senaryo grupları — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.02 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

v0.3'ün **commit'li test suite'ini** koşarak guardrail'lerin regresyonsuz olduğunu re-teyit et: `npm run test` (**Vitest 39 tohum** — `i18n-parity` 5-dil parite eksik-anahtar=fail + **`seo-metadata` + `seo-redirects` YENİ Faz-13 katmanı** + smoke + umami-script) + `npm run test:e2e` (Playwright+axe, home + subpages WCAG-AA 0 ihlal, fail-on-regression) + CI (`.github/workflows/ci.yml` `fast`+`a11y` job `success`). Bu task iki gate'in **suite tarafını** kapatır (axe WCAG-AA + i18n parite + SEO tohum). Lighthouse a11y=100 skor gate'i ayrı → TASK-14.04. Tamamlanma = suite yeşil koştu, CI durumu doğrulandı, sonuç kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S8-suite + S6-parite araç satırları (Vitest 39 + `test:e2e` + CI); Kullanılacak Araçlar (tohum dosya listesi; `seo-redirects` `routes-manifest` okur → build önce)
- `_dev/docs/TESTING.md` — test komutları + 3 katman + a11y ölçüm disiplini
- `_dev/MEMORY.md` — iki-gate Süreç Disiplini (axe WCAG-AA ≠ Lighthouse a11y=100) + CI'yı `gh` olmadan REST ile okuma (public repo)
- `tests/{i18n-parity,seo-metadata,seo-redirects}.test.ts`, `tests/e2e/{home-a11y,subpages-a11y}.spec.ts`, `.github/workflows/ci.yml`

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.03 durumu + S8-suite/S6-parite bulgu notu

---

## Alt Görevler

- [ ] **1. Vitest suite (S6-parite + SEO tohum + smoke/umami)**
  - `npm run build` (seo-redirects `.next/routes-manifest.json` okur → build önce şart), sonra `npm run test` → **39 test** yeşil beklenir
  - Kırılım teyidi: `i18n-parity` (5-dil eksik/fazla anahtar=fail = S6 yapısal), `seo-metadata` + `seo-redirects` (Faz 13 SEO katmanı = S8 SEO tohum), `smoke`, `umami-script`

- [ ] **2. E2E axe suite (S8 axe gate)**
  - `npm run test:e2e` → home + subpages spec'leri WCAG-AA (`wcag2a/2aa/21a/21aa`) 0 ihlal, `retries:0` (fail-on-regression, maskeleme yok)
  - Tarayıcı binary: bundled chromium yeterli (axe WebGL gerektirmez; a11y için CI-parite). Gerekirse `channel:'chrome'`
  - `reuseExistingServer` tuzağı: webServer :3000'de **doğru (yeni) build** oturmuş mu — stray `next-server` teyidi (memory)

- [ ] **3. CI durumu (S8)**
  - `fast` + `a11y` job'larının son commit'te `conclusion=success` olduğunu doğrula
  - `gh` yoksa: public repo → auth'suz REST (`api.github.com/repos/NorthAIII/kiwiwebsite.v3/actions/runs?head_sha=<sha>` → run id → `/jobs` `jq`)

- [ ] **4. Kayıt**
  - İki gate sonucunu (Vitest 39 + axe suite) + CI durumunu task Oturum Kaydı + PHASE-14 notuna yaz. Lighthouse skor gate'i TASK-14.04'e çapraz-referanslanır
  - Suite kırmızıysa = regresyon bulgusu → triyaj (kapsam-içi bug → düzeltme task'ı; CI a11y job otomatik korur)

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Referans tanımlayıcılar ZATEN-VAR (test scriptleri package.json'da, tohum dosyaları repoda-tanımlı, routes-manifest build çıktısı, ci.yml repoda). YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-14.03.md          # Oturum kaydı + suite/CI sonuçları
├── phases/PHASE-14.md           # Task Listesi 14.03 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **İki-gate (memory Süreç Disiplini):** axe WCAG-AA (`test:e2e`) `landmark-one-main`/`region`/`heading-order` gibi **structural** audit'leri kapsamaz → suite yeşilken Lighthouse a11y<100 mümkün (Faz 8: 2 bülten sayfası a11y=98). Bu task axe+parite+SEO-tohum gate'ini kapatır; **Lighthouse skor gate'i AYRI** (TASK-14.04) — "suite yeşil = a11y bitti" varsayma.
- **`seo-redirects` build-bağımlı:** `.next/routes-manifest.json` okur → `npm test` öncesi **`next build` şart**, yoksa tohum fail (kaynak yok, gerçek regresyon değil). Build'i teyit et.
- **Vitest tohum sayısı = 39** (araştırma: 5 dosya). Sayı düşükse (örn. build yok → seo-redirects atlandı) yanlış-yeşil olabilir → dosya bazında koştuğunu teyit et.
- **Suite = doğrulama aracı, kaynak koda dokunulmaz.** Kırmızıysa gerçek regresyon → triyaj.

---

## Test Kriterleri

- [ ] `next build` temiz + `npm run test` → **39 test** yeşil (i18n parite + seo-metadata + seo-redirects + smoke + umami; eksik-anahtar=fail teyit)
- [ ] `npm run test:e2e` → home + subpages WCAG-AA 0 ihlal (fail-on-regression, `retries:0`)
- [ ] CI `fast` + `a11y` job son commit'te `conclusion=success` (REST veya `gh`)
- [ ] Kırmızı çıkarsa triyaj yapıldı (düzeltme task'ı önerisi); yeşilse regresyonsuz kaydedildi
- [ ] Sonuçlar PHASE-14 + task doc'a yazıldı; Lighthouse gate'i TASK-14.04'e çapraz-referanslandı

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldur]

**Bulgular / Triyaj:**
- [Suite yeşil/kırmızı; kapsam-içi bug: var/yok]

**Kaynak kod değişmedi** (doğrulama fazı).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
