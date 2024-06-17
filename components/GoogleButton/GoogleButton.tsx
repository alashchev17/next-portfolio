'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/UI/Button'
import { GoogleIcon } from '@/components/Icons'

export const GoogleButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  return (
    <Button
      variant="outline"
      onClick={() =>
        signIn('google', {
          callbackUrl,
        })
      }
      className="inline-flex items-center gap-3 py-6 dark:border-zinc-600"
    >
      <GoogleIcon width={20} height={20} />
      Sign in with Google
    </Button>
  )
}
