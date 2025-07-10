"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Settings, LogOut, Bell, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const pathname = usePathname()
  const [notificationCount, setNotificationCount] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const showSearch = pathname === "/"

  const notifications = [
    { id: 1, title: "AAPL hit your price target", time: "2m ago", type: "price" },
    { id: 2, title: "New market analysis available", time: "1h ago", type: "news" },
    { id: 3, title: "Weekly trading report ready", time: "3h ago", type: "report" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-gray-100 ${pathname === "/" ? "bg-transparent" : "bg-white/95 backdrop-blur-sm"}`}
    >
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span
              className={`font-display font-bold text-lg sm:text-xl lg:text-2xl tracking-tight ${pathname === "/" ? "text-gray-900" : "text-gray-900"}`}
            >
              Qantora
            </span>
          </Link>
        </div>

        {/* Search Bar - Only on portfolio page and hidden on mobile */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets, news, or help..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
              />
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl hover:bg-gray-100">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0 border border-white">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 sm:w-80 max-h-64 sm:max-h-80">
              <div className="p-3 sm:p-4 border-b">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 ${
                          notification.type === "price"
                            ? "bg-green-500"
                            : notification.type === "news"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 sm:p-4 border-t">
                <Button variant="ghost" className="w-full text-xs sm:text-sm">
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-xl hover:bg-gray-100 p-0">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <User size={18} className="text-gray-700" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200">
                    <User size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Boris Johnson</p>
                    <p className="text-xs text-gray-500">boris@example.com</p>
                  </div>
                </div>
              </div>
              <DropdownMenuItem className="cursor-pointer btn-smooth">
                <User className="mr-2 h-4 w-4" />
                <Link href="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer btn-smooth">
                <Settings className="mr-2 h-4 w-4" />
                <Link href="/settings" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
