# TASK-1.02: Sektörler — Gym Paneli Tek-Otomasyon Desenine (TR i18n)

**Durum:** ✅ Tamamlandı
**Modül:** M2 (SectorSolutions) + M4 (i18n) — `modules/M2-Sayfalar-Bolumler.md` (F2.4), `modules/M4-i18n.md` (F4.2)
**Feature:** R2 — Sektörler gym paneli tek-otomasyona
**Faz:** Phase 1 (`phases/PHASE-1.md`)
**Bağımlılıklar:** Yok (R1'den bağımsız ayrı bölüm)

---

## Hedef

Sektör çözümleri bölümünde `gyms` panelinin sol tarafını, bölümün kendi sözünü ("her örnek tek otomasyon — özellik listesi değil", `sectors.sub`) bozan **Alpfit özellik listesinden** çıkarıp **tek somut otomasyona** getirmek. Yalnız `sectors.items.gyms.automation` + `.body` TR metni değişir; `gyms.flow` (zaten doğru: kaçan üye → WhatsApp teklif/PT → takip), "Canlı — Alpfit" rozeti ve Alpfit ürün CTA'sı (`/spor-salonu-yazilimi`) **korunur**. `SectorSolutions.tsx` component'ine dokunulmaz. TR metni tutarlı, dürüst ve diğer 5 sektörle aynı desende olduğunda **tamamlanmış** sayılır.

---

## Bağlam

prd-refine/research bulgusu: 6 sektörden 5'i (klinik, e-ticaret, emlak, eğitim, restoran) zaten tek-otomasyon desenine uyuyor ve özgün → **korunur**. Asıl iş dar: yalnız `gyms` paneli desen-dışı — sol taraf tek otomasyon değil bir özellik listesi ("Üyelik, ödeme, yoklama, ders ve PT takvimi…"). Bu, Alpfit *ürün* anlatımıdır; ürün/özellik anlatımı ayrı CTA + `/spor-salonu-yazilimi` sayfasında kalmalı, ana sayfa sektör panelinde değil.

Research bulgusu (R2 yüzeyi): **saf i18n**. `SectorSolutions.tsx` sol taraf (`name`/`automation`/`body`, satır 85-114) tüm sektörler için tek jenerik render yolu; gym-özel dallar (PAGES → "Uygulamayı incele" satır 95-103, "Canlı — Alpfit" rozeti satır 118-126, "Canlı ürünü gör" linki satır 139-148) gövde metninden bağımsız → component dokunulmadan yalnız TR metin değişir.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-1.md` — Kapsam Tartışması (R2 kararı) + Araştırma Bulguları (R2 saf-i18n bulgusu, korunan dallar)
- `_dev/PRD/features/sektorler-derinlestirme.md` — R2 PRD kaynağı (gym tek-otomasyona, diğer 5 korunur)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.4 (kabul kriterleri, edge case: gym desen-dışı, live rozeti korunur)
- `_dev/QUALITY.md` — §1 Marka & Craft, §4 Yerelleştirme (dürüstlük: metrik = öngörü/örnek)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task durumu/özeti
- `_dev/phases/PHASE-1.md` — Task Listesi tablosunda 1.02 durumunu güncelle

---

## Alt Görevler

- [x] **1. `gyms.automation` başlığını tek-otomasyona getir**
  - Dosya: `messages/tr.json` → `sectors.items.gyms.automation` (satır 74)
  - Eski: "Spor Salonu Yönetim Yazılımı" (ürün adı — özellik-listesi başlığı).
  - Yeni: **"Kaçan üyeyi geri kazanma"** — klinik `-ma` ulaç desenine ("Gelmeyen randevuyu kurtarma") birebir uyar; ayrıca `bunker.flows.one` ("Kaçan üyeyi geri kazanma") ile çapraz-tutarlı (Crew OS panelinde çalışan akış = sektör panelinde detay).

- [x] **2. `gyms.body` gövdesini özellik listesinden tek otomasyon anlatısına çevir**
  - Dosya: `messages/tr.json` → `sectors.items.gyms.body` (satır 75)
  - Eski: "Üyelik, ödeme, yoklama, ders ve PT takvimi… hepsi tek panelde. Kapsamlı, sektöre özel yönetim yazılımı." (özellik listesi).
  - Yeni: "Bir üye sessizce uzaklaşmaya başladığında fark edilir; durumuna uygun kişisel bir teklif ve PT randevusu WhatsApp'tan iletilir — geri kazanım şansa bırakılmaz, tek tek takip edilir." (181 char, restoran ~185 ile uyumlu uzunluk). `gyms.flow` ile tutarlı düz-metin anlatı; Alpfit özellik anlatımı yok.

- [x] **3. Korunan dalları ve dürüstlüğü doğrula**
  - `gyms.flow.{trigger,action,result}` (satır 76-80) **değişmedi** (zaten doğru tek-otomasyon).
  - "Canlı — Alpfit" rozeti (`sectors.live`) + "Canlı ürünü gör" (`sectors.seeLive`) + "Uygulamayı incele" (`sectors.viewApp`, `/spor-salonu-yazilimi`) **korundu** (Playwright + curl ile teyit).
  - Dürüstlük: gövdede uydurma müşteri-sonucu/sayı yok; mekanizma anlatılır, sonuç şişirme yok (F5).

---

## Etkilenen Dosyalar

```
messages/
└── tr.json     # sectors.items.gyms.automation (69) + .body (70) — zaten var
```

> Bu fazda **yeni dosya/anahtar yok** — mevcut anahtarların TR *değeri* değişir. `SectorSolutions.tsx` **dokunulmaz**.

---

## Dikkat Noktaları

- **Saf i18n — component dokunulmaz:** `SectorSolutions.tsx` sol taraf tüm sektörler için jenerik render; yalnız `gyms` TR metni değişir. Component'e dallanma/koşul EKLENMEZ.
- **Korunan gym dalları (research):** `PAGES.gyms="/spor-salonu-yazilimi"` (satır 13), live rozeti (satır 118-126), seeLive linki (satır 139-148), viewApp linki (satır 95-103) gövde değişiminden **etkilenmemeli** — bunlar `automation`/`body`'den bağımsız.
- **Versiyon-sınırı:** R2 = **aynı anahtar, değişen değer** → non-TR **stale-kopya kabul** (yalnız TR güncellenir; en/ar/de/es eski gym metnini taşımaya devam eder — eksik anahtar değil, geçici stale).
- **"Canlı — Alpfit" rozeti dürüst gösterge:** Gerçekten canlı ürün → yasak değil (sahte presence yasağı kapsamı dışı, DECISIONS 2026-06-28). Korunur.
- **Diğer 5 sektör korunur:** klinik/e-ticaret/emlak/eğitim/restoran panelleri elden geçirilmez (yalnız F5 taraması — o TASK-1.03'te).
- **Anahtar kaynağı:** `sectors.items.gyms.{automation,body,flow}` **repoda-tanımlı** (`messages/*.json`; tüketim `SectorSolutions.tsx`).

---

## Test Kriterleri

- [x] `next build` temiz geçer. (Compiled successfully 917ms, TS strict + lint geçti, exit 0)
- [x] Ana sayfa (TR `/`) Sektörler bölümü, `gyms` sekmesinde sol tarafta **tek otomasyon** başlığı + anlatısı gösterir (özellik listesi değil); bölümün `sub` sözüyle ("özellik listesi değil") tutarlı. (Playwright a11y snapshot + screenshot teyidi)
- [x] `gyms` panelinde sağdaki akış (trigger/action/result) değişmeden durur; "Canlı — Alpfit" rozeti + "Canlı ürünü gör" linki + "Uygulamayı incele" CTA korunur ve `/spor-salonu-yazilimi`'ye gider. (curl + Playwright teyidi)
- [x] Diğer 5 sektör paneli değişmeden render eder. (yalnız `gyms` TR metni değişti; klinik vb. dokunulmadı)
- [x] Yeni gym gövdesi diğer sektör gövdeleriyle benzer uzunlukta — panel düzeni bozulmaz (clamp tipografi taşması yok). (181 char; ekran görüntüsünde `max-w-md` içinde 3 satır temiz sarım)
- [x] Dürüstlük: gym metninde uydurma müşteri-sonucu/sayı yok; sonuç iması varsa öngörü/örnek çerçevesinde. (mekanizma anlatısı; sayı/sonuç şişirme yok)

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (`feat(TASK-1.02): ...`)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md + PHASE-1.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-28

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- TR (`messages/tr.json`) `sectors.items.gyms.automation` "Spor Salonu Yönetim Yazılımı" (ürün adı/özellik-listesi başlığı) → **"Kaçan üyeyi geri kazanma"** (tek otomasyon, klinik `-ma` ulaç deseni; `bunker.flows.one` ile çapraz-tutarlı).
- `gyms.body` özellik listesi ("Üyelik, ödeme, yoklama… hepsi tek panelde. Kapsamlı… yönetim yazılımı.") → tek otomasyon anlatısı: "Bir üye sessizce uzaklaşmaya başladığında fark edilir; durumuna uygun kişisel bir teklif ve PT randevusu WhatsApp'tan iletilir — geri kazanım şansa bırakılmaz, tek tek takip edilir." (181 char; `gyms.flow` ile tutarlı).
- Saf i18n: `SectorSolutions.tsx` **dokunulmadı**; `gyms.flow.*`, live rozeti, seeLive/viewApp CTA'ları, `/spor-salonu-yazilimi` linki **değişmedi**.

**Sorunlar:**
- Yok. Değişiklik tek anahtar-değer çifti; component jenerik render yolu (sol taraf `name`/`automation`/`body`) gym-özel dallardan (rozet/CTA) bağımsız olduğu için yan etki yok.

**Kararlar:**
- Başlık adayları arasından "Kaçan üyeyi geri kazanma" seçildi (diğer aday "Kaçan üyeyi otomatik geri kazanım" — `-ım` formu klinik deseniyle daha zayıf uyumlu). docs/DECISIONS'a kayıt gerekmez (discuss/research kararıyla uyumlu, sapma yok).
- Versiyon-sınırı: R2 = aynı anahtar değişen değer → non-TR (en/ar/de/es) **stale-kopya kabul**; sadece TR güncellendi. AR sayfasında eski özellik-listesi gym metni hâlâ render ediyor → stale politikası doğru çalışıyor (Playwright ile gözlemlendi).

**Dosya Değişiklikleri:**
- `messages/tr.json` → `sectors.items.gyms.automation` (74) + `.body` (75) — yalnız TR değeri değişti

**Test Sonuçları:**
- `next build` temiz (Compiled successfully 917ms, TS strict + lint geçti, exit 0; `MISSING_MESSAGE`/`IntlError` yok). Ana sayfa SSG → 5 locale prerender geçti.
- TR HTML (curl `Accept-Language: tr`, `/` prefixsiz): yeni `automation` + `body` render ediliyor; eski "Spor Salonu Yönetim Yazılımı" / "hepsi tek panelde" kalktı; korunan dallar (live "Canlı — Alpfit", seeLive, viewApp, flow trigger, `/spor-salonu-yazilimi`) + diğer sektör (klinik "Gelmeyen randevuyu kurtarma") sağlam.
- Playwright (NEXT_LOCALE=tr): gym paneli a11y snapshot — sol taraf "Spor salonları · tek otomasyon" + "Kaçan üyeyi geri kazanma" + yeni gövde; sağ panel 01/02/03 flow değişmemiş, "Canlı — Alpfit" rozeti + "Canlı ürünü gör" korunmuş. Ekran görüntüsü: gövde `max-w-md` içinde 3 satır temiz sarım, taşma yok. AR'de stale özellik-listesi (versiyon-sınırı doğru).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-28

**Ne Yapıldı:**
- Ana sayfa Sektörler bölümünde `gyms` paneli özellik-listesinden tek-otomasyon desenine getirildi: `automation` = "Kaçan üyeyi geri kazanma", `body` = kaçan üye geri kazanım anlatısı (`gyms.flow` ile tutarlı). Bölümün "her örnek tek otomasyon — özellik listesi değil" sözü artık gym panelinde de tutuluyor.
- Saf i18n (yalnız `messages/tr.json` 2 değer); `SectorSolutions.tsx` ve korunan gym dalları (live rozeti, flow, CTA'lar, Alpfit linki) dokunulmadı. Non-TR stale-kopya (versiyon-sınırı).

**Öğrenilenler:**
- Sektör panelinde sol-taraf metni (`automation`/`body`) ile gym-özel render dalları (live rozeti, seeLive/viewApp CTA) component'te birbirinden bağımsız → içerik değişimi yan etki üretmiyor (research bulgusu icrada doğrulandı).

---

**Oluşturulma:** 2026-06-28
