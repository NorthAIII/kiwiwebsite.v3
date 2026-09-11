# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-09-11 — **TASK-18.08 ✅ — v0.5 MILESTONE: chatbot CANLIDA.** Devralınan boşluk kapatıldı (`vercel env ls` → env hiç eklenmemişti), kullanıcı `GROQ_API_KEY`'i ekledi, redeploy. Duman testi **iki canlı arıza** buldu, ikisi de yalnız runtime log'unda görünüyordu: (1) Groq `llama-3.3-70b-versatile`'ı emekliye ayırmış → model **`qwen/qwen3.8-27b`** (marka mührü kapısı yeniden koşuldu; `gpt-oss` dürüstlük ihlalini tekrarlayıp ikinci kez elendi); (2) OTPM 1000 < 1024 → `max_tokens` **512**. Canlı 5/5 dil ✓, 8 sayfa 200 ✓. Fazdaki **8/8 task tamam** → Adım **verify**. **Sıradaki: `/devflow:verify-phase 18`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **verify** — TASK-18.08 ✅ (go-live milestone; chatbot canlıda çalışıyor). **Fazdaki 8 task da tamamlandı.** **Sıradaki: `/devflow:verify-phase 18`.**

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (varsayılan go-live'da `qwen/qwen3.8-27b` oldu — DECISIONS 2026-09-11); **canlıya alma Faz 18 sonunda ✅** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık — ✅ çözüldü (TASK-18.08).** `GROQ_API_KEY` Vercel **Production** env'de (Secret). ⚠️ **Preview'e eklenmedi** → `revize/...` preview deploy'larında chatbot offline görünür (bilinçli açık, kullanıcıya önerildi). Test key repo-dışı `.env.keys.local`.
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — ✅ **tamamlandı (TASK-18.01).** ff-only merge → canlı `df7c293`; temiz `revize/v0.5-chatbot-groq` açıldı+aktif. (Not: merge saf doc değildi — Faz-16 orphan-PNG refactor + gitignore de taşındı; render byte-identical.)
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · npm audit 1 moderate (postcss) + 2 high (`sharp` libvips CVE-2026-*) — **ikisi de `node_modules/next` altında** (Next-upstream, yalnız kırıcı `next@9` downgrade ile "fix"; groq-sdk swap SIFIR vulnerability ekledi); sömürülemez, upstream-bekleyen (DECISIONS 2026-07-16 postcss duruşuyla aynı kategori) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** TASK-18.08 ✅ (2026-09-11) — **go-live milestone.** Env eklendi + redeploy; duman testi iki canlı arıza buldu (model emekliliği 404 + OTPM 429), ikisi de düzeltildi; model `qwen/qwen3.8-27b`, `max_tokens` 512. Canlı 5 dil ✓ / 8 sayfa 200 ✓ / ataş kanıtı ✓. `next build` temiz + Vitest 52/52. **8/8 task tamam → Adım verify.** Sıradaki: `/devflow:verify-phase 18`.
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

**Task:** **Yok — fazdaki 8 task da tamamlandı.** Son tamamlanan: **TASK-18.08 — Go-live** ✅ (chatbot canlıda; `/api/chat` 503/offline **çözüldü**). Sıradaki adım task değil **faz doğrulaması**: `/devflow:verify-phase 18`.
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım **verify**). Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `3699f57`** (go-live fix dahil).
**İlerleme:** TASK-18.08 ✅ (2026-09-11) — env + redeploy + canlı duman testi; iki canlı arıza (Groq model emekliliği 404 → `qwen/qwen3.8-27b`; OTPM 429 → `max_tokens` 512) teşhis edilip düzeltildi. 5 dil canlıda doğrulandı. Sıradaki adım: `/devflow:verify-phase 18` (yeni oturum).

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅ + plan ✅ + verify-plan ✅; **8 task, 8'i de tamam (18.01–18.08 ✅)** → Adım **verify**. Detay/icra → `tasks/TASK-18.0X.md` (arşiv); snapshot + Go-live bölümü → `phases/PHASE-18.md`.

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

---

## Son Task Özetleri

> **Faz 18: 8/8 task tamam (18.01–18.08 ✅).** Faz 17 task özetleri → `phases/PHASE-17.md`.

