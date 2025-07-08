"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, ThumbsUp, MessageCircle, Eye, TrendingUp } from "lucide-react"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const articleId = params.id

  // Mock article data - in real app, this would be fetched based on ID
  const article = {
    id: articleId,
    title: "Understanding Market Cycles: A Comprehensive Guide to Trading Success",
    topic: "Market Analysis",
    description: "How to identify and trade different market cycles",
    content: `
      <h2>Introduction to Market Cycles</h2>
      <p>Market cycles are recurring patterns in financial markets that reflect the natural ebb and flow of economic activity, investor sentiment, and market dynamics. Understanding these cycles is crucial for successful trading and investment strategies.</p>
      
      <p>Every market, whether it's stocks, bonds, commodities, or cryptocurrencies, goes through predictable phases. These cycles can last from months to years, and recognizing where you are in the cycle can dramatically improve your trading performance.</p>
      
      <h3>The Four Phases of Market Cycles</h3>
      <p>Every market cycle consists of four distinct phases, each with its own characteristics and trading opportunities:</p>
      
      <h4>1. Accumulation Phase</h4>
      <p>This is the phase where smart money begins to accumulate positions while the general public is still pessimistic. Prices are typically at or near their lows, and volume is relatively low. Key characteristics include:</p>
      <ul>
        <li>Sideways price movement with low volatility</li>
        <li>Institutional buying under the radar</li>
        <li>Negative sentiment and fear in the market</li>
        <li>Low trading volume and lack of interest</li>
        <li>Fundamental value emerging but not yet recognized</li>
      </ul>
      
      <h4>2. Markup Phase</h4>
      <p>During this phase, prices begin to rise as more investors recognize the opportunity. This is typically the longest phase of the cycle and offers the best risk-adjusted returns for traders.</p>
      
      <p>The markup phase is characterized by:</p>
      <ul>
        <li>Sustained upward price movement</li>
        <li>Increasing volume and participation</li>
        <li>Positive news and improving fundamentals</li>
        <li>Momentum building as more investors join</li>
        <li>Media attention and public interest growing</li>
      </ul>
      
      <h4>3. Distribution Phase</h4>
      <p>Smart money begins to distribute their positions to the public, who are now optimistic about the market. Prices may continue to rise but at a slower pace, and warning signs begin to appear.</p>
      
      <p>Key indicators of the distribution phase:</p>
      <ul>
        <li>Prices still rising but with decreasing momentum</li>
        <li>High volume but price gains are smaller</li>
        <li>Extreme optimism and "this time is different" thinking</li>
        <li>Institutional selling disguised as buying</li>
        <li>Technical divergences appearing</li>
      </ul>
      
      <h4>4. Markdown Phase</h4>
      <p>This is the decline phase where prices fall as selling pressure increases. This phase can be swift and brutal, catching many retail investors off guard.</p>
      
      <p>The markdown phase features:</p>
      <ul>
        <li>Sharp price declines with high volume</li>
        <li>Panic selling and forced liquidations</li>
        <li>Negative news and deteriorating fundamentals</li>
        <li>Fear and capitulation among investors</li>
        <li>Opportunities for value investors to accumulate</li>
      </ul>
      
      <h3>Identifying Market Cycles</h3>
      <p>Several indicators can help identify which phase of the cycle the market is in. It's important to use multiple indicators rather than relying on any single one.</p>
      
      <h4>Technical Indicators</h4>
      <ul>
        <li><strong>Moving Averages:</strong> The relationship between price and moving averages can indicate trend direction. Golden crosses (50-day crossing above 200-day) often signal the start of markup phases.</li>
        <li><strong>Volume Analysis:</strong> Volume patterns often precede price movements. Increasing volume on price advances and decreasing volume on declines is bullish.</li>
        <li><strong>Momentum Oscillators:</strong> RSI, MACD, and other oscillators can show momentum shifts and potential reversals.</li>
        <li><strong>Support and Resistance:</strong> Key levels that have held multiple times become more significant as the cycle progresses.</li>
      </ul>
      
      <h4>Fundamental Indicators</h4>
      <ul>
        <li><strong>Economic Data:</strong> GDP growth, employment figures, inflation rates, and consumer confidence all impact market cycles.</li>
        <li><strong>Corporate Earnings:</strong> Earnings growth and guidance provide insight into the health of the underlying businesses.</li>
        <li><strong>Interest Rates:</strong> Central bank policy and yield curve analysis are crucial for understanding the monetary environment.</li>
        <li><strong>Valuation Metrics:</strong> P/E ratios, price-to-book values, and other metrics help identify overvalued or undervalued conditions.</li>
      </ul>
      
      <h3>Trading Strategies for Each Phase</h3>
      
      <h4>Accumulation Phase Strategy</h4>
      <p>Focus on building positions in quality assets at attractive prices. Use dollar-cost averaging and be patient. This is the time to:</p>
      <ul>
        <li>Research and identify fundamentally sound companies</li>
        <li>Start small positions and scale in gradually</li>
        <li>Focus on value and long-term potential</li>
        <li>Ignore short-term noise and volatility</li>
        <li>Build a watchlist of potential opportunities</li>
      </ul>
      
      <h4>Markup Phase Strategy</h4>
      <p>Ride the trend and add to winning positions. Use trend-following strategies and momentum indicators. Key tactics include:</p>
      <ul>
        <li>Adding to positions as the trend confirms</li>
        <li>Using pullbacks as buying opportunities</li>
        <li>Following momentum indicators for entry/exit timing</li>
        <li>Maintaining stop losses to protect profits</li>
        <li>Diversifying across multiple strong sectors</li>
      </ul>
      
      <h4>Distribution Phase Strategy</h4>
      <p>Begin taking profits and reducing position sizes. Look for signs of weakness and prepare for the next cycle. Important actions:</p>
      <ul>
        <li>Start taking partial profits on strong performers</li>
        <li>Reduce position sizes and increase cash</li>
        <li>Watch for technical divergences and warning signs</li>
        <li>Focus on capital preservation over growth</li>
        <li>Prepare watchlists for the next accumulation phase</li>
      </ul>
      
      <h4>Markdown Phase Strategy</h4>
      <p>Protect capital through hedging or cash positions. Look for short-selling opportunities in weak sectors. Consider:</p>
      <ul>
        <li>Moving to cash or defensive positions</li>
        <li>Using inverse ETFs or put options for hedging</li>
        <li>Short-selling weak sectors or individual stocks</li>
        <li>Focusing on capital preservation</li>
        <li>Preparing for the next accumulation phase</li>
      </ul>
      
      <h3>Common Mistakes to Avoid</h3>
      <p>Even experienced traders make these common mistakes when dealing with market cycles:</p>
      <ul>
        <li><strong>Fighting the trend:</strong> Trying to go against the dominant market direction during markup and markdown phases</li>
        <li><strong>Getting emotional:</strong> Making decisions based on fear or greed rather than analysis</li>
        <li><strong>Ignoring risk management:</strong> Not using proper position sizing and stop losses</li>
        <li><strong>Trying to time exact tops and bottoms:</strong> It's better to be approximately right than precisely wrong</li>
        <li><strong>Overconfidence:</strong> Believing you can predict every market move</li>
        <li><strong>Not adapting:</strong> Using the same strategy regardless of market conditions</li>
      </ul>
      
      <h3>Risk Management in Different Phases</h3>
      <p>Your risk management approach should adapt to the current market phase:</p>
      
      <p><strong>Accumulation Phase:</strong> Use wider stops and smaller position sizes since volatility can be high. Focus on capital preservation while building positions.</p>
      
      <p><strong>Markup Phase:</strong> Use tighter stops and larger position sizes as the trend is your friend. Trail stops to protect profits.</p>
      
      <p><strong>Distribution Phase:</strong> Reduce position sizes and use tighter stops. Be prepared to exit quickly if the trend reverses.</p>
      
      <p><strong>Markdown Phase:</strong> Focus on capital preservation. Use very small position sizes or stay in cash. Consider hedging strategies.</p>
      
      <h3>Conclusion</h3>
      <p>Understanding market cycles provides a framework for making better trading and investment decisions. While cycles don't repeat exactly, they do rhyme, and recognizing the patterns can give you a significant edge in the markets.</p>
      
      <p>Remember that successful trading requires patience, discipline, and continuous learning. Use market cycle analysis as one tool in your trading toolkit, combined with proper risk management and a well-defined strategy.</p>
      
      <p>The key is to adapt your approach based on where you are in the cycle, rather than trying to force the same strategy in all market conditions. By understanding and respecting market cycles, you can improve your odds of success and reduce the emotional stress that comes with trading.</p>
    `,
    readTime: "12 min read",
    date: "Dec 15, 2024",
    author: "Sarah Johnson",
    authorBio: "Senior Market Analyst with 15+ years of experience in equity research and technical analysis. Former institutional trader and author of 'The Art of Market Timing'.",
    likes: 1247,
    comments: 89,
    bookmarks: 456,
    views: 15420,
  }

  const relatedArticles = [
    {
      id: 1,
      title: "The Psychology of FOMO in Trading: How to Avoid Emotional Decisions",
      readTime: "8 min read",
      topic: "Psychology",
      views: 8920,
    },
    {
      id: 2,
      title: "Building a Robust Trading Plan: A Step-by-Step Guide",
      readTime: "15 min read",
      topic: "Strategy",
      views: 12340,
    },
    {
      id: 3,
      title: "Understanding Options Greeks: Delta, Gamma, Theta, and Vega",
      readTime: "18 min read",
      topic: "Options",
      views: 6780,
    },
    {
      id: 4,
      title: "Technical Analysis vs Fundamental Analysis: When to Use Each",
      readTime: "10 min read",
      topic: "Analysis",
      views: 9450,
    },
  ]

  return (
    <div className="bg-background">
      {/* Header with back button */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Center
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl min-h-screen">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - Takes up most of the space */}
          <div className="xl:col-span-3">
            {/* Article Header */}
            <div className="mb-8">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
                {article.topic}
              </div>

              <h1 className="font-display font-bold text-4xl xl:text-5xl text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="hover:bg-accent">
                    <Bookmark className="h-4 w-4 mr-2" />
                    {article.bookmarks}
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-accent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <Card className="border-border shadow-sm bg-card">
              <CardContent className="p-8 xl:p-12">
                <article className="max-w-none">
                  {/* Introduction Section */}
                  <section className="mb-12">
                    <h2 className="font-display font-bold text-3xl text-foreground mb-6 border-b border-border pb-4">
                      Introduction to Market Cycles
                    </h2>
                    <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
                      <p>
                        Market cycles are recurring patterns in financial markets that reflect the natural ebb and flow of economic activity, investor sentiment, and market dynamics. Understanding these cycles is crucial for successful trading and investment strategies.
                      </p>
                      <p>
                        Every market, whether it's stocks, bonds, commodities, or cryptocurrencies, goes through predictable phases. These cycles can last from months to years, and recognizing where you are in the cycle can dramatically improve your trading performance.
                      </p>
                    </div>
                  </section>

                  {/* Four Phases Section */}
                  <section className="mb-12">
                    <h2 className="font-display font-bold text-3xl text-foreground mb-8 border-b border-border pb-4">
                      The Four Phases of Market Cycles
                    </h2>
                    <div className="space-y-6 text-base leading-relaxed text-muted-foreground mb-8">
                      <p>
                        Every market cycle consists of four distinct phases, each with its own characteristics and trading opportunities:
                      </p>
                    </div>

                    {/* Phase 1: Accumulation */}
                    <div className="mb-10">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                        Accumulation Phase
                      </h3>
                      <div className="ml-11 space-y-4">
                        <p>
                          This is the phase where smart money begins to accumulate positions while the general public is still pessimistic. Prices are typically at or near their lows, and volume is relatively low.
                        </p>
                        <div className="bg-accent/50 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-3">Key characteristics include:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Sideways price movement with low volatility
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Institutional buying under the radar
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Negative sentiment and fear in the market
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Low trading volume and lack of interest
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Fundamental value emerging but not yet recognized
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Phase 2: Markup */}
                    <div className="mb-10">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                        Markup Phase
                      </h3>
                      <div className="ml-11 space-y-4">
                        <p>
                          During this phase, prices begin to rise as more investors recognize the opportunity. This is typically the longest phase of the cycle and offers the best risk-adjusted returns for traders.
                        </p>
                        <div className="bg-accent/50 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-3">The markup phase is characterized by:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Sustained upward price movement
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Increasing volume and participation
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Positive news and improving fundamentals
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Momentum building as more investors join
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Media attention and public interest growing
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Phase 3: Distribution */}
                    <div className="mb-10">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                        Distribution Phase
                      </h3>
                      <div className="ml-11 space-y-4">
                        <p>
                          Smart money begins to distribute their positions to the public, who are now optimistic about the market. Prices may continue to rise but at a slower pace, and warning signs begin to appear.
                        </p>
                        <div className="bg-accent/50 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-3">Key indicators of the distribution phase:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Prices still rising but with decreasing momentum
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              High volume but price gains are smaller
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Extreme optimism and "this time is different" thinking
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Institutional selling disguised as buying
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Technical divergences appearing
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Phase 4: Markdown */}
                    <div className="mb-10">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4 flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                        Markdown Phase
                      </h3>
                      <div className="ml-11 space-y-4">
                        <p>
                          This is the decline phase where prices fall as selling pressure increases. This phase can be swift and brutal, catching many retail investors off guard.
                        </p>
                        <div className="bg-accent/50 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-3">The markdown phase features:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Sharp price declines with high volume
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Panic selling and forced liquidations
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Negative news and deteriorating fundamentals
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Fear and capitulation among investors
                            </li>
                            <li className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              Opportunities for value investors to accumulate
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Identifying Market Cycles Section */}
                  <section className="mb-12">
                    <h2 className="font-display font-bold text-3xl text-foreground mb-6 border-b border-border pb-4">
                      Identifying Market Cycles
                    </h2>
                    <div className="space-y-6 text-base leading-relaxed text-muted-foreground mb-8">
                      <p>
                        Several indicators can help identify which phase of the cycle the market is in. It's important to use multiple indicators rather than relying on any single one.
                      </p>
                    </div>

                    {/* Technical Indicators */}
                    <div className="mb-8">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                        Technical Indicators
                      </h3>
                      <div className="bg-accent/30 rounded-lg p-6">
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <span className="text-primary mr-3 font-semibold">•</span>
                            <div>
                              <strong className="text-foreground">Moving Averages:</strong> The relationship between price and moving averages can indicate trend direction. Golden crosses (50-day crossing above 200-day) often signal the start of markup phases.
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-3 font-semibold">•</span>
                            <div>
                              <strong className="text-foreground">Volume Analysis:</strong> Volume patterns often precede price movements. Increasing volume on price advances and decreasing volume on declines is bullish.
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-3 font-semibold">•</span>
                            <div>
                              <strong className="text-foreground">Momentum Oscillators:</strong> RSI, MACD, and other oscillators can show momentum shifts and potential reversals.
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-3 font-semibold">•</span>
                            <div>
                              <strong className="text-foreground">Support and Resistance:</strong> Key levels that have held multiple times become more significant as the cycle progresses.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Fundamental Indicators */}
                    <div className="mb-8">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                        Fundamental Indicators
                      </h3>
                      <div className="bg-accent/30 rounded-lg p-6">
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <span className="text-primary mr-3 font-semibold">•</span>
                            <div>
                              <strong className="text-foreground">Economic Data:</strong> GDP growth, employment figures, inflation rates, and consumer confidence all impact market cycles.
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-3 font-semibold">•</span>
                            <div>
                              <strong className="text-foreground">Corporate Earnings:</strong> Earnings growth and guidance provide insight into the health of the underlying businesses.
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-3 font-semibold">•</span>
                            <div>
                              <strong className="text-foreground">Interest Rates:</strong> Central bank policy and yield curve analysis are crucial for understanding the monetary environment.
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-3 font-semibold">•</span>
                            <div>
                              <strong className="text-foreground">Valuation Metrics:</strong> P/E ratios, price-to-book values, and other metrics help identify overvalued or undervalued conditions.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Trading Strategies Section */}
                  <section className="mb-12">
                    <h2 className="font-display font-bold text-3xl text-foreground mb-8 border-b border-border pb-4">
                      Trading Strategies for Each Phase
                    </h2>

                    {/* Accumulation Strategy */}
                    <div className="mb-8">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                        Accumulation Phase Strategy
                      </h3>
                      <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                          Focus on building positions in quality assets at attractive prices. Use dollar-cost averaging and be patient. This is the time to:
                        </p>
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              Research and identify fundamentally sound companies
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              Start small positions and scale in gradually
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              Focus on value and long-term potential
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              Ignore short-term noise and volatility
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              Build a watchlist of potential opportunities
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Markup Strategy */}
                    <div className="mb-8">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                        Markup Phase Strategy
                      </h3>
                      <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                          Ride the trend and add to winning positions. Use trend-following strategies and momentum indicators. Key tactics include:
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-blue-600 mr-2">→</span>
                              Adding to positions as the trend confirms
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-600 mr-2">→</span>
                              Using pullbacks as buying opportunities
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-600 mr-2">→</span>
                              Following momentum indicators for entry/exit timing
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-600 mr-2">→</span>
                              Maintaining stop losses to protect profits
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-600 mr-2">→</span>
                              Diversifying across multiple strong sectors
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Distribution Strategy */}
                    <div className="mb-8">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                        Distribution Phase Strategy
                      </h3>
                      <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                          Begin taking profits and reducing position sizes. Look for signs of weakness and prepare for the next cycle. Important actions:
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-yellow-600 mr-2">⚠</span>
                              Start taking partial profits on strong performers
                            </li>
                            <li className="flex items-start">
                              <span className="text-yellow-600 mr-2">⚠</span>
                              Reduce position sizes and increase cash
                            </li>
                            <li className="flex items-start">
                              <span className="text-yellow-600 mr-2">⚠</span>
                              Watch for technical divergences and warning signs
                            </li>
                            <li className="flex items-start">
                              <span className="text-yellow-600 mr-2">⚠</span>
                              Focus on capital preservation over growth
                            </li>
                            <li className="flex items-start">
                              <span className="text-yellow-600 mr-2">⚠</span>
                              Prepare watchlists for the next accumulation phase
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Markdown Strategy */}
                    <div className="mb-8">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                        Markdown Phase Strategy
                      </h3>
                      <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                        <p>
                          Protect capital through hedging or cash positions. Look for short-selling opportunities in weak sectors. Consider:
                        </p>
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-red-600 mr-2">🛡</span>
                              Moving to cash or defensive positions
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-600 mr-2">🛡</span>
                              Using inverse ETFs or put options for hedging
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-600 mr-2">🛡</span>
                              Short-selling weak sectors or individual stocks
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-600 mr-2">🛡</span>
                              Focusing on capital preservation
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-600 mr-2">🛡</span>
                              Preparing for the next accumulation phase
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Common Mistakes Section */}
                  <section className="mb-12">
                    <h2 className="font-display font-bold text-3xl text-foreground mb-6 border-b border-border pb-4">
                      Common Mistakes to Avoid
                    </h2>
                    <div className="space-y-6 text-base leading-relaxed text-muted-foreground mb-6">
                      <p>
                        Even experienced traders make these common mistakes when dealing with market cycles:
                      </p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-3 font-bold">✗</span>
                          <div>
                            <strong className="text-foreground">Fighting the trend:</strong> Trying to go against the dominant market direction during markup and markdown phases
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-3 font-bold">✗</span>
                          <div>
                            <strong className="text-foreground">Getting emotional:</strong> Making decisions based on fear or greed rather than analysis
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-3 font-bold">✗</span>
                          <div>
                            <strong className="text-foreground">Ignoring risk management:</strong> Not using proper position sizing and stop losses
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-3 font-bold">✗</span>
                          <div>
                            <strong className="text-foreground">Trying to time exact tops and bottoms:</strong> It's better to be approximately right than precisely wrong
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-3 font-bold">✗</span>
                          <div>
                            <strong className="text-foreground">Overconfidence:</strong> Believing you can predict every market move
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-3 font-bold">✗</span>
                          <div>
                            <strong className="text-foreground">Not adapting:</strong> Using the same strategy regardless of market conditions
                          </div>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Risk Management Section */}
                  <section className="mb-12">
                    <h2 className="font-display font-bold text-3xl text-foreground mb-6 border-b border-border pb-4">
                      Risk Management in Different Phases
                    </h2>
                    <div className="space-y-6 text-base leading-relaxed text-muted-foreground mb-6">
                      <p>
                        Your risk management approach should adapt to the current market phase:
                      </p>
                    </div>
                    <div className="grid gap-4">
                      <div className="bg-accent/30 rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-2">Accumulation Phase:</h4>
                        <p className="text-sm">Use wider stops and smaller position sizes since volatility can be high. Focus on capital preservation while building positions.</p>
                      </div>
                      <div className="bg-accent/30 rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-2">Markup Phase:</h4>
                        <p className="text-sm">Use tighter stops and larger position sizes as the trend is your friend. Trail stops to protect profits.</p>
                      </div>
                      <div className="bg-accent/30 rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-2">Distribution Phase:</h4>
                        <p className="text-sm">Reduce position sizes and use tighter stops. Be prepared to exit quickly if the trend reverses.</p>
                      </div>
                      <div className="bg-accent/30 rounded-lg p-4">
                        <h4 className="font-semibold text-foreground mb-2">Markdown Phase:</h4>
                        <p className="text-sm">Focus on capital preservation. Use very small position sizes or stay in cash. Consider hedging strategies.</p>
                      </div>
                    </div>
                  </section>

                  {/* Conclusion Section */}
                  <section className="mb-12">
                    <h2 className="font-display font-bold text-3xl text-foreground mb-6 border-b border-border pb-4">
                      Conclusion
                    </h2>
                    <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
                      <p>
                        Understanding market cycles provides a framework for making better trading and investment decisions. While cycles don't repeat exactly, they do rhyme, and recognizing the patterns can give you a significant edge in the markets.
                      </p>
                      <p>
                        Remember that successful trading requires patience, discipline, and continuous learning. Use market cycle analysis as one tool in your trading toolkit, combined with proper risk management and a well-defined strategy.
                      </p>
                      <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
                        <p className="text-foreground font-medium">
                          The key is to adapt your approach based on where you are in the cycle, rather than trying to force the same strategy in all market conditions. By understanding and respecting market cycles, you can improve your odds of success and reduce the emotional stress that comes with trading.
                        </p>
                      </div>
                    </div>
                  </section>
                </article>
              </CardContent>
            </Card>

            {/* Engagement Section */}
            <Card className="border-border shadow-sm bg-card mt-8">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-6">
                    <Button variant="ghost" className="hover:bg-accent">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {article.likes} Likes
                    </Button>
                    <Button variant="ghost" className="hover:bg-accent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {article.comments} Comments
                    </Button>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Follow Author
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Sticky and well-designed */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Author Info */}
              <Card className="border-border shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground">{article.author}</h3>
                      <p className="text-sm text-muted-foreground">Senior Market Analyst</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{article.authorBio}</p>
                  <Button variant="outline" className="w-full hover:bg-accent">
                    View Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Table of Contents */}
              <Card className="border-border shadow-sm bg-card">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-4 text-foreground">Table of Contents</h3>
                  <div className="space-y-3 text-sm">
                    <a href="#introduction" className="block text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                      Introduction to Market Cycles
                    </a>
                    <a href="#phases" className="block text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                      The Four Phases
                    </a>
                    <a href="#identifying" className="block text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                      Identifying Market Cycles
                    </a>
                    <a href="#strategies" className="block text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                      Trading Strategies
                    </a>
                    <a href="#mistakes" className="block text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                      Common Mistakes
                    </a>
                    <a href="#conclusion" className="block text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                      Conclusion
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card className="border-border shadow-sm bg-card">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-4 text-foreground">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <div key={related.id} className="cursor-pointer group">
                        <div className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                              {related.topic}
                            </span>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Eye className="h-3 w-3 mr-1" />
                              {related.views.toLocaleString()}
                            </div>
                          </div>
                          <h4 className="font-medium text-sm text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                            {related.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">{related.readTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="border-border shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-display font-semibold text-lg text-foreground">Trending Topics</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer">
                      <span className="text-sm font-medium text-foreground">Technical Analysis</span>
                      <span className="text-xs text-muted-foreground">24 articles</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer">
                      <span className="text-sm font-medium text-foreground">Risk Management</span>
                      <span className="text-xs text-muted-foreground">18 articles</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer">
                      <span className="text-sm font-medium text-foreground">Options Trading</span>
                      <span className="text-xs text-muted-foreground">31 articles</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer">
                      <span className="text-sm font-medium text-foreground">Psychology</span>
                      <span className="text-xs text-muted-foreground">15 articles</span>
                    </div>
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
