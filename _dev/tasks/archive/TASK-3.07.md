# TASK-3.07: S4 — Kontroller & Kalıcılık

**Durum:** ✅ Tamamlandı
**Modül:** M3 — Etkileşim & UX Primitives (modules/M3-Etkilesim-Primitives.md) (+ M1/M4)
**Feature:** S4 — Kontroller & kalıcılık (validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (prod serve; runtime kontroller için zorunlu tarayıcı)

---

## Hedef

İnteraktif kontrolleri tarayıcıda doğrula: tema toggle (localStorage + reload kalıcılık + Living Flow uniform güncellenir), dil-switcher (path + anchor koru, klavye / Escape / dış-tık), **klavye-only yolculuk** + focus-visible yeşil outline. Araç: Playwright MCP. Tüm kontrol senaryoları koşulup sonuçlar kaydedildiğinde tamamlanmış sayılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M3-Etkilesim-Primitives.md` — F3.4 tema/dil kontrolleri (localStorage, router.replace, Escape/dış-tık, aria)
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — F1.1 tema değişimi Living Flow uniform (MutationObserver), F1.4 focus-visible yeşil outline
- `_dev/phases/PHASE-3.md` — Araştırma → Dikkat (tema=localStorage, a11y record-not-fix) + S4 araç satırı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.07 durumu

---

## Alt Görevler

- [x] **1. Tema toggle + kalıcılık**
  - Toggle → `html.dark` değişir; **reload sonrası kalıcı** (localStorage); Living Flow uniform tema rengi canlı güncellenir (MutationObserver `html.dark` — M1 F1.1 / M3 F3.4 edge).

- [x] **2. Dil-switcher davranışı**
  - Dünya ikonu → 5 dil liste açılır; dil seçince **path korunur** (router.replace); **Escape + dış-tık** kapatır; **klavye erişilebilir** (aria-haspopup/expanded). ⚠️ **anchor korunmuyor** (bulgu → record-not-fix, aşağı).

- [x] **3. Klavye-only yolculuk + focus-visible**
  - Tab ile interaktif öğeler sırayla gezilir; **focus-visible 2px yeşil outline** görünür (M1 F1.4 — a11y, QUALITY §2).

- [x] **4. Triyaj (TK6)** — dil-switcher aria-mismatch a11y açığı bilinen → record-not-fix; anchor-drop bulgusu → record-not-fix (kullanıcı onayı 2026-06-29).

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Bulgular bu task dokümanına. İstisna: kapsam-içi kontrol bug'ı (ör. tema reload'da sıfırlanıyor) → fix-task.

---

## Dikkat Noktaları

- **Tema = localStorage + `html.dark`** **(repo:** [locale]/layout.tsx:73-78 + ThemeToggle**)** — reload kalıcılık testi = localStorage persist + FOUC script.
- **Bilinen a11y açığı:** dil-switcher aria-mismatch (a11y 89 — DECISIONS 2026-06-28) → çıkarsa **record-not-fix**.
- **focus-visible yeşil outline** = a11y kabul kriteri (M1 F1.4 / QUALITY §2) — görünür olmalı.
- **Ortam:** TASK-3.01 prod serve; PID fresh teyit (memory). `package.json`'a dokunma.

---

## Test Kriterleri

- [x] Tema toggle → `html.dark` değişir; **reload sonrası kalıcı**; Living Flow uniform güncellenir.
- [x] Dil-switcher path korur; Escape / dış-tık / klavye çalışır. ⚠️ anchor korunmuyor (record-not-fix bulgu).
- [x] Klavye-only yolculuk akıcı + yeşil focus-visible outline görünür.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı (anchor bulgusu triyaj edildi → record-not-fix)
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Kanonik ortam:** `rm -rf .next && next build` (exit 0, **temiz** — 0 hata/uyarı, ✓ Compiled successfully, 37 statik sayfa → S8-build regresyon tabanı re-teyit) + `next start -p 3100`. Listening-PID **3357729** fresh teyit (Ready in 326ms; Jun28 stray `next-server` PID 12708 portu tutmuyordu, dokunulmadı) — memory disiplini. İş sonu kendi process kill (port 3100 boş, 12708 untouched).
- **Araç:** Playwright MCP `browser_run_code_unsafe` (raw `page` erişimi) — click/keyboard/Escape/reload/localStorage akışları + computed-style (`getComputedStyle` outline) + sentinel `MutationObserver` enjeksiyonu tek atomik script'te. Headless'ta WebGL gerçek çalışıyor (canvas=1, GL context not-lost).
- **Alt görev 1 (tema):** light default (html.dark=false, lsTheme=null, canvas=1, GL alive) → toggle → html.dark=true + lsTheme="dark" + canvas/GL hâlâ canlı; **reload sonrası kalıcı** (html.dark=true, lsTheme="dark" — FOUC inline script `<head>`'de `<body>`'den önce); geri-toggle → light + lsTheme="light". **Living Flow uniform:** FlowCanvas'ın MutationObserver'ı ([FlowCanvas.tsx:256-269](src/components/living-flow/FlowCanvas.tsx#L256)) ile **birebir aynı** sentinel observer (`documentElement` `attributeFilter:['class']`) toggle'da fired=1 + lastDark doğru → canlı uniform-güncelleme yolu çalışıyor (canvas instance toggle boyunca aynı/GL not-lost → gerçek observer da bağlı kalır). preserveDrawingBuffer yok ([FlowCanvas.tsx:385](src/components/living-flow/FlowCanvas.tsx#L385)) → THREE uniform'u dış-okunamaz; mekanizma-proxy en dürüst yol.
- **Alt görev 2 (dil-switcher):** `aria-haspopup="listbox"` + `aria-expanded` false↔true toggle; aç → 5 dil (Türkçe/English/العربية/Deutsch/Español), aktif dil `aria-selected` + `•`; **Escape kapatır**, **dış-tık kapatır** (h1 mousedown); klavye: trigger focus-edilebilir, **Enter açar**, **Tab option'a girer** (role=option, focusable button); **path korunur** (home `/en`→`/de`; alt-sayfa `/en/spor-salonu-yazilimi`→`/es/spor-salonu-yazilimi`). triggerCount=2 (Nav + Footer switcher, beklenen).
- **Alt görev 3 (klavye + focus-visible):** Tab ile 16 ardışık durak (logo→nav 4 link→tema→dil→nav CTA→hero 2 CTA→Alpfit/Crew OS kart→4 sektör tab), **16/16 distinct = focus-trap yok**; settle sonrası **16/16 outline `2px solid rgb(31,122,61)` offset 3px** (= `--color-green` light); görsel kanıt (lang button yeşil outline). İlk ölçümde ufak RGB sapması = Tailwind `transition-colors` outline-color'ı anime ediyor (mid-transition örnekleme artefaktı), 550ms settle ile kayboldu.
- **Konsol:** tüm S4 etkileşimlerinde **0 error / 0 warning**.

**Sorunlar:**
- İlk dil-switcher script'i part C'de (anchor testi) `ul[role=listbox]` 30s timeout ile patladı + throw tüm sonucu kaybetti → **çözüm:** her part `try/catch` + her zaman JSON döndür + option seçimini accessible-role/index ile sağlamlaştır + listbox `waitFor visible`. Part C ayrıca Lenis smooth-scroll mid-animation iken click düşmesinden açılmamıştı → izole testte 1.8s scroll-settle + retry ile açıldı.
- focus-visible ilk ölçümde `rgb(32,121,61)`/offset değişimleri "non-conforming" göründü → **bug değil:** Tailwind `transition-colors` `outline-color`'ı (ve sektör tab'larında offset) anime ediyor; 120ms örnekleme mid-transition. 550ms settle → 16/16 tam uyumlu. Ölçüm artefaktı.

**Kararlar:**
- **Bulgu — anchor-drop (record-not-fix, kullanıcı onayı 2026-06-29):** Dil değişiminde path korunuyor ama URL anchor düşüyor — `/en#sectors` → Almanca → `/de` (hash="", scrollY=0), `/de#sectors` değil. Kök neden: [LanguageSwitcher.tsx:50](src/components/LanguageSwitcher.tsx#L50) `router.replace(pathname,{locale})`; next-intl `pathname` hash içermez (kütüphane-varsayılanı). M3 F3.4 resmi kabul kriteri yalnız **path** korumasını ister (✓ geçiyor); "anchor koru" beklentisi yalnız S4 senaryo/task dokümanında. Düşük şiddet (kontrol çalışıyor). Kullanıcı **record-not-fix + ertele** seçti (diğer ertelenen UX kalemleriyle tutarlı) → fix-task açılmadı, kaynak değişmedi.
- **Bilinen a11y açığı — dil-switcher aria-mismatch (TK6, record-not-fix):** trigger `aria-haspopup="listbox"`/`aria-expanded` var ama `aria-controls` / roving-tabindex / `aria-activedescendant` yok (listbox tam ARIA deseni eksik). DECISIONS 2026-06-28 a11y 89 kapsamında bilinen, adanmış a11y fazına ertelenmiş → record-not-fix.
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari karar yok; doğrulama task'ı + iki bulgu da zaten-ertelenmiş/triyajlı).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- Kaynak kod değişikliği **yok** (doğrulama task'ı; iki bulgu da record-not-fix). Yalnız doküman: bu dosya + DURUM.md + phases/PHASE-3.md.

**Test Sonuçları:**
- Tema: light(html.dark=false/ls=null/canvas=1/GL-alive) → toggle dark(html.dark=true/ls="dark"/sentinel fired=1 lastDark=true/canvas=1/GL-alive) → reload(html.dark=true/ls="dark"/canvas=1 = kalıcı, FOUC yok) → toggle light(html.dark=false/ls="light").
- Dil-switcher: aria-expanded false↔true; 5 option (aktif `•`/aria-selected); Escape kapat ✓; dış-tık kapat ✓; Enter aç ✓; Tab→option(focusable) ✓; path korur home+subpage ✓; anchor **düşüyor** (bulgu).
- Klavye/focus-visible: 16/16 distinct tab-durağı (trap yok); settle sonrası 16/16 `2px solid rgb(31,122,61)` offset 3px; görsel teyit.
- Konsol: 0 error / 0 warning.
- **Triyaj (TK6):** kapsam-içi düzeltilecek bug YOK; anchor-drop + aria-mismatch → record-not-fix (ertele).

---

**Oluşturulma:** 2026-06-29
