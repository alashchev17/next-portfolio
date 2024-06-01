import Link from 'next/link'

import { ModeToggler } from '@/components/Theme'
import { Heading } from '@/components/UI/Heading'

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-5 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50 border-b">
      <Link href="/">
        <Heading level={2}>lashchev-dev</Heading>
      </Link>
      <ModeToggler />
    </header>
  )
}
