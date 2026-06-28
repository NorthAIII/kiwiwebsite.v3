# TASK-2.03: TD3 — Ana sayfa perf/Lighthouse doğrulama + taban kaydı

**Durum:** ✅ Tamamlandı
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

- [x] **1. Yerel production sunum** — `next build` temiz (37 route, exit 0); `next start -p 3000` (3001 doluydu, 3000 kullanıldı); `/` TR varsayılan render ✓ (HTTP 200, 57389 byte).

- [x] **2. Lighthouse ölçümü (mobil + masaüstü)** — npx-cache `lighthouse@13.3.0` (binary doğrudan çağrıldı; `npx --no-install` 13.4.0 çözüp kırıldığı için), `/usr/bin/google-chrome` (149), `--headless=new --no-sandbox`. Mobil 8× (host-gürültüsü nedeniyle; 3 temiz düşük-yük koşu taban), masaüstü 3× → temsilî/median.

- [x] **3. Artefaktları kaydet** — `_dev/docs/perf/` oluşturuldu; kanonik `home-mobile-20260628.{html,json}` + `home-desktop-20260628.{html,json}` + `README.md` (metodoloji + ham koşu tablosu + a11y kırılımı). INDEX'e eklendi.

- [x] **4. Bütçeye karşı değerlendir + taban kaydı** — Bütçe **KARŞILANMADI** (mobil perf 87<95, a11y 89<100 her iki preset, mobil LCP 3.1s>2.5s; CLS 0 ✓, masaüstü perf 100 ✓). Özet skor → PHASE-2 + DURUM. Bulgu kullanıcıya getirildi → **ertelendi** (Karar Noktaları); sessizce optimize edilmedi.

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

- [x] `next build && next start` temiz; ana sayfa yerel prod'da render oluyor
- [x] Mobil + masaüstü Lighthouse raporu üretildi ve `_dev/docs/perf/`'e kaydedildi (HTML + JSON, çoklu koşu → temsilî skor)
- [x] Skorlar bütçeye karşı değerlendirildi: perf ≥95 / a11y ≥100 / LCP < 2.5s / CLS ~0 (karşılanan/karşılanmayan net işaretli — bkz. Sonuç Özeti)
- [x] Özet skorlar PHASE-2.md + DURUM'a işlendi; INDEX'e `docs/perf/` eklendi
- [x] Bütçe karşılanmadı: bulgu kaydedildi (`docs/perf/README.md` + DECISIONS) + kullanıcıya getirildi → ertelendi (sessizce optimize/kapsam genişletme yok)

---

## Karar Noktaları

- **Bütçe karşılanmazsa (contingency):** Bir metrik (perf/a11y/LCP/CLS) bütçeyi tutturmazsa → **Kullanıcıya sor:** şimdi düzelt (ayrı optimizasyon task'ı) vs ayrı faza ertele. Optimizasyon bu fazın kapsamı dışı (discuss kararı); sessizce genişletme yok, bulgu + seçenekle kullanıcıya getirilir.
- **Artefakt evi:** `_dev/docs/perf/` (HTML+JSON) + PHASE-2/DURUM özet skorları (research kararı, DECISIONS 2026-06-28). İlk perf taban dokümanı bu task'ta doğar.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-28

**Durum:** ✅

**Yapılanlar:**
- `next build` temiz (37/37 route, exit 0) → `next start -p 3000` (3001 doluydu); `/` TR varsayılan HTTP 200 render.
- Lighthouse: npx-cache binary (`lighthouse@13.3.0`; `npx --no-install` `lighthouse@13.4.0` çözüp `package.json`'a dokunmadan kırıldığı için cache binary doğrudan `node .../cli/index.js` ile çağrıldı), Chrome 149, `--headless=new --no-sandbox`, kategoriler perf/a11y/best-practices/seo.
- **Masaüstü 3×:** perf 100/100/100, a11y 89, LCP ~0.69s, CLS 0, TBT ~0ms — stabil.
- **Mobil:** ilk 5 koşu **çok gürültülü** (perf 49–90, TBT 206↔5065ms). Kök neden: host load avg **88** (20 çekirdek, harici iş yükü — orphan process değil, kontrol edildi). Yük ~5'e inince 3 temiz koşu: perf 87/89/87, LCP ~3.1s, CLS 0, TBT ~300ms. Yüksek-yük koşuları host-gürültüsü olarak elendi; a11y (89) ve CLS (0) zaten 8 koşuda sabit (ortamdan bağımsız).
- Kanonik artefaktlar + `README.md` taban dokümanı `_dev/docs/perf/`'e; fazla numaralı koşular temizlendi (varyans README'de).
- **Bütçe değerlendirme:** KARŞILANMADI (mobil perf 87<95, a11y 89<100 her iki preset, mobil LCP 3.1s>2.5s; CLS 0 ✓, masaüstü tertemiz). 4 a11y denetimi başarısız (color-contrast / definition-list+dlitem / label-content-name-mismatch). Bulgu kullanıcıya getirildi → **hepsini ertele** (Karar Noktası; optimizasyon faz dışı). DECISIONS girdisi + perf/README + PHASE-2/DURUM/INDEX güncellendi.

**Son Yaklaşım:** Doğrulama task'ı — kod değişmedi. Taban ölçüldü+kaydedildi+bulgu ertelendi; task tamam.

**Sonraki Adım Detayı:** Fazın tüm task'ları (2.01/2.02/2.03) ✅ → `/devflow:verify-phase 2`. a11y+perf açığı ayrı adanmış faza (bulgu `docs/perf/README.md` + DECISIONS 2026-06-28'de kayıtlı).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-28

**Ne Yapıldı:**
- Ana sayfa Lighthouse tabanı (yerel prod build) ölçüldü + `_dev/docs/perf/`'e kaydedildi (mobil+masaüstü, HTML+JSON+README).
- **Özet skorlar:** Masaüstü perf **100** / LCP **0.69s** / CLS **0** (bütçeyi geçer). Mobil perf **87** / LCP **3.1s** / CLS **0**. Accessibility **89** (her iki preset).
- **Bütçe (≥95/≥100/<2.5s/~0): KARŞILANMADI** (mobil perf −8, a11y −11, mobil LCP +0.6s; CLS ✓). Regresyon değil — keşfedilen mevcut durum. Bulgu kullanıcıya getirildi → **ertelendi** (a11y+perf ayrı faza).

---

**Oluşturulma:** 2026-06-28
