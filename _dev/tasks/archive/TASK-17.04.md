# TASK-17.04: S3 — Mod Kombinasyonları / Living Flow Degradasyon (+ Alpfit before/after)

**Durum:** ✅ Tamamlandı
**Modül:** M1 Living Flow (+M3 Etkileşim) (modules/M1-LivingFlow-TasarimSistemi.md, M3-Etkilesim-Primitives.md)
**Feature:** S3 senaryo grubu — Living Flow degradasyon & mod kombinasyonları (doğrulama)
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.03 ✅ (lineer sıra; runtime katmanına ilk giriş)

---

## Hedef

**Gerçek tarayıcı + WebGL runtime** (`page.route` interception + **system Chrome** `channel:'chrome'`+swiftshader) ile Living Flow degradasyonunu ve mod kombinasyonlarını uçtan-uca doğrula: **ana sayfa sayfa-boyu nabız** (light/dark FOUC yok · reduced-motion tüm sayfa StaticFlow · no-WebGL static · **mobil-low → nabız desktop-only, mobilde yok** · AR-RTL×dark×reduced çakışmasız) + **v0.4 yeni yüzey: Alpfit sayfası before/after Living Flow** degradasyonlu + 320/768/1440 **taşma yok + near-zero CLS** (perf korunan taban CLS bileşeni, 17.03'ten devir). v0.4 nabza **hiç dokunmadı** → home nabzı re-teyit; **Alpfit before/after asıl yeni doğrulanacak WebGL yüzeyi**. Tamamlanma = mod matrisi runtime'da koşuldu, ayırt-edicilik sanity ile, triyajlı PHASE-17'ye kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S3 araç satırı (C: `page.route`+system Chrome, WebGL ŞART) + Dikkat Edilecekler (ölçüm disiplini tuzakları) + Sahipsiz Alan (Alpfit before/after degradasyonlu mu)
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — bundled chromium WebGL vermez → `channel:'chrome'`+`--enable-unsafe-swiftshader` şart; ayırt-edicilik sanity (full-motion+WebGL→canvas var)
- `_dev/memory/sandbox-runtime-browser-page-route.md` — `next start` denenmez (exit 144) → tek-process `page.route` diskten servis
- `_dev/memory/a11y-olcum-tema-tuzagi.md` + `runtime-harness-selector-teyidi.md` — `html.dark` + light+dark iki koşu; reduced-motion + scroll; selector kaynaktan teyit (LivingFlow canvas)
- `src/components/living-flow/` (LivingFlow degradasyon wrapper), `src/components/alpfit/AlpfitHero.tsx` (before/after Living Flow)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.04 durumu + S3 bulgu notu

---

## Alt Görevler

- [x] **1. Runtime harness kurulumu (`page.route` + system Chrome)** — `tests/_verify-s3.mjs` proje-içine yazıldı, `chromium.launch({channel:'chrome', args:['--no-sandbox','--enable-unsafe-swiftshader','--disable-dev-shm-usage']})`, `.next` prerender+static diskten `page.route` ile servis edildi; koşuldu, **silindi**. **Ayırt-edicilik sanity GEÇTİ:** WebGL2 probe `has:true` (SwiftShader "WebKit WebGL"); home `high` → **FlowBackdrop fixed canvas=1** (yanlış-static değil) → ortam geçerli, tüm sonuçlar ayırt-edici.

- [x] **2. Ana sayfa sayfa-boyu nabız — mod matrisi (v0.4 dokunmadı → re-teyit)** — light/dark: **FOUC yok** (early===final; dark early=true pre-paint); reduced-motion: canvas=0 + StaticFlow SVG=1; no-WebGL: canvas=0 + StaticFlow=1; **mobil-low: nabız desktop-only teyitli** (375px → canvasFixed=0, canvasHero=1 → pageLevel canvas yok, hero-contained korunur); AR-RTL×dark×reduced: `lang=ar`+`dir=rtl`+dark+StaticFlow=1, çakışma yok.

- [x] **3. Alpfit sayfası before/after Living Flow (v0.4 yeni yüzey)** — degradasyon **doğru**: reduced-motion/no-WebGL → StaticFlow SVG=1; mobil-low → animasyonlu hero canvas=1. **AMA `high` (masaüstü): canvas=0 + StaticFlow=0 → yalnız base-wash** (animasyonlu alan yok). Kök neden: `LivingFlow` `high` modda canvas mount etmez (page-level `FlowBackdrop`'a devreder) ama `FlowBackdrop` yalnız ana sayfada mount edilmiş — alt sayfada yok. **crew-os ile birebir aynı** (parite koşusu: crew-os high canvas=0, low canvas=1) → v0.4 regresyonu DEĞİL, yerleşik alt-sayfa deseni. → **BULGU-S3** (aşağıda triyaj).

- [x] **4. Taşma & CLS (perf korunan taban CLS bileşeni)** — 320/768/1440'ta **`overflowX=0`** her iki sayfada (home + alpfit, 6/6); **CLS=0** (near-zero) her iki sayfada (PerformanceObserver layout-shift, buffered).

- [x] **5. Triyaj & kayıt** — harness artefaktı ≠ gerçek bug ayrımı yapıldı (WebGL2 probe + sanity geçti → artefakt değil; kaynak-teyitli yapısal davranış). BULGU-S3 triyajı: kapsam-içi ama **regresyon değil / degradasyon-a11y bug değil / craft nüansı** → sahipli kayıt + kullanıcı kararına sunuldu (fix task vs prd-review). PHASE-17 S3 notuna işlendi.

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Runtime harness proje-içine geçici yazılır, koşulur, SİLİNİR (kalıcı değil). Referans tanımlayıcılar ZATEN-VAR (LivingFlow + AlpfitHero repoda). YENİ kalıcı dosya yok. -->

```
_dev/
├── tasks/TASK-17.04.md          # Oturum kaydı + mod matrisi sonuçları
├── phases/PHASE-17.md           # Task Listesi 17.04 + notu
└── DURUM.md                     # Aktif task + özet
(geçici runtime harness proje-içine yazılıp koşulduktan sonra silinir — commit'lenmez)
```

---

## Dikkat Noktaları

- **WebGL yalnız system Chrome (memory):** bundled chromium `getContext('webgl2')=null` → LivingFlow her zaman static'e düşer → "sayfa-boyu nabız" **ayırt-edilemez** (yanlış-static). `channel:'chrome'`+`--enable-unsafe-swiftshader`+`--disable-dev-shm-usage` şart. Ayırt-edicilik sanity ekle.
- **`next start` DENENMEZ (memory):** doğrudan `page.route` interception (tek-process, sandbox öldürmez); `next start`/`webServer` denenmeden başla.
- **Tema tuzağı (memory):** `html.dark` class + CSS-değişken flip → `emulateMedia({colorScheme})` **çevirmez**; tema-toggle butonu/localStorage üzerinden. Light+dark **iki koşu**.
- **Reveal tuzağı:** `reducedMotion:'reduce'` + uçtan-uca scroll (full-motion'da reveal `opacity:0` atlanır → yanlış ölçüm).
- **Selector teyidi (memory):** LivingFlow canvas / degradasyon mekanizması kaynaktan teyit; harness "FAIL" → önce **artefakt mı** diye sor (kör red yok), sonra gerçek-bug.
- **v0.4 nabza dokunmadı:** home nabzı Faz 12/14 mühürlü → S3 re-teyit; **Alpfit before/after tek gerçek yeni WebGL yüzeyi.**

---

## Test Kriterleri

- [x] Ayırt-edicilik sanity: full-motion+WebGL2 → LivingFlow gerçek canvas (yanlış-static değil) — **GEÇTİ** (probe has:true; home high FlowBackdrop fixed canvas=1)
- [x] Ana sayfa: light/dark FOUC yok; reduced-motion tüm sayfa canvas=0 (StaticFlow=1); no-WebGL static; **mobil-low nabız yok (desktop-only)** (canvasFixed=0/hero=1); AR-RTL×dark×reduced çakışmasız (`lang=ar`+`dir=rtl`+dark+static) — **GEÇTİ**
- [~] Alpfit before/after Living Flow degradasyonlu — **degradasyon doğru** (reduced/no-WebGL→StaticFlow SVG; mobil-low→canvas); **`high` (masaüstü) canvas=0/StaticFlow=0 → yalnız base-wash** (BULGU-S3; crew-os ile birebir → regresyon değil, craft nüansı, kullanıcıya sunuldu)
- [x] 320/768/1440 `overflowX=0` (iki sayfa, 6/6) + **CLS=0** (near-zero, iki sayfa) — **GEÇTİ**
- [x] Harness artefaktı ≠ gerçek bug ayrımı yapıldı (artefakt değil, yapısal); bulgular triyaj + PHASE-17'ye; kaynak kod değişmedi; geçici harness silindi

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı (S3 mod matrisi GEÇTİ; BULGU-S3 sahipli kayıt + kullanıcı kararına sunuldu — bloklayıcı bug değil)
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-17 (run-task)

**Durum:** ✅ Tamamlandı — S3 mod matrisi runtime'da koştu (`page.route`+system Chrome), degradasyon regresyonsuz; **1 kapsam-içi craft bulgusu (BULGU-S3), regresyon değil, kullanıcı kararına sunuldu.** Kaynak kod değişmedi (doğrulama fazı).

**Yapılanlar:**
- **Harness (C: `page.route`+system Chrome):** `tests/_verify-s3.mjs` proje-içine yazıldı (Chrome 149 `channel:'chrome'`+`--enable-unsafe-swiftshader`+`--disable-dev-shm-usage`+`--no-sandbox`), `.next` prerender+static diskten servis (ayrı server yok → sandbox öldürmedi, memory `page.route` ilk tercih). Taze `next build` (37/37 SSG temiz) HEAD hizası. Koşuldu, **silindi** (commit'lenmedi). loadavg 0.66.
- **Ayırt-edicilik sanity GEÇTİ:** WebGL2 probe `{has:true, renderer:"WebKit WebGL"}` (SwiftShader); home `high` → **FlowBackdrop fixed canvas=1** → ortam WebGL veriyor + hidratasyon çalışıyor → tüm `static` sonuçları gerçek degradasyon (yanlış-static değil).
- **Selector teyidi (memory):** LivingFlow canvas=FlowCanvas / StaticFlow=`svg[viewBox="0 0 1200 800"]`; page-level (FlowBackdrop `position:fixed`) vs hero-contained (LivingFlow `absolute`) ayrımı = canvas'ın `fixed` atası var mı (kaynaktan teyit, tahmin değil).

**Ana sayfa mod matrisi (v0.4 dokunmadı → re-teyit — HEPSİ GEÇTİ):**

| Mod | canvas | fixed | hero | StaticSVG | FOUC / not |
|-----|:--:|:--:|:--:|:--:|-----|
| high light (1440) | 1 | 1 | 0 | 0 | early=false=final → FOUC yok; page-level nabız ✓ |
| high dark (1440) | 1 | 1 | 0 | 0 | early=true=final → dark pre-paint, FOUC yok ✓ |
| reduced-motion | 0 | 0 | 0 | 1 | tüm sayfa StaticFlow ✓ |
| no-WebGL | 0 | 0 | 0 | 1 | StaticFlow ✓ |
| mobil-low (375) | 1 | 0 | 1 | 0 | **pageLevel yok, hero-contained korunur → nabız desktop-only ✓** |
| AR-RTL×dark×reduced (/ar) | 0 | 0 | 0 | 1 | `lang=ar`+`dir=rtl`+dark+static, çakışma yok ✓ |

**Alpfit (v0.4 yeni yüzey) + crew-os parite:**

| Sayfa/Mod | canvas | fixed | hero | StaticSVG | Sonuç |
|-----|:--:|:--:|:--:|:--:|-----|
| alpfit high (1440) | 0 | 0 | 0 | 0 | **yalnız base-wash — BULGU-S3** |
| alpfit low (375) | 1 | 0 | 1 | 0 | animasyonlu hero canvas ✓ |
| alpfit reduced | 0 | 0 | 0 | 1 | StaticFlow ✓ |
| alpfit no-WebGL | 0 | 0 | 0 | 1 | StaticFlow ✓ |
| crew-os high (1440) | 0 | 0 | 0 | 0 | alpfit high ile **birebir** → paylaşılan alt-sayfa deseni |
| crew-os low (375) | 1 | 0 | 1 | 0 | alpfit low ile birebir |

**Taşma & CLS (320/768/1440):** home + alpfit **6/6 `overflowX=0`** (yatay taşma yok); **CLS=0** her iki sayfa (PerformanceObserver layout-shift buffered, uçtan-uca scroll sonrası).

**Konsol:** tek benign 404 = `/script.js` (Umami analytics, offline harness → gerçek page-error/WebGL/hidratasyon hatası YOK; render'a etkisiz).

---

### 🔎 BULGU-S3 (kapsam-içi gözlem — regresyon DEĞİL, bloklayıcı bug DEĞİL; kullanıcı kararına sunuldu)

**Ne:** Alt-sayfa hero'ları (Alpfit `AlpfitHero` + crew-os `BunkerShowcase`) **`high` modda (masaüstü) animasyonlu Living Flow alanını render etmiyor** — canvas=0, StaticFlow=0 → yalnız `LivingFlow`'un daima-var base-wash radial-gradyanı görünür. Tam imza alan (çizgiler+nabızlar) yalnız **`low` modda (mobil)** animasyonlu, ya da reduced-motion/no-WebGL'de statik SVG olarak beliriyor. Yani masaüstü ↔ mobil ilişkisi **ters** (mobil daha canlı, masaüstü sakin).

**Kök neden (kaynak-teyitli):** `LivingFlow.tsx` `high` modda canvas mount etmez (`{mode==="low" && <FlowCanvas/>}` + `{mode==="static" && <StaticFlow/>}` — high için hiçbiri) çünkü tasarım gereği masaüstü animasyonlu alanı page-level `FlowBackdrop` sağlar. Ancak `FlowBackdrop` **yalnız ana sayfada** (`app/[locale]/page.tsx:43`) mount edilmiş; alt sayfalar (`crew-os`, `spor-salonu-yazilimi`) `LivingFlow`'u `FlowBackdrop` olmadan kullanıyor → "her modda tek WebGL context" değişmezi alt-sayfa masaüstünde **sıfır context**'e düşüyor.

**Neden regresyon değil:** crew-os ile **birebir aynı** (parite koşusu kanıtı). crew-os bu deseni FlowBackdrop refaktöründen (Faz 12, v0.2/v0.3) beri taşıyor ve Faz 14 (v0.3) S3'ü geçti. Alpfit (v0.4) aynı `LivingFlow` bileşenini miras aldı → davranış v0.4'te **oluşmadı**, mevcut mimari desenin devamı.

**Neden bloklayıcı değil:** Degradasyon/a11y/işlevsellik doğru — reduced-motion→StaticFlow ✓, no-WebGL→StaticFlow ✓, mobil→animasyonlu ✓, sayfa erişilebilir, taşma 0, CLS 0. Bu bir **craft nüansı** (masaüstü alt-sayfa hero'sunda imza alan zayıf), degradasyon hatası değil.

**Kullanıcıya not / öneri:** Craft üst eksen (ILKELER) + AlpfitHero yorumunun "signature Living Flow field preserved" iddiası açısından bu masaüstü boşluğu kullanıcının bilgisine sunuldu. Seçenek: (a) küçük fix task — alt sayfalara `FlowBackdrop` mount et (masaüstü de ana sayfa gibi animasyonlu alan gösterir); (b) prd-review'a craft kalemi olarak kaydet/kabul et. **Bu doğrulama task'ında düzeltilmedi** (kaynak kod değişmez; tasarım/craft kararı kullanıcıya ait; v0.4 regresyonu değil). Karar 17.05'e geçmeden veya prd-review'da alınabilir.

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
