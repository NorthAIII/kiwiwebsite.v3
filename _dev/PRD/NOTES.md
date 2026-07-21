# NOTES — PRD Çalışma Notları (Log)

> Geliştirme sırasında ortaya çıkan fikir / analiz / karar notlarının **append-only log'u**. Her not en alta eklenir, mevcut notlar tüketilmez. **Konsolidasyon versiyon sonu `prd-review`'da** yapılır (not orada ilgili PRD dokümanına/DECISIONS'a mezun edilir, sonra buradan silinir).

---
### Chatbot AI Sağlayıcı Değişimi — Anthropic → Groq (llama-3.3-70b-versatile)
**Tarih:** 2026-07-21
**Bağlam:** `audit-docs` oturumu sırasında kullanıcı web sitesinin durumunu sordu; canlı kontrolde chatbot'un `/api/chat` → **HTTP 503 (offline)** olduğu (Vercel'de `ANTHROPIC_API_KEY` yok) teyit edildi. Kullanıcı stratejik yön açtı: **ekstra aylık API faturası ödemek istemiyor** (Claude Code aboneliğine zaten ~$100/ay ödüyor) → chatbot için **$0 hedefi**; "Groq / Llama gibi ücretsiz bir AI gömemez miyiz?". Ayrıca dile getirilen ama **sonraki versiyona ertelenen** iki istek: otomatik demo/randevu **booking** ve botun **takvime erişimi**.

**Tartışma:**
- **Ön araştırma (web, çok-kaynak):** Ücretsiz sağlayıcılar karşılaştırıldı — Groq, Google Gemini, OpenRouter, Mistral, Cerebras, Cloudflare Workers AI. Öne çıkanlar: **Groq** (kartsız, TR'de kanıtlanmış güçlü açık modeller, Vercel drop-in/OpenAI-uyumlu, veri-saklama temiz) ve **Gemini Flash** (AR'de en güçlü ama free-tier verisini ürün geliştirme + insan incelemesinde kullanıyor → booking'te PII riski). Elenenler: OpenRouter (kesinti + free-model kataloğu habersiz değişiyor), Mistral (2 RPM + "prod değil"), Cerebras (kart belirsiz).
- **Canlı kalite testi (3 tur):** Gerçek sitenin `route.ts` system prompt'u + temsili ziyaretçi sorularıyla, 5 dilde (TR/AR/DE/ES/EN) modeller doğrudan çağrıldı (OpenAI-uyumlu endpoint, kartsız ücretsiz key'ler). Bulgular:

  | Model | TR | AR | DE | ES | EN | Dürüstlük | Güvenilirlik |
  |---|---|---|---|---|---|---|---|
  | **Groq · llama-3.3-70b** | ✅ doğal | ✅ | ✅ | ✅ | ✅ | ✅ tutarlı | ✅ 18/18 sorunsuz, ~600ms |
  | Groq · gpt-oss-120b | ❌ İngilizce'ye kaçtı | ✅ | ⚠️ | ⚠️ | ✅ | ❌ **TR/DE/ES'de fiyat uydurdu** | ✅ çalıştı |
  | Gemini (flash-latest / 2.0-flash) | ⚠️ test edilemedi | — | — | — | — | — | ❌ **9/10 hata** (429 quota / 503 demand) |

  - **gpt-oss-120b elendi:** (a) system prompt Türkçe'yi dil listesinde saymadığı ("...English, Arabic, German, Spanish. Default to English") için TR soruya **İngilizce** cevap verdi; (b) fiyat sorularına **uydurma rakam** verdi ($1,200/ay · 250€/ay · 1.200–3.500 USD/ay) → **dürüstlük konvansiyonu ihlali**. Model "somut örnek ver" talimatını sayı uydurmaya çeviriyor.
  - **Gemini elendi:** free-tier üretimde güvenilmez (canlı doğrulandı) — `2.0-flash` anında 429 (quota), `flash-latest` sürekli 503 (yoğunluk). Araştırmadaki "ücretsiz Gemini üretimde güvenilmez" uyarısını teyit etti. (Not: test için verilen Gemini key'i standart `AIza…` değil `AQ.` formatındaydı — key tipi de şüpheli, ama Groq zaten net kazandığı için kovalanmadı.)
  - **llama-3.3-70b kazandı:** 5 dilin hepsinde marka kalitesinde ve **dürüst** (fiyat uydurmadı, "keşif görüşmesine yönlendir" dedi), hızlı, %100 güvenilir.
- **Maliyet notu:** Mevcut kod `claude-opus-4-8` (en pahalı model) kullanıyor — kullanıcının "$10-20/ay" korkusunun kaynağı bu. Ama karar $0 yönünde (kullanıcı tercihi); Groq kartsız ücretsiz bu hedefi karşılıyor.

**Sonuç (kullanıcı onaylı):**
- **Karar: Chatbot sağlayıcısı Anthropic (Opus) → Groq + `llama-3.3-70b-versatile`.** Gerekçe: $0/kartsız, 5 dilde marka kalitesi + dürüstlük, Vercel drop-in (OpenAI-uyumlu, mevcut streaming mimarisine yakın), veri-saklama temiz. → prd-review'da **DECISIONS.md**'ye mimari karar olarak işlenmeli.
- **Versiyon kapsamı:** **v0.5 adayı = "Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma."** Booking + takvim entegrasyonu (Cal.com "amatör" geldi / Google Calendar belirsiz — karar verilmedi) **v0.6'ya ertelendi**. Booking ayrı ve daha büyük bir iş (tool/function calling + takvim sistemi + PII/spam güvenliği).
- **İmplementasyon kabul kriterleri (v0.5 planlamasına taşınacak):**
  1. `route.ts` Groq'a geçer (`GROQ_API_KEY` Vercel env; OpenAI-uyumlu endpoint veya `@ai-sdk/groq`); streaming + sanitizasyon + zarif offline fallback korunur.
  2. System prompt **TR-birincil dil algılama** (varsayılan İngilizce değil; TR dahil 5 dil listelenir).
  3. System prompt'a **"asla fiyat/rakam uydurma"** kuralı (dürüstlük konvansiyonu) — her model için sağlamlaştırma.
  4. **Canlıya almadan önce 5 dil çıktısı gözle doğrulanır** (marka mührü — ILKELER üst eksen).
  5. M5-Chatbot-API.md + OVERVIEW stack satırı (`@anthropic-ai/sdk` → Groq) güncellenir.
- **Yan fayda:** Bu geçiş, canlıdaki chatbot-offline (503) sorununu da çözer — ANTHROPIC_API_KEY beklemeye gerek kalmaz.
- **Test artefaktları:** Kalite testi scriptleri bu oturumun scratchpad'inde (session'a özel, kalıcı değil); Groq test key'i repo-dışı `.env.keys.local`'da (git-ignore, canlı deploy'da kullanılmaz — Vercel env ayrı). Test tekrarı gerekirse key oradan.
---
