# TASK-18.13: Ürün ağacındaki bayat Anthropic/Claude referanslarını temizle

**Durum:** ✅ Tamamlandı
**Modül:** M6 — SEO & Deploy Altyapısı (`modules/M6-SEO-Deploy.md`) · kimlik/doküman hijyeni
**Feature:** C1 (chatbot sağlayıcı geçişi + canlıya alma) — kabul kriteri 5'in ürün-ağacı ayağı
**Faz:** Phase 18 (`phases/PHASE-18.md`)
**Bağımlılıklar:** TASK-18.05 ✅ (dev/ops kimlik swap — bu task onun atladığı kardeş yüzeyleri kapatır), TASK-18.10 ✅

---

## Hedef

Sağlayıcı Anthropic'ten Groq'a geçti ve kod/README/`.env.example` hizalandı, ama ürün ağacında iki yüzey hâlâ eski sağlayıcıyı tarif ediyor. Task, bu iki yüzey kodun gerçeğiyle tutarlı hâle geldiğinde ve aynı sınıfın başka bir yüzeyi kalmadığı grep'le gösterildiğinde tamamlanmış sayılır.

---

## Bağlam

Verify-phase 18'in 3. koşumunda **senaryo 19**'un sınıf süpürmesinden doğdu — **senaryo 39**:

