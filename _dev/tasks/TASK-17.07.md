# TASK-17.07: S7 — Chatbot 0-Token (offline UI + sanitizasyon)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Sanitizasyon kod-inceleme (`route.ts`)**
  - Doğrula: sanitize adımlarının **hepsi** (role-whitelist L38, `content.trim().length>0` L40, `slice(-12)` L42, son-user-değil kısa-devre L44) `new Anthropic()` (L48) **ÖNCESİNDE**; API key yoksa 503-kapısı önce
  - Malformed input (geçersiz JSON / boş / rol-enjeksiyonu / sonda-user-yok / whitespace) → API'ye **ulaşmadan** 400/kısa-devre; gömülü system/tool sıyrılır

- [ ] **2. Offline UI render (`page.route` + tarayıcı, key yok)**
  - `#chat` inline section görünür; key-yok → zarif offline metni (`t("error")`); **sahte "● online / canlı" presence yok** + UI takılmaz + stream hiç başlamaz
  - **0 gerçek API çağrısı** (env yok → zaten offline; gerekirse SDK mock ile 400/kısa-devre kanıtı — gerçek çağrı asla)

- [ ] **3. Triyaj & kayıt**
  - Kapsam-içi bug → düzeltme task'ı; kayıtlı sahipli açık (per-mesaj max-byte cap yok — min-length + geçmiş-sayısı var) → PHASE-17 kaydı + prd-review (bu fazda litige edilmez); PHASE-17 kaydı

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

- [ ] `route.ts` sanitizasyon adımları (role-whitelist + trim + slice(-12) + son-user kısa-devre) **hepsi** `new Anthropic()` öncesinde; 503-kapısı önce
- [ ] Malformed input (6 varyant) → API'ye ulaşmadan 400/kısa-devre; gömülü system/tool sıyrılır
- [ ] Offline UI: `#chat` inline görünür + zarif offline metni + **sahte online-dot yok** + UI takılmaz + stream hiç
- [ ] **Toplam gerçek API çağrısı = 0** (SDK mock / key-yok)
- [ ] Kayıtlı sahipli açık (max-byte cap) not edildi (prd-review); bulgular triyaj + PHASE-17'ye; kaynak kod değişmedi

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [durum]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
