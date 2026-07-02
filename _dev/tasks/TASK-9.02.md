# TASK-9.02: S5 + S6-render — Taksonomi/Dürüstlük & non-TR Render Bütünlüğü

**Durum:** ⬜ Bekliyor
**Modül:** M2 Sayfalar (+M4 i18n) (modules/M2-Sayfalar-Bolumler.md, M4-i18n.md)
**Feature:** S5 (taksonomi/dürüstlük) + S6-render (runtime render bütünlüğü) senaryo grupları — doğrulama
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.01 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

6 sayfa × 5 dilin **render edilen görünür metnini** curl+grep ile tarayıp iki katmanı doğrula: (S5) taksonomi & dürüstlük tutarlılığı — "Crew OS" her yüzeyde var / "Bunker" görünür metinde yok, uydurma sonuç / sahte "● online" / yasak metafor yok; (S6-render) 5-dil render bütünlüğü — hiçbir sayfada `MISSING_MESSAGE` yok, bilinçli-stale non-TR değerler görünür kopukluk yaratmıyor. Aynı fetch geçişi iki assertion kümesini besler. Tamamlanma = 30 sayfa render-metin taraması koşuldu, iki katman kaydedildi, triyaj yapıldı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S5 & S6 araç satırları + Dikkat Edilecekler ("Bunker" anahtar/route ≠ render yüzeyi; i18n parite; leak metriği)
- `_dev/PRD/VIZYON.md` — ürün taksonomisi (Crew OS public / Bunker OS iç ad) + marka sesi yasakları
- `_dev/ILKELER.md` — "● online" yasağının niyet-bazlı kapsamı; TR tek kaynak / stale non-TR kabul
- `messages/{tr,en,ar,de,es}.json`, `src/components/bunker-os/BunkerShowcase.tsx`

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.02 durumu + S5/S6-render bulgu notu

---

## Alt Görevler

- [ ] **1. Prod-serve + render fetch geçişi**
  - Fresh prod build serve (PID teyit); 6 sayfa × 5 locale = 30 sayfayı fetch et (TR cookie, diğerleri prefixli)
  - **Görünür metin ayıklama:** RSC flight payload'ı (`self.__next_f` script-tag) ayıklanır — kaynak/URL/namespace değil, **render edilen görünür metin** taranır (Faz 3 deseni)

- [ ] **2. S5 — Taksonomi & dürüstlük**
  - "Crew OS" beklenen yüzeylerde var (özellikle `/bunker-os` showcase, 5 dil)
  - "Bunker" **görünür metinde yok** — namespace anahtarı / `/bunker-os` route href / `components/bunker-os/` iç kalıntı **ayrıştırılır** (bunlar leak değil)
  - Uydurma sonuç/sayı, sahte "● online/canlı" presence-tiyatrosu, yasak metafor (doktor/teşhis/hekim/reçete, "Dinle/Listen") yok

- [ ] **3. S6-render — 5-dil render bütünlüğü**
  - 30 sayfada `MISSING_MESSAGE` (next-intl runtime hata string'i) **yok**
  - Bilinçli-stale non-TR görünür kopukluk yok: **"birebir-TR değer" sayısı stale değil leak metriğidir** — marka/sayı/ortak-kelime filtresi + render distinkt-cümle leak birlikte değerlendirilir (Faz 3 öğrenimi)
  - AR **render/parite** katmanı: AR sayfalarda `dir="rtl"` + AR metin render var, `MISSING_MESSAGE` yok (görsel RTL aynalama **S3'te**, TASK-9.05 — burada tekrar edilmez)

- [ ] **4. Triyaj & kayıt**
  - Bulgular TK7 kapısıyla triyaj; sonuç özeti task Oturum Kaydı + PHASE-9 notu

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Değişen yalnız _dev/ dokümanları. -->

```
_dev/
├── tasks/TASK-9.02.md          # Oturum kaydı + bulgular
├── phases/PHASE-9.md           # Task Listesi 9.02 + S5/S6-render notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **"Bunker" ≠ leak:** anahtar-adı/route/komponent iç kalıntı; yalnız **render edilen görünür metni** denetle. `/bunker-os` route'un URL'de görünmesi taksonomi bulgusu değil (public `/crew-os` ertelendi — M6, record-not-fix).
- **Stale ≠ eksik:** non-TR birebir-TR kopya = bilinçli-stale (kabul, versiyon-sınırı); **eksik anahtar / `MISSING_MESSAGE` = pazarlık-dışı hata**. Ayrımı koru (S6-parite yapısal tarafı TASK-9.03 Vitest'te).
- **Leak metriği tuzağı:** ham "TR-eşit satır" sayısı yanıltır — filtre + distinkt-cümle leak birlikte (Faz 3 öğrenimi).
- **"● online" niyet-bazlı:** gerçekten canlı ürünün (Alpfit) dürüst göstergesi yasak değil; yalnız sahte presence-tiyatrosu.
- Kanonik ortam = fresh prod build; locale tuzağı (TR cookie).

---

## Test Kriterleri

- [ ] 30 sayfa render-metin taraması koşuldu (RSC flight payload ayıklama ile görünür metin)
- [ ] "Crew OS" beklenen yüzeylerde doğrulandı; "Bunker" görünür metinde yok (iç kalıntı ayrıştırıldı)
- [ ] Uydurma sonuç / sahte "● online" / yasak metafor taraması temiz (veya bulgu triyajlı kaydedildi)
- [ ] 30 sayfada `MISSING_MESSAGE` yok; bilinçli-stale görünür kopukluk yok (leak metriği doğru uygulandı)
- [ ] AR render/parite (`dir="rtl"` + AR metin, MISSING_MESSAGE yok) teyit edildi
- [ ] Bulgular triyaj edildi; PHASE-9 + task doc'a yazıldı

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

<!-- Task çalıştırıldığında (run-task) doldurulur. -->

---

**Oluşturulma:** 2026-07-02
