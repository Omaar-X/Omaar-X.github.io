import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: staticExport,
  },
  trailingSlash: true,
  ...(staticExport && { output: "export" }),
};

export default nextConfig;
