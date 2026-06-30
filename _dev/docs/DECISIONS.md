# DECISIONS — Karar Günlüğü

**Amaç:** Önemli mimari ve tasarım kararlarının kaydı. "Neden X yerine Y tercih edildi?" sorusunun cevabı burada.
**Ne zaman güncellenir:** Önemli bir teknik, mimari veya tasarım kararı alındığında.

---

## Kararlar

<!-- Her yeni karar aşağıdaki formatta en üste eklenir (en yeni en üstte) -->

### 2026-06-30 — P2 (Living Flow mobil degradasyon) craft-gate'te iptal: imzaya simüle-sayı için dokunulmaz (Faz 6)

**Bağlam:** run-task TASK-6.06 (Faz 6 son lever). 6.04 ara-ölçü L1+L2'nin lab'da ölçülebilir Lantern delta üretmediğini, brief LCP'nin lab'da açık (mobil ~3.6s) kaldığını gösterdi ve P2'yi (Living Flow mobil degradasyon: DPR cap / particle / erken-static) **craft-gate** ile tetikledi — "lab'da simüle-LCP'yi azaltabilecek tek kalan lever WebGL gerçek iş yükü, ama craft-duyarlı". Task ön-koşulu bulanıktı: literal okumada "lab açık → koş", ama 6.04 kök nedeni kanıtlı bir **Lantern simülasyon artefaktı** (LCP elementi = hero metni, throttle'sız gözlemde `elementRenderDelay` 173↔173ms birebir → hero zaten ~185ms'de render; 3.6s = 4× CPU throttle altında WebGL main-thread'in *simülasyonu*).

**Seçenekler (kullanıcıya sunuldu, 2026-06-30):** (1) **İptal (❌)** — açık kanıtlı lab artefaktı, gerçek-cihazda sorun yok; imza görsele dokunma, gap'i dürüstçe kaydet (v0.1 deseni), 6.07'ye geç. (2) En hafif lever (mobil DPR cap 1.6→1.25) — görsel etki en düşük, lab yine kör kalabilir ama gerçek-cihaz WebGL yükü düşer. (3) Önce gerçek-cihaz/Vercel field ölçümü al, sonra karar.

**Karar (kullanıcı onayı 2026-06-30):** Seçenek 1 — **İptal.** P2 koşulmadı; `FlowCanvas.tsx` / `LivingFlow.tsx` parametrelerine **dokunulmadı** (kod değişmedi).

**Gerekçe:** Marka & Craft üst eksen (ILKELER §1). Müdahaleyi haklı çıkaracak metrik açığı **kanıtlı bir lab körlüğü** (Lantern observed trace'i throttle'sız alıp simüle ediyor; gerçek-cihazda LCP elementi ~185ms render) — gerçek-cihaz açığı değil. İmza Living Flow'u bir simüle-sayı için riske atmak craft tavanına (discuss guardrail: "yalnız craft korunarak, ölçülü, gözle") ve dürüst-kayıt ilkesine aykırı: hedef sessizce düşürülmez, craft sessizce feda edilmez, kalan açık açıkça belgelenir. L1+L2+L3 korunur (gerçek-cihaz-doğru + craft-koruyucu, regresyonsuz). **Durable ilke:** craft-gate koşullu task'ta tek başına "lab metriği açık" müdahaleyi haklı çıkarmaz — önce metriğin gerçek-cihaz-geçerli mi yoksa lab artefaktı mı olduğu ayrıştırılır. Brief perf bütçesinin temiz doğrulaması gerçek-cihaz / Vercel field gerektirir (metodolojik duvar, `phases/PHASE-6.md` + `docs/perf/README.md`).

**İlgili Task/Faz:** run-task TASK-6.06 (Faz 6 / v0.2 mobil perf-LCP); kök neden → `phases/PHASE-6.md` "Ara-Ölç Sonucu ve L3/P2 Kararı (TASK-6.04)"; Lantern körlüğü → `_dev/memory/lighthouse-lantern-render-timing-korligi.md`.

---

### 2026-06-30 — TR `/` mobil LCP kök nedeni CPU-bound WebGL main-thread; iki craft-koruyucu lever (Faz 6)

