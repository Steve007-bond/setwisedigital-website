import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
      { protocol: "https", hostname: "*.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Fix old path references from previous deployments
      { source: "/tools/wifi-speed-checker", destination: "/tools/wifi-checker", permanent: true },
      { source: "/tools/gps-update-guide", destination: "/tools/gps-update-scheduler", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
