# TASK-9.08: S7 — Chatbot 0-Token (Offline + Sanitizasyon)

**Durum:** ✅ Tamamlandı
**Modül:** M5 Chatbot & API (modules/M5-Chatbot-API.md)
**Feature:** S7 senaryo grubu — chatbot 0-token (doğrulama)
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.07 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

Chatbot'u **sıfır API çağrısı** ile doğrula (0-token): (1) girdi sanitizasyonu **kod-incelemesi** (rol whitelist, uzunluk/geçmiş sınırı); (2) **dummy/geçersiz key** ile malformed-input kısa-devresi (geçersiz JSON / boş / sonda-user-yok → 400, Anthropic'e ulaşmadan); (3) **key-yok** → 503 zarif offline UI (sahte-online yok); (4) stream-kopması UI'ı takmıyor. **Toplam Anthropic API çağrısı = 0** (happy-path koşulmaz). Tamamlanma = üç katman koşuldu, 0-çağrı teyit edildi, kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S7 araç satırı + Dikkat Edilecekler (apiKey kontrolü sanitizasyondan ÖNCE) + TK4 (üç-katman)
- `_dev/modules/M5-Chatbot-API.md` — chat API sözleşmesi + sanitizasyon kuralları
- `src/app/api/chat/route.ts` (`:21-24` apiKey gate → `:35-46` sanitizasyon/malformed → `:48` `new Anthropic()`), Chatbot UI bileşeni

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.08 durumu + S7 bulgu notu

---

## Alt Görevler

- [x] **1. Sanitizasyon kod-incelemesi (omurga)**
  - `route.ts`: rol whitelist, uzunluk/geçmiş sınırı, sonda-user zorunluluğu, boş/malformed reddi — kod okunarak doğrulanır (QUALITY §7)

