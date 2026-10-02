# Phase 19: v0.5 versiyon-sonu teknik borç — güvenlik (bağımlılık yaması + `/api/chat` kota koruması)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Yukarıdaki **Durum:** alanı tek değer taşır (menüden biri) ve PHASES.md'deki faz durumuyla AYNI olmalıdır. Yazan üç komut vardır: doğuşta discuss-phase (`🔄 Devam ediyor`), kapanışta — ikisi de son meşru anda — review-phase Adım 6 (`✅ Tamamlandı`, PHASES ✅ ile aynı anda) ve prd-review erken-sonlandırma arşivlemesi (`⚠️ Erken sonlandırıldı`). Faz ✅/⚠️ damgalandıktan sonra doküman tarihseldir — alan bir daha düzeltilemez, bu yüzden atlanamaz. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Doküman kırmızı çizgiyi (~20k token) **AŞARSA** (ölçüm dosya bazlıdır: `doc-scan.sh _dev/phases/PHASE-N.md` — tek bir bölümün değil, dokümanın tamamının tek Read'e sığması esastır) faz HÂLÂ AKTİFKEN `PHASE-N-<EK>.md`'ye bölünür (**ek BÜYÜK — parent'ın casing'ini izler**; geri-linkteki `<tip>` küçük harf kalır, o dosya adı değildir) — parent'ta self-yeten özet + pointer kalır, çocuğun başına `← PHASE-N · <tip>` geri-linki konur, içerik taşınıp silinir, parent o fazın mini-index'i olur. Kapanış damgasından (`✅` ya da `⚠️`) sonra bölme yasaktır; research-phase, verify-phase ve review-phase faz hâlâ aktifken boyutu kontrol eder (kanon: CLAUDE.md → Boyut ve Bölünme). Kesim dokümanın kendi `##` bölüm sınırından geçiyor ve tek sonuç veriyorsa (en az iki `##` sınırı, parent'ta gövde kalır) kalem kurallıdır — sorulmaz, uygulanır ve raporlanır; bölümleri gruplamak ya da ad icat etmek gerekiyorsa yargıdır — kesimi Claude seçer, uygular ve raporlar (CLAUDE.md → Onay Ölçütü). -->
<!-- KURAL: **Çizgiye YAKLAŞMAK iş değildir** — çizginin altında kalmak için kısaltma ya da erken bölme yapılmaz; gereken içerik önce yazılır (kanon: CLAUDE.md → Boyut ve Bölünme). Doküman eşiğin ALTINDAYSA (uygulanan bölme yerinde kaldı ya da temizlik onu altına indirdi — geri ALINAN bölme dokümanı çizginin ÜSTÜNE döndürür ve orada kayıt `accept-size`'dır) `accept-size` çağrılamaz: script boyut aşımı olmayan dokümanı reddeder. O hâlde verilmiş bir kap kararı varsa tek kayıt tek satırlık `<!-- KURAL: … -->` yorumudur (kaynağıyla — CLAUDE.md → Onay Ölçütü → Kaydın evi); kap kararı doğmadıysa kayıt da gerekmez. -->

---

## Genel Bilgiler

**Amaç:** Faz 18 kalite kontrolündeki **Güvenlik ⚠️**'sinin iki gerekçesini kapatmak. Birincisi bağımlılık açıkları: npm audit 9 açık (1 kritik / 4 high / 4 moderate), çoğu kurulu `next@15.5.19`'da. İkincisi `/api/chat`'in kimliksiz ve sınırsız olması: günlük Groq kotası (1.000 istek) dışarıdan tüketilebiliyor (UAT 18 senaryo 23). İki iş de mevcut davranışı, UI'ı ve i18n'i değiştirmeden yapılır. Değişiklikler revize dalında doğrulanır, faz sonunda `main`'e alınır ve canlıda ölçülür.

**Milestone:** `next` aralık-içi `15.5.27`'de ve `npm audit` **kritik + high 0** (kalan moderate varsa gerekçesiyle kayıtlı). `/api/chat` tek kaynaktan sınırsız tüketilemiyor: canlıda **hız sınırı** ve **yabancı origin reddi** ölçülüyor (UAT 18 senaryo 23'ün probu artık reddediliyor). Sınıra takılan ziyaretçi mevcut 5 dilli offline kopyasını görüyor. Kural repo'da kod olarak duruyor. Guardrail'ler (`next build`, Vitest, CI a11y, First Load JS, i18n parite, tüm sayfa/locale/redirect 200/308) regresyonsuz. Değişiklikler `main`'de canlı.

