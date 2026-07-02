# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **research-phase 10 tamamlandı:** Faz 10 araştırma bulguları PHASE-10.md'ye yazıldı; üç karar damgalandı — A1 → ortak `<Logo>` bileşeni (kopya-kod drift kök-nedeni giderilir), A3a → site-standart ok idiomu + durağan ipucu, A3b → scroll göstergesi ölçek büyütme ("çok küçük"). Yeni npm/i18n anahtarı yok. Aktif Faz **10**, Adım **plan**. Aktif Versiyon **v0.3** (Versiyon Sonu Durumu `içerik_fazları`). **⚠️ v0.3 içerik fazlarından ÖNCE (run-task'tan önce) bekleyen operasyonel adım: v0.2 production release** (revize `main`'e ilk merge → Umami canlı +1 + duman testi orada kapanır). Sıradaki DevFlow komutu: **`plan-phase 10`**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 10 — v0.3 görsel cila (A1 logo hizalama + A3 CTA affordance & scroll göstergesi). v0.3'ün ilk fazı; saf CSS/görsel craft, imza/davranış/içerik değişmez. Kapsam damgalandı (discuss-phase 10). v0.2 tamamen ✅ (Faz 4–9 + prd-review, PRD değişikliği yok).
**Adım:** plan (research-phase 10 tamamlandı → sıradaki DevFlow komutu `plan-phase 10`; Versiyon Sonu Durumu = `içerik_fazları`). **⚠️ v0.3 içerik fazlarından ÖNCE (run-task öncesi) bekleyen operasyonel adım: v0.2 production release** (revize `main`'e ilk merge → Umami canlı +1 + duman testi orada kapanır; ayrı oturum, faz döngüsü dışı). Planlama (discuss/research/plan) canlıya dokunmaz — release yalnız run-task'tan önce şart.
**İlerleme:** research-phase 10 (2026-07-02) tamamlandı — üç karar damgalandı: **A1** → ortak `<Logo>` bileşeni (3 yüzeydeki kopya-kod = A1 kök nedeni, tek kaynakta çözülür); **A3a** → site-standart `→` ok idiomu + durağan (hover-only olmayan) ipucu; **A3b** → merkez-alt scroll göstergesi ölçek büyütme ("çok küçük"). Yeni npm bağımlılığı ve i18n anahtarı yok (`hero.scroll`/`hero.stats.*` 5 dilde tam). Dikkat: çift-tema adaptif token, a11y=100 çift-tema, CLS≈0, RTL fiziksel-ok tutarlılığı. **Sahipli açıklar (record):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), brief mobil perf (gerçek-cihaz duvarı), `/bunker-os`→`/crew-os` redirect + `/forum`→404 (v0.3, ayrı faz), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-10.md` (🔄 Devam ediyor — kapsam tartışması + araştırma bulguları yazıldı, plan bekliyor). Faz 9 ✅ `phases/PHASE-9.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **Aktif task yok** — Faz 10 research ✅ tamamlandı (research-phase, task yazılmaz). Task'lar plan-phase 10'da yazılacak. Sıradaki adım **plan-phase 10**.
**Durum:** Faz 10 (v0.3 görsel cila) 🔄 — Adım plan. Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** research-phase 10 (2026-07-02) tamamlandı — A1/A3a/A3b yaklaşımları damgalandı (ortak Logo bileşeni · ok idiomu+durağan ipucu · gösterge ölçek büyütme), araştırma bulguları PHASE-10.md'ye yazıldı. Sıradaki = plan-phase 10.

---

## Task Durumu (Aktif Faz)

> Faz 10 (v0.3 görsel cila) 🔄 — kapsam tartışması ✅ + research ✅, **task'lar henüz yazılmadı** (plan-phase 10'da yazılacak). Faz 9 ✅ (9.01–9.09, detay `phases/PHASE-9.md`); Faz 4–8 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | ⬜ Bekliyor | plan-phase 10'da yazılacak (A1 logo + A3 CTA affordance + A3 scroll göstergesi) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 9 task özetleri sıfırlandı** (Faz 9 detayları `phases/PHASE-9.md` + `tasks/archive/`).

_Faz 10 henüz task üretmedi (plan-phase bekliyor) — ilk task tamamlanınca özet buraya gelir._

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Aktif task yok — **Faz 10 research ✅** (research-phase). Task'lar plan-phase 10'da yazılır. Sıradaki adım **plan-phase 10** (yeni oturum). run-task öncesi ayrı operasyonel adım: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** 10 — v0.3 görsel cila (A1 logo + A3 CTA affordance & scroll göstergesi), 🔄 Adım plan. v0.2 Faz 4–9 ✅ + prd-review ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `plan-phase 10`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-02 — **research-phase 10 tamamlandı:** Faz 10 araştırma bulguları PHASE-10.md'ye yazıldı; üç karar damgalandı (A1 ortak `<Logo>` bileşeni · A3a ok idiomu+durağan ipucu · A3b gösterge ölçek büyütme). Yeni npm/i18n anahtarı yok. Aktif Faz **10** 🔄, Adım **plan**; Aktif Versiyon **v0.3** (Versiyon Sonu Durumu `içerik_fazları`). **run-task öncesi bekleyen: v0.2 production release** (main merge + Umami canlı +1). Sıradaki DevFlow komutu: **`plan-phase 10`**.
