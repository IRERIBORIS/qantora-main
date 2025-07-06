"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-display">Technical Tools</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="indicators" onValueChange={setActiveTab}>
          <div className="px-4">
            <TabsList className="w-full">
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
          </div>

          <TabsContent value="indicators" className="m-0 p-4">
            <div className="grid grid-cols-2 gap-2">
              {indicators.map((indicator) => (
                <Button key={indicator.name} variant="outline" className="justify-start h-auto py-2">
                  <Activity className="h-4 w-4 mr-2" />
                  <span className="text-sm">{indicator.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drawing" className="m-0 p-4">
            <div className="grid grid-cols-2 gap-2">
              {drawingTools.map((tool) => {
                const IconComponent = tool.icon
                return (
                  <Button key={tool.name} variant="outline" className="justify-start h-auto py-2">
                    <IconComponent className="h-4 w-4 mr-2" />
                    <span className="text-sm">{tool.name}</span>
                  </Button>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="risk" className="m-0 p-4">
            <div className="grid grid-cols-2 gap-2">
              {riskTools.map((tool) => (
                <Button key={tool.name} variant="outline" className="justify-start h-auto py-2">
                  <BarChart className="h-4 w-4 mr-2" />
                  <span className="text-sm">{tool.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
