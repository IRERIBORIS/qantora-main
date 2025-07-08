"use client"

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, LineChart, PieChart, Bot, Users, GraduationCap } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { NavBar } from "@/components/ui/tubelight-navbar";

// Custom C icon for Cato (square)
const CatoIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(function CatoIcon(props, ref) {
  return (
    <svg ref={ref} width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="currentColor" fontFamily="inherit">C</text>
    </svg>
  );
});

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      name: "Portfolio",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Markets",
      url: "/markets",
      icon: PieChart,
    },
    {
      name: "Cato AI",
      url: "/cato",
      icon: CatoIcon,
    },
    {
      name: "Learning",
      url: "/learning",
      icon: GraduationCap,
    },
    {
      name: "Community",
      url: "/community",
      icon: Users,
    },
  ];

  const tabs = [
    { title: "Portfolio", icon: LayoutDashboard },
    { title: "Markets", icon: PieChart },
    { title: "Cato AI", icon: CatoIcon },
    { title: "Learning", icon: GraduationCap },
    { title: "Community", icon: Users },
  ];

  const routes = ["/", "/markets", "/cato", "/learning", "/community"];

  return (
    <>
      {/* Mobile: ExpandableTabs */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-background border-t border-border px-2 py-1">
        <ExpandableTabs
          tabs={tabs}
          onChange={index => {
            if (index !== null && routes[index]) {
              router.push(routes[index]!);
            }
          }}
          className="w-full justify-center"
        />
      </nav>
      {/* Desktop: Tubelight NavBar */}
      <div className="hidden md:block">
        <NavBar items={navItems} currentPath={pathname} className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50" />
      </div>
    </>
  );
}
