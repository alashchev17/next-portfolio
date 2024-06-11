'use client'

import type { SkillsetsQuery } from '@/generated/graphql'

import Image from 'next/image'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

import { sdk } from '@/lib/client'

import { Heading } from '@/components/UI/Heading'
import { Button } from '@/components/UI/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type DashboardSkillsetProps = {
  skillset: NonNullable<SkillsetsQuery['skillsets']>[number]
}

export const DashboardSkillset = ({ skillset }: DashboardSkillsetProps) => {
  const router = useRouter()
  const handleDeleteSkillset = async (id: string) => {
    const response = await sdk.deleteSkillset({ skillsetId: id })
    if (!response.errors) {
      toast.success(`Skillset "${skillset.name}" deleted!`)
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col flex-start sm:w-full max-sm:w-full md:w-[calc(50%-6px)] lg:w-[calc(33%-6px)] gap-2 border-2 p-4 sm:p-8 shadow-lg border-zinc-500 dark:border-zinc-700">
      <Heading level={6}>{skillset.name}</Heading>
      <p className="pb-4">{skillset.description}</p>
      <div className="flex flex-row max-sm:flex-col max-sm:items-start max-sm:gap-6 items-center justify-between mt-auto">
        <Image src={skillset.iconImage?.url!} alt={skillset.name!} width={64} height={64} />
        <div className="flex gap-4 md:flex-col xl:flex-row">
          <Link href={`/dashboard/skills/${skillset.id}`}>
            <Button variant="default">Edit skillset</Button>
          </Link>
          <Button variant="destructive" onClick={() => handleDeleteSkillset(skillset.id)}>
            Delete skillset
          </Button>
        </div>
      </div>
    </div>
  )
}
