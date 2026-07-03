# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **review-phase 12 ✅: Faz 12 (B1 Living Flow nabız kapsamı) tamamlandı.** Karar-gate uygula-onayla (üç gate geçti); milestone karşılandı (imza güçlendi, fallback/a11y=100 çift-tema/perf tabanı regresyonsuz); UAT 16/16; 8 kalite ekseni (7 ✅ + 1 ⚠️ test kapsamı boşluğu — fixed-backdrop full-motion invariant tohumu yok, kayıtlı); 0 düzeltme task'ı. v0.3 içerik fazları (10,11,12) tamam → **sıradaki `discuss-phase 13`** (versiyon-sonu teknik borç; içerik_fazları→teknik_borç geçişini damgalar).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 13 (geçici ad: **v0.3 versiyon-sonu teknik borç** — henüz girilmedi; discuss-phase 13 damgalar). **Faz 12 ✅** (B1 Living Flow nabız kapsamı — karar-gate uygula-onayla, üç gate geçti, UAT 16/16, 0 düzeltme). Faz 11 ✅ (v0.3 URL taksonomisi/SEO). Faz 10 ✅ (v0.3 görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** discuss (v0.3 içerik fazları (10,11,12) bitti → sıradaki `discuss-phase 13`; Versiyon Sonu Durumu = `içerik_fazları`, discuss-phase 13 `teknik_borç`'a çeker). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** review-phase 12 (2026-07-03) ✅ — Faz 12 tamamlandı; retrospektif + 8 kalite ekseni (7 ✅ + 1 ⚠️ test kapsamı boşluğu) faz dokümanına yazıldı, kullanıcı yolculuğu tutarlı. Karar-gate uygula-onayla (a11y=100 çift-tema full-motion / desktop perf 100·CLS 0 / craft light-bleed `--flow-veil` token'ıyla çözüldü); tek WebGL context (shared `useFlowMode`) + emergent adaptif veil (0 bölüm-dosyası dokunuşu). **Sahipli açıklar (record, faz-dışı):** **fixed-backdrop full-motion invariant tohumu yok (test kapsamı boşluğu, WebGL runtime flaky diye ertelendi, gelecek faz)**, non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), **alt-sayfa canonical=`/` (layout miras, latent SEO, gelecek faz)**, **`/forum` locale-prefix gap (`/en/forum`→404, gelecek faz)**, brief mobil perf (gerçek-cihaz duvarı), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-12.md` (✅ Tamamlandı — 12.01/12.02/12.03 ✅, UAT 16/16, retrospektif + kalite kontrol yazıldı). Faz 11 ✅ `phases/PHASE-11.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — (Faz 12 ✅ tamamlandı; yeni faz henüz girilmedi, task yok). Sıradaki adım **`discuss-phase 13`** (versiyon-sonu teknik borç kapsam tartışması — yeni oturum).
**Durum:** Faz 12 ✅ → Adım **discuss** (sıradaki faz). Versiyon Sonu Durumu = `içerik_fazları` (discuss-phase 13 `teknik_borç`'a çeker); Aktif Versiyon v0.3.
**İlerleme:** review-phase 12 (2026-07-03) ✅ — Faz 12 tamamlandı, milestone karşılandı, 0 düzeltme task'ı. Sıradaki = `discuss-phase 13`.

---

## Task Durumu (Aktif Faz)

> **Faz 13 henüz girilmedi** — `discuss-phase 13` kapsam tartışmasını, `plan-phase 13` task'ları oluşturur. Faz 12 ✅ detayı → `phases/PHASE-12.md` + `tasks/archive/`. Faz 4–12 ✅.

_(Aktif task yok — faz henüz planlanmadı.)_

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 12 kapandı → Faz 12 task özetleri sıfırlandı** (detaylar `phases/PHASE-12.md` + `tasks/archive/`). Faz 13'ün ilk task'ı bitince buraya eklenir.

_(Henüz yok — Faz 13 task'ları çalışılmadı.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Aktif task yok (Faz 12 ✅ kapandı; Faz 13 henüz girilmedi). Sıradaki adım **discuss-phase 13** (versiyon-sonu teknik borç, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** Sıradaki = 13 (v0.3 versiyon-sonu teknik borç, geçici ad — discuss-phase 13 damgalar). **Faz 12 ✅** — v0.3 Living Flow nabız kapsamı (B1): tek fixed viewport canvas + parallax (Yaklaşım C), karar-gate uygula-onayla; 3 task (12.01 fixed katman → 12.02 adaptif veil → 12.03 karar-gate) + UAT 16/16 + review ✅. Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `discuss-phase 13`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **review-phase 12 ✅: Faz 12 (B1 Living Flow nabız kapsamı) tamamlandı.** Karar-gate **uygula-onayla** (üç gate geçti: a11y kontrast=100 çift-tema full-motion / desktop perf 100·CLS≈0·LCP 625ms regresyonsuz / craft — light başlık bleed'i `--flow-veil` tema-flip token'ıyla çözüldü). Milestone karşılandı: nabız kapsamı uygulandı, imza güçlendi (aşağı kayan sürekli alan), reduced-motion/no-WebGL fallback + a11y=100 çift-tema + perf tabanı korundu (regresyonsuz). Mimari: tek WebGL context (shared `useFlowMode` hook = tek gerçek kaynak) + emergent adaptif veil (`FlowVeil`, 0 bölüm-dosyası dokunuşu, token-bazlı). UAT 16/16, **8 kalite ekseni (7 ✅ + 1 ⚠️ test kapsamı boşluğu** — fixed-backdrop full-motion invariant tohumu yok; WebGL runtime flaky diye bilinçle ertelendi, gelecek faz önerisi**)**, 0 düzeltme task'ı. Yeni bağımlılık/i18n anahtarı yok. v0.3 içerik fazları (10,11,12) tamam → versiyon-sonu sabit fazları gelir; Versiyon Sonu Durumu `içerik_fazları` (değişmez — discuss-phase 13 `teknik_borç`'a çeker). **Sıradaki DevFlow komutu: `discuss-phase 13`.**
