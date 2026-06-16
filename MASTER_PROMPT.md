# Kiwi AI Lab — Website Master Prompt (v1)

> Build brief for an **award-winning** (Awwwards Site of the Day caliber) website for Kiwi AI Lab.
> This is the single source of truth. Anything that smells like a template violates this brief.

---

## 0. Quality bar (non-negotiable)
The reference is **activetheory.net** — immersive WebGL craft, flawless motion timing, zero template smell — **rendered in a LIGHT, airy key** (not dark). Combine Active Theory's motion sophistication with Cuberto's clean restraint. Every screen must feel custom-built and alive.

**Five rules that separate award-winning from generic:**
1. One strong signature idea — here, the **Living Flow** (see §4). Not "every effect."
2. Flawless motion/timing — cheapness always leaks through bad timing.
3. Custom typography + restraint — generous whitespace, few colors.
4. Zero template smell.
5. Real content — real case studies, real metrics (honest placeholders until data exists, clearly marked).

**Banned outright:** template/page-builder components; the generic green "● online / canlı demo" dot; stock robot/AI clipart; generic SaaS feature-card grids; the "business doctor / hekim / teşhis" metaphor; lorem-feeling filler.

---

## 1. Brand & offering
**Kiwi AI Lab** — an AI automation agency. We map a business, find where repetitive work leaks time/money, and wire it to automation: recurring tasks, messages (SMS/WhatsApp), approval chains. We ship sector-ready products, run 7/24 assistants, and work 1:1 with the founder. Flagship layer: **Bunker OS** (where a client's automations live and run).

**Positioning & tone:** output-focused, plain, confident. We sell outcomes, not gimmicks. No metaphors. English-first.

---

## 2. Language & i18n
- **Default: English.** Geo-detected locale switch (Vercel edge geo): **Arabic (RTL), German, Spanish.**
- Full **RTL** support for Arabic (layout mirror, type, logical CSS props).
- `next-intl`, locale-prefixed routes, persistent manual language switcher in nav + footer.
- **Multilingual chatbot** (see §6.7): detects user language, answers natively in EN/AR/DE/ES.

---

## 3. Visual direction — "Light but immersive"
- **Base:** warm off-white canvas (~`#F7F6F1`), ink near-black text (~`#12140F`).
- **Accent:** refined Kiwi green — a deep brand green (~`#1F7A3D`) for type/UI and a brighter pulse green (~`#6FE36F`) used *only* inside the Living Flow energy pulses. No neon flooding.
- **Typography:** premium pairing — a variable display **serif** (recommend **Fraunces**, free, editorial) for headlines + a clean **grotesque sans** (recommend **Geist** or Söhne-like) for body/UI. Big, confident type scale; tight optical kerning on display.
- **Whitespace:** generous, editorial. Let single statements breathe.
- **Motion everywhere, tasteful:** Lenis smooth scroll, GSAP scroll-choreographed sections, custom cursor, refined hover/micro-interactions (Cuberto level), subtle page transitions. Nothing tashkın.
- Respect `prefers-reduced-motion` — full graceful fallback.

---

## 4. Signature element — **The Living Flow** (the site's living heart)
A field of fine translucent ink lines and soft nodes on the near-white canvas, with **green energy pulses traveling along the lines** — each pulse is a task being automated. Lines route **organically, vine/root-like** (a quiet nod to "kiwi"), self-organizing.

- **Behavior:** reacts to cursor (lines bend, pulses accelerate near pointer) and to scroll (the field reflows/recomposes between sections, guiding the eye).
- **Tech:** React Three Fiber + custom GLSL (GPU particles riding along curves). Light-mode palette: ink lines at low opacity, green pulses with *subtle* bloom only.
- **Performance/fallback:** lazy-init after first paint; degrade to a lighter particle count on mobile/low-power; static high-res fallback image (generated via fal.ai / Gemini nano banana) for reduced-motion and no-WebGL. Must not hurt LCP.

The Living Flow appears full-bleed behind the hero, then recurs as smaller motifs (section dividers, the "how it works" connectors, the chatbot's thinking state).

---

## 5. Information architecture (page sections)
1. **Hero** — Living Flow + headline. e.g. *"We listen to your business. Then we automate it."* Output-focused subhead. CTAs: **Book a free discovery call** / **See it live**. Quiet stats strip (3 sector-ready products · 7/24 assistants · 1:1 with the founder).
2. **Proof bar** — client logos / honest metrics (placeholder, marked, until real).
3. **How it works** — 3 scroll-choreographed steps: **01 Listen** (map your operations) · **02 Find** (locate where work leaks) · **03 Automate** (wire it, you measure). Living Flow connects the steps.
4. **Sector solutions** — interactive selector (gyms · clinics · e-commerce · real estate · …). Each shows ONE real automation + the outcome it drives. This replaces the old chat gimmick with something concrete.
5. **Signature automations / case studies** — real metrics, real before→after. Honest placeholders clearly marked until data lands.
6. **Bunker OS** — the operating layer where a client's automations live and run; one strong visual.
7. **Live multilingual chatbot demo** — genuinely functional (see §6.7), embedded as a product proof.
8. **Credibility** — 1:1 founder, 7/24 assistants, how we engage.
9. **Final CTA + footer** — language switcher, contact.

---

## 6. Tech & build
- **6.1 Stack:** Next.js (App Router, TypeScript), Tailwind, React Three Fiber + drei + custom GLSL, GSAP + ScrollTrigger, Lenis, `next-intl`. Deploy to existing Vercel project `north-ai/kiwi-ai-lab-v3`. Start from a **clean** Next.js base (no template residue).
- **6.2 Custom assets:** fal.ai (Flux) + Gemini **nano banana** (Flash Image) for sector vignettes, grain/texture, OG images, WebGL fallback stills. **Never clipart.** Output → AVIF/WebP via `next/image`. Build a tiny reusable asset-gen script that takes a prompt + key.
- **6.3 Performance budgets:** Lighthouse ≥ 95 perf / ≥ 100 a11y target; LCP < 2.5s; near-zero CLS; WebGL lazy + degradable. "Wow" must never kill perf.
- **6.4 Accessibility:** semantic HTML, focus states, full keyboard nav, RTL-correct, reduced-motion path.
- **6.7 Chatbot:** streaming multilingual assistant powered by Claude (`claude-opus-4-8` / `claude-sonnet-4-6`) via the Anthropic API. Detects user language, answers natively in EN/AR/DE/ES, knows Kiwi's offerings, can route to "book a call." Real, not a scripted fake. Uses the Living Flow as its thinking/typing state — no green "online" dot.

---

## 7. Delivery plan (de-risk before full build)
**Phase 1 — Reference screen (first):** one deployed, fully-coded page = Hero (with live Living Flow) + How it works + one Sector solution + the live chatbot demo, English, with i18n scaffolding in place. Goal: lock the quality bar with minimal token spend. **We judge this before scaling.**
**Phase 2:** if the bar holds, scale to the full IA above + AR/DE/ES + remaining sections.

---

## 8. Copy direction (English-first, output-led — examples, refine in build)
- Hero: *"We listen to your business. Then we automate it."*
- Sub: *"We find where repetitive work drains your team — recurring tasks, messages, approval chains — and wire it to automation you can measure."*
- Steps: *Listen · Find · Automate.*
- CTA: *"Book a free discovery call."*
- Never: doctor, diagnose, hekim, prescription.
