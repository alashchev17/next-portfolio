import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { login } from '@/actions'

import { GoogleButton } from '@/components/GoogleButton'
import { Heading } from '@/components/UI/Heading'
import { SignInForm } from '@/components/SignIn'

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect('/')
  }

  const handleFormExecution = async (values: { email: string; password: string }) => {
    'use server'
    const response = await login(values)
    if (!response) {
      // logged in successfully
      return
    }
    return response
  }
  return (
    <main className="py-6 pt-[calc(1.5rem+80px)] bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 min-h-dvh">
      <div className="container">
        <div>
          <Heading level={3} className="text-center mb-4">
            Login
          </Heading>
          <div className="flex flex-col gap-2 items-stretch max-w-[500px] py-4 px-4 m-auto rounded-t-[10px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <SignInForm handleFinish={handleFormExecution} />
            <Heading level={6} className="text-center text-zinc-500">
              Or
            </Heading>
            <GoogleButton />
          </div>
        </div>
      </div>
    </main>
  )
}
