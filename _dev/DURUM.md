# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **prd-review (v0.2) tamamlandı.** Karar: **perf satırı hizalandı, başka PRD değişikliği yok** — vizyon/taksonomi/feature'lar v0.2 boyunca doğrulandı (gerilim yok). ILKELER #2(b) gerçekliğe hizalandı: a11y ≥100 v0.2'de ulaşıldı (yeni taban); perf/LCP brief bütçesi lab'da açık kaldı (adanmış iş yapıldı, Lantern körlüğü), nihai doğrulama gerçek-cihaz/Vercel field'a bağlandı (hedef düşmedi). **Versiyon Sonu Durumu `prd_review_bekliyor`→`içerik_fazları` sıfırlandı; Aktif Versiyon v0.2'de bırakıldı (2a — sıradaki versiyon re-kickoff'ta belirlenir).** Sıradaki adım: **re-kickoff** (`/devflow:kickoff`). Öneri: fresh oturumda `/devflow:audit-docs` (statik doküman drift mutabakatı). Bekleyen: v0.2 production release (main merge + Umami canlı +1).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** — (faz döngüsü dışı) — v0.2 versiyon-sonu fazları tamamlandı: Faz 9 (senaryo testi) ✅, Faz 8 (teknik borç) ✅; içerik fazları Faz 4 (a11y) ✅, 5 (test altyapısı) ✅, 6 (mobil perf) ✅, 7 (Umami E1) ✅. **prd-review (v0.2) tamamlandı** (perf satırı hizalandı, başka değişiklik yok). Sıradaki adım **re-kickoff** (`/devflow:kickoff`) — değişiklikleri proje yapısına yansıt + sıradaki versiyonu belirle.
**Adım:** — (faz döngüsü dışı; Versiyon Sonu Durumu = `içerik_fazları` sıfırlandı). prd-review 2026-07-02 tamamlandı; Aktif Versiyon v0.2'de bırakıldı (2a, sıradaki versiyon re-kickoff'ta).
**İlerleme:** review-phase 9 (2026-07-02) tamamlandı — Faz 9 ✅ **Tamamlandı**. Suite-first hibrit metodoloji + bağımsız yeniden-doğrulama (kör onay yok); v0.2 birikimi (a11y=100 çift-tema + `test:e2e` 52 + Umami kod-tarafı + perf taban + CI) uçtan-uca regresyonsuz. 8 kalite ekseni ✅ (Güvenlik/Yerelleştirme'de bilinçli-ertelenmiş kayıtlar: TB-C, non-TR stale). **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 (S9-10 Faz 7) + genel canlı duman testi o adımda kapanır. **Sahipli açıklar (prd-review'a taşındı, record):** non-TR alt-sayfa stale (4 sayfa ar/de/es, versiyon-sınırı), brief mobil perf (gerçek-cihaz duvarı), `/bunker-os`→`/crew-os` redirect + çıplak `/forum`→404 (M6 görsel/SEO versiyonu), dil-seti/AR stratejisi, TB-C npm audit (3 moderate).
**Son Faz Dokümanı:** `phases/PHASE-9.md` (✅ Tamamlandı — 9 task 9.01–9.09 ✅ + UAT 14/14 + retrospektif/kalite kontrol). Faz 8 ✅ `phases/PHASE-8.md`.

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **Aktif task yok** — Faz 9 (v0.2 senaryo testi) ✅ + **prd-review (v0.2) ✅** tamamlandı, faz döngüsü dışı. Sıradaki adım **re-kickoff** (`/devflow:kickoff`, task değil). Düzeltme task'ı yok (14/14 UAT ✅, 0 kapsam-içi bug).
**Durum:** Faz 9 ✅ — 9.01–9.09 ✅ (9/9) + UAT 14/14 + review tamam. Faz 8 tüm task'ları ✅ (8.01→8.06) archive'da. Versiyon Sonu Durumu = `içerik_fazları` (prd-review sıfırladı); Aktif Versiyon v0.2 (2a).
**İlerleme:** prd-review (v0.2) 2026-07-02 tamamlandı — perf satırı hizalandı (ILKELER #2(b)), başka PRD değişikliği yok; SESSION-NOTES v0.2 bağlamına güncellendi. Sıradaki = re-kickoff.

---

## Task Durumu (Aktif Faz)

> Faz 9 (senaryo testi) ✅ Tamamlandı — 9 task, **9.01–9.09 ✅ (9/9)** + UAT 14/14 + review; hepsi archive'da. Faz 8 ✅ (8.01-8.06, detay `phases/PHASE-8.md`); Faz 7 (Umami E1) ✅; Faz 6 ✅ (6.06 ❌ iptal); Faz 5 ✅; Faz 4 ✅ — hepsi archive'da. **Faz döngüsü dışı: sıradaki zorunlu adım prd-review.**

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 9.01 | TASK-9.01 | ✅ Tamamlandı | S1 — giriş/yönlendirme matrisi (curl) |
| 9.02 | TASK-9.02 | ✅ Tamamlandı | S5 + S6-render — taksonomi/dürüstlük + non-TR render bütünlüğü (curl/script-strip) |
| 9.03 | TASK-9.03 | ✅ Tamamlandı | S8-suite + S6-parite — `test:e2e` 52 + `test` 7 + CI `fast`+`a11y` yeşil |
| 9.04 | TASK-9.04 | ✅ Tamamlandı | S8-Lighthouse — a11y=100 çift-tema (6 dark kanonik + 12 light/dark axe) + perf korunan taban |
| 9.05 | TASK-9.05 | ✅ Tamamlandı | S3 — degradasyon (standalone Playwright): 57 kontrol 48✓·9 N/A·0✗; reduced/no-WebGL→StaticFlow + mobil-low→FlowCanvas + AR-RTL×dark×reduced + taşma/CLS |
| 9.06 | TASK-9.06 | ✅ Tamamlandı | S4 — kontroller & kalıcılık (standalone Playwright): 17 kontrol 17✓·0✗; tema toggle+reload kalıcılık+LivingFlow uniform (sameNode) + dil-switcher path-koru/Escape/dış-tık/klavye + klavye-only 14 öğe yeşil focus-visible |
| 9.07 | TASK-9.07 | ✅ Tamamlandı | S2 — tam TR yolculuğu + alt-sayfa çıkış/dönüş (curl+Playwright): 14 kontrol 14✓·0✗; bölüm sırası + çıkış href'leri + anchor scroll top≈0 + 4 alt-sayfa client-nav çıkış/dönüş (SPA-marker) |
| 9.08 | TASK-9.08 | ✅ Tamamlandı | S7 — chatbot 0-token (curl dummy-key + Playwright key-yok): malformed 10/10→400 + offline UI 8/8✓ + toplam API çağrısı=0; TK4 kanıtı |
| 9.09 | TASK-9.09 | ✅ Tamamlandı | S9 — adversarial/holistik (build+curl+Playwright): build temiz 37/37 SSG + 0 MISSING (30 page-locale) · JS-off SSG 6/6 okunur · race 14/14 (tema/dil/scroll-anchor tutarlı, pin-kilit yok, 0 JS hatası) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 8 task özetleri sıfırlandı** (Faz 8 detayları `phases/PHASE-8.md` + `tasks/archive/`).

**TASK-9.09 (S9 — adversarial / holistik kırma):**
- **Temiz build + tabanı:** `rm -rf .next && npm run build` **temiz** (37/37 SSG; log 71 satır **0** error/warn/fail/MISSING/deprecation); render `MISSING_MESSAGE` sweep **30 sayfa-locale → 0** (6×5, AR home dir=rtl) = regresyon tabanı.
- **JS-off SSG (curl, TR cookie) + race (standalone Playwright):** 6/6 sayfa JS'siz okunur (görünür metin 1272–4000 char, `<h1>`+nav+tek `<main>`; LivingFlow client-only→markup'ta yok=beklenen). Race **14/14** (`channel:'chrome'`+swiftshader, WebGL sanity canvas=1): tema 11-tık→`html.dark`==localStorage==aria-pressed+reload kalıcı · dil zinciri en→de→ar→es→tr→final tutarlı (AR dir=rtl) · anchor storm→#how settle+**pin/scrub kilidi yok**+6 bölüm sağlam; tüm storm'larda **0 JS/ScrollTrigger hatası**.
- **Kapsam-içi bug yok, kaynak kod değişmedi** (TK7: yeni kapsam-dışı kalem yok). Ground-truth served `/ar` h1==disk prerender `ar.html` (fresh-build, stale-server yok). Nüans: greedy `sed` metin-strip yanlış-negatif (visible=1)→node non-greedy strip.

