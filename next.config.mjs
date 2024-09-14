/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.withsupafast.com",
        protocol: "https",
      },
      {
        hostname: "logo.clearbit.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
