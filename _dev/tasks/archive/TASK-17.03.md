# TASK-17.03: S8-suite + S6-parite — Guardrail Suite & i18n Parite (alpfit 133-leaf dahil)

**Durum:** ✅ Tamamlandı
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

- [x] **1. Vitest suite (S6-parite + SEO tohum + smoke/umami)** ✅ — taze `next build` temiz (37/37 SSG, tip hatası 0); `npm run test` → **5 dosya / 39 test yeşil** (seo-metadata 16 + seo-redirects 16 + i18n-parity 5 + umami 1 + smoke 1). `seo-redirects` 16 test koştu → `routes-manifest.json` gerçekten okundu (atlanmadı, yanlış-yeşil değil). `alpfit` namespace ayrı teyit: **133 leaf × 5 dil birebir parite** (toplam 316 leaf/dil, tümü eşit).

- [x] **2. E2E axe suite — a11y=100 çift-tema mührü (S8 axe gate)** ✅ — otoritatif mühür = CI `a11y` job (adım 3): `test:e2e` (`home-a11y` + `subpages-a11y` = 5 sayfa × 5 dil × 2 tema = 50 test, Alpfit dahil) GitHub runner'da WCAG-AA 0 ihlal geçti. Yerel `next start` **denenmedi** (memory kuralı `sandbox-runtime-browser-page-route` → `exit 144`; task kriteri "yerel flaky ise CI yeterli").

- [x] **3. CI durumu — otoritatif a11y mührü (S8)** ✅ — HEAD `5248a76` CI run `29591588087`: **`fast` job `conclusion=success`** (Build ✓ + Vitest ✓) + **`a11y` job `conclusion=success`** (Playwright/axe adımı ✓). REST ile okundu (public repo, auth'suz). Kaynak kod 17.01'den beri değişmedi → CI'ın doğruladığı ağaç güncel ağaçla birebir.

- [x] **4. Perf korunan taban re-teyit (argument-from-unchanged) + kayıt** ✅ — git ile ampirik temellendi: **home page (son dokunuş 13.03) + living-flow (son dokunuş 12.03) v0.4'te byte-birebir**; `globals.css` v0.4 değişikliği **salt-ekleme** (`--color-surface` token, Alpfit-özel; mevcut home/WebGL token'ları değişmedi); alpfit-dışı tek diğer değişiklik orphan `GymSoftwareShowcase.tsx` silinmesi (ölü kod). → masaüstü perf 100 / mobil LCP korunan taban Faz 14'ten değişmeden mühürlü (yeni ölçüm gerekmez; sandbox software-GL env-anomali). Alpfit CLS≈0 bileşeni → **17.04 (S3)**. **0 kapsam-içi bug** → suite yeşil, regresyon yok.

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

- [x] `next build` temiz + `npm run test` → tüm Vitest dosyaları yeşil (i18n parite **`alpfit` 133-leaf dahil** + seo-metadata + seo-redirects + smoke + umami; eksik-anahtar=fail teyit) ✅ 37/37 SSG + 39/39 test
- [x] `npm run test:e2e` → `home-a11y` + `subpages-a11y` (5 sayfa × 5 dil × 2 tema = 50, **Alpfit dahil**) WCAG-AA 0 ihlal, `retries:0` — VEYA yerel flaky ise CI `a11y` job success yeterli ✅ CI `a11y` job success (yerel next start denenmedi, memory kuralı)
- [x] CI `fast` + `a11y` job HEAD commit'te `conclusion=success` (REST veya `gh`) ✅ run `29591588087`, iki job da success
- [x] Perf korunan taban re-teyit mantığı (argument-from-unchanged + CLS→17.04) kaydedildi ✅ git ile ampirik temellendi
- [x] Kırmızı çıkarsa triyaj yapıldı; yeşilse regresyonsuz kaydedildi; PHASE-17 + task doc'a yazıldı ✅ 0 kapsam-içi bug, regresyonsuz

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-17

**Durum:** ✅ Tamamlandı — S8-suite + S6-parite GEÇTİ, guardrail'ler regresyonsuz, **0 kapsam-içi bug**

**Son Yaklaşım:** Doğrulama tamamlandı; pause/devam gerekmez. Substrat = taze `next build` (HEAD `5248a76` hizalı) + commit'li test suite + CI (GitHub runner, otoritatif) + git-tabanlı argument-from-unchanged. Kaynak kod DEĞİŞMEDİ (doğrulama fazı).

**Sonraki Adım Detayı:** Fazda 5 task kaldı (17.04–17.08). Sıradaki: **TASK-17.04** (S3 Living Flow degradasyon — C: `page.route`+system Chrome WebGL; ana sayfa nabız + Alpfit before/after + 320/768/1440 taşma + near-zero CLS). Yeni oturum. Runtime katmanına (C) geçiş: memory `sandbox-runtime-browser-page-route` + `playwright-bundled-chromium-webgl-yok` (`channel:'chrome'`+swiftshader) + `runtime-harness-selector-teyidi` uygulanacak.

