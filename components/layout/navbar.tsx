"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, LineChart, Bot, Users, GraduationCap } from "lucide-react"

const navItems = [
  {
    name: "Portfolio",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Markets",
    href: "/markets",
    icon: LineChart,
  },
  {
    name: "Cato AI",
    href: "/cato",
    icon: Bot,
  },
  {
    name: "Community",
    href: "/community",
    icon: Users,
  },
  {
    name: "Learning",
    href: "/learning",
    icon: GraduationCap,
  },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const IconComponent = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-16 transition-colors ${
                isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <IconComponent size={22} />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
