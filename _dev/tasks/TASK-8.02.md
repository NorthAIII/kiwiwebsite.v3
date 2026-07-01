# TASK-8.02: /bunker-os (Crew OS showcase) derin a11y fix + regresyon tohumu

**Durum:** ⬜ Bekliyor
**Modül:** M2 (BunkerShowcase) + M1 (token, gerekirse) + M6 (tohum)
**Feature:** TD5 (alt-sayfa derin a11y — hotspot) + TD4 (text-pulse/dark-inversion süpürmesi, buraya katlandı)
**Faz:** Phase 8 (phases/PHASE-8.md)
**Bağımlılıklar:** TASK-8.01 (harness + baseline envanteri)

---

## Hedef

`/bunker-os` (Crew OS showcase) sayfasının axe ile teyit edilen WCAG-AA kontrast/markup ihlallerini **craft-koruyarak** düzelt ve sayfayı parametrik harness'e (5 dil × light+dark axe 0 ihlal) **mühürle**. Bu, fazın **asıl fix işidir** (Bulgu 1: BunkerShowcase en yüksek olasılıklı ihlal kaynağı). TD4 (text-pulse ink-panel dark-inversion süpürmesi) milestone'u burada kapanır — çünkü tek ham `text-pulse` (aria-hidden SVG) ve tüm `text-canvas/NN` dark-inversiyonları bu bileşende. Tamamlanmış sayılır: `/bunker-os` × 5 dil × 2 tema axe 0 ihlal (spec'te enforce) + görsel craft korunmuş + guardrail'ler regresyonsuz.

---

## Bağlam

8.01 baseline envanteri BunkerShowcase için beklenen ihlalleri teyit eder (Bulgu 1):
- **`text-canvas/45,50,60,85`** (`BunkerShowcase.tsx:78,96,177,194,203`) — `bg-ink` paneller içinde düşük-opaklık metin. **Dark'ta** panel krem'e döner → düşük-opaklık ink krem üstünde → v0.1 `text-canvas/40`=2.52 fail analogu. Light'ta çoğu geçer, dark asıl risk.
- **`text-green/30`** (`BunkerShowcase.tsx:136`) — "nasıl çalışır" adım numaraları, dinlenmede düşük-kontrast dekoratif (group-hover'da `text-green`'e çıkar). v0.1 adım-no `#8af28a`=1.22 analogu.
- **`text-pulse` SVG** (`:85`) — `aria-hidden` dekoratif ikon (text-node değil) → axe muhtemelen flag'lemez; 8.01 envanteri teyit eder. Flag'lenmezse dokunulmaz (aria-hidden ≠ contrast muafiyeti kuralı text-node içindir; burada path grafiği).

TD4 "süpürme" hedefi (`--color-pulse-ink` yayma) Bulgu 0'da boş çıktı — alt sayfalarda çevrilecek ham `text-pulse` text yok. Bu task'ın gerçek işi yukarıdaki `text-canvas/NN` + `text-green/30` dark-inversiyon fix'leri.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/tasks/TASK-8.01.md` (veya archive) — baseline axe envanteri (bu sayfanın teyitli ihlalleri)
- `_dev/phases/PHASE-8.md` — Bulgu 1 (risk yüzeyi), Dikkat Edilecekler (craft koruması, tema/reveal tuzağı)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.7 (Crew OS showcase)
- `_dev/memory/aria-hidden-color-contrast-muafiyeti-degil.md` — `::before content:attr()` deseni + aria-hidden kuralı
- `src/app/globals.css` — token tanımları (`--color-canvas`, `--color-green`, `--color-pulse-ink` light/dark)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` · `_dev/phases/PHASE-8.md` (Task Listesi)
- `_dev/docs/DECISIONS.md` — yeni bir adaptif token eklenirse veya bağlam-özel fix deseni karar niteliğindeyse

---

## Alt Görevler

- [ ] **1. Sayfayı geçici mühürle-koş, ihlalleri teyit et**
  - `subpages-a11y.spec.ts` `PAGES`'e `/bunker-os` ekle; light+dark 5 dil koş → 8.01 envanterindeki ihlalleri (kural id + selector) somutla.

- [ ] **2. `text-canvas/NN` dark-inversiyon ihlallerini düzelt (craft-özel)**
  - Her teyitli selector için **bağlam-özel** fix: dark panelde krem üstünde okunur olacak opaklık/token seç (global düzleştirme YOK). `text-canvas/85`/`/60` çoğu geçebilir — yalnız axe'ın flag'lediğini değiştir. Fix craft'ı bozmaz: dekoratif hiyerarşi korunur, yalnız kontrast eşiğe çekilir. Gerekirse `--color-canvas`-üstü adaptif token deseni (`--color-pulse-ink` gibi tema-duyarlı) `globals.css`'e eklenir.

- [ ] **3. `text-green/30` adım-no ihlalini düzelt**
  - Dinlenme-hali kontrastını AA'ya çek (Faz 4 `SectorSolutions` analogu: kontrast-geçen yeşil/token). group-hover parlaklaşması korunur. aria-hidden ile "gizleme" DEĞİL (memory: contrast muafiyeti değil) — gerçek kontrast fix.

- [ ] **4. `text-pulse` SVG durumunu doğrula**
  - 8.01 envanteri SVG'yi flag'liyorsa `::before`/token ile çöz; flag'lemiyorsa (beklenen) dokunma, kaydet.

- [ ] **5. Görsel craft + tema teyidi**
  - Light+dark gözle: imza/marka-yeşili düzleşmedi, dekoratif hiyerarşi korundu, sıfır görsel regresyon. AR (`/ar/bunker-os`) `dir=rtl` + logical prop bütünlüğü gözle.

- [ ] **6. Mühürle**
  - `/bunker-os` `PAGES`'te kalıcı; `npm run test:e2e` yeşil (5 dil × 2 tema 0 ihlal). Ana sayfa a11y regresyonsuz (aynı koşuda).

---

## Etkilenen Dosyalar

```
src/components/bunker-os/
└── BunkerShowcase.tsx        # text-canvas/NN + text-green/30 kontrast fix (bağlam-özel)
src/app/globals.css           # adaptif token EKLENİRSE (gerekirse; aksi halde dokunulmaz)
tests/e2e/subpages-a11y.spec.ts  # /bunker-os PAGES'e mühürlenir
```

---

## Dikkat Noktaları

- **Craft üst eksen (Faz 4 disiplini):** fix'ler bağlam-özel + token tek-kaynak + gözle onay; marka-yeşilini/imzayı global düzleştirme YASAK. Yalnız axe'ın flag'lediğini, eşiğe çekecek kadar değiştir.
- **Dark-panel inversiyonu asıl risk:** `bg-ink` panel dark'ta krem → `text-canvas/NN` ink olur. Fix ikisini de (light birebir / dark okunur) sağlamalı — tek temada geçmek yetmez.
- **Global token değişirse ana sayfa a11y=100'ü etkiler** → aynı koşuda `home-a11y` guardrail'i yakalar. Bu yüzden mümkünse bağlam-özel opaklık, global token yalnız gerçekten paylaşılan bir desen içinse.
- **aria-hidden ≠ contrast muafiyeti** (memory): dekoratif düşük-kontrastı `aria-hidden` ile "çözme"; gerçek kontrast fix veya `::before content:attr()` pseudo-element.
- **Lighthouse a11y=100 skor gate'i verify-phase'de** (manuel ölçüm, CI'daki axe'tan ayrık — research kararı). Bu task'ın enforce ettiği gate = axe 0.
- **Yeni i18n anahtarı beklenmiyor** (CSS/renk düzeyinde fix). Gerekirse 5 dile eşzamanlı (parite testi kapsar).

---

## Test Kriterleri

- [ ] `/bunker-os` × 5 dil (tr/en/ar/de/es) × light+dark axe WCAG-AA **0 ihlal** (`subpages-a11y.spec.ts` yeşil).
- [ ] Ana sayfa `home-a11y` light+dark 0 ihlal (regresyon yok).
- [ ] Görsel: light+dark'ta imza/craft korunmuş, sıfır görsel regresyon (gözle onay).
- [ ] AR `/ar/bunker-os`: `dir=rtl` + 0 `MISSING_MESSAGE` + logical prop bütünlüğü.
- [ ] `next build` temiz; i18n parite testi yeşil.

---

## Risk ve Geri Dönüş Planı

- **Global token/opaklık değişimi ana sayfayı kırabilir** → bağlam-özel fix'e öncelik ver; `home-a11y` aynı koşuda guardrail. Kırılırsa fix'i o selektöre daralt.
- **Craft düzleşmesi (marka-yeşili soluklaşır/parlar)** → gözle onay zorunlu; şüphede kullanıcıya getir (craft üst eksen, sessizce feda etme).
- **Rollback:** `git checkout -- src/components/bunker-os/BunkerShowcase.tsx src/app/globals.css` (yalnız bu task'ın dosyaları; spec mühürü ayrı geri alınır).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [durum]

**Yapılanlar:**
- [...]

---

**Oluşturulma:** 2026-07-01
