# Phase 12: v0.3 Living Flow Nabız Kapsamı (B1)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm ~20k token'a yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-12-<slug>.md`'ye bölünür. Tamamlandıktan (✅) sonra bölme yasaktır. -->

---

## Genel Bilgiler

**Amaç:** Ana sayfada şu an yalnızca Hero'da render edilen Living Flow yeşil nabızlarını, kontrollü biçimde sayfanın devamına taşımak (B1). İmza akış hissini aşağı uzatırken okunabilirlik, göz yorgunluğu ve perf tabanını korumak. **Karar-gate'li ve imza-riskli faz:** milestone bir "uygula" garantisi değil — sonuç ya kontrollü uygulama ya da (P2 Faz 6 emsali) bilinçli iptal-kaydet.

**Milestone:** Living Flow nabız kapsamı kararı verildi ve **uygulandı VEYA iptal-kaydedildi**; her iki sonda da imza (Hero çekirdek efekti), reduced-motion/no-WebGL tam fallback, a11y kontrast=100 çift-tema ve perf tabanı (desktop perf 100 / CLS 0 / mobil taban) **korundu** (regresyonsuz).

### Feature Listesi

(MODULE-MAP ve modules/ referansı)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| B1: Living Flow nabız kapsamı (aşağı-taşıma, karar-gate'li) | M1 (+M2 scrim/bölüm entegrasyonu) | Hero-sonrası bölümlerde sürekli-soluk nabız ipliği; desktop-öncelik, bölüme-uyarlanan opaklık; okunabilirlik/perf/a11y guardrail'leri korunur |

---

## Kapsam Tartışması

> `/devflow:discuss-phase 12` oturumunda dolduruldu (2026-07-02).

### Alınan Kararlar

- **Yön — kontrollü aşağı-taşıma:** Nabızlar Hero'nun altına, sayfanın devamına taşınır. Gerekçe: B1 backlog sorusundaki beğenilen etki "aşağı kayan yeşil nabızlar"dır; süreklilik hissi güçlendirilir. Kullanıcı "yerinde bırak" ve "saf değerlendir→iptal" seçenekleri yerine kontrollü taşımayı seçti. (Craft üst eksen — ILKELER.)
- **Biçim — sürekli soluk iplik:** Nabızlar Hero'dan sonra da bölümlerin arkasında **çok soluk** biçimde sürer (tek bütün alan hissi), "seçili aksan noktaları" veya "tek sabit katman" yerine. En güçlü süreklilik/imza hissi (beğenilen etkiye en yakın), ama en yüksek okunabilirlik+perf riskini taşıyan biçim → koruma disiplini kritik.
- **Mobil/perf — desktop-öncelik, mobil korunur:** Aşağı-taşıma öncelikle desktop/yüksek-güç içindir. Mobil/low-power'da nabız Hero'da kalır veya statik/çok-hafif. Gerekçe: mobil perf brief'te zaten açık, WebGL alanını büyütmek GPU maliyeti; perf tabanı **korunan taban** (ILKELER, regresyon yasak) — sıfır risk tercih edildi.
- **Okunabilirlik — bölüme-uyarlanan opaklık:** Metin-yoğun (HowItWorks/Sektörler) ve koyu-panel (Crew OS teaser) bölümlerde iplik daha da soluk / scrim daha güçlü; nefes alan bölümlerde biraz daha görünür. **Metin her zaman kazanır.** Gerekçe: a11y kontrast=100 korunan taban + backlog'da işaretli göz yorgunluğu riski; tek-tip düz opaklık metin-yoğun bölümlerde fazla gelebilir.

### Kullanıcı Tercihleri

- Süreklilik hissi (imza akışı) önemseniyor — beğenilen etki bu; biçim seçimi buna göre yapıldı.
- Perf tabanına sıfır risk: mobil bilinçle korunuyor.
- İpliğin sayfada ne kadar aşağı ineceği (Footer dahil mi, Credibility'de kesilsin mi) ve bölüm bazında opaklık tavanı research/plan aşamasında somutlaşır — kullanıcı ek kısıt getirmedi.

### Çapraz Konular

- **Performans (guardrail):** WebGL alanını büyütmek = GPU maliyeti. Korunan taban regresyonsuz kalır (desktop perf 100 / CLS 0 / mobil taban). Sürekli alanın **teknik biçimi** (tek büyük canvas mı, bölüm-başı instance mı, sabit arka-plan katmanı mı) research/plan işidir — burada damgalanmadı; perf ölçümü seçimi yönlendirir.
- **a11y (guardrail):** Kontrast=100 çift-tema korunan taban — iplik arkasındaki metin her iki temada WCAG-AA eşiğini geçmeli (ölçülür; regresyon yasak). reduced-motion / no-WebGL tam fallback korunur; alan zaten `aria-hidden`.
- **i18n:** Saf görsel değişiklik — **yeni i18n anahtarı yok** → 5-dil parite riski yok.
- **Göz yorgunluğu:** Opaklık tavanı + scrim gerçek görsel incelemeyle doğrulanır (craft son hakem).

### Karar-Gate Kriterleri (iptal-kaydet tetikleri)

Sürekli iplik şunlardan **birini** koruyamıyorsa → P2 (Faz 6) emsali gibi **iptal-kaydet** (kod geri alınır, gerekçe `docs/DECISIONS.md`'ye):
- Kontrast=100 (çift-tema) korunamıyor, **veya**
- Perf tabanı (desktop) regres ediyor, **veya**
- Gerçek görsel incelemede göz yorgunluğu / şablon-kokusu / imzayı zayıflatma görülüyor → craft son hakem.

### Kapsam Dışı

- **Mobil aşağı-taşıma** — mobil/low-power Hero-only veya statik kalır (perf tabanı).
- **`/crew-os` + Alpfit sayfa-başlığı Living Flow'ları** (zaten var, dokunulmaz) ve **404 sayfaları**.
- **Hero'nun çekirdek efekti** — Hero tam yoğunlukta mevcut haliyle kalır (yeniden tasarım yok).
- İçerik/kopya/davranış değişikliği, yeni bölüm/layout, yeni i18n anahtarı.

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 12` oturumunda doldurulur.

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

> Bu bölüm `/devflow:plan-phase 12` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır. -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | ⬜ Bekliyor | plan-phase 12'de doldurulacak |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 12` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 12` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 12` oturumunda doldurulur.

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

**Oluşturulma:** 2026-07-02
**Son Güncelleme:** 2026-07-02
