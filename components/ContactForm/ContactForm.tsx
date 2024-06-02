'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/UI/Form'
import { Input } from '@/components/UI/Input'
import { Button } from '@/components/UI/Button'
import { toast } from 'sonner'

interface ContactFormProps {
  handleFinish: (values: { message: string; email: string; name: string }) => void
}

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long',
  }),
  message: z.string().min(30, {
    message: 'Message must be at least 30 characters long',
  }),
})

export const ContactForm = ({ handleFinish }: ContactFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      message: '',
    },
  })

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    handleFinish(values)
    form.reset()
    toast('Message has been sent sucessfully', {
      description: 'Thank you for your reply!',
      action: {
        label: 'Okay',
        onClick: () => {
          console.log('Clicked')
        },
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>Enter your valid email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>Enter your first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="Enter your message" {...field} />
              </FormControl>
              <FormDescription>Enter your desired message.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <DrawerClose asChild> */}
        <Button
          type="submit"
          className="w-full transition-colors"
          disabled={form.getFieldState('message').invalid || form.getFieldState('email').invalid || form.getFieldState('name').invalid}
        >
          Submit
        </Button>
        {/* </DrawerClose> */}
      </form>
    </Form>
  )
}
