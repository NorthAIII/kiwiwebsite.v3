# MODULE-MAP — Modül ve Feature Haritası

**Amaç:** Projenin modüler yapısını ve feature haritasını özetlemek
**Ne zaman okunmalı:** Planlama ve review sırasında
**Not:** Modül detayları `modules/` klasöründeki ayrı dosyalardadır. Bu doküman sadece genel harita ve matristir.

> **DevFlow-öncesi durum:** Site DevFlow eklenmeden önce inşa edildi. Aşağıdaki feature'ların tamamı mevcut kodda **çalışır halde** (Durum ✅), ama hiçbiri bir DevFlow fazından geçmediği için Faz sütunu "—"dır. Güçlü revize ilerledikçe, yeniden ele alınan/eklenen feature'lar için yeni feature satırları ve faz atamaları eklenecektir.

> **Taksonomi (DECISIONS 2026-06-27):** Bayrak katman sitede her zaman **Crew OS** (public ad); **Bunker OS** iç kod adıdır, kullanıcıya görünmez (iki ürün değil, aynı şey). **Alpfit** ayrı, bağımsız dikey üründür. Aşağıda F2.5 (ana sayfa Crew OS teaser) ve F2.7 (Crew OS showcase sayfası) bu ada göre adlandırıldı — sayfanın route'u **artık public `/crew-os`** (Faz 11'de rename edildi; eski `/bunker-os` → kalıcı 308 redirect, 5 locale). İç kod adı yalnız kod dosya/dizin adlarında kalır (`components/bunker-os/`, `Bunker.tsx` — taksonomi izin veriyor, URL'de sızmıyor).

---

## Modül Haritası

```
Kiwi Website v3
├── M1: Living Flow & Tasarım Sistemi
│   ├── F1.1: Living Flow WebGL alanı (FlowCanvas/GLSL)   → —
│   ├── F1.2: Degradasyon & fallback (LivingFlow wrapper) → —
│   ├── F1.3: FlowScrim overlay (metin okunabilirliği)     → —
│   └── F1.4: Tasarım token sistemi & dark mode (globals)  → —
├── M2: Sayfalar & Bölümler (IA/İçerik)
│   ├── F2.1: Ana sayfa kompozisyonu                       → —
│   ├── F2.2: Hero bölümü                                  → —
│   ├── F2.3: "Nasıl çalışır" bölümü (şu an 3 adım)        → —
│   ├── F2.4: Sektör çözümleri (interaktif seçici)         → —
│   ├── F2.5: Crew OS teaser bölümü (ana sayfa flagship)   → —
│   ├── F2.6: Bülten/Forum bölümü + makale sayfaları       → —
│   ├── F2.7: Crew OS showcase sayfası (route /crew-os)    → —
│   ├── F2.8: Alpfit (spor salonu yazılımı) sayfası        → —
│   └── F2.9: Vaka çalışmaları sayfası                     → —
├── M3: Etkileşim & UX Primitives
│   ├── F3.1: Scroll & hareket altyapısı (Lenis+GSAP+Reveal) → —
│   ├── F3.2: Cursor & manyetik etkileşim                  → —
│   ├── F3.3: Navigasyon & header (Nav/PageHeader/KiwiMark) → —
│   └── F3.4: Tema & dil kontrolleri                       → —
├── M4: i18n & Yerelleştirme
│   ├── F4.1: next-intl routing & middleware (5 dil)       → —
│   ├── F4.2: Çeviri içerikleri (messages/*.json)          → —
│   └── F4.3: RTL desteği (AR)                             → —
├── M5: Chatbot & API
│   ├── F5.1: Chat API endpoint (/api/chat, streaming)     → —
│   └── F5.2: Chatbot UI (thinking state, offline fallback) → —
└── M6: SEO & Deploy Altyapısı
    ├── F6.1: Metadata & canonical/alternates              → —
    ├── F6.2: Sitemap & robots                             → —
    ├── F6.3: Next config & build                          → —
    └── F6.4: Vercel deploy & env yönetimi                 → —
```

---

## Modüller Arası Bağımlılıklar

```
M1 (Living Flow & Tasarım) ─┬─> M2 (Sayfalar)  <── M3 (UX Primitives)
                            │        │
                            │        └─> M5 (Chatbot)
M4 (i18n) ──────────────────┴────────> M2, M3, M5  (tüm görünür metin)
M6 (SEO/Deploy) ─────────────────────> tüm modüller (build/yayın katmanı)
```

- **M1 → M2/M3/M5:** Tasarım token'ları (renk/tipografi/tema) ve Living Flow tüm görünür yüzeyin tabanıdır; Hero, Crew OS (route `/crew-os`), Alpfit sayfaları ve chatbot "thinking" durumu Living Flow motifini kullanır.
- **M3 → M2:** Bölümler Reveal/Magnetic/SmoothScroll primitive'lerine dayanır.
- **M4 → M2/M3/M5:** Tüm görünür metin i18n'den gelir; Nav/Footer dil değiştirici M4'e bağlı.
- **M5 → M1:** Chatbot "thinking" animasyonu Living Flow motifini taklit eder.
- **M6:** Diğer tüm modüllerin üzerine oturan yayın/SEO katmanı (metadata route'ları i18n'e bağlı).

---

## Modül Dokümanları

| Modül | Doküman | Açıklama |
|-------|---------|----------|
| M1 | `modules/M1-LivingFlow-TasarimSistemi.md` | WebGL imza alanı + tasarım token'ları & dark mode |
| M2 | `modules/M2-Sayfalar-Bolumler.md` | Route'lar + bölüm/showcase bileşenleri (IA & içerik) |
| M3 | `modules/M3-Etkilesim-Primitives.md` | Reveal, Magnetic, Cursor, SmoothScroll, Nav, kontroller |
| M4 | `modules/M4-i18n.md` | next-intl routing/middleware, çeviriler, RTL |
| M5 | `modules/M5-Chatbot-API.md` | `/api/chat` streaming + Chatbot UI |
| M6 | `modules/M6-SEO-Deploy.md` | Metadata, sitemap/robots, next config, Vercel |

---

## Feature-Faz Matrisi

> **Durum (DevFlow-öncesi):** ✅ = mevcut kodda var ve çalışıyor (Faz "—" = DevFlow fazı dışında inşa edildi). Revize fazları girildikçe ilgili feature'lar için yeni satır/faz atanır.

| Feature | Modül | Versiyon | Faz | Durum |
|---------|-------|----------|-----|-------|
| F1.1: Living Flow WebGL alanı | M1 | v3 (mevcut) | — | ✅ |
| F1.2: Degradasyon & fallback | M1 | v3 (mevcut) | — | ✅ |
| F1.3: FlowScrim overlay | M1 | v3 (mevcut) | — | ✅ |
| F1.4: Tasarım token & dark mode | M1 | v3 (mevcut) | — | ✅ |
| F2.1: Ana sayfa kompozisyonu | M2 | v3 (mevcut) | — | ✅ |
| F2.2: Hero | M2 | v3 (mevcut) | — | ✅ |
| F2.3: "Nasıl çalışır" (3 adım) | M2 | v3 (mevcut) | — | ✅ |
| F2.4: Sektör çözümleri | M2 | v3 (mevcut) | — | ✅ |
| F2.5: Crew OS teaser bölümü | M2 | v3 (mevcut) | — | ✅ |
| F2.6: Bülten/Forum + makaleler | M2 | v3 (mevcut) | — | ✅ |
| F2.7: Crew OS showcase sayfası (route /crew-os) | M2 | v3 (mevcut) | — | ✅ |
| F2.8: Alpfit sayfası | M2 | v3 (mevcut) | — | ✅ |
| F2.9: Vaka çalışmaları sayfası | M2 | v3 (mevcut) | — | ✅ |
| F3.1: Scroll & hareket altyapısı | M3 | v3 (mevcut) | — | ✅ |
| F3.2: Cursor & manyetik etkileşim | M3 | v3 (mevcut) | — | ✅ |
| F3.3: Navigasyon & header | M3 | v3 (mevcut) | — | ✅ |
| F3.4: Tema & dil kontrolleri | M3 | v3 (mevcut) | — | ✅ |
| F4.1: next-intl routing & middleware | M4 | v3 (mevcut) | — | ✅ |
| F4.2: Çeviri içerikleri | M4 | v3 (mevcut) | — | ✅ |
| F4.3: RTL (AR) | M4 | v3 (mevcut) | — | ✅ |
| F5.1: Chat API endpoint | M5 | v3 (mevcut) | — | ✅ |
| F5.2: Chatbot UI | M5 | v3 (mevcut) | — | ✅ |
| F6.1: Metadata & alternates | M6 | v3 (mevcut) | — | ✅ |
| F6.2: Sitemap & robots | M6 | v3 (mevcut) | — | ✅ |
| F6.3: Next config & build | M6 | v3 (mevcut) | — | ✅ |
| F6.4: Vercel deploy & env | M6 | v3 (mevcut) | — | ✅ |
| **— v0.1 revize iş birimleri (ana sayfa içerik & ses) —** | | | | |
| R1: "Nasıl çalışır" 3→4 adım (Analiz·Çözüm·Otomasyon·Raporlama) | M2 (+M4) | v0.1 | 1 | ✅ |
| R2: Sektörler gym paneli tek-otomasyon desenine | M2 (+M4) | v0.1 | 1 | ✅ |
| R3: Crew OS bölümü içerik teyidi (panel akışları bırakıldı) | M2 (+M4) | v0.1 | 1 | ✅ |
| R4: Ana sayfa TR kopya/ses revizesi (F5 dürüstlük + F6 hero ikincil CTA) | M2 + M4 | v0.1 | 1 | ✅ |
| **— v0.1 versiyon-sonu teknik borç iş birimleri —** | | | | |
| TD1: Non-TR çeviri senkronu (R1 step + R2 gym + F6 CTA değerleri → EN/AR/DE/ES) | M4 (+M2) | v0.1 | 2 | ✅ |
| TD2: Ölü anahtar hijyeni (`forum.articles.{one..four}` + `proof.{label,note}` → 5 dilden sil) | M4 (+M2) | v0.1 | 2 | ✅ |
| TD3: Ana sayfa perf/Lighthouse doğrulama (mobil+masaüstü, brief bütçesi + taban) | M6 | v0.1 | 2 | ✅ |
| **— v0.1 versiyon-sonu senaryo testi (Faz 3 — çapraz doğrulama, yeni feature üretmez) —** | | | | |
| S1–S8: v0.1 ana sayfa uçtan-uca senaryo doğrulaması (giriş/yolculuk/mod/kontrol/taksonomi/5-dil/chatbot/adversarial) | tümü | v0.1 | 3 | ✅ |
| **— v0.2 a11y iş birimleri (Faz 4 — ana sayfa erişilebilirlik 89→100) —** | | | | |
| A11Y1: Renk kontrastı WCAG AA (marka yeşili imza korunur, bağlam-özel; soluk gri metinler eşiğe) | M1 (+M2) | v0.2 | 4 | ✅ |
| A11Y2: Hero `<dl>`/`dlitem` geçersiz markup düzeltme | M2 | v0.2 | 4 | ✅ |
| A11Y3: Dil-switcher aria-mismatch (label-content-name) düzeltme | M3 (+M4) | v0.2 | 4 | ✅ |
| **— v0.2 teknik temel iş birimleri (Faz 5 — test altyapısı D1, kümülatif harness + tohum) —** | | | | |
| D1.1: Test harness kurulumu (Vitest+RTL+jest-dom / @playwright/test / @axe-core/playwright + config) | M6 (infra, çapraz) | v0.2 | 5 | ✅ |
| D1.2: i18n 5-dil parite tohum testi (Vitest — eksik anahtar = fail) | M4 | v0.2 | 5 | ✅ |
| D1.3: a11y regresyon tohum testi (Playwright+axe, `/` light+dark 0 ihlal) | M1–M3 (a11y) | v0.2 | 5 | ✅ |
| D1.4: CI iskeleti (ilk GitHub Actions: build + Vitest job + Playwright/a11y ayrı job) | M6 | v0.2 | 5 | ✅ |
| D1.5: Kümülatif test convention notu (test yeri/koşma + "her feature kendi testini ekler") | M6 / docs | v0.2 | 5 | ✅ |
| **— v0.2 mobil perf iş birimleri (Faz 6 — ana sayfa TR `/` mobil perf/LCP, brief hedef / craft tavan) —** | | | | |
| P1: WebGL-dışı mobil perf kazanımları (font/JS bundle/asset/render-path; imza dokunulmaz) | M6 (+M1) | v0.2 | 6 | ✅ |
| P2: Living Flow mobil degradasyon ayarı (DPR cap/particle/erken static; craft korunur) | M1 | v0.2 | 6 | ❌ İptal |
| **— v0.2 analytics iş birimi (Faz 7 — site-geneli ölçüm) —** | | | | |
| E1: Umami self-hosted analytics (`next/script`, `[locale]/layout.tsx` head, afterInteractive; pageview-only, canlıda gözle doğrulanır) | M6 | v0.2 | 7 | 🟡 |
| **— v0.2 versiyon-sonu teknik borç iş birimleri (Faz 8) —** | | | | |
| TD4: `text-pulse` ink-panel dark-inversion süpürmesi (alt sayfalar; `--color-pulse-ink` swap yay) | M1 (+M2/M3) | v0.2 | 8 | ✅ |
| TD5: Alt-sayfa derin a11y denetimi (5 alt sayfa, 5 dil/AR RTL derin; ana sayfa çıtası a11y=100 çift-tema + axe WCAG-AA 0) | M2 (+M1/M3/M4) | v0.2 | 8 | ✅ |
| TD6: Alt-sayfa a11y kümülatif regresyon tohumu + CI (Faz 5 harness genişletme) | M6 (+M1-M3) | v0.2 | 8 | ✅ |
| **— v0.2 versiyon-sonu senaryo testi (Faz 9 — çapraz doğrulama, yeni feature üretmez) —** | | | | |
| S1–S9: v0.2 ana sayfa + 5 alt sayfa uçtan-uca senaryo doğrulaması (giriş/yolculuk/mod/kontrol/taksonomi/5-dil/chatbot/v0.2-guardrail/adversarial) | tümü | v0.2 | 9 | ✅ |
| **— v0.3 görsel cila iş birimleri (Faz 10 — saf CSS/görsel craft; imza/davranış/içerik değişmez) —** | | | | |
| A1: Logo/marka işareti hizalama (KiwiMark her yüzeyde: Nav + varsa PageHeader/Footer, tutarlı) | M3 (+M1) | v0.3 | 10 | ✅ |
| A3a: Hero CTA kartı affordance (Alpfit/Crew OS `<Link>` ince/zarif tıklanabilir; kart zaten Link) | M2 (+M3) | v0.3 | 10 | ✅ |
| A3b: Hero scroll göstergesi ölçekleme (merkez-alt "Kaydır" doğru ölçek/konum; desktop-only korunur) | M2 (+M1) | v0.3 | 10 | ✅ |
| **— v0.3 URL taksonomisi / SEO iş birimleri (Faz 11 — iç-ad URL sızıntısı kapatma; içerik/davranış/tasarım değişmez) —** | | | | |
| SEO1: `/bunker-os` → `/crew-os` route rename + kalıcı redirect (5 locale) + sitemap/canonical/alternates | M6 (+M2) | v0.3 | 11 | ✅ |
| SEO2: i18n namespace `bunkerOs`/`bunker` → crew rename (5-dil eşzamanlı; değer stale kalabilir) | M4 (+M2) | v0.3 | 11 | ✅ |
| SEO3: İç link temizliği (`/bunker-os` → `/crew-os`; kırık link/çift-redirect yok) | M2 (Hero/Bunker + tüketiciler) | v0.3 | 11 | ✅ |
| **— v0.3 Living Flow nabız kapsamı (Faz 12 — karar-gate'li imza işi; içerik/davranış değişmez) —** | | | | |
| B1: Living Flow nabız kapsamı — kontrollü aşağı-taşıma (sürekli soluk iplik, desktop-öncelik, bölüme-uyarlanan opaklık) VEYA iptal-kaydet; imza/reduced-motion/a11y kontrast=100/perf tabanı korunur | M1 (+M2) | v0.3 | 12 | 🔄 |

**Durum simgeleri:**
- ⬜ **Bekliyor** — Fazı henüz başlamadı
- 🔄 **Devam ediyor** — Fazı aktif, task'lar çalışılıyor (discuss-phase'de faz başlatıldığında set edilir)
- 🟡 **Kısmen tamamlandı** — Bazı task'ları bitti ama tamamı değil (bazıları sonraki fazlara kaldı)
- ✅ **Tamamlandı** — Tüm kabul kriterleri karşılandı, UAT'tan geçti (review-phase'de set edilir)
- ❌ **İptal** — Faz içinde bilinçle koşulmadı/iptal edildi (kod değişmedi); gerekçe `docs/DECISIONS.md`'de

