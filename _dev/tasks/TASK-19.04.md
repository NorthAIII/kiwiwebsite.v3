# TASK-19.04: WAF hız sınırı kuralının repo'daki spec'i + drift kontrol script'i

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Spec'i yaz — `ops/firewall/chat-rate-limit.json`**
  - `vercel firewall rules add --json` payload'ı: `name: "chat-rate-limit"`, `description`, `active: true`, `conditionGroup` (path + method, AND), `action.mitigate` (`action: "rate_limit"`, `rateLimit`: algo/window/limit/keys/action).
  - Alan adlarını **tahminle yazma.** Şemayı CLI yardımından ve Vercel firewall API dokümanından doğrula (Çalışma Prensibi #11). CLI örneği yalnız `conditionGroup` + `action.mitigate.action`'ı gösteriyor; `rateLimit` alt alanlarının adları bu oturumda kaynaktan teyit edilmeli.
  - JSON yorum taşıyamaz. Kuralın neden bu değerde olduğu `drift.mjs`'in başlık yorumunda ve DECISIONS'ta yaşar.

- [ ] **2. Gerçek `inspect` çıktısını öğren (canlıya dokunmadan)**
  - `vercel firewall diff` → başlangıçta draft yok olmalı. Varsa **dur**: başka bir değişiklik bekliyor, kullanıcıya sor.
  - Spec'i draft olarak stage et: `vercel firewall rules add --json "$(cat ops/firewall/chat-rate-limit.json)"`. CLI şemayı kabul etmeli; reddederse spec'i düzelt.
  - `vercel firewall rules inspect chat-rate-limit --json` → gerçek çıktı biçimini kaydet (id/zaman damgası gibi alanlar dahil). `inspect` bekleyen draft varsa draft'ı, yoksa canlı kuralı okur (CLI 59.26.0 kaynağı: `config = draft ?? active`; verify-plan 2026-10-02). Stage edilen kural bu yüzden burada görünür.
  - `vercel firewall diff` → yalnız bu kural görünmeli → **`vercel firewall discard`** ile draft'ı geri al. Publish TASK-19.06'da, önce `log` modunda yapılacak. Discard'dan önce diff'te başka değişiklik olmadığını gör; discard bütün draft'ları siler.
  - Bu adım **publish içermez**; canlı firewall `Not configured` kalır (`vercel firewall overview` ile teyit).

- [ ] **3. Drift script'i — `ops/firewall/drift.mjs`**
  - Bağımlılıksız Node (ESM). İki parça:
    - (a) Dışa açık saf fonksiyon `compareRule(spec, live)` → `{ drift: boolean, diffs: [...] }`. Yalnız anlamlı alanları karşılaştırır: `name`, `active`, `conditionGroup`, `action.mitigate`. id, zaman damgası ve sunucunun eklediği varsayılan alanları yok sayar. Hangi alanların sunucu tarafından eklendiğini 2. adımdaki gerçek çıktıdan belirle.
    - (b) CLI girişi: `vercel firewall rules inspect chat-rate-limit --json`'ı `execFile` ile koşar, spec'i okur, farkı insan-okur biçimde basar.
    - (c) Draft uyarısı: inspect'ten önce `vercel firewall diff --json`'ı koşar. Bekleyen değişiklik varsa "karşılaştırılan draft'tır, canlı kural değil" uyarısını basar. Çıkış kodu uyarıdan etkilenmez; böylece 2. adımın draft'a karşı ölçümü geçerli kalır, ama ileride draft beklerken koşan biri canlıyı ölçtüğünü sanmaz.
  - Çıkış kodları: 0 = eşleşiyor · 1 = drift · 2 = kural yok / CLI hatası.
  - Başlık yorumu: ne işe yaradığı, nasıl koşulduğu (`node ops/firewall/drift.mjs`), draft beklerken neyi ölçtüğü (draft-önce `inspect`), spec'in nasıl uygulandığı (`rules add/edit --json` → `diff` → `publish`'i **kullanıcı** koşar), değerlerin gerekçesi (6/10 dk = 864/gün < 1.000 günlük kota) ve DECISIONS 2026-10-02 pointer'ı.

- [ ] **4. Test — `tests/firewall-drift.test.ts`**
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

- [ ] CLI spec'i kabul ediyor: `vercel firewall rules add --json` draft'ı oluşturdu, `vercel firewall diff` yalnız `chat-rate-limit`'i gösterdi.
- [ ] 2. adımın draft'ına karşı `node ops/firewall/drift.mjs` → çıkış 0 (stage edilen kural spec'le eşleşiyor) ve çıktı draft uyarısını basıyor. Bunu discard'dan **önce** koş; çıkış kodu oturum kaydına.
- [ ] Discard sonrası: `vercel firewall diff` boş, `vercel firewall overview` → `Not configured`. `node ops/firewall/drift.mjs` → çıkış 2 (kural yok), draft uyarısı yok.
- [ ] `npx vitest run tests/firewall-drift.test.ts` → geçiyor; `npm run test` → tüm suite geçiyor.
- [ ] `npm run build` temiz.

---

## Risk ve Geri Dönüş Planı

- **Risk:** Draft yanlışlıkla publish edilir → canlıda 6/10 dk sınırı erken başlar. Önlem: bu task'ta publish komutu yok; `discard` + `overview` teyidi. Olursa: `vercel firewall rules remove chat-rate-limit` + kullanıcı publish eder.
- **Risk:** `discard` başka bekleyen draft'ları da siler → 2. adımda diff boş değilse dur.
- **Rollback:** repo tarafı yeni dosyalardır; silmek yeter.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`revize/v0.5-teknik-borc`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(task çalıştırıldığında doldurulur)_

---

**Oluşturulma:** 2026-10-02
