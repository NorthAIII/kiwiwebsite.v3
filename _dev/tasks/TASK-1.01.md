# TASK-1.01: "Nasıl Çalışır" 3→4 Adım (component + 5-dil i18n restructure)

**Durum:** ⬜ Bekliyor
**Modül:** M2 (HowItWorks) + M4 (i18n) — `modules/M2-Sayfalar-Bolumler.md` (F2.3), `modules/M4-i18n.md` (F4.2)
**Feature:** R1 — Nasıl Çalışır 3→4 adım (Analiz · Çözüm · Otomasyon · Raporlama)
**Faz:** Phase 1 (`phases/PHASE-1.md`)
**Bağımlılıklar:** Yok

---

## Hedef

Ana sayfadaki "Nasıl Çalışır" bölümünü, içerikçe örtüşen **3 adımdan** (Analiz · Tespit · Otomasyon) örtüşmesiz **4 adıma** (Analiz · Çözüm · Otomasyon · Raporlama) getirmek. Bu, eski adım anahtarlarının (`listen`/`find`/`automate`) yeni semantiğe göre **yeniden adlandırılmasını** (`analyze`/`design`/`automate`/`report`), `how.title`'ın "Üç adım…" → "Dört adım…" güncellenmesini ve `HowItWorks.tsx`'in 4 adıma göre düzen + dekoratif bağlayıcı hizalamasını kapsar. Bölüm 4 adımı doğru render edip (TR'de tam metin, 5 dilde eksiksiz anahtar seti), reduced-motion fallback korunup, `next build` temiz geçtiğinde **tamamlanmış** sayılır.

---

## Bağlam

İş **atomiktir ve bölünemez**: component anahtarı *adıyla* okur (`steps.${k}` — `HowItWorks.tsx:15`). Anahtar adı değişimi 5 dilin hepsinde aynı anda yapılmazsa, dokunulmayan dilde eski anahtar kalır → **eksik anahtar → runtime boşluk/hata** (yasak). Aynı şekilde i18n ile component ayrı commit'lere bölünürse aradaki durum mutlaka kırılır (component yeni adı okur ama anahtar yok, ya da tersi). Bu yüzden 5 dosya i18n + 1 component **tek task / tek commit**te birlikte iner ("yan yana yapılması gereken bağımlı değişiklikler aynı task'te" — TASKS-README).

Versiyon-sınırı politikası gereği nihai çeviri ertelenmiştir; ama R1 bir **anahtar-adı değişimi** olduğundan 5 dil zorunludur (stale-kopya kuralı anahtar-adı değişiminde geçmez — eksik anahtar olamaz). Strateji: eşleşen adımları mevcut çevirilerden **stale-kopya** taşı, **yalnız yeni "Çözüm" (`design`) adımını** non-TR'de şimdi çevir (kaçınılmaz tek yeni çeviri). Kaynak: PHASE-1 Araştırma Bulguları (R1, "Cerrahi").

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-1.md` — Kapsam Tartışması (R1 kararları) + Araştırma Bulguları (R1 anahtar stratejisi, Teknik Kararlar, Dikkat Edilecekler)
- `_dev/PRD/features/nasil-calisir-4-adim.md` — R1 PRD kaynağı (adım adları, gerekçe)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.3 (HowItWorks kabul kriterleri, edge case)
- `_dev/modules/M4-i18n.md` — F4.2 (versiyon-sınırı çeviri stratejisi, eksik anahtar kuralı)
- `_dev/QUALITY.md` — §1 Marka & Craft (adım adı, layout), §4 Yerelleştirme & RTL (5 dil, AR)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task durumu/özeti
- `_dev/phases/PHASE-1.md` — Task Listesi tablosunda 1.01 durumunu güncelle
- `_dev/docs/DECISIONS.md` — Nihai anahtar adları kararlaştığında **özet** kayıt (yalnız adlandırma discuss/research dışında bir karara dönüşürse)

---

## Alt Görevler

- [ ] **1. TR i18n — `how` namespace'i 4 adıma getir**
  - Dosya: `messages/tr.json` (`how`, satır 34-54)
  - `how.title`: "Üç adım, çalışan tek bir sistem." → "Dört adım, çalışan tek bir sistem."
  - `how.steps` anahtarlarını yeniden adlandır + içerik haritası:
    - `analyze` (Analiz, n="01") ← eski `listen` + `find` **eritilir** (operasyonu çıkarma + sızıntı tespiti tek adımda)
    - `design` (Çözüm, n="02") ← **YENİ** (hangi iş otomasyona değer → çözümü adım adım tasarla: tetikleyici/eylem/onay/sonuç)
    - `automate` (Otomasyon, n="03") ← eski `automate`'in **ölçüm kuyruğu çıkarılmış** hali (akışı Crew OS'ta 7/24 otomasyona bağlama)
    - `report` (Raporlama, n="04") ← **YENİ anahtar**, içerik eski `automate`'in **ölçüm kuyruğu** (her akışın kazancını sayılarla görme)
  - Eski `listen`/`find` anahtarları **silinir** (soft-delete yok).
  - TR metni marka sesinde: çıktı-odaklı, sade, kendinden emin; yasak metafor yok (doktor/teşhis/reçete), zayıf/edilgen ad yok ("Dinle/Listen" yasağı). Taslak metinler bu dokümanda (aşağıda) — execution'da cilalanır.

- [ ] **2. Non-TR i18n — 4 dilde anahtar seti hizala (en/ar/de/es)**
  - Dosyalar: `messages/en.json`, `messages/ar.json`, `messages/de.json`, `messages/es.json` (`how` namespace)
  - Her dilde anahtar setini `{analyze, design, automate, report}` yap (her biri `{n, title, body}`).
  - **Stale-kopya** (eski metin, versiyon-sınırında çevrilecek):
    - `analyze` ← o dilin mevcut `listen` çevirisi
    - `automate` ← o dilin mevcut `automate` çevirisinin **ölçüm cümlesi (em-dash sonrası) çıkarılmış hali** — yalnız otomasyon cümlesi kalır (TR ile paralel; deletion-only, yeni çeviri değil)
    - `report` ← o dilin mevcut `automate` çevirisindeki ölçüm cümlesi (em-dash sonrası, zaten çevrili)
  - **Tekrar önleme (kritik):** Mevcut non-TR `automate` gövdesi tek cümlede `[otomasyon] — [ölçüm]` taşır; tam çeviri `automate`+`report`'a **bölünür** (kopyalanmaz). Aksi halde non-TR'de 03 Otomasyon ve 04 Raporlama aynı ölçüm cümlesini gösterir — R1 "örtüşmesiz adım" amacına aykırı. (TR'de Alt Görev 1 zaten kuyruğu çıkarıyor; non-TR de paralel olmalı.)
  - **Şimdi çevrilecek (kaçınılmaz tek yeni):** `design` (Çözüm) — 4 dilde de gerçek çeviri (TR taslağından).
  - `how.title`: sayı sözcüğü 4'e güncellenir (four/أربع/vier/cuatro) — gövde çevirileri stale kalır (craft: 4 kart üstünde "üç adım" başlığı tutarsızlığını önle, → Karar Noktaları).
  - Eski `listen`/`find` anahtarları 4 dilde de silinir.

- [ ] **3. Component — `HowItWorks.tsx`'i 4 adıma göre güncelle**
  - Dosya: `src/components/HowItWorks.tsx`
  - Adım dizisi (satır 15): `["listen", "find", "automate"]` → `["analyze", "design", "automate", "report"]`
  - Grid (satır 75): `sm:grid-cols-3` → 4-adım responsive (aday: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`; → Karar Noktaları)
  - Dekoratif bağlayıcı SVG path (satır 65-72): 4 düğüme göre hizala (aria-hidden ama craft üst eksen — 3 hörgüç → 4 düğüm dağılımı). reduced-motion guard (satır 24) korunur.

