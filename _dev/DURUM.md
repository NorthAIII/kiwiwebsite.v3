# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **research-phase 14 ✅: teknik araştırma (senaryo testi araç eşlemesi) PHASE-14'e yazıldı.** S1–S9 → katmanlı hibrit doğrulama (build-ground-truth öncelikli + runtime yalnız kaçınılmazda). **S3 ortam riski AMPİRİK ÇÖZÜLDÜ:** bu devcontainer'da `next start` kararlı çalıştı + WebGL yalnız system Chrome'da (`channel:'chrome'`+swiftshader; bundled chromium 0 canvas) → runtime-tarayıcı+WebGL katmanı koşulabilir, build-ground-truth'a mecburi düşüş yok. Vitest 39/39 yeşil, HTTP/redirect canlı doğru, Lighthouse 12.8.2 mevcut. Sıradaki adım **`plan-phase 14`**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** plan (research-phase 14 tamamlandı — Araştırma Bulguları PHASE-14'e yazıldı; sıradaki = task yazımı). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** research-phase 14 (2026-07-03) ✅ — senaryo testi araç eşlemesi: S1–S9 → katmanlı hibrit (A build-ground-truth [curl/routes-manifest/prerender/Vitest-39] + B bundled-chromium axe a11y + C system-Chrome WebGL). **S3 ortam riski çözüldü (ampirik):** `next start` bu oturumda kararlı (Faz 13 `exit 144` görülmedi); WebGL yalnız system Chrome'da (bundled 0 canvas → `playwright-bundled-chromium-webgl-yok` birebir); `/dev/shm`=64M → `--disable-dev-shm-usage` zorunlu; Lighthouse 12.8.2 (memory 13.3.0'dan sürüm deltası — LCP-element anahtarı plan'da teyit). Vitest 39/39 + HTTP/redirect canlı doğru. **Kayıtlı sahipli açıklar (gelecek/prd-review):** TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam Tartışması + Araştırma Bulguları yazıldı; plan bekliyor). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Faz 14 (senaryo testi) araştırma tamamlandı (research-phase 14 ✅). Task listesi henüz boş → plan-phase 14'te dolar (S1–S9 araç eşlemesi → task grupları). Sıradaki adım task değil **`plan-phase 14`**.
**Durum:** Faz 14 🔄 (Kapsam Tartışması + Araştırma Bulguları yazıldı); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Adım = plan.
**İlerleme:** research-phase 14 (2026-07-03) ✅ — S1–S9 katmanlı hibrit araç eşlemesi; S3 ortam riski ampirik çözüldü (`next start` kararlı + WebGL system Chrome'da). Sıradaki = `plan-phase 14`.

---

## Task Durumu (Aktif Faz)

> **Faz 14 girildi (discuss ✅)** — senaryo testi fazı; S1–S9 kataloğu Kapsam Tartışması'nda (`phases/PHASE-14.md`). Task listesi `plan-phase 14`'te dolar. Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Faz 14 task listesi plan-phase 14'te doldurulacak (S1–S9 senaryo grupları → araç eşlemesi) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`). Faz 14'ün ilk task'ı bitince buraya eklenir.

_(Faz 14 henüz task üretmedi — senaryo testi fazı kaynak değiştirmeyebilir; ilk task/senaryo sonucu buraya eklenir.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Faz 14 🔄 (research-phase 14 ✅ — Kapsam Tartışması + Araştırma Bulguları yazıldı). Task listesi plan-phase'de dolar. Sıradaki adım **`plan-phase 14`**. Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). Araştırma ✅: S1–S9 katmanlı hibrit araç eşlemesi + S3 ortam riski ampirik çözüldü (`next start` kararlı + WebGL system Chrome'da). **Faz 13 ✅** — SEO-metadata hijyeni: TB-1 self-canonical + 5-locale hreflang (+x-default) + TB-2 `/forum`→`/` config redirect denetimi; UAT 16/16 + 8 kalite ekseni ✅. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `plan-phase 14`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **research-phase 14: senaryo testi teknik araştırması tamamlandı** (yalnız doküman: PHASE-14 Araştırma Bulguları; DURUM Adım=plan). **Araç eşlemesi:** S1–S9 → katmanlı hibrit doğrulama — A) build-ground-truth (curl + `routes-manifest` + prerender HTML + Vitest 39-tohum; deterministik/ortam-bağımsız), B) bundled-chromium `test:e2e` axe a11y (WebGL yok), C) standalone Playwright + system Chrome (`channel:'chrome'`+swiftshader; WebGL zorunlu S3/S4/S9-race) + Lighthouse 12.8.2 çift-tema. **S3 ortam riski AMPİRİK ÇÖZÜLDÜ:** `next start` bu oturumda kararlı çalıştı (Faz 13 spontane `exit 144` görülmedi), WebGL yalnız system Chrome'da (bundled chromium 0 canvas → `playwright-bundled-chromium-webgl-yok` birebir), `/dev/shm`=64M → `--disable-dev-shm-usage` zorunlu → runtime-tarayıcı+WebGL katmanı koşulabilir, build-ground-truth'a mecburi düşüş yok. Ampirik teyitler: Vitest 39/39 yeşil, HTTP/redirect canlı doğru (`/bunker-os`→308→`/crew-os`, `/forum`→308→`/`), Lighthouse 12.8.2 mevcut (memory 13.3.0'dan sürüm deltası — LCP-element anahtarı plan-phase perf task'ında teyit). Precondition tanımlayıcıları kaynak-işaretli kaydedildi (test scriptleri/tohumlar/redirect kaynakları/canonical helper repoda-tanımlı; `routes-manifest` build-çıktısı; `ANTHROPIC_API_KEY` yokluğu dış/env). **Sıradaki DevFlow komutu: `plan-phase 14`.**
