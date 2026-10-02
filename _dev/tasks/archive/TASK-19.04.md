# TASK-19.04: WAF hız sınırı kuralının repo'daki spec'i + drift kontrol script'i

**Durum:** ✅ Tamamlandı
**Modül:** M5-Chatbot-API (+M6-SEO-Deploy) (modules/M5-Chatbot-API.md, modules/M6-SEO-Deploy.md)
**Feature:** TB-G2 — `/api/chat` kota koruması (hız sınırı katmanı)
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** TASK-19.03 ✅ (sıra; teknik bağımlılık yok — origin katmanından bağımsız)

---

## Hedef

Vercel WAF rate-limit kuralının **tek doğru tanımını** repo'ya koy: `ops/firewall/chat-rate-limit.json`. Bu dosya, `vercel firewall rules add/edit --json` komutunun doğrudan tükettiği payload'dır. Yanına canlı kuralı spec'le karşılaştıran bağımlılıksız bir drift script'i yaz: `ops/firewall/drift.mjs`. Script'in karşılaştırma mantığını Vitest node ile test et. Bu task **canlıya dokunmaz**: publish yok. Task, spec CLI'ın kabul ettiği şemayla doğrulandığında ve drift mantığı testte geçtiğinde biter.

---

## Bağlam

Kural repo'da kod olarak yaşamalı; bu bir kullanıcı kararıdır (ILKELER kalıcılık). Dashboard'da tek başına duran kural görünmez drift olur. Research'ün ölçümüne göre `vercel.json` hız sınırı tanımlayamaz ve Hobby'de deploy'la uygulanan config-as-code yoktur. Bu yüzden taahhüt şu ölçüde daraldı: **tanım repo'da, uygulama CLI ile, publish kullanıcıda, drift script'le görünür** (DECISIONS 2026-10-02).

Kuralın değerleri karara bağlı:
- Koşul `path eq /api/chat` VE `method eq POST`.
- `fixed_window`, **600 s**, **6 istek**, anahtar `ip`, aşımda **429** (`rate_limit`).

