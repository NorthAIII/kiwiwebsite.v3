# TASK-11.03: İç link temizliği (`/bunker-os` → `/crew-os`)

**Durum:** ⬜ Bekliyor
**Modül:** M2 (Sayfalar & Bölümler — Hero/Bunker) — `modules/M2-Sayfalar-Bolumler.md`
**Feature:** SEO3 — İç link temizliği (`/bunker-os` → `/crew-os`; kırık link/çift-redirect yok)
**Faz:** Phase 11 (phases/PHASE-11.md)
**Bağımlılıklar:** TASK-11.01 ✅ (`/crew-os` route + redirect canlı olmalı; link doğrudan hedefe gitsin)

---

## Hedef

Ana sayfadaki iç linkleri iç-ad URL'sinden public URL'ye çevir: `Hero.tsx` ve `Bunker.tsx` içindeki `href="/bunker-os"` → `href="/crew-os"`. Bu, kullanıcı navigasyonundaki **çift-redirect'i kaldırır** (link → `/bunker-os` → 308 → `/crew-os` yerine doğrudan `/crew-os`). Tamamlanma: repoda iç `/bunker-os` link referansı kalmaz; iki link doğrudan `/crew-os`'a gider; `next build` temiz, linkler tıklanınca redirect'siz `/crew-os` açılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-11.md` — Çapraz Konular (çift-redirect yok: iç linkler doğrudan `/crew-os` göstermeli)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-11.md` — Task Listesi tablosunda 11.03 durumu (+ faz tamamlanma notu, son task ise)

---

## Alt Görevler

- [ ] **1. Hero iç linki**
  - `src/components/Hero.tsx:115` — `href="/bunker-os"` → `href="/crew-os"`.

- [ ] **2. Bunker teaser iç linki**
  - `src/components/Bunker.tsx:41` — `href="/bunker-os"` → `href="/crew-os"`.

- [ ] **3. Doğrulama**
  - Grep: repoda (src/) kalan iç `/bunker-os` link referansı **kalmadığını** teyit et. (Not: `page.tsx`'teki `@/components/bunker-os/BunkerShowcase` import path'i **link değil**, component dizini — dokunulmaz.)

---

## Etkilenen Dosyalar

```
src/components/Hero.tsx     # href="/bunker-os" → "/crew-os" (l.115)
src/components/Bunker.tsx   # href="/bunker-os" → "/crew-os" (l.41)
```

---

## Dikkat Noktaları

- **Yalnız iç `href` link'leri** değişir — `@/components/bunker-os/BunkerShowcase` **import path'i link değil**, component dizini (iç kod adı, dokunulmaz).
- **Çift-redirect kaldırma amacı:** Link doğrudan `/crew-os`'u göstermeli; `/bunker-os` üzerinden 308-hop bırakma (SEO/craft — gereksiz hop).
- **TASK-11.01 önce tamam olmalı** — `/crew-os` route yoksa link 404 olur. Bu task fazın son adımı; route+redirect zaten canlı.
- **i18n etkisi yok** — link path'i hardcode `/crew-os` (next-intl Link locale prefix'i otomatik ekler; TR prefixsiz, diğerleri prefixli — mevcut davranış korunur).

---

## Test Kriterleri

- [ ] `next build` **temiz** geçer.
- [ ] Grep teyidi: `grep -rn '/bunker-os' src/ --include=*.tsx` → yalnız `page.tsx` import path'i (component) kalır; **iç link kalmaz** (Hero/Bunker temiz).
- [ ] Görsel/curl: ana sayfada Hero CTA + Bunker teaser linkine tıklama **doğrudan** `/crew-os` açar (ara `/bunker-os` 308-hop **yok** — network'te tek istek 200). 5 locale'de link doğru prefix'le çözülür (TR `/crew-os`, EN `/en/crew-os` ...).
- [ ] a11y **korunan taban** regresyonsuz (yalnız href değeri değişti, DOM/görsel aynı).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`fix(TASK-11.03): ...`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-11.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-02 (plan-phase 11)
