# TASK-18.09: Girdi daraltma + hacim sınırı — sanitizer sınıf kapanışı

**Durum:** ⬜ Bekliyor
**Modül:** M5 — Chatbot & API (`modules/M5-Chatbot-API.md`)
**Feature:** C1 (chatbot sağlayıcı geçişi + canlıya alma) — Karar C.6 hardening ayağı
**Faz:** Phase 18 (`phases/PHASE-18.md`)
**Bağımlılıklar:** TASK-18.02 ✅ (sanitize modülü + Vitest node), TASK-18.08 ✅ (go-live)

---

## Hedef

`src/lib/chat-sanitize.ts`'in girdi-daraltma sözleşmesini fiilen uygular hâle getirmek: (1) her mesaj `{role, content}`'e **indirgenir** — istemcinin gönderdiği başka hiçbir alan sağlayıcı payload'ına geçmez; (2) mesaj **sayısı** ve **toplam byte** için üst sınır eklenir, aşımda per-mesaj cap'le aynı dürüst 400 döner. Task, Vitest node testleri yeşil geçtiğinde ve yeni sınırların üçü de (alan daraltma · mesaj sayısı · toplam byte) testle mühürlendiğinde tamamlanmış sayılır.

---

## Bağlam

Verify-phase 18 UAT'ında **aynı sınıfın iki açık varyantı** ölçüldü (senaryo 20 + 21) — bulgu tek bir kaçak değil, byte-cap'in kapatmadığı kardeş yüzeylerdir:

- **Alan daraltma yok (senaryo 20):** modül tip-yüklemli bir `filter` kullanıyor ama nesneyi yeniden kurmuyor. `{role:"user", content:"selam", name:"admin", tool_calls:[…], zzz:"…"}` gönderildiğinde bu alanlar **aynen** `client.chat.completions.create({messages})` payload'ına giriyor (ölçüldü). Modülün kendi doc-comment'i "API'nin beklediği şekle **indirger**" diyor — davranış bu vaadi karşılamıyor.
- **Hacim sınırı yok (senaryo 21):** cap `slice(-12)` **sonrası** tutulan 12 mesaja uygulanıyor; dizinin uzunluğu hiç sınırlanmıyor. 100.000 mesajlık (~381MB) gövde tümüyle parse + filter edilip `ok:true` döndü. Ayrıca 12 × 8192 = **98.304 byte** (~25k token) tek istekte sağlayıcıya gidebiliyor — Groq ücretsiz tier'ın **8.000 TPM** bütçesini tek çağrı aşar, yani tek istek chatbot'u dakikalarca 429'a düşürebilir (bu hesap ölçülen girdi + `DECISIONS 2026-09-11`'de kayıtlı kota üzerinden; canlıda **kasten çalıştırılmadı**).

Discuss-phase'in kararı ("sessiz kırp" ve "yalnız toplam payload sınırı" reddedildi, per-mesaj cap **tek uzun mesaj** vektörünü kapatır) hâlâ geçerli — bu task o kararı **geri almaz**, kapatılmamış kardeş vektörleri ekler. Reddedilen şey "yalnız toplam sınır"dı; per-mesaj cap **yanında** toplam sınır reddedilmemişti.

Not (istismar edilebilir değil, kayıt): `content` üç kez okunuyor (trim · cap · serileştirme). Getter taşıyan bir nesne cap'i atlatabilir ama `JSON.parse` getter üretmez → HTTP üzerinden erişilemez. Nesnenin yeniden kurulması bu yüzeyi de kendiliğinden kapatır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` → **UAT Sonuçları** senaryo 20/21 (ölçüm ve kanıt notları) + **Go-live** (kota gerçekliği)
- `_dev/phases/PHASE-18-ARASTIRMA.md` → Karar C.6 + byte-cap ölçüm gerekçesi (UTF-8 byte, karakter değil)
- `_dev/QUALITY.md` → §7 Güvenlik, §8 Test Kapsamı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle
- `_dev/modules/M5-Chatbot-API.md` — F5.1 sanitizasyon tarifi + kabul kriterleri yeni sınırları içersin

---

## Alt Görevler

- [ ] **1. Mesajı `{role, content}`'e indirge**
  - `filter` tip-yüklemesinin ardından açık `map` ile yeni nesne kur: `({ role, content }) => ({ role, content })`
  - `content` yalnız **bir kez** okunsun (yeniden kurulan nesne üzerinden trim/cap/serileştirme)
  - Dosya: `src/lib/chat-sanitize.ts`

