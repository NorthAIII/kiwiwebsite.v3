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

> Bu bölüm `/devflow:research-phase` oturumunda doldurulur.

---

## Task Listesi

> Bu bölüm `/devflow:plan-phase` oturumunda doldurulur.

<!-- KURAL: Task Listesi yalnızca özet tablodur. İcra detayı `tasks/TASK-N.md`'ye yazılır. -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | plan-phase 7 sonrası doldurulacak |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

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
**Son Güncelleme:** 2026-07-01 — discuss-phase 7: kapsam tartışması tamamlandı (Umami E1; pageview-only, afterInteractive, render testi, merge-sonrası canlı doğrulama).
</content>
</invoke>
