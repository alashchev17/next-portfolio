'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/UI/Form'
import { Input } from '@/components/UI/Input'
import { Button } from '@/components/UI/Button'

import { MAX_IMAGE_FILE_SIZE } from '@/constants'
import { checkFileType } from '@/lib/utils'
import { addProject } from '@/actions'

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  details: z.string().min(20, 'Project details must be at least 20 characters long'),
  link: z.string().url('Link must be a valid URL'),
  image: z
    .instanceof(FileList, { message: 'File is required' })
    .refine((fileList: FileList) => fileList?.[0].size < MAX_IMAGE_FILE_SIZE, 'Max size is 5 MB')
    .refine((fileList: FileList) => checkFileType(fileList?.[0]), 'Only .jpg and .png formats are supported.'),
})

export const CreateProjectForm = () => {
  const [isFormSending, setIsFormSending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      details: '',
      link: '',
      image: undefined,
    },
  })

  const imageRef = form.register('image')

  const onFormSubmit = async ({ title, image, description, details, link }: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    const blobFromFileList = image[0]

    formData.append('image', blobFromFileList, blobFromFileList.name)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('details', details)
    formData.append('link', link)

    setIsFormSending(true)
    const response = await addProject(formData)

    if (!response) {
      toast.success('Project created successfully!')
      form.reset()
      return
    }
    toast.error(response.message)
    form.resetField(response.field)
    form.setError(response.field, { message: response.message }, { shouldFocus: true })

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
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormDescription>Enter your preferred project title.</FormDescription>
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
              <FormLabel>Project URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter project URL" {...field} />
              </FormControl>
              <FormDescription>Enter your project URL.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project cover</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Upload cover"
                  {...imageRef}
                  onChange={(event) => {
                    field.onChange(event.target?.files ?? undefined)
                  }}
                />
              </FormControl>
              <FormDescription>Upload your project image. It should be 16:9 image and less than 5 MB.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full transition-colors inline-flex items-center gap-3 py-6"
          disabled={
            form.getFieldState('title').invalid ||
            form.getFieldState('description').invalid ||
            form.getFieldState('details').invalid ||
            form.getFieldState('link').invalid ||
            form.getFieldState('image').invalid ||
            isFormSending
          }
        >
          {isFormSending ? 'Creating new project...' : 'Create a new project'}
        </Button>
      </form>
    </Form>
  )
}
