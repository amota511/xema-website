# Eczemate Website Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Eczemate landing page as a premium, scroll-driven cinematic experience with a 3D phone mockup centerpiece that drives App Store downloads.

**Architecture:** Next.js 16 static export with Framer Motion for scroll animations, Lenis for smooth scroll, and React Three Fiber for a 3D phone mockup. The page is 6 sections: Hero, Feature Showcase (pinned scroll), Social Proof, How It Works, CTA, Footer. All sections are full-width with contained content. Privacy/Terms pages are untouched.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12, Lenis, React Three Fiber, @react-three/drei, Three.js

**Design Doc:** `docs/plans/2026-03-17-website-redesign-design.md`

---

## Task 1: Install Dependencies & Project Setup

**Files:**
- Modify: `package.json`

**Step 1: Install animation and 3D packages**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
npm install framer-motion lenis @react-three/fiber @react-three/drei three
npm install -D @types/three
```

**Step 2: Verify installation**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
npm run build
```

Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add package.json package-lock.json
git commit -m "chore: install framer-motion, lenis, react-three-fiber, drei, three"
```

---

## Task 2: Set Up Lenis Smooth Scroll Provider

**Files:**
- Create: `src/components/SmoothScroll.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create the Lenis provider component**

Create `src/components/SmoothScroll.tsx`:

```tsx
"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

**Step 2: Wrap the app in the Lenis provider**

Modify `src/app/layout.tsx` — wrap `{children}` inside the body with `<SmoothScroll>`:

```tsx
import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eczemate.ai"),
  title: "Eczemate — Stay Ahead of Eczema Flare-Ups",
  description:
    "Predict flare-ups before they happen, track your symptoms, scan products for irritants, and learn what triggers your skin. Eczemate helps you take control of eczema.",
  keywords: [
    "eczema",
    "flare prediction",
    "skin care",
    "symptom tracker",
    "product scanner",
    "eczema management",
    "atopic dermatitis",
  ],
  openGraph: {
    title: "Eczemate — Stay Ahead of Eczema Flare-Ups",
    description:
      "Predict flare-ups, track symptoms, scan products, and learn your triggers. Eczema management, simplified.",
    type: "website",
    images: ["/icon.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dmSans.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

**Step 3: Verify build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

Expected: Build succeeds.

**Step 4: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/components/SmoothScroll.tsx src/app/layout.tsx
git commit -m "feat: add Lenis smooth scroll provider"
```

---

## Task 3: Update Design Tokens & Global CSS

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Rewrite globals.css**

Replace the entire `globals.css` with updated design tokens and remove old CSS animations (Framer Motion will handle animations now). Keep the grain texture utility. Add Lenis CSS import.

```css
@import "tailwindcss";
@import "lenis/css";

@theme inline {
  /* Sage Green — Primary Brand */
  --color-sage-50: #F0F5F3;
  --color-sage-100: #DAE5E0;
  --color-sage-200: #C4D5CE;
  --color-sage-300: #AECABD;
  --color-sage-400: #9DBDAF;
  --color-sage-500: #8FAEA3;
  --color-sage-600: #7B9C90;
  --color-sage-700: #5E7A6F;
  --color-sage-800: #445A51;
  --color-sage-900: #2A3A34;
  --color-sage-950: #1F2A26;

  /* Premium Gold Accent */
  --color-gold: #C7A96B;
  --color-gold-light: #D4BC8A;

  /* Surfaces */
  --color-surface: #F6F7F5;
  --color-card: #FFFFFF;
  --color-border: #E5E7E5;

  /* Typography */
  --font-display: var(--font-fraunces);
  --font-body: var(--font-dm-sans);

  /* Border Radius */
  --radius-card: 24px;
  --radius-button: 16px;
}

html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
}

body {
  font-family: var(--font-body), system-ui, sans-serif;
  background-color: var(--color-surface);
  color: var(--color-sage-950);
}

/* Grain texture overlay */
.grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* Animated gradient mesh background */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-mesh {
  background: linear-gradient(
    135deg,
    var(--color-sage-50) 0%,
    var(--color-surface) 25%,
    var(--color-sage-100) 50%,
    var(--color-sage-50) 75%,
    var(--color-surface) 100%
  );
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

/* Floating blob keyframes (used in Hero background) */
@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  33% {
    transform: translateY(-20px) scale(1.02);
  }
  66% {
    transform: translateY(10px) scale(0.98);
  }
}

@keyframes float-reverse {
  0%, 100% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  33% {
    transform: translateY(15px) scale(0.97) rotate(2deg);
  }
  66% {
    transform: translateY(-25px) scale(1.03) rotate(-1deg);
  }
}

.blob {
  animation: float 20s ease-in-out infinite;
}

.blob-reverse {
  animation: float-reverse 25s ease-in-out infinite;
}

/* Link underline animation */
.link-underline {
  position: relative;
}

.link-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 1.5px;
  width: 0;
  background-color: var(--color-sage-500);
  transition: width 0.3s ease;
}

