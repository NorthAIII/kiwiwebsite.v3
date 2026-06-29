# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-29 — run-task TASK-3.07 ✅ (S4 kontroller & kalıcılık, Playwright MCP fresh-prod-serve PID 3357729): tema toggle html.dark+localStorage+reload kalıcı (FOUC yok), Living Flow uniform canlı güncellenir (FlowCanvas-aynı MutationObserver fired); dil-switcher aria/Escape/dış-tık/klavye(Enter+Tab) + path korur (home+subpage); klavye 16/16 distinct durak + focus-visible 2px green offset3px; 0-error. Bulgu: dil değişiminde anchor düşüyor (path korunur) → record-not-fix (kullanıcı onayı). Adım: task → run-task (TASK-3.08).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi
**Milestone:** S1–S8 senaryo kataloğu otonom koşuldu + bulgular kaydedildi + triyaj edildi; TR yolculuğu bütünsel-tutarlı + non-TR yüzeyleri tutarlı (parite/render/RTL) teyit edildi ("ölç+kaydet+karar ver" — geçiş peşinen varsayılmaz)
**Adım:** task → `/devflow:run-task` (TASK-3.08, yeni oturum)
**İlerleme:** Kapsam tartışması ✅ + Araştırma ✅ + Plan ✅ + Plan review ✅; task çalıştırma sürüyor (7/9 → 3.01 kanonik ortam ✅, 3.02 S1 giriş/yönlendirme ✅, 3.03 S5 taksonomi & dürüstlük ✅, 3.04 S6 5-dil bütünlük ✅, 3.05 S2 tam TR yolculuğu ✅, 3.06 S3 degradasyon ✅, 3.07 S4 kontroller & kalıcılık ✅)
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

**Task:** TASK-3.08 — S7 chatbot 0-token (offline + sanitizasyon; dummy-key 400 + key-yok 503) (kod+curl+Playwright) — ⬜ Bekliyor (sıradaki çalıştırılacak)
**Durum:** TASK-3.07 ✅ (S4 kontroller & kalıcılık) → sıradaki senaryo task'ı bekliyor
**İlerleme:** Adım task → `/devflow:run-task` (TASK-3.08)

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
| 3.07 | S4 kontroller & kalıcılık (Playwright) | ✅ Tamamlandı |
| 3.08 | S7 chatbot 0-token (kod+curl+Playwright) | ⬜ Bekliyor |
| 3.09 | S8 adversarial/holistik: JS-off SSG + race | ⬜ Bekliyor |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-3.07 — S4 kontroller & kalıcılık** (✅ 2026-06-29)
- Playwright MCP `browser_run_code_unsafe` (click/keyboard/Escape/reload/localStorage + computed-style + sentinel MutationObserver), fresh-prod-serve (build temiz/0-uyarı, PID 3357729 fresh teyit, iş sonu kill, stray 12708 untouched).
- **Tema:** toggle html.dark + localStorage + **reload kalıcı** (FOUC yok); Living Flow uniform canlı güncellenir (FlowCanvas-birebir MutationObserver toggle'da fired=1, canvas/GL toggle boyunca canlı; preserveDrawingBuffer yok → mekanizma-proxy). **Dil-switcher:** aria-haspopup/expanded, 5 dil (aktif •), Escape+dış-tık kapatır, klavye (Enter açar+Tab option'a girer), **path korur** (home+subpage). **Klavye/focus-visible:** 16/16 distinct durak (trap yok), settle sonrası 16/16 `2px solid rgb(31,122,61)` offset3px. Konsol 0-error/0-warning.
- **Bulgu (record-not-fix, kullanıcı onayı):** dil değişiminde anchor düşüyor — `/en#sectors`→Almanca→`/de` (hash boş), path korunur; kök neden router.replace(pathname) next-intl hash içermez; M3 F3.4 resmi kriteri yalnız path ister (geçiyor). + bilinen dil-switcher aria-mismatch (a11y 89) record-not-fix. Kaynak değişmedi.

**TASK-3.06 — S3 mod kombinasyonları / Living Flow degradasyon** (✅ 2026-06-29)
- Playwright MCP `browser_run_code_unsafe` (raw page: emulateMedia + addInitScript + izole newContext), fresh-prod-serve (build temiz/0-uyarı, PID 3303870 fresh teyit, iş sonu kill). Headless'ta WebGL gerçek çalışıyor → high/low yolu gerçekten koşuldu.
- light/dark + **FOUC yok** (inline tema script head'de body'den önce, dark localStorage domcontentloaded'da uygulanmış); reduced-motion & no-WebGL → StaticFlow (canvas=0, Reveal 12/12 görünür — M3 F3.1); mobil(390)→**low** (gating-değişmezi ≤768px); AR-RTL×dark×reduced birlikte (rtl+dark token+static, StaticFlow color=LIGHT_INK); 320/768/1440 **yatay taşma yok + CLS=0**; tüm modlar konsol 0-error.
- Kapsam-içi bug yok; kaynak değişmedi. Gözlem: `/`→`/en` locale-detection (Accept-Language en-US) = next-intl beklenen, S1 kapsamı (TASK-3.02), S3 bulgusu değil.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-3.08 (sıradaki; Adım: task → `/devflow:run-task`)
**Aktif Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi (7/9 task ✅; run-task devam ediyor)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-29 — run-task TASK-3.07 ✅ (S4 kontroller & kalıcılık, Playwright MCP fresh-prod-serve PID 3357729): tema toggle+localStorage+reload kalıcı (FOUC yok) + Living Flow uniform canlı güncellenir; dil-switcher aria/Escape/dış-tık/klavye + path korur; klavye 16/16 distinct + focus-visible 2px green offset3px; 0-error. Bulgu: anchor düşüyor (path korunur) → record-not-fix (kullanıcı onayı). Adım: task → run-task (TASK-3.08).
