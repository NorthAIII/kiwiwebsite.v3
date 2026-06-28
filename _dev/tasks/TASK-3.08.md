# TASK-3.08: S7 — Chatbot (0-token: offline + sanitizasyon)

**Durum:** ⬜ Bekliyor
**Modül:** M5 — Chatbot & API (modules/M5-Chatbot-API.md)
**Feature:** S7 — Chatbot 0-token (validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (prod serve; offline + dummy-key koşuları için)

---

## Hedef

Chatbot'u **0-token (sıfır API çağrısı)** doğrula (TK3 üç-katman): (1) sanitizasyon **kod-incelemesi** (omurga); (2) **dummy/geçersiz key** ile malformed-input 400 kısa-devre *çalıştırma* (Anthropic'e ulaşmadan); (3) **key-yok** offline UI (Playwright; sahte-online yok) + stream-kopması UI takılmaz (kod). Happy-path **koşulmaz**. Üç katman koşulup toplam API çağrısı 0 doğrulandığında tamamlanmış sayılır.

---

## Bağlam

Kapsam kararı: chatbot v0.1'de **hiç dokunulmadı** (regresyon riski yok) + canlı streaming prod'da (kiwiailab.com) kanıtlı → API maliyeti gereksiz. **Lisans gerçeği:** site `@anthropic-ai/sdk` + `ANTHROPIC_API_KEY` (token-başına ücretli Anthropic API) kullanır; Claude.ai / Claude Code aboneliği bu sunucu-taraflı SDK çağrısını kimlikleyemez → mevcut lisans chatbot'u besleyemez. Test değeri zaten degradasyon (offline) + güvenlik (sanitizasyon) tarafında; happy-path canlı yol bu fazda test edilmez.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M5-Chatbot-API.md` — F5.1 sanitizasyon (rol whitelist, boş-filtre, son 12, sonda-user), F5.2 offline UI (sahte "online" yok)
- `_dev/phases/PHASE-3.md` — Araştırma → TK3 + Dikkat (apiKey kontrolü sanitizasyondan ÖNCE → 503) + S7 araç satırı
- `_dev/QUALITY.md` — §7 Güvenlik (chat API yüzeyi)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.08 durumu

---

## Alt Görevler

- [ ] **1. Sanitizasyon kod-incelemesi (omurga)**
  - `src/app/api/chat/route.ts`: rol whitelist + boş içerik filtresi + son 12 mesaj + sonda user zorunlu mantığını oku-doğrula (F5.1 / QUALITY §7).

- [ ] **2. Malformed kısa-devre — dummy-key ile (400)**
  - **Geçici dummy/geçersiz `ANTHROPIC_API_KEY` set** edilmiş bir serve'e curl POST: geçersiz JSON / boş messages / rol-enjeksiyon / sonda-user-yok → **400** döner (sanitizasyon `new Anthropic()`/stream'den ÖNCE → Anthropic'e ulaşmaz → **sıfır token**).
  - **YALNIZ malformed gönder** — dummy-key ile geçerli (happy-path) mesaj GÖNDERME (o gerçek API auth'a gider). Sıfır API çağrısı korunur.

- [ ] **3. Key-yok offline UI (ayrı koşu — Playwright)**
  - `ANTHROPIC_API_KEY` yok → her istek **503**; UI zarif "offline" gösterir (sahte yeşil "online" noktası YOK — F5.2 / brief yasağı).

- [ ] **4. Stream-kopması (kod teyidi)**
  - Stream ortada koparsa client'a fallback enqueue edilir, UI takılı kalmaz (F5.2 edge — kod-inceleme).

- [ ] **5. Triyaj (TK6)**

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Dummy-key **ephemeral env var** olarak serve'e verilir (`ANTHROPIC_API_KEY=dummy next start`); `.env` commit'ine dokunulmaz (CLAUDE.md Dokunulmazlar). Bulgular bu task dokümanına.

---

## Dikkat Noktaları

- **apiKey kontrolü sanitizasyondan ÖNCE** **(repo:** route.ts:21-24 → :35-46**).** Sonuç: **key YOKKEN her istek 503** → malformed-400 kısa-devresine ulaşılamaz. Bu yüzden 400 yollarını görmek için **dummy-key ŞART**; offline yolu **ayrı** (key-yok → 503). Naif "key-yok + malformed → 400 bekle" **yanlış-negatif** (503 alır) — research kritik notu.
- **Sıfır API çağrısı korunur:** 400'ler Anthropic'e ulaşmadan döner; happy-path koşulmaz (kapsam + lisans gerçeği).
- **Sahte "online" noktası yok** (F5.2 / brief yasağı) — offline UI dürüst.
- **Ortam:** TASK-3.01 prod build; bu task iki serve konfigürasyonu gerektirir (key-yok = offline; dummy-key = 400 yolları). Her ikisinde PID fresh teyit (memory).

---

## Test Kriterleri

- [ ] Sanitizasyon kod-incelemesi: rol whitelist + boş-filtre + son-12 + sonda-user doğru.
- [ ] dummy-key + malformed (geçersiz JSON / boş / rol-enjeksiyon / sonda-user-yok) → **400** (Anthropic'e ulaşmadan).
- [ ] key-yok → **503** + UI offline (sahte-online yok).
- [ ] stream-kopması → UI takılmaz (kod teyidi).
- [ ] **Toplam API çağrısı = 0** (token harcanmadı).

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

**Durum:** ⬜ Bekliyor

---

**Oluşturulma:** 2026-06-29
