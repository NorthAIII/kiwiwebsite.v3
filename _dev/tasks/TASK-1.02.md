# TASK-1.02: Sektörler — Gym Paneli Tek-Otomasyon Desenine (TR i18n)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. `gyms.automation` başlığını tek-otomasyona getir**
  - Dosya: `messages/tr.json` → `sectors.items.gyms.automation` (satır 69)
  - Mevcut: "Spor Salonu Yönetim Yazılımı" (ürün adı — özellik-listesi başlığı).
  - Yeni: `gyms.flow` ile uyumlu tek otomasyon başlığı (aday: "Kaçan üyeyi geri kazanma" / "Kaçan üyeyi otomatik geri kazanım"). Diğer 5 sektörün `automation` başlık deseniyle aynı tonda (örn. klinik "Gelmeyen randevuyu kurtarma").

- [ ] **2. `gyms.body` gövdesini özellik listesinden tek otomasyon anlatısına çevir**
  - Dosya: `messages/tr.json` → `sectors.items.gyms.body` (satır 70)
  - Mevcut: "Üyelik, ödeme, yoklama, ders ve PT takvimi, otomatik hatırlatma ve kaçan üye geri kazanımı — hepsi tek panelde. Kapsamlı, sektöre özel yönetim yazılımı." (özellik listesi).
  - Yeni: tek otomasyonu anlatan, `gyms.flow` (kaçan üye → WhatsApp teklif/PT → takip) ile tutarlı, diğer sektör `body`'leriyle aynı uzunluk/desende gövde. Alpfit özellik anlatımı yok (o, CTA + ürün sayfasında).

- [ ] **3. Korunan dalları ve dürüstlüğü doğrula**
  - `gyms.flow.{trigger,action,result}` (satır 72-74) **değişmez** (zaten doğru tek-otomasyon).
  - "Canlı — Alpfit" rozeti (`sectors.live`) + "Canlı ürünü gör" (`sectors.seeLive`) + "Uygulamayı incele" (`sectors.viewApp`, `/spor-salonu-yazilimi`) **korunur**.
  - Sonuç/sayı iması varsa öngörü/örnek çerçevesinde (F5 dürüstlük); uydurma müşteri-sonucu yok.

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

- [ ] `next build` temiz geçer.
- [ ] Ana sayfa (TR `/`) Sektörler bölümü, `gyms` sekmesinde sol tarafta **tek otomasyon** başlığı + anlatısı gösterir (özellik listesi değil); bölümün `sub` sözüyle ("özellik listesi değil") tutarlı.
- [ ] `gyms` panelinde sağdaki akış (trigger/action/result) değişmeden durur; "Canlı — Alpfit" rozeti + "Canlı ürünü gör" linki + "Uygulamayı incele" CTA korunur ve `/spor-salonu-yazilimi`'ye gider.
- [ ] Diğer 5 sektör paneli değişmeden render eder.
- [ ] Yeni gym gövdesi diğer sektör gövdeleriyle benzer uzunlukta — panel düzeni bozulmaz (clamp tipografi taşması yok).
- [ ] Dürüstlük: gym metninde uydurma müşteri-sonucu/sayı yok; sonuç iması varsa öngörü/örnek çerçevesinde.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`feat(TASK-1.02): ...`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-1.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** 🔄 Devam edecek

**Yapılanlar:**
- [doldurulacak]

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
- [doldurulacak]

---

**Oluşturulma:** 2026-06-28
