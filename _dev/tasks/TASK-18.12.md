# TASK-18.12: Chatbot hata/zaman-aşımı metni ziyaretçinin dilinde aksın

**Durum:** ⬜ Bekliyor
**Modül:** M5 — Chatbot & API (`modules/M5-Chatbot-API.md`)
**Feature:** C1 (chatbot sağlayıcı geçişi + canlıya alma) — kabul kriteri 1'in "zarif offline korunur" ayağı
**Faz:** Phase 18 (`phases/PHASE-18.md`)
**Bağımlılıklar:** TASK-18.11 ✅ (üst-akış zaman aşımı), TASK-18.04 ✅ (`chat.error` 5 dil kopyası)

---

## Hedef

`route.ts`'in akıttığı `FALLBACK_MESSAGE` şu an sabit Türkçe. Üst-akış hata verdiğinde ya da zaman aşımına düştüğünde Almanca/İngilizce/Arapça/İspanyolca konuşan ziyaretçi balonda Türkçe bir cümle görüyor. Task, hata metni ziyaretçinin diline çözüldüğünde ve bu davranış 5 dilde testle mühürlendiğinde tamamlanmış sayılır.

---

## Bağlam

Verify-phase 18'in 3. koşumunda ölçüldü — **senaryo 36**:

- `route.ts`'teki `FALLBACK_MESSAGE` tek bir sabit TR cümle: `"\n\n(Asistan bir hataya takıldı. Lütfen tekrar deneyin.)"`. Hem `catch` dalında hem stream-ortası `if (timedOut)` dalında aynı metin akıyor.
- **Gerçek tarayıcıda doğrulandı:** canlı `/en` sayfasında İngilizce soran ziyaretçi balonda Türkçe cümleyi gördü. Probe üç sınıfı ayırt ediyor (504 → yerelleştirilmiş offline kopyası, 200+fallback → TR metin, 200+gerçek yanıt → yanıt), yani ölçüm kör değil.
- **Yol canlıda gerçekten tetikleniyor:** hızlı ardışık 20 canlı çağrının 5'i buraya düştü. Kök neden yerel gerçek-Groq probuyla ölçüldü: `429 RateLimitError`, Groq ücretsiz tier OTPM limiti 1000. Yani bu nadir bir kenar durum değil, kota baskısında olağan yol.
- **İroni:** `messages/*.json` içindeki `chat.error` kopyası 5 dilde hazır ve doğru (TASK-18.04'ün işi), ama bu yolda **hiç kullanılmıyor**. `Chatbot.tsx:38` `!res.ok` kapısı yalnız HTTP hatasında devreye giriyor; route 200 döndürdüğü için offline kopyası atlanıyor ve gövdedeki metin doğrudan balona ekleniyor.
- TASK-18.11 bu yolu **ana** degradasyon yolu yaptı: öncesinde asılı çağrı platformun 504'üne düşüyordu ve `!res.ok` yerelleştirilmiş kopyayı gösteriyordu. Bekleme süresi düzeldi, dil doğruluğu bozuldu.

Faz kapsamıyla ilişki: kabul kriteri 1 "streaming/sanitizasyon/**zarif offline** korunur" diyor. Ziyaretçinin anlamadığı bir dilde hata metni zarif değil. QUALITY §4 (Yerelleştirme & RTL — "yeni/değişen metin 5 dilde de güncellendi mi") ve §1 (Marka & Craft) eksenlerinde de kapsam-içi. `route.ts` faz penceresinin içinde.

Ayrıca memory'deki süreç disiplini bu sınıfı adıyla anıyor: **ziyaretçiye görünen metin i18n dışına gömülmez** (→ `_dev/memory/` Süreç Disiplinleri, TASK-18.10'un dersi). Sabit TR fallback tam bu ihlalin bir örneği.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` → **UAT Sonuçları** senaryo 32 + 36 (ölçüm ve kanıt notları)
- `_dev/modules/M5-Chatbot-API.md` → F5.1 edge case'leri + F5.2 kabul kriterleri (offline/hata kopyası sözleşmesi)
- `_dev/QUALITY.md` → §4 Yerelleştirme & RTL, §6 Hata Yönetimi & Degradasyon
- `_dev/modules/M4-i18n.md` → sunucu tarafında çeviri okuma deseni (next-intl)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle
- `_dev/modules/M5-Chatbot-API.md` — F5.1 hata metni sözleşmesi (dil çözümü nasıl yapılıyor)
- `_dev/docs/DECISIONS.md` — dil çözümü yöntemi kalıcı bir konvansiyonsa (aşağıdaki Karar Noktaları)

---

## Alt Görevler

- [ ] **1. Ziyaretçinin dilini route'ta çöz**
  - Route şu an locale'i hiç bilmiyor. Kaynak seçilir (→ Karar Noktaları): `Referer` başlığındaki locale prefix'i, `NEXT_LOCALE` cookie'si, `Accept-Language`, ya da istemcinin gövdeye eklediği alan
  - Seçilen kaynak **yoksa veya tanınmayan bir değer taşıyorsa** TR'ye düş (mevcut varsayılan davranış korunur)
  - Dosya: `src/app/api/chat/route.ts`

- [ ] **2. Hata metnini çeviriden oku**
  - Sabit `FALLBACK_MESSAGE` yerine çözülen locale'in kopyası kullanılır. Mevcut `chat.error` yeniden mi kullanılacak yoksa yeni anahtar mı açılacak → Karar Noktaları
  - Yeni anahtar açılırsa **5 dilin hepsine eşzamanlı eklenir** (eksik anahtar = runtime boşluk; i18n kuralı pazarlık dışı)
  - Hem `catch` dalı hem stream-ortası `if (timedOut)` dalı aynı çözümü kullanır — iki yerde iki ayrı metin bırakma
  - Dosya: `src/app/api/chat/route.ts`, gerekirse `messages/{tr,en,ar,de,es}.json`

- [ ] **3. Davranışı testle mühürle**
  - 5 dilin her birinde: üst-akış hata verince gövdeye **o dilin** metni akıyor
  - Locale kaynağı yok/bozukken TR'ye düşüyor
  - Stream-ortası zaman aşımında da aynı dil çözümü uygulanıyor (yarım mesaj + o dilin kapanış metni)
  - Dosya: `tests/chat-route-timeout.test.ts` (mevcut harness genişletilir) ya da yeni dosya

---

## Etkilenen Dosyalar

```
src/app/api/chat/
└── route.ts                    # locale çözümü + çeviriden okunan hata metni — zaten var
messages/
├── tr.json · en.json · ar.json · de.json · es.json   # yalnız yeni anahtar açılırsa — zaten var
tests/
└── chat-route-timeout.test.ts  # 5-dil hata metni testleri eklenir — zaten var
```

`src/components/Chatbot.tsx` **değişmez** (karar: UI dokunulmaz) — **istisna:** Karar Noktaları'nda (d) seçilirse gövdeye tek alan eklenir; o hâlde streaming sözleşmesinin (`text/plain`, `no-store`, parçalı akış) bozulmadığı ayrıca doğrulanır.
`src/lib/chat-sanitize.ts` **değişmez** — girdi sözleşmesi bu task'ın konusu değil.

---

## Dikkat Noktaları

- **`chat.error` uzun bir kopya ve e-posta içeriyor.** Balona akan metin olarak uygun mu, yoksa daha kısa bir kapanış cümlesi mi gerekir — ziyaretçi zaten yarım bir yanıt görmüş olabilir. Kopya seçimi craft kalemi, gözle değerlendir.
- **Stream-ortası hâl farklı okunur.** İlk token gelmeden hata olursa balonda yalnız hata metni olur; akış ortasında olursa yarım cümlenin ardına eklenir. Aynı metin iki bağlamda da doğru okunuyor mu, kontrol et.
- **AR için RTL.** Arapça metin balonda doğru yönde akmalı; `chat.error` AR kopyası RTL-native yazılmış (e-posta LTR gömülü) — yeni bir metin yazılırsa aynı disiplin korunur.
- **`maxRetries: 0` ve üç zaman sınırı değişmez.** TASK-18.11'in ölçümle seçilmiş değerleri (20 s / 5 s / 24 s) ve retry kararı bu task'ın konusu değil, dokunma.
- **`max_tokens: 512` yükseltilmez** (OTPM zorunluluğu, 18.08).
- **Kota sorunu bu task'ta çözülmez.** Metnin dili düzelir, ama kota baskısında hata yolunun sık tetiklenmesi ayrı bir kalem (senaryo 23 hız sınırı / v0.6 kota stratejisi). Karıştırma.
- **Sunucuda çeviri okuma maliyeti.** next-intl'in server API'si locale başına mesaj dosyasını yükler; hata yolunda bu maliyet kabul edilebilir ama normal akışı yavaşlatmamalı (yalnız hata anında çözülsün, her istekte değil).

---

## Test Kriterleri

- [ ] 5 dilin her birinde üst-akış hatası → gövdeye **o dilin** metni akıyor (TR/EN/AR/DE/ES; `npm run test` ile yerelde ölçülür)
- [ ] Locale kaynağı yok / tanınmayan değer → TR'ye düşüyor, hard-cut yok
- [ ] Stream-ortası zaman aşımı → yarım mesaj korunuyor **ve** o dilin kapanış metni ekleniyor
- [ ] Negatif kontrol: normal hızlı yanıt hiç fallback metni içermiyor, akış kesilmiyor
- [ ] i18n paritesi korunuyor: yeni anahtar açıldıysa 5 dilde de var (`tests/i18n-parity.test.ts` yeşil)
- [ ] Ürettiğim kapıyı sınadım: locale çözümü geçici olarak sabit TR'ye döndürülünce yeni testler **kırmızı** oluyor
- [ ] `npm run test` yeşil (mevcut 69 test kırılmaz) + `next build` exit 0
- [ ] `kanal: UAT` — canlı `/api/chat`'te 5 dil hata yolu gerçek tarayıcıda doğrulanır; sonucu belirleyen katman canlı serving zinciri + gerçek tarayıcı yerleşimi, yerel stub değil

---

## Karar Noktaları

- **Locale kaynağı:** (a) `Referer` başlığındaki locale prefix'i — ziyaretçinin gerçekten baktığı sayfayı verir, UI'a dokunmaz, ama başlık proxy/gizlilik ayarıyla düşebilir. (b) `NEXT_LOCALE` cookie'si — next-intl'in kendi kaynağı, same-origin fetch'te gider, ama prefixsiz TR'de cookie hiç set edilmemiş olabilir. (c) `Accept-Language` — her zaman var ama **yanlış cevap verebilir**: `/de` sayfasındaki ziyaretçinin tarayıcı dili `tr-TR` olabilir (memory'de kayıtlı tuzak: Accept-Language ile locale ayrışır). (d) İstemci gövdeye `locale` alanı ekler — en kesin, ama `Chatbot.tsx` değişir ve sanitizer'ın "yalnız `{role,content}` geçer" daraltmasıyla kesişir. **Öneri: (a) + (b) birlikte, (c) hiç kullanılmasın.** Kullanıcıya sorulacak.
- **Metin kaynağı:** mevcut `chat.error` yeniden kullanılsın mı (yeni anahtar yok, 5 dil hazır, ama kopya uzun ve e-postalı) yoksa kısa bir kapanış anahtarı mı açılsın (5 dile eşzamanlı eklenir, craft daha iyi). Kullanıcıya sorulacak — kopya kalemi.

---

## Risk ve Geri Dönüş Planı

- **Risk — yanlış dil çözümü mevcut doğru davranışı bozar:** TR ziyaretçi bugün doğru metni görüyor; locale çözümü hatalıysa TR'de de yanlış dil akabilir → her kaynak için "yok/bozuk → TR" dalı testle mühürlenir.
- **Risk — gövdeye alan eklemek sanitizer daraltmasıyla çakışır:** (d) seçilirse `locale` alanı `messages` dizisinin içinde değil **kök gövdede** taşınmalı; mesaj nesnelerine alan eklemek TASK-18.09'un kapattığı yüzeyi yeniden açar.
- **Risk — sunucuda çeviri yükleme hata yolunu yavaşlatır:** zaman aşımı dalında ek gecikme bütçeyi (24 s) zorlamamalı; çözüm senkron/önbellekli tutulur.
- **Rollback:** değişiklik `route.ts` + muhtemelen `messages/*.json` ile sınırlı ve katkısal; `git revert` yeterli. Streaming sözleşmesi ve UI dokunulmadığı sürece ziyaretçi tarafı eski davranışa döner.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(henüz oturum yok)_

---

**Oluşturulma:** 2026-10-02 (verify-phase 18 3. koşumu, Adım 7 — UAT senaryo 36)
