# TASK-18.09: Girdi daraltma + hacim sınırı — sanitizer sınıf kapanışı

**Durum:** ✅ Tamamlandı
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

- [x] **1. Mesajı `{role, content}`'e indirge**
  - `filter` tip-yüklemesinin ardından açık `map` ile yeni nesne kur: `({ role, content }) => ({ role, content })`
  - `content` yalnız **bir kez** okunsun (yeniden kurulan nesne üzerinden trim/cap/serileştirme)
  - Dosya: `src/lib/chat-sanitize.ts`

- [x] **2. Mesaj sayısı üst sınırı**
  - Ham dizi `MAX_HISTORY`'den (12) çok daha fazlasını taşıyorsa **filter'dan ÖNCE** reddet — sınır `slice` sonrasına bırakılırsa dev dizi yine tümüyle taranır
  - Önerilen değer `MAX_INCOMING_MESSAGES = 100` (export edilir, 12'lik tutma penceresine bol pay)
  - Dosya: `src/lib/chat-sanitize.ts`

- [x] **3. Toplam byte üst sınırı**
  - Tutulan mesajların `content` byte toplamı için `MAX_TOTAL_BYTES` (öneri **16384** = 2 × per-mesaj cap) — aşımda 400
  - Per-mesaj cap (`MAX_MESSAGE_BYTES = 8192`) **kaldırılmaz**, yanına eklenir
  - Dosya: `src/lib/chat-sanitize.ts`

- [x] **4. Testleri genişlet**
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

- [x] `npm run test` yeşil; `tests/chat-sanitize.test.ts` yeni sınırları kapsıyor (mevcut 52 test kırılmaz)
- [x] Ekstra alan testi: `{role,content,name,tool_calls,zzz}` girdisinde çıkan nesne **tam olarak** `{role, content}` anahtarlarını taşıyor (`Object.keys` ile sınanır) — UAT senaryo 20'nin regresyon ağı
- [x] Mesaj sayısı testi: `MAX_INCOMING_MESSAGES + 1` uzunluğunda dizi → `ok:false`, 400; sınırdaki dizi → geçer — UAT senaryo 21'in birinci ekseni
- [x] Toplam byte testi: 12 mesajın her biri per-mesaj cap'in altında ama toplamı `MAX_TOTAL_BYTES`'ı aşıyor → `ok:false`, 400; toplam sınırın altındaki aynı yapı → geçer — UAT senaryo 21'in ikinci ekseni
- [x] Negatif kontrol: normal 3 mesajlık TR sohbeti + tek 8KB'lık meşru mesaj **hâlâ geçiyor** (sınırlar meşru trafiği kesmiyor)
- [x] `next build` temiz (exit 0)

---

## Risk ve Geri Dönüş Planı

- **Risk — meşru uzun sohbet 400 alır:** `MAX_TOTAL_BYTES` fazla dar seçilirse 12 mesajlık normal sohbet reddedilir ve kullanıcı generic "offline" görür (sessiz kalır, log'a düşmez) → değeri seçmeden önce gerçek bir 12 mesajlık TR sohbetinin byte toplamını ölç; şüphede yukarı yuvarla.
- **Rollback:** Değişiklik tek dosyada ve saf; `git revert` yeterli. Canlı sözleşme (`SanitizeResult`, 400 semantiği) değişmediği için route/UI etkilenmez.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-09-11

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Alt görev 1 — `{role, content}` indirgeme.** `filter` + tip-yüklemesi yerine açık döngü: her elemanın `role` ve `content`'i **birer kez** okunur, geçerliyse `{ role, content }` olarak **yeniden kurulur**. İstemcinin `name`/`tool_calls`/serbest alanları artık sağlayıcı payload'ına geçmiyor; getter yüzeyi de kendiliğinden kapandı (tek okuma).
- **Alt görev 2 — mesaj sayısı kapısı.** `MAX_INCOMING_MESSAGES = 100` export edildi; kontrol **filtreden önce**, ham dizi üzerinde (dizi-tipi kontrolünden hemen sonra) — böylece dev dizi hiç taranmıyor. Aşımda 400 `"Too many messages."`.
- **Alt görev 3 — toplam byte sınırı.** `MAX_TOTAL_BYTES = 16384` export edildi; per-mesaj cap **kaldırılmadı**, aynı döngüde yanına eklendi (her mesaj bir kez encode edilir, byte'ı hem cap'e hem toplama sayılır). Aşımda 400 `"Conversation too large."`.
- **Alt görev 4 — testler.** `tests/chat-sanitize.test.ts` üç yeni describe bloğuyla genişletildi (alan daraltma · hacim sınırları · negatif kontrol): 52 → **64 test**.
- **Kapsam dışı ama aynı dosyada düzeltilen drift:** `M5-Chatbot-API.md` F5.1 gövdesi hâlâ `max_tokens: 1024` diyordu (go-live 512'ye indirmişti) — modülü zaten güncellerken gerçeğe hizalandı.

**Sorunlar:**
- **Negatif kontrol testi ilk koşuda kırmızı:** gerçekçi 12 turlu TR sohbetini `user` mesajıyla başlatınca 12. tur `assistant`'a denk geldi ve trailing-user kuralı 400 verdi. Sohbet bot karşılamasıyla başlayacak şekilde kaydırıldı (ziyaretçi sorusuyla biter) → gerçek UI akışına da bu daha yakın.
- **Sınır değeri körlemesine seçilmedi:** `MAX_TOTAL_BYTES`'ı yazmadan önce gerçekçi 12 turlu bir TR sohbeti ölçüldü → **1.968 byte**. 16384 meşru trafiğe ~8,3× pay bırakıyor; risk bölümündeki "meşru uzun sohbet 400 alır" senaryosu ölçümle kapandı.

**Kararlar:**
- **Kontrol sırası:** sayı kapısı (b) → filtre/indirgeme (c) → `slice` (d) → byte sınırları (e) → trailing-user (f). Gerekçe: hacim kapısı ancak filtreden önce olursa dev diziyi taramaktan korur; byte sınırları ise `slice` sonrası ölçülür (düşen eski mesaj token yakmaz — Karar C.6 gerekçesi korunur).
- **Toplam sınır per-mesaj cap'in yerine değil yanına.** Discuss-phase'in reddettiği şey "yalnız toplam sınır"dı; ikisi farklı vektör kapatır (tek uzun mesaj vs. çok sayıda sınır-altı mesaj).
- docs/DECISIONS.md'ye eklendi: **Hayır** — C.6'nın uygulama detayı, yeni mimari karar değil (modül dokümanı + bu kayıt yeterli).

**Kalan İşler:** yok.

**Son Yaklaşım:** Task kapandı; `src/lib/chat-sanitize.ts` üç sınırı da uyguluyor ve testle mühürlü.

**Sonraki Adım Detayı:** Faz 18'in ikinci düzeltme task'ı **TASK-18.10** (SYSTEM_PROMPT CTA atfı + DE hitap kuralı + README model ailesi). İkisi bitince `/devflow:verify-phase 18` **baştan** koşulur.

**Dosya Değişiklikleri:**
- `src/lib/chat-sanitize.ts` → `{role, content}` yeniden kurma (tek okuma) + `MAX_INCOMING_MESSAGES` (100) + `MAX_TOTAL_BYTES` (16384); iki yeni 400 gerekçesi; modül başlığı üç sınırın neden birbirinin yerini tutmadığını anlatıyor.
- `tests/chat-sanitize.test.ts` → 3 yeni describe / 12 yeni test (alan daraltma 3 · hacim sınırları 7 · negatif kontrol 2).
- `_dev/modules/M5-Chatbot-API.md` → F5.1 sanitizasyon tarifi + 2 yeni kabul kriteri + hız-sınırı edge case'i + bayat `max_tokens` hizalaması.

**Test Sonuçları:**
- **Vitest (tam suite, 6 dosya):** **64/64 yeşil** (öncesi 52 — 12 yeni test). Kapsam: saf `chat-sanitize` modülü; route/LLM/serve tarafı bu suite'in dışında.
- **`next build`:** temiz, **exit 0**, 37 sayfa ("Compiled successfully").
- **Ürettiğim kapıyı sınadım — bozuk girdi:** yeni kaynak geçici olarak `git checkout HEAD --` ile eski hâline alınıp **aynı** test dosyası koşuldu → **9 test kırmızı** (3 alan daraltma + 4 hacim + 2 import-kaynaklı). Yani yeni testler gerçekten yeni davranışı ölçüyor, kaynak-bağımsız yeşil değil. Kaynak geri yüklendi, 64/64 yeşil. Kırmızı **yerelde ve oturum içinde** görüldü; uzak koşum beklenmedi.
- **UAT bulgularının birebir tekrarı (modül üzerinden, `tsx`):** senaryo 20 payload'ı → çıkan nesne `[{"role":"user","content":"selam"}]` (ek alanlar düştü) · senaryo 21a 100.000 mesaj → `400 Too many messages.` (0 ms, dizi taranmadan) · senaryo 21b 12 × 8192 byte → `400 Conversation too large.`. Üçü de kapandı.
- **Ürettiğim kapıyı sınadım — boş kapsam:** kapı kapsamını tutulan mesaj setinden türetiyor; set boşaldığında sessiz PASS basmıyor. Üç boş-kapsam girdisi (boş dizi · tümü filtrelenen dizi · yalnız assistant) → üçü de `400 A trailing user message is required.`. Fail-open yok.
- **Ölçülmeyen:** canlı `/api/chat` uçtan uca davranışı bu oturumda koşulmadı (kod `main`'de ama sınırlar henüz deploy edilmedi); serve-katmanı teyidi `verify-phase 18`'in yeniden koşumuna ait.

---

<!-- Task tamamlanınca doldurulacak: -->

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-09-11

**Ne Yapıldı:**
- `chat-sanitize` modülü doc-comment'indeki "API'nin beklediği şekle indirger" vaadini fiilen uygular hâle geldi: her mesaj `{role, content}` olarak yeniden kuruluyor.
- Girdi hacmi iki eksende sınırlandı (ham mesaj sayısı 100 · tutulan içerik toplamı 16384 byte), per-mesaj cap korunarak. UAT 18 senaryo 20 + 21 kapandı.
- 12 yeni Vitest node testi regresyon ağı olarak eklendi; M5 modül dokümanı yeni sözleşmeyi anlatıyor.

**Öğrenilenler:**
- **Bir "sınır" doğru katmanda durmazsa ölçtüğünü sanmaz.** Mesaj sayısı kapısı `slice` sonrasına konsaydı 100.000 elemanlı dizi yine tümüyle taranırdı — kapı, kusurun gerçekte doğduğu yerden önce durmalı.
- **Tip-yüklemeli `filter` bir daraltma değildir.** `(m): m is ChatMessage =>` TypeScript'i ikna eder ama runtime nesneyi olduğu gibi geçirir; daraltma ancak nesne yeniden kurulursa gerçekleşir. Aynı hamle `content`'in tek kez okunmasını da sağlayıp getter yüzeyini kapatıyor.
- **Sınır değeri tahminle değil ölçümle seçilir:** gerçek 12 turlu TR sohbeti 1.968 byte; bu ölçüm olmadan 16384 ya keyfî ya da riskli olurdu.

---

**Oluşturulma:** 2026-09-11 (verify-phase 18, Adım 7 — UAT senaryo 20 + 21)
