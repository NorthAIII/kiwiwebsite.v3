# TASK-9.01: S1 — Giriş Noktaları & Yönlendirme Matrisi

**Durum:** ✅ Tamamlandı
**Modül:** M4 i18n (+M6 SEO/Deploy) (modules/M4-i18n.md, M6-SEO-Deploy.md)
**Feature:** S1 senaryo grubu — giriş/yönlendirme (doğrulama, yeni feature üretmez)
**Faz:** Phase 9 (phases/PHASE-9.md)
**Bağımlılıklar:** Yok (faz ilk task'ı — kanonik prod-serve'i kurar)

---

## Hedef

5 dil × 6 sayfa route matrisini + redirect davranışını + derin-link/bilinmeyen-locale davranışını **fresh prod build** üzerinde HTTP katmanında (curl) uçtan-uca doğrula. Amaç: her giriş noktasının doğru status/hedefe çözüldüğünü gözle + kaydet; yönlendirme davranışını **peşinen iddia etmeden gözlemle**. Tamamlanma = 6 sayfa × 5 locale status matrisi + redirect kontrolleri koşuldu, sonuçlar PHASE-9'a triyajlı kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-9.md` — "Araştırma Bulguları" → Senaryo→araç eşlemesi (S1 satırı) + Dikkat Edilecekler (locale tuzağı, redirect 308) + Ortam Kararı (kanonik prod-serve)
- `_dev/memory/a11y-olcum-tema-tuzagi.md` yanı sıra MEMORY.md → locale tuzağı maddesi (TR prefixsiz → `NEXT_LOCALE=tr` cookie; curl Accept-Language tetiklemez)
- `next.config.ts` (redirects), `src/app/[locale]/` route ağacı

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-9.md` — Task Listesi tablosunda 9.01 durumu + S1 bulgu notu (özet)

---

## Alt Görevler

- [x] **1. Kanonik prod-serve kur + PID teyit**
  - `npm run build` temiz geçti (6 sayfa × 5 locale SSG prerender); `npx next start -p 3000`
  - Listening-PID **75158** (`next-server`, parent 75145 az önce başlatıldı) teyit edildi (`ss -ltnp | grep :3000`) — stray/stale yok (taze devcontainer)

- [x] **2. Route status matrisi — 6 sayfa × 5 locale**
  - Sayfalar: `/` · `/spor-salonu-yazilimi` · `/vaka-calismalari` · `/bunker-os` · `/bulten/ai-sdr-araclari` · `/bulten/claude-opus-4-8-fable-5`
  - TR = **prefixsiz** + `NEXT_LOCALE=tr` cookie; EN/AR/DE/ES = **prefixli**, cookie'siz
  - **30/30 kombinasyon 200** (raw = final, TR cookie ile redirect tetiklenmedi). `html lang` her locale'e doğru çözüldü (tr/en/ar/de/es), AR `dir="rtl"` teyitli

- [x] **3. Redirect kontrolleri**
  - `/forum` → **308** → `/bulten` ✓; `/forum/ai-sdr-araclari` + `/forum/claude-opus-4-8-fable-5` → **308** → `/bulten/<slug>` → 200 ✓ (`permanent:true` → 308, 301 değil)
  - Çıplak `/bulten` (TR cookie + `/en/bulten`) → **404** ✓ = Faz 3 sahipli bulgusu, **record-not-fix** (görsel/SEO M6); `/forum`→`/bulten`→404 zinciri de teyitli

- [x] **4. Derin-link & bilinmeyen-locale gözlem**
  - Derin-link: `/en#sectors` → 200 (curl fragment'ı düşürür → `/en`; anchor client-side, HTTP'de görünmez) ✓
  - Bilinmeyen-locale gözlem: `/xx` `/frr` `/xx/bunker-os` `/en-US` `/zz/vaka-calismalari` → **404** (next-intl middleware; bug değil). **Yeni gözlem:** `/tr` açık-prefix → **307** → `/` (as-needed default-locale prefix stripping — beklenen, bug değil)