- [ ] **2. Mesaj sayısı üst sınırı**
  - Ham dizi `MAX_HISTORY`'den (12) çok daha fazlasını taşıyorsa **filter'dan ÖNCE** reddet — sınır `slice` sonrasına bırakılırsa dev dizi yine tümüyle taranır
  - Önerilen değer `MAX_INCOMING_MESSAGES = 100` (export edilir, 12'lik tutma penceresine bol pay)
  - Dosya: `src/lib/chat-sanitize.ts`

- [ ] **3. Toplam byte üst sınırı**
  - Tutulan mesajların `content` byte toplamı için `MAX_TOTAL_BYTES` (öneri **16384** = 2 × per-mesaj cap) — aşımda 400
  - Per-mesaj cap (`MAX_MESSAGE_BYTES = 8192`) **kaldırılmaz**, yanına eklenir
  - Dosya: `src/lib/chat-sanitize.ts`

- [ ] **4. Testleri genişlet**
  - Dosya: `tests/chat-sanitize.test.ts`

---

## Etkilenen Dosyalar

```
src/lib/
└── chat-sanitize.ts       # daraltma + iki yeni sınır — zaten var
tests/
└── chat-sanitize.test.ts  # yeni sınırların testleri — zaten var
_dev/modules/
└── M5-Chatbot-API.md      # F5.1 sanitizasyon tarifi + kabul kriterleri — zaten var
```

`src/app/api/chat/route.ts` **değişmez** — modülün sözleşmesi (`SanitizeResult`) aynı kalır.

---

## Dikkat Noktaları

- **Reddet, kırpma.** Discuss kararı "sessiz kırp" seçeneğini eledi; yeni sınırlar da 400 ile açıkça reddetmeli (`reason` metni İngilizce, mevcut üç metinle aynı üslupta).
- **400 istemcide generic "offline" görünür.** `Chatbot.tsx:38` `!res.ok` olan her yanıtı offline sayar (araştırma notu). Bu bilinçlidir, UI **dokunulmaz**; yeni sınırlar için ayrı UX beklenmez.
- **Byte, karakter değil.** Toplam sınır da `TextEncoder` ile ölçülür — TR/AR çok-baytlıda karakter sayımı düşük ölçer.
- **Meşru ziyaretçiyi kesme.** 12 mesajlık normal bir sohbette toplam içerik birkaç KB'dir; 16KB bol pay bırakır. Sınır değerini düşürürken gerçek bir sohbet uzunluğunu ölç.
- **Route çağrı yeri tek.** `chat.completions.create` yalnız `route.ts:48`'de ve sanitizasyon sonrası (verify-phase artefakt süpürmesi teyit etti) — kapıyı atlayan başka çağrı yeri aramaya gerek yok, ama yeni bir uç eklenirse aynı kapıdan geçmeli.

---

## Test Kriterleri

- [ ] `npm run test` yeşil; `tests/chat-sanitize.test.ts` yeni sınırları kapsıyor (mevcut 52 test kırılmaz)
- [ ] Ekstra alan testi: `{role,content,name,tool_calls,zzz}` girdisinde çıkan nesne **tam olarak** `{role, content}` anahtarlarını taşıyor (`Object.keys` ile sınanır) — UAT senaryo 20'nin regresyon ağı
- [ ] Mesaj sayısı testi: `MAX_INCOMING_MESSAGES + 1` uzunluğunda dizi → `ok:false`, 400; sınırdaki dizi → geçer — UAT senaryo 21'in birinci ekseni
- [ ] Toplam byte testi: 12 mesajın her biri per-mesaj cap'in altında ama toplamı `MAX_TOTAL_BYTES`'ı aşıyor → `ok:false`, 400; toplam sınırın altındaki aynı yapı → geçer — UAT senaryo 21'in ikinci ekseni
- [ ] Negatif kontrol: normal 3 mesajlık TR sohbeti + tek 8KB'lık meşru mesaj **hâlâ geçiyor** (sınırlar meşru trafiği kesmiyor)
- [ ] `next build` temiz (exit 0)

---

## Risk ve Geri Dönüş Planı

- **Risk — meşru uzun sohbet 400 alır:** `MAX_TOTAL_BYTES` fazla dar seçilirse 12 mesajlık normal sohbet reddedilir ve kullanıcı generic "offline" görür (sessiz kalır, log'a düşmez) → değeri seçmeden önce gerçek bir 12 mesajlık TR sohbetinin byte toplamını ölç; şüphede yukarı yuvarla.
- **Rollback:** Değişiklik tek dosyada ve saf; `git revert` yeterli. Canlı sözleşme (`SanitizeResult`, 400 semantiği) değişmediği için route/UI etkilenmez.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

<!-- run-task oturumunda doldurulacak -->

---

**Oluşturulma:** 2026-09-11 (verify-phase 18, Adım 7 — UAT senaryo 20 + 21)
