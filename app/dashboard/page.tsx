import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { auth } from '@/auth'

import { Heading } from '@/components/UI/Heading'
import { Button } from '@/components/UI/Button'
import { TransitionLink } from '@/components/TransitionLink'
import { headers } from 'next/headers'
import { users } from '@/database/users'

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

  return (
    <>
      <Heading level={4} className="py-4 border-b dark:border-zinc-700">
        Welcome Back, {session?.user?.name}!
      </Heading>
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
