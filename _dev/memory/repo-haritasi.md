# Repo Haritası — Kiwi AI Lab (frontend / backend / terk edilmiş)

Kiwi AI Lab'ın GitHub hesabı **NorthAIII** org'u altındadır.

- **NorthAIII/kiwiwebsite.v3** (public) — ASIL production frontend; canlı: kiwiailab.com. Bu çalışma dizini. Next.js 15 + React 19, next-intl (tr varsayılan + en/ar/de/es), three.js/react-three-fiber, GSAP, Lenis, @anthropic-ai/sdk (chatbot `src/app/api/chat/route.ts`). Vercel'de deploy (`north-ai/kiwi-ai-lab-v3`).
- **NorthAIII/kiwi-ai-lab** (private) — BACKEND/altyapı, frontend DEĞİL. Python + Docker + PLpgSQL + nginx; Crew OS (iç ad "bunker") otomasyon ürünü, satış, CRM burada yaşar. O repo da DevFlow kullanıyor (`_dev/`, CLAUDE.md).
- Eski repo'lar (kiwi-website, kiwi-website-v2, kiwi-ai-lab-web, kiwi-ai-website, kiwi-ai-landing, KiwiAILandingpage, gokiwi.aiwebsite vb.) **terk edilmiş öncüllerdir** — yeniden kullanma.

"Frontend repo" denince kastedilen daima **kiwiwebsite.v3**'tür. Bağlam: [DevFlow sistemi](devflow-sistemi.md).
