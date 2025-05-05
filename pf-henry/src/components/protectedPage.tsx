'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useUserDataStore from "@/store"
import { ProtectedPageProps } from "@/interfaces/interfaces"
import { Spinner } from "@heroui/react"

const ProtectedPage = ({children}: ProtectedPageProps)=>{
    const router = useRouter();
    const { userData, isHydrated} = useUserDataStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(!isHydrated) return;
        setIsLoading(false);

        if(!userData){
            router.push("/");
        }
    }, [userData, isHydrated, router]);

    if (isLoading || !isHydrated){
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner/>
            </div>
        )
    }

    return <>{children}</>
    
}


export default ProtectedPage