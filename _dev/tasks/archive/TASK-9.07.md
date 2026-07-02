# TASK-9.07: S2 — Tam TR Yolculuğu & Alt-Sayfa Çıkış/Dönüş

**Durum:** ✅ Tamamlandı
**Modül:** M2 Sayfalar (+M3 Etkileşim) (modules/M2-Sayfalar-Bolumler.md, M3-Etkilesim-Primitives.md)
**Feature:** S2 senaryo grubu — tam TR yolculuğu (doğrulama)
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** TASK-9.06 ✅ (lineer sıra; çıktı bağımlılığı yok)

---

## Hedef

**TR birincil** yolculuğu uçtan-uca doğrula: ana sayfa akışı (Hero → ikincil CTA → sektörler [gym + Alpfit çıkış] → 4-adım → Crew OS → Forum/Bülten → Footer) + ana sayfadan alt sayfalara **çıkış/dönüş** (Alpfit / Crew OS / vaka / bülten client-nav → alt sayfa içerik bütünlüğü → geri dönüş). curl+grep ile link/href/bölüm bütünlüğü + standalone Playwright ile CTA/anchor scroll ve client-nav. Kopuk link, boş bölüm, yanlış CTA hedefi yok. Tamamlanma = TR yolculuğu (ana sayfa + alt sayfa çıkış/dönüş) koşuldu, bütünlük kaydedildi, triyaj yapıldı.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — Araştırma → S2 araç satırı + "Sahipsiz Alan" (alt sayfa dikişleri = asıl yeni yüzey; client-nav vs SSG geçişleri)
- `_dev/modules/M2-Sayfalar-Bolumler.md` — ana sayfa bölüm sırası + alt sayfa IA
- `src/app/[locale]/page.tsx` + alt sayfa `page.tsx`'leri, `tests/e2e/a11y-helpers.ts` (`gotoLocalized`/`scrollThrough`)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi 9.07 durumu + S2 bulgu notu

---

## Alt Görevler

