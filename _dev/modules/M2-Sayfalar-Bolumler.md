# M2: Sayfalar & Bölümler (IA / İçerik)

**Sorumluluk:** Sitenin bilgi mimarisini taşımak — locale-prefixli route'lar, ana sayfa kompozisyonu ve tüm bölüm/showcase bileşenleri (içerik + yerleşim).
**Bağımlılık:** M1 (tasarım token'ları, Living Flow), M3 (Reveal/Magnetic/scroll primitives), M4 (tüm metin i18n'den), M5 (chatbot ana sayfada gömülü).
**Sınır:** Bölümlerin görünümü, içeriği ve yerleşimi. Genel etkileşim mekanikleri M3'te; WebGL imza M1'de; çeviri metinleri M4'tedir.

> **v0.1 revize işi bu modülde yoğunlaşıyor** — PRD/prd-refine reframe: canlı TR kopya beklenenden güçlü → **cerrahi / ana-sayfa odaklı** (baştan-sona rewrite değil). Yapısal iş: "Nasıl çalışır" 3→4 adım (R1) + Sektörler gym paneli tek-otomasyona (R2). Ses cilası: Crew OS bölümü teyidi (R3) + dürüstlük taraması & hero ikincil CTA (R4). Kaynak: `_dev/PRD/features/`; ham girdi & ertelenen kalemler: `docs/REVIZE-BACKLOG.md`. (Taksonomi: public **Crew OS** / iç ad Bunker OS — `docs/DECISIONS.md`.)

---

## Feature'lar

### F2.1: Ana sayfa kompozisyonu → Faz —

**Açıklama:** `src/app/[locale]/page.tsx` — sırayla Hero → HowItWorks → SectorSolutions → Bunker → Forum → Chatbot → Credibility → Footer.

**Kabul Kriterleri:**
- Tüm bölümler tek sayfada akış sırasıyla render edilir.
- 5 locale için `generateStaticParams`; `generateMetadata` ile dil-özel meta.

**Bağımlılık:** F2.2–F2.6, M5

**Edge Case'ler:**
- Bölüm sırası scroll koreografisini etkiler (M3 ile uyumlu kalmalı).

---

### F2.2: Hero → Faz —

**Açıklama:** `Hero.tsx` — Living Flow + FlowScrim arkası; GSAP staggered giriş; başlık ("İşinizi analiz ederiz. Sonra otomatikleştiririz."), alt metin, CTA'lar (Magnetic), istatistik şeridi (Alpfit / Crew OS rozetleri detay sayfalara link).

**Kabul Kriterleri:**
- İstatistik şeridindeki Alpfit ve Crew OS öğeleri ilgili sayfalara gider.
- Reduced-motion'da animasyonsuz okunur kalır.

**Bağımlılık:** M1, M3, M4

**Edge Case'ler:**
- İstatistik şeridi öğeleri zaten `<Link>` (Alpfit/Crew OS) — sorun **görsel affordance** (tıklanabilir olduğu belli değil, A3). Kopya değil → **görsel/etkileşim versiyonuna ertelendi** (v0.1 dışı).
- **v0.1 (R4 / PRD F6):** Hero ikincil CTA ("Canlı gör") aslında `#sectors`'a kayıyor — etiket belirsiz; net etiket istenir ("İşleyen örnekleri gör" / "Çözümleri gör"). PRD: `_dev/PRD/features/kopya-revizesi.md`.

---

### F2.3: "Nasıl çalışır" bölümü → Faz —

**Açıklama:** `HowItWorks.tsx` — şu an 3 adım (Analiz · Tespit · Otomasyon), aralarında GSAP ScrollTrigger ile animasyonlu SVG bağlayıcı (Living Flow motifi).

**Kabul Kriterleri:**
- Adımlar scroll'da koreografik açılır; bağlayıcı çizgi scrub ile çizilir.

**Bağımlılık:** M3 (ScrollTrigger), M4

**Edge Case'ler:**
- **v0.1 (R1 — adlar KARARLAŞTI):** 3 adım (Analiz/Tespit içerikçe örtüşür; ölçüm Otomasyon kuyruğunda gömülü) → **4 örtüşmesiz adım: Analiz · Çözüm · Otomasyon · Raporlama.** Eski 01 Analiz + 02 Tespit tek "Analiz"e erir; "Çözüm" gerçekten eklenen yeni adım; ölçüm "Raporlama" olarak ayrılır. Başlık `how.title` "Üç adım…" → "Dört adım…". 4. adım için yeni i18n anahtarı (örn. `report`). Bu ajans sürecidir; Crew OS sayfasındaki platform 4-adımıyla (Bağla/Akış kur/Çalıştır/Ölç) **çelişmez** (o sayfaya dokunulmaz). Zayıf/edilgen ad ("Dinle/Listen") yasak. PRD: `_dev/PRD/features/nasil-calisir-4-adim.md`.

---

### F2.4: Sektör çözümleri → Faz —

