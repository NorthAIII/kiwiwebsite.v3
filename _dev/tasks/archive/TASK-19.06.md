# TASK-19.06: WAF hız sınırını canlıya al (merge sonrası; önce `log`, sonra 429) + patlama + sınırdaki ziyaretçi + drift

**Durum:** ✅ Tamamlandı (2026-10-03) — WAF `chat-rate-limit` canlıda (`log` 18:46Z → 429 18:48Z), 429 temiz pencerede 7. istekte, sınırdaki ziyaretçi TR/EN offline kopyasını görüyor, drift 0.
**Modül:** M5-Chatbot-API (+M6-SEO-Deploy) (modules/M5-Chatbot-API.md, modules/M6-SEO-Deploy.md)
**Feature:** TB-G2 — `/api/chat` kota koruması (hız sınırı katmanı; milestone'un hız sınırı maddeleri)
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** TASK-19.04 ✅ (spec + drift script'i), TASK-19.05 ✅ (probe), TASK-19.07 ✅ (kod katmanı `main`'de canlı — plan revizyonu 2026-10-03)

---

## Hedef

Kod katmanı (TB-G1 lock'u + origin kapısı) canlıdayken `ops/firewall/chat-rate-limit.json`'daki kuralı Vercel WAF'ta canlıya al. Vercel'in kademeli yayın pratiğiyle iki adımda yapılır. Önce aşım aksiyonu `log` olarak yayınlanır ve eşleşme görülür. Sonra spec'in kendisi (aşımda 429) yayınlanır. Her `publish`'i **kullanıcı** koşar. Task şu koşullarda biter: canlıda patlama 429 alıyor (kaçıncı istekte geldiği kayıtlı), 429 altındaki ziyaretçi chatbot'ta kendi dilinin offline kopyasını görüyor, `node ops/firewall/drift.mjs` çıkış 0 veriyor, M5/M6 hız sınırını anlatıyor. Fazın son task'ıdır; milestone'un hız sınırı maddeleri burada kapanır.

---

## Bağlam

WAF kuralı **deploy'dan bağımsızdır.** Proje firewall'ında yaşar, publish anında canlıdır.

**Plan revizyonu (2026-10-03).** İlk oturumda (2026-10-02) spec stage edildi ve sunucu kabul etti. Kullanıcı publish'ten vazgeçti ve taslak discard edildi (→ Oturum Kayıtları). Vazgeçmenin gerekçesini kullanıcı belirtmedi, 2026-10-03'te bu kararı Claude'a bıraktı. Revizyonun yönü ise kullanıcı kararıdır: önce merge, WAF sonra. Bu sıranın gerekçesi Claude'undur:

- TB-G1'in kritik açık yaması ve origin kapısı WAF'tan bağımsız olarak hazır. WAF publish kararı onları, yani canlıdaki kritik açığın kapanmasını bekletmemeli.
- TASK-19.07'nin canlı ölçümü WAF yokken pencere bütçesine takılmaz. Probe istekleri sayaca yazmaz, ~30 dk bekleme ve kendi IP'ni kilitleme riski o task'tan düşer.
- 429 bu task'ta kodun son hâli canlıdayken ölçülür. Patlama istekleri gerçek origin kapısından geçip 400'e düşer, yani ölçülen zincir fazın son hâlidir.

İki değişikliğin ayrı ölçülmesi korunur, yalnız sıra tersine döndü. Discuss'un "fazın son task'ı merge + canlı doğrulama" sırası bu ölçüde değişti: merge 19.07'de kalır, son task bu task'tır. Hız sınırı kararının mekanizması ve değeri (DECISIONS 2026-10-02) değişmedi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-19.md` → Araştırma Bulguları → Uygulama tuzakları (publish, kendi IP'n, sayaçlar bölge başına, Hobby kural bütçesi, OTPM bilinçli kalıntısı)
- `_dev/docs/DECISIONS.md` → 2026-10-02 "`/api/chat` kota koruması" kararı
- Bu dokümanın Oturum Kayıtları — ilk oturumun ölçümleri, CLI'ın kazara publish kapısı ve `--rate-limit-*` tuzağı
- `ops/firewall/drift.mjs` + `ops/probe-chat-guard.mjs` başlık yorumları — kullanım ve pencere bütçesi
- `_dev/tasks/archive/TASK-19.03.md` — gerçek tarayıcı harness'i (chatbot'a mesaj, akışın bittiğini submit düğmesinden oku)
- `_dev/memory/canli-dogrulama-kanit-artefakti.md` — canlı iddiayı kanıt artefaktına bağla
- `_dev/memory/tarayici-accept-language-locale-yonlendirmesi.md` · `_dev/memory/host-uat-arac-envanteri.md` — TR ölçümde `NEXT_LOCALE=tr` cookie'si; host'ta system Chrome

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/modules/M5-Chatbot-API.md` — "Hız sınırı **yok**" edge case satırı + F5.1 origin paragrafının "o yolun kapısı WAF hız sınırıdır" cümlesi canlı duruma göre + kabul kriteri ("tek IP 10 dk'da 7. istekte 429 → offline kopyası")
- `_dev/modules/M6-SEO-Deploy.md` — F6.4'e firewall kuralı: spec konumu, CLI ile uygulama, publish kullanıcıda, drift kontrolü
- `_dev/DURUM.md` — task durumu ve özet; fazın bütün task'ları tamam → sıradaki `/devflow:verify-phase 19`
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum

---

## Alt Görevler

- [x] **1. Ön koşullar**
  - TASK-19.07 ✅: kod katmanı `main`'de canlı. Bu task `main` üzerinde koşar.
  - Firewall'ın başlangıç hâli: `vercel firewall overview` → `Not configured` · `vercel firewall diff --json` → `{"changes": []}` · `node ops/firewall/drift.mjs` → çıkış 2 (kural yok). Değilse **dur**, kullanıcıya getir.
  - **Firewall'a yazan her komut** `--yes --non-interactive </dev/null` ile koşulur. CLI 59.26.0'da "Publish to production now?" sorusu yalnız `--yes` yokken, stdin TTY iken ve önceden taslak yokken açılır (ilk oturum, `offerAutoPublish`). Bu üç ek soruyu kapatır.

- [x] **2. `log` modunda stage → kullanıcı publish**
  - `vercel firewall rules add --json "$(cat ops/firewall/chat-rate-limit.json)" --yes --non-interactive </dev/null` → `node ops/firewall/drift.mjs` → çıkış 0 + DRAFT uyarısı.
  - Log varyantını scratchpad'e türet; spec'ten yalnız `action.mitigate.rateLimit.action` değişir: `node -e 'const s=require("./ops/firewall/chat-rate-limit.json");s.action.mitigate.rateLimit.action="log";process.stdout.write(JSON.stringify(s))' > <scratch>/log.json`
  - `vercel firewall rules edit chat-rate-limit --json "$(cat <scratch>/log.json)" --yes --non-interactive </dev/null` → `drift.mjs` → çıkış 1, tek fark satırı `action.mitigate.rateLimit.action: spec="rate_limit" · vercel="log"`.
  - **`rules edit … --rate-limit-action log` kullanma:** CLI 59.26.0'da `--rate-limit-*` bayrakları `--action` olmadan sessizce yok sayılır ("No changes detected", çıkış 0; ilk oturum).
  - `vercel firewall diff`'i kullanıcıya göster. **Kullanıcı** `vercel firewall publish --yes` koşar. Claude publish komutunu çalıştırmaz.
  - Publish sonrası: `diff --json` → boş · `drift.mjs` → çıkış 1, aynı tek satır, DRAFT uyarısı yok (karşılaştırılan canlı `log` kuralıdır).
  - Kullanıcı yine publish etmezse: diff'te yalnız bu task'ın değişikliklerini gör → `vercel firewall discard --yes --non-interactive </dev/null` → `Not configured` teyidi. Task 🔴, bu kez vazgeçmenin gerekçesini sor ve kaydet.

- [x] **3. Eşleşmeyi gör (bloklamadan)**
  - `node ops/probe-chat-guard.mjs --base https://kiwiailab.com --burst-only` → `log` modunda 429 gelmez, 13 istek 400 döner (kendi Origin origin kapısından geçer, geçersiz gövde sanitize'da durur). Script "sınır gözlenmedi" der ve çıkış 1 verir; bu adımda beklenen budur.
  - Origin senaryoları bu task'ta koşulmaz: TASK-19.07 canlıda ölçtü, burada yalnız pencere bütçesini yerler.
  - Kuralın 7. istekten itibaren eşleşip logladığını Vercel tarafında gör: `vercel firewall overview` / `vercel firewall traffic` (kuralın eşleşme sayısı). Eşleşme görünmüyorsa **dur**: koşul yanlış olabilir (path/method), 429'a geçme.

- [x] **4. Spec'in kendisini stage et → kullanıcı publish**
  - `vercel firewall rules edit chat-rate-limit --json "$(cat ops/firewall/chat-rate-limit.json)" --yes --non-interactive </dev/null` → `drift.mjs` → çıkış 0 + DRAFT uyarısı → `vercel firewall diff` (yalnız `log` → `rate_limit`). Kullanıcı publish eder.
  - Publish sonrası: `diff --json` → boş · `drift.mjs` → **çıkış 0**, DRAFT uyarısı yok.

- [x] **5. Patlama → 429**
  - Son probe isteğinden sonra **en az 10 dk bekle**. Sabit pencere; hiza bilinmiyor, beklemek temiz pencereyi garanti eder.
  - `node ops/probe-chat-guard.mjs --base https://kiwiailab.com --burst-only` → yalnız patlama (kendi Origin + geçersiz gövde). 429'un kaçıncı istekte geldiğini kaydet; temiz pencerede beklenen 7.
  - Kanıt artefaktı: probe çıktısı (zaman damgalı) + `drift.mjs` çıkış 0 + `vercel firewall overview` özeti.

- [x] **6. Sınırdaki ziyaretçi deneyimi** (5. adımın hemen ardından, IP hâlâ 429'dayken)
  - Gerçek Chrome'da `https://kiwiailab.com/` (TR, `NEXT_LOCALE=tr` cookie'si) ve `https://kiwiailab.com/en` → chatbot'a birer mesaj.
  - İkisinde de o dilin offline kopyası (`chat.error`) görünüyor, UI takılı kalmıyor. İstek edge'de 429 alır ve fonksiyona ulaşmaz, Groq kotası harcanmaz.
  - DOM metni ya da ekran görüntüsü kanıt artefaktına girer. Milestone'un "sınıra takılan ziyaretçi offline kopyasını görüyor" maddesinin tek gözlemi budur.
  - Mesaj yanıt alırsa (429 gelmediyse) pencere bitmiştir: sonuç "ölçülemedi"dir, başarısız değil. Yeni bir temiz pencere bekle, 5. ve 6. adımı birlikte tekrarla. Yanıt alan mesaj 1 Groq çağrısıdır, kayda geç.

- [x] **7. Dokümanlar**
  - M5: edge case satırının hız sınırı yarısı "var" + kabul kriteri. Bilinçli kalıntıları da bir cümleyle yaz: sayaç bölge başına; pencere başındaki 6'lık patlama dakikalık OTPM'i periyodik doyurabilir.
  - M6 F6.4: firewall kuralı satırı.
  - DURUM: fazın bütün task'ları tamam → sıradaki `/devflow:verify-phase 19`.
  - DECISIONS: yalnız ölçüm karardan saparsa (ör. 429 başka istekte geldi ve bir değer değişikliği gerekti), kullanıcı kararıyla.
  - Doküman commit'i doğrudan `main`'e gider (yalnız `_dev/`; TASK-19.07'nin doküman commit'i emsali).

---

## Etkilenen Dosyalar

Kod **değişmez.** Değişen: Vercel proje firewall'ı (kullanıcının publish'iyle) + dokümanlar.

