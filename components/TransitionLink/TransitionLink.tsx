'use client'

import { useRouter } from 'next/navigation'
import { animatePageOut } from '@/animations'

interface TransitionLinkProps {
  href: string
  label?: string
  className?: string
  children?: React.ReactNode
}

export const TransitionLink = ({
  href,
  label = '',
  className = 'border-[1px] border-black p-4 rounded-xl hover:bg-black hover:text-neutral-100 cursor-pointer',
  children = null,
}: TransitionLinkProps) => {
  const router = useRouter()

  const handleClick = () => {
    animatePageOut(href, router)
  }

  if (children) {
    return (
      <div className="cursor-pointer" onClick={handleClick} suppressHydrationWarning>
        {children}
      </div>
    )
  }

  return (
    <button className={className} onClick={handleClick} suppressHydrationWarning>
      {label}
    </button>
  )
}
