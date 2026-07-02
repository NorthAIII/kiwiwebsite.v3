# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **run-task 9.07 (S2 tam TR yolculuğu + alt-sayfa çıkış/dönüş) tamamlandı:** curl+standalone Playwright 14 kontrol 14✓·0✗ — ana sayfa akış (top→how→sectors→bunker→forum→contact), çıkış href'leri mevcut, dead-`#`/`/tr/`-sızıntı yok, home+5 hedef 0 MISSING + 5 alt-sayfa 200/tek-`<main>`; anchor scroll top≈0 (ScrollTrigger stabil); 4 alt-sayfa client-nav çıkış (SPA-marker korundu) içerik bütün + history-back dönüş ana sayfayı bozmadan (6/6 bölüm). Kapsam-içi bug yok; #forum ilk-FAIL Lenis settle ölçüm artefaktıydı (reload+poll→top=0). Adım=task → sıradaki: **run-task TASK-9.08**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 9 (v0.2 versiyon-sonu **senaryo testi**) — discuss-phase 9 tamamlandı, PHASES tablosunda 🔄. Kapsam = ana sayfa + 5 alt sayfa uçtan-uca çapraz doğrulama (yeni feature üretmez), Faz 3 (v0.1 senaryo testi) deseninde ama alt sayfalar dahil (Faz 8 çıtaya çekti); alt-sayfa harness'i (`subpages-a11y.spec.ts` + `a11y-helpers.ts`) yeniden kullanılır. Faz 8 ✅; Faz 7 (Umami E1) ✅; Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y) ✅.
**Adım:** task — sıradaki adım **run-task TASK-9.08** (S7 chatbot 0-token: sanitizasyon kod-inceleme + dummy-key malformed 400 + key-yok 503 offline UI; toplam API çağrısı=0; yeni oturum). 9.01 (S1) ✅, 9.02 (S5+S6-render) ✅, 9.03 (S8-suite+S6-parite) ✅, 9.04 (S8-Lighthouse) ✅, 9.05 (S3-degradasyon) ✅, 9.06 (S4-kontroller) ✅, 9.07 (S2-TR-yolculuk) ✅. Kapsam + Araştırma + Plan + verify-plan tamamlandı (`phases/PHASE-9.md`): 9 doğrulama task'ı (S1–S9 → TASK-9.01…9.09), suite-first hibrit metodoloji, TK1–TK7.
**İlerleme:** run-task 9.07 (S2 tam TR yolculuğu + alt-sayfa çıkış/dönüş, 2026-07-02) tamamlandı — curl+grep (ana sayfa akış) + standalone Playwright (`channel:'chrome'`+swiftshader) 14 kontrol 14✓·0✗: bölüm ID sırası tam (top→how→sectors→bunker→forum→contact), çıkış href'leri mevcut (alpfit×3/bunker-os×2/vaka×1/2 bülten×1), dead-`#`/`/tr/`-sızıntı yok, home+5 hedef 0 MISSING + 5 alt-sayfa HTTP 200/tek-`<main>`/39–47KB; anchor scroll hedef top≈0 (Hero CTA #sectors/#contact + Nav #how/#bunker/#forum, Lenis+ScrollTrigger stabil); 4 alt-sayfa client-nav çıkış (`window.__spaMarker` korundu=full-reload yok→client-nav kanıtı) içerik bütün (h1 gerçek metin+`<main>`+0 MISSING) + history-back dönüş (App Router soft-nav) ana sayfayı bozmadan (url=`/`, 6/6 bölüm, hero h1 sağlam). Kapsam-içi bug yok, kaynak kod değişmedi; Faz 3 anchor path-düşme bu yüzeyde YOK (hash-anchor path değiştirmez). Ölçüm nüansı: #forum ilk-FAIL Lenis lerp:0.1 settle artefaktı→hedef-başına reload + settle-poll ile top=0. **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 (S9-10 Faz 7) o adımda kapanır (senaryo testi kod-tarafı varlığı S8'de doğrular, canlı panel değil). **Kapsam dışı (bilinçli açık):** brief mobil perf (gerçek-cihaz duvarı), TB-C npm audit, `/bunker-os`→`/crew-os` redirect + `/forum`→404 (görsel/SEO versiyonu), dil setini değiştirme (prd-review).
**Son Faz Dokümanı:** `phases/PHASE-9.md` (🔄 Devam ediyor — 9 task, 9.01–9.07 ✅). Faz 8 ✅ `phases/PHASE-8.md`.

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Sıradaki aktif task **TASK-9.08** (S7 — chatbot 0-token: sanitizasyon kod-inceleme + dummy-key malformed 400 + key-yok 503 offline UI; toplam API çağrısı=0) — Faz 9, adım=task. 9.07 (S2-TR-yolculuk) ✅ archive'da; **run-task ile TASK-9.08**'den devam (yeni oturum).
**Durum:** Faz 9 (senaryo testi) 🔄 — adım=task. 9.01–9.07 ✅ (7/9). Faz 8 tüm task'ları ✅ (8.01→8.06) archive'da.
**İlerleme:** run-task 9.07 (S2 tam TR yolculuğu + alt-sayfa çıkış/dönüş) tamamlandı (2026-07-02): curl+grep (ana sayfa akış) + standalone Playwright (sistem Chrome + swiftshader) 14 kontrol 14✓·0✗ — bölüm sırası tam, çıkış href'leri mevcut, dead-`#`/`/tr/`-sızıntı yok, home+5 hedef 0 MISSING + 5 alt-sayfa 200/tek-`<main>`; anchor scroll top≈0; 4 alt-sayfa client-nav çıkış (SPA-marker korundu) içerik bütün + history-back dönüş ana sayfayı bozmadan (6/6 bölüm). Kapsam-içi bug yok, kaynak kod değişmedi; Faz 3 anchor path-düşme burada YOK.

