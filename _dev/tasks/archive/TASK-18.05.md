# TASK-18.05: Dev/ops kimlik referansları (.env.example, README.md, CLAUDE.md)

**Durum:** ✅ Tamamlandı
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

- [x] **1. `.env.example`**
  - `ANTHROPIC_API_KEY` → `GROQ_API_KEY`; yorum (Anthropic console → Groq console `console.groq.com`)
  - `CHAT_MODEL` varsayılanı `claude-opus-4-8` → `llama-3.3-70b-versatile`; "flagship/sonnet" yorumu Groq docs pointer'ına uyarlandı
  - Değer **boş** kaldı (sır gömülmez; `CHAT_MODEL` varsayılanı — sır değil — dolu, mevcut deseni korur)

- [x] **2. `README.md`** (grep-teyitli satırlar: 14, 20, 30, 31, 38)
  - `ANTHROPIC_API_KEY` → `GROQ_API_KEY`; model varsayılanı; Vercel env adımı; provider/SDK adı (`@anthropic-ai/sdk` → `groq-sdk`, "(Claude)" → "(Llama 3.3 on Groq)")

- [x] **3. `CLAUDE.md`** (Dokunulmaz → **onay alındı** 2026-07-22)
  - Dokunulmazlar → Secret'lar satırı (284) `ANTHROPIC_API_KEY` → `GROQ_API_KEY`
  - grep ile CLAUDE.md tarandı: tek referans satır 284 (başka ANTHROPIC/claude-opus yok)

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

- [x] grep: `.env.example` + `README.md` + `CLAUDE.md`'de `ANTHROPIC_API_KEY` / `claude-opus-4-8` / `claude-sonnet-4-6` / `@anthropic-ai/sdk` / `console.anthropic.com` kalmadı (exit 1 = 0 eşleşme); GROQ karşılıkları doğru yerde.
- [x] `next build` temiz (exit 0).
- [x] CLAUDE.md değişikliği kullanıcı onaylı (2026-07-22).

---

## Karar Noktaları

- **CLAUDE.md (Dokunulmaz) düzenlemesi** → run-task'ta kullanıcı onayı istenir (kimlik-referansı düzeltmesi; anlamı değiştirmez).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-22

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `.env.example` yeniden yazıldı: `ANTHROPIC_API_KEY` → `GROQ_API_KEY` (değer boş), `console.anthropic.com` → `console.groq.com`, `CHAT_MODEL` varsayılanı `claude-opus-4-8` → `llama-3.3-70b-versatile`. "flagship/sonnet düşük-gecikme" yorumu → Groq models docs pointer'ı (belirli bir Groq alt-modeli isimlendirilmedi — halüsinasyon kaçınması; docs kanonik kaynak).
- `README.md` 5 satır (14/20/30/31/38): SDK `@anthropic-ai/sdk` → `groq-sdk` + "(Claude)" → "(Llama 3.3 on Groq)"; kurulum ipucu + env tablosu + Vercel adımı `ANTHROPIC_API_KEY` → `GROQ_API_KEY`; model varsayılanı + Groq models linki.
- `CLAUDE.md` satır 284 (Dokunulmaz → **kullanıcı onayı alındı**): Secret'lar satırı `ANTHROPIC_API_KEY` → `GROQ_API_KEY`.

**Sorunlar:**
- Yok. Değişiklikler mekanik kimlik-swap; build'i etkilemez (doküman/şablon).

**Kararlar:**
- `.env.example` `CHAT_MODEL` yorumunda belirli bir "hızlı Groq modeli" (örn. llama-3.1-8b-instant) isimlendirmek yerine `console.groq.com/docs/models` pointer'ı verildi. Gerekçe: PHASE-18 research yalnız `llama-3.3-70b-versatile`'ı kanonik doğruladı; başka model adı bu oturumda doğrulanmadı → halüsinasyon kaçınması, docs canonical.
- Kapsam sınırı korundu: README'deki task-dışı bayat içerik ("Phase 1", "EN default", "Bunker OS", MASTER_PROMPT link) **dokunulmadı** — bu task yalnız Anthropic→Groq kimlik tanımlayıcılarını kapsar; diğer drift ayrı iş.
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari karar yok; C.1–C.5 zaten kayıtlı, bu icra onların dev-doküman ayağı).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- `.env.example` → tam yeniden yazım (Groq env + model + yorumlar)
- `README.md` → 5 satır kimlik-swap (SDK/env/model/Vercel adımı)
- `CLAUDE.md` → satır 284 Secret'lar `GROQ_API_KEY` (onaylı)

**Test Sonuçları:**
- grep eski tanımlayıcı (ANTHROPIC_API_KEY/claude-opus-4-8/claude-sonnet-4-6/@anthropic-ai/sdk/console.anthropic.com) → **0 eşleşme** (exit 1) ✓
- grep GROQ karşılıkları (GROQ_API_KEY/llama-3.3-70b-versatile/groq-sdk/console.groq.com) → hepsi yerinde ✓
- `next build` → **exit 0** (temiz) ✓

---

## Sonuç Özeti

Repo-kök dev/kurulum dokümanlarındaki (`.env.example`, `README.md`, `CLAUDE.md`) Anthropic kimlik tanımlayıcıları Groq karşılıklarıyla hizalandı — canlıya almadan önce env-adı tutarlılığı sağlandı (yanlış env adı = kurulum hatası riski kapatıldı). `MASTER_PROMPT_v2.md` (brief/hassas) ve tarihsel `_dev/` kayıtları kapsam dışı bırakıldı. Kalan kimlik-drift ayakları: ziyaretçi i18n (18.04 ✅), kod (18.03 ✅), `_dev/` stack dokümanları + MEMORY env satırı (→ TASK-18.06).

---

**Oluşturulma:** 2026-07-22
**Tamamlanma:** 2026-07-22
