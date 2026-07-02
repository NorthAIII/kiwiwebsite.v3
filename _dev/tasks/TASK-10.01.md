# TASK-10.01: Ortak `<Logo>` bileşeni + Nav & PageHeader benimseme

**Durum:** ⬜ Bekliyor
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

- [ ] **1. `<Logo>` bileşenini oluştur**
  - Dosya: `src/components/Logo.tsx` (YENİ)
  - `KiwiMark` (mark, `text-green`) + `<span>Kiwi AI Lab</span>` wordmark lockup'ını render eder. **Yalnızca görsel lockup** — saran `<a>`/`<Link>` bileşene dahil DEĞİL (link'i tüketici sağlar; tek focusable kalır).
  - Prop'lar: `size` (mark boyutu, varsayılan 22), tüketicinin wordmark boyut/ağırlık/renk farkını karşılayacak esneklik (Nav/PageHeader: `text-[15px] font-semibold`, ink miras; Footer 10.02: 18/`font-medium`/`text-canvas`). Wordmark rengini `currentColor` mirasına bırak (mark hariç, o `text-green`), böylece Footer'ın `text-canvas` bağlamı otomatik uyar; boyut/ağırlık prop veya className passthrough ile.
  - Optik dikey hizayı burada çöz: wordmark `leading-none`, wrapper `inline-flex items-center`; kalan optik nudge gerekirse **tek yerde** ve görsel doğrulamayla ekle.

- [ ] **2. Nav'da `<Logo>`'yu benimse**
  - Dosya: `src/components/Nav.tsx`
  - `Nav.tsx:36-39` — mevcut `<a href="#top" ...>` içindeki `<KiwiMark size={22}.../> + <span>` yerine `<Logo />` koy. Saran `<a>` (data-cursor, group, gap) korunur; `KiwiMark` import'u artık kullanılmıyorsa kaldır.

- [ ] **3. PageHeader'da `<Logo>`'yu benimse**
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

- [ ] `npm run build` (veya `next build`) temiz geçer (TS strict, import temizliği dahil).
- [ ] Ana sayfa (`/`) Nav logosu: mark + wordmark **dikey hizalı** görünür (light + dark iki tema gözle).
- [ ] Bir alt sayfa (örn. `/spor-salonu-yazilimi`) PageHeader logosu: aynı hizalı görünüm (light + dark).
- [ ] Nav logosuna tıklama `#top`'a, PageHeader logosuna tıklama `/`'a gider (davranış değişmedi); tek tab-stop.
- [ ] a11y regresyon tohumu light+dark 0 ihlal — regresyon yok (araç zinciri mevcutsa koş): `/` için `home-a11y.spec.ts` (Nav) **ve** bir alt sayfa için `subpages-a11y.spec.ts` (PageHeader; `home-a11y` `/`'ı yükler → PageHeader'ı çalıştırmaz).
- [ ] Görsel olarak lockup boyutu/konumu değişmedi (CLS yok).

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

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-02 (plan-phase 10)