**Açıklama:** `SectorSolutions.tsx` — sekmeli seçici (spor salonu, klinik, e-ticaret, emlak, eğitim/danışmanlık, restoran/kafe). Her panel: başlık, gövde, CTA (sayfa varsa "uygulamayı gör", yoksa mailto), sağda Trigger→Action→Result akışı + durum rozeti.

**Kabul Kriterleri:**
- Sekme değişimi GSAP fade ile panel değiştirir.
- Spor salonu paneli Alpfit sayfasına ("Live — Alpfit") gider.

**Bağımlılık:** M3, M4

**Edge Case'ler:**
- **v0.1 (R2 — reframe):** prd-refine bulgusu: 6 sektörden 5'i (klinik, e-ticaret, emlak, eğitim, restoran) zaten tek-otomasyon desenine (tetikleyici→eylem→sonuç) uyuyor ve özgün → **korunur** (A5 "hepsi sığ" tespiti abartılı). Asıl iş dar: **`gyms` paneli desen-DIŞI** — sol taraf tek otomasyon değil Alpfit **özellik listesi**; bölümün kendi sözünü ("her örnek tek otomasyon, özellik listesi değil" — `sectors.sub`) bozuyor. gym'i tek-otomasyona getir (`gyms.flow` zaten doğru: kaçan üye → WhatsApp teklif/PT → takip); Alpfit ürün/özellik anlatımı ayrı CTA + `/spor-salonu-yazilimi`'nde kalır. PRD: `_dev/PRD/features/sektorler-derinlestirme.md`.
- "Canlı — Alpfit" rozeti (nabız atan) **korunur** — dürüst canlı gösterge (yasak = sahte presence; `docs/DECISIONS.md` 2026-06-28).
- Metrikler "öngörü/örnek" olarak işaretli kalmalı (gerçek veri gelene dek — R4/F5 dürüstlük konvansiyonu).

---

### F2.5: Crew OS teaser bölümü → Faz —

**Açıklama:** `Bunker.tsx` (bileşen adı iç ad kalıntısı; namespace `crew`) — başlık + gövde + Crew OS panelinde 4 otomasyon akışı (animasyonlu nabız barları), `/crew-os`'a link. Sitede görünen ad **Crew OS**.

**Kabul Kriterleri:**
- Panel akışları "running/queued" durumlarıyla animasyonlu.
- "Keşfet" linki Crew OS showcase sayfasına (`/crew-os`) gider.

**Bağımlılık:** M1, M4

