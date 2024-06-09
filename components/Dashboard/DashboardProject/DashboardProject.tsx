import { Button } from '@/components/UI/Button'
import { Heading } from '@/components/UI/Heading'
import { Tag } from '@/components/UI/Tag'
import { ProjectsQuery } from '@/generated/graphql'
import Image from 'next/image'
import Link from 'next/link'

interface DashboardProjectProps {
  project: NonNullable<ProjectsQuery['projects']>[number]
}

export const DashboardProject = ({ project }: DashboardProjectProps) => {
  return (
    <div className="flex flex-col flex-start gap-2 border-2 p-8 shadow-lg border-zinc-500 dark:border-zinc-700">
      <Heading level={6}>{project.name}</Heading>
      <p className="border-b pb-4 dark:border-zinc-700">{project.description}</p>
      <div className="flex items-start gap-8 mt-4">
        <Image src={project.cover?.url!} alt={project.name!} width={600} height={400} className="shadow-lg " />
        <div className="flex flex-col gap-4">
          <Heading level={6}>Project Details</Heading>
          <p>{project.details}</p>
          <Heading level={6}>Technologies</Heading>
          <div className="flex gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag.id} tag={tag.name!} />
            ))}
          </div>
          <Link href={`/dashboard/projects/${project.id}`}>
            <Button variant="default">Edit information</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
