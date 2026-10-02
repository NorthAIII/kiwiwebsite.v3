# DECISIONS — Karar Günlüğü

**Amaç:** Önemli mimari ve tasarım kararlarının kaydı. "Neden X yerine Y tercih edildi?" sorusunun cevabı burada.
**Ne zaman güncellenir:** Önemli bir teknik, mimari veya tasarım kararı alındığında.

---

## Kararlar

<!-- Her yeni karar aşağıdaki formatta en üste eklenir (en yeni en üstte) -->

### 2026-10-02 — Memory mezuniyeti: i18n "anahtar varlığı ≠ değer tazeliği" disiplini

i18n "anahtar varlığı ≠ değer tazeliği" süreç disiplini artık `tests/i18n-parity.test.ts` (CI `fast` job → `npm run test`; 5 dilin anahtar kümesi karşılaştırılır, değerler değil) tarafından yakalanıyor — memory'den mezun edildi. (Claude kararı · audit-docs; politika yarısı zaten CLAUDE.md → Projeye Özgü Kurallar → i18n'de.)

### 2026-10-02 — Sunucunun ziyaretçiye akıttığı metin ziyaretçinin dilinde: Referer prefix'i → `NEXT_LOCALE` cookie'si → TR; metin `messages/*.json`'dan

**Bağlam:** TASK-18.12 (verify 18, üçüncü düzeltme turu, UAT senaryo 36). `route.ts`'in hata/zaman-aşımı notu sabit Türkçeydi (`FALLBACK_MESSAGE`); EN/DE/AR/ES ziyaretçi canlıda Türkçe cümle görüyordu. TASK-18.11 bu yolu **ana** degradasyon yolu yaptı: asılı çağrı artık 504 değil 200+not ile kapanıyor, `Chatbot.tsx`'in `!res.ok` kapısı devreye girmiyor ve 5 dilde hazır `chat.error` atlanıyordu. Canlıda yol gerçekten tetikleniyor: hızlı ardışık 20 çağrının 5'i, kök neden Groq ücretsiz tier 429. Route locale'i bilmiyor, çünkü middleware matcher `api`'yi atlıyor.

**Seçenekler (locale kaynağı):** (a) Referer'ın locale prefix'i. (b) `NEXT_LOCALE` cookie'si. (c) `Accept-Language`. (d) İstemcinin gövdeye `locale` eklemesi; `Chatbot.tsx` değişir ve TASK-18.09'un `{role,content}` daraltmasıyla kesişir.

**Karar (kullanıcı onaylı — task önerisi):** sıra **Referer prefix'i → `NEXT_LOCALE` → `routing.defaultLocale`**. Tanınmayan ya da bozuk değer bir sonrakine geçer. (c) bilinçle dışarıda: tarayıcı dili baktığı sayfanın dilinden ayrışabilir. (d) seçilmedi; UI ve sanitizer dokunulmadı.

**Ölçümle güçlenen gerekçe:** next-intl 4 cookie'yi yalnız tarayıcı dili sayfa locale'inden **farklıysa** yazıyor (`syncCookie`). Gerçek tarayıcıda en-US→`/en`, ar→`/ar`, es-ES→`/es` ziyaretçilerinde cookie **yoktu**; tr-TR tarayıcıyla `/de`'ye gelende ise `de` vardı. Yani tek başına (b) çoğu ziyaretçide boş döner, (c) ise tam bu tr-TR→`/de` vakasında yanlış dili verirdi. Referer zorunlu birincil kaynak. Chrome same-origin `fetch`'te onu tam path'le gönderdi, site `Referrer-Policy` ayarlamıyor. Prefixsiz ya da origin'e kırpılmış Referer cookie'ye geçer. Prefixsiz `/`'de cookie TR dışı olamaz: middleware öyle bir cookie ile `/xx`'e yönlendirir.

**Metin kaynağı (duran yetkiyle):** yeni anahtar açılmadı, `chat.error` yeniden kullanıldı. Böylece aynı arıza sınıfı 504'le de 200+notla da ziyaretçiye aynı cümleyle ulaşıyor. Kota dolduğunda "tekrar deneyin"in yanında e-posta çıkışı kalıyor. 5 dil kopyası da UAT 4'te doğrulanmış. Not parantezli (sistem notu) ve `\n\n` ayracı yalnız ziyaretçiye metin ulaştıysa ekleniyor.

