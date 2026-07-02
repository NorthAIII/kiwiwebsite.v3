# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **TASK-11.01 tamamlandı (run-task):** route `bunker-os/`→`crew-os/` (git mv), `next.config.ts` 2 kalıcı 308 redirect (çıplak + `/:locale(en|ar|de|es)/bunker-os`), `sitemap.ts` PATHS, a11y spec+helper path. Doğrulama ampirik: build temiz, curl 5-locale `/crew-os`→200 & `/bunker-os`→308 & `/forum`→308 regresyonsuz, sitemap 5× `/crew-os`, a11y 10/10 (5 locale×2 tema). Sıradaki adım: **`run-task`** (TASK-11.02, yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 11 — **v0.3 URL taksonomisi / SEO** (`/bunker-os`→`/crew-os`). Kapsam: route rename + kalıcı redirect (5 locale) + i18n namespace `bunkerOs`/`bunker`→crew 5-dil rename + sitemap/canonical/alternates + iç linkler temiz. `/forum`→404 reddedildi (mevcut 301 korunur); kod dosya adları iç-ad kalır. **Faz 10 ✅ Tamamlandı** (v0.3 görsel cila — A1 logo + A3a/A3b). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (TASK-11.01 ✅ → sıradaki `run-task` TASK-11.02; faz bitmedi, 2 task kaldı. Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** TASK-11.01 (2026-07-02) ✅ — route rename + kalıcı 308 redirect (çıplak + 5-locale pattern) + sitemap + a11y spec/helper path; build temiz, curl 5-locale (200/308) + `/forum` regresyonsuz, a11y 10/10. verify-plan 11 ✅ — 3 task fresh-context doğrulandı, referanslar ampirik teyitli, 0 düzeltme. plan-phase 11 ✅ — 3 task dokümanı yazıldı (11.01 route+redirect+sitemap · 11.02 namespace 5-dil atomik · 11.03 iç link; dependency 11.02+11.03→11.01). research-phase 11 ✅ — teknik araştırma PHASE-11'e yazıldı (ampirik: build+curl). Redirect=Yaklaşım A (config kalıcı 308, açık 5-locale pattern — `/en/forum`→404 kanıtı); namespace `crewOs`/`crew`; page-seviyesi canonical/generateStaticParams miras (dokunulmaz). discuss-phase 11 ✅ (kapsam: SEO1 route rename+redirect · SEO2 namespace rename · SEO3 iç link; üç karar damgalı). **Sahipli açıklar (record, faz-dışı):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), **alt-sayfa canonical=`/` (layout miras, latent SEO, gelecek faz)**, **`/forum` locale-prefix gap (`/en/forum`→404, gelecek faz)**, brief mobil perf (gerçek-cihaz duvarı), B1 Living Flow nabız (v0.3, ayrı gate'li faz), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-11.md` (🔄 Kapsam + Araştırma + Task Listesi yazıldı; verify-plan/UAT bekliyor). Faz 10 ✅ `phases/PHASE-10.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-11.02** (sıradaki, henüz çalıştırılmadı) — SEO2: i18n namespace `bunkerOs`→`crewOs` (7 tüketici) + `bunker`→`crew` (2 tüketici), 5-dil atomik (0 MISSING_MESSAGE). Bağımlı: 11.01 ✅. `run-task` ayrı oturumda.
**Durum:** Faz 11 🔄 → Adım **task** (TASK-11.01 ✅, 2 task kaldı). Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** TASK-11.01 (2026-07-02) ✅ — route rename + 308 redirect + sitemap + test path; build/curl/a11y ampirik teyitli, 0 regresyon. Sıradaki = `run-task` (TASK-11.02).

---

## Task Durumu (Aktif Faz)

> Faz 11 (v0.3 URL taksonomisi/SEO) — 3 task (SEO1-3); **TASK-11.01 ✅**, sıradaki **run-task TASK-11.02**. Faz 10 ✅ (10.01–10.04, detay `phases/PHASE-10.md`); Faz 4–9 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 11.01 | TASK-11.01 | ✅ Tamamlandı | SEO1: route `bunker-os/`→`crew-os/` + kalıcı 308 redirect (çıplak+5-locale) + sitemap + route-path test |
| 11.02 | TASK-11.02 | ⬜ Bekliyor (sıradaki) | SEO2: i18n namespace `bunkerOs`→`crewOs` + `bunker`→`crew`, 5-dil atomik (9 tüketici) |
| 11.03 | TASK-11.03 | ⬜ Bekliyor | SEO3: iç link `/bunker-os`→`/crew-os` (Hero+Bunker) — bağımlı: 11.01 |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 10 task özetleri sıfırlandı** (Faz 10 detayları `phases/PHASE-10.md` + `tasks/archive/`).

**TASK-11.01** (2026-07-02) ✅ — SEO1: `/bunker-os`→`/crew-os` route rename + redirect
- Route `git mv bunker-os→crew-os` (history korundu); `next.config.ts` 2 kalıcı 308 redirect (çıplak + `/:locale(en|ar|de|es)/bunker-os`); `sitemap.ts` PATHS; a11y spec+helper path.
- `page.tsx` içeriği + `components/bunker-os/` import + namespace `bunkerOs` dokunulmadı (iç kod adı / 11.02'nin işi).
- Doğrulama: build temiz · curl 5-locale (200/308) + `/forum` regresyonsuz · sitemap 5× `/crew-os` · a11y 10/10 (5 locale×2 tema). ⚠️ stray next-server tuzağı yaşandı (MEMORY), fresh-PID ile çözüldü.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-11.02** sıradaki (11.01 ✅). Sıradaki adım **run-task** (TASK-11.02, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 11 🔄 — v0.3 URL taksonomisi/SEO (`/bunker-os`→`/crew-os` rename + redirect + namespace 5-dil + SEO metadata + iç link). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `run-task`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-02 — **TASK-11.01 ✅ (run-task):** SEO1 route `bunker-os/`→`crew-os/` (git mv) + `next.config.ts` 2 kalıcı 308 redirect (çıplak + `/:locale(en|ar|de|es)/bunker-os`) + `sitemap.ts` PATHS + a11y spec/helper path. `page.tsx`/`components/bunker-os/`/namespace `bunkerOs` dokunulmadı (iç kod adı; 11.02'nin işi). Doğrulama ampirik: `next build` temiz · curl 5-locale `/crew-os`→200 & `/bunker-os`→308 & `/forum`→308 regresyonsuz · sitemap 5× `/crew-os` · `subpages-a11y --grep crew-os` 10/10. Stray next-server tuzağı fresh-PID ile aşıldı (MEMORY). → sıradaki DevFlow komutu: **`run-task`** (TASK-11.02).
