'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { ModeToggler } from '@/components/Theme'
import { Heading } from '@/components/UI/Heading'
import { TransitionLink } from '@/components/TransitionLink'
import { useSession } from 'next-auth/react'
import { Button } from '../Button'
import { SignOut } from '@/components/SignOut'

type HeaderProps = {
  callbackBaseUrl: string
}

export const Header = ({ callbackBaseUrl }: HeaderProps) => {
  const pathname = usePathname()
  const session = useSession()

  const callbackUrl = callbackBaseUrl + pathname

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
          {session.status !== 'loading' && (
            <>
              {session?.status === 'authenticated' ? (
                <>
                  <TransitionLink href="/dashboard">
                    <Button variant="outline" className="bg-zinc-50 dark:bg-zinc-900">
                      Dashboard
                    </Button>
                  </TransitionLink>
                  <SignOut variant="outline" callbackUrl={pathname} />
                </>
              ) : (
                <TransitionLink href={`/login?callbackUrl=${callbackUrl}`}>
                  <Button variant="outline" className="bg-zinc-50 dark:bg-zinc-900">
                    Login
                  </Button>
                </TransitionLink>
              )}
            </>
          )}
          <ModeToggler />
        </div>
      </div>
    </header>
  )
}
