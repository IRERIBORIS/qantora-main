"use client"

import { useState } from "react"
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="container mx-auto px-4 py-6 pb-24">
          {/* Header with Enhanced Search */}
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">Learning Center</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search courses, articles, authors..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <button
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === "courses"
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveTab("courses")}
            >
              <BookOpen className="h-4 w-4" />
              Courses
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === "articles"
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveTab("articles")}
            >
              <FileText className="h-4 w-4" />
              Articles
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === "videos"
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveTab("videos")}
            >
              <Video className="h-4 w-4" />
              Videos
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {filters[activeTab as keyof typeof filters].map((filter) => (
              <button
                key={filter}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.toLowerCase()
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
                onClick={() => setActiveFilter(filter.toLowerCase())}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "courses" && (
            <div className="space-y-4">
              {isAILoading ? (
                <Card className="border-gray-200 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative mb-4">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                        <Bot className="absolute inset-0 m-auto h-6 w-6 text-gray-900" />
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-2 text-gray-900">
                        Cato AI is Generating Content
                      </h3>
                      <p className="text-gray-600 text-center text-sm">
                        Creating personalized learning materials based on your selected topic...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredCourses.map((category) => (
                  <Card
                    key={category.id}
                    className="border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg font-display">{category.title}</CardTitle>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                category.level === "Beginner"
                                  ? "bg-green-100 text-green-700"
                                  : category.level === "Intermediate"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {category.level}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{category.duration}</span>
                            <span>{category.students.toLocaleString()} students</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{category.rating}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {category.tags.slice(0, 4).map((tag, index) => (
                          <button
                            key={index}
                            className="px-3 py-1 rounded-lg font-medium text-xs transition-all duration-200 whitespace-nowrap bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-sm text-gray-700 hover:text-gray-900 flex-shrink-0"
                            onClick={() => handleTagClick(category.id, tag)}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {activeTab === "articles" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-display font-semibold text-lg text-gray-900">Featured Articles</h2>
                <Dialog open={showCreateArticle} onOpenChange={setShowCreateArticle}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                      <Plus className="h-4 w-4 mr-2" />
                      Write
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-display text-xl">Write New Article</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Article Title</label>
                        <Input
                          placeholder="Enter article title..."
                          value={articleTitle}
                          onChange={(e) => setArticleTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Article Topic</label>
                        <Input
                          placeholder="e.g., Technical Analysis, Options Trading..."
                          value={articleTopic}
                          onChange={(e) => setArticleTopic(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Content</label>
                        <Textarea
                          placeholder="Write your article content..."
                          value={articleContent}
                          onChange={(e) => setArticleContent(e.target.value)}
                          className="min-h-[200px]"
                        />
                      </div>
                      <Button
                        onClick={handlePublishArticle}
                        className="w-full bg-gray-900 hover:bg-gray-800"
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
                  className="border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 bg-white"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          {article.topic}
                        </div>
                        {article.trending && (
                          <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                            <TrendingUp className="h-3 w-3" />
                            Trending
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3
                      className="font-display font-semibold text-lg mb-2 text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
                      onClick={() => handleReadArticle(article.id)}
                    >
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{article.description}</p>

                    {/* Author Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-3 w-3 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-xs text-gray-900">{article.author}</p>
                          <p className="text-xs text-gray-500">{article.date}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFollowAuthor(article.author)}
                        className={`text-xs h-7 ${followedAuthors.includes(article.author) ? "bg-gray-900 text-white" : ""}`}
                      >
                        {followedAuthors.includes(article.author) ? "Following" : "Follow"}
                      </Button>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`hover:bg-gray-100 h-7 text-xs ${likedArticles.includes(article.id) ? "text-red-500" : "text-gray-600"}`}
                          onClick={() => handleLikeArticle(article.id)}
                        >
                          <Heart
                            className={`h-3 w-3 mr-1 ${likedArticles.includes(article.id) ? "fill-current" : ""}`}
                          />
                          {article.likes + (likedArticles.includes(article.id) ? 1 : 0)}
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-100 text-gray-600 h-7 text-xs">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {article.comments}
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-gray-100 text-gray-600 h-7 text-xs"
                          onClick={() => handleViewProfile(article.author)}
                        >
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-gray-100 text-gray-600 h-7 text-xs"
                          onClick={() => handleReadArticle(article.id)}
                        >
                          Read
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "videos" && (
            <div className="flex justify-center items-center h-40">
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-display font-semibold text-xl mb-2 text-gray-900">Video Library Coming Soon</h3>
                <p className="text-gray-500 text-sm">
                  We're building a comprehensive video library with expert trading tutorials.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-6 pb-24">
          {/* Header with Enhanced Search */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-2">Learning Center</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search courses, articles, authors..."
                className="pl-10 w-full md:w-[350px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* One Top Horizontal Bar with Sliding Contextual Filters */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              {/* Navigation Tabs */}
              <div className="flex gap-2">
                <button
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === "courses"
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("courses")}
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="text-base">Courses</span>
                </button>
                <button
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === "articles"
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("articles")}
                >
                  <FileText className="h-5 w-5" />
                  <span className="text-base">Articles</span>
                </button>
                <button
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === "videos"
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("videos")}
                >
                  <Video className="h-5 w-5" />
                  <span className="text-base">Videos</span>
                </button>
              </div>

              {/* Action Button */}
              {activeTab === "articles" && (
                <Dialog open={showCreateArticle} onOpenChange={setShowCreateArticle}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-900 hover:bg-gray-800 gap-2">
                      <Plus className="h-4 w-4" />
                      Write Article
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-display text-xl">Write New Article</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Article Title</label>
                        <Input
                          placeholder="Enter article title..."
                          value={articleTitle}
                          onChange={(e) => setArticleTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Article Topic</label>
                        <Input
                          placeholder="e.g., Technical Analysis, Options Trading..."
                          value={articleTopic}
                          onChange={(e) => setArticleTopic(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Content</label>
                        <Textarea
                          placeholder="Write your article content..."
                          value={articleContent}
                          onChange={(e) => setArticleContent(e.target.value)}
                          className="min-h-[200px]"
                        />
                      </div>
                      <Button
                        onClick={handlePublishArticle}
                        className="w-full bg-gray-900 hover:bg-gray-800"
                        disabled={!articleTitle.trim() || !articleTopic.trim() || !articleContent.trim()}
                      >
                        Publish Article
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Sliding Contextual Filters */}
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-gray-500" />
              <div className="flex gap-2 overflow-x-auto pb-2">
                {filters[activeTab as keyof typeof filters].map((filter) => (
                  <button
                    key={filter}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      activeFilter === filter.toLowerCase()
                        ? "bg-gray-900 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveFilter(filter.toLowerCase())}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              {isAILoading ? (
                <Card className="border-gray-200 shadow-sm bg-white">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                        <Bot className="absolute inset-0 m-auto h-8 w-8 text-gray-900" />
                      </div>
                      <h3 className="font-display font-semibold text-xl md:text-2xl mb-3 text-gray-900">
                        Cato AI is Generating Content
                      </h3>
                      <p className="text-gray-600 text-center max-w-md text-sm md:text-base">
                        Creating personalized learning materials and course content based on your selected topic...
                      </p>
                      <div className="flex gap-2 mt-4">
                        <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCourses.map((category) => (
                    <Card
                      key={category.id}
                      className="border-gray-200 shadow-sm bg-white hover:shadow-lg transition-all duration-200"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <CardTitle className="text-xl font-display">{category.title}</CardTitle>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  category.level === "Beginner"
                                    ? "bg-green-100 text-green-700"
                                    : category.level === "Intermediate"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {category.level}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{category.description}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <span>{category.duration}</span>
                              <span>{category.students.toLocaleString()} students</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{category.rating}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-6 w-6 text-gray-400" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {category.tags.slice(0, 6).map((tag, index) => (
                            <button
                              key={index}
                              className="px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 whitespace-nowrap bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-sm text-gray-700 hover:text-gray-900 flex-shrink-0"
                              onClick={() => handleTagClick(category.id, tag)}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "articles" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="font-display font-semibold text-xl md:text-2xl text-gray-900">Featured Articles</h2>

                <div className="space-y-6">
                  {filteredArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 bg-white"
                    >
                      <CardContent className="p-6 md:p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                              {article.topic}
                            </div>
                            {article.trending && (
                              <div className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                <TrendingUp className="h-4 w-4" />
                                Trending
                              </div>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        <h3
                          className="font-display font-semibold text-xl md:text-2xl mb-3 text-gray-900 hover:text-gray-700 transition-colors cursor-pointer"
                          onClick={() => handleReadArticle(article.id)}
                        >
                          {article.title}
                        </h3>

                        <p className="text-gray-600 mb-6 text-base leading-relaxed">{article.description}</p>

                        {/* Author Info */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{article.author}</p>
                              <p className="text-sm text-gray-600">{article.date}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFollowAuthor(article.author)}
                            className={followedAuthors.includes(article.author) ? "bg-gray-900 text-white" : ""}
                          >
                            {followedAuthors.includes(article.author) ? "Following" : "Follow"}
                          </Button>
                        </div>

                        {/* Engagement */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`hover:bg-gray-100 ${likedArticles.includes(article.id) ? "text-red-500" : "text-gray-600"}`}
                              onClick={() => handleLikeArticle(article.id)}
                            >
                              <Heart
                                className={`h-4 w-4 mr-2 ${likedArticles.includes(article.id) ? "fill-current" : ""}`}
                              />
                              {article.likes + (likedArticles.includes(article.id) ? 1 : 0)}
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-gray-100 text-gray-600">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              {article.comments}
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-gray-100 text-gray-600"
                              onClick={() => handleViewProfile(article.author)}
                            >
                              View Profile
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-gray-100 text-gray-600"
                              onClick={() => handleReadArticle(article.id)}
                            >
                              Read Article
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                <Card className="border-gray-200 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-display">Popular Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Technical Analysis",
                      "Options Trading",
                      "Risk Management",
                      "Market Psychology",
                      "Cryptocurrency",
                      "Forex Trading",
                    ].map((topic) => (
                      <div
                        key={topic}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <span className="text-sm text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-gray-200 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-display">Top Authors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.author} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{article.author}</p>
                            <p className="text-xs text-gray-500">{article.authorBio}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewProfile(article.author)}
                          className="text-xs"
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-gray-200 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-display">Reading Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Articles Read</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">This Week</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Reading Streak</span>
                      <span className="font-medium">12 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Favorite Topic</span>
                      <span className="font-medium">Technical Analysis</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "videos" && (
            <div className="flex justify-center items-center h-60">
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-display font-semibold text-xl mb-2 text-gray-900">Video Library Coming Soon</h3>
                <p className="text-gray-500">
                  We're building a comprehensive video library with expert trading tutorials.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
