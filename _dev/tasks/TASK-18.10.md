# TASK-18.10: Marka mührü kopya düzeltmeleri — CTA etiketi, DE hitap, README model ailesi

**Durum:** ⬜ Bekliyor
**Modül:** M5 — Chatbot & API (`modules/M5-Chatbot-API.md`); dokümantasyon ayağı M6
**Feature:** C1 (chatbot sağlayıcı geçişi + canlıya alma) — kabul kriteri 4 (marka mührü) + kriter 5'in ürün-ağacı ayağı
**Faz:** Phase 18 (`phases/PHASE-18.md`)
**Bağımlılıklar:** TASK-18.07 ✅ (5-dil marka mührü gate), TASK-18.08 ✅ (go-live)

---

## Hedef

Canlı UAT'ın bulduğu üç metin kusurunu kapatmak: (1) SYSTEM_PROMPT ziyaretçiyi **sitede olmayan** bir buton adına yönlendiriyor; (2) DE yanıtları sitenin formal hitabıyla (`Sie`) çelişen samimi hitap (`du`) kullanıyor; (3) `README.md` hâlâ emekli model ailesini (`Llama 3.3`) anıyor. Task, üçü de düzeltildiğinde ve 5-dil marka mührü harness'i (TASK-18.07 aracı) yeniden koşulup CTA ile hitap eksenlerinde temiz geçtiğinde tamamlanmış sayılır.

---

## Bağlam

Üç bulgu da verify-phase 18 UAT'ında **canlı** ölçüldü (senaryo 19, 28, 29):

**(1) CTA etiketi — dürüstlük konvansiyonu ihlali.** `route.ts` SYSTEM_PROMPT şunu diyor: *"they can use the **"Book a call"** button or email kivanc@kiwiailab.com"*. Sitede o etiketli buton **hiçbir locale'de yok**:

| locale | gerçek `hero.ctaPrimary` |
|---|---|
| tr | Ücretsiz keşif görüşmesi al |
| en | Book a **free discovery** call |
| de | Kostenloses Erstgespräch buchen |
| es | Agenda una llamada de descubrimiento gratuita |
| ar | احجز مكالمة استكشافية مجانية |

