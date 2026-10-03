# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-10-03 — **TASK-19.06 ✅:** WAF `chat-rate-limit` canlıda (429 temiz pencerede 7. istekte, sınırdaki ziyaretçi TR/EN offline kopyası, drift 0); Faz 19'un 7 task'ı tamam → sıradaki `/devflow:verify-phase 19`.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 19 — v0.5 versiyon-sonu teknik borç — güvenlik (bağımlılık yaması + `/api/chat` kota koruması)** 🔄. Fazlar 1–18 ✅.
**Adım:** **verify** — fazın 7 task'ı ✅ (son: TASK-19.06, 2026-10-03). Kod katmanı ve WAF hız sınırı canlıda; `main` canlı. **Sıradaki:** `/devflow:verify-phase 19`. Canlı katmanı yeniden ölçerken pencere bütçesi geçerli (10 dk'da 6 / IP, origin senaryoları da sayılır, patlama en son).

**v0.5 durumu ve açık kalemler:**

1. **Faz 18 ✅ — Chatbot Groq geçişi + canlıya alma.** Chatbot canlıda (`qwen/qwen3.8-27b`). Retrospektif + kalite → `phases/PHASE-18.md`; UAT detayı → `phases/PHASE-18-UAT.md`.
2. **`GROQ_API_KEY` yalnız Production'da.** Preview'e eklenmedi → `revize/...` preview deploy'larında chatbot offline görünür (bilinçli açık). Faz 18'in düzeltme turları bu yüzden de doğrudan `main`'e aktı → dal kuralı prd-review kalemi (retro 18).
3. **Booking + takvim → v0.6** — ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
4. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
5. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
6. **Faz 19 kapsamında (güvenlik):** araştırma kararları → `phases/PHASE-19.md` → Araştırma Bulguları + DECISIONS 2026-10-02.
   - **TB-G1 ✅** (TASK-19.01): `next` 15.5.27 ile audit 9 açıktan 2'ye indi. Kalan kritik 0 · high 1 · moderate 1, ikisi de Next'e gömülü `postcss@8.4.31`'den; Next 16'ya dek kabul edildi (DECISIONS 2026-10-02 "npm audit gerçek sonucu").
   - **TB-G2 ✅:** `/api/chat`'te origin kapısı (19.02/19.03, canlı ölçüm 19.07: üç host'ta yabancı/başlıksız 403, kendi origin 400) + WAF hız sınırı (19.04 spec + drift · 19.05 probe · 19.06 canlı: `POST /api/chat` 6/10 dk/IP, 429 temiz pencerede 7. istekte, sınırdaki ziyaretçi offline kopyası, drift 0). UAT 18 senaryo 23 kapandı.
