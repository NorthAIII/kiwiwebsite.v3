# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-22 — **verify-plan 18 ✅.** 8 task dokümanı (18.01–18.08) temiz context ile doğrulandı: milestone / 5 kabul kriteri tam kapsandı, kararlar C.1–C.6 + kimlik-drift checklist eksiksiz, bağımlılık zinciri tutarlı, referans gerçeklik-kontrolü geçti (route.ts satır no'ları + "TR listelenmiyor/İngilizce'ye düşüyor" + "Crew OS doğru/Bunker sızmıyor" iddiaları gerçekle doğrulandı). Yapısal sorun/onay gereken öneri **yok**; 2 mekanik navigasyon-pointer düzeltmesi (18.06 OVERVIEW satır 54→28, 18.05 README satır listesi). Aktif Faz **18**, Adım **task**; ilk task **TASK-18.01**. Versiyon Sonu Durumu **içerik_fazları** (değişmedi). v0.4 TR canlı (`f173234`). **Sıradaki: `/devflow:run-task` (TASK-18.01).** Açık: `GROQ_API_KEY` Vercel env (18.08, kullanıcı aksiyonu) · `revize/v0.4-versiyon-sonu`→`main` doc-only merge (18.01'de, v0.5 branch'ten önce).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **task** — plan doğrulama tamamlandı (verify-plan ✅, 8 task doğrulandı → `tasks/TASK-18.0X.md`). İlk task **TASK-18.01**. **Sıradaki: `/devflow:run-task` (TASK-18.01).**

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (yeni varsayılan `llama-3.3-70b-versatile`); **canlıya alma Faz 18 sonunda** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık:** `GROQ_API_KEY` Vercel env'e eklenmeli (kullanıcı aksiyonu; koda gömülmez). Test key repo-dışı `.env.keys.local` (git-ignore; canlı deploy'da kullanılmaz).
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — doc-only (v0.4 kodu zaten canlı → etkisiz); **temiz `revize/v0.5-chatbot-groq` açmadan ÖNCE** (discuss-phase 18 kararı).
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · npm audit 2 moderate (postcss Next'e gömülü, sömürülemez; DECISIONS 2026-07-16, upstream-bekleyen) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** verify-plan 18 (2026-07-22) — 8 task fresh context ile doğrulandı ✅; milestone/5 kriter tam, kararlar C.1–C.6 + kimlik-drift checklist eksiksiz, bağımlılık zinciri (01→02→03→04/05/06→07→08) tutarlı, referans gerçeklik-kontrolü geçti. 2 mekanik pointer düzeltmesi (18.06/18.05), yapısal değişiklik yok. Kritik kapı: 07 (5-dil mühür) geçmeden 08 (go-live) yok; 08 env-önce-merge-sonra. Sıradaki: `/devflow:run-task` (TASK-18.01).
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

**Task:** **TASK-18.01 — Branch finalize** (v0.4 doc-merge → main + `revize/v0.5-chatbot-groq` aç). ⬜ Bekliyor; henüz koşulmadı. Faz 18'in ilk task'ı, bağımlılık yok. `/devflow:run-task` ile başlat.
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım task — verify-plan ✅). Versiyon Sonu Durumu **`içerik_fazları`**. **v0.4 TR canlı** (`f173234`).
**İlerleme:** verify-plan 18 ✅ (2026-07-22) — 8 task doğrulandı, 2 mekanik pointer düzeltmesi, yapısal sorun yok. Sıradaki adım: `/devflow:run-task` (TASK-18.01, yeni oturum).

---

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅ + plan ✅ + verify-plan ✅; 8 task doğrulandı, henüz koşulmadı (Adım task, ilk task 18.01). Detay/icra → `tasks/TASK-18.0X.md`; snapshot + bağımlılık zinciri → `phases/PHASE-18.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 18.01 | TASK-18.01 | ⬜ Bekliyor | Branch finalize (v0.4 doc-merge → main + v0.5 branch) |
| 18.02 | TASK-18.02 | ⬜ Bekliyor | Sanitize + byte-cap saf modül + Vitest node (C.6) |
| 18.03 | TASK-18.03 | ⬜ Bekliyor | Groq geçişi + system prompt cerrahi (route + package; C.1/C.3/C.4/C.5) |
| 18.04 | TASK-18.04 | ⬜ Bekliyor | Offline kopya ×5 `chat.error` (C.2) |
| 18.05 | TASK-18.05 | ⬜ Bekliyor | Dev/ops kimlik (env/README/CLAUDE — onay) |
| 18.06 | TASK-18.06 | ⬜ Bekliyor | Stack docs (M5+OVERVIEW+MEMORY; kriter-5) |
| 18.07 | TASK-18.07 | ⬜ Bekliyor | 5-dil gözle doğrulama gate (kriter-4) |
| 18.08 | TASK-18.08 | ⬜ Bekliyor | Go-live (env → merge v0.5→main → duman) |

---

## Son Task Özetleri

> **Faz 18: 8 task yazıldı + doğrulandı (verify-plan ✅), henüz koşulmadı.** Task özetleri run-task oturumlarında (TASK-18.01'den başlayarak) birikmeye başlar. Faz 17 task özetleri → `phases/PHASE-17.md`.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-18.01 — Branch finalize** (⬜ Bekliyor; Faz 18 ilk task'ı). Sıradaki adım **`/devflow:run-task`**. Detay → `tasks/TASK-18.01.md`.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅ + plan ✅ + verify-plan ✅, Adım task). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **v0.4 TR CANLI** (`main` = `f173234`); branch `revize/v0.4-versiyon-sonu` (doc-only merge → 18.01'de, v0.5 branch'ten önce). Faz dokümanı: `phases/PHASE-18.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21. M5 içerik + OVERVIEW stack satırı implementasyon fazına ertelendi.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-07-22 — **verify-plan 18 ✅.** 8 task dokümanı (18.01–18.08) fresh context ile doğrulandı: template uygunluğu ✓, milestone / 5 kabul kriteri tam kapsandı (kriter-1/2/3→18.02+18.03, kriter-4→18.07, kriter-5→18.06, canlı→18.08), kararlar C.1–C.6 + research Dikkat + kimlik-drift checklist eksiksiz, bağımlılık zinciri (01→02→03→04/05/06→07→08) tutarlı, çakışma/boşluk yok. Referans gerçeklik-kontrolü geçti — route.ts satır no'ları + messages ×5 + .env.example/README/CLAUDE.md:284 + M5 + `.env.keys.local` mevcut + package `@anthropic-ai/sdk` gerçekle birebir; "TR listelenmiyor→İngilizce'ye düşüyor" (route.ts:14) + "Crew OS doğru/Bunker yok" (route.ts:10) iddiaları teyitli. **Mekanik düzeltme: 2** (18.06 OVERVIEW prose satır 54→28; 18.05 README satır listesi 14,20,30,31,38). **Yapısal değişiklik: 0.** Aktif Faz **18**, Adım **task**, ilk task **TASK-18.01**. Versiyon Sonu Durumu **içerik_fazları** (değişmedi). **Sıradaki: `/devflow:run-task` (TASK-18.01)** (yeni oturum). Açık: `GROQ_API_KEY` Vercel env (18.08, kullanıcı aksiyonu) · `revize/v0.4-versiyon-sonu`→`main` doc-only merge (18.01'de, v0.5 branch'ten önce).
