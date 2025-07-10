"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send, Users, Settings, Heart, MessageSquare, Share2, MoreHorizontal, Pin, Crown, Star, Menu, X, ChevronUp, ChevronDown } from "lucide-react"

export default function TradeRoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "CryptoWhale",
      username: "@crypto_whale",
      content: "Bitcoin looking strong today! Anyone else seeing the bullish pattern on the 4H chart?",
      timestamp: new Date(Date.now() - 300000),
      likes: 12,
      isLiked: false,
      isModerator: true,
      isVerified: true,
      isPinned: false
    },
    {
      id: 2,
      user: "TradingPro",
      username: "@trading_pro",
      content: "ETH/USD breaking out of the descending triangle. Target: $3,800",
      timestamp: new Date(Date.now() - 240000),
      likes: 8,
      isLiked: true,
      isModerator: false,
      isVerified: true,
      isPinned: false
    },
    {
      id: 3,
      user: "MarketGuru",
      username: "@market_guru",
      content: "Remember to always use proper risk management. Never risk more than 1-2% per trade.",
      timestamp: new Date(Date.now() - 180000),
      likes: 15,
      isLiked: false,
      isModerator: true,
      isVerified: true,
      isPinned: true
    },
    {
      id: 4,
      user: "CryptoNewbie",
      username: "@crypto_newbie",
      content: "New to trading here. Any tips for a beginner?",
      timestamp: new Date(Date.now() - 120000),
      likes: 5,
      isLiked: false,
      isModerator: false,
      isVerified: false,
      isPinned: false
    },
    {
      id: 5,
      user: "BTC_Holder",
      username: "@btc_holder",
      content: "HODL strong! Bitcoin will reach new ATHs this year.",
      timestamp: new Date(Date.now() - 60000),
      likes: 20,
      isLiked: false,
      isModerator: false,
      isVerified: true,
      isPinned: false
    }
  ])
  const [showSidebar, setShowSidebar] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const activeMembersListRef = useRef<HTMLDivElement>(null)

  const roomInfo = {
    name: "Crypto Bulls",
    description: "The ultimate crypto trading community",
    category: "Cryptocurrency",
    members: 2847,
    moderators: ["@crypto_whale", "@btc_trader", "@eth_master"]
  }

  const activeUsers = 127

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollActiveMembers = (direction: 'up' | 'down') => {
    const node = activeMembersListRef.current;
    if (!node) return;
    if (direction === 'up') node.scrollTo({ top: 0, behavior: 'smooth' });
    else node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: "You",
        username: "@you",
        content: newMessage,
        timestamp: new Date(),
        likes: 0,
        isLiked: false,
        isModerator: false,
        isVerified: false,
        isPinned: false
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleLikeMessage = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1, isLiked: !msg.isLiked }
        : msg
    ))
  }

  const handleProfileClick = (username: string) => {
    console.log(`Navigating to profile: ${username}`)
  }

  // Separate pinned and regular messages
  const pinnedMessages = messages.filter(msg => msg.isPinned)
  const regularMessages = messages.filter(msg => !msg.isPinned)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Trade Room Header - Sticky below global header */}
      <div className="sticky top-16 z-40 bg-card border-b border-border px-4 lg:px-6 flex items-center h-14">
        <div className="flex items-center gap-3 flex-1">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display font-semibold lg:font-bold text-lg lg:text-xl text-foreground">{roomInfo.name}</h1>
            <p className="text-xs lg:text-sm text-muted-foreground">
              {activeUsers} active • {roomInfo.members.toLocaleString()} members
            </p>
          </div>
        </div>
        {/* Action buttons (right side) */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Button variant="ghost" size="icon">
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          {/* Info Hamburger: visible on mobile/iPad, far right */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowSidebar(!showSidebar)}
            className="font-display text-xs px-3 py-1.5 lg:hidden ml-2"
          >
            {showSidebar ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          {/* Info Hamburger: visible on desktop, far right */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowSidebar(!showSidebar)}
            className="font-display text-xs px-3 py-1.5 hidden lg:inline-flex ml-2"
          >
            {showSidebar ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {/* Main Content Area (scrollable) */}
      <div className={`flex-1 flex w-full overflow-x-hidden min-h-0${showSidebar ? ' flex-row-reverse' : ''}`}> {/* Sidebar/cards always on right */}
        {/* Main Chat Area */}
        <div className={`flex flex-col flex-1 w-full min-h-0 ${showSidebar ? 'hidden' : 'flex'}`}> {/* Ensure input bar is last child */}
          {/* Messages - Scrollable Area */}
          <div className="flex-1 overflow-y-auto min-h-0 px-4 lg:px-6 space-y-4 always-show-scrollbar pb-20 lg:pb-24">
            {/* ... pinned and regular messages ... */}
            {/* Pinned Messages at Top */}
            {pinnedMessages.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400 text-sm">
                  <Pin className="h-4 w-4" />
                  <span className="font-medium">Pinned Messages</span>
                </div>
                <div className="space-y-3">
                  {pinnedMessages.map((message) => (
                    <div key={message.id} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg bg-muted flex-shrink-0 cursor-pointer hover:opacity-80"
                          onClick={() => handleProfileClick(message.username)}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="font-medium text-sm cursor-pointer hover:underline text-foreground"
                              onClick={() => handleProfileClick(message.username)}
                            >
                              {message.user}
                            </span>
                            {message.isModerator && <Crown className="h-3 w-3 text-yellow-500" />}
                            {message.isVerified && <Star className="h-3 w-3 text-blue-500" />}
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mb-2 leading-relaxed">{message.content}</p>
                          <div className="flex items-center gap-4">
                            <button
                              className={`flex items-center gap-1 text-xs ${message.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                              onClick={() => handleLikeMessage(message.id)}
                            >
                              <Heart className={`h-3 w-3 ${message.isLiked ? "fill-current" : ""}`} />
                              {message.likes}
                            </button>
                            <button className="text-xs text-muted-foreground">
                              <MessageSquare className="h-3 w-3" />
                            </button>
                            <button className="text-xs text-muted-foreground">
                              <Share2 className="h-3 w-3" />
                            </button>
                            <button className="text-xs text-muted-foreground">
                              <MoreHorizontal className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Messages */}
            {regularMessages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg bg-muted flex-shrink-0 cursor-pointer hover:opacity-80"
                  onClick={() => handleProfileClick(message.username)}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-medium text-sm cursor-pointer hover:underline text-foreground"
                      onClick={() => handleProfileClick(message.username)}
                    >
                      {message.user}
                    </span>
                    {message.isModerator && <Crown className="h-3 w-3 text-yellow-500" />}
                    {message.isVerified && <Star className="h-3 w-3 text-blue-500" />}
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-2 leading-relaxed">{message.content}</p>
                  <div className="flex items-center gap-4">
                    <button
                      className={`flex items-center gap-1 text-xs ${message.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                      onClick={() => handleLikeMessage(message.id)}
                    >
                      <Heart className={`h-3 w-3 ${message.isLiked ? "fill-current" : ""}`} />
                      {message.likes}
                    </button>
                    <button className="text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3" />
                    </button>
                    <button className="text-xs text-muted-foreground">
                      <Share2 className="h-3 w-3" />
                    </button>
                    <button className="text-xs text-muted-foreground">
                      <MoreHorizontal className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Bar - Always visible above navbar */}
          <div className="bg-card border-t border-border p-4 w-full flex-shrink-0 h-20 flex items-center">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 h-12 text-base rounded-md border-2 border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  caretColor: 'var(--foreground)'
                }}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                className="h-12 px-4 font-display"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {/* Sidebar (if shown) */}
        {showSidebar && (
          <div className="w-80 bg-card border-l border-border flex flex-col flex-shrink-0 h-full">
            <div className="p-4 border-b border-border flex-shrink-0">
              <h2 className="font-display font-semibold text-lg mb-4 text-foreground">Room Info</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Category</span>
                  <p className="font-medium text-foreground">{roomInfo.category}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Members</span>
                  <p className="font-medium text-foreground">{roomInfo.members.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Moderators</span>
                  <div className="space-y-1">
                    {roomInfo.moderators.map((mod) => (
                      <p
                        key={mod}
                        className="text-sm text-primary cursor-pointer hover:underline"
                        onClick={() => handleProfileClick(mod)}
                      >
                        {mod}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop sidebar Active Members */}
            <div className="flex-1 overflow-y-auto p-6 min-h-0">
              <div className="flex flex-col gap-2 mb-4">
                <button type="button" aria-label="Scroll to top" onClick={() => scrollActiveMembers('up')} className="self-center"><ChevronUp className="h-5 w-5" /></button>
                <h3 className="font-medium text-foreground text-center">Active Members ({activeUsers})</h3>
              </div>
              <div ref={activeMembersListRef} className="space-y-3 max-h-48 overflow-y-auto">
                {messages.slice(0, 10).map((message) => (
                  <div
                    key={message.id}
                    className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors"
                    onClick={() => handleProfileClick(message.username)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate text-foreground">{message.user}</span>
                        {message.isModerator && <Crown className="h-3 w-3 text-yellow-500" />}
                        {message.isVerified && <Star className="h-3 w-3 text-blue-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{message.username}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <button type="button" aria-label="Scroll to bottom" onClick={() => scrollActiveMembers('down')} className="self-center"><ChevronDown className="h-5 w-5" /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
