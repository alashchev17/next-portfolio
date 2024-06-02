import Link from 'next/link'

import { Heading } from '@/components/UI/Heading'
import { Tag } from '@/components/UI/Tag'

interface ProjectItemProps {
  project: {
    __typename?: 'Project' | undefined
    id: string
    name?: string | null | undefined
    details?: string | null | undefined
    description?: string | null | undefined
    link?: string | null | undefined
    cover?:
      | {
          __typename?: 'Asset' | undefined
          fileName: string
          url: string
        }
      | null
      | undefined
    tags: {
      __typename?: 'Tag' | undefined
      id: string
      name?: string | null | undefined
    }[]
  }
}

export const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <div className="flex flex-col py-6 px-6 rounded-sm border-purple-700 border-2 sm:w-full max-sm:w-full md:w-[calc(50%-6px)] lg:w-[calc(33%-6px)] gap-3">
      <Heading level={5}>{project.name}</Heading>
      <p className="text-gray-500">{project.description}</p>
      <div className="flex flex-wrap gap-3">
        {project.tags.map((tag) => (
          <Tag key={tag.id} tag={tag.name!} />
        ))}
      </div>
      <Link href={`/projects/${project.name}`} className="text-purple-500">
        View Project
      </Link>
    </div>
  )
}