.link-underline:hover::after {
  width: 100%;
}
```

**Step 2: Verify build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

Expected: Build succeeds. The old reveal/stagger CSS classes are removed — Framer Motion handles all scroll animations now.

**Step 3: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/app/globals.css
git commit -m "feat: update design tokens, add Lenis CSS, remove old scroll animation classes"
```

---

## Task 4: Build the 3D Phone Mockup Component

**Files:**
- Create: `src/components/PhoneMockup.tsx`

**Step 1: Create the 3D phone component**

This is the centerpiece. It renders an iPhone-shaped 3D model using React Three Fiber with a screen texture that can be swapped.

```tsx
"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";

interface PhoneModelProps {
  screenTexturePath: string;
  rotation?: [number, number, number];
  position?: [number, number, number];
}

function PhoneModel({
  screenTexturePath,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
}: PhoneModelProps) {
  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(screenTexturePath);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [screenTexturePath]);

  return (
    <group rotation={rotation} position={position}>
      {/* Phone body */}
      <RoundedBox args={[2.4, 5, 0.3]} radius={0.3} smoothness={8}>
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.6}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox
        args={[2.15, 4.65, 0.01]}
        radius={0.2}
        smoothness={8}
        position={[0, 0, 0.16]}
      >
        <meshBasicMaterial map={texture} />
      </RoundedBox>

      {/* Dynamic Island */}
      <RoundedBox
        args={[0.8, 0.22, 0.01]}
        radius={0.11}
        smoothness={8}
        position={[0, 2.05, 0.17]}
      >
        <meshBasicMaterial color="#000000" />
      </RoundedBox>
    </group>
  );
}

interface PhoneMockupProps {
  screenTexturePath: string;
  rotation?: [number, number, number];
  className?: string;
}

export default function PhoneMockup({
  screenTexturePath,
  rotation = [0.1, -0.2, 0],
  className = "",
}: PhoneMockupProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-3, 2, 4]} intensity={0.3} />
          <Environment preset="city" environmentIntensity={0.3} />
          <PhoneModel
            screenTexturePath={screenTexturePath}
            rotation={rotation}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Step 2: Add placeholder screenshot to public folder**

We need at least one app screenshot for initial testing. Take a screenshot of the app's home screen and save it as `public/screenshots/home.png` (1284x2778px or similar iPhone resolution). For now, we can use the existing `icon.png` as a placeholder.

```bash
mkdir -p /Users/aaronmotayne/Desktop/src/eczemate-website/public/screenshots
```

**Note:** Real app screenshots (predict, track, scan, routine screens) will need to be captured from the app and placed in `public/screenshots/` as:
- `public/screenshots/predict.png`
- `public/screenshots/track.png`
- `public/screenshots/scan.png`
- `public/screenshots/routine.png`

For development, use placeholder images or the app icon.

**Step 3: Verify build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

Expected: Build succeeds. Component is created but not yet used in any page.

**Step 4: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/components/PhoneMockup.tsx public/screenshots/
git commit -m "feat: add 3D phone mockup component with React Three Fiber"
```

