"use client";

import * as React from "react";
import { ExpandableTabs } from "./expandable-tabs";
import { Home, Info, Zap, MessageSquare, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const tabs = [
  { title: "Home", icon: Home },
  { title: "Why Qantora", icon: Info },
  { type: 'separator' as const },
  { title: "Edge", icon: Zap },
  { title: "FAQ", icon: MessageSquare },
  { title: "Settings", icon: Settings },
];

export function MobileNavbar() {
  const router = useRouter();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-background border-t border-border px-2 py-1">
      <ExpandableTabs
        tabs={tabs}
        onChange={index => {
          if (index !== null) {
            // Map index to route as needed
            const routes = ["/", "/why", null, "/edge", "/faq", "/settings"];
            if (routes[index]) router.push(routes[index]!);
          }
        }}
        className="w-full justify-center"
      />
    </nav>
  );
} 