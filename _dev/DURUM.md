# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **re-kickoff tamamlandı → v0.4 (Alpfit Plus ürün vitrini)** (kickoff ✅ + kickoff-docs ✅ + **kickoff-verify ✅**). kickoff-verify: v0.4 dokümanları tutarlı; CLAUDE.md + ILKELER iki bayat nottan hizalandı (taksonomi `/bunker-os`→`/crew-os` v0.3'te tamamdı; test altyapısı Faz 5'te kuruldu); native memory yönlendirmesi doğrulandı. Alpfit (F2.8) sayfasının artifact vizyonuna göre zengin ürün landing page'ine yeniden tasarımı (M2 merkez). Dürüstlük 4/4 gerçek. Branch `revize/alpfit-plus`. **Versiyon Sonu Durumu `içerik_fazları`.** **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503; chatbot "offline" — regresyon değil). **Sıradaki: `/devflow:discuss-phase 15`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **15 — Alpfit Plus sayfası zenginleştirme** (geçici ad; **henüz faza girilmedi** — `discuss-phase 15` faz dokümanını oluşturup Faz Durumu tablosuna 🔄 ekler ve adı/kapsamı kesinleştirir). Fazlar 1–14 ✅ (v0.1+v0.2+v0.3 tamam, canlı).
**Adım:** discuss — re-kickoff tamamlandı (kickoff ✅ + kickoff-docs ✅ + kickoff-verify ✅). **Sıradaki: `/devflow:discuss-phase 15`** (Alpfit Plus sayfası zenginleştirme; faz bölünmesi orada damgalanır). **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** kickoff-verify (2026-07-16) ✅ — dokümanlar kontrol edildi (v0.4 dokümanları tutarlı: VERSIONS/MODULE-MAP/PHASES/M2/alpfit-plus/INDEX); CLAUDE.md + ILKELER iki bayat nottan hizalandı (taksonomi route `/crew-os` v0.3'te tamamdı; test altyapısı Faz 5'te kuruldu); native memory yönlendirmesi doğrulandı (template ile birebir). Kaynak kod değişmedi (yalnız `_dev/` + CLAUDE.md).
**Son Faz Dokümanı:** `phases/PHASE-14.md` (✅ v0.3 son fazı). Yeni faz dokümanı (`PHASE-15.md`) discuss-phase 15'te oluşur.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** içerik_fazları (re-kickoff 2026-07-16 sıfırladı)

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **YOK — re-kickoff tamamlandı (faz döngüsü dışı).** v0.4 tanımlandı; task'lar discuss-phase 15 → plan-phase 15'te doğar. Sıradaki: `/devflow:discuss-phase 15`.
**Durum:** re-kickoff v0.4 (Alpfit Plus): kickoff ✅ + kickoff-docs ✅ + kickoff-verify ✅ (dokümanlar kontrol edildi, CLAUDE.md hizalandı); Versiyon Sonu Durumu = `içerik_fazları`; Aktif Versiyon v0.4. Fazlar 1–14 ✅ (canlı v0.3).
**İlerleme:** kickoff-verify (2026-07-16) ✅ — doküman tutarlılık kontrolü + CLAUDE.md/ILKELER bayat-not hizalaması + native memory doğrulaması. Kaynak kod değişmedi (yalnız `_dev/` + CLAUDE.md).

---

## Task Durumu (Aktif Faz)

> **Faz 15 henüz faza girilmedi** (re-kickoff ✅ → `discuss-phase 15` girer). Task tablosu discuss-phase 15 → plan-phase 15'te (Alpfit Plus sayfası zenginleştirme) doğar. Fazlar 1–14 ✅; son faz (14, v0.3 versiyon-sonu senaryo testi — UAT 11/11, 0 kapsam-içi bug) detayı `phases/PHASE-14.md` + `tasks/archive/`.

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

**Aktif Task:** **YOK — re-kickoff tamamlandı.** Task'lar discuss-phase 15 → plan-phase 15'te (Alpfit Plus) doğar. Sıradaki: `/devflow:discuss-phase 15`. **⚠️ Devralınan açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır).
**Aktif Faz:** **15 — Alpfit Plus sayfası zenginleştirme** (henüz faza girilmedi; `discuss-phase 15` damgalar). re-kickoff ✅ (kickoff + kickoff-docs + kickoff-verify); sıradaki `/devflow:discuss-phase 15`. **Aktif Versiyon v0.4 — Alpfit Plus ürün vitrini**, Versiyon Sonu Durumu: **içerik_fazları**. Fazlar 1–14 ✅ (v0.1+v0.2+v0.3, canlı). Feature: `PRD/features/alpfit-plus.md`; tasarım referansı `docs/alpfit-plus-artifact.html`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — re-kickoff **tamamlandı** → **v0.4 Alpfit Plus ürün vitrini** (kickoff ✅ + kickoff-docs ✅ + kickoff-verify ✅). kickoff-verify: doküman tutarlılık kontrolü (v0.4 dokümanları tutarlı) + CLAUDE.md/ILKELER iki bayat nottan hizalandı (taksonomi `/bunker-os`→`/crew-os` v0.3'te tamamdı; test altyapısı Faz 5'te kuruldu) + native memory yönlendirmesi doğrulandı. Aktif Faz 15 (Alpfit Plus, discuss). Versiyon Sonu Durumu `içerik_fazları`. Branch `revize/alpfit-plus`. **Sıradaki: `/devflow:discuss-phase 15`.**
