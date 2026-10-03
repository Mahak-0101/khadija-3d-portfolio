import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khadijafarhat.com"),
  title: "Khadija Farhat — Model Portfolio",
  description:
    "Official 3D motion and luxury editorial portfolio of Khadija Farhat. Featuring bridal haute couture, motion reels, high-fashion campaigns, and architectural styling.",
  keywords: [
    "Khadija Farhat",
    "Model Portfolio",
    "Haute Couture Model",
    "Editorial Model",
    "Bridal Couture",
    "Fashion Model",
    "Motion Portfolio",
  ],
  authors: [{ name: "Khadija Farhat" }],
  creator: "Khadija Farhat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khadijafarhat.com",
    title: "Khadija Farhat — Model Portfolio",
    description:
      "Official 3D motion and luxury editorial portfolio of Khadija Farhat. Featuring bridal haute couture, motion reels, and runway campaigns.",
    siteName: "Khadija Farhat Portfolio",
    images: [
      {
        url: "/images/khadija/khadija-red-saree-runway.jpg",
        width: 1066,
        height: 1600,
        alt: "Khadija Farhat — Haute Couture Saree Editorial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khadija Farhat — Model Portfolio",
    description: "Official 3D motion and luxury editorial portfolio of Khadija Farhat.",
    images: ["/images/khadija/khadija-red-saree-runway.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-couture-950 text-couture-cream selection:bg-couture-gold selection:text-couture-950 antialiased min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-50 bg-noise opacity-40 mix-blend-overlay" />
        {children}
      </body>
    </html>
  );
}
