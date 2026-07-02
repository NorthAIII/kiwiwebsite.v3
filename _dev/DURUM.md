# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **TASK-11.03 tamamlandı (run-task):** iç link `/bunker-os`→`/crew-os` (Hero:115 + Bunker:41); çift-redirect kaldırıldı (doğrudan hedef). `page.tsx` import path (component dizini) dokunulmadı. Doğrulama ampirik: grep 0 iç link, `next build` temiz + 0 MISSING_MESSAGE, prerender TR 2× `/crew-os` + EN 2× `/en/crew-os`. **Faz 11'in tüm task'ları (11.01/11.02/11.03) ✅ — sıradaki adım: `verify-phase 11` (UAT, yeni oturum).**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 11 — **v0.3 URL taksonomisi / SEO** (`/bunker-os`→`/crew-os`). Kapsam: route rename + kalıcı redirect (5 locale) + i18n namespace `bunkerOs`/`bunker`→crew 5-dil rename + sitemap/canonical/alternates + iç linkler temiz. `/forum`→404 reddedildi (mevcut 301 korunur); kod dosya adları iç-ad kalır. **Faz 10 ✅ Tamamlandı** (v0.3 görsel cila — A1 logo + A3a/A3b). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** verify (TASK-11.03 ✅ → **fazın tüm task'ları tamamlandı**; sıradaki `verify-phase 11` UAT. Versiyon Sonu Durumu = `içerik_fazları`, değişmez). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** TASK-11.03 (2026-07-02) ✅ — iç link `/bunker-os`→`/crew-os` (Hero:115 + Bunker:41); çift-redirect kaldırıldı; grep 0 iç link, build temiz + 0 MISSING_MESSAGE, prerender TR 2× `/crew-os` + EN 2× `/en/crew-os`. TASK-11.02 (2026-07-02) ✅ — i18n namespace `bunkerOs`→`crewOs` (7 tüketici) + `bunker`→`crew` (2 tüketici) 5-dil atomik; grep 0 kalan, i18n-parite 5/5, build temiz + 0 MISSING_MESSAGE, a11y 10/10. TASK-11.01 (2026-07-02) ✅ — route rename + kalıcı 308 redirect (çıplak + 5-locale pattern) + sitemap + a11y spec/helper path; build temiz, curl 5-locale (200/308) + `/forum` regresyonsuz, a11y 10/10. verify-plan 11 ✅ — 3 task fresh-context doğrulandı, 0 düzeltme. plan-phase 11 ✅ — 3 task dokümanı yazıldı. research-phase 11 ✅ (Redirect=Yaklaşım A config kalıcı 308; namespace `crewOs`/`crew`). discuss-phase 11 ✅ (SEO1 route+redirect · SEO2 namespace · SEO3 iç link). **Sahipli açıklar (record, faz-dışı):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), **alt-sayfa canonical=`/` (layout miras, latent SEO, gelecek faz)**, **`/forum` locale-prefix gap (`/en/forum`→404, gelecek faz)**, brief mobil perf (gerçek-cihaz duvarı), B1 Living Flow nabız (v0.3, ayrı gate'li faz), site-geneli logical-ok (RTL, ayrı iş), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
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

**Task:** — Faz 11'in tüm task'ları tamamlandı (11.01/11.02/11.03 ✅). Aktif bekleyen task yok; sıradaki adım `verify-phase 11` (UAT).
**Durum:** Faz 11 🔄 → Adım **verify** (tüm tasklar ✅). Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** TASK-11.03 (2026-07-02) ✅ — iç link `/bunker-os`→`/crew-os` (Hero:115 + Bunker:41); çift-redirect kaldırıldı; grep 0 iç link, build temiz, prerender TR 2× `/crew-os` + EN 2× `/en/crew-os`. Sıradaki = `verify-phase 11`.

---

## Task Durumu (Aktif Faz)

