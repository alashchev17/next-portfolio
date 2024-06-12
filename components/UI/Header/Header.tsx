'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { ModeToggler } from '@/components/Theme'
import { Heading } from '@/components/UI/Heading'
import { TransitionLink } from '@/components/TransitionLink'
import { UserAvatar } from '@/components/UI/UserAvatar'

type HeaderProps = {
  callbackBaseUrl: string
}

export const Header = ({ callbackBaseUrl }: HeaderProps) => {
  const pathname = usePathname()

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
        <div className="flex max-sm:gap-1 gap-4 items-center">
          <ModeToggler />
          <UserAvatar callbackUrl={callbackUrl} />
        </div>
      </div>
    </header>
  )
}
