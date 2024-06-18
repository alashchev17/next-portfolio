import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { users } from '@/database/users'

import { Heading } from '@/components/UI/Heading'
import { DashboardStatistics } from '@/components/Dashboard/DashboardStatistics'
import { sdk } from '@/lib/client'

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard | Home',
  }
}

export default async function DashboardPage() {
  const session = await auth()
  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto')

  if (!session) {
    redirect(`/login?callbackUrl=${protocol}://${host}/dashboard`)
  }

  const userRole = users.find((user) => user.email === session.user?.email)?.role || 'User'

  const { projects, skillsets, experiences } = (await sdk.AllData()).data

  if (!projects || !skillsets || !experiences) return null

  return (
    <>
      <Heading level={4} className="py-4 border-b dark:border-zinc-700">
        Welcome Back, {session?.user?.name}!
      </Heading>
      {userRole !== 'User' && <DashboardStatistics contents={[projects.length, skillsets.length, experiences.length]} />}
      <Heading level={6} className="py-4">
        Role: {userRole || 'User'}
      </Heading>
      {userRole === 'User' && (
        <Heading level={6} className="py-4 mb-4 border-b dark:border-zinc-700">
          Your role is not permitted to mutate data on inner pages. Please contact the administrator.
        </Heading>
      )}
    </>
  )
}
