# Phase 12: v0.3 Living Flow Nabız Kapsamı (B1)

**Durum:** 🔄 Devam ediyor

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

> Bu bölüm `/devflow:verify-phase 12` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 12` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 12` oturumunda doldurulur.

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

**Oluşturulma:** 2026-07-02
**Son Güncelleme:** 2026-07-03 — run-task 12.03 ✅: karar-gate **uygula-onayla** (+ light-veil craft ince-ayarı). Üç gate: Gate-1 full-motion a11y 0 WCAG-AA ihlali çift-tema (alan live teyitli) + LH a11y 100 dark; Gate-2 desktop perf 100 / CLS ≈0 / LCP ~625ms regresyonsuz (perf hipotezi doğrulandı, tek context); Gate-3 craft (dark kusursuz; light başlık bleed'i `--flow-veil` tema-flip token'ıyla çözüldü — light %70/dark %56, `dark:` değil `html.dark` flip). Fazdaki tüm task'lar ✅ → sıradaki **verify-phase 12**. Detay → DECISIONS 2026-07-03, `docs/perf/README.md` Faz 12.
