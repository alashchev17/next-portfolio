import { ProjectItem } from './ProjectItem'
import { Heading } from '@/components/UI/Heading'

interface ProjectSectionProps {
  projects: {
    __typename?: 'Project' | undefined
    id: string
    name?: string | null | undefined
    description?: string | null | undefined
    details?: string | null | undefined
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
  }[]
}

export const ProjectSection = ({ projects }: ProjectSectionProps) => {
  return (
    <section className="mt-20 flex flex-col gap-5">
      <Heading level={4}>My Projects</Heading>
      <div className="flex gap-3 justify-center flex-wrap">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
