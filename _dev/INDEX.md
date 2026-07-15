# INDEX — Doküman Yol Haritası

**Amaç:** Hangi durumda hangi dokümanı okuyacağını bilmek

---

<!-- KURAL: INDEX iki tür kayıt tutar:
     1. İÇERİK DOKÜMANLARI (modules/, docs/, PRD içerik dosyaları, projeye özgü sabitler) → TEK TEK enumere edilir, her birinin ne içerdiği yazılır. Konumu ve içeriği öngörülemez; hangi alanda doküman olduğu yalnızca burada bilinir. Yeni içerik dokümanı oluşturulduğunda INDEX güncellenir. Sadece mevcut dokümanlar listelenir, oluşturulmamışlar yazılmaz.
     2. SIRALI/ÖNGÖRÜLEBİLİR DOKÜMANLAR (tasks/, phases/) → TEK TEK enumere EDİLMEZ. Sadece klasör konumu ve isim deseni belirtilir. Güncel liste zaten DURUM.md (aktif task, task durumu) ve PHASES.md (faz özeti)'nde tutulur — burada tekrar edilmez. -->
<!-- NOT: Tüm dokümanlar _dev/ klasöründedir. Aşağıdaki yollar _dev/ klasörüne göredir. -->

## Tüm Dokümanlar

### Temel Dokümanlar (Her Oturum Başında OKU)

0. **`/CLAUDE.md`** (repo kökünde, `_dev/` dışında) — Claude Code talimatları: oturum başlangıç protokolü, doküman disiplini, projeye özgü kurallar, commit convention. Protokol her oturumun ilk kapısıdır.
1. **OVERVIEW.md** — Proje kimliği, stack, amaç, kapsam
2. **INDEX.md** — Bu dosya (navigasyon haritası)
3. **DURUM.md** — Dashboard (aktif faz, aktif task, son ilerleme)
4. **MEMORY.md** — Proje hafızası index'i (öğrenim pointer'ları; detay `memory/<slug>.md`, lazy-load). `memory/` dosyaları tek tek burada listelenmez — güncel liste MEMORY.md index'indedir.

### Planlama Dokümanları (Planlama ve Review'da OKU)

