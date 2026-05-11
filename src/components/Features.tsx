"use client";

import { motion } from "framer-motion";
import { AnimatedHeadline, FadeUp } from "./AnimatedText";
import { CurrentTabMockup, TAB_MOCKUPS } from "./AppMockups";

const tabs = [
  ["home", "Daily check-in"],
  ["meals", "Food stress"],
  ["scan", "Label checks"],
  ["journey", "Appointments"],
] as const;

export default function Features() {
  return (
    <section id="features" className="relative bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage-200 bg-white/70 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-semibold text-sage-700">
                Four tabs for the moments that matter
              </span>
            </span>
          </FadeUp>
          <AnimatedHeadline
            text="A place for the clues you keep trying to remember."
            as="h2"
            className="font-display text-4xl font-bold leading-tight text-sage-950 sm:text-5xl lg:text-6xl"
          />
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-sage-600">
              Eczema is rarely one thing. Eczemate keeps products, meals,
              routines, sleep, weather, and notes close enough to compare.
            </p>
          </FadeUp>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {tabs.map(([key, eyebrow], index) => {
            const tab = TAB_MOCKUPS[key];
            return (
              <motion.article
                key={key}
                className="overflow-hidden rounded-2xl border border-sage-200 bg-white shadow-sm shadow-sage-900/5"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
              >
                <div className="p-8 sm:p-10">
                  <div
                    className="mb-5 h-1.5 w-14 rounded-full"
                    style={{ backgroundColor: tab.accent }}
                  />
                  <div className="text-sm font-bold uppercase text-sage-500">
                    {tab.label} / {eyebrow}
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-sage-950">
                    {tab.title}
                  </h3>
                  <p className="mt-5 text-base leading-7 text-sage-600">
                    {tab.subtitle}
                  </p>
                </div>
                <div className="flex min-h-[500px] items-start justify-center bg-sage-50 px-6 pt-8">
                  <CurrentTabMockup kind={key} className="w-[250px]" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
