"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Send,
  Users,
  Settings,
  Crown,
  Star,
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  Pin,
} from "lucide-react"

interface Message {
  id: number
  user: string
  username: string
  content: string
  timestamp: Date
  isPinned?: boolean
  likes?: number
  isLiked?: boolean
  isModerator?: boolean
  isVerified?: boolean
}

export default function TradeRoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Sarah Johnson",
      username: "@sarahtrader",
      content:
        "Welcome everyone! Let's discuss today's market movements. I'm seeing some interesting patterns in tech stocks.",
      timestamp: new Date(Date.now() - 300000),
      isPinned: true,
      likes: 12,
      isLiked: false,
      isModerator: true,
      isVerified: true,
    },
    {
      id: 2,
      user: "Mike Chen",
      username: "@miketrading",
      content: "AAPL looking strong above $180 support. Anyone else watching this level?",
      timestamp: new Date(Date.now() - 240000),
      likes: 8,
      isLiked: true,
      isModerator: false,
      isVerified: false,
    },
    {
      id: 3,
      user: "Alex Rodriguez",
      username: "@cryptoalex",
      content: "Bitcoin holding well above $65k. Bullish momentum continuing into the weekend.",
      timestamp: new Date(Date.now() - 180000),
      likes: 15,
      isLiked: false,
      isModerator: false,
      isVerified: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [activeUsers] = useState(234)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const roomInfo = {
    name: "Crypto Bulls",
    description: "Discussing cryptocurrency trends and opportunities",
    members: 2456,
    category: "Cryptocurrency",
    moderators: ["@sarahtrader", "@cryptoking"],
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      user: "You",
      username: "@you",
      content: newMessage,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      isModerator: false,
      isVerified: false,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleLikeMessage = (messageId: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              isLiked: !msg.isLiked,
              likes: (msg.likes || 0) + (msg.isLiked ? -1 : 1),
            }
          : msg,
      ),
    )
  }

  const handleProfileClick = (username: string) => {
    const cleanUsername = username.replace("@", "")
    router.push(`/community/profile/${cleanUsername}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="block lg:hidden h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-lg">{roomInfo.name}</h1>
              <p className="text-xs text-gray-500">{activeUsers} active</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Users className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${message.isPinned ? "bg-blue-50 border border-blue-200 rounded-lg p-3" : ""}`}
            >
              {message.isPinned && (
                <div className="flex items-center gap-2 mb-2 text-blue-600 text-xs">
                  <Pin className="h-3 w-3" />
                  <span>Pinned Message</span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg bg-gray-200 flex-shrink-0 cursor-pointer"
                  onClick={() => handleProfileClick(message.username)}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-medium text-sm cursor-pointer hover:underline"
                      onClick={() => handleProfileClick(message.username)}
                    >
                      {message.user}
                    </span>
                    {message.isModerator && <Crown className="h-3 w-3 text-yellow-500" />}
                    {message.isVerified && <Star className="h-3 w-3 text-blue-500" />}
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 mb-2">{message.content}</p>
                  <div className="flex items-center gap-4">
                    <button
                      className={`flex items-center gap-1 text-xs ${message.isLiked ? "text-red-500" : "text-gray-500"}`}
                      onClick={() => handleLikeMessage(message.id)}
                    >
                      <Heart className={`h-3 w-3 ${message.isLiked ? "fill-current" : ""}`} />
                      {message.likes}
                    </button>
                    <button className="text-xs text-gray-500">
                      <MessageSquare className="h-3 w-3" />
                    </button>
                    <button className="text-xs text-gray-500">
                      <Share2 className="h-3 w-3" />
                    </button>
                    <button className="text-xs text-gray-500">
                      <MoreHorizontal className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block h-screen">
        <div className="flex h-full">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <h1 className="font-display font-bold text-xl">{roomInfo.name}</h1>
                    <p className="text-sm text-gray-600">{roomInfo.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{activeUsers}</span> active
                  </div>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Members
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${message.isPinned ? "bg-blue-50 border border-blue-200 rounded-xl p-4" : ""}`}
                >
                  {message.isPinned && (
                    <div className="flex items-center gap-2 mb-3 text-blue-600 text-sm">
                      <Pin className="h-4 w-4" />
                      <span className="font-medium">Pinned Message</span>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl bg-gray-200 flex-shrink-0 cursor-pointer hover:opacity-80"
                      onClick={() => handleProfileClick(message.username)}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="font-semibold text-gray-900 cursor-pointer hover:underline"
                          onClick={() => handleProfileClick(message.username)}
                        >
                          {message.user}
                        </span>
                        {message.isModerator && <Crown className="h-4 w-4 text-yellow-500" />}
                        {message.isVerified && <Star className="h-4 w-4 text-blue-500" />}
                        <span
                          className="text-gray-500 cursor-pointer hover:underline"
                          onClick={() => handleProfileClick(message.username)}
                        >
                          {message.username}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-gray-800 mb-3 leading-relaxed">{message.content}</p>
                      <div className="flex items-center gap-6">
                        <button
                          className={`flex items-center gap-2 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors ${
                            message.isLiked ? "text-red-500" : "text-gray-500"
                          }`}
                          onClick={() => handleLikeMessage(message.id)}
                        >
                          <Heart className={`h-4 w-4 ${message.isLiked ? "fill-current" : ""}`} />
                          <span>{message.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors text-gray-500">
                          <MessageSquare className="h-4 w-4" />
                          <span>Reply</span>
                        </button>
                        <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors text-gray-500">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                        <button className="hover:bg-gray-100 p-2 rounded-lg transition-colors text-gray-500">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 h-12"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="h-12 px-6">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Room Info */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="font-display font-semibold text-lg mb-4">Room Info</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium">{roomInfo.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Members</span>
                  <p className="font-medium">{roomInfo.members.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Moderators</span>
                  <div className="space-y-1">
                    {roomInfo.moderators.map((mod) => (
                      <p
                        key={mod}
                        className="text-sm text-blue-600 cursor-pointer hover:underline"
                        onClick={() => handleProfileClick(mod)}
                      >
                        {mod}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="font-medium mb-4">Active Members ({activeUsers})</h3>
              <div className="space-y-3">
                {messages.slice(0, 10).map((message) => (
                  <div
                    key={message.id}
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                    onClick={() => handleProfileClick(message.username)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-200 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{message.user}</span>
                        {message.isModerator && <Crown className="h-3 w-3 text-yellow-500" />}
                        {message.isVerified && <Star className="h-3 w-3 text-blue-500" />}
                      </div>
                      <p className="text-xs text-gray-500">{message.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
