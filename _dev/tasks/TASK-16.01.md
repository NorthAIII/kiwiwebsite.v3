# TASK-16.01: gym PNG disk hijyeni + M2 doküman senkronu

**Durum:** ⬜ Bekliyor
**Modül:** M2 (asset) — `modules/M2-Sayfalar-Bolumler.md`
**Feature:** TB-D1 — gym PNG disk hijyeni
**Faz:** Phase 16 (phases/PHASE-16.md)
**Bağımlılıklar:** Yok

---

## Hedef

`public/gym/` altındaki 4 orphan PNG'yi (`calendar.png` · `dashboard.png` · `member.png` · `messaging.png`, ~1.7MB, 0 kod tüketicisi) `git rm` ile sil, boşalan `public/gym/` dizinini kaldır. Aynı task'te, silinen asset'i "kullanılıyor" gibi gösteren stale M2 modül dokümanı açıklamasını (`modules/M2-Sayfalar-Bolumler.md:123`, F2.8 base "Açıklama") gerçek v0.4 yapısına senkronla. Task, 4 PNG + `public/gym/` dizini gittiğinde, M2:123 gerçekle uyumlu olduğunda ve regresyon kapısı (`next build` temiz + Vitest yeşil) geçtiğinde tamamlanmış sayılır.

---

## Bağlam

Alpfit sayfası v0.4 (Faz 15) "Alpfit Plus" yeniden tasarımıyla saf CSS/SVG'ye taşındı: eski `components/gym/GymSoftwareShowcase.tsx` TASK-15.07'de `git rm`'lendi, sayfa artık `components/alpfit/*` (`AlpfitShowcase` orchestrator + 5 bölüm bileşeni + izole `PhoneMockups`) — raster görsel yok, `next/image` bu sayfadan düştü. Böylece `public/gym/*.png` (eski showcase'in ürün ekran görüntüleri) tam orphan kaldı. Bu disk hijyeni Faz 15'te bilinçle Kapsam Dışı bırakılıp bu faza devredilmişti (discuss-phase 16). research-phase 16 grep'i 0 kod tüketicisi + sitemap/OG/robots referansı yok olduğunu teyit etti (bulgular → PHASE-16 Araştırma Bulguları → TB-D1).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-16.md` — "Araştırma Bulguları → TB-D1" (grep teyidi, silme güvenliği) + "Dikkat Edilecekler" (son-grep + M2 drift)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.8 bölümü (satır ~121-133): base "Açıklama" (123, stale) + v0.4 notu (133)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-16.md` — Task Listesi tablosunda 16.01 durumu → ✅
- `_dev/MODULE-MAP.md` — TB-D1 satırı 🔄 → ✅ (Feature-Faz Matrisi)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.8 base "Açıklama" (satır 123) gerçek v0.4 yapısına senkronla (alt görev 2)

---

## Alt Görevler

- [ ] **1. Silme öncesi son tüketici grep (güvenlik kapısı)**
  - Silmeden hemen önce repo-geneli son bir grep: `grep -rn -E "gym/|calendar\.png|dashboard\.png|member\.png|messaging\.png" src/ messages/ next.config.ts src/app/sitemap.ts src/app/robots.ts` → **kaynak/config tarafında 0 eşleşme** doğrula (araştırma-icra arası yeni tüketici doğmadığını teyit et). Eşleşme çıkarsa DUR, kullanıcıya bildir (silme yapma).
  - Yalnız `_dev/` dokümanları + M2 modül dokümanı eşleşmeleri beklenir (tarihsel/planlama referansları — silme kararını etkilemez).

- [ ] **2. 4 orphan PNG'yi sil + dizini kaldır**
  - `git rm public/gym/calendar.png public/gym/dashboard.png public/gym/member.png public/gym/messaging.png`
  - Boşalan `public/gym/` dizinini kaldır (git dosyaları silince dizin zaten boşalır; kalırsa `rmdir public/gym`).
  - Dosya: `public/gym/*.png` (silinir)

