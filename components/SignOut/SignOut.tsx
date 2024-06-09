import { signOut } from '@/auth'
import { Button } from '@/components/UI/Button'

export const SignOut = () => {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button type="submit" variant="default">
        Sign Out
      </Button>
    </form>
  )
}
