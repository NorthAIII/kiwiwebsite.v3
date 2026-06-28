# TASK-3.09: S8 — Adversarial / Holistik Kırma (JS-off SSG + race)

**Durum:** ⬜ Bekliyor
**Modül:** Tümü (M1–M6) — holistik (modules/M2, M3, M4 birincil)
**Feature:** S8 — Adversarial / holistik kırma (validation unit; `next build` temizliği TASK-3.01'de)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (kanonik prod serve + build-clean tabanı)

---

## Hedef

Adversarial / holistik dayanıklılığı doğrula: **JS-kapalı SSG okunabilirlik** (ana içerik server-render'da var), **hızlı dil/tema toggle race** (UI tutarlı kalır), **hızlı scroll/anchor zıplama** (ScrollTrigger kararlılığı). Araç: curl / JS-disabled Playwright (SSG) + Playwright (race). Üç adversarial kalem koşulup sonuçlar kaydedildiğinde tamamlanmış sayılır.

> **Not:** S8'in `next build` temiz = regresyon tabanı kalemi **TASK-3.01'de** koşuldu (erken risk azaltma). Burada tekrar edilmez; bu task 3.01'in temiz-build tabanına dayanır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M3-Etkilesim-Primitives.md` — F3.1 ScrollTrigger/anchor, F3.4 toggle davranışı
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — F1.2 Living Flow client-only (JS-off'ta yok — beklenen)
- `_dev/phases/PHASE-3.md` — Araştırma → S8 araç satırı + TK2 (build-clean 3.01'de)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.09 durumu

---

## Alt Görevler

- [ ] **1. JS-off SSG okunabilirlik**
  - JavaScript kapalı (JS-disabled Playwright context veya curl raw HTML) → ana içerik (başlıklar, gövde metinleri, linkler) SSG'de **okunur**; kritik içerik client-only'ye gömülü değil.
  - Living Flow JS-off'ta yok (client-only, **beklenen**) — kontrol *içerik* okunabilirliği, efekt değil.

- [ ] **2. Toggle race**
  - Hızlı ardışık dil/tema toggle → UI tutarlı kalır; kırılma / yanlış-durum / yarım-render yok (Playwright).

- [ ] **3. Scroll/anchor race**
  - Hızlı scroll + ardışık anchor zıplama (`#how`→`#sectors`→`#bunker`…) → ScrollTrigger kararlı; takılma / yanlış-konum yok.

- [ ] **4. Triyaj (TK6)**

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Bulgular bu task dokümanına. İstisna: kapsam-içi kararlılık bug'ı (ör. race'te UI kırılıyor) → fix-task.

---

## Dikkat Noktaları

- **build-clean S8 kalemi TASK-3.01'de** koşuldu — burada yalnız JS-off SSG + race. 3.01 temiz-build tabanına dayanır.
- **JS-off'ta Living Flow yok** (client-only, beklenen) — kontrol *içerik* okunabilirliği (SSG bütünlüğü), WebGL efekti değil.
- **Race testleri kararlılık gözlemi** (perf değil); loadavg yüksekse gürültü olur — `cat /proc/loadavg` ile gözle (memory).
- **Ortam:** TASK-3.01 prod serve; PID fresh teyit. `package.json`'a dokunma (Playwright MCP kurulmaz).

---

## Test Kriterleri

- [ ] JS-off → ana içerik okunur (SSG bütün); kritik içerik client-only'ye gömülü değil.
- [ ] Hızlı dil/tema toggle race → UI tutarlı (kırılma yok).
- [ ] Hızlı scroll/anchor zıplama → ScrollTrigger kararlı (takılma/yanlış-konum yok).

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
