# TASK-17.02: S5 + S6-render — Taksonomi/Dürüstlük + Render Bütünlüğü (Alpfit Plus dahil)

**Durum:** ✅ Tamamlandı
**Modül:** M2 Sayfalar (+M4 i18n) (modules/M2-Sayfalar-Bolumler.md, M4-i18n.md)
**Feature:** S5 (taksonomi & dürüstlük) + S6-render (`MISSING_MESSAGE` yok) + **Alpfit render bütünlüğü** (S8 render tarafı) senaryo grupları — doğrulama
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.01 ✅ (taze `next build` prerender ground-truth'ı)

---

## Hedef

**Prerender HTML ground-truth** (`.next/server/app/**/*.html`) üzerinde grep ile üç şeyi deterministik doğrula: (1) **S5 taksonomi & dürüstlük** — "Crew OS" görünür yüzeyde var / görünür "Bunker" ve URL'de yok (kod-adı kalıntısı hariç), **Alpfit dürüstlük 4/4 gerçek** (pilot adı / fiyatlar / yol-haritası+Store dürüst çerçeve / sahte "● online" yok), uydurma sonuç + yasak metafor yok; (2) **S6-render** — 6 sayfa × 5 dil = 30 prerender'da **0 `MISSING_MESSAGE`**, non-TR `alpfit` stale-TR görünür kopukluk yaratmıyor, AR-RTL `dir=rtl`; (3) **Alpfit render bütünlüğü** (v0.4 asıl delta) — 9 bölüm SSG'de tam render + saf CSS/SVG `PhoneMockup` marker'ı prerender'da mevcut (kırık görsel / eksik bölüm yok). Tamamlanma = grep kanıtları toplandı, triyajlı PHASE-17'ye kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S5/S6 araç satırları (A: prerender grep) + Dikkat Edilecekler (**prerender marker = CSS-modül sınıf adı + render metin, React bileşen adı DEĞİL**; `AlpfitShowcase` grep=0, `PhoneMockup` 150×) + Kapsam Dışı (non-TR alpfit içerik-kalite prd-review'a)
- `_dev/MEMORY.md` → i18n Süreç Disiplini (anahtar varlığı ≠ değer tazeliği; non-TR stale-kopya kabul, eksik anahtar asla)
- `src/components/alpfit/AlpfitShowcase.tsx` (9 bölüm kompozisyonu), `src/components/alpfit/PhoneMockups.module.css` (`.phone*` → derlenmiş HTML'de `PhoneMockup` hash-prefix)
- `messages/{tr,en,ar,de,es}.json` → `alpfit` namespace (non-TR stale-TR görünür kopukluk kontrolü)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.02 durumu + S5/S6-render/Alpfit-render bulgu notu

---

## Alt Görevler

- [x] **1. S5 — Taksonomi tutarlılığı (prerender grep)** ✅ GEÇTİ
  - "Crew OS" görünür metin var (home teaser + `/crew-os` sayfası, 5 dil); **görünür "Bunker OS" 0** (yalnız kod-adı kalıntısı `#bunker` anchor / `nav.bunker` id, render metni değil); URL'de "bunker" görünmez (yalnız 308 redirect kaynağı, 17.01'de teyitli)
  - **Sonuç:** "Crew OS" home 15× / `/crew-os` 14× (5 dil); görünür "Bunker OS" = **0/30**; tüm "Bunker" kalıntısı kod-adı (i18n nav key `"bunker":"Crew OS"` değeri=Crew OS · `#bunker` anchor + `id="bunker"` home nav · `bunkerback` CSS keyframe /crew-os) — hiçbiri görünür metin değil; `bunker-os` slug **0**, home nav `/crew-os`'a linkliyor

- [x] **2. S5 — Dürüstlük tutarlılığı (prerender grep, çapraz)** ✅ GEÇTİ
  - **Alpfit dürüstlük 4/4:** pilot adı / fiyatlar / yol-haritası+Store dürüst çerçeve (öngörü/örnek okuması), **sahte "● online / canlı" presence-tiyatrosu yok** (gerçek-canlı ürün dürüst göstergesi meşru — ILKELER niyet-bazlı)
  - Site-geneli: uydurma sonuç/sayı iması yok; yasak metafor yok (doktor/teşhis/hekim/reçete; zayıf adım adı; lorem/dolgu)
  - **Sonuç:** Alpfit 4/4 → pilot "Weekend Training Club" · ₺1.500/₺1.200/₺3.000/15gün gerçek · yol-haritası "Bugün üründe değil" dürüst çerçeve · tek nabız = "canlı pilotta" dürüst gösterge (sahte "● online" **0**). Yasak metafor **0/30** (doktor/teşhis/hekim/reçete/lorem/dolor). Home 4-adım gerçek (Analiz/Çözüm/Otomasyon/Raporlama), zayıf ad (Dinle/Listen) **0**. Vaka "örnek"/"takip edilir"/"ölçülür" dürüst çerçeve

- [x] **3. S6-render — 0 `MISSING_MESSAGE` + non-TR tutarlılık** ✅ GEÇTİ
  - 6 sayfa × 5 dil = 30 prerender'da **0 `MISSING_MESSAGE`** (grep); AR sayfalarda `dir="rtl"` + `lang="ar"`
  - non-TR `alpfit` **stale-TR** (değer Türkçe): görünür **kopukluk** yaratıyor mu (yapı bozulmadan render mi) — in-scope; içerik *kalitesi* out-of-scope (prd-review)
  - **Sonuç:** MISSING_MESSAGE **0/30** (tek key-path eşleşmesi `alpfit.vercel.app` = gerçek URL, sızıntı değil). AR **6/6** `lang="ar"`+`dir="rtl"`; non-AR'de yanlış RTL **0**. non-TR `alpfit` namespace TR ile **birebir aynı** (5 dilde 0 diff, 133 leaf tam parite) → eksik anahtar yok, stale-TR yapısal tam, görünür kopukluk yok

- [x] **4. Alpfit render bütünlüğü (v0.4 asıl delta — S8 render tarafı)** ✅ GEÇTİ
  - `/spor-salonu-yazilimi` prerender'da **9 bölüm** tam render: Hero/before-after · Sorun · 4 Rol · Mobil mockup'lar · 9 Özellik · Neden · Fiyat · Yol haritası+Store · Kapanış (içerik string'leri + `<section>` sayısı)
  - Saf CSS/SVG `PhoneMockup` marker'ı prerender'da mevcut (araştırma: 150×) — kırık görsel yok (raster/`next/image` bu sayfada yok)
  - **Yapısal a11y sanity (Faz 8 dersi):** her sayfada tam bir `<main>` var mı (grep) — bülten sayfaları dahil (Faz 8: eksik `<main>` axe'i geçip Lighthouse a11y=98 vermişti; deterministik ön-kontrol)
  - **Sonuç:** 5 locale × **8 `<section>` + roadmap `<div>` = 9 kavramsal bölüm** (kaynak koda birebir); 9 bölüm marker'ı (hero/sorun/roller/uygulama/ozellikler/fiyat/roadmap/close) her locale 1×; `PhoneMockup` **150×** (araştırma+canlı ile birebir); raster **0 `<img>`** / 49 `<svg>` (saf CSS/SVG). Her 30 sayfada **tam bir `<main>`** (ne eksik ne çift — Faz 8 dersi geçti, bülten sayfaları dahil)

- [x] **5. Triyaj & kayıt** ✅
  - Kapsam-içi bug → düzeltme task'ı önerisi; sahipli/beklenen (non-TR `alpfit` stale-TR görünür-kopuk-değil) → PHASE-17 kaydı + prd-review yönlendirmesi
  - **Sonuç: 0 kapsam-içi bug** → düzeltme task'ı gerekmez, kaynak kod değişmedi. Sahipli/beklenen: non-TR `alpfit` stale-TR (bilinçli, versiyon-sınırı, görünür kopukluk yok) → prd-review (mevcut kayıt, yeniden açılmadı)

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Referans tanımlayıcılar ZATEN-VAR: prerender HTML build çıktısı (17.01), alpfit bileşenleri + PhoneMockups.module.css repoda-tanımlı, alpfit namespace 5 dilde repoda. YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-17.02.md          # Oturum kaydı + grep kanıtları
├── phases/PHASE-17.md           # Task Listesi 17.02 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **Prerender marker = CSS-modül sınıf adı + render metin, React bileşen adı DEĞİL (araştırma, kanıtlı).** `AlpfitHero`/`AlpfitShowcase` HTML'e yazılmaz → render bütünlüğü grep'i `PhoneMockup` (CSS-modül sınıfı, `PhoneMockups.module.css`) + içerik string'leri (roadmap/before-after/fiyat) üzerinden. Bileşen adı grep'i 0 = beklenen (yanlış-FAIL değil).
- **`.next` tazeliği:** 17.01 taze build üretti → grep o ground-truth'ta. `.next` eskiyse (başka koşu) yeniden build.
- **Kod-adı kalıntısı ≠ görünür sızıntı (Kapsam Dışı):** `Bunker.tsx`, `components/bunker-os/`, `nav.bunker`, `#bunker` iç kod adı — S5 yalnız **render edilen görünür metni + URL'i** denetler, kod kalıntısını değil.
- **non-TR stale ayrımı (memory i18n disiplini):** `alpfit` non-TR değeri Türkçe (bilinçli-stale, versiyon-sınırı) — bu görünür **kopukluk** değilse (yapı sağlam) kabul; eksik anahtar olsaydı FAIL. Ayrımı koru.

---

## Test Kriterleri

- [x] "Crew OS" 5 dil görünür var (home 15× / crew-os 14×); görünür "Bunker OS" render metni = **0/30**; URL'de bunker görünmez (`bunker-os` slug 0)
- [x] Alpfit dürüstlük 4/4 gerçek çerçeve; sahte "● online" yok (0); yasak metafor/uydurma sonuç **0/30**
- [x] 30 sayfa-locale prerender **0 `MISSING_MESSAGE`**; AR `dir=rtl`+`lang=ar` (6/6); non-TR `alpfit` stale-TR görünür kopukluk yok (5 dil birebir, 133 leaf parite)
- [x] Alpfit `/spor-salonu-yazilimi` **9 bölüm** (8 `<section>`+roadmap `<div>`) + `PhoneMockup` marker (150×) prerender'da tam render (kırık görsel/eksik bölüm yok; 0 `<img>`)
- [x] 30 sayfanın her birinde tam bir `<main>` (yapısal a11y sanity, Faz 8 dersi — bülten dahil)
- [x] Bulgular triyaj edildi; PHASE-17 + task doc'a yazıldı; kaynak kod değişmedi

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-17

**Durum:** ✅ Tamamlandı — S5 + S6-render + Alpfit render bütünlüğü GEÇTİ, **0 kapsam-içi bug**

**Son Yaklaşım:** Doğrulama tamamlandı; pause/devam gerekmez. Substrat = TASK-17.01'in taze `next build` prerender ground-truth'u (`.next/server/app/**/*.html`, 30 sayfa-locale + `_not-found`). Kaynak kod DEĞİŞMEDİ.

**Sonraki Adım Detayı:** Fazda 6 task kaldı (17.03–17.08). Sıradaki: **TASK-17.03** (S8-suite + S6-parite: Vitest + `test:e2e` axe çift-tema 50-test + CI). Yeni oturum.

**Yapılanlar:**
- **Ortam & build tazeliği:** `.next/BUILD_ID` mtime (Jul 17 16:52) tüm kaynak/mesaj/config'ten yeni (BUILD_ID'den yeni dosya = 0) → TASK-17.01 ground-truth'u geçerli, yeniden build gerekmedi. Prerender ağacı = 6 sayfa × 5 locale = **30 HTML** + `_not-found` = 31.
- **Alt görev 1 (S5 taksonomi):** "Crew OS" görünür — home **15×**, `/crew-os` **14×** (5 dil). Görünür "Bunker OS" render metni = **0/30**. Tüm "Bunker" kalıntısı kod-adı tanımlayıcısı (i18n nav key `"bunker":"Crew OS"` → değer=Crew OS · home `#bunker` anchor + `section id="bunker"` · `/crew-os` `bunkerback` CSS keyframe) — hiçbiri görünür metin değil (PHASE-17 Kapsam Dışı "kod-adı kalıntısı"). URL'de `bunker-os` slug **0**; home nav `href="/crew-os"`.
- **Alt görev 2 (S5 dürüstlük):** Alpfit **4/4** → (1) pilot adı "Weekend Training Club" (2) fiyatlar ₺1.500/₺1.200/₺3.000/15 gün gerçek (3) yol-haritası "Bugün üründe değil; geliştirme yol haritamızda" + Store="Mağaza (üye e-ticaret)" dürüst çerçeve (4) tek nabız = "canlı pilotta" dürüst canlı gösterge, sahte "● online" **0** (ILKELER niyet-bazlı meşru). Yasak metafor **0/30** (doktor/teşhis/hekim/reçete/lorem/dolor). Home 4-adım gerçek (Analiz/Çözüm/Otomasyon/Raporlama), zayıf ad (Dinle/Listen) **0**. Vaka çalışmaları "örnek"/"takip edilir"/"ölçülür" dürüst çerçeve (uydurma sonuç yok).
- **Alt görev 3 (S6-render):** MISSING_MESSAGE **0/30** (tek key-path eşleşmesi `alpfit.vercel.app` = gerçek Vercel domain'i, sızıntı değil). AR **6/6** `lang="ar"`+`dir="rtl"`; non-AR'de yanlış RTL **0**. non-TR `alpfit` namespace TR ile **birebir aynı** (en/ar/de/es → 0 diff), **133 leaf × 5 dil tam parite** → eksik anahtar yok; stale-TR yapısal olarak tam, görünür kopukluk imkânsız (eksik anahtar kaynaklı boşluk yok).
- **Alt görev 4 (Alpfit render bütünlüğü):** 5 locale × **8 `<section>` + roadmap `<div>` = 9 kavramsal bölüm** (kaynak `AlpfitShowcase.tsx`'e birebir; roadmap `<div>` beklenen). 9 bölüm marker'ı (hero/sorun/`#roller`/`#uygulama`/`#ozellikler`/`#fiyat`/roadmap/close) her locale 1×. `PhoneMockup` CSS-modül marker'ı **150×** (araştırma rakamı + canlı `f173234` ile birebir). Raster **0 `<img>`** / 49 `<svg>` (saf CSS/SVG, `next/image` bu sayfadan düşmüş). Her **30** sayfada tam bir `<main>` (ne eksik ne çift — Faz 8 dersi geçti, 2 bülten × 5 dil dahil).
- **Alt görev 5 (triyaj):** **0 kapsam-içi bug** → düzeltme task'ı gerekmez, kaynak kod değişmedi (doğrulama fazı). Sahipli/beklenen: non-TR `alpfit` stale-TR (bilinçli, versiyon-sınırı, görünür kopukluk yok) → prd-review (mevcut kayıt, yeniden litige edilmedi).
- **Not:** Tüm doğrulama deterministik build-ground-truth grep (A katmanı); runtime/WebGL gerekmedi (S3/S4 → TASK-17.04/05). `.next` prerender byte-for-byte disk okundu — ayrı server/sandbox riski yok.

**Test:** Doğrulama fazı — kaynak kod değişmedi, yeni test yazılmadı. Doğrulama aracının kendisi = 30-dosya prerender ground-truth grep (deterministik, tekrarlanabilir). Vitest/axe suite mührü TASK-17.03'ün kapsamı.

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
