# TASK-9.03: S8-suite + S6-parite — Guardrail Suite & i18n Parite Re-teyit

**Durum:** ✅ Tamamlandı
**Modül:** Tümü (M1–M6; a11y/i18n guardrail) — birincil M4 parite (modules/M4-i18n.md)
**Feature:** S8 (v0.2 guardrail — suite tarafı) + S6-parite (yapısal i18n parite) senaryo grupları — doğrulama
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.02 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

v0.2'nin **commit'li test suite'ini** koşarak guardrail'lerin regresyonsuz olduğunu re-teyit et: `npm run test:e2e` (Playwright+axe **52 test** = 6 sayfa × 5 dil × 2 tema WCAG-AA 0 ihlal) + `npm run test` (Vitest **7 test** = i18n 5-dil parite + smoke + umami-script) + CI (`.github/workflows/ci.yml` `fast`+`a11y` job) yeşil durumu. Bu task **iki gate'in ikisini de** temsil eder: axe WCAG-AA regresyon güvencesi (fail-on-regression) + i18n yapısal parite (eksik anahtar=fail). Lighthouse a11y=100 skor gate'i ayrı task'tadır (TASK-9.04). Tamamlanma = suite yeşil koştu, CI durumu doğrulandı, sonuç kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S8 & S6 araç satırları + Dikkat Edilecekler (iki-gate a11y; i18n parite Vitest'te; reuseExistingServer)
- `_dev/docs/TESTING.md` — test komutları + 3 katman + a11y ölçüm disiplini
- `_dev/MEMORY.md` — iki-gate Süreç Disiplini + CI'yı `gh` olmadan REST ile okuma (public repo)
- `tests/e2e/{home-a11y,subpages-a11y}.spec.ts`, `tests/e2e/a11y-helpers.ts`, `tests/i18n-parity.test.ts`, `.github/workflows/ci.yml`

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.03 durumu + S8-suite/S6-parite bulgu notu

---

## Alt Görevler

- [x] **1. Vitest suite (S6-parite + smoke + umami)**
  - `npm run test` → **7 test** yeşil; i18n 5-dil parite (eksik/fazla anahtar=fail) = S6 yapısal katmanı; umami-script (S8 Umami kod-tarafı) + smoke

- [x] **2. E2E axe suite (S8 axe gate)**
  - `npm run test:e2e` → **52 test** yeşil (6 sayfa × 5 dil × 2 tema, WCAG-AA 0 ihlal, fail-on-regression)
  - Tarayıcı binary gerekirse `npx playwright install --with-deps chromium` (onayla) veya `channel:'chrome'` (system Chrome mevcut)
  - `reuseExistingServer` tuzağı: playwright webServer :3000'de **doğru (yeni) build** oturmuş mu — stray `next-server` teyidi (memory)

- [x] **3. CI durumu (S8)**
  - `.github/workflows/ci.yml` `fast` + `a11y` job'larının son commit'te `conclusion=success` olduğunu doğrula
  - `gh` yoksa: public repo → auth'suz REST (`api.github.com/repos/NorthAIII/kiwiwebsite.v3/actions/runs?head_sha=<sha>` → run id → `/jobs` `jq`) (memory Ortam Notları)

- [x] **4. Kayıt**
  - İki gate sonucunu (axe suite + parite) + CI durumunu task Oturum Kaydı + PHASE-9 notuna yaz. Lighthouse skor gate'i TASK-9.04'e bırakılır (çapraz-referans)

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Değişen yalnız _dev/ dokümanları. -->

