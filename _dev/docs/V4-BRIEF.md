# Kiwi AI Lab — Yeni Site (v4) Başlangıç Brief'i

**Tarih:** 2026-10-03 · **Kaynak proje:** `kiwiwebsite.v3` (canlı, bakım modunda) · **Karar:** DECISIONS 2026-10-03 "Yeni site ayrı repoda"

Bu belge yeni projenin `/devflow:kickoff` oturumunun tek girdisidir. v3'ün 19 fazlık geçmişi taşınmaz; yalnız aşağıdaki kararlar ve kod parçaları taşınır. Yeni projede ayrıntı gerekirse v3 reposundaki kaynak belge okunur (yollar parantez içinde).

---

## 1. Neden yeni repo

- Hedef v3'ün bir üst seviyesi: yeni mesaj, yeni ilk ekran, yeni deneyim. 19 fazlık bir sitenin üstüne yama, o geçmişe bağlı kalmak demek.
- v3'ün DevFlow geçmişi her oturumda okunuyor (açılış dokümanları ~36 KB) ve iki işi birbirine karıştırıyor.
- v3 canlıda kalır ve korunur. Yeni site hazır olunca alan adı taşınır (→ §6).

---

## 2. Ana sayfa mesajı — alınmış kararlar

Kaynak: v3 `_dev/PRD/NOTES.md` (2026-10-03 üç not) + `_dev/docs/RAKIP-ANALIZI-ILK-EKRAN.md`.

- **Hedef:** ziyaretçi ilk ekranda 8 saniyede kim olduğumuzu, kime hitap ettiğimizi ve ne yaptığımızı anlar.
- **Seçilen yön: B — Tek sahne.**
  - Eyebrow: "Kiwi AI Lab · İşletmeler için otomasyon"
  - Başlık: "Siz müşterinizle ilgilenirken, WhatsApp'ta bekleyen diğeri kaybolmasın."
  - Alt metin: "Cevap, randevu, hatırlatma, takip: işletmenize biz kurarız, kendiliğinden çalışır."
  - Altında sektör seçicili sahne kartı (spor salonu · klinik · e-ticaret · emlak): sahne cümlesi + Ne olur / Sistem / Sonuç. Spor salonu kartı "Alpfit'te şu an canlı" etiketini taşır, diğerleri "Örnek akış".
- **"AI / yapay zekâ" kelimesi mesajda geçmez.** Yalnız marka adında (Kiwi AI Lab) kalır. Taranan Türk rakiplerin hepsi AI ile açıyor; bu tek başına bir fark.
- Eski hero ("İşinizi analiz ederiz. Sonra otomatikleştiririz.") çapa değildir; mesaj baştan yazılır.
- **Rakip taramasından kaçınılacaklar:** "X'i yapay zekâ ile otomatikleştirin", "7/24 çalışan…", jargon ("akıllı asistan", "yeni nesil"), kaynaksız metrik rozetleri, kimliksiz CTA ikilisi, uzun başlık.
- **Kullanılacak boşluklar:** yaşanan an (koltukta müşteri varken çalan WhatsApp), "biz kurarız" vaadi başlıkta, kendi ürünlerimiz (Crew OS, Alpfit) kanıt olarak, kaynaksız rozet yerine tek gerçek vaka.
- **Açık fikirler (karar verilmedi):**
  - "Ekip OS" adı: Crew OS'un Türkçe karşılığı olabilir mi, yalnız TR'de mi? Karar verilene dek "Crew OS".
  - Tanışma kanıtı: "Size bu e-postayı otomasyonumuz gönderdi" satırı, yalnız gerçekten o kanaldan gelen ziyaretçiye (URL parametresiyle). İYS / ticari e-posta mevzuatı teyit edilmeli.

---

## 3. Değişmeyen marka ve içerik kuralları

Kaynak: v3 `_dev/PRD/VIZYON.md` §3–§5 + `_dev/ILKELER.md`.

- **Ürün taksonomisi:**
  - **Crew OS:** bayrak katman, public ad.
  - **Bunker OS:** Crew OS'un iç kod adıdır, hiçbir yüzeyde görünmez. İkisi aynı şeydir.
  - **Alpfit:** ayrı, bağımsız spor salonu ürünüdür, Crew OS'un parçası değildir.