**Bağlam:** research-phase 6. TR `/` mobil LCP 3.6s (brief <2.5s altı). Mevcut Lighthouse JSON artefaktları (`docs/perf/home-{mobile,desktop}-20260630.json`) diagnostic-okuma + kaynak analizi: mobil mainthread "Other" (WebGL init/shader compile) **3663ms** vs masaüstü 1202ms — tek fark 4× CPU throttle. FCP 1657ms ama LCP 3604ms (1.9s boşluk) → main-thread LCP penceresinde bloke. Ayrıca kodda keşif: `Hero.tsx:18` hero `<h1>`'i `gsap.set(opacity:0)` ile gizleyip reveal ediyor (Lighthouse reduced-motion set etmez → ölçümde çalışır) → `opacity:0` LCP adaylığını kırar. **LCP elementi (metin/canvas) henüz ampirik teyitli değil** — mevcut JSON'larda `largest-contentful-paint-element` denetimi yok.

**Seçenekler (kullanıcıya sunuldu, 2026-06-30):** Hero reveal: transform-only / headline'ı reveal'den çıkar / reveal'e dokunma. WebGL deferral: idle-post-load / IntersectionObserver / sadece-ölç-sonra-karar.

**Karar (kullanıcı onayı 2026-06-30):** (1) **Hero reveal transform-only** — opacity-fade kaldırılır, kayma korunur (imza hareketi görsel olarak yaşar, headline LCP-uygun kalır). (2) **WebGL init mobilde idle/post-load'a ertelenir** — main-thread LCP penceresinde boşalır (flow ~0.5-1s geç belirir, yalnız mobil, gözle doğrulanır). Yardımcı: Fraunces SOFT/WONK eksenleri budanır (kullanılmıyor → craft-nötr). İlk task LCP elementini element-denetimli Lighthouse ile sabitler (ölç-önce). Three.js chunk küçültme kapsam-dışı (LCP kapısı main-thread, network değil).

**Gerekçe:** Marka & Craft üst eksen (ILKELER §1) — iki lever de craft-koruyucu (reveal kayması ve flow görseli korunur), WebGL-bağımsız/render-path = discuss "önce çevre" kararıyla hizalı. `opacity:0` LCP-adaylık kuralı + WebGL'in LCP penceresi dışına ertelenmesi gelecekteki hero/efekt işine de uygulanır (durable ilke). i18n parite bozulmaz (kod-only); korunan tabanlar (a11y=100, CLS=0, masaüstü 99-100) regresyonsuz tutulur.

**İlgili Task/Faz:** research-phase 6 (Faz 6 / v0.2 mobil perf-LCP); detay → `phases/PHASE-6.md` "Araştırma Bulguları". Plan/icra: plan-phase 6.

---

### 2026-06-30 — Test altyapısı mimarisi: Vitest + Playwright/axe + GitHub Actions (Faz 5 / D1)

**Bağlam:** research-phase 5. Projede test altyapısı yoktu ("test" = `next build` + elle/otonom doğrulama geçici konvansiyonu). Kümülatif harness'in (ILKELER "test atlanmaz, üstüne koyarak büyür") **runner + ilk CI + yüksek-değerli tohum** çerçevesinde kurulması gerekiyordu. Mevcut yığın ESM-ağır: three.js `transpilePackages`, Next 15 App Router, React 19, 5-dilli next-intl. Ampirik saptama: Playwright/axe **proje bağımlılığı değildi** (Faz 4 npx cache kullandı); i18n paritesi şu an tam (5×183 anahtar).

