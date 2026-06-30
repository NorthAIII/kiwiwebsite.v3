# TASK-6.07: Faz sonu ölçüm + kanonik artefakt + DECISIONS + guardrail

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Fresh prod build + final ölçüm**
  - `rm -rf .next && npm run build && npm run start -- -p 4173`; listening-PID + `cat /proc/loadavg`
  - TR `/` mobil + masaüstü median (3+ koşu, `NEXT_LOCALE=tr` cookie, element-denetimli); CLS=0 teyit

- [ ] **2. Guardrail regresyon doğrulaması**
  - **a11y=100 çift-tema:** Playwright/axe `/` light + dark (`emulateMedia colorScheme` + `reducedMotion:'reduce'` + scroll) → 0 ihlal (Faz 4 kazanımı korundu mu). CI a11y job da yakalar.
  - **CLS=0** (mobil+masaüstü); **masaüstü perf 99-100**; **i18n parite** (build 0 `MISSING_MESSAGE`, 5 dil anahtar paritesi — tohum testi)
  - Lever'lar içerik anahtarına dokunmadı → parite bozulmamalı (teyit)

- [ ] **3. Kanonik artefakt + kayıt**
  - `docs/perf/home-{mobile,desktop}-<tarih>.{html,json}` güncelle (yeni kanonik); README'ye Faz 6 final bölümü (v0.1/Faz4 → Faz6 before/after delta)
  - `docs/DECISIONS.md`'ye faz sonucu: brief karşılandı mı; karşılanmadıysa kalan açık + craft tavan gerekçesi (dürüst kayıt — ne hedef düşürüldü ne craft feda edildi)

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

- [ ] TR `/` mobil + masaüstü final median ölçüldü (`NEXT_LOCALE=tr`, 3+ koşu, düşük yük)
- [ ] a11y=100 çift-tema (light+dark axe 0 ihlal) — Faz 4 kazanımı regresyonsuz
- [ ] CLS=0 (mobil+masaüstü); masaüstü perf 99-100; i18n parite (0 `MISSING_MESSAGE`, 5 dil)
- [ ] Kanonik artefaktlar (`home-{mobile,desktop}-<tarih>`) güncellendi; README Faz 6 before/after bölümü yazıldı
- [ ] Faz sonucu (brief karşılandı/kalan açık) `docs/DECISIONS.md`'ye dürüstçe kaydedildi
- [ ] Mobil perf/LCP v0.2/Faz4 tabanına (84 / ~3.6s) göre **ölçülebilir iyileşti** (milestone)

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️/🔴]

**Yapılanlar:**
-

**Sorunlar:**
-

**Kararlar:**
- docs/DECISIONS.md'ye eklendi: [Evet/Hayır]

**Dosya Değişiklikleri:**
-

**Test Sonuçları:**
-

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
-

**Öğrenilenler:**
-

---

**Oluşturulma:** 2026-06-30
