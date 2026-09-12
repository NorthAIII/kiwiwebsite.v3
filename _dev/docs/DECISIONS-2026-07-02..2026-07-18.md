← [DECISIONS](DECISIONS.md) · karar-arşivi

# DECISIONS — Arşiv (2026-07-02 → 2026-07-18)

<!-- Arşiv: kayıtlar DECISIONS.md'den sırası korunarak (en yeni en üstte) taşındı; yeni karar buraya değil DECISIONS.md → Kararlar'a eklenir. -->

### 2026-07-18 — Senaryo testi fazlarında a11y mührü = CI axe çift-tema + yapısal grep; ayrı Lighthouse koşusu tekrarlanmaz (Faz 17)

**Bağlam:** Memory'deki Süreç Disiplini şunu söyler: *"Bir sayfayı a11y-mühürlerken iki gate'i de koş — axe WCAG-AA 0 ihlal ≠ Lighthouse a11y=100."* Gerekçesi somut: Faz 8'de 50 axe testi yeşilken 2 bülten sayfası Lighthouse a11y=98 verdi çünkü `<main>` yoktu — `landmark-one-main`/`region`/`heading-order` gibi **structural/best-practice** audit'ler axe'ın WCAG alt-kümesinde yok. Faz 17 (v0.4 senaryo testi) bu disiplinle görünürde çelişen bir şey yaptı: **ayrı Lighthouse koşusu yapmadı.** Bu kararın gerekçesi kayda geçmezse gelecekte ya "disiplin atlandı" diye yanlış okunur ya da her versiyon sonunda gereksizce yeniden tartışılır.

**Ayrım:** Disiplin bir sayfayı **ilk kez a11y-mühürlerken** geçerlidir (yeni yüzey / derinlik denetimi). Senaryo testi fazı ise **yeni yüzey üretmez** — kaynak koda dokunmaz, zaten mühürlenmiş sayfaların **regresyona uğramadığını** re-teyit eder. a11y derinliği bu proje için Faz 4 (ana sayfa 89→100), Faz 8 (5 alt sayfa çift-tema) ve Faz 15 (Alpfit Plus) oturumlarında yapıldı ve mühürlendi.

**Seçenekler:**
1. **CI axe çift-tema + deterministik yapısal ön-kontrol** — otoritatif mühür GitHub runner'daki `a11y` job (`subpages-a11y` 5 sayfa × 5 dil × 2 tema = 50 test + `home-a11y`, WCAG-AA 0 ihlal); disiplinin doğduğu **structural boşluk** ayrıca prerender grep'iyle deterministik kapatılır (30/30 sayfada tam bir `<main>`).
2. **Ayrıca yerel Lighthouse çift-tema koşusu** — her versiyon sonunda 5 alt sayfa × 2 tema yeniden ölçülür.

**Karar:** **Seçenek 1.** Senaryo testi (doğrulama) fazlarında a11y mührü CI axe çift-tema suite'i + yapısal grep ön-kontrolüdür; ayrı Lighthouse koşusu **tekrarlanmaz**. Gerekçeler: (a) disiplinin koruduğu somut failure mode (`<main>` eksikliği) deterministik grep'le **doğrudan** kapatılıyor — enstrüman değişti, güvence değil; (b) CI job sandbox'tan bağımsız GitHub runner'da koşuyor → bu ortamın `next start` flakiliğinden (`exit 144`) etkilenmiyor, yerel Lighthouse'tan **daha** güvenilir; (c) yerel Lighthouse bu devcontainer'da software-GL ile koşuyor → perf/TBT sayıları kıyaslanamaz (a11y skoru etkilenmese de koşunun marjinal faydası düşük); (d) a11y **derinliği** zaten mühürlü, tekrarlanan şey yalnız regresyon kontrolü olurdu.

**Sınır (önemli):** Bu karar **yalnız doğrulama fazları** içindir. **Yeni bir sayfa/yüzey a11y-mühürlenirken iki-gate disiplini aynen geçerlidir** — Lighthouse structural audit'leri axe'ın kapsamadığı şeyi ölçer ve atlanamaz. Karar disiplini gevşetmez, uygulama alanını netleştirir.

