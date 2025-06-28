"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ThumbsUp, MessageSquare, Repeat, Bookmark, Share2, TrendingUp, Zap, Filter } from "lucide-react"
import { formatDate } from "@/lib/utils/date-utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("trending")

  const posts = [
    {
      id: 1,
      author: "Sarah Johnson",
      username: "@sarahtrader",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 20),
      content:
        "Just analyzed the recent tech sector pullback. While many are panicking, this actually presents a great opportunity for long-term investors. Key support levels are holding well.",
      likes: 1243,
      comments: 89,
      reposts: 156,
      views: "1.2M",
      trending: true,
      verified: true,
    },
    {
      id: 2,
      author: "Michael Chen",
      username: "@miketrading",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 19),
      content:
        "My analysis of the Fed's latest policy statement: Expect continued volatility in bond markets as inflation concerns persist. I'm maintaining a defensive position with focus on quality dividend stocks and short-duration bonds.",
      likes: 876,
      comments: 124,
      reposts: 78,
      views: "845K",
      trending: true,
      verified: false,
    },
    {
      id: 3,
      author: "Alex Rivera",
      username: "@alexcrypto",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 18),
      content:
        "Bitcoin's correlation with traditional markets is decreasing again - this is historically a bullish sign. Looking at on-chain metrics, accumulation by long-term holders continues despite recent price action.",
      likes: 2156,
      comments: 203,
      reposts: 312,
      views: "2.4M",
      trending: true,
      verified: true,
    },
    {
      id: 4,
      author: "Emma Wilson",
      username: "@emmafinance",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 17),
      content:
        "Just published my quarterly sector rotation strategy. Energy and healthcare are showing the strongest momentum signals, while consumer discretionary looks increasingly vulnerable.",
      likes: 543,
      comments: 67,
      reposts: 42,
      views: "320K",
      trending: false,
      verified: false,
    },
    {
      id: 5,
      author: "David Park",
      username: "@davidforex",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 16),
      content:
        "EUR/USD technical analysis: The pair is approaching a critical resistance level at 1.0950. Watch for a potential breakout which could signal a shift in the medium-term trend.",
      likes: 321,
      comments: 45,
      reposts: 28,
      views: "178K",
      trending: false,
      verified: true,
    },
  ]

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-display font-bold text-xl">Community</h1>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50%]">
              <SheetHeader>
                <SheetTitle>Search Community</SheetTitle>
              </SheetHeader>
              <div className="relative mt-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search posts, topics, users..." className="pl-8" />
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="trending" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="trending" className="flex-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="latest" className="flex-1">
            <Zap className="h-4 w-4 mr-1" />
            Latest
          </TabsTrigger>
          <TabsTrigger value="following" className="flex-1">
            <Bookmark className="h-4 w-4 mr-1" />
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          {posts
            .filter((post) => post.trending)
            .map((post) => (
              <Card key={post.id}>
                <CardContent className="p-3">
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm">{post.author}</span>
                        {post.verified && (
                          <span className="bg-blue-500 text-white rounded-full p-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-2 w-2"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500 text-xs">{post.username}</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">{formatDate(post.date)}</span>
                      </div>
                      <p className="mt-2 text-sm">{post.content}</p>

                      <div className="flex items-center justify-between mt-3 text-gray-500">
                        <Button variant="ghost" size="sm" className="h-7 px-1">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          <span className="text-xs">{post.likes.toLocaleString()}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-1">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          <span className="text-xs">{post.comments.toLocaleString()}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-1">
                          <Repeat className="h-3 w-3 mr-1" />
                          <span className="text-xs">{post.reposts.toLocaleString()}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-1">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="mt-1">
                        <span className="text-xs text-gray-500">{post.views} views</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {posts
            .filter((post) => !post.trending)
            .map((post) => (
              <Card key={post.id}>
                <CardContent className="p-3">
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm">{post.author}</span>
                        {post.verified && (
                          <span className="bg-blue-500 text-white rounded-full p-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-2 w-2"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500 text-xs">{post.username}</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">{formatDate(post.date)}</span>
                      </div>
                      <p className="mt-2 text-sm">{post.content}</p>

                      <div className="flex items-center justify-between mt-3 text-gray-500">
                        <Button variant="ghost" size="sm" className="h-7 px-1">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          <span className="text-xs">{post.likes.toLocaleString()}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-1">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          <span className="text-xs">{post.comments.toLocaleString()}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-1">
                          <Repeat className="h-3 w-3 mr-1" />
                          <span className="text-xs">{post.reposts.toLocaleString()}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-1">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="mt-1">
                        <span className="text-xs text-gray-500">{post.views} views</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="latest" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-center items-center h-32">
                <p className="text-sm text-gray-500">Switch to this tab to see the latest posts</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="following" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-center items-center h-32">
                <p className="text-sm text-gray-500">Follow traders to see their posts here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-20 right-4 h-10 w-10 rounded-full shadow-lg">
            <Zap className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80%]">
          <SheetHeader>
            <SheetTitle>Trending Topics</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-medium text-sm">#FedMeeting</p>
              <p className="text-xs text-gray-500">2,456 posts</p>
            </div>
            <div>
              <p className="font-medium text-sm">#TechEarnings</p>
              <p className="text-xs text-gray-500">1,892 posts</p>
            </div>
            <div>
              <p className="font-medium text-sm">#CryptoRegulation</p>
              <p className="text-xs text-gray-500">1,245 posts</p>
            </div>
            <div>
              <p className="font-medium text-sm">#MarketVolatility</p>
              <p className="text-xs text-gray-500">987 posts</p>
            </div>
            <div>
              <p className="font-medium text-sm">#OilPrices</p>
              <p className="text-xs text-gray-500">765 posts</p>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-display font-semibold text-base mb-3">Top Contributors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Johnson" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Sarah Johnson</p>
                    <p className="text-xs text-gray-500">@sarahtrader</p>
                  </div>
                  <Zap className="h-4 w-4 text-amber-500 ml-auto" />
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alex Rivera" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Alex Rivera</p>
                    <p className="text-xs text-gray-500">@alexcrypto</p>
                  </div>
                  <Zap className="h-4 w-4 text-amber-500 ml-auto" />
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Michael Chen" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Michael Chen</p>
                    <p className="text-xs text-gray-500">@miketrading</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
