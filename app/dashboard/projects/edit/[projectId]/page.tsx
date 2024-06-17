import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { sdk } from '@/lib/client'
import { users } from '@/database/users'

import { Heading } from '@/components/UI/Heading'
import { TransitionLink } from '@/components/TransitionLink'
import { Button } from '@/components/UI/Button'
import { EditProjectForm } from '@/components/Forms/EditProjectForm'

type EditProjectPageProps = {
  params: {
    projectId: string
  }
}

export async function generateMetadata({ params }: EditProjectPageProps): Promise<Metadata> {
  const project = (await sdk.Projects()).data.projects.find((project) => project.id === params.projectId)
  return {
    title: `Dashboard | Edit "${project?.name || 'Project'}"`,
  }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const session = await auth()

  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto')

  if (!session) {
    redirect(`/login?callbackUrl=${protocol}://${host}/dashboard/projects/edit`)
  }

  const userRole = users.find((user) => user.email === session.user?.email)?.role || 'User'

  if (userRole === 'User' || userRole === 'Moderator') {
    redirect('/dashboard')
  }

  const project = (await sdk.Projects()).data.projects.find((project) => project.id === params.projectId)
  if (!project) {
    return (
      <>
        <Heading level={6} className="py-4">
          Some error occured while fetching project data. Make sure that this project exists and try again.
        </Heading>
        <div className="flex flex-wrap gap-3 mb-4">
          <TransitionLink href="/dashboard/projects">
            <Button variant="outline">Back to projects</Button>
          </TransitionLink>
        </div>
      </>
    )
  }
  return (
    <>
      <Heading level={6} className="py-4">
        Edit {project?.name} Project content
      </Heading>
      <p className="mb-4 text-zinc-500 dark:text-zinc-400">Fill below a form to edit this skillset.</p>
      <div className="flex flex-wrap gap-3 mb-4">
        <EditProjectForm project={project} />
      </div>
    </>
  )
}
