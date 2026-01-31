import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-sage-500 flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm tracking-tight">
                  x
                </span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-sage-950">
                xema
              </span>
            </Link>
            <p className="text-sage-500 text-sm max-w-xs">
              Predict, understand, and protect your skin. Eczema management,
              simplified.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-sm">
            <a
              href="/#features"
              className="text-sage-600 hover:text-sage-950 transition-colors"
            >
              Features
            </a>
            <Link
              href="/privacy"
              className="text-sage-600 hover:text-sage-950 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sage-600 hover:text-sage-950 transition-colors"
            >
              Terms of Use
            </Link>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sage-400 text-sm">
            &copy; {new Date().getFullYear()} Xema. All rights reserved.
          </p>
          <p className="text-sage-400 text-xs">
            Made with care for people living with eczema.
          </p>
        </div>
      </div>
    </footer>
  );
}
