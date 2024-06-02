import React from 'react'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  children: React.ReactNode
  id?: string
}

const headingStyles = {
  1: 'text-4xl md:text-5xl lg:text-6xl lg:leading-tight font-bold',
  2: 'text-3xl md:text-4xl lg:text-5xl lg:leading-snug font-bold',
  3: 'text-2xl md:text-3xl lg:text-4xl lg:leading-snug font-semibold',
  4: 'text-xl md:text-2xl lg:text-3xl lg:leading-snug font-semibold',
  5: 'text-lg md:text-xl lg:text-2xl lg:leading-relaxed font-medium',
  6: 'text-base md:text-lg lg:text-xl lg:leading-relaxed font-medium',
}

export const Heading = ({ children, level, className = '', id }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const headingClassName = headingStyles[level]

  return (
    <Tag id={id} className={`${headingClassName} ${className}`}>
      {children}
    </Tag>
  )
}
