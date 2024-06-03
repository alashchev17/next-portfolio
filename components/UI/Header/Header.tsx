'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { ModeToggler } from '@/components/Theme'
import { Heading } from '@/components/UI/Heading'
import { TransitionLink } from '@/components/TransitionLink'

export const Header = () => {
  const pathname = usePathname()
  return (
    <header className="w-full z-10 fixed py-5 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 border-b">
      <div className="container flex items-center justify-between ">
        {pathname !== '/' ? (
          <TransitionLink href="/">
            <Heading level={5}>Andrii Lashchov</Heading>
          </TransitionLink>
        ) : (
          <Link href="/">
            <Heading level={5}>Andrii Lashchov</Heading>
          </Link>
        )}
        <ModeToggler />
      </div>
    </header>
  )
}
