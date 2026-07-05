# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-05 — **run-task TASK-14.05 ✅: S3 Living Flow sayfa-boyu nabız degradasyonu (EN BÜYÜK v0.3 delta) doğrulandı.** system Chrome+WebGL2 (ayırt-edici), 9/9 PASS, kapsam-içi bug YOK. high/desktop → pageLevel canvas=1 (FlowBackdrop fixed, tek WebGL context) + FOUC yok light&dark; reduced-motion → canvas=0 scroll öncesi+sonrası (nabız **tüm sayfa** düşer, sızıntı yok); no-WebGL → static; **mobil-low → pageLevel=0 (hero-contained) → nabız desktop-only korundu**; AR-RTL×dark×reduced çakışmadı; 320/768/1440 → overflowX=0 + CLS=0.0000; craft: `--flow-veil` (light 70%/dark 56%) hero-ötesi metni kazandırıyor. Kaynak değişmedi. Sıradaki adım **`run-task`** → TASK-14.06.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (TASK-14.01→14.05 ✅ tamamlandı; fazda 14.06–14.09 bekliyor → sıradaki = `run-task` TASK-14.06). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** run-task TASK-14.05 (2026-07-05) ✅ — S3 Living Flow **sayfa-boyu nabız** degradasyonu (EN BÜYÜK v0.3 delta) system Chrome+WebGL2 ile doğrulandı. **WebGL2=true (ayırt-edici, bundled değil); 9/9 senaryo PASS, kapsam-içi bug YOK.** high/desktop → **pageLevel canvas=1** (FlowBackdrop `position:fixed`, Hero high'da canvas render etmez → tek WebGL context) + FOUC yok light&dark (pre-paint script → early===final); reduced-motion → **canvas=0 scroll öncesi ve %60-scroll sonrası** (nabız **tüm sayfa** StaticFlow'a düşer, sızıntı yok — v0.3-kritik); no-WebGL (getContext shim) → static; **mobil-low (390) → pageLevel=0, heroCanvas=1** (hero-contained low) → sayfa-boyu nabız mobile taşmıyor (Faz 12 desktop-home-only korundu); AR-RTL×dark×reduced → rtl+dark+static+lang=ar çakışmadı; 320/768/1440 → **overflowX=0px + CLS=0.0000**; craft (light+dark scroll-screenshot): `--flow-veil` (light 70%/dark 56%) hero-ötesi metni kazandırıyor, nabız breathing-zone'da görünür. Kaynak değişmedi (harness scratchpad, commit'lenmez). **Kayıtlı sahipli açıklar (gelecek/prd-review):** TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam + Araştırma + Task Listesi yazıldı; TASK-14.01→14.05 ✅, 14.06–14.09 bekliyor). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-14.06** (S4 kontroller & kalıcılık — tema/dil `/crew-os` path-koru/klavye; system Chrome) — aktif, ⬜ bekliyor. Sıradaki adım **`run-task`** (yeni oturum). TASK-14.01→14.05 ✅ tamamlandı+arşivlendi.
**Durum:** Faz 14 🔄 (Kapsam + Araştırma + Task Listesi + plan review yazıldı; 14.01→14.05 ✅); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Adım = task.
**İlerleme:** run-task TASK-14.05 (2026-07-05) ✅ — S3 sayfa-boyu nabız degradasyonu (EN BÜYÜK v0.3 delta) system Chrome+WebGL2: 9/9 PASS, kapsam-içi bug yok. high→pageLevel canvas=1+FOUC yok; reduced→canvas=0 tüm sayfa; no-WebGL→static; mobil-low→pageLevel=0 (nabız desktop-only); AR-RTL×dark×reduced ok; overflowX=0+CLS=0; craft veil ok. Kaynak değişmedi. Sıradaki = `run-task` → TASK-14.06.

---

## Task Durumu (Aktif Faz)

