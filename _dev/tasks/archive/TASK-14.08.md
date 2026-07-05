# TASK-14.08: S7 — Chatbot (0-token: offline + sanitizasyon)

**Durum:** ✅ Tamamlandı
**Modül:** M5 Chatbot & API (modules/M5-Chatbot-API.md)
**Feature:** S7 senaryo grubu — chatbot 0-token — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.07 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

Chatbot'u **sıfır API çağrısı** ile doğrula: key-yok **offline UI** (dürüst offline metni, sahte "● online" dot yok, UI takılmaz), girdi **sanitizasyonu** kod-incelemesi (rol whitelist / uzunluk / geçmiş sınırı / sonda-user teyidi — hepsi `new Anthropic()` çağrısından önce), **malformed-input kısa-devre** (rol enjeksiyonu / boş / sonda-user-yok → API'ye ulaşmadan red), stream-kopması UI takılmaz. **Toplam API çağrısı = 0** (Faz 3/9 deseni birebir). v0.3 chat'e dokunmadı → regresyon riski yok; versiyon-sonu bütünsellik + 0 maliyet için korunur. Tamamlanma = 0-token doğrulama koşuldu, sonuç kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S7 satırı (kod-inceleme + bundled chromium offline UI, katman A/B; **0 API çağrısı**; inline `#chat` section; malformed kısa-devre); Kapsam Tartışması → Chatbot 0-token kararı
- `_dev/memory/runtime-harness-selector-teyidi.md` — Chatbot floating **değil** inline `#chat` section
- `_dev/QUALITY.md` — §7 Güvenlik (chat API girdisi sanitize: rol whitelist, uzunluk/geçmiş sınırı)
- `src/app/api/chat/route.ts` — apiKey-gate + parse/whitelist/slice/sonda-user sırası; `src/components/` Chatbot UI (offline fallback)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.08 durumu + S7 bulgu notu

---

## Alt Görevler

