# TASK-18.12: Chatbot hata/zaman-aşımı metni ziyaretçinin dilinde aksın

**Durum:** ✅ Tamamlandı
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

- [x] **1. Ziyaretçinin dilini route'ta çöz**
  - Route şu an locale'i hiç bilmiyor. Kaynak seçilir (→ Karar Noktaları): `Referer` başlığındaki locale prefix'i, `NEXT_LOCALE` cookie'si, `Accept-Language`, ya da istemcinin gövdeye eklediği alan
  - Seçilen kaynak **yoksa veya tanınmayan bir değer taşıyorsa** TR'ye düş (mevcut varsayılan davranış korunur)
  - Dosya: `src/app/api/chat/route.ts`

- [x] **2. Hata metnini çeviriden oku**
  - Sabit `FALLBACK_MESSAGE` yerine çözülen locale'in kopyası kullanılır. Mevcut `chat.error` yeniden mi kullanılacak yoksa yeni anahtar mı açılacak → Karar Noktaları
  - Yeni anahtar açılırsa **5 dilin hepsine eşzamanlı eklenir** (eksik anahtar = runtime boşluk; i18n kuralı pazarlık dışı)
  - Hem `catch` dalı hem stream-ortası `if (timedOut)` dalı aynı çözümü kullanır — iki yerde iki ayrı metin bırakma
  - Dosya: `src/app/api/chat/route.ts`, gerekirse `messages/{tr,en,ar,de,es}.json`

- [x] **3. Davranışı testle mühürle**
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

- [x] 5 dilin her birinde üst-akış hatası → gövdeye **o dilin** metni akıyor (TR/EN/AR/DE/ES; `npm run test` ile yerelde ölçülür)
- [x] Locale kaynağı yok / tanınmayan değer → TR'ye düşüyor, hard-cut yok
- [x] Stream-ortası zaman aşımı → yarım mesaj korunuyor **ve** o dilin kapanış metni ekleniyor
- [x] Negatif kontrol: normal hızlı yanıt hiç fallback metni içermiyor, akış kesilmiyor
- [x] i18n paritesi korunuyor: yeni anahtar açıldıysa 5 dilde de var (`tests/i18n-parity.test.ts` yeşil)
- [x] Ürettiğim kapıyı sınadım: locale çözümü geçici olarak sabit TR'ye döndürülünce yeni testler **kırmızı** oluyor
- [x] `npm run test` yeşil (mevcut 69 test kırılmaz) + `next build` exit 0
- [ ] `kanal: UAT` — canlı `/api/chat`'te 5 dil hata yolu gerçek tarayıcıda doğrulanır; sonucu belirleyen katman canlı serving zinciri + gerçek tarayıcı yerleşimi, yerel stub değil

---

## Karar Noktaları

