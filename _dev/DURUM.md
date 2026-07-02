# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **review-phase 11 tamamlandı: Faz 11 ✅** (v0.3 URL taksonomisi/SEO). Retrospektif + 8 kalite ekseni (7 ✅ + 1 N/A güvenlik) + kullanıcı yolculuğu/boşluk PHASE-11'e yazıldı; kaynak kod bağımsız teyit edildi (redirect/route/sitemap/namespace/iç link tutarlı); taksonomi (DECISIONS 2026-06-27) son açık ucu kapandı. MODULE-MAP SEO1-3 ✅ + F2.7 route referansları `/crew-os`'a güncellendi; DECISIONS + memory (config-redirect locale-prefix tuzağı) eklendi. Kayıtlı açık: latent canonical=`/` + `/forum` locale gap (gelecek SEO fazı). **Sıradaki adım: `discuss-phase 12` (v0.3 sonraki içerik fazı — B1 Living Flow nabız, gate'li).**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 12 (geçici ad: **B1 Living Flow nabız kapsamı** — karar-gate'li, imza-riskli) — henüz girilmedi (discuss-phase 12 numarayı/kapsamı damgalar). **Faz 11 ✅ Tamamlandı** (v0.3 URL taksonomisi/SEO — `/bunker-os`→`/crew-os` rename + kalıcı 308 redirect + namespace 5-dil + sitemap/iç link temiz). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** discuss (Faz 11 review ✅ → sıradaki `discuss-phase 12`; v0.3 sonraki içerik fazı, Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** review-phase 11 (2026-07-02) ✅ — Faz 11 kapandı: milestone karşılandı (public `/crew-os` 5-locale SSG + kalıcı 308 redirect çıplak+5-locale + namespace 5-dil senkron 0 MISSING_MESSAGE + sitemap/iç link temiz); UAT 13/13; 8 kalite ekseni (7 ✅ + 1 N/A); kaynak kod bağımsız teyit edildi; taksonomi son açık ucu kapandı; MODULE-MAP/DECISIONS/memory güncellendi. **Sahipli açıklar (record, faz-dışı):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), **alt-sayfa canonical=`/` (layout miras, latent SEO, gelecek faz)**, **`/forum` locale-prefix gap (`/en/forum`→404, gelecek faz)**, brief mobil perf (gerçek-cihaz duvarı), B1 Living Flow nabız (v0.3, ayrı gate'li faz — sıradaki), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-11.md` (✅ Tamamlandı — retrospektif + kalite kontrol yazıldı). Faz 10 ✅ `phases/PHASE-10.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — Faz 11 review tamamlandı (faz ✅). Aktif bekleyen task yok; sıradaki adım `discuss-phase 12` (v0.3 sonraki içerik fazı — B1 Living Flow nabız).
**Durum:** Faz 11 ✅ Tamamlandı → Adım **discuss** (sıradaki faz kapsam tartışması). Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** review-phase 11 (2026-07-02) ✅ — retrospektif + kalite kontrol yazıldı, faz ✅; 0 düzeltme task'ı. Sıradaki = `discuss-phase 12`.

---

## Task Durumu (Aktif Faz)

> **Faz 11 ✅ Tamamlandı** (3 task SEO1-3, hepsi archive'da) — tablo yeni faza (Faz 12, henüz girilmedi) sıfırlandı. Faz 12 task'ları `discuss-phase 12` + `plan-phase 12` sonrası oluşur. Faz 11 detayı → `phases/PHASE-11.md` + `tasks/archive/`. Faz 4–10 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Faz 12 henüz girilmedi (discuss-phase bekliyor); task yok |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 11 task özetleri sıfırlandı** (Faz 11 detayları `phases/PHASE-11.md` + `tasks/archive/`).

_(Faz 12 henüz girilmedi — task özeti yok. İlk task tamamlanınca burası dolar.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Faz 11 ✅ Tamamlandı (review + retrospektif yazıldı). Sıradaki adım **discuss-phase 12** (v0.3 sonraki içerik fazı — B1 Living Flow nabız, gate'li; yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 11 ✅ Tamamlandı — v0.3 URL taksonomisi/SEO (`/bunker-os`→`/crew-os` rename + redirect + namespace 5-dil + iç link). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `discuss-phase 12`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-02 — **review-phase 11 ✅: Faz 11 kapandı** (v0.3 URL taksonomisi/SEO). Retrospektif + 8 kalite ekseni (7 ✅ + 1 N/A güvenlik) + kullanıcı yolculuğu/boşluk PHASE-11'e yazıldı; PHASES tablosu 11→✅ + geçiş notu; MODULE-MAP SEO1-3 ✅ + F2.7/taksonomi route referansları `/crew-os`'a güncellendi; DECISIONS 2026-07-02 (redirect kararı + taksonomi son açık ucu kapandı); memory `next-config-redirect-locale-prefix` (config redirect locale-prefix tuzağı) eklendi. Kaynak kod bağımsız teyit edildi (redirect 308 çıplak+5-locale · sitemap 5× crew-os/0× bunker-os · namespace 5-dilde crew+crewOs / 0 kalan tüketici · iç link doğrudan). Kayıtlı açık: latent canonical=`/` + `/forum` locale gap (gelecek SEO fazı). Versiyon Sonu Durumu içerik_fazları (değişmez). **Sıradaki DevFlow komutu: `discuss-phase 12` (B1 Living Flow nabız, gate'li).**
