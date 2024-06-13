import Image from 'next/image'
import type { SkillsetsQuery } from '@/generated/graphql'
import { Heading } from '../UI/Heading'

interface SkillsetItemProps {
  skillset: NonNullable<SkillsetsQuery['skillsets']>[number]
}

export const SkillsetItem = ({ skillset }: SkillsetItemProps) => {
  return (
    <div className="flex flex-col py-6 px-6 rounded-sm border-purple-700 border-2 sm:w-full max-sm:w-full md:w-[calc(50%-6px)] lg:w-[calc(33%-6px)] gap-3">
      <Image
        src={skillset.iconImage?.url!}
        width={64}
        height={64}
        style={{ width: 64, height: 64, objectFit: 'cover' }}
        alt={skillset.iconImage?.fileName ? skillset.iconImage?.fileName : 'Skillset Icon'}
      />
      <div>
        <Heading level={5}>{skillset.name}</Heading>
      </div>
      <div>{skillset.description}</div>
    </div>
  )
}
