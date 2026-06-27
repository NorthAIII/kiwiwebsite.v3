# MODULE-MAP — Modül ve Feature Haritası

**Amaç:** Projenin modüler yapısını ve feature haritasını özetlemek
**Ne zaman okunmalı:** Planlama ve review sırasında
**Not:** Modül detayları `modules/` klasöründeki ayrı dosyalardadır. Bu doküman sadece genel harita ve matristir.

> **DevFlow-öncesi durum:** Site DevFlow eklenmeden önce inşa edildi. Aşağıdaki feature'ların tamamı mevcut kodda **çalışır halde** (Durum ✅), ama hiçbiri bir DevFlow fazından geçmediği için Faz sütunu "—"dır. Güçlü revize ilerledikçe, yeniden ele alınan/eklenen feature'lar için yeni feature satırları ve faz atamaları eklenecektir.

> **Taksonomi (DECISIONS 2026-06-27):** Bayrak katman sitede her zaman **Crew OS** (public ad); **Bunker OS** iç kod adıdır, kullanıcıya görünmez (iki ürün değil, aynı şey). **Alpfit** ayrı, bağımsız dikey üründür. Aşağıda F2.5 (ana sayfa Crew OS teaser) ve F2.7 (Crew OS showcase sayfası) bu ada göre adlandırıldı — sayfanın route'u **hâlâ `/bunker-os`** (iç ad URL'de sızıyor; public `/crew-os` + redirect kararı görsel/SEO versiyonuna ertelendi — açık konu, M6).

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
│   ├── F2.7: Crew OS showcase sayfası (route /bunker-os)  → —
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

- **M1 → M2/M3/M5:** Tasarım token'ları (renk/tipografi/tema) ve Living Flow tüm görünür yüzeyin tabanıdır; Hero, Crew OS (route `/bunker-os`), Alpfit sayfaları ve chatbot "thinking" durumu Living Flow motifini kullanır.
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
| F2.7: Crew OS showcase sayfası (route /bunker-os) | M2 | v3 (mevcut) | — | ✅ |
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
| R1: "Nasıl çalışır" 3→4 adım (Analiz·Çözüm·Otomasyon·Raporlama) | M2 (+M4) | v0.1 | 1 | 🔄 |
| R2: Sektörler gym paneli tek-otomasyon desenine | M2 (+M4) | v0.1 | 1 | 🔄 |
| R3: Crew OS bölümü içerik teyidi (panel akışları bırakıldı) | M2 (+M4) | v0.1 | 1 | 🔄 |
| R4: Ana sayfa TR kopya/ses revizesi (F5 dürüstlük + F6 hero ikincil CTA) | M2 + M4 | v0.1 | 1 | 🔄 |

**Durum simgeleri:**
- ⬜ **Bekliyor** — Fazı henüz başlamadı
- 🔄 **Devam ediyor** — Fazı aktif, task'lar çalışılıyor (discuss-phase'de faz başlatıldığında set edilir)
- 🟡 **Kısmen tamamlandı** — Bazı task'ları bitti ama tamamı değil (bazıları sonraki fazlara kaldı)
- ✅ **Tamamlandı** — Tüm kabul kriterleri karşılandı, UAT'tan geçti (review-phase'de set edilir)

> Modül detayları (sorumluluk, feature kabul kriterleri, edge case'ler) → `modules/MX-ModulAdi.md`
> Versiyon sütunu PRD'deki VERSIONS.md'den aktarılır. Faz sütunu sadece planlanmış fazlar için doldurulur, henüz planlanmamış feature'lar "—" kalır.
> **R1–R4 = v0.1 revize iş birimleri** (kaynak: `_dev/PRD/features/` → `nasil-calisir-4-adim.md`, `sektorler-derinlestirme.md`, `crew-os-bolumu.md`, `kopya-revizesi.md`). Mevcut F2.3/F2.4/F2.5 + M4 üstüne **cerrahi** inşa ederler (baseline ✅ satırları korunur). Faz numarası verilmedi — tek v0.1 içerik fazı discuss-phase'de damgalanır (PHASES.md → Sıradaki Fazlar).

---

**Son Güncelleme:** 2026-06-28 — discuss-phase: R1–R4 Faz 1'e atandı, durum 🔄 (v0.1 içerik fazı girildi).
