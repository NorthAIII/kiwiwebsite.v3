# TASK-19.07: Birleştirme öncesi preview kapısı → `main`'e ff-merge → canlı ölçüm (milestone)

**Durum:** ⬜ Bekliyor
**Modül:** M6-SEO-Deploy (+M5-Chatbot-API) (modules/M6-SEO-Deploy.md, modules/M5-Chatbot-API.md)
**Feature:** TB-G1 + TB-G2 (milestone — canlıya alma ve canlı ölçüm)
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** TASK-19.01 … TASK-19.06 ✅ (hepsi)

---

## Hedef

`revize/v0.5-teknik-borc`'u `main`'e al ve fazın milestone'unu canlıda ölç. Önce dal HEAD'inin **preview**'u iki kapıdan geçer: TB-G1'in duman testi ve Vercel'deki `host` varsayımının ilk ölçümü. Sonra ff-merge ve deploy teyidi gelir. En son canlıda origin kapısı, üç meşru host, gerçek tarayıcı, patlama → 429, sınıra takılan ziyaretçinin offline kopyası, drift ve regresyon kanıt artefaktına bağlanır. Task, milestone'un her maddesi canlı kanıtla kayıtlı olduğunda biter.

---

## Bağlam

Discuss kararı: "Fazın son task'ı merge + canlı doğrulamadır." Dal kuralı yalnız Faz 19 için seçildi: kod dalda yürür, faz sonunda `main`'e alınır, UAT canlıyı ölçer.

