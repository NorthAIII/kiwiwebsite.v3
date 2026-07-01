# Phase 7: Umami Analytics Entegrasyonu (E1)

**Durum:** 🔄 Devam ediyor

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
| 7.02 | TASK-7.02 | ⬜ Bekliyor | Before/after Lighthouse perf regresyon doğrulaması (Faz 6 tabanına karşı; mobil+masaüstü, TR `/` cookie; preconnect ölç-önce) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

> **Canlı +1 doğrulama bir kod task'ı değildir:** `data-domains=kiwiailab.com` preview'ları saymaz → milestone'un "canlıda gözle doğrulandı" çekirdeği yapısal olarak **merge-sonrası** iş; **verify-phase**'de (post-merge, kiwiailab.com panelinde) doğrulanır. 7.01 preview'da script'in yüklendiğini (ağ sekmesi) doğrulamakla sınırlıdır.

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase` oturumunda doldurulur.

---

## Retrospektif

> Bu bölüm `/devflow:review-phase` oturumunda doldurulur.

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase` oturumunda doldurulur.

---

## Sonuç

> Bu bölüm `/devflow:review-phase` oturumunda doldurulur.

---

**Oluşturulma:** 2026-07-01
**Son Güncelleme:** 2026-07-01 — run-task 7.01 ✅: Umami bileşeni (`components/analytics/umami-script.tsx`) + `[locale]/layout.tsx` head entegrasyonu + izole render testi (`vi.mock("next/script")`); vitest.config'e `@/→src` alias eklendi (ilk `@/` component testi). npm test yeşil (7), build temiz, prerender'da script 5 locale head'inde. Sıradaki: run-task 7.02.
