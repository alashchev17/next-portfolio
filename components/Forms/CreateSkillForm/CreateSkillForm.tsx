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
import { addSkillset } from '@/actions'

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  image: z
    .instanceof(FileList, { message: 'File is required' })
    .refine((fileList: FileList) => fileList.length > 0, { message: 'File is required' })
    .refine((fileList: FileList) => fileList.length > 0 && fileList?.[0].size < MAX_IMAGE_FILE_SIZE, { message: 'Max size is 5 MB.' })
    .refine((fileList: FileList) => fileList.length > 0 && checkFileType(fileList?.[0]), {
      message: 'Only .jpg and .png formats are supported.',
    }),
})

export const CreateSkillForm = () => {
  const [isFormSending, setIsFormSending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
    },
  })

  const imageRef = form.register('image')

  const onFormSubmit = async ({ title, image, description }: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    const blobFromFileList = image[0]

    formData.append('image', blobFromFileList, blobFromFileList.name)
    formData.append('title', title)
    formData.append('description', description)

    setIsFormSending(true)
    const response = await addSkillset(formData)

    if (!response) {
      toast.success('Skillset created successfully!')
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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skillset image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Upload image"
                  {...imageRef}
                  onChange={(event) => {
                    field.onChange(event.target?.files ?? undefined)
                  }}
                />
              </FormControl>
              <FormDescription>Upload your skillset image. It should be square image and less than 5 MB.</FormDescription>
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
            form.getFieldState('image').invalid ||
            isFormSending
          }
        >
          {isFormSending ? 'Creating new skillset...' : 'Create a new skillset'}
        </Button>
      </form>
    </Form>
  )
}
