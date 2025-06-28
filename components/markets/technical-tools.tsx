"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TrendingUp, Activity, BarChart, Ruler, Pencil, Eraser } from "lucide-react"

export default function TechnicalTools() {
  const [activeTab, setActiveTab] = useState("indicators")

  const indicators = [
    { name: "Moving Average", category: "trend" },
    { name: "MACD", category: "momentum" },
    { name: "RSI", category: "momentum" },
    { name: "Bollinger Bands", category: "volatility" },
    { name: "Ichimoku Cloud", category: "trend" },
    { name: "Stochastic", category: "momentum" },
    { name: "ATR", category: "volatility" },
    { name: "Volume Profile", category: "volume" },
  ]

  const drawingTools = [
    { name: "Trend Line", icon: TrendingUp },
    { name: "Horizontal Line", icon: Ruler },
    { name: "Fibonacci", icon: BarChart },
    { name: "Rectangle", icon: Pencil },
    { name: "Ellipse", icon: Pencil },
    { name: "Text", icon: Pencil },
    { name: "Eraser", icon: Eraser },
  ]

  const riskTools = [
    { name: "Position Size Calculator" },
    { name: "Risk/Reward Ratio" },
    { name: "Stop Loss Calculator" },
    { name: "Take Profit Calculator" },
  ]

  return (
    <div>
      <Tabs defaultValue="indicators" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="indicators" className="flex-1">
            <Activity className="h-4 w-4 mr-2" />
            Indicators
          </TabsTrigger>
          <TabsTrigger value="drawing" className="flex-1">
            <Pencil className="h-4 w-4 mr-2" />
            Drawing
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex-1">
            <BarChart className="h-4 w-4 mr-2" />
            Risk Mgmt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="indicators" className="m-0">
          <div className="grid grid-cols-2 gap-2">
            {indicators.map((indicator) => (
              <Button key={indicator.name} variant="outline" className="justify-start h-auto py-2 text-xs">
                <Activity className="h-3 w-3 mr-1" />
                <span>{indicator.name}</span>
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drawing" className="m-0">
          <div className="grid grid-cols-2 gap-2">
            {drawingTools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <Button key={tool.name} variant="outline" className="justify-start h-auto py-2 text-xs">
                  <IconComponent className="h-3 w-3 mr-1" />
                  <span>{tool.name}</span>
                </Button>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="m-0">
          <div className="grid grid-cols-2 gap-2">
            {riskTools.map((tool) => (
              <Button key={tool.name} variant="outline" className="justify-start h-auto py-2 text-xs">
                <BarChart className="h-3 w-3 mr-1" />
                <span>{tool.name}</span>
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
