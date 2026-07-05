# TASK-14.04: S8-Lighthouse — a11y=100 Çift-Tema + Living Flow Perf Tabanı

**Durum:** ✅ Tamamlandı
**Modül:** M1 Living Flow/Tasarım (+M2 sayfalar; a11y/perf guardrail) (modules/M1-LivingFlow-TasarimSistemi.md)
**Feature:** S8 (v0.3 guardrail — Lighthouse skor gate tarafı) senaryo grubu — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.03 ✅ (suite gate kapandı; bu Lighthouse skor gate'ini kapatır)

---

## Hedef

Lighthouse ile v0.3 skor guardrail'lerini re-teyit et: **a11y=100 çift-tema** (ana sayfa + 5 alt sayfa, light+dark) + **Living Flow sayfa-boyu nabız perf tabanı** (Faz 12: masaüstü perf 100/CLS 0 full-motion) + perf korunan taban (mobil LCP≈3164ms, masaüstü 100, CLS≈0 — Lantern-deterministik metrikler regresyonsuz). Bu, S8'in iki-gate'inin **structural/skor tarafıdır** (TASK-14.03 axe WCAG-AA'yı kapattı). Tamamlanma = 6 sayfa × light/dark Lighthouse koşuldu, a11y skoru + korunan-taban metrikleri ölç + kaydet + karar ver (peşinen "geçti" varsayma).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S8 Lighthouse satırı + Ortam Ampirik Teyidi (Lighthouse **12.8.2** npx-cache; LCP-element anahtarı sürüm deltası); Dikkat Edilecekler (tema/locale/loadavg + software-GL flag'leri)
- `_dev/memory/a11y-olcum-tema-tuzagi.md` — kanonik LH dark render + light/dark iki koşu + emulateMedia/localStorage tema zorlama
- `_dev/memory/lighthouse-lantern-render-timing-korligi.md` — mobil Lantern-simüle; perf/TBT ortam-anomalisi (software-GL şişer, kıyaslanamaz); LCP/FCP/CLS Lantern-deterministik
- `_dev/memory/perf-olcum-devcontainer-kurulumu.md` — Chrome flag'leri (`--disable-dev-shm-usage` + `--enable-unsafe-swiftshader`); LH 13.x LCP `lcp-breakdown-insight` (12.x farklı — anahtar teyit et)
- `_dev/docs/perf/README.md` — perf metodoloji + korunan taban tablosu
- `_dev/ILKELER.md` — Öncelikli Eksenler #2 (korunan taban ≠ brief hedefi; a11y=100 yeni taban; perf lab açık kaldı)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.04 durumu + S8-Lighthouse bulgu notu
- `_dev/docs/perf/` — (yalnız yeni kanonik koşu artefaktı üretilirse; regresyon kıyası için)

---

## Alt Görevler

- [x] **1. Ortam hazırlık + LH sürüm/anahtar teyit**
  - `cat /proc/loadavg` (düşük yükte ölç — memory host-yükü disiplini); system Chrome + `--disable-dev-shm-usage` + `--enable-unsafe-swiftshader` (yoksa Living Flow `TARGET_CRASHED`)
  - Ortam hazır: node 20.20.2, Chrome 150, loadavg ~1.0-3.0 (düşük). LH npx-cache'te **hem 12.8.2 hem 13.3.0** mevcut (araştırma sırasında yalnız 12.8.2 vardı) → Faz 12 kanonik desktop tabanı 13.3.0 ile ölçüldüğü için apples-to-apples kıyas adına **13.3.0** seçildi. LCP-element anahtarı `lcp-breakdown-insight` (mobilde `<p data-hero="sub">` teyitli); a11y/perf/CLS guardrail sürümden bağımsız.

- [x] **2. a11y=100 çift-tema — 6 sayfa × light/dark**
  - Sayfalar: `/` · `/crew-os` · `/spor-salonu-yazilimi` · `/vaka-calismalari` · `/bulten/ai-sdr-araclari` · `/bulten/claude-opus-4-8-fable-5`
  - **Lighthouse dark kanonik (6 sayfa): 6/6 a11y=100**, 0 düşen structural audit (`landmark-one-main`/`heading-order`/`color-contrast`/`list`/`document-title`/`html-has-lang` hepsi pass; bülten sayfalarında `<main>` var → 9.04 regresyonu korunuyor), rtErr=none, finalUrl'ler TR prefixsiz doğru. a11y skoru tema-bağımsız (structural) → dark koşu skor gate'ini karşılar.
  - **Standalone axe light+dark (12 koşu, TASK-9.04 metodu): 12/12 koşuda 0 LH-ilgili ihlal, 0 tema-uyumsuzluk.** `channel:'chrome'`+swiftshader, `localStorage.theme` seed (FOUC öncesi) + `html.dark` themeOk teyit + `reducedMotion:'reduce'`+uçtan-uca scroll + axe-core 4.12.1 (LH bundle), violation'lar LH a11y audit-id setine filtreli. color-contrast **çift-temada** temiz (dark-panel inversiyonu dahil).

- [x] **3. Living Flow sayfa-boyu nabız perf tabanı (Faz 12)**
  - **Masaüstü full-motion (3 koşu): perf 100/100/100, LCP 624/624/699ms (median 624), CLS 0.0000, FCP ~512ms, TBT ~30ms, rtErr=none** → Faz 12 kanonik (`home-desktop-20260703-faz12` perf 100/LCP ~625ms/CLS≈0) ile **birebir, regresyonsuz**. Living Flow sayfa-boyu nabız imzası korundu.
  - **Mobil full-motion (3 koşu): LCP 3010/3009/3173ms (median ~3010), FCP ~1514ms, CLS 0.0000, LCPel `<p data-hero="sub">` (hero metni, değişmedi)** → korunan taban (Faz 6/7 LCP 3164ms / Faz 9 3171ms, FCP 1506-1516) ile eşit/altında (Lantern-deterministik). perf 65-67 / TBT ~2000ms = **ağır-SwiftShader ortam anomalisi** (Faz 9 perf 65/TBT 2000 ile birebir; TASK-6.01 perf 62/TBT 1842) → memory gereği ortamlar-arası kıyaslanamaz, regresyon **değil**.

- [x] **4. Ölç + kaydet + karar ver (triyaj)**
  - **a11y=100 çift-tema MÜHÜRLÜ** (LH dark 6/6 + axe light+dark 12/12 sıfır ihlal). **Living Flow desktop perf 100/CLS 0 tabanı KORUNDU** (Faz 12 birebir), mobil LCP korunan-taban regresyonsuz. Sonuç PHASE-14 + task doc + `docs/perf/README.md`'ye yazıldı.
  - **Kapsam-içi regresyon YOK** (a11y<100 yok, CLS artışı yok, LCP kötüleşmesi yok). **Sahipli record-not-fix:** brief mobil perf açığı (rep-env ~90/LCP ~3010-3164ms vs ≥95/<2.5s) → kök neden CPU-bound WebGL (gerçek-cihaz duvarı, DECISIONS 2026-06-30, prd-review B grubu). TASK-9.04 emsali gereği yeni kanonik artefakt üretilmedi (kaynak değişmedi; skorlar korunan tabanla kıyaslandı).

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Yeni kanonik perf artefaktı üretilirse docs/perf/ altına eklenir (ölçüm çıktısı, kaynak değil). YENİ = varsa perf artefaktı. -->

```
_dev/
├── tasks/TASK-14.04.md          # Oturum kaydı + Lighthouse sonuçları
├── phases/PHASE-14.md           # Task Listesi 14.04 + notu
├── DURUM.md                     # Aktif task + özet
└── docs/perf/                   # (opsiyonel) yeni kanonik koşu artefaktı — YENİ (üretilirse)
```

---

## Dikkat Noktaları

- **Tema tuzağı (memory):** kanonik LH `--headless=new` **DARK** render eder; a11y skoru iki temada aynı ama color-contrast **öğeleri** farklı (bg-ink/text-canvas panelleri inversiyon) → **her zaman light+dark iki koşu**. Tema `html.dark`+localStorage üzerinden zorla, `emulateMedia({colorScheme})` çevirmez.
- **Software-GL perf anomalisi (memory Lantern körlüğü):** bu ortamda perf/TBT şişer (SwiftShader), ortamlar-arası kıyaslanamaz — regresyon **değil**. LCP/FCP/CLS Lantern-deterministik → onları kıyasla. Faz 9 emsali: perf 65/TBT 2000 ağır-SwiftShader anomalisi kaydedildi ama regresyon sayılmadı.
- **`--enable-unsafe-swiftshader` şart:** yoksa Living Flow WebGL `TARGET_CRASHED` → Lighthouse sayfayı ölçemez.
- **LH 12.8.2 vs memory 13.3.0:** LCP-element audit anahtarı farklı olabilir → anahtar teyit et; skor/CLS guardrail sürümden bağımsız.
- **loadavg disiplini:** her perf koşusundan önce `cat /proc/loadavg`; yüksek yük perf/TBT/LCP'yi bozar (a11y/CLS'yi değil). Düşük yükte çok-koşu, median.
- **Reveal tuzağı:** full-motion'da reveal `opacity:0` atlanır → a11y/kontrast envanteri için `reducedMotion:'reduce'` + scroll (perf ölçümü ise full-motion).

