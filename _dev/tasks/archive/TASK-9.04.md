# TASK-9.04: S8-Lighthouse — a11y=100 Çift-Tema + Perf Korunan Taban

**Durum:** ✅ Tamamlandı
**Modül:** Tümü (M1–M6; a11y/perf skor gate) (modules/M1-LivingFlow-TasarimSistemi.md, M6-SEO-Deploy.md)
**Feature:** S8 (v0.2 guardrail — Lighthouse skor gate tarafı) senaryo grubu — doğrulama
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.03 ✅ (lineer sıra; axe gate önce, Lighthouse skor gate sonra)

---

## Hedef

v0.2 a11y kazanımını **Lighthouse skor gate'iyle** çift-tema re-teyit et: home + 5 alt sayfa = 6 sayfa × (light + dark) **a11y=100**. Aynı koşulardan perf korunan tabanı gözle: home mobil **perf 90 / LCP ~3164ms**, home masaüstü **perf 100**, CLS≈0 — **regresyon yok** (altına düşülmez). Bu, TASK-9.03'ün axe suite gate'ini tamamlayan **ikinci a11y gate'idir** (structural audit'leri kapsar). Tamamlanma = 12 a11y koşusu + home perf mobil/masaüstü koşusu alındı, skorlar taban ile kıyaslanıp kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S8 Lighthouse satırı + Kullanılacak Araçlar (Chrome flag'leri) + Dikkat Edilecekler (iki-gate, perf sahipli/ertelenmiş)
- `_dev/memory/perf-olcum-devcontainer-kurulumu.md` — node/Chrome/LH kurulum + zorunlu Chrome flag'leri + LH 13.x LCP insight
- `_dev/memory/a11y-olcum-tema-tuzagi.md` — kanonik LH dark render + light+dark zorunlu + reducedMotion+scroll
- `_dev/MEMORY.md` — host yükü disiplini (`/proc/loadavg`, çok-koşu median) + iki-gate
- `_dev/ILKELER.md` — perf/a11y korunan taban ≠ brief hedefi; `_dev/docs/perf/README.md` (taban artefaktları)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.04 durumu + S8-Lighthouse skor notu

---

## Alt Görevler

- [x] **1. LH araç-zinciri + host yükü** — node v20.20.2 / Chrome 150 / LH 13.3.0 npx-cache hazır (kurulum gerekmedi); loadavg 0.79–1.43 (düşük ✓, her koşuda gözlendi); Chrome flag'leri uygulandı, `runtimeError=none` (crash yok).

- [x] **2. a11y=100 çift-tema — 6 sayfa × 2 tema (S8 skor gate)** — 6/6 dark kanonik Lighthouse **a11y=100** (0 düşen audit) + 12/12 gerçek light/dark axe (LH motoru 4.12.1, `localStorage` tema zorlama + themeOk teyit) **0 Lighthouse-ilgili ihlal**. TR `NEXT_LOCALE=tr` cookie, `reducedMotion:'reduce'`+scroll tam envanter.

- [x] **3. Perf korunan taban — home** — masaüstü perf **100** / LCP 629ms / CLS 0; mobil LCP **3171ms** (≈3164 comparable) / FCP 1516ms / CLS 0 — korunan taban ✓ (Lantern-deterministik metrikler). perf 65/TBT 2000 = ağır-SwiftShader env anomalisi (6.01 birebir), regresyon değil.

- [x] **4. Kayıt & triyaj** — skorlar `docs/perf/README.md` tabanıyla kıyaslandı (TASK-9.04 bölümü eklendi); brief mobil perf açığı **record-not-fix** (TK7, DECISIONS 2026-06-30). Kapsam-içi bug yok.

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. LH artefaktları docs/perf/ altına kaydedilebilir (opsiyonel); asıl değişen _dev/ dokümanları. -->

```
_dev/
├── tasks/TASK-9.04.md          # Oturum kaydı + LH skorları
├── phases/PHASE-9.md           # Task Listesi 9.04 + S8-Lighthouse notu
├── DURUM.md                    # Aktif task + özet
└── docs/perf/                  # (ops.) yeni LH artefaktı kaydedilirse README koşu tablosuna satır
```

---

## Dikkat Noktaları

