# TASK-15.05: Neden Alpfit Plus bölümü (why-list + koyu aside, ink-panel inversion)

**Durum:** ⬜ Bekliyor
**Modül:** M2 (Sayfalar & Bölümler) + M1 (ink-panel token deseni) + M4 (i18n)
**Feature:** AP1 (port+bölümler) · AP2 (i18n namespace)
**Faz:** Phase 15 (phases/PHASE-15.md)
**Bağımlılıklar:** TASK-15.01 (kabuk + namespace kökü + `--color-surface`)

---

## Hedef

Artifact'ın "Neden Alpfit Plus" bölümünü porla: sol `why-list` (5 madde — ilki `lead` kartı "Diyetisyen aynı platformda" + "İncelediğimiz 18 rakip üründe yok" badge'i; diğer 4 düz madde) + sağ **koyu aside** (soru + kaynak). Aside artifact'ta `--band` (koyu); site konvansiyonu gereği **ink-panel inversion** (`bg-ink text-canvas` + `--color-pulse-ink` aksan) — yeni `--band-*` token'ı YOK. İki-sütun (`1.12fr / 1fr`, mobilde tek). `AlpfitShowcase`'e bağlanır. Tamamlanma: bölüm 5 dilde render, koyu aside çift-temada okunur, `next build` temiz.

---

## Bağlam

Research kararı (§3): koyu panel (fiyat bandı **ve** "Neden" aside) **site ink-panel inversion deseni** kullanır — `bg-ink` + `--color-pulse-ink` (TD4/Faz 8'de a11y-mühürlü, Crew OS bandıyla tutarlı). Davranış: light'ta koyu/krem-metin, **dark temada krem'e döner** (site konvansiyonu, bug değil). Bu task ink-panel'i ilk uygular (aside); TASK-15.06 fiyat bandında aynı deseni tekrar kullanır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/alpfit-plus-artifact.html` — Why HTML **L660-685** (why-list 5 madde + aside); Why CSS **L226-251**
- `_dev/phases/PHASE-15.md` — Araştırma Bulguları §3 (ink-panel inversion kararı) + "Dikkat Edilecekler" (fiyat bandı ink-panel)
- `_dev/MEMORY.md` — `tema-fix-html-dark-token-flip` + `a11y-olcum-tema-tuzagi` (koyu panel çift-tema tuzağı)
- `src/components/bunker-os/BunkerShowcase.tsx` — ink-panel + `--color-pulse-ink` mevcut kullanım (referans, varsa)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md`, `_dev/phases/PHASE-15.md` (Task Listesi)

---

## Alt Görevler

- [ ] **1. `AlpfitWhy` bileşeni — why-list**
  - `src/components/alpfit/AlpfitWhy.tsx` (YENİ, `"use client"`): section-head (`alpfit.why.{eyebrow,title}`) + iki-sütun grid. Sol `why-list`: `lead` kartı (yeşil-tint zemin `bg-green/[.08]` + border, başlık + açıklama + `badge` "18 rakip") + 4 düz madde (`items.{mobile,multibranch,nohardware,singlesource}` — başlık + açıklama, üst-border ayraç).
  - i18n: `alpfit.why.{eyebrow,title,lead.{t,d,badge},items.{mobile,multibranch,nohardware,singlesource}.{t,d}}` (5 dil; TR yetkili artifact L664-677).

- [ ] **2. Koyu aside — ink-panel inversion**
  - Sağ `<aside>`: `bg-ink text-canvas` panel (artifact `--band` yerine), soru (`why.asideQ` — vurgulu segment `--color-pulse-ink`/`t.rich`) + kaynak (`why.asideSrc`, `text-canvas/55` muted, üst-border). `--band-*` token EKLENMEZ.
  - i18n: `alpfit.why.{asideQ, asideQmark, asideSrc}` (5 dil; TR yetkili artifact L680-681). Vurgu ("kaç randevuya gelinmedi") `t.rich` veya parça-anahtar.

- [ ] **3. Kabuğa bağla**
  - `AlpfitShowcase`: özelliklerden sonra `<AlpfitWhy/>`.

---

## Etkilenen Dosyalar

```
src/components/alpfit/AlpfitShowcase.tsx    # AlpfitWhy bağlanır — zaten var
src/components/alpfit/AlpfitWhy.tsx         # YENİ — why-list + koyu aside (ink-panel)
messages/tr.json                            # alpfit.why.* — TR yetkili
messages/en.json                            # alpfit.why.* — TR kopyası (stale)
messages/ar.json                            # alpfit.why.* — TR kopyası (stale)
messages/de.json                            # alpfit.why.* — TR kopyası (stale)
messages/es.json                            # alpfit.why.* — TR kopyası (stale)
```

> `--color-pulse-ink` zaten repo (globals.css:17,49 — TD4). Yeni token yok.

---

## Dikkat Noktaları

- **Koyu aside = ink-panel inversion (KRİTİK):** `bg-ink text-canvas` + pulse aksanı `--color-pulse-ink`. Yeni `--band-*` YOK. Dark temada panel **krem'e döner** — beklenen (MEMORY `tema-fix-html-dark-token-flip`). **axe çift-tema doğrulaması ŞART** (MEMORY `a11y-olcum-tema-tuzagi`): aside metni + badge + muted `text-canvas/55` light+dark AA geçmeli.
- **Badge "18 rakip" dürüstlük:** "İncelediğimiz 18 rakip üründe yok" — gerçek inceleme, sayı **aynen** kalır (ILKELER dürüstlük konvansiyonu; discuss kararı).
- **RTL (AR):** iki-sütun + `why-item` üst-border + `badge`/madde işareti logical prop'larla; `border-l` (aside kaynak) → `border-s`. Physical yok.
- **reduced-motion:** `<Reveal>` no-op görünür.
- **i18n:** yapısal anahtar 5 dilde eşzamanlı; isimli-anahtar + map.

---

## Test Kriterleri

- [ ] `next build` temiz: 5 locale SSG, 0 `MISSING_MESSAGE`, 0 warn.
- [ ] `npm run test` yeşil: `i18n-parity` `why.*` eşzamanlı (5 dil).
- [ ] Route render: why-list 5 madde (lead + badge + 4 düz) + koyu aside (soru + kaynak) 5 dilde.
- [ ] **Koyu aside çift-tema:** light'ta koyu panel/krem metin, dark'ta krem panel/koyu metin — ikisinde de okunur (görsel + axe).
- [ ] "İncelediğimiz 18 rakip üründe yok" badge'i aynen mevcut.
- [ ] (Sandbox koşarsa) axe light+dark yeşil — aside kontrastı dahil.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler + test kriterleri
- [ ] Git commit & push (`feat(TASK-15.05): ...`)
- [ ] Bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
