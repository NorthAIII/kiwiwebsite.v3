# TASK-14.09: S9 — Adversarial / Holistik Kırma

**Durum:** ✅ Tamamlandı
**Modül:** Tümü (M1–M6) — holistik/adversarial
**Feature:** S9 senaryo grubu — adversarial/holistik — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.08 ✅ (faz son doğrulama task'ı; tüm katman zeminleri hazır)

---

## Hedef

Sitenin adversarial/holistik kırılganlığını doğrula: **JS-kapalı SSG okunabilirlik** (ana sayfa + 5 alt sayfa curl — h1/nav/metin var), **hızlı dil/tema toggle race** (system Chrome — tutarlılık kaybolmuyor), **hızlı scroll/anchor zıplama** (**sayfa-boyu nabız + ScrollTrigger kararlılığı** — v0.3 delta), `next build` **temiz** + **0 MISSING_MESSAGE** (regresyon tabanı), canonical/redirect tohumu yeşil (S8 çapraz-teyit). Tamamlanma = adversarial matris koşuldu, ground-truth (served==disk prerender, stale-server yok) teyitli, sonuç kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S9 satırı (`next build` katman A + system Chrome race katman C; JS-kapalı SSG, hızlı toggle/scroll); Sahipsiz Alan → sayfa-boyu nabız + ScrollTrigger kararlılığı
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — race için WebGL system Chrome (`channel:'chrome'`+swiftshader)
- `_dev/MEMORY.md` → stray/stale `next-server` (served==disk prerender ground-truth); locale/tema tuzağı
- `src/components/living-flow/`, ScrollTrigger/Lenis kullanımı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.09 durumu + S9 bulgu notu

---

## Alt Görevler

- [x] **1. `next build` temiz + 0 MISSING_MESSAGE (regresyon tabanı)** ✅
  - Taze `npm run build` **temiz** (Compiled 6.0s, 37/37 SSG, 0 error/warn); 30 page-locale prerender + `_not-found` = 31 HTML, **0 MISSING_MESSAGE/IntlError** (tüm prerender tarandı)
  - Ground-truth: **stray next-server YOK**; route-intercept diskten (`.next/server/app/*.html`) **birebir** servis → construction gereği served==disk. Vitest 39/39 (canonical/redirect + parite tohumları yeşil)

- [x] **2. JS-kapalı SSG okunabilirlik** ✅
  - 6 TR sayfa prerender HTML (= JS-kapalı curl/tarayıcının aldığı birebir içerik): **6/6** h1=1 + nav/header + main=1 + anlamlı metin (textLen 1278–4016); LivingFlow **canvas=0** markup'ta = **beklenen** (client-only, bug değil), SSG içerik okunur

- [x] **3. Hızlı dil/tema toggle race (system Chrome)** ✅
  - Tema **11 hızlı tık** → final tutarlı: `html.dark`=true == localStorage(`theme`=dark) == aria-pressed=true; reload sonrası kalıcı+FOUC-flip yok
  - Dil zinciri **en→de→ar→es→tr** tutarlı: her adım lang==url, AR dir=rtl; ara-durumda bozulma yok (5/5 ok)

- [x] **4. Hızlı scroll/anchor storm (sayfa-boyu nabız + ScrollTrigger — v0.3 delta)** ✅
  - 3 tur × 10 anchor storm (12ms settle) + wheel → **6 bölüm sağlam** (pre==post), anchor #contact settle (top=52px viewport-içi), **nabız canvas storm'da hayatta** (1→1, tek shared WebGL context, remount blowup yok), **scroll-lock yok** (scrollTo 0 + anchor y=0→6356), **0 ScrollTrigger/GSAP/Lenis hatası**
  - WebGL **system Chrome** (`channel:'chrome'`+swiftshader) → FlowBackdrop canvas=1 (ayırt-edicilik: mode=high, WebGL2 canlı; false-static değil)

- [x] **5. Triyaj & kayıt** ✅
  - **Kapsam-içi bug YOK** (0 MISSING, JS-off boş sayfa yok, race tutarsızlığı yok, 0 ScrollTrigger hatası, nabız çökmesi yok)
  - Bütünsel S1–S9 özeti + verify-phase hazırlık notu → Oturum Kaydı + PHASE-14

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Harness geçici. YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-14.09.md          # Oturum kaydı + S9 adversarial matris
├── phases/PHASE-14.md           # Task Listesi 14.09 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **Sayfa-boyu nabız + ScrollTrigger (v0.3 kritik):** Faz 12 nabzı tüm sayfaya taşıdı → hızlı scroll/anchor storm altında tek WebGL context + ScrollTrigger + Lenis birlikte kararlı mı asıl yeni adversarial yüzey. Bundled chromium **kullanma** (nabız görünmez → ayırt-edici değil); system Chrome şart.
- **Ground-truth (memory):** served == disk prerender teyit (stray `next-server` eski build sunabilir → yanlış negatif). Listening-PID + disk prerender kıyası.
- **JS-off LivingFlow yokluğu beklenen:** curl'de LivingFlow client-only → markup'ta yok = bug değil; SSG **metin içeriği** okunur olmalı (asıl kriter).
- **Race tuzağı:** hızlı toggle'da ara-durum flash olabilir — asıl kriter **final tutarlılık** (html.dark==localStorage==url). Ara-frame'i bug sanma.

---

## Test Kriterleri

- [x] `next build` temiz (0 error/warn, 37/37 SSG) + 30 page-locale 0 MISSING_MESSAGE; served==disk (route-intercept diskten birebir; stray server yok)
- [x] JS-kapalı 6 sayfa SSG okunur (h1=1+nav+main+metin 1278–4016); LivingFlow canvas=0 beklenen (bug değil)
- [x] Tema race 11 tık → final tutarlı (html.dark==ls==aria-pressed) + reload kalıcı; dil zinciri en→de→ar→es→tr tutarlı (lang==url, AR rtl)
- [x] Scroll/anchor storm → 6 bölüm sağlam + nabız/ScrollTrigger kararlı (0 hata, kilit yok, canvas 1→1)
- [x] Bulgular triyajlı + bütünsel S1–S9 özeti PHASE-14 + task doc'a (verify-phase hazırlık)

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-05

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Alt Görev 1 — build/regresyon tabanı:** Taze `rm -rf .next && npm run build` → Compiled 6.0s, 37/37 SSG, **0 error/warn**. Prerender envanteri 31 HTML (30 page-locale 6×5 + `_not-found`); tüm prerender'da **0 MISSING_MESSAGE/IntlError**. Vitest suite **39/39** (seo-redirects + seo-metadata + i18n-parity + smoke + umami) → canonical/redirect tohumu yeşil. Stray next-server yok.
- **Alt Görev 2 — JS-kapalı SSG:** 6 TR prerender HTML (= JS-kapalı curl/tarayıcının aldığı birebir içerik) grep → 6/6 h1=1 + nav/header + main=1 + textLen 1278–4016; LivingFlow canvas=0 (client-only, beklenen).
- **Alt Görev 3+4 — runtime (system Chrome WebGL2):** S9-RUNTIME harness **12/12 PASS** — tema 11-tık race, dil zinciri en→de→ar→es→tr, scroll/anchor storm, sayfa-boyu nabız + ScrollTrigger. FlowBackdrop canvas=1 (ayırt-edicilik: mode=high, false-static değil).
- **Ortam engeli & çözümü:** `next start`/`next dev` bu oturumda **3 farklı başlatma yöntemiyle de exit 144** (sandbox worker-fork kill; 14.08 birebir). Ek keşif: **backgrounded static-server + Chrome kombinasyonu da signal-16 (144) ile öldürülüyor**; trivial blank sayfa + `next build` + Vitest yaşıyor. **Çözüm: tek-process Playwright `page.route` interception** (ayrı server process yok, diskten `.next` prerender+static byte-for-byte servis) → system Chrome + WebGL2 kararlı koştu (12/12 rc=0). Bu, runtime katmanına mecburi build-ground-truth düşüşü **olmadan** S9'u tam koşturdu.

**Bulgular / Triyaj:**
- **Kapsam-içi bug YOK.** Adversarial matris tamamı yeşil: 0 MISSING_MESSAGE, JS-off boş sayfa yok, tema race final-tutarlı (html.dark==localStorage==aria-pressed==dark + reload kalıcı), dil zinciri 5/5 tutarlı (lang==url, AR dir=rtl), scroll storm → 6 bölüm sağlam + nabız canvas 1→1 (tek shared WebGL context, remount blowup yok) + scroll-lock yok + anchor #contact settle (top=52px) + **0 ScrollTrigger/GSAP/Lenis hatası**.
- **Harness artefaktı (bug değil):** runtime'da 2 console 404 → `/script.js` (Umami analytics, dış/prod-only script) + `/icon.svg` (app-router icon route'u minimal disk-serve eşlemiyor). İkisi de site-referanslı doğru; yalnız minimal harness servisinde yok. Site asset'i eksik değil.
- **Sahipli (record-not-fix, önceki task'lardan taşınan):** brief mobil perf açığı (CPU-bound WebGL, gerçek-cihaz duvarı), chatbot per-mesaj max-byte cap yok, ar/de/es 4 alt sayfa İngilizce-stale, TB-3/4/5 → hepsi prd-review (B grubu). S9'da yeni sahipli kalem çıkmadı.

**Bütünsel S1–S9 özeti (verify-phase hazırlık):** 9 senaryo grubu tümü ✅, **hiçbirinde kapsam-içi bug yok.** S1 giriş/redirect matrisi (30/30 route 200 + tüm redirect 308 doğru+5-twin) · S2 tam TR yolculuğu (15/15; `/bunker-os` sızıntı YOK) · S3 sayfa-boyu nabız degradasyonu (9/9; nabız desktop-only, reduced/no-WebGL/mobil-low doğru) · S4 kontroller & kalıcılık (10/10; tema/dil/klavye) · S5+S6 taksonomi & 5-dil parite (Crew OS her yüzeyde / Bunker görünür yok, 0 MISSING, namespace crew senkron, AR-RTL) · S7 chatbot 0-token (13/13, gerçek API çağrısı=0) · S8 guardrail suite (Vitest 39 + axe `test:e2e` 52 + Lighthouse a11y=100 çift-tema + desktop perf 100/CLS 0 nabız tabanı + SEO metadata katmanı) · S9 adversarial/holistik (12/12 runtime + 6/6 JS-off + build temiz). **v0.3 versiyon-sonu senaryo testi: geçti; kapsam-içi bug sıfır → verify-phase 14'e hazır.**

**Kaynak kod değişmedi** (doğrulama fazı; harness `tests/_verify-s9-*.mjs` koşu sonrası silindi → git temiz).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