> **E1 (Umami analytics) 🟡 Kısmen (Faz 7, 2026-07-01):** Kod-tarafı tam — bileşen + `[locale]/layout.tsx` head entegrasyonu + izole render testi ✅, perf regresyonsuz ✅ (7.01/7.02), UAT 1-8 ✅, 8 kalite ekseni ✅. Milestone'un **canlı gözle-doğrulama çekirdeği** (S9-10: kiwiailab.com panelinde +1) yapısal kısıt gereği (`data-domains=kiwiailab.com` preview saymaz + merge = tüm revizeyi ilk kez production'a almak) **v0.2 production release** adımına bilinçle ertelendi → o release sonrası canlıda kapanınca ✅ olur. Dürüst kayıt (sahte-geçmiş engellendi, verify re-run kanıtı); gerekçe → `phases/PHASE-7.md` + `docs/DECISIONS.md` 2026-07-01.
>
> **P2 (Living Flow mobil degradasyon) ❌ İptal (Faz 6, 2026-06-30):** craft-gate'te iptal — müdahale gerekçesi kanıtlı bir Lantern lab artefaktıydı (gerçek-cihaz açığı değil), imza Living Flow simüle-sayı için riske atılmadı. Kod değişmedi. Kalan brief mobil açık dürüstçe kaydedildi (`docs/DECISIONS.md` 2026-06-30). P1 (L1+L2+L3) ✅ ölçülebilir iyileşme sağladı (sürücü L3).

