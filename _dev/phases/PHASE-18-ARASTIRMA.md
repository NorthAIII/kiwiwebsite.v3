← [PHASE-18](PHASE-18.md) · araştırma-detayı

# Phase 18 — Araştırma Bulguları (Groq istemcisi, streaming adaptasyonu, girdi sertleştirme)

> Bu bölüm `/devflow:research-phase` oturumunda dolduruldu (2026-07-21). Kaynaklar: Groq resmi docs (`console.groq.com/docs/{models,text-chat,libraries}`), `groq-typescript` README, web (rate-limit/free-tier 2026). Kullanıcı 2 karar noktasını onayladı (aşağıda).

### Değerlendirilen Yaklaşımlar

**A. Groq istemci kütüphanesi** (discuss "kesin paket research'te" demişti; `@ai-sdk/groq` zaten elenmişti)
- **`groq-sdk` (resmi):** `import Groq from "groq-sdk"` → `new Groq()` (apiKey varsayılan `GROQ_API_KEY`, baseURL gömülü). OpenAI-uyumlu yüzey, tipli, streaming `create({stream:true})` async-iterable. **Artı:** `@anthropic-ai/sdk` kalkar → **net bağımlılık farkı SIFIR**; mevcut "resmi SDK" desenini korur; en az mimari drift (kriter-1 + ILKELER kalıcılık). **Eksi:** `package.json` Dokunulmaz → kullanıcı onayı (alındı).
- Ham `fetch`: 0 yeni paket ama SSE'yi elle ayrıştırır (`data:` satırları + `[DONE]` + her chunk `JSON.parse`). Daha kırılgan/çok kod; bakımlı SDK'ya karşı ILKELER kalıcılık zayıf.
- `openai` SDK + `baseURL`: groq-sdk ile birebir API ama OpenAI-markalı **net +1** bağımlılık — avantajı yok.
- **Seçilen (kullanıcı onaylı): `groq-sdk`.** Net-sıfır bağımlılık + resmi drop-in + minimal drift.

**B. Streaming adaptasyonu (Anthropic → OpenAI-uyumlu)** — `ReadableStream<Uint8Array>` + `text/plain` + `TextEncoder` sarmalayıcı **aynen korunur** (Chatbot.tsx dokunulmaz). Yalnız iki nokta değişir: (1) system prompt yerleşimi, (2) delta event şekli (aşağıda Teknik Kararlar).

**C. Girdi sertleştirme — per-mesaj byte cap** (discuss: reddet-400 + ~8KB). Ölçüm **UTF-8 byte** (`new TextEncoder().encode(content).length`), **karakter değil** — TR/AR çok-baytlı karakterlerde char-sayımı düşük ölçer; byte doğru sınır. Öneri **8 KB (8192 byte)/mesaj**: uzun meşru ziyaretçi paragrafı <1KB, 8KB ≈ ~1500 kelime → bol pay bırakır, tek-mesaj token-yakma/DoS vektörünü kapatır. Kesin değer plan-phase'de teyit (bloke değil).

**D. Test edilebilirlik** — sanitizasyon + byte-cap **saf, export edilen bir fonksiyona** çıkarılır (route.ts şu an inline; TASK-5 deseni Vitest node) → LLM/route ayağa kaldırmadan birim test (kullanıcı tercihi + QUALITY §5/§8). Konum önerisi `src/lib/chat-sanitize.ts` (route + test ortak import); kesin yer plan-phase.

### Kullanılacak Araçlar/Kütüphaneler
- **`groq-sdk`** (npm, güncel) — OpenAI-uyumlu Groq istemcisi; `@anthropic-ai/sdk`'nin **yerini alır** (ekle+çıkar, net 0). `package.json` Dokunulmaz → onay alındı. Kaynak: **yeni** bağımlılık.
- **Model `llama-3.3-70b-versatile`** — Groq **üretim** modeli (deprecated değil); **131.072** token context, **32.768** max completion → mevcut `max_tokens: 1024` bol yeter. Kaynak: `console.groq.com/docs/models`. ⚠️ **Bu bulgu 2026-09-11'de geçersizleşti** — model emekliye ayrıldı ve `max_tokens: 1024` ücretsiz tier OTPM limitine (1000) takıldı; ikisi de yalnız **canlı runtime log'unda** görüldü. Araştırma o günün gerçeğiydi, kayıt olarak duruyor; güncel gerçeklik → **Go-live** bölümü.
- **Base URL** `https://api.groq.com/openai/v1` — groq-sdk'ye **gömülü**, ayrıca yapılandırma gerektirmez. Kaynak: dış (SDK varsayılanı).

