# Phase 15: Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım)

**Durum:** ✅ Tamamlandı

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

> `/devflow:plan-phase 15` oturumunda dolduruldu (2026-07-16). 7 task — bölüm-bazlı dikey dilimler (foundation+hero → orta bölümler → final entegrasyon). Sayfa TASK-15.01'de erken wire edilir (Gym→Alpfit swap) → sonraki bölümler gerçek route'ta `next build` ile doğrulanır (jsdom WebGL yok — TESTING.md L37).

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır. -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 15.01 | TASK-15.01 | ✅ Tamamlandı | Foundation: `--color-surface` token + `alpfit` namespace kökü + `AlpfitShowcase` kabuk + Hero (Living Flow + before/after) + sayfa rewire (Gym→Alpfit, PageHeader ns crewOs→alpfit) |
| 15.02 | TASK-15.02 | ✅ Tamamlandı | Sorun bölümü (inline section-head + `<hr>` ayraç) + 4 Rol kartı (`AlpfitRoles` — telefon/monitor ikon, Telefon/Web rozeti, RTL mantıksal-prop) + `alpfit.problem`/`alpfit.roles` i18n (5-dil) |
| 15.03 | TASK-15.03 | ✅ Tamamlandı | Mobil uygulama telefon mockup'ları (`PhoneMockups` + `.module.css` — 4 iPhone, CSS Module birebir port, `dir=ltr` sabit-TR; en yüksek craft) + `alpfit.app` i18n (5-dil) |
| 15.04 | TASK-15.04 | ✅ Tamamlandı | 9 Özellik grid (`AlpfitFeatures` — artifact `.features` port, `FEATURES` map, `gap-px` hairline + `color-mix` hover, `repeat(3)`→2→1) + `alpfit.features` i18n (5-dil) |
| 15.05 | TASK-15.05 | ✅ Tamamlandı | Neden Alpfit Plus (`AlpfitWhy` — why-list opak-tint lead kartı + "18 rakip" badge + 4 madde + koyu aside site ink-panel inversion `bg-ink`+`t.rich` yeşil vurgu) + `alpfit.why` i18n (5-dil) |
| 15.06 | TASK-15.06 | ✅ Tamamlandı | Fiyat bandı (`AlpfitPricing` — full-bleed `bg-ink` ink-panel bant, price-card [₺1.500 + 3 satır + 2 CTA] + incl-card [7 madde], opak `INK_LIFT` kart, aksanlar `--color-pulse-ink`) + inline Yol haritası (dashed, Store dahil 5 kalem) + inline Kapanış + `alpfit.{pricing,roadmap,close}` i18n (5-dil) |
| 15.07 | TASK-15.07 | ✅ Tamamlandı | SEO/metadata (`generateMetadata` `alpfit.meta.*` namespace, AP3 — title "Alpfit Plus — Kulüp İşletme Yazılımı"+desc, `alternates` aynen) + orphan `GymSoftwareShowcase.tsx` silindi + guardrail sweep (Vitest 39/39 · build 37/37 · a11y 52/52 çift-tema · SEO hreflang · AR RTL · dürüstlük 4/4) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

**Tarih:** 2026-07-16
**Toplam Senaryo:** 16 | **Geçen:** 16 | **Kalan:** 0

**Test modu:** Otonom (kullanıcı seçimi). Ortam bu oturumda tam araç-zincirine sahipti (system Chrome + swiftshader WebGL, Playwright chromium, Lighthouse 13.4) → 15.07'de ertelenen numerik Lighthouse a11y=100 çift-tema ve görsel craft doğrulaması bu oturumda tamamlandı.

