# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-29 — run-task TASK-3.04 ✅ (S6 5-dil bütünlük & non-TR tutarlılık): yapısal parite 5 dil × 183 leaf-key 0 eksik/fazla; runtime 5 dil render MISSING_MESSAGE 0; TD1-senkron 3 kalem (report/gym/CTA) 5 dilde hizalı+çevrili; bilinçli-stale tutarlı (render TR-leak 0, pozitif kontrol 3/3); AR `dir=rtl` doğru, render bütün. Kapsam-içi bug yok. Adım: task → run-task (TASK-3.05).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi
**Milestone:** S1–S8 senaryo kataloğu otonom koşuldu + bulgular kaydedildi + triyaj edildi; TR yolculuğu bütünsel-tutarlı + non-TR yüzeyleri tutarlı (parite/render/RTL) teyit edildi ("ölç+kaydet+karar ver" — geçiş peşinen varsayılmaz)
**Adım:** task → `/devflow:run-task` (TASK-3.05, yeni oturum)
**İlerleme:** Kapsam tartışması ✅ + Araştırma ✅ + Plan ✅ + Plan review ✅; task çalıştırma sürüyor (4/9 → 3.01 kanonik ortam ✅, 3.02 S1 giriş/yönlendirme ✅, 3.03 S5 taksonomi & dürüstlük ✅, 3.04 S6 5-dil bütünlük ✅)
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

**Task:** TASK-3.05 — S2 tam TR yolculuğu (curl+Playwright) — ⬜ Bekliyor (sıradaki çalıştırılacak)
**Durum:** TASK-3.04 ✅ (S6 5-dil bütünlük & non-TR tutarlılık) → sıradaki senaryo task'ı bekliyor
**İlerleme:** Adım task → `/devflow:run-task` (TASK-3.05)

---

## Task Durumu (Aktif Faz)

> Faz 3 (Senaryo Testi) plan tamam; 9 task yazıldı (henüz çalıştırılmadı — run-task verify-plan'dan sonra). Açıklamalar `phases/PHASE-3.md` Task Listesi'nde. Faz 2 task'ları (2.01/2.02/2.03 ✅) arşivde (`tasks/archive/`), detay `phases/PHASE-2.md`.

| # | Task | Durum |
|---|------|-------|
| 3.01 | Kanonik ortam + build-temizliği tabanı (S8-build) | ✅ Tamamlandı |
| 3.02 | S1 giriş/yönlendirme matrisi (curl) | ✅ Tamamlandı |
| 3.03 | S5 taksonomi & dürüstlük (curl+grep 5 dil) | ✅ Tamamlandı |
| 3.04 | S6 5-dil bütünlük & non-TR tutarlılık (node+curl) | ✅ Tamamlandı |
| 3.05 | S2 tam TR yolculuğu (curl+Playwright) | ⬜ Bekliyor |
| 3.06 | S3 mod kombinasyonları / degradasyon (Playwright) | ⬜ Bekliyor |
| 3.07 | S4 kontroller & kalıcılık (Playwright) | ⬜ Bekliyor |
| 3.08 | S7 chatbot 0-token (kod+curl+Playwright) | ⬜ Bekliyor |
| 3.09 | S8 adversarial/holistik: JS-off SSG + race | ⬜ Bekliyor |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-3.04 — S6 5-dil bütünlük & non-TR tutarlılık** (✅ 2026-06-29)
- Yapısal parite (node key-diff): 5 dil × 183 leaf-key, 0 eksik / 0 fazla (183 taban re-teyit). Runtime: fresh prod serve, 5 dil home render `MISSING_MESSAGE` = 0 (IntlError 0). TD1-senkron 3 kalem (`how.steps.report` / `sectors.items.gyms` [6 sektör parite] / `hero.ctaSecondary`) 5 dilde anahtar-hizalı + tam çevrili.
- Bilinçli-stale: kaynak 18/183 birebir-TR değer tamamı meşru (marka/sayı + "Form"/"WhatsApp", home-dışı); render TR-cümle leak 5 dil × 0, pozitif kontrol 3/3 her dilde → gerçek stale-leak 0. AR `<html dir="rtl">` doğru, render bütün, physical `left-` util'leri 5 dilde ortak (yön-nötr scroll-bar+cursor).
- Kapsam-içi bug yok; kaynak kod değişmedi. S3'e gözlem: scroll-progress bar `origin-left` RTL yön-davranışı → TASK-3.06.

**TASK-3.03 — S5 taksonomi & dürüstlük (5 dil render görünür metin)** (✅ 2026-06-29)
- curl 5 dil HTML → node görünür-metin ayıklama (script/style + tag çıkar; RSC flight dışlanır) → grep: Crew OS 5 dil × 7 geçiş; "Bunker" görünür metinde 0 (ham HTML'deki 7 kalıntı = route/anchor/namespace anahtarı, render yüzeyi değil — değer "Crew OS"a çözülüyor).
- Yasak metafor (medikal + zayıf adım) 5 dilde 0; sahte presence 0 (● 0, online 0); uydurma sonuç 0 (% 0; $110k = sektörel kıyas, bülten teaser "vaat ediyor"; sektör akışı örnek-işaretli; dürüstlük konvansiyonu "ölçülür/measured/يُقاس/gemessen/se mide" 5 dilde mevcut).
- Kapsam-içi gerçek bug yok; taksonomi + dürüstlük 5 dilde tutarlı; kaynak kod değişmedi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-3.05 (sıradaki; Adım: task → `/devflow:run-task`)
**Aktif Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi (4/9 task ✅; run-task devam ediyor)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-29 — run-task TASK-3.04 ✅ (S6 5-dil bütünlük & non-TR tutarlılık): yapısal parite 5 dil × 183 leaf-key 0 eksik/fazla; runtime 5 dil render MISSING_MESSAGE 0; TD1-senkron 3 kalem (report/gym/CTA) 5 dilde hizalı+çevrili; bilinçli-stale tutarlı (render TR-leak 0, pozitif kontrol 3/3); AR `dir=rtl` doğru, render bütün. Kapsam-içi bug yok. Adım: task → run-task (TASK-3.05).
