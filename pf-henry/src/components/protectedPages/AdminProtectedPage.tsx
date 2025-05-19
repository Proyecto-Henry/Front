'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import useUserDataStore from "@/store"
import { Spinner } from "@heroui/react"

const AdminProtectedPage = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const { userData, isHydrated } = useUserDataStore()
    const { data: session, status } = useSession()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Esperar a que cargue la sesión o el store, según el caso
        if (status === "loading") return
        if (!session?.user && !isHydrated) return

        const isLocalAdmin = userData?.token && userData?.role === 'admin'
        const isGoogleAdmin = !!session?.user // ya logueado por Google, sin usar userData

        if (!isLocalAdmin && !isGoogleAdmin) {
            router.replace("/")
            return
        }

        setIsLoading(false)
    }, [userData, isHydrated, session, status, router])

    if (isLoading || status === "loading" || (!session?.user && !isHydrated)) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }

    return <>{children}</>
}

export default AdminProtectedPage
