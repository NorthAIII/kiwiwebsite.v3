# TASK-6.06: P2 — Living Flow mobil degradasyon ayarı (koşullu)

**Durum:** ⬜ Bekliyor
**Modül:** M1 (modules/M1-LivingFlow-TasarimSistemi.md) — Living Flow degradasyon
**Feature:** P2 — Living Flow mobil degradasyon ayarı (craft korunarak)
**Faz:** Phase 6 (phases/PHASE-6.md)
**Bağımlılıklar:** TASK-6.04 (ara-ölç) — **KOŞULLU:** yalnız L1+L2+L3 brief bütçesini karşılamadıysa koşulur; karşılandıysa bu task ❌ İptal (craft-duyarlı, gereksiz dokunma)

---

## Hedef

L1+L2 (ve L3) sonrası brief bütçesi (perf ≥95 / LCP <2.5s) hâlâ açıksa, Living Flow'un **mobil** degradasyon eşiklerini craft korunarak ayarla: DPR cap (`FlowCanvas.tsx` `dpr={[1, 1.6]}` / `uPixelRatio` min 1.6), "low" particle sayısı (200) ve/veya mobilde daha erken `static`'e düşme eşiği. Amaç WebGL render/init yükünü mobilde ölçülü azaltmak — **imza görsel kalitesini bozmadan** (agresif sadeleştirme veya tümüyle static'e zorlama discuss'ta reddedildi). Her değişim iki tema + cursor/scroll gözle doğrulanır; mobil perf/LCP ölçülebilir iyileşir, craft "kayıp" görünmez.

---

## Bağlam

