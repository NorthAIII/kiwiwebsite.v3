# TASK-14.02: S5 + S6-render — Taksonomi/Dürüstlük & non-TR Render Bütünlüğü

**Durum:** ✅ Tamamlandı
**Modül:** M2 Sayfalar (+M4 i18n) (modules/M2-Sayfalar-Bolumler.md, M4-i18n.md)
**Feature:** S5 (taksonomi & dürüstlük) + S6-render (non-TR render bütünlüğü) senaryo grupları — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.01 ✅ (lineer sıra; kanonik prod-serve/prerender çıktısı hazır)

---

## Hedef

Prerender HTML (`.next/server/app/**/*.html`) üzerinde **görünür metni** grep'leyerek: (S5) taksonomi tutarlılığı — **"Crew OS" görünür yüzeyde var, "Bunker" hiçbir görünür metinde/URL'de yok** (v0.3: Faz 11 rename sonrası URL'de de yok; kod-adı kalıntısı `components/bunker-os/`, `#bunker` anchor render'dan ayrıştırılır) + yasak metafor / uydurma sonuç-sayısı / sahte "● online" yok; (S6-render) 6 sayfa × 5 dil render'da **0 `MISSING_MESSAGE`**, AR `dir=rtl` + Arapça glif, bilinçli-stale non-TR **görünür kopukluk yaratmıyor**. Tamamlanma = 30 sayfa-locale prerender'ı tarandı, sonuç triyajlı kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S5 (prerender grep, katman A) + S6 (Vitest `i18n-parity` + prerender ×5 dil) satırları; Kapsam Tartışması → Kapsam Dışı (non-TR içerik-kalite derin denetimi out-of-scope, yalnız tutarlılık)
- `_dev/PRD/VIZYON.md` — ürün taksonomisi (Crew OS public / Bunker iç ad / Alpfit ayrı)
- `_dev/docs/DECISIONS.md` — dil stratejisi (TR tek kaynak, non-TR versiyon-sınırı stale kabul); "● online" niyet-bazlı yasak (gerçek-canlı ürün dürüst göstergesi meşru)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.02 durumu + S5/S6-render bulgu notu

---

## Alt Görevler

- [x] **1. Prerender çıktısını topla**
  - `.next/server/app/**/*.html` (TASK-14.01 build'inden); yoksa `npm run build`. Görünür metin için script/style/SVG-attr strip et (grep öncesi ham HTML yanıltır)
  - 6 sayfa × 5 dil = 30 prerender dosyasını konumla (TR prefixsiz app dizininde, EN/AR/DE/ES `[locale]` altında)

- [x] **2. S5 — Taksonomi tutarlılığı**
  - **"Crew OS"** görünür metinde var mı (ana sayfa teaser + `/crew-os` showcase, 5 dil)
  - **"Bunker"** görünür metinde/URL'de **0 kez** (kod-adı kalıntısı `#bunker` anchor `id`/`href` sızıntısı hariç değil — render edilen **görünür metni** denetle; `id="bunker"` görünür değil, ama görünür başlık/CTA'da "Bunker" olmamalı)
  - Yasak metafor (doktor/teşhis/hekim/reçete), uydurma sonuç-sayısı, sahte "● online/canlı" presence-tiyatrosu yok (gerçek-canlı ürün dürüst göstergesi meşru — niyet-bazlı)

