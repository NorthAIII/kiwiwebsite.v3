# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **run-task TASK-14.01 ✅: S1 giriş/redirect matrisi doğrulandı** (fresh prod build + curl). 30/30 route 200 (lang+AR-rtl doğru); `/bunker-os`→`/crew-os` 308 (çıplak+5-twin), `/forum`→`/` 308 (+twin), `/forum/<slug>`→`/bulten/<slug>` 308 (+twin) — hepsi permanent, uçtan-uca 200. Kapsam-içi bug YOK; sahipli kayıt: çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale→404 (beklenen). Sıradaki adım **`run-task`** → TASK-14.02.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (TASK-14.01 ✅ tamamlandı; fazda 14.02–14.09 bekliyor → sıradaki = `run-task` TASK-14.02). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** run-task TASK-14.01 (2026-07-03) ✅ — S1 giriş/redirect matrisi fresh prod build + curl ile doğrulandı. 30/30 route 200 (TR cookie prefixsiz + EN/AR/DE/ES prefixli; lang doğru, AR rtl); `/bunker-os`→`/crew-os` 308 (çıplak+5-twin), `/forum`→`/` 308 (+twin), `/forum/<slug>`→`/bulten/<slug>` 308 (+twin) — hepsi permanent, `-L` uçtan-uca 200; `next start` kararlı (exit 144 yok), PID fresh. **Kapsam-içi bug YOK.** Sahipli kayıt: çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale→404 (beklenen). **Kayıtlı sahipli açıklar (gelecek/prd-review):** TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam + Araştırma + Task Listesi yazıldı; TASK-14.01 ✅, 14.02–14.09 bekliyor). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-14.02** (S5 + S6-render — prerender grep) — aktif, ⬜ bekliyor. Sıradaki adım **`run-task`** (yeni oturum). TASK-14.01 ✅ tamamlandı+arşivlendi.
**Durum:** Faz 14 🔄 (Kapsam + Araştırma + Task Listesi + plan review yazıldı; 14.01 ✅); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Adım = task.
**İlerleme:** run-task TASK-14.01 (2026-07-03) ✅ — S1 giriş/redirect matrisi curl ile doğrulandı; 30/30 route 200, tüm redirect'ler 308 doğru hedef, kapsam-içi bug yok. Sıradaki = `run-task` → TASK-14.02.

---

## Task Durumu (Aktif Faz)

> **Faz 14 🔄** — senaryo testi fazı; 9 task (S1–S9 → 14.01–14.09). Detay tablo + araç eşlemesi `phases/PHASE-14.md`. TASK-14.01 ✅; TASK-14.02 aktif (sıradaki `run-task`). Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 14.01 | TASK-14.01 | ✅ Tamamlandı | S1 giriş/redirect matrisi (curl; `/crew-os` public, `/bunker-os`→308, `/forum`→`/`) + kanonik prod-serve — **30/30 route 200, redirect'ler 308 doğru, bug yok** |
| 14.02 | TASK-14.02 | 🔄 Aktif (bekliyor) | S5+S6-render prerender grep ("Crew OS"/"Bunker"-yok, 0 MISSING_MESSAGE, namespace crew senkron, AR-RTL) |
| 14.03 | TASK-14.03 | ⬜ Bekliyor | S8-suite+S6-parite (Vitest 39 + `test:e2e` axe + CI) |
| 14.04 | TASK-14.04 | ⬜ Bekliyor | S8-Lighthouse a11y=100 çift-tema + Living Flow sayfa-boyu nabız perf tabanı |
| 14.05 | TASK-14.05 | ⬜ Bekliyor | S3 mod komb./sayfa-boyu nabız (system Chrome WebGL — EN BÜYÜK v0.3 delta) |
| 14.06 | TASK-14.06 | ⬜ Bekliyor | S4 kontroller & kalıcılık (tema/dil `/crew-os` path-koru/klavye) |
| 14.07 | TASK-14.07 | ⬜ Bekliyor | S2 tam TR yolculuğu (Crew OS `/crew-os` çıkış, `<Logo>`, dönüş) |
| 14.08 | TASK-14.08 | ⬜ Bekliyor | S7 chatbot 0-token (offline + sanitizasyon + malformed; API çağrısı=0) |
| 14.09 | TASK-14.09 | ⬜ Bekliyor | S9 adversarial/holistik (JS-off SSG, toggle race, scroll storm + nabız/ScrollTrigger, build temiz) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`).

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

**Aktif Task:** **TASK-14.02** 🔄 aktif (S5+S6-render prerender grep). TASK-14.01 ✅ (S1 matrisi — 30/30 route 200, redirect'ler 308 doğru, bug yok). Sıradaki adım **`run-task`** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). Planlama ✅ + plan review ✅: 9 task (build-ground-truth önce → runtime → adversarial); doğrulama fazı, kaynak değişmez. **TASK-14.01 ✅** (S1 giriş/redirect matrisi). **Faz 13 ✅** — SEO-metadata hijyeni. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `run-task` (TASK-14.02).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **run-task TASK-14.01 ✅: S1 giriş/redirect matrisi doğrulandı** (kod + doküman: kaynak DEĞİŞMEDİ, doğrulama fazı; yalnız `_dev/` — TASK-14.01 arşive, PHASE-14 Task Listesi 14.01 ✅, DURUM). Fresh prod build (37 statik sayfa) + `next start` (kararlı, PID fresh 89114) + curl: **6 sayfa × 5 locale = 30/30 route 200** (TR cookie prefixsiz + EN/AR/DE/ES prefixli; `html lang` doğru, AR `dir=rtl`); build-ground-truth ön-denetim (`routes-manifest` regex sırası + fiziksel bunker-os/forum route yok). Redirect: `/bunker-os`→`/crew-os` 308 (çıplak+5-twin), `/forum`→`/` 308 (+twin), `/forum/<slug>`→`/bulten/<slug>` 308 (+twin) — hepsi permanent, `-L` uçtan-uca doğru final URL'e 200; derin-link `/en#sectors`→200. **Kapsam-içi bug YOK.** Sahipli kayıt (beklenen, record-not-fix): çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale (`/xx`,`/en-US`,`/zz/crew-os`)→404. **Sıradaki DevFlow komutu: `run-task` (TASK-14.02, S5+S6-render).**
