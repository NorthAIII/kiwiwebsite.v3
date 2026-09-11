# TASK-18.11: Üst-akış zaman aşımı — asılı Groq çağrısı ziyaretçiyi 30 s bekletmesin

**Durum:** ✅ Tamamlandı
**Modül:** M5 — Chatbot & API (`modules/M5-Chatbot-API.md`)
**Feature:** C1 (chatbot sağlayıcı geçişi + canlıya alma) — kabul kriteri 1'in "zarif offline korunur" ayağı
**Faz:** Phase 18 (`phases/PHASE-18.md`)
**Bağımlılıklar:** TASK-18.08 ✅ (go-live), TASK-18.09 ✅, TASK-18.10 ✅

---

## Hedef

`route.ts`'teki Groq çağrısına, platformun `maxDuration = 30` tavanının **altında** bir üst-akış zaman aşımı (abort) koymak: sağlayıcı asılı kaldığında ziyaretçi 30 saniye boş beklemek yerine birkaç saniye içinde mevcut zarif fallback'e düşsün. Task, zaman aşımı eklendiğinde, hem **stream başlamadan önceki** hem **stream ortasında** asılma hâlinde ziyaretçinin zarif metni gördüğü ölçüldüğünde ve davranış testle mühürlendiğinde tamamlanmış sayılır.

---

## Bağlam

Verify-phase 18'in yeniden koşumunda (2026-09-12) canlı ölçüldü — senaryo 33:

- **47 canlı `/api/chat` çağrısının 2'si ~30,5 saniyede 504** döndü (`FUNCTION_INVOCATION_TIMEOUT`). İki farklı soru (EN "gym" + TR fiyat probu), farklı zamanlarda — girdiye değil, sağlayıcının o anki durumuna bağlı. Aynı sorular hemen ardından 5/5 ve 20/20 temiz koştu, yani kod-yolu bozuk değil.
- **Kök neden:** `client.chat.completions.create(...)` çağrısında `AbortSignal`/timeout **yok**. Groq yanıt vermezse tek kapı platformun `maxDuration = 30`'udur; fonksiyon o sınırda öldürülür ve `route.ts`'in `catch` bloğu **hiç çalışmaz** — yani kendi TR fallback metnini enqueue edemez.
- **Ziyaretçiye ne oluyor:** panel 30 saniye "Düşünüyor" gösteriyor, sonra offline kopyasına düşüyor. Ham platform hatası **sızmıyor** (senaryo 32 gerçek tarayıcıda doğruladı: `Chatbot.tsx:37` `!res.ok` → `setOffline(true)`), yani dürüstlük sorunu yok — sorun 30 saniyelik ölü bekleme. Marka & Craft üst ekseninde bu, sitenin canlı demosunda en görünür kusur sınıfıdır.
- **Yan gözlem (aynı ölçümden):** sürekli kullanımda gecikme tırmanıyor — 20 ardışık çağrıda ilk 11'i <1 s, son 9'u 2,6–8,6 s (p90 7,5 s). Ücretsiz tier davranışı; zaman aşımı değerini seçerken bu kuyruk hesaba katılmalı, aksi halde meşru ama yavaş yanıtlar kesilir.

Faz kapsamıyla ilişki: discuss-phase'in hardening kararı per-mesaj byte cap'ti, zaman aşımı o listede yoktu. Ama kabul kriteri 1 **"streaming/sanitizasyon/zarif offline korunur"** diyor ve go-live milestone'u "chatbot canlıda çalışıyor" — 30 saniyelik ölü bekleme bu iki kalemin kesiştiği yerde duruyor, `route.ts` de faz penceresinin içinde. Bu yüzden kapsam-dışı sayılmadı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` → **UAT Sonuçları** senaryo 32 + 33 (ölçüm ve kanıt notları) + **Go-live** (kota gerçekliği, `max_tokens` gerekçesi)
- `_dev/modules/M5-Chatbot-API.md` → F5.1 edge case'leri (zarif degradasyon sözleşmesi)
- `_dev/QUALITY.md` → §6 Hata Yönetimi & Degradasyon, §1 Marka & Craft

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle
- `_dev/modules/M5-Chatbot-API.md` — F5.1 edge case + kabul kriteri: üst-akış zaman aşımı sözleşmesi
- `_dev/docs/DECISIONS.md` — seçilen zaman aşımı değeri ve gerekçesi kalıcı bir konvansiyonsa

