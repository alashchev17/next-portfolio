import { HeroSection } from '@/components/HeroSection'
import { ProjectSection } from '@/components/ProjectSection'
import { SkillsetSection } from '@/components/SkillsetSection'

import { sdk } from '@/lib/client'

export default async function Home() {
  const response = await sdk.AllData()
  const data = response.data
  return (
    <main className="px-6 py-6 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 min-h-dvh">
      <HeroSection />
      <SkillsetSection skillsets={data.skillsets} />
      <ProjectSection projects={data.projects} />
    </main>
  )
}
