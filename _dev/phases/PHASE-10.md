# Phase 10: Görsel Cila (A1 logo + A3 CTA affordance & scroll göstergesi)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.3'ün ilk (en dar/güvenli) içerik fazı — saf CSS/görsel craft cilası. Üç görsel kusur giderilir: (A1) marka işareti/logo hizalaması, (A3) ana sayfa CTA kartlarının (Hero istatistik şeridi) tıklanabilir görünmemesi, ve (A3) Hero scroll göstergesinin ölçek/konum bozukluğu. İmza, davranış ve içerik değişmez; yalnız görsel algı düzeltilir.

**Milestone:** Logo her yüzeyde (Nav + varsa PageHeader/Footer) hizalı/tutarlı **ve** Hero CTA kartları görsel olarak tıklanabilir (ince/zarif affordance) **ve** scroll göstergesi doğru ölçekli/konumlu — guardrail'ler regresyonsuz: a11y=100 çift-tema, perf korunan taban, CLS≈0, i18n 5-dil parite.

### Feature Listesi

(MODULE-MAP ve modules/ referansı; kaynak: `docs/REVIZE-BACKLOG.md` A1/A3)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| A1: Logo/marka işareti hizalama | M3 (Nav/PageHeader) + M1 (token) | KiwiMark'ın göründüğü tüm yüzeylerde (Nav + varsa PageHeader + Footer) dikey/yatay hizası tutarlı |
| A3a: Hero CTA kartı affordance | M2 (Hero) + M3 | İstatistik şeridindeki Alpfit/Crew OS `<Link>`'leri ince/zarif ipuçlarıyla tıklanabilir görünür |
| A3b: Hero scroll göstergesi ölçekleme | M2 (Hero) + M1 | Merkez-alt "Kaydır" göstergesi doğru ölçek/konumda |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 10` oturumunda dolduruldu (2026-07-02).

### Alınan Kararlar

- **Faz kapsamı = yalnızca Görsel cila (A1 + A3):** v0.3 near-term'deki üç konudan (Görsel cila / B1 Living Flow nabız / SEO redirect) ilk ve en dar/güvenli olanı. Gerekçe: "task küçük, faz dar" ilkesi + B1 karar-gate'li imza riski taşır, SEO çapraz-modül (M6+M2+M4) rename işidir → görsel cila ile karıştırmak fazı bulanıklaştırır. B1 ve SEO ayrı fazlar.
- **A1 kapsamı = marka işareti her yüzeyde tutarlı:** Yalnız Nav değil; KiwiMark nerede görünüyorsa (Nav + varsa PageHeader alt-sayfa başlığı + Footer) hizalı/tutarlı. Tutarlılık craft gereği; hangi yüzeylerde göründüğünün kod-teyidi research-phase'de.
- **A3 CTA affordance = ince/zarif:** Hafif kart sınırı / hover-altı çizgi / ok (→) gibi ince ipuçları. Gerekçe: Craft en üst eksen (ILKELER) — "zero template smell" korunur, generic SaaS buton/dolgu-kart hissi (template smell) girmez. Kartlar zaten `<Link>` (davranış doğru), sorun yalnız görsel affordance.
- **A3 scroll göstergesi = merkez-alt gösterge:** Hedef, Hero'nun merkez-alt "Kaydır" + dikey çizgi göstergesi (`Hero.tsx:140-143`, `left-1/2 hidden md:flex`). REVIZE-BACKLOG'daki "sağdaki" ifadesi büyük ekranda merkez≈sağ-stat hizası algısından; ayrı bir sağ-taraf scroll öğesi **yok** (tüm bileşenler tarandı). Tam kusurun (boyut mu/konum mu) damgası research/plan'da.

### Kullanıcı Tercihleri

- Craft-first: her üç düzeltmede de mevcut sofistike estetik korunur, minimal/cerrahi müdahale.
- i18n: faz saf görsel — `scroll`, `stats.*` anahtarları 5 dilde zaten var; **yeni i18n anahtarı gerekmez** (parite otomatik korunur).

### Çapraz Konular (plan/icrada uyulacak)

- **Çift-tema token disiplini:** Yeni sınır/kart/gösterge rengi **adaptif token**la tanımlanır (light+dark ikisinde de geçer); Tailwind `dark:` variant **YOK** (proje `html.dark` class + CSS-değişken flip kullanır — `dark:` `prefers-color-scheme`'e bağlı, desync olur; memory: `tema-fix-html-dark-token-flip`).
- **a11y=100 çift-tema:** Eklenen her görsel öğe **her iki temada** color-contrast geçmeli; `aria-hidden` kontrast denetiminden muaf tutmaz (memory: `aria-hidden-color-contrast-muafiyeti-degil`). Ölçüm light+dark iki koşu (memory: `a11y-olcum-tema-tuzagi`).
- **CLS≈0:** Kart sınırı/padding veya gösterge ölçek değişimi **layout shift yaratmamalı** (near-zero CLS korunan taban).
- **RTL (AR):** Yön ipuçları (ok, hover-altı çizgi kayması) **logical prop** (`start/end`), physical `left/right` değil.
- **Reduced-motion:** Mevcut `animate-ping` (Alpfit canlı-dot) + scroll `animate-pulse` reduced-motion'da susar; yeni animasyon eklenirse aynı disiplin.
- **Focus-visible:** Mevcut 2px yeşil outline korunur; affordance klavye-erişilebilirliğini bozmaz.

### Kapsam Dışı

- **B1 Living Flow nabız kapsamı** — ayrı, karar-gate'li faz (imza riski).
- **SEO `/bunker-os`→`/crew-os` redirect + `/forum`→404** — ayrı, çapraz-modül faz (M6+M2+M4, i18n namespace rename).
- **Non-TR içerik tazeliği** (alt-sayfa ar/de/es stale) — versiyon-sınırı, dil stratejisi kapsamında (bu faz değil).
- **A2 genel kopya revizesi** — v0.1'de reframe edildi (canlı TR kopya güçlü).
- **Yeni mobil scroll-cue** — gösterge desktop-only (`hidden md:flex`) kalır; A3 = mevcut göstergenin ölçek düzeltmesi, yeni mobil öğe eklenmez (bilerek basit tutuldu).
- **Yeni i18n anahtarı** — faz saf görsel; mevcut anahtarlar yeterli.
- **Davranış/route/içerik değişikliği** — `<Link>` hedefleri, metin, akış aynı kalır; yalnız görsel katman.

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 10` oturumunda dolduruldu (2026-07-02). Faz saf CSS/görsel craft; yeni kütüphane/i18n anahtarı yok. Üç kusur kod düzeyinde teyit edildi, üç karar kullanıcıyla damgalandı.

