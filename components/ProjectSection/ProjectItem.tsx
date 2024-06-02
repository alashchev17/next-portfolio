import { Heading } from '@/components/UI/Heading'
import { Tag } from '@/components/UI/Tag'
import { TransitionLink } from '@/components/TransitionLink'

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
    <div
      id={project.id}
      className="flex flex-col items-start py-6 px-6 rounded-sm border-purple-700 border-2 sm:w-full max-sm:w-full md:w-[calc(50%-6px)] lg:w-[calc(33%-6px)] gap-3"
    >
      <Heading level={5}>{project.name}</Heading>
      <p className="text-gray-500">{project.description}</p>
      <div className="flex flex-wrap gap-3">
        {project.tags.map((tag) => (
          <Tag key={tag.id} tag={tag.name!} />
        ))}
      </div>
      <TransitionLink href={`/projects/${project.name}`} label="View Project" className="text-purple-600" />
    </div>
  )
}