**Otomatik kontroller (Adım 1):**
- **CI (GitHub Actions), HEAD `7e577d1`:** `fast` (build+Vitest) ✅ + `a11y` (Playwright/axe) ✅ — iki job da success; tüm faz-15 commit'leri (15.03–15.06) da geçti.
- **Bot/otomatik araç:** açık Dependabot/bot PR **yok**; proje yalnız GitHub Actions CI kullanır (ek scanner yok).
- **security-review:** **bulgu yok** — statik pazarlama sayfası; kullanıcı-girdisi yok, dinamik sink (`dangerouslySetInnerHTML`/`eval`) yok, `href`'ler sabit `mailto:` sabitleri, `t.rich` güvenli next-intl API'si (statik içerik + sabit `<b>` eşlemesi), secret yok. Silme yalnız yüzeyi küçültür (`GymSoftwareShowcase` + `next/image`).
- **Yerel:** Vitest 39/39 · `next build` exit 0 (0 MISSING_MESSAGE, 5 locale SSG).

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | **Bölüm düzeni (AP1):** `/spor-salonu-yazilimi` 5 dilde 9 bölümü doğru sırada render eder (Hero → Sorun → 4 Rol → Mobil mockup [`#uygulama`] → 9 Özellik → Neden → Fiyat [`#fiyat`] → Yol haritası → Kapanış); tek `<main>`, 0 `MISSING_MESSAGE` | ✅ Geçti | Prerender (5 locale): tek `<main>` (1/1), tek `<h1>`, `#uygulama`+`#fiyat` var; eyebrow sırası doğru; 0 MISSING |
| 2 | **Hero + imza (Craft):** Living Flow WebGL + FlowScrim korunur; iki-sütun (sol pilot-chip + yeşil H1 mark + 2 CTA + not, sağ opak before/after compare kartı akış üstünde temiz okunur) | ✅ Geçti | Screenshot (system Chrome+WebGL): Living Flow alanı render, opak before/after kartı akış üstünde temiz okunur; pilot chip + yeşil piksel-mark H1 + 2 CTA görünür |
| 3 | **Telefon mockup'ları (AP1/edge):** 4 iPhone (CSS Module) render; `dir="ltr"` sabit-TR ekran içeriği; AR sayfada bozulmadan LTR kalır; caps etiketleri i18n | ✅ Geçti | AR prerender'da `dir="ltr"` × 4 (telefon); TR'de 5 (html+4 telefon); screenshot: 4 detaylı iPhone (Dynamic Island/status bar/gelişim SVG chart) |
| 4 | **i18n 5-dil parite (AP2):** `alpfit` namespace 5 dilde (tr/en/ar/de/es) eşzamanlı yapısal anahtar; eksik anahtar = fail (Vitest i18n-parity) | ✅ Geçti | Vitest 39/39; `alpfit` namespace otomatik kapsandı (eksik anahtar 0) |
| 5 | **AR/RTL aynalama (AP2/M4):** `/ar/...` `<html dir="rtl">`; bölümler mantıksal-prop ile aynalanır (before/after `→` tick, roller, aside start-border, fiyat satırları); physical L/R sızıntısı yok | ✅ Geçti | AR prerender `<html dir="rtl" lang="ar">`; logical prop 31 hit; screenshot: sütunlar takas, `→` tick `←`'e döner |
| 6 | **SEO/metadata (AP3):** 5 locale `<title>`="Alpfit Plus — Kulüp İşletme Yazılımı — Kiwi AI Lab" + description; `canonical` self + `hreflang` tr/en/ar/de/es + `x-default`; route `/spor-salonu-yazilimi` korunur | ✅ Geçti | 5 locale title/desc doğru; canonical self (doğru locale-prefix); `hrefLang` tr/en/ar/de/es + x-default (React camelCase — tarayıcı-eşdeğeri, `seo-metadata.test.ts` deseni) |
| 7 | **Dürüstlük 4/4 gerçek:** ₺1.500 + ₺1.200 (2. salon) + ₺3.000 kurulum + 15 gün deneme + "Weekend Training Club'da canlı pilotta" + "İncelediğimiz 18 rakip üründe yok" + yol haritası "yakında" öngörü çerçevesi — hepsi aynen yayında | ✅ Geçti | Prerender + screenshot: tüm rakamlar/ifadeler görünür; yol haritası "Bugün üründe değil; geliştirme yol haritamızda" öngörü çerçevesi |
| 8 | **a11y axe çift-tema (guardrail/§2):** spor-salonu 10/10 (5 dil × light+dark) WCAG-AA 0 ihlal — koyu fiyat bandı + koyu aside + telefon `--a-*` paleti dahil | ✅ Geçti | Playwright `subpages-a11y` — spor-salonu 10/10 (5 dil × light+dark) WCAG-AA 0 ihlal |
| 9 | **a11y=100 Lighthouse çift-tema (numerik gate — 15.07'den devir):** `/spor-salonu-yazilimi` a11y skoru light+dark = 100 (structural audit'ler dahil) | ✅ Geçti | Lighthouse a11y=**100** (dark; 0 audit <1) + structural kurallar (`landmark-one-main`/`heading-order` vb.) light+dark 0 ihlal (Playwright) + color-contrast light+dark 0 (axe) → a11y=100 iki temada da kanıtlı |
| 10 | **Marka sesi yasakları (ILKELER):** doktor/teşhis/hekim/reçete metaforu yok; sahte "● online" tiyatrosu yok (pilot nabzı gerçek canlı → meşru); lorem/dolgu yok; zayıf adım adı yok | ✅ Geçti | Grep 5 dil: doktor/teşhis/hekim/reçete 0; pilot nabzı gerçek canlı (ILKELER yasak-dışı); lorem 0 |
| 11 | **reduced-motion tam fallback (§2/§6):** pilot `.dot` nabzı durur; `Reveal` görünür kalır (opacity:1); mockup statik; Living Flow reduced-motion'da statik | ✅ Geçti | `globals.css:121` — `.reveal opacity:1` + `*` animation-duration 0.001ms !important (pulse durur); `useFlowMode` reduced-motion→statik; test: h1 opacity=1 |
| 12 | **perf/CLS (§3):** raster görsel yok (LCP metin h1); sabit-boyut kart/mockup → CLS≈0; korunan taban regresyonsuz (a11y/CLS ortam-bağımsız; perf mutlak alan-ölçümüne bağlı — ILKELER) | ✅ Geçti | Lighthouse **CLS=0**; raster görsel yok (LCP=metin). Perf skoru (74) software-GL ortamında şişer → mutlak kıyas yapılmadı (ILKELER: alan-ölçümü); a11y/CLS ortam-bağımsız = geçerli |
| 13 | **CTA davranışı (karar/mailto):** hero/fiyat/kapanış CTA'ları subject'li `mailto:kivanc@kiwiailab.com?subject=Alpfit%20Plus%20...`; "Fiyatları gör" + hero primary altı `#fiyat` çapasına kayar (`scroll-mt-24`) | ✅ Geçti | Prerender: demo talebi ×3 (hero/fiyat/kapanış) + fiyat teklifi ×1 + hakkında ×1; `#fiyat` çapası + `scroll-mt-24` var |
| 14 | **Çapraz-regresyon + hijyen (adversarial):** diğer alt sayfalar (crew-os/vaka/bülten×2) + ana sayfa a11y kırılmadı; orphan `GymSoftwareShowcase.tsx` silindi (grep 0 tüketici); `public/gym/*.png` referanssız ama korundu (Kapsam Dışı) | ✅ Geçti | Playwright tam süit **52/52** (home + 5 alt sayfa çift-tema); `GymSoftwareShowcase` grep 0 tüketici, `components/gym/` yok; `public/gym/*.png` (4) korundu |
| 15 | **Craft — imza/üst eksen (§1, subjektif):** sayfa custom-built/SOTD hissi verir mi? "zero template smell"? tek imza (Living Flow) öne çıkar, efekt kalabalığı yok; tipografi/beyaz-alan restraint; mockup craft'ı | ✅ Geçti | **Kullanıcı onayı 2026-07-16** — SOTD-kalibre, şablon kokusu yok, imza korunmuş, mockup craft'ı yüksek, tema-flip temiz (screenshot incelemesi + kullanıcı verdikti) |
| 16 | **Konsol/runtime temizliği (adversarial):** sayfa 5 dilde yüklenince JS hata/uyarı yok; iç-ad ("Bunker OS") yüzeyde sızmıyor | ✅ Geçti | Playwright: 0 console.error / pageerror (5 dil); prerender'da "Bunker" 0 (yüzey sızıntısı yok) |

