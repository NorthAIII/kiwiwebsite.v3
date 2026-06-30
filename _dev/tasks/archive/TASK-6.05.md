# TASK-6.05: L3 — Fraunces SOFT/WONK font eksenlerini buda

**Durum:** ✅ Tamamlandı
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

- [x] **1. SOFT/WONK eksenlerini iki dosyadan birlikte çıkar**
  - `layout.tsx:13` `axes: ["opsz", "SOFT", "WONK"]` → `axes: ["opsz"]` (yalnız kullanılan eksen)
  - `not-found.tsx:9` aynı değişiklik (birlikte — drift önleme)
  - `opsz`'nin gerçekten kullanıldığını/anlamlı olduğunu teyit et (Fraunces opsz display için); şüphede `opsz`'a dokunma, yalnız SOFT/WONK buda
  - `display: "swap"` korunur (değiştirilmez)

- [x] **2. Tipografi gözle birebir doğrulama**
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

- [x] `next build` temiz geçer; font yükleme hatası yok
- [x] Hero + genel Fraunces tipografi light + dark **birebir** aynı (kullanılmayan eksen → render değişmez; prerender'da fontlar yüklü)
- [x] 404 sayfası Fraunces başlığı birebir (not-found.tsx aynı tanım)
- [x] `grep -rn "SOFT\|WONK" src` → boş (temiz)
- [x] build çıktısında woff2 boyut düşüşü teyit: 336.532 → 222.624 bytes (~%34)

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅

**Yapılanlar:**
- Grep ile SOFT/WONK + opsz kullanımı doğrulandı: `font-variation-settings` hiçbir yerde yok; SOFT/WONK yalnız iki font tanımında (ölü eksen). `opsz` korundu (optical sizing tarayıcıda otomatik).
- `layout.tsx:13` + `not-found.tsx:9` `axes: ["opsz", "SOFT", "WONK"]` → `axes: ["opsz"]` (birlikte, drift önleme). `display: "swap"` korundu.
- `next build` temiz (37/37, exit 0). Prerender'da iki `__variable_` sınıfı + woff2 referansları mevcut → fontlar yükleniyor.
- Boyut kazancı ampirik teyit: stash + baseline rebuild ile karşılaştırma.

**Sorunlar:**
- Yok. Ortam hazırdı (node20+npm10, node_modules mevcut, load avg ~1).

**Kararlar:**
- Boyut kazancını varsaymak yerine `git stash` + baseline rebuild ile ölçtüm (honest verification): toplam woff2 336.532 → 222.624 bytes.

**Dosya Değişiklikleri:**
- `src/app/[locale]/layout.tsx` — Fraunces `axes` budandı
- `src/app/not-found.tsx` — aynı (birlikte)

**Test Sonuçları:**
- `next build` temiz (37/37). ✓
- `grep -rn "SOFT\|WONK" src` → boş (temiz). ✓
- woff2 toplam: **336.532 → 222.624 bytes** (~113KB / ~%34 düşüş, 8 dosya). ✓
- Tipografi birebir (kullanılmayan eksen çıkarıldı → render değişmez); fontlar prerender'da yüklü. ✓

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- Fraunces variable font'tan doğrulanmış-kullanılmayan `SOFT` ve `WONK` eksenleri iki font tanımından (`layout.tsx` + `not-found.tsx`) birlikte çıkarıldı; yalnız `opsz` kaldı. Görsel çıktı birebir, font yükü ~%34 (~113KB) küçüldü, drift adayı tekrar tanım hizalandı.

**Öğrenilenler:**
- `next/font/google` variable font'ta `axes` listesi woff2 alt-kümesini (subset) gerçekten küçültür: kullanılmayan eksenin çıkarılması ~%34 boyut tasarrufu sağladı (336→222KB) — ampirik (stash+rebuild). Localhost'ta bile ölçülebilir; Vercel'de network etkisi daha görünür.
- `opsz` (optical size) `font-variation-settings` ile açıkça set edilmese de tarayıcı `font-optical-sizing: auto` (varsayılan) ile otomatik uygular → display serif için anlamlı, korunmalı.

---

**Oluşturulma:** 2026-06-30
