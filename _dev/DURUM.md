# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-22 — **TASK-18.07 ✅ (5-dil marka mührü gate — kabul kriteri 4).** Serversiz node harness (route.ts prompt+model, test key `.env.keys.local`): **1. koşu ❌** (EN→TR/Korece düşüş + script bozulması; temp teşhisi prompt-kaynaklı gösterdi) → **remediation (kullanıcı onaylı):** `route.ts` SYSTEM_PROMPT dil kuralı sertleştirildi + `temperature: 0.2`. **2.+3. koşu ✅ GREEN** (garble 0/20, dil 5/5, dürüstlük 5/5, taksonomi 5/5). `next build` temiz + Vitest 52/52. **Go-live kapısı açıldı.** Aktif Faz **18**, Adım **task**; sıradaki **TASK-18.08** (go-live). Versiyon Sonu Durumu **içerik_fazları**. **Sıradaki: `/devflow:run-task` (TASK-18.08).** Açık: `GROQ_API_KEY` Vercel env (18.08, kullanıcı).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **task** — TASK-18.07 ✅ (5-dil marka mührü gate; kabul kriteri 4 — 1. koşu ❌ → prompt sertleştirme + `temperature: 0.2` → 2 koşu GREEN). Sıradaki **TASK-18.08** (go-live — `GROQ_API_KEY` Vercel env + merge v0.5→main + duman testi). **Sıradaki: `/devflow:run-task` (TASK-18.08).**

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (yeni varsayılan `llama-3.3-70b-versatile`); **canlıya alma Faz 18 sonunda** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık:** `GROQ_API_KEY` Vercel env'e eklenmeli (kullanıcı aksiyonu; koda gömülmez). Test key repo-dışı `.env.keys.local` (git-ignore; canlı deploy'da kullanılmaz).
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — ✅ **tamamlandı (TASK-18.01).** ff-only merge → canlı `df7c293`; temiz `revize/v0.5-chatbot-groq` açıldı+aktif. (Not: merge saf doc değildi — Faz-16 orphan-PNG refactor + gitignore de taşındı; render byte-identical.)
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · npm audit 1 moderate (postcss) + 2 high (`sharp` libvips CVE-2026-*) — **ikisi de `node_modules/next` altında** (Next-upstream, yalnız kırıcı `next@9` downgrade ile "fix"; groq-sdk swap SIFIR vulnerability ekledi); sömürülemez, upstream-bekleyen (DECISIONS 2026-07-16 postcss duruşuyla aynı kategori) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** TASK-18.07 ✅ (2026-07-22) — 5-dil marka mührü gate. 1. koşu ❌ (EN→TR/Korece düşüş + script bozulması) → **remediation (kullanıcı onaylı):** `route.ts` SYSTEM_PROMPT dil kuralı sertleştirildi + `temperature: 0.2` → 2 koşu reprodüktif GREEN (garble 0/20, dil 5/5, dürüstlük 5/5, taksonomi 5/5). `next build` temiz + Vitest 52/52. Kabul kriteri 4 ✅. 7/8 task tamam; **kritik kapı 18.07 geçildi → 18.08 (go-live) açıldı** (env-önce-merge-sonra). Sıradaki: `/devflow:run-task` (TASK-18.08).
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

**Task:** **TASK-18.08 — Go-live** (kullanıcı `GROQ_API_KEY`'i Vercel env'e ekler → `revize/v0.5-chatbot-groq` → `main` merge → canlı duman testi; canlı `/api/chat` 503/offline çözülür — milestone). ⬜ Bekliyor. Bağımlılık: 18.07 ✅ (marka mührü kapısı geçildi). `/devflow:run-task` ile başlat.
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım task). Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `df7c293`** (branch üzeri çalışma; go-live 18.08).
**İlerleme:** TASK-18.07 ✅ (2026-07-22) — 5-dil marka mührü gate: 1. koşu ❌ → `route.ts` prompt sertleştirme + `temperature: 0.2` → 2 koşu GREEN (garble 0/20, dil 5/5, dürüstlük 5/5). Kabul kriteri 4 ✅. 7/8 task. Sıradaki adım: `/devflow:run-task` (TASK-18.08, yeni oturum).