- [x] **2. Malformed kısa-devre — dummy key ile (0-çağrı)**
  - **Dummy/geçersiz key** set (gerçek key değil) → malformed girdilerle POST: geçersiz JSON / boş body / sonda-user-yok / rol enjeksiyonu → **400** döner, `new Anthropic()`'ten (`:48`) **önce** → sıfır API çağrısı
  - **Not (TK4):** apiKey kontrolü sanitizasyondan **önce** — key **yokken** her istek 503 alır (malformed 400'e ulaşılamaz); bu yüzden 400 yollarını çalıştırmak için **geçersiz key** gerekir (naif "key-yok + malformed → 400" yanlış-negatif)

- [x] **3. Key-yok offline UI (ayrı yol)**
  - Key **kaldırılmış** ortamda → 503; Chatbot UI **zarif offline** gösterir (sahte "● online/canlı" yok — ILKELER niyet-bazlı yasak); standalone Playwright ile UI gözlem
  - Stream-kopması: kesilen yanıt UI'ı takmaz (kod-inceleme + gözlem)

- [x] **4. 0-çağrı teyit & kayıt**
  - Test boyunca gerçek Anthropic key kullanılmadı, happy-path koşulmadı → **toplam API çağrısı = 0** kaydedilir; bulgular TK7 triyaj + PHASE-9 notu

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Playwright script scratchpad'de. -->

```
scratchpad/  (commit'lenmez)
└── s7-chatbot-offline.mjs      # YENİ — standalone Playwright (offline UI) (repo dışı)
_dev/
├── tasks/TASK-9.08.md          # Oturum kaydı + bulgular
├── phases/PHASE-9.md           # Task Listesi 9.08 + S7 notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **apiKey gate sanitizasyondan ÖNCE (TK4, Faz 3 birebir):** key-yok → HER istek 503; malformed 400 kısa-devresine ulaşmak için **dummy/geçersiz key** şart. 400'ler `new Anthropic()` **öncesi** döner → sıfır çağrı. İki yolu ayrı test et (dummy-key→400 vs key-yok→503).
- **Sıfır API çağrısı (TK4):** happy-path (gerçek key + geçerli istek) **koşulmaz** — Anthropic API token-başına ücretli, mevcut lisans SDK çağrısını besleyemez; canlı yol prod'da zaten kanıtlı.
- **Sahte-online yasağı:** offline UI dürüst olmalı (gerçekte olmayan canlılık iması yok).
- Kanonik ortam = fresh prod build; env manipülasyonu (dummy-key / no-key) serve öncesi ayarlanır.

---

## Test Kriterleri

- [x] Sanitizasyon kod-incelemesi tamam (rol whitelist + uzunluk/geçmiş + sonda-user + malformed reddi doğrulandı)
- [x] Dummy-key ile malformed (geçersiz JSON/boş/sonda-user-yok/rol enjeksiyonu) → 400, Anthropic'e ulaşmadan
- [x] Key-yok → 503 + zarif offline UI (sahte-online yok); stream-kopması UI'ı takmaz
- [x] **Toplam Anthropic API çağrısı = 0** teyit edildi (happy-path koşulmadı)
- [x] Standalone script scratchpad'de kaldı; bulgular triyajlı PHASE-9 + task doc'a yazıldı

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Alt görev 1 — Sanitizasyon kod-incelemesi (`route.ts`):** akış doğrulandı — (a) `apiKey` gate `:21-24` **ilk** (yoksa 503); (b) `req.json()` try/catch `:27-32` → parse hatası **400** "Invalid request body."; (c) `Array.isArray(body?.messages)` değilse `[]`; (d) sanitize filter `:35-42`: **rol whitelist** (`role==="user"||"assistant"`), `content` **string** ve `trim().length>0`, ardından `slice(-12)` **geçmiş sınırı**; (e) `:44-46` sonda-user **zorunlu** yoksa 400 "A trailing user message is required."; (f) `new Anthropic()` **`:48`** — tüm red yolları **öncesinde**. QUALITY §7 karşılandı.
- **Alt görev 2 — Dummy-key malformed batarya (curl, `ANTHROPIC_API_KEY=sk-ant-dummy-invalid-000`, fresh prod :3100):** 10 malformed girdi 10/10 **400**, `new Anthropic()` öncesi: geçersiz-JSON→400 "Invalid request body."; `{}`/`[]`/not-array/trailing-assistant/system-only-injection/whitespace/non-string/empty-string/no-body → 400 "A trailing user message is required." (veya body parse 400). Dummy key **present** olduğundan apiKey gate geçti → gerçekten malformed kısa-devre test edildi (key-gate değil). Hiçbiri Anthropic'e ulaşmadı.
- **Alt görev 3 — Key-yok offline UI (standalone Playwright `channel:'chrome'`+swiftshader, fresh prod :3100 `env -u ANTHROPIC_API_KEY`):** `/proc/<pid>/environ` ANTHROPIC_API_KEY **count=0** teyit; geçerli mesaj bile **503** "...is not configured" (apiKey gate sanitizasyondan önce → TK4 kanıtı: naif "key-yok+malformed→400" **yanlış-negatif**). UI 8/8: başlangıç greeting görünür (offline değil); **sahte '● online/canlı' presence dot YOK**; öneri tıkla→503→**dürüst offline metni** ("Asistan şu an çevrimdışı…"); kullanıcı balonu render; **Thinking göstergesi kalmadı** (UI takılmadı); input etkileşimli kaldı; ağ gözlemi tüm `/api/chat`=**503** (Anthropic'e ulaşmadı), **200-stream HİÇ** tetiklenmedi. Stream-kopması `route.ts` `:69-77` try/catch/finally (clean fallback enqueue + controller.close) + `Chatbot.tsx` `:38-42/:61-65` (!res.ok→offline; catch→offline) kod-inceleme ile teyitli.
- **Alt görev 4 — 0-çağrı teyit:** gerçek Anthropic key hiç kullanılmadı, happy-path (geçerli key+geçerli istek) **koşulmadı**; gözlemlenen tüm `/api/chat` yanıtları 400 (dummy) veya 503 (key-yok) → **toplam Anthropic API çağrısı = 0**.

**Sorunlar:**
- **Stray/stale `next-server` (memory Süreç Disiplinleri):** dummy→no-key geçişinde `pkill -f 'next start -p 3100'` eşleşmedi (process cmdline `next-server (v1...)`), eski dummy-key PID 104464 portu tuttu → listening-PID ile yakalandı, `kill <PID>` ile durduruldu, no-key server `setsid` ile temiz başlatıldı; `/proc/<pid>/environ` ile key-yokluğu doğrulandı.
- **Standalone `.mjs` scratchpad'de `@playwright/test` çözemedi (ESM bare specifier + repo-dışı konum):** mutlak yol `import pw from "/workspaces/.../node_modules/@playwright/test/index.js"; const {chromium}=pw;` (CJS default export) ile çözüldü. Repo temiz kaldı (script commit'lenmez).

**Kararlar:**
- Yeni karar yok — S7 doğrulama fazı, kaynak kod değişmedi; DECISIONS'a eklenmedi (Hayır). Faz 3 TK3/TK4 deseni birebir doğrulandı.

**Kalan İşler:** Yok (task tamamlandı).

**Dosya Değişiklikleri:**
- Kaynak kod **değişmedi** (doğrulama fazı).
- `scratchpad/s7-chatbot-offline.mjs` — YENİ standalone Playwright (repo dışı, commit'lenmez).

**Test Sonuçları:**
- Malformed batarya (curl, dummy-key): **10/10 → 400** (Anthropic öncesi).
- Key-yok offline UI (Playwright): **8/8 ✓** (503 + dürüst offline + UI takılmadı + 0×200-stream).
- **Toplam Anthropic API çağrısı = 0.** Kapsam-içi bug yok.

---

**Oluşturulma:** 2026-07-02
