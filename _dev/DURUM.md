# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **TASK-10.03 ✅ (A3a):** Hero iki stat Link'ine site-standart trailing ok idiomu + durağan ipucu eklendi (`transition-[translate,color] group-hover:translate-x-1 group-hover:text-green`, dinlenmede `text-ink-faint`). v4 tuzağı yakalandı: `translate-x` `transform` değil `translate` property'sini set eder → `transition-[transform,color]` zıplattı, `transition-[translate,color]`'a düzeltildi (memory eklendi). Build ✓, home a11y **2/2** (light+dark), çift-tema hover slide animasyonlu + CLS Δ=0.00 + reduced-motion durağan-ipucu teyitli. Aktif Faz **10** 🔄, Adım **task** (sıradaki TASK-10.04 — A3b scroll göstergesi). Sıradaki DevFlow komutu: **`run-task`** (TASK-10.04, yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 10 — v0.3 görsel cila (A1 logo hizalama + A3 CTA affordance & scroll göstergesi). v0.3'ün ilk fazı; saf CSS/görsel craft, imza/davranış/içerik değişmez. Kapsam damgalandı (discuss-phase 10). v0.2 tamamen ✅ (Faz 4–9 + prd-review, PRD değişikliği yok).
**Adım:** task (TASK-10.03 ✅ tamamlandı → sıradaki TASK-10.04; Versiyon Sonu Durumu = `içerik_fazları`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** run-task TASK-10.03 (2026-07-02) ✅ — Hero iki stat Link'ine site-standart trailing ok idiomu + durağan ipucu (`transition-[translate,color] group-hover:translate-x-1 group-hover:text-green`, dinlenmede `text-ink-faint`, hover'da `text-green`). v4 tuzağı (`translate-x` `translate` property'sini set eder; arbitrary `transition-[transform,...]` translate'i kapsamaz) yakalanıp düzeltildi + memory'ye eklendi. build ✓, home a11y 2/2 (light+dark), hover slide animasyonlu + CLS Δ=0.00 + reduced-motion durağan-ipucu teyitli. Kalan: **10.04** A3b Hero merkez-alt scroll göstergesi ölçekleme (desktop-only korunur). Lineer sıra. Yeni npm/i18n anahtarı yok. Her task'ta dikkat: çift-tema adaptif token (`dark:` YOK), a11y=100 çift-tema, CLS≈0, RTL fiziksel-ok tutarlılığı, focus tek-stop. **Sahipli açıklar (record):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), brief mobil perf (gerçek-cihaz duvarı), `/bunker-os`→`/crew-os` redirect + `/forum`→404 (v0.3, ayrı faz), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-10.md` (🔄 Devam ediyor — kapsam + araştırma + task listesi + verify-plan ✅; TASK-10.01–10.03 ✅, 10.04 bekliyor). Faz 9 ✅ `phases/PHASE-9.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-10.04** (⬜ Bekliyor — çalıştırılmaya hazır). A3b — Hero merkez-alt scroll göstergesi (`Hero.tsx:140-143`) ölçek/konum düzeltmesi; desktop-only (`hidden md:flex`) korunur. Task çalıştırma ayrı oturumda (`run-task`).
**Durum:** Faz 10 (v0.3 görsel cila) 🔄 — Adım task. Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** run-task TASK-10.03 (2026-07-02) ✅ — Hero iki stat Link'ine ok idiomu + durağan ipucu; v4 translate/transition tuzağı yakalanıp düzeltildi (memory). build ✓, home a11y 2/2 (light+dark), hover slide animasyonlu + CLS Δ=0.00. Sıradaki = run-task (TASK-10.04).

---

## Task Durumu (Aktif Faz)

