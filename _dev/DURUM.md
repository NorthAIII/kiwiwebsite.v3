# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-29 — verify-phase 3 (UAT) ✅ tamamlandı: **10/10 senaryo geçti**, kapsam-içi yeni bug yok → düzeltme task'ı gerekmez. Otomatik kontroller: CI/CD yok; security-review bulgu yok (faz 3 kaynak değiştirmedi). Toplam Anthropic API çağrısı = 0. Faz 3 Adım: review → `/devflow:review-phase 3`.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi
**Milestone:** S1–S8 senaryo kataloğu otonom koşuldu + bulgular kaydedildi + triyaj edildi; TR yolculuğu bütünsel-tutarlı + non-TR yüzeyleri tutarlı (parite/render/RTL) teyit edildi ("ölç+kaydet+karar ver" — geçiş peşinen varsayılmaz) → **milestone karşılandı (UAT 10/10 ✅)**
**Adım:** review → `/devflow:review-phase 3` (yeni oturum)
**İlerleme:** Kapsam tartışması ✅ + Araştırma ✅ + Plan ✅ + Plan review ✅ + task çalıştırma 9/9 ✅ + **UAT (verify-phase) ✅ — 10/10 senaryo geçti, kapsam-içi bug yok, düzeltme task'ı yok, security-review temiz** → sıradaki: faz review (review-phase)
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

**Task:** Yok — Faz 3 senaryo task'ları 9/9 ✅ + UAT (verify-phase) 10/10 ✅ tamamlandı. Düzeltme task'ı oluşmadı (kapsam-içi bug yok).
**Durum:** Aktif task yok; sıradaki adım faz review
**İlerleme:** Adım review → `/devflow:review-phase 3` (yeni oturum)

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
| 3.08 | S7 chatbot 0-token (kod+curl+Playwright) | ✅ Tamamlandı |
| 3.09 | S8 adversarial/holistik: JS-off SSG + race | ✅ Tamamlandı |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-3.09 — S8 adversarial/holistik (JS-off SSG + toggle/scroll race)** (✅ 2026-06-29)
- Kanonik fresh-prod-serve (`rm -rf .next && build` exit 0 / 0-uyarı / 37 sayfa = S8-build re-teyit; fresh PID 30537 teyit, iş sonu kill; stray 12267 portsuz/dokunulmadı). Araç: Playwright MCP `browser_run_code_unsafe` + curl raw HTML.
- **JS-off SSG (TR+AR):** tüm bölüm ID + başlıklar + gövde + nav/CTA (hero ikincil "İşleyen örnekleri gör"→#sectors) raw HTML'de okunur; `<canvas>`=0 (Living Flow client-only, beklenen); AR dir=rtl + 0 MISSING_MESSAGE; kritik içerik client-only'ye gömülü değil. **Toggle race:** tema 7-UI+burst(8,9) → html.dark=localStorage=aria-pressed=icon tutarlı (3/3); dil burst(es→de→ar) son-kazanır + ardışık(180ms) tutarlı (url=lang=dir=langBtn). **Scroll/anchor race:** ardışık/rAF/80ms son hedef tam iner (forumTop≈0); 30/30 reveal görünür 0-takılı; #top dönüş scrollY=0; 0 konsol hatası.
- **Triyaj (TK6):** kapsam-içi bug YOK, kaynak değişmedi. Record-not-fix: aynı-JS-tick(0ms) anchor burst Lenis'i ara konuma çözer (≥16ms'de temiz iner, takılma yok) — sentetik-only, kullanıcı etkisi yok.

**TASK-3.08 — S7 chatbot 0-token (offline + sanitizasyon)** (✅ 2026-06-29)
- Kanonik fresh-prod-serve (build exit 0 / 0-uyarı / 37 sayfa = S8-build re-teyit) iki konfig: dummy-key (PID 3508777) + key-yok (PID 3511140), fresh listening-PID teyit, stray 12708 dokunulmadı, iş sonu kill.
- **Sanitizasyon** (route.ts): rol whitelist + boş-filtre + son-12 + sonda-user. **dummy-key + 6 malformed → 400** (geçersiz JSON / `{}` / boş [] / rol-enjeksiyon(system) / boş-içerik / sonda-assistant; `new Anthropic()`'ten ÖNCE → Anthropic'e ulaşmaz). **key-yok → 503** (geçerli+malformed dahil; apiKey-gate-önce → naif "key-yok+malformed→400" yanlış-negatifi kanıtlandı). **Toplam API çağrısı = 0.**
- **Playwright offline UI:** mesaj→503→offline mesajı render ("Asistan şu an çevrimdışı…"); **sahte-online yok** (`#chat .bg-green=0`; ekrandaki yeşil halka = site-geneli custom cursor M3); UI takılmaz (Thinking=0, input temizlendi, retype'ta Gönder aktif); tek konsol "hatası" = beklenen 503 network-log (uygulama hatası değil). Stream-kopması kod-teyidi (try/catch fallback enqueue + finally close). Kapsam-içi bug yok; kaynak değişmedi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — Faz 3: 9/9 task ✅ + UAT 10/10 ✅ (Adım: review → `/devflow:review-phase 3`)
**Aktif Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi (9/9 task ✅ + UAT ✅; sıradaki adım faz review)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-29 — verify-phase 3 (UAT) ✅ tamamlandı: **10/10 senaryo geçti**, kapsam-içi yeni bug yok → düzeltme task'ı gerekmez. Otomatik kontroller: CI/CD yok; security-review bulgu yok (faz 3 kaynak değiştirmedi). Toplam Anthropic API çağrısı = 0. Faz 3 Adım: review → `/devflow:review-phase 3`.
