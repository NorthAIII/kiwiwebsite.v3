# TASK-9.09: S9 — Adversarial / Holistik Kırma

**Durum:** ✅ Tamamlandı
**Modül:** Tümü (M1–M6) (modules/M1-…M6-…)
**Feature:** S9 senaryo grubu — adversarial/holistik (doğrulama)
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.08 ✅ (lineer sıra; faz son doğrulama task'ı — holistik kapanış)

---

## Hedef

Sistemi bütünsel/adversarial koşullarda kır-denemesiyle doğrula: `next build` **temiz** + 0 `MISSING_MESSAGE` (regresyon tabanı); JS-kapalı SSG okunabilirlik (ana sayfa + alt sayfalar — içerik JS'siz erişilebilir); hızlı dil/tema toggle race (state bozulmaz); hızlı scroll/anchor zıplama (ScrollTrigger kararlı, kayıt/kilit yok). Faz'ın holistik kapanışı. Tamamlanma = build temizliği + JS-off + race senaryoları koşuldu, kararlılık kaydedildi, triyaj yapıldı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S9 araç satırı + Ortam Kararı (temiz build = regresyon tabanı)
- `_dev/memory/lighthouse-lantern-render-timing-korligi.md` yanı MEMORY host-yükü (ölçüm-bitişik gözlemden önce)
- `src/components/living-flow/` (ScrollTrigger/Lenis tek ticker), `tests/e2e/a11y-helpers.ts` (desenler)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.09 durumu + S9 bulgu notu

---

## Alt Görevler

- [ ] **1. Temiz build + MISSING_MESSAGE tabanı**
  - `npm run build` **temiz** (0 error/uyarı-regresyonu); build çıktısında + render'da 0 `MISSING_MESSAGE` (regresyon tabanı)

- [ ] **2. JS-kapalı SSG okunabilirlik (curl)**
  - JS olmadan (curl SSG markup / Playwright `javaScriptEnabled:false`) ana sayfa + alt sayfaların **içeriği okunur** (SSG prerender ground-truth `.next/server/app/*.html`); kritik metin/nav JS'siz erişilebilir

- [ ] **3. Race / kararlılık (standalone Playwright)**
  - Hızlı **dil/tema toggle** ard arda → state bozulmaz, tutarsız render yok
  - Hızlı **scroll/anchor zıplama** → ScrollTrigger kararlı (pin/scrub kilitlenmez, kayıp bölüm yok); scratchpad script (repo dışı)

- [ ] **4. Triyaj & kayıt**
  - Bulgular TK7 triyaj; sonuç task Oturum Kaydı + PHASE-9 notu. Faz genel doğrulama özeti verify-phase'e devredilir

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Playwright script scratchpad'de. -->

```
scratchpad/  (commit'lenmez)
└── s9-adversarial.mjs          # YENİ — standalone Playwright (race) (repo dışı)
_dev/
├── tasks/TASK-9.09.md          # Oturum kaydı + bulgular
├── phases/PHASE-9.md           # Task Listesi 9.09 + S9 notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **Temiz build = S9 çekirdeği + kanonik ortamın tabanı** — build kırmızıysa tüm faz doğrulaması geçersiz; ilk alt görev.
- **JS-off ground-truth = disk prerender** (`.next/server/app/*.html`); stray/stale `next-server` yanlış-negatifine karşı listening-PID teyit (memory).
- **ScrollTrigger race:** Lenis+GSAP tek ticker (QUALITY §3); hızlı zıplamada çift-rAF/pin kilidi aranır.
- Kanonik ortam = fresh prod build; TR cookie; host yükü ölçüm-bitişik gözlemden önce.

---

## Test Kriterleri

- [ ] `next build` temiz; build + render'da 0 `MISSING_MESSAGE` (regresyon tabanı teyit)
- [ ] JS-kapalı SSG'de ana sayfa + alt sayfa içeriği okunur (kritik metin/nav erişilebilir)
- [ ] Hızlı dil/tema toggle race → state bozulmaz
- [ ] Hızlı scroll/anchor zıplama → ScrollTrigger kararlı (kilit/kayıp yok)
- [ ] Standalone script scratchpad'de kaldı; bulgular triyajlı PHASE-9 + task doc'a yazıldı

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-02

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **AG1 — Temiz build + MISSING_MESSAGE tabanı:** `rm -rf .next && npm run build` → **temiz** (compile 8.3s ✓, lint+types ✓, **37/37** statik sayfa). Build log (71 satır) taraması: **0 error / 0 warn / 0 fail / 0 MISSING_MESSAGE / 0 deprecation**. Regresyon tabanı kondu.
- **AG2 — JS-kapalı SSG okunabilirlik (curl):** 6 sayfa TR (`NEXT_LOCALE=tr` cookie) raw markup (JS çalıştırılmadan) → node ile non-greedy script/style-strip görünür-metin çıkarımı: **6/6 MM=0**, gerçek `<h1>` (İşinizi analiz ederiz… / Spor Salonu Yönetim Yazılımı / Crew OS / …), görünür metin **1272–4000 char**, nav ("← Ana sayfa" / home nav 6 iç link), tek `<main>`. Kritik metin/nav **JS'siz erişilebilir** (LivingFlow client-only → markup'ta yok, dekoratif, beklenen). Render `MISSING_MESSAGE` sweep **30 sayfa-locale** (6×5) → **hepsi 200, total MM=0**, AR home `dir=rtl` teyit.
- **AG3 — Race / kararlılık (standalone Playwright, `channel:'chrome'`+swiftshader, fresh prod :3100):** **14/14 geçti.** WebGL sanity (webgl2=true, canvas=1 → mode high, race anlamlı). **Tema race:** 11 hızlı `button[aria-pressed].click()` (React settle'dan hızlı) → `html.dark`==`localStorage`=="dark"==`aria-pressed`=="true" tutarlı (tek-sayı→dark; toggle DOM-class'ı ground-truth alır) + reload kalıcı + 0 JS hatası. **Dil race:** hızlı zincir en→de→ar→es→tr → final `lang==url==tr` + içerik render + MM yok + 0 JS hatası; AR seçimi → `lang=ar`+`dir=rtl`+`/ar` tutarlı. **Scroll/anchor race:** 6 bölüm DOM'da; 8'li hızlı anchor storm (#how…#top, 60ms) → son hedef `#how` settle (top=0); native jump bottom=6246↔top=0 (**pin/scrub kilidi yok**); 12'li rastgele scroll savurma sonrası bölümler sağlam; **0 JS/ScrollTrigger hatası**.
- **AG4 — Triyaj (TK7):** kapsam-içi gerçek bug **yok**; kaynak kod değişmedi. Ground-truth teyit: served `/ar` h1 == disk prerender `.next/server/app/ar.html` h1 (fresh-build serve, stale-server yok — memory disiplini). Faz genel doğrulama özeti verify-phase'e devredildi.

**Sorunlar:**
- `sed`-tabanlı görünür-metin ölçümü (`s/<script...>.*<\/script>//g`) greedy `.*` ilk→son `<script>` arasını yiyip `visibleChars=1` verdi (yanlış-negatif): node non-greedy `[\s\S]*?` strip'e geçildi → gerçek metin ölçüldü.
- İlk `<h1>` grep'i (`[^<]*`) h1 iç `<span>` içerdiği için boş döndü: node `([\s\S]*?)` capture ile çözüldü (ground-truth eşitliği).

**Kararlar:**
- Yeni karar yok (doğrulama fazı). docs/DECISIONS.md'ye eklendi: Hayır.

**Kalan İşler:** yok (fazın son task'ı; sıradaki adım verify-phase 9).

**Dosya Değişiklikleri:**
- Kaynak kod: **değişmedi** (doğrulama fazı). Standalone script scratchpad'de (`s9-adversarial.mjs`, `jsoff.mjs`, `mm-sweep.mjs` — commit'lenmez).

**Test Sonuçları:**
- Build: temiz, 37/37 SSG, 0 MISSING_MESSAGE (build+render 30 page-locale).
- JS-off SSG: 6/6 sayfa okunur (h1+nav+metin), MM=0.
- Race (Playwright): 14/14 (tema+dil+scroll/anchor tutarlı, 0 JS hatası).

---

**Oluşturulma:** 2026-07-02
