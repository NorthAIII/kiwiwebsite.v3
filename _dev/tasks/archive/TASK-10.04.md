# TASK-10.04: Hero scroll göstergesi ölçekleme

**Durum:** ✅ Tamamlandı
**Modül:** M2 — Sayfalar & Bölümler (Hero) + M1 (token)
**Feature:** A3b — Hero scroll göstergesi ölçekleme
**Faz:** Phase 10 (phases/PHASE-10.md)
**Bağımlılıklar:** Yok (A3a'dan bağımsız; aynı dosya — 10.03 sonrası çalışılır, lineer)

---

## Hedef

Hero'nun merkez-alt "Kaydır" scroll göstergesini (`Hero.tsx:140-143`) anıtsal hero'ya (clamp 6rem başlık) orantılı olacak şekilde ölçekle — kullanıcı geri bildirimi "çok küçük". 40px hairline çizgi + 11px etiket orantısız/kayıp kalıyor. Çizgiyi ve/veya etiketi orantıla (daha uzun çizgi, biraz daha okunur ağırlık/opaklık); `w-px` + `/40` hairline'ın DPR-kırılganlığı da bu işle birlikte biraz daha sağlam bir çizgiyle gözden geçirilir. Merkez-alt konum + `hidden md:flex` (desktop-only) **korunur** — yeni mobil öğe eklenmez. Tamamlanma: gösterge hero ölçeğine orantılı, merkez-alt/desktop-only korundu, çift-tema a11y=100, CLS yok, build temiz.

---

## Bağlam

Research-phase 10: Merkez-alt gösterge `Hero.tsx:140-143` — `absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex`, `text-[11px]` etiket + `h-10 w-px animate-pulse bg-ink-faint/40` çizgi. Ayrı bir "sağ" scroll öğesi **yok** (tüm bileşenler tarandı) → REVIZE-BACKLOG'daki "sağdaki" perception artefaktı. Kullanıcı kararı: ölçek büyütme/orantılama ("çok küçük"). Discuss kapsam-dışı: yeni mobil scroll-cue (`hidden md:flex` desktop-only kalır). Bu, A3'ün mevcut göstergenin ölçek düzeltmesidir — yeni öğe değil.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-10.md` — Araştırma Bulguları (A3b: gösterge ölçeği, hairline DPR notu, kapsam-dışı mobil öğe)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.2 Hero

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + son task özeti
- `_dev/phases/PHASE-10.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [x] **1. Gösterge çizgisini ve etiketini orantıla**
  - Dosya: `src/components/Hero.tsx` (satır 140-143)
  - Çizgiyi uzat (`h-10` → hero ölçeğine orantılı, örn. `h-14`/`h-16`; görsel doğrulamayla kesinleştir) ve/veya etiketi biraz daha okunur yap (`text-[11px]` → hafif büyütme veya ağırlık/opaklık). Merkez-alt + desktop-only (`hidden md:flex`) + `bottom-7 left-1/2 -translate-x-1/2` konumu korunur.
  - **Hairline sağlamlaştırma:** `w-px` + `bg-ink-faint/40` DPR'de kırılgan — çizgiyi biraz daha sağlam yap (örn. opaklığı artır veya token'la net görünür kıl). Çizgi rengi **adaptif token** kalır (`--color-ink-faint`; `dark:` variant YOK).

