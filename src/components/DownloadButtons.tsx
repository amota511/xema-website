"use client";

import { useState } from "react";
import {
  APP_STORE_URL,
  logWebsiteEvent,
  type WebsiteEventPlacement,
} from "@/lib/site";
import AndroidInterestModal from "./AndroidInterestModal";

type DownloadButtonsProps = {
  placement: WebsiteEventPlacement;
  tone?: "light" | "dark";
  align?: "left" | "center";
};

export default function DownloadButtons({
  placement,
  tone = "dark",
  align = "left",
}: DownloadButtonsProps) {
  const [androidOpen, setAndroidOpen] = useState(false);
  const isLight = tone === "light";

  function handleAndroidClick() {
    void logWebsiteEvent({
      type: "android_download_click",
      placement,
      ctaLabel: "Download for Android",
    }).catch(() => {});
    setAndroidOpen(true);
  }

  const iosClass = isLight
    ? "bg-white text-sage-950 hover:shadow-white/20"
    : "bg-sage-950 text-white hover:bg-sage-900 hover:shadow-sage-950/20";
  const androidClass = isLight
    ? "border-white/35 text-white hover:bg-white/10"
    : "border-sage-300 text-sage-800 hover:border-sage-500 hover:bg-white/60";

  return (
    <>
      <div
        className={`flex flex-col gap-3 sm:flex-row ${
          align === "center"
            ? "items-stretch justify-center sm:items-center"
            : "items-stretch sm:items-start"
        }`}
      >
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl px-7 py-4 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto ${iosClass}`}
        >
          <AppleIcon />
          Download for iOS
        </a>
        <button
          type="button"
          onClick={handleAndroidClick}
          className={`inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border px-7 py-4 font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:w-auto ${androidClass}`}
        >
          <AndroidIcon />
          Download for Android
        </button>
      </div>

      <AndroidInterestModal
        isOpen={androidOpen}
        placement={placement}
        ctaLabel="Download for Android"
        onClose={() => setAndroidOpen(false)}
      />
    </>
  );
}

function AppleIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18a.75.75 0 10-1.3-.75l-1.86 3.22A9.42 9.42 0 0012 7.75c-1.51 0-2.95.36-4.22 1.02L5.92 5.55a.75.75 0 10-1.3.75l1.84 3.18A8.15 8.15 0 003 15.75h18a8.15 8.15 0 00-3.4-6.27zM8.25 13.25a1 1 0 110-2 1 1 0 010 2zm7.5 0a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  );
}
