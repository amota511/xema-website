"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

export default function Header() {
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
            href="https://apps.apple.com/us/app/eczemate-eczema-care/id6740091498"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white bg-sage-950 px-5 py-2.5 rounded-xl hover:bg-sage-900 transition-colors"
          >
            Download
          </a>
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </nav>
    </motion.header>
  );
}
