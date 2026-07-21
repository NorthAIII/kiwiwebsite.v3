# TASK-18.06: `_dev/` stack dokümanları (M5 + OVERVIEW + MEMORY env) — kabul kriteri 5

**Durum:** ⬜ Bekliyor
**Modül:** M5-Chatbot-API (+ OVERVIEW, MEMORY)
**Feature:** C1 (kabul kriteri 5)
**Faz:** Phase 18 (phases/PHASE-18.md)
**Bağımlılıklar:** TASK-18.03 ✅ (implementasyon kesinleşti)

---

## Hedef

v0.5 **kabul kriteri 5** — `M5-Chatbot-API.md` + `OVERVIEW.md` stack satırı final Groq durumuna güncellenir; ek olarak `_dev/MEMORY.md` "Chatbot env" operasyonel satırı `GROQ_API_KEY`'e hizalanır. Dokümanlar kod↔doküman drift'ini kapatır (implementasyon 18.02/18.03'te tamamlandı). Tamamlanma: 3 `_dev/` dokümanında eski provider/model/env kalmadı, Groq gerçeği yansıdı.

---

## Bağlam

DECISIONS 2026-07-21 **kriter-5:** "M5-Chatbot-API.md + OVERVIEW stack satırı güncellenir". discuss-phase: "M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir" (şimdi değiştirmek kod↔doküman drift yaratırdı — o dönem kod hâlâ Anthropic'ti; artık 18.03'te Groq). OVERVIEW **Korumalı** → statik stack bilgisi (provider/model) değişimi bildir/onay. MEMORY "Chatbot env" satırı factual referans düzeltmesi (yeni öğrenim değil).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/DECISIONS.md` 2026-07-21 — kriter-5
- `_dev/modules/M5-Chatbot-API.md` — mevcut Anthropic içerik (satır 4, 13, 16, 20, 49-51)
- `_dev/OVERVIEW.md` — stack tablosu (satır 42) + "Claude chatbot" ifadeleri (satır 22, 52, 54)
- `_dev/MEMORY.md` — "Chatbot env" satırı (Ortam & Araç Notları)
- Nihai `src/app/api/chat/route.ts` (18.03 sonrası — doğru referans için)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [ ] **1. `M5-Chatbot-API.md`**
  - `@anthropic-ai/sdk` → `groq-sdk`; model varsayılanı `claude-opus-4-8` → `llama-3.3-70b-versatile`
  - F5.1 açıklaması: system prompt **TR-birincil** dil algılama + **"rakam uydurma yasağı"** + **byte-cap** sertleştirme (sanitizasyon)
  - Kabul kriteri/edge: `ANTHROPIC_API_KEY` → `GROQ_API_KEY`
  - Teknik Notlar: SDK/model satırı; "Son Güncelleme" tarih

- [ ] **2. `OVERVIEW.md`** (Korumalı → **onay al**)
  - Stack tablosu AI/Chatbot satırı (satır 42): `groq-sdk` + varsayılan `llama-3.3-70b-versatile` + `GROQ_API_KEY`
  - Temel Özellikler / Proje Özeti'ndeki "Claude chatbot" ifadeleri (satır 22, 52, 54) → provider-nötr veya "Groq/Llama"

- [ ] **3. `_dev/MEMORY.md`** "Chatbot env" satırı
  - `ANTHROPIC_API_KEY` → `GROQ_API_KEY`; varsayılan `llama-3.3-70b-versatile`
  - (Index "Son Güncelleme" satırına dokunma — yeni öğrenim eklenmedi, yalnız factual referans düzeltmesi)

---

## Etkilenen Dosyalar

```
_dev/modules/M5-Chatbot-API.md    # Groq/model/prompt/byte-cap/env
_dev/OVERVIEW.md                  # Korumalı → ONAY: stack satırı + provider-nötr chatbot ifadeleri
_dev/MEMORY.md                    # "Chatbot env" satırı → GROQ_API_KEY + llama
```

---

## Dikkat Noktaları

- **OVERVIEW Korumalı** → değişiklikten önce bildir/onay al (statik stack güncellemesi).
- **OVERVIEW yalnız statik bilgi taşır** — dinamik faz/task/ilerleme yazma (o DURUM'da).
- **`_dev/` tarihsel/append-only kayıtlar** (DECISIONS) dokunulmaz — yalnız yaşayan stack dokümanları.
- M5 "Son Güncelleme" tarihi güncellenir.
- MEMORY: yalnız "Chatbot env" satırı; index başlık "Son Güncelleme" (öğrenim log'u) dokunulmaz.

---

## Test Kriterleri

- [ ] M5 + OVERVIEW'da `@anthropic-ai/sdk` / `claude-opus-4-8` / `ANTHROPIC_API_KEY` kalmadı (grep); Groq karşılıkları doğru.
- [ ] OVERVIEW değişikliği kullanıcı onaylı (Korumalı).
- [ ] MEMORY "Chatbot env" satırı `GROQ_API_KEY` + `llama-3.3-70b-versatile`.

---

## Karar Noktaları

- **OVERVIEW (Korumalı) düzenlemesi** → run-task'ta kullanıcı onayı istenir (statik stack bilgisi).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(run-task oturumunda doldurulacak)_

---

**Oluşturulma:** 2026-07-22
