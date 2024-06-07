import { signIn } from '@/auth'
import { Button } from '@/components/UI/Button'

export const SignIn = () => {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <Button type="submit" variant="outline">
        Sign In with Google
      </Button>
    </form>
  )
}
