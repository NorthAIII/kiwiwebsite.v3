# TASK-17.01: S1 — Giriş Noktaları & Yönlendirme Matrisi

**Durum:** ⬜ Bekliyor
**Modül:** M4 i18n (+M6 SEO/Deploy) (modules/M4-i18n.md, M6-SEO-Deploy.md)
**Feature:** S1 senaryo grubu — giriş/yönlendirme (doğrulama, yeni feature üretmez)
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** Yok (faz ilk task'ı — taze `next build` ground-truth'ı kurar; 17.02/17.03 prerender-grep bu build'e dayanır)

---

## Hedef

5 dil × 6 sayfa route matrisini + **v0.4'ün dokunmadığı redirect katmanını** + derin-link/bilinmeyen-locale davranışını **taze prod build** üzerinde HTTP katmanında (curl + `.next/routes-manifest.json`) uçtan-uca doğrula. v0.4 bu katmana **hiç dokunmadı** → S1 = **regresyon re-teyidi** (v0.3 Faz 11/13'te mühürlenen 3 redirect ailesi hâlâ doğru mu). Bu task ayrıca faz için **taze `next build`** üretir (17.02/17.03 prerender-grep + `seo-redirects` tohumu buna dayanır). Tamamlanma = route status matrisi + redirect kontrolleri koşuldu, sonuçlar PHASE-17'ye triyajlı kaydedildi (peşinen iddia yok, gözle + kaydet).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — "Araştırma Bulguları" → S1 araç satırı (A: `routes-manifest.json` + `seo-redirects.test.ts` + curl) + Ortam Ampirik Teyidi (node v24 · canlı redirect'ler doğru) + Dikkat Edilecekler (locale tuzağı, `next start` denenmez)
- `_dev/memory/next-config-redirect-locale-prefix.md` — config redirect locale-prefix kapsamı + sıra tuzağı (`:slug*` opsiyonel grup; çıplak giriş slug'dan önce)
- `_dev/MEMORY.md` → locale tuzağı maddesi (TR prefixsiz → `NEXT_LOCALE=tr` cookie; curl Accept-Language tetiklemez) + `sandbox-runtime-browser-page-route.md` (`next start` exit 144)
- `next.config.ts` (redirects [next.config.ts:27-49](next.config.ts#L27-L49)), `src/app/[locale]/` route ağacı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi tablosunda 17.01 durumu + S1 bulgu notu (özet)

---

## Alt Görevler

- [ ] **1. Taze `next build` + ground-truth teyidi**
  - `npm run build` temiz geçmeli (6 sayfa × 5 locale SSG prerender; `Compiled successfully`) → `.next/routes-manifest.json` + `.next/server/app/**/*.html` yenilenir (17.02/17.03 buna dayanır)
  - Route ağacı ön-denetim: `crew-os` fiziksel dizin var; `bunker-os`/`forum` fiziksel dizin **yok** (redirect'i gölgeleyen route yok)
  - **`next start` DENENMEZ** (memory: sandbox `exit 144`) → HTTP doğrulaması curl + build-ground-truth ile

- [ ] **2. Route status matrisi — 6 sayfa × 5 locale (curl)**
  - 6 sayfa: `/`, `/crew-os`, `/spor-salonu-yazilimi`, `/vaka-calismalari`, `/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`
  - TR prefixsiz + `NEXT_LOCALE=tr` cookie; EN/AR/DE/ES açık-prefixli cookie'siz → 30/30 = **200**; `html lang` doğru, AR `dir=rtl`
  - Not: canlı katman 17.08'de; bu task build-ground-truth (routes-manifest regex örnek-path testi) + gerekirse `page.route`/canlı curl ile HTTP kodu

- [ ] **3. Redirect kontrolleri (v0.4 dokunmadı → regresyon re-teyit)**
  - `.next/routes-manifest.json` regex'lerini örnek path'lere test et: `/bunker-os`→308→`/crew-os` (çıplak+5-locale twin); `/forum`→308→`/` (+twin); `/forum/:slug*`→308→`/bulten/:slug*` (+twin)
  - Sıra tuzağı teyidi: çıplak `/forum`→`/` slug girişinden **önce** eşleşiyor (hedefler ıraksak); hepsi `permanent:true`→308

- [ ] **4. Derin-link & bilinmeyen-locale gözlem**
  - `/en#sectors`→200; çıplak `/bulten`→404; `/tr`→307→`/` (as-needed strip); `/xx`·`/en-US`·`/zz/crew-os`→404 (next-intl middleware) — gözle + kaydet (beklenen, bug değil)

- [ ] **5. Triyaj & kayıt**
  - Kapsam-içi bug varsa (ana sayfa **veya 5 alt sayfa**) → düzeltme task'ı önerisi; sahipli/beklenen kayıtlar (çıplak `/bulten`→404, `/tr`→307) Oturum Kaydı + PHASE-17'ye

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ (kapsam-içi bug düzeltmesi ayrı reaktif task olur). Değişen yalnız _dev/ dokümanları. Tüm referans tanımlayıcılar ZATEN-VAR: redirect kaynakları next.config.ts'de repoda-tanımlı, routes-manifest build çıktısı, 6 route repoda-teyitli. YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-17.01.md          # Oturum kaydı + bulgular (bu dosya)
├── phases/PHASE-17.md           # Task Listesi 17.01 durumu + S1 bulgu notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **Locale tuzağı (memory):** TR prefixsizdir → `NEXT_LOCALE=tr` cookie olmadan tarayıcı `/en`'e sapar; curl Accept-Language göndermez (sapmaz), ama TR'yi cookie ile zorla → tutarlılık. Regresyon kıyasında hep aynı locale.
- **Redirect sıra tuzağı (memory `next-config-redirect-locale-prefix`):** `/forum/:slug*` opsiyonel gruba derlenir → çıplak `/forum`'u da eşler; hedefler ıraksadığı için (çıplak→`/`, slug→`/bulten`) config'te çıplak giriş slug'dan **önce** gelmeli. `routes-manifest.json` regex'lerini örnek path'lere test ederek denetle.
- **`next start` DENENMEZ (memory kuralı):** sandbox `exit 144`. HTTP status için curl (build-ground-truth + gerekirse canlı/`page.route`); redirect regex'i deterministik olarak `routes-manifest.json`'da.
- **v0.4 bu katmana dokunmadı:** S1 regresyon re-teyidi. `/crew-os` public + `/bunker-os` yalnız 308 kaynağı (Faz 11); `/forum`→`/` (Faz 13). Yeni redirect beklenmiyor — sapma varsa regresyon bulgusu.

---

## Test Kriterleri

- [ ] `next build` temiz (6 sayfa × 5 locale prerender); `.next/routes-manifest.json` + prerender HTML tazelendi
- [ ] 6 sayfa × 5 locale = 30 kombinasyon **200** (TR cookie ile prefixsiz, diğerleri prefixli); `html lang` + AR `dir=rtl` doğru
- [ ] `/bunker-os`→`/crew-os` **308** çıplak + 5-locale twin; `/forum`→`/` **308**; `/forum/<slug>`→`/bulten/<slug>` **308**; sıra tuzağı doğru
- [ ] Çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale→404 gözlemlendi ve kaydedildi (peşinen iddia yok)
- [ ] Bulgular triyaj edildi; PHASE-17 + task doc'a yazıldı; kaynak kod değişmedi

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [durum]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
