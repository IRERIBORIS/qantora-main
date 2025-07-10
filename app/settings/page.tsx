"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, LogOut, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: false,
    trading: true,
    community: true,
    marketing: false,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showTrades: false,
    showStats: true,
    allowMessages: true,
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 page-enter page-enter-active">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Fixed Header with Back Button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95">
          <div className="flex items-center justify-between px-4 py-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()} 
              className="h-9 w-9 back-btn btn-smooth"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold text-lg">Settings</h1>
            <div className="w-9"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Content with top padding to account for fixed header */}
        <div className="pt-16 pb-24">
          <div className="px-4 py-6 space-y-4">
            {/* Account Settings */}
            <Card className="rounded-lg shadow-sm">
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-3 pb-3">
                <div>
                  <Label htmlFor="email" className="text-xs font-medium">
                    Email
                  </Label>
                  <Input id="email" type="email" defaultValue="boris@example.com" className="mt-1 text-xs py-2 px-2 rounded-md" />
                </div>
                <div>
                  <Label htmlFor="username" className="text-xs font-medium">
                    Username
                  </Label>
                  <Input id="username" defaultValue="borispetroff" className="mt-1 text-xs py-2 px-2 rounded-md" />
                </div>
                <div>
                  <Label htmlFor="displayName" className="text-xs font-medium">
                    Display Name
                  </Label>
                  <Input id="displayName" defaultValue="Boris Petrov" className="mt-1 text-xs py-2 px-2 rounded-md" />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs py-2 btn-smooth">
                      Change Photo
                    </Button>
                  </div>
                </div>
                <Button className="w-full text-xs py-2 mt-2 btn-smooth rounded-md" size="sm">Update Profile</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bell className="h-4 w-4" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Push Notifications</p>
                    <p className="text-xs text-gray-600">Receive push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(value) => handleNotificationChange("push", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Email Notifications</p>
                    <p className="text-xs text-gray-600">Receive email updates</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(value) => handleNotificationChange("email", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Trading Alerts</p>
                    <p className="text-xs text-gray-600">Market and trade notifications</p>
                  </div>
                  <Switch
                    checked={notifications.trading}
                    onCheckedChange={(value) => handleNotificationChange("trading", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Community Updates</p>
                    <p className="text-xs text-gray-600">Posts and messages</p>
                  </div>
                  <Switch
                    checked={notifications.community}
                    onCheckedChange={(value) => handleNotificationChange("community", value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-4 w-4" />
                  Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Public Profile</p>
                    <p className="text-xs text-gray-600">Make your profile visible to others</p>
                  </div>
                  <Switch
                    checked={privacy.profilePublic}
                    onCheckedChange={(value) => handlePrivacyChange("profilePublic", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Show Trading Stats</p>
                    <p className="text-xs text-gray-600">Display your trading performance</p>
                  </div>
                  <Switch
                    checked={privacy.showStats}
                    onCheckedChange={(value) => handlePrivacyChange("showStats", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Allow Messages</p>
                    <p className="text-xs text-gray-600">Let others send you messages</p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(value) => handlePrivacyChange("allowMessages", value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Other Settings */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-3 h-10 bg-transparent text-sm btn-smooth">
                <Palette className="h-3 w-3" />
                Appearance
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-10 bg-transparent text-sm btn-smooth">
                <Globe className="h-3 w-3" />
                Language & Region
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-10 bg-transparent text-sm btn-smooth">
                <HelpCircle className="h-3 w-3" />
                Help & Support
              </Button>
            </div>

            {/* Danger Zone */}
            <Card className="border-red-200 card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-600 text-base">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent text-sm btn-smooth">
                  <LogOut className="h-3 w-3 mr-2" />
                  Sign Out
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent text-sm btn-smooth">
                  <Trash2 className="h-3 w-3 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* iPad Portrait Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="px-8 pt-6 pb-8 max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()} 
              className="rounded-lg h-10 w-10 back-btn btn-smooth"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-display font-bold text-2xl">Settings</h1>
          </div>

          <div className="space-y-6">
            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input id="email" type="email" defaultValue="boris@example.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <Input id="username" defaultValue="borispetroff" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="displayName" className="text-sm font-medium">
                    Display Name
                  </Label>
                  <Input id="displayName" defaultValue="Boris Petrov" className="mt-2" />
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" className="w-full btn-smooth">
                      Change Photo
                    </Button>
                  </div>
                </div>
                <Button className="w-full btn-smooth">Update Profile</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-base">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(value) => handleNotificationChange("push", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-base">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(value) => handleNotificationChange("email", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-base">Trading Alerts</p>
                    <p className="text-sm text-gray-600">Market movements and trade notifications</p>
                  </div>
                  <Switch
                    checked={notifications.trading}
                    onCheckedChange={(value) => handleNotificationChange("trading", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-base">Community Updates</p>
                    <p className="text-sm text-gray-600">Posts, comments, and messages</p>
                  </div>
                  <Switch
                    checked={notifications.community}
                    onCheckedChange={(value) => handleNotificationChange("community", value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-base">Public Profile</p>
                    <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    checked={privacy.profilePublic}
                    onCheckedChange={(value) => handlePrivacyChange("profilePublic", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-base">Show Trading Performance</p>
                    <p className="text-sm text-gray-600">Display your trading stats and P&L</p>
                  </div>
                  <Switch
                    checked={privacy.showStats}
                    onCheckedChange={(value) => handlePrivacyChange("showStats", value)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-base">Allow Direct Messages</p>
                    <p className="text-sm text-gray-600">Let other users send you messages</p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(value) => handlePrivacyChange("allowMessages", value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Other Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                <Palette className="h-4 w-4" />
                  Appearance & Theme
              </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                <Globe className="h-4 w-4" />
                Language & Region
              </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 text-xl">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out of All Devices
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account Permanently
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-6 pb-24">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-display font-bold text-2xl">Settings</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="boris@example.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="borispetroff" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" defaultValue="Boris Petrov" className="mt-1" />
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200">
                      <User className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" className="w-full btn-smooth">
                        Change Photo
                      </Button>
                    </div>
                  </div>
                  <Button className="btn-smooth">Update Profile</Button>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                    </div>
                    <Switch
                      checked={privacy.profilePublic}
                      onCheckedChange={(value) => handlePrivacyChange("profilePublic", value)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Trading Performance</p>
                      <p className="text-sm text-gray-600">Display your trading stats and P&L</p>
                    </div>
                    <Switch
                      checked={privacy.showStats}
                      onCheckedChange={(value) => handlePrivacyChange("showStats", value)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Direct Messages</p>
                      <p className="text-sm text-gray-600">Let other users send you messages</p>
                    </div>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={(value) => handlePrivacyChange("allowMessages", value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(value) => handleNotificationChange("push", value)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(value) => handleNotificationChange("email", value)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Trading Alerts</p>
                      <p className="text-sm text-gray-600">Market movements and trade notifications</p>
                    </div>
                    <Switch
                      checked={notifications.trading}
                      onCheckedChange={(value) => handleNotificationChange("trading", value)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Community Updates</p>
                      <p className="text-sm text-gray-600">Posts, comments, and messages</p>
                    </div>
                    <Switch
                      checked={notifications.community}
                      onCheckedChange={(value) => handleNotificationChange("community", value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Other Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                    <Palette className="h-4 w-4" />
                    Appearance & Theme
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                    <Globe className="h-4 w-4" />
                    Language & Region
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out of All Devices
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account Permanently
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
