# Phase 15: Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluştu; durum 🔄 ile başlar. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-15-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** Alpfit (spor salonu / kulüp işletme yazılımı — ayrı, bağımsız dikey ürün) sayfasının (`/spor-salonu-yazilimi`) mevcut sade halinden (Living Flow hero + 8-özellik grid + 4 gerçek ekran görüntüsü + CTA bandı) **"Alpfit Plus" zengin ürün vitrini**ne yeniden tasarımı. Artifact hedef düzen (`_dev/docs/alpfit-plus-artifact.html`) React (Next 15) + Tailwind v4 token + next-intl 5-dil namespace ile port edilir; imza Living Flow korunur, dürüstlük 4/4 gerçek kalır, guardrail'ler regresyonsuz.

**Milestone:** Sayfa artifact düzeninde (Hero+before/after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden Alpfit Plus · Fiyat · Yol haritası · Kapanış) **5 dilde çalışır** (yapısal anahtar 0 eksik, `MISSING_MESSAGE` yok), **dürüstlük 4/4 gerçek** korunur (canlı pilot / public fiyat / mevcut ürün iddiaları / 18-rakip), **guardrail regresyonsuz** (a11y=100 çift-tema · perf korunan taban · CLS≈0 · i18n 5-dil parite · marka sesi yasakları · reduced-motion tam fallback). "kur+kanıtla".

### Feature Listesi

(MODULE-MAP ve modules/M2 referansı; kaynak feature dokümanı `_dev/PRD/features/alpfit-plus.md`)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| AP1: Sayfa portu + yeni bölümler | M2 (+M1/M3) | Artifact bölümleri React + Tailwind v4 token; `Reveal`/`PageHeader`/`Footer`/`SmoothScroll`/`CustomCursor` + imza `LivingFlow` yeniden kullanılır. Mobil uygulama mockup'ları (4 iPhone, saf CSS — en yüksek craft maliyeti). |
| AP2: 5-dil i18n namespace | M4 (+M2) | Yeni içerik `messages/{tr,en,ar,de,es}.json` düzgün namespace; component-içi `tr?...:...` TR/EN deseni terk edilir. TR birincil, non-TR versiyon-sınırı; yapısal anahtar 5 dilde eşzamanlı (eksik = runtime hata). |
| AP3: SEO/metadata | M6 (+M2) | Başlık/description ürün konumuna ("Alpfit Plus") göre güncellenir; route `/spor-salonu-yazilimi` + `localizedAlternates` korunur. |

---

## Kapsam Tartışması

> `/devflow:discuss-phase 15` oturumunda dolduruldu (2026-07-16).

### Alınan Kararlar

