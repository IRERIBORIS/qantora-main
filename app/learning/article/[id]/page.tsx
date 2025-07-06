"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, ThumbsUp, MessageCircle } from "lucide-react"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const articleId = params.id

  // Mock article data - in real app, this would be fetched based on ID
  const article = {
    id: articleId,
    title: "Understanding Market Cycles",
    topic: "Market Analysis",
    description: "How to identify and trade different market cycles",
    content: `
      <h2>Introduction to Market Cycles</h2>
      <p>Market cycles are recurring patterns in financial markets that reflect the natural ebb and flow of economic activity, investor sentiment, and market dynamics. Understanding these cycles is crucial for successful trading and investment strategies.</p>
      
      <h3>The Four Phases of Market Cycles</h3>
      <p>Every market cycle consists of four distinct phases:</p>
      
      <h4>1. Accumulation Phase</h4>
      <p>This is the phase where smart money begins to accumulate positions while the general public is still pessimistic. Prices are typically at or near their lows, and volume is relatively low. Key characteristics include:</p>
      <ul>
        <li>Sideways price movement</li>
        <li>Low volatility</li>
        <li>Institutional buying</li>
        <li>Negative sentiment</li>
      </ul>
      
      <h4>2. Markup Phase</h4>
      <p>During this phase, prices begin to rise as more investors recognize the opportunity. This is typically the longest phase of the cycle and offers the best risk-adjusted returns for traders.</p>
      
      <h4>3. Distribution Phase</h4>
      <p>Smart money begins to distribute their positions to the public, who are now optimistic about the market. Prices may continue to rise but at a slower pace.</p>
      
      <h4>4. Markdown Phase</h4>
      <p>This is the decline phase where prices fall as selling pressure increases. This phase can be swift and brutal, catching many retail investors off guard.</p>
      
      <h3>Identifying Market Cycles</h3>
      <p>Several indicators can help identify which phase of the cycle the market is in:</p>
      
      <h4>Technical Indicators</h4>
      <ul>
        <li><strong>Moving Averages:</strong> The relationship between price and moving averages can indicate trend direction</li>
        <li><strong>Volume Analysis:</strong> Volume patterns often precede price movements</li>
        <li><strong>Momentum Oscillators:</strong> RSI, MACD, and other oscillators can show momentum shifts</li>
      </ul>
      
      <h4>Fundamental Indicators</h4>
      <ul>
        <li><strong>Economic Data:</strong> GDP growth, employment figures, inflation rates</li>
        <li><strong>Corporate Earnings:</strong> Earnings growth and guidance</li>
        <li><strong>Interest Rates:</strong> Central bank policy and yield curve analysis</li>
      </ul>
      
      <h3>Trading Strategies for Each Phase</h3>
      
      <h4>Accumulation Phase Strategy</h4>
      <p>Focus on building positions in quality assets at attractive prices. Use dollar-cost averaging and be patient.</p>
      
      <h4>Markup Phase Strategy</h4>
      <p>Ride the trend and add to winning positions. Use trend-following strategies and momentum indicators.</p>
      
      <h4>Distribution Phase Strategy</h4>
      <p>Begin taking profits and reducing position sizes. Look for signs of weakness and prepare for the next cycle.</p>
      
      <h4>Markdown Phase Strategy</h4>
      <p>Protect capital through hedging or cash positions. Look for short-selling opportunities in weak sectors.</p>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li>Fighting the trend during markup and markdown phases</li>
        <li>Getting emotional during extreme phases</li>
        <li>Ignoring risk management principles</li>
        <li>Trying to time exact tops and bottoms</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Understanding market cycles provides a framework for making better trading and investment decisions. While cycles don't repeat exactly, they do rhyme, and recognizing the patterns can give you a significant edge in the markets.</p>
      
      <p>Remember that successful trading requires patience, discipline, and continuous learning. Use market cycle analysis as one tool in your trading toolkit, combined with proper risk management and a well-defined strategy.</p>
    `,
    readTime: "8 min read",
    date: "Jul 15, 2023",
    author: "Sarah Johnson",
    authorBio: "Senior Market Analyst with 15+ years of experience in equity research and technical analysis.",
    likes: 234,
    comments: 45,
    bookmarks: 89,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Center
          </Button>

          <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
            {article.topic}
          </div>

          <h1 className="font-display font-bold text-4xl text-gray-900 mb-4 leading-tight">{article.title}</h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="hover:bg-gray-100 bg-transparent">
                <Bookmark className="h-4 w-4 mr-1" />
                {article.bookmarks}
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-gray-100 bg-transparent">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-gray-200 shadow-sm bg-white">
              <CardContent className="p-8">
                <div
                  className="prose prose-gray max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </CardContent>
            </Card>

            {/* Engagement Section */}
            <Card className="border-gray-200 shadow-sm bg-white mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <Button variant="ghost" className="hover:bg-gray-100">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {article.likes} Likes
                    </Button>
                    <Button variant="ghost" className="hover:bg-gray-100">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {article.comments} Comments
                    </Button>
                  </div>
                  <Button className="bg-gray-900 hover:bg-gray-800">Follow Author</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Author Info */}
              <Card className="border-gray-200 shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-gray-900">{article.author}</h3>
                      <p className="text-sm text-gray-600">Market Analyst</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{article.authorBio}</p>
                  <Button variant="outline" className="w-full hover:bg-gray-100 bg-transparent">
                    View Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card className="border-gray-200 shadow-sm bg-white">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-4 text-gray-900">Related Articles</h3>
                  <div className="space-y-4">
                    <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">The Psychology of FOMO in Trading</h4>
                      <p className="text-xs text-gray-600">6 min read</p>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">Building a Robust Trading Plan</h4>
                      <p className="text-xs text-gray-600">10 min read</p>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">Understanding Options Greeks</h4>
                      <p className="text-xs text-gray-600">12 min read</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Table of Contents */}
              <Card className="border-gray-200 shadow-sm bg-white">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-4 text-gray-900">Table of Contents</h3>
                  <div className="space-y-2 text-sm">
                    <a href="#introduction" className="block text-gray-700 hover:text-gray-900 transition-colors">
                      Introduction to Market Cycles
                    </a>
                    <a href="#phases" className="block text-gray-700 hover:text-gray-900 transition-colors">
                      The Four Phases
                    </a>
                    <a href="#identifying" className="block text-gray-700 hover:text-gray-900 transition-colors">
                      Identifying Market Cycles
                    </a>
                    <a href="#strategies" className="block text-gray-700 hover:text-gray-900 transition-colors">
                      Trading Strategies
                    </a>
                    <a href="#mistakes" className="block text-gray-700 hover:text-gray-900 transition-colors">
                      Common Mistakes
                    </a>
                    <a href="#conclusion" className="block text-gray-700 hover:text-gray-900 transition-colors">
                      Conclusion
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
