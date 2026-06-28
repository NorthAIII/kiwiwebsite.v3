# TASK-2.03: TD3 — Ana sayfa perf/Lighthouse doğrulama + taban kaydı

**Durum:** ⬜ Bekliyor
**Modül:** M6 SEO & Deploy — `modules/M6-SEO-Deploy.md`
**Feature:** TD3: Performans/Lighthouse doğrulama
**Faz:** Phase 2 (phases/PHASE-2.md)
**Bağımlılıklar:** TASK-2.01, TASK-2.02 (tercihen sonra — taban final v0.1 i18n durumunu yansıtsın; teknik bağımlılık yok, render etkisi nötr)

---

## Hedef

Ana sayfayı **yerel production build** üzerinde mobil + masaüstü Lighthouse ile ölç; brief performans bütçesini (≥95 perf / ≥100 a11y / LCP < 2.5s / near-zero CLS) karşılayıp karşılamadığını doğrula ve **tabanı kaydet** (artefakt + özet skor). Bu bir **doğrulama** task'ıdır — optimizasyon kapsam **dışı**. Raporlar `_dev/docs/perf/`'e kaydedilip özet skorlar PHASE-2 + DURUM'a işlendiğinde tamamlanmış sayılır.

---

## Bağlam

v0.1 versiyon-sonu "regresyon yok / korunan taban" teyidi (ILKELER). Kayıtlı önceki Lighthouse ölçümü **yok** → çerçeve saf önce/sonra regresyon-karşılaştırması değil, **"taban oluştur + bütçeyi karşıla"**. Revize branch canlıya deploy olmuyor (kiwiailab.com eski kodu yansıtır) → ölçüm yerelde. Ortam araştırmada hazır teyit edildi: `lighthouse@13.3.0` npx cache'te (dep değil), `/usr/bin/google-chrome` (149) mevcut. Ana risk: Living Flow WebGL (ağır canvas) — Lighthouse mobil 4× CPU-throttle TBT/LCP'yi zorlar.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-2.md` — "Araştırma Bulguları → TD3" (seçilen ortam, araçlar, Living Flow/CLS riskleri, bütçe-karşılanmazsa contingency)
- `_dev/modules/M6-SEO-Deploy.md` — F6.3/F6.4 (build, deploy modeli, perf bütçesi teknik notu)
- `_dev/ILKELER.md` — perf/a11y "korunan taban" (regresyon yok)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet skorlar
- `_dev/phases/PHASE-2.md` — Task Listesi tablosunda durum + özet skor tablosu
- `_dev/INDEX.md` — yeni `docs/perf/` içerik dokümanı kaydı (Bilgi Havuzu)
- `_dev/docs/DECISIONS.md` — yalnız ölçümden yeni bir karar/bulgu çıkarsa (örn. bütçe karşılanmadı + ertelendi)

---

## Alt Görevler

- [ ] **1. Yerel production sunum**
  - `next build && next start` (port 3000; doluysa `next start -p <açık-port>`)
  - Ana sayfa (TR varsayılan, `/`) yerel prod'da render olmalı (dev build ile ÖLÇÜLMEZ — HMR/minify-yok perf'i bozar)

- [ ] **2. Lighthouse ölçümü (mobil + masaüstü)**
  - Mobil: `npx lighthouse http://localhost:3000/ --output=json --output=html --output-path=...` (varsayılan mobil preset)
  - Masaüstü: aynı, `--preset=desktop`
  - Chrome: `/usr/bin/google-chrome` (gerekirse `--chrome-path`/`--chrome-flags`)
  - **Stabilite:** her preset 2-3× çalıştırılıp temsilî/median skor kaydedilir (tek atış gürültülü)

- [ ] **3. Artefaktları kaydet**
  - `_dev/docs/perf/` klasörü oluştur (YENİ); HTML + JSON raporları buraya kaydet (anlamlı isim: `home-mobile-<...>.{html,json}`, `home-desktop-...`)
  - INDEX'e içerik dokümanı olarak ekle

