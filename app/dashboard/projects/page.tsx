import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { sdk } from '@/lib/client'
import { users } from '@/database/users'

import { Heading } from '@/components/UI/Heading'
import { DashboardProject } from '@/components/Dashboard/DashboardProject'
import { TransitionLink } from '@/components/TransitionLink'
import { Button } from '@/components/UI/Button'

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard | Projects',
  }
}

export default async function DashboardProjects() {
  const response = await sdk.Projects()
  const projects = response.data.projects

  const session = await auth()

  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto')

  if (!session) {
    redirect(`/login?callbackUrl=${protocol}://${host}/dashboard/projects`)
  }

  const userRole = users.find((user) => user.email === session.user?.email)?.role || 'User'

  if (userRole === 'User') {
    redirect('/dashboard')
  }

  return (
    <>
      <Heading level={6} className="py-4">
        Existing projects
      </Heading>
      <p className="mb-4 text-zinc-500 dark:text-zinc-400">
        You can add new projects by clicking the button below. You can also edit existing projects by clicking on the edit button.
      </p>
      <TransitionLink href={`/dashboard/projects/create`} className="mb-4">
        <Button variant="outline">Add new project</Button>
      </TransitionLink>
      <div className="flex flex-col gap-3 mb-4">
        {projects.map((project) => (
          <DashboardProject key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
