# Phase 2: v0.1 Versiyon-Sonu Teknik Borç Kapatma

**Durum:** ✅ Tamamlandı

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
| 2.03 | TASK-2.03 | ✅ Tamamlandı | TD3 — Perf tabanı kaydedildi (`docs/perf/`): masaüstü perf 100/LCP 0.69s/CLS 0 ✓; mobil perf 87/LCP 3.1s ✗, a11y 89 her iki preset ✗ → **bütçe karşılanmadı → ertelendi** (regresyon değil; DECISIONS 2026-06-28) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## UAT Sonuçları

**Tarih:** 2026-06-28
**Toplam Senaryo:** 14 | **Geçen:** 14 | **Kalan:** 0
**Mod:** Otonom (mekanik kontroller — parite/parse/build/grep/render — otonom çalıştırıldı; insan-gözü gerektiren bir bulgu çıkmadı).

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | **5-dil anahtar paritesi** — flatten/diff: her dil tam **183** anahtar, TR ile birebir set (0 eksik / 0 fazla); silme+senkron sonrası parite korundu | ✅ Geçti | `json` flatten: 5 dil de 183, TR-set birebir |
| 2 | **TD1 `hero.ctaSecondary`** — EN/AR/DE/ES'de TR "İşleyen örnekleri gör" anlamını taşıyor; eski "See it live / Live ansehen / Míralo en vivo / شاهدها مباشرةً" yok | ✅ Geçti | EN "See working examples" vb.; eski varyantlar grep'te yok |
| 3 | **TD1 `how.steps.{analyze,automate,report}.body`** — 4 dilde güncel zenginleştirilmiş TR'yi yansıtıyor (analyze "nerede sızdığı", automate "tasarladığımız akış", report "kazanç varsayılmaz, ölçülür"); `design.body` + tüm title/n dokunulmamış | ✅ Geçti | 4 dilde "gain isn't assumed, it's measured" vb. senkron |
| 4 | **TD1 `sectors.items.gyms.{automation,body}`** — 4 dilde R2 tek-otomasyon "kaçan üyeyi geri kazanma" deseni; eski "Gym Management Software / Memberships, payments" yok; `gyms.flow.*` dokunulmamış | ✅ Geçti | "Winning back the member…"/AR/DE/ES senkron; eski liste grep'te yok; flow değişmemiş |
| 5 | **TD2 `proof.*` silindi** — `grep "\"proof\""` 5 dilde boş | ✅ Geçti | flatten'da `proof.*` anahtar yok (5 dil) |
| 6 | **TD2 `forum.articles.*` silindi** — `grep "\"articles\""` 5 dilde boş; `forum` kardeş anahtarları (featured/featured2/label/title/sub/cta/note) korunmuş | ✅ Geçti | `forum.articles.*` yok; 7 kardeş anahtar 5 dilde mevcut |
| 7 | **JSON bütünlüğü** — 5 dosya da geçerli JSON (parse temiz; virgül/parantez bozulmadı) | ✅ Geçti | `json.load` 5 dilde başarılı |
| 8 | **`next build` temiz** — static page'ler, exit 0, MISSING_MESSAGE / eksik anahtar yok | ✅ Geçti | exit 0; tüm `[locale]` + alt sayfa SSG prerender; render'da MISSING_MESSAGE yok |
| 9 | **Ölü anahtar tüketici-yok teyidi** — `src/`'de `proof`/`forum.articles` referansı yok; `Forum.tsx` korunan anahtarlarla etkilenmedi | ✅ Geçti | `src/` grep boş; `Forum.tsx` yalnız label/title/sub/featured*/cta/note tüketiyor |
| 10 | **Çok dilli render + RTL** — yerel prod'da `/en /de /es /ar` ana sayfa render oluyor, TD1 yeni metni görünüyor; `/ar` `dir="rtl"` korunmuş | ✅ Geçti | 5 locale HTTP 200; `<html lang="ar" dir="rtl">`; TD1 metni EN/DE/AR'de render |
| 11 | **TD3 artefakt varlığı** — `_dev/docs/perf/` mobil+masaüstü HTML+JSON + README mevcut; INDEX'e içerik dokümanı olarak kaydedilmiş | ✅ Geçti | 5 dosya + README; INDEX Bilgi Havuzu'nda kayıt |
| 12 | **TD3 bütçe-açığı dürüst kaydı** — "bütçe karşılanmadı" bulgusu DECISIONS + perf/README + DURUM'da **ertelendi** olarak kayıtlı (sessizce optimize edilmemiş); özet skorlar artefaktla tutarlı (masaüstü perf 100/LCP 0.69s/CLS 0; mobil perf 87/LCP 3.1s; a11y 89) | ✅ Geçti | DECISIONS 2026-06-28 girdisi (Seçenek 1 ertele); README+DURUM özet skor tutarlı |
| 13 | **F5 dürüstlük / marka sesi (craft)** — senkronlanan non-TR değerler uydurma sonuç/sayı eklemiyor; yasak metafor (doktor/teşhis) ve sahte "● online" yok; süreç-dürüstlüğü çerçevesi korunuyor | ✅ Geçti | 5 dil grep: yasak metafor/sahte presence/uydurma metrik yok; süreç-dürüstlüğü çerçevesi taşınmış |
| 14 | **Adversarial: anahtar-sıra drift'i** — silme/güncelleme path-bazlı yapıldı → runtime path-lookup etkilenmedi; yeniden sıralama yapılmadı (gereksiz risk alınmadı) | ✅ Geçti | Parite + 5 locale temiz render + build → path-bazlı yaklaşım drift üretmedi |

