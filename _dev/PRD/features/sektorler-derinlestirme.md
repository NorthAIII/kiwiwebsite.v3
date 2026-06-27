# Sektörler Bölümü — Derinleştirme

## Özet

Ana sayfadaki interaktif Sektörler seçicisi altı sektörü kapsar: spor salonu, klinik, e-ticaret, emlak, eğitim & danışmanlık, restoran & kafe. **prd-refine (2026-06-28) bulgusu:** canlı kopya beklenenden güçlü — **6 sektörden 5'i** (klinik, e-ticaret, emlak, eğitim, restoran) zaten tek-otomasyon desenine (tetikleyici → eylem → sonuç) uyuyor, özgün ve doyurucu. REVIZE-BACKLOG A5'teki *"hepsi sığ"* tespiti **abartılı**.

**Asıl sorun dar ve nokta-atışı: `gyms` (spor salonu) paneli desen-DIŞI.** Sol tarafı tek bir somut otomasyon değil, Alpfit'in **özellik listesi** ("Üyelik, ödeme, yoklama, ders ve PT takvimi…") — oysa bölümün kendi sözü açıkça *"her örnek tek bir otomasyon — özellik listesi değil"* (`sectors.sub`). Yani gym paneli bölümün vaadini bizzat bozuyor. (A5'teki "siyah zemine 3 madde" tespitinin kökü de bu: gym paneli farklı davranıyor.)

---

## Mevcut Kopya (öncesi) — `messages/*.json` → `sectors`

| Sektör | Desen | Durum |
|--------|-------|-------|
| `clinics`, `ecommerce`, `realestate`, `education`, `restaurants` | automation = tek somut otomasyon + body + flow(trigger/action/result) | ✅ Güçlü, özgün — korunur |
| `gyms` | automation = "Spor Salonu Yönetim Yazılımı" + body = **özellik listesi** ("üyelik, ödeme, yoklama, ders/PT takvimi…") | ⚠️ Desen-dışı. Ama `gyms.flow` (üye 30 gün giriş yapmadı → WhatsApp teklif → takip edilir) **zaten doğru** ve güçlü |

**Render notu (kod):** `gyms` paneli ek olarak nabız atan "Canlı — Alpfit" rozeti + "Canlı ürünü gör" linki gösterir (diğerleri "Akış" etiketi). Canlı gösterge **dürüst** olduğu için korunur (bkz. ILKELER → marka sesi yasağı niyet-bazlı yorumu; DECISIONS 2026-06-28).

---

## Kullanıcı Senaryoları

- Ziyaretçi kendi sektörünün sekmesini seçer → o sektöre **özgü**, başka sektörle değiştirilemez bir otomasyon örneği + somut sonuç görür → ilgili sayfa varsa "uygulamayı gör", yoksa keşif görüşmesi/mailto CTA'sına yönlenir.
- Birden çok sekmeyi gezen ziyaretçi, panellerin **birbirinin kopyası olmadığını** hisseder; her sektör gerçekten farklı bir değer anlatır — **gym paneli de aynı tutarlılıkta** (özellik listesi sürprizi değil).

---

## Davranış Kuralları

- **gym panelini tek-otomasyon desenine getir (v0.1'in asıl sektör işi):** `gyms.automation` + `gyms.body` özellik listesinden çıkıp **tek somut otomasyon**a döner (mevcut `gyms.flow` zaten bunu anlatıyor: kaçan üye → WhatsApp teklif/PT → takip). "Kapsamlı yönetim yazılımı" özellik anlatımı buradan kalkar.
- **Alpfit = ürün, ayrı yüzeyde:** Spor salonu "ürün/uygulama" anlatımı (özellik listesi dahil) panelin tek-otomasyon vaadini bozmadan **"Uygulamayı incele / Canlı ürünü gör" CTA'sı** ve `/spor-salonu-yazilimi` sayfasında yaşar. Sektör paneli Crew OS değer anlatımını taşır, Alpfit özellik listesini değil.
- Diğer 5 sektör **korunur**; v0.1'de elden geçirme gerektirmez (sadece F5 dürüstlük taraması — aşağı).
- Her sektör paneli **tekil ve özgün**: en az bir **somut otomasyon** (tetikleyici → eylem → sonuç) + sonuç anlatır. Jenerik, sektörler arası kopyalanabilir ifade yok.
- Metrikler/sonuçlar **"öngörü/örnek" çerçevesinde** kalır (gerçek müşteri verisi gelene dek — REVIZE-BACKLOG C4; dürüstlük konvansiyonu → `kopya-revizesi.md` F5).

---

## İlişkili Feature'lar

- `crew-os-bolumu.md` — Crew OS panelindeki akış adları sektör örnekleriyle tutarlı kalır (ama orada "platformda çalışan akışlar" çerçevesinde; karar: akışlar bırakıldı).
- `kopya-revizesi.md` — panel metinleri marka sesine ve F5 dürüstlük konvansiyonuna tabidir.
- Mevcut: M2 / F2.4 (SectorSolutions).

---

## Açık Sorular

- Her sektör için **gerçek/temsili otomasyon örnekleri** kullanıcıdan toplanmalı (içerik girdisi — keşfedilmemiş, SESSION-NOTES). *5 sektör mevcut kopyada makul; ama gerçek müşteri örnekleri geldikçe güçlenir.*
- Altı sektör aynı derinlikte mi, yoksa gym (Alpfit) bir vitrin mi? → **gym artık tek-otomasyon panelinde diğerleriyle eşit; Alpfit-ürün anlatımı ayrı CTA/sayfada.** (Karara yakın — execution'da netleşir.)
