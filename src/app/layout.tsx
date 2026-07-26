import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bandekar's Digital Imaging | Premium Neon Signs & Large Format Printing",
  description: "Transform your brand with Bandekar's Digital Imaging. We specialize in high-end neon signs, LED displays, acrylic signs, vehicle wraps, and large format digital printing.",
  keywords: ["Bandekar's Digital Imaging", "neon signs", "LED displays", "acrylic signs", "vehicle wraps", "large format printing", "digital signage", "sign board design", "printing solutions"],
  openGraph: {
    title: "Bandekar's Digital Imaging | Premium Neon Signs & Large Format Printing",
    description: "Transform your brand with high-end neon signs, LED displays, acrylic signs, vehicle wraps, and large format digital printing. Printing ideas into reality.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body>{children}</body>
    </html>
  );
}
