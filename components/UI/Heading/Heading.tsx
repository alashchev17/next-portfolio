interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}

export const Heading = ({ children, level }: HeadingProps) => {
  if (level === 1) {
    return <h1 className="leading-tight text-2xl md:text-5xl md:leading-tight font-bold">{children}</h1>
  } else if (level === 2) {
    return <h2 className="leading-normal text-xl md:text-2xl font-bold">{children}</h2>
  } else if (level === 3) {
    return <h3 className="leading-normal text-lg font-bold">{children}</h3>
  } else if (level === 4) {
    return <h4 className="leading-normal text-base font-bold">{children}</h4>
  } else if (level === 5) {
    return <h5 className="leading-normal text-sm font-bold">{children}</h5>
  } else if (level === 6) {
    return <h6 className="leading-normal text-sm font-bold">{children}</h6>
  } else {
    return <h1 className="leading-normal text-2xl md:text-5xl md:leading-normal font-bold">{children}</h1>
  }
}