```
_dev/modules/M5-Chatbot-API.md        # hız sınırı edge case + kabul kriteri — zaten var
_dev/modules/M6-SEO-Deploy.md         # F6.4 firewall kuralı — zaten var
```

---

## Dikkat Noktaları

- **Publish'i kullanıcı koşar** (research kararı). Claude yalnız stage eder ve `diff`'i gösterir. Publish canlıya anında dokunur.
- **Gerçek ziyaretçiler de 6/10 dk sınırına girer.** Bu, kararın amaçlanan son durumudur (7. mesaj → offline kopyası, ≤10 dk bekleme). `log` aşaması ziyaretçiyi etkilemez.
- **Kendi IP'n sayılır.** Bir pencerede ≤6 istek; patlama en son. Patlamadan sonra IP'n ≤10 dk 429'dadır: 6. adımın gözlemi bilinçli olarak bu süreyi kullanır.
- **Hobby'de persistent action (`--duration`) yok.** Spec'e ekleme.
- **Bilinçli kalıntılar** (DECISIONS 2026-10-02): sayaçlar bölge başına (fonksiyon bölgesi tek, `iad1`); OTPM periyodik doyabilir; dağıtık kötüye kullanım kapsam dışı. Bunlar bu task'ın bulgusu değil, kabul edilmiş sınırlardır.
- **Canlı chatbot'a 429 penceresi dışında gerçek mesaj gönderme** (Groq kotası). 3–5. adımların ölçümü yalnız 400 gövdeleriyledir. 6. adımın iki mesajı edge'de 429 alır, Groq'a ulaşmaz.
- **Streaming yanıtta Playwright `response.finished()` dönmeyebilir** (MEMORY host envanteri). Offline kopyasını DOM'dan oku.

