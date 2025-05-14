/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Sitemap ve robots dosyalarını doğrudan public klasöründen sunmak için
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/public/sitemap.xml',
      },
      {
        source: '/robots.txt',
        destination: '/public/robots.txt',
      },
    ]
  },
}

export default nextConfig
