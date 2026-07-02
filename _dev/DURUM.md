# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **verify-phase 10 tamamlandı — UAT 17/17 ✅:** Faz 10 (v0.3 görsel cila) tüm senaryolar geçti (A1 logo hiza ×3 yüzey vcenter Δ=0px · A3a ok affordance dinlenme+hover · A3b scroll göstergesi 64px orantılı · guardrail'ler: Lighthouse a11y=100 + axe 0 ihlal çift-tema, i18n 5-dil parite, CLS=0, RTL/adversarial temiz). Otomatik: CI 4/4 yeşil, build+vitest 7/7, security-review 0 bulgu. Düzeltme task'ı yok → Adım **review**. Sıradaki DevFlow komutu: **`review-phase 10`** (faz review + retrospektif, yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 10 — v0.3 görsel cila (A1 logo hizalama + A3 CTA affordance & scroll göstergesi). v0.3'ün ilk fazı; saf CSS/görsel craft, imza/davranış/içerik değişmez. Kapsam damgalandı (discuss-phase 10). **Tüm task'lar (10.01–10.04) ✅ + UAT 17/17 ✅ → review (review-phase 10) bekliyor.** v0.2 tamamen ✅ (Faz 4–9 + prd-review, PRD değişikliği yok).
**Adım:** review (TASK-10.01–10.04 ✅ + verify-phase 10 UAT 17/17 ✅ → sıradaki `review-phase 10`; Versiyon Sonu Durumu = `içerik_fazları`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** verify-phase 10 (2026-07-02) ✅ — UAT 17/17 geçti (otonom + görsel onay modu). Otomatik kontroller: CI 4/4 commit yeşil (fast build+vitest + a11y axe), yerel build temiz + vitest 7/7, security-review 0 bulgu, npm audit 3 moderate (kayıtlı sahipli TB-C). Senaryolar: A1 logo hiza ×3 yüzey (vcenter Δ=0px), A3a ok affordance (dinlenme ipucu+hover animasyon, CLS=0), A3b scroll göstergesi (64px orantı, desktop-only), guardrail'ler (Lighthouse a11y=100 + axe 0 ihlal çift-tema, i18n 5-dil parite, CLS=0, RTL/adversarial temiz). Düzeltme task'ı doğuran bulgu yok. **Sahipli açıklar (record):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), brief mobil perf (gerçek-cihaz duvarı), `/bunker-os`→`/crew-os` redirect + `/forum`→404 (v0.3, ayrı faz), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-10.md` (🔄 Devam ediyor — kapsam + araştırma + task listesi + verify-plan ✅; TASK-10.01–10.04 ✅ + UAT 17/17 ✅ → review bekliyor). Faz 9 ✅ `phases/PHASE-9.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Fazda bekleyen task **yok** — TASK-10.01–10.04 tümü ✅ + UAT 17/17 ✅. Düzeltme task'ı yok. Sıradaki adım faz review (`review-phase 10`), ayrı oturumda.
**Durum:** Faz 10 (v0.3 görsel cila) 🔄 — Adım **review**. Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** verify-phase 10 (2026-07-02) ✅ — UAT 17/17 geçti; otomatik kontroller (CI 4/4 yeşil, security-review 0 bulgu) temiz; düzeltme task'ı yok. Sıradaki = `review-phase 10`.

---

## Task Durumu (Aktif Faz)

> Faz 10 (v0.3 görsel cila) 🔄 — kapsam tartışması ✅ + research ✅ + plan ✅ + verify-plan ✅; TASK-10.01–10.04 **tümü ✅** + verify-phase UAT 17/17 ✅ → review bekliyor. Faz 9 ✅ (9.01–9.09, detay `phases/PHASE-9.md`); Faz 4–8 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 10.01 | TASK-10.01 | ✅ Tamamlandı | A1 — Ortak `<Logo>` + Nav & PageHeader benimseme (optik hiza tek yerde) |
| 10.02 | TASK-10.02 | ✅ Tamamlandı | A1 — Footer `<Logo>` benimseme (size 18, non-link, koyu zemin); 10.01'e bağlı |
| 10.03 | TASK-10.03 | ✅ Tamamlandı | A3a — Hero stat CTA ok idiomu + durağan ipucu |
| 10.04 | TASK-10.04 | ✅ Tamamlandı | A3b — Hero scroll göstergesi ölçekleme (desktop-only korunur) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 9 task özetleri sıfırlandı** (Faz 9 detayları `phases/PHASE-9.md` + `tasks/archive/`).

**TASK-10.04 — A3b Hero scroll göstergesi ölçekleme** (✅ 2026-07-02)
- `Hero.tsx` (satır 146-149): merkez-alt gösterge anıtsal hero'ya orantılandı — çizgi `h-10`→`h-16` (64px), opaklık `bg-ink-faint/40`→`/60` (DPR-robustness), etiket `text-[11px]`→`text-xs` (12px), `gap-2`→`gap-3`. `w-px` crisp hairline korundu (kalın border değil).
- **Korunan:** `bottom-7 left-1/2 -translate-x-1/2 hidden md:flex` (desktop-only) + `animate-pulse` + adaptif token (`--color-ink-faint`, `dark:` YOK).
- Build ✓; home a11y 2/2 (light+dark); görsel: 64px çizgi/12px etiket · mobil `display:none` · token light↔dark flip · cluster gap 28px sabit (CLS yok, akış-dışı absolute).

**TASK-10.03 — A3a Hero stat CTA ok idiomu + durağan ipucu** (✅ 2026-07-02)
- `Hero.tsx`: iki stat `<Link>` (Alpfit/Crew OS) sonuna trailing ok span'i — `text-ink-faint transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-green`; dinlenmede soluk-görünür (durağan ipucu), hover'da yeşilleşir + 4px kayar. İki Link simetrik; RTL fiziksel-ok korundu.
- **v4 tuzağı:** `translate-x-1` `transform` değil `translate` property'sini set eder → arbitrary `transition-[transform,color]` ok'u **zıplattı**; `transition-[translate,color]`'a düzeltildi (memory: `tailwind-v4-translate-transition-property`).
- Build ✓; home a11y 2/2 (light+dark); hover slide animasyonlu (mid≈2.8px) + CLS Δ=0.00 + reduced-motion durağan-ipucu teyitli.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Fazda bekleyen task **yok** — TASK-10.01–10.04 tümü ✅ + UAT 17/17 ✅. Düzeltme task'ı yok. Sıradaki adım **review-phase 10** (faz review + retrospektif, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 10 — v0.3 görsel cila (A1 logo + A3 CTA affordance & scroll göstergesi), 🔄 Adım **review** (10.01–10.04 ✅ + UAT 17/17 ✅). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `review-phase 10`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-02 — **verify-phase 10 ✅ — UAT 17/17:** Faz 10 (v0.3 görsel cila) tüm senaryolar geçti (A1 logo hiza ×3 yüzey vcenter Δ=0px · A3a ok affordance · A3b scroll göstergesi 64px orantı · guardrail'ler Lighthouse a11y=100 + axe 0 ihlal çift-tema, i18n 5-dil parite, CLS=0, RTL/adversarial temiz). Otomatik: CI 4/4 yeşil, build+vitest 7/7, security-review 0 bulgu. Düzeltme task'ı yok → Adım **review**. Sıradaki DevFlow komutu: **`review-phase 10`** (faz review + retrospektif).
