import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

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
    "Setwise Digital is an independent tech literacy platform. Plain-English courses on printers, GPS, smart home, cameras and more. Learn at your own pace — no prior knowledge needed.",
  keywords: [
    "technology education",
    "tech literacy",
    "printer learning guide",
    "GPS course",
    "Alexa tutorial",
    "smart home lessons",
    "technology courses",
    "independent tech education",
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
      "Independent tech literacy platform. Plain-English courses and tutorials for printers, GPS navigation, smart home, cameras and online safety. Learn at your own pace.",
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
      "Independent tech literacy courses for printers, GPS, smart home, cameras and online safety.",
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
  children: import("react").ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W29RTSF3');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W29RTSF3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