---

## Task 5: Build Animated Text Components

**Files:**
- Create: `src/components/AnimatedText.tsx`

**Step 1: Create reusable animated text components**

These handle word-by-word headline reveals and fade-up text animations used across all sections.

```tsx
"use client";

import { motion, Variants } from "framer-motion";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function AnimatedHeadline({
  text,
  className = "",
  as: Tag = "h1",
}: AnimatedHeadlineProps) {
  const words = text.split(" ");
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={wordVariants}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeUp({ children, className = "", delay = 0 }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleIn({
  children,
  className = "",
  delay = 0,
}: ScaleInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay,
        type: "spring",
        damping: 25,
        stiffness: 120,
      }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Verify build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

**Step 3: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/components/AnimatedText.tsx
git commit -m "feat: add AnimatedHeadline, FadeUp, ScaleIn motion components"
```

---

## Task 6: Rebuild the Hero Section

**Files:**
- Rewrite: `src/components/Hero.tsx`

**Step 1: Rewrite Hero.tsx**

Replace the entire Hero component. The new hero has:
- Animated gradient mesh background with floating blobs
- Word-by-word animated headline
- FadeUp subtext and CTA
- 3D phone mockup on the right (desktop) / below text (mobile)
- Spring-animated phone entrance

```tsx
"use client";

import { motion } from "framer-motion";
import { AnimatedHeadline, FadeUp, ScaleIn } from "./AnimatedText";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-mesh">
      {/* Floating blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-sage-200/40 blur-3xl" />
        <div className="blob-reverse absolute top-1/3 -right-24 w-[600px] h-[600px] rounded-full bg-sage-300/30 blur-3xl" />
        <div className="blob absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-sage-100/50 blur-3xl" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            {/* Badge */}
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage-200 bg-white/60 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
                <span className="text-sm font-medium text-sage-700 tracking-wide">
                  Predict &middot; Understand &middot; Protect
                </span>
              </div>
            </FadeUp>

            {/* Headline */}
            <AnimatedHeadline
              text="Stay ahead of your next flare"
              as="h1"
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-sage-950 tracking-tight leading-[1.05]"
            />

            {/* Subtext */}
            <FadeUp delay={0.4}>
              <p className="mt-6 text-lg sm:text-xl text-sage-700 leading-relaxed max-w-md">
                Predict flare-ups, scan products for irritants, track what
                triggers your skin, and build a routine that works.
              </p>
            </FadeUp>

            {/* CTA */}
            <FadeUp delay={0.6}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://apps.apple.com/us/app/eczemate-eczema-care/id6740091498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-sage-950 text-white font-semibold rounded-2xl hover:bg-sage-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sage-950/20"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download for iOS
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right — 3D Phone */}
          <motion.div
            className="relative h-[500px] sm:h-[600px] lg:h-[700px]"
            initial={{ opacity: 0, y: 60, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              damping: 20,
              stiffness: 80,
              delay: 0.3,
            }}
          >
            <PhoneMockup
              screenTexturePath="/screenshots/routine.png"
              rotation={[0.1, -0.25, 0.02]}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify dev server**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run dev
```

Open `http://localhost:3000` in browser. Verify:
- Gradient mesh background animates
- Blobs float
- Text animates in word-by-word
- 3D phone renders (may show placeholder texture)
- CTA button is visible and linked