- [ ] **3. M2:123 stale açıklamayı gerçek v0.4 yapısına senkronla**
  - `modules/M2-Sayfalar-Bolumler.md:123` F2.8 base "Açıklama" hâlâ eski yapıyı anlatıyor: `components/gym/GymSoftwareShowcase.tsx` + "8 özellik grid'i" + "4 ürün ekran görüntüsü (`public/gym/*.png`, `next/image`)". Bunları gerçek v0.4 yapısına güncelle: `components/alpfit/*` — `AlpfitShowcase` orchestrator (tek `<main>`, bölümleri kompoze eder) + 5 bölüm bileşeni (`AlpfitHero`/`AlpfitRoles`/`AlpfitFeatures`/`AlpfitWhy`/`AlpfitPricing`) + izole `PhoneMockups` (saf CSS iPhone mockup'ları); Sorun/Yol haritası/Kapanış bölümleri orchestrator içinde inline; saf CSS/SVG (raster görsel yok, `next/image` düştü). Route `/spor-salonu-yazilimi` korunur.
  - **Drift/tekrar kaçın (Doküman Disiplini):** satır 133'teki v0.4 notu zaten "ne değişti"yi kaydediyor — base açıklamayı gerçekle uyumlu kıl, 133'le bilgi tekrarı yaratma (base = güncel durum, 133 = değişim kaydı). Silinen asset'e ("public/gym/*.png kullanılıyor") atıf kalmamalı.
  - Dosya: `_dev/modules/M2-Sayfalar-Bolumler.md`

---

## Etkilenen Dosyalar

<!-- İşaretsiz = zaten var; YENİ dosya yok (yalnız silme + doküman senkronu). -->

```
public/gym/
├── calendar.png     # SİL (git rm — 437KB, orphan)
├── dashboard.png    # SİL (git rm — 339KB, orphan)
├── member.png       # SİL (git rm — 371KB, orphan)
└── messaging.png    # SİL (git rm — 576KB, orphan)
   (public/gym/ dizini boşalınca kaldırılır)

_dev/modules/
└── M2-Sayfalar-Bolumler.md   # F2.8 base "Açıklama" (satır 123) gerçek v0.4 yapısına senkron
```

---

## Dikkat Noktaları

- **Silme öncesi son grep şart** (alt görev 1) — araştırma anı 0-tüketici teyitli ama plan/icra arası değişebilir; silme anında yeni tüketici doğmadığını doğrula (PHASE-16 → Dikkat Edilecekler).
- **M2:123 senkron atlanmaz** — PNG silinip doküman güncellenmezse doküman "silinen asset'i kullanılıyor" gösterir (gerçeklik-drift). Silme + doküman senkronu **aynı task'te bağlı** (bu yüzden bölünmedi).
- **Sadece `public/gym/*.png` silinir** — `components/alpfit/*` (canlı sayfa bileşenleri) veya başka `public/` asset'i **dokunulmaz**. Silme kapsamı 4 PNG + boşalan dizinle sınırlı.
- **Runtime etkilenmez:** 0 tüketici → build/render/sitemap değişmez. Yine de regresyon kapısı koşulur (Test Kriterleri).
- **Rollback kolay:** git-tracked silme → gerekirse `git restore --staged --worktree public/gym/*.png` ile geri alınır (düşük risk, 0 tüketici).

---

## Test Kriterleri

- [ ] **Silme teyidi:** `public/gym/` dizini + 4 PNG diskte yok (`ls public/gym` → yok / boş); `git status` 4 dosyayı `deleted` gösterir.
- [ ] **Kalan referans yok:** silme sonrası `grep -rn -E "gym/|calendar\.png|dashboard\.png|member\.png|messaging\.png" src/ messages/ next.config.ts src/app/sitemap.ts src/app/robots.ts` → kaynak/config 0 eşleşme.
- [ ] **`next build` temiz:** build hatasız geçer, 0 `MISSING_MESSAGE` (guardrail — asset silme build'i etkilememeli).
- [ ] **Vitest yeşil:** `npm run test` (i18n 5-dil parite + mevcut tohumlar) regresyonsuz geçer.
- [ ] **Doküman senkron:** M2:123 F2.8 base açıklaması `components/alpfit/*` + saf CSS/SVG anlatıyor; `public/gym/*.png` / `next/image` / `GymSoftwareShowcase` atfı kalmadı.

> **Sandbox notu:** a11y Playwright tohumu sandbox'ta exit 144 ile ölürse (MEMORY) fallback = `next build` temiz + Vitest yeşil yeterlidir — bu task runtime davranışı değiştirmez (asset silme + doküman), gözle-doğrulanacak yeni davranış yok.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`refactor(TASK-16.01): remove orphan gym PNGs + sync M2 doc` — kod+doküman tek commit)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-16 tablosu + MODULE-MAP TB-D1 satırı güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

**Yapılanlar:**
- [doldurulacak]

**Test Sonuçları:**
- [doldurulacak]

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
- [Kısa özet]

---

**Oluşturulma:** 2026-07-16 (plan-phase 16)
