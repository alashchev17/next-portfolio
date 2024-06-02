import Image from 'next/image'

import { Heading } from '@/components/UI/Heading'
import { Button } from '@/components/UI/Button'
import { Tag } from '@/components/UI/Tag'

import { sdk } from '@/lib/client'

interface ProjectPageProps {
  params: {
    projectName: string
  }
}

export const generateMetadata = ({ params }: ProjectPageProps) => {
  const { projectName } = params
  return {
    title: decodeURIComponent(projectName),
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const response = await sdk.getProjectByProjectName({ name: decodeURIComponent(params.projectName) })
  const data = response.data
  const project = data.projects[0]
  return (
    <main className="px-6 py-6 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 min-h-dvh">
      <div className="mb-8">
        <Heading level={1} className="mb-2">
          {project.name}
        </Heading>
        <p className="text-zinc-500">{project.description}</p>
      </div>

      <div className="mb-8">
        <Image
          src={project.cover?.url!}
          alt={`${project.name} Cover`}
          className="w-full rounded-lg shadow-lg"
          width={project.cover?.width!}
          height={project.cover?.height!}
        />
      </div>

      <div className="mb-8">
        <Heading level={3} className="mb-4">
          Tags
        </Heading>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag.id} tag={tag.name!} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Heading level={3} className="mb-4">
          Project Details
        </Heading>
        <p className="text-zinc-500">{project.details}</p>
      </div>

      <div className="mb-8">
        <Button variant={'default'}>
          <a href={project.link!} target="_blank">
            Visit Project
          </a>
        </Button>
      </div>
    </main>
  )
}
