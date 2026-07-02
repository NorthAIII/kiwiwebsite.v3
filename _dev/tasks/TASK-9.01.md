# TASK-9.01: S1 — Giriş Noktaları & Yönlendirme Matrisi

**Durum:** ⬜ Bekliyor
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

- [ ] **1. Kanonik prod-serve kur + PID teyit**
  - `npm run build` temiz mi (S9'un build-temizliği burada da örtük doğrulanır); `npx next start -p 3000`
  - Listening-PID'in **az önce başlattığın** process olduğunu teyit et (`ss -ltnp` / `lsof -i:3000`) — stray/stale `next-server` yanlış-negatifi (MEMORY Süreç Disiplinleri)

- [ ] **2. Route status matrisi — 6 sayfa × 5 locale**
  - Sayfalar: `/` · `/spor-salonu-yazilimi` · `/vaka-calismalari` · `/bunker-os` · `/bulten/ai-sdr-araclari` · `/bulten/claude-opus-4-8-fable-5`
  - TR = **prefixsiz** yol + `NEXT_LOCALE=tr` cookie (`curl -I -H 'Cookie: NEXT_LOCALE=tr'`); EN/AR/DE/ES = **prefixli** (`/en/...` vb.), cookie'siz
  - Beklenti: 30 kombinasyonun tümü **200** (yönlendirme sonrası)

- [ ] **3. Redirect kontrolleri**
  - `/forum` → `/bulten` **308** (`permanent:true` → Next 308, 301 değil); `/forum/<slug>` → `/bulten/<slug>` 308
  - Çıplak `/bulten` **index'i yok** (`bulten/` altında yalnız 2 makale dizini, `page.tsx` yok) → `/forum`→`/bulten`→**404** = Faz 3 sahipli bulgusu, **record-not-fix** (görsel/SEO M6)

- [ ] **4. Derin-link & bilinmeyen-locale gözlem**
  - Derin-link: `/en#sectors` gibi anchor'lı giriş 200 döner (anchor client-side; HTTP'de fragment görünmez — yalnız sayfa status)
  - Bilinmeyen-locale (`/xx`, `/frr`): davranışı **gözlemle ve kaydet** (peşinen "404 döner" iddia etme — next-intl middleware davranışı gözle teyit)

- [ ] **5. Triyaj & kayıt**
  - Bulguları TK7 kapısıyla triyaj et: kapsam-içi gerçek bug → düzeltme task'ı; kapsam-dışı/ertelenmiş (`/forum`→404, `/bunker-os`→`/crew-os`) → sahipli kayıt
  - Sonuç özetini task Oturum Kaydı + PHASE-9 Task Listesi notuna yaz

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

- [ ] `next build` temiz geçti; :3000'i dinleyen PID fresh process olarak teyit edildi
- [ ] 6 sayfa × 5 locale = 30 kombinasyon **200** (TR cookie ile prefixsiz, diğerleri prefixli)
- [ ] `/forum`→`/bulten` ve `/forum/<slug>`→`/bulten/<slug>` **308**; çıplak `/bulten`→404 bulgusu kaydedildi (record-not-fix)
- [ ] Bilinmeyen-locale davranışı gözlemlendi ve kaydedildi (peşinen iddia yok)
- [ ] Bulgular triyaj edildi; PHASE-9 + task doc'a yazıldı