**TASK-18.08 — Go-live (milestone)** (✅ 2026-09-11)
- Devralınan boşluk: env hiç eklenmemişti (`vercel env ls` → sıfır değişken); kullanıcı Production'a ekledi → `vercel redeploy`. Canlı `/api/chat` 503 → 200.
- **İki canlı arıza, ikisi de yalnız `vercel logs`'ta görünür** (build/Vitest/curl-200 üçü de yeşildi): (1) `404 model_not_found` — Groq `llama-3.3-70b-versatile`'ı emekliye ayırmış → 18.07 marka mührü kapısı adaylara yeniden koşuldu, **`qwen/qwen3.8-27b`** seçildi (`gpt-oss` dürüstlük ihlalini tekrarlayıp ikinci kez elendi); (2) `429` OTPM 1000 < 1024 — `max_tokens` peşin rezerve ediliyor → **512**.
- Canlı 5/5 dil doğru+dürüst, 8 sayfa/locale 200, AR RTL ✓, ataş kanıtı ✓; `next build` temiz + Vitest 52/52. **v0.4'ten devralınan chatbot 503 açık kalemi kapandı.**

**TASK-18.07 — 5-dil marka mührü gate** (✅ 2026-07-22)
- Serversiz node harness (route.ts prompt+model runtime-çıkarım, gerçek `sanitizeMessages`, test key `.env.keys.local` maskeli, garble dedektörü). **1. koşu ❌ reprodüktif:** EN soruları TR/Korece'ye düşüyor + TR/EN/AR script bozulması; temp=0.3 teşhisi dil-düşüşünü çözmedi (prompt kaynaklı).
- **Remediation (kullanıcı onaylı):** `route.ts` SYSTEM_PROMPT dil kuralı sertleştirildi + `temperature: 0.2`. **2.+3. koşu ✅ GREEN:** garble 0/20, dil 5/5, dürüstlük 5/5, taksonomi 5/5, booking yok.
- `next build` temiz + Vitest 52/52. **Kabul kriteri 4 ✅ → go-live açıldı.**

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **Yok** — Faz 18'in 8 task'ı da tamamlandı (son: **TASK-18.08 Go-live ✅**, chatbot canlıda). Sıradaki adım **`/devflow:verify-phase 18`**. Arşiv → `tasks/archive/TASK-18.08.md`.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + 8/8 task ✅, Adım **verify**). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `3699f57`**; chatbot canlıda (`qwen/qwen3.8-27b`). Faz dokümanı: `phases/PHASE-18.md` (→ **Go-live** bölümü).
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21; go-live'daki model + `max_tokens` kararları → DECISIONS 2026-09-11.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf · chatbot prompt cilası (TR yankı/tekrar lekeleri) · `GROQ_API_KEY` Preview env.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-09-11 — **TASK-18.08 ✅ — v0.5 MILESTONE: chatbot canlıda.** Devralınan boşluk kapatıldı: `vercel env ls` projede **sıfır** env variable gösterdi (temmuzdaki "trigger redeploy" boş commit'i anahtar eklenmeden atılmış); kullanıcı `GROQ_API_KEY`'i Production'a ekledi, `vercel redeploy` → canlı `/api/chat` **503 → 200**.

Duman testi **iki canlı arıza** buldu; **ikisi de yalnız `vercel logs`'ta görünüyordu** — `next build` temiz, Vitest 52/52 ve curl **200** üçü de yanılttı (hata stream-içi fallback'e dönüşüyor). **(1)** `404 model_not_found`: Groq `llama-3.3-70b-versatile`'ı emekliye ayırmış → 18.07 marka mührü harness'i adaylara yeniden koşuldu, **`qwen/qwen3.8-27b`** seçildi (kullanıcı onaylı); `gpt-oss-120b` dürüstlük ihlalini sertleştirilmiş prompt altında tekrarlayıp **ikinci kez** elendi. **(2)** `429`: ücretsiz tier OTPM 1000 < talep 1024 → `max_tokens` **512** (zorunlu C.6 sapması).

Canlı doğrulama: 5/5 dil doğru+dürüst, 8 sayfa/locale 200, AR RTL ✓, ataş kanıtı ✓. **v0.4'ten devralınan chatbot 503/offline açık kalemi KAPANDI.** Detay → `phases/PHASE-18.md` → **Go-live**; kararlar → `DECISIONS.md` 2026-09-11; öğrenim → `memory/groq-model-emekliligi-runtime-404.md`.

Fazdaki **8/8 task tamam**, Adım **verify**. Versiyon Sonu Durumu **içerik_fazları** (değişmedi). **Sıradaki: `/devflow:verify-phase 18`** (yeni oturum). ⚠️ `PHASE-18.md` ~16k token — 20k kırmızı çizgisine yaklaşıyor; faz **hâlâ aktifken** bölme değerlendirilmeli (verify/review).
