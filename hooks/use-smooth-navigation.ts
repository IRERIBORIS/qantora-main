"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function useSmoothNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigationHistory, setNavigationHistory] = useState<string[]>([])

  // Track navigation history
  useEffect(() => {
    setNavigationHistory(prev => {
      // Don't add duplicate consecutive entries
      if (prev[prev.length - 1] !== pathname) {
        return [...prev, pathname]
      }
      return prev
    })
  }, [pathname])

  const navigateTo = useCallback((path: string) => {
    setIsNavigating(true)
    
    // Add a small delay to show the transition
    setTimeout(() => {
      router.push(path)
      setIsNavigating(false)
    }, 150)
  }, [router])

  const goBack = useCallback(() => {
    setIsNavigating(true)
    
    // Get the previous page from history
    const currentIndex = navigationHistory.indexOf(pathname)
    const previousPage = currentIndex > 0 ? navigationHistory[currentIndex - 1] : "/"
    
    // Add a small delay to show the transition
    setTimeout(() => {
      router.push(previousPage)
      setIsNavigating(false)
    }, 150)
  }, [router, pathname, navigationHistory])

  const goBackTo = useCallback((path: string) => {
    setIsNavigating(true)
    
    // Add a small delay to show the transition
    setTimeout(() => {
      router.push(path)
      setIsNavigating(false)
    }, 150)
  }, [router])

  return {
    navigateTo,
    goBack,
    goBackTo,
    isNavigating,
    currentPath: pathname
  }
} 