# TASK-13.04: `/forum` locale-gap düzelt + tüm config redirect denetimi + redirect regresyon tohumu

**Durum:** ⬜ Bekliyor
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

- [ ] **1. `next.config.ts` `redirects()` — `/forum` gap'i kapat**
  - `/forum` → `/` (index; `/bulten` 404 olduğu için ana sayfa — kullanıcı kararı).
  - `/:locale(en|ar|de|es)/forum` → `/:locale` (locale twin).
  - `/forum/:slug*` → `/bulten/:slug*` (mevcut, korunur).
  - `/:locale(en|ar|de|es)/forum/:slug*` → `/:locale/bulten/:slug*` (locale twin, YENİ).
  - Tümü `permanent: true` (308). `/bunker-os` çifti **korunur** (değiştirme).
  - Sıra: spesifik (`:slug*`) vs genel giriş sırasına dikkat — Next redirect'leri sırayla eşler; `/forum/:slug*` `/forum`'dan önce gelsin ki slug yakalansın (mevcut sıra zaten böyle; koru).

- [ ] **2. `tests/seo-redirects.test.ts` oluştur (YENİ) — redirect locale-kapsam assertion (Vitest node)**
  - `.next/routes-manifest.json` oku → `redirects[]`.
  - Assertion: her mantıksal redirect kaynağı için **çıplak + `/:locale(...)`** girişi var; `statusCode === 308`.
  - Beklenen kaynaklar: `/forum`, `/forum/:slug*`, `/bunker-os` (+ hepsinin locale-twin'i).
  - Manifest yoksa **açık hata** (silent skip yok — build önce koşmalı; CI fast job build→test sırası bunu sağlar; yerelde `next build` gerekli).

- [ ] **3. Build ground-truth ile doğrula**
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

- [ ] `next build` temiz; `.next/routes-manifest.json` üretilir.
- [ ] `npm run test` (build sonrası) → `tests/seo-redirects.test.ts` yeşil: `/forum`, `/forum/:slug*`, `/bunker-os` + locale-twin'leri 308.
- [ ] Manifest doğrulama (kanıt): `/en/forum`→`/en` 308, `/forum`→`/` 308, `/en/forum/x`→`/en/bulten/x` 308, `/forum/x`→`/bulten/x` 308; `/bunker-os` çifti korunmuş.
- [ ] i18n-parity + helper unit testi (varsa) hâlâ yeşil.

---

## Karar Noktaları

- **Redirect regresyon testi kaynağı:** `.next/routes-manifest.json` (araştırma kararı — derlenmiş gerçek çıktı; **build bağımlı**, CI fast job build→test ile karşılanır, yerelde önce build gerekir) vs. redirect'leri saf modüle çıkarıp import (build-bağımsız ama `next.config.ts` daha geniş refactor + Dokunulmaz yüzeyi). → **Araştırma kararı `routes-manifest.json` önerilir**; build-bağımlılığı verify-plan'da teyit edilir (test manifest yoksa açık fail eder, silent skip etmez).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`fix(TASK-13.04): ...`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-13 task tablosu güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** ⬜ Bekliyor

---

**Oluşturulma:** 2026-07-03 (plan-phase 13)
