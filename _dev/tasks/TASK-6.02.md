# TASK-6.02: L1 — Hero reveal opacity → transform-only

**Durum:** ⬜ Bekliyor
**Modül:** M2 (modules/M2-Sayfalar-Bolumler.md) — Hero; craft M1 imzası
**Feature:** P1 — WebGL-dışı mobil perf kazanımı (LCP)
**Faz:** Phase 6 (phases/PHASE-6.md)
**Bağımlılıklar:** TASK-6.01 (LCP elementi teyidi — önceliği netleştirir; element=metin ise bu task en yüksek etki)

---

## Hedef

`src/components/Hero.tsx`'teki giriş reveal animasyonu hero `<h1>`'i `gsap.set("[data-hero]", { opacity: 0, y: 36 })` ile server-render sonrası **opacity:0**'a çekiyor; bu, elementi LCP adaylığından çıkarıp LCP'yi geç paint'e (reveal/hydration/ağır WebGL bundle'ına bağlı) kaydırıyor. Bu task reveal'i **transform-only** yapar: `opacity:0` kaldırılır, kayma (`y`) imza hareketi korunur. Headline LCP-uygun kalır, koreografinin görsel kimliği (yukarı kayarak belirme) yaşar — yalnız fade kaybolur (kullanıcı onayı). İmza reveal iki temada + cursor/scroll etkileşiminde gözle korunduğunda ve build temiz geçtiğinde tamamlanır.

---

## Bağlam

Research K-R1 (PHASE-6 + DECISIONS 2026-06-30): `opacity:0` LCP adaylığını kırar, transform LCP-nötr. En yüksek etkili, **craft-koruyucu**, WebGL-bağımsız lever. Lighthouse `prefers-reduced-motion` set etmediği için reveal ölçümde de çalışır (`docs/perf/README.md`) → fix ölçülebilir. Reddedilenler: headline'ı reveal'den çıkarmak (koreografi headline'da kaybolur); reveal'e dokunmadan yalnız WebGL deferral (metin LCP ise ceza kalır).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-6.md` — "Araştırma Bulguları" L1 + K-R1, "Dikkat Edilecekler" (craft tavan)
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — imza/craft çıtası (Hero arkası Living Flow)
- `src/components/Hero.tsx` — mevcut reveal timeline (satır 15-28)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-6.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [ ] **1. Reveal'i transform-only yap**
  - `Hero.tsx:18` `gsap.set("[data-hero]", { opacity: 0, y: 36 })` → `opacity:0`'ı kaldır (yalnız `{ y: 36 }` kalır)
  - Timeline `.to(...)` adımlarındaki `opacity: 1` hedeflerini kaldır/`y: 0`-only yap (satır 21-25) — elementler başlangıçta görünür (opacity 1) kalmalı, yalnız `y` ile kayar
  - Reduced-motion erken-return (`Hero.tsx:16`) korunur (zaten reveal'i atlar)
  - Stagger zamanlaması (0.15/0.32/0.55/0.7/0.85) ve ease (`power3.out`) — imza timing korunur, değiştirilmez

- [ ] **2. Craft gözle doğrulama (iki tema + etkileşim)**
  - Local prod build/preview'da hero giriş animasyonunu **light + dark** izle: yukarı kayma imzası akıcı mı, "snap"/bozuk görünmüyor mu
  - Cursor hover + scroll'da Living Flow + hero etkileşimi bozulmadı mı
  - Headline ilk frame'de görünür mü (LCP-uygun); reduced-motion'da statik (kayma yok) mu

---

## Etkilenen Dosyalar

```
src/components/
└── Hero.tsx       # reveal opacity:0 kaldırılır, transform-only — zaten var
```

---

## Dikkat Noktaları

- **Craft tavan (pazarlık dışı):** L1 craft-etkili → değişim **iki tema + cursor/scroll gözle** doğrulanmalı (discuss guardrail, PHASE-6 Dikkat). Fade kaybı kabul; kayma imzası "kayıp/snap" görünmemeli.
- **CLS riski:** `y:36`→`y:0` transform layout'a girmez (compositor-only) → CLS yaratmamalı; yine de gözle/ölçümle (CLS=0 guardrail). Eğer elementler reveal öncesi yer kaplamıyorsa zaten min-height var (section `min-h-[100svh]`).
- **i18n parite:** içerik anahtarına dokunulmuyor (yalnız GSAP kod) → 5 dil eşzamanlılığı bozulmaz.
- **Ölçüm bu task'ta değil:** L1+L2 sonrası ara-ölç TASK-6.04'te toplu yapılır (her code-lever'da tam median yerine; ama craft gözle doğrulama burada zorunlu).

---

## Test Kriterleri

- [ ] `next build` temiz geçer (TS strict, lint)
- [ ] Hero `<h1>` ilk paint'te görünür (opacity:0 yok) — DOM/visual teyit
- [ ] Reveal kayma imzası **light + dark** akıcı (gözle, snap/bozulma yok)
- [ ] Cursor hover + scroll etkileşimi bozulmadı (Living Flow + hero)
- [ ] reduced-motion'da reveal atlanır (statik, kayma yok) — mevcut davranış korunur
- [ ] CLS gözle/ölçümle 0 (layout kayması yok)

---

## Risk ve Geri Dönüş Planı

- **Risk:** opacity kaldırınca reveal "ani belirme" hissi verirse craft düşebilir → kayma `y` değeri/ease ile ince ayar; çözülmezse kullanıcıya getir (craft üst eksen, sessizce feda etme).
- **Rollback:** tek dosya, küçük diff — `git checkout -- src/components/Hero.tsx`.

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
