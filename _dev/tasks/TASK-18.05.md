# TASK-18.05: Dev/ops kimlik referansları (.env.example, README.md, CLAUDE.md)

**Durum:** ⬜ Bekliyor
**Modül:** M6-SEO-Deploy (+ repo kök dokümanları)
**Feature:** C1 (kimlik-drift — research checklist)
**Faz:** Phase 18 (phases/PHASE-18.md)
**Bağımlılıklar:** TASK-18.03 ✅ (env var adı + model kesinleşti)

---

## Hedef

Repo kök / dev dokümanlarındaki `ANTHROPIC_API_KEY` / `claude-opus-4-8` / `@anthropic-ai/sdk` referanslarını Groq karşılıklarıyla güncelle: `.env.example`, `README.md`, `CLAUDE.md` (Dokunulmaz → kullanıcı onayı). Ziyaretçi değil dev/kurulum-görünür; canlıya almadan tutarlı olmalı (yanlış env adı = kurulum hatası). Tamamlanma: hedef 3 dosyada eski tanımlayıcı kalmadı, GROQ karşılıkları doğru.

---

## Bağlam

Research **kimlik-drift checklist** — tanımlayıcı kriter-5'ten (M5+OVERVIEW) geniş; `ANTHROPIC_API_KEY` dev/kurulum dokümanlarında da geçiyor. Bu task **repo-kök dev dokümanlarını** kapsar (`_dev/` stack dokümanları → TASK-18.06; ziyaretçi i18n → TASK-18.04). **`MASTER_PROMPT_v2.md`** (brief — hassas/vizyon) bu task'ta **DEĞİL**: brief tarihsel/vizyon dokümanıdır, drift raporlanır ama körlemesine değiştirilmez (ayrı ele alınır — gerekirse kullanıcıya getir).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` — Dikkat: kimlik tanımlayıcı drift checklist
- `/CLAUDE.md` — Dokunulmazlar → Secret'lar satırı (`ANTHROPIC_API_KEY`)
- `.env.example`, `README.md` — mevcut referanslar

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [ ] **1. `.env.example`**
  - `ANTHROPIC_API_KEY` → `GROQ_API_KEY`; yorum (Anthropic console → Groq console `console.groq.com`)
  - `CHAT_MODEL` varsayılanı `claude-opus-4-8` → `llama-3.3-70b-versatile`; "flagship/sonnet" yorumu Groq'a uyarla
  - Değer **boş** kalır (sır gömülmez)

- [ ] **2. `README.md`** (grep-teyitli satırlar: ~20, 30, 31, 38, 39)
  - `ANTHROPIC_API_KEY` → `GROQ_API_KEY`; model varsayılanı; Vercel env adımı; provider/SDK adı

- [ ] **3. `CLAUDE.md`** (Dokunulmaz → **onay al**)
  - Dokunulmazlar → Secret'lar satırı `ANTHROPIC_API_KEY` → `GROQ_API_KEY`
  - grep ile CLAUDE.md'deki tüm ANTHROPIC/claude-opus referansları taranır (Projeye Özgü Kurallar / stack aynası varsa)

---

## Etkilenen Dosyalar

```
.env.example      # GROQ_API_KEY + model + yorum (.env* Dokunulmaz; .example şablon, değer boş → meşru)
README.md         # kurulum + env + model referansları
CLAUDE.md         # Dokunulmaz → ONAY: Secret'lar satırı GROQ_API_KEY
```

---

## Dikkat Noktaları

- **CLAUDE.md Dokunulmaz** → değişiklikten önce kullanıcıya bildir/onay al (kimlik-referansı düzeltmesi; içerik-koruyan).
- **`.env.example` şablon;** gerçek değer asla yazılmaz (sır ilkesi). `.env*` Dokunulmaz deseni ama `.example` şablon güncellemesi meşru (değer boş).
- **`MASTER_PROMPT_v2.md` bu task'ta değil** (brief/hassas — ayrı; drift raporla, körlemesine değiştirme).
- **`_dev/` tarihsel/append-only kayıtlar** (DECISIONS vb.) dokunulmaz — yalnız yaşayan dev dokümanları.
- grep ile teyit: hedef 3 dosyada `ANTHROPIC_API_KEY`/`claude-opus-4-8`/`@anthropic-ai/sdk` kalmadı.

---

## Test Kriterleri

- [ ] grep: `.env.example` + `README.md` + `CLAUDE.md`'de `ANTHROPIC_API_KEY` / `claude-opus-4-8` / `@anthropic-ai/sdk` kalmadı; GROQ karşılıkları var.
- [ ] `next build` temiz (sanity — bu dosyalar build'i doğrudan etkilemez).
- [ ] CLAUDE.md değişikliği kullanıcı onaylı.

---

## Karar Noktaları

- **CLAUDE.md (Dokunulmaz) düzenlemesi** → run-task'ta kullanıcı onayı istenir (kimlik-referansı düzeltmesi; anlamı değiştirmez).

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
