# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Eczemate marketing website.

## Project Overview

Marketing landing page for the Eczemate iOS app. Scroll-driven, animation-rich single-page site showcasing app features with CSS phone mockups, pinned scroll sections, and conversion-focused layout.

## Tech Stack

- **Framework**: Next.js 16 (static export to `out/`)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion 12 (scroll-driven + viewport-triggered)
- **Smooth Scroll**: Lenis
- **Fonts**: Fraunces (display), DM Sans (body) via Google Fonts

## Development Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Build static export to out/
npm run lint         # ESLint
```

## Deployment

Deployed via **Netlify** — auto-deploys on push to `main`. No manual deploy needed.

Config in `netlify.toml`: builds with `npm run build`, publishes `out/`.

## Architecture

### Page Structure (6 sections)
1. **Hero** — Gradient mesh background, animated headline, CSS phone mockup
2. **Feature Showcase** — Pinned scroll (400vh), crossfading screenshots in CSS phone frame, progress dots
3. **Social Proof** — Animated stars, testimonial, trust metrics
4. **How It Works** — 3-step flow (Download → Setup → Protect)
5. **CTA** — Dark sage gradient, smaller CSS phone, emotion-driven copy
6. **Footer** — Minimal with links

### Components (`src/components/`)
- `PhoneMockup.tsx` — Pure CSS phone frame with perspective transform, dynamic island, side buttons. Accepts `size` prop ("sm" | "md").
- `AnimatedText.tsx` — Reusable `AnimatedHeadline`, `FadeUp`, `ScaleIn` components
- `SmoothScroll.tsx` — Lenis provider wrapping the entire app
- `Features.tsx` — Most complex: pinned scroll with crossfading `<img>` elements and text panels
- `Header.tsx` — Scroll-aware opacity
- `MobileMenu.tsx` — Animated hamburger menu

### Screenshots (`public/screenshots/`)
- `predict.png` — Flare risk prediction screen
- `track.png` — Tracking & insights screen
- `scan.jpg` — Product scanning screen
- `routine.png` — Home/routine screen

## Design Tokens

- **Primary**: Sage green `#8FAEA3` (full scale from 50–950)
- **Accent**: Premium gold `#C7A96B`
- **Surface**: `#F6F7F5`
- Defined in `src/app/globals.css` via `@theme inline`

## Key Conventions

- **Static export**: `next.config.ts` uses `output: "export"` with `images.unoptimized: true`
- **Path alias**: `@/*` maps to `src/`
- **Animations**: GPU-accelerated (transform/opacity only), spring physics, `whileInView` with `once: true`
- **Reduced motion**: Full `prefers-reduced-motion` support in globals.css
- **Mobile**: Phone mockups hidden on mobile in Features/CTA sections; Hero shows phone below copy

## Related Projects

The Eczemate iOS app lives at `~/Desktop/src/eczemate` (separate repo).
