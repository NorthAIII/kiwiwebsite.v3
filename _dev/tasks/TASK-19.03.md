# TASK-19.03: Origin kapısını `/api/chat`'e bağla + route testleri + M5

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Route'a bağla — `src/app/api/chat/route.ts`**
  - `POST`'un ilk satırı: `if (!isSameOriginRequest(req.headers))` → `new Response("Forbidden.", { status: 403 })`. Gövde metni mevcut 400/503 metinleri gibi kısa ve İngilizcedir; ziyaretçi onu görmez (UI `chat.error` gösterir).
  - Reddi tek satırla logla: `console.warn` + `origin`, `host`, `sec-fetch-site` değerleri. Gerekçe: canlıda yanlış-pozitif 403 (ör. Vercel'de `host` beklenmedik değer taşırsa) chatbot'u sessizce kapatır ve yalnız `vercel logs`'ta görünür (MEMORY: model emekliliği tuzağıyla aynı sınıf). Gövde ya da başka başlık loglanmaz.
  - Kısa yorum: kapının neden ilk olduğu + kaynak DECISIONS 2026-10-02.

- [ ] **2. Mevcut route testlerini kapıdan geçir — `tests/chat-route-timeout.test.ts`**
  - `chatRequest` yardımcısı varsayılan olarak `sec-fetch-site: same-origin` göndersin. Çağıranın verdiği başlıklar bunu ezebilsin; locale testlerinin `referer`/`cookie` başlıkları aynen çalışmalı.
  - 22 testin (13 `it` tanımı; ikisi döngüyle çoğalır — `vitest list`) hiçbirinin anlamı değişmez. Yalnız istek kapıdan geçer hâle gelir.

- [ ] **3. Route seviyesinde kapı sözleşmesi — `tests/chat-route-origin.test.ts`**
  - Gerçek `route.ts`, sahte `globalThis.fetch` (mevcut desen). Senaryolar:
    - Yabancı Origin → **403**, üst-akış `fetch` **hiç çağrılmadı**.
    - Origin yok + `Sec-Fetch-Site` yok (curl) → 403.
    - **Anahtar yokken** yabancı Origin → 403, 503 değil (kapı anahtar kapısından önce).
    - Same-origin + anahtar yok → 503 (kapıdan geçti).
    - Same-origin + anahtar var + bozuk JSON → 400, `fetch` çağrılmadı. Bu, canlı probe'un kullanacağı "model çağırmayan" yolun ta kendisidir.
    - Reddedilen istekte `console.warn` bir kez çağrıldı (spy).

- [ ] **4. Yerel gerçek tarayıcı doğrulaması**
  - `npm run build` + `next start`. `GROQ_API_KEY` değerini `.env.keys.local`'dan process env'e ver; değer hiçbir dosyaya, log'a ya da commit'e yazılmaz. Portu dinleyen PID'in senin process'in olduğunu teyit et.
  - Chrome'da (`channel: "chrome"`) `http://localhost:3000` → chatbot'a tek mesaj → yanıt akıyor, offline kopyası görünmüyor. Tarayıcı POST'ta `Origin` gönderir, yani kapının meşru yolu burada ölçülür. Akışın bittiğini DOM'dan oku.
  - curl: `Origin: https://evil.example` → 403 · başlıksız → 403 · `Origin: http://localhost:3000` + bozuk gövde → 400.
  - Harcanan Groq çağrısı sayısını kayda geçir (beklenen: 1).

- [ ] **5. M5'i güncelle**
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

- [ ] `npm run test` → `chat-route-timeout` (22 test, anlamı değişmeden) + `chat-route-origin` + `chat-origin` + kalan suite geçiyor.
- [ ] Route sözleşmesi: yabancı Origin ve curl-benzeri istek 403, üst-akış çağrılmadı. Anahtar yokken de 403 (503'ten önce). Same-origin + bozuk gövde 400, model çağrılmadı.
- [ ] `npm run build` temiz.
- [ ] Yerel `next start` + Chrome: chatbot mesajı yanıt alıyor (offline değil). curl yabancı Origin → 403.
- [ ] Canlıda üç host'tan (`kiwiailab.com`, `www.kiwiailab.com`, `kiwi-ai-lab-v3.vercel.app`) meşru gönderim 403 almıyor — `kanal: UAT` (Vercel serving zincirindeki `host` değeri yerelde ölçülemez; ölçüm TASK-19.07 probe'u + verify-phase).

---

## Risk ve Geri Dönüş Planı

- **Risk:** Vercel'de `host` başlığı herkese açık host'u taşımazsa canlıda her meşru istek 403 alır ve chatbot sessizce kapanır. Bu task'ta önlem: red logu. Erken uyarı: TASK-19.07'nin birleştirme öncesi preview probu (preview'da anahtar yok → kapıdan geçen istek 503, kapı 403).
- **Rollback:** route'taki kapı satırını geri al (tek commit revert); modül ve testi zararsız kalır.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı (`kanal: UAT` olan hariç — o TASK-19.07 + verify-phase'de)
- [ ] Git commit & push yapıldı (`revize/v0.5-teknik-borc`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(task çalıştırıldığında doldurulur)_

---

**Oluşturulma:** 2026-10-02
