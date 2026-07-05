# TASK-14.01: S1 — Giriş Noktaları & Yönlendirme Matrisi

**Durum:** ✅ Tamamlandı
**Modül:** M4 i18n (+M6 SEO/Deploy) (modules/M4-i18n.md, M6-SEO-Deploy.md)
**Feature:** S1 senaryo grubu — giriş/yönlendirme (doğrulama, yeni feature üretmez)
**Faz:** Phase 14 (phases/PHASE-14.md)
**Bağımlılıklar:** Yok (faz ilk task'ı — kanonik prod-serve'i kurar)

---

## Hedef

5 dil × 6 sayfa route matrisini + **v0.3 redirect katmanını** + derin-link/bilinmeyen-locale davranışını **fresh prod build** üzerinde HTTP katmanında (curl) uçtan-uca doğrula. v0.3 deltası: `/crew-os` artık **public** (5 dil 200), eski `/bunker-os` → `/crew-os` **308** (çıplak + 5-locale twin), `/forum` → `/` **308** (Faz 13: hedef artık `/bulten` değil), `/forum/:slug*` → `/bulten/:slug*` **308**. Tamamlanma = route status matrisi + redirect kontrolleri koşuldu, sonuçlar PHASE-14'e triyajlı kaydedildi (peşinen iddia yok, gözle + kaydet).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-14.md` — "Araştırma Bulguları" → S1 araç satırı (curl + `routes-manifest` + Vitest `seo-redirects`, katman A) + Dikkat Edilecekler (locale tuzağı, redirect 308) + Ortam Ampirik Teyidi (kanonik prod-serve kararlı)
- `_dev/memory/next-config-redirect-locale-prefix.md` — config redirect locale-prefix kapsamı + sıra tuzağı (`:slug*` opsiyonel grup; çıplak giriş slug'dan önce)
- `_dev/MEMORY.md` → locale tuzağı maddesi (TR prefixsiz → `NEXT_LOCALE=tr` cookie; curl Accept-Language tetiklemez)
- `next.config.ts` (redirects), `src/app/[locale]/` route ağacı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-14.md` — Task Listesi tablosunda 14.01 durumu + S1 bulgu notu (özet)

---

## Alt Görevler

- [x] **1. Kanonik prod-serve kur + PID teyit** — build temiz (37 statik sayfa); `next start` Ready 502ms; PID 89114 fresh (stray yok); kararlı (exit 144 yok)

- [x] **2. Route status matrisi — 6 sayfa × 5 locale** — 30/30 = 200; `html lang` doğru (tr/en/ar/de/es); AR `dir=rtl`; sıfır anomali

- [x] **3. Redirect kontrolleri (v0.3 katmanı)** — `/bunker-os`→308→`/crew-os` (çıplak+5-twin); `/forum`→308→`/` (+twin); `/forum/<slug>`→308→`/bulten/<slug>` (+twin); hepsi 308 (permanent); `-L` zincirleri 200'e çözüldü. Çıplak `/bulten`→404 kaydedildi

- [x] **4. Derin-link & bilinmeyen-locale gözlem** — `/en#sectors`→200; `/xx`·`/en-US`·`/zz/crew-os`→404; `/tr`→307→`/` (as-needed strip). Gözlendi+kaydedildi

- [x] **5. Triyaj & kayıt** — kapsam-içi bug YOK; sahipli kayıtlar (çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale→404) Oturum Kaydı + PHASE-14'e yazıldı

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ (kapsam-içi bug düzeltmesi ayrı reaktif task olur). Değişen yalnız _dev/ dokümanları. Tüm referans tanımlayıcılar ZATEN-VAR: redirect kaynakları next.config.ts'de repoda-tanımlı, routes-manifest build çıktısı, 6 route repoda-teyitli. YENİ dosya yok. -->

```
_dev/
├── tasks/TASK-14.01.md          # Oturum kaydı + bulgular (bu dosya)
├── phases/PHASE-14.md           # Task Listesi 14.01 durumu + S1 bulgu notu
└── DURUM.md                     # Aktif task + özet
```

---

## Dikkat Noktaları

- **Locale tuzağı (memory):** TR prefixsizdir → `NEXT_LOCALE=tr` cookie olmadan tarayıcı `/en`'e sapar; curl Accept-Language göndermez (sapmaz), ama TR'yi cookie ile zorla → tutarlılık. Regresyon kıyasında hep aynı locale.
- **Redirect sıra tuzağı (memory `next-config-redirect-locale-prefix`):** `/forum/:slug*` opsiyonel gruba derlenir → çıplak `/forum`'u da eşler; hedefler ıraksadığı için (çıplak→`/`, slug→`/bulten`) config'te çıplak giriş slug'dan **önce** gelmeli. `routes-manifest.json` regex'lerini örnek path'lere test ederek denetle.
- **`/crew-os` yeni public (Faz 11):** eski `/bunker-os` fiziksel route klasörü **silinmiş olmalı** (kalırsa 200 kazanır, redirect'i gölgeler). Redirect 308 geldiğini teyit et.
- **Kanonik ortam = fresh prod build.** `next start` çökerse (Faz 13 `exit 144` görüldü, bu ortamda görülmedi ama garanti değil) → `.next/routes-manifest.json` build-ground-truth fallback (redirect regex'leri deterministik).

---

## Test Kriterleri

- [x] `next build` temiz; :3000'i dinleyen PID (89114) fresh process olarak teyit edildi
- [x] 6 sayfa × 5 locale = 30 kombinasyon **200** (TR cookie ile prefixsiz, diğerleri prefixli); `html lang` + AR `dir=rtl` doğru
- [x] `/bunker-os`→`/crew-os` **308** çıplak + 5-locale twin; `/forum`→`/` **308**; `/forum/<slug>`→`/bulten/<slug>` **308**
- [x] Çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale→404 gözlemlendi ve kaydedildi (peşinen iddia yok)
- [x] Bulgular triyaj edildi; PHASE-14 + task doc'a yazıldı

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-03

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Kanonik prod-serve kuruldu:** `npm run build` temiz (6 sayfa × 5 locale = 37 statik sayfa prerender, `Compiled successfully`); `npx next start -p 3000` → `Ready in 502ms`. Listening-PID `89114` az önce başlatılan fresh `next-server` (npm exec zinciri 89100→89102→89113→89114) — stray/stale yok (memory: listening-PID teyidi). `next start` bu oturumda **kararlı** (Faz 13 `exit 144` görülmedi — araştırma ampiriği doğrulandı).
- **Build-ground-truth ön-denetim:** route ağacı `src/app/[locale]/` → `crew-os` var, `bunker-os`/`forum` fiziksel dizin **yok** (redirect gölgeleyen route yok). `.next/routes-manifest.json` redirect regex'leri örnek path'lere test edildi → sıra doğru: çıplak `/forum`→`/` slug'dan **önce** eşleşiyor (memory sıra tuzağı doğru ele alınmış), `/bunker-os`→`/crew-os`, `/crew-os` redirect yok.
- **Route status matrisi (30 kombinasyon):** 6 sayfa × 5 locale. TR prefixsiz + `NEXT_LOCALE=tr` cookie; EN/AR/DE/ES prefixli cookie'siz. **30/30 = 200**, `html lang` her locale'e doğru (tr/en/ar/de/es), **AR `dir="rtl"`** (diğerleri ltr). Sıfır anomali.
- **Redirect katmanı (curl `-I`, status + `Location` birebir):** `/bunker-os`→**308**→`/crew-os` (çıplak + en/ar/de/es 5-twin hepsi); `/forum`→**308**→`/` (+ 5-locale twin `/en/forum`→`/en` vb.); `/forum/<slug>`→**308**→`/bulten/<slug>` (2 slug + `/en/forum/...` twin). Tümü `permanent:true`→308 (301 değil). Redirect zincirleri `-L` ile uçtan-uca **200**'e doğru final URL'e çözüldü.
- **Derin-link & bilinmeyen-locale (gözlem+kayıt):** `/en#sectors`→200 (curl fragment düşürür); çıplak `/bulten` (TR cookie + `/en/bulten`)→**404**; `/tr` açık-prefix→**307**→`/` (as-needed strip); `/xx`·`/en-US`·`/zz/crew-os`→**404** (next-intl middleware).

**Bulgular / Triyaj:**
- **Kapsam-içi (ana sayfa veya 5 alt sayfa) gerçek bug: YOK.** 30/30 route 200, tüm redirect'ler doğru status+hedef, taksonomi tutarlı (`/crew-os` public 5-dil, `/bunker-os` yalnız 308 redirect kaynağı).
- **Sahipli kayıtlar (kapsam-dışı/beklenen — record-not-fix, yeniden litige edilmez):**
  - Çıplak `/bulten`→404 (bilinçli: kod tabanında link yok + `/forum`→`/` kapıyı kapatır; PHASE-14 Kapsam Dışı).
  - `/tr`→307→`/` (next-intl as-needed prefix stripping, beklenen davranış; bug değil).
  - Bilinmeyen-locale (`/xx`, `/en-US`, `/zz/crew-os`)→404 (next-intl middleware, beklenen).

**Kaynak kod değişmedi** (doğrulama fazı); yalnız `_dev/` dokümanları güncellendi.

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
