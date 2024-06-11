'use client'

import { useRouter } from 'next/navigation'
import { animatePageOut } from '@/animations'

interface TransitionLinkProps {
  href: string
  label?: string
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

export const TransitionLink = ({ href, label = '', className = '', children = null }: TransitionLinkProps) => {
  const router = useRouter()

  const handleClick = () => {
    animatePageOut(href, router)
  }

  if (children) {
    return (
      <div className={`cursor-pointer inline-block ${className}`} onClick={handleClick} suppressHydrationWarning>
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