- [x] **1. Sanitizasyon kod-incelemesi** — Sıra teyit: [route.ts:21-24](src/app/api/chat/route.ts#L21-L24) apiKey-gate→503 · [:26-32](src/app/api/chat/route.ts#L26-L32) parse (try/catch)→400 · [:35-42](src/app/api/chat/route.ts#L35-L42) rol whitelist (`user`/`assistant`) + content string + `trim>0` + `.slice(-12)` geçmiş sınırı · [:44-46](src/app/api/chat/route.ts#L44-L46) sonda-user teyidi→400 · [:48](src/app/api/chat/route.ts#L48) `new Anthropic()`. **Tüm sanitizasyon `new Anthropic()` ÖNCESİNDE ✓**

- [x] **2. Malformed-input kısa-devre (Anthropic öncesi)** — Vitest (SDK mock'lu): geçersiz JSON / boş `[]` / `messages` alanı yok / rol enjeksiyonu (system) / sonda-user-yok / whitespace-content → **hepsi 400, `AnthropicMock` HİÇ çağrılmadı**. Geçerli payload → 200, MOCK çağrıldı (gerçek SDK asla); gömülü system/tool rolleri sıyrıldı; 15→12 slice; aşırı-uzun content max-byte cap'e takılmıyor (gözlem)

- [x] **3. Key-yok offline UI (jsdom component testi — `next start` exit 144 fallback)** — Chatbot (`#chat` inline) 503 fetch → dürüst offline metni (`chat.error` "…çevrimdışı…") görünür; **sahte online-dot/presence YOK** (`/online/i` + `●` render'da yok); UI takılmaz (streaming reset, input yeniden etkin); 2 deneme ikisi de 503 → 200-stream hiç. *(Playwright bundled chromium hedeflenmişti; bu oturumda `next start` exit 144 → PHASE-14 build-ground-truth fallback: gerçek Chatbot component'i jsdom'da aynı offline branch'i egzersiz eder)*

- [x] **4. Sıfır-çağrı teyidi & kayıt** — **Toplam gerçek Anthropic API çağrısı = 0**: gerçek key hiç kullanılmadı + SDK mock seviyesinde bloklu. offline→503 + malformed→400 ikisi de `new Anthropic()` öncesi red. **Kapsam-içi bug YOK.** Sahipli gözlem: per-mesaj max-byte cap yok (min-length + geçmiş-sayısı var) → hardening adayı (prd-review/güvenlik), 0-token kapsamı dışı, bloklayıcı değil

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Harness geçici. YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-14.08.md          # Oturum kaydı + S7 0-token sonuçları
├── phases/PHASE-14.md           # Task Listesi 14.08 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **0 API çağrısı pazarlık-dışı (kullanıcı kararı):** key-yok → HER istek 503 (Anthropic'e ulaşmaz); malformed → dummy-key ile 400 (Anthropic öncesi red). İkisi de gerçek token harcamaz. Gerçek key ile canlı stream testi **YAPMA** (prod'da zaten kanıtlı — Faz 3/9).
- **Selector teyidi (memory):** Chatbot floating değil inline `#chat` section → harness'i buna göre kur. "FAIL" → önce artefakt mı.
- **Sahte-online yasağı (ILKELER):** offline durumda "● online/canlı" dot **olmamalı** (presence-tiyatrosu). Dürüst offline metni serbest.
- **`ANTHROPIC_API_KEY` bu ortamda tanımsız** (env; değer asla yazılmaz) → offline yolu doğal olarak test edilir.

---

## Test Kriterleri

- [x] Sanitizasyon kod-incelemesi: whitelist/uzunluk/sonda-user hepsi `new Anthropic()` öncesi (route.ts:21-46 < :48)
- [x] Malformed girdiler (rol enjeksiyonu/boş/sonda-user-yok/whitespace) → 400 (Anthropic öncesi, mock hiç çağrılmadı)
- [x] Key-yok → `/api/chat` 503, offline UI dürüst (sahte-dot yok), UI takılmaz, 200-stream hiç (jsdom component testi)
- [x] **Toplam gerçek API çağrısı = 0** teyit edildi (gerçek key yok + SDK mock)
- [x] Bulgular triyajlı PHASE-14 + task doc'a

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-05

**Durum:** ✅ Tamamlandı

**Son Yaklaşım:** Vitest (projenin gerçek test aracı) + `@anthropic-ai/sdk` mock → build-ground-truth, ortam-bağımsız, 0-token mock seviyesinde garantili.

**Yapılanlar:**
- **Ortam:** `ANTHROPIC_API_KEY` UNSET (offline yolu doğal), taze `next build` temiz. **`next start`/`test:e2e` bu oturumda exit 144 ile anında ölüyor** (log boş, port hiç açılmıyor) — Faz 13'te uyarılan cloud-devcontainer sandbox worker-fork sorunu bu oturumda aktif. Tarayıcı-server katmanı koşulamadı → PHASE-14 araştırmasının **build-ground-truth fallback** direktifi uygulandı.
- **Subtask 1 — sanitizasyon kod-incelemesi ([route.ts](src/app/api/chat/route.ts)):** sıra `apiKey-gate (21-24, →503)` → `parse try/catch (26-32, →400)` → `rol whitelist user|assistant + content string + trim>0 (35-42)` → `.slice(-12) geçmiş sınırı (42)` → `sonda-user teyidi (44-46, →400)` → `new Anthropic() (48)`. **Tüm sanitizasyon Anthropic kurulumundan ÖNCE ✓.**
- **Subtask 2+4 — route handler runtime (geçici Vitest node harness, SDK mock):** `POST()` doğrudan `new Request(...)` ile çağrıldı; `Anthropic` mock (constructable) → hiçbir koşulda gerçek çağrı. **11 test:** key-yok→503 (mock hiç kurulmadı); geçersiz-JSON / boş-`[]` / `messages`-yok / rol-enjeksiyonu-system / sonda-user-yok / whitespace-content → **6× 400 (mock hiç çağrılmadı, Anthropic öncesi red)**; geçerli-user→200 + `AnthropicMock({apiKey})` çağrıldı (gerçek SDK asla); gömülü `system`+`tool` roller **sıyrıldı** yalnız temiz user gitti; 15 mesaj→`slice(-12)`=12; aşırı-uzun content→200 (max-byte cap YOK, gözlem).
- **Subtask 3 — offline UI (geçici Vitest jsdom harness):** gerçek `<Chatbot>` (`#chat` inline section) `NextIntlClientProvider` içinde render; `fetch` 503 mock; `Reveal` passthrough-mock (GSAP/ScrollTrigger jsdom'da matchMedia gerektirir — umami `next/script` mock deseni). **2 test:** 503→dürüst offline metni (`chat.error` "…çevrimdışı…") görünür + **sahte online-dot/presence YOK** (`/online/i`+`●` render'da yok) + UI takılmaz (streaming reset, input etkin, gönder tekrar açık) + `/api/chat` 1× çağrıldı; 2 deneme ikisi de 503 → 200-stream hiç.
- **Toplam 13/13 PASS** (11 route + 2 UI, `npx vitest run`, 1.02s). Harness iki dosya (`tests/_verify-s7-*.test.{ts,tsx}`) koşu sonrası **silindi** → git temiz, kaynak değişmedi.

**Bulgular / Triyaj:**
- **Toplam gerçek Anthropic API çağrısı = 0** (gerçek key hiç kullanılmadı + SDK mock seviyesinde bloklu). **Kapsam-içi bug YOK.**
- Sanitizasyon gate düzeni doğru: offline (503) ve tüm malformed (400) red'leri `new Anthropic()` **öncesinde** → token-harcayan yola malformed sızmıyor.
- Offline UI dürüst: presence-tiyatrosu yok (sahte "● online" dot yok), dürüst çevrimdışı metni, takılma yok.
- **Sahipli gözlem (record-not-fix):** route'ta per-mesaj **max-byte uzunluk cap'i yok** ("uzunluk" sanitizasyonu = min-length reject-empty + geçmiş-sayısı `slice(-12)`; max-byte değil). 0-token kapsamı dışı + bloklayıcı değil (max_tokens çıktı 1024 cap'li, girdi Anthropic'te ayrıca sınırlı) → güvenlik-hardening adayı, **prd-review**'a.
- **Metodoloji notu:** subtask 3 planı "Playwright bundled chromium" idi; `next start` exit 144 bu oturumda tarayıcı-server katmanını bloke etti → build-ground-truth fallback (gerçek Chatbot component'i jsdom'da **aynı offline branch'i** `!res.ok→setOffline` egzersiz eder). Gerçek-tarayıcı paint/CSS test edilmedi ama offline **mantığı** tam kapsandı; route testi `/api/chat`→503'ü ayrıca kanıtlıyor → uçtan-uca offline yolu bütün.

**Kaynak kod değişmedi** (doğrulama fazı; harness geçici, silindi).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
