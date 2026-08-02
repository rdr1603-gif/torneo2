'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card } from '@/components/common/Card'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🏆 Tournament Manager
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Sistema profesional de gestión de torneos de pádel con Motor Inteligente
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="space-y-4">
              <div className="text-4xl">🤖</div>
              <h3 className="font-bold text-lg">Motor Inteligente</h3>
              <p className="text-gray-600 text-sm">
                IA que elige automáticamente qué partido jugar considerando 7+ factores
              </p>
            </Card>

            <Card className="space-y-4">
              <div className="text-4xl">⚡</div>
              <h3 className="font-bold text-lg">Real-time</h3>
              <p className="text-gray-600 text-sm">
                Actualizaciones en vivo con WebSocket para toda la información
              </p>
            </Card>

            <Card className="space-y-4">
              <div className="text-4xl">📊</div>
              <h3 className="font-bold text-lg">Análisis</h3>
              <p className="text-gray-600 text-sm">
                Dashboards avanzados y métricas en tiempo real
              </p>
            </Card>
          </div>

          <Link
            href="/api/auth/signin"
            className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition"
          >
            Ingresar →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">
        ¡Bienvenido, {session?.user?.name}!
      </h1>
      <p className="text-gray-600 mt-2">
        Ir al {' '}
        <Link href="/tournaments" className="text-primary hover:underline">
          dashboard de torneos
        </Link>
      </p>
    </div>
  )
}
