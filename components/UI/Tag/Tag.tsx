interface TagProps {
  tag: string
}

export const Tag = ({ tag }: TagProps) => {
  return <span className="text-sm bg-zinc-200 dark:bg-zinc-600 py-0.5 px-2.5 text-zinc-800 dark:text-zinc-300 rounded-lg">{tag}</span>
}