---

## Etkilenen Dosyalar

```
src/components/
└── HowItWorks.tsx      # adım dizisi (15) + grid (75) + connector path (65-72) — zaten var
messages/
├── tr.json             # how namespace: title + 4 adım (tam metin, tek kaynak) — zaten var
├── en.json             # how namespace: rename + stale-kopya + design çevirisi — zaten var
├── ar.json             # how namespace: aynı (RTL — logical prop'lar component'te değişmiyor) — zaten var
├── de.json             # how namespace: aynı — zaten var
└── es.json             # how namespace: aynı — zaten var
```

> Bu fazda **yeni dosya yok**. Yeni i18n **anahtarları**: `how.steps.design` + `how.steps.report` (5 dilde) — bu fazda yaratılır. `analyze`/`automate` mevcut anahtarların yeniden adlandırılmış/korunmuş hâli; `listen`/`find` silinir.

---

## Taslak TR Metin (öneri — execution'da marka sesinde cilalanır)

- **title:** "Dört adım, çalışan tek bir sistem."
- **analyze (01 · Analiz):** "Operasyonunuzun gerçekte nasıl yürüdüğünü çıkarırız — her tekrarlayan görev, mesaj ve onay — ve işin nerede sızdığını buluruz: elle tekrarlanan adımlar, kaçan takipler, araçlar arası veri taşıma."
- **design (02 · Çözüm):** "Hangi işin otomasyona değdiğine birlikte karar verir, çözümü adım adım tasarlarız — tetikleyici, eylem, onay ve sonuç netleşir."
- **automate (03 · Otomasyon):** "Tasarladığımız akışı Crew OS içinde 7/24 çalışan otomasyona bağlarız."
- **report (04 · Raporlama):** "Her akışın ne kazandırdığını sayılarla görürsünüz — kazanç varsayılmaz, ölçülür."

---

## Dikkat Noktaları

