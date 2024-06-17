'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/UI/Form'
import { Input } from '@/components/UI/Input'
import { Button } from '@/components/UI/Button'

import { updateProject } from '@/actions'
import { ProjectsQuery } from '@/generated/graphql'
import Image from 'next/image'
import { Tag } from '@/components/UI/Tag'

type EditSkillFormProps = {
  project: NonNullable<ProjectsQuery['projects']>[number]
}

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  details: z.string().min(20, 'Details field must be at least 20 characters long'),
  link: z.string().url('Link must be a valid URL'),
})

export const EditProjectForm = ({ project }: EditSkillFormProps) => {
  const [isFormSending, setIsFormSending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project.name || '',
      description: project.description || '',
      details: project.details || '',
      link: project.link || '',
    },
  })

  const onFormSubmit = async ({ title, description, details, link }: z.infer<typeof formSchema>) => {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('details', details)
    formData.append('link', link)

    setIsFormSending(true)
    const response = await updateProject(formData, project.id)

    if (!response.message && !response.field && response.newData) {
      toast.success('Project updated successfully!')
      form.setValue('title', response.newData.title)
      form.setValue('description', response.newData.description)
      form.setValue('details', response.newData.details)
      form.setValue('link', response.newData.link)
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
                <Input placeholder="Enter project description" {...field} />
              </FormControl>
              <FormDescription>Enter your project description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Details</FormLabel>
              <FormControl>
                <Input placeholder="Enter project details" {...field} />
              </FormControl>
              <FormDescription>Enter your project details.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter project link" {...field} />
              </FormControl>
              <FormDescription>Enter your project link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          <p>Current project cover:</p>
          <Image
            className="w-[500px] aspect-video object-cover"
            src={project.cover?.url || ''}
            alt={`Skillset ${project.name} Image`}
            width={1600}
            height={900}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p>Current project tags:</p>
          <div className="flex flex-wrap gap-3">
            {project.tags?.map((tag) => {
              if (tag.name) {
                return <Tag key={tag.id} tag={tag.name} />
              }
              return null
            })}
          </div>
        </div>
        <Button
          type="submit"
          className="w-full transition-colors inline-flex items-center gap-3 py-6"
          disabled={
            form.getFieldState('title').invalid ||
            form.getFieldState('description').invalid ||
            form.getFieldState('details').invalid ||
            form.getFieldState('link').invalid ||
            isFormSending
          }
        >
          {isFormSending ? 'Updating project...' : 'Update project'}
        </Button>
      </form>
    </Form>
  )
}
