import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logos.skyscnr.com",
        port: "",
        pathname: "/images/airlines/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "content.skyscnr.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
