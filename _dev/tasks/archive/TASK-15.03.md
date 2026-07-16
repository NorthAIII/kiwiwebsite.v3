# TASK-15.03: Mobil uygulama telefon mockup'ları (`PhoneMockups` — en yüksek craft)

**Durum:** ✅ Tamamlandı
**Modül:** M2 (Sayfalar & Bölümler) + M4 (i18n — yalnız bölüm başlığı/etiketler)
**Feature:** AP1 (port+bölümler)
**Faz:** Phase 15 (phases/PHASE-15.md)
**Bağımlılıklar:** TASK-15.01 (kabuk + namespace kökü)

---

## Hedef

Artifact'ın "Mobil uygulama" bölümündeki 4 iPhone mockup'ını (Üye ana ekran · Üye randevu al · Antrenör bugün & yoklama · Üye gelişim) **co-located CSS Module** ile birebir porla — Dynamic Island, status bar, üyelik bar, gün/slot seçici, SVG kilo grafiği, yoklama satırları, alt tab bar. Bu fazın **en yüksek craft/LOC maliyetli** işi; kendi izole bileşeninde. Telefon içi metin **sabit TR** (ekran-görüntüsü semantiği, i18n-dışı), telefon `dir="ltr"`. Bölüm başlığı/altyazısı + `phone-cap` etiketleri **5-dil i18n**. `AlpfitShowcase`'e `#uygulama` id'siyle bağlanır. Tamamlanma: 4 mockup pixel-craft'la render, `next build` temiz, CSS Module çalışır.

---

## Bağlam

