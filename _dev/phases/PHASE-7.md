# Phase 7: Umami Analytics Entegrasyonu (E1)

**Durum:** ✅ Tamamlandı

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-7-<slug>.md`'ye bölünür. Tamamlandıktan (✅) sonra bölme yasaktır. -->

---

## Genel Bilgiler

**Amaç:** Site geneli trafiği (sayfa görüntüleme + ziyaret) kendi self-hosted Umami sunucumuzla ölçmek. `next/script` ile Umami script tag'ini `[locale]/layout.tsx`'in `<head>`'ine ekleyerek tüm locale'lerde otomatik pageview ölçümü sağlamak. v0.2'nin son içerik fazı.

**Milestone:** Umami script'i tüm locale'lerde yükleniyor; canlı domain'de (kiwiailab.com) gerçek bir ziyaret Umami panelinde **gözle doğrulanmış** olarak görünüyor; Faz 6 mobil perf/LCP tabanı regresyona uğramamış.

### Feature Listesi

(MODULE-MAP ve modules/ referansı; spec: `docs/UMAMI-ANALYTICS.md`)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| E1: Umami self-hosted analytics | M6 (SEO & Deploy) | `next/script` ile Umami script'i `[locale]/layout.tsx` `<head>`'ine; site-geneli pageview/ziyaret ölçümü |

---

## Kapsam Tartışması

> `/devflow:discuss-phase 7` oturumunda dolduruldu (2026-07-01).

Bu faz alışılmadık derecede iyi tanımlı: `docs/UMAMI-ANALYTICS.md` spec'i uygulanacak kodu, değerleri, yerleşim kararını ve kabul kriterlerini birebir içeriyor. Spec map-codebase sonrası kullanıcı talebiyle (2026-06-27) kaydedilmişti. Tartışma bu spec'i teyit + çapraz konuları (perf/test/canlı-doğrulama) netleştirme üzerine yürüdü.

### Alınan Kararlar

- **Yerleşim = `src/app/[locale]/layout.tsx` `<head>`, root `layout.tsx` değil (spec teyidi):** Root layout boş pass-through; gerçek `<html>/<head>/<body>` kabuğu `[locale]/layout.tsx`'te. `next/script` ile buraya konur → tüm locale'ler otomatik kapsanır. SPA sayfa geçişlerini Umami App Router'da otomatik yakalar (ekstra kod yok).
- **Değerler (spec, secret değil):** `src=https://umami.kiwiailab.com/script.js`, `data-website-id=c7031c49-5ccd-4b93-a82d-bba895ee4f2e`, `data-domains=kiwiailab.com`. `data-website-id` ve URL yayınlanan HTML'de zaten görünür → public repo'da tutulmasında sakınca yok (secret koda gömülmez ilkesiyle uyumlu; bunlar sır değil).
- **Kapsam = sadece otomatik pageview/ziyaret:** Custom event tracking (CTA/chatbot/keşif-görüşmesi dönüşümleri) bu faza dahil DEĞİL — ayrı iş, gerekirse sonraki bir faz. Spec'in tanımladığı temel entegrasyon uygulanır.
- **Yükleme stratejisi = `strategy="afterInteractive"` (spec + Umami önerisi):** Hydration sonrası erken yüklenir, kısa ziyaretleri de sayar. Faz 6 perf tabanı gözetildi; `afterInteractive`/`defer` LCP'yi bozmamalı ama bu faz **before/after perf kontrolü** taşıyacak (aşağıda çapraz konu). `lazyOnload` (daha perf-dostu ama hızlı-bounce ziyaretçiyi kaçırır) değerlendirildi, reddedildi — ölçüm doğruluğu önceliklendirildi; perf regresyonsuz doğrulanacak.
- **Test = hafif render testi ekle (D1.5 kümülatif konvansiyon):** Faz 5'in "her feature kendi testini ekler" konvansiyonu sürdürülür. Vitest/RTL ile: layout render edildiğinde Umami script tag'i doğru `src` + `data-website-id` + `data-domains` ile mevcut mu?
- **Canlı doğrulama = merge sonrası canlıda (data-domains kısıtı gereği):** `data-domains=kiwiailab.com` preview deploy'ları saymaz; `main`=canlı. Bu yüzden "Umami panelinde +1 gördüm" doğrulaması yapısal olarak merge-sonrası bir iş. Akış: preview'da script'in yüklendiğini network sekmesinde gör → merge→main deploy sonrası kiwiailab.com'da gerçek ziyaretin panelde sayıldığını gözle teyit et. Bu, "kod ekledim tamamdır deme" disiplininin (MEMORY → Süreç Disiplinleri) bu fazdaki somut biçimi ve milestone'un çekirdeği.

