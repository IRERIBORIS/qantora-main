"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Star } from "lucide-react"

export default function MarketMoversPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("gainers")
  const [favorites, setFavorites] = useState<string[]>(["AAPL", "BTC"])

  const topGainers = [
    { symbol: "AAPL", name: "Apple Inc", price: "$2,345.67", change: "+15.7%", volume: "45.2M" },
    { symbol: "NVDA", name: "NVIDIA Corp", price: "$1,245.30", change: "+8.3%", volume: "32.1M" },
    { symbol: "TSLA", name: "Tesla Inc", price: "$875.45", change: "+5.2%", volume: "28.9M" },
    { symbol: "MSFT", name: "Microsoft", price: "$432.10", change: "+3.1%", volume: "25.7M" },
    { symbol: "GOOGL", name: "Alphabet", price: "$178.45", change: "+2.8%", volume: "18.3M" },
  ]

  const topLosers = [
    { symbol: "META", name: "Meta Platforms", price: "$432.15", change: "-3.2%", volume: "35.4M" },
    { symbol: "AMZN", name: "Amazon.com", price: "$178.90", change: "-2.5%", volume: "29.8M" },
    { symbol: "NFLX", name: "Netflix Inc", price: "$645.20", change: "-1.8%", volume: "22.1M" },
    { symbol: "PYPL", name: "PayPal", price: "$89.45", change: "-1.5%", volume: "19.6M" },
    { symbol: "UBER", name: "Uber Technologies", price: "$67.23", change: "-1.2%", volume: "16.8M" },
  ]

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  const currentData = activeTab === "gainers" ? topGainers : topLosers

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-lg">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-display font-bold text-xl text-gray-900">Market Movers</h1>
            <p className="text-gray-600 text-sm">Top performing stocks today</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1 mb-6">
          <button
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "gainers" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("gainers")}
          >
            Top Gainers
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "losers" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("losers")}
          >
            Top Losers
          </button>
        </div>

        {/* Market Movers List */}
        <div className="space-y-3">
          {currentData.map((asset, index) => (
            <Card key={asset.symbol} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">#{index + 1}</span>
                      <button onClick={() => toggleFavorite(asset.symbol)}>
                        <Star
                          className={`h-4 w-4 transition-colors ${
                            favorites.includes(asset.symbol)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 hover:text-yellow-400"
                          }`}
                        />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{asset.symbol}</p>
                      <p className="text-xs text-gray-500">{asset.name}</p>
                      <p className="text-xs text-gray-400">Vol: {asset.volume}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{asset.price}</p>
                    <p
                      className={`text-sm flex items-center justify-end ${
                        activeTab === "gainers" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {activeTab === "gainers" ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {asset.change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full bg-transparent">
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}
