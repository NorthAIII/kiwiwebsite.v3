# Repo Haritası — Kiwi AI Lab (frontend / backend / terk edilmiş)

Kiwi AI Lab'ın GitHub hesabı **NorthAIII** org'u altındadır.

- **NorthAIII/kiwiwebsite.v3** (public) — ASIL production frontend; canlı: kiwiailab.com. Bu çalışma dizini. Next.js 15 + React 19, next-intl (tr varsayılan + en/ar/de/es), three.js/react-three-fiber, GSAP, Lenis, groq-sdk (chatbot `src/app/api/chat/route.ts`). Vercel'de deploy (`north-ai/kiwi-ai-lab-v3`).
- **NorthAIII/kiwiwebsite.v4** (private) — YENİ site; 2026-08-25'te başladı, 2026-10-03'ten beri yeni geliştirme burada (v3 bakım modunda, DECISIONS 2026-10-03). Girdi: `_brief/` (Ağustos ölçümü `00`–`02` + Ekim devri `03-v3-devir.md`). Yeni site işi denince kastedilen budur.
- **NorthAIII/kiwi-ai-lab** (private) — BACKEND/altyapı, frontend DEĞİL. Python + Docker + PLpgSQL + nginx; Crew OS (iç ad "bunker") otomasyon ürünü, satış, CRM burada yaşar. O repo da DevFlow kullanıyor (`_dev/`, CLAUDE.md).
- Eski repo'lar (kiwi-website, kiwi-website-v2, kiwi-ai-lab-web, kiwi-ai-website, kiwi-ai-landing, KiwiAILandingpage, gokiwi.aiwebsite vb.) **terk edilmiş öncüllerdir** — yeniden kullanma.

"Canlı site" = **kiwiwebsite.v3**; "yeni site" = **kiwiwebsite.v4**. Yeni sitede iş v3'e yazılmaz. Bağlam: [DevFlow sistemi](devflow-sistemi.md).
