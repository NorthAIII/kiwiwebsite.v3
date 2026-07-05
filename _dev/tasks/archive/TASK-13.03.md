# TASK-13.03: alternates'i layout'tan ana sayfaya taşı (fail-safe default)

**Durum:** ✅ Tamamlandı
**Modül:** M6 SEO & Deploy (modules/M6-SEO-Deploy.md) + M2 (ana sayfa)
**Feature:** TB-1 — Alt-sayfa self-canonical + 5-locale hreflang alternates (page-wiring, layout→home + fail-safe)
**Faz:** Phase 13 (phases/PHASE-13.md)
**Bağımlılıklar:** TASK-13.01 ✅ (helper), TASK-13.02 ✅ (alt sayfalar önce düzeltilmiş — regresyon penceresi yok)

---

## Hedef

`alternates` bloğunu `layout.tsx` `generateMetadata`'sından **kaldır** ve ana sayfaya (`[locale]/page.tsx` — şu an `generateMetadata`'sı **yok**) `localizedAlternates(locale, "")` çağıran kendi `generateMetadata`'sını **ekle**. Bu, TB-1 mimarisinin **fail-safe** kilididir: layout artık hiçbir sayfaya canonical **miras ettirmez** → alternates set etmeyi unutan gelecekteki bir sayfa "canonical yok" (zararsız, Google self-referans alır) alır, "yanlış `/`'a canonicalize" (zararlı) değil. Ana sayfa self-canonical (`/` TR, `/en` vb.) korunur; layout title/description/openGraph **kalır**.

---

## Bağlam

Araştırma kararı (mimari B): "`alternates` layout'tan kaldırılıp **ana sayfa dahil** her sayfa kendi path'iyle çağırır (fail-safe)." Eksi senaryo kıyası: layout'ta kalsaydı unutan sayfa **yanlış** `/`'a canonicalize olurdu (zararlı); kaldırınca unutan sayfa **canonical'sız** olur (Google URL'in kendisini alır, zararsız). Kalıcılık ilkesi → fail-safe default seçildi.

**Sıralama kritik:** Bu task TASK-13.02'den **sonra** gelir. 13.02 alt sayfaları kendi alternates'lerine bağladıktan sonra, layout'tan alternates kaldırmak alt sayfaları etkilemez (onlar zaten kendi obje'lerini veriyor). Bu task yalnız home'un alternates kaynağını layout→page'e taşır. Hiçbir commit sınırında bir sayfa öncekinden **kötü** duruma düşmez.

`[locale]/page.tsx` şu an yalnız `Home` default export'u içeriyor (metadata layout'tan geliyordu). Eklenen `generateMetadata` **yalnız `alternates`** döndürür → `title`/`description`/`openGraph` layout'tan miras kalır (sığ-merge; alt sayfaların title/desc override etmesiyle aynı mekanizma, tersinden — home override etmez, sadece alternates ekler).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-13.md` — Araştırma Bulguları (mimari B fail-safe gerekçesi)
- `src/app/[locale]/layout.tsx` — mevcut `generateMetadata` (alternates bloğu kaldırılacak)
- `src/app/[locale]/page.tsx` — `generateMetadata` eklenecek (şu an yok)
- `src/i18n/metadata.ts` — `localizedAlternates` (TASK-13.01)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Aktif task pointer + task özeti
- `_dev/phases/PHASE-13.md` — Task Listesi tablosunda 13.03 durumu
- `_dev/docs/DECISIONS.md` — (opsiyonel) fail-safe canonical mimarisi karar özeti

---

## Alt Görevler

- [ ] **1. `layout.tsx` `generateMetadata`'sından `alternates` bloğunu kaldır**
  - `alternates: { canonical: ..., languages: ... }` sil.
  - `title`, `description`, `metadataBase`, `openGraph` **korunur** (silme).

- [ ] **2. `[locale]/page.tsx`'e `generateMetadata` ekle**
  - `import type { Metadata } from "next";` + `import { localizedAlternates } from "@/i18n/metadata";`
  - `export async function generateMetadata({ params }): Promise<Metadata> { const { locale } = await params; return { alternates: localizedAlternates(locale, "") }; }`
  - `Home` default export'u ve mevcut render **değişmez**.
  - Not: `metadataBase` layout'ta → relative canonical/languages absolute'e çözülür (home page ayrıca `metadataBase` set etmez).

- [ ] **3. Build sonrası ana sayfa `<head>` doğrula**
  - `/` (TR) canonical `/`; `/en` canonical `/en` (vb.); `hreflang` 5 dil + `x-default`; title/description hâlâ layout'tan geliyor (boş değil).

---

## Etkilenen Dosyalar

