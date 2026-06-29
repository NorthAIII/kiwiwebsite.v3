# Phase 4: v0.2 Erişilebilirlik (a11y 89 → 100)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.2'nin (a11y & Performans + teknik temel) **ilk içerik fazı**: ana sayfanın Lighthouse erişilebilirlik skorunu 89'dan brief hedefi olan **100**'e çıkarmak. Faz 2 TD3'te ölçülen, ortam-bağımsız en net açık kalem (a11y 89, her iki preset). 4 başarısız denetim (3 alan) cerrahi düzeltilir: renk kontrastı (craft-duyarlı — marka yeşili imza korunarak) + hero `<dl>` geçersiz markup + dil-switcher aria-mismatch. v0.2'nin kalan iş kolları (test altyapısı → perf → Umami) sonraki fazlardır; burada kapsam dışı.

**Milestone:** *(Faz 2/3 dersi: versiyon-sonu olmayan içerik fazı bile "ölç + doğrula" çerçevesinde yazılır — geçiş peşinen varsayılmaz.)*
1. Ana sayfada Lighthouse **a11y = 100** (mobil + masaüstü), TD3'teki kanonik yöntemle (`next build && next start` + npx lighthouse, düşük host-yükü, çoklu koşu) ölçülüp `docs/perf/` tabanına kaydedildi;
2. 4 denetim (color-contrast / definition-list / dlitem / label-content-name-mismatch) **0 başarısız**;
3. **Marka yeşili imza korundu** — bağlam-özel düzeltme; görünür imza renk değişmedi (craft regresyonu yok, gözle teyit);
4. **Perf/CLS korunan taban regresyon yok** (masaüstü perf 100 / CLS 0; mobil perf ~87 / CLS 0 — düşmedi);
5. i18n parite korundu (aria düzeltmesi anahtar eklerse/yeniden adlandırırsa 5 dil eşzamanlı, eksik anahtar yok).

### Feature Listesi

(MODULE-MAP ve modules/ referansı: M1 tasarım token, M2 hero/bölümler, M3 dil kontrolü, M4 i18n. Kaynak kırılım: `docs/perf/README.md` "Accessibility 89" + DECISIONS 2026-06-28.)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| A11Y1: Renk kontrastı (WCAG AA) | M1 (+M2) | Marka yeşili `#8af28a` krem üzerinde 1.22 (adım numaraları, "İşleyen örnekleri gör" CTA) → **bağlam-özel** erişilebilir varyant (imza korunur); soluk gri metinler `#7d8073`/4.39 + `#999992`/2.52 → AA eşiğine |
| A11Y2: Hero `<dl>`/`dlitem` markup | M2 | Hero `<dl data-hero="stats">` doğrudan `<a>` sarıyor (geçersiz) → `<dt>`/`<dd>` doğru sarma; görünüm değişmez |
| A11Y3: Dil-switcher aria-mismatch | M3 (+M4) | Dil butonlarında görünür metin ↔ `aria-label` uyuşmuyor (label-content-name-mismatch, 2 öğe) → hizalama (anahtar değişirse 5 dil) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 4` oturumunda dolduruldu (2026-06-29).

### Alınan Kararlar

- **Faz tipi = v0.2 ilk içerik fazı (a11y).** Versiyon Sonu Durumu: `içerik_fazları`. v0.2 = "a11y & Performans + teknik temel" (VERSIONS.md, prd-review 2026-06-29). v0.2 yeni versiyon, MODULE-MAP'te henüz v0.2 satırı yoktu; prd-review PRD'yi değiştirmedi → re-kickoff gerekmedi. v0.2 öncelikleri zaten VERSIONS "Sıradaki Versiyon" + REVIZE-BACKLOG D1/D2/E1 + DECISIONS perf-tabanında tanımlı.
- **v0.2 faz sırası = a11y → test altyapısı → perf → Umami** (kullanıcı kararı). Faz 4 yalnız **a11y**. Gerekçe: a11y en net/ölçülebilir sinyal (brief hedefi ≥100, ortam-bağımsız), 3 denetim kesin tanımlı (düşük belirsizlik), craft-duyarlı Living Flow WebGL'e dokunmaz, cerrahi → "az context = yüksek kalite". Diğer 3 iş kolu (mobil perf, test altyapısı D1, Umami E1) sonraki v0.2 fazları.
- **İlke gerilimi açıkça getirildi (kümülatif test):** ILKELER "kümülatif test altyapısı" test-altyapısını-önce destekleyebilir (sonraki a11y/perf otomatik regresyon güvencesi alır; "korunan taban" şu an *elle* Lighthouse ile korunuyor). Karşı argüman kabul edildi: a11y fixleri Lighthouse ile elle ölçülerek mevcut "test = build + UAT" konvansiyonunca zaten kapsanıyor → a11y-önce ilkeyi ihlal etmez; test altyapısı ayrı teknik-temel kalemi (Faz 5 adayı, a11y/perf kazanımını otomatik teste bağlayabilir). Kullanıcı a11y-önce'yi seçti.
- **Marka yeşili kontrast = imzayı koru, bağlam-özel düzelt** (kullanıcı kararı — craft üst eksen). Parlak `#8af28a` imza olarak kalır; kontrast düzeltmesi yalnız başarısız **metin** öğelerinde (adım numaraları, CTA) bağlam-özel erişilebilir varyantla yapılır (koyu yeşil `#1f7a3d` zaten logo/CTA'da kullanılıyor — precedent) ya da arka-plan treatment. Token'ı küresele düzleştirme YOK. Kesin mekanizma (koyu varyant / treatment / öğe-bazlı) research/plan'de netleşir. Gerekçe: Marka & Craft tek üst eksen (ILKELER) — imza renk feda edilmeden a11y=100 hedeflenir; perf/README zaten "düzeltme marka sesini koruyarak yapılmalı" diyor.
- **Tamamlanma kriteri = ana sayfada a11y 100 (mobil+masaüstü), perf/CLS regresyonsuz.** TD3 kanonik Lighthouse yöntemi (yerel prod build, npx cache lighthouse, düşük host-yükü gözlemi `/proc/loadavg`, çoklu koşu median). Sonuç `docs/perf/` tabanına yeni koşu olarak yazılır.
- **Doğrulama = manuel Lighthouse + axe** (proje-geneli test altyapısı yok — Faz 5 adayı). Bu fazda otomatik a11y test suite kurulmaz; o teknik temel ayrı faz. Tutarlı: Faz 2/3 da otonom/manuel ölçtü.

