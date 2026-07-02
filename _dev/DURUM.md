# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **review-phase 10 tamamlandı — Faz 10 ✅:** v0.3 görsel cila kapandı (A1 kök nedeni ortak `<Logo>` ile kalıcı çözüldü + A3a ok affordance + A3b scroll göstergesi orantı; UAT 17/17, milestone 5/5, 8 kalite ekseni 7 ✅ + 1 N/A güvenlik, guardrail'ler regresyonsuz). Retrospektif + kalite kontrol PHASE-10'a yazıldı; DECISIONS'a `<Logo>` + RTL ok idiomu kararı eklendi. Versiyon Sonu Durumu `içerik_fazları` (değişmez) → sıradaki v0.3 içerik fazı. Sıradaki DevFlow komutu: **`discuss-phase 11`** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 11 (geçici ad — v0.3 sonraki içerik fazı; discuss-phase 11 damgalar) — Sıradaki Fazlar'ın ilk adayı **Living Flow nabız kapsamı (B1, karar-gate'li)**; alternatif **URL taksonomisi/SEO redirect** (`/bunker-os`→`/crew-os` + `/forum`→404). Kesin konu/kapsam/sıra discuss-phase 11'de netleşir. **Faz 10 ✅ Tamamlandı** (v0.3 görsel cila — A1 logo + A3a/A3b). v0.2 tamamen ✅ (Faz 4–9 + prd-review).
**Adım:** discuss (Faz 10 review ✅ → sıradaki `discuss-phase 11`; Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** review-phase 10 (2026-07-02) ✅ — Faz 10 tamamlandı: milestone 5/5, UAT 17/17, 8 kalite ekseni (7 ✅ + 1 N/A güvenlik), guardrail'ler regresyonsuz (a11y=100 çift-tema, perf tabanı, CLS=0, i18n 5-dil parite). A1 kök nedeni (3 kopya-kod lockup) ortak `<Logo>` ile kalıcı kapandı. 0 imza/davranış/içerik değişimi. Retrospektif + kalite kontrol PHASE-10'a, `<Logo>`+RTL ok kararı DECISIONS'a yazıldı. **Sahipli açıklar (record, faz-dışı):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), brief mobil perf (gerçek-cihaz duvarı), `/bunker-os`→`/crew-os` redirect + `/forum`→404 (v0.3, ayrı faz — Faz 10'un doğal devamı), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-10.md` (✅ Tamamlandı — kapsam + araştırma + task listesi + verify-plan + UAT 17/17 + retrospektif + kalite kontrol). Faz 9 ✅ `phases/PHASE-9.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Aktif task **yok** — Faz 10 tamamlandı, Faz 11 henüz planlanmadı. Sıradaki adım kapsam tartışması (`discuss-phase 11`), ayrı oturumda.
**Durum:** Faz 10 ✅ Tamamlandı → Adım **discuss** (Faz 11). Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** review-phase 10 (2026-07-02) ✅ — Faz 10 kapandı (retrospektif + kalite kontrol yazıldı, MODULE-MAP A1/A3 ✅, PHASES geçiş notu). Sıradaki = `discuss-phase 11`.

---

## Task Durumu (Aktif Faz)

> Faz 11 (v0.3 sonraki içerik fazı) **henüz planlanmadı** — kapsam tartışması bekliyor (`discuss-phase 11`). Task tablosu discuss/plan sonrası dolar. Faz 10 ✅ (10.01–10.04, detay `phases/PHASE-10.md`); Faz 4–9 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | _(Faz 11 planlanmadı)_ | — | discuss-phase 11 kapsamı damgalar, plan-phase task'ları yazar |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 10 task özetleri sıfırlandı** (Faz 10 detayları `phases/PHASE-10.md` + `tasks/archive/`).

_(Faz 11 henüz başlamadı — task özeti yok. İlk task tamamlanınca buraya eklenir.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Aktif task **yok** — Faz 10 ✅ Tamamlandı, Faz 11 henüz planlanmadı. Sıradaki adım **discuss-phase 11** (kapsam tartışması, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 10 ✅ Tamamlandı (v0.3 görsel cila — A1 logo + A3a/A3b). Sıradaki Faz 11 = v0.3 sonraki içerik fazı (B1 Living Flow nabız / SEO redirect — discuss-phase 11 damgalar). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `discuss-phase 11`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-02 — **review-phase 10 ✅ — Faz 10 Tamamlandı:** v0.3 görsel cila kapandı (A1 ortak `<Logo>` kök-neden çözümü + A3a ok affordance + A3b scroll göstergesi orantı; milestone 5/5, UAT 17/17, 8 kalite ekseni 7 ✅ + 1 N/A, guardrail'ler regresyonsuz). Retrospektif + kalite kontrol PHASE-10'a, `<Logo>`+RTL ok kararı DECISIONS'a, MODULE-MAP A1/A3 ✅, PHASES geçiş notu yazıldı. Versiyon Sonu Durumu `içerik_fazları` (değişmez) → sıradaki DevFlow komutu: **`discuss-phase 11`** (v0.3 sonraki içerik fazı).
