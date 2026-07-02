# Phase 11: URL taksonomisi / SEO redirect (`/bunker-os` → `/crew-os`)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.3'ün ikinci içerik fazı — URL taksonomisi hijyeni. İç kod adı "Bunker OS"un kullanıcıya sızdığı **tek** yüzeyi (`/bunker-os` route'u) public ada (`/crew-os`) taşımak: kalıcı redirect + i18n namespace rename + SEO metadata (sitemap/canonical/alternates) + iç linkler. Taksonomi kararının (DECISIONS 2026-06-27: public Crew OS / iç ad Bunker OS) son açık ucunu kapatır. İçerik/davranış/tasarım değişmez — yalnız URL ve namespace tanımlayıcıları.

**Milestone:** Public `/crew-os` yayında (5 locale SSG) **ve** `/bunker-os` → `/crew-os` kalıcı redirect çalışıyor (5 locale) **ve** i18n namespace `bunkerOs`/`bunker` → crew-tabanlı adlara 5-dil senkron rename (eksik anahtar yok, build 0 `MISSING_MESSAGE`) **ve** sitemap/canonical/alternates + iç linkler `/crew-os`'a güncel **ve** iç linkler temiz (kırık link yok); guardrail'ler regresyonsuz: a11y=100 çift-tema, perf korunan taban, CLS≈0, i18n 5-dil parite. `/forum` redirect'i **korunur** (bilinçli — kapsam dışı).

### Feature Listesi

(MODULE-MAP ve modules/ referansı; kaynak: `docs/REVIZE-BACKLOG.md` SEO satırı + taksonomi kararı DECISIONS 2026-06-27)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| SEO1: `/bunker-os` → `/crew-os` route rename + kalıcı redirect | M6 (redirect/sitemap/metadata) + M2 (route klasörü) | Route klasörü `crew-os`; `/bunker-os` (5 locale) kalıcı redirect; sitemap + canonical/alternates güncel |
| SEO2: i18n namespace `bunkerOs`/`bunker` → crew rename (5-dil) | M4 (+M2) | Yapısal namespace rename, 5 dilde eşzamanlı (eksik anahtar yasak); değerler stale kalabilir (TR tek kaynak) |
| SEO3: İç link temizliği (`/bunker-os` → `/crew-os`) | M2 (Hero/Bunker + diğer tüketiciler) | Tüm iç `/bunker-os` linkleri `/crew-os`'a; kırık link/çift-redirect yok |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 11` oturumunda dolduruldu (2026-07-02).

### Alınan Kararlar