- [x] **3. S6-render — non-TR bütünlük**
  - 30 sayfa-locale prerender'da **0 `MISSING_MESSAGE`** (next-intl eksik anahtar render'da bu string'i basar)
  - AR sayfalarında `dir="rtl"` + gerçek Arapça glif (mojibake/boş değil)
  - namespace `bunker`→`crew` 5-dil senkron (Faz 11 SEO2): crew namespace anahtarları 5 dilde render ediliyor, eski `bunker` namespace kalıntısı render'a sızmıyor
  - Bilinçli-stale non-TR (ar/de/es İngilizce/eski-metin kopya) **görünür kopukluk** (yarım cümle, boş alan, karışık-dil paragraf) yaratıyor mu — yaratıyorsa triyaj; *kalite* (stale'in kendisi) out-of-scope

- [x] **4. Triyaj & kayıt**
  - Kapsam-içi bug (görünür "Bunker" sızıntısı, MISSING_MESSAGE, kopuk non-TR render) → düzeltme task'ı önerisi
  - Kapsam-dışı: non-TR içerik tazeliği (ar/de/es stale) → sahipli record-not-fix (versiyon-sınırı, prd-review B grubu). Leak metriği (non-TR sayfa TR%'i) kaydedilir ama TR-leak yoksa bug değil

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Referans tanımlayıcılar ZATEN-VAR (prerender = build çıktısı; taksonomi/dil stratejisi PRD/DECISIONS'da tanımlı). YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-14.02.md          # Oturum kaydı + S5/S6-render bulguları
├── phases/PHASE-14.md           # Task Listesi 14.02 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **Görünür metin ≠ ham HTML.** Kod-adı kalıntısı (`components/bunker-os/`, `id="bunker"`, `nav.bunker` namespace anahtarı) taksonomi izin verir — S5 yalnız **render edilen görünür metni/URL'i** denetler, kod kalıntısını değil (Kapsam Dışı). Grep'ten önce görünür-metin çıkar.
- **`/tr/` sızıntısı yok** teyidi: prerender'da iç link href'lerinde `/tr/` prefix olmamalı (TR prefixsiz).
- **non-TR ayrım (memory Süreç Disiplini):** anahtar EKSİKliği (MISSING_MESSAGE) = pazarlık-dışı bug; değer stale-kopya = kabul (versiyon-sınırı). Ayrımı koru — stale'i bug sanma.
- Faz 9 emsali: 4 alt sayfa (alpfit/vaka/2 bülten) ar/de/es İngilizce-stale kaydedilmişti (record-not-fix); v0.3 bunu değiştirmedi → yeniden litige etme, sahipli kayıt korunur.

---

## Test Kriterleri

- [x] 30 sayfa-locale prerender tarandı (görünür metin strip'li)
- [x] "Crew OS" görünür metinde var (home + /crew-os, 5 dil); "Bunker" görünür metin/URL'de **0**
- [x] Yasak metafor / uydurma-sayı / sahte-online **yok**
- [x] 30/30 sayfa-locale **0 MISSING_MESSAGE**; AR `dir=rtl` + Arapça glif; namespace crew senkron
- [x] Bilinçli-stale non-TR görünür kopukluk yaratmıyor (yaratıyorsa triyaj); bulgular PHASE-14 + task doc'a yazıldı

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- TASK-14.01 build çıktısı (`.next/server/app/**`, BUILD_ID `Im6OiYfj`) kullanıldı — 30 prerender HTML (6 sayfa × 5 dil) konumlandı; ayrıca `_not-found.html`. Python görünür-metin çıkarıcı (`<script>`/`<style>` blokları söküldü, tüm tag'ler kaldırıldı → yalnız text node'lar; attribute'lar — `id`/`href`/`class` — tag içinde kaldığı için otomatik düştü).
- **S5.1** "Crew OS" görünür metin: home ×7 + `/crew-os` ×5, **5 dilin hepsinde** var (10/10 sayfa).
- **S5.2** "Bunker" görünür metin: **30 sayfada 0**. href taraması: yalnız `#bunker` anchor (5 home sayfası) — kod-adı kalıntısı, kapsam izin veriyor (Kapsam Dışı: `#bunker` anchor iç ad); eski `/bunker-os` route href'i **0**.
- **S5.3** Yasak metafor (doktor/teşhis/hekim/reçete + EN/DE/ES çevirileri): **0**.
- **S5.4** online/canlı/live sinyalleri: yalnız **dürüst canlı göstergeler** (Alpfit gerçekten canlı → "Canlı — Alpfit", "Canlı demo", "Crew OS canlı", "live occupancy" ürün-özelliği; 5 dil). Sahte "● online" presence-tiyatrosu **yok** (niyet-bazlı meşru, DECISIONS 2026-06-28).
- **S6.1** `MISSING_MESSAGE` (ham HTML, 30 sayfa-locale): **0**.
- **S6.2** AR: 6 sayfanın hepsinde `dir="rtl"` + `lang="ar"` + gerçek Arapça glif (home 2441, crew-os 807, alt-sayfalar 76–97 = çevrilmiş chrome/nav; mojibake yok).
- **S6.3** namespace `bunker`→`crew` 5-dil senkron: Crew OS 5 dilde render + 0 MISSING → crew namespace senkron, eski bunker namespace render'a sızmıyor.
- **S6.4** non-TR TR-leak: **0** (TR-marker taraması hiçbir non-TR sayfada >2 vermedi). Stale non-TR alt sayfalar (ar/de/es × spor/vaka/2-bülten) örneklendi → **tutarlı İngilizce-stale** (çevrilmiş chrome + İngilizce gövde), yarım cümle/boş alan/karışık-kopuk paragraf **yok**.
- `/tr/` iç-link sızıntısı: 30 sayfada **0** (TR prefixsiz — Dikkat Notu teyidi).

**Bulgular / Triyaj:**
- **Kapsam-içi bug: YOK.** Taksonomi (S5) tutarlı, non-TR render bütünlüğü (S6) sağlam.
- **Sahipli kayıt (record-not-fix, versiyon-sınırı → prd-review B grubu):** ar/de/es 4 alt sayfa (spor/vaka/2 bülten) İngilizce-stale — görünür kopukluk yaratmıyor (chrome yerelleştirilmiş, gövde tutarlı İngilizce). Faz 9 emsali birebir korunur, yeniden litige edilmedi. Kalite (stale'in kendisi) kapsam-dışı.

**Test:** görünür-metin denetim scripti 30/30 sayfa-locale (tüm test kriterleri ✅). `next build` gerekmedi (TASK-14.01 çıktısı taze/geçerli).

**Kaynak kod değişmedi** (doğrulama fazı).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
