# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-22 — **TASK-18.05 ✅ (dev/ops kimlik referansları).** `.env.example` + `README.md` + `CLAUDE.md` (Dokunulmaz → kullanıcı onayı alındı) Anthropic tanımlayıcıları Groq'a hizalandı: `ANTHROPIC_API_KEY`→`GROQ_API_KEY`, `claude-opus-4-8`→`llama-3.3-70b-versatile`, `@anthropic-ai/sdk`→`groq-sdk`, `console.anthropic.com`→`console.groq.com`. Kapsam sınırı: README task-dışı bayat içerik + `MASTER_PROMPT_v2.md` (brief) dokunulmadı. grep eski tanımlayıcı 0 (exit 1) / GROQ karşılıkları yerinde, `next build` temiz (exit 0). Aktif Faz **18**, Adım **task**; sıradaki **TASK-18.06** (`_dev/` stack docs M5+OVERVIEW+MEMORY). Versiyon Sonu Durumu **içerik_fazları**. **Sıradaki: `/devflow:run-task` (TASK-18.06).** Açık: `GROQ_API_KEY` Vercel env (18.08).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **task** — TASK-18.05 ✅ (dev/ops kimlik referansları — `.env.example`/`README.md`/`CLAUDE.md` Anthropic→Groq, CLAUDE onaylı). Sıradaki **TASK-18.06** (`_dev/` stack dokümanları — M5 + OVERVIEW Korumalı → onay + MEMORY env, kabul kriteri 5). **Sıradaki: `/devflow:run-task` (TASK-18.06).**

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (yeni varsayılan `llama-3.3-70b-versatile`); **canlıya alma Faz 18 sonunda** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık:** `GROQ_API_KEY` Vercel env'e eklenmeli (kullanıcı aksiyonu; koda gömülmez). Test key repo-dışı `.env.keys.local` (git-ignore; canlı deploy'da kullanılmaz).
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — ✅ **tamamlandı (TASK-18.01).** ff-only merge → canlı `df7c293`; temiz `revize/v0.5-chatbot-groq` açıldı+aktif. (Not: merge saf doc değildi — Faz-16 orphan-PNG refactor + gitignore de taşındı; render byte-identical.)
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · npm audit 1 moderate (postcss) + 2 high (`sharp` libvips CVE-2026-*) — **ikisi de `node_modules/next` altında** (Next-upstream, yalnız kırıcı `next@9` downgrade ile "fix"; groq-sdk swap SIFIR vulnerability ekledi); sömürülemez, upstream-bekleyen (DECISIONS 2026-07-16 postcss duruşuyla aynı kategori) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** TASK-18.05 ✅ (2026-07-22) — dev/ops kimlik referansları `.env.example`+`README.md`+`CLAUDE.md` (onaylı) Anthropic→Groq hizalandı; grep eski 0 (exit 1) / GROQ karşılıkları yerinde, `next build` temiz. 5/8 task tamam; sıradaki 18.06 (`_dev/` stack docs M5+OVERVIEW Korumalı→onay+MEMORY env). Kritik kapı korunuyor: 07 (5-dil mühür) geçmeden 08 (go-live) yok; 08 env-önce-merge-sonra. Sıradaki: `/devflow:run-task` (TASK-18.06).
**Aktif Faz Dokümanı:** `phases/PHASE-18.md` (🔄 Faz 18). Faz geçmişi → `PHASES.md`; v0.4 release → `docs/RELEASE-v0.4.md`; Faz 17 → `phases/PHASE-17.md`.

---

## Aktif Versiyon

