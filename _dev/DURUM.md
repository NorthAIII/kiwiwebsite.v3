# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-03 — **review-phase 13 ✅: Faz 13 (SEO-metadata hijyeni) tamamlandı; retrospektif + 8 kalite ekseni (hepsi ✅) PHASE-13'e yazıldı, 0 düzeltme task'ı.** Kod incelendi (helper tek kaynak, 6 sayfa self-canonical, layout canonical miras ettirmez); test 39/39 bağımsız yeşil. TB-1 (fail-safe canonical + 5-dil hreflang/x-default) + TB-2 (`/forum`→`/` 6×308, `:slug*` sıra tuzağı) kapandı; kök-çözüm denetimi `/bulten` 404-hedefini yakaladı. Guardrail'ler yapısal regresyonsuz. **Versiyon Sonu Durumu `teknik_borç`→`senaryo_testi`.** Sıradaki adım **`discuss-phase 14`** (v0.3 versiyon-sonu senaryo testi fazı).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 14 — **v0.3 versiyon-sonu senaryo testi** (geçici ad; discuss-phase 14 damgalar) — henüz girilmedi. **Faz 13 ✅** (SEO-metadata hijyeni: TB-1 canonical/hreflang + TB-2 `/forum` redirect). Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 tamamen ✅ (Faz 4–9 + prd-review + production release).
**Adım:** discuss (Versiyon Sonu Durumu `teknik_borç`→`senaryo_testi` review-phase 13'te damgalandı; senaryo testi fazına geçiliyor). ✅ **v0.2 production release tamamlandı (2026-07-02)** — revize `main`'de, canlı deploy `a71adbc`, Umami canlı +1 doğrulandı (`docs/RELEASE-v0.2.md`). Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env (release engeli değil).
**İlerleme:** review-phase 13 (2026-07-03) ✅ — Faz 13 tamamlandı: retrospektif + 8 kalite ekseni (hepsi ✅) PHASE-13'e yazıldı; kod incelendi, 39/39 test bağımsız yeşil; 0 düzeltme task'ı. TB-1 (fail-safe self-canonical + 5-dil hreflang/x-default, tek-kaynak helper) + TB-2 (`/forum`→`/` 6×308, sıra tuzağı) kapandı. **Kayıtlı sahipli açıklar (gelecek/prd-review):** TB-3 full-motion tohumu (WebGL flaky), TB-4 site-geneli logical-ok (RTL), TB-5 npm audit (next downgrade breaking), B grubu (non-TR tazelik / AR-dil stratejisi / brief mobil perf) → prd-review.
**Son Faz Dokümanı:** `phases/PHASE-13.md` (✅ Tamamlandı — Task Listesi 13.01–13.04 ✅; UAT 16/16; retrospektif + kalite kontrol yazıldı). Faz 12 ✅ `phases/PHASE-12.md`.

---

## Aktif Versiyon

**Versiyon:** v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) (re-kickoff 2026-07-02'de sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** A1 logo hizalama + A3 CTA kartı affordance & scroll göstergesi ölçekleme + B1 Living Flow nabız kapsamı (**karar-gate'li**, imza riski) + SEO `/bunker-os`→`/crew-os` redirect (i18n namespace 5-dil rename) & `/forum`→404; guardrail: a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite regresyonsuz. Kesin faz kapsamı/sırası discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Faz 13 ✅ tamamlandı (review-phase 13). Yeni faz (14 — senaryo testi) henüz girilmedi → aktif task yok. Sıradaki adım task değil **`discuss-phase 14`** (senaryo testi fazı kapsam tartışması).
**Durum:** Faz 13 ✅; Versiyon Sonu Durumu = `senaryo_testi`; Aktif Versiyon v0.3. Aktif Faz 14 discuss bekliyor.
**İlerleme:** review-phase 13 (2026-07-03) ✅ — retrospektif + 8 kalite ekseni PHASE-13'e yazıldı; 39/39 test yeşil; 0 düzeltme task'ı. Sıradaki = `discuss-phase 14`.

---

## Task Durumu (Aktif Faz)

> **Faz 14 henüz girilmedi** — senaryo testi fazı `discuss-phase 14` ile başlar (Versiyon Sonu Durumu `senaryo_testi`). Task listesi discuss/plan sonrası dolar. Faz 4–13 ✅.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Faz 14 discuss-phase'de planlanacak |

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

**Aktif Task:** Faz 13 ✅ (review-phase 13 tamamlandı). Yeni faz (14 — senaryo testi) henüz girilmedi. Sıradaki adım **`discuss-phase 14`**. Açık takip: chatbot canlı env key.
**Aktif Faz:** **14 (henüz girilmedi)** — v0.3 versiyon-sonu senaryo testi (geçici ad; discuss-phase 14 damgalar). **Faz 13 ✅** — SEO-metadata hijyeni: TB-1 alt-sayfa self-canonical + 5-locale hreflang alternates (+x-default) + TB-2 `/forum` locale gap + tüm config redirect denetimi (`/forum`→`/`) + regresyon tohumu; UAT 16/16 + 8 kalite ekseni ✅. Faz 12 ✅ (B1 Living Flow nabız). Faz 11 ✅ (URL taksonomisi/SEO). Faz 10 ✅ (görsel cila). v0.2 Faz 4–9 ✅ + prd-review ✅ + production release ✅. **Aktif Versiyon v0.3**, Versiyon Sonu Durumu: **senaryo_testi** → sıradaki komut `discuss-phase 14`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-03 — **review-phase 13 ✅: Faz 13 (SEO-metadata hijyeni) tamamlandı** (yalnız doküman: PHASE-13 retrospektif + kalite kontrol; PHASES/MODULE-MAP/DURUM). **Bütüncül değerlendirme:** 4 task tutarlı bütün — TB-1 (tek-kaynak `localizedAlternates` helper + fail-safe layout→sayfa taşıma; 6 sayfa self-canonical + 5-dil hreflang/x-default) + TB-2 (`/forum`→`/` locale-gap kapalı, 6×308, `:slug*` sıra tuzağı çürütüldü). Kod incelendi: helper tek kaynak, 5 alt sayfa + home kendi path'iyle çağırıyor, layout canonical miras ETTİRMİYOR, kopya-kod yok. **Milestone ✓** (UAT 16/16 karşıladı). **8 kalite ekseni hepsi ✅** (render surface 0 değişim → craft/a11y/perf yapısal korundu; modülerlik+fail-safe+kümülatif-tohum güçlü). `npm run test` 39/39 bağımsız yeşil. **0 düzeltme task'ı.** DECISIONS 2 Faz-13 girdisi (fail-safe canonical + `/forum`→`/` sıra tuzağı) task'larda kaydedilmiş. Faz dokümanı boyut ✅ (~6.6k token, bölme yok). **Versiyon Sonu Durumu `teknik_borç`→`senaryo_testi` damgalandı.** Kayıtlı açıklar (TB-3/4/5) + B grubu → prd-review. **Sıradaki DevFlow komutu: `discuss-phase 14` (v0.3 versiyon-sonu senaryo testi fazı).**