- [ ] **4. Bütçeye karşı değerlendir + taban kaydı**
  - perf ≥95 / a11y ≥100 / LCP < 2.5s / CLS ~0 karşılanıyor mu?
  - Özet skor tablosu → PHASE-2.md + DURUM
  - **Bütçe karşılanmazsa:** bulgu kaydedilir + kullanıcıya getirilir (bkz. Karar Noktaları) — sessizce optimize edilmez

---

## Etkilenen Dosyalar

```
_dev/docs/perf/                          # YENİ klasör
├── home-mobile-<tarih>.html / .json     # YENİ (Lighthouse mobil raporu)
└── home-desktop-<tarih>.html / .json    # YENİ (Lighthouse masaüstü raporu)
_dev/INDEX.md                            # docs/perf/ kaydı eklenir
_dev/phases/PHASE-2.md                   # özet skor tablosu
_dev/DURUM.md                            # özet skor
```

> **Uygulama kodu değişmez** — bu doğrulama+ölçüm task'ıdır. `package.json`'a **lighthouse EKLENMEZ** (npx cache, dokunulmaz dep kuralı).

---

## Dikkat Noktaları

- **Yerel taban okuması.** localhost ağ-iyimser (CDN/latency yok) → perf skoru "yerel taban"; a11y ortamdan bağımsız (en güvenilir). Mobil preset 4× CPU-throttle uygular → yine anlamlı.
- **Living Flow WebGL ana perf riski.** Ağır canvas/partikül; Lighthouse `prefers-reduced-motion` set etmez → tam-WebGL gerçekçi en-kötü durum ölçülür (lazy+degradable olsa da).
- **CLS kaynakları:** canvas + webfont (Fraunces/Geist) swap → near-zero CLS'yi raporla teyit et.
- **`package.json` dokunulmaz.** `npx lighthouse` cache'ten çalışır; dep eklenmez. `next.config.ts`/`tsconfig.json` da dokunulmaz.
- **dev build ile ölçme.** Yalnız `next build` + `next start`.
- **Optimizasyon kapsam dışı.** Bu task ölçer ve kaydeder; bütçe açığı çıkarsa düzeltme ayrı karar (Karar Noktaları).

---

## Test Kriterleri

- [ ] `next build && next start` temiz; ana sayfa yerel prod'da render oluyor
- [ ] Mobil + masaüstü Lighthouse raporu üretildi ve `_dev/docs/perf/`'e kaydedildi (HTML + JSON, her preset 2-3× → temsilî skor)
- [ ] Skorlar bütçeye karşı değerlendirildi: perf ≥95 / a11y ≥100 / LCP < 2.5s / CLS ~0 (karşılanan/karşılanmayan net işaretli)
- [ ] Özet skorlar PHASE-2.md + DURUM'a işlendi; INDEX'e `docs/perf/` eklendi
- [ ] Bütçe karşılanmadıysa: bulgu kaydedildi + kullanıcıya getirildi (sessizce optimize/kapsam genişletme yok)

---

## Karar Noktaları

- **Bütçe karşılanmazsa (contingency):** Bir metrik (perf/a11y/LCP/CLS) bütçeyi tutturmazsa → **Kullanıcıya sor:** şimdi düzelt (ayrı optimizasyon task'ı) vs ayrı faza ertele. Optimizasyon bu fazın kapsamı dışı (discuss kararı); sessizce genişletme yok, bulgu + seçenekle kullanıcıya getirilir.
- **Artefakt evi:** `_dev/docs/perf/` (HTML+JSON) + PHASE-2/DURUM özet skorları (research kararı, DECISIONS 2026-06-28). İlk perf taban dokümanı bu task'ta doğar.

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldurulacak]

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
- [Kısa özet — taban skorlar]

---

**Oluşturulma:** 2026-06-28
