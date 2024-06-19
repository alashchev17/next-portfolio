'use client'

import { ProjectsQuery } from '@/generated/graphql'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { sdk } from '@/lib/client'
import { refreshPath } from '@/actions'

import { Button } from '@/components/UI/Button'
import { Heading } from '@/components/UI/Heading'
import { Tag } from '@/components/UI/Tag'
import { TransitionLink } from '@/components/TransitionLink'
import { toast } from 'sonner'

interface DashboardProjectProps {
  project: NonNullable<ProjectsQuery['projects']>[number]
}

export const DashboardProject = ({ project }: DashboardProjectProps) => {
  const router = useRouter()
  const [isProjectDeleting, setIsProjectDeleting] = useState(false)

  const handleDeleteProject = async (id: string) => {
    setIsProjectDeleting(true)
    if (project.cover) {
      await sdk.deleteAsset({ assetId: project.cover.id as string })
    }
    const response = await sdk.deleteProject({ projectId: id })

    if (!response.errors) {
      toast.success(`Project "${project.name}" deleted!`)
      refreshPath('/dashboard/projects')
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col flex-start gap-2 border-2 p-8 shadow-lg border-zinc-500 dark:border-zinc-700">
      <Heading level={6}>{project.name}</Heading>
      <p className="border-b pb-4 dark:border-zinc-700">{project.description}</p>
      <div className="flex items-start gap-8 mt-4">
        <Image src={project.cover?.url!} alt={project.name!} width={600} height={336} className="shadow-lg" />
        <div className="flex flex-col gap-4">
          <Heading level={6}>Project Details</Heading>
          <p>{project.details}</p>
          <Heading level={6}>Technologies</Heading>
          {project.tags.length !== 0 ? (
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag.id} tag={tag.name!} />
              ))}
            </div>
          ) : (
            <p>No technologies added</p>
          )}
          <div className="flex gap-3">
            <TransitionLink href={`/dashboard/projects/edit/${project.id}`}>
              <Button variant="default">Edit information</Button>
            </TransitionLink>
            <Button variant="destructive" onClick={() => handleDeleteProject(project.id)} disabled={isProjectDeleting}>
              {isProjectDeleting ? 'Deleting project...' : 'Delete project'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
