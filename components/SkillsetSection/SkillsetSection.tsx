'use client'

import { useEffect } from 'react'
import { SkillsetItem } from './SkillsetItem'
import { Heading } from '@/components/UI/Heading'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

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
  useEffect(() => {
    gsap.to('#skillsetSection', {
      scrollTrigger: {
        trigger: '#skillsetSection',
        toggleActions: 'restart pause resume reset',
        start: 'top 85%',
        end: 'bottom 50%',
      },
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
  }, [])
  return (
    <section id="skillsetSection" className="mt-20 flex flex-col gap-5 opacity-0 translate-y-[-50px]">
      <Heading level={4}>My Skillset</Heading>
      <div className="flex gap-3 justify-center flex-wrap">
        {skillsets.map((skillset) => (
          <SkillsetItem key={skillset.id} skillset={skillset} />
        ))}
      </div>
    </section>
  )
}
