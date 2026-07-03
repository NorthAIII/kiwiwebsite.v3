# Phase 13: v0.3 Versiyon-Sonu Teknik Borç — SEO-Metadata Hijyeni

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-13-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.3'ün versiyon-sonu **teknik borç kapatma fazı**. v0.3 içerik fazlarının (10/11/12) retrospektiflerinde biriken teknik borçlardan, birbirini tamamlayan iki **SEO/redirect hijyeni** kalemini kapatır: (TB-1) tüm alt sayfaların `layout.tsx`'ten miras aldığı yanlış `canonical="/"` — her alt sayfayı kendine canonicalize et + 5-locale hreflang alternates ekle; (TB-2) `/forum` locale-prefix gap'i (`/en/forum`→404) düzelt + next.config'teki **tüm** redirect'leri aynı sessiz locale-gap için denetle. Saf metadata/redirect katmanı — içerik/tasarım/davranış/DOM değişmez.

**Milestone:** Her alt sayfa (Crew OS showcase, Alpfit, vaka çalışmaları, bülten + makaleler) kendi path'ine canonical + 5-locale hreflang alternates deklare ediyor (artık `/`'a canonicalize olmuyor) **ve** ana sayfa `/` self-canonical kalıyor **ve** `/forum` + tüm config redirect'leri 5 locale'de (çıplak + prefixli) kalıcı 308 çalışıyor (sessiz 404 gap yok) **ve** hafif regresyon tohumu (canonical/alternates + redirect locale-kapsamı assertion; WebGL-flaky değil) yeşil; guardrail'ler regresyonsuz: a11y=100 çift-tema, perf korunan taban, CLS≈0, i18n 5-dil parite, 0 `MISSING_MESSAGE`.

### Feature Listesi

(MODULE-MAP ve modules/ referansı; kaynak: Faz 11 + Faz 12 retrospektif kayıtlı açıkları)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| TB-1: Alt-sayfa self-canonical + 5-locale hreflang alternates | M6 (metadata) + M2 (route sayfaları) | Her alt sayfa layout-miras `canonical="/"` yerine kendi path'ine canonical + 5-dil hreflang alternates; ana sayfa self-canonical korunur |
| TB-2: `/forum` locale-prefix gap + config redirect denetimi | M6 (next.config redirects) | `/en/forum` vb. 404 → çıplak+prefixli iki-giriş deseni; **tüm** config redirect'leri aynı gap için taranır (kök çözüm) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 13` oturumunda dolduruldu (2026-07-03). Versiyon-sonu tespiti: v0.3 içerik fazları (10/11/12) ✅ + Aktif Faz/Adım dolu → Versiyon Sonu Durumu `içerik_fazları`→`teknik_borç` damgalandı; bu, v0.3'ün teknik borç kapatma fazıdır.

### Alınan Kararlar

- **Faz 13 = versiyon-sonu teknik borç kapatma fazı** (Adım 0 tespiti). v0.3'ün üç içerik fazının retrospektifleri + DURUM/MODULE-MAP kayıtlı sahipli açıkları sistematik tarandı; kullanıcı "liste tam" onayı verdi.
- **Faz kapsamı = SEO-metadata hijyeni: TB-1 (canonical) + TB-2 (`/forum` locale gap)** (kullanıcı kararı). İkisi de Faz 11 kaynaklı, ucuz, iyi-anlaşılmış redirect/metadata işi; doğal bir tek paket ("SEO-hijyen çifti"). Dar-faz disiplini korunur (2-3 küçük task beklenir).
- **TB-1 kapsamı = self-canonical + 5-locale hreflang alternates** (kullanıcı kararı, kalıcılık ilkesi). Yalnız canonical'ı düzeltip alternates'i `/`'da bırakmak SEO'yu yarım bırakırdı; tam/doğru çözüm seçildi. Her alt sayfa kendi path'ine canonical + 5-dil hreflang; ana sayfa `/` self-canonical korunur.
- **TB-2 kapsamı = `/forum` gap düzelt + tüm config redirect'lerini denetle** (kullanıcı kararı, kök çözüm). Yalnız bilinen `/forum` gap'ini kapatmak yerine next.config'teki her redirect locale-prefix gap için taranır — aynı sessiz 404 başka redirect'te de olabilir. İki-giriş deseni (çıplak + `/:locale(en|ar|de|es)/…`) memory'de hazır (`next-config-redirect-locale-prefix`).
- **Hafif regresyon tohumu eklenir** (kullanıcı kararı, kümülatif test ilkesi). canonical/alternates + redirect locale-kapsamı için küçük assertion testi. **WebGL içermez** → Faz 12'de ertelenen full-motion tohumunun flakiness riski yok; gelecekte sessiz SEO regresyonunu yakalar.

### Kullanıcı Tercihleri

- Minimal/cerrahi: içerik/tasarım/davranış/DOM aynı kalır; yalnız metadata + redirect config katmanı (Faz 11 çizgisi).
- Kalıcılık > pansuman: canonical yarım değil tam (alternates dahil); redirect denetimi noktasal değil kök (tüm config).
- Kümülatif test: bu fazın ürettiği güvence bir sonraki regresyonu yakalasın (hafif, flaky-olmayan tohum).

### Çapraz Konular (plan/icrada uyulacak)

