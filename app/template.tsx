'use client'

import { useEffect } from 'react'

import { animatePageIn } from '@/animations'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    animatePageIn()
  }, [pathname])

  return (
    <div>
      <div id="transition-element" className="w-screen h-screen bg-zinc-50 dark:bg-zinc-800 z-10 fixed top-0 left-0"></div>
      {children}
    </div>
  )
}