**Versiyon:** **v0.5 — Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (re-kickoff 2026-07-21 damgaladı; v0.4 ✅ tamamlandı → `PRD/VERSIONS.md`). Anthropic Opus → Groq/`llama-3.3-70b-versatile` ($0/kartsız) + canlıya alma.
**Hedef (v0.5):** `route.ts` Groq'a geçer (streaming/sanitizasyon/zarif offline fallback korunur) + system prompt TR-birincil dil algılama + "fiyat/rakam uydurma" yasağı + hardening per-mesaj max-byte cap + 5-dil çıktı gözle doğrulama → canlıya alma (canlı 503/offline çözülür). Kaynak / 5 kabul kriteri: DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack satırı implementasyon fazında güncellenir.
**Versiyon Sonu Durumu:** **içerik_fazları** (v0.5 başında — içerik fazları henüz koşulmadı; içerik fazı bitince discuss-phase sırasıyla teknik_borç → senaryo_testi → prd_review_bekliyor'a ilerletir).

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-18.06 — `_dev/` stack dokümanları** (`M5-Chatbot-API.md` + `OVERVIEW.md` stack satırı [Korumalı → kullanıcı onayı] + MEMORY "Chatbot env" satırı; Anthropic→Groq stack hizalama; kabul kriteri 5). ⬜ Bekliyor; henüz koşulmadı. Bağımlılık: 18.03 ✅. `/devflow:run-task` ile başlat.
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım task). Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `df7c293`** (branch üzeri çalışma; go-live 18.08).
**İlerleme:** TASK-18.05 ✅ (2026-07-22) — dev/ops kimlik referansları (`.env.example`/`README.md`/`CLAUDE.md` onaylı) Anthropic→Groq hizalandı; grep eski 0 / GROQ yerinde, build temiz. 5/8 task. Sıradaki adım: `/devflow:run-task` (TASK-18.06, yeni oturum).

