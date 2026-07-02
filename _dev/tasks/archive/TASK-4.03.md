# TASK-4.03: `--color-ink-faint` token koyulaştırma (color-contrast — A11Y1-b)

**Durum:** ✅ Tamamlandı
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

- [x] **1. Light token koyulaştır**
  - `src/app/globals.css:11` — `--color-ink-faint: #8b8d83;` → `#67695f`

- [x] **2. Dark token koyulaştır**
  - `src/app/globals.css:35` (html.dark) — `--color-ink-faint: #7d8073;` → `#8a8c80`

- [x] **3. Craft taraması — tüketen yüzeyler (her iki tema)**
  - Yukarıdaki "Tüketen yüzeyler" listesini gözle gez: muted/ikincil hiyerarşi korunuyor mu, prominent'e dönmedi mi?
  - Hero scroll-cue (`Hero.tsx:140-142` `text-ink-faint` + `bg-ink-faint/40`) ve placeholder'lar (BulletinSubscribe/Chatbot) makul görünüyor mu?

- [x] **4. Doğrula (build + axe)**
  - `next build` temiz
  - axe ana sayfa (light + dark): `text-ink-faint` öğeleri `color-contrast` flag'lemiyor

---

## Etkilenen Dosyalar

```
src/app/
└── globals.css   # --color-ink-faint: light #8b8d83→#67695f (L11), dark #7d8073→#8a8c80 (L35)
```

> Tek dosya değişir; etki çok yüzeylidir (token yayılımı). Tüketen bileşenler **değişmez** — yalnız token koyulaşır.

---

## Dikkat Noktaları

- **Hue değil opaklık/soluk-token.** `text-green` solid zaten geçiyor — yeşil token'a DOKUNMA (imza korunur). Yalnız `--color-ink-faint` koyulaşır.
- **Light + dark birlikte** (F1.4 edge case: yeni/değişen renk hem light hem dark tanımlanmalı). Dark değer ayrı hesaplandı (`#8a8c80`).
- **Craft taraması zorunlu:** token tüm sayfalara yayılır → "faint" muted kalmalı, prominent olmamalı (ILKELER §1). Liste yukarıda.
- **Perf/CLS regresyon yok:** yalnız renk değeri; layout/asset/JS dokunulmaz → CLS=0.
- **Çift-tema:** Kanonik Lighthouse koşusu **dark** render eder (TASK-4.01 DEV-1); ink-faint dark değeri (`#8a8c80`) de hesaplandı. Her iki tema axe ile teyit (her iki değer 4.5'i geçiyor: light `#67695f` 5.16/4.76, dark `#8a8c80` 5.38/4.92).
- i18n etkisi yok.

---

## Test Kriterleri

- [x] `next build` temiz geçer
- [x] axe ana sayfa **light**: `text-ink-faint` öğeleri `color-contrast` flag'lemiyor
- [x] axe ana sayfa **dark**: `text-ink-faint` öğeleri `color-contrast` flag'lemiyor
- [x] Craft: tüketen yüzeylerde (Hero/SectorSolutions/Forum/Chatbot/CaseStudies/makaleler/GymShowcase/BunkerShowcase) faint hiyerarşi muted korundu (gözle, her iki tema)
- [x] Yeşil imza renk değişmedi (token'a dokunulmadı)

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `src/app/globals.css` tek dosyada iki token değeri koyulaştırıldı: light L11 `--color-ink-faint: #8b8d83 → #67695f`, dark L35 (html.dark) `#7d8073 → #8a8c80`. Tüketen bileşenler değişmedi (token yayılımı).
- Craft taraması (light+dark, gözle + hesaplanan değer): faint hiyerarşisi her iki temada korundu — ink (`#12140f`/`#f2f1e8`) > ink-soft (`#4a4d44`/`#b7b9ac`) > ink-faint, faint hâlâ üçünün en muted'ı. Hero etiketleri ("Şu an canlı"/"İşletim katmanı"), scroll-cue ("Kaydır"), SectorSolutions eyebrow ("SPOR SALONLARI · TEK OTOMASYON") muted/ikincil kaldı, prominent'e dönmedi (ekran görüntüsü teyidi).

**Sorunlar:**
- Playwright modülü (npx cache) CJS export + chromium revizyon uyumsuzluğu (1226 bekliyor, cache'te 1228): `import pkg` default + `executablePath`'i `chromium_headless_shell-1228` binary'sine pinleyerek çözüldü. axe-core 4.11.4 (kanonik) cache'ten enjekte edildi.

**Kararlar:**
- DECISIONS'a yeni giriş eklenmedi: Gerekçe — K2 token koyulaştırma kararı (tam hex değerleriyle) zaten DECISIONS 2026-06-29 girişinde kayıtlı; tekrar = drift (Doküman Disiplini).
- docs/DECISIONS.md'ye eklendi: Hayır

**Dosya Değişiklikleri:**
- `src/app/globals.css` → `--color-ink-faint` light `#8b8d83→#67695f` (L11), dark `#7d8073→#8a8c80` (L35)

**Test Sonuçları:**
- `next build`: temiz (exit 0, 37 sayfa).
- Fresh-prod-serve `:4173` (listening-PID 122997 teyit = fresh process; stray 9077 dokunulmadı). axe-core 4.11.4 + Playwright (reducedMotion + full-page scroll), `NEXT_LOCALE=tr` cookie:
  - **Light:** 6 color-contrast ihlal node'u, **`text-ink-faint` içeren = 0**. Kalan: `text-canvas/40,45` (footer "Dil/©", Bunker panel "aktif/sırada") → TASK-4.04 kapsamı.
  - **Dark:** 11 ihlal node'u, **`text-ink-faint` içeren = 0**. Kalan: `text-pulse` 01/02/03 + "Canlı ürünü gör" → TASK-4.07; `text-canvas/40,45,50` → TASK-4.04.
  - Teyit: 8 `.text-ink-faint` öğesi DOM'da mevcut, hesaplanan renk light `rgb(103,105,95)`=#67695f / dark `rgb(138,140,128)`=#8a8c80 → gizlenmedi, geçiyor. Yeşil token dokunulmadı (dark `text-pulse` hâlâ `#8af28a`).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-29

**Ne Yapıldı:**
- `--color-ink-faint` tasarım token'ı light+dark koyulaştırıldı (K2); WCAG AA'yı geçecek tek-kaynak değişim, tüm tüketen yüzeylere tutarlı yayıldı. Ana sayfada `text-ink-faint` öğeleri artık color-contrast denetiminden çıktı (her iki tema), faint craft hiyerarşisi ve yeşil imza korundu.

**Öğrenilenler:**
- Token tek-kaynak değişimi öğe-bazlı swap'a göre hem cerrahi hem bakım-dostu çıktı (QUALITY §5 teyit); craft riski "koyulaşınca prominent olur mu" sorusuydu, hiyerarşi (ink>ink-soft>ink-faint) matematiksel olarak korunduğu için risk gerçekleşmedi.

---

**Oluşturulma:** 2026-06-29
