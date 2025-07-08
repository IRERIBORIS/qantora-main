"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  currentPath: string;
  className?: string;
}

export function NavBar({ items, currentPath, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Update active tab based on current path
    const activeItem = items.find((item) => {
      if (item.url === "/" && currentPath === "/") return true;
      if (item.url !== "/" && currentPath.startsWith(item.url)) return true;
      return false;
    });

    if (activeItem) {
      setActiveTab(activeItem.name);
    }
  }, [currentPath, items]);

  return (
    <div className={cn("fixed bottom-0 left-1/2 -translate-x-1/2 z-50 mb-2 hidden md:block", className)}>
      <div className="flex items-center gap-1 sm:gap-3 bg-background/5 border border-border backdrop-blur-lg py-2 sm:py-1 px-2 sm:px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-semibold px-3 sm:px-6 py-2 rounded-full transition-colors whitespace-nowrap",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -bottom-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -bottom-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm bottom-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
} 