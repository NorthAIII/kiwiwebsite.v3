# VERSIONS — Feature-Versiyon Haritası

**Amaç:** Hangi feature'ın hangi versiyona dahil olduğunu tutan tek kaynak. (MODULE-MAP'in Versiyon sütunu buradan beslenir.)

> **Bağlam:** Mevcut site = "v3 (mevcut canlı)". Güçlü revize, **v0.1**'den başlayan kümülatif versiyonlarla yürür. **v0.1 tamamlandı** (3 faz: içerik + teknik borç + senaryo testi; prd-review 2026-06-29 — değişiklik yok). **v0.2 tamamlandı** (Faz 4–9: a11y + test altyapısı + mobil perf + Umami + versiyon-sonu teknik borç + senaryo testi; prd-review 2026-07-02 — PRD değişikliği yok). **v0.3 tamamlandı** (Faz 10–14: görsel cila + URL taksonomisi/SEO + Living Flow nabız + versiyon-sonu teknik borç + senaryo testi; prd-review 2026-07-05 — PRD drift düzeltmesi, vizyon değişikliği yok). **v0.4 planlandı** (re-kickoff 2026-07-16: Alpfit Plus ürün vitrini — aşağıda). Aşağıdaki feature'lar revizenin *yeni* iş birimleridir; mevcut çalışan feature'lar `_dev/MODULE-MAP.md`'de listelenir.

---

## Feature → Versiyon

| Feature | Feature Dosyası | Versiyon |
|---------|-----------------|----------|
| Crew OS bölümü içerik düzeltmesi (flagship platformu satar) | `features/crew-os-bolumu.md` | v0.1 |
| "Nasıl çalışır" 4 adım (Analiz·Çözüm·Otomasyon·Raporlama) | `features/nasil-calisir-4-adim.md` | v0.1 |
| Sektörler derinleştirme (6 sektör, özgün içerik) | `features/sektorler-derinlestirme.md` | v0.1 |
| Site geneli TR kopya revizesi (marka sesi) | `features/kopya-revizesi.md` | v0.1 |
| Alpfit Plus ürün vitrini (F2.8 zengin yeniden tasarım) | `features/alpfit-plus.md` | v0.4 |

**v0.1 teması:** Türkçe içerik & mesaj revizesi — **ana sayfa odaklı, cerrahi** (prd-refine 2026-06-28 reframe: kopya zaten güçlü; baştan-sona rewrite değil, nokta-atışı düzeltmeler + ses taraması). TR tek kaynak; çeviri versiyon-sınırında (bkz. VIZYON §5).

**v0.1 ağırlık merkezi (bulgu önceliği, `features/kopya-revizesi.md` F1–F6):** F1 Nasıl Çalışır 4 adım (yapısal) + F2 gym paneli tek-otomasyona (yapısal) = asıl iş; F5 dürüstlük taraması + F6 hero ikincil CTA = ses cilası; F3/F4 karara bağlandı.

---

## Tamamlanan Versiyon: v0.2 — a11y & Performans + teknik temel ✅

> Öncelik prd-review (2026-06-29) ile sabitlendi; v0.2 Faz 4–9 ile tamamlandı (prd-review 2026-07-02 — PRD değişikliği yok). Gerekçe: v0.1 versiyon-sonu ölçümü brief-bütçe açığını keşfetti — en güçlü, ortam-bağımsız açık kalem.

