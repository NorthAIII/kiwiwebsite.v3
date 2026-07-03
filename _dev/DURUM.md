# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **verify-plan 14 ✅: plan review tamamlandı** (9 task fresh-context doğrulandı; mekanik 0 / yapısal 0). Referans gerçeklik-kontrolü temiz: 6 route + redirect'ler ([next.config.ts](next.config.ts)) + metadata helper'ları (`localePath`:17/`localizedAlternates`:30) + 5 tohum/2 e2e + CI fast/a11y + living-flow/`useFlowMode`/`--flow-veil` + crew namespace — hepsi gerçekle birebir. Milestone S1–S9 tam eşleşme (S6/S8 komplementer bölünmüş). Sıradaki adım **`run-task`** → TASK-14.01.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (girildi; discuss-phase 14 damgaladı) 🔄. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** task (verify-plan 14 tamamlandı — plan review temiz, 9 task fresh-context doğrulandı; sıradaki = ilk task'ı çalıştır). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** research-phase 14 (2026-07-03) ✅ — senaryo testi araç eşlemesi: S1–S9 → katmanlı hibrit (A build-ground-truth [curl/routes-manifest/prerender/Vitest-39] + B bundled-chromium axe a11y + C system-Chrome WebGL). **S3 ortam riski çözüldü (ampirik):** `next start` bu oturumda kararlı (Faz 13 `exit 144` görülmedi); WebGL yalnız system Chrome'da (bundled 0 canvas → `playwright-bundled-chromium-webgl-yok` birebir); `/dev/shm`=64M → `--disable-dev-shm-usage` zorunlu; Lighthouse 12.8.2 (memory 13.3.0'dan sürüm deltası — LCP-element anahtarı plan'da teyit). Vitest 39/39 + HTTP/redirect canlı doğru. **Kayıtlı sahipli açıklar (gelecek/prd-review):** TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-14.md` (🔄 Devam ediyor — Kapsam Tartışması + Araştırma Bulguları yazıldı; plan bekliyor). Faz 13 ✅ `phases/PHASE-13.md` (UAT 16/16). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-14.01** (S1 giriş/redirect matrisi) — aktif, ⬜ bekliyor (plan review ✅, çalıştırılmaya hazır). Sıradaki adım **`run-task`** (yeni oturum).
**Durum:** Faz 14 🔄 (Kapsam + Araştırma + Task Listesi + plan review yazıldı); Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Adım = task.
**İlerleme:** verify-plan 14 (2026-07-03) ✅ — 9 task fresh-context doğrulandı, mekanik 0/yapısal 0, referans gerçeklik-kontrolü temiz. Sıradaki = `run-task` → TASK-14.01.

---

## Task Durumu (Aktif Faz)

> **Faz 14 plan review ✅ (verify-plan)** — senaryo testi fazı; 9 task (S1–S9 → 14.01–14.09). Detay tablo + araç eşlemesi `phases/PHASE-14.md`. TASK-14.01 aktif, henüz çalıştırılmadı (sıradaki `run-task`). Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 14.01 | TASK-14.01 | 🔄 Aktif (bekliyor) | S1 giriş/redirect matrisi (curl; `/crew-os` public, `/bunker-os`→308, `/forum`→`/`) + kanonik prod-serve |
| 14.02 | TASK-14.02 | ⬜ Bekliyor | S5+S6-render prerender grep ("Crew OS"/"Bunker"-yok, 0 MISSING_MESSAGE, namespace crew senkron, AR-RTL) |
| 14.03 | TASK-14.03 | ⬜ Bekliyor | S8-suite+S6-parite (Vitest 39 + `test:e2e` axe + CI) |
| 14.04 | TASK-14.04 | ⬜ Bekliyor | S8-Lighthouse a11y=100 çift-tema + Living Flow sayfa-boyu nabız perf tabanı |
| 14.05 | TASK-14.05 | ⬜ Bekliyor | S3 mod komb./sayfa-boyu nabız (system Chrome WebGL — EN BÜYÜK v0.3 delta) |
| 14.06 | TASK-14.06 | ⬜ Bekliyor | S4 kontroller & kalıcılık (tema/dil `/crew-os` path-koru/klavye) |
| 14.07 | TASK-14.07 | ⬜ Bekliyor | S2 tam TR yolculuğu (Crew OS `/crew-os` çıkış, `<Logo>`, dönüş) |
| 14.08 | TASK-14.08 | ⬜ Bekliyor | S7 chatbot 0-token (offline + sanitizasyon + malformed; API çağrısı=0) |
| 14.09 | TASK-14.09 | ⬜ Bekliyor | S9 adversarial/holistik (JS-off SSG, toggle race, scroll storm + nabız/ScrollTrigger, build temiz) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 13 kapandı → Faz 13 task özetleri sıfırlandı** (detaylar `phases/PHASE-13.md` + `tasks/archive/`). Faz 14'ün ilk task'ı bitince buraya eklenir.

_(Faz 14 henüz task üretmedi — senaryo testi fazı kaynak değiştirmeyebilir; ilk task/senaryo sonucu buraya eklenir.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-14.01** 🔄 aktif (verify-plan 14 ✅ — plan review temiz, 9 task doğrulandı). Henüz çalıştırılmadı. Sıradaki adım **`run-task`** (yeni oturum). Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 🔄** — v0.3 versiyon-sonu senaryo testi (ana sayfa + 5 alt sayfa uçtan-uca; S1–S9 v0.3 deltasına uyarlandı: `/crew-os` route + Living Flow sayfa-boyu nabız + SEO metadata + logo; TR birincil, chatbot 0-token, otonom). Planlama ✅ + plan review ✅ (verify-plan): 9 task (build-ground-truth önce → runtime → adversarial); doğrulama fazı, kaynak değişmez. **Faz 13 ✅** — SEO-metadata hijyeni: TB-1 self-canonical + 5-locale hreflang (+x-default) + TB-2 `/forum`→`/` config redirect denetimi; UAT 16/16 + 8 kalite ekseni ✅. Faz 12 ✅ (B1 nabız). Faz 11 ✅ (URL taksonomisi). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `run-task` (TASK-14.01).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **verify-plan 14: plan review tamamlandı** (yalnız doküman: DURUM Adım=task, TASK-14.01 aktif; PHASE-14 Task Listesi 14.01 🔄). **Sonuç: 9 task fresh-context doğrulandı — mekanik düzeltme 0, yapısal değişiklik 0.** Referans gerçeklik-kontrolü temiz (grep/ls ile): 6 route + `/bunker-os` fiziksel route silinmiş + redirect'ler (bunker-os→crew-os/forum→//forum-slug→bulten + 5-locale twin) + metadata helper'ları (`localePath`:17/`localizedAlternates`:30) + 5 tohum/2 e2e spec + CI fast/a11y + chat route + living-flow/`useFlowMode`/`--flow-veil` + crew namespace (bunker namespace yok=rename tamam) + `#chat`/`#forum`/`#bunker` anchor'ları + 6 memory/8 docs — hepsi gerçekle birebir. Milestone S1–S9 tam eşleşme (S6/S8 komplementer bölünmüş: S6→14.02-render+14.03-parite, S8→14.03-suite/axe+14.04-Lighthouse). Çakışma/boşluk yok, bağımlılık zinciri lineer doğru, boyutlar dengeli. **Sıradaki DevFlow komutu: `run-task` (TASK-14.01).**
