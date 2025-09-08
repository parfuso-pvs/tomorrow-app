/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tomorrow/ui', '@tomorrow/database', '@tomorrow/utils'],
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig