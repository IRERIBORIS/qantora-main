"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getDetailedGreeting, getWelcomeMessage } from "@/lib/utils/greeting-utils"
import { FlexibleLayout } from "@/components/layout/flexible-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, BookOpen, Target, Star } from "lucide-react"

export default function PortfolioPage() {
  const router = useRouter()
  const [greeting, setGreeting] = useState("")
  const [username] = useState("Boris")
  const [showGainers, setShowGainers] = useState(true)
  const [activeTab, setActiveTab] = useState("movers")

  useEffect(() => {
    const { greeting: currentGreeting } = getDetailedGreeting()
    setGreeting(currentGreeting)

    const interval = setInterval(() => {
      const { greeting: newGreeting } = getDetailedGreeting()
      setGreeting(newGreeting)
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const topMovers = [
    { symbol: "AAPL", name: "Apple Inc", price: "$2,345.67", change: "+15.7%", isPositive: true },
    { symbol: "NVDA", name: "NVIDIA Corp", price: "$1,245.30", change: "+8.3%", isPositive: true },
    { symbol: "TSLA", name: "Tesla Inc", price: "$875.45", change: "+5.2%", isPositive: true },
    { symbol: "MSFT", name: "Microsoft", price: "$432.10", change: "+3.1%", isPositive: true },
  ]

  const topLosers = [
    { symbol: "META", name: "Meta Platforms", price: "$432.15", change: "-3.2%", isPositive: false },
    { symbol: "AMZN", name: "Amazon.com", price: "$178.90", change: "-2.5%", isPositive: false },
    { symbol: "NFLX", name: "Netflix Inc", price: "$645.20", change: "-1.8%", isPositive: false },
    { symbol: "GOOGL", name: "Alphabet", price: "$178.45", change: "-1.2%", isPositive: false },
  ]

  const traderDNA = [
    { symbol: "BTC", name: "Bitcoin", price: "$68,245", change: "+2.7%", isPositive: true },
    { symbol: "ETH", name: "Ethereum", price: "$3,456", change: "+1.9%", isPositive: true },
    { symbol: "AAPL", name: "Apple Inc", price: "$2,345", change: "+15.7%", isPositive: true },
    { symbol: "EUR/USD", name: "Euro/Dollar", price: "1.0845", change: "-0.3%", isPositive: false },
  ]

  const currentMovers = showGainers ? topMovers : topLosers

  const tabs = [
    { id: "movers", label: "Market Movers" },
    { id: "dna", label: "Trader DNA" },
    { id: "journal", label: "Journal" },
    { id: "goals", label: "Goals" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Mobile Layout */}
      <div className="block md:hidden h-screen overflow-hidden flex flex-col">
        {/* Blended Header */}
        <div className="bg-background px-4 pt-20 pb-4">
          <div className="flex items-center gap-4">
            {/* Profile Picture Placeholder */}
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
              {/* TODO: Replace with user profile image if available */}
              <span className="text-lg font-bold text-muted-foreground">B</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                {greeting}, {username}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">{getWelcomeMessage()}</p>
            </div>
            {/* Upload Button (hidden for now, to be implemented) */}
            {/* <Button size="sm" className="ml-auto">Change</Button> */}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors font-display ${
                  activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area - Single Viewport */}
        <div className="flex-1 px-4 pb-24 h-[calc(100vh-200px)] overflow-hidden">
          {activeTab === "dna" && (
            <Card className="h-full bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2 text-foreground">
                  <Star className="h-5 w-5" />
                  Trader DNA
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {traderDNA.map((asset) => (
                    <div key={asset.symbol} className="p-3 border border-border rounded-lg bg-card">
                      <p className="font-medium text-sm text-foreground">{asset.symbol}</p>
                      <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
                      <p className="font-medium text-sm mt-2 text-foreground">{asset.price}</p>
                      <p
                        className={`text-xs flex items-center ${asset.isPositive ? "text-green-600" : "text-red-600"}`}
                      >
                        {asset.isPositive ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {asset.change}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "journal" && (
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow h-full bg-card border border-border"
              onClick={() => router.push("/journal")}
            >
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2 text-foreground">
                  <BookOpen className="h-5 w-5" />
                  Trading Journal
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-2">Start Your Trading Journal</h3>
                  <p className="text-sm text-muted-foreground mb-4">Document trades and track performance</p>
                  <Button className="w-full font-display">Get Started</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "goals" && (
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow h-full bg-card border border-border"
              onClick={() => router.push("/vision-vault")}
            >
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2 text-foreground">
                  <Target className="h-5 w-5" />
                  Vision Vault
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] flex items-center justify-center">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-2">Set Your Trading Goals</h3>
                  <p className="text-sm text-muted-foreground mb-4">Define and track your objectives</p>
                  <Button className="w-full font-display">Create Goals</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        {/* Footer above navbar */}
        <footer className="w-full bg-card border-t border-border py-3 px-6 text-center text-sm text-muted-foreground font-display flex-shrink-0"></footer>
      </div>

      {/* Desktop Layout - Full Screen Grid */}
      <div className="hidden md:flex flex-col h-screen overflow-hidden bg-background text-foreground">
        <FlexibleLayout fullScreen>
          {/* Greeting (Normal, always visible) */}
          <div className="flex items-center gap-4 px-8 py-3 max-w-[1440px] mx-auto w-full">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
              <span className="text-2xl font-bold text-muted-foreground">B</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl xl:text-3xl text-foreground">
                {greeting}, {username}
              </h1>
              <p className="text-muted-foreground mt-1">{getWelcomeMessage()}</p>
            </div>
          </div>

          {/* Fluid, Responsive Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-8 gap-x-8 flex-1 min-h-0 max-w-[1440px] mx-auto px-8 w-full mt-4">
            {/* Left Column: Market Movers (top), Trader DNA (bottom) */}
            <div className="flex flex-col gap-8 flex-1 min-h-0">
              {/* Market Movers */}
              <Card className="flex-1 flex flex-col bg-card border border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-display text-foreground">Market Movers</CardTitle>
                    <div className="flex items-center bg-muted rounded-lg p-1">
                      <button
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors font-display ${
                          showGainers ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                        }`}
                        onClick={() => setShowGainers(true)}
                      >
                        Top Gainers
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors font-display ${
                          !showGainers ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                        }`}
                        onClick={() => setShowGainers(false)}
                      >
                        Top Losers
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {currentMovers.map((asset) => (
                      <div key={asset.symbol} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{asset.price}</p>
                          <p
                            className={`text-sm flex items-center justify-end ${asset.isPositive ? "text-green-600" : "text-red-600"}`}
                          >
                            {asset.isPositive ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {asset.change}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Trader DNA */}
              <Card className="flex-1 flex flex-col bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2 text-foreground">
                    <Star className="h-5 w-5" />
                    Trader DNA
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-3 md:gap-2">
                    {traderDNA.map((asset) => (
                      <div
                        key={asset.symbol}
                        className="p-3 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
                      >
                        <p className="font-medium text-sm text-foreground">{asset.symbol}</p>
                        <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
                        <p className="font-medium text-sm mt-2 text-foreground">{asset.price}</p>
                        <p
                          className={`text-xs flex items-center ${asset.isPositive ? "text-green-600" : "text-red-600"}`}
                        >
                          {asset.isPositive ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {asset.change}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Vision Vault (top), Journal Card (bottom) */}
            <div className="flex flex-col gap-8 flex-1 min-h-0">
              {/* Vision Vault */}
              <Card className="flex-1 flex flex-col bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-base font-display flex items-center gap-2 text-foreground">
                    <Target className="h-4 w-4" />
                    Vision Vault
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center text-center">
                  <Target className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">Set trading goals</p>
                  <Button size="sm" className="w-full font-display" onClick={() => router.push("/vision-vault")}>Create Goals</Button>
                </CardContent>
              </Card>
              {/* Journal Card */}
              <Card className="flex-1 flex flex-col bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-base font-display flex items-center gap-2 text-foreground">
                    <BookOpen className="h-4 w-4" />
                    Trading Journal
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center text-center">
                  <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">Start documenting trades</p>
                  <Button size="sm" className="w-full font-display" onClick={() => router.push("/journal")}>Get Started</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </FlexibleLayout>
      </div>
    </div>
  )
}