> **Faz 14 🔄** — senaryo testi fazı; 9 task (S1–S9 → 14.01–14.09). Detay tablo + araç eşlemesi `phases/PHASE-14.md`. TASK-14.01→14.05 ✅; TASK-14.06 aktif (sıradaki `run-task`). Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 14.01 | TASK-14.01 | ✅ Tamamlandı | S1 giriş/redirect matrisi (curl; `/crew-os` public, `/bunker-os`→308, `/forum`→`/`) + kanonik prod-serve — **30/30 route 200, redirect'ler 308 doğru, bug yok** |
| 14.02 | TASK-14.02 | ✅ Tamamlandı | S5+S6-render prerender grep — **"Crew OS" 5 dil var, "Bunker" görünür 0 (yalnız `#bunker` kod-adı), 0 MISSING_MESSAGE, namespace crew senkron, AR-RTL, bug yok; ar/de/es 4 alt sayfa İngilizce-stale (record-not-fix)** |
| 14.03 | TASK-14.03 | ✅ Tamamlandı | S8-suite+S6-parite — **Vitest 39/39 + `test:e2e` 52 passed (WCAG-AA 0 ihlal) + CI fast+a11y success; kapsam-içi bug yok** |
| 14.04 | TASK-14.04 | ✅ Tamamlandı | S8-Lighthouse a11y=100 çift-tema + Living Flow perf tabanı — **LH dark 6/6 a11y=100 + axe light+dark 12/12 koşu 0 ihlal; masaüstü perf 100/LCP 624ms/CLS 0 Faz-12 birebir; mobil LCP ~3010ms ≤ taban regresyonsuz; bug yok** |
| 14.05 | TASK-14.05 | ✅ Tamamlandı | S3 mod komb./sayfa-boyu nabız (system Chrome WebGL2 — EN BÜYÜK v0.3 delta) — **9/9 PASS, bug YOK; high→pageLevel canvas=1+FOUC yok; reduced→canvas=0 tüm sayfa; no-WebGL→static; mobil-low→pageLevel=0 (nabız desktop-only); AR-RTL×dark×reduced ok; overflowX=0+CLS=0; craft veil ok** |
| 14.06 | TASK-14.06 | 🔄 Aktif (bekliyor) | S4 kontroller & kalıcılık (tema/dil `/crew-os` path-koru/klavye) |
| 14.07 | TASK-14.07 | ⬜ Bekliyor | S2 tam TR yolculuğu (Crew OS `/crew-os` çıkış, `<Logo>`, dönüş) |
| 14.08 | TASK-14.08 | ⬜ Bekliyor | S7 chatbot 0-token (offline + sanitizasyon + malformed; API çağrısı=0) |
| 14.09 | TASK-14.09 | ⬜ Bekliyor | S9 adversarial/holistik (JS-off SSG, toggle race, scroll storm + nabız/ScrollTrigger, build temiz) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`).

**TASK-14.05 — S3 Living Flow sayfa-boyu nabız degradasyonu (EN BÜYÜK v0.3 delta)** ✅ (2026-07-05)
- **9/9 senaryo PASS, kapsam-içi bug YOK** (system Chrome `channel:'chrome'`+swiftshader, WebGL2=true → ayırt-edici, bundled değil): high/desktop → **pageLevel canvas=1** (FlowBackdrop `position:fixed`, Hero high'da canvas render etmez → tek WebGL context) + FOUC yok light&dark (pre-paint script → early===final); **reduced-motion → canvas=0 scroll öncesi+sonrası** (nabız **tüm sayfa** düşer, sızıntı yok — v0.3-kritik); no-WebGL → static; **mobil-low (390) → pageLevel=0, heroCanvas=1** (nabız desktop-only korundu, Faz 12); AR-RTL×dark×reduced → rtl+dark+static+lang=ar çakışmadı; 320/768/1440 → **overflowX=0px + CLS=0.0000**.
- **Craft (görsel son hakem):** light+dark scroll-screenshot → hero-ötesi HowItWorks+SectorSolutions metni net/okunabilir; `--flow-veil` (light 70%/dark 56%) washi metni her zaman kazandırıyor (light-bleed yok), yeşil nabız breathing-zone'da görünür → sayfa-boyu nabız imzası + veil okunabilirlik çözümü çalışıyor.
- **Kaynak değişmedi** (doğrulama fazı, harness scratchpad commit'lenmez). N/A sahipli: alt sayfa nabzı desktop-home-only (kapsam-dışı, regresyonsuz); perf/TBT software-GL env-anomali (kıyaslanmadı, 14.04 emsali).

**TASK-14.04 — S8-Lighthouse a11y=100 çift-tema + Living Flow perf tabanı** ✅ (2026-07-05)
- **a11y=100 çift-tema mühürlü:** LH dark kanonik 6 sayfa → **6/6 a11y=100** (0 düşen structural audit; `landmark-one-main`/`heading-order`/`color-contrast`/`list`/`document-title`/`html-has-lang` pass, bülten `<main>` korunuyor) + standalone axe light+dark 6 sayfa × 2 tema = **12/12 koşu 0 LH-ilgili ihlal** (0 tema-uyumsuzluk; color-contrast çift-temada temiz).
- **Living Flow perf tabanı korundu:** masaüstü full-motion **perf 100/100/100, LCP 624ms (median), CLS 0** = Faz 12 kanonik birebir (nabız imzası regresyonsuz); mobil **LCP ~3010ms ≤ korunan taban 3164-3171ms, CLS 0** (Lantern-deterministik regresyonsuz). perf 66/TBT ~2000ms software-GL env-anomali (kıyaslanmadı).
- **Kapsam-içi bug YOK**, kaynak değişmedi (9.04 emsali — yeni artefakt yok, kayıt `docs/perf/README.md` v0.3/Faz 14). İki-gate kapandı (14.03 axe + 14.04 LH structural). Sahipli: brief mobil perf açığı → prd-review B.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-14.06** 🔄 aktif (S4 kontroller & kalıcılık — tema/dil `/crew-os` path-koru/klavye; system Chrome). TASK-14.05 ✅ (S3 sayfa-boyu nabız — system Chrome WebGL2, 9/9 PASS, bug yok: high→pageLevel canvas=1+FOUC yok; reduced→canvas=0 tüm sayfa; mobil-low→pageLevel=0 nabız desktop-only; overflowX=0+CLS=0; craft veil ok). TASK-14.04 ✅ (S8-Lighthouse — LH dark 6/6 a11y=100 + axe 12/12, masaüstü perf 100/LCP 624ms/CLS 0 Faz-12 birebir). Sıradaki adım **`run-task`** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). Planlama ✅ + plan review ✅: 9 task (build-ground-truth önce → runtime → adversarial); doğrulama fazı, kaynak değişmez. **TASK-14.01 ✅** (S1 giriş/redirect matrisi) · **TASK-14.02 ✅** (S5 taksonomi + S6-render) · **TASK-14.03 ✅** (S8-suite + S6-parite) · **TASK-14.04 ✅** (S8-Lighthouse çift-tema a11y=100 + perf tabanı) · **TASK-14.05 ✅** (S3 sayfa-boyu nabız degradasyonu — EN BÜYÜK v0.3 delta, 9/9 PASS). **Faz 13 ✅** — SEO-metadata hijyeni. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `run-task` (TASK-14.06).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-05 — **run-task TASK-14.05 ✅: S3 Living Flow sayfa-boyu nabız degradasyonu (EN BÜYÜK v0.3 delta) doğrulandı** (kaynak DEĞİŞMEDİ, doğrulama fazı; yalnız `_dev/` — TASK-14.05 arşive, PHASE-14 Task Listesi 14.05 ✅ + bulgu notu, DURUM). Taze prod (`rm -rf .next && next build` temiz → `next start -p 3000`, Ready 506ms, listening-PID 15275 teyit — stray yok; loadavg ~1.1 düşük) + standalone Playwright `chromium.launch({channel:'chrome', args:['--enable-unsafe-swiftshader','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader',...]})`. **WebGL2=true (ayırt-edici, bundled değil). 9/9 senaryo PASS, kapsam-içi bug YOK.** high/desktop → **pageLevel canvas=1** (FlowBackdrop `position:fixed`; Hero `LivingFlow` high'da canvas render etmez → tek WebGL context) + FOUC yok light&dark (pre-paint inline script → early===final); **reduced-motion → canvas=0 scroll öncesi ve %60-scroll sonrası** (nabız **tüm sayfa** StaticFlow'a düşer, hero-ötesi sızıntı yok — v0.3-kritik); no-WebGL (getContext shim) → canvas=0 static; **mobil-low (390) → pageLevel=0, heroCanvas=1** (hero-contained low → sayfa-boyu nabız mobile taşmıyor, Faz 12 desktop-home-only korundu); AR-RTL×dark×reduced → dir=rtl+dark+static+lang=ar üçü çakışmadı; 320/768/1440 → **overflowX=0px + CLS=0.0000** (scroll-storm sonrası). **Craft (görsel son hakem, light+dark scroll-screenshot):** hero-ötesi HowItWorks+SectorSolutions metni net/okunabilir, `--flow-veil` (light 70%/dark 56%) washi metni her zaman kazandırıyor (light-bleed yok), yeşil nabız breathing-zone'da görünür → sayfa-boyu nabız imzası + veil okunabilirlik çözümü çalışıyor. Harness scratchpad (commit'lenmez). N/A sahipli: alt sayfa nabzı desktop-home-only (kapsam-dışı, regresyonsuz); perf/TBT software-GL env-anomali (kıyaslanmadı, 14.04 emsali). **Sıradaki DevFlow komutu: `run-task` (TASK-14.06, S4 kontroller & kalıcılık).**
