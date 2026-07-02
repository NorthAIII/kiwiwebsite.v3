# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **v0.2 production release tamamlandı ✅:** revize `main`'e merge edildi (PR #6, `4847431`) + canlı deploy (`a71adbc`). Deploy tuzağı: Vercel↔GitHub bağlantısı merge anında kopuktu → merge deploy tetiklemedi; yeniden bağlanıp boş tetikleyici commit ile deploy aktı (detay `docs/RELEASE-v0.2.md` Sonuç). §3 canlı duman testi curl-maddeleri ✓ (5 dil/RTL/alt sayfalar/redirect/umami HTML'de); **Umami canlı +1 panel ekran görüntüsüyle doğrulandı ✅**. **Açık takip (release engeli değil):** chatbot canlıda 503 — `ANTHROPIC_API_KEY` Vercel prod env'de yok (key eklenince çözülür). Aktif Faz **10**, Adım **task** (ilk task TASK-10.01), Aktif Versiyon **v0.3**. **v0.2 release kapandı → v0.3 run-task artık serbest.** Sıradaki DevFlow komutu: **`run-task`** (TASK-10.01, yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 10 — v0.3 görsel cila (A1 logo hizalama + A3 CTA affordance & scroll göstergesi). v0.3'ün ilk fazı; saf CSS/görsel craft, imza/davranış/içerik değişmez. Kapsam damgalandı (discuss-phase 10). v0.2 tamamen ✅ (Faz 4–9 + prd-review, PRD değişikliği yok).
**Adım:** task (verify-plan 10 tamamlandı → sıradaki DevFlow komutu `run-task`, ilk task TASK-10.01; Versiyon Sonu Durumu = `içerik_fazları`). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). v0.3 run-task artık serbest. Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** plan-phase 10 (2026-07-02) tamamlandı — 4 task dokümanı yazıldı: **10.01** A1 ortak `<Logo>` bileşeni + Nav/PageHeader benimseme (optik hiza tek yerde); **10.02** A1 Footer `<Logo>` benimseme (size 18, non-link, koyu zemin; 10.01'e bağlı); **10.03** A3a Hero iki stat Link'ine site-standart ok idiomu + durağan ipucu; **10.04** A3b Hero merkez-alt scroll göstergesi ölçekleme (desktop-only korunur). Lineer sıra. Yeni npm/i18n anahtarı yok. Her task'ta dikkat: çift-tema adaptif token (`dark:` YOK), a11y=100 çift-tema, CLS≈0, RTL fiziksel-ok tutarlılığı, focus tek-stop. **Sahipli açıklar (record):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), brief mobil perf (gerçek-cihaz duvarı), `/bunker-os`→`/crew-os` redirect + `/forum`→404 (v0.3, ayrı faz), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-10.md` (🔄 Devam ediyor — kapsam tartışması + araştırma bulguları + task listesi (4 task) yazıldı, verify-plan bekliyor). Faz 9 ✅ `phases/PHASE-9.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-10.01** (ilk task, ⬜ Bekliyor — çalıştırılmaya hazır). Faz 10 planı verify-plan'dan geçti (4 task review edildi, referanslar doğrulandı, 1 mekanik düzeltme). Task çalıştırma ayrı oturumda (`run-task`) — bu oturumda kod yazılmaz.
**Durum:** Faz 10 (v0.3 görsel cila) 🔄 — Adım task. Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.3.
**İlerleme:** verify-plan 10 (2026-07-02) tamamlandı — 4 task dokümanı (10.01–10.04) temiz context ile review edildi; tüm kod/i18n referansları gerçekle tutarlı, çakışma yok; 1 mekanik düzeltme (TASK-10.01 a11y tohumuna `subpages-a11y.spec.ts` eklendi). Sıradaki = run-task (TASK-10.01).

---

## Task Durumu (Aktif Faz)

> Faz 10 (v0.3 görsel cila) 🔄 — kapsam tartışması ✅ + research ✅ + plan ✅ + verify-plan ✅ (4 task review edildi, çalıştırmaya hazır). Faz 9 ✅ (9.01–9.09, detay `phases/PHASE-9.md`); Faz 4–8 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 10.01 | TASK-10.01 | ⬜ Bekliyor (ilk) | A1 — Ortak `<Logo>` + Nav & PageHeader benimseme (optik hiza tek yerde) |
| 10.02 | TASK-10.02 | ⬜ Bekliyor | A1 — Footer `<Logo>` benimseme (size 18, non-link, koyu zemin); 10.01'e bağlı |
| 10.03 | TASK-10.03 | ⬜ Bekliyor | A3a — Hero stat CTA ok idiomu + durağan ipucu |
| 10.04 | TASK-10.04 | ⬜ Bekliyor | A3b — Hero scroll göstergesi ölçekleme (desktop-only korunur) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 9 task özetleri sıfırlandı** (Faz 9 detayları `phases/PHASE-9.md` + `tasks/archive/`).

_Faz 10 henüz task üretmedi (plan-phase bekliyor) — ilk task tamamlanınca özet buraya gelir._

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-10.01** (ilk task, çalıştırmaya hazır) — **Faz 10 planı verify-plan'dan geçti ✅** (4 task review edildi, 1 mekanik düzeltme). Sıradaki adım **run-task** (TASK-10.01, yeni oturum). ✅ **v0.2 production release tamamlandı** (2026-07-02, canlı `a71adbc`, Umami +1 doğrulandı — `docs/RELEASE-v0.2.md`) → run-task artık serbest. Açık takip: chatbot canlı env key.
**Aktif Faz:** 10 — v0.3 görsel cila (A1 logo + A3 CTA affordance & scroll göstergesi), 🔄 Adım task. v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **içerik_fazları** → sıradaki komut `run-task`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-02 — **v0.2 production release tamamlandı ✅:** revize `main`'e merge (PR #6 `4847431`) + canlı deploy `a71adbc` (Vercel Git bağlantısı merge anında kopuktu → yeniden bağlanıp boş commit ile tetiklendi). §3 duman testi curl-maddeleri ✓, **Umami canlı +1 panel görüntüsüyle doğrulandı ✅** (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı 503 (`ANTHROPIC_API_KEY` env yok — engel değil). Aktif Faz **10** 🔄, Adım **task**; Aktif Versiyon **v0.3**. v0.2 release kapandı → sıradaki DevFlow komutu: **`run-task`** (TASK-10.01).
