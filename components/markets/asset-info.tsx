"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AssetInfoProps {
  symbol: string
}

export default function AssetInfo({ symbol }: AssetInfoProps) {
  // Mock data - would be fetched from an API in a real app
  const assetData = {
    AAPL: {
      price: "$2,345.67",
      change: "+15.7%",
      marketCap: "$2.8T",
      volume: "$12.4B",
      high: "$2,350.45",
      low: "$2,310.20",
      open: "$2,320.10",
      prevClose: "$2,300.00",
      pe: "32.5",
      eps: "$6.15",
      dividend: "0.5%",
      about:
        "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories.",
    },
    MSFT: {
      price: "$432.10",
      change: "+2.3%",
      marketCap: "$3.2T",
      volume: "$8.7B",
      high: "$435.20",
      low: "$428.90",
      open: "$430.00",
      prevClose: "$422.40",
      pe: "38.2",
      eps: "$11.31",
      dividend: "0.7%",
      about:
        "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.",
    },
    BTC: {
      price: "$68,245.30",
      change: "+2.7%",
      marketCap: "$1.3T",
      volume: "$45.2B",
      high: "$68,900.00",
      low: "$66,500.00",
      open: "$66,800.00",
      prevClose: "$66,450.00",
      about:
        "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    },
    ETH: {
      price: "$3,456.78",
      change: "+1.9%",
      marketCap: "$415.6B",
      volume: "$22.1B",
      high: "$3,490.00",
      low: "$3,380.00",
      open: "$3,390.00",
      prevClose: "$3,392.00",
      about:
        "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.",
    },
  }

  const data = assetData[symbol as keyof typeof assetData] || assetData.AAPL

  return (
    <Card>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-base font-display">Asset Information</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview">
          <div className="px-3">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1 text-xs">
                Overview
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex-1 text-xs">
                Statistics
              </TabsTrigger>
              <TabsTrigger value="about" className="flex-1 text-xs">
                About
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="m-0 p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Current Price</p>
                <p className="font-medium text-sm">{data.price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Change (24h)</p>
                <p className={`font-medium text-sm ${data.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {data.change}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Market Cap</p>
                <p className="font-medium text-sm">{data.marketCap}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Volume (24h)</p>
                <p className="font-medium text-sm">{data.volume}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="m-0 p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Day High</p>
                <p className="font-medium text-sm">{data.high}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Day Low</p>
                <p className="font-medium text-sm">{data.low}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Open</p>
                <p className="font-medium text-sm">{data.open}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Previous Close</p>
                <p className="font-medium text-sm">{data.prevClose}</p>
              </div>
              {data.pe && (
                <>
                  <div>
                    <p className="text-xs text-gray-500">P/E Ratio</p>
                    <p className="font-medium text-sm">{data.pe}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">EPS</p>
                    <p className="font-medium text-sm">{data.eps}</p>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="about" className="m-0 p-3">
            <p className="text-xs text-gray-600">{data.about}</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