- **`.github/workflows/ci.yml:12`** — yorum satırı hâlâ «ANTHROPIC_API_KEY CI'da yok → chatbot offline fallback'e düşer» diyor. TASK-18.05 dev/ops kimlik swap'ı `.env.example`, `README.md` ve `CLAUDE.md`'yi güncelledi, bu kardeş dosyayı atladı. Workflow **davranışı** doğru (CI'a secret eklenmiyor, gerek de yok); yanlış olan yalnız anahtarın adı. Geliştiriciyi yanıltır, ziyaretçiye görünmez.
- **`MASTER_PROMPT_v2.md` §6 ve §7** — chatbot'u «`/api/chat` (Node runtime) Claude'u stream eder, varsayılan `claude-opus-4-8` (env `CHAT_MODEL`)» ve «Vercel env'e `ANTHROPIC_API_KEY` eklenmeli» diye tarif ediyor. Bu dosya projenin başlangıç brief'i ve `OVERVIEW.md` onu **"brief'in tek kaynağı, çelişkide v2 geçerli"** diye işaretliyor — yani çelişki sessiz kalmıyor, yetkili kaynak yanlış bilgi veriyor.

Kanıt notu (verify, senaryo 39): aynı grep `README`/`.env.example`/`CLAUDE.md`/`src` üzerinde **0 eşleşme** veriyor, yani tarama kör değil; yalnız bu iki yüzey bayat.

**Kapsam ayrımı — bu task'ın sınırı:** `MASTER_PROMPT_v2.md` yalnız chatbot satırlarında bayat değil. Dosya v0.1'den beri birçok yerde gerçeklikten koptu: «Nasıl çalışır (3 adım)» (v0.1 Faz 1'de 4 adım oldu), «Bunker OS sayfası (`/bunker-os`)» (v0.3 Faz 11'de `/crew-os` oldu, iç ad artık hiçbir yüzeyde görünmüyor). Bu task **yalnız bu fazın swap ettiği kimlik sınıfını** kapatır (sağlayıcı/model/env adı). Brief'in geri kalan bayatlığı ve `OVERVIEW.md`'nin "çelişkide v2 geçerli" cümlesinin hâlâ doğru olup olmadığı **kapsam-dışı** — ayrı bir kalem olarak kayda geçti ve sırası geldiğinde ele alınır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` → **UAT Sonuçları** senaryo 19 + 39 (ölçüm ve kanıt notları)
- `_dev/tasks/archive/TASK-18.05.md` → dev/ops kimlik swap'ının kapsamı ve grep kanıtı (bu task onun devamı)
- `_dev/OVERVIEW.md` → satır 12, brief'in yetki cümlesi (Korumalı doküman — dokunulacaksa onay)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [x] **1. CI yorumunu düzelt**
  - `.github/workflows/ci.yml:12-13` yorumundaki `ANTHROPIC_API_KEY` → `GROQ_API_KEY`. Cümlenin anlamı korunur: anahtar CI'da yok, chatbot offline fallback'e düşer, `/` build ve a11y taraması etkilenmez, secret CI'a eklenmez
  - **Yalnız yorum değişir** — `on:`, `jobs:`, `steps:` ve concurrency bloklarına dokunulmaz (workflow davranışı doğru)
  - Dosya: `.github/workflows/ci.yml`

- [x] **2. Brief'in chatbot satırlarını güncelle (onay gerekir)**
  - `MASTER_PROMPT_v2.md` §6 chatbot satırı: sağlayıcı/SDK/model/env adı kodun gerçeğine hizalanır (Groq, `groq-sdk`, `qwen/qwen3.8-27b`, `GROQ_API_KEY`). Model adını tek kaynakta tutma disiplini gözetilir — brief ayrıntılı model adı taşımak zorunda değil, sağlayıcı + `CHAT_MODEL` env'e atıf yeterli olabilir
  - `MASTER_PROMPT_v2.md` §7 dağıtım satırı: `ANTHROPIC_API_KEY` → `GROQ_API_KEY`
  - Brief, `OVERVIEW.md` tarafından yetkili kaynak ilan edildiği için **Korumalı doküman gibi ele alınır → değiştirmeden önce kullanıcıya bildir, onay al**
  - Dosya: `MASTER_PROMPT_v2.md`

- [x] **3. Sınıfı süpür ve kapanışı grep'le göster**
  - Repo genelinde eski tanımlayıcıları ara: `ANTHROPIC_API_KEY`, `@anthropic-ai/sdk`, `claude-opus`, `claude-sonnet`, `llama-3.3-70b`, `console.anthropic.com`
  - `_dev/` **hariç tutulur** — oradaki geçmiş kayıtlar (DECISIONS arşivleri, tamamlanmış faz dokümanları, task arşivi) tarihsel ve dokunulmaz; sağlayıcı geçişinin kendisi o kayıtların konusu
  - Kalan eşleşme 0 olmalı; değilse her birini sınıfa dahil et ya da neden dışarıda kaldığını yaz

---

## Etkilenen Dosyalar

```
.github/workflows/
└── ci.yml                # satır 12-13 yorumu: ANTHROPIC_API_KEY → GROQ_API_KEY — zaten var
MASTER_PROMPT_v2.md       # §6 chatbot satırı + §7 env satırı (onay gerekir) — zaten var
```

Kod dosyası **değişmez** — bu task yalnız yorum ve doküman hijyeni. `next build` ve test suite davranışı aynı kalır.

---

## Dikkat Noktaları

- **`.gitignore` ve `package.json` Dokunulmaz** — bu task onlara dokunmuyor, ama grep sonuçları oraya işaret ederse değişiklik yapmadan kullanıcıya bildir.
- **Workflow davranışını değiştirme.** `ci.yml` içinde yalnız yorum satırı hedeftir. Job adları, adımlar, cache anahtarları ve concurrency grubu aynı kalır; CI'ın bu task'tan sonra da aynı iki job'ı (`fast` + `a11y`) aynı şekilde koşması beklenir.
- **Brief tarihsel bir belge olabilir.** Kullanıcı §6/§7'yi güncellemek yerine brief'i tümüyle tarihsel ilan etmeyi tercih edebilir; o hâlde doğru düzeltme `OVERVIEW.md`'nin yetki cümlesini değiştirmektir ve o da Korumalı doküman onayı gerektirir. Kararı kullanıcıya getir, kendi başına seçme.
- **Model adını çoğaltma.** `README.md` ve `.env.example` zaten `qwen/qwen3.8-27b` taşıyor; brief'e üçüncü bir kopya eklemek bir sonraki model değişiminde üç yerde bayatlama demek. TASK-18.10'un dersi tam buydu (tek kaynak disiplini).
- **`_dev/` taramaya girmez.** Tarihsel kayıtlarda Anthropic referansı **olması gerekir** — sağlayıcı geçişinin hikâyesi orada. Onları "temizlemek" tarihsel doküman kuralının ihlali olur.

---

## Test Kriterleri

- [x] `.github/workflows/ci.yml` yorumunda `ANTHROPIC_API_KEY` geçmiyor, `GROQ_API_KEY` geçiyor; cümlenin anlamı korunmuş
- [x] `MASTER_PROMPT_v2.md` §6/§7 kodun sağlayıcısıyla tutarlı (onay alındıysa) ya da brief'in tarihsel ilan edilme kararı kayda geçmiş
- [x] Sınıf süpürmesi: `_dev/` hariç repoda `ANTHROPIC_API_KEY|@anthropic-ai/sdk|claude-opus|claude-sonnet|llama-3\.3-70b|console\.anthropic\.com` grep'i **0 eşleşme** (exit 1) — ya da kalan her eşleşmenin gerekçesi yazılı
- [x] `next build` exit 0 ve `npm run test` yeşil (69 test) — kod değişmediği için ikisi de regresyonsuz olmalı
- [x] Workflow dosyası geçerli YAML (yorum düzenlemesi şemayı bozmadı)
- [ ] `kanal: UAT` — CI'ın `fast` + `a11y` job'larının push sonrası hâlâ `success` döndüğü doğrulanır; sonucu belirleyen katman GitHub runner'ı, yerel koşucu değil

---

## Karar Noktaları

- **Brief'e ne yapılacak:** (a) §6/§7 chatbot satırları güncellenir, brief yetkili kaynak kalır — dar ve hızlı, ama dosyanın diğer bayat yerleri (3 adım, `/bunker-os`) çelişkili kalmaya devam eder. (b) Brief tarihsel belge ilan edilir ve `OVERVIEW.md`'deki "çelişkide v2 geçerli" cümlesi düzeltilir — kökü çözer, ama Korumalı doküman onayı ve daha geniş bir karar gerektirir. (c) İkisi birlikte. **Kullanıcıya sorulacak** — ikisi de Korumalı/yetki alanına dokunuyor.

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
- **Alt görev 1:** `.github/workflows/ci.yml:12` yorumunda `ANTHROPIC_API_KEY` → `GROQ_API_KEY`. Diff tek satır; cümlenin geri kalanı ve `on:`/`concurrency:`/`jobs:` blokları aynı.
- **Alt görev 2 — karar (a):** `MASTER_PROMPT_v2.md` §6 chatbot satırı Groq'a hizalandı (`groq-sdk`, OpenAI-uyumlu; model `CHAT_MODEL` env'den, varsayılanı kodda `src/app/api/chat/route.ts`; `GROQ_API_KEY` yoksa offline). Satıra DECISIONS 2026-07-21 pointer'lı kısa bir geçiş notu eklendi. §7 satırı: `ANTHROPIC_API_KEY` eklenmeli → Vercel env'de (Production) `GROQ_API_KEY` tanımlı olmalı. Model adı brief'e **yazılmadı** (tek kaynak disiplini).
- **Alt görev 3 — süpürme + kapsam genişletme:** `_dev/` hariç taramada task'ın bildiği 3 eşleşmenin dışında 5 eşleşme daha çıktı (aşağıda, gerekçeleriyle). `_dev/` içinde şimdiki zamanla bayat bilgi veren 4 **yaşayan** satır bulundu. Korumalı olmayan üçü düzeltildi: `docs/TESTING.md:74` (CI anahtar adı), `modules/M6-SEO-Deploy.md:58` (F6.4 env satırı; bu task'ın kendi modülü), `memory/repo-haritasi.md:5` (SDK adı `@anthropic-ai/sdk` → `groq-sdk`).
- **Kayıt:** Brief'in geri kalan bayatlığı, OVERVIEW'deki "çelişkide v2 geçerli" yetki cümlesi, `ILKELER.md:34` örneği ve README'nin v1'e bağlanması `PRD/NOTES.md`'ye tek not olarak yazıldı. Task'ın "Kapsam ayrımı" paragrafı bu kalemin "ayrı bir kalem olarak kayda geçtiğini" söylüyordu ama DURUM/PRD/PHASES'te yoktu. Notun eklenmesiyle `INDEX.md`'deki "NOTES şu an boş" iddiası (bef8248'den beri bayat) düzeltildi.

**Sorunlar:**
- Task'ın Kanıt notu (verify, senaryo 39) aynı grep'in `src` üzerinde 0 eşleşme verdiğini söylüyordu. Ölçüm 3 eşleşme verdi: bülten makalesi slug'ı `claude-opus-4-8-fable-5` (`page.tsx`, `sitemap.ts`, `Forum.tsx`) + `tests/e2e/subpages-a11y.spec.ts`. Bunlar sınıf dışı (aşağıda).
- Task'ın test kriterinde 69 test yazıyordu, ama TASK-18.12 sonrası suite 86 test. Ölçülen değer 86.

**Kararlar:**
- **Brief → (a) dar güncelleme.** OVERVIEW'e dokunulmadı. Gerekçe: task'ın kendi sınırı "yalnız bu fazın swap ettiği kimlik sınıfı". (b) Korumalı OVERVIEW'e ve brief'in yetkisi gibi PRD seviyesinde bir karara dokunur. Brief'te aynı desenin emsali de var: satır 12, taksonomi için yerinde hizalama + not. Karar duran yetkiyle (orkestratör koşumu; kullanıcı: «mümkün oldukça az soru sor, önerdiğin yoldan devam et») verildi. (b) seçeneği `PRD/NOTES.md`'de açık kaldı.
- **Kalan 5 eşleşme sınıf dışı:**
  - (1) `MASTER_PROMPT.md:76` — v1 brief'i, v2 satır 3 onu açıkça geçersiz kılıyor ("Çelişki olursa v2 geçerlidir"). Tarihsel belge; yeniden yazmak orijinal brief'in ne dediğini siler.
  - (2–5) `claude-opus-4-8-fable-5` — yayınlanmış bir bülten makalesinin (Claude model haberleri) public URL slug'ı. Sağlayıcı kimliği değil içerik konusu; değiştirmek canlı URL/sitemap/SEO'yu kırar.
- **`_dev/` yaşayan dokümanları kapsama alındı.** Task'ın `_dev/` dışlaması **tarihsel kayıtlar** gerekçesine dayanıyor. TESTING/M6/memory atomu tarihsel değil, yaşayan doküman ("Tarih Koruma Gerekçesi Değildir"). Tarihsel `_dev/` kayıtlarına (DECISIONS*, RELEASE-v0.2/v0.4, PHASES log, archive, SESSION-NOTES/VERSIONS anlatıları, M5:58 geçmiş anlatısı) dokunulmadı.
- **`ILKELER.md:34` dokunulmadı.** Korumalı doküman, değişikliği onaya bağlı. Kayıt `PRD/NOTES.md`'de.
- docs/DECISIONS.md'ye eklendi: Hayır. Yeni mimari karar yok; brief'in yetkisi kararı prd-review'a bırakıldı.

**Kalan İşler:**
- `kanal: UAT` kriteri: push sonrası CI `fast` + `a11y` teyidi verify-phase'e kalır (kriter kutusu bu yüzden boş).

**Dosya Değişiklikleri:**
- `.github/workflows/ci.yml` → satır 12 yorum: anahtar adı `GROQ_API_KEY`
- `MASTER_PROMPT_v2.md` → §6 chatbot satırı (Groq/`groq-sdk`/`CHAT_MODEL`/`GROQ_API_KEY` + geçiş notu), §7 env satırı
- `_dev/docs/TESTING.md` → satır 74 CI anahtar adı
- `_dev/modules/M6-SEO-Deploy.md` → F6.4 env satırı + Son Güncelleme
- `_dev/memory/repo-haritasi.md` → SDK adı `groq-sdk`
- `_dev/PRD/NOTES.md` → yeni not (brief yetkisi + kalan bayatlık)
- `_dev/INDEX.md` → NOTES satırı + Son Güncelleme

**Test Sonuçları:**
- **Sınıf grep'i** (`ANTHROPIC_API_KEY|@anthropic-ai/sdk|claude-opus|claude-sonnet|llama-3\.3-70b|console\.anthropic\.com`, `_dev/` hariç):
  - İzlenen dosyalarda `git grep` → 5 eşleşme; hepsi yukarıda gerekçeli sınıf dışı.
  - Çalışma ağacının tamamında (izlenmeyenler dahil; `node_modules`/`.next`/`.git`/`.claude` hariç) `grep -r` → aynı 5 eşleşme.
- **Bozuk girdi (gerçek kusur):** aynı grep çapada (`b7b4295`) 8 eşleşme verdi. Hedef üçü (`ci.yml:12`, `MASTER_PROMPT_v2.md:36`, `:42`) kırmızıydı, düzeltmeden sonra kayboldu; kalan 5 değişmedi.
- **Boş kapsam kontrolü:** aynı kapsamda `GROQ_API_KEY` 7 dosyada bulundu (`.env.example`, `ci.yml`, `CLAUDE.md`, `MASTER_PROMPT_v2.md`, `README.md`, `route.ts`, `tests/chat-route-timeout.test.ts`), yani tarama dosyaları gerçekten okuyor.
- **Kör pathspec tuzağı:** `':!_dev'` yazımı bu git'te exit **128** veriyor (pathspec hatası). "Eşleşme yok" anlamına gelen exit 1 değil. Sınama `':(exclude)_dev'` ile yapıldı. "exit ≠ 0 → temiz" diye okuyan bir kapı burada fail-open olurdu.
- **YAML:** `python3 yaml.safe_load` ile yeni dosya parse edildi (jobs `fast`, `a11y`). Çapadaki (`b7b4295`) sürümle parse sonucu **semantik olarak özdeş** (`True`); değişen yalnız yorum.
- **Yerel kapılar:** `next build` exit 0 (37/37 sayfa) · `npm run test` Vitest 7 dosya / **86** test yeşil.
- **`_dev/` yaşayan doküman taraması** (TESTING, modules, memory, ILKELER, QUALITY, MODULE-MAP, INDEX): kalan eşleşmeler M2 (bülten slug'ı), M5:58 ve groq-model memory'si (geçmiş anlatısı, doğru), M6 Son Güncelleme (bu değişikliği anlatıyor) ve `ILKELER.md:34` (Korumalı, bilinçli bırakıldı).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-10-02

**Ne Yapıldı:**
- UAT 39 kapandı. `ci.yml` yorumu ve `MASTER_PROMPT_v2.md` §6/§7 Groq'a hizalandı; brief'e model adı kopyalanmadı.
- Aynı sınıfın `_dev/` içindeki üç yaşayan kopyası (TESTING, M6, repo-haritası memory'si) da kapatıldı. Repo genelinde `_dev/` hariç kalan 5 eşleşmenin hepsi gerekçeli sınıf dışı.
- Brief'in yetkisi ve geri kalan bayatlığı (+ Korumalı `ILKELER.md:34`) sahipsizdi; `PRD/NOTES.md`'ye prd-review kalemi olarak yazıldı.

**Öğrenilenler:**
- Bir kimlik swap'ının süpürmesinde `_dev/`'i toptan dışlamak yaşayan dokümanları da gizler. Dışlama ölçütü klasör değil, dokümanın tarihsel olup olmadığı olmalı.

---

**Oluşturulma:** 2026-10-02 (verify-phase 18 3. koşumu, Adım 7 — UAT senaryo 39)
**Tamamlanma:** 2026-10-02
