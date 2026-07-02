# PHASES — Proje Fazları (Özet)

**Amaç:** Tüm fazların genel durumunu göstermek
**Not:** Her fazın detayları `phases/PHASE-X.md` dokümanındadır.

---

## Faz Numaralandırma Kuralı (Just-in-Time)

Faz numarası faza **girildiğinde** atanır (discuss-phase) — değeri her zaman *Faz Durumu tablosundaki en büyük faz no + 1* (tablo boşsa 1). Gelecek fazlar **önceden numaralanmaz**; ileriye dönük plan versiyon düzeyinde (PRD/VERSIONS.md feature→versiyon) + aşağıdaki numarasız "Sıradaki Fazlar" listesinde durur.

Faz numaraları **global, sürekli ve append-only**'dir — versiyon değişse bile sıfırlanmaz ve **hiçbir zaman yeniden numaralanmaz/kaydırılmaz**. Araya iş girdiğinde yapılacak tek şey yeni konuyu Sıradaki Fazlar'a uygun sıraya eklemektir; numara hiç verilmemiş olduğu için kaydırılacak bir şey de yoktur.

---

## Faz Durumu

> Bu tablo **yalnızca girilmiş fazları** içerir (discuss-phase başlamış: 🔄/✅/⚠️). Henüz girilmemiş fazlar numarasızdır ve "Sıradaki Fazlar" listesindedir.

| Faz | Konu | Milestone | Durum |
|-----|------|-----------|-------|
| 1 | Ana sayfa TR içerik & ses revizesi | v0.1: Nasıl Çalışır 4 adım + gym tek-otomasyon + F5 dürüstlük + F6 hero CTA | ✅ |
| 2 | v0.1 versiyon-sonu teknik borç kapatma | TD1 non-TR çeviri senkronu + TD2 ölü anahtar hijyeni + TD3 ana sayfa perf/Lighthouse doğrulama | ✅ |
| 3 | v0.1 versiyon-sonu senaryo testi | v0.1 ana sayfa uçtan-uca doğrulama (S1–S8: giriş/yolculuk/mod/kontrol/taksonomi/5-dil/chatbot/adversarial); TR öncelik, otonom, keşfet+kaydet+triyaj | ✅ |
| 4 | v0.2 erişilebilirlik (a11y 89→100) | a11y A11Y1 renk kontrastı (marka yeşili imza korunur, bağlam-özel) + A11Y2 hero `<dl>` markup + A11Y3 dil-switcher aria; ana sayfa-birincil, perf/CLS regresyonsuz | ✅ |
| 5 | v0.2 test altyapısı (D1) | Kümülatif test harness (Vitest+RTL / Playwright+axe-core) + ilk GitHub Actions CI + tohum testler (i18n 5-dil parite + a11y regresyon `/` light+dark) | ✅ |
| 6 | v0.2 mobil perf / LCP | Ana sayfa TR `/` mobil perf/LCP brief bütçesine (≥95 / <2.5s) yaklaştırma — brief hedef / craft tavan; önce WebGL-dışı kazanımlar (P1) sonra Living Flow degradasyon ayarı (P2); a11y=100/CLS=0/masaüstü regresyonsuz | ✅ |
| 7 | v0.2 Umami analytics (E1) | Self-hosted Umami script'i (`next/script`, `[locale]/layout.tsx` head, afterInteractive) tüm locale'lerde pageview ölçümü; canlıda gözle doğrulanır; Faz 6 perf tabanı regresyonsuz | ✅ |
| 8 | v0.2 versiyon-sonu teknik borç kapatma | Alt-sayfa derin a11y (5 alt sayfa, 5 dil/AR RTL, ana sayfa çıtası a11y=100 çift-tema + axe WCAG-AA 0) + `text-pulse` ink-panel süpürmesi + kümülatif a11y regresyon tohumu/CI; guardrail'ler regresyonsuz | ✅ |
| 9 | v0.2 versiyon-sonu senaryo testi | v0.2 ana sayfa + 5 alt sayfa uçtan-uca doğrulama (S1–S9: giriş/yolculuk/mod/kontrol/taksonomi/5-dil/chatbot/v0.2-guardrail/adversarial); TR öncelik, otonom, keşfet+kaydet+triyaj | ✅ |

