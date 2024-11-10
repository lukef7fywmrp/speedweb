import "./globals.css";

import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHeading = Instrument_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://withspeedweb.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: "Speedweb | High-Converting Landing Pages",
  description:
    "Boost your sales with psychology-driven, conversion-focused landing pages. Transform visitors into customers with our expert web design services.",
  keywords: "landing pages, conversion optimization, web design, sales boost",
  openGraph: {
    title: "Speedweb | High-Converting Landing Pages",
    description: "Boost your sales with psychology-driven, conversion-focused landing pages.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage.default,
        width: 1200,
        height: 630,
        alt: "Speedweb - High Converting Landing Pages",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
    other: {
      rel: "apple-touch-icon",
      url: "/favicon.svg",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Speedweb | High-Converting Landing Pages",
    description: "Boost your sales with psychology-driven, conversion-focused landing pages.",
    images: [siteConfig.ogImage.twitter],
  },
  verification: {
    google: "7jOURQU_OUwDcuG9P7HzNX4LrQNvh-Qn8DGiWm9D7b0",
  },
  other: {
    "social:instagram": "https://instagram.com/speedwebofficial",
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
