/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@tomorrow/ui", "@tomorrow/database", "@tomorrow/utils"],
}

module.exports = nextConfig