### Kullanıcı Tercihleri

- Kapsam: Sadece pageview (custom event yok).
- Yükleme: `afterInteractive`.
- Test: Hafif render testi eklensin.
- Canlı doğrulama: Merge sonrası canlıda (kiwiailab.com'da panelde teyit).

### Çapraz Konular (bu fazda düşünülecek)

- **Performans (Faz 6 tabanı korunur):** Yeni 3rd-party script + yeni origin'e (`umami.kiwiailab.com`) bağlantı ekleniyor — Faz 6'da tam da mobil perf/LCP için uğraşıldı. Korunan taban (mobil perf 90/LCP 3164ms, masaüstü 100/LCP 0.69s, CLS≈0) regresyona uğramamalı. Faz bir before/after perf kontrolü taşır (metodoloji: `docs/perf/README.md`; ortam/host-yük + TR `/` cookie disiplini — MEMORY).
- **Test (Faz 5 harness):** Render testi + mevcut guardrail'ler (i18n parite, a11y regresyon) CI'da yeşil kalmalı.
- **Canlı doğrulama disiplini:** Yukarıda "Alınan Kararlar"da; milestone'un çekirdeği.

### Kapsam Dışı

- **Custom event / dönüşüm tracking** (CTA tıklama, chatbot açılışı, keşif-görüşmesi) — ayrı iş, bu fazda yok.
- **Umami panelinde goal/funnel/dashboard kurulumu** — panel-tarafı yapılandırma, kod fazı değil.
- **Adblocker kaçağı azaltma (script'i farklı isimle proxy'leme)** — spec "şimdilik gerek yok" diyor; ileride istenirse ayrı iş. %100 hassasiyet beklenmez (uBlock/Brave bazı ziyaretçileri eler — kabul).
- **404 sayfası (`not-found.tsx`) ölçümü** — global not-found `[locale]/layout.tsx`'ten geçmez → 404'ler sayılmaz. İhmal edilebilir (spec kabul ediyor), ayrı çözüm aranmaz.
- **Crew OS `/bunker-os`→`/crew-os` redirect** — ilgisiz M6 açık konusu, görsel/SEO versiyonuna ertelendi, bu fazda değil.
- **Cookie consent / banner** — Umami cookieless (kişisel veri toplamaz) olduğundan bu fazın konusu değil; kapsam genişletilmez.

---

## Araştırma Bulguları

> `/devflow:research-phase 7` oturumunda dolduruldu (2026-07-01).

Faz olağandışı iyi tanımlı: `docs/UMAMI-ANALYTICS.md` uygulanacak kodu/değerleri/yerleşimi birebir veriyor. Araştırma "hangi kütüphane" değil, **entegrasyonun projeye özgü teknik riskleri ve test edilebilirliği** üzerine yürüdü. Kod zemini incelendi: `next/script` repoda hiç kullanılmıyor (ilk kullanım); `[locale]/layout.tsx` `<head>`'inde zaten bir tema-FOUC `<script>` var.

### Değerlendirilen Yaklaşımlar

**A. Yerleşim mekanizması — `next/script` `<Script>` (spec) vs düz `<script defer>`**
- `next/script <Script strategy="afterInteractive">`: App Router idiomatik yolu; SPA geçişlerini Umami otomatik sayar. `<Script>` client component'tir ama server olan layout'un `<head>`'ine child olarak konabilir; `afterInteractive` yerleşim kısıtı taşımaz (yalnız `beforeInteractive` root layout'a zorlar — bizi bağlamıyor).
- Düz `<script defer>`: spec'in "çatıdan bağımsız alternatifi"; işlevsel olarak eşdeğer ama Next'in script yaşam-döngüsü/optimizasyonu dışında kalır.
- **Seçilen: `next/script <Script>`** — mevcut stack ile idiomatik, App Router entegrasyonu (route değişiminde otomatik pageview) hazır gelir.

**B. Umami'nin kod yerleşimi — ayrı bileşen vs inline `<Script>`** (kullanıcı kararı 2026-07-01)
- Ayrı bileşen (`src/components/analytics/umami-script.tsx`): tek-sorumluluk, layout `<head>`'inde `<UmamiScript />`. Render testi bu küçük bileşeni **izole** eder → next-intl/font/async sürüklemez.
- Inline `<Script>`: daha az dosya; ama test birimi ya kırılgan tam-layout render'ı ya da assert edilecek izole birim yokluğu sorunu doğurur.
- **Seçilen: ayrı bileşen** — QUALITY §5 (modülerlik) ile hizalı; test edilebilirliği robust kılar (aşağıda C).

**C. Render testi stratejisi — tam layout render vs izole bileşen + mock**
- Tam `LocaleLayout` render'ı Vitest/jsdom'da kırılgan: (a) `async` server component, (b) `next/font/google` SWC font-loader ister, (c) `next-intl/server`+`setRequestLocale` request context ister, (d) `notFound()`, (e) `<html>/<head>/<body>` jsdom document'ine nest edilir. Tam da `smoke.test.tsx`'in kaçındığı tuzak (`docs/TESTING.md` §3). Ayrıca `<Script afterInteractive>` DOM'a effect ile enjekte eder → bare render'da senkron `<script>` düğümü çıkmayabilir (flaky).
- İzole bileşen + `vi.mock("next/script")` passthrough: `<UmamiScript />` render edilir, mock `<script {...props}>` döndürür, test `src`/`data-website-id`/`data-domains`/`strategy` değerlerini assert eder. **Bizim kontrol ettiğimizi** (doğru değerler geçiliyor mu) test eder; next/script enjeksiyonu Next'in sorumluluğu → canlıda doğrulanır.
- **Seçilen: izole bileşen + next/script mock** — Faz 5 kümülatif konvansiyonuyla (jsdom katmanı, `// @vitest-environment jsdom`) uyumlu, deterministik.

**D. Yeni origin için preconnect/dns-prefetch — eklensin mi?**
- `umami.kiwiailab.com` yeni bir origin (DNS+TLS). preconnect bağlantıyı erkene çekebilir ama deferred bir analytics script için kazanç marjinal; ilk-yükte bağlantı yarışına girip LCP'yi hafif **kötüleştirebilir**.
- **Seçilen: ölç-önce, ekleme (YAGNI)** — before/after Lighthouse regresyon gösterirse veri-güdümlü yeniden değerlendir. ILKELER craft/minimalizm + "korunan taban regresyon yasağı" ile hizalı.

### Kullanılacak Araçlar/Kütüphaneler
- `next/script` (`next@^15.3`, zaten kurulu) — `<Script strategy="afterInteractive">`; repoda ilk kullanım.
- Vitest + `@testing-library/react` + jsdom (Faz 5 harness) — render testi; `vi.mock` ile next/script izolasyonu.
- Lighthouse 13.3.0 (npx-cache, devcontainer kurulumu → MEMORY) — before/after perf; Faz 6 tabanına karşı.

### Dikkat Edilecekler
- **`<Script afterInteractive>` senkron DOM düğümü garantisi yok** → render testi next/script'i **mock**'lamalı; gerçek enjeksiyonu test etme (Next'in işi, canlıda doğrula). (Kaynak: yeni bileşen `src/components/analytics/umami-script.tsx` + test `tests/umami-script.test.tsx` — ikisi de bu fazda yaratılacak.)
- **Değerler dış kaynaklı, kodda henüz yok:** `data-website-id=c7031c49-5ccd-4b93-a82d-bba895ee4f2e`, `src=https://umami.kiwiailab.com/script.js`, `data-domains=kiwiailab.com` → **dış** (self-hosted Umami sunucusu/dashboard'da tanımlı; `docs/UMAMI-ANALYTICS.md` + bu faz dokümanında kayıtlı; grep ile `src/` altında **yok** olduğu teyit edildi). Sır değil (yayınlanan HTML'de görünür), public repo'da tutulabilir. Slot değil, config sabiti.
- **`data-domains=kiwiailab.com` → preview'lar sayılmaz:** canlı doğrulama yapısal olarak **merge-sonrası** (main=canlı). Preview'da yalnız script'in **yüklendiği** (network sekmesi) görülür; +1 sayım main deploy sonrası kiwiailab.com'da doğrulanır.
- **Perf ölçüm disiplini (MEMORY):** TR `/` için `NEXT_LOCALE=tr` cookie şart (yoksa `/en` ölçülür); her koşu öncesi `cat /proc/loadavg` (host yükü perf/TBT'yi bozar, a11y/CLS'yi değil); software-GL ortamı perf/TBT'yi şişirir → baseline'ı **aynı ortamda** sabitle. Faz 6 tabanı: mobil perf 90/LCP 3164ms, masaüstü 100/LCP 0.69s, CLS≈0.
- **404 sayımı yok:** global `not-found.tsx` `[locale]/layout.tsx`'ten geçmez → 404 sayılmaz (spec kabul ediyor, ihmal edilebilir; kapsam dışı).
- **Adblocker kaçağı:** uBlock/Brave `script.js`'i eler → %100 hassasiyet beklenmez (kabul; kapsam dışı).

### Teknik Kararlar
- **Ayrı bileşen `src/components/analytics/umami-script.tsx`** — layout `<head>`'inde `<UmamiScript />` (kullanıcı kararı; modülerlik + test edilebilirlik).
- **Render testi = izole bileşen + `vi.mock("next/script")`** — `tests/umami-script.test.tsx`, `// @vitest-environment jsdom`; `src`/`data-website-id`/`data-domains`/`strategy` assert edilir.
- **`strategy="afterInteractive"`** — discuss-phase kararı sürdürülür (ölçüm doğruluğu; perf regresyonsuz doğrulanacak).
- **preconnect/dns-prefetch eklenmez (şimdilik)** — ölç-önce; before/after regresyon gösterirse yeniden değerlendir.
- **before/after Lighthouse** — mobil+masaüstü, TR `/` cookie'li, Faz 6 tabanına karşı; guardrail regresyon yasağı.

---

## Task Listesi

> `/devflow:plan-phase 7` oturumunda dolduruldu (2026-07-01).

<!-- KURAL: Task Listesi yalnızca özet tablodur. İcra detayı `tasks/TASK-N.md`'ye yazılır. -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 7.01 | TASK-7.01 | ✅ Tamamlandı | Umami bileşeni (`umami-script.tsx` YENİ) + `[locale]/layout.tsx` head entegrasyonu + izole render testi (`vi.mock("next/script")`) |
| 7.02 | TASK-7.02 | ✅ Tamamlandı | Before/after Lighthouse perf regresyon doğrulaması — **regresyon YOK** (mobil LCP after 2714ms ≤ Faz6 3164ms; masaüstü 100/660ms; `afterInteractive` LCP sonrası yükler); preconnect eklenmedi (YAGNI) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

> **Canlı +1 doğrulama bir kod task'ı değildir:** `data-domains=kiwiailab.com` preview'ları saymaz → milestone'un "canlıda gözle doğrulandı" çekirdeği yapısal olarak **merge-sonrası** iş; **verify-phase**'de (post-merge, kiwiailab.com panelinde) doğrulanır. 7.01 preview'da script'in yüklendiğini (ağ sekmesi) doğrulamakla sınırlıdır.

---

## UAT Sonuçları

**Tarih:** 2026-07-01
**Toplam Senaryo:** 10 | **Geçen:** 8 | **Merge-bekliyor:** 2 | **Başarısız:** 0

**Test modu:** Otonom (Senaryo 1-8 otonom koşuldu; 9-10 yapısal olarak merge-sonrası — canlı panel).
**Otomatik kontroller (Adım 1):** CI `fast`+`a11y` job'ları success (491e4ae, 6d0d54a) · dependabot/bot PR yok · security-review temiz (≥8 bulgu yok) · lokal `npm test` 7/7 + build temiz.

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | Umami script 5 locale'in (tr/en/ar/de/es) `<head>`'inde render ediliyor | ✅ Geçti | Prerender HTML: her locale'de `<link rel="preload" as="script">` + RSC payload; 5/5 |
| 2 | Script prop'ları spec'e birebir eşit: `src` · `data-website-id` · `data-domains` · `strategy=afterInteractive` | ✅ Geçti | 5 locale'de dört değer birlikte doğrulandı (prerender + izole render testi assert) |
| 3 | Render testi + tüm guardrail'ler yeşil (`npm test` + CI `fast`+`a11y`) | ✅ Geçti | Lokal 7/7; CI iki job da success (job-seviyesi teyit) |
| 4 | `next build` temiz geçer (three transpile + TS strict) | ✅ Geçti | "✓ Compiled successfully", 0 hata/uyarı |
| 5 | Tema-FOUC `<script>` + Umami `<Script>` her locale'de çakışmasız birlikte | ✅ Geçti | Her locale: theme-fouc script + umami preload birlikte mevcut |
| 6 | Perf regresyonu yok (`afterInteractive` LCP sonrası; korunan taban) | ✅ Geçti | 7.02: mobil LCP after 2714ms ≤ Faz6 3164ms; masaüstü 660ms; CLS 0; artefaktlar `docs/perf/*-faz7.*` |
| 7 | Degradasyon: Umami origin erişilemez/bloke olsa site kırılmaz | ✅ Geçti | `afterInteractive` preload/runtime-inject → render'a bağımlı değil; body/hero prerender'da bağımsız |
| 8 | `data-domains=kiwiailab.com` → localhost/preview trafiği panelde SAYILMAZ | ✅ Geçti | Attribute 5 locale'de set; Umami client-script hostname eşleştirir (kod-tarafı doğru; panel-tarafı S9'da canlı teyit) |
| 9 | **Canlı +1 (milestone çekirdeği):** merge→main sonrası kiwiailab.com'da gerçek ziyaret panelde +1 | ⏳ Merge-bekliyor | `data-domains` preview saymaz → yapısal olarak merge-sonrası; kullanıcı canlıda gözle teyit eder |
| 10 | Canlıda SPA route geçişinde otomatik pageview sayılıyor | ⏳ Merge-bekliyor | Aynı gerekçe; merge-sonrası canlı doğrulama |

