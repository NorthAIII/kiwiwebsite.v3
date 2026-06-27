# Phase 1: Ana Sayfa TR İçerik & Ses Revizesi (v0.1)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.1'in içerik fazı — ana sayfanın görünür Türkçe metnini marka sesinde tutarlı, dürüst ve yapısal olarak doğru hâle getirmek. İş **cerrahi/nokta-atışı**: canlı kopya büyük ölçüde güçlü olduğu için baştan-sona rewrite değil; yapısal düzeltme (R1, R2) + ses/dürüstlük cilası (R3, R4). Kapsam yalnızca **ana sayfa**; alt sayfalar ve görsel cila sonraki versiyonlara.

**Milestone:** Ana sayfada (1) "Nasıl Çalışır" örtüşmesiz **4 adım** (Analiz · Çözüm · Otomasyon · Raporlama), (2) Sektörler `gyms` paneli **tek-otomasyon** deseninde (özellik-listesi değil), (3) Crew OS bölümü içerik teyidi geçmiş, (4) F5 dürüstlük konvansiyonu tutarlı uygulanmış + F6 hero ikincil CTA net etiketli — hepsi TR'de tamam; marka sesi tutarlı; TR tek kaynak (EN/AR/DE/ES çevirisi versiyon-sınırına ertelendi, yeni yapısal anahtar 5 dile eklenir).

### Feature Listesi