Discuss kararı (PHASE-6 Kapsam): "önce çevre, sonra **ayarlı** degradasyon" — degradasyon ayarı kapsamda ama **craft korunarak**, yalnız L2 yetmediğinde. Research: "L2'nin yetmediği yerde P2". MODULE-MAP P2 (🔄). Bu task'ın gereği ve kapsamı 6.04 ara-ölçle belirlenir — **bu task plan'da koşullu olarak yer alır**; 6.04 brief'i karşıladıysa iptal edilir. Mevcut mobil ("low") zaten 9 eğri / 200 nabız; ayar bu eşiklerin ölçülü kısılmasıdır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-6.md` — Kapsam ("ayarlı degradasyon, craft korunur"), Kapsam Dışı ("agresif sadeleştirme reddedildi"), 6.04 kararı
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — F1.1/F1.2 kabul kriterleri (16/560 high, 9/200 low; DPR 1-1.6; "low" eşiği ≤4 çekirdek/≤768px)
- `src/components/living-flow/FlowCanvas.tsx` — DPR/particle/curve parametreleri (satır 205-211, 382-393); `uPixelRatio` cap (232, 245)
- `src/components/living-flow/LivingFlow.tsx` — mode seçimi / lowPower eşiği (satır 35-41)
- `_dev/tasks/archive/TASK-6.04.md` — ara-ölç açığı (ne kadar puan/ms gerekli)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-6.md` — Task Listesi tablosunda durumu güncelle
- `_dev/docs/DECISIONS.md` — degradasyon eşiği değişimi (craft-etkili karar)

---

## Alt Görevler

> Ön-koşul: 6.04 brief'i karşıladıysa bu task ❌ İptal — alt görevler koşulmaz, DURUM/PHASE-6'da iptal gerekçesi yazılır.

- [ ] **0. Gerek teyidi**
  - 6.04 ara-ölç açığını oku; brief karşılandıysa iptal; açıksa hangi lever'ın (DPR / particle / erken-static) en az craft-maliyetiyle açığı kapatacağını belirle

- [ ] **1. Ölçülü degradasyon ayarı (mobil)**
  - Adaylar (biri veya kombinasyonu, en az-craft-maliyetli olandan başla):
    - DPR cap mobilde düşür (`FlowCanvas.tsx` `dpr={[1, 1.6]}` mobilde örn. `[1, 1.25]`; `uPixelRatio` min ayarı)
    - "low" particle/curve sayısını ölçülü azalt (200 → ölçülü daha az; imza yoğunluğu korunacak kadar)
    - Mobilde `static`'e düşme eşiğini biraz genişlet (çok düşük güçte erken static — ama mobil-geneli static'e zorlama YOK)
  - **Tek seferde bir ayar** + ara gözle/ölç; agresif kombinasyon değil

- [ ] **2. Craft gözle doğrulama (iki tema + etkileşim)**
  - Mobilde flow yoğunluğu/akışı imza kalitesinde mi (light + dark); nabızlar/eğriler "seyrelmiş/ucuz" görünmüyor mu
  - Cursor bükme + scroll parallax tam çalışıyor mu (ayar etkileşimi bozmamalı)

---

## Etkilenen Dosyalar

```
src/components/living-flow/
├── FlowCanvas.tsx     # DPR cap / particle-curve sayısı (mobil) — zaten var
└── LivingFlow.tsx     # (gerekirse) mode/eşik ayarı — zaten var
```

---

## Dikkat Noktaları

- **Craft tavan (pazarlık dışı, bu task'ın merkezi):** agresif sadeleştirme / mobilde tümüyle static reddedildi (PHASE-6 Kapsam Dışı). Ayar **ölçülü** + her adım gözle. Çatışmada craft kazanır, açık bilinçle belgelenir (milestone).
- **Koşullu task:** 6.04 brief'i karşıladıysa dokunma (❌). Craft-duyarlı alana gereksiz müdahale = risk.
- **CLS / masaüstü regresyonsuz:** masaüstü perf 99-100 düşmemeli (ayar mobil-only); CLS=0.
- **i18n parite:** kod-only → bozulmaz.
- **Determinizm:** `mulberry32(1337)` seed sabit — particle/curve sayısı değişince alan deseni değişir (yeni ama deterministik); gözle imza korunmalı.

---

## Karar Noktaları

- **Hangi lever:** DPR cap vs particle azaltma vs erken-static. → En az craft-maliyetiyle açığı kapatan; öneri DPR cap (görsel etki en düşük) önce dene. Seçim 6.04 açığına + gözle craft'a bağlı; DECISIONS'a yaz.
- **Brief'e yine ulaşılamazsa:** craft tavan gereği daha fazla zorlanmaz; kalan açık `docs/DECISIONS.md` + `docs/perf/README.md`'de bilinçle kaydedilir (v0.1 dürüst-kayıt deseni, milestone).

---

## Risk ve Geri Dönüş Planı

- **Risk:** degradasyon imzayı "ucuzlatır" (craft düşer) → ayarı geri al, daha hafif lever dene; çözülmezse kullanıcıya getir (craft üst eksen).
- **Risk:** particle/curve değişimi deseni beklenmedik bozar → gözle iki tema; kötüyse revert.
- **Rollback:** `git checkout -- src/components/living-flow/`.

---

## Tamamlanma Kriterleri

- [ ] Gerek teyidi yapıldı (koşullu — iptal ise gerekçe yazıldı)
- [ ] Tüm alt görevler tamamlandı (koşuluyorsa)
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Test Kriterleri

- [ ] (koşuluyorsa) `next build` temiz geçer
- [ ] Mobil flow imza kalitesinde — nabız/eğri "seyrelmiş/ucuz" değil (light + dark gözle)
- [ ] Cursor bükme + scroll parallax tam çalışır (ayar sonrası)
- [ ] Mobil perf/LCP ölçülebilir iyileşti (6.04'e göre delta; faz-sonu 6.07'de doğrulanır)
- [ ] Masaüstü perf 99-100 + CLS=0 regresyonsuz
- [ ] (iptal ise) iptal gerekçesi DURUM + PHASE-6'da kayıtlı

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/❌/🔄/⏸️/🔴]

**Yapılanlar:**
-

**Sorunlar:**
-

**Kararlar:**
- docs/DECISIONS.md'ye eklendi: [Evet/Hayır]

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
