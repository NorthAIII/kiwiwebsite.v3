# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-09-11 — **verify-phase 18 (UAT) ✅ koşuldu — 29 senaryo, 24 ✅ / 5 ❌.** Milestone çekirdeği doğrulandı (canlı 5/5 dil + dürüstlük + taksonomi, streaming sözleşmesi, 503 guard, byte-cap, 8/8 sayfa 200, CI yeşil, prompt-injection reddedildi). 5 bulgu → **2 düzeltme task'ı** (TASK-18.09 girdi daraltma/hacim sınırı · TASK-18.10 CTA etiketi + DE hitap + README). Kapsam-dışı 2 kayıt: `/api/chat` hız sınırı yok (v0.6 adayı) · **npm audit 9 açık, 1 kritik `next`** (aralık-içi fix var, Dokunulmaz → kullanıcı kararı). **Sıradaki: `/devflow:run-task` (TASK-18.09).**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **task** — UAT koşuldu (24 ✅ / 5 ❌), **2 düzeltme task'ı açıldı** (18.09 · 18.10). Düzeltmeler bitince `/devflow:verify-phase 18` **baştan** koşulur. **Sıradaki: `/devflow:run-task` (TASK-18.09).**

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (varsayılan go-live'da `qwen/qwen3.8-27b` oldu — DECISIONS 2026-09-11); **canlıya alma Faz 18 sonunda ✅** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık — ✅ çözüldü (TASK-18.08).** `GROQ_API_KEY` Vercel **Production** env'de (Secret). ⚠️ **Preview'e eklenmedi** → `revize/...` preview deploy'larında chatbot offline görünür (bilinçli açık, kullanıcıya önerildi). Test key repo-dışı `.env.keys.local`.
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — ✅ **tamamlandı (TASK-18.01).** ff-only merge → canlı `df7c293`; temiz `revize/v0.5-chatbot-groq` açıldı+aktif. (Not: merge saf doc değildi — Faz-16 orphan-PNG refactor + gitignore de taşındı; render byte-identical.)
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · ⚠️ **npm audit 9 açık (1 kritik / 4 high / 4 moderate)** — verify-phase 18'de yeniden ölçüldü; kritik+high'ların çoğu `next@15.5.19` upstream'inde ve **aralık-içi `next@15.5.24`** ile kapanıyor, yani DECISIONS 2026-07-16'nın "güvenli fix yok" gerekçesi bu kalemler için **artık geçerli değil** (`package.json`/`package-lock.json` Dokunulmaz → kullanıcı kararı); `undici` (jsdom, dev-only) · `nanoid`/`postcss` (build-zamanı) · `fflate` (ZIP ayrıştırma yok) sömürülemez; groq-sdk swap SIFIR açık ekledi (doğrulandı) · **`/api/chat` hız sınırı / origin kontrolü yok** (verify 18 senaryo 23; middleware `api`'yi atlıyor, `vercel.json` yok → 1.000 istek/gün kotası dışarıdan tüketilebilir; v0.6 adayı) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** verify-phase 18 (2026-09-11) — UAT 29 senaryo, **24 ✅ / 5 ❌**; otomatik kontroller: CI `fast`+`a11y` success, faz-penceresi güvenlik taraması temiz (bulgular girdi-daraltma sınıfında). **2 düzeltme task'ı** açıldı. Faz dokümanı kırmızı çizgiyi aştığı için Araştırma Bulguları `PHASE-18-ARASTIRMA.md`'ye bölündü (kullanıcı onaylı). Sıradaki: `/devflow:run-task` (TASK-18.09).
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

**Task:** **TASK-18.09 — Girdi daraltma + hacim sınırı (sanitizer sınıf kapanışı)** ⬜ — verify-phase 18 UAT senaryo 20 + 21'den doğdu. Doküman: `tasks/TASK-18.09.md`.
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım **task** — düzeltme turu). Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `3699f57`**; chatbot canlıda çalışıyor.
**İlerleme:** verify-phase 18 UAT 24 ✅ / 5 ❌ → 2 düzeltme task'ı (18.09 · 18.10, sırası serbest). İkisi de bitince `/devflow:verify-phase 18` **baştan** koşulur (sadece kalanlar değil).

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + UAT ✅ koşuldu; **10 task: 8 ✅ + 2 ⬜ düzeltme (18.09 · 18.10)** → Adım **task**. Detay/icra → `tasks/TASK-18.0X.md` (arşiv) + `tasks/TASK-18.09.md` / `TASK-18.10.md`; snapshot + Go-live + UAT → `phases/PHASE-18.md`.

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
| 18.09 | TASK-18.09 | ⬜ Bekliyor | **Düzeltme:** sanitizer `{role,content}` daraltma + mesaj sayısı/toplam byte sınırı (UAT 20/21) |
| 18.10 | TASK-18.10 | ⬜ Bekliyor | **Düzeltme:** SYSTEM_PROMPT CTA atfı + DE hitap kuralı + README model ailesi (UAT 19/28/29) |

---

## Son Task Özetleri

> **Faz 18: 8 ✅ + 2 ⬜ (verify düzeltme turu).** Faz 17 task özetleri → `phases/PHASE-17.md`.

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

**Aktif Task:** **TASK-18.09** ⬜ (`tasks/TASK-18.09.md`) — verify düzeltme turu; ardından TASK-18.10.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + 8 task ✅ + UAT ✅, Adım **task**). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `3699f57`**; chatbot canlıda (`qwen/qwen3.8-27b`). Faz dokümanı: `phases/PHASE-18.md` (→ **Go-live** + **UAT Sonuçları**); araştırma detayı → `phases/PHASE-18-ARASTIRMA.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21; go-live'daki model + `max_tokens` kararları → DECISIONS 2026-09-11.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf · chatbot prompt cilası (TR yankı/tekrar lekeleri) · `GROQ_API_KEY` Preview env · **`/api/chat` hız sınırı / origin kontrolü** (verify 18 senaryo 23) · **npm audit `next` aralık-içi güncelleme** (1 kritik, Dokunulmaz onayı gerekir).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-09-11 — **verify-phase 18 (UAT) koşuldu.** Mod otonom; probe katmanları: saf modül (node type-strip) · **gerçek `route.ts` POST handler'ı in-process** (test key `.env.keys.local`; sandbox `next start` exit-144'ten kaçınıldı) · **canlı `kiwiailab.com`** · GitHub Actions REST. **29 senaryo → 24 ✅ / 5 ❌.**

**Doğrulanan milestone çekirdeği:** canlı 5/5 dil doğru dilde + uydurma rakam yok + Crew OS taksonomisi temiz; streaming sözleşmesi birebir (15 ardışık chunk 0.48→0.62s, `text/plain; charset=utf-8` + `no-store`, `Chatbot.tsx` faz penceresinde **0 satır** değişmiş); anahtar-yok → 503 + kontrol çağrısı 200; byte-cap çok-baytlı TR/AR'de doğru; emekli model → 200 + TR fallback (go-live teşhisi reprodüktif); 8/8 sayfa 200 + AR RTL; CI `fast`+`a11y` success; hata gövdelerinde anahtar sızıntısı yok; **sahte assistant geçmişiyle dürüstlük enjeksiyonu reddedildi** (model uydurma fiyatı tekrarlamadı).

**5 bulgu → 2 düzeltme task'ı.** (a) **TASK-18.09** — `chat-sanitize` mesajı `{role,content}`'e indirgemiyor (istemci alanları sağlayıcıya geçiyor) ve dizi uzunluğu/toplam byte sınırsız (100k mesaj ≈381MB gövde `ok:true`; 12×8192 = 98KB tek istekte ücretsiz tier TPM'ini aşar). (b) **TASK-18.10** — SYSTEM_PROMPT sitede olmayan bir `"Book a call"` butonuna yönlendiriyor (5 locale'in hiçbirinde o etiket yok; canlı TR+AR yanıtları tırnak içinde andı), DE yanıtı sitenin formal `Sie` hitabına karşı `du` kullanıyor, `README.md:14` hâlâ `Llama 3.3` diyor.

**Kapsam-dışı kaydedildi (faz kapanışını etkilemez):** `/api/chat`'te hız sınırı/origin kontrolü yok (middleware `api`'yi atlıyor, `vercel.json` yok) → v0.6 adayı · **npm audit 9 açık, 1 kritik** — kritik+high'ların çoğu `next` upstream'inde ve **aralık-içi `next@15.5.24`** ile kapanıyor (Dokunulmaz → kullanıcı kararı).

**Boyut kapısı (Adım 6b):** `PHASE-18.md` 20.8k token ile ~20k kırmızı çizgiyi aştı; teşhis **gerçek büyüme** (Task Listesi temiz, şişme yok), kullanıcı onayıyla Araştırma Bulguları `phases/PHASE-18-ARASTIRMA.md`'ye taşındı (Faz 17 emsali) → parent **16.4k**, çocuk **5.7k**, ikisi de çizgi altında; `accept-size` gerekmedi.

Adım **verify → task**. Versiyon Sonu Durumu **içerik_fazları** (değişmedi). **Sıradaki: `/devflow:run-task` (TASK-18.09), sonra TASK-18.10; ikisi bitince `/devflow:verify-phase 18` baştan.**
