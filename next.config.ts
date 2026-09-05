import type { NextConfig } from "next";
import next from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ty574q8ip7.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "ty574q8ip.ufs.sh",
      },
    ],
  },
  allowedDevOrigins: ["192.168.1.7", "192.168.1.15"],
};

export default bundleAnalyzer(nextConfig);