**Step 3: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/components/Hero.tsx
git commit -m "feat: rebuild Hero with animated text, gradient mesh, and 3D phone"
```

---

## Task 7: Build the Feature Showcase with Pinned Scroll

**Files:**
- Rewrite: `src/components/Features.tsx`

**Step 1: Rewrite Features.tsx**

This is the most complex section. The phone pins in the center while feature descriptions animate in/out as the user scrolls. Uses Framer Motion's `useScroll` and `useTransform` for scroll-driven transitions.

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import { AnimatedHeadline, FadeUp } from "./AnimatedText";

const features = [
  {
    title: "Predict Flare-Ups",
    description:
      "AI-powered forecasting that combines weather data, humidity, and your personal patterns to warn you before a flare strikes.",
    screenshot: "/screenshots/predict.png",
    accent: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Track Your Skin",
    description:
      "Log symptoms, food, products, and wellbeing daily. See 7-day trends and discover what's working — and what's triggering flares.",
    screenshot: "/screenshots/track.png",
    accent: "text-sage-600",
    bg: "bg-sage-50",
  },
  {
    title: "Scan Products",
    description:
      "Point your camera at any product. Instantly see ingredient analysis, risk flags, and whether it's safe for eczema-prone skin.",
    screenshot: "/screenshots/scan.png",
    accent: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Build Your Routine",
    description:
      "Morning and evening routines with gentle check-ins. No streaks, no guilt — just a calm structure that helps your skin heal.",
    screenshot: "/screenshots/routine.png",
    accent: "text-sky-600",
    bg: "bg-sky-50",
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active feature index (0-3)
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, 3]);

  return (
    <section id="features" className="relative bg-surface">
      {/* Section header — scrolls normally before the pinned area */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 text-center">
        <FadeUp>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage-200 bg-white/60 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-sage-700 tracking-wide">
              Everything you need
            </span>
          </span>
        </FadeUp>
        <AnimatedHeadline
          text="Your skin, understood"
          as="h2"
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-950 tracking-tight"
        />
        <FadeUp delay={0.2}>
          <p className="mt-6 text-lg text-sage-600 max-w-2xl mx-auto">
            Four powerful tools working together to help you understand your
            skin, avoid triggers, and build a routine that actually sticks.
          </p>
        </FadeUp>
      </div>

      {/* Pinned scroll area — 400vh tall to give scroll room for 4 features */}
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left — Feature text panels */}
              <div className="relative h-[300px]">
                {features.map((feature, index) => (
                  <FeaturePanel
                    key={feature.title}
                    feature={feature}
                    index={index}
                    progress={activeIndex}
                  />
                ))}
              </div>

              {/* Right — Phone with transitioning screens */}
              <div className="relative h-[500px] sm:h-[600px] hidden lg:block">
                {features.map((feature, index) => (
                  <FeaturePhone
                    key={feature.title}
                    screenshot={feature.screenshot}
                    index={index}
                    progress={activeIndex}
                  />
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-3 mt-12">
              {features.map((_, index) => (
                <ProgressDot
                  key={index}
                  index={index}
                  progress={activeIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePanel({
  feature,
  index,
  progress,
}: {
  feature: (typeof features)[0];
  index: number;
  progress: ReturnType<typeof useTransform>;
}) {
  const opacity = useTransform(progress, (v: number) => {
    const distance = Math.abs(v - index);
    return distance < 0.5 ? 1 - distance * 2 : 0;
  });

  const y = useTransform(progress, (v: number) => {
    const distance = v - index;
    return distance * -40;
  });

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <span
        className={`inline-flex self-start px-3 py-1 rounded-full text-sm font-medium mb-4 ${feature.bg} ${feature.accent}`}
      >
        {feature.title}
      </span>
      <h3 className="font-display text-3xl sm:text-4xl font-bold text-sage-950 tracking-tight mb-4">
        {feature.title}
      </h3>
      <p className="text-lg text-sage-600 leading-relaxed max-w-md">
        {feature.description}
      </p>
    </motion.div>
  );
}

function FeaturePhone({
  screenshot,
  index,
  progress,
}: {
  screenshot: string;
  index: number;
  progress: ReturnType<typeof useTransform>;
}) {
  const opacity = useTransform(progress, (v: number) => {
    const distance = Math.abs(v - index);
    return distance < 0.5 ? 1 : 0;
  });

  const rotateY = useTransform(progress, (v: number) => {
    const distance = v - index;
    return -0.25 + distance * 0.05;
  });

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <PhoneMockup
        screenTexturePath={screenshot}
        rotation={[0.1, -0.25, 0.02]}
      />
    </motion.div>
  );
}

function ProgressDot({
  index,
  progress,
}: {
  index: number;
  progress: ReturnType<typeof useTransform>;
}) {
  const scale = useTransform(progress, (v: number) => {
    const distance = Math.abs(v - index);
    return distance < 0.5 ? 1.4 : 1;
  });

  const opacity = useTransform(progress, (v: number) => {
    const distance = Math.abs(v - index);
    return distance < 0.5 ? 1 : 0.3;
  });

  return (
    <motion.div
      className="w-2.5 h-2.5 rounded-full bg-sage-500"
      style={{ scale, opacity }}
    />
  );
}
```

