# Kiwi AI Lab — Website (v3)

An award-winning-caliber site for Kiwi AI Lab, an AI automation agency. Light, airy, immersive — built around **The Living Flow**, a custom WebGL field of ink lines with green automation pulses that reacts to cursor and scroll.

Built per [`MASTER_PROMPT.md`](MASTER_PROMPT.md). This is **Phase 1**: one deployed reference screen to lock the quality bar before scaling to the full IA + AR/DE/ES.

## Stack

- **Next.js 15** (App Router, TypeScript) · **Tailwind v4**
- **React Three Fiber + custom GLSL** — The Living Flow (lazy-loaded, degrades on low-power, static fallback for reduced-motion / no-WebGL)
- **GSAP + ScrollTrigger** + **Lenis** smooth scroll · custom cursor
- **next-intl** — EN default, AR/DE/ES scaffolded (locale-prefixed routes, RTL-ready)
- **Fraunces** (display serif) + **Geist** (grotesque sans)
- **groq-sdk** — live streaming multilingual chatbot (Llama 3.3 on Groq)

## Local development

```bash
npm install
cp .env.example .env.local   # then add your GROQ_API_KEY
npm run dev                  # http://localhost:3000
```

The site renders fully without an API key; only the chatbot needs one (it shows a graceful "offline" message until the key is set).

### Environment variables

| Var | Required | Purpose |
| --- | --- | --- |
| `GROQ_API_KEY` | for the chatbot | Powers the live assistant (`/api/chat`) |
| `CHAT_MODEL` | optional | Defaults to `llama-3.3-70b-versatile`; see [Groq models](https://console.groq.com/docs/models) for alternatives |

## Deploy to Vercel

Target project: **`north-ai/kiwi-ai-lab-v3`**.

1. Push this repo to the Git remote connected to that Vercel project (or `vercel link` then `vercel`).
2. In Vercel → Project → Settings → **Environment Variables**, add `GROQ_API_KEY` (and optionally `CHAT_MODEL`) for Production + Preview.
3. Vercel auto-detects Next.js — no build config needed. The chat route runs on the Node.js runtime (`/api/chat`).

```bash
npm i -g vercel      # if needed
vercel link          # select north-ai/kiwi-ai-lab-v3
vercel               # preview
vercel --prod        # production
```

## What's here (Phase 1 scope)

Hero (Living Flow) · How it works (3 scroll-choreographed steps) · Sector solutions (interactive selector) · Bunker OS · live multilingual chatbot · credibility · footer. English content; AR/DE/ES route scaffolding is in place (messages currently mirror EN — translation is Phase 2).

> Metrics in the Sector section are clearly marked **projected placeholders** until real client data lands.

## Notes

- The Living Flow lives in [`src/components/living-flow/`](src/components/living-flow/). It lazy-inits after first paint, scales particle count down on mobile/low-power, and falls back to a static SVG field under `prefers-reduced-motion` or no-WebGL — so it never hurts LCP.
- The asset-generation pipeline (fal.ai / Gemini) for sector vignettes + OG images is **Phase 2** per the brief.
