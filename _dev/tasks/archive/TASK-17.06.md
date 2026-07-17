# TASK-17.06: S2 — Tam TR Yolculuğu (ana sayfa → alt sayfalar, Alpfit Plus odak)

**Durum:** ✅ Tamamlandı
**Modül:** M2 Sayfalar (+M3 Etkileşim) (modules/M2-Sayfalar-Bolumler.md, M3-Etkilesim-Primitives.md)
**Feature:** S2 senaryo grubu — tam TR yolculuğu (doğrulama; milestone TR-birincil çekirdek)
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.05 ✅ (lineer sıra; aynı runtime katmanı)

---

## Hedef

**TR birincil** (`NEXT_LOCALE=tr` cookie) uçtan-uca kullanıcı yolculuğunu **gerçek tarayıcı runtime** (`page.route` nav/CTA tık) + prerender grep ile doğrula: ana sayfa Hero → ikincil CTA → sektörler (**Alpfit çıkışı → yeni Alpfit Plus sayfası**) → 4-adım → Crew OS (`/crew-os`) → Forum → Footer; **ana sayfadan alt sayfalara çıkış/dönüş** (özellikle **yeni Alpfit Plus sayfasına çıkış/dönüş** — v0.4 asıl delta) → içerik bütünlüğü; **`<Logo>` her yüzeyde tutarlı**; CTA/nav doğru, **kopuk link / `/tr/`-sızıntı / boş bölüm yok**. Bu milestone item 4'ün (TR yolculuğu birincil bütünsel-tutarlı) çekirdek doğrulamasıdır. Tamamlanma = yolculuk runtime'da koşuldu, triyajlı PHASE-17'ye kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S2 araç satırı (A: prerender grep + C: `page.route` nav/CTA tık) + Milestone item 4 (TR birincil, **özellikle Alpfit Plus'a çıkış/dönüş**) + Dikkat Edilecekler (locale tuzağı, selector teyidi)
- `_dev/memory/runtime-harness-selector-teyidi.md` — SPA-nav `<Link>` (full-reload yok); anchor settle Lenis; Chatbot inline `#chat`
- `_dev/MEMORY.md` → locale tuzağı (TR = `NEXT_LOCALE=tr` cookie) + `sandbox-runtime-browser-page-route.md` (`next start` denenmez)
- `src/app/[locale]/page.tsx` (ana sayfa bölüm sırası), `src/components/alpfit/AlpfitShowcase.tsx` (Alpfit hedef içerik)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.06 durumu + S2 bulgu notu

---

## Alt Görevler

- [x] **1. Ana sayfa bölüm bütünlüğü (TR, cookie)**
  - Bölüm sırası birebir (top → how → sectors → bunker/crew teaser → forum → contact); **boş bölüm yok**; anchor'lar Lenis ile settle (ilk denemede) → ✅ grep + runtime: sıra `top>how>sectors>bunker>forum>chat>contact`, hepsi dolu, `#sectors` anchor settle rect.top=0
  - Hero ikincil CTA mevcut ve doğru hedef → ✅ `href="#sectors"` (2 link)

- [x] **2. Ana sayfa → alt sayfa çıkışları (özellikle Alpfit Plus)**
  - Sektörlerden **Alpfit çıkışı → `/spor-salonu-yazilimi`** — SPA-nav (marker korundu, full-reload yok) → tek `<main>` / 0 MISSING / 9 bölüm (8 `<section>`+roadmap) / PhoneMockup 150× / 0 `<img>` → **dönüş: header back-link + tam-doküman back home'u restore etti** (R3 ✅; browser-back-after-SPA = harness artefaktı, aşağıda triyaj)
  - Crew OS çıkışı → `/crew-os` (SPA-nav ✅, `/bunker-os` sızıntısı YOK); vaka + 2 bülten çıkış href'leri mevcut (grep: 1/1/1)

- [x] **3. Link hijyeni & Logo tutarlılığı**
  - **`/tr/`-sızıntı YOK** (home + alt sayfa 0); kopuk link / dead-`#` YOK (`href="#"` 0); `<Logo>` "Kiwi AI Lab" home + Alpfit + crew header'da tutarlı (12× her sayfa, ortak bileşen)

