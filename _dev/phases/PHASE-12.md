# Phase 12: v0.3 Living Flow Nabız Kapsamı (B1)

**Durum:** ✅ Tamamlandı

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm ~20k token'a yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-12-<slug>.md`'ye bölünür. Tamamlandıktan (✅) sonra bölme yasaktır. -->

---

## Genel Bilgiler

**Amaç:** Ana sayfada şu an yalnızca Hero'da render edilen Living Flow yeşil nabızlarını, kontrollü biçimde sayfanın devamına taşımak (B1). İmza akış hissini aşağı uzatırken okunabilirlik, göz yorgunluğu ve perf tabanını korumak. **Karar-gate'li ve imza-riskli faz:** milestone bir "uygula" garantisi değil — sonuç ya kontrollü uygulama ya da (P2 Faz 6 emsali) bilinçli iptal-kaydet.

**Milestone:** Living Flow nabız kapsamı kararı verildi ve **uygulandı VEYA iptal-kaydedildi**; her iki sonda da imza (Hero çekirdek efekti), reduced-motion/no-WebGL tam fallback, a11y kontrast=100 çift-tema ve perf tabanı (desktop perf 100 / CLS 0 / mobil taban) **korundu** (regresyonsuz).

### Feature Listesi

(MODULE-MAP ve modules/ referansı)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| B1: Living Flow nabız kapsamı (aşağı-taşıma, karar-gate'li) | M1 (+M2 scrim/bölüm entegrasyonu) | Hero-sonrası bölümlerde sürekli-soluk nabız ipliği; desktop-öncelik, bölüme-uyarlanan opaklık; okunabilirlik/perf/a11y guardrail'leri korunur |

---

## Kapsam Tartışması

> `/devflow:discuss-phase 12` oturumunda dolduruldu (2026-07-02).

### Alınan Kararlar

- **Yön — kontrollü aşağı-taşıma:** Nabızlar Hero'nun altına, sayfanın devamına taşınır. Gerekçe: B1 backlog sorusundaki beğenilen etki "aşağı kayan yeşil nabızlar"dır; süreklilik hissi güçlendirilir. Kullanıcı "yerinde bırak" ve "saf değerlendir→iptal" seçenekleri yerine kontrollü taşımayı seçti. (Craft üst eksen — ILKELER.)
- **Biçim — sürekli soluk iplik:** Nabızlar Hero'dan sonra da bölümlerin arkasında **çok soluk** biçimde sürer (tek bütün alan hissi), "seçili aksan noktaları" veya "tek sabit katman" yerine. En güçlü süreklilik/imza hissi (beğenilen etkiye en yakın), ama en yüksek okunabilirlik+perf riskini taşıyan biçim → koruma disiplini kritik.
- **Mobil/perf — desktop-öncelik, mobil korunur:** Aşağı-taşıma öncelikle desktop/yüksek-güç içindir. Mobil/low-power'da nabız Hero'da kalır veya statik/çok-hafif. Gerekçe: mobil perf brief'te zaten açık, WebGL alanını büyütmek GPU maliyeti; perf tabanı **korunan taban** (ILKELER, regresyon yasak) — sıfır risk tercih edildi.
- **Okunabilirlik — bölüme-uyarlanan opaklık:** Metin-yoğun (HowItWorks/Sektörler) ve koyu-panel (Crew OS teaser) bölümlerde iplik daha da soluk / scrim daha güçlü; nefes alan bölümlerde biraz daha görünür. **Metin her zaman kazanır.** Gerekçe: a11y kontrast=100 korunan taban + backlog'da işaretli göz yorgunluğu riski; tek-tip düz opaklık metin-yoğun bölümlerde fazla gelebilir.

### Kullanıcı Tercihleri

- Süreklilik hissi (imza akışı) önemseniyor — beğenilen etki bu; biçim seçimi buna göre yapıldı.
- Perf tabanına sıfır risk: mobil bilinçle korunuyor.
- İpliğin sayfada ne kadar aşağı ineceği (Footer dahil mi, Credibility'de kesilsin mi) ve bölüm bazında opaklık tavanı research/plan aşamasında somutlaşır — kullanıcı ek kısıt getirmedi.

### Çapraz Konular

- **Performans (guardrail):** WebGL alanını büyütmek = GPU maliyeti. Korunan taban regresyonsuz kalır (desktop perf 100 / CLS 0 / mobil taban). Sürekli alanın **teknik biçimi** (tek büyük canvas mı, bölüm-başı instance mı, sabit arka-plan katmanı mı) research/plan işidir — burada damgalanmadı; perf ölçümü seçimi yönlendirir.
- **a11y (guardrail):** Kontrast=100 çift-tema korunan taban — iplik arkasındaki metin her iki temada WCAG-AA eşiğini geçmeli (ölçülür; regresyon yasak). reduced-motion / no-WebGL tam fallback korunur; alan zaten `aria-hidden`.
- **i18n:** Saf görsel değişiklik — **yeni i18n anahtarı yok** → 5-dil parite riski yok.
- **Göz yorgunluğu:** Opaklık tavanı + scrim gerçek görsel incelemeyle doğrulanır (craft son hakem).

### Karar-Gate Kriterleri (iptal-kaydet tetikleri)

Sürekli iplik şunlardan **birini** koruyamıyorsa → P2 (Faz 6) emsali gibi **iptal-kaydet** (kod geri alınır, gerekçe `docs/DECISIONS.md`'ye):
- Kontrast=100 (çift-tema) korunamıyor, **veya**
- Perf tabanı (desktop) regres ediyor, **veya**
- Gerçek görsel incelemede göz yorgunluğu / şablon-kokusu / imzayı zayıflatma görülüyor → craft son hakem.

### Kapsam Dışı

- **Mobil aşağı-taşıma** — mobil/low-power Hero-only veya statik kalır (perf tabanı).
- **`/crew-os` + Alpfit sayfa-başlığı Living Flow'ları** (zaten var, dokunulmaz) ve **404 sayfaları**.
- **Hero'nun çekirdek efekti** — Hero tam yoğunlukta mevcut haliyle kalır (yeniden tasarım yok).
- İçerik/kopya/davranış değişikliği, yeni bölüm/layout, yeni i18n anahtarı.

---

## Araştırma Bulguları

> `/devflow:research-phase 12` oturumunda dolduruldu (2026-07-03). Odak: kapsam tartışmasının bıraktığı tek açık teknik soru — "sürekli soluk iplik"in teknik biçimi (perf ölçümü belirleyecek).

**Mevcut durum (kaynak teyidi):** `LivingFlow` şu an `Hero.tsx` içinde `absolute inset-0`, Hero `<section>`'da `overflow-hidden` (`src/components/Hero.tsx:34,36`) → alan Hero viewport'una **kırpılı**. Aşağı taşımak = alanı bu kırpma sınırından çıkarmak. Canvas `frameloop=always` (default; `FlowCanvas.tsx`'te frameloop prop'u ve in-view unmount **yok**) → Hero dışına scroll edilince bile render etmeye devam ediyor.

### Değerlendirilen Yaklaşımlar

- **A — Tek büyük (belge-boyu) canvas:** Tüm sayfa yüksekliğinde tek canvas. **Eksi (elendi):** belge-boyu backing store = viewport'un N katı bellek/fillrate; pratikte uygulanamaz, zaten "fixed viewport + parallax"a çöker (= C). Saf haliyle geçersiz.
- **B — Bölüm-başı instance:** Her bölüm arkasına ayrı hafif `FlowCanvas`. **Artı:** bölüm-bazlı opaklık trivial, in-view mount/unmount. **Eksi:** her R3F `Canvas` = ayrı **WebGL context** (tarayıcı limiti ~16; Hero + 5 bölüm riskli) + ayrı rAF döngüsü (batarya/CPU); en kritiği **süreklilik illüzyon** — alanlar bölüm sınırında bağlanmaz → discuss'taki "tek bütün alan" kararıyla **çelişir**, sınırlarda dikiş.
- **C — Sabit viewport canvas + parallax:** Tek canvas `position: fixed`, viewport-boyu; içerik üstünden akar, nabızlar mevcut scroll-parallax'la (`FlowCanvas.tsx` `groupRef.position.y = scrollY*...`) aşağı sürüklenir. **Artı:** tek alan = en güçlü "tek bütün alan"/imza sürekliliği (beğenilen etkiye en yakın); tek WebGL context; backing store viewport-boyu (sayfa uzunluğundan bağımsız sınırlı); mevcut `FlowCanvas` mimarisini yeniden kullanır (yeni paket yok). **Perf hipotezi:** canvas bugün de sürekli render ettiğinden (yukarıda), fixed'e almak artımlı GPU maliyetini ~sıfıra yaklaştırır (aynı piksel/frame, sadece artık görünür). **Eksi:** bölüm-bazlı opaklık canvas'tan gelemez (tek uniform alan) → adaptif scrim gerektirir; Hero alanının mount noktası taşınmalı (aşağıda karar).
- **Seçilen: C** (fixed viewport canvas + parallax). Gerekçe: perf-sınırlı (viewport-boyu, ~sıfır artımlı maliyet), en güçlü süreklilik/imza (ILKELER craft üst eksen), mevcut mimariyi yeniden kullanır (kalıcılık ilkesi, yeni bağımlılık yok). Bölüme-uyarlanan opaklık **bölüm-başı adaptif scrim** ile (mevcut `FlowScrim` deseni + zaten var olan `bg-canvas-deep/40` bölüm arkaplanları), canvas'tan değil.

### Kullanılacak Araçlar/Kütüphaneler

- **three + @react-three/fiber (mevcut):** Yeni sürüm/paket **yok** — mevcut `FlowCanvas` yeniden kullanılır/parametrize edilir (opaklık/extent prop'u). `package.json` dokunulmaz (dokunulmazlar kuralı — paket eklemek onay ister; gerek yok).
- **CSS `position: fixed` + adaptif scrim (mevcut `FlowScrim` deseni):** Yeni kütüphane değil; token-bazlı (`--color-canvas`, `--color-canvas-deep`).

### Dikkat Edilecekler

- **Belge-boyu canvas tuzağı:** Alan **asla** belge yüksekliğinde boyutlandırılmaz (bellek/fillrate patlar) — `fixed` viewport-boyu + parallax ile "aşağı akıyor" hissi verilir. (Yaklaşım A'nın elenme sebebi.)
- **WebGL context limiti:** Çoklu instance (B) context tüketir → tek canvas'ta kal. Tek alan (C) = tek context.
- **Desktop perf 100 / CLS 0 tabanı = gate:** Artımlı-sıfır maliyet bir **hipotez**; plan/task'ta Lighthouse çift-tema ile ölçülüp doğrulanır. Regres ederse → karar-gate iptal-kaydet. Kaynak: `_dev/docs/perf/` (`home-desktop-20260628.{html,json}` — masaüstü perf 100 / CLS 0, yük altında bile stabil; **dış/bu-faz-öncesi baseline artefaktı**).
- **a11y kontrast=100 (çift-tema):** İplik dekoratif `aria-hidden` ama bu **color-contrast'tan muaf tutmaz** (→ `_dev/memory/aria-hidden-color-contrast-muafiyeti-degil.md`); nabız/iplik metin arkasından geçerse metnin efektif arkaplanını değiştirir → **adaptif scrim metni her iki temada WCAG-AA'da tutmalı** (verify'de ölçülür). Metin her zaman kazanır.
- **Opak bölüm örtmesi (kendiliğinden doğru):** Footer `bg-ink` (`Footer.tsx:48`, opak) ve Crew OS teaser iç paneli `bg-ink` (`Bunker.tsx:54`) fixed alanı doğal olarak örter → ekstra kesme koduna gerek yok; alan o bölgelerde zaten görünmez.
- **Hero LCP-defer korunur:** rAF/idle defer mantığı `LivingFlow.tsx`'te; mount taşınırken bu mantık birlikte taşınır (LCP koruması bozulmaz).
- **Reduced-motion / no-WebGL fallback:** Aşağı-taşınan alan bu modlarda **eklenmez** (yalnız mevcut Hero statik tabanı kalır) → fallback güvence altında, yeni kırılma yüzeyi yok.
- **Mobil/low-power gate:** Aşağı-taşıma yalnız desktop/high-power. Mevcut `lowPower` tespiti (`LivingFlow.tsx:38-40`, `hardwareConcurrency<=4 || max-width:768px`) yeniden kullanılır — mobilde alan Hero'da kalır (discuss: perf tabanına sıfır risk).

### Teknik Kararlar

- **TK1 — Tek fixed viewport canvas (Yaklaşım C):** Bölüm-başı instance (B) ve belge-boyu canvas (A) yerine. Gerekçe: süreklilik + tek context + sınırlı backing store + mevcut mimari yeniden kullanımı.
- **TK2 — Hero alanı sayfa-seviyesi `fixed` katmana taşınır (görsel birebir aynı):** Tek-alan sürekliliği için Hero'nun `overflow-hidden` kırpmasından çıkılır; Hero üstünde scrim yok → tam yoğunluk korunur, Hero **görsel olarak aynı** görünür ("Hero çekirdek efekti dokunulmaz" sınırı görsel düzeyde onurlandırılır). Alternatif (Hero'ya hiç dokunma + ikinci sönük alan) iki WebGL context + sınır dikişi getirdiği için **elendi**. *Not: mount noktası taşınması icra detayı; craft son hakem verify-phase'de — imzayı zayıflatırsa karar-gate iptal-kaydet.*
- **TK3 — Bölüme-uyarlanan opaklık = adaptif scrim, canvas değil:** Tek uniform alan bölüm-bazlı opaklık veremez → her bölüm kendi scrim'ini taşır (mevcut `FlowScrim` deseni). Metin-yoğun (HowItWorks/Sektörler) güçlü scrim, nefes alan bölüm zayıf; opak bölüm doğal örter. Metin her zaman kazanır.
- **TK4 — Yeni bağımlılık / yeni i18n anahtarı yok:** Saf görsel + mevcut three/R3F. `package.json` ve `messages/*` dokunulmaz (5-dil parite riski yok — discuss teyitli).
- **Açık uç (plan/craft'a bırakıldı):** İpliğin tam kesim noktası (Credibility'de mi sönümlenir, Footer'a kadar mı) ve bölüm-başı opaklık tavanları — düşük-riskli craft ayarı; Footer opak zaten örttüğü için zorunlu kesme kodu gerekmiyor. Plan-phase'de somutlaşır.

---

## Task Listesi

> `/devflow:plan-phase 12` oturumunda dolduruldu (2026-07-03). 3 task — yapısal aşağı-taşıma → okunabilirlik → karar-gate. Sıra = bağımlılık sırası.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır. -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 12.01 | TASK-12.01 | ✅ Tamamlandı | Fixed viewport Living Flow katmanı + Hero koordinasyon (TK1/TK2): desktop-high-power'da alan sayfa-seviyesi fixed katmana taşınır, tek WebGL context, Hero görsel birebir aynı, mobil/reduced/no-WebGL fallback aynen |
| 12.02 | TASK-12.02 | ✅ Tamamlandı | Bölüme-uyarlanan okunabilirlik / adaptif scrim (TK3): `FlowVeil` (YENİ, token-bazlı %56 canvas washi, içerikle scroll eden main-içi wrapper — fixed backdrop hero/bölüm ayrımı yapamaz); adaptasyon emergent (transparent görünür / `/40` soluk / opak örter); bölüm dosyalarına dokunulmadı; build+a11y+i18n yeşil |
| 12.03 | TASK-12.03 | ✅ Tamamlandı | Karar-gate → **uygula-onayla** (+ light-veil craft ince-ayarı): Gate-1 a11y 0 ihlal çift-tema full-motion · Gate-2 desktop perf 100/CLS 0 regresyonsuz · Gate-3 craft (dark kusursuz, light bleed `--flow-veil` %70 ile çözüldü). DECISIONS 2026-07-03 + `perf/home-desktop-20260703-faz12` |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

**Tarih:** 2026-07-03
**Toplam Senaryo:** 16 | **Geçen:** 16 | **Kalan:** 0

**Test modu:** Otonom (11 kod/ölçüm-doğrulanabilir senaryo otonom koşuldu) + kullanıcı craft onayı (5 görsel/craft senaryo, shipped build ekran görüntüleriyle — 12.03 karar-gate onayıyla tutarlı).

**Otomatik kontroller (Adım 1):** CI (fast+a11y) her 3 kod commit'inde ✅ yeşil · security-review **0 bulgu** (saf görsel/WebGL katmanı) · npm audit değişmedi (`package.json` dokunulmadı — TK4; 3 moderate = faz-dışı sahipli TB-C). Düzeltme task'ı doğuran bulgu yok.

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | **Desktop/high-power — aşağı-taşıma:** full-motion, yeşil nabızlar Hero'nun altına akıyor (tek fixed viewport alan) | ✅ Geçti | otonom — runtime harness: 1 canvas fixed, scroll'da kalıcı |
| 2 | **Tek WebGL context:** sayfada yalnız 1 `<canvas>`, fixed backdrop içinde, Hero-contained değil | ✅ Geçti | otonom — `inFixed=true, inHero=false`; çift-context yok |
| 3 | **Hero görsel parite (TK2):** scroll=0'da Hero görsel birebir aynı (imza zayıflamadı) | ✅ Geçti | craft onayı — full-intensity, unveiled; kullanıcı onayladı |
| 4 | **Mobil/low-power (≤768px) Hero-only:** alan Hero'da kalır, backdrop yok | ✅ Geçti | otonom — `inHero=true`, backdrop mount olmadı |
| 5 | **reduced-motion fallback:** WebGL yok, `StaticFlow` SVG + baz wash | ✅ Geçti | otonom — 0 canvas + StaticFlow SVG |
| 6 | **no-WebGL fallback:** statik fallback'e düşer, hata/çökme yok | ✅ Geçti | otonom — webgl=false → 0 canvas + StaticFlow (reduced-motion ile aynı dal) |
| 7 | **Okunabilirlik — light tema:** tüm Hero-altı bölümlerde metin alan üstünde net okunur | ✅ Geçti | craft onayı — light veil %70; başlık bandı hafif nabız var ama metin kazanıyor |
| 8 | **Okunabilirlik — dark tema:** aynı bölümlerde metin okunur (panel renkleri krem'e döner) | ✅ Geçti | craft onayı — dark kusursuz |
| 9 | **Adaptif veil:** metin-yoğun/`bg-canvas-deep/40` bölümlerde alan soluk; transparent bölümde daha görünür | ✅ Geçti | craft onayı — adaptif dimleme görünür (emergent) |
| 10 | **Opak bölüm örtmesi:** Footer + Crew OS teaser iç paneli (`bg-ink`) fixed alanı doğal örter | ✅ Geçti | otonom — `bg-ink` sınıfları mevcut (Footer.tsx:48, Bunker.tsx:54) |
| 11 | **Gate-1 a11y kontrast=100 çift-tema (full-motion):** alan render ederken 0 WCAG-AA ihlali + LH a11y 100 | ✅ Geçti | otonom — chrome+swiftshader axe, alan live, 0 ihlal light+dark; 34 incomplete=WebGL-arkası (memory `axe-webgl-contrast-incomplete`, craft son hakem) |
| 12 | **Gate-2 desktop perf 100 / CLS≈0:** `home-desktop-20260628` tabanı regresyonsuz | ✅ Geçti | otonom — artefakt: perf 100 / CLS≈3.75e-6 / LCP 620ms (baseline 100/0/689 regresyonsuz) |
| 13 | **i18n 5-dil parite:** yeni anahtar yok, eksik anahtar yok | ✅ Geçti | otonom — vitest 7/7 |
| 14 | **RTL (AR):** `/ar` aşağı-taşıma + veil RTL'de bozulmuyor | ✅ Geçti | otonom — `<html dir="rtl">`, 200; veil dikey gradient RTL-agnostik |
| 15 | **Chatbot bölümü:** aşağı-taşıma sonrası `#chat` etkileşimi/okunabilirliği bozulmadı | ✅ Geçti | otonom — `id="chat"` render, bozulma yok |
| 16 | **Adversarial — tema toggle + scroll ortasında:** light↔dark geçişinde alan/veil rengi anında uyar, flash yok | ✅ Geçti | mekanizma otonom teyitli (FlowCanvas MutationObserver `html.dark` satır 259/266) + craft onayı |

---

## Retrospektif

> `/devflow:review-phase 12` oturumunda dolduruldu (2026-07-03).

### Ne İyi Gitti?
- **Karar-gate disiplini tam işledi.** İki hard gate (a11y kontrast=100 çift-tema / desktop perf 100·CLS 0) otomatik + ampirik ölçüldü; tek craft gerilimi (light başlık bleed'i) kullanıcıya getirildi. Sonuç iptal değil, **kontrollü CSS-only ince-ayar** (tema-flip `--flow-veil` token) — craft üst eksen ile kalıcılık dengesi. İmza-riskli faz gate'i tasarlandığı gibi çalıştı (P2/Faz 6 emsali canlı).
- **Shared hook refactor kök-nedeni kapattı.** `useFlowMode` (12.01) mod-tespiti tek gerçek kaynağa çıkardı → `LivingFlow` ve `FlowBackdrop` asla ayrışmaz; "tek WebGL context" bir **mimari invariant** oldu (kopya-kod + çift-context riski aynı anda elendi, QUALITY §5).
- **Emergent adaptasyon = sıfır bölüm-dosyası dokunuşu.** Bölüme-uyarlanan okunabilirlik (TK3), mevcut `bg-canvas-deep/40` bölüm arkaplanları + kartlar lokal lift verdiği için tek global veil ile sağlandı; 6 bölüm dosyasının hiçbirine dokunulmadı (minimum yüzey, minimum regresyon riski).
- **Araştırma hipotezi ölçümle doğrulandı.** "Canvas zaten `frameloop=always` render ediyor → fixed'e almak artımlı GPU'yu ~sıfıra yaklaştırır" hipotezi Gate-2'de birebir çıktı (perf 100 regresyonsuz). A/B/C yaklaşım elemesi net gerekçeliydi ve icra C'yi birebir izledi — research→plan→icra hizası yüksek.

### Ne Kötü Gitti?
- **Plan'ın Karar Noktası A stacking nüansını atladı.** 12.02 "veil'i `FlowBackdrop`'a koy" öneriyordu; ama `FlowBackdrop` **fixed** olduğu için içine konan veil hero/bölüm ayrımı yapamaz (aynı viewport, farklı scroll anları). İcra sırasında fark edilip veil içerikle scroll eden `<main>`-içi wrapper'a taşındı (A'nın ruhu korundu, yeri düzeltildi). Küçük ve doğru yerde çözüldü ama araştırma bu koordinat-uzayı ayrımını önden yakalayabilirdi.
- **Craft açık-ucu (light bleed) ancak gate'te göründü.** 12.02'de "ön-inceleme OK" denen şey, full-motion görsel inceleme yalnız 12.03 gate'inde yapıldığı için restraint sınırında çıktı. Doğru yerde (gate, craft son hakem) yakalandı ve çözüldü — ama craft-riskli işte full-motion görsel kontrol daha erken (build task'ında) yapılsa açık-uç erken belirirdi.

### Sonraki Faz İçin Öneriler
- **v0.3 içerik fazları bitti → versiyon-sonu sabit fazları gelir** (teknik borç → senaryo testi → prd-review). Versiyon Sonu Durumu `içerik_fazları` (değişmez); `içerik_fazları`→`teknik_borç` geçişini `discuss-phase 13` yapar.
- **Craft-riskli görsel/WebGL işte full-motion görsel kontrolü build task'ında yap** (gate'i bekleme) — açık-uçlar (opaklık tavanı, bleed) erken görünür. Bu projede full-motion WebGL-arkası kontrast zaten craft son hakemdir (memory `axe-webgl-contrast-incomplete`); kontrolü öne çekmek gate'e sürpriz bırakmaz.
- **Test kapsamı boşluğu kayıtlı:** fixed-backdrop full-motion davranışı (tek-context invariant + veil okunabilirliği) otomatik regresyon tohumuyla korunmuyor — mevcut a11y tohumu `reducedMotion:"reduce"` koşar, bu dalı atlar. WebGL runtime testi flaky (memory `playwright-bundled-chromium-webgl-yok`) diye bilinçle ertelendi; gelecekte `channel:'chrome'` tek-context invariant testi kümülatif değer taşır (maliyet/flakiness tartılarak).
- **Kayıtlı SEO açıkları hâlâ açık:** alt-sayfa canonical=`/` (latent) + `/forum` locale-prefix gap (`/en/forum`→404) — gelecek SEO fazı adayı (Faz 11 retrosundan devralındı, bu faz kapsamı değildi).

### Task-Spesifik Teknik Öğrenimler
- **Fixed katmana konan veil scroll-koordinatlı ayrım yapamaz.** Okunabilirlik veil'i içerikle **scroll etmeli** → `<main>`-içi `relative isolate` wrapper + `absolute inset-0` veil + `relative z-10` içerik. Stacking: fixed flow (z-0, main dışı) < veil (z-0, isolate tabanı) < içerik (z-10). `isolate` yeni stacking context açtığı için veil fixed backdrop'la z-savaşına girmez.
- **Opak `body` bg → katmanlama pozitif-z ile yapılır** (backdrop `z-0` / içerik `relative z-10`), negatif-z ile değil. Negatif-z, background-propagation'a bağımlı ve kırılgan; body bg opak olduğunda (`globals.css:60`) pozitif-z robust.
- **`frameloop=always` canvas fixed'e alınınca artımlı GPU ~sıfır** — aynı piksel/frame üretiliyor, fark yalnız "artık scroll boyunca görünür". Zaten-render-eden bir alanı görünür kılmak yeni maliyet değildir (Gate-2 doğruladı).

<!-- DevFlow'a Öneri: bu fazda DevFlow yönteminin geneline dair (proje-özel olmayan) bir iyileştirme çıkmadı — alt bölüm silindi. -->

---

## Kalite Kontrol Sonuçları

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ | Craft son hakem gate'te devrede; dark kusursuz (parlayan yeşil = ambient derinlik), light bleed `--flow-veil` %70 token'ıyla çözüldü. "Tek bütün alan" sürekliliği imzayı **güçlendirdi** (aşağı kayan nabızlar = beğenilen etki); şablon-kokusu yok, tek güçlü fikir öne çıktı. |
| Erişilebilirlik | ✅ | a11y kontrast=100 çift-tema **full-motion** (alan live), 0 WCAG-AA ihlali; LH a11y 100. Dürüst caveat: ~15 alan-üstü öğe axe `color-contrast` *incomplete* (WebGL okunamaz) → craft görsel son hakem + FlowVeil washi güvence (memory `axe-webgl-contrast-incomplete`). reduced/no-WebGL fallback korundu. |
| Performans | ✅ | desktop perf **100** / CLS ≈3.75e-6 (≈0) / LCP ~625ms — baseline `home-desktop-20260628` regresyonsuz. Tek WebGL context; artımlı-sıfır maliyet hipotezi ölçümle doğrulandı. Mobil bilinçle korundu (aşağı-taşıma desktop-only). |
| Yerelleştirme & RTL | ✅ | Yeni i18n anahtarı yok (TK4) → 5-dil parite riski yok (vitest 7/7). Veil dikey gradient RTL-agnostik; `/ar` `dir=rtl` 200, bozulma yok. |
| Modülerlik & Bakım | ✅ | `useFlowMode` shared hook = tek gerçek kaynak (kopya-kod yok); `FlowBackdrop`/`FlowVeil` tek-sorumluluk; veil tek token'dan (`--flow-veil`) ayarlanır; bölüm dosyalarına 0 dokunuş (emergent adaptasyon). Cerrahi, izole, geri-alınabilir. |
| Hata Yönetimi & Degradasyon | ✅ | Fallback korundu: reduced/no-WebGL → `StaticFlow` SVG (aynı kod dalı); low-power → Hero-contained; `idle`/`low`/`static` modda backdrop `null` (yeni kırılma yüzeyi yok). Tema toggle scroll ortasında flash'sız (MutationObserver). |
| Güvenlik (hafif) | ✅ | Saf görsel/WebGL/CSS katmanı — yeni girdi/auth/secret yüzeyi yok; security-review 0 bulgu; `package.json`/`.env` dokunulmadı (npm audit değişmedi). |
| Test Kapsamı (kümülatif) | ⚠️ | Mevcut tohumlar yeşil (a11y reduced-motion + i18n parite); build temiz; gate ölçümleri kaydedildi. **Boşluk:** fixed-backdrop full-motion davranışı otomatik regresyon tohumuyla korunmuyor (tohum reduced-motion koşar, bu dalı atlar) — WebGL runtime flaky (memory) diye bilinçle ertelendi; gate manuel + kayıtlı. Sonraki-faz önerisi. |

**Kullanıcı yolculuğu & boşluk tespiti:** Deneyim tutarlı — desktop/high-power kullanıcı zenginleştirilmiş sürekli akışı görür, mobil/low-power/reduced-motion/no-WebGL kullanıcı korunmuş tabanı (Hero-contained veya statik) görür. Sahipsiz durum yok; fixed backdrop yalnız ana sayfada mount olur (alt sayfaların kendi Living Flow'ları var, kapsam dışı — doğru). Faz 11'den devralınan SEO açıkları (canonical/`/forum`) bu faz kapsamı değildi, kayıtlı kaldı.

---

## Sonuç

- **Tamamlanma Tarihi:** 2026-07-03
- **Toplam Task:** 3 (12.01 fixed viewport katman + Hero koordinasyon · 12.02 adaptif okunabilirlik veil · 12.03 karar-gate → uygula-onayla + light-veil ince-ayar)
- **Notlar:** Karar-gate'li/imza-riskli faz **uygula** tarafıyla kapandı (üç gate geçti; DECISIONS 2026-07-03). Milestone karşılandı: nabız kapsamı kararı verildi+uygulandı, imza/reduced-motion-no-WebGL fallback/a11y kontrast=100 çift-tema/perf tabanı korundu (regresyonsuz). UAT 16/16, 8 kalite ekseni (7 ✅ + 1 ⚠️ test kapsamı boşluğu, kayıtlı). 0 düzeltme task'ı. Yeni bağımlılık/i18n anahtarı yok. Sonraki faza aktarılan: test kapsamı boşluğu (full-motion invariant tohumu) + kayıtlı SEO açıkları. v0.3 içerik fazları bitti → versiyon-sonu sabit fazları (discuss-phase 13 içerik_fazları→teknik_borç geçişini yapar).

---

**Oluşturulma:** 2026-07-02
**Son Güncelleme:** 2026-07-03 — **review-phase 12 ✅: Faz tamamlandı.** Retrospektif + 8 kalite ekseni (7 ✅ + 1 ⚠️ test kapsamı boşluğu, kayıtlı) faz dokümanına yazıldı; kullanıcı yolculuğu tutarlı, boşluk yok. Milestone karşılandı (nabız kapsamı uygulandı, imza/fallback/a11y=100 çift-tema/perf tabanı korundu). 0 düzeltme task'ı. Durum 🔄→✅. v0.3 içerik fazları bitti → sıradaki `discuss-phase 13` (versiyon-sonu teknik borç; içerik_fazları→teknik_borç geçişini damgalar). Detay → Retrospektif + Kalite Kontrol Sonuçları.
