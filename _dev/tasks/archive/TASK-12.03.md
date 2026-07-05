# TASK-12.03: Karar-gate doğrulama — kontrast=100 + desktop perf 100/CLS 0 + craft → uygula VEYA iptal-kaydet

**Durum:** ✅ Tamamlandı — **uygula-onayla** (+ light-veil craft ince-ayarı)
**Modül:** M1 (+M6 perf ölçüm) — Living Flow & Tasarım Sistemi
**Feature:** B1 — Living Flow nabız kapsamı (aşağı-taşıma) — kabul gate'i
**Faz:** Phase 12 (phases/PHASE-12.md)
**Bağımlılıklar:** TASK-12.01 ✅, TASK-12.02 ✅ (aşağı-taşıma + adaptif scrim uygulanmış olmalı)

---

## Hedef

Faz 12'nin **karar-gate**'ini ölçüp uygulamak. Aşağı-taşınan Living Flow alanı (12.01 + 12.02), fazın üç korunan-taban kriterini geçiyor mu ölçülür ve **uygula-onayla** VEYA **iptal-kaydet** kararı verilir (P2/Faz 6 emsali): (1) **a11y kontrast=100 çift-tema** (metin alan üzerinde WCAG-AA, full-motion — alan gerçekten render ederken), (2) **desktop perf 100 / CLS 0** (Lighthouse, mevcut taban `home-desktop-20260628` regresyonsuz), (3) **craft görsel inceleme** (göz yorgunluğu / şablon-kokusu / imza zayıflaması yok — craft son hakem). Üçünden **biri** geçmezse → kod geri alınır (12.01/12.02 rollback), gerekçe `docs/DECISIONS.md`'ye yazılır. Task, karar verilip **kayıt altına alındığında** (uygulama teyidi veya iptal-kaydet) tamamlanmış sayılır.

---

## Bağlam

Faz 12 milestone'u bir "uygula" garantisi değildir: "Living Flow nabız kapsamı kararı verildi ve **uygulandı VEYA iptal-kaydedildi**; her iki sonda da imza / reduced-motion-no-WebGL fallback / a11y kontrast=100 çift-tema / perf tabanı **korundu**." Bu task o kararın verildiği yerdir. Uçtan-uca senaryo UAT'ı (reduced-motion, mobil Hero-only, 5-dil, chatbot) **verify-phase 12**'nin işidir — bu task yalnız **sayısal + craft kabul gate'i**dir.