**Yapılanlar:**
- **Ortam & build tazeliği:** node v24.16.0 · npm 11.13.0 · loadavg 1.91 (< ~6). HEAD `5248a76` origin'e push'lu, temiz ağaç. Taze `npm run build` → **37/37 SSG exit 0**, tip hatası 0, 6 sayfa × 5 locale route tablosu tam (`.next/routes-manifest.json` + prerender HEAD-hizalı yenilendi).
- **Alt görev 1 (Vitest suite — S6-parite + SEO tohum):** `npm run test --reporter=verbose` → **5 dosya / 39 test yeşil / 717ms**. Kırılım: `seo-metadata` **16** (localePath + canonical/hreflang alternates), `seo-redirects` **16** (3 redirect ailesi çıplak+twin 308 + locale-kapsam + efektif-eşleşme sıra mührü — `routes-manifest.json`'a bağlı **gerçekten koştu**, atlanmadı → yanlış-yeşil değil), `i18n-parity` **5** (tr taban + en/ar/de/es birebir eşit, eksik/fazla anahtar=fail), `umami-script` **1**, `smoke` **1**. `alpfit` namespace ayrık teyit (node flatten): **133 leaf × 5 dil birebir parite** (toplam 316 leaf/dil, 0 diff) → v0.4 namespace paritesi mühürlü (eksik anahtar yok; non-TR stale-TR yapısal tam).
- **Alt görev 2 (E2E axe — a11y=100 çift-tema mührü):** Otoritatif mühür = CI `a11y` job (adım 3). Yerel `npm run test:e2e` **denenmedi** — `test:e2e` webServer'ı `next start` koşar, memory kuralı (`sandbox-runtime-browser-page-route.md`) sandbox `exit 144`/signal-16 ile öldürür; araştırma kararı "next start denenmez" + task kriteri "yerel flaky ise CI yeterli". CI a11y job `test:e2e`'yi (`home-a11y` + `subpages-a11y` = **5 sayfa × 5 dil × 2 tema = 50 test, Alpfit Plus dahil**) sandbox'tan bağımsız GitHub runner'da koştu, WCAG-AA 0 ihlal.
- **Alt görev 3 (CI — otoritatif):** HEAD `5248a76` CI run **`29591588087`** (REST, auth'suz public repo): **`fast` job `conclusion=success`** (Set up → checkout → Setup Node → Install deps → **Build: success** → **Vitest: success**), **`a11y` job `conclusion=success`** (→ Install Playwright → **Playwright/axe: success**). İki job da yeşil = a11y=100 çift-tema re-teyidi + build/parite mührü. Kaynak kod 17.01'den beri değişmedi → CI'ın doğruladığı ağaç = güncel ağaç.
- **Alt görev 4 (Perf korunan taban — argument-from-unchanged):** git ile ampirik: home `page.tsx` son dokunuş **TASK-13.03** (Faz 13), living-flow bileşenleri son dokunuş **TASK-12.03** (Faz 12) → v0.4 (Faz 15/16) **hiç dokunmadı**. `globals.css` v0.4 değişimi **salt-ekleme** (`--color-surface` light `#fffefb`/dark `#191b12`, yalnız Alpfit lifted kart; mevcut canvas/ink/pulse token'ları değişmedi). v0.4 span (`1d74e0b~1`→HEAD) alpfit-dışı home/bileşen diff'i = yalnız orphan `GymSoftwareShowcase.tsx` **silinmesi** (162 satır, ölü kod/0 tüketici). → masaüstü perf 100 / mobil LCP korunan taban Faz 14'ten **değişmeden geçerli**; yeni ölçüm gereksiz (sandbox software-GL perf env-anomali kıyaslanamaz — memory `perf-olcum-devcontainer-kurulumu` / `lighthouse-lantern-render-timing-korligi`). Alpfit saf CSS/SVG CLS≈0 bileşeni → **17.04 (S3)** 320/768/1440.
- **Triyaj:** **0 kapsam-içi bug** → düzeltme task'ı gerekmez, kaynak kod değişmedi (doğrulama fazı). Guardrail'ler regresyonsuz: suite yeşil (Vitest 39/39 + CI fast/a11y success = axe 50 test), parite mühürlü (`alpfit` 133-leaf), perf taban korundu. Sahipli/beklenen (yeniden litige edilmedi): non-TR `alpfit` stale-TR (versiyon-sınırı → prd-review; 17.02'de yapısal parite teyitli).

**Test:** Doğrulama fazı — kaynak kod değişmedi, yeni test yazılmadı. Bu task'ın **kendisi** suite koşusu: `next build` temiz + Vitest 39/39 + CI `fast`+`a11y` success (axe 50-test çift-tema mührü). Perf korunan taban argument-from-unchanged (git-temelli). Alpfit CLS runtime bileşeni → TASK-17.04.

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
