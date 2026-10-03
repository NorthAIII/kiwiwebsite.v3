# TASK-19.07: Birleştirme öncesi preview kapısı → `main`'e ff-merge → canlı ölçüm (kod katmanı)

**Durum:** ✅ Tamamlandı
**Modül:** M6-SEO-Deploy (+M5-Chatbot-API) (modules/M6-SEO-Deploy.md, modules/M5-Chatbot-API.md)
**Feature:** TB-G1 + TB-G2 origin katmanı (canlıya alma ve canlı ölçüm). Hız sınırı katmanı TASK-19.06'dadır ve bu task'tan sonra koşar.
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** TASK-19.01 … TASK-19.05 ✅ (hepsi). TASK-19.06'ya bağlı değil (plan revizyonu 2026-10-03: 19.06 bu task'tan sonra koşar).

---

## Hedef

`revize/v0.5-teknik-borc`'u `main`'e al ve kod katmanını canlıda ölç. Önce dal HEAD'inin **preview**'u iki kapıdan geçer: TB-G1'in duman testi ve Vercel'deki `host` varsayımının ilk ölçümü. Sonra ff-merge ve deploy teyidi gelir. En son canlıda origin kapısı, üç meşru host, gerçek tarayıcı, red logu, audit ve regresyon kanıt artefaktına bağlanır. Task, bu kanıtlar kayıtlı olduğunda biter. Milestone'un hız sınırı maddeleri (429, sınırdaki ziyaretçi, drift 0) TASK-19.06'da kapanır.

---

## Bağlam

Discuss kararı: "Fazın son task'ı merge + canlı doğrulamadır." Dal kuralı yalnız Faz 19 için seçildi: kod dalda yürür, faz sonunda `main`'e alınır, UAT canlıyı ölçer.

**Plan revizyonu (2026-10-03, kullanıcı kararı):** Bu task TASK-19.06'nın (WAF canlı) önüne alındı. Kullanıcı 19.06'da publish'ten vazgeçti. Revizyonun yönü "önce merge, WAF sonra" oldu (gerekçe → `tasks/TASK-19.06.md` → Bağlam). Bu yüzden fazın son task'ı merge değil 19.06'dır; merge ile canlı doğrulama ise burada kalır.

Sonuç: bu task boyunca canlıda WAF kuralı **yok**. Probe istekleri hiçbir sayaca yazmaz; eski plandaki pencere bütçesi ve ~30 dk bekleme düşer. Bu task firewall'a yazmaz.

