'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { TransitionLink } from '@/components/TransitionLink'
import { Skeleton } from '@/components/UI/Skeleton'
import { SignOut } from '@/components/SignOut'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

import { users } from '@/database/users'
import { userAvatarLinksToMap } from '@/constants'

type UserAvatarProps = {
  callbackUrl: string
}

export const UserAvatar = ({ callbackUrl }: UserAvatarProps) => {
  const session = useSession()
  const pathname = usePathname()
  const { theme } = useTheme()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const userRole = users.find((user) => user.email === session?.data?.user?.email)?.role || 'User'

  // Defining some styles for avatar without image and with image (color inversion)
  const invertedStyleForAvatarWithoutImage: React.CSSProperties = { filter: theme === 'light' ? 'unset' : 'invert()' }
  const invertedStyleForAvatarWithImage: React.CSSProperties = { filter: 'unset' }

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
          style={invertedStyleForAvatarWithoutImage}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        />
        <div
          className={`absolute top-[calc(100%+0.5rem)] right-0 p-4 whitespace-nowrap flex flex-col gap-3 rounded-lg shadow-lg bg-zinc-50 dark:bg-zinc-700 opacity-0 transition-opacity duration-500 ${
            isDropdownOpen && 'opacity-100'
          }`}
        >
          <div className="text-zinc-400 text-sm pb-3 border-b border-zinc-300 dark:border-zinc-500">Sign in to access</div>
          <ul className="flex flex-col gap-3">
            {userAvatarLinksToMap.map((link) => {
              if (!link.isPrivate && link.href === '/login') {
                return (
                  <li key={link.id} onClick={() => setIsDropdownOpen(false)}>
                    {link.href !== pathname ? (
                      <TransitionLink
                        // TODO: dark mode implementation
                        className={`text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors ${
                          pathname === link.href && 'text-zinc-950 dark:text-zinc-50'
                        }`}
                        href={`${link.href}?callbackUrl=${callbackUrl}`}
                        label={link.label}
                      />
                    ) : (
                      <Link
                        className={`text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors ${
                          pathname === link.href && 'text-zinc-950 dark:text-zinc-50'
                        }`}
                        href={`${link.href}?callbackUrl=${callbackUrl}`}
                      >
                        {link.label}
                      </Link>
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

  //
  const stylesForImage = !session.data?.user?.image ? invertedStyleForAvatarWithoutImage : invertedStyleForAvatarWithImage

  return (
    <div className="relative">
      <Image
        src={session.data?.user?.image || '/notAuthenticatedUser.png'}
        width={32}
        height={32}
        alt={`Logo: ${session.data?.user?.name}`}
        className="cursor-pointer w-[32px] h-[32px] rounded-full"
        style={stylesForImage}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      />
      <div
        className={`absolute top-[calc(100%+0.5rem)] right-0 p-4 whitespace-nowrap flex flex-col gap-3 rounded-lg shadow-lg bg-zinc-50 dark:bg-zinc-700 opacity-0 transition-opacity duration-500 ${
          isDropdownOpen && 'opacity-100'
        }`}
      >
        <div className="text-zinc-400 text-sm pb-3 border-b border-zinc-300 dark:border-zinc-500">
          Signed in as {session.data?.user?.name}
        </div>
        <ul className="flex flex-col gap-3">
          {userAvatarLinksToMap.map((link) => {
            if (link.isPrivate && link.role?.includes(userRole)) {
              return (
                <li key={link.id} onClick={() => setIsDropdownOpen(false)}>
                  {link.href !== pathname ? (
                    <TransitionLink
                      className={`text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors ${
                        pathname === link.href && 'text-zinc-950 dark:text-zinc-50'
                      }`}
                      href={link.href}
                      label={link.label}
                    />
                  ) : (
                    <Link
                      className={`text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50 transition-colors ${
                        pathname === link.href && 'text-zinc-950 dark:text-zinc-50'
                      }`}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            }
          })}
          <li onClick={() => setIsDropdownOpen(false)} className="whitespace-nowrap">
            <SignOut variant="outline" callbackUrl={callbackUrl} className="bg-zinc-50 dark:bg-zinc-900" />
          </li>
        </ul>
      </div>
    </div>
  )
}
