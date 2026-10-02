# TASK-19.05: Canlı katman probe script'i (model çağırmaz) + yerel doğrulama + TESTING.md

**Durum:** ✅ Tamamlandı
**Modül:** M5-Chatbot-API (modules/M5-Chatbot-API.md)
**Feature:** TB-G2 — `/api/chat` kota koruması (ölçüm katmanı)
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** TASK-19.03 ✅ (yerel doğrulama origin kapısını ister), TASK-19.04 ✅

---

## Hedef

Fazın çekirdek davranışını ölçen kalıcı probe'u repo'ya koy: `ops/probe-chat-guard.mjs`. Ölçülen davranış Vercel serving zincirinde gerçekleşir: yabancı origin'e 403, sınır aşımında 429. Script elle tetiklenir, CI'da koşmaz, **hiçbir zaman model çağırmaz** (her gövde 400 döner). Yerelde `next start`'a karşı origin senaryolarıyla doğrulanır. Task, script yerelde beklenen tabloyu ürettiğinde ve TESTING.md'de canlı katman olarak kayıtlı olduğunda biter.

---

## Bağlam

Çekirdek etkileşimin ölçüm katmanı bir kullanıcı kararıdır (research → Dikkat Edilecekler). Vitest node yalnız origin mantığını ölçer. Yerel Playwright WAF'sız `next start`'ı görür. Canlı katman bu yüzden **repo'da kalıcı, elle tetiklenen bir probe**'la ölçülür. Kullanıldığı yerler: TASK-19.06 (WAF), TASK-19.07 (birleştirme sonrası), verify-phase UAT. UAT 18 senaryo 23'ün probu bu script'in ilk senaryosudur.

Discuss'un varsayılanı: canlı doğrulama kotayı yakmaz. Probe sayacı model çağırmayan 400 gövdeleriyle tetikler. WAF koşulu (path + method) fonksiyondan önce değerlendirilir ve yanıt kodundan bağımsız sayar; origin 403'leri de sayaca girer (research doğruladı).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-19.md` → Teknik Kararlar → "Canlı ölçüm — repo'da probe script'i" + Uygulama tuzakları ("Kendi IP'n de sayılır", pencere hizası, sayaçlar bölge başına)
- `tests/chat-route-origin.test.ts` — route'un kapı sözleşmesi (403 / 503 / 400 ayrımı)
- `_dev/docs/TESTING.md` — eklenecek bölümün yeri
- `_dev/memory/runtime-harness-selector-teyidi.md` — harness'te varsayım yerine belirleyici probe

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/docs/TESTING.md` — "Canlı katman (elle, CI dışı)" bölümü: probe + drift script'i, ne zaman ve nasıl koşulur
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum

---

## Alt Görevler

- [x] **1. Script — `ops/probe-chat-guard.mjs`**
  - Bağımlılıksız Node (ESM, yerleşik `fetch`). Argümanlar:
    - `--base <url>` **zorunlu**, varsayılan yok. Canlıya kazara patlama gitmesin.
    - `--burst` opsiyonel: origin senaryolarından sonra patlama. Verilmezse yalnız origin senaryoları koşar.
    - `--burst-only` opsiyonel: yalnız patlama. WAF canlıyken pencere bütçesini korumak için (TASK-19.06/19.07).
  - Gövde **sabittir ve geçersizdir** (`{"messages":[]}` → sanitize 400). Script'te geçerli mesaj gövdesi üretecek bir yol bulunmaz. Bu invariant'ı başlık yorumuna yaz: model hiçbir koşulda çağrılmaz, Groq kotası harcanmaz.
  - Origin senaryoları (sıra sabit):
    1. Yabancı Origin (`https://evil.example`) → beklenen **403** (UAT 18 senaryo 23).
    2. Origin yok + `Sec-Fetch-Site` yok (curl) → beklenen **403**.
    3. Kendi Origin (= `--base`'in origin'i) + geçersiz gövde → beklenen **"kapıdan geçti"**: 400, anahtarsız ortamda (preview / anahtarsız yerel) 503.
  - Patlama (`--burst`): kendi Origin + geçersiz gövde, ardışık. İlk 429'a kadar ya da en fazla **13 istek** (2×6+1 — pencere hizası bilinmez). Kaçıncı istekte 429 geldiğini raporla. 13'te 429 yoksa "sınır gözlenmedi".
  - Sınıflandırma: 403 = origin kapısı · 400/503 = kapıdan geçti · **429 = sınırlandı**. Origin senaryosunda 429 gelirse sonuç başarısız değil "ölçülemedi — pencereyi bekle (≤10 dk)" olarak raporlanır.
  - Çıktı: senaryo · beklenen · gelen durum kodu · sonuç tablosu + toplam istek sayısı + zaman damgası (kanıt artefaktı). Çıkış kodu: 0 = beklenenle tam eşleşme · 1 = sapma · 2 = ağ/argüman hatası.
  - Başlık yorumu: kullanım örnekleri (apex, `www`, `vercel.app`, yerel), "kendi IP'n de sayılır: patlama ≤10 dk 429'da tutar, en son koş" uyarısı, pencere bütçesi (6 istek / 10 dk — origin senaryoları da sayılır), gelecekteki sağlık kontrolü notu, DECISIONS 2026-10-02 pointer'ı.

