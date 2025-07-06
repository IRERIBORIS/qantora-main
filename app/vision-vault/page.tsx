"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FlexibleLayout } from "@/components/layout/flexible-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Plus, Calendar, Edit2, Trash2, Target, TrendingUp, DollarSign, Clock } from "lucide-react"

export default function VisionVaultPage() {
  const router = useRouter()
  const [showNewGoal, setShowNewGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    timeline: "",
    category: "",
    description: "",
  })

  const goals = [
    {
      id: 1,
      title: "Monthly Trading Target",
      target: "$25,000",
      current: "$17,000",
      progress: 68,
      timeline: "Monthly",
      category: "Income",
      description: "Achieve consistent monthly income through disciplined trading",
      deadline: "End of Month",
      daysLeft: 12,
    },
    {
      id: 2,
      title: "Win Rate Improvement",
      target: "75%",
      current: "73%",
      progress: 97,
      timeline: "Quarterly",
      category: "Performance",
      description: "Improve trade selection and risk management",
      deadline: "Q4 2024",
      daysLeft: 45,
    },
    {
      id: 3,
      title: "Portfolio Growth",
      target: "$100,000",
      current: "$78,500",
      progress: 78,
      timeline: "Annual",
      category: "Wealth",
      description: "Build long-term wealth through strategic investments",
      deadline: "Dec 31, 2024",
      daysLeft: 120,
    },
    {
      id: 4,
      title: "Risk Management Mastery",
      target: "Max 2% per trade",
      current: "1.8% avg",
      progress: 100,
      timeline: "Ongoing",
      category: "Risk",
      description: "Maintain strict risk management discipline",
      deadline: "Always",
      daysLeft: null,
    },
  ]

  const stats = {
    totalGoals: 4,
    completed: 12,
    avgProgress: 83,
    nearCompletion: 2,
  }

  const handleAddGoal = () => {
    if (newGoal.title.trim() && newGoal.target.trim()) {
      setNewGoal({
        title: "",
        target: "",
        timeline: "",
        category: "",
        description: "",
      })
      setShowNewGoal(false)
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-500"
    if (progress >= 70) return "bg-blue-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Income":
        return "bg-green-100 text-green-800"
      case "Performance":
        return "bg-blue-100 text-blue-800"
      case "Risk":
        return "bg-red-100 text-red-800"
      case "Wealth":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <FlexibleLayout fullScreen>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-xl text-gray-900">Vision Vault</h1>
              <p className="text-gray-600 text-sm">Track your trading goals</p>
            </div>
          </div>
          <Dialog open={showNewGoal} onOpenChange={setShowNewGoal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Goal Title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
                <Input
                  placeholder="Target (e.g., $10,000 or 80%)"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
                <Select value={newGoal.timeline} onValueChange={(value) => setNewGoal({ ...newGoal, timeline: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddGoal} className="w-full">
                  Create Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-lg">{goal.title}</h3>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCategoryColor(goal.category)}`}
                    >
                      {goal.category}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(goal.progress)}`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current: {goal.current}</span>
                    <span className="text-gray-600">Target: {goal.target}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Desktop Full-Screen Layout */}
      <div className="hidden lg:block h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-3xl text-gray-900">Vision Vault</h1>
              <p className="text-gray-600">Set, track, and achieve your trading objectives</p>
            </div>
          </div>

          <Dialog open={showNewGoal} onOpenChange={setShowNewGoal}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Create New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">Create New Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Goal Title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  />
                  <Input
                    placeholder="Target Value"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={newGoal.timeline}
                    onValueChange={(value) => setNewGoal({ ...newGoal, timeline: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={newGoal.category}
                    onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Income">Income</SelectItem>
                      <SelectItem value="Performance">Performance</SelectItem>
                      <SelectItem value="Risk">Risk Management</SelectItem>
                      <SelectItem value="Wealth">Wealth Building</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder="Describe your goal and strategy to achieve it..."
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="min-h-[100px]"
                />

                <Button onClick={handleAddGoal} className="w-full" size="lg">
                  Create Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto text-blue-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900">{stats.totalGoals}</div>
              <div className="text-sm text-gray-600">Active Goals</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-3" />
              <div className="text-3xl font-bold text-green-600">{stats.avgProgress}%</div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto text-orange-600 mb-3" />
              <div className="text-3xl font-bold text-orange-600">{stats.nearCompletion}</div>
              <div className="text-sm text-gray-600">Near Completion</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto text-purple-600 mb-3" />
              <div className="text-3xl font-bold text-purple-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed This Year</div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-25rem)] overflow-y-auto">
          {goals.map((goal) => (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl font-display">{goal.title}</CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-600">Current</span>
                    <div className="text-xl font-bold text-gray-900">{goal.current}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-600">Target</span>
                    <div className="text-xl font-bold text-gray-900">{goal.target}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-lg font-bold">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(goal.progress)}`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{goal.deadline}</span>
                  </div>
                  {goal.daysLeft && (
                    <span className="text-sm font-medium text-orange-600">{goal.daysLeft} days left</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FlexibleLayout>
  )
}
