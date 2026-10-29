/** @type {import('next').NextConfig} */
const nextConfig = {
  // These pages were removed; keep old links working by sending visitors to the cakes catalogue
  async redirects() {
    return ["/promotions", "/gifts", "/flowers", "/catering"].map((source) => ({
      source,
      destination: "/cakes",
      permanent: false,
    }));
  },
};

export default nextConfig;
