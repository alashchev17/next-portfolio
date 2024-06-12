'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { TransitionLink } from '@/components/TransitionLink'
import { Skeleton } from '@/components/UI/Skeleton'
import { SignOut } from '@/components/SignOut'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type UserAvatarProps = {
  callbackUrl: string
}

const linksToMap = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/dashboard',
    isPrivate: true,
  },
  {
    id: 2,
    label: 'Login',
    href: '/login',
    isPrivate: false,
  },
]

export const UserAvatar = ({ callbackUrl }: UserAvatarProps) => {
  const session = useSession()
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (session.status === 'loading') {
    return <Skeleton className="w-[32px] h-[32px] rounded-full" />
  }

  if (session.status === 'unauthenticated') {
    return (
      <div className="relative">
        <Image
          src="/notAuthenticatedUser.png"
          alt="Not authenticated user logo"
          width={32}
          height={32}
          className="cursor-pointer w-[32px] h-[32px] rounded-full"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        />
        <div
          className={`absolute top-[calc(100%+0.5rem)] right-0 p-4 flex flex-col min-w-[225px] gap-3 rounded-lg shadow-lg bg-zinc-50 dark:bg-zinc-700 opacity-0 transition-opacity duration-500 ${
            isDropdownOpen && 'opacity-100'
          }`}
        >
          <div className="text-zinc-400 text-sm pb-3 border-b border-zinc-300 dark:border-zinc-500">Sign in to access</div>
          <ul className="flex flex-col gap-3">
            {linksToMap.map((link) => {
              if (!link.isPrivate && link.href === '/login') {
                return (
                  <li key={link.id} onClick={() => setIsDropdownOpen(false)}>
                    {link.href !== pathname ? (
                      <TransitionLink href={`${link.href}?callbackUrl=${callbackUrl}`} label={link.label} />
                    ) : (
                      <Link href={`${link.href}?callbackUrl=${callbackUrl}`}>{link.label}</Link>
                    )}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <Image
        src={session.data?.user?.image || '/notAuthenticatedUser.png'}
        width={32}
        height={32}
        alt={`Logo: ${session.data?.user?.name}`}
        className="cursor-pointer w-[32px] h-[32px] rounded-full"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      />
      <div
        className={`absolute top-[calc(100%+0.5rem)] right-0 p-4 flex flex-col min-w-[225px] gap-3 rounded-lg shadow-lg bg-zinc-50 dark:bg-zinc-700 opacity-0 transition-opacity duration-500 ${
          isDropdownOpen && 'opacity-100'
        }`}
      >
        <div className="text-zinc-400 text-sm pb-3 border-b border-zinc-300 dark:border-zinc-500">
          Signed in as {session.data?.user?.name}
        </div>
        <ul className="flex flex-col gap-3">
          {linksToMap.map((link) => {
            if (link.isPrivate) {
              return (
                <li key={link.id} onClick={() => setIsDropdownOpen(false)}>
                  {link.href !== pathname ? (
                    <TransitionLink href={link.href} label={link.label} />
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              )
            }
          })}
          <li onClick={() => setIsDropdownOpen(false)}>
            <SignOut variant="outline" callbackUrl={callbackUrl} className="bg-zinc-50 dark:bg-zinc-900" />
          </li>
        </ul>
      </div>
    </div>
  )
}
