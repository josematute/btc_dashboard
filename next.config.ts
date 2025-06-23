import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "img.youtube.com", // Allow all hostnames
        port: "",
        pathname: "**" // Allow all paths
      }
    ]
  }
};

export default nextConfig;