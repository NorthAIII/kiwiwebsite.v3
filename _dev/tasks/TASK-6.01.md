# TASK-6.01: Ölç-önce — LCP elementi tespiti + TR `/` mobil perf taban

**Durum:** 🔴 Bloke (ölçüm ortamı yok — node/npm/Chrome; node'lu ortamda koşulacak)
**Modül:** M6 (modules/M6-SEO-Deploy.md) + M1 ölçüm hedefi
**Feature:** P1/P2 ölçüm temeli (lever önceliğini sabitler)
**Faz:** Phase 6 (phases/PHASE-6.md)
**Bağımlılıklar:** Yok (faz ilk task'ı)

---

## Hedef

Faz 6'nın bütün lever önceliği LCP elementinin ne olduğuna (hero metni mi static-flow zemini mi canvas mı) bağlı; bu **ampirik olarak teyitli değil** (mevcut `docs/perf/home-*-20260630.json` artefaktlarında `largest-contentful-paint-element` denetimi yok). Bu task element-denetimli Lighthouse koşusuyla LCP elementini sabitler ve TR `/` mobil perf/LCP **çalışma tabanını** (median, ölçüm-disiplinli) kaydeder. Kod değiştirmez — sonraki lever task'larının önceliğini ve karşılaştırma referansını üretir. LCP elementi sabitlendiğinde ve taban kaydedildiğinde tamamlanmış sayılır.

---

## Bağlam

Research (PHASE-6 "Araştırma Bulguları" + DECISIONS 2026-06-30) kök nedeni **CPU-bound WebGL main-thread** olarak tespit etti (mobil "Other" 3663ms vs masaüstü 1202ms, tek fark 4× CPU throttle; FCP 1657ms ama LCP 3604ms = 1.9s bloke boşluğu). İki lever seçildi: L1 (hero reveal transform-only, TASK-6.02) ve L2 (WebGL idle deferral, TASK-6.03). **L1'in etkisi LCP elementinin metin olmasına bağlı; L2 iki senaryoda da kazandırır.** Element teyit edilmeden lever önceliği netleşmez → research "ölç-önce" sıralamasını şart koştu (K-R4).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-6.md` — "Araştırma Bulguları" (kök neden, lever'lar, ölçüm notu)
- `_dev/docs/perf/README.md` — ölçüm metodolojisi (fresh prod build, `NEXT_LOCALE=tr` cookie, median, `cat /proc/loadavg`, Lighthouse npx-cache 13.3.0) + iki kanonik-koşu tuzağı
- `_dev/memory/a11y-olcum-tema-tuzagi.md` + locale tuzağı (MEMORY Teknik Tuzaklar) — ölçüm-disiplin

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-6.md` — Task Listesi tablosunda durumu güncelle + LCP elementi bulgusunu "Araştırma Bulguları"/"Dikkat Edilecekler"e işaretle (ampirik teyit)
- `_dev/docs/perf/README.md` — TR `/` mobil çalışma tabanı (element-denetimli) kaydı

---

## Alt Görevler

- [ ] **1. Fresh prod build + serve**
  - `rm -rf .next && npm run build && npm run start -- -p 4173` (dev build ile ÖLÇÜLMEZ)
  - Listening-PID teyidi (`ss -ltnp` / `lsof -i`) — stray `next-server` yanlış-negatifini ele (MEMORY Süreç Disiplinleri)
  - `cat /proc/loadavg` — düşük yük (≤~6) bekle

- [ ] **2. Element-denetimli Lighthouse koşusu (TR `/` mobil)**
  - `NEXT_LOCALE=tr` cookie ŞART (`--extra-headers='{"Cookie":"NEXT_LOCALE=tr"}'`) — cookie'siz `/en` ölçülür (DEV-6 dersi)
  - Koşu, çıktıda `largest-contentful-paint-element` denetimini **içermeli** (kürlü diagnostic set bu denetimi atlıyordu) → `--only-audits` daraltması varsa bu audit'i dahil et, yoksa tam audit setiyle koş
  - 3+ koşu → median; mobil preset (varsayılan, 4× CPU throttle)
  - Masaüstü teyit koşusu (regresyon referansı): aynı + `--preset=desktop`

- [ ] **3. LCP elementini sabitle + tabanı kaydet**
  - `largest-contentful-paint-element` audit çıktısından LCP elementini oku (hero `<h1>`/metin mi, canvas mı, static-flow zemini mi)
  - TR `/` mobil median perf/LCP/FCP/CLS/TBT'yi `docs/perf/README.md`'ye **çalışma tabanı** olarak kaydet (mevcut "TR `/` profili" satırıyla tutarlı; bu sefer element-denetimli)
  - PHASE-6 "Dikkat Edilecekler"de "LCP elementi ampirik teyitli DEĞİL" notunu **teyitli sonuçla** güncelle; lever önceliği çıkarımını yaz (metin → L1 yüksek etki; canvas → L2 baskın)

---

## Etkilenen Dosyalar

```
_dev/docs/perf/
└── README.md                          # TR `/` mobil element-denetimli çalışma tabanı eklenir — zaten var
_dev/phases/
└── PHASE-6.md                         # LCP elementi teyidi + lever önceliği notu — zaten var
(opsiyonel) _dev/docs/perf/
└── home-mobile-20260630-lcp.json      # YENİ — element-denetimli ham artefakt (kanıt; kanonik güncelleme 6.07'de)
```

> Kod dosyası DEĞİŞMEZ — bu bir ölçüm/teşhis task'ıdır.

---

## Dikkat Noktaları

- **Node/build bu oturum ortamında olmayabilir** (taze devcontainer — MEMORY Ortam Notları). Node yoksa task **🔴 Bloke**; node'lu ortamda koşulur. Tahminle "element şudur" YAZMA — ampirik teyit şart (research K-R4).
- **Locale tuzağı:** TR `/` için `NEXT_LOCALE=tr` cookie olmadan Lighthouse `/en` ölçer → yanlış sayfa. Regresyon karşılaştırmasında hep aynı locale.
- **Render dark:** kanonik `--headless=new` koşusu DARK render eder (a11y için önemli; perf/LCP için element aynı kalır ama bilinçli not).
- **Host yükü:** her koşuda `cat /proc/loadavg`; yüksek yük TBT/LCP/perf'i bozar (a11y/CLS'yi değil). Yüksek-yük koşularını ele, düşük-yük median al.
- **Lighthouse reduced-motion set etmez** → hero reveal (`opacity:0`) + full-yük WebGL ölçülür (gerçekçi en-kötü). Bu, L1'in neden ölçülebilir olduğunun nedeni.

---

## Test Kriterleri

- [ ] Fresh prod build temiz geçti (`next build` hatasız) + serve eden PID kendi process'in (teyitli)
- [ ] TR `/` mobil koşusu `NEXT_LOCALE=tr` ile yapıldı (finalUrl `/`, `/en` değil — artefakttan teyit)
- [ ] `largest-contentful-paint-element` audit çıktısı mevcut ve LCP elementi okundu (hero metni / canvas / static-flow zemini netleşti)
- [ ] TR `/` mobil median perf/LCP/FCP/CLS/TBT `docs/perf/README.md`'ye kaydedildi (düşük-yük, 3+ koşu)
- [ ] PHASE-6'da LCP elementi teyidi + lever önceliği çıkarımı yazıldı

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

**Durum:** 🔴 Bloke

**Yapılanlar:**
- Oturum başlangıç protokolü + komuta özgü dokümanlar okundu (PHASE-6 Araştırma Bulguları, perf/README metodolojisi, tema/locale ölçüm tuzakları).
- Ortam taraması yapıldı: ölçüm araç zinciri bu devcontainer'da yok. Her yol kontrol edildi (PATH, nvm, fnm, volta, /usr/bin, /usr/local/bin) → **node ❌, npm/pnpm/yarn ❌, google-chrome/chromium ❌**. Host yükü uygun (loadavg 1.12 / 20 çekirdek) — sorun yük değil, toolchain yokluğu.
- Kullanıcıya bağımlılık bloğu bildirildi; karar: **node'lu ortamda koş** (bu oturum pause, yeni oturumda run-task).

**Sorunlar:**
- TASK-6.01 saf ölçüm task'ı; fresh prod build (`npm run build`), serve (`npm run start`) ve element-denetimli Lighthouse koşusu (node + Chrome) gerektirir. Hiçbiri mevcut değil → ölçüm yapılamaz.
- Task dokümanı + research K-R4: LCP elementi **tahminle yazılamaz**, ampirik teyit şart. Bu yüzden "ilerleyip element varsayımı yazma" yolu kapalı — doğru hamle bloke.

**Kararlar:**
- Task 🔴 Bloke; kod/ölçüm değişikliği yapılmadı (ortam mutasyonu — node/Chrome kurulumu — kullanıcı tarafından bu oturumda istenmedi).
- Tahmin yok: LCP elementi ve TR `/` mobil taban ampirik koşuda sabitlenecek.

**Dosya Değişiklikleri:**
- `_dev/tasks/TASK-6.01.md` — durum 🔴 Bloke + bu oturum kaydı
- `_dev/phases/PHASE-6.md` — Task Listesi'nde 6.01 → 🔴 Bloke
- `_dev/DURUM.md` — bloke durumu + handoff notu

**Test Sonuçları:**
- Yok (ölçüm ortamı bloke). Kod değişmedi, build/test koşulamadı.

**Son Yaklaşım:**
- Ölçüm metodolojisi `docs/perf/README.md`'de hazır; tek eksik node+Chrome'lu ortam. Yaklaşım değişmiyor — node'lu ortamda alt görevler 1→2→3 sırayla koşulur.

**Sonraki Adım Detayı (node'lu ortamda devam):**
1. `rm -rf .next && npm run build && npm run start -- -p 4173` — fresh prod build + serve; listening-PID teyidi (`ss -ltnp`), `cat /proc/loadavg` düşük yük (≤~6).
2. Element-denetimli Lighthouse: TR `/` için `--extra-headers='{"Cookie":"NEXT_LOCALE=tr"}'` ŞART (cookie'siz `/en` ölçülür); çıktı `largest-contentful-paint-element` denetimini **içermeli** (tam audit set, daraltma yapma). 3+ koşu → median; mobil preset + masaüstü teyit (`--preset=desktop`).
3. LCP elementini audit çıktısından oku (tahmin yok), TR `/` mobil median perf/LCP/FCP/CLS/TBT'yi `docs/perf/README.md`'ye element-denetimli çalışma tabanı olarak yaz; PHASE-6 "Dikkat Edilecekler"deki "LCP elementi ampirik teyitli DEĞİL" notunu teyitli sonuçla güncelle + lever önceliği çıkarımı (metin → L1 yüksek; canvas → L2 baskın).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
-

**Öğrenilenler:**
-

---

**Oluşturulma:** 2026-06-30
