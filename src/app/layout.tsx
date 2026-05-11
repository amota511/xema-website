import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eczemate.app"),
  title: "Eczemate - Eczema Tracking for Children and Adults",
  description:
    "Everything you need to manage eczema: scan products and foods, track symptoms and routines, and prepare for better care decisions.",
  keywords: [
    "eczema",
    "flare prediction",
    "skin care",
    "symptom tracker",
    "product scanner",
    "eczema management",
    "atopic dermatitis",
  ],
  openGraph: {
    title: "Eczemate - Eczema Tracking for Children and Adults",
    description:
      "Everything you need to manage eczema: scans, tracking, routines, notes, and doctor prep.",
    type: "website",
    images: ["/icon.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dmSans.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
