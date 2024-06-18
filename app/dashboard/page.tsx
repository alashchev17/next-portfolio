import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { users } from '@/database/users'
import { DASHBOARD_STATISTICS_ITEMS } from '@/constants'

import { Heading } from '@/components/UI/Heading'
import { Button } from '@/components/UI/Button'
import { TransitionLink } from '@/components/TransitionLink'
import { Statistics } from '@/components/Dashboard/Statistics'
import { sdk } from '@/lib/client'

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard | Home',
  }
}

const dashboardLinks = [
  {
    id: 1,
    label: 'Update Skillset',
    href: '/dashboard/skills',
    role: ['Admin'],
  },
  {
    id: 2,
    label: 'Update Projects',
    href: '/dashboard/projects',
    role: ['Admin', 'Moderator'],
  },
]

export default async function DashboardPage() {
  const session = await auth()
  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto')

  if (!session) {
    redirect(`/login?callbackUrl=${protocol}://${host}/dashboard`)
  }

  const userRole = users.find((user) => user.email === session.user?.email)?.role || 'User'

  const filteredDashboardLinks = dashboardLinks.filter((link) => link.role.includes(userRole))

  const { projects, skillsets, experiences } = (await sdk.AllData()).data

  if (!projects || !skillsets || !experiences) return null

  return (
    <>
      <Heading level={4} className="py-4 border-b dark:border-zinc-700">
        Welcome Back, {session?.user?.name}!
      </Heading>
      <Statistics
        titles={DASHBOARD_STATISTICS_ITEMS.titles}
        descriptions={DASHBOARD_STATISTICS_ITEMS.descriptions}
        contents={[projects.length.toString(), skillsets.length.toString(), experiences.length.toString()]}
      />
      <Heading level={6} className="py-4 border-b dark:border-zinc-700">
        Role: {userRole || 'User'}
      </Heading>
      {userRole === 'User' && (
        <Heading level={6} className="py-4 mb-4 border-b dark:border-zinc-700">
          Your role is not permitted to mutate data on inner pages. Please contact the administrator.
        </Heading>
      )}
      {userRole !== 'User' && (
        <div className="flex gap-3 pb-4 border-b my-4 dark:border-zinc-700">
          {filteredDashboardLinks.map((link) => (
            <TransitionLink key={link.id} href={link.href}>
              <Button variant="outline">{link.label}</Button>
            </TransitionLink>
          ))}
        </div>
      )}
    </>
  )
}
