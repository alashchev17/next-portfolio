import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { sdk } from '@/lib/client'
import { users } from '@/database/users'

import { Heading } from '@/components/UI/Heading'
import { DashboardExperience } from '@/components/Dashboard/DashboardExperience'
import { TransitionLink } from '@/components/TransitionLink'
import { Button } from '@/components/UI/Button'

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard | Experiences',
  }
}

export default async function DashboardExperiences() {
  const response = await sdk.Experiences()
  const experiences = response.data.experiences

  const session = await auth()

  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto')

  if (!session) {
    redirect(`/login?callbackUrl=${protocol}://${host}/dashboard/experiences`)
  }

  const userRole = users.find((user) => user.email === session.user?.email)?.role || 'User'

  if (userRole === 'User' || userRole === 'Moderator') {
    redirect('/dashboard')
  }

  return (
    <>
      <Heading level={6} className="py-4">
        Existing experiences
      </Heading>
      <Heading level={6}>This page is currently under construction.</Heading>
      <p className="mb-4 text-zinc-500 dark:text-zinc-400">
        You can add new experience by clicking the button below. You can also edit existing experiences by clicking on the edit button.
      </p>
      <TransitionLink href={`/dashboard/experiences/create`} className="mb-4">
        <Button variant="outline" disabled>
          Add new experience
        </Button>
      </TransitionLink>
      <div className="flex flex-col gap-3 mb-4">
        {experiences.map((experience) => (
          <DashboardExperience key={experience.id} experience={experience} />
        ))}
      </div>
    </>
  )
}