- [x] **4. Triyaj & kayıt**
  - Kapsam-içi bug YOK; **BULGU: browser-back-after-SPA harness artefaktı** (statik full-`.rsc` `page.route` uzlaşması, ürün bug'ı değil — belirleyici probe ile doğrulandı); PHASE-17 + memory kaydı

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Runtime harness geçici (koşulur, silinir). Referans tanımlayıcılar ZATEN-VAR (ana sayfa + Alpfit + Logo repoda). YENİ kalıcı dosya yok. -->

```
_dev/
├── tasks/TASK-17.06.md          # Oturum kaydı + yolculuk sonuçları
├── phases/PHASE-17.md           # Task Listesi 17.06 + notu
└── DURUM.md                     # Aktif task + özet
(geçici runtime harness proje-içine yazılıp koşulduktan sonra silinir — commit'lenmez)
```

---

## Dikkat Noktaları

- **Locale tuzağı (memory):** TR yolculuğu için `NEXT_LOCALE=tr` cookie şart (yoksa Accept-Language ile `/en`'e sapar). Yolculuk boyunca TR kalmalı; `/tr/` prefix sızıntısı bug.
- **SPA-nav teyidi (memory):** alt sayfa çıkışları `<Link>` → full-reload yok (SPA-marker survive); history-back ana sayfayı remount etmeden getirir. Selector/mekanizma kaynaktan teyit.
- **Alpfit çıkış/dönüş = v0.4 asıl delta odağı:** Faz 14'te bu route eski gym showcase'ti; şimdi Alpfit Plus. Çıkışta 9 bölüm tam, dönüşte ana sayfa sağlam olmalı.
- **`next start` DENENMEZ (memory):** `page.route` interception; anchor settle Lenis ilk-deneme (settle etmezse önce harness artefaktı mı diye sor).

---

## Test Kriterleri

- [x] Ana sayfa bölüm sırası birebir + boş bölüm yok; anchor'lar settle; Hero ikincil CTA doğru → ✅
- [x] Alpfit çıkışı → `/spor-salonu-yazilimi` SPA-nav (full-reload yok, marker korundu) → tek `<main>`/0 MISSING/9 bölüm tam → dönüş home sağlam (R3 header back-link + tam-doküman back ✅) → ✅
- [x] Crew OS → `/crew-os` (SPA-nav, `/bunker-os` href sızıntısı 0); vaka + 2 bülten çıkış href'leri mevcut → ✅
- [x] `/tr/`-sızıntı YOK; kopuk link/dead-`#` YOK; `<Logo>` home+Alpfit+crew tutarlı → ✅
- [x] Harness artefaktı ≠ gerçek bug ayrımı (browser-back-after-SPA triyaj); bulgular PHASE-17 + memory'ye; kaynak kod değişmedi; geçici harness silindi → ✅

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-18 (run-task 17.06)

**Durum:** ✅ Tamamlandı — S2 tam TR yolculuğu **GEÇTİ, 21/22 çekirdek assertion PASS, 0 kapsam-içi bug** (1 harness ölçüm artefaktı triyaj edildi). Kaynak kod değişmedi (doğrulama fazı).

**Yaklaşım (katmanlı A+C):**
- **Ground-truth:** taze `next build` (HEAD `32207b0` hizalı, BUILD_ID `htemC3E580EF…`); 31 prerender HTML + 31 `.rsc` flight (TR 6+6). SPA-nav için `.rsc` full-flight servis edilebildi.
- **A (deterministik prerender grep):** ana sayfa bölüm sırası + link hijyeni + Logo + MISSING + çıkış href'leri.
- **C (runtime `page.route` + system Chrome 149 swiftshader):** SPA-nav çıkış/dönüş + anchor settle. TR = `NEXT_LOCALE=tr` cookie. Harness `tests/_verify-s2.mjs` (+ triyaj probe `_verify-s2-back.mjs`) proje-içine yazıldı, koşuldu, **silindi** (git temiz).

**Sonuçlar (22 assertion):**
- **Ana sayfa (H0–H4) ✅:** hydration+WebGL sanity canvas=1 (mode=high); bölüm sırası birebir `top>how>sectors>bunker>forum>chat>contact`; boş bölüm yok (hepsi ≥20 char); Hero ikincil CTA `#sectors` (2 link); **anchor `#sectors` settle rect.top=0** (Lenis full-motion `anchors:true`, ilk denemede).
- **Alpfit çıkışı (A0–A8) ✅:** sektörlerden `/spor-salonu-yazilimi` çıkışı 3 link; **SPA-nav marker `home-alive` korundu** (full-reload YOK); tek `<main>`; **9 bölüm** (8 `<section>`+roadmap div); **PhoneMockup 150× / 0 `<img>`** (saf CSS/SVG); MISSING_MESSAGE yok; Logo "Kiwi AI Lab"; `/tr/`+`/bunker-os` sızıntı 0.
- **Dönüş (R0/R3) ✅:** Alpfit header dönüş affordance'ı (Logo/geri → `/`, 3 link); **R3 header back-link → home tam restore** (SPA); **tam-doküman browser-back → home tam restore** (probe).
- **Crew OS çıkışı (C0–C3) ✅:** taze home'dan `/crew-os` SPA-nav (marker korundu); `/bunker-os` URL sızıntısı yok; tek `<main>` + Logo + "Crew OS" metni.
- **Link hijyeni (A, grep) ✅:** home tüm href'leri temiz — çıkış href'leri mevcut (`/spor-salonu-yazilimi` 3× · `/crew-os` 2× · `/vaka-calismalari` 1× · 2 bülten 1×'er); `/bunker-os` 0 · dead-`#` 0 · `/tr/` 0. Logo 12× home/alpfit/crew üçünde birebir.

**BULGU (harness artefaktı, ürün bug'ı DEĞİL) — browser-back-after-SPA:** İlk koşuda R1 (SPA-nav ile Alpfit'e gidip `history.back()`) URL'i `/`'a çevirdi ama `<main>` Alpfit içeriğini gösterdi (home'a re-render etmedi). **Triyaj (kör-onay/red yok):** (1) kodda özel `popstate`/`history.back`/`beforePopState` override YOK (grep=0, app-router standardı); (2) gerçek UI dönüş affordance'ı R3 (`<Link href="/">`) home'u restore ETTİ; (3) **belirleyici probe:** Alpfit tam-doküman (`goto`) yüklenip `goBack()` çağrılınca home tam restore oldu → browser-back mekaniği SAĞLAM. Kök neden: `page.route` statik **full** `.rsc` servis ediyor; prod'da server `Next-Router-State-Tree` ile **partial** flight döndürür → router home ağacını client-cache'te tutar, `history.back()` restore eder. Yani içerik-restore-olmaması yalnız statik-full-flight SPA-cache uzlaşmasının ürünü = **runtime harness ölçüm artefaktı**. Memory'ye eklendi ([sandbox-runtime-browser-page-route](../memory/sandbox-runtime-browser-page-route.md)).

**Milestone item 4 (TR yolculuğu birincil bütünsel-tutarlı) çekirdek doğrulaması karşılandı.** Sıradaki: run-task TASK-17.07.

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
