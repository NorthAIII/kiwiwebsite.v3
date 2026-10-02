# TASK-19.03: Origin kapısını `/api/chat`'e bağla + route testleri + M5

**Durum:** ✅ Tamamlandı
**Modül:** M5-Chatbot-API (modules/M5-Chatbot-API.md)
**Feature:** TB-G2 — `/api/chat` kota koruması (origin katmanı)
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** TASK-19.02 ✅ (`src/lib/chat-origin.ts` + testi)

---

## Hedef

`isSameOriginRequest`'i `POST`'un **ilk işi** yap. Same-origin olmayan istek 403 alır. Bu kapı gövde parse'ından ve 503 anahtar kapısından önce gelir. Mevcut route testleri yeni kapıdan geçecek şekilde güncellenir, kapının route seviyesindeki sözleşmesi yeni bir testle mühürlenir. Yerelde gerçek tarayıcıdan chatbot'un çalışmaya devam ettiği görülür. Task, bu üç kanıt (birim, route, gerçek tarayıcı) yeşil olduğunda biter.

---

## Bağlam

Sınıra takılan ziyaretçinin deneyimi bir kullanıcı kararıdır: 403 → `Chatbot.tsx`'in `!res.ok` kapısı → mevcut 5 dilli `chat.error` kopyası. UI ve i18n dokunulmaz. Research bu yolu doğruladı: `setOffline(true)` bir sonraki gönderimde sıfırlanır.

Kapı neden ilk iş: yabancı bir origin anahtar durumunu (503) ya da gövde doğrulama ayrıntısını (400) öğrenmemeli. Kontrol en ucuz adımdır, gövde okunmadan reddeder.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M5-Chatbot-API.md` — F5.1 sözleşmesi ve edge case'ler
- `_dev/phases/PHASE-19.md` → Teknik Kararlar → "Origin kontrolü kodda" + Dikkat Edilecekler ("UI ve i18n dokunulmaz" doğrulaması)
- `tests/chat-route-timeout.test.ts` — gerçek route + sahte `fetch` deseni, `chatRequest` yardımcısı
- `_dev/memory/host-uat-arac-envanteri.md` — host'ta `next start` + Chrome, streaming yanıtta `response.finished()` tuzağı
- `_dev/memory/groq-model-emekliligi-runtime-404.md` — canlıda yalnız `vercel logs`'ta görünen arıza sınıfı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/modules/M5-Chatbot-API.md` — F5.1 açıklaması, kabul kriterleri ve "Hız sınırı / origin kontrolü yok" edge case'inin **origin yarısı** (hız sınırı yarısı TASK-19.06'da)
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum

---

## Alt Görevler

