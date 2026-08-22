import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // L'indicateur de développement masque le coin bas-gauche pendant les revues de design.
  devIndicators: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