### Kullanıcı Tercihleri

- **a11y'den başla** (2026-06-29): "önerdiğin şekilde devam edelim" — a11y-önce sıralaması onaylandı.
- **İmzayı koru** (2026-06-29): marka yeşili kontrast düzeltmesi bağlam-özel; imza renk değişmez.
- Kullanıcı v0.2 başında thread'i kaybetmişti → DevFlow durumu + v0.2 4 iş kolu sadeleştirilerek özetlendi, sonra karar alındı (oturum bağlamı; doküman değil).

### Kapsam Dışı

- **Mobil perf / LCP (87 / 3.1s → brief bütçesi)** — sonraki v0.2 fazı; ana kaynak Living Flow WebGL (craft-duyarlı, aceleyle dokunulmaz). a11y fazında perf yalnız **regresyonsuz** tutulur, optimize edilmez.
- **Test altyapısı kurulumu (D1)** — sonraki v0.2 fazı (teknik temel); bu faz manuel Lighthouse/axe ile doğrular.
- **Umami analytics (E1)** — sonraki v0.2 fazı; spec `docs/UMAMI-ANALYTICS.md` hazır.
- **Alt sayfa derin a11y denetimi** (Alpfit, Crew OS showcase `/bunker-os`, vaka, bülten) — sonraki versiyon (Faz 3 retrosu da böyle bıraktı). Hedef ana sayfa-birincil; token (yeşil) + global Nav (dil-switcher) düzeltmeleri zaten tüm sayfalara yayılır ama alt sayfalar derin denetlenmez.
- **Token'ı küresel düzleştirme / marka yeşilini değiştirme** — bilinçle reddedildi (imza korunur).
- **Alakasız ertelenmiş kalemler** (`/bunker-os`→`/crew-os` redirect M6, çıplak `/forum`→404, anchor-drop) — yeniden açılmaz.

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 4` oturumunda doldurulur.

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

> Bu bölüm `/devflow:plan-phase 4` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 4.01 | TASK-4.01 | ⬜ Bekliyor | [plan-phase'de doldurulacak] |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Modülerlik | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / N/A | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-06-29
**Son Güncelleme:** 2026-06-29 — discuss-phase 4: kapsam tartışması tamamlandı (Faz 4 = a11y; marka yeşili imza korunur, bağlam-özel düzeltme; v0.2 sırası a11y→test→perf→Umami).
