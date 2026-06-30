# Phase 6: Mobil Perf / LCP (ana sayfa TR `/`)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluştu; durum 🔄 ile başlar. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-6-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır. Tamamlandıktan (✅) sonra bölme yasaktır. -->

---

## Genel Bilgiler

**Amaç:** Ana sayfa **TR `/` mobil** Lighthouse perf/LCP skorunu brief bütçesine (perf ≥95 / LCP <2.5s) yaklaştırmak. Perf'in ana kaynağı Living Flow WebGL (M1) — craft-duyarlı, tek üst eksen. Bu faz craft'ı bozmadan ölçülebilir mobil perf iyileşmesi hedefler; gerçek çatışmada craft kazanır ve kalan açık bilinçle belgelenir.

**Milestone:** Ana sayfa TR `/` mobil perf/LCP **ölçülebilir biçimde iyileşir** (yerleşik metodoloji ile median, `NEXT_LOCALE=tr` cookie). Hedef brief bütçesi (perf ≥95 / LCP <2.5s); Living Flow imzası gözle korunduğu sürece mümkün olduğunca yaklaşılır. Korunan tabanlar regresyonsuz: a11y=100 çift-tema, CLS=0, masaüstü perf 99-100. Brief hedefine ulaşılamazsa kalan açık `docs/DECISIONS.md` + `docs/perf/README.md`'de bilinçle kaydedilir (v0.1 dürüst-kayıt deseni).

### Feature Listesi

(MODULE-MAP `— v0.2 mobil perf iş birimleri —` + `modules/M1`, `modules/M6` referansı)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| P1: WebGL-dışı mobil perf kazanımları | M6 (+M1) | Font yükleme, JS bundle, asset, render-path optimizasyonu — imzaya dokunmadan (yaklaşımın ilk adımı) |
| P2: Living Flow mobil degradasyon ayarı | M1 | Mobil degradasyon eşiklerinin (DPR cap, particle sayısı, erken static) craft korunarak ayarlanması (ikinci adım, ihtiyaç + gözle doğrulamaya bağlı) |

