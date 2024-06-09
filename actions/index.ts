'use server'
import { users } from '@/database/users'

export const login = async (values: {
  email: string
  password: string
}): Promise<
  | {
      message: string
      field: 'email' | 'password'
    }
  | undefined
> => {
  const currentUser = users.find((user) => user.email === values.email)
  if (!currentUser) {
    return Promise.resolve({
      message: 'User not found',
      field: 'email',
    })
  }

  if (currentUser.password !== values.password) {
    return Promise.resolve({
      message: 'Invalid password',
      field: 'password',
    })
  }
}
