# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-21 — **prd-review (v0.4) ✅ tamamlandı.** Vizyon/taksonomi değişmedi; versiyon boyunca biriken tek not — chatbot sağlayıcı kararı (Anthropic Opus → Groq/`llama-3.3-70b`) — `docs/DECISIONS.md` + `PRD/VERSIONS.md`'ye mezun edildi → **v0.5 = Groq chatbot geçişi + canlıya alma** (öncelikli; canlı `/api/chat` 503/offline'ı da çözer, `ANTHROPIC_API_KEY` bekleme kalemi geçersizleşti), **v0.6 = booking/takvim**; çeviri senkronu (non-TR + AR) + BULGU-S3 craft cila numarasız aday. `NOTES.md` temizlendi. **Versiyon Sonu Durumu `prd_review_bekliyor` → `içerik_fazları` sıfırlandı** (Aktif Versiyon v0.4'te bırakıldı — re-kickoff v0.5'e ilerletir). v0.4 TR canlı (`f173234`). **Sıradaki: `/devflow:kickoff`** (v0.5 re-kickoff). Öneri: ayrı fresh oturumda `/devflow:audit-docs`.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Yok — faz döngüsü dışında.** Fazlar 1–17 ✅ tamam. v0.4 versiyon-sonu döngüsü kapandı (Faz 16 teknik borç + TR release, Faz 17 senaryo testi) ve **zorunlu prd-review ✅ yapıldı** (2026-07-21). Yeni faz **v0.5 re-kickoff** sonrası belirlenir.
**Adım:** **Yok** — faz döngüsü dışına çıkıldı. **Sıradaki: `/devflow:kickoff`** (v0.5 re-kickoff — Groq chatbot geçişi Aktif Versiyon olarak damgalanır).

**prd-review sonrası kalemlerin yeri** (hepsi versiyon adaylarına yerleşti → `PRD/VERSIONS.md`; hiçbiri regresyon değil):

