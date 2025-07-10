"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getDetailedGreeting, getWelcomeMessage } from "@/lib/utils/greeting-utils"
import { FlexibleLayout } from "@/components/layout/flexible-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, BookOpen, Target, Star } from "lucide-react"
import { useSmoothNavigation } from "@/hooks/use-smooth-navigation"

export default function Page() {
  const router = useRouter()
  const { navigateTo } = useSmoothNavigation()
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
    { id: "goals", label: "Goals" }
  ]

  return (
    <div className="bg-background text-foreground flex flex-col">
      {/* Mobile Layout */}
      <div className="block md:hidden min-h-screen flex flex-col pt-16">
        {/* Blended Header */}
        <div className="bg-background px-4 pt-2 pb-4">
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                {greeting}, {username}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">{getWelcomeMessage()}</p>
          </div>
        </div>

        {/* Content Area - Single Viewport */}
        <div className="flex-1 px-4 pb-24">
          {/* Market Movers */}
          <Card className="bg-card border border-border w-full mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display text-foreground">Market Movers</CardTitle>
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <button
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors font-display ${
                      showGainers ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                    }`}
                    onClick={() => setShowGainers(true)}
                  >
                    Top Gainers
                  </button>
              <button
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors font-display ${
                      !showGainers ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
                    onClick={() => setShowGainers(false)}
              >
                    Top Losers
              </button>
          </div>
        </div>
              </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-1 gap-1.5">
                {currentMovers.map((asset) => (
                  <div key={asset.symbol} className="flex justify-between items-center p-2 bg-muted rounded-md min-h-[40px]">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs text-foreground truncate">{asset.symbol}</p>
                      <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="font-medium text-xs text-foreground">{asset.price}</p>
                      <p className={`text-xs flex items-center justify-end ${asset.isPositive ? "text-green-600" : "text-red-600"}`}> 
                        {asset.isPositive ? (
                          <ArrowUpRight className="h-1 w-1 mr-0.5" />
                        ) : (
                          <ArrowDownRight className="h-1 w-1 mr-0.5" />
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
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-3 w-3 text-foreground" />
              <h3 className="text-sm font-display font-bold text-foreground">Trader DNA</h3>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {traderDNA.map((asset) => (
                <div key={asset.symbol} className="min-w-[120px] max-w-[140px] p-2 border border-border rounded-md bg-card flex-shrink-0 min-h-[55px] shadow-sm">
                  <p className="font-medium text-xs text-foreground truncate">{asset.symbol}</p>
                  <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
                  <p className="font-medium text-xs mt-1 text-foreground">{asset.price}</p>
                  <p className={`text-xs flex items-center ${asset.isPositive ? "text-green-600" : "text-red-600"}`}> 
                    {asset.isPositive ? (
                      <ArrowUpRight className="h-1 w-1 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="h-1 w-1 mr-0.5" />
                    )}
                    {asset.change}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Vault & Journal */}
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              <Card className="min-w-[200px] max-w-[220px] flex flex-col bg-card border border-border overflow-hidden flex-shrink-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display flex items-center gap-1 text-foreground">
                    <Target className="h-3 w-3" />
                  Vision Vault
                </CardTitle>
              </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="text-center mb-3">
                    <Target className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">Set trading goals</p>
                  </div>
                  <Button size="sm" className="w-full font-display text-xs btn-smooth" onClick={() => router.push("/vision-vault")}>Create Goals</Button>
                </CardContent>
              </Card>
              <Card className="min-w-[200px] max-w-[220px] flex flex-col bg-card border border-border overflow-hidden flex-shrink-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-display flex items-center gap-1 text-foreground">
                    <BookOpen className="h-3 w-3" />
                    Trading Journal
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="text-center mb-3">
                    <BookOpen className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">Start documenting trades</p>
                </div>
                  <Button size="sm" className="w-full font-display text-xs btn-smooth" onClick={() => router.push("/journal")}>Get Started</Button>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
        {/* Footer above navbar */}
        <footer className="w-full bg-card border-t border-border py-3 px-6 text-center text-sm text-muted-foreground font-display flex-shrink-0"></footer>
      </div>

      {/* Desktop/iPad Layout - Responsive */}
      <div className="hidden md:flex flex-col fixed h-screen w-full bg-background text-foreground">
        <FlexibleLayout fullScreen className="!min-h-0 !pb-0 h-full">
          {/* Greeting (Normal, always visible) */}
          <div className="flex items-center gap-4 px-12 mt-8 mb-4 max-w-[1440px] mx-auto w-full">
            <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center overflow-hidden border border-border">
              <span className="text-2xl font-bold text-muted-foreground">B</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl xl:text-3xl text-foreground">
                {greeting}, {username}
              </h1>
              <p className="text-muted-foreground mt-1">{getWelcomeMessage()}</p>
            </div>
          </div>
          {/* iPad Portrait: Single Column */}
          <div className="flex flex-col gap-4 md:gap-2 lg:hidden ipadland:hidden">
            {/* Market Movers */}
            <Card className="bg-card border border-border overflow-hidden w-full">
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
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentMovers.map((asset) => (
                    <div key={asset.symbol} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{asset.symbol}</p>
                        <p className="text-sm text-muted-foreground">{asset.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{asset.price}</p>
                        <p className={`text-sm flex items-center justify-end ${asset.isPositive ? "text-green-600" : "text-red-600"}`}> 
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
            {/* Trader DNA as horizontal scrollable row */}
            <Card className="bg-card border border-border overflow-hidden w-full">
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2 text-foreground">
                  <Star className="h-5 w-5" />
                  Trader DNA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {traderDNA.map((asset) => (
                    <div key={asset.symbol} className="min-w-[140px] max-w-[160px] p-3 border border-border rounded-lg bg-card flex-shrink-0">
                      <p className="font-medium text-sm text-foreground">{asset.symbol}</p>
                      <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
                      <p className="font-medium text-sm mt-2 text-foreground">{asset.price}</p>
                      <p className={`text-xs flex items-center ${asset.isPositive ? "text-green-600" : "text-red-600"}`}> 
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
            {/* Vision Vault & Journal side by side */}
            <div className="flex gap-2">
              <Card className="flex-1 flex flex-col bg-card border border-border overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-base font-display flex items-center gap-2 text-foreground">
                    <Target className="h-4 w-4" />
                    Vision Vault
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Target className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">Set trading goals</p>
                  <Button size="sm" className="w-full font-display btn-smooth" onClick={() => navigateTo("/vision-vault")}>Create Goals</Button>
                </CardContent>
              </Card>
              <Card className="flex-1 flex flex-col bg-card border border-border overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-base font-display flex items-center gap-2 text-foreground">
                    <BookOpen className="h-4 w-4" />
                    Trading Journal
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">Start documenting trades</p>
                  <Button size="sm" className="w-full font-display btn-smooth" onClick={() => navigateTo("/journal")}>Get Started</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* iPad Landscape: Custom Layout (ipadland only) */}
          <div className="hidden ipadland:flex ipadland:flex-col ipadland:gap-4 ipadland:w-full ipadland:max-w-[900px] ipadland:mx-auto ipadland:pt-3 ipadland:pb-3 ipadland:px-0 lg:hidden">
            {/* Top Gainers/Losers Toggle for iPad Landscape */}
            <div className="flex items-center justify-end mb-2">
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
            {/* Market Movers at the top */}
            <Card className="bg-card border border-border w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-display text-foreground">Market Movers</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="grid grid-cols-2 gap-1">
                  {currentMovers.map((asset) => (
                    <div key={asset.symbol} className="flex justify-between items-center p-1 bg-muted rounded-sm min-h-[35px]">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs text-foreground truncate">{asset.symbol}</p>
                        <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-1">
                        <p className="font-medium text-xs text-foreground">{asset.price}</p>
                        <p className={`text-xs flex items-center justify-end ${asset.isPositive ? "text-green-600" : "text-red-600"}`}> 
                          {asset.isPositive ? (
                            <ArrowUpRight className="h-1 w-1 mr-0.5" />
                          ) : (
                            <ArrowDownRight className="h-1 w-1 mr-0.5" />
                          )}
                          {asset.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Trader DNA as horizontal row */}
            <Card className="bg-card border border-border w-full">
              <CardHeader>
                <CardTitle className="text-base font-display flex items-center gap-2 text-foreground">
                  <Star className="h-4 w-4" />
                  Trader DNA
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex gap-1 overflow-x-auto">
                  {traderDNA.map((asset) => (
                    <div key={asset.symbol} className="min-w-[70px] max-w-[80px] p-1 border border-border rounded-sm bg-card flex-shrink-0 min-h-[45px]">
                      <p className="font-medium text-xs text-foreground truncate">{asset.symbol}</p>
                      <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
                      <p className="font-medium text-xs mt-1 text-foreground">{asset.price}</p>
                      <p className={`text-xs flex items-center ${asset.isPositive ? "text-green-600" : "text-red-600"}`}> 
                        {asset.isPositive ? (
                          <ArrowUpRight className="h-1 w-1 mr-0.5" />
                        ) : (
                          <ArrowDownRight className="h-1 w-1 mr-0.5" />
                        )}
                        {asset.change}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Vision Vault & Journal side by side */}
            <div className="flex gap-2 w-full">
              <Card className="flex-1 flex flex-col bg-card border border-border overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-sm font-display flex items-center gap-2 text-foreground">
                    <Target className="h-3 w-3" />
                    Vision Vault
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Target className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground mb-2">Set trading goals</p>
                  <Button size="sm" className="w-full font-display text-xs btn-smooth" onClick={() => router.push("/vision-vault")}>Create Goals</Button>
                </CardContent>
              </Card>
              <Card className="flex-1 flex flex-col bg-card border border-border overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-sm font-display flex items-center gap-2 text-foreground">
                    <BookOpen className="h-3 w-3" />
                    Trading Journal
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <BookOpen className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground mb-2">Start documenting trades</p>
                  <Button size="sm" className="w-full font-display text-xs btn-smooth" onClick={() => router.push("/journal")}>Get Started</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Desktop/Laptop: Professional Layout (lg and up) */}
          <div className="hidden lg:grid grid-cols-2 gap-16 w-full h-[calc(100vh-220px)] min-h-0 px-12 pb-8">
            {/* Left Column: Market Movers (top), Trader DNA (bottom) */}
            <div className="flex flex-col gap-10 flex-1 h-full min-h-0">
              {/* Market Movers */}
              <Card className="flex-1 flex flex-col bg-card border border-border overflow-hidden min-h-0">
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
                  <CardContent className="flex-1 overflow-auto min-h-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentMovers.map((asset) => (
                        <div key={asset.symbol} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{asset.symbol}</p>
                            <p className="text-sm text-muted-foreground">{asset.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">{asset.price}</p>
                            <p className={`text-sm flex items-center justify-end ${asset.isPositive ? "text-green-600" : "text-red-600"}`}>
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
                <Card className="flex-1 flex flex-col bg-card border border-border overflow-hidden min-h-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-display flex items-center gap-2 text-foreground">
                      <Star className="h-5 w-5" />
                      Trader DNA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto min-h-0">
                    <div className="grid grid-cols-2 gap-3 md:gap-2">
                      {traderDNA.map((asset) => (
                        <div
                          key={asset.symbol}
                          className="p-3 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
                        >
                          <p className="font-medium text-sm text-foreground">{asset.symbol}</p>
                          <p className="text-xs text-muted-foreground truncate">{asset.name}</p>
                          <p className="font-medium text-sm mt-2 text-foreground">{asset.price}</p>
                          <p className={`text-xs flex items-center ${asset.isPositive ? "text-green-600" : "text-red-600"}`}>
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
              <div className="flex flex-col gap-10 flex-1 h-full min-h-0">
                {/* Vision Vault */}
                <Card className="flex-1 flex flex-col bg-card border border-border overflow-hidden min-h-0">
                  <CardHeader>
                    <CardTitle className="text-base font-display flex items-center gap-2 text-foreground">
                      <Target className="h-4 w-4" />
                      Vision Vault
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto min-h-0 text-center flex flex-col justify-end pb-6">
                    <div className="mb-auto pt-8">
                    <Target className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">Set trading goals</p>
                    </div>
                    <Button size="sm" className="w-full font-display btn-smooth" onClick={() => navigateTo("/vision-vault")}>Create Goals</Button>
                  </CardContent>
                </Card>
                {/* Journal Card */}
                <Card className="flex-1 flex flex-col bg-card border border-border overflow-hidden min-h-0">
                  <CardHeader>
                    <CardTitle className="text-base font-display flex items-center gap-2 text-foreground">
                      <BookOpen className="h-4 w-4" />
                      Trading Journal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto min-h-0 text-center flex flex-col justify-end pb-6">
                    <div className="mb-auto pt-8">
                    <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">Start documenting trades</p>
                    </div>
                    <Button size="sm" className="w-full font-display btn-smooth" onClick={() => navigateTo("/journal")}>Get Started</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FlexibleLayout>
        </div>
      </div>
  );
}
