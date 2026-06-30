# TASK-6.04: Ara-ölç — L1+L2 sonrası median + L3/P2 karar gate

**Durum:** ✅ Tamamlandı
**Modül:** M6 (modules/M6-SEO-Deploy.md) — ölçüm
**Feature:** P1/P2 ara-değerlendirme (karar kapısı)
**Faz:** Phase 6 (phases/PHASE-6.md)
**Bağımlılıklar:** TASK-6.02 (L1) ✅ + TASK-6.03 (L2) ✅

---

## Hedef

L1 (hero reveal transform-only) + L2 (WebGL idle deferral) uygulandıktan sonra TR `/` mobil perf/LCP'yi yerleşik metodolojiyle (median, `NEXT_LOCALE=tr` cookie, element-denetimli) **yeniden ölç**; 6.01 tabanıyla karşılaştır. Bu task bir **karar kapısıdır**: brief bütçesine (perf ≥95 / LCP <2.5s) ulaşıldıysa L3/P2 atlanabilir (yalnız craft-nötr L3 hijyen için yine de yapılabilir); açık kaldıysa kalan açığı ölç ve L3 (TASK-6.05) + P2 (TASK-6.06) gereğini netleştir. Kod değiştirmez. Median kaydedilip L3/P2 kararı yazıldığında tamamlanır.

---

## Bağlam

Research sırası (PHASE-6 K-R4): ölç-önce → L1/L2 → **ara-ölç** → gerekirse L3/P2. L1/L2 en yüksek etkili craft-koruyucu lever'lar; etkileri ölçülmeden L3 (craft-nötr yardımcı, görece küçük kazanç) ve P2 (degradasyon ayarı, craft-duyarlı) gereği bilinmez. P2 özellikle craft-duyarlı → yalnız gerçekten gerekiyorsa ve ölçülü yapılır (discuss kararı).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-6.md` — Milestone (brief hedef / craft tavan), guardrail'ler
- `_dev/docs/perf/README.md` — ölçüm metodolojisi + 6.01'de eklenen çalışma tabanı
- `_dev/tasks/archive/TASK-6.01.md` — taban değerleri + LCP elementi (karşılaştırma referansı)
- `_dev/ILKELER.md` §2 — perf "korunan taban ≠ brief hedefi"; craft üst eksen

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + ara-ölç sonucu + L3/P2 kararı
- `_dev/phases/PHASE-6.md` — Task Listesi durumu + ara-ölç sonucu; L3/P2 gerek/kapsam kararı
- `_dev/docs/perf/README.md` — L1+L2 sonrası TR `/` mobil median (ara-ölç kaydı)

---

## Alt Görevler

- [ ] **1. Fresh prod build + serve (6.01 ile aynı disiplin)**
  - `rm -rf .next && npm run build && npm run start -- -p 4173`; listening-PID + `cat /proc/loadavg` (düşük yük)

- [ ] **2. TR `/` mobil + masaüstü median ölçüm**
  - `NEXT_LOCALE=tr` cookie; element-denetimli (LCP elementinin kaydığını/değiştiğini gör); 3+ koşu median
  - Masaüstü teyit (regresyon: perf 99-100 düşmedi mi); CLS=0 teyit
  - 6.01 tabanıyla yan-yana karşılaştır (perf/LCP/FCP/TBT delta)

- [ ] **3. Karar kapısı: L3/P2 gerek**
  - Brief bütçesi (perf ≥95 / LCP <2.5s) **karşılandı mı**? → karşılandıysa: L3 craft-nötr hijyen olarak yine de yapılır (TASK-6.05), P2 (TASK-6.06) **iptal** (❌, craft-duyarlı, gereksiz dokunma) önerilir
  - Açık kaldıysa: kalan açığı (kaç puan / kaç ms) yaz; L3 kazancını + P2 (degradasyon ayarı) gereğini PHASE-6'da netleştir
  - Kararı DURUM + PHASE-6'ya yaz (sonraki task'lar bu karara göre koşar/iptal olur)

---