**Neden ayrı task (her build task'ında değil):** Lighthouse perf ölçümü pahalı ve ortam-hassastır (memory `perf-olcum-devcontainer-kurulumu`, `lighthouse-lantern-render-timing-korligi`, host-load disiplini); tek dedike task'ta toplanır (TD3/P1/7.01-7.02 emsali). Ayrıca iptal-kaydet kararı iki task'ın kodunu geri alabilir — bu build-zamanı kabul kararıdır, senaryo UAT'ı değil.

**Kritik ölçüm nüansı:** Mevcut a11y tohumu (`home-a11y.spec.ts`) `reducedMotion:"reduce"` koşar → o modda fixed alan **eklenmez**, yani tohum alanın kontrast etkisini **ölçmez**. Alanın gerçek kontrast etkisi **full-motion** (alan render ederken) ölçülmeli: manuel Lighthouse (Chrome, full-motion, memory'ye göre dark render eder — light+dark ayrı zorla) veya `channel:'chrome'` + swiftshader ile axe full-motion (WebGL için bundled chromium yetmez — memory).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-12.md` — "Karar-Gate Kriterleri (iptal-kaydet tetikleri)", Milestone, "Dikkat Edilecekler" (perf hipotezi, kontrast, tema)
- `_dev/ILKELER.md` — Öncelikli Eksenler #1 (Marka & Craft üst eksen), #2 (perf/a11y korunan taban, regresyon yasağı)
- `_dev/docs/perf/README.md` — perf metodolojisi + koşu tablosu + a11y kırılımı (taban kaydı buraya)
- `_dev/docs/perf/home-desktop-20260628.{html,json}` — desktop perf 100 / CLS 0 **taban artefaktı** (kıyas referansı)
- `_dev/memory/perf-olcum-devcontainer-kurulumu.md` — node/Chrome/LH kurulum + Chrome-flags (`--disable-dev-shm-usage`, `--enable-unsafe-swiftshader`; yoksa Living Flow `TARGET_CRASHED`)
- `_dev/memory/lighthouse-lantern-render-timing-korligi.md` — Lantern körlüğü + ortam anomalisi (perf/TBT ortamlar arası kıyaslanamaz; LCP/FCP/CLS deterministik) → desktop tabanını **aynı ortamda** sabitle
- `_dev/memory/a11y-olcum-tema-tuzagi.md` — Lighthouse dark render eder; light+dark ayrı; `emulateMedia` / cookie disiplini
- `_dev/memory/aria-hidden-color-contrast-muafiyeti-degil.md` — dekoratif alan kontrasttan muaf değil
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — WebGL için `channel:'chrome'` şart (full-motion axe ölçümü gerekirse)
- `docs/DECISIONS.md` — karar (uygula/iptal-kaydet) buraya yazılır (append-only)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/docs/DECISIONS.md` — B1 kararı (uygula-onayla VEYA iptal-kaydet + gerekçe + ölçüm sonuçları)
- `_dev/docs/perf/` — bu koşunun artefaktları (desktop before/after) + `README.md` koşu tablosu
- `_dev/DURUM.md` — Aktif task pointer + gate sonucu özeti
- `_dev/phases/PHASE-12.md` — Task Listesi tablosunda 12.03 durumu (+ gate sonucu not)

---

## Alt Görevler

- [ ] **1. Ortam hazırlığı + host-load kontrolü**
  - Perf araç-zinciri (node/Chrome/LH) yoksa kullanıcı onayıyla kur (memory `perf-olcum-devcontainer-kurulumu`); Chrome-flags şart (`--disable-dev-shm-usage`, `--enable-unsafe-swiftshader`)
  - Her koşudan önce `cat /proc/loadavg` — yüksek yükte koşma (memory süreç disiplini); düşük yükte çok-koşu + median
  - Ölçüm hep aynı locale (`NEXT_LOCALE=tr` cookie) ve aynı ortamda taban kıyası (perf/TBT ortamlar arası kıyaslanamaz)

- [ ] **2. Gate-1: a11y kontrast=100 çift-tema (full-motion, alan render ederken)**
  - **Alan gerçekten render ederken** ölç (reduced-motion DEĞİL — o modda alan yok): manuel Lighthouse a11y (light+dark ayrı) veya `channel:'chrome'`+swiftshader axe full-motion
  - Metin alan/nabız üzerinden geçtiği tüm Hero-altı bölümlerde WCAG-AA kontrast korunuyor mu (her iki tema)
  - Mevcut reduced-motion tohumu da yeşil kalmalı (fallback güvencesi)

- [ ] **3. Gate-2: desktop perf 100 / CLS 0 (Lighthouse, taban regresyonsuz)**
  - Desktop Lighthouse; `home-desktop-20260628` tabanıyla kıyas → **perf 100 korunuyor, CLS 0**
  - Perf hipotezi (Araştırma): canvas zaten `frameloop=always` render ettiğinden fixed'e almak artımlı GPU maliyetini ~sıfıra yaklaştırır → **doğrula**; artımlı maliyet varsa büyüklüğünü ölç
  - LCP korunuyor mu (Hero LCP-defer taşındı — 12.01); CLS deterministik metrik, ortamdan bağımsız güvenilir

- [ ] **4. Gate-3: craft görsel inceleme (son hakem)**
  - Göz yorgunluğu, şablon-kokusu, imza zayıflaması var mı; "tek bütün alan" sürekliliği beğenilen etkiyi veriyor mu (discuss beğenilen etki: aşağı kayan yeşil nabızlar)
  - Aşağı kesim/opaklık ince-ayarı (açık uç) burada nihai — düşük-riskli craft dokunuşu (imzayı güçlendiriyorsa)

- [ ] **5. Karar + kayıt**
  - Üç gate de geçti → **uygula-onayla:** kararı `DECISIONS.md`'ye yaz (ölçüm sonuçlarıyla), MODULE-MAP B1 satırı review-phase'de ✅'ye döner
  - Herhangi biri geçmedi → **iptal-kaydet:** 12.01/12.02 kodunu geri al (rollback), gerekçeyi `DECISIONS.md`'ye yaz (P2 emsali formatı), imza/taban korunmuş olarak faz kapanır
  - Her iki sonda da perf artefaktları + `perf/README.md` koşu tablosu güncellenir

---

## Etkilenen Dosyalar

```
_dev/docs/
├── DECISIONS.md              # B1 kararı (uygula/iptal-kaydet + ölçüm + gerekçe) — zaten var (append)
└── perf/
    ├── README.md             # koşu tablosu + a11y kırılımı — zaten var
    └── home-desktop-<tarih>.{html,json}   # YENİ — bu gate koşusunun artefaktları
src/components/living-flow/   # YALNIZCA iptal-kaydet ise: 12.01/12.02 rollback; VEYA craft ince-ayar
```

> **Not:** Uygula senaryosunda kod değişikliği yok/minimal (craft ince-ayar); iptal-kaydet senaryosunda 12.01/12.02 geri alınır. `package.json` dokunulmaz.

---

## Dikkat Noktaları

- **Full-motion ölçüm zorunlu (kontrast):** reduced-motion koşusu alanı gizler → alanın kontrast etkisini ölçmez. Gate-1 mutlaka alan render ederken ölçülür.
- **Lighthouse dark render eder** (memory): "light gate" sanma; light+dark **ayrı** zorla. Panel renkleri temada ters döner → kontrast öğeleri farklı.
- **Ortam anomalisi (perf mutlak kıyas):** SwiftShader/software-GL perf/TBT'yi şişirir, ortamlar arası kıyaslanamaz. Desktop perf 100 kıyası **aynı ortamda before/after** sabitlenir; CLS/LCP/FCP Lantern-deterministik → güvenilir. Nihai brief doğrulaması gerçek-cihaz/Vercel field gerektirir (bu gate lab-desktop tabanını korur).
- **Host-load:** Yüksek yükte perf skoru savrulur (memory); `loadavg` düşükken median al.
- **iptal-kaydet meşru bir sonuç:** Craft üst eksen (ILKELER #1) — imza simüle-süreklilik için riske atılmaz. Gate geçmezse geri almak **başarısızlık değil**, disiplindir (P2 emsali).
- **DECISIONS append-only:** Yeni karar eklenir, eski karar silinmez/yeniden yazılmaz.

---

## Test Kriterleri

- [ ] Gate-1: kontrast=100 çift-tema (full-motion) ölçüldü ve sonuç kaydedildi (geçti/geçmedi net)
- [ ] Gate-2: desktop perf 100 / CLS 0 taban kıyası ölçüldü ve kaydedildi (regresyon var/yok net)
- [ ] Gate-3: craft görsel inceleme yapıldı, karar gerekçesi yazıldı
- [ ] Karar verildi (**uygula-onayla** VEYA **iptal-kaydet**) ve `DECISIONS.md`'ye ölçüm sonuçlarıyla yazıldı
- [ ] Perf artefaktları `docs/perf/`'e eklendi + `README.md` koşu tablosu güncellendi
- [ ] iptal-kaydet ise: rollback sonrası `npx next build` temiz + mevcut Hero/fallback davranışı geri geldi (a11y tohumu + i18n tohumu yeşil)
- [ ] uygula ise: `home-a11y.spec.ts` + `i18n-parity.test.ts` yeşil, build temiz

---

## Karar Noktaları

- **Full-motion kontrast ölçüm aracı:** Manuel Lighthouse a11y (light+dark) mi yeterli, yoksa `channel:'chrome'` axe full-motion regresyon testi de eklenip tohuma katılsın mı (kümülatif test ilkesi) → **Öneri:** Lighthouse a11y light+dark gate için yeterli; kalıcı regresyon değeri varsa full-motion axe testi eklemek artı — ama WebGL runtime testi flaky (memory), maliyet/fayda run-task'ta tartılır.

---

## Risk ve Geri Dönüş Planı

- **Risk — gate ölçümü ortam gürültüsüyle yanlış "regres" verir:** Software-GL perf şişmesi gerçek regresyonla karışır. **Önlem:** aynı ortamda before/after, CLS/LCP-deterministik metriklere ağırlık ver, median al, loadavg düşük.
- **Rollback (iptal-kaydet):** 12.01 mount + `LivingFlow` suppress koşulu geri alınır, 12.02 scrim değişikliği geri alınır → mevcut Hero-contained davranış. `DECISIONS.md`'ye gerekçe (hangi gate, hangi ölçüm). Bu **planlı bir sonuç**, arıza değil.

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Karar (`DECISIONS.md`) + perf artefaktları kaydedildi
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md ve PHASE-12.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-03

**Durum:** ✅ Tamamlandı — karar: **uygula-onayla + light-veil craft ince-ayarı**

**Yapılanlar:**
- **Ortam:** taze devcontainer'da node 20.20.2 + Chrome 150 + LH 13.3.0 + axe-core 4.12.1 hazır (kurulum gerekmedi), loadavg ≤2.5 (düşük). Taze prod build (`rm -rf .next && next build`, temiz) → `next start -p 4173` (listening-PID teyit). TR `/` (`NEXT_LOCALE=tr`), full-motion.
- **Gate-1 (a11y kontrast full-motion çift-tema):** `channel:'chrome'`+swiftshader Playwright/axe script'i (bundled chromium WebGL vermez → memory) — alan **iki temada da live** (fixed z-0 canvas mount teyitli), **0 WCAG-AA ihlali** (light+dark). Lighthouse a11y **100** (dark, full-motion). Caveat: alan-üstü ~15 öğe axe `color-contrast` *incomplete* (WebGL pikseli okunamaz → craft görsel teyidi devreye girer). Fallback: reduced-motion axe 0 ihlal (static teyitli). → **PASS**
- **Gate-2 (desktop perf/CLS):** çok-koşu Lighthouse — perf **100** (tümü), CLS **≈3.75e-6 (≈0)**, LCP **~625ms**. Baseline `home-desktop-20260628` (100/689/0) ile **regresyonsuz**. Perf hipotezi (fixed = ~sıfır artımlı, tek context) doğrulandı; deterministik LCP/CLS baseline'la birebir → aynı-ortam before/after gerekmedi. → **PASS**
- **Gate-3 (craft son hakem):** full-motion kareler (light/dark × 5 bölüm) çekildi, artifact kontak-sayfası kullanıcıya sunuldu. Dark kusursuz; light Hero-altı başlık bantlarında bleed (restraint sınırı). Kullanıcı kararı: **uygula + light-veil ince-ayar.**
- **Craft ince-ayar (uygulandı):** `FlowVeil` sabit `color-mix(--color-canvas 56%)` → tema-flip eden `--flow-veil` token'ı (`globals.css` `:root` %70 / `html.dark` %56). `dark:` variant DEĞİL (memory `tema-fix-html-dark-token-flip`). Rebuild + re-ölçüm: light bleed görsel azaldı, dark birebir aynı, Gate-1 axe 0 ihlal + Gate-2 perf 100 tuned build üzerinde re-teyit.
- **Kayıt:** `DECISIONS.md` (B1 uygula-onayla + ölçümler), `docs/perf/home-desktop-20260703-faz12.{html,json}` + `perf/README.md` Faz 12 bölümü.

**Değişen dosyalar:** `src/app/globals.css` (`--flow-veil` token, light %70 / dark %56), `src/components/living-flow/FlowVeil.tsx` (token kullanımı) + doküman/artefakt.

**Son Yaklaşım:** Karar-gate iki hard gate (a11y, perf) temiz geçince, tek craft gerilimini (light başlık bleed'i) tema-özel CSS-only token ile çözdü; iptal yerine kontrollü uygulama.

**Sonraki Adım Detayı:** Fazdaki tüm task'lar (12.01/12.02/12.03) ✅ → sıradaki adım **`/devflow:verify-phase 12`** (uçtan-uca senaryo UAT: reduced-motion, mobil Hero-only, 5-dil, chatbot). MODULE-MAP B1 satırı review-phase'de ✅'ye döner.

**Test Kriterleri:** Tümü karşılandı — Gate-1/2/3 ölçüldü+kaydedildi, karar `DECISIONS.md`'de, perf artefaktı + README güncel, uygula tarafı için `home-a11y` reduced-motion 0 ihlal + `i18n-parity` (vitest 7/7) + build temiz.

---

**Oluşturulma:** 2026-07-03