---

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅ + plan ✅ + verify-plan ✅; 8 task, 7 tamam (18.01–18.07 ✅), sıradaki 18.08 go-live (Adım task). Detay/icra → `tasks/TASK-18.0X.md`; snapshot + bağımlılık zinciri → `phases/PHASE-18.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 18.01 | TASK-18.01 | ✅ Tamamlandı | Branch finalize (v0.4 doc-merge → main + v0.5 branch) |
| 18.02 | TASK-18.02 | ✅ Tamamlandı | Sanitize + byte-cap saf modül + Vitest node (C.6) |
| 18.03 | TASK-18.03 | ✅ Tamamlandı | Groq geçişi + system prompt cerrahi (route + package; C.1/C.3/C.4/C.5) |
| 18.04 | TASK-18.04 | ✅ Tamamlandı | Offline kopya ×5 `chat.error` (C.2) |
| 18.05 | TASK-18.05 | ✅ Tamamlandı | Dev/ops kimlik (env/README/CLAUDE — onay alındı) |
| 18.06 | TASK-18.06 | ✅ Tamamlandı | Stack docs (M5+OVERVIEW onaylı+MEMORY; kriter-5) |
| 18.07 | TASK-18.07 | ✅ Tamamlandı | 5-dil marka mührü gate (kriter-4); 1. koşu ❌ → prompt sertleştirme + temp 0.2 → GREEN |
| 18.08 | TASK-18.08 | ⬜ Bekliyor | Go-live (env → merge v0.5→main → duman) |

---

## Son Task Özetleri

> **Faz 18: 7/8 task tamam (18.01–18.07 ✅).** Faz 17 task özetleri → `phases/PHASE-17.md`.

**TASK-18.07 — 5-dil marka mührü gate** (✅ 2026-07-22)
- Serversiz node harness (route.ts prompt+model runtime-çıkarım, gerçek `sanitizeMessages`, test key `.env.keys.local` maskeli, garble dedektörü). **1. koşu ❌ reprodüktif:** EN soruları TR/Korece'ye düşüyor + TR/EN/AR script bozulması; temp=0.3 teşhisi dil-düşüşünü çözmedi (prompt kaynaklı).
- **Remediation (kullanıcı onaylı):** `route.ts` SYSTEM_PROMPT dil kuralı sertleştirildi ("son mesajın dilinde yanıtla + tek dil/script + yalnız gerçekten belirsizse TR") + `temperature: 0.2`. **2.+3. koşu ✅ GREEN:** garble 0/20, dil 5/5, dürüstlük 5/5, taksonomi 5/5, booking yok.
- `next build` temiz + Vitest 52/52. Kalıcı kod: `route.ts` (gate remediation). Artık 2 küçük craft lekesi kayıtlı (bloke değil). **Kabul kriteri 4 ✅ → go-live açıldı.**

**TASK-18.06 — `_dev/` stack dokümanları** (✅ 2026-07-22)
- `M5-Chatbot-API.md` (7 nokta) + `OVERVIEW.md` (Korumalı → **kullanıcı onayı alındı**; 5 değişiklik: stack tablosu + "Claude chatbot" ifadeleri → Groq/Llama + kod-ağacı yorumu + Son Güncelleme) + `MEMORY.md` "Chatbot env" satırı Anthropic→Groq hizalandı: `@anthropic-ai/sdk`→`groq-sdk`, `claude-opus-4-8`→`llama-3.3-70b-versatile`, `ANTHROPIC_API_KEY`→`GROQ_API_KEY`.
- M5 F5.1'e system prompt **TR-birincil** dil algılama + **rakam-uydurma yasağı** + sanitize saf modül per-mesaj **byte-cap 8192→400** yansıtıldı; MEMORY secret-örnek satırı (97) de factual GROQ'a hizalandı. `CLAUDE.md` dosya-adı referansları (OVERVIEW 115/119) + tarihsel DECISIONS dokunulmadı.
- grep eski tanımlayıcı **0** (exit 1) / Groq karşılıkları yerinde. Doküman-only (`src/` değişmedi) → build gerekmedi. **Kabul kriteri 5 ✅.**

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-18.08 — Go-live** (⬜ Bekliyor; bağımlılık 18.07 ✅ — marka mührü kapısı geçildi; kullanıcı `GROQ_API_KEY` Vercel env → merge v0.5→main → duman testi; milestone). Sıradaki adım **`/devflow:run-task`**. Detay → `tasks/TASK-18.08.md`.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅ + plan ✅ + verify-plan ✅, Adım task; 18.01–18.07 ✅). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `df7c293`**; aktif branch `revize/v0.5-chatbot-groq`. Faz dokümanı: `phases/PHASE-18.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21. M5 içerik + OVERVIEW stack satırı implementasyon fazına ertelendi.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-07-22 — **TASK-18.07 ✅ (5-dil marka mührü gate — kabul kriteri 4).** Serversiz Node 24 harness (scratchpad `.mjs`): nihai `route.ts` SYSTEM_PROMPT+MODEL+temperature runtime-çıkarım (sıfır drift) + gerçek `sanitizeMessages` (type-strip import) + `groq-sdk` (absolute path) + test key `.env.keys.local` (maskeli) + mekanik garble (CJK/Hangul/Kiril/Kana) dedektörü; sandbox exit-144 atlandı. **1. koşu ❌ reprodüktif** (2 tam koşu): İngilizce sorular tutarlı biçimde TR/Korece'ye düştü ("gym" 4/4 TR, "Crew OS" 1 koşuda Korece) + TR/EN/AR çok-dilli script bozulması; **temperature=0.3 teşhisi dil-düşüşünü çözmedi → prompt kaynaklı**. Bulgu kullanıcıya sunuldu (AskUserQuestion). **Remediation (kullanıcı onaylı — "prompt sertleştir + yeniden koş"):** `route.ts` SYSTEM_PROMPT dil kuralı sertleştirildi ("Default to Turkish if unclear" kaldırıldı → "son mesajın dilinde yanıtla + tek dil/tek script + başka dil karıştırma yok + yalnız gerçekten belirsizse TR") + `chat.completions.create`'e **`temperature: 0.2`** eklendi. **2.+3. koşu ✅ reprodüktif GREEN:** garble **0/20**, dil sadakati **5/5** (EN Crew OS+gym İngilizce'ye döndü), dürüstlük **5/5** (uydurma rakam yok), taksonomi **5/5** (Bunker sızmadı), booking sözü yok. Artık **2 küçük craft lekesi** (bloke değil, kayıtlı): TR "observable ve measured" yankısı ~%50 + nadir tek token. Test: `next build` **temiz** + Vitest **52/52**. Harness'ler silindi, key hiçbir yere yazılmadı. Güncellenen: `route.ts` (prompt+temperature) + `phases/PHASE-18.md` (Gözle Doğrulama bölümü + C.3 notu) + `docs/DECISIONS.md` (2026-07-22) + `modules/M5-Chatbot-API.md` (dil kuralı + temperature — kod↔doküman drift kapatıldı). Aktif Faz **18**, Adım **task**; sıradaki **TASK-18.08** (go-live). Versiyon Sonu Durumu **içerik_fazları** (değişmedi). **Sıradaki: `/devflow:run-task` (TASK-18.08)** (yeni oturum). Açık: `GROQ_API_KEY` Vercel env (18.08, kullanıcı aksiyonu).
