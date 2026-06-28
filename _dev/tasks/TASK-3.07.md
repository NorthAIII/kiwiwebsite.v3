# TASK-3.07: S4 — Kontroller & Kalıcılık

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Tema toggle + kalıcılık**
  - Toggle → `html.dark` değişir; **reload sonrası kalıcı** (localStorage); Living Flow uniform tema rengi canlı güncellenir (MutationObserver `html.dark` — M1 F1.1 / M3 F3.4 edge).

- [ ] **2. Dil-switcher davranışı**
  - Dünya ikonu → 5 dil liste açılır; dil seçince **path korunur + anchor korunur** (router.replace); **Escape + dış-tık** kapatır; **klavye erişilebilir** (aria-haspopup/expanded).

- [ ] **3. Klavye-only yolculuk + focus-visible**
  - Tab ile interaktif öğeler sırayla gezilir; **focus-visible 2px yeşil outline** görünür (M1 F1.4 — a11y, QUALITY §2).

- [ ] **4. Triyaj (TK6)** — dil-switcher aria-mismatch a11y açığı bilinen → record-not-fix.

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

- [ ] Tema toggle → `html.dark` değişir; **reload sonrası kalıcı**; Living Flow uniform güncellenir.
- [ ] Dil-switcher path + anchor korur; Escape / dış-tık / klavye çalışır.
- [ ] Klavye-only yolculuk akıcı + yeşil focus-visible outline görünür.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** ⬜ Bekliyor

---

**Oluşturulma:** 2026-06-29