Preview'da `GROQ_API_KEY` yok (bilinçli, DURUM madde 2). Origin kapısı 503 anahtar kapısından önce geldiği için bu bir avantajdır: preview'da yabancı origin **403**, kendi origin **503** döner. Böylece Vercel serving zincirindeki `host` değeri canlıya çıkmadan ölçülebilir.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-19.md` → Milestone + `mekanizma:` satırı + Araştırma Bulguları → Uygulama tuzakları
- `_dev/docs/DECISIONS.md` → 2026-10-02 "npm audit gerçek sonucu" (audit'in canlıda beklenen değeri)
- `_dev/tasks/archive/TASK-19.01.md` — First Load JS tablosu ve audit sonucu (canlıyla karşılaştırma tabanı)
- `_dev/tasks/archive/TASK-18.08.md` — go-live emsali (kanıt artefaktı, `vercel logs`)
- `_dev/tasks/archive/TASK-19.03.md` — gerçek tarayıcı harness'i (akışın bittiğini submit düğmesinden oku)
- `_dev/memory/vercel-git-disconnect-deploy-tetiklenmez.md` — deploy'u auth'suz REST ile teyit et
- `_dev/memory/canli-dogrulama-kanit-artefakti.md` · `_dev/memory/ci-actions-rest-gozlemi.md` · `_dev/memory/tarayici-accept-language-locale-yonlendirmesi.md`
- `ops/probe-chat-guard.mjs` başlık yorumu — kullanım ve çıkış kodları

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — task durumu, kod katmanının canlı kanıtı, aktif task TASK-19.06
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum
- `_dev/modules/M5-Chatbot-API.md` — F5.1 origin paragrafındaki "`host` … **henüz ölçülmedi**" cümlesi ölçüm sonucuyla güncellenir; başka ayrıntı farkı çıkarsa o da
- `_dev/modules/M6-SEO-Deploy.md` — canlı ölçüm ayrıntı farkı çıkarsa
- `_dev/docs/DECISIONS.md` — yalnız ölçüm bir kararı değiştirirse (kullanıcı kararıyla)
- `_dev/MEMORY.md` + `_dev/memory/` — proje-geneli yeni bir tuzak çıkarsa (ör. Vercel'in `host` başlığının davranışı)

---

## Alt Görevler

- [x] **1. Temiz pencere**
  - `git status` temiz; dal push'lu. İlgisiz yerel değişiklikler commit'e girmez.
  - Dal HEAD'i için CI (fast + a11y) yeşil — auth'suz REST `/actions/runs?head_sha=<sha>` ya da `gh`.
  - Birleştirme öncesi diff: `git diff --stat origin/main...revize/v0.5-teknik-borc`. Beklenen dosyalar: `package-lock.json`, `src/lib/chat-origin.ts`, `src/app/api/chat/route.ts`, `tests/` altındaki chat/firewall testleri, `ops/`, `_dev/`, `CLAUDE.md` (audit-docs `ee598ef`, yalnız doküman). Başka dosya varsa **dur**, kullanıcıya getir (TASK-18.01 dersi: "yalnız X" premisi diff'le doğrulanır).
  - Firewall'ın başlangıç hâli: `vercel firewall overview` → `Not configured`, `vercel firewall diff --json` → `{"changes": []}`. Değilse **dur**: bekleyen bir taslak ya da canlı bir kural var demektir, bu task'ın ölçümünü ve 19.06'nın temiz başlangıcını bozar.

- [x] **2. Preview kapısı (birleştirmeden ÖNCE)**
  - Dal HEAD'inin preview deploy'u Ready olmalı: GitHub `/deployments` + `/commits/<sha>/statuses` ya da `vercel ls`.
  - **TB-G1 duman testi** (kullanıcının regresyon çıtası): 6 sayfa × 5 locale = 30 URL 200 · 6 redirect 308 + doğru hedef (TASK-19.01 listesi) · AR `dir="rtl"`.
  - **Origin kapısının Vercel'deki ilk ölçümü:** `node ops/probe-chat-guard.mjs --base <preview-url>` → **403 · 403 · 503**.
    - Kendi origin 403 alıyorsa **DUR, birleştirme yapma.** Vercel `host`'u beklenen değeri taşımıyor demektir; red logundaki `host`/`origin` değerlerini `vercel logs` ile oku, kullanıcıya getir (plan revizyonu).
  - Preview Vercel Authentication ile korunuyorsa (401 / giriş sayfası) `vercel:access-protected-vercel-deployment` yolunu kullan (`vercel curl` ya da OIDC başlığı). O da olmazsa kaydet ve ölçümü canlıya bırak; `host` riski bu durumda canlıda yaşanır.

- [x] **3. ff-merge + deploy teyidi**
  - `git fetch` → `git merge-base --is-ancestor origin/main revize/v0.5-teknik-borc` (ff mümkün mü). Değilse **dur**.
  - `git checkout main` → `git merge --ff-only revize/v0.5-teknik-borc` → `git push origin main`.
  - Vercel Production deploy tetiklendi ve tamamlandı: GitHub `/deployments` (Production, sha) + statuses `context=Vercel`, `state=success`. Tetiklenmezse → Git-disconnect tuzağı (MEMORY).
  - `git merge-base --is-ancestor <dal HEAD> origin/main` → kanıt.

- [x] **4. Canlı ölçüm — origin katmanı**
  - WAF canlıda olmadığı için ölçümler ardışık koşulabilir, aralarında bekleme gerekmez.
  - Gerçek Chrome'da `https://kiwiailab.com` → chatbot'a tek mesaj → yanıt akıyor (offline değil). Tarayıcının `Origin`'i canlı kapıdan geçiyor. 1 Groq çağrısı; kayda geç.
  - `--base https://kiwiailab.com` → 403 · 403 · 400. UAT 18 senaryo 23'ün probu artık reddediliyor.
  - `--base https://www.kiwiailab.com` ve `--base https://kiwi-ai-lab-v3.vercel.app` → her biri 403 · 403 · 400. Üç host'tan meşru gönderim 403 almıyor.
  - Probe'da 429 görünürse beklenmedik bir durumdur: firewall'da kural var demektir. **Dur**, `vercel firewall overview` ile bak, kullanıcıya getir.

