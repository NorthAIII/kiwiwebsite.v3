# Kiwi AI Lab — Website (v3) — Proje Özeti

**Proje Sahibi:** Kivanç (kurucu) — Kiwi AI Lab (North AI / NorthAIII)
**Başlangıç Tarihi:** Site mevcut (canlı: kiwiailab.com) · DevFlow entegrasyonu: 2026-06-27

---

## Bu Doküman Hakkında

**OVERVIEW.md** projenin genel referans dokümanıdır. Her oturum başında mutlaka okunmalıdır. **Yalnızca statik bilgi** içerir — proje kimliği, stack, amaç, kapsam. Dinamik bilgi (aktif faz/task, ilerleme, faz numarası, durum) buraya **yazılmaz**; onların evi DURUM.md'dir. OVERVIEW yalnızca daha genel değişikliklerde (vizyon, stack, kapsam) güncellenir — nadiren.

**Not:** Bu dosya projenin kendi README.md'si değildir. Bu, DevFlow geliştirme sürecine yönelik bir özettir ve `_dev/` klasöründe yaşar. Brief'in tek kaynağı: `MASTER_PROMPT_v2.md` (çelişkide v2 geçerli).

---

## Proje Özeti

### Ne Yapıyor?
Kiwi AI Lab (bir AI otomasyon ajansı) için "award-winning" (Awwwards Site of the Day) kalibresinde tanıtım sitesi. İmza fikir **The Living Flow**: aydınlık zeminde ince yarı-saydam mürekkep çizgileri ve çizgiler boyunca ilerleyen yeşil otomasyon nabızlarından oluşan, cursor ve scroll'a tepki veren custom WebGL alanı.

### Hangi Problemi Çözüyor?
Ajansın teklifini (analiz → tekrarlayan işin tespiti → otomasyona bağlama; sektöre hazır ürünler, 7/24 asistanlar, kurucuyla birebir, bayrak katman **Crew OS** — public ad; iç kod adı *Bunker OS*, kullanıcıya görünmez) şablon kokusu olmayan, çıktı-odaklı, kendinden emin bir dille ve immersive ama performanslı bir deneyimle anlatır. Keşif görüşmesine ve canlı chatbot'a yönlendirir.

### Hedef Kitle
Tekrarlayan operasyonel işi otomatikleştirmek isteyen işletmeler (spor salonu, klinik, e-ticaret, emlak, eğitim/danışmanlık, restoran/kafe) ve karar vericileri. Çok dilli kitle: TR (varsayılan), EN, AR, DE, ES.

### Kapsam
**Dahil:** Tanıtım/pazarlama sitesi — ana sayfa + alt sayfalar (Crew OS showcase [public route `/crew-os`; eski `/bunker-os` → kalıcı redirect], Alpfit spor salonu yazılımı, vaka çalışmaları, bülten makaleleri), Living Flow WebGL, çok dilli i18n (RTL dahil), canlı chatbot (Groq), SEO/sitemap, light/dark tema.
**Dahil değil:** Backend/otomasyon ürününün kendisi (Crew OS motoru — iç adıyla *Bunker OS*) — o ayrı bir repo'dur (`NorthAIII/kiwi-ai-lab`, private). Forum/bülten için gerçek backend (şu an statik içerik), ödeme, kullanıcı hesapları.

---

## Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 15 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (config `globals.css` içinde `@theme`) |
| WebGL / 3D | three.js + @react-three/fiber + custom GLSL |
| Hareket | GSAP + ScrollTrigger, Lenis (smooth scroll) |
| i18n | next-intl (tr varsayılan + en/ar/de/es, `as-needed` prefix, AR RTL) |
| AI / Chatbot | groq-sdk (OpenAI-uyumlu) — `/api/chat` streaming (varsayılan `qwen/qwen3.8-27b`, env `GROQ_API_KEY` + opsiyonel `CHAT_MODEL`) |
| Tipografi | Fraunces (display serif) + Geist (grotesque sans) |
| Analytics | Umami (self-hosted, `umami.kiwiailab.com`) — script `[locale]/layout.tsx` `<head>`'inde; spec `docs/UMAMI-ANALYTICS.md` |
| Test / CI | Vitest (node + jsdom, Testing Library) · Playwright + axe (a11y) · GitHub Actions CI (build + Vitest · Playwright/axe); konvansiyon `docs/TESTING.md` |
| Deployment | Vercel (`north-ai/kiwi-ai-lab-v3`), repo `github.com/NorthAIII/kiwiwebsite.v3` |

---

## Temel Özellikler

