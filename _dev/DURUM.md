# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **verify-plan 15 tamamlandı → Adım = task.** 7 task (15.01–15.07) temiz context'te doğrulandı: milestone (9 bölüm+5-dil+dürüstlük 4/4+guardrail+SEO tam eşlendi) · gereksinim · kalite · task-tutarlılık (ayrık `alpfit.*` alt-ağaçları, lineer bağımlılık, `#fiyat` anchor eşleşiyor) ✓; referans gerçeklik-kontrolü ✓ (kod yolları/token'lar/artifact satır refleri doğru). **1 mekanik düzeltme:** TASK-15.02 `border-line-soft`→`border-line` (var-olmayan token; artifact `.divide` `--line` kullanır, tek yeni token `--color-surface`). **0 yapısal değişiklik.** İlk task aktif: **`run-task 15.01`**. Kaynak kod değişmedi (yalnız `_dev/`). Branch `revize/alpfit-plus`. **Versiyon Sonu Durumu `içerik_fazları`.** **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503; chatbot "offline" — regresyon değil). **Sıradaki: `/devflow:run-task 15.01`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **15 — v0.4 Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım)** (🔄 girildi — discuss-phase 15, tek faz). Fazlar 1–14 ✅ (v0.1+v0.2+v0.3 tamam, canlı).
**Adım:** task — plan review tamamlandı (verify-plan 15 ✅; 7 task doğrulandı, 1 mekanik düzeltme, 0 yapısal). **Sıradaki: `/devflow:run-task 15.01`** (ilk task — yeni oturum). **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** verify-plan 15 (2026-07-16) ✅ — 7 task temiz context'te doğrulandı; referans gerçeklik-kontrolü + milestone/gereksinim/kalite/tutarlılık ✓. Mekanik düzeltme: 1 (TASK-15.02 token), yapısal: 0. plan-phase 15 (2026-07-16) ✅ — 7 task dokümanı (`tasks/TASK-15.01..07.md`): foundation+hero · sorun+roller · telefon mockup'ları [CSS Module] · 9 özellik · neden [ink-panel aside] · fiyat bandı+roadmap+kapanış · SEO+temizlik+guardrail. Sayfa 15.01'de erken wire → bölümler `next build` ile doğrulanır. research-phase 15 (2026-07-16) ✅ — Araştırma Bulguları (5 alan + 2 kullanıcı kararı). discuss-phase 15 (2026-07-16) ✅ — Kapsam Tartışması (10 karar).
**Son Faz Dokümanı:** `phases/PHASE-15.md` (🔄 aktif). Önceki: `phases/PHASE-14.md` (✅ v0.3 son fazı).

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** içerik_fazları (re-kickoff 2026-07-16 sıfırladı)

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-15.01 (aktif — henüz başlamadı).** Foundation: `--color-surface` token + `alpfit` ns kökü + `AlpfitShowcase` kabuk + Hero + sayfa rewire. Plan doğrulandı → başlatmaya hazır. Sıradaki: `/devflow:run-task 15.01`.
**Durum:** Faz 15 🔄 (plan-phase 15 ✅, verify-plan 15 ✅); Adım = task; Aktif Versiyon v0.4, Versiyon Sonu Durumu `içerik_fazları`. Fazlar 1–14 ✅ (canlı v0.3).
**İlerleme:** verify-plan 15 (2026-07-16) ✅ — 7 task doğrulandı (mekanik: 1 [TASK-15.02 token], yapısal: 0). plan-phase 15 (2026-07-16) ✅ — 7 task dokümanı oluşturuldu. Kaynak kod değişmedi (yalnız `_dev/`).

---

## Task Durumu (Aktif Faz)

> **Faz 15 🔄** (plan-phase 15 ✅, verify-plan 15 ✅ — 7 task hazır/doğrulandı, hiçbiri çalışmadı; ilk task 15.01 aktif). Tam tablo + açıklamalar `phases/PHASE-15.md` Task Listesi. Fazlar 1–14 ✅; son faz (14, v0.3 versiyon-sonu senaryo testi — UAT 11/11, 0 kapsam-içi bug) detayı `phases/PHASE-14.md` + `tasks/archive/`.