**Durum simgeleri:**
- 🔄 **Devam ediyor** — discuss-phase başladı (aktif faz)
- ✅ **Tamamlandı** — review-phase tamamlandı
- ⚠️ **Erken sonlandırıldı** — Versiyon erken sonlandırıldı

**Detaylar:** `phases/PHASE-X.md`

---

## Sıradaki Fazlar

> Yaklaşan faz konuları — **numarasız**. Faza girildiğinde (discuss-phase) buradan çıkar, numara (mevcut en büyük faz no + 1) alıp Faz Durumu tablosuna 🔄 olarak geçer. Aşağıdakiler güçlü revize için aday konulardır; kesin kapsam ve sıra PRD/discuss-phase'de netleşir.

**v0.3 near-term faz konuları** (re-kickoff 2026-07-02; **numarasız** — faza girince discuss-phase damgalar; kesin faz ayrımı discuss-phase 1'de sabitlenir):
- **Görsel cila** — A1 (logo hizalama) + A3 (CTA kartı affordance + scroll göstergesi ölçekleme). Saf CSS/görsel craft; en güvenli, dar. Milestone: logo hizalı + CTA kartları görsel olarak tıklanabilir + scroll göstergesi doğru ölçekli; a11y=100/perf tabanı/CLS regresyonsuz.
- **Living Flow nabız kapsamı** — B1 (**karar-gate'li**; craft-duyarlı imza riski). Milestone: nabız kapsamı kararı verildi (uygula VEYA iptal-kaydet); imza + reduced-motion + perf tabanı korundu.
- **URL taksonomisi / SEO redirect** — `/bunker-os`→`/crew-os` + `/forum`→404. Milestone: public `/crew-os` yayında + `/bunker-os` kalıcı redirect + i18n namespace `bunker`→`crew` 5-dil senkron + sitemap/canonical/alternates güncel + iç linkler temiz; SSG/build temiz.

> ⚠️ **v0.3 içerik fazlarından ÖNCE:** v0.2 production release (revize `main`'e ilk merge; Umami canlı +1 + duman testi orada kapanır) — ayrı operasyonel adım, faz döngüsü dışı (bkz. DURUM.md).

> v0.3 içerik fazları bitince versiyon-sonu sabit fazları gelir: teknik borç → senaryo testi → prd-review (dinamik, faza girince doğrudan tabloya eklenir). Faz ayrımı (kaç faz) discuss-phase'de netleşir.

<!-- KURAL: Bu liste YAKIN ufku tutar (örn. aktif versiyonun kalan fazları), uzak gelecek değil — uzak ileriye dönük plan PRD/VERSIONS.md'dedir. Numara YAZMA (numara faza girince damgalanır). Bir konu faza girince bu listeden silinir (mezuniyet — soft delete yasak: HTML comment/üstü çizili/"Önceki:" prefix yok). -->
<!-- NOT: VERSIONS.md feature→versiyon haritasını tekrar etme; burada faz konusu (geliştirme birimi) + milestone tutulur, feature listesi değil. -->
<!-- Sıradaki faz yoksa (proje/versiyon ucu) bu liste boş kalır. -->

---

## Faz Geçiş Notları

**Faz geçişinde yapılacaklar:**
1. Faz review'ını tamamla (`/devflow:review-phase N`)
2. Faz dokümanına retrospektif ve kalite kontrol sonuçlarını yaz
3. Milestone kriterlerini kontrol et
4. DURUM.md'yi güncelle
5. Tüm task'ların archive'da olduğunu doğrula
6. Sonraki fazı başlat (`/devflow:discuss-phase N+1`)

**Kural:** Bir seferde sadece 1 faz planlanır. Sonraki faz, mevcut faz tamamlandıktan sonra planlanır.

**Versiyon Sonu Kuralı:** Her versiyonun içerik fazları tamamlandıktan sonra sırasıyla iki sabit faz yürütülür: (1) Teknik Borç Kapatma Fazı, (2) Senaryo Testi Fazı. Bu fazlar tamamlandıktan sonra zorunlu olarak `/devflow:prd-review` çalıştırılır. (Bu fazlar da diğerleri gibi faza girince numara alır — bkz. Faz Numaralandırma Kuralı.)

**Faz Mezuniyeti Kuralı:** PHASES.md kompakt kalır. Her faz tamamlandığında (review-phase sonrası ✅), detayları zaten `phases/PHASE-N.md`'dedir. PHASES.md'ye faz detayı, retrospektif özeti, alt-faz oturum izi veya task listesi yazma — bunlar PHASE-N.md'ye aittir. PHASES.md sadece Faz Durumu tablosu + Sıradaki Fazlar listesi + geçiş notları (kısa) içerir.

| Geçiş | Tarih | Not |
|--------|-------|-----|
| Faz 1 ✅ → versiyon-sonu | 2026-06-28 | v0.1 tek içerik fazı tamam (UAT 15/15, kalite 8 eksen); sıradaki = Teknik Borç fazı (discuss-phase 2 promosyonu yapar) |
| Faz 2 ✅ (Teknik Borç) → senaryo testi | 2026-06-28 | TD1/TD2 tam; TD3 taban kaydedildi, bütçe açığı (a11y/mobil-perf) ertelendi (regresyon değil); Versiyon Sonu Durumu → senaryo_testi (discuss-phase 3 promosyonu yapar) |
| Faz 3 ✅ (Senaryo Testi) → versiyon sonu | 2026-06-29 | S1–S8 + UAT 10/10; kapsam-içi bug yok, kaynak değişmedi; v0.1 versiyon-sonu fazları (1,2,3) tamam; Versiyon Sonu Durumu → prd_review_bekliyor; sıradaki = zorunlu prd-review |
| Faz 4 ✅ (v0.2 a11y) → sonraki içerik fazı | 2026-06-30 | a11y 89→100 çift-tema (UAT 14/14, kalite 8 eksen); imza/perf/parite korundu; Versiyon Sonu Durumu içerik_fazları (değişmez); sıradaki = test altyapısı D1 (discuss-phase 5 promote eder) |
| Faz 5 ✅ (v0.2 test altyapısı D1) → sonraki içerik fazı | 2026-06-30 | İlk test altyapısı (UAT 13/13, kalite 8 eksen ✅): 3 katman (Vitest node/jsdom + Playwright/axe) + ilk GitHub Actions CI + 2 tohum (i18n parite + a11y regresyon); src/+messages/ 0 değişiklik; Versiyon Sonu Durumu içerik_fazları (değişmez); sıradaki = mobil perf/LCP (discuss-phase 6 promote eder) |
| Faz 6 girildi (v0.2 mobil perf/LCP) | 2026-06-30 | discuss-phase 6: kapsam tartışması tamam; ana sayfa TR `/` mobil-birincil, brief hedef / craft tavan, önce WebGL-dışı → degradasyon ayarı; Sıradaki Fazlar'dan mezun, tabloya 🔄; sıradaki adım research-phase 6 |
| Faz 6 ✅ (v0.2 mobil perf/LCP) → sonraki içerik fazı | 2026-06-30 | Milestone ✓ (ölçülebilir iyileşme: perf 84→90, LCP −440ms/−12%, sürücü L3); brief mobil açık dürüstçe kaydedildi; P2 craft-gate iptal (imza korundu); UAT 12/12, kalite 8 eksen ✅; guardrail'ler (a11y=100 çift-tema/CLS≈0/masaüstü 100/i18n parite) regresyonsuz; Versiyon Sonu Durumu içerik_fazları (değişmez); sıradaki = Umami (E1) (discuss-phase 7 promote eder) |
| Faz 7 girildi (v0.2 Umami analytics E1) | 2026-07-01 | discuss-phase 7: kapsam tartışması tamam; pageview-only + afterInteractive + hafif render testi + merge-sonrası canlı doğrulama; `[locale]/layout.tsx` head'e `next/script`; Faz 6 perf tabanı guardrail; Sıradaki Fazlar'dan mezun, tabloya 🔄; sıradaki adım research-phase 7 |
| Faz 7 ✅ (v0.2 Umami analytics E1) → versiyon-sonu | 2026-07-01 | Milestone kod-tarafı + perf tabanı tam (UAT 1-8 ✅, 8 kalite ekseni ✅); canlı +1 (S9-10) yapısal kısıt gereği v0.2 production release'e ertelendi (dürüst kayıt, sahte-geçmiş engellendi); Faz 6 perf/i18n/a11y guardrail regresyonsuz; v0.2 içerik fazları (4-7) tamam; Versiyon Sonu Durumu içerik_fazları (değişmez); sıradaki = teknik borç fazı (discuss-phase 8 promote eder) |
| Faz 8 girildi (v0.2 versiyon-sonu teknik borç) | 2026-07-01 | discuss-phase 8: versiyon-sonu tespiti içerik_fazları → teknik_borç; kapsam TB-A (`text-pulse` süpürmesi) + TB-B (alt-sayfa derin a11y, 5 dil/AR RTL, ana sayfa çıtası) + kümülatif tohum/CI, TB-C (npm audit) dışarıda; 5 dil korunur (vizyon değişmez, strateji prd-review'a); dinamik faz doğrudan tabloya 🔄; sıradaki adım research-phase 8 |
| Faz 8 ✅ (Teknik Borç) → senaryo testi | 2026-07-02 | 5 alt sayfa a11y=100 çift-tema + axe WCAG-AA 0 (50 test); UAT 12/12, kalite 8 eksen ✅; TD4 premisi grep'le çürütüldü (TD5'e katlandı); iki-gate mühür `landmark-one-main`'i yakaladı (8.06); guardrail (home a11y=100/perf tabanı/i18n parite) regresyonsuz; Versiyon Sonu Durumu → senaryo_testi (discuss-phase 9 promote eder) |
| Faz 9 girildi (v0.2 versiyon-sonu senaryo testi) | 2026-07-02 | discuss-phase 9: Adım 0b (Versiyon Sonu Durumu zaten senaryo_testi); kapsam ana sayfa + 5 alt sayfa uçtan-uca (Faz 3'ten genişletildi — Faz 8 alt sayfaları çıtaya çekti), TR birincil + non-TR tutarlılık, chatbot 0-token, keşfet+kaydet+triyaj; S1–S9 kataloğu; dinamik faz doğrudan tabloya 🔄; sıradaki adım research-phase 9 |
| Faz 9 ✅ (Senaryo Testi) → versiyon sonu | 2026-07-02 | S1–S9 + UAT 14/14; 0 kaynak değişimi, 0 kapsam-içi bug, 0 düzeltme task'ı; suite-first hibrit + bağımsız yeniden-doğrulama; milestone 5/5, 8 kalite ekseni ✅; v0.2 versiyon-sonu fazları (8,9) tamam; Versiyon Sonu Durumu → prd_review_bekliyor; sıradaki = zorunlu prd-review |

<!-- KURAL: Her geçiş için TEK satır + kısa not. Geçiş gerekçesi/detayı PHASE-N.md retrospektifindedir, burada tekrar edilmez. "Önceki:" prefix veya HTML comment ile detay yığma YASAK (CLAUDE.md → Doküman Disiplini). -->

---

**Son Güncelleme:** 2026-07-02 — re-kickoff (v0.2→v0.3): v0.2 tamamlandı (prd-review PRD değişikliği yok); Sıradaki Fazlar v0.3 near-term konularına güncellendi (görsel cila A1/A3 → Living Flow nabız B1 gate'li → URL/SEO redirect), numarasız. v0.3 içerik fazlarından önce v0.2 production release bekliyor. Sıradaki adım: discuss-phase (v0.3 ilk fazı).

<!-- KURAL: Bu satır her güncellemede ÜZERİNE YAZILIR. "Önceki:" prefix ile kümülatif yığma YASAK (CLAUDE.md → Doküman Disiplini). -->