**Step 2: Verify dev server**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run dev
```

Open browser, scroll through the features section. Verify:
- Section header animates in
- Scrolling through the 400vh area transitions between feature panels
- Phone swaps screens (or shows placeholder)
- Progress dots update
- Phone stays pinned on desktop

**Step 3: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/components/Features.tsx
git commit -m "feat: rebuild Features with pinned scroll, phone transitions, and progress dots"
```

---

## Task 8: Build Social Proof Section

**Files:**
- Create: `src/components/SocialProof.tsx`

**Step 1: Create the social proof component**

Animated star rating, review quotes, and trust metrics.

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "./AnimatedText";

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {prefix}
          {value}
          {suffix}
        </motion.span>
      ) : (
        <span className="opacity-0">
          {prefix}
          {value}
          {suffix}
        </span>
      )}
    </motion.span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.svg
          key={star}
          className="w-7 h-7 text-gold"
          fill={star <= Math.floor(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={star <= Math.floor(rating) ? 0 : 1.5}
          viewBox="0 0 24 24"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: star * 0.1,
            type: "spring",
            damping: 15,
            stiffness: 200,
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </motion.svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="relative py-28 sm:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="flex flex-col items-center gap-4 mb-12">
            <StarRating rating={5} />
            <p className="text-sage-600 text-lg">
              Rated{" "}
              <span className="font-semibold text-sage-950">
                <AnimatedCounter value={5} suffix=" stars" />
              </span>{" "}
              on the App Store
            </p>
          </div>
        </FadeUp>

        {/* Testimonial */}
        <FadeUp delay={0.2}>
          <blockquote className="max-w-2xl mx-auto">
            <p className="font-display text-2xl sm:text-3xl text-sage-950 leading-relaxed italic">
              &ldquo;Finally an app that helps me understand my daughter&apos;s
              eczema instead of just tracking it.&rdquo;
            </p>
            <footer className="mt-6 text-sage-500 text-base">
              &mdash; Parent using Eczemate
            </footer>
          </blockquote>
        </FadeUp>

        {/* Trust badges */}
        <FadeUp delay={0.4}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sage-400">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-sage-950">
                <AnimatedCounter value={4} suffix=" tools" />
              </span>
              <span className="text-sm">working together</span>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-sage-950">
                <AnimatedCounter value={2} suffix=" min" />
              </span>
              <span className="text-sm">to set up</span>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-sage-950">
                <AnimatedCounter prefix="" value={0} suffix=" guilt" />
              </span>
              <span className="text-sm">just support</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

**Step 3: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/components/SocialProof.tsx
git commit -m "feat: add SocialProof section with animated stars, counter, and testimonial"
```

---

## Task 9: Build How It Works Section

**Files:**
- Create: `src/components/HowItWorks.tsx`

**Step 1: Create the 3-step component**

```tsx
"use client";

import { motion } from "framer-motion";
import { AnimatedHeadline, FadeUp } from "./AnimatedText";

const steps = [
  {
    number: "1",
    title: "Download",
    description: "Get Eczemate free from the App Store. Takes 30 seconds.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Set up your profile",
    description:
      "A quick 2-minute onboarding personalized to your skin and triggers.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Start protecting your skin",
    description:
      "Predict flares, scan products, track triggers, and build routines.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-28 sm:py-36 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <AnimatedHeadline
            text="Up and running in minutes"
            as="h2"
            className="font-display text-4xl sm:text-5xl font-bold text-sage-950 tracking-tight"
          />
          <FadeUp delay={0.2}>
            <p className="mt-6 text-lg text-sage-600 max-w-xl mx-auto">
              No complicated setup. No learning curve. Just download and go.
            </p>
          </FadeUp>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative text-center"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {/* Connecting line (hidden on mobile, shown on sm+) */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-sage-200" />
              )}

              {/* Icon circle */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage-100 text-sage-600 mb-6">
                {step.icon}
              </div>

              <h3 className="font-display text-xl font-bold text-sage-950 mb-2">
                {step.title}
              </h3>
              <p className="text-sage-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

**Step 3: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/components/HowItWorks.tsx
git commit -m "feat: add HowItWorks 3-step section with staggered reveal"
```

---

## Task 10: Rebuild the CTA Section

**Files:**
- Rewrite: `src/components/CTA.tsx`

**Step 1: Rewrite CTA.tsx**

Dark sage background, emotionally resonant headline, gold-glow CTA button, the 3D phone makes a final appearance.

```tsx
"use client";

import { motion } from "framer-motion";
import { AnimatedHeadline, FadeUp } from "./AnimatedText";
import PhoneMockup from "./PhoneMockup";

export default function CTA() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-sage-900 via-sage-950 to-sage-900">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-sage-700/20 blur-3xl" />
        <div className="blob-reverse absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-sage-600/15 blur-3xl" />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="text-center lg:text-left">
            <AnimatedHeadline
              text="Your skin deserves better days ahead"
              as="h2"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
            />

            <FadeUp delay={0.3}>
              <p className="mt-6 text-lg text-sage-300/80 max-w-md mx-auto lg:mx-0">
                Join thousands of people taking control of their eczema.
                Download Eczemate and start understanding your skin today.
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="mt-10">
                <a
                  href="https://apps.apple.com/us/app/eczemate-eczema-care/id6740091498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-sage-950 font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download for iOS
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right — Phone */}
          <motion.div
            className="relative h-[400px] sm:h-[500px] hidden lg:block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              damping: 20,
              stiffness: 80,
            }}
          >
            <PhoneMockup
              screenTexturePath="/screenshots/routine.png"
              rotation={[0.05, 0.2, -0.02]}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

