# TASK-4.03: `--color-ink-faint` token koyulaştırma (color-contrast — A11Y1-b)

**Durum:** ⬜ Bekliyor
**Modül:** M1 (Tasarım Sistemi) — F1.4 token & dark mode
**Feature:** A11Y1 (renk kontrastı WCAG AA) — soluk gri etiketler
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** TASK-4.01 ✅ (teyitli envanter)

---

## Hedef

`--color-ink-faint` tasarım token'ını tek kaynaktan koyulaştırarak `text-ink-faint` kullanan soluk gri metinleri WCAG AA eşiğine (4.5:1 küçük metin) çıkarmak. Light `#8b8d83` (canvas 3.11 ❌) → **`#67695f`** (canvas 5.16 ✅ / canvas-deep 4.76 ✅); dark `#7d8073` (4.17 ❌) → **`#8a8c80`** (canvas 5.38 ✅ / canvas-deep 4.92 ✅). Token değişimi `globals.css`'te tek yerden tüm `text-ink-faint` yüzeylerine tutarlı yayılır (öğe-bazlı swap'a göre daha kalıcı ve bakım-dostu — QUALITY §5, ILKELER kalıcılık). Tamamlanma: token koyulaştırıldı (light+dark), build temiz, axe ana sayfada `text-ink-faint` öğelerini artık flag'lemiyor (her iki tema), "faint" hiyerarşisi tüm tüketen yüzeylerde gözle muted kalıyor (prominent olmadı).

---

## Bağlam

Araştırma kararı **K2**. Kritik düzeltme: `text-green` (solid) zaten geçer (4.96) → **hue sorun değil, opaklık/soluk-token sorunudur** (discuss-phase'in "bright #8af28a → koyu yeşil varyant" varsayımı stale baseline'a dayanıyordu; kod zaten `#1f7a3d` kullanıyor). Reddedilen alternatif: öğe-bazlı `text-ink-soft` swap → iki muted gri tutarsızlığı + bakım maliyeti (QUALITY §5). Token yaklaşımı seçildi: tek kaynak, sistem-uyumlu.

**Tüketen yüzeyler (grep ile teyitli — craft taraması bu listeyi kapsamalı):** ana sayfa: `Hero.tsx` (stat etiketleri — dt; ayrıca TASK-4.05'te markup değişir ama `text-ink-faint` class kalır), `HowItWorks` (yok), `SectorSolutions.tsx:86,153`, `Forum.tsx:47,76,87`, `Bunker.tsx` (yok — cream-on-ink ayrı, TASK-4.04), `Chatbot.tsx:103,133`, `BulletinSubscribe.tsx:36` (placeholder); alt sayfalar (kapsam-içi token yayılımı): `CaseStudies.tsx:188`, `forum/ArticleAiSdr.tsx`, `forum/ArticleClaude.tsx`, `gym/GymSoftwareShowcase.tsx:136`, `bunker-os/BunkerShowcase.tsx:167,225`.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — "Değerlendirilen Yaklaşımlar" A11Y1-b + K2 + Kontrast Envanteri
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — F1.4 (token sistemi, "yeni renk eklerken hem light hem dark")
- `_dev/QUALITY.md` — §5 Modülerlik/Bakım, §1 Marka & Craft

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.03 durumu
- `_dev/docs/DECISIONS.md` — (opsiyonel) token değeri kalıcı tasarım-sistemi değişikliği; run-task bunu DECISIONS'a almaya değer görürse kısa satır ekler (zorunlu değil)

---

## Alt Görevler

- [ ] **1. Light token koyulaştır**
  - `src/app/globals.css:11` — `--color-ink-faint: #8b8d83;` → `#67695f`

- [ ] **2. Dark token koyulaştır**
  - `src/app/globals.css:36` (html.dark) — `--color-ink-faint: #7d8073;` → `#8a8c80`

- [ ] **3. Craft taraması — tüketen yüzeyler (her iki tema)**
  - Yukarıdaki "Tüketen yüzeyler" listesini gözle gez: muted/ikincil hiyerarşi korunuyor mu, prominent'e dönmedi mi?
  - Hero scroll-cue (`Hero.tsx:140-142` `text-ink-faint` + `bg-ink-faint/40`) ve placeholder'lar (BulletinSubscribe/Chatbot) makul görünüyor mu?

- [ ] **4. Doğrula (build + axe)**
  - `next build` temiz
  - axe ana sayfa (light + dark): `text-ink-faint` öğeleri `color-contrast` flag'lemiyor

---

## Etkilenen Dosyalar

```
src/app/
└── globals.css   # --color-ink-faint: light #8b8d83→#67695f (L11), dark #7d8073→#8a8c80 (L36)
```

> Tek dosya değişir; etki çok yüzeylidir (token yayılımı). Tüketen bileşenler **değişmez** — yalnız token koyulaşır.

---

## Dikkat Noktaları

- **Hue değil opaklık/soluk-token.** `text-green` solid zaten geçiyor — yeşil token'a DOKUNMA (imza korunur). Yalnız `--color-ink-faint` koyulaşır.
- **Light + dark birlikte** (F1.4 edge case: yeni/değişen renk hem light hem dark tanımlanmalı). Dark değer ayrı hesaplandı (`#8a8c80`).
- **Craft taraması zorunlu:** token tüm sayfalara yayılır → "faint" muted kalmalı, prominent olmamalı (ILKELER §1). Liste yukarıda.
- **Perf/CLS regresyon yok:** yalnız renk değeri; layout/asset/JS dokunulmaz → CLS=0.
- **Dark Lighthouse-dışı:** Lighthouse light ölçer; dark kontrastı axe ile teyit (her iki değer de 4.5'i geçiyor).
- i18n etkisi yok.

---

## Test Kriterleri

- [ ] `next build` temiz geçer
- [ ] axe ana sayfa **light**: `text-ink-faint` öğeleri `color-contrast` flag'lemiyor
- [ ] axe ana sayfa **dark**: `text-ink-faint` öğeleri `color-contrast` flag'lemiyor
- [ ] Craft: tüketen yüzeylerde (Hero/SectorSolutions/Forum/Chatbot/CaseStudies/makaleler/GymShowcase/BunkerShowcase) faint hiyerarşi muted korundu (gözle, her iki tema)
- [ ] Yeşil imza renk değişmedi (token'a dokunulmadı)

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

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-06-29
