"use client";

import { useInView } from "@/hooks/useInView";

const features = [
  {
    title: "Predict Flare-Ups",
    description:
      "AI-powered forecasts analyze weather, air quality, and your personal patterns to warn you before a flare starts.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
    gradient: "from-amber-50 to-orange-50",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
  {
    title: "Track Symptoms",
    description:
      "Log itch, redness, and dryness daily. See 30-day trends, identify patterns, and watch your progress over time.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    gradient: "from-sage-50 to-emerald-50",
    iconColor: "text-sage-500",
    iconBg: "bg-sage-50",
  },
  {
    title: "Scan Products",
    description:
      "Point your camera at any skincare product or scan a barcode. Xema flags irritating ingredients personalized to your skin.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 9v6m3-3H9"
        />
      </svg>
    ),
    gradient: "from-violet-50 to-purple-50",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
  },
  {
    title: "Learn & Understand",
    description:
      "Expert-curated content on managing flares, skincare routines, dietary triggers, and the latest eczema research.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    gradient: "from-sky-50 to-blue-50",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50",
  },
];

export default function Features() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="features" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} text-center max-w-2xl mx-auto mb-16 sm:mb-20`}>
          <div className="inline-flex items-center gap-2 bg-sage-500/10 border border-sage-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sage-600 text-sm font-medium">
              Everything you need
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-sage-950 mb-5">
            Your skin, understood
          </h2>
          <p className="text-lg text-sage-600 leading-relaxed">
            Four powerful tools working together to help you manage eczema with
            confidence and clarity.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`reveal stagger-${index + 1} ${isVisible ? "visible" : ""}`}
    >
      <div
        className={`group relative bg-gradient-to-br ${feature.gradient} border border-border/60 rounded-[var(--radius-card)] p-8 sm:p-10 transition-all duration-500 hover:shadow-lg hover:shadow-sage-900/5 hover:-translate-y-1`}
      >
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}
        >
          {feature.icon}
        </div>

        {/* Content */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-sage-950 mb-3">
          {feature.title}
        </h3>
        <p className="text-sage-600 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}
