# TASK-9.06: S4 — Kontroller & Kalıcılık

**Durum:** ⬜ Bekliyor
**Modül:** M3 Etkileşim (+M1 Living Flow / M4 i18n) (modules/M3-Etkilesim-Primitives.md)
**Feature:** S4 senaryo grubu — kontroller & kalıcılık (doğrulama)
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.05 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

Tema/dil kontrollerini + klavye erişimini standalone Playwright ile (home + bir alt sayfa) doğrula: tema toggle (localStorage + reload sonrası kalıcılık + Living Flow uniform yansıması), dil-switcher (path korur, klavye/Escape/dış-tık ile kapanır), **klavye-only yolculuk** + görünür yeşil focus-visible. Tamamlanma = kontrol + kalıcılık + klavye senaryoları koşuldu, davranış kaydedildi, triyaj yapıldı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S4 araç satırı + Dikkat Edilecekler (tema=localStorage; dil-switcher path koru) 
- `_dev/memory/tema-fix-html-dark-token-flip.md` — tema kalıcılık mekanizması
- `src/components/` → Nav/ThemeToggle/dil-switcher bileşenleri, `tests/e2e/a11y-helpers.ts` (desenler)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.06 durumu + S4 bulgu notu

---

## Alt Görevler

- [ ] **1. Standalone Playwright sürücü (scratchpad)**
  - Fresh prod build serve (PID teyit); `chromium.launch()`/`channel:'chrome'`; repo'ya yazılmaz

- [ ] **2. Tema toggle & kalıcılık**
  - Toggle → `html.dark` + localStorage yazılır; **reload sonrası tema korunur**; Living Flow uniform yeni temaya uyar (FOUC yok)

- [ ] **3. Dil-switcher davranışı**
  - Dil seçimi **path'i korur** (aynı sayfada dil değişir — home + bir alt sayfada teyit); menü **Escape / dış-tık / klavye** ile kapanır
  - **Not:** anchor-kütüphane-varsayılanı path'i düşürebilir = Faz 3 record-not-fix bulgusu; çıkarsa aynı şekilde sahipli kaydet, yeniden litige etme

- [ ] **4. Klavye-only yolculuk**
  - Yalnız Tab/Enter/Escape ile nav + kontroller gezilebilir; **focus-visible yeşil outline** her interaktif öğede görünür; focus trap/kayıp yok

- [ ] **5. Triyaj & kayıt**
  - Bulgular TK7 triyaj; sonuç task Oturum Kaydı + PHASE-9 notu

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Playwright script scratchpad'de. -->

```
scratchpad/  (commit'lenmez)
└── s4-kontroller.mjs           # YENİ — standalone Playwright sürücü (repo dışı)
_dev/
├── tasks/TASK-9.06.md          # Oturum kaydı + bulgular
├── phases/PHASE-9.md           # Task Listesi 9.06 + S4 notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **Tema kalıcılık = localStorage + `html.dark`**, prefers-color-scheme değil → reload testinde localStorage'ın korunduğunu (aynı context) teyit et.
- **Dil-switcher path-koru** anchor kütüphane-varsayılanıyla düşebilir (Faz 3 record-not-fix) — bug'sa TK7 sahipli kayıt, bu fazda düzeltilmez (kapsam-içi olsa da Faz 3'te sahiplenildi; çıkarsa doğrula/karşılaştır).
- **focus-visible** yeşil outline QUALITY §2 gereği — klavye-only'de görünürlük zorunlu.
- Kanonik ortam = fresh prod build; TR cookie (`gotoLocalized`).

---

## Test Kriterleri

- [ ] Tema toggle → localStorage + `html.dark`; reload sonrası kalıcı; Living Flow uniform uyumlu
- [ ] Dil-switcher path'i korur (home + alt sayfa); Escape/dış-tık/klavye ile kapanır (veya path-düşme bulgusu sahipli kaydedildi)
- [ ] Klavye-only yolculuk tam çalışır; yeşil focus-visible her interaktif öğede görünür
- [ ] Standalone script scratchpad'de kaldı; bulgular triyajlı PHASE-9 + task doc'a yazıldı

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

<!-- Task çalıştırıldığında (run-task) doldurulur. -->

---

**Oluşturulma:** 2026-07-02
