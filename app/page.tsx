import { sdk } from '@/lib/client'

export default async function Home() {
  const response = await sdk.AllData()
  const data = response.data
  console.log(data)
  return <div>Homepage</div>
}
