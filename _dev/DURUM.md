# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-21 — **v0.5 re-kickoff (kickoff-docs) ✅ tamamlandı.** Aktif Versiyon **v0.4 ✅ → v0.5** damgalandı: **Chatbot ücretsiz sağlayıcı geçişi** (Anthropic Opus → Groq/`llama-3.3-70b-versatile`) **+ canlıya alma** (kaynak DECISIONS 2026-07-21, 5 kabul kriteri). C1 satırı VERSIONS + MODULE-MAP'e, v0.5 içerik faz konusu PHASES → Sıradaki Fazlar'a eklendi. Versiyon Sonu Durumu **içerik_fazları** (değişmedi). **M5 içerik + OVERVIEW stack satırı implementasyon fazına ertelendi** (kod↔doküman drift önleme, DECISIONS 2026-07-21). v0.4 TR canlı (`f173234`). **Sıradaki: `/devflow:discuss-phase`** (Faz 18 — v0.5 içerik fazı). Açık: `GROQ_API_KEY` Vercel env (kullanıcı aksiyonu) · `revize/v0.4-versiyon-sonu`→`main` doc-only merge finalizasyonu.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Yok — faz döngüsü dışında (v0.5 planlandı, henüz faza girilmedi).** Fazlar 1–17 ✅ tamam; v0.4 versiyon-sonu döngüsü + zorunlu prd-review ✅ (2026-07-21) kapandı. **v0.5 re-kickoff ✅** (kickoff + kickoff-docs, 2026-07-21) — Aktif Versiyon v0.5 damgalandı. İlk v0.5 fazı (Faz 18) discuss-phase ile açılacak.
**Adım:** **Yok** — faz döngüsü dışında. **Sıradaki: `/devflow:discuss-phase`** (Faz 18 — v0.5 Chatbot Groq geçişi + canlıya alma içerik fazı).

**v0.5 kapsamı ve açık kalemler** (re-kickoff 2026-07-21):