Konum ve ad bu planda seçildi: dosya `ops/firewall/`, kural adı `chat-rate-limit`.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-19.md` → Araştırma Bulguları → "TB-G2 — hız sınırı", Kullanılacak Araçlar (CLI komutları), Uygulama tuzakları (publish canlıya anında dokunur, Hobby kural bütçesi)
- `_dev/docs/DECISIONS.md` → 2026-10-02 "`/api/chat` kota koruması" kararı
- `vercel firewall rules add --help` · `vercel firewall rules inspect --help` — JSON şemasının ve bayrakların kaynağı (kurulu CLI 59.26.0)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum

---

## Alt Görevler

- [x] **1. Spec'i yaz — `ops/firewall/chat-rate-limit.json`**
  - `vercel firewall rules add --json` payload'ı: `name: "chat-rate-limit"`, `description`, `active: true`, `conditionGroup` (path + method, AND), `action.mitigate` (`action: "rate_limit"`, `rateLimit`: algo/window/limit/keys/action).
  - Alan adlarını **tahminle yazma.** Şemayı CLI yardımından ve Vercel firewall API dokümanından doğrula (Çalışma Prensibi #11). CLI örneği yalnız `conditionGroup` + `action.mitigate.action`'ı gösteriyor; `rateLimit` alt alanlarının adları bu oturumda kaynaktan teyit edilmeli.
  - JSON yorum taşıyamaz. Kuralın neden bu değerde olduğu `drift.mjs`'in başlık yorumunda ve DECISIONS'ta yaşar.

- [ ] **2. Gerçek `inspect` çıktısını öğren (canlıya dokunmadan)** — *kısmen: salt-okuma ayakları yapıldı; stage → inspect → discard koşum brief'inin "Firewall'a yazan komut yok" yasağıyla koşulmadı → TASK-19.06'nın stage adımına devredildi (Oturum Kaydı)*
  - `vercel firewall diff` → başlangıçta draft yok olmalı. Varsa **dur**: başka bir değişiklik bekliyor, kullanıcıya sor.
  - Spec'i draft olarak stage et: `vercel firewall rules add --json "$(cat ops/firewall/chat-rate-limit.json)"`. CLI şemayı kabul etmeli; reddederse spec'i düzelt.
  - `vercel firewall rules inspect chat-rate-limit --json` → gerçek çıktı biçimini kaydet (id/zaman damgası gibi alanlar dahil). `inspect` bekleyen draft varsa draft'ı, yoksa canlı kuralı okur (CLI 59.26.0 kaynağı: `config = draft ?? active`; verify-plan 2026-10-02). Stage edilen kural bu yüzden burada görünür.
  - `vercel firewall diff` → yalnız bu kural görünmeli → **`vercel firewall discard`** ile draft'ı geri al. Publish TASK-19.06'da, önce `log` modunda yapılacak. Discard'dan önce diff'te başka değişiklik olmadığını gör; discard bütün draft'ları siler.
  - Bu adım **publish içermez**; canlı firewall `Not configured` kalır (`vercel firewall overview` ile teyit).

- [x] **3. Drift script'i — `ops/firewall/drift.mjs`**
  - Bağımlılıksız Node (ESM). İki parça:
    - (a) Dışa açık saf fonksiyon `compareRule(spec, live)` → `{ drift: boolean, diffs: [...] }`. Yalnız anlamlı alanları karşılaştırır: `name`, `active`, `conditionGroup`, `action.mitigate`. id, zaman damgası ve sunucunun eklediği varsayılan alanları yok sayar. Hangi alanların sunucu tarafından eklendiğini 2. adımdaki gerçek çıktıdan belirle.
    - (b) CLI girişi: `vercel firewall rules inspect chat-rate-limit --json`'ı `execFile` ile koşar, spec'i okur, farkı insan-okur biçimde basar.
    - (c) Draft uyarısı: inspect'ten önce `vercel firewall diff --json`'ı koşar. Bekleyen değişiklik varsa "karşılaştırılan draft'tır, canlı kural değil" uyarısını basar. Çıkış kodu uyarıdan etkilenmez; böylece 2. adımın draft'a karşı ölçümü geçerli kalır, ama ileride draft beklerken koşan biri canlıyı ölçtüğünü sanmaz.
  - Çıkış kodları: 0 = eşleşiyor · 1 = drift · 2 = kural yok / CLI hatası.
  - Başlık yorumu: ne işe yaradığı, nasıl koşulduğu (`node ops/firewall/drift.mjs`), draft beklerken neyi ölçtüğü (draft-önce `inspect`), spec'in nasıl uygulandığı (`rules add/edit --json` → `diff` → `publish`'i **kullanıcı** koşar), değerlerin gerekçesi (6/10 dk = 864/gün < 1.000 günlük kota) ve DECISIONS 2026-10-02 pointer'ı.

- [x] **4. Test — `tests/firewall-drift.test.ts`**
  - `compareRule` için:
    - Spec ile aynı canlı kural (sunucu alanlarıyla zenginleştirilmiş, 2. adımdaki gerçek biçimden türetilmiş fixture) → drift yok.
    - `limit` 6 → 10 · `window` 600 → 60 · `rateLimit.action` `rate_limit` → `log` · `active: false` · koşul path değişikliği → her biri drift, ve `diffs` doğru alanı adlandırıyor.
  - Fixture'da hesap/proje kimliği gibi değerler varsa çıkar ya da sahte değerle değiştir (public repo).
  - Testin aynı zamanda spec dosyasını okuyup kararın değerlerini (`/api/chat`, POST, 600, 6, `ip`) assert etmesi, spec'in kazara değiştirilmesine karşı ikinci kilit olur.

---

## Etkilenen Dosyalar

```
ops/firewall/
├── chat-rate-limit.json       # YENİ — WAF kuralının tek doğru tanımı (CLI payload'ı)
└── drift.mjs                  # YENİ — canlı kural ↔ spec karşılaştırması
tests/
└── firewall-drift.test.ts     # YENİ — Vitest node (compareRule + spec değerleri)
```

---

## Dikkat Noktaları

- **Publish YOK.** `vercel firewall publish` canlıya anında dokunur, deploy'dan bağımsızdır. Bu task yalnız stage → inspect → discard yapar. Publish TASK-19.06'da, **kullanıcı** tarafından yapılır.
- **Hobby kural bütçesi:** toplam 3 custom rule, bunun 1'i rate-limit. Draft'ın stage edilmesi bütçeyi tüketmez, ama `discard` unutulursa TASK-19.06 temiz başlamaz.
- **Yeni npm paketi yok** (`@vercel/firewall` elendi); `package.json` dokunulmaz. Script yalnız Node yerleşikleri + kurulu `vercel` CLI kullanır.
- `ops/` `.gitignore`'da değil; `.vercel/` gitignore'da — spec'i oraya koyma.
- `tsconfig` `allowJs: true`, `include` `**/*.ts` → `.mjs` dosyası tip kontrolüne girmez, `.ts` test onu import edebilir. `next build` `tests/`'i tip kontrol eder; test strict geçmeli.
- **Import yan etkisiz olmalı.** Test `drift.mjs`'i import eder; CLI girişi (b) yalnız script doğrudan koşulduğunda çalışmalı (ör. `import.meta.url === pathToFileURL(process.argv[1]).href` kapısı). Aksi hâlde `npm run test` her koşuda `vercel` CLI'ı çağırır.
- Kural adı `chat-rate-limit` spec, script ve sonraki task'larda **aynı** kalır.

---

## Test Kriterleri

- [ ] CLI spec'i kabul ediyor: `vercel firewall rules add --json` draft'ı oluşturdu, `vercel firewall diff` yalnız `chat-rate-limit`'i gösterdi. — `kanal: TASK-19.06` (koşum brief'i Firewall'a yazmayı yasakladı). Yerine salt-okuma: CLI'ın kendi `handleJsonAdd` doğrulaması spec'i kabul etti (rc 0) + OpenAPI kural şeması geçti.
- [ ] 2. adımın draft'ına karşı `node ops/firewall/drift.mjs` → çıkış 0 (stage edilen kural spec'le eşleşiyor) ve çıktı draft uyarısını basıyor. Bunu discard'dan **önce** koş; çıkış kodu oturum kaydına. — `kanal: TASK-19.06` (aynı gerekçe). Yerine: sahte `vercel` ikilisiyle draft senaryosu → çıkış 0 + draft uyarısı.
- [x] Discard sonrası: `vercel firewall diff` boş, `vercel firewall overview` → `Not configured`. `node ops/firewall/drift.mjs` → çıkış 2 (kural yok), draft uyarısı yok. — discard'sız: hiç stage edilmediği için başlangıç ve bitiş hâli aynı, gerçek Vercel'e karşı ölçüldü.
- [x] `npx vitest run tests/firewall-drift.test.ts` → geçiyor; `npm run test` → tüm suite geçiyor.
- [x] `npm run build` temiz.

---

## Risk ve Geri Dönüş Planı

- **Risk:** Draft yanlışlıkla publish edilir → canlıda 6/10 dk sınırı erken başlar. Önlem: bu task'ta publish komutu yok; `discard` + `overview` teyidi. Olursa: `vercel firewall rules remove chat-rate-limit` + kullanıcı publish eder.
- **Risk:** `discard` başka bekleyen draft'ları da siler → 2. adımda diff boş değilse dur.
- **Rollback:** repo tarafı yeni dosyalardır; silmek yeter.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı (2. adımın stage → inspect → discard ayağı hariç — TASK-19.06'ya devredildi)
- [x] Tüm test kriterleri karşılandı (`kanal: TASK-19.06` olan iki kriter hariç)
- [x] Git commit & push yapıldı (`revize/v0.5-teknik-borc`)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-10-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **1. Spec** `ops/firewall/chat-rate-limit.json`: `name` · `description` · `active: true` · tek `conditionGroup` (`path eq /api/chat` VE `method eq POST`) · `action.mitigate` = `{ action: "rate_limit", rateLimit: { algo: "fixed_window", window: 600, limit: 6, keys: ["ip"], action: "rate_limit" }, redirect: null, actionDuration: null }`.
- **Şemanın kaynağı (tahmin yok):**
  - CLI 59.26.0 kaynağı (`dist/commands-bulk.js`). `buildActionFromFlags` rate-limit'i `{algo, window, limit, keys, action}` adlarıyla kuruyor. `handleJsonAdd` `name` / `conditionGroup[].conditions[].type,op` / `action.mitigate.action` arıyor ve API'ye yalnız `{name, description, active, conditionGroup, action}` gönderiyor (`PATCH …/firewall/config/draft`, `rules.insert`).
  - Vercel OpenAPI (`openapi.vercel.sh`). PUT kural şeması `mitigate`'te `rateLimit` / `redirect` / `actionDuration` / `bypassSystem` / `logHeaders` taşıyor. GET "Read Firewall Configuration" kural öğesi sunucu tarafında `id`, `valid` ve `validationErrors` ekliyor.
- **2. Salt-okuma ayakları:** başlangıçta `vercel firewall diff --json` → `{"changes": []}`, `overview` → `Firewall Not configured`. `rules inspect chat-rate-limit --json` → çıkış 1. Agent modunda stdout'a `{"status":"error","reason":"not_found",…}` basıyor.
  - CLI kaynağı `inspect --json`'ın kuralı **olduğu gibi** bastığını gösteriyor (`outputJson2(client, rule)`, `config = draft ?? active`). Kural adı tam eşleşme yoksa **kısmi** eşleşmeyle de çözülüyor (`resolveRule`). `diff --json` → `{changes: [...]}`.
  - Takımın diğer 12 projesinde de özel kural yok (`rules list --json` → `rules: 0`). Gerçek bir sunucu çıktısı örneği bu yüzden okunamadı.
- **2. Koşulmayan ayak:** stage → inspect → discard koşulmadı. Koşum brief'i (madde 8) "Vercel Firewall'a yazan hiçbir komut koşma; yalnız okuma/drift ölçümü" diyor; `rules add` (draft PATCH) ve `discard` Firewall'a yazar. Gerçek sunucu biçimiyle karşılaştırma TASK-19.06'nın stage adımına kaldı → Sonraki Adım Detayı.
- **3. `ops/firewall/drift.mjs`:**
  - (a) Saf `compareRule(spec, live)` → `{drift, diffs[{path, spec, live}]}`. `name` ve `active` katı karşılaştırılır. `conditionGroup` ve `action.mitigate` için iki taraftaki boş varsayılanlar (null/false/[]/{}) budanır, sonra ağaç farkı alınır. `id`, `valid`, `validationErrors` ve `description` yok sayılır. Eksik spec hata fırlatır (boş kapsam kapısı).
  - (b) CLI girişi: `vercel … --json --non-interactive`, `execFile` ile ve `cwd` = repo kökü (her dizinden koşulabilir). Çıkış kodları 0/1/2.
  - (c) Önce `diff --json`: bekleyen değişiklik varsa "DRAFT" uyarısı basar, okunamazsa "ayırt edilemedi" der. Uyarı çıkış kodunu değiştirmez.
  - Import kapısı `import.meta.url === pathToFileURL(process.argv[1]).href`. Başlık yorumu task'ın istediği beş başlığı taşıyor; ek olarak TTY'de `--yes`'siz `rules add`'in "Publish to production now?" sorusu ve log aşamasında beklenen drift=1 notu var.
- **4. `tests/firewall-drift.test.ts`** (Vitest node, 20 test):
  - import yan etkisizliği (1);
  - spec değer kilidi (3);
  - eşleşme: minimal ve zenginleştirilmiş fixture (2);
  - drift + doğru alan adı (9 vaka + değer taşıma + nesne-olmayan canlı = 11);
  - boş kapsam → hata (3).
  - Fixture'lar sahte kimlikle `id/valid/validationErrors` ekler; zenginleştirilmiş olan `bypassSystem: null`, `logHeaders: []`, `neg: false` ve farklı `description` de taşır.

**Sorunlar:**
- **İlk sürümdeki import-yan-etkisi testi fail-open'dı:** kapı kaldırılmış mutant (M5) 20/20 yeşil kaldı. `main()` async, `execFile` ise spec okunduktan sonra çağrılıyor; assert ondan önce koşuyordu. Çözüm: `node:fs/promises` `readFile` da hiç çözülmeyen bir sözle sahtelendi ve ona da bakılıyor (`main()`'in senkron ilk işi) → M5 kırmızı.
- **OpenAPI `PATCH` `rules.insert` şeması `mitigate.action`'ı `deny|challenge|log` ile sınırlıyor ve `rateLimit` alanını hiç tanımıyor.** CLI ise rate_limit kuralını tam bu yoldan gönderiyor. Doküman ile CLI çelişiyor; sunucunun kabulü yalnız gerçek stage ile ölçülebilir → 19.06.

**Kararlar:**
- **Spec'te `redirect: null` ve `actionDuration: null` açıkça var.** `mitigate` nesnesi CLI'ın `--action rate_limit --rate-limit-window 600 --rate-limit-requests 6` bayraklarıyla kendi kurduğu nesneyle byte-düzeyinde aynı. Sunucunun kabul etmesi en olası biçim budur; ayrıca kalıcı eylem olmadığı spec'te görünür kalır.
- **Boş varsayılanların budanması:** sunucunun ekleyebileceği boş alanlar (null/false/[]/{}) spec'te yazılmamış alanla aynı sayılır. Dolu bir ekleme (ör. `actionDuration: "5m"`) drift'tir. Gerçek çıktı görülemediği için muhafazakâr seçim bu.
- **`description` karşılaştırılmaz** (task: yalnız `name`, `active`, `conditionGroup`, `action.mitigate`).
- **`--non-interactive` her çağrıya eklenir:** hata çıktısı her ortamda JSON (`reason`/`message`) olsun diye.
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari karar yok; değerler DECISIONS 2026-10-02'de).

**Kalan İşler:**
- Test kriteri 1 (CLI/sunucu spec'i kabul ediyor) ve 2 (draft'a karşı drift 0 + draft uyarısı) → **TASK-19.06'nın stage adımı**.

**Son Yaklaşım:** Gerçek sunucu çıktısı görülemediği için `compareRule` boş varsayılanlara toleranslı, dolu sapmaya katı. Gerçek biçimdeki bilinmeyen dolu bir alan publish'ten önce drift olarak görünür.

**Sonraki Adım Detayı:** TASK-19.06 spec'i stage edince (`rules add --json "$(cat ops/firewall/chat-rate-limit.json)" --yes` ya da log varyantı) publish'ten **önce** `node ops/firewall/drift.mjs` koşmalı.
- Spec olduğu gibi stage edildiyse beklenen: çıkış 0 + DRAFT uyarısı.
- Log varyantıysa beklenen: çıkış 1 ve **tek** diff `action.mitigate.rateLimit.action: spec="rate_limit" · vercel="log"`.
- Başka bir diff satırı çıkarsa gerçek sunucu biçimi fixture'dan farklıdır: `compareRule` ve fixture o çıktıya göre düzeltilir, sonra publish edilir.
- Aynı adım OpenAPI PATCH çelişkisini de çözer: `rules add` reddedilirse spec düzeltilir.

**Dosya Değişiklikleri:**
- `ops/firewall/chat-rate-limit.json` → YENİ: WAF kuralının tek doğru tanımı (CLI `--json` payload'ı).
- `ops/firewall/drift.mjs` → YENİ: `compareRule` + CLI girişi + draft uyarısı.
- `tests/firewall-drift.test.ts` → YENİ: 20 test.

**Test Sonuçları:**
<!-- KURAL: Ölçüm kimliğiyle yazılır — ne çalıştırıldı ve hangi kapsamda ("yalnız auth uçları", "serve tarafı hariç"). Ölçülmeyen ekseni kapsıyormuş gibi okunan çıplak iddia yazma: "X temiz" değil "X, Y kapsamında temiz". -->
- `npx vitest run tests/firewall-drift.test.ts` → 20/20.
- `npm run test` → 10 dosya / 141 test geçti. Taban, yeni dosya hariç tutularak aynı oturumda ölçüldü: 9 / 121.
- `npx tsc --noEmit` → 0. `--listFiles` hem `drift.mjs`'i hem testi içeriyor.
- `npm run build` → çıkış 0.
- Yerel e2e koşulmadı: UI değişmedi, `:3000` tuzağı var; CI olağan koşar.
- **Spec doğrulaması (salt-okuma, ağsız):**
  - CLI 59.26.0'ın `handleJsonAdd` + `buildActionFromFlags` gövdeleri bundle'dan kesildi; `createRule2` yakalayıcıyla değiştirilerek scratch'te koşuldu → spec için rc 0, hata yok.
  - `mitigate` CLI'ın bayrak yoluyla kurduğu nesneyle özdeş (`true`). Bozuk girdi (`mitigate.action` silinmiş) → rc 1 + CLI hata mesajı.
  - OpenAPI PUT kural şeması (minimal doğrulayıcı) → 0 hata. `rateLimit`'in katı alternatifine karşı da geçti. Bozuk girdi (`algo: "sliding"` + fazladan alan) → ikisi de reddedildi.
  - Kontrol grubu: tam şema `rateLimit`'te `{}` alternatifi taşıdığı için `algo`'yu yakalamadı, yalnız katı alternatif yakaladı.
- **Kapı sınaması — mutantlar (scratch kopya, kaynak dokunulmadı; 20 testlik suite):**
  - M0 (değişmemiş) → 20 yeşil.
  - M1 her zaman eşleşir → 11 kırmızı.
  - M2 `false` budanmaz → 10 kırmızı.
  - M3 `assertSpec` boş → 3 kırmızı.
  - M4 `active` atlanır → 2 kırmızı.
  - M5 import kapısı yok → ilk testte **20 yeşil** (fail-open, → Sorunlar), düzeltmeden sonra 1 kırmızı.
  - Bozuk girdi (scratch spec'te `limit` 6→10) → 3 kırmızı (değer kilidi + iki drift vakası).
- **CLI yolu uçtan uca (sahte `vercel` ikilisi, PATH'te; Vercel'e istek yok; `/tmp`'den koşuldu):**
  - Draft + eşleşen kural → çıkış 0 + "DRAFT" uyarısı.
  - `not_found` → 2, uyarı yok.
  - `limit` 10 → 1 + tek diff satırı.
  - `diff` hatası → "ayırt edilemedi" uyarısı + 0.
  - `vercel` PATH'te yok → 2.
  - Çağrılar `cwd` = repo kökü ve `--non-interactive` ile gitti.
- **Gerçek Vercel, salt-okuma (2026-10-02T15:02Z):** `node ops/firewall/drift.mjs` → çıkış **2** (`not_found: No rule found for "chat-rate-limit".`), draft uyarısı yok. Ardından `diff --json` → `{"changes": []}`, `overview` → `Firewall Not configured`. Bu oturum Firewall'a hiç yazmadı.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-10-02

**Ne Yapıldı:**
- WAF hız sınırı kuralının tek doğru tanımı repo'da (`ops/firewall/chat-rate-limit.json`). Spec, CLI'ın kendi doğrulamasından ve Vercel OpenAPI kural şemasından ağsız geçti.
- `ops/firewall/drift.mjs` Vercel'deki kuralı spec'le karşılaştırıyor (0/1/2, draft uyarısı). Mantığı 20 Vitest testiyle mühürlü (suite 121 → 141). Gerçek Vercel'e karşı çıkış 2 (kural yok).
- Stage → inspect → discard ayağı koşum yasağıyla koşulmadı → TASK-19.06'nın stage adımı. Bu oturumda Firewall'a yazılmadı.

**Öğrenilenler:**
- Async CLI girişinin import kapısını yalnız `execFile` mock'uyla ölçmek fail-open'dır. Girişin **senkron** ilk işini de ölç.

---

**Oluşturulma:** 2026-10-02
