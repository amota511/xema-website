import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-sage-950 text-sage-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Logo & tagline */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <Image src="/icon.png" alt="Eczemate" width={28} height={28} className="rounded-lg" />
              <span className="font-display text-lg font-semibold text-sage-300">
                eczemate
              </span>
            </div>
            <p className="text-sm text-sage-500 leading-relaxed">
              Predict, understand, and protect your skin. Eczema management,
              simplified.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm">
            <Link
              href="/privacy"
              className="hover:text-sage-200 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-sage-200 transition-colors"
            >
              Terms
            </Link>
            <a
              href="mailto:heyo@foresightcomputers.com"
              className="hover:text-sage-200 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-sage-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-sage-600">
          <span>&copy; {new Date().getFullYear()} Eczemate</span>
          <span>Made with care for people living with eczema.</span>
        </div>
      </div>
    </footer>
  );
}
