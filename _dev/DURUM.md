# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-17 — **run-task TASK-17.04 ✅ — S3 Living Flow degradasyon GEÇTİ (regresyonsuz) + 1 kapsam-içi craft bulgusu (BULGU-S3), regresyon değil, kullanıcıya sunuldu.** Runtime C (`page.route`+system Chrome WebGL); ayırt-edicilik sanity geçti (WebGL2 has:true; home high FlowBackdrop fixed canvas=1). Ana sayfa mod matrisi hepsi ✓: light/dark FOUC yok, reduced/no-WebGL→StaticFlow canvas=0, **mobil-low nabız desktop-only**, AR-RTL×dark×reduced çakışmasız. Taşma **6/6 overflowX=0** (home+alpfit 320/768/1440) + **CLS=0** iki sayfa (perf taban CLS bileşeni teyit). **BULGU-S3:** alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde animasyonlu alan yok (yalnız base-wash); kök neden `FlowBackdrop` yalnız ana sayfada; **crew-os ile birebir → v0.4 regresyonu değil, Faz 12 deseni**; degradasyon/a11y doğru → craft nüansı, kullanıcı kararı (fix task vs prd-review). Kaynak kod değişmedi; harness silindi. Fazlar 1–16 ✅, Faz 17 🔄 (Adım: **task**, 4 task kaldı). **v0.4 TR CANLI** (`main`=`f173234`). **Sıradaki: `/devflow:run-task` → TASK-17.05** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (discuss-phase 17 girdi, kapsam damgalandı). Doğrulama fazı — yeni feature üretilmez; ana sayfa + 5 alt sayfa uçtan-uca (S1–S9), delta odağı **Alpfit Plus ürün vitrini** (Faz 15) + test-what's-live (v0.4 canlıda `f173234`). Önceki faz **16 ✅** (v0.4 versiyon-sonu teknik borç + TR release). Fazlar 1–16 ✅.
**Adım:** **task** — TASK-17.04 ✅ (S3 Living Flow degradasyon runtime C: `page.route`+system Chrome; sanity geçti, ana sayfa mod matrisi hepsi ✓, taşma 6/6 overflowX=0 + CLS=0 iki sayfa; **BULGU-S3** = alt-sayfa masaüstü hero'da animasyonlu alan yok, regresyon değil/craft nüansı, kullanıcıya sunuldu). Fazda 4 task kaldı (17.05–17.08). Katman sırası A build-ground-truth (01-03 ✅) → C runtime `page.route`+system Chrome (04 ✅, 05-07) → adversarial+canlı duman (08). **Sıradaki: `/devflow:run-task` → TASK-17.05** (yeni oturum). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 gym PNG silme; versiyon-sonu finalizasyona, kapsam dışı; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu); (3) non-TR alpfit stale-TR (versiyon-sınırı → prd-review; 17.02/17.03'te yapısal parite teyit — görünür kopukluk yok); (4) **BULGU-S3** (17.04) — alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde animasyonlu Living Flow yok (yalnız base-wash; `FlowBackdrop` alt sayfalarda mount değil); crew-os ile birebir → v0.4 regresyonu değil, Faz 12 deseni; degradasyon/a11y doğru → craft nüansı, **prd-review'a ertelendi** (kullanıcı: devam; bu fazda fix task açılmadı — olası fix = alt sayfalara FlowBackdrop mount).
**İlerleme:** run-task TASK-17.04 (2026-07-17) — S3 Living Flow degradasyon geçti (runtime C; sanity ✓, ana sayfa matrisi ✓, taşma 6/6 + CLS=0; BULGU-S3 craft bulgusu regresyon değil, kullanıcıya sunuldu); kaynak kod değişmedi. Sıradaki: run-task TASK-17.05.
**Son Faz Dokümanı:** `phases/PHASE-17.md` (🔄). Önceki: `phases/PHASE-16.md` (✅ v0.4 teknik borç), `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** senaryo_testi (review-phase 16 damgaladı — v0.4 teknik borç fazı ✅). **Faz 17 (senaryo testi) 🔄 girildi** (discuss-phase 17); TR canlı (`f173234`) → Faz 17 test-what's-live literal → sonra zorunlu prd-review. non-TR çeviri prd-review'a.

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-17.05** ⬜ Bekliyor — sıradaki çalıştırılacak (S4 kontroller & kalıcılık — C: `page.route`+Chrome; tema toggle localStorage+reload+FOUC yok+Living Flow uniform, dil-switcher path-koru **Alpfit dahil** Escape/dış-tık, klavye-only + focus-visible yeşil `reducedMotion:'reduce'`). TASK-17.04 ✅ (S3 degradasyon geçti + BULGU-S3 craft bulgusu). 4 task ⬜ (TASK-17.05–17.08).
**Durum:** Fazlar 1–16 ✅, Faz 17 🔄 (senaryo testi, Adım: task — 17.01+17.02+17.03+17.04 ✅); Versiyon Sonu Durumu `senaryo_testi`. **v0.4 TR canlı** (`f173234`).
**İlerleme:** run-task TASK-17.04 (2026-07-17) — S3 Living Flow degradasyon geçti (runtime C; ana sayfa matrisi ✓, taşma 6/6 + CLS=0), BULGU-S3 craft bulgusu (regresyon değil, kullanıcıya sunuldu). Sıradaki adım: run-task TASK-17.05.

---

## Task Durumu (Aktif Faz)

> **Faz 17 🔄** (plan-phase 17 ✅, 2026-07-17). S1–S9 → **8 task** (katman sırası A build-ground-truth → C runtime → adversarial+canlı). Detay + açıklamalar → `phases/PHASE-17.md` Task Listesi. Doğrulama fazı: kaynak kod değişmez (kapsam-içi bug → reaktif düzeltme task'ı istisnası).

| # | Task | Durum | Kısa |
|---|------|-------|------|
| 17.01 | TASK-17.01 | ✅ Tamamlandı | S1 giriş/yönlendirme matrisi + taze `next build` ground-truth (A) — geçti, 0 bug |
| 17.02 | TASK-17.02 | ✅ Tamamlandı | S5+S6-render + Alpfit render bütünlüğü (prerender grep, A) — geçti, 0 bug |
| 17.03 | TASK-17.03 | ✅ Tamamlandı | S8-suite + S6-parite (Vitest 39/39 + CI `fast`+`a11y` success = axe 50-test mührü; `alpfit` 133-leaf parite) — geçti, 0 bug |
| 17.04 | TASK-17.04 | ✅ Tamamlandı | S3 Living Flow degradasyon + Alpfit before/after + CLS (C) — geçti (regresyonsuz); BULGU-S3 (alt-sayfa masaüstü animasyonlu alan yok, regresyon değil/craft, kullanıcıya) |
| 17.05 | TASK-17.05 | ⬜ Bekliyor | S4 kontroller & kalıcılık (tema/dil/klavye, Alpfit dahil) (C) |
| 17.06 | TASK-17.06 | ⬜ Bekliyor | S2 tam TR yolculuğu (Alpfit Plus çıkış/dönüş odak) (C+A) |
| 17.07 | TASK-17.07 | ⬜ Bekliyor | S7 chatbot 0-token (offline+sanitizasyon; 0 API çağrısı) |
| 17.08 | TASK-17.08 | ⬜ Bekliyor | S9 adversarial/holistik + canlı duman (test-what's-live) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 16 kapandı (v0.4 versiyon-sonu teknik borç) → Faz 16 task özeti (TASK-16.01) PHASE-16'ya mezun edildi.**

**TASK-17.04** ✅ (S3 Living Flow degradasyon runtime — doğrulama, kaynak kod değişmedi)
- Runtime C (`page.route`+system Chrome WebGL); ayırt-edicilik sanity ✓ (WebGL2 probe has:true; home high FlowBackdrop fixed canvas=1). Ana sayfa mod matrisi hepsi ✓: light/dark **FOUC yok** (early===final), reduced/no-WebGL → StaticFlow canvas=0, **mobil-low nabız desktop-only** (canvasFixed=0/hero=1), AR-RTL×dark×reduced `lang=ar`+`dir=rtl`+dark+static çakışmasız.
- Taşma **6/6 overflowX=0** (home+alpfit 320/768/1440) + **CLS=0** iki sayfa (perf korunan taban CLS bileşeni teyit). Konsol: tek benign 404 `/script.js` (Umami offline, render'a etkisiz).
- **BULGU-S3** (kapsam-içi, regresyon DEĞİL): alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde canvas=0/StaticFlow=0 → yalnız base-wash (animasyonlu alan yok); kök neden `FlowBackdrop` yalnız ana sayfada mount; crew-os ile birebir → v0.4 regresyonu değil, Faz 12 deseni; degradasyon/a11y doğru → **craft nüansı, kullanıcı kararına sunuldu** (fix task vs prd-review). **0 bloklayıcı bug.**

**TASK-17.03** ✅ (S8-suite + S6-parite — doğrulama, kaynak kod değişmedi)
- Vitest: taze `next build` 37/37 SSG temiz + `npm run test` **39/39 yeşil** (seo-metadata 16 + seo-redirects 16 [routes-manifest'e bağlı gerçekten koştu] + i18n-parity 5 + umami 1 + smoke 1); `alpfit` **133 leaf × 5 dil birebir parite** (ayrık teyit, 316 leaf/dil 0 diff).
- CI run `29591588087` HEAD `5248a76`: `fast`+`a11y` **iki job da `conclusion=success`** → axe `subpages-a11y` **50 test çift-tema WCAG-AA 0 ihlal** = a11y=100 otoritatif mühür (GitHub runner; yerel `next start` denenmedi, memory kuralı).
- Perf korunan taban argument-from-unchanged git-temelli (home 13.03/living-flow 12.03 v0.4'te dokunulmadı; `globals.css` salt-ekleme `--color-surface`; alpfit-dışı tek diff orphan `GymSoftwareShowcase.tsx` silme) → masaüstü 100/mobil LCP taban değişmedi; Alpfit CLS→17.04. **0 kapsam-içi bug.**

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-17.05** ⬜ Bekliyor (sıradaki `/devflow:run-task`; runtime C katmanı — S4 kontroller & kalıcılık). TASK-17.01 ✅ (S1) · TASK-17.02 ✅ (S5+S6-render+Alpfit render) · TASK-17.03 ✅ (S8-suite+S6-parite) · TASK-17.04 ✅ (S3 degradasyon + BULGU-S3). 4 task ⬜ (TASK-17.05–17.08). **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu) · non-TR alpfit stale-TR (prd-review; 17.02/17.03'te yapısal parite teyitli, kopukluk yok) · **BULGU-S3** (17.04): alt-sayfa hero'ları `high` masaüstünde animasyonlu Living Flow yok (yalnız base-wash; crew-os ile birebir → regresyon değil, craft nüansı; **prd-review'a ertelendi**, kullanıcı: devam).
**Aktif Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (Adım: task, 4/8 task ✅). Doğrulama fazı: ana sayfa + 5 alt sayfa uçtan-uca (S1–S9 → 8 task), delta odağı **Alpfit Plus** + test-what's-live. Plan ✅ (plan-phase 17). Önceki **Faz 16 ✅** (v0.4 teknik borç + TR release). **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **senaryo_testi**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–16 ✅. Faz dokümanı: `phases/PHASE-17.md` (🔄); release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-17 — **run-task TASK-17.04 ✅ — S3 Living Flow degradasyon GEÇTİ (regresyonsuz) + 1 kapsam-içi craft bulgusu (BULGU-S3), regresyon değil, kullanıcıya sunuldu.** Runtime C: `tests/_verify-s3.mjs` (`page.route`+system Chrome 149 `channel:'chrome'`+swiftshader; taze `next build` 37/37 HEAD hizası; koşuldu+silindi). Ayırt-edicilik sanity **GEÇTİ** (WebGL2 probe `has:true` SwiftShader; home `high` → FlowBackdrop **fixed canvas=1** → yanlış-static değil, hidratasyon çalışıyor). Ana sayfa mod matrisi **hepsi ✓**: high light/dark **FOUC yok** (early===final; dark pre-paint), reduced-motion + no-WebGL → **StaticFlow SVG=1 / canvas=0**, **mobil-low nabız desktop-only** (375px canvasFixed=0/hero=1 → pageLevel yok, hero-contained korunur), AR-RTL×dark×reduced → `lang=ar`+`dir=rtl`+dark+static **çakışmasız**. Alpfit degradasyon doğru (reduced/no-WebGL→StaticFlow; mobil→animasyonlu canvas). Taşma **6/6 overflowX=0** (home+alpfit 320/768/1440) + **CLS=0** iki sayfa (perf korunan taban CLS bileşeni teyit; masaüstü perf 100 Faz 14 mühürlü, yeniden ölçülmedi). Konsol: tek benign 404 `/script.js` (Umami offline harness, render'a etkisiz) — gerçek page/WebGL/hidratasyon hatası yok. **BULGU-S3** (kapsam-içi, regresyon DEĞİL): alt-sayfa hero'ları (Alpfit `AlpfitHero` + crew-os `BunkerShowcase`) `high` masaüstünde animasyonlu Living Flow render etmiyor (canvas=0/StaticFlow=0 → yalnız base-wash gradyanı); kök neden `FlowBackdrop` yalnız ana sayfada mount (`page.tsx:43`), alt sayfalar `LivingFlow`'u FlowBackdrop'suz kullanıyor (high'da canvas mount etmez); **crew-os ile birebir** (parite koşusu) → v0.4 regresyonu değil, Faz 12 FlowBackdrop deseninden yerleşik (Faz 14 S3 geçti); degradasyon/a11y/taşma/CLS doğru → **craft nüansı, kullanıcı kararına sunuldu** (küçük fix task = alt sayfalara FlowBackdrop mount / veya prd-review craft kaydı). **Kaynak kod değişmedi** (doğrulama fazı); harness silindi. Fazlar 1–16 ✅, Faz 17 🔄 (Adım: task, 4/8 ✅). **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:run-task` → TASK-17.05** (yeni oturum).