- [x] **5. Yan kanıtlar**
  - `vercel logs --environment production --since 1h --json`: `console.warn` red satırları yalnız probe'un yabancı/başlıksız isteklerine ait. Gerçek tarayıcı isteği için red yok (yanlış-pozitif yok). Red satırlarındaki `host` değerleri herkese açık host'u taşıyor (M5'teki "henüz ölçülmedi" cümlesinin kanıtı).
  - Firewall dokunulmamış: `vercel firewall overview` → `Not configured` · `node ops/firewall/drift.mjs` → çıkış 2 (kural yok; 0'a TASK-19.06'da gelir).
  - `main`'de `npm audit` → kritik 0 · high 1 · moderate 1, ikisi de Next'e gömülü `postcss@8.4.31`'den (DECISIONS 2026-10-02 "npm audit gerçek sonucu").
  - Canlı regresyon (GET): 30 URL 200 · 6 redirect 308 · AR `dir="rtl"`. TR için `NEXT_LOCALE=tr` cookie.

- [x] **6. Dokümanlar + commit**
  - Kanıt artefaktlarını (probe tabloları zaman damgalı, deploy sha'sı, ataş kanıtı, red logu `host` değerleri, firewall hâli, audit özeti) oturum kaydına yaz.
  - M5: origin paragrafındaki "henüz ölçülmedi" cümlesini ölçümle değiştir.
  - DURUM: aktif task TASK-19.06 (WAF canlı, merge sonrası) → sıradaki `/devflow:run-task`.
  - Bu task'ın doküman commit'i birleştirmeden sonra doğrudan `main`'e gider (yalnız `_dev/`; discuss/research commit'leri gibi; canlı build'i no-op tetikler).

---

## Etkilenen Dosyalar

Kod **değişmez.** Git birleştirme (dal → `main`), Vercel Production deploy ve canlı ölçüm. Dokümanlar (`_dev/`).

---

## Dikkat Noktaları

- **Firewall'a yazan komut yok.** Stage ve publish TASK-19.06'dadır. Bu task firewall'ı yalnız okur (`overview`, `diff`, `drift.mjs`).
- **Birleştirme ff-only.** `main` dalın tabanından ilerlemişse (ör. araya doküman commit'i girdiyse) dur, kullanıcıya sor. Rebase ya da merge commit'i sessizce yapma.
- **Canlıya dokunma kuralı** bu task'ta bilinçli olarak kalkar (fazın kararı). Birleştirme yalnız 1. ve 2. adımların kapıları yeşilken yapılır.
- **Gerçek chatbot mesajı yalnız bir tane** (Groq günlük kotası ziyaretçilerle ortak).
- **Streaming yanıtta Playwright `response.finished()` dönmeyebilir** (MEMORY host envanteri). Akışın bittiğini DOM'dan oku.
- **Milestone'un `mekanizma:` satırı** "kritik + high 0"ı "kritik 0 + gerekçeli 2 high"a daralttı. Ölçülmüş karşılığı kritik 0 + gerekçeli 1 high + 1 moderate'tir (DECISIONS 2026-10-02 "npm audit gerçek sonucu"). Kayıt bu ölçütlere göre yazılır, örtük genişletme yok. "Kural repo'da kod" maddesinin canlı karşılığı (spec + drift 0) TASK-19.06'dadır.
- **Yan gözlem (kapsam dışı):** `www.kiwiailab.com` apex'e yönlenmeden 200 dönüyor. Bu task düzeltmez, yalnız probe'da meşru host olarak kullanır.

---

## Test Kriterleri

- [x] Birleştirme öncesi: CI yeşil; diff yalnız beklenen dosyalar; firewall `Not configured` + diff boş; preview'da 30 URL 200 + 6 redirect 308 + AR RTL.
- [x] Preview origin probu: 403 · 403 · 503 — `kanal: UAT` (Vercel serving zinciri; preview korumalıysa gerekçeyle "ölçülemedi").
- [x] `git merge-base --is-ancestor <dal HEAD> origin/main` ✓ ve Production deploy `state=success`.
- [x] Canlı apex: yabancı Origin 403 · başlıksız 403 · kendi Origin 400 — `kanal: UAT`.
- [x] Canlı `www` ve `vercel.app`: kendi Origin 400 (403 değil) — `kanal: UAT`.
- [x] Canlı gerçek tarayıcı: chatbot yanıt veriyor; log'da bu istek için red yok, red satırlarının `host`'u herkese açık host — `kanal: UAT`.
- [x] Firewall dokunulmamış: `overview` → `Not configured`, `drift.mjs` → 2. `main`'de `npm audit` → kritik 0 · high 1 · moderate 1.
- [x] Canlı regresyon: 30 URL 200, 6 redirect 308, AR RTL.

---

## Risk ve Geri Dönüş Planı

- **Risk:** Canlıda meşru istek 403 alır (Vercel `host`'u preview'dan farklı davranır) → chatbot herkese offline. Tespit: 4. adımın tarayıcı mesajı + red logu. Eylem: origin kapısı commit'ini `git revert` → `main` push → deploy. Kullanıcıya getir. TASK-19.06 bu sorun çözülmeden başlamaz.
- **Risk:** Lock yükseltmesi canlıda bir sayfayı kırar → regresyon adımı yakalar. Eylem: `package-lock.json` commit'ini revert → push.
- **Rollback (tümü):** `main`'i birleştirme öncesi sha'ya döndüren revert commit'leri. Force push yok.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Birleştirme + push yapıldı; doküman commit'i `main`'de
- [x] Bu doküman güncellendi (oturum kaydı + kanıt artefaktları)
- [x] DURUM.md güncellendi (aktif task: TASK-19.06)

---

## Oturum Kayıtları

**verify-plan — 2026-10-03:** 1. adımın beklenen diff listesine `CLAUDE.md` eklendi (`git diff --stat origin/main...origin/revize/v0.5-teknik-borc` ile ölçüldü; dalda audit-docs `ee598ef` değiştirdi). Ortam notu: bu oturumun devcontainer'ında `vercel` CLI kurulu değil (`command not found`). Task `vercel` CLI'ı yetkili ve proje bağlı bir ortamda koşar (MEMORY host araç envanteri).

### Oturum — 2026-10-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **1. Temiz pencere:** dal `5a9e9fd` push'lu, `origin/main` (`523af58`) atası. CI run `37142676588`: fast + a11y `success`. Diff 38 dosya, hepsi beklenen listede (`package-lock.json`, `src/lib/chat-origin.ts`, `route.ts`, chat/firewall testleri ve `chat-route-timeout.test.ts`, `ops/`, `_dev/`, `CLAUDE.md`). Firewall: `Not configured`, özel kural yok, `diff --json` → `{"changes": []}`, `drift.mjs` → 2. İlgisiz yerel `.devcontainer/` değişiklikleri commit'e alınmadı.
- **2. Preview kapısı** (`kiwi-ai-lab-v3-in7p9ovac-north-ai.vercel.app`, korumasız, 18:32–18:33 UTC): 30/30 URL 200 · 6/6 redirect 308 + doğru hedef · AR `dir="rtl"`. Origin probu **403 · 403 · 503** (çıkış 0).
- **3. ff-merge:** `main` `523af58..5a9e9fd` (18:36:56 UTC). Production deploy `6831535089` → `success` (~1 dk). `git merge-base --is-ancestor 5a9e9fd origin/main` ✓. Yeni kodun canlıda olduğunun ayırt edicisi probe'un kendisi: yabancı Origin artık 403.
- **4. Canlı origin katmanı** (18:38:08–18:38:10 UTC), her biri çıkış 0:

  | Host | yabancı Origin | Origin yok | kendi Origin |
  |------|----------------|------------|--------------|
  | `kiwiailab.com` | 403 | 403 | 400 |
  | `www.kiwiailab.com` | 403 | 403 | 400 |
  | `kiwi-ai-lab-v3.vercel.app` | 403 | 403 | 400 |

  Gerçek Chrome 153 (`NEXT_LOCALE=tr`, 18:39:33 UTC): `/api/chat` **200**, `Origin: https://kiwiailab.com`, `Sec-Fetch-Site: same-origin`, tam TR yanıt (Crew OS doğru adla), offline kopyası yok.
- **5. Yan kanıtlar:**
  - `vercel logs --environment production --since 15m --json`: 9 probe isteği + 2 tarayıcı isteği. Tam **6** `chat origin rejected` satırı, hepsi probe'un yabancı/başlıksız istekleri. `host` değerleri: `kiwiailab.com`, `www.kiwiailab.com`, `kiwi-ai-lab-v3.vercel.app` (isteğin geldiği host). Tarayıcı istekleri (18:39:10, 18:39:33) için red yok.
  - Merge sonrası firewall: `Not configured`, özel kural yok, `drift.mjs` → 2.
  - `main`'de `npm audit`: kritik 0 · high 1 (`postcss`) · moderate 1 (`next`, via `postcss`). Kaynak Next'e gömülü `postcss@8.4.31` (DECISIONS 2026-10-02 ile örtüşüyor).
  - Canlı regresyon (18:40:00 UTC): 30/30 URL 200 · 6/6 redirect 308 · AR `dir="rtl"`.
- M5 F5.1'deki "`host` henüz ölçülmedi" cümlesi ölçümle değiştirildi.

**Sorunlar:**
- **`vercel` CLI oturumu kapalıydı** (devcontainer'da CLI 62.2.0 kurulu ama `Logged out`): `vercel login` device akışı, kullanıcı onayladı.
- **Gerçek tarayıcı harness'i iki kez artefakt üretti:**
  - Koşu 1: input hidrasyondan önce `fill` ile dolduruldu, React state'i görmedi, düğme hiç etkinleşmedi → istek gitmedi.
  - Koşu 2: akış-sonu kontrolü sayfadaki tüm `button[type=submit]`'lere bakıyordu; bülten formunun düğmesi zaten etkin olduğu için bekleme hemen döndü ve tarayıcı akış ortasında kapandı (istek gitti, log'da 18:39:10 200).
  - Koşu 3: `load` + 3 sn bekleme, `pressSequentially`, kontrol chatbot'un "Gönder" düğmesine daraltıldı → tam yanıt.
- **Harcanan Groq çağrısı: 2** (beklenen 1; koşu 2 akış ortasında kesildi).

**Kararlar:**
- Yok (ölçüm hiçbir kararı değiştirmedi). docs/DECISIONS.md'ye eklendi: Hayır.

**Dosya Değişiklikleri:**
- Kod değişmedi. `main` ← `revize/v0.5-teknik-borc` ff-merge (`5a9e9fd`).
- `_dev/modules/M5-Chatbot-API.md` → F5.1 origin paragrafı canlı ölçüm.
- `_dev/DURUM.md`, `_dev/phases/PHASE-19.md` → durum. `_dev/memory/host-uat-arac-envanteri.md` → tarayıcı harness tuzakları + devcontainer `vercel` notu.

**Test Sonuçları:**
- Ölçüm kanalı UAT (Vercel serving zinciri). Kod değişmediği için yerel suite koşulmadı; birleşen SHA'nın CI'ı (fast + a11y) yeşil.
- Preview origin probu 403·403·503; canlı üç host 403·403·400; canlı gerçek tarayıcı 200 + yanıt; red logu 6 satır, yalnız probe; firewall dokunulmamış (drift 2); audit kritik 0 · high 1 · moderate 1; preview ve canlı regresyon 30/30 · 6/6 · RTL.
- Kapsam dışı: hız sınırı (429, sınırdaki ziyaretçi, drift 0) → TASK-19.06.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-10-03

**Ne Yapıldı:**
- Dal preview'da iki kapıdan geçti, `main`'e ff-merge edildi (`5a9e9fd`), Production deploy başarılı.
- Origin kapısı canlıda: üç host'ta yabancı/başlıksız 403, kendi origin 400; gerçek tarayıcı yanıt alıyor, yanlış-pozitif yok.

**Öğrenilenler:**
- Vercel'de `host` herkese açık host'u taşıyor; same-origin kuralı listesiz çalışıyor.
- Canlı sayfada birden çok submit düğmesi var; harness kontrolü chatbot düğmesine daraltılmalı.

---

**Oluşturulma:** 2026-10-02
