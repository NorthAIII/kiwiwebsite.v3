# M5: Chatbot & API

**Sorumluluk:** Canlı çok dilli Claude chatbot'unu sağlamak — streaming API endpoint'i ve chat UI.
**Bağımlılık:** M1 (Living Flow "thinking" motifi, tema), M4 (UI metinleri). `@anthropic-ai/sdk`.
**Sınır:** Sohbet işlevi. Ana sayfaya gömülme yerleşimi M2'dedir; "book a call" akışına bağlama henüz yok (bekleyen iş).

---

## Feature'lar

### F5.1: Chat API endpoint → Faz —

**Açıklama:** `src/app/api/chat/route.ts` — Node.js runtime (max 30s). Varsayılan model `process.env.CHAT_MODEL ?? "claude-opus-4-8"`. System prompt: Kiwi asistanı kimliği, kullanıcı dilini algılama (EN/TR/AR/DE/ES), çıktı-odaklı/sade ton, satın-alma niyetinde "ücretsiz keşif görüşmesi"/e-posta önerisi, 2–3 cümle yanıt. POST `{messages:[...]}`; sanitizasyon (rol whitelist, boş içerik filtresi, son 12 mesaj, sonda user mesajı zorunlu). `messages.stream()` ile text/plain stream, `max_tokens: 1024`.

**Kabul Kriterleri:**
- `ANTHROPIC_API_KEY` yoksa istek zarif şekilde başarısız olur (UI "offline" gösterir).
- Girdi sanitize edilir; geçmiş 12 mesajla sınırlanır.
- Stream hatasında client'a fallback mesaj enqueue edilir.

**Bağımlılık:** Yok (env: ANTHROPIC_API_KEY, opsiyonel CHAT_MODEL)

**Edge Case'ler:**
- Key yok / sağlayıcı hatası → 500 yerine kontrollü fallback.
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
- Anthropic SDK versiyonu `^0.40.0`; model varsayılanı `claude-opus-4-8`.
- Vercel'de canlı çalışması için env'e `ANTHROPIC_API_KEY` eklenmeli.
- Bekleyen iş: chatbot'u gerçek "book a call" formuna/akışına bağlama (MASTER_PROMPT v2 §8).

---

**Son Güncelleme:** 2026-06-27
