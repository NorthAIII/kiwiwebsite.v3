# TASK-9.09: S9 — Adversarial / Holistik Kırma

**Durum:** ⬜ Bekliyor
**Modül:** Tümü (M1–M6) (modules/M1-…M6-…)
**Feature:** S9 senaryo grubu — adversarial/holistik (doğrulama)
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.08 ✅ (lineer sıra; faz son doğrulama task'ı — holistik kapanış)

---

## Hedef

Sistemi bütünsel/adversarial koşullarda kır-denemesiyle doğrula: `next build` **temiz** + 0 `MISSING_MESSAGE` (regresyon tabanı); JS-kapalı SSG okunabilirlik (ana sayfa + alt sayfalar — içerik JS'siz erişilebilir); hızlı dil/tema toggle race (state bozulmaz); hızlı scroll/anchor zıplama (ScrollTrigger kararlı, kayıt/kilit yok). Faz'ın holistik kapanışı. Tamamlanma = build temizliği + JS-off + race senaryoları koşuldu, kararlılık kaydedildi, triyaj yapıldı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S9 araç satırı + Ortam Kararı (temiz build = regresyon tabanı)
- `_dev/memory/lighthouse-lantern-render-timing-korligi.md` yanı MEMORY host-yükü (ölçüm-bitişik gözlemden önce)
- `src/components/living-flow/` (ScrollTrigger/Lenis tek ticker), `tests/e2e/a11y-helpers.ts` (desenler)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.09 durumu + S9 bulgu notu

---

## Alt Görevler

- [ ] **1. Temiz build + MISSING_MESSAGE tabanı**
  - `npm run build` **temiz** (0 error/uyarı-regresyonu); build çıktısında + render'da 0 `MISSING_MESSAGE` (regresyon tabanı)

- [ ] **2. JS-kapalı SSG okunabilirlik (curl)**
  - JS olmadan (curl SSG markup / Playwright `javaScriptEnabled:false`) ana sayfa + alt sayfaların **içeriği okunur** (SSG prerender ground-truth `.next/server/app/*.html`); kritik metin/nav JS'siz erişilebilir

- [ ] **3. Race / kararlılık (standalone Playwright)**
  - Hızlı **dil/tema toggle** ard arda → state bozulmaz, tutarsız render yok
  - Hızlı **scroll/anchor zıplama** → ScrollTrigger kararlı (pin/scrub kilitlenmez, kayıp bölüm yok); scratchpad script (repo dışı)

- [ ] **4. Triyaj & kayıt**
  - Bulgular TK7 triyaj; sonuç task Oturum Kaydı + PHASE-9 notu. Faz genel doğrulama özeti verify-phase'e devredilir

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Playwright script scratchpad'de. -->

```
scratchpad/  (commit'lenmez)
└── s9-adversarial.mjs          # YENİ — standalone Playwright (race) (repo dışı)
_dev/
├── tasks/TASK-9.09.md          # Oturum kaydı + bulgular
├── phases/PHASE-9.md           # Task Listesi 9.09 + S9 notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **Temiz build = S9 çekirdeği + kanonik ortamın tabanı** — build kırmızıysa tüm faz doğrulaması geçersiz; ilk alt görev.
- **JS-off ground-truth = disk prerender** (`.next/server/app/*.html`); stray/stale `next-server` yanlış-negatifine karşı listening-PID teyit (memory).
- **ScrollTrigger race:** Lenis+GSAP tek ticker (QUALITY §3); hızlı zıplamada çift-rAF/pin kilidi aranır.
- Kanonik ortam = fresh prod build; TR cookie; host yükü ölçüm-bitişik gözlemden önce.

---

## Test Kriterleri

- [ ] `next build` temiz; build + render'da 0 `MISSING_MESSAGE` (regresyon tabanı teyit)
- [ ] JS-kapalı SSG'de ana sayfa + alt sayfa içeriği okunur (kritik metin/nav erişilebilir)
- [ ] Hızlı dil/tema toggle race → state bozulmaz
- [ ] Hızlı scroll/anchor zıplama → ScrollTrigger kararlı (kilit/kayıp yok)
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
