import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
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
  metadataBase: new URL("https://xema.app"),
  title: "Xema — Stay Ahead of Eczema Flare-Ups",
  description:
    "Predict flare-ups before they happen, track your symptoms, scan products for irritants, and learn what triggers your skin. Xema helps you take control of eczema.",
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
    title: "Xema — Stay Ahead of Eczema Flare-Ups",
    description:
      "Predict flare-ups, track symptoms, scan products, and learn your triggers. Eczema management, simplified.",
    type: "website",
    images: ["/icon.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/icon.png",
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
        {children}
      </body>
    </html>
  );
}
