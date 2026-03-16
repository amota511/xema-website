"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <motion.span
          className="block w-5 h-0.5 bg-sage-950"
          animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-5 h-0.5 bg-sage-950"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-5 h-0.5 bg-sage-950"
          animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </button>

      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-surface/95 backdrop-blur-lg border-b border-border/60"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="text-sage-700 hover:text-sage-950 py-2 transition-colors"
              >
                Features
              </a>
              <Link
                href="/privacy"
                onClick={() => setIsOpen(false)}
                className="text-sage-700 hover:text-sage-950 py-2 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                onClick={() => setIsOpen(false)}
                className="text-sage-700 hover:text-sage-950 py-2 transition-colors"
              >
                Terms
              </Link>
              <a
                href="https://apps.apple.com/us/app/eczemate-eczema-care/id6740091498"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-center font-semibold text-white bg-sage-950 px-5 py-3 rounded-xl hover:bg-sage-900 transition-colors"
              >
                Download
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