---

## Test Kriterleri

- [x] `log` aşaması: Vercel tarafında kuralın eşleşmesi görüldü (overview/traffic), ziyaretçi bloklanmadı (13 istek 400) — `kanal: UAT`.
- [x] Canlı patlama: temiz pencerede 429 geldi, kaçıncı istekte olduğu kayıtlı (beklenen 7) — `kanal: UAT` (WAF yalnız Vercel serving zincirinde).
- [x] Canlı sınırdaki ziyaretçi: 429 altında `/` ve `/en`'de chatbot o dilin offline kopyasını gösteriyor, UI takılı kalmıyor — `kanal: UAT`.
- [x] `node ops/firewall/drift.mjs` → çıkış 0, draft uyarısı yok (karşılaştırılan canlı kural; spec'le birebir).
- [x] `vercel firewall diff` → boş (bekleyen draft yok).
- [x] M5/M6 hız sınırını, publish sahipliğini ve drift kontrolünü anlatıyor.

---

## Risk ve Geri Dönüş Planı

- **Risk:** Koşul fazla geniş eşleşir (ör. başka path) → meşru sayfa trafiği 429 alır. Önlem: `log` aşaması; eşleşme yalnız `/api/chat` POST'unda görülmeden 429'a geçilmez.
- **Risk:** 6/10 dk meşru bir ziyaretçiyi beklenenden sık keser → değer bir kullanıcı kararıdır (kota aritmetiği). Değiştirmek DECISIONS + spec + drift ile yapılır, dashboard'dan değil.
- **Rollback (anında):** `vercel firewall rules disable chat-rate-limit --yes --non-interactive </dev/null` (ya da `remove`) → `diff` → kullanıcı publish eder. Deploy gerekmez.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (`main`, yalnız `_dev/`)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi (sıradaki: verify-phase)

---

## Oturum Kayıtları

### Oturum — 2026-10-02

**Durum:** 🔴 Bloke — kullanıcı WAF publish'inden vazgeçti (cevap 17:09Z; gerekçe bu oturuma iletilmedi). Taslak discard edildi, canlıya hiçbir şey çıkmadı. Teknik engel yok; engel publish kararı.

**Yapılanlar:**
- **1. Ön koşullar (15:34:44Z):** `overview` → `Firewall Not configured` · `diff --json` → `{"changes": []}` · `drift.mjs` → 2 (`not_found`). Beklenen başlangıç.
- **Kazara publish kapısı CLI kaynağından okundu** (59.26.0, `offerAutoPublish`): "Publish to production now?" sorusu yalnız dört koşul birlikteyken açılır — `--yes` yok, stdin TTY, `--non-interactive` yok, önceden taslak yok. Firewall'a yazan her komut `--yes --non-interactive </dev/null` ile koşuldu; soru açılmadı.
- **2. Stage — spec olduğu gibi (15:35:23Z):** `rules add --json "$(cat ops/firewall/chat-rate-limit.json)"` → rc 0, `Rule "chat-rate-limit" staged`.
  - **Sunucu spec'i kabul etti** (`valid: true`). TASK-19.04'ün OpenAPI `rules.insert` ↔ CLI çelişkisi pratikte kapandı.
  - Spec taslağına karşı `drift.mjs` → **0** + "karşılaştırılan DRAFT'tır" uyarısı. TASK-19.04'ün `kanal: TASK-19.06` diye devrettiği iki test kriteri (CLI/sunucu kabulü · draft'a karşı drift 0 + uyarı) bununla kapandı.