- [x] **1. Route'a bağla — `src/app/api/chat/route.ts`**
  - `POST`'un ilk satırı: `if (!isSameOriginRequest(req.headers))` → `new Response("Forbidden.", { status: 403 })`. Gövde metni mevcut 400/503 metinleri gibi kısa ve İngilizcedir; ziyaretçi onu görmez (UI `chat.error` gösterir).
  - Reddi tek satırla logla: `console.warn` + `origin`, `host`, `sec-fetch-site` değerleri. Gerekçe: canlıda yanlış-pozitif 403 (ör. Vercel'de `host` beklenmedik değer taşırsa) chatbot'u sessizce kapatır ve yalnız `vercel logs`'ta görünür (MEMORY: model emekliliği tuzağıyla aynı sınıf). Gövde ya da başka başlık loglanmaz.
  - Kısa yorum: kapının neden ilk olduğu + kaynak DECISIONS 2026-10-02.

- [x] **2. Mevcut route testlerini kapıdan geçir — `tests/chat-route-timeout.test.ts`**
  - `chatRequest` yardımcısı varsayılan olarak `sec-fetch-site: same-origin` göndersin. Çağıranın verdiği başlıklar bunu ezebilsin; locale testlerinin `referer`/`cookie` başlıkları aynen çalışmalı.
  - 22 testin (13 `it` tanımı; ikisi döngüyle çoğalır — `vitest list`) hiçbirinin anlamı değişmez. Yalnız istek kapıdan geçer hâle gelir.

- [x] **3. Route seviyesinde kapı sözleşmesi — `tests/chat-route-origin.test.ts`**
  - Gerçek `route.ts`, sahte `globalThis.fetch` (mevcut desen). Senaryolar:
    - Yabancı Origin → **403**, üst-akış `fetch` **hiç çağrılmadı**.
    - Origin yok + `Sec-Fetch-Site` yok (curl) → 403.
    - **Anahtar yokken** yabancı Origin → 403, 503 değil (kapı anahtar kapısından önce).
    - Same-origin + anahtar yok → 503 (kapıdan geçti).
    - Same-origin + anahtar var + bozuk JSON → 400, `fetch` çağrılmadı. Bu, canlı probe'un kullanacağı "model çağırmayan" yolun ta kendisidir.
    - Reddedilen istekte `console.warn` bir kez çağrıldı (spy).

- [x] **4. Yerel gerçek tarayıcı doğrulaması**
  - `npm run build` + `next start`. `GROQ_API_KEY` değerini `.env.keys.local`'dan process env'e ver; değer hiçbir dosyaya, log'a ya da commit'e yazılmaz. Portu dinleyen PID'in senin process'in olduğunu teyit et.
  - Chrome'da (`channel: "chrome"`) `http://localhost:3000` → chatbot'a tek mesaj → yanıt akıyor, offline kopyası görünmüyor. Tarayıcı POST'ta `Origin` gönderir, yani kapının meşru yolu burada ölçülür. Akışın bittiğini DOM'dan oku.
  - curl: `Origin: https://evil.example` → 403 · başlıksız → 403 · `Origin: http://localhost:3000` + bozuk gövde → 400.
  - Harcanan Groq çağrısı sayısını kayda geçir (beklenen: 1).

- [x] **5. M5'i güncelle**
  - F5.1 açıklaması: origin kapısı (ilk iş, 403, log). Mevcut açıklama satırının (L13, ~2.400 karakter, `doc-scan` uzun-satır bayrağı) sonuna ekleme; "Hata notu dili" gibi kendi paragrafı olarak yaz (CLAUDE.md → Format ve Sıkıştırma).
  - Kabul kriteri ekle: "Same-origin olmayan istek 403 alır; gövde okunmaz, sağlayıcı çağrılmaz."
  - Edge case satırının origin yarısını "yok" → "var (TASK-19.03)" olarak güncelle. Hız sınırı yarısı TASK-19.06'ya kalır.

---

## Etkilenen Dosyalar

```
src/app/api/chat/route.ts           # origin kapısı + red logu — zaten var
tests/chat-route-timeout.test.ts    # chatRequest yardımcısı same-origin — zaten var
tests/chat-route-origin.test.ts     # YENİ — route seviyesinde kapı sözleşmesi
```

---

## Dikkat Noktaları

- **UI / i18n dokunulmaz** (kullanıcı kararı). `Chatbot.tsx` ve `messages/*.json` değişmez; 403 mevcut offline kopyasına düşer.
- **Gerçek tarayıcı `fetch` POST'unda `Origin` gönderir** (same-origin dahil). Kapının asıl meşru trafiği budur. `Sec-Fetch-Site` yalnız Origin'i düşen tarayıcı içindir.
- **Locale çözümü bozulmamalı:** 403 dalı `fallbackNote`'a dokunmaz. Mevcut locale testleri (Referer → cookie → TR) değişmeden geçmeli.
- **Kendi `host`'umuz yerelde `localhost:3000`'dir** (port dahil). Vercel'deki değer bu task'ta ölçülemez → kanal UAT (aşağıda).
- `.env.keys.local` gitignore'da (`.env*.local`); değer yine de hiçbir çıktıya basılmaz (ILKELER sır ilkesi).

---

## Test Kriterleri

- [x] `npm run test` → `chat-route-timeout` (22 test, anlamı değişmeden) + `chat-route-origin` + `chat-origin` + kalan suite geçiyor.
- [x] Route sözleşmesi: yabancı Origin ve curl-benzeri istek 403, üst-akış çağrılmadı. Anahtar yokken de 403 (503'ten önce). Same-origin + bozuk gövde 400, model çağrılmadı.
- [x] `npm run build` temiz.
- [x] Yerel `next start` + Chrome: chatbot mesajı yanıt alıyor (offline değil). curl yabancı Origin → 403.
- [ ] Canlıda üç host'tan (`kiwiailab.com`, `www.kiwiailab.com`, `kiwi-ai-lab-v3.vercel.app`) meşru gönderim 403 almıyor — `kanal: UAT` (Vercel serving zincirindeki `host` değeri yerelde ölçülemez; ölçüm TASK-19.07 probe'u + verify-phase).

---

## Risk ve Geri Dönüş Planı

- **Risk:** Vercel'de `host` başlığı herkese açık host'u taşımazsa canlıda her meşru istek 403 alır ve chatbot sessizce kapanır. Bu task'ta önlem: red logu. Erken uyarı: TASK-19.07'nin birleştirme öncesi preview probu (preview'da anahtar yok → kapıdan geçen istek 503, kapı 403).
- **Rollback:** route'taki kapı satırını geri al (tek commit revert); modül ve testi zararsız kalır.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı (`kanal: UAT` olan hariç — o TASK-19.07 + verify-phase'de)
- [x] Git commit & push yapıldı (`revize/v0.5-teknik-borc`)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-10-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `route.ts`: `isSameOriginRequest(req.headers)` `POST`'un ilk işi. Red → `403 "Forbidden."` + tek satır `console.warn("chat origin rejected", JSON.stringify({origin, host, secFetchSite}))`. Yorum kapının neden ilk olduğunu ve DECISIONS 2026-10-02'yi gösterir.
- `chat-route-timeout.test.ts`: `chatRequest` varsayılanı `host: "localhost"` + `sec-fetch-site: same-origin`; çağıranın başlıkları ezer. 22 testin hiçbir assertion'ı değişmedi.
- `chat-route-origin.test.ts` (yeni, 10 test): planın 6 senaryosu + üç ek. Ekler: yabancı Origin + bozuk gövde → 403 (400 değil) · 503 ve 400 senaryoları iki meşru yolda (Origin = host ve yalnız `Sec-Fetch-Site`) · pozitif kontrol (kapıdan geçen geçerli istek sahte fetch'i 1 kez çağırır). Red senaryolarında `req.bodyUsed === false` da ölçülür.
- Yerel `next start` + Chrome + curl doğrulaması (→ Test Sonuçları).
- M5: F5.1'e "Origin kapısı" paragrafı (L13'e eklenmedi, kendi paragrafları), kabul kriteri, edge case'in origin yarısı "var". Hız sınırı yarısı TASK-19.06'ya kaldı.

**Sorunlar:**
- **Harness artefaktı (koşu 1):** akış-sonu işareti olarak `Thinking`'in kaybolmasını seçtim. Kaynakta `Thinking` yalnız içerik boşken görünür, ilk parçada kaybolur. Bekleme 402 ms'de döndü ve tarayıcı akış ortasında kapandı: metin cümle ortasında kesik. Çözüm: inputa metin yazıp submit'in etkinleşmesini beklemek (`disabled={streaming || !input.trim()}` → yalnız `streaming=false` iken etkin). Koşu 2 tam yanıtı okudu.
- **Kapsam dışı gözlem (düzeltilmedi):** koşu 1'in sunucu logunda `chat stream error TypeError: Invalid state: Controller is already closed` vardı; koşu 2'de yok. İki koşunun farkı istemcinin akış ortasında kopmasıdır (çıkarım). Kod 18.11/18.12'den gelir, bu task'ın değişikliği değil. Canlıda ziyaretçi akış ortasında ayrılırsa `vercel logs --level error`'da gerçek arızaya benzeyen bir satır üretebilir. Sahibi yok; rapora taşındı.

**Kararlar:**
- **Port `:3217`, `:3000` değil:** `:3000` ve `:3100` sahibi okunamayan yabancı dinleyicide (`ss`, MEMORY host envanteri). Kapının ölçtüğü değer yine "tarayıcının Origin'i = isteğin host'u" (`localhost:3217`).
- **Test yardımcısına `host` da eklendi** (plan yalnız `sec-fetch-site` diyordu): `new Request` `host`'u kendiliğinden koymaz (ölçüldü: `null`), modül ise host'suz isteği reddeder.
- **Log değeri `JSON.stringify`:** değerlerdeki satır sonlarını kaçışlar (tek satır garantisi, log enjeksiyonu yok); eksik başlık `null` olarak görünür.
- **curl istekleri bozuk gövdeyle:** kapı kırık olsa bile Groq çağrılmaz; 403 ↔ 400 farkı kapıyı ayırt eder.
- docs/DECISIONS.md'ye eklendi: Hayır (DECISIONS 2026-10-02'nin uygulaması; yeni karar yok).

