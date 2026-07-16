# RELEASE — v0.4 Production Release (TR) — Runbook & Kayıt

> **Durum: ✅ Yayınlandı (TR) — 2026-07-16.** Canlı sürüm = `f173234` (`revize/alpfit-plus` → `main` temiz fast-forward, 16 commit). v0.4 Alpfit Plus ürün vitrini canlıda; **TR tam**, non-TR (en/ar/de/es) yapısal olarak var ama değer birebir Türkçe (stale — bilinçli, versiyon-sınırı). Canlı duman testi ✓ (§3). **Açık takip:** chatbot `ANTHROPIC_API_KEY` Vercel prod env'de yok → `/api/chat` 503/offline (release engeli değil, key eklenince açılır).

**Tür:** Hafif operasyonel aksiyon (faz döngüsü değil — kullanıcı kararı 2026-07-16: "en azından Türkçede canlıya al"). App Store lansmanı yaklaşırken siteyi bekletmeme kararı. v0.2 release emsali (`RELEASE-v0.2.md`).
**Amaç:** v0.4 Alpfit Plus içerik fazını (Faz 15, `revize/alpfit-plus`) `main`'e (= canlı) alıp Vercel production deploy'unu tetiklemek; TR sürümü canlıya çıkarmak. non-TR çeviri sonraki faza / prd-review'a bilinçle ertelendi.

> **⚠️ Bu adım canlıya dokundu.** `main` = production (her push → Vercel deploy). "Canlıya dokunma" kuralının bilinçli istisnası — kullanıcı (Kivanç) açık onayıyla ("canlıya al") yürütüldü.

---

## 0. Akış notu — neden şimdi (senaryo testi / prd-review'dan önce)

Normal versiyon-sonu sırası: teknik borç → senaryo testi → prd-review → release. Bu release **öne çekildi** (App Store lansman aciliyeti). Senaryo testi (Faz 17) + prd-review **canlı v0.4 üstünde arkadan** gelecek — test-what's-live. v0.2 emsali: release versiyon-sonu penceresinde (Faz 8/9 ile eşzamanlı) yapılmıştı. Faz 15 zaten tam doğrulanmıştı (UAT 16/16, a11y=100 çift-tema, axe 52/52, build temiz, CI yeşil) → kalite riski düşük.

## 1. Ön-koşul kontrolü (merge öncesi) — ✓

- [x] Çalışma ağacı temiz (`git status -s` boş).
- [x] `git fetch origin` sonrası branch main'in **16 önünde, 0 geride** → temiz fast-forward (çakışma yok).
- [x] Son *kod* commit'i `7e577d1` (TASK-15.07) CI'da yeşil doğrulandı (`fast` build+Vitest ✅ + `a11y` axe ✅); sonrası yalnız `_dev/` doküman commit'leri (kod değişmedi → canlıya giden = CI-yeşil kod).
- [x] Release kapısı `next build` → **exit 0**, `MISSING_MESSAGE` yok, 5 locale SSG (`/spor-salonu-yazilimi` 9.02 kB × 5 dil).

## 2. Merge & deploy — ✓

- [x] `main` → `git merge --ff-only revize/alpfit-plus` (temiz fast-forward `965ee6d..f173234`, 38 dosya: 8 `components/alpfit/*` + 5-dil `messages/*.json` + `spor-salonu-yazilimi/page.tsx` + `globals.css` + `_dev/` + `GymSoftwareShowcase.tsx` silindi).
- [x] `git push origin main` → `965ee6d..f173234`. **Vercel production deploy otomatik tetiklendi** (v0.2'deki Git-disconnect tuzağı bu sefer YOK — deploy sorunsuz aktı).

## 3. Canlı duman testi (`kiwiailab.com`) — ✓ (curl)

- [x] `/spor-salonu-yazilimi` 5 dil (tr/en/ar/de/es): hepsi **200** + v0.4 marker ("Weekend Training Club") · TR sayfa 48→88 KB (zengin sürüm) · `age:0` taze deploy.
- [x] TR `<title>` = "Alpfit Plus — Kulüp İşletme Yazılımı — Kiwi AI Lab" (AP3 SEO).
- [x] AR RTL: `<html lang="ar" dir="rtl">` ✓.
- [x] Diğer sayfalar kırılmadı: `/` · `/crew-os` · `/vaka-calismalari` · `/en` · `/ar` → 200. `/forum`→308→`/` (pre-existing, doğru).
- [x] Dürüstlük 4/4 canlıda: ₺1.500 fiyat + "Weekend Training Club" pilot + "18 rakip" + yol haritası "yakında" — hepsi görünür.
- [ ] **Görsel-only (kullanıcı gözüne):** tema flip (light/dark), tam Living Flow WebGL render, telefon mockup craft'ı — curl kapsamaz; canlıda gözle onaylandı (kullanıcı).

## 4. Açık takip (release engeli değil)

- **Chatbot offline:** `/api/chat` → **503**. Canlıda `ANTHROPIC_API_KEY` Vercel Production env'de yok. **Aksiyon (Kivanç):** Vercel → Settings → Environment Variables → `ANTHROPIC_API_KEY` ekle → redeploy → `/api/chat` 503→200 doğrula. (v0.2'den beri devralınan — zarif düşüş, engel değil.)
- **non-TR stale-TR:** en/ar/de/es `alpfit` içeriği birebir Türkçe (yapısal anahtar tam, değer çevrilmedi). Bilinçli (TR tek kaynak, versiyon-sınırı — DECISIONS 2026-06-27). **Sonraki iş:** çeviri geçişi (sonraki faz / prd-review). Eski gym sayfası non-TR'de İngilizce gösteriyordu → şimdi Türkçe (geçici kabul).
- **`/bulten` (çıplak) → 404:** Pre-existing (v0.4 dokunmadı — diff'te bulten/forum/redirect/config yok). Çıplak index sayfası yok; makaleler (`/bulten/ai-sdr-araclari`) 200. Latent gap, gelecek SEO/içerik işi.
- **App Store / roadmap tazeliği (kullanıcı notu):** Uygulama App Store'da yayınlanıyor — sayfada indirme linki/rozeti yok, pilot chip + yol haritası kalemleri gözden geçirilebilir. "Fena durtmuyor, gerekirse sonra düzeltiriz" (kullanıcı 2026-07-16) → sonraki içerik işi.

## 5. Rollback planı

- **Hızlı:** Vercel dashboard → önceki (v0.3, `main` merge öncesi) production deployment → "Promote to Production" (anında geri alır).
- **Git:** `main`'de `git revert -m 1 <merge-sha>` veya `git reset --hard 965ee6d` + force-push (dikkat) → eski koda döner.
- Tek sayfa/tek dil kusuru → rollback yerine `revize/...`'de düzelt, yeni deploy.

## 6. Kabul kriterleri

- [x] `main` = v0.4 kodu (`f173234`); canlı domainde v0.4 marker + meta title doğrulandı.
- [x] Canlı duman testi (§3) curl maddeleri ✓; görsel-only maddeler kullanıcı gözüyle ✓.
- [x] Guardrail (Faz 15'te mühürlü): a11y=100 çift-tema · CLS=0 · i18n 5-dil parite · marka sesi · reduced-motion — canlıya giden kod CI-yeşil `7e577d1`.
- [ ] Chatbot env key → **açık** (kullanıcı aksiyonu bekliyor).

---

**Oluşturulma:** 2026-07-16 (kullanıcı talebi "canlıya al" → hafif operasyonel aksiyon; release post-hoc kaydedildi).
