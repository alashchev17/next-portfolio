import Image from 'next/image'

import { Heading } from '@/components/UI/Heading'
import { Button } from '@/components/UI/Button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/UI/Drawer'
import { ContactForm } from '@/components/ContactForm'

import { postMessage } from '@/lib/postMessage'

export const HeroSection = () => {
  const handleQueryExecution = async (values: { message: string; email: string; name: string }) => {
    'use server'
    const response = await postMessage(values)
  }

  return (
    <section className="w-full flex max-sm:flex-col sm:flex-col lg:flex-row max-sm:items-start sm:items-start md:items-center max-sm:gap-8 gap-20 justify-between">
      <Drawer>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Get in touch</DrawerTitle>
              <DrawerDescription>Fill the form below to stay in touch!</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <ContactForm handleFinish={handleQueryExecution} />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>

        <div className="flex flex-col gap-3 max-w-[600px] items-start">
          <Heading level={1}>
            Hey there! My name is <span className="text-purple-700 dark:text-purple-600 border-b-2 border-purple-600">Andrii Lashchov</span>
          </Heading>
          <Heading level={2}>
            I am a <span className="text-purple-900 dark:text-purple-700 border-b-2 border-purple-700">Frontend Engineer</span>
          </Heading>
          <DrawerTrigger asChild>
            <Button variant="default" size="lg" className="mt-4">
              Get in touch
            </Button>
          </DrawerTrigger>
        </div>
        <div>
          <Image
            src="/heroImage.jpg"
            alt="Hero Section Image"
            width={700}
            height={500}
            className="max-sm:h-[auto] h-[500px] w-[700px] rounded-2xl object-cover object-center"
          />
        </div>
      </Drawer>
    </section>
  )
}
