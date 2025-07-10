"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FlexibleLayout } from "@/components/layout/flexible-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Calendar, TrendingUp, Target, DollarSign } from "lucide-react"
import { formatDate } from "@/lib/utils/date-utils"

export default function JournalPage() {
  const router = useRouter()
  const [newEntry, setNewEntry] = useState({
    content: "",
    instrument: "",
    entryPrice: "",
    exitPrice: "",
    riskReward: "",
    mood: "",
    outcome: "",
  })
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const entries = [
    {
      id: 1,
      date: new Date(),
      content:
        "Excellent AAPL breakout trade. Waited for confirmation at $2,300 resistance level. Entry was perfect at $2,305 with stop at $2,290. Target hit at $2,350 for a solid 3:1 R:R ratio.",
      instrument: "AAPL",
      entryPrice: "$2,305.00",
      exitPrice: "$2,350.00",
      riskReward: "3:1",
      mood: "positive",
      pnl: "+$1,250",
      outcome: "win",
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000),
      content:
        "TSLA trade didn't go as planned. Got stopped out due to aggressive position sizing. Need to work on risk management and patience.",
      instrument: "TSLA",
      entryPrice: "$875.00",
      exitPrice: "$860.00",
      riskReward: "2:1",
      mood: "neutral",
      pnl: "-$300",
      outcome: "loss",
    },
  ]

  const stats = {
    totalEntries: 47,
    thisWeek: 5,
    winRate: 68.5,
    avgRR: 2.3,
    totalPnL: 4125,
    bestTrade: 1250,
    streak: 12,
  }

  const handleSaveEntry = () => {
    if (newEntry.content.trim() && newEntry.instrument.trim()) {
      // Save entry logic here
      setNewEntry({
        content: "",
        instrument: "",
        entryPrice: "",
        exitPrice: "",
        riskReward: "",
        mood: "",
        outcome: "",
      })
      setSelectedMood(null)
    }
  }

  return (
    <FlexibleLayout fullScreen>
      {/* Mobile Layout */}
      <div className="block md:hidden page-enter page-enter-active">
        <div className="px-4 pt-4 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => router.back()} 
              className="rounded-lg h-9 w-9 back-btn btn-smooth"
            >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-display font-bold text-xl text-gray-900">Trading Journal</h1>
            <p className="text-gray-600 text-sm">Document your trading journey</p>
          </div>
        </div>

          {/* Progress Stats Cards - Horizontal Scrollable */}
          <div className="mb-6">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              <Card className="min-w-[140px] max-w-[160px] flex-shrink-0 card-hover">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <div className="text-xl font-bold text-gray-900">{stats.totalEntries}</div>
                  <div className="text-xs text-gray-600">Total Entries</div>
                </CardContent>
              </Card>
              <Card className="min-w-[140px] max-w-[160px] flex-shrink-0 card-hover">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto text-green-600 mb-2" />
                  <div className="text-xl font-bold text-green-600">{stats.winRate}%</div>
                  <div className="text-xs text-gray-600">Win Rate</div>
                </CardContent>
              </Card>
              <Card className="min-w-[140px] max-w-[160px] flex-shrink-0 card-hover">
                <CardContent className="p-4 text-center">
                  <Target className="h-6 w-6 mx-auto text-purple-600 mb-2" />
                  <div className="text-xl font-bold text-gray-900">{stats.avgRR}:1</div>
                  <div className="text-xs text-gray-600">Avg R:R</div>
                </CardContent>
              </Card>
              <Card className="min-w-[140px] max-w-[160px] flex-shrink-0 card-hover">
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <div className="text-xl font-bold text-green-600">${stats.totalPnL}</div>
                  <div className="text-xs text-gray-600">Total P&L</div>
                </CardContent>
              </Card>
            </div>
          </div>

        {/* Mobile content similar to before but with new entry form */}
        <div className="space-y-4">
          <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-display">New Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Instrument (e.g., AAPL)"
                  value={newEntry.instrument}
                  onChange={(e) => setNewEntry({ ...newEntry, instrument: e.target.value })}
                    className="text-sm"
                />
                <Select value={newEntry.mood} onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}>
                    <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">😊 Positive</SelectItem>
                    <SelectItem value="neutral">😐 Neutral</SelectItem>
                    <SelectItem value="negative">😞 Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

                <div className="grid grid-cols-3 gap-3">
                <Input
                  placeholder="Entry Price"
                  value={newEntry.entryPrice}
                  onChange={(e) => setNewEntry({ ...newEntry, entryPrice: e.target.value })}
                    className="text-sm"
                />
                <Input
                  placeholder="Exit Price"
                  value={newEntry.exitPrice}
                  onChange={(e) => setNewEntry({ ...newEntry, exitPrice: e.target.value })}
                    className="text-sm"
                />
                <Input
                  placeholder="R:R (e.g., 2:1)"
                  value={newEntry.riskReward}
                  onChange={(e) => setNewEntry({ ...newEntry, riskReward: e.target.value })}
                    className="text-sm"
                />
              </div>

              <Textarea
                placeholder="Describe your trade, thoughts, and lessons learned..."
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  className="min-h-[120px] text-sm"
              />

                <Button onClick={handleSaveEntry} className="w-full text-sm btn-smooth">
                <Plus className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </CardContent>
          </Card>

          {/* Entries list for mobile */}
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{entry.instrument}</span>
                    </div>
                    <span
                      className={`text-sm font-medium ${entry.outcome === "win" ? "text-green-600" : "text-red-600"}`}
                    >
                      {entry.pnl}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{entry.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Entry: {entry.entryPrice}</span>
                    <span>Exit: {entry.exitPrice}</span>
                    <span>R:R: {entry.riskReward}</span>
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
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-lg h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-3xl text-gray-900">Trading Journal</h1>
              <p className="text-gray-600 text-base">Document your trading journey</p>
            </div>
          </div>

          {/* Stats Overview for iPad - Horizontal Scrollable */}
          <div className="mb-8">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
              <Card className="min-w-[180px] max-w-[200px] flex-shrink-0">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <div className="text-xl font-bold text-gray-900">{stats.totalEntries}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </CardContent>
              </Card>
              <Card className="min-w-[180px] max-w-[200px] flex-shrink-0">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 mx-auto text-green-600 mb-2" />
                  <div className="text-xl font-bold text-green-600">{stats.winRate}%</div>
                  <div className="text-sm text-gray-600">Win Rate</div>
                </CardContent>
              </Card>
              <Card className="min-w-[180px] max-w-[200px] flex-shrink-0">
                <CardContent className="p-4 text-center">
                  <Target className="h-6 w-6 mx-auto text-purple-600 mb-2" />
                  <div className="text-xl font-bold text-gray-900">{stats.avgRR}:1</div>
                  <div className="text-sm text-gray-600">Avg R:R</div>
                </CardContent>
              </Card>
              <Card className="min-w-[180px] max-w-[200px] flex-shrink-0">
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <div className="text-xl font-bold text-green-600">${stats.totalPnL}</div>
                  <div className="text-sm text-gray-600">Total P&L</div>
                </CardContent>
              </Card>
              <Card className="min-w-[180px] max-w-[200px] flex-shrink-0">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-gray-900">{stats.thisWeek}</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </CardContent>
              </Card>
              <Card className="min-w-[180px] max-w-[200px] flex-shrink-0">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-green-600">${stats.bestTrade}</div>
                  <div className="text-sm text-gray-600">Best Trade</div>
                </CardContent>
              </Card>
              <Card className="min-w-[180px] max-w-[200px] flex-shrink-0">
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-orange-600">{stats.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Grid for iPad */}
          <div className="space-y-6">
            {/* New Entry Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-display">New Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <Input
                    placeholder="Instrument (e.g., AAPL)"
                    value={newEntry.instrument}
                    onChange={(e) => setNewEntry({ ...newEntry, instrument: e.target.value })}
                  />
                  <Select value={newEntry.mood} onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">😊 Positive</SelectItem>
                      <SelectItem value="neutral">😐 Neutral</SelectItem>
                      <SelectItem value="negative">😞 Negative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-5">
                  <Input
                    placeholder="Entry Price"
                    value={newEntry.entryPrice}
                    onChange={(e) => setNewEntry({ ...newEntry, entryPrice: e.target.value })}
                  />
                  <Input
                    placeholder="Exit Price"
                    value={newEntry.exitPrice}
                    onChange={(e) => setNewEntry({ ...newEntry, exitPrice: e.target.value })}
                  />
                  <Input
                    placeholder="R:R (e.g., 2:1)"
                    value={newEntry.riskReward}
                    onChange={(e) => setNewEntry({ ...newEntry, riskReward: e.target.value })}
                  />
                </div>

                <Textarea
                  placeholder="Describe your trade, thoughts, and lessons learned..."
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  className="min-h-[140px]"
                />

                <Button onClick={handleSaveEntry} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
              </CardContent>
            </Card>

            {/* Entries list for iPad */}
            <div className="space-y-6">
              {entries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-base text-gray-500">{formatDate(entry.date)}</span>
                        <span className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium">{entry.instrument}</span>
                      </div>
                      <span
                        className={`text-base font-medium ${entry.outcome === "win" ? "text-green-600" : "text-red-600"}`}
                      >
                        {entry.pnl}
                      </span>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed mb-4">{entry.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Entry: {entry.entryPrice}</span>
                      <span>Exit: {entry.exitPrice}</span>
                      <span>R:R: {entry.riskReward}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Full-Screen Layout */}
      <div className="hidden lg:block h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-3xl text-gray-900">Trading Journal</h1>
              <p className="text-gray-600">Document and analyze your trading performance</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalEntries}</div>
              <div className="text-xs text-gray-600">Total Entries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">{stats.winRate}%</div>
              <div className="text-xs text-gray-600">Win Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.avgRR}:1</div>
              <div className="text-xs text-gray-600">Avg R:R</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">${stats.totalPnL}</div>
              <div className="text-xs text-gray-600">Total P&L</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.thisWeek}</div>
              <div className="text-xs text-gray-600">This Week</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">${stats.bestTrade}</div>
              <div className="text-xs text-gray-600">Best Trade</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.streak}</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-[calc(100vh-20rem)]">
          {/* New Entry Form */}
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl font-display">New Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{formatDate(new Date())}</span>
                <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Instrument"
                  value={newEntry.instrument}
                  onChange={(e) => setNewEntry({ ...newEntry, instrument: e.target.value })}
                />
                <Select value={newEntry.mood} onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">😊 Positive</SelectItem>
                    <SelectItem value="neutral">😐 Neutral</SelectItem>
                    <SelectItem value="negative">😞 Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="Entry Price"
                  value={newEntry.entryPrice}
                  onChange={(e) => setNewEntry({ ...newEntry, entryPrice: e.target.value })}
                />
                <Input
                  placeholder="Exit Price"
                  value={newEntry.exitPrice}
                  onChange={(e) => setNewEntry({ ...newEntry, exitPrice: e.target.value })}
                />
                <Input
                  placeholder="R:R Ratio"
                  value={newEntry.riskReward}
                  onChange={(e) => setNewEntry({ ...newEntry, riskReward: e.target.value })}
                />
              </div>

              <Select value={newEntry.outcome} onValueChange={(value) => setNewEntry({ ...newEntry, outcome: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Trade Outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="win">🎯 Win</SelectItem>
                  <SelectItem value="loss">❌ Loss</SelectItem>
                  <SelectItem value="breakeven">➖ Break Even</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Describe your trade setup, execution, and lessons learned..."
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                className="min-h-[200px] resize-none"
              />

              <Button onClick={handleSaveEntry} className="w-full" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </CardContent>
          </Card>

          {/* Entries List */}
          <div className="xl:col-span-2 overflow-hidden">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl font-display">Journal Entries</CardTitle>
              </CardHeader>
              <CardContent className="h-full overflow-y-auto">
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <Card key={entry.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                              {entry.instrument}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                entry.outcome === "win" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {entry.outcome === "win" ? "🎯 Win" : "❌ Loss"}
                            </span>
                          </div>
                          <span
                            className={`text-lg font-bold ${entry.outcome === "win" ? "text-green-600" : "text-red-600"}`}
                          >
                            {entry.pnl}
                          </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-4">{entry.content}</p>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-gray-600">Entry Price</span>
                            <div className="font-medium">{entry.entryPrice}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-gray-600">Exit Price</span>
                            <div className="font-medium">{entry.exitPrice}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-gray-600">Risk:Reward</span>
                            <div className="font-medium">{entry.riskReward}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FlexibleLayout>
  )
}
