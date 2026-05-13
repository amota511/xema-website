"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { APP_STORE_URL, logWebsiteEvent } from "@/lib/site";
import AndroidInterestModal from "./AndroidInterestModal";
import { useState } from "react";

export default function Header() {
  const [androidOpen, setAndroidOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.15]);
  const backgroundColor = useMotionTemplate`rgba(246, 247, 245, ${bgOpacity})`;
  const borderColor = useMotionTemplate`rgba(229, 231, 229, ${borderOpacity})`;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/icon.png" alt="Eczemate" width={32} height={32} className="rounded-lg" />
          <span className="hidden font-display text-lg font-semibold text-sage-500 sm:inline">
            eczemate
          </span>
        </Link>

        {/* App actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-xl bg-sage-950 px-3 text-xs font-semibold text-white transition-colors hover:bg-sage-900 sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">iOS</span>
            <span className="hidden sm:inline">Download iOS app</span>
          </a>
          <button
            type="button"
            onClick={() => {
              void logWebsiteEvent({
                type: "android_download_click",
                placement: "header",
                ctaLabel: "Android",
              }).catch(() => {});
              setAndroidOpen(true);
            }}
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-xl border border-sage-300 bg-white/55 px-3 text-xs font-semibold text-sage-800 transition-colors hover:border-sage-500 hover:bg-white/80 hover:text-sage-950 sm:px-5 sm:text-sm"
          >
            Android
          </button>
        </div>
      </nav>
      <AndroidInterestModal
        isOpen={androidOpen}
        placement="header"
        ctaLabel="Android"
        onClose={() => setAndroidOpen(false)}
      />
    </motion.header>
  );
}
