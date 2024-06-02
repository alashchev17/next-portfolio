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
import { HeroSectionContent } from './HeroSectionContent'

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
        <HeroSectionContent />
      </Drawer>
    </section>
  )
}
