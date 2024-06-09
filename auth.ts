import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  trustHost: true,
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  // },
})
