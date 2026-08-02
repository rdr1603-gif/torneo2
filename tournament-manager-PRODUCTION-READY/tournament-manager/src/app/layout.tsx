import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tournament Manager - Gestión de Torneos de Pádel',
  description: 'Sistema profesional con Motor Inteligente para gestionar torneos de pádel',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://tournament-manager.com',
    title: 'Tournament Manager',
    description: 'Gestión profesional de torneos de pádel'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  )
}
