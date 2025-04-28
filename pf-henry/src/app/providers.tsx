'use client'
import { ReactNode } from "react"
import { HeroUIProvider } from "@heroui/react"

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}