**Seçenekler (research'te değerlendirildi):** Runner: Vitest vs Jest. E2E/a11y: @axe-core/playwright vs jest-axe vs Lighthouse-CI/pa11y. DOM env: jsdom vs happy-dom. i18n tohum: anahtar-kümesi vs değer karşılaştırması. axe kapsamı: WCAG etiketleri vs full ruleset (best-practice dahil). DOM/component katmanı: şimdi kur+smoke / şimdi kur / ertele.

**Karar:** **Vitest 4** (node + jsdom çift ortam) + **@playwright/test 1.61.1 + @axe-core/playwright 4.12.1** + **ilk GitHub Actions CI** (2 job: build+vitest hızlı / playwright-a11y chromium). Tohum = i18n 5-dil **anahtar-kümesi** paritesi (node) + a11y regresyon `/` light+dark (Playwright/axe) + jsdom yolunu kanıtlayan **minik component smoke** (kullanıcı kararı 2026-06-30). axe kapsamı = **WCAG etiketleri** `wcag2a/2aa/21a/21aa` (kullanıcı kararı 2026-06-30). Playwright hedefi = prod build; chromium-only.

**Gerekçe:** Vitest ESM-native → three/Next 15/React 19 zincirine Jest'in `next/jest`+ESM sürtünmesi olmadan oturur (kalıcılık, ILKELER). @axe-core/playwright gerçek tarayıcıda kontrast/markup ölçer (jest-axe'in jsdom yanıltıcı yeşili değil), Faz 4 zemini birebir korunur. i18n testi **değeri değil anahtarı** karşılaştırır → TR-tek-kaynak + stale-çeviri stratejisiyle (DECISIONS 2026-06-27/06-28) uyumlu. **WCAG etiketleri** kritik nüansı çözer: Faz 4 a11y=100 **Lighthouse alt-kümesiydi**; ham axe full-ruleset (axe-core 4.12.1, best-practice dahil) "0 ihlal"i garanti etmez → WCAG AA'ya scope, Faz 4'ün kilitlediği standardı regresyona bağlar. Her katman uçtan-uca bir tohumla kanıtlanır ("her katman kanıtlanır" milestone'u). Bağımlılık ekleme install anında ayrıca teyit edilir (Dokunulmazlar).

**İlgili Task/Faz:** research-phase 5 (Faz 5 / v0.2 test altyapısı D1); detay → `phases/PHASE-5.md` "Araştırma Bulguları". Plan/icra: plan-phase 5.

---

### 2026-06-30 — Yeni tasarım-sistemi token'ı: `--color-pulse-ink` (ink-zemin adaptif imza-yeşili)

**Bağlam:** TASK-4.07 (Faz 4 a11y, C2/C3). Gym sektör paneli `bg-ink` + `text-canvas`; imza pulse-yeşili öğeler (adım no 01/02/03 + "Canlı ürünü gör" CTA) `text-pulse` (`#6fe36f`) kullanıyordu. Dark modda `--color-ink` krem'e (`#f2f1e8`) döndüğü için panel zemini krem oluyor → parlak pulse krem üzerinde 1.22 (color-contrast fail). Mevcut hiçbir yeşil token panelin **her iki halinde** (light=koyu zemin / dark=krem zemin) 4.5'i geçmiyordu — tek statik renk çözemez (DEV-2 dark-inversion).

**Seçenekler (kullanıcıya sunuldu, 2026-06-29):** (1) adım no `aria-hidden` + CTA nötr renk; (2) hibrit; (3) **adaptif `--color-pulse-ink` token** — light `#6fe36f` (= mevcut pulse, görünüm değişmez), dark `#1f7a3d` (krem panelde 4.74 ✅).

**Karar (kullanıcı onayı 2026-06-29, icra 2026-06-30):** Seçenek 3 — yeni semantik token `--color-pulse-ink`. `globals.css` `@theme` (light `#6fe36f`) + `html.dark` (dark `#1f7a3d`). Tüketiciler: yalnız `SectorSolutions.tsx` (panel-içi adım no + seeLive CTA, `text-pulse-ink`). `bg-pulse` canlı-nokta (dekoratif 1.5px grafik) `text-pulse` ailesinde değil, **dokunulmadı** (imza canlı göstergesi parlak pulse kalır).

**Gerekçe:** Marka & Craft üst eksen (ILKELER §1) — light görünüm **birebir** korunur (token light = eski pulse), yalnız dark'ta okunur koyu-yeşile döner (soluk-pulse → legible, craft iyileştirmesi). Dark değer keyfi değil: `#1f7a3d` = `--color-green` light marka-yeşili (logo/CTA'da zaten var). Token-sistemiyle uyumlu, hardcode yok (QUALITY §5). aria-hidden tercih edilmedi: kullanıcı dürüst/okunur fix istedi + CTA interaktif (gizlenemez). axe-core 4.11.4 light+dark: ikisinde de color-contrast 0 ihlal; perf/CLS regresyonsuz (yalnız renk token + class swap).

