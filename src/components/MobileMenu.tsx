"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-0.5 bg-sage-950 transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-sage-950 transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-sage-950 transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-border/50 bg-surface/95 backdrop-blur-xl">
          <nav className="flex flex-col gap-1 px-6 py-4">
            <a
              href="/#features"
              onClick={() => setOpen(false)}
              className="text-sage-700 hover:text-sage-950 transition-colors text-base font-medium py-2"
            >
              Features
            </a>
            <Link
              href="/privacy"
              onClick={() => setOpen(false)}
              className="text-sage-700 hover:text-sage-950 transition-colors text-base font-medium py-2"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              onClick={() => setOpen(false)}
              className="text-sage-700 hover:text-sage-950 transition-colors text-base font-medium py-2"
            >
              Terms
            </Link>
            <a
              href="/#download"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-sage-950 text-white text-base font-medium px-5 py-3 rounded-[var(--radius-button)] hover:bg-sage-800 transition-colors"
            >
              Download
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
