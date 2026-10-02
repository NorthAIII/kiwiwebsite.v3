# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-10-02 — **verify-phase 18 (4. koşum):** 44 senaryo / 43 ✅ / 1 ❌ (senaryo 23, kapsam-dışı); düzeltme task'ı çıkmadı → sırada review-phase 18.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 18 — v0.5 Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (🔄 girildi; discuss-phase ✅ 2026-07-21). Fazlar 1–17 ✅; v0.5 ilk içerik fazı. Milestone / 5 kabul kriteri → `docs/DECISIONS.md` 2026-07-21; kapsam kararları → `phases/PHASE-18.md`.
**Adım:** **review** — verify 4. koşumu (2026-10-02) baştan koşuldu: **44 senaryo / 43 ✅ / 1 ❌**. 18.12 canlıda teyitli (gerçek Chrome 5/5: hata notu ziyaretçinin dilinde), 18.13'ün CI teyidi yeşil. Tek ❌ senaryo 23 (hız sınırı/origin), kapsam-dışı ve kayıtlı (v0.6). **Sıradaki: `/devflow:review-phase 18`**.

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **Faz 18 (aktif) = Chatbot Groq geçişi + canlıya alma** — discuss-phase ✅; kapsam → `phases/PHASE-18.md`. Kararlar: OpenAI-uyumlu **drop-in** (streaming/sanitizasyon/offline + UI `Chatbot.tsx` korunur), system prompt TR-birincil + "rakam uydurma" yasağı, per-mesaj byte cap **reddet-400**, `CHAT_MODEL` override korunur (varsayılan go-live'da `qwen/qwen3.8-27b` oldu — DECISIONS 2026-09-11); **canlıya alma Faz 18 sonunda ✅** (5-dil gözle doğrulama sonrası → canlı `/api/chat` 503/offline çözülür). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık — ✅ çözüldü (TASK-18.08).** `GROQ_API_KEY` Vercel **Production** env'de (Secret). ⚠️ **Preview'e eklenmedi** → `revize/...` preview deploy'larında chatbot offline görünür (bilinçli açık, kullanıcıya önerildi). Test key repo-dışı `.env.keys.local`.
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — ✅ **tamamlandı (TASK-18.01).** ff-only merge → canlı `df7c293`; temiz `revize/v0.5-chatbot-groq` açıldı+aktif. (Not: merge saf doc değildi — Faz-16 orphan-PNG refactor + gitignore de taşındı; render byte-identical.)
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · ⚠️ **npm audit 9 açık (1 kritik / 4 high / 4 moderate)** — verify-phase 18'de yeniden ölçüldü; kritik+high'ların çoğu `next@15.5.19` upstream'inde ve **aralık-içi `next@15.5.24`** ile kapanıyor, yani DECISIONS 2026-07-16'nın "güvenli fix yok" gerekçesi bu kalemler için **artık geçerli değil** (`package.json`/`package-lock.json` Dokunulmaz → kullanıcı kararı); `undici` (jsdom, dev-only) · `nanoid`/`postcss` (build-zamanı) · `fflate` (ZIP ayrıştırma yok) sömürülemez; groq-sdk swap SIFIR açık ekledi (doğrulandı) · **`/api/chat` hız sınırı / origin kontrolü yok** (verify 18 senaryo 23; middleware `api`'yi atlıyor, `vercel.json` yok → 1.000 istek/gün kotası dışarıdan tüketilebilir; v0.6 adayı) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** verify-phase 18 4. koşumu (2026-10-02) — **44 senaryo / 43 ✅ / 1 ❌**. Küme 39→44: 18.12'nin hata notu dili sözleşmesi (40 locale girdisine adversarial · 41 kaynak sırası · 42 iki bağlam · 43 kümülatif test · 44 yükleme maliyeti). Canlı ~140 model çağrısı, **0 × 504**. CI `main` HEAD (`0930490`) yeşil, Vitest 86/86, `next build` exit 0.
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

**Task:** yok — Faz 18'in 13 task'ı da ✅. Son tamamlanan: `tasks/archive/TASK-18.13.md`.
**Durum:** Faz 18 🔄 (v0.5 içerik fazı, Adım **review**). Versiyon Sonu Durumu **`içerik_fazları`**. Chatbot canlıda çalışıyor; 18.09–18.12 düzeltmelerinin dördü de canlıda teyitli (senaryo 30 + 36).
**İlerleme:** verify 4. koşumu kapandı, kapsam-içi açık yok. Sırada `/devflow:review-phase 18`.

## Task Durumu (Aktif Faz)

> **Faz 18 aktif (🔄)** — discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + UAT **dört kez** koşuldu; **13 task: 13 ✅** → Adım **review**. Detay/icra → `tasks/archive/TASK-18.YY.md`; snapshot + Go-live + UAT → `phases/PHASE-18.md`.

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
| 18.11 | TASK-18.11 | ✅ Tamamlandı | **Düzeltme (2. tur):** üst-akış zaman aşımı — 20 s / 5 s / 24 s + SDK retry kapalı (UAT 33); Vitest 64→69 |
| 18.12 | TASK-18.12 | ✅ Tamamlandı | **Düzeltme (3. tur):** hata/zaman-aşımı notu ziyaretçinin dilinde — Referer → `NEXT_LOCALE` → TR, metin `chat.error` (UAT 36); Vitest 69→86 |
| 18.13 | TASK-18.13 | ✅ Tamamlandı | **Düzeltme (3. tur):** bayat Anthropic referansları — `ci.yml` yorumu + `MASTER_PROMPT_v2.md` §6/§7 + üç yaşayan `_dev` dokümanı (UAT 39) |

---

## Son Task Özetleri

> **Faz 18: 13 ✅.** Faz 17 task özetleri → `phases/PHASE-17.md`.

**TASK-18.13 — Bayat Anthropic referansları** (✅ 2026-10-02 · detay `tasks/archive/TASK-18.13.md`)
- `ci.yml:12` yorumu ve `MASTER_PROMPT_v2.md` §6/§7 Groq'a hizalandı (brief'e model adı kopyalanmadı, varsayılan kodda). `_dev/` içindeki üç yaşayan kopya da kapandı: TESTING, M6, repo-haritası memory'si.
- Süpürme `_dev/` hariç 5 eşleşme bıraktı, hepsi gerekçeli sınıf dışı: v1 brief (v2 onu geçersiz kılıyor) + bülten slug'ı `claude-opus-4-8-fable-5` ×4. Çapada 8 eşleşme vardı, kontrol grubu `GROQ_API_KEY` 7 dosyada bulundu.
- Brief'in yetkisi/kalan bayatlığı ve Korumalı `ILKELER.md:34` sahipsizdi → `PRD/NOTES.md` (prd-review). Build exit 0, Vitest 86/86.

**TASK-18.12 — Hata notu ziyaretçinin dilinde** (✅ 2026-10-02 · detay `tasks/archive/TASK-18.12.md`)
- `route.ts`'in sabit TR `FALLBACK_MESSAGE`'ı kalktı. Dil istekten çözülüyor (Referer prefix'i → `NEXT_LOCALE` cookie'si → TR; Accept-Language yok), metin `messages/<locale>.json` → `chat.error`'dan ve yalnız hata anında yükleniyor. Ayraç yalnız yarım yanıtın ardına ekleniyor.
- Ölçüm: next-intl, tarayıcı dili sayfayla aynıysa cookie yazmıyor; gerçek Chrome'da EN/AR/ES'de cookie yoktu, dil yalnız Referer'dan geldi. Yerel `next start` + Chrome: 5/5 doğru, AR RTL doğru.
- Vitest 69 → **86**, build exit 0. Kapı 3 bozuk girdiyle sınandı (çapa 18 / sabit-TR 8 / koşulsuz ayraç 14 kırmızı), boş kapsamda sessiz PASS yok. Canlı teyit verify'da.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** yok (13/13 ✅). Son tamamlanan: `tasks/archive/TASK-18.13.md`.
**Aktif Faz:** **Faz 18 🔄** (v0.5 Chatbot Groq geçişi + canlıya alma; discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + 13 task ✅ + UAT ×4, Adım **review**). **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı = `main` HEAD** (her push deploy); chatbot canlıda (`qwen/qwen3.8-27b`). Faz dokümanı: `phases/PHASE-18.md` (→ **Go-live** + **UAT Sonuçları**); araştırma detayı → `phases/PHASE-18-ARASTIRMA.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21; go-live'daki model + `max_tokens` kararları → DECISIONS 2026-09-11.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** **ana sayfa mesaj netliği / ilk-ekran anlaşılırlığı** (kullanıcı 2026-10-02: ziyaretçi kim olduğumuzu ve ne yaptığımızı anlamadan çıkıyor; teşhis + hero çapası çelişkisi → `PRD/NOTES.md`; booking/takvimle önceliği yarışır, sıra prd-refine'da damgalanır) · v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf · chatbot prompt cilası (TR yankı/tekrar lekeleri) · `GROQ_API_KEY` Preview env · **`/api/chat` hız sınırı / origin kontrolü** (verify 18 senaryo 23) · **npm audit `next` aralık-içi güncelleme** (1 kritik, Dokunulmaz onayı gerekir) · **brief'in yetkisi + kalan bayatlığı** (OVERVIEW "çelişkide v2 geçerli" + Korumalı `ILKELER.md:34` örneği; → `PRD/NOTES.md`).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)
