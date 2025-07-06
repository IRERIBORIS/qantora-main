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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="block md:hidden h-screen overflow-hidden">
        {/* Blended Header */}
        <div className="bg-gray-50 px-4 pt-20 pb-4">
          <h1 className="font-display font-bold text-xl text-gray-900">
            {greeting}, {username}
          </h1>
          <p className="text-gray-600 text-sm mt-1">{getWelcomeMessage()}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
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
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Trader DNA
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {traderDNA.map((asset) => (
                    <div key={asset.symbol} className="p-3 border border-gray-200 rounded-lg bg-white">
                      <p className="font-medium text-sm">{asset.symbol}</p>
                      <p className="text-xs text-gray-500 truncate">{asset.name}</p>
                      <p className="font-medium text-sm mt-2">{asset.price}</p>
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
              className="cursor-pointer hover:shadow-lg transition-shadow h-full"
              onClick={() => router.push("/journal")}
            >
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Trading Journal
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Start Your Trading Journal</h3>
                  <p className="text-sm text-gray-600 mb-4">Document trades and track performance</p>
                  <Button className="w-full">Get Started</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "goals" && (
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow h-full"
              onClick={() => router.push("/vision-vault")}
            >
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Vision Vault
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] flex items-center justify-center">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Set Your Trading Goals</h3>
                  <p className="text-sm text-gray-600 mb-4">Define and track your objectives</p>
                  <Button className="w-full">Create Goals</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Desktop Layout - Full Screen Grid */}
      <div className="hidden md:block h-screen overflow-hidden">
        <FlexibleLayout fullScreen>
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="font-display font-bold text-2xl xl:text-3xl text-gray-900">
              {greeting}, {username}
            </h1>
            <p className="text-gray-600 mt-1">{getWelcomeMessage()}</p>
          </div>

          {/* Main Grid Layout - No Scrolling, Removed Portfolio Allocation */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
            {/* Left Column - Market Movers */}
            <div className="xl:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-display">Market Movers</CardTitle>
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <button
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          showGainers ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                        }`}
                        onClick={() => setShowGainers(true)}
                      >
                        Top Gainers
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          !showGainers ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                        }`}
                        onClick={() => setShowGainers(false)}
                      >
                        Top Losers
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {currentMovers.map((asset) => (
                      <div key={asset.symbol} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{asset.symbol}</p>
                          <p className="text-sm text-gray-500">{asset.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{asset.price}</p>
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
            </div>

            {/* Right Column */}
            <div className="space-y-6 h-full overflow-hidden">
              {/* Trader DNA */}
              <Card className="h-1/2">
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Trader DNA
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-3">
                    {traderDNA.map((asset) => (
                      <div
                        key={asset.symbol}
                        className="p-3 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow"
                      >
                        <p className="font-medium text-sm">{asset.symbol}</p>
                        <p className="text-xs text-gray-500 truncate">{asset.name}</p>
                        <p className="font-medium text-sm mt-2">{asset.price}</p>
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

              {/* Trading Journal & Vision Vault */}
              <div className="grid grid-cols-1 gap-4 h-1/2">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push("/journal")}
                >
                  <CardHeader>
                    <CardTitle className="text-base font-display flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Trading Journal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-4">
                    <BookOpen className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-3">Start documenting trades</p>
                    <Button size="sm" className="w-full">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push("/vision-vault")}
                >
                  <CardHeader>
                    <CardTitle className="text-base font-display flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Vision Vault
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-4">
                    <Target className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-3">Set trading goals</p>
                    <Button size="sm" className="w-full">
                      Create Goals
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </FlexibleLayout>
      </div>
    </div>
  )
}
