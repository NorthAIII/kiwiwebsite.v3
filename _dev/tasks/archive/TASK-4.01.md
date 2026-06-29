# TASK-4.01: a11y otoriter re-ölçüm — başarısız-denetim envanterini sabitle

**Durum:** ✅ Tamamlandı
**Modül:** M1/M2/M3 (a11y yüzeyleri) — ölçüm yöntemi `docs/perf/README.md`
**Feature:** A11Y1/A11Y2/A11Y3 — başarısız-denetim envanteri teyidi
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** Yok (faz açılış task'ı)

---

## Hedef

Ana sayfanın **current build**'inde otoriter bir a11y re-ölçümü yaparak Faz 4 fix'lerinin hedefleyeceği **kesin başarısız-denetim envanterini** sabitlemek. `docs/perf/README.md` a11y tabanı (2026-06-28, 89) **stale** — başarısız öğeleri kaba/hesaplanmış renk olarak kaydetmiş ve bazı kalemler (örn. baseline "CTA `a.group` #8af28a") current kodda zaten çözülmüş olabilir. Bu task kod **değiştirmez**; yalnızca Lighthouse (light gate) + axe (her iki tema, mobil+masaüstü) ile gerçek başarısız 4 denetimi (color-contrast / definition-list / dlitem / label-content-name-mismatch) ve flag'lenen öğeleri saptar, araştırmadaki kontrast envanteriyle uzlaştırır. Tamamlanma: teyitli envanter task oturum kaydına yazıldı ve sonraki fix task'larının kapsamı doğrulandı.

---

## Bağlam

Milestone #1 ("ölç + doğrula") ve araştırma kararı **K6**: stale baseline → current build'de otoriter ölçümle başarısız-denetim listesi sabitlenir; sonra fixler; sonra a11y=100 doğrulanır (TASK-4.07). Lighthouse light-mode ölçer → a11y=100 **kapısı LIGHT mode**; dark mode kontrastı da düzeltilir (K2 token koyulaştırma her iki temayı kapsar) ama dark için axe ile elle teyit gerekir. Bu task fix'lerin değil **gerçeğin** task'ı: ne kadar denetim, hangi öğelerde başarısız, hangi temada.

> **Re-ölçüm bulgusu (Oturum 2026-06-29):** "Lighthouse light-mode ölçer" bağlam-varsayımı **yanlış çıktı** — kanonik koşu DARK render ediyor. Detay → Oturum Kaydı + PHASE-4 "Task 4.01 re-ölçüm teyidi".

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — "Araştırma Bulguları" → Baseline-kod drift'i, Kontrast Envanteri, K6
- `_dev/docs/perf/README.md` — kanonik Lighthouse yöntemi + "Accessibility 89" kırılımı (stale taban)
- `_dev/QUALITY.md` — §2 Erişilebilirlik kontrol noktaları

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.01 durumunu güncelle; teyitli envanter araştırma envanterinden **materyal olarak** sapıyorsa "Araştırma Bulguları"na kısa "Task 4.01 re-ölçüm teyidi" notu ekle (sapma yoksa eklenmez)

---

## Alt Görevler

- [x] **1. Fresh prod serve kur (kanonik disiplin)** — `rm -rf .next && next build` exit 0/0-uyarı/37 sayfa; `next start -p 3247`; listening-PID 437475 = fresh teyit (stray 12267 portsuz dokunulmadı); loadavg 0.6–2.0 (ölçüm), ek koşularda 5–8.
- [x] **2. Lighthouse a11y ölçümü (mobil + masaüstü)** — TR `/` NEXT_LOCALE=tr cookie; çoklu koşu; a11y=89 her preset; 4 denetim ayıklandı (aşağıda).
- [x] **3. axe denetimi — her iki tema** — Playwright + axe-core 4.11.4 (lighthouse cache), `emulateMedia` light+dark, reduced-motion (tüm reveal içeriği görünür → eksiksiz tarama). Dark-özel fail'ler ayrıca not edildi.
- [x] **4. Envanteri uzlaştır ve sabitle** — K1/K3/K4/K5 ile karşılaştırıldı; **materyal sapma bulundu → kullanıcıya getirildi → karar: light+dark kapsam genişletme** (aşağıda).

---

## Etkilenen Dosyalar

```
(kaynak kod değişmedi — yalnız ölçüm)
_dev/tasks/TASK-4.01.md   # oturum kaydı: teyitli envanter
.next/                     # geçici build (commit edilmez)
```

---

## Dikkat Noktaları

- **Kod değişmedi.** Bu task yalnız ölçüm/teşhis.
- **Lighthouse gate aslında DARK** (re-ölçüm bulgusu) — `docs/perf/README.md` post-fix güncellemesi (TASK-4.07) bu gerçeği yansıtacak; burada README değişmedi (çift-güncelleme önlendi).
- Fresh-prod-serve + listening-PID teyidi uygulandı; TR-birincil NEXT_LOCALE=tr cookie ile.

---

## Test Kriterleri

- [x] Fresh prod serve listening-PID teyit edildi; `/proc/loadavg` kaydedildi
- [x] Lighthouse a11y skoru (mobil + masaüstü) ölçüldü ve kaydedildi (pre-fix: 89/89)
- [x] 4 denetim flag'lenen öğeleriyle envantere yazıldı
- [x] axe her iki temada (light + dark) çalıştı; dark-özel başarısızlıklar ayrıca not edildi
- [x] Teyitli envanter PHASE-4 araştırma envanteriyle uzlaştırıldı; **materyal sapma kullanıcıya bildirildi** (karar alındı)

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı: teyitli envanter)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı (ölçüm) — materyal sapma bulundu, kullanıcı kararıyla fix kapsamı genişletildi.

