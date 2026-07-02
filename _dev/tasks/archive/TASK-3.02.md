# TASK-3.02: S1 — Giriş Noktaları & Yönlendirme Matrisi

**Durum:** ✅ Tamamlandı
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

- [x] **1. 5 locale 200**
  - `curl -I` ile: TR (`/`, **prefixsiz**), `/en`, `/ar`, `/de`, `/es` → hepsi **200**. ✅
  - Render HTML `<html>` etiketi: `lang` her dilde doğru; AR `dir="rtl"`, diğerleri `dir="ltr"`. ✅

- [x] **2. Kalıcı redirect**
  - `/forum` → `/bulten` **308 Permanent Redirect** (method-koruyan — 301 DEĞİL), `location: /bulten`. ✅
  - `/forum/:slug` → `/bulten/:slug` **308** (`/forum/ai-sdr-araclari` → `/bulten/ai-sdr-araclari`; ek slug da aynı). Uçtan-uca `-L` takip: **200 gerçek makale**. ✅
  - **BULGU:** çıplak `/forum` redirect'i `/bulten`'e iniyor ama `/bulten` **index sayfası yok** (tasarımca — bülten statik, sadece 2 makale) → çıplak `/forum` zinciri **404**'e düşüyor. Triyaj: alt görev 5 (kapsam-dışı/sahipli).

- [x] **3. Derin-link SSG bütünlüğü**
  - `/en#sectors` SSG markup'ında `id="sectors"` **mevcut** (SectorSolutions). ✅
  - Bonus: 5 anchor hedefi (`#how #sectors #bunker #forum #chat`) **5 locale'in tamamında** render markup'ında var. ✅

- [x] **4. Bilinmeyen-locale davranışı (gözlem)**
  - **Gözlem:** `/xx` `/zz` `/fr` `/en-US` → **404**, TR (varsayılan) locale'iyle render edilen not-found sayfası (`<html lang="tr">`). Sessiz ana-sayfa fallback'i **değil**; bilinmeyen segment TR-default altında eşleşmeyen path olarak 404 veriyor.
  - Yan gözlemler (URL normalizasyonu, sağlıklı): `/EN`→307→`/en` (case), `/tr`→307→`/` (`as-needed` default sıyırma), `/en/` vb. trailing-slash →308→ prefixsiz, `/xx/`→308→`/xx`.

- [x] **5. Triyaj (TK6)**
  - **Çıplak `/forum`→`/bulten`→404:** kapsam-içi gerçek bug **DEĞİL** → **sahipli/ertelenmiş** (SEO-bitişik, alt sayfa). Gerekçe: (a) `/bulten` index tasarımca yok (statik bülten, OVERVIEW); (b) 404 ana sayfa yolculuğundan **erişilemez** — ana sayfa Forum bölümü `#forum` anchor + 2 makaleye doğrudan link (hepsi 200), çıplak `/forum`/`/bulten`'e link **yok**; (c) redirect'in asıl amacı (eski makale linklerini yaşatmak) `/forum/:slug`→200 ile çalışıyor. `/bunker-os`→`/crew-os` ertelemesiyle aynı kovaya (görsel/SEO versiyonu).
  - Kapsam-içi ana sayfa giriş matrisinde gerçek bug **bulunmadı** — 5 locale, anchor hedefleri, slug redirect, locale normalizasyonu sağlam.

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

