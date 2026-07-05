# TASK-13.04: `/forum` locale-gap düzelt + tüm config redirect denetimi + redirect regresyon tohumu

**Durum:** ✅ Tamamlandı
**Modül:** M6 SEO & Deploy (modules/M6-SEO-Deploy.md — F6.3 next config redirects)
**Feature:** TB-2 — `/forum` locale-prefix gap + config redirect denetimi
**Faz:** Phase 13 (phases/PHASE-13.md)
**Bağımlılıklar:** Yok (TB-1'den bağımsız; sıra olarak fazın son task'i)

---

## Hedef

`next.config.ts` redirect'lerindeki sessiz locale-prefix gap'ini kapat: `/forum` ve `/forum/:slug*` yalnız çıplak formda tanımlı → `/en/forum` vb. **404**. Kanıtlı iki-giriş desenini (çıplak + `/:locale(en|ar|de|es)/…`) uygula. **Beklenmedik bulgu (araştırma):** `/bulten` index sayfası **yok** → `/forum` → `/bulten` **404'e iniyor** → kullanıcı kararı: `/forum` (index) hedefi **`/`** (ana sayfa; bülten içeriği zaten orada `#forum`). `/forum/:slug*` → `/bulten/:slug*` hedefi geçerli, yalnız locale-twin eklenir. `/bunker-os` çifti (Faz 11) korunur. Redirect locale-kapsamını mühürleyen hafif regresyon tohumu (Vitest node, `routes-manifest.json` assertion) eklenir.

---

## Bağlam

Araştırma denetimi 4 redirect'in tümünü taradı: `/bunker-os` çifti ✅ sağlam (Faz 11); `/forum` + `/forum/:slug*` ❌ locale-twin'siz. **Ampirik memory** (`next-config-redirect-locale-prefix`): config `source` **literal** eşleşir, next-intl `as-needed` prefix'lerini otomatik kapsamaz → tek `source:"/foo"` yazınca `/en/foo`→404. Doğru desen: çıplak + prefixli iki giriş.

**Kritik bulgu:** `src/app/[locale]/bulten/` altında index `page.tsx` yok (yalnız 2 makale klasörü) → mevcut `/forum`→`/bulten` redirect'i zaten 404 hedefine gidiyordu. Bülten içeriği ana sayfada `id="forum"` bölümünde (`Forum.tsx`). Locale-twin'i naïf eklemek 1 yerine **5 locale'i** 404'e yönlendirirdi → kullanıcı kararı hedef `/`. `/bulten` index sayfası **oluşturmak kapsam dışı** (içerik/route üretimi); bu task yalnız redirect hedefini geçerli kılar.