- **a11y 89 → ≥100** ✅ — ana sayfa + 5 alt sayfa çift-tema (Faz 4 + Faz 8). *Yeni korunan taban.*
- **mobil perf 87 → 90 / LCP −12%** — adanmış perf işi yapıldı (Faz 6); brief bütçesi (≥95 / <2.5s) lab'da **açık kaldı** (Lantern render-timing körlüğü) → nihai doğrulama gerçek-cihaz/Vercel field'a bağlandı, hedef düşmedi (ILKELER #2b).
- **Test altyapısı (D1)** ✅ — 3 katman (Vitest + Playwright/axe) + ilk CI (Faz 5).
- **Umami analytics (E1)** ✅ — kod Faz 7'de; canlı +1 **v0.2 production release**'te (2026-07-02) panel ekran görüntüsüyle doğrulandı (`umami.kiwiailab.com` realtime "1 Online" + Views 1). Detay → `docs/UMAMI-ANALYTICS.md`, `docs/RELEASE-v0.2.md`.

## Tamamlanan Versiyon: v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO) ✅

> Re-kickoff (2026-07-02) ile sabitlendi; Faz 10–14 ile tamamlandı (prd-review 2026-07-05 — vizyon değişikliği yok, yalnız v0.3'ün kapattığı kararlara PRD drift hizalaması). Gerekçe: Craft en üst eksen (ILKELER); v0.1 (içerik) → v0.2 (a11y/perf/teknik) → v0.3 (görsel cila) doğal ilerleme.

- **A1 — Logo hizalama** ✅ — kök neden (3 kopya-kod lockup) ortak `<Logo>` bileşeniyle her yüzeyde kalıcı çözüldü (Faz 10). M3.
- **A3 — CTA kartı affordance + scroll göstergesi** ✅ — ince ok affordance + scroll göstergesi orantı (Faz 10, saf CSS/görsel). M2 + M3.
- **B1 — Living Flow yeşil nabız kapsamı** ✅ — karar-gate **uygula-onayla** (imza riski gerçekleşmedi; tek WebGL context + adaptif `--flow-veil` ile imza güçlendi, 3 gate geçti) (Faz 12). M1.
- **SEO — URL taksonomisi** ✅ — public `/crew-os` 5-locale SSG + `/bunker-os` kalıcı 308 redirect + i18n namespace `bunker`→`crew` 5-dil senkron + sitemap/canonical/alternates + iç linkler temiz (Faz 11); `/forum`→404 reddedildi, mevcut redirect korundu + Faz 13'te `/forum` locale gap kök-çözümle kapandı. VIZYON §3 açık konusu kapandı. M6 + M2 + M4.
- **Versiyon-sonu teknik borç (SEO-metadata hijyeni)** ✅ — alt-sayfa self-canonical + 5-locale hreflang + config redirect denetimi (Faz 13).
- **Versiyon-sonu senaryo testi** ✅ — S1–S9 uçtan-uca, UAT 11/11, 0 kaynak değişimi, 0 kapsam-içi bug (Faz 14).

**v0.3 guardrail'leri regresyonsuz korundu:** a11y=100 çift-tema (ana sayfa + 5 alt sayfa) · perf tabanı (masaüstü 100 / LCP 0.69s / CLS 0 · mobil 90 / LCP ~2.7s) · CLS≈0 · i18n 5-dil parite · marka sesi yasakları.

> 🚀 **v0.3 production release tamamlandı (2026-07-05):** `revize/devflow-kurulum`→`main` merge (`2ea09b7`) + Vercel deploy `success`; canlı duman testi ✅ (`/crew-os` 200, `/bunker-os`→`/crew-os` 308, `/forum`→`/` 308, "Crew OS" görünür / "Bunker OS" 0×). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env ayarlı değil** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil, v0.2'den beri açık).

## Tamamlanan Versiyon: v0.4 — Alpfit Plus ürün vitrini ✅

> Re-kickoff (2026-07-16) ile planlandı; Faz 15–17 ile tamamlandı (prd-review 2026-07-21 — **vizyon değişikliği yok**; tek girdi versiyon boyunca biriken chatbot sağlayıcı kararı → sonraki versiyonlara mezun edildi, aşağıda). Tek merkez iş: **Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı** (M2 merkez; M4 i18n, M1 token, M6 SEO). Gerekçe: Craft en üst eksen (ILKELER); Alpfit ayrı/bağımsız dikey ürün (VIZYON §3). Tasarım referansı: `docs/alpfit-plus-artifact.html`; feature: `features/alpfit-plus.md`.

- **Alpfit Plus sayfası** ✅ — artifact düzenine port (Hero+before/after · Sorun · 4 Rol · saf CSS/SVG mobil mockup'lar · 9 Özellik · Neden/rekabet · Fiyat ₺1.500+KDV · Yol haritası+Store · Kapanış); `components/alpfit/` 8 bileşen + `alpfit` 133-leaf 5-dil namespace + tek `--color-surface` token (Faz 15: 7 task, UAT 16/16). İmza Living Flow hero'da korundu; ekran görüntüleri düştü.
- **Dürüstlük 4/4 gerçek** ✅ — canlı pilot / public fiyat / ürün iddiaları mevcut / "18 rakip" gerçek → içerik olduğu gibi korundu.
- **Versiyon-sonu teknik borç** ✅ — gym PNG disk hijyeni + npm audit (2 moderate, Next'e gömülü postcss, sömürülemez → kabul+kayıt) (Faz 16).
- **Versiyon-sonu senaryo testi** ✅ — S1–S9 uçtan-uca, UAT 12/12, 0 kaynak değişimi, 0 kapsam-içi bug (Faz 17).

**v0.4 guardrail'leri regresyonsuz korundu:** a11y=100 çift-tema · perf tabanı · CLS≈0 · i18n 5-dil parite · marka sesi yasakları. Sahipli craft kalemi: alt-sayfa masaüstü imza alanı boşluğu (BULGU-S3; Craft üst eksen → sonraki craft cila adayı).

> 🚀 **v0.4 TR production release tamamlandı (2026-07-16, canlı `f173234`):** `revize/alpfit-plus`→`main` ff-merge + canlı duman testi ✓; TR tam, non-TR stale-TR ertelendi (aday versiyon). **⚠️ Açık: canlı chatbot `/api/chat` 503 (offline)** — v0.5 Groq geçişiyle çözülecek (aşağıda; `ANTHROPIC_API_KEY` bekleme kalemi kararla geçersizleşti).

## Sonraki Aday Versiyonlar

> v0.5/v0.6 sırası chatbot kararında (DECISIONS 2026-07-21) kullanıcı-onaylı sabitlendi; kesin damgalama re-kickoff'ta. Diğer adaylar numarasız — sıra prd-refine / discuss-phase'de netleşir.

- **v0.5 — Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (öne alındı: chatbot canlıda offline). Anthropic Opus → **Groq · `llama-3.3-70b-versatile`** ($0/kartsız; DECISIONS 2026-07-21'de 5 kabul kriteri). Canlı 503/offline'ı da çözer. M5 merkez (`route.ts` + system prompt), M4 (TR-birincil dil algılama), OVERVIEW stack satırı. Chatbot per-mesaj max-byte cap (hardening) bu fazın adayı.
- **v0.6 — Booking + takvim entegrasyonu** (v0.5'ten ertelendi). Otomatik demo/randevu + botun takvime erişimi; tool/function calling + takvim sistemi + PII/spam güvenliği (Cal.com/Google Calendar seçimi açık). Ayrı ve daha büyük iş.
- **Çeviri senkronu (numarasız aday):** alt sayfa EN/AR/DE/ES güncellemesi — alpfit stale-TR dahil, **ziyaretçi-görünür** (versiyon-sınırı işi; TR tek kaynak, VIZYON §5). + **AR-dil stratejisi** açık kalem.
- **Craft cila (numarasız aday):** alt-sayfa masaüstü imza alanı boşluğu (BULGU-S3; Craft üst eksen).
- **Bekleyen veri/entegrasyon:** sosyal medya gerçek linkleri (C1), Weekend demo ("no 36" / C2), gerçek metrikler/vaka verileri (C4), alt sayfa içerik derinleştirme. Sahipli teknik açıklar: TB-3 runtime tohumu · brief mobil perf · npm audit.

---

**Son Güncelleme:** 2026-07-21 — prd-review (v0.4): v0.4 (Alpfit Plus) "Tamamlanan Versiyon ✅" işaretlendi (Faz 15–17; vizyon değişikliği yok). Versiyon boyunca biriken chatbot sağlayıcı kararı (NOTES → DECISIONS 2026-07-21) sonraki versiyonlara mezun edildi: **v0.5 = Groq chatbot geçişi + canlıya alma** (öncelikli), **v0.6 = booking/takvim**; çeviri senkronu + craft cila numarasız aday. Aktif Versiyon re-kickoff'ta v0.5'e damgalanacak.