**Konvansiyon (kalıcı):** Sunucu tarafında ziyaretçiye görünen her metin (bugün yalnız bu not; ileride ör. v0.6 booking hata/onay metinleri) `messages/<locale>.json`'dan gelir ve locale bu sırayla çözülür. Mesaj dosyası `request.ts` deseniyle **dinamik import**la yalnız gerektiğinde yüklenir. next-intl `getTranslations` route'ta kullanılmadı: plugin alias'ına bağlı, Vitest'te çözülmüyor. 2026-09-11 "UI etiketine i18n dışından sabit adla atıf yok" kuralının sunucu-metni karşılığıdır.

**Doğrulama:** `tests/chat-route-timeout.test.ts` 5 → 22 test, tam suite 69 → **86**, `next build` exit 0. 5 dilin lazy chunk'ı `route.js.nft.json` ile fonksiyona izleniyor. Kapı bozuk girdiyle üç kez sınandı: çapadaki gerçek route 18 kırmızı, sabit-TR çözüm 8 kırmızı (TR kontrol grubu yeşil), koşulsuz ayraç 14 kırmızı. Boş kapsamda sessiz PASS yok. Yerelde `next start` + system Chrome ile 5/5 doğru; AR'de RTL ve parantez aynalaması doğru. **Ölçülmeyen:** canlı serving zinciri → verify-phase (senaryo 36).

**Sapmayanlar:** zaman sınırları (20 / 5 / 24 s), `maxRetries: 0`, `max_tokens: 512`, prompt, streaming sözleşmesi, `chat-sanitize`, `Chatbot.tsx`, `messages/*.json`. Kota/hız sınırı bu kararın konusu değil (senaryo 23, v0.6).

**İlgili Task/Faz:** TASK-18.12 (Faz 18, verify düzeltme turu 3). Discuss-phase 18'deki "API içi stream-hata fallback metni TR'ye çevrilir" kararı bu kayıtla aşıldı.

---

### 2026-09-12 — `/api/chat` üst-akış zaman aşımı: ilk token 20 s · sessizlik 5 s · toplam 24 s; SDK retry kapalı

**Bağlam:** TASK-18.11 (verify 18, ikinci düzeltme turu). UAT senaryo 33 canlıda **47 çağrının 2'sinin ~30,5 s'de 504** döndüğünü ölçtü. Kök neden: `chat.completions.create(...)` çağrısında iptal sinyali yoktu, yani tek kapı platformun `maxDuration = 30`'uydu. O sınırda fonksiyon öldürülür ve `route.ts`'in `catch` bloğu **hiç çalışmaz** — ziyaretçi 30 saniye "Düşünüyor" bekleyip ham 504 üzerinden offline kopyasına düşer. Marka & Craft üst ekseninde bu, sitenin canlı demosundaki en görünür kusur sınıfıydı.

**Ölçüm (canlı `/api/chat`, 20 çağrı, 2026-09-12):** ilk-token p50 **369 ms** · p90 **7,4 s** · en yavaş **başarılı** yanıt **17,4 s**; parçalar arası en büyük boşluk **73 ms**; 20 çağrının 1'i yine 30,2 s'de 504 (arıza yeniden üretildi). Task (A) ~12–15 s öneriyordu ama o aralık bugünkü 17,4 s'lik **başarılı** yanıtı hata metnine çevirirdi — ölçüm öneriyi geçersiz kıldı.

**Seçenekler (AskUserQuestion):** (1) 20 s — ölçülen en yavaş meşru yanıtın üstünde. (2) 15 s — ~%5 kesme riski. (3) 12 s — ziyaretçi en az bekler, kesme oranı belirgin artar.

**Karar (kullanıcı onaylı — Seçenek 1), üç sınır tek sinyalde:**
- `FIRST_TOKEN_TIMEOUT_MS = 20_000` — ölçülen en yavaş meşru yanıtın (17,4 s) üstünde; meşru trafiği kesmez.
- `STREAM_IDLE_TIMEOUT_MS = 5_000` — parçalar arası sessizlik; ölçülen en büyük boşluğun (73 ms) ~68 katı.
- `TOTAL_BUDGET_MS = 24_000` — her kurulumda kalan bütçeyle kırpılır; hiçbir bileşim `maxDuration = 30`'a yaklaşamaz (6 s pay).
- Tek `AbortController` + her parçada yeniden kurulan bekçi (`arm()`); ikisi de aynı sinyali iptal eder.

