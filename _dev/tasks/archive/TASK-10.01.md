# TASK-10.01: Ortak `<Logo>` bileşeni + Nav & PageHeader benimseme

**Durum:** ✅ Tamamlandı
**Modül:** M3 — Etkileşim & UX Primitives (Nav/PageHeader/KiwiMark) + M1 (token)
**Feature:** A1 — Logo/marka işareti hizalama
**Faz:** Phase 10 (phases/PHASE-10.md)
**Bağımlılıklar:** Yok

---

## Hedef

Mark + "Kiwi AI Lab" wordmark lockup'ını tek bir `<Logo>` bileşenine çıkar ve Nav ile PageHeader'da benimse. Üç yüzeydeki (Nav/PageHeader/Footer) kopya-kod lockup'ı — A1 tutarsızlığının kök nedeni — tek kaynağa indirilir; ikon-kutusu ↔ wordmark satır-kutusu optik dikey hizası **tek yerde** çözülür. Bu task Nav + PageHeader'ı (birebir aynı, size 22, link içi lockup) `<Logo>`'ya geçirir; Footer TASK-10.02'de gelir. Tamamlanma: `<Logo>` oluşturuldu, Nav ve PageHeader onu tüketiyor, mark+wordmark her iki yüzeyde dikey hizalı, build temiz, çift-tema görsel doğrulama geçti.

---

## Bağlam