**Sonuç (Faz 17):** CI `fast`+`a11y` 3 ayrı HEAD'de `success`; `subpages-a11y` 50 test WCAG-AA 0 ihlal; 30/30 sayfada tam bir `<main>`; runtime focus-visible çift-tema + odak kaybı yok 16/16. Kalite ekseni "Erişilebilirlik ✅". Detay → `phases/PHASE-17.md` + `phases/PHASE-17-ARASTIRMA.md`.

---

### 2026-07-16 — npm audit: Next'e gömülü postcss@8.4.31 (2 moderate) kabul + kayıt, overrides/downgrade yok (Faz 16, TB-D2)

**Bağlam:** Faz 16 (v0.4 versiyon-sonu teknik borç) research. `npm audit`: 365 bağımlılık, **2 moderate, 0 low/high/critical**. İki bulgu da tek kök nedenden: `next`'in içine gömülü (nested) `postcss@8.4.31` (`node_modules/next/node_modules/postcss`) → advisory [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) (postcss `<8.5.10`, CSS stringify `</style>` kaçırma XSS, CVSS 6.1). Projenin kendi postcss'i temiz (root `8.5.15`, tailwind/vite `8.5.16` — hepsi `≥8.5.10`). Belirleyici: `next@15.3.0`→`15.5.20` **her** patch, hatta `next@16.2.10` (son major) bile `postcss: 8.4.31`'i sabit pinliyor → hiçbir sürüm güncellemesi audit'i çözmez. npm'in tek "fix"i `next@9.3.3` (`isSemVerMajor` — katastrofik downgrade).

**Seçenekler:**
1. **Kabul + kayıt** — dokunulmaz dosyalara dokunma; upstream-bekleyen, sömürülemez borç olarak kaydet; Next bundle postcss'i bumpladığında versiyon-sınırında yeniden bak.
2. **package.json `overrides`** ile postcss'i `≥8.5.10`'a zorla — audit susar ama `package.json` + `package-lock.json` (Dokunulmaz) değişir, Next'in pinlediği sürümü ezer (regresyon riski), tam build+Vitest+a11y regresyon koşusu gerekir.

**Karar:** Seçenek 1 — **kabul + bu kayıt.** `npm audit fix --force` (Next downgrade) ve `overrides` **yapılmaz**. TB-D2 deliverable'ı = audit raporu + bu karar kaydı.

**Gerekçe:** Açık **bu proje bağlamında sömürülemez** — Next'in gömülü postcss'i build-zamanı CSS pipeline'ında çalışır, tüm CSS geliştirici-yazımı (globals.css + Tailwind), site statik üretiliyor, sunulan `<style>`'a giden güvenilmez girdi yolu yok. Güvenli otomatik fix **yok** (tek öneri katastrofik downgrade). `overrides` sömürülemez bir moderate için Dokunulmazlar'ı (`package.json`/`package-lock.json`, onay-gerektiren) bozar + Next'in bilinçli pin'ini ezer (regresyon riski) → ILKELER kalıcılık (framework'le savaşan hack yerine upstream'i bekle) ile ters. Kalıcı çözüm upstream: Next gömülü postcss'i `≥8.5.10`'a bumpladığında aralık-içi `npm update` alır.

**İlgili Task/Faz:** Faz 16 (research; TB-D2). Yeniden-değerlendirme tetikleyicisi: sonraki versiyon-sonu / `npm audit` temizlenene dek her release öncesi hızlı kontrol. Bulgular → `phases/PHASE-16.md` → Araştırma Bulguları.

---

### 2026-07-16 — Alpfit Plus port: fiyat bandı ink-panel inversion + mockup metni i18n-dışı sabit-TR (Faz 15, research)

**Bağlam:** Faz 15 (v0.4 Alpfit Plus) araştırması. Artifact (`_dev/docs/alpfit-plus-artifact.html`) React+Tailwind-token+next-intl'e port edilirken iki tasarım kararı task'ları şekillendiriyordu: (1) fiyat bandı + "Neden" aside'ının koyu paneli tema geçişinde nasıl davranacağı; (2) telefon mockup'larının içindeki metinlerin i18n'e girip girmeyeceği. İkisi de kullanıcıya soruldu (research-phase Adım 3).

