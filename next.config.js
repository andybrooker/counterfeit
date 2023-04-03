/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "binsta.dev",
        port: "",
        pathname: "/api/v1/files/**",
      },
    ],
  },
};

module.exports = nextConfig;
