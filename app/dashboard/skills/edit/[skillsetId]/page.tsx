import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/auth'
import { sdk } from '@/lib/client'
import { users } from '@/database/users'

import { Heading } from '@/components/UI/Heading'
import { TransitionLink } from '@/components/TransitionLink'
import { Button } from '@/components/UI/Button'
import { EditSkillForm } from '@/components/Forms/EditSkillForm'

type EditSkillPageProps = {
  params: {
    skillsetId: string
  }
}

export async function generateMetadata({ params }: EditSkillPageProps): Promise<Metadata> {
  const skillset = (await sdk.Skillsets()).data.skillsets.find((skillset) => skillset.id === params.skillsetId)
  return {
    title: `Dashboard | Edit "${skillset?.name || 'Skillset'}"`,
  }
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
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

  const skillset = (await sdk.Skillsets()).data.skillsets.find((skillset) => skillset.id === params.skillsetId)
  if (!skillset) {
    return (
      <>
        <Heading level={6} className="py-4">
          Some error occured while fetching skillset data. Make sure that this skillset exists and try again.
        </Heading>
        <div className="flex flex-wrap gap-3 mb-4">
          <TransitionLink href="/dashboard/skills">
            <Button variant="outline">Back to skills</Button>
          </TransitionLink>
        </div>
      </>
    )
  }
  return (
    <>
      <Heading level={6} className="py-4">
        Edit {skillset?.name} Skillset content
      </Heading>
      <p className="mb-4 text-zinc-500 dark:text-zinc-400">Fill below a form to edit this skillset.</p>
      <div className="flex flex-wrap gap-3 mb-4">
        <EditSkillForm skillset={skillset} />
      </div>
    </>
  )
}
