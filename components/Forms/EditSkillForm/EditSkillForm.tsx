'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/UI/Form'
import { Input } from '@/components/UI/Input'
import { Button } from '@/components/UI/Button'

import { updateSkillset } from '@/actions'
import { SkillsetsQuery } from '@/generated/graphql'
import Image from 'next/image'

type EditSkillFormProps = {
  skillset: NonNullable<SkillsetsQuery['skillsets']>[number]
}

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
})

export const EditSkillForm = ({ skillset }: EditSkillFormProps) => {
  const [isFormSending, setIsFormSending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: skillset.name || '',
      description: skillset.description || '',
    },
  })

  const onFormSubmit = async ({ title, description }: z.infer<typeof formSchema>) => {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)

    setIsFormSending(true)
    const response = await updateSkillset(formData, skillset.id)

    if (!response.message && !response.field && response.newData) {
      toast.success('Skillset updated successfully!')
      form.setValue('title', response.newData.title)
      form.setValue('description', response.newData.description)
      setIsFormSending(false)
      return
    }
    toast.error(response.message)
    if (response.field) {
      form.resetField(response.field)
      form.setError(response.field, { message: response.message }, { shouldFocus: true })
    }

    setIsFormSending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="w-full max-w-[500px] space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter skillset title" {...field} />
              </FormControl>
              <FormDescription>Enter your preferred skillset title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter skillset description" {...field} />
              </FormControl>
              <FormDescription>Enter your skillset description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          <p>Current skill icon:</p>
          <Image
            className="w-[50px] h-[50px] object-cover"
            src={skillset.iconImage?.url || ''}
            alt={`Skillset ${skillset.name} Icon`}
            width={50}
            height={50}
          />
        </div>
        <Button
          type="submit"
          className="w-full transition-colors inline-flex items-center gap-3 py-6"
          disabled={form.getFieldState('title').invalid || form.getFieldState('description').invalid || isFormSending}
        >
          {isFormSending ? 'Updating skillset...' : 'Update skillset'}
        </Button>
      </form>
    </Form>
  )
}
