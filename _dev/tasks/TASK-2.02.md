# TASK-2.02: TD2 — Ölü anahtar hijyeni (proof.* + forum.articles.* → 5 dilden sil)

**Durum:** ⬜ Bekliyor
**Modül:** M4 i18n (+M2 tüketim) — `modules/M4-i18n.md`, `modules/M2-Sayfalar-Bolumler.md`
**Feature:** TD2: Ölü anahtar hijyeni
**Faz:** Phase 2 (phases/PHASE-2.md)
**Bağımlılıklar:** Yok (TASK-2.01 ile bağımsız — farklı anahtarlar; sıra serbest)

---

## Hedef

Render edilmeyen iki ölü anahtar grubunu — tüm `proof` namespace'i (`proof.label`, `proof.note`) ve tüm `forum.articles` namespace'i (`one/two/three/four` × `{title,tag,readingTime}` = 12 yaprak) — **5 dilden** (TR dahil) tamamen sil. Düşük maliyetli bakım/modülerlik hijyeni (QUALITY §5); git history kaydı korur. 14 yaprak × 5 dil silindiğinde, her dil 197 → **183** anahtarda kalıp `next build` temiz geçtiğinde tamamlanmış sayılır.

---

## Bağlam

`proof.note` R4'te cümle-içi dürüstlük çerçevelemesiyle (F5) **superseded**; `forum.articles` için render planı yok (Forum.tsx yalnız `featured/featured2/label/title/sub/cta/note` tüketir). Araştırma (PHASE-2) her iki grubun da `src/`'de **hiç tüketilmediğini** grep'le teyit etti ("articles" eşleşmeleri "p**articles**" yan-eşleşmesi; gerçek tüketim yok). İleride forum render edilirse başlıklar dürüst (F5) çerçeveyle **yeniden** eklenir — bu task silme, ekleme değil.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-2.md` — "Araştırma Bulguları → TD2" (render-yok teyidi, 197→183, 5-dil tutarlılığı tuzağı)
- `_dev/modules/M4-i18n.md` — F4.2 (eksik anahtar = runtime hata; bu yüzden silme 5 dilde **birlikte**)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-2.md` — Task Listesi tablosunda durum

---

## Alt Görevler

- [ ] **1. `proof` namespace'ini sil (5 dil)**
  - `proof` objesinin tamamını (`label` + `note`) `messages/{tr,en,ar,de,es}.json`'dan kaldır
  - Konum: anahtar path `"proof"` (grep ile bul; TR'de `hero` ile `how` arasında)

- [ ] **2. `forum.articles` namespace'ini sil (5 dil)**
  - `forum.articles` objesinin tamamını (`one/two/three/four` × 3 yaprak = 12 yaprak) `messages/{tr,en,ar,de,es}.json`'dan kaldır
  - Konum: `forum` namespace içinde `"articles"` (grep ile bul)
  - `forum`'un diğer anahtarlarına (`featured/featured2/label/title/sub/cta/note`) **DOKUNMA**

- [ ] **3. JSON bütünlüğü:** Silme sonrası virgül/parantez bütünlüğünü her dilde koru (objenin son/orta eleman oluşuna göre virgül ayarı) — parse hatası bırakma

- [ ] **4. Doğrulama:** 5-dil flatten/diff (183 parite) + grep ile referans-yok teyidi + `next build` temiz (aşağı, Test Kriterleri)

---

## Etkilenen Dosyalar

```
messages/
├── tr.json    # proof{} + forum.articles{} sil
├── en.json    # proof{} + forum.articles{} sil
├── ar.json    # proof{} + forum.articles{} sil
├── de.json    # proof{} + forum.articles{} sil
└── es.json    # proof{} + forum.articles{} sil
```

> Yeni dosya yok. `src/` koduna dokunulmaz (anahtarlar zaten tüketilmiyor).

---

## Dikkat Noktaları

- **5-dil eşzamanlı sil.** Tek dilde kalan anahtar = drift. Silme 5 dilde **birlikte** yapılır; sonra 183 paritesi doğrulanır.
- **Render-yok teyitli ama yine de build kanıtla.** Araştırma tüketim olmadığını gösterdi; yine de silme sonrası `next build` MISSING_MESSAGE üretmemeli (SSG render'da referans yok).
- **JSON virgül-bütünlüğü.** `proof` (TR'de `hero`/`how` arası — orta eleman) ve `forum.articles` silinince kalan kardeş anahtarların virgülü doğru olmalı; her dilde dosya yapısı/sırası farklı olabilir → path'le bul, çevresini kontrol et.
- **Yalnız bu iki grup.** `forum`'un diğer anahtarları + tüm diğer namespace'ler dokunulmaz.
- **Satır numarasına güvenme** (diller arası sıralama drift'i) — `grep -n "\"proof\""` / `grep -n "\"articles\""` ile konumlan.

---

## Test Kriterleri

- [ ] `proof` namespace'i 5 dilden tamamen silindi (`grep "\"proof\"" messages/*.json` → boş)
- [ ] `forum.articles` namespace'i 5 dilden tamamen silindi (`grep "\"articles\"" messages/*.json` → boş)
- [ ] 5-dil flatten/diff: her dil **183 anahtar**, sıfır eksik/fazla (14 yaprak × 5 dil silindi)
- [ ] Her dosya geçerli JSON (parse hatası yok)
- [ ] `next build` temiz (MISSING_MESSAGE / silinen anahtara referans yok)
- [ ] `src/`'de `proof`/`forum.articles` referansı yok; `Forum.tsx` etkilenmemiş (featured/label/cta/note çalışıyor)

---

## Risk ve Geri Dönüş Planı

- **Risk:** Beklenmeyen bir tüketici → build kırılır / runtime boşluk. → Araştırma render-yok teyit etti; `next build` ile kesinleştir.
- **Risk:** JSON virgül hatası → parse fail. → Silme sonrası her dosyayı build/parse ile doğrula.
- **Rollback:** `git checkout -- messages/` (silme geri alınır; git history zaten içeriği kalıcı tutar).

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
