"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  BookOpen,
  Video,
  FileText,
  BarChart,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  ChevronRight,
  Filter,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState("courses")

  const courses = [
    {
      id: 1,
      title: "Technical Analysis Fundamentals",
      description: "Learn the core principles of technical analysis for any market",
      level: "Beginner",
      duration: "4 hours",
      modules: 8,
      rating: 4.8,
      reviews: 1245,
      image: "/placeholder.svg?height=200&width=300",
      progress: 65,
      category: "technical",
    },
    {
      id: 2,
      title: "Risk Management Mastery",
      description: "Protect your capital with advanced risk management techniques",
      level: "Intermediate",
      duration: "3 hours",
      modules: 6,
      rating: 4.9,
      reviews: 876,
      image: "/placeholder.svg?height=200&width=300",
      progress: 30,
      category: "fundamentals",
    },
    {
      id: 3,
      title: "Algorithmic Trading Basics",
      description: "Introduction to algorithmic trading strategies and tools",
      level: "Advanced",
      duration: "6 hours",
      modules: 10,
      rating: 4.7,
      reviews: 543,
      image: "/placeholder.svg?height=200&width=300",
      progress: 0,
      category: "advanced",
    },
    {
      id: 4,
      title: "Fundamental Analysis for Stocks",
      description: "How to analyze company financials and valuation metrics",
      level: "Intermediate",
      duration: "5 hours",
      modules: 9,
      rating: 4.6,
      reviews: 789,
      image: "/placeholder.svg?height=200&width=300",
      progress: 0,
      category: "fundamentals",
    },
    {
      id: 5,
      title: "Cryptocurrency Trading Strategies",
      description: "Specialized techniques for the crypto markets",
      level: "Intermediate",
      duration: "4.5 hours",
      modules: 8,
      rating: 4.8,
      reviews: 1023,
      image: "/placeholder.svg?height=200&width=300",
      progress: 0,
      category: "advanced",
    },
    {
      id: 6,
      title: "Trading Psychology",
      description: "Master your emotions and develop a trader's mindset",
      level: "All Levels",
      duration: "3.5 hours",
      modules: 7,
      rating: 4.9,
      reviews: 1567,
      image: "/placeholder.svg?height=200&width=300",
      progress: 15,
      category: "psychology",
    },
  ]

  const articles = [
    {
      id: 1,
      title: "Understanding Market Cycles",
      description: "How to identify and trade different market cycles",
      readTime: "8 min read",
      date: "Jul 15, 2023",
      category: "Market Analysis",
    },
    {
      id: 2,
      title: "The Psychology of FOMO in Trading",
      description: "How fear of missing out affects your trading decisions",
      readTime: "6 min read",
      date: "Jul 12, 2023",
      category: "Trading Psychology",
    },
    {
      id: 3,
      title: "Building a Robust Trading Plan",
      description: "Step-by-step guide to creating your personalized trading plan",
      readTime: "10 min read",
      date: "Jul 10, 2023",
      category: "Strategy",
    },
    {
      id: 4,
      title: "Understanding Options Greeks",
      description: "A comprehensive guide to delta, gamma, theta, and vega",
      readTime: "12 min read",
      date: "Jul 8, 2023",
      category: "Options Trading",
    },
  ]

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-display font-bold text-xl">Learning Center</h1>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50%]">
              <SheetHeader>
                <SheetTitle>Search Learning Content</SheetTitle>
              </SheetHeader>
              <div className="relative mt-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search courses, articles..." className="pl-8" />
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="courses" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="courses" className="flex-1">
            <BookOpen className="h-4 w-4 mr-1" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex-1">
            <FileText className="h-4 w-4 mr-1" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex-1">
            <Video className="h-4 w-4 mr-1" />
            Videos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-display font-semibold text-base">Continue Learning</h2>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                See All <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="card-scroll">
              {courses
                .filter((course) => course.progress > 0)
                .map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="relative h-24 bg-gray-100">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-gray-900 text-xs">{course.level}</Badge>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{course.title}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1 mb-2">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-amber-500" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-display font-semibold text-base">All Courses</h2>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                    Filter <Filter className="h-3 w-3 ml-1" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[40%]">
                  <SheetHeader>
                    <SheetTitle>Filter Courses</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <h3 className="font-medium text-sm mb-2">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="justify-start text-xs">
                        All
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs">
                        Technical
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs">
                        Fundamentals
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs">
                        Psychology
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start text-xs">
                        Advanced
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="space-y-3">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="relative h-24 w-24 flex-shrink-0 bg-gray-100">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-1 right-1 bg-gray-900 text-[10px] px-1 py-0">{course.level}</Badge>
                    </div>
                    <CardContent className="p-3 flex-1">
                      <h3 className="font-medium text-sm line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{course.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-amber-500" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      {course.progress > 0 && (
                        <div className="mt-1">
                          <Progress value={course.progress} className="h-1" />
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <div className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id}>
                <CardContent className="p-3">
                  <Badge className="mb-2 text-xs">{article.category}</Badge>
                  <h3 className="font-display font-semibold text-sm mb-1">{article.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{article.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{article.readTime}</span>
                      <span className="mx-1">•</span>
                      <span>{article.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      Read
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="fixed bottom-20 right-4 h-10 w-10 rounded-full shadow-lg">
                <BookOpen className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70%]">
              <SheetHeader>
                <SheetTitle>Topics</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Technical Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart className="h-4 w-4 mr-2" />
                  Fundamental Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Risk Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Trading Psychology
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Market Analysis
                </Button>

                <div className="pt-4 border-t">
                  <h3 className="font-display font-semibold text-base mb-3">Popular Articles</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">The Complete Guide to Fibonacci Retracements</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>12 min read</span>
                        <span className="mx-1">•</span>
                        <span>4.2k reads</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">How to Build a Trading Journal That Works</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>8 min read</span>
                        <span className="mx-1">•</span>
                        <span>3.8k reads</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Understanding Market Sentiment Indicators</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>10 min read</span>
                        <span className="mx-1">•</span>
                        <span>3.5k reads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </TabsContent>

        <TabsContent value="videos">
          <div className="flex justify-center items-center h-60">
            <div className="text-center">
              <Video className="h-10 w-10 mx-auto text-gray-400 mb-3" />
              <h3 className="font-display font-semibold text-base mb-1">Video Library Coming Soon</h3>
              <p className="text-xs text-gray-500">
                We're working on building a comprehensive video library for traders.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
