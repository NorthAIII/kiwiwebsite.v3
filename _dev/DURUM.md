# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-22 — **TASK-18.02 ✅ (Sanitize + byte-cap saf modül).** `route.ts` inline sanitizasyonu saf `src/lib/chat-sanitize.ts`'e çıkarıldı (whitelist/slice(-12)/trailing-user korundu) + UTF-8 byte-cap 8192 (aşılırsa 400); Anthropic kısmı değişmedi. 13 test Vitest node, `npm run test` 52 passed, `next build` temiz. Aktif Faz **18**, Adım **task**; sıradaki **TASK-18.03** (Groq geçişi + system prompt). Versiyon Sonu Durumu **içerik_fazları**. **Sıradaki: `/devflow:run-task` (TASK-18.03).** Açık: `GROQ_API_KEY` Vercel env (18.08).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **task** — TASK-18.02 ✅ (sanitize+byte-cap saf modül + Vitest node). Sıradaki **TASK-18.03** (Groq geçişi + system prompt cerrahi). **Sıradaki: `/devflow:run-task` (TASK-18.03).**

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (yeni varsayılan `llama-3.3-70b-versatile`); **canlıya alma Faz 18 sonunda** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık:** `GROQ_API_KEY` Vercel env'e eklenmeli (kullanıcı aksiyonu; koda gömülmez). Test key repo-dışı `.env.keys.local` (git-ignore; canlı deploy'da kullanılmaz).
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — ✅ **tamamlandı (TASK-18.01).** ff-only merge → canlı `df7c293`; temiz `revize/v0.5-chatbot-groq` açıldı+aktif. (Not: merge saf doc değildi — Faz-16 orphan-PNG refactor + gitignore de taşındı; render byte-identical.)
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · npm audit 2 moderate (postcss Next'e gömülü, sömürülemez; DECISIONS 2026-07-16, upstream-bekleyen) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** TASK-18.02 ✅ (2026-07-22) — sanitize+byte-cap saf modül `src/lib/chat-sanitize.ts` + route bağlandı (Anthropic değişmedi) + 13 test Vitest node (52 passed, build temiz). 2/8 task tamam; sıradaki 18.03 (Groq geçişi + system prompt cerrahi). Kritik kapı korunuyor: 07 (5-dil mühür) geçmeden 08 (go-live) yok; 08 env-önce-merge-sonra. Sıradaki: `/devflow:run-task` (TASK-18.03).
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

**Task:** **TASK-18.03 — Groq geçişi + system prompt cerrahi** (route.ts + package.json; `groq-sdk` drop-in, TR-birincil prompt + rakam-uydurma yasağı; C.1/C.3/C.4/C.5). ⬜ Bekliyor; henüz koşulmadı. Bağımlılık: 18.02 ✅. `/devflow:run-task` ile başlat.
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım task). Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `df7c293`** (branch üzeri çalışma; go-live 18.08).
**İlerleme:** TASK-18.02 ✅ (2026-07-22) — sanitize+byte-cap saf modül + route bağlandı + 13 test (52 passed, build temiz). 2/8 task. Sıradaki adım: `/devflow:run-task` (TASK-18.03, yeni oturum).