- [ ] **1. Ana sayfa akış bütünlüğü (curl+grep)**
  - Fresh prod build serve (PID teyit); TR ana sayfada bölüm sırası tam: Hero → ikincil CTA → sektörler (gym + Alpfit çıkış link'i) → 4-adım (Analiz·Çözüm·Otomasyon·Raporlama) → Crew OS → Bülten → Footer
  - Kopuk link/href yok; boş bölüm yok

- [ ] **2. CTA & anchor davranışı (standalone Playwright)**
  - Hero ikincil CTA + bölüm CTA'ları doğru hedefe gider; anchor scroll (`#sectors` vb.) doğru bölüme kayar (ScrollTrigger); scratchpad script (repo dışı)

- [ ] **3. Alt sayfaya çıkış/dönüş (client-nav)**
  - Ana sayfadan Alpfit (`/spor-salonu-yazilimi`), Crew OS (`/bunker-os`), vaka (`/vaka-calismalari`), bülten (`/bulten/...`) çıkışları **client-nav** ile gider; alt sayfa **içerik bütün** (hero + gövde render); geri dönüş (nav/back) ana sayfayı bozmadan getirir

- [ ] **4. Triyaj & kayıt**
  - Bulgular TK7 triyaj; sonuç task Oturum Kaydı + PHASE-9 notu

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Playwright script scratchpad'de. -->

```
scratchpad/  (commit'lenmez)
└── s2-tr-yolculuk.mjs          # YENİ — standalone Playwright sürücü (repo dışı)
_dev/
├── tasks/TASK-9.07.md          # Oturum kaydı + bulgular
├── phases/PHASE-9.md           # Task Listesi 9.07 + S2 notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **Alt sayfa dikişleri = asıl yeni yüzey** (Faz 3'te alt sayfa kapsam dışıydı). Client-nav vs SSG geçiş davranışı asıl bilinmeyen — çıkış/dönüşte içerik bütünlüğü + state korunması gözlenir.
- **Locale tuzağı:** TR yolculuk prefixsiz → `NEXT_LOCALE=tr` cookie (`gotoLocalized`); curl'de aynı cookie.
- **Bülten çıkışı:** ana sayfa "Bülten" bölümü → makale sayfaları; çıplak `/bulten` index'i yok (404, TASK-9.01 bulgusu) — yolculukta doğru **makale** link'lerine gidildiğini teyit et.
- Kanonik ortam = fresh prod build.

---

## Test Kriterleri

- [ ] TR ana sayfa bölüm sırası tam, kopuk link/boş bölüm yok
- [ ] Hero ikincil CTA + bölüm CTA'ları + anchor scroll doğru hedefe gider (ScrollTrigger stabil)
- [ ] 4 alt sayfa çıkışı client-nav ile gider, içerik bütün, dönüş ana sayfayı bozmaz
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
- Kanonik ortam: fresh `next build` (temiz) + `next start -p 3000`, listening-PID 101175 teyitli (stray/stale server yok — memory disiplini).
- **Alt Görev 1 — Ana sayfa akış bütünlüğü (curl+grep, `NEXT_LOCALE=tr`):** Bölüm ID sırası tam ve doğru: `top`(Hero) → `how`(HowItWorks 4-adım) → `sectors`(SectorSolutions) → `bunker`(Bunker/Crew OS) → `forum`(Forum) → `contact`(Footer). Tüm çıkış href'leri mevcut: `/spor-salonu-yazilimi` ×3 (Hero stats + sektör viewApp + seeLive), `/bunker-os` ×2 (Hero stats + Bunker explore), `/vaka-calismalari` ×1 (allCases), `/bulten/ai-sdr-araclari` + `/bulten/claude-opus-4-8-fable-5` ×1 (Forum). Anchor CTA'ları: `#contact`×2, `#sectors`×2, `#top/#how/#bunker/#forum`×1 — hepsi mevcut bölüm ID'lerine çözülüyor. **Dead `href="#"`/boş href yok** (Footer `.filter(s=>s.href!=="#")` Instagram/LinkedIn placeholder'larını eliyor, yalnız X render). **`/tr/` prefix sızıntısı yok** (as-needed prefixsiz). Home + 5 çıkış hedefinde **0 MISSING_MESSAGE**; 5 alt-sayfa hedefi **HTTP 200 + tek `<main>` + dolu HTML (39–47KB)**.
- **Alt Görev 2 — CTA & anchor scroll (standalone Playwright, full-motion, `channel:'chrome'`+swiftshader):** 6 anchor hedef ID'si DOM'da; Hero ikincil CTA→`#sectors` (top=0), Hero birincil CTA→`#contact`/footer (top=52), Nav→`#how`/`#bunker`/`#forum` (top=0). Lenis smooth-scroll doğru bölüme oturuyor (ScrollTrigger stabil, crash yok).
- **Alt Görev 3 — Alt-sayfa client-nav çıkış/dönüş (standalone Playwright):** 4 çıkış (Alpfit/Crew OS/vaka/bülten) `window.__spaMarker` **korunarak** (full-reload olsa silinirdi → **client-nav kanıtı**) doğru URL'e gitti; hedef sayfa **içerik bütün** (h1 gerçek metin: "Spor Salonu Yönetim Yazılımı" · "Crew OS" · "Sektör sektör, kurduğumuz otomasyon." · "2026'da AI SDR araçları…", `<main>` var, 0 MISSING, txt 23–25K). Her çıkıştan sonra history-back (App Router soft-nav, marker korundu) → ana sayfa **bozulmadan** döndü (url=`/`, 6/6 bölüm ID, hero h1 sağlam, 0 MISSING).
- **Toplam: 14 kontrol · 14 ✓ · 0 ✗** (curl bütünlük Alt Görev 1 + Playwright 14 runtime kontrol).

**Sorunlar:**
- İlk Playwright koşusunda `Nav → #forum` FAIL: scrollY 6236, hedef top=−2740 (foruma değil dibe/footer'a kaymış). **Kök neden ölçüm artefaktı, bug değil:** Lenis `lerp:0.1` ile tepeden foruma (~3496px) uzun smooth-scroll 1400ms sabit-bekleme içinde oturmadı + döngüde native `window.scrollTo(0,0)` Lenis internal-state'iyle çakışıp bir sonraki hedefi kirletti. **Çözüm:** her anchor için taze `page.goto('/')` reload + `settleScroll()` polling (sabit scrollY = oturdu). Yeniden koşuda `#forum` tam `top=0/scrollY=3496`'ya oturdu → 14/14 ✓. (Task-icra nüansı: Lenis smooth-scroll ölçümünde sabit-bekleme yerine scroll-settle polling + hedef-başına izole reload — S9/9.09 hızlı-scroll race testine de taşınır.)

**Kararlar:**
- Faz 3 "anchor path-düşme" record-not-fix bu yüzeyde **yok** (hash-anchor'lar path değiştirmez; alt-sayfa `Link` locale-farkındalıklı). Yeni sahipli bulgu açılmadı.
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari karar yok — doğrulama fazı).

**Kalan İşler:** Yok (task tamam).

**Son Yaklaşım:** curl+grep ile ana sayfa markup akış-bütünlüğü (bölüm sırası + href envanteri + 0 MISSING + alt-sayfa 200/main); standalone Playwright ile runtime anchor-scroll + alt-sayfa client-nav çıkış/dönüş (SPA marker ile client-nav kanıtı). Script: `scratchpad/s2-tr-yolculuk.mjs` (`playwright` absolute-import + `channel:'chrome'`, repo dışı).

**Sonraki Adım Detayı:** Task tamam — sıradaki TASK-9.08 (S7 chatbot 0-token: sanitizasyon kod-inceleme + dummy-key malformed 400 + key-yok 503 offline UI; toplam API çağrısı=0). Yeni oturum.

**Dosya Değişiklikleri:**
- Kaynak kod **değişmedi** (doğrulama fazı). Yalnızca `_dev/` dokümanları + scratchpad script (commit'lenmez).

**Test Sonuçları:**
- `scratchpad/s2-tr-yolculuk.mjs`: **14 ✓ · 0 ✗ / 14.** curl bütünlük (Alt Görev 1): bölüm sırası + href envanteri + 0 MISSING + 5 alt-sayfa 200/main temiz. Kapsam-içi bug yok.

---

**Oluşturulma:** 2026-07-02
