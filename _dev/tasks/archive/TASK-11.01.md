# TASK-11.01: `/bunker-os` → `/crew-os` route rename + kalıcı redirect + sitemap

**Durum:** ✅ Tamamlandı
**Modül:** M6 (SEO & Deploy — redirect/sitemap) + M2 (route klasörü) — `modules/M6-SEO-Deploy.md`
**Feature:** SEO1 — `/bunker-os` → `/crew-os` route rename + kalıcı redirect (5 locale) + sitemap/canonical/alternates
**Faz:** Phase 11 (phases/PHASE-11.md)
**Bağımlılıklar:** Yok (fazın ilk task'i)

---

## Hedef

İç kod adı "Bunker OS"un kullanıcıya sızdığı tek yüzeyi — showcase route'u — public ada taşı. Route klasörü `[locale]/bunker-os/` → `[locale]/crew-os/` olarak yeniden adlandırılır; eski `/bunker-os` (5 locale) `next.config.ts`'te **kalıcı 308 redirect** ile `/crew-os`'a yönlendirilir; `sitemap.ts` PATHS güncellenir; route-path'e referans veren a11y spec'i `/crew-os`'a çevrilir. Tamamlanma: `next build` temiz, `/crew-os` (5 locale) 200 SSG render, `/bunker-os` + `/en|ar|de|es/bunker-os` → 308 `/crew-os`, sitemap `/crew-os` içerir.

---

## Bağlam

Faz 11 taksonomi kararının (DECISIONS 2026-06-27: public **Crew OS** / iç ad **Bunker OS**) son açık ucunu kapatır — kullanıcıya sızan tek yüzey URL'dir. Research-phase ampirik teyit etti (build+curl): Next config redirect'in `source`'u locale prefix'ini **otomatik kapsamaz** (`/forum` → 308 ama `/en/forum` → 404). Bu yüzden redirect **iki açık giriş** ister: çıplak `/bunker-os` + prefixli `/:locale(en|ar|de|es)/bunker-os`. Yaklaşım A seçildi (config kalıcı 308; B=server `redirect()` 307-geçici elendi, C=next-intl pathnames aşırı).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-11.md` — Araştırma Bulguları (redirect Yaklaşım A, locale-prefix ampirik kanıtı, "eski klasör silinmeli") + Kapsam Tartışması (rename kapsamı: route + namespace, kod adı hariç)
- `_dev/modules/M6-SEO-Deploy.md` — F6.2 sitemap (elle senkron), F6.3 next config redirect konvansiyonu

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-11.md` — Task Listesi tablosunda 11.01 durumu

---

## Alt Görevler

- [x] **1. Route klasörünü yeniden adlandır**
  - `src/app/[locale]/bunker-os/` → `src/app/[locale]/crew-os/` (klasör + içindeki `page.tsx` taşınır; eski klasör **tamamen silinir**).
  - `page.tsx` içeriği **değişmez** — özellikle `import BunkerShowcase from "@/components/bunker-os/BunkerShowcase"` satırı **korunur** (component dizini `components/bunker-os/` iç kod adıdır, dokunulmaz — bkz. Dikkat Noktaları).
  - Namespace (`bunkerOs`) bu task'ta değişmez — o TASK-11.02'nin işi.

- [x] **2. `next.config.ts` — kalıcı redirect ekle**
  - `async redirects()` dizisine mevcut `/forum` girişlerini **koruyarak** iki yeni giriş ekle:
    - `{ source: "/bunker-os", destination: "/crew-os", permanent: true }`
    - `{ source: "/:locale(en|ar|de|es)/bunker-os", destination: "/:locale/crew-os", permanent: true }`
  - `permanent: true` → 308 (SEO-kalıcı). Mevcut `/forum`→`/bulten` girişleri aynen kalır.

- [x] **3. `sitemap.ts` — PATHS güncelle**
  - `src/app/sitemap.ts` PATHS dizisinde `"/bunker-os"` → `"/crew-os"`. Priority/changeFrequency mantığı değişmez.

- [x] **4. Route-path'e referans veren test güncelle**
  - `tests/e2e/subpages-a11y.spec.ts:23` `{ label: "bunker-os", path: "/bunker-os" }` → `{ label: "crew-os", path: "/crew-os" }`.
  - (Opsiyonel tazeleme) `tests/e2e/a11y-helpers.ts:36-40` yorumlarındaki `/bunker-os` örneklerini `/crew-os`'a güncelle — yalnız yorum, fonksiyonel değil.

---

## Etkilenen Dosyalar

<!-- KURAL: Bu fazda OLUŞTURULAN dosya "YENİ"; işaretsiz = zaten-var. -->

```
src/app/[locale]/
├── bunker-os/page.tsx          # SİLİNİR (crew-os/ altına taşınır)
└── crew-os/page.tsx            # YENİ (bunker-os/page.tsx'ten taşınan içerik, aynen)

src/app/sitemap.ts              # "/bunker-os" → "/crew-os" (PATHS)
next.config.ts                  # 2 yeni kalıcı redirect (Dokunulmaz — ama fazın amacı, onay kapsam içi)
tests/e2e/subpages-a11y.spec.ts # label+path "/bunker-os" → "/crew-os"
tests/e2e/a11y-helpers.ts       # (opsiyonel) yorum tazeleme
```

---

## Dikkat Noktaları

- **Eski `bunker-os/` route klasörü SİLİNMELİ** (taşınır, bırakılmaz). Fiziksel route kalırsa redirect'le çakışır: route 200 kazanır, redirect hiç fire etmez (research ampirik).
- **Config redirect `source` locale prefix'ini kapsamaz** → iki açık giriş **zorunlu** (`/bunker-os` + `/:locale(en|ar|de|es)/bunker-os`). Tek çıplak `source` yazılırsa `/en/bunker-os` vb. rename sonrası 404 olur (research: `/en/forum`→404 kanıtı).
- **Redirect kalıcı (308)**, geçici (307) değil — SEO doğruluğu kritik (`permanent: true`).
- **`next.config.ts` Dokunulmaz listesinde** — ama bu redirect bu fazın tam amacı; discuss/research'te onaylandı, kapsam içi. Yalnız redirect dizisine ekleme; `transpilePackages`, `images`, intl plugin sarımı **dokunulmaz**.
- **Component dizini `components/bunker-os/` + `BunkerShowcase.tsx` dosya adı DOKUNULMAZ** (iç kod adı, taksonomi izin veriyor). `crew-os/page.tsx`'teki import path `@/components/bunker-os/BunkerShowcase` **korunur**.
- **Page-seviyesi `generateStaticParams` EKLENMEZ** — 5-locale SSG `layout.tsx:49`'dan miras alınır (tek tanım). `crew-os/page.tsx` kendi generateStaticParams'ını yazmaz.
- **Page-seviyesi canonical/alternates EKLENMEZ/DÜZELTİLMEZ** — `page.tsx` yalnız `title`/`description` set eder; canonical/alternates `layout.tsx`'ten miras. Rename için page'de güncellenecek canonical **yok**; yalnız `sitemap.ts` güncellenir. (Latent: tüm alt sayfalar canonical=`/` miras alıyor — faz-öncesi durum, kapsam DIŞI, gelecek SEO fazı.)
- **`/forum` redirect'lerine DOKUNMA** — korunur (bilinçli kapsam dışı). `/forum` locale-prefix gap (`/en/forum`→404) de bu faz konusu değil.
- **Kapsam-dışı kod tanımlayıcıları (dokunma):** `id="bunker"` section id, `href: "#bunker"` nav anchor, `@keyframes bunkerback`, `nav.bunker` label — ana sayfa fragment'i, URL taksonomisi değil.

---

## Test Kriterleri

- [x] `next build` **temiz** geçer (route çözümü + redirect derlemesi + tip; 0 hata/uyarı-regresyonu).
- [x] `next start` sonrası curl: `/crew-os` → **200** (5 locale: `/crew-os`, `/en/crew-os`, `/ar/crew-os`, `/de/crew-os`, `/es/crew-os` — SSG prerender).
- [x] curl: `/bunker-os` → **308** `/crew-os`; `/en/bunker-os` → **308** `/en/crew-os` (aynı şekilde ar/de/es). Çıplak + prefixli **ikisi de** yönlenir (locale gap yok).
- [x] curl: `/forum` → **308** `/bulten` **hâlâ çalışır** (regresyon yok — `/forum` girişleri korundu).
- [x] `sitemap.ts` çıktısı `/crew-os` (5 locale) içerir, `/bunker-os` **içermez**.
- [x] `tests/e2e/subpages-a11y.spec.ts` `/crew-os`'u ziyaret eder ve showcase a11y **korunan taban** (a11y=100 çift-tema) regresyonsuz geçer.

---

## Risk ve Geri Dönüş Planı

- **Route ↔ redirect çakışması:** Eski klasör tam silinmezse redirect fire etmez → curl testi (308 beklentisi) yakalar; klasörü sil.
- **Locale-prefix redirect eksikliği:** Prefixli giriş unutulursa `/en/bunker-os`→404 → curl 5-locale testi yakalar.
- **Rollback:** `git checkout -- next.config.ts src/app/sitemap.ts tests/` + `crew-os/`→`bunker-os/` geri taşı. Değişiklikler izole ve geri dönüşü kolay (migration/veri yok).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (`feat(TASK-11.01): ...`)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md + PHASE-11.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-02 (run-task)

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Route rename:** `git mv src/app/[locale]/bunker-os → crew-os` (git history korundu, eski klasör tamamen silindi). `page.tsx` içeriği **aynen** — `import BunkerShowcase from "@/components/bunker-os/BunkerShowcase"` + namespace `bunkerOs` korundu (11.02'nin işi, bu task'ta dokunulmadı).
- **`next.config.ts`:** `async redirects()` dizisine 2 kalıcı (308) giriş eklendi — çıplak `/bunker-os` → `/crew-os` + prefixli `/:locale(en|ar|de|es)/bunker-os` → `/:locale/crew-os`. Mevcut `/forum`→`/bulten` girişleri aynen korundu.
- **`sitemap.ts`:** PATHS `"/bunker-os"` → `"/crew-os"` (priority/changeFrequency mantığı değişmedi).
- **Test:** `subpages-a11y.spec.ts:23` `{ label:"crew-os", path:"/crew-os" }`; `a11y-helpers.ts:36-40` yorumlarındaki `/bunker-os` örnekleri `/crew-os`'a tazelendi (fonksiyonel değil).

**Doğrulama (ampirik):**
- `next build` **temiz** — `/[locale]/crew-os` 5 locale SSG prerender; `bunker-os` route yok.
- curl (temiz `next start`): `/crew-os` + `/{en,ar,de,es}/crew-os` → **200**; `/bunker-os` + `/{en,ar,de,es}/bunker-os` → **308** ilgili `/crew-os`'a (çıplak + prefixli, locale gap yok); `/forum` + `/forum/deneme` → **308** `/bulten` (regresyon yok); sitemap 5× `/crew-os`, 0× `/bunker-os`.
- `subpages-a11y.spec.ts --grep crew-os`: **10/10 geçti** (5 locale × light+dark, WCAG-AA 0 ihlal) — korunan a11y tabanı regresyonsuz.

**Not (süreç disiplini uygulandı):** İlk curl koşusunda `/crew-os` 404 / `/bunker-os` 200 döndü → MEMORY "stray next-server portu tutar" tuzağı. Teşhis: port 3999'u önceki oturumdan kalan 2 stray `next-server` tutuyordu (yeni start EADDRINUSE, curl eski build'e düştü). Stray'ler öldürüldü, temiz portta (4123) fresh process teyit edilerek (listening-PID) yeniden ölçüldü → tüm kriterler geçti.

**Son Yaklaşım:** Task tamamlandı; sonraki adım TASK-11.02 (i18n namespace rename).

---

**Oluşturulma:** 2026-07-02 (plan-phase 11)
