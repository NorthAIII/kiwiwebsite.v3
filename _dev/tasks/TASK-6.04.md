# TASK-6.04: Ara-ölç — L1+L2 sonrası median + L3/P2 karar gate

**Durum:** ⬜ Bekliyor
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

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️/🔴]

**Yapılanlar:**
-

**Sorunlar:**
-

**Kararlar:**
-

**Dosya Değişiklikleri:**
-

**Test Sonuçları:**
-

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
-

**Öğrenilenler:**
-

---

**Oluşturulma:** 2026-06-30
