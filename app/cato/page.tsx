"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Calendar,
  Brain,
  BookOpen,
  Sparkles,
  Smile,
  Frown,
  Meh,
  PenLine,
  ChevronRight,
} from "lucide-react"
import { formatDate } from "@/lib/utils/date-utils"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function CatoPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content: "Hello! I'm Cato, your trading and investing companion. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [journalEntry, setJournalEntry] = useState("")
  const [journalEntries, setJournalEntries] = useState<any[]>([])
  const [journalStreak, setJournalStreak] = useState(5)
  const [isRecording, setIsRecording] = useState(false)
  const [mood, setMood] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
        timestamp: new Date(),
      },
    ])

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("market") || input.toLowerCase().includes("stock")) {
        response =
          "Based on current market conditions, tech stocks are showing strength while energy sectors are facing headwinds. Remember that market timing is difficult - focus on your long-term strategy and risk management."
      } else if (input.toLowerCase().includes("strategy") || input.toLowerCase().includes("plan")) {
        response =
          "A solid trading strategy includes clear entry/exit criteria, position sizing rules, and risk management. What specific aspect of your strategy would you like to discuss?"
      } else if (input.toLowerCase().includes("stress") || input.toLowerCase().includes("anxiety")) {
        response =
          "Trading can be emotionally challenging. Consider implementing a mindfulness practice before trading sessions, and remember that protecting your mental capital is as important as protecting your financial capital."
      } else {
        response =
          "That's an interesting point. As your trading companion, I'm here to provide guidance, market insights, and psychological support. Would you like to explore this topic further?"
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ])
    }, 1000)

    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate speech recognition
      setTimeout(() => {
        setInput("I'm feeling uncertain about my trading strategy after today's market volatility.")
        setIsRecording(false)
      }, 3000)
    }
  }

  const saveJournalEntry = () => {
    if (!journalEntry.trim()) return

    // Detect mood based on content
    let detectedMood = "neutral"
    if (
      journalEntry.toLowerCase().includes("happy") ||
      journalEntry.toLowerCase().includes("profit") ||
      journalEntry.toLowerCase().includes("success")
    ) {
      detectedMood = "positive"
    } else if (
      journalEntry.toLowerCase().includes("frustrated") ||
      journalEntry.toLowerCase().includes("loss") ||
      journalEntry.toLowerCase().includes("mistake")
    ) {
      detectedMood = "negative"
    }

    const newEntry = {
      id: Date.now(),
      content: journalEntry,
      date: new Date(),
      mood: mood || detectedMood,
    }

    setJournalEntries([newEntry, ...journalEntries])
    setJournalEntry("")
    setMood(null)
    setJournalStreak((prev) => prev + 1)
  }

  return (
    <div className="px-4 py-4">
      <Tabs defaultValue="chat" onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-4">
          <TabsList>
            <TabsTrigger value="chat" className="px-6">
              <Bot className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="journal" className="px-6">
              <BookOpen className="h-4 w-4 mr-2" />
              Journal
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="m-0">
          <div className="mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    Mind Mirror
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70%]">
                <SheetHeader>
                  <SheetTitle>Mind Mirror</SheetTitle>
                  <SheetDescription>1:1 coaching for realistic expectations and strategies</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="h-4 w-4 mr-2" />
                    Trading Psychology
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Strategy Review
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Habit Building
                  </Button>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mt-6">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Cato is an AI assistant designed to provide guidance and support. You are
                      the hero of your trading journey, and all final decisions are yours.
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Card className="h-[calc(100vh-220px)]">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-base font-display">Chat with Cato</CardTitle>
              <CardDescription className="text-xs">Your AI trading companion</CardDescription>
            </CardHeader>
            <CardContent className="p-3 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[calc(100vh-320px)]">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === "assistant" ? "bg-gray-100 text-gray-800" : "bg-gray-900 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-[10px] mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex items-center gap-2 mt-auto">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleRecording}
                  className={isRecording ? "text-red-500" : ""}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-sm"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="m-0">
          <Card className="mb-4">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-base font-display">Smart Journal</CardTitle>
              <CardDescription className="text-xs">Document your trading thoughts and insights</CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">{formatDate(new Date())} • How are you feeling today?</p>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`p-1 h-7 w-7 ${mood === "positive" ? "bg-green-100" : ""}`}
                    onClick={() => setMood("positive")}
                  >
                    <Smile className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`p-1 h-7 w-7 ${mood === "neutral" ? "bg-blue-100" : ""}`}
                    onClick={() => setMood("neutral")}
                  >
                    <Meh className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`p-1 h-7 w-7 ${mood === "negative" ? "bg-red-100" : ""}`}
                    onClick={() => setMood("negative")}
                  >
                    <Frown className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="Write your trading journal entry here..."
                className="min-h-[120px] text-sm"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
              />
              <div className="flex justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleRecording}
                    className={`h-8 w-8 ${isRecording ? "text-red-500" : ""}`}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <p className="text-xs text-gray-500">{isRecording ? "Recording..." : "Record"}</p>
                </div>
                <Button size="sm" onClick={saveJournalEntry}>
                  <PenLine className="h-4 w-4 mr-1" />
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="p-3 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-display">Journal Streak</CardTitle>
                <div className="text-2xl font-bold font-display">{journalStreak}</div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 mb-2">days in a row</p>
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div
                    className="bg-gray-900 h-2 rounded-full"
                    style={{ width: `${(journalStreak / 7) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{7 - journalStreak} more days until next milestone</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sm px-1">Recent Entries</h3>
            {journalEntries.length > 0 ? (
              journalEntries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-gray-500">{formatDate(new Date(entry.date))}</p>
                      <div>
                        {entry.mood === "positive" && <Smile className="h-4 w-4 text-green-600" />}
                        {entry.mood === "neutral" && <Meh className="h-4 w-4 text-blue-600" />}
                        {entry.mood === "negative" && <Frown className="h-4 w-4 text-red-600" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-800">{entry.content}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-6">
                <BookOpen className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No journal entries yet</p>
                <p className="text-xs text-gray-400">Start journaling to track your trading journey</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
