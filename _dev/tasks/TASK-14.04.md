# TASK-14.04: S8-Lighthouse — a11y=100 Çift-Tema + Living Flow Perf Tabanı

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Ortam hazırlık + LH sürüm/anahtar teyit**
  - `cat /proc/loadavg` (düşük yükte ölç — memory host-yükü disiplini); system Chrome + `--disable-dev-shm-usage` + `--enable-unsafe-swiftshader` (yoksa Living Flow `TARGET_CRASHED`)
  - Lighthouse **12.8.2** → LCP-element audit anahtarını teyit et (`largest-contentful-paint-element` vs 13.x `lcp-breakdown-insight`); a11y **skoru** + perf **skoru** + CLS sürümden bağımsız guardrail

- [ ] **2. a11y=100 çift-tema — 6 sayfa × light/dark**
  - Sayfalar: `/` · `/crew-os` · `/spor-salonu-yazilimi` · `/vaka-calismalari` · `/bulten/ai-sdr-araclari` · `/bulten/claude-opus-4-8-fable-5`
  - Her sayfa **light + dark** (tema `html.dark`+localStorage zorlama — `emulateMedia` çevirmez, memory); TR `NEXT_LOCALE=tr` cookie
  - a11y **skoru = 100** her koşuda; düşen structural audit varsa (landmark/region/heading-order) triyaj

- [ ] **3. Living Flow sayfa-boyu nabız perf tabanı (Faz 12)**
  - Ana sayfa masaüstü **perf 100 / CLS 0** full-motion (sayfa-boyu nabız imzası regresyonsuz)
  - Perf korunan taban kıyası: masaüstü perf 100/LCP≈629ms/CLS 0 · mobil LCP≈3164ms/CLS 0 (Lantern-deterministik). **software-GL perf/TBT ortam-anomalisi** kıyaslanamaz (regresyon değil) — LCP/FCP/CLS'yi kıyasla, ham perf/TBT skorunu değil

- [ ] **4. Ölç + kaydet + karar ver (triyaj)**
  - a11y=100 çift-tema mühürlü mü? Living Flow desktop perf/CLS tabanı korundu mu? Sonuç PHASE-14 + task doc'a
  - Kapsam-içi regresyon (a11y<100, CLS artışı, LCP kötüleşmesi) → düzeltme task'ı önerisi. Brief mobil perf açığı (≈90/≈3164ms vs ≥95/<2.5s) → sahipli record-not-fix (gerçek-cihaz duvarı, prd-review B grubu)

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

- [ ] LH 12.8.2 ortamı hazır (flag'ler + LCP-element anahtarı teyit); loadavg düşük
- [ ] 6 sayfa × light/dark **a11y skoru = 100** (12 koşu); düşen structural audit yok (varsa triyaj)
- [ ] Ana sayfa masaüstü **perf 100 / CLS 0** full-motion (Living Flow sayfa-boyu nabız tabanı)
- [ ] Perf korunan taban: LCP/FCP/CLS Lantern-deterministik metrikler regresyonsuz (software-GL perf/TBT anomalisi kıyaslanmaz)
- [ ] Ölç+kaydet+karar: sonuç PHASE-14 + task doc'a; kapsam-içi regresyon triyajı; brief mobil açık sahipli kayıt

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
- [a11y çift-tema; perf taban; kapsam-içi regresyon var/yok]

**Kaynak kod değişmedi** (doğrulama fazı).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
