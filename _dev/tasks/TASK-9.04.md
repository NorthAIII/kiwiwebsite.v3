# TASK-9.04: S8-Lighthouse — a11y=100 Çift-Tema + Perf Korunan Taban

**Durum:** ⬜ Bekliyor
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

- [ ] **1. LH araç-zinciri + host yükü**
  - Node/Chrome/LH 13.3.0 mevcudiyeti (yoksa memory `perf-olcum-devcontainer-kurulumu` kurulumu, onayla); `cat /proc/loadavg` düşük (≤~6) mü — yüksek yük perf/TBT'yi bozar (a11y/CLS/LCP bozmaz)
  - Chrome flag'leri **şart:** `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader` (alt sayfa hero'ları da LivingFlow → software-WebGL crash'i önler)

- [ ] **2. a11y=100 çift-tema — 6 sayfa × 2 tema (S8 skor gate)**
  - Sayfalar: `/` · `/spor-salonu-yazilimi` · `/vaka-calismalari` · `/bunker-os` · `/bulten/ai-sdr-araclari` · `/bulten/claude-opus-4-8-fable-5`
  - light + dark ayrı koşu (kanonik LH dark render eder; light için `emulateMedia`/tema zorlama); `reducedMotion:'reduce'` + scroll ile tam envanter; TR `NEXT_LOCALE=tr` cookie
  - Beklenti: 12 koşunun tümü **a11y=100** (Faz 8 sonrası taban)

- [ ] **3. Perf korunan taban — home**
  - home mobil (`perf ~90 / LCP ~3164ms`) + home masaüstü (`perf 100`), CLS≈0; düşük yükte çok-koşu median
  - **Regresyon gate:** taban altına düşülmedi mi (ILKELER korunan taban); software-GL ortamında perf/TBT şişer (kıyas için baseline'ı aynı ortamda sabitle) — a11y/CLS/LCP ortam-bağımsız güvenilir

- [ ] **4. Kayıt & triyaj**
  - Skorları `docs/perf/README.md` tabanıyla kıyasla; sonucu task Oturum Kaydı + PHASE-9 notuna yaz
  - Brief mobil perf açığı (perf 90 vs ≥95 / LCP 3164ms vs <2.5s) senaryo testte **record-not-fix** (kök neden CPU-bound WebGL, gerçek-cihaz duvarı — DECISIONS 2026-06-30, TK7)

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

- [ ] Chrome flag'leri + host yükü disiplini uygulandı (loadavg düşük, çok-koşu median)
- [ ] 6 sayfa × 2 tema = 12 koşu **a11y=100** (veya <100 çıkarsa TK7 triyaj → düzeltme task'ı)
- [ ] home mobil perf ≥90 / LCP ≤~3164ms, home masaüstü perf 100, CLS≈0 — korunan taban altına düşülmedi
- [ ] Skorlar `docs/perf/` tabanı ile kıyaslandı; brief açığı record-not-fix kaydedildi
- [ ] Sonuçlar PHASE-9 + task doc'a yazıldı; TASK-9.03 axe gate'i ile çapraz-referanslandı

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

<!-- Task çalıştırıldığında (run-task) doldurulur. -->

---

**Oluşturulma:** 2026-07-02
