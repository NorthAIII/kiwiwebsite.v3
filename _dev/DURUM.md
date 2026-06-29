# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-29 — research-phase 4: a11y araştırma bulguları yazıldı. Kontrast sorunu hue değil opaklık/soluk-token (baseline stale); kararlar K1-K6 (adım no aria-hidden, ink-faint token koyulaştır, hero dl kaldır, dil-switcher aria locale-kod, cream-on-ink opaklık, Task 1=re-ölçüm). Aktif Faz 4, Adım plan.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100), ana sayfa. 🔄 Devam ediyor (araştırma tamam).
**Adım:** plan — araştırma ✅ → sıradaki: `/devflow:plan-phase 4` (yeni oturum)
**İlerleme:** Araştırma bulguları yazıldı (research-phase 4). Kontrast = opaklık/soluk-token (hue değil; baseline stale → Task 1 re-ölçüm). Kararlar K1-K6 + tam kontrast envanteri PHASE-4'te. Henüz task yok (plan-phase'de).
**Son Faz Dokümanı:** `phases/PHASE-4.md` (🔄 aktif)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Yok — Faz 4 araştırması bitti ama task'lar henüz yazılmadı (plan-phase'de).
**Durum:** Aktif task yok; sıradaki adım Faz 4 plan
**İlerleme:** Adım plan → `/devflow:plan-phase 4` (yeni oturum)

---

## Task Durumu (Aktif Faz)

> Faz 4 (v0.2 a11y) girildi ama task'lar henüz yazılmadı — kapsam tartışması bitti, research → plan-phase task'ları üretecek. Tablo plan-phase 4'te doldurulur.

_(Faz 4 task'ı henüz yok — plan-phase'de oluşturulacak.)_

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

**Aktif Task:** Yok — Faz 4 araştırması bitti; sıradaki: `/devflow:plan-phase 4`
**Aktif Faz:** 4 — v0.2 erişilebilirlik (a11y 89→100) 🔄; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-29 — research-phase 4: a11y araştırma bulguları yazıldı. Kontrast sorunu hue değil opaklık/soluk-token (baseline stale); kararlar K1-K6 (adım no aria-hidden, ink-faint token koyulaştır, hero dl kaldır, dil-switcher aria locale-kod, cream-on-ink opaklık, Task 1=re-ölçüm). Aktif Faz 4, Adım plan.