- **Faz bölünmesi → Tek faz (Faz 15).** İç bölünme (bölüm portu / mobil mockup'lar / 5-dil i18n namespace / SEO+guardrail doğrulama) plan-phase'de küçük task'lara ayrılır. *Gerekçe:* sayfa tek tutarlı teslimattır; "artifact düzeni 5-dil çalışır" doğal milestone'dur; i18n namespace yapı portuyla **birlikte** iner → ara durumda TR-hardcode/EN-fallback regresyonu doğmaz (mevcut sayfa non-TR'de EN fallback gösteriyor); iş-paketi küçüklüğü DevFlow'da zaten task seviyesinde sağlanır.
- **Hero → İmza Living Flow korunur + before/after kartı sağ sütunda.** İki-sütun hero: sol metin (pilot chip + H1 + CTA + not), sağ before/after karşılaştırma kartı; Living Flow arka planda imza olarak kalır (FlowScrim okunabilirlik). *Gerekçe:* Marka & Craft (imza) ILKELER üst ekseni — amiral ürün sayfasının hero'sundan Living Flow kaldırmak craft gerilemesidir. Görsel denge (WebGL alanı + detaylı kart aynı hero'da yoğunluk) research-phase'de prototiplenir.
- **Ekran görüntüleri (`public/gym/*.png`) → Kaldırılır.** "Yazılımın içinden" 4-PNG bölümü kalkar; yerini saf-CSS mobil mockup'lar + zengin bölümler alır (artifact hedef düzen). *Gerekçe:* artifact ekran görüntüsü içermiyor, nihai hedef düzen o. Asset dosyaları public'te kalır (kullanılmaz; disk temizliği ayrı iş — Kapsam Dışı).
- **Sayfa-içi çapa-nav → Eklenmez.** Mevcut `PageHeader` (geri linki + CTA) + global `Nav` korunur; artifact'ın sticky "Roller · Özellikler · Fiyat" alt-nav'ı alınmaz. *Gerekçe:* site geneliyle tutarlılık; üçüncü nav katmanı karmaşası yok. Bölüm geçişi CTA butonlarıyla mümkün (örn. "Fiyatları gör" → `#fiyat`).
- **CTA modeli → mailto (artifact gibi, subject'li).** Demo/teklif/soru CTA'ları `kivanc@kiwiailab.com`'a subject'li mailto açar ("Alpfit Plus demo talebi" / "fiyat teklifi" / "hakkında"). *Gerekçe:* ürün-özel talep bağlamı net, doğrudan/sürtünmesiz; mevcut sayfanın `/#contact` deseninden bilinçli ayrılma.
- **Dürüstlük 4/4 gerçek — hepsi aynen yayınlanır.** ₺1.500+KDV/salon/ay (2. salon ₺1.200 / %20 indirim) · ₺3.000+KDV kurulum (yıllık peşinde ücretsiz) · 15 gün deneme · **"Weekend Training Club'da canlı pilotta"** (gerçek ad, yayına izinli; gerçek canlı ürün → pilot nabız noktası meşru gösterge, ILKELER yasak-dışı) · **"İncelediğimiz 18 rakip üründe yok"** (gerçek inceleme, sayı kalır). Yol haritası kalemleri "yakında" öngörü çerçevesinde. *Gerekçe:* kullanıcı teyidi 2026-07-16 (feature dokümanı) + bu oturumda pilot adı dahil aynen-yayın onayı.
- **Store/Mağaza yol haritası kalemi → e-ticaret modülü.** Üyelerin kulübün ürünlerini (tişört, ekipman vb.) online satın alabileceği mağaza platformu = "yakında" yol haritası kalemi (bugün üründe değil; öngörü çerçevesi korunur). Artifact'ın diğer yol-haritası kalemlerine (Online ödeme · QR/turnike · Apple Health & Google Fit · AI gelişim & beslenme analizi) eklenir. Kısa etiket metni içerik/kopya aşamasında netleşir.
- **Route korunur → `/spor-salonu-yazilimi`.** Public, sektör-tanımlı ad; iç-ad sızıntısı yok; rename gerekçesi yok. SEO/metadata "Alpfit Plus" ürün konumuna göre güncellenir (başlık/description); `localizedAlternates` korunur.
- **i18n namespace → düzgün 5-dil (öneri ad `alpfit`).** Ürün adı sektör-generic `gym`'den ayrışır; kesin ad plan-phase'de damgalanır. Component-içi `tr?...:...` deseni terk edilir. TR birincil mükemmelleştirilir; non-TR (en/ar/de/es) yapısal anahtarlar **eşzamanlı** var (eksik anahtar = runtime hata) ama **değer** versiyon-sınırında (stale/placeholder kabul — TR tek kaynak). `PageHeader` back/cta artık bu namespace'ten (mevcut `crewOs` ödünç deseni bırakılır).
- **Font & token.** Fraunces (`--font-display`) + Geist (`--font-sans`); renk/gölge/easing Tailwind v4 token'ları (`--color-canvas/ink/green/pulse`; koyu Fiyat bandı için ink-panel deseni + `--color-pulse-ink` adaptif token dikkatiyle). Artifact'ın `:root`/sistem-font fallback'i port edilmez.

### Kullanıcı Tercihleri

- **Zengin ama sade:** artifact hedef düzen; üçüncü nav katmanı yok, PageHeader sade kalır.
- **Doğrudan dönüşüm:** mailto ile ürün-özel talep (subject'li).
- **Şeffaf fiyat:** kesin & public rakamlar açıkça gösterilir.
- **Gerçek pilot adı açık:** "Weekend Training Club" yayına izinli.

### Çapraz Konular (research/plan farkındalığı — Adım 3)

- **a11y=100 çift-tema tuzağı:** Fiyat koyu bandı (`--band`/ink-panel) **ve** mockup telefon ekranları (artifact'ta kendi açık `--a-*` paletinde — gerçek telefon açık ekran, tema-adaptif değil) kontrast pass/fail'i tema ile flip edebilir → **light+dark ayrı doğrula** (MEMORY `a11y-olcum-tema-tuzagi`; `--color-pulse-ink` swap deseni MEMORY `tema-fix-html-dark-token-flip`).
- **RTL (AR):** yeni bölümler (before/after grid + "→" tick yönü, roller, mockup telefon çerçevesi, fiyat bandı) logical CSS prop'larıyla (start/end) aynalanır; physical left/right değil.
- **reduced-motion:** pilot nabız noktası (`.dot` pulse) + `Reveal` durur/görünür kalır; mockup'lar statik (animasyon yok).
- **perf / CLS:** mockup & before/after kartları sabit boyut (aspect-ratio) → layout-shift yok; WebGL yalnız hero (mevcut Living Flow, ek runtime maliyeti yok); yeni bölümler saf CSS/DOM.
- **i18n parite:** yapısal anahtar 5 dilde eşzamanlı; Vitest parite tohumu yeni namespace'i kapsar (eksik anahtar = fail).
- **Marka sesi yasakları:** doktor/teşhis metaforu yok, sahte "online" tiyatrosu yok (pilot nabzı GERÇEK canlı → meşru), lorem/dolgu yok, zayıf adım adı yok.
- **Tutarlılık:** ana sayfa Sektörler gym paneli "Live — Alpfit" CTA'sı + hero Alpfit rozeti bu sayfaya (`/spor-salonu-yazilimi`) gider — hedef korunur (değişiklik değil, tutarlılık).

### Kapsam Dışı

- **Ana sayfa, Crew OS, diğer sektör/vaka sayfaları** — dokunulmaz (Alpfit sayfası izole; ana sayfa gym paneli CTA hedefi bu sayfa olarak korunur, düzenlenmez).
- **Gerçek ürün yetenekleri** (online ödeme · QR/turnike · Apple Health & Google Fit · AI analiz · **Mağaza/e-ticaret**) — sayfa yalnızca anlatır ("yol haritası — yakında"); backend/entegrasyon yapılmaz.
- **non-TR (en/ar/de/es) nihai/mükemmel çeviri** — versiyon-sınırına ertelenir (TR birincil; yapısal anahtar tam, değer stale/placeholder kabul).
- **`public/gym/*.png` asset silme** — dosyalar public'te kalır (kullanılmaz); disk temizliği ayrı iş.
- **Living Flow motoru / GLSL değişikliği** — imza dokunulmaz; yalnız hero'da yeniden kullanılır.
- **Telefon mockup ekranlarını tema-adaptif yapma** — artifact'taki gibi kendi açık `--a-*` paletinde kalır (gerçek telefon açık ekran; dış metal çerçeve koyu). Kontrast kendi paletinde sağlanır; a11y çift-tema doğrulaması yine şart.
- **Chatbot, analytics, diğer modüller** — bu fazın dışı.

---

## Araştırma Bulguları

> `/devflow:research-phase 15` oturumunda dolduruldu (2026-07-16). Kaynaklar: artifact `_dev/docs/alpfit-plus-artifact.html` (773 satır, tam okundu), mevcut kaynak (`components/gym/GymSoftwareShowcase.tsx`, `spor-salonu-yazilimi/page.tsx`, `PageHeader`/`Reveal`/`FlowScrim`, `globals.css`, `i18n/metadata.ts`, `messages/tr.json` `crew`/`crewOs` desenleri), testler (`i18n-parity`, `subpages-a11y`).

### Değerlendirilen Yaklaşımlar

**1) Bileşen yapısı (port dekompozisyonu)**
- **Tek monolit bileşen** (mevcut `GymSoftwareShowcase.tsx` gibi tek dosya): basit, mevcut desene uyar; ama 9 bölüm + 4 telefon mockup'ı tek dosyada ~700+ satır → tek-sorumluluk ihlali (QUALITY §5), bakımı zor, task'a bölmesi güç.
- **Bölüm-başına bileşen** (`AlpfitHero`, `AlpfitRoles`, …): tam modülerlik; ama çok dosya, koordinasyon yükü.
- **Seçilen: Hibrit dizin `components/alpfit/`** — bir kompozisyon kabuğu (`AlpfitShowcase.tsx`) + bölüm alt-bileşenleri; en yüksek craft/LOC maliyeti olan **telefon mockup'ları izole bileşene** (`PhoneMockups`). Gerekçe: DevFlow task-küçüklüğü (plan-phase doğal task sınırları — kabuk+hero / orta bölümler / mockup'lar / bant+kapanış / i18n / SEO), modülerlik, mockup'ın kendi task'ı olması. Listeler `crew` namespace desenindeki gibi **sabit anahtar-dizisi + `map`** ile tüketilir (`t(\`roles.${k}.title\`)` — `BunkerShowcase.tsx` deseni; JSON array değil, isimli-anahtar objesi).

**2) Telefon mockup CSS stratejisi (en yüksek craft maliyeti)**
- **Tailwind arbitrary utilities**: ~90 kural/telefon → okunamaz, semantik sınıf adları (`.ph-mem-bar i`) kaybolur, craft riski. Elendi.
- **globals.css'e ekleme**: global CSS'e sayfa-özel ~150 satır → globals.css şişer (136→~290), hafif modülerlik kokusu.
- **Seçilen: Co-located CSS Module** (`components/alpfit/PhoneMockups.module.css`) — artifact `.phone`/`.ph-*` CSS'i **birebir** taşınır (scoped, globals.css yalın kalır). `--a-*` paleti **self-contained/açık** kalır (tema-adaptif değil — scope kararı; gerçek telefon açık ekran). Sayfanın geri kalanı (hero/roller/özellik/bant) **Tailwind utility + marka token** (site standardı). Not: CSS Module bu repoda **yeni desen** — plan-phase teyit eder; başaramazsa globals.css-ekleme fallback.

**3) Fiyat bandı + "Neden" aside teması (KARAR — kullanıcı 2026-07-16)**
- **Kalıcı koyu bant (artifact birebir)**: yeni `--band-*` token ailesi; çift-tema WCAG doğrulaması şart; site inversion deseninden ayrışma.
- **Seçilen: Site ink-panel inversion deseni** — bant `bg-ink text-canvas`, iç price-card lifted-surface (`bg-white/[.04]`+`border-white/10`), muted metin `text-canvas/55`, pulse aksanı **`--color-pulse-ink`** (adaptif). Gerekçe: TD4/Faz 8'de **a11y-mühürlü** ve Crew OS bandıyla **tutarlı**; yeni token ailesi + tema-tuzağı yüzeyi doğmaz (MEMORY `tema-fix-html-dark-token-flip`, `a11y-olcum-tema-tuzagi`). Davranış: bant light'ta koyu/krem-metin, **dark temada krem'e döner** (site konvansiyonu).

