import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('http://localhost:4000/uploads/**'), new URL('https://res.cloudinary.com/**')],
  },
};

export default nextConfig;
