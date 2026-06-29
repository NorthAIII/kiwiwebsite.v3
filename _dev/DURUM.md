# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-29 — run-task TASK-4.03 ✅: `--color-ink-faint` token light+dark koyulaştırıldı (K2: `#8b8d83→#67695f`, `#7d8073→#8a8c80`). build temiz + axe light+dark → `text-ink-faint` color-contrast'tan çıktı (her iki tema 0), faint hiyerarşi + yeşil imza korundu. Adım=task; sıradaki TASK-4.04.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark), ana sayfa. 🔄 Devam ediyor.
**Adım:** task → `/devflow:run-task`: sıradaki TASK-4.04 (fix sırası 4.04→4.07, sonra doğrulama 4.08). 4.01-4.03 ✅.
**İlerleme:** TASK-4.03 (`--color-ink-faint` token koyulaştırma, K2) tamamlandı — light+dark token tek-kaynaktan koyulaştırıldı, axe ile `text-ink-faint` color-contrast'tan her iki temada çıktı (0); faint craft hiyerarşisi + yeşil imza korundu. Etkilenmeyen: 4.04/K5+C9, 4.05/K3, 4.06/K4, 4.07/C2-C3. Tam envanter: arşiv `tasks/archive/TASK-4.01.md` + PHASE-4 "Re-ölçüm Teyidi".
**Son Faz Dokümanı:** `phases/PHASE-4.md` (🔄 aktif)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-4.04 — Cream-on-ink opaklık ≥%60 (K5+C9, color-contrast — Footer + Bunker). ⬜ Sıradaki fix. `run-task` ile başla.
**Durum:** 8 task: 4.01-4.03 ✅; fixler 4.04–4.07 ⬜; doğrulama 4.08 ⬜.
**İlerleme:** Adım = task; `/devflow:run-task` ile TASK-4.04'ü çalıştır (tek task, oturum sonunda kapat).

---

## Task Durumu (Aktif Faz)

> Faz 4 (v0.2 a11y) — 8 task. 4.01 re-ölçümü kapsamı **light+dark**'a genişletti (C2/C3 panel pulse-yeşili + C9 Bunker durum); plan revizyonunda dağıtıldı: C9→4.04, C2/C3→yeni 4.07, doğrulama→4.08 çift-tema. Çalıştırma sırası = numara sırası.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 4.01 | TASK-4.01 | ✅ Tamamlandı | Otoriter re-ölçüm: a11y=89 teyit; materyal sapma → light+dark kapsam genişletme |
| 4.02 | TASK-4.02 | ✅ Tamamlandı | Adım numaraları color-contrast'tan çıkar (K1: `aria-hidden`→CSS `::before`, görsel birebir) |
| 4.03 | TASK-4.03 | ✅ Tamamlandı | `--color-ink-faint` token koyulaştırma (K2, color-contrast — globals.css; axe light+dark 0 ink-faint flag) |
| 4.04 | TASK-4.04 | ⬜ Bekliyor | Cream-on-ink opaklık ≥%60 (K5+C9, color-contrast — Footer + Bunker) |
| 4.05 | TASK-4.05 | ⬜ Bekliyor | Hero `<dl>` → semantik markup (K3, definition-list + dlitem) |
| 4.06 | TASK-4.06 | ⬜ Bekliyor | Dil-switcher `aria-label` locale kodu (K4, label-content-name) |
| 4.07 | TASK-4.07 | ⬜ Bekliyor | Gym-panel pulse-yeşili dark-inversion fix (C2/C3, adaptif `--color-pulse-ink` token) |
| 4.08 | TASK-4.08 | ⬜ Bekliyor | Final doğrulama: a11y=100 **çift-tema** + perf/CLS regresyonsuz + perf taban |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-4.03 — `--color-ink-faint` token koyulaştırma (K2)** (✅ 2026-06-29)
- [globals.css:11,35](../src/app/globals.css#L11) — token tek-kaynaktan koyulaştırıldı: light `#8b8d83→#67695f` (canvas 5.16/canvas-deep 4.76), dark `#7d8073→#8a8c80` (5.38/4.92). Tüketen bileşenler değişmedi (token yayılımı, 8 `.text-ink-faint` öğesi).
- **Doğrulama:** build temiz (37 sayfa); axe 4.11.4 fresh-prod-serve (:4173, PID 122997 teyit, stray 9077 dokunulmadı) light+dark → `text-ink-faint` color-contrast ihlali **0** (her iki tema). Öğeler DOM'da mevcut + yeni renkle render (gizlenmedi, geçiyor). Kalan ihlaller başka task kapsamı (footer/Bunker `canvas/*`→4.04; dark `text-pulse`→4.07).
- **Craft (gözle, light+dark):** faint hiyerarşi korundu (ink>ink-soft>ink-faint, faint en muted); Hero etiketleri/scroll-cue/sektör eyebrow ikincil kaldı, prominent olmadı. Yeşil imza dokunulmadı.

**TASK-4.02 — Adım numaraları color-contrast'tan çıkar (K1)** (✅ 2026-06-29)
- [HowItWorks.tsx:83-89](../src/components/HowItWorks.tsx#L83-L89) — adım numarası text-node yerine CSS `::before { content: attr(data-n) }` ile render (Tailwind `before:` utility); `aria-hidden` korundu. Renk `#1f7a3d`@30% + font + hover→solid 500ms **birebir** (sıfır görsel değişim).
- **Kritik bulgu — K1 mekanizması revize (kullanıcı kararı):** planlanan `aria-hidden` color-contrast'ı **çözmüyor** — axe-core 4.11.4 (= Lighthouse 13.3.0 bundle) görsel görünürlüğü baz alır, aria-hidden öğeyi denetimden çıkarmaz (kontrollü test + canlı teyit). Görsel-koruyan fix = CSS pseudo-element. Çapraz öğrenim memory'de; **TASK-4.04/K5 ayraç planını etkiler**.
- **Doğrulama:** build temiz (37 sayfa); axe 4.11.4 fresh-prod-serve (:4173, listening-PID teyit, stray 9077 dokunulmadı) light+dark → adım numaraları color-contrast listesinden çıktı (`#how`=0); gözle faint görünüm + hover geçişi aynı.


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-4.04 (sıradaki fix; `/devflow:run-task` ile başla) — 4.01-4.03 ✅
**Aktif Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark) 🔄; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-29 — run-task TASK-4.03 ✅: `--color-ink-faint` token light+dark koyulaştırıldı (K2). build temiz + axe light+dark → `text-ink-faint` color-contrast'tan çıktı (0/0), faint hiyerarşi + yeşil imza korundu. Sıradaki: run-task (TASK-4.04).