(MODULE-MAP ve modules/ referansı: M2 `modules/M2-Sayfalar-Bolumler.md`, M4 `modules/M4-i18n.md`. Kaynak PRD: `_dev/PRD/features/`.)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| R1: Nasıl Çalışır 3→4 adım | M2 (HowItWorks) + M4 | `how` namespace: 3 adım → 4 örtüşmesiz adım (Analiz·Çözüm·Otomasyon·Raporlama); `how.title` güncellenir; anahtarlar semantik yeniden adlandırılır + 4. adım yeni anahtar (5 dile eklenir) |
| R2: Sektörler gym paneli tek-otomasyona | M2 (SectorSolutions) + M4 | `sectors.gyms` gövdesi özellik-listesinden tek somut otomasyona; "Canlı — Alpfit" rozeti + Alpfit ürün CTA korunur |
| R3: Crew OS bölümü içerik teyidi | M2 (Bunker) + M4 | Ana metin doğru, panel akışları bırakıldı → ayrı task değil, F5/ses taramasında **doğrulama checkpoint'i** |
| R4: Ana sayfa ses & dürüstlük (F5 + F6) | M2 + M4 | F5 cümle-içi dürüstlük çerçevelemesi (öngörü/örnek) + mevcut `proof.note`; F6 hero ikincil CTA "İşleyen örnekleri gör" |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase` oturumunda dolduruldu (2026-06-28).

### Alınan Kararlar

- **R1 adım adları (PRD'de kararlı, teyit):** Analiz · Çözüm · Otomasyon · Raporlama. Eski 01 Analiz + 02 Tespit tek "Analiz"e erir; "Çözüm" gerçekten eklenen yeni adım; ölçüm "Otomasyon" kuyruğundan ayrılıp "Raporlama" olur. `how.title` "Üç adım…" → "Dört adım…". Crew OS sayfasındaki platform 4-adımıyla (Bağla/Akış kur/Çalıştır/Ölç) çelişmez — o sayfaya dokunulmaz.
- **R1 i18n anahtar stratejisi: semantik yeniden adlandırma.** Gerekçe: adım semantiği kaydığı için legacy anahtar adları (`listen`/`find`/`automate`) aktif yanıltıcı olur (örn. `find` artık "Çözüm" içeriği taşır). Anahtarlar yeni semantiğe göre temizlenir (aday adlar `analyze`/`design`/`automate`/`report` — final adlar plan/execution'da netleşir); `HowItWorks.tsx` + 5 dil dosyası tek seferlik mekanik değişimle hizalanır. Bakım kolaylığı/kalıcılık craft üst ekseniyle uyumlu (ILKELER).
- **R2 gym paneli: tek-otomasyon deseni.** `gyms.automation` + `gyms.body` özellik-listesinden çıkıp tek somut otomasyona döner (`gyms.flow` zaten doğru: kaçan üye → WhatsApp teklif/PT → takip). "Canlı — Alpfit" nabız rozeti ve Alpfit ürün CTA'sı (`/spor-salonu-yazilimi`) **korunur** — yalnızca özellik-listesi gövdesi çıkar. Diğer 5 sektör (klinik, e-ticaret, emlak, eğitim, restoran) güçlü → korunur, elden geçirilmez (yalnız F5 taraması).
- **R3 Crew OS: doğrulama checkpoint'i (ayrı task değil).** Ana metin (`bunker.title/body/points`) doğru; panel akış adları (`bunker.flows`) "platformda çalışan gerçek akışlar" çerçevesinde bırakıldı (PRD kararı). R3 ayrı task'e bölünmez; F5/ses taraması içinde tek doğrulama adımı olarak ele alınır (gereksiz task şişmesi önlenir).
- **R4/F5 dürüstlük yöntemi: cümle-içi çerçeveleme.** Sonuç/sayı iması taşıyan ana sayfa metinleri (sektör sonuçları, forum vaka başlıkları, panel metrikleri) cümlenin içinde öngörü/örnek olarak çerçevelenir; mevcut `proof.note` şemsiye olarak kalır. Ayrı rozet/etiket EKLENMEZ (clutter yok — craft korunur).
- **R4/F6 hero ikincil CTA: "İşleyen örnekleri gör".** CTA #sectors'a kaydırır; çıktı-odaklı, marka sesine yakın etiket. Sabit çapalar korunur (Hero "İşinizi analiz ederiz. Sonra otomatikleştiririz.", birincil CTA "Ücretsiz keşif görüşmesi al.").

### Kullanıcı Tercihleri

- **Dil teslim katmanı:** Revize TR'de tamamlanır (tek kaynak). EN/AR/DE/ES o anda güncellenmez — stale kopya (aynı anahtar, eski metin) geçici kabul; ancak **yeni yapısal anahtar** (4. adım) 5 dile de eklenir (eksik anahtar = runtime boşluk/hata, yasak). Nihai çeviri versiyon-sınırında.
- **Marka sesi (pazarlık dışı):** çıktı-odaklı, sade, kendinden emin, metafor yok. Yasaklar: doktor/teşhis/reçete metaforu, zayıf/edilgen adım adı ("Dinle/Listen"), lorem/dolgu, **sahte** "● online/canlı" presence-tiyatrosu. Gerçek canlı ürün göstergesi (Alpfit rozeti) yasağın dışında — dürüst (DECISIONS 2026-06-28).
- **Cerrahi yaklaşım:** Güçlü bölümler (5 sektör, Credibility, Forum ana metni, Hero ana metni) korunur; iş R1/R2/F5/F6'da yoğunlaşır.

### Kapsam Dışı

- **Görsel cila (sonraki versiyon):** A1 logo hizalama, A3 CTA kartı affordance + scroll-göstergesi ölçekleme (kartlar zaten `<Link>` — sorun görsel), B1 Living Flow yeşil nabızlarının sayfa-aşağı kapsamı.
- **Alt sayfalar:** Alpfit (`/spor-salonu-yazilimi`), Crew OS showcase (`/bunker-os`), vaka çalışmaları, forum derin içerik — v0.1 dışı.
- **Crew OS public URL kararı** (`/bunker-os` → `/crew-os` + redirect): görsel/SEO versiyonuna ertelendi (M6 açık konu).
- **Çeviri senkronu:** TR-dışı dillerin nihai çevirisi bu fazda yapılmaz (versiyon-sınırı).
- **Test altyapısı (D1), Umami (E1), gerçek metrik/vaka verisi (C4):** v0.1 dışı; ayrı iş kalemleri.
- **R2 component-vs-i18n yüzeyi:** gym gövde değişiminin saf i18n mi yoksa `SectorSolutions.tsx` gym-özel render yolunu da etkilediği research-phase'de netleşecek (kapsam notu — discuss kararı değil).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase` oturumunda dolduruldu (2026-06-28). Tüm bulgular kaynak koda dayandırıldı (HowItWorks/SectorSolutions/Hero/Forum/Bunker + `messages/*.json`, 5 dil paralellik kontrolü). Karar gerektiren 2 nokta kullanıcıya soruldu (R1 i18n doldurma → **Cerrahi**; F5 kapsamı → **Doğrulama checkpoint**).
>
> **Net sonuç:** Fazın gerçek kod/içerik iş yükü = **R1** (tek component değişikliği + i18n restructure) + **R2** (gym i18n metni) + **F6** (hero CTA metni). **R3 ve F5 = doğrulama checkpoint'leri** (kod yok). PRD'nin öngördüğünden daha dar ve net.