```
src/app/[locale]/
├── layout.tsx     # alternates bloğu kaldırılır (title/desc/og/metadataBase korunur) — zaten var
└── page.tsx       # generateMetadata eklenir (alternates: localizedAlternates(locale, "")) — zaten var
```

---

## Dikkat Noktaları

- **Fail-safe amacı:** layout artık canonical miras ettirmez → unutulan sayfa "canonical yok" (zararsız). Bu, TB-1'in kalıcılık kilidi; kaldırmayı atlamak feature'ı yarım bırakır.
- **Home `generateMetadata` yalnız `alternates` döndürür** — title/description/openGraph layout'tan sığ-merge ile gelir; home'da tekrar yazma (drift).
- **`metadataBase` layout'ta kalır** → home relative alternates absolute'e çözülür.
- **Sıralama:** 13.02'den sonra çalıştır (regresyon penceresi yok). 13.02 atlanıp bu çalışırsa alt sayfalar canonical'sız kalır (fail-safe zararsız ama TB-1 eksik) — sıraya uy.
- **DOM/içerik değişmez** → guardrail (a11y/perf/CLS) yapısal regresyonsuz.
- **DECISIONS kaydı:** "canonical/alternates fail-safe mimarisi (layout→sayfa, ortak helper)" bir mimari karar → `docs/DECISIONS.md`'ye kısa özet eklenebilir (append-only).

---

## Test Kriterleri

- [ ] `next build` temiz (0 hata, 0 `MISSING_MESSAGE`).
- [ ] Ana sayfa prerender `<head>`: `/` TR canonical `/`; non-TR (`/en` vb.) canonical prefixli; hreflang 5 dil + `x-default`; title/description dolu (layout'tan) — kanıt-artefaktı.
- [ ] 5 alt sayfa (13.02) canonical'ı hâlâ kendi path'inde (layout kaldırma onları bozmadı).
- [ ] Helper unit testi + i18n-parity + redirect testi (varsa) yeşil.
- [ ] Tüm route'larda canonical `/`'a düşen **tek** yer kalmadı (ana sayfa hariç, ki o zaten `/`).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`refactor(TASK-13.03): ...` veya `feat`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md + PHASE-13 task tablosu güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- `src/app/[locale]/layout.tsx` `generateMetadata`'sından `alternates: { canonical, languages }` bloğu **kaldırıldı**; yerine fail-safe mimarisini açıklayan yorum kondu. `title` / `description` / `metadataBase` / `openGraph` **korundu**.
- `src/app/[locale]/page.tsx`'e `generateMetadata` **eklendi** (yeni): `import type { Metadata }` + `import { localizedAlternates } from "@/i18n/metadata"` → `return { alternates: localizedAlternates(locale, "") }`. `Home` default export ve render **değişmedi**. `title`/`description`/`openGraph` layout'tan sığ-merge ile geliyor (home yalnız `alternates` döndürür → drift yok).

**Test / Kanıt (build ground-truth):**
- `npm run test` → **23/23 ✅** (4 dosya, regresyonsuz).
- `npm run build` → **temiz**; `grep MISSING_MESSAGE .next/server/app` → **0**.
- Home prerender `<head>` (`.next/server/app/{tr,en,ar}.html`): `tr`→`canonical https://kiwiailab.com` (root); `en`→`/en`; `ar`→`/ar`; her birinde `hrefLang` tr/en/ar/de/es + **x-default** (root); `<title>` + `<meta name="description">` **dolu** (layout'tan miras — boş değil).
- Alt sayfa regresyon (13.02): `tr/crew-os`→`/crew-os`, `en/crew-os`→`/en/crew-os`, `tr/spor-salonu-yazilimi`→`/spor-salonu-yazilimi`, `ar/vaka-calismalari`→`/ar/vaka-calismalari`, `tr/bulten/ai-sdr-araclari`→`/bulten/ai-sdr-araclari` — hepsi **kendi path'inde** (layout kaldırma bozmadı).
- `grep -rl 'canonical href="https://kiwiailab.com"/>' .next/server/app` → **yalnız `tr.html`** (home TR). `/`'a canonicalize olan tek route home TR; başka hiçbir sayfa `/`'a düşmüyor. Toplam 30 canonical'lı HTML (5 locale × 6 route).

**Son Yaklaşım:** TB-1 tamamlandı (13.01 helper → 13.02 alt sayfalar → 13.03 layout→home fail-safe). Fail-safe kilidi devrede: layout artık canonical miras ettirmiyor.

**Sonraki Adım Detayı:** `run-task` → **TASK-13.04** (TB-2: `/forum`→`/` locale-twin + config redirect denetimi + redirect regresyon tohumu). Faz 13'ün son task'ı; sonra `verify-phase 13`.

---

**Oluşturulma:** 2026-07-03 (plan-phase 13)
