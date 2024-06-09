import { Heading } from '@/components/UI/Heading'
import { Button } from '@/components/UI/Button'
import Link from 'next/link'
import { Session } from 'next-auth'

export default async function DashboardPage({ session }: { session: Session }) {
  return (
    <>
      <Heading level={6} className="py-4 mb-4 border-b">
        Signed in as{' '}
        <span className="font-bold">
          {session?.user?.email} {`(${session?.user?.name})`}
        </span>
      </Heading>
      <div className="flex gap-3 pb-4 border-b mb-4">
        <Link href="/dashboard/skills">
          <Button variant="outline">Update skills</Button>
        </Link>
        <Link href="/dashboard/projects">
          <Button variant="outline">Update projects</Button>
        </Link>
      </div>
    </>
  )
}