- **5-dil eksik-anahtar tuzağı (kritik):** Rename sonrası 5 dilde de `{analyze, design, automate, report}` tam olmalı; biri eksikse o dilde runtime boşluk/hata. Doğrula: 5 dosyada eski `listen`/`find` kalmadı, `design`+`report` 5 dilde de var. (Araştırma teyidi: 5 dilde `listen/find/automate` mevcut, `report` hiçbirinde yok.)
- **Anahtar kaynağı:** `listen/find/automate` **repoda-tanımlı** (`messages/{tr,en,ar,de,es}.json`; tüketim `HowItWorks.tsx:15`). `design`/`report` **bu fazda yaratılır**.
- **Craft — layout/connector (üst eksen):** Grid 3→4 sütun; bağlayıcı SVG (aria-hidden) 4 düğüme göre yeniden dağıtılır. `n` alanına "04" eklenir. Mobilde 4 sütun sığmaz → responsive kademe gerekli.
- **Çelişki yok — platform 4-adımı ayrıdır:** Crew OS showcase sayfasındaki (`/bunker-os`) platform 4-adımı (Bağla/Akış kur/Çalıştır/Ölç — `bunkerOs.how`) bu ajans-süreci 4-adımından (Analiz/Çözüm/Otomasyon/Raporlama) **bağımsızdır**; o sayfaya **dokunulmaz**.
- **Versiyon-sınırı ayrımı:** R1 = anahtar *adı* değişimi → 5 dil zorunlu. Non-TR gövdeler stale (eski metin) kalır; yalnız `design` şimdi çevrilir, başlık sayı-sözcüğü craft için güncellenir.
- **AR/RTL:** Metin değişimi; layout aynalaması component sınıflarında zaten var (physical→logical sorunu yok, grid simetrik). AR'de 4 sütun + bağlayıcı görsel olarak doğru aynalanmalı.
- **Marka sesi:** "Dinle/Listen" gibi zayıf/edilgen ad yasak (zaten Analiz kullanılıyor); lorem/dolgu yok; metafor yok.

---

## Test Kriterleri

- [ ] `next build` temiz geçer (TypeScript strict + i18n yükleme hatası yok).
- [ ] 5 dilde `how.steps` anahtar seti tam: `{analyze, design, automate, report}` × `{n, title, body}`; eski `listen`/`find` hiçbir dilde kalmadı.
- [ ] Ana sayfa (TR `/`) "Nasıl Çalışır" bölümü **4 kart** render eder: 01 Analiz · 02 Çözüm · 03 Otomasyon · 04 Raporlama; başlık "Dört adım…".
- [ ] Diğer 4 dilde (`/en`, `/ar`, `/de`, `/es`) bölüm 4 kart render eder, boş/eksik metin yok (stale kabul, eksik yasak); `design` adımı o dilde çevrilmiş görünür; **03 Otomasyon ve 04 Raporlama ölçüm cümlesini tekrar etmez** (automate bölündü, kopyalanmadı).
- [ ] Grid 4 adımı bozulmadan dizer (mobil/tablet/masaüstü); bağlayıcı SVG masaüstünde 4 düğümle hizalı.
- [ ] `prefers-reduced-motion: reduce`'da bağlayıcı animasyonu çalışmaz, içerik statik okunur kalır.
- [ ] AR'de (`/ar`) bölüm RTL'de tutarlı (4 kart, okunabilir).

---

## Karar Noktaları

- **Nihai anahtar adları:** `analyze`/`design`/`automate`/`report` (araştırma adayı). Execution başında teyit; daha iyi bir ad gerekçesi yoksa bu set kullanılır.
- **Responsive grid kademesi:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (öneri) vs `sm:grid-cols-4`. Craft + okunabilirlik için kademeli olan önerilir; bağlayıcı SVG zaten yalnız `lg:block`.
- **Non-TR başlık sayı sözcüğü:** 4'e güncellensin mi (önerilen — craft, 4 kart/"üç adım" tutarsızlığını önler) yoksa tam stale mi kalsın? Öneri: yalnız sayı sözcüğü güncellenir, gövdeler stale.

---

## Risk ve Geri Dönüş Planı

- **Risk — yarım rename ile kırık ara durum:** i18n ve component aynı commit'te inmezse o dilde runtime boşluk/hata. → 5 dosya + component **tek commit**; commit öncesi 5 dilde anahtar seti grep ile doğrulanır.
- **Risk — non-TR'de unutulan anahtar:** bir dilde `design`/`report` eklenmezse o dilde boşluk. → Build sonrası 4 non-TR locale'i preview'da gözle kontrol.
- **Rollback:** Tek commit olduğundan `git revert <commit>` ile bölüm eski 3-adım hâline döner (çalışan baz korunur).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`feat(TASK-1.01): ...`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-1.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** 🔄 Devam edecek

**Yapılanlar:**
- [doldurulacak]

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
- [doldurulacak]

---

**Oluşturulma:** 2026-06-28
