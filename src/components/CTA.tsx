"use client";

import { AnimatedHeadline, FadeUp } from "./AnimatedText";
import DownloadButtons from "./DownloadButtons";

export default function CTA() {
  return (
    <section className="relative flex overflow-hidden bg-sage-950">
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedHeadline
            text="Start managing eczema with more clarity."
            as="h2"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
          />

          <FadeUp delay={0.3}>
            <p className="mx-auto mt-6 max-w-md text-lg text-sage-300/80">
              Start with one scan or one check-in. The useful patterns can
              build from there.
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="mt-10">
              <DownloadButtons
                placement="final_cta"
                tone="light"
                align="center"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