---

## Retrospektif

> `/devflow:review-phase 15` oturumunda dolduruldu (2026-07-16).

### Ne İyi Gitti?
- **Araştırmada damgalanan zor tasarım kararları icrayı temiz dikey dilimlere böldü — yeniden-iş (rework) sıfır.** ink-panel inversion + tek `--color-surface` token + mockup i18n-dışı sabit-TR + crew named-key+map deseni önden kararlaştırıldığı için 7 task foundation → orta bölümler → final entegrasyon olarak sorunsuz üst üste bindi. i18n namespace **yapı portuyla birlikte** indi (15.01'de `alpfit` kökü + kabuk) → ara durumda TR-hardcode/EN-fallback regresyonu doğmadı; **tek-faz kararının gerekçesi tam da buydu ve karşılığını verdi.**
- **a11y-mühürlü mevcut desenler yeniden kullanıldı → yeni tema-tuzağı yüzeyi açılmadı.** Sayfaya **iki koyu panel** (fiyat bandı + "Neden" aside) + **kendi açık paletli** telefon mockup'ları eklenmesine rağmen a11y=100 çift-tema korundu: ink-panel inversion (TD4/Faz 8), `--color-pulse-ink` adaptif token, off-viewport backdrop fix (15.05→15.06 genelleştirildi) hazır, kanıtlı çözümlerdi.
- **CSS Module (repoda yeni desen) en yüksek craft-maliyetli mockup portunu izole etti** — artifact `.phone`/`.ph-*` birebir taşındı, `globals.css` yalın kaldı (yalnız +4 satır token). Pixel-craft sadakati + modülerlik birlikte sağlandı; plan-teyidi tuttu (globals.css-ekleme fallback'ine düşülmedi).
- **Off-viewport axe kontrast disiplini faz-içinde genelleşti ve memory'de kanonikleşti** (aside pull-quote 15.05 → fiyat bandı eyebrow/₺/free-satır 15.06; `axe-offscreen-inline-contrast`). Tekrar eden bir tuzağın çözümü ikinci karşılaşmada hazırdı → sürtünme eridi.
- **UAT ortamı tam araç-zincirine sahipti** (system Chrome+swiftshader, Lighthouse 13.4) → 15.07'de ertelenen numerik Lighthouse a11y=100 çift-tema gate verify-phase'de kapandı, review'a taşınmadı. Otomatik güvence katmanı (CI iki job success + security-review bulgu-yok + Vitest 39/39 + build exit 0) insan-UAT'ından önce tarandı.

### Ne Kötü Gitti?
- **15.07 numerik Lighthouse'u koşamadı → a11y=100 gate'i verify-phase'e devretti.** Lighthouse binary npx-cache'te yoktu (kurulum onay-gerektiren) → 15.07 task-sanctioned build+inspect (structural audit prerender'da temiz) + axe çift-tema fallback'ine düştü; numerik gate UAT'a kaydı. Kabul edilebilir (verify-phase kapattı, kaynak değişmedi) ama task-seviyesi bir gate'in UAT'a kayması ideal değil — ortam araç-zinciri per-session flaky (bilinen, memory `perf-olcum-devcontainer-kurulumu`).
- **Artifact'ın tek-tema paleti çift-temada olduğu gibi port edilemedi.** Muted metin için artifact `--band-soft` seviyesi dark-tema krem-flip'inde AA'yı geçmiyor → `text-canvas/65`'e (bir kademe yukarı, TASK-8.02 emsali) çekmek gerekti. Küçük sapma ama artifact'ın (tek-tema HTML) renk paletinin olduğu gibi taşınamayacağını doğruladı — beklenen, ama her koyu-panel port'unda çift-tema doğrulaması şart.

### Sonraki Faz İçin Öneriler
- **Faz 15 = v0.4'ün tek içerik fazı (Alpfit Plus ürün vitrini) tamam.** Versiyon Sonu Durumu `içerik_fazları` (değişmez — bu bir içerik fazıdır); v0.4'ün içerik işi bitti. Sıradaki adım **`/devflow:discuss-phase 16`** — discuss-phase 16 Adım 0 versiyon-sonu tespitiyle `içerik_fazları`→`teknik_borç` promote edecek (versiyon-sonu teknik borç fazı; Faz 7→8 emsali).
- **v0.4 versiyon-sonu / release için sahipli kalemler (teknik borç fazı + prd-review adayları):**
  - **non-TR (en/ar/de/es) `alpfit` namespace = TR stale-kopya.** 133 leaf × 5 dil yapısal olarak tam (parite yeşil) ama non-TR değerler şu an **birebir Türkçe** — yeni bir ürün vitrini için EN/AR/DE/ES sayfalarında büyük hacimde Türkçe metin. Bilinçli (versiyon-sınırı, TR tek kaynak — DECISIONS 2026-06-27) ama v0.4 çeviri geçişi / dil stratejisi prd-review'da öne çıkmalı.
  - **`public/gym/*.png` (4 dosya, ~1.7MB) referanssız diskte kaldı** (asset silme bilinçle Kapsam Dışı) → disk hijyeni teknik borç adayı.
  - **Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil). v0.4 henüz canlı değil (branch `revize/alpfit-plus`, `main`'e merge edilmedi) → **v0.4 production release** (merge) versiyon-sonunda bilinçli adım olur (v0.2 release emsali, DECISIONS 2026-07-01).
- **Önceki faz (14) önerileri prosedüreldi ve uygulandı:** zorunlu prd-review yapıldı (v0.4 re-kickoff'la açıldı); B-grubu kalemler v0.3 prd-review'a aitti. `page.route` interception önerisi ortam-bağımlıydı — bu oturum ortamı tam araç-zincirine sahip olduğundan verify-phase system Chrome+Playwright kullandı (gerek kalmadı, ideal ortam).

### Task-Spesifik Teknik Öğrenimler
<!-- Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar. Proje-geneli olan (axe-offscreen backdrop) memory'de kanonikleşti. -->
- **Artifact tek-tema paleti çift-temada olduğu gibi port edilemez:** flip eden ink-panel üstünde muted metin `text-canvas/65` (AA-güvenli seviye, TASK-8.02) olmalı — artifact `--band-soft`'un bir kademe üstü. 15.05/15.06 portunda bulundu.
- **CSS Module bu repoda (Next 15 App Router) çalışıyor** — pixel-craft mockup için doğrulandı; co-located `.module.css` scope'ludur, `globals.css` yalın kalır (+4 satır token dışında global şişme yok). Yeni desen, plan-teyidi tuttu.
- **`t.rich` `<b>` aksanının kendi panel zeminini (`bg-ink`) miras alması** axe kontrastını opak panel karşısında çözer (~11.5:1), off-viewport body-canvas'a mis-resolve'u engeller (memory `axe-offscreen-inline-contrast`, bu fazda genelleştirildi).

---

## Kalite Kontrol Sonuçları

> `/devflow:review-phase 15` oturumunda dolduruldu (2026-07-16). İçerik fazı — yeni yüzey (8 bileşen + `alpfit` namespace + 1 token) üretildi; her eksen bu yeni yüzey üzerinde sistematik kontrol edildi.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ | İmza Living Flow hero'da korundu (Craft üst eksen) + opak before/after kartı akış üstünde temiz; ekran görüntüleri kalktı, artifact dekoratif radial'ları bırakıldı (efekt kalabalığı yok — Living Flow ambient yeşili taşır); Fraunces/Geist token tipografi + ink-panel restraint; mockup CSS Module birebir port. **Kullanıcı onayı: SOTD-kalibre, zero template smell (UAT #15).** |
| Erişilebilirlik | ✅ | Lighthouse a11y=100 çift-tema (structural audit'ler dahil, UAT #9) + axe spor-salonu **10/10** (5 dil × light+dark) WCAG-AA 0 ihlal — koyu fiyat bandı + koyu aside + telefon `--a-*` paleti dahil (#8); tek `<main>`/tek `<h1>`/sıralı başlık; dekoratif SVG'ler `aria-hidden`; off-viewport inline-kontrast backdrop fix (memory). İki-gate mühür uygulandı. |
| Performans | ✅ | Raster görsel yok → LCP metin (h1); sabit-boyut kart/mockup → **CLS=0** (UAT #12); tek Living Flow (ek WebGL maliyeti yok); yeni font yok; eski 4-PNG (~1.7MB) yükü kalktı. Perf mutlak skoru software-GL ortamda şişer → kıyas yapılmadı (ILKELER alan-ölçümü); a11y/CLS ortam-bağımsız = geçerli. |
| Yerelleştirme & RTL | ✅ | `alpfit` 133 leaf × 5 dil parite (Vitest 39/39, eksik anahtar=fail) + 0 `MISSING_MESSAGE` (build, 5 locale SSG); AR `dir=rtl` aynalama — logical prop 31 hit, before/after `→` tick `←`'e döner (#5); mockup `dir=ltr` sabit-TR (RTL-güvenli). **Sahipli:** non-TR ar/de/es = TR stale-kopya (versiyon-sınırı, TR tek kaynak) → görünür kopukluk yok ama v0.4 çeviri geçişi prd-review'a. |
| Modülerlik & Bakım | ✅ | `components/alpfit/` hibrit dizin: kabuk (`AlpfitShowcase`) + bölüm alt-bileşenleri + izole `PhoneMockups`; crew named-key+map deseni (JSON array yok, kopya-kod yok) roller/özellik/neden/fiyatta; primitive'ler yeniden kullanıldı (Reveal/PageHeader/Footer/LivingFlow/FlowScrim); **tek** yeni token (`--color-surface`, `--band-*` ailesi eklenmedi); CSS Module co-located; orphan `GymSoftwareShowcase` silindi. Sorun/roadmap/kapanış kabukta inline (küçük bloklar — bilinçli). |
| Hata Yönetimi & Degradasyon | ✅ | Living Flow reduced-motion→statik, no-WebGL→statik (yeniden kullanıldı); `Reveal` reduced-motion'da no-op (görünür kalır); pilot `.dot` nabzı motion-gated; mockup statik (UAT #11). i18n eksik anahtar=build fail (guard). Statik pazarlama sayfası → yeni failure yüzeyi yok. |
| Güvenlik | ✅ | security-review **bulgu yok** (UAT Adım 1): statik sayfa, kullanıcı-girdisi yok, dinamik sink (`dangerouslySetInnerHTML`/`eval`) yok, `href`'ler sabit `mailto:` sabitleri, `t.rich` güvenli next-intl API (statik içerik + sabit `<b>` eşlemesi), secret yok. Silme (Gym + `next/image`) yalnız yüzeyi küçültür. |
| Test Kapsamı | ✅ | Vitest 39/39 (i18n parite `alpfit` ns'i otomatik kapsadı) + Playwright/axe tam süit **52/52** (spor-salonu 10/10 çift-tema, çapraz-regresyonsuz) + CI `fast`+`a11y` success. Kümülatif harness yeniden kullanıldı — yeni test dosyası gerekmedi (parite + a11y tohumları yeni namespace/sayfayı otomatik kapsar). Mockup içi sabit-TR metin test-dışı ama bilinçle i18n-dışı (gerçek ürün ekranı semantiği) — boşluk değil. |

**Kullanıcı yolculuğu / boşluk:** Akış tutarlı — ana sayfa Sektörler gym paneli "Live — Alpfit" CTA'sı + hero Alpfit rozeti bu sayfaya (`/spor-salonu-yazilimi`) gider (hedef korundu, değiştirilmedi); sayfa Hero→Sorun→Roller→Uygulama→Özellik→Neden→Fiyat→Yol haritası→Kapanış akar, CTA'lar mailto + `#fiyat` çapası, PageHeader geri-linki + global Nav. Sahipsiz boşluk yok. **Tek referanssız yüzey:** `public/gym/*.png` (4 dosya diskte, hiçbir bileşen tüketmiyor) — kullanıcıya görünmez, disk hijyeni teknik borç adayı (bilinçle Kapsam Dışı).

---

## Sonuç

- **Tamamlanma Tarihi:** 2026-07-16
- **Toplam Task:** 7 (TASK-15.01→15.07) — hepsi ✅, düzeltme task'ı gerekmedi
- **Notlar:** v0.4 Alpfit Plus ürün vitrini tamamlandı — **UAT 16/16 GEÇTİ, kapsam-içi bug 0, düzeltme task'ı 0.** Alpfit (`/spor-salonu-yazilimi`) sayfası artifact hedef düzenine port edildi (9 bölüm: Hero+before/after · Sorun · 4 Rol · Mobil mockup'lar · 9 Özellik · Neden · Fiyat bandı · Yol haritası+Store · Kapanış) — React+Tailwind v4 token + `alpfit` 5-dil namespace (133 leaf parite) + izole `components/alpfit/` (8 bileşen, CSS Module mockup); imza Living Flow korundu, dürüstlük 4/4 gerçek aynen, guardrail'ler (a11y=100 çift-tema · CLS=0 · i18n parite · marka sesi · reduced-motion) regresyonsuz; Craft kullanıcı onayı (SOTD-kalibre). Orphan `GymSoftwareShowcase` + `next/image` bağımlılığı düştü; yalnız `--color-surface` tek yeni token. Kalite 8 eksen ✅. **Sahipli kalemler v0.4 versiyon-sonu / prd-review'a:** non-TR stale çeviri · `public/gym/*.png` disk hijyeni · canlı `ANTHROPIC_API_KEY` env (v0.4 henüz canlı değil → prod release versiyon-sonunda). Versiyon Sonu Durumu `içerik_fazları` (değişmez); sıradaki adım **`/devflow:discuss-phase 16`** (versiyon-sonu teknik borç fazı — discuss-phase 16 promote eder).

---

**Oluşturulma:** 2026-07-16 (discuss-phase 15)
**Son Güncelleme:** 2026-07-16 — **review-phase 15 ✅: FAZ TAMAMLANDI.** Retrospektif + kalite kontrol (8 eksen ✅) + sonuç yazıldı. UAT 16/16 GEÇTİ, kapsam-içi bug 0, düzeltme task'ı 0. Bağımsız re-teyit: orphan gym kalıntısı 0 · "Bunker" alpfit ns'de 0 (5 dil) · `crewOs` ödünç bırakıldı · dürüstlük 4/4 TR değerleri VAR · parite 133 leaf × 5 dil · `--color-surface` çift-tema. Boyut kontrolü (Adım 5b): ~8.7k token `token-rahat` → bölme gerekmedi. İmza Living Flow + dürüstlük 4/4 korundu; guardrail'ler regresyonsuz; Craft SOTD-kalibre kullanıcı onayı. Versiyon Sonu Durumu `içerik_fazları` (değişmez); sahipli kalemler (non-TR stale · gym png disk hijyeni · canlı env) v0.4 versiyon-sonu/prd-review'a. Sıradaki adım **`/devflow:discuss-phase 16`** (versiyon-sonu teknik borç fazı).
