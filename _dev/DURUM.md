# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **TASK-10.02 ✅ (A1):** Footer `<Logo>` benimsedi (size 18, `wordmarkClassName="font-medium text-canvas"`, non-link) — A1 kök nedeni (3 kopya lockup) tamamen kapandı, üç yüzey de (Nav/PageHeader/Footer) `<Logo>` tüketiyor. `<Logo>`'ya değişiklik gerekmedi. Build temiz, home a11y **2/2** (light+dark), çift-tema görsel hiza/okunurluk + non-link DOM teyitli, CLS≈0. Aktif Faz **10** 🔄, Adım **task** (sıradaki TASK-10.03 — A3a Hero stat CTA ok idiomu). Sıradaki DevFlow komutu: **`run-task`** (TASK-10.03, yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 10 — v0.3 görsel cila (A1 logo hizalama + A3 CTA affordance & scroll göstergesi). v0.3'ün ilk fazı; saf CSS/görsel craft, imza/davranış/içerik değişmez. Kapsam damgalandı (discuss-phase 10). v0.2 tamamen ✅ (Faz 4–9 + prd-review, PRD değişikliği yok).
**Adım:** task (TASK-10.02 ✅ tamamlandı → sıradaki TASK-10.03; Versiyon Sonu Durumu = `içerik_fazları`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** run-task TASK-10.02 (2026-07-02) ✅ — Footer `<Logo>` benimseme (size 18, non-link, `text-canvas`); A1 kök nedeni tamamen kapandı (3 yüzey → tek `<Logo>`). build ✓, home a11y 2/2 (light+dark), çift-tema görsel hiza + non-link DOM teyitli + CLS≈0. Kalan: **10.03** A3a Hero iki stat Link'ine site-standart ok idiomu + durağan ipucu; **10.04** A3b Hero merkez-alt scroll göstergesi ölçekleme (desktop-only korunur). Lineer sıra. Yeni npm/i18n anahtarı yok. Her task'ta dikkat: çift-tema adaptif token (`dark:` YOK), a11y=100 çift-tema, CLS≈0, RTL fiziksel-ok tutarlılığı, focus tek-stop. **Sahipli açıklar (record):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), brief mobil perf (gerçek-cihaz duvarı), `/bunker-os`→`/crew-os` redirect + `/forum`→404 (v0.3, ayrı faz), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-10.md` (🔄 Devam ediyor — kapsam + araştırma + task listesi + verify-plan ✅; TASK-10.01–10.02 ✅, 10.03–10.04 bekliyor). Faz 9 ✅ `phases/PHASE-9.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-10.03** (⬜ Bekliyor — çalıştırılmaya hazır). A3a — Hero iki stat Link'ine site-standart ok idiomu (`→ group-hover:translate-x-1`) + durağan ipucu. Task çalıştırma ayrı oturumda (`run-task`).
**Durum:** Faz 10 (v0.3 görsel cila) 🔄 — Adım task. Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** run-task TASK-10.02 (2026-07-02) ✅ — Footer `<Logo>` benimseme; A1 kök nedeni tamamen kapandı (3 yüzey → tek `<Logo>`). build ✓, home a11y 2/2 (light+dark), çift-tema hiza + non-link teyitli + CLS≈0. Sıradaki = run-task (TASK-10.03).

---

## Task Durumu (Aktif Faz)

> Faz 10 (v0.3 görsel cila) 🔄 — kapsam tartışması ✅ + research ✅ + plan ✅ + verify-plan ✅; TASK-10.01–10.02 ✅, 10.03–10.04 bekliyor. Faz 9 ✅ (9.01–9.09, detay `phases/PHASE-9.md`); Faz 4–8 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 10.01 | TASK-10.01 | ✅ Tamamlandı | A1 — Ortak `<Logo>` + Nav & PageHeader benimseme (optik hiza tek yerde) |
| 10.02 | TASK-10.02 | ✅ Tamamlandı | A1 — Footer `<Logo>` benimseme (size 18, non-link, koyu zemin); 10.01'e bağlı |
| 10.03 | TASK-10.03 | ⬜ Bekliyor (sıradaki) | A3a — Hero stat CTA ok idiomu + durağan ipucu |
| 10.04 | TASK-10.04 | ⬜ Bekliyor | A3b — Hero scroll göstergesi ölçekleme (desktop-only korunur) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 9 task özetleri sıfırlandı** (Faz 9 detayları `phases/PHASE-9.md` + `tasks/archive/`).

**TASK-10.02 — A1 Footer `<Logo>` benimseme** (✅ 2026-07-02)
- `Footer.tsx`: kopya-kod lockup (KiwiMark+span, satır 73-74) → `<Logo size={18} wordmarkClassName="font-medium text-canvas" />`; import KiwiMark→Logo. A1 kök nedeni tamamen kapandı (3 yüzey → tek `<Logo>`); `<Logo>`'ya değişiklik gerekmedi.
- Non-link kompozisyon korundu (link'e sarılmadı; `·`/email/sosyal akışı aynen); DOM teyidi: wordmark'ın en yakın `<a>` atası yok (iki tema).
- Build ✓; home a11y 2/2 (light+dark); çift-tema görsel hiza/okunurluk + CLS≈0 doğrulandı.

**TASK-10.01 — A1 ortak `<Logo>` + Nav & PageHeader benimseme** (✅ 2026-07-02)
- `src/components/Logo.tsx` (YENİ): mark (`text-green`) + wordmark lockup, `inline-flex items-center gap-2.5`; optik hiza tek yerde (`leading-none`, nudge gerekmedi); `size`/`className`/`wordmarkClassName` prop'ları, wordmark `currentColor` mirası.
- Nav & PageHeader kopya-kod lockup → `<Logo wordmarkClassName="text-[15px] font-semibold" />`; saran link + tek focusable korundu.
- Build ✓; a11y tohumu 52/52 (light+dark, 5 dil) regresyonsuz; çift-tema görsel hiza + CLS≈0 doğrulandı.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-10.03** (sıradaki, çalıştırmaya hazır) — A3a Hero stat CTA ok idiomu + durağan ipucu. TASK-10.02 ✅ (Footer `<Logo>`; A1 kök nedeni tamamen kapandı; build ✓, home a11y 2/2, çift-tema hiza + non-link teyitli + CLS≈0). Sıradaki adım **run-task** (TASK-10.03, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 10 — v0.3 görsel cila (A1 logo + A3 CTA affordance & scroll göstergesi), 🔄 Adım task (10.01–10.02 ✅, 10.03–10.04 bekliyor). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `run-task`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-02 — **TASK-10.02 ✅ (A1):** Footer `<Logo>` benimseme (size 18, `wordmarkClassName="font-medium text-canvas"`, non-link) — A1 kök nedeni (3 kopya lockup) tamamen kapandı, üç yüzey de `<Logo>` tüketiyor. Build ✓, home a11y **2/2** (light+dark), çift-tema görsel hiza/okunurluk + non-link DOM teyitli + CLS≈0. Aktif Faz **10** 🔄, Adım **task** (sıradaki TASK-10.03 A3a). Sıradaki DevFlow komutu: **`run-task`** (TASK-10.03).
