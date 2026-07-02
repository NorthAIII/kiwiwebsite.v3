# VERSIONS — Feature-Versiyon Haritası

**Amaç:** Hangi feature'ın hangi versiyona dahil olduğunu tutan tek kaynak. (MODULE-MAP'in Versiyon sütunu buradan beslenir.)

> **Bağlam:** Mevcut site = "v3 (mevcut canlı)". Güçlü revize, **v0.1**'den başlayan kümülatif versiyonlarla yürür. **v0.1 tamamlandı** (3 faz: içerik + teknik borç + senaryo testi; prd-review 2026-06-29 — değişiklik yok). **v0.2 tamamlandı** (Faz 4–9: a11y + test altyapısı + mobil perf + Umami + versiyon-sonu teknik borç + senaryo testi; prd-review 2026-07-02 — PRD değişikliği yok). Sıradaki aktif versiyon **v0.3** (aşağıda). Aşağıdaki feature'lar revizenin *yeni* iş birimleridir; mevcut çalışan feature'lar `_dev/MODULE-MAP.md`'de listelenir.

---

## Feature → Versiyon

| Feature | Feature Dosyası | Versiyon |
|---------|-----------------|----------|
| Crew OS bölümü içerik düzeltmesi (flagship platformu satar) | `features/crew-os-bolumu.md` | v0.1 |
| "Nasıl çalışır" 4 adım (Analiz·Çözüm·Otomasyon·Raporlama) | `features/nasil-calisir-4-adim.md` | v0.1 |
| Sektörler derinleştirme (6 sektör, özgün içerik) | `features/sektorler-derinlestirme.md` | v0.1 |
| Site geneli TR kopya revizesi (marka sesi) | `features/kopya-revizesi.md` | v0.1 |

**v0.1 teması:** Türkçe içerik & mesaj revizesi — **ana sayfa odaklı, cerrahi** (prd-refine 2026-06-28 reframe: kopya zaten güçlü; baştan-sona rewrite değil, nokta-atışı düzeltmeler + ses taraması). TR tek kaynak; çeviri versiyon-sınırında (bkz. VIZYON §5).

**v0.1 ağırlık merkezi (bulgu önceliği, `features/kopya-revizesi.md` F1–F6):** F1 Nasıl Çalışır 4 adım (yapısal) + F2 gym paneli tek-otomasyona (yapısal) = asıl iş; F5 dürüstlük taraması + F6 hero ikincil CTA = ses cilası; F3/F4 karara bağlandı.

---

## Tamamlanan Versiyon: v0.2 — a11y & Performans + teknik temel ✅

> Öncelik prd-review (2026-06-29) ile sabitlendi; v0.2 Faz 4–9 ile tamamlandı (prd-review 2026-07-02 — PRD değişikliği yok). Gerekçe: v0.1 versiyon-sonu ölçümü brief-bütçe açığını keşfetti — en güçlü, ortam-bağımsız açık kalem.

- **a11y 89 → ≥100** ✅ — ana sayfa + 5 alt sayfa çift-tema (Faz 4 + Faz 8). *Yeni korunan taban.*
- **mobil perf 87 → 90 / LCP −12%** — adanmış perf işi yapıldı (Faz 6); brief bütçesi (≥95 / <2.5s) lab'da **açık kaldı** (Lantern render-timing körlüğü) → nihai doğrulama gerçek-cihaz/Vercel field'a bağlandı, hedef düşmedi (ILKELER #2b).
- **Test altyapısı (D1)** ✅ — 3 katman (Vitest + Playwright/axe) + ilk CI (Faz 5).
- **Umami analytics (E1)** ✅ — kod Faz 7'de; canlı +1 **v0.2 production release**'te (2026-07-02) panel ekran görüntüsüyle doğrulandı (`umami.kiwiailab.com` realtime "1 Online" + Views 1). Detay → `docs/UMAMI-ANALYTICS.md`, `docs/RELEASE-v0.2.md`.

## Sıradaki Versiyon: v0.3 — Görsel & Etkileşim Cilası (+ URL taksonomisi/SEO)

> Re-kickoff (2026-07-02) ile sabitlendi (kullanıcı onayı). Gerekçe: Craft en üst eksen (ILKELER); adaylar arasında en çok işaretlenen; v0.1 (içerik) → v0.2 (a11y/perf/teknik) → v0.3 (görsel cila) doğal ilerleme. Kesin faz kapsamı/sırası discuss-phase'de netleşir.

> ✅ **v0.2 production release tamamlandı (2026-07-02):** tüm revize `main`'e merge edildi + canlı deploy (`a71adbc`); Umami canlı +1 + §3 duman testi kapandı (`docs/RELEASE-v0.2.md`). v0.3 run-task artık serbest. (Açık takip: chatbot canlı `ANTHROPIC_API_KEY` env — release engeli değil.)

**v0.3 çekirdeği:**
- **A1 — Logo hizalama** (sol-üst düzgün oturmuyor; saf görsel/CSS). M3.
- **A3 — CTA kartı affordance** (Alpfit/Crew OS kartları — zaten `<Link>`, sorun görsel) + scroll/"kaydır" göstergesi ölçekleme. M2 + M3.
- **B1 — Living Flow yeşil nabız kapsamı** (sayfanın aşağısına taşıma). ⚠️ **Craft-duyarlı, imza riski → karar-gate'li**: discuss/research'te değerlendirilir, imza/okunabilirlik/reduced-motion/perf riski kanıtlanırsa iptal edilebilir. M1.
- **SEO — URL taksonomisi:** `/bunker-os`→public `/crew-os` (route + i18n namespace `bunker`→`crew` yapısal rename **5 dil eşzamanlı** + kalıcı redirect + sitemap/canonical/alternates + iç linkler) & çıplak `/forum`→404. VIZYON §3 açık konusu burada kapanır. M6 + M2 + M4.

**v0.3 korunan guardrail'ler (regresyon yasağı):** a11y=100 çift-tema (ana sayfa + 5 alt sayfa) · perf tabanı (masaüstü 100 / LCP 0.69s / CLS 0 · mobil 90 / LCP ~2.7s) · CLS≈0 · i18n 5-dil parite (eksik anahtar yasak) · marka sesi yasakları.

## Sonraki Aday Versiyonlar (henüz planlanmadı)

> Numara/kesin versiyon atanmaz; sıra prd-refine / discuss-phase'de netleşir.

- **Çeviri senkronu:** alt sayfa EN/AR/DE/ES güncellemesi (versiyon-sınırı işi; TR tek kaynak).
- **Bekleyen veri/entegrasyon:** sosyal medya gerçek linkleri (C1), Weekend demo ("no 36" / C2), gerçek metrikler/vaka verileri (C4), chatbot → "book a call" akışı (C7), alt sayfa içerik derinleştirme.

---

**Son Güncelleme:** 2026-07-02 — v0.2 production release tamamlandı: revize `main`'e merge + canlı deploy (`a71adbc`), Umami canlı +1 ✅ (panel doğrulandı), §3 duman testi ✓. v0.3 run-task serbest. (Açık takip: chatbot canlı env key.)