> Faz 10 (v0.3 görsel cila) 🔄 — kapsam tartışması ✅ + research ✅ + plan ✅ + verify-plan ✅; TASK-10.01–10.03 ✅, 10.04 bekliyor. Faz 9 ✅ (9.01–9.09, detay `phases/PHASE-9.md`); Faz 4–8 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 10.01 | TASK-10.01 | ✅ Tamamlandı | A1 — Ortak `<Logo>` + Nav & PageHeader benimseme (optik hiza tek yerde) |
| 10.02 | TASK-10.02 | ✅ Tamamlandı | A1 — Footer `<Logo>` benimseme (size 18, non-link, koyu zemin); 10.01'e bağlı |
| 10.03 | TASK-10.03 | ✅ Tamamlandı | A3a — Hero stat CTA ok idiomu + durağan ipucu |
| 10.04 | TASK-10.04 | ⬜ Bekliyor (sıradaki) | A3b — Hero scroll göstergesi ölçekleme (desktop-only korunur) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 9 task özetleri sıfırlandı** (Faz 9 detayları `phases/PHASE-9.md` + `tasks/archive/`).

**TASK-10.03 — A3a Hero stat CTA ok idiomu + durağan ipucu** (✅ 2026-07-02)
- `Hero.tsx`: iki stat `<Link>` (Alpfit/Crew OS) sonuna trailing ok span'i — `text-ink-faint transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-green`; dinlenmede soluk-görünür (durağan ipucu), hover'da yeşilleşir + 4px kayar. İki Link simetrik; RTL fiziksel-ok korundu.
- **v4 tuzağı:** `translate-x-1` `transform` değil `translate` property'sini set eder → arbitrary `transition-[transform,color]` ok'u **zıplattı**; `transition-[translate,color]`'a düzeltildi (memory: `tailwind-v4-translate-transition-property`).
- Build ✓; home a11y 2/2 (light+dark); hover slide animasyonlu (mid≈2.8px) + CLS Δ=0.00 + reduced-motion durağan-ipucu teyitli.

**TASK-10.02 — A1 Footer `<Logo>` benimseme** (✅ 2026-07-02)
- `Footer.tsx`: kopya-kod lockup (KiwiMark+span, satır 73-74) → `<Logo size={18} wordmarkClassName="font-medium text-canvas" />`; import KiwiMark→Logo. A1 kök nedeni tamamen kapandı (3 yüzey → tek `<Logo>`); `<Logo>`'ya değişiklik gerekmedi.
- Non-link kompozisyon korundu (link'e sarılmadı; `·`/email/sosyal akışı aynen); DOM teyidi: wordmark'ın en yakın `<a>` atası yok (iki tema).
- Build ✓; home a11y 2/2 (light+dark); çift-tema görsel hiza/okunurluk + CLS≈0 doğrulandı.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-10.04** (sıradaki, çalıştırmaya hazır) — A3b Hero merkez-alt scroll göstergesi ölçekleme (desktop-only korunur). TASK-10.03 ✅ (Hero stat ok idiomu + durağan ipucu; v4 translate/transition tuzağı düzeltildi; build ✓, home a11y 2/2, hover slide animasyonlu + CLS Δ=0.00). Sıradaki adım **run-task** (TASK-10.04, yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** 10 — v0.3 görsel cila (A1 logo + A3 CTA affordance & scroll göstergesi), 🔄 Adım task (10.01–10.03 ✅, 10.04 bekliyor). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `run-task`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-02 — **TASK-10.03 ✅ (A3a):** Hero iki stat Link'ine site-standart trailing ok idiomu + durağan ipucu (`transition-[translate,color] group-hover:translate-x-1 group-hover:text-green`, dinlenmede `text-ink-faint`). v4 tuzağı (`translate-x` `translate` property'sini set eder) yakalanıp düzeltildi + memory eklendi. Build ✓, home a11y **2/2** (light+dark), çift-tema hover slide animasyonlu + CLS Δ=0.00 + reduced-motion durağan-ipucu teyitli. Aktif Faz **10** 🔄, Adım **task** (sıradaki TASK-10.04 A3b). Sıradaki DevFlow komutu: **`run-task`** (TASK-10.04).