---

## Test Kriterleri

- [x] LH ortamı hazır (Chrome 150 + flag'ler; LCP-element anahtarı `lcp-breakdown-insight` teyit); loadavg düşük (~1-3). **LH 13.3.0 seçildi** (npx-cache'te 12.8.2 de var; Faz 12 desktop tabanı 13.3.0 → apples-to-apples).
- [x] 6 sayfa a11y skoru = 100 (LH dark 6/6, structural tema-bağımsız) + light/dark axe 12/12 sıfır LH-ilgili ihlal → **çift-tema a11y=100 mühürlü**; düşen structural audit yok.
- [x] Ana sayfa masaüstü **perf 100 / CLS 0** full-motion (Living Flow sayfa-boyu nabız tabanı — 3/3 koşu perf 100, CLS 0)
- [x] Perf korunan taban: LCP/FCP/CLS Lantern-deterministik metrikler regresyonsuz (masaüstü LCP 624ms ≈ Faz 12 625ms; mobil LCP ~3010ms ≤ taban 3164ms; CLS 0 her yerde). software-GL perf/TBT anomalisi kıyaslanmadı.
- [x] Ölç+kaydet+karar: sonuç PHASE-14 + task doc + perf/README'ye; kapsam-içi regresyon YOK; brief mobil açık sahipli kayıt (prd-review B).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-05

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Ortam:** node 20.20.2 + Chrome 150 + LH npx-cache. `/proc/loadavg` ~1.0-3.0 (düşük). Flag'ler `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`. Taze prod (`rm -rf .next && next build` temiz — `/crew-os` SSG 5-dil, `/bunker-os` fiziksel route yok, 0 MISSING_MESSAGE) → `next start -p 4173` (listening-PID 8846 = taze process teyit). 6 sayfa 200 (`NEXT_LOCALE=tr` cookie).
- **LH sürüm kararı:** npx-cache'te 12.8.2 **ve** 13.3.0 mevcut (araştırma yalnız 12.8.2 gördü). Faz 12 kanonik desktop tabanı 13.3.0 ile ölçüldüğünden apples-to-apples kıyas için **13.3.0** seçildi. LCP-element anahtarı `lcp-breakdown-insight` (mobilde `<p data-hero="sub">` doğrulandı).
- **a11y (LH dark, 6 sayfa, `--only-categories=accessibility`):** 6/6 a11y=100, 0 düşen audit, rtErr=none. Structural (`landmark-one-main`/`heading-order`/`color-contrast`/`list`/`document-title`/`html-has-lang`/`meta-viewport`) hepsi pass; bülten sayfalarında `<main>` var (9.04 fix korunuyor).
- **axe light+dark (standalone Playwright + system Chrome, 12 koşu):** `localStorage.theme` seed + `html.dark` themeOk + `reducedMotion:'reduce'` + uçtan-uca scroll + axe-core 4.12.1 (LH bundle), violation'lar LH a11y audit-id setine filtreli → **12/12 koşu 0 LH-ilgili ihlal, 0 tema-uyumsuzluk**.
- **perf (LH full-motion):** masaüstü 3 koşu perf 100/100/100, LCP 624/624/699ms, CLS 0, TBT ~30ms; mobil 3 koşu perf 65-67 (env-anomali), LCP ~3010ms, FCP ~1514ms, CLS 0, LCPel hero-sub.
- Serve durduruldu, chrome temizlendi, git tree temiz (kaynak değişmedi).

