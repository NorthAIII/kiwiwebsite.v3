# TASK-2.02: TD2 — Ölü anahtar hijyeni (proof.* + forum.articles.* → 5 dilden sil)

**Durum:** ✅ Tamamlandı
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

- [x] **1. `proof` namespace'ini sil (5 dil)**
  - `proof` objesinin tamamını (`label` + `note`) `messages/{tr,en,ar,de,es}.json`'dan kaldır
  - Konum: anahtar path `"proof"` (grep ile bul; TR'de `hero` ile `how` arasında)

- [x] **2. `forum.articles` namespace'ini sil (5 dil)**
  - `forum.articles` objesinin tamamını (`one/two/three/four` × 3 yaprak = 12 yaprak) `messages/{tr,en,ar,de,es}.json`'dan kaldır
  - Konum: `forum` namespace içinde `"articles"` (grep ile bul)
  - `forum`'un diğer anahtarlarına (`featured/featured2/label/title/sub/cta/note`) **DOKUNMA**

- [x] **3. JSON bütünlüğü:** Silme sonrası virgül/parantez bütünlüğünü her dilde koru (objenin son/orta eleman oluşuna göre virgül ayarı) — parse hatası bırakma

- [x] **4. Doğrulama:** 5-dil flatten/diff (183 parite) + grep ile referans-yok teyidi + `next build` temiz (aşağı, Test Kriterleri)

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

- [x] `proof` namespace'i 5 dilden tamamen silindi (`grep "\"proof\"" messages/*.json` → boş)
- [x] `forum.articles` namespace'i 5 dilden tamamen silindi (`grep "\"articles\"" messages/*.json` → boş)
- [x] 5-dil flatten/diff: her dil **183 anahtar**, sıfır eksik/fazla (14 yaprak × 5 dil silindi)
- [x] Her dosya geçerli JSON (parse hatası yok — `json.loads` 5 dilde geçti)
- [x] `next build` temiz (37/37 static page, exit 0; MISSING_MESSAGE / silinen anahtara referans yok)
- [x] `src/`'de `proof`/`forum.articles` referansı yok; `Forum.tsx` yalnız `label/title/sub/featured.*/featured2.*/cta/note` tüketiyor (etkilenmedi)

---

## Risk ve Geri Dönüş Planı

- **Risk:** Beklenmeyen bir tüketici → build kırılır / runtime boşluk. → Araştırma render-yok teyit etti; `next build` ile kesinleştir.
- **Risk:** JSON virgül hatası → parse fail. → Silme sonrası her dosyayı build/parse ile doğrula.
- **Rollback:** `git checkout -- messages/` (silme geri alınır; git history zaten içeriği kalıcı tutar).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-28

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `proof` (top-level) + `forum.articles` (`one/two/three/four` × `{title,tag,readingTime}`) namespace'leri 5 dilden (tr/en/ar/de/es) silindi — 14 yaprak × 5 dil.
- Silme path-bazlı yapıldı: anahtarı strip-match ile bulan + brace-sayımıyla blok sınırını saptayan Python script (satır no'ya güvenmedi — diller-arası sıralama drift'i riski). Script metni byte-byte korudu (reserialize yok) ve yazmadan önce 197→183 parite + parse + forum kardeşlerinin korunduğunu assert etti.
- 5 dosyada da `git diff --numstat` = `0 26` (saf silme: 4 satır proof + 22 satır articles; sıfır ekleme).

**Sorunlar:**
- Yok. Araştırmanın render-yok teyidi (`proof`/`articles` `src/`'de tüketilmiyor) build ile kesinleşti.

**Kararlar:**
- Silme yöntemi olarak satır-aralığı yerine path+brace-sayımı tercih edildi (sıralama drift'i tuzağına karşı); reserialize yerine textual silme (cerrahi diff, Arapça/curly-apostrof gibi karakterler aynen korundu).
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari karar değil; mevcut i18n disiplininin icrası).

**Kalan İşler:** Yok.

**Son Yaklaşım:** Tamamlandı — pause/devam gerekmedi.

**Sonraki Adım Detayı:** Faz 2'nin son task'ı TASK-2.03 (TD3 perf/Lighthouse) sırada; ayrı oturumda `/devflow:run-task`.

**Dosya Değişiklikleri:**
- `messages/tr.json` · `en.json` · `ar.json` · `de.json` · `es.json` → her birinden `proof{}` + `forum.articles{}` silindi (197→183 anahtar).
- `src/` → dokunulmadı (anahtarlar zaten tüketilmiyordu).

**Test Sonuçları:**
- `grep "\"proof\"" / "\"articles\"" messages/*.json` → boş (5 dilde silindi).
- 5-dil flatten parite: her dil 197→**183**, sıfır eksik/fazla; `json.loads` 5 dilde parse temiz.
- `npm run build` → ✓ Compiled successfully, ✓ 37/37 static page, exit 0 — MISSING_MESSAGE yok.
- `Forum.tsx` yalnız `label/title/sub/featured.*/featured2.*/cta/note` tüketiyor → etkilenmedi (`/bulten` rotaları render edildi).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-28

**Ne Yapıldı:**
- İki ölü anahtar grubu (`proof.*` + `forum.articles.*`, 14 yaprak) 5 dilden tamamen silindi; her dil 197→183 anahtarda parite korudu.
- Cerrahi diff (5×`0/26`, saf silme), 5-dil parse temiz, `next build` temiz (37/37, MISSING_MESSAGE yok), `Forum.tsx` korunan anahtarlarla etkilenmedi.

---

**Oluşturulma:** 2026-06-28
