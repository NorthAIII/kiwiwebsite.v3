# TASK-18.06: `_dev/` stack dokümanları (M5 + OVERVIEW + MEMORY env) — kabul kriteri 5

**Durum:** ✅ Tamamlandı
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

- [x] **1. `M5-Chatbot-API.md`**
  - `@anthropic-ai/sdk` → `groq-sdk`; model varsayılanı `claude-opus-4-8` → `llama-3.3-70b-versatile`
  - F5.1 açıklaması: system prompt **TR-birincil** dil algılama + **"rakam uydurma yasağı"** + **byte-cap** sertleştirme (sanitizasyon) — ayrıca `messages.stream()` → OpenAI-uyumlu `chat.completions.create({stream})`, sanitize saf modül pointer'ı
  - Kabul kriteri/edge: `ANTHROPIC_API_KEY` → `GROQ_API_KEY` (+ 503 offline, byte-cap 400)
  - Teknik Notlar: SDK `^1.3.0`/model satırı; "Son Güncelleme" tarih

- [x] **2. `OVERVIEW.md`** (Korumalı → **onay alındı** 2026-07-22)
  - Stack tablosu AI/Chatbot satırı (satır 42): `groq-sdk` + varsayılan `llama-3.3-70b-versatile` + `GROQ_API_KEY`
  - "Claude chatbot" ifadeleri (satır 28 Kapsam, 52 Temel Özellikler) → provider-nötr "Groq/Llama" (+ TR-birincil); kod-ağacı yorumu (67) "Claude streaming" → "Groq streaming"; Son Güncelleme (123)
  - Not: `CLAUDE.md` dosya-adı referansları (115/119) chatbot değil → dokunulmadı

- [x] **3. `_dev/MEMORY.md`** "Chatbot env" satırı
  - `ANTHROPIC_API_KEY` → `GROQ_API_KEY`; varsayılan `llama-3.3-70b-versatile`. Secret-örnek satırı (97) da GROQ'a hizalandı (factual referans düzeltmesi, artık var olmayan key)
  - Index "Son Güncelleme" satırına dokunulmadı (yeni öğrenim yok — kapsam gereği)

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

- [x] M5 + OVERVIEW'da `@anthropic-ai/sdk` / `claude-opus-4-8` / `ANTHROPIC_API_KEY` kalmadı (grep exit 1); Groq karşılıkları doğru.
- [x] OVERVIEW değişikliği kullanıcı onaylı (Korumalı — AskUserQuestion "Onayla, uygula").
- [x] MEMORY "Chatbot env" satırı `GROQ_API_KEY` + `llama-3.3-70b-versatile`.

---

## Karar Noktaları

- **OVERVIEW (Korumalı) düzenlemesi** → run-task'ta kullanıcı onayı istenir (statik stack bilgisi).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum 1 — 2026-07-22 (run-task) ✅ Tamamlandı

**Yapılanlar:**
- **`M5-Chatbot-API.md`** (yaşayan doküman, onaysız): 7 nokta güncellendi — Sorumluluk/Bağımlılık (`groq-sdk` OpenAI-uyumlu), F5.1 açıklama (varsayılan `llama-3.3-70b-versatile`, TR-birincil dil algılama, rakam-uydurma yasağı, sanitize saf modül + per-mesaj byte-cap 8192→400, OpenAI-uyumlu `chat.completions.create({stream})`), kabul kriteri + edge (`GROQ_API_KEY` yoksa 503), Bağımlılık env, Teknik Notlar (Groq SDK `^1.3.0` + llama + env), "Son Güncelleme".
- **`OVERVIEW.md`** (Korumalı → **onay alındı**, AskUserQuestion): 5 değişiklik — Kapsam (28) + Temel Özellikler (52) "Claude chatbot" → "chatbot (Groq/Llama)"; stack tablosu (42) `groq-sdk`/`llama-3.3-70b-versatile`/`GROQ_API_KEY`; kod-ağacı yorumu (67) "Claude streaming" → "Groq streaming"; Son Güncelleme (123). `CLAUDE.md` dosya-adı referansları (115/119) chatbot değil → dokunulmadı.
- **`MEMORY.md`**: "Chatbot env" satırı (43) `GROQ_API_KEY` + `llama-3.3-70b-versatile`; secret-örnek satırı (97) da GROQ'a hizalandı (factual — var olmayan key'e referansı kaldırma). Index başlık "Son Güncelleme" dokunulmadı (yeni öğrenim yok).

**Sonuç / Test:**
- grep eski provider tanımlayıcı (`@anthropic-ai/sdk`/`claude-opus-4-8`/`ANTHROPIC_API_KEY`/"claude streaming"/"claude chatbot") M5+OVERVIEW+MEMORY'de **0** (exit 1).
- Groq karşılıkları M5 + OVERVIEW'da yerinde; MEMORY "Chatbot env" = `GROQ_API_KEY` + `llama-3.3-70b-versatile`.
- Doküman-only task (`src/` değişmedi) → build gerekmedi; test = grep doğrulaması.
- **Kabul kriteri 5 (DECISIONS 2026-07-21) karşılandı** — kod↔doküman stack drift'i kapandı.

**Son Yaklaşım:** Tamamlandı — ek iş yok.
**Sonraki Adım Detayı:** Faz 18'de sıradaki **TASK-18.07** (5-dil gözle doğrulama gate; kabul kriteri 4 — marka mührü). Kritik kapı: 18.07 geçmeden 18.08 (go-live) yapılmaz.

---

**Oluşturulma:** 2026-07-22
