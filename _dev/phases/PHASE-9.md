# Phase 9: v0.2 Versiyon-Sonu Senaryo Testi (ana sayfa + 5 alt sayfa uçtan-uca)

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-9-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** v0.2'nin (a11y & performans + teknik temel) versiyon-sonu **Senaryo Testi** fazı — zorunlu `prd-review` öncesi son kapı. v0.2 içerik fazları (4 a11y, 5 test altyapısı, 6 mobil perf, 7 Umami) ve teknik borç fazı (8 alt-sayfa derin a11y) **task/faz-seviyesi** UAT'larının göremediği **dikişleri, tam kullanıcı yolculuklarını, mod kombinasyonlarını ve adversarial durumları** uçtan-uca doğrular. **Faz 3'ten (v0.1 senaryo testi) kritik fark:** Faz 8 5 alt sayfayı ana sayfa a11y çıtasına çektiği için bu faz **ana sayfa + 5 alt sayfayı** uçtan-uca kapsar (Faz 3 yalnız ana sayfaydı). İş **doğrulama**: yeni içerik/feature üretilmez. Kapsam-içi (ana sayfa veya 5 alt sayfa) gerçek bug çıkarsa düzeltme task'ı olur; kapsam-dışı / zaten-ertelenmiş kalemler kaydedilip yönlendirilir.

