# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-18 — **run-task TASK-17.07 ✅ — S7 chatbot 0-token GEÇTİ, 20/20 çekirdek assertion PASS (12 route + 8 UI), 0 gerçek Anthropic çağrısı, 0 kapsam-içi bug.** A kod-inceleme + Vitest SDK-mock + C offline UI (`page.route`); ikisi de koşulup silindi. **Sanitizasyon sırası birebir:** 503-kapısı L22→JSON guard L27→role-whitelist L38+trim L40+slice(-12) L42→trailing-user L44→**`new Anthropic()` L48 hepsinden SONRA**. Route (12/12): key-yok→503, 8 malformed→400 (ctor+stream hiç = kısa-devre kanıtı), system sıyrıldı, slice(-12), 0 çağrı. Offline UI (8/8): `#chat` inline section, greeting, **sahte online/ping-dot yok**, gönder→`/api/chat` 503→zarif offline metni (`t("error")`), UI takılmadı, anthropicCalls=0 (benign umami offline). Kayıtlı sahipli açık (per-mesaj max-byte cap yok)→prd-review, litige edilmedi. Kaynak kod değişmedi; harness silindi. Fazlar 1–16 ✅, Faz 17 🔄 (Adım: **task**, 1 task kaldı). **v0.4 TR CANLI** (`main`=`f173234`). **Sıradaki: `/devflow:run-task` → TASK-17.08** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (discuss-phase 17 girdi, kapsam damgalandı). Doğrulama fazı — yeni feature üretilmez; ana sayfa + 5 alt sayfa uçtan-uca (S1–S9), delta odağı **Alpfit Plus ürün vitrini** (Faz 15) + test-what's-live (v0.4 canlıda `f173234`). Önceki faz **16 ✅** (v0.4 versiyon-sonu teknik borç + TR release). Fazlar 1–16 ✅.
**Adım:** **task** — TASK-17.07 ✅ (S7 chatbot 0-token: A kod-inceleme `route.ts` + Vitest SDK-mock + C offline UI `page.route`; **20/20 çekirdek assertion PASS, 0 gerçek Anthropic çağrısı, 0 kapsam-içi bug**; sanitizasyon tümü `new Anthropic()` L48 öncesi, 8 malformed→400 kısa-devre, offline `#chat` inline+sahte-online yok+UI takılmaz). Fazda 1 task kaldı (17.08). Katman sırası A build-ground-truth (01-03 ✅) → C runtime `page.route` (04+05+06+07 ✅) → adversarial+canlı duman (08). **Sıradaki: `/devflow:run-task` → TASK-17.08** (yeni oturum). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 gym PNG silme; versiyon-sonu finalizasyona, kapsam dışı; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu); (3) non-TR alpfit stale-TR (versiyon-sınırı → prd-review; 17.02/17.03'te yapısal parite teyit — görünür kopukluk yok); (4) **BULGU-S3** (17.04) — alt-sayfa hero'ları (Alpfit+crew-os) `high` masaüstünde animasyonlu Living Flow yok (yalnız base-wash; `FlowBackdrop` alt sayfalarda mount değil); crew-os ile birebir → v0.4 regresyonu değil, Faz 12 deseni; degradasyon/a11y doğru → craft nüansı, **prd-review'a ertelendi** (kullanıcı: devam; bu fazda fix task açılmadı — olası fix = alt sayfalara FlowBackdrop mount); (5) **BULGU-S2** (17.06) — runtime harness ölçüm artefaktı (`history.back()`-after-SPA statik full-`.rsc` `page.route` uzlaşması); ürün bug'ı DEĞİL, memory'ye eklendi, takip gerektirmez.
**İlerleme:** run-task TASK-17.07 (2026-07-18) — S7 chatbot 0-token geçti (A kod-inceleme+Vitest SDK-mock + C offline UI; 20/20 PASS, 0 gerçek çağrı, 0 kapsam-içi bug); kaynak kod değişmedi. Sıradaki: run-task TASK-17.08.
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

**Task:** **TASK-17.08** ⬜ Bekliyor — sıradaki çalıştırılacak, **fazın son task'ı** (S9 adversarial/holistik + canlı duman — A: `next build` temiz + C: JS-off/scroll-race + D: curl canlı; 0 MISSING_MESSAGE, JS-off SSG okunabilirlik **Alpfit saf CSS/SVG**, tema/dil race + scroll storm, **canlı kiwiailab.com 200 + Alpfit `PhoneMockup` marker + chat 503**, test-what's-live `f173234`). TASK-17.07 ✅ (S7 chatbot 0-token, 20/20 PASS). 1 task ⬜ (TASK-17.08).
**Durum:** Fazlar 1–16 ✅, Faz 17 🔄 (senaryo testi, Adım: task — 17.01→17.07 ✅); Versiyon Sonu Durumu `senaryo_testi`. **v0.4 TR canlı** (`f173234`).
**İlerleme:** run-task TASK-17.07 (2026-07-18) — S7 chatbot 0-token geçti (A kod-inceleme+Vitest SDK-mock + C offline UI; 20/20 PASS, 0 gerçek çağrı, 0 kapsam-içi bug). Sıradaki adım: run-task TASK-17.08 (fazın son task'ı).

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
| 17.08 | TASK-17.08 | ⬜ Bekliyor | S9 adversarial/holistik + canlı duman (test-what's-live) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 16 kapandı (v0.4 versiyon-sonu teknik borç) → Faz 16 task özeti (TASK-16.01) PHASE-16'ya mezun edildi.**

**TASK-17.07** ✅ (S7 chatbot 0-token — doğrulama, kaynak kod değişmedi)
- A kod-inceleme + Vitest SDK-mock (`_verify-s7.test.ts`, `@anthropic-ai/sdk` tümüyle mock → 0 ağ) + C offline UI (`_verify-s7-ui.mjs`, `page.route`+system Chrome, `/api/chat` intercept 503). **20/20 çekirdek assertion PASS (12 route + 8 UI), 0 gerçek Anthropic çağrısı, 0 kapsam-içi bug.**
- **Sanitizasyon sırası birebir:** 503-kapısı L22 → JSON guard L27 → role-whitelist L38 + `trim().length>0` L40 + `slice(-12)` L42 → trailing-user kısa-devre L44 → **`new Anthropic()` L48 (hepsinden SONRA)**. Route (Vitest 12/12): key-yok→503 (ctor hiç); 8 malformed varyant→400 (ctor+stream **hiç çağrılmadı** = kısa-devre kanıtı); `[system,user]`→system sıyrıldı, yalnız user forward; `slice(-12)` 20→12; SDK mock→0 çağrı.
- **Offline UI (8/8):** `#chat` **inline `<section>`** (position:static, floating değil), greeting görünür, **sahte online/çevrimiçi + ping-dot YOK**, gönder→`/api/chat` 503→zarif offline metni (`t("error")` "…çevrimdışı…"), UI takılmadı (kullanıcı balonu var, sonsuz Thinking yok, input kullanılabilir), stream hiç, **anthropicCalls=0** (tek benign dış: umami analytics offline). **Kayıtlı sahipli açık:** per-mesaj max-byte cap yok (min-length+geçmiş-sayısı var)→prd-review, litige edilmedi.

**TASK-17.06** ✅ (S2 tam TR yolculuğu runtime A+C — doğrulama, kaynak kod değişmedi)
- Katmanlı A (prerender grep) + C (`page.route`+system Chrome 149, TR `NEXT_LOCALE=tr` cookie). Taze `next build` HEAD `32207b0` (31 HTML+31 `.rsc` flight → SPA-nav servis edilebildi). **21/22 çekirdek assertion PASS, 0 kapsam-içi bug.**
- **Ana sayfa:** bölüm sırası birebir `top>how>sectors>bunker>forum>chat>contact`, boş bölüm yok, Hero ikincil CTA `#sectors`, **anchor settle rect.top=0** (Lenis full-motion). **Alpfit çıkışı:** sektörlerden `/spor-salonu-yazilimi` **SPA-nav** (marker korundu, full-reload yok) → tek `<main>`/9 bölüm/PhoneMockup 150×/0 `<img>`/0 MISSING/Logo/0 sızıntı; **dönüş** header back-link + tam-doküman back home restore. **Crew OS:** taze home'dan SPA-nav (`/bunker-os` sızıntı yok). Link hijyeni: çıkış href'leri mevcut (spor 3×·crew 2×·vaka 1×·2 bülten 1×'er), dead-`#`/`/tr/`/`/bunker-os`=0, Logo 12× üç sayfada.
- **BULGU-S2 (harness artefaktı, ürün bug'ı DEĞİL):** `history.back()`-after-SPA URL'i çevirir ama `<main>` re-render etmez → statik full-`.rsc` `page.route` SPA-cache uzlaşması (prod partial-flight ıraksar); belirleyici probe (tam-doküman back home restore) + grep (özel history yok) + gerçek-UI R3 ile teyitli; memory'ye eklendi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-17.08** ⬜ Bekliyor (sıradaki `/devflow:run-task`; **fazın son task'ı** — S9 adversarial/holistik + canlı duman, A+C+D). TASK-17.01 ✅ (S1) · TASK-17.02 ✅ (S5+S6-render+Alpfit render) · TASK-17.03 ✅ (S8-suite+S6-parite) · TASK-17.04 ✅ (S3 degradasyon + BULGU-S3) · TASK-17.05 ✅ (S4 kontroller & kalıcılık, 22/22 PASS) · TASK-17.06 ✅ (S2 tam TR yolculuğu, 21/22 PASS + BULGU-S2 harness artefaktı) · TASK-17.07 ✅ (S7 chatbot 0-token, 20/20 PASS, 0 gerçek çağrı). 1 task ⬜ (TASK-17.08). **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu; S7'de offline yolu doğrulandı) · non-TR alpfit stale-TR (prd-review; 17.02/17.03'te yapısal parite teyitli, kopukluk yok) · **BULGU-S3** (17.04): alt-sayfa hero'ları `high` masaüstünde animasyonlu Living Flow yok (crew-os ile birebir → regresyon değil, craft nüansı; **prd-review'a ertelendi**, kullanıcı: devam) · **BULGU-S2** (17.06): `history.back()`-after-SPA runtime harness ölçüm artefaktı; ürün bug'ı DEĞİL, memory'de, takip gerektirmez · **S7 kayıtlı açık** (17.07): per-mesaj max-byte cap yok (min-length+geçmiş-sayısı var)→prd-review hardening, litige edilmedi.
**Aktif Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (Adım: task, 7/8 task ✅). Doğrulama fazı: ana sayfa + 5 alt sayfa uçtan-uca (S1–S9 → 8 task), delta odağı **Alpfit Plus** + test-what's-live. Plan ✅ (plan-phase 17). Önceki **Faz 16 ✅** (v0.4 teknik borç + TR release). **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **senaryo_testi**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–16 ✅. Faz dokümanı: `phases/PHASE-17.md` (🔄); release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-18 — **run-task TASK-17.07 ✅ — S7 chatbot 0-token GEÇTİ, 20/20 çekirdek assertion PASS (12 route + 8 UI), 0 gerçek Anthropic çağrısı, 0 kapsam-içi bug.** A kod-inceleme (`route.ts`) + Vitest SDK-mock (`tests/_verify-s7.test.ts`, `@anthropic-ai/sdk` tümüyle mock → 0 ağ) + C offline UI (`tests/_verify-s7-ui.mjs`, `page.route`+system Chrome 149, TR cookie, `/api/chat` intercept 503); ikisi de koşulup silindi. **Sanitizasyon sırası birebir doğrulandı:** 503-kapısı L22-24 (en önce) → JSON-parse guard L27-32 → sanitize L35-42 (role-whitelist L38 + `content.trim().length>0` L40 + `.slice(-12)` L42) → trailing-user kısa-devre L44-46 → **`new Anthropic()` L48 (tüm sanitizasyondan SONRA)**; task'taki satır no'ları eşleşti. **Route (Vitest 12/12):** key-yok→503 (ctor hiç çağrılmadı); 8 malformed varyant (geçersiz JSON / `{}` / messages-array-değil / boş `[]` / rol-enjeksiyonu system+tool / trailing-assistant / whitespace-only / string-olmayan içerik)→hepsi **400, ctor+stream HİÇ çağrılmadı** = kısa-devre `new Anthropic()` öncesi kanıtlandı; `[system,user]`→system sıyrıldı, yalnız `{user}` forward; 20 mesaj→`slice(-12)` 12 forward (sonda user); SDK mock→**0 gerçek çağrı**. **Offline UI (8/8):** `#chat` **inline `<section>`** (position:static, floating değil — memory selector teyidi), greeting görünür, input+send mevcut, **sahte "online/çevrimiçi" + yeşil ping-dot YOK** ("Canlı demo" bölüm etiketi presence-dot değil), mesaj gönder→`/api/chat` 503→zarif offline metni (`t("error")` "Asistan şu an çevrimdışı…"), UI takılmadı (kullanıcı balonu var, sonsuz Thinking yok, input kullanılabilir), stream hiç başlamadı, **anthropicCalls=0** (tek benign dış: `umami.kiwiailab.com` analytics offline, render'a etkisiz). Triyaj: UI harness ilk U8 "fail" (dış-host aşırı-genişliği) kategorize edilince benign umami olduğu görüldü = harness assertion aşırılığı, gerçek bug değil. **Kayıtlı sahipli açık (record-not-fix):** per-mesaj max-byte cap yok (min-length `trim>0` + geçmiş-sayısı `slice(-12)` var)→prd-review hardening adayı, bu fazda litige edilmedi. v0.4 chat'e dokunmadı→regresyon yok. **Kaynak kod değişmedi** (doğrulama fazı); harness'lar silindi (git temiz, `.next` gitignore). Fazlar 1–16 ✅, Faz 17 🔄 (Adım: task, 7/8 ✅). **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:run-task` → TASK-17.08** (fazın son task'ı, yeni oturum).
