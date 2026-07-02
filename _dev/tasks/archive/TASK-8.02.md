# TASK-8.02: /bunker-os (Crew OS showcase) derin a11y fix + regresyon tohumu

**Durum:** ✅ Tamamlandı
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

- [x] **1. Sayfayı geçici mühürle-koş, ihlalleri teyit et**
  - `subpages-a11y.spec.ts` `PAGES`'e `/bunker-os` eklendi; 8.01 envanteri girdi olarak alındı (3 desen: `text-green/30` satır 136, `text-canvas/45` satır 203, `text-canvas/50` satır 78+177).

- [x] **2. `text-canvas/NN` dark-inversiyon ihlallerini düzelt (craft-özel)**
  - Bilgi taşıyan label'lar (status "aktif/sırada", "canlı · 4 akış", core badge) → **gerçek kontrast fix** opaklık: `/45`→`/65` (satır 203, her iki tema), `/50`→`/65` (satır 78+177, dark). Tek opaklık değeri her iki temada geçmeli (`dark:` variant KULLANILMADI — proje `html.dark` token-flip ile temalanıyor, `dark:` prefers-color-scheme'e bağlanır → desync). `/65` = worst-case (dark text-xs 4.5 eşiği) için minimal-geçen değer (~5.2:1 marj). `/60`(coreNote)/`/85`(flow label) dokunulmadı (8.01: geçiyor). Global token/adaptif token gerekmedi.

- [x] **3. `text-green/30` adım-no ihlalini düzelt**
  - Faz 4 `HowItWorks` kanıtlı deseni: adım no **dekoratif** (sıra `<h3>` + DOM ile taşınıyor) → `::before content:attr(data-n)` pseudo-element + `aria-hidden="true"`. axe text-node taramaz → görünüm **birebir** (aynı `text-green/30` + `group-hover:text-green`). "Gizleme" değil, dekoratif öğeyi doğru işaretleme (memory: aria-hidden ≠ contrast muafiyeti — ama bu SVG değil pseudo-element deseni, memory'nin önerdiği çözüm).

- [x] **4. `text-pulse` SVG durumunu doğrula**
  - 8.01 teyit etti: `aria-hidden` dekoratif SVG ikon (text-node değil) flag'lenmiyor (Bulgu 0). Dokunulmadı.

- [x] **5. Görsel craft + tema teyidi**
  - Playwright screenshot light+dark: canlı operasyon paneli her iki temada (dark'ta krem'e inversiyon dahil) okunur + muted telemetri estetiği korundu; adım no 01–04 `::before` ile birebir faint-yeşil render; marka-yeşili/imza düzleşmedi, sıfır görsel regresyon. AR `/ar/bunker-os` axe koşusu 0 ihlal + `dir=rtl` (8.01 + bu koşu).

- [x] **6. Mühürle**
  - `/bunker-os` `PAGES`'te kalıcı; `npm run test:e2e` yeşil (5 dil × 2 tema = 10 test 0 ihlal). Ana sayfa a11y light+dark regresyonsuz (aynı koşuda 2 test).

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

- [x] `/bunker-os` × 5 dil (tr/en/ar/de/es) × light+dark axe WCAG-AA **0 ihlal** (`subpages-a11y.spec.ts` yeşil — 10 test).
- [x] Ana sayfa `home-a11y` light+dark 0 ihlal (regresyon yok — aynı koşu 2 test).
- [x] Görsel: light+dark'ta imza/craft korunmuş, sıfır görsel regresyon (Playwright screenshot ile gözle onay).
- [x] AR `/ar/bunker-os`: `dir=rtl` + 0 `MISSING_MESSAGE` (axe koşusu, build temiz) + logical prop bütünlüğü.
- [x] `next build` temiz; i18n parite testi yeşil (Vitest 7 test).

---

## Risk ve Geri Dönüş Planı

- **Global token/opaklık değişimi ana sayfayı kırabilir** → bağlam-özel fix'e öncelik ver; `home-a11y` aynı koşuda guardrail. Kırılırsa fix'i o selektöre daralt.
- **Craft düzleşmesi (marka-yeşili soluklaşır/parlar)** → gözle onay zorunlu; şüphede kullanıcıya getir (craft üst eksen, sessizce feda etme).
- **Rollback:** `git checkout -- src/components/bunker-os/BunkerShowcase.tsx src/app/globals.css` (yalnız bu task'ın dosyaları; spec mühürü ayrı geri alınır).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-01

**Durum:** ✅ Tamamlandı

**Ne yapıldı:**
- **Mühür:** `subpages-a11y.spec.ts` `PAGES`'e `{ label: "bunker-os", path: "/bunker-os" }` eklendi → 5 dil × 2 tema = 10 test aktifleşti (CI-korunan regresyon tohumu, TD6).
- **Fix 1 (adım no, `text-green/30` satır 136 — her iki tema ihlal):** `HowItWorks` deseni — dekoratif adım no `::before content:attr(data-n)` + `aria-hidden="true"`'a taşındı. axe text-node taramaz; görünüm birebir (aynı opaklık + hover). Craft değişimi sıfır.
- **Fix 2-4 (bilgi label'ları, `text-canvas/NN`):** gerçek kontrast fix — opaklık `/45`→`/65` (satır 203 status, her iki tema) ve `/50`→`/65` (satır 78 core badge + 177 live label, dark). `/65` tek değer her iki temada geçer (`dark:` variant KULLANILMADI: `html.dark` token-flip vs prefers-color-scheme desync riski). Worst-case ~5.2:1 marj.
- **Dokunulmayan:** `text-canvas/60` (coreNote 96), `/85` (flow label 194), `/15` ayraç (195), `text-pulse` SVG (85, aria-hidden ikon) — 8.01 hepsinin geçtiğini teyit etmişti.
- **Görsel onay:** Playwright screenshot light+dark (canlı operasyon paneli inversiyon dahil + adım no bölümü) — muted hiyerarşi + marka-yeşili korundu, sıfır regresyon.
- **TD4 milestone kapandı:** tek ham `text-pulse` (SVG, dokunulmaz) + tüm `text-canvas/NN` inversiyonları bu bileşende düzeltildi.

**Test sonuçları:**
- `npm run test:e2e` yeşil — 12 test (home light+dark 2 + bunker-os 5 dil × 2 tema 10), tümü 0 ihlal.
- `npm run test` (Vitest) yeşil — 7 test (i18n parite + smoke).
- `next build` temiz (Playwright webServer prod build; 0 `MISSING_MESSAGE`).

**Değişen dosyalar:** `src/components/bunker-os/BunkerShowcase.tsx` (3 desen fix) · `tests/e2e/subpages-a11y.spec.ts` (mühür). `globals.css` dokunulmadı (bağlam-özel fix yetti).

---

**Oluşturulma:** 2026-07-01
