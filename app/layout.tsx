import type { Metadata } from 'next'

import '@/styles/globals.css'

import { Roboto_Flex } from 'next/font/google'
import { cn } from '@/lib/utils'

import { ThemeProvider } from '@/components/Theme'
import { HeaderWrapper } from '@/components/UI/Header'
import { Toaster } from '@/components/UI/Toaster'

const RobotoFlexFont = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Lashchev Development | Home',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', RobotoFlexFont.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <HeaderWrapper />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
