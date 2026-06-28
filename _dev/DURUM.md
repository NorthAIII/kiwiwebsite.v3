# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-29 — run-task TASK-3.06 ✅ (S3 Living Flow degradasyon, Playwright MCP fresh-prod-serve): light/dark + FOUC yok (inline tema script head'de body'den önce); reduced-motion & no-WebGL → StaticFlow (canvas=0, içerik görünür); mobil→low (gating-değişmezi); AR-RTL×dark×reduced birlikte sağlam (rtl+dark token+static, StaticFlow LIGHT_INK); 320/768/1440 yatay taşma yok + CLS=0; tüm modlar konsol 0-error. Kapsam-içi bug yok; kaynak değişmedi. Adım: task → run-task (TASK-3.07).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi
**Milestone:** S1–S8 senaryo kataloğu otonom koşuldu + bulgular kaydedildi + triyaj edildi; TR yolculuğu bütünsel-tutarlı + non-TR yüzeyleri tutarlı (parite/render/RTL) teyit edildi ("ölç+kaydet+karar ver" — geçiş peşinen varsayılmaz)
**Adım:** task → `/devflow:run-task` (TASK-3.07, yeni oturum)
**İlerleme:** Kapsam tartışması ✅ + Araştırma ✅ + Plan ✅ + Plan review ✅; task çalıştırma sürüyor (6/9 → 3.01 kanonik ortam ✅, 3.02 S1 giriş/yönlendirme ✅, 3.03 S5 taksonomi & dürüstlük ✅, 3.04 S6 5-dil bütünlük ✅, 3.05 S2 tam TR yolculuğu ✅, 3.06 S3 degradasyon ✅)
**Faz Dokümanı:** `phases/PHASE-3.md`

---

## Aktif Versiyon

**Versiyon:** v0.1 — Ana sayfa TR içerik & ses revizesi (güçlü revizenin ilk versiyonu; baz: v3 canlı)
**Hedef:** Nasıl Çalışır 4 adım (R1) + Sektörler gym paneli tek-otomasyona (R2) + dürüstlük taraması (R4/F5) + hero ikincil CTA (R4/F6) ana sayfada tamam; marka sesi tutarlı; TR tek kaynak (çeviri versiyon-sınırına ertelendi)
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-3.07 — S4 kontroller & kalıcılık (tema toggle, dil-switcher, klavye-only + focus-visible) (Playwright) — ⬜ Bekliyor (sıradaki çalıştırılacak)
**Durum:** TASK-3.06 ✅ (S3 Living Flow degradasyon) → sıradaki senaryo task'ı bekliyor
**İlerleme:** Adım task → `/devflow:run-task` (TASK-3.07)

---

## Task Durumu (Aktif Faz)

> Faz 3 (Senaryo Testi) plan tamam; 9 task yazıldı (henüz çalıştırılmadı — run-task verify-plan'dan sonra). Açıklamalar `phases/PHASE-3.md` Task Listesi'nde. Faz 2 task'ları (2.01/2.02/2.03 ✅) arşivde (`tasks/archive/`), detay `phases/PHASE-2.md`.

| # | Task | Durum |
|---|------|-------|
| 3.01 | Kanonik ortam + build-temizliği tabanı (S8-build) | ✅ Tamamlandı |
| 3.02 | S1 giriş/yönlendirme matrisi (curl) | ✅ Tamamlandı |
| 3.03 | S5 taksonomi & dürüstlük (curl+grep 5 dil) | ✅ Tamamlandı |
| 3.04 | S6 5-dil bütünlük & non-TR tutarlılık (node+curl) | ✅ Tamamlandı |
| 3.05 | S2 tam TR yolculuğu (curl+Playwright) | ✅ Tamamlandı |
| 3.06 | S3 mod kombinasyonları / degradasyon (Playwright) | ✅ Tamamlandı |
| 3.07 | S4 kontroller & kalıcılık (Playwright) | ⬜ Bekliyor |
| 3.08 | S7 chatbot 0-token (kod+curl+Playwright) | ⬜ Bekliyor |
| 3.09 | S8 adversarial/holistik: JS-off SSG + race | ⬜ Bekliyor |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-3.06 — S3 mod kombinasyonları / Living Flow degradasyon** (✅ 2026-06-29)
- Playwright MCP `browser_run_code_unsafe` (raw page: emulateMedia + addInitScript + izole newContext), fresh-prod-serve (build temiz/0-uyarı, PID 3303870 fresh teyit, iş sonu kill). Headless'ta WebGL gerçek çalışıyor → high/low yolu gerçekten koşuldu.
- light/dark + **FOUC yok** (inline tema script head'de body'den önce, dark localStorage domcontentloaded'da uygulanmış); reduced-motion & no-WebGL → StaticFlow (canvas=0, Reveal 12/12 görünür — M3 F3.1); mobil(390)→**low** (gating-değişmezi ≤768px); AR-RTL×dark×reduced birlikte (rtl+dark token+static, StaticFlow color=LIGHT_INK); 320/768/1440 **yatay taşma yok + CLS=0**; tüm modlar konsol 0-error.
- Kapsam-içi bug yok; kaynak değişmedi. Gözlem: `/`→`/en` locale-detection (Accept-Language en-US) = next-intl beklenen, S1 kapsamı (TASK-3.02), S3 bulgusu değil.

**TASK-3.05 — S2 tam TR yolculuğu (top→bottom)** (✅ 2026-06-29)
- Statik (curl+grep+node): TR home `/` 200 (`/tr`→`/` 307); bölüm sırası `top→how→sectors→bunker→forum→chat→contact` (8 bölüm bütün/boş yok, Credibility id'siz); 4-adım render (Dört adım + Analiz/Çözüm/Otomasyon/Raporlama); hero ikincil CTA "İşleyen örnekleri gör"→#sectors; gym tek-otomasyon flow + "Canlı—Alpfit"; 6/6 iç link 200, dead-`#` render dışı.
- Runtime (Playwright, Lenis `anchors:true`): 8/8 anchor/CTA doğru bölüme scroll (iç-anchor top≈0; #contact=Footer sayfa-dibi atBottom=true doğal limit); "Uygulamayı incele" client-nav→/spor-salonu-yazilimi (Alpfit yüklendi); konsol 0-error/0-warning.
- Kapsam-içi bug yok; kaynak kod değişmedi. Gözlem: browser `/`→`/ar` = önceki oturum `NEXT_LOCALE` cookie kalıntısı (routing/S1, TASK-3.02), S2 bulgusu değil.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-3.07 (sıradaki; Adım: task → `/devflow:run-task`)
**Aktif Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi (6/9 task ✅; run-task devam ediyor)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-29 — run-task TASK-3.06 ✅ (S3 Living Flow degradasyon, Playwright MCP fresh-prod-serve): light/dark + FOUC yok; reduced-motion & no-WebGL → StaticFlow (canvas=0, içerik görünür); mobil→low (gating-değişmezi); AR-RTL×dark×reduced birlikte sağlam; 320/768/1440 yatay taşma yok + CLS=0; tüm modlar konsol 0-error. Kapsam-içi bug yok; kaynak değişmedi. Adım: task → run-task (TASK-3.07).
