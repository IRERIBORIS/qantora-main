"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface MarketChartProps {
  symbol: string
  chartType: string
  timeframe: string
}

export default function MarketChart({ symbol, chartType, timeframe }: MarketChartProps) {
  // This would normally fetch real data based on the symbol and timeframe
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Simulate data fetching
    const generateData = () => {
      const newData = []
      const basePrice = symbol === "BTC" ? 68000 : symbol === "ETH" ? 3400 : 200
      const volatility = symbol === "BTC" ? 2000 : symbol === "ETH" ? 100 : 5
      const dataPoints =
        timeframe === "1H" ? 60 : timeframe === "4H" ? 240 : timeframe === "1D" ? 24 : timeframe === "1W" ? 7 : 30

      for (let i = 0; i < dataPoints; i++) {
        const time =
          timeframe === "1H"
            ? `${i}m`
            : timeframe === "4H"
              ? `${i * 4}m`
              : timeframe === "1D"
                ? `${i}h`
                : timeframe === "1W"
                  ? `Day ${i + 1}`
                  : `Day ${i + 1}`

        const open = basePrice + (Math.random() - 0.5) * volatility
        const close = open + (Math.random() - 0.5) * (volatility * 0.5)
        const high = Math.max(open, close) + Math.random() * (volatility * 0.2)
        const low = Math.min(open, close) - Math.random() * (volatility * 0.2)
        const volume = Math.floor(Math.random() * 1000000)

        newData.push({
          time,
          open,
          high,
          low,
          close,
          volume,
          value: close,
        })
      }

      setData(newData)
    }

    generateData()
  }, [symbol, timeframe])

  if (data.length === 0) {
    return <div className="h-[400px] flex items-center justify-center">Loading chart data...</div>
  }

  if (chartType === "line" || chartType === "area") {
    return (
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#111827" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#111827" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#111827" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (chartType === "bar") {
    return (
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="value" fill="#111827" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // Candlestick chart (simplified with bars for up/down)
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-white p-3 border rounded shadow-sm">
                    <p className="font-medium">{data.time}</p>
                    <p className="text-sm">Open: {data.open.toFixed(2)}</p>
                    <p className="text-sm">High: {data.high.toFixed(2)}</p>
                    <p className="text-sm">Low: {data.low.toFixed(2)}</p>
                    <p className="text-sm">Close: {data.close.toFixed(2)}</p>
                    <p className="text-sm">Volume: {data.volume.toLocaleString()}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="high" fill="transparent" stroke="#111827" strokeWidth={1} />
          <Bar dataKey="low" fill="transparent" />
          <Bar dataKey={(d) => (d.close > d.open ? d.close - d.open : 0)} fill="#22c55e" stackId="stack" barSize={8} />
          <Bar dataKey={(d) => (d.close <= d.open ? d.open - d.close : 0)} fill="#ef4444" stackId="stack" barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
