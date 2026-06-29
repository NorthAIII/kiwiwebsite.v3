# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-29 — verify-plan 4: 8-task plan fresh-context'te doğrulandı (referans gerçeklik-kontrolü tüm dosya/satır/token reflerinde geçti; envanter C1–C12 + 3 denetim eksiksiz eşlendi; çakışma yok). Yapısal değişiklik yok, 2 mekanik typo düzeltildi. Adım=task; sıradaki TASK-4.02 (`run-task`).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark), ana sayfa. 🔄 Devam ediyor (plan doğrulandı).
**Adım:** task → `/devflow:run-task`: TASK-4.02'den başla (fix sırası 4.02→4.07, sonra doğrulama 4.08). verify-plan ✅ (8-task plan doğrulandı, 2 mekanik typo düzeltildi, yapısal değişiklik yok).
**İlerleme:** Plan verify-plan 4'te (2026-06-29) fresh-context doğrulandı: tüm referanslar gerçekle tutarlı (globals.css token'ları, HowItWorks/Hero/LanguageSwitcher/Footer/Bunker/SectorSolutions satırları teyitli); envanter C1–C12 eksiksiz; cream-on-ink + text-pulse kaçağı yok. Etkilenmeyen: 4.02/K1, 4.03/K2, 4.05/K3, 4.06/K4. Tam envanter: arşiv `tasks/archive/TASK-4.01.md` + PHASE-4 "Re-ölçüm Teyidi".
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

**Task:** TASK-4.02 — Adım numaraları `aria-hidden` (K1, color-contrast — HowItWorks). ⬜ Sıradaki (ilk fix). `run-task` ile başla.
**Durum:** Plan doğrulandı (verify-plan 4 ✅). 8 task: 4.01 ✅; fixler 4.02–4.07 ⬜; doğrulama 4.08 ⬜.
**İlerleme:** Adım = task; `/devflow:run-task` ile TASK-4.02'yi çalıştır (tek task, oturum sonunda kapat).

---

## Task Durumu (Aktif Faz)

> Faz 4 (v0.2 a11y) — 8 task. 4.01 re-ölçümü kapsamı **light+dark**'a genişletti (C2/C3 panel pulse-yeşili + C9 Bunker durum); plan revizyonunda dağıtıldı: C9→4.04, C2/C3→yeni 4.07, doğrulama→4.08 çift-tema. Çalıştırma sırası = numara sırası.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 4.01 | TASK-4.01 | ✅ Tamamlandı | Otoriter re-ölçüm: a11y=89 teyit; materyal sapma → light+dark kapsam genişletme |
| 4.02 | TASK-4.02 | ⬜ Bekliyor | Adım numaraları `aria-hidden` (K1, color-contrast — HowItWorks) |
| 4.03 | TASK-4.03 | ⬜ Bekliyor | `--color-ink-faint` token koyulaştırma (K2, color-contrast — globals.css) |
| 4.04 | TASK-4.04 | ⬜ Bekliyor | Cream-on-ink opaklık ≥%60 (K5+C9, color-contrast — Footer + Bunker) |
| 4.05 | TASK-4.05 | ⬜ Bekliyor | Hero `<dl>` → semantik markup (K3, definition-list + dlitem) |
| 4.06 | TASK-4.06 | ⬜ Bekliyor | Dil-switcher `aria-label` locale kodu (K4, label-content-name) |
| 4.07 | TASK-4.07 | ⬜ Bekliyor | Gym-panel pulse-yeşili dark-inversion fix (C2/C3, adaptif `--color-pulse-ink` token) |
| 4.08 | TASK-4.08 | ⬜ Bekliyor | Final doğrulama: a11y=100 **çift-tema** + perf/CLS regresyonsuz + perf taban |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-4.01 — Otoriter a11y re-ölçüm (envanter sabitleme)** (✅ 2026-06-29)
- Fresh-prod-serve (build exit 0 / 37 sayfa; PID 437475 teyit, stray 12267 dokunulmadı) + Lighthouse 13.3.0 + axe-core 4.11.4 (Playwright, light+dark). **a11y=89** her preset/tema (baseline teyit); dl/dlitem/label K3/K4 birebir; perf ref masaüstü ~100 / mobil ~85-86 / CLS 0.
- **Materyal sapma:** Lighthouse default DARK render (init `prefers-color-scheme: dark`); bg-ink panel dark'ta krem → C2/C3 gym pulse-step + seeLive (1.22) ve C9 Bunker durum (3.36) dark fail — K1-K5 kapsam dışı; K1-K5 tek başına 100'e ulaşmaz.
- **Karar (kullanıcı):** light+dark kapsam genişletme → plan revizyonu uygulandı (C9→4.04, C2/C3→yeni 4.07 adaptif `--color-pulse-ink` token, doğrulama 4.08 çift-tema). Etkilenmeyen K1/K2/K3/K4 geçerli. Tam envanter: arşiv `tasks/archive/TASK-4.01.md`.

**TASK-3.09 — S8 adversarial/holistik (JS-off SSG + toggle/scroll race)** (✅ 2026-06-29)
- Kanonik fresh-prod-serve (`rm -rf .next && build` exit 0 / 0-uyarı / 37 sayfa = S8-build re-teyit; fresh PID 30537 teyit, iş sonu kill; stray 12267 portsuz/dokunulmadı). Araç: Playwright MCP `browser_run_code_unsafe` + curl raw HTML.
- **JS-off SSG (TR+AR):** tüm bölüm ID + başlıklar + gövde + nav/CTA (hero ikincil "İşleyen örnekleri gör"→#sectors) raw HTML'de okunur; `<canvas>`=0 (Living Flow client-only, beklenen); AR dir=rtl + 0 MISSING_MESSAGE; kritik içerik client-only'ye gömülü değil. **Toggle race:** tema 7-UI+burst(8,9) → html.dark=localStorage=aria-pressed=icon tutarlı (3/3); dil burst(es→de→ar) son-kazanır + ardışık(180ms) tutarlı (url=lang=dir=langBtn). **Scroll/anchor race:** ardışık/rAF/80ms son hedef tam iner (forumTop≈0); 30/30 reveal görünür 0-takılı; #top dönüş scrollY=0; 0 konsol hatası.
- **Triyaj (TK6):** kapsam-içi bug YOK, kaynak değişmedi. Record-not-fix: aynı-JS-tick(0ms) anchor burst Lenis'i ara konuma çözer (≥16ms'de temiz iner, takılma yok) — sentetik-only, kullanıcı etkisi yok.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-4.02 (sıradaki fix; `/devflow:run-task` ile başla) — plan doğrulandı (verify-plan 4 ✅)
**Aktif Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100, light+dark) 🔄; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-29 — verify-plan 4: 8-task plan fresh-context'te doğrulandı (referanslar gerçekle tutarlı, envanter eksiksiz, çakışma yok); 2 mekanik typo düzeltildi, yapısal değişiklik yok. Sıradaki: run-task (TASK-4.02).
