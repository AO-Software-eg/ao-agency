import type { NextConfig } from "next";

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
      }
    ],
  },
  allowedDevOrigins: ['192.168.1.3'],
};

export default nextConfig;
