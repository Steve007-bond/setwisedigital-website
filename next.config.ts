import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800, // 7 days — was 1 day
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
      { protocol: "https", hostname: "*.unsplash.com" },
    ],
    deviceSizes: [390, 640, 750, 828, 1080, 1200],  // mobile-first: 390 added
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  async redirects() {
    return [
      { source: "/tools/wifi-speed-checker", destination: "/tools/wifi-checker", permanent: true },
      { source: "/tools/gps-update-guide",   destination: "/tools/gps-update-scheduler", permanent: true },
    ];
  },

  async headers() {
    return [
      // Static assets — immutable cache (JS/CSS/images/fonts)
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Optimised Next.js images — 7 day cache
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      // HTML pages — always revalidate (CDN can serve stale)
      {
        source: "/((?!_next).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  compress: true,
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
