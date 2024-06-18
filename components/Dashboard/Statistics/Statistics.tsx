import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/UI/Card'

type StatisticsProps = {
  titles: string[]
  descriptions: string[]
  contents: string[]
}

export const Statistics = ({ titles, descriptions, contents }: StatisticsProps) => {
  if (titles.length !== descriptions.length || titles.length !== contents.length) {
    throw new Error('Titles, descriptions and contents must be of the same length')
  }
  return (
    <div className="flex flex-wrap justify-between pt-6">
      {titles.map((title, i) => (
        <Card key={i} className={`w-[calc(33.33%-1rem)]`}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{descriptions[i]}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{contents[i]} items</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
