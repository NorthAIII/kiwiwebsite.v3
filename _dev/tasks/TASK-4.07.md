# TASK-4.07: Final doğrulama — a11y=100 + perf/CLS regresyon yok + `docs/perf/` taban

**Durum:** ⬜ Bekliyor
**Modül:** M1/M2/M3 (a11y yüzeyleri) — ölçüm yöntemi `docs/perf/README.md`
**Feature:** A11Y1/A11Y2/A11Y3 — milestone doğrulama
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** TASK-4.02 ✅, TASK-4.03 ✅, TASK-4.04 ✅, TASK-4.05 ✅, TASK-4.06 ✅ (tüm fix'ler)

---

## Hedef

Tüm fix'ler uygulandıktan sonra otoriter final ölçümle Faz 4 milestone'unu doğrulamak: ana sayfada Lighthouse **a11y = 100** (mobil + masaüstü, light gate), 4 denetim (`color-contrast` / `definition-list` / `dlitem` / `label-content-name-mismatch`) **0 başarısız**, dark mode axe ile temiz, **perf/CLS korunan taban regresyonsuz** (masaüstü perf 100 / CLS 0; mobil perf ~87 / CLS 0 — düşmedi), marka yeşili imza + faint hiyerarşi craft-regresyonsuz. Sonuç `docs/perf/` tabanına yeni koşu olarak yazılır. Tamamlanma: a11y=100 teyitli, regresyon yok, taban güncellendi.

---

## Bağlam

Milestone #1 ("ölç + doğrula") ikinci yarısı + #2 (4 denetim 0-fail) + #3 (yeşil imza korundu) + #4 (perf/CLS taban regresyonsuz) + #5 (i18n parite). TASK-4.01 pre-fix envanteri sabitledi; bu task post-fix sonucu doğrular. Lighthouse light gate; dark axe ile teyit (K2 token her iki temayı kapsar). Eğer a11y < 100 veya bir denetim hâlâ başarısızsa → **dur, kullanıcıya bildir** (eksik fix / yeni öğe); faz review'a geçmeden kapatılmaz.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — Milestone, K6, Dikkat Edilecekler (perf/CLS regresyon, host-yükü)
- `_dev/docs/perf/README.md` — kanonik Lighthouse yöntemi + mevcut taban (regresyon karşılaştırması)
- `_dev/ILKELER.md` — §2 korunan taban (regresyon yasağı), §1 Marka & Craft

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet (faz fix'leri tamam, sıradaki verify-phase)
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.07 durumu
- `_dev/docs/perf/README.md` — yeni a11y=100 koşusu + perf/CLS regresyon karşılaştırması (koşu tablosu + a11y kırılımı); kanonik artifact `home-{mobile,desktop}-<tarih>.{html,json}`

---

## Alt Görevler

- [ ] **1. Fresh prod serve kur (kanonik disiplin)**
  - `rm -rf .next && next build` (exit 0, 0 uyarı) → `next start` net portta
  - Listening-PID = fresh process teyidi (`ss -ltnp`/`lsof`); stray next-server yanlış-negatifine dikkat
  - `cat /proc/loadavg` düşük (≤~6); yüksekse bekle (perf koşusu için kritik)

- [ ] **2. Lighthouse final ölçüm (light gate, mobil + masaüstü)**
  - Kanonik yöntem (npx lighthouse cache sürüm); TR `/` (`NEXT_LOCALE=tr` cookie)
  - Çoklu koşu median; **a11y = 100** teyit (mobil + masaüstü)
  - 4 denetim 0-başarısız doğrula
  - Perf + CLS oku → korunan tabanla karşılaştır (regresyon yok mu?)

- [ ] **3. axe — dark mode teyidi**
  - `html.dark`'ta axe çalıştır: 4 denetim temiz (özellikle `text-ink-faint` dark + cream-on-ink)

- [ ] **4. Craft gözle teyit**
  - Marka yeşili imza renk değişmedi; `text-ink-faint` faint hiyerarşisi muted korundu (her iki tema); Hero stats görünüm + animasyon birebir; "Nasıl çalışır" numaraları faint

- [ ] **5. `docs/perf/` taban güncelle**
  - Yeni koşuyu README koşu tablosuna + a11y kırılımına ekle (a11y 89→100); kanonik HTML/JSON artifact'leri kaydet
  - i18n parite teyidi: yeni anahtar eklenmedi (K4 kod-only) — 5 dil eşzamanlılığı bozulmadı

---

## Etkilenen Dosyalar

```
(kaynak kod değişmez — yalnız doğrulama + taban kaydı)
_dev/docs/perf/
├── README.md                         # a11y 89→100 koşusu + perf/CLS regresyon karşılaştırması
├── home-mobile-<tarih>.{html,json}   # YENİ (kanonik artifact)
└── home-desktop-<tarih>.{html,json}  # YENİ (kanonik artifact)
```

---

## Dikkat Noktaları

- **a11y=100 light gate; dark axe ile ayrı teyit.** İkisi de raporlanır.
- **Perf/CLS regresyon yasağı (korunan taban, ILKELER §2):** fix'ler renk/markup/aria → CLS=0, masaüstü perf 100/LCP 0.69s, mobil ~87 **düşmemeli**. Düştüyse kök-neden araştır + kullanıcıya bildir.
- **Host yükü + fresh-prod-serve** disiplini zorunlu (MEMORY Süreç Disiplinleri) — yanlış perf okuması/yanlış-negatif önlenir.
- **a11y < 100 veya denetim hâlâ başarısız → dur, kullanıcıya bildir** (eksik fix / plansız öğe); faz review'a geçmeden kapatma.
- **TR-birincil** `NEXT_LOCALE=tr` cookie (Accept-Language locale-redirect tuzağı).

---

## Test Kriterleri

- [ ] Fresh prod serve listening-PID teyit; `/proc/loadavg` düşük
- [ ] Lighthouse **a11y = 100** (mobil + masaüstü, light gate, median)
- [ ] 4 denetim (`color-contrast`/`definition-list`/`dlitem`/`label-content-name-mismatch`) **0 başarısız**
- [ ] axe dark mode: 4 denetim temiz
- [ ] Perf/CLS korunan taban regresyonsuz (masaüstü perf 100/CLS 0; mobil ~87/CLS 0)
- [ ] Craft: yeşil imza + faint hiyerarşi + Hero stats görünüm regresyonsuz (gözle, her iki tema)
- [ ] `docs/perf/` tabanı güncellendi (a11y 89→100 koşusu + artifact'ler)

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
- [doldurulacak — final ölçüm sonuçları, regresyon karşılaştırması]

---

**Oluşturulma:** 2026-06-29
