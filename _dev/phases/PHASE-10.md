# Phase 10: Görsel Cila (A1 logo + A3 CTA affordance & scroll göstergesi)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.3'ün ilk (en dar/güvenli) içerik fazı — saf CSS/görsel craft cilası. Üç görsel kusur giderilir: (A1) marka işareti/logo hizalaması, (A3) ana sayfa CTA kartlarının (Hero istatistik şeridi) tıklanabilir görünmemesi, ve (A3) Hero scroll göstergesinin ölçek/konum bozukluğu. İmza, davranış ve içerik değişmez; yalnız görsel algı düzeltilir.

**Milestone:** Logo her yüzeyde (Nav + varsa PageHeader/Footer) hizalı/tutarlı **ve** Hero CTA kartları görsel olarak tıklanabilir (ince/zarif affordance) **ve** scroll göstergesi doğru ölçekli/konumlu — guardrail'ler regresyonsuz: a11y=100 çift-tema, perf korunan taban, CLS≈0, i18n 5-dil parite.

### Feature Listesi

(MODULE-MAP ve modules/ referansı; kaynak: `docs/REVIZE-BACKLOG.md` A1/A3)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| A1: Logo/marka işareti hizalama | M3 (Nav/PageHeader) + M1 (token) | KiwiMark'ın göründüğü tüm yüzeylerde (Nav + varsa PageHeader + Footer) dikey/yatay hizası tutarlı |
| A3a: Hero CTA kartı affordance | M2 (Hero) + M3 | İstatistik şeridindeki Alpfit/Crew OS `<Link>`'leri ince/zarif ipuçlarıyla tıklanabilir görünür |
| A3b: Hero scroll göstergesi ölçekleme | M2 (Hero) + M1 | Merkez-alt "Kaydır" göstergesi doğru ölçek/konumda |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 10` oturumunda dolduruldu (2026-07-02).

### Alınan Kararlar

- **Faz kapsamı = yalnızca Görsel cila (A1 + A3):** v0.3 near-term'deki üç konudan (Görsel cila / B1 Living Flow nabız / SEO redirect) ilk ve en dar/güvenli olanı. Gerekçe: "task küçük, faz dar" ilkesi + B1 karar-gate'li imza riski taşır, SEO çapraz-modül (M6+M2+M4) rename işidir → görsel cila ile karıştırmak fazı bulanıklaştırır. B1 ve SEO ayrı fazlar.
- **A1 kapsamı = marka işareti her yüzeyde tutarlı:** Yalnız Nav değil; KiwiMark nerede görünüyorsa (Nav + varsa PageHeader alt-sayfa başlığı + Footer) hizalı/tutarlı. Tutarlılık craft gereği; hangi yüzeylerde göründüğünün kod-teyidi research-phase'de.
- **A3 CTA affordance = ince/zarif:** Hafif kart sınırı / hover-altı çizgi / ok (→) gibi ince ipuçları. Gerekçe: Craft en üst eksen (ILKELER) — "zero template smell" korunur, generic SaaS buton/dolgu-kart hissi (template smell) girmez. Kartlar zaten `<Link>` (davranış doğru), sorun yalnız görsel affordance.
- **A3 scroll göstergesi = merkez-alt gösterge:** Hedef, Hero'nun merkez-alt "Kaydır" + dikey çizgi göstergesi (`Hero.tsx:140-143`, `left-1/2 hidden md:flex`). REVIZE-BACKLOG'daki "sağdaki" ifadesi büyük ekranda merkez≈sağ-stat hizası algısından; ayrı bir sağ-taraf scroll öğesi **yok** (tüm bileşenler tarandı). Tam kusurun (boyut mu/konum mu) damgası research/plan'da.

### Kullanıcı Tercihleri

- Craft-first: her üç düzeltmede de mevcut sofistike estetik korunur, minimal/cerrahi müdahale.
- i18n: faz saf görsel — `scroll`, `stats.*` anahtarları 5 dilde zaten var; **yeni i18n anahtarı gerekmez** (parite otomatik korunur).

### Çapraz Konular (plan/icrada uyulacak)

- **Çift-tema token disiplini:** Yeni sınır/kart/gösterge rengi **adaptif token**la tanımlanır (light+dark ikisinde de geçer); Tailwind `dark:` variant **YOK** (proje `html.dark` class + CSS-değişken flip kullanır — `dark:` `prefers-color-scheme`'e bağlı, desync olur; memory: `tema-fix-html-dark-token-flip`).
- **a11y=100 çift-tema:** Eklenen her görsel öğe **her iki temada** color-contrast geçmeli; `aria-hidden` kontrast denetiminden muaf tutmaz (memory: `aria-hidden-color-contrast-muafiyeti-degil`). Ölçüm light+dark iki koşu (memory: `a11y-olcum-tema-tuzagi`).
- **CLS≈0:** Kart sınırı/padding veya gösterge ölçek değişimi **layout shift yaratmamalı** (near-zero CLS korunan taban).
- **RTL (AR):** Yön ipuçları (ok, hover-altı çizgi kayması) **logical prop** (`start/end`), physical `left/right` değil.
- **Reduced-motion:** Mevcut `animate-ping` (Alpfit canlı-dot) + scroll `animate-pulse` reduced-motion'da susar; yeni animasyon eklenirse aynı disiplin.
- **Focus-visible:** Mevcut 2px yeşil outline korunur; affordance klavye-erişilebilirliğini bozmaz.

### Kapsam Dışı

- **B1 Living Flow nabız kapsamı** — ayrı, karar-gate'li faz (imza riski).
- **SEO `/bunker-os`→`/crew-os` redirect + `/forum`→404** — ayrı, çapraz-modül faz (M6+M2+M4, i18n namespace rename).
- **Non-TR içerik tazeliği** (alt-sayfa ar/de/es stale) — versiyon-sınırı, dil stratejisi kapsamında (bu faz değil).
- **A2 genel kopya revizesi** — v0.1'de reframe edildi (canlı TR kopya güçlü).
- **Yeni mobil scroll-cue** — gösterge desktop-only (`hidden md:flex`) kalır; A3 = mevcut göstergenin ölçek düzeltmesi, yeni mobil öğe eklenmez (bilerek basit tutuldu).
- **Yeni i18n anahtarı** — faz saf görsel; mevcut anahtarlar yeterli.
- **Davranış/route/içerik değişikliği** — `<Link>` hedefleri, metin, akış aynı kalır; yalnız görsel katman.

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 10` oturumunda doldurulacak.

### Değerlendirilen Yaklaşımlar
- [research-phase]

### Kullanılacak Araçlar/Kütüphaneler
- [research-phase]

### Dikkat Edilecekler
- [research-phase]

### Teknik Kararlar
- [research-phase]

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase 10` oturumunda doldurulacak.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | ⬜ Bekliyor | plan-phase'de doldurulacak |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 10` oturumunda doldurulacak.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 10` oturumunda doldurulacak.

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 10` oturumunda doldurulacak.

---

## Sonuç

- **Tamamlanma Tarihi:** [review-phase]
- **Toplam Task:** [plan-phase]
- **Notlar:** [review-phase]

---

**Oluşturulma:** 2026-07-02 (discuss-phase 10)
**Son Güncelleme:** 2026-07-02