1. **v0.5 içerik fazı = Chatbot Groq geçişi + canlıya alma** (aktif versiyon) — `route.ts` Anthropic Opus → Groq/`llama-3.3-70b-versatile` (`GROQ_API_KEY`); system prompt TR-birincil dil algılama + "fiyat/rakam uydurma" yasağı; hardening per-mesaj max-byte cap; 5-dil gözle doğrulama → canlıya alma (canlı `/api/chat` 503/offline kapanır). 5 kabul kriteri → DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack satırı **implementasyon fazında** güncellenir.
2. **Operasyonel bağımlılık:** `GROQ_API_KEY` Vercel env'e eklenmeli (kullanıcı aksiyonu; koda gömülmez). Test key repo-dışı `.env.keys.local` (git-ignore; canlı deploy'da kullanılmaz).
3. **`revize/v0.4-versiyon-sonu` → `main` merge** — doc-only (v0.4 kodu zaten canlı → etkisiz); v0.5 branch açmadan önce temizlik (kullanıcı kararı).
4. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
5. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
6. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
7. **Sahipli teknik açıklar:** TB-3 runtime invariant tohumu (Faz 12'den) · npm audit 2 moderate (postcss Next'e gömülü, sömürülemez; DECISIONS 2026-07-16, upstream-bekleyen) · brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** v0.5 re-kickoff (kickoff + kickoff-docs, 2026-07-21) — Aktif Versiyon v0.5 damgalandı; C1 satırı VERSIONS + MODULE-MAP'e, v0.5 içerik faz konusu PHASES → Sıradaki Fazlar'a eklendi; Versiyon Sonu Durumu `içerik_fazları` (değişmedi). Sıradaki: `/devflow:discuss-phase` (Faz 18).
**Son Faz Dokümanı:** `phases/PHASE-17.md` (✅ tamamlandı, tarihsel; araştırma detayı → `phases/PHASE-17-ARASTIRMA.md`). Faz geçmişi → `PHASES.md`. Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** **v0.5 — Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (re-kickoff 2026-07-21 damgaladı; v0.4 ✅ tamamlandı → `PRD/VERSIONS.md`). Anthropic Opus → Groq/`llama-3.3-70b-versatile` ($0/kartsız) + canlıya alma.
**Hedef (v0.5):** `route.ts` Groq'a geçer (streaming/sanitizasyon/zarif offline fallback korunur) + system prompt TR-birincil dil algılama + "fiyat/rakam uydurma" yasağı + hardening per-mesaj max-byte cap + 5-dil çıktı gözle doğrulama → canlıya alma (canlı 503/offline çözülür). Kaynak / 5 kabul kriteri: DECISIONS 2026-07-21. M5 içerik + OVERVIEW stack satırı implementasyon fazında güncellenir.
**Versiyon Sonu Durumu:** **içerik_fazları** (v0.5 başında — içerik fazları henüz koşulmadı; içerik fazı bitince discuss-phase sırasıyla teknik_borç → senaryo_testi → prd_review_bekliyor'a ilerletir).

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **Yok — faz döngüsü dışında (v0.5 planlandı, henüz faza girilmedi).** Sıradaki adım task değil **v0.5 içerik fazı**: `/devflow:discuss-phase` (Faz 18).
**Durum:** Fazlar 1–17 ✅; v0.5 re-kickoff ✅ (Aktif Versiyon v0.5). Versiyon Sonu Durumu **`içerik_fazları`**. **v0.4 TR canlı** (`f173234`).
**İlerleme:** v0.5 re-kickoff (kickoff + kickoff-docs, 2026-07-21) — Aktif Versiyon v0.5 damgalandı; C1 satırı VERSIONS + MODULE-MAP'e, içerik faz konusu PHASES → Sıradaki Fazlar'a eklendi. Sıradaki adım: `/devflow:discuss-phase` (Faz 18).

---

## Task Durumu (Aktif Faz)

> **Aktif faz yok** — Faz 17 ✅ kapandı, faz döngüsü dışına çıkıldı; v0.5 re-kickoff ✅ (2026-07-21). İlk v0.5 fazı (**Faz 18** — v0.5 içerik fazı) discuss-phase ile açılır. Faz 17'nin 8 task'ının (17.01–17.08, hepsi ✅) durum tablosu ve bulguları `phases/PHASE-17.md` → Task Listesi'nde; icra detayı `tasks/archive/TASK-17.0X.md`'de.

---

## Son Task Özetleri

> **Faz 17 kapandı → task özetleri `phases/PHASE-17.md`'ye mezun edildi** (Task Listesi + UAT Sonuçları + Retrospektif); icra detayı `tasks/archive/TASK-17.0X.md`'de. Aktif faz olmadığı için burada tutulacak özet yok — yeni faz (Faz 18, v0.5) başlayınca son 2 task özeti yeniden birikir.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **Yok — faz döngüsü dışında.** v0.5 re-kickoff ✅ (2026-07-21). Sıradaki adım **`/devflow:discuss-phase`** (Faz 18 — v0.5 içerik fazı: Chatbot Groq geçişi + canlıya alma). Faz 17 task detayları → `phases/PHASE-17.md` + `tasks/archive/TASK-17.0X.md`.
**Aktif Faz:** **Yok** — Fazlar 1–17 ✅. **Aktif Versiyon v0.5** (Chatbot ücretsiz sağlayıcı geçişi + canlıya alma; re-kickoff 2026-07-21 damgaladı). Versiyon Sonu Durumu **`içerik_fazları`**. **v0.4 TR CANLI** (`main` = `f173234`); branch `revize/v0.4-versiyon-sonu` (doc-only merge finalizasyona). Faz dokümanı (son): `phases/PHASE-17.md` (✅); release kaydı `docs/RELEASE-v0.4.md`.
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21. M5 içerik + OVERVIEW stack satırı implementasyon fazına ertelendi.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-07-21 — **v0.5 re-kickoff (kickoff-docs) ✅ tamamlandı.** Aktif Versiyon **v0.4 ✅ → v0.5** damgalandı (Chatbot ücretsiz sağlayıcı geçişi: Anthropic Opus → Groq/`llama-3.3-70b-versatile` + canlıya alma; kaynak DECISIONS 2026-07-21, 5 kabul kriteri). VERSIONS Feature→Versiyon tablosu + MODULE-MAP Feature-Faz Matrisi'ne **C1** satırı (Faz `—`, Durum ⬜), PHASES Sıradaki Fazlar'a **v0.5 içerik fazı** (numarasız → Faz 18) eklendi. Versiyon Sonu Durumu **içerik_fazları** (değişmedi). **M5 içerik + OVERVIEW stack satırı implementasyon fazına ertelendi** (kod↔doküman drift önleme). Vizyon/taksonomi + modül haritası (M1–M6) değişmedi. KICKOFF-NOTES.md silindi. **Sıradaki: `/devflow:discuss-phase`** (Faz 18). Açık kalemler: `GROQ_API_KEY` Vercel env (kullanıcı aksiyonu) · `revize/v0.4-versiyon-sonu`→`main` doc-only merge finalizasyonu.
