# TASK-6.07: Faz sonu ölçüm + kanonik artefakt + DECISIONS + guardrail

**Durum:** ✅ Tamamlandı
**Modül:** M6 (modules/M6-SEO-Deploy.md) — ölçüm/kayıt
**Feature:** P1/P2 faz-sonu doğrulama ve kayıt
**Faz:** Phase 6 (phases/PHASE-6.md)
**Bağımlılıklar:** TASK-6.05 (L3) ✅ + TASK-6.06 (P2) ✅ veya ❌ (koşullu)

---

## Hedef

Faz 6'nın tüm lever'ları (L1+L2, L3, gerekirse P2) uygulandıktan sonra **otoriter final ölçüm** yap: TR `/` mobil + masaüstü perf/LCP/CLS/a11y median, yerleşik metodolojiyle. Kanonik perf artefaktlarını (`home-{mobile,desktop}-<tarih>.{html,json}`) güncelle, guardrail regresyonlarını (a11y=100 çift-tema, CLS=0, masaüstü 99-100, i18n parite) doğrula ve faz sonucunu (brief'e ulaşıldı mı / kalan açık) `docs/DECISIONS.md` + `docs/perf/README.md`'ye **dürüstçe** kaydet. Tüm guardrail'ler yeşil + final taban kayıtlı + sonuç belgelendiğinde tamamlanır.

---

## Bağlam

Milestone (PHASE-6): mobil perf/LCP ölçülebilir iyileşir; brief hedefine ulaşılamazsa kalan açık bilinçle kaydedilir (v0.1 dürüst-kayıt deseni). Bu task fazın kapanış ölçümü + kanonik kayıt — TASK-2.03 / TASK-4.08 deseninin Faz 6 karşılığı. UAT (verify-phase 6) ve review-phase bu task sonrası gelir; bu task verify-phase'in dayanacağı otoriter sayıları üretir.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-6.md` — Milestone, guardrail'ler, tüm lever sonuçları
- `_dev/docs/perf/README.md` — metodoloji + 6.01/6.04 ara kayıtları + mevcut kanonik artefakt formatı
- `_dev/memory/a11y-olcum-tema-tuzagi.md` — çift-tema axe + locale tuzağı (a11y=100 guardrail doğrulaması)
- `_dev/ILKELER.md` §2 — korunan taban / brief hedefi ayrımı (dürüst kayıt)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + faz-sonu sonucu
- `_dev/phases/PHASE-6.md` — Task Listesi durumu + (varsa) faz sonuç özeti notu (asıl Sonuç review-phase'de)
- `_dev/docs/perf/README.md` — Faz 6 final kanonik ölçüm bölümü (TR `/` mobil + masaüstü, before/after)
- `_dev/docs/perf/` — yeni kanonik artefaktlar (YENİ)
- `_dev/docs/DECISIONS.md` — faz sonucu (brief'e ulaşıldı / kalan açık + craft tavan gerekçesi)

---

## Alt Görevler

- [x] **1. Fresh prod build + final ölçüm**
  - `rm -rf .next && npm run build` (temiz, 0 MISSING_MESSAGE) → `next start -p 4173` (listening-PID teyit, load 0.5–1.5)
  - TR `/` mobil 5 + masaüstü 3 koşu median (`NEXT_LOCALE=tr`, finalUrl `/`, element-denetimli); CLS≈0 her koşuda

- [x] **2. Guardrail regresyon doğrulaması**
  - **a11y=100 çift-tema:** `npm run test:e2e` (Playwright/axe `/` light+dark, NEXT_LOCALE=tr cookie + reducedMotion + scroll) → **2/2 geçti, 0 WCAG AA ihlal** (Faz 4 kazanımı korundu)
  - **CLS≈0** (mobil+masaüstü tüm koşular ~7.3e-6); **masaüstü perf 100** (3/3); **i18n parite** (`npm run test` vitest 6/6 + build 0 `MISSING_MESSAGE`)
  - Lever'lar içerik anahtarına dokunmadı → parite bozulmadı (teyit)

- [x] **3. Kanonik artefakt + kayıt**
  - `docs/perf/home-{mobile,desktop}-20260630-faz6.{html,json}` (yeni kanonik, Faz-4'ü korur) + attribution kanıtı `home-mobile-20260630-faz6-{baseline,l1l2only}.json`; README'ye Faz 6 / TASK-6.07 final bölümü (aynı-ortam before/after + attribution)
  - `docs/DECISIONS.md`'ye faz sonucu: brief mobil **karşılanmadı** (90/3164ms) ama ölçülebilir iyileşti; kalan açık + craft tavan gerekçesi dürüstçe (hedef düşürülmedi, craft feda edilmedi)

---

## Etkilenen Dosyalar

```
_dev/docs/perf/
├── README.md                              # Faz 6 final ölçüm bölümü — zaten var
├── home-mobile-<tarih>.{html,json}        # YENİ — kanonik mobil artefakt
└── home-desktop-<tarih>.{html,json}       # YENİ — kanonik masaüstü artefakt
_dev/docs/
└── DECISIONS.md                           # faz sonucu kaydı — zaten var
_dev/phases/
└── PHASE-6.md                             # Task Listesi + final not — zaten var
```

> Kod dosyası DEĞİŞMEZ — ölçüm/kayıt task'ı.

---

## Dikkat Noktaları

- **Node/build yoksa 🔴 Bloke** (MEMORY Ortam Notları) — node'lu ortamda koşulur.
- **Locale tuzağı:** `NEXT_LOCALE=tr` cookie; karşılaştırmada hep aynı locale (6.01/6.04 ile tutarlı).
- **a11y guardrail dark render:** kanonik Lighthouse dark ölçer; a11y=100 çift-tema teyidi için Playwright/axe iki tema (light Lighthouse'ta görünmez — memory tuzağı).
- **Dürüst kayıt (pazarlık dışı süreç):** brief'e ulaşılamadıysa sessizce düzeltme/hedef düşürme yok — açık `docs/DECISIONS.md`'ye yazılır (milestone + ILKELER §2).
- **Apples-to-apples:** before/after aynı sayfa+method; localhost ağ-iyimser (perf "yerel taban"), Vercel'de L3 font kazancı daha görünür olabilir (not).
- **Host yükü:** `cat /proc/loadavg` her koşuda.

---

## Test Kriterleri

- [x] TR `/` mobil (5) + masaüstü (3) final median ölçüldü (`NEXT_LOCALE=tr`, düşük yük 0.5–1.5)
- [x] a11y=100 çift-tema (light+dark axe 0 ihlal) — Faz 4 kazanımı regresyonsuz (e2e 2/2)
- [x] CLS≈0 (mobil+masaüstü); masaüstü perf 100; i18n parite (build 0 `MISSING_MESSAGE`, vitest 6/6)
- [x] Kanonik artefaktlar (`home-{mobile,desktop}-20260630-faz6`) yazıldı; README Faz 6 before/after + attribution bölümü
- [x] Faz sonucu (brief mobil karşılanmadı/kalan açık + L3 sürücü + 6.04 rafinajı) `docs/DECISIONS.md`'ye dürüstçe kaydedildi
- [x] Mobil perf/LCP v0.2/Faz4 tabanına (84 / 3604ms) göre **ölçülebilir iyileşti** (90 / 3164ms; milestone ✓)

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- Ortam hazır (node 20.20.2 + Chrome 150 + Playwright chromium kuruldu); fresh prod build (temiz, 0 MISSING_MESSAGE) → `next start -p 4173` (listening-PID teyit).
- **Final ölçüm (HEAD = L1+L2+L3):** TR `/` mobil 5 koşu median perf 90 / LCP 3164ms / FCP 1506 / CLS≈0 / TBT 178; masaüstü 3 koşu perf 100 / LCP 694ms. LCP elementi hero metni (mobil `<p data-hero="sub">`, masaüstü `<span data-hero="l2">`), değişmedi.
- **Aynı-ortam before/after:** `git checkout e5a4ef1 -- src` ile lever-öncesi baseline aynı ortamda build+ölçüldü → perf 84 / LCP 3604ms / TBT 261 (**Faz-4 birebir** → 6.01/6.04 SwiftShader şişkinliği o devcontainer'a özgü anomaliymiş). **Attribution:** L1+L2-only (L3 reverted) ölçüldü → LCP 3604→3755 (delta yok); L3 eklenince 3755→3164 → **iyileşmenin sürücüsü L3**. HEAD tam geri yüklendi, final rebuild.
- **Guardrail:** `npm run test:e2e` (a11y çift-tema) 2/2; `npm run test` (vitest i18n parite+smoke) 6/6; masaüstü perf 100; CLS≈0.
- Kanonik + attribution artefaktları yazıldı; perf/README, DECISIONS, PHASE-6, MEMORY (Lantern körlüğü rafinajı), DURUM güncellendi.

**Sorunlar:**
- İlk ölçüm scriptinde label/preset argüman karışması → "desktop" koşuları mobil çıktı; doğru preset'le yeniden koşuldu (mobil seti geçerli kaldı).
- 6.01/6.04'ün ağır-SwiftShader ortamı bu oturumda tekrarlanmadı (temsilî ortam) → cross-environment confound; aynı-ortam baseline ölçümüyle çözüldü (dürüst before/after).

**Kararlar:**
- docs/DECISIONS.md'ye eklendi: Evet (Faz 6 sonucu: lever'lar ölçülebilir iyileştirdi, sürücü L3, brief mobil açık, 6.04 rafinajı).

**Dosya Değişiklikleri:**
- Kod: YOK (ölçüm/kayıt task'ı; src HEAD'e geri yüklendi, working tree temiz).
- `_dev/docs/perf/home-{mobile,desktop}-20260630-faz6.{html,json}` (YENİ kanonik) + `home-mobile-20260630-faz6-{baseline,l1l2only}.json` (YENİ attribution).
- `_dev/docs/perf/README.md`, `_dev/docs/DECISIONS.md`, `_dev/phases/PHASE-6.md`, `_dev/MEMORY.md`, `_dev/memory/lighthouse-lantern-render-timing-korligi.md`, `_dev/DURUM.md`, bu task dokümanı.

**Test Sonuçları:**
- vitest: 6/6 (i18n 5-dil parite + smoke). e2e a11y: 2/2 (light+dark 0 WCAG AA). build: temiz, 0 MISSING_MESSAGE. masaüstü perf 100; CLS≈0.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- Faz 6 faz-sonu otoriter ölçüm: temsilî ortamda aynı-ortam before/after — Faz 6 lever'ları (L1+L2+L3) TR `/` mobil perf 84→90, LCP 3604→3164ms (−440ms/−12%) **ölçülebilir iyileştirdi** (milestone ✓). Masaüstü 100/694ms (bütçe içinde).
- Attribution: iyileşmenin sürücüsü **L3** (Fraunces font budama, ~113KB↓ woff2 — Lantern simüle throttled download'da görünür); L1+L2 tek başına delta yok (6.04 çekirdek bulgusu doğrulandı). Brief mobil bütçe (≥95/<2.5s) hâlâ açık (90/3164ms), kalan açık = CPU-bound WebGL (P2 iptal) — dürüstçe kaydedildi.
- Guardrail'ler regresyonsuz; kanonik + attribution artefaktları + tüm faz/karar dokümanları güncellendi.

**Öğrenilenler:**
- **Lantern network-lever rafinajı:** CPU/render-zamanlama lever'ları (L1/L2) lab'da görünmez ama **asset-boyutu/network lever'ları (L3) GÖRÜNÜR** — Lantern simüle throttled ağı modeller. 6.04'ün "tek lab-lever = WebGL iş yükü" sonucu network eksenini atlamıştı (memory'ye işlendi).
- **Ortam anomalisi:** aynı flag'lerle bile devcontainer'lar arası software-GL yükü değişir (6.01/6.04 perf 62 vs 6.07 perf 84) → perf/TBT mutlak kıyasında baseline'ı **aynı ortamda** (lever-öncesi build) sabitle; `git checkout <baseline> -- src` ile temiz in-env before/after alınabilir.

---

**Oluşturulma:** 2026-06-30
