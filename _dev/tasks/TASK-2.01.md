# TASK-2.01: TD1 — Non-TR çeviri senkronu (R1 step + R2 gym + F6 hero CTA → EN/AR/DE/ES)

**Durum:** ⬜ Bekliyor
**Modül:** M4 i18n (+M2 tüketim) — `modules/M4-i18n.md`, `modules/M2-Sayfalar-Bolumler.md`
**Feature:** TD1: Non-TR çeviri senkronu
**Faz:** Phase 2 (phases/PHASE-2.md)
**Bağımlılıklar:** Yok

---

## Hedef

v0.1 içerik fazında (Faz 1) **yalnız TR'de** değişen 3 içerik kaleminin EN/AR/DE/ES değerlerini TR'nin güncel haliyle senkronla. Anahtar adı/sayısı değişmez (saf **değer** güncellemesi); dil stratejisinin (DECISIONS 2026-06-27) versiyon-sınırı teslim noktasıdır. `next build` temiz, 5 dilde 197 anahtar paritesi korunmuş ve 3 kalem 4 dilde TR ile anlamca senkron olduğunda tamamlanmış sayılır.

---

## Bağlam

Faz 1 revizesi **cerrahi** olarak TR'de yapıldı; non-TR diller kontrollü olarak *stale kopya* (aynı anahtar, eski metin) bırakıldı — eksik anahtar değil, eski değer. Bu task o ertelenmiş değer-senkronunu versiyon-sınırında kapatır. Araştırma (PHASE-2 "Araştırma Bulguları") stale yüzeyi **tam 3 kalem** olarak kodla teyit etti; başka stale yüzey yok. İncelik: non-TR `how.steps` "çevrilmiş gibi" görünür (4 adım tam çeviri mevcut) ama **eski taslaktan** — staleness eksik/bozuk değil, **semantik drift**.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-2.md` — "Araştırma Bulguları → TD1" (3 kalemin tam yüzeyi + tüketici satırları + tuzaklar)
- `_dev/modules/M4-i18n.md` — F4.2 (v0.1 versiyon-sınırı çeviri stratejisi, stale-kopya ≠ eksik anahtar)
- `_dev/ILKELER.md` — Marka sesi yasakları + F5 dürüstlük konvansiyonu (çeviriye taşınır)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-2.md` — Task Listesi tablosunda durum

---

## Alt Görevler

> **Kaynak = TR (`messages/tr.json`); hedef = `en/ar/de/es.json`.** TR'ye **dokunulmaz** (tek kaynak). Her düzenleme **anahtar path'iyle** (grep) konumlandırılır — satır numarasıyla değil (diller arası sıralama drift'i var; bkz. Dikkat Noktaları).

- [ ] **1. `hero.ctaSecondary` (4 dil × 1 değer)**
  - TR kaynak: `"İşleyen örnekleri gör"` (tr.json `hero.ctaSecondary`)
  - EN/AR/DE/ES'de eski `"See it live / Live ansehen / Míralo en vivo / شاهدها مباشرةً"` → TR anlamına ("işleyen/çalışan örnekleri gör") güncelle
  - Tüketici (görsel teyit): `src/components/Hero.tsx:81`

- [ ] **2. `how.steps.{analyze,automate,report}.body` (4 dil × 3 body)**
  - TR kaynak (tr.json): `analyze.body` ("…işin nerede sızdığını buluruz: elle tekrarlanan adımlar, kaçan takipler…"), `automate.body` ("Tasarladığımız akışı Crew OS içinde 7/24 çalışan otomasyona bağlarız."), `report.body` ("Her akışın ne kazandırdığını sayılarla görürsünüz — kazanç varsayılmaz, ölçülür.")
  - 4 dilde bu **3 body**'yi güncel TR zenginleştirmesiyle hizala
  - **DOKUNMA:** `design.body` (zaten senkron), tüm `title`'lar + `n` (tek sözcük/numara, doğru)
  - Tüketici: `src/components/HowItWorks.tsx:15-18` (sabit dizi `["analyze","design","automate","report"]`)

- [ ] **3. `sectors.items.gyms.{automation,body}` (4 dil × 2 değer)**
  - TR kaynak (tr.json): `automation` = `"Kaçan üyeyi geri kazanma"`, `body` = `"Bir üye sessizce uzaklaşmaya başladığında fark edilir; …geri kazanım şansa bırakılmaz, tek tek takip edilir."`
  - 4 dilde eski özellik-listesi içeriği ("Gym Management Software" / "Memberships, payments, check-ins…") → R2 tek-otomasyon desenine güncelle
  - **DOKUNMA:** `gyms.flow.{trigger,action,result}` (zaten senkron)
  - Tüketici: `src/components/SectorSolutions.tsx:90` (automation), `:93` (body) — flow `:133` (dokunulmaz)

- [ ] **4. Doğrulama:** 5-dil flatten/diff (197 parite) + `next build` + görsel kontrol (aşağı, Test Kriterleri)

---

## Etkilenen Dosyalar

```
messages/
├── en.json    # hero.ctaSecondary + how.steps.{analyze,automate,report}.body + sectors.items.gyms.{automation,body}
├── ar.json    # aynı 3 kalem (RTL/AR ses tabanına uygun)
├── de.json    # aynı 3 kalem
└── es.json    # aynı 3 kalem
# messages/tr.json — KAYNAK, DEĞİŞMEZ (tek kaynak)
```

> Hiçbiri YENİ değil (mevcut dosyalarda değer güncellemesi). Anahtar eklenmez/silinmez.

---

## Dikkat Noktaları

- **Anahtar adı/sayısı sabit — saf değer.** Anahtar eklenmez/silinmez; her dil 197 anahtarda kalır. (Araştırma: 5×197 sıfır eksik.)
- **Satır numarasına güvenme, path'le konumlan.** Dosya içi anahtar **sırası** TR/EN ile DE/ES/AR arasında farklı (ör. `sectors.live/flowLabel/seeLive` TR/EN'de ~67-69, DE/ES/AR'de ~131-133). Her düzenleme `grep -n "<path-parçası>"` ile bulunur. **Yeniden sıralama YAPILMAZ** (kapsam dışı, gereksiz risk; runtime path-lookup, sıra etkisiz).
- **"Çeviri var → senkron" yanılgısına düşme.** `how.steps` non-TR'de 4 adım tam görünür ama eski taslak — **güncel TR body** ile karşılaştır, semantik drift'i kapat.
- **F5 dürüstlük korunur.** TR zaten dürüst (öngörü/örnek çerçevesi, uydurma müşteri-sonucu yok); çeviri bunu **bozmaz** — sonuç/sayı iması eklenmez, abartı yapılmaz. (ILKELER → Marka sesi yasakları.)
- **AR:** mevcut AR ses/üslup tabanına uygun çevir (DECISIONS 2026-06-27 "AR koru"); RTL render bozulmamalı.
- **Sınırlı dokunuş:** yalnız listelenen path'ler — `design.body`, tüm `title`/`n`, `gyms.flow.*` **dokunulmaz**.

---

## Test Kriterleri

- [ ] 5-dil flatten/diff: her dil **hâlâ 197 anahtar**, sıfır eksik/fazla (saf değer güncellemesi teyidi)
- [ ] `hero.ctaSecondary` EN/AR/DE/ES'de TR anlamını taşıyor; eski "See it live" varyantları yok
- [ ] `how.steps.{analyze,automate,report}.body` 4 dilde güncel TR'yi yansıtıyor (analyze: "nerede sızdığı"/elle tekrarlanan adımlar; report: "kazanç varsayılmaz, ölçülür"); `design.body` + title'lar değişmemiş
- [ ] `sectors.items.gyms.{automation,body}` 4 dilde R2 tek-otomasyon desenini taşıyor (eski "Gym Management Software / Memberships, payments" yok); `gyms.flow.*` değişmemiş
- [ ] `next build` temiz (MISSING_MESSAGE / eksik anahtar yok)
- [ ] Görsel: `/en` ana sayfada Hero ikincil CTA + "Nasıl Çalışır" 4 adım + Sektörler(gym) güncel metni gösteriyor; `/ar` RTL bozulmamış (mümkünse `/de` `/es` de gözle)
- [ ] F5 dürüstlük: senkronlanan değerler uydurma sonuç/sayı eklemiyor (TR çerçevesini koruyor)

---

## Risk ve Geri Dönüş Planı

- **Risk:** Yanlış path düzenleme / JSON virgül-parantez bozma → build/parse hatası. → Düzenleme sonrası `next build` + flatten/diff ile yakala.
- **Rollback:** `git checkout -- messages/{en,ar,de,es}.json` (yalnız değer değişti, geri dönüş kolay).

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldurulacak]

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
- [Kısa özet]

---

**Oluşturulma:** 2026-06-28
