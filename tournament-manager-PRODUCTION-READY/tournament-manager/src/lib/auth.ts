import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Validación de credenciales (implementar con BD)
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Mock user - reemplazar con consulta a BD
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          return {
            id: '1',
            name: 'Test User',
            email: credentials.email,
            image: null
          }
        }

        return null
      }
    })
  ],

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'ORGANIZER' // Default role
        token.organizationId = 'default-org'
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.organizationId = token.organizationId as string
      }
      return session
    }
  }
}
