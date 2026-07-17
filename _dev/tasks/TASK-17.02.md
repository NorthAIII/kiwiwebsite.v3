# TASK-17.02: S5 + S6-render — Taksonomi/Dürüstlük + Render Bütünlüğü (Alpfit Plus dahil)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. S5 — Taksonomi tutarlılığı (prerender grep)**
  - "Crew OS" görünür metin var (home teaser + `/crew-os` sayfası, 5 dil); **görünür "Bunker OS" 0** (yalnız kod-adı kalıntısı `#bunker` anchor / `nav.bunker` id, render metni değil); URL'de "bunker" görünmez (yalnız 308 redirect kaynağı, 17.01'de teyitli)

- [ ] **2. S5 — Dürüstlük tutarlılığı (prerender grep, çapraz)**
  - **Alpfit dürüstlük 4/4:** pilot adı / fiyatlar / yol-haritası+Store dürüst çerçeve (öngörü/örnek okuması), **sahte "● online / canlı" presence-tiyatrosu yok** (gerçek-canlı ürün dürüst göstergesi meşru — ILKELER niyet-bazlı)
  - Site-geneli: uydurma sonuç/sayı iması yok; yasak metafor yok (doktor/teşhis/hekim/reçete; zayıf adım adı; lorem/dolgu)

- [ ] **3. S6-render — 0 `MISSING_MESSAGE` + non-TR tutarlılık**
  - 6 sayfa × 5 dil = 30 prerender'da **0 `MISSING_MESSAGE`** (grep); AR sayfalarda `dir="rtl"` + `lang="ar"`
  - non-TR `alpfit` **stale-TR** (değer Türkçe): görünür **kopukluk** yaratıyor mu (yapı bozulmadan render mi) — in-scope; içerik *kalitesi* out-of-scope (prd-review)

- [ ] **4. Alpfit render bütünlüğü (v0.4 asıl delta — S8 render tarafı)**
  - `/spor-salonu-yazilimi` prerender'da **9 bölüm** tam render: Hero/before-after · Sorun · 4 Rol · Mobil mockup'lar · 9 Özellik · Neden · Fiyat · Yol haritası+Store · Kapanış (içerik string'leri + `<section>` sayısı)
  - Saf CSS/SVG `PhoneMockup` marker'ı prerender'da mevcut (araştırma: 150×) — kırık görsel yok (raster/`next/image` bu sayfada yok)
  - **Yapısal a11y sanity (Faz 8 dersi):** her sayfada tam bir `<main>` var mı (grep) — bülten sayfaları dahil (Faz 8: eksik `<main>` axe'i geçip Lighthouse a11y=98 vermişti; deterministik ön-kontrol)

- [ ] **5. Triyaj & kayıt**
  - Kapsam-içi bug → düzeltme task'ı önerisi; sahipli/beklenen (non-TR `alpfit` stale-TR görünür-kopuk-değil) → PHASE-17 kaydı + prd-review yönlendirmesi

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

- [ ] "Crew OS" 5 dil görünür var; görünür "Bunker OS" render metni = **0**; URL'de bunker görünmez
- [ ] Alpfit dürüstlük 4/4 gerçek çerçeve; sahte "● online" yok; yasak metafor/uydurma sonuç **0**
- [ ] 30 sayfa-locale prerender **0 `MISSING_MESSAGE`**; AR `dir=rtl`+`lang=ar`; non-TR `alpfit` stale-TR görünür kopukluk yok
- [ ] Alpfit `/spor-salonu-yazilimi` **9 bölüm** + `PhoneMockup` marker prerender'da tam render (kırık görsel/eksik bölüm yok)
- [ ] 6 sayfanın her birinde tam bir `<main>` (yapısal a11y sanity, Faz 8 dersi)
- [ ] Bulgular triyaj edildi; PHASE-17 + task doc'a yazıldı; kaynak kod değişmedi

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

**Durum:** [durum]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
