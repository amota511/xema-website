"use client";

import { motion } from "framer-motion";
import { AnimatedHeadline, FadeUp } from "./AnimatedText";
import DownloadButtons from "./DownloadButtons";
import { HeroPhoneCluster, PhoneFrame } from "./AppMockups";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#F5F1E8]">
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-surface to-transparent" />
      <HeroPhoneCluster />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pb-24 pt-28">
        <div className="max-w-2xl">
          <FadeUp>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white/70 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-sage-500" />
              <span className="text-sm font-semibold text-sage-700">
                Eczema tracking for children and adults
              </span>
            </div>
          </FadeUp>

          <AnimatedHeadline
            text="When skin flares, know what changed."
            as="h1"
            className="font-display text-5xl font-bold leading-[1.02] text-sage-950 sm:text-6xl lg:text-7xl"
          />

          <FadeUp delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-sage-700 sm:text-xl">
              Track routines, foods, products, sleep, weather, and notes in
              one calm place, so you can stop guessing and bring clearer
              context to care.
            </p>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className="mt-10">
              <DownloadButtons placement="hero" />
            </div>
          </FadeUp>
        </div>

        <motion.div
          className="relative mt-14 flex justify-center lg:hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", damping: 20, stiffness: 80 }}
        >
          <PhoneFrame className="w-[285px]">
            <div className="flex h-full flex-col justify-center bg-[#F8F7F2] px-6 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-sage-100 text-3xl text-sage-700">
                +
              </div>
              <div className="font-display text-3xl font-bold text-sage-950">
                Less guessing.
              </div>
              <div className="mt-4 text-sm leading-6 text-sage-600">
                A calmer way to remember what changed.
              </div>
            </div>
          </PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}