5. **MODULE-MAP.md** — Modül ve feature haritası (özet/index)
6. **PHASES.md** — Faz durum özeti + sıradaki fazlar
7. **QUALITY.md** — Kalite eksenleri ve kontrol noktaları
8. **ILKELER.md** — Proje ilkeleri / yön (prd, prd-refine, prd-review, kickoff, discuss, research, plan'da OKU)

### Projeye Özgü Sabitler (Her Oturumda OKU)

| Doküman | İçerik |
|---------|--------|
| _(henüz yok — örn. STYLE-GUIDE.md kickoff/PRD'de oluşabilir)_ | |

### PRD Dokümanları (PRD Oturumlarında OKU)

> PRD/ oluşturuldu (`/devflow:prd` + `prd-refine`). Ham girdi/tohum: `docs/REVIZE-BACKLOG.md`.

| Doküman | İçerik |
|---------|--------|
| `PRD/VIZYON.md` | Merkezi vizyon — ne/kime/**ürün taksonomisi** (Crew OS public, Bunker OS iç ad, Alpfit ayrı ürün)/mesaj stratejisi & marka sesi/dil stratejisi/kapsam. Karar kaynağı. |
| `PRD/VERSIONS.md` | Feature→versiyon haritası (MODULE-MAP Versiyon sütununun kaynağı); v0.1 + sıradaki versiyon adayları. |
| `PRD/features/nasil-calisir-4-adim.md` | "Nasıl çalışır" 3→4 adım (Analiz·Çözüm·Otomasyon·Raporlama) — R1. |
| `PRD/features/sektorler-derinlestirme.md` | Sektörler: gym paneli tek-otomasyona; diğer 5 sektör güçlü/korunur — R2. |
| `PRD/features/crew-os-bolumu.md` | Crew OS bölümü: ana metin doğru, panel akışları bırakıldı — R3. |
| `PRD/features/kopya-revizesi.md` | Site-geneli TR ses/ton + F5 dürüstlük konvansiyonu + F6 hero ikincil CTA — R4. |
| `PRD/features/alpfit-plus.md` | **v0.4** — Alpfit (F2.8) sayfası "Alpfit Plus" zengin ürün vitrini yeniden tasarımı: bölümler + dürüstlük 4/4 gerçek + 5-dil namespace + kabul kriterleri (AP1–AP3). |
| `PRD/SESSION-NOTES.md` | PRD çalışma kanvası: anlık durum, açık sorular (Crew OS URL, Living Flow kapsamı), keşfedilmemiş alanlar. |

### Modül Dokümanları (İlgili Modül Gerektiğinde OKU)

| Doküman | Modül |
|---------|-------|
| `modules/M1-LivingFlow-TasarimSistemi.md` | WebGL imza alanı + tasarım token'ları & dark mode |
| `modules/M2-Sayfalar-Bolumler.md` | Route'lar + bölüm/showcase bileşenleri (IA & içerik) |
| `modules/M3-Etkilesim-Primitives.md` | Reveal/Magnetic/Cursor/SmoothScroll/Nav/kontroller |
| `modules/M4-i18n.md` | next-intl routing/middleware, çeviriler, RTL |
| `modules/M5-Chatbot-API.md` | `/api/chat` streaming + Chatbot UI |
| `modules/M6-SEO-Deploy.md` | Metadata, sitemap/robots, next config, Vercel |

### Faz Dokümanları (Aktif Faz OKU)

`phases/` klasöründe `PHASE-N.md` deseninde. Tek tek listelenmez — güncel faz listesi ve durumları **PHASES.md**'de, aktif faz **DURUM.md**'de. (Henüz faz dokümanı yok.)

### Task Dokümanları (Task Çalıştırırken OKU)

- **tasks/TASKS-README.md** — Task sistemi kuralları
- `tasks/TASK-X.YY.md` — Aktif task; tek tek listelenmez, güncel task **DURUM.md**'de
- `tasks/archive/` — Tamamlanmış task'lar (aynı isim deseni)
- `tasks/quick/` — Ad-hoc quick task kayıtları

### Bilgi Havuzu (İhtiyaca Göre)

| Doküman | İçerik |
|---------|--------|
| `docs/DECISIONS.md` | Önemli mimari ve tasarım kararları |
| `docs/TESTING.md` | Test convention notu: komutlar + test yerleri + 3 katman (Vitest node/jsdom + Playwright/axe) + a11y ölçüm disiplini (özet/pointer) + kümülatif beklenti + CI |
| `docs/REVIZE-BACKLOG.md` | Güçlü revize ham girdisi: kullanıcı tespitleri + bekleyen işler (PRD tohumu) |
| `docs/UMAMI-ANALYTICS.md` | Umami analytics entegrasyon spec'i (bekliyor — kod, değerler, uyarılar) |
| `docs/RELEASE-v0.2.md` | v0.2 production release runbook & checklist (hafif operasyonel oturum: temiz pencere → PR/merge → canlı duman testi → Umami +1). run-task 10'dan önce. |
| `docs/perf/` | Ana sayfa Lighthouse perf/a11y tabanları (`README.md` = metodoloji+koşu tablosu+a11y kırılımı; `home-{mobile,desktop}-<tarih>.{html,json}` kanonik artefaktlar). İlk taban: v0.1 2026-06-28 (TD3). |
| `docs/alpfit-plus-artifact.html` | **v0.4** — Alpfit Plus tasarım referansı (kullanıcı artifact'i v2, saf HTML/CSS; nihai hedef düzen). Port kaynağı; feature `PRD/features/alpfit-plus.md`. |

---

## Senaryolar — Hangi Durumda Ne Oku?

> Bu senaryolar kaba okuma rehberidir. Bir `/devflow:` komutu çalışırken **yetkili kaynak o komutun kendi "Okunacak Dosyalar" bölümüdür**; çelişki olursa komut dosyası kazanır.

### SENARYO: PRD Oturumu (prd, prd-refine, prd-review)
1. Temel dokümanlar
2. ILKELER.md — proje ilkeleri
3. `docs/REVIZE-BACKLOG.md` — ham girdi (PRD tohumu)
4. `PRD/` altındaki tüm dokümanlar (oluştuktan sonra)

### SENARYO: Task Çalıştırma
1. Temel dokümanlar
2. Projeye özgü sabitler (varsa)
3. tasks/TASKS-README.md
4. QUALITY.md — kod yazarken kalite eksenleri
5. tasks/[AKTİF-TASK].md
6. Task dokümanındaki "Referans Dokümanlar" bölümündeki dokümanlar
7. INDEX'ten göreve göre ek dokümanlar

### SENARYO: Kapsam Tartışması (Discuss Phase)
1. Temel dokümanlar
2. ILKELER.md
3. MODULE-MAP.md
4. PHASES.md — Faz Durumu tablosu, Sıradaki Fazlar
5. Fazın kapsadığı modül dokümanları (modules/)
6. `docs/REVIZE-BACKLOG.md` — ilgili tespitler

### SENARYO: Teknik Araştırma (Research Phase)
1. Temel dokümanlar
2. QUALITY.md
3. ILKELER.md
4. Aktif faz dokümanı — "Kapsam Tartışması" bölümü
5. Fazın kapsadığı modül dokümanları (modules/)

### SENARYO: Faz Planlama (Plan Phase)
1. Temel dokümanlar
2. MODULE-MAP.md
3. Aktif faz dokümanı — "Kapsam Tartışması" ve "Araştırma Bulguları"
4. Fazın kapsadığı modül dokümanları (modules/)
5. QUALITY.md
6. ILKELER.md
7. tasks/TASKS-README.md
8. `.claude/commands/devflow/templates/TASK.md`

### SENARYO: Faz Review
1. Temel dokümanlar
2. MODULE-MAP.md
3. Aktif faz dokümanı (tüm bölümler)
4. QUALITY.md
5. PHASES.md — faz durum tablosu
6. Bu fazdaki tüm task dokümanları (archive dahil)
7. Kaynak kodu inceleme

### SENARYO: Hata Düzeltme / Bilgi Sorgulama
1. Temel dokümanlar
2. İlgili modül ve docs/ dokümanları

### SENARYO: Quick Mode (Ad-hoc Task)
1. Temel dokümanlar
2. İlgili modül ve docs/ dokümanları (işe göre)
3. `tasks/quick/` — mevcut quick task kayıtları (gerekirse)

---

## Doküman Hiyerarşisi

```
kiwiwebsite.v3/
├── CLAUDE.md ⭐ (repo kökünde — Claude Code talimatları; oturum başlangıç protokolü)
│
└── _dev/
    ├── OVERVIEW.md ⭐
    ├── ILKELER.md
    ├── INDEX.md ⭐
    ├── DURUM.md ⭐
    ├── MEMORY.md ⭐
    ├── memory/               # öğrenim dosyaları (ilk öğrenimde oluşur)
    ├── MODULE-MAP.md
    ├── PHASES.md
    ├── QUALITY.md
    │
    ├── PRD/                  # VIZYON, VERSIONS, features/, SESSION-NOTES
    │
    ├── modules/
    │   ├── M1-LivingFlow-TasarimSistemi.md
    │   ├── M2-Sayfalar-Bolumler.md
    │   ├── M3-Etkilesim-Primitives.md
    │   ├── M4-i18n.md
    │   ├── M5-Chatbot-API.md
    │   └── M6-SEO-Deploy.md
    │
    ├── phases/               # (henüz boş)
    │
    ├── tasks/
    │   ├── TASKS-README.md
    │   ├── quick/
    │   └── archive/
    │
    └── docs/
        ├── DECISIONS.md
        ├── REVIZE-BACKLOG.md
        ├── UMAMI-ANALYTICS.md
        └── perf/              # Lighthouse perf/a11y tabanları (README + html/json artefaktlar)
```

---

## Hızlı Erişim

**DevFlow Dokümanları:** `_dev/`
**Kaynak Kod:** `/home/kivanc/projects/kiwiwebsite.v3/src/`
**Çalışan Uygulama:** https://kiwiailab.com

---

**Son Güncelleme:** 2026-07-16 — re-kickoff (kickoff-docs): v0.4 içerik dokümanları eklendi — `PRD/features/alpfit-plus.md` (Alpfit Plus feature) + `docs/alpfit-plus-artifact.html` (tasarım referansı).

<!-- KURAL: Bu satır her güncellemede ÜZERİNE YAZILIR. "Önceki:" prefix ile kümülatif yığma YASAK (CLAUDE.md → Doküman Disiplini). -->
<!-- KURAL: Tamamlanmış fazların task arşiv listesini INDEX'e ekleme — `ls _dev/tasks/archive/` zaten görür. INDEX yalnızca aktif klasör konumlarını gösterir; statik liste dokümanı değildir. -->