**Edge Case'ler:**
- **v0.1 (R3 — büyük ölçüde çözülmüş):** prd-refine: bölümün **ana metni zaten doğru** (`bunker.title/body/points` platform kimliğini anlatıyor — gözlemlenebilir/ölçülebilir/hep-açık; Alpfit özellik listesi değil). REVIZE-BACKLOG A6 (*"4 madde Alpfit, alakasız"*) çözülmüş. **Kalan tek kalem:** sağdaki canlı panelin 4 akış adı (`bunker.flows`) sektöre-özgü; **karar: bırakıldı** — "platformda çalışan gerçek akışlar" çerçevesi (Crew OS'un *tanımı* değil; craft = gerçek akış adı soyut etiketten inandırıcı). PRD: `_dev/PRD/features/crew-os-bolumu.md`.
- Bayrak katman her yüzeyde **"Crew OS"** anılır; "Bunker OS" görünmez. `crew.explore` → `/crew-os` showcase sayfasına gider (i18n namespace `bunker`→`crew` + route `/bunker-os`→`/crew-os` **v0.3 Faz 11'de rename edildi**; eski `/bunker-os` → kalıcı 308 redirect).

---

### F2.6: Bülten/Forum bölümü + makale sayfaları → Faz —

**Açıklama:** `Forum.tsx` (ana sayfa bölümü, öne çıkan 2 makale + abone bandı `BulletinSubscribe`) + makale sayfaları `bulten/ai-sdr-araclari` (içerik `forum/ArticleAiSdr.tsx`), `bulten/claude-opus-4-8-fable-5` (`forum/ArticleClaude.tsx`). Eski `/forum` → `/bulten` kalıcı redirect.

**Kabul Kriterleri:**
- Öne çıkan kartlar ilgili makale sayfalarına gider.
- `/forum` ve `/forum/:slug*` → `/bulten` redirect çalışır.

**Bağımlılık:** M4, M6 (redirect)

**Edge Case'ler:**
- Forum şu an statik (backend yok); yeni makale eklemek kod değişikliği gerektirir.

---

### F2.7: Crew OS showcase sayfası (route /crew-os) → Faz —

**Açıklama:** `crew-os/page.tsx` (route klasörü v0.3 Faz 11'de rename edildi; namespace `crewOs`) + `components/bunker-os/BunkerShowcase.tsx` (component dizini iç-ad kalıntısı — taksonomi izin veriyor, URL'de sızmıyor; sitede görünen ad **Crew OS**) — hero (Living Flow), uçtan uca mimari diyagram (Kaynaklar → çekirdek → Kanallar + geri-besleme, animasyonlu nabızlar), "Nasıl çalışır" 4 adım (platform: Bağla/Akış kur/Çalıştır/Ölç), canlı operasyon paneli (örnek metrikler). **v0.1 dışı** — sayfa ana sayfa revizesi kapsamında değil.

**Kabul Kriterleri:**
- Mimari diyagram nabız animasyonlarıyla render edilir.
- PageHeader + LivingFlow yeniden kullanılır.

**Bağımlılık:** M1, M3, M4

**Edge Case'ler:**
- Metrikler örnek/placeholder olarak konumlanmalı.

---

### F2.8: Alpfit (spor salonu yazılımı) sayfası → Faz —

**Açıklama:** `spor-salonu-yazilimi/page.tsx` + `components/alpfit/*` — `AlpfitShowcase` orchestrator (tek `<main>` landmark, bölümleri kompoze eder) + 5 bölüm bileşeni (`AlpfitHero`/`AlpfitRoles`/`AlpfitFeatures`/`AlpfitWhy`/`AlpfitPricing`) + izole `PhoneMockups` (saf CSS iPhone mockup'ları); Sorun/Yol haritası/Kapanış bölümleri orchestrator içinde inline. Saf CSS/SVG — raster görsel yok, `next/image` düştü.

**Kabul Kriterleri:**
- Bölümler saf CSS/SVG ile render edilir (raster görsel yok); telefon mockup'ları izole CSS Module ile birebir.
- İçerik 5-dil `alpfit` i18n namespace'inden gelir (TR birincil, non-TR versiyon-sınırı); dürüstlük 4/4 gerçek korunur.

**Bağımlılık:** M1 (Living Flow), M3 (Reveal/PageHeader/Footer), M4 (i18n)

**Edge Case'ler:**
- Telefon mockup içi metin i18n-dışı sabit-TR (gerçek TR ürün ekranı semantiği, RTL-güvenli `dir="ltr"`).
- **v0.4 (AP1–AP3 — "Alpfit Plus" zengin yeniden tasarım):** sayfa sade halden zengin ürün landing page'ine taşınır — Hero/before-after · Sorun · 4 Rol · **Mobil uygulama mockup'ları** (saf CSS iPhone; en yüksek craft maliyeti) · 9 Özellik · Neden/rekabet ("18 rakip üründe yok") · **Fiyat** (₺1.500+KDV, public/kesin) · Yol haritası (+Store) · Kapanış. **i18n değişir:** component-içi `tr?...:...` TR/EN deseni → düzgün 5-dil namespace (`messages/*.json`; TR birincil, non-TR versiyon-sınırı). Dürüstlük 4/4 gerçek (canlı pilot / public fiyat / ürün iddiaları mevcut / 18-rakip) → içerik olduğu gibi. Route `/spor-salonu-yazilimi` korunur. Kabul kriterleri + kopya: `_dev/PRD/features/alpfit-plus.md`; tasarım referansı `_dev/docs/alpfit-plus-artifact.html`. Faz/iş-birimi bölünmesi discuss-phase 15'te.

---

### F2.9: Vaka çalışmaları sayfası → Faz —

**Açıklama:** `vaka-calismalari/page.tsx` + `components/CaseStudies.tsx` — 6 vaka (spor salonu, klinik, e-ticaret, emlak, eğitim, restoran), her biri Durum → Akış → Sonuç + metrik; alt CTA.

**Kabul Kriterleri:**
- 6 vaka Reveal stagger ile render edilir.
- Metrikler örnek/placeholder işaretli (gerçek veri gelene dek).

**Bağımlılık:** M3, M4

**Edge Case'ler:**
- Gerçek müşteri verisi geldiğinde placeholder'lar değişecek.

---

## Teknik Notlar

- İçerik veri-odaklı: sabit JS dizileri (KEYS/STUDIES vb.) + i18n namespace'leri eşleştirilir; veritabanı yok.
- Akıcı tipografi: `clamp()` ile (örn. `text-[clamp(2rem,4.5vw,3.5rem)]`).
- Showcase sayfaları (Crew OS [route `/crew-os`], Alpfit) `PageHeader` + `LivingFlow` desenini paylaşır.
- **v0.1 revize işi (R1–R4) bu modülde** (PRD reframe: cerrahi/ana-sayfa) — yapısal: Nasıl Çalışır 4 adım (R1), Sektörler gym paneli (R2); ses: Crew OS teyidi (R3), dürüstlük taraması + hero ikincil CTA (R4). Kaynak: `_dev/PRD/features/`. Ertelenenler (görsel cila A1/A3, Living Flow kapsamı, test): `docs/REVIZE-BACKLOG.md`.

---

**Son Güncelleme:** 2026-07-17 — review-phase 16: F2.8 Kabul Kriterleri/Bağımlılık/Edge Case gerçeklik-senkron (stale `next/image`/AVIF-WebP + `useLocale() TR/EN` + `M6 (image)` → v0.4 saf CSS/SVG + `alpfit` 5-dil namespace + M1/M3/M4 bağımlılık). base "Açıklama" (satır 123) run-task 16.01'de senkronlanmıştı; bu blok kardeş satırların gym→Alpfit driftini kapatır (v0.4 Faz 15 port'u sonrası artık geçersizdi).