**Karar:** (1) **Fiyat bandı → site ink-panel inversion deseni** (`bg-ink text-canvas` + `--color-pulse-ink` adaptif aksan; iç price-card lifted-surface). Artifact'ın kalıcı-koyu bandı + yeni `--band-*` token ailesi **reddedildi**. Bant light temada koyu/krem-metin, **dark temada krem'e döner** (site konvansiyonu). (2) **Telefon mockup içi metin i18n-dışı sabit TR** (gerçek TR ürün ekranının görüntüsü semantiği), telefon `dir="ltr"`. Bölüm başlığı/altyazı/`phone-cap` etiketleri yine 5 dil i18n. Ek: `alpfit` namespace (`crew` deseni); yeni `--color-surface` token (kart zeminleri, `--band-*` yerine tek token); `components/alpfit/` hibrit dizin + izole `PhoneMockups` CSS Module; hero iki-sütun Living Flow+compare; `next/image` düşer (görsel yok).

**Gerekçe:** (1) ink-panel deseni TD4/Faz 8'de **a11y-mühürlü** ve Crew OS bandıyla **tutarlı** → yeni `--band-*` ailesi + tema-tuzağı yüzeyi (MEMORY `tema-fix-html-dark-token-flip`, `a11y-olcum-tema-tuzagi`) doğmaz; bakım + a11y güvenli (QUALITY §2/§5). (2) sabit-TR mockup: RTL'de LTR-telefon içinde Arapça bozulmaz, micro-anahtar patlaması yok, örnek proper-noun/rakam çevrilmez; dürüst (gerçek TR ürünü). Craft üst eksen korunur (imza Living Flow hero'da kalır), pazarlık-dışı guardrail'ler (dürüstlük 4/4, marka sesi) değişmez.

**İlgili Task/Faz:** Faz 15 (research; task'lar plan-phase 15'te). Kaynak feature `PRD/features/alpfit-plus.md`; bulgular `phases/PHASE-15.md` → Araştırma Bulguları.

---

### 2026-07-03 — `/forum` index hedefi `/` + redirect sırası çıplak-önce (`:slug*` boş-segment tuzağı) (Faz 13, TB-2)

**Bağlam:** Faz 13 TB-2. `next.config.ts` redirect denetimi iki açık buldu: (1) `/forum` + `/forum/:slug*` locale-twin'siz → `/en/forum` vb. sessiz 404 (AMPİRİK memory `next-config-redirect-locale-prefix`); (2) mevcut `/forum`→`/bulten` hedefi zaten **404'e iniyordu** — `src/app/[locale]/bulten/` altında index `page.tsx` yok (yalnız 2 makale klasörü), bülten içeriği ana sayfada `id="forum"` bölümünde.

**Karar:** (1) Her redirect **iki giriş** (çıplak + `/:locale(en|ar|de|es)/…`): `/forum`→`/`, `/forum/:slug*`→`/bulten/:slug*`, `/bunker-os`→`/crew-os` (korundu). (2) `/forum` index hedefi **`/bulten` değil `/`** (bülten içeriği zaten ana sayfada; `/bulten` index oluşturmak kapsam dışı — içerik/route üretimi). (3) Regresyon tohumu `tests/seo-redirects.test.ts` (Vitest node, `routes-manifest.json` assertion).

**Gerekçe (sıra tuzağı — icrada bulundu):** Next `:slug*` **opsiyonel gruba** derlenir → `/forum/:slug*` regex'i çıplak `/forum`'u da eşler (sıfır segment). Çıplak `/forum` (→`/`) ile slug (→`/bulten`) hedefleri **ıraksadığı** için, task planındaki "slug girişi önce" sırası çıplak `/forum`'u yanlışlıkla `/bulten`'e (404) yönlendiriyordu. Next ilk-eşleşen redirect'i uygular → **çıplak giriş slug'dan ÖNCE** gelmeli (`$`-anchor'lı bare regex = gerçek spesifik eşleşme). Ampirik ground-truth (`routes-manifest.json` regex test) planı düzeltti; test bu sırayı da mühürler ("çıplak /forum slug'a düşmez").

**İlgili Task/Faz:** Faz 13 (TASK-13.04; TB-2 kapandı → faz tamam). Kanıt: `next build` temiz + 0 `MISSING_MESSAGE`; 6 redirect 308; `npm run test` 39 yeşil (5 dosya; +16 seo-redirects). Detay → `phases/PHASE-13.md`, memory `next-config-redirect-locale-prefix` (sıra-tuzağı eklendi).

---

### 2026-07-03 — canonical/hreflang **fail-safe** mimarisi: ortak helper + alternates layout→sayfa (Faz 13, TB-1)

**Bağlam:** Faz 13 TB-1 (v0.3 versiyon-sonu teknik borç). `alternates` (canonical + hreflang) yalnız `layout.tsx` `generateMetadata`'sında tanımlıydı → App Router metadata **sığ-merge**'i ile `alternates` set etmeyen 5 alt sayfa layout'unkini aynen miras alıyordu → her alt sayfa yanlış `canonical="/"` + hreflang'leri ana sayfaya işaret ediyordu ("kanonik'im ana sayfa").

**Karar:** (1) Ortak `localizedAlternates(locale, path)` helper'ı (`src/i18n/metadata.ts`) — self-canonical + 5-dil `languages` + `x-default`, `routing.locales` tek kaynak; locale→prefix eşlemesi sitemap.ts ile ortak util. (2) `alternates` **layout'tan kaldırıldı**, **ana sayfa dahil** her sayfa kendi path'iyle helper'ı çağırıyor (13.01 helper → 13.02 alt sayfalar → 13.03 layout→home taşıma).

**Gerekçe (fail-safe default):** Kritik seçim `alternates`'in nerede default olacağıydı. Layout'ta kalsaydı, alternates set etmeyi unutan gelecekteki bir sayfa **yanlış** `/`'a canonicalize olurdu = **zararlı** (SEO'da sayfa yok sayılır). Layout'tan kaldırınca unutan sayfa **canonical'sız** olur → Google URL'in kendisini self-referans alır = **zararsız**. Kalıcılık ilkesi (ILKELER) → zararlı-varsayılan yerine zararsız-varsayılan. Modülerlik: 6 sayfaya kopya-kod yerine tek helper (Faz 10 `<Logo>` dersi). Layout `title`/`description`/`openGraph`/`metadataBase` **korundu** (home `generateMetadata` yalnız `alternates` döndürür → sığ-merge ile title/desc layout'tan gelir, drift yok). Reddedilen C (layout-seviyesi pathname'den dinamik canonical): App Router `generateMetadata`'ya tam pathname geçmez, middleware header enjeksiyonu gerektirir = kırılgan.

**İlgili Task/Faz:** Faz 13 (TASK-13.01/13.02/13.03; TB-1 kapandı). Kanıt: prerender `<head>` — `/`'a canonicalize olan tek route home TR, 5 alt sayfa self-canonical, 23 test yeşil. Redirect denetimi (TB-2) → TASK-13.04. Detay → `phases/PHASE-13.md` Araştırma Bulguları.

---

### 2026-07-03 — B1 Living Flow aşağı-taşıma: karar-gate **uygula-onayla** (+ light-veil craft ince-ayarı); üç gate geçti (Faz 12)

**Bağlam:** Faz 12 (v0.3, B1 Living Flow nabız kapsamı) karar-gate'i (TASK-12.03). 12.01 (fixed viewport canvas + Hero koordinasyon) + 12.02 (adaptif okunabilirlik veil'i) uygulandıktan sonra, fazın üç korunan-taban kriteri **shipped kod üzerinde** ölçüldü ve uygula/iptal-kaydet kararı verildi (P2/Faz 6 emsali). Ölçüm ortamı: node 20.20.2 + Chrome 150 + Lighthouse 13.3.0 + axe-core 4.12.1 + SwiftShader; taze prod build; TR `/` (`NEXT_LOCALE=tr`); loadavg ≤2.5; full-motion (alan gerçekten render ederken — reduced-motion tohumu alanı gizler, onun kontrast etkisini ölçmez).

