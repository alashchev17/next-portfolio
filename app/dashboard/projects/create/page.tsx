import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { users } from '@/database/users'

import { Heading } from '@/components/UI/Heading'
import { CreateProjectForm } from '@/components/Forms/CreateProjectForm'

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard | Create Project',
  }
}

export default async function CreateProjectPage() {
  const session = await auth()

  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto')

  if (!session) {
    redirect(`/login?callbackUrl=${protocol}://${host}/dashboard/projects/create`)
  }

  const userRole = users.find((user) => user.email === session.user?.email)?.role || 'User'

  if (userRole === 'User') {
    redirect('/dashboard')
  }

  return (
    <>
      <Heading level={6} className="py-4">
        Add new project
      </Heading>
      <p className="mb-4 text-zinc-500 dark:text-zinc-400">Fill below a form to add a new project.</p>
      <div className="flex flex-wrap gap-3 mb-4">
        <CreateProjectForm />
      </div>
    </>
  )
}