- **SEO doğruluğu (kritik):** canonical **mutlak/doğru path**; hreflang alternates **5 locale** (tr/en/ar/de/es) + doğru dil kodları (AR = `ar`); next-intl `as-needed` prefix ile locale URL'leri tutarlı (TR prefixsiz). Redirect **kalıcı 308** (`permanent: true`); **çift-redirect yok**. `sitemap.ts`/`robots.ts` ile canonical tutarlılığı gözden geçirilir.
- **Config redirect locale-prefix tuzağı (AMPİRİK, memory):** `source` literal eşleşir → locale prefix otomatik kapsanmaz; her redirect **iki giriş** ister (çıplak + `/:locale(en|ar|de|es)/…`). `/bunker-os` Faz 11'de düzeltildi; `/forum` hâlâ açık — ama denetim **tüm** redirect'leri kapsar (kök çözüm). Referans: `_dev/memory/next-config-redirect-locale-prefix.md`.
- **Kopya-kod refleksine dikkat (modülerlik, Faz 10 `<Logo>` dersi):** canonical/alternates metadata'sı her sayfaya elle kopyalanırsa drift doğar → ortak yardımcı (path→metadata helper) veya layout-seviyesi dinamik canonical değerlendirilir (mekanizma research/plan işi; ilke: tek kaynak, kopya-kod değil).
- **i18n:** Yeni i18n **anahtarı yok** (metadata/redirect işi) → 5-dil parite riski yok; ama hreflang alternates locale kodları doğru olmalı. Değer çevirisi bu fazın konusu değil.
- **Guardrail regresyonsuzluğu:** Saf metadata/redirect → render edilen DOM/asset/görsel değişmez → a11y=100 çift-tema / perf tabanı / CLS≈0 **yapısal** regresyonsuz (Faz 11 emsali); yine de doğrulanır. `next build` temiz + 0 `MISSING_MESSAGE`.
- **Ortam kısıtı (Faz 11 dersi):** Bu cloud devcontainer'da canlı `next start` sandbox tarafından öldürülebilir (worker-fork, exit 144). Redirect/metadata doğrulaması **build ground-truth** ile yapılabilir: `routes-manifest.json` (redirect regex + statusCode) + prerender HTML `<head>` (canonical/alternates). Kanıt-artefaktına bağlanır (sahte-geçmiş yok).
- **RTL (AR):** URL/metadata işi görsel yön içermez; `/ar` canonical/alternates + redirect `dir` etkilenmez. Site-geneli logical-ok (TB-4) bu fazın konusu değil (kayıtlı ayrı borç).

### Kapsam Dışı

- **TB-3: fixed-backdrop full-motion test tohumu** — WebGL runtime flaky (memory `playwright-bundled-chromium-webgl-yok`) diye Faz 12'de bilinçle ertelendi; kayıtlı sahipli açık, gelecek faz (maliyet/flakiness tartılarak).
- **TB-4: site-geneli logical-ok (RTL)** — 10+ ok, geniş yüzey; site-geneli tutarlı-birlikte iş (lone-flip yaratmamak için tek tek yapılmaz). Kayıtlı ayrı borç (Faz 10 kararı).
- **TB-5: npm audit 3 moderate** (PostCSS/`next` transitif) — fix = `next` downgrade (breaking, Dokunulmazlar). Statik-site istismar-edilemez; kayıtlı sahipli açık, `next` major upgrade'de doğal kapanır.
- **B grubu → prd-review:** non-TR alt-sayfa içerik tazeliği (ar/de/es stale, dil stratejisi/versiyon-sınırı) · AR/dil-seti stratejisi (vizyon-seviyesi) · brief mobil perf açığı (Lantern körlüğü → gerçek-cihaz/Vercel field ölçümü gerekir, lab'da kodla kapanmaz). Üçü de strateji/ölçüm konusu, kod borç değil → versiyon-sonu akışının doğal evi prd-review.
- **Kod-adı tanımlayıcıları** (`Bunker.tsx`, `components/bunker-os/`, `nav.bunker`, `#bunker`) — iç kod adı, taksonomi izin veriyor (dokunulmaz).
- **İçerik/kopya/tasarım/davranış/route değişimi** — metin, akış, URL path'leri (redirect kaynağı hariç) aynı kalır; yalnız metadata + redirect config.
- **Yeni i18n anahtarı / yeni bağımlılık** — faz saf metadata/redirect; `package.json` ve `messages/*` anahtar-kümesi dokunulmaz.

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 13` oturumunda doldurulur.

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

> Bu bölüm `/devflow:plan-phase 13` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 13.01 | TASK-13.01 | ⬜ Bekliyor | (plan-phase belirler) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 13` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 13` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 13` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / ⚠️ / ❌ | ... |
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

**Oluşturulma:** 2026-07-03 (discuss-phase 13)
**Son Güncelleme:** 2026-07-03 — discuss-phase 13: kapsam tartışması tamam. Versiyon-sonu tespiti `içerik_fazları`→`teknik_borç` damgalandı; kapsam TB-1 (alt-sayfa self-canonical + 5-locale hreflang alternates) + TB-2 (`/forum` locale gap + tüm config redirect denetimi) + hafif regresyon tohumu (WebGL-flaky değil); TB-3/TB-4/TB-5 kayıtlı sahipli açık, B grubu → prd-review. Sıradaki adım: research-phase 13.
