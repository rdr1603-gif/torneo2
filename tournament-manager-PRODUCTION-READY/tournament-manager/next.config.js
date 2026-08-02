/** @type {import('next').NextConfig} */

// Bundle analyzer (solo en modo ANALYZE)
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
  ? require('@next/bundle-analyzer')({
      enabled: true
    })
  : (config) => config

const nextConfig = {
  reactStrictMode: true,
  
  // Optimizaciones de compilación
  swcMinify: true,
  compress: true,

  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ]
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true
      }
    ]
  },

  // Environment variables públicas
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN
  },

  // Experimental features para mejor performance
  experimental: {
    optimizePackageImports: [
      'recharts',
      'date-fns',
      '@heroicons/react',
      'lucide-react'
    ],
    serverMinification: true
  }
}

module.exports = withBundleAnalyzer(nextConfig)