`next.config.ts` Dokunulmazlar listesinde (build config) — ama redirect düzeltmesi bu fazın **onaylı kapsamı** (discuss-phase 13 damgaladı); yalnız `redirects()` bloğu değişir, diğer config (transpilePackages/images/intl-plugin) dokunulmaz.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-13.md` — Araştırma Bulguları (redirect denetim tablosu, `/bulten` 404 bulgusu, hedef `/` kararı)
- `_dev/memory/next-config-redirect-locale-prefix.md` — ampirik iki-giriş deseni + tuzaklar (çakışan route, 308, çift-redirect)
- `next.config.ts` — mevcut `redirects()` bloğu
- `_dev/docs/TESTING.md` — Vitest node katmanı + CI fast job (build→test) sırası

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-13.md` — Task Listesi tablosunda 13.04 durumu
- `_dev/modules/M6-SEO-Deploy.md` — F6.3 redirect açıklaması güncelle (`/forum`→`/` + locale twin'ler)
- `_dev/docs/DECISIONS.md` — (opsiyonel) `/forum`→`/` hedef kararı + `/bulten` index yok bulgusu

---

## Alt Görevler

- [x] **1. `next.config.ts` `redirects()` — `/forum` gap'i kapat**
  - `/forum` → `/` (index; `/bulten` 404 olduğu için ana sayfa — kullanıcı kararı).
  - `/:locale(en|ar|de|es)/forum` → `/:locale` (locale twin).
  - `/forum/:slug*` → `/bulten/:slug*` (mevcut, korunur).
  - `/:locale(en|ar|de|es)/forum/:slug*` → `/:locale/bulten/:slug*` (locale twin, YENİ).
  - Tümü `permanent: true` (308). `/bunker-os` çifti **korunur** (değiştirme).
  - Sıra: spesifik (`:slug*`) vs genel giriş sırasına dikkat — Next redirect'leri sırayla eşler; `/forum/:slug*` `/forum`'dan önce gelsin ki slug yakalansın (mevcut sıra zaten böyle; koru).

- [x] **2. `tests/seo-redirects.test.ts` oluştur (YENİ) — redirect locale-kapsam assertion (Vitest node)**
  - `.next/routes-manifest.json` oku → `redirects[]`.
  - Assertion: her mantıksal redirect kaynağı için **çıplak + `/:locale(...)`** girişi var; `statusCode === 308`.
  - Beklenen kaynaklar: `/forum`, `/forum/:slug*`, `/bunker-os` (+ hepsinin locale-twin'i).
  - Manifest yoksa **açık hata** (silent skip yok — build önce koşmalı; CI fast job build→test sırası bunu sağlar; yerelde `next build` gerekli).

- [x] **3. Build ground-truth ile doğrula**
  - `.next/routes-manifest.json` redirect regex'leri: `/forum`, `/en/forum` (+ 4 dil), `/forum/x`, `/en/forum/x` hepsi 308; hedefler doğru (`/`, `/:locale`, `/bulten/:slug*`, `/:locale/bulten/:slug*`).
  - Çift-redirect yok (config middleware'den önce edge'de tek atlama).

---

## Etkilenen Dosyalar

```
next.config.ts                    # redirects() — /forum locale-twin + hedef /  (zaten var; Dokunulmaz ama faz onaylı)
tests/
└── seo-redirects.test.ts         # YENİ — routes-manifest redirect locale-kapsam assertion (node)
```

---

## Dikkat Noktaları

- **Config `source` locale-prefix'i otomatik kapsamaz (AMPİRİK):** her redirect iki giriş; tek `source` yazma. Ref: `_dev/memory/next-config-redirect-locale-prefix.md`.
- **`/bulten` index 404 → hedef `/`** (kullanıcı kararı): `/forum` index'i `/bulten`'e değil `/`'a git (bülten içeriği ana sayfada). `/bulten` index oluşturma **kapsam dışı**.
- **Çakışan fiziksel route:** `/forum` klasörü yok (teyitli) → route 200 kazanmaz, redirect fire eder. Değişmedi.
- **308 + çift-redirect yok:** `permanent:true`; config redirect middleware'den önce (edge) → tek atlama.
- **Redirect sırası:** `/forum/:slug*` girişi `/forum`'dan önce/uygun konumda kalsın (slug eşleşmesi genel girişe düşmesin).
- **`next.config.ts` Dokunulmaz ama faz-onaylı:** yalnız `redirects()` bloğu; `transpilePackages:["three"]` / `images` / intl-plugin **dokunulmaz** (kaldırılırsa build kırılır).
- **Ortam kısıtı:** cloud devcontainer'da `next start` sandbox öldürebilir → doğrulama `routes-manifest.json` (build artefaktı) ile; kanıt-artefaktına bağlanır (sahte-geçmiş yok).

---

## Test Kriterleri

- [x] `next build` temiz; `.next/routes-manifest.json` üretilir.
- [x] `npm run test` (build sonrası) → `tests/seo-redirects.test.ts` yeşil: `/forum`, `/forum/:slug*`, `/bunker-os` + locale-twin'leri 308.
- [x] Manifest doğrulama (kanıt): `/en/forum`→`/en` 308, `/forum`→`/` 308, `/en/forum/x`→`/en/bulten/x` 308, `/forum/x`→`/bulten/x` 308; `/bunker-os` çifti korunmuş.
- [x] i18n-parity + helper unit testi (varsa) hâlâ yeşil.

---

## Karar Noktaları

- **Redirect regresyon testi kaynağı:** `.next/routes-manifest.json` (araştırma kararı — derlenmiş gerçek çıktı; **build bağımlı**, CI fast job build→test ile karşılanır, yerelde önce build gerekir) vs. redirect'leri saf modüle çıkarıp import (build-bağımsız ama `next.config.ts` daha geniş refactor + Dokunulmaz yüzeyi). → **Araştırma kararı `routes-manifest.json` önerilir**; build-bağımlılığı verify-plan'da teyit edilir (test manifest yoksa açık fail eder, silent skip etmez).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (`fix(TASK-13.04): ...`)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md + PHASE-13 task tablosu güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `next.config.ts` `redirects()` — `/forum` locale-gap kapatıldı ve hedef `/`'a çevrildi: `/forum`→`/` + `/:locale(en|ar|de|es)/forum`→`/:locale` (YENİ twin); `/forum/:slug*`→`/bulten/:slug*` + `/:locale(en|ar|de|es)/forum/:slug*`→`/:locale/bulten/:slug*` (YENİ twin). `/bunker-os` çifti (Faz 11) korundu. Yorum bloğu iki-giriş deseni + sıra gerekçesiyle güncellendi.
- `tests/seo-redirects.test.ts` (YENİ, Vitest node) — `.next/routes-manifest.json` üzerinden: her mantıksal redirect için çıplak+twin varlığı + 308; twin regex'i tüm non-default locale'leri (`routing.locales` tek kaynak) eşler; efektif ilk-eşleşen hedef doğru; "çıplak `/forum` slug'a düşmez" sıra mührü. Manifest yoksa açık hata (silent skip yok).
- Doküman: M6 F6.3 (redirect açıklaması + kabul kriteri), DECISIONS (`/forum`→`/` + sıra tuzağı kararı), memory `next-config-redirect-locale-prefix` (`:slug*` sıra tuzağı + gap kapanışı) güncellendi.

**Son Yaklaşım:** Redirect config + `routes-manifest.json` build-artefaktı assertion (araştırma kararı). Doğrulama build ground-truth ile (cloud devcontainer'da `next start` sandbox riski — kanıt-artefaktına bağlı, sahte-geçmiş yok).

**İcra Bulgusu (planı düzeltti):** Task planı "`/forum/:slug*` girişi `/forum`'dan önce gelsin" diyordu ("mevcut sıra zaten böyle"). Ampirik ground-truth (`routes-manifest.json` regex testi) bunu **çürüttü**: `:slug*` opsiyonel gruba derlenir → `/forum/:slug*` çıplak `/forum`'u da eşler (sıfır segment). Hedefler ıraksadığı için (çıplak→`/`, slug→`/bulten`) slug-önce sırası çıplak `/forum`'u yanlışlıkla `/bulten`'e (404) yönlendiriyordu. Düzeltme: **çıplak giriş slug'dan önce** (`$`-anchor'lı bare regex = gerçek spesifik eşleşme). Bu bulgu DECISIONS + memory'ye taşındı.

**Sonraki Adım Detayı:** Faz 13'ün tüm task'ları (13.01–13.04) ✅ → sıradaki adım `verify-phase 13` (UAT).

**Kanıt:**
- `next build` temiz (exit 0), 0 hata, 0 `MISSING_MESSAGE`.
- `.next/routes-manifest.json` — 6 uygulama redirect'i (internal hariç), hepsi `statusCode 308`. Regex ground-truth: `/forum`→`/`, `/en|ar|de|es/forum`→`/:locale`, `/forum/x`→`/bulten/:slug*`, `/en/forum/x`→`/:locale/bulten/:slug*`, `/bunker-os`+twin→`/crew-os` korundu.
- `npm run test` → 5 dosya / **39 test** yeşil (önceki 23 + yeni 16 seo-redirects). i18n-parity + seo-metadata (13.01 helper) regresyonsuz.

**Sınır korundu:** İçerik/kopya/tasarım/DOM/route path değişmedi; `/bulten` index oluşturulmadı (kapsam dışı) — yalnız redirect hedefi geçerli kılındı. `next.config.ts`'te yalnız `redirects()` bloğu değişti (transpilePackages/images/intl-plugin dokunulmadı).

---

**Oluşturulma:** 2026-07-03 (plan-phase 13)
