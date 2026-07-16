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

> Bu bölüm `/devflow:research-phase 15` oturumunda doldurulacak.

### Değerlendirilen Yaklaşımlar
- [Yaklaşım 1]: [Açıklama, artılar, eksiler]
- **Seçilen:** [Hangisi ve neden]

### Kullanılacak Araçlar/Kütüphaneler
- [Araç 1]: [Versiyon, ne için]

### Dikkat Edilecekler
- [Tuzak/Risk 1]: [Nasıl kaçınılacak]

### Teknik Kararlar
- [Karar 1]: [Gerekçe]

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
**Son Güncelleme:** 2026-07-16 — discuss-phase 15: Kapsam Tartışması yazıldı (tek faz; imza Living Flow + before/after hero; ekran görüntüleri kaldırılır; çapa-nav yok; mailto CTA; dürüstlük 4/4 aynen; Store = e-ticaret yol-haritası kalemi; route korunur; 5-dil `alpfit` namespace önerisi).
