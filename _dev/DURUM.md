# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-18 — **run-task TASK-17.08 ✅ — S9 adversarial/holistik + canlı duman GEÇTİ, 0 kapsam-içi bug (1 harness artefaktı = BULGU-S9). Faz 17'nin 8/8 task'ı tamamlandı → Adım: verify.** A `next build` (HEAD `a103998`, 0 warn, 37/37 SSG, 30 prerender **0 MISSING_MESSAGE**) + C `page.route`/system Chrome + D curl canlı; 3 harness koşulup silindi (kaynak kod değişmedi). **JS-off 40/40 PASS** (6 sayfa okunur, Alpfit PhoneMockup 138 görünür + 0 img/49 svg; `.reveal` ölü baseline + `data-reveal` JS-off-güvenli). **Adversarial 13/14 PASS** (tema 9-tık race final-tutarlı+reload-kalıcı; dil zinciri lang==target 5/5 + AR rtl; scroll storm nabız tek WebGL context 1→1 + 0 ScrollTrigger/GSAP/Lenis hatası). **Canlı `f173234`:** 3 sayfa 200 + PhoneMockup 150× + `/api/chat` 503. **BULGU-S9** (dil zinciri default-locale TR harness'ta `/tr`) harness middleware-siz artefaktı (BULGU-S2 ailesi), canlı probe teyit (canlı TR→`/`), memory'de. **v0.4 TR CANLI** (`main`=`f173234`). **Sıradaki: `/devflow:verify-phase 17`** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (discuss-phase 17 girdi, kapsam damgalandı). Doğrulama fazı — yeni feature üretilmez; ana sayfa + 5 alt sayfa uçtan-uca (S1–S9), delta odağı **Alpfit Plus ürün vitrini** (Faz 15) + test-what's-live (v0.4 canlıda `f173234`). Önceki faz **16 ✅** (v0.4 versiyon-sonu teknik borç + TR release). Fazlar 1–16 ✅.
**Adım:** **verify** — **Faz 17'nin 8/8 task'ı tamamlandı** (17.01→17.08 ✅). TASK-17.08 ✅ (S9 adversarial/holistik + canlı duman: A `next build`+C `page.route`/system Chrome+D curl; **JS-off 40/40 PASS + adversarial 13/14 PASS [1 harness artefaktı] + canlı 3 sayfa 200/PhoneMockup 150×/chat 503; 0 kapsam-içi bug**). Katman sırası A build-ground-truth (01-03 ✅) → C runtime `page.route` (04-07 ✅) → adversarial+canlı duman (08 ✅). **Sıradaki: `/devflow:verify-phase 17`** (yeni oturum, UAT). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 gym PNG silme; versiyon-sonu finalizasyona, kapsam dışı; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu; S7+S9'da offline yolu doğrulandı); (3) non-TR alpfit stale-TR (versiyon-sınırı → prd-review; 17.02/17.03'te yapısal parite teyit — görünür kopukluk yok); (4) **BULGU-S3** (17.04) — alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde animasyonlu Living Flow yok (yalnız base-wash; `FlowBackdrop` alt sayfalarda mount değil); crew-os ile birebir → v0.4 regresyonu değil, Faz 12 deseni; degradasyon/a11y doğru → craft nüansı, **prd-review'a ertelendi** (kullanıcı: devam); (5) **BULGU-S2** (17.06) + **BULGU-S9** (17.08) — runtime harness ölçüm artefaktları (S2: `history.back()`-after-SPA; S9: dil zinciri default-locale TR `/tr` — ikisi de `page.route` middleware-siz servisin prod'dan ıraksaması, ürün bug'ı DEĞİL, memory'de, takip gerektirmez).
**İlerleme:** run-task TASK-17.08 (2026-07-18) — S9 adversarial/holistik + canlı duman geçti (JS-off 40/40 + adversarial 13/14 [1 harness artefaktı BULGU-S9] + canlı duman; 0 kapsam-içi bug); kaynak kod değişmedi. Faz 17 tüm task'lar ✅. Sıradaki: verify-phase 17.
**Son Faz Dokümanı:** `phases/PHASE-17.md` (🔄, 8/8 task ✅ → verify bekliyor). Önceki: `phases/PHASE-16.md` (✅ v0.4 teknik borç), `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** senaryo_testi (review-phase 16 damgaladı — v0.4 teknik borç fazı ✅). **Faz 17 (senaryo testi) 🔄 girildi** (discuss-phase 17); TR canlı (`f173234`) → Faz 17 test-what's-live literal → sonra zorunlu prd-review. non-TR çeviri prd-review'a.

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **Yok — Faz 17'nin 8/8 task'ı tamamlandı.** Sıradaki adım task değil **UAT**: `/devflow:verify-phase 17`. Son task TASK-17.08 ✅ (S9 adversarial/holistik + canlı duman; JS-off 40/40 + adversarial 13/14 [1 harness artefaktı] + canlı duman; 0 kapsam-içi bug).
**Durum:** Fazlar 1–16 ✅, Faz 17 🔄 (senaryo testi, **Adım: verify** — 17.01→17.08 ✅ 8/8); Versiyon Sonu Durumu `senaryo_testi`. **v0.4 TR canlı** (`f173234`).
**İlerleme:** run-task TASK-17.08 (2026-07-18) — S9 adversarial/holistik + canlı duman geçti (JS-off 40/40 + adversarial 13/14 + canlı; 0 kapsam-içi bug, 1 harness artefaktı BULGU-S9). Fazda tüm task'lar ✅. Sıradaki adım: verify-phase 17 (UAT).

---

## Task Durumu (Aktif Faz)

> **Faz 17 🔄** (plan-phase 17 ✅, 2026-07-17). S1–S9 → **8 task** (katman sırası A build-ground-truth → C runtime → adversarial+canlı). Detay + açıklamalar → `phases/PHASE-17.md` Task Listesi. Doğrulama fazı: kaynak kod değişmez (kapsam-içi bug → reaktif düzeltme task'ı istisnası).

| # | Task | Durum | Kısa |
|---|------|-------|------|
| 17.01 | TASK-17.01 | ✅ Tamamlandı | S1 giriş/yönlendirme matrisi + taze `next build` ground-truth (A) — geçti, 0 bug |
| 17.02 | TASK-17.02 | ✅ Tamamlandı | S5+S6-render + Alpfit render bütünlüğü (prerender grep, A) — geçti, 0 bug |
| 17.03 | TASK-17.03 | ✅ Tamamlandı | S8-suite + S6-parite (Vitest 39/39 + CI `fast`+`a11y` success = axe 50-test mührü; `alpfit` 133-leaf parite) — geçti, 0 bug |
| 17.04 | TASK-17.04 | ✅ Tamamlandı | S3 Living Flow degradasyon + Alpfit before/after + CLS (C) — geçti (regresyonsuz); BULGU-S3 (alt-sayfa masaüstü animasyonlu alan yok, regresyon değil/craft, kullanıcıya) |
| 17.05 | TASK-17.05 | ✅ Tamamlandı | S4 kontroller & kalıcılık (tema/dil/klavye, Alpfit dahil) (C) — geçti, 22/22 PASS, 0 bug |
| 17.06 | TASK-17.06 | ✅ Tamamlandı | S2 tam TR yolculuğu (Alpfit Plus çıkış/dönüş odak) (A+C) — geçti, 21/22 PASS, 0 bug; BULGU-S2 harness artefaktı |
| 17.07 | TASK-17.07 | ✅ Tamamlandı | S7 chatbot 0-token (offline+sanitizasyon) (A kod-inceleme+Vitest-mock+C) — geçti, 20/20 PASS, 0 gerçek çağrı, 0 bug |
| 17.08 | TASK-17.08 | ✅ Tamamlandı | S9 adversarial/holistik + canlı duman (test-what's-live) — geçti, JS-off 40/40 + adversarial 13/14 + canlı duman; 0 kapsam-içi bug; BULGU-S9 harness artefaktı |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 16 kapandı (v0.4 versiyon-sonu teknik borç) → Faz 16 task özeti (TASK-16.01) PHASE-16'ya mezun edildi.**

**TASK-17.08** ✅ (S9 adversarial/holistik + canlı duman — doğrulama, kaynak kod değişmedi; **fazın son task'ı**)
- Katman A `next build` ground-truth + C `page.route`/system Chrome (JS-off + adversarial race) + D curl canlı; 3 geçici harness (`_verify-s9-{jsoff,race,livelang}.mjs`) koşulup silindi. **Regresyon tabanı:** taze build HEAD `a103998` 0 warn/error, 37/37 SSG, **30 prerender 0 `MISSING_MESSAGE`**.
- **JS-off 40/40 PASS:** 6 TR sayfa okunur (h1 görünür+metinli, nav, `<main>`, metin 1252-5068ch, canvas=0, **0 gizli-opacity0 içerik**); Alpfit saf CSS/SVG PhoneMockup 138 görünür + 0 `<img>`/49 `<svg>`/8 bölüm (kök-neden: `.reveal` class/`is-in` kullanılmıyor, 17 bileşen JS-off-güvenli `data-reveal`). **Adversarial 13/14 PASS:** tema 9-tık race final-tutarlı (`html.dark`==localStorage==`aria-pressed`)+reload-kalıcı; dil zinciri en→de→ar→es→tr **lang==target 5/5**+AR rtl; scroll storm bölümler 7→7 + **nabız tek WebGL context 1→1** (leak yok) + overflowX=0 + scroll-lock yok + anchor settle + **0 ScrollTrigger/GSAP/Lenis hatası**.
- **Canlı duman (test-what's-live `f173234`):** `/`+`/spor-salonu-yazilimi`+`/crew-os` **200** + Alpfit **PhoneMockup 150×** canlı + "Crew OS" 14×/görünür "Bunker" 0 + `/bunker-os`→308→`/crew-os` + **`/api/chat` 503**. **BULGU-S9 (harness artefaktı, ürün bug'ı DEĞİL):** dil zinciri default-locale TR harness'ta URL `/tr` (prod `/tr`→307→`/` normalizasyonu middleware'de, `page.route`'ta yok; `html lang=tr` doğru); belirleyici canlı probe teyit (canlı dil-switch TR→`/`); BULGU-S2 ailesi, memory'de.

**TASK-17.07** ✅ (S7 chatbot 0-token — doğrulama, kaynak kod değişmedi)
- A kod-inceleme + Vitest SDK-mock (`_verify-s7.test.ts`, `@anthropic-ai/sdk` tümüyle mock → 0 ağ) + C offline UI (`_verify-s7-ui.mjs`, `page.route`+system Chrome, `/api/chat` intercept 503). **20/20 çekirdek assertion PASS (12 route + 8 UI), 0 gerçek Anthropic çağrısı, 0 kapsam-içi bug.**
- **Sanitizasyon sırası birebir:** 503-kapısı L22 → JSON guard L27 → role-whitelist L38 + `trim().length>0` L40 + `slice(-12)` L42 → trailing-user kısa-devre L44 → **`new Anthropic()` L48 (hepsinden SONRA)**. Route (Vitest 12/12): key-yok→503 (ctor hiç); 8 malformed varyant→400 (ctor+stream **hiç çağrılmadı** = kısa-devre kanıtı); `[system,user]`→system sıyrıldı, yalnız user forward; `slice(-12)` 20→12; SDK mock→0 çağrı.
- **Offline UI (8/8):** `#chat` **inline `<section>`** (position:static, floating değil), greeting görünür, **sahte online/çevrimiçi + ping-dot YOK**, gönder→`/api/chat` 503→zarif offline metni (`t("error")` "…çevrimdışı…"), UI takılmadı (kullanıcı balonu var, sonsuz Thinking yok, input kullanılabilir), stream hiç, **anthropicCalls=0** (tek benign dış: umami analytics offline). **Kayıtlı sahipli açık:** per-mesaj max-byte cap yok (min-length+geçmiş-sayısı var)→prd-review, litige edilmedi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **Yok — Faz 17'nin 8/8 task'ı tamamlandı; sıradaki adım `/devflow:verify-phase 17` (UAT).** TASK-17.01 ✅ (S1) · TASK-17.02 ✅ (S5+S6-render+Alpfit render) · TASK-17.03 ✅ (S8-suite+S6-parite) · TASK-17.04 ✅ (S3 degradasyon + BULGU-S3) · TASK-17.05 ✅ (S4 kontroller & kalıcılık, 22/22 PASS) · TASK-17.06 ✅ (S2 tam TR yolculuğu, 21/22 PASS + BULGU-S2 harness artefaktı) · TASK-17.07 ✅ (S7 chatbot 0-token, 20/20 PASS, 0 gerçek çağrı) · TASK-17.08 ✅ (S9 adversarial/holistik + canlı duman; JS-off 40/40 + adversarial 13/14 + canlı; 0 kapsam-içi bug + BULGU-S9 harness artefaktı). **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu; S7+S9'da offline yolu doğrulandı) · non-TR alpfit stale-TR (prd-review; 17.02/17.03'te yapısal parite teyitli, kopukluk yok) · **BULGU-S3** (17.04): alt-sayfa hero'ları `high` masaüstünde animasyonlu Living Flow yok (crew-os ile birebir → regresyon değil, craft nüansı; **prd-review'a ertelendi**, kullanıcı: devam) · **BULGU-S2** (17.06) + **BULGU-S9** (17.08): `page.route` runtime harness ölçüm artefaktları (S2 `history.back()`-after-SPA; S9 dil zinciri default-locale TR `/tr` — ikisi de middleware-siz servisin prod'dan ıraksaması); ürün bug'ı DEĞİL, memory'de, takip gerektirmez · **S7 kayıtlı açık** (17.07): per-mesaj max-byte cap yok (min-length+geçmiş-sayısı var)→prd-review hardening, litige edilmedi.
**Aktif Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (**Adım: verify, 8/8 task ✅**). Doğrulama fazı: ana sayfa + 5 alt sayfa uçtan-uca (S1–S9 → 8 task), delta odağı **Alpfit Plus** + test-what's-live. Plan ✅ (plan-phase 17). Önceki **Faz 16 ✅** (v0.4 teknik borç + TR release). **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **senaryo_testi**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–16 ✅. Faz dokümanı: `phases/PHASE-17.md` (🔄); release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-18 — **run-task TASK-17.08 ✅ — S9 adversarial/holistik + canlı duman GEÇTİ, 0 kapsam-içi bug (1 harness artefaktı = BULGU-S9). Faz 17'nin 8/8 task'ı tamamlandı → Adım: verify (sıradaki verify-phase 17).** Katman A `next build` ground-truth + C `page.route`/system Chrome (JS-off + adversarial race) + D curl canlı; 3 geçici harness (`tests/_verify-s9-{jsoff,race,livelang}.mjs`) proje-içine yazıldı, koşuldu, **silindi** (git temiz, kaynak kod değişmedi). **1) Regresyon tabanı (A):** taze `next build` HEAD `a103998` → 0 warn/error, "Compiled successfully", **37/37 SSG**; 30 sayfa-locale prerender **0 `MISSING_MESSAGE`** (+0 IntlError); Alpfit 5-locale birebir (PhoneMockup=150, 9 bölüm, 0 img/49 svg, tek `<main>`). **2) JS-off SSG okunabilirlik (C, JS kapalı) 40/40 PASS:** 6 TR sayfa okunur (h1 görünür+metinli, nav, `<main>`, metin 1252-5068ch, canvas=0, **0 gizli-opacity0 içerik**); Alpfit saf CSS/SVG PhoneMockup 138 görünür + 0 `<img>`/49 `<svg>`/8 bölüm; kök-neden `.reveal` class+`is-in` **kullanılmıyor** (globals.css ölü baseline), 17 bileşen JS-off-güvenli `data-reveal`. **3) Adversarial race (C, system Chrome swiftshader) 13/14 PASS:** WebGL2 sanity + home high FlowBackdrop canvas=1; tema 9 tek-tık race → final-tutarlı (`html.dark`==`localStorage.theme`==`aria-pressed`)+flip doğru+**reload-kalıcı**; dil zinciri en→de→ar→es→tr **lang==target 5/5**+AR `dir=rtl`; scroll/anchor storm (3 tur × 8 anchor) → bölümler 7→7 + **nabız tek WebGL context 1→1** (remount/leak yok) + overflowX=0 + scroll-lock yok + anchor settle (#sectors top=1px) + **0 ScrollTrigger/GSAP/Lenis/WebGL hatası** (4 console.error hepsi benign 404: `/script.js` umami + `/icon.svg`). **4) Canlı duman (D, curl `f173234`):** `/`+`/spor-salonu-yazilimi`+`/crew-os` → **200**; Alpfit **PhoneMockup 150×** canlı (branch birebir) + 0 img/49 svg/0 MISSING; `/crew-os` "Crew OS" 14×/görünür "Bunker OS" 0; `/bunker-os`→308→`/crew-os`; **`/api/chat` 503** (env yok, beklenen). `grep -c` (shell tuzağı önlendi). **BULGU-S9 (harness artefaktı, ÜRÜN BUG'I DEĞİL):** dil zinciri default-locale TR seçimi harness'ta URL'i `/tr`'de bıraktı (harness `/` bekliyordu); kök neden next-intl `as-needed`'de TR kanonik `/`, prod'da `/tr`→**307**→`/` normalizasyonu **middleware**'de, `page.route`'ta yok (`html lang=tr` doğru, non-default 4 dil doğru prefixli); **3 kanıtla teyit** (routing.ts config + canlı 307 + belirleyici canlı probe: kiwiailab.com dil-switch TR→`/`); BULGU-S2 ailesi (page.route↔prod middleware ıraksaması), memory'ye eklendi (`sandbox-runtime-browser-page-route.md`). **Kaynak kod değişmedi** (doğrulama fazı). Fazlar 1–16 ✅, Faz 17 🔄 (**Adım: verify, 8/8 ✅**). **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:verify-phase 17`** (UAT, yeni oturum).
