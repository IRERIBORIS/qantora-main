"use client"

import { usePathname } from "next/navigation"
import { LayoutDashboard, LineChart, Bot, Users, GraduationCap } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Portfolio",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Markets",
      url: "/markets",
      icon: LineChart,
    },
    {
      name: "Cato AI",
      url: "/cato",
      icon: Bot,
    },
    {
      name: "Learning",
      url: "/learning",
      icon: GraduationCap,
    },
    {
      name: "Community",
      url: "/community",
      icon: Users,
    },
  ]

  return <NavBar items={navItems} currentPath={pathname} className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50" />
}
