const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.NODE_ENV === "production" ? "https://withspeedweb.com" : "http://localhost:3000");

export const siteConfig = {
  name: "Speedweb",
  url: baseUrl,
  ogImage: {
    default: `${baseUrl}/images/og/default-og.jpeg`,
    twitter: `${baseUrl}/images/og/twitter-og.jpg`,
    about: `${baseUrl}/images/og/about-og.jpg`,
    services: `${baseUrl}/images/og/services-og.jpg`,
  },
} as const;
