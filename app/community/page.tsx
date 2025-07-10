"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Search,
  Heart,
  MessageSquare,
  Repeat,
  Share2,
  Zap,
  Users,
  Plus,
  Crown,
  Globe,
  Radio,
  Eye,
  Play,
} from "lucide-react"
import { formatDate } from "@/lib/utils/date-utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

export default function CommunityPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("trending")
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [repostedPosts, setRepostedPosts] = useState<number[]>([])
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [newRoomName, setNewRoomName] = useState("")
  const [newRoomDescription, setNewRoomDescription] = useState("")
  const [posts, setPosts] = useState([
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
      verified: true,
    },
    {
      id: 2,
      author: "Michael Chen",
      username: "@miketrading",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 19),
      content:
        "My analysis of the Fed's latest policy statement: Expect continued volatility in bond markets as inflation concerns persist.",
      likes: 876,
      comments: 124,
      reposts: 78,
      views: "845K",
      verified: false,
    },
    {
      id: 3,
      author: "Alex Rodriguez",
      username: "@cryptoalex",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 18),
      content:
        "Bitcoin showing strong momentum above $45K. The institutional adoption narrative is gaining traction. Key resistance at $48K could be the next target.",
      likes: 2156,
      comments: 234,
      reposts: 445,
      views: "2.1M",
      verified: true,
    },
    {
      id: 4,
      author: "Emma Wilson",
      username: "@emmawilson",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 17),
      content:
        "Options flow analysis for today: Heavy call buying in tech stocks suggests institutional confidence. AAPL calls expiring this week seeing unusual activity.",
      likes: 1543,
      comments: 167,
      reposts: 289,
      views: "1.8M",
      verified: false,
    },
    {
      id: 5,
      author: "David Kim",
      username: "@davidkim",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 16),
      content:
        "Technical analysis: SPY forming a bullish flag pattern. Volume confirmation needed for breakout. Support at $420, resistance at $435.",
      likes: 987,
      comments: 145,
      reposts: 123,
      views: "956K",
      verified: true,
    },
    {
      id: 6,
      author: "Lisa Thompson",
      username: "@lisathompson",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 15),
      content:
        "Earnings season insights: Companies beating estimates but guidance cautious. Market pricing in potential slowdown. Focus on quality over growth.",
      likes: 1321,
      comments: 198,
      reposts: 267,
      views: "1.5M",
      verified: false,
    },
    {
      id: 7,
      author: "James Martinez",
      username: "@jamesmartinez",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 14),
      content:
        "Forex update: EUR/USD testing key support at 1.0850. ECB policy divergence from Fed creating pressure. Watch for breakout below 1.0800.",
      likes: 756,
      comments: 89,
      reposts: 134,
      views: "678K",
      verified: true,
    },
    {
      id: 8,
      author: "Rachel Green",
      username: "@rachelgreen",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date(2023, 6, 13),
      content:
        "Sector rotation analysis: Money flowing from tech to healthcare and utilities. Defensive positioning ahead of potential market volatility.",
      likes: 1123,
      comments: 156,
      reposts: 234,
      views: "1.3M",
      verified: false,
    },
  ])
  const [newPostText, setNewPostText] = useState("")
  const [newPostMedia, setNewPostMedia] = useState<File | null>(null)
  const [newPostMediaPreview, setNewPostMediaPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showTrendingSheet, setShowTrendingSheet] = useState(false)

  const tradeRooms = [
    {
      id: 1,
      name: "Crypto Bulls",
      description: "Discussing cryptocurrency trends and opportunities",
      members: 2456,
      active: 234,
      category: "Cryptocurrency",
      isPrivate: false,
      moderators: ["@cryptoking", "@btcwhale"],
    },
    {
      id: 2,
      name: "Options Masters",
      description: "Advanced options trading strategies and analysis",
      members: 1892,
      active: 156,
      category: "Options",
      isPrivate: false,
      moderators: ["@optionspro", "@thetagang"],
    },
    {
      id: 3,
      name: "Forex Elite",
      description: "Professional forex trading community",
      members: 3421,
      active: 289,
      category: "Forex",
      isPrivate: true,
      moderators: ["@forexmaster", "@pipchaser"],
    },
    {
      id: 4,
      name: "Day Traders Hub",
      description: "Fast-paced day trading discussions and alerts",
      members: 5234,
      active: 412,
      category: "Day Trading",
      isPrivate: false,
      moderators: ["@daytrader1", "@scalper"],
    },
  ]

  const liveStreams = [
    {
      id: 1,
      title: "Live Market Analysis - Tech Stocks Breakdown",
      streamer: "Sarah Johnson",
      username: "@sarahtrader",
      viewers: 1234,
      category: "Market Analysis",
      thumbnail: "/placeholder.svg?height=120&width=200",
      isLive: true,
    },
    {
      id: 2,
      title: "Options Trading Masterclass",
      streamer: "Michael Chen",
      username: "@miketrading",
      viewers: 856,
      category: "Education",
      thumbnail: "/placeholder.svg?height=120&width=200",
      isLive: true,
    },
    {
      id: 3,
      title: "Crypto Market Update & Q&A",
      streamer: "Alex Rodriguez",
      username: "@cryptoalex",
      viewers: 2341,
      category: "Cryptocurrency",
      thumbnail: "/placeholder.svg?height=120&width=200",
      isLive: true,
    },
  ]

  const trendingTopics = [
    { topic: "Crypto", count: "1.2M" },
    { topic: "Options", count: "845K" },
    { topic: "Forex", count: "342K" },
    { topic: "Day Trading", count: "523K" },
  ]

  const topContributors = [
    { name: "Sarah Johnson", username: "@sarahtrader", avatar: "/placeholder.svg?height=40&width=40", posts: 1243 },
    { name: "Michael Chen", username: "@miketrading", avatar: "/placeholder.svg?height=40&width=40", posts: 876 },
    { name: "Alex Rodriguez", username: "@cryptoalex", avatar: "/placeholder.svg?height=40&width=40", posts: 2341 },
  ]

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleRepost = (postId: number) => {
    setRepostedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleJoinRoom = (roomId: number) => {
    router.push(`/community/trade-room/${roomId}`)
  }

  const handleCreateRoom = () => {
    if (newRoomName.trim() && newRoomDescription.trim()) {
      // Create room logic here
      setNewRoomName("")
      setNewRoomDescription("")
      setShowCreateRoom(false)
    }
  }

  const handleProfileClick = (username: string) => {
    const cleanUsername = username.replace("@", "")
    router.push(`/community/profile/${cleanUsername}`)
  }

  const handleWatchStream = (streamId: number) => {
    router.push(`/community/stream/${streamId}`)
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewPostMedia(file)
      setNewPostMediaPreview(URL.createObjectURL(file))
    }
  }

  const handleCreatePost = () => {
    if (!newPostText.trim() && !newPostMedia) return
    const newPost = {
      id: Date.now(),
      author: "Demo User",
      username: "@demouser",
      avatar: "/placeholder-user.jpg",
      date: new Date(),
      content: newPostText,
      media: newPostMediaPreview,
      mediaType: newPostMedia?.type.startsWith("video") ? "video" : newPostMedia?.type.startsWith("image") ? "image" : null,
      likes: 0,
      comments: 0,
      reposts: 0,
      views: "0",
      verified: false,
    }
    setPosts([newPost, ...posts])
    setNewPostText("")
    setNewPostMedia(null)
    setNewPostMediaPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="bg-gray-50">
      {/* Mobile Layout */}
      <div className="block lg:hidden min-h-screen">
        <div className="container mx-auto px-4 py-6 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display font-bold text-2xl text-gray-900">Community</h1>
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
            </TabsList>

            {activeTab === "trending" && (
              <>
                {/* Post Feature at the Top */}
                <div className="mb-4">
                  <Card className="border-border shadow-sm bg-card/90">
                    <CardContent className="p-4 flex flex-col gap-3">
                      <textarea
                        className="w-full min-h-[48px] rounded-lg border border-border bg-background px-3 py-2 text-base font-display text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                        placeholder="Share something with the community..."
                        value={newPostText}
                        onChange={e => setNewPostText(e.target.value)}
                      />
                      {newPostMediaPreview && (
                        <div className="relative w-full flex justify-center items-center">
                          {newPostMedia && newPostMedia.type.startsWith("image") && (
                            <img src={newPostMediaPreview} alt="Preview" className="max-h-48 rounded-lg object-contain" />
                          )}
                          {newPostMedia && newPostMedia.type.startsWith("video") && (
                            <video src={newPostMediaPreview} controls className="max-h-48 rounded-lg object-contain" />
                          )}
                          <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => { setNewPostMedia(null); setNewPostMediaPreview(null); if (fileInputRef.current) fileInputRef.current.value = "" }}>
                            ×
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" className="rounded-lg" onClick={() => fileInputRef.current?.click()}>
                            <Plus className="h-4 w-4" />
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleMediaChange}
                          />
                        </div>
                        <Button size="sm" className="font-display px-4 py-2 rounded-lg btn-smooth" onClick={handleCreatePost} disabled={!newPostText.trim() && !newPostMedia}>
                          Post
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Fixed Zap Toggle at Bottom Right (mobile only) */}
                <div className="lg:hidden">
                  <Button
                    size="icon"
                    variant="outline"
                    className="fixed bottom-20 right-4 z-50 rounded-lg shadow btn-smooth"
                    onClick={() => setShowTrendingSheet(true)}
                    aria-label="Show Trending Info"
                  >
                    <Zap className="h-6 w-6 text-yellow-500" />
                  </Button>
                  <Sheet open={showTrendingSheet} onOpenChange={setShowTrendingSheet}>
                    <SheetContent side="bottom" className="max-h-[80vh] rounded-t-2xl p-6 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="font-display text-lg text-foreground flex items-center gap-2">
                          <Zap className="h-5 w-5 text-yellow-500" /> Trending & Contributors
                        </SheetTitle>
                      </SheetHeader>
                      <div className="space-y-6 mt-4">
                        {/* Trending Topics Card */}
                        <Card className="bg-card border border-border shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="font-display text-base text-foreground">Trending Topics</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-2">
                              {trendingTopics.map((t) => (
                                <li key={t.topic} className="flex items-center justify-between text-base font-medium text-foreground">
                                  <span className="truncate">{t.topic}</span>
                                  <span className="text-xs text-muted-foreground">{t.count}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        {/* Top Contributors Card */}
                        <Card className="bg-card border border-border shadow-sm">
                          <CardHeader className="pb-2 flex flex-row items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-500" aria-label="Top Contributors" />
                            <CardTitle className="font-display text-base text-foreground">Top Contributors</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-3">
                              {topContributors.map((user) => (
                                <li key={user.username} className="flex items-center gap-3">
                                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-border object-cover" />
                                  <div className="flex-1 min-w-0">
                                    <span className="block font-medium text-foreground truncate">{user.name}</span>
                                    <span className="block text-xs text-muted-foreground truncate">{user.username}</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{user.posts} posts</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        <SheetClose asChild>
                          <Button className="w-full mt-2 rounded-lg btn-smooth">Close</Button>
                        </SheetClose>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </>
            )}

            <TabsContent value="trending" className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0 cursor-pointer"
                        onClick={() => handleProfileClick(post.username)}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-medium text-sm truncate cursor-pointer hover:underline"
                            onClick={() => handleProfileClick(post.username)}
                          >
                            {post.author}
                          </span>
                          {post.verified && <Crown className="h-3 w-3 text-yellow-500" />}
                          <span
                            className="text-xs text-gray-500 cursor-pointer hover:underline"
                            onClick={() => handleProfileClick(post.username)}
                          >
                            {post.username}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <button
                        className={`flex items-center gap-1 ${likedPosts.includes(post.id) ? "text-red-500" : ""}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                        {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </button>
                      <button
                        className={`flex items-center gap-1 ${repostedPosts.includes(post.id) ? "text-green-500" : ""}`}
                        onClick={() => handleRepost(post.id)}
                      >
                        <Repeat className="h-4 w-4" />
                        {post.reposts + (repostedPosts.includes(post.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="live" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Live Streams</h2>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Radio className="h-4 w-4 mr-2" />
                  Go Live
                </Button>
              </div>

              {liveStreams.map((stream) => (
                <Card key={stream.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={stream.thumbnail || "/placeholder.svg"}
                          alt={stream.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                        <Radio className="h-3 w-3" />
                        LIVE
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {stream.viewers.toLocaleString()}
                      </div>
                      <Button
                        size="icon"
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/50 hover:bg-black/70"
                        onClick={() => handleWatchStream(stream.id)}
                      >
                        <Play className="h-6 w-6 text-white" />
                      </Button>
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{stream.title}</h3>
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:underline"
                        onClick={() => handleProfileClick(stream.username)}
                      >
                        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                        <span className="text-sm text-gray-700">{stream.streamer}</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{stream.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="rooms" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Trade Rooms</h2>
                <Dialog open={showCreateRoom} onOpenChange={setShowCreateRoom}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-2xl px-2 py-4 sm:px-6 sm:py-6">
                    <DialogHeader>
                      <DialogTitle className="font-display text-lg sm:text-xl">Create Trade Room</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 sm:space-y-4">
                      <Input
                        className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                        placeholder="Room name..."
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                      />
                      <Input
                        className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                        placeholder="Room description..."
                        value={newRoomDescription}
                        onChange={(e) => setNewRoomDescription(e.target.value)}
                      />
                      <Button onClick={handleCreateRoom} className="w-full text-xs sm:text-sm py-2 sm:py-3">
                        Create Room
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {tradeRooms.map((room) => (
                <Card key={room.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base">{room.name}</h3>
                          {room.isPrivate ? (
                            <div className="w-2 h-2 rounded-full bg-orange-500" aria-label="Private Room"></div>
                          ) : (
                            <Globe className="h-3 w-3 text-green-500" aria-label="Public Room" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {room.members.toLocaleString()} members
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-green-500" aria-label="Active" />
                            {room.active} active
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleJoinRoom(room.id)}
                      className="w-full"
                      variant={room.isPrivate ? "outline" : "default"}
                    >
                      {room.isPrivate ? "Request Access" : "Join Room"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block fixed inset-0 bg-background" style={{ top: '64px', height: 'calc(100vh - 64px)' }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h1 className="font-display font-bold text-2xl text-gray-900">Community</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search community..." className="pl-10 w-80" />
                </div>
                <Button className="bg-red-600 hover:bg-red-700 gap-2">
                  <Radio className="h-4 w-4" />
                  Go Live
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="bg-white border-b border-gray-200 px-8 py-4 flex-shrink-0">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="live">Live</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                  <TabsTrigger value="rooms">Rooms</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto min-h-0">
                <TabsContent value="trending" className="p-12">
                  <div className="flex gap-12">
                    {/* Main Content */}
                    <div className="flex-1 max-w-3xl mx-auto space-y-8">
                    {activeTab === "trending" && (
                      <div className="mb-6">
                        <Card className="border-border shadow-sm bg-card/90">
                          <CardContent className="p-6 flex flex-col gap-4">
                            <textarea
                              className="w-full min-h-[48px] rounded-lg border border-border bg-background px-4 py-3 text-base font-display text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                              placeholder="Share something with the community..."
                              value={newPostText}
                              onChange={e => setNewPostText(e.target.value)}
                            />
                            {newPostMediaPreview && (
                              <div className="relative w-full flex justify-center items-center">
                                {newPostMedia && newPostMedia.type.startsWith("image") && (
                                  <img src={newPostMediaPreview} alt="Preview" className="max-h-48 rounded-lg object-contain" />
                                )}
                                {newPostMedia && newPostMedia.type.startsWith("video") && (
                                  <video src={newPostMediaPreview} controls className="max-h-48 rounded-lg object-contain" />
                                )}
                                <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => { setNewPostMedia(null); setNewPostMediaPreview(null); if (fileInputRef.current) fileInputRef.current.value = "" }}>
                                  ×
                                </Button>
                              </div>
                            )}
                            <div className="flex items-center gap-3 justify-between">
                              <div className="flex items-center gap-3">
                                <Button size="icon" variant="outline" className="rounded-lg" onClick={() => fileInputRef.current?.click()}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*,video/*"
                                  className="hidden"
                                  onChange={handleMediaChange}
                                />
                              </div>
                              <Button size="sm" className="font-display px-6 py-2 rounded-lg btn-smooth" onClick={handleCreatePost} disabled={!newPostText.trim() && !newPostMedia}>
                                Post
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    {posts.map((post) => (
                      <Card key={post.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-4 mb-6">
                            <div
                              className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0 cursor-pointer hover:opacity-80"
                              onClick={() => handleProfileClick(post.username)}
                            ></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="font-semibold text-gray-900 cursor-pointer hover:underline"
                                  onClick={() => handleProfileClick(post.username)}
                                >
                                  {post.author}
                                </span>
                                {post.verified && <Crown className="h-4 w-4 text-yellow-500" />}
                                <span
                                  className="text-gray-500 cursor-pointer hover:underline"
                                  onClick={() => handleProfileClick(post.username)}
                                >
                                  {post.username}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-500">{formatDate(post.date)}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-800 mb-6 leading-relaxed text-base">{post.content}</p>
                          <div className="flex items-center justify-between text-gray-500">
                            <button
                              className={`flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors ${
                                likedPosts.includes(post.id) ? "text-red-500" : ""
                              }`}
                              onClick={() => handleLike(post.id)}
                            >
                              <Heart className={`h-5 w-5 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                              <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                              <MessageSquare className="h-5 w-5" />
                              <span>{post.comments}</span>
                            </button>
                            <button
                              className={`flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors ${
                                repostedPosts.includes(post.id) ? "text-green-500" : ""
                              }`}
                              onClick={() => handleRepost(post.id)}
                            >
                              <Repeat className="h-5 w-5" />
                              <span>{post.reposts + (repostedPosts.includes(post.id) ? 1 : 0)}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                              <Share2 className="h-5 w-5" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Sidebar */}
                  <div className="w-96 flex-shrink-0 space-y-8">
                    {/* Trending Topics */}
                    <Card className="bg-card border border-border">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-display text-foreground">Trending Topics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-sm text-foreground">#Bitcoin</p>
                            <p className="text-xs text-muted-foreground">2.3K posts</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-600">+15.2%</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-sm text-foreground">#Options</p>
                            <p className="text-xs text-muted-foreground">1.8K posts</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-600">+8.7%</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-sm text-foreground">#Forex</p>
                            <p className="text-xs text-muted-foreground">1.2K posts</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-red-600">-2.1%</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-sm text-foreground">#DayTrading</p>
                            <p className="text-xs text-muted-foreground">956 posts</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-600">+12.4%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Contributors */}
                    <Card className="bg-card border border-border">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-display text-foreground">Top Contributors</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-sm font-bold text-primary-foreground">S</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground">Sarah Johnson</p>
                            <p className="text-xs text-muted-foreground">@sarahtrader</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">1.2K posts</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-sm font-bold text-secondary-foreground">M</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground">Michael Chen</p>
                            <p className="text-xs text-muted-foreground">@miketrading</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">876 posts</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                            <span className="text-sm font-bold text-accent-foreground">A</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground">Alex Rodriguez</p>
                            <p className="text-xs text-muted-foreground">@cryptoalex</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">2.1K posts</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-muted-foreground flex items-center justify-center">
                            <span className="text-sm font-bold text-muted">E</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground">Emma Wilson</p>
                            <p className="text-xs text-muted-foreground">@emmawilson</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">1.5K posts</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                </TabsContent>

                <TabsContent value="live" className="p-8">
                  <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="font-display font-semibold text-2xl">Live Streams</h2>
                      <Button className="bg-red-600 hover:bg-red-700 gap-2">
                        <Radio className="h-4 w-4" />
                        Start Streaming
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {liveStreams.map((stream) => (
                        <Card
                          key={stream.id}
                          className="border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200"
                        >
                          <CardContent className="p-0">
                            <div className="relative">
                              <div className="w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                                <img
                                  src={stream.thumbnail || "/placeholder.svg"}
                                  alt={stream.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                <Radio className="h-3 w-3" />
                                LIVE
                              </div>
                              <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {stream.viewers.toLocaleString()}
                              </div>
                              <Button
                                size="icon"
                                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/50 hover:bg-black/70"
                                onClick={() => handleWatchStream(stream.id)}
                              >
                                <Play className="h-8 w-8 text-white" />
                              </Button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{stream.title}</h3>
                              <div className="flex items-center justify-between">
                                <div
                                  className="flex items-center gap-3 cursor-pointer hover:underline"
                                  onClick={() => handleProfileClick(stream.username)}
                                >
                                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                  <span className="text-gray-700 font-medium">{stream.streamer}</span>
                                </div>
                                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{stream.category}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rooms" className="p-8">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="font-display font-semibold text-2xl">Trade Rooms</h2>
                      <Dialog open={showCreateRoom} onOpenChange={setShowCreateRoom}>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Room
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-2xl px-2 py-4 sm:px-6 sm:py-6">
                          <DialogHeader>
                            <DialogTitle className="font-display text-lg sm:text-xl">Create Trade Room</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 sm:space-y-4">
                            <Input
                              className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                              placeholder="Room name..."
                              value={newRoomName}
                              onChange={(e) => setNewRoomName(e.target.value)}
                            />
                            <Input
                              className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                              placeholder="Room description..."
                              value={newRoomDescription}
                              onChange={(e) => setNewRoomDescription(e.target.value)}
                            />
                            <Button onClick={handleCreateRoom} className="w-full text-xs sm:text-sm py-2 sm:py-3">
                              Create Room
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tradeRooms.map((room) => (
                        <Card
                          key={room.id}
                          className="border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200"
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <CardTitle className="text-xl">{room.name}</CardTitle>
                                  {room.isPrivate ? (
                                    <div className="w-3 h-3 rounded-full bg-orange-500" title="Private Room"></div>
                                  ) : (
                                    <Globe className="h-4 w-4 text-green-500" aria-label="Public Room" />
                                  )}
                                </div>
                                <p className="text-gray-600 mb-4">{room.description}</p>
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                  <span className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {room.members.toLocaleString()} members
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-green-500" aria-label="Active" />
                                    {room.active} active
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-600">
                                <span className="bg-gray-100 px-2 py-1 rounded">{room.category}</span>
                              </div>
                              <Button
                                onClick={() => handleJoinRoom(room.id)}
                                variant={room.isPrivate ? "outline" : "default"}
                              >
                                {room.isPrivate ? "Request Access" : "Join Room"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