**Step 3: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/components/CTA.tsx
git commit -m "feat: rebuild CTA with dark sage gradient, animated text, and 3D phone"
```

---

## Task 11: Rebuild Header & Footer

**Files:**
- Rewrite: `src/components/Header.tsx`
- Rewrite: `src/components/Footer.tsx`
- Modify: `src/components/MobileMenu.tsx`

**Step 1: Rewrite Header.tsx**

Updated nav for new sections. Cleaner, premium styling. Scroll-aware background opacity.

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.15]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: `rgba(246, 247, 245, ${bgOpacity.get()})`,
        borderBottomColor: `rgba(229, 231, 229, ${borderOpacity.get()})`,
        borderBottomWidth: 1,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/icon.png" alt="Eczemate" width={32} height={32} className="rounded-lg" />
          <span className="font-display text-lg font-semibold text-sage-500">
            eczemate
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-sage-700 hover:text-sage-950 transition-colors link-underline"
          >
            Features
          </a>
          <Link
            href="/privacy"
            className="text-sm text-sage-700 hover:text-sage-950 transition-colors link-underline"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-sage-700 hover:text-sage-950 transition-colors link-underline"
          >
            Terms
          </Link>
          <a
            href="https://apps.apple.com/us/app/eczemate-eczema-care/id6740091498"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white bg-sage-950 px-5 py-2.5 rounded-xl hover:bg-sage-900 transition-colors"
          >
            Download
          </a>
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </nav>
    </motion.header>
  );
}
```

**Step 2: Update MobileMenu.tsx**

