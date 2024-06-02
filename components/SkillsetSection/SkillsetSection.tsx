import { SkillsetItem } from './SkillsetItem'
import { Heading } from '@/components/UI/Heading'

interface SkillsetSectionProps {
  skillsets: {
    __typename?: 'Skillset' | undefined
    id: string
    name?: string | null | undefined
    description?: string | null | undefined
    iconImage?:
      | {
          __typename?: 'Asset' | undefined
          url: string
          fileName: string
        }
      | null
      | undefined
  }[]
}

export const SkillsetSection = ({ skillsets }: SkillsetSectionProps) => {
  return (
    <section className="mt-20 flex flex-col gap-5">
      <Heading level={4}>My Skillset</Heading>
      <div className="flex gap-3 justify-center flex-wrap">
        {skillsets.map((skillset) => (
          <SkillsetItem key={skillset.id} skillset={skillset} />
        ))}
      </div>
    </section>
  )
}
