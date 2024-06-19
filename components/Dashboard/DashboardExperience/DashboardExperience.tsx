'use client'

import type { ExperiencesQuery } from '@/generated/graphql'

// import { useRouter } from 'next/navigation'
// import { useState } from 'react'

// import { sdk } from '@/lib/client'

import { Button } from '@/components/UI/Button'
import { Heading } from '@/components/UI/Heading'
import { TransitionLink } from '@/components/TransitionLink'
// import { toast } from 'sonner'

interface DashboardProjectProps {
  experience: NonNullable<ExperiencesQuery['experiences']>[number]
}

export const DashboardExperience = ({ experience }: DashboardProjectProps) => {
  // const router = useRouter()
  // const [isExperienceDeleting, setIsExperienceDeleting] = useState(false)

  // const handleDeleteExperience = async (id: string) => {
  //   // setIsExperienceDeleting(true)
  //   // if (experience.cover) {
  //   //   await sdk.deleteAsset({ assetId: project.cover.id as string })
  //   // }
  //   // const response = await sdk.deleteProject({ projectId: id })

  //   // if (!response.errors) {
  //   //   router.refresh()
  //   // }
  //   toast.success(`Experience "${experience.name}" deleted!`)
  // }

  return (
    <div className="flex flex-col flex-start gap-2 border-2 p-8 shadow-lg border-zinc-500 dark:border-zinc-700">
      <Heading level={6}>{experience.name}</Heading>
      <p className="border-b pb-4 dark:border-zinc-700">{experience.description}</p>
      <div className="flex items-start gap-8 mt-4">
        <div className="flex flex-col gap-4">
          <Heading level={6}>Experience Location</Heading>
          <p>{experience.location}</p>
          <Heading level={6}>Date start / Date over</Heading>
          <p>
            {experience.dateStart} / {experience.dateOver}
          </p>
          <div className="flex gap-3">
            <TransitionLink href={`/dashboard/experiences/edit/${experience.id}`}>
              <Button variant="default">Edit information</Button>
            </TransitionLink>
            {/* <Button variant="destructive" onClick={() => handleDeleteExperience(experience.id)} disabled={isExperienceDeleting}>
              {isExperienceDeleting ? 'Deleting experience...' : 'Delete experience'}
            </Button> */}
            <Button variant="destructive">Delete experience</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
