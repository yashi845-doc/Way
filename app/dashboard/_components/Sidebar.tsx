"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutGrid,
  Users,
  CalendarDays,
  Video,
  FileText,
  BarChart2,
  Package,
} from "lucide-react";

import { ChevronRightIcon } from "./Icons";
import { WayLogo } from "./WayLogo";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutGrid,
    href: "/dashboard",
  },

  {
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
  },

  {
    label: "Inventory",
    icon: Package,
    href: "/dashboard/inventory",
  },

  {
    label: "Events",
    icon: CalendarDays,
    href: "/dashboard/events",
    arrow: true,
  },

  {
    label: "Videos",
    icon: Video,
    href: "/dashboard/videos",
    arrow: true,
  },

  {
    label: "Reels / Content",
    icon: FileText,
    href: "/dashboard/reels-content",
    arrow: true,
  },

  {
    label: "Leaderboard",
    icon: BarChart2,
    href: "/dashboard/leaderboard",
    arrow: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[252px] shrink-0 bg-[#232837] min-h-screen">
      
      {/* Logo */}
      <div className="flex h-[77px] items-center justify-center border-t border-[#8176af]">
        <WayLogo />
      </div>

      {/* Menu */}
      <nav className="px-3 pt-8">
        
        <p className="mb-5 px-4 text-base font-semibold text-[#aeb4c4]">
          Menu
        </p>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href ?? "#"}
              className={`group flex items-center gap-4 px-5 text-base transition-all duration-300 ${
                pathname === item.href
                  ? "h-11 rounded-r-full border-b-0 bg-[#096dff] font-semibold text-white shadow-[0_10px_24px_rgba(9,109,255,0.32)]"
                  : "h-[55px] border-b border-[#353b4e] text-[#98a0b4] hover:translate-x-1 hover:rounded-r-full hover:border-transparent hover:bg-[#096dff]/18 hover:text-white"
              }`}
            >
              
              {/* Icon */}
              <item.icon className="h-5 w-5 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />

              {/* Label */}
              <span className="min-w-0 flex-1 truncate">
                {item.label}
              </span>

              {/* Arrow */}
              {item.arrow ? (
                <ChevronRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              ) : null}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}