**Disiplin / ortam:**
- Fresh prod serve: `rm -rf .next && next build` → exit 0, 0 uyarı, 37 sayfa. `next start -p 3247` (temiz port).
- Listening-PID **437475** = fresh process teyit (npm 437463 → next-server). Stray 12267 (portsuz, Phase 3'ten) DOKUNULMADI; 3001/3002 başka stray, kullanılmadı.
- loadavg: ölçüm başında 0.6–2.0; masaüstü/mobil ek koşularda 5–8'e çıktı (perf'i hafif düşürür; a11y/CLS'yi ETKİLEMEZ).
- Araç: Lighthouse 13.3.0 (npx cache `ffe2131771d88588`, README kanonik) + axe-core 4.11.4 (aynı cache, Playwright `browser_run_code_unsafe` ile enjekte). TR `/`, `NEXT_LOCALE=tr` cookie (`--extra-headers`).

**Lighthouse skorları (DEFAULT koşu = DARK render — bkz. Sapma DEV-1):**

| Preset | a11y | perf | LCP (ms) | CLS | TBT (ms) |
|--------|------|------|----------|-----|----------|
| Mobil 1 | 89 | 85 | 3757 | 0 | 219 |
| Mobil 2 | 89 | 86 | 3605 | 0 | 220 |
| Masaüstü 1 | 89 | 100 | 727 | 0 | 0 |
| Masaüstü 2 | 89 | 99 | 774 | 0 | 68 |

→ **a11y = 89** her preset/koşuda (ortam-bağımsız, baseline teyit). Perf: masaüstü ~100, mobil ~85-86 (load 8 yükselti; baseline 87 @ low-load — gürültü içinde). **CLS=0 sabit** (TASK-4.07 regresyon referansı).

**4 başarısız denetim (her iki preset, her iki tema → a11y 89):**
1. **color-contrast** — FAIL (element seti temaya göre değişir; aşağıdaki tablo)
2. **definition-list** — FAIL, 1 node: Hero `<dl data-hero="stats">` (Hero.tsx:86) — light=dark, K3 ile birebir ✓
3. **dlitem** — FAIL, 4 node: Hero `<dd>/<dt>` ×2 (Hero.tsx:100/103/128/131) — light=dark, K3 ✓
4. **label-content-name-mismatch** — FAIL, 2 node: LanguageSwitcher (Nav + Footer mount; LanguageSwitcher.tsx:63 `aria-label="Language / Dil"` ↔ görünür `tr`) — light=dark, K4 ✓

> dl / dlitem / label = ışıktan bağımsız, research K3/K4 ile **TAM uyumlu, sapma yok**.

**color-contrast — birleşik element envanteri** (axe, reduced-motion = tüm içerik görünür):

| Kod | Element | Dosya | Light | Dark | Plan kapsamı |
|-----|---------|-------|-------|------|--------------|
| C1 | HowItWorks adım no `text-green/30` ×4 | HowItWorks.tsx:84 | ❌ 1.51 (büyük 3:1) | ❌ 1.67 | **K1 (aria-hidden)** ✓ |
| C2 | Gym-panel adım no `text-pulse` ×3 (01/02/03) | SectorSolutions.tsx:131 | ✅ geçer | ❌ **1.22** | **KAPSAM DIŞI → eklendi** |
| C3 | seeLive `text-pulse` "Canlı ürünü gör" | SectorSolutions.tsx:143 | ✅ geçer | ❌ **1.22** | **KAPSAM DIŞI → eklendi** |
| C4 | Sektör etiketi `text-ink-faint` | SectorSolutions.tsx (~mb-3) | ❌ 3.11 | ✅ geçer | K2 (token) ✓ |
| C5 | Sektör note `text-ink-faint` | SectorSolutions.tsx:153 | ❌ 3.0 | ❌ 4.39 | K2 ✓ |
| C6 | Forum/Bülten kart "8/5 dk okuma" `text-ink-faint` ×2 | forum kartları | ❌ 3.11 | ✅ geçer | K2 ✓ (yeni öğe, ink-faint) |
| C7 | BulletinSubscribe note `p.mt-1 text-ink-faint` | BulletinSubscribe | ❌ 3.0 | ❌ 4.39 | K2 ✓ |
| C8 | Hero stats `<dt> text-ink-faint` ×2 | Hero.tsx:103/131 | ⚠️ incomplete (WebGL bg) | ⚠️ incomplete | K3 dt'yi kaldırır + K2 |
| C9 | Bunker panel durum `text-canvas/50` "canlı·4 akış" | Bunker.tsx:58 | ✅ geçer | ❌ **3.36** | research ✅ demişti → **K5'e eklendi** |
| C10 | Bunker panel metrik `text-canvas/45` ×4 | Bunker.tsx:85 | ❌ 4.1 | ❌ 2.83 | K5 (≥%60) ✓ |
| C11 | Footer dil etiketi+telif `text-canvas/40` ×2 | Footer.tsx:97/99 | ❌ 3.61 | ❌ 2.52 | K5 (≥%60) ✓ |
| C12 | Footer ayraç `text-canvas/30` ×2 "·" | Footer.tsx:75/79 | incomplete (shortText) | incomplete | K5 (aria-hidden) — denetimi düşürmüyor, dekoratif |

**Materyal sapmalar:**
- **DEV-1 (KRİTİK):** Kanonik Lighthouse koşusu **DARK** render ediyor — tema init (layout.tsx:76) localStorage yoksa `prefers-color-scheme: dark`'a düşer + `--headless=new` Chrome dark raporlar. v0.1 baseline'ı (`#8af28a/#f2f1e8`) DA dark'tı. → research K6 "Lighthouse light ölçer → gate LIGHT" varsayımı TERS. **Sonuç:** K1-K5 tek başına a11y=100'e ULAŞAMAZ (C2/C3 text-pulse dark'ta fail kalır; Lighthouse run-1 bunları en üstte flag'ledi). a11y skoru her iki temada da 89 (aynı 4 denetim), değişen color-contrast *öğeleri*.
- **DEV-2 (KRİTİK):** Ters-çevrilen `bg-ink` panellerde DARK-only fail, K1-K5 kapsam dışıydı: C2 (pulse adım ×3), C3 (seeLive), C9 (Bunker durum). Light'ta geçer (panel koyu), dark'ta panel krem olunca fail. text-pulse = imza nabız yeşili (craft-hassas).
- **DEV-3 (atıf düzeltmesi):** Baseline'ın "ol.space-y-5 adım no #8af28a/1.22" kalemi = SectorSolutions text-pulse (C2/C3), HowItWorks DEĞİL. Research K1 bunları HowItWorks `text-green/30`'a (C1 — ayrı/gerçek fail) yeniden atfetmiş. İkisi de gerçek, farklı öğeler — K1 hâlâ geçerli.
- **DEV-4 (genişleme, gap değil):** ink-faint fail'leri research'ten fazla (C4 sektör etiketi, C6 forum kartları) — hepsi K2 token tek-kaynağıyla kapanır. K2'nin doğruluğunu teyit.
- **DEV-5 (nüans):** Lighthouse'un kendi a11y koşusu daha AZ color-contrast node görür (alt-fold reveal opacity:0 → axe atlar). 89 sadece görünür alt-kümeyi yansıtır; tam (reduced-motion) envanter daha büyük (light 15 / dark 17 node). Token/component-bazlı fix (K1-K5) buna dayanıklı.

**Kullanıcı kararı (2026-06-29):** **a11y=100 gate = Light + Dark (kapsam genişletme).** ILKELER "light & dark" + kanonik Lighthouse zaten dark ölçüyor. Plana C2/C3 (panel pulse-yeşili) ve C9 (Bunker durum) fix'i eklenir; pulse-yeşili fix mekanizması (aria-hidden / renk / treatment) fix-task research'ünde netleşir. TASK-4.07 final doğrulama **her iki temada** a11y=100 ister.

**Son Yaklaşım:** Ölçüm tamam; envanter sabit. Fix kapsamı genişledi → plan revizyonu gerekli (C9 → TASK-4.04; C2/C3 → yeni task + craft mekanizma kararı; TASK-4.07 → çift-tema doğrulama).

**Sonraki Adım Detayı:** `/devflow:plan-phase 4` (veya `verify-plan 4`) ile kapsam revizyonu: (a) TASK-4.04'e C9 ekle, (b) C2/C3 için yeni fix task (mekanizma research'ü), (c) TASK-4.07'yi çift-tema (light+dark) doğrulamaya genişlet. Sonra `run-task` ile fix sırası. Etkilenmeyen tasklar (4.02/K1, 4.03/K2, 4.05/K3, 4.06/K4) aynen geçerli.

---

**Oluşturulma:** 2026-06-29
**Tamamlanma:** 2026-06-29
