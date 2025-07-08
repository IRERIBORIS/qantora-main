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
        "I'm Cato, your smart trading sidekick. What should we tackle—charts, strategy, or mindset?",
      timestamp: new Date(),
      actions: true,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mindMirrorEnabled, setMindMirrorEnabled] = useState(false)

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
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: "This is a simulated AI response. How can I help you further?",
        timestamp: new Date(),
        actions: true,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // --- Layout ---
  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-end px-4 lg:px-8 py-4 border-b border-border bg-card/80 backdrop-blur-md flex-shrink-0">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Settings className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground" />
        </Button>
      </header>
      {/* Main Area: 3 columns on desktop, stacked on mobile */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-0 w-full">
        {/* Info Block (left sidebar on desktop, top on mobile) */}
        <aside className="w-full lg:w-72 flex flex-row lg:flex-col items-center lg:items-start justify-center lg:justify-start gap-2 px-4 lg:px-8 py-4 lg:py-8 bg-background flex-shrink-0 border-l-0 lg:border-l lg:border-border">
          <h1 className="font-display font-semibold text-xl lg:text-2xl text-foreground">Cato AI</h1>
          <p className="text-sm lg:text-base text-muted-foreground ml-0 lg:ml-1 mt-2 font-normal">Your Trading Assistant</p>
        </aside>
        {/* Chat Card (center, fills available space) */}
        <section className="flex-1 flex flex-col justify-center items-center min-h-0 py-4 lg:py-8">
          <div className="w-full max-w-3xl h-full flex flex-col bg-card/95 border border-border rounded-2xl shadow-2xl mx-2 lg:mx-8 p-0 mb-4 lg:mb-8">
            {/* Messages (scrollable) */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-4 shadow font-display text-base border border-border ${
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-accent/40 to-card"
                        : "bg-background"
                    }`}
                  >
                    <p className="leading-relaxed text-foreground">{message.content}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-br from-accent/40 to-card border border-border rounded-2xl p-4 max-w-[90%] shadow">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="text-sm text-muted-foreground ml-2">Cato is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input (fixed at bottom of card, with bottom padding for navbar) */}
            <div className="bg-background border-t border-border px-6 py-4 flex items-center gap-2 shadow-lg shrink-0 rounded-b-2xl pb-safe pb-24 lg:pb-10">
              <Input
                placeholder="Message Cato..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 pr-8 h-10 lg:h-12 rounded-xl border border-border font-display text-base bg-card text-foreground focus:ring-2 focus:ring-primary/30"
              />
              <Button
                type="button"
                variant={mindMirrorEnabled ? "default" : "outline"}
                className={`ml-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mindMirrorEnabled ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground border border-border"}`}
                aria-pressed={mindMirrorEnabled}
                aria-label="Toggle Mind Mirror"
                onClick={() => setMindMirrorEnabled((prev) => !prev)}
              >
                Mind Mirror
              </Button>
              <Button
                size="icon"
                variant="default"
                className="rounded-lg"
                aria-label="Send message"
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-5 w-5 text-primary-foreground" />
              </Button>
            </div>
          </div>
        </section>
        {/* History Panel (desktop only, right column) */}
        <aside className="hidden lg:flex w-[420px] max-w-[32vw] flex-shrink-0 flex-col items-start justify-start bg-transparent p-6 min-h-0">
          <div className="w-full rounded-2xl bg-card/95 border border-border shadow-2xl p-6 min-h-[70vh]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2 text-foreground">
                <History className="h-5 w-5 text-primary" />
                Chat History
              </h2>
              <Button size="sm" variant="default" className="rounded-lg font-medium" aria-label="Start new chat" onClick={() => setMessages([{ id: 1, role: 'assistant', content: 'I\'m Cato, your smart trading sidekick. What should we tackle—charts, strategy, or mindset?', timestamp: new Date(), actions: true }])}>
                + New Chat
              </Button>
            </div>
            {/* History list intentionally left empty for now */}
          </div>
        </aside>
      </main>
    </div>
  )
}
