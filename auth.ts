import NextAuth from 'next-auth'
import type { User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { users } from '@/database/users'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          required: true,
        },
        password: {
          label: 'Password',
          type: 'password',
          required: true,
        },
      },
      async authorize(credentials) {
        console.log(`[SERVER]: Received credentials from login form: ${JSON.stringify(credentials)}`)
        if (!credentials.email || !credentials.password) return null

        const currentUser = users.find((user) => user.email === credentials.email)
        if (!currentUser) return null

        if (currentUser.password === credentials.password) {
          return {
            id: currentUser.id.toString(),
            name: currentUser.name,
            email: currentUser.email,
          } as User
        }

        return null
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: '/login',
  },
})
