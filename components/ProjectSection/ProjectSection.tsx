'use client'

import { useEffect } from 'react'
import { ProjectItem } from './ProjectItem'
import { Heading } from '@/components/UI/Heading'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

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
  useEffect(() => {
    gsap.to('#projectsSection', {
      scrollTrigger: {
        trigger: '#projectsSection',
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
    <section id="projectsSection" className="mt-20 flex flex-col gap-5 opacity-0 translate-y-[-50px]">
      <Heading level={4}>My Projects</Heading>
      <div className="flex gap-3 justify-center flex-wrap">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
