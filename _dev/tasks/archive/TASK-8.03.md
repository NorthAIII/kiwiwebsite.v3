# TASK-8.03: /spor-salonu-yazilimi (Alpfit) a11y teyit + regresyon tohumu

**Durum:** ✅ Tamamlandı
**Modül:** M2 (GymSoftwareShowcase) + M6 (tohum)
**Feature:** TD5 (alt-sayfa derin a11y) + TD6 (kümülatif tohum)
**Faz:** Phase 8 (phases/PHASE-8.md)
**Bağımlılıklar:** TASK-8.01 (harness + baseline envanteri)

---

## Hedef

`/spor-salonu-yazilimi` (Alpfit yazılımı) sayfasını ana sayfa çıtasında denetle: 8.01 baseline'ında teyit edilen axe WCAG-AA ihlali varsa craft-koruyarak düzelt, ardından sayfayı parametrik harness'e (5 dil × light+dark axe 0) **mühürle**. Düşük risk beklenir — sayfa esasen `text-ink-faint` kullanıyor (Faz 4 global fix mirası) + `text-canvas` yalnız `bg-ink` CTA butonlarında (yüksek kontrast). Baseline 0 ihlal verirse task = yalnız mühürle + AR RTL teyit (kod fix yok). Tamamlanmış sayılır: sayfa × 5 dil × 2 tema axe 0 ihlal (spec'te enforce) + görsel/RTL teyit.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/tasks/TASK-8.01.md` (veya archive) — bu sayfanın baseline axe envanteri
- `_dev/phases/PHASE-8.md` — Bulgu 2 (global kazanımlar yayıldı → yüzey dar), Dikkat Edilecekler
- `_dev/modules/M2-Sayfalar-Bolumler.md` — F2.8 (Alpfit sayfası)
- `src/components/gym/GymSoftwareShowcase.tsx` — denetlenen bileşen

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` · `_dev/phases/PHASE-8.md` (Task Listesi)

---

## Alt Görevler

- [x] **1. Sayfayı `PAGES`'e ekle, ölç** — `subpages-a11y.spec.ts` `PAGES`'e `/spor-salonu-yazilimi` ekle; 5 dil × light+dark koş, 8.01 envanteriyle karşılaştır. → **0 ihlal** (baseline teyit).
- [x] **2. Teyitli ihlal varsa craft-özel düzelt** — geçildi; ihlal yok (kod fix yok). `GymSoftwareShowcase.tsx` dokunulmadı.
- [x] **3. Görsel + AR RTL teyit** — TR light + AR dark screenshot: sıfır regresyon; `/ar/spor-salonu-yazilimi` `dir="rtl"` (prerender + runtime) + physical prop yok (grep temiz) → logical bütünlük korundu.
- [x] **4. Mühürle** — sayfa `PAGES`'te kalıcı; `npm run test:e2e` yeşil (22 test), ana sayfa regresyonsuz.

---

## Etkilenen Dosyalar

```
src/components/gym/GymSoftwareShowcase.tsx  # ihlal teyit edilirse craft-özel fix (aksi halde dokunulmaz)
tests/e2e/subpages-a11y.spec.ts             # /spor-salonu-yazilimi PAGES'e mühürlenir
```

---

## Dikkat Noktaları

- **Düşük risk:** `text-ink-faint` global fix miras (Bulgu 2); `text-canvas` yalnız `bg-ink` buton (yüksek kontrast iki temada). Envanter 0 ihlal verebilir → yalnız mühürle.
- **Görseller (`public/gym/*.png`, `next/image`)** a11y'de `alt` teyidi — axe eksik-alt'ı yakalar; envanterde çıkarsa düzelt.
- **Tema/reveal/locale tuzağı** harness'te zaten çözüldü (8.01); TR prefixsiz → cookie, AR RTL derin.
- **Lighthouse a11y=100 skor gate'i verify-phase'de** (manuel); bu task'ın gate'i axe 0.

---

## Test Kriterleri

- [x] `/spor-salonu-yazilimi` × 5 dil × light+dark axe WCAG-AA **0 ihlal** (spec'te mühürlü, 10 test yeşil).
- [x] Ana sayfa `home-a11y` regresyonsuz (aynı koşu: home 2 + bunker-os 10 + gym 10 = 22 yeşil).
- [x] AR `/ar/spor-salonu-yazilimi`: `dir="rtl"` (prerender teyit) + 0 `MISSING_MESSAGE` (build temiz) + logical prop bütünlüğü (physical prop grep temiz).
- [x] Fix yapılmadı (0 ihlal); görsel craft korundu (screenshot TR light + AR dark). `next build` temiz.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler + test kriterleri karşılandı
- [x] Git commit & push · bu doküman + DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-01

**Durum:** ✅ Tamamlandı

**Ne yapıldı:**
- `/spor-salonu-yazilimi` `subpages-a11y.spec.ts` `PAGES`'e eklendi (mühür) → 5 dil × light+dark = 10 test. Kod fix **yok**: 8.01 baseline'ı (0 ihlal) teyit edildi; `GymSoftwareShowcase.tsx` bileşen kodu da temiz (`text-ink-soft`/`text-ink-faint` = Faz 4 global fix mirası; `text-canvas` yalnız `bg-ink` yüksek-kontrast butonlarında; `next/image` görsellerin `alt`'ı var → axe eksik-alt yakalamadı). Bulgu 2 birebir doğrulandı.
- **AR RTL derin teyit:** `/ar/spor-salonu-yazilimi` prerender + runtime `dir="rtl"`; bileşende physical directional prop yok (grep `left-/right-/ml-/mr-/pl-/pr-/text-left/text-right/float-` → 0) → layout logical/gap/grid tabanlı, RTL-güvenli. Screenshot (AR dark) nav aynalaması + sağa-yaslı başlık + 8'li grid/ekran görüntüsü hizası bozulmadan doğrulandı.
- **Görsel craft:** TR light + AR dark screenshot — marka-yeşili label, Fraunces başlıklar, ekran görüntüsü kartları + figcaption korundu; sıfır regresyon.
- **İçerik notu (kapsam dışı, kayıt için):** bileşen gövde metni TR/EN hardcoded ternary (ar/de/es → EN fallback), next-intl mesaj anahtarı kullanmıyor → `MISSING_MESSAGE` yok, build temiz. Mevcut/kasıtlı davranış; i18n içerik stratejisiyle (TR tek kaynak, non-TR versiyon-sınırı) tutarlı. Bu a11y task'ının kapsamı dışı (kontrast/RTL/markup denetimi hedeftir, çeviri tazeliği değil).

**Test sonuçları:**
- `npm run build` temiz.
- `npm run test:e2e` yeşil — 22 test (home 2 + bunker-os 10 + gym 10), `/spor-salonu-yazilimi` 5 dil×2 tema 0 ihlal, ana sayfa regresyonsuz.
- `npm run test` (Vitest) yeşil — 7 test (i18n parite + smoke) korundu.

---

**Oluşturulma:** 2026-07-01
