'use client'

import Image from 'next/image'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

import { DrawerTrigger } from '@/components/UI/Drawer'
import { Heading } from '@/components/UI/Heading'
import { Button } from '@/components/UI/Button'

export const HeroSectionContent = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
      duration: 0.3,
    },
  })

  useEffect(() => {
    tl.to(
      '#hero-title-first',
      {
        delay: 0.5,
        opacity: 1,
        y: 0,
      },
      '>'
    )
      .to(
        '#firstname',
        {
          opacity: 1,
          y: 0,
        },
        '>25%'
      )
      .to(
        '#hero-image',
        {
          opacity: 1,
          x: 0,
          rotate: 0,
        },
        '>25%'
      )
      .to(
        '#hero-title-second',
        {
          opacity: 1,
          y: 0,
        },
        '>100%'
      )
      .to(
        '#specialization',
        {
          opacity: 1,
          x: 0,
        },
        '>125%'
      )
      .to(
        '#hero-btn',
        {
          opacity: 1,
          x: 0,
        },
        '>150%'
      )
  }, [tl])
  return (
    <>
      <div className="flex flex-col gap-3 max-w-[600px] items-start">
        <Heading id="hero-title-first" level={1} className="translate-y-[-20px] opacity-0">
          Hey there! My name is{' '}
          <span className="text-purple-700 dark:text-purple-600 border-b-2 border-purple-600 translate-y-[-20px] opacity-0" id="firstname">
            Andrii Lashchov
          </span>
        </Heading>
        <Heading id="hero-title-second" level={2} className="mt-5 translate-y-[-20px] opacity-0">
          I am a{' '}
          <span
            className="text-purple-900 dark:text-purple-700 border-b-2 border-purple-700 translate-y-[-20px] opacity-0"
            id="specialization"
          >
            Frontend Engineer
          </span>
        </Heading>
        <DrawerTrigger asChild>
          <Button id="hero-btn" variant="default" size="lg" className="mt-4 opacity-0 translate-x-[-20px]">
            Get in touch
          </Button>
        </DrawerTrigger>
      </div>
      <div id="hero-image" className="opacity-0 translate-x-10 -rotate-12">
        <Image
          src="/heroImage.jpg"
          alt="Hero Section Image"
          width={700}
          height={500}
          className="max-sm:h-[auto] h-[500px] w-[700px] rounded-2xl object-cover object-center"
        />
      </div>
    </>
  )
}
