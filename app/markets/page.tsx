"use client"

import { useState } from "react"
import { FlexibleLayout } from "@/components/layout/flexible-layout"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUpRight,
  ArrowDownRight,
  Star,
  BarChart4,
  LineChart,
  CandlestickChart,
  Settings,
  Crosshair,
  TrendingUp,
  Brush,
  Type,
  Ruler,
  Target,
  ZoomIn,
  Lock,
  MoreHorizontal,
  Play,
  Bell,
  Eye,
  Undo,
  Redo,
  Magnet,
  Grid,
  Camera,
  Folder,
  Share2,
  Activity,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import MarketChart from "@/components/markets/market-chart"

export default function MarketsPage() {
  const [selectedAsset, setSelectedAsset] = useState("BTCUSD")
  const [chartType, setChartType] = useState("candle")
  const [timeframe, setTimeframe] = useState("1D")
  const [activeTool, setActiveTool] = useState("crosshair")
  const [favorites, setFavorites] = useState<string[]>(["BTCUSD", "ETHUSD"])
  const [showAdvancedControls, setShowAdvancedControls] = useState(true)
  const [watchlistCollapsed, setWatchlistCollapsed] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const assets = [
    { symbol: "BTCUSD", name: "Bitcoin", price: "68,245.30", change: "+2.7%", isPositive: true },
    { symbol: "ETHUSD", name: "Ethereum", price: "3,456.78", change: "+1.9%", isPositive: true },
    { symbol: "AAPL", name: "Apple Inc", price: "2,345.67", change: "+15.7%", isPositive: true },
    { symbol: "TSLA", name: "Tesla Inc", price: "875.45", change: "+5.2%", isPositive: true },
    { symbol: "GOOGL", name: "Alphabet", price: "178.45", change: "-1.2%", isPositive: false },
    { symbol: "AUDUSD", name: "AUD/USD", price: "0.65587", change: "-0.12%", isPositive: false },
  ]

  const favoriteTimeframes = ["1M", "5M", "15M", "1H", "4H", "1D"]
  const allTimeframes = ["1M", "5M", "15M", "30M", "1H", "4H", "1D", "1W", "1M", "3M", "6M", "1Y"]

  const drawingTools = [
    { id: "crosshair", icon: Crosshair, name: "Crosshair" },
    { id: "trendline", icon: TrendingUp, name: "Trendline" },
    { id: "brush", icon: Brush, name: "Brush" },
    { id: "text", icon: Type, name: "Text" },
    { id: "fib", icon: Ruler, name: "Fibonacci" },
    { id: "long", icon: Target, name: "Long Position" },
    { id: "zoom", icon: ZoomIn, name: "Zoom" },
    { id: "lock", icon: Lock, name: "Lock" },
  ]

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  return (
    <FlexibleLayout fullScreen padding="none">
      {/* Mobile Layout with Neumorphism Sidebar */}
      <div className="block lg:hidden h-screen bg-white overflow-hidden relative">
        {/* Collapsible Left Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-gray-50 transform transition-transform duration-300 z-50 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
            boxShadow: showSidebar ? "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff" : "none",
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-xl text-gray-900">Markets</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(false)}
                className="rounded-xl"
                style={{
                  background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
                  boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            {/* Watchlist */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 mb-4">Watchlist</h3>
              {assets.map((asset) => (
                <div
                  key={asset.symbol}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedAsset === asset.symbol ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  }`}
                  style={{
                    background:
                      selectedAsset === asset.symbol
                        ? "linear-gradient(145deg, #e3f2fd, #ffffff)"
                        : "linear-gradient(145deg, #f5f5f5, #ffffff)",
                    boxShadow: "3px 3px 6px #d9d9d9, -3px -3px 6px #ffffff",
                  }}
                  onClick={() => {
                    setSelectedAsset(asset.symbol)
                    setShowSidebar(false)
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(asset.symbol)
                        }}
                      >
                        <Star
                          className={`h-4 w-4 transition-colors ${
                            favorites.includes(asset.symbol)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 hover:text-yellow-400"
                          }`}
                        />
                      </button>
                      <div>
                        <p className="font-medium text-sm">{asset.symbol}</p>
                        <p className="text-xs text-gray-500">{asset.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{asset.price}</p>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {showSidebar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowSidebar(false)} />
        )}

        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(true)}
            className="rounded-xl"
            style={{
              background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
              boxShadow: "3px 3px 6px #d9d9d9, -3px -3px 6px #ffffff",
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="text-center">
              <span className="font-medium text-lg">{selectedAsset}</span>
              <div className="flex items-center gap-1 justify-center">
                <span className="text-sm text-gray-600">{timeframe}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              style={{
                background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                boxShadow: "3px 3px 6px #d9d9d9, -3px -3px 6px #ffffff",
              }}
              title="Technical Analysis"
            >
              <Activity className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              style={{
                background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                boxShadow: "3px 3px 6px #d9d9d9, -3px -3px 6px #ffffff",
              }}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Full-Screen Chart */}
        <div className="flex-1 relative bg-white h-[calc(100vh-70px)]">
          {/* Live Price Display */}
          <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl p-3 border border-gray-200 shadow-lg">
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {assets.find((a) => a.symbol === selectedAsset)?.price}
              </div>
              <div
                className={`text-sm flex items-center justify-end ${assets.find((a) => a.symbol === selectedAsset)?.isPositive ? "text-green-600" : "text-red-600"}`}
              >
                {assets.find((a) => a.symbol === selectedAsset)?.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {assets.find((a) => a.symbol === selectedAsset)?.change}
              </div>
              <div className="text-xs text-gray-500 mt-1">00:23</div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-full p-4">
            <MarketChart symbol={selectedAsset} chartType={chartType} timeframe={timeframe} />
          </div>
        </div>
      </div>

      {/* Desktop Professional Layout */}
      <div className="hidden lg:block h-screen bg-gray-50 overflow-hidden">
        {/* Enhanced Top Toolbar with Asset Info */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section - Asset Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <h2 className="font-bold text-xl">{selectedAsset}</h2>
                <div className="text-right">
                  <span className="font-medium text-lg">{assets.find((a) => a.symbol === selectedAsset)?.price}</span>
                  <span
                    className={`ml-2 font-medium ${
                      assets.find((a) => a.symbol === selectedAsset)?.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {assets.find((a) => a.symbol === selectedAsset)?.change}
                  </span>
                </div>
              </div>

              {/* Timeframe Dropdown */}
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <div className="text-xs font-medium text-gray-500 mb-2">Favorites</div>
                    {favoriteTimeframes.map((tf) => (
                      <SelectItem key={tf} value={tf}>
                        {tf}
                      </SelectItem>
                    ))}
                    <div className="border-t my-2"></div>
                    <div className="text-xs font-medium text-gray-500 mb-2">All Timeframes</div>
                    {allTimeframes
                      .filter((tf) => !favoriteTimeframes.includes(tf))
                      .map((tf) => (
                        <SelectItem key={tf} value={tf}>
                          {tf}
                        </SelectItem>
                      ))}
                  </div>
                </SelectContent>
              </Select>

              {/* Chart Types */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className={`p-2 ${
                    chartType === "line" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setChartType("line")}
                >
                  <LineChart className="h-4 w-4" />
                </button>
                <button
                  className={`p-2 ${
                    chartType === "bar" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setChartType("bar")}
                >
                  <BarChart4 className="h-4 w-4" />
                </button>
                <button
                  className={`p-2 ${
                    chartType === "candle" ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setChartType("candle")}
                >
                  <CandlestickChart className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Center Section */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Technical Analysis">
                <Activity className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Alerts">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Replay">
                <Play className="h-4 w-4" />
              </Button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Screenshot">
                <Camera className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Save Screenshots">
                <Folder className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Publish
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Vertical Toolbar - Drawing Tools */}
          <div className="w-16 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 flex flex-col items-center py-6 gap-3">
            {drawingTools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <Button
                  key={tool.id}
                  variant="ghost"
                  size="icon"
                  className={`w-10 h-10 rounded-xl transition-all duration-200 group relative ${
                    activeTool === tool.id
                      ? "bg-gray-900 text-white shadow-lg"
                      : "hover:bg-white hover:shadow-md text-gray-600"
                  }`}
                  onClick={() => setActiveTool(tool.id)}
                >
                  <IconComponent className="h-4 w-4" />
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {tool.name}
                  </div>
                </Button>
              )
            })}

            <div className="border-t border-gray-300 w-8 my-2"></div>

            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-xl hover:bg-white hover:shadow-md text-gray-600 group relative"
              title="More Tools"
            >
              <MoreHorizontal className="h-4 w-4" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                More Tools
              </div>
            </Button>
          </div>

          <div className="flex-1 flex">
            {/* Main Chart Area */}
            <div className="flex-1 relative bg-white">
              {/* Chart */}
              <div className="h-full p-6">
                <MarketChart symbol={selectedAsset} chartType={chartType} timeframe={timeframe} />
              </div>

              {/* Movable Advanced Controls */}
              {showAdvancedControls && (
                <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl p-3 border border-gray-200 shadow-lg">
                  <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100" title="Undo">
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100" title="Redo">
                    <Redo className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100" title="Magnet Mode">
                    <Magnet className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100" title="Grid Toggle">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100" title="Visibility">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 hover:bg-gray-100"
                    onClick={() => setShowAdvancedControls(false)}
                    title="Hide Controls"
                  >
                    <Lock className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Right Vertical Toolbar - Collapsible Watchlist */}
            <div
              className={`bg-white border-l border-gray-200 transition-all duration-300 ${
                watchlistCollapsed ? "w-12" : "w-80"
              }`}
            >
              {watchlistCollapsed ? (
                <div className="p-3 flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setWatchlistCollapsed(false)}
                    className="w-8 h-8 mb-4"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="space-y-2">
                    {favorites.slice(0, 3).map((symbol) => (
                      <div
                        key={symbol}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer ${
                          selectedAsset === symbol ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={() => setSelectedAsset(symbol)}
                      >
                        {symbol.slice(0, 2)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Watchlist</h3>
                    <Button variant="ghost" size="icon" onClick={() => setWatchlistCollapsed(true)} className="w-8 h-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {assets.map((asset) => (
                      <div
                        key={asset.symbol}
                        className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                          selectedAsset === asset.symbol ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                        }`}
                        onClick={() => setSelectedAsset(asset.symbol)}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(asset.symbol)
                            }}
                          >
                            <Star
                              className={`h-4 w-4 transition-colors ${
                                favorites.includes(asset.symbol)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300 hover:text-yellow-400"
                              }`}
                            />
                          </button>
                          <div>
                            <p className="font-medium">{asset.symbol}</p>
                            <p className="text-sm text-gray-500">{asset.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{asset.price}</p>
                          <p
                            className={`text-sm flex items-center ${asset.isPositive ? "text-green-600" : "text-red-600"}`}
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FlexibleLayout>
  )
}
