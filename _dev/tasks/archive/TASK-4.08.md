# TASK-4.08: Final doğrulama — a11y=100 (çift-tema) + perf/CLS regresyon yok + `docs/perf/` taban

**Durum:** ✅ Tamamlandı
**Modül:** M1/M2/M3 (a11y yüzeyleri) — ölçüm yöntemi `docs/perf/README.md`
**Feature:** A11Y1/A11Y2/A11Y3 — milestone doğrulama
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** TASK-4.02 ✅, TASK-4.03 ✅, TASK-4.04 ✅, TASK-4.05 ✅, TASK-4.06 ✅, TASK-4.07 ✅ (tüm fix'ler)

---

## Hedef

Tüm fix'ler uygulandıktan sonra otoriter final ölçümle Faz 4 milestone'unu doğrulamak: ana sayfada Lighthouse **a11y = 100** (mobil + masaüstü) **her iki temada** (light + dark), 4 denetim tipi (`color-contrast` / `definition-list` / `dlitem` / `label-content-name-mismatch`) **0 başarısız** (light + dark), **perf/CLS korunan taban regresyonsuz** (masaüstü perf 100 / CLS 0; mobil perf ~87 / CLS 0 — düşmedi), marka yeşili/pulse imza + faint hiyerarşi craft-regresyonsuz. Sonuç `docs/perf/` tabanına yeni koşu olarak yazılır. Tamamlanma: a11y=100 her iki temada teyitli, regresyon yok, taban güncellendi.

---

## Bağlam

Milestone #1 ("ölç + doğrula") ikinci yarısı + #2 (4 denetim 0-fail, **her iki tema**) + #3 (yeşil/pulse imza korundu) + #4 (perf/CLS taban regresyonsuz) + #5 (i18n parite). TASK-4.01 pre-fix envanteri sabitledi; bu task post-fix sonucu doğrular.

**Çift-tema gate (TASK-4.01 DEV-1 kararı):** Kanonik Lighthouse koşusu `--headless=new` ile **DARK** render eder (tema init `prefers-color-scheme: dark`'a düşer) — yani Lighthouse default a11y skoru **dark** temayı ölçer (research'in "light gate" varsayımı **ters çıktı**). Kullanıcı kararı: **a11y=100 gate = Light + Dark** (kapsam genişletme, ILKELER "light & dark"). Dolayısıyla: (a) Lighthouse kanonik (dark) koşu a11y=100 → dark teyit; (b) light tema `emulateMedia({colorScheme:'light'})` ile zorlanıp axe (ve mümkünse Lighthouse) 4 denetim 0-fail → light teyit. İki tema da raporlanır.

Eğer herhangi bir temada a11y < 100 veya bir denetim hâlâ başarısızsa → **dur, kullanıcıya bildir** (eksik fix / yeni öğe); faz review'a geçmeden kapatılmaz.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — Milestone, "Task 4.01 Re-ölçüm Teyidi" (DEV-1 dark-render, çift-tema kararı), Dikkat Edilecekler (perf/CLS regresyon, host-yükü)
- `_dev/docs/perf/README.md` — kanonik Lighthouse yöntemi + mevcut taban (regresyon karşılaştırması)
- `_dev/ILKELER.md` — §2 korunan taban (regresyon yasağı), §1 Marka & Craft
- `_dev/memory/a11y-olcum-tema-tuzagi.md` — tema tuzağı (Lighthouse dark; light+dark ayrı doğrula; emulateMedia + reduced-motion + scroll ile tam envanter)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet (faz fix'leri tamam, sıradaki verify-phase)
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.08 durumu
- `_dev/docs/perf/README.md` — yeni a11y=100 koşusu (light + dark) + perf/CLS regresyon karşılaştırması (koşu tablosu + a11y kırılımı); kanonik artifact `home-{mobile,desktop}-<tarih>.{html,json}`

---

## Alt Görevler

- [x] **1. Fresh prod serve kur (kanonik disiplin)** — `rm -rf .next && next build` exit 0, 0 uyarı, 37 sayfa → `next start -p 4173`; listening-PID **1751728** teyit (fresh); load 0.7–2.3 (≤~6). Servis edilen build fresh: CSS `--color-pulse-ink` light `#6fe36f`/dark `#1f7a3d` ✅, `--color-ink-faint` `#67695f`/`#8a8c80` ✅, Hero `<dl>`=0 ✅.

- [x] **2. Lighthouse final ölçüm — kanonik (dark), mobil + masaüstü** — TR `/` (`NEXT_LOCALE=tr` cookie). **a11y = 100** mobil (×5) + masaüstü (×3). 4 denetim: color-contrast pass(0), label-mismatch pass, definition-list/dlitem **N/A** (`<dl>` kaldırıldı). TR `/` perf: mobil median 84, masaüstü 99; CLS 0. (Perf karşılaştırması → alt görev 6, locale-eşli.)

- [x] **3. Light tema teyidi (zorlanmış)** — Playwright `emulateMedia({colorScheme:'light'})` + reducedMotion:reduce + uçtan-uca scroll; krem `rgb(247,246,241)`, TR `/`. axe: 4 denetim **0 ihlal** + **tam tarama 0 toplam ihlal** (39 pass).

- [x] **4. Dark tema teyidi (axe ile ek tarama)** — `emulateMedia({colorScheme:'dark'})` + reducedMotion + scroll; ink `rgb(19,21,16)`, TR `/`. axe: 4 denetim **0 ihlal** + **tam tarama 0 toplam ihlal** (39 pass). (text-ink-faint dark, cream-on-ink, pulse-ink panel hepsi temiz.)

- [x] **5. Craft gözle teyit (her iki tema)** — section screenshot (Hero/How/Sectors × light+dark). Light gym-panel parlak pulse `#6fe36f` + canlı-nokta; dark krem-panelde `text-pulse-ink` koyu-yeşil `#1f7a3d` okunur + `bg-pulse` parlak. text-ink-faint muted-okunur; Hero stats birebir (dl→div görünmez); 01-04 + gym 01-03 numaralar yerinde.

- [x] **6. `docs/perf/` taban güncelle** — README'ye v0.2/Faz 4 bölümü (a11y 89→100 light+dark; perf/CLS apples-to-apples regresyon tablosu; TR `/` yeni profil). Kanonik artifact `home-{mobile,desktop}-20260630.{html,json}` (TR `/`) + regresyon-repro `home-{mobile,desktop}-en-baseline-repro-20260630.json` (`/en`). **DEV-1 düzeltmesi** (dark render) + **YENİ locale düzeltmesi** (baseline `/en` ölçmüş, TR değil — artifact finalUrl ile kanıtlı) eklendi. i18n parite: yeni anahtar yok (build 37 sayfa, 0 MISSING_MESSAGE).

---

## Etkilenen Dosyalar

```
(kaynak kod değişmez — yalnız doğrulama + taban kaydı)
_dev/docs/perf/
├── README.md                         # a11y 89→100 (light+dark) koşusu + perf/CLS regresyon + DEV-1 düzeltmesi
├── home-mobile-<tarih>.{html,json}   # YENİ (kanonik artifact)
└── home-desktop-<tarih>.{html,json}  # YENİ (kanonik artifact)
```

---

## Dikkat Noktaları

- **a11y=100 çift-tema gate (DEV-1):** Lighthouse kanonik koşu = dark (gate'in zor teması); light `emulateMedia` ile ayrı zorlanır. İkisi de 100/temiz raporlanır.
- **Perf/CLS regresyon yasağı (korunan taban, ILKELER §2):** fix'ler renk/token/markup/aria → CLS=0, masaüstü perf 100/LCP 0.69s, mobil ~87 **düşmemeli**. Düştüyse kök-neden araştır + kullanıcıya bildir.
- **Host yükü + fresh-prod-serve** disiplini zorunlu (MEMORY Süreç Disiplinleri) — yanlış perf okuması/yanlış-negatif önlenir. `emulateMedia` + reduced-motion + scroll ile tam envanter (Lighthouse full-motion reveal `opacity:0` atlar — DEV-5).
- **a11y < 100 (herhangi tema) veya denetim hâlâ başarısız → dur, kullanıcıya bildir** (eksik fix / plansız öğe); faz review'a geçmeden kapatma.
- **TR-birincil** `NEXT_LOCALE=tr` cookie (Accept-Language locale-redirect tuzağı).

---

## Test Kriterleri

- [x] Fresh prod serve listening-PID teyit (1751728); `/proc/loadavg` düşük (0.7–2.3)
- [x] Lighthouse **a11y = 100** (mobil ×5 + masaüstü ×3, kanonik=dark koşu, median)
- [x] Light tema (emulateMedia/axe): 4 denetim **0 başarısız** (+ tam tarama 0 toplam)
- [x] Dark tema (emulateMedia/axe): 4 denetim **0 başarısız** (`color-contrast`/`definition-list`/`dlitem`/`label-content-name-mismatch`) (+ tam tarama 0 toplam)
- [x] Perf/CLS korunan taban regresyonsuz — **apples-to-apples `/en`** (baseline ile aynı sayfa): mobil perf 87=87, LCP 3156=3156ms birebir; masaüstü perf 100=100; CLS 0 her yerde
- [x] Craft: yeşil + pulse imza + faint hiyerarşi + Hero stats görünüm regresyonsuz (gözle, her iki tema)
- [x] `docs/perf/` tabanı güncellendi (a11y 89→100 light+dark koşusu + artifact'ler + DEV-1 + locale README düzeltmeleri)

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı: final ölçüm sonuçları)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅ Tamamlandı — Faz 4 milestone **doğrulandı**: a11y=100 (çift-tema), perf/CLS regresyonsuz, taban güncellendi. Kaynak kod değişmedi (yalnız ölçüm + `docs/perf/` kaydı).

**Yapılanlar:**
- **Fresh-prod-serve:** `rm -rf .next && next build` (37 sayfa, 0 uyarı) → `next start -p 4173`, listening-PID 1751728 teyit (stray 9077'ye dokunulmadı), load 0.7–2.3. Servis edilen build fresh (pulse-ink + ink-faint token'ları + Hero dl=0 disk-CSS ground-truth).
- **a11y=100 (çift-tema):** Lighthouse kanonik (dark) TR `/` → mobil a11y 100 (×5), masaüstü 100 (×3); 4 denetim color-contrast pass(0) / label-mismatch pass / definition-list+dlitem **N/A** (K3 `<dl>` kaldırıldı → notApplicable). axe (Playwright emulateMedia + reducedMotion:reduce + uçtan-uca scroll), TR `/`: **light** (krem) 4-denetim 0 + tam tarama **0 toplam** (39 pass); **dark** (ink) 4-denetim 0 + tam tarama **0 toplam** (39 pass).
- **Perf/CLS regresyon — KÖK-NEDEN bulundu:** TR `/` perf mobil 84/masaüstü 99 (taban "87/100"den düşük göründü). Araştırma: aynı build baseline-birebir komutla (cookie'siz → Accept-Language `/`→`/en`) ölçülünce **birebir baseline**: mobil perf 87 / LCP 3156ms / FCP 1056ms / CLS 0; masaüstü perf 100 / LCP 645ms / CLS 0. **v0.1 baseline aslında `/en` ölçmüş** (artifact finalUrl=`/en` ile kanıtlı), README "TR `/`" diye yanlış etiketlemiş. TR `/` `/en`'den ağır (hero metni) → 84/99 yeni TR profili, **regresyon değil**. Lantern simülasyonu deterministik → aynı sayfa birebir = Faz 4 (CSS renk/markup/aria) **sıfır perf maliyeti**.
- **Craft (gözle, light+dark):** section screenshot'lar — light gym-panel parlak pulse `#6fe36f` + canlı-nokta; dark krem-panelde `text-pulse-ink` koyu-yeşil `#1f7a3d` okunur + `bg-pulse` parlak. Hero stats birebir (dl→div görünmez); ink-faint muted-okunur; 01-04 + gym 01-03 numaralar yerinde.
- **Taban + i18n:** `docs/perf/README.md` v0.2/Faz 4 bölümü (a11y kırılımı + apples-to-apples regresyon tablosu + TR `/` profili) + DEV-1 (dark) ve YENİ locale (baseline `/en`) düzeltmeleri + Metodoloji güncellendi. Kanonik artifact `home-{mobile,desktop}-20260630.{html,json}` (TR `/`) + repro `home-{mobile,desktop}-en-baseline-repro-20260630.json` (`/en`). i18n parite: yeni anahtar yok (build 0 MISSING_MESSAGE).
- **Sonuç:** Faz 4'ün 8 task'ı tamam; sıradaki adım `verify` (UAT). a11y<100 / denetim-fail durumu **yok** — dur-koşulu tetiklenmedi.

---

**Oluşturulma:** 2026-06-29
**Son Güncelleme:** 2026-06-30 — TASK-4.08 ✅: final çift-tema a11y=100 doğrulandı; perf/CLS regresyonsuz (apples-to-apples /en birebir baseline); baseline /en-mislabel düzeltildi; taban + artifact'ler kaydedildi.
