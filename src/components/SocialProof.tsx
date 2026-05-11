"use client";

import { FadeUp } from "./AnimatedText";

const proof = [
  [
    "Remember the last two weeks",
    "See the products, meals, sleep, weather, and routines that surrounded a flare.",
  ],
  [
    "Keep what is actually helping",
    "Hold onto the routine steps and safe products that seem to calm things down.",
  ],
  [
    "Ask better questions",
    "Bring notes, photos, patterns, and a short list of what you want answered.",
  ],
];

export default function SocialProof() {
  return (
    <section className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp delay={0.2}>
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-display text-3xl leading-tight text-sage-950 sm:text-4xl">
              Eczema care is easier when the details are in one place.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-sage-600">
              Keep products, meals, routines, sleep, weather, notes, and
              photos together so you can look back without relying on memory.
            </p>
          </blockquote>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {proof.map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-sage-200 bg-surface p-6">
                <div className="font-display text-2xl font-bold text-sage-950">{title}</div>
                <p className="mt-3 text-sm leading-6 text-sage-600">{body}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
