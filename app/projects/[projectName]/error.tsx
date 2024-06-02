'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/UI/Button'

export default function Error() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Something went wrong</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">We are sorry, but an unexpected error has occurred.</p>
        <Button variant="default" size="lg" onClick={() => router.push('/')}>
          Return to a mainpage
        </Button>
      </div>
    </div>
  )
}