## Etkilenen Dosyalar

```
_dev/docs/perf/
└── README.md        # L1+L2 sonrası ara-ölç median kaydı — zaten var
_dev/phases/
└── PHASE-6.md       # ara-ölç sonucu + L3/P2 karar — zaten var
```

> Kod dosyası DEĞİŞMEZ — ölçüm/karar task'ı.

---

## Dikkat Noktaları

- **Node/build yoksa 🔴 Bloke** (MEMORY Ortam Notları) — node'lu ortamda koşulur.
- **Locale tuzağı:** `NEXT_LOCALE=tr` cookie şart; karşılaştırmada hep aynı locale (6.01 ile aynı).
- **Apples-to-apples:** 6.01 ile **aynı sayfa + aynı method** karşılaştırılır; aksi halde delta anlamsız.
- **Craft önce:** brief'e ulaşılsa bile craft gözle korundu mu (L1/L2 zaten 6.02/6.03'te doğrulandı; burada regresyon teyidi).
- **Host yükü:** `cat /proc/loadavg` her koşuda; yüksek-yük koşularını ele.

---

## Test Kriterleri

- [ ] L1+L2 sonrası TR `/` mobil median ölçüldü (`NEXT_LOCALE=tr`, 3+ koşu, düşük yük)
- [ ] 6.01 tabanıyla delta hesaplandı (perf/LCP/FCP/TBT) ve `docs/perf/README.md`'ye yazıldı
- [ ] Masaüstü perf 99-100 + CLS=0 regresyonsuz teyit
- [ ] Brief bütçesi durumu (karşılandı/açık) net; L3/P2 gerek kararı DURUM + PHASE-6'ya yazıldı

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- Ortam tarandı: bu sefer node 20.20.2 + npm 10.8.2 + Chrome 150.0.7871.46 + node_modules (875M) + LH 13.3.0 npx-cache **hazır** (6.01'deki gibi kurulum gerekmedi; `npm install` yok → `package-lock.json` dokunulmadı, git diff temiz).
- Fresh prod build (`rm -rf .next && npm run build`, temiz, 37 sayfa) + serve `:4173` (listening-PID 37141 = kendi process'im, `ss -ltnp` teyit). TR `/` `NEXT_LOCALE=tr` cookie (finalUrl `/` teyit, redirect yok). Düşük yük (load 0.9–1.4).
- Element-denetimli Lighthouse: 5 mobil + 3 masaüstü koşu (tam audit set → `lcp-breakdown-insight` dahil), median. Median mobil artefakt kaydedildi (`home-mobile-20260630-6.04-ara.json`).

**Bulgular:**
- **L1+L2 ölçülebilir Lantern delta üretmedi.** Mobil median: perf **62** (6.01: 62), LCP **3615ms** (6.01: 3608, +7ms gürültü), FCP **1665ms** (−1), CLS **~7.3e-6 (≈0)**, TBT **1898ms** (+56 gürültü). LCP elementi değişmedi (`<p data-hero="sub">`). Masaüstü: perf **100** (6.01: 99, guardrail ✓), LCP 696ms, CLS≈0, LCP elementi `<span data-hero="l2">`.
- **Kök neden kanıtlı — Lantern simülasyon artefaktı:** mobil LCP 3.6s, throttle'sız gözlenen trace'te değil **simüle**. LCP breakdown elementRenderDelay 6.01=**173.3ms** / 6.04=**172.9ms** birebir → hero metni gözlemde zaten ~185ms'de render. L1 opacity-gate'i kaldırdı ama o gate observed trace'te darboğaz değildi (un-throttled reveal hızlı). L2 `requestIdleCallback({timeout:2000})` throttle'sız thread hemen boşaldığı için anında ateşler → WebGL erken yakalanır → Lantern LCP penceresinde bloke iş olarak simüle eder (TBT 1898≈1842 birebir). İkisi de gerçek-cihaz-doğru, lab göremiyor.

**Sorunlar:**
- Beklenmedik "delta yok" sonucu yanlış-pozitif sanılabilirdi; LCP elementi + breakdown + L1/L2 commit (514c129/1605337) + observed renderDelay birebir-eşitlik üçlüsüyle kök neden Lantern artefaktı olarak kanıtlandı (tahmin değil). L1'in build'de olduğu commit'ten teyitli (runtime snippet'te opacity:0 yokluğu yanıltıcı — LCP anında GSAP reveal zaten bitmiş).

**Kararlar (karar kapısı çıktısı):**
- Brief LCP bütçesi (<2.5s) lab'da **AÇIK** (mobil ~3.6s, CPU-bound WebGL Lantern simülasyonu). L1+L2 korunur (regresyon yok, gerçek-cihaz-doğru).
- **L3 (6.05): YAP** — craft-nötr hijyen; lab LCP'yi oynatmaz ama güvenli/doğru.
- **P2 (6.06): TETİKLENDİ ama craft-gate** — lab'da simüle-LCP'yi azaltabilecek tek kalan lever (WebGL iş yükü) ama craft-duyarlı + gerekçe Lantern-simüle sayıya dayanıyor → kullanıcı craft-onayı önerilir, otomatik koşulmaz. İptal değil.
- Metodolojik duvar dürüst kaydedildi: bu lab LCP ekseninde lever ilerlemesini güvenilir ölçemez → gerçek doğrulama gerçek-cihaz/Vercel field.

**Dosya Değişiklikleri:**
- `_dev/docs/perf/README.md` — Faz 6 / TASK-6.04 ara-ölç bölümü (yan-yana tablo + Lantern artefaktı kanıtı + karar) + üst pointer
- `_dev/docs/perf/home-mobile-20260630-6.04-ara.json` — YENİ, median mobil ham artefakt
- `_dev/phases/PHASE-6.md` — Task tablosu 6.04 → ✅, 6.05/6.06 karar notu; "Ara-Ölç Sonucu ve L3/P2 Kararı" bölümü; footer
- `_dev/tasks/TASK-6.04.md` — durum ✅ + bu oturum kaydı + sonuç özeti
- `_dev/DURUM.md` — task ✅, adım `task` (sıradaki 6.05), son task özetleri

**Test Sonuçları:**
- `next build` temiz (37 sayfa, 0 MISSING_MESSAGE). Serve-PID teyitli. 8 element-denetimli LH koşusu geçerli (runtimeError yok). **Kod değişmedi** (saf ölçüm/karar task'ı) → regresyon riski yok; guardrail teyidi: masaüstü perf 100, CLS≈0, mobil LCP/FCP taban-bandında.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- L1+L2 sonrası TR `/` mobil/masaüstü element-denetimli ara-ölç alındı (aynı ortam/method 6.01 ile apples-to-apples); kod değişmedi.
- L1+L2'nin ölçülebilir Lantern delta üretmediği **kanıtlandı** (observed renderDelay birebir 173↔173ms) ve kök neden Lantern simülasyon artefaktı olarak sabitlendi. Karar kapısı: brief LCP lab'da açık → L3 yapılır, P2 tetiklendi ama craft-gate (kullanıcı onayı).

**Öğrenilenler:**
- **Lighthouse mobil Lantern, `requestIdleCallback` idle-deferral'ını ve opacity-gate kaldırmayı bu kurulumda ölçemez:** observed trace throttle'sız alınır (thread hemen boşalır → rIC anında ateşler; reveal hızlı tamamlanır), sonra 4× CPU throttle *simüle* edilir → gerçek-cihaz kazancı lab skoruna yansımaz. Gerçek-cihaz-doğru lever'ı lab "etkisiz" gösterebilir; bu lab limiti, lever hatası değil.
- Lab'da CPU-bound WebGL simüle-LCP'yi düşürmenin tek yolu **gerçek iş yükünü** azaltmak (P2 degradasyon) — render-zamanlama lever'ları (L1/L2) Lantern'de görünmez. Perf bütçesinin temiz doğrulaması gerçek-cihaz/field gerektirir.

---

**Oluşturulma:** 2026-06-30
