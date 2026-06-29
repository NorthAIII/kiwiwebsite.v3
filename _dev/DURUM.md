# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-29 — run-task TASK-3.08 ✅ (S7 chatbot 0-token, fresh-prod-serve PID 3508777/3511140): sanitizasyon kod-inceleme; dummy-key 6 malformed→400 (Anthropic'e ulaşmadan); key-yok→503 + Playwright offline UI (sahte-online yok, UI takılmaz); toplam API çağrısı=0; kapsam-içi bug yok. Adım: task → run-task (TASK-3.09).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi
**Milestone:** S1–S8 senaryo kataloğu otonom koşuldu + bulgular kaydedildi + triyaj edildi; TR yolculuğu bütünsel-tutarlı + non-TR yüzeyleri tutarlı (parite/render/RTL) teyit edildi ("ölç+kaydet+karar ver" — geçiş peşinen varsayılmaz)
**Adım:** task → `/devflow:run-task` (TASK-3.09, yeni oturum)
**İlerleme:** Kapsam tartışması ✅ + Araştırma ✅ + Plan ✅ + Plan review ✅; task çalıştırma sürüyor (8/9 → 3.01 kanonik ortam ✅, 3.02 S1 giriş/yönlendirme ✅, 3.03 S5 taksonomi & dürüstlük ✅, 3.04 S6 5-dil bütünlük ✅, 3.05 S2 tam TR yolculuğu ✅, 3.06 S3 degradasyon ✅, 3.07 S4 kontroller & kalıcılık ✅, 3.08 S7 chatbot 0-token ✅)
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

**Task:** TASK-3.09 — S8 adversarial/holistik: JS-off SSG okunabilirlik + hızlı toggle/scroll race (build-clean 3.01'de) — ⬜ Bekliyor (sıradaki çalıştırılacak)
**Durum:** TASK-3.08 ✅ (S7 chatbot 0-token) → fazın son senaryo task'ı bekliyor
**İlerleme:** Adım task → `/devflow:run-task` (TASK-3.09)

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
| 3.09 | S8 adversarial/holistik: JS-off SSG + race | ⬜ Bekliyor |

**Durum Kodları:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-3.08 — S7 chatbot 0-token (offline + sanitizasyon)** (✅ 2026-06-29)
- Kanonik fresh-prod-serve (build exit 0 / 0-uyarı / 37 sayfa = S8-build re-teyit) iki konfig: dummy-key (PID 3508777) + key-yok (PID 3511140), fresh listening-PID teyit, stray 12708 dokunulmadı, iş sonu kill.
- **Sanitizasyon** (route.ts): rol whitelist + boş-filtre + son-12 + sonda-user. **dummy-key + 6 malformed → 400** (geçersiz JSON / `{}` / boş [] / rol-enjeksiyon(system) / boş-içerik / sonda-assistant; `new Anthropic()`'ten ÖNCE → Anthropic'e ulaşmaz). **key-yok → 503** (geçerli+malformed dahil; apiKey-gate-önce → naif "key-yok+malformed→400" yanlış-negatifi kanıtlandı). **Toplam API çağrısı = 0.**
- **Playwright offline UI:** mesaj→503→offline mesajı render ("Asistan şu an çevrimdışı…"); **sahte-online yok** (`#chat .bg-green=0`; ekrandaki yeşil halka = site-geneli custom cursor M3); UI takılmaz (Thinking=0, input temizlendi, retype'ta Gönder aktif); tek konsol "hatası" = beklenen 503 network-log (uygulama hatası değil). Stream-kopması kod-teyidi (try/catch fallback enqueue + finally close). Kapsam-içi bug yok; kaynak değişmedi.

**TASK-3.07 — S4 kontroller & kalıcılık** (✅ 2026-06-29)
- Playwright MCP `browser_run_code_unsafe` (click/keyboard/Escape/reload/localStorage + computed-style + sentinel MutationObserver), fresh-prod-serve (build temiz/0-uyarı, PID 3357729 fresh teyit, iş sonu kill, stray 12708 untouched).
- **Tema:** toggle html.dark + localStorage + **reload kalıcı** (FOUC yok); Living Flow uniform canlı güncellenir (FlowCanvas-birebir MutationObserver toggle'da fired=1, canvas/GL toggle boyunca canlı; preserveDrawingBuffer yok → mekanizma-proxy). **Dil-switcher:** aria-haspopup/expanded, 5 dil (aktif •), Escape+dış-tık kapatır, klavye (Enter açar+Tab option'a girer), **path korur** (home+subpage). **Klavye/focus-visible:** 16/16 distinct durak (trap yok), settle sonrası 16/16 `2px solid rgb(31,122,61)` offset3px. Konsol 0-error/0-warning.
- **Bulgu (record-not-fix, kullanıcı onayı):** dil değişiminde anchor düşüyor — `/en#sectors`→Almanca→`/de` (hash boş), path korunur; kök neden router.replace(pathname) next-intl hash içermez; M3 F3.4 resmi kriteri yalnız path ister (geçiyor). + bilinen dil-switcher aria-mismatch (a11y 89) record-not-fix. Kaynak değişmedi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-3.09 (sıradaki; Adım: task → `/devflow:run-task`)
**Aktif Faz:** 3 — v0.1 Versiyon-Sonu Senaryo Testi (8/9 task ✅; run-task devam ediyor)
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-29 — run-task TASK-3.08 ✅ (S7 chatbot 0-token, fresh-prod-serve PID 3508777/3511140): sanitizasyon kod-inceleme; dummy-key 6 malformed→400 (Anthropic'e ulaşmadan); key-yok→503 + Playwright offline UI (sahte-online yok, UI takılmaz); toplam API çağrısı=0; kapsam-içi bug yok. Adım: task → run-task (TASK-3.09).
