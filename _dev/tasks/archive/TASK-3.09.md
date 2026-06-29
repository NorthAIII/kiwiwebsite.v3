# TASK-3.09: S8 — Adversarial / Holistik Kırma (JS-off SSG + race)

**Durum:** ✅ Tamamlandı
**Modül:** Tümü (M1–M6) — holistik (modules/M2, M3, M4 birincil)
**Feature:** S8 — Adversarial / holistik kırma (validation unit; `next build` temizliği TASK-3.01'de)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (kanonik prod serve + build-clean tabanı)

---

## Hedef

Adversarial / holistik dayanıklılığı doğrula: **JS-kapalı SSG okunabilirlik** (ana içerik server-render'da var), **hızlı dil/tema toggle race** (UI tutarlı kalır), **hızlı scroll/anchor zıplama** (ScrollTrigger kararlılığı). Araç: curl / JS-disabled Playwright (SSG) + Playwright (race). Üç adversarial kalem koşulup sonuçlar kaydedildiğinde tamamlanmış sayılır.

> **Not:** S8'in `next build` temiz = regresyon tabanı kalemi **TASK-3.01'de** koşuldu (erken risk azaltma). Burada tekrar edilmez; bu task 3.01'in temiz-build tabanına dayanır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M3-Etkilesim-Primitives.md` — F3.1 ScrollTrigger/anchor, F3.4 toggle davranışı
- `_dev/modules/M1-LivingFlow-TasarimSistemi.md` — F1.2 Living Flow client-only (JS-off'ta yok — beklenen)
- `_dev/phases/PHASE-3.md` — Araştırma → S8 araç satırı + TK2 (build-clean 3.01'de)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.09 durumu

---

## Alt Görevler

- [x] **1. JS-off SSG okunabilirlik**
  - curl raw HTML (= JS-off ilk paint'in birebir aldığı SSG): TR + AR home → tüm bölüm ID'leri (#how #sectors #bunker #forum #chat), tüm başlıklar (Hero/4-adım/sektörler/Crew OS/Forum/Chatbot/Credibility/Footer) ve gövde metinleri + CTA/linkler (#how/#sectors/#bunker/#forum/#contact + hero ikincil CTA "İşleyen örnekleri gör"→#sectors) **okunur**. AR: `dir=rtl`, 0 MISSING_MESSAGE. Kritik içerik client-only'ye gömülü değil. ✅
  - Living Flow `<canvas>` = 0 (client-only, **beklenen**); base-wash wrapper SSR'da var — içerik okunabilirliği bozulmuyor. ✅

- [x] **2. Toggle race**
  - **Tema** (Playwright): 7 hızlı UI tıklama + JS senkron burst (8, 9) → her durumda `html.dark === localStorage === aria-pressed === icon` **tutarlı**; yarım-render/yanlış-durum yok (senkron burst React batch'ini yarıştırdı, son durum yine tutarlı). **Dil** (Playwright): senkron burst (es→de→ar tek tick) → son (ar) temiz kazandı, son durum tamamen tutarlı (url=lang=dir=langBtn=ar/rtl); hızlı ardışık (en→ar→de→es→tr, 180ms) → son (tr) tutarlı. Kırılma yok. ✅

- [x] **3. Scroll/anchor race**
  - Playwright: hızlı ardışık (230ms) + rAF-aralıklı (~16ms) + 80ms anchor zıplama → son hedefe (#forum) **tam iner** (forumTop≈0); tek anchor isabetli (#sectors top=0). ScrollTrigger kararlı: tüm sayfa kaydırılınca 30/30 `[data-reveal]` görünür, **0 takılı**; `#top`'a dönüş temiz (scroll fonksiyonel); 0 konsol hatası. **Record-not-fix:** yalnız aynı-JS-tick (0ms, fiziksel imkânsız) 4-tıklama burst Lenis'i ara konuma çözüyor (≥16ms arayla temiz iner) — takılma/kırılma yok, kullanıcı etkisi yok. ✅

- [x] **4. Triyaj (TK6)** — kapsam-içi gerçek bug **YOK**; kaynak kod değişmedi. Bir record-not-fix gözlem (aynı-tick anchor burst; faz retrosuna aday icra-nüansı). ✅

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Bulgular bu task dokümanına. İstisna: kapsam-içi kararlılık bug'ı (ör. race'te UI kırılıyor) → fix-task.

---

## Dikkat Noktaları

- **build-clean S8 kalemi TASK-3.01'de** koşuldu — burada yalnız JS-off SSG + race. 3.01 temiz-build tabanına dayanır.
- **JS-off'ta Living Flow yok** (client-only, beklenen) — kontrol *içerik* okunabilirliği (SSG bütünlüğü), WebGL efekti değil.
- **Race testleri kararlılık gözlemi** (perf değil); loadavg yüksekse gürültü olur — `cat /proc/loadavg` ile gözle (memory).
- **Ortam:** TASK-3.01 prod serve; PID fresh teyit. `package.json`'a dokunma (Playwright MCP kurulmaz).

---

## Test Kriterleri

- [x] JS-off → ana içerik okunur (SSG bütün); kritik içerik client-only'ye gömülü değil. ✅ (TR+AR, curl raw HTML)
- [x] Hızlı dil/tema toggle race → UI tutarlı (kırılma yok). ✅ (tema state-tutarlı; dil son-kazanır + tutarlı)
- [x] Hızlı scroll/anchor zıplama → ScrollTrigger kararlı (takılma/yanlış-konum yok). ✅ (30/30 reveal, son hedef tam iner; 0ms burst = synthetic-only record-not-fix)

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Kanonik ortam (TK2):** host load 1.37 (düşük), port 3000 boş, git temiz. Stray `next-server` PID 12267 (bugün 14:54, **hiçbir portu dinlemiyor** — worker/orphan) ayrıştırıldı, dokunulmadı. `rm -rf .next && npm run build` → temiz (✓ Compiled 1033ms, 37/37 statik sayfa, exit 0, **0 uyarı** = S8 build-tabanı re-teyit), BUILD_ID `yCiAhridhiwg32rbKpfqW`. `npm run start` fresh prod serve port 3000 (Ready 359ms); fresh listening-PID **30537** (STARTED 14:58:47) teyit; ground-truth: served `/` `<title>` == disk `tr.html` `<title>` (birebir). İş sonu serve kill (port boş), stray 12267 dokunulmadı.
- **AG1 — JS-off SSG okunabilirlik (curl raw HTML = JS-off ilk paint):** TR home `curl /` → 5 bölüm ID (#how #sectors #bunker #forum #chat) hepsi var; `<h1>/<h2>` başlıkları render (Hero "İşinizi analiz ederiz…", "Dört adım…", "Tek bir gerçek otomasyon…", "Otomasyonlarınızın yaşadığı…", "Otomasyon üzerine kısa yazılar.", "Bir Kiwi asistanıyla konuşun.", "Nasıl çalışıyoruz.", footer); gövde metinleri (4-adım açıklamaları, gym tek-otomasyon + Alpfit notu, Crew OS, Forum makale özetleri, Credibility) okunur; nav linkleri + hero ikincil CTA "İşleyen örnekleri gör"→#sectors (R4/F6) SSG'de; `<html lang="tr" dir="ltr">`. **`<canvas>` = 0** (Living Flow client-only, beklenen); base-wash wrapper SSR'da. AR home `curl /ar` → `dir="rtl"`, 5 bölüm ID, AR başlıklar render, **0 MISSING_MESSAGE**, canvas=0. Kritik içerik client-only'ye gömülü değil.
- **AG2 — Toggle race (Playwright MCP, `browser_run_code_unsafe`):** Cookie `NEXT_LOCALE=tr` ile TR home'a inildi (Accept-Language precedence). **Tema:** 7 hızlı UI `click` (→dark) + JS senkron burst 8 (toplam 15→dark) + burst 9 (toplam 24→light); her ölçümde `html.dark === localStorage('theme') === aria-pressed === icon(sun/moon)` **tutarlı** (3/3). Senkron burst tek tick'te N click → React state batch'ini yarıştırdı, son durum yine tutarlı (DOM class toggle senkron, son setState yansıdı). **Dil:** senkron burst (es→de→ar tek tick) → son fired (ar) temiz kazandı, son durum `url=/ar · lang=ar · dir=rtl · langBtn=ar · içerik Arapça` tamamen tutarlı; hızlı ardışık (en→ar→de→es→tr, 180ms aralık, tam settle yok, hepsi tıklandı) → son (tr) `tr/tr/ltr/tr` tutarlı. Yarım-durum/kırılma yok.
- **AG3 — Scroll/anchor race (Playwright MCP):** Anchor zıplama 3 zamanlamada ölçüldü — hızlı ardışık (230ms): scrollY=4091, **forumTop=0**; rAF-aralıklı (~16ms): **forumTop=0**; 80ms (insan mashing): **forumTop=-1** → hepsi son hedefe (#forum) **tam iner**; tek anchor #sectors → top=0 isabetli. ScrollTrigger kararlılık: tüm sayfa adımlı kaydırıldı → 30/30 `[data-reveal]` görünür (opacity≥0.99), **stuckCount=0** (takılı transparan yok), reachedBottom=true; `#top`'a dönüş scrollY=0 (scroll fonksiyonel). **Tüm race koşuları boyunca konsol: 0 error / 0 warning.**
- **AG4 — Triyaj (TK6):** kapsam-içi gerçek bug YOK; kaynak kod değişmedi (doğrulama task'i).

**Sorunlar:**
- `browser_navigate http://localhost:3000/` tarayıcıda `/en`'e yönlendi (`Accept-Language: en-US` + next-intl `localeDetection` — middleware'in dokümante ettiği davranış; curl bunu tetiklemediği için S1'de TR 200 görülmüştü). **Bug değil**, beklenen framework davranışı; TR-primary testler için `NEXT_LOCALE=tr` cookie ile çözüldü (cookie precedence).
- İlk scroll-race denemesinde uzun script + sentetik `WheelEvent` burst tabı düşürdü ("Target closed"); yeniden navigasyonla kuruldu ve sentetik wheel burst çıkarılıp test küçük parçalara bölündü (Lenis sentetik wheel'i anlamlı işlemiyor — gerçek değer anchor + adımlı scrollTo'da).

**Kararlar:**
- 0 kaynak değişikliği (doğrulama task'i; race'ler kararlı, kapsam-içi bug yok). docs/DECISIONS.md'ye ekleme: Hayır (yeni mimari karar yok).
- Aynı-JS-tick (0ms) anchor burst → Lenis ara konuma çözüyor: **record-not-fix**. Gerekçe: fiziksel imkânsız girdi (insan 4 nav linkini 16ms'de tıklayamaz; ≥1 frame arayla son hedef temiz kazanıyor), takılma/kırılma yok, ScrollTrigger kararlı. Lenis'in tek-tick çoklu scrollTo iç davranışı — app/ScrollTrigger bug'ı değil. Faz retrosuna aday icra-nüansı (memory değil — proje-geneli süreç kuralı değil).

**Son Yaklaşım:** N/A (tek oturumda tamamlandı).

**Sonraki Adım Detayı:** Fazın **son** senaryo task'ı (9/9). Sıradaki adım → `/devflow:verify-phase 3` (UAT) yeni oturumda.

**Dosya Değişiklikleri:**
- Kaynak kod: **değişiklik yok** (doğrulama task'i). Disk: `.next/` (gitignore) yeniden üretildi. `.playwright-mcp/` artefaktları gitignore'da (commit'lenmez).
- DevFlow dokümanları: TASK-3.09 (bu kayıt), DURUM, PHASE-3.

**Test Sonuçları:**
- JS-off SSG (TR+AR curl): tüm bölüm/başlık/gövde/CTA okunur, canvas=0, 0 MISSING_MESSAGE. ✅
- Tema race: state-tutarlı (class=ls=pressed=icon) 3/3. ✅
- Dil race: burst son-kazanır + tutarlı; ardışık tutarlı. ✅
- Scroll/anchor race: son hedef tam iner (3 zamanlama), 30/30 reveal görünür, 0 takılı, scroll fonksiyonel. ✅
- Konsol: 0 error / 0 warning (tüm koşular). ✅
- Build: exit 0, 0 uyarı, 37/37 statik sayfa (S8-build re-teyit). ✅
- **Kapsam-içi bug: YOK.** Record-not-fix: aynı-tick anchor burst (synthetic-only).

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-29

**Ne Yapıldı:**
- S8 adversarial/holistik üç kalem doğrulandı: (1) JS-off SSG okunabilirlik (TR+AR raw HTML — tüm içerik/link okunur, canvas client-only, kritik içerik gömülü değil); (2) toggle race (tema state-tutarlı; dil son-kazanır + tutarlı, yarım-durum yok); (3) scroll/anchor race (son hedef tam iner, 30/30 reveal, ScrollTrigger kararlı, 0 takılı, scroll fonksiyonel). Tüm koşular 0 konsol hatası. Build temiz (S8-build re-teyit).
- Triyaj (TK6): kapsam-içi bug yok, kaynak kod değişmedi.

**Öğrenilenler:**
- Tarayıcı locale-detection (`/`→`/en` Accept-Language) ile TR-primary test için `NEXT_LOCALE=tr` cookie precedence. [Faz retrosuna aday icra-nüansı.]
- Lenis `anchors:true` aynı-JS-tick çoklu scrollTo'yu ara konuma çözer; ≥1 frame arayla son hedef temiz kazanır — sentetik-only, kullanıcı etkisi yok. [Faz retrosuna aday icra-nüansı.]

---

**Oluşturulma:** 2026-06-29
