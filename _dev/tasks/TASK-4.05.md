# TASK-4.05: Hero `<dl>` → semantik link markup (definition-list + dlitem — A11Y2)

**Durum:** ⬜ Bekliyor
**Modül:** M2 (Sayfalar & Bölümler) — F2.2 Hero
**Feature:** A11Y2 (hero `<dl>`/`dlitem` geçersiz markup)
**Faz:** Phase 4 (phases/PHASE-4.md)
**Bağımlılıklar:** TASK-4.01 ✅ (teyitli envanter)

---

## Hedef

Hero istatistik şeridinin geçersiz tanım-listesi (`<dl>`) markup'ını semantik olarak doğru, **görünümü birebir koruyan** markup'la değiştirmek. Mevcut `<dl data-hero="stats">` doğrudan `<Link>`/`<a>` sarıyor ve `<dd>` `<dt>`'den önce geliyor → `definition-list` + `dlitem` denetimleri başarısız. Öğeler aslında etiketli **linklerdir** (Alpfit → "Canlı ürün", Crew OS → "Platform"), tanım listesi değil. `<dl>`→`<div>`, `<dt>`/`<dd>`→`<span>` (aynı flex/spacing class'larıyla). Tamamlanma: dl/dt/dd kaldırıldı, build temiz, axe `definition-list` + `dlitem` **tamamen** kapandı, Hero stats şeridi görünüm + hover + giriş animasyonu (`data-hero="stats"`) birebir aynı.

---

## Bağlam

Araştırma kararı **K3**. Mevcut yapı (`Hero.tsx:86-136`): `<dl data-hero="stats" className="...flex...">` içinde 2 `<Link>` (her biri `<span>` içinde `<dd>` değer + `<dt>` etiket). Sorunlar: (1) `<dl>` doğrudan grup-olmayan içerik (`<Link>`) sarıyor → `dlitem`/`definition-list` ihlali; (2) `<dd>` `<dt>`'den önce. Niyet "istatistik=tanım" tartışmalı; bunlar **etiketli linkler**. Reddedilen alternatif: geçerli `<dl>` (div-grupla + dt-önce-dd) → karmaşık, niyet zorlama. Seçilen: dl semantiğini tümden kaldır.

`data-hero="stats"` attribute'u GSAP giriş animasyonunda kullanılıyor (`Hero.tsx:25` `.to("[data-hero='stats']"...)`) → **`<div>`'e taşınmalı** (animasyon kırılmasın). İki span (`<dd>` değer, `<dt>` etiket) → `<span>`'lara çevrilir; `text-ink-faint` class'ı etikette kalır (TASK-4.03 token'ı oradan da yararlanır).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-4.md` — "Değerlendirilen Yaklaşımlar" A11Y2 + K3
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.2 Hero (istatistik şeridi öğeleri zaten `<Link>`)
- `_dev/QUALITY.md` — §2 Erişilebilirlik (semantik HTML), §1 Marka & Craft

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — aktif task pointer + özet
- `_dev/phases/PHASE-4.md` — Task Listesi tablosunda 4.05 durumu

---

## Alt Görevler

- [ ] **1. `<dl>` → `<div>` (data-hero korunur)**
  - `src/components/Hero.tsx:86-89` — `<dl data-hero="stats" className="mt-16 flex ...">` → `<div data-hero="stats" className="...">` (aynı class'lar)

- [ ] **2. `<dd>`/`<dt>` → `<span>` (iki Link içinde, 2 öğe)**
  - `Hero.tsx:100-105` (Alpfit linki) ve `:128-133` (Crew OS linki):
    - değer `<dd className="text-sm font-medium text-ink ...">` → `<span className="block ...">` (blok davranışı için `block` ekle — `<dd>`/`<dt>` blok'tu)
    - etiket `<dt className="text-xs uppercase ... text-ink-faint">` → `<span className="block ...">`
  - Sarmalayan `<span className="leading-tight">` (satır 99,127) zaten var → blok yığını orada; iç span'lara `block` eklenir
  - `</dl>` (satır 136) → `</div>`

- [ ] **3. Doğrula (build + axe + görsel + animasyon)**
  - `next build` temiz
  - axe ana sayfa (light + dark): `definition-list` + `dlitem` denetimi **0 başarısız** (öğe kalmadı)
  - Gözle: Hero stats şeridi görünüm (değer üstte koyu, etiket altta faint), spacing, hover (değer→green), GSAP giriş animasyonu birebir aynı
  - İki link hedefi çalışıyor (`/spor-salonu-yazilimi`, `/bunker-os`)

---

## Etkilenen Dosyalar

```
src/components/
└── Hero.tsx   # <dl>→<div> (data-hero korunur); <dd>/<dt>→<span class="block"> ×2; </dl>→</div>
```

---

## Dikkat Noktaları

- **Görünüm birebir** (craft üst eksen): aynı flex/gap/spacing class'ları; `<dd>`/`<dt>` blok'tu → span'lara `block` ekle ki dikey yığın korunsun.
- **`data-hero="stats"` mutlaka `<div>`'e taşınır** — GSAP giriş timeline'ı bu selector'ı kullanıyor (`Hero.tsx:25`); kaybolursa stats şeridi animasyonsuz/görünmez kalır.
- **`text-ink-faint` class etikette kalır** — TASK-4.03 token koyulaştırması oraya da uygulanır (çakışma yok, sıra önemsiz).
- **Perf/CLS regresyon yok:** markup-swap birebir aynı kutu (class/spacing korunur) → CLS=0.
- **RTL (AR):** flex + logical gap korunur; markup değişimi RTL'i bozmaz. AR'de stats şeridi `dir=rtl` doğru aynalanmalı (gözle/Faz 3 deseni).
- i18n etkisi yok (anahtarlar `stats.liveProduct/liveLabel/crewOs/crewOsLabel` aynen `t()` ile kullanılır).

---

## Test Kriterleri

- [ ] `next build` temiz geçer
- [ ] axe ana sayfa (light + dark): `definition-list` **0 başarısız**
- [ ] axe ana sayfa (light + dark): `dlitem` **0 başarısız**
- [ ] Gözle: Hero stats görünüm + spacing + hover + GSAP giriş animasyonu birebir aynı
- [ ] İki link doğru sayfalara gidiyor; AR'de `dir=rtl` doğru aynalanıyor

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-06-29