> **Senaryo 9-10 yapısal olarak merge-sonrası:** `data-domains=kiwiailab.com` preview'ları saymaz → canlı panel doğrulaması ancak `main`=canlı deploy sonrası yapılabilir (discuss/plan kararı). Bu iki senaryo **⏳ merge-bekliyor**; merge sonrası kullanıcı canlıda teyit eder. Kod-tarafı hazırlık (script yükleniyor, doğru değerler, data-domains set) 1-8 ile tam doğrulandı. Başarısız senaryo yok → düzeltme task'ı gerekmedi.
>
> **verify-phase 7 re-run (2026-07-01) bulgusu:** "canlı +1 gördüm" iddiası kanıtla çürütüldü — `git merge-base --is-ancestor` ile Umami feat commit'i (`491e4ae`) `origin/main`'de **değil**; `main` HEAD'in **89 commit gerisinde** (tüm v0.1+v0.2 revizesi hâlâ `revize/devflow-kurulum`'da, unmerged); canlı `kiwiailab.com` HTML'inde "umami" **0 kez** geçiyor. Yani izleyen script canlıda yok → bu entegrasyon için panelde gerçek +1 sayılmış olması fiziksel olarak mümkün değil; 9-10 **gerçekten açık** (sahte-geçmiş kaydedilmedi). Kullanıcı kararı (B): merge sadece Umami değil **tüm revizeyi ilk kez production'a almak** olduğundan sırf tek UAT senaryosu için tetiklenmedi — merge/release bilinçli, ayrı bir **v0.2 production release** adımına ertelendi; faz review'e geçti. 9-10 o release sonrası canlıda kapanır.

