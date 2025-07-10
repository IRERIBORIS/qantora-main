"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSmoothNavigation } from "@/hooks/use-smooth-navigation"
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
  const { goBack, navigateTo } = useSmoothNavigation()
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
    <div className="min-h-screen bg-gray-50 page-enter page-enter-active">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Fixed Header with Back Button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95">
          <div className="flex items-center justify-between px-4 py-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goBack} 
              className="h-9 w-9 back-btn btn-smooth"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold text-lg">Profile</h1>
            <Button variant="ghost" size="icon" className="h-9 w-9 btn-smooth">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content with top padding to account for fixed header */}
        <div className="pt-16 pb-24">
          <div className="px-4 py-4">
            {/* Profile Header */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-xl bg-gray-200 mx-auto mb-3"></div>
              <h2 className="font-display font-bold text-base mb-1">Boris Petrov</h2>
              <p className="text-gray-600 text-xs mb-2">@borispetroff</p>
              <p className="text-xs text-gray-600 mb-3 px-2 leading-relaxed">
                Professional trader with 8+ years of experience. Specializing in technical analysis and swing trading.
              </p>

              <div className="flex flex-col items-center gap-1 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Joined March 2020</span>
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-4">
                <Button 
                  size="sm" 
                  className="flex-1 max-w-28 text-xs btn-smooth"
                  onClick={() => navigateTo("/settings")}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 btn-smooth">
                  <Share2 className="h-3 w-3" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 btn-smooth" 
                  onClick={() => navigateTo("/settings")}
                >
                  <Settings className="h-3 w-3" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <p className="font-bold text-sm">{userStats.followers.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm">{userStats.following}</p>
                  <p className="text-xs text-gray-600">Following</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm">{userStats.posts.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Posts</p>
                </div>
              </div>
            </div>

            {/* Trading Stats */}
            <Card className="mb-4 card-hover">
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="text-sm">Trading Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xl font-bold text-green-600">{userStats.winRate}%</p>
                    <p className="text-xs text-gray-600">Win Rate</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{userStats.totalTrades}</p>
                    <p className="text-xs text-gray-600">Total Trades</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xl font-bold text-green-600">{userStats.profitLoss}</p>
                    <p className="text-xs text-gray-600">Total P&L</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Recent Posts</h3>
              {recentPosts.map((post) => (
                <Card key={post.id} className="card-hover">
                  <CardContent className="p-2">
                    <p className="text-xs text-gray-800 mb-2 leading-relaxed">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.timestamp}</span>
                      <div className="flex items-center gap-3">
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

      {/* iPad Portrait Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="px-8 pt-6 pb-8 max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goBack} 
              className="rounded-lg h-10 w-10 back-btn btn-smooth"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-display font-bold text-2xl">Profile</h1>
          </div>

          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-28 h-28 rounded-2xl bg-gray-200 mx-auto mb-6"></div>
            <h2 className="font-display font-bold text-2xl mb-2">Boris Petrov</h2>
            <p className="text-gray-600 text-base mb-3">@borispetroff</p>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Professional trader with 8+ years of experience. Specializing in technical analysis and swing trading.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined March 2020</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 mb-8">
              <Button 
                className="px-6 btn-smooth"
                onClick={() => navigateTo("/settings")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 btn-smooth">
                <Share2 className="h-4 w-4" />
              </Button>
                              <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 btn-smooth" 
                  onClick={() => navigateTo("/settings")}
                >
                  <Settings className="h-4 w-4" />
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <p className="font-bold text-2xl">{userStats.followers.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl">{userStats.following}</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl">{userStats.posts.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
            </div>
          </div>

          {/* Trading Stats */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="text-xl">Trading Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-green-600">{userStats.winRate}%</p>
                  <p className="text-sm text-gray-600">Win Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{userStats.totalTrades}</p>
                  <p className="text-sm text-gray-600">Total Trades</p>
                </div>
                <div className="col-span-2">
                  <p className="text-3xl font-bold text-green-600">{userStats.profitLoss}</p>
                  <p className="text-sm text-gray-600">Total P&L</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <div className="space-y-6">
            <h3 className="font-semibold text-xl">Recent Posts</h3>
            {recentPosts.map((post) => (
              <Card key={post.id} className="card-hover">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-800 mb-4 leading-relaxed">{post.content}</p>
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
                    <Button 
                      className="flex-1 btn-smooth"
                      onClick={() => router.push("/settings")}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="icon" className="btn-smooth">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="btn-smooth"
                      onClick={() => router.push("/settings")}
                    >
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