- [x] 5 locale (`/`, `/en`, `/ar`, `/de`, `/es`) → 200 + doğru `<html lang>` (AR `dir=rtl`). ✅
- [x] `/forum` → 308 `/bulten`; `/forum/:slug` → 308 `/bulten/:slug`. ✅ (status+Location doğru; çıplak hedef 404 bulgusu triyaj edildi)
- [x] `/en#sectors` SSG markup'ında `#sectors` id mevcut. ✅
- [x] Bilinmeyen-locale davranışı gözlendi + kaydedildi (yargı değil, gözlem): 404 + TR not-found (`lang=tr`). ✅

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-29

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- Kanonik ortam ayağa kaldırıldı (TASK-3.01 serve prosedürü): host load 0.44 (düşük), port 3000 boş, `.next` BUILD_ID `3XVc2JiI9bd7YwfUGuwYx` (kod değişmedi → rebuild yok), fresh prod serve port 3000 (`✓ Ready 325ms`). Listening-PID 3141863 fresh-teyitli (bugün 00:24, sahip kivanc) + ground-truth (served `<title>` == disk `tr.html`). Stray PID 12708 (uid 1001, **portsuz**) zararsız bırakıldı.
- **AG1 — 5 locale 200:** `/` `/en` `/ar` `/de` `/es` → hepsi 200; `<html lang>` her dilde doğru; AR `dir="rtl"`, diğerleri `ltr`.
- **AG2 — redirect:** `/forum`→**308**→`/bulten` (`Location` doğru, 301 değil); `/forum/:slug`→308→`/bulten/:slug`; `-L` takip ile makale **200**. Çıplak `/forum` zinciri 404'e iniyor (bkz. Sorunlar/Bulgu).
- **AG3 — derin-link SSG:** `/en#sectors` markup'ında `id="sectors"` mevcut; 5 anchor hedefi (`#how #sectors #bunker #forum #chat`) 5 locale'de tam.
- **AG4 — bilinmeyen-locale (gözlem):** `/xx /zz /fr /en-US` → 404 + TR not-found (`lang=tr`), sessiz fallback değil. Normalizasyon yan-gözlemleri sağlıklı (`/EN`→307→`/en`, `/tr`→307→`/`, trailing-slash→308→prefixsiz).
- **AG5 — triyaj:** kapsam-içi ana sayfa giriş matrisinde gerçek bug yok; çıplak `/forum`→404 bulgusu sahipli/ertelenmiş işaretlendi.

**Sorunlar:**
- **Bulgu — çıplak `/forum`→`/bulten`→404:** `/bulten` index sayfası **tasarımca yok** (statik bülten, sadece 2 makale: `ai-sdr-araclari`, `claude-opus-4-8-fable-5`). Redirect status/Location doğru ama çıplak hedef boşluğa iniyor. **Triyaj: kapsam-dışı/sahipli** — (a) index yokluğu tasarım (OVERVIEW); (b) 404 ana sayfa yolculuğundan erişilemez (Forum bölümü `#forum` anchor + 2 makaleye doğrudan link, çıplak `/forum`/`/bulten` linki yok); (c) redirect'in asıl işlevi (`/forum/:slug`→makale 200) çalışıyor. `/bunker-os`→`/crew-os` ertelemesiyle aynı görsel/SEO versiyonu kovası. Burada düzeltilmez (TK6).

**Kararlar:**
- Bulgu kaynak-kod düzeltmesi gerektirmiyor (doğrulama task'i kapsamında kalır); sahipli kayıt → verify-phase UAT'ına + görsel/SEO versiyon değerlendirmesine taşınır.
- docs/DECISIONS.md'ye eklendi: Hayır (yeni mimari karar değil; mevcut "bülten statik içerik" + "SEO redirect ertelemesi" kararlarının gözlemsel teyidi).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- Kaynak kod değişikliği yok (S1 doğrulama task'i). Disk: `.next/` yeniden kullanıldı (rebuild yok). Serve prosesi oturum sonunda öldürüldü, port 3000 temiz.
- `_dev/tasks/TASK-3.02.md` → alt görevler/test/tamamlanma ✅, bulgu + triyaj, oturum kaydı.
- `_dev/DURUM.md`, `_dev/phases/PHASE-3.md` → durum güncellemeleri.

**Test Sonuçları:**
- 5 locale (`/ /en /ar /de /es`): 200 + doğru lang/dir (AR rtl). ✅
- `/forum`→308→`/bulten` (Location doğru); `/forum/:slug`→308→makale 200. ✅ (çıplak hedef 404 = sahipli bulgu)
- `/en#sectors` SSG `id="sectors"` mevcut; 5 anchor × 5 locale tam. ✅
- Bilinmeyen-locale: 404 + TR not-found gözlendi/kaydedildi. ✅

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-29

**Ne Yapıldı:**
- S1 giriş/yönlendirme matrisi HTTP seviyesinde uçtan-uca koşuldu (curl+grep): 5 locale 200 + lang/dir, 308 redirect (slug→makale 200), `/en#sectors` SSG bütünlüğü (5 anchor × 5 locale), bilinmeyen-locale 404+TR-not-found gözlemi, locale normalizasyon varyantları.
- Kapsam-içi ana sayfa giriş matrisinde gerçek bug yok. Bir SEO-bitişik bulgu (çıplak `/forum`→404) triyaj edilip sahipli kaydedildi (görsel/SEO versiyonu).

**Öğrenilenler:**
- Bülten = index'siz statik içerik; çıplak `/forum`/`/bulten` boşluğu kullanıcı yolculuğundan erişilemez ama eski `/forum` index inbound linki için ölü redirect — görsel/SEO versiyonunda ele alınacak aday.

---

**Oluşturulma:** 2026-06-29
