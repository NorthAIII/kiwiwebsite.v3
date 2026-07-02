# TASK-9.02: S5 + S6-render — Taksonomi/Dürüstlük & non-TR Render Bütünlüğü

**Durum:** ✅ Tamamlandı
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

- [x] **1. Prod-serve + render fetch geçişi**
  - Fresh prod build (`npm run build` temiz) + `next start -p 3000`; listening-PID 77012 fresh process teyit. 30 sayfa fetch (TR cookie, EN/AR/DE/ES prefixli) → **30/30 HTTP 200**.
  - **Görünür metin ayıklama:** `<script>`/`<style>` blokları önce strip → RSC flight payload (`self.__next_f`) + href + class **otomatik dışarıda**; yalnız DOM text-node'ları kaldı (Faz 3 deseni, href/namespace ≠ render yüzeyi çözüldü).

- [x] **2. S5 — Taksonomi & dürüstlük**
  - "Crew OS" beklenen yüzeylerde: home 7× (5 dil), `/bunker-os` showcase 5× (5 dil), bülten 1× (5 dil). alpfit/vaka 0× = **beklenen** (minimal nav; Alpfit taksonomiyle doğru şekilde Crew OS'a karıştırılmıyor).
  - "Bunker" **30/30 görünür metinde YOK** — namespace `bunker`/`bunkerOs` + `/bunker-os` route + `components/bunker-os/` iç kalıntı (değerler hep "Crew OS"), script-strip ile ayrıştırıldı.
  - Uydurma sonuç/sayı YOK (vaka outcome'ları nitel-rakamsız; panel metrikleri nitel; bülten rakamları gerçek ürün adı "11x.ai" + tipik sektör benchmark aralıkları, "typical ranges" çerçeveli). Sahte "● online" YOK ("online" kelimesi hiçbir sayfada yok). "canlı/live" hepsi meşru (gerçekten-canlı Alpfit, canlı chatbot demo, live occupancy/listings ürün özelliği, Crew OS showcase paneli) — niyet-bazlı kural. Yasak metafor (doktor/teşhis/hekim/reçete, doctor/diagnos/prescri, Dinle/Listen, lorem) **hepsi temiz**.

- [x] **3. S6-render — 5-dil render bütünlüğü**
  - **30/30 sayfada `MISSING_MESSAGE` YOK** (+ diğer intl hata string'leri yok). Tüm sayfalar `lang` doğru, AR hep `dir="rtl"`.
  - Leak metriği: **=TR%0 her sayfada** → TR-leak YOK (Faz 3'ün uyardığı birebir-TR-kopya bug'ı oluşmuyor). home + crewos ar/de/es =EN%0 → gerçekten çevrilmiş. **4 alt sayfa (alpfit/vaka/bulten1/bulten2) ar/de/es =EN%87–93 → İngilizce-stale** (çeviri versiyon-sınırı bekliyor; eksik anahtar/MISSING_MESSAGE değil, TR-leak değil, görünür render kopukluğu değil).
  - AR render: home_ar 2441 + crewos_ar 807 Arapça glif (tam Arapça); non-AR sayfalarda 0 Arapça glif (çapraz-kontaminasyon yok). AR `dir="rtl"` + MISSING_MESSAGE yok teyitli.

- [x] **4. Triyaj & kayıt**
  - TK7: **kapsam-içi gerçek bug YOK**, kaynak kod değişmedi. Sahipli/ertelenmiş kayıt (record-not-fix): 4 alt sayfa non-TR (ar/de/es) İngilizce-stale → versiyon-sınırı çevirisi (prd-review / sonraki versiyon). Sonuç özeti Oturum Kaydı + PHASE-9 notunda.

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

- [x] 30 sayfa render-metin taraması koşuldu (script/style-strip ile görünür DOM text; href/namespace otomatik dışarıda)
- [x] "Crew OS" beklenen yüzeylerde doğrulandı (home 7× · showcase 5× · bülten 1×, 5 dil); "Bunker" 30/30 görünür metinde yok (iç kalıntı ayrıştırıldı)
- [x] Uydurma sonuç / sahte "● online" / yasak metafor taraması temiz (canlı/live meşru, niyet-bazlı; benchmark rakamları çerçeveli)
- [x] 30/30 sayfada `MISSING_MESSAGE` yok; TR-leak yok (=TR%0); İngilizce-stale alt sayfa non-TR sahipli kaydedildi (render kopukluğu değil)
- [x] AR render/parite (`dir="rtl"` + AR metin, MISSING_MESSAGE yok) teyit edildi
- [x] Bulgular triyaj edildi; PHASE-9 + task doc'a yazıldı

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum 1 — 2026-07-02

**Yapılanlar:**
- Fresh prod build (`npm run build` temiz) + `next start -p 3000`; listening-PID 77012 fresh process teyit (stray/stale yok, port önce boştu).
- 30 sayfa (6 × 5 locale) fetch: TR cookie+prefixsiz, EN/AR/DE/ES prefixli → **30/30 HTTP 200**, `html lang` doğru, AR `dir="rtl"`. Görünür metin ayıklama: `<script>`/`<style>` önce strip → RSC flight payload + href + class dışarıda, yalnız DOM text (href/namespace ≠ render yüzeyi otomatik çözüldü).
- **S5 taksonomi/dürüstlük:** "Crew OS" home 7× · `/bunker-os` showcase 5× · bülten 1× (hepsi 5 dil); alpfit/vaka 0× = beklenen (minimal nav, Alpfit doğru şekilde ayrı). "Bunker" **30/30 görünür metinde yok** (namespace/route/komponent iç kalıntısı, değerler hep "Crew OS"). Yasak metafor (doktor/teşhis/hekim/reçete · doctor/diagnos/prescri · Dinle/Listen · lorem) hepsi temiz. "online" hiçbir sayfada yok; "canlı/live" hepsi meşru (gerçekten-canlı Alpfit "şu an canlıda", canlı chatbot demo, "live occupancy/listings" ürün özelliği, Crew OS showcase paneli — niyet-bazlı). Rakamlar: vaka outcome'ları nitel-rakamsız, panel metrikleri nitel; bülten sayıları gerçek ürün "11x.ai" + tipik sektör benchmark aralıkları ("typical ranges" çerçeveli) → uydurma Kiwi sonucu yok.
- **S6-render:** 30/30 sayfada `MISSING_MESSAGE` (+ diğer intl hata string'i) yok. Leak metriği (node, marka/parazit filtreli cümle örtüşmesi): **=TR%0 her sayfa** → TR-leak yok. home + crewos ar/de/es =EN%0 = gerçekten çevrilmiş; **4 alt sayfa (alpfit/vaka/bulten1/bulten2) ar/de/es =EN%87–93 = İngilizce-stale**. AR render: home_ar 2441 + crewos_ar 807 Arapça glif; non-AR sayfalarda 0 Arapça glif (kontaminasyon yok).

**Bulgular / Triyaj (TK7):**
- **Kapsam-içi gerçek bug: yok.** Kaynak kod değişmedi; düzeltme task'ı gerekmedi.
- **Sahipli kayıt (record-not-fix, versiyon-sınırı):** 4 alt sayfa (alpfit, vaka, bulten1, bulten2) non-TR (ar/de/es) içeriği İngilizce-stale (=EN 87–93%). Bu **eksik anahtar/MISSING_MESSAGE değil** (0/30), **TR-leak değil** (=TR%0), **render kopukluğu değil** (tam okunur, `dir=rtl` doğru, boş/kırık bölüm yok) → bilinçli-stale non-TR, çeviri versiyon-sınırında yapılır (PRD §5 TR-tek-kaynak). Nicel envanter: çevrilmesi bekleyen yüzey = 4 alt sayfa × 3 dil (ar/de/es) = 12 sayfa-locale; home + Crew OS 5 dilde tamam. → prd-review / sonraki versiyon çeviri kararına.

**Son Yaklaşım:** Task tamamlandı — S5 taksonomi/dürüstlük ve S6-render bütünlüğü uçtan-uca temiz; tek sahipli kalem alt-sayfa non-TR stale (versiyon-sınırı, ertelenmiş).

**Sonraki Adım Detayı:** run-task TASK-9.03 (S8-suite + S6-parite: `test:e2e` 52 axe + `test` 7 Vitest parite + CI `fast`+`a11y` yeşil) — yeni oturum.

**Kaynak kod değişmedi** (doğrulama fazı); yalnız `_dev/` dokümanları güncellendi.

---

**Oluşturulma:** 2026-07-02
