# TASK-18.11: Üst-akış zaman aşımı — asılı Groq çağrısı ziyaretçiyi 30 s bekletmesin

**Durum:** ⬜ Bekliyor
**Modül:** M5 — Chatbot & API (`modules/M5-Chatbot-API.md`)
**Feature:** C1 (chatbot sağlayıcı geçişi + canlıya alma) — kabul kriteri 1'in "zarif offline korunur" ayağı
**Faz:** Phase 18 (`phases/PHASE-18.md`)
**Bağımlılıklar:** TASK-18.08 ✅ (go-live), TASK-18.09 ✅, TASK-18.10 ✅

---

## Hedef

`route.ts`'teki Groq çağrısına, platformun `maxDuration = 30` tavanının **altında** bir üst-akış zaman aşımı (abort) koymak: sağlayıcı asılı kaldığında ziyaretçi 30 saniye boş beklemek yerine birkaç saniye içinde mevcut zarif fallback'e düşsün. Task, zaman aşımı eklendiğinde, hem **stream başlamadan önceki** hem **stream ortasında** asılma hâlinde ziyaretçinin zarif metni gördüğü ölçüldüğünde ve davranış testle mühürlendiğinde tamamlanmış sayılır.

---

## Bağlam

Verify-phase 18'in yeniden koşumunda (2026-09-12) canlı ölçüldü — senaryo 33:

- **47 canlı `/api/chat` çağrısının 2'si ~30,5 saniyede 504** döndü (`FUNCTION_INVOCATION_TIMEOUT`). İki farklı soru (EN "gym" + TR fiyat probu), farklı zamanlarda — girdiye değil, sağlayıcının o anki durumuna bağlı. Aynı sorular hemen ardından 5/5 ve 20/20 temiz koştu, yani kod-yolu bozuk değil.
- **Kök neden:** `client.chat.completions.create(...)` çağrısında `AbortSignal`/timeout **yok**. Groq yanıt vermezse tek kapı platformun `maxDuration = 30`'udur; fonksiyon o sınırda öldürülür ve `route.ts`'in `catch` bloğu **hiç çalışmaz** — yani kendi TR fallback metnini enqueue edemez.
- **Ziyaretçiye ne oluyor:** panel 30 saniye "Düşünüyor" gösteriyor, sonra offline kopyasına düşüyor. Ham platform hatası **sızmıyor** (senaryo 32 gerçek tarayıcıda doğruladı: `Chatbot.tsx:37` `!res.ok` → `setOffline(true)`), yani dürüstlük sorunu yok — sorun 30 saniyelik ölü bekleme. Marka & Craft üst ekseninde bu, sitenin canlı demosunda en görünür kusur sınıfıdır.
- **Yan gözlem (aynı ölçümden):** sürekli kullanımda gecikme tırmanıyor — 20 ardışık çağrıda ilk 11'i <1 s, son 9'u 2,6–8,6 s (p90 7,5 s). Ücretsiz tier davranışı; zaman aşımı değerini seçerken bu kuyruk hesaba katılmalı, aksi halde meşru ama yavaş yanıtlar kesilir.

Faz kapsamıyla ilişki: discuss-phase'in hardening kararı per-mesaj byte cap'ti, zaman aşımı o listede yoktu. Ama kabul kriteri 1 **"streaming/sanitizasyon/zarif offline korunur"** diyor ve go-live milestone'u "chatbot canlıda çalışıyor" — 30 saniyelik ölü bekleme bu iki kalemin kesiştiği yerde duruyor, `route.ts` de faz penceresinin içinde. Bu yüzden kapsam-dışı sayılmadı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` → **UAT Sonuçları** senaryo 32 + 33 (ölçüm ve kanıt notları) + **Go-live** (kota gerçekliği, `max_tokens` gerekçesi)
- `_dev/modules/M5-Chatbot-API.md` → F5.1 edge case'leri (zarif degradasyon sözleşmesi)
- `_dev/QUALITY.md` → §6 Hata Yönetimi & Degradasyon, §1 Marka & Craft

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle
- `_dev/modules/M5-Chatbot-API.md` — F5.1 edge case + kabul kriteri: üst-akış zaman aşımı sözleşmesi
- `_dev/docs/DECISIONS.md` — seçilen zaman aşımı değeri ve gerekçesi kalıcı bir konvansiyonsa

---

## Alt Görevler