WAF kuralı TASK-19.06'da zaten canlıya alındı (deploy'dan bağımsız). Bu task kod katmanını (TB-G1 lock'u + origin kapısı) canlıya alır ve iki katmanı birlikte ölçer.

Preview'da `GROQ_API_KEY` yok (bilinçli, DURUM madde 2). Origin kapısı 503 anahtar kapısından önce geldiği için bu bir avantajdır: preview'da yabancı origin **403**, kendi origin **503** döner. Böylece Vercel serving zincirindeki `host` değeri canlıya çıkmadan ölçülebilir.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-19.md` → Milestone + `mekanizma:` satırı + Araştırma Bulguları → Uygulama tuzakları
- `_dev/tasks/archive/TASK-19.01.md` — First Load JS tablosu ve audit sonucu (canlıyla karşılaştırma tabanı)
- `_dev/tasks/archive/TASK-18.08.md` — go-live emsali (kanıt artefaktı, `vercel logs`)
- `_dev/memory/vercel-git-disconnect-deploy-tetiklenmez.md` — deploy'u auth'suz REST ile teyit et
- `_dev/memory/canli-dogrulama-kanit-artefakti.md` · `_dev/memory/ci-actions-rest-gozlemi.md` · `_dev/memory/tarayici-accept-language-locale-yonlendirmesi.md`
- `ops/probe-chat-guard.mjs` başlık yorumu — pencere bütçesi

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu, milestone kanıtı, sıradaki adım `verify-phase`
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum
- `_dev/modules/M5-Chatbot-API.md` / `M6-SEO-Deploy.md` — canlı ölçüm ayrıntı farkı çıkarsa
- `_dev/docs/DECISIONS.md` — yalnız ölçüm bir kararı değiştirirse (kullanıcı kararıyla)
- `_dev/MEMORY.md` + `_dev/memory/` — proje-geneli yeni bir tuzak çıkarsa (ör. WAF'ın preview'a da uygulanıp uygulanmadığı)

---

## Alt Görevler

- [ ] **1. Temiz pencere**
  - `git status` temiz; dal push'lu. İlgisiz yerel değişiklikler commit'e girmez.
  - Dal HEAD'i için CI (fast + a11y) yeşil — auth'suz REST `/actions/runs?head_sha=<sha>` ya da `gh`.
  - Birleştirme öncesi diff: `git diff --stat origin/main...revize/v0.5-teknik-borc`. Beklenen dosyalar: `package-lock.json`, `src/lib/chat-origin.ts`, `src/app/api/chat/route.ts`, `tests/` altındaki chat/firewall testleri, `ops/`, `_dev/`. Başka dosya varsa **dur**, kullanıcıya getir (TASK-18.01 dersi: "yalnız X" premisi diff'le doğrulanır).

- [ ] **2. Preview kapısı (birleştirmeden ÖNCE)**
  - Dal HEAD'inin preview deploy'u Ready olmalı: GitHub `/deployments` + `/commits/<sha>/statuses` ya da `vercel ls`.
  - **TB-G1 duman testi** (kullanıcının regresyon çıtası): 6 sayfa × 5 locale = 30 URL 200 · 6 redirect 308 + doğru hedef (TASK-19.01 listesi) · AR `dir="rtl"`.
  - **Origin kapısının Vercel'deki ilk ölçümü:** `node ops/probe-chat-guard.mjs --base <preview-url>` → **403 · 403 · 503**.
    - Kendi origin 403 alıyorsa **DUR, birleştirme yapma.** Vercel `host`'u beklenen değeri taşımıyor demektir; red logundaki `host`/`origin` değerlerini `vercel logs` ile oku, kullanıcıya getir (plan revizyonu).
  - Preview Vercel Authentication ile korunuyorsa (401 / giriş sayfası) `vercel:access-protected-vercel-deployment` yolunu kullan (`vercel curl` ya da OIDC başlığı). O da olmazsa kaydet ve ölçümü canlıya bırak; `host` riski bu durumda canlıda yaşanır.

- [ ] **3. ff-merge + deploy teyidi**
  - `git fetch` → `git merge-base --is-ancestor origin/main revize/v0.5-teknik-borc` (ff mümkün mü). Değilse **dur**.
  - `git checkout main` → `git merge --ff-only revize/v0.5-teknik-borc` → `git push origin main`.
  - Vercel Production deploy tetiklendi ve tamamlandı: GitHub `/deployments` (Production, sha) + statuses `context=Vercel`, `state=success`. Tetiklenmezse → Git-disconnect tuzağı (MEMORY).
  - `git merge-base --is-ancestor <dal HEAD> origin/main` → kanıt.

- [ ] **4. Canlı ölçüm — pencere bütçesine göre sıralı**
  - WAF canlı: senin IP'n de **6 POST / 10 dk**. Sayfa GET'leri sayılmaz. Her pencereden önce son POST'tan bu yana ≥10 dk geçtiğinden emin ol (preview probu dahil).
  - **Pencere A** (4 POST):
    - Gerçek Chrome'da `https://kiwiailab.com` → chatbot'a tek mesaj → yanıt akıyor (offline değil). Tarayıcının `Origin`'i canlı kapıdan geçiyor. 1 Groq çağrısı; kayda geç.
    - `--base https://kiwiailab.com` → 403 · 403 · 400. UAT 18 senaryo 23'ün probu artık reddediliyor.
  - **Pencere B** (6 POST): `--base https://www.kiwiailab.com` ve `--base https://kiwi-ai-lab-v3.vercel.app` → her biri 403 · 403 · 400. Üç host'tan meşru gönderim 403 almıyor.
  - **Pencere C** (patlama, en son): `--base https://kiwiailab.com --burst-only` → temiz pencerede 7. istekte 429. Sonra IP'n ≤10 dk sınırlıdır.
  - **Sınırdaki ziyaretçi deneyimi** (Pencere C'nin hemen ardından, IP hâlâ 429'dayken): gerçek Chrome'da `https://kiwiailab.com/` (TR, `NEXT_LOCALE=tr` cookie'si) ve `https://kiwiailab.com/en` → chatbot'a birer mesaj. İkisinde de o dilin offline kopyası (`chat.error`) görünüyor, UI takılı kalmıyor. İstek edge'de 429 alır ve fonksiyona ulaşmaz, Groq kotası harcanmaz. DOM metni ya da ekran görüntüsü kanıt artefaktına girer. Milestone'un "sınıra takılan ziyaretçi offline kopyasını görüyor" maddesinin tek gözlemi budur.
  - Probe'un herhangi bir origin senaryosunda 429 görürsen sonuç "ölçülemedi"dir, başarısız değil: pencereyi bekle, o senaryoyu tekrarla.

- [ ] **5. Yan kanıtlar**
  - `vercel logs --environment production --since 1h --json`: `console.warn` red satırları yalnız probe'un yabancı/başlıksız isteklerine ait. Gerçek tarayıcı isteği için red yok (yanlış-pozitif yok).
  - `node ops/firewall/drift.mjs` → çıkış 0, draft uyarısı yok (karşılaştırılan canlı kuraldır).
  - `main`'de `npm audit` → kritik 0 · kalan yalnız gerekçeli 2 high (TB-G1).
  - Canlı regresyon (GET): 30 URL 200 · 6 redirect 308 · AR `dir="rtl"`. TR için `NEXT_LOCALE=tr` cookie.

