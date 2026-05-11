"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  logWebsiteEvent,
  type WebsiteEventPlacement,
} from "@/lib/site";

type AndroidInterestModalProps = {
  isOpen: boolean;
  placement: WebsiteEventPlacement;
  onClose: () => void;
};

export default function AndroidInterestModal({
  isOpen,
  placement,
  onClose,
}: AndroidInterestModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  function resetForm() {
    setEmail("");
    setStatus("idle");
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      await logWebsiteEvent({
        type: "android_waitlist_signup",
        placement,
        email,
      });
      setStatus("submitted");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  return (
    <AnimatePresence onExitComplete={resetForm}>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="android-interest-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute inset-0 bg-sage-950/45 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close Android interest modal"
          />

          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white p-7 shadow-2xl shadow-sage-950/25"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-sage-500 transition-colors hover:bg-sage-50 hover:text-sage-950"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 9.48l1.84-3.18a.75.75 0 10-1.3-.75l-1.86 3.22A9.42 9.42 0 0012 7.75c-1.51 0-2.95.36-4.22 1.02L5.92 5.55a.75.75 0 10-1.3.75l1.84 3.18A8.15 8.15 0 003 15.75h18a8.15 8.15 0 00-3.4-6.27zM8.25 13.25a1 1 0 110-2 1 1 0 010 2zm7.5 0a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>

            {status === "submitted" ? (
              <div>
                <h2
                  id="android-interest-title"
                  className="font-display text-3xl font-bold text-sage-950"
                >
                  You&apos;re on the Android list.
                </h2>
                <p className="mt-4 text-sage-600">
                  We&apos;ll send one note when Eczemate for Android is ready.
                </p>
                <button
                  onClick={onClose}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-sage-950 px-6 py-4 font-semibold text-white transition-colors hover:bg-sage-900"
                >
                  Got it
                </button>
              </div>
            ) : (
              <div>
                <h2
                  id="android-interest-title"
                  className="font-display text-3xl font-bold text-sage-950"
                >
                  Android is on the way.
                </h2>
                <p className="mt-4 text-sage-600">
                  Want an email when it&apos;s ready? Leave your address and
                  we&apos;ll only use it for the Android launch.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-sage-200 bg-surface px-5 py-4 text-sage-950 outline-none transition focus:border-sage-400 focus:ring-4 focus:ring-sage-200"
                    aria-label="Email address"
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-sage-950 px-6 py-4 font-semibold text-white transition-colors hover:bg-sage-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? "Saving..." : "Email me when ready"}
                  </button>
                </form>

                <button
                  onClick={onClose}
                  className="mt-4 w-full text-sm font-medium text-sage-500 transition-colors hover:text-sage-800"
                >
                  Not now
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