**Gate ölçümleri:**
1. **a11y kontrast=100 çift-tema (full-motion):** `channel:'chrome'`+swiftshader Playwright/axe — alan **iki temada da live** (fixed z-0 canvas mount teyitli), **0 WCAG-AA ihlali** (light+dark). Lighthouse a11y **100** (dark kanonik, full-motion). Dürüst caveat: alan-üstü ~15 metin öğesi axe `color-contrast` **incomplete** (WebGL piksellerini algoritma okuyamaz → otomatik sertifika değil, ihlal de değil) → bu tam da craft görsel-teyidin (Gate-3) devreye girdiği yer; FlowVeil washi bu yüzden var. Fallback: reduced-motion axe 0 ihlal (static fallback teyitli).
2. **desktop perf 100 / CLS 0:** perf **100** (çok-koşu, shipped tuned build), CLS **≈3.75e-6 (≈0)**, LCP **~625ms**, TBT ~0-12ms. Baseline `home-desktop-20260628` (perf 100 / LCP 689ms / CLS 0) ile **regresyonsuz**. Araştırma hipotezi ("canvas zaten `frameloop=always` render ettiğinden fixed'e almak artımlı GPU maliyetini ~sıfıra yaklaştırır") **doğrulandı**: tek WebGL context korundu, LCP/CLS (Lantern-deterministik, ortamlar arası kıyaslanabilir) baseline'la birebir → aynı-ortam before/after gerekmedi (desktop perf tarihsel olarak her ortamda stabil 100 + deterministik metrikler baseline'a eşit). Artefakt: `docs/perf/home-desktop-20260703-faz12.{html,json}`.
3. **craft görsel inceleme (son hakem):** full-motion kareler (light/dark × 5 bölüm) incelendi. **Dark: kusursuz** (parlayan yeşil = koyu zeminde ambient derinlik, premium imza). **Light:** Hero-altı **başlık bantlarında** (Sektörler / Crew OS) en parlak nabız karelerinde metinle görsel yarışma (restraint sınırında; gövde metni temiz, metin okunur). Bu, plan'ın craft'a bıraktığı **açık uç** (bölüm-başı opaklık tavanı).

