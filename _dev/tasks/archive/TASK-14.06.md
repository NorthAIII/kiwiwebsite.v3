# TASK-14.06: S4 — Kontroller & Kalıcılık (tema/dil/klavye)

**Durum:** ✅ Tamamlandı
**Modül:** M3 primitives (+M1/M4) (modules/M3-Etkilesim-Primitives.md)
**Feature:** S4 senaryo grubu — kontroller & kalıcılık — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.05 ✅ (lineer sıra; runtime harness zemini hazır)

---

## Hedef

**Standalone Playwright + system Chrome** ile kontrolleri ve kalıcılığı doğrula: tema toggle (localStorage + reload kalıcılık + Living Flow uniform **sayfa-boyu**), dil-switcher (path koru — **`/crew-os` dahil**, Escape/dış-tık/klavye kapanış), **klavye-only yolculuk** + focus-visible yeşil outline; alt sayfada da dil-switcher path korur. Tamamlanma = kontrol matrisi koşuldu, sonuç triyajlı kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S4 satırı (system Chrome; tema `html.dark`+localStorage; dil-switcher `router.replace` butonu) + Dikkat Edilecekler (selector teyidi, tema tuzağı, reveal tuzağı focus-visible)
- `_dev/memory/runtime-harness-selector-teyidi.md` — LanguageSwitcher `<a href>` değil `router.replace` **butonu**; tema `html.dark`+localStorage
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — focus-visible outline ölçümü `reducedMotion:'reduce'` şart (Tailwind v4 `transition-colors` outline-color'ı anime eder → yanlış-negatif)
- `src/components/` — LanguageSwitcher, tema toggle, Nav

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.06 durumu + S4 bulgu notu

---

## Alt Görevler

- [x] **1. Tema toggle & kalıcılık** — S4.1a/b/c PASS: toggle → `html.dark`+localStorage(`dark`)+bg flip (light `rgb(247,246,241)` → dark `rgb(19,21,16)`)+aria-pressed=true; reload kalıcı + FOUC yok (early===final===true, pre-paint blocking `<head>` script); Living Flow uniform sayfa-boyu **remount YOK** (canvas'a damga bastım → toggle sonrası damga sağ, canvas 1→1, fixed katman 1280×800 viewport'u kaplıyor — MutationObserver renk uniform'u tek context'te çeviriyor)
- [x] **2. Dil-switcher path koruma (`/crew-os` dahil)** — S4.2a/b/c/d PASS: home→DE=`/de`; **`/crew-os`→EN=`/en/crew-os` (eski `/bunker-os` DEĞİL — v0.3 kritik ✓)**; `/spor-salonu-yazilimi`→EN=`/en/spor-salonu-yazilimi`; menü kapanış Escape/dış-tık/klavye (Enter-aç → Esc-kapa) hepsi `aria-expanded` true→false
- [x] **3. Klavye-only yolculuk + focus-visible** — S4.3a/b PASS (`reducedMotion:'reduce'` ile): Tab zinciri focus-visible **yeşil outline** light `#1f7a3d(31,122,61)` + dark `#4fb06a(79,176,106)`, 12/12 odak yeşil/2px, odak kaybı yok (BODY'ye düşmedi)
- [x] **4. Triyaj & kayıt** — kapsam-içi bug YOK; 1 ilk-koşu FAIL harness-artefaktıydı (S4.1c early-capture: `addInitScript` document_start'ta `documentElement` null → observe fırlıyor; `waitUntil:'commit'` hydration-öncesi okumaya çevrildi → early===final PASS). Sonuç PHASE-14 + DURUM'a işlendi

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Harness geçici (scratchpad). YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-14.06.md          # Oturum kaydı + S4 kontrol matrisi
├── phases/PHASE-14.md           # Task Listesi 14.06 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **Selector teyidi (memory):** LanguageSwitcher `<a href>` **değil** `router.replace` **butonu** → `click` + URL bekle (href okuma yanlış). Tema `html.dark`+localStorage (prefers-color-scheme değil). Harness "FAIL" → önce artefakt mı.
- **`/crew-os` path koruma (v0.3):** Faz 11 rename sonrası dil-switcher `/en/crew-os` üretmeli; `/en/bunker-os` üretiyorsa (eski route referansı) kapsam-içi bug. Özellikle kontrol et.
- **focus-visible ölçümü `reducedMotion:'reduce'` şart** (memory): Tailwind v4 `transition-colors` outline-color'ı anime eder → Tab-sonrası okuma yeşil↔metin ara-değeri = yanlış-negatif.
- **Living Flow uniform artık sayfa-boyu:** tema değişiminde tek context tüm sayfada uniform çevirmeli (Faz 12 shared `useFlowMode`) — remount/flash yok.

---

## Test Kriterleri

- [x] Tema toggle → `html.dark`+localStorage+bg flip; reload kalıcı (early===final, FOUC yok) — PASS
- [x] Living Flow uniform sayfa-boyu tema çevirme (remount yok) — PASS (damga sağ, canvas 1→1)
- [x] Dil-switcher path korur: `/crew-os`→`/en/crew-os` (eski `/bunker-os` değil), home→`/de`; Escape/dış-tık/klavye kapanış — PASS
- [x] Klavye-only: focus-visible yeşil outline görünür, odak kaybı yok (`reducedMotion:'reduce'` ile ölçüldü) — PASS light+dark 12/12
- [x] Bulgular triyajlı PHASE-14 + task doc'a — PASS

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-05

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- Kanonik prod-serve: `rm -rf .next && next build` (temiz) → `next start -p 3000`, Ready 383ms, **listening-PID 18786 teyit** (stray yok; loadavg ~1.0-1.4 düşük). curl smoke: home/crew-os/en-crew-os = 200.
- Selector teyidi (memory disiplini, kaynaktan okundu): ThemeToggle = tek `button[aria-pressed]` (`html.dark` class + `localStorage.theme` + `themechange` event); LanguageSwitcher = `button[aria-haspopup="listbox"]` → `router.replace(pathname,{locale})` (`<a href>` DEĞİL), `<ul role="listbox">` + `<button role="option">`, Escape/mousedown-dışı kapatır; Living Flow tema = `FlowCanvas` `MutationObserver`'ı `html.class`'ı izler → renk uniform'unu **remount olmadan** çevirir; FlowBackdrop `position:fixed inset-0` tek context sayfa-boyu; focus-visible = `globals.css:132` `outline:2px solid var(--color-green)`.
- Standalone Playwright + **system Chrome** (`channel:'chrome'` + `--enable-unsafe-swiftshader` + `--disable-dev-shm-usage`; mutlak import yolu). Full-motion SANITY: **webgl2=true, canvas=1 → ayırt-edici (bundled değil)**. focus-visible ölçümü ayrı context `reducedMotion:'reduce'` (memory: transition-colors outline'ı anime eder → full-motion yanlış-negatif).
- **10/10 senaryo PASS.**

**Bulgular / Triyaj:**
- **S4.1a Tema toggle:** `html.dark` false→true + `localStorage.theme`=`dark` + bg flip `rgb(247,246,241)`→`rgb(19,21,16)` + `aria-pressed`=true. ✅
- **S4.1b Living Flow uniform sayfa-boyu (remount YOK):** canvas'a damga bastım → toggle sonrası **damga sağ**, canvas 1→1, fixed katman 1280×800 viewport'u kaplıyor (tek context MutationObserver ile renk çeviriyor, remount/flash yok). ✅
- **S4.1c Reload kalıcı + FOUC yok:** `early===final===true`, `ls`=dark (pre-paint blocking `<head>` script hydration'dan önce class'ı ekliyor). ✅
- **S4.2a/b/c Dil-switcher path koruma:** home→DE=`/de`; **`/crew-os`→EN=`/en/crew-os` (eski `/bunker-os` DEĞİL — v0.3 kritik ✓)**; `/spor-salonu-yazilimi`→EN=`/en/spor-salonu-yazilimi`. ✅
- **S4.2d Menü kapanış:** Escape / dış-tık / klavye (Enter-aç→Esc-kapa) hepsi `aria-expanded` true→false. ✅
- **S4.3a/b Klavye focus-visible:** yeşil outline light `#1f7a3d(31,122,61)` + dark `#4fb06a(79,176,106)`, 12/12 odak yeşil/2px, odak kaybı yok (BODY'ye düşmedi). ✅
- **Kapsam-içi bug YOK.** İlk koşuda S4.1c FAIL verdi → **harness artefaktı** (memory: "FAIL → önce artefakt mı"): `addInitScript` document_start'ta `documentElement` null → `MutationObserver.observe` fırlıyor, `readystatechange` listener'ı eklenmiyordu; `waitUntil:'commit'` hydration-öncesi okumaya çevrilince early===final doğrulandı. Gerçek-bug değil.

**Kaynak kod değişmedi** (doğrulama fazı; harness scratchpad'de, commit'lenmez).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
**Tamamlanma:** 2026-07-05 (run-task 14.06)
