# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-09-11 — **TASK-18.09 ✅** (verify düzeltme turu 1/2): `chat-sanitize` her mesajı `{role,content}`'e indirgiyor + iki hacim sınırı eklendi (`MAX_INCOMING_MESSAGES` 100 · `MAX_TOTAL_BYTES` 16384) → UAT senaryo 20/21 kapandı. Vitest 52→64, build temiz. **Sıradaki: `/devflow:run-task` (TASK-18.10).**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **task** — UAT koşuldu (24 ✅ / 5 ❌), 2 düzeltme task'ı açıldı; **18.09 ✅, 18.10 ⬜ kaldı.** Düzeltmeler bitince `/devflow:verify-phase 18` **baştan** koşulur. **Sıradaki: `/devflow:run-task` (TASK-18.10).**

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (varsayılan go-live'da `qwen/qwen3.8-27b` oldu — DECISIONS 2026-09-11); **canlıya alma Faz 18 sonunda ✅** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık — ✅ çözüldü (TASK-18.08).** `GROQ_API_KEY` Vercel **Production** env'de (Secret). ⚠️ **Preview'e eklenmedi** → `revize/...` preview deploy'larında chatbot offline görünür (bilinçli açık, kullanıcıya önerildi). Test key repo-dışı `.env.keys.local`.
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — ✅ **tamamlandı (TASK-18.01).** ff-only merge → canlı `df7c293`; temiz `revize/v0.5-chatbot-groq` açıldı+aktif. (Not: merge saf doc değildi — Faz-16 orphan-PNG refactor + gitignore de taşındı; render byte-identical.)
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · ⚠️ **npm audit 9 açık (1 kritik / 4 high / 4 moderate)** — verify-phase 18'de yeniden ölçüldü; kritik+high'ların çoğu `next@15.5.19` upstream'inde ve **aralık-içi `next@15.5.24`** ile kapanıyor, yani DECISIONS 2026-07-16'nın "güvenli fix yok" gerekçesi bu kalemler için **artık geçerli değil** (`package.json`/`package-lock.json` Dokunulmaz → kullanıcı kararı); `undici` (jsdom, dev-only) · `nanoid`/`postcss` (build-zamanı) · `fflate` (ZIP ayrıştırma yok) sömürülemez; groq-sdk swap SIFIR açık ekledi (doğrulandı) · **`/api/chat` hız sınırı / origin kontrolü yok** (verify 18 senaryo 23; middleware `api`'yi atlıyor, `vercel.json` yok → 1.000 istek/gün kotası dışarıdan tüketilebilir; v0.6 adayı) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** verify-phase 18 (2026-09-11) — UAT 29 senaryo, **24 ✅ / 5 ❌** → 2 düzeltme task'ı. **TASK-18.09 ✅ (2026-09-11):** girdi daraltma + hacim sınırları; UAT senaryo 20/21 kapandı, Vitest 52→64. Faz dokümanı kırmızı çizgiyi aştığı için Araştırma Bulguları `PHASE-18-ARASTIRMA.md`'ye bölündü (kullanıcı onaylı). Sıradaki: `/devflow:run-task` (TASK-18.10).
**Aktif Faz Dokümanı:** `phases/PHASE-18.md` (🔄 Faz 18). Faz geçmişi → `PHASES.md`; v0.4 release → `docs/RELEASE-v0.4.md`; Faz 17 → `phases/PHASE-17.md`.

---

## Aktif Versiyon

**Versiyon:** **v0.5 — Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (re-kickoff 2026-07-21 damgaladı; v0.4 ✅ tamamlandı → `PRD/VERSIONS.md`). Anthropic Opus → Groq ($0/kartsız) + canlıya alma. **Canlıya alma ✅ tamamlandı** (2026-09-11, model `qwen/qwen3.8-27b`).
**Hedef (v0.5):** `route.ts` Groq'a geçer (streaming/sanitizasyon/zarif offline fallback korunur) + system prompt TR-birincil dil algılama + "fiyat/rakam uydurma" yasağı + hardening per-mesaj max-byte cap + 5-dil çıktı gözle doğrulama → canlıya alma (canlı 503/offline çözülür). Kaynak / 5 kabul kriteri: DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack satırı implementasyon fazında güncellenir.
**Versiyon Sonu Durumu:** **içerik_fazları** (v0.5 başında — içerik fazları henüz koşulmadı; içerik fazı bitince discuss-phase sırasıyla teknik_borç → senaryo_testi → prd_review_bekliyor'a ilerletir).

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-18.10 — Marka mührü kopyası: SYSTEM_PROMPT CTA atfı + DE hitap kuralı + README model ailesi** ⬜ — verify-phase 18 UAT senaryo 19 + 28 + 29'dan doğdu. Doküman: `tasks/TASK-18.10.md`.
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım **task** — düzeltme turunun 2/2'si). Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `3699f57`**; chatbot canlıda çalışıyor.
**İlerleme:** 2 düzeltme task'ından **18.09 ✅**; 18.10 kaldı. İkisi de bitince `/devflow:verify-phase 18` **baştan** koşulur (sadece kalanlar değil).

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + UAT ✅ koşuldu; **10 task: 9 ✅ + 1 ⬜ düzeltme (18.10)** → Adım **task**. Detay/icra → `tasks/archive/TASK-18.0X.md` + `tasks/TASK-18.10.md`; snapshot + Go-live + UAT → `phases/PHASE-18.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 18.01 | TASK-18.01 | ✅ Tamamlandı | Branch finalize (v0.4 doc-merge → main + v0.5 branch) |
| 18.02 | TASK-18.02 | ✅ Tamamlandı | Sanitize + byte-cap saf modül + Vitest node (C.6) |
| 18.03 | TASK-18.03 | ✅ Tamamlandı | Groq geçişi + system prompt cerrahi (route + package; C.1/C.3/C.4/C.5) |
| 18.04 | TASK-18.04 | ✅ Tamamlandı | Offline kopya ×5 `chat.error` (C.2) |
| 18.05 | TASK-18.05 | ✅ Tamamlandı | Dev/ops kimlik (env/README/CLAUDE — onay alındı) |
| 18.06 | TASK-18.06 | ✅ Tamamlandı | Stack docs (M5+OVERVIEW onaylı+MEMORY; kriter-5) |
| 18.07 | TASK-18.07 | ✅ Tamamlandı | 5-dil marka mührü gate (kriter-4); 1. koşu ❌ → prompt sertleştirme + temp 0.2 → GREEN |
| 18.08 | TASK-18.08 | ✅ Tamamlandı | Go-live (env → redeploy → duman); iki canlı arıza düzeltildi — model `qwen/qwen3.8-27b` + `max_tokens` 512 |
| 18.09 | TASK-18.09 | ✅ Tamamlandı | **Düzeltme:** sanitizer `{role,content}` daraltma + mesaj sayısı/toplam byte sınırı (UAT 20/21); Vitest 52→64 |
| 18.10 | TASK-18.10 | ⬜ Bekliyor | **Düzeltme:** SYSTEM_PROMPT CTA atfı + DE hitap kuralı + README model ailesi (UAT 19/28/29) |

---

## Son Task Özetleri

> **Faz 18: 9 ✅ + 1 ⬜ (verify düzeltme turu).** Faz 17 task özetleri → `phases/PHASE-17.md`.

**TASK-18.09 — Girdi daraltma + hacim sınırı** (✅ 2026-09-11)
- `chat-sanitize` artık her mesajı `{role, content}` olarak **yeniden kuruyor** (istemcinin `name`/`tool_calls`/serbest alanları sağlayıcıya geçmiyor; `content` tek okuma → getter yüzeyi de kapandı) + iki yeni sınır: ham mesaj sayısı **100**, tutulan içerik toplamı **16384 byte**, aşımda dürüst 400.
- Sınır değeri ölçümle seçildi: gerçek 12 turlu TR sohbeti **1.968 byte** → ~8,3× pay; per-mesaj cap (8192) kaldırılmadı, yanına eklendi.
- Vitest **52 → 64** (12 yeni test) + `next build` exit 0. Kapı sınandı: kaynak eski hâline alınınca yeni testlerin **9'u kırmızı**; boş kapsamda fail-open yok (400 trailing-user). UAT senaryo 20/21 kapandı.

**TASK-18.08 — Go-live (milestone)** (✅ 2026-09-11)
- Devralınan boşluk: env hiç eklenmemişti (`vercel env ls` → sıfır değişken); kullanıcı Production'a ekledi → `vercel redeploy`. Canlı `/api/chat` 503 → 200.
- **İki canlı arıza, ikisi de yalnız `vercel logs`'ta görünür** (build/Vitest/curl-200 üçü de yeşildi): (1) `404 model_not_found` — Groq `llama-3.3-70b-versatile`'ı emekliye ayırmış → 18.07 marka mührü kapısı adaylara yeniden koşuldu, **`qwen/qwen3.8-27b`** seçildi (`gpt-oss` dürüstlük ihlalini tekrarlayıp ikinci kez elendi); (2) `429` OTPM 1000 < 1024 — `max_tokens` peşin rezerve ediliyor → **512**.
- Canlı 5/5 dil doğru+dürüst, 8 sayfa/locale 200, AR RTL ✓, ataş kanıtı ✓; `next build` temiz + Vitest 52/52. **v0.4'ten devralınan chatbot 503 açık kalemi kapandı.**

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-18.10** ⬜ (`tasks/TASK-18.10.md`) — verify düzeltme turunun sonuncusu; ardından `/devflow:verify-phase 18` baştan.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + 9 task ✅ + UAT ✅, Adım **task**). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `3699f57`**; chatbot canlıda (`qwen/qwen3.8-27b`). Faz dokümanı: `phases/PHASE-18.md` (→ **Go-live** + **UAT Sonuçları**); araştırma detayı → `phases/PHASE-18-ARASTIRMA.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21; go-live'daki model + `max_tokens` kararları → DECISIONS 2026-09-11.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf · chatbot prompt cilası (TR yankı/tekrar lekeleri) · `GROQ_API_KEY` Preview env · **`/api/chat` hız sınırı / origin kontrolü** (verify 18 senaryo 23) · **npm audit `next` aralık-içi güncelleme** (1 kritik, Dokunulmaz onayı gerekir).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)