**Seçenekler (craft son hakem, kullanıcıya getirildi):** (1) uygula-onayla olduğu gibi · (2) **uygula + light-veil craft ince-ayarı** · (3) iptal-kaydet (rollback).

**Karar:** Seçenek 2 — **uygula-onayla + light-veil ince-ayarı.** `FlowVeil` sabit `color-mix(--color-canvas 56%)` yerine tema-flip eden `--flow-veil` token'ı: **light %70** (Hero-altı başlık bandı okunabilirliği netleşir), **dark %56 korunur** (premium görünüm dokunulmaz). Token `html.dark` ile flip eder (`dark:` variant DEĞİL — o `prefers-color-scheme`'e bağlı, app toggle'ıyla desync; `memory/tema-fix-html-dark-token-flip`). Değişiklik CSS-only, sıfır perf maliyeti (tuned build perf 100 birebir).

**Gerekçe:** İki hard gate (a11y, perf) temiz geçti; craft üst eksen (ILKELER #1) ve etki kullanıcının discuss-phase'de seçtiği "beğenilen etki" (aşağı kayan yeşil nabızlar) — iptal gerektirmiyor. Tek gerilim (light başlık bleed'i) düşük-riskli, tema-özel, CSS-only bir craft dokunuşuyla çözüldü: light'ta metin daha kararlı kazanır, süreklilik/imza korunur, dark'ın premium görünümü hiç değişmez. İnce-ayar sonrası görsel doğrulandı (light bleed azaldı, dark birebir aynı), Gate-1 axe 0 ihlal + Gate-2 perf 100 tuned build üzerinde re-teyit edildi. iptal-kaydet yerine kontrollü uygulama = kalıcılık + craft dengesi.

**İlgili Task/Faz:** Faz 12 (TASK-12.01–12.03); milestone "uygulandı VEYA iptal-kaydedildi → **uygulandı**" tarafıyla kapandı. Uçtan-uca senaryo UAT'ı (reduced-motion, mobil Hero-only, 5-dil, chatbot) → `verify-phase 12`. MODULE-MAP B1 satırı review-phase'de ✅. Detay/ölçüm metodolojisi → `phases/PHASE-12.md`, `docs/perf/README.md` (Faz 12 bölümü).

---

### 2026-07-02 — `/bunker-os` → public `/crew-os` route rename + kalıcı 308 redirect; `next.config.ts` config-redirect + açık 5-locale pattern; `/forum`→404 reddedildi; kod-adı iç kalır (Faz 11)

**Bağlam:** Faz 11 (v0.3 URL taksonomisi/SEO). Taksonomi kararının (2026-06-27: public Crew OS / iç ad Bunker OS) son açık ucu — iç kod adının kullanıcıya sızdığı **tek** yüzey olan `/bunker-os` route'u — kapatıldı. research-phase ampirik kanıt topladı (`next build` + curl): Next config `redirects()` `source`'u locale prefix'ini **otomatik kapsamaz** (`/forum`→308 ama `/en/forum`→404).

**Seçenekler:**
1. Redirect mekanizması: **A** `next.config.ts` `redirects()` kalıcı 308 + açık locale pattern · **B** `bunker-os/page.tsx` içinde server `redirect()` (307-geçici) · **C** next-intl `pathnames` (yerelleştirilmiş route adları).
2. `/forum` → 404 (backlog isteği) · vs · mevcut `/forum`→`/bulten` 301 korunur.
3. Rename kapsamı: yalnız public yüzey (URL + i18n namespace) · vs · kod dahil tam rename (`Bunker.tsx`→`Crew.tsx`, `components/bunker-os/`→`crew-os/`).

**Karar:** (1) **Yaklaşım A** — config kalıcı 308, **iki açık giriş**: çıplak `source: "/bunker-os"` + prefixli `source: "/:locale(en|ar|de|es)/bunker-os"`. Eski `bunker-os/` route klasörü silinir (redirect config'e taşınır). (2) **`/forum`→404 REDDEDİLDİ** — çalışan 301 SEO-doğru/zararsız, bozmak için gerekçe yok; bu faz `/forum`'a dokunmaz. (3) **Yalnız public yüzey rename** — route klasörü `crew-os/` + i18n namespace `bunkerOs`→`crewOs`/`bunker`→`crew` (5-dil atomik); kod dosya/dizin adları (`Bunker.tsx`, `components/bunker-os/`, `@keyframes bunkerback`, `id="bunker"`, `nav.bunker`) **iç kod adı olarak kalır** (taksonomi izin veriyor).

**Gerekçe:** (1) SEO-doğru kalıcılık (308), edge-öncelik (SSG/route çözümünden önce), eski klasör silinince route↔redirect çakışması olmaz. B 307-geçici + klasör tutmayı gerektirir (kalıcılık ilkesine ters); C tek path rename için aşırı. Locale-prefix'in açık yazılması **ampirik olarak zorunlu** (yoksa `/en/bunker-os`→404). (2) Kalıcılık — çalışan değeri bozma; eski link korunur. (3) Dar-faz disiplini + taksonomi: iç kod adı kodda kalabilir, saf refactor diff'i büyütür. **Not:** page-seviyesi canonical/alternates güncellenmedi çünkü yok (layout'tan `canonical="/"` miras) — latent SEO açığı (tüm alt sayfa ana sayfaya canonicalize) + `/forum` locale-prefix gap (`/en/forum`→404) gelecek SEO fazı adayı olarak kayıtlı.

**İlgili Task/Faz:** Faz 11 (TASK-11.01–11.03); detay → `phases/PHASE-11.md` Araştırma Bulguları + Retrospektif. Config-redirect locale-prefix tuzağı → `_dev/MEMORY.md` Teknik Tuzaklar (`memory/next-config-redirect-locale-prefix.md`). Bu karar 2026-06-27 taksonomi kararının "Sonuç (takip): `/bunker-os` route adlandırması hizalanacak" ucunu kapatır.

---

### 2026-07-02 — A1 logo tutarlılığı ortak `<Logo>` bileşeniyle; RTL ok idiomu site-geneli fiziksel kalır (lone-flip yok) (Faz 10)

**Bağlam:** Faz 10 (v0.3 görsel cila). İki tasarım kararı damgalandı. (a) **A1 kök nedeni:** mark + "Kiwi AI Lab" wordmark lockup'ı üç yüzeyde (`Nav.tsx`, `PageHeader.tsx`, `Footer.tsx`) **kopya-kod** olarak tekrar ediyordu → optik hiza drift'i. (b) **A3a affordance × RTL:** Hero'nun iki stat `<Link>`'ine site-standart `→ group-hover:translate-x-1` oku eklendi; site-geneli ok idiomu (10+ yer) AR'de `dir="rtl"` altında **fiziksel** (`→` glyph, logical dönüşüm yok).

**Seçenekler:**
1. A1: her yüzeyde ayrı flex/optik nudge (yerinde) · vs · ortak `<Logo>` bileşeni (tek kaynak).
2. RTL ok: bu iki oku logical yap (AR'de aynala) · vs · site-idiomuyla tutarlı fiziksel bırak.

**Karar:** (a) **Ortak `<Logo>` bileşeni** — mark+wordmark lockup'ı tek `src/components/Logo.tsx`'e çıkarıldı; Nav/PageHeader/Footer onu tüketir. Optik dikey hiza tek yerde (`leading-none` + `items-center`), saran link bileşene dahil DEĞİL (tek focusable tüketiciden gelir), wordmark rengi `currentColor` mirası (Footer'ın koyu zemini otomatik uyar). (b) **RTL ok'lar fiziksel kalır** — iki oku tek başına logical yapmak onları diğer 10+ oktan ayırıp tutarsızlık yaratırdı; site-geneli logical-ok ayrı/sonraki iş olarak kayıtta.

**Gerekçe:** (a) Kalıcılık (ILKELER) + modülerlik (QUALITY §5): kopya-kod drift'i (A1 kök nedeni) inşa gereği kapanır, yerinde-nudge yalnız semptomu örterdi. (b) Craft en üst eksen — tutarlılık idiomun bütününde korunur; iki öğeyi izole flip'lemek "zero template smell"i bozan görsel tutarsızlıktır. AR ok yönü ayrı bir bilinçli iş olarak ertelendi (bir faza girerse tüm idiom birlikte ele alınmalı).

**İlgili Task/Faz:** Faz 10 (TASK-10.01–10.04); detay → `phases/PHASE-10.md` Araştırma Bulguları + Retrospektif. v4 translate-transition tuzağı → `_dev/MEMORY.md` Teknik Tuzaklar.

---

### 2026-07-02 — Alt-sayfa a11y iki ayrı gate ile mühürlenir (CI axe-WCAG tohumu + manuel Lighthouse); biri diğerini ima etmez (Faz 8)

**Bağlam:** review-phase 8. Faz 8 çıtası "her alt sayfa Lighthouse a11y=100 çift-tema **+** axe WCAG-AA 0 ihlal". İlk verify koşumunda `subpages-a11y.spec.ts` (axe `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa'])`) 5 sayfa × 5 dil × 2 tema = 50 test **yeşildi**, ama 2 bülten makale sayfası Lighthouse a11y=**98** verdi (`landmark-one-main` — sayfada `<main>` yok). Kök neden: `landmark-one-main` bir Lighthouse best-practice/structural audit'idir, **WCAG-AA alt-kümesinde değil** → axe tohumu onu hiç taramaz. İki sinyal aynı şeyi ölçmez.

**Seçenekler:**
1. Tek gate (axe WCAG-AA tohumu) yeterli say — CI otomatik, hızlı.
2. İki gate'i de zorunlu tut: CI axe-WCAG tohumu (regresyon koruması) **+** manuel Lighthouse çift-tema (skor gate, structural audit'leri de kapsar).

**Karar:** Seçenek 2 (research-phase 8 kararının teyidi). axe WCAG-AA tohumu **CI-korunan regresyon güvencesi**dir (fail-on-regression kanıtlı); Lighthouse a11y=100 çift-tema **manuel verify skor gate**'idir (landmark/region/heading-order gibi structural audit'leri kapsar, axe-WCAG kapsamaz). Bir sayfa ancak **ikisi de** yeşilse mühürlenir. `landmark-one-main` boşluğu bu şekilde yakalandı → TASK-8.06 (2 makale bileşenine stilsiz `<main>`).

**Gerekçe:** "axe yeşil = a11y=100" varsayımı yanlış (kanıtlandı: 50 axe testi yeşilken Lighthouse 98). İki gate farklı ruleset/kapsam ölçer; kalıcılık ilkesi (ILKELER) CI regresyon güvencesini, milestone ise tam skoru ister → ikisi ayrık ama tamamlayıcı tutulur. Alt-sayfa `<main>` deseni bileşenden gelir (layout sarmaz) — her sayfa kendi `<main>`'ini verir.

**İlgili Task/Faz:** review-phase 8 + TASK-8.06; detay → `phases/PHASE-8.md` Retrospektif + UAT. Süreç disiplini → `_dev/MEMORY.md` Süreç Disiplinleri (iki-gate mühür).

---
