# Phase 2: v0.1 Versiyon-Sonu Teknik Borç Kapatma

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.1'in versiyon-sonu **Teknik Borç Kapatma** fazı. v0.1 içerik fazı (Faz 1) TR'yi tek kaynak olarak ilerletip non-TR çeviri ile bazı hijyen/ölçüm kalemlerini bilinçli ertelemişti; bu faz o biriken borcu kapatır. İş **cerrahi**: TR'de değişen değerleri 4 dile taşı, render edilmeyen ölü anahtarları temizle, ana sayfa performans tabanını ölç. Yeni içerik/feature üretilmez.

**Milestone:** (1) 4 dilde (EN/AR/DE/ES) v0.1'de TR'de değişen değerler (R1 step'leri analyze/automate/report + R2 gym automation/body + F6 hero ikincil CTA) TR ile **senkron**; (2) ölü anahtarlar (`forum.articles.{one..four}`, `proof.{label,note}`) 5 dilden **tamamen silinmiş** ve `next build` temiz (eksik anahtar/MISSING_MESSAGE yok); (3) ana sayfa Lighthouse (mobil + masaüstü) brief bütçesini (≥95 perf / ≥100 a11y / LCP < 2.5s, near-zero CLS) karşılıyor ve **taban kaydedildi**.

### Feature Listesi

(MODULE-MAP ve modules/ referansı: M4 `modules/M4-i18n.md`, M2 `modules/M2-Sayfalar-Bolumler.md`, M6 `modules/M6-SEO-Deploy.md`. Kaynak: Faz 1 retrospektifi "Sonraki Faz İçin Öneriler" + REVIZE-BACKLOG D2.)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| TD1: Non-TR çeviri senkronu | M4 (+M2) | R1 step değerleri (`how.steps.{analyze,automate,report}` title+body) + R2 `sectors.items.gyms.{automation,body}` + F6 `hero.ctaSecondary` → EN/AR/DE/ES'de TR ile hizala (yalnız DEĞER; anahtar adı değişmez) |
| TD2: Ölü anahtar hijyeni | M4 (+M2) | `forum.articles.{one..four}` + `proof.{label,note}` → 5 dilden (TR dahil) tamamen sil; render edilmiyor (build temiz kalmalı) |
| TD3: Performans/Lighthouse doğrulama | M6 | Ana sayfa, mobil + masaüstü Lighthouse; brief bütçesi kontrolü + taban kaydı (yerel production build üzerinde) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase` oturumunda dolduruldu (2026-06-28).

### Alınan Kararlar

- **Faz tipi & kapsam seçimi.** Versiyon-sonu Teknik Borç fazı. **Çekirdek:** TD1 çeviri senkronu + TD2 ölü anahtar hijyeni. **Eklenen:** TD3 performans/Lighthouse doğrulaması (REVIZE-BACKLOG D2). Gerekçe: çeviri senkronu dil stratejisi kararının (DECISIONS 2026-06-27) **versiyon-sınırı teslim noktasıdır**; ölü anahtar düşük maliyetli bakım/modülerlik hijyeni (QUALITY §5); perf doğrulaması versiyon-sonu "regresyon yok / korunan taban" teyidine (ILKELER) doğal oturur.
- **Çeviri senkronu yüzeyi = yalnız v0.1'de TR'de değişen 3 kalem.** R1 step değerleri (`analyze`/`automate`/`report` title+body — non-TR'de stale; `design`/Çözüm zaten 5 dilde çevrili, `how.title` sayı-sözcüğü Faz 1'de zaten 5 dile senkronlandı), R2 `sectors.items.gyms.automation`+`.body`, F6 `hero.ctaSecondary`. Faz 1 cerrahiydi → başka stale yüzey yok.
- **i18n değişim tipi = yalnız DEĞER.** Anahtar adı değişmiyor (rename Faz 1'de yapıldı). Süreç disiplini gereği değer-ertelemesi tam bu noktada (versiyon-sınırı) kapatılır; eksik anahtar riski yok. (Memory: i18n anahtar varlığı ≠ değer tazeliği.)
- **Ölü anahtar: hepsini sil.** `forum.articles.{one..four}` + `proof.{label,note}` 5 dilden (TR dahil) tamamen kaldırılır; git history korur. Forum makale render planı net değil; `proof.note` R4 cümle-içi dürüstlük çerçevelemesiyle **superseded**. İleride forum render edilirse başlıklar dürüst (F5) çerçeveyle yeniden eklenir. Silme 5 dilde tutarlı olmalı (tek dilde kalan anahtar drift yaratır).
- **Arapça: diğer dillerle aynı çevir.** AR'yi de mevcut AR ses/üslup tabanına (C3 ✅) uygun çevir; senkron yüzeyi küçük. AR-özel dondurma veya harici doğrulama tercih edilmedi — AR koru kararıyla (DECISIONS 2026-06-27) tutarlı.
- **Perf doğrulama: ana sayfa, mobil + masaüstü.** Brief bütçesi (≥95 perf / ≥100 a11y / LCP < 2.5s, near-zero CLS) karşılanıyor mu kontrol + taban kaydı. Ölçüm **yerel production build** üzerinde (revize branch canlıya deploy olmuyor; kiwiailab.com eski kodu yansıtır). Kayıtlı önceki Lighthouse ölçümü yok → çerçeve "taban oluştur + bütçeyi karşıla" (saf önce/sonra regresyon-karşılaştırması değil).

### Kullanıcı Tercihleri

- **Dar kapsam.** Büyük kalemler bu faza tıkıştırılmadı (proje felsefesi: "az context = yüksek kalite"). `/bunker-os` route, test altyapısı, Umami → kendi fazlarına/versiyonlarına.
- **Çeviri F5 uyumu.** Senkronlanan non-TR değerler TR'nin dürüstlük çerçevesini taşır (TR zaten dürüst → çeviri bozmaz; uydurma müşteri-sonucu eklenmez).

### Kapsam Dışı

- **`/bunker-os` → public `/crew-os` + redirect (M6 açık konu):** görsel/SEO versiyonuyla kuplajlı (redirect + alternates + sitemap + iç link) → ertelendi.
- **Test altyapısı kurulumu (D1):** büyük iş → ayrı adanmış teknik faz.
- **Umami analytics (E1):** sonraki (kullanıcı "sonra ekle" demişti); eklenince "canlıda gerçekten saydığını gözle doğrula" disiplini (memory) geçerli.
- **Çeviri denetimi yalnız v0.1'de değişen ana sayfa kalemleri** — alt sayfaların genel çeviri/kalite denetimi bu faz dışı.
- **Perf yalnız ana sayfa** — alt sayfa Lighthouse taraması bu faz dışı (kilit alt sayfa seçeneği tercih edilmedi).
- **forum.articles için F5 başlık düzeltmesi yapılmaz** — silindiği için gereksiz (render planı yok).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase` oturumunda doldurulur.

**Araştırmaya taşınan açık nokta:** Perf ölçüm aracı seçimi (npx ile bağımlılık eklemeden Lighthouse vs Playwright tabanlı vs Chrome DevTools) — `package.json` dokunulmaz olduğundan bağımlılık eklemeden yöntem netleştirilecek. TD1/TD2 i18n yüzeyi research-phase'de 5-dil paralellik + `src/` tüketim teyidiyle son kez doğrulanacak (ölü anahtar render-yok teyidi).

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

> Bu bölüm `/devflow:plan-phase` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| _(plan-phase'de doldurulacak)_ | | | |

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
| Marka & Craft (imza) | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / N/A | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Yerelleştirme & RTL | ✅ / ⚠️ / ❌ | ... |
| Modülerlik & Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi & Degradasyon | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-06-28
**Son Güncelleme:** 2026-06-28 — discuss-phase: kapsam tartışması tamamlandı (çekirdek TD1 çeviri senkronu + TD2 ölü anahtar; eklenen TD3 perf doğrulama; route/test/Umami ertelendi).