---

## Retrospektif

> `/devflow:review-phase 7` oturumunda dolduruldu (2026-07-01).

### Ne İyi Gitti?

- **Spec-güdümlü faz, minimum belirsizlik.** `docs/UMAMI-ANALYTICS.md` uygulanacak kodu/değerleri/yerleşimi birebir verdi → discuss/research "hangi kütüphane" değil **entegrasyon riski + test edilebilirlik**e odaklandı. İki task'lık cerrahi icra hızlı ve temiz geçti.
- **Önceki faz (6) retro önerisi fiilen uygulandı.** "Perf ölçümünde ÖNCE ortamı sabitle" → 7.02 same-env before/after (`before` = `layout.tsx` f065700'e döndür + yeniden build, aynı ortam) ile birebir karşılandı; cross-env mutlak-perf tuzağına düşülmedi.
- **Test edilebilirlik araştırmayla önden çözüldü.** Tam-`LocaleLayout` render'ının kırılganlığı (async server component + next/font + next-intl request context + `notFound()`) önceden teşhis edildi → izole bileşen + `vi.mock("next/script")` deterministik testi seçildi. QUALITY §5 (modülerlik) ile hizalı ayrı-bileşen kararı, testi de robust kıldı (tek karar iki eksende kazandırdı).
- **Dürüst milestone kaydı — sahte-geçmiş engellendi.** verify-phase re-run'da "canlı +1 gördüm" iddiası **kanıtla çürütüldü** (`git merge-base --is-ancestor` → Umami commit'i `origin/main`'de değil, `main` HEAD 89 commit geride; canlı HTML'de "umami" 0 kez). Milestone'un canlı çekirdeği gerçekten açık olarak kaydedildi, uydurulmadı. Süreç Disiplini ("kod ekledim tamamdır deme") tam da bu fazda somutlaştı ve işledi.
- **`afterInteractive` perf-güvenli çıktı — kanıtla.** Yeni origin (`umami.kiwiailab.com`) + 3rd-party script mobil LCP'ye zarar vermedi; `network-requests` audit'i isteğin fiilen alındığını (after'da var, before'da yok) gösterdi → "script yüklendi **ama** LCP'ye değmedi" (post-LCP enjeksiyon) ampirik kanıtlandı, varsayılmadı.

### Ne Kötü Gitti?

- **verify-phase'de hatalı "canlı +1 gördüm" iddiası oluştu ve re-run gerektirdi.** İlk geçiş, yapısal olarak o oturumda gerçekleştirilemeyecek bir canlı-doğrulamayı geçmiş-gibi kaydetmeye yaklaştı; re-run kanıtla (git merge-base + canlı HTML grep) çürüttü. Maliyet: ekstra verify turu. Kök ders: "canlıda gördüm" iddiası her zaman **kanıt-artefaktına** (panel ekran görüntüsü / canlı HTML grep / git merge-base) bağlanmalı.
- **Milestone çekirdeği faz kapanışında açık kaldı (yapısal).** `data-domains=kiwiailab.com` preview saymaz + merge = tüm revizeyi (89 commit) ilk kez production'a almak → "gözle doğrulandı" çekirdeği tek UAT senaryosu için tetiklenmedi, bilinçle v0.2 production release'e ertelendi. Faz kod-tarafı tam ama milestone tam kapanmadı — bu bir kusur değil, kabul edilmiş yapısal kısıt (kullanıcı kararı B), ama fazın "tam ✅" hissini bölüyor.
- **vitest alias sürtünmesi.** İlk `@/` import eden component testi runner'da çözülmedi → `vitest.config.ts`'e `@/→src` alias eklendi (küçük, tek seferlik task-icra nüansı).

### Sonraki Faz İçin Öneriler

