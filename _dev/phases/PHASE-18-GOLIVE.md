# Phase 18 — Go-live Yolu: Marka Mührü Gate + Canlıya Alma

← [PHASE-18.md](PHASE-18.md) · tarihsel-kayıt

> Faz 18'in canlıya çıkış yolunun iki tarihsel kaydı: **kabul kriteri 4**'ün marka mührü gate'i (TASK-18.07) ve onun açtığı kapıdan geçen **go-live** (TASK-18.08). Parent'ta özet + pointer kalır; ölçüm detayı, koşu tabloları ve arıza teşhisi burada.

---

## Gözle Doğrulama — Marka Mührü Gate (TASK-18.07, 2026-07-22)

> Kabul kriteri 4. Nihai `route.ts` SYSTEM_PROMPT + `llama-3.3-70b-versatile` + gerçek `sanitizeMessages` ile server**siz** node harness (test key `.env.keys.local`; sandbox `next start` exit-144'ten kaçınıldı). 5 dil (TR/EN/AR/DE/ES) × 4 temsili ziyaretçi sorusu (genel / **fiyat-dürüstlük probu** / "Crew OS nedir" / gym) = 20 yanıt/koşu. Harness: SYSTEM_PROMPT+MODEL+temperature route.ts'ten runtime çıkarıldı (sıfır drift); mekanik garble (CJK/Hangul/Kiril/Kana) dedektörü.

**1. koşu (sertleştirme ÖNCESİ prompt) — ❌ BAŞARISIZ (2 tam koşu reprodüktif):**
- **EN → yanlış dile düşüş:** "Do you offer automation for my gym?" 4/4 Türkçe; "What is Crew OS?" bir koşuda **Korece**. Kök neden: prompt'taki "Default to Turkish if unclear" + llama'nın kısa/özel-adlı EN sorularında zayıf dil algılaması.
- **Çok-dilli script bozulması** (CJK/Hangul/Kiril/Vietnamca): TR/EN/AR'de aralıklı — craft (Awwwards çıtası) bozuluyor.
- **Temperature teşhisi:** temp=0.3 EN→TR düşüşünü **çözmedi** (4/4 hâlâ TR) → dil-düşüşü prompt kaynaklı, sıcaklık kaynaklı değil.
- **Sağlam kalanlar (bu koşuda bile):** dürüstlük 5/5 (uydurma rakam yok → keşif CTA), Crew OS taksonomisi 5/5 (Bunker sızmadı), booking sözü yok.

**Remediation (kullanıcı onaylı, AskUserQuestion 2026-07-22):** `route.ts` SYSTEM_PROMPT dil kuralı sertleştirildi ("son mesajın dilinde yanıtla + tek dil/tek script + başka dil karıştırma yok + yalnız gerçekten belirsizse TR") + `temperature: 0.2` eklendi (garble bastırma).

**2. + 3. koşu (sertleştirme SONRASI) — ✅ GEÇTİ (reprodüktif):**

| Dil | (a) doğru dil | (b) dürüstlük | (c) Crew OS taksonomi | (d) marka sesi | garble |
|-----|:---:|:---:|:---:|:---:|:---:|
| TR | ✅ | ✅ | ✅ (Bunker yok) | ✅ | 0 (CJK/Hangul/Kiril/Kana) |
| EN | ✅ (4/4 EN — Crew OS + gym düzeldi) | ✅ | ✅ | ✅ | 0 |
| AR | ✅ | ✅ | ✅ | ✅ | 0 |
| DE | ✅ | ✅ | ✅ | ✅ | 0 |
| ES | ✅ | ✅ | ✅ | ✅ | 0 |

- **GARBLE: 0/20** her iki koşuda (mekanik dedektör). **Dil sadakati 5/5**, **dürüstlük 5/5** (hiç uydurma rakam), **taksonomi 5/5**, booking sözü yok / keşif-e-posta CTA yerinde.
- **Artık küçük craft lekeleri (bloke değil, dürüst kayıt):** (1) TR "Crew OS nedir" yanıtında ~%50 "observable ve measured" (prompt'un İngilizce ifadesi TR'ye yankılanıyor — anlam bozmuyor); (2) nadir tek bozuk token ("cụreleri", Latin-diakritik; regex-dışı, 1 örnekte). Ağır marka-kırıcı hatalar (yanlış-dil yanıt, Latin-dışı tam-kelime) tamamen gitti. İstenirse sonraki cila: prompt'ta "observable and measured" ifadesini yumuşat.

**Verdict: kabul kriteri 4 ✅ — go-live (18.08) kapısı AÇILDI.** Test key hiçbir dosya/log/committe yazılmadı; harness scratchpad'de koşturuldu + silindi.

---

## Go-live — Canlıya Alma (TASK-18.08, 2026-09-11)

> Milestone. Kullanıcı `GROQ_API_KEY`'i Vercel Production env'e ekledi → redeploy → canlı duman testi. Kanıt-artefaktı disiplini (MEMORY) uygulandı: her iddia curl çıktısı / runtime log / `git merge-base` ile bağlandı.

### Devralınan durum

Faz 18'in kod tarafı 2026-07-22'de `main`'e alınmıştı (`275323a`, Vercel deploy `success`) ama **env hiç eklenmemişti** — `vercel env ls` projede **sıfır** environment variable gösterdi. Temmuzdaki "trigger redeploy to pick up GROQ_API_KEY env" boş commit'i anahtar eklenmeden atılmış, task da kapatılmamıştı. Bu oturum önce o boşluğu kapattı.

### İki canlı arıza — ikisi de yalnız runtime log'unda görünür

Env eklendikten sonra `/api/chat` **503'ten 200'e** döndü ama yanıt gövdesi stream-içi hata fallback'iydi. Dıştan bakan bir gözlemci (HTTP 200 + metin akıyor) "çalışıyor" sanır; `next build`, Vitest 52/52 ve curl'ün üçü de yeşildi. Sebebi veren tek şey `vercel logs` oldu — **iki kez, iki farklı sebeple**:

| # | Runtime hatası | Kök neden | Düzeltme |
|---|---|---|---|
| 1 | `404 model_not_found` | Groq `llama-3.3-70b-versatile`'ı (ve tüm Llama sohbet hattını) emekliye ayırdı — research'teki "deprecated değil" damgasından ~7 hafta sonra | Model yeniden seçildi → `qwen/qwen3.8-27b` |
| 2 | `429 rate_limit_exceeded` OTPM 1000 < 1024 | Ücretsiz tier `max_tokens`'ı **peşin rezerve** ediyor → 1024 isteyen her çağrı tek başına karşılanamaz | `max_tokens: 1024 → 512` + çağrı yerine gerekçe yorumu |

**Ders (memory'ye taşındı):** Bir canlı arızayı düzeltince "tamam" deme — aynı yoldan tekrar doğrula, arkasında ikinci sebep durabilir. → [groq-model-emekliligi](../memory/groq-model-emekliligi-runtime-404.md).

### Model yeniden seçimi — eleme kriteri ikinci kez uygulandı

Kalan Groq sohbet modelleri arasında `openai/gpt-oss-120b` vardı; o da DECISIONS 2026-07-21'de **rakam uydurduğu için elenmişti**. Elenme gerekçesinin bir kısmı aradan geçen sürede prompt'ta kapatıldığı için (TR-birincil dil kuralı + "asla rakam uydurma" yasağı) aday **kör reddedilmedi, yeniden sınandı**. TASK-18.07'nin marka mührü harness'i yeniden koşuldu (route.ts'ten runtime çıkarılan nihai prompt/parametreler, 5 dil × 3 temsili soru, mekanik garble/taksonomi/para-deseni dedektörleri):

| Model | Dil sadakati | Garble | Taksonomi | Dürüstlük | Gecikme |
|---|---|---|---|---|---|
| `qwen/qwen3.8-27b` | 15/15 | 0/15 | 0 Bunker | **0 ihlal** | 340–590ms |
| `openai/gpt-oss-120b` | 15/15 | 0/15 | 0 Bunker | **2 ihlal** | ~1.2s |

`gpt-oss-120b` temmuzki başarısızlığını **sertleştirilmiş prompt altında** birebir tekrarladı: ES gym yanıtında uydurma müşteri sonucu ("reduce en un 30 %"), TR fiyat yanıtında uydurma aralık ("ayda birkaç bin TL"). `qwen3.8-27b` aynı probu 5 dilde de rakam vermeyi reddedip keşif görüşmesine yönlendirerek geçti. Ön-elemede `qwen3.6-27b` (`<think>` bloklarını yanıt gövdesine sızdırıyor) ve `compound-mini` (gereksiz agentic web arama, yavaş) düştü.

### Canlı doğrulama — kanıt artefaktları

- **5 dil canlı `kiwiailab.com/api/chat`**: TR/EN/AR/DE/ES → hepsi doğru dilde, marka sesinde, `Bunker` sızıntısı yok, booking sözü yok, keşif-görüşmesi/e-posta CTA yerinde. EN "What is Crew OS?" İngilizce yanıtladı (18.07'nin düzelttiği dil-düşüşü canlıda da temiz). TR fiyat probu rakam vermeyi **reddetti** → dürüstlük konvansiyonu canlıda ✓.
- **Regresyon**: `/` · `/crew-os` · `/spor-salonu-yazilimi` · `/vaka-calismalari` · `/en` · `/ar` · `/de` · `/es` → 8/8 **200**; AR `<html lang="ar" dir="rtl">` ✓.
- **Ataş kanıtı**: `git merge-base --is-ancestor` ile hem v0.5 HEAD (`3a48bca`) hem go-live fix (`3699f57`) `origin/main` ataşı doğrulandı. Canlı deploy `3699f57`, GitHub commit status `Vercel success`.
- **Yerel kapılar**: `next build` temiz (37 sayfa) + Vitest **52/52**.

### Artık durum (bloke değil, dürüst kayıt)

- **Kota tavanı:** ücretsiz tier 1.000 istek/gün + 8.000 TPM + **1.000 OTPM**. Tükenirse Groq 429 → mevcut zarif offline fallback (honest degradation). Hacim büyürse ücretli Dev Tier açık, $0 hedefi şimdilik korunuyor.
- **`GROQ_API_KEY` yalnız Production'da.** Preview env'e eklenmedi → `revize/...` preview deploy'larında chatbot offline görünür. Kullanıcıya önerildi, bilinçli açık.
- **Küçük craft lekesi:** TR gym yanıtında "doğum günü ve doğum günü sonrası" gibi seyrek tekrar; anlam bozulmuyor, marka-kırıcı değil. 18.07'nin kayıtlı "observable ve measured" yankısıyla aynı kategoride — prompt cilası numarasız aday.

**Verdict: milestone ✅ — chatbot canlıda çalışıyor.** v0.4'ten devralınan `/api/chat` 503/offline açık takip kalemi **kapandı**.
