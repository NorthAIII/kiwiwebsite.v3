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

> `/devflow:research-phase 2` oturumunda dolduruldu (2026-06-28). Kaynak: `messages/{tr,en,ar,de,es}.json` (5-dil flatten/diff) + `src/` tüketim grep'i + ortam yoklaması.

### TD1/TD2 — i18n Yüzeyi Doğrulaması (kodla teyit)

**Anahtar paritesi (flatten + diff, 5 dil):** Her dil **tam 197 anahtar**, sıfır eksik / sıfır fazla. → TD1 saf **değer** güncellemesidir (anahtar eklenmez/silinmez); pazarlık-dışı "eksik anahtar/MISSING_MESSAGE" riski **yok**. (Dil stratejisi: değer-ertelemesi versiyon-sınırında kapatılır — Memory "i18n anahtar varlığı ≠ değer tazeliği".)

**TD1 stale yüzeyi = tam 3 kalem, hepsi render ediliyor:**
- `hero.ctaSecondary` — non-TR'de "See it live / Live ansehen / Míralo en vivo / شاهدها مباشرةً"; TR "İşleyen örnekleri gör"e güncellenmemiş. Tüketici: `src/components/Hero.tsx:81`. (4 dil × 1 değer)
- `how.steps.{analyze,automate,report}.body` — non-TR'de düzgün 4-adım çevirisi **mevcut** ama TR'nin **son zenginleştirilmiş** metninden değil, erken taslaktan (örn. EN `analyze.body` TR'deki "işin nerede sızdığını buluruz: elle tekrarlanan adımlar…" zenginleştirmesini, `report.body` "kazanç varsayılmaz, ölçülür" vurgusunu taşımıyor). `design` zaten senkron; `title`'lar (tek sözcük) doğru → iş yalnız **3 body**. Tüketici: `src/components/HowItWorks.tsx:15-18` (sabit dizi `["analyze","design","automate","report"]`). (4 dil × 3 body)
- `sectors.items.gyms.{automation,body}` — non-TR'de hâlâ **eski özellik-listesi** içeriği ("Gym Management Software" / "Memberships, payments, check-ins…"); TR'deki R2 tek-otomasyon dönüşümü (TASK-1.02 "Kaçan üyeyi geri kazanma") gelmemiş. `gyms.flow.{trigger,action,result}` **zaten senkron** → dokunulmaz. Tüketici: `src/components/SectorSolutions.tsx:90,93` (flow `:133`). (4 dil × 2 değer)

**TD2 ölü anahtar = render-yok teyidi:**
- `proof.{label,note}` (tüm `proof` namespace) → `src/`'de **hiç tüketilmiyor** (grep boş). Güvenle tüm `proof` objesi silinir.
- `forum.articles.{one,two,three,four}.{title,tag,readingTime}` (12 yaprak) → render edilmiyor; `Forum.tsx` yalnız `featured`/`featured2`/`label`/`title`/`sub`/`cta`/`note` kullanır. ("articles" grep eşleşmeleri "p**articles**" yan-eşleşmesi — gerçek tüketim yok.) Güvenle tüm `articles` objesi silinir.
- Silme sonrası beklenen: her dil 197 → **183** anahtar (14 yaprak × 5 dil). Referans olmadığından SSG render'da MISSING_MESSAGE doğmaz → `next build` temiz kalır.

### Değerlendirilen Yaklaşımlar (TD3 perf ölçüm ortamı)
- **Yerel prod build + `npx lighthouse`** *(SEÇİLEN)*: `next build && next start` → npx cache'teki lighthouse@13.3.0 + sistem `google-chrome` ile mobil+masaüstü ölçüm, JSON/HTML rapor repo'ya kaydedilir. **Artı:** `package.json`'a dokunmaz (npx cache, dep değil — dokunulmaz kuralına uyar), indirme yok (zaten cache'te), anında, tekrarlanabilir, artefakt arşivlenir (kalıcılık ilkesi). **Eksi:** localhost ağ-iyimser (CDN/latency yok) → perf skoru "yerel taban" olarak okunur; a11y skoru ortamdan bağımsız (en güvenilir), perf mobil preset 4× CPU-throttle uyguladığı için yine anlamlı.
- Vercel preview deploy + PageSpeed/Lighthouse: revize branch push'u → preview URL (main'e değil, canlı güvende), production'a yakın ağ. **Eksi:** deploy bekleme + Vercel branch-bağlantısına bağımlı + URL bulma adımı. (Not: discuss'taki "revize branch deploy olmuyor" önermesi eksikti — preview deploy mümkün; gelecekte merge sonrası production teyidi için saklanabilir.)
- Chrome DevTools Lighthouse paneli (manuel): sıfır kurulum ama kaydedilen artefakt yok, scriptlenebilir/tekrarlanabilir değil → regresyon tabanı için zayıf. (Acil fallback olarak durur.)
- **Seçilen:** Yerel prod build + `npx lighthouse` — kullanıcı onayı (2026-06-28). Ortam hazır: lighthouse@13.3.0 npx cache'te, `/usr/bin/google-chrome` (149) mevcut.

