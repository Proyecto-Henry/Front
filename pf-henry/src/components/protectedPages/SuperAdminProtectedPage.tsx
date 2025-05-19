// components/SuperAdminProtectedPage.tsx
'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useUserDataStore from '@/store'
import { Spinner } from '@heroui/react'

const SuperAdminProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { dataSuperAdmin, isHydrated } = useUserDataStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isHydrated) return

    if (!dataSuperAdmin?.token || dataSuperAdmin?.role !== 'super-admin') {
      router.replace('/') 
      return
    }

    setIsLoading(false)
  }, [dataSuperAdmin, isHydrated, router])

  if (!isHydrated || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  return <>{children}</>
}

export default SuperAdminProtectedPage
