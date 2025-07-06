"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Edit,
  Settings,
  Share2,
  MoreHorizontal,
  TrendingUp,
  Calendar,
  MapPin,
  Users,
  Heart,
  MessageSquare,
  Repeat,
} from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)

  const userStats = {
    followers: 2456,
    following: 892,
    posts: 1234,
    winRate: 68.5,
    totalTrades: 1892,
    profitLoss: "+$45,230",
  }

  const recentPosts = [
    {
      id: 1,
      content:
        "Just closed a profitable AAPL position. The technical analysis played out perfectly with the breakout above $180 resistance.",
      timestamp: "2h ago",
      likes: 89,
      comments: 23,
      reposts: 12,
    },
    {
      id: 2,
      content:
        "Market volatility is creating some great opportunities in the tech sector. Looking at NVDA and MSFT for potential entries.",
      timestamp: "1d ago",
      likes: 156,
      comments: 45,
      reposts: 28,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Fixed Header with Back Button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold text-lg">Profile</h1>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content with top padding to account for fixed header */}
        <div className="pt-16 pb-24">
          <div className="px-4 py-6">
            {/* Profile Header */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-2xl bg-gray-200 mx-auto mb-4"></div>
              <h2 className="font-display font-bold text-xl mb-1">Boris Petrov</h2>
              <p className="text-gray-600 mb-2">@borispetroff</p>
              <p className="text-sm text-gray-600 mb-4">
                Professional trader with 8+ years of experience. Specializing in technical analysis and swing trading.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined March 2020</span>
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-6">
                <Button className="flex-1 max-w-32">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => router.push("/settings")}>
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="font-bold text-lg">{userStats.followers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{userStats.following}</p>
                  <p className="text-sm text-gray-600">Following</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{userStats.posts.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Posts</p>
                </div>
              </div>
            </div>

            {/* Trading Stats */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Trading Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{userStats.winRate}%</p>
                    <p className="text-sm text-gray-600">Win Rate</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userStats.totalTrades}</p>
                    <p className="text-sm text-gray-600">Total Trades</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-2xl font-bold text-green-600">{userStats.profitLoss}</p>
                    <p className="text-sm text-gray-600">Total P&L</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recent Posts</h3>
              {recentPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-800 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.timestamp}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Repeat className="h-3 w-3" />
                          {post.reposts}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
            <h1 className="font-display font-bold text-2xl">Profile</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-32 h-32 rounded-2xl bg-gray-200 mx-auto mb-6"></div>
                  <h2 className="font-display font-bold text-2xl mb-2">Boris Petrov</h2>
                  <p className="text-gray-600 mb-4">@borispetroff</p>
                  <p className="text-gray-600 mb-6">
                    Professional trader with 8+ years of experience. Specializing in technical analysis and swing
                    trading.
                  </p>

                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>New York, NY</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined March 2020</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-6">
                    <Button className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => router.push("/settings")}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="font-bold text-xl">{userStats.followers.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-xl">{userStats.following}</p>
                      <p className="text-sm text-gray-600">Following</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-xl">{userStats.posts.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Posts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trading Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Trading Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Win Rate</span>
                      <span className="font-bold text-green-600">{userStats.winRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Trades</span>
                      <span className="font-bold">{userStats.totalTrades}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total P&L</span>
                      <span className="font-bold text-green-600">{userStats.profitLoss}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Posts and Activity */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="posts" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="trades">Trades</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-6">
                  {recentPosts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-6">
                        <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{post.timestamp}</span>
                          <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2">
                              <Heart className="h-4 w-4" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              {post.comments}
                            </span>
                            <span className="flex items-center gap-2">
                              <Repeat className="h-4 w-4" />
                              {post.reposts}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="trades">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="font-semibold text-lg mb-2">Trade History</h3>
                      <p className="text-gray-600">Your trading history will appear here</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="font-semibold text-lg mb-2">Recent Activity</h3>
                      <p className="text-gray-600">Your recent activity will appear here</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
