# TASK-6.05: L3 — Fraunces SOFT/WONK font eksenlerini buda

**Durum:** ⬜ Bekliyor
**Modül:** M1 (modules/M1-LivingFlow-TasarimSistemi.md) — tipografi token / font yükleme
**Feature:** P1 — WebGL-dışı yardımcı kazanım (craft-nötr)
**Faz:** Phase 6 (phases/PHASE-6.md)
**Bağımlılıklar:** TASK-6.04 (ara-ölç kararı — L3 kapsamı/gereği netleşir; craft-nötr olduğundan budget'tan bağımsız hijyen olarak da yapılabilir)

---

## Hedef

Fraunces variable font'u iki yerde `axes: ["opsz", "SOFT", "WONK"]` ile yükleniyor (`src/app/[locale]/layout.tsx:13` + `src/app/not-found.tsx:9`) ama SOFT/WONK eksenleri hiçbir yerde `font-variation-settings` ile **kullanılmıyor** (grep ile doğrulandı — yalnız `font-display`/`--font-fraunces` kullanımı var). Bu task ölü eksenleri (`SOFT`, `WONK`) `axes`'ten çıkarır → woff2 küçülür (~273KB font yükünden eksen verisi düşer), görsel çıktı **birebir aynı** kalır (kullanılmayan eksen → render değişmez). İki dosya **birlikte** güncellenir (drift önleme). Build temiz geçer + tipografi gözle birebir korunur.

---

## Bağlam

Research K-R3 (PHASE-6 + DECISIONS 2026-06-30): craft-nötr yardımcı lever. Kazanç görece küçük (LCP'nin ana kapısı CPU main-thread, network değil — localhost'ta gizli, Vercel'de daha görünür) ama **risksiz** (kullanılmayan eksen → görsel birebir) ve aynı zamanda kod hijyeni: `layout.tsx` ile `not-found.tsx` aynı tanımı tekrarlıyor (drift adayı). `opsz` (optical size) korunur — Fraunces opsz display serif için anlamlı olabilir; yalnız doğrulanmış-kullanılmayan SOFT/WONK budanır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-6.md` — "Araştırma Bulguları" L3 + K-R3
- `src/app/[locale]/layout.tsx` — Fraunces tanımı (satır 9-14)
- `src/app/not-found.tsx` — tekrar eden Fraunces tanımı (satır 5-10)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-6.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [ ] **1. SOFT/WONK eksenlerini iki dosyadan birlikte çıkar**
  - `layout.tsx:13` `axes: ["opsz", "SOFT", "WONK"]` → `axes: ["opsz"]` (yalnız kullanılan eksen)
  - `not-found.tsx:9` aynı değişiklik (birlikte — drift önleme)
  - `opsz`'nin gerçekten kullanıldığını/anlamlı olduğunu teyit et (Fraunces opsz display için); şüphede `opsz`'a dokunma, yalnız SOFT/WONK buda
  - `display: "swap"` korunur (değiştirilmez)

- [ ] **2. Tipografi gözle birebir doğrulama**
  - Hero `<h1>` (Fraunces display) + diğer Fraunces kullanımları light + dark birebir aynı mı (SOFT/WONK kullanılmadığı için aynı olmalı)
  - 404 sayfası (`not-found.tsx`) Fraunces başlığı birebir mi

---

## Etkilenen Dosyalar

```
src/app/[locale]/
└── layout.tsx       # axes SOFT/WONK çıkarılır — zaten var
src/app/
└── not-found.tsx    # axes SOFT/WONK çıkarılır (birlikte) — zaten var
```

---

## Dikkat Noktaları

- **İki dosya birlikte:** `layout.tsx` + `not-found.tsx` aynı tanım — biri güncellenip diğeri unutulursa drift (PHASE-6 Dikkat: "birlikte güncellenir").
- **Craft-nötr ama gözle teyit:** SOFT/WONK kullanılmadığı için görsel birebir beklenir; yine de gözle doğrula (varsayım değil — Fraunces default eksen değerleri değişmemeli).
- **i18n parite:** içerik anahtarına dokunulmuyor (font config) → 5 dil bozulmaz.
- **Kazanç ölçümü:** woff2 boyut farkı + LCP etkisi 6.07 faz-sonu ölçümünde görünür (localhost'ta küçük, Vercel'de daha net); bu task'ın testi öncelikle birebir-görsel + temiz build.
- **package.json dokunulmaz:** `next/font/google` parametresi değişir, paket eklenmez.

---

## Test Kriterleri

- [ ] `next build` temiz geçer; font yükleme hatası yok
- [ ] Hero + genel Fraunces tipografi light + dark **birebir** aynı (gözle)
- [ ] 404 sayfası Fraunces başlığı birebir
- [ ] `grep -rn "SOFT\|WONK" src` → yalnız (varsa) yorum/doküman; iki font tanımında SOFT/WONK kalmadı
- [ ] (mümkünse) build çıktısında Fraunces woff2 boyutunun küçüldüğü teyit

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
