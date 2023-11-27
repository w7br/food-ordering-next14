/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    transpilePackages: [
      '@next-auth/firebase-adapter'
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'dawid-food-ordering.s3.amazonaws.com',
      },
    ]
  }
}

module.exports = nextConfig
