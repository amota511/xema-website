"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
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
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/icon.png" alt="Eczemate" width={32} height={32} className="rounded-lg" />
          <span className="font-display text-lg font-semibold text-sage-500">
            eczemate
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-sage-700 hover:text-sage-950 transition-colors link-underline"
          >
            Features
          </a>
          <Link
            href="/privacy"
            className="text-sm text-sage-700 hover:text-sage-950 transition-colors link-underline"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-sage-700 hover:text-sage-950 transition-colors link-underline"
          >
            Terms
          </Link>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white bg-sage-950 px-5 py-2.5 rounded-xl hover:bg-sage-900 transition-colors"
          >
            iOS
          </a>
          <button
            type="button"
            onClick={() => {
              void logWebsiteEvent({
                type: "android_download_click",
                placement: "header",
              }).catch(() => {});
              setAndroidOpen(true);
            }}
            className="text-sm font-semibold text-sage-800 border border-sage-300 px-5 py-2.5 rounded-xl hover:border-sage-500 hover:bg-white/60 transition-colors"
          >
            Android
          </button>
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </nav>
      <AndroidInterestModal
        isOpen={androidOpen}
        placement="header"
        onClose={() => setAndroidOpen(false)}
      />
    </motion.header>
  );
}