### Değerlendirilen Yaklaşımlar

**R1 — i18n anahtar stratejisi (3→4 adım restructure):**
- **Yaklaşım A — Semantik rename (discuss kararı):** anahtarlar yeni semantiğe göre yeniden adlandırılır (aday: `analyze`/`design`/`automate`/`report`). **Artı:** anahtar adı ↔ içerik tutarlı, yanıltıcı `find`="Çözüm" kalıntısı yok (bakım/kalıcılık — ILKELER, QUALITY §5). **Eksi:** component anahtarı *adıyla* okuduğundan **5 dilin de dokunması zorunlu** (non-TR'de eski anahtar → eksik anahtar → runtime boşluk/hata; "stale kopya" kuralı anahtar-adı değişiminde geçmez).
- **Yaklaşım B — Minimal (legacy ad koru, yalnız 4. anahtar ekle):** `listen`/`find`/`automate` kalır, `report` eklenir. **Artı:** en küçük 5-dil ayak izi. **Eksi:** `find` artık "Çözüm" içeriği taşıyacağından anahtar adı aktif yanıltıcı (drift, kalıcılık ihlali). **Reddedildi** (discuss).
- **Seçilen: A.** Non-TR doldurma (kullanıcı kararı 2026-06-28): **Cerrahi** — 5 dilde anahtarları rename et; eşleşen 3 adımı (Analiz←`listen`, Otomasyon←`automate`, Raporlama←`automate`'in ölçüm kuyruğu — 5 dilde zaten çevrili) mevcut çevirilerden **stale-kopya** olarak taşı; **yalnız yeni "Çözüm" adımını** non-TR'de şimdi çevir (kaçınılmaz tek yeni çeviri). Versiyon-sınırı politikasını maksimum korur.

**R2 — gym gövde değişimi yüzeyi (discuss açık sorusu çözüldü):**
- **Bulgu: saf i18n.** [SectorSolutions.tsx](../../src/components/SectorSolutions.tsx) panel sol tarafı (`name`/`automation`/`body`, satır 85-114) tüm sektörler için tek jenerik render yolu; gym-özel dallar (`PAGES`→"Uygulamayı incele", "Canlı—Alpfit" rozeti satır 118-126, "Canlı ürünü gör" linki satır 139-148) gövde metninden bağımsız ve discuss kararınca korunuyor. **Seçilen:** component'e dokunmadan yalnız `sectors.items.gyms.automation` + `.body` TR metin değişimi.

**F5 — dürüstlük kapsamı (ana sayfa):**
- **Bulgu:** PRD'nin saydığı ihlaller (`forum.articles.one/two` — "…2 günden 10 dakikaya **indirdik**" / "no-show'u **yarıya düşürdük**") ve şemsiye `proof.note` ana sayfada **render EDİLMİYOR** (ölü anahtar — `src/`de tüketim yok). Render edilen tek sayı-imalı metin: `forum.featured.excerpt` "110.000$+" (sektör/pazar çerçevesi, "vaat ediyor" der — Kiwi müşteri sonucu değil) + "7/24" yetenek tanımı. Ana sayfa F5 riski **düşük**.
- **Seçilen (kullanıcı 2026-06-28): doğrulama checkpoint** — kod-suz; ana sayfada uydurma müşteri-sonucu okunan metin olmadığını teyit et. Ölü anahtarlara dokunma (v0.1-dışı hijyen notu).

### Kullanılacak Araçlar/Kütüphaneler
- **Yeni bağımlılık YOK.** Tüm iş mevcut stack ile: next-intl (`useTranslations`), mevcut GSAP/ScrollTrigger (HowItWorks bağlayıcı), Tailwind v4 grid utility'leri. Değişen yüzey: içerik (`messages/*.json`) + tek component düzeni (`HowItWorks.tsx`).

### Dikkat Edilecekler

> Precondition tanımlayıcıları + kaynak (repoda-tanımlı→site / yeni / dış). Research kaydeder, verify-plan doğrular.

- **5-dil eksik-anahtar tuzağı (R1):** rename sonrası 5 dilde de yeni anahtar seti tam olmalı; biri eksikse o dilde runtime boşluk/hata. Anahtarlar `how.steps.{analyze,design,automate,report}.{n,title,body}` → **yeni adlandırma** (mevcut `listen/find/automate` repoda-tanımlı: `messages/{tr,en,ar,de,es}.json`; tüketim `src/components/HowItWorks.tsx:15`). Doğrulandı: 5 dilde `listen/find/automate` var, `report` hiçbirinde yok.
- **HowItWorks layout/connector (R1 craft):** grid `sm:grid-cols-3` (`src/components/HowItWorks.tsx:75`) → 4-sütun responsive; dekoratif bağlayıcı SVG path (`src/components/HowItWorks.tsx:65-72`) 3 düğüm için çizili → 4 düğüme göre hizalanmalı (aria-hidden ama craft üst eksen). `n` alanına "04" eklenir; reduced-motion guard (satır 24) korunur.
- **R2 korunan gym dalları:** `PAGES.gyms="/spor-salonu-yazilimi"` (`SectorSolutions.tsx:13`), live rozeti + seeLive linki (satır 118-148) gövde değişiminden ETKİLENMEMELİ. Yalnız `sectors.items.gyms.automation` + `.body` (repoda-tanımlı, `messages/*.json`) değişir; `gyms.flow.*` zaten doğru → dokunulmaz.
- **F6:** `hero.ctaSecondary` (repoda-tanımlı, `messages/*.json`; tüketim `Hero.tsx:81`). Link hedefi `#sectors` zaten doğru (`Hero.tsx:77`) → yalnız TR metin değişir, non-TR stale kabul.
- **R3 doğrulama:** `bunker.{title,body,points,flows}` (repoda-tanımlı, `messages/*.json`; tüketim `Bunker.tsx`) → değişiklik yok, F5 taramasında teyit.
- **Ölü anahtarlar (v0.1-dışı hijyen):** `forum.articles.{one..four}`, `proof.{label,note}` (repoda-tanımlı ama render edilmiyor). Dokunulmaz; ileride `forum.articles` render edilirse başlıkları (R/sonuç iması) F5 düzeltmesi gerektirir.
- **Versiyon-sınırı ayrımı:** R1 = anahtar *adı* değişimi → 5 dil zorunlu (eksik anahtar yasak). R2/F6 = aynı anahtar, değişen *değer* → non-TR stale-kopya kabul (yalnız TR güncellenir).

### Teknik Kararlar
- **R1: semantik rename + cerrahi non-TR doldurma.** Final anahtar adları plan/execution'da kesinleşir (aday: `analyze/design/automate/report`). İçerik haritası: Analiz←`listen`(+`find` eritilir), Çözüm=sıfırdan yeni, Otomasyon←`automate` (ölçüm kuyruğu hariç), Raporlama←`automate`'in ölçüm kuyruğu.
- **R1 yalnız `HowItWorks.tsx` değişir** (adım dizisi satır 15 + grid satır 75 + connector satır 65-72); başka component yok.
- **R2 = saf i18n** (`SectorSolutions.tsx` değişmez).
- **R3 + F5 = doğrulama checkpoint** (kod yok); F5 ana sayfa riski düşük (ölü anahtar bulgusu, kullanıcı onayı).
- **F6 = tek i18n metin değişimi** (`Hero.tsx` değişmez).
- **Yeni bağımlılık yok.**

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 1.01 | TASK-1.01 | ✅ Tamamlandı | R1 — Nasıl Çalışır 3→4 adım (Analiz·Çözüm·Otomasyon·Raporlama): `HowItWorks.tsx` + 5-dil i18n restructure (atomik) |
| 1.02 | TASK-1.02 | ✅ Tamamlandı | R2 — Sektörler gym paneli tek-otomasyona (`sectors.items.gyms.automation`+`.body` TR; saf i18n, component dokunulmaz) |
| 1.03 | TASK-1.03 | ⬜ Bekliyor | R4 — Ana sayfa ses & dürüstlük: F6 hero ikincil CTA (TR) + F5 dürüstlük taraması + R3 Crew OS teyidi (doğrulama checkpoint) |

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

**Oluşturulma:** 2026-06-28
**Son Güncelleme:** 2026-06-28 — plan-phase: 3 task dokümanı oluşturuldu (1.01 R1 atomik / 1.02 R2 saf-i18n / 1.03 R4 F6+F5/R3 checkpoint); Task Listesi dolduruldu.
