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
