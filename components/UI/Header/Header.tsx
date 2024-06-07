'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { ModeToggler } from '@/components/Theme'
import { Heading } from '@/components/UI/Heading'
import { TransitionLink } from '@/components/TransitionLink'
import { useSession } from 'next-auth/react'
import { Button } from '../Button'

export const Header = () => {
  const pathname = usePathname()
  const session = useSession()
  return (
    <header className="w-full z-10 fixed py-5 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 border-b dark:border-zinc-600">
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
        <div className="flex gap-4 items-center">
          {session.status === 'authenticated' && session.data.user?.email === 'andrew.lashchev15@gmail.com' && (
            <TransitionLink href="/dashboard">
              <Button variant="outline" className="bg-zinc-50 dark:bg-zinc-900">
                Dashboard
              </Button>
            </TransitionLink>
          )}
          <ModeToggler />
        </div>
      </div>
    </header>
  )
}