- [ ] **1. Üst-akış zaman aşımı ekle**
  - `client.chat.completions.create(...)` çağrısına iptal sinyali ver (`groq-sdk` istek seçeneklerinde `signal` / `timeout` desteği önce doğrulanır — SDK'nın kendi seçeneği varsa o tercih edilir, yoksa `AbortSignal.timeout(...)`)
  - Değer `maxDuration = 30`'un **altında** kalmalı; ölçülen p90 (7,5 s) ile 30 s tavanı arasında bir pay bırakılır
  - Dosya: `src/app/api/chat/route.ts`

- [ ] **2. Stream-ortası asılmayı da kapat**
  - İlk token geldikten sonra akış durursa `!res.ok` kapısı devrede **değildir** (başlıklar gönderilmiştir) → ziyaretçi yarım mesajla kalır. Parçalar arası sessizlik için de bir üst sınır gerekir (chunk'lar arası zamanlayıcı ya da tüm okuma döngüsü için tek sinyal)
  - Zaman aşımında mevcut TR fallback metni **enqueue edilir** (hard-cut yok — kriter 1)
  - Dosya: `src/app/api/chat/route.ts`

- [ ] **3. Davranışı testle mühürle**
  - Asılı/yavaş sağlayıcı taklidi ile: zaman aşımı sınırında yanıtın 200 + fallback metniyle kapandığını, `maxDuration`'a hiç dayanmadığını sınayan test
  - Dosya: `tests/` (uygun katman seçilir — route seviyesinde `fetch` stub'ı yeterli, LLM gerekmez)

---

## Etkilenen Dosyalar

```
src/app/api/chat/
└── route.ts              # üst-akış zaman aşımı + stream-ortası sessizlik sınırı — zaten var
tests/
└── [uygun test dosyası]  # asılı sağlayıcı senaryosu — YENİ ya da mevcut dosyaya eklenir
```

`src/lib/chat-sanitize.ts` ve `src/components/Chatbot.tsx` **değişmez** — girdi sözleşmesi ve UI dokunulmaz (discuss-phase kararı).

---

## Dikkat Noktaları

- **`max_tokens: 512` yükseltilmez.** OTPM kotası zorunluluğudur (18.08); yükseltmek canlıyı kırar — `route.ts` içindeki gerekçe yorumu yerinde kalır.
- **Meşru yavaş yanıtı kesme.** Ücretsiz tier'da gecikme sürekli kullanımda tırmanıyor (p90 7,5 s ölçüldü). Sınır bu kuyruğun üstünde seçilmeli; aksi halde çalışan yanıtlar fallback'e çevrilir ve kusur daha görünür hâle gelir. Değeri seçmeden önce ölçümü tekrarla — kota ve yük güne göre değişir.
- **Fallback metni zaten var, yenisini yazma.** `route.ts`'in `catch` bloğundaki TR metni kullanılır; ziyaretçi tarafındaki offline kopyası `messages/*.json`'dadır ve i18n dışına metin gömülmez (memory → Süreç Disiplinleri).
- **Zaman aşımı bir kota çözümü değildir.** Hız sınırı / origin kontrolü ayrı ve kapsam-dışı bir kalemdir (senaryo 23, v0.6 adayı) — bu task onu kapatmaz, karıştırma.
- **Ölçüm katmanı.** Zaman aşımının gerçekten kaç saniyede tetiklendiği yerelde stub'la ölçülür; **canlı serving zincirindeki** davranış (Vercel fonksiyon sınırı ile etkileşim) yerel koşucunun dışındadır.

---

## Test Kriterleri

- [ ] Asılı sağlayıcı taklidi: istek **zaman aşımı sınırında** kapanıyor, `maxDuration`'a (30 s) hiç dayanmıyor — ölçülen süre loglanır
- [ ] Asılı sağlayıcıda yanıt **200 + TR fallback metni** (hard-cut yok, 504 yok) — kriter 1'in "zarif offline" ayağı
- [ ] Stream-ortası sessizlik: ilk token geldikten sonra akış durursa yanıt fallback metniyle **kapanıyor**, yarım mesajda asılı kalmıyor
- [ ] Negatif kontrol: normal hızlı yanıt (ve ölçülen p90 civarındaki yavaş yanıt) **kesilmiyor** — meşru trafik etkilenmiyor
- [ ] Ürettiğim kapıyı sınadım: zaman aşımı kodu geçici olarak devre dışı bırakılınca yeni test **kırmızı** oluyor
- [ ] `npm run test` yeşil (mevcut 64 test kırılmaz) + `next build` exit 0
- [ ] `kanal: UAT` — canlı `/api/chat`'te 504 oranı yeniden ölçülür (en az ~30 çağrı); sonucu belirleyen katman canlı serving zinciridir, yerel stub değil

---

## Karar Noktaları

- **Zaman aşımı değeri:** (A) ~12–15 s — ölçülen p90'ın (7,5 s) üstünde, 30 s tavanının çok altında, **önerilen**; (B) ~20 s — daha muhafazakâr, ama ziyaretçinin beklemesi hâlâ uzun. Değer ölçümle seçilir, tahminle değil (18.09'un `MAX_TOTAL_BYTES` deseni).
- **Tek sinyal mi iki sınır mı:** tüm çağrı için tek `AbortSignal` (basit) vs. çağrı + chunk'lar arası ayrı sınır (stream-ortası asılmayı da kapatır). İkincisi alt görev 2'nin gerektirdiği kapsamdır; tek sinyal yetiyorsa gerekçesi yazılır.

---

## Risk ve Geri Dönüş Planı

- **Risk — meşru yavaş yanıt kesilir:** sınır fazla dar seçilirse ücretsiz tier'ın normal yavaş anları fallback'e çevrilir; kusur azalmaz, yer değiştirir → değeri seçmeden önce canlı gecikme dağılımını yeniden ölç, p90'ın üstünde kal.
- **Risk — iptal sinyali akışı yarıda keser:** abort, başlamış bir stream'i de iptal edebilir; fallback enqueue'su `finally`/`catch` sırasıyla çakışmamalı (controller kapandıktan sonra enqueue hata verir).
- **Rollback:** Değişiklik tek dosyada ve katkısal; `git revert` yeterli. Streaming sözleşmesi (`text/plain`, `no-store`) ve UI dokunulmadığı için ziyaretçi tarafı eski davranışa döner.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [⬜ Bekliyor]

---

**Oluşturulma:** 2026-09-12 (verify-phase 18 yeniden koşumu, Adım 7 — UAT senaryo 33)
