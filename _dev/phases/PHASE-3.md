# Phase 3: v0.1 Versiyon-Sonu Senaryo Testi

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.1'in (ana sayfa TR içerik & ses revizesi) versiyon-sonu **Senaryo Testi** fazı — zorunlu `prd-review` öncesi son kapı. Faz 1 (içerik) ve Faz 2 (teknik borç) **task-seviyesi** UAT'larının (15 + 14 senaryo) göremediği **dikişleri, tam kullanıcı yolculuklarını, mod kombinasyonlarını ve adversarial durumları** uçtan-uca doğrular. İş **doğrulama**: yeni içerik/feature üretilmez. Bulgu çıkarsa kapsam-içi (ana sayfa) gerçek bug'lar düzeltme task'ı olur; kapsam-dışı / zaten-ertelenmiş kalemler kaydedilip yönlendirilir.

**Milestone:** *(Faz 2 dersi uygulandı: versiyon-sonu doğrulama milestone'u "ölç + kaydet + karar ver" olarak yazılır — geçiş peşinen varsayılmaz.)*
1. Ana sayfa uçtan-uca senaryo kataloğu (S1–S8) otonom koşuldu;
2. her senaryonun sonucu (geçti / bulgu) kayıt altına alındı;
3. bulgular **triyaj** edildi — kapsam-içi gerçek bug'lar düzeltme task'ına, kapsam-dışı / ertelenmiş kalemler sahipli kayda;
4. **TR yolculuğu birincil** olarak bütünsel-tutarlı doğrulandı + **non-TR yüzeyleri tutarlı** (parite / render bütünlüğü / AR-RTL aynalama; bilinçli-stale değerler görünür kopukluk yaratmıyor) teyit edildi.

### Feature Listesi

(Senaryo testi çapraz/doğrulama fazıdır — "feature" değil **senaryo grupları (validation units)**; her grup tetiklediği birincil modüle eşlenir. MODULE-MAP ve modules/ referansı: M1–M6.)

| Senaryo Grubu | Modül | Açıklama |
|---------------|-------|----------|
| S1: Giriş noktaları & yönlendirme matrisi | M4 (+M6) | 5 dil ana sayfa (TR prefixsiz + /en /ar /de /es), bilinmeyen locale fallback, `/forum`→`/bulten` redirect (+slug), derin-link `/en#sectors`, URL varyantları |
| S2: Tam TR yolculuğu (top→bottom) | M2 (+M3) | Hero → ikincil CTA "İşleyen örnekleri gör" → sektörler (gym tek-otomasyon + Alpfit rozeti/CTA) → 4-adım → Crew OS → Forum → Footer; CTA hedefleri doğru, kopuk link/boş bölüm yok |
| S3: Mod kombinasyonları (Living Flow degradasyon) | M1 (+M3) | light/dark (FOUC yok), reduced-motion (statik SVG, içerik gizli kalmaz), no-WebGL (StaticFlow), mobil "low", **AR-RTL × dark × reduced birlikte**, 320/768/1440 taşma yok + near-zero CLS |
| S4: Kontroller & kalıcılık | M3 (+M1/M4) | tema toggle (localStorage + reload kalıcılık + Living Flow uniform), dil-switcher (path+anchor koru, klavye/Escape/dış-tık), **klavye-only yolculuk** + focus-visible yeşil outline |
| S5: Taksonomi & dürüstlük tutarlılığı (çapraz/sahipsiz) | M2 (+M4) | "Crew OS" her yüzeyde / "Bunker OS" hiçbir görünür yüzeyde yok (5 dil); render'da uydurma müşteri-sonucu / sahte "● online" / yasak metafor yok |
| S6: 5-dil bütünlük & non-TR tutarlılığı (versiyon-sonu çekirdek) | M4 (+M2) | parite 183 (MISSING_MESSAGE yok), TD1-senkron 3 kalem hizalı, **bilinçli-stale non-TR tutarlı mı** (anahtar var, render bütün, yarım-çeviri kopukluğu yok), AR-RTL aynalama |
| S7: Chatbot (0-token: offline + sanitizasyon) | M5 | key-yok offline UI (sahte-online-yok) + sanitizasyon kod-inceleme + malformed-input kısa-devre (rol enjeksiyonu / boş / sonda-user-yok → API'ye ulaşmadan red) + stream-kopması UI takılmaz |
| S8: Adversarial / holistik kırma | tümü | JS-kapalı SSG okunabilirlik, hızlı dil/tema toggle race, hızlı scroll/anchor zıplama (ScrollTrigger kararlılığı), `next build` temiz (regresyon tabanı) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 3` oturumunda dolduruldu (2026-06-28).

### Alınan Kararlar

- **Faz tipi = versiyon-sonu Senaryo Testi (sabit faz).** Versiyon Sonu Durumu: `senaryo_testi`. v0.1'in zorunlu `prd-review` öncesi uçtan-uca doğrulaması. Doğrulama fazı — yeni feature üretilmez; çekirdek soru: task-UAT'larının göremediği dikiş/yolculuk/çapraz/adversarial katmanda v0.1 tutarlı mı.
- **Kapsam sınırı = ana sayfa uçtan-uca + çıkışlar** (kullanıcı kararı). v0.1 ana sayfa yolculuğu derinlemesine; CTA/nav/chatbot/dil-tema geçişlerinin doğru çalıştığı teyit edilir, ama alt sayfalar (Alpfit, Crew OS showcase `/bunker-os`, vaka, bülten) **derin denetlenmez** — yalnız çıkış linkinin doğru açıldığı kontrol edilir. Gerekçe: v0.1 = ana sayfa revizesiydi (her iki faz retrosunda alt sayfalar bilinçle v0.1-dışı); cerrahi felsefe + "az context = yüksek kalite".
- **TR birincil öncelik** (kullanıcı kararı 2026-06-28). TR yolculuğu derin/bütünsel doğrulanır; non-TR (EN/AR/DE/ES) yalnız **tutarlılık** katmanında (parite + render bütünlüğü + AR-RTL aynalama) — içerik-kalite derin denetimi DEĞİL. "Bilinçli-stale non-TR değerleri görünür kopukluk yaratıyor mu?" in-scope; stale içeriğin *kalitesi* out-of-scope (versiyon-sınırına ertelendi — ILKELER "TR tek kaynak", DECISIONS 2026-06-27 dil stratejisi).
- **Test modu = otonom** (kullanıcı kararı). Playwright/curl/grep ile mekanik yürütme; bulgular kullanıcıya raporlanır. Önceki iki fazla tutarlı (proje genelinde test altyapısı yok — QUALITY §8 aspirasyonel).
- **Bulgu politikası = keşfet + kaydet + triyaj** (kullanıcı kararı). Kapsam-içi (ana sayfa) gerçek bug → bu fazda düzeltme task'ı. Kapsam-dışı veya zaten-ertelenmiş (a11y/perf açığı, alt sayfa, `/bunker-os` route) → sahipli kayıt + yönlendirme, burada yeniden açılmaz. Bilinen a11y/perf açığı (a11y 89: marka-yeşili kontrast + geçersiz `<dl>` + dil-switcher aria-mismatch; mobil perf 87 / LCP 3.1s — DECISIONS 2026-06-28) senaryo testte yüzeye çıkarsa **"sahipli/ertelenmiş"** işaretlenir, yeniden litige edilmez.
- **Chatbot = 0-token (offline + sanitizasyon)** (kullanıcı kararı). API maliyeti gereksiz çünkü: (a) v0.1 chatbot'a hiç dokunmadı → bu versiyonun getirdiği regresyon riski yok; (b) canlı streaming yolu prod'da (kiwiailab.com) zaten kanıtlı; (c) 0-token test değeri zaten degradasyon + güvenlik tarafında. **Lisans gerçeği:** site `@anthropic-ai/sdk` + `ANTHROPIC_API_KEY` (token-başına ücretli Anthropic API) kullanır; Claude.ai / Claude Code aboneliği bu sunucu-taraflı SDK çağrısını **kimlikleyemez** (ayrı faturalama sistemi) — mevcut lisans chatbot'u besleyemez. Test yüzeyi: key-yok zarif offline yolu (QUALITY §6 kabul kriteri) + girdi sanitizasyonu kod-incelemesi + malformed-input kısa-devre (rol whitelist / boş-filtre / son-12-mesaj / sonda-user-zorunlu → API'ye ulaşmadan). **Sıfır API çağrısı.** Canlı happy-path bu fazda test edilmez.
- **Milestone "ölç + kaydet + karar ver" çerçevesinde yazıldı** (Faz 2 dersi). Geçiş peşinen varsayılmaz: milestone "tüm senaryolar geçer" değil; "senaryolar koşulur + bulgular kaydedilir + triyaj edilir + TR bütünsel / non-TR tutarlı teyit edilir".

### Kullanıcı Tercihleri

- **Öncelik TR** (2026-06-28): "şu an önceliğimiz TR". Odak TR yolculuğu; non-TR tutarlılık-kontrolü düzeyinde kalır.
- **API maliyetine karşı**: chatbot canlı test edilmez; 0-token yol seçildi.
- **Senaryo kataloğu yeterli**: kullanıcı ek persona / kırılma-noktası eklemedi ("bu işler yeterli gibi"). S1–S8 iskeleti onaylandı.

### Kapsam Dışı

- **Alt sayfa derin denetimi** (Alpfit `/spor-salonu-yazilimi`, Crew OS showcase `/bunker-os`, vaka `/vaka-calismalari`, bülten `/bulten/*`) — yalnız çıkış-linki doğruluğu kontrol edilir; içerik/etkileşim derin test edilmez (v0.1 dışı).
- **Canlı chatbot streaming testi** — 0-token kararı (canlı yol prod'da kanıtlı + v0.1'de dokunulmadı). Merge sonrası prod gözle-doğrulama normal disiplinle yapılır (memory Süreç Disiplinleri).
- **non-TR içerik-kalite derin denetimi** — bilinçli-stale (versiyon-sınırı); yalnız tutarlılık (parite / render / RTL) test edilir.
- **Bilinen a11y/perf açığının düzeltilmesi** (a11y 89, mobil perf 87 / LCP 3.1s) — sahipli/ertelenmiş (DECISIONS 2026-06-28, adanmış a11y/perf fazı/versiyonu). Senaryo testte çıkarsa kaydedilir, düzeltilmez.
- **`/bunker-os` → public `/crew-os` + redirect kararı** (M6 açık konu) — görsel/SEO versiyonuna ertelendi.
- **Test altyapısı kurulumu (D1)** — adanmış teknik faz adayı; "test = otonom UAT" geçici.
- **Yeni içerik/feature** — senaryo testi doğrulama fazıdır, üretim yapmaz (bulgu → düzeltme task'ı istisnası hariç).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 3` oturumunda doldurulur.

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
| 3.01 | TASK-3.01 | ⬜ Bekliyor | (plan-phase'de yazılır) |

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
| Erişilebilirlik | ✅ / ⚠️ / ❌ | ... |
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
**Son Güncelleme:** 2026-06-28 — discuss-phase 3: Kapsam Tartışması yazıldı (ana sayfa uçtan-uca, TR öncelik, otonom, keşfet+kaydet+triyaj, chatbot 0-token); senaryo kataloğu S1–S8 onaylandı.