> Not: Kesin iş birimleri (özellikle LCP elementi ve hangi lever'ların gerçekten etkili olduğu) **research-phase**'de ampirik tespitle netleşir; yukarıdaki P1/P2 yaklaşımın iki adımını temsil eden kovalardır.

---

## Kapsam Tartışması

> `/devflow:discuss-phase 6` oturumunda dolduruldu (2026-06-30).

### Alınan Kararlar

- **Perf hedefi çerçevesi = "brief hedef, craft tavan".** perf ≥95 / LCP <2.5s hedeflenir ama Living Flow imzasını bozmadan; gerçek çatışmada craft kazanır (ILKELER #1 tek üst eksen + §2 perf "korunan taban ≠ brief hedefi" nüansı). Kalan açık bilinçle belgelenir — sessizce ne hedef düşürülür ne de craft feda edilir.
- **Living Flow'a müdahale = "önce çevre, sonra ayarlı degradasyon".** Önce WebGL-dışı kazanımlar (font/JS bundle/asset/render-path); sonra mobil degradasyon eşikleri (DPR cap, particle, erken static) craft korunarak ayarlanır. Living Flow craft-duyarlı, aceleyle dokunulmaz; her craft-etkili değişim iki tema + cursor/scroll etkileşimi **gözle** doğrulanır.
- **Sayfa kapsamı = yalnız ana sayfa, TR `/` mobil-birincil.** Taban/track noktası ve en ağır sayfa burası (`/en`'den uzun hero metni → daha ağır); masaüstü zaten bütçede. Alt-sayfa perf profili sonraki faza bırakıldı.
- **LCP elementi research'te tespit edilir.** Hero metni mi static flow zemini mi olduğu ampirik bilinmiyor; discuss'ta varsayım yapılmadı, optimizasyon research bulgusuna göre hedeflenir.
- **Ölçüm/kabul metodolojisi yerleşik (`docs/perf/README.md`).** TR `/` mobil median · `NEXT_LOCALE=tr` cookie (yoksa `/en` ölçülür — DEV-6 dersi) · fresh prod build (`rm -rf .next && next build && next start`) · düşük host-yük (`cat /proc/loadavg`) · 3+ koşu median · regresyon karşılaştırmasında hep aynı locale. Faz sonunda kanonik perf artefaktları (`home-{mobile,desktop}-<tarih>.{html,json}`) güncellenir.

### Kullanıcı Tercihleri

- Hedef sertliği: **Brief hedef, craft tavan** (üç seçenek arasından — kesin-≥95 ve yalnız-regresyonsuz reddedildi).
- Living Flow müdahalesi: **Önce çevre, sonra ayarlı degradasyon** (agresif sadeleştirme ve "yalnız WebGL-dışı" reddedildi — degradasyon ayarı kapsamda ama craft korunarak).
- Sayfa kapsamı: **Yalnız ana sayfa (TR `/` mobil-birincil)** (alt sayfalar dahil değil).
- Türetilen kapsam (milestone craft-tavan çerçevesi, guardrail'ler, kapsam dışı — hero kopyası dokunulmaz, font/render-path serbest) açıkça onaylandı.

### Guardrail (regresyon yasağı — pazarlık dışı)

- **a11y = 100 çift-tema** (Faz 4 kazanımı) — CI a11y job (`.github/workflows/ci.yml`) her push/PR'da otomatik yakalar.
- **CLS = 0** (ortam-bağımsız, en güvenilir sinyal).
- **Masaüstü perf 99-100** — düşmez.
- **i18n parite** — perf işi içerik anahtarına dokunmamalı; dokunursa 5 dil (tr/en/ar/de/es) eşzamanlı (i18n parite tohumu otomatik yakalar). Yalnız değer değil **anahtar** karşılaştırılır.

### Kapsam Dışı

- **Umami analytics (E1)** — ayrı iş kolu/faz (`docs/UMAMI-ANALYTICS.md`).
- **Alt-sayfa perf profili** — bu faz ana sayfa-birincil; alt sayfalar sonraki faza.
- **Alt-sayfa derin a11y + `text-pulse` ink-panel dark-inversion süpürmesi** (Faz 4 devri, sahipli borç) — perf fazı değil; harness hazır, sonraki a11y/alt-sayfa fazına yönlendirildi.
- **Hero kopyası / içerik değişikliği** — içerik Faz 1'de donduruldu; TR hero ağırlığı kopya kısaltarak değil font yükleme/render-path ile ele alınır (craft/marka sesi korunur).
- **Masaüstü perf** — zaten brief bütçesinde (99-100 / LCP <0.8s).
- **Living Flow'un agresif/cömert sadeleştirilmesi veya mobilde tümüyle static'e zorlanması** — craft tavan kararıyla reddedildi (degradasyon ayarı yalnız craft korunarak, ölçülü).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 6` oturumunda doldurulacak. Kritik araştırma soruları: (1) TR `/` mobilde LCP elementi nedir (hero metni / static flow zemini / font)? (2) Hangi WebGL-dışı lever'lar (font display/preload, JS bundle splitting, asset) en yüksek etkili? (3) Living Flow mobil degradasyon eşikleri (mevcut: ≤4 çekirdek/mobil → low; DPR 1-1.6) craft kaybı olmadan ne kadar düşürülebilir?

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 6` oturumunda doldurulacak.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | (henüz yok) | — | research → plan akışında oluşacak |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 6` oturumunda doldurulacak.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 6` oturumunda doldurulacak.

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 6` oturumunda doldurulacak.

---

## Sonuç

> Bu bölüm `/devflow:review-phase 6` oturumunda doldurulacak.

---

**Oluşturulma:** 2026-06-30
**Son Güncelleme:** 2026-06-30 — discuss-phase 6: kapsam tartışması tamamlandı.