**Otomatik kontroller (Adım 1):** CI/CD **yok** (`.github/` yok) · otomatik analiz aracı (dependabot/scanner/bot) **yok** → ilgili adımlar atlandı (mevcut değil). **Security:** faz yalnız statik i18n JSON + `_dev/` doküman değiştirdi, `src/` dokunulmadı; hedefli tarama secret/URL/script-enjeksiyonu bulmadı → temiz. Bulgu yok → düzeltme task'ı yok.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase 2` oturumunda dolduruldu (2026-06-28).

### Ne İyi Gitti?
- **Faz 1 → Faz 2 devir temiz çalıştı.** Faz 1 retrosunun "Sonraki Faz İçin Öneriler"i (non-TR çeviri senkronu + ölü anahtar hijyeni) bu fazın TD1/TD2 task'larına birebir aktı; discuss/research sürpriz kapsam keşfetmedi (research "Faz 1 cerrahiydi → başka stale yüzey yok" önermesini 197-parite + tüketim grep'iyle teyit etti). Retro→sonraki-faz pipeline'ı amaçlandığı gibi işledi.
- **Path-bazlı i18n disiplini tuttu.** Belgelenmiş "anahtar-sıra drift'i" tuzağı (TR/EN ↔ DE/ES/AR sıralaması farklı) hem TD1 (değer güncelleme) hem TD2 (silme) boyunca satır-no yerine anahtar-path ile aşıldı; parite (5×183, 0 eksik/fazla) + temiz build doğruladı. Memory disiplini (anahtar varlığı ≠ değer tazeliği) doğru uygulandı: TD1 saf **değer** olarak sınıflandı → eksik-anahtar riski yok, versiyon-sınırı ertelemesi tam burada kapatıldı.
- **TD2 silme yöntemi sağlamdı.** Satır-aralığı yerine path+brace-sayımı + yazım-öncesi assert (parite/parse/kardeş-koruma) → cerrahi diff (5×`0/26` saf silme), reserialize yok, Arapça/curly-apostrof byte-byte korundu. Drift'e açık çok-dilli JSON silme için tekrarlanabilir desen.
- **Contingency dürüst yönetildi.** TD3 bütçe açığı sessizce optimize edilmedi (kapsam genişlerdi) ya da gizlenmedi — seçeneklerle kullanıcıya getirildi, kararla ertelendi, DECISIONS + perf/README + DURUM'a bağlandı. "Doğrulama task'ı = ölç + kaydet + bulgu getir" disiplini korundu (optimizasyon faz dışı kaldı).
- **Perf ölçüm metodolojisi titizdi.** Host-yük gürültüsü (load avg 88 / 20 çekirdek → perf 49↔90 savrulması) keşfedildi, taban düşük-yük koşularından alındı; ortam-bağımsız (a11y/CLS sabit) ile ortam-duyarlı (perf/TBT/LCP) metrikler ayrıldı. Yeni süreç disiplini doğdu (host yükü gözlemi → memory'de).

### Ne Kötü Gitti?
- **Büyük aksaklık yok.** Tek sürtünme: TASK-2.01'de önceki oturumdan kalan stray `next-server` portu tutup edit-öncesi build'i sunarak görsel doğrulamada yanlış-negatif üretti; listening-PID teyidi + stray PID öldürme + temiz portta yeniden başlatma ile çözüldü (disk prerender `.next/server/app/*.html` ground-truth oldu). Tekrar-riski taşıdığı için memory Süreç Disiplinleri'ne alındı.
- **Milestone'un bütçe-maddesi gerçekle çatıştı (dürüst kayıt).** Faz milestone'u TD3 için "brief bütçesini **karşılıyor**" diyordu; taban bunu mobilde (perf 87, LCP 3.1s) ve a11y'de (89, her iki preset) **karşılamadı**. Milestone iyimser yazılmıştı (mevcut sitenin bütçeyi tuttuğu örtük varsayımı). Ölçülebilir teslimat (taban ölç + kaydet + bulgu yönlendir) tam karşılandı; "bütçeyi geçer" maddesi karşılanmadı → bilinçle ertelendi (regresyon değil, keşfedilen mevcut durum). **Ders:** versiyon-sonu *doğrulama* task'larının milestone kriteri "ölç + kaydet + karar ver" olarak yazılmalı, geçişi peşinen varsaymadan.

### Sonraki Faz İçin Öneriler
- **Bu, v0.1 versiyon-sonu Teknik Borç fazıydı** → sıradaki sabit faz **Senaryo Testi** (Versiyon Sonu Durumu: teknik_borç → senaryo_testi). Senaryo testi v0.1'in uçtan-uca doğrulaması: tam TR yolculuğu + artık-senkron 5-dil yüzeyleri versiyon prd-review öncesi tutarlı mı.
- **İleri taşınan (sahipli) ertelenmiş kalemler — kaybolmamalı:**
  - **a11y + mobil perf bütçe açığı** (a11y 89: marka yeşili `#8af28a` kontrastı + geçersiz hero `<dl>`/`dlitem` markup + dil-değiştirici aria-mismatch; mobil perf 87 / LCP 3.1s ← Living Flow WebGL) — DECISIONS 2026-06-28 + `docs/perf/README.md`'de kayıtlı, adanmış a11y/perf fazına/versiyonuna ertelendi. **En yüksek sinyal:** a11y ortam-bağımsız (en güvenilir ölçüm) ve brief hedefi ≥100 → sonraki versiyon planlamasında öncelik adayı.
  - **`/bunker-os` → public `/crew-os` + redirect** (M6 açık konu) — görsel/SEO versiyonuna ertelendi.
  - **Test altyapısı (D1)** — adanmış teknik faz adayı, hâlâ ertelendi ("test = build + otonom UAT" geçici).
  - **Alt sayfa çeviri/perf denetimi** — bu faz bilinçle yalnız ana sayfa + v0.1-değişen kalemlerdi; alt sayfa geneli sonraki versiyon.

### Task-Spesifik Teknik Öğrenimler
<!-- Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar (araç davranışı, framework bug'ı, vb.). MEMORY.md'nin değil, faz retrosunun evidir. -->
- **`npx --no-install lighthouse` cache sürümünü çözemeyebilir.** Cache'te `lighthouse@13.3.0` varken `npx --no-install` `13.4.0`'a çözünüp `package.json`'a dokunmadan kırıldı → cache binary'si doğrudan `node <cache>/lighthouse/cli/index.js` ile çağrıldı. Dokunulmaz `package.json` korunarak ölçüm alındı.
- **Stray/stale `next-server` yerel doğrulamada yanlış-negatif kaynağıdır; disk prerender ground-truth'tur.** Port'u tutan eski process edit-öncesi HTML sunabilir; `.next/server/app/*.html` (SSG prerender) build'in doğru olduğunu kanıtlayan referanstır. (Süreç tarafı → memory Süreç Disiplinleri'ne alındı.)
- **Path+brace-sayımı textual silme, reserialize'a üstün (çok-dilli JSON).** JSON'u parse-edip-yeniden-yazmak yerine anahtarı strip-match + brace-sayımıyla bloğu textual silmek Arapça/curly karakterleri byte-byte korur; yazım-öncesi parite+parse+kardeş-koruma assert'i güvenlik kapısıdır.

---

## Kalite Kontrol Sonuçları

> QUALITY.md'nin 8 ekseni sistematik kontrol edildi. Faz yüzeyi: statik i18n JSON (değer senkronu + ölü anahtar silme) + perf ölçümü + `_dev/` doküman — `src/` koduna dokunulmadı, yeni bağımlılık yok.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ | Senkronlanan non-TR değerler TR'nin dürüstlük çerçevesini taşıyor; uydurma sonuç/sayı, yasak metafor (doktor/teşhis), sahte "● online" yok (UAT #13). Faz yüzeyi yalnız i18n metin → craft regresyonu yok. (Not: TD3 a11y tabanı marka-yeşili kontrast açığı keşfetti — craft-bitişik ama ayrı sahipli/ertelendi.) |
| Erişilebilirlik | ⚠️ | Fazın **kendi değişimi** a11y'yi bozmadı (i18n metin + ölü anahtar silme; parite korundu, AR RTL bütünlüğü UAT #10). Ancak TD3 ölçümü tabanı **brief hedefinin altında** buldu: a11y 89 (color-contrast / geçersiz `<dl>`+`dlitem` / label-content-name-mismatch). Keşfedilen mevcut durum (regresyon değil), kararla ertelendi (DECISIONS 2026-06-28); adanmış a11y fazı sahipli. Dürüstçe yüzeye çıkarıldı. |
| Performans | ⚠️ | Faz değişimi perf-nötr (ölü anahtar silme payload'ı hafifçe düşürür; `src/` dokunulmadı). Taban: masaüstü perf 100 / LCP 0.69s / CLS 0 ✓; mobil perf 87 / LCP 3.1s ✗ (← Living Flow WebGL, mevcut durum). Bütçe açığı regresyon değil → ertelendi; CLS 0 (near-zero teyidi her iki preset). |
| Yerelleştirme & RTL | ✅ | Fazın **çekirdek ekseni.** 5-dil parite tam (5×183, 0 eksik/fazla — review'da bağımsız doğrulandı); TD1 3 kalem 4 dilde TR semantiğine hizalandı; eski stale varyantlar ("See it live" vb.) silindi; ölü anahtar 5 dilde eşzamanlı kaldırıldı; AR RTL korundu (UAT #10). v0.1 versiyon-sınırı çeviri borcu kapatıldı. |
| Modülerlik & Bakım Maliyeti | ✅ | Ölü anahtar silme = bakım/modülerlik hijyeni (kullanılmayan 14 yaprak kaldırıldı, drift yüzeyi düştü). Cerrahi path-bazlı düzenleme; component dokunulmadı (saf i18n, jenerik render yolu korundu). |
| Hata Yönetimi & Degradasyon | ✅ | Parite korundu → MISSING_MESSAGE/runtime boşluk yok; `next build` temiz (37/37, exit 0). Silme render'ı kırmadı (tüketici-yok teyitli, `Forum.tsx` etkilenmedi). Degradasyon yolları (WebGL/chatbot) bu fazda dokunulmadı. |
| Güvenlik | ✅ | Faz yalnız statik i18n JSON + `_dev/` doküman değiştirdi; `src/` dokunulmadı; kullanıcı girdisi/auth/secret/injection yüzeyi yok. Hedefli tarama temiz (UAT Otomatik Kontrol). |
| Test Kapsamı | ⚠️ N/A | Test altyapısı yok (proje-geneli, aspirasyonel eksen). Doğrulama: `next build` + otonom UAT (flatten/diff/parse/grep/render). Altyapı kurulumu ayrı teknik faz adayı (D1) — bu fazın eksikliği değil, proje-geneli durum. |

**Kullanıcı yolculuğu & boşluk:** Bu fazdan sonra non-TR ziyaretçi (EN/AR/DE/ES) Faz 1'in bıraktığı "yeni yapı + eski içerik" karışımını v0.1-değişen 3 kalemde artık görmüyor — hero CTA, 4-adım body'leri ve gym paneli 4 dilde TR ile senkron. 5 dilde yolculuk tutarlı, kopukluk yok. **Boşluk:** Sahipsiz/sürpriz boşluk tespit edilmedi. Bilinen, **sahipli** boşluklar: (a) a11y/mobil-perf bütçe açığı → adanmış faz; (b) alt sayfaların genel çeviri/perf denetimi → sonraki versiyon (bu faz bilinçle yalnız ana sayfa + v0.1-değişen kalemler). İkisi de kayıtlı ve yönlendirilmiş, orphan değil.

---

## Sonuç

- **Tamamlanma Tarihi:** 2026-06-28
- **Toplam Task:** 3 (TASK-2.01 TD1 çeviri senkronu · TASK-2.02 TD2 ölü anahtar hijyeni · TASK-2.03 TD3 perf taban) — tümü ✅, arşivlendi
- **Notlar:** Milestone'un 3 parçasından 2'si (TD1 çeviri senkronu, TD2 ölü anahtar hijyeni) tam karşılandı; 3. parça (TD3) **ölçülebilir teslimatı** (taban ölç + kaydet + bulgu yönlendir) karşıladı ama "brief bütçesini karşılıyor" maddesini **karşılamadı** → keşfedilen mevcut durum (regresyon değil), kararla ertelendi (DECISIONS 2026-06-28, Seçenek 1). Faz bu nedenle **tamamlandı** sayılır: TD3 bir *doğrulama* task'ıydı (optimizasyon discuss kararıyla faz dışı), bütçe açığı sahipli biçimde adanmış a11y/perf işine yönlendirildi. UAT 14/14 + kalite 8 eksen (L10n/RTL + Modülerlik çekirdek ✅; Erişilebilirlik/Performans ⚠️ keşfedilen-taban/ertelendi; Test Kapsamı N/A). Düzeltme task'ı yok. Sonraki faza aktarılan borç: a11y/mobil-perf açığı, `/bunker-os` route (M6), test altyapısı (D1), alt sayfa çeviri/perf denetimi. Versiyon Sonu Durumu: teknik_borç → senaryo_testi.

---

**Oluşturulma:** 2026-06-28
**Son Güncelleme:** 2026-06-28 — review-phase: retrospektif + 8 kalite ekseni yazıldı (L10n/RTL + Modülerlik çekirdek ✅; a11y/perf ⚠️ keşfedilen-taban/ertelendi; Test Kapsamı N/A). Faz ✅ tamamlandı, düzeltme task'ı yok. Versiyon Sonu Durumu teknik_borç → senaryo_testi; sıradaki: discuss-phase 3.