---

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅ + plan ✅ + verify-plan ✅; 8 task, 5 tamam (18.01 ✅, 18.02 ✅, 18.03 ✅, 18.04 ✅, 18.05 ✅), sıradaki 18.06 (Adım task). Detay/icra → `tasks/TASK-18.0X.md`; snapshot + bağımlılık zinciri → `phases/PHASE-18.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 18.01 | TASK-18.01 | ✅ Tamamlandı | Branch finalize (v0.4 doc-merge → main + v0.5 branch) |
| 18.02 | TASK-18.02 | ✅ Tamamlandı | Sanitize + byte-cap saf modül + Vitest node (C.6) |
| 18.03 | TASK-18.03 | ✅ Tamamlandı | Groq geçişi + system prompt cerrahi (route + package; C.1/C.3/C.4/C.5) |
| 18.04 | TASK-18.04 | ✅ Tamamlandı | Offline kopya ×5 `chat.error` (C.2) |
| 18.05 | TASK-18.05 | ✅ Tamamlandı | Dev/ops kimlik (env/README/CLAUDE — onay alındı) |
| 18.06 | TASK-18.06 | ⬜ Bekliyor | Stack docs (M5+OVERVIEW+MEMORY; kriter-5) |
| 18.07 | TASK-18.07 | ⬜ Bekliyor | 5-dil gözle doğrulama gate (kriter-4) |
| 18.08 | TASK-18.08 | ⬜ Bekliyor | Go-live (env → merge v0.5→main → duman) |

---

## Son Task Özetleri

> **Faz 18: 5/8 task tamam (18.01 ✅, 18.02 ✅, 18.03 ✅, 18.04 ✅, 18.05 ✅).** Faz 17 task özetleri → `phases/PHASE-17.md`.

**TASK-18.05 — Dev/ops kimlik referansları** (✅ 2026-07-22)
- `.env.example` + `README.md` (satır 14/20/30/31/38) + `CLAUDE.md` (satır 284, Dokunulmaz → **kullanıcı onayı alındı**) Anthropic tanımlayıcıları Groq'a hizalandı: `ANTHROPIC_API_KEY`→`GROQ_API_KEY`, `claude-opus-4-8`→`llama-3.3-70b-versatile`, `@anthropic-ai/sdk`→`groq-sdk`, `console.anthropic.com`→`console.groq.com`.
- Kapsam sınırı korundu: README task-dışı bayat içerik (Phase 1 / EN default / Bunker OS) ve `MASTER_PROMPT_v2.md` (brief/hassas) **dokunulmadı**; `.env.example` `CHAT_MODEL` yorumu belirli alt-model yerine Groq docs pointer'ı (halüsinasyon kaçınması).
- grep eski tanımlayıcı **0** (exit 1) / GROQ karşılıkları yerinde, `next build` **temiz** (exit 0).

**TASK-18.04 — Ziyaretçi offline kopya yeniden yazımı** (✅ 2026-07-22)
- `messages/{tr,en,ar,de,es}.json` `chat.error` ×5 yeniden yazıldı: dev anahtar-adı iması ("ANTHROPIC_API_KEY ekleyin") kaldırıldı → ziyaretçiye uygun **geçici-hata** + e-posta CTA (`kivanc@kiwiailab.com`, system prompt CTA'sıyla tutarlı); byte-cap 400 + Groq 429/503 dahil her `!res.ok`'te göründüğü için genel geçici-hata tonu.
- **DEĞER** değişimi (anahtar EKLEME/rename değil) → i18n disiplini korundu, parite otomatik yeşil; register namespace tonuyla eşleşti (DE=Sie, ES=tú, AR tekil informal, EN nötr); AR RTL native + e-posta LTR gömülü.
- `npm run test` **52 passed**, `next build` **temiz** (exit 0), JSON ×5 valid, grep anahtar-adı **0**.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-18.06 — `_dev/` stack dokümanları** (⬜ Bekliyor; bağımlılık 18.03 ✅; `M5-Chatbot-API.md` + `OVERVIEW.md` [Korumalı → onay] + MEMORY env satırı; kabul kriteri 5). Sıradaki adım **`/devflow:run-task`**. Detay → `tasks/TASK-18.06.md`.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅ + plan ✅ + verify-plan ✅, Adım task; 18.01 ✅, 18.02 ✅, 18.03 ✅, 18.04 ✅, 18.05 ✅). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `df7c293`**; aktif branch `revize/v0.5-chatbot-groq`. Faz dokümanı: `phases/PHASE-18.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21. M5 içerik + OVERVIEW stack satırı implementasyon fazına ertelendi.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-07-22 — **TASK-18.05 ✅ (dev/ops kimlik referansları).** Repo-kök dev/kurulum dokümanları `.env.example` + `README.md` (satır 14/20/30/31/38) + `CLAUDE.md` (satır 284, Dokunulmaz → **kullanıcı onayı alındı** 2026-07-22) Anthropic tanımlayıcıları Groq'a hizalandı: `ANTHROPIC_API_KEY`→`GROQ_API_KEY`, `claude-opus-4-8`→`llama-3.3-70b-versatile`, `@anthropic-ai/sdk`→`groq-sdk`, `console.anthropic.com`→`console.groq.com`. `.env.example` `CHAT_MODEL` yorumu belirli Groq alt-modeli isimlendirmek yerine `console.groq.com/docs/models` pointer'ı verildi (PHASE-18 research yalnız `llama-3.3-70b-versatile`'ı kanonik doğruladı → halüsinasyon kaçınması). Kapsam sınırı korundu: README task-dışı bayat içerik (Phase 1 / EN default / Bunker OS / MASTER_PROMPT link) ve `MASTER_PROMPT_v2.md` (brief/hassas — drift raporlanır ama körlemesine değiştirilmez) **dokunulmadı**; tarihsel `_dev/` kayıtları dokunulmadı. Test: grep eski tanımlayıcı (ANTHROPIC_API_KEY/claude-opus-4-8/claude-sonnet-4-6/@anthropic-ai/sdk/console.anthropic.com) **0 eşleşme** (exit 1); grep GROQ karşılıkları hepsi yerinde; `next build` **temiz** (exit 0). Aktif Faz **18**, Adım **task**; sıradaki **TASK-18.06** (`_dev/` stack dokümanları — M5 + OVERVIEW stack satırı [Korumalı → onay] + MEMORY "Chatbot env" satırı; kabul kriteri 5). Versiyon Sonu Durumu **içerik_fazları** (değişmedi). **Sıradaki: `/devflow:run-task` (TASK-18.06)** (yeni oturum). Açık: `GROQ_API_KEY` Vercel env (18.08, kullanıcı aksiyonu).