---

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅ + plan ✅ + verify-plan ✅; 8 task, 2 tamam (18.01 ✅, 18.02 ✅), sıradaki 18.03 (Adım task). Detay/icra → `tasks/TASK-18.0X.md`; snapshot + bağımlılık zinciri → `phases/PHASE-18.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 18.01 | TASK-18.01 | ✅ Tamamlandı | Branch finalize (v0.4 doc-merge → main + v0.5 branch) |
| 18.02 | TASK-18.02 | ✅ Tamamlandı | Sanitize + byte-cap saf modül + Vitest node (C.6) |
| 18.03 | TASK-18.03 | ⬜ Bekliyor | Groq geçişi + system prompt cerrahi (route + package; C.1/C.3/C.4/C.5) |
| 18.04 | TASK-18.04 | ⬜ Bekliyor | Offline kopya ×5 `chat.error` (C.2) |
| 18.05 | TASK-18.05 | ⬜ Bekliyor | Dev/ops kimlik (env/README/CLAUDE — onay) |
| 18.06 | TASK-18.06 | ⬜ Bekliyor | Stack docs (M5+OVERVIEW+MEMORY; kriter-5) |
| 18.07 | TASK-18.07 | ⬜ Bekliyor | 5-dil gözle doğrulama gate (kriter-4) |
| 18.08 | TASK-18.08 | ⬜ Bekliyor | Go-live (env → merge v0.5→main → duman) |

---

## Son Task Özetleri

> **Faz 18: 2/8 task tamam (18.01 ✅, 18.02 ✅).** Faz 17 task özetleri → `phases/PHASE-17.md`.

**TASK-18.02 — Sanitize + byte-cap saf modül** (✅ 2026-07-22)
- `route.ts` inline sanitizasyonu saf `src/lib/chat-sanitize.ts`'e çıkarıldı (rol whitelist/slice(-12)/trailing-user birebir korundu); route modüle bağlandı — Anthropic client/stream/system **değişmedi** (provider swap 18.03).
- UTF-8 byte-cap eklendi (`MAX_MESSAGE_BYTES=8192`, aşılırsa 400 "Message too large."); byte-cap `slice(-12)` sonrası tutulan sete uygulanır (düşen -13 uzun mesaj tetiklemez).
- Yeni `tests/chat-sanitize.test.ts` (13 test, Vitest node) — çok-baytlı byte-cap kanıtı (`ç`×5000 char<cap byte>cap→400); `npm run test` 52 passed, `next build` temiz.

**TASK-18.01 — Branch finalize** (✅ 2026-07-22)
- `revize/v0.4-versiyon-sonu` (`df7c293`) → `main` **ff-only** merge (merge commit yok) + push → canlı `df7c293`.
- Canlı no-op doğrulandı: Vercel Production deploy `df7c293`'ten tetiklendi+tamamlandı (GitHub deployment + Vercel status success), render byte-identical, Git-disconnect yok; 4 orphan PNG beklendiği gibi 404.
- Merge saf-doc değildi (Faz-16 orphan-PNG refactor + gitignore taşındı; kullanıcı onaylı) → temiz `revize/v0.5-chatbot-groq` açıldı+aktif.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-18.03 — Groq geçişi + system prompt cerrahi** (⬜ Bekliyor; bağımlılık 18.02 ✅). Sıradaki adım **`/devflow:run-task`**. Detay → `tasks/TASK-18.03.md`.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅ + plan ✅ + verify-plan ✅, Adım task; 18.01 ✅, 18.02 ✅). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `df7c293`**; aktif branch `revize/v0.5-chatbot-groq`. Faz dokümanı: `phases/PHASE-18.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21. M5 içerik + OVERVIEW stack satırı implementasyon fazına ertelendi.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-07-22 — **TASK-18.02 ✅ (Sanitize + byte-cap saf modül).** `route.ts` inline sanitizasyonu saf `src/lib/chat-sanitize.ts`'e çıkarıldı — rol whitelist / `slice(-12)` / trailing-user predikatı birebir korundu; route modüle bağlandı (`import { sanitizeMessages }`), Anthropic client/stream/system/max_tokens **değişmedi** (provider swap 18.03'e izole). UTF-8 byte-cap eklendi: `MAX_MESSAGE_BYTES=8192`, `slice(-12)` sonrası tutulan mesajların herhangi birinin `TextEncoder().encode(content).length` > cap → 400 "Message too large." (düşen -13 uzun mesaj tetiklemez; history istemciden gelir/güvenilmez). Gövde array-check saf fonksiyona taşındı → non-array `messages` artık net "Invalid request body." 400 (eski sessiz `[]`→trailing-400 yerine; aynı statü). Yeni `tests/chat-sanitize.test.ts` (13 test, Vitest node, `@/` alias) — çok-baytlı byte-cap kanıtlandı (`ç`×5000 char=5000<8192 ama byte=10000>8192 → 400; `ç`×4000=8000 byte ≤ cap → geçer) + ASCII sınır + pozisyon. `npm run test` **52 passed (6 dosya)**, `next build` **temiz** (tip/lint hatası yok). Aktif Faz **18**, Adım **task**; sıradaki **TASK-18.03** (Groq geçişi + system prompt cerrahi). Versiyon Sonu Durumu **içerik_fazları** (değişmedi). **Sıradaki: `/devflow:run-task` (TASK-18.03)** (yeni oturum). Açık: `GROQ_API_KEY` Vercel env (18.08, kullanıcı aksiyonu).
