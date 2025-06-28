"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  BarChart4,
  LineChart,
  CandlestickChart,
  Settings,
  ChevronDown,
} from "lucide-react"
import MarketChart from "@/components/markets/market-chart"
import TechnicalTools from "@/components/markets/technical-tools"
import AssetInfo from "@/components/markets/asset-info"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function MarketsPage() {
  const [selectedAsset, setSelectedAsset] = useState("AAPL")
  const [chartType, setChartType] = useState("candle")
  const [timeframe, setTimeframe] = useState("1D")

  const assets = [
    { symbol: "AAPL", name: "Apple Inc", price: "$2,345.67", change: "+15.7%", category: "stocks" },
    { symbol: "MSFT", name: "Microsoft Corp", price: "$432.10", change: "+2.3%", category: "stocks" },
    { symbol: "GOOGL", name: "Alphabet Inc", price: "$178.45", change: "-1.2%", category: "stocks" },
    { symbol: "AMZN", name: "Amazon.com", price: "$178.90", change: "-2.5%", category: "stocks" },
    { symbol: "BTC", name: "Bitcoin", price: "$68,245.30", change: "+2.7%", category: "crypto" },
    { symbol: "ETH", name: "Ethereum", price: "$3,456.78", change: "+1.9%", category: "crypto" },
    { symbol: "EUR/USD", name: "Euro/US Dollar", price: "1.0845", change: "-0.3%", category: "forex" },
    { symbol: "GBP/USD", name: "Pound/US Dollar", price: "1.2756", change: "+0.2%", category: "forex" },
  ]

  const timeframes = ["1H", "4H", "1D", "1W", "1M"]

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-display font-bold text-xl">Markets</h1>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80%]">
              <SheetHeader className="mb-4">
                <SheetTitle>Search Assets</SheetTitle>
                <SheetDescription>
                  <div className="relative mt-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Search assets..." className="pl-8" />
                  </div>
                </SheetDescription>
              </SheetHeader>
              <Tabs defaultValue="all">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="stocks" className="flex-1">
                    Stocks
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="flex-1">
                    Crypto
                  </TabsTrigger>
                  <TabsTrigger value="forex" className="flex-1">
                    Forex
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="m-0">
                  <div className="space-y-2">
                    {assets.map((asset) => (
                      <div
                        key={asset.symbol}
                        className="flex justify-between items-center p-3 border rounded-md"
                        onClick={() => {
                          setSelectedAsset(asset.symbol)
                          document.body.click() // Close the sheet
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-gray-300" />
                          <div>
                            <p className="font-medium text-sm">{asset.symbol}</p>
                            <p className="text-xs text-gray-500">{asset.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{asset.price}</p>
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
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="stocks" className="m-0">
                  <div className="space-y-2">
                    {assets
                      .filter((a) => a.category === "stocks")
                      .map((asset) => (
                        <div
                          key={asset.symbol}
                          className="flex justify-between items-center p-3 border rounded-md"
                          onClick={() => {
                            setSelectedAsset(asset.symbol)
                            document.body.click() // Close the sheet
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-gray-300" />
                            <div>
                              <p className="font-medium text-sm">{asset.symbol}</p>
                              <p className="text-xs text-gray-500">{asset.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">{asset.price}</p>
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
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="crypto" className="m-0">
                  <div className="space-y-2">
                    {assets
                      .filter((a) => a.category === "crypto")
                      .map((asset) => (
                        <div
                          key={asset.symbol}
                          className="flex justify-between items-center p-3 border rounded-md"
                          onClick={() => {
                            setSelectedAsset(asset.symbol)
                            document.body.click() // Close the sheet
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-gray-300" />
                            <div>
                              <p className="font-medium text-sm">{asset.symbol}</p>
                              <p className="text-xs text-gray-500">{asset.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">{asset.price}</p>
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
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="forex" className="m-0">
                  <div className="space-y-2">
                    {assets
                      .filter((a) => a.category === "forex")
                      .map((asset) => (
                        <div
                          key={asset.symbol}
                          className="flex justify-between items-center p-3 border rounded-md"
                          onClick={() => {
                            setSelectedAsset(asset.symbol)
                            document.body.click() // Close the sheet
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-gray-300" />
                            <div>
                              <p className="font-medium text-sm">{asset.symbol}</p>
                              <p className="text-xs text-gray-500">{asset.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">{asset.price}</p>
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
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader className="p-3 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-display">
                {assets.find((a) => a.symbol === selectedAsset)?.name} ({selectedAsset})
              </CardTitle>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  assets.find((a) => a.symbol === selectedAsset)?.change.startsWith("+")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {assets.find((a) => a.symbol === selectedAsset)?.change}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex justify-between items-center mb-3">
            <div className="flex border rounded-md overflow-hidden">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  className={`px-2 py-1 text-xs ${
                    timeframe === tf ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
            <div className="flex border rounded-md overflow-hidden">
              <button
                className={`p-1 ${
                  chartType === "line" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setChartType("line")}
              >
                <LineChart className="h-4 w-4" />
              </button>
              <button
                className={`p-1 ${
                  chartType === "bar" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setChartType("bar")}
              >
                <BarChart4 className="h-4 w-4" />
              </button>
              <button
                className={`p-1 ${
                  chartType === "candle" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setChartType("candle")}
              >
                <CandlestickChart className="h-4 w-4" />
              </button>
            </div>
          </div>
          <MarketChart symbol={selectedAsset} chartType={chartType} timeframe={timeframe} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Technical Tools
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70%]">
            <SheetHeader>
              <SheetTitle>Technical Tools</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <TechnicalTools />
            </div>
          </SheetContent>
        </Sheet>

        <AssetInfo symbol={selectedAsset} />
      </div>
    </div>
  )
}
