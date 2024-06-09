import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { sdk } from '@/lib/client'
import { users } from '@/database/users'

import { Heading } from '@/components/UI/Heading'
import { DashboardSkillset } from '@/components/Dashboard/DashboardSkillset'

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard | Skills',
  }
}

export default async function DashboardSkills() {
  const response = await sdk.Skillsets()
  const skillsets = response.data.skillsets

  const session = await auth()

  const host = headers().get('host')
  const protocol = headers().get('x-forwarded-proto')

  if (!session) {
    redirect(`/login?callbackUrl=${protocol}://${host}/dashboard/projects`)
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
      <div className="flex flex-wrap gap-3 mb-4">
        {skillsets.map((skillset) => (
          <DashboardSkillset key={skillset.id} skillset={skillset} />
        ))}
      </div>
    </>
  )
}