**Son Yaklaşım:** Kapı route'ta, üç kanıt yeşil (birim · route · gerçek tarayıcı). Canlı `host` değeri ölçülmedi.

**Sonraki Adım Detayı:** TASK-19.04 (WAF kural spec'i + drift script'i). Canlıda üç host'tan meşru gönderimin 403 almadığı TASK-19.07 probe'u + verify-phase'de ölçülür (`kanal: UAT`).

**Dosya Değişiklikleri:**
- `src/app/api/chat/route.ts` → origin kapısı + red logu + import
- `tests/chat-route-timeout.test.ts` → `chatRequest` aynı-origin varsayılanları
- `tests/chat-route-origin.test.ts` → YENİ, route seviyesinde kapı sözleşmesi (10 test)
- `_dev/modules/M5-Chatbot-API.md` → F5.1 paragrafı, kabul kriteri, edge case

**Test Sonuçları:**
- **Vitest (tüm suite, `npx vitest run`):** taban 8 dosya · 111 test → 9 dosya · 121 test, hepsi yeşil. `chat-route-timeout` 22/22, `chat-route-origin` 10/10, `chat-origin` 25/25.
- **`tsc --noEmit`** çıkış 0. **`npm run build`** çıkış 0; `/api/chat` 133 B, paylaşılan First Load JS 103 kB. Derlenen `route.js` "chat origin rejected" dizgesini 1 kez taşıyor.
- **Kapı sınaması — bozuk girdi (route katmanı):** kapı bağlandı, yardımcı henüz güncellenmedi → `chat-route-timeout` 21 kırmızı / 1 yeşil. Yeşil kalan, `POST` çağırmayan "kapsam 5 dil" testidir (kontrol grubu).
- **Kapı sınaması — mutantlar** (scratchpad kopyaları, vitest alias'ıyla; repo kaynağı değişmedi), `chat-route-origin` üstünde:
  - kapı 503'ten sonra → 1 kırmızı ("anahtar yokken 403");
  - kapı gövde parse'ından sonra → 4 kırmızı;
  - kapı yok → 5 kırmızı;
  - log bütün başlıkları basıyor → 1 kırmızı;
  - log yok → 1 kırmızı;
  - kontrol: değişmemiş kopya, aynı config → 10/10 yeşil.
- **Boş kapsam:** "sağlayıcı çağrılmadı" iddiaları sahte fetch bağlı değilse de yeşil kalırdı. Pozitif kontrol testi kapıdan geçen geçerli istekte fetch'in 1 kez çağrıldığını ölçer.
- **Yerel gerçek ortam** (`next start -p 3217`, `GROQ_API_KEY` yalnız çocuk sürecin env'inde; değer hiçbir çıktıya yazılmadı). Dinleyen PID = başlattığım süreç (koşu 2: 2439859). Port boş → dolu → boş; çocuk çıkış kodu 0.
  - curl: yabancı Origin → **403** · başlıksız → **403** · yalnız `Sec-Fetch-Site: cross-site` → **403** · `Origin: http://localhost:3217` + bozuk gövde → **400** · yalnız `Sec-Fetch-Site: same-origin` + bozuk gövde → **400**.
  - Sunucu logunda 3 red satırı; her biri yalnız `origin`/`host`/`secFetchSite` taşıyor, `host` = `localhost:3217`.
  - Chrome (`channel: "chrome"`, TR): tarayıcının POST başlıkları `origin: http://localhost:3217` · `sec-fetch-site: same-origin` · `host: localhost:3217` → **200**. Koşu 2'de 3 cümlelik tam TR yanıt geldi; offline satırı yok, balonda fallback notu yok, sunucuda hata satırı yok.
  - Playwright koşu 2'de `/api/chat` için `requestfailed: net::ERR_ABORTED` raporladı. Akış tamamlanmıştı (submit yeniden etkin, metin tam, sunucuda kopma hatası yok) → tarayıcı kapanırken CDP artefaktı (MEMORY host envanteri: streaming yanıtta `response.finished()` dönmüyor).
- **Harcanan Groq çağrısı: 2** (beklenen 1). Koşu 1 harness artefaktıyla akış ortasında kesildi, koşu 2 tam.
- **Yerel e2e koşulmadı:** UI/markup değişmedi, e2e suite yalnız `/` a11y'sini ölçer; bu host'ta `:3000` tuzağı var. CI'da olağan koşar.
- **Canlı üç host** (`kanal: UAT`) ölçülmedi → TASK-19.07 + verify-phase.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-10-02

**Ne Yapıldı:**
- Origin kapısı `/api/chat` `POST`'unun ilk işi: same-origin olmayan istek 403, gövde okunmadan ve sağlayıcı çağrılmadan; red tek satırla loglanıyor.
- Route testleri kapıdan geçiyor, kapının route sözleşmesi 10 testle mühürlü (suite 111 → 121); yerel Chrome'da chatbot çalışıyor.

**Öğrenilenler:**
- Chatbot'ta akışın bittiğini `Thinking`'ten değil submit düğmesinin etkinleşmesinden oku (inputa metin yazarak).

---

**Oluşturulma:** 2026-10-02