mekanizma: "`npm audit` kritik + high 0" → kritik 0, kalan 2 high (`next`'in build-zamanı `postcss@8.4.31` pin'i) gerekçesiyle kayıtlı (kullanıcı kararı); "kural repo'da kod" → hız sınırı Vercel WAF kuralı (tanımı repo'da JSON spec, CLI ile uygulanır + drift kontrolü), origin kontrolü kodda (araştırma kararı)

### Feature Listesi

(MODULE-MAP ve modules/ referansı)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| TB-G1 | M6-SEO-Deploy | Bağımlılık güvenlik yaması: `next` 15.5.19 → 15.5.27 (aralık-içi backport) + `npm audit fix` (force'suz). Yalnız `package-lock.json` değişir, Next 16 yok |
| TB-G2 | M5-Chatbot-API (+M6) | `/api/chat` kota koruması: hız sınırı + origin kontrolü. Maliyet $0, kural repo'da kod, sınıra takılan ziyaretçi mevcut offline kopyasını görür |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase` oturumunda dolduruldu (2026-10-02).

### Alınan Kararlar

- **Versiyon sonu tespiti:** `içerik_fazları` → **`teknik_borç`**. v0.5'in tek feature'ı C1 ✅ ve Aktif Faz/Adım doluydu.
- **Kapsam yalnız güvenlik ekseni (kullanıcı seçimi):** TB-G1 + TB-G2. İkisi Faz 18 Güvenlik ⚠️'sinin iki gerekçesini birebir kapatır. Toplanan diğer adaylar (sağlık kontrolü, harness, prompt cilası, TB-3) bu fazın dışında kaldı → Kapsam Dışı.
- **Sıra:** TB-G1 önce gelir (en ucuz, bağımsız, kritik açık). TB-G2 sonra. Fazın son task'ı merge + canlı doğrulamadır.
- **TB-G1 aralık-içi yamadır, `--force` yok.** Dry-run (2026-10-02): `next` 15.5.19→15.5.27, `sharp` 0.34.5→0.35.5, `postcss` 8.5.15→8.5.28, `vitest` 4.1.9→4.1.11, `undici` 7.28.0→7.30.0, `nanoid` 3.3.12→3.3.19, `@tailwindcss/postcss` 4.3.1→4.3.3. Hepsi mevcut caret aralıklarının içinde: değişen yalnız `package-lock.json`, `package.json` spec'i aynı kalır. Kullanıcı kapsamı onayladı (Dokunulmazlar). Lock diff'i task'ta yine gösterilir. Research iki şeyi doğrular: 9 açığın gerçekten kapandığı, ve `sharp` 0.34→0.35'in (0.x'te minor = kırıcı olabilir) build'e etkisi.
- **TB-G1 regresyon çıtası (kullanıcı seçimi):** `next build` + Vitest + CI a11y + build çıktısında First Load JS önce/sonra karşılaştırması + preview'da tüm sayfa/locale/redirect duman testi. Lighthouse yalnız bundle değişirse koşulur (ILKELER perf tabanı).
- **TB-G2 iki katmandır.** Origin kontrolü yabancı bir sitenin chatbot'u ziyaretçinin tarayıcısından kullanmasını kapatır, ama curl ile atlatılır. Hız sınırı tek kaynaktan tüketimi kapatır, ama yabancı gömmeyi bırakır. Biri ötekinin yerini tutmaz.
- **TB-G2 maliyeti $0, yeni harici servis yok (kullanıcı seçimi).** Vercel platform katmanı ve/veya kod-içi kontrol. Mekanizmayı research seçer. Limit değerleri ölçümle seçilir (Faz 18 emsali): meşru bir ziyaretçi oturumunun gerçek mesaj profili esas alınır.
- **TB-G2 kuralı repo'da kod olarak yaşar (kullanıcı seçimi, ILKELER kalıcılık).** Dashboard'da tek başına duran kural görünmez drift olur. Config-as-code mümkün değilse research bunu açıkça getirir, sessizce dashboard'a düşülmez. `vercel.json` Dokunulmazlar listesinde değil ama deploy davranışını değiştirir → task'ta görünür kılınır. `vercel.ts` `@vercel/config` paketi isterse `package.json` onayı gerekir.
- **Sınıra takılan ziyaretçi deneyimi (kullanıcı seçimi):** 429/403 → `Chatbot.tsx`'in `!res.ok` kapısı → mevcut 5 dilli `chat.error` kopyası ("birazdan tekrar deneyin / e-posta"). UI ve i18n dokunulmaz.
- **Dal (kullanıcı seçimi, yalnız Faz 19 için):** kod `revize/v0.5-teknik-borc`'ta yürür (`main` HEAD'den, planın ilk task'ı açar). Faz sonunda `main`'e merge edilir, UAT canlıyı ölçer. Kalıcı dal kuralı prd-review'da karara bağlanır.
- **Canlı doğrulama kotayı yakmadan yapılır (varsayılan):** limit probe'ları mümkünse model çağırmayan isteklerle (400 dönen gövdeler) sayacı tetikler. Kural bu isteklere de sayıyorsa research teyit eder.
- **Test (kümülatif ilke):** origin kontrolü kodda yaşıyorsa saf mantıktır → Vitest node testi kendi testini getirir. Platform kuralı birim testlenemez → canlıda kanıt artefaktıyla doğrulanır (MEMORY: canlı doğrulama disiplini).

### Kullanıcı Tercihleri

- **Preview'da chatbot test edilemez:** `GROQ_API_KEY` yalnız Production'da. TB-G1 preview'da tüm sayfalarla sınanır. Chatbot'a dokunan TB-G2 yerelde sınanır (`next start` + `.env.keys.local`), son doğrulaması merge sonrası canlıdadır.
- **Origin izin listesi:** production alan adları ve yerel dev. Preview'da anahtar olmadığı için preview origin'i chatbot için anlamsız. Kesin liste research'te.
- **İleride eklenecek bir sağlık kontrolü** (bu fazın kapsamı dışında) origin ve limit kapısından geçecek şekilde tasarlanmalı. Not olarak taşınır.

### Kapsam Dışı

- **Canlı chatbot sağlık kontrolü, marka mührü harness'inin kalıcılaşması, chatbot prompt cilası (+ `route.ts` `max_tokens` gerekçe yorumunun inceltilmesi), TB-3 full-motion tohumu.** Kullanıcı bu faza almadı. Hepsi sahipli açık olarak kalır (DURUM), prd-review'da yeniden tartılır.
- **Next 16 major yükseltmesi.**
- **Dağıtık (çok-IP) kötüye kullanım ve bot tespiti, CAPTCHA, kimlik doğrulama.** IP başına sınır bunları kapatmaz. Kabul edilen sınır: amaç tek kaynaktan tüketimi kapatmaktır.
- **Groq kotasını artırmak / ücretli tier.** v0.5'in $0 hedefi korunur.
- **UI / i18n değişikliği** (ayrı "yavaşlayın" mesajı dahil).
- **Non-TR/AR çeviri senkronu, AR-dil stratejisi, BULGU-S3 craft cilası, brief mobil perf açığı, dal kuralı + `GROQ_API_KEY` Preview env** → prd-review / `PRD/VERSIONS.md`.
- **Booking / takvim** → v0.6.

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase` oturumunda dolduruldu (2026-10-02). Ölçümler aynı gün yapıldı; kararlar kullanıcı onaylı.

### Değerlendirilen Yaklaşımlar

**TB-G1 — bağımlılık yaması**

- **Force'suz `npm audit fix` (aralık-içi):** `next` 15.5.27 dahil her yükseltme mevcut caret aralığının içinde, `package.json` değişmez. 9 açığın 7'sini kapatır. Kalan 2 high, `next`'in kendi içine sabitlediği `postcss@8.4.31`'den gelir (→ Dikkat Edilecekler).
- **+ `overrides` (`next` → `postcss` 8.5.28):** high 0 verir. Ama Dokunulmaz `package.json`'a, framework'ün tam sabitlediği iç bağımlılığı ezen kalıcı bir istisna ekler; Next 16'ya dek hatırlanıp kaldırılmalıdır. Faz 16 emsaliyle aynı gerekçeyle elendi.
- **Next 16:** `postcss` 8.5.23 pin'iyle tek temiz yol, ama major olduğu için kapsam dışı.
- **Seçilen:** force'suz fix + kalan 2 high'ın gerekçeli kaydı (kullanıcı kararı).

**TB-G2 — hız sınırı**

- **Vercel WAF rate-limit kuralı:** edge'de, fonksiyondan önce sayar; engellenen trafik faturalanmaz. Hobby'de projede 1 kural, IP/JA4 anahtarı, sabit pencere 10 s–10 dk, 1M izinli istek dahil ($0). Eksi: `vercel.json` hız sınırı tanımlayamaz (`routes[].mitigate` yalnız `deny`/`challenge`). Deploy'la uygulanan config-as-code yoktur; kural Vercel'de yaşar.
- **`@vercel/firewall` SDK (`checkRateLimit`):** limit değerleri yine dashboard kuralında durur, üstüne yeni paket ister. Hem drift hem Dokunulmaz onayı → elendi.
- **Runtime Cache sayacı (`@vercel/functions` → `getCache`):** yeni paket ister ve atomik artırma yoktur. Hobby'de takımın bütün projeleri (afrodia, alpfit…) tek cache'i paylaşır ve LRU ile birbirinin kaydını silebilir; kullanımı ücretlidir. Elendi.
- **Kod-içi bellek sayacı:** repo'da durur ve test edilir, ama sayaç fonksiyon instance'ı başınadır. Deploy ve cold start'ta sıfırlanır, ölçeklenmede bölünür; garanti canlıda ölçülemez. Elendi.
- **Harici store (Upstash vb.):** kapsam kararıyla dışarıda (yeni harici servis yok).
- **Seçilen:** WAF kuralı. Tanımı repo'da JSON spec olarak durur; CLI ile uygulanır ve drift kontrolü yapılır (kullanıcı kararı).

**TB-G2 — origin kontrolü**

- **Elle tutulan host izin listesi:** canlıda üç host 200 dönüyor (→ Dikkat Edilecekler). Liste her yeni alias'ta bayatlar.
- **`vercel.json` / WAF header kuralı (`mitigate: deny`):** config olarak durur ama birim-testlenemez. İki başlığı (Origin ↔ Host) birbiriyle karşılaştıramaz, regex host listesine düşer.
- **Kodda same-origin kuralı (Origin host'u = isteğin `host`'u):** listesizdir, bütün alias'ları ve `localhost`'u kendiliğinden kapsar. Saf fonksiyondur → Vitest node.
- **Seçilen:** kodda same-origin kuralı.

### Kullanılacak Araçlar/Kütüphaneler

- **`next` 15.5.27** (`backport` dist-tag'i, 15.5.x'in son yaması) ve aralık-içi yan yükseltmeler: `sharp` 0.35.5 · `postcss` (kök + vite) 8.5.28 · `vitest`/`@vitest/mocker` 4.1.11 · `undici` 7.30.0 · `nanoid` 3.3.19 · `@tailwindcss/postcss` 4.3.3 · `fflate` (`three-stdlib` altında) 0.6.11.
- **Vercel WAF custom rule** (`rate_limit`, `fixed_window`). Yönetimi kurulu `vercel` CLI 59.26.0 ile: `firewall rules add --json`, `firewall rules inspect --json`, `firewall diff`. `firewall publish`'i kullanıcı koşar.
- **Vitest node** — origin modülünün birim testi.
- **Bağımlılıksız Node `fetch` probe script'i** — repo'da durur, elle tetiklenir.
- **Yeni npm paketi yok** — TB-G2 `package.json`'a dokunmaz.

### Dikkat Edilecekler

**Devralınan iddiaların ölçümü (2026-10-02):**

- *"9 açık force'suz kapanır, yalnız lock değişir"* → **kısmen çürüdü.** "Yalnız lock" doğrulandı: her yükseltme mevcut aralığın içinde (registry metadata'sı). Ama `next@15.5.27` `postcss`'i hâlâ **tam `8.4.31`'e** sabitliyor. Bu kopya 2 high (GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849) + 2 moderate taşıyor ve `next`'i de "via" high gösterecek.
  - Beklenen son durum: **kritik 0 · high 2 · moderate 0**. Bu tahmin registry metadata'sı ve npm bulk advisory API'sinden hesaplandı.
  - Scratch kopyada `npm audit fix` simülasyonuna bu oturumda izin verilmedi. Task gerçek koşuyla teyit eder; sapma görürse durur.
- Discuss dry-run listesinde olmayan **`fflate`** da aralık-içi kapanıyor: moderate, `@react-three/drei` → `three-stdlib` altında `0.6.10`; `three-stdlib` `^0.6.9` istediği için `0.6.11`'e çıkar. Lock diff'inde görünmesi beklenir.
- *"`sharp` 0.34→0.35 build'i kırabilir"* → **etki yüzeyi pratikte sıfır.**
  - `next@15.5.27`'nin optional aralığı `^0.34.3 || ^0.35.4`, yani 0.35.5 aralık-içi.
  - `sharp@0.35.5` `node >=20.9.0` istiyor: Vercel projesi 24.x, CI 24 (`.github/workflows/ci.yml`), yerel 24.21 ✓.
  - `src/`'de `next/image` ve statik görsel import'u **yok**; sharp ne build'de ne çalışma anında çağrılıyor. `/_next/image` Vercel'de platform altyapısında işlenir. `next build` + duman testi yeterli.
- *"UI ve i18n dokunulmaz — 429/403 mevcut offline kopyasına düşer"* → **doğrulandı.** `Chatbot.tsx` her `!res.ok`'ta `setOffline(true)` → `chat.error` gösterir; bayrak bir sonraki gönderimde `send`'in başında sıfırlanır. Yanıtsız kalan kullanıcı mesajı geçmişte durur, sonraki istekte ardışık iki `user` mesajı gider. `sanitizeMessages` sıra kuralı koymadığı için bunu kabul eder.
- *"Hız sınırı / origin kontrolü hiçbir katmanda yok"* → **doğrulandı:**
  - `route.ts`'de kontrol yok.
  - `src/middleware.ts` matcher'ı `api`'yi atlıyor.
  - `vercel.json`/`vercel.ts` yok.
  - `vercel firewall overview` → `Firewall: Not configured`.
- *"Limit probe'ları 400 gövdeyle sayacı tetikler"* → **doğrulandı (tasarım gereği).** WAF koşulu (path + method) fonksiyondan önce değerlendirilir ve yanıt kodundan bağımsız sayar. Origin 403'leri de sayaca girer.
- *"Origin izin listesi: prod alan adları + yerel dev"* → **ölçüldü:** canlıda **üç host** 200 dönüyor: `kiwiailab.com`, yönlendirmesiz `www.kiwiailab.com` ve `kiwi-ai-lab-v3.vercel.app`. Liste yerine same-origin kuralı seçildi (→ Teknik Kararlar).
- *"Limit değeri meşru ziyaretçi profiliyle ölçülerek seçilir"* → **doğrulanamadı.**
  - Hobby'de log saklama ~1 saat: `vercel logs --since 7d` yalnız son 23 dk'yı döndürdü, kayıtlar IP de taşımıyor.
  - Umami'de chat olayı yok.
  - Kullanıcı değeri kota aritmetiğiyle seçti (→ Teknik Kararlar).

**Çekirdek etkileşimin ölçüm katmanı (kullanıcı kararı):** Fazın asıl davranışı, yani canlıda 429 ve yabancı origin'e 403, Vercel serving zincirinde gerçekleşir. Vitest node yalnız origin mantığını ölçer; yerel Playwright ise WAF'sız `next start`'ı görür. Canlı katman **repo'da kalıcı, elle tetiklenen bir probe script'iyle** ölçülür (son task + UAT). Script model çağırmaz (400 gövde) ve CI'da koşmaz.

**Uygulama tuzakları:**

- **WAF publish canlıya anında dokunur, deploy'dan bağımsızdır.** Kural yalnız draft olarak stage edilir (`vercel firewall rules add --json …`, `vercel firewall diff`). `vercel firewall publish --yes`'i **kullanıcı** koşar, merge/canlı task'ında. Önce `--rate-limit-action log` ile eşleşme probe'la görülür, sonra 429'a geçilir (Vercel'in kademeli yayın pratiği).
- **Kendi IP'n de sayılır.** Hobby'de system bypass yok (`Requires Pro or Enterprise`); probe patlaması geliştiricinin IP'sini ≤10 dk 429'da tutar. Bu yüzden origin probe'ları önce, limit patlaması en son koşulur. Pencere hizası bilinmediği için patlama 429 görene dek gönderir (en fazla 2×6+1 = 13 istek) ve kaçıncı istekte geldiğini raporlar.
- **Sayaçlar bölge başınadır.** Farklı edge bölgelerinden gelen tek kaynak limiti N kat aşabilir; dağıtık kötüye kullanım zaten kapsam dışı. Fonksiyon bölgesi tek: `iad1`.
- **Hobby kural bütçesi:** toplam 3 custom rule, bunun 1'i rate-limit. Bu faz rate-limit slotunu tüketir. Persistent action (`--duration`) Hobby'de yok.
- **Bilinçli kalıntı:** 6/10 dk'da sabit pencerenin başında 6 istek × `max_tokens` 512 rezervasyonu, Groq'un 1.000 OTPM'ini ~3 dk doyurabilir. Tek Hobby rate-limit kuralı ikinci (dakikalık) bir boyuta izin vermiyor. Sonuç: tek kaynak günlük kotayı bitiremez, ama dakikalık kotayı periyodik olarak doldurabilir.
- **Origin kuralının `host` kaynağı:** `req.headers.get("host")`'un Vercel'de herkese açık host'u taşıması beklenir. Probe bunu canlıda teyit eder: apex, `www` ve `vercel.app` üzerinden meşru gönderim 403 almamalı.
- **Gelecekteki sağlık kontrolü** (kapsam dışı) aynı-origin başlıklarını göndermeli; 6/10 dk limitine de sayılır (GitHub Actions IP'leri değişkendir).
- **Yan gözlem (kapsam dışı):** `www.kiwiailab.com` apex'e yönlenmeden 200 dönüyor. Canonical metadata apex'i gösterdiği için SEO zararı sınırlı.

**Tanımlayıcı kaynakları:**

- `GROQ_API_KEY` — dış (Vercel env, yalnız Production).
- `src/app/api/chat/route.ts`, `src/components/Chatbot.tsx`, `src/lib/chat-sanitize.ts`, `src/middleware.ts` — mevcut.
- Origin modülü (öneri `src/lib/chat-origin.ts`) ve testi (öneri `tests/chat-origin.test.ts`) — yeni.
- WAF kural spec'i (JSON, `_dev/` dışında proje dosyası; konum ve kural adı plan-phase'de) — yeni.
- Probe script'i (konum plan-phase'de) — yeni.
- Vercel proje bağı `.vercel/project.json` — mevcut, gitignore'da (`kiwi-ai-lab-v3`, takım `north-ai`, plan Hobby).

### Teknik Kararlar

- **TB-G1 — force'suz `npm audit fix`; kritik 0, kalan 2 high gerekçeli kayıt (kullanıcı kararı).** `next`'in gömülü `postcss@8.4.31`'i yalnız webpack build zincirinde (CSS bloğu, minimizer, font loader) çalışır. Advisory'ler saldırgan kontrollü CSS ister; işlenen tek CSS repo'nun kendisidir. Bu, Faz 16 kararının devamıdır (`docs/DECISIONS-2026-07-02..2026-07-18.md` → 2026-07-16): o gün aynı kopya 2 moderate taşıyordu, bugün 2 high + 2 moderate. Kapanış yolu Next 16 (`postcss` 8.5.23). → DECISIONS 2026-10-02.
- **TB-G2 hız sınırı — Vercel WAF rate-limit kuralı:**
  - Koşul: `path eq /api/chat` VE `method eq POST`.
  - Sayım: `fixed_window`, **600 s**, **6 istek**, anahtar `ip`; aşımda varsayılan **429**.
  - Tanım repo'da JSON spec'tir; CLI ile stage edilir, kullanıcı publish eder. Drift, `vercel firewall rules inspect --json` çıktısı spec'le karşılaştırılarak görülür.
  - Canlı kopya Vercel'de yaşar. "Kural repo'da kod" bu ölçüde daraldı (kullanıcı kararı). → DECISIONS 2026-10-02.
- **Limit değeri 6/10 dk (kullanıcı kararı).** Hobby'nin 10 dk tavanında, tek IP'nin günlük 1.000 kotanın altında kaldığı en yüksek değer budur (6 × 144 = 864/gün). Karşılaştırma: 10/10 dk = 1.440/gün, 20/10 dk = 2.880/gün. Bedeli: 10 dk içinde 7. mesajı gönderen ziyaretçi offline kopyasını görür ve en fazla 10 dk bekler.
- **Origin kontrolü kodda, same-origin kuralıyla:**
  - `Origin` varsa host'u isteğin `host` başlığına eşit olmalı.
  - `Origin` yoksa ya da `null` ise yalnız `Sec-Fetch-Site: same-origin` kabul edilir. Bu başlık tarayıcıda JS ile set edilemez; gizlilik ayarı yüzünden Origin'i düşen meşru tarayıcıyı korur.
  - Diğer her durumda 403.
  - Kontrol `POST`'un ilk işidir: gövde parse'ından ve 503 anahtar kapısından önce gelir. Saf fonksiyondur, Vitest node ile test edilir.
  - curl iki başlığı da sahteleyebilir; o yolun kapısı WAF'tır (iki katman birbirinin yerini tutmaz — discuss kararı).
- **Canlı ölçüm — repo'da probe script'i (kullanıcı kararı).** Senaryolar: yabancı Origin → 403 · Origin'siz → 403 · kendi Origin + 400 gövde → 400 (kapıdan geçti, model çağrılmadı) · patlama → 429. UAT 18 senaryo 23'ün probu bu script'in ilk senaryosudur.
- **Yeni bağımlılık yok.** TB-G2 `package.json`'a dokunmaz; `@vercel/firewall`, `@vercel/functions`, `vercel.json`/`vercel.ts` eklenmez.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase` oturumunda dolduruldu (2026-10-02). 7 task; hepsi `revize/v0.5-teknik-borc` dalında koşar (19.01 dalı açar), 19.07 `main`'e alır.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 19.01 | TASK-19.01 | ✅ Tamamlandı | TB-G1 — dalı aç + force'suz `npm audit fix` (yalnız lock) + yerel kapılar (build, First Load JS farkı, Vitest, Playwright/axe, 30 URL + redirect duman) |
| 19.02 | TASK-19.02 | ✅ Tamamlandı | TB-G2 origin — saf `src/lib/chat-origin.ts` (same-origin kuralı) + Vitest node matrisi |
| 19.03 | TASK-19.03 | ✅ Tamamlandı | TB-G2 origin — kapıyı `route.ts`'in ilk işi yap (403 + red logu) + route testleri + yerel gerçek tarayıcı + M5 |
| 19.04 | TASK-19.04 | ✅ Tamamlandı | TB-G2 hız sınırı — WAF kural spec'i `ops/firewall/chat-rate-limit.json` + `drift.mjs` + test (publish yok; stage → inspect ayağı koşum yasağıyla 19.06'nın stage adımına devredildi) |
| 19.05 | TASK-19.05 | ✅ Tamamlandı | TB-G2 ölçüm — `ops/probe-chat-guard.mjs` (model çağırmaz) + yerel doğrulama + TESTING.md canlı katman |
| 19.06 | TASK-19.06 | 🔴 Bloke | TB-G2 hız sınırı canlı — WAF `log` → 429 (publish kullanıcıda) + patlama ölçümü + drift 0 + M5/M6. Stage ✅ (sunucu kabul etti; 19.04'ün devrettiği iki kriter kapandı); kullanıcı publish'ten vazgeçti, taslak discard → akıbet kullanıcı kararında |
| 19.07 | TASK-19.07 | ⬜ Bekliyor | Milestone — preview kapısı (duman + origin probu) → ff-merge `main` → canlı ölçüm (3 host, tarayıcı, 429 + sınırdaki offline kopyası, drift, audit) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler

<!-- Alınan dersler ve tavsiyeler. Memory'den MEZUN EDİLEN öğrenimlerin çapalı tek satırlık kaydı da buraya düşer ("<öğrenim> artık <test/lint/CI/validator/guard> tarafından yakalanıyor — memory'den mezun edildi") — kanon: .claude/commands/devflow/lib/memory-sistemi.md → Supaplar. Kayıt faz ✅ damgalanmadan ÖNCE yazılır. -->
- [Alınan dersler, tavsiyeler]

### Task-Spesifik Teknik Öğrenimler

<!-- OPSİYONEL: Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar (araç davranışı, framework bug'ı, vb.). MEMORY.md'nin değil, faz retrosunun evidir. Bu fazda böyle bir nüans çıkmadıysa bu alt bölümü tamamen sil. -->
- [...]

### DevFlow'a Öneri

<!-- OPSİYONEL: Bu fazda fark edilen, DevFlow yönteminin geneline dair (proje-özel OLMAYAN) iyileştirmeler — aracın kendisinin nasıl çalışması gerektiği. Buraya yazılır + kullanıcıya bildirilir; DevFlow'a ayrı oturumda taşınır. Disiplin çıkmadıysa bu alt bölümü tamamen sil. -->
- [...]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Modülerlik | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / N/A | ... |

---

**Oluşturulma:** 2026-10-02
