import { SignOut } from '@/components/SignOut'
import { Heading } from '@/components/UI/Heading'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="py-6 pt-[calc(1.5rem+80px)] bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 min-h-dvh">
      <div className="container">
        <Heading level={2}>Content Management Panel</Heading>
        {children}
        <SignOut />
      </div>
    </main>
  )
}
