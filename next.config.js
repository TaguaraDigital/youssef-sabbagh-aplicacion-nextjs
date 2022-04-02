/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["beta.mejorconsalud.com", "mejorconsalud.com", "localhost:9045"],
  },
};

module.exports = nextConfig;