- [x] **2. animate-pulse & konum kontrolü**
  - Mevcut `animate-pulse` korunur (reduced-motion global catch-all'da susar). Gösterge `absolute` (akış-dışı) → hero flex'ini kaydırmaz.

---

## Etkilenen Dosyalar

```
src/components/
└── Hero.tsx   # scroll göstergesi (satır 140-143): çizgi/etiket ölçek + hairline sağlamlaştırma
```

---

## Dikkat Noktaları

- **Merkez-alt + desktop-only korunur:** `hidden md:flex`, `bottom-7 left-1/2 -translate-x-1/2` değişmez — yeni mobil öğe eklenmez (discuss kapsam-dışı; A3 = mevcut göstergenin ölçek düzeltmesi).
- **CLS≈0:** Gösterge `absolute` (akış-dışı, hero flex'ini etkilemez) → ölçek büyütmesi layout shift yaratmaz. Yine de büyütülen çizgi/etiket viewport alt kenarını taşırmamalı (`bottom-7` içinde kalmalı; gerekirse konumu görsel doğrula).
- **Çift-tema a11y=100:** Etiket metin (`text-ink-faint`) her iki temada color-contrast geçmeli — mevcut token korunur (taban a11y=100). Çizgi dekoratif (metin değil), color-contrast kuralına tabi değil ama görsel token adaptif kalır. Ölçüm light+dark iki koşu (memory: `a11y-olcum-tema-tuzagi`). Etiketi büyütmek kontrastı düşürmez (renk aynı token) — güvenli.
- **Adaptif token disiplini:** Çizgi/etiket rengi `--color-ink-faint` (light/dark flip'li). Tailwind `dark:` variant YOK (memory: `tema-fix-html-dark-token-flip`).
- **Reduced-motion:** `animate-pulse` global catch-all'da (`globals.css:107-119`) ~0ms'e iner → statikte de gösterge okunur kalmalı (opaklık/ölçek dinlenmede yeterli).
- **GSAP dokunulmaz:** Gösterge `[data-hero]` timeline'ının dışında (ayrı `absolute` blok) → giriş animasyonu etkilenmez.
- **Craft:** Minimal/cerrahi — hairline'ın zarif immersive hissi korunur, "template scroll-cue" (iri chevron/mouse-ikon klişesi) girmez (zero template smell — ILKELER).

---

## Test Kriterleri

- [x] `npm run build` temiz geçer.
- [x] Scroll göstergesi çizgi/etiket hero başlığına **orantılı** görünür — artık "çok küçük" değil (light + dark iki tema, desktop viewport gözle: 64px çizgi + 12px etiket).
- [x] Merkez-alt konum korundu; mobilde (< md) gösterge **hâlâ gizli** (`hidden md:flex` → mobil `display:none`).
- [x] Hairline çizgi DPR'de net görünür (opaklık /40→/60; `w-px` crisp korundu).
- [x] Ölçek büyütmesi hero kompozisyonunu/istatistik şeridini kaydırmadı (CLS yok — akış-dışı absolute; cluster gap 28px sabit).
- [x] `/` a11y regresyon tohumu (`home-a11y.spec.ts`, axe WCAG-AA) light+dark 0 ihlal — **2/2 geçti**.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `Hero.tsx` merkez-alt scroll göstergesi (satır 146-149) anıtsal hero'ya orantılandı:
  - Çizgi: `h-10` (40px) → `h-16` (64px); `w-px` crisp hairline **korundu** (kalın border değil, zarif kalır).
  - Robustness: `bg-ink-faint/40` → `bg-ink-faint/60` — DPR'de daha net; adaptif token (`--color-ink-faint`, `dark:` YOK).
  - Etiket: `text-[11px]` → `text-xs` (12px) — hafif okunurluk artışı; ağırlık default (restraint korundu).
  - Gap: `gap-2` → `gap-3` — büyüyen ölçeğe nefes.
  - **Korunan:** `bottom-7 left-1/2 -translate-x-1/2 hidden md:flex` + `animate-pulse` aynen.

**Son Yaklaşım:** Cerrahi CSS ölçek düzeltmesi; renk token'ına dokunulmadı, yeni öğe/i18n anahtarı yok. Gösterge `absolute` (akış-dışı) → CLS güvenli.

**Sonraki Adım Detayı:** Task tamam — faza kalan task yok (10.01–10.04 ✅). Sıradaki DevFlow adımı `verify-phase 10` (UAT).

**Test Sonuçları:**
- `npm run build` temiz geçti ✓
- Playwright a11y (`home-a11y.spec.ts`) **2/2** — WCAG-AA 0 ihlal, light+dark ✓
- Görsel doğrulama (Chrome, `channel:'chrome'` + swiftshader, `NEXT_LOCALE=tr`, reduced-motion):
  - light+dark: gösterge görünür, etiket "KAYDIR" fontSize=**12px**, çizgi yüksekliği=**64px**, genişlik=**1.00px** (crisp), opaklık=**0.6**; renk token light↔dark **flip** ediyor (oklab farklı).
  - Konum: cluster viewport-alt gap = **28px** (`bottom-7` korundu); element yukarı doğru büyüdü, alt taşma yok.
  - Mobil (375px): `display:none` — `hidden md:flex` (desktop-only) korundu ✓
  - Screenshot'lar (light+dark): orantılı, crisp hairline; template klişesi (chevron/mouse) yok, imza korundu.

---

**Oluşturulma:** 2026-07-02 (plan-phase 10)