- **Ses:** çıktı odaklı, sade, kendinden emin. Yasak: doktor/teşhis/hekim/reçete metaforu, sahte "● online/canlı" göstergesi (gerçekten canlı ürünün dürüst göstergesi serbest), zayıf adım adı ("Dinle"), dolgu metin.
- **Dürüstlük:** sayı ya da sonuç iması taşıyan metin ya gerçek veriye dayanır ya "örnek / öngörü" olarak okunur.
- **Diller:** tr (varsayılan, prefixsiz), en, ar (RTL), de, es. TR tek kaynaktır; çeviri versiyon sınırında yapılır. Eksik anahtar asla, eski metin geçici olarak kabul.
- **Çıta:** Awwwards SOTD, "zero template smell". Çatışmada craft kazanır. v3'te ulaşılan a11y 100 tabanının altına düşülmez.
- **Hedef kitle:** tekrarlayan operasyonel işi olan işletmeler: spor salonu, klinik, e-ticaret, emlak, eğitim/danışmanlık, restoran/kafe. Birincil CTA: ücretsiz keşif görüşmesi.

---

## 4. v3'ten taşınacak kod (kopyalanır, bağımlılık kurulmaz)

| Parça | v3 yolu | Not |
|-------|---------|-----|
| Chatbot API | `src/app/api/chat/route.ts` | Groq streaming, zarif offline, zaman aşımları, ziyaretçi dilinde hata notu |
| Girdi temizliği | `src/lib/chat-sanitize.ts` | Rol whitelist, 12 mesaj, byte sınırları |
| Origin kapısı | `src/lib/chat-origin.ts` | Same-origin kuralı; route'un ilk işi |
| Chatbot UI | `src/components/Chatbot.tsx` | Yeni tasarıma göre yeniden giydirilir; `!res.ok` → offline kopyası davranışı korunur |
| Testleri | `tests/chat-*.test.ts` | Vitest node |
| WAF spec + drift | `ops/firewall/` | Hız sınırı: `POST /api/chat` 6 / 10 dk / IP |
| Canlı probe | `ops/probe-chat-guard.mjs` | Modeli hiç çağırmaz |
| Çeviriler | `messages/*.json` | Yalnız işe yarayan anahtarlar (chat, nav, footer…); ana sayfa metni yeniden yazılır |
| Umami | `src/components/analytics/umami-script.tsx` | Self-hosted `umami.kiwiailab.com` |
| Living Flow (opsiyonel) | `src/components/living-flow/` | Yeni tasarımda imza olarak kalıp kalmayacağı kickoff'ta kararlaştırılır |

v3 stack'i referanstır, zorunluluk değil: Next.js 15 App Router, React 19, TS strict, Tailwind v4 (`@theme`), three/R3F, GSAP + Lenis, next-intl, groq-sdk. Not: v3'te Next 15.5.27'nin gömülü `postcss`'inden kalan 1 high + 1 moderate audit bulgusu var; kapanış yolu Next 16. Yeni proje Next 16 ile başlarsa bu borç doğmaz.

---

## 5. Korunması gereken public URL'ler (SEO)

v3'ün sitemap'indeki yollar 5 dilde yayında. Yeni sitede ya aynen var olmalı ya kalıcı yönlendirme almalı:

- `/` · `/crew-os` · `/spor-salonu-yazilimi` · `/vaka-calismalari` · `/bulten/ai-sdr-araclari` · `/bulten/claude-opus-4-8-fable-5`
- Mevcut yönlendirmeler: `/bunker-os` → `/crew-os`, `/forum` ve `/forum/*` → `/` (locale prefix'li hâlleri dahil; v3 `next.config.ts`).

---

## 6. Yayına geçiş ve canlı ortam

- **Vercel:** v3 = `north-ai/kiwi-ai-lab-v3`, her `main` push canlıya gider. Yeni site ayrı Vercel projesinde gelişir. Hazır olunca `kiwiailab.com` (ve `www`) yeni projeye taşınır, v3 yedek kalır.
- **WAF kuralı projeye bağlıdır.** Alan adı taşınınca hız sınırı yeni projede yoktur. Taşımadan önce yeni projeye `ops/firewall/chat-rate-limit.json` stage edilir ve publish edilir (Hobby: 1 rate-limit kuralı).
- **Env:** `GROQ_API_KEY` (zorunlu), `CHAT_MODEL` (opsiyonel, varsayılan `qwen/qwen3.8-27b`). Yeni projede Production'a, istenirse Preview'e de eklenir.
- **v3 ne zaman dokunulur:** yalnız canlıyı bozan bir sorun ya da güvenlik yaması varsa (quick mode). Yeni özellik v3'e girmez.

---

## 7. Kickoff için açık sorular

1. "Bir üst seviye" ne demek: görsel dil, etkileşim, içerik derinliği? Referans siteler var mı?
2. Living Flow imza olarak kalıyor mu, yoksa yeni bir imza mı?
3. Kapsam: ilk sürüm yalnız ana sayfa mı (alt sayfalar v3 kopyası), yoksa bütün site mi?
4. Repo adı ve görünürlüğü (öneri `kiwiwebsite.v4`; v3 public).
5. Booking/takvim (v3'te v0.6 adayıydı) yeni sitenin ilk sürümünde mi?