1. **Chatbot sağlayıcı kararı → v0.5** — Anthropic Opus → Groq/`llama-3.3-70b` (DECISIONS 2026-07-21). Canlı `/api/chat` 503/offline'ı çözer → **`ANTHROPIC_API_KEY` bekleme kalemi geçersizleşti** (yerine `GROQ_API_KEY`). Chatbot per-mesaj max-byte cap = bu fazın hardening adayı.
2. **Booking + takvim → v0.6** — v0.5'ten ertelendi; ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
3. **non-TR alpfit stale-TR** (133 leaf × 5 dil yapısal tam, değerler Türkçe; **ziyaretçi-görünür**) + **AR-dil stratejisi** → çeviri senkronu numarasız aday.
4. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Faz 12 deseni, degradasyon/a11y doğru); Craft üst eksen → craft cila numarasız aday.
5. **`revize/v0.4-versiyon-sonu` → `main` merge** — doc-only (gym PNG silme + Faz 16/17 + prd-review dokümanları); v0.4 kodu zaten canlı → etkisiz. Finalizasyon adımı (kullanıcı kararı).
6. **npm audit 2 moderate** (postcss Next'e gömülü, sömürülemez; DECISIONS 2026-07-16) → upstream-bekleyen.
7. **Brief mobil perf açığı** (≈90 / LCP >2.5s) → metodolojik duvar; DECISIONS 2026-06-30.
8. **TB-3 runtime invariant tohumu** (Faz 12'den açık) → sonraki teknik borç fazı kapsam adayı.

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** prd-review (2026-07-21) — v0.4 değerlendirildi (vizyon değişmedi); chatbot kararı DECISIONS+VERSIONS'a mezun edildi, NOTES temizlendi; Versiyon Sonu Durumu `içerik_fazları` sıfırlandı. Sıradaki: v0.5 re-kickoff.
**Son Faz Dokümanı:** `phases/PHASE-17.md` (✅ tamamlandı, tarihsel; araştırma detayı → `phases/PHASE-17-ARASTIRMA.md`). Önceki: `phases/PHASE-16.md` (✅ v0.4 teknik borç + TR release), `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini ✅ **tamamlandı** (Faz 15–17; prd-review 2026-07-21 ✅). Sıradaki versiyon **v0.5 (Groq chatbot geçişi)** re-kickoff'ta Aktif olarak damgalanır.
**Hedef (v0.4, tamamlandı):** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı — 9 bölüm React+Tailwind token+next-intl port, `alpfit` 5-dil namespace, dürüstlük 4/4 gerçek, guardrail regresyonsuz. **Sonuç:** UAT 12/12 (senaryo), 0 kapsam-içi bug, TR canlı (`f173234`).
**Versiyon Sonu Durumu:** **içerik_fazları** (prd-review 2026-07-21 sıfırladı — v0.4 versiyon-sonu döngüsü ✅ kapandı: Faz 16 teknik borç + Faz 17 senaryo testi + zorunlu prd-review tamam). **Aktif Versiyon re-kickoff'ta v0.5'e ilerler** (2a: prd-review Aktif Versiyon'u tamamlanan versiyonda bırakır, re-kickoff damgalar).

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **Yok — faz döngüsü dışında.** v0.4 fazları (15–17) ✅ + prd-review ✅ (2026-07-21). Sıradaki adım task değil **v0.5 re-kickoff**: `/devflow:kickoff`.
**Durum:** Fazlar 1–17 ✅; Versiyon Sonu Durumu **`içerik_fazları`** (prd-review sıfırladı). **v0.4 TR canlı** (`f173234`).
**İlerleme:** prd-review (2026-07-21) — chatbot kararı mezun edildi (v0.5/v0.6), NOTES temizlendi, Versiyon Sonu Durumu sıfırlandı. Sıradaki adım: `/devflow:kickoff` (v0.5).

---

## Task Durumu (Aktif Faz)

> **Aktif faz yok** — Faz 17 ✅ kapandı, faz döngüsü dışına çıkıldı (prd-review ✅ 2026-07-21 yapıldı; v0.5 re-kickoff bekleniyor). Faz 17'nin 8 task'ının (17.01–17.08, hepsi ✅) durum tablosu ve bulguları `phases/PHASE-17.md` → Task Listesi'ne mezun edildi; icra detayı `tasks/archive/TASK-17.0X.md`'de. Yeni faz **v0.5 re-kickoff** sonrası discuss-phase ile açılır.

---

## Son Task Özetleri

> **Faz 17 kapandı → task özetleri `phases/PHASE-17.md`'ye mezun edildi** (Task Listesi + UAT Sonuçları + Retrospektif); icra detayı `tasks/archive/TASK-17.0X.md`'de. Aktif faz olmadığı için burada tutulacak özet yok — yeni faz başlayınca son 2 task özeti yeniden birikir.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **Yok — faz döngüsü dışında.** v0.4 fazları (15–17) ✅ + prd-review ✅ (2026-07-21). Sıradaki adım **`/devflow:kickoff`** (v0.5 re-kickoff — Groq chatbot geçişi). Faz 17 task detayları → `phases/PHASE-17.md` + `tasks/archive/TASK-17.0X.md`.
**Aktif Faz:** **Yok** — Fazlar 1–17 ✅. **Aktif Versiyon v0.4 ✅ tamam**, Versiyon Sonu Durumu **`içerik_fazları`** (prd-review sıfırladı; v0.5 re-kickoff'ta Aktif olur). **v0.4 TR CANLI** (`main` = `f173234`); branch `revize/v0.4-versiyon-sonu` (doc-only merge finalizasyona). Faz dokümanı: `phases/PHASE-17.md` (✅) + `phases/PHASE-17-ARASTIRMA.md`; release kaydı `docs/RELEASE-v0.4.md`.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** v0.5 Groq chatbot geçişi (öncelikli; canlı 503 çözer) · v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · TB-3 / npm audit / brief mobil perf.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-07-21 — **prd-review (v0.4) ✅ tamamlandı** → Versiyon Sonu Durumu `prd_review_bekliyor` → **`içerik_fazları`** sıfırlandı (faz döngüsü dışı; Aktif Versiyon v0.4'te bırakıldı, re-kickoff v0.5'e ilerletir). **Vizyon/taksonomi değişmedi.** Versiyon boyunca biriken tek not — chatbot sağlayıcı kararı (Anthropic Opus → Groq/`llama-3.3-70b`) — `docs/DECISIONS.md` + `PRD/VERSIONS.md`'ye mezun edildi: **v0.5 = Groq chatbot geçişi + canlıya alma** (öncelikli, canlı 503/offline'ı çözer; `ANTHROPIC_API_KEY` kalemi geçersizleşti), **v0.6 = booking/takvim**; çeviri senkronu (non-TR + AR) + BULGU-S3 craft numarasız aday. `NOTES.md` temizlendi; `SESSION-NOTES.md` v0.4 gerçekliğine hizalandı. **Sıradaki: `/devflow:kickoff`** (v0.5 re-kickoff). Öneri: ayrı fresh oturumda `/devflow:audit-docs` (statik doküman gerçeklik mutabakatı).
