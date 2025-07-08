"use client"

import { useState, useRef, useEffect } from "react"
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
  Maximize2,
  Minimize2,
  Plus,
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
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showSettingsSheet, setShowSettingsSheet] = useState(false)
  const [showWatchlist, setShowWatchlist] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)
  const [showTechnical, setShowTechnical] = useState(false)
  const [openToolMenu, setOpenToolMenu] = useState<string | null>(null)
  const leftSidebarRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("All")
  const [showAddInstrument, setShowAddInstrument] = useState(false)
  const [newInstrument, setNewInstrument] = useState("")

  const assets = [
    { symbol: "BTCUSD", name: "Bitcoin", price: "68,245.30", change: "+2.7%", isPositive: true },
    { symbol: "ETHUSD", name: "Ethereum", price: "3,456.78", change: "+1.9%", isPositive: true },
    { symbol: "AAPL", name: "Apple Inc", price: "2,345.67", change: "+15.7%", isPositive: true },
    { symbol: "TSLA", name: "Tesla Inc", price: "875.45", change: "+5.2%", isPositive: true },
    { symbol: "GOOGL", name: "Alphabet", price: "178.45", change: "-1.2%", isPositive: false },
    { symbol: "AUDUSD", name: "AUD/USD", price: "0.65587", change: "-0.12%", isPositive: false },
  ]

  const allTimeframes = [
    "MN", "W1", "D1", "H4", "H3", "H2", "H1", "M45", "M30", "M15", "M10", "M5", "M3", "M2", "M1"
  ];
  const [favoriteTimeframes, setFavoriteTimeframes] = useState<string[]>(["D1", "H1"]);

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

  const tagOptions = ["All", "Favorites", "Stocks", "Futures", "Forex", "Crypto", "Indices"]

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  const toggleFavoriteTimeframe = (tf: string) => {
    setFavoriteTimeframes((prev) =>
      prev.includes(tf) ? prev.filter((t) => t !== tf) : [...prev, tf]
    );
  };

  // Set header height and top bar height for correct watchlist offset
  const HEADER_HEIGHT = 64; // adjust if your header is taller
  const TOPBAR_HEIGHT = 64; // sticky top bar
  const WATCHLIST_TOP = HEADER_HEIGHT + TOPBAR_HEIGHT + 16; // 16px extra margin

  // Full screen notification state
  const [showEscNotification, setShowEscNotification] = useState(false);

  // Add Escape key handler for full screen toggle
  useEffect(() => {
    if (!isFullScreen) return;
    setShowEscNotification(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullScreen(false);
    };
    window.addEventListener("keydown", handleEsc);
    // Hide notification after 3 seconds
    const timeout = setTimeout(() => setShowEscNotification(false), 3000);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      clearTimeout(timeout);
    };
  }, [isFullScreen]);

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
      <div className="hidden lg:flex flex-col h-screen bg-background text-foreground overflow-hidden">
        {/* Enhanced Top Toolbar with Asset Info - hide in fullscreen */}
        {!isFullScreen && (
          <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6" style={{ height: TOPBAR_HEIGHT }}>
            <div className="flex items-center justify-between h-full">
              {/* Left Section - Asset Info */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <h2 className="font-bold text-xl">{selectedAsset}</h2>
                  <div className="text-right flex items-center gap-2">
                    <span className="font-medium text-lg">{assets.find((a) => a.symbol === selectedAsset)?.price}</span>
                    <span className={`ml-2 font-medium ${assets.find((a) => a.symbol === selectedAsset)?.isPositive ? "text-green-600" : "text-red-600"}`}>
                      {assets.find((a) => a.symbol === selectedAsset)?.change}
                    </span>
                  </div>
                </div>
                {/* Timeframe Favorites */}
                {favoriteTimeframes.length > 0 && (
                  <div className="flex items-center gap-2 mr-4">
                    {favoriteTimeframes.map((tf) => (
                      <button
                        key={tf}
                        className={`px-3 py-1 rounded-lg font-display text-sm transition-colors bg-muted text-foreground border border-border flex items-center gap-1 ${timeframe === tf ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
                        onClick={() => setTimeframe(tf)}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                )}
                {/* All Timeframes */}
                <div className="relative">
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      {allTimeframes.map((tf) => (
                        <div key={tf} className="flex items-center justify-between px-2 py-1 hover:bg-muted rounded cursor-pointer">
                          <SelectItem value={tf} className="flex-1">{tf}</SelectItem>
                          <span onClick={e => { e.stopPropagation(); toggleFavoriteTimeframe(tf); }} className="ml-2 cursor-pointer">
                            <Star className={`h-4 w-4 ${favoriteTimeframes.includes(tf) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                          </span>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
                <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Full Screen" onClick={() => setIsFullScreen(v => !v)}>
                  <Maximize2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Settings" onClick={() => setShowSettingsSheet(true)}>
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 min-h-0 flex" style={{ height: isFullScreen ? '100vh' : `calc(100vh - ${TOPBAR_HEIGHT}px)` }}>
          {/* Left Sidebar - hide in fullscreen */}
          {!isFullScreen && (
            <div className="bg-white/60 backdrop-blur-lg border border-border rounded-xl shadow-lg flex flex-col h-full w-16 items-center py-6 gap-3 overflow-hidden relative z-30">
              <div className="flex flex-col items-center gap-3 w-full">
                {drawingTools.map((tool) => {
                  const IconComponent = tool.icon;
                  const isActive = activeTool === tool.id && openToolMenu === tool.id;
                  return (
                    <div key={tool.id} className="relative group w-full flex flex-col items-center">
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="icon"
                        className={`w-10 h-10 rounded-xl transition-all border border-border group relative mb-2 ${isActive ? "bg-primary/90 text-primary-foreground shadow-lg" : "bg-white/40 text-muted-foreground hover:bg-accent/60"}`}
                        onClick={() => {
                          if (isActive) {
                            setActiveTool("");
                            setOpenToolMenu(null);
                          } else {
                            setActiveTool(tool.id);
                            setOpenToolMenu(tool.id);
                          }
                        }}
                      >
                        <IconComponent className="h-4 w-4" />
                        {/* Tooltip - always visible on hover */}
                        <div className="absolute left-full ml-2 px-2 py-1 bg-background/90 text-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible visible transition-opacity whitespace-nowrap z-50">
                          {tool.name}
                        </div>
                      </Button>
                      {/* Side drop menu (only visible when toggle is clicked/active, perfectly aligned) */}
                      {isActive && (
                        <div
                          className="absolute left-16 top-0 z-[100] min-w-[180px] bg-white/90 backdrop-blur-lg border border-border rounded-xl shadow-2xl p-2 flex flex-col gap-2 animate-in slide-in-from-left-10"
                        >
                          <button className="text-left px-3 py-2 rounded hover:bg-accent/60 transition font-display text-sm text-foreground">Menu Item 1</button>
                          <button className="text-left px-3 py-2 rounded hover:bg-accent/60 transition font-display text-sm text-foreground">Menu Item 2</button>
                          <button className="text-left px-3 py-2 rounded hover:bg-accent/60 transition font-display text-sm text-foreground">Menu Item 3</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex-1 flex pl-20 h-full overflow-hidden relative z-10">
            {/* Main Chart Area */}
            <div className={isFullScreen ? "fixed inset-0 z-50 bg-background flex flex-col" : "flex-1 relative bg-white h-full overflow-hidden"}>
              {/* Full screen notification */}
              {isFullScreen && showEscNotification && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-6 py-2 rounded-xl shadow-lg font-display text-base animate-in fade-in">
                  Press Esc to minimize
                </div>
              )}
              {/* Chart */}
              <div className={isFullScreen ? "flex-1 w-full overflow-hidden pb-32" : "h-full w-full overflow-hidden pb-32"}>
                <MarketChart symbol={selectedAsset} chartType={chartType} timeframe={timeframe} />
              </div>
              {/* Full screen minimize toggle (top right) */}
              {isFullScreen && (
                <Button variant="outline" className="absolute top-4 right-4 z-50" onClick={() => setIsFullScreen(false)}>
                  <Minimize2 className="h-5 w-5 mr-2" /> Minimize
                </Button>
              )}
            </div>

            {/* Right Sidebar - hide in fullscreen */}
            {!isFullScreen && (
              <div className="bg-white/60 backdrop-blur-lg border border-border rounded-xl shadow-lg flex flex-col h-full w-16 items-center py-6 gap-3 overflow-hidden">
                {/* Watchlist toggle first */}
                <Button
                  variant={showWatchlist ? "default" : "ghost"}
                  size="icon"
                  className={`w-10 h-10 rounded-xl mb-2 transition-all border border-border shadow ${showWatchlist ? "bg-primary/90 text-primary-foreground" : "bg-white/40 text-muted-foreground hover:bg-accent/60"}`}
                  title="Watchlist"
                  onClick={() => setShowWatchlist((v) => !v)}
                >
                  <Star className="h-4 w-4" />
                </Button>
                <Button
                  variant={showTechnical ? "default" : "ghost"}
                  size="icon"
                  className={`w-10 h-10 rounded-xl mb-2 transition-all border border-border shadow ${showTechnical ? "bg-primary/90 text-primary-foreground" : "bg-white/40 text-muted-foreground hover:bg-accent/60"}`}
                  title="Technical Analysis"
                  onClick={() => setShowTechnical((v) => !v)}
                >
                  <Activity className="h-4 w-4" />
                </Button>
                <Button
                  variant={showAlerts ? "default" : "ghost"}
                  size="icon"
                  className={`w-10 h-10 rounded-xl transition-all border border-border shadow ${showAlerts ? "bg-primary/90 text-primary-foreground" : "bg-white/40 text-muted-foreground hover:bg-accent/60"}`}
                  title="Alerts"
                  onClick={() => setShowAlerts((v) => !v)}
                >
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Floating Watchlist - always visible and never clipped */}
            {showWatchlist && !watchlistCollapsed && (
              <div className="fixed right-20 z-50 bg-white/90 backdrop-blur-lg border border-border rounded-2xl shadow-2xl w-96 flex flex-col animate-in slide-in-from-right-10"
                style={{ top: WATCHLIST_TOP, maxHeight: `calc(100vh - ${WATCHLIST_TOP + 16}px)`, minHeight: 320, overflowY: 'auto' }}>
                {/* Watchlist Title (no + toggle) */}
                <div className="p-4 border-b border-border flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg mb-0">Watchlist</h3>
                  </div>
                  {/* Search Bar */}
                  <input
                    type="text"
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-border bg-background/80 shadow-inner font-display text-base focus:outline-none focus:ring-2 focus:ring-primary transition mb-2"
                    style={{ minWidth: 0 }}
                  />
                  {/* Tag Navbar */}
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {tagOptions.map(tag => (
                      <button
                        key={tag}
                        className={`px-4 py-1.5 rounded-full font-display text-sm border border-border transition-all whitespace-nowrap ${selectedTag === tag ? "bg-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground hover:bg-accent/60"}`}
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {assets.map((asset) => (
                    <div
                      key={asset.symbol}
                      className={`flex items-center justify-between p-4 cursor-pointer hover:bg-muted border-b border-border last:border-b-0 ${selectedAsset === asset.symbol ? "bg-primary/10 border-l-4 border-l-primary" : ""}`}
                      onClick={() => setSelectedAsset(asset.symbol)}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(asset.symbol)
                          }}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-4 w-4 transition-colors ${favorites.includes(asset.symbol) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`}
                          />
                        </button>
                        <div>
                          <p className="font-medium text-foreground">{asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{asset.price}</p>
                        <p className={`text-sm flex items-center ${asset.isPositive ? "text-green-600" : "text-red-600"}`}>
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

      {/* Full-Screen Settings Sheet */}
      {showSettingsSheet && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border rounded-t-2xl shadow-2xl p-8 flex flex-col items-center animate-in slide-in-from-bottom-10">
          <button className="absolute top-4 right-4 bg-muted rounded-full p-2 shadow hover:bg-accent transition" onClick={() => setShowSettingsSheet(false)} title="Close">
            <Minimize2 className="h-5 w-5" />
          </button>
          <div className="w-12 h-1.5 bg-muted rounded-full mb-4" />
          <h2 className="font-display font-bold text-lg mb-4">Settings</h2>
          <div className="text-muted-foreground mb-8">(Settings features coming soon)</div>
        </div>
      )}
    </FlexibleLayout>
  )
}
