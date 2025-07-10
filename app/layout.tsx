import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Navbar from "@/components/layout/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Qantora - Trading & Investment Platform",
  description: "Your personal trading and investment companion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,700,600,500&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-foreground font-display`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className="flex-1 flex flex-col min-h-0 w-full">{children}</main>
            <Navbar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
