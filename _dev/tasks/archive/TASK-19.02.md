# TASK-19.02: Origin kontrolü — saf `chat-origin` modülü + Vitest node testi

**Durum:** ✅ Tamamlandı
**Modül:** M5-Chatbot-API (modules/M5-Chatbot-API.md)
**Feature:** TB-G2 — `/api/chat` kota koruması (origin katmanı)
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** TASK-19.01 ✅ (dal `revize/v0.5-teknik-borc` açık)

---

## Hedef

`/api/chat`'in origin kuralını route'tan bağımsız, saf bir fonksiyon olarak yaz: `src/lib/chat-origin.ts`. Kuralı Vitest node testiyle mühürle. Bu task route'a dokunmaz; bağlama TASK-19.03'tedir. Task, kural matrisinin her satırı testte geçtiğinde biter.

---

## Bağlam

TB-G2 iki katmanlıdır (discuss kararı). Origin kontrolü, yabancı bir sitenin chatbot'u ziyaretçinin tarayıcısından kullanmasını kapatır. curl iki başlığı da sahteleyebilir; o yolun kapısı WAF hız sınırıdır (TASK-19.04/19.06). Biri ötekinin yerini tutmaz.

Research elle tutulan host listesi yerine **same-origin kuralını** seçti, çünkü canlıda üç host 200 dönüyor: `kiwiailab.com`, yönlendirmesiz `www.kiwiailab.com` ve `kiwi-ai-lab-v3.vercel.app`. Kural bunların hepsini ve `localhost`'u listesiz kapsar, yeni alias'ta bayatlamaz (DECISIONS 2026-10-02 — kota koruması kararı).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-19.md` → Araştırma Bulguları → "TB-G2 — origin kontrolü" + Teknik Kararlar → "Origin kontrolü kodda, same-origin kuralıyla"
- `_dev/docs/DECISIONS.md` → 2026-10-02 "`/api/chat` kota koruması" kararı
- `src/lib/chat-sanitize.ts` — saf modül deseni (başlık yorumu, sabitler, tek sorumluluk)
- `tests/chat-sanitize.test.ts` — Vitest node test deseni

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum

---

## Alt Görevler

- [x] **1. Modülü yaz — `src/lib/chat-origin.ts`**
  - İmza: `export function isSameOriginRequest(headers: Headers): boolean`. Yalnız `Headers` alır, `Request`'e ya da Next'e bağımlı değildir.
  - Kural (DECISIONS 2026-10-02):
    1. `host` başlığı yoksa → `false`. Bu ön koşul iki yoldan da önce gelir (fail-closed); `Sec-Fetch-Site` yolu da `host`'suz isteği kabul etmez.
    2. `Origin` başlığı var ve `null` değilse → `new URL(origin).host`, isteğin `host` başlığına eşit olmalı. Karşılaştırma küçük harfle yapılır; port dahil (`localhost:3000`), şema karşılaştırılmaz. Parse edilemeyen `Origin` → `false`.
    3. `Origin` yoksa ya da değeri `null` dizgesiyse → yalnız `Sec-Fetch-Site: same-origin` kabul edilir. Bu başlık tarayıcıda JS ile set edilemez; gizlilik ayarı yüzünden Origin'i düşen meşru tarayıcıyı korur.
    4. Diğer her durum → `false`.
  - Başlık yorumu: kuralı, neden liste değil same-origin olduğunu, neden `Sec-Fetch-Site`'ın yedek olduğunu ve "curl iki başlığı da sahteler, o yolun kapısı WAF" sınırını yaz. Kaynak: DECISIONS 2026-10-02. `chat-sanitize.ts`'in yorum yoğunluğunu izle.

- [x] **2. Testi yaz — `tests/chat-origin.test.ts`**
  - Kabul edilenler:
    - `Origin: https://kiwiailab.com` + `host: kiwiailab.com`
    - `www` ve `vercel.app` eşleşmeleri
    - `Origin: http://localhost:3000` + `host: localhost:3000`
    - Büyük/küçük harf farkı (`host: KiwiAILab.com`)
    - `Origin` yok + `Sec-Fetch-Site: same-origin`
    - `Origin: null` + `Sec-Fetch-Site: same-origin`
    - Eşleşen Origin + `Sec-Fetch-Site: cross-site` → **kabul** (Origin kuralı belirleyicidir). Bu satırı açıkça test et ki kuralın önceliği sabitlensin.
  - Reddedilenler:
    - Yabancı Origin (`https://evil.example`) — UAT 18 senaryo 23'ün vektörü
    - Alt alan adı / benzer ad (`https://kiwiailab.com.evil.example`, `https://evilkiwiailab.com`)
    - Port farkı (`http://localhost:3001` ↔ `localhost:3000`)
    - Origin yok + `Sec-Fetch-Site` yok (curl) · `cross-site` · `same-site` · `none`
    - `Origin: null` + `Sec-Fetch-Site` yok
    - Parse edilemeyen Origin (`not a url`)
    - `host` başlığı yok — iki yolda da: Origin'li istek ve Origin yok + `Sec-Fetch-Site: same-origin`

