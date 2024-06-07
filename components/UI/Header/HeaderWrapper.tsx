'use client'

import { SessionProvider } from 'next-auth/react'
import { Header } from './Header'

export const HeaderWrapper = () => {
  return (
    <SessionProvider>
      <Header />
    </SessionProvider>
  )
}