- **v0.2 production release ayrı ve bilinçli bir adım.** Tüm revize (v0.1+v0.2, ~89 commit) `main`'e ilk kez merge edilecek; Umami canlı +1 (S9-10) + genel canlı duman testi o adımda kapanır. Release öncesi rutin: son temiz build + canlı smoke + Umami panel teyidi. Bu adım faz döngüsünün dışında, versiyon-sonu işi.
- **"Canlıda doğruladım" iddiaları kanıt-artefaktına bağlanmalı.** verify-phase'de yapısal olarak o oturumda gerçekleştirilemeyen canlı senaryolar **baştan ⏳ merge-bekliyor** işaretlenmeli; "geçti" ancak kanıt (panel/HTML/merge-base) varsa yazılmalı. (DevFlow-genel yönü → aşağıda "DevFlow'a Öneri".)
- **Versiyon-sonu sabit fazları sırada.** v0.2 içerik fazları (4-7) tamamlandı → sırada teknik borç → senaryo testi → prd-review. discuss-phase 8 versiyon-sonu tespitini yapıp teknik borç fazını promote eder (Versiyon Sonu Durumu içerik_fazları → teknik_borç geçişi orada).
- **Devralınan sahipli borç korunuyor.** Alt-sayfa derin a11y + `text-pulse` ink-panel dark-inversion süpürmesi (Faz 4→5→6→7 devri). Faz 5 harness'i hazır; sonraki a11y/alt-sayfa fazına.

### Task-Spesifik Teknik Öğrenimler
<!-- Bu fazdaki task'larda öğrenilen ama proje genelinde geçerli olmayan teknik nüanslar (araç davranışı, framework bug'ı, vb.). MEMORY.md'nin değil, faz retrosunun evidir. -->
- **vitest.config.ts `@/` alias — ilk `@/` component testi.** `umami-script.test.tsx` gerçek bir `@/components/...` modülü import eden ilk component testiydi; mevcut smoke/parite testleri alias kullanmadığından runner'da çözülmüyordu → `fileURLToPath(new URL("./src", import.meta.url))` ile `@/→src` alias eklendi (tsconfig `paths` yansıması).
- **`<Script afterInteractive>` prerender'da senkron `<script>` değil `<link rel="preload" as="script">` + RSC payload olarak çıkar.** Bu yüzden 5-locale head doğrulaması "umami" ref'ini preload+RSC olarak arar; izole render testi next/script'i mock'lar (bare render'da senkron düğüm flaky — araştırma C'nin somut kanıtı).
- **`afterInteractive` LCP penceresinden sonra enjekte → yeni origin regresyon getirmedi.** `umami.kiwiailab.com` DNS+TLS+istek eklense de mobil LCP etkilenmedi (`network-requests` audit'i isteğin alındığını, LCP'nin değişmediğini gösterdi). "Network lever lab-görünür" kuralı **post-LCP** script için geçerli değil (memory `lighthouse-lantern...` bu fazda rafine edildi).

### DevFlow'a Öneri
<!-- Bu fazda fark edilen, DevFlow yönteminin geneline dair (proje-özel OLMAYAN) iyileştirmeler. Buraya yazılır + kullanıcıya bildirilir; DevFlow'a ayrı oturumda taşınır. -->
- **verify-phase, yapısal olarak o oturumda gerçekleştirilemeyen canlı-doğrulama senaryolarını baştan ⏳ işaretlemeli + "geçti" iddiasına kanıt-artefaktı şartı koymalı.** Bu fazda ilk verify geçişi, merge-sonrası ancak yapılabilecek bir canlı +1'i "gördüm" diye kaydetmeye yaklaştı; ikinci verify (re-run) kanıtla çürüttü. DevFlow-genel iyileştirme: verify-phase, bir senaryonun gerçekleştirilebilirliğini (ör. "bu ortamda mümkün mü?") sorgulayıp mümkün değilse otomatik ⏳ merge-bekliyor'a düşürmeli ve canlı "geçti" için kanıt (panel/HTML/merge-base) talep etmeli — böylece sahte-geçmiş kaydı yapısal olarak engellenir. (Re-run mekanizması sonunda yakaladı; ama önden guard daha ucuz.)

## Kalite Kontrol Sonuçları

