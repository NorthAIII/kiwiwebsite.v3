# TASK-19.06: WAF hız sınırını canlıya al (önce `log`, sonra 429) + patlama ölçümü + drift

**Durum:** ⬜ Bekliyor
**Modül:** M5-Chatbot-API (+M6-SEO-Deploy) (modules/M5-Chatbot-API.md, modules/M6-SEO-Deploy.md)
**Feature:** TB-G2 — `/api/chat` kota koruması (hız sınırı katmanı)
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** TASK-19.04 ✅ (spec + drift script'i), TASK-19.05 ✅ (probe)

---

## Hedef

`ops/firewall/chat-rate-limit.json`'daki kuralı Vercel WAF'ta canlıya al. Vercel'in kademeli yayın pratiğiyle iki adımda yapılır. Önce aşım aksiyonu `log` olarak yayınlanır ve eşleşme görülür. Sonra spec'in kendisi (aşımda 429) yayınlanır. Her `publish`'i **kullanıcı** koşar. Task şu koşullarda biter: canlıda patlama 429 alıyor (kaçıncı istekte geldiği kayıtlı), `node ops/firewall/drift.mjs` çıkış 0 veriyor, M5/M6 hız sınırını anlatıyor.

---

## Bağlam

WAF kuralı **deploy'dan bağımsızdır.** Proje firewall'ında yaşar, publish anında canlıdır. Bu yüzden dal birleştirmesini beklemez. Mevcut canlı kod (`main`, origin kapısı henüz yok) geçersiz gövdeye zaten 400 döner, yani patlama ölçümü bugünkü canlıda da model çağırmadan yapılabilir.

Bu sıralama hız sınırı katmanının canlı ölçümünü origin deploy'undan ayırır: bir sorun çıkarsa iki değişiklik birbirine karışmaz. Birleştirme ve iki katmanın birlikte ölçümü TASK-19.07'dedir.

Research'ün tuzağı: "publish canlıya anında dokunur; `publish --yes`'i kullanıcı koşar, merge/canlı task'ında". Bu plan canlı task'ı ikiye ayırdı. Publish bu task'ta, birleştirme 19.07'de; kural her ikisinde de kullanıcıdadır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-19.md` → Araştırma Bulguları → Uygulama tuzakları (publish, kendi IP'n, sayaçlar bölge başına, Hobby kural bütçesi, OTPM bilinçli kalıntısı)
- `_dev/docs/DECISIONS.md` → 2026-10-02 "`/api/chat` kota koruması" kararı
- `ops/firewall/drift.mjs` + `ops/probe-chat-guard.mjs` başlık yorumları — kullanım ve pencere bütçesi
- `_dev/memory/canli-dogrulama-kanit-artefakti.md` — canlı iddiayı kanıt artefaktına bağla

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/modules/M5-Chatbot-API.md` — "Hız sınırı / origin kontrolü yok" edge case'inin **hız sınırı yarısı** + kabul kriteri ("tek IP 10 dk'da 7. istekte 429 → offline kopyası")
- `_dev/modules/M6-SEO-Deploy.md` — F6.4'e firewall kuralı: spec konumu, CLI ile uygulama, publish kullanıcıda, drift kontrolü
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum

---

## Alt Görevler

- [ ] **1. Ön koşullar**
  - `vercel firewall overview` → `Not configured` · `vercel firewall diff` → boş. Değilse **dur**, kullanıcıya getir.
  - `node ops/firewall/drift.mjs` → çıkış 2 (kural yok) — beklenen başlangıç.

- [ ] **2. `log` modunda stage → kullanıcı publish**
  - `vercel firewall rules add --json "$(cat ops/firewall/chat-rate-limit.json)"` → `vercel firewall rules edit chat-rate-limit --rate-limit-action log --yes` → `vercel firewall diff`.
  - Diff'i kullanıcıya göster. **Kullanıcı** `vercel firewall publish --yes` koşar. Claude publish komutunu çalıştırmaz.
  - `node ops/firewall/drift.mjs` → çıkış 1, tek fark `rateLimit.action: log`. Beklenen ara durumdur; drift script'inin farkı doğru adlandırdığını gösterir.

- [ ] **3. Eşleşmeyi gör (bloklamadan)**
  - `node ops/probe-chat-guard.mjs --base https://kiwiailab.com --burst-only` → `log` modunda 429 gelmez, 13 istek 400 döner. Script "sınır gözlenmedi" der; bu adımda beklenen budur.
  - Origin senaryoları bu task'ta koşulmaz: bugünkü canlıda origin kapısı yok (403 yerine 400 döner). Onların canlı ölçümü TASK-19.07'dedir.
  - Kuralın 7. istekten itibaren eşleşip logladığını Vercel tarafında gör: `vercel firewall overview` / `vercel firewall traffic` (kuralın eşleşme sayısı). Eşleşme görünmüyorsa **dur**: koşul yanlış olabilir (path/method), 429'a geçme.

- [ ] **4. Spec'in kendisini stage et → kullanıcı publish**
  - `vercel firewall rules edit chat-rate-limit --json "$(cat ops/firewall/chat-rate-limit.json)"` → `vercel firewall diff` (yalnız `log` → `rate_limit`). Kullanıcı publish eder.
  - `node ops/firewall/drift.mjs` → **çıkış 0**.

- [ ] **5. Patlama → 429**
  - Son probe isteğinden sonra **en az 10 dk bekle**. Sabit pencere; hiza bilinmiyor, beklemek temiz pencereyi garanti eder.
  - `node ops/probe-chat-guard.mjs --base https://kiwiailab.com --burst-only` → yalnız patlama (kendi Origin + geçersiz gövde); origin senaryoları pencere bütçesini yemesin. 429'un kaçıncı istekte geldiğini kaydet; temiz pencerede beklenen 7.
  - Kanıt artefaktı: probe çıktısı (zaman damgalı) + `drift.mjs` çıkış 0 + `vercel firewall overview` özeti.
  - Patlamadan sonra kendi IP'n ≤10 dk 429'dadır. Bu sürede canlı chatbot'u kendi tarayıcından deneme; offline kopyası görürsün.

- [ ] **6. Dokümanlar**
  - M5: edge case satırının hız sınırı yarısı + kabul kriteri. Bilinçli kalıntıları da bir cümleyle yaz: sayaç bölge başına; pencere başındaki 6'lık patlama dakikalık OTPM'i periyodik doyurabilir.
  - M6 F6.4: firewall kuralı satırı.
  - DECISIONS: yalnız ölçüm karardan saparsa (ör. 429 başka istekte geldi ve bir değer değişikliği gerekti), kullanıcı kararıyla.

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
- **Kendi IP'n sayılır.** Origin senaryoları da patlama da aynı sayaca yazar. Bir pencerede ≤6 istek; patlama en son.
- **Hobby'de persistent action (`--duration`) yok.** Spec'e ekleme.
- **Bilinçli kalıntılar** (DECISIONS 2026-10-02): sayaçlar bölge başına (fonksiyon bölgesi tek, `iad1`); OTPM periyodik doyabilir; dağıtık kötüye kullanım kapsam dışı. Bunlar bu task'ın bulgusu değil, kabul edilmiş sınırlardır.
- **Canlı chatbot'u bu task'ta gerçek mesajla deneme** (Groq kotası). Ölçüm yalnız 400 gövdeleriyledir.

---

## Test Kriterleri

- [ ] `log` aşaması: Vercel tarafında kuralın eşleşmesi görüldü (overview/traffic), ziyaretçi bloklanmadı (13 istek 400) — `kanal: UAT`.
- [ ] Canlı patlama: temiz pencerede 429 geldi, kaçıncı istekte olduğu kayıtlı (beklenen 7) — `kanal: UAT` (WAF yalnız Vercel serving zincirinde).
- [ ] `node ops/firewall/drift.mjs` → çıkış 0 (canlı kural spec'le birebir).
- [ ] `vercel firewall diff` → boş (bekleyen draft yok).
- [ ] M5/M6 hız sınırını, publish sahipliğini ve drift kontrolünü anlatıyor.

---

## Risk ve Geri Dönüş Planı

- **Risk:** Koşul fazla geniş eşleşir (ör. başka path) → meşru sayfa trafiği 429 alır. Önlem: `log` aşaması; eşleşme yalnız `/api/chat` POST'unda görülmeden 429'a geçilmez.
- **Risk:** 6/10 dk meşru bir ziyaretçiyi beklenenden sık keser → değer bir kullanıcı kararıdır (kota aritmetiği). Değiştirmek DECISIONS + spec + drift ile yapılır, dashboard'dan değil.
- **Rollback (anında):** `vercel firewall rules disable chat-rate-limit` (ya da `remove`) → `diff` → kullanıcı publish eder. Deploy gerekmez.

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
