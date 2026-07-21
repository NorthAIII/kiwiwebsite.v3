# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-21 — **research-phase 18 ✅ (teknik araştırma).** Bulgular PHASE-18.md'ye yazıldı; 2 karar noktası kullanıcı onaylı: **Groq istemcisi = `groq-sdk`** (net-sıfır bağımlılık drop-in; `@anthropic-ai/sdk` çıkar) · **offline hata kopyası yeniden yazılır** (5 dil `messages/*.json:494` "ANTHROPIC_API_KEY" mentionu kalkar — ziyaretçi-görünür, canlıda yanıltıcı). Somutlaştı: system prompt yerleşimi (`messages`'a `role:system`) + delta şekli (`choices[0].delta.content`); byte-cap UTF-8 8KB öneri; sanitizasyon saf fonksiyona (Vitest node); model `llama-3.3-70b-versatile` = 131K ctx / üretim. Aktif Faz **18**, Adım **plan**. Versiyon Sonu Durumu **içerik_fazları** (değişmedi). v0.4 TR canlı (`f173234`). **Sıradaki: `/devflow:plan-phase 18`.** Açık: `GROQ_API_KEY` Vercel env (canlıdan önce, kullanıcı aksiyonu) · `revize/v0.4-versiyon-sonu`→`main` doc-only merge (v0.5 branch'ten önce).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **plan** — teknik araştırma tamamlandı (research-phase ✅, bulgular PHASE-18.md). **Sıradaki: `/devflow:plan-phase 18`.**

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (yeni varsayılan `llama-3.3-70b-versatile`); **canlıya alma Faz 18 sonunda** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık:** `GROQ_API_KEY` Vercel env'e eklenmeli (kullanıcı aksiyonu; koda gömülmez). Test key repo-dışı `.env.keys.local` (git-ignore; canlı deploy'da kullanılmaz).
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — doc-only (v0.4 kodu zaten canlı → etkisiz); **temiz `revize/v0.5-chatbot-groq` açmadan ÖNCE** (discuss-phase 18 kararı).
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · npm audit 2 moderate (postcss Next'e gömülü, sömürülemez; DECISIONS 2026-07-16, upstream-bekleyen) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** research-phase 18 (2026-07-21) — teknik araştırma ✅; bulgular PHASE-18.md "Araştırma Bulguları"na yazıldı. 2 karar kullanıcı onaylı (groq-sdk · offline kopya yeniden yaz); 6 teknik karar (C.1–C.6) + kimlik-drift checklist netleşti. Sıradaki: `/devflow:plan-phase 18`.
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

**Task:** **Yok — Faz 18 planlama aşamasında** (discuss ✅, research ✅, henüz task yazılmadı). Task'lar `/devflow:plan-phase 18`'de yazılır; sıradaki adım `/devflow:plan-phase 18`.
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım plan). Versiyon Sonu Durumu **`içerik_fazları`**. **v0.4 TR canlı** (`f173234`).
**İlerleme:** research-phase 18 ✅ (2026-07-21) — teknik araştırma tamam (bulgular PHASE-18.md; groq-sdk + offline kopya kararları onaylı). Sıradaki adım: `/devflow:plan-phase 18`.

---

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅; task'lar henüz yazılmadı (plan-phase 18'de yazılır). Sıradaki adım plan-phase 18. Kapsam → `phases/PHASE-18.md` → Kapsam Tartışması; teknik bulgular → Araştırma Bulguları. (Faz 17'nin 8 task'ı → `phases/PHASE-17.md` + `tasks/archive/TASK-17.0X.md`.)

---

## Son Task Özetleri

> **Faz 18 aktif ama henüz task yok** (discuss-phase yeni bitti; task'lar plan-phase 18'de yazılır). Task özetleri run-task oturumlarında birikmeye başlar. Faz 17 task özetleri → `phases/PHASE-17.md`.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **Yok — Faz 18 planlama aşamasında** (discuss ✅, research ✅). Sıradaki adım **`/devflow:plan-phase 18`**. Kapsam → `phases/PHASE-18.md`.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅, Adım plan). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **v0.4 TR CANLI** (`main` = `f173234`); branch `revize/v0.4-versiyon-sonu` (doc-only merge → v0.5 branch'ten önce). Faz dokümanı: `phases/PHASE-18.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21. M5 içerik + OVERVIEW stack satırı implementasyon fazına ertelendi.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-07-21 — **research-phase 18 ✅ (teknik araştırma).** Bulgular PHASE-18.md "Araştırma Bulguları"na yazıldı. 2 karar kullanıcı onaylı: **Groq istemcisi = `groq-sdk`** (net-sıfır bağımlılık OpenAI-uyumlu drop-in; `@anthropic-ai/sdk` çıkar) · **offline hata kopyası yeniden yazılır** (5 dil `messages/*.json:494` "ANTHROPIC_API_KEY" mentionu kalkar — ziyaretçi-görünür + canlıda yanıltıcı). 6 teknik karar (C.1–C.6): system prompt `messages`'a `role:system` + TR-birincil + rakam-uydurma yasağı; delta `choices[0].delta.content`; byte-cap UTF-8 8KB reddet-400 (istemcide generic offline); sanitizasyon saf fonksiyona (Vitest node); fallback metni TR; `CHAT_MODEL` varsayılan `llama-3.3-70b-versatile` (131K ctx, üretim). Kimlik-drift checklist kriter-5'ten geniş (messages ×5 + README + .env.example + CLAUDE.md). Aktif Faz **18**, Adım **plan**. Versiyon Sonu Durumu **içerik_fazları** (değişmedi). **Sıradaki: `/devflow:plan-phase 18`.** Açık: `GROQ_API_KEY` Vercel env (canlıdan önce, kullanıcı aksiyonu) · `revize/v0.4-versiyon-sonu`→`main` doc-only merge (v0.5 branch'ten önce).