> Modül detayları (sorumluluk, feature kabul kriterleri, edge case'ler) → `modules/MX-ModulAdi.md`
> Versiyon sütunu PRD'deki VERSIONS.md'den aktarılır. Faz sütunu sadece planlanmış fazlar için doldurulur, henüz planlanmamış feature'lar "—" kalır.
> **R1–R4 = v0.1 revize iş birimleri** (kaynak: `_dev/PRD/features/` → `nasil-calisir-4-adim.md`, `sektorler-derinlestirme.md`, `crew-os-bolumu.md`, `kopya-revizesi.md`). Mevcut F2.3/F2.4/F2.5 + M4 üstüne **cerrahi** inşa ederler (baseline ✅ satırları korunur). Faz numarası verilmedi — tek v0.1 içerik fazı discuss-phase'de damgalanır (PHASES.md → Sıradaki Fazlar).

---

**Son Güncelleme:** 2026-07-02 — discuss-phase 12: B1 (Living Flow nabız kapsamı) feature satırı eklendi ve **Faz 12**'ye atandı (🔄); kapsam kontrollü aşağı-taşıma (sürekli soluk iplik / desktop-öncelik / bölüme-uyarlanan opaklık) veya iptal-kaydet — karar-gate'li. v0.3 içerik faz konusu kalmadı; Faz 12 bitince versiyon-sonu sabit fazları gelir.
