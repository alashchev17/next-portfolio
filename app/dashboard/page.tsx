import { auth } from '@/auth'
import { SignOut } from '@/components/SignOut'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  if (!session || session.user?.email !== 'andrew.lashchev15@gmail.com') {
    redirect('/')
  }

  return (
    <main className="py-6 pt-[calc(1.5rem+80px)] bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 min-h-dvh">
      <div className="container">
        Dashboard
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <SignOut />
      </div>
    </main>
  )
}
