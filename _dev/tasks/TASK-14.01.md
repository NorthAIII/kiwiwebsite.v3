# TASK-14.01: S1 — Giriş Noktaları & Yönlendirme Matrisi

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Kanonik prod-serve kur + PID teyit**
  - `npm run build` temiz geçmeli (6 sayfa × 5 locale SSG prerender); `npx next start -p 3000`
  - Listening-PID az önce başlattığın process mi (`ss -ltnp | grep :3000`) — stray/stale `next-server` yok (memory: listening-PID teyidi). `next start` bu ortamda kararlı (araştırma ampirik) ama garanti değil → çökerse build-ground-truth fallback (`.next/routes-manifest.json`)

- [ ] **2. Route status matrisi — 6 sayfa × 5 locale**
  - Sayfalar: `/` · `/crew-os` · `/spor-salonu-yazilimi` · `/vaka-calismalari` · `/bulten/ai-sdr-araclari` · `/bulten/claude-opus-4-8-fable-5`
  - TR = **prefixsiz** + `NEXT_LOCALE=tr` cookie; EN/AR/DE/ES = **prefixli**, cookie'siz
  - Beklenti: 30/30 kombinasyon **200**; `html lang` her locale'e doğru çözülmeli (tr/en/ar/de/es), AR `dir="rtl"`. Peşinen iddia etme — gözle, kaydet

- [ ] **3. Redirect kontrolleri (v0.3 katmanı)**
  - `/bunker-os` → **308** → `/crew-os`; `/en/bunker-os` → **308** → `/en/crew-os` (5-locale twin: en/ar/de/es hepsi)
  - `/forum` → **308** → `/` (Faz 13: hedef artık `/bulten` değil); `/forum/ai-sdr-araclari` + `/forum/claude-opus-4-8-fable-5` → **308** → `/bulten/<slug>` → 200
  - `permanent:true` → 308 (301 değil); `-I` ile status + `Location` header'ı birebir doğrula
  - Çıplak `/bulten` (TR cookie + `/en/bulten`) → beklenti 404 (sahipli record-not-fix); gözle + kaydet

- [ ] **4. Derin-link & bilinmeyen-locale gözlem**
  - Derin-link: `/en#sectors` → 200 (curl fragment düşürür; anchor client-side)
  - Bilinmeyen-locale: `/xx`, `/en-US`, `/zz/crew-os` → 404 (next-intl middleware, beklenen); `/tr` açık-prefix → 307 → `/` (as-needed prefix stripping, beklenen). Bug değil — gözlemle, kaydet

- [ ] **5. Triyaj & kayıt**
  - Kapsam-içi (ana sayfa veya 5 alt sayfa) gerçek bug var mı → varsa düzeltme task'ı önerisi. Kapsam-dışı/beklenen → sahipli kayıt (çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale→404)
  - Sonuç özeti Oturum Kaydı + PHASE-14 Task Listesi notuna yazılır

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

- [ ] `next build` temiz; :3000'i dinleyen PID fresh process olarak teyit edildi (veya build-ground-truth fallback devrede)
- [ ] 6 sayfa × 5 locale = 30 kombinasyon **200** (TR cookie ile prefixsiz, diğerleri prefixli); `html lang` + AR `dir=rtl` doğru
- [ ] `/bunker-os`→`/crew-os` **308** çıplak + 5-locale twin; `/forum`→`/` **308**; `/forum/<slug>`→`/bulten/<slug>` **308**
- [ ] Çıplak `/bulten`→404, `/tr`→307, bilinmeyen-locale→404 gözlemlendi ve kaydedildi (peşinen iddia yok)
- [ ] Bulgular triyaj edildi; PHASE-14 + task doc'a yazıldı

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

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [doldur]

**Bulgular / Triyaj:**
- [Kapsam-içi bug: var/yok; sahipli kayıtlar]

**Kaynak kod değişmedi** (doğrulama fazı); yalnız `_dev/` dokümanları güncellendi.

---

**Oluşturulma:** 2026-07-03 (plan-phase 14)
