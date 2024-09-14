import "./globals.css";

import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHeading = Instrument_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speedweb | High-Converting Landing Pages",
  description:
    "Boost your sales with psychology-driven, conversion-focused landing pages. Transform visitors into customers with our expert web design services.",
  keywords: "landing pages, conversion optimization, web design, sales boost",
  openGraph: {
    title: "Speedweb | High-Converting Landing Pages",
    description: "Boost your sales with psychology-driven, conversion-focused landing pages.",
    url: "https://www.yourwebsite.com",
    siteName: "Speedweb",
    images: [
      {
        url: "https://www.yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speedweb | High-Converting Landing Pages",
    description: "Boost your sales with psychology-driven, conversion-focused landing pages.",
    images: ["https://www.yourwebsite.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
