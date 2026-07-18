# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-18 — **review-phase 17 ✅ — Faz 17 TAMAMLANDI, v0.4 versiyon-sonu fazları (16, 17) bitti.** Retrospektif + kalite kontrol `phases/PHASE-17.md`'ye yazıldı; faz PHASES.md'de ✅ (tarihsel/dokunulmaz). **Milestone 5/5** (kriter 5'e dürüst şerh: degradasyon doğru ama alt-sayfa masaüstünde animasyonlu imza alanı yok — BULGU-S3); **kalite 8 eksen → 6 ✅ + 2 ⚠️** (⚠️ Marka&Craft = BULGU-S3 üst eksen · ⚠️ Test Kapsamı = runtime doğrulama kalıcı tohum üretmedi, TB-3 açık); **0 kapsam-içi bug → 0 düzeltme task'ı**. Doğrulama disiplini tam: kaynak kod değişmedi (14 commit doc-only), harness'lar silindi, 8/8 task arşivde. **Versiyon Sonu Durumu `senaryo_testi` → `prd_review_bekliyor` damgalandı** → faz döngüsü dışına çıkıldı (Aktif Faz/Adım boş). Yeni karar → DECISIONS 2026-07-18 (senaryo testi a11y mühür metodolojisi); memory'ye "belirleyici probe" disiplini eklendi. Boyut (Adım 5b): temizlik + bölme uygulandı — Araştırma Bulguları `phases/PHASE-17-ARASTIRMA.md`'ye taşındı, Task Listesi hücreleri özete indirildi; tek-okunabilirlik fiilen test edildi. **v0.4 TR CANLI** (`f173234`). **Sıradaki: zorunlu `/devflow:prd-review`** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Yok — faz döngüsü dışında.** Fazlar 1–17 ✅ tamam. v0.4'ün versiyon-sonu fazları (16 teknik borç + TR release, 17 senaryo testi) kapandı → **zorunlu `prd-review` bekleniyor** (versiyon değerlendirme kapısı). Yeni faz `prd-review` sonrası belirlenir.
**Adım:** **Yok** — faz döngüsü dışına çıkıldı. **Sıradaki: `/devflow:prd-review`** (yeni oturum; v0.4 versiyon değerlendirmesi).

**⚠️ prd-review gündemine devredilen sahipli kalemler** (hiçbiri regresyon değil):

