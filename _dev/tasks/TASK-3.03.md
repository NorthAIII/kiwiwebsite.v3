# TASK-3.03: S5 — Taksonomi & Dürüstlük Tutarlılığı (5 dil render)

**Durum:** ⬜ Bekliyor
**Modül:** M2 — Sayfalar & Bölümler (modules/M2-Sayfalar-Bolumler.md) (+ M4)
**Feature:** S5 — Taksonomi & dürüstlük tutarlılığı (çapraz/sahipsiz validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (kanonik prod serve gerekir)

---

## Hedef

Render edilen **görünür metinde** ürün taksonomisi ve dürüstlük konvansiyonunun 5 dilde tutarlı olduğunu doğrula: "Crew OS" her yüzeyde görünür, "Bunker" hiçbir görünür yüzeyde yok; render'da uydurma müşteri-sonucu / sahte "● online" presence / yasak metafor (doktor/teşhis/hekim/reçete, zayıf adım adı) yok. Araç: curl ile 5 dil home HTML çek + grep. Beş dilde tarama bitip sonuçlar kaydedildiğinde tamamlanmış sayılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.5 Crew OS teaser (taksonomi), F2.4 dürüst canlı rozet
- `_dev/phases/PHASE-3.md` — Araştırma → Dikkat ("Bunker" anahtar ≠ render yüzeyi) + S5 araç satırı
- `_dev/ILKELER.md` — Marka sesi yasakları + "● online" niyet-bazlı kapsam

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.03 durumu

---

## Alt Görevler

- [ ] **1. "Crew OS" varlığı (5 dil)**
  - 5 dil home render HTML'de bayrak katman **"Crew OS"** olarak görünür metinde geçer.

- [ ] **2. "Bunker" sızıntısı yok (5 dil)**
  - Render edilen **görünür metinde** "Bunker" YOK. İç kalıntılar (route `/bunker-os`, `Bunker.tsx` komponent adı, messages namespace anahtarı `bunker`) **hariç** — bunlar render yüzeyi değil (research notu). grep case varyasyonları (Bunker/bunker/BUNKER) + HTML entity'ye dikkat.

- [ ] **3. Yasak metafor taraması (5 dil)**
  - Render'da doktor / teşhis / hekim / reçete + zayıf adım adı ("Dinle"/"Listen") yok (dillere göre karşılıkları da).

- [ ] **4. Sahte presence & uydurma sonuç (5 dil)**
  - Sahte "● online/canlı" presence tiyatrosu yok. (Dürüst canlı gösterge — örn. "Canlı — Alpfit" — yasağın dışında; niyet-bazlı, DECISIONS 2026-06-28. Home render'da görünüyorsa dürüst-çerçeve mi teyit.)
  - Sonuç/sayı iması taşıyan metin "öngörü/örnek" çerçeveli (uydurma müşteri sonucu yok — R4/F5 dürüstlük konvansiyonu).

- [ ] **5. Triyaj (TK6)**

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Bulgular bu task dokümanına kaydedilir; özet verify-phase'de PHASE-3 UAT'ına taşınır. İstisna: kapsam-içi bug → ayrı fix-task.

---

## Dikkat Noktaları

- **"Bunker" anahtar-adı/komponent/route ≠ render yüzeyi.** messages JSON'da `bunker` bir namespace anahtarı; değeri her dilde **"Crew OS"** **(repo:** messages/*.json:10**).** `Bunker.tsx` + `/bunker-os` href iç kalıntı (public `/crew-os` ertelendi — M6). S5 yalnız **render edilen görünür metni** denetler; kaynak/URL değil.
- **"● online" yasağı niyet-bazlı** (ILKELER + DECISIONS 2026-06-28): sahte presence tiyatrosu yasak; gerçek canlı ürünün dürüst göstergesi serbest.
- **Ortam:** TASK-3.01 prod serve; PID fresh teyit (memory).

---

## Test Kriterleri

- [ ] 5 dil görünür metinde "Crew OS" mevcut.
- [ ] 5 dil görünür metinde "Bunker" YOK (route/komponent/namespace iç kalıntısı hariç).
- [ ] 5 dil render'da yasak metafor yok.
- [ ] Sahte "● online" presence yok; sonuç imaları "öngörü/örnek" çerçeveli (uydurma sonuç yok).

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

**Durum:** ⬜ Bekliyor

---

**Oluşturulma:** 2026-06-29