7. **Sahipli teknik açıklar (Faz 19'a alınmadı → prd-review'da yeniden tartılır):**
   - TB-3 runtime invariant tohumu (Faz 12'den).
   - **Canlı chatbot sağlık kontrolü yok** (retro 18): model emekliliği ve kota tükenmesi yalnız `vercel logs`'ta görünür, Llama deploy olmadan emekliye ayrıldı → günlük sentetik kontrol adayı (eklenirse TB-G2'nin origin/limit kapısından geçmeli).
   - **Marka mührü harness'i kalıcı değil** (retro 18): Faz 18'de 3 kez yazılıp silindi → repo içinde elle tetiklenen script adayı (CI'da koşmaz).
   - Chatbot prompt cilası (TR "observable ve measured" yankısı, seyrek kelime tekrarı) + `route.ts` `max_tokens` gerekçe yorumunun inceltilmesi (retro 18).
   - Brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**İlerleme:** Faz 19 — 2 iş birimi (TB-G1 ✅, TB-G2 ✅), 7 task, **7/7 tamam**; sırada verify-phase. Faz 18 ✅ (13 task, UAT 43/44, Vitest 86).
**Aktif Faz Dokümanı:** `phases/PHASE-19.md`. Son tamamlanan faz → `phases/PHASE-18.md`; faz geçmişi → `PHASES.md`.

---

## Aktif Versiyon

**Versiyon:** **v0.5 — Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (re-kickoff 2026-07-21 damgaladı; v0.4 ✅ → `PRD/VERSIONS.md`). Anthropic Opus → Groq ($0/kartsız). Canlıya alma ✅ 2026-09-11, içerik fazı (Faz 18) ✅ 2026-10-02.
**Hedef (v0.5):** `route.ts` Groq'a geçer (streaming/sanitizasyon/zarif offline fallback korunur) + system prompt TR-birincil dil algılama + "fiyat/rakam uydurma" yasağı + hardening per-mesaj max-byte cap + 5-dil çıktı gözle doğrulama → canlıya alma. Kaynak / 5 kabul kriteri: DECISIONS 2026-07-21. **Karşılandı** (Faz 18).
**Versiyon Sonu Durumu:** **teknik_borç** (discuss-phase 19 damgaladı, 2026-10-02; Faz 19 ✅ olunca review-phase `senaryo_testi`'ye ilerletir).

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Yok — fazın bütün task'ları ✅; sıradaki adım `/devflow:verify-phase 19`.
**Durum:** Faz 19 task'ları tamam. Fazlar 1–18 ✅, Faz 19 🔄 (verify). Versiyon Sonu Durumu **`teknik_borç`**. Chatbot canlıda; canlı = `main` HEAD.
**İlerleme:** TASK-19.06 ✅ (2026-10-03) — task listesi `phases/PHASE-19.md` → Task Listesi.

## Task Durumu (Aktif Faz)

| # | Task | Durum |
|---|------|-------|
| 19.01 | Dal aç + TB-G1 force'suz `npm audit fix` + yerel kapılar | ✅ |
| 19.02 | Origin modülü (saf) + Vitest node | ✅ |
| 19.03 | Origin kapısı → `route.ts` + route testleri + M5 | ✅ |
| 19.04 | WAF kural spec'i + drift script'i (publish yok) | ✅ |
| 19.05 | Canlı probe script'i + TESTING.md | ✅ |
| 19.07 | Preview kapısı → ff-merge `main` → canlı ölçüm (kod katmanı) | ✅ |
| 19.06 | WAF canlı (`log` → 429) + patlama + sınırdaki ziyaretçi + drift (merge sonrası) | ✅ |

---

## Son Task Özetleri

### TASK-19.06 — WAF canlı (`log` → 429) + patlama + sınırdaki ziyaretçi + drift ✅ (2026-10-03)

- Kullanıcı onayıyla publish: `log` 18:46Z → 13 istek 400, Vercel'de 7 eşleşme, yalnız `/api/chat`; 429 18:48Z.
- Temiz pencerede 429 **7. istekte**; 429 altında `/` ve `/en` chatbot'u kendi dilinin offline kopyasını gösteriyor, UI takılmıyor, Groq çağrısı 0.
- `drift.mjs` 0 (canlı, uyarısız) · `diff` boş · M5/M6 güncellendi · Vitest 10/141 (kod değişmedi).

**Detay:** `tasks/archive/TASK-19.06.md`

### TASK-19.07 — Preview kapısı → ff-merge `main` → canlı ölçüm (kod katmanı) ✅ (2026-10-03)

- Preview: 30/30 URL 200 · 6/6 redirect 308 · AR RTL; origin probu 403·403·503. Firewall başlangıçta `Not configured`, diff boş.
- `main` `523af58..5a9e9fd` ff-merge, Production deploy `success`. Canlıda apex/`www`/`vercel.app` 403·403·400; gerçek Chrome 200 + tam yanıt; 6 red satırı yalnız probe'dan, `host` herkese açık host.
- Firewall dokunulmadı (drift 2) · audit kritik 0 / high 1 / moderate 1 · canlı regresyon 30/30 · 6/6 · RTL. Groq çağrısı 2 (harness artefaktı 1).

**Detay:** `tasks/archive/TASK-19.07.md`

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** yok (Faz 19 task'ları tamam → verify-phase). Son tamamlanan task: `tasks/archive/TASK-19.06.md`. Faz 19 dalı `revize/v0.5-teknik-borc` `main`'e alındı (`5a9e9fd`); WAF `chat-rate-limit` canlıda.
**Aktif Faz:** **Faz 19 — v0.5 versiyon-sonu teknik borç — güvenlik**, Adım **verify**. **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`teknik_borç`**. **Canlı = `main` HEAD** (her push deploy); chatbot canlıda (`qwen/qwen3.8-27b`). Faz dokümanı: `phases/PHASE-19.md`; son tamamlanan: `phases/PHASE-18.md` (alt-dokümanlar: `-ARASTIRMA` · `-GOLIVE` · `-UAT`).
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21; go-live'daki model + `max_tokens` kararları → DECISIONS 2026-09-11; zaman aşımı → 2026-09-12; ziyaretçi dilinde sunucu metni → 2026-10-02.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** **ana sayfa mesaj netliği / ilk-ekran anlaşılırlığı** (kullanıcı 2026-10-02: ziyaretçi kim olduğumuzu ve ne yaptığımızı anlamadan çıkıyor; teşhis + hero çapası çelişkisi → `PRD/NOTES.md`; booking/takvimle önceliği yarışır, sıra prd-refine'da damgalanır) · v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · **brief'in yetkisi + kalan bayatlığı** (OVERVIEW "çelişkide v2 geçerli" + Korumalı `ILKELER.md:34` örneği; → `PRD/NOTES.md`) · **dal kuralı go-live sonrası** (canlı feature düzeltmeleri `main`'de mi, Preview env + revize branch mi; retro 18 → prd-review). Faz 19'a alınmayan sahipli teknik açıklar yukarıda (Aktif Faz → madde 7).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)
