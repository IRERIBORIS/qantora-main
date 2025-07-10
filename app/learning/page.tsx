"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Bot,
  BookOpen,
  FileText,
  Video,
  Clock,
  ArrowRight,
  ChevronRight,
  Heart,
  MessageCircle,
  User,
  Filter,
  TrendingUp,
  Star,
} from "lucide-react"
import '../../styles/globals.css'

export default function LearningPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("courses")
  const [activeFilter, setActiveFilter] = useState("all")
  const [showCreateArticle, setShowCreateArticle] = useState(false)
  const [articleTitle, setArticleTitle] = useState("")
  const [articleTopic, setArticleTopic] = useState("")
  const [articleContent, setArticleContent] = useState("")
  const [isAILoading, setIsAILoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [likedArticles, setLikedArticles] = useState<number[]>([])
  const [followedAuthors, setFollowedAuthors] = useState<string[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const tab = params.get("tab")
      if (tab === "articles" || tab === "courses" || tab === "videos") {
        setActiveTab(tab)
      }
    }
  }, [])

  const filters = {
    courses: ["All", "Beginner", "Intermediate", "Advanced", "Popular", "New"],
    articles: ["All", "Latest", "Popular", "Trending", "Bookmarked", "Following"],
    videos: ["All", "Tutorials", "Webinars", "Live Sessions", "Recorded", "Premium"],
  }

  const courseCategories = [
    {
      id: "stock-analysis",
      title: "Stock Market Analysis",
      description: "Master the art of analyzing stocks and market trends",
      level: "Intermediate",
      duration: "8 weeks",
      students: 2456,
      rating: 4.8,
      tags: [
        "Stock Trading",
        "Equity Research",
        "Fundamental Analysis",
        "Technical Analysis",
        "Earnings Reports",
        "Market Trends",
        "Sector Rotation",
        "Blue Chip Stocks",
        "Growth Stocks",
        "Value Investing",
      ],
    },
    {
      id: "crypto-blockchain",
      title: "Cryptocurrency & Blockchain",
      description: "Navigate the world of digital assets and blockchain technology",
      level: "Beginner",
      duration: "6 weeks",
      students: 3421,
      rating: 4.9,
      tags: [
        "Crypto News",
        "Bitcoin",
        "Altcoins",
        "DeFi",
        "NFTs",
        "Blockchain Tech",
        "Crypto Wallet",
        "Tokenomics",
        "Smart Contracts",
        "Web3",
      ],
    },
    {
      id: "forex-strategies",
      title: "Forex Trading Strategies",
      description: "Learn currency trading and foreign exchange markets",
      level: "Advanced",
      duration: "10 weeks",
      students: 1892,
      rating: 4.7,
      tags: [
        "Forex Market",
        "Currency Pairs",
        "FX Signals",
        "Pip Calculator",
        "Leverage Trading",
        "Carry Trade",
        "Central Banks",
        "Economic Calendar",
        "Price Action Trading",
        "Risk Reward Ratio",
      ],
    },
    {
      id: "options-derivatives",
      title: "Options & Derivatives",
      description: "Advanced trading with options and derivative instruments",
      level: "Advanced",
      duration: "12 weeks",
      students: 987,
      rating: 4.6,
      tags: [
        "Options Trading",
        "Call Options",
        "Put Options",
        "Implied Volatility",
        "Options Chain",
        "Theta Decay",
        "Gamma Exposure",
        "Straddle",
        "Iron Condor",
        "Futures Trading",
      ],
    },
  ]

  const articles = [
    {
      id: 1,
      title: "Understanding Market Cycles",
      topic: "Market Analysis",
      description: "How to identify and trade different market cycles",
      readTime: "8 min read",
      date: "Jul 15, 2023",
      author: "Sarah Johnson",
      authorBio: "Senior Market Analyst with 15+ years of experience",
      likes: 234,
      comments: 45,
      trending: true,
    },
    {
      id: 2,
      title: "The Psychology of FOMO in Trading",
      topic: "Trading Psychology",
      description: "How fear of missing out affects your trading decisions",
      readTime: "6 min read",
      date: "Jul 12, 2023",
      author: "Michael Chen",
      authorBio: "Trading Psychology Expert and Author",
      likes: 189,
      comments: 32,
      trending: false,
    },
  ]

  const handleTagClick = (categoryId: string, tag: string) => {
    setIsAILoading(true)
    setSelectedCategory(categoryId)

    // Simulate AI content generation
    setTimeout(() => {
      setIsAILoading(false)
    }, 3000)
  }

  const handlePublishArticle = () => {
    if (articleTitle.trim() && articleTopic.trim() && articleContent.trim()) {
      setArticleTitle("")
      setArticleTopic("")
      setArticleContent("")
      setShowCreateArticle(false)
    }
  }

  const handleReadArticle = (articleId: number) => {
    router.push(`/learning/article/${articleId}`)
  }

  const handleLikeArticle = (articleId: number) => {
    setLikedArticles((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId],
    )
  }

  const handleFollowAuthor = (author: string) => {
    setFollowedAuthors((prev) => (prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]))
  }

  const handleViewProfile = (author: string) => {
    const username = author.toLowerCase().replace(/\s+/g, "")
    router.push(`/community/profile/${username}`)
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCourses = courseCategories.filter((course) => {
    if (activeFilter === "all") return true
    if (activeFilter === "beginner") return course.level === "Beginner"
    if (activeFilter === "intermediate") return course.level === "Intermediate"
    if (activeFilter === "advanced") return course.level === "Advanced"
    if (activeFilter === "popular") return course.students > 2000
    if (activeFilter === "new") return course.id === "crypto-blockchain"
    return true
  })

  return (
    <div className="bg-background text-foreground flex flex-col">
      {/* Mobile Layout */}
      <div className="block lg:hidden min-h-screen">
        {/* Polished Learning Center Title */}
        <div className="w-full pt-4 pb-1 sm:pt-6 sm:pb-2">
          <h1 className="font-display font-semibold text-lg sm:text-xl md:text-2xl tracking-tight text-foreground pl-3 sm:pl-4 md:pl-8 drop-shadow-sm">Learning Center</h1>
        </div>
        {/* Top Bar: Modern, short, glassy, sticky, clearly visible */}
        <div className="w-full bg-card/80 backdrop-blur-md sticky top-0 z-10 h-10 border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center h-full px-0 overflow-x-auto scrollbar-hide">
          {[
            { id: "courses", label: "Courses" },
            { id: "articles", label: "Articles" },
            { id: "videos", label: "Videos" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`relative flex-1 h-full px-2 sm:px-4 flex items-center justify-center font-display transition-colors text-sm sm:text-base border-0 bg-transparent outline-none cursor-pointer min-w-[80px] sm:min-w-[100px] md:min-w-[120px]"
                ${activeTab === tab.id
                  ? "text-primary font-semibold border-b-2 border-primary"
                  : "text-foreground/70 font-medium hover:text-primary hover:bg-accent/40 hover:border-b-2 hover:border-primary/60"}
              `}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Main Content: Responsive for mobile/iPad */}
      <div className="w-full flex-1 pt-3 pl-2 pr-2 sm:pl-4 sm:pr-4 md:pl-8 md:pr-8">
        {activeTab === "courses" && (
          <div className="w-full overflow-y-auto pb-24" style={{height: 'calc(100vh - 5rem)'}}>
            {/* Example for one section, repeat for others */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Stock Market Analysis</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Master the art of analyzing stocks and market trends</p>
            </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Stock Trading","Equity Research","Fundamental Analysis","Technical Analysis","Earnings Reports","Market Trends","Sector Rotation","Growth Stocks","Value Investing","Stock Screening","Dividend Stocks","Market Volatility","Chart Patterns","Trade Ideas","Investor Sentiment","Price Action","Swing Trading","Short Squeeze"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('stock-market-analysis', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
              )}
                          </div>

            {/* Cryptocurrency & Blockchain */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Cryptocurrency & Blockchain</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Navigate the digital asset revolution and decentralized technologies</p>
                            </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Crypto News", "Bitcoin", "Altcoins", "DeFi", "NFTs", "Blockchain Tech", "Crypto Wallet", "Tokenomics", "Smart Contracts", "Web3", "Crypto Exchange", "Mining", "Staking", "DYOR", "Market Cap", "Bull Run", "Bear Market", "Gas Fees", "Airdrops", "Meme Coins"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('crypto-blockchain', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                          </div>
              )}
                        </div>

            {/* Forex Trading Strategies */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Forex Trading Strategies</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Develop expertise in global currency markets and exchange mechanisms</p>
                      </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Forex Market", "Currency Pairs", "FX Signals", "Pip Calculator", "Leverage Trading", "Carry Trade", "Central Banks", "Economic Calendar", "Forex Broker", "MT4", "MT5", "Price Action Trading", "Risk Reward Ratio", "Volatility Index", "Hedging", "Scalping", "Order Flow", "Liquidity", "Candlestick"].map((tag) => (
                          <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('forex-trading-strategies', tag)}
                  type="button"
                          >
                            {tag}
                          </button>
                        ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                      </div>
              )}
            </div>

            {/* Options & Derivatives */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Options & Derivatives</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Master sophisticated contracts and risk-controlled speculation</p>
            </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Options Trading", "Call Options", "Put Options", "Implied Volatility", "Options Chain", "Theta Decay", "Gamma Exposure", "Straddle", "Strangle", "Iron Condor", "Futures Trading", "Hedging Strategies", "Premium Selling", "Volume Analysis", "Open Interest", "LEAPS", "Assignment Risk", "Backtesting", "Vega Risk", "Zero DTE"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('options-derivatives', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                      </div>
              )}
                      </div>

            {/* Technical Analysis Mastery */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Technical Analysis Mastery</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Decode price movements through chart patterns and indicators</p>
                      </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Charting", "Support Resistance", "Moving Averages", "RSI", "MACD", "Fibonacci", "Bollinger Bands", "Volume Profile", "Wyckoff Method", "Elliott Wave", "Breakout Trading", "Backtesting", "TradingView", "Price Targets", "Divergence", "Candlestick Patterns", "Trend Lines", "Market Structure", "Algo Indicators", "Multi Timeframe"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('technical-analysis-mastery', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
              )}
              </div>

            {/* Value Investing Principles */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Value Investing Principles</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Build wealth through fundamental business analysis</p>
            </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Warren Buffett", "Benjamin Graham", "DCF", "Financial Statements", "ROIC", "Margin of Safety", "Moats", "Contrarian Investing", "Sec Filings", "Shareholder Yield", "Undervalued Stocks", "Quality Companies", "Long Term Hold", "Portfolio Concentration", "Economic Moats", "Free Cash Flow", "Buy And Hold", "Value Traps", "ROE", "EVEBITDA"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('value-investing-principles', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                          </div>
                        )}
                      </div>

            {/* Day Trading Tactics */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Day Trading Tactics</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Execute rapid-fire trades in volatile market sessions</p>
            </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Day Trading", "Momentum Trading", "Pre Market", "Power Hour", "Volume Spike", "Tape Reading", "Level 2", "Order Flow", "Risk Management", "Trade Journal", "Trade Execution", "Hot Stocks", "Gap Fill", "Runners", "Stop Loss", "Profit Targets", "Trade Recap", "Market Open", "Screenshot Trading", "Trade Psychology"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('day-trading-tactics', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                      </div>
              )}
                    </div>

            {/* Economic Indicators Digest */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Economic Indicators Digest</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Interpret macroeconomic data for strategic advantage</p>
            </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["GDP", "Inflation", "CPI", "PPI", "Unemployment Rate", "Interest Rates", "Fed Policy", "Yield Curve", "Retail Sales", "Housing Data", "Manufacturing PMI", "Consumer Sentiment", "Central Banks", "Recession Signals", "Monetary Policy", "Fiscal Policy", "Commodity Prices", "Trade Balance", "Economic Forecast", "Global Macro"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('economic-indicators-digest', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                        </div>
              )}
                        </div>

            {/* Risk Management Framework */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Risk Management Framework</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Protect capital through systematic defense protocols</p>
                      </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Position Sizing", "Stop Loss", "Drawdown Control", "Volatility Adjusting", "Hedging", "Diversification", "Kelly Criterion", "Risk Reward", "Portfolio Beta", "Correlation Risk", "Stress Testing", "Tail Risk", "Liquidity Risk", "Max Pain", "Risk Metrics", "Black Swan", "Margin Call", "Hedging Strategies", "Volatility Targeting", "Monte Carlo"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('risk-management-framework', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                </div>
              )}
                    </div>

            {/* Portfolio Diversification */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Portfolio Diversification</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Optimize asset allocation across market conditions</p>
                      </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Asset Allocation", "Modern Portfolio Theory", "ETFs", "Index Funds", "Geographic Diversification", "Sector Diversification", "Rebalancing", "Correlation Matrix", "Multi Asset", "Risk Parity", "Core Satellite", "Tactical Allocation", "Factor Investing", "Inflation Hedges", "Gold", "Real Assets", "Liquidity Management", "Drawdown Control", "Portfolio Review", "Target Date Funds"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('portfolio-diversification', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                </div>
              )}
            </div>

            {/* Behavioral Finance Insights */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Behavioral Finance Insights</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Overcome psychological barriers to trading success</p>
              </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Trading Psychology", "FOMO", "Loss Aversion", "Confirmation Bias", "Emotional Trading", "Herd Mentality", "Discipline", "Patience", "Overconfidence", "Risk Perception", "Cognitive Biases", "Mental Models", "Journaling", "Meditation", "Biofeedback", "Trader Mindset", "Focus Training", "Stress Management", "Decision Fatigue", "Probabilistic Thinking"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('behavioral-finance-insights', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
            </div>
          )}
      </div>

            {/* Commodities Spotlight */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Commodities Spotlight</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Trade physical assets from oil to agricultural products</p>
            </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Gold Trading", "Oil Prices", "Natural Gas", "Agriculture", "Base Metals", "Futures Contracts", "Contango", "Backwardation", "Commodity ETFs", "Supply Demand", "Seasonality", "Weather Trading", "Inventory Data", "OPEC", "Shipping Rates", "Soft Commodities", "Precious Metals", "Commodity Cycles", "Roll Yield", "Physical Delivery"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('commodities-spotlight', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                </div>
              )}
            </div>

            {/* Swing Trading Tactics */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Swing Trading Tactics</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Capture multi-day market movements with precision timing</p>
          </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["Swing Trading", "Trend Following", "Pullback Entries", "Breakout Retest", "Position Trading", "Multi Day Holds", "Weekly Charts", "Overnight Risk", "Gap Trading", "Relative Strength", "Sector Leaders", "Trade Management", "Fibonacci Retracement", "Volatility Contraction", "Catalyst Trading", "Earnings Play", "Holding Period", "Risk Control", "Profit Taking"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('swing-trading-tactics', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                </div>
              )}
            </div>

            {/* Real Estate Investing */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Real Estate Investing</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Build wealth through property and REIT strategies</p>
            </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
              {["REITs", "Rental Properties", "Commercial Real Estate", "Fix And Flip", "BRRRR", "Cash Flow Investing", "Cap Rate", "Appreciation", "1031 Exchange", "Property Management", "Mortgage Rates", "Vacancy Rates", "Real Estate Crowdfunding", "Location Analysis", "Zoning Laws", "REIT Dividends", "Affordable Housing", "Real Estate Tech", "Market Cycles", "Due Diligence"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('real-estate-investing', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                </div>
              )}
            </div>

            {/* Algorithmic Trading Systems */}
            <div className="w-full text-left mb-6 sm:mb-8">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Algorithmic Trading Systems</h2>
              <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Automate strategies using quantitative models</p>
            </div>
            <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-32 hide-scrollbar flex-nowrap justify-start items-stretch">
              {["Quant Trading", "Backtesting", "Python Trading", "Machine Learning", "API", "Execution Algo", "Quantitative Analysis", "Strategy Development", "Data Feeds", "HFT", "Statistical Arbitrage", "Mean Reversion", "Regression Analysis", "Black Litterman", "Time Series", "QuantConnect", "Risk Modeling", "Execution Speed", "Cloud Computing", "Strategy Optimization"].map((tag) => (
                <button
                  key={tag}
                  className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                  onClick={() => handleTagClick('algorithmic-trading-systems', tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
              {isAILoading && (
                <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                </div>
              )}
            </div>
              </div>
        )}
              {activeTab === "articles" && (
            <div className="space-y-3 sm:space-y-4 px-1 sm:px-4 md:pl-8 md:pr-16">
          <div className="flex justify-end items-center mb-2">
                <Dialog open={showCreateArticle} onOpenChange={setShowCreateArticle}>
                  <DialogTrigger asChild>
                <Button size="sm" variant="default">
                      <Plus className="h-4 w-4 mr-2" />
                      Write Article
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-2xl px-2 py-4 sm:px-6 sm:py-6">
                    <DialogHeader>
                      <DialogTitle className="font-display text-lg sm:text-xl">Write New Article</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Article Title</label>
                        <Input
                          className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                          placeholder="Enter article title..."
                          value={articleTitle}
                          onChange={(e) => setArticleTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Article Topic</label>
                        <Input
                          className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                          placeholder="e.g., Technical Analysis, Options Trading..."
                          value={articleTopic}
                          onChange={(e) => setArticleTopic(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Content</label>
                        <Textarea
                          className="min-h-[120px] sm:min-h-[200px] text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                          placeholder="Write your article content..."
                          value={articleContent}
                          onChange={(e) => setArticleContent(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handlePublishArticle}
                        className="w-full text-xs sm:text-sm py-2 sm:py-3"
                        disabled={!articleTitle.trim() || !articleTopic.trim() || !articleContent.trim()}
                      >
                        Publish Article
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
                  {filteredArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="border-border shadow-sm hover:shadow-lg transition-all duration-200 bg-card/90 px-2 py-2 sm:px-4 sm:py-4"
                    >
                      <CardContent className="p-2 sm:p-4">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="bg-accent/40 text-accent-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                              {article.topic}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <h3
                          className="font-display font-semibold text-base sm:text-xl mb-2 sm:mb-3 text-foreground hover:text-primary transition-colors cursor-pointer"
                          onClick={() => handleReadArticle(article.id)}
                        >
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-base mb-2 sm:mb-4 line-clamp-2">{article.description}</p>
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-base text-muted-foreground">
                          <span>{article.date}</span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4 sm:h-5 sm:w-5" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${likedArticles.includes(article.id) ? "text-red-500" : "text-muted-foreground"}`} onClick={() => handleLikeArticle(article.id)} />
                            {article.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                            {article.comments}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          )}
          {activeTab === "videos" && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-2 sm:px-4 md:px-0">
          <Video className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-4 sm:mb-6" />
          <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-bold mb-2 text-foreground">Video Library Coming Soon</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto">We're building a comprehensive video library with expert trading tutorials.</p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block fixed inset-0 bg-background" style={{ top: '64px', height: 'calc(100vh - 64px)' }}>
        <div className="flex flex-col h-full">
          {/* Polished Learning Center Title */}
          <div className="w-full pt-4 pb-1 sm:pt-6 sm:pb-2">
            <h1 className="font-display font-semibold text-lg sm:text-xl md:text-2xl tracking-tight text-foreground pl-3 sm:pl-4 md:pl-8 drop-shadow-sm">Learning Center</h1>
          </div>
          {/* Top Bar: Modern, short, glassy, sticky, clearly visible */}
          <div className="w-full bg-card/80 backdrop-blur-md sticky top-0 z-10 h-10 border-b border-border shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center h-full px-0 overflow-x-auto scrollbar-hide">
              {[
                { id: "courses", label: "Courses" },
                { id: "articles", label: "Articles" },
                { id: "videos", label: "Videos" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`relative flex-1 h-full px-2 sm:px-4 flex items-center justify-center font-display transition-colors text-sm sm:text-base border-0 bg-transparent outline-none cursor-pointer min-w-[80px] sm:min-w-[100px] md:min-w-[120px]"
                    ${activeTab === tab.id
                      ? "text-primary font-semibold border-b-2 border-primary"
                      : "text-foreground/70 font-medium hover:text-primary hover:bg-accent/40 hover:border-b-2 hover:border-primary/60"}
                  `}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {/* Main Content: Responsive for desktop */}
          <div className="w-full flex-1 pt-3 pl-2 pr-2 sm:pl-4 sm:pr-4 md:pl-8 md:pr-8 overflow-hidden">
            {activeTab === "courses" && (
              <div className="w-full overflow-y-auto h-full pb-8">
                {/* Stock Market Analysis */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Stock Market Analysis</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Master the art of analyzing stocks and market trends</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["Stock Trading","Equity Research","Fundamental Analysis","Technical Analysis","Earnings Reports","Market Trends","Sector Rotation","Growth Stocks","Value Investing","Stock Screening","Dividend Stocks","Market Volatility","Chart Patterns","Trade Ideas","Investor Sentiment","Price Action","Swing Trading","Short Squeeze"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('stock-market-analysis', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Cryptocurrency & Blockchain */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Cryptocurrency & Blockchain</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Navigate the digital asset revolution and decentralized technologies</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["Crypto News", "Bitcoin", "Altcoins", "DeFi", "NFTs", "Blockchain Tech", "Crypto Wallet", "Tokenomics", "Smart Contracts", "Web3", "Crypto Exchange", "Mining", "Staking", "DYOR", "Market Cap", "Bull Run", "Bear Market", "Gas Fees", "Airdrops", "Meme Coins"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('crypto-blockchain', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Forex Trading Strategies */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Forex Trading Strategies</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Develop expertise in global currency markets and exchange mechanisms</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["Forex Market", "Currency Pairs", "FX Signals", "Pip Calculator", "Leverage Trading", "Carry Trade", "Central Banks", "Economic Calendar", "Forex Broker", "MT4", "MT5", "Price Action Trading", "Risk Reward Ratio", "Volatility Index", "Hedging", "Scalping", "Order Flow", "Liquidity", "Candlestick"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('forex-trading-strategies', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Options & Derivatives */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Options & Derivatives</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Master sophisticated contracts and risk-controlled speculation</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["Options Trading", "Call Options", "Put Options", "Implied Volatility", "Options Chain", "Theta Decay", "Gamma Exposure", "Straddle", "Strangle", "Iron Condor", "Futures Trading", "Hedging Strategies", "Premium Selling", "Volume Analysis", "Open Interest", "LEAPS", "Assignment Risk", "Backtesting", "Vega Risk", "Zero DTE"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('options-derivatives', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Technical Analysis Mastery */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Technical Analysis Mastery</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Decode price movements through chart patterns and indicators</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["Charting", "Support Resistance", "Moving Averages", "RSI", "MACD", "Fibonacci", "Bollinger Bands", "Volume Profile", "Wyckoff Method", "Elliott Wave", "Breakout Trading", "Backtesting", "TradingView", "Price Targets", "Divergence", "Candlestick Patterns", "Trend Lines", "Market Structure", "Algo Indicators", "Multi Timeframe"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('technical-analysis-mastery', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Value Investing Principles */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Value Investing Principles</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Build wealth through fundamental business analysis</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["Warren Buffett", "Benjamin Graham", "DCF", "Financial Statements", "ROIC", "Margin of Safety", "Moats", "Contrarian Investing", "Sec Filings", "Shareholder Yield", "Undervalued Stocks", "Quality Companies", "Long Term Hold", "Portfolio Concentration", "Economic Moats", "Free Cash Flow", "Buy And Hold", "Value Traps", "ROE", "EVEBITDA"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('value-investing-principles', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Day Trading Tactics */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Day Trading Tactics</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Execute rapid-fire trades in volatile market sessions</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["Day Trading", "Momentum Trading", "Pre Market", "Power Hour", "Volume Spike", "Tape Reading", "Level 2", "Order Flow", "Risk Management", "Trade Journal", "Trade Execution", "Hot Stocks", "Gap Fill", "Runners", "Stop Loss", "Profit Targets", "Trade Recap", "Market Open", "Screenshot Trading", "Trade Psychology"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('day-trading-tactics', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Economic Indicators Digest */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Economic Indicators Digest</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Interpret macroeconomic data for strategic advantage</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["GDP", "Inflation", "CPI", "PPI", "Unemployment Rate", "Interest Rates", "Fed Policy", "Yield Curve", "Retail Sales", "Housing Data", "Manufacturing PMI", "Consumer Sentiment", "Central Banks", "Recession Signals", "Monetary Policy", "Fiscal Policy", "Commodity Prices", "Trade Balance", "Economic Forecast", "Global Macro"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('economic-indicators-digest', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Risk Management Framework */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Risk Management Framework</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Protect capital through systematic risk control</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["Position Sizing", "Stop Loss", "Risk Reward", "Portfolio Risk", "Correlation", "Diversification", "Drawdown", "Kelly Criterion", "VaR", "Stress Testing", "Risk Metrics", "Capital Preservation", "Risk Tolerance", "Portfolio Heat", "Risk Budget", "Hedging", "Insurance", "Risk Adjusted Returns", "Volatility Targeting", "Risk Parity"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('risk-management-framework', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Swing Trading Tactics */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Swing Trading Tactics</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Capture multi-day market movements with precision timing</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["Swing Trading", "Trend Following", "Pullback Entries", "Breakout Retest", "Position Trading", "Multi Day Holds", "Weekly Charts", "Overnight Risk", "Gap Trading", "Relative Strength", "Sector Leaders", "Trade Management", "Fibonacci Retracement", "Volatility Contraction", "Catalyst Trading", "Earnings Play", "Holding Period", "Risk Control", "Profit Taking"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('swing-trading-tactics', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Real Estate Investing */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Real Estate Investing</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Build wealth through property and REIT strategies</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 flex-nowrap justify-start items-stretch">
                  {["REITs", "Rental Properties", "Commercial Real Estate", "Fix And Flip", "BRRRR", "Cash Flow Investing", "Cap Rate", "Appreciation", "1031 Exchange", "Property Management", "Mortgage Rates", "Vacancy Rates", "Real Estate Crowdfunding", "Location Analysis", "Zoning Laws", "REIT Dividends", "Affordable Housing", "Real Estate Tech", "Market Cycles", "Due Diligence"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('real-estate-investing', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>

                {/* Algorithmic Trading Systems */}
                <div className="w-full text-left mb-6 sm:mb-8">
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-1 w-full text-left">Algorithmic Trading Systems</h2>
                  <p className="text-foreground text-sm sm:text-base md:text-lg font-medium w-full text-left">Automate strategies using quantitative models</p>
                </div>
                <div className="w-full flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-32 hide-scrollbar flex-nowrap justify-start items-stretch">
                  {["Quant Trading", "Backtesting", "Python Trading", "Machine Learning", "API", "Execution Algo", "Quantitative Analysis", "Strategy Development", "Data Feeds", "HFT", "Statistical Arbitrage", "Mean Reversion", "Regression Analysis", "Black Litterman", "Time Series", "QuantConnect", "Risk Modeling", "Execution Speed", "Cloud Computing", "Strategy Optimization"].map((tag) => (
                    <button
                      key={tag}
                      className="min-w-[110px] max-w-xs bg-white/60 dark:bg-card/70 border border-border/50 rounded-xl shadow px-4 py-2 flex items-center justify-center font-display font-medium text-sm md:text-base text-foreground text-center transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary active:scale-98"
                      onClick={() => handleTagClick('algorithmic-trading-systems', tag)}
                      type="button"
                    >
                      {tag}
                    </button>
                  ))}
                  {isAILoading && (
                    <div className="min-w-[180px] max-w-xs flex items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === "articles" && (
              <div className="w-full overflow-y-auto h-full pb-8">
                {/* Copy articles content here */}
                <div className="space-y-3 sm:space-y-4 px-1 sm:px-4 md:pl-8 md:pr-16">
                  <div className="flex justify-end items-center mb-2">
                    <Dialog open={showCreateArticle} onOpenChange={setShowCreateArticle}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="default">
                          <Plus className="h-4 w-4 mr-2" />
                          Write Article
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-2xl px-2 py-4 sm:px-6 sm:py-6">
                        <DialogHeader>
                          <DialogTitle className="font-display text-lg sm:text-xl">Write New Article</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Article Title</label>
                            <Input
                              className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                              placeholder="Enter article title..."
                              value={articleTitle}
                              onChange={(e) => setArticleTitle(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Article Topic</label>
                            <Input
                              className="text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                              placeholder="e.g., Technical Analysis, Options Trading..."
                              value={articleTopic}
                              onChange={(e) => setArticleTopic(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Content</label>
                            <Textarea
                              className="min-h-[120px] sm:min-h-[200px] text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2"
                              placeholder="Write your article content..."
                              value={articleContent}
                              onChange={(e) => setArticleContent(e.target.value)}
                            />
                          </div>
                          <Button
                            onClick={handlePublishArticle}
                            className="w-full text-xs sm:text-sm py-2 sm:py-3"
                            disabled={!articleTitle.trim() || !articleTopic.trim() || !articleContent.trim()}
                          >
                            Publish Article
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {filteredArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="border-border shadow-sm hover:shadow-lg transition-all duration-200 bg-card/90 px-2 py-2 sm:px-4 sm:py-4"
                    >
                      <CardContent className="p-2 sm:p-4">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="bg-accent/40 text-accent-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                              {article.topic}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <h3
                          className="font-display font-semibold text-base sm:text-xl mb-2 sm:mb-3 text-foreground hover:text-primary transition-colors cursor-pointer"
                          onClick={() => handleReadArticle(article.id)}
                        >
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-base mb-2 sm:mb-4 line-clamp-2">{article.description}</p>
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-base text-muted-foreground">
                          <span>{article.date}</span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4 sm:h-5 sm:w-5" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${likedArticles.includes(article.id) ? "text-red-500" : "text-muted-foreground"}`} onClick={() => handleLikeArticle(article.id)} />
                            {article.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                            {article.comments}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "videos" && (
              <div className="w-full overflow-y-auto h-full pb-8">
                <div className="flex flex-col items-center justify-center h-[60vh] text-center px-2 sm:px-4 md:px-0">
                  <Video className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-4 sm:mb-6" />
                  <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-bold mb-2 text-foreground">Video Library Coming Soon</h2>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto">We're building a comprehensive video library with expert trading tutorials.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    <style jsx global>{`
      .hide-scrollbar {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none; /* Chrome/Safari/Webkit */
      }
    `}</style>
    </div>
  )
}