**Milestone:** *(Faz 2/3/8 dersi uygulandı: versiyon-sonu doğrulama milestone'u "ölç + kaydet + karar ver" olarak yazılır — geçiş peşinen varsayılmaz.)*
1. Ana sayfa + 5 alt sayfa uçtan-uca senaryo kataloğu (S1–S9) otonom koşuldu;
2. her senaryonun sonucu (geçti / bulgu) kayıt altına alındı;
3. bulgular **triyaj** edildi — kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug'lar düzeltme task'ına, kapsam-dışı / ertelenmiş kalemler sahipli kayda;
4. **TR yolculuğu birincil** olarak bütünsel-tutarlı doğrulandı (ana sayfa + alt sayfalara çıkış/dönüş) + **non-TR yüzeyleri tutarlı** (parite / render bütünlüğü / AR-RTL aynalama; bilinçli-stale değerler görünür kopukluk yaratmıyor);
5. **v0.2 kazanım guardrail'leri regresyonsuz teyit edildi** — a11y=100 çift-tema (home + 5 alt sayfa) + axe `test:e2e` 52 yeşil · Umami script kod-tarafı tüm sayfa/locale · perf korunan taban (mobil 90/LCP 3164ms, masaüstü 100, CLS≈0) · CI (`fast`+`a11y`) yeşil.

### Feature Listesi

(Senaryo testi çapraz/doğrulama fazıdır — "feature" değil **senaryo grupları (validation units)**; her grup tetiklediği birincil modüle eşlenir. MODULE-MAP `— v0.2 versiyon-sonu senaryo testi (Faz 9) —` + M1–M6 referansı.)

| Senaryo Grubu | Modül | Açıklama |
|---------------|-------|----------|
| S1: Giriş noktaları & yönlendirme matrisi | M4 (+M6) | 5 dil ana sayfa **+ 5 alt sayfa route'ları** (TR prefixsiz + /en /ar /de /es), `/forum`→`/bulten` 308 redirect (+slug), bilinmeyen-locale davranışı, derin-link |
| S2: Tam TR yolculuğu — ana sayfa → alt sayfalar | M2 (+M3) | Hero → ikincil CTA → sektörler (gym + Alpfit çıkış) → 4-adım → Crew OS → Forum → Footer; + ana sayfadan alt sayfalara çıkış (Alpfit/Crew OS/vaka/bülten) → alt sayfa içerik bütünlüğü → dönüş; CTA/nav doğru, kopuk link/boş bölüm yok |
| S3: Mod kombinasyonları (Living Flow degradasyon) | M1 (+M3) | Ana sayfa **+ alt sayfa hero'ları**: light/dark (FOUC yok), reduced-motion (StaticFlow), no-WebGL, mobil "low", **AR-RTL × dark × reduced birlikte**, 320/768/1440 taşma yok + near-zero CLS |
| S4: Kontroller & kalıcılık | M3 (+M1/M4) | tema toggle (localStorage + reload kalıcılık + Living Flow uniform), dil-switcher (path koru, klavye/Escape/dış-tık), **klavye-only yolculuk** + focus-visible; alt sayfada da dil-switcher path korur |
| S5: Taksonomi & dürüstlük tutarlılığı (çapraz/sahipsiz) | M2 (+M4) | "Crew OS" her yüzeyde / "Bunker OS" hiçbir görünür yüzeyde yok (5 dil, ana sayfa **+ alt sayfalar — özellikle /bunker-os showcase**); render'da uydurma sonuç / sahte "● online" / yasak metafor yok |
| S6: 5-dil bütünlük & non-TR tutarlılığı (versiyon-sonu çekirdek) | M4 (+M2) | parite (Vitest yeşil, eksik anahtar=fail), render `MISSING_MESSAGE` yok (ana sayfa **+ 5 alt sayfa × 5 dil**), bilinçli-stale non-TR görünür kopukluk yok, **AR-RTL aynalama (alt sayfa RTL craft — Faz 8 fix dahil)** |
| S7: Chatbot (0-token: offline + sanitizasyon) | M5 | key-yok offline UI (sahte-online-yok) + sanitizasyon kod-inceleme + malformed-input kısa-devre (rol enjeksiyonu / boş / sonda-user-yok → API'ye ulaşmadan red) + stream-kopması UI takılmaz; **toplam API çağrısı = 0** |
| S8: v0.2 kazanım guardrail'leri (YENİ — çapraz) | tümü | **v0.2'nin çekirdeği:** a11y=100 çift-tema (home + 5 alt sayfa Lighthouse) + axe `test:e2e` 52 test yeşil (fail-on-regression) · Umami script kod-tarafı tüm sayfa/locale (afterInteractive, `data-domains`) · perf korunan taban regresyonsuz · CI (`fast`+`a11y`) yeşil |
| S9: Adversarial / holistik kırma | tümü | JS-kapalı SSG okunabilirlik (ana sayfa **+ alt sayfalar**), hızlı dil/tema toggle race, hızlı scroll/anchor zıplama (ScrollTrigger kararlılığı), `next build` temiz + 0 MISSING_MESSAGE (regresyon tabanı) |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase 9` oturumunda dolduruldu (2026-07-02).

### Alınan Kararlar

- **Faz tipi = v0.2 versiyon-sonu Senaryo Testi (sabit faz).** Versiyon Sonu Durumu: `senaryo_testi` (review-phase 8 zaten `teknik_borç` → `senaryo_testi` yaptı; discuss-phase 9 Adım 0b'ye girdi). v0.2'nin zorunlu `prd-review` öncesi uçtan-uca doğrulaması. Doğrulama fazı — yeni feature üretilmez; çekirdek soru: task/faz-UAT'larının göremediği dikiş/yolculuk/çapraz/adversarial katmanda v0.2 tutarlı mı.
- **Kapsam sınırı = ana sayfa + 5 alt sayfa uçtan-uca** (kullanıcı kararı 2026-07-02). Faz 3'ten (v0.1 = yalnız ana sayfa) genişletildi: Faz 8 5 alt sayfayı (`/bunker-os`, `/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`) ana sayfa a11y çıtasına çekti → v0.2'yi bütünsel kapatmak için alt sayfalar uçtan-uca yolculuğa dahil: nav → sayfa → içerik bütünlüğü → degradasyon modları → AR RTL layout → çıkış → chatbot varlığı. **a11y-DERİNLİK Faz 8'de yapıldı, tekrar edilmez** — senaryo testi yalnız yolculuk-içi tutarlılığı doğrular (a11y=100 çift-tema re-teyidi S8 guardrail'inde, yeni denetim değil).
- **TR birincil öncelik** (kullanıcı kararı). TR yolculuğu derin/bütünsel doğrulanır (ana sayfa + alt sayfalara çıkış/dönüş); non-TR (EN/AR/DE/ES) yalnız **tutarlılık** katmanında (parite + render bütünlüğü + AR-RTL aynalama) — içerik-kalite derin denetimi DEĞİL. "Bilinçli-stale non-TR değerleri görünür kopukluk yaratıyor mu?" in-scope; stale içeriğin *kalitesi* out-of-scope (versiyon-sınırına ertelendi — ILKELER "TR tek kaynak", DECISIONS 2026-06-27 dil stratejisi).
- **Chatbot = 0-token (offline + sanitizasyon)** (kullanıcı kararı). API maliyeti gereksiz: (a) v0.2 chatbot'a hiç dokunmadı → bu versiyonun getirdiği regresyon riski yok; (b) canlı streaming yolu prod'da (kiwiailab.com) zaten kanıtlı; (c) 0-token test değeri degradasyon + güvenlik tarafında. Lisans gerçeği (Anthropic API token-başına ücretli; Claude.ai/Code aboneliği sunucu-taraflı SDK çağrısını kimlikleyemez) → mevcut lisans chatbot'u besleyemez. Test yüzeyi: key-yok zarif offline yolu + girdi sanitizasyonu kod-incelemesi + malformed-input kısa-devre. **Sıfır API çağrısı** (Faz 3 deseni birebir).
- **Bulgu politikası = keşfet + kaydet + triyaj** (kullanıcı kararı). Kapsam-içi (ana sayfa **veya 5 alt sayfa**) gerçek bug → bu fazda düzeltme task'ı. Kapsam-dışı veya zaten-ertelenmiş → sahipli kayıt + yönlendirme, burada yeniden açılmaz.
- **Test modu = otonom** (kullanıcı kararı). **Faz 3'ten fark:** artık gerçek test altyapısı var (Faz 5/8) → `test:e2e` (Playwright+axe, 52 test), Vitest parite, Lighthouse çift-tema + curl/grep/Playwright MCP runtime. Milestone "ölç + kaydet + karar ver" (geçiş peşinen varsayılmaz — Faz 2/3/8 dersi).

### Kullanıcı Tercihleri

- **Ana sayfa + 5 alt sayfa uçtan-uca** (2026-07-02): alt sayfalar yolculuğa dahil; a11y-derinlik Faz 8'de yapıldı, senaryo testte yalnız yolculuk-içi tutarlılık.
- **TR birincil + non-TR tutarlılık** (2026-07-02): TR yolculuğu derin; non-TR yalnız parite/render/AR-RTL tutarlılık katmanı.
- **Chatbot 0-token** (2026-07-02): offline + sanitizasyon + malformed kısa-devre; sıfır API çağrısı.
- **Senaryo kataloğu (S1–S9) yeterli** (2026-07-02): kullanıcı ek persona/kırılma-noktası eklemedi ("devam"). S1–S9 iskeleti onaylandı.

### Sahipsiz Alan & Çapraz Konular

- **Alt sayfa dikişleri asıl yeni yüzey.** Faz 3'te alt sayfalar bilinçle kapsam dışıydı; bu faz onları uçtan-uca kapsar. Asıl bilinmeyen: ana sayfa ↔ alt sayfa **geçişleri** (client-nav vs SSG), alt sayfa **hero'larının** LivingFlow degradasyonu (her alt sayfada var), alt sayfa **AR RTL layout craft** (Faz 8 a11y'yi yaptı, ama RTL aynalama bütünlüğü yolculuk katmanında teyit edilmeli).
- **v0.2 kazanımlarının yolculuk-içi tutarlılığı (S8, yeni çapraz grup).** a11y=100 statik olarak mühürlendi (Faz 4/8) ama tema/dil/motion kombinasyonlu tam yolculukta korunuyor mu; Umami script tüm sayfa/locale'de kod-tarafı yükleniyor mu (canlı değil — DECISIONS 2026-07-01); perf tabanı regresyonsuz mu. Bunlar v0.2'nin çekirdek getirisi → ayrı senaryo grubu.
- **Ölçüm disiplini (memory):** locale tuzağı (alt sayfa TR = prefixsiz → `NEXT_LOCALE=tr` cookie şart, EN/AR/DE/ES açık-prefixli), tema tuzağı (light+dark iki koşu, dark-panel inversiyonu), reveal tuzağı (`reducedMotion:'reduce'` + scroll), stray/stale `next-server` (listening-PID teyit), host yükü (`/proc/loadavg` perf-bitişik ölçümden önce) — research/plan'de teyit.
- **Guardrail:** senaryo testi kaynak koda dokunmaz (doğrulama fazı) → guardrail'ler zaten yeşil olmalı; S8 bunu re-teyit eder. Kapsam-içi bug çıkarsa (düzeltme task'ı) CI a11y job otomatik korur.

### Kapsam Dışı

- **Umami canlı +1 (S9-10 Faz 7)** — v0.2 production release aksiyonu (tüm revizeyi ilk kez `main`'e almak), senaryo testi tetiklemez; kod-tarafı varlık S8'de doğrulanır (canlı panel değil). DECISIONS 2026-07-01.
- **Brief mobil perf açığı** (perf 90/LCP 3164ms vs ≥95/<2.5s) — kök neden CPU-bound WebGL, P2 craft-gate'te iptal; nihai doğrulama gerçek-cihaz/Vercel field gerektirir (metodolojik duvar). Senaryo testte çıkarsa kaydedilir, düzeltilmez. DECISIONS 2026-06-30.
- **Alt-sayfa PERF optimizasyonu** — bu faz yalnız yolculuk/a11y-guardrail; alt-sayfa perf yalnız **regresyonsuz** tutulur, optimize edilmez.
- **non-TR içerik-kalite derin denetimi** — bilinçli-stale (versiyon-sınırı); yalnız tutarlılık (parite / render / RTL) test edilir.
- **TB-C: npm audit uyarıları** (2 moderate dev-only) — bilinçli açık, ayrı ele alınır.
- **`/bunker-os` → public `/crew-os` + redirect** (M6 açık konu) + **çıplak `/forum`→404** — görsel/SEO versiyonuna ertelendi; senaryo testte çıkarsa sahipli kayıt, yeniden litige edilmez.
- **Dil setini değiştirme / AR'yi üründen çıkarma** — vizyon/PRD kararı; prd-review'a bırakıldı (vizyon korunur).
- **Yeni içerik/feature** — senaryo testi doğrulama fazıdır, üretim yapmaz (kapsam-içi bulgu → düzeltme task'ı istisnası hariç).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase 9` oturumunda doldurulur.

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

> Bu bölüm `/devflow:plan-phase 9` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 9.01 | TASK-9.01 | ⬜ Bekliyor | [plan-phase'de doldurulur] |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase 9` oturumunda doldurulur.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 9` oturumunda doldurulur.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase 9` oturumunda doldurulur.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi & Degradasyon | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |
| Yerelleştirme & RTL | ✅ / ⚠️ / ❌ | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-02
**Son Güncelleme:** 2026-07-02 — discuss-phase 9: Kapsam Tartışması yazıldı. Faz tipi = v0.2 versiyon-sonu senaryo testi; kapsam = ana sayfa + 5 alt sayfa uçtan-uca (Faz 3'ten genişletildi, Faz 8 alt sayfaları çıtaya çekti); TR birincil + non-TR tutarlılık; chatbot 0-token; S1–S9 kataloğu onaylandı. Sıradaki adım: research-phase 9.