---

## Etkilenen Dosyalar

```
src/lib/
└── chat-origin.ts          # YENİ — saf origin kuralı
tests/
└── chat-origin.test.ts     # YENİ — Vitest node
```

---

## Dikkat Noktaları

- **Kural tek kaynak:** DECISIONS 2026-10-02. Elle host listesi **yazma** (research'te elendi).
- **`host` başlığının Vercel'de herkese açık host'u taşıması beklenir, henüz ölçülmedi** (research → Uygulama tuzakları). İlk ölçüm TASK-19.07'nin birleştirme öncesi preview probu, son ölçüm canlıdadır. Bu task'ta `x-forwarded-host`'a geçme ya da onu ekleme; kural `host` der. Canlıda varsayım çürürse bu bir plan revizyonu tetikleyicisidir.
- **Saf modül:** çalışma anı yan etkisi, log ya da env okuma yok. Red logu route'ta yazılır (TASK-19.03).
- `Headers.get` büyük/küçük harf duyarsızdır; testte başlık adlarını farklı yazmak kuralı test etmez, **değerlerin** harf farkını test et.

---

## Test Kriterleri

- [x] `npx vitest run tests/chat-origin.test.ts` → yukarıdaki kabul/ret matrisinin tamamı geçiyor.
- [x] `npm run test` → mevcut testler + yeni test geçiyor (kümülatif; sayı oturum kaydına).
- [x] `npm run build` temiz (strict tip kontrolü `tests/` dahil).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (`revize/v0.5-teknik-borc`)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-10-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `src/lib/chat-origin.ts` yazıldı: `isSameOriginRequest(headers: Headers): boolean`. Kural DECISIONS 2026-10-02'deki sırayla: `host` ön koşulu (boş değer de yok sayılır) → `Origin` varsa belirleyici (`new URL(origin).host`, küçük harf, port dahil, şema hariç; parse hatası → `false`) → `Origin` yok/`null` ise yalnız `Sec-Fetch-Site: same-origin` → aksi `false`.
- Modül saf: `Request`/Next/env/log yok. Başlık yorumu kuralı, neden liste değil same-origin olduğunu, `Sec-Fetch-Site`'ın neden yedek olduğunu ve "curl iki başlığı da sahteler, o yolun kapısı WAF" sınırını taşır.
- `tests/chat-origin.test.ts` yazıldı: 25 test (10 kabul · 15 red). Task matrisinin bütün satırları + 4 sabitleme satırı (aşağıda Kararlar).

**Sorunlar:**
- Yok.

**Kararlar:**
- Matrise 4 sabitleme satırı eklendi: Origin değerinde harf farkı, şemanın karşılaştırılmaması, öncelik satırının aynası (eşleşmeyen Origin + `Sec-Fetch-Site: same-origin` → red) ve boş başlık seti. Gerekçe: her biri kuralın bir maddesini sabitliyor; ayna satırı olmadan "Origin belirleyicidir" yalnız tek yönden test ediliyordu (mutant m3 yalnız o satırla yakalanıyor).
- Boş `host` değeri "yok" sayıldı (`!host`). Gerekçe: fail-closed ön koşulun amacı; testi `Sec-Fetch-Site` yolundan yazıldı, çünkü Origin yolunda boş host zaten eşleşmez ve testi ayırt edici yapmaz.
- `x-forwarded-host`'a bakılmadı (task Dikkat Noktaları). Başlık yorumuna "henüz ölçülmedi" gibi zamanla bayatlayacak bir durum ifadesi yazılmadı; ölçüm durumu faz dokümanında.
- docs/DECISIONS.md'ye eklendi: Hayır (kural zaten 2026-10-02 kaydında; yeni karar doğmadı).

**Son Yaklaşım:**
Task tamamlandı. Kapı route'a bağlı değil; bağlama TASK-19.03'te (`route.ts` `POST`'unun ilk satırı `isSameOriginRequest(req.headers)`).

**Sonraki Adım Detayı:**
TASK-19.03: kapıyı `route.ts`'e bağla, route testleri ve M5.

**Dosya Değişiklikleri:**
- `src/lib/chat-origin.ts` → YENİ, saf same-origin kuralı.
- `tests/chat-origin.test.ts` → YENİ, Vitest node, 25 test.

**Test Sonuçları:**
- `npx vitest run tests/chat-origin.test.ts` → 25/25 geçti (kabul 10 · red 15).
- `npm run test` → **8 dosya · 111 test geçti**. Taban (aynı oturum, değişiklik öncesi): 7 dosya · 86 test. Fark +1 dosya / +25 test.
- `npx tsc --noEmit -p tsconfig.json` → exit 0 (`tests/` dahil strict).
- `npm run build` → exit 0, "Compiled successfully", lint + tip kontrolü uyarısız. `/api/chat` 133 B, First Load JS shared 103 kB. Modül henüz hiçbir route'tan import edilmiyor, yani build çıktısına girmiyor; bu ölçüm yalnız temizliği gösterir.
- **Kapı sınaması — bozuk girdi** (scratch'te Node ile gerçek modül çağrıldı, repo kaynağı değişmedi):
  - UAT 18 senaryo 23'ün tarayıcı biçimli vektörü (`origin: https://evil.example` + `sec-fetch-site: cross-site` + `sec-fetch-mode: cors`, `host: kiwiailab.com`) → `false`.
  - curl varsayılanı (yalnız `host` + `user-agent: curl/8`) → `false`.
  - Kontrol grubu: meşru tarayıcı (apex Origin + `same-origin`) → `true`.
- **Kapı sınaması — boş kapsam:** hiç başlık yok (`new Headers()`) → `false`. Kapı kapsamını taramadan türetmiyor; boş girdinin "hiç bakmadan geçir" vermediği bu satırla ve testteki aynı satırla görüldü.
- **Test paketinin ayırt ediciliği** (repo kaynağına dokunmadan): scratch'te 4 mutant yazıldı ve `--config` ile `@/lib/chat-origin` alias'ı mutanta çevrildi. Sonuçlar:
  - m1, host ön koşulu yok → 2 kırmızı (host'suz `same-origin` · boş host).
  - m2, gevşek eşleşme (`includes`) → 2 kırmızı (iki benzer-ad satırı).
  - m3, `Sec-Fetch-Site` eşleşmeyen Origin'i kurtarıyor → 1 kırmızı (öncelik aynası).
  - m4, her zaman `true` → 15 kırmızı / 10 yeşil. Yeşil kalan 10 satır tam olarak kabul satırları; bu doğru ayağın ölçtüğünü gösteren kontrol grubudur.
- Kanal notu: kapının Vercel serving zincirinde `host`'u nasıl gördüğü bu katmanda ölçülemez. İlk ölçüm TASK-19.07'nin preview probu, son ölçüm canlıdadır (kanal: UAT).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-10-02

**Ne Yapıldı:**
- `/api/chat` origin kuralı saf modül oldu (`src/lib/chat-origin.ts`). Kural same-origin: listesiz, `host` ön koşullu, `Origin` belirleyici, `Sec-Fetch-Site: same-origin` yedek.
- Vitest node matrisi 25 testle mühürlendi. 4 mutantın her biri en az bir kırmızı verdi. Suite 86 → 111.

**Öğrenilenler:**
- Proje-geneli yeni öğrenim yok. Mutant kontrolü scratch'te `--config` + alias ile repo kaynağına dokunmadan kurulabiliyor (icra nüansı → faz retrosu adayı).

---

**Oluşturulma:** 2026-10-02