### Dikkat Edilecekler

- **System prompt yerleşimi değişir (kritik tuzak):** Anthropic ayrı `system:` parametresi kullanır (`route.ts:57`); OpenAI-uyumlu Groq system prompt'u **`messages` dizisinin ilk elemanı** olarak ister: `[{ role: "system", content: SYSTEM_PROMPT }, ...sanitized]`. Atlanırsa marka kimliği/dil talimatı hiç uygulanmaz. Kaynak: `route.ts:8-16,57` (repoda-tanımlı).
- **Delta event şekli değişir:** Anthropic `content_block_delta`/`text_delta` (`route.ts:61-67`) → OpenAI `for await (const c of stream) c.choices[0]?.delta?.content ?? ""`. Enqueue/encode aynı. Kaynak: `route.ts:61-68` (repoda-tanımlı).
- **`GROQ_API_KEY` = yeni sır, çift kaynak:** groq-sdk varsayılan `GROQ_API_KEY` env okur. Kaynak: **dış** — (a) Vercel env (prod, canlıya-almadan ÖNCE, kullanıcı aksiyonu; koda gömülmez), (b) yerel `.env.keys.local` (git-ignore `.env*.local` ile; dosya **mevcut** ✓, canlı deploy'da kullanılmaz). Değer asla koda/dokümana yazılmaz.
- **Anahtar-yok guard korunur (mesaj değişir):** `GROQ_API_KEY` yoksa mevcut desen gibi **503** (zarif offline) döner; `route.ts:21-24` `ANTHROPIC_API_KEY` → `GROQ_API_KEY` + mesaj string'i güncellenir. Kaynak: `route.ts:21-24` (repoda-tanımlı).
- **Byte-cap 400 → istemcide generic "offline" görünür (kabul):** `Chatbot.tsx:38` `!res.ok` olan **her** yanıtı offline sayar (`t("error")`) → byte-cap 400'ü ayrı "mesaj çok uzun" olarak göstermez. UI dokunulmaz kararıyla tutarlı; kimse meşru olarak 8KB+ tek mesaj yollamaz (adversarial edge). Plan/verify ayrı UX **beklememeli**. Kaynak: `Chatbot.tsx:38-42` (repoda-tanımlı).
- **Kimlik tanımlayıcı drift'i kriter-5'ten geniş (`ANTHROPIC_API_KEY` → `GROQ_API_KEY`):** kriter-5 yalnız M5+OVERVIEW sayıyor ama tanımlayıcı şu **ziyaretçi/dev** sitelerinde de geçiyor — plan-phase için checklist: `route.ts:21,23` (kod, çekirdek) · **`messages/{tr,en,ar,de,es}.json:494` ×5 (ziyaretçi-görünür offline kopya — karar aşağıda)** · `.env.example` (anahtar+yorum+`CHAT_MODEL` varsayılanı) · `README.md:20,30,38` · `CLAUDE.md:284` (Dokunulmaz → onay) · `MASTER_PROMPT_v2.md:36,42` (brief — hassas; ayrı ele al) · `_dev/` operasyonel (MEMORY "Chatbot env" satırı). Tarihsel/append-only `_dev/` kayıtları (DECISIONS vb.) dokunulmaz. Kaynak: grep 2026-07-21.
- **Free-tier limitleri (2026-06):** 30 RPM · **1.000 RPD** · 12K TPM · 100K TPD, kartsız. Tanıtım sitesi için muhtemelen yeterli; RPD/TPD tükenirse Groq **429** → istemci zaten zarif offline'a düşer (mevcut fallback). Honest degradation; hacim büyürse ücretli tier ($0.59/$0.79 /1M) yolu açık ama $0 hedefi şimdilik. Kaynak: dış (web, Groq free-tier).
- **Groq mid-stream/429 hatası:** `create({stream:true})` çağrı anında (auth/429) veya `for await` içinde throw edebilir; mevcut `try/catch` (`route.ts:69-77`) fallback metnini enqueue eder → aynı desen korunur, fallback metni **TR'ye** çevrilir. `maxDuration=30` Groq ~600ms için bol. Kaynak: `route.ts:69-77` (repoda-tanımlı).

### Teknik Kararlar

- **[Karar C.1] Groq istemcisi: `groq-sdk`** (kullanıcı onaylı). Gerekçe: net-sıfır bağımlılık (Anthropic çıkar/Groq girer), resmi OpenAI-uyumlu drop-in, mevcut streaming sözleşmesini korur (kriter-1), ILKELER kalıcılık (bakımlı SDK > el-yazımı SSE). `package.json` değişimi onay alındı.
- **[Karar C.2] Offline hata kopyası yeniden yazılır — dev anahtar-adı kaldırılır** (kullanıcı onaylı). `messages/*.json:494` ×5 "Add an ANTHROPIC_API_KEY" → ziyaretçiye uygun kopya ("birazdan tekrar deneyin / e-posta"). Gerekçe: canlıya alınınca offline = geçici hata (anahtar-eksik değil) → anahtar-adı iması yanlış olurdu; craft + dürüstlük. TR kaynak yazılır, non-TR değer-senkronu implementasyon task'ında. Bu bir **değer** değişimi (anahtar EKLEME/rename değil) → i18n disiplini korunur; ama tanımlayıcı TR dahil yanlış olduğundan bu fazın işi (çeviri-senkronu numarasız adayından ayrı).
- **[Karar C.3] System prompt cerrahi düzenleme** (discuss kararının somutlaşması): İngilizce talimat dili korunur; dil satırı (`route.ts:14`) TR **eklenir + varsayılan yapılır** ("You support Turkish, English, Arabic, German, and Spanish… **Default to Turkish** if unclear"); **"asla fiyat/rakam/istatistik/tarih uydurma; bilmediğin somut sayıyı söyleme → keşif görüşmesine yönlendir"** kuralı eklenir (dürüstlük; `gpt-oss` bu yüzden elendi). Crew OS taksonomisi **zaten doğru** (prompt "Our flagship layer is Crew OS", Bunker sızmıyor ✓); booking sözü yok, keşif görüşmesi/e-posta CTA korunur (takvim v0.6). Tam yeniden yazım yok. **→ TASK-18.07 gate'i bu dil kuralını sertleştirdi:** "Default to Turkish if unclear" **kaldırıldı**, yerine "kullanıcının son mesajının dilinde yanıtla + tek dil/tek script, başka dil/karakter karıştırma, yalnız gerçekten belirsizse TR" geldi; ayrıca `temperature: 0.2` eklendi. Gerekçe: llama varsayılan sıcaklıkta EN sorularını TR/başka dile düşürüyor + çok-dilli script sızdırıyordu. Detay → aşağıda **Gözle Doğrulama** bölümü + DECISIONS 2026-07-22.
- **[Karar C.4] Fallback stream-hata metni TR'ye çevrilir** (`route.ts:73`, "The assistant hit an error…" → TR). Bu, i18n `error` (offline) string'inden **ayrı** — runtime stream-içi enjekte edilen kenar-durum metni.
- **[Karar C.5] `CHAT_MODEL` override deseni korunur** (`route.ts:6`, repoda-tanımlı). **→ Varsayılan model TASK-18.08 go-live'ında `qwen/qwen3.8-27b` oldu:** Groq `llama-3.3-70b-versatile`'ı bu faz sürerken emekliye ayırdı (canlı 404). Override deseninin kendisi değişmedi — zaten tam bu durum için korunmuştu. Detay → aşağıda **Go-live** bölümü + DECISIONS 2026-09-11.
- **[Karar C.6] Sanitizasyon+byte-cap saf fonksiyona çıkarılır** (Vitest node testi için); `max_tokens: 1024` + `text/plain` streaming sözleşmesi + `slice(-12)` geçmiş sınırı korunur. **→ `max_tokens` go-live'da zorunlu olarak 512'ye indi** (OTPM limiti; aşağıda **Go-live**). Byte-cap her tutulan mesajın `content`'ine uygulanır (yalnız trailing değil — history de istemciden gelir/güvenilmez). Kesin dosya konumu + cap değeri (öneri 8192) plan-phase.

---

---

**Ayrılma notu:** Bu bölüm 2026-09-11'de `verify-phase 18` Adım 6b boyut kapısında `PHASE-18.md`'den buraya taşındı (parent ~20.8k token ile kırmızı çizgiyi aşmıştı; teşhis **gerçek büyüme**, kullanıcı kesim onayı alındı). Faz 17 emsali: [PHASE-17-ARASTIRMA.md](PHASE-17-ARASTIRMA.md). İçerik değişmedi — parent'ta kendi kendine yeten özet + pointer kaldı.