- **The Living Flow** — cursor/scroll'a tepki veren, lazy-load + degradasyonlu (mobil/düşük güç → az parçacık; reduced-motion/no-WebGL → statik SVG) WebGL imza alanı.
- **Çok dilli site** — 5 dil, AR için RTL; varsayılan TR prefixsiz, diğer diller locale-prefixli (`as-needed`), dünya-ikonu dil değiştirici.
- **Canlı chatbot (Groq)** — `/api/chat` üzerinden streaming, kullanıcı dilini algılar (TR-birincil), key yoksa zarif "offline".
- **Light/Dark tema** — `localStorage` + FOUC önleyici script, Living Flow temaya uyumlu.
- **Sektör/ürün showcase sayfaları** — Crew OS (route `/crew-os`), Alpfit (spor salonu), vaka çalışmaları, bülten.
- **Scroll-koreografisi** — GSAP + Lenis + Reveal pattern; reduced-motion tam fallback.

**Detaylar:** `MODULE-MAP.md` (modül ve feature haritası), `modules/` (modül detayları)

---

## Kaynak Kod Yapısı

```
src/
├── app/
│   ├── [locale]/            # Locale-prefixli sayfalar (home + alt sayfalar) + layout
│   ├── api/chat/route.ts    # Groq streaming chat endpoint
│   ├── layout.tsx           # Kök layout
│   ├── globals.css          # Tailwind v4 @theme + tasarım token'ları + dark mode
│   ├── sitemap.ts / robots.ts / icon.svg
├── components/              # Bölüm bileşenleri + UX primitives
│   ├── living-flow/         # WebGL imza (LivingFlow, FlowCanvas, FlowScrim)
│   ├── bunker-os/ · alpfit/ · forum/   # Sayfa-özel showcase/içerik bileşenleri
│   ├── analytics/           # Umami script'i
├── lib/                     # Chatbot sunucu yardımcıları: girdi temizliği + aynı-origin kapısı
├── i18n/                    # next-intl: routing, request, navigation
└── middleware.ts            # next-intl middleware

messages/                    # tr/en/ar/de/es.json çeviri dosyaları
tests/                       # Vitest testleri (birim, route, i18n parite) + e2e/ (Playwright + axe a11y)
ops/                         # Elle koşulan canlı-katman araçları (CI dışı): /api/chat probe'u + firewall/ (WAF kural spec'i + drift script'i)
.github/workflows/ci.yml     # CI: build + Vitest · Playwright/axe
```

---

## Proje Konumları

| Açıklama | Yol |
|----------|-----|
| Repo Kökü | `/home/kivanc/projects/kiwiwebsite.v3` |
| GitHub | `github.com/NorthAIII/kiwiwebsite.v3` (branch: `main` canlı, revize `revize/...` branch'lerinde) |
| DevFlow Dokümanları | `/home/kivanc/projects/kiwiwebsite.v3/_dev/` |
| Kaynak Kod | `/home/kivanc/projects/kiwiwebsite.v3/src/` |
| Çalışan Uygulama | https://kiwiailab.com (Vercel: `north-ai/kiwi-ai-lab-v3`) |

---

## Doküman Yapısı

```
_dev/
├── OVERVIEW.md        # Bu dosya
├── ILKELER.md         # Proje ilkeleri (yön/öncelik — karar fazlarında okunur)
├── INDEX.md           # Navigasyon haritası
├── DURUM.md           # Canlı dashboard
├── MEMORY.md          # Proje hafızası index'i
├── memory/            # Öğrenim dosyaları (ilk öğrenimde oluşur, lazy-load)
├── BULGULAR.md        # Proje sorun kanvası index'i
├── bulgular/          # Bulgu atomları + archive/ (gerektiğinde oluşur)
├── MODULE-MAP.md      # Modül/feature haritası (özet)
├── PHASES.md          # Faz durum özeti + sıradaki fazlar
├── QUALITY.md         # Kalite eksenleri
│
├── PRD/               # PRD dokümanları
│   ├── VIZYON.md      # Merkezi vizyon (karar kaynağı)
│   ├── VERSIONS.md    # Feature → versiyon haritası
│   ├── SESSION-NOTES.md  # PRD çalışma durumu notları
│   ├── NOTES.md       # Geliştirme sırasında not/analiz log'u
│   └── features/      # Feature dokümanları
│
├── modules/           # Modül detay dokümanları (M1–M6)
├── phases/            # Faz dokümanları (her faz ayrı)
├── docs/              # Detay dokümanları, karar günlüğü, revize backlog
└── tasks/             # Task dokümanları ve arşiv
```

CLAUDE.md repo kökündedir (`/CLAUDE.md`) — proje onu `.claude/CLAUDE.md`'de tutmayı seçtiyse yol odur (yer kararı: `kickoff-verify` Adım 3).

---

> Operasyonel talimatlar (oturum başlangıç protokolü, task tamamlama sırası, numaralama) burada tekrarlanmaz — onların evi CLAUDE.md'dir. OVERVIEW yalnızca proje kimliğini taşır; tekrar = drift kaynağı.

---

**Son Güncelleme:** 2026-10-03 — audit-docs (kullanıcı onaylı olgu mutabakatı, Korumalı doküman): kaynak ağacı, stack tablosu ve doküman ağacı bugünkü repoya çekildi; amaç, kapsam ve kimlik değişmedi.