**4) i18n namespace yapısı**
- **Seçilen: `alpfit` namespace** (scope önerisi teyit). Yapı `crew`/`crewOs` desenini izler (isimli-anahtar alt-objeler: `roles.{member,trainer,dietitian,management}`, `features.{f1..f9}`, `why.{lead,mobile,multibranch,nohardware,singlesource}`, `pricing.*`, `roadmap.*`, `hero.*`, `problem.*`, `close.*`, `back`, `cta`). Component-içi `tr?...:...` deseni terk edilir. `PageHeader` `back`/`cta` artık `alpfit` namespace'ten (mevcut `crewOs` ödünç deseni bırakılır).
- **Telefon mockup içi metin (KARAR — kullanıcı 2026-07-16): Sabit TR (ekran-görüntüsü semantiği), telefon `dir="ltr"`.** Telefon içi metinler (`Merhaba, Deniz`, `Reformer Pilates`, `72,4 kg`, tab adları) **i18n'e girmez** — gerçek TR ürün ekranının görüntüsü gibi sabit. Bölüm başlığı/altyazısı/`phone-cap` etiketleri (`Üye · Ana ekran`) **5 dil i18n**. Gerekçe: RTL'de LTR-telefon içinde Arapça bozulmaz, micro-anahtar patlaması yok, örnek proper-noun/rakam çevrilmez (dürüst: gerçek TR ürünü).

