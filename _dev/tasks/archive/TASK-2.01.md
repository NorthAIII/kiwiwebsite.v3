# TASK-2.01: TD1 — Non-TR çeviri senkronu (R1 step + R2 gym + F6 hero CTA → EN/AR/DE/ES)

**Durum:** ✅ Tamamlandı
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

- [x] **1. `hero.ctaSecondary` (4 dil × 1 değer)** — EN `See working examples` · DE `Funktionierende Beispiele ansehen` · ES `Ver ejemplos que funcionan` · AR `شاهد أمثلة تعمل فعلًا`. Eski `See it live` varyantları kaldırıldı.

- [x] **2. `how.steps.{analyze,automate,report}.body` (4 dil × 3 body)** — 4 dilde güncel TR'ye hizalandı: analyze ("nerede sızdığı"/elle tekrarlanan adımlar+kaçan takipler+veri taşıma saatleri), automate ("tasarladığımız akışı"), report ("kazanç varsayılmaz, ölçülür"). `design.body` + tüm `title`/`n` **dokunulmadı**.

- [x] **3. `sectors.items.gyms.{automation,body}` (4 dil × 2 değer)** — eski özellik-listesi ("Gym Management Software / Memberships…") → R2 tek-otomasyon "kaçan üyeyi geri kazanma" desenine güncellendi (4 dil). `gyms.flow.*` **dokunulmadı** (zaten senkron).

- [x] **4. Doğrulama:** 5-dil flatten/diff = her dil 197 anahtar, TR ile birebir set (sıfır eksik/fazla) · `next build` temiz (37/37, MISSING_MESSAGE yok) · yerel prod sunucuda /en /de /es /ar render + /ar `dir="rtl"` görsel teyit.

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

- [x] 5-dil flatten/diff: her dil **hâlâ 197 anahtar**, sıfır eksik/fazla, TR ile birebir set (saf değer güncellemesi teyidi)
- [x] `hero.ctaSecondary` EN/AR/DE/ES'de TR anlamını taşıyor; eski "See it live" varyantları yok
- [x] `how.steps.{analyze,automate,report}.body` 4 dilde güncel TR'yi yansıtıyor (analyze: "nerede sızdığı"/elle tekrarlanan adımlar; report: "kazanç varsayılmaz, ölçülür"); `design.body` + title'lar değişmemiş
- [x] `sectors.items.gyms.{automation,body}` 4 dilde R2 tek-otomasyon desenini taşıyor (eski "Gym Management Software / Memberships, payments" yok); `gyms.flow.*` değişmemiş
- [x] `next build` temiz (MISSING_MESSAGE / eksik anahtar yok — "Compiled successfully", 37/37, exit 0)
- [x] Görsel: yerel prod (`next start`) `/en` Hero ikincil CTA + "Nasıl Çalışır" 4 adım (analyze/automate/report) + Sektörler(gym) güncel metni gösteriyor; `/de` `/es` gözle teyit; `/ar` `dir="rtl"` korunmuş
- [x] F5 dürüstlük: senkronlanan değerler uydurma sonuç/sayı eklemiyor; süreç-dürüstlüğü çerçevesi korunuyor ("gain isn't assumed, it's measured" · "win-back isn't left to chance")

---

## Risk ve Geri Dönüş Planı

- **Risk:** Yanlış path düzenleme / JSON virgül-parantez bozma → build/parse hatası. → Düzenleme sonrası `next build` + flatten/diff ile yakala.
- **Rollback:** `git checkout -- messages/{en,ar,de,es}.json` (yalnız değer değişti, geri dönüş kolay).

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
- 3 stale kalem 4 dilde (en/ar/de/es) TR ile senkronlandı; her dilde 6 değer = toplam 24 değer (4 dosya × 6).
- `hero.ctaSecondary`: "işleyen örnekleri gör" anlamına; `how.steps.{analyze,automate,report}.body`: güncel TR zenginleştirmesi (design.body + title'lar dokunulmadı); `sectors.items.gyms.{automation,body}`: R2 tek-otomasyon "kaçan üyeyi geri kazanma" deseni (gyms.flow dokunulmadı).
- Düzenleme path/değer bazlı (grep ile konumlandı, satır no'ya güvenilmedi — diller arası sıra drift'i). Yeniden sıralama yapılmadı.
- AR çeviride flow ile tutarlı terim (واتساب, المدرّب) + Arapça noktalama (`،` `؛`) kullanıldı; RTL korundu.

**Sorunlar:**
- **Bayat yerel sunucu tuzağı:** İlk görsel doğrulamada `next start -p 3137` önceki oturumdan kalan bir `next-server` (port 3137'yi tutuyordu) yüzünden porta bağlanamadı; curl eski (edit-öncesi build) sunucuya gitti → tüm yeni metinler "bulunamadı" (yanlış negatif). Çözüm: diskteki prerender (`.next/server/app/en.html`) yeni değerleri içeriyordu (build doğru) → stray PID öldürüldü, temiz portta (3141) yeniden başlatıldı, sahiplenen PID teyit edildi, doğrulama yeşil. (Ders → faz retrosu adayı: yerel görsel doğrulamada sunucunun **kendi** fresh process'in olduğunu listening-PID ile teyit et.)

**Kararlar:**
- `automate.body` EN/diğerlerinde "those steps" → "tasarladığımız akış" referansına hizalandı (design→automate sürekliliği; TR'yi yansıtır). Düşük riskli, task kapsamı içi.
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari/tasarım kararı yok; mevcut dil stratejisinin versiyon-sınırı teslimi).

**Dosya Değişiklikleri:**
- `messages/en.json` · `messages/de.json` · `messages/es.json` · `messages/ar.json` → her birinde 6 değer (3 kalem). `messages/tr.json` → değişmedi (tek kaynak).

**Test Sonuçları:**
- 5-dil flatten/diff: her dil 197 anahtar, TR ile birebir set (0 eksik / 0 fazla).
- `next build`: ✓ Compiled successfully, Generating static pages (37/37), exit 0, MISSING_MESSAGE yok.
- Yerel prod render: /en /de /es /ar yeni metinleri gösteriyor; /ar `dir="rtl"`; eski stale değerler anasayfadan kalktı.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-28

**Ne Yapıldı:**
- v0.1'de yalnız TR'de değişen 3 içerik kalemi (`hero.ctaSecondary`, `how.steps.{analyze,automate,report}.body`, `sectors.items.gyms.{automation,body}`) EN/AR/DE/ES'de TR ile senkronlandı — saf değer güncellemesi, anahtar adı/sayısı sabit (5×197 parite korundu). Dil stratejisinin (DECISIONS 2026-06-27) versiyon-sınırı teslim noktası kapatıldı.

**Öğrenilenler:**
- Yerel görsel doğrulamada bayat/stray `next-server` yanlış-negatif üretebiliyor; serve eden process'in fresh olduğunu listening-PID ile doğrula (faz retrosuna aday).

---

**Oluşturulma:** 2026-06-28
