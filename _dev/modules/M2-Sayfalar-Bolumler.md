# M2: Sayfalar & Bölümler (IA / İçerik)

**Sorumluluk:** Sitenin bilgi mimarisini taşımak — locale-prefixli route'lar, ana sayfa kompozisyonu ve tüm bölüm/showcase bileşenleri (içerik + yerleşim).
**Bağımlılık:** M1 (tasarım token'ları, Living Flow), M3 (Reveal/Magnetic/scroll primitives), M4 (tüm metin i18n'den), M5 (chatbot ana sayfada gömülü).
**Sınır:** Bölümlerin görünümü, içeriği ve yerleşimi. Genel etkileşim mekanikleri M3'te; WebGL imza M1'de; çeviri metinleri M4'tedir.

> **Bilinen revize konuları** bu modülde yoğunlaşıyor (kopya zayıf, "Nasıl çalışır" 3→4 adım, sektörler sığ, Crew OS bölümü yanlış içerik). Detay: `docs/REVIZE-BACKLOG.md`.

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
- İstatistik şeridi öğeleri **tıklanabilir olduğu yeterince belli değil** (affordance) — bkz. REVIZE-BACKLOG.

---

### F2.3: "Nasıl çalışır" bölümü → Faz —

**Açıklama:** `HowItWorks.tsx` — şu an 3 adım (Analiz · Tespit · Otomasyon), aralarında GSAP ScrollTrigger ile animasyonlu SVG bağlayıcı (Living Flow motifi).

**Kabul Kriterleri:**
- Adımlar scroll'da koreografik açılır; bağlayıcı çizgi scrub ile çizilir.

**Bağımlılık:** M3 (ScrollTrigger), M4

**Edge Case'ler:**
- **Revize hedefi:** Analiz/Tespit içerikçe örtüşüyor; 4 adıma çıkarılması ve açıklamaların genişletilmesi isteniyor (örn. Analiz · Çözüm · Otomasyon · Raporlama) — bkz. REVIZE-BACKLOG.

---

### F2.4: Sektör çözümleri → Faz —

**Açıklama:** `SectorSolutions.tsx` — sekmeli seçici (spor salonu, klinik, e-ticaret, emlak, eğitim/danışmanlık, restoran/kafe). Her panel: başlık, gövde, CTA (sayfa varsa "uygulamayı gör", yoksa mailto), sağda Trigger→Action→Result akışı + durum rozeti.

**Kabul Kriterleri:**
- Sekme değişimi GSAP fade ile panel değiştirir.
- Spor salonu paneli Alpfit sayfasına ("Live — Alpfit") gider.

**Bağımlılık:** M3, M4

**Edge Case'ler:**
- **Revize hedefi:** İçerik sığ/tekrara düşüyor (siyah zeminde 3 madde, birbirini tekrar eden); her sektör için zenginleştirme isteniyor — bkz. REVIZE-BACKLOG.
- Metrikler "öngörü/örnek" olarak işaretli kalmalı (gerçek veri gelene dek).

---

### F2.5: Bunker (Crew OS teaser bölümü) → Faz —

**Açıklama:** `Bunker.tsx` — başlık + gövde + Crew OS panelinde 4 otomasyon akışı (animasyonlu nabız barları), `/bunker-os`'a link.

**Kabul Kriterleri:**
- Panel akışları "running/queued" durumlarıyla animasyonlu.
- "Keşfet" linki Bunker OS sayfasına gider.

**Bağımlılık:** M1, M4

**Edge Case'ler:**
- **Revize hedefi (kritik):** Siyah zemindeki 4 madde **Bunker OS ile alakasız** — Alpfit özellikleri yazılmış. Doğru Crew OS içeriğiyle değiştirilmeli — bkz. REVIZE-BACKLOG.

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

### F2.7: Bunker OS showcase sayfası → Faz —

**Açıklama:** `bunker-os/page.tsx` + `components/bunker-os/BunkerShowcase.tsx` — hero (Living Flow), uçtan uca mimari diyagram (Kaynaklar → çekirdek → Kanallar + geri-besleme, animasyonlu nabızlar), "Nasıl çalışır" 4 adım, canlı operasyon paneli (örnek metrikler).

**Kabul Kriterleri:**
- Mimari diyagram nabız animasyonlarıyla render edilir.
- PageHeader + LivingFlow yeniden kullanılır.

**Bağımlılık:** M1, M3, M4

**Edge Case'ler:**
- Metrikler örnek/placeholder olarak konumlanmalı.

---

### F2.8: Alpfit (spor salonu yazılımı) sayfası → Faz —

**Açıklama:** `spor-salonu-yazilimi/page.tsx` + `components/gym/GymSoftwareShowcase.tsx` — hero, 8 özellik grid'i (locale'e göre TR/EN liste), 4 ürün ekran görüntüsü (`public/gym/*.png`, `next/image`), CTA bandı.

**Kabul Kriterleri:**
- Ekran görüntüleri responsive `next/image` ile (AVIF/WebP).
- `useLocale()` ile TR/EN özellik listesi seçilir.

**Bağımlılık:** M1, M4, M6 (image)

**Edge Case'ler:**
- Görseller gerçek Alpfit demo'sundan; marka tutarlılığı korunmalı.

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
- Showcase sayfaları (Bunker OS, Alpfit) `PageHeader` + `LivingFlow` desenini paylaşır.
- **Bilinen sorunlar bu modülde toplanıyor** — kopya kalitesi, "Nasıl çalışır" yapısı, sektör derinliği, Crew OS içerik hatası, CTA affordance/ölçekleme: `docs/REVIZE-BACKLOG.md`.

---

**Son Güncelleme:** 2026-06-27
