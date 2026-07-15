# Alpfit Plus — Ürün Vitrini (Alpfit sayfası zenginleştirme)

## Özet

Alpfit (spor salonu / kulüp işletme yazılımı — ayrı, bağımsız dikey ürün; VIZYON §3) sayfasının (`/spor-salonu-yazilimi`) mevcut sade halinden (hero + 8 özellik grid + ekran görüntüleri + CTA) **"Alpfit Plus" zengin ürün landing page'ine** yeniden tasarımı. Amaç: kulüp/stüdyo sahibine ürünün tüm değerini (dağınık araçlardan tek platforma; 4 rol; mobil uygulamalar; 9 özellik; rekabet farkı = diyetisyen aynı platformda; net fiyat) craft düzeyinde, dürüst ve çıktı-odaklı anlatıp demo/teklife yönlendirmek. Tasarım referansı: kullanıcının claude.ai artifact'i (marka token'larıyla uyumlu, tam kaynak `_dev/docs/alpfit-plus-artifact.html`).

**v0.4'ün tek merkez işi budur** (M2, F2.8). Alpfit ayrı üründür — Crew OS ile karıştırılmaz.

---

## Kullanıcı Senaryoları

- Kulüp sahibi sayfaya girer → hero'da "canlı pilotta" (gerçek) sinyali + before→after kartıyla "dağınık araç → tek platform" vaadini saniyeler içinde kavrar → "Demo iste" / "Fiyatları gör" CTA'sına yönelir.
- Ziyaretçi aşağı iner → 4 rol (üye/antrenör mobil, diyetisyen/yönetim web) → **mobil uygulama mockup'ları** (üye ana ekran/randevu/gelişim, antrenör yoklama) → 9 özellik → "neden biz" (diyetisyen aynı platformda, rakip farkı) → **net fiyat** (₺1.500+KDV/salon/ay) → yol haritası → kapanış CTA.
- Fiyatı gören ziyaretçi taahhüdü net görür (public fiyat, kesin) → "Teklif al" / "Demo iste" (mailto) ile iletişime geçer.

---

## Davranış Kuralları

[Bu bölüm M2 kabul kriterlerine dönüşür.]

- **Sayfa bölüm sırası (artifact v2):** Hero (pilot chip + H1 + before/after kartı) → Sorun → 4 Rol → **Mobil uygulama (mockup'lar)** → 9 Özellik → Neden Alpfit Plus → Fiyat → Yol haritası → Kapanış. Nav çapaları: Roller · Özellikler · Fiyat (+ mockup bölümüne `#uygulama`).
- **Port, kopya-yapıştır değil:** artifact düz HTML/CSS/JS. Sayfa React (Next 15 App Router) + **Tailwind v4 token'ları** (`--color-canvas/ink/green/pulse`, `--font-display/sans` — kendi `:root`/`<style>` değil) + **next-intl** ile inşa edilir. Mevcut primitive'ler yeniden kullanılır (`Reveal`, `PageHeader`, `Footer`, `SmoothScroll`, `CustomCursor`). Fraunces (display) + Geist (sans) — artifact'ın sistem-font fallback'i değil.
- **i18n = düzgün 5-dil namespace** (site standardı; mevcut sayfanın component-içi `tr ? ... : ...` TR/EN deseni terk edilir). İçerik `messages/{tr,en,ar,de,es}.json`'da; **TR tek kaynak** mükemmelleştirilir, non-TR **versiyon-sınırında** çevrilir (VIZYON §5). Yapısal anahtarlar 5 dilde eşzamanlı var olur (eksik anahtar = runtime hata); değer stale/placeholder geçici kabul. Namespace adı (`alpfit`/`gym`) discuss/plan'de netleşir.
- **Dürüstlük (4/4 gerçek — kullanıcı teyidi 2026-07-16):** hero "Weekend Training Club'da canlı pilotta" + nabız nokta **gerçek canlı** → korunur (ILKELER: gerçek canlı ürünün dürüst göstergesi yasak dışı; Alpfit örneği). Fiyatlar **kesin & public** → açık gösterilir. Ürün iddiaları (4 rol, diyetisyen modülü, mobil app'ler, çok-şube) **mevcut** → olduğu gibi anlatılır. "İncelediğimiz 18 rakip üründe yok" **gerçek inceleme** → sayı kalır.
- **Yol haritası "yakında" dürüst çerçeve:** artifact kalemleri (Online ödeme · QR/turnike · Apple Health & Google Fit · AI gelişim & beslenme analizi) + **Store/Mağaza** (kullanıcı isteği, port sırasında eklenir). "Bugün üründe değil; yol haritamızda" ibaresi korunur (öngörü/örnek çerçevesi).
- **Route korunur:** `/spor-salonu-yazilimi` (public ad sektör-tanımlı, iç-ad sızıntısı yok; rename gerekçesi yok — discuss-phase teyit eder). SEO/metadata güncellenir (başlık/description ürün konumuna göre).
- **Guardrail regresyonsuz:** a11y=100 çift-tema · perf tabanı · CLS≈0 · i18n 5-dil parite · marka sesi yasakları · reduced-motion tam fallback (reveal + pilot nabzı + mockup animasyonları).

---

## Edge Case'ler ve Sınır Durumları

- **Mobil uygulama mockup'ları (en yüksek port maliyeti):** artifact'taki 4 iPhone mockup'ı saf CSS (Dynamic Island, status bar, üyelik bar, randevu slot, gelişim SVG grafiği, yoklama satırları, alt tab bar). Craft yüksek; kendi task'ı olabilir (discuss/plan). jsdom/WebGL değil — saf CSS/DOM, i18n'e tabi metinler.
- **Living Flow hero:** mevcut sayfada var. Artifact before/after kartı ile Living Flow arasında seçim/uyum → discuss/plan kararı (imza korunur; craft üst eksen).
- **AR/RTL:** yeni bölümler (before/after grid, roller, mockup'lar, fiyat bant) logical CSS prop'larıyla aynalanmalı; mockup telefon çerçevesi RTL'de tutarlı.
- **Fiyat bölümü koyu bant (`bg-ink`/band):** dark tema kontrast flip riski — a11y çift-tema doğrulaması şart (MEMORY tema tuzağı).

---

## İlişkili Feature'lar

- Mevcut: **M2 / F2.8** (Alpfit sayfası — `spor-salonu-yazilimi/page.tsx` + `components/gym/GymSoftwareShowcase.tsx`); **M4** (i18n namespace), **M1** (token/Living Flow), **M6** (SEO/metadata, `next/image` mockup varsa).
- `sektorler-derinlestirme.md` — ana sayfa gym paneli Alpfit'e CTA verir (tek-otomasyon deseni); bu sayfa o CTA'nın hedefi. Tutarlılık korunur.
- Taksonomi (VIZYON §3): Alpfit ayrı ürün — Crew OS içerik/görseliyle karışmaz.

---

## Açık Sorular

- **Faz bölünmesi:** tek faz mı, yoksa (a) yapı/port + tasarım + (b) içerik/kopya + i18n + mockup'lar diye 2+ faz mı? → discuss-phase (iş paketi küçük felsefesi; mockup'lar ağır).
- **Living Flow hero'nun akıbeti:** before/after kartıyla birlikte mi, yerine mi? → discuss/plan.
- **Namespace adı** (`alpfit` vs mevcut `gym` deseni) ve ekran görüntüsü asset'lerinin (mevcut `public/gym/*.png`) yeni tasarımdaki yeri → discuss/plan.
- **Store/Mağaza** yol haritası kaleminin metni (kısa etiket) → içerik/kopya aşamasında netleşir.