**5) Living Flow + before/after hero dengesi**
- **Seçilen:** Mevcut hero mekanizması korunur (`LivingFlow` + `FlowScrim`), yapı iki-sütuna (`~1.1fr / 0.9fr`) getirilir: sol metin (pilot-chip + H1 + CTA + not), sağ **before/after compare kartı** (opak `--surface` kart, gölge → akış üstünde temiz okunur). Artifact'ın dekoratif radial glow'u (`.hero::before`, `.compare-wrap::before`) **bırakılır** — ambient yeşili Living Flow sağlar (efekt kalabalığı yok, QUALITY §1). FlowScrim sağ-sütun dengesi hero task'ında prototiplenir (kart okunabilirliği vs. akış canlılığı). Yeni WebGL maliyeti yok (tek Living Flow).

### Kullanılacak Araçlar/Kütüphaneler
- **Yeni kütüphane YOK.** Mevcut stack yeterli: React 19 + Tailwind v4 token + next-intl + GSAP (`Reveal`) + Living Flow.
- **`next/image` bu sayfadan DÜŞER** — yeni tasarımda hiç raster görsel yok (before/after + mockup'lar saf CSS/SVG; roller/checkmark/chart inline SVG). `public/gym/*.png` kullanılmaz (asset silme Kapsam Dışı).
- **CSS Module** (Next 15 App Router yerleşik desteği) — yalnız `PhoneMockups.module.css` için (yeni desen, plan teyidi).
- **Yeniden kullanılan primitive'ler:** `Reveal` (`[data-reveal]` sözleşmesi — `src/components/Reveal.tsx`), `PageHeader`/`Footer`/`SmoothScroll`/`CustomCursor` (page shell zaten kablolu), `LivingFlow`/`FlowScrim` (M1). Artifact'ın kendi IntersectionObserver `.reveal.in` scripti **bırakılır** (site `<Reveal>`+GSAP kullanılır).

### Dikkat Edilecekler

> Tanımlayıcı kaynağı: **repo** = zaten tanımlı (yol/sembol), **yeni** = bu fazda yaratılır, **dış** = dış sistem. (research kaydeder; verify-plan gerçeklik-kontrolü yapar.)

- **Token boşluğu — `--surface` (yeni, M1):** artifact `--canvas`/`--canvas-deep`/`--ink`/`--green`/`--line` site `@theme` ile **birebir/çok yakın** (site token'ları kullanılır — WCAG-tuned, artifact renkleri değil). Ama kart zemini `--surface` (#fffefb light / #191b12 dark) site'de **yok**. Karar: `--color-surface` **yeni token** olarak `globals.css` `@theme` + `html.dark`'a eklenir (kartlara ince "lift"; craft). Kaynak: artifact `:root`/`@media dark` (`_dev/docs/alpfit-plus-artifact.html` L9-68). `globals.css` M1 → **korumalı doküman değil ama tasarım-token sistemi**, plan/task'ta ele alınır.
- **Fiyat bandı ink-panel (repo):** `bg-ink` + `--color-pulse-ink` (`globals.css:17,49` — repo-tanımlı, TD4). Dark temada bant **krem'e döner** — bu beklenen davranış (bug değil); pulse aksanı `--color-pulse-ink` ile legible kalır. **axe çift-tema doğrulaması yine şart** (MEMORY `a11y-olcum-tema-tuzagi`).
- **a11y mührü zaten bağlı (repo):** `tests/e2e/subpages-a11y.spec.ts` `PAGES`'te `/spor-salonu-yazilimi` **zaten var** (5 dil × light+dark, `subpages-a11y.spec.ts:24`) → redesign bu mührü **kırarsa CI fail**. Yeni bölümlerin kontrastı (bant, badge yeşili, compare tick, mockup `--a-*` iç kontrastı) AA geçmeli. `--a-*` paleti tema-invariant → bir kez doğrula ama axe per-tema koşar.
- **i18n parite otomatik (repo):** `tests/i18n-parity.test.ts` tüm yaprak anahtarları flatten eder → yeni `alpfit` namespace **otomatik kapsanır**; 5 dilde **eşzamanlı** anahtar şart (eksik = fail). Değer non-TR stale kabul (versiyon-sınırı). `phone` içi metin i18n'e girmediği için parite yükü yok.
- **RTL (AR) — logical prop'lar:** yeni bölümler (before/after grid, roller, özellik grid, bant, roadmap) `ps-/pe-/ms-/me-/text-start/inset-inline-start` ile aynalanır (physical left/right değil — M4 F4.3). Compare `→` tick RTL'de yön çevirir (logical ok / `←`). Bullet `::before` `inset-inline-start`. **Telefon mockup `dir="ltr"` zorlanır** (ekran-görüntüsü — RTL'de bozulmaz; karar 4).
- **PageHeader dokunulmaz kalır (repo):** `src/components/PageHeader.tsx` CTA'sı hardcoded `/#contact` (prop değil) → değişmez (site-tutarlı, tüm alt sayfalar paylaşır). **Body CTA'ları** (hero/pricing/close) subject'li **mailto** (`mailto:kivanc@kiwiailab.com?subject=...` — email repo/user, subject'li mailto **yeni davranış**). Sadece `back`/`cta` **prop kaynağı** `crewOs`→`alpfit` değişir (bileşen değil).
- **Orphan bileşen temizliği:** yeni `components/alpfit/` gelince eski `components/gym/GymSoftwareShowcase.tsx` **kullanılmaz kalır** → kod hijyeni gereği **silinir** (kod, kapsam-içi). `public/gym/*.png` **kalır** (asset silme Kapsam Dışı).
- **Reveal sözleşmesi (repo):** artifact `.reveal` CSS class'ı DEĞİL, site `<Reveal>` + `[data-reveal]` çocukları kullanılır (`Reveal.tsx:29`). Her bölüm `<Reveal>` ile sarılır, animasyonlu çocuklar `data-reveal` işaretlenir; reduced-motion'da `<Reveal>` no-op (görünür kalır).
- **Perf/CLS pozitifi (guardrail):** görsel yok → LCP muhtemelen h1 (metin), mevcut 4-PNG (~1.7MB) yükü kalkar; tüm kartlar/mockup'lar sabit boyut/`aspect-ratio` → CLS≈0. Pilot `.dot` pulse + reveal reduced-motion-gated. Yeni font yok (Fraunces/Geist zaten yüklü; artifact sistem-font fallback'i port edilmez).
- **Marka sesi (guardrail):** doktor/teşhis metaforu yok; sahte "online" tiyatrosu yok (pilot nabzı **gerçek** canlı → meşru, ILKELER); lorem/dolgu yok. Dürüstlük 4/4 gerçek aynen (₺1.500 + "Weekend Training Club" pilot adı + "18 rakip" + yol haritası "yakında" öngörü çerçevesi).

### Teknik Kararlar

- **Bileşen yapısı:** `components/alpfit/` dizini — `AlpfitShowcase.tsx` kabuk + bölüm alt-bileşenleri + izole `PhoneMockups`. *Gerekçe:* modülerlik + DevFlow task sınırları + mockup'ın kendi craft-task'ı.
- **Telefon mockup:** CSS Module (`PhoneMockups.module.css`), artifact `.phone`/`.ph-*` **birebir**; `--a-*` self-contained açık palet; `dir="ltr"`; içerik sabit TR. *Gerekçe:* pixel-craft sadakati + globals.css yalın + RTL güvenli.
- **Fiyat bandı/aside:** site ink-panel inversion (`bg-ink`+`--color-pulse-ink`), yeni `--band-*` yok. *Gerekçe:* TD4 a11y-mühürü + Crew OS tutarlılığı + tema-tuzağı yüzeyi yok.
- **`--color-surface` yeni token** (`@theme` + `html.dark`) — kart zeminleri. *Gerekçe:* craft "lift"; artifact `--surface` sadakati; tek yeni token (band ailesi eklenmez).
- **i18n `alpfit` namespace** — `crew` deseni (isimli-anahtar + `map`); telefon içi metin i18n-dışı sabit TR. *Gerekçe:* site standardı + parite yükü minimum + RTL güvenli.
- **Hero:** iki-sütun, Living Flow+FlowScrim korunur, compare kartı sağ opak surface, artifact dekoratif radial'ları bırakılır. *Gerekçe:* imza korunur (Craft üst eksen) + efekt kalabalığı yok + ek WebGL maliyeti yok.
- **`next/image` düşer, primitive'ler yeniden kullanılır, artifact reveal-scripti bırakılır** (site `<Reveal>`/GSAP). *Gerekçe:* görsel yok → perf pozitifi; mevcut altyapı yeterli.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 15` oturumunda doldurulacak.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır. -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 15.01 | TASK-15.01 | ⬜ Bekliyor | (plan-phase'de belirlenecek) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 15` oturumunda doldurulacak.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 15` oturumunda doldurulacak.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 15` oturumunda doldurulacak.

| Eksen | Durum | Not |
|-------|-------|-----|
| Modülerlik | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / N/A | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-16 (discuss-phase 15)
**Son Güncelleme:** 2026-07-16 — research-phase 15: Araştırma Bulguları yazıldı (5 alan: bileşen yapısı `components/alpfit/` hibrit + izole mockup · telefon CSS Module birebir + `dir=ltr` sabit-TR · fiyat bandı **ink-panel inversion** [kullanıcı kararı] · `alpfit` namespace `crew` deseni + mockup metni i18n-dışı [kullanıcı kararı] · hero iki-sütun Living Flow+compare). Yeni token `--color-surface`; `next/image` düşer; a11y mührü + i18n parite zaten bağlı. Adım = plan.