- **Faz 11 konusu = URL taksonomisi / SEO redirect** (kullanıcı kararı). v0.3 near-term'deki iki konudan (B1 Living Flow nabız / SEO redirect) SEO seçildi — iyi tanımlı, düşük risk, Faz 10'un craft işini doğal tamamlar (`<Logo>` tek kaynak; showcase yeni yüzey getirmez). B1 (karar-gate'li, imza-riskli) ayrı faza bırakıldı.
- **`/forum` → 404 kalemi REDDEDİLDİ; mevcut redirect korunur** (kullanıcı kararı). Mevcut durum kod-teyitli: `next.config.ts` `/forum`→`/bulten` ve `/forum/:slug*`→`/bulten/:slug*` **kalıcı 301** yapıyor (çalışan, yardımcı redirect). Backlog "çıplak `/forum`→404" istiyordu ama 301 SEO açısından zaten doğru/zararsız; eski link varsa korunur, bozmak için net gerekçe yok. Bu faz `/forum`'a **dokunmaz** (bilinçli no-op — kayıt). REVIZE-BACKLOG'daki SEO satırının `/forum`→404 kısmı bu kararla kapanır.
- **Rename kapsamı = Route + i18n namespace (kod dosya adları hariç)** (kullanıcı kararı). Taksonomi (DECISIONS 2026-06-27) "Bunker OS **iç kod adıdır, kodda kalabilir**" der — kullanıcıya sızan tek yer URL. Bu yüzden:
  - **Route klasörü** `[locale]/bunker-os/` → `[locale]/crew-os/` (URL = kullanıcı-yüzeyi, değişmek **zorunda**).
  - **i18n namespace** `bunkerOs` (showcase) + `bunker` (ana sayfa teaser) → crew-tabanlı adlara rename (namespace tutarlılığı; gelecek geliştirici okur). İki namespace ayrık kalır (ana sayfa teaser ≠ showcase); kesin yeni adlar plan-phase'de netleşir.
  - **Kod dosya/dizin adları** (`Bunker.tsx`, `components/bunker-os/`, `BunkerShowcase.tsx`) → **dokunulmaz** (iç kod adı, taksonomi izin veriyor; "Tam tutarlılık/kod dahil" seçeneği elendi — saf refactor diff'i büyütür, dar-faz disiplini).
- **Tek faz** (kullanıcı kararı). `/forum` bilinçle korunduğu için gerçek iş yalnız `/crew-os` rename; ayrı faza bölmeye gerek yok.

### Kullanıcı Tercihleri

- Craft-first + kalıcılık: Faz 10 `<Logo>` dersini sürdür — showcase sayfası rename sırasında yeni bir logo/başlık yüzeyi doğarsa `<Logo>` yeniden kullanılır, kopya-koda dönülmez (PHASE-10 retrospektif önerisi).
- Minimal/cerrahi: içerik, tasarım, davranış, akış aynı kalır; yalnız URL + namespace tanımlayıcı katmanı.

### Çapraz Konular (plan/icrada uyulacak)

- **SEO doğruluğu (kritik):** Redirect **kalıcı** (Next `permanent: true` → 308) olmalı; **5 locale** için çalışmalı (`/bunker-os`, `/en/bunker-os`, `/ar/bunker-os`, `/de/...`, `/es/...` → ilgili `/crew-os`). Mevcut `/forum`→`/bulten` redirect'inin locale-prefix'lerle nasıl davrandığı research-phase'de teyit edilmeli (next-intl middleware ↔ next.config redirects etkileşimi). `sitemap.ts` PATHS dizisinde `/bunker-os` → `/crew-os`; showcase `generateMetadata` canonical/alternates güncel. **Çift-redirect yok** (iç linkler doğrudan `/crew-os`'u göstermeli, `/bunker-os` üzerinden değil). robots.ts değişmez (yalnız sitemap'e işaret ediyor).
- **i18n yapısal rename disiplini:** Namespace rename **anahtar-adı değişimidir** → "stale kopya" istisnasının **dışında** (DECISIONS 2026-06-28): 5 dilde (tr/en/ar/de/es) **eşzamanlı** rename, eksik anahtar = runtime boşluk/hata (pazarlık-dışı). **Değerler** stale kalabilir (TR tek kaynak, çeviri versiyon-sınırı) — bu faz metin çevirmez, yalnız anahtar taşır. Build'de 0 `MISSING_MESSAGE` doğrulanmalı.
- **Test/guardrail etkisi:** i18n 5-dil parite tohum testi (Vitest, anahtar-kümesi) namespace rename'i 5 dilde eşit gördüğü için yeşil kalır — ama **route path'e referans veren testler** güncellenmeli: alt-sayfa a11y spec'i (`subpages-a11y.spec.ts`) `/bunker-os`'u ziyaret ediyorsa `/crew-os`'a çevrilmeli (research-phase teyit eder). Namespace adına referans veren testler de. Guardrail: a11y=100 çift-tema (showcase sayfası), perf tabanı, CLS≈0 regresyonsuz.
- **Build/SSG:** Yeni `crew-os/` route klasörü 5 locale için `generateStaticParams` + `generateMetadata` üretmeli; `next build` temiz (route çözümü, redirect derlemesi, tip). Eski `bunker-os/` klasörü silinir (redirect config'e taşınır — fiziksel route kalmaz, yoksa redirect'le çakışır).
- **Craft/`<Logo>`:** Showcase PageHeader zaten `<Logo>` tüketiyor (Faz 10) → rename yeni logo yüzeyi getirmez; kopya-kod refleksine dönme (PHASE-10 önerisi).
- **RTL:** URL/namespace işi görsel yön içermez; AR redirect + metadata `dir` etkilenmez. Site-geneli logical-ok borcu bu fazın konusu değil.

### Kapsam Dışı

- **`/forum` → 404** — reddedildi; mevcut `/forum`→`/bulten` 301 korunur (yukarıda, bilinçli no-op).
- **Kod dosya/dizin adı rename** (`Bunker.tsx`→`Crew.tsx`, `components/bunker-os/`→`crew-os/`, `BunkerShowcase`→`CrewShowcase`) — iç kod adı, taksonomi izin veriyor; saf refactor ayrı iş olarak isteğe bağlı (bu fazda yapılmaz).
- **B1 Living Flow nabız kapsamı** — ayrı, karar-gate'li faz (imza riski).
- **İçerik/kopya/tasarım/davranış değişimi** — showcase sayfasının metni, diyagramı, akışı aynı kalır; yalnız URL + namespace tanımlayıcı katmanı.
- **Non-TR içerik tazeliği** (alt-sayfa ar/de/es stale) — versiyon-sınırı, dil stratejisi (bu faz değil).
- **Çeviri değeri güncellemesi** — namespace rename yalnız anahtar taşır; değer çevirisi versiyon-sınırına ertelenir (TR tek kaynak).
- **Site-geneli logical-ok (RTL)** — kayıtlı ayrı borç (Faz 10 kararı).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 11` oturumunda doldurulur.

### Değerlendirilen Yaklaşımlar
- [Yaklaşım 1]: [Açıklama, artılar, eksiler]
- **Seçilen:** [Hangisi ve neden]

### Kullanılacak Araçlar/Kütüphaneler
- [Araç 1]: [Versiyon, ne için]

### Dikkat Edilecekler
- [Tuzak/Risk 1]: [Nasıl kaçınılacak]

### Teknik Kararlar
- [Karar 1]: [Gerekçe]

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 11` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | _(plan-phase 11 dolduracak)_ | — | — |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 11` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 11` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 11` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / N/A | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Yerelleştirme & RTL | ✅ / ⚠️ / ❌ | ... |
| Modülerlik & Bakım | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi & Degradasyon | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / N/A | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-02 (discuss-phase 11)
**Son Güncelleme:** 2026-07-02 — discuss-phase 11: Kapsam Tartışması yazıldı. Faz 11 = URL taksonomisi/SEO (`/bunker-os`→`/crew-os` rename + redirect + namespace 5-dil + SEO metadata + iç linkler); `/forum`→404 reddedildi (redirect korunur); kod dosya adları iç-ad kalır. Sıradaki adım: research-phase 11.
