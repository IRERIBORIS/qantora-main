"use client"

import { useState, useEffect } from "react"
import { getGreeting, formatDate } from "@/lib/utils/date-utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PortfolioPage() {
  const [greeting, setGreeting] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [username, setUsername] = useState("Boris")

  useEffect(() => {
    setGreeting(getGreeting())
    setCurrentDate(formatDate(new Date()))

    // Update greeting every hour
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 3600000)

    return () => clearInterval(interval)
  }, [])

  const topMovers = [
    { symbol: "AAPL", name: "Apple Inc", price: "$2,345", change: "+15.7%" },
    { symbol: "NVDA", name: "NVIDIA Corp", price: "$1,245", change: "+8.3%" },
    { symbol: "TSLA", name: "Tesla Inc", price: "$875", change: "+5.2%" },
  ]

  const topLosers = [
    { symbol: "META", name: "Meta Platforms", price: "$432", change: "-3.2%" },
    { symbol: "AMZN", name: "Amazon.com", price: "$178", change: "-2.5%" },
    { symbol: "NFLX", name: "Netflix Inc", price: "$645", change: "-1.8%" },
  ]

  const favoriteAssets = [
    { symbol: "BTC", name: "Bitcoin", price: "$68,245", change: "+2.7%" },
    { symbol: "ETH", name: "Ethereum", price: "$3,456", change: "+1.9%" },
    { symbol: "AAPL", name: "Apple Inc", price: "$2,345", change: "+15.7%" },
    { symbol: "EUR/USD", name: "Euro/US Dollar", price: "1.0845", change: "-0.3%" },
  ]

  const economicEvents = [
    { time: "08:30 AM", event: "Non-Farm Payrolls", forecast: "+175K", previous: "+165K", impact: "High" },
    { time: "10:00 AM", event: "ISM Manufacturing PMI", forecast: "52.5", previous: "51.8", impact: "Medium" },
    { time: "02:00 PM", event: "FOMC Statement", forecast: "N/A", previous: "N/A", impact: "High" },
  ]

  return (
    <div className="px-4 py-4">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-gray-900">
          {greeting}, {username}
        </h1>
        <div className="mt-1 text-gray-600">
          <p className="font-display text-base">Morning Brief</p>
          <p className="text-xs">Your trading day at a glance</p>
          <p className="text-xs mt-1">{currentDate}</p>
          <p className="text-xs font-medium text-green-600 mt-1">Bullish</p>
          <p className="text-xs mt-1">
            Markets are expected to open higher following positive earnings from tech giants. Key economic data
            including jobless claims will be released at 8:30 AM ET.
          </p>
          <p className="text-xs font-medium mt-1">Focus: Tech sector, particularly semiconductors</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-display font-semibold text-lg">Market Movers</h2>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            See All <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <Tabs defaultValue="gainers">
          <TabsList className="w-full mb-3">
            <TabsTrigger value="gainers" className="flex-1 text-xs">
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value="losers" className="flex-1 text-xs">
              Top Losers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gainers" className="mt-0">
            <div className="space-y-3">
              {topMovers.map((asset) => (
                <Card key={asset.symbol} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{asset.symbol}</p>
                        <p className="text-xs text-gray-500">{asset.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{asset.price}</p>
                        <p className="text-xs text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          {asset.change}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="losers" className="mt-0">
            <div className="space-y-3">
              {topLosers.map((asset) => (
                <Card key={asset.symbol} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{asset.symbol}</p>
                        <p className="text-xs text-gray-500">{asset.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{asset.price}</p>
                        <p className="text-xs text-red-600 flex items-center">
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                          {asset.change}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-display font-semibold text-lg">Trader DNA</h2>
        </div>
        <div className="card-scroll">
          {favoriteAssets.map((asset) => (
            <Card key={asset.symbol} className="overflow-hidden">
              <CardContent className="p-3">
                <p className="font-medium text-sm">{asset.symbol}</p>
                <p className="text-xs text-gray-500">{asset.name}</p>
                <p className="font-medium text-sm mt-2">{asset.price}</p>
                <p
                  className={`text-xs flex items-center ${
                    asset.change.startsWith("+") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {asset.change.startsWith("+") ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {asset.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-display font-semibold text-lg">Economic Events</h2>
        </div>
        <Card>
          <CardContent className="p-3">
            <div className="space-y-4">
              {economicEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div className="h-full w-px bg-gray-200 my-1"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-xs">{event.time}</p>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          event.impact === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {event.impact} Impact
                      </span>
                    </div>
                    <p className="font-medium text-sm">{event.event}</p>
                    <div className="text-[10px] text-gray-500 mt-1">
                      <span>Forecast: {event.forecast}</span>
                      <span className="mx-1">|</span>
                      <span>Previous: {event.previous}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
