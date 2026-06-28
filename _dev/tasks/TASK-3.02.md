# TASK-3.02: S1 — Giriş Noktaları & Yönlendirme Matrisi

**Durum:** ⬜ Bekliyor
**Modül:** M4 — i18n & Yerelleştirme (modules/M4-i18n.md) (+ M6 redirect)
**Feature:** S1 — Giriş noktaları & yönlendirme matrisi (validation unit)
**Faz:** Phase 3 (phases/PHASE-3.md)
**Bağımlılıklar:** TASK-3.01 ✅ (kanonik prod serve gerekir)

---

## Hedef

5 dil ana sayfanın giriş noktalarını ve yönlendirme davranışını **HTTP seviyesinde** doğrula: 5 locale 200, `/forum`→`/bulten` **308** (+slug varyantı), `/en#sectors` derin-link SSG bütünlüğü, bilinmeyen-locale davranışını **gözlemle** (peşinen iddia etme), URL varyantları. Araç: curl (`-I` / `-sS`) + grep. Tüm giriş matrisi koşulup sonuçları kaydedildiğinde tamamlanmış sayılır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/modules/M4-i18n.md` — F4.1 routing/middleware (`as-needed` prefix, bilinmeyen-locale fallback edge)
- `_dev/modules/M6-SEO-Deploy.md` — F6.3 redirect (`/forum`→`/bulten`)
- `_dev/phases/PHASE-3.md` — Araştırma → senaryo→araç tablosu (S1) + Dikkat (redirect 308, anchor hedefleri)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu + özet
- `_dev/phases/PHASE-3.md` — Task Listesi tablosunda 3.02 durumu

---

## Alt Görevler

- [ ] **1. 5 locale 200**
  - `curl -I` ile: TR (`/`, **prefixsiz**), `/en`, `/ar`, `/de`, `/es` → hepsi 200.
  - Render HTML'de doğru `<html lang>` (ve AR'de `dir="rtl"`).

- [ ] **2. Kalıcı redirect**
  - `/forum` → `/bulten` **308** (permanent, method-koruyan — 301 DEĞİL). `curl -I` ile status + `Location`.
  - `/forum/:slug` → `/bulten/:slug` (örn. `/forum/ai-sdr-araclari` → `/bulten/ai-sdr-araclari`).

- [ ] **3. Derin-link SSG bütünlüğü**
  - `/en#sectors` çek; anchor fragment server'a gitmez ama sayfa SSG markup'ında `#sectors` id hedefi mevcut olmalı (SectorSolutions).

- [ ] **4. Bilinmeyen-locale davranışı (gözlem)**
  - `/xx` (veya `/zz`) iste; davranışı **gözlemle ve kaydet** — 404 mı, TR-fallback mı, middleware nasıl ele alıyor. **Peşinen iddia etme** (research notu).

- [ ] **5. Triyaj (TK6)**
  - Bulgu varsa: kapsam-içi (ana sayfa) gerçek bug → fix-task önerisi; kapsam-dışı/ertelenmiş → sahipli kayıt.

---

## Etkilenen Dosyalar

```
(Doğrulama task'i — kaynak kod değişikliği yok.)
```

Bulgular bu task dokümanına kaydedilir; özet verify-phase'de PHASE-3 UAT'ına taşınır. İstisna: kapsam-içi bug bulunursa → ayrı fix-task (TASK-3.NN), kaynak dosyalar orada değişir.

---

## Dikkat Noktaları

- **Redirect 308, 301 değil** — `next.config.ts:13-18` `permanent: true` → Next.js 308 (method-koruyan). curl beklentisi 308 **(repo).**
- **Anchor hedefleri mevcut:** `#how #sectors #bunker #forum #chat` **(repo:** SectorSolutions.tsx:46, HowItWorks.tsx:45, Bunker.tsx:19, Forum.tsx:12, Chatbot.tsx:71**).** S1 derin-link bunlara dayanır.
- **Bilinmeyen-locale = gözlem, iddia değil.** `as-needed` prefix + middleware fallback (M4 F4.1 edge) — 404 mı fallback mı peşinen yazma, koşup kaydet.
- **Ortam:** TASK-3.01 prod serve'i kullan; serve eden PID'nin fresh olduğunu teyit (memory).

---

## Test Kriterleri

- [ ] 5 locale (`/`, `/en`, `/ar`, `/de`, `/es`) → 200 + doğru `<html lang>` (AR `dir=rtl`).
- [ ] `/forum` → 308 `/bulten`; `/forum/:slug` → 308 `/bulten/:slug`.
- [ ] `/en#sectors` SSG markup'ında `#sectors` id mevcut.
- [ ] Bilinmeyen-locale davranışı gözlendi + kaydedildi (yargı değil, gözlem).

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

**Durum:** ⬜ Bekliyor

---

**Oluşturulma:** 2026-06-29