- **İki-gate (TK5, memory):** bu task Lighthouse **structural** audit'leri kapsar (`landmark`/`region`/`heading-order`) — axe suite'in (TASK-9.03) göremediği katman. İkisi ayrı gate; ikisi de yeşil olmalı.
- **Tema tuzağı (memory):** kanonik LH dark render eder; a11y skoru iki temada aynı ama color-contrast **öğeleri** farklı (bg-ink/text-canvas panelleri ters çevrilir) → **her zaman light+dark**.
- **Host yükü (memory):** perf-bitişik ölçümden önce `/proc/loadavg`; yüksek yük TBT/LCP'yi savurur. Perf mutlak kıyasında baseline'ı **aynı ortamda** sabitle (SwiftShader ortamı perf/TBT'yi şişirir; a11y/CLS/LCP ortam-bağımsız).
- **Perf açığı record-not-fix (TK7):** brief mobil hedefi henüz taban altında (bilinçli, DECISIONS 2026-06-30) — düşülmedikçe regresyon değil; optimize etme.
- Alt-sayfa perf yalnız **regresyonsuz** tutulur, optimize edilmez (kapsam dışı).

---

## Test Kriterleri

- [x] Chrome flag'leri + host yükü disiplini uygulandı (loadavg 0.79–1.43 düşük, çok-koşu median)
- [x] 6 sayfa × 2 tema = 12 koşu **a11y=100** — dark kanonik 6/6=100 + gerçek light/dark axe 12/12 0-ihlal (LH motoru, tema zorlama teyitli)
- [x] home masaüstü perf 100 / LCP 629ms / CLS 0; mobil LCP 3171ms≈3164 (comparable) / CLS 0 — korunan taban altına düşülmedi (perf/TBT env-şişkin, regresyon değil)
- [x] Skorlar `docs/perf/` tabanı ile kıyaslandı; brief açığı record-not-fix kaydedildi (TK7)
- [x] Sonuçlar PHASE-9 + task doc'a yazıldı; TASK-9.03 axe gate'i ile çapraz-referanslandı (iki-gate TK5)

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
- node v20.20.2, npm 10.8.2, google-chrome 150.0.7871.46, Playwright chromium-1228 (cache'de kurulu), Lighthouse **13.3.0** npx-cache'te (`~/.npm/_npx/906bfb1e6b1e7aaa/`), loadavg 0.79–1.43 (düşük ✓, tüm koşularda `/proc/loadavg` gözlendi). Araç-zinciri kurulumu **gerekmedi** (ortam zaten hazır — onay gerekmedi). Kanonik ortam (TK2): fresh prod build (`rm -rf .next && npm run build` temiz) → `next start -p 4173`, **listening-PID 84813 fresh teyit** (`ss -ltnp`; stray/stale yok). TR `/` cookie'li 200, finalUrl `/` teyit.
- Chrome flag'leri (memory `perf-olcum-devcontainer-kurulumu`): `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader` — tüm koşularda `runtimeError=none` (alt-sayfa hero'ları LivingFlow → software-WebGL crash'i önlendi).

**Yapılanlar (iki gate — a11y skor gate tarafı + perf taban):**
- **Alt görev 2a — Lighthouse kanonik (dark) a11y, 6 sayfa:** her sayfa `--only-categories=accessibility`, TR `NEXT_LOCALE=tr` cookie. **6/6 a11y=100**, 0 düşen audit, `runtimeError=none`, finalUrl'ler prefixsiz TR (cookie doğru): `/`=100 · `/spor-salonu-yazilimi`=100 · `/vaka-calismalari`=100 · `/bunker-os`=100 · `/bulten/ai-sdr-araclari`=100 · `/bulten/claude-opus-4-8-fable-5`=100. Structural audit'ler (`landmark-one-main`/`heading-order`/`list`/`bypass`) burada geçer — **tema-bağımsız** (DOM yapısı temayla değişmez), light'a da geçerli.
- **Alt görev 2b — gerçek LIGHT+DARK ölçüm (tema zorlama), 6 sayfa × 2 tema = 12 koşu:** kanonik Lighthouse yalnız dark render eder (tema `localStorage`, `prefers-color-scheme` değil) → light'ı gerçekten ölçmek için standalone Playwright (scratchpad, repo'ya yazılmadı): `localStorage.theme` seed (FOUC öncesi `addInitScript`) + `emulateMedia({reducedMotion:'reduce'})` + `scrollThrough` (tam reveal envanteri) + LH npx-cache axe-core **4.12.1** (Lighthouse'un bundle ettiği aynı motor) enjekte. Her koşuda render edilen tema `html.dark` class ile doğrulandı (**themeOk=true 12/12**). Violation'lar Lighthouse a11y audit-id kümesine filtrelendi (LH skor eşdeğeri). **Sonuç: 12/12 koşuda 0 Lighthouse-ilgili ihlal** (best-practice gürültüsü bile 0) → **a11y=100 çift-tema gerçekten doğrulandı** (dark kanonik skor + light/dark axe LH-motoru).
- **Alt görev 3 — perf korunan taban, home (çok-koşu median):** TR `/` cookie, mobil (default preset) + masaüstü (`--preset=desktop`), her biri 3 koşu, element-denetimli.
  - **Masaüstü:** perf **100** / LCP **629ms** (≤ taban 0.69s) / FCP 336ms / CLS **0.0000** / TBT ~27ms — korunan taban ✓. LCP elementi `<span data-hero="l2">` (değişmedi).
  - **Mobil:** LCP **3171ms** (median; ≈ taban 3164ms — Lantern-deterministik, kıyaslanabilir) / FCP **1516ms** (≈ taban 1506ms) / CLS **0.0000** — güvenilir metrikler korunan taban ✓. LCP elementi `<p data-hero="sub">` (değişmedi; artık `<main>` içinde — Faz 8, tutarlı). **perf 65 / TBT ~2000ms** = ağır-SwiftShader ortam anomalisi (TASK-6.01 perf 62/TBT 1842 ile birebir; software-GL main-thread şişkinliği) — memory gereği **ortamlar arası kıyaslanamaz, regresyon sinyali değil**; a11y/CLS/LCP/FCP ortam-bağımsız güvenilir.

**Bulgular / Triyaj (TK7):**
- **Kapsam-içi gerçek bug: yok.** 6/6 Lighthouse a11y=100 + 12/12 çift-tema axe 0 ihlal + perf korunan taban (comparable metrikler) regresyonsuz. Kaynak kod değişmedi (doğrulama fazı).
- **Brief mobil perf açığı record-not-fix (TK7):** perf 65 (env-şişkin) / mobil LCP 3171ms (> brief <2.5s) — kök neden CPU-bound WebGL (gerçek-cihaz duvarı, DECISIONS 2026-06-30); senaryo testte kaydedilir, düzeltilmez. Alt-sayfa perf optimize edilmedi (kapsam dışı).

**İki-gate ayrımı (TK5, çapraz-referans):** Bu task **Lighthouse a11y=100 skor gate'ini** kapatır — structural audit'ler (`landmark-one-main`/`heading-order` vb.) axe WCAG-AA alt-kümesinde **yok**, TASK-9.03'ün göremediği katman. TASK-9.03 axe WCAG-AA suite'i (52) + i18n parite gate'ini kapatmıştı; ikisi ayrı sinyal, ikisi de yeşil → v0.2 a11y çift-tema tam mühürlü.

**Son Yaklaşım:** Task tamamlandı — 6 sayfa dark kanonik Lighthouse a11y=100 + 6×2 gerçek light/dark axe 0 ihlal (LH motoru) + home perf korunan taban (masaüstü 100/629ms, mobil LCP 3171≈3164 comparable, CLS 0). Kaynak koda dokunulmadı; LH artefaktları scratchpad'de (repo'ya yazılmadı, doğrulama fazı).

**Sonraki Adım Detayı:** run-task TASK-9.05 (S3 — degradasyon / mod kombinasyonları: standalone Playwright, 6 hero light/dark/reduced/no-WebGL/mobil-low + AR-RTL×dark×reduced + 320/768/1440 taşma/CLS) — yeni oturum.

**Kaynak kod değişmedi** (doğrulama fazı); yalnız `_dev/` dokümanları güncellendi.

---

**Oluşturulma:** 2026-07-02