---

## Alt Görevler

- [x] **1. Üst-akış zaman aşımı ekle**
  - `client.chat.completions.create(...)` çağrısına iptal sinyali ver (`groq-sdk` istek seçeneklerinde `signal` / `timeout` desteği önce doğrulanır — SDK'nın kendi seçeneği varsa o tercih edilir, yoksa `AbortSignal.timeout(...)`)
  - Değer `maxDuration = 30`'un **altında** kalmalı; ölçülen p90 (7,5 s) ile 30 s tavanı arasında bir pay bırakılır
  - Dosya: `src/app/api/chat/route.ts`

- [x] **2. Stream-ortası asılmayı da kapat**
  - İlk token geldikten sonra akış durursa `!res.ok` kapısı devrede **değildir** (başlıklar gönderilmiştir) → ziyaretçi yarım mesajla kalır. Parçalar arası sessizlik için de bir üst sınır gerekir (chunk'lar arası zamanlayıcı ya da tüm okuma döngüsü için tek sinyal)
  - Zaman aşımında mevcut TR fallback metni **enqueue edilir** (hard-cut yok — kriter 1)
  - Dosya: `src/app/api/chat/route.ts`

- [x] **3. Davranışı testle mühürle**
  - Asılı/yavaş sağlayıcı taklidi ile: zaman aşımı sınırında yanıtın 200 + fallback metniyle kapandığını, `maxDuration`'a hiç dayanmadığını sınayan test
  - Dosya: `tests/` (uygun katman seçilir — route seviyesinde `fetch` stub'ı yeterli, LLM gerekmez)

---

## Etkilenen Dosyalar

```
src/app/api/chat/
└── route.ts              # üst-akış zaman aşımı + stream-ortası sessizlik sınırı — zaten var
tests/
└── [uygun test dosyası]  # asılı sağlayıcı senaryosu — YENİ ya da mevcut dosyaya eklenir
```

`src/lib/chat-sanitize.ts` ve `src/components/Chatbot.tsx` **değişmez** — girdi sözleşmesi ve UI dokunulmaz (discuss-phase kararı).

---

## Dikkat Noktaları

- **`max_tokens: 512` yükseltilmez.** OTPM kotası zorunluluğudur (18.08); yükseltmek canlıyı kırar — `route.ts` içindeki gerekçe yorumu yerinde kalır.
- **Meşru yavaş yanıtı kesme.** Ücretsiz tier'da gecikme sürekli kullanımda tırmanıyor (p90 7,5 s ölçüldü). Sınır bu kuyruğun üstünde seçilmeli; aksi halde çalışan yanıtlar fallback'e çevrilir ve kusur daha görünür hâle gelir. Değeri seçmeden önce ölçümü tekrarla — kota ve yük güne göre değişir.
- **Fallback metni zaten var, yenisini yazma.** `route.ts`'in `catch` bloğundaki TR metni kullanılır; ziyaretçi tarafındaki offline kopyası `messages/*.json`'dadır ve i18n dışına metin gömülmez (memory → Süreç Disiplinleri).
- **Zaman aşımı bir kota çözümü değildir.** Hız sınırı / origin kontrolü ayrı ve kapsam-dışı bir kalemdir (senaryo 23, v0.6 adayı) — bu task onu kapatmaz, karıştırma.
- **Ölçüm katmanı.** Zaman aşımının gerçekten kaç saniyede tetiklendiği yerelde stub'la ölçülür; **canlı serving zincirindeki** davranış (Vercel fonksiyon sınırı ile etkileşim) yerel koşucunun dışındadır.

---

## Test Kriterleri

- [x] Asılı sağlayıcı taklidi: istek **zaman aşımı sınırında** kapanıyor, `maxDuration`'a (30 s) hiç dayanmıyor — ölçülen süre loglanır
- [x] Asılı sağlayıcıda yanıt **200 + TR fallback metni** (hard-cut yok, 504 yok) — kriter 1'in "zarif offline" ayağı
- [x] Stream-ortası sessizlik: ilk token geldikten sonra akış durursa yanıt fallback metniyle **kapanıyor**, yarım mesajda asılı kalmıyor
- [x] Negatif kontrol: normal hızlı yanıt (ve ölçülen p90 civarındaki yavaş yanıt) **kesilmiyor** — meşru trafik etkilenmiyor
- [x] Ürettiğim kapıyı sınadım: zaman aşımı kodu geçici olarak devre dışı bırakılınca yeni test **kırmızı** oluyor
- [x] `npm run test` yeşil (mevcut 64 test kırılmaz) + `next build` exit 0
- [ ] `kanal: UAT` — canlı `/api/chat`'te 504 oranı yeniden ölçülür (en az ~30 çağrı); sonucu belirleyen katman canlı serving zinciridir, yerel stub değil

---

## Karar Noktaları

- **Zaman aşımı değeri:** (A) ~12–15 s — ölçülen p90'ın (7,5 s) üstünde, 30 s tavanının çok altında, **önerilen**; (B) ~20 s — daha muhafazakâr, ama ziyaretçinin beklemesi hâlâ uzun. Değer ölçümle seçilir, tahminle değil (18.09'un `MAX_TOTAL_BYTES` deseni).
- **Tek sinyal mi iki sınır mı:** tüm çağrı için tek `AbortSignal` (basit) vs. çağrı + chunk'lar arası ayrı sınır (stream-ortası asılmayı da kapatır). İkincisi alt görev 2'nin gerektirdiği kapsamdır; tek sinyal yetiyorsa gerekçesi yazılır.

---

## Risk ve Geri Dönüş Planı

- **Risk — meşru yavaş yanıt kesilir:** sınır fazla dar seçilirse ücretsiz tier'ın normal yavaş anları fallback'e çevrilir; kusur azalmaz, yer değiştirir → değeri seçmeden önce canlı gecikme dağılımını yeniden ölç, p90'ın üstünde kal.
- **Risk — iptal sinyali akışı yarıda keser:** abort, başlamış bir stream'i de iptal edebilir; fallback enqueue'su `finally`/`catch` sırasıyla çakışmamalı (controller kapandıktan sonra enqueue hata verir).
- **Rollback:** Değişiklik tek dosyada ve katkısal; `git revert` yeterli. Streaming sözleşmesi (`text/plain`, `no-store`) ve UI dokunulmadığı için ziyaretçi tarafı eski davranışa döner.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-09-12

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Ölçüm önce, değer sonra.** Canlı `/api/chat`'e 20 çağrı atıldı (TTFB + parça-arası boşluk + toplam süre ölçüldü). Bulgu, task yazılırken elde olan p90 7,5 s tablosunu **değiştirdi**: ilk-token p50 369 ms · p90 7,4 s · **en yavaş BAŞARILI yanıt 17,4 s**; parçalar arası en büyük boşluk **73 ms**; 20 çağrının 1'i yine **30,2 s'de 504** (arıza canlıda yeniden üretildi).
- **Üç sınır, tek sinyal.** `route.ts`'te tek `AbortController` + yeniden kurulabilir bekçi (`arm()`): ilk token için **20 s**, parçalar arası sessizlik için **5 s**, hepsinin üstünde **24 s toplam bütçe** (her kurulumda kalan bütçeyle kırpılır). Üçü de `maxDuration = 30`'un altında kalır → fonksiyon platformca öldürülmez, kendi `catch`'imiz çalışır.
- **SDK retry'ı kapatıldı** (`maxRetries: 0`): groq-sdk'nın yeniden deneme uykusu üst-akışın `retry-after` başlığını dinliyor ve bizim `AbortSignal`'imizle kesilemiyor — ücretsiz tier kota dolduğunda tam da kaldırdığımız 30 s duvarını geri getirirdi.
- **Stream-ortası ayak ayrıca kapatıldı:** groq-sdk'nın SSE iteratörü abort'u **sessizce yutuyor** (`Stream.fromSSEResponse` → `if (isAbortError(e)) return`), yani ortada iptal edilen akışta `catch` **hiç çalışmıyor**. Döngü sonrasına `if (timedOut)` kapısı konuldu; fallback orada enqueue ediliyor.
- **5 yeni test** (`tests/chat-route-timeout.test.ts`): gerçek `route.ts` + gerçek `groq-sdk`, yalnız `globalThis.fetch` sahte (SDK istemciyi POST içinde kurup fetch'i o an global'den alıyor → SDK'nın gerçek abort/stream semantiği ölçülüyor), zaman `vi.useFakeTimers` ile sanal.

**Sorunlar:**
- *Zaman aşımı değeri task'ın önerdiği aralıkla çelişti:* task (A) ~12–15 s öneriyordu, ama bugünkü ölçümde **başarılı** bir yanıt 17,4 s sürdü — 12–15 s o yanıtı hata metnine çevirirdi ("meşru yavaş yanıtı kesme" uyarısı). Ölçüm öneriyi geçersiz kıldığı için değer kullanıcıya soruldu → **20 s onaylandı**.
- *Stream-ortası iptal sessizce geçiyordu:* ilk kurulumda yalnız abort vardı; groq-sdk'nın abort'u yutması yüzünden ziyaretçi yarım cümlede kalıyordu. Gate A2 bunu birebir gösterdi (aşağıda).

**Kararlar:**
- **İlk token 20 s / sessizlik 5 s / toplam 24 s:** 20 s ölçülen en yavaş meşru yanıtın (17,4 s) üstünde, 5 s ölçülen en büyük parça-arası boşluğun (73 ms) ~68 katı, 24 s `maxDuration = 30`'a 6 s pay bırakır. Kazanç yalnız "8 s daha az bekleme" değil: bekleyiş artık platform tarafından öldürülmekle değil **bizim dürüst fallback metnimizle** bitiyor.
- **`maxRetries: 0`:** zarif degradasyon zaten bizde; SDK retry'ı yalnız `retry-after` uykusuyla bütçeyi patlatma riski getiriyor.
- docs/DECISIONS.md'ye eklendi: **Evet** (2026-09-12).

**Kalan İşler:**
- Canlı 504 oranının yeniden ölçümü **`kanal: UAT`** — sonucu belirleyen katman canlı serving zinciri; bu oturumun işi değil, `verify-phase` Adım'ına ait (task kriterinde de öyle işaretli).

**Son Yaklaşım:** Task kapandı; kalan tek ayak canlı ölçüm ve o UAT kanalına ait.

**Sonraki Adım Detayı:** `/devflow:verify-phase 18` — faz baştan koşulur; senaryo 33 yeniden ölçülür (≥30 canlı çağrı, 504 oranı + ziyaretçinin gördüğü metin).

**Dosya Değişiklikleri:**
- `src/app/api/chat/route.ts` → üç zaman sınırı sabiti + `FALLBACK_MESSAGE` tek yere alındı; `start(controller)` içinde `AbortController` + `arm()` bekçisi; `create()` çağrısına `signal` + `maxRetries: 0`; döngü içinde her parçada bekçi yeniden kurulur; döngü sonrasında `if (timedOut)` fallback kapısı; `finally`'de `clearTimeout`.
- `tests/chat-route-timeout.test.ts` → YENİ, 5 test.
- `_dev/modules/M5-Chatbot-API.md` · `_dev/docs/DECISIONS.md` · `_dev/DURUM.md` · `_dev/phases/PHASE-18.md` → kayıt.

**Test Sonuçları:**
- **Yeni suite (yerel, sahte HTTP katmanı — canlı serving zinciri kapsam dışı):** 5/5 yeşil, 162 ms. Kapsam: ilk-token asılması · stream-ortası sessizlik · sınır-altı sonsuz damlama (toplam bütçe) · hızlı yanıt negatif kontrolü · **17,4 s'lik meşru yavaş yanıt** negatif kontrolü.
- **Tam suite:** Vitest **69/69** (7 dosya; 64 → 69). `npx tsc --noEmit` exit 0. `next build` exit 0 (37 sayfa).
- **Ürettiğim kapıyı sınadım — bozuk girdi, iki ayrı bozma:**
  - *Gate A1 (bekçi tamamen devre dışı = düzeltme öncesi hâl):* 3 test **kırmızı** (ilk-token · stream-ortası · toplam bütçe), 2 negatif kontrol yeşil kaldı — yeşil kalan ayak silinmedi, doğru ayağın neyi ölçtüğünü kanıtlayan kontrol grubu odur.
  - *Gate A2 (abort duruyor, yalnız stream-ortası `if (timedOut)` fallback'i kaldırıldı):* 2 test **kırmızı** ("yarım mesajda kalıyor"), ilk-token testi **yeşil** kaldı — iki ayağın gerçekten farklı şeyi ölçtüğü böyle görüldü. groq-sdk'nın abort'u yutması tam burada görünür hâle geldi.
- **Ürettiğim kapıyı sınadım — boş kapsam:** `GROQ_API_KEY` boşaltılınca route üst-akışa hiç gitmiyor; suite **sessizce PASS basmadı**, 5 testin 5'i `expected "vi.fn()" to be called at least once` ile kırmızı oldu (her test sahte fetch'in çağrıldığını ayrıca doğruluyor).
- **Ölçülmeyen:** canlı serving zincirinde zaman aşımının gerçek davranışı (Vercel fonksiyon sınırıyla etkileşim) — `kanal: UAT`.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-09-12

**Ne Yapıldı:**
- `/api/chat` artık üst-akış asılmasında platformun 30 s duvarına dayanmıyor: ilk token 20 s, parçalar arası sessizlik 5 s, toplam 24 s sınırlarıyla kendi zarif fallback'ine düşüyor; SDK retry'ı kapatıldı (kesilemeyen `retry-after` uykusu bütçeyi patlatıyordu).
- Davranış 5 testle mühürlendi; gerçek SDK + sahte HTTP katmanı + sanal zaman.

**Öğrenilenler:**
- **groq-sdk'da iki ayrı zaman aşımı yüzeyi var ve ikisi de yetmiyor:** istemci/istek `timeout`'u yalnız **başlıklara kadar** sayar (`fetchWithTimeout` `finally`'de `clearTimeout`) ve `isTimeout` dalında **retry'lanır** (varsayılan 2 → en kötü hâlde 3 kat bekleme). Akış başladıktan sonraki sessizliği hiçbiri kapatmaz.
- **SSE iteratörü abort'u yutar** (`if (isAbortError(e)) return`) → iptal ortada olursa `catch` çalışmaz; fallback döngü **sonrasında** bir bayrakla enqueue edilmeli.
- **Ölçüm bir kez değil, o gün yapılır:** task'ın dayandığı p90 7,5 s tablosu bir gün sonra 17,4 s'lik meşru bir kuyruk gösterdi. Değer ölçümle seçilmeseydi çalışan bir yanıt hata metnine çevrilecekti.

---

**Oluşturulma:** 2026-09-12 (verify-phase 18 yeniden koşumu, Adım 7 — UAT senaryo 33)