**Bulgular / Triyaj:**
- **a11y=100 çift-tema MÜHÜRLÜ** — LH dark 6/6 (structural skor gate) + axe light+dark 12/12 sıfır ihlal (color-contrast çift-tema). TASK-14.03 axe WCAG-AA suite gate'i + bu task LH structural skor gate'i → **iki-gate kapandı**.
- **Living Flow desktop perf 100 / CLS 0 tabanı KORUNDU** (Faz 12 birebir: LCP 624ms ≈ 625ms). Mobil LCP ~3010ms ≤ korunan taban (3164-3171ms), CLS 0 → Lantern-deterministik regresyonsuz.
- **Kapsam-içi regresyon YOK.**
- **Sahipli record-not-fix:** brief mobil perf açığı (rep-env ~90/LCP ~3010-3164ms vs ≥95/<2.5s) — kök neden CPU-bound WebGL, gerçek-cihaz duvarı (DECISIONS 2026-06-30, prd-review B grubu). perf/TBT ölçüm-ortamı software-GL anomalisi (perf 65/TBT 2000) regresyon değil.
- **Artefakt kararı:** TASK-9.04 emsali — kaynak değişmedi → yeni kanonik perf artefaktı üretilmedi; skorlar korunan tabanla kıyaslandı, kayıt `docs/perf/README.md` v0.3/Faz 14 bölümüne yazıldı.

**Kaynak kod değişmedi** (doğrulama fazı).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
