import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import { GoogleButton } from '@/components/GoogleButton'
import { Heading } from '@/components/UI/Heading'

export default async function LogoutPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }
  return (
    <main className="py-6 pt-[calc(1.5rem+80px)] bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 min-h-dvh">
      <div className="container">
        <Heading level={3}>Logout Page</Heading>
        <GoogleButton />
      </div>
    </main>
  )
}
