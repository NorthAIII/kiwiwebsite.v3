# Phase 1: Ana Sayfa TR İçerik & Ses Revizesi (v0.1)

**Durum:** ✅ Tamamlandı

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
| 1.03 | TASK-1.03 | ✅ Tamamlandı | R4 — Ana sayfa ses & dürüstlük: F6 hero ikincil CTA (TR "İşleyen örnekleri gör") + F5 taraması TEMİZ + R3 Crew OS teyidi GEÇTİ (kodsuz) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

**Tarih:** 2026-06-28
**Toplam Senaryo:** 15 | **Geçen:** 15 | **Kalan:** 0
**Test modu:** Otonom (curl render doğrulama + Playwright snapshot/screenshot/etkileşim + grep). Production build (port 3137, SSG prerender) üzerinde.

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | **R1 TR 4 adım render:** TR `/` "Nasıl Çalışır" 4 kart gösterir — 01 Analiz · 02 Çözüm · 03 Otomasyon · 04 Raporlama; başlık "Dört adım, çalışan tek bir sistem." | ✅ Geçti | curl+Playwright: başlık + 4 kart + 01-04 doğrulandı; eski "Üç adım"/"Tespit" yok |
| 2 | **R1 örtüşmesizlik:** Otomasyon adımı yalnız otomasyonu anlatır, ölçüm "Raporlama"ya ayrıldı; Analiz eski listen+find eritilmiş; 4 adım içerikçe örtüşmüyor (R1 amacı) | ✅ Geçti | Otomasyon gövdesi ölçüm cümlesi taşımıyor; Raporlama "kazanç varsayılmaz, ölçülür"; Analiz "sızma tespiti" eritmesi içeriyor |
| 3 | **R1 5-dil anahtar paritesi:** `/en` `/ar` `/de` `/es` 4 kart render eder, boş/eksik metin yok (eksik anahtar yasak); `design`(Çözüm) her dilde çevrili; non-TR 03 Otomasyon ≠ 04 Raporlama (ölçüm cümlesi tekrar etmiyor) | ✅ Geçti | 5 dilde `how.steps`=[analyze,automate,design,report] birebir; design 4 dilde çevrili (Design/التصميم/Entwerfen/Diseñar); automate≠report (tekrar yok, 5 dil teyidi) |
| 4 | **R1 craft — responsive grid + connector:** Desktop'ta 4 eşit sütun + bağlayıcı SVG 4 düğüme hizalı; tablet/mobilde kademeli (sm:2 / 1 sütun) taşmasız; "04" numarası görünür | ✅ Geçti | grid: 1440→4 sütun (connector görünür) · 768→2 · 375→1; hiçbir kırılımda yatay taşma yok; ekran görüntüsü craft kalitesinde (Fraunces, restraint) |
| 5 | **R1 reduced-motion + a11y:** `prefers-reduced-motion: reduce`'da connector animasyonu çalışmaz, 4 adım statik okunur; başlık h2/adım h3 semantik hiyerarşi, connector SVG `aria-hidden` | ✅ Geçti | SSG HTML'de 4 kart JS/motion olmadan render; kaynakta reduced-motion early-return guard; `<section id="how">`+h2+4×h3+aria-hidden SVG teyidi |
| 6 | **R2 gym tek-otomasyon:** Sektörler `gyms` panelinde sol taraf "Kaçan üyeyi geri kazanma" + tek-otomasyon anlatısı (özellik-listesi DEĞİL); bölümün `sub` sözüyle ("özellik listesi değil") tutarlı | ✅ Geçti | yeni başlık+gövde render; eski "Spor Salonu Yönetim Yazılımı"/"hepsi tek panelde" yok; 6 sektörün tamamı tek-otomasyon başlığı taşıyor |
| 7 | **R2 korunan gym dalları:** "Canlı — Alpfit" rozeti + "Canlı ürünü gör" + "Uygulamayı incele" (→ `/spor-salonu-yazilimi`) + sağ akış (trigger/action/result) gövde değişiminden etkilenmeden duruyor | ✅ Geçti | Alpfit rozeti + flow trigger "Bir üye 30 gündür giriş yapmadı" + `/spor-salonu-yazilimi` linki korundu |
| 8 | **R2 diğer 5 sektör korunur:** klinik · e-ticaret · emlak · eğitim · restoran panelleri değişmeden render eder (yalnız gym TR metni değişti) | ✅ Geçti | 6 sektör adı + automation başlığı render (education/restaurants `&amp;` HTML-escape'li, doğru); klinik "Gelmeyen randevuyu kurtarma" sağlam |
| 9 | **R3 taksonomi:** Crew OS bölümünde bayrak adı her yüzeyde "Crew OS"; "Bunker OS" hiçbir render yüzeyinde görünmüyor; "Keşfet" linki `/bunker-os`'a gidiyor (route iç ad — bilinçli, M6 ertelendi) | ✅ Geçti | TR+AR render'da "Crew OS" görünür; "Bunker OS" literal'i messages/+src/'de yok; `/bunker-os` route linki mevcut |
| 10 | **R4/F6 hero ikincil CTA:** Hero'da "İşleyen örnekleri gör" etiketi; tıklayınca `#sectors`'a kayar; eski "Canlı gör" hiçbir yerde yok; sabit çapalar (başlık + birincil CTA "Ücretsiz keşif görüşmesi al") korundu | ✅ Geçti | Playwright tıklama: scroll 0→1785px, #sectors viewport tepesinde; href="#sectors"; çapalar korundu; "Canlı gör" yok |
| 11 | **R4/F5 dürüstlük konvansiyonu:** Ana sayfada render edilen sonuç/sayı-imalı metin (Hero stats, 6 sektör, Crew OS panel, Forum "110.000$+") gerçek-veri ya öngörü/örnek çerçevesinde — uydurma müşteri-sonucu yok; ekstra rozet/etiket eklenmemiş (cümle-içi çerçeveleme) | ✅ Geçti | Görünür DOM'da uydurma müşteri-sonucu yok; "110.000" pazar-maliyeti çerçevesi; `%X arttı`/sahte "● online" yok. **Not:** ölü anahtarlar (`forum.articles` "…indirdik/düşürdük") yalnız hydration JSON payload'ında, görünür DOM=0 — research'te v0.1-dışı hijyen olarak not edilmiş, render edilmiyor |
| 12 | **i18n routing + fallback:** TR `/` prefixsiz çalışır, diğer diller `/en` `/ar` `/de` `/es`; bilinmeyen locale segmenti (örn. `/zz`) güvenli davranır (404/fallback, runtime patlamaz) | ✅ Geçti | 5 locale 200; bilinmeyen `/zz`→404 (runtime patlamadı) |
| 13 | **AR RTL bütünlük:** `/ar` `<html dir="rtl">`; "Nasıl Çalışır" 4 adım + sektör panelleri RTL'de okunabilir ve doğru aynalanır | ✅ Geçti | `dir="rtl"`+`lang="ar"`+body direction rtl; 4 adım Arapça çevrili; ekran görüntüsü: layout doğru aynalanmış (01 sağ→04 sol), logical `start` ile sağ-hiza, Crew OS adı korunmuş |
| 14 | **Marka sesi & yasaklar:** Yeni/değişen TR metinde yasak metafor yok (doktor/teşhis/reçete), zayıf/edilgen adım adı yok ("Dinle/Listen"), lorem/dolgu yok, sahte "● online" presence yok; ses çıktı-odaklı/sade | ✅ Geçti | teşhis/reçete/hekim/doktor/Dinle/lorem render'da yok; `placeholder=` yalnız form input attribute'u (görünür dolgu değil); ses çıktı-odaklı |
| 15 | **Regresyon tabanı:** `next build` temiz; ana sayfanın diğer bölümleri (Hero/Forum/Credibility/Footer/Chatbot) + alt sayfalar kırılmadı; CLS/layout shift gözle regresyonsuz | ✅ Geçti | build exit 0 "Compiled successfully"; alt sayfalar (spor-salonu/bunker-os/vaka/bülten) 200; Forum+Credibility+Footer render; gözle regresyon yok |

### Otomatik Kontrol Bulguları (Adım 1)

- **CI/CD:** Yapılandırılmamış (`.github/` yok). Vercel yalnız `main` push'ta deploy eder; bu faz `revize/devflow-kurulum` branch'inde → CI çalışmadı (beklenen).
- **Otomatik analiz araçları:** dependabot/renovate/scanner yapılandırılmamış (yok).
- **`next build`:** ✅ Temiz (exit 0, "Compiled successfully in 932ms"; `MISSING_MESSAGE`/`IntlError` yok; 5 locale prerender geçti).
- **Security-review:** ✅ Bulgu yok. Faz yüzeyi yalnız i18n metin + presentational component (`HowItWorks.tsx` grid/SVG/className); kullanıcı girdisi/auth/secret/injection/`dangerouslySetInnerHTML` yüzeyi yok, yeni bağımlılık yok.
- **Sonuç:** Otomatik kontrollerden **bulgu çıkmadı** → düzeltme task'ı yok.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase` oturumunda dolduruldu (2026-06-28).

### Ne İyi Gitti?
- **Cerrahi kapsama disiplini.** research-phase, PRD'nin geniş F5/R3 kapsamını "doğrulama checkpoint'i (kod yok)"a daralttı; faz gerçek iş yükü R1 + R2 + F6'ya indi. Sonuç: 3 küçük task, her biri tek oturumda bitti, şişme yok.
- **Atomik task tasarımı işe yaradı.** R1'de 5-dil i18n + 1 component tek task/tek commit indirildi; component anahtarı *adıyla* okuduğu için (`HowItWorks.tsx:15`) ayrı commit'lere bölünseydi ara durum kesin kırılırdı (eksik anahtar → runtime boşluk). Bağımlı değişikliği bir arada tutma kararı kırığı önledi.
- **Checkpoint ≠ task ayrımı.** R3 ve F5 ayrı task'e bölünmeyip TASK-1.03'te doğrulama adımı olarak ele alındı; tek-satırlık standalone task şişmesi önlendi, yine de bulgular kayda bağlandı (F5 tarama tablosu).
- **Kararlar sessizce çözülmedi, kullanıcıya getirildi.** "● online" yasağının niyet-bazlı yorumu ve i18n rename'in "stale kopya" istisnası dışında olması — ikisi de DECISIONS'a kararla bağlandı, varsayımla geçilmedi.
- **Otonom UAT derinliği.** Test altyapısı yokken curl render + Playwright snapshot/screenshot/etkileşim + grep ile 15 senaryo gözle değil mekanik doğrulandı (5-dil parite, RTL aynalama, reduced-motion, scroll davranışı dahil).

### Ne Kötü Gitti?
- **Büyük bir aksaklık olmadı.** Küçük bir an: TASK-1.01'de `BunkerShowcase.tsx`'in de `how.steps.${k}` okuduğu izlenimi düz grep'ten doğdu; namespace kontrolüyle (`bunkerOs.how` ayrı namespace) çözüldü. Yanlış geniş bir değişimden namespace doğrulaması kurtardı — ders aşağıda (Task-Spesifik).
- **Versiyon-sınırı stale birikimi (kontrollü ama biriken borç).** R1/R2/F6 sonrası non-TR flagship sayfaları artık *yeni yapı + eski içerik* karışımı gösteriyor (örn. AR/EN/DE/ES gym paneli hâlâ eski özellik-listesi, hero CTA hâlâ eski etiket). Bilinçli ve doğru (DECISIONS 2026-06-27) ama en görünür stale yüzey; versiyon-sonu çeviri taraması bunu **bütüncül** kapatmalı.

### Sonraki Faz İçin Öneriler
- **Bu, v0.1'in son içerik fazıydı** → sıradaki versiyon-sonu sabit fazı **Teknik Borç Kapatma**. Bu fazda toplanması gereken biriken kalemler:
  - **Non-TR çeviri senkronu** (R1 değer tarafı + R2 gym + F6 hero CTA stale değerleri) — versiyon-sınırı politikasının teslim noktası.
  - **Ölü anahtar hijyeni:** `forum.articles.{one..four}`, `proof.{label,note}` render edilmiyor; `forum.articles` ileride render edilirse başlıkları F5 düzeltmesi gerektirir (sonuç-iması). Backlog'a alınmalı.
  - **`/bunker-os` → public `/crew-os` + redirect:** iç ad URL'de sızıyor; görsel/SEO versiyonuna ertelendi (M6 açık konu) — teknik borç fazında değerlendir.
  - **Test altyapısı (D1):** "test = build + gözle UAT" geçici; altyapı kurulumu ayrı teknik faz adayı.
- **i18n değişiminde anahtar-adı/yapısal değişim 5 dili eşzamanlı dokunmayı zorunlu kılar** (yalnız değer değişimi ertelenebilir) — memory Süreç Disiplinleri'nde keskinleştirildi; sonraki fazda plan/icra aşamasında uygula.

### Task-Spesifik Teknik Öğrenimler
<!-- Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar (araç davranışı, framework bug'ı, vb.). MEMORY.md'nin değil, faz retrosunun evidir. -->
- **next-intl aynı token şekli farklı namespace'lerde yaşar.** `how.steps.*` hem `how` (HowItWorks) hem `bunkerOs.how` (BunkerShowcase, platform 4-adımı) altında var. Anahtar değiştirirken tüketiciyi `useTranslations(...)` namespace bağlamıyla doğrula — düz grep yanıltır (iki ayrı 4-adım birbirine karışabilir).
- **Stale-kopya çeviriyi em-dash'ten bölmek içerik tekrarı üretebilir.** non-TR `automate` gövdesi tek cümlede `[otomasyon] — [ölçüm]` taşıyordu; `automate`/`report`'a *bölünürken* (kopyalanmadan) her parça standalone yapıldı, minimal gramer (özne ekleme) gerekti — bu yeni çeviri değil, mevcut çeviriyi bölme.

## Kalite Kontrol Sonuçları

> QUALITY.md'nin 8 ekseni sistematik kontrol edildi. Faz yüzeyi: i18n metin + tek presentational component (grid/SVG/className) — kullanıcı girdisi/auth/secret/yeni bağımlılık yok.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ | 4-adım responsive grid (1/2/4) + bağlayıcı SVG 4 düğüme yeniden hizalandı; Fraunces/restraint korundu; yasak metafor/zayıf adım adı/sahte presence yok (UAT #4, #14). Cümle-içi dürüstlük çerçevesi — ekstra rozet/clutter eklenmedi. |
| Erişilebilirlik | ✅ | Semantik h2/adım h3 hiyerarşisi; bağlayıcı SVG `aria-hidden`; reduced-motion early-return guard korundu (statik 4 adım okunur); AR RTL doğru aynalanmış (UAT #5, #13). |
| Performans | ✅ | Yeni bağımlılık yok; değişim saf i18n + presentational. Ekstra rAF/re-render yok (GSAP tek ticker dokunulmadı); Living Flow/lazy WebGL etkilenmedi. LCP/CLS tabanı regresyonsuz (UAT #15). Not: Lighthouse ayrıca ölçülmedi — yüzey metin/sunum olduğundan regresyon riski ~sıfır. |
| Yerelleştirme & RTL | ✅ | 5-dil `how.steps` paritesi tam (review'da bağımsız doğrulandı); başlık sayı-sözcüğü 5 dilde güncel; AR RTL logical `start` ile doğru; R2/F6 = değer değişimi → non-TR stale-kopya politikası doğru çalışıyor (eksik anahtar yok) (UAT #3, #13). |
| Modülerlik & Bakım Maliyeti | ✅ | Semantik rename (`analyze/design/automate/report`) anahtar-adı↔içerik tutarlılığını artırdı (yanıltıcı `find`="Çözüm" kalıntısı yok). R2/F6 component'in jenerik render yolunu yeniden kullandı, dallanma/kopya kod eklenmedi. |
| Hata Yönetimi & Degradasyon | ✅ | 5 dilde eksik anahtar yok → runtime boşluk/hata yok (build prerender 5 locale geçti); reduced-motion fallback; bilinmeyen locale (`/zz`) 404, runtime patlamadı (UAT #12). Chatbot/WebGL degradasyon yolları bu fazda dokunulmadı. |
| Güvenlik | ✅ | Kullanıcı girdisi/auth/secret/injection/`dangerouslySetInnerHTML` yüzeyi yok; yeni bağımlılık yok. security-review temiz (UAT Otomatik Kontrol). |
| Test Kapsamı | ⚠️ N/A | Test altyapısı yok (proje geneli, aspirasyonel eksen). Doğrulama: `next build` temiz + otonom UAT (curl/Playwright/grep). Altyapı kurulumu ayrı teknik faz adayı (D1) — bu fazın eksikliği değil, proje-geneli durum. |

**Kullanıcı yolculuğu & boşluk:** Hero → "İşleyen örnekleri gör" (artık dürüstçe `#sectors`'a, işleyen örneklere) → gym tek-otomasyon → 4-adım süreç → Crew OS → Forum akışı tutarlı. TR yolculuğunda kopukluk yok. Tek bilinçli boşluk: non-TR ziyaretçi yeni yapı + eski içerik karışımı görür (versiyon-sınırı borcu — sahipli: versiyon-sonu çeviri fazı). Sahipsiz/sürpriz boşluk tespit edilmedi.

---

## Sonuç

- **Tamamlanma Tarihi:** 2026-06-28
- **Toplam Task:** 3 (TASK-1.01 R1 · TASK-1.02 R2 · TASK-1.03 R4/F5/R3) — tümü ✅, arşivlendi
- **Notlar:** v0.1'in tek içerik fazı; milestone 15/15 UAT + 8/8 kalite ekseni karşılandı (Test Kapsamı N/A — altyapı yok). Düzeltme task'ı yok. Sonraki faza aktarılan biriken borç: non-TR çeviri senkronu, ölü anahtar hijyeni, `/bunker-os` public route (M6), test altyapısı (D1) → versiyon-sonu Teknik Borç fazında ele alınacak.

---

**Oluşturulma:** 2026-06-28
**Son Güncelleme:** 2026-06-28 — review-phase: retrospektif + 8 kalite ekseni yazıldı (Test Kapsamı N/A); faz ✅ tamamlandı, düzeltme task'ı yok. Biriken borç versiyon-sonu Teknik Borç fazına aktarıldı (non-TR çeviri, ölü anahtar, /bunker-os route, test altyapısı).