Canlı TR yanıtı «Hemen "Book a call" butonunu kullanabilir…», AR yanıtı «زر "Book a call"» dedi — ziyaretçi tırnak içindeki adı sayfada arayacak ve bulamayacak. Etiket İngilizce olduğu için EN dışındaki dört dilde ayrıca dil sızıntısı yaratıyor (18.07'nin "tek dil / tek script" kuralıyla gerginlik). Metin faz penceresinde (`route.ts` SYSTEM_PROMPT bloğu yeniden yazıldı) ama içerik olarak Anthropic dönemi prompt'undan **değişmeden taşındı** — 18.07'nin marka mührü kapısı bu ekseni ölçmüyordu (dil · dürüstlük · taksonomi · garble ölçülmüştü).

**(2) DE hitap.** `messages/de.json` **%100 formal**: 20 `Sie` · 7 `Ihre` · 6 `Ihr` · 2 `Ihnen`, sıfır `du`/`dein`. Canlı DE yanıtı `deine`/`Du` kullandı. TR (siz), ES (tú), EN, AR hitapla tutarlı — sapan tek dil DE. Prompt hitap seviyesi hakkında hiçbir şey söylemiyor, model dili kendi varsayılanına bırakıyor.

**(3) README model ailesi.** `README.md:14` → *"groq-sdk — live streaming multilingual chatbot (**Llama 3.3 on Groq**)"*. Go-live'ın kimlik süpürmesi `.env.example`'ı, README env tablosunu (satır 31) ve OVERVIEW stack satırını `qwen/qwen3.8-27b`'ye çekti ama bu çağrı yerini atladı. `MASTER_PROMPT_v2.md`'deki Anthropic referansları **kapsam dışıdır** (TASK-18.05'te brief/hassas diye bilinçle bırakıldı) — bu task onlara dokunmaz.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` → **UAT Sonuçları** senaryo 19/28/29 + **Gözle Doğrulama** (18.07 harness tarifi, yeniden koşulabilir araç)
- `_dev/PRD/VIZYON.md` → marka sesi & dürüstlük konvansiyonu
- `_dev/ILKELER.md` → Marka & Craft üst eksen
- `messages/{tr,en,ar,de,es}.json` → gerçek CTA etiketleri ve hitap düzeyi (tek kaynak)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle
- `_dev/modules/M5-Chatbot-API.md` — F5.1 system prompt tarifi (CTA ifadesi + hitap kuralı)
- `_dev/docs/DECISIONS.md` — CTA'ya nasıl atıf yapılacağı kalıcı bir konvansiyon kararıysa

---

## Alt Görevler

- [ ] **1. CTA atfını locale-bağımsız hâle getir**
  - SYSTEM_PROMPT'taki `the "Book a call" button` ifadesini **tırnaklı sabit etiket olmaktan çıkar**; ziyaretçinin sayfasında gerçekten gördüğü şeye karşılık gelen betimleyici bir atıf yaz (ör. "the free discovery-call button on the page") ve modele **butonun adını tırnak içinde alıntılamamasını** söyle
  - E-posta CTA'sı (`kivanc@kiwiailab.com`) aynen kalır — o 5 dilde de doğru
  - Dosya: `src/app/api/chat/route.ts`

- [ ] **2. Hitap kuralı ekle**
  - Prompt'a tek cümlelik kural: her dilin sitedeki hitap düzeyini izle — **DE formal (`Sie`)**, TR nazik-formal (`siz`), ES samimi (`tú`)
  - 18.07'nin dil kuralı bloğunun yanına yaz; mevcut "tek dil / tek script" cümlesini bozma
  - Dosya: `src/app/api/chat/route.ts`

- [ ] **3. README model ailesi hizalama**
  - `README.md:14` → model ailesi adını kaldır (OVERVIEW'da alınan karar: model adı **yalnız tek bir yerde** tutulur → tekrar bayatlamaz). Satır yalnız sağlayıcıyı/SDK'yı ansın; model varsayılanı zaten satır 31'deki env tablosunda
  - Dosya: `README.md`

- [ ] **4. Marka mührü harness'ini yeniden koş**
  - TASK-18.07'nin serversiz node harness'i (route.ts'ten runtime çıkarılan prompt/model/temperature, test key `.env.keys.local`, garble dedektörü) — 5 dil
  - Yeni eksenler: yanıt tırnak içinde "Book a call" **anmıyor**; DE yanıtı `du`/`dein` **içermiyor**
  - Regresyon eksenleri (18.07'den): dil sadakati · dürüstlük · taksonomi · garble **bozulmadı**
  - Harness proje içine yazılır, koşturulur, **silinir**; test key hiçbir dosyaya/log'a/commit'e yazılmaz

---

## Etkilenen Dosyalar

```
src/app/api/chat/
└── route.ts    # SYSTEM_PROMPT: CTA atfı + hitap kuralı — zaten var
README.md       # satır 14 model ailesi — zaten var
```

---

## Dikkat Noktaları

- **Prompt'a cerrahi dokun.** 18.07'nin dil bloğu iki başarısız koşumdan sonra kazanılmış bir denge — yeniden yazma, yanına ekle. `temperature: 0.2` ve dürüstlük kuralı **değişmez**.
- **`max_tokens: 512` yükseltilmez.** Prompt uzarsa yanıt bütçesi daralmaz ama girdi token'ı artar; 512 OTPM zorunluluğudur, geri yükseltmek canlıyı kırar (`route.ts` içindeki gerekçe yorumu).
- **Prompt uzunluğu bedava değil.** İki yeni cümle her istekte gönderilir; kısa tut (ücretsiz tier 8.000 TPM).
- **Site etiketleri tek kaynak `messages/*.json`.** Prompt'a beş etiketi tek tek gömme — bayatlar (tam bu bulgunun kök nedeni). Betimleyici atıf tercih edilir.
- **Bu bir *değer* değişimi değil, prompt değişimi** — `messages/*.json`'a dokunulmuyor, i18n anahtar paritesi etkilenmiyor.
- **`kanal: UAT`** — CTA ve hitap eksenlerinin sonucunu belirleyen katman gerçek LLM çıktısıdır; `next build`/Vitest bunu ölçmez. Yerel kapı harness koşumudur, kanal teyidi verify-phase'e kalır.

---

## Test Kriterleri

- [ ] grep `src/app/api/chat/route.ts`: tırnaklı `"Book a call"` kalıbı **kalmadı**; betimleyici CTA atfı + hitap kuralı var
- [ ] grep `README.md`: `Llama` **kalmadı** (exit 1); satır 14 sağlayıcı/SDK'yı anıyor, model adı yalnız env tablosunda
- [ ] Marka mührü harness'i 5 dil × temsili sorular: hiçbir yanıt tırnak içinde bir buton adı **alıntılamıyor** — `kanal: UAT`
- [ ] Marka mührü harness'i: DE yanıtlarında `du`/`dein`/`deine` **yok**, `Sie`/`Ihr` var — `kanal: UAT`
- [ ] Regresyon: aynı koşumda dil sadakati 5/5 · garble 0 · `Bunker` 0 · uydurma rakam 0 (18.07 çıtası düşmedi) — `kanal: UAT`
- [ ] `next build` temiz (exit 0) + `npm run test` yeşil (prompt değişimi testleri kırmaz)

---

## Karar Noktaları

- **CTA'ya nasıl atıf yapılacak:** (A) betimleyici, locale-bağımsız ("the free discovery-call button on the page") — **önerilen**, bayatlamaz; (B) prompt'a beş locale etiketini gömme — bu bulgunun kök nedenini tekrar üretir, önerilmez. Kalıcı konvansiyon sayılırsa `DECISIONS.md`'ye yazılır.
- **Hitap kuralının kapsamı:** yalnız DE mi düzeltilsin, yoksa beş dil için de açık kural mı yazılsın → beş dil önerilir (aynı sınıfın diğer varyantlarını önden kapatır).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

<!-- run-task oturumunda doldurulacak -->

---

**Oluşturulma:** 2026-09-11 (verify-phase 18, Adım 7 — UAT senaryo 19 + 28 + 29)
