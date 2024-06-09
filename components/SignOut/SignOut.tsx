'use client'
import Link from 'next/link'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/UI/Button'

type SignOutProps = {
  variant?: 'secondary' | 'default' | 'outline' | 'link' | 'destructive' | 'ghost'
  callbackUrl?: string
}

export const SignOut = ({ variant = 'default', callbackUrl }: SignOutProps) => {
  return (
    <Link
      href="#"
      onClick={() =>
        signOut({
          callbackUrl: callbackUrl || '/',
        })
      }
    >
      <Button type="submit" variant={variant}>
        Logout
      </Button>
    </Link>
  )
}