- [x] **2. Yerel doğrulama** (port `:3217` — `:3000` bu host'ta yabancı dinleyicide)
  - `npm run build` + `next start` (TASK-19.03 kodu). Portu dinleyen PID'i teyit et.
  - Anahtarsız: `node ops/probe-chat-guard.mjs --base http://localhost:3000` → 403 · 403 · 503 (kapıdan geçti). Çıkış 0.
  - Anahtarla (`.env.keys.local` → process env; değer yazılmaz): aynı komut → 403 · 403 · 400. Çıkış 0. Model çağrılmadı: sunucu log'unda üst-akış çağrısı yok.
  - `--burst` yerelde: WAF yok → 13 istekte 429 yok → "sınır gözlenmedi" + çıkış 1. Beklenen davranıştır; script'in sapmayı doğru raporladığını gösterir.
  - `--burst-only` yerelde: origin senaryoları koşmaz, yalnız 13 patlama isteği gider (istek sayısı çıktıda 13).
  - Zorunlu argüman: `--base` olmadan → çıkış 2, istek gönderilmedi.

- [x] **3. TESTING.md — "Canlı katman (elle, CI dışı)"**
  - Kısa bölüm: neden ayrı katman (WAF ve Vercel `host` değeri yerel/CI koşucusunun dışında), iki script (`ops/probe-chat-guard.mjs`, `ops/firewall/drift.mjs`), ne zaman koşulur (WAF değişikliği, `/api/chat` kapı değişikliği, versiyon-sonu UAT), pencere bütçesi uyarısı.
  - 3 katman tablosunun yanına 4. satır olarak değil, **ayrı bölüm** olarak ekle; CI'da koşmadığı açık olsun.

---

## Etkilenen Dosyalar

```
ops/
└── probe-chat-guard.mjs     # YENİ — canlı katman probe'u (model çağırmaz)
_dev/docs/TESTING.md         # "Canlı katman (elle, CI dışı)" bölümü — zaten var
```

---

## Dikkat Noktaları

- **Model asla çağrılmaz.** Geçerli gövde üreten kod yolu yoktur. Kod incelemesinde bunu ayrıca kontrol et (ör. `messages` alanına kullanıcı mesajı ekleyen hiçbir dal yok).
- **Patlama ancak açık bayrakla koşar ve her zaman en son koşar.** Kendi IP'n ≤10 dk 429'da kalır. Hobby'de system bypass yok (`Requires Pro or Enterprise`).
- **Pencere bütçesi:** WAF canlıyken her 10 dk'da 6 istek. Origin senaryoları da sayılır. Birden çok host'u probe'larken toplamı planla (TASK-19.07).
- **Sayaçlar bölge başınadır.** Tek makineden koşulan probe tek bölgeye düşer. Dağıtık kötüye kullanım kapsam dışı.
- **CI'a eklenmez** (kullanıcı kararı): canlıya istek atar ve IP'yi kilitler.
- `.mjs` script yalnız Node yerleşiklerini kullanır; `package.json` dokunulmaz.

---

## Test Kriterleri

- [x] Yerel anahtarsız: `--base http://localhost:3217` → 403 · 403 · 503, çıkış 0. (Port sapması: `:3000` yabancı dinleyicide — MEMORY host araç envanteri.)
- [x] Yerel anahtarlı: 403 · 403 · 400, çıkış 0; üst-akış çağrısı yok (sahte üst-akış sayacı 0; pozitif kontrol 1).
- [x] `--burst` yerelde 13 istekte durur, "sınır gözlenmedi" raporlar, çıkış 1. `--burst-only` origin senaryolarını atlar (toplam istek 13).
- [x] `--base` olmadan → çıkış 2, istek yok.
- [x] `npm run test` + `npm run build` temiz (bu task kod suite'ine dokunmaz; regresyon teyidi).
- [ ] Canlıda script'in 429'u doğru yakaladığı — `kanal: UAT` (WAF yalnız Vercel serving zincirinde var; ölçüm TASK-19.06 + TASK-19.07 + verify-phase).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı (`kanal: UAT` olan hariç)
- [x] Git commit & push yapıldı (`revize/v0.5-teknik-borc`)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-10-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `ops/probe-chat-guard.mjs` yazıldı: bağımlılıksız ESM, yerleşik `fetch`, `--base` zorunlu, `--burst` / `--burst-only`. Üç origin senaryosu sabit sırayla koşar, patlama ilk 429'a dek ya da en fazla 13 istek gönderir. Çıktı: senaryo · beklenen · gelen · sonuç · yanıt parçası tablosu + toplam istek + başlangıç/bitiş damgası. Çıkış 0/1/2.
- Model-çağrılmaz invariant'ı yapısal: `send()` gövde parametresi almaz, yalnız sabit `PROBE_BODY` (`{"messages":[]}`) gider. Açılışta `assertProbeBodyInert()` gövdenin boş `messages` dizisi olduğunu doğrular; değilse hiç istek atmadan 2 ile çıkar. Başlık yorumunda invariant, kullanım örnekleri (apex, `www`, `vercel.app`, yerel), pencere bütçesi, kendi IP uyarısı, sağlık kontrolü notu ve DECISIONS 2026-10-02 pointer'ı var.
- Saf parçalar (`parseArgs`, `classify`, `judgeOrigin`, `originScenarios`, `assertProbeBodyInert`) export edildi; CLI girişi yalnız doğrudan koşuda çalışır (`drift.mjs` deseni). Import yan etkisiz (ölçüldü).
- Yerel doğrulama `next start -p 3217` + scratchpad harness'leriyle koşuldu (→ Test Sonuçları).
- `_dev/docs/TESTING.md` → yeni "Canlı Katman (elle, CI dışı)" bölümü: neden ayrı katman, iki script tablosu, ne zaman koşulur, pencere bütçesi, yerelde nasıl. INDEX'teki TESTING satırı bu bölümü anacak şekilde güncellendi.

**Sorunlar:**
- `:3000` bu host'ta yabancı dinleyicide (MEMORY host araç envanteri): yerel doğrulama `:3217`'de koşuldu. Script portu `--base`'ten alır; komut yalnız port değeriyle farklı.
- Node'un `fetch`'i hangi başlıkları kendiliğinden ekliyor, varsayılmadı, ölçüldü (yerel echo sunucusu, Node 24.21). Origin ve Sec-Fetch-Site eklemiyor, `sec-fetch-mode: cors` ekliyor. Yani 2. senaryo gerçekten "Origin yok + Sec-Fetch-Site yok". `Origin` başlığı elle set edilebiliyor. `redirect: "manual"` gerçek 3xx'i döndürüyor.

**Kararlar:**
- **Origin senaryosunda 429 → çıkış 2:** task "başarısız değil, ölçülemedi" diyor, ama üç kodlu sözleşmede ayrı yeri yok. 0 sahte yeşil, 1 sahte sapma olurdu. 2 "ölçüm yapılamadı" ailesidir (`drift.mjs`'te de 2 = ölçülemedi). Böyle bir koşuda patlama atlanır: IP zaten sınırdaysa bir şey ölçmez.
- **`--burst` + `--burst-only` birlikte → çıkış 2** (argüman hatası). Hangisinin kastedildiği belirsiz, sessizce birini seçmek yanlış pencere bütçesi harcatabilir.
- **Yönlendirme izlenmez** (`redirect: "manual"`): ölçülen, verilen host'un kendisi olmalı. Aksi hâlde `www` → apex gibi bir yönlendirme apex'i ölçüp `www` diye raporlardı. 3xx sapma sayılır.
- **Patlamada 403 sapmadır:** kendi Origin'le giden istek origin kapısına takılıyorsa kapı yanlış-pozitiftir; 429 gelmiş olsa bile raporlanır.
- **Yanıt parçası sütunu** (ilk 48 karakter, `Location` varsa o): durum kodları aynı olan farklı kaynakları ayırır, ör. bizim 403 `Forbidden.` ile olası bir Vercel deny 403'ü. 400 gövdesi `A trailing user message is required.` da isteğin origin kapısını ve JSON parse'ı geçip sanitize'da durduğunu gösterir.
- **`user-agent: probe-chat-guard (…)`**: probe trafiği `vercel logs`'ta ayırt edilsin.
- docs/DECISIONS.md'ye eklendi: Hayır (uygulama ayrıntısı; mimari karar DECISIONS 2026-10-02'de zaten kayıtlı).

**Son Yaklaşım:**
Task bitti. Script repo'da. Canlı 429 ölçümü `kanal: UAT` (TASK-19.06 + 19.07 + verify-phase).

**Sonraki Adım Detayı:**
TASK-19.06: WAF stage → `drift.mjs` (draft) → kullanıcı publish (`log`) → probe → 429'a geçiş → `--burst-only` ile patlama. Pencere bütçesi: origin senaryoları da sayılır, patlama en son koşulur.

**Dosya Değişiklikleri:**
- `ops/probe-chat-guard.mjs` → YENİ: canlı katman probe'u (model çağırmaz).
- `_dev/docs/TESTING.md` → "Canlı Katman (elle, CI dışı)" bölümü.
- `_dev/INDEX.md` → TESTING satırına canlı katman eklendi.
- `_dev/memory/host-uat-arac-envanteri.md` → yerelde "model çağrılmadı" ölçüm tarifi (`GROQ_BASE_URL` → sayaçlı sahte üst-akış + pozitif kontrol); `_dev/MEMORY.md` Son Güncelleme (index satırı değişmedi).
- `_dev/DURUM.md`, `_dev/phases/PHASE-19.md` → 19.05 ✅, aktif task 19.06.

**Test Sonuçları:**
- **Yerel anahtarsız** (`next start -p 3217`, `GROQ_API_KEY` unset; dinleyen PID = başlatılan PID 2785524): `--base http://localhost:3217` → 403 `Forbidden.` · 403 `Forbidden.` · 503 `Chat provider is not configured.`, çıkış 0. Sunucu logunda 2 `chat origin rejected` satırı (senaryo 1 ve 2).
- **Yerel anahtarlı** (`.env.keys.local`'ın `GROQ_API_KEY` satırı yalnız sunucu sürecinin env'ine, değer basılmadı; `GROQ_BASE_URL` → yerel sahte üst-akış `:3219`; PID 2785782): → 403 · 403 · 400 `A trailing user message is required.`, çıkış 0.
- **`--burst` yerelde:** 3 origin + 13 patlama (hepsi 400 "geçti") → "sınır gözlenmedi — 13 istekte 429 yok", toplam istek 16, çıkış 1.
- **`--burst-only` yerelde:** origin satırı yok, P1–P13, toplam istek 13, çıkış 1.
- **Model çağrılmadı:** sahte üst-akış sayacı bütün B koşularından sonra **0**. Pozitif kontrol (probe değil, curl ile kendi Origin + geçerli gövde): HTTP 200, `SAHTE-UST-AKIS-YANITI`, sayaç **1**. Sayaç gerçekten bağlı, yani 0 anlamlı. Sunucu loglarında `chat stream` satırı 0.
- **Argüman kapıları (sunucusuz):** argümansız · yalnız `--burst` · değersiz `--base` · `--burst --burst-only` · `not-a-url` · `ftp://` · bilinmeyen `--bogus` → yedisi de çıkış 2 + "İstek gönderilmedi.".
- **Ürettiğin kapıyı sına — bozuk girdi:**
  - *Kapısız route* (bugünkü canlı `main` / 19.03 öncesi davranışını HTTP katmanında taklit eden, her POST'a 400 dönen yerel sunucu): 1 ve 2 → 400 **sapma**, 3 eşleşti, çıkış **1**. Kırmızı, kusurun probe'un okuduğu katmanda (HTTP yanıtı) oluştuğu yerde görüldü.
  - *WAF taklidi* (gerçek `next start` önünde yerel proxy, sabit pencere 600 s / 6, yanıt kodundan bağımsız sayar): `--burst` → 403 · 403 · 400 + P1–P3 geçti + **P4 429**, "patlamanın 4. isteğinde (koşunun 7. isteği)", çıkış 0. Hemen ikinci koşu → üç origin senaryosu 429 **ölçülemedi**, patlama atlandı, çıkış **2**. Yerelde WAF olmadığı için 429 dalı bu taklit olmadan 19.06'ya dek hiç koşmayacaktı.
  - *Ağ hatası* (dinleyeni olmayan port): `ECONNREFUSED`, koşu durdu, çıkış 2.
  - *Invariant tetikleyicisi* (girdi düzeyinde: scratchpad kopyasında `PROBE_BODY` geçerli bir user mesajına çevrildi; kaynak değişmedi): sayaç sunucusuna karşı çıkış 2, "invariant bozuk", sayaç **0**. Pozitif kontrol olarak asıl script aynı sayaca karşı koşuldu, sayaç 3. `assertProbeBodyInert` matrisi: `{"messages":[]}` kabul; user mesajı · assistant mesajı · `{}` · JSON olmayan · `messages: {}` → 5'i de red.
- **Boş kapsam:** probe'un kapsamı taramadan türemez, senaryolar sabittir. "Hiç ölçmeden PASS" yolu yok: patlamada 429 gözlenmezse çıkış 1, origin 429'unda patlama atlanır ve çıkış 2 olur (yukarıda ölçüldü).
- **Regresyon:** `npm run test` → 10 dosya · 141 test geçti (taban 10/141, değişmedi). `npm run build` → temiz (Next 15.5.27, 37/37 statik sayfa, uyarı/hata 0). Build probe dosyası diskteyken koşuldu; `ops/` build grafiğinde ve `tsconfig` include'unda değil. Ek: `tsc --checkJs --strict` probe + `drift.mjs` üzerinde 0 hata (JSDoc tipleri).
- **Servisler:** başlatılan bütün yerel süreçler (next-A, next-B, WAF proxy, kapısız sunucu, sahte üst-akış, sayaç) PID'iyle kapatıldı. Portlar dolu → boş ölçüldü (3217/3218/3219/3220 son ölçüm: boş).
- **Canlıda 429:** `kanal: UAT`, koşulmadı (TASK-19.06 / 19.07 / verify-phase).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-10-02

**Ne Yapıldı:**
- `ops/probe-chat-guard.mjs`: `/api/chat`'in origin kapısını (403) ve WAF hız sınırını (429) verilen host'a karşı ölçen, elle tetiklenen, model çağırmayan probe. Çıkış 0/1/2. Tek sabit geçersiz gövde, açılışta invariant kontrolü.
- Yerelde anahtarsız 403·403·503 ve anahtarlı 403·403·400 (çıkış 0). Sahte üst-akış sayacıyla üst-akış çağrısı 0, pozitif kontrol 1. Bozuk girdi (kapısız route, WAF taklidi) beklenen kırmızıları verdi.
- TESTING.md'ye "Canlı Katman (elle, CI dışı)" bölümü eklendi.

**Öğrenilenler:**
- Probe gibi elle koşulan kabul araçlarında yerelde hiç tetiklenmeyen dal (burada 429) küçük bir taklit sunucuyla oturum içinde koşulabilir. Canlıya çıkana dek dalın sınanmamış kalmasının önüne geçer.

---

**Oluşturulma:** 2026-10-02
