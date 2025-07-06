"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Bot,
  Send,
  Brain,
  Mic,
  Settings,
  Copy,
  RotateCcw,
  Edit3,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Plus,
  MessageSquare,
  Zap,
  Crown,
  History,
} from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
  actions?: boolean
}

export default function CatoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm Cato, your AI trading companion. I can help you analyze markets, develop strategies, and improve your trading psychology. What would you like to explore today?",
      timestamp: new Date(),
      actions: true,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeMode, setActiveMode] = useState("chat")
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatHistory = [
    {
      id: 1,
      title: "Trading Psychology Session",
      date: "Today",
      preview: "Let's discuss your FOMO issues...",
      icon: Brain,
      messages: 12,
    },
    {
      id: 2,
      title: "Risk Management Review",
      date: "Yesterday",
      preview: "Your position sizing needs work...",
      icon: MessageSquare,
      messages: 8,
    },
    {
      id: 3,
      title: "Market Analysis",
      date: "2 days ago",
      preview: "Current market conditions suggest...",
      icon: Bot,
      messages: 15,
    },
    {
      id: 4,
      title: "Options Strategy Discussion",
      date: "3 days ago",
      preview: "Iron condor setup for AAPL...",
      icon: Zap,
      messages: 6,
    },
    {
      id: 5,
      title: "Crypto Market Outlook",
      date: "1 week ago",
      preview: "Bitcoin technical analysis...",
      icon: Bot,
      messages: 10,
    },
  ]

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      let response =
        "That's an excellent question! Based on current market conditions and your trading profile, I'd recommend focusing on risk management first. Here's my analysis..."

      if (activeMode === "mindmirror") {
        response =
          "🧠 Mind Mirror Analysis: I notice patterns in your trading behavior that suggest emotional decision-making during volatile periods. Let's work on developing more systematic approaches to entry and exit points."
      } else if (activeMode === "voice") {
        response =
          "🎤 Voice mode activated. I'm listening and ready to discuss your trading strategies. Feel free to speak naturally about your market concerns."
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
        timestamp: new Date(),
        actions: true,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content:
          "Hello! I'm Cato, your AI trading companion. I can help you analyze markets, develop strategies, and improve your trading psychology. What would you like to explore today?",
        timestamp: new Date(),
        actions: true,
      },
    ])
  }

  const modes = [
    { id: "chat", label: "Chat", icon: Bot },
    { id: "mindmirror", label: "Mind Mirror", icon: Brain },
    { id: "voice", label: "Voice", icon: Mic },
  ]

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Layout */}
      <div className="block lg:hidden h-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-gray-900">Cato AI</h1>
                <p className="text-xs text-gray-600">Trading Assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowHistory(!showHistory)} className="rounded-xl">
              <History className="h-5 w-5" />
            </Button>
          </div>

          {/* Mode Selector */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {modes.map((mode) => {
                const IconComponent = mode.icon
                return (
                  <button
                    key={mode.id}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      activeMode === mode.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                    }`}
                    onClick={() => setActiveMode(mode.id)}
                  >
                    <IconComponent className="h-4 w-4" />
                    {mode.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Chat or History */}
          {showHistory ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg">Chat History</h2>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>
              {chatHistory.map((chat) => {
                const IconComponent = chat.icon
                return (
                  <Card key={chat.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gray-900 truncate">{chat.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {chat.date} • {chat.messages} messages
                          </p>
                          <p className="text-xs text-gray-600 mt-2 line-clamp-2">{chat.preview}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 ${
                        message.role === "assistant"
                          ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200"
                          : "bg-white border border-gray-200 shadow-sm"
                      }`}
                    >
                      <p className="leading-relaxed text-sm text-gray-800">{message.content}</p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {message.actions && message.role === "assistant" && (
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="w-6 h-6">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-6 h-6">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-4 max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <span className="text-sm text-gray-600 ml-2">Cato is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Input
                      placeholder={`Message Cato${activeMode === "voice" ? " (Voice mode)" : ""}...`}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="pr-12 h-10 rounded-xl border-gray-200"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1 h-8 w-8 rounded-lg"
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop 3-Column Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Sidebar - Navigation & Controls */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-gray-900">Cato AI</h1>
                <p className="text-sm text-gray-600">Your Trading Assistant</p>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="space-y-2">
              {modes.map((mode) => {
                const IconComponent = mode.icon
                return (
                  <button
                    key={mode.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                      activeMode === mode.id
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveMode(mode.id)}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{mode.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Chat Controls */}
          <div className="p-6 space-y-4">
            <Button
              onClick={handleClearChat}
              variant="outline"
              className="w-full justify-start gap-3 h-12 bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
              Clear Chat
            </Button>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 text-sm">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm h-10">
                  <Brain className="h-4 w-4 mr-3" />
                  Analyze Trading Psychology
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm h-10">
                  <Zap className="h-4 w-4 mr-3" />
                  Market Analysis
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm h-10">
                  <MessageSquare className="h-4 w-4 mr-3" />
                  Strategy Review
                </Button>
              </div>
            </div>
          </div>

          {/* Floating New Chat Button */}
          <div className="mt-auto p-6">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-3 h-12">
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </div>
        </div>

        {/* Center - Main Chat Interface */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-lg text-gray-900">
                  {activeMode === "chat"
                    ? "Chat with Cato"
                    : activeMode === "mindmirror"
                      ? "Mind Mirror Session"
                      : "Voice Conversation"}
                </h2>
                <p className="text-sm text-gray-600">
                  {activeMode === "chat"
                    ? "Ask me anything about trading"
                    : activeMode === "mindmirror"
                      ? "Analyzing your trading psychology"
                      : "Voice-enabled trading discussion"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div className="max-w-[70%]">
                  <div
                    className={`rounded-2xl p-6 ${
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200"
                        : "bg-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    <p className="leading-relaxed text-gray-800">{message.content}</p>
                    <p className="text-xs text-gray-500 mt-3">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* AI Message Actions */}
                  {message.actions && message.role === "assistant" && (
                    <div className="flex items-center gap-2 mt-3 ml-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <Copy className="h-3 w-3 mr-2" />
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <RotateCcw className="h-3 w-3 mr-2" />
                        Regenerate
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <Edit3 className="h-3 w-3 mr-2" />
                        Add to Editor
                      </Button>
                      <div className="flex items-center gap-1 ml-2">
                        <Button variant="ghost" size="icon" className="w-7 h-7">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-7 h-7">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-6 max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="text-sm text-gray-600 ml-2">Cato is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-8 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder={`Message Cato${activeMode === "voice" ? " (Voice mode)" : ""}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pr-12 h-12 rounded-xl border-gray-200 bg-white shadow-sm"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1 h-10 w-10 rounded-lg"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Chat History */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* History Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-gray-900">Chat History</h2>
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                New
              </Button>
            </div>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {chatHistory.map((chat) => {
              const IconComponent = chat.icon
              return (
                <Card
                  key={chat.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-gray-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-900 truncate">{chat.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {chat.date} • {chat.messages} messages
                        </p>
                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">{chat.preview}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Pricing Card */}
          <div className="p-6 border-t border-gray-200">
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <Crown className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-display font-semibold text-emerald-900 mb-2">Upgrade to Pro</h3>
                  <p className="text-xs text-emerald-700 mb-4">
                    Unlock advanced AI features, unlimited chats, and priority support
                  </p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Upgrade Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
