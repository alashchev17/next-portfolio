import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return <div className={cn('animate-pulse rounded-md bg-zinc-900/10 dark:bg-zinc-50/10', className)} {...props} />
}
