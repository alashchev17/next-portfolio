import type { Metadata } from 'next'

import '@/styles/globals.css'

import { Roboto_Flex } from 'next/font/google'
import { cn } from '@/lib/utils'

import { Header } from '@/components/UI/Header'
import { Toaster } from '@/components/UI/Toaster'
import { Providers } from '@/components/Providers'
import { headers } from 'next/headers'

const RobotoFlexFont = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Andrii Lashchov | Home',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto') || 'http'

  const callbackBaseUrl = `${protocol}://${host}`

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', RobotoFlexFont.variable)}>
        <Providers>
          <Header callbackBaseUrl={callbackBaseUrl} />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
