# TASK-4.08: Final doğrulama — a11y=100 (çift-tema) + perf/CLS regresyon yok + `docs/perf/` taban

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Fresh prod serve kur (kanonik disiplin)**
  - `rm -rf .next && next build` (exit 0, 0 uyarı, 37 sayfa) → `next start` net portta
  - Listening-PID = fresh process teyidi (`ss -ltnp`/`lsof`); stray next-server yanlış-negatifine dikkat
  - `cat /proc/loadavg` düşük (≤~6); yüksekse bekle (perf koşusu için kritik)

- [ ] **2. Lighthouse final ölçüm — kanonik (dark), mobil + masaüstü**
  - Kanonik yöntem (npx lighthouse cache sürüm); TR `/` (`NEXT_LOCALE=tr` cookie)
  - Çoklu koşu median; **a11y = 100** teyit (mobil + masaüstü) — bu koşu **dark** temayı ölçer (DEV-1)
  - 4 denetim tipi 0-başarısız doğrula
  - Perf + CLS oku → korunan tabanla karşılaştır (regresyon yok mu?)

- [ ] **3. Light tema teyidi (zorlanmış)**
  - `emulateMedia({colorScheme:'light'})` + reduced-motion + scroll (tüm reveal içeriği görünür) → axe: 4 denetim **light**'ta 0-fail
  - Mümkünse light-zorlanmış Lighthouse koşusu da a11y=100 (en azından axe-light temiz)

- [ ] **4. Dark tema teyidi (axe ile ek tarama)**
  - `emulateMedia({colorScheme:'dark'})` + reduced-motion + scroll → axe: 4 denetim **dark**'ta 0-fail (özellikle `text-ink-faint` dark, cream-on-ink, pulse-ink panel öğeleri)

- [ ] **5. Craft gözle teyit (her iki tema)**
  - Marka yeşili (`text-green`) + pulse imza renk değişmedi (light); `text-pulse-ink` dark'ta okunur koyu-yeşil + `bg-pulse` canlı-nokta parlak pulse korundu
  - `text-ink-faint` faint hiyerarşisi muted korundu (her iki tema); Hero stats görünüm + animasyon birebir; "Nasıl çalışır" + gym-panel numaraları yerinde

- [ ] **6. `docs/perf/` taban güncelle**
  - Yeni koşuyu README koşu tablosuna + a11y kırılımına ekle (a11y 89→100, **light + dark**); kanonik HTML/JSON artifact'leri kaydet
  - **DEV-1 düzeltmesi:** README'deki "Lighthouse light ölçer" yanlış varsayımını düzelt (kanonik koşu dark render eder; gate çift-tema)
  - i18n parite teyidi: yeni anahtar eklenmedi (K4 kod-only, pulse-ink token-only) — 5 dil eşzamanlılığı bozulmadı

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

- **a11y=100 çift-tema gate (DEV-1):** Lighthouse kanonik koşu = dark (gate'in zor temas.); light `emulateMedia` ile ayrı zorlanır. İkisi de 100/temiz raporlanır.
- **Perf/CLS regresyon yasağı (korunan taban, ILKELER §2):** fix'ler renk/token/markup/aria → CLS=0, masaüstü perf 100/LCP 0.69s, mobil ~87 **düşmemeli**. Düştüyse kök-neden araştır + kullanıcıya bildir.
- **Host yükü + fresh-prod-serve** disiplini zorunlu (MEMORY Süreç Disiplinleri) — yanlış perf okuması/yanlış-negatif önlenir. `emulateMedia` + reduced-motion + scroll ile tam envanter (Lighthouse full-motion reveal `opacity:0` atlar — DEV-5).
- **a11y < 100 (herhangi tema) veya denetim hâlâ başarısız → dur, kullanıcıya bildir** (eksik fix / plansız öğe); faz review'a geçmeden kapatma.
- **TR-birincil** `NEXT_LOCALE=tr` cookie (Accept-Language locale-redirect tuzağı).

---

## Test Kriterleri

- [ ] Fresh prod serve listening-PID teyit; `/proc/loadavg` düşük
- [ ] Lighthouse **a11y = 100** (mobil + masaüstü, kanonik=dark koşu, median)
- [ ] Light tema (emulateMedia/axe): 4 denetim **0 başarısız**
- [ ] Dark tema (emulateMedia/axe): 4 denetim **0 başarısız** (`color-contrast`/`definition-list`/`dlitem`/`label-content-name-mismatch`)
- [ ] Perf/CLS korunan taban regresyonsuz (masaüstü perf 100/CLS 0; mobil ~87/CLS 0)
- [ ] Craft: yeşil + pulse imza + faint hiyerarşi + Hero stats görünüm regresyonsuz (gözle, her iki tema)
- [ ] `docs/perf/` tabanı güncellendi (a11y 89→100 light+dark koşusu + artifact'ler + DEV-1 README düzeltmesi)

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman güncellendi (oturum kaydı: final ölçüm sonuçları)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

**Yapılanlar:**
- [doldurulacak — final ölçüm sonuçları (light+dark), regresyon karşılaştırması]

---

**Oluşturulma:** 2026-06-29