Rewrite to use Framer Motion for animated menu transitions instead of CSS transitions.

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <motion.span
          className="block w-5 h-0.5 bg-sage-950"
          animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-5 h-0.5 bg-sage-950"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-5 h-0.5 bg-sage-950"
          animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </button>

      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-surface/95 backdrop-blur-lg border-b border-border/60"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="text-sage-700 hover:text-sage-950 py-2 transition-colors"
              >
                Features
              </a>
              <Link
                href="/privacy"
                onClick={() => setIsOpen(false)}
                className="text-sage-700 hover:text-sage-950 py-2 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                onClick={() => setIsOpen(false)}
                className="text-sage-700 hover:text-sage-950 py-2 transition-colors"
              >
                Terms
              </Link>
              <a
                href="https://apps.apple.com/us/app/eczemate-eczema-care/id6740091498"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-center font-semibold text-white bg-sage-950 px-5 py-3 rounded-xl hover:bg-sage-900 transition-colors"
              >
                Download
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Step 3: Rewrite Footer.tsx**

Minimal, clean footer. Dark sage background for visual closure.

```tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-sage-950 text-sage-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Logo & tagline */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <Image src="/icon.png" alt="Eczemate" width={28} height={28} className="rounded-lg" />
              <span className="font-display text-lg font-semibold text-sage-300">
                eczemate
              </span>
            </div>
            <p className="text-sm text-sage-500 leading-relaxed">
              Predict, understand, and protect your skin. Eczema management,
              simplified.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm">
            <Link
              href="/privacy"
              className="hover:text-sage-200 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-sage-200 transition-colors"
            >
              Terms
            </Link>
            <a
              href="mailto:heyo@foresightcomputers.com"
              className="hover:text-sage-200 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-sage-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-sage-600">
          <span>&copy; {new Date().getFullYear()} Eczemate</span>
          <span>Made with care for people living with eczema.</span>
        </div>
      </div>
    </footer>
  );
}
```

**Step 4: Verify build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

**Step 5: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add src/components/Header.tsx src/components/MobileMenu.tsx src/components/Footer.tsx
git commit -m "feat: rebuild Header (scroll-aware), MobileMenu (framer-motion), Footer (minimal)"
```

---

## Task 12: Update Page Composition & Clean Up

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/hooks/useInView.ts` (replaced by Framer Motion's `useInView`)

**Step 1: Update page.tsx to compose all new sections**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Delete the old useInView hook**

```bash
rm /Users/aaronmotayne/Desktop/src/eczemate-website/src/hooks/useInView.ts
```

The `src/hooks/` directory can be removed if empty:

```bash
rmdir /Users/aaronmotayne/Desktop/src/eczemate-website/src/hooks 2>/dev/null || true
```

**Step 3: Verify full build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

Expected: Build succeeds with all new sections rendering.

**Step 4: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add -A
git commit -m "feat: compose all new sections, remove old useInView hook"
```

---

## Task 13: Add App Screenshots

**Files:**
- Create: `public/screenshots/predict.png`
- Create: `public/screenshots/track.png`
- Create: `public/screenshots/scan.png`
- Create: `public/screenshots/routine.png`

**Step 1: Capture or prepare screenshots**

We need 4 app screenshots for the phone mockup textures. Options:

**Option A — Use existing App Store previews:**
Copy and crop from `assets/app-store-previews/` in the main Eczemate app repo. The files `FlareRisk.jpg`, `Track.jpg`, `Scan.jpg`, `Routine.jpg` can be cropped to show just the phone screen area.

```bash
mkdir -p /Users/aaronmotayne/Desktop/src/eczemate-website/public/screenshots
```

**Option B — Take fresh simulator screenshots:**
Run the app in the iOS simulator and capture each screen:
1. Home screen with routine → `routine.png`
2. Flare risk screen → `predict.png`
3. Track/Insights tab → `track.png`
4. Scan camera/result → `scan.png`

Save each as a PNG at iPhone resolution (1170x2532 or 1284x2778).

**Step 2: Verify the 3D phone renders with the screenshots**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run dev
```

Open browser, check that each feature in the scroll showcase shows the correct screenshot on the phone.

**Step 3: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add public/screenshots/
git commit -m "feat: add app screenshots for 3D phone mockup textures"
```

---

## Task 14: Responsive Polish & Reduced Motion

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Features.tsx`
- Modify: `src/components/PhoneMockup.tsx`
- Modify: `src/app/globals.css`

**Step 1: Add `prefers-reduced-motion` support**

Add to `globals.css`:

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .blob, .blob-reverse {
    animation: none;
  }

  .gradient-mesh {
    animation: none;
  }
}
```

**Step 2: Add mobile fallback for 3D phone in PhoneMockup.tsx**

Update the PhoneMockup component to show a static image fallback on mobile (below `lg` breakpoint) for performance. The 3D canvas is heavy on mobile devices.

Add a `fallbackImage` prop and conditionally render:

```tsx
// In PhoneMockup.tsx, add:
import { useState, useEffect } from "react";