**TASK-9.08 (S7 — chatbot 0-token: offline + sanitizasyon):**
- **Sanitizasyon kod-inceleme (`route.ts`):** apiKey gate `:21-24` **ilk** (yoksa 503) → `req.json()` try/catch parse-400 → filter **rol whitelist** (user/assistant) + `content` string+`trim>0` + `slice(-12)` **geçmiş sınırı** → sonda-user zorunlu-400 → `new Anthropic()` **`:48`**: tüm red **öncesinde** (QUALITY §7).
- **Dummy-key malformed (curl, key present-ama-geçersiz):** 10/10 girdi (geçersiz-JSON/`{}`/`[]`/not-array/trailing-assistant/**system-only enjeksiyon**/whitespace/non-string/empty-string/no-body) → **400**, Anthropic'e ulaşmadan → sıfır çağrı. **Key-yok (Playwright, `env -u`+environ count=0):** geçerli mesaj bile **503** (TK4: gate sanitizasyondan önce → naif malformed→400 yanlış-negatif); 8/8✓ — dürüst offline metni, **sahte '● online/canlı' dot YOK**, UI takılmadı, tüm `/api/chat`=503, **200-stream HİÇ**.
- **Toplam Anthropic API çağrısı=0** (gerçek key hiç, happy-path koşulmadı). Kapsam-içi bug yok, kaynak kod değişmedi. Nüans: dummy→no-key geçişinde stale `next-server` (pkill cmdline kaçırdı) → listening-PID+`kill`/`setsid` temiz restart (memory stray-server).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Aktif task yok — **Faz 9 ✅ + prd-review (v0.2) ✅** tamamlandı. Sıradaki adım **re-kickoff** (`/devflow:kickoff`, yeni oturum). Bekleyen: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** — (faz döngüsü dışı) — Faz 9 (v0.2 senaryo testi) ✅; Faz 8 ✅; Faz 7 ✅; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅. Aktif Versiyon v0.2, Versiyon Sonu Durumu: **içerik_fazları** (prd-review sıfırladı) → sıradaki adım re-kickoff.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-02 — **prd-review (v0.2) tamamlandı** — perf satırı hizalandı (ILKELER #2(b): a11y ≥100 ulaşıldı; perf/LCP lab'da açık → gerçek-cihaz/Vercel field'a bağlandı, hedef düşmedi), başka PRD değişikliği yok (vizyon/feature doğrulandı). SESSION-NOTES v0.2 bağlamına güncellendi. Versiyon Sonu Durumu `prd_review_bekliyor`→`içerik_fazları` sıfırlandı; Aktif Versiyon v0.2 (2a — sıradaki versiyon re-kickoff'ta). Sıradaki adım: **re-kickoff** (`/devflow:kickoff`); öneri: fresh oturumda `/devflow:audit-docs`. Bekleyen: v0.2 production release (main merge + Umami canlı +1).
