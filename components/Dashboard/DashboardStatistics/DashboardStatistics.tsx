import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/UI/Card'
import { TransitionLink } from '@/components/TransitionLink'

import { DASHBOARD_STATISTICS_ITEMS } from '@/constants'
import { Button } from '@/components/UI/Button'

type DashboardStatisticsProps = {
  contents: number[]
  userRole: string
}

export const DashboardStatistics = ({ contents, userRole }: DashboardStatisticsProps) => {
  return (
    <div className="flex flex-wrap justify-between pt-6">
      {DASHBOARD_STATISTICS_ITEMS.titles.map((title, i) => (
        <Card key={i} className={`w-[calc(33.33%-1rem)]`}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{DASHBOARD_STATISTICS_ITEMS.descriptions[i]}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {contents[i]} {contents[i] <= 1 ? 'item' : 'items'}
            </p>
          </CardContent>
          <CardFooter>
            {DASHBOARD_STATISTICS_ITEMS.permissions[i].role.includes(userRole) ? (
              <TransitionLink href={DASHBOARD_STATISTICS_ITEMS.links[i]}>
                <Button variant="outline">View All</Button>
              </TransitionLink>
            ) : (
              <Button variant="outline" disabled={!DASHBOARD_STATISTICS_ITEMS.permissions[i].role.includes(userRole)}>
                Insufficient permissions
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