### Kod-Teyidi (kaynak durumu)

- **A1 yüzeyleri:** `KiwiMark` üç yerde render ediliyor ve her üçünde `mark + "Kiwi AI Lab"` lockup'ı **kopya-kod** olarak tekrar ediyor → `Nav.tsx:36-39` (size 22, wordmark ink miras), `PageHeader.tsx:13-16` (size 22, ink miras), `Footer.tsx:72-74` (size 18, `bg-ink` üstünde wordmark `text-canvas`). Tekrar = A1 tutarsızlığının kök nedeni. `KiwiMark` SVG'si `viewBox 0 0 48 48` içinde **simetrik** (dış çember `cx24 cy24 r21`) — yani ikon kutusu dengeli; hizalama sorunu SVG'de değil, **ikon-kutusu ↔ metin satır-kutusu** optik farkında (line-box ≠ cap-height).
- **A3a idiomu:** `→ group-hover:translate-x-1` ok deseni sitede **standart** (`Hero.tsx:82` ikincil CTA, `Bunker.tsx:46`, `SectorSolutions.tsx` ×4, `Forum.tsx` ×2, `Footer.tsx:65`, `BunkerShowcase.tsx:51`, `BulletinSubscribe.tsx:44`). "Tıklanabilir" dilinin kurulu imzası bu.
- **A3b:** Merkez-alt gösterge `Hero.tsx:140-143` — `absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex`, `text-[11px]` etiket + `h-10 w-px animate-pulse bg-ink-faint/40` çizgi. Ayrı bir "sağ" öğe **yok** (tüm bileşenler tarandı) → REVIZE-BACKLOG'daki "sağdaki" perception artefaktı; discuss teyidi doğru.
- **i18n:** `hero.scroll` + `hero.stats.{liveProduct,liveLabel,crewOs,crewOsLabel}` **5 dilde tam** (tr/en/ar/de/es teyitli) → yeni anahtar gerekmez.
- **Favicon `src/app/icon.svg`** ayrı asset (arka planlı, farklı renk/bağlam), `KiwiMark` bileşeninden bağımsız → **A1 lockup kapsamı dışı** (favicon farklı yüzey türü).

### Değerlendirilen Yaklaşımlar