// Add to the component:
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 1024);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);

// If mobile, render a simple <img> instead of Canvas
if (isMobile) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <img
        src={screenTexturePath}
        alt="App screenshot"
        className="w-auto h-4/5 rounded-3xl shadow-2xl shadow-sage-950/20"
      />
    </div>
  );
}
```

**Step 3: Test mobile responsiveness**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run dev
```

Test at mobile, tablet, and desktop widths. Verify:
- Mobile shows static image instead of 3D phone
- Feature showcase scrolls properly on mobile (stacked layout)
- All text is readable at all breakpoints
- CTA buttons are full-width on mobile

**Step 4: Verify full build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

**Step 5: Commit**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add -A
git commit -m "feat: add reduced-motion support and mobile fallback for 3D phone"
```

---

## Task 15: Final Build Verification & Performance Check

**Files:** None (verification only)

**Step 1: Full production build**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npm run build
```

Expected: Build succeeds with no errors or warnings.

**Step 2: Serve production build locally**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website && npx serve out
```

Open in browser and verify:
- [ ] Hero loads with smooth gradient mesh animation
- [ ] Headline animates word-by-word
- [ ] 3D phone renders with screenshot texture
- [ ] Lenis smooth scroll works across the page
- [ ] Feature showcase pins correctly and transitions between 4 features
- [ ] Progress dots update during feature scroll
- [ ] Social proof stars animate in
- [ ] How it works steps reveal with stagger
- [ ] CTA section has dark background with phone
- [ ] Header becomes opaque on scroll
- [ ] Mobile menu opens/closes with animation
- [ ] Footer renders correctly
- [ ] Privacy and Terms pages still work (untouched)
- [ ] App Store link works
- [ ] No console errors

**Step 3: Commit any final fixes**

```bash
cd /Users/aaronmotayne/Desktop/src/eczemate-website
git add -A
git commit -m "fix: final polish and adjustments"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Install dependencies | `package.json` |
| 2 | Lenis smooth scroll setup | `SmoothScroll.tsx`, `layout.tsx` |
| 3 | Update design tokens & CSS | `globals.css` |
| 4 | 3D phone mockup component | `PhoneMockup.tsx` |
| 5 | Animated text components | `AnimatedText.tsx` |
| 6 | Rebuild Hero section | `Hero.tsx` |
| 7 | Feature Showcase (pinned scroll) | `Features.tsx` |
| 8 | Social Proof section | `SocialProof.tsx` |
| 9 | How It Works section | `HowItWorks.tsx` |
| 10 | Rebuild CTA section | `CTA.tsx` |
| 11 | Rebuild Header, MobileMenu, Footer | `Header.tsx`, `MobileMenu.tsx`, `Footer.tsx` |
| 12 | Update page composition & cleanup | `page.tsx`, delete `useInView.ts` |
| 13 | Add app screenshots | `public/screenshots/` |
| 14 | Responsive polish & reduced motion | Multiple files |
| 15 | Final build verification | Verification only |

**Dependencies:** Tasks 1-3 must be done first (foundation). Tasks 4-5 are reusable components needed by 6-10. Tasks 6-10 are independent sections. Task 11-12 ties everything together. Tasks 13-15 are polish.
