"use client";

import { motion } from "framer-motion";
import { AnimatedHeadline, FadeUp } from "./AnimatedText";
import DownloadButtons from "./DownloadButtons";
import { WeeklyCluesMockup } from "./AppMockups";

export default function CTA() {
  return (
    <section className="relative flex overflow-hidden bg-sage-950">
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <AnimatedHeadline
              text="Stop trying to remember eczema from memory."
              as="h2"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            />

            <FadeUp delay={0.3}>
              <p className="mt-6 text-lg text-sage-300/80 max-w-md mx-auto lg:mx-0">
                Start with one scan or one check-in. The useful patterns can
                build from there.
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="mt-10">
                <DownloadButtons placement="final_cta" tone="light" />
              </div>
            </FadeUp>
          </div>

          <motion.div
            className="relative hidden lg:flex items-center justify-center"
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
            <WeeklyCluesMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
