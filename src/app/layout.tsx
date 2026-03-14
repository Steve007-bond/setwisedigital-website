import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Setwise Digital | Technology Simplified",
    template: "%s | Setwise Digital",
  },
  description:
    "Setwise Digital makes everyday technology simple. Step-by-step guides for printers, GPS, smart home devices, cameras and more — in plain English.",
  keywords: [
    "technology help",
    "printer setup",
    "GPS update",
    "Alexa setup",
    "smart home guide",
    "tech support",
    "technology simplified",
    "Setwise Digital",
  ],
  authors: [{ name: "Setwise Digital", url: "https://setwisedigital.com" }],
  creator: "Setwise Digital",
  metadataBase: new URL("https://setwisedigital.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://setwisedigital.com",
    siteName: "Setwise Digital",
    title: "Setwise Digital | Technology Simplified",
    description:
      "We bridge the gap between complex tech and everyday ease. Plain-English guides for printers, GPS, smart home devices, cameras and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Setwise Digital – Technology Simplified",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Setwise Digital | Technology Simplified",
    description:
      "Plain-English tech guides for printers, GPS, smart home and more.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
