# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **run-task TASK-14.02 ✅: S5 taksonomi + S6-render doğrulandı** (TASK-14.01 build prerender grep, görünür-metin strip). "Crew OS" home×7+crew-os×5 (5 dil); "Bunker" görünür metin/URL'de 0 (yalnız `#bunker` anchor=kod-adı); yasak metafor 0; 30/30 sayfa-locale 0 MISSING_MESSAGE; AR dir=rtl+Arapça glif; namespace crew senkron; `/tr/` sızıntı 0. Kapsam-içi bug YOK; sahipli kayıt: ar/de/es 4 alt sayfa İngilizce-stale (tutarlı, kopukluk yok → prd-review B). Sıradaki adım **`run-task`** → TASK-14.03.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (TASK-14.01+14.02 ✅ tamamlandı; fazda 14.03–14.09 bekliyor → sıradaki = `run-task` TASK-14.03). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** run-task TASK-14.02 (2026-07-03) ✅ — S5 taksonomi + S6-render prerender grep (görünür-metin strip) ile doğrulandı. "Crew OS" home×7+crew-os×5 (5 dil), "Bunker" görünür metin/URL'de 0 (yalnız `#bunker` anchor=kod-adı), yasak metafor 0, sahte-online yok (Alpfit dürüst canlı gösterge meşru); 30/30 sayfa-locale 0 MISSING_MESSAGE, AR dir=rtl+Arapça glif, namespace crew 5-dil senkron, `/tr/` sızıntı 0. **Kapsam-içi bug YOK.** Sahipli kayıt: ar/de/es 4 alt sayfa (spor/vaka/2 bülten) İngilizce-stale — tutarlı, görünür kopukluk yok → prd-review B grubu. **Kayıtlı sahipli açıklar (gelecek/prd-review):** TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam + Araştırma + Task Listesi yazıldı; TASK-14.01+14.02 ✅, 14.03–14.09 bekliyor). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-14.03** (S8-suite + S6-parite — Vitest 39 + `test:e2e` axe + CI) — aktif, ⬜ bekliyor. Sıradaki adım **`run-task`** (yeni oturum). TASK-14.01+14.02 ✅ tamamlandı+arşivlendi.
**Durum:** Faz 14 🔄 (Kapsam + Araştırma + Task Listesi + plan review yazıldı; 14.01+14.02 ✅); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Adım = task.
**İlerleme:** run-task TASK-14.02 (2026-07-03) ✅ — S5 taksonomi + S6-render prerender grep ile doğrulandı; "Crew OS" 5 dil var, "Bunker" görünür 0, 30/30 0 MISSING_MESSAGE, AR-RTL, kapsam-içi bug yok. Sıradaki = `run-task` → TASK-14.03.

---

## Task Durumu (Aktif Faz)

> **Faz 14 🔄** — senaryo testi fazı; 9 task (S1–S9 → 14.01–14.09). Detay tablo + araç eşlemesi `phases/PHASE-14.md`. TASK-14.01+14.02 ✅; TASK-14.03 aktif (sıradaki `run-task`). Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 14.01 | TASK-14.01 | ✅ Tamamlandı | S1 giriş/redirect matrisi (curl; `/crew-os` public, `/bunker-os`→308, `/forum`→`/`) + kanonik prod-serve — **30/30 route 200, redirect'ler 308 doğru, bug yok** |
| 14.02 | TASK-14.02 | ✅ Tamamlandı | S5+S6-render prerender grep — **"Crew OS" 5 dil var, "Bunker" görünür 0 (yalnız `#bunker` kod-adı), 0 MISSING_MESSAGE, namespace crew senkron, AR-RTL, bug yok; ar/de/es 4 alt sayfa İngilizce-stale (record-not-fix)** |
| 14.03 | TASK-14.03 | 🔄 Aktif (bekliyor) | S8-suite+S6-parite (Vitest 39 + `test:e2e` axe + CI) |
| 14.04 | TASK-14.04 | ⬜ Bekliyor | S8-Lighthouse a11y=100 çift-tema + Living Flow sayfa-boyu nabız perf tabanı |
| 14.05 | TASK-14.05 | ⬜ Bekliyor | S3 mod komb./sayfa-boyu nabız (system Chrome WebGL — EN BÜYÜK v0.3 delta) |
| 14.06 | TASK-14.06 | ⬜ Bekliyor | S4 kontroller & kalıcılık (tema/dil `/crew-os` path-koru/klavye) |
| 14.07 | TASK-14.07 | ⬜ Bekliyor | S2 tam TR yolculuğu (Crew OS `/crew-os` çıkış, `<Logo>`, dönüş) |
| 14.08 | TASK-14.08 | ⬜ Bekliyor | S7 chatbot 0-token (offline + sanitizasyon + malformed; API çağrısı=0) |
| 14.09 | TASK-14.09 | ⬜ Bekliyor | S9 adversarial/holistik (JS-off SSG, toggle race, scroll storm + nabız/ScrollTrigger, build temiz) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`).

**TASK-14.02 — S5 taksonomi + S6-render bütünlük** ✅ (2026-07-03)
- Prerender görünür-metin grep (30 sayfa-locale): "Crew OS" home×7+crew-os×5 (5 dil) var; "Bunker" görünür metin/URL'de **0** (yalnız `#bunker` anchor=kod-adı); yasak metafor **0**; sahte-online yok (Alpfit dürüst canlı gösterge meşru).
- non-TR bütünlük: 30/30 **0 MISSING_MESSAGE**, AR 6 sayfa `dir=rtl`+Arapça glif, namespace crew 5-dil senkron, `/tr/` iç-link sızıntı **0**.
- **Kapsam-içi bug YOK**; sahipli kayıt: ar/de/es 4 alt sayfa (spor/vaka/2 bülten) İngilizce-stale — tutarlı, görünür kopukluk yok → prd-review B grubu (record-not-fix). Kaynak kod değişmedi.