**A1 — Logo hizalama/tutarlılık**
- **Ortak `<Logo>` bileşeni (SEÇİLEN, kullanıcı kararı):** mark+wordmark lockup'ını tek bileşene çıkar; Nav/PageHeader/Footer onu tüketir. Optik dikey hizalama **tek yerde** çözülür, tutarlılık inşa gereği garanti, drift bir daha olmaz. Artı: ILKELER kalıcılık + QUALITY §5 modülerlik. Eksi: küçük refactor (3 dosya), `size` prop (22/18) + Footer'ın farklı renk kompozisyonu (mark `text-green`, wordmark bağlamdan miras — Footer'da `text-canvas`) bileşende ele alınmalı.
- **Yerinde düzeltme (elendi):** her yüzeyde ayrı flex/optik nudge. Daha minimal ama 3 kopya tekrar drift'e açık — A1'in kök nedenini bırakır.
- **SVG-içi düzeltme (elendi):** `viewBox` sıkıştırma/kaydırma. İkon zaten simetrik; sorun CSS-hizalama, SVG değil — viewBox değişimi tüm boyutları etkiler, yanlış kaldıraç.

**A3a — Hero CTA kartı affordance**
- **Ok idiomu + durağan ipucu (SEÇİLEN, kullanıcı kararı):** site-standart `→ group-hover:translate-x-1` okunu iki stat Link'ine ekle; **hover-only tuzağına düşmemek için** dinlenme halinde de hafif kalıcı ipucu (soluk ok/chevron, hover'da belirginleşir). Artı: kurulu imza → zero template smell, dokunmatikte de okunur. Eksi: yok denecek kadar az (mevcut desenle birebir).
- **İnce kart sınırı (elendi):** border+radius+hover-bg. Generic SaaS özellik-kartı ızgarası template-smell riski (QUALITY §1 / ILKELER pazarlık-dışı) + padding CLS riski.
- **Hover-altı underline (elendi):** iki-satırlı etikette (başlık+label) belirsiz; dinlenme halinde "tıklanabilir" okunmaz.

**A3b — Scroll göstergesi ölçekleme**
- **Ölçek büyütme/orantılama (SEÇİLEN, kullanıcı kararı = "çok küçük"):** 40px hairline + 11px etiket anıtsal hero'ya (clamp 6rem başlık) göre orantısız/kayıp. Çizgiyi/etiketi orantıla (daha uzun çizgi ve/veya biraz daha okunur ağırlık/opaklık); merkez-alt konum + `hidden md:flex` (desktop-only) korunur, yeni mobil öğe eklenmez (discuss kapsam-dışı). `w-px` + `/40` opaklık ayrıca DPR'de kırılgan (hairline) — ölçek işiyle birlikte biraz daha sağlam bir çizgi değerlendirilebilir.

### Kullanılacak Araçlar/Kütüphaneler

- **Yeni bağımlılık YOK.** Sadece mevcut Tailwind v4 utility'leri + `globals.css @theme` tasarım token'ları. `package.json` dokunulmaz.
- **Yeni i18n anahtarı YOK** — `hero.scroll` + `hero.stats.*` 5 dilde mevcut (teyitli). Parite otomatik korunur.
- GSAP zaten mevcut ve Hero timeline'ında (`[data-hero='stats']`, `Hero.tsx:25`); A3 değişiklikleri Link içeriğine/gösterge stiline dokunur, timeline hedeflerine değil. `<Logo>` çıkarımı yalnız Nav/PageHeader/Footer'ı etkiler, Hero GSAP'ıyla kesişmez.

### Dikkat Edilecekler

