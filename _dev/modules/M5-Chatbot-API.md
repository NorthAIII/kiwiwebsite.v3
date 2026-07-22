# M5: Chatbot & API

**Sorumluluk:** Canlı, çok dilli chatbot'u sağlamak — Groq streaming API endpoint'i ve chat UI.
**Bağımlılık:** M1 (Living Flow "thinking" motifi, tema), M4 (UI metinleri). `groq-sdk` (OpenAI-uyumlu).
**Sınır:** Sohbet işlevi. Ana sayfaya gömülme yerleşimi M2'dedir; "book a call" akışına bağlama henüz yok (bekleyen iş).

---

## Feature'lar

### F5.1: Chat API endpoint → Faz —

**Açıklama:** `src/app/api/chat/route.ts` — Node.js runtime (max 30s). Varsayılan model `process.env.CHAT_MODEL ?? "llama-3.3-70b-versatile"` (Groq). System prompt: Kiwi asistanı kimliği, **TR-birincil** dil algılama (TR/EN/AR/DE/ES; dil belirsizse varsayılan Türkçe), çıktı-odaklı/sade ton, **"fiyat/rakam/istatistik/tarih uydurma yasağı"** (dürüstlük konvansiyonu), satın-alma niyetinde "ücretsiz keşif görüşmesi"/e-posta (`kivanc@kiwiailab.com`) önerisi, 2–3 cümle yanıt. POST `{messages:[...]}`; sanitizasyon saf modüle çıkarıldı (`@/lib/chat-sanitize`, Vitest node ile test edilebilir): rol whitelist, boş içerik filtresi, son 12 mesaj, **per-mesaj UTF-8 byte-cap 8192 → aşımda 400 reddet** (sessiz kırpma yok), sonda user mesajı zorunlu. OpenAI-uyumlu `chat.completions.create({ stream: true })` ile text/plain stream, `max_tokens: 1024`.

**Kabul Kriterleri:**
- `GROQ_API_KEY` yoksa istek zarif şekilde başarısız olur (503; UI "offline" gösterir).
- Girdi sanitize edilir; geçmiş 12 mesajla sınırlanır; per-mesaj byte-cap aşımı 400 ile reddedilir.
- Stream hatasında client'a fallback mesaj enqueue edilir.

**Bağımlılık:** Yok (env: GROQ_API_KEY, opsiyonel CHAT_MODEL)

**Edge Case'ler:**
- Key yok → 503 offline; sağlayıcı/stream hatası → hard-cut yerine kontrollü fallback mesajı.
- Kötüye kullanım: girdi uzunluğu/rol enjeksiyonu sanitize edilmeli (güvenlik ekseni).
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
- Groq SDK versiyonu `^1.3.0` (OpenAI-uyumlu API); model varsayılanı `llama-3.3-70b-versatile`.
- Vercel'de canlı çalışması için env'e `GROQ_API_KEY` eklenmeli.
- Bekleyen iş: chatbot'u gerçek "book a call" formuna/akışına bağlama (MASTER_PROMPT v2 §8).

---

**Son Güncelleme:** 2026-07-22 — TASK-18.06: provider Anthropic→Groq stack hizalama (`groq-sdk` / `llama-3.3-70b-versatile` / `GROQ_API_KEY`); F5.1'e system prompt TR-birincil dil algılama + rakam-uydurma yasağı + sanitize per-mesaj byte-cap (`@/lib/chat-sanitize`) yansıtıldı.
