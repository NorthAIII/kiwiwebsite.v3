# TASK-18.13: Ürün ağacındaki bayat Anthropic/Claude referanslarını temizle

**Durum:** ⬜ Bekliyor
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

- [ ] **1. CI yorumunu düzelt**
  - `.github/workflows/ci.yml:12-13` yorumundaki `ANTHROPIC_API_KEY` → `GROQ_API_KEY`. Cümlenin anlamı korunur: anahtar CI'da yok, chatbot offline fallback'e düşer, `/` build ve a11y taraması etkilenmez, secret CI'a eklenmez
  - **Yalnız yorum değişir** — `on:`, `jobs:`, `steps:` ve concurrency bloklarına dokunulmaz (workflow davranışı doğru)
  - Dosya: `.github/workflows/ci.yml`

- [ ] **2. Brief'in chatbot satırlarını güncelle (onay gerekir)**
  - `MASTER_PROMPT_v2.md` §6 chatbot satırı: sağlayıcı/SDK/model/env adı kodun gerçeğine hizalanır (Groq, `groq-sdk`, `qwen/qwen3.8-27b`, `GROQ_API_KEY`). Model adını tek kaynakta tutma disiplini gözetilir — brief ayrıntılı model adı taşımak zorunda değil, sağlayıcı + `CHAT_MODEL` env'e atıf yeterli olabilir
  - `MASTER_PROMPT_v2.md` §7 dağıtım satırı: `ANTHROPIC_API_KEY` → `GROQ_API_KEY`
  - Brief, `OVERVIEW.md` tarafından yetkili kaynak ilan edildiği için **Korumalı doküman gibi ele alınır → değiştirmeden önce kullanıcıya bildir, onay al**
  - Dosya: `MASTER_PROMPT_v2.md`

- [ ] **3. Sınıfı süpür ve kapanışı grep'le göster**
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

- [ ] `.github/workflows/ci.yml` yorumunda `ANTHROPIC_API_KEY` geçmiyor, `GROQ_API_KEY` geçiyor; cümlenin anlamı korunmuş
- [ ] `MASTER_PROMPT_v2.md` §6/§7 kodun sağlayıcısıyla tutarlı (onay alındıysa) ya da brief'in tarihsel ilan edilme kararı kayda geçmiş
- [ ] Sınıf süpürmesi: `_dev/` hariç repoda `ANTHROPIC_API_KEY|@anthropic-ai/sdk|claude-opus|claude-sonnet|llama-3\.3-70b|console\.anthropic\.com` grep'i **0 eşleşme** (exit 1) — ya da kalan her eşleşmenin gerekçesi yazılı
- [ ] `next build` exit 0 ve `npm run test` yeşil (69 test) — kod değişmediği için ikisi de regresyonsuz olmalı
- [ ] Workflow dosyası geçerli YAML (yorum düzenlemesi şemayı bozmadı)
- [ ] `kanal: UAT` — CI'ın `fast` + `a11y` job'larının push sonrası hâlâ `success` döndüğü doğrulanır; sonucu belirleyen katman GitHub runner'ı, yerel koşucu değil

---

## Karar Noktaları

- **Brief'e ne yapılacak:** (a) §6/§7 chatbot satırları güncellenir, brief yetkili kaynak kalır — dar ve hızlı, ama dosyanın diğer bayat yerleri (3 adım, `/bunker-os`) çelişkili kalmaya devam eder. (b) Brief tarihsel belge ilan edilir ve `OVERVIEW.md`'deki "çelişkide v2 geçerli" cümlesi düzeltilir — kökü çözer, ama Korumalı doküman onayı ve daha geniş bir karar gerektirir. (c) İkisi birlikte. **Kullanıcıya sorulacak** — ikisi de Korumalı/yetki alanına dokunuyor.

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

**Oluşturulma:** 2026-10-02 (verify-phase 18 3. koşumu, Adım 7 — UAT senaryo 39)