- **Çift-tema adaptif token disiplini:** Eklenen her renk (ok/ipucu, gösterge çizgisi) **adaptif token**dan gelmeli — kullanılabilir mevcut token'lar `--color-line`, `--color-ink-faint`, `--color-ink-soft`, `--color-green` (repoda-tanımlı → `src/app/globals.css:6-24` light + `:32-44` dark flip). Tailwind `dark:` variant **YOK** (proje `html.dark` class flip'i kullanır; `dark:` `prefers-color-scheme`'e bağlı, desync olur — memory: `tema-fix-html-dark-token-flip`).
- **a11y=100 çift-tema:** Yeni görsel öğe **her iki temada** color-contrast geçmeli; `aria-hidden` kontrast denetiminden muaf tutmaz (memory: `aria-hidden-color-contrast-muafiyeti-degil`). Ölçüm **light+dark iki koşu** (memory: `a11y-olcum-tema-tuzagi`) + axe WCAG tohumu (memory/QUALITY §8: axe yeşil ≠ Lighthouse 100).
- **CLS≈0 (korunan taban):** Ok/ipucu ve gösterge ölçek değişimi **layout shift yaratmamalı** — ok için yer rezerve et (opacity/transform ile göster, akışa genişlik ekleme) veya sabit-genişlik; gösterge büyütmesi hero flex'ini kaydırmasın (mutlak-konumlu, akış-dışı — güvenli).
- **Focus-visible:** 2px yeşil outline (`globals.css:122-126`) korunur. `<Logo>` çıkarımında lockup **tek focusable** kalmalı (mark+wordmark tek `<a>`/`<Link>` içinde — iki tab-stop'a bölme). Stat Link'lerine ok eklemek focus davranışını değiştirmez.
- **Reduced-motion:** Global catch-all (`globals.css:107-119`) tüm `animation`/`transition`'ı ~0ms'e indirir → mevcut `animate-ping`/`animate-pulse` ve yeni ok `transition`'ı otomatik susar. Yeni öğe reduced-motion'da **dinlenme halinde** okunur/tıklanabilir görünmeli (hover'a bağlı kalmamalı — bu aynı zamanda dokunmatik gereği).
- **RTL (AR):** Site-geneli ok idiomu **fiziksel** (`→` glyph + `translate-x`) ve AR'de de öyle sevk edilmiş (v0.2, `dir="rtl"` `layout.tsx:69`). Hero'daki iki oku **tek başına** logical yapmak onları diğer 10+ oktan ayırır (tutarsızlık) → **mevcut idiomla tutarlı kal.** Site-geneli logical-ok mantığı ayrı/sonraki iş (bu dar fazın kapsamı değil) — kayıt: bilinçli tercih.
- **Kaynak tanımlayıcılar (precondition):** A3 metinleri `hero.stats.*` + `hero.scroll` — **repoda-tanımlı → `messages/{tr,en,ar,de,es}.json` `hero` namespace** (5-dil tam). A1 yüzey siteleri: `Nav.tsx:36-39`, `PageHeader.tsx:13-16`, `Footer.tsx:72-74`; `KiwiMark` → `src/components/KiwiMark.tsx`. Yeni yaratılan: `<Logo>` bileşeni (örn. `src/components/Logo.tsx` — plan-phase kesinleştirir). Dış tanımlayıcı yok.

### Teknik Kararlar

- **A1 → ortak `<Logo>` bileşeni** (kullanıcı kararı). Gerekçe: kalıcılık (ILKELER) + modülerlik (QUALITY §5); kopya-kod drift'i (A1'in kök nedeni) inşa gereği giderilir. Optik dikey hiza tek yerde çözülür (line-box ↔ cap-height; wordmark `leading-none` + `items-center` başlangıç, kalan optik nudge gerekirse tek yerde ve görsel doğrulamayla).
- **A3a → site-standart ok idiomu + durağan ipucu** (kullanıcı kararı). Gerekçe: Craft en üst eksen — kurulu imza korunur (zero template smell), hover-only/dokunmatik tuzağı dinlenme-hali ipucuyla kapanır.
- **A3b → ölçek büyütme/orantılama** (kullanıcı: "çok küçük"). Merkez-alt + desktop-only korunur; hairline'ın DPR-kırılganlığı ölçek işiyle birlikte gözden geçirilir.
- **Yeni npm bağımlılığı ve yeni i18n anahtarı YOK.**
- **RTL:** mevcut fiziksel ok idiomuyla tutarlılık korunur (lone-flip yok); site-geneli logical-ok ayrı iş olarak kayıtta.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 10` oturumunda dolduruldu (2026-07-02). 4 task; lineer sıra. A1 = 10.01+10.02 (ortak `<Logo>`), A3a = 10.03, A3b = 10.04.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 10.01 | TASK-10.01 | ✅ Tamamlandı | A1 — Ortak `<Logo>` bileşeni + Nav & PageHeader benimseme (optik dikey hiza tek yerde) |
| 10.02 | TASK-10.02 | ✅ Tamamlandı | A1 — Footer'da `<Logo>` benimseme (size 18, non-link, `text-canvas` koyu zemin); 10.01'e bağlı |
| 10.03 | TASK-10.03 | ✅ Tamamlandı | A3a — Hero iki stat Link'ine site-standart ok idiomu + durağan ipucu |
| 10.04 | TASK-10.04 | ✅ Tamamlandı | A3b — Hero merkez-alt scroll göstergesi ölçekleme (desktop-only korunur) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 10` oturumunda doldurulacak.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 10` oturumunda doldurulacak.

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 10` oturumunda doldurulacak.

---

## Sonuç

- **Tamamlanma Tarihi:** [review-phase]
- **Toplam Task:** [plan-phase]
- **Notlar:** [review-phase]

---

**Oluşturulma:** 2026-07-02 (discuss-phase 10)
**Son Güncelleme:** 2026-07-02 — run-task TASK-10.04 ✅: Hero merkez-alt scroll göstergesi anıtsal hero'ya orantılandı (`h-10`→`h-16` çizgi, `/40`→`/60` opaklık DPR-robustness, `text-[11px]`→`text-xs` etiket, `gap-2`→`gap-3`); `w-px` crisp hairline + `bottom-7 left-1/2 hidden md:flex` + `animate-pulse` korundu. Adaptif token (`--color-ink-faint`, `dark:` YOK). build ✓, home a11y 2/2 (light+dark), görsel: çizgi 64px + etiket 12px, mobil `display:none`, token light↔dark flip, cluster gap 28px sabit (CLS yok). **Faz 10 tüm task'ları (10.01–10.04) ✅ → sıradaki `verify-phase 10`.**
