# TASK-14.08: S7 — Chatbot (0-token: offline + sanitizasyon)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Sanitizasyon kod-incelemesi**
  - `src/app/api/chat/route.ts`: apiKey-gate → parse → rol whitelist → uzunluk/geçmiş `slice` → sonda-user teyidi sırası; hepsi `new Anthropic()` **öncesinde** (red önce, API'ye ulaşmadan). Satır referanslarını kaydet

- [ ] **2. Malformed-input kısa-devre (dummy-key, Anthropic öncesi)**
  - Dummy/geçersiz key ile malformed girdiler (rol enjeksiyonu, boş, sonda-user-yok, aşırı-uzun) → **400** (Anthropic çağrısı öncesi red); doğru payload'ın da Anthropic'e ulaşmadan kısa-devre olduğunu (dummy-key 401/handled) teyit et — gerçek token harcamadan

- [ ] **3. Key-yok offline UI (Playwright, bundled chromium)**
  - `ANTHROPIC_API_KEY` yok → `/api/chat` **503**; UI dürüst offline metni gösterir (sahte-dot yok, presence-tiyatrosu yok), UI takılmaz
  - Chatbot inline `#chat` section (floating değil — selector teyidi); her istek 503, 200-stream **hiç** olmamalı

- [ ] **4. Sıfır-çağrı teyidi & kayıt**
  - **Toplam gerçek Anthropic API çağrısı = 0** (offline 503 + malformed 400, ikisi de Anthropic öncesi). Kaydet
  - Kapsam-içi bug (sahte online dot, malformed API'ye sızıyor, UI takılıyor) → düzeltme task'ı önerisi

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

- [ ] Sanitizasyon kod-incelemesi: whitelist/uzunluk/sonda-user hepsi `new Anthropic()` öncesi (satır referanslı)
- [ ] Malformed girdiler (rol enjeksiyonu/boş/sonda-user-yok/aşırı-uzun) → 400 (Anthropic öncesi)
- [ ] Key-yok → `/api/chat` 503, offline UI dürüst (sahte-dot yok), UI takılmaz, 200-stream hiç
- [ ] **Toplam gerçek API çağrısı = 0** teyit edildi
- [ ] Bulgular triyajlı PHASE-14 + task doc'a

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldur]

**Bulgular / Triyaj:**
- [0-token teyidi; kapsam-içi bug var/yok]

**Kaynak kod değişmedi** (doğrulama fazı).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
