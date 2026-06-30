# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — run-task TASK-4.05 ✅: Hero stats `<dl>`/`<dt>`/`<dd>` → `<div>`+`<span class="block">` (data-hero korundu, görünüm birebir). axe light+dark: definition-list 0 / dlitem 0 (kapandı); dark kalan 4 yalnız text-pulse (TASK-4.07). Adım=task; sıradaki TASK-4.06.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark), ana sayfa. 🔄 Devam ediyor.
**Adım:** task → `/devflow:run-task`: sıradaki TASK-4.06 (fix sırası 4.06→4.07, sonra doğrulama 4.08). 4.01-4.05 ✅.
**İlerleme:** TASK-4.05 (Hero `<dl>` → semantik link markup, K3) tamamlandı — `<dl data-hero="stats">`+`<dt>`/`<dd>` → `<div>`+`<span class="block">` (data-hero korundu → GSAP selector sağlam; class'lar birebir → sıfır görsel değişim). axe light+dark: `definition-list` 0 / `dlitem` 0 (tümden kapandı); dark kalan 4 yalnız `text-pulse` (4.07 kapsamı C2/C3). Görsel craft + AR RTL (0 MISSING_MESSAGE) teyit. Etkilenmeyen: 4.06/K4, 4.07/C2-C3. Tam envanter: arşiv `tasks/archive/TASK-4.01.md` + PHASE-4 "Re-ölçüm Teyidi".
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

**Task:** TASK-4.06 — Dil-switcher `aria-label`'a locale kodu (K4, label-content-name-mismatch). ⬜ Sıradaki fix. `run-task` ile başla.
**Durum:** 8 task: 4.01-4.05 ✅; fixler 4.06–4.07 ⬜; doğrulama 4.08 ⬜.
**İlerleme:** Adım = task; `/devflow:run-task` ile TASK-4.06'yı çalıştır (tek task, oturum sonunda kapat).

---

## Task Durumu (Aktif Faz)

> Faz 4 (v0.2 a11y) — 8 task. 4.01 re-ölçümü kapsamı **light+dark**'a genişletti (C2/C3 panel pulse-yeşili + C9 Bunker durum); plan revizyonunda dağıtıldı: C9→4.04, C2/C3→yeni 4.07, doğrulama→4.08 çift-tema. Çalıştırma sırası = numara sırası.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 4.01 | TASK-4.01 | ✅ Tamamlandı | Otoriter re-ölçüm: a11y=89 teyit; materyal sapma → light+dark kapsam genişletme |
| 4.02 | TASK-4.02 | ✅ Tamamlandı | Adım numaraları color-contrast'tan çıkar (K1: `aria-hidden`→CSS `::before`, görsel birebir) |
| 4.03 | TASK-4.03 | ✅ Tamamlandı | `--color-ink-faint` token koyulaştırma (K2, color-contrast — globals.css; axe light+dark 0 ink-faint flag) |
| 4.04 | TASK-4.04 | ✅ Tamamlandı | Cream-on-ink opaklık (K5+C9+C10 — Footer /60, Bunker status /60, metrik /70; ayraçlar aria-hidden) |
| 4.05 | TASK-4.05 | ✅ Tamamlandı | Hero `<dl>` → semantik link markup (K3; dl/dt/dd→div/span.block; axe light+dark definition-list 0 + dlitem 0) |
| 4.06 | TASK-4.06 | ⬜ Bekliyor | Dil-switcher `aria-label` locale kodu (K4, label-content-name) |
| 4.07 | TASK-4.07 | ⬜ Bekliyor | Gym-panel pulse-yeşili dark-inversion fix (C2/C3, adaptif `--color-pulse-ink` token) |
| 4.08 | TASK-4.08 | ⬜ Bekliyor | Final doğrulama: a11y=100 **çift-tema** + perf/CLS regresyonsuz + perf taban |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-4.05 — Hero `<dl>` → semantik link markup (K3)** (✅ 2026-06-30)
- [Hero.tsx:86-136](../src/components/Hero.tsx#L86) — `<dl data-hero="stats">`+`<dt>`/`<dd>` (×2 Link) → `<div>`+`<span class="block">`; `data-hero="stats"` `<div>`'e taşındı (GSAP giriş selector'ı sağlam); class'lar birebir → sıfır görsel değişim. Öğeler etiketli linkler (Alpfit/Crew OS), tanım listesi değil.
- **Doğrulama:** build temiz (37 sayfa); axe 4.11.4 fresh-prod-serve (:4173, PID 1645333 teyit, stray 9077 dokunulmadı) light+dark → DOM dl/dt/dd=0; `definition-list` **0** + `dlitem` **0** (tümden kapandı); dark kalan 4 yalnız `text-pulse` (TASK-4.07 C2/C3). Link hedefleri `/spor-salonu-yazilimi` + `/bunker-os` doğru.
- **Craft (gözle, light+dark + AR RTL):** stats şeridi birebir (değer üstte koyu, etiket altta faint, yeşil nabız+ayraç, hover→yeşil); AR `dir=rtl` doğru aynalanmış, 0 MISSING_MESSAGE.

**TASK-4.04 — Cream-on-ink opaklık (K5+C9+C10)** (✅ 2026-06-30)
- [Footer.tsx:97,99](../src/components/Footer.tsx#L97) dil/telif `/40→/60`; ayraç "·" (L75,79) `aria-hidden`. [Bunker.tsx:58](../src/components/Bunker.tsx#L58) status `/50→/60` (C9); [L85](../src/components/Bunker.tsx#L85) metrik `/45→/70` (C10). Metrik `bg-canvas/[0.06]` overlay satırında → dark efektif zemin krem panelden koyu, /60=4.41 yetmedi → /70 (6.09).
- **Doğrulama:** build temiz (37 sayfa); axe 4.11.4 fresh-prod-serve (:4173, PID 1627786 teyit, stray 9077 dokunulmadı) light+dark → **light 0 ihlal**; dark kalan 4 ihlal hepsi `text-pulse` (TASK-4.07 kapsamı C2/C3). Bu task'ın öğeleri (Footer/60, status/60, metrik/70) flag'lenmiyor; eski opaklık kalmadı.
- **Craft (gözle, light+dark):** Footer "Dil/©" okunur ama "Kiwi AI Lab"dan muted; panel "canlı/aktif/sırada" okunur, akış adlarından (/85) muted — hiyerarşi + yeşil pulse imza korundu.


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-4.06 (sıradaki fix; `/devflow:run-task` ile başla) — 4.01-4.05 ✅
**Aktif Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark) 🔄; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — run-task TASK-4.05 ✅: Hero stats dl/dt/dd → div/span.block (data-hero korundu, görünüm birebir). build temiz + axe light+dark definition-list 0 / dlitem 0; dark kalan yalnız text-pulse (4.07). Sıradaki: run-task (TASK-4.06).
