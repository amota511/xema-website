"use client";

import { AnimatedHeadline, FadeUp } from "./AnimatedText";
import DownloadButtons from "./DownloadButtons";

export default function Hero() {
  return (
    <section className="relative min-h-[84vh] overflow-hidden bg-[#F5F1E8]">
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-surface to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[84vh] max-w-7xl flex-col justify-center px-6 pb-24 pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white/70 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-sage-500" />
              <span className="text-sm font-semibold text-sage-700">
                Eczema tracking for children and adults
              </span>
            </div>
          </FadeUp>

          <AnimatedHeadline
            text="Everything you need to manage eczema."
            as="h1"
            className="font-display text-5xl font-bold leading-[1.02] text-sage-950 sm:text-6xl lg:text-7xl"
          />

          <FadeUp delay={0.4}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-sage-700 sm:text-xl">
              Track routines, foods, products, sleep, weather, and notes in
              one calm place, so you can stop guessing and bring clearer
              context to care.
            </p>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className="mt-10">
              <DownloadButtons placement="hero" align="center" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