### Kullanılacak Araçlar/Kütüphaneler
- **lighthouse@13.3.0** — npx cache'te (`~/.npm/_npx/.../lighthouse`), `npx lighthouse` ile çağrılır; **`package.json`'a EKLENMEZ** (dep değil). Mobil (varsayılan preset) + masaüstü (`--preset=desktop`).
- **google-chrome 149** — `/usr/bin/google-chrome` (kanonik Chrome, Lighthouse driver'ı). Snap chromium + Playwright chromium de mevcut ama gerekmez.
- **node 24 / npm 11 / next 15** — `next build && next start` (port 3000) ile yerel production sunum. **dev build ile ölçülmez** (HMR/minify-yok perf'i bozar).

### Dikkat Edilecekler
- **Anahtar sıralaması drift'i (TD1 + TD2 tuzağı):** Dosya içi anahtar **sırası** TR/EN ile DE/ES/AR arasında farklı (`sectors.live/flowLabel/seeLive` TR/EN'de satır 67-69, DE/ES/AR'de 131-133). Satır-aralığı hizası diller arası **güvenilmez** — her düzenleme/silme **anahtar path'iyle** (grep) konumlandırılır, satır numarasıyla değil. Sıralama runtime'ı etkilemez (next-intl path-lookup) → **yeniden sıralama YAPILMAZ** (kapsam dışı, gereksiz risk).
- **5-dil tutarlılığı (TD2):** Ölü anahtar 5 dilde **birlikte** silinir (tek dilde kalan = drift). Silme sonrası flatten/diff ile 183-paritesi + `next build` temizliği doğrulanır. JSON virgül-bütünlüğüne dikkat (objenin son/orta eleman oluşu).
- **TD1 inceliği:** non-TR `how.steps` "yapılmış gibi" görünür (4 adım tam çeviri) — staleness **semantik drift** (eski taslak), eksik/bozuk değil. "Çeviri var → senkron" yanılgısına düşme; **güncel TR body** ile karşılaştır. `design` + `title`'lara dokunma; `gyms.flow`'a dokunma.
- **Perf — Living Flow WebGL ana risk:** ağır canvas/partikül; Lighthouse mobil 4× CPU-throttle TBT/LCP'yi zorlar. Bileşen lazy+degradable ama Lighthouse `prefers-reduced-motion` set etmez → tam WebGL gerçekçi en-kötü durum ölçülür. CLS riskleri: canvas + webfont (Fraunces/Geist) swap → near-zero CLS teyidi gerek. Stabilite için ölçüm 2-3× alınıp temsilî/median kaydedilir; port 3000 doluysa açık port verilir.
- **Bütçe karşılanmazsa (contingency):** TD3 **doğrulama** task'ıdır, optimizasyon bu fazın kapsamı **dışı** (discuss). Bir metrik bütçeyi (≥95 perf/≥100 a11y/LCP<2.5s/near-zero CLS) tutturmazsa → bulgu kaydedilir + kullanıcıya getirilir (şimdi düzelt vs ayrı faza ertele kararı); sessizce kapsam genişletilmez.

### Teknik Kararlar
- **Perf ölçüm aracı = `npx lighthouse` (yerel prod build, mobil+masaüstü), artefakt repo'ya kaydedilir.** Gerekçe: bağımlılık eklemeden (dokunulmaz `package.json`), tekrarlanabilir + arşivlenebilir taban (kalıcılık ilkesi), kanonik Chrome ile kanonik skor. (DECISIONS 2026-06-28.)
- **Taban artefakt evi = yeni `_dev/docs/perf/`** (HTML+JSON raporlar) + `phases/PHASE-2.md` / DURUM özet skorları. TD3'te oluşur, INDEX'e içerik dokümanı olarak eklenir. (Plan-phase'de task detayına bağlanır.)
- **TD1 = path-bazlı değer güncellemesi, anahtar/sıra değişmez; TD2 = path-bazlı obje silme, 5-dil eşzamanlı.** Her ikisi de satır numarasına değil anahtar path'ine dayanır (sıralama drift'i nedeniyle).

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 2.01 | TASK-2.01 | ✅ Tamamlandı | TD1 — Non-TR çeviri senkronu: `hero.ctaSecondary` + `how.steps.{analyze,automate,report}.body` + `sectors.items.gyms.{automation,body}` → EN/AR/DE/ES (saf değer, anahtar sabit) |
| 2.02 | TASK-2.02 | ✅ Tamamlandı | TD2 — Ölü anahtar hijyeni: `proof.*` + `forum.articles.*` → 5 dilden sil (197→183, build temiz) |
| 2.03 | TASK-2.03 | ⬜ Bekliyor | TD3 — Ana sayfa perf/Lighthouse doğrulama (mobil+masaüstü) + taban kaydı (`_dev/docs/perf/`) |

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
**Son Güncelleme:** 2026-06-28 — run-task: TASK-2.02 ✅ (TD2 ölü anahtar hijyeni; `proof.*`+`forum.articles.*` 14 yaprak × 5 dil silindi, 197→183 parite, build temiz 37/37). Sıradaki: TASK-2.03 (fazın son task'ı).