**TASK-14.01 — S1 giriş/yönlendirme matrisi** ✅ (2026-07-03)
- Fresh prod build (37 statik sayfa) + `next start` (kararlı, PID fresh) + curl → 6 sayfa × 5 locale = **30/30 route 200**; `html lang` doğru (tr/en/ar/de/es), AR `dir=rtl`.
- Redirect katmanı birebir: `/bunker-os`→`/crew-os` 308 (çıplak+5-twin), `/forum`→`/` 308 (+twin), `/forum/<slug>`→`/bulten/<slug>` 308 (+twin); hepsi permanent, `-L` uçtan-uca 200'e çözüldü.
- **Kapsam-içi bug YOK**; sahipli kayıt (beklenen): çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale→404. Kaynak kod değişmedi (doğrulama fazı).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-14.03** 🔄 aktif (S8-suite + S6-parite — Vitest 39 + `test:e2e` axe + CI). TASK-14.02 ✅ (S5 taksonomi + S6-render — Crew OS 5 dil, Bunker görünür 0, 0 MISSING_MESSAGE, bug yok). TASK-14.01 ✅ (S1 matrisi 30/30 200). Sıradaki adım **`run-task`** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). Planlama ✅ + plan review ✅: 9 task (build-ground-truth önce → runtime → adversarial); doğrulama fazı, kaynak değişmez. **TASK-14.01 ✅** (S1 giriş/redirect matrisi) · **TASK-14.02 ✅** (S5 taksonomi + S6-render). **Faz 13 ✅** — SEO-metadata hijyeni. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `run-task` (TASK-14.03).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **run-task TASK-14.02 ✅: S5 taksonomi + S6-render bütünlük doğrulandı** (kod + doküman: kaynak DEĞİŞMEDİ, doğrulama fazı; yalnız `_dev/` — TASK-14.02 arşive, PHASE-14 Task Listesi 14.02 ✅ + bulgu notu, DURUM). TASK-14.01 build prerender (30 sayfa-locale, BUILD_ID `Im6OiYfj`) üzerinde Python görünür-metin grep (script/style strip → text node): **S5** "Crew OS" home×7+crew-os×5 (5 dil), "Bunker" görünür metin/URL'de **0** (yalnız `#bunker` anchor=kod-adı; eski `/bunker-os` href 0), yasak metafor **0**, sahte-online yok (Alpfit dürüst canlı gösterge meşru, DECISIONS 2026-06-28); **S6-render** 30/30 sayfa-locale **0 MISSING_MESSAGE**, AR 6 sayfa `dir=rtl`+`lang=ar`+Arapça glif (mojibake yok), namespace `bunker`→`crew` 5-dil senkron, `/tr/` iç-link sızıntı **0**. **Kapsam-içi bug YOK.** Sahipli kayıt (record-not-fix, versiyon-sınırı → prd-review B): ar/de/es 4 alt sayfa (spor/vaka/2 bülten) İngilizce-stale — çevrilmiş chrome + tutarlı İngilizce gövde, görünür kopukluk yok (Faz 9 emsali korunur). **Sıradaki DevFlow komutu: `run-task` (TASK-14.03, S8-suite + S6-parite).**