- **2. Stage — `log` varyantı (15:36:10Z):** plandaki `rules edit … --rate-limit-action log --yes` etkisiz çıktı (→ Sorunlar). Yerine spec'ten yalnız `action.mitigate.rateLimit.action` → `"log"` değiştirilerek türetilen JSON `rules edit chat-rate-limit --json … --yes` ile stage edildi.
  - `drift.mjs` → **1**, tek fark satırı `action.mitigate.rateLimit.action: spec="rate_limit" · vercel="log"`. Başka fark yok: gerçek sunucu biçimi için `compareRule`/test verisi düzeltmesi gerekmedi.
  - `diff`: 2 değişiklik (`rules.insert` 15:35:24Z `rate_limit` + `rules.update` 15:36:11Z `log`); canlı `Not configured`.
- **Publish kullanıcıya soruldu (15:37Z).** Koordinatör üzerinden gelen "ajan yayınlasın" cevabı kullanıcı onayı sayılmadı (plan publish'i kullanıcıya bırakıyor); publish komutu kullanıcıya verildi. Kullanıcının cevabı (17:09Z): vazgeç, discard.
- **Discard (17:10:46Z):** hemen önce `diff` yalnız bu iki değişikliği gösterdi (17:10:41Z) → `vercel firewall discard --yes --non-interactive` rc 0. Sonra `diff --json` → `{"changes": []}` · `overview` → `Not configured` · `drift.mjs` → 2 (17:10:54Z). Firewall turun başındaki hâline döndü.
- **3–6. adımlar koşulmadı.** Canlı `/api/chat`'e probe isteği gitmedi. M5/M6 güncellenmedi: hız sınırı canlıda yok, M5'in "Hız sınırı yok" edge case satırı doğru kalıyor.

**Sorunlar:**
- **CLI 59.26.0 — `rules edit`'te `--rate-limit-*` bayrakları `--action` olmadan sessizce yok sayılır.** Kaynak `handleFlagEdit`: rate-limit alt bayrakları yalnız `--action` verilince `buildActionFromFlags` ile işlenir. Aksi hâlde kural değişmez, çıktı "No changes detected", çıkış 0. Bu yüzden 2. adımdaki komut ve PHASE-19 → Uygulama tuzaklarındaki "`--rate-limit-action log` ile" ifadesi bu sürümde çalışmaz.
  - Çözüm: `rules edit … --json` (spec'ten türetilen varyant). Diğer yol `--action rate_limit` + bütün rate-limit bayraklarıdır; action'ı bayraklardan yeniden kurar, kullanılmadı.

**Kararlar:**
- `log` varyantı `--json` yoluyla stage edildi: 4. adım da aynı yolu kullanıyor ve tek alan farkı drift'le ölçülebiliyor (duran yetki; plandaki komut ölçümle etkisiz çıktı).
- Task 🔴 işaretlendi, 🔄 + `Adım: plan` değil: vazgeçmenin gerekçesi bilinmiyor. Yeniden publish mi, plan revizyonu mu (19.06/19.07, TB-G2 WAF katmanı) kullanıcı kararıdır; bu oturum seçmedi.
- docs/DECISIONS.md'ye eklendi: Hayır (hız sınırı kararı değişmedi; ölçüm karardan sapmadı).

**Kalan İşler:**
- 2. adımın publish'i ve 3–6. adımlar (eşleşme · 429 · patlama · drift 0 · M5/M6) — kullanıcı kararına bağlı.

**Son Yaklaşım:** Spec sunucuca kabul ediliyor, gerçek `inspect` biçimi test verisiyle örtüşüyor, drift script'i gerçek taslakta 0 ve 1'i doğru veriyor. Kalan her şey publish'e bağlı.

**Sonraki Adım Detayı:**
- **WAF katmanı sürdürülürse** (`/devflow:run-task`, bu task yeniden):
  1. Ön koşulları yeniden ölç: `Not configured` · `diff` boş · drift 2.
  2. `vercel firewall rules add --json "$(cat ops/firewall/chat-rate-limit.json)" --yes --non-interactive </dev/null`
  3. Log varyantını scratchpad'e türet: `node -e 'const s=require("./ops/firewall/chat-rate-limit.json");s.action.mitigate.rateLimit.action="log";process.stdout.write(JSON.stringify(s))' > <scratch>/log.json`
  4. `vercel firewall rules edit chat-rate-limit --json "$(cat <scratch>/log.json)" --yes --non-interactive </dev/null` → drift 1 (tek satır) → `diff` → publish kullanıcıda.
  5. 4. adımda: `rules edit chat-rate-limit --json "$(cat ops/firewall/chat-rate-limit.json)" --yes …` → drift 0 (DRAFT) → publish kullanıcıda.
- **WAF katmanı bırakılır ya da değişirse:** plan-phase revizyonu. 19.07'nin canlı ölçümü (429 + sınırdaki offline kopyası, drift) ve Faz 19 milestone'u ("canlıda hız sınırı … ölçülüyor") bu kurala bağlı; DECISIONS 2026-10-02 hız sınırı kararı yeniden açılır.

**Dosya Değişiklikleri:**
- Kod değişmedi. Bu doküman · `_dev/DURUM.md` · `_dev/phases/PHASE-19.md` (Task Listesi).

**Test Sonuçları:**
<!-- KURAL: Ölçüm kimliğiyle yazılır — ne çalıştırıldı ve hangi kapsamda ("yalnız auth uçları", "serve tarafı hariç"). Ölçülmeyen ekseni kapsıyormuş gibi okunan çıplak iddia yazma: "X temiz" değil "X, Y kapsamında temiz". -->
- `node ops/firewall/drift.mjs`, gerçek Vercel'e karşı dört hâlde: kural yok → 2 (15:34Z) · spec taslağı → 0 + DRAFT uyarısı · `log` taslağı → 1, tek fark satırı · discard sonrası → 2 (17:10Z).
  - Kapı sınaması: `log` taslağı kapının reddetmesi gereken gerçek bir sapmadır → 1 ve doğru alanı adlandırdı. Spec taslağı kontrol grubudur → 0. Boş kapsam (kural yok) → 2, PASS basmadı.
- Gerçek `inspect --json` biçimi (spec taslağı): spec alanları + yalnız `id`, `valid: true`, `validationErrors: null`. `bypassSystem` / `logHeaders` / `neg` gelmedi. 19.04 test verisi bunları zaten kapsıyor; `compareRule` değişmedi.
- `npm run test` → 10 dosya / 141 test geçti (taban, kod değişmedi). Build koşulmadı: kod değişmedi.
- Canlı katman ölçülmedi: probe koşulmadı, WAF kuralı yayınlanmadı (canlı 429 · eşleşme · drift 0 kriterleri açık).

**Plan revizyonu — 2026-10-03:** Plan revize edildi. TASK-19.07 (merge + kod katmanının canlı ölçümü) bu task'ın önüne alındı. Sınırdaki ziyaretçi gözlemi 19.07'den buraya taşındı. Vazgeçmenin gerekçesini kullanıcı belirtmedi; sıralamanın gerekçesi Claude'undur (→ Bağlam). Task, 19.07 ✅ olunca kaldığı yerden devam edebilir; ön koşullar yeniden ölçülür.


### Oturum — 2026-10-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Ortam:** devcontainer, `vercel` CLI **62.2.0** (task 59.26.0'da yazıldı), `northaiii` yetkili, proje bağlı. 62.2.0 kaynağında `offerAutoPublish` aynı: `--yes`/`--non-interactive`/TTY-dışı stdin publish sorusunu kapatır, kendiliğinden publish etmez.
- **1. Ön koşullar (18:43:12Z):** `overview` → `Not configured` · `diff --json` → boş · `drift.mjs` → 2.
- **2. Stage:** `rules add --json <spec>` (18:43:32Z) → drift 0 + DRAFT uyarısı. `log` varyantı `rules edit --json` (18:43:40Z) → drift 1, tek satır `rateLimit.action: spec="rate_limit" · vercel="log"`; diff 2 değişiklik (add + modify), yalnız bu kural.
- **Publish yetkisi:** kullanıcı ilk soruyu anlamadı; sade anlatımla yeniden soruldu, kullanıcı doğrudan "Evet, sen çalıştır" dedi (iki publish için ayrı ayrı). Claude `vercel firewall publish --yes --non-interactive` koştu: `log` **18:46:04Z**, 429 **18:48:26Z**.
- **3. Eşleşme (`log`, 18:46:16–19Z):** probe `--burst-only` → 13/13 istek 400, çıkış 1 ("sınır gözlenmedi" — beklenen). Vercel: `overview` → Log 7, `chat-rate-limit` 7; `traffic list --rule rule_chat_rate_limit_Osrd5k --dimension path --json` → `stats.log: 7`, path top-list yalnız `/api/chat` (7). Kural 7.–13. istekleri, yalnız `/api/chat`'te eşledi.
- **4. Spec stage (18:46:37Z):** `rules edit --json <spec>` → drift 0 + DRAFT, diff tek `rules.update` (`log` → `rate_limit`). Publish sonrası diff boş, drift **0 (canlı)**, DRAFT uyarısı yok.
- **5. Patlama (18:59:03Z, son probe isteğinden 12,7 dk sonra):** probe → P1–P6 400, **P7 429** (`Too Many Requests`), çıkış 0.
- **6. Sınırdaki ziyaretçi (18:59:11Z / 18:59:16Z):** system Chrome, `NEXT_LOCALE` cookie'si. `/` ve `/en`'de chatbot'a birer mesaj → `/api/chat` **429**; `#chat` içinde o dilin `chat.error` metni görünür (TR "Asistan şu an yanıt veremiyor…", EN "The assistant can't respond right now…"). Ardından inputa yazınca Gönder etkin (UI takılı değil). Ekran görüntüsü TR gözle kontrol edildi.
- **7. Dokümanlar:** M5 (F5.1 hız sınırı paragrafı + kabul kriteri + edge case "var" + kalıntılar), M6 F6.4 (firewall kuralı, CLI, publish, drift, rollback).

**Sorunlar:**
- Yok. CLI 62.2.0'da plandaki komutlar değişmeden çalıştı.

**Kararlar:**
- Publish'i plan "kullanıcı koşar" diyordu; kullanıcı bu oturumda doğrudan ve iki aşama için ayrı ayrı Claude'un koşmasına izin verdi. İlk oturumdaki "koordinatör üzerinden" cevaptan farkı budur.
- docs/DECISIONS.md'ye eklendi: Hayır (429 beklenen 7. istekte geldi; ölçüm karardan sapmadı).

**Kalan İşler:**
- Yok. Fazın bütün task'ları tamam → `/devflow:verify-phase 19`.

**Son Yaklaşım:** Kademeli yayın (`log` → 429) kullanıcı onayıyla Claude tarafından publish edildi; eşleşme Vercel traffic API'sinden yol düzeyinde okundu, 429 ve offline kopyası temiz pencerede tek koşuda ölçüldü.

**Sonraki Adım Detayı:**
- verify-phase 19: canlı katman tekrar ölçülecekse pencere bütçesine dikkat (WAF artık canlı: 10 dk'da 6, origin senaryoları da sayılır; patlama en son).

**Dosya Değişiklikleri:**
- Kod değişmedi. Vercel proje firewall'ı: `chat-rate-limit` (`rule_chat_rate_limit_Osrd5k`) canlı.
- `_dev/modules/M5-Chatbot-API.md` · `_dev/modules/M6-SEO-Deploy.md` · bu doküman · `_dev/DURUM.md` · `_dev/phases/PHASE-19.md`.

**Test Sonuçları:**
<!-- KURAL: Ölçüm kimliğiyle yazılır — ne çalıştırıldı ve hangi kapsamda ("yalnız auth uçları", "serve tarafı hariç"). Ölçülmeyen ekseni kapsıyormuş gibi okunan çıplak iddia yazma: "X temiz" değil "X, Y kapsamında temiz". -->
- `drift.mjs` gerçek Vercel'e karşı: kural yok → 2 · spec draft → 0 + DRAFT · `log` draft → 1 (tek alan) · `log` canlı → 1 (uyarısız) · spec draft → 0 + DRAFT · **spec canlı → 0, uyarısız** (18:59:23Z). Kapı sınaması: `log` hâli kapının reddetmesi gereken gerçek sapma → 1 ve doğru alan; kural yok (boş kapsam) → 2, PASS basmadı.
- `vercel firewall diff --json` → `{"changes": []}` (18:59Z).
- Canlı `log` aşaması (kanal: UAT): 13 istek 400, Vercel'de 7 log eşleşmesi, path yalnız `/api/chat`.
- Canlı patlama (kanal: UAT): temiz pencerede 429 **7. istekte**. `overview` → Rate Limited 3 (P7 + TR + EN tarayıcı mesajı).
- Canlı sınırdaki ziyaretçi (kanal: UAT, yalnız `/` TR ve `/en`; diğer 3 dil ölçülmedi, aynı `!res.ok` dalı): offline kopyası görünür, Gönder tekrar etkin.
- Groq çağrısı **0**: probe gövdesi geçersiz (400), tarayıcı mesajları edge'de 429.
- `npm run test` → 10 dosya / 141 test geçti (taban, kod değişmedi). Build koşulmadı: kod değişmedi.

---

**Oluşturulma:** 2026-10-02
