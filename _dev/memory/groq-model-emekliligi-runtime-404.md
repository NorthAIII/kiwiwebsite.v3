# Üçüncü-parti model adı bozulabilir bağımlılıktır — emeklilik yalnız canlı runtime log'unda görünür

**Olay (TASK-18.08, 2026-09-11):** Faz 18 research'i (2026-07-21) `llama-3.3-70b-versatile`'ı Groq
kataloğundan **"üretim modeli, deprecated değil"** diye kanonik doğrulamıştı. ~7 hafta sonra go-live
anında Groq modeli **tamamen kaldırmıştı** — hatta Llama sohbet modellerinin tamamı listeden
kalkmıştı. Canlı `/api/chat` **404 `model_not_found`** aldı.

## Neden tehlikeli — hiçbir yerel kapı yakalamaz

Model adı bir **string**tir; derlenmez, tip-kontrolünden geçmez, testlerde koşulmaz:

- `next build` **temiz** geçer (string'in geçerli bir model olup olmadığını bilmez).
- Vitest **52/52** geçer (LLM çağrısı bilinçli olarak CI'da koşulmuyor — token maliyeti + non-deterministik).
- Curl ile `/api/chat` **HTTP 200** döner. Hata stream'in **içinde** `try/catch` fallback metnine
  dönüştüğü için dış gözlemci "çalışıyor" sanır.

Yani üç yeşil kapı da yanıltıcıdır. **Tek belirleyici kanıt Vercel runtime log'udur:**
`vercel logs <deployment-url>` → `console.error("chat stream error", err)` satırı 404'ü ve
Groq'un tam mesajını verir. Go-live duman testinde "200 geldi" **yeterli değil**; yanıt
gövdesinin fallback metni olup olmadığına bak, şüphede runtime log'u oku.

## Kural

- **Sağlayıcı kararı ≠ model kararı.** Sağlayıcı (Groq) uzun ömürlü, model adı kısa ömürlü.
  Model adı değişimi mimari değişim değildir — `CHAT_MODEL` override deseni (C.5) tam da bunun
  için korunur; kod değişmeden env'den çevrilebilir.
- **Uzun aradan sonra go-live yapıyorsan model adını önce doğrula:**
  `curl -s https://api.groq.com/openai/v1/models -H "Authorization: Bearer $GROQ_API_KEY"`
  → adın listede olduğunu gör. Ucuz, deterministik, deploy öncesi.
- **Yeniden model seçerken eleme kriterini yeniden uygula, kör seçme.** Bu projede eleme kriteri
  **dürüstlük konvansiyonudur** (uydurma fiyat/rakam/istatistik yasağı — ILKELER üst eksen).
  TASK-18.07'nin marka mührü harness'i (route.ts'ten runtime çıkarılan prompt + 5 dil × temsili
  sorular + mekanik garble/taksonomi/para-deseni dedektörleri) bunun için yeniden koşulabilir
  bir araçtır. 2026-09-11'de `gpt-oss-120b` tam da bu kriterle **ikinci kez** elendi.
- **Eski bir elemeyi yeniden açarken kanıtla aç.** `gpt-oss` temmuzda elenmişti ama elenme
  gerekçesinin bir kısmı sonradan prompt'ta kapatılmıştı → kör reddetmek yerine yeniden sınandı.
  (Sonuç değişmedi, ama karar artık taze kanıta dayanıyor.)

## İkinci tuzak: `max_tokens` OTPM talebine **ona kadar** sayılabilir

Model düzeltildikten sonra canlı yine hata verdi; runtime log **farklı** bir sebep gösterdi:
**429, OTPM (output tokens per minute) limiti 1000, talep 1024.** Burst sorunu değildi —
`max_tokens` limitin üstündeydi ve 1024 isteyen çağrı tek başına karşılanamıyordu (→ 512).

**İncelik (ölçüm, 2026-10-02, production log'u son 3 saat):** OTPM 429'larındaki "Requested"
değeri hem **512** (= `max_tokens`) hem **78–332** aralığında görüldü. Yani Groq talebi her
zaman tam `max_tokens` kadar saymıyor, ama ona kadar çıkabiliyor. "`max_tokens` her çağrıda
peşin rezerve edilir" demek fazla güçlü; doğru hüküm: **`max_tokens` OTPM limitinin altında
kalmalı, cömert bırakılmamalı.**

**Kural:** `max_tokens`'ı gerçekten ihtiyaç duyulan uzunluğa göre seç. Bu projede 512 (prompt
2–3 cümle istiyor, ölçülen en uzun yanıt ~509 karakter). Yükseltmek canlı chatbot'u kırar —
gerekçe `route.ts`'te çağrı yerinde yorum olarak duruyor.

**Tekrar eden ders:** İki canlı arıza da art arda çıktı ve **ikisi de yalnız runtime log'unda
görünüyordu**; dıştan bakınca ikisi de aynı görünüyordu (HTTP 200 + fallback metni). Bir
canlı arızayı düzeltince "tamam" deme — **aynı yoldan tekrar doğrula**, arkasında ikinci
bir sebep durabilir.

## Model ya da sağlayıcı değişiminde süpürme

Kimlik bu projede birden çok yüzeyde yaşar; Faz 18'de süpürme üç turda tamamlanabildi
(18.05 → 18.10 → 18.13), çünkü dosya listesiyle yapıldı. Dosya listesiyle değil **sınıf
grep'iyle** süpür (eski + yeni ad), dışlama ölçütü klasör değil dokümanın tarihsel olup
olmadığıdır (`_dev/` toptan dışlanırsa yaşayan dokümanlar da gizlenir).

- **Model adı:** tek kaynak `src/app/api/chat/route.ts` varsayılanı; kopyaları README env
  tablosu, `.env.example`, `_dev/OVERVIEW.md` stack satırı, `modules/M5-Chatbot-API.md`,
  `MEMORY.md` "Chatbot env". Brief'e (`MASTER_PROMPT_v2.md`) bilinçle yazılmadı.
- **Anahtar / SDK adı:** yukarıdakilere ek olarak `CLAUDE.md` Secret'lar satırı,
  `.github/workflows/ci.yml` yorumu, `MASTER_PROMPT_v2.md` §6/§7, `_dev/docs/TESTING.md`,
  `modules/M6-SEO-Deploy.md` F6.4, `memory/repo-haritasi.md`, `ILKELER.md` sır ilkesi örneği
  (Korumalı — onay ister).
- **Tarihsel kayıtlar** (DECISIONS, task arşivi, tamamlanmış faz dokümanları) hizalanmaz.

## Kota notu (2026-09, Groq ücretsiz tier)

1.000 istek/gün + 8.000 token/dakika + **1.000 çıktı token/dakika (OTPM)**. Tükenirse 429 →
zarif offline fallback (honest degradation). Hacim büyürse ücretli Dev Tier yolu açık.

İlgili: [vercel-git-disconnect](vercel-git-disconnect-deploy-tetiklenmez.md) (canlı-teyit
disiplininin aynı ailesi — "deploy oldu" ≠ "doğru kod çalışıyor").