1. **BULGU-S3 (craft, öncelikli)** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (yalnız base-wash; `FlowBackdrop` yalnız ana sayfada mount). crew-os ile birebir → v0.4 regresyonu değil, Faz 12 deseni; degradasyon/a11y doğru → **craft kararı, Craft üst eksen olduğu için öncelikli**.
2. **non-TR alpfit stale-TR** — 133 leaf × 5 dil yapısal tam, değerler Türkçe. Site canlı + 5 dil sunuyor → **ziyaretçi-görünür**; prd-review'ın ana kalemi.
3. **Canlı `ANTHROPIC_API_KEY` env YOK** — `/api/chat` 503 → chatbot "offline". **Kullanıcı aksiyonu** (Vercel dashboard); offline yolun zarif olduğu S7+S9'da doğrulandı.
4. **`revize/v0.4-versiyon-sonu` → `main` merge bekliyor** — gym PNG silme + Faz 16/17 dokümanları; canlıda orphan PNG 0 tüketici → etkisiz. Finalizasyon adımı.
5. **Chatbot per-mesaj max-byte cap yok** (min-length + geçmiş-sayısı var) → hardening adayı.
6. **npm audit 2 moderate** (postcss Next'e gömülü, sömürülemez; DECISIONS 2026-07-16) → upstream-bekleyen.
7. **Brief mobil perf açığı** (≈90 / LCP >2.5s) → metodolojik duvar; DECISIONS 2026-06-30.
8. **TB-3 runtime invariant tohumu** (Faz 12'den açık) → sonraki teknik borç fazı kapsam adayı.

**Kapatıldı:** BULGU-S2 / BULGU-S9 = `page.route` harness artefaktı (memory'de, takip gerektirmez).

**İlerleme:** review-phase 17 (2026-07-18) — Faz 17 ✅ kapandı; milestone 5/5, kalite 6 ✅ + 2 ⚠️, 0 düzeltme task'ı; Versiyon Sonu Durumu `prd_review_bekliyor` damgalandı. Kaynak kod değişmedi. Sıradaki: prd-review.
**Son Faz Dokümanı:** `phases/PHASE-17.md` (✅ tamamlandı, tarihsel; araştırma detayı → `phases/PHASE-17-ARASTIRMA.md`). Önceki: `phases/PHASE-16.md` (✅ v0.4 teknik borç + TR release), `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** **prd_review_bekliyor** (review-phase 17 damgaladı — v0.4 senaryo testi fazı ✅). v0.4'ün iki sabit versiyon-sonu fazı tamam: **Faz 16 ✅** (teknik borç + TR release) + **Faz 17 ✅** (senaryo testi, UAT 12/12, 0 kapsam-içi bug). TR canlı (`f173234`) ve canlı duman ile doğrulandı. **Sıradaki: zorunlu `/devflow:prd-review`** — gündemde non-TR çeviri stratejisi (ziyaretçi-görünür) + BULGU-S3 craft kalemi başı çekiyor.

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **Yok — faz döngüsü dışında.** Faz 17 ✅ kapandı (review-phase 17: retrospektif + kalite kontrol yazıldı, 0 düzeltme task'ı). Sıradaki adım task değil **versiyon değerlendirmesi**: `/devflow:prd-review`.
**Durum:** Fazlar 1–17 ✅; Versiyon Sonu Durumu **`prd_review_bekliyor`**. **v0.4 TR canlı** (`f173234`).
**İlerleme:** review-phase 17 (2026-07-18) — Faz 17 kapandı, milestone 5/5, kalite 6 ✅ + 2 ⚠️, 0 kapsam-içi bug, 0 kaynak kod değişimi. Sıradaki adım: prd-review (v0.4 versiyon değerlendirmesi).

---

## Task Durumu (Aktif Faz)

> **Aktif faz yok** — Faz 17 ✅ kapandı, faz döngüsü dışına çıkıldı (zorunlu prd-review bekleniyor). Faz 17'nin 8 task'ının (17.01–17.08, hepsi ✅) durum tablosu ve bulguları `phases/PHASE-17.md` → Task Listesi'ne mezun edildi; icra detayı `tasks/archive/TASK-17.0X.md`'de. Yeni faz `prd-review` sonrası discuss-phase ile açılır.

---

## Son Task Özetleri

> **Faz 17 kapandı → task özetleri `phases/PHASE-17.md`'ye mezun edildi** (Task Listesi + UAT Sonuçları + Retrospektif); icra detayı `tasks/archive/TASK-17.0X.md`'de. Aktif faz olmadığı için burada tutulacak özet yok — yeni faz başlayınca son 2 task özeti yeniden birikir.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **Yok — faz döngüsü dışında.** Faz 17 ✅ kapandı (8/8 task ✅, UAT 12/12, 0 düzeltme task'ı). Sıradaki adım **zorunlu `/devflow:prd-review`** (v0.4 versiyon değerlendirmesi). Faz 17 task detayları → `phases/PHASE-17.md` + `tasks/archive/TASK-17.0X.md`.
**Aktif Faz:** **Yok** — Fazlar 1–17 ✅. **Aktif Versiyon v0.4**, Versiyon Sonu Durumu **`prd_review_bekliyor`** (Faz 16 teknik borç + TR release ✅, Faz 17 senaryo testi ✅). **v0.4 TR CANLI** (`main` = `f173234`); branch `revize/v0.4-versiyon-sonu` (merge finalizasyona). Faz dokümanı: `phases/PHASE-17.md` (✅) + `phases/PHASE-17-ARASTIRMA.md`; release kaydı `docs/RELEASE-v0.4.md`.
**prd-review gündemi (sahipli kalemler, detay → Aktif Faz bölümü):** BULGU-S3 craft (öncelikli) · non-TR alpfit stale-TR (ziyaretçi-görünür) · canlı `ANTHROPIC_API_KEY` yok (kullanıcı aksiyonu) · branch→main merge · chatbot max-byte cap · npm audit 2 moderate · brief mobil perf açığı · TB-3 runtime tohumu.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)

---

**Son Güncelleme:** 2026-07-18 — **review-phase 17: Faz 17 ✅ TAMAMLANDI → v0.4 versiyon-sonu fazları (16, 17) bitti, Versiyon Sonu Durumu `prd_review_bekliyor`.** Retrospektif + kalite kontrol PHASE-17'ye yazıldı, faz PHASES.md'de ✅ (tarihsel). **Milestone 5/5** (kriter 5'e BULGU-S3 şerhi); **kalite 6 ✅ + 2 ⚠️** (⚠️ Marka&Craft = alt-sayfa masaüstü imza alanı boşluğu, üst eksen → prd-review; ⚠️ Test Kapsamı = runtime doğrulama kalıcı tohum üretmedi, TB-3 açık); **0 kapsam-içi bug → 0 düzeltme task'ı**. Bütüncül değerlendirme: kapsam kararlarının tamamı + araştırma dikkat-noktaları + Faz 16'nın 3 önerisi uygulandı; `next start` hiç denenmedi (memory kuralı). Doğrulama disiplini tam: kaynak kod değişmedi, harness'lar silindi, 8/8 arşivde, `git status` temiz. Yeni karar → `docs/DECISIONS.md` 2026-07-18 (senaryo testi a11y mührü = CI axe çift-tema + yapısal grep; iki-gate disiplini yeni yüzeyler için aynen geçerli). Memory → "belirleyici probe" disiplini. Boyut (Adım 5b): Araştırma Bulguları `PHASE-17-ARASTIRMA.md`'ye bölündü + Task Listesi temizlendi; tek-okunabilirlik fiilen test edildi. Aktif Faz/Adım **boşaltıldı** (faz döngüsü dışı). **Sıradaki: `/devflow:prd-review`** (yeni oturum).
