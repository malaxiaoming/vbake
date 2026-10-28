/** @type {import('next').NextConfig} */
const nextConfig = {
  // These pages still hold sample content; send visitors to the cakes catalogue until they're ready
  async redirects() {
    return ["/promotions", "/gifts", "/flowers", "/catering"].map((source) => ({
      source,
      destination: "/cakes",
      permanent: false,
    }));
  },
};

export default nextConfig;
