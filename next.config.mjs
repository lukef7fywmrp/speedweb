/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.withsupafast.com",
      },
    ],
  },
};

export default nextConfig;