- **Locale kaynağı:** (a) `Referer` başlığındaki locale prefix'i — ziyaretçinin gerçekten baktığı sayfayı verir, UI'a dokunmaz, ama başlık proxy/gizlilik ayarıyla düşebilir. (b) `NEXT_LOCALE` cookie'si — next-intl'in kendi kaynağı, same-origin fetch'te gider, ama prefixsiz TR'de cookie hiç set edilmemiş olabilir. (c) `Accept-Language` — her zaman var ama **yanlış cevap verebilir**: `/de` sayfasındaki ziyaretçinin tarayıcı dili `tr-TR` olabilir (memory'de kayıtlı tuzak: Accept-Language ile locale ayrışır). (d) İstemci gövdeye `locale` alanı ekler — en kesin, ama `Chatbot.tsx` değişir ve sanitizer'ın "yalnız `{role,content}` geçer" daraltmasıyla kesişir. **Öneri: (a) + (b) birlikte, (c) hiç kullanılmasın.** Kullanıcıya sorulacak.
  → **Karar (kullanıcı, 2026-10-02 — "önerdiğin yoldan devam et"):** (a) + (b), sıra Referer → cookie → TR; (c) kullanılmadı, (d) seçilmedi (`Chatbot.tsx` dokunulmadı).
- **Metin kaynağı:** mevcut `chat.error` yeniden kullanılsın mı (yeni anahtar yok, 5 dil hazır, ama kopya uzun ve e-postalı) yoksa kısa bir kapanış anahtarı mı açılsın (5 dile eşzamanlı eklenir, craft daha iyi). Kullanıcıya sorulacak — kopya kalemi.
  → **Karar (duran yetkiyle, 2026-10-02):** mevcut `chat.error` yeniden kullanıldı, yeni anahtar açılmadı. Gerekçe → Oturum Kayıtları.

---

## Risk ve Geri Dönüş Planı

- **Risk — yanlış dil çözümü mevcut doğru davranışı bozar:** TR ziyaretçi bugün doğru metni görüyor; locale çözümü hatalıysa TR'de de yanlış dil akabilir → her kaynak için "yok/bozuk → TR" dalı testle mühürlenir.
- **Risk — gövdeye alan eklemek sanitizer daraltmasıyla çakışır:** (d) seçilirse `locale` alanı `messages` dizisinin içinde değil **kök gövdede** taşınmalı; mesaj nesnelerine alan eklemek TASK-18.09'un kapattığı yüzeyi yeniden açar.
- **Risk — sunucuda çeviri yükleme hata yolunu yavaşlatır:** zaman aşımı dalında ek gecikme bütçeyi (24 s) zorlamamalı; çözüm senkron/önbellekli tutulur.
- **Rollback:** değişiklik `route.ts` + muhtemelen `messages/*.json` ile sınırlı ve katkısal; `git revert` yeterli. Streaming sözleşmesi ve UI dokunulmadığı sürece ziyaretçi tarafı eski davranışa döner.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-10-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Alt görev 1:** `route.ts`'e `resolveVisitorLocale(headers)` eklendi. Sıra: Referer'ın ilk path segmenti locale ise o; değilse `NEXT_LOCALE` cookie'si; o da yoksa ya da tanınmayan değerse `routing.defaultLocale` (tr). Locale listesi `@/i18n/routing`'den okunuyor (tek kaynak).
- **Alt görev 2:** `FALLBACK_MESSAGE` sabiti kaldırıldı. Yerine `fallbackNote()` geldi: `messages/<locale>.json` → `chat.error`'ı yalnız hata anında dinamik import'la yüklüyor (`request.ts` ile aynı desen) ve parantez içine alıyor. İki hata dalı (`catch` + stream-ortası `if (timedOut)`) aynı `enqueueFallback()` yardımcısından geçiyor.
- **Craft düzeltmesi (Dikkat Noktası "iki bağlam"):** `\n\n` ayracı artık yalnız ziyaretçiye en az bir parça metin ulaştıysa ekleniyor (`streamed` bayrağı). Eskiden ilk token gelmeden düşen hatada balon iki boş satırla başlıyordu.
- **Alt görev 3:** `tests/chat-route-timeout.test.ts` genişletildi. Mevcut 5 testin TR beklentisi artık `messages/tr.json`'dan türetiliyor, sabit metin gömülü değil. Yeni bir describe bloğuna 17 test eklendi: kapsam guard'ı, 5 dil × 429, cookie kaynağı, Referer > cookie, origin'e kırpılmış Referer → cookie, 6 TR-düşüş varyantı, DE stream-ortası, EN negatif kontrol.

**Sorunlar:**
- **Sahte saat ↔ dinamik import:** İlk koşuda TASK-18.11'in ilk testi `elapsed = 35000` ile kırmızı oldu. Kök neden: `advanceTimersByTimeAsync` gerçek I/O'yu (soğuk modül önbelleğinde JSON yükleme) beklemiyor, sanal saat pencerenin sonuna atlıyor. Çözüm olarak test dosyasına `beforeAll` eklendi; 5 mesaj modülünü önceden yükleyip önbelleği ısıtıyor. Kod davranışı değişmedi. Bu bir harness artefaktı: ısıtma kapatıldığında (boş-kapsam sınamasında locale listesi boştu) aynı 35 s kırmızısı geri geldi, yani ısıtma yük taşıyor.
- **Hatalı ölçüm (kayıt için):** AR balonunda parantez yönünü piksel geometrisiyle ölçen ilk betik "( şekli" dedi. Büyütülmüş kesit ise doğru aynalamayı gösterdi: satır sonu `)`, e-posta satırının solu `(`. Betiğin kutusu yandaki elif (ا) harfinin dikey çizgisini de içine almıştı. Belirleyici kanıt büyütülmüş görüntü oldu.

**Kararlar:**
- **Locale kaynağı (kullanıcı kararı):** Referer prefix'i → `NEXT_LOCALE` cookie'si → TR. Accept-Language kullanılmadı. Gerekçe ölçümle güçlendi: gerçek tarayıcıda, dili tarayıcı diliyle eşleşen ziyaretçiye (EN/AR/ES) next-intl cookie set etmiyor (`syncCookie`: accept-language = sayfa locale'i ise yazmaz). Yani o ziyaretçilerde tek sinyal Referer; yalnız cookie seçilseydi 5 dilin 3'ü TR'ye düşerdi. Prefixsiz ya da origin'e kırpılmış Referer cookie'ye geçer. Prefixsiz `/` sayfasında cookie TR dışı olamaz, çünkü middleware o cookie ile `/xx`'e yönlendirir.
- **Metin kaynağı (duran yetkiyle):** mevcut `chat.error` yeniden kullanıldı, yeni anahtar açılmadı. Dört gerekçe var. (1) Aynı arıza sınıfı (üst-akış cevap vermedi) 504 ile de 200+fallback ile de ziyaretçiye aynı cümleyle ulaşıyor; TASK-18.11 öncesindeki deneyim dil ve içerik olarak geri geliyor. (2) Canlıda bu yolu en sık 429 kota tetikliyor ve günlük kota saatlerce dolu kalabilir. Bu durumda yalnız "tekrar deneyin" çıkışsızdır; e-posta CTA'sı ziyaretçiye işlevsel bir çıkış verir. (3) 5 dil kopyası UAT 4'te doğrulanmış, gerçek çeviri; yeni anahtar AR/DE/ES'de incelenmemiş metin doğururdu. (4) i18n parite riski sıfır. Dikkat Noktası'ndaki iki craft kaygısı biçimle çözüldü: not parantezli kalıyor (asistanın sesi değil, sistem notu), ayraç da yalnız yarım yanıtın ardına ekleniyor.
- **Çeviri okuma yöntemi:** next-intl `getTranslations` yerine doğrudan dinamik JSON import kullanıldı. `getTranslations` plugin alias'ına (`next-intl/config`) bağlı, Vitest'te çözülmüyor. Dinamik import `request.ts`'in kendi deseni, webpack her dili ayrı lazy chunk'a koyuyor ve normal akış bu maliyeti hiç ödemiyor.
- docs/DECISIONS.md'ye eklendi: **Evet** (2026-10-02 — ziyaretçi-görünür sunucu metninde locale çözümü konvansiyonu).

**Son Yaklaşım:** Task tamamlandı; devam yok.

**Sonraki Adım Detayı:** Yok. `kanal: UAT` kriteri `/devflow:verify-phase 18`'e kaldı: canlı `/api/chat`'te 5 dilde hata yolu gerçek tarayıcıda ölçülecek (senaryo 36 yeniden).

**Dosya Değişiklikleri:**
- `src/app/api/chat/route.ts` → `resolveVisitorLocale` + `fallbackNote` + `enqueueFallback`; `FALLBACK_MESSAGE` sabiti kalktı; `streamed` bayrağı ayracı koşullu yapıyor. Zaman sınırları, `maxRetries: 0`, `max_tokens: 512`, prompt ve streaming sözleşmesi değişmedi.
- `tests/chat-route-timeout.test.ts` → beklenen metin `messages/*.json`'dan türetiliyor; `chatRequest`/`run` header alıyor; `failingUpstream(429)`; önbellek ısıtma `beforeAll`'ı; 17 yeni test.
- `messages/*.json` ve `src/components/Chatbot.tsx` **değişmedi** (yeni anahtar yok, UI dokunulmadı).

**Test Sonuçları:**
- **Vitest tam suite:** 7 dosya / **86 test yeşil** (taban çapada `bef8248` 7 dosya / 69). `chat-route-timeout.test.ts` 5 → 22 test; `i18n-parity.test.ts` yeşil (anahtar eklenmedi).
- **`next build`:** exit 0, tip denetimi dahil. Derlenmiş `/api/chat` bundle'ı 43 KB ve mesaj metni içermiyor; 5 dil ayrı lazy chunk (16–20 KB). Beşi de `route.js.nft.json` ile fonksiyona izleniyor, yani Vercel'de dosya eksik kalmaz.
- **Kapı sınaması, bozuk girdi:** kaynağa dokunulmadı, yeni test dosyası geçici kopyalar üzerinde koşuldu (kopyalar silindi, `git status` yalnız iki hedef dosyayı gösteriyor).
  - (i) **Çapadaki gerçek kusurlu route** (`git show bef8248:…/route.ts`): **18 kırmızı / 4 yeşil**. Yeşil kalanlar 2 eski negatif kontrol, kapsam guard'ı ve yeni negatif kontrol.
  - (ii) **Locale çözümü sabit TR'ye çevrilmiş yeni route:** **8 kırmızı / 14 yeşil**. Kırmızılar EN/AR/DE/ES, cookie, Referer > cookie, kırpılmış Referer ve DE stream-ortası. Yeşil kalan kontrol grubu TR, 6 TR-düşüş varyantı, 18.11'in 5 testi ve negatif kontrol; iki ayak farklı şeyi ölçüyor.
  - (iii) **Ayraç koşulsuz eklenen yeni route:** **14 kırmızı / 8 yeşil**. İlk-token düşüşündeki tam eşleşmeler kırmızı; stream-ortası ve `toContain` kullanan eski testler yeşil.
- **Kapı sınaması, boş kapsam:** locale listesi boşken per-locale döngü 0 test üretiyor ama kapsam guard'ı **kırmızı**. Üst-akışa hiç gidilmediğinde (anahtar boş → 503) 22 testin **21'i kırmızı** (`fetchMock` çağrılmadı); sessiz PASS yok.
- **Yerel gerçek serving + gerçek tarayıcı** (`next start -p 3127`, sahte anahtar + `GROQ_BASE_URL=http://127.0.0.1:9`; bağlantı reddi gerçek `catch` yolunu tetikledi, harici çağrı yapılmadı):
  - curl: Referer `/de`, `/ar/crew-os`, cookie `es` ve kaynaksız istek doğru dilin notunu verdi, gövde boş satırla başlamadı.
  - System Chrome + Playwright, chatbot'a gerçek yazım, 5/5 doğru: tr-TR→`/`, en-US→`/en`, ar→`/ar`, **tr-TR tarayıcı→`/de`** (Accept-Language tuzağı), es-ES→`/es`. Tarayıcı same-origin fetch'te Referer'ı **tam path** ile gönderdi. EN/AR/ES'de `NEXT_LOCALE` cookie'si **yoktu**, dil yalnız Referer'dan geldi.
  - AR balonu `direction: rtl`; parantezler doğru aynalandı (büyütülmüş kesit), e-posta LTR gömülü. Offline `<p>` hiçbir dilde görünmedi (yanıt 200).
  - Sunucu kapatıldı; pozitif kontrol: 3127 dolu (PID 2832005) → boş.
- **Ölçülmeyen:** canlı serving zinciri (`kiwiailab.com`), gerçek Groq 429 ve stream-ortası zaman aşımının gerçek tarayıcıdaki görünümü. Bunlar `kanal: UAT` → verify-phase'de ölçülecek.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-10-02

**Ne Yapıldı:**
- Chatbot'un hata/zaman-aşımı notu artık ziyaretçinin baktığı sayfanın dilinde akıyor: Referer prefix'i → `NEXT_LOCALE` cookie'si → TR. Metin `chat.error`'dan, yalnız hata anında yükleniyor.
- Not boş balonda boş satırla başlamıyor; yarım yanıtın ardına boş satırla ekleniyor.
- Vitest 69 → 86; kapı üç bozuk girdi ve iki boş-kapsam varyantıyla sınandı; yerelde gerçek tarayıcıda 5/5.

**Öğrenilenler:**
- next-intl 4 `NEXT_LOCALE` cookie'sini yalnız tarayıcı dili sayfa locale'inden farklıysa yazıyor. Sunucu tarafında ziyaretçi dilini cookie'den okumak çoğu ziyaretçide boş döner; Referer zorunlu birincil kaynak.
- Sahte saatli testte dinamik import gerçek I/O'dur, sanal saat onu beklemez → zamanlama assert'i öncesinde modül önbelleği ısıtılmalı.

---

**Oluşturulma:** 2026-10-02 (verify-phase 18 3. koşumu, Adım 7 — UAT senaryo 36)
