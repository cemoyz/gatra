/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hanya gunakan standalone output jika bukan di Vercel (untuk Docker / self-hosted)
  ...(process.env.VERCEL ? {} : { output: 'standalone' }),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
