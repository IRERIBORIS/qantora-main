"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FlexibleLayoutProps {
  children: ReactNode
  className?: string
  fullScreen?: boolean
  padding?: "none" | "sm" | "md" | "lg"
}

export function FlexibleLayout({ children, className, fullScreen = false, padding = "md" }: FlexibleLayoutProps) {
  const paddingClasses = {
    none: "",
    sm: "p-2 sm:p-4",
    md: "p-4 sm:p-6 lg:p-8",
    lg: "p-6 sm:p-8 lg:p-12",
  }

  return (
    <div
      className={cn(
        "w-full",
        className,
      )}
    >
      <div className="w-full max-w-full mx-auto">{children}</div>
    </div>
  )
}
