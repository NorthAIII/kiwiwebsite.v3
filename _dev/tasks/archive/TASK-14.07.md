# TASK-14.07: S2 — Tam TR Yolculuğu (ana sayfa → alt sayfalar)

**Durum:** ✅ Tamamlandı
**Modül:** M2 Sayfalar (+M3 primitives) (modules/M2-Sayfalar-Bolumler.md)
**Feature:** S2 senaryo grubu — tam TR yolculuğu — doğrulama
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** TASK-14.06 ✅ (lineer sıra; runtime harness zemini hazır)

---

## Hedef

**TR birincil** yolculuğunu uçtan-uca doğrula (system Chrome + prerender HTML, `NEXT_LOCALE=tr` cookie): Hero → ikincil CTA → sektörler (gym + Alpfit çıkış) → 4-adım → **Crew OS (çıkış artık `/crew-os`)** → Forum → Footer; + ana sayfadan alt sayfalara çıkış (Alpfit/Crew OS/vaka/bülten) → içerik bütünlüğü → **history-back dönüş** (ana sayfayı bozmadan); **`<Logo>` her yüzeyde tutarlı** (Faz 10). CTA/nav doğru, kopuk link / `/tr/`-sızıntı / boş bölüm yok. Tamamlanma = yolculuk adımları koşuldu, sonuç triyajlı kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — Araştırma → S2 satırı (system Chrome + prerender HTML; `<Logo>` tutarlılık, `/tr/` sızıntı yok, kopuk link yok); Sahipsiz Alan → `/crew-os` çıkış + `<Logo>` (Faz 10) notları
- `_dev/memory/runtime-harness-selector-teyidi.md` — anchor/nav mekanizması (Lenis smooth-scroll settle; ScrollTrigger)
- `_dev/MEMORY.md` → locale tuzağı (`NEXT_LOCALE=tr` cookie); Faz 9 emsali (#forum ilk-FAIL Lenis settle artefaktıydı)
- `src/components/` — Hero, Nav, sektör seçici, Bunker (Crew OS teaser), Footer, Logo

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi 14.07 durumu + S2 bulgu notu

---

## Alt Görevler

- [x] **1. Ana sayfa bölüm sırası & bütünlük** — S2.1a/b PASS: DOM sırası `top>how>sectors>bunker>forum>contact` (beklenen birebir), boş bölüm yok (metin uzunlukları 335/588/764/486/819/124 char); anchor settle Lenis ilk-denemede — `#how`/`#sectors`/`#bunker`/`#forum` top≈8-11px (nav-offset), `#contact` footer sayfa-sonu görünür (top=692, max-scroll). Poll (30×100ms) ile settle teyit edildi.
- [x] **2. Çıkış href'leri & `/crew-os` rename** — S2.2a/b/c PASS: 5 çıkış href mevcut (`/crew-os`, `/spor-salonu-yazilimi`, `/vaka-calismalari`, 2 bülten); **`/bunker-os` href sızıntısı YOK** (v0.3 kritik ✓, Faz 11 iç link temizliği tuttu), `/tr/`-sızıntı YOK, dead-`#` YOK (19 href); `/crew-os` doğrudan 200 (redirect-hop değil).
- [x] **3. Alt sayfa çıkış → içerik → dönüş** — S2.3a/b PASS (4 alt sayfa): tümü client-nav **SPA-marker survive** (`window.__spa`='alive' → full-reload yok, next-intl `<Link>`), tek `<main>`, textLen 1160/1162/2116/2764, **0 MISSING_MESSAGE**; **history-back → ana sayfa sağlam** (hero/how/forum/contact/nav hepsi var), her turda.
- [x] **4. `<Logo>` tutarlılık (Faz 10)** — S2.4 PASS: home + `/crew-os` + `/spor-salonu-yazilimi` header'da "Kiwi AI Lab" wordmark + KiwiMark svg mevcut (ortak `<Logo>` bileşeni Nav/PageHeader'da aynı render).
- [x] **5. Triyaj & kayıt** — kapsam-içi bug YOK; anchor ilk-okuma artefaktı olmadı (Lenis settle poll ilk denemede top≈0'a indi). 15/15 PASS. Sonuç PHASE-14 + DURUM'a işlendi.

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Harness geçici. YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-14.07.md          # Oturum kaydı + S2 yolculuk
├── phases/PHASE-14.md           # Task Listesi 14.07 + notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **`/crew-os` çıkış (v0.3 kritik):** Crew OS teaser CTA + herhangi iç link artık `/crew-os`'a işaret etmeli (Faz 11 SEO3 iç link temizliği). `/bunker-os` görürsen kapsam-içi bug (redirect var ama çift-hop = craft borcu). Doğrudan `/crew-os` 200 olmalı.
- **Locale tuzağı:** TR yolculuğu `NEXT_LOCALE=tr` cookie ile (cookie'siz `/en`'e sapar).
- **Anchor Lenis settle (Faz 9 dersi):** `#forum`/`#how` gibi anchor'lar Lenis lerp:0.1 ile settle eder → ilk okuma top≠0 **artefakt** olabilir; reload+poll ile top≈0 teyit. Kör FAIL yazma.
- **`<Logo>` (Faz 10):** ortak bileşen — home ve alt sayfada aynı render; tutarsızlık kapsam-içi bug.

---

## Test Kriterleri

- [x] Ana sayfa bölüm sırası tam, boş bölüm yok; anchor'lar hedefe settle (top≈0) — PASS (#how/#sectors/#bunker/#forum top≈8-11, #contact footer görünür)
- [x] Çıkış href'leri doğru: Crew OS = `/crew-os` (eski `/bunker-os` değil), Alpfit/vaka/2 bülten mevcut; dead-`#`/`/tr/`-sızıntı yok — PASS
- [x] 4 alt sayfa client-nav çıkış (SPA korundu) → içerik bütün (200, tek `<main>`, 0 MISSING) → history-back dönüş bozmadan — PASS
- [x] `<Logo>` her yüzeyde tutarlı — PASS
- [x] Bulgular triyajlı (anchor ilk-FAIL artefakt teyidi dahil) PHASE-14 + task doc'a — PASS (anchor artefakt olmadı, ilk denemede settle)

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
- Prod-serve: mevcut kanonik build (`.next`, 14.06 taze build'i, kaynak değişmedi/git temiz → geçerli) → `next start -p 3000`, **listening-PID 21581 teyit** (stray yok; loadavg ~0.8-1.5 düşük). 6 sayfa curl smoke (cookie tr) = 200; `/bunker-os`→308→`/crew-os`.
- Kaynaktan yolculuk teyidi (memory disiplini): home assembly `Hero→HowItWorks→SectorSolutions→Bunker→Forum→Chatbot→Credibility→Footer`; section id'leri `#top/#how/#sectors/#bunker/#forum/#chat/#contact`; **tüm çıkış link'leri next-intl `<Link>`** (`@/i18n/navigation` → client-nav/SPA); çıkış href'leri kaynakta `/crew-os` (Hero+Bunker), `/spor-salonu-yazilimi`, `/vaka-calismalari`, 2 bülten — **kaynakta `/bunker-os` referansı YOK**; `<Logo>` ortak bileşen (Nav/Footer/PageHeader), KiwiMark svg + "Kiwi AI Lab".
- Standalone Playwright + **system Chrome** (`channel:'chrome'`+swiftshader, cookie `NEXT_LOCALE=tr`). Anchor settle: 30×100ms poll (Lenis lerp; kör-FAIL yok — memory). **15/15 senaryo PASS.**

**Bulgular / Triyaj:**
- **S2.1a Bölüm sırası & bütünlük:** DOM sırası `top>how>sectors>bunker>forum>contact` (beklenen birebir), boş bölüm yok (metin 335/588/764/486/819/124 char). ✅
- **S2.1b Anchor settle:** `#how`/`#sectors`/`#bunker`/`#forum` top≈8-11px (nav-offset, Lenis ilk-denemede settle — artefakt olmadı); `#contact` footer sayfa-sonu görünür (top=692, max-scroll edge). ✅
- **S2.2 Çıkış href'leri & /crew-os:** 5 çıkış href mevcut; **`/bunker-os` href sızıntısı YOK** (v0.3 kritik ✓), `/tr/`-sızıntı YOK, dead-`#` YOK (19 href); `/crew-os` doğrudan 200 (redirect-hop değil). ✅
- **S2.3 Alt sayfa çıkış→içerik→dönüş (4 alt sayfa):** hepsi client-nav **SPA-marker survive** (full-reload yok), tek `<main>`, textLen 1160/1162/2116/2764, **0 MISSING_MESSAGE**, logo var; **history-back → ana sayfa sağlam** (hero/how/forum/contact/nav) her turda. ✅
- **S2.4 `<Logo>` tutarlılık:** home + `/crew-os` + `/spor-salonu-yazilimi` header'da wordmark+mark mevcut (ortak bileşen). ✅
- **Kapsam-içi bug YOK.** Anchor ilk-okuma artefaktı bu koşuda görülmedi (Lenis poll ilk denemede settle).

**Kaynak kod değişmedi** (doğrulama fazı; harness scratchpad'de, commit'lenmez).

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
**Tamamlanma:** 2026-07-05 (run-task 14.07)
