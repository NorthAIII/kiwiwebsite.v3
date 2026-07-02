# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **run-task 9.09 (S9 adversarial/holistik) tamamlandı — fazın son task'ı (9/9 ✅):** `next build` temiz (37/37 SSG, 0 error/warn/MISSING/deprecation) + render MISSING_MESSAGE sweep 30 sayfa-locale→0 (AR dir=rtl) = regresyon tabanı · JS-off SSG (curl) 6/6 okunur (h1+nav+metin 1272–4000 char, LivingFlow client-only markup'ta yok=beklenen) · race 14/14 (standalone Playwright `channel:'chrome'`+swiftshader): tema 11-tık→html.dark==localStorage==aria-pressed+reload kalıcı · dil zinciri en→de→ar→es→tr→final tutarlı (AR dir=rtl) · scroll/anchor storm→6 bölüm sağlam+#how settle+pin/scrub kilidi yok+0 ScrollTrigger hatası. Ground-truth served==disk prerender (stale-server yok). **Kapsam-içi bug yok, kaynak kod değişmedi.** Adım=verify → sıradaki: **verify-phase 9** (UAT, yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 9 (v0.2 versiyon-sonu **senaryo testi**) — discuss-phase 9 tamamlandı, PHASES tablosunda 🔄. Kapsam = ana sayfa + 5 alt sayfa uçtan-uca çapraz doğrulama (yeni feature üretmez), Faz 3 (v0.1 senaryo testi) deseninde ama alt sayfalar dahil (Faz 8 çıtaya çekti); alt-sayfa harness'i (`subpages-a11y.spec.ts` + `a11y-helpers.ts`) yeniden kullanılır. Faz 8 ✅; Faz 7 (Umami E1) ✅; Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y) ✅.
**Adım:** verify — **fazdaki tüm task'lar tamamlandı (9/9 ✅)** → sıradaki adım **verify-phase 9** (UAT; yeni oturum). 9.01 (S1) ✅, 9.02 (S5+S6-render) ✅, 9.03 (S8-suite+S6-parite) ✅, 9.04 (S8-Lighthouse) ✅, 9.05 (S3-degradasyon) ✅, 9.06 (S4-kontroller) ✅, 9.07 (S2-TR-yolculuk) ✅, 9.08 (S7-chatbot-0token) ✅, 9.09 (S9-adversarial) ✅. Kapsam + Araştırma + Plan + verify-plan tamamlandı (`phases/PHASE-9.md`): 9 doğrulama task'ı (S1–S9 → TASK-9.01…9.09), suite-first hibrit metodoloji, TK1–TK7.
**İlerleme:** run-task 9.09 (S9 adversarial/holistik, 2026-07-02) tamamlandı — `next build` **temiz** (compile 8.3s, lint+types ✓, 37/37 SSG; log 71 satır 0 error/warn/fail/MISSING/deprecation) + render `MISSING_MESSAGE` sweep **30 sayfa-locale → 0** (6 sayfa × 5 dil, AR home dir=rtl) = regresyon tabanı. **JS-kapalı SSG (curl, TR cookie):** 6/6 sayfa okunur (non-greedy strip görünür-metin 1272–4000 char, gerçek `<h1>` + nav "← Ana sayfa"/6 iç link + tek `<main>`, MM=0); LivingFlow client-only → markup'ta yok (dekoratif, beklenen). **Race (standalone Playwright `channel:'chrome'`+swiftshader, fresh prod :3100, 14/14):** WebGL sanity (webgl2+canvas=1, mode high → race anlamlı); **tema** 11 hızlı tık → `html.dark`==`localStorage`=="dark"==`aria-pressed` tutarlı (toggle DOM-class ground-truth, React desync yok) + reload kalıcı; **dil** hızlı zincir en→de→ar→es→tr → final `lang==url==tr`+render+MM yok, AR→`lang=ar`+`dir=rtl`+`/ar`; **scroll/anchor** 8'li anchor storm (60ms) → `#how` settle (top=0), native jump bottom6246↔top0 (**pin/scrub kilidi yok**), 12'li rastgele savurma→6 bölüm sağlam; tüm storm'larda **0 JS/ScrollTrigger hatası**. Ground-truth served `/ar` h1 == disk prerender `ar.html` (fresh-build, stale-server yok). **Kapsam-içi bug yok, kaynak kod değişmedi** (TK7: yeni kapsam-dışı kalem yok). **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 (S9-10 Faz 7) o adımda kapanır (senaryo testi kod-tarafı varlığı S8'de doğrular, canlı panel değil). **Kapsam dışı (bilinçli açık):** brief mobil perf (gerçek-cihaz duvarı), TB-C npm audit, `/bunker-os`→`/crew-os` redirect + `/forum`→404 (görsel/SEO versiyonu), dil setini değiştirme (prd-review).
**Son Faz Dokümanı:** `phases/PHASE-9.md` (🔄 Devam ediyor — 9 task, 9.01–9.09 ✅; sıradaki verify-phase). Faz 8 ✅ `phases/PHASE-8.md`.

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Fazdaki tüm task'lar tamamlandı — **aktif task yok** (Faz 9, adım=verify → **verify-phase 9**). 9.09 (S9-adversarial) ✅ archive'da; sıradaki adım UAT (yeni oturum).
**Durum:** Faz 9 (senaryo testi) 🔄 — adım=verify. **9.01–9.09 ✅ (9/9)**. Faz 8 tüm task'ları ✅ (8.01→8.06) archive'da.
**İlerleme:** run-task 9.09 (S9 adversarial/holistik) tamamlandı (2026-07-02): `next build` temiz (37/37 SSG, 0 error/warn/MISSING/deprecation) + render MISSING_MESSAGE sweep 30 sayfa-locale→0 = regresyon tabanı · JS-off SSG (curl) 6/6 okunur (h1+nav+metin, LivingFlow client-only markup'ta yok=beklenen) · race 14/14 (standalone Playwright `channel:'chrome'`+swiftshader): tema 11-tık→html.dark==localStorage==aria-pressed+reload kalıcı · dil zinciri en→de→ar→es→tr→final tutarlı (AR dir=rtl) · scroll/anchor storm→6 bölüm sağlam+#how settle+pin/scrub kilidi yok+0 ScrollTrigger hatası. Ground-truth served==disk prerender. Kapsam-içi bug yok, kaynak kod değişmedi.

---

## Task Durumu (Aktif Faz)

> Faz 9 (senaryo testi) 🔄 — 9 task, **9.01–9.09 ✅ (9/9)**; sıradaki adım verify-phase. Faz 8 ✅ (8.01-8.06 archive'da, detay `phases/PHASE-8.md`); Faz 7 (Umami E1) ✅; Faz 6 ✅ (6.06 ❌ iptal); Faz 5 ✅; Faz 4 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 9.01 | TASK-9.01 | ✅ Tamamlandı | S1 — giriş/yönlendirme matrisi (curl) |
| 9.02 | TASK-9.02 | ✅ Tamamlandı | S5 + S6-render — taksonomi/dürüstlük + non-TR render bütünlüğü (curl/script-strip) |
| 9.03 | TASK-9.03 | ✅ Tamamlandı | S8-suite + S6-parite — `test:e2e` 52 + `test` 7 + CI `fast`+`a11y` yeşil |
| 9.04 | TASK-9.04 | ✅ Tamamlandı | S8-Lighthouse — a11y=100 çift-tema (6 dark kanonik + 12 light/dark axe) + perf korunan taban |
| 9.05 | TASK-9.05 | ✅ Tamamlandı | S3 — degradasyon (standalone Playwright): 57 kontrol 48✓·9 N/A·0✗; reduced/no-WebGL→StaticFlow + mobil-low→FlowCanvas + AR-RTL×dark×reduced + taşma/CLS |
| 9.06 | TASK-9.06 | ✅ Tamamlandı | S4 — kontroller & kalıcılık (standalone Playwright): 17 kontrol 17✓·0✗; tema toggle+reload kalıcılık+LivingFlow uniform (sameNode) + dil-switcher path-koru/Escape/dış-tık/klavye + klavye-only 14 öğe yeşil focus-visible |
| 9.07 | TASK-9.07 | ✅ Tamamlandı | S2 — tam TR yolculuğu + alt-sayfa çıkış/dönüş (curl+Playwright): 14 kontrol 14✓·0✗; bölüm sırası + çıkış href'leri + anchor scroll top≈0 + 4 alt-sayfa client-nav çıkış/dönüş (SPA-marker) |
| 9.08 | TASK-9.08 | ✅ Tamamlandı | S7 — chatbot 0-token (curl dummy-key + Playwright key-yok): malformed 10/10→400 + offline UI 8/8✓ + toplam API çağrısı=0; TK4 kanıtı |
| 9.09 | TASK-9.09 | ✅ Tamamlandı | S9 — adversarial/holistik (build+curl+Playwright): build temiz 37/37 SSG + 0 MISSING (30 page-locale) · JS-off SSG 6/6 okunur · race 14/14 (tema/dil/scroll-anchor tutarlı, pin-kilit yok, 0 JS hatası) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 8 task özetleri sıfırlandı** (Faz 8 detayları `phases/PHASE-8.md` + `tasks/archive/`).

**TASK-9.09 (S9 — adversarial / holistik kırma):**
- **Temiz build + tabanı:** `rm -rf .next && npm run build` **temiz** (37/37 SSG; log 71 satır **0** error/warn/fail/MISSING/deprecation); render `MISSING_MESSAGE` sweep **30 sayfa-locale → 0** (6×5, AR home dir=rtl) = regresyon tabanı.
- **JS-off SSG (curl, TR cookie) + race (standalone Playwright):** 6/6 sayfa JS'siz okunur (görünür metin 1272–4000 char, `<h1>`+nav+tek `<main>`; LivingFlow client-only→markup'ta yok=beklenen). Race **14/14** (`channel:'chrome'`+swiftshader, WebGL sanity canvas=1): tema 11-tık→`html.dark`==localStorage==aria-pressed+reload kalıcı · dil zinciri en→de→ar→es→tr→final tutarlı (AR dir=rtl) · anchor storm→#how settle+**pin/scrub kilidi yok**+6 bölüm sağlam; tüm storm'larda **0 JS/ScrollTrigger hatası**.
- **Kapsam-içi bug yok, kaynak kod değişmedi** (TK7: yeni kapsam-dışı kalem yok). Ground-truth served `/ar` h1==disk prerender `ar.html` (fresh-build, stale-server yok). Nüans: greedy `sed` metin-strip yanlış-negatif (visible=1)→node non-greedy strip.

**TASK-9.08 (S7 — chatbot 0-token: offline + sanitizasyon):**
- **Sanitizasyon kod-inceleme (`route.ts`):** apiKey gate `:21-24` **ilk** (yoksa 503) → `req.json()` try/catch parse-400 → filter **rol whitelist** (user/assistant) + `content` string+`trim>0` + `slice(-12)` **geçmiş sınırı** → sonda-user zorunlu-400 → `new Anthropic()` **`:48`**: tüm red **öncesinde** (QUALITY §7).
- **Dummy-key malformed (curl, key present-ama-geçersiz):** 10/10 girdi (geçersiz-JSON/`{}`/`[]`/not-array/trailing-assistant/**system-only enjeksiyon**/whitespace/non-string/empty-string/no-body) → **400**, Anthropic'e ulaşmadan → sıfır çağrı. **Key-yok (Playwright, `env -u`+environ count=0):** geçerli mesaj bile **503** (TK4: gate sanitizasyondan önce → naif malformed→400 yanlış-negatif); 8/8✓ — dürüst offline metni, **sahte '● online/canlı' dot YOK**, UI takılmadı, tüm `/api/chat`=503, **200-stream HİÇ**.
- **Toplam Anthropic API çağrısı=0** (gerçek key hiç, happy-path koşulmadı). Kapsam-içi bug yok, kaynak kod değişmedi. Nüans: dummy→no-key geçişinde stale `next-server` (pkill cmdline kaçırdı) → listening-PID+`kill`/`setsid` temiz restart (memory stray-server).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Aktif task yok — **fazdaki 9/9 task ✅**; sıradaki adım **verify-phase 9** (UAT). Bekleyen: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** 9 (v0.2 senaryo testi) · adım=verify — 9.01–9.09 ✅ (9/9); Faz 8 ✅ (8.01→8.06; review tamam); Faz 7 ✅; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: senaryo_testi
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-02 — run-task 9.09 (S9 adversarial/holistik) tamamlandı — fazın son task'ı (9/9 ✅). `next build` temiz (37/37 SSG, 0 error/warn/MISSING/deprecation) + render MISSING_MESSAGE sweep 30 sayfa-locale→0 = regresyon tabanı · JS-off SSG (curl) 6/6 okunur · race 14/14 (standalone Playwright `channel:'chrome'`+swiftshader: tema/dil/scroll-anchor tutarlı, pin-kilit yok, 0 JS/ScrollTrigger hatası). Ground-truth served==disk prerender. Kapsam-içi bug yok, kaynak kod değişmedi. Adım=verify → sıradaki: verify-phase 9.