Research-phase 10 kararı: A1 kök nedeni Nav/PageHeader/Footer'daki **kopya-kod** lockup'tır (`Nav.tsx:36-39`, `PageHeader.tsx:13-16`, `Footer.tsx:72-74`). `KiwiMark` SVG'si `viewBox 0 0 48 48` içinde simetrik (dış çember `cx24 cy24 r21`) → ikon dengeli; sorun SVG'de değil, **CSS optik hizada** (line-box ≠ cap-height). Seçilen yaklaşım: ortak `<Logo>` bileşeni (kalıcılık — ILKELER + modülerlik — QUALITY §5). Elenen: yerinde nudge (drift'e açık), SVG-içi düzeltme (yanlış kaldıraç).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-10.md` — Araştırma Bulguları (A1 yüzeyleri, teknik kararlar)
- `_dev/modules/M3-Etkilesim-Primitives.md` — F3.3 (Nav/PageHeader/KiwiMark)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + son task özeti
- `_dev/phases/PHASE-10.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [x] **1. `<Logo>` bileşenini oluştur**
  - Dosya: `src/components/Logo.tsx` (YENİ)
  - `KiwiMark` (mark, `text-green`) + `<span>Kiwi AI Lab</span>` wordmark lockup'ını render eder. **Yalnızca görsel lockup** — saran `<a>`/`<Link>` bileşene dahil DEĞİL (link'i tüketici sağlar; tek focusable kalır).
  - Prop'lar: `size` (mark boyutu, varsayılan 22), tüketicinin wordmark boyut/ağırlık/renk farkını karşılayacak esneklik (Nav/PageHeader: `text-[15px] font-semibold`, ink miras; Footer 10.02: 18/`font-medium`/`text-canvas`). Wordmark rengini `currentColor` mirasına bırak (mark hariç, o `text-green`), böylece Footer'ın `text-canvas` bağlamı otomatik uyar; boyut/ağırlık prop veya className passthrough ile.
  - Optik dikey hizayı burada çöz: wordmark `leading-none`, wrapper `inline-flex items-center`; kalan optik nudge gerekirse **tek yerde** ve görsel doğrulamayla ekle.

- [x] **2. Nav'da `<Logo>`'yu benimse**
  - Dosya: `src/components/Nav.tsx`
  - `Nav.tsx:36-39` — mevcut `<a href="#top" ...>` içindeki `<KiwiMark size={22}.../> + <span>` yerine `<Logo />` koy. Saran `<a>` (data-cursor, group, gap) korunur; `KiwiMark` import'u artık kullanılmıyorsa kaldır.

- [x] **3. PageHeader'da `<Logo>`'yu benimse**
  - Dosya: `src/components/PageHeader.tsx`
  - `PageHeader.tsx:13-16` — `<Link href="/" ...>` içindeki lockup'ı `<Logo />` ile değiştir. Saran `<Link>` korunur; `KiwiMark` import'unu temizle.

---

## Etkilenen Dosyalar

```
src/components/
├── Logo.tsx        # YENİ — ortak mark+wordmark lockup
├── Nav.tsx         # lockup → <Logo>, KiwiMark import temizliği
└── PageHeader.tsx  # lockup → <Logo>, KiwiMark import temizliği
```

---

## Dikkat Noktaları

- **Optik hiza tek yerde:** Amaç ikon-kutusu ↔ wordmark cap-height optik dengesi. `items-center` başlangıç; gerekirse minik `translate-y`/`leading` nudge **yalnız `<Logo>` içinde**. Nav ve PageHeader lockup'ları birebir aynıydı → görsel sonuç ikisinde de aynı olmalı.
- **Tek focusable:** Nav `<a>` / PageHeader `<Link>` tüm lockup'ı sarar → tek tab-stop. `<Logo>` içine ayrı focusable ekleme (memory bağlamı: focus-visible 2px yeşil outline korunur).
- **Mark `aria-hidden`:** `KiwiMark` zaten `aria-hidden`; erişilebilir ad wordmark span'inden gelir. `<Logo>` bu semantiği bozmamalı (wordmark görünür metin kalır).
- **`text-green` marka rengi adaptif token** (`--color-green` light/dark flip'li) — hardcode renk yok, `dark:` variant yok (memory: `tema-fix-html-dark-token-flip`).
- **Wordmark hardcoded** "Kiwi AI Lab" — marka adı, i18n değil (mevcut davranış korunur).
- **CLS≈0:** Lockup boyutu değişmemeli (aynı mark size + aynı font metrikleri) → layout shift yok.

---

## Test Kriterleri

- [x] `npm run build` (veya `next build`) temiz geçer (TS strict, import temizliği dahil).
- [x] Ana sayfa (`/`) Nav logosu: mark + wordmark **dikey hizalı** görünür (light + dark iki tema gözle).
- [x] Bir alt sayfa (örn. `/spor-salonu-yazilimi`) PageHeader logosu: aynı hizalı görünüm (light + dark).
- [x] Nav logosuna tıklama `#top`'a, PageHeader logosuna tıklama `/`'a gider (davranış değişmedi); tek tab-stop.
- [x] a11y regresyon tohumu light+dark 0 ihlal — regresyon yok: `home-a11y.spec.ts` (Nav) + `subpages-a11y.spec.ts` (PageHeader) **52/52 pass**.
- [x] Görsel olarak lockup boyutu/konumu değişmedi (CLS yok).

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
- `src/components/Logo.tsx` oluşturuldu: `KiwiMark` (`text-green`) + `<span>Kiwi AI Lab</span>` lockup'ı, `inline-flex items-center gap-2.5` wrapper. Optik dikey hiza tek yerde: wordmark `leading-none tracking-tight` + wrapper `items-center` (ekstra nudge gerekmedi — görsel doğrulama hizalı çıktı). Prop'lar: `size` (varsayılan 22), `className` (wrapper passthrough), `wordmarkClassName` (boyut/ağırlık/renk passthrough). Wordmark rengi `currentColor` mirası (mark hariç → Footer'ın `text-canvas` bağlamı 10.02'de otomatik uyacak). Saran link bileşene dahil DEĞİL (tüketici sağlar → tek focusable). "use client" gerekmedi (saf sunum).
- `Nav.tsx`: `KiwiMark` import → `Logo`; `Nav.tsx:36` lockup'ı `<Logo wordmarkClassName="text-[15px] font-semibold" />` oldu. Saran `<a>` (`href="#top"`, `data-cursor`, `group`, `items-center`) korundu.
- `PageHeader.tsx`: aynı desen; saran `<Link href="/">` korundu.

**Doğrulama:**
- `npm run build` ✓ temiz (Compiled successfully; lint + TS strict hatasız).
- Playwright a11y regresyon tohumu: `home-a11y.spec.ts` (Nav) + `subpages-a11y.spec.ts` (PageHeader) → **52/52 pass** (light+dark, 5 dil). Regresyon yok.
- Görsel (çift-tema, deviceScaleFactor 2): Nav (`/`) + PageHeader (`/spor-salonu-yazilimi`) logosu her iki temada mark↔wordmark **dikey hizalı**, iki yüzey birebir aynı. CLS≈0 (aynı mark boyutu/font metrikleri; tek eklenen `leading-none` layout kaydırmadı). Tek tab-stop, href davranışı değişmedi (yapısal — Logo'da focusable yok).

**Not (bilinçli sapma):** Task "saran `<a>`'nın gap'i korunur" diyordu; ancak gap artık `<Logo>` içinde (mark↔wordmark arası). Tek-çocuklu flex'te dış `gap-2.5` inert olacağından ölü-kodu bırakmamak için dış link'ten kaldırıldı (`group flex items-center` kaldı). Görsel sonuç birebir aynı (gap 2.5 Logo'da). QUALITY §5 (ölü kod yok).

---

**Oluşturulma:** 2026-07-02 (plan-phase 10)