| # | Task | Durum |
|---|------|-------|
| 15.01 | Foundation: token + `alpfit` ns kökü + kabuk + Hero + sayfa rewire | ⬜ Bekliyor |
| 15.02 | Sorun + 4 Rol | ⬜ Bekliyor |
| 15.03 | Telefon mockup'ları (CSS Module, en yüksek craft) | ⬜ Bekliyor |
| 15.04 | 9 Özellik grid | ⬜ Bekliyor |
| 15.05 | Neden Alpfit Plus (why + koyu aside ink-panel) | ⬜ Bekliyor |
| 15.06 | Fiyat bandı (ink-panel) + Yol haritası (+Store) + Kapanış | ⬜ Bekliyor |
| 15.07 | SEO/metadata + Gym temizliği + guardrail doğrulama | ⬜ Bekliyor |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`).

**TASK-14.09 — S9 Adversarial / Holistik Kırma (fazın son task'ı)** ✅ (2026-07-05)
- **12/12 runtime + 6/6 JS-off + build temiz, kapsam-içi bug YOK.** `next build` 37/37 SSG 0 warn + 30 page-locale 0 MISSING_MESSAGE + Vitest 39/39 (canonical/redirect tohumu yeşil); JS-off 6 TR sayfa okunur (h1=1+nav+main+metin 1278–4016, canvas=0 beklenen client-only); tema **11-tık race** final-tutarlı (html.dark=true==localStorage(`theme`=dark)==aria-pressed=true) + reload kalıcı; dil zinciri en→de→ar→es→tr 5/5 tutarlı (lang==url, AR dir=rtl); scroll/anchor storm → 6 bölüm sağlam + **nabız canvas 1→1 tek shared WebGL context** + anchor #contact settle + scroll-lock yok + **0 ScrollTrigger/GSAP/Lenis hatası**.
- **Ortam engeli & çözümü:** `next start`/`next dev` 3 başlatma yöntemiyle de exit 144 + backgrounded-server+Chrome kombinasyonu da signal-16 (144) → **tek-process Playwright `page.route` interception** (diskten `.next` prerender+static byte-for-byte servis) → system Chrome (`channel:'chrome'`+swiftshader) WebGL2 kararlı (FlowBackdrop canvas=1, false-static değil). Build-ground-truth'a mecburi düşüş YOK. Harness artefaktı (bug değil): `/script.js` (Umami dış) + `/icon.svg` (app-router route) 404.
- **Kaynak değişmedi** (harness `tests/_verify-s9-*` silindi → git temiz). **Bütünsel S1–S9 kapsam-içi bug sıfır → verify-phase 14'e hazır.** S9'da yeni sahipli kalem çıkmadı (mevcutlar prd-review B grubunda).

**TASK-14.08 — S7 Chatbot 0-token (offline + sanitizasyon + malformed)** ✅ (2026-07-05)
- **13/13 PASS (11 route node + 2 UI jsdom), kapsam-içi bug YOK, toplam gerçek Anthropic API çağrısı = 0** (gerçek key hiç kullanılmadı + `@anthropic-ai/sdk` mock). **`next start`/`test:e2e` bu oturumda exit 144** (cloud-devcontainer sandbox worker-fork) → PHASE-14 **build-ground-truth fallback**: Vitest (ortam-bağımsız).
- **Sanitizasyon sırası (kod-inceleme):** route.ts:21-24 apiKey-gate→503 · :26-32 parse→400 · :35-42 rol whitelist+trim+`slice(-12)` · :44-46 sonda-user→400 · :48 `new Anthropic()` — **hepsi Anthropic kurulumu ÖNCESİNDE ✓**. Route (SDK mock): key-yok→503 (mock hiç kurulmadı); malformed 6× 400 (Anthropic öncesi red); geçerli→200 mock çağrıldı (gerçek asla), 15→slice(-12). Offline UI (`#chat` inline, 503): dürüst çevrimdışı metni + **sahte online-dot/presence YOK** + UI takılmaz + 200-stream hiç.
- **Kaynak değişmedi** (harness `tests/_verify-s7-*` silindi). Sahipli: per-mesaj max-byte uzunluk cap'i yok (min-length + geçmiş-sayısı var) → güvenlik-hardening → prd-review.


<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-15.01** (aktif — henüz başlamadı; plan doğrulandı). Sıradaki: `/devflow:run-task 15.01`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır).
**Aktif Faz:** **15 — v0.4 Alpfit Plus ürün vitrini** (🔄; plan-phase 15 ✅, verify-plan 15 ✅; tek faz, 7 task). Adım = task; sıradaki `/devflow:run-task 15.01`. **Aktif Versiyon v0.4 — Alpfit Plus ürün vitrini**, Versiyon Sonu Durumu: **içerik_fazları**. Fazlar 1–14 ✅ (v0.1+v0.2+v0.3, canlı). Faz dokümanı: `phases/PHASE-15.md`. Feature: `PRD/features/alpfit-plus.md`; tasarım referansı `docs/alpfit-plus-artifact.html`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — **verify-plan 15 ✅ → Adım = task.** 7 task dokümanı (15.01–15.07) temiz context'te doğrulandı; referans gerçeklik-kontrolü (kod yolları/token'lar/artifact satır refleri) + milestone/gereksinim/kalite/tutarlılık ✓. **1 mekanik düzeltme** (TASK-15.02 `border-line-soft`→`border-line`, var-olmayan token), **0 yapısal değişiklik**. İlk task 15.01 aktif. Kaynak kod değişmedi (yalnız `_dev/`). Branch `revize/alpfit-plus`. **Sıradaki: `/devflow:run-task 15.01`.**
