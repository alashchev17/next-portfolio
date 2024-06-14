import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { users } from '@/database/users'

import { Heading } from '@/components/UI/Heading'
import { CreateSkillForm } from '@/components/Forms/CreateSkillForm'

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard | Create Skillset',
  }
}

export default async function CreateSkillPage() {
  const session = await auth()

  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto')

  if (!session) {
    redirect(`/login?callbackUrl=${protocol}://${host}/dashboard/skills/create`)
  }

  const userRole = users.find((user) => user.email === session.user?.email)?.role || 'User'

  if (userRole === 'User' || userRole === 'Moderator') {
    redirect('/dashboard')
  }

  return (
    <>
      <Heading level={6} className="py-4">
        Add new skillset
      </Heading>
      <p className="mb-4 text-zinc-500 dark:text-zinc-400">Fill below a form to add a new skillset.</p>
      <div className="flex flex-wrap gap-3 mb-4">
        <CreateSkillForm />
      </div>
    </>
  )
}
