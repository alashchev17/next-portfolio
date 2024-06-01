interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: string
}

export const Heading = ({ children, level }: HeadingProps) => {
  if (level === 1) {
    return <h1 className="text-3xl font-bold">{children}</h1>
  } else if (level === 2) {
    return <h2 className="text-xl font-bold">{children}</h2>
  } else if (level === 3) {
    return <h3 className="text-lg font-bold">{children}</h3>
  } else if (level === 4) {
    return <h4 className="text-base font-bold">{children}</h4>
  } else if (level === 5) {
    return <h5 className="text-sm font-bold">{children}</h5>
  } else if (level === 6) {
    return <h6 className="text-sm font-bold">{children}</h6>
  } else {
    return <h1 className="text-3xl font-bold">{children}</h1>
  }
}
