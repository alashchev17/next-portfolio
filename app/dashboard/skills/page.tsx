import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { sdk } from '@/lib/client'
import { users } from '@/database/users'

import { Heading } from '@/components/UI/Heading'
import { DashboardSkillset } from '@/components/Dashboard/DashboardSkillset'
import { TransitionLink } from '@/components/TransitionLink'
import { Button } from '@/components/UI/Button'

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard | Skills',
  }
}

export default async function DashboardSkillsPage() {
  const response = await sdk.Skillsets()
  const skillsets = response.data.skillsets

  const session = await auth()

  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto')

  if (!session) {
    redirect(`/login?callbackUrl=${protocol}://${host}/dashboard/skills`)
  }

  const userRole = users.find((user) => user.email === session.user?.email)?.role || 'User'

  if (userRole === 'User' || userRole === 'Moderator') {
    redirect('/dashboard')
  }

  return (
    <>
      <Heading level={6} className="py-4">
        Existing skillsets
      </Heading>
      <p className="mb-4 text-zinc-500 dark:text-zinc-400">
        You can add new skillsets by clicking the button below. You can also edit existing skillsets by clicking on the edit button.
      </p>
      <TransitionLink href={`/dashboard/skills/create`} className="mb-4">
        <Button variant="outline">Add new skillset</Button>
      </TransitionLink>
      <div className="flex flex-wrap gap-3 mb-4">
        {skillsets.map((skillset) => (
          <DashboardSkillset key={skillset.id} skillset={skillset} />
        ))}
      </div>
    </>
  )
}
