# TASK-14.06: S4 — Kontroller & Kalıcılık (tema/dil/klavye)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Tema toggle & kalıcılık**
  - Toggle → `html.dark` class + localStorage + `themechange` + bg flip; **reload sonrası kalıcı** (early==final, FOUC yok)
  - Living Flow **uniform sayfa-boyu**: tema değişiminde tek WebGL context remount olmadan uniform çeviriyor mu (canvas sameNode / MutationObserver — Faz 9/12 deseni, ama artık sayfa-boyu)

- [ ] **2. Dil-switcher path koruma (`/crew-os` dahil)**
  - Alt sayfada (`/crew-os`, `/spor-salonu-yazilimi`) dil değiştir → path korunur (`/crew-os` → EN = `/en/crew-os`); home → DE = `/de`
  - **v0.3 kritik:** `/crew-os` yeni route → dil-switcher path'i `/en/crew-os`'a korur, `/en/bunker-os`'a **değil** (rename sonrası). Kaydet
  - Escape / dış-tık / klavye ile menü kapanışı

- [ ] **3. Klavye-only yolculuk + focus-visible**
  - Tab ile gezinme: focus-visible **yeşil outline** (rgb ~ marka yeşili) görünür; odak kaybı yok; tuzağa düşmez
  - Ölçüm: `reducedMotion:'reduce'` (memory: transition-colors outline'ı anime eder → full-motion yanlış-negatif)

- [ ] **4. Triyaj & kayıt**
  - Kapsam-içi bug (tema kalıcı değil, dil-switcher path düşürüyor / eski `/bunker-os`'a gidiyor, focus-visible kaybı) → düzeltme task'ı önerisi
  - Sonuç PHASE-14 + task doc'a

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

- [ ] Tema toggle → `html.dark`+localStorage+bg flip; reload kalıcı (early==final, FOUC yok)
- [ ] Living Flow uniform sayfa-boyu tema çevirme (remount yok)
- [ ] Dil-switcher path korur: `/crew-os`→`/en/crew-os` (eski `/bunker-os` değil), home→`/de`; Escape/dış-tık/klavye kapanış
- [ ] Klavye-only: focus-visible yeşil outline görünür, odak kaybı yok (`reducedMotion:'reduce'` ile ölçüldü)
- [ ] Bulgular triyajlı PHASE-14 + task doc'a

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldur]

**Bulgular / Triyaj:**
- [Kontrol matrisi; kapsam-içi bug var/yok]

**Kaynak kod değişmedi** (doğrulama fazı).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