> Faz 11 (v0.3 URL taksonomisi/SEO) — 3 task (SEO1-3); **TASK-11.01 ✅, TASK-11.02 ✅, TASK-11.03 ✅ — tüm tasklar tamam**, sıradaki **verify-phase 11**. Faz 10 ✅ (10.01–10.04, detay `phases/PHASE-10.md`); Faz 4–9 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 11.01 | TASK-11.01 | ✅ Tamamlandı | SEO1: route `bunker-os/`→`crew-os/` + kalıcı 308 redirect (çıplak+5-locale) + sitemap + route-path test |
| 11.02 | TASK-11.02 | ✅ Tamamlandı | SEO2: i18n namespace `bunkerOs`→`crewOs` (7 tüketici) + `bunker`→`crew` (2 tüketici), 5-dil atomik (0 MISSING_MESSAGE) |
| 11.03 | TASK-11.03 | ✅ Tamamlandı | SEO3: iç link `/bunker-os`→`/crew-os` (Hero+Bunker; çift-redirect kaldırıldı — doğrudan hedef) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 10 task özetleri sıfırlandı** (Faz 10 detayları `phases/PHASE-10.md` + `tasks/archive/`).

**TASK-11.03** (2026-07-02) ✅ — SEO3: iç link `/bunker-os`→`/crew-os` (çift-redirect kaldırıldı)
- `Hero.tsx:115` + `Bunker.tsx:41` `href="/bunker-os"` → `href="/crew-os"`; link doğrudan hedefe (`/bunker-os`→308 hop yok).
- `page.tsx:7` import path (`components/bunker-os/`) dokunulmadı — link değil, component dizini (iç kod adı).
- Doğrulama: grep 0 iç link · `next build` temiz + 0 MISSING_MESSAGE · prerender TR 2× `/crew-os` + EN 2× `/en/crew-os` (next-intl prefix) · a11y regresyonsuz (yalnız href değeri değişti).

**TASK-11.02** (2026-07-02) ✅ — SEO2: i18n namespace `bunkerOs`→`crewOs` + `bunker`→`crew` (5-dil atomik)
- 5 JSON top-level anahtar (`bunkerOs`@152→`crewOs`, `bunker`@131→`crew`; 2-boşluk ankraj → `nav.bunker` etkilenmez) + 9 tüketici (7 crewOs + 2 crew) tek commit'te.
- Değerler dokunulmadı (TR tek kaynak); `nav.bunker` label / `id="bunker"` / `href="#bunker"` / `@keyframes bunkerback` / component dosya adları korundu.
- Doğrulama: grep 0 kalan referans · i18n-parite 5/5 · `next build` temiz + 0 MISSING_MESSAGE (5-locale SSG) · prerender HTML boşluksuz · a11y 10/10 (5 locale×2 tema).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Faz 11'in tüm task'ları ✅ (11.01/11.02/11.03). Sıradaki adım **verify-phase 11** (UAT, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 11 🔄 — v0.3 URL taksonomisi/SEO (`/bunker-os`→`/crew-os` rename + redirect + namespace 5-dil + SEO metadata + iç link). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `run-task`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-02 — **TASK-11.03 ✅ (run-task):** SEO3 iç link temizliği — `Hero.tsx:115` + `Bunker.tsx:41` `href="/bunker-os"` → `href="/crew-os"`; çift-redirect kaldırıldı (link doğrudan hedefe, 308 hop yok). `page.tsx:7` import path (component dizini, iç kod adı) dokunulmadı. Doğrulama ampirik: grep 0 iç link (yalnız import path kaldı) · `next build` temiz + 0 `MISSING_MESSAGE` · prerender ground-truth TR `tr.html` 2× `href="/crew-os"` + EN `en.html` 2× `href="/en/crew-os"` (next-intl prefix) · a11y regresyonsuz (yalnız href değeri). **Faz 11'in tüm task'ları (11.01/11.02/11.03) ✅ → sıradaki DevFlow komutu: `verify-phase 11` (UAT).**
