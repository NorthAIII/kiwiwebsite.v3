# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-09-12 — **verify-phase 18 yeniden koşumu:** 33 senaryo, **31 ✅ / 2 ❌**. 18.09 + 18.10 düzeltmeleri canlıda teyit edildi (senaryo 19/20/21/28/29/30 kapandı). Yeni bulgu: asılı Groq çağrısı ziyaretçiyi 30 s bekletiyor (47 canlı çağrının 2'si 504) → **TASK-18.11** açıldı. Senaryo 23 (hız sınırı/origin) kapsam-dışı kaldı.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **task** — verify 2. kez baştan koşuldu (2026-09-12): **33 senaryo, 31 ✅ / 2 ❌**. Birinci turun 5 bulgusunun hepsi kapandı (18.09 + 18.10 canlıda teyitli). Açık kalan: **TASK-18.11** (üst-akış zaman aşımı, kapsam-içi) ve senaryo 23 (hız sınırı/origin, kapsam-dışı → v0.6). **Sıradaki: `/devflow:run-task`; 18.11 bitince verify yine baştan.**

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (varsayılan go-live'da `qwen/qwen3.8-27b` oldu — DECISIONS 2026-09-11); **canlıya alma Faz 18 sonunda ✅** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık — ✅ çözüldü (TASK-18.08).** `GROQ_API_KEY` Vercel **Production** env'de (Secret). ⚠️ **Preview'e eklenmedi** → `revize/...` preview deploy'larında chatbot offline görünür (bilinçli açık, kullanıcıya önerildi). Test key repo-dışı `.env.keys.local`.
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — ✅ **tamamlandı (TASK-18.01).** ff-only merge → canlı `df7c293`; temiz `revize/v0.5-chatbot-groq` açıldı+aktif. (Not: merge saf doc değildi — Faz-16 orphan-PNG refactor + gitignore de taşındı; render byte-identical.)
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · ⚠️ **npm audit 9 açık (1 kritik / 4 high / 4 moderate)** — verify-phase 18'de yeniden ölçüldü; kritik+high'ların çoğu `next@15.5.19` upstream'inde ve **aralık-içi `next@15.5.24`** ile kapanıyor, yani DECISIONS 2026-07-16'nın "güvenli fix yok" gerekçesi bu kalemler için **artık geçerli değil** (`package.json`/`package-lock.json` Dokunulmaz → kullanıcı kararı); `undici` (jsdom, dev-only) · `nanoid`/`postcss` (build-zamanı) · `fflate` (ZIP ayrıştırma yok) sömürülemez; groq-sdk swap SIFIR açık ekledi (doğrulandı) · **`/api/chat` hız sınırı / origin kontrolü yok** (verify 18 senaryo 23; middleware `api`'yi atlıyor, `vercel.json` yok → 1.000 istek/gün kotası dışarıdan tüketilebilir; v0.6 adayı) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** verify-phase 18 yeniden koşumu (2026-09-12) — **33 senaryo / 31 ✅ / 2 ❌**. Küme 29→33 büyüdü: serving zinciri teyidi (30), parse-öncesi gövde sınırı (31) ve canlıda görülen 504 sınıfının iki sorusu (32 ziyaretçi ne görüyor · 33 neden bekliyor). Ölçüm katmanları: in-process route (sağlayıcıya giden payload yakalandı), canlı `kiwiailab.com` (~47 çağrı), gerçek tarayıcı (`page.route` ile 504 enjeksiyonu). CI `main` HEAD yeşil, Vitest 64/64, `next build` exit 0.
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

**Task:** **TASK-18.11** (`tasks/TASK-18.11.md`) — üst-akış zaman aşımı; asılı Groq çağrısı `maxDuration = 30`'a dayanıp ziyaretçiyi 30 s bekletiyor (UAT senaryo 33).
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım **task**). Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `9109517`**; chatbot canlıda çalışıyor ve 18.09 + 18.10 düzeltmeleri **canlıda teyit edildi** (senaryo 30: 18.09'a özgü 400 gerekçeleri canlı uçtan döndü).
**İlerleme:** İkinci düzeltme turu açıldı — tek task (18.11). Bitince `/devflow:verify-phase 18` yine **baştan** koşulur.

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + UAT **iki kez** koşuldu; **11 task: 10 ✅ / 1 ⬜** → Adım **task**. Detay/icra → `tasks/archive/TASK-18.YY.md`; snapshot + Go-live + UAT → `phases/PHASE-18.md`.

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
| 18.10 | TASK-18.10 | ✅ Tamamlandı | **Düzeltme:** betimleyici CTA atfı + etiket-alıntılama yasağı + 5 dil hitap kuralı + README model ailesi (UAT 19/28/29) |
| 18.11 | TASK-18.11 | ⬜ Bekliyor | **Düzeltme (2. tur):** üst-akış zaman aşımı — asılı Groq çağrısı ziyaretçiyi 30 s bekletiyor (UAT 33) |

---

## Son Task Özetleri

> **Faz 18: 10 ✅ / 1 ⬜ (verify 2. turu TASK-18.11'i açtı).** Faz 17 task özetleri → `phases/PHASE-17.md`.

**TASK-18.10 — Marka mührü kopyası** (✅ 2026-09-11)
- SYSTEM_PROMPT: `the "Book a call" button` → **betimleyici** atıf (`the free discovery call button on the page`) + buton etiketini tırnak içinde/başka dilde **alıntılama yasağı**; yanına 5 dil **hitap kuralı** (TR/DE formal · ES samimi · AR ikinci tekil · EN nötr) — kural `messages/*.json` sayımından türetildi, tahminden değil. `README.md:14` model ailesinden arındırıldı (tek-kaynak: env tablosu).
- 18.07 marka mührü harness'i (route.ts'ten runtime çıkarım) iki kez koşuldu: **2×20 yanıt, 0 ihlal** — buton adı alıntılanmadı, DE 4/4 `Sie` + 0 `du`; regresyon eksenleri (dil 5/5 · garble 0 · Bunker 0 · uydurma rakam 0) bozulmadı.
- Kapı sınandı: canlıda ölçülen kusurlu yanıt sınıflarına **8 ihlal** (exit 1), boş kapsamda PASS yok (exit 2). Vitest 64/64 + build exit 0. UAT 19/28/29 kapandı.

**TASK-18.09 — Girdi daraltma + hacim sınırı** (✅ 2026-09-11)
- `chat-sanitize` artık her mesajı `{role, content}` olarak **yeniden kuruyor** (istemcinin `name`/`tool_calls`/serbest alanları sağlayıcıya geçmiyor) + iki yeni sınır: ham mesaj sayısı **100**, tutulan içerik toplamı **16384 byte**, aşımda dürüst 400.
- Sınır değeri ölçümle seçildi: gerçek 12 turlu TR sohbeti **1.968 byte** → ~8,3× pay; per-mesaj cap (8192) kaldırılmadı, yanına eklendi.
- Vitest **52 → 64** (12 yeni test) + `next build` exit 0. Kapı sınandı: kaynak eski hâline alınınca yeni testlerin **9'u kırmızı**. UAT senaryo 20/21 kapandı.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-18.11** (`tasks/TASK-18.11.md`) — üst-akış zaman aşımı (UAT senaryo 33). Son tamamlanan: `tasks/archive/TASK-18.10.md`.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + 10 task ✅ + UAT ×2 → 2. düzeltme turu, Adım **task**). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı `main` = `9109517`**; chatbot canlıda (`qwen/qwen3.8-27b`). Faz dokümanı: `phases/PHASE-18.md` (→ **Go-live** + **UAT Sonuçları**); araştırma detayı → `phases/PHASE-18-ARASTIRMA.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21; go-live'daki model + `max_tokens` kararları → DECISIONS 2026-09-11.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf · chatbot prompt cilası (TR yankı/tekrar lekeleri) · `GROQ_API_KEY` Preview env · **`/api/chat` hız sınırı / origin kontrolü** (verify 18 senaryo 23) · **npm audit `next` aralık-içi güncelleme** (1 kritik, Dokunulmaz onayı gerekir).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)