> QUALITY.md eksenleri sistematik kontrol edildi. Faz yüzeyi çok küçük: 2 yeni dosya (`components/analytics/umami-script.tsx`, `tests/umami-script.test.tsx`) + `[locale]/layout.tsx` (+2 satır: import + `<UmamiScript />`) + `vitest.config.ts` (`@/` alias) + perf artefaktları/README. Çekirdek eksenler: **Performans** + **Test Kapsamı**.

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft | ✅ | Görünmez script tag — imzaya/UI'a dokunulmadı, template smell yok. |
| Erişilebilirlik | ✅ | UI değişmedi; a11y guardrail (Playwright/axe çift-tema) CI'da yeşil, regresyonsuz. |
| Performans | ✅ | 7.02 same-env before/after: mobil LCP 2714ms ≤ Faz6 3164ms, masaüstü 660ms, CLS 0; `afterInteractive` post-LCP → yeni origin LCP'ye değmedi (network-requests audit teyit). |
| Yerelleştirme & RTL | ✅ | Yeni görünür metin yok → i18n dokunuşu gerekmedi; script 5 locale head'inde (`[locale]/layout`); parite testi yeşil. |
| Modülerlik & Bakım | ✅ | Ayrı tek-sorumluluklu bileşen; config sabitleri (public, sır değil) gerekçeli hardcode; rollback = tek satır (`<UmamiScript />`). |
| Hata Yönetimi & Degradasyon | ✅ | Umami origin erişilemez/bloke → site kırılmaz (`afterInteractive`, render'a bağımlı değil; body/hero prerender'da bağımsız — UAT S7). |
| Güvenlik | ✅ | Değerler public config (yayınlanan HTML'de görünür), sır değil → env gerekmedi (gerekçeli); kaynak kendi self-hosted origin, Umami cookieless (PII yok); yeni saldırı yüzeyi yok. |
| Test Kapsamı | ✅ | İzole render testi (jsdom + `vi.mock("next/script")`) — doğru katman; D1.5 kümülatif konvansiyon sürdü; `npm test` 7/7 + CI `fast`+`a11y` yeşil. |

### Kullanıcı Yolculuğu & Boşluk Tespiti

Bu faz kullanıcıya görünür bir yüzey eklemedi (analytics script arka planda) → kullanıcı yolculuğu değişmedi, akışta kopukluk yok. Tek "boşluk" milestone'un canlı-doğrulama çekirdeğinin (S9-10) faz kapanışında açık kalması — ama bu sahipsiz bir boşluk değil: yapısal kısıt (data-domains + merge=tüm revize) nedeniyle **v0.2 production release** adımına bilinçle ve kayıtlı biçimde devredildi. Sahiplenen adım net; kaybolan iş yok.

## Sonuç

Faz 7 (Umami analytics E1) review tamamlandı. İki task (7.01 bileşen+entegrasyon+test, 7.02 perf regresyon doğrulaması) ✅; otomatik kontroller + otonom UAT 1-8 ✅ (başarısız senaryo / fix task yok); 8 kalite ekseni ✅. Milestone'un **kod-tarafı + perf tabanı** tam karşılandı; **canlı gözle-doğrulama çekirdeği (S9-10)** yapısal kısıt gereği v0.2 production release'e bilinçle ertelendi ve dürüstçe açık kaydedildi (sahte-geçmiş engellendi — verify re-run kanıtı). Faz 6 perf tabanı regresyonsuz; imza/parite/a11y guardrail'leri korundu. v0.2 içerik fazları (4-7) tamamlandı → sırada versiyon-sonu sabit fazları (teknik borç → senaryo testi → prd-review).

---

**Oluşturulma:** 2026-07-01
**Son Güncelleme:** 2026-07-01 — review-phase 7: retrospektif + 8-eksen kalite kontrolü (hepsi ✅) yazıldı; faz ✅ Tamamlandı. Milestone kod-tarafı + perf tabanı tam; canlı çekirdek (S9-10) v0.2 production release'e ertelendi (dürüst kayıt). v0.2 içerik fazları (4-7) tamam → sırada teknik borç fazı (discuss-phase 8 promote eder).