```
_dev/
├── tasks/TASK-9.03.md          # Oturum kaydı + suite/CI sonuçları
├── phases/PHASE-9.md           # Task Listesi 9.03 + S8-suite/S6-parite notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **İki-gate (TK5, memory):** axe WCAG-AA (`test:e2e`) `landmark-one-main`/`region`/`heading-order` gibi structural audit'leri **kapsamaz** → suite yeşilken Lighthouse a11y<100 mümkün (Faz 8: 2 bülten sayfası a11y=98). Bu task axe+parite gate'ini kapatır; **Lighthouse skor gate'i ayrı** (TASK-9.04) — "suite yeşil = a11y bitti" varsayma.
- **Suite = doğrulama aracı, kaynak koda dokunulmaz** (doğrulama fazı). Suite kırmızıysa = regresyon bulgusu → TK7 triyaj (kapsam-içi bug → düzeltme task'ı; CI a11y job otomatik korur).
- **reuseExistingServer:** yerelde eldeki :3000 server'ı kullanır → doğru build oturduğunu koşudan önce teyit et.
- Kanonik ortam = fresh prod build (suite kendi `build && start` webServer'ını kurar).

---

## Test Kriterleri

- [x] `npm run test` → 7 test yeşil (i18n parite dahil, eksik anahtar=fail teyit) ✓ 3 dosya/7 test
- [x] `npm run test:e2e` → 52 test yeşil (WCAG-AA 0 ihlal, 6 sayfa × 5 dil × 2 tema) ✓ home 2 + subpages 50
- [x] CI `fast` + `a11y` job son commit'te `conclusion=success` (REST veya `gh`) ✓ run 28585690647, iki job success
- [x] Kırmızı çıkarsa TK7 triyaj yapıldı (düzeltme task'ı önerisi kaydedildi) — N/A: suite yeşil, kapsam-içi bug yok
- [x] Sonuçlar PHASE-9 + task doc'a yazıldı; Lighthouse gate'i TASK-9.04'e çapraz-referanslandı

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum 1 — 2026-07-02

**Ortam teyidi:**
- node v20.20.2, npm 10.8.2, google-chrome 150, Playwright chromium-1228 (cache'de kurulu — `install` gerekmedi), loadavg 1.11 (düşük ✓). Port 3000 önce boş, stray/stale `next-server` yok (`ss -ltnp` + `ps` teyit). Kanonik ortam: `test:e2e` kendi `next build && next start` webServer'ını :3000'de fresh kurdu (`reuseExistingServer` yerelde ama port boştu → taze build oturdu).

**Yapılanlar (iki gate + CI):**
- **Alt görev 1 — Vitest (S6-parite + smoke + umami):** `npm run test` → **3 dosya / 7 test yeşil** (1.46s). `i18n-parity.test.ts` = 5-dil (tr/en/ar/de/es) yapısal parite (eksik/fazla anahtar=fail) = S6 yapısal katmanı; `smoke.test.tsx` (jsdom component smoke); `umami-script.test.tsx` (S8 Umami kod-tarafı). Eksik-anahtar guardrail'i yeşil → parite korunuyor.
- **Alt görev 2 — E2E axe (S8 axe gate):** `npm run test:e2e` → **52/52 test yeşil** (2.3m, chromium prod build). Kırılım: `home-a11y.spec.ts` = 2 (anasayfa `/` light+dark), `subpages-a11y.spec.ts` = 50 (5 alt sayfa × 5 dil × 2 tema). Hepsi WCAG-AA (`wcag2a/2aa/21a/21aa`) 0 ihlal, `retries:0` (fail-on-regression, yeniden-deneme maskeleme yok). Sayfalar: bunker-os, spor-salonu-yazilimi, vaka-calismalari, bulten/ai-sdr-araclari, bulten/claude-opus-4-8-fable-5 + anasayfa.
- **Alt görev 3 — CI durumu (S8):** HEAD `994ded9` için public-repo auth'suz REST API (`gh` yok). `actions/runs?head_sha=994ded9` → run_id=28585690647, `status=completed conclusion=success`, branch `revize/devflow-kurulum`. Job seviyesi (`/jobs`): **`fast (build + vitest)` = success** · **`a11y (playwright + axe)` = success**. Her iki CI job yeşil = suite yerelde ve CI'da tutarlı geçiyor.

**Bulgular / Triyaj (TK7):**
- **Kapsam-içi gerçek bug: yok.** Suite kırmızı çıkmadı → regresyon bulgusu yok, düzeltme task'ı gerekmedi. Kaynak kod değişmedi (doğrulama fazı).
- Sahipli/ertelenmiş kalemler bu task kapsamında değişmedi (S5/S6-render'da kaydedilen 4 alt-sayfa non-TR stale versiyon-sınırında; brief mobil perf gerçek-cihaz duvarı — hepsi record-not-fix, litige edilmedi).

**İki-gate ayrımı (TK5, çapraz-referans):** Bu task **axe WCAG-AA + i18n parite** gate'ini kapatır (fail-on-regression + eksik-anahtar=fail). **Lighthouse a11y=100 skor gate'i AYRI** → **TASK-9.04** (structural audit'ler `landmark-one-main`/`region`/`heading-order` axe WCAG-AA alt-kümesinde yok; "suite yeşil = a11y bitti" değil). Bu oturumda Lighthouse koşulmadı — bilinçli, plan gereği 9.04'e bırakıldı.

**Son Yaklaşım:** Task tamamlandı — S8 guardrail suite (axe 52) + S6 yapısal parite (Vitest 7) + CI (`fast`+`a11y`) üçü de yeşil; regresyonsuz re-teyit. Kaynak koda dokunulmadı.

**Sonraki Adım Detayı:** run-task TASK-9.04 (S8-Lighthouse: a11y=100 çift-tema 6 sayfa × light/dark + perf korunan taban; memory tema/locale/loadavg ölçüm disiplini + software-GL Chrome flag'leri) — yeni oturum.

**Kaynak kod değişmedi** (doğrulama fazı); yalnız `_dev/` dokümanları güncellendi.

---

**Oluşturulma:** 2026-07-02