Research kararı (§2): telefon mockup'ları için **CSS Module** (`PhoneMockups.module.css`) — artifact `.phone`/`.ph-*` CSS'i **birebir** taşınır (scoped, `globals.css` yalın kalır; ~90 kural/telefon Tailwind arbitrary olarak okunamaz olurdu). `--a-*` paleti **self-contained/açık** kalır (tema-adaptif DEĞİL — gerçek telefon açık ekran; dış metal çerçeve koyu). **CSS Module bu repoda YENİ desen** — Next 15 App Router yerleşik destekler; başarısızsa fallback = `globals.css`'e scoped ekleme.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/docs/alpfit-plus-artifact.html` — App bölüm HTML **L494-637** (section-head + 4 phone-wrap); tüm `.phone`/`.ph-screen`/`.ph-*` CSS **L301-391**; `--a-*` paleti **L313-316**
- `_dev/phases/PHASE-15.md` — Araştırma Bulguları §2 (CSS Module kararı) + "Telefon mockup içi metin" kararı (§4)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md`, `_dev/phases/PHASE-15.md` (Task Listesi)
- `_dev/phases/PHASE-15.md` retro notu **gerekirse** (CSS Module ilk kullanım deneyimi — faz aktifken)

---

## Alt Görevler

- [x] **1. `PhoneMockups.module.css` (birebir port)**
  - `src/components/alpfit/PhoneMockups.module.css` (YENİ): artifact L301-391 `.phone`/`.ph-*` sınıfları birebir. `--a-*` paleti (L313-316) self-contained açık — tema-adaptif yapılmadı.
  - Kebab-case sınıf adları korundu (birebir kopya, düşük hata riski) → TSX'te `cx(...)` helper ile hashed erişim (compound: `cx("ph-slot","off")`). `color-mix`/`aspect-ratio`/gradient korundu. Sapmalar: `var(--display)`/`var(--sans)` → site `var(--font-display)`/`var(--font-sans)`; çerçeve gölgesi sabit açık-tema değeri (kardeş AlpfitRoles kart deseniyle tutarlı — `--shadow-lg` yerine inline).

- [x] **2. `PhoneMockups` bileşeni**
  - `src/components/alpfit/PhoneMockups.tsx` (YENİ, `"use client"`): 4 telefon. Her telefon `<div dir="ltr">` (RTL'de bozulmadı — AR görselde doğrulandı). İçerik **sabit TR** (Merhaba Deniz / Reformer Pilates / 72,4 kg / tab adları — i18n'e GİRMEDİ). Paylaşılan `StatusBar`/`TabBar` parçaları (kopya-kod yok) + 4 bespoke ekran gövdesi. SVG'ler inline, dekoratifler `aria-hidden`; kilo grafiği `role="img"` + `aria-label="Kilo grafiği"`.
  - `phone-cap` etiketleri çerçeve **dışında** Tailwind + i18n (`app.caps.${k}.role` bold + `.screen`) → sayfa yönünü izler (RTL'de aynalanır), tema-adaptif.

- [x] **3. Bölüm başlığı + kabuğa bağla**
  - Section-head (`alpfit.app.{eyebrow,title,sub}` — AlpfitRoles deseni: eyebrow+serif h2+sub) + `<div class="phones">` 4 mockup, `<Reveal stagger>` ile. `AlpfitShowcase`'e `<PhoneMockups/>` roller'dan sonra bağlandı; `id="uygulama"` bölümde.
  - i18n: `alpfit.app.{eyebrow,title,sub}` + `app.caps.{memberHome,memberBooking,trainer,memberProgress}.{role,screen}` 5 dile eşzamanlı (TR yetkili). **Telefon içi metin i18n'e eklenmedi.**

---

## Etkilenen Dosyalar

```
src/components/alpfit/AlpfitShowcase.tsx        # PhoneMockups bağlanır — zaten var
src/components/alpfit/PhoneMockups.tsx          # YENİ — 4 iPhone mockup (dir=ltr, sabit TR)
src/components/alpfit/PhoneMockups.module.css   # YENİ — .phone/.ph-* birebir (--a-* self-contained)
messages/tr.json                                # alpfit.app.{eyebrow,title,sub,caps.*} — TR yetkili
messages/en.json                                # alpfit.app.* — TR kopyası (stale)
messages/ar.json                                # alpfit.app.* — TR kopyası (stale)
messages/de.json                                # alpfit.app.* — TR kopyası (stale)
messages/es.json                                # alpfit.app.* — TR kopyası (stale)
```

---

## Dikkat Noktaları

- **Telefon içi metin i18n-DIŞI sabit TR** (research §4 kararı): micro-anahtar patlaması yok, RTL'de LTR-telefon içinde Arapça bozulmaz, örnek proper-noun/rakam çevrilmez (dürüst = gerçek TR ürün ekranı). Yalnız bölüm başlığı/altyazı/phone-cap i18n.
- **`dir="ltr"` her telefonda zorlanır** — AR sayfada bile telefon içi LTR (ekran-görüntüsü). Bölümün geri kalanı (başlık/cap) RTL aynalanır.
- **CSS Module YENİ desen:** başarısızsa (build/config) fallback `globals.css` scoped ekleme; ama Next 15 yerleşik destekler — beklenen sorunsuz. Deneyimi faz retrosuna not et (research §2).
- **`--a-*` tema-invariant** → bir kez kontrast doğrula ama axe per-tema koşar (`subpages-a11y`). İç kontrast (a-ink/a-soft/a-green üzerinde) AA geçmeli — telefon açık ekran her iki site-temasında aynı görünür.
- **perf/CLS:** telefon `aspect-ratio: 9/19.5` sabit → layout-shift yok. Görsel yok (saf CSS/SVG) → LCP'ye yük yok.
- **reduced-motion:** mockup'lar statik (animasyon yok — pulse/reveal dışında). Bölüm `<Reveal>` ile; reduced-motion'da görünür.
- **a11y:** grafik SVG `role="img"`+`aria-label`; dekoratif SVG'ler `aria-hidden`. Status bar/tab ikonları dekoratif (`aria-hidden`).

---

## Test Kriterleri

- [x] `next build` temiz: 5 locale SSG (37/37), 0 `MISSING_MESSAGE`, 0 warn, exit 0; CSS Module sıfır-config derlendi.
- [x] `npm run test` yeşil (39/39): `i18n-parity` `app.*` anahtarlarını kapsar (telefon içi metin parite yükü yaratmadı — i18n'de değil).
- [x] Route render: 4 telefon mockup 5 locale prerender'da görünür (ana ekran/randevu/yoklama/gelişim + `#uygulama` id + section-head i18n + chart aria-label); `phone-cap` etiketleri i18n; telefon içi metin TR sabit.
- [x] Her telefon `dir="ltr"` (AR'de 4/4); AR sayfada telefon içi düzen bozulmadı — görsel doğrulandı (sayfa aynalanır, ekranlar LTR kalır).
- [x] axe light+dark yeşil — spor-salonu 10/10 (5 dil × 2 tema, AR RTL dahil) + tam süit 52/52; telefon iç `--a-*` kontrastı çift-temada AA geçti.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler + test kriterleri
- [x] Git commit & push (`feat(TASK-15.03): ...`)
- [x] Bu doküman + DURUM.md güncellendi; CSS Module deneyimi PHASE-15 Son Güncelleme + bu oturum kaydına not edildi (retro alanı review-phase'e ait — placeholder'a yazılmadı)

---

## Oturum Kayıtları

### Oturum — 2026-07-16 (run-task 15.03)

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **`PhoneMockups.module.css` (YENİ):** artifact L301-391 `.phone`/`.ph-*` CSS'i birebir port (kebab-case sınıf adları korundu). `.ph-screen` üzerinde `--a-*` self-contained açık palet (tema-adaptif değil). İki bilinçli sapma: (1) `var(--display)`/`var(--sans)` → site token'ı `var(--font-display)` (Fraunces)/`var(--font-sans)` (Geist); (2) `.phone` çerçeve gölgesi `--shadow-lg` yerine sabit açık-tema değeri inline (kardeş `AlpfitRoles` kart deseniyle tutarlı — hardcode açık gölge, tema-invariant). Dynamic Island/home-indicator pseudo-element; `color-mix`/`aspect-ratio 9/19.5`/gradient korundu.
- **`PhoneMockups.tsx` (YENİ, `"use client"`):** `cx(...)` helper scoped hashed sınıfları birleştirir (compound selector `.ph-slot.off` → `cx("ph-slot","off")`). Paylaşılan parçalar (kopya-kod yok): `StatusBar` (9:41 + sinyal/wifi/batarya SVG, `aria-hidden`), `TabBar` (data-driven `TAB_PATHS` lookup — 7 dekoratif ikon), `memberTabs(active)` / `trainerTabs`, `Phone` çerçevesi. 4 bespoke ekran gövdesi: (1) Üye ana ekran (üyelik bar + sıradaki randevu + aksiyonlar), (2) Randevu al (gün seçici + slot listesi + onayla), (3) Antrenör bugün (stat strip + yoklama satırları), (4) Gelişim (SVG kilo grafiği `role="img"`+`aria-label` + ölçüm strip). Telefon içi metin **sabit TR**; her telefon `dir="ltr"`; `phone-cap` çerçeve dışında Tailwind+i18n (tema-adaptif, RTL izler).
- **Kabuğa bağlama:** `AlpfitShowcase`'e `<PhoneMockups/>` roller'dan sonra; bölüm `id="uygulama"` + `<Reveal stagger={0.08}>` (4 telefon `data-reveal`).
- **i18n:** `alpfit.app.{eyebrow,title,sub}` + `app.caps.{memberHome,memberBooking,trainer,memberProgress}.{role,screen}` — 5 dile eşzamanlı eklendi (TR yetkili, non-TR TR-kopyası = versiyon-sınırına ertelenen stale). JSON kanonik round-trip (yalnız +23 satır/dil diff'te, reformat yok).

**Sorunlar:**
- CSS Module bu repoda ilk kullanım (research §2 "yeni desen" uyarısı) → Next 15 App Router yerleşik desteğiyle **sıfır-config sorunsuz** derledi; globals.css-ekleme fallback'ine gerek olmadı. Karar doğrulandı.
- `next start`/Playwright bu oturumda **yaşadı** (sandbox exit 144 tetiklenmedi) → a11y süiti + görsel screenshot'lar gerçek prod build'e karşı koştu.

**Kararlar:**
- Telefon çerçeve gölgesi tema-invariant (sabit açık değer) — `--a-*` self-contained kararının doğal uzantısı + kardeş AlpfitRoles kart deseniyle tutarlı (o da hardcode açık gölge; dark bg'de koyu-ink gölge zaten sönümlenir). docs/DECISIONS.md'ye eklendi: Hayır (research §2 scope kararının uygulaması; yeni mimari karar değil).
- Ekran içi font `var(--font-display)` (Fraunces serif, büyük rakamlar) — artifact'ın serif niyeti (Iowan) markaya map'lendi; birebir port sadakati. docs/DECISIONS.md'ye eklendi: Hayır.

**Dosya Değişiklikleri:**
- `src/components/alpfit/PhoneMockups.module.css` → YENİ (`.phone`/`.ph-*` birebir port, `--a-*` açık palet).
- `src/components/alpfit/PhoneMockups.tsx` → YENİ (4 iPhone mockup, `cx` helper, paylaşılan StatusBar/TabBar, sabit TR + `dir=ltr`).
- `src/components/alpfit/AlpfitShowcase.tsx` → `<PhoneMockups/>` import + roller'dan sonra bağlandı.
- `messages/{tr,en,ar,de,es}.json` → `alpfit.app.*` (her dile +23 satır).

**Test Sonuçları:**
- Vitest 39/39 · `next build` 37/37 SSG exit 0 (0 MISSING/0 warn, CSS Module derlendi) · prerender 5-dil grep (`#uygulama`/Mobil uygulama/Merhaba Deniz/Reformer Pilates/Ana ekran/yoklama/Kilo grafiği 1/1; AR `dir="ltr"` = 4/4) · Playwright a11y spor-salonu 10/10 (5 dil × light+dark, AR RTL) + tam süit 52/52 · görsel light+dark+AR-RTL craft doğrulandı (dark: ekranlar açık kalır/çerçeve koyu; AR: sayfa aynalanır, ekranlar LTR).

---

## Sonuç Özeti

Alpfit Plus vitrinine artifact'ın **Mobil uygulama** bölümü (4 iPhone mockup: üye ana ekran · randevu al · antrenör bugün&yoklama · üye gelişim) co-located CSS Module (`PhoneMockups.module.css`) ile birebir porlandı — bu fazın en yüksek craft/LOC işi. `PhoneMockups.tsx` paylaşılan `StatusBar`/`TabBar` + 4 bespoke ekran; telefon içi metin sabit TR (ekran-görüntüsü semantiği), her telefon `dir="ltr"` (RTL güvenli). CSS Module repoda ilk kullanım — Next 15 sıfır-config derledi. Bölüm başlığı + `phone-cap` etiketleri `alpfit.app` 5-dil i18n. Guardrail regresyonsuz: Vitest 39/39, build 37/37 SSG temiz, a11y 52/52 çift-tema, CLS-sıfır (`aspect-ratio` sabit, görselsiz).

---

**Oluşturulma:** 2026-07-16 (plan-phase 15)
**Tamamlanma:** 2026-07-16 (run-task 15.03)
