# M5: Chatbot & API

**Sorumluluk:** Canlı, çok dilli chatbot'u sağlamak — Groq streaming API endpoint'i ve chat UI.
**Bağımlılık:** M1 (Living Flow "thinking" motifi, tema), M4 (UI metinleri). `groq-sdk` (OpenAI-uyumlu).
**Sınır:** Sohbet işlevi. Ana sayfaya gömülme yerleşimi M2'dedir; "book a call" akışına bağlama henüz yok (bekleyen iş).

---

## Feature'lar

### F5.1: Chat API endpoint → Faz —

**Açıklama:** `src/app/api/chat/route.ts` — Node.js runtime (max 30s). Varsayılan model `process.env.CHAT_MODEL ?? "qwen/qwen3.8-27b"` (Groq). System prompt: Kiwi asistanı kimliği, **kullanıcının son mesajının dilinde yanıt** (TR/EN/AR/DE/ES; **tek dil/tek script — başka dil/karakter karıştırma yok**; yalnız dil gerçekten belirlenemezse TR fallback — TASK-18.07 marka mührü gate'inde sertleştirildi, "Default to Turkish if unclear" kaldırıldı), çıktı-odaklı/sade ton, **"fiyat/rakam/istatistik/tarih uydurma yasağı"** (dürüstlük konvansiyonu), satın-alma niyetinde "ücretsiz keşif görüşmesi"/e-posta (`kivanc@kiwiailab.com`) önerisi, 2–3 cümle yanıt. POST `{messages:[...]}`; sanitizasyon saf modüle çıkarıldı (`@/lib/chat-sanitize`, Vitest node ile test edilebilir): ham dizi uzunluğu kapısı (**`MAX_INCOMING_MESSAGES` 100**, filtreden ÖNCE), rol whitelist, boş içerik filtresi, her mesajın **`{role, content}`'e indirgenmesi** (istemcinin `name`/`tool_calls`/serbest alanları sağlayıcı payload'ına geçmez; `content` bir kez okunur), son 12 mesaj, **per-mesaj UTF-8 byte-cap 8192** ve **tutulan setin toplamı için `MAX_TOTAL_BYTES` 16384** → üçünde de aşımda 400 reddet (sessiz kırpma yok), sonda user mesajı zorunlu. OpenAI-uyumlu `chat.completions.create({ stream: true, temperature: 0.2 })` ile text/plain stream, `max_tokens: 512` (`temperature: 0.2` marka sesi tutarlılığı + script sızıntısı bastırma — 18.07; `max_tokens` go-live'da OTPM kotası nedeniyle 1024→512 indi — 18.08).

**Kabul Kriterleri:**
- `GROQ_API_KEY` yoksa istek zarif şekilde başarısız olur (503; UI "offline" gösterir).
- Girdi sanitize edilir; geçmiş 12 mesajla sınırlanır; per-mesaj byte-cap aşımı 400 ile reddedilir.
- Sağlayıcıya giden her mesaj yalnız `{role, content}` taşır — istemcinin eklediği başka alan geçmez.
- Girdi hacmi üst sınırlıdır: ham mesaj sayısı > 100 veya tutulan içeriğin toplamı > 16384 byte → 400.
- Stream hatasında client'a fallback mesaj enqueue edilir.

**Bağımlılık:** Yok (env: GROQ_API_KEY, opsiyonel CHAT_MODEL)

**Edge Case'ler:**
- Key yok → 503 offline; sağlayıcı/stream hatası → hard-cut yerine kontrollü fallback mesajı.
- Kötüye kullanım: girdi uzunluğu/rol enjeksiyonu sanitize edilmeli (güvenlik ekseni). Üç hacim sınırı birbirinin yerini tutmaz: per-mesaj cap tek uzun mesajı, toplam byte çok sayıda sınır-altı mesajı, sayı kapısı dev dizinin taranmasını kapatır.
- Hız sınırı / origin kontrolü **yok** (route, middleware ve `vercel.json` katmanlarının hiçbirinde) → kimliksiz POST sınırsız; günlük kota dışarıdan tüketilebilir. Kapsam-dışı kayıt, v0.6 adayı (UAT 18 senaryo 23).
- Model adı geçerliliği (env override yanlışsa).

---

### F5.2: Chatbot UI → Faz —

**Açıklama:** `src/components/Chatbot.tsx` — client state (messages, input, streaming, offline). Karşılama + 3 öneri butonu; mesaj balonları (user koyu/sağ, assistant açık/sol); `<Thinking/>` (Living Flow nabız motifi); `/api/chat`'i fetch edip `TextDecoder` ile stream okur, son assistant mesajına ekler; hata/offline'da fallback mesaj.

**Kabul Kriterleri:**
- Stream parça parça UI'a yansır (incremental).
- Offline/hata durumunda anlamlı mesaj gösterilir (yeşil "online" noktası YOK — brief yasağı).
- Tema uyumlu (light/dark).

**Bağımlılık:** F5.1, M1 (thinking motifi), M4

**Edge Case'ler:**
- Stream ortada koparsa UI takılı kalmamalı.
- Reduced-motion'da thinking animasyonu sade kalmalı.

---

## Teknik Notlar

- "Thinking" durumu Living Flow imzasını taklit eder — generic yükleniyor spinner'ı / "online" noktası kullanılmaz (brief).
- Groq SDK versiyonu `^1.3.0` (OpenAI-uyumlu API); model varsayılanı `qwen/qwen3.8-27b`. Groq `llama-3.3-70b-versatile`'ı 2026-07 ile 2026-09 arasında emekliye ayırdı (canlı 404 `model_not_found`) → TASK-18.08 go-live'ında model yeniden seçildi; sağlayıcı/SDK/mimari değişmedi (DECISIONS 2026-09-11).
- Ücretsiz kota (2026-09): 1.000 istek/gün + **8.000 token/dakika** + 1.000 çıktı token/dakika (OTPM). `max_tokens` peşin rezerve edilir → 512'de kalır (18.08). `MAX_TOTAL_BYTES` bu bütçenin girdi ayağını korur: sınır olmadan tek istek 12 × 8192 = 98KB (~25k token) gönderip TPM'i tek çağrıda yakabiliyordu (UAT 18 senaryo 21).
- Vercel'de canlı çalışması için env'e `GROQ_API_KEY` eklenmeli.
- Bekleyen iş: chatbot'u gerçek "book a call" formuna/akışına bağlama (MASTER_PROMPT v2 §8).

---

**Son Güncelleme:** 2026-09-11 — TASK-18.09: F5.1 sanitizasyon tarifi + kabul kriterleri girdi daraltma ve iki yeni hacim sınırını içerecek şekilde güncellendi (`{role, content}` indirgeme · `MAX_INCOMING_MESSAGES` 100 · `MAX_TOTAL_BYTES` 16384; UAT 18 senaryo 20/21). Ayrıca F5.1 gövdesindeki bayat `max_tokens: 1024` go-live gerçeğine (512) hizalandı ve hız-sınırı yokluğu edge case olarak kaydedildi.
