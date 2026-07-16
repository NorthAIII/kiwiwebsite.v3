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
**Dahil:** Tanıtım/pazarlama sitesi — ana sayfa + alt sayfalar (Crew OS showcase [public route `/crew-os`; eski `/bunker-os` → kalıcı redirect], Alpfit spor salonu yazılımı, vaka çalışmaları, bülten makaleleri), Living Flow WebGL, çok dilli i18n (RTL dahil), canlı Claude chatbot, SEO/sitemap, light/dark tema.
**Dahil değil:** Backend/otomasyon ürününün kendisi (Crew OS motoru — iç adıyla *Bunker OS*) — o ayrı bir repo'dur (`NorthAIII/kiwi-ai-lab`, private). Forum/bülten için gerçek backend (şu an statik içerik), ödeme, kullanıcı hesapları.

---

## Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 15 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 (config `globals.css` içinde `@theme`) |
| WebGL / 3D | three.js + @react-three/fiber + @react-three/drei + custom GLSL |
| Hareket | GSAP + ScrollTrigger, Lenis (smooth scroll) |
| i18n | next-intl (tr varsayılan + en/ar/de/es, `as-needed` prefix, AR RTL) |
| AI / Chatbot | @anthropic-ai/sdk — `/api/chat` streaming (varsayılan `claude-opus-4-8`, env `CHAT_MODEL`) |
| Tipografi | Fraunces (display serif) + Geist (grotesque sans) |
| Deployment | Vercel (`north-ai/kiwi-ai-lab-v3`), repo `github.com/NorthAIII/kiwiwebsite.v3` |

---

## Temel Özellikler

- **The Living Flow** — cursor/scroll'a tepki veren, lazy-load + degradasyonlu (mobil/düşük güç → az parçacık; reduced-motion/no-WebGL → statik SVG) WebGL imza alanı.
- **Çok dilli site** — 5 dil, AR için RTL; locale-prefixli route'lar, dünya-ikonu dil değiştirici.
- **Canlı Claude chatbot** — `/api/chat` üzerinden streaming, kullanıcı dilini algılar, key yoksa zarif "offline".
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
│   ├── api/chat/route.ts    # Claude streaming chat endpoint
│   ├── layout.tsx           # Kök layout
│   ├── globals.css          # Tailwind v4 @theme + tasarım token'ları + dark mode
│   ├── sitemap.ts / robots.ts / icon.svg
├── components/              # Bölüm bileşenleri + UX primitives
│   ├── living-flow/         # WebGL imza (LivingFlow, FlowCanvas, FlowScrim)
│   ├── bunker-os/ · gym/ · forum/   # Sayfa-özel showcase/içerik bileşenleri
├── i18n/                    # next-intl: routing, request, navigation
└── middleware.ts            # next-intl middleware

messages/                    # tr/en/ar/de/es.json çeviri dosyaları
public/                      # Statik varlıklar (Alpfit ekran görüntüleri vb.)
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
├── MODULE-MAP.md      # Modül/feature haritası (özet)
├── PHASES.md          # Faz durum özeti + sıradaki fazlar
├── QUALITY.md         # Kalite eksenleri
│
├── modules/           # Modül detay dokümanları (M1–M6)
├── phases/            # Faz dokümanları (her faz ayrı)
├── docs/              # Detay dokümanları, karar günlüğü, revize backlog
└── tasks/             # Task dokümanları ve arşiv
```

CLAUDE.md repo kökünde olacaktır (`/CLAUDE.md`) — kickoff-verify'da oluşturulur.

---

> Operasyonel talimatlar (oturum başlangıç protokolü, task tamamlama sırası, numaralama) burada tekrarlanmaz — onların evi CLAUDE.md'dir. OVERVIEW yalnızca proje kimliğini taşır; tekrar = drift kaynağı.

---

**Son Güncelleme:** 2026-07-16 — re-kickoff (kickoff-verify): Crew OS showcase route referansları `/crew-os`'a hizalandı (public route v0.3 Faz 11'de rename edildi; eski `/bunker-os` → kalıcı redirect). Taksonomi/kimlik değişmedi.
