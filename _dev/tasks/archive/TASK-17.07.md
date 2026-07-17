# TASK-17.07: S7 — Chatbot 0-Token (offline UI + sanitizasyon)

**Durum:** ✅ Tamamlandı
**Modül:** M5 Chatbot & API (modules/M5-Chatbot-API.md)
**Feature:** S7 senaryo grubu — chatbot offline + sanitizasyon (doğrulama, **0 API çağrısı**)
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.06 ✅ (lineer sıra)

---

## Hedef

Chatbot'u **sıfır API token** harcayarak doğrula: (1) **kod-inceleme** (`src/app/api/chat/route.ts`) — girdi sanitizasyonunun **tümü** `new Anthropic()` **öncesinde** çalışıyor mu (role-whitelist + `content.trim().length>0` + `slice(-12)` + son-mesaj-user-değilse kısa-devre 400); (2) **offline UI render** (`page.route` + tarayıcı) — key yok → `#chat` inline section zarif offline metni + **sahte "● online" / presence-tiyatrosu yok** + UI takılmaz. v0.4 chat koduna **hiç dokunmadı** → regresyon riski yok; canlı `ANTHROPIC_API_KEY` env yok → zaten offline. **Toplam gerçek API çağrısı = 0** (SDK mock veya key-yok). Tamamlanma = kod-inceleme + offline UI koşuldu, triyajlı PHASE-17'ye kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S7 araç satırı (A: kod-inceleme `route.ts` + C: offline UI render; sanitizasyon `new Anthropic()` öncesi **teyitli**: role-whitelist + `trim().length>0` + `slice(-12)` + malformed kısa-devre) + Kapsam Dışı (per-mesaj max-byte cap yok = kayıtlı sahipli açık, prd-review)
- `_dev/memory/runtime-harness-selector-teyidi.md` — Chatbot floating değil **inline `#chat` section**
- `src/app/api/chat/route.ts` — sanitizasyon sırası (L34-44 sanitize → L48 `new Anthropic()`), 503-kapısı
- `src/components/Chatbot.tsx` — `offline` state (L14), `#chat` inline (L71), `t("error")` offline metni (L103)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.07 durumu + S7 bulgu notu

---

## Alt Görevler

- [x] **1. Sanitizasyon kod-inceleme (`route.ts`)**
  - ✅ Doğrulandı (kod-inceleme + Vitest mock harness): sanitize adımlarının **hepsi** (role-whitelist L38, `content.trim().length>0` L40, `slice(-12)` L42, son-user-değil kısa-devre L44) `new Anthropic()` (L48) **ÖNCESİNDE**; API key yoksa 503-kapısı L22-24 önce (JSON-parse guard L27-32 arada). Satır no'ları birebir eşleşti.
  - ✅ Malformed input **8 varyant** (geçersiz JSON / boş `{}` / messages-array-değil / boş `[]` / rol-enjeksiyonu system+tool / sonda-assistant / whitespace-only / string-olmayan içerik) → hepsi API'ye **ulaşmadan** 400; `new Anthropic()` ctor + stream **HİÇ çağrılmadı** (12/12 Vitest PASS). Gömülü system/tool sıyrıldı (`[system,user]`→yalnız `{user}` forward).

