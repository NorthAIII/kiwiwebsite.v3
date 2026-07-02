# TASK-9.08: S7 — Chatbot 0-Token (Offline + Sanitizasyon)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Sanitizasyon kod-incelemesi (omurga)**
  - `route.ts`: rol whitelist, uzunluk/geçmiş sınırı, sonda-user zorunluluğu, boş/malformed reddi — kod okunarak doğrulanır (QUALITY §7)

- [ ] **2. Malformed kısa-devre — dummy key ile (0-çağrı)**
  - **Dummy/geçersiz key** set (gerçek key değil) → malformed girdilerle POST: geçersiz JSON / boş body / sonda-user-yok / rol enjeksiyonu → **400** döner, `new Anthropic()`'ten (`:48`) **önce** → sıfır API çağrısı
  - **Not (TK4):** apiKey kontrolü sanitizasyondan **önce** — key **yokken** her istek 503 alır (malformed 400'e ulaşılamaz); bu yüzden 400 yollarını çalıştırmak için **geçersiz key** gerekir (naif "key-yok + malformed → 400" yanlış-negatif)

- [ ] **3. Key-yok offline UI (ayrı yol)**
  - Key **kaldırılmış** ortamda → 503; Chatbot UI **zarif offline** gösterir (sahte "● online/canlı" yok — ILKELER niyet-bazlı yasak); standalone Playwright ile UI gözlem
  - Stream-kopması: kesilen yanıt UI'ı takmaz (kod-inceleme + gözlem)

- [ ] **4. 0-çağrı teyit & kayıt**
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

- [ ] Sanitizasyon kod-incelemesi tamam (rol whitelist + uzunluk/geçmiş + sonda-user + malformed reddi doğrulandı)
- [ ] Dummy-key ile malformed (geçersiz JSON/boş/sonda-user-yok/rol enjeksiyonu) → 400, Anthropic'e ulaşmadan
- [ ] Key-yok → 503 + zarif offline UI (sahte-online yok); stream-kopması UI'ı takmaz
- [ ] **Toplam Anthropic API çağrısı = 0** teyit edildi (happy-path koşulmadı)
- [ ] Standalone script scratchpad'de kaldı; bulgular triyajlı PHASE-9 + task doc'a yazıldı
