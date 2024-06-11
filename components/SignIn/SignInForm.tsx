'use client'

import { useSearchParams } from 'next/navigation'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import { toast } from 'sonner'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/UI/Form'
import { Input } from '@/components/UI/Input'
import { Button } from '@/components/UI/Button'
import { useState } from 'react'

type SignInFormProps = {
  handleFinish: (values: { email: string; password: string }) => Promise<{ message: string; field: 'email' | 'password' } | undefined>
}

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const SignInForm = ({ handleFinish }: SignInFormProps) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [isFormSending, setIsFormSending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsFormSending(true)
    const formattedValues = {
      ...values,
      password: values.password.trim(),
      email: values.email.trim().toLowerCase(),
    }
    const response = await handleFinish(formattedValues)
    if (!response) {
      form.reset()
      setIsFormSending(false)
      toast('Logged in successfully!', {
        description: 'You have successfully logged in!',
        action: {
          label: 'Okay',
          onClick: () => {
            toast.dismiss()
          },
        },
      })
      signIn('credentials', {
        email: formattedValues.email,
        password: formattedValues.password,
        callbackUrl,
      })
      return
    }
    setIsFormSending(false)
    toast('Failed to log in!', {
      description: response.message,
      action: {
        label: 'Okay',
        onClick: () => {
          toast.dismiss()
        },
      },
    })
    form.resetField(response.field)
    form.setError(response.field, { message: response.message }, { shouldFocus: true })
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} type="password" />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full transition-colors inline-flex items-center gap-3 py-6"
          disabled={form.getFieldState('email').invalid || form.getFieldState('password').invalid || isFormSending}
        >
          Login with Credentials
        </Button>
      </form>
    </Form>
  )
}
