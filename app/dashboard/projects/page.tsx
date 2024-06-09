import { TransitionLink } from '@/components/TransitionLink'
import { Button } from '@/components/UI/Button'
import { Heading } from '@/components/UI/Heading'
import { DashboardProject } from '@/components/Dashboard/DashboardProject'
import { sdk } from '@/lib/client'

export default async function DashboardProjects() {
  const response = await sdk.Projects()
  const projects = response.data.projects

  return (
    <>
      <Heading level={6} className="py-4 mb-4 border-b">
        Existing projects
      </Heading>
      <div className="flex flex-col gap-3 pb-4 border-b mb-4">
        {projects.map((project) => (
          <DashboardProject key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