- [x] **2. Offline UI render (`page.route` + tarayıcı, key yok)**
  - ✅ `#chat` **inline `<section>`** (position:static, floating değil — memory selector teyidi); greeting görünür; input+send mevcut; key-yok → mesaj gönder → `/api/chat` 503 → zarif offline metni (`t("error")` "…çevrimdışı…"); **sahte "online/çevrimiçi" presence + yeşil ping-dot YOK** (offline durumda); UI takılmadı (kullanıcı balonu var, sonsuz Thinking yok, input kullanılabilir); stream hiç başlamadı (8/8 UI PASS).
  - ✅ **0 gerçek Anthropic çağrısı** — Vitest SDK tümüyle mock (yapı gereği 0 ağ) + UI harness `/api/chat` intercept 503 (`anthropicCalls=0`); tek benign dış = `umami.kiwiailab.com` analytics (offline, render'a etkisiz).

- [x] **3. Triyaj & kayıt**
  - ✅ Kapsam-içi bug YOK. **Kayıtlı sahipli açık (record-not-fix):** per-mesaj max-byte cap yok (min-length `trim>0` + geçmiş-sayısı `slice(-12)` var) → prd-review hardening adayı, bu fazda litige edilmedi. UI harness U8'de ilk "fail" (dış host aşırı-genişliği) benign umami olarak triyaj edildi = gerçek bug değil. PHASE-17 kaydı.

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Runtime harness geçici (koşulur, silinir). Referans tanımlayıcılar ZATEN-VAR (route.ts + Chatbot.tsx repoda). ANTHROPIC_API_KEY dış/env (bu ortamda yok — değer asla yazılmaz). YENİ kalıcı dosya yok. -->

```
_dev/
├── tasks/TASK-17.07.md          # Oturum kaydı + kod-inceleme + offline UI sonuçları
├── phases/PHASE-17.md           # Task Listesi 17.07 + notu
└── DURUM.md                     # Aktif task + özet
(geçici runtime harness proje-içine yazılıp koşulduktan sonra silinir — commit'lenmez)
```

---

## Dikkat Noktaları

- **0 API çağrısı pazarlık dışı (Faz 3/9/14 deseni birebir):** gerçek Anthropic çağrısı YOK — env'de key yok (zaten offline) + gerekirse SDK mock. Değer asla yazılmaz.
- **Sanitizasyon `new Anthropic()` öncesi (araştırma teyitli):** sıra bozuksa (sanitize `new Anthropic()` sonrası) güvenlik açığı — L34-44 hepsi L48 öncesinde olmalı.
- **Selector teyidi (memory):** Chatbot floating değil **inline `#chat` section** → floating beklersen yanlış-FAIL.
- **v0.4 chat'e dokunmadı:** S7 regresyon riski yok; versiyon-sonu bütünsellik + 0 maliyet için korunur (Faz 14 paritesi).
- **Kayıtlı sahipli açık (record-not-fix):** per-mesaj max-byte cap yok (min-length + geçmiş-sayısı var) → prd-review hardening adayı; bu fazda **litige edilmez**.

---

## Test Kriterleri

- [x] `route.ts` sanitizasyon adımları (role-whitelist + trim + slice(-12) + son-user kısa-devre) **hepsi** `new Anthropic()` öncesinde; 503-kapısı önce → ✅ (satır no'ları birebir + 12/12 Vitest)
- [x] Malformed input (**8 varyant**) → API'ye ulaşmadan 400/kısa-devre; gömülü system/tool sıyrılır → ✅ (ctor+stream hiç çağrılmadı)
- [x] Offline UI: `#chat` inline görünür + zarif offline metni + **sahte online-dot yok** + UI takılmaz + stream hiç → ✅ (8/8 UI)
- [x] **Toplam gerçek Anthropic API çağrısı = 0** (SDK mock + key-yok/intercept 503) → ✅ (`anthropicCalls=0`)
- [x] Kayıtlı sahipli açık (max-byte cap) not edildi (prd-review); bulgular triyaj + PHASE-17'ye; kaynak kod değişmedi → ✅

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-18 (run-task 17.07)

**Durum:** ✅ Tamamlandı — S7 chatbot 0-token **GEÇTİ, 20/20 çekirdek assertion PASS (12 route + 8 UI), 0 gerçek Anthropic çağrısı, 0 kapsam-içi bug.** Kaynak kod değişmedi (doğrulama fazı).

**Yaklaşım (A kod-inceleme + C offline UI, 0-token):**
- **A — route.ts kod-inceleme + Vitest mock harness** (`tests/_verify-s7.test.ts`, `@anthropic-ai/sdk` tümüyle mock → 0 ağ): sanitizasyon sırası + malformed kısa-devre.
- **C — offline UI** (`tests/_verify-s7-ui.mjs`, `page.route` + system Chrome, TR cookie): `/api/chat` intercept 503 (canlı no-key taklidi), gerçek dış çağrı sayacı.
- Her ikisi proje-içine yazıldı, koşuldu, **silindi** (git temiz).

**Sonuçlar:**
- **Sanitizasyon sırası (kod-inceleme):** 503-kapısı L22-24 (en önce) → JSON-parse guard L27-32 → sanitize L35-42 (role-whitelist L38 + `content.trim().length>0` L40 + `.slice(-12)` L42) → trailing-user kısa-devre L44-46 → **`new Anthropic()` L48 (tüm sanitizasyondan SONRA)**. Task'taki satır no'ları birebir doğrulandı.
- **Route mantığı (Vitest 12/12 PASS):** key-yok → 503 (ctor hiç); 8 malformed varyant (geçersiz JSON / `{}` / array-değil / `[]` / rol-enjeksiyonu system+tool / trailing-assistant / whitespace-only / string-olmayan içerik) → hepsi **400, ctor+stream HİÇ çağrılmadı** (kısa-devre `new Anthropic()` öncesi kanıtlandı); `[system,user]` → system sıyrıldı, yalnız `{user}` forward; 20 mesaj → `slice(-12)` 12 forward (sonda user); SDK mock → **0 gerçek çağrı**.
- **Offline UI (page.route 8/8 PASS):** `#chat` **inline `<section>`** (position:static, floating değil); greeting görünür; input+send; **sahte online/çevrimiçi + yeşil ping-dot YOK**; mesaj gönder → `/api/chat` 503 → zarif offline metni (`t("error")` "Asistan şu an çevrimdışı…"); UI takılmadı (kullanıcı balonu var, sonsuz Thinking yok, input kullanılabilir); stream hiç başlamadı; **Anthropic çağrısı=0** (tek benign dış: `umami.kiwiailab.com` analytics, offline).
- **Triyaj:** UI harness ilk koşuda U8 "fail" (dış-host aşırı-genişliği) → kategorize edilince benign umami analytics olduğu görüldü = harness assertion aşırılığı, gerçek bug değil. **Kayıtlı sahipli açık:** per-mesaj max-byte cap yok (min-length + geçmiş-sayısı var) → prd-review, litige edilmedi.

**Sıradaki: run-task TASK-17.08** (S9 adversarial/holistik + canlı duman — fazın son task'ı).

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
