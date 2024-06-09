import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { auth } from '@/auth'
import { sdk } from '@/lib/client'

import { Heading } from '@/components/UI/Heading'
import { DashboardProject } from '@/components/Dashboard/DashboardProject'
import { headers } from 'next/headers'
import { users } from '@/database/users'

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
      <div className="flex flex-col gap-3 mb-4">
        {projects.map((project) => (
          <DashboardProject key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