- [ ] **6. Dokümanlar + commit**
  - Kanıt artefaktlarını (probe tabloları zaman damgalı, deploy sha'sı, ataş kanıtı, drift çıkışı, audit özeti) oturum kaydına yaz.
  - DURUM: fazın bütün task'ları tamam → sıradaki `/devflow:verify-phase 19`.
  - Bu task'ın doküman commit'i birleştirmeden sonra doğrudan `main`'e gider (yalnız `_dev/`; discuss/research commit'leri gibi; canlı build'i no-op tetikler).

---

## Etkilenen Dosyalar

Kod **değişmez.** Git birleştirme (dal → `main`), Vercel Production deploy ve canlı ölçüm. Dokümanlar (`_dev/`).

---

## Dikkat Noktaları

- **Pencere bütçesi pazarlık dışı.** Preview probu da, origin senaryoları da, tarayıcı mesajı da aynı IP sayacına yazar (WAF'ın preview'a uygulanıp uygulanmadığı bilinmiyor; uygulandığını varsay). Planlanan sıra: preview → ≥10 dk → A → ≥10 dk → B → ≥10 dk → C → aynı 429 penceresinde offline gözlemi. Toplam ~30+ dk bekleme bilinçlidir.
- **Birleştirme ff-only.** `main` dalın tabanından ilerlemişse (ör. araya doküman commit'i girdiyse) dur, kullanıcıya sor. Rebase ya da merge commit'i sessizce yapma.
- **Canlıya dokunma kuralı** bu task'ta bilinçli olarak kalkar (fazın kararı). Birleştirme yalnız 1. ve 2. adımların kapıları yeşilken yapılır.
- **Gerçek chatbot mesajı yalnız bir tane** (Groq günlük kotası ziyaretçilerle ortak). Pencere C sonrasındaki iki offline-gözlem mesajı edge'de 429 alır, Groq'a ulaşmaz; bu sayıya girmez.
- **Streaming yanıtta Playwright `response.finished()` dönmeyebilir** (MEMORY host envanteri). Akışın bittiğini DOM'dan oku.
- **Milestone'un `mekanizma:` satırı** "kritik + high 0"ı "kritik 0 + gerekçeli 2 high"a daralttı. Canlıdaki "kural repo'da kod" = spec + drift 0. Kayıt bu daraltılmış ölçütlere göre yazılır, örtük genişletme yok.
- **Yan gözlem (kapsam dışı):** `www.kiwiailab.com` apex'e yönlenmeden 200 dönüyor. Bu task düzeltmez, yalnız probe'da meşru host olarak kullanır.

---

## Test Kriterleri

- [ ] Birleştirme öncesi: CI yeşil; diff yalnız beklenen dosyalar; preview'da 30 URL 200 + 6 redirect 308 + AR RTL.
- [ ] Preview origin probu: 403 · 403 · 503 — `kanal: UAT` (Vercel serving zinciri; preview korumalıysa gerekçeyle "ölçülemedi").
- [ ] `git merge-base --is-ancestor <dal HEAD> origin/main` ✓ ve Production deploy `state=success`.
- [ ] Canlı apex: yabancı Origin 403 · başlıksız 403 · kendi Origin 400 — `kanal: UAT`.
- [ ] Canlı `www` ve `vercel.app`: kendi Origin 400 (403 değil) — `kanal: UAT`.
- [ ] Canlı gerçek tarayıcı: chatbot yanıt veriyor; log'da bu istek için red yok — `kanal: UAT`.
- [ ] Canlı patlama: temiz pencerede 7. istekte 429 — `kanal: UAT`.
- [ ] Canlı sınırdaki ziyaretçi: 429 altında `/` ve `/en`'de chatbot o dilin offline kopyasını gösteriyor — `kanal: UAT`.
- [ ] `node ops/firewall/drift.mjs` → 0; `main`'de `npm audit` → kritik 0 + gerekçeli 2 high.
- [ ] Canlı regresyon: 30 URL 200, 6 redirect 308, AR RTL.

---

## Risk ve Geri Dönüş Planı

- **Risk:** Canlıda meşru istek 403 alır (Vercel `host`'u preview'dan farklı davranır) → chatbot herkese offline. Tespit: Pencere A'nın tarayıcı adımı + red logu. Eylem: origin kapısı commit'ini `git revert` → `main` push → deploy. WAF katmanı yerinde kalır. Kullanıcıya getir.
- **Risk:** Lock yükseltmesi canlıda bir sayfayı kırar → regresyon adımı yakalar. Eylem: `package-lock.json` commit'ini revert → push.
- **Rollback (WAF):** TASK-19.06'daki gibi `rules disable` + kullanıcı publish. Deploy'dan bağımsız.
- **Rollback (tümü):** `main`'i birleştirme öncesi sha'ya döndüren revert commit'leri. Force push yok.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Birleştirme + push yapıldı; doküman commit'i `main`'de
- [ ] Bu doküman güncellendi (oturum kaydı + kanıt artefaktları)
- [ ] DURUM.md güncellendi (sıradaki: verify-phase)

---

## Oturum Kayıtları

_(task çalıştırıldığında doldurulur)_

---

**Oluşturulma:** 2026-10-02