**İlgili Task/Faz:** run-task TASK-4.07 (Faz 4 / v0.2 a11y); kaynak DEV-2 → `phases/PHASE-4.md` "Re-ölçüm Teyidi".

---

### 2026-06-29 — Faz 4 a11y gate LIGHT değil **LIGHT + DARK** (re-ölçüm düzeltmesi)

**Bağlam:** run-task TASK-4.01 otoriter re-ölçümü (Lighthouse 13.3.0 + axe-core 4.11.4, her iki tema, mobil+masaüstü), bir önceki kararın (aşağıdaki "kontrast düzeltme mekanizması") **"Lighthouse light-mode ölçer → gate LIGHT"** önkabulünü **yanlışladı**: kanonik `npx lighthouse --headless=new` koşusu siteyi **DARK** render ediyor (tema init `prefers-color-scheme: dark`'a düşüyor; v0.1 baseline'ı da dark'tı). a11y=89 her iki temada aynı (aynı 4 denetim) ama color-contrast'ta **başarısız öğeler temaya göre değişir**. Kritik: `bg-ink`/`text-canvas` panelleri (SectorSolutions, Bunker, Footer) dark'ta krem'e döndüğü için yeni dark-only fail'ler çıktı — **C2** gym-panel adım no `text-pulse` ×3 (`SectorSolutions.tsx:131`, 1.22), **C3** "Canlı ürünü gör" `text-pulse` (`:143`, 1.22), **C9** Bunker durum `text-canvas/50` (`Bunker.tsx:58`, 3.36) — hiçbiri eski K1-K5 kapsamında değildi. Sonuç: K1-K5 tek başına a11y=100'e ulaşamaz (kanonik dark koşuda text-pulse fail kalır).

**Seçenekler (kullanıcıya sunuldu):** (1) **Light + Dark** (kapsamı genişlet). (2) Sadece light gate (ölçümü light'a zorla, dark fail'leri ertele — ILKELER light&dark'a aykırı). (3) Sadece kanonik dark gate (pratikte (1) ile aynı fix kümesi).

**Karar (kullanıcı onayı 2026-06-29):** Seçenek 1 — **a11y=100 gate = Light + Dark.** Plan revizyonu: **C9 → TASK-4.04** (cream-on-ink ≥%60 kapsamına); **C2/C3 (panel pulse-yeşili) → yeni fix task**, mekanizma (aria-hidden / bağlam-özel renk / treatment) fix-task research'ünde netleşir (craft-hassas, imza nabız yeşili); **TASK-4.07 → çift-tema (light+dark)** doğrulama. K1/K2/K3/K4 (4.02/4.03/4.05/4.06) değişmeden geçerli; K2 token koyulaştırma research'ten daha çok ink-faint öğeyi kapsar (teyit).

**Gerekçe:** ILKELER "renk kontrastı yeterli mi (light & dark)" + kanonik Lighthouse zaten dark → light-only gate hem ilkeye aykırı hem kanonik araçla <100 bırakır. Marka & Craft üst eksen: pulse-yeşili düzeltmesi imzayı koruyacak şekilde fix-task'ta tasarlanır. Ölçüm metodolojisi tuzağı kalıcılaştırıldı → `_dev/memory/a11y-olcum-tema-tuzagi.md`.

**İlgili Task/Faz:** run-task TASK-4.01 (Faz 4 / v0.2 a11y); tam envanter `tasks/archive/TASK-4.01.md` + `phases/PHASE-4.md` "Re-ölçüm Teyidi".

---

### 2026-06-29 — Faz 4 a11y kontrast düzeltme mekanizması (opaklık-değil-hue + token koyulaştırma)

**Bağlam:** research-phase 4, ana sayfa a11y=100 hedefi. Kod gerçek-okuması + WCAG hesabı, 2026-06-28 baseline'ın (a11y 89) başarısız öğelerini **stale** gösterdi: baseline başarısız renkleri kaba/harmanlanmış hex (`#8af28a`, `#999992`) olarak kaydetmiş; `globals.css` token'ları o ölçümden beri değişmemiş (commit `8d0c49a`). Kritik düzeltme: **kontrast sorunu hue değil opaklık** — adım numaraları (`HowItWorks.tsx:84`) zaten koyu marka yeşili `#1f7a3d` kullanıyor, sorun `/30` opaklığı (solid green cream'de 4.96 geçer; %30 = 1.51). discuss-phase'in "bright #8af28a → koyu yeşil varyant" varsayımı yanlış çıktı. color-contrast başarısızları faz tablosundaki 2 örnekten geniş ama tamamı ana sayfa (Hero `<dt>`, sektör notu, Footer `canvas/40`+ayraç, Crew OS panel `canvas/45`, dark `ink-faint`).

**Seçenekler (kullanıcıya sunuldu):** (1) Adım no: opaklık-bump [reddedildi — faint korunarak 3:1'e çıkamaz] / solid yeşil [craft regresyonu] / **aria-hidden**. (2) Soluk gri: öğe-bazlı swap / **token koyulaştırma**. (3) Hero `<dl>`: geçerli dl / **dl kaldır**.

**Karar (kullanıcı onayı 2026-06-29):**
- **K1** adım numaraları `aria-hidden` (renk değişmez, faint imza korunur; sıra `<h3>`+DOM'dan).
- **K2** `--color-ink-faint` token koyulaştır: light `#8b8d83`→`#67695f`, dark `#7d8073`→`#8a8c80` (canvas-deep dahil ≥4.5).
- **K3** Hero stats `<dl>/<dt>/<dd>` → semantik link markup (etiketli link, tanım değil; 2 denetim kapanır, görünüm birebir).
- **K4** dil-switcher `aria-label`'a locale kodu (`LABELS[locale] (CODE)`, kod-only, yeni i18n anahtarı yok).
- **K5** cream-on-ink: gerçek metin ≥%60, dekoratif ayraç aria-hidden.

**Gerekçe:** Marka & Craft üst eksen (ILKELER) → aria-hidden + birebir markup sıfır görsel değişimle a11y. Token koyulaştırma tek-kaynak tutarlılık (QUALITY §5) + kalıcılık. Kod-only aria → 5-dil parite yüzeyi açılmaz. Lighthouse light-mode ölçer (gate light); token her iki temayı kapsar, dark axe ile teyit. Perf/CLS korunan taban: fixler renk+markup, layout değil → regresyonsuz (re-ölçümde doğrulanır).

**İlgili Task/Faz:** research-phase 4 (v0.2 / Faz 4 a11y); detay `_dev/phases/PHASE-4.md` Araştırma Bulguları.

---

### 2026-06-28 — Ana sayfa perf tabanı: bütçe açığı (a11y 89 + mobil perf/LCP) bulundu → ertelendi

**Bağlam:** Faz 2 TD3, ana sayfa Lighthouse tabanı ölçüldü (yerel prod build, npx lighthouse@13.3.0, Chrome 149, mobil+masaüstü, çoklu koşu). Sonuç: **masaüstü** perf 100 / LCP 0.69s / CLS 0 (bütçeyi geçer); **mobil** perf 87 / LCP 3.1s / CLS 0; **accessibility her iki preset'te 89** (ortamdan bağımsız → en güvenilir sinyal). Brief bütçesi (≥95 perf / ≥100 a11y / LCP<2.5s / near-zero CLS) **karşılanmadı** (mobil perf −8, a11y −11, mobil LCP +0.6s; CLS geçti). a11y açığı 4 denetim: color-contrast (8 öğe; marka yeşili `#8af28a` krem üzerinde 1.22 + dark-mode soluk metin), definition-list+dlitem (hero `<dl>` geçersiz markup), label-content-name-mismatch (dil-değiştirici aria). Önemli: bunlar **regresyon değil** — kayıtlı önceki ölçüm yoktu, sayfanın keşfedilen mevcut durumu. (Metodoloji + ham koşu tablosu: `docs/perf/README.md`.)

**Seçenekler:**
1. Hepsini ertele — bulgu kayıtlı, a11y+perf düzeltmesi ayrı adanmış faza/versiyona; Faz 2 dar kapsamlı kalır.
2. Sadece a11y'yi şimdi düzelt (ucuz/net), perf/LCP ertele.
3. Hepsini şimdi düzelt (a11y + Living Flow WebGL perf optimizasyonu) — faz kapsamını belirgin genişletir.

**Karar:** Seçenek 1 — **hepsini ertele** (kullanıcı onayı, 2026-06-28).

**Gerekçe:** Optimizasyon discuss-phase'de bu fazın (teknik borç, dar kapsam) **dışı** bırakılmıştı; TD3 bir *doğrulama* task'ıdır, düzeltme değil. Açık bir regresyon değil (mevcut durum) → "korunan tabanı bozma" ihlali yok, bütçe-hedefi açığı var. "Az context = yüksek kalite" felsefesi gereği a11y+perf ayrı adanmış işe bırakıldı; bulgu `docs/perf/README.md` + faz/DURUM'da kayıtlı, kaybolmuyor. mobil perf/LCP'nin ana kaynağı Living Flow WebGL (craft-duyarlı, üst eksen) → aceleyle dokunulmaz. **Not (metodoloji tuzağı):** ilk mobil koşular host load avg 88 (20 çekirdek) nedeniyle gürültülüydü (TBT 206↔5065ms); taban düşük-yük (load ~5) koşularından alındı, yüksek-yük koşuları elendi. Perf ölçümünde `cat /proc/loadavg` ile host yükü gözlemi şart.

**İlgili Task/Faz:** run-task TASK-2.03 (Faz 2 / v0.1 teknik borç)

---

### 2026-06-28 — Performans tabanı `npx lighthouse` ile yerel production build üzerinde ölçülür

**Bağlam:** Faz 2 TD3, ana sayfa Lighthouse bütçesini (≥95 perf / ≥100 a11y / LCP < 2.5s / near-zero CLS) doğrulayıp taban kaydedecek. `package.json` dokunulmaz → ölçüm aracı **bağımlılık eklemeden** seçilmeli. discuss "yerel build'de ölç" demişti; research-phase ortam yoklamasında lighthouse@13.3.0'ın npx cache'te ve `/usr/bin/google-chrome` (149) hazır olduğu, ayrıca Vercel **preview** deploy'ının (main'e dokunmadan) da bir seçenek olduğu görüldü.

**Seçenekler:**
1. Yerel prod build (`next build && next start`) + `npx lighthouse` (npx cache, dep değil) + sistem Chrome; mobil+masaüstü; JSON/HTML artefakt repo'ya.
2. Vercel preview deploy (revize branch push → preview URL, canlı güvende) + PageSpeed/Lighthouse — production'a yakın ağ ama deploy-bağımlı.
3. Chrome DevTools Lighthouse paneli (manuel) — sıfır kurulum ama artefakt yok, tekrarlanamaz.

**Karar:** Seçenek 1 (kullanıcı onayı, 2026-06-28).

**Gerekçe:** `package.json`'a dokunmaz (npx cache → dokunulmaz kuralı korunur), indirme yok (zaten cache'te), kanonik Chrome ile kanonik skor, ve **artefakt arşivlenir** → tekrarlanabilir regresyon tabanı (kalıcılık ilkesi). Localhost ağ-iyimserdir (CDN/latency yok) ama a11y skoru ortamdan bağımsız ve perf mobil preset 4× CPU-throttle uygular → anlamlı "yerel taban". Preview deploy (Seçenek 2) network metrikleri için daha gerçekçi; merge sonrası production teyidi için ileride saklanır, bu fazın self-yeten tabanı için gerekmedi. **Taban evi:** yeni `_dev/docs/perf/` (raporlar) + faz/DURUM özet skorları.

**İlgili Task/Faz:** research-phase (Faz 2 / v0.1 teknik borç)

---

### 2026-06-28 — i18n anahtar-adı değişimi "stale kopya" istisnasının dışındadır (5 dil zorunlu)

**Bağlam:** Faz 1 R1'de "Nasıl Çalışır" 3→4 adıma çıkarken discuss kararı **semantik rename** (anahtarlar `listen/find/automate` → `analyze/design/automate/report`). research-phase'de bileşenin anahtarı *adıyla* okuduğu doğrulandı (`HowItWorks.tsx:15` sabit dizi). Dil stratejisi (2026-06-27 kararı) "TR tek kaynak, çeviri versiyon-sınırında; stale kopya geçici kabul" diyor. Soru: rename de "stale kopya" kapsamında mı (yani non-TR ertelenebilir mi)?

**Seçenekler:**
1. Cerrahi: rename'i 5 dile uygula; eşleşen adımları mevcut çevirilerden stale-kopya taşı; yalnız sıfırdan-yeni adımı ("Çözüm") non-TR'de şimdi çevir.
2. Tam senkron: 4 adımı 5 dilde şimdi düzgün çevir (versiyon-sınırını R1 için esnetir).
3. Katı versiyon-sınırı: rename + yeni slota non-TR'de geçici TR metni (non-TR ana sayfada Türkçe adım görünür).

**Karar:** Seçenek 1 — **Cerrahi.**

**Gerekçe:** Anahtar *adı* değişimi, "aynı anahtar / eski değer = stale kopya" tanımının dışındadır: eski ad silinince o dilde **eksik anahtar = runtime boşluk/hata** doğar (pazarlık-dışı yasak). Dolayısıyla rename mekanik olarak 5 dilin de dokunmasını zorunlu kılar — versiyon-sınırı ertelemesi burada uygulanamaz. Değer tarafında erteleme korunur: eşleşen adımlar stale çeviriyle taşınır, yalnız karşılığı hiç olmayan tek yeni slot ("Çözüm") çevrilir (craft: non-TR flagship'te Türkçe-metin sızıntısı yok). **Genel ilke (çapraz-faz):** gelecekte her i18n anahtar yeniden-adlandırması/yapısal değişimi 5 dili eşzamanlı dokunmayı gerektirir; yalnız *değer* değişimi versiyon-sınırına ertelenebilir.

**İlgili Task/Faz:** research-phase (Faz 1 / v0.1)

---

### 2026-06-28 — "● online/canlı" yasağı niyet-bazlı yorumlanır (dürüst canlı gösterge serbest)

**Bağlam:** prd-refine'da bölüm-bölüm kopya analizinde, Hero stat şeridinde (Alpfit "Şu an canlı" + nabız atan yeşil nokta) ve Sektörler gym panelinde ("Canlı — Alpfit" + animate-pulse nokta) **gerçek nabız atan canlı noktaları** bulundu. ILKELER/VIZYON ise pazarlık-dışı yasaklar arasında *"● online/canlı noktası yok"* diyor. Literal okunursa bu dürüst göstergeler de kalkmalı. Gerilim sessizce çözülmedi, kullanıcıya getirildi.

**Seçenekler:**
1. Niyet-bazlı: yasak *sahte presence-tiyatrosu* içindir; Alpfit gerçekten canlı → dürüst gösterge kalır.
2. Literal: hiçbir nabız atan "canlı" noktası kalmaz (statikleştir/kaldır).
3. Orta yol: "canlı" kelimesi/etiketi kalır ama nabız/ping animasyonu kaldırılır.

**Karar:** Seçenek 1 — niyet-bazlı.

**Gerekçe:** Yasağın amacı (brief §0/§9) *sahte canlılık* uydurmak — olmayan bir "şu an aktif" hissi vermek. Alpfit **canlıda gerçekten çalışıyor**; bunu nabızla göstermek dürüstlüktür, tiyatro değil. Bu, F5 dürüstlük konvansiyonuyla (gerçek=gerçek gibi, kurgu=öngörü/örnek) tam uyumlu. Craft (üst eksen) canlılık sinyalinden fayda görür. ILKELER ve VIZYON §4 bu ayrımı taşıyacak şekilde güncellendi.

**İlgili Task/Faz:** prd-refine (v0.1)

---

### 2026-06-27 — Dil senkronu: TR tek kaynak, çeviri versiyon-sınırında

**Bağlam:** Güçlü revize TR-öncelikli ilerleyecek. Her kopya değişikliğini 5 dile (özellikle kalitesi gözle doğrulanamayan Arapça'ya) anında yetiştirmek hem yük hem kalite riski. Kullanıcı "Türkçe'ye odaklanalım, Arapça beni korkutuyor, gerekirse çıkaralım" dedi.

**Seçenekler:**
1. 5 dil kalsın; TR tek kaynak; çeviri her versiyon kapanırken tek seferde.
2. Arapça'yı tamamen çıkar (RTL yükü/QC sorunu gider, ama çalışan altyapı + MENA erişimi feda).
3. Sadece TR+EN aktif, AR/DE/ES dondur.

**Karar:** Seçenek 1.

**Gerekçe:** AR/DE/ES çevirileri zaten yapılmış ve çalışıyor (RTL dahil) — silmek çalışan değeri çöpe atmak (kalıcılık ilkesine ters). Asıl sorun "Arapça'nın varlığı" değil, "sürekli 5× senkron" yükü. Senkron modelini değiştirmek (sürekli → versiyon-sınırı) hem TR-odağı hem craft'ı korur: kopya TR'de durulunca tek seferde çevrilir. Revize sürerken TR-dışı diller geçici eski kopyada kalır (kontrollü tutarsızlık).

**İlgili Task/Faz:** prd (v0.1)

---

### 2026-06-27 — Bayrak katman: public ad "Crew OS", iç ad "Bunker OS"

**Bağlam:** Brief (MASTER_PROMPT v2 §1) bayrak katmana "Bunker OS" derken sitenin tamamı 5 dilde "Crew OS" diyor; ikisi de aynı katmanı tanımlıyor. Bu karışıklık ana sayfadaki içerik hatasının da köküydü.

**Seçenekler:**
1. Public "Crew OS", iç kod adı "Bunker OS" (kullanıcı: "biz Bunker OS kullanıyoruz ama insanlar anlasın diye ismini Crew OS yapıyoruz").
2. Brief'e uyup her yerde "Bunker OS" kullan.

**Karar:** Seçenek 1 — sitede her zaman **Crew OS**; **Bunker OS** kullanıcıya görünmez (yalnızca iç ad).

**Gerekçe:** Site zaten 5 dilde "Crew OS" ile canlı; bu, müşterinin anlaması için bilinçli seçilmiş public ad. Brief bu noktada eski. Bunker OS = aynı şeyin iç kod adı (ayrı geliştirme projesi), iki ürün değil. Alpfit ise tamamen ayrı bir dikey ürün.

**Sonuç (takip):** Brief §1, OVERVIEW ve MODULE-MAP'teki "Bunker OS/Crew OS" ifadeleri ve `/bunker-os` route adlandırması kickoff'ta hizalanacak (PRD/SESSION-NOTES'ta işaretli).

**İlgili Task/Faz:** prd (v0.1)

---

### 2026-06-27 — Güçlü revize, yeni repo yerine v3'te yerinde + branch ile yürütülecek

**Bağlam:** kiwiailab.com'un güçlü revizesine başlanırken, "eski siteye hiç dokunmadan `websitev4` adıyla yeni bir repo açıp orada çalışma" seçeneği değerlendirildi. Canlı siteyi bozmama isteği vardı.

**Seçenekler:**
1. v3'te yerinde, `revize/...` branch'inde çalış — basit, hiçbir şey kaybolmaz, `main` canlı kalır.
2. `websitev4` reposu (v3 kodundan tohumlanmış) — ayrı repo/Vercel projesi, ama bakım/eşitleme yükü.
3. `websitev4` sıfırdan — Living Flow, i18n, tema sistemi yeniden inşa (yüksek maliyet/risk).

**Karar:** Seçenek 1 seçildi (v3'te yerinde, branch ile).

**Gerekçe:** Tespit edilen sorunların tamamı içerik + cila kalemi (mimari arıza değil); v3 sofistike ve sağlam (custom GLSL, 5 dilli i18n, tema sistemi). Sıfırdan yazmak bu değeri çöpe atıp aylarca yeniden inşa demek. `main`'i canlı tutup `revize/...` branch'inde çalışmak "canlıya dokunma" isteğini risksiz karşılıyor.

**İlgili Task/Faz:** map-codebase (DevFlow kurulumu)

---