**Gerekçe:** Asıl kazanç "8 s daha az bekleme" değil, **bekleyişin sahibinin değişmesi** — yanıt artık platform tarafından öldürülmek yerine bizim dürüst fallback metnimizle, 200 olarak kapanıyor. Dar bir sınır (12–15 s) kusuru azaltmaz, yerini değiştirir: çalışan yanıtlar hata metnine dönerdi.

**İkinci karar — `maxRetries: 0` (bu çağrıda):** groq-sdk varsayılanı 2 ve yeniden deneme uykusu üst-akışın `retry-after` başlığını dinliyor; ücretsiz tier kota dolduğunda bu dakikalar sürebilir ve uyku **bizim `AbortSignal`'imizle kesilemez** — yani retry, tam da kaldırdığımız 30 s duvarını geri getirir. Zarif degradasyon zaten bizde olduğu için retry'ın getirisi küçük, riski doğrudan bu bulgunun sınıfında.

**Teknik tuzak (kalıcı):** groq-sdk'nın iki zaman aşımı yüzeyi de tek başına yetmez — istemci/istek `timeout`'u yalnız **başlıklara kadar** sayar (`fetchWithTimeout` `finally`'de temizlenir) ve `isTimeout` dalında retry'lanır. Ayrıca SSE iteratörü abort'u **sessizce yutar** (`Stream.fromSSEResponse` → `if (isAbortError(e)) return`): akış ortasında iptal edilirse `catch` çalışmaz, fallback döngü **sonrasında** bir bayrakla enqueue edilmelidir; aksi hâlde ziyaretçi yarım cümlede kalır.

**Doğrulama:** `tests/chat-route-timeout.test.ts` — gerçek `route.ts` + gerçek `groq-sdk`, yalnız `globalThis.fetch` sahte, zaman sanal (`vi.useFakeTimers`); 5/5 yeşil, tam suite 64 → **69**, `next build` exit 0. Kapı bozuk girdiyle iki kez sınandı: bekçi tamamen kapatılınca 3 test kırmızı (2 negatif kontrol yeşil kaldı — kontrol grubu), yalnız stream-ortası fallback'i kaldırılınca 2 test kırmızı / ilk-token testi yeşil. Boş kapsamda sessiz PASS yok: üst-akışa hiç gidilmediğinde 5 testin 5'i kırmızı. **Ölçülmeyen:** canlı serving zincirindeki davranış → `verify-phase` (senaryo 33 yeniden ölçülür).

**Sapmayanlar:** `max_tokens: 512`, `temperature: 0.2`, model, system prompt, streaming sözleşmesi (`text/plain` + `no-store`), `chat-sanitize` ve `Chatbot.tsx` **değişmedi**. Fallback metni yeniden yazılmadı, yalnız tek sabite (`FALLBACK_MESSAGE`) alındı. Hız sınırı / origin kontrolü bu kararın kapsamı **değil** (senaryo 23, v0.6 adayı).

**İlgili Task/Faz:** TASK-18.11 (Faz 18, verify düzeltme turu 2)

---

### 2026-09-11 — Chatbot prompt'u ziyaretçi arayüzüne **betimleyici** atıf yapar; sabit UI etiketi gömülmez (+ dil-başına hitap düzeyi)

**Bağlam:** TASK-18.10 (verify 18 düzeltme turu). Canlı UAT senaryo 28 + 29 iki kopya kusuru buldu. (1) SYSTEM_PROMPT ziyaretçiyi `the "Book a call" button`'a yönlendiriyordu; sitede o etiketli buton **hiçbir locale'de yok** (TR «Ücretsiz keşif görüşmesi al», DE «Kostenloses Erstgespräch buchen», AR «احجز مكالمة استكشافية مجانية», EN «Book a free discovery call», ES «Agenda una llamada de descubrimiento gratuita»). Canlı TR ve AR yanıtları İngilizce etiketi tırnak içinde andı → ziyaretçi sayfada olmayan bir adı arar (dürüstlük konvansiyonu) ve dört dilde İngilizce sızıntısı doğar (18.07'nin "tek dil / tek script" kuralıyla gerginlik). Etiket Anthropic dönemi prompt'undan değişmeden taşınmıştı; 18.07'nin kapısı bu ekseni ölçmüyordu. (2) `messages/de.json` **%100 formal** (20 `Sie` / 7 `Ihre` / 6 `Ihr` / 2 `Ihnen`, 0 `du`) ama canlı DE yanıtı `deine`/`Du` kullandı — prompt hitap düzeyi hakkında hiçbir şey söylemiyordu, model kendi varsayılanına düşüyordu.

**Seçenekler:** (1) Prompt'a beş locale'in CTA etiketini tek tek göm. (2) Etiketi tırnaklı sabit ad olmaktan çıkar, butona **işlevine göre** atıf yap ve modele etiket alıntılamayı yasakla. (3) Yalnız DE hitabını düzelt, CTA'ya dokunma.

**Karar — Seçenek 2, hitap kuralı beş dile birden yazıldı:**
- **Atıf konvansiyonu (kalıcı):** Çeviri sistemine bağlı olmayan bir yüzey (chatbot prompt'u, README, doküman) ziyaretçiye görünen bir UI öğesine atıf yapacaksa **etiketi kopyalamaz, işlevini betimler** ("the free discovery call button on the page") ve yanıt kendi dilinde yazar. Prompt'a ayrıca açık yasak eklendi: buton adını tırnak içinde ya da başka bir dilde alıntılama yok. E-posta CTA'sı (`kivanc@kiwiailab.com`) sabit kalır — o beş dilde de doğru.
- **Hitap düzeyi:** Prompt artık sitenin hitabını izlemeyi söylüyor — TR formal (siz), DE formal (Sie), ES samimi (tú), AR ikinci tekil şahıs, EN nötr; tek düzey tüm yanıt boyunca korunur. Kapsam beş dil, çünkü tek dili düzeltmek aynı sınıfın diğer varyantlarını açık bırakır.

**Gerekçe:** Etiketi gömmek tam da bu bulgunun kök nedenini yeniden üretir — site kopyası `messages/*.json`'da değişince prompt sessizce bayatlar ve bot var olmayan bir butona yönlendirir. Betimleyici atıf i18n'e bağımlı değildir, beş dilde de doğru kalır ve dil sızıntısı yaratmaz. Tek kaynak ilkesi (model adı yalnız tek yerde tutulur — 2026-09-11 kararı) aynı oturumda `README.md:14`'e de uygulandı: satır artık yalnız sağlayıcıyı/SDK'yı anıyor, model varsayılanı yalnız env tablosunda.

**Doğrulama:** 18.07'nin marka mührü harness'i (route.ts'ten runtime çıkarılan prompt/model/parametreler — sıfır drift) 5 dil × 4 temsili soru ile **iki kez** koşuldu: **2 × 20 yanıt, 0 ihlal.** Yeni eksenler temiz (hiçbir yanıt buton adı alıntılamadı; DE 4/4 `Sie`/`Ihre`, 0 `du`/`dein`) ve 18.07 regresyon eksenleri bozulmadı (dil sadakati 5/5 · garble 0 · `Bunker` 0 · fiyat probunda uydurma rakam 0). Kapının kendisi bozuk girdiyle sınandı: canlıda ölçülen kusurlu yanıt sınıflarına 8 ihlalle kırmızı bastı, boş kapsamda PASS basmadı (exit 2).

**Sapmayanlar:** `temperature: 0.2`, `max_tokens: 512`, dürüstlük yasağı ve 18.07'nin dil bloğu **değişmedi** — prompt'a yalnız ekleme yapıldı. `messages/*.json` dosyalarına dokunulmadı, i18n anahtar paritesi etkilenmedi.

**İlgili Task/Faz:** TASK-18.10 (Faz 18, verify düzeltme turu 2/2)

---

### 2026-09-11 — Chatbot modeli `llama-3.3-70b-versatile` → `qwen/qwen3.8-27b` (Groq modeli emekliye ayırdı; sağlayıcı kararı korunur)

**Bağlam:** TASK-18.08 (go-live). Kullanıcı `GROQ_API_KEY`'i Vercel Production env'e ekledi, redeploy sonrası canlı `/api/chat` **503'ten 200'e** döndü ama stream **hata fallback'ine** düştü. Vercel runtime log'u kesin sebebi verdi: Groq **404 `model_not_found`** — *"The model `llama-3.3-70b-versatile` does not exist or you do not have access to it."* Anahtar geçerli (hata 401 değil). Groq model kataloğu kontrol edildi: **Llama sohbet modellerinin tamamı listeden kalkmış** (2026-07 research'te "üretim modeli, deprecated değil" diye doğrulanmıştı — aradan ~7 hafta geçti). Kalan genel sohbet modelleri: `openai/gpt-oss-{120b,20b}`, `qwen/qwen3.{6,8}-27b`, `groq/compound{,-mini}`.

**Kısıt:** `gpt-oss-120b` DECISIONS 2026-07-21'de **bilinçli elenmişti** (fiyat sorularına uydurma rakam + TR'yi saymama). Elenme gerekçesinin bir kısmı o tarihten sonra prompt'ta kapatıldığı için (TR-birincil dil kuralı + "asla rakam uydurma" yasağı) aday **yeniden sınandı** — kör reddetme değil, kanıtla.

**Yöntem:** TASK-18.07'nin marka mührü kapısı adaylara yeniden uygulandı — `route.ts`'ten runtime çıkarılan nihai SYSTEM_PROMPT/`max_tokens`/`temperature` (sıfır drift) + 5 dil (TR/EN/AR/DE/ES) × 3 temsili soru (fiyat-dürüstlük probu / "Crew OS nedir" / gym) = 15 yanıt/model; mekanik garble (CJK/Hangul/Kiril/Kana) + `bunker` sızıntısı + para/yüzde deseni dedektörleri. Ön-eleme: `qwen3.6-27b` `<think>` bloklarını yanıt gövdesine sızdırdığı için elendi; `compound-mini` (yerleşik web arama, agentic sistem) gereksiz ve yavaş bulundu.

**Sonuçlar:**

| Model | Dil sadakati | Garble | Taksonomi | Dürüstlük | Kesik | Gecikme |
|---|---|---|---|---|---|---|
| `qwen/qwen3.8-27b` | 15/15 | 0/15 | 0 Bunker | **0 ihlal** | 0 | 340–590ms |
| `openai/gpt-oss-120b` | 15/15 | 0/15 | 0 Bunker | **2 ihlal** | 0 | ~1.2s |

`gpt-oss-120b`'nin ihlalleri temmuzdaki elenme gerekçesinin birebir tekrarı, üstelik **sertleştirilmiş prompt altında**: ES gym yanıtında uydurma müşteri sonucu ("reduce en un 30 % el tiempo de gestión"), TR fiyat yanıtında uydurma aralık ("ayda birkaç bin TL civarında olabilir"). `qwen3.8-27b` aynı fiyat sorusunda rakam vermeyi **açıkça reddedip** keşif görüşmesine yönlendirdi (5 dilin hepsinde).

**Seçenekler (AskUserQuestion):** (1) `qwen/qwen3.8-27b` — kapıyı temiz geçti. (2) `openai/gpt-oss-120b` — dürüstlük tavizi. (3) Daha geniş test. (4) Durdur, model seçimini ayrı işe bırak.

**Karar (kullanıcı onaylı — Seçenek 1):** Varsayılan model `process.env.CHAT_MODEL ?? "qwen/qwen3.8-27b"`. **Değişen tek şey model adıdır** — sağlayıcı (Groq), SDK (`groq-sdk`), OpenAI-uyumlu streaming/sanitizasyon/zarif-offline sözleşmesi, system prompt, `temperature: 0.2`, `max_tokens: 1024` ve `CHAT_MODEL` override deseni (C.5) **korundu**. 2026-07-21 sağlayıcı kararı ve onun **dürüstlük-eleme kriteri** geçerliliğini koruyor; bu kayıt o kriterin ikinci kez uygulanmasıdır.

**İkinci canlı bulgu — `max_tokens: 1024` → `512` (zorunlu, C.6 sapması):** Model değişimi deploy edildikten sonra canlı `/api/chat` yine hata fallback'ine düştü; runtime log ikinci ve farklı bir sebep verdi: **429 `rate_limit_exceeded`, OTPM (output tokens per minute) limiti 1000, talep 1024.** Bu bir *burst* sorunu değil — Groq ücretsiz tier bu modelde dakikada 1000 çıktı token'ı veriyor ve `max_tokens`'ı **peşin rezerve ediyor**, dolayısıyla 1024 isteyen **her** çağrı tek başına karşılanamaz durumdaydı. `max_tokens` **512**'ye düşürüldü ve çağrı yerine gerekçesi yorum olarak yazıldı (geri yükseltme canlıyı kırar). 512 bol: system prompt zaten 2–3 cümle istiyor, 5-dil kapısında ölçülen en uzun yanıt ~509 karakter. Yan fayda: düşük rezervasyon, dakikalık token bütçesine sığan eşzamanlı ziyaretçi sayısını artırır. Bu, C.6'daki "`max_tokens: 1024` korunur" kararından bilinçli ve zorunlu bir sapmadır.

**Operasyonel not (dürüst kayıt):** Ücretsiz kota 2026-09 itibarıyla **1.000 istek/gün + 8.000 token/dakika + 1.000 çıktı token/dakika (OTPM)**. Tanıtım trafiği için yeterli; kota tükenirse Groq 429 döner ve mevcut zarif offline fallback devreye girer (honest degradation). Hacim büyürse ücretli Dev Tier yolu açık ama $0 hedefi korunuyor.

**Canlı doğrulama (2026-09-11, `3699f57`):** 5 dilin **5'i de** canlı `kiwiailab.com/api/chat` üzerinde doğru dilde, marka sesinde, Bunker sızıntısı olmadan yanıtladı; TR fiyat probu rakam vermeyi reddedip keşif görüşmesine yönlendirdi (dürüstlük ✓). 8 sayfa/locale 200, AR `dir="rtl"` yerinde, regresyon yok. `git merge-base --is-ancestor` ile v0.5 kodu + go-live fix'i `origin/main` ataşı doğrulandı.

**Ders (memory'ye taşındı):** Üçüncü-parti model adları **bozulabilir bağımlılıktır**; "research'te deprecated değil" damgası haftalar sonra geçersizleşebilir ve hata yalnız **canlı runtime log'unda** görünür (build ve testler yakalamaz). → [groq-model-emekliligi](../memory/groq-model-emekliligi-runtime-404.md).

**İlgili Task/Faz:** Faz 18 / TASK-18.08 (go-live). PHASE-18 C.5 + Araştırma Bulguları model satırı bu kayda pointer'landı.

---

### 2026-07-22 — Chatbot system prompt dil kuralı sertleştirildi + `temperature: 0.2` (5-dil marka mührü gate bulgusu; C.3/C.5 refine)

**Bağlam:** TASK-18.07 (kabul kriteri 4 — canlıya almadan 5-dil çıktı gözle doğrulama). Nihai `route.ts` prompt+model'iyle serversiz node harness (test key `.env.keys.local`, sandbox exit-144'ten kaçınıldı) 5 dil × 4 temsili soru koşuldu. **1. koşu reprodüktif başarısız** (2 tam koşu): (a) İngilizce sorular tutarlı biçimde **Türkçe/Korece'ye düştü** ("Do you offer automation for my gym?" 4/4 TR; "What is Crew OS?" 1 koşuda Korece) — kök neden prompt'taki *"Default to Turkish if unclear"* + llama-3.3-70b'nin kısa/özel-adlı EN sorularında zayıf dil algılaması; (b) **çok-dilli script bozulması** (CJK/Hangul/Kiril/Vietnamca karakter sızıntısı) TR/EN/AR'de aralıklı, craft'ı bozuyor. **Sağlam kalanlar:** dürüstlük 5/5 (uydurma rakam yok), Crew OS taksonomisi 5/5 (Bunker sızmadı).

**Teşhis:** `temperature=0.3` EN→TR düşüşünü **çözmedi** (4/4 hâlâ TR) → dil-düşüşü **prompt kaynaklı**, sıcaklık kaynaklı değil. Bu, kör bir sıcaklık tweak'ini eledi; düzeltmenin prompt'ta olması gerektiğini gösterdi.

**Seçenekler (AskUserQuestion):** (1) Prompt dil kuralını sertleştir + gate'i yeniden koş (model/provider kararı korunur). (2) Modeli yeniden değerlendir (DECISIONS 2026-07-21'i yeniden aç). (3) Mevcut haliyle canlıya al (marka mührü tavizi — önerilmez).

**Karar (kullanıcı onaylı — Seçenek 1):** `route.ts` SYSTEM_PROMPT dil satırı **sertleştirildi**: "Default to Turkish if unclear" **kaldırıldı** → "reply in the exact language of the user's most recent message… write the whole reply in that one language and script only… a proper noun like Crew OS or a short question does not change it… never mix in words, characters, or scripts from another language… only fall back to Turkish when genuinely impossible to determine." Ayrıca `chat.completions.create`'e **`temperature: 0.2`** eklendi (marka sesi tutarlılığı + code-switch/script sızıntısı bastırma). Model (`llama-3.3-70b-versatile`), streaming/sanitizasyon/offline sözleşmesi, dürüstlük kuralı **değişmedi**.

**Sonuç:** Sertleştirme sonrası **2 tam koşu reprodüktif GREEN** — mekanik garble dedektörü **0/20**, dil sadakati 5/5 (EN Crew OS + gym İngilizce'ye döndü), dürüstlük 5/5, taksonomi 5/5, booking sözü yok. Artık **2 küçük craft lekesi** (bloke değil, kayıtlı): TR "Crew OS nedir" yanıtında ~%50 "observable ve measured" İngilizce-yankısı (prompt ifadesi); nadir tek bozuk token. `next build` temiz + Vitest 52/52. **Kabul kriteri 4 ✅ → go-live (18.08) açıldı.**

**İlgili Task/Faz:** Faz 18 / TASK-18.07 (C.3 dil kuralı + C.5 create-param'ı refine eder — `phases/PHASE-18.md` → Gözle Doğrulama). Sonraki cila adayı: prompt'ta "observable and measured" ifadesini yumuşatma (numarasız). Test key repo-dışı `.env.keys.local` (git-ignore; canlıda kullanılmaz).

---

### 2026-07-21 — Chatbot AI sağlayıcısı: Anthropic (Opus) → Groq · `llama-3.3-70b-versatile` ($0 hedefi; implementasyon v0.5)

> **Kısmen superseded by 2026-09-11** — yalnız model ayağı (`llama-3.3-70b-versatile` emekliye ayrıldı → `qwen/qwen3.8-27b`). Sağlayıcı kararı (Groq) ve dürüstlük-eleme kriteri geçerli. (review-phase 18)

**Bağlam:** `audit-docs` oturumunda (2026-07-21) canlı kontrol chatbot'un `/api/chat` → **HTTP 503 (offline)** verdiğini teyit etti (Vercel'de `ANTHROPIC_API_KEY` yok). Kullanıcı stratejik yön açtı: Claude Code aboneliğine zaten ~$100/ay ödüyor, chatbot için **ekstra aylık API faturası istemiyor** → **$0 hedefi** ("Groq/Llama gibi ücretsiz bir AI gömemez miyiz?"). Mevcut kod en pahalı modeli (`claude-opus-4-8`) kullanıyor — maliyet korkusunun kaynağı bu. Karar öncesi çok-kaynak web araştırması + 5 dilde (TR/AR/DE/ES/EN) 3 turluk **canlı kalite testi** yapıldı (gerçek `route.ts` system prompt'u + temsili ziyaretçi soruları, OpenAI-uyumlu endpoint, kartsız ücretsiz key'ler).

**Seçenekler (canlı test + araştırma):**
1. **Groq · `llama-3.3-70b-versatile`** — kartsız/$0, OpenAI-uyumlu (Vercel drop-in), veri-saklama temiz.
2. Groq · `gpt-oss-120b` — çalıştı ama **elendi**: (a) system prompt dil listesinde TR'yi saymadığı için TR soruya İngilizce yanıt; (b) fiyat sorularına **uydurma rakam** ($1.200/ay · 250€/ay vb.) → **dürüstlük konvansiyonu ihlali**.
3. Google Gemini Flash free-tier — AR'de en güçlü ama **elendi**: üretimde güvenilmez (canlı: 429 quota / 503 demand, 9/10 hata) + free-tier veriyi ürün-geliştirme/insan-inceleme'de kullanıyor (booking'te PII riski).
4. Mevcut Anthropic Opus'ta kal + Vercel'e `ANTHROPIC_API_KEY` ekle — aylık ücretli, $0 hedefine aykırı.

**Karar (kullanıcı onaylı):** **Seçenek 1** — chatbot sağlayıcısı Anthropic (Opus) → **Groq + `llama-3.3-70b-versatile`.** İmplementasyon **v0.5** ("Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma"); otomatik demo/randevu **booking** + botun **takvim erişimi** ayrı/daha büyük iş olduğu için **v0.6'ya ertelendi**. Bu prd-review'da yalnız **karar** kaydedilir; kod + stack dokümanları (OVERVIEW stack satırı, `M5-Chatbot-API.md`) **v0.5 implementasyonunda** güncellenir — şimdi değiştirmek doküman↔kod drift'i yaratır (kod hâlâ Anthropic).

**Gerekçe:** `llama-3.3-70b` canlı testte 5 dilin hepsinde **marka kalitesinde + dürüst** (fiyat uydurmadı, "keşif görüşmesine yönlendir" dedi), ~600ms, 18/18 sorunsuz. $0/kartsız hedefi karşılar; OpenAI-uyumlu endpoint mevcut streaming mimarisine yakın (drop-in); veri-saklama temiz. **Dürüstlük konvansiyonu** (ILKELER üst eksen / marka sesi yasakları) model **eleme kriteri** oldu — sayı uyduran `gpt-oss-120b` bu yüzden düştü. **Yan fayda:** geçiş canlıdaki 503/offline sorununu da çözer → `ANTHROPIC_API_KEY` bekleme kalemi **geçersizleşir** (yerine `GROQ_API_KEY`). Sır yönetimi ilkesi korunur: `GROQ_API_KEY` env'de, koda gömülmez.

**v0.5 kabul kriterleri (planlamaya taşınacak):** (1) `route.ts` Groq'a geçer (`GROQ_API_KEY` Vercel env; OpenAI-uyumlu / `@ai-sdk/groq`); streaming + sanitizasyon + zarif offline fallback korunur. (2) System prompt **TR-birincil dil algılama** (varsayılan İngilizce değil; TR dahil 5 dil listelenir). (3) System prompt'a **"asla fiyat/rakam uydurma"** kuralı (dürüstlük konvansiyonu sağlamlaştırması). (4) **Canlıya almadan 5 dil çıktısı gözle doğrulanır** (marka mührü — ILKELER üst eksen). (5) `M5-Chatbot-API.md` + OVERVIEW stack satırı güncellenir.

**İlgili Task/Faz:** prd-review (v0.4 versiyon sonu); kaynak not `PRD/NOTES.md` (mezun edildi → silindi). Versiyon adayları → `PRD/VERSIONS.md` (v0.5 Groq chatbot geçişi öncelikli, v0.6 booking/takvim). Test key repo-dışı `.env.keys.local`'da (git-ignore; canlı deploy'da kullanılmaz — Vercel env ayrı).

---

## Arşiv — eski kararlar

Eski kararlar tarih aralığı arşivlerine sırası korunarak (en yeni en üstte) taşındı; "DECISIONS <tarih>" atıfları aralığına göre oradan izlenir. Yeni karar bu dosyada, `## Kararlar` altında en üste eklenir.

- **2026-07-02 → 2026-07-18** (9 karar) → [`DECISIONS-2026-07-02..2026-07-18.md`](DECISIONS-2026-07-02..2026-07-18.md) — senaryo testi a11y mührü · npm audit Next'e gömülü postcss · Alpfit Plus fiyat bandı ink-panel · `/forum` hedefi `/` ve redirect sırası · canonical/hreflang fail-safe · Living Flow aşağı-taşıma karar-gate · `/bunker-os` → `/crew-os` rename · ortak `<Logo>` · alt-sayfa a11y iki gate.
- **2026-06-27 → 2026-07-01** (16 karar) → [`DECISIONS-2026-06-27..2026-07-01.md`](DECISIONS-2026-06-27..2026-07-01.md) — v0.2 canlı-doğrulama tek release adımı · Umami entegrasyonu · Faz 6 perf sonucu, P2 craft-gate iptali ve mobil LCP kök nedeni · test altyapısı (Vitest + Playwright/axe) · `--color-pulse-ink` token'ı · a11y light+dark gate ve kontrast mekanizması · perf tabanı ve bütçe açığı · i18n rename stale istisnası · "online/canlı" yasağının niyet-bazlı yorumu · dil senkronu (TR tek kaynak) · Crew OS / Bunker OS adları · v3'te yerinde güçlü revize.