---

## Task Durumu (Aktif Faz)

> Faz 9 (senaryo testi) 🔄 — 9 task hazır, 9.01–9.07 ✅ (7/9). Faz 8 ✅ (8.01-8.06 archive'da, detay `phases/PHASE-8.md`); Faz 7 (Umami E1) ✅; Faz 6 ✅ (6.06 ❌ iptal); Faz 5 ✅; Faz 4 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 9.01 | TASK-9.01 | ✅ Tamamlandı | S1 — giriş/yönlendirme matrisi (curl) |
| 9.02 | TASK-9.02 | ✅ Tamamlandı | S5 + S6-render — taksonomi/dürüstlük + non-TR render bütünlüğü (curl/script-strip) |
| 9.03 | TASK-9.03 | ✅ Tamamlandı | S8-suite + S6-parite — `test:e2e` 52 + `test` 7 + CI `fast`+`a11y` yeşil |
| 9.04 | TASK-9.04 | ✅ Tamamlandı | S8-Lighthouse — a11y=100 çift-tema (6 dark kanonik + 12 light/dark axe) + perf korunan taban |
| 9.05 | TASK-9.05 | ✅ Tamamlandı | S3 — degradasyon (standalone Playwright): 57 kontrol 48✓·9 N/A·0✗; reduced/no-WebGL→StaticFlow + mobil-low→FlowCanvas + AR-RTL×dark×reduced + taşma/CLS |
| 9.06 | TASK-9.06 | ✅ Tamamlandı | S4 — kontroller & kalıcılık (standalone Playwright): 17 kontrol 17✓·0✗; tema toggle+reload kalıcılık+LivingFlow uniform (sameNode) + dil-switcher path-koru/Escape/dış-tık/klavye + klavye-only 14 öğe yeşil focus-visible |
| 9.07 | TASK-9.07 | ✅ Tamamlandı | S2 — tam TR yolculuğu + alt-sayfa çıkış/dönüş (curl+Playwright): 14 kontrol 14✓·0✗; bölüm sırası + çıkış href'leri + anchor scroll top≈0 + 4 alt-sayfa client-nav çıkış/dönüş (SPA-marker) |
| 9.08 | TASK-9.08 | ⬜ Bekliyor | S7 — chatbot 0-token (offline + sanitizasyon) ← sıradaki |
| 9.09 | TASK-9.09 | ⬜ Bekliyor | S9 — adversarial / holistik kırma |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 8 task özetleri sıfırlandı** (Faz 8 detayları `phases/PHASE-8.md` + `tasks/archive/`).

**TASK-9.07 (S2 — tam TR yolculuğu + alt-sayfa çıkış/dönüş):**
- **Ana sayfa akış (curl+grep, TR cookie):** bölüm ID sırası tam `top→how→sectors→bunker→forum→contact`; çıkış href'leri mevcut (`/spor-salonu-yazilimi`×3, `/bunker-os`×2, `/vaka-calismalari`×1, 2 bülten×1), anchor CTA hepsi mevcut bölüm ID'sine çözülüyor; **dead-`#`/boş-href yok** (Footer filter), **`/tr/` sızıntısı yok**, home+5 hedef **0 MISSING**, 5 alt-sayfa **HTTP 200 + tek `<main>` + 39–47KB**.
- **Runtime (standalone Playwright, `channel:'chrome'`+swiftshader) 14✓·0✗:** anchor scroll hedef `top≈0` (Hero #sectors/#contact + Nav #how/#bunker/#forum, Lenis+ScrollTrigger stabil); **4 alt-sayfa client-nav çıkış** — `window.__spaMarker` korundu (full-reload olsa silinirdi → client-nav kanıtı), içerik bütün (h1 gerçek metin+`<main>`+0 MISSING); **history-back dönüş** ana sayfayı bozmadan (url=`/`, 6/6 bölüm, hero h1 sağlam).
- **Kapsam-içi bug yok, kaynak kod değişmedi.** `#forum` ilk-FAIL (foruma değil dibe kaymış) **ölçüm artefaktıydı** (Lenis lerp:0.1 uzun smooth-scroll sabit-bekleme'de oturmadı + native `scrollTo(0,0)` Lenis-state kirletti) → hedef-başına reload + `settleScroll()` polling ile `top=0`; Faz 3 anchor path-düşme burada YOK (hash-anchor path değiştirmez).

**TASK-9.06 (S4-kontroller/kalıcılık — tema/dil/klavye):**
- Standalone Playwright (`channel:'chrome'`+swiftshader) **17 kontrol 17✓·0✗**. Tema toggle (home+spor-salonu-yazilimi, light↔dark): `html.dark`+`localStorage['theme']`+`themechange` event+bg flip; **reload kalıcı** (early.dark==final==ls, render-blocking FOUC script→FOUC yok); **LivingFlow uniform** canvas **sameNode** (remount yok→FlowCanvas MutationObserver `html.class` izler, uniform renk çevirir).
- Dil-switcher **path-koru** (`router.replace(pathname,{locale})`: sub TR→EN=`/en/spor-salonu-yazilimi`, home TR→DE=`/de`)+Escape/dış-mousedown/klavye(Enter aç·Escape kapat) kapanış; klavye-only 14 interaktif öğede **yeşil** focus-visible (rgb(31,122,61), 2px solid)+14 Tab boyunca odak kaybı yok+klavye tema toggle.
- **Kapsam-içi bug yok, kaynak kod değişmedi.** Faz 3 "anchor path-düşme" record-not-fix bu yüzeyde **YOK** (switcher `router.replace` → path korunur). Ölçüm nüansı: Tailwind v4 `transition-colors` outline-color'ı anime eder→full-motion ara-değer verir, `reducedMotion:'reduce'` ile ölçüldü (gelecek focus-visible ölçümleri için disiplin).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Sıradaki TASK-9.08 (S7 chatbot 0-token — sanitizasyon + dummy-key malformed 400 + key-yok 503 offline UI; API çağrısı=0) — Faz 9, adım=task. 9.01–9.07 ✅ (7/9). Sıradaki: run-task TASK-9.08. Bekleyen: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** 9 (v0.2 senaryo testi) · adım=task — 9.01–9.07 ✅ (7/9); Faz 8 ✅ (8.01→8.06; review tamam); Faz 7 ✅; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: senaryo_testi
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-02 — run-task 9.07 (S2 tam TR yolculuğu + alt-sayfa çıkış/dönüş): curl+grep (ana sayfa akış) + standalone Playwright (`channel:'chrome'`+swiftshader) 14 kontrol 14✓·0✗ — bölüm sırası tam (top→how→sectors→bunker→forum→contact), çıkış href'leri mevcut, dead-`#`/`/tr/`-sızıntı yok, home+5 hedef 0 MISSING + 5 alt-sayfa 200/tek-`<main>`; anchor scroll top≈0 (Lenis+ScrollTrigger stabil); 4 alt-sayfa client-nav çıkış (SPA-marker korundu) içerik bütün + history-back dönüş ana sayfayı bozmadan (6/6 bölüm). Kapsam-içi bug yok, kaynak kod değişmedi; #forum ilk-FAIL Lenis settle ölçüm artefaktıydı (reload+poll→top=0). Adım=task. Sıradaki: run-task TASK-9.08.