- [x] **5. Triyaj & kayıt**
  - TK7 triyaj: **kapsam-içi gerçek bug yok** → düzeltme task'ı gerekmiyor. Kapsam-dışı/ertelenmiş sahipli kayıt: çıplak `/bulten`→404 (M6). `/tr`→307 ve bilinmeyen-locale→404 beklenen davranış olarak kaydedildi
  - Sonuç özeti Oturum Kaydı + PHASE-9 Task Listesi notuna yazıldı

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ (kapsam-içi bug düzeltmesi ayrı reaktif task olur). Değişen yalnız _dev/ dokümanları. -->

```
_dev/
├── tasks/TASK-9.01.md          # Oturum kaydı + bulgular (bu dosya)
├── phases/PHASE-9.md           # Task Listesi 9.01 durumu + S1 bulgu notu
└── DURUM.md                    # Aktif task + özet
```

---

## Dikkat Noktaları

- **Locale tuzağı (memory):** TR alt sayfa prefixsizdir → `NEXT_LOCALE=tr` cookie olmadan curl `/en/...`'e yönlenmez ama tarayıcı yönlenir; curl Accept-Language göndermediğinden TR'yi cookie ile zorla. Regresyon kıyasında hep aynı locale.
- **Redirect 308, 301 değil** (`next.config.ts:14-17` `permanent:true`). `-I` ile status kodunu birebir doğrula.
- **Çıplak `/bulten`→404 beklenen bulgu** — Faz 3'te sahiplenildi (görsel/SEO M6); bu fazda record-not-fix (TK7).
- **Kanonik ortam = fresh prod build (TK2)**; dev server tali. `reuseExistingServer` tuzağı: :3000'de doğru (yeni) build oturduğunu teyit et.

---

## Test Kriterleri

- [x] `next build` temiz geçti; :3000'i dinleyen PID (75158) fresh process olarak teyit edildi
- [x] 6 sayfa × 5 locale = 30 kombinasyon **200** (TR cookie ile prefixsiz, diğerleri prefixli)
- [x] `/forum`→`/bulten` ve `/forum/<slug>`→`/bulten/<slug>` **308**; çıplak `/bulten`→404 bulgusu kaydedildi (record-not-fix)
- [x] Bilinmeyen-locale davranışı gözlemlendi ve kaydedildi (peşinen iddia yok)
- [x] Bulgular triyaj edildi; PHASE-9 + task doc'a yazıldı

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum 1 — 2026-07-02

**Yapılanlar:**
- Fresh prod build (`npm run build` temiz — 6 sayfa × 5 locale SSG) + `next start -p 3000`; listening-PID 75158 fresh process teyit.
- Route status matrisi: 30/30 kombinasyon 200 (TR prefixsiz+cookie, EN/AR/DE/ES prefixli). `html lang` her locale'e doğru çözüldü, AR `dir="rtl"`.
- Redirect'ler: `/forum`→308→`/bulten`, `/forum/<slug>`→308→`/bulten/<slug>`→200. Çıplak `/bulten`→404.
- Derin-link `/en#sectors`→200; bilinmeyen-locale (`/xx` `/frr` `/en-US` `/zz/...`)→404; `/tr`→307→`/`.

**Bulgular / Triyaj (TK7):**
- **Kapsam-içi gerçek bug: yok.** Düzeltme task'ı gerekmedi.
- Sahipli/beklenen kayıtlar (record-not-fix): çıplak `/bulten`→404 (Faz 3 bulgusu, M6 görsel/SEO); `/tr`→307→`/` (as-needed default-locale prefix stripping, beklenen); bilinmeyen-locale→404 (next-intl middleware, beklenen).

**Son Yaklaşım:** Task tamamlandı — S1 HTTP katmanı uçtan-uca temiz doğrulandı.

**Sonraki Adım Detayı:** run-task TASK-9.02 (S5 taksonomi/dürüstlük + S6-render non-TR bütünlüğü, curl/grep) — yeni oturum.

**Kaynak kod değişmedi** (doğrulama fazı); yalnız `_dev/` dokümanları güncellendi.

---

**Oluşturulma:** 2026-07-02
