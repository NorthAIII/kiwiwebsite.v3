# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — run-task TASK-4.04 ✅: cream-on-ink opaklıklar AA'ya (Footer dil/telif /40→/60, Bunker status /50→/60, metrik /45→/70 — overlay-zemin /60 dark 4.41 yetmedi), ayraçlar aria-hidden. axe light 0 ihlal / dark yalnız text-pulse (TASK-4.07). Adım=task; sıradaki TASK-4.05.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark), ana sayfa. 🔄 Devam ediyor.
**Adım:** task → `/devflow:run-task`: sıradaki TASK-4.05 (fix sırası ...→4.07, sonra doğrulama 4.08). 4.01-4.04 ✅.
**İlerleme:** TASK-4.04 (cream-on-ink opaklık, K5+C9+C10) tamamlandı — Footer dil/telif /60, Bunker status /60, metrik /70 (overlay-zemin /60 dark 4.41 yetmedi), ayraçlar aria-hidden. axe light 0 / dark yalnız `text-pulse` (4.07 kapsamı); craft hiyerarşi + yeşil imza korundu. Etkilenmeyen: 4.05/K3, 4.06/K4, 4.07/C2-C3. Tam envanter: arşiv `tasks/archive/TASK-4.01.md` + PHASE-4 "Re-ölçüm Teyidi".
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

**Task:** TASK-4.05 — Hero `<dl>` → semantik link markup (K3, definition-list + dlitem). ⬜ Sıradaki fix. `run-task` ile başla.
**Durum:** 8 task: 4.01-4.04 ✅; fixler 4.05–4.07 ⬜; doğrulama 4.08 ⬜.
**İlerleme:** Adım = task; `/devflow:run-task` ile TASK-4.05'i çalıştır (tek task, oturum sonunda kapat).

---

## Task Durumu (Aktif Faz)

> Faz 4 (v0.2 a11y) — 8 task. 4.01 re-ölçümü kapsamı **light+dark**'a genişletti (C2/C3 panel pulse-yeşili + C9 Bunker durum); plan revizyonunda dağıtıldı: C9→4.04, C2/C3→yeni 4.07, doğrulama→4.08 çift-tema. Çalıştırma sırası = numara sırası.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 4.01 | TASK-4.01 | ✅ Tamamlandı | Otoriter re-ölçüm: a11y=89 teyit; materyal sapma → light+dark kapsam genişletme |
| 4.02 | TASK-4.02 | ✅ Tamamlandı | Adım numaraları color-contrast'tan çıkar (K1: `aria-hidden`→CSS `::before`, görsel birebir) |
| 4.03 | TASK-4.03 | ✅ Tamamlandı | `--color-ink-faint` token koyulaştırma (K2, color-contrast — globals.css; axe light+dark 0 ink-faint flag) |
| 4.04 | TASK-4.04 | ✅ Tamamlandı | Cream-on-ink opaklık (K5+C9+C10 — Footer /60, Bunker status /60, metrik /70; ayraçlar aria-hidden) |
| 4.05 | TASK-4.05 | ⬜ Bekliyor | Hero `<dl>` → semantik markup (K3, definition-list + dlitem) |
| 4.06 | TASK-4.06 | ⬜ Bekliyor | Dil-switcher `aria-label` locale kodu (K4, label-content-name) |
| 4.07 | TASK-4.07 | ⬜ Bekliyor | Gym-panel pulse-yeşili dark-inversion fix (C2/C3, adaptif `--color-pulse-ink` token) |
| 4.08 | TASK-4.08 | ⬜ Bekliyor | Final doğrulama: a11y=100 **çift-tema** + perf/CLS regresyonsuz + perf taban |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-4.04 — Cream-on-ink opaklık (K5+C9+C10)** (✅ 2026-06-30)
- [Footer.tsx:97,99](../src/components/Footer.tsx#L97) dil/telif `/40→/60`; ayraç "·" (L75,79) `aria-hidden`. [Bunker.tsx:58](../src/components/Bunker.tsx#L58) status `/50→/60` (C9); [L85](../src/components/Bunker.tsx#L85) metrik `/45→/70` (C10). Metrik `bg-canvas/[0.06]` overlay satırında → dark efektif zemin krem panelden koyu, /60=4.41 yetmedi → /70 (6.09).
- **Doğrulama:** build temiz (37 sayfa); axe 4.11.4 fresh-prod-serve (:4173, PID 1627786 teyit, stray 9077 dokunulmadı) light+dark → **light 0 ihlal**; dark kalan 4 ihlal hepsi `text-pulse` (TASK-4.07 kapsamı C2/C3). Bu task'ın öğeleri (Footer/60, status/60, metrik/70) flag'lenmiyor; eski opaklık kalmadı.
- **Craft (gözle, light+dark):** Footer "Dil/©" okunur ama "Kiwi AI Lab"dan muted; panel "canlı/aktif/sırada" okunur, akış adlarından (/85) muted — hiyerarşi + yeşil pulse imza korundu.

**TASK-4.03 — `--color-ink-faint` token koyulaştırma (K2)** (✅ 2026-06-29)
- [globals.css:11,35](../src/app/globals.css#L11) — token tek-kaynaktan koyulaştırıldı: light `#8b8d83→#67695f` (canvas 5.16/canvas-deep 4.76), dark `#7d8073→#8a8c80` (5.38/4.92). Tüketen bileşenler değişmedi (token yayılımı, 8 `.text-ink-faint` öğesi).
- **Doğrulama:** build temiz (37 sayfa); axe 4.11.4 fresh-prod-serve (:4173, PID 122997 teyit, stray 9077 dokunulmadı) light+dark → `text-ink-faint` color-contrast ihlali **0** (her iki tema). Öğeler DOM'da mevcut + yeni renkle render (gizlenmedi, geçiyor). Kalan ihlaller başka task kapsamı (footer/Bunker `canvas/*`→4.04; dark `text-pulse`→4.07).
- **Craft (gözle, light+dark):** faint hiyerarşi korundu (ink>ink-soft>ink-faint, faint en muted); Hero etiketleri/scroll-cue/sektör eyebrow ikincil kaldı, prominent olmadı. Yeşil imza dokunulmadı.


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-4.05 (sıradaki fix; `/devflow:run-task` ile başla) — 4.01-4.04 ✅
**Aktif Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark) 🔄; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — run-task TASK-4.04 ✅: cream-on-ink opaklıklar AA'ya (Footer /60, Bunker status /60, metrik /70; ayraçlar aria-hidden). build temiz + axe light 0 / dark yalnız text-pulse (4.07). Sıradaki: run-task (TASK-4.05).
