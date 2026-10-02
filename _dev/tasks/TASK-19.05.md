# TASK-19.05: Canlı katman probe script'i (model çağırmaz) + yerel doğrulama + TESTING.md

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Script — `ops/probe-chat-guard.mjs`**
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

- [ ] **2. Yerel doğrulama**
  - `npm run build` + `next start` (TASK-19.03 kodu). Portu dinleyen PID'i teyit et.
  - Anahtarsız: `node ops/probe-chat-guard.mjs --base http://localhost:3000` → 403 · 403 · 503 (kapıdan geçti). Çıkış 0.
  - Anahtarla (`.env.keys.local` → process env; değer yazılmaz): aynı komut → 403 · 403 · 400. Çıkış 0. Model çağrılmadı: sunucu log'unda üst-akış çağrısı yok.
  - `--burst` yerelde: WAF yok → 13 istekte 429 yok → "sınır gözlenmedi" + çıkış 1. Beklenen davranıştır; script'in sapmayı doğru raporladığını gösterir.
  - `--burst-only` yerelde: origin senaryoları koşmaz, yalnız 13 patlama isteği gider (istek sayısı çıktıda 13).
  - Zorunlu argüman: `--base` olmadan → çıkış 2, istek gönderilmedi.

- [ ] **3. TESTING.md — "Canlı katman (elle, CI dışı)"**
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

- [ ] Yerel anahtarsız: `--base http://localhost:3000` → 403 · 403 · 503, çıkış 0.
- [ ] Yerel anahtarlı: 403 · 403 · 400, çıkış 0; üst-akış çağrısı yok.
- [ ] `--burst` yerelde 13 istekte durur, "sınır gözlenmedi" raporlar, çıkış 1. `--burst-only` origin senaryolarını atlar.
- [ ] `--base` olmadan → çıkış 2, istek yok.
- [ ] `npm run test` + `npm run build` temiz (bu task kod suite'ine dokunmaz; regresyon teyidi).
- [ ] Canlıda script'in 429'u doğru yakaladığı — `kanal: UAT` (WAF yalnız Vercel serving zincirinde var; ölçüm TASK-19.06 + TASK-19.07 + verify-phase).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı (`kanal: UAT` olan hariç)
- [ ] Git commit & push yapıldı (`revize/v0.5-teknik-borc`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(task çalıştırıldığında doldurulur)_

---

**Oluşturulma:** 2026-10-02
